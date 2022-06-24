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
    'dojo/_base/html',
    'dojo/on',
    './ColorPickerEditor',
    'jimu/BaseWidget',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!../templates/symbologySettings.html',
    'dojo/_base/lang',
    'dojo/Evented',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/query',
    'dojo/keys',
    'dojo/dom',
    'dijit/registry',
    'jimu/utils',
    'dijit/focus',
    'jimu/dijit/formSelect',
    'jimu/dijit/SymbolChooser'
  ],
  function (
    declare,
    array,
    html,
    on,
    ColorPickerEditor,
    BaseWidget,
    _WidgetsInTemplateMixin,
    SettingsTemplate,
    lang,
    Evented,
    domClass,
    domAttr,
    query,
    keys,
    dom,
    dijitRegistry,
    utils,
    focusUtils
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-visibility-symbologySettings',
      templateString: SettingsTemplate,
      selectedSettings: {}, //Holds selected Settings
      colorPickerNodes: [], //Holds an array of color pickers populated at start up

      constructor: function (options) {
        lang.mixin(this, options);
      },

      //Load all the options on startup
      startup: function () {
        if (!this.config.hasOwnProperty("symbology")) {
          //for backword compatibility
          var symbologySettings = {
            "visibleSectionOutlineColor": {
              "color": "#000000",
              "transparency": 1,
              "type": "esriSLSSolid"
            },
            "visibleSectionFillColor": {
              "color": "#00ff00",
              "transparency": 0.5,
              "type": "esriSFSSolid"
            },
            "nonVisibleSectionOutlineColor": {
              "color": "#000000",
              "transparency": 1,
              "type": "esriSLSSolid"
            },
            "nonVisibleSectionFillColor": {
              "color": "#ff0000",
              "transparency": 0.5,
              "type": "esriSFSSolid"
            }
          };
        }
        this.colorPickerNodes = query('.colorPicker', this.domNode);
        array.forEach(this.colorPickerNodes, lang.hitch(this, function (node) {
          node = new ColorPickerEditor({
            nls: this.nls,
            type: domClass.contains(node, 'Line') ? 'line' : 'fill'
          }, node);
          node.setValues({
            "color": symbologySettings ? symbologySettings[node.id].color : this.config.symbology[node.id].color,
            "transparency": symbologySettings ?
              symbologySettings[node.id].transparency : this.config.symbology[node.id].transparency
          });
          node.startup();
          var styleDropdownValue = symbologySettings ?
            symbologySettings[node.id].type : this.config.symbology[node.id].type;
          node.dropdown.set('value', styleDropdownValue);
        }));
        // Code for Accessibility: keydown for color picker
        var colorPickerDOMNodes = query('.jimu-color-pickerPopup', this.domNode);
        array.forEach(colorPickerDOMNodes, lang.hitch(this, function (node) {
          this.own(on(node, 'keydown', lang.hitch(this, function (event) {
            if (event.keyCode === keys.ENTER || event.keyCode === keys.SPACE) {
              event.currentTarget.click();
            }
          })));
        }));

        //send by default updated parameters
        this.onSettingsChanged();
      },

      postCreate: function () {
        this.inherited(arguments);
        //set class to main container
        this._handleClickEvents();
        this.visibleSectionSettingsButton.click();
      },

      /**
       * Handle click events for different controls
       * @memberOf widgets/visibility/Widget
       **/
      _handleClickEvents: function () {
        //handle spill location button clicked
        this.own(on(this.visibleSectionSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.visibleSectionSettingsButton, this.visibleSectionContainer);
        })));

        //handle Initial Isolation Zone button clicked
        this.own(on(this.nonVisibleSectionSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.nonVisibleSectionSettingsButton, this.nonVisibleSectionContainer);
        })));

        /* For Accessibility */
        //handle spill location button keydown for accessibility
        this.own(on(this.visibleSectionSettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.visibleSectionSettingsButton, this.visibleSectionContainer);
          }
        })));
        //handle Initial Isolation Zone button keydown for accessibility
        this.own(on(this.nonVisibleSectionSettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.nonVisibleSectionSettingsButton, this.nonVisibleSectionContainer);
          }
        })));
      },

      _openCloseNodes: function (node, container) {
        var containers = query('.container', this.domNode);
        var buttons = query('.esriCTSettingsButtonIcon', this.domNode);
        var nodeOpen = false;

        //open or close nodes only when all values enterd are valid
        if (!this.validInputs()) {
          return;
        }

        if (node) {
          if (domClass.contains(node, 'esriCTLabelSettingsRightButton')) {
            nodeOpen = true;
          }
        }
        //close all dropdowns
        array.forEach(containers, lang.hitch(this, function (otherContainer) {
          html.addClass(otherContainer, 'esriCTGroupHidden');
        }));
        array.forEach(buttons, lang.hitch(this, function (otherNode, index) {
          html.removeClass(otherNode, 'esriCTLabelSettingsDownButton');
          html.addClass(otherNode, 'esriCTLabelSettingsRightButton');
          domAttr.set(otherNode, "aria-expanded", "false");
          if (index === buttons.length - 1) {
            setTimeout(lang.hitch(this, function () {
              this._setLastFocusNode();
            }), 100);
          }
        }));

        if (nodeOpen) {
          //in closed state - so open and change arrow to up
          html.removeClass(container, 'esriCTGroupHidden');
          html.removeClass(node, 'esriCTLabelSettingsRightButton');
          html.addClass(node, 'esriCTLabelSettingsDownButton');
          domAttr.set(node, "aria-expanded", "true");
          var colorPicker = query('.jimu-color-picker', container);
          if (colorPicker.length) {
            focusUtils.focus(colorPicker[0]);
          }
        } else {
          focusUtils.focus(node);
        }
      },

      /**
       * Update's Settings on close of the widget
       * @memberOf widgets/visibility/Settings
       **/
      onClose: function () {
        if (!this.validInputs()) {
          return false;
        }
        this.onSettingsChanged();
        this._openCloseNodes();
      },

      /**
       * Set's the selected Settings on any value change
       * @memberOf widgets/visibility/Settings
       **/
      onSettingsChanged: function () {
        array.forEach(this.colorPickerNodes, lang.hitch(this, function (node) {
          var json = {
            'color': dijitRegistry.byId(node.id).getValues().color,
            'transparency': dijitRegistry.byId(node.id).getValues().transparency,
            'type': dijitRegistry.byId(node.id).dropdown.getValue()
          };
          this.selectedSettings[node.id] = json;
        }));
        this.emit("settingsChanged", this.selectedSettings);
      },

      validInputs: function () {
        var isValid = true;
        //validate for any invalid values in all colorPicker spinners
        array.some(this.colorPickerNodes, function (node) {
          if (!dijitRegistry.byId(node.id).validateSpinner()) {
            isValid = false;
            return true;
          }
        }, this);
        return isValid;
      },

      // Code for Accessibility : function to set last focus node
      _setLastFocusNode: function () {
        if (domClass.contains(this.nonVisibleSectionSettingsButton, "esriCTLabelSettingsDownButton")) {
          var lastNonVisibleStyleDOM = query(".dijit", dom.byId('nonVisibleSectionFillColor').lastElementChild)[0];
          utils.initLastFocusNode(this.refDomNode, lastNonVisibleStyleDOM);
        } else {
          utils.initLastFocusNode(this.refDomNode, this.nonVisibleSectionSettingsButton);
        }
      }
    });
  });