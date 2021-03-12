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
/* jshint unused:true */
define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/Color',
  'dojo/_base/lang',
  'dojo/dom',
  'dojo/DeferredList',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'dojo/Evented',
  'dojo/keys',
  'dojo/on',
  'dojo/dom-attr',
  'dojo/query',
  'dojo/string',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/ProgressBar',
  'esri/geometry/geometryEngineAsync',
  'esri/layers/GraphicsLayer',
  'esri/tasks/BufferParameters',
  'esri/tasks/GeometryService',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/tasks/RelationshipQuery',
  'jimu/dijit/DrawBox',
  'jimu/dijit/SearchDistance',
  'jimu/dijit/FeatureSetChooserForMultipleLayers',
  'jimu/BaseWidget',
  'jimu/LayerInfos/LayerInfos',
  'jimu/utils',
  './Download_Avery',
  './Download_CSV',
  './Highlighter',
  './labelFormatUtils',
  './Queryer',
  './SearchLayers',
  'jimu/FilterManager',
  'jimu/SelectionManager',
  'esri/layers/FeatureLayer',
  'jimu/utils',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/renderers/SimpleRenderer',
  "esri/graphic",
  './reviewResults',
  'dijit/form/CheckBox',
  'jimu/dijit/formSelect',
  'dojo/domReady!'
], function (
  declare,
  array,
  Color,
  lang,
  dom,
  DeferredList,
  domClass,
  domConstruct,
  domGeom,
  domStyle,
  Evented,
  keys,
  on,
  domAttr,
  query,
  string,
  _WidgetsInTemplateMixin,
  ProgressBar,
  geometryEngineAsync,
  GraphicsLayer,
  BufferParameters,
  GeometryService,
  Query,
  QueryTask,
  RelationshipQuery,
  DrawBox,
  SearchDistance,
  FeatureSetChooserForMultipleLayers,
  BaseWidget,
  LayerInfos,
  utils,
  Download_Avery,
  Download_CSV,
  Highlighter,
  labelFormatUtils,
  Queryer,
  SearchLayers,
  FilterManager,
  SelectionManager,
  FeatureLayer,
  jimuUtils,
  SimpleFillSymbol,
  SimpleLineSymbol,
  SimpleRenderer,
  Graphic,
  reviewResults
) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-public-notification',

      _origin: undefined,
      _bufferDistanceMeters: 0,
      _drawToolOption: {},
      _activeDrawToolNode: null,
      _formatCodeHandlers: {
        'AVERY': './Download_Avery',
        'CSV': './Download_CSV'
      },
      _formatCodeHandlerInstances: {
        'AVERY': null,
        'CSV': null
      },

      _bufferGeometry: null,
      _searchResultSymbology:
      {
        point: {
          lineColor: new Color('aqua'),
          lineWidth: 2,
          fillColor: new Color([0, 255, 255, 0.1])
        },
        line: {
          lineColor: new Color('aqua'),
          lineWidth: 2
        },
        polygon: {
          lineColor: new Color('aqua'),
          lineWidth: 2,
          fillColor: new Color([0, 255, 255, 0.1])
        }
      },
      _bufferSymbology:
      {
        point: {
          lineColor: new Color('green'),
          lineWidth: 3,
          fillColor: new Color([0, 255, 0, 0.1])
        },
        line: {
          lineColor: new Color('green'),
          lineWidth: 3
        },
        polygon: {
          lineColor: new Color('green'),
          lineWidth: 3,
          fillColor: new Color([0, 255, 0, 0.1])
        }
      },
      _addresseeSymbology:
      {
        point: {
          lineColor: new Color('blue'),
          lineWidth: 2,
          fillColor: new Color([0, 0, 255, 0.1])
        },
        line: {
          lineColor: new Color('blue'),
          lineWidth: 2
        },
        polygon: {
          lineColor: new Color('blue'),
          lineWidth: 2,
          fillColor: new Color([0, 0, 255, 0.1])
        }
      },

      _addresseeSources: [],
      _foundAddressees: [],
      _foundLabels: [],
      nls: null,
      config: null,
      _testConfig: null,
      _currentOpenPanel: "mainPage",
      _reviewResultsObj: null,
      _geoTypes: null,

      //========== jimu/BaseWidget overrides ==========

      constructor: function (overallConfig, testConfig) {
        this._testConfig = testConfig;
      },

      /**
       * Dijit lifecycle: "it will be invoked before rendering occurs, and before any dom nodes are created.
       * If you need to add or change the instance’s properties before the widget is rendered - this is the
       * place to do it."
       */
      postMixInProperties: function () {
        // Override the configuration
        if (this._testConfig) {
          this.nls = this._testConfig.nls;
          this.config = this._testConfig.config;
        }

        //mixin default nls with widget nls
        this.nls.common = {};
        lang.mixin(this.nls.common, window.jimuNls.common);
      },

      /**
       * Dijit lifecycle: "This is fired after all properties of a widget are defined, and the document
       * fragment representing the widget is created—but before the fragment itself is added to the main document."
       */
      postCreate: function () {
        this.inherited(arguments);
        //get filter manager instance
        this.filterManager = FilterManager.getInstance();
        //get selection manager instance
        this.selectionManager = SelectionManager.getInstance();
        this._activeDrawToolNode = null;
        this._checkDownloadBtnEnable();
      },

      /**
       * Dijit lifecycle: "This method is designed to handle processing after any DOM fragments have been
       * actually added to the document; it is not fired until after any potential child widgets have been
       * created and started as well."
       */
      startup: function () {
        this.inherited(arguments);
        this._currentOpenPanel = "mainPage";
        this._reviewResultsObj = null;
        this._geoTypes = null;
        this._init();
      },

      //========== jimu/BaseWidget implementations ==========

      /**
       * Called every time widget is opened.
       */
      onOpen: function () {
        // description from jimu/BaseWidget:
        //    state has been changed to "opened" when call this method.
        //    this function will be called in two cases:
        //      1. after widget's startup
        //      2. if widget is closed, use re-open the widget
        if (this._searchComponent) {
          this._searchComponent.setFocus();
        }
        this._dblClickZoom = this.map.isDoubleClickZoom;
      },

      /**
       * Called every time widget is closed.
       */
      onClose: function () {
        // description from jimu/BaseWidget:
        //    state has been changed to "closed" when call this method.
        this._clearAll();
      },

      /**
       * Dijit lifecycle: "Implement destroy if you have special tear-down work to do (the superclasses
       * will take care of most of it for you."
       */
      destroy: function () {
        if (this._drawTool) {
          this._drawTool.destroyRecursive();
          this._drawTool = null;
        }

        this.inherited(arguments);
      },

      //========== Custom content ==========

      _isFeatureUsedForBuffereing: function (layerID, oID) {
        var isFeatureUsedForBuffereing = false;
        if (this._prevSelectedFeatures &&
          this._prevSelectedFeatures.bufferedFeatures &&
          this._prevSelectedFeatures.bufferedFeatures.length > 0) {
          array.some(this._prevSelectedFeatures.bufferedFeatures, function (feature) {
            if (layerID === feature._layer.id &&
              feature.attributes[feature._layer.objectIdField] === oID) {
              isFeatureUsedForBuffereing = true;
              return true;
            }
          });
        }
        return isFeatureUsedForBuffereing;
      },

      _filterBufferedFeatures: function (newSelection) {
        var bufferedFeatures = [], nonBufferedFeatures = [];
        array.forEach(newSelection, function (selectedFeature) {
          var oID = selectedFeature.attributes[selectedFeature._layer.objectIdField];
          var layerID = selectedFeature._layer.id;
          if (this._isFeatureUsedForBuffereing(layerID, oID)) {
            bufferedFeatures.push(selectedFeature);
          } else {
            nonBufferedFeatures.push(selectedFeature);
          }
        }, this);

        return {
          bufferedFeatures: bufferedFeatures,
          nonBufferedFeatures: nonBufferedFeatures
        };
      },

      /**
       * Initializes the widget during startup.
       */
      _init: function () {
        var flags, drawTools, labelFormats, drawToolsChildren, updatedDrawToolsChildren = [], iLine;
        // Handle keydown event for download button
        this.own(on(this.downloadBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._onDownloadBtnClicked();
          }
        })));
        this.own(on(this.reviewBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._onReviewBtnClicked();
          }
        })));
        // Search and addressee layers
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (layerInfosObj) {
            var selectToolParentDiv, selectToolDiv, selectLayerIds,
              selectButton, selectArrowButton, selectClearButton,
              searchOptions = lang.clone(this.config.searchSourceSettings.search);

            // Select by drawing tools
            flags = this.config.searchSourceSettings.drawing.tools[0];
            drawTools = array.filter(this.config.searchSourceSettings.drawing.tools.slice(1), function (tool, i) {
              return flags[i] === '1';
            });

            // Search for features by map drawing
            if (drawTools.length > 0) {
              this._drawToolOption.map = this.map;
              this._drawToolOption.geoTypes = drawTools;
              this._drawToolOption.showClear = true;
              this._drawToolOption.keepOneGraphic = true;
              this._drawTool = new DrawBox(this._drawToolOption);

              // Reorder options to match configuration
              drawToolsChildren = this._drawTool.domNode.childNodes[1].children;
              array.forEach(drawTools, function (toolName) {
                array.some(drawToolsChildren, function (toolDom) {
                  // We have a match if the DOM item has a matching geotype
                  if (toolDom.attributes["data-geotype"].nodeValue === toolName) {
                    updatedDrawToolsChildren.push(toolDom);
                    return true;
                  }
                  return false;
                });
              });
              updatedDrawToolsChildren.push(drawToolsChildren[drawToolsChildren.length - 1]);  // add the clear button
              this._replaceChildren(this._drawTool.domNode.childNodes[1], updatedDrawToolsChildren);
              this._drawTool.placeAt(this.drawBoxDiv);

              this.own(this._drawTool.on('icon-selected', lang.hitch(this, this._onDrawIconSelected)));
              this.own(this._drawTool.on('draw-end', lang.hitch(this, this._onDrawEnd)));
              this.own(this._drawTool.on('clear', lang.hitch(this, this._onDrawClear)));
              this.own(this._drawTool.on('user-clear', lang.hitch(this, this._onDrawClear)));
            }

            // Search for features by map selection
            if (this.config.searchSourceSettings.drawing.select) {
              selectToolParentDiv = domConstruct.create('div', {
                width: '100%'
              });
              selectToolDiv = domConstruct.create('div', null, selectToolParentDiv);

              // Replace the LINE tool type with POLYLINE (but only if POLYLINE is not already in list)
              // because FeatureSetChooserForMultipleLayers does not support it
              iLine = drawTools.indexOf('LINE');
              if (iLine >= 0) {
                drawTools.splice(iLine, 1);
                if (drawTools.indexOf('POLYLINE') < 0) {
                  drawTools.splice(iLine, 0, 'POLYLINE');
                }
              }
              this._geoTypes = drawTools.length > 0 ? drawTools : ['EXTENT'];
              this._selectTool = new FeatureSetChooserForMultipleLayers({
                geoTypes: this._geoTypes,
                map: this.map,
                updateSelection: true,
                fullyWithin: false
              }, selectToolDiv);
              this._selectTool.startup();


              this.mapSelectionLayers = array.filter(
                array.map(layerInfosObj.getLayerInfoArray(), function (layerInfo) {
                  return layerInfo.layerObject;
                }), function (layer) {
                  return layer;
                }
              );
              selectLayerIds = array.filter(
                array.map(searchOptions.sources, function (source) {
                  return source.layerId;
                }), function (layerId) {
                  return layerId;
                }
              );
              this.mapSelectionLayers = array.filter(this.mapSelectionLayers, function (layer) {
                return selectLayerIds.indexOf(layer.id) >= 0;
              });
              if (this.mapSelectionLayers.length > 0) {
                this._selectTool.setFeatureLayers(this.mapSelectionLayers);
              }

              // On select is activated, deactivate any draw tool if selected
              selectButton = query('.draw-item-btn', this._selectTool.domNode)[0];
              this.own(on(selectButton, 'click', lang.hitch(this, this._onSelectSelected)));
              selectArrowButton = query('.arrow', this._selectTool.domNode)[0];
              this.own(on(selectArrowButton, 'click', lang.hitch(this, this._onSelectSelected)));
              selectClearButton = query('.btn-clear', this._selectTool.domNode)[0];
              this.own(on(selectClearButton, 'click', lang.hitch(this, this._onSelectClear)));

              // On selection complete
              this.own(on(this._selectTool, 'unloading', lang.hitch(this,
                function (graphic, geotype, commontype, shiftKey, ctrlKey) {
                  var selectedFeatures = [];
                  //clear prevSelected Features if adding or subtracting selection
                  if (this._prevSelectedFeatures && !shiftKey && !ctrlKey) {
                    this._prevSelectedFeatures = null;
                  }
                  var selectionFeature = {};
                  //get selected features form all map selection layers
                  array.forEach(this.mapSelectionLayers, lang.hitch(this, function (layer) {
                    var currentFeatures = layer.getSelectedFeatures();
                    var selectedIds = [];
                    //if selected features for this layer is greater than 0
                    if (currentFeatures.length > 0) {
                      //create list of object ids of the selected features
                      for (var i = 0; i < currentFeatures.length; i++) {
                        selectedIds.push(currentFeatures[i].attributes[layer.objectIdField]);
                      }
                      //create object which holds selected layer and OID's of selected features
                      selectionFeature[layer.id] = {
                        layer: layer,
                        where: layer.objectIdField + " in ( " + selectedIds.join() + " )"
                      };
                    }
                  }));
                  var defArray = [], layerList = [];
                  if (Object.keys(selectionFeature).length > 0) {
                    for (var layerId in selectionFeature) {
                      //store the layer instance in array
                      //as the layer object needs to be added to queried feature
                      layerList.push(selectionFeature[layerId].layer);
                      //Get geometries of features which are selected
                      defArray.push(
                        this._queryer.findIntersectingFeatures(null,
                          selectionFeature[layerId].layer.url,
                          [selectionFeature[layerId].layer.objectIdField],
                          selectionFeature[layerId].where,
                          this.map.spatialReference));
                    }
                  }

                  var defList = new DeferredList(defArray);
                  defList.then(lang.hitch(this, function (data) {
                    for (var i = 0; i < data.length; i++) {
                      if (data[i] && data[i].length > 1 && data[i][1].features) {
                        /*jshint loopfunc:true */
                        data[i][1].features = array.map(data[i][1].features, function (item) {
                          item._layer = layerList[i];
                          return item;
                        });
                        selectedFeatures = selectedFeatures.concat(data[i][1].features);
                        //As we are now dealing with complete geometry
                        //we need to update the highlight for the selected features also,
                        //as it would be using generalized features
                        if (this.selectionManager &&
                          this.selectionManager.getDisplayLayer(data[i][1].features[0]._layer.id)) {
                          this.selectionManager._updateDisplayLayer(
                            data[i][1].features[0]._layer, data[i][1].features);
                        }
                      }
                    }

                    //If it is first selction and buffer is enabled
                    //consider all selected features for bufferring.
                    //else based on last used features in bufferring
                    //seperate buffered and nonBuffered features
                    if (!this._bufferDistanceMeters ||
                      (this._bufferDistanceMeters && !this._prevSelectedFeatures)) {
                      this._prevSelectedFeatures = {
                        bufferedFeatures: selectedFeatures,
                        nonBufferedFeatures: []
                      };
                    } else {
                      this._prevSelectedFeatures = this._filterBufferedFeatures(selectedFeatures);
                    }

                    this._origin = array.map(this._prevSelectedFeatures.bufferedFeatures,
                      function (feature) {
                        return feature.geometry;
                      });
                    //pass non buffered features,
                    //so that after buffering those can be union with buffer geometry
                    if (this._prevSelectedFeatures &&
                      (this._prevSelectedFeatures.nonBufferedFeatures.length > 0 ||
                        this._prevSelectedFeatures.bufferedFeatures.length > 0)) {
                      this._doBufferSearch(this._prevSelectedFeatures.nonBufferedFeatures);
                    } else {
                      this._clearAll();
                    }

                    if (selectedFeatures.length === 0) {
                      this._prevSelectedFeatures = null;
                    }
                  }));

                })));

              // Place select tool inline with draw tools
              domConstruct.place(selectToolParentDiv, this.drawBoxDiv, 'last');
            }

            // Search for features by name
            searchOptions.map = this.map;
            this._searchComponent = new SearchLayers(searchOptions,
              this.appConfig.portalUrl, layerInfosObj, domConstruct.create('div', null, this.searchNode), this);

            this._searchComponent.searchDijit().then(lang.hitch(this, function (searchDijit) {
              this._searchDijit = searchDijit;
              this.own(on(searchDijit, 'search-results', lang.hitch(this, this._onSearchResults)));
              this.own(on(searchDijit, 'clear-search', lang.hitch(this, this._onClearSearch)));
              //Set the first focus node based on search sources
              if (this._searchComponent.sources.length === 1) {
                utils.initFirstFocusNode(this.domNode,
                  this._searchComponent._searchDijit.inputNode);
              } else {
                utils.initFirstFocusNode(this.domNode,
                  this._searchComponent._searchDijit.sourcesBtnNode);
              }
              // For solving issue - The page auto scrolls to the embedded app
              this.openAtStartAysn = true;
              if (jimuUtils.isAutoFocusFirstNodeWidget(this)) {
                utils.focusFirstFocusNode(this.domNode);
              }
            }));

            // Filter out any addressee layers not selected to be visible
            flags = this.config.addresseeSourceSettings.sources[0];
            this._addresseeSources =
              array.filter(this.config.addresseeSourceSettings.sources.slice(1), function (source, i) {
                return flags[i] === '1';
              });

            // Amend the addressee source descriptions by using the layer popups as the label definitions
            array.forEach(this._addresseeSources, function (addresseeSource, i) {
              array.some(layerInfosObj._operLayers, function (operLayer) {
                if (addresseeSource.name === operLayer.title &&
                  operLayer.popupInfo && operLayer.popupInfo.description) {
                  addresseeSource.labelLineTemplates =
                    labelFormatUtils.convertPopupToLabelSpec(operLayer.popupInfo);
                    addresseeSource.labelLineTemplates.expressionInfos = operLayer.popupInfo.expressionInfos;
                  addresseeSource.labelLineTemplates.parsedExpressions =
                    labelFormatUtils.parseArcadeExpressions(operLayer.popupInfo.expressionInfos);
                  addresseeSource.url = operLayer.url;
                  if (addresseeSource.useRelatedRecords) {
                    addresseeSource.labelLineTemplates.relationships = this._createRelationshipQueries(operLayer);
                  }

                  this.addresseeSelect.addOption({
                    value: i,
                    label: addresseeSource.name,
                    id: operLayer.id
                  });
                  return true;
                }
                return false;
              }, this);
            }, this);
          })
          );

        if (this.addresseeSelect.options.length > 0) {
          domStyle.set('activeWidgetSection', 'display', '');
          this.own(this.addresseeSelect.on('change', lang.hitch(this, this._updateAddresseesFromBufferGeometry)));
        } else {
          domStyle.set('nothingConfiguredSection', 'display', 'block');
          return;
        }

        // Buffered query tool
        this._queryer = new Queryer(this.map, this.config.searchSourceSettings.geometryServiceURL);

        // Layer to draw buffer
        this._bufferLayer = new GraphicsLayer();
        this.map.addLayer(this._bufferLayer);

        // Highlighter
        this._highlighter = new Highlighter(100);

        // Size of buffer around searched or drawn features
        this._createSearchDistanceDisplay();

        // "Format" option
        flags = this.config.notificationSettings.labelFormats[0];
        labelFormats = array.filter(this.config.notificationSettings.labelFormats.slice(1),
          lang.hitch(this, function (format, i) {
            var keep = flags[i] === '1';
            if (keep) {
              this.formatSelect.addOption({
                value: i,
                label: '<span' + (format.hint ? ' title="' + format.hint + '"' : '') + '>' + format.name + '</span>'
              });
            }
            return keep;
          }));
        this.reviewBtn.innerHTML = this.nls.reviewButtonLabel;
        // Text for download button
        this.downloadBtn.innerHTML = window.jimuNls.layerInfosMenu.itemDownload;
        domAttr.set(this.downloadBtn, "aria-label", window.jimuNls.layerInfosMenu.itemDownload);
        this.resize();
      },

      /**
       * Customizes the buffer distance UI element.
       * @param {string|number} searchDistanceSource Either 'all' for all sources or the 0-based index into the
       *        list of search sources
       */
      _createSearchDistanceDisplay: function (searchDistanceSource) {
        var isEnabled = false, bufferInfo, flags, bufferUnits, currentOptions, filteredUnitsOptions = [],
          createdNewInstance = false;

        // If search distance is created get its state
        if (this._searchDistance) {
          isEnabled = this._searchDistance.isEnabled();
        } else {
          domConstruct.empty(this.searchDistanceDiv);
        }

        // Use the config to filter and order the units list
        this._searchDistanceSource = searchDistanceSource;
        if (typeof this._searchDistanceSource === 'undefined') {
          bufferInfo = this.config.searchSourceSettings.drawing.buffer;
        } else {
          bufferInfo = this.config.searchSourceSettings.search.sources[this._searchDistanceSource].buffer;
        }

        flags = bufferInfo.bufferUnitsMenu[0];
        bufferUnits =
          array.filter(bufferInfo.bufferUnitsMenu.slice(1), function (units, i) {
            return flags[i] === '1';
          });

        // Create the distance display only when it is not already created
        if (!this._searchDistance) {
          this._searchDistance = new SearchDistance({
            distance: bufferInfo.bufferDistance,
            unit: bufferInfo.bufferUnits
          });
          //store all options which will be used always to filter for current source
          this._allUnitOptions = lang.clone(this._searchDistance.unitSelect.options);
          //set the flag to indicate the searchDistance instance is created for firstTime
          createdNewInstance = true;
        }
        //Update menu options to match the menu configured for the current layer / geocoder
        //As new instace is not created all time we need to consider all unit options as current options
        //and then filter them based on current selected layer / geocoder
        currentOptions = this._allUnitOptions;
        array.forEach(bufferUnits, function (units) {
          array.some(currentOptions, function (option) {
            if (option.value === units) {
              filteredUnitsOptions.push(option);
              return true;
            }
            return false;
          }, this);
        }, this);
        //set the filtered units options in searchDistance menu
        if (filteredUnitsOptions.length > 0) {
          this._searchDistance.unitSelect.set("options", filteredUnitsOptions);
        }
        //if creating new instance then only place it in div
        //else only update the distance and defeult unit according to current layer/geocoder
        if (createdNewInstance) {
          this._searchDistance.placeAt(this.searchDistanceDiv);
        } else {
          this._searchDistance.setDistance(bufferInfo.bufferDistance);
          this._searchDistance.setUnit(bufferInfo.bufferUnits);
        }

        if (isEnabled) {
          this._searchDistance.enable();  // default is disabled but editable; this makes it enabled
        } else {
          this._searchDistance.disable();  // default is disabled but editable; this makes it disabled and uneditable
        }

        // Update the displayed buffer
        this._updateDisplayedBuffer(this._searchDistance.getData());

        // Handle events only when new instance is created
        if (createdNewInstance) {
          this.own(this._searchDistance.numberTextBox.on('keyup', lang.hitch(this, this._onBufferDistanceKeyup)));
          this.own(on(this._searchDistance, 'change', lang.hitch(this, this._onSearchDistanceChanged)));
        }
      },

      /**
       * Updates the currently-displayed buffer.
       * @param {object} data Distance information from the search distance dijit; contains properties isEnabled
       *        and meters indicating that the buffer is enabled and its distance
       */
      _updateDisplayedBuffer: function (data) {
        this._bufferDistanceMeters = 0;
        if (data && data.isEnabled && data.meters >= 0) {
          this._bufferDistanceMeters = data.meters;
        }

        if (Array.isArray(this._origin) && this._origin.length > 0) {
          if (this._prevSelectedFeatures &&
            this._prevSelectedFeatures.bufferedFeatures.length > 0 &&
            this._prevSelectedFeatures.nonBufferedFeatures) {
            //pass non buffered features, so that after buffering those can be union with buffer geometry
            this._doBufferSearch(this._prevSelectedFeatures.nonBufferedFeatures);
          }
          else {
            this._doBufferSearch();
          }
        }
      },

      /**
       * Replaces the children in the specified node with a new set of children.
       * @param {DOM element} node Parent node to have its children replaced
       * @param {array} newChildren List of children to append to node
       */
      _replaceChildren: function (node, newChildren) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        array.forEach(newChildren, function (newChild) {
          node.appendChild(newChild);
        });
      },

      /**
       * Creates relationship queries for each relationship flag in a popup.
       * @param {feature layer} operLayer Layer whose popup is to be examined
       * @return {object} Hash of relationships by their id, or null if there are no relationship flags in the
       *        popup; each relationship has the properties operLayer and relatedQuery for the related layer
       *        and the query for that layer
       */
      _createRelationshipQueries: function (operLayer) {
        var hasRelationships = false, relationships = {}, relationshipFieldPattern = /\{relationships\/\d+\//gm,
          relationshipIdPattern = /\d+/, matches;

        matches = operLayer.popupInfo.description.match(relationshipFieldPattern);
        if (matches) {
          hasRelationships = true;
          array.forEach(matches, function (match) {
            var relatedQuery, id = match.match(relationshipIdPattern)[0];
            if (!relationships.hasOwnProperty(id)) {
              relatedQuery = new RelationshipQuery();
              relatedQuery.outFields = ['*'];
              relatedQuery.relationshipId = id;
              relatedQuery.returnGeometry = false;
              relationships[id] = {
                operLayer: operLayer,
                relatedQuery: relatedQuery
              };
            }
          });
        }

        return hasRelationships ? relationships : null;
      },

      /**
       * Enables and disables the UI for searching for or drawing the features to be used as well as for
       * specifying the buffer enablement and distance; disable is done by displaying a scrim over the UI.
       * @param {boolean} enable Whether the UI should be available (scrim is hidden) or not (scrim is visible)
       */
      _enableSourceInputs: function (enable) {
        var scrim = dom.byId('sourceInputsSectionScrim');
        if (enable) {
          domClass.add(scrim, 'hidden');
        } else {
          var sourceInputsSectionBox = domGeom.getMarginBox(dom.byId('sourceInputsSection'));
          domGeom.setMarginBox(scrim, sourceInputsSectionBox);
          domClass.remove(scrim, 'hidden');
        }
      },

      /**
       * Updates the list of found addressees after re-performing buffering using the source item(s).
       */
      _doBufferSearch: function (nonBufferedFeatures) {
        this._onStartBuffer();
        if ((!this._origin || (this._origin && this._origin.length <= 0)) &&
          nonBufferedFeatures && nonBufferedFeatures.length > 0) {
          this._unionNonBufferdFeatures(null, nonBufferedFeatures);
        }
        this._queryer.createBufferFromGeometries(this._origin, this._bufferDistanceMeters)
          .then(lang.hitch(this, function (bufferedGeomUnion) {
            if (nonBufferedFeatures && nonBufferedFeatures.length > 0) {
              this._unionNonBufferdFeatures(bufferedGeomUnion, nonBufferedFeatures);
            } else {
              // We have a single polygon representing the buffer of the union of the input geometries
              this._bufferGeometry = bufferedGeomUnion;
              // Zoom the map to the buffer extents
              utils.featureAction.zoomTo(this.map, [this._bufferGeometry]);
              // Update the set of addressees based on the new buffer
              this._updateAddresseesFromBufferGeometry();
            }

          }), lang.hitch(this, function (error) {
            this._onEndBuffer();
            console.log(error);
          }));
      },

      _unionNonBufferdFeatures: function (bufferGeometry, nonBufferedFeatures) {
        var arrayOfGeometiesForUnion, nonBufferedGeometries;
        nonBufferedGeometries = array.map(nonBufferedFeatures, function (feature) {
          return feature.geometry;
        });

        //do inset buffer to nonbufferd geometries to allow for boundary mismatch
        this._queryer.createBufferFromGeometries(nonBufferedGeometries, 0)
          .then(lang.hitch(this, function (nonBufferedGeomInset) {
            //if have buffer geometry then union it with nonbuffergeometries inset polygon
            //else nonBufferedGeomInset polygon will be final single polygon for queriyng
            if (bufferGeometry) {
              arrayOfGeometiesForUnion = [bufferGeometry].concat(nonBufferedGeomInset);
              this._queryer.createUnionOfGeometries(arrayOfGeometiesForUnion).
                then(lang.hitch(this, function (nonBufferedGeomUnion) {
                  // We have a single polygon representing the buffer of
                  //the union of the bufferedGeometry and non buffered selected geometries
                  this._onBufferAndUnionComplete(nonBufferedGeomUnion);
                }), lang.hitch(this, function (error) {
                  this._onEndBuffer();
                  console.log(error);
                }));
            } else {
              this._onBufferAndUnionComplete(nonBufferedGeomInset);
            }
          }), lang.hitch(this, function (error) {
            this._onEndBuffer();
            console.log(error);
          }));
      },

      _onBufferAndUnionComplete: function (completeSingleGeometry) {
        this._bufferGeometry = completeSingleGeometry;

        // Zoom the map to the buffer extents
        utils.featureAction.zoomTo(this.map, [this._bufferGeometry]);

        // Update the set of addressees based on the new buffer
        this._updateAddresseesFromBufferGeometry();
      },

      /**
       * This functions matches layer url with all the layers in map and
       * returns the filter expression applied on that layer
       */
      _getExpressionByLayerURL: function (layerURL) {
        var expr = "";
        for (var layerId in this.map._layers) {
          if (this.map._layers[layerId].url === layerURL) {
            expr = this.filterManager.getFilterExp(layerId);
            break;
          }
        }
        return expr;
      },

      /**
       * Updates the list of found addressees after re-performing buffering using the current buffer.
       */
      _updateAddresseesFromBufferGeometry: function () {
        this._onStartBuffer();

        if (this._bufferGeometry) {
          // Start an indeterminate progress bar
          this.indeterminateProgress.set({ value: Number.POSITIVE_INFINITY });
          domStyle.set(this.indeterminateProgress.domNode, 'display', 'block');

          // Highlight the buffered source
          this._createAndAddGraphic(this._bufferGeometry, this._bufferSymbology, this._bufferLayer);
          //get layer expression from layer
          var layerExp =
            this._getExpressionByLayerURL(this._addresseeSources[this.addresseeSelect.value].url);
          // Use the selectors to find the addressees
          this._queryer.find(this._bufferGeometry,
            this._addresseeSources[this.addresseeSelect.value].url, ['*'], 'addressee', layerExp)
            .then(lang.hitch(this, function (findResults) {
              if (findResults.features && Array.isArray(findResults.features) && findResults.features.length > 0) {
                this._foundAddressees = findResults.features;

                // Done with indeterminate progress bar
                domStyle.set(this.indeterminateProgress.domNode, 'display', 'none');

                // Highlight the addressees
                this._highlighter.highlightFeatures(this._foundAddressees,
                  lang.hitch(this, this._createAndAddGraphic), this._addresseeSymbology,
                  this._bufferLayer, lang.hitch(this, this._setProgressPercentage));
              } else {
                if (this._activeDrawToolNode) {
                  this._activeDrawToolNode.focus();
                  this._activeDrawToolNode = null;
                }
              }
              this._onEndBuffer();
            }), lang.hitch(this, function (error) {
              this._onEndBuffer();
              console.log(error);
            }));
        } else {
          this._onEndBuffer();
        }
      },

      /**
       * Shows the current progress on a scale of 0 to 100, making the `determinateProgress` progress bar
       * visible when its value is between 0 and 100, exclusively.
       * @param {number} value Progress percent, 0..100
       */
      _setProgressPercentage: function (value) {
        if (value <= 0) {
          this.determinateProgress.set({ value: 0 });
          domStyle.set(this.determinateProgress.domNode, 'display', 'block');
        } else if (value >= 100) {
          this.determinateProgress.set({ value: 100 });
          domStyle.set(this.determinateProgress.domNode, 'display', 'none');
        } else {
          this.determinateProgress.set({ value: value });
        }
      },

      /**
       * Creates a graphic and adds it to the specified layer.
       * @param {object} symbol Symbol to use for geometry
       * @param {object} geometry Geometry for the symbol
       * @memberOf Queryer#
       */
      _createAndAddGraphic: function (item, symbology, layer) {
        var graphic = this._highlighter.createGraphic(item, symbology);
        if (graphic) {
          layer.add(graphic);
        }
      },

      /**
       * Updates the currently-displayed buffer upon the ENTER key event.
       * @param {object} event Key event
       */
      _onBufferDistanceKeyup: function (event) {
        // If the enter key was used, accept it as the conclusion of the distance
        // update rather than waiting for the loss of focus
        if (event.keyCode === keys.ENTER) {
          this._updateDisplayedBuffer(this._searchDistance.getData());
        }
      },

      /**
       * Updates the currently-displayed buffer upon the change event from the search distance dijit.
       * @param {object} data Event data, which includes properties distance and unit
       */
      _onSearchDistanceChanged: function (data) {
        // Update the current config for this source
        var bufferInfo;

        if (typeof this._searchDistanceSource === 'undefined') {
          bufferInfo = this.config.searchSourceSettings.drawing.buffer;
        } else {
          bufferInfo = this.config.searchSourceSettings.search.sources[this._searchDistanceSource].buffer;
        }
        bufferInfo.bufferDistance = data.distance;
        bufferInfo.bufferUnits = data.unit;

        // Update the displayed buffer
        this._updateDisplayedBuffer(data);
      },

      /**
       * Updates the currently-displayed buffer upon the search-results event from the search dijit.
       * @param {object} event Event data, which includes properties numResults, results, and activeSourceIndex
       */
      _onSearchResults: function (event) {
        var results = event.results, searchSourceIndex = event.activeSourceIndex;

        this._clearAll();
        if (event.numResults > 0 && results) {
          // Use the first result from any source
          labelFormatUtils.objEach(results, function (result, iResult) {
            if (result && result.length > 0) {
              // Use the first result in this source
              this._origin = [result[0].feature.geometry];

              this._createAndAddGraphic(result[0].feature, this._searchResultSymbology, this.map.graphics);

              // Match the buffer display to the feature layer
              this._createSearchDistanceDisplay(searchSourceIndex === 'all' ? iResult : searchSourceIndex);

              // Buffer the item
              this._doBufferSearch();
            }
          }, this);
        }
      },

      /**
       * Clears the search UI upon the clear-search event from the search dijit.
       */
      _onClearSearch: function () {
        this._clearAll();
      },

      /**
       * Clears the search UI and rebuilds the search distance UI upon the icon-selected event from the draw box dijit.
       */
      _onDrawIconSelected: function (activeDOM) {
        if (this._selectTool && this._selectTool.isActive()) {
          this._selectTool.deactivate();
        }
        this._activeDrawToolNode = activeDOM;
        this.map.disableDoubleClickZoom();
        this.map.navigationManager.setImmediateClick(true);
        this.map.setInfoWindowOnClick(false);
        this._clearAll();
        this._createSearchDistanceDisplay();
      },

      /**
       * Updates the currently-displayed buffer upon the draw-end event from the draw box dijit.
       */
      _onDrawEnd: function (graphic) {
        if (this._dblClickZoom) {
          this.map.enableDoubleClickZoom();
        }
        this.map.navigationManager.setImmediateClick(false);
        this._origin = [graphic.geometry];
        this._doBufferSearch();
      },

      /**
       * Clears the search UI upon the clear or user-clear events from the draw box dijit.
       */
      _onDrawClear: function () {
        this.map.setInfoWindowOnClick(true);
        this._clearAll();
      },

      /**
       * Clears the search UI and rebuilds the search distance UI upon the icon-selected event from the draw box dijit.
       */
      _onSelectSelected: function () {
        this._onSelectClear();
      },

      /**
       * Clears the search UI upon the clear or user-clear events from the draw box dijit.
       */
      _onSelectClear: function () {
        this._clearAll();
        this._createSearchDistanceDisplay();
      },

      /**
       * Disables the source UI, removes buffer graphics, and shows an indeterminate progress bar for the
       * start of the buffering process.
       */
      _onStartBuffer: function () {
        this._enableSourceInputs(false);
        this._clearBufferGraphics();

        // Start an indeterminate progress bar
        this.indeterminateProgress.set({ value: Number.POSITIVE_INFINITY });
        domStyle.set(this.indeterminateProgress.domNode, 'display', 'block');
      },

      /**
       * Enables the source UI and hides an indeterminate progress bar for the conclusion of the buffering process.
       */
      _onEndBuffer: function () {
        this._enableSourceInputs(true);

        // Done with indeterminate progress bar
        domStyle.set(this.indeterminateProgress.domNode, 'display', 'none');

        this._checkDownloadBtnEnable();
      },

      /**
       * Clears the search UI and buffer graphics.
       */
      _clearAll: function () {
        this._origin = undefined;
        this._prevSelectedFeatures = null;
        this._foundAddressees = [];
        this._foundLabels = [];
        this._bufferGeometry = null;

        // Clear selection graphics
        this._clearSelections();

        // Search result graphics
        this.map.graphics.clear();

        // Draw box graphics
        if (this._drawTool && this._drawTool.drawLayer) {
          this._drawTool.drawLayer.clear();
        }

        // Buffer graphics and found addressees
        this._clearBufferGraphics();

        this._checkDownloadBtnEnable();
      },

      /**
       * Clears the selections from all layers used for selecting from the map.
       */
      _clearSelections: function () {
        array.forEach(this.mapSelectionLayers, function (layer) {
          layer.clearSelection();
        });
      },

      /**
       * Clears the buffer graphics.
       */
      _clearBufferGraphics: function () {
        this._foundAddressees = [];
        this._foundLabels = [];

        if (this._bufferLayer) {
          this._bufferLayer.clear();
        }

        this._checkDownloadBtnEnable();
      },

      /**
       * Updates the download button's visibility based on the presence of (make visible) or absence of
       * (make invisible) addressees.
       */
      _checkDownloadBtnEnable: function () {
        if (this._addresseeSources.length > 0) {
          // Get the address labels using the found addresses directly or their related addresses. Slows down the
          // reporting of addresses found, but we need to know the related addresses count if applicable--the
          // found addresses are misleading in that case.
          // Start a determinate progress bar
          this.indeterminateProgress.set({ value: Number.POSITIVE_INFINITY });
          domStyle.set(this.indeterminateProgress.domNode, 'display', 'block');
          labelFormatUtils.createLabelsFromFeatures(this._foundAddressees,
            this._addresseeSources[this.addresseeSelect.value].labelLineTemplates, this._getSelectedAddresseeLayer(), this.map)
            .then(lang.hitch(this, function (content) {
              var countEcho = dom.byId('numAddresseesFound'), message = '';
              var rrCountEcho = dom.byId('rrNumAddresseesFound');
              this._foundLabels = content;
              if (this._foundLabels.length > 0) {
                message = string.substitute(this.nls.numAddresseesFound, { count: this._foundLabels.length });
                domClass.remove(this.downloadBtn, 'hidden');
                if (this.config.addresseeSourceSettings.hasOwnProperty("showReviewButton") &&
                  this.config.addresseeSourceSettings.showReviewButton) {
                  domClass.remove(this.reviewBtn, 'hidden');
                }
                domAttr.set(this.downloadBtn, "aria-label", message + " " + this.downloadBtn.innerHTML);
                utils.initLastFocusNode(this.domNode, this.downloadBtn);
                this.downloadBtn.focus();
              } else {
                domClass.add(this.downloadBtn, 'hidden');
                domClass.add(this.reviewBtn, 'hidden');
                utils.initLastFocusNode(this.domNode, this.formatSelect.domNode);
              }
              countEcho.innerHTML = message;
              if (rrCountEcho !== '' && rrCountEcho !== null && rrCountEcho !== undefined) {
                if (message !== '' && message !== null && message !== undefined) {
                  rrCountEcho.innerHTML = message;
                  domAttr.set(rrCountEcho, 'aria-label', message);
                  domClass.remove(rrCountEcho, 'hidden');
                  this._reviewResultsObj.updateDownloadBtnAriaLabel(message);
                } else {
                  domClass.add(rrCountEcho, 'hidden');
                  this._reviewResultsObj.updateDownloadBtnAriaLabel();
                }
              }
              // Done with indeterminate progress bar
              domStyle.set(this.indeterminateProgress.domNode, 'display', 'none');
            }));
        }
      },

      /**
       * Creates and saves addressee labels upon the click event from the download button.
       */
      _onDownloadBtnClicked: function () {
        var labelFormat, labelPageOptions;
        labelPageOptions = lang.clone(this.config.notificationSettings.labelPageOptions);

        // Label configuration
        if (this._currentOpenPanel === "reviewResultsPage") {
          labelFormat = this.config.notificationSettings.labelFormats[this._reviewResultsObj.formatSelect.value + 1];
        } else {
          labelFormat = this.config.notificationSettings.labelFormats[this.formatSelect.value + 1];
        }
        switch (labelFormat.labelSpec.type) {
          case 'AVERY':
            this._formatCodeHandlerInstances[labelFormat.labelSpec.type] = new Download_Avery();
            labelPageOptions.guidance.printSuggestion = this.nls.tooltips.printSuggestion;
            break;
          case 'CSV':
            this._formatCodeHandlerInstances[labelFormat.labelSpec.type] = new Download_CSV();
            break;
        }

        this._doSave(this._formatCodeHandlerInstances[labelFormat.labelSpec.type],
          labelFormat.labelSpec, labelPageOptions);
      },

      /**
       * Creates and saves addressee labels.
       * @param {function} downloadHandler Function to perform label creation and saving
       * @param {object} labelSpec Collection of label and page configurations; see example below
       * @param {object} labelPageOptions Collection of display options; see example below
       * @example
       *   labelSpec = {
       *     fontSizePx: 11,
       *     horizGapIn: 0.125,
       *     insetIn: 0.1,
       *     labelHeightIn: 1,
       *     labelWidthIn: 2.625,
       *     maxNumLabelLines: 4,
       *     numLabelsAcross: 3,
       *     numLabelsDown: 10,
       *     pageBottomIn: 0.5,
       *     pageHeightIn: 11,
       *     pageLeftIn: 0.1875,
       *     pageRightIn: 0.1875,
       *     pageTopIn: 0.5,
       *     pageWidthIn: 8.5,
       *     type: 'AVERY',
       *     vertGapIn: 0
       *   };
       *   labelPageOptions = {
       *     guidance: {
       *       gridBlackPercent: 25,
       *       labelBorderBlackPercent: 100,
       *       leftIn: 0.167,
       *       majorTickIn: 1,
       *       minorTickIn: 0.1,
       *       noteFontSizePx: 7,
       *       printSuggestion: 'Print using Adobe® Reader®\'s "Actual size" setting',
       *       rightIn: 0.167,
       *       showGrid: false,
       *       showLabelOutlines: false
       *     },
       *     rasterResolutionPxPerIn: 150,
       *     showGuidance: false,
       *     useVectorFonts: true
       *   };
       */
      _doSave: function (downloadHandler, labelSpec, labelPageOptions) {
        var filename, foundLabels;

        if (!downloadHandler || this._foundLabels.length === 0) {
          return;
        }
        foundLabels = this._foundLabels;
        filename = this._addresseeSources[this.addresseeSelect.value].name;
        //if add csv header option is configured and type is csv
        //add csv header row to csv data
        if (labelPageOptions.hasOwnProperty("addCSVHeader") &&
          labelPageOptions.addCSVHeader && labelSpec.type === "CSV") {
          var contentArray = [];
          contentArray.push(this._addresseeSources[this.addresseeSelect.value].labelLineTemplates.csvHeaderRow);
          foundLabels = contentArray.concat(foundLabels);
        }
        // Start a determinate progress bar
        this.determinateProgress.set({ value: 0 });
        domStyle.set(this.determinateProgress.domNode, 'display', 'block');

        // Use a timeout so that the UI gets time to paint the progress bar
        console.log('Downloading ', foundLabels.length, ' labels');
        setTimeout(lang.hitch(this, function () {
          downloadHandler.save(foundLabels, filename,
            labelSpec, labelPageOptions, this.domNode, this.determinateProgress).then(
              lang.hitch(this, function (ok) {
                console.log('PDF document(s) ' + (ok ? '' : 'not ') + 'created');

                // Done with determinate progress bar
                this.determinateProgress.set({ value: 100 });
                domStyle.set(this.determinateProgress.domNode, 'display', 'none');

              })
            );
        }), 10);
      },

      /**
       * This function is used to get the result graphics layer
       */
      _getResultGraphicsLayer: function () {
        return this._bufferLayer;
      },

      /**
       * This function is used to get the result graphics layer
       */
      _getDisplayTaxParcelGraphicsLayer: function () {
        var displayTaxParcelGraphicsLayer, mainParcelFeatureLayerId;
        mainParcelFeatureLayerId = 
          this._getMainParcelFeatureLayerId();
        var displayLayerId = "displayLayer_of_" + mainParcelFeatureLayerId;
        displayTaxParcelGraphicsLayer = this.map.getLayer(displayLayerId);
        return displayTaxParcelGraphicsLayer;
      },

      /**
       *
       * This function is used to get the main parcel feature layer
       */
      _getMainParcelFeatureLayer: function () {
        var mainParcelFeatureLayer, mainParcelFeatureLayerId;
        mainParcelFeatureLayerId =
          this._getMainParcelFeatureLayerId();
        mainParcelFeatureLayer = this.map.getLayer(mainParcelFeatureLayerId);
        return mainParcelFeatureLayer;
      },

      /**
       * This function is used to get the id of main parcel feature layer id
       */
      _getMainParcelFeatureLayerId: function () {
        var selectedAddresseeLayerId;
        if(this.addresseeSelect){
          selectedAddresseeLayerId = this.addresseeSelect.getOptions(this.addresseeSelect.value).id;
        }
        return selectedAddresseeLayerId;
      },

      /**
       * This function is used to clear the main feature layer selection
       */
      _clearMainFeatureLayerSelection: function () {
        var mainResultFeatureLayer = this._getMainParcelFeatureLayer();
        mainResultFeatureLayer.clearSelection();
      },

      /**
       * This function is used to listen click event of review button
       */
      _onReviewBtnClicked: function () {
        this._reviewResultsObj = null;
        domConstruct.empty(this.reviewResultsContainer);
        this._reviewResultsObj = new reviewResults({
          nls: this.nls,
          config: this.config,
          formselectOptions: this.formatSelect.getOptions(),
          addresseeLayer: this._getSelectedAddresseeLayer(),
          map: this.map,
          parentNode: this.domNode,
          geoTypes: this._geoTypes
        });
        this._reviewResultsObj.placeAt(this.reviewResultsContainer);
        this._reviewResultsObj.startup();

        this.own(on(this._reviewResultsObj, 'unloadingComplete', lang.hitch(this, function () {
          this._showAndClearDisplayLayerOfTaxParcels();
          this._addNewResultFeaturesIntoBufferLayer();
          this._checkDownloadBtnEnable();
          this._reviewResultsObj.setFocusOnDownloadButton();
        })));

        this.own(on(this._reviewResultsObj, 'onDownloadBtnClicked', lang.hitch(this, function () {
          this._onDownloadBtnClicked();
        })));

        this.own(on(this._reviewResultsObj, 'clear', lang.hitch(this, function () {
          domClass.add(this.downloadBtn, 'hidden');
          domClass.add(this.reviewBtn, 'hidden');
          this._showPanel("mainPage");
          this._deactivateSelectTool();
          this._deactivateReviewSelectTool();
          this._clearLayers();
          this._clearAll();
        })));

        this._showPanel("reviewResultsPage");

        this._deactivateSelectTool();
        this._clearLayers();
        this._onSelectionComplete();
        this._selectFeaturesInMainResultFeatureLayer();
      },

      /**
       * This function is used to deactivate review select tool
       */
      _deactivateReviewSelectTool: function () {
        if (this._reviewResultsObj !== '' && this._reviewResultsObj !== null && this._reviewResultsObj !== undefined) {
          this._reviewResultsObj._deactivateSelectTool();
        }
      },

      /**
       * Displays selected panel
       **/
      _showPanel: function (currentPanel) {
        var prevNode, currentNode;
        //check if previous panel exist and hide it
        if (this._currentOpenPanel) {
          prevNode = this._getNodeByName(this._currentOpenPanel);
          domClass.add(prevNode, "hidden");
        }
        //get current panel to be displayed and show it
        currentNode = this._getNodeByName(currentPanel);
        domClass.remove(currentNode, "hidden");
        //set the current panel and previous panel
        this._lastOpenPanel = this._currentOpenPanel;
        this._currentOpenPanel = currentPanel;
        this._supportAccessibility();
      },

      /**
       * Get panel node from panel name
       **/
      _getNodeByName: function (panelName) {
        var node;
        switch (panelName) {
          case "mainPage":
            node = this.mainPageContainer;
            break;
          case "reviewResultsPage":
            node = this.reviewResultsContainer;
            break;
        }
        return node;
      },

      /**
       * This function is used to set first and last node
       */
      _supportAccessibility: function () {
        if (this._searchComponent.sources.length === 1) {
          utils.initFirstFocusNode(this.domNode,
            this._searchComponent._searchDijit.inputNode);
        } else {
          utils.initFirstFocusNode(this.domNode,
            this._searchComponent._searchDijit.sourcesBtnNode);
        }
        utils.focusFirstFocusNode(this.domNode);
        utils.initLastFocusNode(this.domNode, this.formatSelect.domNode);
      },

      /**
       * This function is used to get Selected AddresseeLayer
       */
      _getSelectedAddresseeLayer: function () {
        var selectedAddresseeLayer;
        var selectedAddresseeLayerTittle = this.addresseeSelect.getOptions(this.addresseeSelect.value).label;
        var selectedAddresseeLayerId = this.addresseeSelect.getOptions(this.addresseeSelect.value).id;
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (layerInfosObj) {
            array.some(layerInfosObj._operLayers, lang.hitch(this, function (operLayer) {
              if (selectedAddresseeLayerTittle === operLayer.title &&
                selectedAddresseeLayerId === operLayer.id) {
                selectedAddresseeLayer = operLayer;
              }
            }));
          }));
        return selectedAddresseeLayer;
      },

      /**
       * This function is used to select the features in main result layer
       */
      _selectFeaturesInMainResultFeatureLayer: function () {
        var whereClause;
        whereClause = this._getWhereClause();
        var query = new Query();
        query.where = whereClause;
        var mainResultFeatureLayer = this._getMainParcelFeatureLayer();
        mainResultFeatureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);
      },

      /**
       * This function is used to get the where clause which states the string of objects id
       */
      _getWhereClause: function () {
        var objIdArr;
        objIdArr = [];
        var existingMainParcelFeatureLayer;
        existingMainParcelFeatureLayer = this._getMainParcelFeatureLayer();
        array.forEach(this._foundAddressees, lang.hitch(this, function (foundAddress) {
          objIdArr.push(foundAddress.attributes[existingMainParcelFeatureLayer.objectIdField]);
        }));
        var whereClause;
        whereClause = existingMainParcelFeatureLayer.objectIdField + ' IN (' + objIdArr.join() + ')';
        return whereClause;
      },

      /**
       * This function is used to clear the result graphics layer
       */
      _showAndClearResultGraphicsLayer: function () {
        var resultGraphicsLayer = this._getResultGraphicsLayer();
        resultGraphicsLayer.show();
        resultGraphicsLayer.clear();
      },

      /**
       * This function is used to clear the display layer of tax parcel
       */
      _showAndClearDisplayLayerOfTaxParcels: function () {
        var lyrObj = this._getDisplayTaxParcelGraphicsLayer();
        if (lyrObj !== '' && lyrObj !== null && lyrObj !== undefined) {
          lyrObj.show();
          lyrObj.clear();
        }
      },

      /**
       * This function is used to clear all the layers
       */
      _clearLayers: function () {
        this._showAndClearResultGraphicsLayer();
        this._showAndClearDisplayLayerOfTaxParcels();
        this._clearMainFeatureLayerSelection();
        this._clearSelectedFeaturesWebGL();
        this._clearDrawGraphics();
        // Clear selection graphics of main select tool
        this._clearSelections();
        //clear searched result graphics
        this.map.graphics.clear();
      },

      _clearSelectedFeaturesWebGL: function () {
        var mainResultFeatureLayer = this._getMainParcelFeatureLayer();
        if (mainResultFeatureLayer !== '' && mainResultFeatureLayer !== null && mainResultFeatureLayer !== undefined) {
          if (mainResultFeatureLayer.hasOwnProperty("_selectedFeaturesWebGL")) {
            mainResultFeatureLayer._selectedFeaturesWebGL = {};
          }
        }
      },

      /**
      * This function is used to hook the feature layer to select tool
      */
      _hookFLToSelectTool: function () {
        var mainResultFeatureLayer = this._getMainParcelFeatureLayer();
        this._reviewResultsObj.resetFeatureLayerToSelectTool(mainResultFeatureLayer);
      },

      /**
       * This function is used to attach selection complete event
       */
      _onSelectionComplete: function () {
        var mainResultFeatureLayer = this._getMainParcelFeatureLayer();
        var selectionCompleteHandle = this.own(on(mainResultFeatureLayer, 'selection-complete',
          lang.hitch(this, function () {
            selectionCompleteHandle[0].remove();
            this._hookFLToSelectTool();
            this._addNewResultFeaturesIntoBufferLayer();
            this._checkDownloadBtnEnable();
            this._reviewResultsObj.setAccessibility();
          })));
      },

      /**
       * This function is used to deactivate the select tool
       */
      _deactivateSelectTool: function () {
        if (this._selectTool) {
          this._selectTool.deactivate();
        }
      },

      /**
       * This function is used to add the features into the buffer layer
       */
      _addNewResultFeaturesIntoBufferLayer: function () {
        var resultFeatureLayerFromMap;
        this._foundAddressees = [];
        this._bufferLayer.clear();
        resultFeatureLayerFromMap = this._getMainParcelFeatureLayer();
        var selectedFeatures = resultFeatureLayerFromMap.getSelectedFeatures();
        resultFeatureLayerFromMap._selectedFeaturesWebGL = {};
        array.forEach(selectedFeatures, lang.hitch(this, function (selectedFeature) {
          //add selected features WEBGL object so that it will work when updating selections in review screen
          var idField = resultFeatureLayerFromMap.objectIdField;
          var featureIdVal = selectedFeature.attributes[idField];
          resultFeatureLayerFromMap._selectedFeaturesWebGL[featureIdVal] = selectedFeature;
          //create graphic using the highlighter so that the symbology will be maintained for different geometry types
          var graphic = this._highlighter.createGraphic(selectedFeature, this._addresseeSymbology);
          if (graphic) {
            graphic.setAttributes(selectedFeature.attributes);
            this._bufferLayer.add(graphic);
            this._foundAddressees.push(graphic);
          }
        }));
      },

      _clearDrawGraphics: function () {
        // Draw box graphics
        if (this._drawTool && this._drawTool.drawLayer) {
          this._drawTool.drawLayer.clear();
        }
      },

      resize: function () {
        if (this._currentOpenPanel === "reviewResultsPage") {
          this._reviewResultsObj.setFocus();
        } else {
          utils.focusFirstFocusNode(this.domNode);
        }
      }
    });
});