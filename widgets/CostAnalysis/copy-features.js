///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
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
  'jimu/dijit/CheckBox',
  'dojo/dom-class',
  "dojo/dom-attr",
  './highlightSymbolUtils',
  'esri/layers/GraphicsLayer',
  'dojo/text!./copy-features.html',
  'jimu/utils',
  'dijit/focus',
  'dojo/keys',
  'dojo/query',
  'dojo/_base/event',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'dojo/Deferred',
  'dojo/promise/all'
], function (
    _WidgetBase,
    _TemplatedMixin,
    declare,
    Evented,
    lang,
    array,
    domConstruct,
    on,
    CheckBox,
    domClass,
    domAttr,
    highlightSymbolUtils,
    GraphicsLayer,
    template,
    jimuUtils,
    focusUtils,
    keys,
    query,
    Event,
    Query,
    QueryTask,
    Deferred,
    all
) {

    return declare([_WidgetBase, Evented, _TemplatedMixin], {

      templateString: template,
      layerLabel: null,
      featuresList: null,
      checkBoxNodes: {},
      layerCheckBoxNodes: {},
      featuresByLayerId: {},
      featureTitlesByLayerId: {},
      _highlightGraphicsLayer: null, // to store the object of graphics layer used to highlight features

      startup: function () {
        this.inherited(arguments);
        this._highlightGraphicsLayer =
        this._createNewGraphicsLayer("highlightGraphicsLayer");
        this.toggleWorkBenchDOMTabindexes("-1");
      },

      postCreate: function () {
        this.checkBoxNodes = {};
        this.layerCheckBoxNodes = {};
        this.featuresByLayerId = {};
        this.featureTitlesByLayerId = {};
        this._highlightGraphicsLayer = null;
        //handel button clicks
        this.own(on(this.cancelBtn, "click", lang.hitch(this, function () {
          this.cancelBtnClicked();
          this.toggleWorkBenchDOMTabindexes("0");
          this.emit("cancelBtnClicked");
        })));
        this.own(on(this.cancelBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            Event.stop(evt);
            this.cancelBtnClicked();
            this.toggleWorkBenchDOMTabindexes("0");
            this.emit("cancelBtnClicked");
          }
        })));
        this.own(on(this.createMultipleFeaturesBtn, "click",
          lang.hitch(this, this._createMultipleFeaturesBtnClicked)));
        this.own(on(this.createMultipleFeaturesBtn, "keydown",
          lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              Event.stop(evt);
              this._createMultipleFeaturesBtnClicked();
            }
          })));

        this.own(on(this.createSingleFeatureBtn, "click",
          lang.hitch(this, this._createSingleFeatureBtnClicked)));
        this.own(on(this.createSingleFeatureBtn, "keydown",
          lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              Event.stop(evt);
              this._createSingleFeatureBtnClicked();
            }
          })));
      },

      // to toggle tab indexes of work bench panel for accessibility handling aftet ESCAPE --> TAB
      toggleWorkBenchDOMTabindexes: function (tabindex) {
        query(".esriCTWorkBenchDOM", this.widgetDomNode).forEach(lang.hitch(this, function (workBenchDOM) {
          domAttr.set(workBenchDOM, "tabindex", tabindex);
        }));
      },

      selectFeaturesToCopy: function (selectedFeatures) {
        if (selectedFeatures && selectedFeatures.length > 0) {
          //clear objects
          this.checkBoxNodes = {};
          this.layerCheckBoxNodes = {};
          this.featuresByLayerId = {};
          this.featureTitlesByLayerId = {};
          //show/hide singleFeature button
          this._showHideSingleFeatureButton(selectedFeatures[0]._layer.geometryType);
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
                this._createListNode(layerName, groupNode, false, layerId);
              if (!this.checkBoxNodes[layerId]) {
                this.checkBoxNodes[layerId] = [];
              }
              //Create list node for each feature in the layer
              if (this.featureTitlesByLayerId[layerId].length > 0) {
                this._createFeatureEntries(layerId, groupNode);
              }
            }
            // Initially we need to highlight all the graphics, since all the features
            // are selected in the features list.
            this._highlightFeatures();
          }));
        }
        this._setFirstAndLastFocusNodes();
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
          this.featureTitlesByLayerId[feature._layer.id].push(feature.getTitle());
        }));

        for (featureLayerId in this.featuresByLayerId) {
          if(featureLayerId) {
            layerObjectIdField = this._getObjectIdFieldOfLayer(featureLayerId);
            objectIdsOfSelectedFeaturesInLayer =
            this._getSelectedFeatureObjectIds(this.featuresByLayerId[featureLayerId], layerObjectIdField);
            deferredObj[featureLayerId] =
            this._getSelectedFeatureGeometry(featureLayerId, objectIdsOfSelectedFeaturesInLayer);
          }
        }
        all(deferredObj).then(lang.hitch(this, function (deferredObjDetails) {
          for(layerId in deferredObjDetails) {
            if(layerId) {
              this._updateGeometryForSelectedFeature(layerId, deferredObjDetails);
            }
          }
        }), lang.hitch(this, function () {
          this.appUtils.showMessage(this.nls.copyFeatures.copyFeatureUpdateGeometryError);
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
        array.forEach(this.featuresByLayerId[layerId], lang.hitch(this, function(selectedFeature) {
          array.forEach(deferredObjDetails[layerId].features,
            lang.hitch(this, function(selectedMapFeature) {
            if(selectedMapFeature.attributes[layerObjectIdField] ===
              selectedFeature.attributes[layerObjectIdField]) {
              selectedFeature.geometry = selectedMapFeature.geometry;
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
        deferred = queryTask.execute(query);
        return deferred.promise;
      },

      /**
       * This function create entries in the list for each feature
       */
      _createFeatureEntries: function (layerId, groupNode) {
        array.forEach(this.featureTitlesByLayerId[layerId], lang.hitch(this, function (feature) {
          var checkBox = this._createListNode(feature, groupNode, true, layerId);
          this.checkBoxNodes[layerId].push(checkBox);
        }));
      },

      /**
       * This function creates the checkbox in the list and handle its events
       */
      _createListNode: function (layerLabel, groupNode, isChild, layerId) {
        var parentNode, checkBoxNode, checkBox;
        //Create nodes to hold the checkbox
        parentNode = domConstruct.create('div', {
          'class': 'jimu-widget-row esriCTCopyFeaturesNode'
        }, groupNode);
        checkBoxNode = domConstruct.create('div', {
          'class': 'jimu-float-leading checkBoxNode'
        }, parentNode);
        //Create a new checkbox
        checkBox = new CheckBox({ label: layerLabel, checked: true }, checkBoxNode);
        //Based on if the node is for parent(Layer) /child(feature) add required events & classes
        if (isChild) {
          domClass.add(parentNode, "esriCTCopyFeaturesChildNode");
          domAttr.set(checkBox.domNode, "parentLayerId", layerId);
          on(checkBox.domNode, 'click', lang.hitch(this, this._childNodeStateChanged));
          on(checkBox.domNode, 'keydown', lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this._childNodeStateChanged(evt);
            }
          }));
        } else {
          domAttr.set(checkBox.domNode, "layerId", layerId);
          on(checkBox.domNode, 'click', lang.hitch(this, this._parentNodeStateChanged));
          on(checkBox.domNode, 'keydown', lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this._parentNodeStateChanged(evt);
            }
          }));
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
        // highlight individual feature depending upon its selection in the list
        this._highlightFeatures();
        array.some(childCheckboxes, lang.hitch(this, function (checkBox) {
          if (!checkBox.getValue()) {
            enableParent = false;
            return true;
          }
        }));
        parentCheckbox.setValue(enableParent);
      },

      /**
       * Callback handler for cancel button clicked event.
       */
      cancelBtnClicked: function () {
        domClass.add(this.mainNode, "esriCTHidden");
        // on going back from copy-features clear highlight layer
        this._highlightGraphicsLayer.clear();
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
              allSelectedGeometries.push(feature.geometry);
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
          this.appUtils.showMessage(this.nls.copyFeatures.selectFeatureToCopyMessage);
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
          domAttr.set(this.createSingleFeatureBtn, "tabindex", "-1");
        } else {
          domClass.remove(this.createSingleFeatureBtn, "esriCTHidden");
          domAttr.set(this.createSingleFeatureBtn, "tabindex", "0");
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
        this._highlightGraphicsLayer.clear();
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
          this._highlightGraphicsLayer.add(graphic);
        }));
      },

      /**
       * This function is used to set first and last focus node
       */
      _setFirstAndLastFocusNodes: function () {
        var featureCheckBoxNodes = query(".jimu-checkbox", this.domNode);
        if (featureCheckBoxNodes.length) {
          focusUtils.focus(featureCheckBoxNodes[0]);
          jimuUtils.initFirstFocusNode(this.widgetDomNode, featureCheckBoxNodes[0]);
        }
        jimuUtils.initLastFocusNode(this.widgetDomNode, this.cancelBtn);
      }
    });
  });