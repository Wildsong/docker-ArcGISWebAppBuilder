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
/*globals $:false */
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
    'dojo/string',
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
    dojoString,
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
    all
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
      _currentGeometry: null, // holds the newly created geometry from interactive tool
      _pointSymbol: null, // holds the point symbol
      _polylineSymbol: null, // holds the polyline symbol
      _polygonSymbol: null, // holds the polygon symbol
      _selectedUnitType: null, // holds Feet or Meters
      _addLayerToMap: true, // flag to add layer to map
      geometryService: null, // holds GeometryService instance

      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.inherited(arguments);
        this.nls.common = {};
        lang.mixin(this.nls.common, window.jimuNls.common);
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

        //create a feature collection for the drawn ERG to populate
        var featureCollection = {
          "layerDefinition": {
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
              "name": "mandatory_dist",
              "alias": this.nls.mandatoryLabel,
              "type": "esriFieldTypeDouble"
            }, {
              "name": "safe_dist",
              "alias": this.nls.safeLabel,
              "type": "esriFieldTypeDouble"
            }, {
              "name": "lpg_fireball_dia",
              "alias": this.nls.fireBallDiameterFieldAlias,
              "type": "esriFieldTypeDouble"
            }, {
              "name": "lpg_safe_dist",
              "alias": this.nls.lpgSafeDistanceFieldAlias,
              "type": "esriFieldTypeDouble"
            }, {
              "name": "units",
              "alias": this.nls.unitsLabel,
              "type": "esriFieldTypeString"
            }],
            "extent": this.map.extent
          }
        };

        //create the threat feature layer
        this.ThreatArea = new FeatureLayer(featureCollection, {
          id: this.nls.threatGraphicLayer,
          outFields: ["*"]
        });

        //add the threat feature layer and the ERG extent graphics layer to the map
        this.map.addLayer(this.ThreatArea);

        var featureLayerInfo;
        //must ensure the layer is loaded before we can access it to turn on the labels if required
        if (this.ThreatArea.loaded) {
          // show or hide labels
          featureLayerInfo =
            jimuLayerInfos.getInstanceSync().getLayerInfoById(this.nls.threatGraphicLayer);
          if (featureLayerInfo) {
            featureLayerInfo.enablePopup();
          }
        } else {
          this.ThreatArea.on("load", lang.hitch(this, function () {
            // show or hide labels
            featureLayerInfo =
              jimuLayerInfos.getInstanceSync().getLayerInfoById(this.nls.threatGraphicLayer);
            if (featureLayerInfo) {
              featureLayerInfo.enablePopup();
            }
          }));
        }
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

        //set up all the handlers for the different click events
        this._initListeners();

        //Create settings page
        this._createSettings();

        //for backward
        if (this.config.hasOwnProperty("threatTypes")) {
          this._threatData = this.config.threatTypes;
          //convert distance meter to feet for minimum changes
          this._threatData = this._convertDistanceMetersToFeet(this._threatData, true);
        } else {
          //Retrieve threat types
          this._threatData = dojoJSON.parse(chemicalThreats);
        }

        //for backward
        if (this.config.hasOwnProperty("lpgThreatTypes")) {
          this._lpgThreatData = this.config.lpgThreatTypes;
          //convert distance meter to feet for minimum changes
          this._lpgThreatData = this._convertDistanceMetersToFeet(this._lpgThreatData, false);
        } else {
          this._lpgThreatData = dojoJSON.parse(lpgThreats);
        }

        //Retrieve all polygon layers from webmap
        var polygonLayerList = this._getAllMapLayers();

        //Init draw box
        this._initDrawBox();

        // populate the publish list
        this._populateSelectList(this.featureLayerList, polygonLayerList,
          this.config.threatAnalysis.operationalLayer.name, false);

        //If there are no feature layers in the dropdown
        if (this.featureLayerList.options.length === 0) {
          this.publishNewLayer.setValue(true);
          domClass.add(this.checkBoxParentContainer, "controlGroupHidden");
        }
        // Set selected index to interactive
        this.inputTypeSelect.selectedIndex = 0;
        var evt = document.createEvent("Event");
        evt.initEvent("change", false, true);
        this.inputTypeSelect.onChange();

        //Init threat type drop down
        this._initThreatTypeCtrl(this._threatData);

        // Set invalid and range properties messages
        this.mandatoryDist.invalidMessage = this.nls.invalidNumberMessage;
        this.mandatoryDist.rangeMessage = this.nls.invalidRangeMessage;

        this.safeDist.invalidMessage = this.nls.invalidNumberMessage;
        this.safeDist.rangeMessage = this.nls.invalidRangeMessage;

        this.addTANameArea.invalidMessage = this.nls.invalidLayerName;
        this.addTANameArea.missingMessage = this.nls.missingLayerNameMessage;

        this.unitType.set("value", this.config.threatAnalysis.unit);
        this._selectedUnitType = this.unitType.get("value");

        if (this.config.threatAnalysis.operationalLayer.name === '') {
          // Hide the drop-down list
          domClass.add(this.featureLayerList.domNode, 'controlGroupHidden');
          // Set the checkbox to true since user is publishing to a new layer
          this.publishNewLayer.setValue(true);
          // Show the textbox
          domClass.remove(this.addTANameArea.domNode, 'controlGroupHidden');
        }
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

        // Resize the feature list select component when widget is resized
        nl = query(".dijitValidationTextBoxLabel", this.layerSelect.domNode);
        if (nl.length > 0) {
          domStyle.set(nl[0], "width", (this.threatCatagorySelect.domNode.clientWidth - 44) + "px");
        }
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
        if (this.ThreatArea) {
          this.map.removeLayer(this.ThreatArea);
        }
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
        this.threatType.options = [];
        // Create an empty option
        this.threatType.addOption({
          value: "",
          label: "",
          defaultSelected: true,
          selected: true,
          unit: ""
        });
        array.forEach(data, function (item) {
          this.threatType.addOption({
            value: item.Threat,
            label: jimuUtils.sanitizeHTML(getThreatTypeLabel(item.Threat)),
            defaultSelected: false,
            selected: false,
            unit: item.Unit
          });
        }, self);
      },

      /**
       * Init easy auto complete jquery control
       */
      _initAutoCompleteCtrl: function (data) {
        //set up the options for the threat input selector
        var options = {
          data: data,
          placeholder: this.nls.threatPlaceholder,
          getValue: function (element) {
            return element.Threat;
          },
          list: {
            match: {
              enabled: true
            },
            sort: {
              enabled: true
            },
            onChooseEvent: lang.hitch(this, function () {
              var index = $(this.threatType).getSelectedItemIndex();
              this._selectedThreat =
                $(this.threatType).getSelectedItemData(index);
              var threatCatagory = this.threatCatagorySelect.get("value");
              if (threatCatagory === "chemicalThreatCatogory") {
                this._setDistanceInputControls({
                  mandatoryDistance: this._selectedThreat.Bldg_Dist,
                  safeDistance: this._selectedThreat.Outdoor_Dist
                });
              } else {
                this._setDistanceInputControls({
                  mandatoryDistance: this._selectedThreat.Fireball_Dia,
                  safeDistance: this._selectedThreat.Safe_Dist
                });
              }

              if (this.threatCoordinateControl.coordtext.value !== '') {
                this._toggleCreateZoneButton(false);
              }
            }),
            onShowListEvent: lang.hitch(this, function () {
              this._selectedThreat = null;
              this._setDistanceInputControls({
                mandatoryDistance: 0,
                safeDistance: 0
              });
              this._toggleCreateZoneButton(true);
            })
          }
        };
        $(this.threatType).easyAutocomplete(options);
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
        if (!this.config.threatAnalysis.lockSettings) {
          //handle Settings button
          this.own(on(this.threatAnalysisSettingsButton, "click", lang.hitch(this, function () {
            this._showPanel("threatSettingsPage");
          })));

          this.own(on(this._jimuLayerInfos, 'layerInfosChanged', lang.hitch(this, this._onLayerInfosChange)));
          //handle Settings button keydown for accessibility
          this.own(on(this.threatAnalysisSettingsButton, "keydown", lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
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
          this._setDistanceInputControls({
            mandatoryDistance: 0,
            safeDistance: 0
          }, "feet");
          this._setLabelText(this.mandatoryLabel, this.nls.mandatoryLabel);
          this._setLabelText(this.safeLabel, this.nls.safeLabel);
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
            this._setDistanceInputControls({
              mandatoryDistance: 0,
              safeDistance: 0
            }, "feet");
            this._setLabelText(this.mandatoryLabel, this.nls.mandatoryLabel);
            this._setLabelText(this.safeLabel, this.nls.safeLabel);
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
            this._currentGeometry = this.threatCoordinateControl.currentClickPointDD;
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
              this._currentGeometry = this.threatCoordinateControl.currentClickPointDD;
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
          if (this._threatSettingsInstance.validInputs()) {
            this._threatSettingsInstance.onClose();
            this._showPanel(this._lastOpenPanel);
          }
        })));

        //Handle keydown event of settings back button for accessibility
        this.own(on(this.threatSettingsPanelBackButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            if (this._threatSettingsInstance.validInputs()) {
              this._threatSettingsInstance.onClose();
              this._showPanel(this._lastOpenPanel);
              setTimeout(lang.hitch(this, function () {
                this._setFirstLastFocusNodes();
              }), 0);

            }
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
          this._toggleCreateZoneButton(this._selectedThreat && results.geometry ?
            true : false);
          this._currentGeometry = results.geometry;
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
        this.own(on(this.threatCatagorySelect, 'change', lang.hitch(this, function (value) {
          if (value === "chemicalThreatCatogory") {
            this._initThreatTypeCtrl(this._threatData);
            this.mandatoryLabel.innerHTML = this.nls.mandatoryLabel;
            this.safeLabel.innerHTML = this.nls.safeLabel;
          } else {
            this._initThreatTypeCtrl(this._lpgThreatData);
            this.mandatoryLabel.innerHTML = this.nls.fireBallDiameterLable;
            this.safeLabel.innerHTML = this.nls.lpgSafeDistanceLable;
          }
          this._setDistanceInputControls({
            mandatoryDistance: 0,
            safeDistance: 0
          }, "feet");
          if (this.threatType.options.length === 1) {
            this._toggleCreateZoneButton(false);
          }
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
          renderer: this._renderer,
          publishMessage: this.publishMessage,
          nls: this.nls,
          graphics: this.ThreatArea.graphics
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
       * If checkbox is checked, clear textbox and allow user to
       * input a new layer name.
       */
      _onCheckboxClicked: function () {
        if (this.publishNewLayer.checked) {
          domClass.add(this.featureLayerList.domNode, 'controlGroupHidden');
          domClass.remove(this.addTANameArea.domNode, 'controlGroupHidden');
          this.addTANameArea.reset();
          this.addTANameArea.focus();
        } else {
          domClass.add(this.addTANameArea.domNode, 'controlGroupHidden');
          domClass.remove(this.featureLayerList.domNode, 'controlGroupHidden');
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
        var threatCatagory = this.threatCatagorySelect.get("value");
        var data = threatCatagory === "chemicalThreatCatogory" ? this._threatData : this._lpgThreatData;
        array.forEach(data, lang.hitch(this, function (item) {
          if (item.Threat === threatType) {
            if (threatCatagory === "chemicalThreatCatogory") {
              this._selectedThreat = {
                threatType: item.Threat,
                mandatoryDistance: item.Bldg_Dist,
                safeDistance: item.Outdoor_Dist,
                unitType: item.Unit
              };
            } else {
              this._selectedThreat = {
                threatType: item.Threat,
                mandatoryDistance: item.Fireball_Dia,
                safeDistance: item.Safe_Dist,
                unitType: item.Unit
              };
            }

            this._setDistanceInputControls(this._selectedThreat, this._selectedUnitType);
            //Enable create zone button
            if (this._currentGeometry) {
              this._toggleCreateZoneButton(true);
            }
          }
        }));
      },

      /**
       * Display standoff distances when a threat type is selected
       */
      _onUnitTypeSelectionChanged: function () {
        this._selectedUnitType = this.unitType.get("value");
        if (this._selectedThreat) {
          this._setDistanceInputControls(this._selectedThreat, this._selectedUnitType);
        }
      },

      /**
       * Sets the title and innerHTML for a component
       */
      _setLabelText: function (node, message) {
        array.forEach(["title", "innerHTML"], lang.hitch(this, function (attr) {
          domAttr.set(node, attr, message);
        }));
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
        this.ThreatArea.clear();
        //refresh Threat layer to make sure any labels are removed
        this.ThreatArea.refresh();
        this._toggleCreateZoneButton(false);
        this._threatLocation.clear();
        this.threatCoordinateControl.clear();
        this.selectFeaturesTool.reset();
        this._currentGeometry = null;
        this._selectedThreat = null;
        this.drawBox.clear();
        this.threatType.set("value", "");
        this._setDistanceInputControls({
          mandatoryDistance: 0,
          safeDistance: 0
        }, "feet");
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
          refDomNode: this.domNode
        }, domConstruct.create("div", {}, this.threatSettingsNode));

        //add a listener for a change in settings
        this.own(this._threatSettingsInstance.on("ThreatSettingsChanged",
          lang.hitch(this, function (updatedSettings) {
            this._createRenderer(updatedSettings);
          })));
        this._threatSettingsInstance.startup();
      },

      /**
       * This function is used to create Renderer ForChemical Threats
       */
      _createRenderer: function (updatedSettings) {
        var mandatoryFillColor =
          new Color(updatedSettings.mandatoryFillColor.color);
        var mandatoryFillTrans =
          (1 - updatedSettings.mandatoryFillColor.transparency) * 255;
        var mandatoryOutlineColor =
          new Color(updatedSettings.mandatoryOutlineColor.color);
        var mandatoryOutlineTrans =
          (1 - updatedSettings.mandatoryOutlineColor.transparency) * 255;

        var safeFillColor =
          new Color(updatedSettings.safeFillColor.color);
        var safeFillTrans =
          (1 - updatedSettings.safeFillColor.transparency) * 255;
        var safeOutlineColor =
          new Color(updatedSettings.safeOutlineColor.color);
        var safeOutlineTrans =
          (1 - updatedSettings.safeOutlineColor.transparency) * 255;

        var fireballDiaFillColor =
          new Color(updatedSettings.fireballDiaFillColor.color);
        var fireballDiaFillTrans =
          (1 - updatedSettings.fireballDiaFillColor.transparency) * 255;
        var fireballDiaOutlineColor =
          new Color(updatedSettings.fireballDiaOutlineColor.color);
        var fireballDiaOutlineTrans =
          (1 - updatedSettings.fireballDiaOutlineColor.transparency) * 255;

        var safeDistanceFillColor =
          new Color(updatedSettings.safeDistanceFillColor.color);
        var safeDistanceFillTrans =
          (1 - updatedSettings.safeDistanceFillColor.transparency) * 255;
        var safeDistanceOutlineColor =
          new Color(updatedSettings.safeDistanceOutlineColor.color);
        var safeDistanceOutlineTrans =
          (1 - updatedSettings.safeDistanceOutlineColor.transparency) * 255;

        var uvrJson = {
          "type": "uniqueValue",
          "field1": "zone_type",
          "uniqueValueInfos": [{
            "value": this.nls.mandatoryLabel,
            "symbol": {
              "color": [mandatoryFillColor.r,
                mandatoryFillColor.g,
                mandatoryFillColor.b,
                mandatoryFillTrans
              ],
              "outline": {
                "color": [mandatoryOutlineColor.r,
                  mandatoryOutlineColor.g,
                  mandatoryOutlineColor.b,
                  mandatoryOutlineTrans
                ],
                "width": 1,
                "type": "esriSLS",
                "style": updatedSettings.mandatoryOutlineColor.type
              },
              "type": "esriSFS",
              "style": updatedSettings.mandatoryFillColor.type
            }
          }, {
            "value": this.nls.safeLabel,
            "symbol": {
              "color": [safeFillColor.r, safeFillColor.g, safeFillColor.b, safeFillTrans],
              "outline": {
                "color": [safeOutlineColor.r,
                  safeOutlineColor.g,
                  safeOutlineColor.b,
                  safeOutlineTrans
                ],
                "width": 1,
                "type": "esriSLS",
                "style": updatedSettings.safeOutlineColor.type
              },
              "type": "esriSFS",
              "style": updatedSettings.safeFillColor.type
            }
          }, {
            "value": this.nls.fireBallDiameterLable,
            "symbol": {
              "color": [fireballDiaFillColor.r,
                fireballDiaFillColor.g,
                fireballDiaFillColor.b,
                fireballDiaFillTrans
              ],
              "outline": {
                "color": [fireballDiaOutlineColor.r,
                  fireballDiaOutlineColor.g,
                  fireballDiaOutlineColor.b,
                  fireballDiaOutlineTrans
                ],
                "width": 1,
                "type": "esriSLS",
                "style": updatedSettings.fireballDiaOutlineColor.type
              },
              "type": "esriSFS",
              "style": updatedSettings.fireballDiaFillColor.type
            }
          }, {
            "value": this.nls.lpgSafeDistanceLable,
            "symbol": {
              "color": [safeDistanceFillColor.r, safeDistanceFillColor.g,
                safeDistanceFillColor.b, safeDistanceFillTrans
              ],
              "outline": {
                "color": [safeDistanceOutlineColor.r,
                  safeDistanceOutlineColor.g,
                  safeDistanceOutlineColor.b,
                  safeDistanceOutlineTrans
                ],
                "width": 1,
                "type": "esriSLS",
                "style": updatedSettings.safeDistanceOutlineColor.type
              },
              "type": "esriSFS",
              "style": updatedSettings.safeDistanceFillColor.type
            }
          }]
        };
        // create a renderer for the threat analysis layer to override default symbology
        this._renderer = new UniqueValueRenderer(uvrJson);
        this.ThreatArea.setRenderer(this._renderer);
        //refresh the layer to apply the settings
        this.ThreatArea.refresh();
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
        if (!domClass.contains(this.threatCreateButton, 'jimu-state-disabled')) {
          var threatCatagory = this.threatCatagorySelect.get("value");
          //show loading indicator and project the current geometry
          this.loading.show();
          this.getProjectedGeometry(this._currentGeometry, new SpatialReference(102100)).then(
            lang.hitch(this, function (projectedGeometry) {
              //hide loading indicator and create threat areas using projected geometry
              this.loading.hide();
              this._createThreatAreas(
                projectedGeometry, this._selectedThreat, this._selectedUnitType, threatCatagory);
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
          }, function(){
            deferred.resolve(null);
          });
        }
        return deferred.promise;
      },

      /**
       * Creates the threat areas based on geometry,
       * mandatory, and safe distances
       */
      _createThreatAreas: function (geom, selectedThreat, unitType, threatCatagory) {
        if (geom && selectedThreat) {
          var features = [],
            infoTemplate = null;
          var unitMeasure = (unitType.toLowerCase() === "feet") ? this.nls.feetLabel : this.nls.metersLabel;

          //get the threat location
          var threatLocation = (geom.spatialReference.isWebMercator()) ?
            geom : WebMercatorUtils.geographicToWebMercator(geom);

          //set geodesic unit measurement number
          var geodesicNum = (unitType.toLowerCase() === "feet") ? 9002 : 9001;
          var convertedLength = (unitType.toLowerCase() === "feet") ? selectedThreat.mandatoryDistance :
            this._convertToMeters(selectedThreat.mandatoryDistance, false);
          // draw the mandatory evacuation zone
          var mandatoryGraphic = new Graphic(GeometryEngine.geodesicBuffer(threatLocation,
            convertedLength, geodesicNum));
          if (threatCatagory === "chemicalThreatCatogory") {
            mandatoryGraphic.setAttributes({
              "zone_type": this.nls.mandatoryLabel,
              "mandatory_dist": convertedLength,
              "threat_type": selectedThreat.threatType,
              "safe_dist": 0.0,
              "lpg_fireball_dia": 0.0,
              "lpg_safe_dist": 0.0,
              "units": unitMeasure
            });
            infoTemplate = new InfoTemplate();
            infoTemplate.setTitle(this.nls._widgetLabel);
            infoTemplate.setContent(
              "<b>" + this.nls.threatType + ":</b> ${threat_type}<br />" +
              "<b>" + this.nls.mandatoryLabel + ":</b> ${mandatory_dist:NumberFormat(places:2)} " +
              unitMeasure + "<br />"
            );
          } else {
            mandatoryGraphic.setAttributes({
              "zone_type": this.nls.fireBallDiameterLable,
              "lpg_fireball_dia": convertedLength,
              "threat_type": selectedThreat.threatType,
              "lpg_safe_dist": 0.0,
              "mandatory_dist": 0.0,
              "safe_dist": 0.0,
              "units": unitMeasure
            });
            infoTemplate = new InfoTemplate();
            infoTemplate.setTitle(this.nls._widgetLabel);
            infoTemplate.setContent(
              "<b>" + this.nls.threatType + ":</b> ${threat_type}<br />" +
              "<b>" + this.nls.fireBallDiameterLable + ":</b> ${lpg_fireball_dia:NumberFormat(places:2)} " +
              unitMeasure + "<br />"
            );
          }

          mandatoryGraphic.setInfoTemplate(infoTemplate);
          features.push(mandatoryGraphic);

          //Create the safe evacuation zone geometry
          convertedLength = (unitType.toLowerCase() === "feet") ? selectedThreat.safeDistance :
            this._convertToMeters(selectedThreat.safeDistance, false);
          var safeGeom = GeometryEngine.geodesicBuffer(threatLocation, convertedLength, geodesicNum);
          //Cut the mandatory distance zone from the safe evacuation geometry to create a donut
          var geoms = GeometryEngine.difference(safeGeom, mandatoryGraphic.geometry);

          // draw the safe evacutation zone
          var safeGraphic = new Graphic(geoms ? geoms : safeGeom);
          if (threatCatagory === "chemicalThreatCatogory") {
            safeGraphic.setAttributes({
              "zone_type": this.nls.safeLabel,
              "mandatory_dist": 0.0,
              "safe_dist": convertedLength,
              "threat_type": selectedThreat.threatType,
              "lpg_fireball_dia": 0.0,
              "lpg_safe_dist": 0.0,
              "units": unitMeasure
            });
            infoTemplate = new InfoTemplate();
            infoTemplate.setTitle(this.nls._widgetLabel);
            infoTemplate.setContent(
              "<b>" + this.nls.threatType + ":</b> ${threat_type}<br />" +
              "<b>" + this.nls.safeLabel + ":</b> ${safe_dist:NumberFormat(places:2)} " +
              unitMeasure + "<br />"
            );
          } else {
            safeGraphic.setAttributes({
              "zone_type": this.nls.lpgSafeDistanceLable,
              "lpg_fireball_dia": 0.0,
              "lpg_safe_dist": convertedLength,
              "threat_type": selectedThreat.threatType,
              "mandatory_dist": 0.0,
              "safe_dist": 0.0,
              "units": unitMeasure
            });
            infoTemplate = new InfoTemplate();
            infoTemplate.setTitle(this.nls._widgetLabel);
            infoTemplate.setContent(
              "<b>" + this.nls.threatType + ":</b> ${threat_type}<br />" +
              "<b>" + this.nls.lpgSafeDistanceLable + ":</b> ${lpg_safe_dist:NumberFormat(places:2)} " +
              unitMeasure + "<br />"
            );
          }

          safeGraphic.setInfoTemplate(infoTemplate);
          features.push(safeGraphic);
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
              this.ThreatArea.applyEdits(projectedThreatAreas, null, null);
              this.map.setExtent(
                this.ThreatArea.graphics[this.ThreatArea.graphics.length - 1].geometry.getExtent().expand(2));
              this._showPanel("threatResultsPage");
              if (this.isOnScreen) {
                this.resize();
              }
              this.selectFeaturesTool.reset();
            }
            this.loading.hide();
          }));
        }
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
        this._currentGeometry = graphic.geometry;
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

        if (this._selectedThreat && this._currentGeometry) {
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
      _setDistanceInputControls: function (params, unitType) {
        if (params && params.hasOwnProperty('mandatoryDistance') && params.hasOwnProperty('safeDistance')) {

          var convertedLength = (unitType.toLowerCase() === "meters") ?
            this._convertToMeters(params.mandatoryDistance, true) : this._formatNumber(params.mandatoryDistance);
          this.mandatoryDist.set('value', dojoString.substitute("${mandatoryDistance} ${unitType}", {
            mandatoryDistance: convertedLength,
            unitType: (unitType.toLowerCase() === "meters") ? this.nls.metersLabel : this.nls.feetLabel
          }));

          convertedLength = (unitType.toLowerCase() === "meters") ?
            this._convertToMeters(params.safeDistance, true) : this._formatNumber(params.safeDistance);
          this.safeDist.set('value', dojoString.substitute("${safeDistance} ${unitType}", {
            safeDistance: convertedLength,
            unitType: (unitType.toLowerCase() === "meters") ? this.nls.metersLabel : this.nls.feetLabel
          }));
        }
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
          this._threatSettingsInstance._setLastFocusNode();
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
       * This function is used to convert mandatory and safe distance to feet
       */
      _convertDistanceMetersToFeet: function (data, isChemicalThreat) {
        var threatData = [];
        array.forEach(data, lang.hitch(this, function (threatInfo) {
          if (threatInfo.Unit && threatInfo.Unit.toLowerCase() === "meters") {
            if (isChemicalThreat) {
              threatInfo.Bldg_Dist = this._convertToFeet(threatInfo.Bldg_Dist);
              threatInfo.Outdoor_Dist = this._convertToFeet(threatInfo.Outdoor_Dist);
            } else {
              threatInfo.Fireball_Dia = this._convertToFeet(threatInfo.Fireball_Dia);
              threatInfo.Safe_Dist = this._convertToFeet(threatInfo.Safe_Dist);
            }
          }
          threatData.push(threatInfo);
        }));
        return threatData;
      },

      /**
       * This function is used to listen add and remove layer evt of map
       */
      _onLayerInfosChange: function () {
        this._layerList = "";
        //Retrieve all layers from webmap
        this._layerList = this._getLayers();

        // populate the layer list
        this._populateSelectList(this.layerSelect, this._layerList, '', true);
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
        return layerList;
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
      }
    });
  });