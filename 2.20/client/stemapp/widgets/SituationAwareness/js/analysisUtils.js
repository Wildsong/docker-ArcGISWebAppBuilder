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
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'esri/tasks/query',
  'esri/geometry/geometryEngine',
  "esri/geometry/Polyline",
  './CSVUtils',
  'jimu/utils'
], function (array, lang, domClass, domGeom, domStyle, Query, geometryEngine, Polyline, CSVUtils, utils) {

  var mo = {};

  //distanceSettings and distanceUnits are the same for all
  //TODO get these and store locally so we don't have to pass the values
  // to individual functions

  //this currently supports fields for Closest and Proximity however I should
  // be able to consolidate more
  ///the this usage will need to be updated
  mo.getFields = function (layer, tab, allFields, parent) {
    var skipFields = this.getSkipFields(layer);
    var fields = [];
    if (!allFields && tab.advStat && tab.advStat.stats &&
      tab.advStat.stats.outFields &&
      tab.advStat.stats.outFields.length > 0) {
      array.forEach(tab.advStat.stats.outFields, function (obj) {
        fields.push(obj.expression);
      });
    } else {
      var fldInfos;
      if (layer.infoTemplate) {
        fldInfos = layer.infoTemplate.info.fieldInfos;
      } else if (parent.map.itemInfo.itemData.operationalLayers.length > 0) {
        var mapLayers = parent.map.itemInfo.itemData.operationalLayers;
        fldInfos = null;
        mapServiceLayerLoop:
        for (var i = 0; i < mapLayers.length; i++) {
          var lyr = mapLayers[i];
          if (lyr.layerType === "ArcGISMapServiceLayer") {
            if (typeof (lyr.layers) !== 'undefined') {
              for (var ii = 0; ii < lyr.layers.length; ii++) {
                var sl = lyr.layers[ii];
                if (sl.id === layer.layerId) {
                  if (sl.popupInfo) {
                    fldInfos = sl.popupInfo.fieldInfos;
                    break mapServiceLayerLoop;
                  }
                }
              }
            }
          }
        }
        if (!fldInfos) {
          fldInfos = layer.fields;
        }
      } else {
        fldInfos = layer.fields;
      }
      if (fldInfos) {
        for (var j = 0; j < fldInfos.length; j++) {
          var fld = fldInfos[j];
          if (!allFields && typeof (fld.visible) !== 'undefined') {
            if (fld.visible) {
              if (skipFields.indexOf(fld.fieldName) === -1) {
                fields.push(fld.fieldName);
              }
            }
          } else {
            //TODO verify this is how it is for MSL otherwise it may have been a typeo
            var name = fld.name ? fld.name : fld.fieldName;
            if (skipFields.indexOf(name) === -1) {
              fields.push(name);
            }
          }
        }
      }
    }
    // special fields: dates and domains
    var spFields = this.getSpecialFields(layer);

    return {
      dateFields: spFields.dateFields,
      specialFields: spFields.specialFields,
      typeIdField: spFields.typeIdField,
      types: spFields.types,
      fields: (fields.length > 3 && !allFields) ? fields.slice(0, 3) : fields,
      allFields: fields
    };
  };

  //mo.getGroupedCountFields = function (layer, tab, allFields, parent) {
  //  var fields = [];
  //  if (typeof (tab.advStat) !== 'undefined') {
  //    var stats = tab.advStat.stats;
  //    for (var key in stats) {
  //      var txt = "";
  //      if (stats[key].length > 0) {
  //        array.forEach(stats[key], function (pStat) {
  //          var obj = {
  //            field: pStat.expression,
  //            alias: pStat.label + txt,
  //            type: key,
  //            total: 0
  //          };
  //          fields.push(obj);
  //        });
  //      }
  //    }
  //  }
  //  // special fields: dates and domains
  //  var spFields = {};
  //  var dateFields = [];
  //  array.forEach(layer.fields, lang.hitch(this, function (fld) {
  //    if (fld.type === "esriFieldTypeDate" || fld.domain) {
  //      if (fld.type === "esriFieldTypeDate") {
  //        if (layer.infoTemplate) {
  //          for (var key in layer.infoTemplate._fieldsMap) {
  //            if (typeof (layer.infoTemplate._fieldsMap[key].fieldName) !== 'undefined') {
  //              if (layer.infoTemplate._fieldsMap[key].fieldName === fld.name) {
  //                if (typeof (layer.infoTemplate._fieldsMap[key].format.dateFormat) !== 'undefined') {
  //                  dateFields[fld.name] = layer.infoTemplate._fieldsMap[key].format.dateFormat;
  //                }
  //              }
  //            }
  //          }
  //        }
  //      }
  //      spFields[fld.name] = fld;
  //    }
  //  }));
  //  //TODO will need to think through the fields return...as this will be different than prox and close
  //  // due to the calculated values
  //  return {
  //    dateFields: dateFields,
  //    specialFields: spFields,
  //    fields: (fields.length > 3 && !allFields) ? fields.slice(0, 3) : fields,
  //    allFields: fields
  //  };
  //};

  mo.getField = function (fields, v) {
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.name === v || f.alias === v) {
        return f;
      }
    }
    return undefined;
  };
  /* jshint unused:false */
  mo.getFieldValue = function (fldName, fldValue, specialFields, dateFields, defaultDateFormat, typeIdField, types,
    layerDefinition, attr, field) {
    var isDate = false;
    var value = fldValue;
    var isStringFieldValue = (typeof(value) === "string") ? true : false;
    if (specialFields[fldName]) {
      var fld = specialFields[fldName];
      if (fld.type === "esriFieldTypeDate") {
        isDate = true;
        var _f;
        if (Object.keys(dateFields).indexOf(fldName) > -1) {
          var dFormat = dateFields[fldName];
          if (typeof (dFormat) !== 'undefined') {
            _f = { dateFormat: dFormat };
          } else {
            _f = { dateFormat: defaultDateFormat };
          }
        } else {
          _f = { dateFormat: defaultDateFormat };
        }
        value = utils.fieldFormatter.getFormattedDate(new Date(fldValue), _f);
      }
    }
    if (!isDate && layerDefinition && attr) {
      var _result = utils.getDisplayValueForCodedValueOrSubtype(layerDefinition, fldName, attr);
      if((_result && _result.hasOwnProperty('displayValue')) && _result.isCodedValueOrSubtype) {
        value = _result.displayValue;
      }
      else {
        if (isStringFieldValue) {
          value = _result.displayValue;
        }
        else {
          value = this.formatNumber(value, field).num;
        }
      }
    }
    return value;
  };

  mo.getSkipFields = function (layer) {
    var skipFields = [];
    if (layer.fields) {
      for (var i = 0; i < layer.fields.length; i++) {
        var f = layer.fields[i];
        if (f && f.type && f.name) {
          if (f.type === 'esriFieldTypeGeometry') {
            skipFields.push(f.name);
          }
        }
      }
    }
    return skipFields;
  };

  mo.getSpecialFields = function (layer) {
    var spFields = {};
    var dateFields = [];
    if (layer.fields) {
      array.forEach(layer.fields, lang.hitch(this, function (fld) {
        if (fld.type === "esriFieldTypeDate" || fld.domain || fld.name === layer.typeIdField) {
          if (fld.type === "esriFieldTypeDate") {
            if (layer.infoTemplate) {
              for (var key in layer.infoTemplate._fieldsMap) {
                if (typeof (layer.infoTemplate._fieldsMap[key].fieldName) !== 'undefined') {
                  if (layer.infoTemplate._fieldsMap[key].fieldName === fld.name) {
                    if (layer.infoTemplate._fieldsMap[key].format &&
                      typeof (layer.infoTemplate._fieldsMap[key].format.dateFormat) !== 'undefined') {
                      dateFields[fld.name] = layer.infoTemplate._fieldsMap[key].format.dateFormat;
                    }
                  }
                }
              }
            }
          }
          spFields[fld.name] = fld;
        }
      }));
    }
    return {
      specialFields: spFields,
      dateFields: dateFields,
      typeIdField: layer.typeIdField,
      types: layer.types
    };
  };

  mo.getSummaryFields = function () { };

  mo.getPopupFields = function (tab) {
    var popupFields = [];
    if (tab.tabLayers.length > 0) {
      var mapLayers = tab.tabLayers;
      array.forEach(mapLayers, lang.hitch(this, function (layer) {
        var skipFields = this.getSkipFields(layer);
        if (typeof (layer.popupInfo) !== 'undefined') {
          array.forEach(layer.popupInfo.fieldInfos, lang.hitch(this, function (field) {
            if (field.visible && skipFields.indexOf(field.fieldName) === -1) {
              var fieldObj = {};
              fieldObj.value = 0;
              fieldObj.expression = field.fieldName;
              fieldObj.label = field.label;
              popupFields.push(fieldObj);
            }
          }));
        } else if (layer.infoTemplate) {
          array.forEach(layer.infoTemplate.info.fieldInfos, lang.hitch(this, function (field) {
            if (field.visible && skipFields.indexOf(field.fieldName) === -1) {
              var fieldObj = {};
              fieldObj.value = 0;
              fieldObj.expression = field.fieldName;
              fieldObj.label = field.label;
              popupFields.push(fieldObj);
            }
          }));
        }
      }));
    }
    return popupFields;
  };

  mo.getDisplayFields = function (tab) {
    var displayFields;
    if (typeof (tab.advStat) !== 'undefined' &&
      typeof (tab.advStat.stats) !== 'undefined' &&
      typeof (tab.advStat.stats.outFields) !== 'undefined') {
      displayFields = tab.advStat.stats.outFields;
    } else {
      displayFields = [];
      if (tab.tabLayers.length > 0) {
        var mapLayers = tab.tabLayers;
        array.forEach(mapLayers, lang.hitch(this, function (layer) {
          if (typeof (layer.popupInfo) !== 'undefined') {
            array.forEach(layer.popupInfo.fieldInfos, lang.hitch(this, function (field) {
              if (field.visible) {
                var fieldObj = {};
                fieldObj.value = 0;
                fieldObj.expression = field.fieldName;
                fieldObj.label = field.label;
                displayFields.push(fieldObj);
              }
            }));
          } else if (layer.infoTemplate) {
            array.forEach(layer.infoTemplate.info.fieldInfos, lang.hitch(this, function (field) {
              if (field.visible) {
                var fieldObj = {};
                fieldObj.value = 0;
                fieldObj.expression = field.fieldName;
                fieldObj.label = field.label;
                displayFields.push(fieldObj);
              }
            }));
          }
          else {
            var l = layer.layerObject ? layer.layerObject : layer;
            array.forEach(l.fields, lang.hitch(this, function (field) {
              var fieldObj = {};
              fieldObj.value = 0;
              fieldObj.expression = field.name;
              fieldObj.label = field.alias;
              displayFields.push(fieldObj);
            }));
          }
        }));
      }
    }
    return displayFields;
  };

  mo.exportToCSV = function (results, snapShot, downloadAll, analysisResults, parentInfo) {
    if (results.length === 0) {
      return false;
    }
    var name = parentInfo.baseLabel;
    var data = [];
    var cols = [];
    if (parentInfo.type === 'proximity') {
      results.sort(this.compareDistance);
    }
    var snapShotTest;
    if (typeof (snapShot.altKey) === 'undefined') {
      snapShotTest = snapShot;
    } else {
      snapShotTest = false;
      downloadAll = parentInfo.csvAllFields;
    }

    array.forEach(results, lang.hitch(this, function (gra) {
      //change for https://devtopia.esri.com/WebGIS/arcgis-webappbuilder/issues/11369
      //if (parentInfo.type === 'proximity' || parentInfo.type === 'closest') {
      //  delete gra.attributes.DISTANCE;
      //}
      if (parentInfo.type === 'closest') {
        delete gra.attributes.DISTANCE;
      }
      if (parentInfo.type === 'proximity') {
        gra.attributes.DISTANCE = this.getDistanceLabel(gra.attributes.DISTANCE,
          parentInfo.unit, parentInfo.approximateLabel);
      }

      data.push(gra.attributes);
    }));

    if (parentInfo.type === 'summary' || parentInfo.type === 'grouped') {
      if (((parentInfo.hasOwnProperty("csvAllFields") && parentInfo.csvAllFields === "allFields")) ||
        (parentInfo.hasOwnProperty("csvAllFields") &&
        (parentInfo.csvAllFields === true || parentInfo.csvAllFields === "true"))) {
        for (var prop in data[0]) {
          cols.push(prop);
        }
      } else if (((parentInfo.hasOwnProperty("csvAllFields") && parentInfo.csvAllFields === "popUpFields"))) {
        if (parentInfo.allFields) {
          //Incase of create snapshot
          for (var i = 0; i < parentInfo.summaryFields.length; i++) {
            cols.push(parentInfo.summaryFields[i].field);
          }
        } else {
          //in case popup fields
          if (parentInfo.configuredPopUpFields.length === 0) {
            // no data should be displayed as popup is disable
            data = [];
            data.push({});
          } else
            for (var i = 0; i < parentInfo.configuredPopUpFields.length; i++) {
              cols.push(parentInfo.configuredPopUpFields[i]);
            }
        }
      } else {
        //in case of analysis field
        for (var i = 0; i < parentInfo.summaryFields.length; i++) {
          cols.push(parentInfo.summaryFields[i].field);
        }
      }
    } else {
      for (var _prop in data[0]) {
        cols.push(_prop);
      }
    }

    var summaryLayer = parentInfo.layer;
    var fields = summaryLayer.fields;
    if (summaryLayer && summaryLayer.loaded && fields || snapShotTest) {
      var skipFields = !snapShot ? this.getSkipFields(summaryLayer) : [];
      var options = {};
      if (parentInfo.opLayers && parentInfo.opLayers._layerInfos) {
        var layerInfo = parentInfo.opLayers.getLayerInfoById(summaryLayer.id);
        if (layerInfo) {
          options.popupInfo = layerInfo.getPopupInfo();
        } else {
          if (typeof (summaryLayer.popupInfo) !== 'undefined') {
            options.popupInfo = summaryLayer.popupInfo;
          } else if (summaryLayer.infoTemplate) {
            options.popupInfo = summaryLayer.infoTemplate.info;
          }
        }
      }
      var _outFields = [];
      cols_loop:
      for (var ii = 0; ii < cols.length; ii++) {
        var col = cols[ii];
        if (skipFields.indexOf(col) === -1) {
          var found = false;
          var field;
          fields_loop:
          for (var iii = 0; iii < fields.length; iii++) {
            field = fields[iii];
            if (field.name === col) {
              found = true;
              break fields_loop;
            }
          }

          if (found) {
            _outFields.push(field);
          } else {
            _outFields.push({
              'name': col,
              alias: col,
              show: true,
              type: "esriFieldTypeString"
            });
          }
        }
      }

      options.datas = data;
      options.fromClient = false;
      options.withGeometry = false;
      options.outFields = _outFields;
      options.formatDate = true;
      options.formatCodedValue = true;
      options.formatNumber = false;

      var appendColumns = [];
      var appendDatas = [];
      if (!snapShot && downloadAll && typeof (analysisResults) !== 'undefined') {
        switch (parentInfo.type) {
          case 'proximity':
            appendColumns.push(parentInfo.nlsCount);
            appendDatas.push(analysisResults);
            break;
          case 'closest':
            var x = 0;
            array.forEach(analysisResults, lang.hitch(this, function (results) {
              if (x === 0) {
                array.forEach(results, function (result) {
                  appendColumns.push(result.label);
                });
                x += 1;
              }
              var row = [];
              array.forEach(results, function (result) {
                row.push(result.value);
              });
              appendDatas.push(row);
            }));
            break;
          case 'summary':
            array.forEach(analysisResults, lang.hitch(this, function (result) {
              var alias = result.info.replace('<br/>', '');
              var addField = false;
              calc_field_loop:
              for (var k = 0; k < parentInfo.calcFields.length; k++) {
                if (alias === parentInfo.calcFields[k].alias) {
                  addField = true;
                  break calc_field_loop;
                }
              }
              if (addField) {
                appendColumns.push(alias);
                appendDatas.push(result.total);
              }
            }));
            break;
          case 'grouped':
            array.forEach(analysisResults, function (result) {
              appendColumns.push(result.info.replace('<br/>', ''));
              appendDatas.push(result.total);
            });
            break;
        }
      }

      if (!snapShotTest) {
        CSVUtils.exportCSVFromFeatureLayer(name, summaryLayer, options);
        return {
          summaryLayer: summaryLayer,
          details: {
            appendColumns: appendColumns,
            appendDatas: appendDatas,
            name: name,
            type: parentInfo.nlsValue
          }
        };
      } else {
        return {
          summaryLayer: summaryLayer,
          details: _outFields
        };
      }
    } else {
      //This does not handle value formatting
      CSVUtils.exportCSV(name, data, cols);
    }
  };

  mo.isURL = function (v) {
    return /(https?:\/\/|ftp:)/g.test(v);
  };

  mo.isEmail = function (v) {
    return /\S+@\S+\.\S+/.test(v);
  };

  mo.queryTabCount = function () { };

  mo.performQuery = function () { };

  mo.getFilter = function (id, opLayers) {
    var expr = "";
    opLayers.traversal(function (layerInfo) {
      if (id === layerInfo.id && layerInfo.getFilter()) {
        expr = layerInfo.getFilter();
        return true;
      }
    });
    return expr;
  };

  mo.getGeoms = function (buffers) {
    //Test for intersecting buffers..if intersecting they need to be unioned
    // to avoid duplicates within the count, length, and area calcs
    //Only polygons are accounted for
    var removedIndexes = [];
    var geoms = [];
    for (var j = 0; j < buffers.length; j++) {
      var geom1 = buffers[j].geometry ? buffers[j].geometry : buffers[j];
      if (geom1.type === 'polygon' && removedIndexes.indexOf(j) === -1) {
        for (var jj = 0; jj < buffers.length; jj++) {
          if (jj !== j && removedIndexes.indexOf(jj) === -1) {
            var geom2 = buffers[jj].geometry ? buffers[jj].geometry : buffers[jj];
            if (geom2.type === 'polygon') {
              var intersects = geometryEngine.intersects(geom1, geom2);
              if (intersects) {
                removedIndexes.push(jj);
                geom1 = geometryEngine.union(geom1, geom2);
              }
            } else {
              removedIndexes.push(jj);
            }
          }
        }
        geoms.push(geom1);
      }
    }
    return geoms;
  };

  mo.createDefArray = function (tabLayers, geom, opLayers, tab) {
    var defArray = [];
    for (var i = 0; i < tabLayers.length; i++) {
      var layer = tabLayers[i];
      if (layer) {
        var query = new Query();
        query.returnGeometry = false;
        query.geometry = geom;
        var id = [null, undefined, ""].indexOf(layer.id) === -1 ? layer.id : tab.layers;
        query.where = this.getFilter(id, opLayers);
        if (typeof (layer.queryCount) !== 'undefined') {
          defArray.push(layer.queryCount(query));
        } else if (typeof (layer.queryIds) !== 'undefined') {
          defArray.push(layer.queryIds(query));
        } else if (typeof (layer.queryFeatures) !== 'undefined') {
          defArray.push(layer.queryFeatures(query));
        }
      }
    }
    return defArray;
  };

  mo.updateTabCount = function (count, updateNode, displayCount, baseLabel, incidentCount) {
    var hasIncident = (typeof (incidentCount) !== 'undefined' && incidentCount > 0) ? true : false;

    var currentWidth = domGeom.position(updateNode).w;

    if (typeof (count) !== 'undefined' && count === 0) {
      domClass.remove(updateNode, 'noFeatures');
      domClass.remove(updateNode, 'noFeaturesActive');
      domClass.add(updateNode, hasIncident ? 'noFeaturesActive' : 'noFeatures');
    } else {
      if (hasIncident && domClass.contains(updateNode, 'noFeatures')) {
        domClass.remove(updateNode, 'noFeatures');
      }
      if (hasIncident && domClass.contains(updateNode, 'noFeaturesActive')) {
        domClass.remove(updateNode, 'noFeaturesActive');
      }
    }

    if (displayCount) {
      var label;
      if (typeof (count) !== 'undefined') {
        label = baseLabel + " (" + utils.localizeNumber(count).toString() + ")";
      } else {
        label = baseLabel;
      }
      updateNode.innerHTML = label;
    }

    var newWidth = domGeom.position(updateNode).w;
    var adjustWidth = 0;
    var add;
    if (newWidth > currentWidth) {
      add = true;
      adjustWidth = newWidth - currentWidth;
    } else if (currentWidth > newWidth) {
      add = false;
      adjustWidth = currentWidth - newWidth;
    }
    var pNodeW = domGeom.position(updateNode.parentNode).w;
    if (pNodeW > 0) {
      var pw = add ? pNodeW + adjustWidth : pNodeW - adjustWidth;
      domStyle.set(updateNode.parentNode, "width", pw + "px");

      var footerContentNode = updateNode.parentNode.parentNode;
      var footerNode = footerContentNode.parentNode;

      var panelRight, panelLeft;
      if (footerNode && footerNode.children && footerNode.children.length > 0) {
        for (var i = 0; i < footerNode.children.length; i++) {
          var c = footerNode.children[i];
          if(window.isRTL) {
            if (c.className.indexOf('SA_panelLeft') > -1) {
              if(c) {
                panelLeft= c;
                break;
              }
            }
          }else {
          if (c.className.indexOf('SA_panelRight') > -1) {
            panelRight = c;
            break;
          }
          }
        }
      }

      if (panelLeft && footerContentNode) {
        if (pw > domGeom.position(footerNode).w) {
          domStyle.set(footerContentNode, 'left', "58" + "px");
          domStyle.set(panelLeft, 'display', 'block');
        } else {
          domStyle.set(footerContentNode, 'left', "24px");
          domStyle.set(panelLeft, 'display', 'none');
        }
      }
      if (panelRight && footerContentNode) {
        if (pw > domGeom.position(footerNode).w) {
          domStyle.set(footerContentNode, 'right', "58" + "px");
          domStyle.set(panelRight, 'display', 'block');
        } else {
          domStyle.set(footerContentNode, 'right', "24px");
          domStyle.set(panelRight, 'display', 'none');
        }
      }
    }
  };

  mo.getDistanceLabel = function (dist, unit, label) {
    return (Math.round(dist * 100) / 100) + " " + unit + " (" + label + ")";
  };

  mo.getSum = function (features, field) {
    var value = 0;
    array.forEach(features, function (gra) {
      value += gra.attributes[field];
    });
    return value;
  };

  mo.getMin = function (features, field) {
    features.sort(sortResults(field));
    return features[0].attributes[field];
  };

  mo.getMax = function (features, field) {
    features.sort(sortResults(field));
    features.reverse();
    return features[0].attributes[field];
  };

  mo.getArea = function (features, geoms, distanceSettings, distanceUnits, advStat) {
    var value = 0;
    var areaUnits = lang.clone(distanceSettings);
    areaUnits.miles = 109413;
    areaUnits.kilometers = 109414;
    areaUnits.feet = 109405;
    areaUnits.meters = 109404;
    areaUnits.yards = 109442;
    areaUnits.nauticalMiles = 109409;
    var units = distanceUnits;
    var unitCode = areaUnits[units];
    var info;
    if (advStat && advStat.stats && advStat.stats.area && advStat.stats.area.length > 0) {
      info = advStat.stats.area[0];
    }
    array.forEach(features, function (gra) {
      for (var i = 0; i < geoms.length; i++) {
        var sg = geoms[i];
        var intersectGeom = geometryEngine.intersect(gra.geometry, sg);
        if (intersectGeom !== null) {
          var sr = intersectGeom.spatialReference;
          if (sr.wkid === 4326 || sr.isWebMercator() || (sr.isGeographic && sr.isGeographic())) {
            value += geometryEngine.geodesicArea(intersectGeom, unitCode);
          } else {
            value += geometryEngine.planarArea(intersectGeom, unitCode);
          }
        }
      }
    });
    return this.formatNumber(value, info).total;
  };

  mo.getLength = function (features, geoms, distanceSettings, distanceUnits, advStat) {
    var value = 0;
    var units = distanceUnits;
    var unitCode = distanceSettings[units];
    var info;
    if (advStat && advStat.stats && advStat.stats.length && advStat.stats.length.length > 0) {
      info = advStat.stats.length[0];
    }
    array.forEach(features, function (gra) {
      for (var i = 0; i < geoms.length; i++) {
        var sg = geoms[i];
        var intersectGeom = geometryEngine.intersect(gra.geometry, sg);
        if (intersectGeom !== null) {
          var sr = intersectGeom.spatialReference;
          if (sr.wkid === 4326 || sr.isWebMercator() || (sr.isGeographic && sr.isGeographic())) {
            value += geometryEngine.geodesicLength(intersectGeom, unitCode);
          } else {
            value += geometryEngine.planarLength(intersectGeom, unitCode);
          }
        }
      }
    });
    return this.formatNumber(value, info).total;
  };

  mo.getDistance = function (geom1, geom2, units) {
    var p1 = geom1.type !== 'point' ? geom1.getExtent().getCenter() : geom1;
    var p2 = geom2.type !== 'point' ? geom2.getExtent().getCenter() : geom2;
    var l = new Polyline([[p1.x, p1.y], [p2.x, p2.y]]);
    l.spatialReference = geom1.spatialReference;
    var dist;
    units = units === "nauticalMiles" ? "nautical-miles" : units;
    if (geom1.spatialReference.wkid === 4326 || geom1.spatialReference.isWebMercator()) {
      dist = geometryEngine.geodesicLength(l, units);
    } else {
      dist = geometryEngine.planarLength(l, units);
    }
    return dist;
  };

  mo.compareDistance = function (a, b) {
    if (a.attributes.DISTANCE < b.attributes.DISTANCE) {
      return -1;
    }
    if (a.attributes.DISTANCE > b.attributes.DISTANCE) {
      return 1;
    }
    return 0;
  };

  // o is expected to have
  //modify, round, roundPlaces, truncate, truncatePlaces, total
  mo.formatNumber = function(v, o) {
    var n = v, num;
    if (!isNaN(v) && v !== null && v !== '') {
      var modifyField = o && o.modify && !isNaN(v);
      var truncateExp;
      if (modifyField && typeof(o.truncatePlaces) !== 'undefined' && !isNaN(o.truncatePlaces)) {
        truncateExp = new RegExp(o.truncatePlaces > 0 ? "^\\d*[.]?\\d{0," + o.truncatePlaces + "}" : "^\\d*");
      }
      n = modifyField && o.round ? v.toFixed(o.roundPlaces) * 1 :
        modifyField && o.truncate ? truncateExp.exec(v)[0] * 1 : v;
      if (isNaN(n)) {
        n = 0;
      }
    }
    num = n;
    if (!isNaN(n) && n !== null && n !== '') {
      var use1kSeparator = o && o.show1KSeparator;
      //For Backward use1kSeparator will be undefined i.e. format the number
      if ((use1kSeparator) || (typeof (use1kSeparator) === 'undefined')) {
        num = utils.localizeNumber(n);
      }
    }
    return {
      total: n,
      num: num
    };
  };

  // sort results
  function sortResults(property) {
    return function (a, b) {
      var result = (a.attributes[property] < b.attributes[property]) ? -1 :
        (a.attributes[property] > b.attributes[property]) ? 1 : 0;
      return result;
    };
  };

  mo.getPopupConfiguredFields = function (layer) {
    var popupFields = [];
    var mapLayers = layer;
    if (typeof (layer.popupInfo) !== 'undefined') {
      array.forEach(layer.popupInfo.fieldInfos, lang.hitch(this, function (field) {
        if (field.visible) {
          popupFields.push(field.fieldName);
        }
      }));
    } else if (layer.infoTemplate) {
      array.forEach(layer.infoTemplate.info.fieldInfos, lang.hitch(this, function (field) {
        if (field.visible) {
          popupFields.push(field.fieldName);
        }
      }));
    }
    return popupFields;
  };

  return mo;
});