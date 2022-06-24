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
    'dojo/on',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/_base/Color',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    'jimu/utils',
    'jimu/portalUtils',
    'jimu/dijit/ColorPickerPopup',
    './SharedThemeChooserPopup',
  ],
  function(
    declare, on, array, lang, html, Color, _WidgetsInTemplateMixin,  BaseWidgetSetting, jimuUtils, portalUtils, ColorPickerPopup, SharedThemeChooserPopup) {
    /*jscs: disable maximumLineLength*/
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      //these two properties is defined in the BaseWidget
      baseClass: 'dashboard-header-setting',
      darkColor: '#444444',
      lightColor: '#EEEEEE',

      startup: function () {
        this.inherited(arguments);

        this._createTooltipDialog();

        if (this.config.mode) {
          if (this.config.mode === 'org') {
            this.popup.setChecked(this.popup.ACTION.ORG);
            // get org shared color dynamically
            this._getOrgColor().then(lang.hitch(this, function(color) {
              this._changeLabel(new Color(color));
            }));
          } else if (this.config.mode === 'custom') {
            this.popup.setChecked(this.popup.ACTION.CUSTOM);
            // static custom color
            this._changeLabel(new Color(this.config.color));
          } else {
            this.popup.setChecked(this.popup.ACTION.SHARED);
            // get theme color dynamically
            var color = this._getThemeColor();
            this._changeLabel(new Color(color));
          }
          this.colorPickerPopup.setColor(new Color(this.config.color));
        } else {
          var mainBackgroundColor = lang.getObject('theme.customStyles.mainBackgroundColor', false, this.appConfig);
          if (mainBackgroundColor) {
            // use custom style
            this._getOrgColor().then(lang.hitch(this, function(color) {
              if (color === mainBackgroundColor) {
                this.popup.setChecked(this.popup.ACTION.ORG);
                this._getOrgColor().then(lang.hitch(this, function(color) {
                  this._changeLabel(new Color(color));
                }));
              } else {
                this.popup.setChecked(this.popup.ACTION.CUSTOM);
                this._changeLabel(new Color(mainBackgroundColor));
              }
            }));
          } else {
            // use theme style
            this.popup.setChecked(this.popup.ACTION.SHARED);
            var color = this._getThemeColor();
            this._changeLabel(new Color(color));
          }
        }
        //hover display
        this.own(on(this.domNode, 'mouseenter', lang.hitch(this, function (/*event*/) {
          if (!this.colorPickerPopup.isOpen()) {
            this.popup.showPopup();//disable hover when colorPickerPopup opened
          }
        })));
        this.own(on(this.domNode, 'mouseleave', lang.hitch(this, function (/*event*/) {
          if (!this.colorPickerPopup.isOpen()) {
            this.popup.hidePopup();
          }
        })));
      },

      _createTooltipDialog: function () {
        var sharedTheme = lang.getObject('theme.sharedTheme', false, this.appConfig);
        this.popup = new SharedThemeChooserPopup({
          placeAt: this.getParent(),
          nls: this.nls,
          around: this.colorPicker,
          isPortalSupported: sharedTheme && sharedTheme.isPortalSupport
        });
        this.own(on(this.popup, 'btnClick', lang.hitch(this, function (btn, event) {
          if (btn === this.popup.ACTION.ORG) {
            this.showOrgThemeColor();
          } else if (btn === this.popup.ACTION.SHARED) {
            this.showSharedThemeColor();
          } else if (btn === this.popup.ACTION.CUSTOM) {
            this.showCustomColor(event);
          }
        })));

        this.colorPickerPopup = new ColorPickerPopup({
          showColorPickerOK: true,
          showLabel: false,
          recordUID: this.recordUID,
          around: this.domNode
        });
        this.colorPickerPopup.placeAt(this.getParent());
        this.colorPickerPopup.startup();

        this.own(on(this.colorPickerPopup, 'change', lang.hitch(this, function (color) {
          this.config.color = color;
          this.config.mode = 'custom';
          this._changeLabel(color);
          this.popup.setChecked(this.popup.ACTION.CUSTOM);
          this.popup.hideTooltipDialog();
        })));
      },

      _changeLabel: function (newColor) {
        html.empty(this.colorPicker);
        this.colorPicker.style.background = newColor.toHex();
        html.create('span', {
          innerHTML: jimuUtils.sanitizeHTML(newColor.toHex()),
          className: "color-label",
          style: {
            color: jimuUtils.invertColor(newColor.toHex())
          }
        }, this.colorPicker);
      },

      _getOrgColor: function() {
        var portal = portalUtils.getPortal(this.appConfig.portalUrl);
        return portal.loadSelfInfo().then(lang.hitch(this, function (selfInfo) {
          if (selfInfo && selfInfo.portalProperties && selfInfo.portalProperties.sharedTheme &&
            selfInfo.portalProperties.sharedTheme.header) {
            return selfInfo.portalProperties.sharedTheme.header.background;
          }
        }), lang.hitch(this, function (err) {
          console.error(err);
        }));
      },

      _getThemeColor: function() {
        var styles = lang.getObject('theme.styles', false, this.appConfig);
        if (styles[0] !== 'light') {
          return this.darkColor;
        }
        return this.lightColor;
      },

      showOrgThemeColor: function() {
        this.config.mode = 'org';
        html.empty(this.colorPicker);
        this.colorPicker.style.background = 'transparent';
        this.popup.setChecked(this.popup.ACTION.ORG);
        this.popup.hideTooltipDialog();

        this._getOrgColor().then(lang.hitch(this, function(color) {
          this._changeLabel(new Color(color));
        }));
      },

      showSharedThemeColor: function () {
        this.config.mode = 'theme';
        html.empty(this.colorPicker);
        this.colorPicker.style.background = 'transparent';
        this.popup.setChecked(this.popup.ACTION.SHARED);
        this.popup.hideTooltipDialog();

        var color = this._getThemeColor();
        this._changeLabel(new Color(color));
      },

      showCustomColor: function (event) {
        this.config.mode = 'custom';
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }

        //close own popup
        this.popup.hidePopup();

        this.colorPickerPopup.showTooltipDialog();
        this.colorPickerPopup.initUI();
      },

      destroy: function () {
        if (this.colorPickerPopup) {
          this.colorPickerPopup.picker.destroy();
        }
        if (this.popup) {
          this.popup.destroy();
        }
        this.inherited(arguments);
      },

      setConfig: function(config) {
        this.config = config || {};
      },

      getConfig: function() {
        return this.config;
      }
    });
  });