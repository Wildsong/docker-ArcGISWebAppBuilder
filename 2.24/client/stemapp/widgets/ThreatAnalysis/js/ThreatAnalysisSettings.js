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
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!../templates/ThreatAnalysisSettings.html',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/number',
  'dojo/on',
  'dojo/_base/array',
  'jimu/dijit/SimpleTable',
  '../newZone',
  'jimu/utils',
  'dijit/focus',
  'dojo/keys',
  'dijit/form/ValidationTextBox',
  'dijit/form/TextBox',
  "dijit/form/Select"
], function (
  declare,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  lang,
  Evented,
  dojoNumber,
  on,
  array,
  SimpleTable,
  newZone,
  jimuUtils,
  focusUtils
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-threatAnalysis',
    prevThreatType: null,
    selectedThreatType: null,
    selectedUnitAbbr: null,

    constructor: function () {},

    postCreate: function () {
      this._initThreatTypeCtrl(this.threatData);
      this.selectedUnitAbbr = (this.selectedUnitType.toLowerCase() === "feet") ? this.nls.feetAbbr :
      this.nls.metersAbbr;
      this._createZoneTable();
      this._handleClickEvents();
    },

    /**
     * Handle click events for different controls
     **/
    _handleClickEvents: function () {

      this.own(on(this.threatType, "change", lang.hitch(this, function (value) {
        this.threatType.set("title", value);
        this._threatZonesTable.clear();
        this._populateZoneTableRows(value);
      })));
    },

    /**
     * Create zones table
     **/
    _createZoneTable: function () {
      var fields = [{
        name: 'zoneDescription',
        title: this.nls.zoneDescriptionColLabel,
        type: 'text',
        width: "70%"
      },
      {
        name: 'distance',
        title: this.nls.distanceColLabel,
        type: 'text',
        hidden: true
      },
      {
        name: 'symbol',
        title: this.nls.symbologyColLabel,
        type: 'text',
        hidden: true
      },
      {
        name: 'actions',
        title: this.nls.actions,
        type: 'actions',
        'class': 'actions',
        actions: ['edit'],
        width: "30%"
      }
      ];

      var args = {
        fields: fields,
        selectable: false
      };

      this._threatZonesTable = new SimpleTable(args);
      this._threatZonesTable.placeAt(this.threatZonesTableNode);
      this._threatZonesTable.startup();

      this.own(on(this._threatZonesTable,
        'actions-edit',
        lang.hitch(this, this._onEditZoneInfoClick)));
    },

    /**
     * This function is used to retrieve and pass zones info
     */
    _populateZoneTableRows: function (selectedThreatType) {
      array.some(this.threatData, lang.hitch(this, function (threat) {
        if (selectedThreatType === threat.threatName) {
          array.forEach(threat.zones, lang.hitch(this, function (zone) {
            this._addRowToZoneTable(zone);
          }));
        }
      }));
    },

    /**
     * This function is used to add row of zone info into zone infos table
     */
    _addRowToZoneTable: function (zone) {
      var result, tr;
      var zoneDistance = zone.distance;
      var row = {
        zoneDescription: this._getZoneNameNls(zone.name),
        distance: dojoNumber.format(zoneDistance, {
          places: 2
        }),
        symbol: JSON.stringify(zone.symbol)
      };
      result = this._threatZonesTable.addRow(row);
      if (result.success && result.tr) {
        tr = result.tr;
        tr.zoneDescription = zone.name;
        tr.distance = zoneDistance;
        tr.symbol = zone.symbol;
      }
    },

    /**
     * This function is used to configured zones info
     */
    _getZoneTableInfo: function () {
      var zoneInfoArr = [], trs;
      trs = this._threatZonesTable.getRows();
      array.forEach(trs, lang.hitch(this, function (tr) {
        var data = this._threatZonesTable.getRowData(tr);
        var zoneItem = {
          name: "",
          distance: 0,
          symbol: {}
        };
        zoneItem.name = tr.zoneDescription;
        zoneItem.distance = tr.distance;
        zoneItem.symbol = JSON.parse(data.symbol);
        zoneInfoArr.push(zoneItem);
      }));
      return zoneInfoArr;
    },

    /**
     * This function is used to create new/edit threat zone popup
     */
    _createNewZonePopup: function (isAddZone, tr, rowData) {
      var newZoneObj = new newZone({
        config: this.config,
        nls: this.nls,
        isAddZone: isAddZone,
        currentRow: tr,
        currentRowData: rowData,
        disableInputs: true,
        unitAbbr: this.selectedUnitAbbr
      });
      newZoneObj.startup();
      on(newZoneObj, "zoneInfoUpdated", lang.hitch(this, function (newZoneInfo) {
        if (tr) {
          var rowData = {};
          rowData.symbol = JSON.stringify(newZoneInfo.symbol);
          tr.symbol = {};
          tr.symbol = newZoneInfo.symbol;
          this._threatZonesTable.editRow(tr, rowData);
          this._updateOriginalSymbolInfo();
          setTimeout(lang.hitch(this, function () {
            focusUtils.focus(jimuUtils.getFirstFocusNode(this.refDomNode));
          }), 100);
          this.emit("ThreatSettingsChanged", {
            threatName: this.threatType.value,
            zones: this._getZoneTableInfo()
          });
        }
      }));
      on(newZoneObj, "cancelBtnClicked", lang.hitch(this, function () {
        setTimeout(lang.hitch(this, function () {
          focusUtils.focus(jimuUtils.getFirstFocusNode(this.refDomNode));
        }), 100);
      }));
    },

    /**
     * This function is used to store changed symbology in original threat data array
     */
    _updateOriginalSymbolInfo: function () {
      array.some(this.threatData, lang.hitch(this, function (threat) {
        if (this.threatType.value === threat.threatName) {
          threat.zones = this._getZoneTableInfo();
          this._threatZonesTable.clear();
          array.forEach(threat.zones, lang.hitch(this, function (zone) {
            this._addRowToZoneTable(zone);
          }));
        }
      }));
    },

    /**
     * This function is used to handle edit icon click of row
     */
    _onEditZoneInfoClick: function (tr) {
      var rowData = this._threatZonesTable.getRowData(tr);
      if (rowData) {
        this._createNewZonePopup(false, tr, rowData);
      }
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
        label: this.nls.selectLabel,
        defaultSelected: true,
        selected: true,
        unit: ""
      });
      array.forEach(data, function (item) {
        this.threatType.addOption({
          value: item.threatName,
          label: jimuUtils.sanitizeHTML(getThreatTypeLabel(item.threatName)),
          defaultSelected: false,
          selected: false
        });
      }, self);
    },

    /**
     * function to set last focus node
     */
    _setLastFocusNode: function () {
      jimuUtils.initLastFocusNode(this.refDomNode, this.threatType.domNode);
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
    }
  });
});