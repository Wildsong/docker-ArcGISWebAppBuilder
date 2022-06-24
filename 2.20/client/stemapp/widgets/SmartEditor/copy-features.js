///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/_base/declare',
  'dojo/Evented',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-construct',
  'dojo/on',
  'dojo/keys',
  'jimu/dijit/CheckBox',
  'dojo/dom-class',
  "dojo/dom-attr",
  './highlightSymbolUtils',
  'esri/layers/GraphicsLayer',
  'dojo/text!./copy-features.html',
  'jimu/dijit/Message',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'dojo/Deferred',
  'dojo/promise/all',
  'jimu/dijit/LoadingIndicator',
  'dijit/ProgressBar',
  'dojo/dom-style'
],
  function (
    _WidgetBase,
    _TemplatedMixin,
    declare,
    Evented,
    lang,
    array,
    domConstruct,
    on,
    keys,
    CheckBox,
    domClass,
    domAttr,
    highlightSymbolUtils,
    GraphicsLayer,
    template,
    Message,
    Query,
    QueryTask,
    Deferred,
    all,
    LoadingIndicator,
    ProgressBar,
    domStyle) {

    return declare([_WidgetBase, Evented, _TemplatedMixin], {

      templateString: template,
      layerLabel: null,
      featuresList: null,
      checkBoxNodes: {},
      layerCheckBoxNodes: {},
      featuresByLayerId: {},
      featureTitlesByLayerId: {},
      // since this variable is accessed from outside this file we had made this as a public
      highlightGraphicsLayer: null, // to store the object of graphics layer used to highlight features
      allChildCheckboxes: [],
      loading: null,

      startup: function () {
        this.inherited(arguments);
        this.highlightGraphicsLayer =
        this._createNewGraphicsLayer("highlightGraphicsLayer");
        this.loading = new LoadingIndicator({
          hidden: true
        });
        this.loading.placeAt(this.parentDomNode);
      },

      postCreate: function () {
        this.checkBoxNodes = {};
        this.layerCheckBoxNodes = {};
        this.featuresByLayerId = {};
        this.featureTitlesByLayerId = {};
        this.highlightGraphicsLayer = null;
        this.applyEditsProgress = new ProgressBar(null, this.applyEditsProgressParentNode);
        domStyle.set(this.applyEditsProgress.domNode, 'display', 'none');
        //handel button clicks
        this.own(on(this.cancelBtn, "click", lang.hitch(this, function () {
          this.cancelBtnClicked();
        })));
        this.own(on(this.cancelBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this.cancelBtnClicked();
          }
        })));
        this.own(on(this.createMultipleFeaturesBtn, "click",
          lang.hitch(this, this._createMultipleFeaturesBtnClicked)));
        this.own(on(this.createMultipleFeaturesBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._createMultipleFeaturesBtnClicked();
          }
        })));
        this.own(on(this.createSingleFeatureBtn, "click",
          lang.hitch(this, this._createSingleFeatureBtnClicked)));
        this.own(on(this.createSingleFeatureBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._createSingleFeatureBtnClicked();
          }
        })));
      },

      selectFeaturesToCopy: function (selectedFeatures) {
        this.allChildCheckboxes = [];
        if (selectedFeatures && selectedFeatures.length > 0) {
          //clear objects
          this.checkBoxNodes = {};
          this.layerCheckBoxNodes = {};
          this.featuresByLayerId = {};
          this.featureTitlesByLayerId = {};
          this._changeWarningNote(selectedFeatures[0]._layer.geometryType);
          //show/hide singleFeature button
          this._showHideSingleFeatureButton(selectedFeatures[0]._layer.geometryType);
          //show/hide multipleFeature button
          this._showHideMultipleFeatureButton(selectedFeatures[0]._layer.geometryType);
          //First show the main node in which copy features list is shown
          domClass.remove(this.mainNode, "esriCTHidden");
          //Process selected features and arrange them by layer ids
          var processDeferred = new Deferred();
          this._processSelectedFeatures(selectedFeatures, processDeferred).then(lang.hitch(this, function() {
            //Empty the list container
            domConstruct.empty(this.layerListTable);
            //Create list for each layer
            for (var layerId in this.featureTitlesByLayerId) {
              var layer, layerName, groupNode;
              //Get layerinfo by id
              layer = this.layerInfosObj.getLayerInfoById(layerId);
              //Get the layer title
              layerName = layer.title ? layer.title : layer.name;
              //Create a node for this layer and it's features
              groupNode = domConstruct.create('div', {}, this.layerListTable);
              //Create layer(parent) node
              this.layerCheckBoxNodes[layerId] =
                this._createListNode(layerName, groupNode, false, layerId, selectedFeatures[0]._layer.geometryType);
              if (!this.checkBoxNodes[layerId]) {
                this.checkBoxNodes[layerId] = [];
              }
              //Create list node for each feature in the layer
              if (this.featureTitlesByLayerId[layerId].length > 0) {
                this._createFeatureEntries(layerId, groupNode, selectedFeatures[0]._layer.geometryType);
              }
            }
            // Initially we need to highlight all the graphics, since all the features
            // are selected in the features list.
            this._highlightFeatures();
            this.updateSingleFeatureButtonText();
          }));
        }
      },

      /**
       * This function creates objects of selected feature and
       * titles and arrange them by layer ids
       */
      _processSelectedFeatures: function (selectedFeatures, processDeferred) {
        var deferredObj = {}, objectIdsOfSelectedFeaturesInLayer, layerId, featureLayerId,
        layerObjectIdField;
        this.featuresByLayerId = {};
        this.featureTitlesByLayerId = {};
        array.forEach(selectedFeatures, lang.hitch(this, function (feature) {
          if (!this.featuresByLayerId[feature._layer.id]) {
            this.featuresByLayerId[feature._layer.id] = [];
            this.featureTitlesByLayerId[feature._layer.id] = [];
          }
          this.featuresByLayerId[feature._layer.id].push(feature);
          var objectIdField = this.layerInfosObj.getLayerInfoById(feature._layer.id).layerObject.objectIdField;
          //feature title is blank then use objectIdField value as featue title
          var featureTitle = feature.getTitle()? feature.getTitle(): feature.attributes[objectIdField];
          this.featureTitlesByLayerId[feature._layer.id].push(featureTitle);
        }));
        //show loading indicator till we get complete geometries of all the features
        this.loading.show();
        for (featureLayerId in this.featuresByLayerId) {
          if(featureLayerId) {
            layerObjectIdField = this._getObjectIdFieldOfLayer(featureLayerId);
            objectIdsOfSelectedFeaturesInLayer =
              this._getSelectedFeatureObjectIds(this.featuresByLayerId[featureLayerId], layerObjectIdField);
            deferredObj[featureLayerId] = this._getFeatureByChunks(featureLayerId,
              objectIdsOfSelectedFeaturesInLayer);
          }
        }
        all(deferredObj).then(lang.hitch(this, function (deferredObjDetails) {
          for(layerId in deferredObjDetails) {
            if(layerId) {
              this._updateGeometryForSelectedFeature(layerId, deferredObjDetails);
            }
          }
          // Initially we need to highlight all the graphics, since all the features
          // are selected in the features list.
          this._highlightFeatures();
          setTimeout(lang.hitch(this, function () {
            this.loading.hide();
          }), 1000);
        }), lang.hitch(this, function () {
          this.loading.hide();
          Message({
            message: this.nls.copyFeatures.copyFeatureUpdateGeometryError
          });
        }));
        return processDeferred.resolve(null);
      },

      /**
       * This function is used to get objectid field of layer
       */
      _getObjectIdFieldOfLayer: function(layerId) {
        var currentLayerObjectIdField;
        currentLayerObjectIdField = this.layerInfosObj.getLayerInfoById(layerId).layerObject.objectIdField;
        return currentLayerObjectIdField;
      },

      /**
       * This function is used to update geometry of selected features
       */
      _updateGeometryForSelectedFeature: function (layerId, deferredObjDetails) {
        var layerObjectIdField;
        layerObjectIdField = this._getObjectIdFieldOfLayer(layerId);
        array.forEach(this.featuresByLayerId[layerId], lang.hitch(this, function (selectedFeature) {
          array.some(deferredObjDetails[layerId],
            lang.hitch(this, function (selectedMapFeature) {
              if (selectedMapFeature.attributes[layerObjectIdField] ===
                selectedFeature.attributes[layerObjectIdField]) {
                selectedFeature.geometry = selectedMapFeature.geometry;
                return true;
            }
          }));
        }));
      },

      _getSelectedFeatureObjectIds: function(selectedFeaturesInLayer, layerObjectIdField) {
        var objectIdsArray = [];
        array.forEach(selectedFeaturesInLayer, lang.hitch (this, function (currentFeature) {
          objectIdsArray.push(currentFeature.attributes[layerObjectIdField]);
        }));
        return objectIdsArray;
      },

      _getFeatureByChunks: function (featureLayerId, objectIdsArray) {
        var deferred, deferredList, currentLayer, chunkArr, chunkSize;
        currentLayer = this.layerInfosObj.getLayerInfoById(featureLayerId);
        chunkArr = [];
        deferred = new Deferred();
        deferredList = [];
        //For layers added from an GPX file and CSV
        if (currentLayer.layerObject.url === null || currentLayer.layerObject.url === "") {
          chunkSize = objectIdsArray.length;
        } else {
          //get the layers max record count if not then make it as 999
          chunkSize = currentLayer.layerObject.maxRecordCount || 999;
        }
        while (objectIdsArray.length > 0) {
          deferredList.push(this._getSelectedFeatureGeometry(featureLayerId,
            objectIdsArray.splice(0, chunkSize)));
        }
        //Once all the features are fetched, merge them
        all(deferredList).then(lang.hitch(this, function (queryArray) {
          var intersectingFeatures;
          intersectingFeatures = [];
          array.forEach(queryArray, lang.hitch(this, function (result) {
            intersectingFeatures = intersectingFeatures.concat(result.features);
          }));
          deferred.resolve(intersectingFeatures);
        }));
        return deferred.promise;
      },

      /**
       * This function is used to get the deferred object which returns geometry
       */
      _getSelectedFeatureGeometry: function (featureLayerId, objectIdsArray) {
        var deferred, queryTask, query, currentLayer;
        currentLayer = this.layerInfosObj.getLayerInfoById(featureLayerId);
        queryTask = new QueryTask(currentLayer.getUrl());
        query = new Query();
        query.outFields = [currentLayer.layerObject.objectIdField];
        query.objectIds = objectIdsArray;
        query.returnGeometry = true;
        query.outSpatialReference = this.map.spatialReference;
        //For layers added from an GPX file and CSV
        if (currentLayer.layerObject.url === null || currentLayer.layerObject.url === "") {
          deferred = currentLayer.layerObject.queryFeatures(query);
          return deferred.promise;
        } else {
          deferred = queryTask.execute(query);
          return deferred.promise;
        }
      },

      /**
       * This function create entries in the list for each feature
       */
      _createFeatureEntries: function (layerId, groupNode, selectedLayerGeometryType) {
        array.forEach(this.featureTitlesByLayerId[layerId], lang.hitch(this, function (feature) {
          var checkBox = this._createListNode(feature, groupNode, true, layerId, selectedLayerGeometryType);
          this.checkBoxNodes[layerId].push(checkBox);
          this.allChildCheckboxes.push(checkBox);
        }));
      },

      /**
       * This function creates the checkbox in the list and handle its events
       */
      _createListNode: function (layerLabel, groupNode, isChild, layerId, selectedLayerGeometryType) {
        var parentNode, checkBoxNode, checkBox, checked;
        //Create nodes to hold the checkbox
        parentNode = domConstruct.create('div', {
          'class': 'jimu-widget-row esriCTCopyFeaturesNode'
        }, groupNode);
        checkBoxNode = domConstruct.create('div', {
          'class': 'jimu-float-leading checkBoxNode'
        }, parentNode);
        //Create a new checkbox
        checked = (selectedLayerGeometryType === "esriGeometryPoint" && this.hideMultipleFeatureButton) ?
          false : true;
        checkBox = new CheckBox({ label: layerLabel, checked: checked }, checkBoxNode);
        //Based on if the node is for parent(Layer) /child(feature) add required events & classes
        if (isChild) {
          domClass.add(parentNode, "esriCTCopyFeaturesChildNode");
          domAttr.set(checkBox.domNode, "parentLayerId", layerId);
          on(checkBox.domNode, 'click', lang.hitch(this, this._childNodeStateChanged));
        } else {
          domAttr.set(checkBox.domNode, "layerId", layerId);
          //layer geometry type is point and has unique field then disable parent
          if (!checked) {
            checkBox.setStatus(false);
          }
          on(checkBox.domNode, 'click', lang.hitch(this, this._parentNodeStateChanged));
        }
        return checkBox;
      },

      /**
       * Callback handler for parents checkbox change event.
       * This will change the state of related child's based on parents state.
       */
      _parentNodeStateChanged: function (evt) {
        var layerId = domAttr.get(evt.currentTarget, "layerId");
        var parentCheckbox = this.layerCheckBoxNodes[layerId];
        //Parent is disabled in case of layer geometry type is point and has unique field
        //Then dont do anything on click
        if (parentCheckbox.getStatus()) {
          var childCheckboxes = this.checkBoxNodes[layerId];
          var parentState = parentCheckbox.getValue();
          array.forEach(childCheckboxes, lang.hitch(this, function (checkBox) {
            if (parentState) {
              checkBox.setValue(true);
            } else {
              checkBox.setValue(false);
            }
          }));
          // on click of layer checkbox, its child features gets checked/unchecked,
          // hence highlight the features accordingly.
          this._highlightFeatures();
        }
        this.updateSingleFeatureButtonText();
      },

      /**
       * Callback handler for child checkbox change event.
       * This will change the state of related parent based on states of all child's.
       */
      _childNodeStateChanged: function (evt) {
        var layerId = domAttr.get(evt.currentTarget, "parentLayerId");
        var parentCheckbox = this.layerCheckBoxNodes[layerId];
        var childCheckboxes = this.checkBoxNodes[layerId];
        var enableParent = true;
        //Parent is disabled in case of layer geometry type is point and has unique field
        //Then On checking a new checkbox the previously checked one will be unchecked
        if (!parentCheckbox.getStatus()) {
          array.forEach(this.allChildCheckboxes, lang.hitch(this, function (checkBox) {
            if (checkBox.getValue() && checkBox.domNode !== evt.currentTarget) {
              checkBox.setValue(false);
            }
          }));
        }
        // highlight individual feature depending upon its selection in the list
        this._highlightFeatures();
        array.some(childCheckboxes, lang.hitch(this, function (checkBox) {
          if (!checkBox.getValue()) {
            enableParent = false;
            return true;
          }
        }));
        parentCheckbox.setValue(enableParent);
        this.updateSingleFeatureButtonText();
      },

      /**
       * change the text of the button "Create 1 Multi-Geometry feature" to "Create Feature"
       * when only one feature is selected(checked) on the screen
       */
      updateSingleFeatureButtonText: function () {
        var checkedCount = 0;
        array.some(this.allChildCheckboxes, lang.hitch(this, function (checkBox) {
          if (checkBox.getValue()) {
            checkedCount++;
          }
          if (checkedCount > 1) {
            return true;
          }
        }));

        if (checkedCount === 1 || this.allChildCheckboxes.length === 1) {
          domAttr.set(this.createSingleFeatureBtn, "innerHTML", this.nls.copyFeatures.createOneSingleFeature);
          domAttr.set(this.createSingleFeatureBtn, "aria-label", this.nls.copyFeatures.createOneSingleFeature);
          domAttr.set(this.createSingleFeatureBtn, "title", this.nls.copyFeatures.createOneSingleFeature);
          domClass.add(this.createMultipleFeaturesBtn, "esriCTCanCreateOnlyOneFeature");
          if (this.isPointGeometryFeatures) {
            domClass.remove(this.createSingleFeatureBtn, "esriCTHidden");
          }

        } else {
          domAttr.set(this.createSingleFeatureBtn, "innerHTML", this.nls.copyFeatures.createSingleFeature);
          domAttr.set(this.createSingleFeatureBtn, "aria-label", this.nls.copyFeatures.createSingleFeature);
          domAttr.set(this.createSingleFeatureBtn, "title", this.nls.copyFeatures.createSingleFeature);
          domClass.remove(this.createMultipleFeaturesBtn, "esriCTCanCreateOnlyOneFeature");
          if (this.isPointGeometryFeatures) {
            domClass.add(this.createSingleFeatureBtn, "esriCTHidden");
          }
        }
      },

      /**
       * Callback handler for cancel button clicked event.
       */
      cancelBtnClicked: function () {
        domClass.add(this.mainNode, "esriCTHidden");
        // on going back from copy-features clear highlight layer
        this.highlightGraphicsLayer.clear();
        this.emit("cancelBtnClicked");
      },

      /**
       * Callback handler for create multiple features button clicked event.
       */
      _createMultipleFeaturesBtnClicked: function () {
        var allSelectedGeometries = [], allSelectedFeatures;
        allSelectedFeatures = this._getSelectedFeaturesForCopy();
        if (allSelectedFeatures && allSelectedFeatures.length > 0) {
          array.forEach(allSelectedFeatures, lang.hitch(this, function (feature) {
            if(feature && feature.geometry) {
              // to fetch attributes later, entire feature is pushed
              allSelectedGeometries.push(feature);
            }
          }));
          this.emit("createMultipleFeatures", allSelectedGeometries);
        }
      },

      /**
       * Callback handler for create single feature button clicked event.
       */
      _createSingleFeatureBtnClicked: function () {
        var allSelectedFeatures;
        allSelectedFeatures = this._getSelectedFeaturesForCopy();
        if (allSelectedFeatures && allSelectedFeatures.length > 0) {
          this.emit("createSingleFeature", allSelectedFeatures);
        }
      },

      /**
       * Validates if at features are selected or not and shows error message.
       */
      _validateSelectedFeature: function (allSelectedFeatures) {
        if (!allSelectedFeatures || allSelectedFeatures.length <= 0) {
          Message({
            message: this.nls.copyFeatures.selectFeatureToCopyMessage
          });
        }
      },

      /**
       * Returns all features which are checked in the list
       */
      _getSelectedFeaturesForCopy: function () {
        var layerId, allSelectedFeatures = [];
        for (layerId in this.featuresByLayerId) {
          var selectedFeaturesForLayer = this._getSelectedFeaturesByLayerId(layerId);
          if (selectedFeaturesForLayer.length > 0) {
            allSelectedFeatures = allSelectedFeatures.concat(selectedFeaturesForLayer);
          }
        }
        this._validateSelectedFeature(allSelectedFeatures);
        return allSelectedFeatures;
      },

      /**
       * Returns checked features for the selected layer id
       */
      _getSelectedFeaturesByLayerId: function (layerId) {
        var checkBoxes = this.checkBoxNodes[layerId];
        var selectedFeatures = [];
        array.forEach(checkBoxes, lang.hitch(this, function (checkBox, index) {
          if (checkBox.getValue()) {
            selectedFeatures.push(this.featuresByLayerId[layerId][index]);
          }
        }));
        return selectedFeatures;
      },

      /**
       * Show/Hide button, to create 1 multiGeometry feature in case of point geometry type
       */
      _showHideSingleFeatureButton: function (geometryType) {
        if (geometryType === "esriGeometryPoint") {
          this.isPointGeometryFeatures = true;
          domClass.add(this.createSingleFeatureBtn, "esriCTHidden");
        } else {
          this.isPointGeometryFeatures = false;
          domClass.remove(this.createSingleFeatureBtn, "esriCTHidden");
        }
      },

      /**
       * Show/Hide button, to create multiple features in case of polygon/polyline with unique fields
       */
      _showHideMultipleFeatureButton: function (geometryType) {
        if (geometryType !== "esriGeometryPoint" && this.hideMultipleFeatureButton) {
          domClass.add(this.createMultipleFeaturesBtn, "esriCTHidden");
        } else {
          domClass.remove(this.createMultipleFeaturesBtn, "esriCTHidden");
        }
      },


      /**
       * This function is used to add graphics layer on map.
       * This graphics layer is used to highlight features selected from select tool
       */
      _createNewGraphicsLayer: function (layerId) {
        var newGraphicsLayer, layerProperties;
        layerProperties = {};
        layerId = layerId + this.widgetId;
        if (layerId) {
          //if layer exist on map remove it
          if (this.map._layers[layerId]) {
            this.map.removeLayer(this.map._layers[layerId]);
          }
          //set id in layerProperties
          layerProperties = {
            id: layerId
          };
        }
        newGraphicsLayer = new GraphicsLayer(layerProperties);
        this.map.addLayer(newGraphicsLayer);
        return newGraphicsLayer;
      },

      /**
       * This function is used to highlight all the selected features from the list
       */
      _highlightFeatures: function () {
        // on every new selection clear all the graphics
        this.highlightGraphicsLayer.clear();
        for (var layerId in this.featureTitlesByLayerId) {
          this._highlightSingleLayerFeatures(layerId);
        }
      },

      /**
       * This function is used to highlight features of corresponding layer
       * passed as a parameter to it
       */
      _highlightSingleLayerFeatures: function(layerId) {
        var featureLayer, highlightFeatureArr;
        featureLayer = this.map.getLayer(layerId);
        // get all the features which are checked in the list
        highlightFeatureArr = this._getSelectedFeaturesByLayerId(layerId);
        array.forEach(highlightFeatureArr, lang.hitch(this, function (feature) {
          var graphic;
          graphic = highlightSymbolUtils.getHighLightSymbol(feature, featureLayer);
          this.highlightGraphicsLayer.add(graphic);
        }));
      },

      /**
       * This function is used to is used to show warning note based on geometry type
       */
      _changeWarningNote: function (geometryType) {
        var warningMessage;
        if (geometryType === "esriGeometryPoint" && this.hideMultipleFeatureButton) {
          warningMessage = this.nls.copyFeatures.canNotSaveMultipleFeatureWarning;
        } else if (geometryType !== "esriGeometryPoint" && this.hideMultipleFeatureButton) {
          warningMessage = this.nls.copyFeatures.createOnlyOneMultipartFeatureWarning;
        } else {
          warningMessage = this.nls.copyFeatures.multipleFeatureSaveWarning;
        }
        domAttr.set(this.warningMessage, "innerHTML", warningMessage);
        domAttr.set(this.warningMessage, "aria-label", warningMessage);
      },

      /**
       * Shows the current progress on a scale of 0 to 100, making the `applyEditsProgress` progress bar
       * visible when its value is between 0 and 100, exclusively.
       * @param {number} value Progress percent, 0..100
       */
      setProgressPercentage: function (percentageValue) {
        var value = parseFloat(percentageValue.toFixed());
        if (value <= 0) {
          this.applyEditsProgress.set({ value: 0 });
          domStyle.set(this.applyEditsProgress.domNode, 'display', 'block');
        } else if (value >= 100) {
          this.applyEditsProgress.set({ value: 100 });
          domStyle.set(this.applyEditsProgress.domNode, 'display', 'none');
        } else {
          this.applyEditsProgress.set({ value: value });
        }
      }
    });
  });