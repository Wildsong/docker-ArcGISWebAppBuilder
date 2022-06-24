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
  array
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-threatAnalysis-newThreatTypePopup',
    prevThreatType: null,
    selectedThreatType: null,

    constructor: function () {},

    postCreate: function () {
      if (this.table && this.currentRowData.threatType) {
        this.prevThreatType = this.currentRowData.threatType;
        this.threatTypeTextBox.set("value", this.currentRowData.threatType);
        this.mandatoryEvacuationDistance.set("value", (this.isChemicalThreat) ? this.currentRowData.mandatoryDistance :
          this.currentRowData.fireBallDiameter);
        this.safeEvacuationDistance.set("value", this.currentRowData.safeDistance);
      }
      //popup is opene by clicking edit row then setvalue of threatCatagorySelect
      //dropdown value according to rows threat catagory
      if (!this.isAddThreat) {
        if (this.isChemicalThreat) {
          this.threatCatagorySelect.setValue("chemicalThreatCatogory");
        } else {
          this.threatCatagorySelect.setValue("lpgThreatCatogary");
        }
      }
      if (!this.isAddThreat) {
        this.threatCatagorySelect.set("disabled", true);
      } else {
        this.threatCatagorySelect.set("disabled", false);
      }
      this.unitType.set("value", (this.selectedUnitType.toLowerCase() === "feet") ? this.nls.feet : this.nls.meters);
      this._threatTypeTextBoxValidator();
      this._createPopUp();
      this._handleClickEvents();
    },

    /**
     * Handle click events for different controls
     **/
    _handleClickEvents: function () {

      this.own(on(this.defaultThreatTypeIcon, "click", lang.hitch(this, function () {
        this.defaultThreatTypeObj = new DefaultThreatType({
          nls: this.nls,
          unitType: this.selectedUnitType,
          threatCatogary: this.threatCatagorySelect.get("value"),
          isAddThreat: this.isAddThreat
        });
        this.own(on(this.defaultThreatTypeObj, "selectedDefaultThreat", lang.hitch(this, function (defaultThreatInfo) {
          var distVal, selectedThreatCatagory;
          var prop1 = defaultThreatInfo.threatInfoType === "chemicalThreatInfo" ? defaultThreatInfo.Bldg_Dist :
            defaultThreatInfo.Fireball_Dia;
          var prop2 = defaultThreatInfo.threatInfoType === "chemicalThreatInfo" ? defaultThreatInfo.Outdoor_Dist :
            defaultThreatInfo.Safe_Dist;

          this.threatTypeTextBox.set("value", defaultThreatInfo.displayedValue /*defaultThreatInfo.Threat*/ );
          distVal = (defaultThreatInfo.Unit.toLowerCase() === this.selectedUnitType.toLowerCase()) ?
            prop1 : prop1 * 0.3048;
          this.mandatoryEvacuationDistance.set("value", dojoNumber.format(distVal, {
            places: 2
          }));
          distVal = (defaultThreatInfo.Unit.toLowerCase() === this.selectedUnitType.toLowerCase()) ?
            prop2 : prop2 * 0.3048;
          this.safeEvacuationDistance.set("value", dojoNumber.format(distVal, {
            places: 2
          }));
          this.selectedThreatType = defaultThreatInfo.Threat;
          selectedThreatCatagory = (defaultThreatInfo.threatInfoType === "chemicalThreatInfo") ?
            "chemicalThreatCatogory" : "lpgThreatCatogary";
          this.threatCatagorySelect.setValue(selectedThreatCatagory);

          // this.unitType.set("value", this.unitType.value);
        })));
      })));

      this.own(on(this.threatCatagorySelect, "change", lang.hitch(this, function (value) {
        if (value === "chemicalThreatCatogory") {
          this.mandatoryDistanceLabelNode.innerHTML = this.nls.mandatoryDistance;
          this.safeDistanceLabelNode.innerHTML = this.nls.safeDistance;
        } else {
          this.mandatoryDistanceLabelNode.innerHTML = this.nls.fireBallDiameterLable;
          this.safeDistanceLabelNode.innerHTML = this.nls.lpgSafeDistanceLable;
        }
      })));
    },

    /**
     * Create and Show popup
     **/
    _createPopUp: function () {
      this.newThreatTypePopup = new Popup({
        "titleLabel": this.isAddThreat ? this.nls.newThreatTypePopupLabel : this.nls.editThreatLabel,
        "width": 600,
        "maxHeight": 300,
        "autoHeight": true,
        "class": this.baseClass,
        "content": this,
        "buttons": [{
          label: this.nls.ok,
          onClick: lang.hitch(this, function () {

            //validate
            if (!this.threatTypeTextBox.isValid()) {
              this.threatTypeTextBox.focus();
              return;
            }
            if (!this.mandatoryEvacuationDistance.isValid()) {
              this.mandatoryEvacuationDistance.focus();
              return;
            }
            if (!this.safeEvacuationDistance.isValid()) {
              this.safeEvacuationDistance.focus();
              return;
            }
            if (this.currentRow && this.table) {
              var rowData = {};
              rowData.threatType = this.threatTypeTextBox.value;
              var prop = this.isChemicalThreat ? "mandatoryDistance" : "fireBallDiameter"; //uncommon field
              rowData[prop] = dojoNumber.format(this.mandatoryEvacuationDistance.get("value"), {
                places: 2
              });
              rowData.safeDistance = dojoNumber.format(this.safeEvacuationDistance.get("value"), {
                places: 2
              });
              rowData.unit = this.unitType.value;

              this.currentRow.threatType = this.threatTypeTextBox.value;
              this.currentRow[prop] = dojoNumber.format(this.mandatoryEvacuationDistance.get("value"), {
                places: 2
              });
              this.currentRow.safeDistance = dojoNumber.format(this.safeEvacuationDistance.get("value"), {
                places: 2
              });
              this.currentRow.unit = this.selectedUnitType;
              this.table.editRow(this.currentRow, rowData);
            } else {
              if (this.threatCatagorySelect.get("value") === "chemicalThreatCatogory") {
                this.emit("addNewThreat", {
                  Threat: this.threatTypeTextBox.value,
                  Bldg_Dist: this.mandatoryEvacuationDistance.get("value"),
                  Outdoor_Dist: this.safeEvacuationDistance.get("value"),
                  Unit: this.selectedUnitType,
                  threatInfoType: "chemicalThreatInfo"
                });
              } else {
                this.emit("addNewThreat", {
                  Threat: this.threatTypeTextBox.value,
                  Fireball_Dia: this.mandatoryEvacuationDistance.get("value"),
                  Safe_Dist: this.safeEvacuationDistance.get("value"),
                  Unit: this.selectedUnitType,
                  threatInfoType: "lpgThreatInfo"
                });
              }
            }
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
      var existingThreats = this.threatCatagorySelect.get("value") === "chemicalThreatCatogory" ?
        this.existingChemicalThreatNames : this.existingLPGThreatNames;
      array.some(existingThreats, lang.hitch(this, function (currentGroupName) {
        //If same threat type is found then
        //break the loop and send the flag value
        if (threatName.toLowerCase() === currentGroupName.toLowerCase()) {
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
            this.nls.requiredThreatTypeMsg);
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
    }
  });
});