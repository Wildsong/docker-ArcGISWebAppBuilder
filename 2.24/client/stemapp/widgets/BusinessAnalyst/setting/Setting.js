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
  "dojo/_base/array",
  "dojo/_base/declare",
  'dojo/_base/html',
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/mouse",
  "dojo/on",
  'dojo/query',
  'dojo/sniff',
  "jimu/BaseWidgetSetting",
  'jimu/utils',
  "dijit/_WidgetsInTemplateMixin",

  'dijit/Editor',

  "esri/dijit/geoenrichment/SelectableTree",

  "../esriAnalystX/widgets/SelectableTreeGrid/SelectableTreeGrid",

  "../utils/GEUtil",
  "../utils/ReportUtil",
  "../utils/ValidationUtil",

  "jimu/dijit/formSelect",

  "jimu/dijit/TabContainer",

  "jimu/dijit/EditorXssFilter",

  "dojo/NodeList-manipulate",
  "dijit/_editor/plugins/LinkDialog",
  "dijit/_editor/plugins/ViewSource",
  "dijit/_editor/plugins/FontChoice",
  "dojox/editor/plugins/Preview",
  "dijit/_editor/plugins/TextColor",
  "dojox/editor/plugins/ToolbarLineBreak",
  "dijit/ToolbarSeparator",
  "dojox/editor/plugins/FindReplace",
  "dojox/editor/plugins/PasteFromWord",
  "dojox/editor/plugins/InsertAnchor",
  "dojox/editor/plugins/Blockquote",
  "dojox/editor/plugins/UploadImage",
  "jimu/dijit/EditorChooseImage",
  "jimu/dijit/EditorTextColor",
  "jimu/dijit/EditorBackgroundColor",

  "dijit/form/CheckBox",
  "dijit/layout/ContentPane"
],
function (array, declare, html, domClass, domConstruct, domStyle, mouse, on, query, has, BaseWidgetSetting, utils, _WidgetsInTemplateMixin, Editor, SelectableTree, SelectableTreeGrid, GEUtil, ReportUtil, ValidationUtil, Select, TabContainer, EditorXssFilter) {

  // ID's of reports in Infographics/Reports Tree
  var ESRI_REPORTS_TREE_ID = 0;
  var MY_REPORTS_TREE_ID = 1;
  var SHARED_REPORTS_TREE_ID = 2;

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

    baseClass: "jimu-widget-business-analyst-setting",

    selectedCountryID: "",

    currentDefaultInfographicID: "",
    currentDefaultInfographicDiv: null,
    currentDefaultReportID: "",
    currentDefaultReportDiv: null,

    postCreate: function () {

      this.inherited(arguments);

      this.tab = new TabContainer({
        tabs: [{
          title: this.nls.home,
          content: this.homeContentPane
        }, {
          title: this.nls.infographics,
          content: this.infographicsContentPane
        }, {
          title: this.nls.reports,
          content: this.reportsContentPane
        }, {
          title: this.nls.rings,
          content: this.ringsContentPane
        }, {
          title: this.nls.driveTime,
          content: this.driveTimeContentPane
        }, {
          title: this.nls.walkTime,
          content: this.walkTimeContentPane
        }],
        selected: this.nls.home
      });
      this.tab.placeAt(this.reportInfographicTabContainer);
      this.tab.startup();

      this.editorXssFilter = EditorXssFilter.getInstance();
    },

    startup: function () {
      if (this._started) {
        return;
      }
      this.inherited(arguments);

      this.initEditor();

      this.setConfig(this.config);
    },

    initEditor: function() {
      var head = document.getElementsByTagName('head')[0];
      var tcCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/TextColor.css";
      var tcCss = query('link[href="' + tcCssHref + '"]', head)[0];
      if (!tcCss) {
        utils.loadStyleLink("editor_plugins_resources_TextColor", tcCssHref);
      }
      var epCssHref = window.apiUrl + "dojox/editor/plugins/resources/editorPlugins.css";
      var epCss = query('link[href="' + epCssHref + '"]', head)[0];
      if (!epCss) {
        utils.loadStyleLink("editor_plugins_resources_editorPlugins", epCssHref);
      }
      var pfCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/PasteFromWord.css";
      var pfCss = query('link[href="' + pfCssHref + '"]', head)[0];
      if (!pfCss) {
        utils.loadStyleLink("editor_plugins_resources_PasteFromWord", pfCssHref);
      }

      this.editor = new Editor({
        //'viewsource' dijit will crash, if open those
        //contentPreFilters: [ lang.hitch(this, function(str){ this.editorXssFilter.sanitize(str)}) ],
        //contentPostFilters: [ lang.hitch(this, function(str){ this.editorXssFilter.sanitize(str)}) ],
        plugins: [
          'bold', 'italic', 'underline',
          utils.getEditorTextColor("about"), utils.getEditorBackgroundColor("about"),
          '|', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
          '|', 'insertOrderedList', 'insertUnorderedList', 'indent', 'outdent'
        ],
        extraPlugins: [
          '|', 'createLink', 'unlink', 'pastefromword', '|', 'undo', 'redo',
          '|', 'chooseImage', '|', 'viewsource', 'toolbarlinebreak',
          {
            name: "dijit._editor.plugins.FontChoice",
            command: "fontName",
            custom: "Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".split(";")
          }, 'fontSize', 'formatBlock'
        ],
        style: "font-family:Verdana;"
      }, this.editor);
      html.setStyle(this.editor.domNode, {
        width: '100%',
        height: '100%'
      });
      this.editor.startup();

      if (has('ie') !== 8) {
        this.editor.resize({
          w: '100%',
          h: '100%'
        });
      }
    },

    setConfig: function (config) {
      var self = this

      this.initializeNewConfigValues(config);

      // Create Country Drop Down
      GEUtil.getAvailableCountries().then(function (response) {
        var countries = [];
        array.forEach(response.countries, function (country) {
          countries.push({ label: country.name, value: country.id, selected: country.id == self.config.defaultCountryID ? "selected" : "" });
        });

        self.countryDropDownInfographics = new Select({
          options: countries
        }).placeAt(self.countryDropDownContainerInfographics);

        self.countryDropDownInfographics.startup();

        self.selectedCountryID = self.countryDropDownInfographics.get("value");

        on(self.countryDropDownInfographics, "change", function () {
          self._countryChangeInfographics();
        });

        self.countryDropDownReports = new Select({
          options: countries
        }).placeAt(self.countryDropDownContainerReports);

        self.countryDropDownReports.startup();

        self.selectedCountryID = self.countryDropDownReports.get("value");

        on(self.countryDropDownReports, "change", function () {
          self._countryChangeReports();
        });

        self._loadConfigForCountry(self.selectedCountryID);

      });

      this._loadRingDTWTConfig();

      this._loadInfographicExportOptions();

      this._loadFirstPageOptions();

      var content = this.editorXssFilter.sanitize(config.firstPageText || this.nls.defaultFirstPageText);
      this.editor.set('value', content);
    },

    getConfig: function () {

      // Validate Ring DT WT values
      if (!this._validateRingDTWT())
        return false;

      this._setConfigForCountry(this.selectedCountryID);

      this._setRingDTWTConfig();

      this._setInfographicExportOptions();

      this._setFirstPageOptions();

      this.config.defaultCountryID = this.selectedCountryID;

      this.config.firstPageText = this.editor.get('value');

      return this.config;
    },

    _countryChangeInfographics: function () {
      if (this.countryDropDownReports.get("value") != this.countryDropDownInfographics.get("value")) {
        this.countryDropDownReports.set("value", this.countryDropDownInfographics.get("value"));
        this._countryChange();
      }
    },

    _countryChangeReports: function () {
      if (this.countryDropDownInfographics.get("value") != this.countryDropDownReports.get("value")) {
        this.countryDropDownInfographics.set("value", this.countryDropDownReports.get("value"));
        this._countryChange();
      }
    },

    _countryChange: function () {
      this._setConfigForCountry(this.selectedCountryID);

      this.selectedCountryID = this.countryDropDownInfographics.get("value");

      this._loadConfigForCountry(this.selectedCountryID);
    },

    // Sets the configuration (Infographics/Reports) for the passed in country based on the currently selected Infographics/Reports
    _setConfigForCountry: function (countryID) {
      var localCountryConfig = null;

      array.forEach(this.config.countryConfig, function (countryConfig) {
        if (countryConfig.countryID == countryID) {
          localCountryConfig = countryConfig;
        }
      });

      // Set default country config if not configured
      if (!localCountryConfig) {
        localCountryConfig = {
          "countryID": countryID,
          "allowEsriReports": true,
          "allowAllEsriReports": true,
          "allowEsriInfographics": true,
          "allowAllEsriInfographics": true,
          "allowMyReports": true,
          "allowMyInfographics": true,
          "allowSharedReports": true,
          "allowSharedInfographics": true,
          "allowAllOrgReports": true,
          "allowAllOrgInfographics": true,
          "defaultInfographicID": "",
          "defaultReportID": "",
          "enabledEsriReports": [],
          "enabledOrgReports": [],
          "enabledEsriInfographics": [],
          "enabledOrgInfographics": []
        }
      }

      ///////////////////////////////////////////////////////////////////////////////////////////////////
      // INFOGRAPHICS CONFIG
      ///////////////////////////////////////////////////////////////////////////////////////////////////

      // Allow Infographic groups if there is at least 1 selected in (if they are empty, we still allow too)
      localCountryConfig.allowEsriInfographics = this.infographicsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].leafCount > 0 ? this.infographicsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].selectCount != 0 : true;
      localCountryConfig.allowMyInfographics = this.infographicsTreeGrid.tree.data[MY_REPORTS_TREE_ID].leafCount > 0 ? this.infographicsTreeGrid.tree.data[MY_REPORTS_TREE_ID].selectCount != 0 : true;
      localCountryConfig.allowSharedInfographics = this.infographicsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].leafCount > 0 ? this.infographicsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].selectCount != 0 : true;

      // If all of the Esri/Org (my + shared) are selected then mark corresponding as true, so all Esri and Org infographics will always display if true, else we use a whitelist to only show enabled Infographics.
      localCountryConfig.allowAllEsriInfographics = this.infographicsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].leafCount === this.infographicsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].selectCount;
      localCountryConfig.allowAllOrgInfographics = this.infographicsTreeGrid.tree.data[MY_REPORTS_TREE_ID].leafCount === this.infographicsTreeGrid.tree.data[MY_REPORTS_TREE_ID].selectCount
        && this.infographicsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].leafCount === this.infographicsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].selectCount;

      // Set Enabled Infographics for Esri and Org only if not all of them are selected
      if (!localCountryConfig.allowAllEsriInfographics) {
        localCountryConfig.enabledEsriInfographics = this._getEnabledReports(this.infographicsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].children);
      }

      if (!localCountryConfig.allowAllOrgInfographics) {
        localCountryConfig.enabledOrgInfographics = this._getEnabledReports(this.infographicsTreeGrid.tree.data[MY_REPORTS_TREE_ID].children.concat(this.infographicsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].children));
      }

      // Default Infographic ID
      localCountryConfig.defaultInfographicID = this.currentDefaultInfographicID;

      ///////////////////////////////////////////////////////////////////////////////////////////////////
      // REPORTS CONFIG
      ///////////////////////////////////////////////////////////////////////////////////////////////////

      // Allow Report groups if there is at least 1 selected in (if they are empty, we still allow too)
      localCountryConfig.allowEsriReports = this.reportsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].leafCount > 0 ? this.reportsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].selectCount != 0 : true;
      localCountryConfig.allowMyReports = this.reportsTreeGrid.tree.data[MY_REPORTS_TREE_ID].leafCount > 0 ? this.reportsTreeGrid.tree.data[MY_REPORTS_TREE_ID].selectCount != 0 : true;
      localCountryConfig.allowSharedReports = this.reportsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].leafCount > 0 ? this.reportsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].selectCount != 0 : true;

      // If all of the Esri/Org (my + shared) are selected then mark corresponding as true, so all Esri and Org Reports will always display if true, else we use a whitelist to only show enabled Reports.
      localCountryConfig.allowAllEsriReports = this.reportsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].leafCount === this.reportsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].selectCount;
      localCountryConfig.allowAllOrgReports = this.reportsTreeGrid.tree.data[MY_REPORTS_TREE_ID].leafCount === this.reportsTreeGrid.tree.data[MY_REPORTS_TREE_ID].selectCount
        && this.reportsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].leafCount === this.reportsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].selectCount;

      // Set Enabled Infographics for Esri and Org only if not all of them are selected
      if (!localCountryConfig.allowAllEsriReports) {
        localCountryConfig.enabledEsriReports = this._getEnabledReports(this.reportsTreeGrid.tree.data[ESRI_REPORTS_TREE_ID].children);
      }

      if (!localCountryConfig.allowAllOrgReports) {
        localCountryConfig.enabledOrgReports = this._getEnabledReports(this.reportsTreeGrid.tree.data[MY_REPORTS_TREE_ID].children.concat(this.reportsTreeGrid.tree.data[SHARED_REPORTS_TREE_ID].children));
      }

      // Default Report ID
      localCountryConfig.defaultReportID = this.currentDefaultReportID;

      // Save back to config
      var configIndex = -1;
      array.forEach(this.config.countryConfig, function (countryConfig, index) {
        if (countryConfig.countryID == countryID) {
          configIndex = index;
        }
      });

      // Replace existing country config
      if (configIndex != -1)
        this.config.countryConfig[configIndex] = localCountryConfig;
      // Add new country config
      else
        this.config.countryConfig.push(localCountryConfig);
    },

    // Loads the config settings for the specified country to the Settings page
    _loadConfigForCountry: function (countryID) {
      var self = this;

      // Set Infographics Tree
      ReportUtil.getAvailableInfographicReports(countryID).then(function (reports) {

        array.forEach(reports, function (reportParent) {
          array.forEach(reportParent.children, function (report) {
            report.selected = true;
          });
        });

        if (!self.infographicsTreeGrid) {
          self.infographicsTreeGrid = new SelectableTreeGrid({
            tree: new SelectableTree(reports),
            showHeader: false,
            // Overriden to add "Default"
            _renderLabelNode: function (node, td) {
                var returnDiv = domConstruct.create("div");
                var nodeLabelDiv = domConstruct.create("div", {
                  class: "esriMapsAnalystXSelectableTreeLabel TrimWithEllipses",
                  innerHTML: this.getLabel(node),
                  style: "float: left"
                }, returnDiv);

                if (node.deepness === 1) {

                  if (node.value === self.currentDefaultInfographicID) {
                    domClass.add(nodeLabelDiv, "default");
                    self.currentDefaultInfographicDiv = nodeLabelDiv;
                  }

                  var makeDefaultDiv = domConstruct.create("span", {
                    class: "esriMapsAnalystXSelectableTreeLabel makeDefaultLink",
                    innerHTML: self.nls.makeDefault,
                    style: "margin-left: 10px; display: none"
                  }, returnDiv);

                  var unselectDefaultDiv = domConstruct.create("span", {
                    class: "esriMapsAnalystXSelectableTreeLabel makeDefaultLink",
                    innerHTML: self.nls.removeDefault,
                    style: "margin-left: 10px; display: none"
                  }, returnDiv);

                  node.makeDefaultDiv = makeDefaultDiv;
                  node.unselectDefaultDiv = unselectDefaultDiv;

                  on(makeDefaultDiv, "click", function(event) {
                    event.stopPropagation();

                    if (self.currentDefaultInfographicDiv)
                      domClass.remove(self.currentDefaultInfographicDiv, "default");

                    domClass.add(nodeLabelDiv, "default");

                    self.currentDefaultInfographicID = node.value;
                    self.currentDefaultInfographicDiv = nodeLabelDiv;

                    domStyle.set(makeDefaultDiv, "display", "none");
                    domStyle.set(unselectDefaultDiv, "display", "");
                  });

                  on(unselectDefaultDiv, "click", function(event) {
                    event.stopPropagation();

                    if (self.currentDefaultInfographicDiv)
                      domClass.remove(self.currentDefaultInfographicDiv, "default");

                    self.currentDefaultInfographicID = "";
                    self.currentDefaultInfographicDiv = null;

                    domStyle.set(unselectDefaultDiv, "display", "none");
                    domStyle.set(makeDefaultDiv, "display", "");
                  });

                  on(td, mouse.enter, function(){
                    if (!node.selected)
                      return;

                    if (node.value !== self.currentDefaultInfographicID) {
                      domStyle.set(makeDefaultDiv, "display", "");
                    }
                    else {
                      domStyle.set(unselectDefaultDiv, "display", "");
                    }
                  });
                
                  on(td, mouse.leave, function(){
                    domStyle.set(makeDefaultDiv, "display", "none");
                    domStyle.set(unselectDefaultDiv, "display", "none");
                  });
                }

                return returnDiv;
              }
          }, self.infographicTreeGridContainer);
        }

        self.own(on(self.infographicsTreeGrid, "SelectionChanged", function(args) {
          
          // If category was selected
          if (args.toggledTreeNode && args.toggledTreeNode.deepness == 0) {
            if (!args.toggledTreeNode.selected) {
              // Unselect default if it is in the child's list
              array.forEach(args.toggledTreeNode.children, function(child) {
                if (child.value === self.currentDefaultInfographicID) {
                  if (self.currentDefaultInfographicDiv) {
                    domClass.remove(self.currentDefaultInfographicDiv, "default");
                    self.currentDefaultInfographicID = "";
                    self.currentDefaultInfographicDiv = null;
                  }
                }
              });
            }
            
            return;
          }
            

          // If current default Infographic is unselected
          if (args.toggledTreeNode && !args.toggledTreeNode.selected && args.toggledTreeNode.value === self.currentDefaultInfographicID) {
            if (self.currentDefaultInfographicDiv) {
              domClass.remove(self.currentDefaultInfographicDiv, "default");
              self.currentDefaultInfographicID = "";
              self.currentDefaultInfographicDiv = null;
              domStyle.set(args.toggledTreeNode.makeDefaultDiv, "display", "none");
              domStyle.set(args.toggledTreeNode.unselectDefaultDiv, "display", "none");

            }
          }
          else if (args.toggledTreeNode && !args.toggledTreeNode.selected) {
            domStyle.set(args.toggledTreeNode.makeDefaultDiv, "display", "none");
          }
          else if (args.toggledTreeNode && args.toggledTreeNode.selected) {
            domStyle.set(args.toggledTreeNode.makeDefaultDiv, "display", "");
          }
        }));

        // Set disabled reports if they are already configured
        var configIndex = -1;
        array.forEach(self.config.countryConfig, function (countryConfig, index) {
          if (countryConfig.countryID == countryID) {
            configIndex = index;
          }
        });

        self.currentDefaultInfographicID = "";
        self.currentDefaultReportID = "";

        if (configIndex != -1) {

          // Set Default Infographic/Report ID
          self.currentDefaultInfographicID = self.config.countryConfig[configIndex].defaultInfographicID;
          self.currentDefaultReportID = self.config.countryConfig[configIndex].defaultReportID;

          if (!self.config.countryConfig[configIndex].allowAllEsriInfographics) {
            array.forEach(reports[0].children, function (child) {
              if (!array.some(self.config.countryConfig[configIndex].enabledEsriInfographics, function(enabledID) { return child.value === enabledID })) {
                child.selected = false;
              }
            });
          }

          if (!self.config.countryConfig[configIndex].allowAllOrgInfographics) {
            array.forEach(reports[1].children.concat(reports[2].children), function (child) {
              if (!array.some(self.config.countryConfig[configIndex].enabledOrgInfographics, function(enabledID) { return child.value === enabledID })) {
                child.selected = false;
              }
            });
          }
        }

        self.infographicsTreeGrid.tree.clear();
        self.infographicsTreeGrid.tree.addNodes(reports);

      });

      // Set Reports Tree
      ReportUtil.getAvailableClassicReports(countryID).then(function (reports) {
        array.forEach(reports, function (reportParent) {
          array.forEach(reportParent.children, function (report) {
            report.selected = true;
          });
        });

        if (!self.reportsTreeGrid) {
          self.reportsTreeGrid = new SelectableTreeGrid({
            tree: new SelectableTree(reports),
            showHeader: false,
            // Overriden to add "Default"
            _renderLabelNode: function (node, td) {
              var returnDiv = domConstruct.create("div");
              var nodeLabelDiv = domConstruct.create("div", {
                class: "esriMapsAnalystXSelectableTreeLabel TrimWithEllipses",
                innerHTML: this.getLabel(node),
                style: "float: left"
              }, returnDiv);

              if (node.deepness === 1) {

                if (node.value === self.currentDefaultReportID) {
                  domClass.add(nodeLabelDiv, "default");
                  self.currentDefaultReportDiv = nodeLabelDiv;
                }

                var makeDefaultDiv = domConstruct.create("span", {
                  class: "esriMapsAnalystXSelectableTreeLabel makeDefaultLink",
                  innerHTML: self.nls.makeDefault,
                  style: "margin-left: 10px; display: none"
                }, returnDiv);

                var unselectDefaultDiv = domConstruct.create("span", {
                  class: "esriMapsAnalystXSelectableTreeLabel makeDefaultLink",
                  innerHTML: self.nls.removeDefault,
                  style: "margin-left: 10px; display: none"
                }, returnDiv);

                node.makeDefaultDiv = makeDefaultDiv;
                node.unselectDefaultDiv = unselectDefaultDiv;

                on(makeDefaultDiv, "click", function(event) {
                  event.stopPropagation();

                  if (self.currentDefaultReportDiv)
                    domClass.remove(self.currentDefaultReportDiv, "default");

                  domClass.add(nodeLabelDiv, "default");

                  self.currentDefaultReportID = node.value;
                  self.currentDefaultReportDiv = nodeLabelDiv;

                  domStyle.set(makeDefaultDiv, "display", "none");
                  domStyle.set(unselectDefaultDiv, "display", "");
                });

                on(unselectDefaultDiv, "click", function(event) {
                  event.stopPropagation();

                  if (self.currentDefaultReportDiv)
                    domClass.remove(self.currentDefaultReportDiv, "default");

                  self.currentDefaultReportID = "";
                  self.currentDefaultReportDiv = null;

                  domStyle.set(unselectDefaultDiv, "display", "none");
                  domStyle.set(makeDefaultDiv, "display", "");
                });

                on(td, mouse.enter, function(){
                  if (!node.selected)
                    return;

                  if (node.value !== self.currentDefaultReportID) {
                    domStyle.set(makeDefaultDiv, "display", "");
                  }
                  else {
                    domStyle.set(unselectDefaultDiv, "display", "");
                  }
                });
              
                on(td, mouse.leave, function(){
                  domStyle.set(makeDefaultDiv, "display", "none");
                  domStyle.set(unselectDefaultDiv, "display", "none");
                });
              }

              return returnDiv;
            }
          }, self.reportTreeGridContainer);
        }

        self.own(on(self.reportsTreeGrid, "SelectionChanged", function(args) {

          // If category was selected
          if (args.toggledTreeNode && args.toggledTreeNode.deepness == 0) {
            if (!args.toggledTreeNode.selected) {
              // Unselect default if it is in the child's list
              array.forEach(args.toggledTreeNode.children, function(child) {
                if (child.value === self.currentDefaultReportID) {
                  if (self.currentDefaultReportDiv) {
                    domClass.remove(self.currentDefaultReportDiv, "default");
                    self.currentDefaultReportID = "";
                    self.currentDefaultReportDiv = null;
                  }
                }
              });
            }
            
            return;
          }

          // If current default Report is unselected
          if (args.toggledTreeNode && !args.toggledTreeNode.selected && args.toggledTreeNode.value === self.currentDefaultReportID) {
            if (self.currentDefaultReportDiv) {
              domClass.remove(self.currentDefaultReportDiv, "default");
              self.currentDefaultReportID = "";
              self.currentDefaultReportDiv = null;
              domStyle.set(args.toggledTreeNode.makeDefaultDiv, "display", "none");
              domStyle.set(args.toggledTreeNode.unselectDefaultDiv, "display", "none");

            }
          }
          else if (args.toggledTreeNode && !args.toggledTreeNode.selected) {
            domStyle.set(args.toggledTreeNode.makeDefaultDiv, "display", "none");
          }
          else if (args.toggledTreeNode && args.toggledTreeNode.selected) {
            domStyle.set(args.toggledTreeNode.makeDefaultDiv, "display", "");
          }
        }));

        // Set disabled reports if they are already configured
        var configIndex = -1;
        array.forEach(self.config.countryConfig, function (countryConfig, index) {
          if (countryConfig.countryID == countryID) {
            configIndex = index;
          }
        });

        if (configIndex != -1) {

          if (!self.config.countryConfig[configIndex].allowAllEsriReports) {
            array.forEach(reports[0].children, function (child) {
              if (!array.some(self.config.countryConfig[configIndex].enabledEsriReports, function(enabledID) { return child.value === enabledID })) {
                child.selected = false;
              }
            });
          }

          if (!self.config.countryConfig[configIndex].allowAllOrgReports) {
            array.forEach(reports[1].children.concat(reports[2].children), function (child) {
              if (!array.some(self.config.countryConfig[configIndex].enabledOrgReports, function(enabledID) { return child.value === enabledID })) {
                child.selected = false;
              }
            });
          }
        }

        self.reportsTreeGrid.tree.clear();
        self.reportsTreeGrid.tree.addNodes(reports);

      });
    },

    _getClassicReportId: function (report) {
      if (report.value && report.value.itemid)
        return report.value.itemid;
      else
        return report.value;
    },

    // Returns an array of selected (enabled) reports/infographics
    _getEnabledReports: function (reports) {
      var enabledIDs = [];

      array.forEach(reports, function (report) {
        if (report.selected)
          // Handle Custom Classic Reports
          if (report.value && report.value.itemid)
            enabledIDs.push(report.value.itemid)
          else
            enabledIDs.push(report.value)
      });

      return enabledIDs;
    },

    _setRingDTWTConfig: function () {
      this.config.ringDefaults = this._getRadii(this.ringsBufferRadii1, this.ringsBufferRadii2, this.ringsBufferRadii3);
      this.config.driveTimeDefaults = this._getRadii(this.driveTimeBufferRadii1, this.driveTimeBufferRadii2, this.driveTimeBufferRadii3);
      this.config.walkTimeDefaults = this._getRadii(this.walkTimeBufferRadii1, this.walkTimeBufferRadii2, this.walkTimeBufferRadii3);
      this.config.ringUnitDefault = this.ringsBufferUnits.get("value");
      this.config.driveTimeUnitDefault = this.driveTimeBufferUnits.get("value");
      this.config.walkTimeUnitDefault = this.walkTimeBufferUnits.get("value");
      this.config.ringDisabled = this.disabledRingsOption.checked;
      this.config.driveTimeDisabled = this.disabledDriveTimeOption.checked;
      this.config.walkTimeDisabled = this.disabledWalkTimeOption.checked;

      this.config.infographicsDisabled = this.disabledInfographicsOption.checked;
      this.config.reportsDisabled = this.disabledReportsOption.checked;
    },

    _loadRingDTWTConfig: function () {
      this._setRadii(this.ringsBufferRadii1, this.ringsBufferRadii2, this.ringsBufferRadii3, this.config.ringDefaults);
      this.ringsBufferUnits.set("value", this.config.ringUnitDefault);
      this.disabledRingsOption.setChecked(this.config.ringDisabled);

      this._setRadii(this.driveTimeBufferRadii1, this.driveTimeBufferRadii2, this.driveTimeBufferRadii3, this.config.driveTimeDefaults);
      this.driveTimeBufferUnits.set("value", this.config.driveTimeUnitDefault);
      this.disabledDriveTimeOption.setChecked(this.config.driveTimeDisabled);

      this._setRadii(this.walkTimeBufferRadii1, this.walkTimeBufferRadii2, this.walkTimeBufferRadii3, this.config.walkTimeDefaults);
      this.walkTimeBufferUnits.set("value", this.config.walkTimeUnitDefault);
      this.disabledWalkTimeOption.setChecked(this.config.walkTimeDisabled);

      this.disabledInfographicsOption.setChecked(this.config.infographicsDisabled);
      this.disabledReportsOption.setChecked(this.config.reportsDisabled);
    },

    _setInfographicExportOptions: function() {
      this.config.exportInfographicsPrintOption = this.exportPrintOption.checked;
      this.config.exportInfographicsImageOption = this.exportImageOption.checked;
      this.config.exportInfographicsPDFOption = this.exportPDFOption.checked;
      this.config.exportInfographicsDynamicHTMLOption = this.exportDynamicHTMLOption.checked;
    },

    _loadInfographicExportOptions: function() {
      this.exportPrintOption.setChecked(this.config.exportInfographicsPrintOption);
      this.exportImageOption.setChecked(this.config.exportInfographicsImageOption);
      this.exportPDFOption.setChecked(this.config.exportInfographicsPDFOption);
      this.exportDynamicHTMLOption.setChecked(this.config.exportInfographicsDynamicHTMLOption);
    },

    _setFirstPageOptions: function() {
      this.config.searchTextBoxOption = this.searchTextBoxOption.checked;
      this.config.dropPinOption = this.dropPinOption.checked;
      this.config.drawPolygonOption = this.drawPolygonOption.checked;
      this.config.drawFreehandPolygonOption = this.drawFreehandPolygonOption.checked;
    },

    _loadFirstPageOptions: function() {
      this.searchTextBoxOption.setChecked(this.config.searchTextBoxOption);
      this.dropPinOption.setChecked(this.config.dropPinOption);
      this.drawPolygonOption.setChecked(this.config.drawPolygonOption);
      this.drawFreehandPolygonOption.setChecked(this.config.drawFreehandPolygonOption);
    },

    _getRadii: function (textBox1, textBox2, textBox3) {
      var value1 = textBox1.get("value"),
        value2 = textBox2.get("value"),
        value3 = textBox3.get("value"),
        returnRadii = [];

      if (value1 != "")
        returnRadii.push(value1);

      if (value2 != "")
        returnRadii.push(value2);

      if (value3 != "")
        returnRadii.push(value3);

      return returnRadii;
    },

    _setRadii: function (textBox1, textBox2, textBox3, radii) {
      if (radii.length > 0)
        textBox1.set("value", radii[0]);
      else
        textBox1.set("value", "");

      if (radii.length > 1)
        textBox2.set("value", radii[1]);
      else
        textBox2.set("value", "");

      if (radii.length > 2)
        textBox3.set("value", radii[2]);
      else
        textBox3.set("value", "");
    },

    _validateRingDTWT: function () {
      // Validate Invalid Values
      var valid = true,
        returnValid = true,
        tabChanged = false;

      returnValid = valid = ValidationUtil.validateInvalidValues(this.ringsBufferRadii1, this.ringsBufferRadii2, this.ringsBufferRadii3, this.ringValidationErrorMessage, this.nls.thisEntryIsNotValid);

      if (!valid) {
        this.tab.selectTab(this.nls.rings);
        tabChanged = true;
      }

      valid = ValidationUtil.validateInvalidValues(this.driveTimeBufferRadii1, this.driveTimeBufferRadii2, this.driveTimeBufferRadii3, this.driveTimeValidationErrorMessage, this.nls.thisEntryIsNotValid)
      returnValid = returnValid && valid;

      if (!valid && !tabChanged) {
        this.tab.selectTab(this.nls.driveTime);
        tabChanged = true;
      }

      valid = ValidationUtil.validateInvalidValues(this.walkTimeBufferRadii1, this.walkTimeBufferRadii2, this.walkTimeBufferRadii3, this.walkTimeValidationErrorMessage, this.nls.thisEntryIsNotValid)
      returnValid = returnValid && valid;

      if (!valid && !tabChanged) {
        this.tab.selectTab(this.nls.walkTime);
        tabChanged = true;
      }

      if (!returnValid)
        return returnValid;

      // If all inputs are valid, validate Min/Max values
      tabChange = false;
      returnValid = valid = ValidationUtil.validateMinMaxValues(this.ringsBufferRadii1, this.ringsBufferRadii2, this.ringsBufferRadii3, ValidationUtil.MIN_RINGS_VALUE, ValidationUtil.MAX_RINGS_VALUE, this.ringValidationErrorMessage, this.nls.invalidValueRing)

      if (!valid) {
        this.tab.selectTab(this.nls.rings);
        tabChanged = true;
      }

      valid = ValidationUtil.validateMinMaxValues(this.driveTimeBufferRadii1, this.driveTimeBufferRadii2, this.driveTimeBufferRadii3, ValidationUtil.MIN_DTWT_VALUE, ValidationUtil.MAX_DTWT_VALUE, this.driveTimeValidationErrorMessage, this.nls.invalidValueDTWT)
      returnValid = returnValid && valid;

      if (!valid && !tabChanged) {
        this.tab.selectTab(this.nls.driveTime);
        tabChanged = true;
      }

      valid = ValidationUtil.validateMinMaxValues(this.walkTimeBufferRadii1, this.walkTimeBufferRadii2, this.walkTimeBufferRadii3, ValidationUtil.MIN_DTWT_VALUE, ValidationUtil.MAX_DTWT_VALUE, this.walkTimeValidationErrorMessage, this.nls.invalidValueDTWT)
      returnValid = returnValid && valid;

      if (!valid && !tabChanged) {
        this.tab.selectTab(this.nls.walkTime);
        tabChanged = true;
      }

      return returnValid;
    },

    initializeNewConfigValues: function(config) {
      /* New config values in 8.3
      "exportInfographicsPrintOption": true,
      "exportInfographicsImageOption": true,
      "exportInfographicsPDFOption": true,
      "exportInfographicsDynamicHTMLOption": true,
      "firstPageText": "",
      "searchTextBoxOption": true,
      "dropPinOption": true,
      "drawPolygonOption": true,
      "drawFreehandPolygonOption": true,
      */

     if (typeof config.exportInfographicsPrintOption === "undefined")
     config.exportInfographicsPrintOption = true;

   if (typeof config.exportInfographicsImageOption === "undefined")
     config.exportInfographicsImageOption = true;

   if (typeof config.exportInfographicsPDFOption === "undefined")
     config.exportInfographicsPDFOption = true;

   if (typeof config.exportInfographicsDynamicHTMLOption === "undefined")
     config.exportInfographicsDynamicHTMLOption = true;

   if (typeof config.firstPageText === "undefined")
     config.firstPageText = this.nls.defaultFirstPageText;

   if (typeof config.searchTextBoxOption === "undefined")
     config.searchTextBoxOption = true;

   if (typeof config.dropPinOption === "undefined")
     config.dropPinOption = true;

   if (typeof config.drawPolygonOption === "undefined")
     config.drawPolygonOption = true;

   if (typeof config.drawFreehandPolygonOption === "undefined")
     config.drawFreehandPolygonOption = true;

    }
  });

  return dfd;

});
