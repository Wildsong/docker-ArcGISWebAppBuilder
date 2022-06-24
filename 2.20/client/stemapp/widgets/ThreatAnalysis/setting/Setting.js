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
    'dojo/dom-construct',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'jimu/BaseWidgetSetting',
    './symbologySettings',
    'jimu/LayerStructure',
    'jimu/utils',
    'dojo/on',
    'jimu/dijit/TabContainer3',
    'dojo/text!../models/ThreatTypes.json',
    'jimu/dijit/SimpleTable',
    './newThreatType',
    'dojo/dom-style',
    'dojo/dom-class'

  ],
  function (
    declare,
    array,
    lang,
    kernel,
    query,
    dojoNumber,
    domConstruct,
    _WidgetsInTemplateMixin,
    registry,
    BaseWidgetSetting,
    symbologySettings,
    LayerStructure,
    jimuUtils,
    on,
    TabContainer3,
    threats,
    Table,
    ThreatType,
    domStyle,
    domClass
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
        if (window.isRTL && kernel.locale === "ar") {
          domStyle.set(this.helpBtn, "transform", "rotateY(180deg)");
        } else {
          domStyle.set(this.helpBtn, "transform", "");
        }
        //Retrieve threat types
        this._threatData = JSON.parse(threats);
        this._handleClickEvents();
        this._populateLayerSelect(this._getAllMapLayers(), this.opLayerList);
        this._setSelectedOption(this.opLayerList, this.config.threatAnalysis.operationalLayer.name);
      },

      startup: function () {
        this.inherited(arguments);
        if (!this.config.threatAnalysis) {
          this.config.threatAnalysis = {};
        }
        this._initTabs();
        this._initThreatTypeTable();
        this._initLPGThreatTypeTable();
        //for backward
        if (this.config.hasOwnProperty("lpgThreatTypes")) {
          domClass.remove(this.lpgthreatTypesTableNode, "controlGroupHidden");
        } else {
          domClass.add(this.lpgthreatTypesTableNode, "controlGroupHidden");
        }
        this._createSettings();
        if (this.config.threatAnalysis.operationalLayer.name === "") {
          this.opLayerList.value = '';
        }

        if (this.config.threatAnalysis.unit !== "") {
          this._setSelectedOption(this.unitType, this.config.threatAnalysis.unit);
        } else {
          this.unitType.value = '';
        }
        this.setConfig(this.config);
      },

      setConfig: function (config) {
        var threatData, unitType, lpgThreatData;
        this.config = config;
        //Note: threatTypes key of old config which belongs to threats
        //now In new config it belongs to chemical threats
        //populate configured values in threat types table
        if (this.config.hasOwnProperty("threatTypes")) {
          threatData = this.config.threatTypes;
        } else {
          //populate default values in threat types table
          threatData = this._threatData;
        }

        this._ThreatTypeTable.clear();
        for (var i = 0; i < threatData.length; i++) {
          var threatInfos = threatData[i];
          this._populateThreatTableRow(threatInfos, this._ThreatTypeTable, "mandatoryDistance", true);
          if (!unitType) {
            unitType = threatInfos.Unit;
          }
        }

        //populate configured values in LPG threat types table
        if (this.config.hasOwnProperty("lpgThreatTypes")) {
          lpgThreatData = this.config.lpgThreatTypes;
          this._lpgThreatTypeTable.clear();
          if (lpgThreatData.length > 0) {
            for (var j = 0; j < lpgThreatData.length; j++) {
              var lpgThreatInfos = lpgThreatData[j];
              this._populateThreatTableRow(lpgThreatInfos, this._lpgThreatTypeTable, "fireBallDiameter", false);
              if (!unitType) {
                unitType = lpgThreatInfos.Unit;
              }
            }
          }
        } else {
          lpgThreatData = [];
        }

        this.unitMeasureLabel.innerHTML = this.nls.unitMeasureLabel.format(unitType &&
          unitType.toLowerCase() === "meters" ? this.nls.meters : this.nls.feet);
      },

      getConfig: function () {
        if (!this._SettingsInstance.validInputs()) {
          return false;
        }
        this._SettingsInstance.onSettingsChanged();
        for (var key in this._currentSettings) {
          this.config.threatAnalysis.symbology[key] = this._currentSettings[key];
        }
        this.config.threatAnalysis.operationalLayer.name = this.opLayerList.value;
        this.config.threatAnalysis.unit = this.unitType.value;
        //Note: threatTypes key of old config which belongs to threats
        //now In new config it belongs to chemical threats
        this.config.threatTypes = this._getConfiguredThreats(this._ThreatTypeTable, "Bldg_Dist", "Outdoor_Dist", true);
        this.config.lpgThreatTypes = this._getConfiguredThreats(this._lpgThreatTypeTable,
          "Fireball_Dia", "Safe_Dist", false);
        return this.config;
      },

      destroy: function () {
        this.inherited(arguments);
      },

      /**
       * Creates settings
       **/
      _createSettings: function () {
        //Create Settings Instance
        this._SettingsInstance = new symbologySettings({
          nls: this.nls,
          config: this.config,
          appConfig: this.appConfig
        }, domConstruct.create("div", {}, this.SettingsNode));

        //add a listener for a change in settings
        this.own(this._SettingsInstance.on("settingsChanged",
          lang.hitch(this, function (updatedSettings) {
            this._currentSettings = updatedSettings;
          })
        ));
        this._SettingsInstance.startup();
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
      _getAllMapLayers: function () {
        var layerList = [];
        var layerStructure = LayerStructure.getInstance();
        //get all layers.
        layerStructure.traversal(function (layerNode) {
          //check to see if type exist and if it's not any tiles
          if (typeof (layerNode._layerInfo.layerObject.type) !== 'undefined') {
            if ((layerNode._layerInfo.layerObject.type).indexOf("tile") === -1) {
              if (layerNode._layerInfo.layerObject.geometryType === "esriGeometryPolygon") {
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
      _populateLayerSelect: function (layerList, selectNode) {
        //Add a blank option
        var blankOpt = document.createElement('option');
        blankOpt.value = "";
        blankOpt.innerHTML = "";
        blankOpt.selected = true;
        selectNode.appendChild(blankOpt);
        array.forEach(layerList, lang.hitch(this, function (layer) {
          if (layer.url) {
            if (layer.type === "Feature Layer" && this._containsSupportedCapabilities(layer.capabilities)) {
              var opt = document.createElement('option');
              opt.value = layer.name;
              opt.innerHTML = jimuUtils.sanitizeHTML(layer.name);
              opt.selected = false;
              selectNode.appendChild(opt);
            }
          }
        }));
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

      /**
       * Sets the selected option
       * in the drop-down list
       * @param {string} layerName
       */
      _setSelectedOption: function (selectNode, layerName) {
        for (var i = 0; i < selectNode.options.length; i++) {
          if (selectNode.options[i].value === layerName) {
            selectNode.selectedIndex = i;
            break;
          }
        }
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
        var threatTypeTab, symbologyTab, MiscTab, tabs;
        threatTypeTab = {
          title: this.nls.threatTypeLabel,
          content: this.threatTypeTab
        };
        symbologyTab = {
          title: this.nls.symbologyLabel,
          content: this.symbologyTab
        };
        MiscTab = {
          title: this.nls.generalLabel,
          content: this.MiscTab
        };
        tabs = [threatTypeTab, symbologyTab, MiscTab];
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
        this._ThreatTypeTable = new Table(args);
        this._ThreatTypeTable.placeAt(this.threatTypesTableNode);
        this._ThreatTypeTable.startup();
        this.own(on(this._ThreatTypeTable,
          'actions-edit',
          lang.hitch(this, this._onEditThreatInfoClick)));
      },

      /**
       * This function is used to
       */
      _getTableFields: function (isChemicalThreatsTable) {
        var fields = [{
            name: 'threatType',
            title: isChemicalThreatsTable ? this.nls.threatTypeColLabel : this.nls.lpgthreatTypeColLabel,
            type: 'text',
            width: "30%"
          },
          {
            name: isChemicalThreatsTable ? 'mandatoryDistance' : "fireBallDiameter",
            title: isChemicalThreatsTable ? this.nls.mandatoryDistance : this.nls.fireBallDiameterLable,
            type: 'text',
            width: "30%"
          },
          {
            name: 'safeDistance',
            title: isChemicalThreatsTable ? this.nls.safeDistance : this.nls.lpgSafeDistanceLable,
            type: 'text',
            width: "30%"
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

      _initLPGThreatTypeTable: function () {
        var args = this._getTableFields(false);
        this._lpgThreatTypeTable = new Table(args);
        this._lpgThreatTypeTable.placeAt(this.lpgthreatTypesTableNode);
        this._lpgThreatTypeTable.startup();
        this.own(on(this._lpgThreatTypeTable,
          'actions-edit',
          lang.hitch(this, this._onEditLPGThreatInfoClick)));
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
      _createNewThreatTypePopup: function (isAddThreat, table, tr, rowData, isChemicalThreat) {
        this.newThreatTypeObj = new ThreatType({
          table: table,
          currentRow: tr,
          currentRowData: rowData,
          isAddThreat: isAddThreat,
          isChemicalThreat: isChemicalThreat,
          nls: this.nls,
          selectedUnitType: this.unitType.value,
          existingChemicalThreatNames: this._getExistingThreatTypes(this._ThreatTypeTable),
          existingLPGThreatNames: this._getExistingThreatTypes(this._lpgThreatTypeTable)
        });
        this.newThreatTypeObj.startup();
        this.own(on(this.newThreatTypeObj, "addNewThreat", lang.hitch(this, function (newThreatInfo) {
          if (newThreatInfo.threatInfoType === "chemicalThreatInfo") {
            this._populateThreatTableRow(newThreatInfo, this._ThreatTypeTable, "mandatoryDistance", true);
          } else {
            this._populateThreatTableRow(newThreatInfo, this._lpgThreatTypeTable, "fireBallDiameter", false);
            //In case of backward lpg table is hidden initially
            //make it display on add new lpg threat
            if (domClass.contains(this.lpgthreatTypesTableNode, 'controlGroupHidden')) {
              domClass.remove(this.lpgthreatTypesTableNode, "controlGroupHidden");
            }
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

        this.onUnitChange(this._ThreatTypeTable, "mandatoryDistance", toMeters);
        this.onUnitChange(this._lpgThreatTypeTable, "fireBallDiameter", toMeters);
      },

      /**
       * This function is used to update disatnce coloumns of table on unit change
       */
      onUnitChange: function (table, prop, toMeters) {
        var trs = table.getRows();
        function convertValue(dist, isMeters) {
          var retVal = (isMeters) ? dojoNumber.parse(dist) * 0.3048 : dojoNumber.parse(dist) * 3.28084;
          return dojoNumber.format(retVal, {
            places: 2
          });
        }
        //get selected items from table
        array.forEach(trs, lang.hitch(this, function (tr) {
          var rowData = {};
          if (tr.threatType) {
            tr[prop] = rowData[prop] = convertValue(tr[prop], toMeters);
            tr.safeDistance = rowData.safeDistance = convertValue(tr.safeDistance, toMeters);
            tr.unit = this.unitType.value;
            table.editRow(tr, rowData);
          }
        }));
      },

      /**
       * Populates selected rows in threatTypes table
       */
      _populateThreatTableRow: function (threatInfos, table, prop1, isChemeicalThreat) {
        var result, tr;
        var row = {};
        row.threatType = this._getThreatTypeNls(threatInfos.Threat);
        row[prop1] = isChemeicalThreat ? dojoNumber.format(threatInfos.Bldg_Dist, {
            places: 2
          }) :
          dojoNumber.format(threatInfos.Fireball_Dia, {
            places: 2
          });
        row.safeDistance = isChemeicalThreat ? dojoNumber.format(threatInfos.Outdoor_Dist, {
            places: 2
          }) :
          dojoNumber.format(threatInfos.Safe_Dist, {
            places: 2
          });
        row.unit = threatInfos.Unit;
        result = table.addRow(row);
        if (result.success && result.tr) {
          tr = result.tr;
          tr.threatType = threatInfos.Threat;
          tr[prop1] = isChemeicalThreat ? dojoNumber.format(threatInfos.Bldg_Dist, {
              places: 2
            }) :
            dojoNumber.format(threatInfos.Fireball_Dia, {
              places: 2
            });
          tr.safeDistance = isChemeicalThreat ? dojoNumber.format(threatInfos.Outdoor_Dist, {
              places: 2
            }) :
            dojoNumber.format(threatInfos.Safe_Dist, {
              places: 2
            });
          tr.unit = threatInfos.Unit;
          //this._addThreatTypeTitle(tr, tr.threatType);
        }
      },

      /**
       * This function get Configured Threats
       */
      _getConfiguredThreats: function (table, prop1, prop2, isChemicalThreat) {
        var selectedthreatTypeArr = [],
          trs;
        trs = table.getRows();
        //get selected items from table
        array.forEach(trs, lang.hitch(this, function (tr) {
          var threatItem = {};
          if (tr.threatType) {
            threatItem.Threat = tr.threatType;
            threatItem[prop1] = isChemicalThreat ? dojoNumber.parse(tr.mandatoryDistance, {
                places: 2
              }) :
              dojoNumber.parse(tr.fireBallDiameter, {
                places: 2
              });
            threatItem[prop2] = dojoNumber.parse(tr.safeDistance, {
              places: 2
            });
            threatItem.Unit = tr.unit;
            selectedthreatTypeArr.push(threatItem);
          }
        }));
        return selectedthreatTypeArr;
      },

      /**
       * This function is to set threatType in the table row
       */
      _addThreatTypeTitle: function (row, threatType) {
        var td, normalTextDiv;
        // Set threat type label
        td = query('.simple-table-cell', row)[0];
        if (td) {
          normalTextDiv = query('div', td)[0];
          normalTextDiv.innerHTML = threatType;
          normalTextDiv.title = threatType;
        }
      },

      _onEditThreatInfoClick: function (tr) {
        var rowData = this._ThreatTypeTable.getRowData(tr);
        if (rowData) {
          this._createNewThreatTypePopup(false, this._ThreatTypeTable, tr, rowData, true);
        }
      },

      /**
       * This function is to get existing threat types
       */
      _getExistingThreatTypes: function (table) {
        var rows, threatTypes = [];
        if (table) {
          rows = table.getRows();
          if (rows && rows.length > 0) {
            array.forEach(rows, function (row) {
              if (row.threatType) {
                var threatType = (kernel.locale.includes("en")) ? row.threatType : row.innerText.split("\n")[0];
                threatTypes.push(threatType);
              }
            });
          }
        }
        return threatTypes;
      },

      _onEditLPGThreatInfoClick: function (tr) {
        var rowData = this._lpgThreatTypeTable.getRowData(tr);
        if (rowData) {
          this._createNewThreatTypePopup(false, this._lpgThreatTypeTable, tr, rowData, false);
        }
      }
    });
  });