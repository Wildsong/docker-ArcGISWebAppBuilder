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
  "dojo/_base/declare",
  "dojo/dom-class",
  "dojo/query",
  "jimu/BaseWidget",
  "./BAWizard"
],
function (declare, domClass, query, BaseWidget, BAWizard) {
  return declare([BaseWidget], {

    name: "BusinessAnalyst",
    baseClass: "jimu-widget-business-analyst",
    reportDropDown: null,
    infographicDropDown: null,
    tradeAreaGraphics: [], // The trade area graphics on the map for the specified point, we remove and only keep track of last created Rings/DT/WT's
    
    // selectedPoint:
    //   tradeAreas: []
    //     {
    //       name - passed to infographics ReportPlayer
    //       shortName - passed to infographics ReportPlayer
    //       graphic - actual graphic that is on the map, passed to ReportPlayer, and createReport
    //     }
    selectedPoint: {
      tradeAreas: []
    },

    postCreate: function () {
      this.inherited(arguments);

      this.initializeNewConfigValues();

      this.baWizard = new BAWizard({
        appConfig: this.appConfig,
        map: this.map,
        nls: this.nls,
        config: this.config
      }).placeAt(this.wizardContainer);
    },

    startup: function() {
      this.baWizard.resize();

      // Need to add overflow:visible to these elements so the search box suggestion drop down will display
      // past the widget box
      query(".jimu-widget-business-analyst").parents(".jimu-widget-frame.jimu-container")[0] && domClass.add(query(".jimu-widget-business-analyst").parents(".jimu-widget-frame.jimu-container")[0], "business-analyst-search-suggestions-overflow");
      query(".jimu-widget-business-analyst").parents(".jimu-panel.jimu-on-screen-widget-panel")[0] && domClass.add(query(".jimu-widget-business-analyst").parents(".jimu-panel.jimu-on-screen-widget-panel")[0], "business-analyst-search-suggestions-overflow");
    },

    resize: function() {
      this.baWizard && this.baWizard.resize();
    },

    onClose: function() {
      // Clear any selected feature when widget is closed.  This will remove any graphics on the map as well
      this.baWizard._featureUnselected();
    },

    onOpen: function() {
      this.baWizard.refreshPage();
    },

    initializeNewConfigValues: function() {
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

    if (typeof this.config.exportInfographicsPrintOption === "undefined")
      this.config.exportInfographicsPrintOption = true;

    if (typeof this.config.exportInfographicsImageOption === "undefined")
      this.config.exportInfographicsImageOption = true;

    if (typeof this.config.exportInfographicsPDFOption === "undefined")
      this.config.exportInfographicsPDFOption = true;

    if (typeof this.config.exportInfographicsDynamicHTMLOption === "undefined")
      this.config.exportInfographicsDynamicHTMLOption = true;

    if (typeof this.config.firstPageText === "undefined")
      this.config.firstPageText = "<br><div>" + this.nls.widgetDescription + "</div><br><div>" + this.nls.selectPointOrPolygon + "</div>";

    if (typeof this.config.searchTextBoxOption === "undefined")
      this.config.searchTextBoxOption = true;

    if (typeof this.config.dropPinOption === "undefined")
      this.config.dropPinOption = true;

    if (typeof this.config.drawPolygonOption === "undefined")
      this.config.drawPolygonOption = true;

    if (typeof this.config.drawFreehandPolygonOption === "undefined")
      this.config.drawFreehandPolygonOption = true;

    }
  });
});
