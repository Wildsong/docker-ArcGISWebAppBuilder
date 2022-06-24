define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./newThreatType.html',
  'dojo/_base/lang',
  'jimu/dijit/Popup',
  'dojo/Evented',
  'dojo/number',
  './defaultThreatTypes',
  'dojo/on',
  'dojo/_base/array',
  'jimu/dijit/SimpleTable',
  './newZone',
  'jimu/utils',
  "jimu/dijit/Message",
  'dojo/string',
  'dojo/_base/kernel',
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
  Popup,
  Evented,
  dojoNumber,
  DefaultThreatType,
  on,
  array,
  SimpleTable,
  newZone,
  utils,
  Message,
  string,
  kernel
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-threatAnalysis-newThreatTypePopup',
    prevThreatType: null,
    selectedThreatType: null,

    constructor: function () {},

    postCreate: function () {
      if (this.currentRowData && this.currentRowData.threatType) {
        this.prevThreatType = this.currentRowData.threatType;
        this.threatTypeTextBox.set("value", this.currentRowData.threatType);
        this.threatTypeTextBox.set("title", this.currentRowData.threatType);
      }
      this.selectedUnitAbbr = (this.selectedUnitType.toLowerCase() === "feet") ? this.nls.feetAbbr :
        this.nls.metersAbbr;
      this._threatTypeTextBoxValidator();
      this._createZoneTable();
      this._populateZoneTableRows();
      this._createPopUp();
      this._handleClickEvents();
    },

    /**
     * Handle click events for different controls
     **/
    _handleClickEvents: function () {

      this.own(on(this.addZoneButton, "click", lang.hitch(this, function () {
        this._createNewZonePopup(true);
      })));

      this.own(on(this.threatTypeTextBox, "blur", lang.hitch(this, function () {
        this.threatTypeTextBox.set("value", utils.stripHTML(utils.sanitizeHTML(this.threatTypeTextBox.value)));
        this.threatTypeTextBox.set("title", utils.stripHTML(utils.sanitizeHTML(this.threatTypeTextBox.value)));
      })));

      this.own(on(this.defaultThreatTypeIcon, "click", lang.hitch(this, this._onDefaultThreatTypeIconClick)));
    },

    /**
     * Create and Show popup
     **/
    _createPopUp: function () {
      this.newThreatTypePopup = new Popup({
        "titleLabel": this.isAddThreat ? this.nls.newThreatTypePopupLabel : this.nls.editThreatLabel,
        "width": 600,
        "maxHeight": 800,
        "autoHeight": true,
        "class": this.baseClass,
        "content": this,
        "buttons": [{
          label: this.nls.ok,
          onClick: lang.hitch(this, function () {

            if (this._threatZonesTable.getRows().length === 0 || !this.threatTypeTextBox.isValid() ||
              this._isDuplicateZoneNames()) {
              new Message({
                message: this.nls.threatTypeHelp
              });
              return;
            }

            this.emit("threatInfoUpdated", {
              threatName: utils.stripHTML(utils.sanitizeHTML(this.threatTypeTextBox.value)),
              zones: this._getZoneTableInfo()
            });

            this.newThreatTypePopup.close();
          })
        }, {
          label: this.nls.cancel,
          classNames: ['jimu-btn-vacation'],
          onClick: lang.hitch(this, function () {
            this.newThreatTypePopup.close();
          })
        }]
      });
    },

    /**
     * Check for duplicate threat type
     **/
    _isDuplicateThreatTypeName: function (threatName) {
      var isDuplicateName = false;
      var existingThreats = this.existingThreatNames;
      array.some(existingThreats, lang.hitch(this, function (currentGroupName) {
        //If same threat type is found then
        //break the loop and send the flag value
        if (this._getThreatTypeNls(threatName).toLowerCase() ===
          currentGroupName.toLowerCase()) {
          isDuplicateName = true;
          return true;
        }
      }));
      return isDuplicateName;
    },

    /**
     * Create validator for threat type textbox
     **/
    _threatTypeTextBoxValidator: function () {
      //validate for empty threat type
      this.threatTypeTextBox.validator = lang.hitch(this, function (value) {
        if (!value) {
          this.threatTypeTextBox.set("invalidMessage",
            this.nls.requiredMsg);
          return false;
        }
        //validate for unique threat type
        if (value !== this.prevThreatType && this._isDuplicateThreatTypeName(value)) {
          this.threatTypeTextBox.set("invalidMessage",
            this.nls.uniqueThreatTypeMsg);
          return false;
        }
        return true;
      });
    },

    /**
     * Create zones table
     **/
    _createZoneTable: function () {
      var fields = [{
        name: 'zoneDescription',
        title: this.nls.zoneDescriptionColLabel,
        type: 'text',
        width: "40%"
      },
      {
        name: 'distance',
        title: string.substitute(this.nls.distanceLabel, {
          unitAbbr: this.selectedUnitAbbr
        }),
        type: 'text',
        width: "40%"
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
        actions: ['edit', 'delete'],
        width: "20%"
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
    _populateZoneTableRows: function () {
      if (this.currentRow && this.currentRow.hasOwnProperty('_configInfo') &&
        this.currentRow._configInfo && this.currentRow._configInfo.hasOwnProperty('zones')) {
        var sortedZoneArr = this._sortZonesInAscOrder(this.currentRow._configInfo.zones);
        array.forEach(sortedZoneArr, lang.hitch(this, function (zone) {
          this._addRowToZoneTable(zone);
        }));
      }
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
        unitAbbr: this.selectedUnitAbbr,
        existingZoneNames: this._getExistingZoneNames()
      });
      newZoneObj.startup();
      on(newZoneObj, "zoneInfoUpdated", lang.hitch(this, function (newZoneInfo) {
        var existingZonesArr = [];
        if (!tr) {
          //get existing configured zones info array and add new zone info to that array
          existingZonesArr = this._getZoneTableInfo();
          existingZonesArr.push(newZoneInfo);
        } else {
          var rowData = {};
          tr.zoneDescription = rowData.zoneDescription = newZoneInfo.name;
          tr.distance = newZoneInfo.distance;
          rowData.distance = dojoNumber.format(newZoneInfo.distance, {
            places: 2
          });
          rowData.symbol = JSON.stringify(newZoneInfo.symbol);
          tr.symbol = newZoneInfo.symbol;
          this._threatZonesTable.editRow(tr, rowData);
          //after editing row, existing configured zones info array to recreate the table
          existingZonesArr = this._getZoneTableInfo();
        }
        this._rePopulateZonesTableRow(existingZonesArr);
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
     * This function is to get existing zones name
     */
    _getExistingZoneNames: function () {
      var rows, existingZonesNames = [];
      rows = this._threatZonesTable.getRows();
      if (rows && rows.length > 0) {
        array.forEach(rows, lang.hitch(this, function (row) {
          if (row) {
            var zoneName = (kernel.locale.includes("en")) ? row.zoneDescription :
            row.innerText.split("\n")[0];
            existingZonesNames.push(zoneName);
          }
        }));
      }
      return existingZonesNames;
    },

    /**
     * This function is used to sort row in ascending order of distance
     */
    _sortZonesInAscOrder: function (zonesArray) {
      var sortedZonesArr = zonesArray.sort(function (a, b) {
        return a.distance - b.distance;
      });
      return sortedZonesArr;
    },

    /**
     * This function is used to clear new/edit threat popup content
     */
    _clearNewOrEditThreatPopupContent: function () {
      this.threatTypeTextBox.set("value", "");
      this.threatTypeTextBox.set("title", "");
      this._threatZonesTable.clear();
    },

    /**
     * This function is used to handle click of default threats icon
     */
    _onDefaultThreatTypeIconClick: function () {
      this.defaultThreatTypeObj = new DefaultThreatType({
        nls: this.nls
      });
      this.own(on(this.defaultThreatTypeObj, "selectedDefaultThreatInfo", lang.hitch(this,
        function (defaultThreatInfo) {
          //if zone table has some rows then clear content of threat popup and fill popup with new data
          if (this._threatZonesTable.getRows().length !== 0) {
            this._clearNewOrEditThreatPopupContent();
          }
          this.threatTypeTextBox.set("value", defaultThreatInfo.threatName);
          this.threatTypeTextBox.set("title", defaultThreatInfo.threatName);
          //sort zones in ascending order of distance
          var sortedZonesArr = this._sortZonesInAscOrder(defaultThreatInfo.zones);
          array.forEach(sortedZonesArr, lang.hitch(this, function (zone) {
            zone.distance = this.selectedUnitType.toLowerCase() === "feet" ? zone.distance : zone.distance * 0.3048;
            this._addRowToZoneTable(zone);
          }));
        })));
    },

    /**
     * This function is used to repopulate zone table with update zone info
     */
    _rePopulateZonesTableRow: function (zonesArr) {
      this._threatZonesTable.clear();
      var existingZonesArr = this._sortZonesInAscOrder(zonesArr);
      array.forEach(existingZonesArr, lang.hitch(this, function (newZoneInfo) {
        this._addRowToZoneTable(newZoneInfo);
      }));
    },

    /**
     * This function is used to check wether the threat has duplicate zones or not
     */
    _isDuplicateZoneNames: function () {
      var zonesArr = this._getZoneTableInfo();
      if (zonesArr.length > 0) {
        var zonesNameArr = zonesArr.map(function (zone) { return zone.name; });
        var isDuplicate = zonesNameArr.some(function (zoneName, idx) {
          return zonesNameArr.indexOf(zoneName) !== idx;
        });
        return isDuplicate;
      }
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