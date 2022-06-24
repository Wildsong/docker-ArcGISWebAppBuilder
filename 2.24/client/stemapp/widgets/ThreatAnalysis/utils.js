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
  'dojo/_base/lang',
  'dojo/_base/array'
], function (lang, array) {

  var mo = {};

  /**
  * This function is used to transform old config to like new config json
  */
  mo.transformOldConfigToNewConfigJson = function (config) {
    //new config json
    var newConfigObj = {
      threats: [],
      generalSettings: {
        operationalLayer: {
          name: ""
        },
        unit: "feet",
        defaultInputType: "interactive",
        layerToSelectFeatures: "",
        defaultThreatType: ""
      }
    };

    //For backward if operationalLayer is available then fetch and save it in generalSettings
    if (config.hasOwnProperty("threatAnalysis")) {
      if (config.threatAnalysis.hasOwnProperty("operationalLayer") &&
        config.threatAnalysis.operationalLayer.name) {
        newConfigObj.generalSettings.operationalLayer.name = config.threatAnalysis.operationalLayer.name;
      }
      //For backward if unit is available then fetch and save it in generalSettings
      if (config.threatAnalysis.hasOwnProperty("unit")) {
        newConfigObj.generalSettings.unit = config.threatAnalysis.unit;
      }
    }

    //For backward if threatTypes is available then fetch each threat and transform threat info as per new json
    //and save it in threats array to display them in threat table
    if (config.hasOwnProperty("threatTypes")) {
      array.forEach(config.threatTypes, lang.hitch(this, function (threatType) {
        newConfigObj.threats.push(this._getConvertedThreatJson(threatType, true, config.threatAnalysis.symbology));
      }));
    }

    //For backward if lpgThreatTypes is available then fetch each threat and transform threat info as per new json
    //and save it in threats array to display them in threat table
    if (config.hasOwnProperty("lpgThreatTypes")) {
      array.forEach(config.lpgThreatTypes, lang.hitch(this, function (threatType) {
        newConfigObj.threats.push(this._getConvertedThreatJson(threatType, false, config.threatAnalysis.symbology));
      }));
    }
    return newConfigObj;
  };

  /**
   * This function is used to convert threat info as new config threat json
   */
  mo._getConvertedThreatJson = function (threatType, isChemical, symbology) {
    var threatZonesArr = isChemical ? ["Mandatory Evacuation Distance", "Safe Evacuation Distance"]
      : ["Fireball Diameter", "Safe Distance"];

    var threatZonesDistanceArr = isChemical ? [threatType.Bldg_Dist, threatType.Outdoor_Dist]
      : [threatType.Fireball_Dia, threatType.Safe_Dist];

    var threatObj = {
      threatName: threatType.Threat,
      zones: [{
        name: threatZonesArr[0],
        distance: this._validateDistance(threatZonesDistanceArr[0]),
        symbol: {
          "outlineColor": isChemical ? this._getSymbol(symbology.mandatoryOutlineColor) :
            this._getSymbol(symbology.fireballDiaOutlineColor),
          "fillColor": isChemical ? this._getSymbol(symbology.mandatoryFillColor) :
            this._getSymbol(symbology.fireballDiaFillColor)
        }
      }, {
        name: threatZonesArr[1],
        distance: this._validateDistance(threatZonesDistanceArr[1]),
        symbol: {
          "outlineColor": isChemical ? this._getSymbol(symbology.safeOutlineColor) :
            this._getSymbol(symbology.safeDistanceOutlineColor),
          "fillColor": isChemical ? this._getSymbol(symbology.safeFillColor) :
            this._getSymbol(symbology.safeDistanceFillColor)
        }
      }]
    };
    return threatObj;
  };

  /**
   * This function is used to get symbology parameters
   */
  mo._getSymbol = function (symbol) {
    return {
      color: symbol.color,
      transparency: symbol.transparency,
      type: symbol.type
    };
  };

  /**
   * This function is used to create threat json from default threats json files
   */
  mo.getDefaultThreats = function (threatTypes, lpgThreatTypes) {
    var defaultThreatsArr = [];
    var defaultSymbology = this._getDefaultSymbology();
    //for new app if config doesn't have threats key it means we have to create threat table from default threats
    //available in json files.
    //fetch each threat and transform threat info as per new json and save it
    //in defaultThreatsArr array to display them in threat table
    array.forEach(threatTypes, lang.hitch(this, function (threatType) {
      defaultThreatsArr.push(this._getConvertedThreatJson(threatType, true, defaultSymbology));
    }));

    array.forEach(lpgThreatTypes, lang.hitch(this, function (lpgThreatType) {
      defaultThreatsArr.push(this._getConvertedThreatJson(lpgThreatType, false, defaultSymbology));
    }));
    return defaultThreatsArr;
  };

  /**
   * This function is used to return default symbology for default threats
   */
  mo._getDefaultSymbology = function () {
    return {
      "mandatoryOutlineColor": {
        "color": "#d10e40",
        "transparency": 0,
        "type": "esriSLSSolid"
      },
      "mandatoryFillColor": {
        "color": "#d10e40",
        "transparency": 0.88,
        "type": "esriSFSSolid"
      },
      "safeOutlineColor": {
        "color": "#ffffff",
        "transparency": 0,
        "type": "esriSLSNull"
      },
      "safeFillColor": {
        "color": "#ffd700",
        "transparency": 0.78,
        "type": "esriSFSSolid"
      },
      "fireballDiaOutlineColor": {
        "color": "#d10e40",
        "transparency": 0,
        "type": "esriSLSSolid"
      },
      "fireballDiaFillColor": {
        "color": "#d10e40",
        "transparency": 0.88,
        "type": "esriSFSSolid"
      },
      "safeDistanceOutlineColor": {
        "color": "#ffffff",
        "transparency": 0,
        "type": "esriSLSNull"
      },
      "safeDistanceFillColor": {
        "color": "#ffd700",
        "transparency": 0.78,
        "type": "esriSFSSolid"
      }
    };
  };

  /**
   * This function is used to validate the zone distance
   */
  mo._validateDistance = function (zoneDistance) {
    var distance = zoneDistance;
    if (isNaN(distance) || [null, undefined, ''].indexOf(distance) !== -1 || distance <= 0) {
      distance = 0.01;
    }
    return distance;
  };
  return mo;
});