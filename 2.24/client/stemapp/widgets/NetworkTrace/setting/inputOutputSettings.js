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
/*global define */
define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/query",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/on",
  './SymbolChooserPopup',
  'jimu/symbolUtils',
  "esri/symbols/jsonUtils",
  "dojo/_base/html",
  'jimu/dijit/SimpleTable',
  "dojo/text!./inputOutputSettings.html",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  'dijit/Editor',
  "dijit/form/Select",
  'dijit/_editor/plugins/LinkDialog',
  'dijit/_editor/plugins/ViewSource',
  'dijit/_editor/plugins/FontChoice',
  'dojox/editor/plugins/Preview',
  'dijit/_editor/plugins/TextColor',
  'dojox/editor/plugins/ToolbarLineBreak',
  'dojox/editor/plugins/FindReplace',
  'dojox/editor/plugins/PasteFromWord',
  'dojox/editor/plugins/InsertAnchor',
  'dojox/editor/plugins/Blockquote',
  'dojox/editor/plugins/UploadImage',
  'jimu/dijit/EditorChooseImage',
  'jimu/dijit/EditorTextColor',
  'jimu/dijit/EditorBackgroundColor'
], function (
  declare,
  lang,
  array,
  query,
  domConstruct,
  domStyle,
  on,
  SymbolChooserPopup,
  symbolUtils,
  jsonUtils,
  html,
  Table,
  inputOutputSettings,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Editor,
  Select
) {

  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    templateString: inputOutputSettings,
    baseClass: 'jimu-widget-NetworkTrace-setting',
    _loadedPluginCSS: false,
    hasSkipLocationsInput: false,
    _editorObj: null,

    startup: function () {
      this.inherited(arguments);
      this._loadedPluginCSS = false;
      this.hasSkipLocationsInput = false;
      this._editorObj = null;
    },

    postCreate: function () {
      this._loadedPluginCSS = false;
      this.hasSkipLocationsInput = false;
      this._createInputTable();
      this._initInputEditor();
      this._setInputSummaryText();
    },

    _createInputTable: function () {
      var fields2, args2;
      fields2 = [{
        name: 'displayName',
        title: this.nls.common.name,
        type: 'text',
        width: '15%'
      }, {
        name: 'type',
        title: this.nls.inputOutputTab.typeText,
        type: 'empty',
        width: '25%'
      }, {
        name: 'toolTip',
        title: this.nls.inputOutputTab.inputTooltip,
        editable: true,
        type: 'text',
        width: '40%'
      }, {
        name: 'symbol',
        title: this.nls.inputOutputTab.symbol,
        type: 'empty',
        width: '10%'
      }];
      args2 = {
        fields: fields2,
        selectable: false
      };
      this._inputTable = new Table(args2);
      this._inputTable.placeAt(this.inputTableNode);
      this._inputTable.startup();
      this.setInputSettings();
    },

    getInputSettings: function () {
      var inputs, selectedInputTypeOption;
      inputs = [];
      array.forEach(this._inputTable.getRows(), lang.hitch(this, function (currentRow) {
        var inputInfo = {},
          rowData;
        if (currentRow) {
          rowData = this._inputTable.getRowData(currentRow);
          selectedInputTypeOption = this._getInputType(currentRow.inputTypeDropdownObj);
          inputInfo = {
            "paramName": currentRow.config.paramName,
            "displayName": currentRow.config.displayName,
            "toolTip": rowData.toolTip,
            "type": selectedInputTypeOption,
            "symbol": currentRow.symbol
          };
          inputs.push(inputInfo);
        }
      }));
      return inputs;
    },

    setInputSettings: function () {
      this._inputTable.clear();
      if (this.inputConfig && this.inputConfig.length > 0) {
        array.forEach(this.inputConfig, lang.hitch(this, function (inputTypeInfo) {
          var fieldsColumn, row;
          row = this._inputTable.addRow(inputTypeInfo);
          row.tr.config = inputTypeInfo;
          //set the has skip locaion flag once skip location inpit is found
          if (inputTypeInfo.type && this.inputDataTypes.skip_locations === inputTypeInfo.type) {
            this.hasSkipLocationsInput = true;
          }
          fieldsColumn = query('.simple-table-cell', row.tr);
          if (fieldsColumn) {
            this._addInputTypesDropDown(fieldsColumn[1], row.tr, inputTypeInfo);
            this._addSymbolPicker(fieldsColumn[3], row.tr, inputTypeInfo);
          }
        }));
      }
    },

    /**
     * This method creates fall back symbol for Symbol preview.
     */
    _getFallbackSymbol: function (geometryType) {
      var jsonObj;
      if (!geometryType) {
        geometryType = "esriGeometryPoint";
      }
      switch (geometryType) {
        case "esriGeometryPoint":
          jsonObj = {
            "color": [0, 0, 128, 128],
            "outline": {
              "color": [0, 0, 128, 255],
              "width": 0.75,
              "type": "esriSLS",
              "style": "esriSLSSolid"
            },
            "size": 18,
            "type": "esriSMS",
            "style": "esriSMSCircle"
          };
          break;
        case "esriGeometryPolygon":
          jsonObj = {
            "color": [155, 187, 89, 129],
            "outline": {
              "color": [115, 140, 61, 255],
              "width": 1.5,
              "type": "esriSLS",
              "style": "esriSLSSolid"
            },
            "type": "esriSFS",
            "style": "esriSFSSolid"
          };
          break;
        case "esriGeometryPolyline":
          jsonObj = {
            "color": [155, 187, 89, 255],
            "type": "esriSLS",
            "style": "esriSLSSolid",
            "width": 2.25
          };
          break;
      }
      return jsonObj;
    },

    /**
     * This function is used to create table for adding new symbology
     */
    _addSymbolPicker: function (col, tr, currentRowValues) {
      //create params to initialize 'symbolchooserPopup' widget
      var objSymbol = {},
        geometryType;
      var symbolChooserTitle = "";
      if (currentRowValues && currentRowValues.data && currentRowValues.data.defaultValue &&
        currentRowValues.data.defaultValue.geometryType) {
        geometryType = currentRowValues.data.defaultValue.geometryType;
      } else {
        geometryType = "esriGeometryPoint";
      }

      if (currentRowValues.displayName) {
        symbolChooserTitle = currentRowValues.displayName;
      }
      //add default symbol in config
      var symbolType = "graphicLocationSymbol";
      if (tr.symbol) {
        objSymbol.symbol = jsonUtils.fromJson(tr.symbol);
      } else if (currentRowValues && currentRowValues.symbol) {
        objSymbol.symbol = jsonUtils.fromJson(currentRowValues.symbol);
      } else {
        // fetch selected symbol from config
        objSymbol.symbol = jsonUtils.fromJson(this._getFallbackSymbol(geometryType));
      }
      var params = {
        symbolChooserTitle: symbolChooserTitle,
        symbolParams: objSymbol,
        nls: this.nls,
        symbolType: symbolType
      };
      //create content div for symbol chooser node
      var symbolChooserNode = domConstruct.create("div", {
        "style": "height: 27px; overflow: hidden;"
      }, col);
      //display configured symbol in symbol chooser node
      this._showSelectedSymbol(symbolChooserNode, objSymbol.symbol, tr, geometryType);
      //attach 'click' event on node to display symbol chooser popup
      this.own(on(symbolChooserNode, 'click', lang.hitch(this, function () {
        //set recently selected symbol in symbol chooser popup
        params.symbolParams.symbol = jsonUtils.fromJson(tr.symbol);
        this._initSymbolChooserPopup(params, symbolChooserNode, tr, geometryType);
      })));
    },

    /**
     * Initialize symbol chooser popup widget
     * @param {object} params: contains params to initialize widget
     * @param {object} symbolChooserNode: contains node to display selected graphic symbol
     **/
    _initSymbolChooserPopup: function (params, symbolChooserNode, tr, geometryType) {
      var symbolChooserObj = new SymbolChooserPopup(params);
      //handler for poopup 'OK' button 'click' event
      symbolChooserObj.onOkClick = lang.hitch(this, function () {
        //get selected symbol
        var symbolJson = symbolChooserObj.symbolChooser.getSymbol();
        this._showSelectedSymbol(symbolChooserNode, symbolJson, tr, geometryType);
        symbolChooserObj.popup.close();
      });
    },
    /**
     * show selected graphic symbol in symbol chooser node
     * @param {object} symbolChooserNode: contains a symbol chooser node
     * @param {object} symbolJson: contains a json structure for symbol
     * @param {object} tr: table row in which symbol is created
     **/
    _showSelectedSymbol: function (symbolChooserNode, symbolJson, tr, geometryType) {
      domConstruct.empty(symbolChooserNode);
      var orgHeight, orgWidth, orgSize;
      if (symbolJson) {
        if (symbolJson.height > 26) {
          orgHeight = lang.clone(symbolJson.height);
          symbolJson.height = 26;
        }
        if (symbolJson.width > 26) {
          orgWidth = lang.clone(symbolJson.width);
          symbolJson.width = 26;
        }
        if (symbolJson.size > 20) {
          orgSize = lang.clone(symbolJson.size);
          symbolJson.size = 20;
        }
        var symbolNode = symbolUtils.createSymbolNode(symbolJson);
        // if symbol node is not created
        if (!symbolNode) {
          symbolNode = domConstruct.create('div');
        }
        domConstruct.place(symbolNode, symbolChooserNode);
        if (orgHeight) {
          symbolJson.height = orgHeight;
        }
        if (orgWidth) {
          symbolJson.width = orgWidth;
        }
        if (orgSize) {
          symbolJson.size = orgSize;
        }
        switch (geometryType) {
          case "esriGeometryPoint":
            domStyle.set(symbolChooserNode, "margin", "0 24px");
            break;
          case "esriGeometryPolygon":
            break;
          case "esriGeometryPolyline":
            domStyle.set(symbolNode, "width", "27px");
            domStyle.set(symbolNode, "overflow", "hidden");
            domStyle.set(symbolNode, "margin", "0 24px");
            break;
        }
        //store selected symbol in tr object
        tr.symbol = symbolJson.toJson();
      }
    },

    /**
     * This function is used to add input Types select and its option in each
     * row ofinput setting table
     */
    _addInputTypesDropDown: function (column, tr, inputTypeInfo) {
      var selectParent, inputFlagTypeOptions, inputTypeDropdownObj;
      selectParent = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, column);
      inputFlagTypeOptions = [{
        label: this.nls.inputOutputTab.flag,
        value: this.inputDataTypes.flags
      },
      {
        label: this.nls.inputOutputTab.barrier,
        value: this.inputDataTypes.barriers
      },
      {
        label: this.nls.inputOutputTab.skip,
        value: this.inputDataTypes.skip_locations
      }
      ];
      inputTypeDropdownObj = new Select({
        options: inputFlagTypeOptions,
        "class": "esriCTLayerFieldSelector"
      });
      inputTypeDropdownObj.placeAt(selectParent);
      inputTypeDropdownObj.startup();
      if (inputTypeInfo.paramName.toLowerCase() === Object.keys(this.inputDataTypes)[0].toLowerCase()) {
        inputTypeDropdownObj.set("value", this.inputDataTypes.flags);
      }
      if (inputTypeInfo.paramName.toLowerCase() === Object.keys(this.inputDataTypes)[1].toLowerCase()) {
        inputTypeDropdownObj.set("value", this.inputDataTypes.barriers);
      }
      if (inputTypeInfo.paramName.toLowerCase() === Object.keys(this.inputDataTypes)[2].toLowerCase()) {
        inputTypeDropdownObj.set("value", this.inputDataTypes.skip_locations);
      }
      tr.inputTypeDropdownObj = inputTypeDropdownObj;
      //if has prev selected value show it in selector
      if (tr.config && tr.config.type) {
        inputTypeDropdownObj.set("value", tr.config.type);
      }
    },

    /**
     * This function is used to get value of selected input type
     */
    _getInputType: function (inputTypeDropdownObj) {
      var selectedInputFlagType;
      if (inputTypeDropdownObj !== '' && inputTypeDropdownObj !== null && inputTypeDropdownObj !== undefined) {
        selectedInputFlagType = inputTypeDropdownObj.get("value");
      }
      return selectedInputFlagType;
    },

    /**
     * This function is used to add the input editor
     */
    _initInputEditor: function () {
      if (!this._editorObj) {
        this._editorObj = new Editor({
          plugins: [
            "bold", "italic", "underline", "|", "foreColor"
          ]
        }, this.inputEditorContainer);
        html.setStyle(this._editorObj.domNode, {
          "width": '100%',
          "height": '100%'
        });
        this.own(on(this._editorObj, "blur", lang.hitch(this,
          function () {

            var editorText, regExp;
            editorText = this._editorObj.focusNode.innerHTML;
            editorText = editorText.replace(/&nbsp;/g, '');
            regExp = new RegExp("<div><br></div>", 'g');
            editorText = editorText.replace(regExp, "");
            regExp = new RegExp("<p><br></p>", 'g');
            editorText = editorText.replace(regExp, "");
            regExp = new RegExp("<p></p>", 'g');
            editorText = editorText.replace(regExp, "");
            editorText = editorText.replace(/<br>/g, "");
            editorText = lang.trim(editorText);
            if ((editorText === null) || (editorText === "")) {

              this._editorObj.set("value", "");
            }
          })));
        this._editorObj.onLoadDeferred.then(lang.hitch(this, function () {

          if ((this._editorObj) && (this._editorObj.hasOwnProperty(
            'editNode'))) {

            if ("title" in this._editorObj.editNode) {

              if (this._editorObj.editNode.title === null ||
                this._editorObj.editNode.title === "") {

                this._editorObj.editNode.title = this.nls.inputOutputTab.summaryEditorText;
              }
            }
          }
        }));
        this._editorObj.startup();
      }
    },

    /**
     * This function is used to get the input summary expression
     */
    getInputSummaryText: function () {
      if (this._editorObj !== '' && this._editorObj !== null && this._editorObj !== undefined) {
        return this._editorObj.value;
      }
    },

    /**
     * This function is used to set the input summary text
     */
    _setInputSummaryText: function () {
      if (this.config.hasOwnProperty('inputSummaryText')) {
        if (this._editorObj !== '' && this._editorObj !== null && this._editorObj !== undefined) {

          this._editorObj.set("value", this.config.inputSummaryText);
        }
      }
    }
  });
});