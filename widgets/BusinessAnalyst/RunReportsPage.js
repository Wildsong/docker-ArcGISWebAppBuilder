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
  "dojo/_base/lang",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/query",
  "dojo/when",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase",
  "dijit/_WidgetsInTemplateMixin",

  "esri/geometry/webMercatorUtils",

  "esri/dijit/geoenrichment/SelectableTree",

  "esri/dijit/geoenrichment/ReportPlayer/dataProvider/supportClasses/GEUtil",

  "esri/dijit/geoenrichment/ReportPlayer/ReportPlayer",
  "esri/dijit/geoenrichment/ReportPlayer/PlayerResizeModes",
  "esri/dijit/geoenrichment/ReportPlayer/PlayerThemes",
  "esri/dijit/geoenrichment/ReportPlayer/DataProviderGE",
  "esri/dijit/geoenrichment/ReportPlayer/PlayerCommands",
  "esri/dijit/geoenrichment/_WizardPage",

  "esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ReportTemplateTypes",

  "./utils/GEUtil",
  "./utils/ReportUtil",

  "./esriAnalystX/widgets/Selects/FilteringSelectTree",

  "dojo/text!./RunReportsPage.html",

  "jimu/dijit/TabContainer3",

  "jimu/utils"
],
function (array, declare, lang, domClass, domConstruct, domStyle, query, when, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, webMercatorUtils, SelectableTree, ReportPlayerGEUtil, ReportPlayer, PlayerResizeModes, PlayerThemes, DataProviderGE, PlayerCommands,
  _WizardPage, ReportTemplateTypes, GEUtil, ReportUtil, FilteringSelectTree, template, TabContainer, utils) {
  return declare([_WidgetBase, _TemplatedMixin, _WizardPage, _WidgetsInTemplateMixin], {

    templateString: template,
    infographicsTabHidden: false,
    reportsTabHidden: false,

    _infograpicReports: null,

    // Used to determine if we are to use the "Light" theme for the ReportPlayer
    _configForLightTheme: [
      {
        name: "DashboardTheme",
        style: "light"
      }
    ],

    postCreate: function () {
      this.inherited(arguments);

      this.tab = new TabContainer({
        tabs: [{
          title: this.nls.infographics,
          content: this.infographicsContentPane
        }, {
          title: this.nls.reports,
          content: this.reportsContentPane
        }],
        selected: this.nls.infographics
      });
      this.tab.placeAt(this.runReportTabContainer);
      this.tab.startup();
    },

    startup: function () {
      this.inherited(arguments);

      if (this._started) {
        return;
      }
    },

    loadReportsInfographicsForCountry: function (countryID) {

      var self = this;

      when(ReportUtil.getAvailableClassicReports(countryID, this.config), function (reports) {

        var singleReportID = self._getSingleReportID(reports);

        var countryConfig = self._getCountryConfig(self.config, countryID);
        if (countryConfig && countryConfig.defaultReportID) {
          singleReportID = countryConfig.defaultReportID;
        }

        if (!self.filteredReportDropDown) {

          self.filteredReportDropDown = new FilteringSelectTree({
            name: "filteredReportSelect",
            tree: new SelectableTree(reports),
            defaultExpand: singleReportID ? self._getDefaultExpandedTreeForSelectedReport(reports, singleReportID) : self._getDefaultExpandedTree(reports),
            placeHolder: self.nls.selectReport,
            onChange: function (event) {
              self._enableDisableButton(self.runReportBtn, event);
            }
          }, self.reportFilteringSelectDropDownContainer);

          self.filteredReportDropDown.startup();
        }
        else {
          self.filteredReportDropDown.set("tree", new SelectableTree(reports));
        }

        if (singleReportID)
          self.filteredReportDropDown.set("value", singleReportID);

        // Hide if disabled or if there are no reports
        self.reportsTabHidden = self.config.reportsDisabled || !self._areReportsAvailable(reports);
      });

      when(ReportUtil.getAvailableInfographicReports(countryID, this.config), function (reports) {

        var singleReportID = self._getSingleReportID(reports);

        var countryConfig = self._getCountryConfig(self.config, countryID);
        if (countryConfig && countryConfig.defaultInfographicID) {
          singleReportID = countryConfig.defaultInfographicID;
        }

        if (!self.infographicDropDown) {
          self.infographicDropDown = new FilteringSelectTree({
            name: "filteredInfographicReportSelect",
            tree: new SelectableTree(reports),
            defaultExpand: singleReportID ? self._getDefaultExpandedTreeForSelectedReport(reports, singleReportID) : self._getDefaultExpandedTree(reports),
            placeHolder: self.nls.selectTemplate,
            onChange: function (event) {
              self._enableDisableButton(self.runInfographicBtn, event);
            }
          }, self.infographicDropDownContainer);

          self.infographicDropDown.startup();
        }
        else {
          self.infographicDropDown.set("tree", new SelectableTree(reports));
        }

        if (singleReportID)
          self.infographicDropDown.set("value", singleReportID);

        // Hide if disabled or if there are no infographics
        self.infographicsTabHidden = self.config.infographicsDisabled || !self._areReportsAvailable(reports);

        self._infograpicReports = reports;
      });
    },

    _getCountryConfig: function(config, countryID) {
      var configIndex = -1;
      array.forEach(config.countryConfig, function (countryConfig, index) {
        if (countryConfig.countryID == countryID) {
          configIndex = index;
        }
      });

      if (configIndex != -1) {
        return config.countryConfig[configIndex];
      }

      return null;
    },

    _areReportsAvailable: function (reports) {
      if (reports.length == 0)
        return false;

      var returnVal = false;

      array.forEach(reports, function (reportSection) {
        if (reportSection.children.length > 0)
          returnVal = true;
      });

      return returnVal;
    },

    // Returns the first available parent to expand the drop down list by default.
    _getDefaultExpandedTree: function(reports) {
      if (reports.length == 0)
        return { esriReports: true};

      var returnVal = {};
      returnVal[reports[0].value] = true;
      return returnVal;
    },

    // Returns the tree parent for the selected report so it can be by default expanded.
    _getDefaultExpandedTreeForSelectedReport: function(reports, reportID) {
      if (reports.length == 0)
        return { esriReports: true};

      returnVal = {};

      array.forEach(reports, function (reportSection) {
        array.forEach(reportSection.children, function(report) {
          if (report.value === reportID)
            returnVal[reportSection.value] = true;
        });
      });

      return returnVal;
    },

    // Returns the ID if a single report is configured so it can be set, if 0 or more than 1 report is configured, false is returned
    _getSingleReportID: function(reports) {
      if (reports.length != 1)
        return false;

      var returnVal = false;

      array.forEach(reports, function (reportSection) {
        if (reportSection.children.length === 1)
          returnVal = reportSection.children[0].value;
      });

      return returnVal;
    },

    refresh: function () {
      this._hideOrShowTabs();
    },

    // Hides or displays the Infographics/Reports tabs depending upon if there are Infographics/Reports available
    _hideOrShowTabs: function () {

      this._hideOrShowTab(this.nls.infographics, this.infographicsTabHidden);

      this._hideOrShowTab(this.nls.reports, this.reportsTabHidden);

      if (!this.infographicsTabHidden) 
        this.tab.selectTab(this.nls.infographics);
      else
        this.tab.selectTab(this.nls.reports);
    },

    _hideOrShowTab: function(title, hide) {

      var tdItems = query('td', this.tab.tabTr);

      var tdToHide;
      var tdSelected = array.some(tdItems, function(tdItem){
        if(tdItem.label === title){
          tdToHide = tdItem;
          return true;
        }
      });

      if(tdSelected){
        domStyle.set(tdToHide, "display", hide ? "none" : "");
      }
    },

    runInfographic: function () {

      // If button is disabled a report is already being run
      if (domClass.contains(this.runInfographicBtn, "jimu-state-disabled"))
        return;

      var self = this,
        report = this.infographicDropDown.get("value");

      this.reportPlayer && this.reportPlayer.destroy();
      this.playerDiv && domConstruct.destroy(this.playerDiv);

      this.playerDiv = domConstruct.create("div", null, document.body);

      var dataProvider = new DataProviderGE();
      
      if (this.config.exportInfographicsPrintOption)
        dataProvider.registerCommand(PlayerCommands.PRINT);
      
      if (this.config.exportInfographicsPDFOption)
        dataProvider.registerCommand(PlayerCommands.PDF);

      if (this.config.exportInfographicsImageOption)
        dataProvider.registerCommand(PlayerCommands.IMAGE);

      if (this.config.exportInfographicsDynamicHTMLOption)      
        dataProvider.registerCommand(PlayerCommands.DYNAMIC_HTML);

      var isMobile = utils.isMobileUa();

      this.reportPlayer = new ReportPlayer({
        isSlidesView: isMobile ? true : false,
        theme: this._useLightTheme() ? PlayerThemes.LIGHT : PlayerThemes.DARK,
        dataProvider: dataProvider,
        resizeMode: PlayerResizeModes.FIT_WINDOW,
        showCloseButton: true,
        config: {
          esriDijitCssUrl: "https://js.arcgis.com/3.35/dijit/themes/claro/claro.css",
          esriCssUrl: "https://js.arcgis.com/3.35/esri/css/esri.css",
          playerSourceRootUrl: "https://js.arcgis.com/3.35/"
        },
        onClose: function () {
          self.reportPlayer.destroy();
          domConstruct.destroy(self.playerDiv);
        }
      }).placeAt(this.playerDiv);

      var setValueFirstTime = true;

      // Add select drop down to Report Player
      var reportPlayerInfographicDropDown = new FilteringSelectTree({
        name: "filteredInfographicReportSelect",
        tree: new SelectableTree(this._infograpicReports),
        defaultExpand: self._getDefaultExpandedTreeForSelectedReport(this._infograpicReports, report),
        placeHolder: self.nls.selectTemplate,
        value: report,
        onChange: function (event) {
          if (!setValueFirstTime) {
            self.infographicDropDown.set("value", event);
            runPlayer(event);
          }
          else
            setValueFirstTime = false;
        }
      });

      // Add "jimu-main-background" to player toolbar, so background color matches WAB main background color.  Only applicable for "Dark" theme
      if (!this._useLightTheme())
        domClass.add(this.reportPlayer.playerToolbar.domNode, "jimu-main-background");

      reportPlayerInfographicDropDown.startup();
      reportPlayerInfographicDropDown.set("value", report);

      this.reportPlayer.playerToolbar.addInfographicsSelect(reportPlayerInfographicDropDown);

      var runPlayer = function (reportID) {
        var analysisAreas = [];

        // Point
        if (self.wizard.selectedPoint.long) {

          array.forEach(self.wizard.selectedPoint.tradeAreas, function (tradeArea, index) {
            var analysisArea = {};
            analysisArea.name = tradeArea.name;
            analysisArea.shortName = tradeArea.shortName
            analysisArea.feature = tradeArea.graphic;

            if (typeof analysisArea.feature.attributes === "undefined") {
              if (typeof self.wizard.selectedPoint.attributes !== "undefined") {
                analysisArea.feature.attributes = self.wizard.selectedPoint.attributes;
              }
              else {
                analysisArea.feature.attributes = {};
              }
            }

            analysisArea.feature.attributes.STORE_LONG = self.wizard.selectedPoint.long;
            analysisArea.feature.attributes.STORE_LAT = self.wizard.selectedPoint.lat;
            analysisArea.feature.attributes.radiusIndex = index;

            analysisAreas.push(analysisArea);
          });
        }
        // Polygon
        else if (self.wizard.selectedPolygon.geometry) {
          var analysisAreas = [];
          var analysisArea = {};

          if (self.isPolygonFIPS(self.wizard.selectedPolygon)) {
            analysisArea = self.GetFIPSAnalysisArea(self.wizard.selectedPolygon);
          }
          else {
            analysisArea.name = self.wizard.selectedPolygon.locationName;
            analysisArea.shortName = self.wizard.selectedPolygon.locationName;
            analysisArea.feature = self.wizard.selectedPolygon.feature;
          }

          analysisAreas.push(analysisArea);
        }

        self.reportPlayer.playReport({
          portalUrl: portalUrl,
          countryID: self.wizard.selectedCountryID,
          reportID: reportID,
          analysisAreas: analysisAreas
        });
      };

      // Set the Geoenrichment URL if it's configured for a proxy url
      when(GEUtil.getGEProxyUrl(this.appConfig), function(proxyGEUrl) {
        if (proxyGEUrl) {
          ReportPlayerGEUtil.setGeoenrichmentUrl(proxyGEUrl);

          // This forces creation of the singleton JS API GEUtil to ensure it has the correct proxied URL.
          var reportPlayerGEUtil = ReportPlayerGEUtil.getClient();
        }

        runPlayer(report);
      });
      
    },

    // Determines if the selected Polygon is a FIPS polygon if it has a FIPS attribute field
    isPolygonFIPS: function(selectedPolygon) {
      if ((selectedPolygon && selectedPolygon.feature && selectedPolygon.feature.attributes && selectedPolygon.feature.attributes.FIPS) ||
          (selectedPolygon && selectedPolygon.feature && selectedPolygon.feature.attributes && selectedPolygon.feature.attributes.STATE_FIPS)) {
        return true;
      }

      return false;
    },

    // Returns the Analysis Area for a FIPS polygon so it can be run as a Standard Geography Site
    GetFIPSAnalysisArea: function(selectedPolygon) {

      var analysisArea = {
        geographies: []
      };

      var geography = {};
      geography.sourceCountry = "US";

      var layer = "";

      if (selectedPolygon.feature.attributes.FIPS) {
        switch(selectedPolygon.feature.attributes.FIPS.length) {
          case 2:
            layer = "US.States";
            break;
          case 5:
            layer = "US.Counties";
            break;
          case 11:
            layer = "US.Tracts";
            break;
        }
      }
      else if (selectedPolygon.feature.attributes.STATE_FIPS) {
        layer = "US.States";
      }

      geography.levelId = layer;
      geography.id = selectedPolygon.feature.attributes.FIPS ? selectedPolygon.feature.attributes.FIPS.toString() : selectedPolygon.feature.attributes.STATE_FIPS.toString();
      geography.attributes = selectedPolygon.feature.attributes;

      // Add STORE_LONG, STORE_LAT, STORE_ID
      var centroid = selectedPolygon.geometry.getCentroid();
      var longLat = webMercatorUtils.xyToLngLat(centroid.x, centroid.y);

      geography.attributes.STORE_ID = "0";
      geography.attributes.STORE_LONG = longLat[0].toString();
      geography.attributes.STORE_LAT = longLat[1].toString();

      analysisArea.geographies.push(geography);

      return analysisArea;
    },

    // Returns the Study Area for a FIPS polygon so it can be run as a Standard Geography Site in Classic Reports
    GetFIPSStudyArea: function(selectedPolygon) {

      var studyArea = {
      };

      studyArea.sourceCountry = "US";

      var layer = "";

      if (selectedPolygon.feature.attributes.FIPS) {
        switch(selectedPolygon.feature.attributes.FIPS.length) {
          case 2:
            layer = "US.States";
            break;
          case 5:
            layer = "US.Counties";
            break;
          case 11:
            layer = "US.Tracts";
            break;
        }
      }
      else if (selectedPolygon.feature.attributes.STATE_FIPS) {
        layer = "US.States";
      }

      studyArea.layer = layer;
      studyArea.ids = [selectedPolygon.feature.attributes.FIPS ? selectedPolygon.feature.attributes.FIPS.toString() : selectedPolygon.feature.attributes.STATE_FIPS.toString()];
      studyArea.attributes = selectedPolygon.feature.attributes;


      return studyArea;
    },

    // Determines if we should use the "Light" theme in the Report Player
    // It should be used when there is a white/light background that's configured for WAB
    _useLightTheme: function () {

      var returnVal = false,
      appConfig = self.getAppConfig();

      array.forEach(this._configForLightTheme, function (config) {
        if (appConfig && appConfig.theme && appConfig.theme.name == config.name) {
          if (appConfig.theme.styles && appConfig.theme.styles.length > 0) {
            array.forEach(appConfig.theme.styles, function(style) {
              if (style == config.style) {
                returnVal = true;
              }
            });
          }
        }
      });

      // If header is white, use "Light" theme
      if (appConfig && appConfig.theme && appConfig.theme.customStyles && appConfig.theme.customStyles.mainBackgroundColor &&  appConfig.theme.customStyles.mainBackgroundColor.toUpperCase() == "#FFFFFF") {
        returnVal = true;
      }

      return returnVal;
    },

    runReport: function () {
      // If button is disabled a report is already being run
      if (domClass.contains(this.runReportBtn, "jimu-state-disabled"))
        return;

      domClass.add(this.runReportBtn, "jimu-state-disabled");

      this.shelter.show();

      var self = this;

      if (this.wizard.selectedPoint.long) {
        this.runReportForPoint().then(function () {
          self.shelter.hide();
          domClass.remove(self.runReportBtn, "jimu-state-disabled");
        }).otherwise(function () {
          self.shelter.hide();
          domClass.remove(self.runReportBtn, "jimu-state-disabled");
        });
      }
      else if (this.wizard.selectedPolygon.geometry) {
        this.runReportForPolygon().then(function () {
          self.shelter.hide();
          domClass.remove(self.runReportBtn, "jimu-state-disabled");
        }).otherwise(function () {
          self.shelter.hide();
          domClass.remove(self.runReportBtn, "jimu-state-disabled");
        });
      }
    },

    // Enables or disabled the run report/infographic button
    _enableDisableButton: function (runButton, value) {
      if (typeof value === "string" && value !== "None") {
        domClass.remove(runButton, "jimu-state-disabled");
      }
      else {
        domClass.add(runButton, "jimu-state-disabled");
      }
    },

    runReportForPoint: function () {

      var self = this;

      var params = {
        studyAreas: []
      };

      var studyArea = {
        featureSet: {
          fields: [
            {
              name: "OBJECTID",
              alias: "Object ID",
              type: "esriFieldTypeOID"
            },
            {
              name: "STORE_ID",
              alias: "STORE_ID",
              type: "esriFieldTypeString",
              length: 1,
              nullable: true
            },
            {
              name: "STORE_LONG",
              alias: "STORE_LONG",
              type: "esriFieldTypeDouble"
            },
            {
              name: "STORE_LAT",
              alias: "STORE_LAT",
              type: "esriFieldTypeDouble"
            },
            {
              name: "AREA_DESC",
              alias: "AREA_DESC",
              type: "esriFieldTypeString",
              length: 7,
              nullable: true
            },
            {
              name: "AREA_DESC2",
              alias: "AREA_DESC2",
              type: "esriFieldTypeString",
              length: 19,
              nullable: true
            }
          ],
          spatialReference: this.map.spatialReference.toJson(),
          geometryType: "esriGeometryPolygon",
          features: []
        }
      };

      array.forEach(this.wizard.selectedPoint.tradeAreas, function (tradeArea) {
        var feature = {};
        feature.geometry = tradeArea.graphic.geometry;

        if (tradeArea.graphic.attributes)
          feature.attributes = tradeArea.graphic.attributes
        else if (self.wizard.selectedPoint.attributes)
          feature.attributes = lang.clone(self.wizard.selectedPoint.attributes);

        if (!feature.attributes)
          feature.attributes = {};

        // Add Classic Report attributes
        feature.attributes.OBJECTID = 1;
        feature.attributes.STORE_ID = "1";
        feature.attributes.STORE_LONG = self.wizard.selectedPoint.long;
        feature.attributes.STORE_LAT = self.wizard.selectedPoint.lat;
        feature.attributes.AREA_DESC = tradeArea.AREA_DESC;
        feature.attributes.AREA_DESC2 = tradeArea.AREA_DESC2;

        studyArea.featureSet.features.push(feature);
      });

      params.studyAreas.push(studyArea);

      // Only set if this is not a standard report (e.g. not aggregated)  If it's a standard report the areadesc2 is
      // set on each individual feature
      if (this.filteredReportDropDown.getSelectedItem().reportType != ReportTemplateTypes.STANDARD)
        params.areadesc2 = this.wizard.selectedPoint.areadesc2;

      params.locationName = this.wizard.selectedPoint.locationName;
      params.lat = this.wizard.selectedPoint.lat;
      params.long = this.wizard.selectedPoint.long;

      params.sourceCountry = this.wizard.selectedCountryID;

      // Get ID based on Esri report vs. custom report
      params.report = this.filteredReportDropDown.getSelectedItem().item ? this.filteredReportDropDown.getSelectedItem().item : this.filteredReportDropDown.getSelectedItem().value;
      params.reportDownloadName = this.filteredReportDropDown.getSelectedItem().label;

      return GEUtil.createReport(params);
    },

    runReportForPolygon: function () {
      var params = {
        studyAreas: []
      };

      var studyArea = {};

      if (this.isPolygonFIPS(this.wizard.selectedPolygon)) {
          studyArea = this.GetFIPSStudyArea(this.wizard.selectedPolygon);
      }
      else {
        studyArea = {
          geometry: this.wizard.selectedPolygon.geometry.toJson()
        };
      }

      if (this.wizard.selectedPolygon.feature && this.wizard.selectedPolygon.feature.attributes) {
        studyArea.attributes = this.wizard.selectedPolygon.feature.attributes;
      }

      params.studyAreas.push(studyArea);

      params.locationName = this.wizard.selectedPolygon.locationName;

      params.sourceCountry = this.wizard.selectedCountryID;

      params.report = this.filteredReportDropDown.getSelectedItem().item ? this.filteredReportDropDown.getSelectedItem().item : this.filteredReportDropDown.getSelectedItem().value;
      params.reportDownloadName = this.filteredReportDropDown.getSelectedItem().label;

      return GEUtil.createReport(params);
    },

    backOnClick: function () {
      this.onBack();
    }
  });
});
