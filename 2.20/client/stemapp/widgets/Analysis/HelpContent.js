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

define(
[
  "require",
  "dojo/_base/array",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/kernel",
  "dojo/has",

  "dijit/_Widget",
  'jimu/dijit/Popup',

  "esri/kernel",
  "esri/lang",
  "esri/request"
],

function(require, array, declare, lang, kernel, has,
  _Widget, Popup, esriNS, esriLang, esriRequest) {

  var HelpWindow = declare([_Widget], {
    basePath: require.toUrl("esri/dijit/analysis"),
    onlineHelpMap: null,
    showLearnMore: false,
    "class": "esriAnalyisHelpWindow",

    postMixInProperties: function() {
      this.inherited(arguments);
    },

    postCreate: function(){
      this.inherited(arguments);
      //on domnode leave close the help window
      var rtlLocales = ["ar", "he"], i, rLocale, url;
      this.onlineHelpMap = {};
      for(i = 0; i < rtlLocales.length; i = i + 1) {
        rLocale = rtlLocales[i];
        if (kernel.locale && kernel.locale.indexOf(rLocale) !== -1) {
          if(kernel.locale.indexOf("-") !== -1) {
            if(kernel.locale.indexOf(rLocale + "-") !== -1) {
              this._isRightToLeft = true;
            }
          }
          else {
            this._isRightToLeft = true;
          }
        }
      }
      url = this._getAbsoluteUrl(this.basePath) + "/help/helpmap.json";

      esriRequest({"url":url}).then(lang.hitch(this, function(result){
        this.onlineHelpMap = result.map;
      }));
    },

    _getAbsoluteUrl: function(url) {
      if (/^https?\:/i.test(url)) {
        return url;
      } else if (/^\/\//i.test(url)) {
        // Example: "//dczpx2rvsugxm.cloudfront.net/cdn/2419/js/esri/dijit"
        // https://devext.arcgis.com/home/webmap/viewer.html?useExisting=1
        return window.location.protocol + url;
      } else if (/^\//i.test(url)) {
        // Example: "/jsapi/src/js/esri/dijit"
        // http://pponnusamy.esri.com:9090/jsapi/mapapps/testing/v34/amd/map-legacy.html
        return window.location.protocol + "//" + window.location.host + url;
      }
    },

    _computeSize: function(helpId) {
      var size = {
        w: 400,
        h: 200
      };
      if(helpId.indexOf("Category") !== -1) {
        size.w = 400;
        size.h = 320;
      }
      else if(helpId.indexOf("Tool") !== -1) {
        size.w = 400;
        size.h = 320;
      }
      else if(helpId.indexOf("toolDescription") !== -1) {
        size.w = 400;
        size.h = 520;
      }
      return size;
    },

    generateHelpUrl: function(helpFileName, helpId){
      var appLocale, helpLocales, containerAppUrl, helpUrl, locArr,
          env, resourcesHelpLocales;

      env = (this._analysisGpServer && this._analysisGpServer.indexOf("dev") !== -1) ?
          "dev" : ((this._analysisGpServer && this._analysisGpServer.indexOf("qa") !== -1) ?
            "uat" : "");
      appLocale = lang.clone(kernel.locale);
      if (appLocale === "nb") {
        appLocale = "no";
      }
      //TODO: add `sk` if needed.
      helpLocales = ["ar", "cs", "da", "de", "es", "et", "fi", "fr", "it", "ja",
        "ko", "lt", "lv", "ru", "nl", "no", "pl", "pt-br", "pt-pt", "ro", "sv", "th",
        "tr", "vi", "zh-cn"];
      resourcesHelpLocales = ["ar", "da", "de", "es", "fr", "it", "ja", "ko", "ru",
        "nl", "no", "pl", "pt-br", "pt-pt", "ro", "sv", "zh-cn"];
      containerAppUrl = require.toUrl("esri/dijit/analysis/help/");
      helpUrl = containerAppUrl + helpFileName + ".html";

      if (array.indexOf(helpLocales, appLocale) !== -1) {
        if(appLocale.indexOf("-") !== -1) {
          locArr = appLocale.split("-");
          appLocale = locArr[0] + "-" + locArr[1].toUpperCase();
        }
        helpUrl = containerAppUrl + appLocale + "/" + helpFileName + ".html";
      }

      return helpUrl + '#' + helpId;
    },

    _setHelpTopic: function(helpId) {
      //console.log(helpId);
      if(this.tooltipHelpDlg) {
        this.tooltipHelpDlg.destroy();
        this.tooltipHelpDlg = null;
      }
      var appLocale, helpLocales, containerAppUrl, size, helpUrl, locArr,
          learnMoreUrl, env, resourcesHelpLocales;
      this.showLearnMore = false; //default case
      env = (this._analysisGpServer && this._analysisGpServer.indexOf("dev") !== -1) ?
          "dev" : ((this._analysisGpServer && this._analysisGpServer.indexOf("qa") !== -1) ?
            "uat" : "");
      appLocale = lang.clone(kernel.locale);
      if (appLocale === "nb") {
        appLocale = "no";
      }
      // copied from arcgis-js-api/esri/dijit/analysis/HelpWindow.js
      helpLocales = ["ar", "bs", "ca", "cs", "da", "de", "es", "el", "et", "fi", "fr", "he", "hr", "hu", "id", "it", "ja",
      "ko", "lt", "lv", "ru", "nl", "no", "pl", "pt-br", "pt-pt", "ro", "sl", "sk", "sv", "sr", "th", "tr", "uk", "vi", "zh-cn",
      "zh-hk", "zh-tw"];
      resourcesHelpLocales = ["ar", "de", "es", "fr", "it", "ja", "ko", "ru", "pl", "pt-br", "zh-cn"];
      containerAppUrl = require.toUrl("esri/dijit/analysis/help/");
      helpUrl = containerAppUrl + this.helpFileName + ".html";

      if(esriLang.isDefined(this.onlineHelpMap[this.helpFileName]) &&
          esriLang.isDefined(this.onlineHelpMap[this.helpFileName][helpId]) ) {
        this.showLearnMore = true;
        learnMoreUrl = "http://doc" + env + ".arcgis.com/en/arcgis-online/use-maps/" +
            this.onlineHelpMap[this.helpFileName][helpId];
      }

      if (array.indexOf(helpLocales, appLocale) !== -1) {
        if(appLocale.indexOf("-") !== -1) {
          locArr = appLocale.split("-");
          appLocale = locArr[0] + "-" + locArr[1].toUpperCase();
        }
        helpUrl = containerAppUrl + appLocale + "/" + this.helpFileName + ".html";
      }

      if (array.indexOf(resourcesHelpLocales, appLocale) !== -1) {
        if(this.showLearnMore) {
          learnMoreUrl = "http://doc" + env + ".arcgis.com/" + appLocale +
              "/arcgis-online/use-maps/" + this.onlineHelpMap[this.helpFileName][helpId];
        }
      }
      //check for learn more

      size = this._computeSize(helpId);
      this.structure =
       "<div class='' style='position:relative'>" +
          "<div class='sizer content'>" +
            "<div class='contentPane'>" +
             "<iframe frameborder='0'  id='" + helpId + "' src='" + helpUrl + "#" + helpId +
              "' width='" + size.w + "' height='" + size.h  +
              "' marginheight='0' marginwidth='0'></iframe>" +
            "</div>" +
          "</div>" +
          "<div class='sizer'>" +
            "<div class='actionsPane'>" +
              "<div class='actionList" + (this.showLearnMore? "'>": " hidden'>") +
                "<a class='action zoomTo' href='" +
                  (this.showLearnMore? learnMoreUrl : "#")  +
                  "' target='_help'>" + this.nls.learnMore + "</a>" +
              "</div>" +
            "</div>" +
          "</div>" +
          "</div>" +
        "</div>" ;
    },

    show: function(event, params) {
      //console.log("showing help for ID", helpId) ;
      console.log(event);
      this.helpFileName =  params.helpFileName;
      this._analysisGpServer = params.analysisGpServer;
      this._setHelpTopic(params.helpId);

      new Popup({
        titleLabel: this.helpFileName,
        content: this.structure,
        width: 480,
        maxHeight: 300
      });
    }
  });

  if (has("extend-esri")) {
    lang.setObject("dijit.analysis.HelpWindow", HelpWindow, esriNS);
  }
  return HelpWindow;
});

