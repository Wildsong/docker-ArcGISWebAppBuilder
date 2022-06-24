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
  'esri/request',
  'dojo/json',
  'dojo/topic',
  'dojo/_base/lang',
  'esri/arcgis/Portal',
  'esri/layers/FeatureLayer',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  'dojo/_base/array'
], function (
  esriRequest,
  JSON,
  topic,
  lang,
  esriPortal,
  FeatureLayer,
  jimuLayerInfos,
  jimuUtils,
  array
) {
  var portalUtil = {};

  portalUtil.saveToPortal = function (params) {
    // Sign in
    var portal = new esriPortal.Portal(params.appConfig.portalUrl);
    portal.signIn().then(lang.hitch(this, function (portalUser) {

      // Get the token
      var token = portalUser.credential.token;
      var orgId = portalUser.orgId;
      var userName = portalUser.username;
      // Check the user is not just a publisher
      if (portalUser.role === "org_user") {
        params.publishMessage.innerHTML = jimuUtils.sanitizeHTML(params.nls.createService.format(params.nls.userRole));
        topic.publish("setLastFocusNode", false);
        return;
      }
      // Check if we do not have a layer url
      if (!params.url) {
        //Construct the REST services
        var checkServiceNameUrl = params.appConfig.portalUrl +
          "sharing/rest/portals/" + orgId + "/isServiceNameAvailable";
        var createServiceUrl = params.appConfig.portalUrl +
          "sharing/content/users/" + userName + "/createService";
        this.isNameAvailable(checkServiceNameUrl, token,
          params.layerName).then(lang.hitch(this, function (response0) {
            if (response0.available) {
              //set the widget to busy
              topic.publish("setBusyIndicator", true);
              //create the service
              this.createFeatureService(createServiceUrl, token,
                this.getFeatureServiceParams(params.layerName,
                  params.map)).then(lang.hitch(this, function (response1) {
                    if (response1.success) {
                      var addToDefinitionUrl = response1.serviceurl.replace(
                        new RegExp('rest', 'g'), "rest/admin") + "/addToDefinition";
                      var layersInfo = [];
                      array.forEach(params.layers, lang.hitch(this, function (layer, i) {
                        var layerDef = portalUtil.getLayerParams(layer.name, params.map, layer.renderer, params.nls, i);
                        layersInfo.push(layerDef);
                      }));
                      var layerDefinition = { 'layers': layersInfo };
                      this.addDefinitionToService(addToDefinitionUrl, token,
                        layerDefinition).then(lang.hitch(this,
                        function (response2) {
                          if (response2 && response2.success) {
                            array.forEach(response2.layers, lang.hitch(this, function (response3, i) {
                              if (response3) {
                                //Push features to new layer  "/0?token="
                                var newFeatureLayer =
                                  new FeatureLayer(response1.serviceurl + "/" + "" + i + "" + "?token=" + token, {
                                    id: response3.name,
                                    outFields: ["*"]
                                  });
                                newFeatureLayer._wabProperties = {
                                  itemLayerInfo: {
                                    portalUrl: params.appConfig.portalUrl,
                                    itemId: response1.itemId
                                  }
                                };
                                // Add layer to map
                                params.map.addLayer(newFeatureLayer);
                                // must ensure the layer is loaded before we can access
                                // it to turn on the labels if required
                                var featureLayerInfo;
                                if (newFeatureLayer.loaded) {
                                  featureLayerInfo =
                                    jimuLayerInfos.getInstanceSync().getLayerInfoById(response3.name);
                                  featureLayerInfo.enablePopup();
                                } else {
                                  newFeatureLayer.on("load", lang.hitch(this, function () {
                                    featureLayerInfo =
                                      jimuLayerInfos.getInstanceSync().getLayerInfoById(response3.name);
                                    featureLayerInfo.enablePopup();
                                  }));
                                }
                                newFeatureLayer.applyEdits(params.layers[i].graphics, null, null).then(
                                  lang.hitch(this, function () {
                                    topic.publish("clear");
                                  })).otherwise(lang.hitch(this, function () {
                                    topic.publish("clear");
                                  }));
                              }
                            }));
                            topic.publish("setBusyIndicator", false);
                            var newURL = '<br /><a role="link" tabindex="0" aria-label="' +
                              params.nls.successfullyPublished + '" href="' + params.appConfig.portalUrl +
                              "home/item.html?id=" + response1.itemId + '" target="_blank">' +
                              params.nls.manageWebLayerText + '</a>';
                            params.publishMessage.innerHTML = params.nls.successfullyPublished + newURL;
                            topic.publish("setLastFocusNode", true);
                          }
                        }), lang.hitch(this, function (err2) {
                        // Error in adding service definition
                        topic.publish("setBusyIndicator", false);
                        params.publishMessage.innerHTML =
                          jimuUtils.sanitizeHTML(params.nls.addToDefinition.format(err2.message));
                        topic.publish("setLastFocusNode", false);
                      }));
                    } else {
                      // Unable to create feature service
                      topic.publish("setBusyIndicator", false);
                      params.publishMessage.innerHTML =
                        jimuUtils.sanitizeHTML(params.nls.unableToCreate.format(params.layerName));
                      topic.publish("setLastFocusNode", false);
                    }
                  }), lang.hitch(this, function (err1) {
                    // Error in calling create feature service REST call
                    topic.publish("setBusyIndicator", false);
                    params.publishMessage.innerHTML =
                      jimuUtils.sanitizeHTML(params.nls.createService.format(err1.message));
                    topic.publish("setLastFocusNode", false);
                  }));
            } else {
              // Supplied layer name exists. User needs to supply another.
              topic.publish("setBusyIndicator", false);
              params.publishMessage.innerHTML = params.nls.layerNameExists;
            }
            topic.publish("setLastFocusNode", false);
          }));
      } else {
        // We have an operational layer from the webmap with a valid URL
        // Create the layer from the URL parameter
        var newFeatureLayer;
        array.forEach(params.layers, lang.hitch(this, function (layer, i) {
          newFeatureLayer =
            new FeatureLayer(params.url + "?token=" + token, {
              id: params.layerName + "" + i,
              outFields: ["*"]
            });
          newFeatureLayer._wabProperties = {
            itemLayerInfo: {
              portalUrl: params.appConfig.portalUrl,
              itemId: params.itemId
            }
          };

          newFeatureLayer.applyEdits(layer.graphics, null, null).then(
            lang.hitch(this, function () {
              topic.publish("clear");
            })).otherwise(lang.hitch(this, function () {
              topic.publish("clear");
            }));
        }));
        topic.publish("setBusyIndicator", false);
        var newURL = '<br /><a role="link" tabindex="0" aria-label="' +
          params.nls.successfullyAppended + '" href="' + params.appConfig.portalUrl +
          "home/item.html?id=" + params.serviceItemId + '" target="_blank">' +
          params.nls.manageWebLayerText + '</a>';
        params.publishMessage.innerHTML = params.nls.successfullyAppended + newURL;
        topic.publish("setLastFocusNode", true);
      }
    }), lang.hitch(this, function (err) {
      params.publishMessage.innerHTML = err.message;
      topic.publish("setLastFocusNode", false);
    }));
  };

  portalUtil.getFeatureServiceParams = function (featureServiceName, map) {
    return {
      "name": featureServiceName,
      "serviceDescription": "",
      "hasStaticData": false,
      "maxRecordCount": 1000,
      "supportedQueryFormats": "JSON",
      "capabilities": "Create,Delete,Query,Update,Editing",
      "tags": "ThreatAnalysis",
      "description": "",
      "copyrightText": "",
      "spatialReference": map.spatialReference.toJson(),
      "initialExtent": map.extent.toJson(),
      "allowGeometryUpdates": true,
      "units": "esriMeters",
      "xssPreventionInfo": {
        "xssPreventionEnabled": true,
        "xssPreventionRule": "InputOnly",
        "xssInputRule": "rejectInvalid"
      }
    };
  };

  portalUtil.getLayerParams = function (layerName, map, renderer, nls, id) {
    return {
      "adminLayerInfo": {
        "geometryField": {
          "name": "Shape"
        },
        "xssTrustedFields": ""
      },
      "id": id,
      "name": layerName,
      "type": "Feature Layer",
      "displayField": "",
      "description": "",
      "tags": "ThreatAnalysis",
      "copyrightText": "",
      "defaultVisibility": true,
      "ownershipBasedAccessControlForFeatures": {
        "allowOthersToQuery": false,
        "allowOthersToDelete": false,
        "allowOthersToUpdate": false
      },
      "relationships": [],
      "isDataVersioned": false,
      "supportsCalculate": true,
      "supportsAttachmentsByUploadId": true,
      "supportsRollbackOnFailureParameter": true,
      "supportsStatistics": true,
      "supportsAdvancedQueries": true,
      "supportsValidateSql": true,
      "supportsCoordinatesQuantization": true,
      "supportsApplyEditsWithGlobalIds": true,
      "advancedQueryCapabilities": {
        "supportsPagination": true,
        "supportsQueryWithDistance": true,
        "supportsReturningQueryExtent": true,
        "supportsStatistics": true,
        "supportsOrderBy": true,
        "supportsDistinct": true,
        "supportsQueryWithResultType": true,
        "supportsSqlExpression": true,
        "supportsReturningGeometryCentroid": true
      },
      "useStandardizedQueries": false,
      "geometryType": "esriGeometryPolygon",
      "minScale": 0,
      "maxScale": 0,
      "extent": map.extent,
      "drawingInfo": {
        "renderer": renderer.toJson(),
        "transparency": 0
      },
      "allowGeometryUpdates": true,
      "hasAttachments": false,
      "htmlPopupType": "esriServerHTMLPopupTypeNone",
      "hasM": false,
      "hasZ": false,
      "objectIdField": "OBJECTID",
      "globalIdField": "",
      "typeIdField": "",
      "fields": [{
        "name": "OBJECTID",
        "type": "esriFieldTypeOID",
        "actualType": "int",
        "alias": "OBJECTID",
        "sqlType": "sqlTypeOther",
        "nullable": false,
        "editable": false,
        "domain": null,
        "defaultValue": null
      },
      {
        "name": "zone_type",
        "type": "esriFieldTypeString",
        "alias": nls.zoneTypeLabel,
        "actualType": "nvarchar",
        "nullable": true,
        "editable": true,
        "domain": null,
        "defaultValue": null,
        "sqlType": "sqlTypeNVarchar",
        "length": 256
      },
      {
        "name": "threat_type",
        "type": "esriFieldTypeString",
        "alias": nls.threatType,
        "actualType": "nvarchar",
        "nullable": true,
        "editable": true,
        "domain": null,
        "defaultValue": null,
        "sqlType": "sqlTypeNVarchar",
        "length": 256
      },
      {
        "name": "distance",
        "type": "esriFieldTypeDouble",
        "alias": nls.distanceColLabel,
        "actualType": "float",
        "nullable": true,
        "editable": true,
        "domain": null,
        "defaultValue": null,
        "sqlType": "sqlTypeFloat"
      },
      {
        "name": "units",
        "type": "esriFieldTypeString",
        "alias": nls.unitsLabel,
        "actualType": "nvarchar",
        "nullable": true,
        "editable": true,
        "domain": null,
        "defaultValue": null,
        "sqlType": "sqlTypeNVarchar",
        "length": 256
      }
      ],
      "indexes": [],
      "types": [],
      "templates": [{
        "name": "New Feature",
        "description": "",
        "drawingTool": "esriFeatureEditToolPolygon",
        "prototype": {
          "attributes": {}
        }
      }],
      "supportedQueryFormats": "JSON",
      "hasStaticData": false,
      "maxRecordCount": 10000,
      "standardMaxRecordCount": 4000,
      "tileMaxRecordCount": 4000,
      "maxRecordCountFactor": 1,
      "exceedsLimitFactor": 1,
      "capabilities": "Query,Editing,Create,Update,Delete"
    };
  };

  portalUtil.isNameAvailable = function (serviceName, token, featureServiceName) {
    //Check for the layer name
    var def = esriRequest({
      url: serviceName,
      content: {
        name: featureServiceName,
        type: "Feature Service",
        token: token,
        f: "json"
      },
      handleAs: "json",
      callbackParamName: "callback"
    }, {
      usePost: true
    });
    return def;
  };

  portalUtil.createFeatureService = function (serviceUrl, token, createParams) {
    //create the service
    var def = esriRequest({
      url: serviceUrl,
      content: {
        f: "json",
        token: token,
        typeKeywords: "ArcGIS Server,Data,Feature Access,Feature Service,Service,Hosted Service",
        createParameters: JSON.stringify(createParams),
        outputType: "featureService"
      },
      handleAs: "json",
      callbackParamName: "callback"
    }, {
      usePost: true
    });
    return def;
  };

  portalUtil.addDefinitionToService = function (serviceUrl, token, defParams) {
    var def = esriRequest({
      url: serviceUrl,
      content: {
        token: token,
        addToDefinition: JSON.stringify(defParams),
        f: "json"
      },
      handleAs: "json",
      callbackParamName: "callback"
    }, {
      usePost: true
    });
    return def;
  };

  return portalUtil;
});