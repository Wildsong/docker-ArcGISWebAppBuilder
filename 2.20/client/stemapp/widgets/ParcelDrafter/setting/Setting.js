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
  'dojo/_base/declare',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/dijit/TabContainer3',
  'dijit/registry',
  'dojo/query',
  'dojo/on',
  'dojo/_base/lang',
  'dojo/_base/array',
  'jimu/dijit/SimpleTable',
  'jimu/utils',
  'esri/symbols/jsonUtils',
  'jimu/symbolUtils',
  'dojo/dom-construct',
  'dojo/dom-class',
  './SymbolChooserPopup',
  './LayerChooser',
  'jimu/BaseWidgetSetting',
  '../layerUtils',
  '../utils',
  'dojo/query',
  'jimu/dijit/Message',
  'jimu/LayerInfos/LayerInfos',
  'dijit/form/Select',
  'dijit/form/ValidationTextBox',
  'dijit/form/NumberTextBox',
  'dijit/form/NumberSpinner',
  'jimu/dijit/RadioBtn'
],
  function (
    declare,
    _WidgetsInTemplateMixin,
    TabContainer3,
    registry,
    query,
    on,
    lang,
    array,
    SimpleTable,
    utils,
    jsonUtils,
    symbolUtils,
    domConstruct,
    domClass,
    SymbolChooserPopup,
    LayerChooser,
    BaseWidgetSetting,
    layerUtils,
    appUtils,
    dojoQuery,
    Message,
    LayerInfos,
    Select,
    ValidationTextBox,
    NumberTextBox
  ) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-ParcelDrafter-setting',
      _tab: null, // to store tab object
      _symbolParams: {},
      _layerUtils: null, // Utils widget instance
      /*Store dataType keywords in variables*/
      _stringFieldType: 'esriFieldTypeString',
      _oidFieldType: 'esriFieldTypeOID',
      _guidFieldType: 'esriFieldTypeGUID',
      _globalIdFieldType: 'esriFieldTypeGlobalID',
      _numberFieldTypes: [],
      polylineDetails: null,
      polygonDetails: null,
      snappingLayerDetails: null,
      distanceAndLengthUnits: {},

      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.nls.common = {};
        lang.mixin(this.nls.common, window.jimuNls.common);
      },

      postCreate: function () {
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (operLayerInfos) {
            this._jimuLayerInfos = operLayerInfos;
            this._init();
          }));
      },

      _init: function () {
        //initialize widget variables
        this._symbolParams = {};
        this._numberFieldTypes = ['esriFieldTypeSmallInteger', 'esriFieldTypeInteger',
          'esriFieldTypeSingle', 'esriFieldTypeDouble'];
        this.distanceAndLengthUnits =
          lang.clone(appUtils.planSettingsOptions.distanceAndLengthUnits);

        //initialize the layerUtils object which will help in getting layer details form map
        this._layerUtils = new layerUtils({
          "map": this.map, getPopupInfo: false, getRenderer: false
        });
        //Initialize the tabs
        this._initTabs();
        this._initFieldsTable();
        //Handle click event to choose parcel layers
        this.own(on(this.selectLineLayerBtnNode, 'click', lang.hitch(this, function () {
          this._showLayerChooser("parcelLayers", ['polygon'], false);
        })));
        //Create table to show line types
        this._createTableForLineTypes();
        //Create symbol picker to choose point symbol for start or rotation point
        this._createSymbolPicker(this.startOrRotationSymbolNode, "startOrRotaionSymbol",
          "esriGeometryPoint", this.nls.parcelLineLayer.startOrRotationSymbolLabel);
        //Create symbol picker to choose point symbol for parcel line end points
        this._createSymbolPicker(this.pointSymbolNode, "pointSymbol",
          "esriGeometryPoint", this.nls.parcelLineLayer.parcelPointSymbolLabel);
        //Handle click event to choose snapping layers
        this.own(on(this.snappingLayerBtnNode, 'click', lang.hitch(this, function () {
          this._showLayerChooser("snapping", [''], true);
        })));
        //Handle lineType change event to load options in line type table
        this.own(this.lineTypeFieldNode.on("change", lang.hitch(this,
          this._updateLineTypeOptions)));
        //load allowed unit for misclose snapping distance
        this._loadMiscloseUnits();
        //the config object is passed in
        this.setConfig(this.config);
        //set constraints on the misclose ratio number textbox
        this.miscloseRatioNode.constraints = { min: 0 };
        //set constraints on the misclose distance number textbox
        this.miscloseDistanceNode.constraints = { min: 0 };
        //set constraints on the tolerance number spinner
        this.toleranceNode.constraints = { min: 1, max: 50, places: 0, pattern: '#' };
        this.toleranceNode.smallDelta = 1;
        //Listen for webmap settings radio button change event
        this.webmapSettingsRadioBtn.onStateChange = lang.hitch(this, function () {
          this._updateAttributeSettings();
        });
      },

      /**
      * This function initializes jimu tab for Parcel layer & Advance Settings.
      * @memberOf widgets/ParcelDrafter/setting/Setting
      **/
      _initTabs: function () {
        var layerSettingTab, tabs, closureSettingTab, attributeSettingTab;
        layerSettingTab = {
          title: this.nls.parcelLineLayer.layerSettingTabLabel,
          content: this.parcelLineLayerNode
        };
        attributeSettingTab = {
          title: this.nls.parcelLineLayer.attributeSettingTabLabel,
          content: this.attributeSettingsNode
        };
        closureSettingTab = {
          title: this.nls.parcelLineLayer.advancedSettingTabLabel,
          content: this.closureSettingsNode
        };
        tabs = [layerSettingTab, attributeSettingTab, closureSettingTab];
        this._tab = new TabContainer3({
          tabs: tabs
        }, this.tabDiv);
        this._tab.startup();
      },

      /**
      * Loads the option in misclose units dropdown based on the supported values in main widget.
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _loadMiscloseUnits: function () {
        var options = [], option, dropDownOptions;
        dropDownOptions = this.distanceAndLengthUnits;
        //Add options for miscloseDistanceUnitNode
        array.forEach(dropDownOptions, lang.hitch(this, function (type) {
          option = { value: type, label: window.jimuNls.units[type] };
          options.push(option);
        }));
        this.miscloseDistanceUnitNode.addOption(options);
      },

      /**
      * Sets the config UI from previously/Default configured values.
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      setConfig: function () {
        if (this.config) {
          if (this.config.snappingTolerance || this.config.snappingTolerance === 0) {
            this.toleranceNode.set('value', this.config.snappingTolerance);
          }
          if (this.config.miscloseRatioSnap || this.config.miscloseRatioSnap === 0) {
            this.miscloseRatioNode.set('value', this.config.miscloseRatioSnap);
          }
          if (this.config.miscloseSnapDistance || this.config.miscloseSnapDistance === 0) {
            this.miscloseDistanceNode.set('value', this.config.miscloseSnapDistance);
          }
          if (this.config.miscloseSnapDistanceUnit && this.miscloseDistanceUnitNode) {
            this.miscloseDistanceUnitNode.set('value', this.config.miscloseSnapDistanceUnit);
          }
          if (this.config.polylineLayer) {
            this._setPolylineDetails(this.config.polylineLayer);
          }
          if (this.config.polygonLayer) {
            //If useFieldInfosFromWebmap is available then use it
            //else use custom settings for backward compatibility
            if (this.config.hasOwnProperty('useFieldInfosFromWebmap')) {
              if (this.config.useFieldInfosFromWebmap === true) {
                this.webmapSettingsRadioBtn.set("checked", true);
              } else {
                this.customSettingsRadioBtn.set("checked", true);
              }
            } else {
              this.customSettingsRadioBtn.set("checked", true);
            }
            //if attribute list title is configured show it 
            if (this.config.polygonLayer.attributeListTitle) {
              this.polygonLayerNameNode.set("value", this.config.polygonLayer.attributeListTitle);
            }
            //if attribute list title is not valid pass true so that layers name will be shown as title
            //pass 3rd parm as true since setPolygonDetails is called form setConfig - this will be used to fetch custom settings 
            this._setPolygonDetails(this.config.polygonLayer, !this.config.polygonLayer.attributeListTitle, true);
          } else {
            //for new configuration use webmap settings
            this.webmapSettingsRadioBtn.set("checked", true);
          }
          //set the configured layers in UI
          if (this.config.polylineLayer && this.config.polygonLayer) {
            this._setLayersInUI(this.layersNode,
              [this.config.polygonLayer, this.config.polylineLayer]);
          }
          if (this.config.snappingLayers && this.config.snappingLayers.length > 0) {
            this._setSnappingLayerDetails(this.config.snappingLayers, true);
          }
        }
      },

      /**
      * Gets the selected option object for the selected dropdown.
      * @param {object} fieldNode: dropdown
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      getSelectedOption: function (fieldNode) {
        var fieldOptions, selectedField;
        if (fieldNode && fieldNode.options && fieldNode.options.length > 0) {
          fieldOptions = fieldNode.options;
          selectedField = array.filter(fieldOptions, function (item) {
            return item.selected === true;
          });
          if (selectedField && selectedField.length > 0) {
            return selectedField[0];
          }
        }
        return null;
      },

      /**
      * Gets the field object for the selected filedNode.
      * @param {object} fieldNode: dropdown
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      getSelectedField: function (fieldNode) {
        var selectedOption, field;
        selectedOption = this.getSelectedOption(fieldNode);
        if (selectedOption) {
          field = selectedOption.field;
        } else {
          field = null;
        }
        return field;
      },

      /**
      * This function creates error alert.
      * @param {string} err
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _errorMessage: function (err) {
        var errorMessage = new Message({
          message: err,
          buttons: [{
            "label": this.nls.common.ok
          }]
        });
        errorMessage.message = err;
      },

      /**
      * Validates if distinct fields are configured in all attributes of the layer.
      * @memberOf widgets/ParcelDrafter/setting/Setting
      **/
      _validateForDistinctFields: function (configuredLayer) {
        var fieldsConfigured = [], hasDistinctFields, field, key;
        hasDistinctFields = true;
        for (key in configuredLayer) {
          field = configuredLayer[key];
          if (typeof field === "object" && field.hasOwnProperty('name')) {
            if (fieldsConfigured.indexOf(field.name) > -1) {
              hasDistinctFields = false;
              break;
            } else {
              fieldsConfigured.push(field.name);
            }
          }
        }
        return hasDistinctFields;
      },

      /**
      * This validates all the parameters and their configured values.
      * @memberOf widgets/ParcelDrafter/setting/Setting
      **/
      validateConfig: function (config) {
        if (!config.polylineLayer) {
          this._errorMessage(this.nls.errorMsg.invalidPolylineLayer);
          return false;
        }
        if (!config.polylineLayer.bearing) {
          this._errorMessage(this.nls.errorMsg.bearingFieldErrMsg);
          return false;
        }
        if (!config.polylineLayer.chordLength) {
          this._errorMessage(this.nls.errorMsg.chordLengthErrMsg);
          return false;
        }
        if (!config.polylineLayer.distance) {
          this._errorMessage(this.nls.errorMsg.distanceFieldErrMsg);
          return false;
        }
        if (!config.polylineLayer.sequenceId) {
          this._errorMessage(this.nls.errorMsg.sequenceIdFieldErrMsg);
          return false;
        }
        if (!config.polylineLayer.radius) {
          this._errorMessage(this.nls.errorMsg.radiusFieldErrMsg);
          return false;
        }
        if (!config.polylineLayer.relatedGUID) {
          this._errorMessage(this.nls.errorMsg.foreignKeyFieldErrMsg);
          return false;
        }
        if (!config.polylineLayer.arcLength) {
          this._errorMessage(this.nls.errorMsg.arcLengthFieldErrMsg);
          return false;
        }
        if (!config.polylineLayer.lineType) {
          this._errorMessage(this.nls.errorMsg.lineTypeFieldErrMsg);
          return false;
        }
        if (!this._validateForDistinctFields(config.polylineLayer)) {
          this._errorMessage(this.nls.errorMsg.selectDistinctPolylineFields);
          return false;
        }
        if (!config.lineTypes[0].hasOwnProperty('type') || config.lineTypes[0].type === null ||
          config.lineTypes[0].type === undefined || config.lineTypes[0].type === "" ||
          !this.connectionBox.isValid(false)) {
          this._errorMessage(this.nls.errorMsg.invalidConnectionLineType);
          return false;
        }
        if (!config.lineTypes[1].hasOwnProperty('type') || config.lineTypes[1].type === null ||
          config.lineTypes[1].type === undefined || config.lineTypes[1].type === "" ||
          !this.boundaryBox.isValid(false)) {
          this._errorMessage(this.nls.errorMsg.invalidBoundaryLineType);
          return false;
        }
        if (config.lineTypes[0].type === config.lineTypes[1].type) {
          this._errorMessage(this.nls.errorMsg.selectDistinctLineTypes);
          return false;
        }
        if (!config.polygonLayer) {
          this._errorMessage(this.nls.errorMsg.invalidPolygonLayer);
          return false;
        }
        if (!config.polygonLayer.relatedGUID) {
          this._errorMessage(this.nls.errorMsg.globalIdFieldErrMsg);
          return false;
        }
        if (!config.polygonLayer.parcelName) {
          this._errorMessage(this.nls.errorMsg.parcelNameFieldErrMsg);
          return false;
        }
        if (!config.polygonLayer.rotation) {
          this._errorMessage(this.nls.errorMsg.parcelNameFieldErrMsg);
          return false;
        }
        if (!config.polygonLayer.planName) {
          this._errorMessage(this.nls.errorMsg.planNameFieldErrMsg);
          return false;
        }
        if (!config.polygonLayer.scale) {
          this._errorMessage(this.nls.errorMsg.scaleFieldErrMsg);
          return false;
        }
        if (!config.polygonLayer.documentType) {
          this._errorMessage(this.nls.errorMsg.documentTypeFieldErrMsg);
          return false;
        }
        if (!config.polygonLayer.miscloseRatio) {
          this._errorMessage(this.nls.errorMsg.miscloseRatioFieldErrMsg);
          return false;
        }
        if (!config.polygonLayer.statedArea) {
          this._errorMessage(this.nls.errorMsg.statedAreaFieldErrMsg);
          return false;
        }
        if (!this._validateForDistinctFields(config.polygonLayer)) {
          this._errorMessage(this.nls.errorMsg.selectDistinctPolygonFields);
          return false;
        }
        if (!config.polygonLayer.miscloseDistance) {
          this._errorMessage(this.nls.errorMsg.miscloseDistanceFieldErrMsg);
          return false;
        }
        if (!this.miscloseDistanceNode.isValid()) {
          this._errorMessage(this.nls.errorMsg.invalidMiscloseDistance);
          return false;
        }
        if (!this.toleranceNode.isValid()) {
          this._errorMessage(this.nls.errorMsg.invalidSnappingTolerance);
          return false;
        }
        if (!this.miscloseRatioNode.isValid()) {
          this._errorMessage(this.nls.errorMsg.invalidMiscloseRatio);
          return false;
        }
        return true;
      },

      /**
      * This returns the config object if everything is configured properly else return false.
      * @memberOf widgets/ParcelDrafter/setting/Setting
      **/
      getConfig: function () {
        var config, polygonFields, globalIDField;
        config = {};
        //if polyline details exist add all the details in config object
        if (this.polylineDetails) {
          config.polylineLayer = {};
          //get layer details
          lang.mixin(config.polylineLayer, this.polylineDetails);
          //get layer fields
          config.polylineLayer.bearing = this.getSelectedField(this.bearingFieldNode);
          config.polylineLayer.chordLength = this.getSelectedField(this.chordLengthFieldNode);
          config.polylineLayer.distance = this.getSelectedField(this.distanceFieldNode);
          config.polylineLayer.sequenceId = this.getSelectedField(this.sequenceIdFieldNode);
          config.polylineLayer.radius = this.getSelectedField(this.radiusFieldNode);
          config.polylineLayer.relatedGUID = this.getSelectedField(this.foreignKeyFieldNode);
          config.polylineLayer.arcLength = this.getSelectedField(this.arcLengthFieldNode);
          config.polylineLayer.lineType = this.getSelectedField(this.lineTypeFieldNode);
          //get line types info
          config.lineTypes = [{}, {}];
          if (this._symbolParams.connectionLine) {
            config.lineTypes[0].symbol = this._symbolParams.connectionLine;
            config.lineTypes[0].isDefault = this._isConnectionLineDefault.checked;
          }
          if (this._symbolParams.boundaryLine) {
            config.lineTypes[1].symbol = this._symbolParams.boundaryLine;
            config.lineTypes[1].isDefault = this._isBoundaryLineDefault.checked;
          }
          if (this.connectionBox) {
            var selectedConnectionType;
            if (this.connectionBox.options) {
              selectedConnectionType = this.getSelectedOption(this.connectionBox);
              config.lineTypes[0].label = selectedConnectionType.label;
              config.lineTypes[0].type = selectedConnectionType.value;
            } else {
              config.lineTypes[0].label = this.nls.lineTypesTable.connectionLineLabel;
              config.lineTypes[0].type = this.connectionBox.get('value');
            }
          }
          if (this.boundaryBox) {
            var selectedBoundaryType;
            if (this.boundaryBox.options) {
              selectedBoundaryType = this.getSelectedOption(this.boundaryBox);
              config.lineTypes[1].label = selectedBoundaryType.label;
              config.lineTypes[1].type = selectedBoundaryType.value;
            } else {
              config.lineTypes[1].label = this.nls.lineTypesTable.boundaryLineLabel;
              config.lineTypes[1].type = this.boundaryBox.get('value');
            }
            //set boundary line type
            config.BoundaryLineType = config.lineTypes[1].type;
          }
        }
        //if polygon details exist add all the details in config object
        if (this.polygonDetails) {
          config.polygonLayer = {};
          //get layer details
          lang.mixin(config.polygonLayer, this.polygonDetails);
          //retrieve globalId field from polygon layer
          if (this.map._layers[this.polygonDetails.id]) {
            polygonFields = this.map._layers[this.polygonDetails.id].fields;
            globalIDField = array.filter(polygonFields,
              lang.hitch(this, function (field) {
                return field.type === this._globalIdFieldType;
              }));
            if (globalIDField && globalIDField.length > 0) {
              config.polygonLayer.relatedGUID = globalIDField[0];
            }
          }
          //get layer fields
          config.polygonLayer.parcelName = this.getSelectedField(this.parcelNameFieldNode);
          config.polygonLayer.rotation = this.getSelectedField(this.rotationFieldNode);
          config.polygonLayer.planName = this.getSelectedField(this.planNameFieldNode);
          config.polygonLayer.scale = this.getSelectedField(this.scaleFieldNode);
          config.polygonLayer.documentType = this.getSelectedField(this.documentTypeFieldNode);
          config.polygonLayer.miscloseRatio = this.getSelectedField(this.miscloseRatioFieldNode);
          config.polygonLayer.statedArea = this.getSelectedField(this.statedAreaFieldNode);
          config.polygonLayer.miscloseDistance =
            this.getSelectedField(this.miscloseDistanceFieldNode);
          //Use additional fields info from webmap/custom
          if (this.webmapSettingsRadioBtn.get("checked")) {
            config.useFieldInfosFromWebmap = true;
          } else {
            config.useFieldInfosFromWebmap = false;
          }
          //store attribute list title
          config.polygonLayer.attributeListTitle = utils.sanitizeHTML(this.polygonLayerNameNode.get("value"));
          //Additional fields info
          config.polygonLayer.additionalFieldsInfo = this._getAdditionalFieldInfos();
        }
        //get snapping layer details
        if (this.snappingLayerDetails) {
          config.snappingLayers = [];
          lang.mixin(config.snappingLayers, this.snappingLayerDetails);
        }
        //get closure settings
        if (this.toleranceNode) {
          config.snappingTolerance = this.toleranceNode.get('value');
        }
        if (this.miscloseRatioNode) {
          config.miscloseRatioSnap = this.miscloseRatioNode.get('value');
        }
        if (this.miscloseDistanceNode) {
          config.miscloseSnapDistance = this.miscloseDistanceNode.get('value');
        }
        if (this.miscloseDistanceUnitNode) {
          config.miscloseSnapDistanceUnit = this.miscloseDistanceUnitNode.get('value');
        }
        //get point symbol for startOrRotaion point
        if (this._symbolParams.startOrRotaionSymbol) {
          config.startOrRotaionSymbol = this._symbolParams.startOrRotaionSymbol;
        }
        //get point symbol for parcel line endPoints
        if (this._symbolParams.pointSymbol) {
          config.pointSymbol = this._symbolParams.pointSymbol;
        }
        //If valid config then return the object else return false.
        if (this.validateConfig(config)) {
          return config;
        } else {
          return false;
        }
      },

      /**
      * Creates and show popup to choose layers.
      * @memberOf widgets/ParcelDrafter/setting/Settings.js
      */
      _showLayerChooser: function (chooserFor, types, canSelectMultiple) {
        var param, layerChooser, titleLabel, chooseRelatedLayers;
        switch (chooserFor) {
          case "parcelLayers":
            titleLabel = this.nls.selectLayerLabel;
            chooseRelatedLayers = true;
            break;
          case "snapping":
            titleLabel = this.nls.closureSetting.snappingLayerLabel;
            chooseRelatedLayers = false;
            break;
        }
        param = {
          "title": titleLabel,
          "portalUrl": this.appConfig.portalUrl,
          "nls": this.nls,
          "folderUrl": this.folderUrl,
          "map": this.map,
          "multiple": canSelectMultiple,
          "types": types,
          "chooseRelatedLayers": chooseRelatedLayers,
          "relatedLayerTypes": ['polyline'],
          "showLayerTypes": ['FeatureLayer']
        };
        layerChooser = new LayerChooser(param);
        layerChooser.onOKButtonClicked = lang.hitch(this, function (selectedLayerDetails) {
          if (selectedLayerDetails && selectedLayerDetails.length > 0) {
            this._setLayersInfo(chooserFor, selectedLayerDetails);
          }
        });
      },

      /**
      * Fetch layer data from the webmap and sets the layer details.
      * @memberOf widgets/NearMe/setting/setting
      */
      _setLayersInfo: function (chooserFor, selectedLayerDetails) {
        for (var i = 0; i < selectedLayerDetails.length; i++) {
          lang.mixin(selectedLayerDetails[i], this._layerUtils.getLayerDetailsFromMap(
            selectedLayerDetails[i].baseURL,
            selectedLayerDetails[i].layerId, selectedLayerDetails[i].id));
        }
        //reset previous configured values
        this.config.polygonLayer = {};
        this.config.polylineLayer = {};
        this.config.lineTypes[0].type = null;
        this.config.lineTypes[1].type = null;
        switch (chooserFor) {
          case "parcelLayers":
            this._setLayersInUI(this.layersNode, selectedLayerDetails);
            //as layer is changed pass 2nd param as true it will reset the attributeList title to current selected layerName
            this._setPolygonDetails(selectedLayerDetails[0], true);
            this._setPolylineDetails(selectedLayerDetails[1]);
            //by default auto populate the selected parcel layers for snapping
            this._setSnappingLayerDetails(selectedLayerDetails, false);
            break;
          case "snapping":
            this._setSnappingLayerDetails(selectedLayerDetails, true);
            break;
        }
      },

      /**
      * Set polyline layer details.
      * @memberOf widgets/ParcelDrafter/setting/setting
      */
      _setPolylineDetails: function (selectedLayerDetails) {
        this.polylineDetails = selectedLayerDetails;
        this._setPolylineFields();
        this._updateLineTypeOptions();
      },

      /**
      * Set polygon layer details.
      * @memberOf widgets/ParcelDrafter/setting/setting
      */
      _setPolygonDetails: function (selectedLayerDetails, updateAttributeListTitle, fromSetConfig) {
        this.polygonDetails = selectedLayerDetails;
        this._setPolygonFields(updateAttributeListTitle, fromSetConfig);
      },

      /**
      * Set snapping layer details.
      * @memberOf widgets/ParcelDrafter/setting/setting
      */
      _setSnappingLayerDetails: function (selectedLayerDetails, reset) {
        //add only those layers which does not exist in list
        if (this.snappingLayerDetails && !reset) {
          array.forEach(selectedLayerDetails, lang.hitch(this, function (layer) {
            var existingLayer;
            //filter if layer  exist in the list
            existingLayer = array.filter(this.snappingLayerDetails,
              lang.hitch(function (snappingLayer) {
                return snappingLayer.id === layer.id;
              }));
            //pus to snapping layer if it not exist in the list
            if (!existingLayer || existingLayer.length === 0) {
              this.snappingLayerDetails.push(layer);
            }
          }));
        } else {
          this.snappingLayerDetails = selectedLayerDetails;
        }
        //show the selected layers in UI
        this._setLayersInUI(this.snappingLayerNode, this.snappingLayerDetails);
      },

      /**
      * Display selected layers in setting UI
      * @memberOf widgets/ParcelDrafter/setting/setting
      */
      _setLayersInUI: function (selectedLayerNode, selectedLayers) {
        var i, divLayerList, geometryTypeIcon;
        domConstruct.empty(selectedLayerNode);
        for (i = 0; i < selectedLayers.length; i++) {
          //set geometry icon for layer
          if (selectedLayers[i].geometryType === "esriGeometryPoint") {
            geometryTypeIcon = "esriCTPointGeometryIcon";
          } else if (selectedLayers[i].geometryType === "esriGeometryPolygon") {
            geometryTypeIcon = "esriCTPolygonGeometryIcon";
          } else if (selectedLayers[i].geometryType === "esriGeometryPolyline") {
            geometryTypeIcon = "esriCTPolylineGeometryIcon";
          }
          divLayerList = domConstruct.create("div", {
            "class": "esriCTLayerList"
          }, selectedLayerNode);
          //if valid geometry type add its icon node
          if (geometryTypeIcon) {
            domConstruct.create("div", {
              "class": "esriCTGeometryTypeIcon " + geometryTypeIcon,
              "title": selectedLayers[i].title
            }, divLayerList);
          }
          //create div to display layer title
          domConstruct.create("div", {
            "class": "esriCTLayerListItem esriCTEllipsis",
            "innerHTML": selectedLayers[i].title,
            "title": selectedLayers[i].title
          }, divLayerList);
        }
      },

      /**
      * Returns the selection info for each field
      * returns if field is required, should do exact match while selecting, and string to match.
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _getSelectionInfo: function (fieldFor, layer, required) {
        var info;
        info = {};
        //if field is previously configured in then do exact math,
        //so that previously configured filed will be selected in dropDown
        if (this.config.hasOwnProperty(layer) && this.config[layer].hasOwnProperty(fieldFor) &&
          this.config[layer][fieldFor] && this.config[layer][fieldFor].hasOwnProperty('name')) {
          info.fieldName = this.config[layer][fieldFor].name.toLowerCase();
          info.exactMatch = true;
        } else {
          info.fieldName = fieldFor.toLowerCase();
          info.exactMatch = false;
        }
        info.isRequired = required;
        return info;
      },

      /**
      * Auto populate the foreign key field by using the relationship info of the polyline layer
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _autoPopulateRelatedGUID: function () {
        var polyLineLayer, selectedRelationship, relationshipID, selectedKeyFieldName,
          selectedField;
        //clear prev options
        this.foreignKeyFieldNode.options.length = 0;
        this.foreignKeyFieldNode.addOption([{ "value": " ", "label": "", "field": null }]);
        //get selected relationship id
        relationshipID = this.polylineDetails.relationShipId;
        //get relationship details from polyline layer
        polyLineLayer = this.map._layers[this.polylineDetails.id];
        //get selected relationship form layer object
        selectedRelationship = array.filter(polyLineLayer.relationships,
          lang.hitch(this, function (relationship) {
            return relationship.id === relationshipID;
          }));
        //if selected relationship exist then check for key field
        if (selectedRelationship && selectedRelationship.length === 1) {
          selectedKeyFieldName = selectedRelationship[0].keyField;
          //get selected relationships keyField from layers fields
          selectedField = array.filter(polyLineLayer.fields,
            lang.hitch(this, function (field) {
              return field.name.toUpperCase() === selectedKeyFieldName.toUpperCase();
            }));
          //if selected field exist load the dropdown with that field option
          if (selectedField && selectedField.length > 0) {
            //load the selected filed in dropdown and disable it
            this._loadOptionsForDropDown(
              this._getSelectionInfo('relatedGUID', "polylineLayer", true),
              this.foreignKeyFieldNode, selectedField, this._guidFieldType);
          }
        }
        //disable
        this.foreignKeyFieldNode.set("disabled", true);
      },

      /**
      * Auto populate the sequenceID field by searching for field name 'sequenceID',
      * in all the numeric fields of the polyline layer
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _autoPopulateSequenceID: function () {
        var polyLineLayer, selectedField, sequenceFieldName;
        sequenceFieldName = "sequenceID";
        //Remove previous options
        this.sequenceIdFieldNode.options.length = 0;
        this.sequenceIdFieldNode.addOption([{ "value": " ", "label": "", "field": null }]);
        //get relationship details from polyline layer
        polyLineLayer = this.map._layers[this.polylineDetails.id];
        //get selected relationships keyField from layers fields
        selectedField = array.filter(polyLineLayer.fields,
          lang.hitch(this, function (field) {
            return field.name.toLowerCase() === sequenceFieldName.toLowerCase() &&
              this._numberFieldTypes.indexOf(field.type) > -1;
          }));
        //if selected field exist load the dropdown with that field option
        if (selectedField && selectedField.length > 0) {
          //load the selected filed in dropdown and disable it
          this._loadOptionsForDropDown(
            this._getSelectionInfo('sequenceId', "polylineLayer", true),
            this.sequenceIdFieldNode, selectedField, this._numberFieldTypes);
        }
        this.sequenceIdFieldNode.set("disabled", true);
      },

      /**
      * Loads options in dropdown for fields of the polygon layer
      * For required fields auto populate field if math found or selects first option.
      * Auto populate sequenceID & foreign key field
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _setPolylineFields: function () {
        var polylineFields;
        if (this.map._layers[this.polylineDetails.id]) {
          polylineFields = this.map._layers[this.polylineDetails.id].fields;
          this._loadOptionsForDropDown(this._getSelectionInfo('bearing', "polylineLayer", true),
            this.bearingFieldNode, polylineFields, this._numberFieldTypes);
          this._loadOptionsForDropDown(this._getSelectionInfo('chordLength', "polylineLayer", true),
            this.chordLengthFieldNode, polylineFields, this._numberFieldTypes);
          this._loadOptionsForDropDown(this._getSelectionInfo('distance', "polylineLayer", true),
            this.distanceFieldNode, polylineFields, this._numberFieldTypes);
          //auto populate SequenceID
          this._autoPopulateSequenceID();
          this._loadOptionsForDropDown(this._getSelectionInfo('radius', "polylineLayer", true),
            this.radiusFieldNode, polylineFields, this._numberFieldTypes);
          //auto populate related GUID
          this._autoPopulateRelatedGUID();
          this._loadOptionsForDropDown(this._getSelectionInfo('arcLength', "polylineLayer", true),
            this.arcLengthFieldNode, polylineFields, this._numberFieldTypes);
          this._loadOptionsForDropDown(this._getSelectionInfo('lineType', "polylineLayer", true),
            this.lineTypeFieldNode, polylineFields,
            this._numberFieldTypes.concat(this._stringFieldType));
        }
      },

      /**
      * Loads options in dropdown for fields of the polygon layer
      * For optional field adds empty select option
      * For required fields auto populate field if math found or selects first option.
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _setPolygonFields: function (updateAttributeListTitle, fromSetConfig) {
        var polygonFields;
        if (this.map._layers[this.polygonDetails.id]) {
          polygonFields = this.map._layers[this.polygonDetails.id].fields;
          this._loadOptionsForDropDown(this._getSelectionInfo('parcelName', "polygonLayer", false),
            this.parcelNameFieldNode, polygonFields, this._stringFieldType);
          this._loadOptionsForDropDown(this._getSelectionInfo('rotation', "polygonLayer", true),
            this.rotationFieldNode, polygonFields, this._numberFieldTypes);
          this._loadOptionsForDropDown(this._getSelectionInfo('planName', "polygonLayer", false),
            this.planNameFieldNode, polygonFields, this._stringFieldType);
          this._loadOptionsForDropDown(this._getSelectionInfo('scale', "polygonLayer", true),
            this.scaleFieldNode, polygonFields, this._numberFieldTypes);
          this._loadOptionsForDropDown(this._getSelectionInfo('documentType', "polygonLayer",
            false), this.documentTypeFieldNode, polygonFields,
            this._numberFieldTypes.concat(this._stringFieldType));
          this._loadOptionsForDropDown(this._getSelectionInfo('miscloseRatio', "polygonLayer",
            true), this.miscloseRatioFieldNode, polygonFields, this._numberFieldTypes);
          this._loadOptionsForDropDown(this._getSelectionInfo('statedArea', "polygonLayer", false),
            this.statedAreaFieldNode, polygonFields,
            this._numberFieldTypes.concat(this._stringFieldType));
          this._loadOptionsForDropDown(this._getSelectionInfo('miscloseDistance', "polygonLayer",
            true), this.miscloseDistanceFieldNode, polygonFields, this._numberFieldTypes);
          this._updateAttributeSettings(updateAttributeListTitle, fromSetConfig);
        }
      },

      /**
      * Creates options for the dropdown and populate in the dropdown
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _loadOptionsForDropDown: function (selectionInfo, dropDown, dropDownOptions, filter) {
        var options = [];
        if (!selectionInfo.isRequired) {
          options.push({ "value": " ", "label": this.nls.selectLabel, "field": {} });
        }
        //Add options for selected dropdown
        array.forEach(dropDownOptions, lang.hitch(this, function (fieldInfo) {
          var addField, option;
          addField = true;
          //filter the option based on fields type
          if (filter && filter.indexOf(fieldInfo.type) < 0) {
            addField = false;
          }
          if (addField) {
            //create option
            option = { "value": fieldInfo.name, "label": fieldInfo.alias, "field": fieldInfo };
            //set selection based on exactMatch/contains using selection info
            if (selectionInfo.exactMatch) {
              if (fieldInfo.name.toLowerCase() === selectionInfo.fieldName) {
                option.selected = "selected";
              }
            } else if (fieldInfo.name.toLowerCase().indexOf(selectionInfo.fieldName) > -1) {
              option.selected = "selected";
            }
            options.push(option);
          }
        }));
        //Remove previous options
        dropDown.options.length = 0;
        //Add empty option to reset the dropdown if options are empty
        if (options.length === 0) {
          options.push({ "value": " ", "label": "", "field": null });
        }
        dropDown.addOption(options);
      },

      /*
      * This function is used to create table for selecting line type and its symbol
      * @memberOf widgets/ParcelDrafter/setting/Settings
      **/
      _createTableForLineTypes: function () {
        var args, fields, lineTypesTable;
        fields = [{
          name: "isDefault",
          title: this.nls.common.defaults,
          type: 'radio',
          'width': '40px'
        }, {
          name: 'lineType',
          title: this.nls.lineTypesTable.lineTypeLabel,
          type: 'text',
          editable: 'false',
          width: '120px'
        }, {
          name: 'value',
          title: this.nls.lineTypesTable.valueLabel,
          type: 'empty',
          editable: 'false',
          width: '100px'
        }, {
          name: 'symbol',
          title: this.nls.common.symbol,
          type: 'empty',
          editable: 'false',
          width: '100px'
        }];
        args = {
          fields: fields,
          selectable: false
        };
        lineTypesTable = new SimpleTable(args);
        lineTypesTable.placeAt(this.lineTypeNode);
        lineTypesTable.startup();
        //add rows for line type
        //Note: Currently supporting only two line types
        var isBoundaryDefault = this.config.lineTypes[1].isDefault;
        this._createLineTypeRow(lineTypesTable, "connectionLine", !isBoundaryDefault);
        this._createLineTypeRow(lineTypesTable, "boundaryLine", isBoundaryDefault);
      },

      /**
       * Creates row for selecting line type and its symbol
       * @param {object} lineTypesTable: contains a simple table object where line types are shown
       * @param {string} lineType: contains line type
       * @memberOf widgets/ParcelDrafter/setting/Settings
       **/
      _createLineTypeRow: function (lineTypesTable, lineType, isDefault) {
        var result, tr, tds, symbolNode;
        result = lineTypesTable.addRow({ isDefault: isDefault });
        if (result.success && result.tr) {
          tr = result.tr;
          //query for all columns of created row
          tds = dojoQuery('.simple-table-cell', tr);
          //set line type label from nls in first column
          tds[1].innerHTML = this.nls.lineTypesTable[lineType + "Label"];
          //create control to select /enter value of line type in second column
          domClass.add(tds[2], "esriCTTableCell");
          if (lineType === "connectionLine") {
            this._connectionLineTypeNode = domConstruct.create("div", {}, tds[2]);
            this._isConnectionLineDefault = dojoQuery('input', tds[0])[0];
            domClass.add(this._isConnectionLineDefault, "esriCTDefaultChkBox");
          } else if (lineType === "boundaryLine") {
            this._boundaryLineTypeNode = domConstruct.create("div", {}, tds[2]);
            this._isBoundaryLineDefault = dojoQuery('input', tds[0])[0];
            domClass.add(this._isBoundaryLineDefault, "esriCTDefaultChkBox");
          }
          //create symbol picker in third column
          domClass.add(tds[3], "esriCTTableCell");
          symbolNode = domConstruct.create("div",
            { "class": "esriCTTableControl esriCTPreviewField" }, tds[3]);
          this._createSymbolPicker(symbolNode, lineType,
            "esriGeometryPolyline", this.nls.lineTypesTable[lineType + "Label"]);
        }
      },

      /**
       * This function updates the line type option on line type field change
       * It will create DropBox/TextBox based on if selected field has domain or not.
       * @memberOf widgets/ParcelDrafter/setting/Settings
       **/
      _updateLineTypeOptions: function () {
        var connectionLineOptions = [], boundaryLineOptions = [], field, textBoxType;
        //get selected Line type field
        field = this.getSelectedField(this.lineTypeFieldNode);
        //empty the parent node to hold line types
        domConstruct.empty(this._connectionLineTypeNode);
        domConstruct.empty(this._boundaryLineTypeNode);
        //if field has domain create select else textbox
        if (field && field.domain && field.domain.codedValues) {
          this.connectionBox = new Select({
            "class": "esriCTTableControl",
            "required": true,
            "style": { "width": "180px", "height": "25px" }
          }, domConstruct.create("div", {}, this._connectionLineTypeNode));
          this.boundaryBox = new Select({
            "class": "esriCTTableControl",
            "required": true,
            "style": { "width": "180px", "height": "25px" }
          }, domConstruct.create("div", {}, this._boundaryLineTypeNode));
          //loop through the fields domain coded values array to create array of option object
          array.forEach(field.domain.codedValues, lang.hitch(this, function (domainValue) {
            var connectionOption, boundaryOption;
            connectionOption = { "value": domainValue.code, "label": domainValue.name };
            boundaryOption = { "value": domainValue.code, "label": domainValue.name };
            if (this.config.lineTypes && this.config.lineTypes.length > 0 &&
              this.config.lineTypes[0].type !== null && this.config.lineTypes[1].type !== null) {
              if (this.config.lineTypes[0].type === domainValue.code) {
                connectionOption.selected = true;
              }
              if (this.config.lineTypes[1].type === domainValue.code) {
                boundaryOption.selected = true;
              }
            } else {
              if (domainValue.name.toLowerCase().indexOf("connection") > -1) {
                connectionOption.selected = true;
              }
              if (domainValue.name.toLowerCase().indexOf("boundary") > -1) {
                boundaryOption.selected = true;
              }
            }
            connectionLineOptions.push(connectionOption);
            boundaryLineOptions.push(boundaryOption);
          }));
          //add created domain options in line type dropBox
          this.connectionBox.addOption(connectionLineOptions);
          this.boundaryBox.addOption(boundaryLineOptions);
        } else if (field) {
          //if selected line type field is numeric show numberTextbox
          if (this._numberFieldTypes.indexOf(field.type) < 0) {
            textBoxType = ValidationTextBox;
          } else {
            textBoxType = NumberTextBox;
          }
          this.connectionBox = new textBoxType({
            "class": "esriCTTableControl",
            "trim": true,
            "required": true,
            "style": { "width": "180px", "height": "25px" }
          }, domConstruct.create("div", {}, this._connectionLineTypeNode));
          this.boundaryBox = new textBoxType({
            "class": "esriCTTableControl",
            "trim": true,
            "required": true,
            "style": { "width": "180px", "height": "25px" }
          }, domConstruct.create("div", {}, this._boundaryLineTypeNode));
          //if line types are configured show that value in textBox
          if (this.config.lineTypes && this.config.lineTypes.length > 0) {
            this.connectionBox.set("value", this.config.lineTypes[0].type);
            this.boundaryBox.set("value", this.config.lineTypes[1].type);
          }
        }
      },

      /**
       * This function creates symbol picker in config UI
       * @param {object} symbolNode: contains a symbol chooser node
       * @param {string} symbolType: contains symbol type
       * @param {string} geometryType: contains symbol geometry type
       * @param {string} symbolChooserTitle: contains a symbol chooser popup title
       * @memberOf widgets/ParcelDrafter/setting/Setting
       **/
      _createSymbolPicker: function (symbolNode, symbolType, geometryType, symbolChooserTitle) {
        var objSymbol = {}, symbolChooserNode, params, rotationPointSymbolJson;
        //if symbol geometry exist
        if (geometryType) {
          objSymbol.type = utils.getSymbolTypeByGeometryType(geometryType);
          //Backward compatibility for Rotation symbol, if not found in config set the default
          if (symbolType === "startOrRotaionSymbol" && !this.config[symbolType]) {
            rotationPointSymbolJson = {
              "color": [136, 136, 136, 255],
              "size": 11.25,
              "angle": 0,
              "xoffset": 0,
              "yoffset": 0,
              "type": "esriSMS",
              "style": "esriSMSCircle",
              "outline": {
                "color": [29, 29, 53, 255],
                "width": 0.75,
                "type": "esriSLS",
                "style": "esriSLSSolid"
              }
            };
            this.config[symbolType] = rotationPointSymbolJson;
          }
          //Create symbol chooser based on symbol type.
          //ie. if symbol is for connection, boundary, parcel point or rotation
          if (this.config && this.config[symbolType]) {
            objSymbol.symbol = jsonUtils.fromJson(this.config[symbolType]);
            symbolChooserNode = this._createPreviewContainer(symbolNode, true);
          } else if (symbolType === "connectionLine") {
            objSymbol.symbol = jsonUtils.fromJson(this.config.lineTypes[0].symbol);
            symbolChooserNode = this._createPreviewContainer(symbolNode, false);
          } else if (symbolType === "boundaryLine") {
            objSymbol.symbol = jsonUtils.fromJson(this.config.lineTypes[1].symbol);
            symbolChooserNode = this._createPreviewContainer(symbolNode, false);
          }
          //create params to initialize 'symbolchooserPopup' widget
          params = {
            symbolChooserTitle: symbolChooserTitle,
            symbolParams: objSymbol,
            symbolType: symbolType,
            nls: this.nls
          };
          //display configured symbol in symbol chooser node
          this._showSelectedSymbol(symbolChooserNode, objSymbol.symbol, symbolType);
          //attach 'click' event on node to display symbol chooser popup
          this.own(on(symbolChooserNode, 'click', lang.hitch(this, function () {
            //set recently selected symbol in symbol chooser popup
            objSymbol.symbol = jsonUtils.fromJson(this._symbolParams[symbolType]);
            this._initSymbolChooserPopup(params, symbolChooserNode);
          })));
        }
        return symbolChooserNode;
      },

      /**
      * Create preview container to display selected symbol
      * @param {object} symbolNode: contains node to display selected graphic symbol
      * @memberOf widgets/ParcelDrafter/setting/Setting
      **/
      _createPreviewContainer: function (symbolNode, showPreviewText) {
        var tablePreviewText, trPreviewText, tdPreviewText, tdSymbolNode,
          divPreviewText, symbolChooserNode;
        //in case of preview text create table else directly create symbol node
        if (showPreviewText) {
          tablePreviewText = domConstruct.create("table", {
            "cellspacing": "0",
            "cellpadding": "0"
          }, symbolNode);
          trPreviewText = domConstruct.create("tr", { "style": "height:30px" }, tablePreviewText);
          tdPreviewText = domConstruct.create("td", {}, trPreviewText);
          //preview text node
          divPreviewText = domConstruct.create("div", {
            "innerHTML": this.nls.parcelLineLayer.symbolPickerPreviewText,
            "class": "esriCTSymbolPreviewText"
          }, tdPreviewText);
          tdSymbolNode = domConstruct.create("td", {}, trPreviewText);
          //create content div for symbol chooser node
          symbolChooserNode = domConstruct.create("div", {
            "class": "esriCTSymbolChooserNode"
          }, tdSymbolNode);
        } else {
          //create content div for symbol chooser node
          symbolChooserNode = domConstruct.create("div", {
            "class": "esriCTSymbolChooserNode"
          }, symbolNode);
        }
        return symbolChooserNode;
      },

      /**
      * Initialize symbol chooser popup widget
      * @param {object} params: contains params to initialize widget
      * @param {object} symbolChooserNode: contains node to display selected graphic symbol
      * @memberOf widgets/ParcelDrafter/setting/Setting
      **/
      _initSymbolChooserPopup: function (params, symbolChooserNode) {
        var symbolChooserObj = new SymbolChooserPopup(params);
        //handler for poopUp 'OK' button 'click' event
        symbolChooserObj.onOkClick = lang.hitch(this, function () {
          //get selected symbol
          var symbolJson = symbolChooserObj.symbolChooser.getSymbol();
          this._showSelectedSymbol(symbolChooserNode, symbolJson, params.symbolType);
          symbolChooserObj.popup.close();
        });
      },

      /**
      * show selected graphic symbol in symbol chooser node
      * @param {object} symbolChooserNode: contains a symbol chooser node
      * @param {object} symbolJson: contains a json structure for symbol
      * @param {string} symbolType: contains symbol type
      * @member of widgets/ParcelDrafter/setting/setting
      **/
      _showSelectedSymbol: function (symbolChooserNode, symbolJson, symbolType) {
        domConstruct.empty(symbolChooserNode);
        if (symbolJson) {
          var symbolNode = symbolUtils.createSymbolNode(symbolJson);
          // if symbol node is not created
          if (!symbolNode) {
            symbolNode = domConstruct.create('div');
          }
          domConstruct.place(symbolNode, symbolChooserNode);
          //store selected symbol in 'symbolParams' object
          this._symbolParams[symbolType] = symbolJson.toJson();
        }
      },


      /**
      * This function is used to create table which shows fields
      * @member of widgets/ParcelDrafter/setting/setting
      **/
      _initFieldsTable: function () {
        var fields2 = [{
          name: 'visible',
          title: this.nls.parcelPolygonLayer.display,
          type: 'checkbox',
          'class': 'display',
          width: '15%'
        }, {
          name: 'isEditable',
          title: this.nls.parcelPolygonLayer.edit,
          type: 'checkbox',
          'class': 'editable',
          width: '12%'
        }, {
          name: 'fieldName',
          title: this.nls.parcelPolygonLayer.editpageName,
          type: 'text',
          width: '26%'
        }, {
          name: 'label',
          title: this.nls.parcelPolygonLayer.editpageAlias,
          type: 'text',
          editable: true,
          width: '34%'
        }, {
          name: 'actions',
          title: this.nls.parcelPolygonLayer.actions,
          type: 'actions',
          actions: ['up', 'down'],
          'class': 'actions',
          width: '13%'
        }];
        var args2 = {
          fields: fields2,
          selectable: false,
          style: {
            'height': '210px',
            'maxHeight': '210px'
          }
        };
        this._fieldsTable = new SimpleTable(args2);
        this._fieldsTable.placeAt(this.additionalFieldsTable);
        this._fieldsTable.startup();
      },

      _updateAttributeSettings: function (updateAttributeListTitle, fromSetConfig) {
        var fields;
        this._fieldsTable.clear();
        //if no polygon layer details or if polygon layer dont have id retrun
        if (!this.polygonDetails || !this.polygonDetails.id) {
          return;
        }
        if (updateAttributeListTitle) {
          var projectLayerInfo = this._jimuLayerInfos.getLayerInfoById(this.polygonDetails.id);
          this.polygonLayerNameNode.set("value", projectLayerInfo.layerObject.name);
        }
        //disable field label editing in case of webmap settings
        //and enable it in case of custom settings
        if (this._fieldsTable.fields) {
          if (this.webmapSettingsRadioBtn.get("checked")) {
            this._fieldsTable.fields[3].editable = false;
          } else {
            this._fieldsTable.fields[3].editable = true;
          }
        }
        //get fields and add row for each field
        fields = this._getFieldInfosForPolygonLayer(fromSetConfig);
        var isVisible = true;
        var isEditable = true;
        array.forEach(fields, lang.hitch(this, function (fieldInfo) {
          var addRowResult = this._fieldsTable.addRow({
            fieldName: fieldInfo.fieldName,
            isEditable: fieldInfo.isEditable,
            label: fieldInfo.label ? fieldInfo.label : fieldInfo.fieldName,
            visible: fieldInfo.visible
          });
          var checkboxStatus = true, requiredField, readOnlyField = false;
          if (isVisible && !fieldInfo.visible) {
            isVisible = false;
          }
          if (isEditable && !fieldInfo.isEditable) {
            isEditable = false;
          }
          //Disable the edit checkbox if webmap config is selected
          if (this.webmapSettingsRadioBtn.get("checked")) {
            checkboxStatus = false;
            //Hide action buttons when webmap settings are used
            var actionIcons = query(".action-item", addRowResult.tr);
            actionIcons.forEach(function (node) {
              domClass.add(node, "esriCTHidden");
            });

          } else {
            //for required fields check the checkbox and disable it
            if (!fieldInfo.nullable && fieldInfo.editable) {
              requiredField = true;
              checkboxStatus = false;
            }
            //for read only fields disable the editable checkBox
            if (!fieldInfo.editable) {
              readOnlyField = true;
            }
          }
          var editableNodes = query(".editable", addRowResult.tr);
          editableNodes.forEach(function (node) {
            var widget = registry.getEnclosingWidget(node.childNodes[0]);
            if (requiredField) {
              widget.setValue(true);
            }
            widget.setStatus(checkboxStatus);
            if (readOnlyField) {
              widget.setValue(false);
              widget.setStatus(false);
            }
          });
          var displayNodes = query(".display", addRowResult.tr);
          displayNodes.forEach(function (node) {
            var widget = registry.getEnclosingWidget(node.childNodes[0]);
            if (requiredField) {
              widget.setValue(true);
            }
            widget.setStatus(checkboxStatus);
          });
        }));
        var displayHeaderCheckBox = this._fieldsTable._getThCheckBox("visible");
        var editHeaderCheckBox = this._fieldsTable._getThCheckBox("isEditable");
        var status = this.webmapSettingsRadioBtn.checked ? false : true;
        if (!status) {
          displayHeaderCheckBox.setValue(isVisible);
          editHeaderCheckBox.setValue(isEditable);
        }
        displayHeaderCheckBox.setStatus(status);
        editHeaderCheckBox.setStatus(status);
        //check display checkBox when user checks editable checkbox
        setTimeout(lang.hitch(this, function () {
          array.forEach(this._fieldsTable.fields, function (field) {
            if (field.name === 'visible') {
              field.onChange = lang.hitch(this, this._onDisplayFieldChanged);
            } else if (field.name === 'isEditable') {
              field.onChange = lang.hitch(this, this._onIsEditableFieldChanged);
            }
          }, this);
        }), 300);
      },

      _onDisplayFieldChanged: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var display = rowData.visible;
        if (!display && rowData.isEditable) {
          rowData.isEditable = false;
          this._fieldsTable.editRow(tr, rowData);
        }
      },
       _onIsEditableFieldChanged: function (tr) {
        var rowData = this._fieldsTable.getRowData(tr);
        var isEditable = rowData.isEditable;
        if (isEditable && !rowData.visible) {
          rowData.visible = true;
          this._fieldsTable.editRow(tr, rowData);
        }
      },
      _getAdditionalFieldInfos: function () {
        var newFieldInfos = [], isCustom;
        var fieldsTableData = this._fieldsTable.getData();
        if (this.customSettingsRadioBtn.get("checked")) {
          isCustom = true;
        }
        array.forEach(fieldsTableData, function (fieldData) {
          var isRequired = false;
          if (isCustom && fieldData.isEditable === null && fieldData.visible === null) {
            isRequired = true;
          }
          newFieldInfos.push({
            "fieldName": fieldData.fieldName,
            "isEditable": isRequired ? isRequired : fieldData.isEditable,
            "label": fieldData.label,
            "visible": isRequired ? isRequired : fieldData.visible
          });
        });
        return newFieldInfos;
      },

      mergeFirstToLast: function () {
        var obj = {},
          i = arguments.length - 1,
          il = 0,
          key;
        for (; i >= il; i--) {
          for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
              obj[key] = arguments[i][key];
            }
          }
        }
        return obj;
      },

      _getFieldInfosFromLayer: function (layerInfo) {
        var fieldInfos = [];
        if (layerInfo && layerInfo.layerObject) {
          array.forEach(layerInfo.layerObject.fields, function (field) {
            var fieldInfo = utils.getDefaultPortalFieldInfo(field);
            fieldInfo = this.mergeFirstToLast(fieldInfo, field);
            if (fieldInfo.format &&
              fieldInfo.format.dateFormat &&
              fieldInfo.format.dateFormat.toLowerCase() &&
              fieldInfo.format.dateFormat.toLowerCase().indexOf('time') >= 0) {
              fieldInfo.format.time = true;
            }
            fieldInfo.visible = true;
            fieldInfos.push(fieldInfo);
          }, this);
        }
        return fieldInfos;
      },

      _createFieldsDetailsObject: function (fields) {
        var fieldDetailsObj = {};
        array.forEach(fields, lang.hitch(this, function (field) {
          fieldDetailsObj[field.name] = field.type;
        }));
        return fieldDetailsObj;
      },

      getFieldInfoByFieldName: function (fieldInfos, fieldName) {
        var fieldInfo = {};
        array.some(fieldInfos, function (field) {
          if (field.name === fieldName) {
            lang.mixin(fieldInfo, field);
            return true;
          }
        });
        return fieldInfo;
      },

      _skipReadOnlyFields: function (layerInfo) {
        var fields_to_remove = [];
        if (layerInfo.layerObject.hasOwnProperty('globalIdField')) {
          if (layerInfo.layerObject.globalIdField !== undefined && layerInfo.layerObject.globalIdField !== null) {
            fields_to_remove.push(layerInfo.layerObject.globalIdField);
          }
        }
        if (layerInfo.layerObject.hasOwnProperty('objectIdField')) {
          if (layerInfo.layerObject.objectIdField !== undefined && layerInfo.layerObject.objectIdField !== null) {
            fields_to_remove.push(layerInfo.layerObject.objectIdField);
          }
        }

        if (layerInfo.layerObject.hasOwnProperty('editFieldsInfo')) {
          if (layerInfo.layerObject.editFieldsInfo !== undefined && layerInfo.layerObject.editFieldsInfo !== null) {
            for (var k in layerInfo.layerObject.editFieldsInfo) {
              if (layerInfo.layerObject.editFieldsInfo.hasOwnProperty(k)) {
                fields_to_remove.push(layerInfo.layerObject.editFieldsInfo[k]);
              }
            }
          }
        }
        return fields_to_remove;
      },

      _getFieldInfosForPolygonLayer: function (fromSetConfig) {
        var fieldInfos, allFieldsInfo, visibleFields = [], isWebmapSettings = false;
        //Hide fields which are calculated by widget
        var hideFieldsWhichAreCalculated = [
          this.rotationFieldNode.get("value"), this.scaleFieldNode.get("value"),
          this.miscloseRatioFieldNode.get("value"), this.miscloseDistanceFieldNode.get("value"),
          this.statedAreaFieldNode.get("value")];
        //get layer info 
        var projectLayerInfo = this._jimuLayerInfos.getLayerInfoById(this.polygonDetails.id);
        //get fields details
        var fieldsDetailsObj = this._createFieldsDetailsObject(projectLayerInfo.layerObject.fields);
        allFieldsInfo = this._getFieldInfosFromLayer(projectLayerInfo);

        //if configured to use field info from webmap use popup info to fetch field info details
        //else if additionalFieldsInfo are configured and use them 
        //else for backward compatibility only show fields out of Name, PlanName, and DocumentType 
        if (this.webmapSettingsRadioBtn.get("checked") &&
          projectLayerInfo.controlPopupInfo &&
          projectLayerInfo.controlPopupInfo.enablePopup &&
          projectLayerInfo.controlPopupInfo.infoTemplate) {
          isWebmapSettings = true;
          allFieldsInfo = lang.clone(projectLayerInfo.controlPopupInfo.infoTemplate.info.fieldInfos);
        } else if (fromSetConfig && this.config.polygonLayer.hasOwnProperty('additionalFieldsInfo') &&
          this.config.polygonLayer.additionalFieldsInfo.length > 0) {
          var mergedFieldsInfo = [];
          array.forEach(this.config.polygonLayer.additionalFieldsInfo, function (configuredFieldInfo) {
            var fieldInfo = this.getFieldInfoByFieldName(allFieldsInfo, configuredFieldInfo.fieldName);
            fieldInfo = lang.mixin(fieldInfo, configuredFieldInfo);
            mergedFieldsInfo.push(fieldInfo);
          }, this);
          allFieldsInfo = mergedFieldsInfo;
        } else if (fromSetConfig && this.config.polygonLayer) {
          //To support backward compatibility only allow field from following configuration
          if (this.config.polygonLayer.documentType &&
            this.config.polygonLayer.documentType.hasOwnProperty('name')) {
            visibleFields.push(this.config.polygonLayer.documentType.name);
          }
          if (this.config.polygonLayer.parcelName &&
            this.config.polygonLayer.parcelName.hasOwnProperty('name')) {
            visibleFields.push(this.config.polygonLayer.parcelName.name);
          }
          if (this.config.polygonLayer.planName &&
            this.config.polygonLayer.planName.hasOwnProperty('name')) {
            visibleFields.push(this.config.polygonLayer.planName.name);
          }
        }

        //get readonly fields which needs to be skipped
        if (!isWebmapSettings) {
          var skipFields = this._skipReadOnlyFields(projectLayerInfo);
          allFieldsInfo = allFieldsInfo.filter(function (field) {
            if (array.indexOf(skipFields, field.fieldName) !== -1) {
              return false;
            }
            if (field.hasOwnProperty('editable')) {
              return field.editable;
            } else {
              return field.isEditable;
            }
          });
        }


        fieldInfos = [];
        array.forEach(allFieldsInfo, lang.hitch(this, function (field) {
          //visibleFields array will be filled only in case of backward compatibility 
          //Show only those fields which were previously configured for Name, PlanName, and DocumentType
          //and make them editable based on fields editable property
          if (visibleFields && visibleFields.length > 0) {
            if (visibleFields.indexOf(field.fieldName) >= 0) {
              field.isEditable = field.editable;
            } else {
              field.visible = false;
            }
          }
          //filter fields for misclose info, rotation, scale and statedArea
          if (hideFieldsWhichAreCalculated.indexOf(field.fieldName) > -1) {
            field.visible = false;
          }
          //skip fields which are not visible and those are not of following type
          if (hideFieldsWhichAreCalculated.indexOf(field.fieldName) < 0 &&
            fieldsDetailsObj[field.fieldName] &&
            (fieldsDetailsObj[field.fieldName] !== "esriFieldTypeRaster" &&
              fieldsDetailsObj[field.fieldName] !== "esriFieldTypeBlob" &&
              fieldsDetailsObj[field.fieldName] !== "esriFieldTypeXML")) {
            //if field is date and time is enabled set time to true in format
            if (field.format &&
              field.format.dateFormat &&
              field.format.dateFormat.toLowerCase() &&
              field.format.dateFormat.toLowerCase().indexOf('time') >= 0) {
              field.format.time = true;
            }
            fieldInfos.push(field);
          }
        }));
        return fieldInfos;
      }
    });
  });
