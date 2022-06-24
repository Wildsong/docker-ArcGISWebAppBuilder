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
    'jimu/BaseWidget',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/json',
    'dojo/on',
    'dojo/topic',
    'dojo/fx',
    'dojo/dom-attr',
    'dojo/query',
    'dojo/number',
    'dojo/_base/kernel',
    'dojo/text!./models/ThreatTypes.json',
    'dojo/text!./models/LpgThreatTypes.json',
    'dojo/keys',

    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/focus',

    'jimu/dijit/LoadingIndicator',
    'jimu/dijit/CoordinateControl',
    'jimu/LayerInfos/LayerInfos',
    'jimu/LayerStructure',
    'jimu/utils',
    'jimu/symbolUtils',
    'jimu/dijit/CheckBox',

    'esri/Color',
    'esri/dijit/util/busyIndicator',
    'esri/graphic',
    'esri/geometry/geometryEngine',
    'esri/geometry/Extent',
    'esri/geometry/webMercatorUtils',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/symbols/PictureMarkerSymbol',
    'esri/renderers/SimpleRenderer',
    'esri/renderers/UniqueValueRenderer',
    'esri/symbols/jsonUtils',
    'esri/InfoTemplate',

    './js/ThreatAnalysisSettings',
    './js/portal-utils',
    './js/SelectFeaturesTool',

    'esri/tasks/GeometryService',
    'esri/SpatialReference',
    'dojo/Deferred',
    'dojo/promise/all',
    './utils',
    'jimu/dijit/SimpleTable',
    'dojo/string',

    './js/jquery.easy-autocomplete',
    'dijit/form/NumberTextBox',
    'dijit/form/RadioButton',
    'dijit/form/NumberSpinner',
    'jimu/dijit/formSelect',
    'jimu/dijit/DrawBox'
  ],
  function (
    declare,
    BaseWidget,
    lang,
    array,
    domClass,
    domStyle,
    domConstruct,
    dojoJSON,
    on,
    topic,
    coreFx,
    domAttr,
    query,
    dojoNumber,
    dojoKernel,
    chemicalThreats,
    lpgThreats,
    keys,
    dijitWidgetBase,
    dijitWidgetsInTemplate,
    focusUtils,
    LoadingIndicator,
    CoordinateControl,
    jimuLayerInfos,
    LayerStructure,
    jimuUtils,
    jimuSymbolUtils,
    Checkbox,
    Color,
    busyIndicator,
    Graphic,
    GeometryEngine,
    Extent,
    WebMercatorUtils,
    FeatureLayer,
    GraphicsLayer,
    PictureMarkerSymbol,
    SimpleRenderer,
    UniqueValueRenderer,
    jsonUtils,
    InfoTemplate,
    Settings,
    portalutils,
    SelectFeaturesTool,
    GeometryService,
    SpatialReference,
    Deferred,
    all,
    utilsHelper,
    Table,
    string
  ) {
    return declare([BaseWidget, dijitWidgetBase, dijitWidgetsInTemplate], {
      baseClass: 'jimu-widget-threatAnalysis',
      _selectedThreat: null, //holds the current value of the selected threat
      _threatData: null, //a JSON object holding all the information about threats
      _lastOpenPanel: "threatMainPage", //Flag to hold last open panel, default will be main page
      _currentOpenPanel: "threatMainPage", //Flag to hold last open panel, default will be main page
      _threatSettingsInstance: null, //Object to hold Settings instance
      _renderer: null, // renderer to be used on the threat Feature Servicem
      _layerList: null, // list of layers from webmap
      _drawBox: null, // interactive draw tools
      _currentGeometry: [], // holds the newly created geometry from interactive tool
      _pointSymbol: null, // holds the point symbol
      _polylineSymbol: null, // holds the polyline symbol
      _polygonSymbol: null, // holds the polygon symbol
      _selectedUnitType: null, // holds Feet or Meters
      _addLayerToMap: true, // flag to add layer to map
      geometryService: null, // holds GeometryService instance,
      threatsGraphicsLayersObj: {}, //hold layer definition for each threat

      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.inherited(arguments);
        lang.mixin(this.nls, window.jimuNls.common, window.jimuNls.units);
        this.isRenderIdForAttrs = true;
      },

      constructor: function (args) {
        declare.safeMixin(this, args);
      },

      postCreate: function () {
        jimuLayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (operLayerInfos) {
            this._jimuLayerInfos = operLayerInfos;
          }));
        this.openAtStartAysn = true; //’this’ is widget object

        //For backward if config has threatAnalysis key then transform config json to new config json
        if (this.config.hasOwnProperty("threatAnalysis")) {
          this.config = utilsHelper.transformOldConfigToNewConfigJson(this.config);
        }

        //set up listeners
        topic.subscribe("setBusyIndicator", lang.hitch(this, function (show) {
          if (show) {
            this.busyIndicator.show();
          } else {
            this.busyIndicator.hide();
          }
        }));

        topic.subscribe("clear", lang.hitch(this, function () {
          this._reset();
          this._moveMap();
          this._showOrHideLayerCountHint();
        }));

        //set up listeners for accessibiity
        topic.subscribe("setLastFocusNode", lang.hitch(this, function (success) {
          if (success) {
            this._setFirstLastFocusNodes();
          }
        }));

        //modify String's prototype so we can format a string using .format requried for IE
        if (!String.prototype.format) {
          String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
              return typeof args[number] !== 'undefined' ? args[number] : match;
            });
          };
        }

        //modify String's prototype so we can search a string using .includes requried for IE
        if (!String.prototype.includes) {
          String.prototype.includes = function () {
            'use strict';
            return String.prototype.indexOf.apply(this, arguments) !== -1;
          };
        }

        this.inherited(arguments);

        //create instance of geometryService
        var gsURL = this.appConfig.geometryService;
        //if url not found use AGOL service
        if (!gsURL) {
          gsURL = '//utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer';
        }
        this.geometryService = new GeometryService(gsURL);

        //create graphics layer for threat location and add to map
        this._initGL();

        this.threatCoordinateControl = new CoordinateControl({
          parentWidget: this,
          label: this.nls.threatAnalysisCoordInputLabel,
          input: true,
          showFormatButton: true,
          showDrawPoint: true,
          drawButtonLabel: this.nls.threatAddPointToolTip,
          drawToolTip: this.nls.threatDrawPointToolTip,
          graphicsLayer: this._threatLocation,
          'aria-label': this.nls.threatAnalysisCoordInputLabel
        });
        this.threatCoordinateControl.placeAt(this.threatAnalysisCoordContainer);
        this.threatCoordinateControl.startup();

        this._initThreatTypeTable();

        //we need an extra class added the the coordinate format node for the Dart theme
        if (this.appConfig.theme.name === 'DartTheme') {
          domClass.add(
            this.threatCoordinateControl.domNode,
            'dartThemeClaroDijitTooltipContainerOverride'
          );
        }

        // Init default symbols
        this._initDefaultSymbols();

        //init loading indicator
        this._initLoading();

        //Publish new layer checkbox
        this.publishNewLayer = new Checkbox({
          "checked": false,
          "label": this.nls.publishToNewLayer
        }, domConstruct.create("div", {}, this.checkBoxParentContainer));
        //if config has threats then populate threat table with config threats
        //else populate table with json files
        if (this.config.hasOwnProperty("threats")) {
          this._threatData = this.config.threats;
        } else {
          //populate default values in threat types table
          this._threatData = utilsHelper.getDefaultThreats(dojoJSON.parse(chemicalThreats), dojoJSON.parse(lpgThreats));
        }
        //convert distance meter to feet for minimum changes
        if (this.config.generalSettings && this.config.generalSettings.unit &&
          this.config.generalSettings.unit.toLowerCase() === "meters") {
          this._threatData = this._convertDistanceMetersToFeet(this._threatData);
        }
        //sort zones in ascending order of distance
        this._sortZonesInAscOrder();
        //set up all the handlers for the different click events
        this._initListeners();

        this._initGLForThreats();
        //set renderer to each threat layer
        array.forEach(this._threatData, lang.hitch(this, function (threat) {
          this._createRenderer(threat);
        }));

        //Retrieve all polygon layers from webmap
        var polygonLayerList = this._getAllMapLayers();

        //Init draw box
        this._initDrawBox();

        //set values from config if available
        if (this.config.hasOwnProperty("generalSettings") && this.config.generalSettings.operationalLayer &&
          this.config.generalSettings.operationalLayer.name !== "") {
          // populate the publish list
          this._populateSelectList(this.featureLayerList, polygonLayerList,
            this.config.generalSettings.operationalLayer.name, false);
        } else {
          // populate the publish list
          this._populateSelectList(this.featureLayerList, polygonLayerList,
            '', false);
          // Hide the drop-down list
          domClass.add(this.featureLayerList.domNode, 'controlGroupHidden');
          // Set the checkbox to true since user is publishing to a new layer
          this.publishNewLayer.setValue(true);
          // Show the textbox
          domClass.remove(this.addTANameArea.domNode, 'controlGroupHidden');
        }

        //If there are no feature layers in the dropdown
        if (this.featureLayerList.options.length === 0) {
          this.publishNewLayer.setValue(true);
          domClass.add(this.checkBoxParentContainer, "controlGroupHidden");
          domClass.add(this.hintNode, 'controlGroupHidden');
        }
        // Set selected index to interactive
        this.inputTypeSelect.selectedIndex = 0;
        var evt = document.createEvent("Event");
        evt.initEvent("change", false, true);
        this.inputTypeSelect.onChange();

        //Init threat type drop down
        this._initThreatTypeCtrl(this._threatData);
        this.addTANameArea.invalidMessage = this.nls.invalidLayerName;
        this.addTANameArea.missingMessage = this.nls.missingLayerNameMessage;
        //Set values from config if available
        if (this.config.hasOwnProperty("generalSettings")) {
          if (this.config.generalSettings.unit && this.config.generalSettings.unit !== "feet") {
            this.unitType.set("value", this.config.generalSettings.unit);
          } else {
            this.unitType.set("value", "feet");
          }
          this._selectedUnitType = this.unitType.get("value");
          if (this.config.generalSettings.layerToSelectFeatures &&
            this.config.generalSettings.layerToSelectFeatures !== "") {
            // populate the layer list
            this._populateSelectList(this.layerSelect, this._getLayers(),
              this.config.generalSettings.layerToSelectFeatures, true);
          } else {
            this._populateSelectList(this.layerSelect, this._getLayers(), '', true);
          }
          if (this.config.generalSettings.defaultInputType && this.config.generalSettings.defaultInputType !== "") {
            this.inputTypeSelect.set("value", this.config.generalSettings.defaultInputType);
          } else {
            this.inputTypeSelect.set("value", "interactive");
          }
          if (this.config.generalSettings.defaultThreatType && this.config.generalSettings.defaultThreatType !== "") {
            this.threatType.set("value", this.config.generalSettings.defaultThreatType);
          } else {
            this.threatType.set("value", "");
          }
        }
        setTimeout(lang.hitch(this, function () {
          this._resetThreatZoneTableMaxHeight();
        }), 500);
        this._setFirstLastFocusNodes();
      },

      startup: function () {
        this.busyIndicator = busyIndicator.create({
          target: (this.domNode.parentNode.parentNode !== null) ?
            this.domNode.parentNode.parentNode : this.domNode.parentNode,
          backgroundOpacity: 0
        });
        this._setTheme();
        //Workaround for https://devtopia.esri.com/WebGIS/arcgis-webappbuilder/issues/14707
        var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        var isEdge = /Edge/.test(navigator.userAgent);
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isIE11 || isEdge || isSafari) {
          setTimeout(lang.hitch(this, function () {
            this._reset();
          }, 2000));
        }
        this._setFirstLastFocusNodes(true);
      },

      resize: function () {
        // Resize the feature list select component when widget is resized
        var nl = query(".dijitValidationTextBoxLabel", this.featureLayerList.domNode);
        if (nl.length > 0) {
          domStyle.set(nl[0], "width", (this.threatPublishButton.clientWidth - 44) + "px");
        }
        this._resetThreatZoneTableMaxHeight();
      },

      /**
       * Handle different theme styles
       **/
      //source:
      //https://stackoverflow.com/questions/9979415/dynamically-load-and-unload-stylesheets
      _removeStyleFile: function (filename, filetype) {
        //determine element type to create nodelist from
        var targetelement = null;
        if (filetype === "js") {
          targetelement = "script";
        } else if (filetype === "css") {
          targetelement = "link";
        } else {
          targetelement = "none";
        }
        //determine corresponding attribute to test for
        var targetattr = null;
        if (filetype === "js") {
          targetattr = "src";
        } else if (filetype === "css") {
          targetattr = "href";
        } else {
          targetattr = "none";
        }
        var allsuspects = document.getElementsByTagName(targetelement);
        //search backwards within nodelist for matching elements to remove
        for (var i = allsuspects.length; i >= 0; i--) {
          if (allsuspects[i] &&
            allsuspects[i].getAttribute(targetattr) !== null &&
            allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
            //remove element by calling parentNode.removeChild()
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
          }
        }
      },

      _setTheme: function () {
        //Check if DartTheme
        if (this.appConfig.theme.name === "DartTheme") {
          //Load appropriate CSS for dart theme
          jimuUtils.loadStyleLink('darkOverrideCSS', this.folderUrl + "css/dartTheme.css", null);
        } else {
          this._removeStyleFile(this.folderUrl + "css/dartTheme.css", 'css');
        }
        //Check if DashBoardTheme
        if (this.appConfig.theme.name === "DashboardTheme" &&
          this.appConfig.theme.styles[0] === "default") {
          //Load appropriate CSS for dashboard theme
          jimuUtils.loadStyleLink('darkDashboardOverrideCSS',
            this.folderUrl + "css/dashboardTheme.css", null);
        } else {
          this._removeStyleFile(this.folderUrl + "css/dashboardTheme.css", 'css');
        }
      },

      /**
       * Handle widget being destroyed
       * Primarly needed when in WAB configuration mode
       **/
      destroy: function () {
        if (this._threatLocation) {
          this.map.removeLayer(this._threatLocation);
        }
        //remove all threat layer from map
        for (var layer in this.threatsGraphicsLayersObj) {
          if (this.threatsGraphicsLayersObj.hasOwnProperty(layer)) {
            this.map.removeLayer(this.threatsGraphicsLayersObj[layer]);
          }
        }
        this.threatsGraphicsLayersObj = {};
        if (this.drawBox) {
          this.drawBox.clear();
        }
        this.inherited(arguments);
      },

      /*
       * initiate and add graphics layer to map
       */
      _initGL: function () {
        this._ptSym = new PictureMarkerSymbol(
          this.folderUrl + 'images/CoordinateLocation.png',
          26,
          26
        );
        this._ptSym.setOffset(0, 13);
        var glrenderer = new SimpleRenderer(this._ptSym);
        this._threatLocation = new GraphicsLayer();
        this._threatLocation.spatialReference = this.map.spatialReference;
        this._threatLocation.setRenderer(glrenderer);
        this._threatLocation.name = "Threat Location";
        this.map.addLayer(this._threatLocation);
      },

      /**
       * Add options to the threat type select control
       */
      _initThreatTypeCtrl: function (data) {
        this.threatType.options = [];
        // Create an empty option
        this.threatType.addOption({
          value: "",
          label: this.nls.selectLabel,
          selected: true
        });
        array.forEach(data, lang.hitch(this, function (item) {
          this.threatType.addOption({
            value: item.threatName,
            label: jimuUtils.sanitizeHTML(this._getThreatTypeNls(item.threatName)),
            selected: false
          });
        }));
      },

      /**
       * This function used for loading indicator
       */
      _initLoading: function () {
        this.loading = new LoadingIndicator({
          hidden: true
        });
        this.loading.placeAt(this.domNode);
        this.loading.startup();
      },

      /**
       * Init events for different controls
       **/
      _initListeners: function () {
        /**
         * Threat panel
         **/
        //handle Settings button
        if (this.config.hasOwnProperty("threatAnalysis") && !this.config.threatAnalysis.lockSettings ||
          !this.config.hasOwnProperty("threatAnalysis")) {
          //handle Settings button
          this.own(on(this.threatAnalysisSettingsButton, "click", lang.hitch(this, function () {
            //Create settings page
            this._createSettings();
            this._showPanel("threatSettingsPage");
            this._setFirstLastFocusNodes();
          })));

          this.own(on(this._jimuLayerInfos, 'layerInfosChanged', lang.hitch(this, this._onLayerInfosChange)));
          //handle Settings button keydown for accessibility
          this.own(on(this.threatAnalysisSettingsButton, "keydown", lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              //Create settings page
              this._createSettings();
              this._showPanel("threatSettingsPage");
              this._setFirstLastFocusNodes();
            }
          })));
        } else {
          this.threatAnalysisSettingsButton.title = this.nls.lockSettings;
          //html.addClass(this.threatAnalysisSettingsButton, 'controlGroupHidden');
        }

        //Handle click event of create threat button
        this.own(on(this.threatCreateButton, 'click', lang.hitch(this,
          this._threatCreateButtonClicked)));
        //Handle keydown event of create threat button for accessibility
        this.own(on(this.threatCreateButton, 'keydown', lang.hitch(this,
          function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this._threatCreateButtonClicked();
              this._setFirstLastFocusNodes();
            }
          })));

        //Handle click event of clear threat button
        this.own(on(this.threatClearButton, 'click', lang.hitch(this, function () {
          this.threatType.set("value", "");
          this._threatZonesTable.clear();
          this._selectedThreat = null;
          if (this.map.infoWindow.isShowing) {
            this.map.infoWindow.hide();
          }
          this._reset();
          this._setFirstLastFocusNodes();
        })));

        //Handle keydown event of clear threat button
        this.own(on(this.threatClearButton, 'keydown', lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this.threatType.set("value", "");
            this._threatZonesTable.clear();
            this._selectedThreat = null;
            if (this.map.infoWindow.isShowing) {
              this.map.infoWindow.hide();
            }
            this._reset();
            this._setFirstLastFocusNodes();
          }
        })));

        //Handle the draw tool from the coordinate control dijit
        this.own(on(this.threatCoordinateControl.dt, 'DrawComplete', lang.hitch(this, function () {
          this.threatCoordinateControl.deactivateDrawTool();
          if (this.threatCoordinateControl.currentClickPointDD) {
            this._currentGeometry = [];
            this._currentGeometry.push(this.threatCoordinateControl.currentClickPointDD);
            if (this._selectedThreat !== null) {
              this._toggleCreateZoneButton(true);
            }
          }
          focusUtils.focus(this.threatType.domNode);
        })));

        //Handles when a user deletes a coordinate from the coordinate control dijit
        this.own(on(this.threatCoordinateControl, 'coordinates-deleted', lang.hitch(this, function () {
          if (this.threatCoordinateControl.coordtext.value === 0) {
            this._reset();
          }
        })));

        //Handles when coordinates are properly parsed
        this.own(on(this.threatCoordinateControl, 'get-coordinate-complete', lang.hitch(this, function () {
          setTimeout(lang.hitch(this, function () {
            if (this.threatCoordinateControl.currentClickPointDD) {
              this._currentGeometry = [];
              this._currentGeometry.push(this.threatCoordinateControl.currentClickPointDD);
              if (this._selectedThreat !== null) {
                this._toggleCreateZoneButton(true);
              }
            }
          }), 1000);
        })));

        /**
         * Settings panel
         **/
        //Handle click event of settings back button
        this.own(on(this.threatSettingsPanelBackButton, "click", lang.hitch(this, function () {
          this._threatSettingsInstance.destroy();
          this._threatSettingsInstance = null;
          this._showPanel(this._lastOpenPanel);
        })));

        //Handle keydown event of settings back button for accessibility
        this.own(on(this.threatSettingsPanelBackButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._threatSettingsInstance.destroy();
            this._threatSettingsInstance = null;
            this._showPanel(this._lastOpenPanel);
            setTimeout(lang.hitch(this, function () {
              this._setFirstLastFocusNodes();
            }), 0);
          }
        })));

        /**
         * Publish panel
         **/
        //Handle click event back button
        this.own(on(this.threatResultsPanelBackButton, "click", lang.hitch(this, function () {
          //remove any messages
          this.publishMessage.innerHTML = '';
          //clear layer name
          this.addTANameArea.setValue('');
          this.addTANameArea.reset();
          this._threatLocation.show();
          this._showPanel(this._lastOpenPanel);
        })));

        //Handle click event back button
        this.own(on(this.threatResultsPanelBackButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            //remove any messages
            this.publishMessage.innerHTML = '';
            //clear layer name
            this.addTANameArea.setValue('');
            this.addTANameArea.reset();
            this._threatLocation.show();
            this._showPanel(this._lastOpenPanel);
            setTimeout(lang.hitch(this, function () {
              this._setFirstLastFocusNodes();
            }), 0);

          }
        })));

        //Handle click event of publish ERG to portal button
        this.own(on(this.threatPublishButton, 'click', lang.hitch(this, function () {
          this._threatPublishButtonClicked();
        })));

        //Handle keydown event of publish ERG to portal button for aceessibility
        this.own(on(this.threatPublishButton, 'keydown', lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._threatPublishButtonClicked();
          }
        })));

        // Drawbox listeners
        this.own(on(this.drawBox, 'DrawEnd', lang.hitch(this, this._onDrawEnd)));

        // SelectFeaturesTool init and listeners
        this.selectFeaturesTool = new SelectFeaturesTool({
          drawBoxOption: {
            map: this.map,
            geoTypes: ["EXTENT", "POLYGON"],
            showClear: false
          },
          nls: this.nls
        });
        this.own(on(this.selectFeaturesTool, 'selection-complete', lang.hitch(this, function (results) {
          this._currentGeometry = [];
          if (results.geometry && results.geometry.length > 0) {
            array.forEach(results.geometry, lang.hitch(this, function (g) {
              this._currentGeometry.push(g);
            }));
          }
          this._toggleCreateZoneButton(this._selectedThreat && this._currentGeometry.length > 0);
          focusUtils.focus(this.threatType.domNode);
        })));
        this.selectFeaturesTool.placeAt(this.drawingSection);

        // Select listeners
        this.own(on(this.inputTypeSelect, 'change', lang.hitch(this, this._onInputTypeSelectionChanged)));
        this.own(on(this.threatType, 'change', lang.hitch(this, this._onThreatTypeSelectionChanged)));
        this.own(on(this.unitType, 'change', lang.hitch(this, this._onUnitTypeSelectionChanged)));
        this.own(on(this.layerSelect, 'change', lang.hitch(this, this._onLayerSelectionChanged)));

        // Checkbox listener
        this.own(on(this.publishNewLayer, 'click', lang.hitch(this, this._onCheckboxClicked)));
        this.own(on(this.publishNewLayer, 'change', lang.hitch(this, this._onCheckboxClicked)));
        // keydown for accessibility
        this.own(on(this.publishNewLayer, 'keydown', lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._onCheckboxClicked();
          }
        })));
        this.own(on(this.featureLayerList, 'change', lang.hitch(this, function () {
          this.resize();
        })));
      },

      _threatPublishButtonClicked: function () {
        if (this.publishNewLayer.checked && !this.addTANameArea.isValid()) {
          // Invalid entry
          this.publishMessage.innerHTML = this.nls.missingLayerNameMessage;
          return;
        }

        // Reset to empty message
        this.publishMessage.innerHTML = '';

        // Create needed parameters
        var params = {
          layerName: (this.publishNewLayer.checked) ? this.addTANameArea.value : this.featureLayerList.getValue(),
          url: "",
          itemId: "",
          serviceItemId: "",
          map: this.map,
          appConfig: this.appConfig,
          publishMessage: this.publishMessage,
          nls: this.nls,
          layers : this._getLayersWithGraphics()
        };

        // Retrieve selected layer by user from drop down list
        if (!this.publishNewLayer.checked) {
          var filteredList = this._layerList.filter(function (item) {
            return item.name === params.layerName;
          }, this);
          if (filteredList.length === 1) {
            params.url = filteredList[0].url;
            params.itemId = filteredList[0].id;
            params.serviceItemId = dojoJSON.parse(filteredList[0]._json).serviceItemId;
          }
        }

        // Pass on the layer list
        portalutils._layerList = this._layerList;
        // Save to portal
        portalutils.saveToPortal(params);
      },

      /**
       * This function is used to get layer which has graphics
       */
      _getLayersWithGraphics: function () {
        var validLayers = [];
        for (var layer in this.threatsGraphicsLayersObj) {
          if (this.threatsGraphicsLayersObj.hasOwnProperty(layer)) {
            if (this.threatsGraphicsLayersObj[layer].graphics.length > 0) {
              validLayers.push(this.threatsGraphicsLayersObj[layer]);
            }
          }
        }
        return validLayers;
      },

      /**
       * If checkbox is checked, clear textbox and allow user to
       * input a new layer name.
       */
      _onCheckboxClicked: function () {
        if (this.publishNewLayer.checked) {
          domClass.add(this.featureLayerList.domNode, 'controlGroupHidden');
          domClass.remove(this.addTANameArea.domNode, 'controlGroupHidden');
          this.addTANameArea.reset();
          this.addTANameArea.focus();
          this._showOrHideLayerCountHint();
        } else {
          domClass.add(this.addTANameArea.domNode, 'controlGroupHidden');
          domClass.remove(this.featureLayerList.domNode, 'controlGroupHidden');
          domClass.add(this.hintNode, 'controlGroupHidden');
        }
        this._addLayerToMap = this.publishNewLayer.checked;
      },

      /**
       * Show and hide divs based on selected input location type
       */
      _onInputTypeSelectionChanged: function () {
        var inputType = this.inputTypeSelect.get("value");
        if (inputType === "interactive") {
          coreFx.wipeIn({
            node: this.interActiveDiv
          }).play();
          this.coordInputDiv.style.display = this.existingFeatureDiv.style.display = "none";
        }
        if (inputType === "manual_location") {
          coreFx.wipeIn({
            node: this.coordInputDiv
          }).play();
          this.interActiveDiv.style.display = this.existingFeatureDiv.style.display = "none";
        }
        if (inputType === "existing_features") {
          coreFx.wipeIn({
            node: this.existingFeatureDiv
          }).play();
          this.coordInputDiv.style.display = this.interActiveDiv.style.display = "none";
        }
        setTimeout(lang.hitch(this, function () {
          this._resetThreatZoneTableMaxHeight();
        }), 500);
      },

      /**
       * Gets the selected layer from webmap
       */
      _onLayerSelectionChanged: function () {
        this.selectFeaturesTool.setLayerInfo(this._getSelectedLayerInfo());
        this.resize();
      },

      /**
       * Handler for threat type select ctrl
       */
      _onThreatTypeSelectionChanged: function () {
        var threatType = this.threatType.get("value");
        this._threatZonesTable.clear();
        if (threatType !== "") {
          if (this.threatsGraphicsLayersObj.hasOwnProperty(threatType)) {
            this._populateThreatZoneTableRows(threatType);
            this._selectedThreat = this._getSelectedThreatInfo(threatType);
            var targetGL = this.threatsGraphicsLayersObj[threatType];
            //add the threat feature layer and the ERG extent graphics layer to the map
            this.map.addLayer(targetGL);
            var featureLayerInfo;
            //must ensure the layer is loaded before we can access it to turn on the labels if required
            if (targetGL.loaded) {
              // show or hide labels
              featureLayerInfo =
                jimuLayerInfos.getInstanceSync().getLayerInfoById(targetGL.id);
              if (featureLayerInfo) {
                featureLayerInfo.enablePopup();
              }
            } else {
              targetGL.on("load", lang.hitch(this, function () {
                // show or hide labels
                featureLayerInfo =
                  jimuLayerInfos.getInstanceSync().getLayerInfoById(targetGL.id);
                if (featureLayerInfo) {
                  featureLayerInfo.enablePopup();
                }
              }));
            }
            this._createRenderer(this._selectedThreat);
            //refresh the layer to apply the settings
            targetGL.refresh();
            //Enable create zone button
            if (this._currentGeometry.length > 0) {
              this._toggleCreateZoneButton(true);
            }
          }
        } else {
          this._toggleCreateZoneButton(false);
          this._selectedThreat = null;
        }
      },

      /**
       * Display standoff distances when a threat type is selected
       */
      _onUnitTypeSelectionChanged: function () {
        this._selectedUnitType = this.unitType.get("value");
        if (this._selectedThreat !== null) {
          this._updateThreatZoneTable(this._selectedUnitType);
        }
      },

      /**
       * Get panel node from panel name
       **/
      _getNodeByName: function (panelName) {
        var node;
        switch (panelName) {
          case "threatMainPage":
            node = this.threatMainPageNode;
            break;
          case "threatSettingsPage":
            node = this.threatSettingsPageNode;
            break;
          case "threatResultsPage":
            node = this.threatResultsPageNode;
            break;
        }
        return node;
      },

      _reset: function () {
        this._clearLayers();
        //enable map navigation if disabled due to a tool being in use
        this.map.enableMapNavigation();
      },

      _clearLayers: function () {
        this._toggleCreateZoneButton(false);
        this._threatLocation.clear();
        this.threatCoordinateControl.clear();
        this.selectFeaturesTool.reset();
        this._currentGeometry = [];
        this._selectedThreat = null;
        this.drawBox.clear();
        this.threatType.set("value", "");
        this._threatZonesTable.clear();
        for (var layer in this.threatsGraphicsLayersObj) {
          if (this.threatsGraphicsLayersObj.hasOwnProperty(layer)) {
            this.threatsGraphicsLayersObj[layer].clear();
            this.threatsGraphicsLayersObj[layer].refresh();
          }
        }
      },

      /**
       * Creates settings
       **/
      _createSettings: function () {
        //Create Settings Instance
        this._threatSettingsInstance = new Settings({
          nls: this.nls,
          config: this.config,
          appConfig: this.appConfig,
          refDomNode: this.domNode,
          threatData: this._threatData,
          selectedUnitType : this._selectedUnitType
        }, domConstruct.create("div", {}, this.threatSettingsNode));

        //add a listener for a change in settings
        this.own(this._threatSettingsInstance.on("ThreatSettingsChanged",
          lang.hitch(this, function (updatedSettings) {
            this._createRenderer(updatedSettings);
          })));
        this._threatSettingsInstance.startup();
      },

      /**
       * This function is used to create Renderer Threats
       */
      _createRenderer: function (updatedSettings) {
        var uniqueValueInfos = [], symbol;
        array.forEach(updatedSettings.zones, lang.hitch(this, function (zone) {
          var fillColor =
            new Color(zone.symbol.fillColor.color);
          var fillTrans =
            (1 - zone.symbol.fillColor.transparency) * 255;
          var outlineColor =
            new Color(zone.symbol.outlineColor.color);
          var outlineTrans =
            (1 - zone.symbol.outlineColor.transparency) * 255;

          symbol = {
            "value": this._getZoneNameNls(zone.name),
            "symbol": {
              "color": [fillColor.r,
              fillColor.g,
              fillColor.b,
                fillTrans
              ],
              "outline": {
                "color": [outlineColor.r,
                outlineColor.g,
                outlineColor.b,
                  outlineTrans
                ],
                "width": 1,
                "type": "esriSLS",
                "style": zone.symbol.outlineColor.type
              },
              "type": "esriSFS",
              "style": zone.symbol.fillColor.type
            }
          };
          uniqueValueInfos.push(symbol);
        }));

        var uvrJson = {
          "type": "uniqueValue",
          "field1": "zone_type",
          "uniqueValueInfos": uniqueValueInfos
        };
        // create a renderer for the threat analysis layer to override default symbology
        var renderer = new UniqueValueRenderer(uvrJson);
        if (this.threatsGraphicsLayersObj.hasOwnProperty(updatedSettings.threatName)) {
          var targetGL = this.threatsGraphicsLayersObj[updatedSettings.threatName];
          targetGL.setRenderer(renderer);
          //refresh the layer to apply the settings
          targetGL.refresh();
        }
      },

      /**
       * Displays selected panel
       **/
      _showPanel: function (currentPanel) {
        var prevNode, currentNode;
        //check if previous panel exist and hide it
        if (this._currentOpenPanel) {
          prevNode = this._getNodeByName(this._currentOpenPanel);
          domClass.add(prevNode, "Hidden");
        }
        //get current panel to be displayed and show it
        currentNode = this._getNodeByName(currentPanel);
        domClass.remove(currentNode, "Hidden");
        //set the current panel and previous panel
        this._lastOpenPanel = this._currentOpenPanel;
        this._currentOpenPanel = currentPanel;
        this._setFirstLastFocusNodes();
      },

      /**
       * Handle the create zones button being clicked
       **/
      _threatCreateButtonClicked: function () {
        var deferredArray = [], defArr = [];
        if (!domClass.contains(this.threatCreateButton, 'jimu-state-disabled')) {
          //show loading indicator and project the current geometry
          this.loading.show();
          array.forEach(this._currentGeometry, lang.hitch(this, function (inputGeometry) {
            deferredArray.push(this.getProjectedGeometry(inputGeometry, new SpatialReference(102100)));
          }));
          all(deferredArray).then(lang.hitch(this, function (projectedGeometries) {
            array.forEach(projectedGeometries, lang.hitch(this, function (projectedGeometry) {
              defArr.push(this._createThreatAreas(
                projectedGeometry, this._selectedThreat, this._selectedUnitType));
            }));
            all(defArr).then(lang.hitch(this, function () {
              //After all threat areas are created
              this._showPanel("threatResultsPage");
              this._showOrHideLayerCountHint();
              if (this.isOnScreen) {
                this.resize();
              }
              this.selectFeaturesTool.reset();
              this.loading.hide();
            }));
          }));
        }
      },

      /**
      * Returns the projected geometry in outSR
      **/
      getProjectedGeometry : function (geometry, outSR) {
        var deferred, result;
        deferred = new Deferred();
        if (WebMercatorUtils.canProject(geometry, outSR)) {
          result = WebMercatorUtils.project(geometry, outSR);
          deferred.resolve(result);
        } else {
          this.geometryService.project([geometry], outSR, function (projectedGeometries) {
            result = projectedGeometries[0];
            deferred.resolve(result);
          }, function () {
            deferred.resolve(null);
          });
        }
        return deferred.promise;
      },

      /**
       * Creates the threat areas based on geometry,
       * mandatory, and safe distances
       */
      _createThreatAreas: function (geom, selectedThreat, unitType) {
        var unionFeatures;
        var deferred = new Deferred();
        if (geom && selectedThreat) {
          var features = [],
            infoTemplate = null, geoms;
          var unitMeasure = (unitType.toLowerCase() === "feet") ? this.nls.feetLabel : this.nls.metersLabel;

          //get the threat location
          var threatLocation = (geom.spatialReference.isWebMercator()) ?
            geom : WebMercatorUtils.geographicToWebMercator(geom);

          //set geodesic unit measurement number
          var geodesicNum = (unitType.toLowerCase() === "feet") ? 9002 : 9001;

          array.forEach(this._selectedThreat.zones, lang.hitch(this, function (zone, i) {
            var convertedLength = (unitType.toLowerCase() === "feet") ? this._formatNumber(zone.distance) :
              this._convertToMeters(zone.distance, true);
            convertedLength = dojoNumber.parse(convertedLength, {
              places: 2
            });
            var zoneGraphic = (GeometryEngine.geodesicBuffer(threatLocation,
              convertedLength, geodesicNum));
            //Cut the second zone from the first zone geometry to create a donut
            if (features.length === 1) {
              geoms = GeometryEngine.difference(zoneGraphic, features[i - 1].geometry);
              zoneGraphic = geoms ? geoms : zoneGraphic;
            }
            //If zones are more than 2 then Cut the current zone from union all previous zone geometry
            //to create a donut
            if (features.length > 1) {
              unionFeatures = GeometryEngine.union(array.map(features, function (f) {
                return f.geometry;
              }));
              geoms = GeometryEngine.difference(zoneGraphic, unionFeatures);
              zoneGraphic = geoms ? geoms : zoneGraphic;
            }
            zoneGraphic = new Graphic(zoneGraphic);
            zoneGraphic.setAttributes({
              "zone_type": this._getZoneNameNls(zone.name),
              "distance": convertedLength,
              "threat_type": this._getThreatTypeNls(selectedThreat.threatName),
              "units": unitMeasure
            });
            infoTemplate = new InfoTemplate();
            infoTemplate.setTitle(this.nls._widgetLabel);
            infoTemplate.setContent(
              "<b>" + this.nls.threatType + ":</b> ${threat_type}<br />" +
              "<b>" + zone.name + ":</b> ${distance:NumberFormat(places:2)} " +
              unitMeasure + "<br />"
            );
            features.push(zoneGraphic);
          }));
          //project all feature's geometry to map spatial reference
          var deferredArray = [];
          this.loading.show();
          array.forEach(features, lang.hitch(this, function (feature) {
            deferredArray.push(this.getProjectedGeometry(feature.geometry, this.map.spatialReference));
          }));
          //once all geometries are projected in map spatial reference set infoTemplate and Attrs
          all(deferredArray).then(lang.hitch(this, function (projectedGeometries) {
            var projectedThreatAreas = [];
            array.forEach(features, lang.hitch(this, function (feature, index) {
              if (projectedGeometries[index]) {
                var graphic = new Graphic(projectedGeometries[index]);
                graphic.setInfoTemplate(feature.infoTemplate);
                graphic.setAttributes(feature.attributes);
                projectedThreatAreas.push(graphic);
              }
            }));
            if (projectedThreatAreas && projectedThreatAreas.length > 0) {
              if (this.threatsGraphicsLayersObj.hasOwnProperty(this._selectedThreat.threatName)) {
                var targetGL = this.threatsGraphicsLayersObj[this._selectedThreat.threatName];
                targetGL.applyEdits(projectedThreatAreas, null, null, lang.hitch(this,
                  function () {
                    this.map.setExtent(
                      targetGL.graphics[targetGL.graphics.length - 1].geometry.getExtent().expand(2));
                    deferred.resolve(null);
                  }),
                  function () {
                    deferred.resolve(null);
                  });
              }
            }
          }));
        }
        return deferred.promise;
      },

      /**
       * This gets all the operational layers and places it in a custom data object.
       */
      _getAllMapLayers: function () {
        var layerList = [];
        var layerStructure = LayerStructure.getInstance();
        //get all layers.
        layerStructure.traversal(lang.hitch(this, function (layerNode) {
          //check to see if type exist and if it's not any tiles
          if (typeof (layerNode._layerInfo.layerObject.type) !== 'undefined') {
            if ((layerNode._layerInfo.layerObject.type).indexOf("tile") === -1) {
              if (layerNode._layerInfo.layerObject.type !== "FeatureCollection") {
                if (layerNode._layerInfo.layerObject.geometryType === "esriGeometryPolygon") {
                  layerList.push(layerNode._layerInfo.layerObject);
                }
              }
            }
          }
        }));
        return layerList;
      },

      /**
       * Inits the draw box for interactive input
       * and select existing feature types
       */
      _initDrawBox: function () {
        this.drawBox.setMap(this.map);
        var pinSymbol = jimuSymbolUtils.getGreyPinMarkerSymbol();
        this.drawBox.setPointSymbol(pinSymbol);
      },

      /**
       * Handler for draw box for interactive input type
       */
      _onDrawEnd: function (graphic, geotype) {
        this.drawBox.clear();
        this._currentGeometry = [];
        this._currentGeometry.push(graphic.geometry);
        var symbol = null;
        if (geotype === "POINT") {
          symbol = this._pointSymbol;
        } else if (geotype === "POLYLINE") {
          symbol = this._polylineSymbol;
        } else {
          symbol = this._polygonSymbol;
        }
        if (geotype !== "EXTENT") {
          this._threatLocation.clear();
          this._threatLocation.add(new Graphic(graphic.geometry, symbol, null, null));
        }

        if (this._selectedThreat && this._currentGeometry.length > 0) {
          this._toggleCreateZoneButton(true);
        }
        focusUtils.focus(this.threatType.domNode);
      },

      /**
       * Toggle the Create Zones button
       */
      _toggleCreateZoneButton: function (isEnabled) {
        if (isEnabled) {
          domClass.remove(this.threatCreateButton, 'jimu-state-disabled');
          domAttr.set(this.threatCreateButton, "tabindex", 0);
        } else {
          domClass.add(this.threatCreateButton, 'jimu-state-disabled');
          domAttr.set(this.threatCreateButton, "tabindex", -1);
        }
      },

      /**
       * Set the value for mandatory and safe distances controls
       */
      _updateThreatZoneTable: function (unitType) {
        var rowData = {};
        var trs = this._threatZonesTable.getRows();
        array.forEach(trs, lang.hitch(this, function (tr) {
          rowData.distance = (unitType.toLowerCase() === "meters") ? this._convertToMeters(tr.distance, true) :
            this._convertToFeet(tr.distance, true);
          tr.distance = (unitType.toLowerCase() === "meters") ? this._convertToMeters(tr.distance, false) :
            this._convertToFeet(tr.distance, false);
          this._threatZonesTable.editRow(tr, rowData);
        }));
      },

      /**
       * Convert feet to meters
       */
      _convertToMeters: function (length, shouldFormat) {
        if (shouldFormat) {
          return this._formatNumber(length / 3.280839895);
        }
        return length / 3.280839895;
      },

      /**
       * Convert feet to meters
       */
      _convertToFeet: function (length, shouldFormat) {
        if (shouldFormat) {
          return this._formatNumber(length * 3.280839895);
        }
        return length * 3.280839895;
      },

      /**
       * Format number to 2 decimal places
       */
      _formatNumber: function (length) {
        return dojoNumber.format(length, {
          places: 2,
          locale: dojoKernel.locale
        });
      },

      /**
       * Check if feature layer has the supported capabilities
       * @param {*} capabilities
       * @returns
       */
      _containsSupportedCapabilities: function (capabilities) {
        var supported = ["create", "delete", "query", "update", "editing"];
        var isSupported = true;
        supported.forEach(function(supCap) {
          if (capabilities.toLowerCase().split(",").indexOf(supCap) === -1) {
            isSupported = false;
          }
        });
        return isSupported;
      },

      /**
       * Populates the drop down list of operational layers
       * from the webmap
       */
      _populateSelectList: function (selectNode, layerList, selectedOptionName,
        doSetFeaturesTool) {
        //if layerlist dropdown then set dropdownOption to blank array
        if (doSetFeaturesTool) {
          selectNode.options = [];
        }

        array.forEach(layerList, lang.hitch(this, function (layer) {
          if (doSetFeaturesTool) {
            var layerInfo = this._jimuLayerInfos.getLayerInfoById(layer.id);
            var layerName = "";
            if (layerInfo) {
              layerName = layerInfo.title ? layerInfo.title : layerInfo.name;
            }
            if (layer.type === "Feature Layer") {
              selectNode.addOption({
                value: layerName,
                label: jimuUtils.sanitizeHTML(layer.name) ? jimuUtils.sanitizeHTML(layer.name) : layerName,
                selected: false
              });
            }
          } else {
            if (layer.url) {
              if (layer.type === "Feature Layer" && this._containsSupportedCapabilities(layer.capabilities)) {
                selectNode.addOption({
                  value: layer.name,
                  label: jimuUtils.sanitizeHTML(layer.name),
                  selected: false
                });
              }
            }
          }
        }));

        if (selectedOptionName !== '') {
          selectNode.set("displayedValue", selectedOptionName);
        }

        if (doSetFeaturesTool && selectNode.options.length > 0) {
          if (this.selectFeaturesTool) {
            this.selectFeaturesTool.setLayerInfo(this._getSelectedLayerInfo());
          }
        }
      },

      _initDefaultSymbols: function () {
        var pointSys = {
          "style": "esriSMSCircle",
          "color": [0, 0, 128, 128],
          "name": "Circle",
          "outline": {
            "color": [0, 0, 128, 255],
            "width": 1
          },
          "type": "esriSMS",
          "size": 18
        };
        var lineSys = {
          "style": "esriSLSSolid",
          "color": [79, 129, 189, 255],
          "width": 3,
          "name": "Blue 1",
          "type": "esriSLS"
        };
        var polygonSys = {
          "style": "esriSFSSolid",
          "color": [79, 129, 189, 128],
          "type": "esriSFS",
          "outline": {
            "style": "esriSLSSolid",
            "color": [54, 93, 141, 255],
            "width": 1.5,
            "type": "esriSLS"
          }
        };
        if (!this._pointSymbol) {
          this._pointSymbol = jsonUtils.fromJson(pointSys);
        }
        if (!this._polylineSymbol) {
          this._polylineSymbol = jsonUtils.fromJson(lineSys);
        }
        if (!this._polygonSymbol) {
          this._polygonSymbol = jsonUtils.fromJson(polygonSys);
        }
      },

      /**
       * Moves the map ever so slightly to force a refresh of rendering features
       */
      _moveMap: function () {
        var spatialRef = this.map.spatialReference;
        var startExtent = new Extent();
        startExtent.xmin = this.map.extent.xmin + 0.0001;
        startExtent.ymin = this.map.extent.ymin;
        startExtent.xmax = this.map.extent.xmax;
        startExtent.ymax = this.map.extent.ymax;
        startExtent.spatialReference = spatialRef;

        this.map.setExtent(startExtent);
      },

      // function to set first and last focus nodes for accessibility
      _setFirstLastFocusNodes: function (useIsAutoFocusFirstNodeWidget) {
        // if create zones button is clicked
        if (this._currentOpenPanel === "threatResultsPage") {
          jimuUtils.initFirstFocusNode(this.domNode, this.threatResultsPanelBackButton);
          jimuUtils.initLastFocusNode(this.domNode, this.threatPublishButton);
          var linkText = query("a", this.publishMessage)[0];
          if (this.publishMessage.innerHTML !== "" && linkText) {
            jimuUtils.initLastFocusNode(this.domNode, this.publishMessage);
            focusUtils.focus(linkText);
          } else if (this.publishMessage.innerHTML === "") {
            focusUtils.focus(this.threatResultsPanelBackButton);
          }
        }
        // if setting button is clicked
        if (this._currentOpenPanel === "threatSettingsPage") {
          jimuUtils.initFirstFocusNode(this.domNode, this.threatSettingsPanelBackButton);
          focusUtils.focus(this.threatSettingsPanelBackButton);
          setTimeout(lang.hitch(this, function () {
            this._threatSettingsInstance._setLastFocusNode();
          }), 100);
        }
        if (this._currentOpenPanel === "threatMainPage") {
          // set First and last Focus Node
          jimuUtils.initFirstFocusNode(this.domNode, this.threatAnalysisTitleUrl);
          jimuUtils.initLastFocusNode(this.domNode, this.threatClearButton);
          //use isAutoFocusFirstNodeWidget method only first time
          if (useIsAutoFocusFirstNodeWidget) {
            if (jimuUtils.isAutoFocusFirstNodeWidget(this)) {
              focusUtils.focus(this.threatAnalysisTitleUrl);
            }
          } else {
            focusUtils.focus(this.threatAnalysisTitleUrl);
          }
        }
      },

      /**
       * This function is used to convert distances to feet
       */
      _convertDistanceMetersToFeet: function (data) {
        var threatData = [];
        array.forEach(data, lang.hitch(this, function (threatInfo) {
          array.forEach(threatInfo.zones, lang.hitch(this, function (zone) {
            zone.distance = this._convertToFeet(zone.distance, false);
          }));
          threatData.push(threatInfo);
        }));
        return threatData;
      },

      /**
       * This function is used to listen add and remove layer evt of map
       */
      _onLayerInfosChange: function (layerInfo, changedType) {
        var layerName, layerSelectValue;
        this._layerList = "";
        //Retrieve all layers from webmap
        this._layerList = this._getLayers();

        layerSelectValue = this.layerSelect.value;
        if (changedType === "removed") {
          //if selected layer is removed from the map then set layer select to blank
          layerName = layerInfo.title ? layerInfo.title : layerInfo.name;
          if (layerName === this.layerSelect.value) {
            layerSelectValue = "";
          }
        }
        // populate the layer list
        this._populateSelectList(this.layerSelect, this._layerList, layerSelectValue, true);
      },

      /**
       * This function is used to get layers from map
       */
      _getLayers: function () {
        var layerList = [];
        for (var layer in this.map._layers) {
          if (this.map._layers.hasOwnProperty(layer)) {
            var layerObj;
            layerObj = this.map._layers[layer];
            if (layerObj.hasOwnProperty("type") &&
              layerObj.type === "Feature Layer") {
              layerList.push(layerObj);
            }
          }
        }
        return layerList.length > 0 ? layerList.reverse() : layerList;
      },

      /**
       * This function is used to get layerinfo of selected layer in layerlist dropdown
       */
      _getSelectedLayerInfo: function () {
        var selectedLayerInfo;
        var layerSelectValue = this.layerSelect.get("value");
        array.forEach(this._layerList, lang.hitch(this, function (layer) {
          var layerInfo = this._jimuLayerInfos.getLayerInfoById(layer.id);
          var layerName = layerInfo.title ? layerInfo.title : layer.name;
          if (layerSelectValue === layerName) {
            selectedLayerInfo = layer;
          }
        }));
        return selectedLayerInfo;
      },

      _initThreatTypeTable: function () {
        var fields = [{
          name: 'zoneDescription',
          title: this.nls.zoneDescriptionColLabel,
          type: 'text',
          width: "65%"
        },
        {
          name: 'distance',
          title: this.nls.distanceColLabel,
          type: 'text',
          width: "35%"
        }];
        var args = {
          fields: fields,
          selectable: false
        };
        this._threatZonesTable = new Table(args);
        this._threatZonesTable.placeAt(this.threatZoneTableNode);
        this._threatZonesTable.startup();
      },

      /**
       * This function is used to add row of zone info into zone infos table
       */
      _addRowToZoneTable: function (zone) {
        var result, tr;
        var zoneDistance = zone.distance;
        var row = {
          zoneDescription: this._getZoneNameNls(zone.name),
          distance: (this._selectedUnitType.toLowerCase() === "meters") ? this._convertToMeters(zoneDistance, true) :
            this._formatNumber(zone.distance)
        };
        result = this._threatZonesTable.addRow(row);
        if (result.success && result.tr) {
          tr = result.tr;
          tr.zoneDescription = zone.name;
          tr.distance = (this._selectedUnitType.toLowerCase() === "meters") ?
            this._convertToMeters(zoneDistance, false) : zone.distance;
        }
      },

      /**
       * This function is used to get selected threat info
       */
      _populateThreatZoneTableRows: function (selectedThreatType) {
        array.some(this._threatData, lang.hitch(this, function (threat) {
          if (selectedThreatType === threat.threatName) {
            array.forEach(threat.zones, lang.hitch(this, function (zone) {
              this._addRowToZoneTable(zone);
            }));
          }
        }));
      },

      /**
       * This function is used to get selected threat info
       */
      _getSelectedThreatInfo: function (selectedThreatType) {
        var selectedThreatInfo = {};
        array.some(this._threatData, lang.hitch(this, function (threat) {
          if (selectedThreatType === threat.threatName) {
            selectedThreatInfo.threatName = threat.threatName;
            selectedThreatInfo.zones = threat.zones;
          }
        }));
        return selectedThreatInfo;
      },

      /**
       * This function is used to calculate max-height of zone table in main screen
       */
      _resetThreatZoneTableMaxHeight: function () {
        // node 1
        var threatMainPageNodeHeight;
        var threatMainPageNode = query(".esriCTThreatMainPageNode", this.mainNode);
        if (threatMainPageNode && threatMainPageNode.length > 0) {
          threatMainPageNode = threatMainPageNode[0];
          threatMainPageNodeHeight = domStyle.getComputedStyle(threatMainPageNode).height;
          threatMainPageNodeHeight = parseFloat(threatMainPageNodeHeight);
        }

        // node 2
        var containerNodes = query(".esriCTContainerNode", this.threatMainPageNode);
        //extra margin(10px) + header(30px) height = 40
        var height = 40;
        if (containerNodes && containerNodes.length > 0) {
          array.forEach(containerNodes, lang.hitch(this, function (node) {
            if (node.style.display !== "none") {
              var NodeHeight = domStyle.getComputedStyle(node).height;
              NodeHeight = parseFloat(NodeHeight);
              height = height + NodeHeight;
            }
          }));
        }

        // reset height
        var threatZoneInfoTableHeight = threatMainPageNodeHeight - height;
        var threatZoneTableNode = query(".jimu-simple-table", this.threatZoneTableNode);
        if (threatZoneTableNode.length > 0) {
          //at least two rows should be displayed
          if (threatZoneInfoTableHeight < 97) {
            threatZoneInfoTableHeight = 97;
          }
          domStyle.set(threatZoneTableNode[0], "maxHeight", threatZoneInfoTableHeight + "px");
        }
      },

      /**
       * This function is used to create layerDefinition for each threat type
       */
      _initGLForThreats: function () {
        array.forEach(this._threatData, lang.hitch(this, function (threat, i) {
          var featureCollection = {
            "layerDefinition": {
              "name": this._getThreatTypeNls(threat.threatName),
              "geometryType": "esriGeometryPolygon",
              "objectIdField": "ObjectID",
              "fields": [{
                "name": "ObjectID",
                "alias": "ObjectID",
                "type": "esriFieldTypeOID"
              }, {
                "name": "threat_type",
                "alias": this.nls.threatType,
                "type": "esriFieldTypeString"
              }, {
                "name": "zone_type",
                "alias": this.nls.zoneTypeLabel,
                "type": "esriFieldTypeString"
              }, {
                "name": "distance",
                "alias": this.nls.distanceColLabel,
                "type": "esriFieldTypeDouble"
              }, {
                "name": "units",
                "alias": this.nls.unitsLabel,
                "type": "esriFieldTypeString"
              }],
              "extent": this.map.extent
            }
          };
          var gLId = this.nls.threatGraphicLayer + "_" + this.id + "_" + i;
          var graphicLayer = new FeatureLayer(featureCollection, {
            id: gLId,
            outFields: ["*"]
          });
          this.threatsGraphicsLayersObj[threat.threatName] = graphicLayer;
        }));
      },

      /**
       * This function is used to sort zones in ascending order of distance
       */
      _sortZones: function (zonesArray) {
        var sortedZonesArr = zonesArray.sort(function (a, b) {
          return a.distance - b.distance;
        });
        return sortedZonesArr;
      },

      /**
       * This function is used to threat zones array in asc order
       */
      _sortZonesInAscOrder: function () {
        array.forEach(this._threatData, lang.hitch(this, function (threat, i) {
          this._threatData[i].zones = this._sortZones(threat.zones);
        }));
      },

      /**
       * This function is used to display  or hide hint msg
       */
      _showOrHideLayerCountHint: function () {
        //if one or more layer has graphics then display hint msg
        // to update the user how many layer will be created in feature server
        if (this._getLayersWithGraphics().length > 0 && this.publishNewLayer.checked) {
          this.hintNode.innerHTML = string.substitute(this.nls.layerCountHint, {
            layerCount: this._getLayersWithGraphics().length
          });
          domClass.remove(this.hintNode, 'controlGroupHidden');
        } else {
          //hide display msg
          domClass.add(this.hintNode, 'controlGroupHidden');
        }
      },

      /**
       * Return NLS label representation of zone name
       */
      _getZoneNameNls: function (zoneName) {
        var self = this;
        var zoneLabels = {
          "Mandatory Evacuation Distance": "mandatoryLabel",
          "Safe Evacuation Distance": "safeLabel",
          "Fireball Diameter": "fireBallDiameterLable",
          "Safe Distance": "lpgSafeDistanceLable"
        };

        var getZoneLabel = function (zoneName) {
          if (zoneLabels[zoneName] !== undefined) {
            return self.nls[zoneLabels[zoneName]];
          }
          return zoneName;
        };
        return getZoneLabel(zoneName);
      },

      /**
       * Return NLS label representation of threat type
       */
      _getThreatTypeNls: function (threatTypeName) {
        var self = this;
        var threatTypeLabels = {
          "Pipe Bomb": "pipeBombLabel",
          "Suicide Bomb": "suicideBombLabel",
          "Briefcase": "briefcaseLabel",
          "Car": "carLabel",
          "SUV/VAN": "suvVanLabel",
          "Small Delivery Truck": "smallDeliveryTruckLabel",
          "Container/Water Truck": "containerWaterTruckLabel",
          "Semi-Trailer": "semiTrailerLabel",
          "Small LPG Tank": "smallLPGTank",
          "Large LPG Tank": "largeLPGTank",
          "Commercial/Residential LPG Tank": "commercialResidentialLPGTank",
          "Small LPG Truck": "smallLPGTruck",
          "Semi-Tanker LPG": "semiTankerLPG"
        };

        var getThreatTypeLabel = function (threatName) {
          if (threatTypeLabels[threatName] !== undefined) {
            return self.nls[threatTypeLabels[threatName]];
          }
          return threatName;
        };

        return getThreatTypeLabel(threatTypeName);
      }
    });
  });