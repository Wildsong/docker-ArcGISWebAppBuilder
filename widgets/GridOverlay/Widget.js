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
  'dojo/_base/lang',
  'dojo/dom-construct',
  'dojo/on',
  'jimu/BaseWidget',
  'jimu/utils',
  './GridSetting',
  'dojo/dom-attr',
  'dojo/keys',
  'dojo/query',
  'dijit/registry',
  'dijit/focus'
], function (
  declare,
  lang,
  domConstruct,
  on,
  BaseWidget,
  utils,
  GridSetting,
  domAttr,
  keys,
  query,
  dijitRegistry,
  focusUtil
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here
    baseClass: 'grid-overlay-widget',
    // this property is set by the framework when widget is loaded.
    name: 'GridOverlayWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function () {
      this.inherited(arguments);
      this.openAtStartAysn = true; //’this’ is widget object
      this.gridSetting = new GridSetting({
        map: this.map,
        config: this.config,
        uid: this.uid
      });
      domConstruct.place(this.gridSetting.domNode, this.gridOverlayNode);
      this.gridSetting.startup();
      this.resetButton.title = window.jimuNls.common.reset;
      this.resetButton.innerText = window.jimuNls.common.reset;
      domAttr.set(this.resetButton, "aria-label", window.jimuNls.common.reset);

      this.own(on(this.resetButton, "click", lang.hitch(this, function () {
        this.gridSetting.setConfig(this.config);
      })));
      // Code for Accessibility: keydown event for reset button
      this.own(on(this.resetButton, "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.SPACE || evt.keyCode === keys.ENTER) {
          this.gridSetting.setConfig(this.config);
        }
      })));
    },

    constructor: function (args) {
      this.uid = args.id || dijitRegistry.getUniqueId('go');
    },

    destroy: function () {
      this.inherited(arguments);
      this.gridSetting.gridOverlayCtrl.disable();
    },

    startup: function () {
      this.inherited(arguments);
      this._setTheme();
    },

    onOpen: function () {
      this.gridSetting.gridOverlayCtrl.enable();
      this.gridSetting.setConfig();
      if ((this.appConfig.theme.name === "DashboardTheme" && !this.hasOwnProperty('closeable')) || this.isOnScreen) {
        this.gridSetting.alterToggleSwitch();
        this.gridSetting.cbxShowGrid.set('checked', true);
      }
      this._support508Accessibility();
    },

    onClose: function () {
      this.gridSetting._saveConfig();
      if (!this.gridSetting.getConfig().enableGridOnClose) {
        this.gridSetting.gridOverlayCtrl.disable();
      }
    },

    //source:
    //https://stackoverflow.com/questions/9979415/dynamically-load-and-unload-stylesheets
    _removeStyleFile: function (filename, filetype) {
      //determine element type to create nodelist from
      var targetelement = null;
      if (filetype === "js") {
        targetelement = "script";
      } else if (filetype === "css") {
        targetelement = "link";
      } else {
        targetelement = "none";
      }
      //determine corresponding attribute to test for
      var targetattr = null;
      if (filetype === "js") {
        targetattr = "src";
      } else if (filetype === "css") {
        targetattr = "href";
      } else {
        targetattr = "none";
      }
      var allsuspects = document.getElementsByTagName(targetelement);
      //search backwards within nodelist for matching elements to remove
      for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] &&
          allsuspects[i].getAttribute(targetattr) !== null &&
          allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
          //remove element by calling parentNode.removeChild()
          allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
      }
    },

    _setTheme: function () {
      //Check if Dart Theme
      if (this.appConfig.theme.name === "DartTheme") {
        //Load appropriate CSS for dart theme
        utils.loadStyleLink('dartOverrideCSS', this.folderUrl + "css/dartTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/dartTheme.css", 'css');
      }

      //Check if Box Theme
      if (this.appConfig.theme.name === "BoxTheme") {
        //Load appropriate CSS for box theme
        utils.loadStyleLink('boxOverrideCSS', this.folderUrl + "css/boxTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/boxTheme.css", 'css');
      }

      //Check if Dashboard Theme
      if (this.appConfig.theme.name === "DashboardTheme") {
        //Load appropriate CSS for dashboard theme
        utils.loadStyleLink('dashboardOverrideCSS', this.folderUrl + "css/dashboardTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/dashboardTheme.css", 'css');
      }

      //Check if Launchpad Theme
      if (this.appConfig.theme.name === "LaunchpadTheme") {
        //Load appropriate CSS for dashboard theme
        utils.loadStyleLink('launchpadOverrideCSS', this.folderUrl + "css/launchpadTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/launchpadTheme.css", 'css');
      }

      //Check if Foldable Theme
      if (this.appConfig.theme.name === "FoldableTheme" && !this.isOnScreen) {
        //Load appropriate CSS for dashboard theme
        utils.loadStyleLink('foldableOverrideCSS', this.folderUrl + "css/foldableTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/foldableTheme.css", 'css');
      }

      //Check if JewelryBox Theme
      if (this.appConfig.theme.name === "JewelryBoxTheme") {
        //Load appropriate CSS for dashboard theme
        utils.loadStyleLink('jewelryBoxOverrideCSS', this.folderUrl + "css/jewelryBoxTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/jewelryBoxTheme.css", 'css');
      }

      //Check if Plateau Theme
      if (this.appConfig.theme.name === "PlateauTheme") {
        //Load appropriate CSS for dashboard theme
        utils.loadStyleLink('plateauOverrideCSS', this.folderUrl + "css/plateauTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/plateauTheme.css", 'css');
      }

      //Check if Tab Theme
      if (this.appConfig.theme.name === "TabTheme") {
        //Load appropriate CSS for dashboard theme
        utils.loadStyleLink('tabOverrideCSS', this.folderUrl + "css/tabTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/tabTheme.css", 'css');
      }

      //Check if Pocket Theme
      if (this.appConfig.theme.name === "PocketTheme") {
        //Load appropriate CSS for dashboard theme
        utils.loadStyleLink('pocketOverrideCSS', this.folderUrl + "css/pocketTheme.css", null);
      } else {
        this._removeStyleFile(this.folderUrl + "css/pocketTheme.css", 'css');
      }
    },

    // Code for accessibility: function to support widget accessible
    _support508Accessibility: function () {
      var firstSectionTitle = query('.sectionTitle')[0];
      utils.initFirstFocusNode(this.domNode, firstSectionTitle);
      if (utils.isAutoFocusFirstNodeWidget(this)) {
        focusUtil.focus(firstSectionTitle);
      }
      // set last focusNode
      utils.initLastFocusNode(this.domNode, this.resetButton);
    }
  });

});