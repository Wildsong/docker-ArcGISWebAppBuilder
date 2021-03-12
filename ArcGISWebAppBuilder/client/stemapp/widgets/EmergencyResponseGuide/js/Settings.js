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
    'dojo/text!../templates/Settings.html',
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
      baseClass: 'jimu-widget-ERG-Settings',
      templateString: SettingsTemplate,
      selectedSettings: {}, //Holds selected Settings
      colorPickerNodes: [], //Holds an array of color pickers populated at start up

      constructor: function (options) {
        lang.mixin(this, options);
      },

      //Load all the options on startup
      startup: function () {

        this.colorPickerNodes = query('.colorPicker', this.domNode);

        array.forEach(this.colorPickerNodes, lang.hitch(this, function (node, i) {
          node = new ColorPickerEditor({
            nls: this.nls,
            type: domClass.contains(node, 'Line') ? 'line' : 'fill'
          }, node);
          node.setValues({
            "color": this.config.erg.symbology[node.id].color,
            "transparency": this.config.erg.symbology[node.id].transparency
          });
          node.startup();
          node.dropdown.set('value',
            this.config.erg.symbology[node.id].type);
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
        domClass.add(this.domNode, "ERGSettingsContainer ERGFullWidth");
        this._handleClickEvents();
      },

      /**
       * Handle click events for different controls
       * @memberOf widgets/ERG/Widget
       **/
      _handleClickEvents: function () {
        //handle spill location button clicked
        this.own(on(this.spillLocationSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.spillLocationSettingsButton, this.spillLocationContainer);
        })));
        //handle Initial Isolation Zone button clicked
        this.own(on(this.IISettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.IISettingsButton, this.IIZoneContainer);
        })));
        //handle Protective Action Zone button clicked
        this.own(on(this.PASettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.PASettingsButton, this.PAZoneContainer);
        })));
        //handle down wind button clicked
        this.own(on(this.downwindSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.downwindSettingsButton, this.downwindZoneContainer);
        })));
        //handle Fire Isolation Zone button clicked
        this.own(on(this.fireSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.fireSettingsButton, this.fireZoneContainer);
        })));
        //handle BLEVE Zone button clicked
        this.own(on(this.bleveSettingsButton, "click", lang.hitch(this, function () {
          this._openCloseNodes(this.bleveSettingsButton, this.bleveZoneContainer);
        })));

        /* For Accessibility */
        //handle spill location button keydown for accessibility
        this.own(on(this.spillLocationSettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.spillLocationSettingsButton, this.spillLocationContainer);
          }
        })));
        //handle Initial Isolation Zone button keydown for accessibility
        this.own(on(this.IISettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.IISettingsButton, this.IIZoneContainer);
          }
        })));
        //handle Protective Action Zone button keydown for accessibility
        this.own(on(this.PASettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.PASettingsButton, this.PAZoneContainer);
          }
        })));
        //handle down wind button keydown for accessibility
        this.own(on(this.downwindSettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.downwindSettingsButton, this.downwindZoneContainer);
          }
        })));
        //handle Fire Isolation Zone button keydown for accessibility
        this.own(on(this.fireSettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.fireSettingsButton, this.fireZoneContainer);
          }
        })));
        //handle BLEVE Zone button keydown for accessibility
        this.own(on(this.bleveSettingsButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._openCloseNodes(this.bleveSettingsButton, this.bleveZoneContainer);
            this._setLastFocusNode();
          }
        })));
      },

      _openCloseNodes: function (node, container) {
        var containers = query('.container', this.domNode);
        var buttons = query('.ERGSettingsButtonIcon', this.domNode);
        var nodeOpen = false;

        //open or close nodes only when all values enterd are valid
        if (!this.validInputs()) {
          return;
        }

        if (node) {
          if (domClass.contains(node, 'ERGLabelSettingsRightButton')) {
            nodeOpen = true;
          }
        }
        //close all dropdowns
        array.forEach(containers, lang.hitch(this, function (otherContainer) {
          html.addClass(otherContainer, 'controlGroupHidden');
        }));
        array.forEach(buttons, lang.hitch(this, function (otherNode, index) {
          html.removeClass(otherNode, 'ERGLabelSettingsDownButton');
          html.addClass(otherNode, 'ERGLabelSettingsRightButton');
          domAttr.set(otherNode, "aria-expanded", "false");
          if (index === buttons.length - 1) {
            this._setLastFocusNode();
          }
        }));

        if (nodeOpen) {
          //in closed state - so open and change arrow to up
          html.removeClass(container, 'controlGroupHidden');
          html.removeClass(node, 'ERGLabelSettingsRightButton');
          html.addClass(node, 'ERGLabelSettingsDownButton');
          domAttr.set(node, "aria-expanded", "true");
          var colorPicker = query('.jimu-color-picker', container);
          if (colorPicker.length) {
            focusUtils.focus(colorPicker[0]);
          }
        }
        else {
          focusUtils.focus(node);
        }
      },

      /**
       * Update's Settings on close of the widget
       * @memberOf widgets/ERG/Settings
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
       * @memberOf widgets/ERG/Settings
       **/
      onSettingsChanged: function () {
        array.forEach(this.colorPickerNodes, lang.hitch(this, function (node, i) {
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
        if (domClass.contains(this.bleveSettingsButton, "ERGLabelSettingsDownButton")) {
          var lastBlaveZoneStyleDOM = query(".dijit", dom.byId('bleveZoneFillColor').lastElementChild)[0];
          utils.initLastFocusNode(this.refDomNode, lastBlaveZoneStyleDOM);
        }
        else {
          utils.initLastFocusNode(this.refDomNode, this.bleveSettingsButton);
        }
      }
    });
  });