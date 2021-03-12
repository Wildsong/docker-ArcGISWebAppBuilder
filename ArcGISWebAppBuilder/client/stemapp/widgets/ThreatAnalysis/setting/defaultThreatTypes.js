define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./defaultThreatTypes.html',
  'dojo/_base/lang',
  "jimu/dijit/Popup",
  'dojo/text!../models/ThreatTypes.json',
  'dojo/dom-construct',
  'dojo/_base/array',
  "dojo/dom-attr",
  'dojo/on',
  "dojo/query",
  'dojo/dom-class',
  "dojo/Evented",
  'dojo/text!../models/LpgThreatTypes.json',
  'dijit/form/ValidationTextBox',
  'jimu/dijit/formSelect'
], function (
  declare,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  lang,
  Popup,
  threats,
  domConstruct,
  array,
  domAttr,
  on,
  query,
  domClass,
  Evented,
  lpgThreats
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-threatAnalysis-defaultThreatTypePopup',
    constructor: function (options) {
      if (options) {
        lang.mixin(this, options);
      }
    },

    postCreate: function () {
      //Retrieve threat types
      this._threatData = JSON.parse(threats);
      this._lpgThreatData = JSON.parse(lpgThreats);
      this._createPopUpContent();
      this._createPopUp();
      this._eventListners();
      this.threatCatagorySelect.setValue(this.threatCatogary);
      if (!this.isAddThreat) {
        this.threatCatagorySelect.set("disabled", true);
      } else {
        this.threatCatagorySelect.set("disabled", false);
      }
    },

    _createPopUpContent: function () {
      this._createDefaultChemicalThreatContet();
      this._createDefaultLPGThreatTypeContent();
    },

    /**
     * Create and Show popup
     **/
    _createPopUp: function () {
      this.defaultThreatTypePopup = new Popup({
        "titleLabel": this.nls.defaultThreatTypePopUpLabel,
        "width": 500,
        "maxHeight": 250,
        "autoHeight": true,
        "class": this.baseClass,
        "content": this,
        "buttons": [{
          label: this.nls.ok,
          id: "okButton",
          onClick: lang.hitch(this, function () {
            var selectedThreat = query(".selectedThreat", this.defaultThreatTypePopup.domNode);
            if (selectedThreat.length > 0) {
              this.emit("selectedDefaultThreat", this._getSelectedThreatType(selectedThreat));
              this.defaultThreatTypePopup.close();
            }
          })
        }, {
          label: this.nls.cancel,
          id: "cancelButton",
          classNames: ['jimu-btn-vacation'],
          onClick: lang.hitch(this, function () {
            this.defaultThreatTypePopup.close();
          })
        }]
      });
    },

    /**
     * This function is used to add selected class to selected threat container
     */
    _addSelectedThreatClass: function (selectedThreatNode) {
      var defultThreatNodes = query(".esriCTDefaultThreats", this.defaultThreatTypePopup.domNode);
      array.forEach(defultThreatNodes, lang.hitch(this, function (node) {
        if (domClass.contains(node, "selectedThreat")) {
          domClass.remove(node, "selectedThreat");
        }
      }));
      domClass.add(selectedThreatNode, "selectedThreat");
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
     * This function is used to get threat info of selected threat
     */
    _getSelectedThreatType: function (selectedThreatNode) {
      var threatInfo;
      if (this.threatCatagorySelect.get("value") === "chemicalThreatCatogory") {
        threatInfo = {
          "Threat": domAttr.get(selectedThreatNode[0], "threatType"),
          "Bldg_Dist": domAttr.get(selectedThreatNode[0], "mandatoryDistance"),
          "Outdoor_Dist": domAttr.get(selectedThreatNode[0], "safeDistance"),
          "Unit": domAttr.get(selectedThreatNode[0], "unit"),
          "displayedValue": domAttr.get(selectedThreatNode[0], "innerHTML"),
          "threatInfoType": "chemicalThreatInfo"
        };
      } else {
        threatInfo = {
          "Threat": domAttr.get(selectedThreatNode[0], "threatType"),
          "Fireball_Dia": domAttr.get(selectedThreatNode[0], "fireBallDiameter"),
          "Safe_Dist": domAttr.get(selectedThreatNode[0], "safeDistance"),
          "Unit": domAttr.get(selectedThreatNode[0], "unit"),
          "displayedValue": domAttr.get(selectedThreatNode[0], "innerHTML"),
          "threatInfoType": "lpgThreatInfo"
        };
      }
      return threatInfo;
    },

    /**
     * This function is used to create Default Chemical Threat Contet
     */
    _createDefaultChemicalThreatContet: function () {
      array.forEach(this._threatData, lang.hitch(this, function (threatInfo) {
        var threatTypesContainer = domConstruct.create('div', {
          "class": "esriCTDefaultThreats",
          "innerHTML": this._getThreatTypeNls(threatInfo.Threat)
        }, this.defaultChemicalThreatTypeList);
        domAttr.set(threatTypesContainer, {
          threatType: threatInfo.Threat,
          mandatoryDistance: threatInfo.Bldg_Dist,
          safeDistance: threatInfo.Outdoor_Dist,
          unit: threatInfo.Unit
        });
        this.own(on(threatTypesContainer, "click", lang.hitch(this, function (evt) {
          this._addSelectedThreatClass(evt.currentTarget);
        })));
      }));
    },

    /**
     * This function is used to create Default LPGThreat Type Content
     */
    _createDefaultLPGThreatTypeContent: function () {
      array.forEach(this._lpgThreatData, lang.hitch(this, function (threatInfo) {
        var threatTypesContainer = domConstruct.create('div', {
          "class": "esriCTDefaultThreats",
          "innerHTML": this._getThreatTypeNls(threatInfo.Threat)
        }, this.defaultLPGThreatTypeList);
        domAttr.set(threatTypesContainer, {
          threatType: threatInfo.Threat,
          fireBallDiameter: threatInfo.Fireball_Dia,
          safeDistance: threatInfo.Safe_Dist,
          unit: threatInfo.Unit
        });
        this.own(on(threatTypesContainer, "click", lang.hitch(this, function (evt) {
          this._addSelectedThreatClass(evt.currentTarget);
        })));
      }));
    },

    /**
     * This function is used to add event listeners
     */
    _eventListners: function () {
      this.own(on(this.threatCatagorySelect, "change", lang.hitch(this, function (value) {
        if (value === "chemicalThreatCatogory") {
          domClass.remove(this.defaultChemicalThreatTypeList, "controlGroupHidden");
          domClass.add(this.defaultLPGThreatTypeList, "controlGroupHidden");
        } else {
          domClass.remove(this.defaultLPGThreatTypeList, "controlGroupHidden");
          domClass.add(this.defaultChemicalThreatTypeList, "controlGroupHidden");
        }
      })));
    }
  });
});