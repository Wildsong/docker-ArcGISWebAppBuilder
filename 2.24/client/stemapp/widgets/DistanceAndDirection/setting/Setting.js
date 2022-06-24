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
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/Color',
    'jimu/BaseWidgetSetting',
    'jimu/LayerStructure',
    'jimu/utils',
    'dijit/form/NumberSpinner',
    'jimu/dijit/Message',
    'dijit/_WidgetsInTemplateMixin',
    './js/ColorPickerEditor',
    'esri/symbols/jsonUtils',
    'dojo/dom-construct',
    'jimu/symbolUtils',
    './SymbolChooserPopup',
    'dojo/on',
    'dijit/ColorPalette',
    'jimu/dijit/CheckBox',
    'jimu/dijit/SymbolPicker'
  ],
  function (
    dojoDeclare,
    dojoLang,
    dojoArray,
    dojoColor,
    jimuBaseWidgetSetting,
    LayerStructure,
    jimuUtils,
    dijitNumberSpinner,
    dijitMessage,
    dijitWidgetsInTemplateMixin,
    ColorPickerEditor,
    jsonUtils,
    domConstruct,
    symbolUtils,
    SymbolChooserPopup,
    on
  ) {

    return dojoDeclare([jimuBaseWidgetSetting, dijitWidgetsInTemplateMixin], {
      baseClass: 'distance-and-direction-setting',
      _symbolParams: {},

      postMixInProperties: function () {
        //mixin default nls with widget nls
        this.nls.common = {};
        dojoLang.mixin(this.nls.common, window.jimuNls.common);
      },

      postCreate: function () {
        this.inherited(arguments);
        this._symbolParams = {};
        this._populateLayerSelect(this._getAllMapLayers("esriGeometryPolyline"), this.opLineLayerList);
        this._populateLayerSelect(this._getAllMapLayers("esriGeometryPolygon"), this.opPolygonLayerList);
        var opLayerName = (this.config.operationalLineLayer) ? this.config.operationalLineLayer.name : "";
        this._setSelectedOption(this.opLineLayerList, opLayerName);
        opLayerName = (this.config.operationalPolygonLayer) ? this.config.operationalPolygonLayer.name : "";
        this._setSelectedOption(this.opPolygonLayerList, opLayerName);
        this._bindEvents();
      },

      /**
       * This function is used to bind events
       */
      _bindEvents: function () {
        this.own(on(this.showAllTabChk.domNode, 'click', dojoLang.hitch(this, function () {
          this._showAllTabChkStateChanged();
        })));
        this.own(on(this.lineTabChk.domNode, 'click', dojoLang.hitch(this, function () {
          this._tabChkStateChanged();
        })));
        this.own(on(this.circleTabChk.domNode, 'click', dojoLang.hitch(this, function () {
          this._tabChkStateChanged();
        })));
        this.own(on(this.ellipseTabChk.domNode, 'click', dojoLang.hitch(this, function () {
          this._tabChkStateChanged();
        })));
        this.own(on(this.ringTabChk.domNode, 'click', dojoLang.hitch(this, function () {
          this._tabChkStateChanged();
        })));
      },

      startup: function () {
        this.inherited(arguments);
        this.labelColorPicker = this._createColorPicker(this.labelColorPickerNode);
        this._setColorPicker(this.config.feedback.labelSymbol.color);
        this.labelTextSizeSpinner = this._createTextNumberSpinner(this.labelTextSizeSpinnerNode);
        this._setNumberSpinnerValue(this.config.feedback.labelSymbol.font.size);
        this._createSymbolPicker(this.lineSymbolNode, "lineSymbol", "esriGeometryPolyline",
          this.nls.lineSymbologyPopupTittle);
        this._createSymbolPicker(this.circleSymbolNode, "circleSymbol", "esriGeometryPolygon",
          this.nls.circleSymbologyPopupTittle);
        this._createSymbolPicker(this.ellipseSymbolNode, "ellipseSymbol", "esriGeometryPolygon",
          this.nls.ellipseSymbologyPopupTittle);
        this._createSymbolPicker(this.ringSymbolNode, "rangeRingSymbol", "esriGeometryPolyline",
          this.nls.ringSymbologyPopupTittle);
        this.setConfig(this.config);
      },

      _createColorPicker: function (node) {
        var colorPicker = new ColorPickerEditor({
          nls: this.nls
        });
        colorPicker.placeAt(node);
        colorPicker.startup();
        return colorPicker;
      },

      _getColorPicker: function () {
        return this.labelColorPicker.getValues();
      },

      _setColorPicker: function (color) {
        this.labelColorPicker.setValues({
          color: new dojoColor(color)
        });
      },

      _createTextNumberSpinner: function (node) {
        var numberSpinner = new dijitNumberSpinner({
          value: 12,
          smallDelta: 1,
          constraints: {
            min: 1,
            max: 36,
            places: 0
          },
          style: "width:100px"
        });
        numberSpinner.placeAt(node);
        return numberSpinner;
      },

      _setNumberSpinnerValue: function (value) {
        this.labelTextSizeSpinner.set("value", value);
      },

      setConfig: function () {
        if (this.config.feedback.lineSymbol) {
          this.lineTabChk.setValue(this.config.feedback.lineSymbol.showTab);
          this.lineTabChk.domNode.click();
        } else {
          this.lineTabChk.setValue(true);
        }

        if (this.config.feedback.circleSymbol) {
          this.circleTabChk.setValue(this.config.feedback.circleSymbol.showTab);
          this.lineTabChk.domNode.click();
        } else {
          this.circleTabChk.setValue(true);
        }

        if (this.config.feedback.ellipseSymbol) {
          this.ellipseTabChk.setValue(this.config.feedback.ellipseSymbol.showTab);
          this.lineTabChk.domNode.click();
        } else {
          this.ellipseTabChk.setValue(true);
        }

        if (this.config.feedback.rangeRingSymbol) {
          this.ringTabChk.setValue(this.config.feedback.rangeRingSymbol.showTab);
          this.lineTabChk.domNode.click();
        } else {
          this.ringTabChk.setValue(true);
        }

        if (this.config.hasOwnProperty("operationalLineLayer") && this.config.operationalLineLayer.name !== "") {
          this._setSelectedOption(this.opLineLayerList, this.config.operationalLineLayer.name);
        } else {
          this.opLineLayerList.value = '';
        }

        if (this.config.hasOwnProperty("operationalPolygonLayer") && this.config.operationalPolygonLayer.name !== "") {
          this._setSelectedOption(this.opPolygonLayerList, this.config.operationalPolygonLayer.name);
        } else {
          this.opPolygonLayerList.value = '';
        }
      },

      /**
       * Sets the selected option
       * in the drop-down list
       * @param {string} layerName
       */
      _setSelectedOption: function (selectNode, layerName) {
        for (var i = 0; i < selectNode.options.length; i++) {
          if (selectNode.options[i].value === layerName) {
            selectNode.selectedIndex = i;
            break;
          }
        }
      },

      getConfig: function () {
        var allTabsFalse = 0;
        var childCheckboxes = [this.lineTabChk, this.circleTabChk, this.ellipseTabChk, this.ringTabChk];
        dojoArray.forEach(childCheckboxes, dojoLang.hitch(this, function (checkBox) {
          if (checkBox.getValue()) {
            allTabsFalse = allTabsFalse + 1;
          }
        }));
        // Validate text size value
        if (!this._validateLabelTextSizeValue(this.labelTextSizeSpinner.getValue())) {
          return false;
        }

        if (allTabsFalse !== 0) {
          this.config.feedback = {
            lineSymbol: {
              showTab: this.lineTabChk.checked,
              type: this._symbolParams.lineSymbol.type,
              style: this._symbolParams.lineSymbol.style,
              color: this._symbolParams.lineSymbol.color,
              width: this._symbolParams.lineSymbol.width
            },
            circleSymbol: {
              showTab: this.circleTabChk.checked,
              type: this._symbolParams.circleSymbol.type,
              style: this._symbolParams.circleSymbol.style,
              color: this._symbolParams.circleSymbol.color,
              outline: {
                color: this._symbolParams.circleSymbol.outline.color,
                width: this._symbolParams.circleSymbol.outline.width,
                type: this._symbolParams.circleSymbol.outline.type,
                style: this._symbolParams.circleSymbol.outline.style
              }
            },
            ellipseSymbol: {
              showTab: this.ellipseTabChk.checked,
              type: this._symbolParams.ellipseSymbol.type,
              style: this._symbolParams.ellipseSymbol.style,
              color: this._symbolParams.ellipseSymbol.color,
              outline: {
                color: this._symbolParams.ellipseSymbol.outline.color,
                width: this._symbolParams.ellipseSymbol.outline.width,
                type: this._symbolParams.ellipseSymbol.outline.type,
                style: this._symbolParams.ellipseSymbol.outline.style
              }
            },
            rangeRingSymbol: {
              showTab: this.ringTabChk.checked,
              type: this._symbolParams.rangeRingSymbol.type,
              style: this._symbolParams.rangeRingSymbol.style,
              color: this._symbolParams.rangeRingSymbol.color,
              width: this._symbolParams.rangeRingSymbol.width
            },
            labelSymbol: {
              'type': 'esriTS',
              'color': this._getColorPicker(),
              'verticalAlignment': 'middle',
              'horizontalAlignment': 'center',
              'xoffset': 0,
              'yoffset': 0,
              'kerning': true,
              'font': {
                'family': 'arial',
                'size': this.labelTextSizeSpinner.getValue(),
                'style': 'normal',
                'weight': 'normal',
                'decoration': 'none'
              }
            }
          };
          this.config.operationalLineLayer = {
            name: this.opLineLayerList.value
          };
          this.config.operationalPolygonLayer = {
            name: this.opPolygonLayerList.value
          };
          return this.config;
        } else {
          new dijitMessage({
            message: this.nls.tabErrorMessage
          });
          return false;
        }
      },

      /**
       * This gets all the operational layers and places it in a custom data object.
       */
      _getAllMapLayers: function (geometryType) {
        var layerList = [];
        var layerStructure = LayerStructure.getInstance();
        //get all layers.
        layerStructure.traversal(function (layerNode) {
          //check to see if type exist and if it's not any tiles
          if (typeof (layerNode._layerInfo.layerObject.type) !== 'undefined') {
            if ((layerNode._layerInfo.layerObject.type).indexOf("tile") === -1) {
              if (layerNode._layerInfo.layerObject.geometryType === geometryType) {
                layerList.push(layerNode._layerInfo.layerObject);
              }
            }
          }
        });
        return layerList;
      },

      /*
        Validates the text size values
      */
      _validateLabelTextSizeValue: function (val) {
        if (!isNaN(val) && (val > 0 && val < 37)) {
          return true;
        }
        return false;
      },

      /**
       * Populates the drop down list of operational layers
       * from the webmap
       */
      _populateLayerSelect: function (layerList, selectNode) {
        //Add a blank option
        var blankOpt = document.createElement('option');
        blankOpt.value = "";
        blankOpt.innerHTML = "";
        blankOpt.selected = true;
        selectNode.appendChild(blankOpt);
        //Add layers
        dojoArray.forEach(layerList, dojoLang.hitch(this, function (layer) {
          if (layer.url) {
            if (layer.type === "Feature Layer" && this._containsSupportedCapabilities(layer.capabilities)) {
              var opt = document.createElement('option');
              opt.value = layer.name;
              opt.id = layer.id;
              opt.innerHTML = jimuUtils.sanitizeHTML(layer.name);
              opt.selected = false;
              selectNode.appendChild(opt);
            }
          }
        }));
      },

      /**
       * Check if feature layer has the supported capabilities
       * @param {*} capabilities
       * @returns
       */
      _containsSupportedCapabilities: function (capabilities) {
        var supported = ["create", "delete", "query", "update", "editing"];
        var isSupported = true;
        supported.forEach(function(supCap) {
          if (capabilities.toLowerCase().split(",").indexOf(supCap) === -1) {
            isSupported = false;
          }
        });
        return isSupported;
      },

      /**
       * This function creates symbols in config UI
       * @param {object} symbolNode: contains a symbol chooser node
       * @param {string} symbolType: contains symbol type
       * @param {string} geometryType: contains symbol geometry type
       * @param {string} symbolChooserTitle: contains a symbol chooser popup title
       * @memberOf widgets/DD/setting/setting
       */
      _createSymbolPicker: function (symbolNode, symbolType, geometryType, symbolChooserTitle) {
        var objSymbol, params;
        //if symbol geometry exist
        if (geometryType) {
          objSymbol = {};
          objSymbol.type = jimuUtils.getSymbolTypeByGeometryType(geometryType);
          // if symbols parameter available in input parameters then take symbol details
          if (this.config && this.config.feedback) {
            // check whether symbolType info is available in config
            if (this.config.feedback.hasOwnProperty(symbolType)) {
              // fetch selected symbol from config
              objSymbol.symbol = jsonUtils.fromJson(this.config.feedback[symbolType]);
            }
          }
          //create params to initialize 'symbolchooserPopup' widget
          params = {
            symbolChooserTitle: symbolChooserTitle,
            symbolParams: objSymbol,
            nls: this.nls,
            symbolType: symbolType
          };
          //display configured symbol in symbol chooser node
          this._showSelectedSymbol(symbolNode, objSymbol.symbol, symbolType);
          //attach 'click' event on node to display symbol chooser popup
          this.own(on(symbolNode, 'click', dojoLang.hitch(this, function () {
            //set recently selected symbol in symbol chooser popup
            objSymbol.symbol = jsonUtils.fromJson(this._symbolParams[symbolType]);
            this._initSymbolChooserPopup(params, symbolNode);
          })));
        }
      },

      /**
      * Initialize symbol chooser popup widget
      * @param {object} params: contains params to initialize widget
      * @param {object} symbolChooserNode: contains node to display selected graphic symbol
      * @memberOf widgets/DD/setting/Setting
      **/
      _initSymbolChooserPopup: function (params, symbolChooserNode) {
        var symbolChooserObj = new SymbolChooserPopup(params);
        //handler for poopup 'OK' button 'click' event
        symbolChooserObj.onOkClick = dojoLang.hitch(this, function () {
          //get selected symbol
          var symbolJson = symbolChooserObj.symbolChooser.getSymbol();
          this._showSelectedSymbol(symbolChooserNode, symbolJson, params.symbolType);
          symbolChooserObj.popup.close();
        });
      },

      /**
      * show selected graphic symbol in symbol chooser node
      * @param {object} symbolChooserNode: contains a symbol chooser node
      * @param {object} symbolJson: contains a json structure for symbol
      * @param {string} symbolType: contains symbol type
      * @member of widgets/DD/setting/setting
      **/
      _showSelectedSymbol: function (symbolChooserNode, symbolJson, symbolType) {
        domConstruct.empty(symbolChooserNode);
        if (symbolJson) {
          var symbolNode = symbolUtils.createSymbolNode(symbolJson);
          // if symbol node is not created
          if (!symbolNode) {
            symbolNode = domConstruct.create('div');
          }
          domConstruct.place(symbolNode, symbolChooserNode);
          //store selected symbol in 'symbolParams' object
          this._symbolParams[symbolType] = symbolJson.toJson();
        }
      },

      /**
       * Callback handler for parents checkbox change event.
       * This will change the state of related child's based on parents state.
       */
      _showAllTabChkStateChanged: function () {
        var childCheckboxes = [this.lineTabChk, this.circleTabChk, this.ellipseTabChk, this.ringTabChk];
        var parentState = this.showAllTabChk.getValue();
        dojoArray.forEach(childCheckboxes, dojoLang.hitch(this, function (checkBox) {
          if (parentState) {
            checkBox.setValue(true);
          } else {
            checkBox.setValue(false);
          }
        }));
      },

      /**
       * Callback handler for child checkbox change event.
       * This will change the state of related parent based on states of all child's.
       */
      _tabChkStateChanged: function () {
        var childCheckboxes = [this.lineTabChk, this.circleTabChk, this.ellipseTabChk, this.ringTabChk];
        var enableParent = true;
        dojoArray.some(childCheckboxes, dojoLang.hitch(this, function (checkBox) {
          if (!checkBox.getValue()) {
            enableParent = false;
            return true;
          }
        }));
        this.showAllTabChk.setValue(enableParent);
      }
    });
  });