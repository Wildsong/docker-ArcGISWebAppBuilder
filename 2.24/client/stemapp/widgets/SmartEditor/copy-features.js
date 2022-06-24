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
  'dojo/query',
  'dojo/string',
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
  'dojo/dom-style',
  'jimu/dijit/Popup',
  './fieldsMapping'
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
    dojoQuery,
    String,
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
    domStyle,
    Popup,
    fieldsMapping) {

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
      fieldsMappingObj: null,
      layerOrderSequence: [],

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
        this.fieldsMappingObj = null;
        this.layerOrderSequence = [];
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
        this.own(on(this.fieldsMatchingBtn, "click",
          lang.hitch(this, this._fieldMatchingBtnClicked)));
        this.own(on(this.fieldsMatchingBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._fieldMatchingBtnClicked();
          }
        })));
      },

      selectFeaturesToCopy: function (selectedFeatures, targetLayerDetails) {
        var keys;
        this.allChildCheckboxes = [];
        if (selectedFeatures && selectedFeatures.length > 0) {
          //clear objects
          this.checkBoxNodes = {};
          this.layerCheckBoxNodes = {};
          this.featuresByLayerId = {};
          this.featureTitlesByLayerId = {};
          this.targetLayerDetails = targetLayerDetails;
          var geometryType = this.targetLayerDetails.featureLayer.geometryType;
          this._changeWarningNote(geometryType);
          //show/hide singleFeature button
          this._showHideSingleFeatureButton(geometryType);
          //show/hide multipleFeature button
          this._showHideMultipleFeatureButton(geometryType);
          //First show the main node in which copy features list is shown
          domClass.remove(this.mainNode, "esriCTHidden");
          //Process selected features and arrange them by layer ids
          var processDeferred = new Deferred();
          this._processSelectedFeatures(selectedFeatures, processDeferred).then(lang.hitch(this, function () {
            //Empty the list container
            domConstruct.empty(this.layerListTable);
            var matchedLayerId = [];
            //Create list for each layer according to layers order in map
            array.forEach(this.layerInfosObj.getLayerInfoArray(), lang.hitch(this,
              function (layerInfo) {
                if (this.featureTitlesByLayerId.hasOwnProperty(layerInfo.id)) {
                  matchedLayerId.push(layerInfo.id);
                  this._createFeatureListUI(layerInfo.id, geometryType);
                  return true;
                }
              }));

            //create feature list UI for the layers whose id is not matched with layerInfos id. for e.g.KML layer 
            for (var layerId in this.featureTitlesByLayerId) {
              if (this.featureTitlesByLayerId.hasOwnProperty(layerId) && matchedLayerId.indexOf(layerId) === -1 &&
                this.layerInfosObj.getLayerInfoById(layerId)) {
                this._createFeatureListUI(layerId, geometryType);
              }
            }

            //Check number of layers in the DOM and accordingly expand the first layer
            if (this._canExpandFirstLayerNode()) {
              dojoQuery(".esriCTExpandCollapseNode", this.domNode)[0].click();
            }
            // Initially we need to highlight all the graphics, since all the features
            // are selected in the features list.
            this._highlightFeatures();
            this.updateSingleFeatureButtonText();
            keys = Object.keys(this.layerCheckBoxNodes);
            // If only one unique is selected it should be checked
            if (geometryType === "esriGeometryPoint" && this.hideMultipleFeatureButton &&
              this.allChildCheckboxes.length === 1 && this.layerCheckBoxNodes && keys.length === 1) {
              this.layerCheckBoxNodes[keys[0]].setStatus(true);
              this.layerCheckBoxNodes[keys[0]].domNode.click();
              this.allChildCheckboxes[0].setValue(true);
            }
          }));
        }
      },

      /**
       * This function decides whether to open the first layer node or not
       */
      _canExpandFirstLayerNode: function () {
        var canExpand = false, keys = [];
        keys = Object.keys(this.layerCheckBoxNodes);
        //If only one layer found for the copy features then set the flag
        //value to true
        if (this.layerCheckBoxNodes && keys.length === 1) {
          canExpand = true;
          //If more than one layer if found and first layer has a 10 or less features
          //set the flag value to true
        } else if (keys.length > 1 && this.layerOrderSequence && this.layerOrderSequence[0] &&
          this.layerOrderSequence[0] <= 10) {
          canExpand = true;
        }
        return canExpand;
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
          var featureTitle = feature.getTitle() ? feature.getTitle() : feature.attributes[objectIdField];
          this.featureTitlesByLayerId[feature._layer.id].push(featureTitle);
        }));
        //show loading indicator till we get complete geometries of all the features
        this.loading.show();
        for (featureLayerId in this.featuresByLayerId) {
          if (featureLayerId) {
            layerObjectIdField = this._getObjectIdFieldOfLayer(featureLayerId);
            objectIdsOfSelectedFeaturesInLayer =
              this._getSelectedFeatureObjectIds(this.featuresByLayerId[featureLayerId], layerObjectIdField);
            deferredObj[featureLayerId] = this._getFeatureByChunks(featureLayerId,
              objectIdsOfSelectedFeaturesInLayer);
          }
        }
        all(deferredObj).then(lang.hitch(this, function (deferredObjDetails) {
          for (layerId in deferredObjDetails) {
            if (layerId) {
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
      _getObjectIdFieldOfLayer: function (layerId) {
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

      _getSelectedFeatureObjectIds: function (selectedFeaturesInLayer, layerObjectIdField) {
        var objectIdsArray = [];
        array.forEach(selectedFeaturesInLayer, lang.hitch(this, function (currentFeature) {
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
      _createFeatureEntries: function (layerId, groupNode, selectedLayerGeometryType, checkBoxWrapper) {
        array.forEach(this.featureTitlesByLayerId[layerId], lang.hitch(this, function (feature) {
          var checkBox = this._createListNode(feature, groupNode, true, layerId, selectedLayerGeometryType,
            checkBoxWrapper);
          this.checkBoxNodes[layerId].push(checkBox);
          this.allChildCheckboxes.push(checkBox);
        }));
      },

      /**
       * This function creates the checkbox in the list and handle its events
       */
      _createListNode: function (layerLabel, groupNode, isChild, layerId, selectedLayerGeometryType,
        checkBoxWrapper) {
        var parentNode, checkBoxNode, checkBox, checked, expandCollapseDOM;
        //Create nodes to hold the checkbox
        parentNode = domConstruct.create('div', {
          'class': 'jimu-widget-row esriCTCopyFeaturesNode'
        });
        checkBoxNode = domConstruct.create('div', {
          'class': 'jimu-float-leading checkBoxNode',
          'style': 'width: calc(100% - 20px)'
        }, parentNode);
        //Create a new checkbox
        checked = (selectedLayerGeometryType === "esriGeometryPoint" && this.hideMultipleFeatureButton) ?
          false : true;
        checkBox = new CheckBox({ label: layerLabel, checked: checked }, checkBoxNode);
        domAttr.set(checkBox.domNode, "layerName", layerLabel);
        //Based on if the node is for parent(Layer) /child(feature) add required events & classes
        if (isChild) {
          domClass.add(parentNode, "esriCTCopyFeaturesChildNode");
          domAttr.set(checkBox.domNode, "parentLayerId", layerId);
          on(checkBox.domNode, 'click', lang.hitch(this, this._childNodeStateChanged));
          domAttr.set(checkBoxWrapper, "expandLayerId", layerId);
          domConstruct.place(parentNode, checkBoxWrapper);
        } else {
          this._updateParentCheckBoxLabel(checkBox, layerLabel,
            this.featureTitlesByLayerId[layerId].length, layerId);
          //Create expand/collapse node
          expandCollapseDOM = domConstruct.create("div", {
            "class": "esriCTExpandCollapseNode collapsed",
            "tabindex": "0",
            "role": "button",
            "aria-label": layerLabel,
            "aria-expanded": "false"
          });
          domConstruct.place(expandCollapseDOM, parentNode, "first");
          //set the attributes
          domAttr.set(checkBox.domNode, "layerId", layerId);
          domAttr.set(checkBox.domNode, "layerName", layerLabel);
          domAttr.set(expandCollapseDOM, "layerId", layerId);
          //layer geometry type is point and has unique field then disable parent
          if (!checked) {
            this._updateParentCheckBoxLabel(checkBox, layerLabel, 0, layerId);
            checkBox.setStatus(false);
          }
          on(checkBox.domNode, 'click', lang.hitch(this, this._parentNodeStateChanged));
          domConstruct.place(parentNode, groupNode, "first");
          //Add event listener for expand collapse node
          this.own(on(expandCollapseDOM, "click", lang.hitch(this, function (evt) {
            this._expandButtonClicked(evt);
          })));

          this.own(on(expandCollapseDOM, "keydown", lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this._expandButtonClicked(evt);
            }
          })));
        }
        return checkBox;
      },

      /**
       * Callback handler for expand/collapse button click event
       */
      _expandButtonClicked: function (evt) {
        var layerName, childCheckBoxDom;
        layerName = domAttr.get(evt.currentTarget, "layerId");
        childCheckBoxDom = dojoQuery("[expandLayerId=" + layerName + "]", this.domNode)[0];
        //Add expand or collapse class based on the current state
        if (childCheckBoxDom) {
          if (domClass.contains(evt.currentTarget, "expanded")) {
            domClass.replace(evt.currentTarget, "collapsed", "expanded");
            domAttr.set(evt.currentTarget, "aria-expanded", "false");
            domClass.add(childCheckBoxDom, "esriCTHidden");
          } else {
            domClass.replace(evt.currentTarget, "expanded", "collapsed");
            domAttr.set(evt.currentTarget, "aria-expanded", "true");
            domClass.remove(childCheckBoxDom, "esriCTHidden");
          }
        }
      },

      /**
       * Callback handler for parents checkbox change event.
       * This will change the state of related child's based on parents state.
       */
      _parentNodeStateChanged: function (evt) {
        var layerId = domAttr.get(evt.currentTarget, "layerId");
        var parentCheckbox = this.layerCheckBoxNodes[layerId];
        var layerName = domAttr.get(parentCheckbox.domNode, "layerName");
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
          //Update the feature count based on parent check box state
          if (parentState) {
            this._updateParentCheckBoxLabel(parentCheckbox, layerName,
              this.featureTitlesByLayerId[layerId].length, layerId);
          } else {
            this._updateParentCheckBoxLabel(parentCheckbox, layerName, 0, layerId);
          }
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
        var layerName = domAttr.get(this.layerCheckBoxNodes[layerId].domNode, "layerName");
        var parentCheckbox = this.layerCheckBoxNodes[layerId];
        var childCheckboxes = this.checkBoxNodes[layerId];
        var enableParent = false;
        //Parent is disabled in case of layer geometry type is point and has unique field
        //Then On checking a new checkbox the previously checked one will be unchecked
        if (!parentCheckbox.getStatus()) {
          array.forEach(this.allChildCheckboxes, lang.hitch(this, function (checkBox) {
            if (checkBox.getValue() && checkBox.domNode !== evt.currentTarget) {
              checkBox.setValue(false);
              //Once the checkbox is un-checked then we need to update the label 
              //of its parent check box
              var layerId = domAttr.get(checkBox.domNode, "parentLayerId");
              this._updateParentCheckBoxLabel(this.layerCheckBoxNodes[layerId],
                domAttr.get(this.layerCheckBoxNodes[layerId].domNode, "layerName"), 0,
                layerId);
            }
          }));
        }
        // highlight individual feature depending upon its selection in the list
        this._highlightFeatures();
        //Check the parent checkbox if at least one of the child is checked
        array.some(childCheckboxes, lang.hitch(this, function (checkBox) {
          if (checkBox.getValue()) {
            enableParent = true;
            return true;
          }
        }));
        parentCheckbox.setValue(enableParent, false);
        this.updateSingleFeatureButtonText();
        //get all the checked checkboxes count and then update the 
        //parent checkbox label
        var checkedBoxes = this.checkBoxNodes[layerId].filter(
          lang.hitch(this, function (checkbox) {
            return checkbox.checked === true;
          }));
        this._updateParentCheckBoxLabel(parentCheckbox, layerName, checkedBoxes.length, layerId);
      },

      /**
      * Update parent check box label and aria-label for accessability
      */
      _updateParentCheckBoxLabel: function (parentCheckbox, layerName, selectedFeatureCount, layerId) {
        parentCheckbox.setLabel(String.substitute(this.nls.copyFeatures.layerLabel, {
          layerName: layerName,
          selectedFeatures: selectedFeatureCount,
          totalFeatures: this.featureTitlesByLayerId[layerId].length
        }));

        domAttr.set(parentCheckbox.domNode, "aria-label",
          String.substitute(this.nls.copyFeatures.layerAriaLabel, {
            layerName: layerName,
            selectedFeatures: selectedFeatureCount,
            totalFeatures: this.featureTitlesByLayerId[layerId].length
          }));
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
          if (this.targetLayerDetails.featureLayer.geometryType === "esriGeometryPoint") {
            domClass.remove(this.createSingleFeatureBtn, "esriCTHidden");
          }
        } else {
          domAttr.set(this.createSingleFeatureBtn, "innerHTML", this.nls.copyFeatures.createSingleFeature);
          domAttr.set(this.createSingleFeatureBtn, "aria-label", this.nls.copyFeatures.createSingleFeature);
          domAttr.set(this.createSingleFeatureBtn, "title", this.nls.copyFeatures.createSingleFeature);
          domClass.remove(this.createMultipleFeaturesBtn, "esriCTCanCreateOnlyOneFeature");
          if (this.targetLayerDetails.featureLayer.geometryType === "esriGeometryPoint") {
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
            if (feature && feature.geometry) {
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
      * Callback handler for field matching button clicked event.
      */
      _fieldMatchingBtnClicked: function () {
        //create source layers and target layer details for field mapping
        var sourceLayersInfo = [];
        var targetLayerInfo = {
          id: this.targetLayerDetails.featureLayer.id,
          fields: this.targetLayerDetails.fieldInfos,
          fieldValues: this.targetLayerDetails.fieldValues
        };
        var matchedLayerId = [];
        //loop through all source layer and create source layer details
        //according to layers order in map
        array.forEach(this.layerInfosObj.getLayerInfoArray(), lang.hitch(this,
          function (layerInfo) {
            if (this.featuresByLayerId.hasOwnProperty(layerInfo.id)) {
              matchedLayerId.push(layerInfo.id);
              sourceLayersInfo.push(this._getSourceLayerInfo(layerInfo.id));
            }
          }));
        //get source layer info for the layers whose id is not matched with layerInfos id. for e.g.KML layer
        for (var layerId in this.featuresByLayerId) {
          if (this.featuresByLayerId.hasOwnProperty(layerId) && matchedLayerId.indexOf(layerId) === -1 &&
            this.layerInfosObj.getLayerInfoById(layerId)) {
            sourceLayersInfo.push(this._getSourceLayerInfo(layerId));
          }
        }
        //create new instance of field mapping
        this.fieldsMappingObj = new fieldsMapping({
          nls: this.nls,
          sourceLayerDetails: sourceLayersInfo,
          targetLayerDetails: targetLayerInfo,
          fieldMappingDetails: this.fieldMappingDetails,
          usePresetValues: this.usePresetValues,
          overrideDefaultsByCopiedFeature: this.config.editor.overrideDefaultsByCopiedFeature
        });
        //on field mapping change update details in the objects
        this.own(on(this.fieldsMappingObj, "field-mapping-changed", lang.hitch(this, function (updatedInfo) {
          this.fieldMappingDetails = updatedInfo.fieldMappingDetails;
          this.config.editor.overrideDefaultsByCopiedFeature =
            updatedInfo.overrideDefaultsByCopiedFeature;
        })));
      },

      _getConfiguredFieldInfos: function (layerFieldInfo, configuredFieldInfo) {
        var fieldInfos = [];
        array.forEach(configuredFieldInfo, function (field) {
          var fieldInfoFromLayer = this._getFieldInfoByFieldName(layerFieldInfo, field.fieldName);
          var fInfo = lang.mixin(lang.clone(fieldInfoFromLayer), field);
          fieldInfos.push(fInfo);
        }, this);
        return fieldInfos;
      },

      _getFieldInfoByFieldName: function (fieldInfos, fieldName) {
        var fieldInfo = {};
        array.some(fieldInfos, function (field) {
          if (field.name === fieldName) {
            lang.mixin(fieldInfo, field);
            return true;
          }
        });
        return fieldInfo;
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
          domClass.add(this.createSingleFeatureBtn, "esriCTHidden");
        } else {
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
      _highlightSingleLayerFeatures: function (layerId) {
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
      },

      /**
       * This function is used to create feature list UI
       */
      _createFeatureListUI: function (currentLayerId, geometryType) {
        var layer, layerName, groupNode, checkBoxWrapper, layerId;
        layerId = currentLayerId;
        //Get layer info by id
        layer = this.layerInfosObj.getLayerInfoById(layerId);
        //Get the layer title
        layerName = layer.title ? layer.title : layer.name;
        //Create a node for this layer and it's features
        groupNode = domConstruct.create('div', {}, this.layerListTable);
        //create parent node to add all the checkboxes in the DOM
        checkBoxWrapper = domConstruct.create('div', {
          "class": "esriCTHidden"
        });
        //Add the DOM at the last position
        domConstruct.place(checkBoxWrapper, groupNode, "last");
        //Create layer(parent) node
        this.layerCheckBoxNodes[layerId] =
          this._createListNode(layerName, groupNode, false, layerId, geometryType);
        if (!this.checkBoxNodes[layerId]) {
          this.checkBoxNodes[layerId] = [];
        }
        //Create list node for each feature in the layer
        if (this.featureTitlesByLayerId[layerId].length > 0) {
          this._createFeatureEntries(layerId, groupNode, geometryType,
            checkBoxWrapper);
          this.layerOrderSequence.push(this.featureTitlesByLayerId[layerId].length);
        }
      },

      /**
       * This function is used to get source layer info
       */
      _getSourceLayerInfo: function (currentLayerId) {
        var layer, layerName, fields, layerId;
        layerId = currentLayerId;
        //Get layer info by id
        layer = this.layerInfosObj.getLayerInfoById(layerId);
        //get the source fields from web map
        //So, irrespective of custom or honor web map settings, the source field will be fetched
        //from the web map directly
        fields = this.editUtils.getFieldInfosFromWebmap(layer) || layer.layerObject.fields;
        //check if layer is valid and have valid layerObject and fields
        if (layer && layer.layerObject && fields) {
          //Get the layer title
          layerName = layer.title ? layer.title : layer.name;
          return {
            id: layerId,
            fields: fields,
            name: layerName
          };
        }
      }
    });
  });