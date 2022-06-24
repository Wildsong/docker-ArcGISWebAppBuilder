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
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
define([
  "dojo/_base/declare",
  "dojo/text!./summarySetting.html",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/dom-attr",
  'dijit/Editor',
  'dojo/_base/html',
  "jimu/dijit/Message",
  "./summarySettingSelector",
  "dojo/_base/array",
  'jimu/dijit/SimpleTable',
  "dojo/query",
  'dijit/registry',
  "dijit/form/Select",
  "esri/symbols/jsonUtils",
  'jimu/symbolUtils',
  "dojo/dom-style",
  "dijit/form/ValidationTextBox",
  "./FieldSelector",
  "esri/dijit/VisibleScaleRangeSlider",
  "jimu/dijit/Popup",
  './SymbolChooserPopup',
  "jimu/utils",
  'dojo/sniff',
  "dijit/_editor/plugins/TextColor"
], function (
  declare,
  summarySetting,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  domClass,
  domConstruct,
  lang,
  on,
  domAttr,
  Editor,
  html,
  Message,
  SummarySettingSelector,
  array,
  Table,
  query,
  registry,
  Select,
  jsonUtils,
  symbolUtils,
  domStyle,
  ValidationTextBox,
  FieldSelector,
  VisibleScaleRangeSlider,
  Popup,
  SymbolChooserPopup,
  utils,
  has
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    templateString: summarySetting,
    baseClass: 'jimu-widget-NetworkTrace-setting',
    _selectedOutputParameter: null, // to store selected output parameter
    _inputOutputSelect: null, // to store input parameter control
    _operatorSelect: null, // to store operator parameter control
    _fieldSelect: null, // to store field parameter control
    _inputOutputParamArray: [], // to store input output parameter Array
    _selectedInput: null, // to store input option object evt
    _selectedOutput: null, // to store output option object evt
    _selectedField: null, // to store feild option object evt
    _selectedOperator: null, // to store operator option object evt
    _summaryExpressionEditor: null, // to store object of summary expression editor
    _editorObj: null, // to store editor object
    _editorObjSymbolSelector: null,
    _outputLayerSettingsArr: [], // to store settings of output configuration
    _selectedOutputGeometryType: null, // to store geometry type of selected output

    postCreate: function () {
      this.inherited(arguments);
      this._selectedOutputParameter = null;
      this._inputOutputSelect = null;
      this._operatorSelect = null;
      this._fieldSelect = null;
      this._inputOutputParamArray = [];
      this._selectedInput = null;
      this._selectedOutput = null;
      this._selectedField = null;
      this._selectedOperator = null;
      this._summaryExpressionEditor = null;
      this._editorObj = null;
      this._editorObjSymbolSelector = null;
      this._outputLayerSettingsArr = [];
      this._selectedOutputGeometryType = null;
    },

    startup: function () {
      this.inherited(arguments);
      this._initInputOutPutParamArray();
      this._createOutputTable();
      this._initEditor();
    },

    /**
     * This function stores all input and output parameters in _inputOutputParamArray
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _initInputOutPutParamArray: function () {
      var i;
      this._inputOutputParamArray = [];
      for (i = 0; i < this.inputParametersArray.length; i++) {
        this._inputOutputParamArray.push(this.inputParametersArray[i]);
      }
      for (i = 0; i < this.outputParametersArray.length; i++) {
        this._inputOutputParamArray.push(this.outputParametersArray[i]);
      }
    },

    /**
     * This function is used to init dojo editor
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _initEditor: function () {
      if (!this._editorObj) {
        this._editorObj = new Editor({
          plugins: [
            "bold", "italic", "underline", "|", "foreColor"
          ]
        }, this.editorContainer);
        html.setStyle(this._editorObj.domNode, {
          "width": '100%',
          "height": '100%'
        });
        this.own(on(this._editorObj, "focus", lang.hitch(this,
          function () {
            domClass.remove(this.verifySummaryExpression,
              "jimu-state-disabled");
          })));
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
              domClass.add(this.verifySummaryExpression,
                "jimu-state-disabled");
            } else {
              domClass.remove(this.verifySummaryExpression,
                "jimu-state-disabled");
            }
          })));
        this._editorObj.onLoadDeferred.then(lang.hitch(this, function () {
          if ((this._editorObj) && (this._editorObj.hasOwnProperty(
            'editNode'))) {

            if ("title" in this._editorObj.editNode) {

              if (this._editorObj.editNode.title === null ||
                this._editorObj.editNode.title === "") {

                this._editorObj.editNode.title = this.nls.summaryTab.summaryEditorText;
              }
            }
          }
          if ((this._editorObj) && (this._editorObj.hasOwnProperty(
            'toolbar')) && (this._editorObj.toolbar.hasOwnProperty(
              'containerNode'))) {
            new SummarySettingSelector({
              _editorObj: this._editorObj,
              inputOutputParamArray: this._inputOutputParamArray,
              nls: this.nls
            }, domConstruct.create("div", {
              "class": "summarySelectorDiv"
            }, this._editorObj.toolbar.containerNode));
          }
        }));
        this._editorObj.startup();
      }
      if (this.autoZoomAfterTraceCheckedState) {
        this.autoZoomAfterTrace.setValue(true);
      } else {
        this.autoZoomAfterTrace.setValue(false);
      }
    },

    /**
     * This function is used to display input & output parameter
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    displayInputOutputParameters: function () {
      this._displayInputOutputPanelParameters();
      this._regainExistingConfigurationData();
    },

    /**
     * This function is used to regain existing configuration settings.
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _regainExistingConfigurationData: function () {
      if (this.config.summaryExpression) {
        if (this._editorObj !== '' && this._editorObj !== null && this._editorObj !== undefined) {
          this._editorObj.focus();
          this._editorObj.set("value", this.config.summaryExpression.summaryExpressionValue);
        }
        if (this.config.summaryExpression.summaryExpressionValue === null ||
          this.config.summaryExpression.summaryExpressionValue === "") {
          domClass.add(this.verifySummaryExpression, "jimu-state-disabled");
        } else {
          domClass.remove(this.verifySummaryExpression, "jimu-state-disabled");
        }
      }
    },

    /**
     * This function used to add parameter in input output panel
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _displayInputOutputPanelParameters: function () {
      var inputOption, i;
      this._inputOutputParamArray = [];
      this._inputOutputSelect = domConstruct.create("select", {
        "class": "esriCTPanelSelect",
        "size": 2
      }, this.inputOutputParameterPanel);
      for (i = 0; i < this.inputParametersArray.length; i++) {
        inputOption = domConstruct.create("option", {});
        inputOption.innerHTML = this.inputParametersArray[i].name;
        inputOption.value = this.inputParametersArray[i].name;
        inputOption.title = this.inputParametersArray[i].name;
        domAttr.set(inputOption, "Type", "Input");
        this._inputOutputSelect.appendChild(inputOption);
        domClass.add(inputOption, "esriCTInputOutputOptions");
        this._inputOutputParamArray.push(this.inputParametersArray[i]);
      }
      for (i = 0; i < this.outputParametersArray.length; i++) {
        inputOption = domConstruct.create("option", {});
        inputOption.innerHTML = this.outputParametersArray[i].name;
        inputOption.value = this.outputParametersArray[i].name;
        inputOption.title = this.outputParametersArray[i].name;
        domAttr.set(inputOption, "Type", "Output");
        if (this.outputParametersArray[i] && this.outputParametersArray[
          i].defaultValue && this.outputParametersArray[i].defaultValue
            .geometryType) {
          domAttr.set(inputOption, "GeometryType", this.outputParametersArray[
            i].defaultValue.geometryType);
        } else {
          domAttr.set(inputOption, "GeometryType", null);
        }
        this._inputOutputSelect.appendChild(inputOption);
        domClass.add(inputOption, "esriCTInputOutputOptions");
        this._inputOutputParamArray.push(this.outputParametersArray[i]);
      }
      domAttr.set(this._inputOutputSelect, "size", this._inputOutputParamArray
        .length);
      this._onInputOutputClick();
      this._insertBlankSelectInFieldPanel();
      this._insertBlankSelectInOperatorPanel();
      this._allocateEqualSizeToPanels();
    },

    /**
     * This function is used to insert blank options in field panel
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _insertBlankSelectInFieldPanel: function () {
      var fieldOption;
      this._fieldSelect = domConstruct.create("select", {
        "class": "esriCTFieldPanelSelect",
        "size": 2
      }, this.fieldPanel);
      fieldOption = domConstruct.create("option", {});
      fieldOption.innerHTML = "";
      domAttr.set(fieldOption, "disabled", true);
      this._fieldSelect.appendChild(fieldOption);
      domClass.add(fieldOption, "esriCTBlankOptions");
    },

    /**
     * This function is used to insert blank options in field panel
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _insertBlankSelectInOperatorPanel: function () {
      var operatorOption;
      this._operatorSelect = domConstruct.create("select", {
        "class": "esriCTOperatorPanelSelect",
        "size": 2
      }, this.operatorPanel);
      operatorOption = domConstruct.create("option", {});
      operatorOption.innerHTML = "";
      domAttr.set(operatorOption, "disabled", true);
      this._operatorSelect.appendChild(operatorOption);
      domClass.add(operatorOption, "esriCTBlankOptions");
    },

    /**
     * This function is used to empty field panel
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _emptyFieldPanel: function () {
      domConstruct.empty(this.fieldPanel);
      this._fieldSelect = null;
    },

    /**
     * This function is used to empty operator panel
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _emptyOperatorPanel: function () {
      domConstruct.empty(this.operatorPanel);
      this._operatorSelect = null;
    },

    /**
     * This function is used to display input/output operators
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _onInputOutputClick: function () {
      var type;
      this.own(on(this._inputOutputSelect, "click", lang.hitch(this,
        function (evt) {
          type = domAttr.get(evt.currentTarget[evt.currentTarget
            .selectedIndex], "Type");
          if (type === "Input") {
            domClass.add(this.addSummaryExpression,
              "jimu-state-disabled");
            this._selectedInput = this._selectedOutput = this._selectedField =
              this._selectedOperator = null;
            this._selectedInput = evt.currentTarget[evt.currentTarget
              .selectedIndex];
            this._emptyFieldPanel();
            this._emptyOperatorPanel();
            this._insertBlankSelectInFieldPanel();
            this._displayOperators(true, false, false, false);
            domClass.remove(this.operatorPanel, "esriCTHidden");
          } else if (type === "Output") {
            this._selectedOutputGeometryType = domAttr.get(evt.currentTarget[
              evt.currentTarget
                .selectedIndex], "GeometryType");
            this._selectedInput = this._selectedOutput = this._selectedField =
              this._selectedOperator = null;
            this._selectedOutput = evt.currentTarget[evt.currentTarget
              .selectedIndex];
            this._selectedOutputParameter = evt;
            this._emptyFieldPanel();
            this._emptyOperatorPanel();
            this._displayOutputFields();
            this._fetchAndDisplayOutputOperators();
          }
        })));
    },

    /**
     * This function is used to fetch & display output operators
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _fetchAndDisplayOutputOperators: function () {
      domClass.add(this.addSummaryExpression,
        "jimu-state-disabled");
      this._displayOperators(false, true, false, false);
      this._fieldSelect.selectedIndex = "-1";
    },

    /**
     * This function is used to display fields
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _displayOutputFields: function () {
      var fieldOption, i, fieldOptionArray = [];
      domConstruct.empty(this.fieldPanel);
      fieldOptionArray = this._inputOutputParamArray[this._selectedOutputParameter
        .currentTarget.selectedIndex].defaultValue.fields;
      this._fieldSelect = domConstruct.create("select", {
        "class": "esriCTFieldPanelSelect"
      }, this.fieldPanel);
      for (i = 0; i < fieldOptionArray.length; i++) {
        if (fieldOptionArray[i].type === "esriFieldTypeDouble" ||
          fieldOptionArray[i].type === "esriFieldTypeSmallInteger" ||
          fieldOptionArray[i].type === "esriFieldTypeInteger") {
          fieldOption = domConstruct.create("option", {});
          fieldOption.innerHTML = fieldOptionArray[i].name;
          fieldOption.value = fieldOptionArray[i].name;
          fieldOption.title = fieldOptionArray[i].name;
          this._fieldSelect.appendChild(fieldOption);
          domClass.add(fieldOption, "esriCTInputOutputOptions");
        }
      }
      this._onFieldClick();
      this._allocateEqualSizeToPanels();
    },

    /**
     * This function is used to display fields operator
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _onFieldClick: function () {
      this.own(on(this._fieldSelect, "click", lang.hitch(this,
        function (evt) {
          domClass.add(this.addSummaryExpression,
            "jimu-state-disabled");
          this._selectedField = null;
          this._selectedField = evt.currentTarget[evt.currentTarget
            .selectedIndex];
          this._displayOperators(false, false, true, false);
          this._allocateEqualSizeToPanels();
        })));
    },

    /**
     * This function is used to display input/output/field operator
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _displayOperators: function (inputOperator, outputOperator,
      fieldOperator, displayOutputSkipCountOption) {
      var operatorOption, i, operatorParameterArray;
      operatorParameterArray = [];
      domConstruct.empty(this.operatorPanel);
      if (inputOperator) {
        operatorParameterArray.push(this.nls.summaryTab.inputOperatorCountOption);
      } else if (outputOperator) {
        operatorParameterArray.push(this.nls.summaryTab.outputOperatorCountOption);
        if (displayOutputSkipCountOption) {
          operatorParameterArray.push(this.nls.summaryTab.outputOperatorSkipCountOption);
        }
      } else if (fieldOperator) {
        operatorParameterArray.push(this.nls.summaryTab.fieldOperatorSumOption);
        operatorParameterArray.push(this.nls.summaryTab.fieldOperatorMinOption);
        operatorParameterArray.push(this.nls.summaryTab.fieldOperatorMaxOption);
        operatorParameterArray.push(this.nls.summaryTab.fieldOperatorMeanOption);
      }
      this._operatorSelect = domConstruct.create("select", {
        "class": "esriCTPanelSelect",
        "size": 2
      }, this.operatorPanel);
      for (i = 0; i < operatorParameterArray.length; i++) {
        operatorOption = domConstruct.create("option", {});
        operatorOption.innerHTML = operatorParameterArray[i];
        operatorOption.value = operatorParameterArray[i];
        operatorOption.title = operatorParameterArray[i];
        this._operatorSelect.appendChild(operatorOption);
        domClass.add(operatorOption, "esriCTInputOutputOptions");
      }
      this._selectOperator();
      this._allocateEqualSizeToPanels();
    },

    /**
     * This function is used to refresh operator list
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    refreshOperator: function () {
      if (!this._selectedField) {
        if (this._selectedOutput) {
          this._fetchAndDisplayOutputOperators();
          if (this._selectedOperator && (this._selectedOperator.value ===
            this.nls.summaryTab.outputOperatorCountOption)) {
            if (this._operatorSelect) {
              this._operatorSelect.selectedIndex = 0;
              domClass.remove(this.addSummaryExpression,
                "jimu-state-disabled");
            }
          }
        }
      }
    },

    /**
     * This function is used to select operator
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _selectOperator: function () {
      this.own(on(this._operatorSelect, "click", lang.hitch(this,
        function (evt) {
          this._selectedOperator = null;
          this._selectedOperator = evt.currentTarget[evt.currentTarget
            .selectedIndex];
          if ((this._selectedInput !== null || this._selectedOutput !==
            null) && this._selectedOperator !== null) {
            domClass.remove(this.addSummaryExpression,
              "jimu-state-disabled");
          }
        })));
    },

    /**
     * This function is used to get max length of parameters of inputOutput/field/operator parameters
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _allocateEqualSizeToPanels: function () {
      var inputOutputPanelLength, fieldPanelLength,
        operatorPanelLength, selectSize;
      inputOutputPanelLength = 0;
      fieldPanelLength = 0;
      operatorPanelLength = 0;
      if (this._inputOutputSelect && this._inputOutputSelect.length >
        0) {
        inputOutputPanelLength = this._inputOutputSelect.length;
      }
      if (this._fieldSelect && this._fieldSelect.length > 0) {
        fieldPanelLength = this._fieldSelect.length;
      }
      if (this._operatorSelect && this._operatorSelect.length > 0) {
        operatorPanelLength = this._operatorSelect.length;
      }
      selectSize = Math.max(inputOutputPanelLength, fieldPanelLength,
        operatorPanelLength);
      if (this._inputOutputSelect) {
        domAttr.set(this._inputOutputSelect, "size", selectSize);
      }
      if (this._fieldSelect) {
        domAttr.set(this._fieldSelect, "size", selectSize);
      }
      if (this._operatorSelect) {
        domAttr.set(this._operatorSelect, "size", selectSize);
      }
      this._removeClassFromChildNodes();
      if (this._inputOutputSelect && (this._inputOutputSelect.length ===
        selectSize)) {
        domClass.add(this._inputOutputSelect.childNodes[selectSize -
          1], "esriCTInputOutputOptionsBorderNone");
      }
      if (this._fieldSelect && (this._fieldSelect.length ===
        selectSize)) {
        domClass.add(this._fieldSelect.childNodes[selectSize - 1],
          "esriCTInputOutputOptionsBorderNone");
      }
      if (this._operatorSelect && (this._operatorSelect.length ===
        selectSize)) {
        domClass.add(this._operatorSelect.childNodes[selectSize - 1],
          "esriCTInputOutputOptionsBorderNone");
      }
    },

    /**
     * This function is used to remove class from childnodes.
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _removeClassFromChildNodes: function () {
      var i;
      if (this._inputOutputSelect) {
        for (i = 0; i < this._inputOutputSelect.childNodes.length; i++) {
          domClass.remove(this._inputOutputSelect.childNodes[i],
            "esriCTInputOutputOptionsBorderNone");
        }
      }
      if (this._fieldSelect) {
        for (i = 0; i < this._fieldSelect.childNodes.length; i++) {
          domClass.remove(this._fieldSelect.childNodes[i],
            "esriCTInputOutputOptionsBorderNone");
        }
      }
      if (this._operatorSelect) {
        for (i = 0; i < this._operatorSelect.childNodes.length; i++) {
          domClass.remove(this._operatorSelect.childNodes[i],
            "esriCTInputOutputOptionsBorderNone");
        }
      }
    },

    /**
     * This function is used to add expression in textarea
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _onClickAddExpressionBtn: function () {
      if (!(domClass.contains(this.addSummaryExpression,
        "jimu-state-disabled"))) {
        var verifyFlag = false;
        if (this._selectedInput !== null && this._selectedOperator !==
          null) {
          this._editorObj.focus();
          this._editorObj.execCommand("inserthtml", "{" + this._selectedInput
            .value + ":" + this._selectedOperator.value + "}");
          verifyFlag = true;
        } else if ((this._selectedOutput !== null && this._selectedField ===
          null) && this._selectedOperator !== null) {
          this._editorObj.focus();
          this._editorObj.execCommand("inserthtml", "{" + this._selectedOutput
            .value + ":" + this._selectedOperator.value + "}");
          verifyFlag = true;
        } else if ((this._selectedOutput !== null && this._selectedField !==
          null) && this._selectedOperator !== null) {
          this._editorObj.focus();
          this._editorObj.execCommand("inserthtml", "{" + this._selectedOutput
            .value + ":" + this._selectedField.value + ":" + this._selectedOperator
              .value + "}");
          verifyFlag = true;
        }
        if (verifyFlag === true && (domClass.contains(this.verifySummaryExpression,
          "jimu-state-disabled"))) {
          domClass.remove(this.verifySummaryExpression,
            "jimu-state-disabled");
        }
      }
    },

    /**
     * This function is used to verify expression of textarea
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     */
    _onClickVerifyExpressionBtn: function () {
      if (!(domClass.contains(this.verifySummaryExpression,
        "jimu-state-disabled"))) {
        this.validateExpression(true);
      }
    },

    /**
     * This function display error message in jimu alert box.
     * @param {string} err gives the error message
     * @memberOf widgets/isolation-trace/settings/settings
     **/
    _errorMessage: function (err) {
      var errorMessage = new Message({
        message: err
      });
      errorMessage.message = err;
    },

    /**
     * This function is used to get configuration data.
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    getSummaryExpressionConfigData: function () {
      var obj;
      obj = {};
      obj.summaryExpressionValueArr = [];
      obj.summaryExpressionValue = this._editorObj.value;
      obj.summaryExpressionValue.replace(/\{(.+?)\}/g, function (_, m) { // jshint ignore:line
        var expressionObj = {};
        expressionObj.value = m;
        expressionObj.trimmedValue = m.replace(/\s/g, "");
        obj.summaryExpressionValueArr.push(expressionObj);
      });
      obj.summaryExpressionTrimmedValue = this._getSummaryExpressionFilteredValue(
        obj.summaryExpressionValueArr);
      obj.summaryExpressionNLS = this.nls.summaryTab;
      obj.autoZoomAfterTrace = this.getAutoZoomAfterTraceConfigData();
      return obj;
    },

    getAutoZoomAfterTraceConfigData: function () {
      return this.autoZoomAfterTrace.getValue();
    },

    /**
     * This function is used to trim white spaces in valid expression
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _getSummaryExpressionFilteredValue: function (replaceValueArr) {
      var i, expressionValue, regExp;
      expressionValue = this._editorObj.value;
      for (i = 0; i < replaceValueArr.length; i++) {
        regExp = new RegExp(replaceValueArr[i].value, 'g');
        expressionValue = expressionValue.replace(regExp,
          replaceValueArr[i].trimmedValue);
      }
      return expressionValue;
    },

    /**
     * This function is used to validate expression on OK button
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    validateExpressionOnOkClick: function () {
      var errObj = this.validateExpression(false);
      return errObj;
    },

    /**
     * This function is used to validate each expressions entry
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _validateExpressionEntry: function (expressionArray) {
      var entryMatched, i, expressionItemArr, j;
      for (i = 0; i < expressionArray.length; i++) {
        expressionItemArr = expressionArray[i].split(":");
        for (j = 0; j < expressionItemArr.length; j++) {
          if (j === 0) {
            entryMatched = this._validateInputOutputEntry(
              expressionItemArr[0]);
            if (!entryMatched) {
              return false;
            }
          } else if (j === 1 && expressionItemArr.length === 2) {
            entryMatched = this._validateInputOutputOperatorEntry(
              expressionItemArr[0], expressionItemArr[1]);
            if (!entryMatched) {
              return false;
            }
          } else if (j === 1 && expressionItemArr.length === 3) {
            entryMatched = this._validateFieldEntry(expressionItemArr[
              0], expressionItemArr[1]);
            if (!entryMatched) {
              return false;
            }
          } else if (j === 2 && expressionItemArr.length === 3) {
            entryMatched = this._validateFieldOperatorEntry(
              expressionItemArr[2]);
            if (!entryMatched) {
              return false;
            }
          }
        }
      }
      return true;
    },

    /**
     * This function is used to validate each expressions input & output entry
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _validateInputOutputEntry: function (expressionItem) {
      var i, entryMatched;
      entryMatched = false;
      for (i = 0; i < this.inputParametersArray.length; i++) {
        if (expressionItem === this.inputParametersArray[i].name) {
          entryMatched = true;
        }
      }
      for (i = 0; i < this.outputParametersArray.length; i++) {
        if (expressionItem === this.outputParametersArray[i].name) {
          entryMatched = true;
        }
      }
      return entryMatched;
    },

    /**
     * This function is used to validate each expressions input & output operator entry
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _validateInputOutputOperatorEntry: function (inputOutputEntry,
      expressionItem) {
      var i, entryMatched;
      entryMatched = false;
      this._outputLayerSettingsArr = [];
      this._outputLayerSettingsArr = this.getOutputSettings();
      for (i = 0; i < this._outputLayerSettingsArr.length; i++) {
        if (this._outputLayerSettingsArr[i].paramName ===
          inputOutputEntry) {
          if (expressionItem === this.nls.summaryTab.outputOperatorCountOption) {
            entryMatched = true;
          }
          break;
        }
      }
      if (!entryMatched) {
        for (i = 0; i < this.inputParametersArray.length; i++) {
          if (this.inputParametersArray[i].name === inputOutputEntry) {
            if (expressionItem === this.nls.summaryTab.inputOperatorCountOption) {
              entryMatched = true;
            }
            break;
          }
        }
      }
      return entryMatched;
    },

    /**
     * This function is used to validate each expressions field entry
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _validateFieldEntry: function (layerName, fieldName) {
      var entryMatched = false;
      for (var i = 0; i < this._inputOutputParamArray.length; i++) {
        if (layerName === this._inputOutputParamArray[i].name) {
          for (var j = 0; j < this._inputOutputParamArray[i].defaultValue
            .fields.length; j++) {
            if (fieldName === this._inputOutputParamArray[i].defaultValue
              .fields[j].name) {
              entryMatched = true;
            }
          }
        }
      }
      return entryMatched;
    },

    /**
     * This function is used to validate each expressions field operator entry
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    _validateFieldOperatorEntry: function (expressionItem) {
      var entryMatched = false;
      if ((expressionItem === this.nls.summaryTab.fieldOperatorSumOption) ||
        (expressionItem === this.nls.summaryTab.fieldOperatorMinOption) ||
        (expressionItem === this.nls.summaryTab.fieldOperatorMaxOption) ||
        (expressionItem === this.nls.summaryTab.fieldOperatorMeanOption)
      ) {
        entryMatched = true;
      }
      return entryMatched;
    },

    /**
     * This function is used to validate expression on click of OK/Verify button
     * @memberOf widgets/NetworkTrace/settings/summarySettings
     **/
    validateExpression: function (isVerifyBtnClicked) {
      var expression, expressionArray, trimmedString,
        validExp;
      expressionArray = [];
      expression = this._editorObj.value;
      if ((expression !== "") && (expression !== null) && (
        expressionArray.length === 0)) {
        expression.replace(/\{(.+?)\}/g, function (_, m) { // jshint ignore:line
          trimmedString = m.replace(/\s/g, "");
          expressionArray.push(trimmedString);
        });
        validExp = true;
      } else {
        validExp = true;
      }
      if (expressionArray.length > 0) {
        validExp = this._validateExpressionEntry(expressionArray);
      }
      if (expression.indexOf("{}") !== -1) {
        validExp = false;
      }
      if (validExp === true) {
        if (isVerifyBtnClicked) {
          this._errorMessage(this.nls.validationErrorMessage.validSummaryExpression);
        } else {
          return {
            returnErr: "",
            returnFlag: false
          };
        }
      } else {
        if (isVerifyBtnClicked) {
          this._errorMessage(this.nls.validationErrorMessage.invalidSummaryExpression);
        } else {
          return {
            returnErr: this.nls.validationErrorMessage.invalidSummaryExpression,
            returnFlag: true
          };
        }
      }
    },

    onProjectSettingsChanged: function (projectSettings) {
      if (this._outputTable !== '' && this._outputTable !== null && this._outputTable !== undefined) {
        array.forEach(this._outputTable.getRows(), lang.hitch(this, function (currentRow) {
          var disable = true;
          //if valid project settings then only enable all layerSelectors
          if (projectSettings && projectSettings.polygonLayerId &&
            projectSettings.pointLayerId &&
            projectSettings.outputParamName) {
            //disable only result param layer selector
            //and enable all other selectors
            disable = false;
            if (currentRow.config.paramName === projectSettings.outputParamName) {
              disable = true;
            }
          }
          if (currentRow) {
            currentRow.layerSelector.set("disabled", disable);
          }
        }));
      }
    },

    _createOutputTable: function () {
      var fields2, args2;
      fields2 = [{
        name: 'visibility',
        title: this.nls.summaryTab.visibilityText,
        type: 'checkbox',
        width: '10%'
      }, {
        name: 'displayName',
        title: this.nls.summaryTab.outputParametersText,
        type: 'text',
        width: '20%'
      }, {
        name: 'saveToLayer',
        title: "",
        type: 'empty',
        width: '26%'
      },
      {
        name: 'skipable',
        title: this.nls.summaryTab.skipText,
        type: 'checkbox',
        width: '12%'
      }, {
        name: 'exportToCSV',
        title: this.nls.summaryTab.exportToCsvText,
        type: 'checkbox',
        width: '12%'
      },
      {
        name: 'symbol',
        title: this.nls.summaryTab.symbol,
        type: 'empty',
        width: '10%'
      },
      {
        name: 'settings',
        title: this.nls.summaryTab.settitngstext,
        type: 'empty',
        width: '10%'
      }
      ];
      args2 = {
        fields: fields2,
        selectable: false
      };
      this._outputTable = new Table(args2);
      this._outputTable.placeAt(this.outputTableNode);
      this._outputTable.startup();
      this._addSaveToLayerMainDiv();
      this._addHelpIconToHeader();
      this.setOutputSettings();
      //on load enable/disable layer selectors based on projectsettings
      this.onProjectSettingsChanged(this.projectSettings);
    },

    /**
     * This function is used to add save to layer main div
     */
    _addSaveToLayerMainDiv: function () {

      var tableColumns, saveToLayerTableHeaderNode;
      tableColumns = query(".simple-table-thead tr", this.domNode);
      if (tableColumns !== '' && tableColumns !== null && tableColumns !== undefined) {
        if (tableColumns.length > 0) {
          tableColumns = tableColumns[0];
        }
      }
      if (tableColumns) {

        saveToLayerTableHeaderNode = tableColumns.children[2];
        if (saveToLayerTableHeaderNode) {

          var saveToLayerMainDiv = domConstruct.create('div', {
            'class': 'esriCTSaveToLayerMainDiv'
          }, saveToLayerTableHeaderNode);
          domConstruct.create('div', {
            'class': 'esriCTSaveToLayerLabelDiv',
            'innerHTML': this.nls.summaryTab.saveToLayerText,
            'title': this.nls.summaryTab.saveToLayerText
          }, saveToLayerMainDiv);
        }
      }
    },

    /**
     * This function is show help dialog popup
     */
    _addHelpIconToHeader: function () {
      var tableColumns, saveToLayerHelpNode, saveToLayerHelp, exportToCSVNode, checkBoxWidget;
      tableColumns = query(".simple-table-thead tr", this.domNode);
      if (tableColumns !== '' && tableColumns !== null && tableColumns !== undefined) {
        if (tableColumns.length > 0) {
          tableColumns = tableColumns[0];
        }
      }
      //If table exist, find nodes for adding help icons
      if (tableColumns) {
        saveToLayerHelpNode = tableColumns.children[2];
        saveToLayerHelpNode = saveToLayerHelpNode.childNodes[0];
        if (tableColumns.children[4]) {
          exportToCSVNode = tableColumns.children[4];
        }
      }
      // fetch the node of export to csv
      if (exportToCSVNode && exportToCSVNode.childNodes && exportToCSVNode.childNodes[0] &&
        exportToCSVNode.childNodes[0].hasAttribute("id")) {
        // fetch the checkbox of export to csv
        checkBoxWidget = registry.byId(exportToCSVNode.childNodes[0].id);
        if (checkBoxWidget) {
          // set the label if checkbox is available
          checkBoxWidget.setLabel(this.nls.summaryTab.exportToCsvDisplayText);
          // need to re-set the title, as setlabel function sets both the title & label
          if (checkBoxWidget.domNode && checkBoxWidget.domNode.children && checkBoxWidget.domNode.children[1]) {
            domAttr.set(checkBoxWidget.domNode.children[1], "title", this.nls.summaryTab.exportToCsvText);
          }
        }
      }
      //Create nodes for help icon
      saveToLayerHelp = domConstruct.create("div", {
        "class": "esriCTSaveTolayerHelpIcon"
      }, saveToLayerHelpNode);
      //Bind events
      on(saveToLayerHelp, "click", lang.hitch(this, function () {
        new Message({
          message: this.nls.summaryTab.saveToLayerHelp
        });
      }));
    },

    setOutputSettings: function () {
      if (this.outputConfig && this.outputConfig.length > 0) {
        array.forEach(this.outputConfig, lang.hitch(this, function (outputInfo) {
          var fieldsColumn, row, skipableCol;
          row = this._outputTable.addRow(outputInfo);
          fieldsColumn = query('.simple-table-cell', row.tr);
          row.tr.config = outputInfo;
          //disable skipable checkbox for output with geometryType other than point
          //or if the skipLocation input is not availbel in service
          if (outputInfo.data.defaultValue.geometryType !== "esriGeometryPoint" || !this.hasSkipLocationsInput) {
            skipableCol = query(".skipable", row.tr);
            array.forEach(skipableCol, function (node) {
              var widget = registry.getEnclosingWidget(node.childNodes[0]);
              widget.setValue(false);
              widget.setStatus(false);
            });
          }
          if (fieldsColumn) {
            this._addSaveToLayerDropDown(fieldsColumn[2], row.tr);
            //add symbol picker in col
            this._addSymbolPicker(fieldsColumn[5], row.tr, outputInfo);
            //add settings icon in cal
            this._addSettingsIcon(fieldsColumn[6], row.tr);
          }
        }));
      }
    },

    _addSaveToLayerDropDown: function (column, tr) {
      var selectParent, layerOptions, layerSelector;
      selectParent = domConstruct.create("div", {
        "class": "esriCTDropDownContainer"
      }, column);
      //get options based on geometry type
      layerOptions = this._createSaveToLayerOptions(tr.config.data.defaultValue.geometryType);
      //create layer selector using options
      layerSelector = new Select({
        options: layerOptions,
        "class": "esriCTLayerFieldSelector"
      });
      //place layer selector in table
      layerSelector.placeAt(selectParent);
      layerSelector.startup();
      tr.layerSelector = layerSelector;
      //if has prev selected value show it in selector
      if (tr.config && tr.config.saveToLayer) {
        layerSelector.set("value", tr.config.saveToLayer);
      }
    },

    _addSettingsIcon: function (fieldsColumn, tr) {
      var tolreanceParent, toleranceSettingIcon;
      tolreanceParent = domConstruct.create("div", {}, fieldsColumn);
      toleranceSettingIcon = domConstruct.create("div", {
        "class": "esriCTToleranceSettingsIcon",
        "title": this.nls.summaryTab.settitngstext
      }, domConstruct.create("div", {}, tolreanceParent));
      this.own(on(toleranceSettingIcon, "click", lang.hitch(this, function () {
        this._createOutputPanel(tr);
      })));
    },

    _createSaveToLayerOptions: function (geometryType) {
      var n, operationalLayers, saveToLayerOptions = [];
      //add deafult select option
      saveToLayerOptions.push({
        "value": "",
        "label": this.nls.projectSetting.selectLabel
      });
      // save to Layer type Dropdown
      if (this.map && this.map.itemInfo && this.map.itemInfo.itemData &&
        this.map.itemInfo.itemData.operationalLayers) {
        operationalLayers = this.map.itemInfo.itemData.operationalLayers;
        // loop's populates Dropdown values
        for (n = 0; n < operationalLayers.length; n++) {
          var option;
          // if layer type is feature Layer then
          if (operationalLayers[n] && operationalLayers[n].layerObject &&
            operationalLayers[n].layerType && operationalLayers[n].layerType ===
            "ArcGISFeatureLayer" &&
            operationalLayers[n].layerObject.fields &&
            geometryType === operationalLayers[n].layerObject.geometryType &&
            this._validateLayerCapabilities(operationalLayers[n].layerObject)) {
            var validFields = this._validateLayerFields(operationalLayers[n].layerObject.fields);
            if (validFields) {
              option = {
                "value": operationalLayers[n].id,
                "layerId": operationalLayers[n].id,
                "guidField": validFields.projectidField,
                "parameterNameField": validFields.parameterNameField,
                "label": operationalLayers[n].title
              };
              saveToLayerOptions.push(option);
            }

          }
        }
      }
      return saveToLayerOptions;
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
     * This function creates left title pane menu and binds the respective click events.
     * @memberOf widgets/isolation-trace/settings/outputSetting
     */
    _createOutputPanel: function (tr) {
      var parentContainer, title = "";
      title = tr.config.displayName;
      parentContainer = domConstruct.create("div");
      var parameterDiv = domConstruct.create("div", {
        "class": "ParameterDiv esriCTtaskDataContainer",
        style: {
          "max-height": "395px"
        }
      }, parentContainer);
      var sectionDiv = domConstruct.create("div", {
        "class": "section common-property"
      }, parameterDiv);
      //Label
      var labelParent = domConstruct.create("div", {
        "class": "field esriCTOutputOutageField",
        title: this.nls.summaryTab.inputLabel
      }, sectionDiv);
      domConstruct.create("label", {
        innerHTML: this.nls.summaryTab.inputLabel,
        title: this.nls.summaryTab.inputLabel
      }, labelParent);
      this.labelTextbox = new ValidationTextBox({
        required: true,
        "class": "common-input esriCTLabelClass"
      }, domConstruct.create("div", {}, labelParent));
      this.labelTextbox.set("value", tr.config.panelText);
      domConstruct.create("div", {
        "class": "esriCTHintField",
        "innerHTML": this.nls.hintText.labelTextHint
      }, labelParent);
      //Tooltip
      var tooltipParent = domConstruct.create("div", {
        "class": "field esriCTOutputOutageField",
        title: this.nls.summaryTab.inputTooltip
      }, sectionDiv);
      domConstruct.create("label", {
        innerHTML: this.nls.summaryTab.inputTooltip,
        title: this.nls.summaryTab.inputTooltip
      }, tooltipParent);
      this.tooltipTextbox = new ValidationTextBox({
        "class": "common-input esriCTTooltipDataClass"
      }, domConstruct.create("div", {}, tooltipParent));
      this.tooltipTextbox.set("value", tr.config.toolTip);
      //Display Text
      var displayParent = domConstruct.create("div", {
        "class": "field esriCTOutputOutageField",
        title: this.nls.summaryTab.outputDisplay
      }, sectionDiv);
      domConstruct.create("label", {
        innerHTML: this.nls.summaryTab.outputDisplay,
        title: this.nls.summaryTab.outputDisplay
      }, displayParent);
      var descriptionParent = domConstruct.create("div", {
        "class": "edit-description-box"
      }, displayParent);
      var addFieldConatiner = domConstruct.create("div", {
        "class": "esriCTAddFieldContainer",
        "title": this.nls.summaryTab.addFieldTitle
      }, descriptionParent);
      this.editorDescription = domConstruct.create("div", {}, descriptionParent);
      domConstruct.create("div", {
        "class": "esriCTHintField",
        "innerHTML": this.nls.hintText.displayTextHint
      }, displayParent);
      this._initSymbolSelectionEditor();
      var fieldsArray = tr.config.data.defaultValue.fields;
      this._createFieldSelector(addFieldConatiner, this._editorObjSymbolSelector, fieldsArray);
      this._editorObjSymbolSelector.set("value", tr.config.displayText);
      var scaleParent = domConstruct.create("div", {
        "class": "field esriCTOutputOutageField",
        title: this.nls.summaryTab.setScale
      }, sectionDiv);
      domConstruct.create("label", {
        innerHTML: this.nls.summaryTab.setScale,
        title: this.nls.summaryTab.setScale
      }, scaleParent);
      var saveToLayerInfo = this._getSaveToLayerInfo(tr.layerSelector);
      var horizantalSliderContainer = new domConstruct.create("div", {
        "class": "esriCTSliderContainer"
      }, scaleParent);
      this._createSlider(horizantalSliderContainer, tr.config, saveToLayerInfo);
      var fieldsPopup = new Popup({
        titleLabel: title,
        width: 875,
        maxHeight: 800,
        autoHeight: true,
        content: parentContainer,
        'class': this.baseClass,
        buttons: [{
          label: this.nls.common.ok,
          onClick: lang.hitch(this, function () {
            //validate if label is valid
            if (!this.labelTextbox.isValid()) {
              this.labelTextbox.focus();
              return;
            }
            tr.config.panelText = this.labelTextbox.get("value");
            tr.config.toolTip = this.tooltipTextbox.get("value");
            tr.config.displayText = this._editorObjSymbolSelector.get("value");
            tr.config.MinScale = this._visibleScaleRangeSlider.minScale;
            tr.config.MaxScale = this._visibleScaleRangeSlider.maxScale;
            this._destroyEditorWidget();
            fieldsPopup.close();
          })
        }, {
          label: this.nls.common.cancel,
          classNames: ['jimu-btn-vacation'],
          onClick: lang.hitch(this, function () {
            this._destroyEditorWidget();
            fieldsPopup.close();
          })
        }],
        onClose: lang.hitch(this, function () {
          this._destroyEditorWidget();
        })
      });
    },

    _initSymbolSelectionEditor: function () {
      //load plugin css only once
      if (!this._loadedPluginCSS) {
        this._loadedPluginCSS = true;
        this._initEditorPluginsCSS();
      }
      this._editorObjSymbolSelector = new Editor({
        plugins: [
          'bold', 'italic', 'underline',
          utils.getEditorTextColor("networkTrace"),
          utils.getEditorBackgroundColor("networkTrace"),
          '|', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
          '|', 'insertOrderedList', 'insertUnorderedList', 'indent', 'outdent'
        ],
        extraPlugins: [
          '|', 'createLink', 'unlink', 'pastefromword', '|', 'undo', 'redo',
          '|', 'toolbarlinebreak',
          {
            name: "dijit._editor.plugins.FontChoice",
            command: "fontName",
            custom: "Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".
              split(";")
          }, 'fontSize', 'formatBlock'
        ],
        style: "font-family:Verdana;"
      }, this.editorDescription);
      domStyle.set(this._editorObjSymbolSelector.domNode, {
        "width": '100%',
        "height": '100%'
      });
      this._editorObjSymbolSelector.startup();
      if (has('ie') !== 8) {
        this._editorObjSymbolSelector.resize({
          w: '100%',
          h: '100%'
        });
      } else {
        var box = html.getMarginBox(this.editorDescription);
        this._editorObjSymbolSelector.resize({
          w: box.w,
          h: box.h
        });
      }
      this.own(on(this._editorObjSymbolSelector, "focus", lang.hitch(this, function () {
        if (this._editorObjSymbolSelector.get("value") === this.nls.summaryTab.enterDisplayText) {
          this._editorObjSymbolSelector.set("value", "");
        }
      })));
    },

    /**
     * This function the creates FieldSelector for respective fields
     * @param {string} container FieldSelector container Node
     * @param {string} textNode FieldSelector text content Node
     * @param {array} fieldsArray array of field selector values
     * @memberOf widgets/RelatedTableCharts/setting/ChartSetting
     **/
    _createFieldSelector: function (container, textNode, fieldsArray) {
      var fieldSelector = new FieldSelector({
        "fields": fieldsArray,
        "showOnlyNumericFields": false,
        "skipObjectIdField": true,
        "hideOnSelect": true
      }, domConstruct.create("div", {}, container));
      fieldSelector.onSelect = lang.hitch(this, function (sectedField) {
        var newLabel;
        if (textNode.get("value") === this.nls.summaryTab.enterDisplayText) {
          textNode.set("value", "");
        }
        newLabel = textNode.get("value") + "{" + sectedField.name + "}";
        if (textNode.set) {
          textNode.set("value", newLabel);
        }
      });
    },

    _getSaveToLayerInfo: function (layerSelector) {
      var info = {
        "saveToLayerId": "",
        "guidField": "",
        "parameterNameField": ""
      };
      var selectedInfo;
      if (layerSelector && layerSelector.get("value")) {
        selectedInfo = layerSelector._getSelectedOptionsAttr();
        info.saveToLayerId = selectedInfo.layerId;
        info.guidField = selectedInfo.guidField;
        info.parameterNameField = selectedInfo.parameterNameField;
      }
      return info;
    },

    _createSlider: function (node, config, saveToLayerInfo) {
      var layer;
      if (saveToLayerInfo && saveToLayerInfo.saveToLayerId &&
        config.MinScale === 0 && config.MaxScale === 0) {
        layer = this.map.getLayer(saveToLayerInfo.saveToLayerId);
        this._visibleScaleRangeSlider = new VisibleScaleRangeSlider({
          map: this.map,
          layer: layer
        }, domConstruct.create("div", {}, node));
      } else {
        this._visibleScaleRangeSlider = new VisibleScaleRangeSlider({
          map: this.map
        }, domConstruct.create("div", {}, node));
        this._visibleScaleRangeSlider.set("minScale", config.MinScale);
        this._visibleScaleRangeSlider.set("maxScale", config.MaxScale);
      }
      this._visibleScaleRangeSlider.startup();
    },

    /**
     * This function is used to destroy editor widget on close/ok/cancel click of popup.
     * If not destroyed, if throws an console error in the firefox and popup does not open
     * on second click of gear icon.
     */
    _destroyEditorWidget: function () {
      if (this._editorObjSymbolSelector) {
        this._editorObjSymbolSelector.destroy();
        this._editorObjSymbolSelector = null;
      }
    },

    _validateLayerCapabilities: function (layerobj) {
      var layerCapabilities;
      if (layerobj && layerobj.getEditCapabilities) {
        layerCapabilities = layerobj.getEditCapabilities();
        if (layerCapabilities.canCreate && layerCapabilities.canUpdate &&
          layerCapabilities.canDelete) {
          return true;
        }
      }
      return false;
    },

    _validateLayerFields: function (fields) {
      /**
       * Required Fields:
       * projectid (Guid type field)
       * parametername (String type field)
       */
      var hasParameterField, hasGUIDField, validFields;
      validFields = {
        "projectidField": null,
        "parameterNameField": null
      };
      hasParameterField = false;
      hasGUIDField = false;
      //loop through all fields and return if both the fields are found or not
      array.some(fields, function (field) {
        //check if GUID field is preset
        if (field.type === "esriFieldTypeGUID" && field.editable &&
          field.name.toLowerCase() === "projectid") {
          validFields.projectidField = field.name;
          hasGUIDField = true;
        }
        //Check if String field for parameter name is present
        if (field.type === "esriFieldTypeString" && field.editable &&
          field.name.toLowerCase() === "parametername") {
          validFields.parameterNameField = field.name;
          hasParameterField = true;
        }
        if (hasParameterField && hasGUIDField) {
          return true;
        }
      });
      if (!hasParameterField || !hasGUIDField) {
        validFields = null;
      }
      return validFields;
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

    getOutputSettings: function () {
      var outputs = [];
      array.forEach(this._outputTable.getRows(), lang.hitch(this, function (currentRow) {
        var outputInfo = {},
          rowData, saveToLayerInfo;
        if (currentRow) {
          rowData = this._outputTable.getRowData(currentRow);
          //get save to layer & field options
          saveToLayerInfo = this._getSaveToLayerInfo(currentRow.layerSelector);
          outputInfo = {
            "visibility": rowData.visibility,
            "paramName": currentRow.config.paramName,
            "type": "Result",
            "panelText": currentRow.config.panelText,
            "toolTip": currentRow.config.toolTip,
            "displayName": rowData.displayName,
            "displayText": currentRow.config.displayText,
            "MinScale": currentRow.config.MinScale,
            "MaxScale": currentRow.config.MaxScale,
            "exportToCSV": rowData.exportToCSV,
            "saveToLayer": saveToLayerInfo.saveToLayerId,
            "guidField": saveToLayerInfo.guidField,
            "parameternameField": saveToLayerInfo.parameterNameField,
            "symbol": currentRow.symbol
          };
          outputInfo.bypassDetails = {
            "skipable": rowData.skipable
          };
          outputs.push(outputInfo);
        }
      }));
      return outputs;
    },

    /**
     * This function loads the editor tool plugins CSS
     **/
    _initEditorPluginsCSS: function () {
      var head, tcCssHref, tcCss, epCssHref, epCss, pfCssHref, pfCss;
      head = document.getElementsByTagName('head')[0];
      tcCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/TextColor.css";
      tcCss = query('link[href="' + tcCssHref + '"]', head)[0];
      if (!tcCss) {
        utils.loadStyleLink("editor_plugins_resources_TextColor", tcCssHref);
      }
      epCssHref = window.apiUrl + "dojox/editor/plugins/resources/editorPlugins.css";
      epCss = query('link[href="' + epCssHref + '"]', head)[0];
      if (!epCss) {
        utils.loadStyleLink("editor_plugins_resources_editorPlugins", epCssHref);
      }
      pfCssHref = window.apiUrl + "dojox/editor/plugins/resources/css/PasteFromWord.css";
      pfCss = query('link[href="' + pfCssHref + '"]', head)[0];
      if (!pfCss) {
        utils.loadStyleLink("editor_plugins_resources_PasteFromWord", pfCssHref);
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
    }
  });
});