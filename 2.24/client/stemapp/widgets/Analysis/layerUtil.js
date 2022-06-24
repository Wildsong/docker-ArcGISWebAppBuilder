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
  'dojo/_base/array',
  'dojo/promise/all',
  'dojo/Deferred',
  'esri/layers/FeatureLayer',
  'esri/layers/GeoRSSLayer',
  'esri/layers/WFSLayer',
  'esri/request',
  'jimu/LayerInfos/LayerInfos',
  'jimu/shared/utils'
], function(lang, array, all, Deferred, FeatureLayer, GeoRSSLayer, WFSLayer, esriRequest, LayerInfos, jimuUtils) {
  var mo = {};
  var proxyCheckPromise;
  var proxyCheckedServers = {};

  mo.getLayerObjects = function(isPortal){
    var retDef = new Deferred();
    var layerInfosObject = LayerInfos.getInstanceSync();

    var layerInfos = [];
    layerInfosObject.traversal(function(layerInfo){
      layerInfos.push(layerInfo);
    });

    var defs = array.map(layerInfos, function(layerInfo){
      // if layerInfo.getLayerType() is "GeoRSSLayer", assgin name to layerObject if it is undefined
      var itemInfo;
      return layerInfo.getItemInfo()
      .then(function(info) {
        if (info) {
          itemInfo = info.getItem();
        }
      })
      .then(function() {
        return layerInfo.getLayerType();
      })
      .then(function(type){
        if(type === 'GeoRSSLayer') {
          if(!layerInfo.isLeaf()) {
            array.forEach(layerInfo.getSubLayers(), function(subLayerInfo) {
              if(!subLayerInfo.layerObject.name) {
                subLayerInfo.layerObject.name = subLayerInfo.title;
              }
            });
          }
        }
        return layerInfo.getLayerObjectTryUsingFeatureService();
      })
      .then(function(layerObject){
        if(layerObject) {
          layerObject.itemInfo = itemInfo;
          return layerObject;
        }
      });
    });
    all(defs).then(function(layerObjects){
      var resultArray = [];
      array.forEach(layerObjects, function(layerObject, i){
        if (!layerObject || !layerObject.geometryType) {
          return;
        }
        if((layerObject instanceof FeatureLayer &&
          layerObject.declaredClass !== 'esri.layers.StreamLayer') ||
            layerObject instanceof GeoRSSLayer) {
          layerObject.id = layerObject.id || layerInfos[i].id;
          resultArray.push(layerObject);
        } else if (layerObject instanceof WFSLayer) {
          var json = mo.createFeatureCollectionJsonFromWFS(layerObject),
              layer = new FeatureLayer(json, {
                mode: FeatureLayer.MODE_SNAPSHOT,
                outFields: ["*"]
              });
          layer.id = layerObject.id || layerInfos[i].id;
          layer.title = layerObject._layerName;
          layer.name = layerObject._layerName;
          if(layer.capabilities) {
            if(layer.capabilities.indexOf("Extract") === -1) {
              layer.capabilities = layer.capabilities + ",Extract";
            }
          } else {
            layer.capabilities = "Extract";
          }
          resultArray.push(layer);
        }
      });
      mo.checkLayers(resultArray, isPortal).then(function() {
        retDef.resolve(resultArray);
      });
    }, function() {
      retDef.resolve([]);
    });

    return retDef;
  };

  mo.checkLayers = function(layers, isPortal) {
    var promAll, def;
    if (proxyCheckPromise) {
      // Multiple Requests return first promise
      return proxyCheckPromise;
    }
    def = new Deferred();
    if (isPortal || layers.length === 0) {
      def.resolve();
      return def;
    }

    proxyCheckPromise = def;
    promAll = [];
    layers.forEach(function(layer) {
      if (layer.url && !jimuUtils.isHostedService(layer.url) && !mo.isPortalHostedService(layer.url)) {
        if (!layer.analysisProxyCheck) {
          promAll.push(mo._getProxyServiceInfo(layer));
        }
      }
    });
    if (promAll.length === 0) {
      def.resolve();
      proxyCheckPromise = null;
    } else {
      all(promAll).always(function() {
        def.resolve();
        proxyCheckPromise = null;
      });
    }
    return def;
  };

  mo.isPortalHostedService = function(url) {
    if (!url) {
      return false;
    }
    var lowerCaseUrl = url.toLowerCase(), hosted = "/hosted/";
    return lowerCaseUrl.indexOf(hosted) !== -1;
  }

  mo._getProxyServiceInfo = function(layer) {
    var def = new Deferred(), curServer, found;

    var serviceUrl = layer.url + ((layer.url.indexOf("?") > -1) ? "&" : "?") + "f=json";
    var url = layer.url;
    var token = typeof layer._getToken === 'function' ? layer._getToken() : null;
    var serverId = url.substring(0, url.indexOf("/", 9));

    // did we already check this server?
    found = array.some(Object.keys(proxyCheckedServers), function(id) {
      curServer = url.substring(0, url.indexOf("/", 9));
      if (id === curServer) {
        layer.analysisProxyCheck = proxyCheckedServers[id]; //set the checked result
        return true;
      }
    }, this);
    if (found) {
      def.resolve();
    } else {
      if (token) {
        serviceUrl += "&token=" + token;
      }
      esriRequest({
        url: serviceUrl,
        content: null
      },
      {
        useProxy: true
      }).then(function() {
        layer.analysisProxyCheck = "success";
        proxyCheckedServers[serverId] = "success";
        def.resolve({});
      }, function() {
        layer.analysisProxyCheck = "failure";
        if (!proxyCheckedServers[serverId]) {
          proxyCheckedServers[serverId] = "failure";
        }
        def.resolve();
      });
    }
    return def;
  };

  mo.getTableInfos = function() {
    var layerInfosObject = LayerInfos.getInstanceSync();
    var allLayerInfos = [].concat(layerInfosObject.getTableInfoArray(), layerInfosObject.getLayerInfoArray());
    return array.filter(allLayerInfos, function(layerInfo) {
      return layerInfo.isTable === true;
    });
  };

  mo.getTableLayerObjects = function() {
    var dfd = new Deferred();
    var tableInfos = mo.getTableInfos();
    var defs = array.map(tableInfos, function(tableInfo) {
      return tableInfo.getLayerObject();
    });

    all(defs).then(function(layerObjects){
      var nonEmptyLayerObjects = array.filter(layerObjects, function(layerObject) {
        return layerObject !== null;
      });
      dfd.resolve(nonEmptyLayerObjects);
    });
    return dfd;
  };

  mo.getMainGeometryType = function(mapLayer) {
    var counter = {
      points: 0,
      lines: 0,
      polygons: 0
    };
    array.forEach(mapLayer.graphics, function(graphic){
      if (graphic.geometry.type === "point") {
        counter.points++;
      } else if (graphic.geometry.type === "polyline") {
        counter.lines++;
      } else if (graphic.geometry.type === "polygon") {
        counter.polygons++;
      }
    });
    if (counter.points > counter.lines && counter.points > counter.polygons) {
      return "esriGeometryPoint";
    } else if (counter.lines > counter.points && counter.lines > counter.polygons) {
      return "esriGeometryPolyline";
    } else {
      return "esriGeometryPolygon";
    }
  };

  mo.createFeatureCollectionJsonFromWFS = function(wfsLayer) {
    var geometryType = mo.getMainGeometryType(wfsLayer);
    var symbol;
    if (geometryType === "esriGeometryPoint") {
      symbol = wfsLayer._pointSymbol;
    } else if (geometryType === "esriGeometryPolyline") {
      symbol = wfsLayer._lineSymbol;
    } else { //  "esriGeometryPolygon"
      symbol = wfsLayer._polygonSymbol;
    }

    var featureCollection = {
      "layerDefinition": null,
      "featureSet": {
        "features": [],
        "geometryType": geometryType
      }
    };
    featureCollection.layerDefinition = {
      "geometryType": geometryType,
      "objectIdField": "__OBJECTID",
      "type": "Feature Layer",
      "typeIdField": "",
      "drawingInfo": {
        "renderer": {
          "type": "simple",
          "symbol": symbol.toJson()
        },
        "fixedSymbols": true
      },
      "fields": [{
        "name": "__OBJECTID",
        "alias": "__OBJECTID",
        "type": "esriFieldTypeOID"
      }],
      "types": [],
      "capabilities": "Query"
    };

    array.forEach(wfsLayer.fields, function(field){
      if (array.indexOf([
        "esriFieldTypeInteger",
        "esriFieldTypeDouble",
        "esriFieldTypeDate",
        "esriFieldTypeString"], field.type) > -1) {
        featureCollection.layerDefinition.fields.push(lang.clone(field));
      }
    });

    var features = [];
    array.forEach(wfsLayer.graphics, function(graphic, index){
      var attributes = lang.clone(graphic.attributes);
      attributes.__OBJECTID = index;
      features.push({
        geometry: graphic.geometry.toJson(),
        attributes: attributes
      });
    });
    featureCollection.featureSet.features = features;

    return featureCollection;
  };

  return mo;
});
