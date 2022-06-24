define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./defaultThreatTypes.html',
  'dojo/_base/lang',
  "jimu/dijit/Popup",
  'dojo/text!../models/ThreatTypes.json',
  'dojo/text!../models/LpgThreatTypes.json',
  'dojo/_base/array',
  "dojo/Evented",
  "dijit/form/Select",
  '../utils',
  'dojo/on',
  'dojo/dom-class',
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
  lpgThreats,
  array,
  Evented,
  Select,
  utilsHelper,
  on,
  domClass
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
      this.defaultThreats = utilsHelper.getDefaultThreats(this._threatData, this._lpgThreatData);
      this.defaultThreatsDropdown = new Select({
        style: "width: 99%",
        "class": "esriCTDefaultThreatsDropdown",
        options: this._getOptions()
      });
      this.defaultThreatsDropdown.placeAt(this.defaultThreatsDropdownNode);
      if (this.defaultThreatsDropdown.dropDown) {
        //Add base class to the parent node
        domClass.add(this.defaultThreatsDropdown.dropDown.domNode, this.baseClass);
        //Add custom class to the container node
        domClass.add(this.defaultThreatsDropdown.dropDown.containerNode, "esriCTCustomOptions");
      }
      this.own(on(this.defaultThreatsDropdown, "change", lang.hitch(this, function () {
        //if default threat type is not blank then enable popup ok button
        if (this.defaultThreatsDropdown.get("value") !== "") {
          this.defaultThreatTypePopup.enableButton(0);
        } else {
          this.defaultThreatTypePopup.disableButton(0);
        }
      })));
      this.defaultThreatsDropdown.startup();
      this._createPopUp();
    },
    /**
     * This function is used to get options of default Threats Dropdown
     */
    _getOptions: function () {
      var options = [];
      options.push({ label: "", value: "", disabled: true });
      options.push({
        label: "<b><i>" + this.nls.chemicalThreatLegendLabel + "<i></b>", value: "Chemical", disabled: true
      });
      array.forEach(this._threatData, lang.hitch(this, function (currentThreat) {
        options.push({ label: this._getThreatTypeNls(currentThreat.Threat), value: currentThreat.Threat });
      }));
      options.push({ label: "<b><i>" + this.nls.lpgThreatLegendLabel + "<i></b>", value: "Lpg", disabled: true });
      array.forEach(this._lpgThreatData, lang.hitch(this, function (currentLpgThreat) {
        options.push({ label: this._getThreatTypeNls(currentLpgThreat.Threat), value: currentLpgThreat.Threat });
      }));
      return options;
    },

    /**
     * This function is used to get selected threat zone info
     */
    _getSelectedThreatZoneInfo: function () {
      var selectedThreatZoneInfo;
      array.some(this.defaultThreats, function (threat) {
        if (this.defaultThreatsDropdown.get("value") === threat.threatName) {
          selectedThreatZoneInfo = threat.zones;
          return true;
        }
      }, this);
      return selectedThreatZoneInfo;
    },

    /**
     * Create and Show popup
     **/
    _createPopUp: function () {
      this.defaultThreatTypePopup = new Popup({
        "titleLabel": this.nls.defaultThreatTypePopUpLabel,
        "width": 500,
        "maxHeight": 70,
        "autoHeight": true,
        "class": this.baseClass,
        "content": this,
        "buttons": [{
          label: this.nls.ok,
          id: "okButton",
          onClick: lang.hitch(this, function () {
            if (this.defaultThreatsDropdown.get("value") !== "") {
              this.emit("selectedDefaultThreatInfo", {
                threatName: this.defaultThreatsDropdown.getOptions(this.defaultThreatsDropdown.value).label,
                zones: this._getSelectedThreatZoneInfo()
              });
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
      //Disable the ok button as soon as the popup is shown
      this.defaultThreatTypePopup.disableButton(0);
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