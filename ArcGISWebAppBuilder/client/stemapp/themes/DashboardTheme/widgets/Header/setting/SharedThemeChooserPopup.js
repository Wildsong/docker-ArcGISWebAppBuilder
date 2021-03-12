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

define(['dojo/Evented',
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/on',
  'dijit/TooltipDialog',
  'dojo/text!./SharedThemeChooserPopup.html',
  'dijit/popup'
],
  function (Evented, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
    lang, html, on, TooltipDialog, template, dojoPopup) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
      declaredClass: 'shared-theme-chooser-popup',
      templateString: template,

      _DISAPPEAR_TIMER: null,//hover display
      _isTooltipDialogOpened: false,
      placeAt: null,
      isPortalSupported: null,
      ACTION: null,

      postMixInProperties: function () {
        this.inherited(arguments);
        this.nls = lang.mixin(this.nls, builderNls);

        this.ACTION = {
          ORG: "org",
          SHARED: "shared",
          CUSTOM: "custom"
        };
      },

      postCreate: function () {
        this.inherited(arguments);

        this._createTooltipDialog();

        if (!this.isPortalSupported) {
          html.addClass(this.orgItem, 'no-support');
        }
        //Buttons
        this.own(on(this.orgItem, 'click', lang.hitch(this, function (event) {
          event.stopPropagation();
          event.preventDefault();
          if (this.isPortalSupported) {
            this.orgClickHanlder(event);
          }
        })));
        this.own(on(this.sharedItem, 'click', lang.hitch(this, function (event) {
          event.stopPropagation();
          event.preventDefault();
          this.sharedClickHanlder(event);
        })));
        this.own(on(this.customItem, 'click', lang.hitch(this, function (event) {
          event.stopPropagation();
          event.preventDefault();
          this.customClickHanlder(event);
        })));

        this._hideTooltipDialog();
      },

      destroy: function () {
        dojoPopup.close(this.tooltipDialog);
        this.tooltipDialog.destroy();
        this.inherited(arguments);
      },

      hideTooltipDialog: function () {
        this._hideTooltipDialog();
      },
      showTooltipDialog: function () {
        this._showTooltipDialog();
      },
      getTooltipDialog: function () {
        if (this.tooltipDialog && this.tooltipDialog.domNode) {
          return this.tooltipDialog;
        } else {
          return null;
        }
      },
      _showTooltipDialog: function () {
        if (true === this._isTooltipDialogOpened) {
          return;
        }

        dojoPopup.open({
          parent: this.placeAt || this.getParent(),
          popup: this.tooltipDialog,
          around: this.around
        });
        this._isTooltipDialogOpened = true;

        this.emit("showPopup");
      },
      _hideTooltipDialog: function () {
        dojoPopup.close(this.tooltipDialog);
        this._isTooltipDialogOpened = false;
      },
      _createTooltipDialog: function () {
        this.tooltipDialog = new TooltipDialog({
          content: this.domNode
        });

        html.addClass(this.tooltipDialog.domNode, "shared-theme-chooser-popup-container");
        //mouse hover on this.popup
        var tooltipDialog = this.getTooltipDialog();
        this.own(on(tooltipDialog.domNode, 'mouseover', lang.hitch(this, function (event) {
          this.showPopup(event);
        })));
        this.own(on(tooltipDialog.domNode, 'mouseleave', lang.hitch(this, function (event) {
          this.hidePopup(event);
        })));
      },

      orgClickHanlder: function (event) {
        this.emit("btnClick", this.ACTION.ORG, event);
      },
      sharedClickHanlder: function (event) {
        this.emit("btnClick", this.ACTION.SHARED, event);
      },
      customClickHanlder: function (event) {
        this.emit("btnClick", this.ACTION.CUSTOM, event);
      },
      setChecked: function (btn) {
        html.removeClass(this.orgCheck, "check");
        html.removeClass(this.sharedCheck, "check");
        html.removeClass(this.customCheck, "check");

        if (btn === this.ACTION.ORG && this.isPortalSupported) {
          html.addClass(this.orgCheck, "check");
        }
        if (btn === this.ACTION.SHARED) {
          html.addClass(this.sharedCheck, "check");
        }
        if (btn === this.ACTION.CUSTOM) {
          html.addClass(this.customCheck, "check");
        }
      },

      showPopup: function (event) {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }

        this._clearDisappearTimer();
        if (this._isTooltipDialogOpened === false) {
          this.showTooltipDialog();
          this._isTooltipDialogOpened = true;
        }
      },
      hidePopup: function (event) {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
        //this._setDisappearTimer();
        this.hideTooltipDialog();
        this._isTooltipDialogOpened = false;
      },
      _clearDisappearTimer: function () {
        if (this._miniModeTimer) {
          clearTimeout(this._miniModeTimer);
        }
      }
    });
  });