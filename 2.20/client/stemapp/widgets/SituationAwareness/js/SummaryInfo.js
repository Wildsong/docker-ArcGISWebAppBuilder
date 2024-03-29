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
  'dojo/_base/declare',
  'dojo/Evented',
  'dojo/_base/array',
  'dojo/DeferredList',
  'dojo/Deferred',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/on',
  'dojo/keys',
  'jimu/utils',
  'jimu/dijit/Message',
  'esri/graphic',
  'esri/layers/FeatureLayer',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  './analysisUtils'
], function (
  declare,
  Evented,
  array,
  DeferredList,
  Deferred,
  lang,
  domClass,
  domConstruct,
  on,
  keys,
  utils,
  Message,
  Graphic,
  FeatureLayer,
  Query,
  QueryTask,
  analysisUtils
) {

  var summaryInfo = declare('SummaryInfo', [Evented], {

    summaryLayer: null,
    summaryFields: [],
    summaryIds: [],
    summaryFeatures: [],
    tabNum: null,
    symbolField: null,
    graphicsLayer: null,
    lyrRenderer: null,
    lyrSymbol: null,
    featureCount: 0,
    mapServiceLayer: false,
    loading: false,
    queryOnLoad: false,
    incidentCount: 0,
    allFields: false,
    configuredPopUpFields: [],

    constructor: function (tab, container, parent) {
      this.tab = tab;
      this.container = container;
      this.parent = parent;
      this.config = parent.config;
      this.graphicsLayer = null;
      this.baseLabel = tab.label !== "" ? tab.label : tab.layerTitle ? tab.layerTitle : tab.layers;
      this.parentNode = parent.domNode;
    },

    queryTabCount: function (incidents, buffers, updateNode, displayCount) {
      var def = new Deferred();
      this.incidentCount = incidents.length;
      var tabLayers = [this.tab.tabLayers[0]];
      if(this.mapServiceLayer && this.tab.tabLayers.length > 1){
        tabLayers = [this.tab.tabLayers[1]];
      }
      if (this.tab.tabLayers.length > 0) {
        if (this.tab.tabLayers[0].url) {
          if (this.tab.tabLayers[0].url.indexOf("MapServer") > -1) {
            this.mapServiceLayer = true;
            var tempFL;
            if (typeof (this.tab.tabLayers[0].infoTemplate) !== 'undefined') {
              this.summaryLayer = this.tab.tabLayers[0];
              if (this.summaryLayer.hasOwnProperty('loaded') && this.summaryLayer.loaded) {
                this.summaryFields = this._getFields(this.summaryLayer);
                this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
                  def.resolve(r);
                });
              } else {
                tempFL = new FeatureLayer(this.summaryLayer.url);
                tempFL.infoTemplate = this.tab.tabLayers[0].infoTemplate;
                tabLayers = [tempFL];
                this.tab.tabLayers = tabLayers;
                on(tempFL, "load", lang.hitch(this, function () {
                  this.summaryLayer = tempFL;
                  this.summaryFields = this._getFields(this.summaryLayer);
                  this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
                    def.resolve(r);
                  });
                }));
              }
            } else {
              if (!this.loading) {
                tempFL = new FeatureLayer(this.tab.tabLayers[0].url);
                this.loading = true;
                on(tempFL, "load", lang.hitch(this, function () {
                  this.summaryLayer = tempFL;
                  this.summaryFields = this._getFields(this.summaryLayer);
                  var lID = this.tab.tabLayers[0].url.split("MapServer/")[1];
                  var mapLayers = this.parent.map.itemInfo.itemData.operationalLayers;
                  for (var i = 0; i < mapLayers.length; i++) {
                    var lyr = mapLayers[i];
                    if (this.tab.tabLayers[0].url.indexOf(lyr.url) > -1) {
                      if (typeof (lyr.layerObject) !== 'undefined') {
                        if (lyr.layerObject.infoTemplates) {
                          var infoTemplate = lyr.layerObject.infoTemplates[lID];
                          if (infoTemplate) {
                            tempFL.infoTemplate = infoTemplate.infoTemplate;
                            break;
                          }
                        } else if (lyr.layerObject.infoTemplate) {
                          tempFL.infoTemplate = lyr.layerObject.infoTemplate;
                          break;
                        }
                      }
                    }
                  }
                  tabLayers = [tempFL];
                  this.tab.tabLayers = tabLayers;
                  this.loading = false;
                  this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
                    def.resolve(r);
                  });
                }));
              }
            }
          }
        }
      }
      if (!this.mapServiceLayer) {
        this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
          def.resolve(r);
        });
      }
      return def;
    },

    _performQuery: function (incidents, buffers, updateNode, displayCount, tabLayers) {
      var def = new Deferred();
      var defArray = [];
      var geom;
      var prevArray;
      var da;
      var geoms;
      if (buffers.length > 0) {
        geoms = analysisUtils.getGeoms(buffers);
      } else if (incidents.length > 0) {
        geoms = analysisUtils.getGeoms(incidents);
      }
      this.summaryGeoms = geoms;
      if (geoms.length > 0) {
        for (var ii = 0; ii < geoms.length; ii++) {
          geom = geoms[ii];
          da = analysisUtils.createDefArray(tabLayers, geom, this.parent.opLayers, this.tab);
          if (ii === 0) {
            defArray = da;
            prevArray = da;
          } else {
            defArray = prevArray.concat(da);
            prevArray = defArray;
          }
        }
      }
      var defList = new DeferredList(defArray);
      defList.then(lang.hitch(this, function (defResults) {
        var length = 0;
        for (var r = 0; r < defResults.length; r++) {
          var featureSet = defResults[r][1];
          if (!isNaN(featureSet)) {
            length += featureSet;
          } else if (featureSet && featureSet.features) {
            length += featureSet.features.length;
          } else if (featureSet && typeof (featureSet.length) !== 'undefined') {
            length += featureSet.length;
          }
        }
        this.updateTabCount(length, updateNode, displayCount);
        if (this.queryOnLoad) {
          lang.hitch(this, this._queryFeatures(this.summaryGeoms));
        }
        def.resolve(length);
      }));
      return def;
    },

    updateTabCount: function (count, updateNode, displayCount) {
      this.featureCount = count;
      analysisUtils.updateTabCount(this.featureCount, updateNode, displayCount, this.baseLabel, this.incidentCount);
    },

    /* jshint unused: true */
    // update for incident
    updateForIncident: function (incidents, buffers, graphicsLayer, num, snapShot, createSnapShot, downloadAll) {
      this.incidentCount = incidents.length;
      if (typeof (createSnapShot) !== 'undefined' && typeof (downloadAll) !== 'undefined') {
        if (!createSnapShot) {
          this.allFields = downloadAll;
        } else {
          this.allFields = true;
        }
      } else {
        this.allFields = false;
      }
      var isSnapShot = typeof (snapShot) !== 'undefined';
      var def;
      this.tabNum = num;
      if (!isSnapShot) {
        this.container.innerHTML = "";
        domClass.add(this.container, "loading");
      } else {
        def = new Deferred();
      }
      this.summaryIds = [];
      this.summaryFeatures = [];
      if (this.tab.tabLayers.length > 0) {
        var geoms = this.summaryGeoms;
        var tempFL;
        if (typeof (this.tab.tabLayers[0].infoTemplate) !== 'undefined') {
          this.summaryLayer = this.tab.tabLayers[0];
          tempFL = new FeatureLayer(this.summaryLayer.url);
          tempFL.infoTemplate = this.tab.tabLayers[0].infoTemplate;
          this.tab.tabLayers[1] = tempFL;
          this.summaryFields = this._getFields(this.tab.tabLayers[0]);
          this.configuredPopUpFields = analysisUtils.getPopupConfiguredFields(this.tab.tabLayers[0]);
          if (isSnapShot) {
            this._queryFeatures(geoms, isSnapShot).then(function (results) {
              def.resolve(results);
            });
          } else {
            this._initGraphicsLayer(graphicsLayer);
            lang.hitch(this, this._queryFeatures(geoms));
          }
        } else {
          tempFL = new FeatureLayer(this.tab.tabLayers[0].url);
          on(tempFL, "load", lang.hitch(this, function () {
            this.summaryLayer = tempFL;
            if (this.tab.tabLayers[0].url.indexOf("MapServer") > -1) {
              var lID = this.tab.tabLayers[0].url.split("MapServer/")[1];
              var mapLayers = this.parent.map.itemInfo.itemData.operationalLayers;
              for (var i = 0; i < mapLayers.length; i++) {
                var lyr = mapLayers[i];
                if (this.tab.tabLayers[0].url.indexOf(lyr.url) > -1) {
                  if (typeof (lyr.layerObject) !== 'undefined') {
                    if (lyr.layerObject.infoTemplates) {
                      var infoTemplate = lyr.layerObject.infoTemplates[lID];
                      if (infoTemplate) {
                        tempFL.infoTemplate = infoTemplate.infoTemplate;
                        break;
                      }
                    }
                  }
                }
              }
            }
            this.tab.tabLayers[1] = tempFL;
            this.summaryLayer = this.tab.tabLayers[1];
            this.summaryFields = this._getFields(this.tab.tabLayers[1]);
            this.configuredPopUpFields = analysisUtils.getPopupConfiguredFields(this.tab.tabLayers[1]);
            if (isSnapShot) {
              this._queryFeatures(geoms, isSnapShot).then(function (results) {
                def.resolve(results);
              });
            } else {
              this._initGraphicsLayer(graphicsLayer);
              lang.hitch(this, this._queryFeatures(geoms));
            }
          }));
        }
        if (isSnapShot) {
          return def;
        }
      }
    },

    _initGraphicsLayer: function (gl) {
      if (gl !== null) {
        this.graphicsLayer = gl;
        this.graphicsLayer.clear();
        if (this.summaryLayer) {
          if (this.summaryLayer.renderer) {
            this.lyrRenderer = this.summaryLayer.renderer;

            //does not seem to work with an expression
            //only way I have been able to make it work is like this.
            // example expression this is based on "[WIND_DIRECT] + 90"
            // this.lyrRenderer.setRotationInfo({
            //    field: function(graphic){
            //     return graphic.attributes.WIND_DIRECT + 90;
            //    },
            //    type: "geographic"
            // });

            this.graphicsLayer.renderer = this.lyrRenderer;
            if (typeof (this.summaryLayer.renderer.attributeField) !== 'undefined') {
              this.symbolField = this.summaryLayer.renderer.attributeField;
            } else {
              this.lyrSymbol = this.lyrRenderer.symbol;
            }
          }
        }
      }
    },

    // query features
    _queryFeatures: function (geoms, snapShot) {
      var def;
      if (snapShot) {
        def = new Deferred();
      }
      var defArray = [];
      var id = [null, undefined, ""].indexOf(this.tab.tabLayers[0].id) === -1 ?
        this.tab.tabLayers[0].id : this.tab.layers;
      var expr = analysisUtils.getFilter(id, this.parent.opLayers);
      var query = new Query();
      for (var i = 0; i < geoms.length; i++) {
        var geom = geoms[i];
        query.geometry = geom;
        query.where = expr;
        defArray.push(this.summaryLayer.queryIds(query));
      }

      var defList = new DeferredList(defArray);
      defList.then(lang.hitch(this, function (defResults) {
        var objectIds;
        var prevObjectIds;
        for (var r = 0; r < defResults.length; r++) {
          if (defResults[r][0]) {
            var oids = defResults[r][1];
            if (r === 0) {
              objectIds = oids;
            } else {
              objectIds = prevObjectIds.concat(oids);
            }
            prevObjectIds = objectIds;
          }
        }
        if (objectIds) {
          this.summaryIds = objectIds;
          if (this.summaryIds.length > 0) {
            if (snapShot) {
              this._queryFeaturesByIds(snapShot).then(function (results) {
                def.resolve(results);
              });
            } else {
              this._queryFeaturesByIds();
            }
          } else {
            if (!snapShot) {
              this._processResults();
            }
          }
        } else {
          //this._processResults();
          //TODO this block does not seem like it would be called anymore
          // now that we don't allow you to click a tab with no features
          if (!snapShot) {
            this._processResults();
          }
        }
      }), lang.hitch(this, function (err) {
        console.error(err);
        new Message({
          message: err
        });
      }));
      if (snapShot) {
        return def;
      }
    },

    _queryFeaturesByIds: function (snapShot) {
      var def;
      var defArray = [];
      if (snapShot) {
        def = new Deferred();
      }
      var max = this.summaryLayer.maxRecordCount || 1000;
      var ids = this.summaryIds.slice(0, max);
      this.summaryIds.splice(0, max);
      var query = new Query();
      query.where = analysisUtils.getFilter(this.summaryLayer.id, this.parent.opLayers);
      var includeGeom = false;
      array.some(this.summaryFields, lang.hitch(this, function (obj) {
        if (obj.type === "area" || obj.type === "length" || this.graphicsLayer) {
          includeGeom = true;
          return true;
        }
      }));
      //TODO should be avoided for CSV
      if (snapShot) {
        includeGeom = true;
      }
      query.returnGeometry = includeGeom;
      query.outSpatialReference = this.parent.map.spatialReference;
      //always query all fields for issue #12982
      query.outFields = ['*'];
      query.objectIds = ids;
      var qt = new QueryTask(this.summaryLayer.url);
      defArray.push(qt.execute(query));
      while (this.summaryIds.length > 0) {
        ids = this.summaryIds.slice(0, max);
        this.summaryIds.splice(0, max);
        query.objectIds = ids;
        defArray.push(qt.execute(query));
      }

      var defList = new DeferredList(defArray);
      defList.then(lang.hitch(this, function (defResults) {
        this.summaryFeatures = [];
        for (var r = 0; r < defResults.length; r++) {
          if (defResults[r][0]) {
            var featureSet = defResults[r][1];
            if (featureSet.features) {
              this.summaryFeatures = this.summaryFeatures.concat(featureSet.features);
            }
          }
        }
        if (snapShot) {
          this._processResults(snapShot).then(lang.hitch(this, function (results) {
            if (this.SA_SAT_download) {
              domClass.replace(this.SA_SAT_download, "download", "processing");
            }
            def.resolve(results);
          }));
        } else {
          this._processResults();
          if (this.SA_SAT_download) {
            domClass.replace(this.SA_SAT_download, "download", "processing");
          }
        }

        if (this.SA_SAT_download) {
          domClass.replace(this.SA_SAT_download, "download", "processing");
        }
      }), lang.hitch(this, function (err) {
        console.error(err);
        new Message({
          message: err
        });
      }));
      if (snapShot) {
        return def;
      }
    },

    // prep results
    _prepResults: function () {
      for (var f = 0; f < this.summaryFields.length; f++) {
        var obj = this.summaryFields[f];
        var fld = obj.field;
        var type = obj.type;
        var value = obj.total;
        switch (type) {
          case "count":
            value = this.summaryFeatures.length;
            break;
          case "area":
            value = analysisUtils.getArea(this.summaryFeatures, this.summaryGeoms,
              this.config.distanceSettings, this.config.distanceUnits, this.tab.advStat);
            break;
          case "length":
            value = analysisUtils.getLength(this.summaryFeatures, this.summaryGeoms,
              this.config.distanceSettings, this.config.distanceUnits, this.tab.advStat);
            break;
          case "sum":
            value = analysisUtils.getSum(this.summaryFeatures, fld);
            break;
          case "avg":
            var t = analysisUtils.getSum(this.summaryFeatures, fld);
            value = t / this.summaryFeatures.length;
            break;
          case "min":
            value = analysisUtils.getMin(this.summaryFeatures, fld);
            break;
          case "max":
            value = analysisUtils.getMax(this.summaryFeatures, fld);
            break;
        }
        obj.total = value;
      }
    },

    // process results
    //Solutions: added a string search looking for area or length to not round up.
    _processResults: function (snapShot) {
      this._prepResults();
      var def;
      var results = this.summaryFields;
      var total = 0;
      var tpc;
      if (snapShot) {
        def = new Deferred();
      } else {
        this.container.innerHTML = "";
        domClass.remove(this.container, "loading");
        if (this.summaryFeatures.length === 0) {
          this.container.innerHTML = this.parent.nls.noFeaturesFound;
          return;
        }
        var numberOfDivs = results.length + 1;
        tpc = domConstruct.create("div", {
          style: "width:" + (numberOfDivs * 220) + "px;"
        }, this.container);

        domClass.add(tpc, "SAT_tabPanelContent");

        var div_results_extra = domConstruct.create("div", {}, tpc);
        domClass.add(div_results_extra, "SATcolExport");
        domClass.add(div_results_extra, this.parent.lightTheme ? 'lightThemeBorder' : 'darkThemeBorder');

        var div_exp = domConstruct.create("div", {
          'data-dojo-attach-point': 'SA_SAT_download',
          title: this.parent.nls.downloadCSV,
          "tabindex":"0",
          "role": "button",
          "aria-label": this.parent.nls.downloadCSV,
          "class":"summaryDownLoadCSVButton"
        }, div_results_extra);
        utils.initFirstFocusNode(this.parentNode, div_exp);
        utils.initLastFocusNode(this.parentNode, div_exp);
        var exportClass = this.parent.isBlackTheme ? 'btnExportBlack' : 'btnExport';
        domClass.add(div_exp, [exportClass, 'download']);
        domClass.add(div_exp, this.parent.lightTheme ? 'lightThemeBackground' : 'darkThemeBackground');
        div_exp.focus();
        on(div_exp, "click", lang.hitch(this, this._exportToCSV, results));
        //Listen for ENTER and SPACE button click on download button
        on(div_exp, "keydown", lang.hitch(this, function (evt) {
          if (evt.shiftKey && evt.keyCode === keys.TAB) {
            return;
          }
          if (evt.keyCode === keys.TAB) {
            div_exp.focus();
          }
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._exportToCSV(results, evt);
            setTimeout(function () {
              div_exp.focus();
            }, 500);
          }
        }));
      }

      var snapShotResults = [];
      for (var i = 0; i < results.length; i++) {
        var obj = results[i];
        var info = utils.stripHTML(obj.alias ? obj.alias : '') + "<br/>";
        var formatNum = analysisUtils.formatNumber(obj.total, obj);
        total = formatNum.total;
        var num = formatNum.num;

        if (!snapShot) {
          var div = domConstruct.create("div", { 'class': 'SATcol' }, tpc);
          domClass.add(div, this.parent.lightTheme ? 'lightThemeBorder' : 'darkThemeBorder');
          var topDiv = domConstruct.create("div", {
            style: 'max-height: 60px;'
          }, div);
          domConstruct.create("div", {
            'class': ' SATcolWrap',
            style: 'max-height: 30px; overflow: hidden;',
            innerHTML: info
          }, topDiv);
          domConstruct.create("div", {
            'class': ' colSummary',
            innerHTML: num
          }, div);
        } else {
          snapShotResults.push({
            num: num,
            info: info,
            total: total
          });
        }
      }
      var snapShotGraphics = [];
      var gl = this.graphicsLayer !== null;
      if (!snapShot && gl) {
        this.graphicsLayer.clear();
        this.tab.tabLayers[1].clear();
      }
      if (this.summaryFeatures) {
        for (var ii = 0; ii < this.summaryFeatures.length; ii++) {
          var gra = this.summaryFeatures[ii];
          if (this.lyrSymbol) {
            gra.symbol = this.lyrSymbol;
          } else if (gl && this.graphicsLayer.renderer) {
            var sym = this.graphicsLayer.renderer.getSymbol(gra);
            gra.symbol = sym;
          } else if (this.summaryLayer.renderer && this.summaryLayer.renderer.getSymbol) {
            gra.symbol = this.summaryLayer.renderer.getSymbol(gra);
          }
          var g = gra.toJson ? new Graphic(gra.toJson()) : gra;
          if (!snapShot && gl) {
            this.graphicsLayer.add(g);
            this.tab.tabLayers[1].add(g);
          } else {
            snapShotGraphics.push(g);
          }
        }
      }
      if (!snapShot && gl) {
        this.graphicsLayer.setVisibility(true);
        this.parent._toggleTabLayersNew(this.tabNum);
        if (this.tab.restore) {
          this.emit("summary-complete", {
            bubbles: true,
            cancelable: true,
            tab: this.tabNum
          });
        }
      }
      if (snapShot) {
        def.resolve({
          graphics: snapShotGraphics,
          analysisResults: snapShotResults,
          context: this
        });
        return def;
      }
    },

    _exportToCSV: function (results, snapShot, downloadAll, analysisResults) {
      var csvAllFields;
      //csvAllFields param value depends on old or new key
      if (this.parent.config.hasOwnProperty("exportFieldsOptionForCSV")) {
        //new key
        csvAllFields = this.parent.config.exportFieldsOptionForCSV;
      } else if (this.parent.config.hasOwnProperty("csvAllFields")) {
        //old key
        csvAllFields = this.parent.config.csvAllFields;
      }
      var pi = {
        type: 'summary',
        baseLabel: this.baseLabel,
        csvAllFields: csvAllFields,
        layer: this.summaryLayer,
        opLayers: this.parent.opLayers,
        nlsValue: this.parent.nls.summary,
        nlsCount: this.parent.nls.count,
        summaryFields: this.summaryFields,
        calcFields: this.calcFields,
        allFields: this.allFields, // to identify create snapshot is clicked or not
        configuredPopUpFields: this.configuredPopUpFields
      };
      var res = analysisUtils.exportToCSV(this.summaryFeatures, snapShot, downloadAll, analysisResults, pi);
      this.summaryLayer = res.summaryLayer;
      return res.details;
    },

    _getFieldInfoByFieldInfo: function (stats, key, name) {
      return this._getFieldInfo(stats[key], key, name);
    },

    _getFieldInfoByName: function (stats, name) {
      var skipKeys = ['count', 'area', 'length', 'tabCount'];
      for (var key in stats) {
        if (skipKeys.indexOf(key) === -1) {
          return this._getFieldInfo(stats[key], key, name);
        }
      }
    },

    _getFieldInfo: function (statGroup, key, name) {
      for (var i = 0; i < statGroup.length; i++) {
        var element = statGroup[i];
        if (element.expression && element.expression === name) {
          return {
            field: {
              field: element.expression,
              alias: element.label,
              type: key,
              modify: element.modify,
              round: element.round,
              roundPlaces: element.roundPlaces,
              truncate: element.truncate,
              truncatePlaces: element.truncatePlaces,
              total: 0,
              show1KSeparator: (typeof (element.show1KSeparator) !== 'undefined') ? element.show1KSeparator : true
            },
            index: i
          };
        }
      }
    },

    //TODO will take some effort to consolidate this with the analysisUtils
    // Solutions: Added case to handle fields structure coming from a map service.
    // also added a small integer into summary types.
    /*jshint loopfunc: true */
    _getFields: function (layer) {
      this.layerDefinition = utils.getFeatureLayerDefinition(layer);
      this.layerObject = layer;
      var skipFields = analysisUtils.getSkipFields(layer);
      var fields = [];
      if (typeof (this.tab.advStat) !== 'undefined') {
        var stats = lang.clone(this.tab.advStat.stats);
        //added to support maintaining the field order across multiple analysis types
        // need to maintain the old way as well as older configs will not have the fieldOrder array
        if (this.tab.advStat.fieldOrder) {
          array.forEach(this.tab.advStat.fieldOrder, lang.hitch(this, function (orderInfo) {
            var fi = (orderInfo && orderInfo.hasOwnProperty('fieldName')) ?
              this._getFieldInfoByFieldInfo(stats, orderInfo.fieldType, orderInfo.fieldName) :
              this._getFieldInfoByName(stats, orderInfo);
            if (fi && fi.field) {
              var statGroup = stats[fi.field.type];
              statGroup.splice(fi.index, 1);
              if (statGroup.length === 0) {
                delete stats[fi.field.type];
              }
              fields.push(fi.field);
            }
          }));
        }
        for (var key in stats) {
          if (stats[key].length > 0) {
            array.forEach(stats[key], function (pStat) {
              fields.push({
                field: pStat.expression,
                alias: pStat.label,
                type: key,
                modify: pStat.modify,
                round: pStat.round,
                roundPlaces: pStat.roundPlaces,
                truncate: pStat.truncate,
                truncatePlaces: pStat.truncatePlaces,
                total: 0,
                show1KSeparator: (typeof (pStat.show1KSeparator) !== 'undefined') ? pStat.show1KSeparator : true
              });
            });
          }
        }
      } else {
        var fldInfos;
        if (layer.infoTemplate) {
          fldInfos = layer.infoTemplate.info.fieldInfos;
        } else if (this.tab.tabLayers[0].url.indexOf("MapServer") > -1) {
          var lID = this.tab.tabLayers[0].url.split("MapServer/")[1];
          var mapLayers = this.parent.map.itemInfo.itemData.operationalLayers;
          fldInfos = null;
          for (var ii = 0; ii < mapLayers.length; ii++) {
            var lyr = mapLayers[ii];
            if (lyr.layerObject.infoTemplates) {
              var infoTemplate = lyr.layerObject.infoTemplates[lID];
              if (infoTemplate) {
                fldInfos = infoTemplate.infoTemplate.info.fieldInfos;
                break;
              }
            }
          }
        } else {
          fldInfos = layer.fields;
        }
        if (!fldInfos) {
          fldInfos = layer.fields;
        }
        for (var i = 0; i < fldInfos.length; i++) {
          var fld = fldInfos[i];
          if (typeof (layer.fields) !== 'undefined') {
            var fldType = layer.fields[i].type;
            var obj;
            if (fld.name !== layer.objectIdField && (fldType === "esriFieldTypeDouble" ||
            fldType === "esriFieldTypeInteger" || fldType === "esriFieldTypeSmallInteger")) {
              if (typeof (fld.visible) !== 'undefined') {
                if (fld.visible) {
                  obj = {
                    field: fld.fieldName,
                    alias: fld.label,
                    type: "sum",
                    total: 0
                  };
                }
              } else {
                obj = {
                  field: fld.name,
                  alias: fld.alias,
                  type: "sum",
                  total: 0
                };
              }
              if (obj) {
                if (skipFields.indexOf(obj.field) === -1) {
                  fields.push(obj);
                }
              }
              obj = null;
            }
          }
        }
      }
      this.calcFields = lang.clone(fields);

      if (this.allFields) {
        layer_field_loop:
        for (var j = 0; j < layer.fields.length; j++) {
          var f = layer.fields[j];
          //need to verify that this field is not in the list
          // may be a cleaner way to do this test but this should work for POC
          var addField = true;
          add_loop:
          for (var k = 0; k < fields.length; k++) {
            if (f.name === fields[k].field) {
              addField = false;
              break add_loop;
            }
          }
          if (skipFields.indexOf(f.name) === -1 && addField) {
            fields.push({
              field: f.name,
              alias: f.alias,
              type: f.type
            });
          }
        }
      }

      var spFields = analysisUtils.getSpecialFields(layer);
      this.dateFields = spFields.dateFields;
      this.specialFields = spFields.specialFields;
      this.typeIdField = spFields.typeIdField;
      this.types = spFields.types;

      return fields;
    }
  });
  return summaryInfo;
});
