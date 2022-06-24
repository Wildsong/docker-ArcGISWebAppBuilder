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
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/kernel',
    'dojo/query',
    'dojo/number',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'jimu/BaseWidgetSetting',
    'jimu/LayerStructure',
    'jimu/utils',
    'dojo/on',
    'jimu/dijit/TabContainer3',
    'dojo/text!../models/ThreatTypes.json',
    'dojo/text!../models/LpgThreatTypes.json',
    'jimu/dijit/SimpleTable',
    './newThreatType',
    'dojo/dom-style',
    '../utils',
    'dojo/dom-attr',
    'jimu/dijit/Message',
    'dijit/form/Select'

  ],
  function (
    declare,
    array,
    lang,
    kernel,
    query,
    dojoNumber,
    _WidgetsInTemplateMixin,
    registry,
    BaseWidgetSetting,
    LayerStructure,
    jimuUtils,
    on,
    TabContainer3,
    threats,
    lpgThreats,
    Table,
    ThreatType,
    domStyle,
    utilsHelper,
    domAttr,
    Message

  ) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-threatAnalysis-setting',
      _SettingsInstance: null, //Object to hold Settings instance
      _currentSettings: null, //Object to hold the current settings
      _shakingElements: [], //List of DOM elements that have invalid values

      postMixInProperties: function () {
        this.nls = lang.mixin(this.nls, window.jimuNls.common, window.jimuNls.units);
      },

      postCreate: function () {
        //modify String's prototype so we can format a string using .format
        if (!String.prototype.format) {
          String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
              return typeof args[number] !== 'undefined' ? args[number] : match;
            });
          };
        }
        this.inherited(arguments);
        //For backward if config has threatAnalysis key then transform config json to new config json
        if (this.config.hasOwnProperty("threatAnalysis")) {
          this.config = utilsHelper.transformOldConfigToNewConfigJson(this.config);
        }

        if (window.isRTL && kernel.locale === "ar") {
          domStyle.set(this.helpBtn, "transform", "rotateY(180deg)");
        } else {
          domStyle.set(this.helpBtn, "transform", "");
        }
        //Retrieve threat types
        this._threatData = JSON.parse(threats);
        this._lpgThreatData = JSON.parse(lpgThreats);
        this._handleClickEvents();
        this._populateLayerSelect(this._getAllMapLayers(false), this.opLayerList, false);
        this._populateLayerSelect(this._getAllMapLayers(true), this.defaultInputLayer, true);
      },

      startup: function () {
        this.inherited(arguments);
        this._initTabs();
        this._initThreatTypeTable();
        this.setConfig(this.config);
      },

      setConfig: function (config) {
        var threatData, unitType, threatInfos;
        this.config = config;
        if (this.config.hasOwnProperty("generalSettings")) {
          if (this.config.generalSettings.operationalLayer &&
            this.config.generalSettings.operationalLayer.name !== "") {
            this.opLayerList.set("value", this.config.generalSettings.operationalLayer.name);
          } else {
            this.opLayerList.set("value", "");
          }
          if (this.config.generalSettings.unit && this.config.generalSettings.unit !== "") {
            this.unitType.set("value", this.config.generalSettings.unit, false);
          } else {
            this.unitType.set("value", "feet", false);
          }
          if (this.config.generalSettings.layerToSelectFeatures &&
            this.config.generalSettings.layerToSelectFeatures !== "") {
            this.defaultInputLayer.set("value", this.config.generalSettings.layerToSelectFeatures);
          } else {
            this.defaultInputLayer.set("value", "");
          }
          if (this.config.generalSettings.defaultInputType && this.config.generalSettings.defaultInputType !== "") {
            this.defaultInputLocation.set("value", this.config.generalSettings.defaultInputType);
          } else {
            this.defaultInputLocation.set("value", "interactive");
          }
        }
        //if config has threats then populate threat table with config threats
        //else populate table with json files
        if (this.config.hasOwnProperty("threats")) {
          threatData = this.config.threats;
        } else {
          //populate default values in threat types table
          threatData = utilsHelper.getDefaultThreats(this._threatData, this._lpgThreatData);
        }

        this._threatTypeTable.clear();
        for (var i = 0; i < threatData.length; i++) {
          threatInfos = threatData[i];
          this._populateThreatTableRow(threatInfos);
        }
        if (!unitType) {
          unitType = this.unitType.value;
        }
        this.unitMeasureLabel.innerHTML = this.nls.unitMeasureLabel.format(unitType &&
          unitType.toLowerCase() === "meters" ? this.nls.meters : this.nls.feet);
        this.defaultThreatType.set("options", this._getDefaultThreatOptions(true));
        if (this.config.generalSettings.defaultThreatType && this.config.generalSettings.defaultThreatType !== "") {
          this.defaultThreatType.set("value", this.config.generalSettings.defaultThreatType);
        } else {
          this.defaultThreatType.set("value", "");
        }
      },

      getConfig: function () {
        //if any threat has duplicate zone names then show message to user
        if (this._getThreatNamesWithDuplicateZonesName().length > 0) {
          new Message({
            message: "" + this.nls.uniqueZoneRequiredMsg + " " +
              this._getThreatNamesWithDuplicateZonesName().join(", ")
          });
          return false;
        }
        this.config.generalSettings.operationalLayer.name = this.opLayerList.value;
        this.config.generalSettings.unit = this.unitType.value;
        this.config.threats = this._getConfiguredThreats();
        this.config.generalSettings.defaultInputType = this.defaultInputLocation.value;
        this.config.generalSettings.layerToSelectFeatures = this.defaultInputLayer.value;
        this.config.generalSettings.defaultThreatType = this.defaultThreatType.value;
        return this.config;
      },

      destroy: function () {
        this.inherited(arguments);
      },

      _checkValidValues: function () {
        var nl = query(".dijitSpinner.dijitNumberTextBox.dijitValidationTextBox", this._SettingsInstance.domNode);
        return array.every(nl, function (node) {
          var n = registry.byNode(node);
          if (n) {
            if (n.value >= n.constraints.min && n.value <= n.constraints.max) {
              return true;
            }
            lang.hitch(this, this._shake(node, 16));
            return false;
          }
        }, this);
      },

      /**
       * This gets all the operational layers and places it in a custom data object.
       */
      _getAllMapLayers: function (allLayers) {
        var layerList = [];
        var layerStructure = LayerStructure.getInstance();
        //get all layers.
        layerStructure.traversal(function (layerNode) {
          //check to see if type exist and if it's not any tiles
          if (typeof (layerNode._layerInfo.layerObject.type) !== 'undefined') {
            if ((layerNode._layerInfo.layerObject.type).indexOf("tile") === -1) {
              if (layerNode._layerInfo.layerObject.geometryType === "esriGeometryPolygon" || allLayers) {
                layerList.push(layerNode._layerInfo.layerObject);
              }
            }
          }
        });
        return layerList;
      },

      /**
       * Populates the drop down list of operational layers
       * from the webmap
       */
      _populateLayerSelect: function (layerList, selectNode, doNotCheckCapabilities) {
        //Add a blank option
        var options = [{
          value: "",
          label: this.nls.selectLabel,
          selected: true
        }];
        array.forEach(layerList, lang.hitch(this, function (layer) {
          if (!doNotCheckCapabilities) {
            if (layer.url) {
              if (layer.type === "Feature Layer" && this._containsSupportedCapabilities(layer.capabilities)) {
                options.push({
                  value: layer.name,
                  label: jimuUtils.sanitizeHTML(layer.name)
                });
              }
            }
          } else {
            if (layer.type === "Feature Layer") {
              options.push({
                value: layer.name,
                label: jimuUtils.sanitizeHTML(layer.name),
                selected: false
              });
            }
          }
        }));
        selectNode.set("options", options);
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
      },

      //Source: https://stackoverflow.com/questions/36962903/javascript-shake-html-element
      _shake: function (element, magnitude) {

        //A counter to count the number of shakes
        var counter = 1;

        //The total number of shakes (there will be 1 shake per frame)
        var numberOfShakes = 15;

        //Capture the element's position and angle so you can
        //restore them after the shaking has finished
        var startX = 0,
          startY = 0;

        // Divide the magnitude into 10 units so that you can
        // reduce the amount of shake by 10 percent each frame
        var magnitudeUnit = magnitude / numberOfShakes;

        //The `randomInt` helper function
        var randomInt = function (min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        //Add the element to the `shakingElements` array if it
        //isn't already there
        if (this._shakingElements.indexOf(element) === -1) {
          //console.log("added")
          this._shakingElements.push(element);

          //Add an `updateShake` method to the element.
          //The `updateShake` method will be called each frame
          //in the game loop. The shake effect type can be either
          //up and down (x/y shaking) or angular (rotational shaking).
          var self = this;
          _upAndDownShake();
        }

        function _upAndDownShake() {
          //Shake the element while the `counter` is less than
          //the `numberOfShakes`
          if (counter < numberOfShakes) {
            //Reset the element's position at the start of each shake
            element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
            //Reduce the magnitude
            magnitude -= magnitudeUnit;
            //Randomly change the element's position
            var randomX = randomInt(-magnitude, magnitude);
            var randomY = randomInt(-magnitude, magnitude);
            element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
            //Add 1 to the counter
            counter += 1;
            requestAnimationFrame(_upAndDownShake);
          }
          //When the shaking is finished, restore the element to its original
          //position and remove it from the `shakingElements` array
          if (counter >= numberOfShakes) {
            element.style.transform = 'translate(' + startX + ', ' + startY + ')';
            self._shakingElements.splice(self._shakingElements.indexOf(element), 1);
          }
        }
      },

      _initTabs: function () {
        var threatTypeTab, MiscTab, tabs;
        threatTypeTab = {
          title: this.nls.threatTypeLabel,
          content: this.threatTypeTab
        };
        MiscTab = {
          title: this.nls.generalLabel,
          content: this.MiscTab
        };
        tabs = [threatTypeTab, MiscTab];
        this.tab = new TabContainer3({
          "tabs": tabs,
          "class": "esriCTFullHeight"
        });
        // Handle tabChanged event and set the scroll position to top
        this.own(on(this.tab, "tabChanged", lang.hitch(this, function () {
          this.tab.containerNode.scrollTop = 0;
        })));
        this.tab.placeAt(this.tabDiv);
      },

      _initThreatTypeTable: function () {
        var args = this._getTableFields(true);
        this._threatTypeTable = new Table(args);
        this._threatTypeTable.placeAt(this.threatTypesTableNode);
        this._threatTypeTable.startup();
        this.own(on(this._threatTypeTable,
          'actions-edit',
          lang.hitch(this, this._onEditThreatInfoClick)));
        this.own(on(this._threatTypeTable,
          'row-delete',
          lang.hitch(this, this._onDeleteThreatInfoClick)));
      },

      /**
       * This function is used to get threat table fields
       */
      _getTableFields: function () {
        var fields = [{
            name: 'threatType',
            title: this.nls.threatTypeLabel,
            type: 'text',
            width: "30%"
          },
          {
            name: "threatDescription",
            title: this.nls.threatDescriptionColLabel,
            type: 'text',
            width: "60%"
          },
          {
            name: 'actions',
            title: this.nls.actions,
            type: 'actions',
            'class': 'actions',
            actions: ['edit', 'delete', 'up', 'down'],
            width: "10%"
          }
        ];
        var args = {
          fields: fields,
          selectable: false
        };
        return args;
      },

      /**
       * Handle click events for different controls
       **/
      _handleClickEvents: function () {
        this.own(on(this.addThreatTypeButton, "click", lang.hitch(this, function () {
          this._createNewThreatTypePopup(true);
        })));

        this.own(on(this.unitType, "change", lang.hitch(this, function () {
          this._convertValues(this.unitType.value === "meters");
        })));
      },

      /**
       * This function is used to create new threat popup
       */
      _createNewThreatTypePopup: function (isAddThreat, tr, rowData) {
        var setCurrentThreatAsDefault = false;
        this.newThreatTypeObj = new ThreatType({
          currentRow: tr,
          currentRowData: rowData,
          isAddThreat: isAddThreat,
          nls: this.nls,
          selectedUnitType: this.unitType.value,
          existingThreatNames: this._getExistingThreatTypes()
        });
        this.newThreatTypeObj.startup();
        this.own(on(this.newThreatTypeObj, "threatInfoUpdated", lang.hitch(this, function (threatInfo) {
          if (!tr) {
            this._populateThreatTableRow(threatInfo);
            //update default threat type options in general settings
            this.defaultThreatType.addOption({
              label: this._getThreatTypeNls(threatInfo.threatName),
              value: threatInfo.threatName
            });
          } else {
            //if value before edit is selected as default then set edited value as default
            if (tr._configInfo.threatName === this.defaultThreatType.value) {
              setCurrentThreatAsDefault = true;
            }
            tr._configInfo = threatInfo;
            this._threatTypeTable.editRow(tr, {
              threatType: this._getThreatTypeNls(threatInfo.threatName),
              threatDescription: this._getThreatDescription(threatInfo)
            });
            //update default threat type options in general settings
            this.defaultThreatType.set("options", this._getDefaultThreatOptions(false));
            if (setCurrentThreatAsDefault) {
              this.defaultThreatType.set("value", threatInfo.threatName);
            }
            this._setNodeTitle(tr);
          }
        })));
      },

      /**
       * Convert values to Meters or Feet
       * @param {bool} toMeters
       */
      _convertValues: function (toMeters) {
        this.unitMeasureLabel.innerHTML = this.nls.unitMeasureLabel.format((toMeters) ? this.nls.meters :
          this.nls.feet);
        this.onUnitChange(toMeters);
      },

      /**
       * This function is used to update distance column's of table on unit change
       */
      onUnitChange: function (toMeters) {
        var trs = this._threatTypeTable.getRows();
        function convertValue(dist, isMeters) {
          return (isMeters) ? (dist) * 0.3048 : (dist) * 3.28084;
        }
        //get selected items from table
        array.forEach(trs, lang.hitch(this, function (tr) {
          array.forEach(tr._configInfo.zones, lang.hitch(this, function (zone) {
            zone.distance = convertValue(zone.distance, toMeters);
          }));
          this._threatTypeTable.editRow(tr, {
            threatDescription: this._getThreatDescription(tr._configInfo)
          });
          this._setNodeTitle(tr);
        }));
      },

      /**
       * Populates selected rows in threatTypes table
       */
      _populateThreatTableRow: function (threatInfos) {
        var result, tr;
        var row = {};
        row.threatType = this._getThreatTypeNls(threatInfos.threatName);
        row.threatDescription = this._getThreatDescription(threatInfos);
        result = this._threatTypeTable.addRow(row);
        if (result.success && result.tr) {
          tr = result.tr;
          tr._configInfo = threatInfos;
          this._setNodeTitle(tr);
        }
      },

      /**
       * This function is used to get display string of zone and distance separated by pipe symbol
       */
      _getThreatDescription: function (threatInfos) {
        var threatZoneDescription = "";
        array.forEach(threatInfos.zones, lang.hitch(this, function (zone, index) {
          threatZoneDescription = threatZoneDescription + this._getZoneNameNls(zone.name) + ": " +
            dojoNumber.format(zone.distance, { places: 2 });
          //don't add pipe after last zone
          if ((threatInfos.zones.length) - 1 !== index) {
            threatZoneDescription = threatZoneDescription + " | ";
          }
        }));
        return threatZoneDescription;
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
       * This function get Configured Threats
       */
      _getConfiguredThreats: function () {
        var selectedThreatTypeArr = [],
          trs;
        trs = this._threatTypeTable.getRows();
        //get selected items from table
        array.forEach(trs, lang.hitch(this, function (tr) {
          var threatItem = {};
          if (tr._configInfo) {
            threatItem = tr._configInfo;
            selectedThreatTypeArr.push(threatItem);
          }
        }));
        return selectedThreatTypeArr;
      },

      /**
       * This function is handle edit icon click of row
       */
      _onEditThreatInfoClick: function (tr) {
        var rowData = this._threatTypeTable.getRowData(tr);
        if (rowData) {
          this._createNewThreatTypePopup(false, tr, rowData);
        }
      },

      /**
       * This function is to get existing threat types
       */
      _getExistingThreatTypes: function () {
        var rows, threatTypes = [];
        rows = this._threatTypeTable.getRows();
        if (rows && rows.length > 0) {
          array.forEach(rows, function (row) {
            if (row._configInfo) {
              var threatType = (kernel.locale.includes("en")) ? row._configInfo.threatName :
                row.innerText.split("\n")[0];
              threatTypes.push(threatType);
            }
          });
        }
        return threatTypes;
      },

      /**
       * This function is to show next zones in new line into tooltip
       */
      _setNodeTitle: function (nd) {
        var td = query('..normal-text-div', nd)[1];
        var text = td.innerHTML.split(' | ').join('\n');
        td.title = "";
        //in some locale thousand separator or decimal is denoted by space so
        //to show actual space instead of &nbsp; in tooltip
        if (text.search("&nbsp;") !== -1) {
          text = text.split('&nbsp;').join(" ");
        }
        if (text) {
          domAttr.set(td, "title", text);
        }
      },

      /**
       * This function is used to get all threats and
       * check any threats has threat has duplicate zone names and get threat names array
       */
      _getThreatNamesWithDuplicateZonesName: function () {
        var threatWithDuplicateZonesName = [];
        var isDuplicateZoneNamesFound = false;
        var threats = this._getThreatsInfo();
        array.forEach(threats, lang.hitch(this, function (threat) {
          if (this._isDuplicateZoneNames(threat.zones)) {
            isDuplicateZoneNamesFound = true;
          }
          if (isDuplicateZoneNamesFound) {
            threatWithDuplicateZonesName.push(threat.threatName);
            isDuplicateZoneNamesFound = false;
          }
        }));
        return threatWithDuplicateZonesName;
      },

      /**
       * This function is used to check wether the threat has duplicate zones or not
       */
      _isDuplicateZoneNames: function (zonesArr) {
        if (zonesArr.length > 0) {
          var zonesNameArr = zonesArr.map(function (zone) { return zone.name; });
          var isDuplicate = zonesNameArr.some(function (zoneName, idx) {
            return zonesNameArr.indexOf(zoneName) !== idx;
          });
          return isDuplicate;
        }
      },

      /**
       * This function is used to get default threat type select options
       */
      _getDefaultThreatOptions: function (setBlankSelected) {
        var options = [{
          value: "",
          label: this.nls.selectLabel,
          selected: setBlankSelected
        }];
        var option = {};
        var configuredThreats = this._getThreatsInfo();
        array.forEach(configuredThreats, lang.hitch(this, function (threat) {
          option = {
            label: this._getThreatTypeNls(threat.threatName),
            value: threat.threatName
          };
          options.push(option);
        }));
        return options;
      },

      /**
       * This function is used to current threat info
       */
      _getThreatsInfo: function () {
        var selectedThreatTypeArr = [],
          trs;
        trs = this._threatTypeTable.getRows();
        //get selected items from table
        array.forEach(trs, lang.hitch(this, function (tr) {
          if (tr._configInfo) {
            selectedThreatTypeArr.push(tr._configInfo);
          }
        }));
        return selectedThreatTypeArr;
      },

      /**
       * This function is used to handle delete row action of threat table
       */
      _onDeleteThreatInfoClick: function (tr) {
        var rowData = this._threatTypeTable.getRowData(tr);
        if (rowData) {
          var editOption = this.defaultThreatType.getOptions(tr._configInfo.threatName);
          if (editOption) {
            this.defaultThreatType.removeOption(editOption);
          }
        }
        //if deleted threat is selected default threat type dropdown then set its value to blank
        if (tr._configInfo.threatName === this.defaultThreatType.value) {
          this.defaultThreatType.set("value", "");
        }
      }
    });
  });