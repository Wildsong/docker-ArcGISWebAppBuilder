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
  'dojo/_base/array',
  './ColorPickerEditor',
  'jimu/BaseWidget',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./newZone.html',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/dom-class',
  'dojo/query',
  'dijit/registry',
  'jimu/dijit/Popup',
  'jimu/utils',
  'dojo/string',
  'dojo/on',
  'dijit/form/NumberTextBox',
  'dijit/form/ValidationTextBox',
  'dijit/form/Select',
  'jimu/dijit/SymbolChooser'
],
function (
  declare,
  array,
  ColorPickerEditor,
  BaseWidget,
  _WidgetsInTemplateMixin,
  SettingsTemplate,
  lang,
  Evented,
  domClass,
  query,
  dijitRegistry,
  Popup,
  utils,
  string,
  on
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
    baseClass: 'jimu-widget-threatAnalysis-newZoneSettings',
    templateString: SettingsTemplate,
    selectedSettings: {}, //Holds selected Settings
    colorPickerNodes: [], //Holds an array of color pickers populated at start up
    dropdownNodes: [], //Holds an array of dropdowns populated at start up
    prevZoneName: null,
    newZonePopup: null,

    constructor: function (options) {
      lang.mixin(this, options);
    },

    //Load all the options on startup
    startup: function () {
      this._setSymbologySettings();
    },

    postCreate: function () {
      this.inherited(arguments);
      this.prevZoneName = null;
      this.newZonePopup = null;

      if (this.currentRowData && this.currentRowData.zoneDescription) {
        this.zoneDescriptionTextBox.set("value", this.currentRowData.zoneDescription);
        this.zoneDescriptionTextBox.set("title", this.currentRowData.zoneDescription);
        this.prevZoneName = this.currentRowData.zoneDescription;
      }

      this._zoneDescriptionTextBoxValidator();
      if (this.currentRowData && this.currentRowData.distance) {
        this.zoneDistanceTextBox.set("value", this.currentRowData.distance);
        this.zoneDistanceTextBox.set("title", this.currentRowData.distance);
      }
      this.zoneDistanceLabel.innerHTML = string.substitute(this.nls.distanceLabel, {
        unitAbbr: this.unitAbbr
      });

      this.own(on(this.zoneDescriptionTextBox, "blur", lang.hitch(this, function () {
        this.zoneDescriptionTextBox.set("value",
          utils.stripHTML(utils.sanitizeHTML(this.zoneDescriptionTextBox.value)));
        this.zoneDescriptionTextBox.set("title",
          utils.stripHTML(utils.sanitizeHTML(this.zoneDescriptionTextBox.value)));
      })));

      this.own(on(this.zoneDescriptionTextBox, "change", lang.hitch(this, function (value) {
        this.zoneDescriptionTextBox.set("title", value);
      })));

      this.own(on(this.zoneDistanceTextBox, "change", lang.hitch(this, function () {
        if (!(isNaN(this.zoneDistanceTextBox.value))) {
          this.zoneDistanceTextBox.set("title", this.zoneDistanceTextBox.value);
        } else {
          this.zoneDistanceTextBox.set("title", "");
        }
      })));

      this._createPopUp();
    },

    /**
     * Create new/edit zone popup
     **/
    _createPopUp: function () {
      this.newZonePopup = new Popup({
        "titleLabel": this.isAddZone ? this.nls.newThreatZonePopupLabel : this.nls.editThreatZonePopupLabel,
        "width": 700,
        "maxHeight": 800,
        "autoHeight": true,
        "class": this.baseClass,
        "content": this,
        "buttons": [{
          label: this.nls.ok,
          onClick: lang.hitch(this, function () {

            if (!this.zoneDescriptionTextBox.isValid()) {
              this.zoneDescriptionTextBox.focus();
              return;
            }
            if (!this.zoneDistanceTextBox.isValid()) {
              this.zoneDistanceTextBox.focus();
              return;
            }
            //validate for any invalid values in all colorPicker spinners
            if (!this._validInputs()) {
              return;
            }
            this.emit("zoneInfoUpdated", {
              name: utils.stripHTML(utils.sanitizeHTML(this.zoneDescriptionTextBox.value)),
              distance: this.zoneDistanceTextBox.get("value"),
              symbol: this._getSymbologySettings()
            });
            this.newZonePopup.close();
          })
        }, {
          label: this.nls.cancel,
          classNames: ['jimu-btn-vacation'],
          onClick: lang.hitch(this, function () {
            this.newZonePopup.close();
          })
        }]
      });
    },

    /**
     * set symbology from default or from config
     **/
    _setSymbologySettings: function () {
      var defaultSymbology = {
        "outlineColor": {
          "color": "#d10e40",
          "transparency": 0,
          "type": "esriSLSSolid"
        },
        "fillColor": {
          "color": "#d10e40",
          "transparency": 0.88,
          "type": "esriSFSSolid"
        }
      };
      this.colorPickerNodes = query('.colorPicker', this.domNode);

      this.dropdownNodes = query('.dropdown', this.domNode);

      array.forEach(this.colorPickerNodes, lang.hitch(this, function (node) {
        node = new ColorPickerEditor({
          nls: this.nls,
          type: domClass.contains(node, 'Line') ? 'line' : 'fill'
        }, node);

        node.setValues({
          "color": this.currentRow && this.currentRow.symbol ?
            this.currentRow.symbol[node.id].color : defaultSymbology[node.id].color,
          "transparency": this.currentRow && this.currentRow.symbol ?
            this.currentRow.symbol[node.id].transparency : defaultSymbology[node.id].transparency
        });
        node.startup();
        var selectedStyle = this.currentRow && this.currentRow.symbol ?
          this.currentRow.symbol[node.id].type : defaultSymbology[node.id].type;
        node.dropdown.set('value', selectedStyle);
      }));
    },

    /**
     * Get configured symbology
     **/
    _getSymbologySettings: function () {
      array.forEach(this.colorPickerNodes, lang.hitch(this, function (node) {
        var json = {
          'color': dijitRegistry.byId(node.id).getValues().color,
          'transparency': dijitRegistry.byId(node.id).getValues().transparency,
          'type': dijitRegistry.byId(node.id).dropdown.getValue()
        };
        this.selectedSettings[node.id] = json;
      }));
      return this.selectedSettings;
    },

    /**
     * Check for duplicate threat type
     **/
    _isDuplicateZoneName: function (threatName) {
      var isDuplicateName = false;
      var existingZones = this.existingZoneNames;
      array.some(existingZones, lang.hitch(this, function (currentZoneName) {
        //If same Zone name is found then
        //break the loop and send the flag value
        if (threatName.toLowerCase() === currentZoneName.toLowerCase()) {
          isDuplicateName = true;
          return true;
        }
      }));
      return isDuplicateName;
    },

    /**
     * Create validator for zone description text box
     **/
    _zoneDescriptionTextBoxValidator: function () {
      //validate for empty threat zone
      this.zoneDescriptionTextBox.validator = lang.hitch(this, function (value) {
        if (!value) {
          this.zoneDescriptionTextBox.set("invalidMessage",
            this.nls.requiredMsg);
          return false;
        }
        //validate for unique threat zone
        if (value !== this.prevZoneName && this._isDuplicateZoneName(value)) {
          this.zoneDescriptionTextBox.set("invalidMessage",
            this.nls.uniqueZoneDescriptionMsg);
          return false;
        }
        return true;
      });
    },

    /**
     * validate for any invalid values in all colorPicker spinners
     **/
    _validInputs: function () {
      var isValid = true;
      array.some(this.colorPickerNodes, function (node) {
        if (!dijitRegistry.byId(node.id).validateSpinner()) {
          isValid = false;
          return true;
        }
      }, this);
      return isValid;
    }
  });
});