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
  'dojo/_base/html',
  'dojo/on',
  'dojo/when',
  'dojo/query',
  'dojo/_base/array',
  'dojo/dom-style',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/Deferred',
  'dojo/DeferredList',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/form/Select',
  'jimu/dijit/TabContainer3',
  'jimu/BaseWidgetSetting',
  'jimu/dijit/SimpleTable',
  'jimu/LayerInfos/LayerInfos',
  'jimu/dijit/Message',
  'jimu/dijit/CheckBox',
  'dojo/sniff',
  'dijit/Editor',
  'jimu/utils',
  'jimu/dijit/LayerChooserFromMapWithDropbox',
  'esri/symbols/jsonUtils',
  'esri/request',
  '../locatorUtils',
  './EditablePointFeatureLayerChooserFromMap',
  './EditFields',
  './ChooseLayer',
  './LocatorSourceSetting',
  'jimu/dijit/SymbolPicker',
  'jimu/dijit/EditorXssFilter',
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
  'jimu/dijit/EditorBackgroundColor',
  "jimu/dijit/CheckBox",
  "dojo/domReady!"
],
  function (
    declare,
    lang,
    html,
    on,
    when,
    query,
    array,
    domStyle,
    domConstruct,
    domClass,
    domAttr,
    Deferred,
    DeferredList,
    _WidgetsInTemplateMixin,
    Select,
    TabContainer3,
    BaseWidgetSetting,
    SimpleTable,
    LayerInfos,
    Message,
    CheckBox,
    has,
    Editor,
    utils,
    LayerChooserFromMapSelect,
    jsonUtils,
    esriRequest,
    _utils,
    EditablePointFeatureLayerChooserFromMap,
    EditFields,
    ChooseLayer,
    LocatorSourceSetting,
    SymbolPicker,
    EditorXssFilter) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-setting-critical-facilities',

      //TODO figure out what's up with the css for all SimpleTable instances with the rows. I handled in some way for IS but it was not correct

      //Questions
      //TODO should we support an option for configure user to mark certain fields as required?
      operLayerInfos: null,
      jimuLayerInfo: null,
      jimuLayerObject: null,
      layerInfo: null,

      postMixInProperties: function () {
        this.inherited(arguments);
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
      },

      postCreate: function () {
        this.inherited(arguments);
        this.editorXssFilter = EditorXssFilter.getInstance();
        if (!(this.config && this.config.sources)) {
          this.config.sources = [];
        }
        this._initTabs();
        this.own(on(this.btnAddTargetLayerNode, 'click', lang.hitch(this, this._addTargetBtnClicked)));
      },

      startup: function () {
        this.inherited(arguments);
        //init all editors and its css
        this._initEditorPluginsCSS();

        this._introductionMessagetEditor = this._initEditor(this.editorDescription);
        LayerInfos.getInstance(this.map, this.map.itemInfo).then(lang.hitch(this, function (infos) {
          this.operLayerInfos = infos;
          this._initUI();
          _utils.setMap(this.map);
          _utils.setAppConfig(this.appConfig);
          _utils.setDefaultXYFields(this.config.defaultXYFields);
          when(_utils.getConfigInfo(this.config)).then(lang.hitch(this, function (config) {
            if (!this.domNode) {
              return;
            }
            this.setConfig(config);
          }));
        }));
      },

      _initUI: function () {
        this._initLayerOptions();
        this._initLocationOptions();
      },

      _getText: function (editorObj) {
        var editorText;
        editorText = editorObj.focusNode.innerHTML;
        return editorText;
      },

      /**
        * This function the initializes jimu tab for setting and layout
        * @memberOf widgets/DataAggregation/setting/Setting
        **/
      _initTabs: function () {
        var targetLayerTab, locationSettingsTab, generalSettingsTab, tabs;
        targetLayerTab = {
          title: this.nls.targetLayerTabTitle,
          content: this.targetLayerTabNode
        };
        locationSettingsTab = {
          title: this.nls.locationSettingsTabTitle,
          content: this.locationSettingsTabNode
        };
        generalSettingsTab = {
          title: this.nls.generalSettingsTabTitle,
          content: this.generalSettingsTabNode
        };
        tabs = [targetLayerTab, locationSettingsTab, generalSettingsTab];

        this.tab = new TabContainer3({
          "tabs": tabs,
          "class": "esriCTFullHeight"
        });
        // Handle tabChanged event and set the scroll position to top
        this.own(on(this.tab, "tabChanged", lang.hitch(this, function () {
          this.tab.containerNode.scrollTop = 0;
        })));
        this.tab.placeAt(this.tabDiv);
      },

      /**
       * This function will enable/disable the add target layer button 
       * based on if any valid layer can be added or not
       */
      _updateAddLayerButtonState: function () {
        var layerChooserFromMap = new EditablePointFeatureLayerChooserFromMap({
          multiple: false,
          showLayerFromFeatureSet: false,
          showTable: false,
          onlyShowVisible: false,
          createMapResponse: this.map.webMapResponse,
          skipLayerIds: this._getSelectedLayerIds()
        });
        var allRemainingLayers = layerChooserFromMap.getAllItems();
        if (allRemainingLayers.length === 0) {
          domClass.add(this.btnAddTargetLayerNode, "esriCTDisabledTargetLayerButton");
          //if no layers in the list and also cannot add any layer, it means no valid layer in webmap
          //in this case show error message in configuration panel
          if (this.layerList && this.layerList.getRows().length === 0) {
            domClass.remove(this.noValidLayerWarningNode, "esriCTHidden");
          }
        } else {
          domClass.remove(this.btnAddTargetLayerNode, "esriCTDisabledTargetLayerButton");
        }
      },

      /**
     * This function is used to click on add target layer button
     * @memberOf widgets/DataAggregation/setting/Setting
     **/
      _addTargetBtnClicked: function () {
        //if button is in disabled state don't perform any operation
        if(domClass.contains(this.btnAddTargetLayerNode, "esriCTDisabledTargetLayerButton")){
          return;
        }
        var layerChooserFromMap = new EditablePointFeatureLayerChooserFromMap({
          multiple: false,
          showLayerFromFeatureSet: false,
          showTable: false,
          onlyShowVisible: false,
          createMapResponse: this.map.webMapResponse,
          skipLayerIds: this._getSelectedLayerIds()
        });
        if (layerChooserFromMap.getAllItems().length === 0) {
          this._errorMessage(this.nls.needsEditablePointLayers);
          return;
        } else {
          var chooseLayer = new ChooseLayer({
            nls: this.nls,
            map: this.map,
            config: {},
            layerChooserFromMap: layerChooserFromMap
          });
          this.own(on(chooseLayer, "layerSelected", lang.hitch(this, function(selectedLayerInfo){
            var tr = this._addLayerRow();
            selectedLayerInfo.getLayerObject().then(lang.hitch(this, function (layer) {
              tr.layerChooserSelect.setSelectedLayer(layer);
               //show selected layer name in table
               var layerTd = query('.simple-table-cell', tr)[0];
               domAttr.set(layerTd, "innerHTML", layer.name);
               domAttr.set(layerTd, "title", layer.name);
            }));
            //after adding layer update the add button state, if more layers can be added or not
            this._updateAddLayerButtonState();
          })));
        }
      },

      /**
       * This function will return array of layers which are added as target layer.
       */
      _getSelectedLayerIds: function () {
        var selectedLayerIds = [], layerRows;
        if (this.layerList) {
          layerRows = this.layerList.getRows();
          array.forEach(layerRows, lang.hitch(this, function (tr) {
            if (tr.layerInfo && tr.layerInfo.featureLayer && tr.layerInfo.featureLayer.id) {
              selectedLayerIds.push(tr.layerInfo.featureLayer.id);
            }
          }));
        }
        return selectedLayerIds;
      },

      _initLayerOptions: function () {
        this.layerList = new SimpleTable({
          autoHeight: true,
          selectable: false,
          fields: [{
            name: "layer",
            title: this.nls.layerFieldTitle,
            width: "40%",
            type: "empty",
            editable: true
          }, {
            name: "symbol",
            title: this.nls.tempSymbolTitle,
            width: "40%",
            type: "empty",
            editable: true
          }, {
            name: "actions",
            title: this.nls.layerFields,
            width: "20%",
            type: "actions",
            actions: ['up', 'down', 'delete', 'edit']
          }]
        }, this.layerList);
        this.layerList.placeAt(this.layerListNode);
        this.own(on(this.layerList, 'actions-edit', lang.hitch(this, function (tr) {
          this._onLayerEditFieldsClick(tr)
        })));
        this.own(on(this.layerList, 'row-delete', lang.hitch(this, this._updateAddLayerButtonState)));
        this.layerList.startup();
        var tableBody = query('.body-section', this.layerListNode)[0];
        var headers = query("th.simple-table-field", this.layerListNode);
        var nls = this.nls;
        headers.forEach(function (n) {
          n.title = n.innerHTML === nls.layerFieldTitle ?
            nls.layerFieldsHint : nls.tempSymbolHint ?
              nls.layerOptionHint : n.innerHTML === nls.layerFields;
        });
      },

      _addLayerRow: function (addingFromButton) {
        var tr, result = this.layerList.addRow({});
        if (result.success && result.tr) {
          tr = result.tr;
          this._createLayerChooserSelect(tr, addingFromButton);
          this._initSymbolPicker(tr);
          this._initLayerFieldsEdit(tr);
        }
        return tr;
      },

      _createLayerChooserSelect: function (tr, addingFromButton) {
        var layerChooserSelect, layerTd = query('.simple-table-cell', tr)[0];
        //Create point layer chooser
        var layerChooserFromMap = new EditablePointFeatureLayerChooserFromMap({
          multiple: false,
          showLayerFromFeatureSet: false,
          showTable: false,
          onlyShowVisible: false,
          createMapResponse: this.map.webMapResponse
        });
        if (layerChooserFromMap.errorTipSection && layerChooserFromMap.errorTipSection.style) {
          domStyle.set(layerChooserFromMap.errorTipSection, 'display', 'none');
        }
        layerChooserFromMap.startup();
        domClass.add(layerTd, 'layer-select-node');
        //create layer chooser select
        layerChooserSelect = new LayerChooserFromMapSelect({
          layerChooser: layerChooserFromMap
        });
        layerChooserSelect.startup();
        //add layer select to individual row object 
        tr.layerChooserSelect = layerChooserSelect;
        //on layer change
        this.own(on(layerChooserSelect, 'selection-change', lang.hitch(this, function () {
          this._onLayerChanged(tr)
        })));

        var editLayers = layerChooserFromMap.getAllItems();
        //TODO: remove ok button disable logic
        if (editLayers.length === 0) {
          var d = query('.action-item', this.layerList.domNode)[0];
          this._toggleNode(d, false, 'jimu-state-disabled', 'jimu-icon-edit');
          this._validLayer = false;
          this._updateOk();
          this._showMessage(this.nls.needsEditablePointLayers);
        } else if (addingFromButton && editLayers.length > 0 && editLayers[0].layerInfo) {
          layerChooserSelect.setSelectedLayer(editLayers[0].layerInfo);
        }
      },

      _initLayerFieldsEdit: function (tr) {
        var editTd = query('.simple-table-cell', tr)[2];
        domStyle.set(editTd, 'vertical-align', 'top');
        domStyle.set(editTd, 'padding-top', '7px');

        if (editTd) {
          tr.editLayerFields = domConstruct.create("div", {
            class: "esriCTErrorNodeContainer"
          }, editTd);
          domConstruct.create("span", {
            'class': "jimu-icon jimu-icon-error layer-fields-edit-error esriCTEditActionButton",
            title: this.nls.noFields
          }, tr.editLayerFields);
        }
        tr._editAction = query('.action-item', this.layerList.domNode)[0];
      },

      _initLocationOptions: function () {
        this.sourceList = new SimpleTable({
          autoHeight: false,
          selectable: true,
          fields: [{
            name: "name",
            title: this.nls.name,
            width: "auto",
            type: "text",
            editable: false
          }, {
            name: "error",
            title: "",
            type: 'extension',
            width: "30px",
            hidden: false,
            create: lang.hitch(this, this._createError),
            setValue: lang.hitch(this, this._setErrorValue),
            getValue: lang.hitch(this, this._getErrorValue)
          }, {
            name: "actions",
            title: "",
            width: "80px",
            type: "actions",
            actions: ["up", "down", "delete"]
          }]
        }, this.sourceList);
        html.setStyle(this.sourceList.domNode, 'height', '100%');
        this._validLocator = false;
        this.sourceList.startup();
        this.own(on(this.sourceList, 'row-select', lang.hitch(this, this._onSourceItemSelected)));
        this.own(on(this.sourceList, 'row-delete', lang.hitch(this, this._onSourceItemRemoved)));

        this.xyEnabled = false;
        this.enableXYField = this._initCheckBox(this.enableXYField, this.nls.enableXYField, this.editXYFields);

        this.own(on(this.editXYFields, 'click', lang.hitch(this, this._onXYEditFieldsClick)));
      },

      _createError: function (td) {
        if (td) {
          var errorSpan = domConstruct.create("span", {
            'class': "jimu-icon jimu-icon-error locator-error display-none"
          }, td);
          td.errorSpan = errorSpan;
        }
      },

      _setErrorValue: function (td, value) {
        if (value) {
          if (domClass.contains(td.errorSpan, 'display-none')) {
            td.errorSpan.title = value;
            domClass.remove(td.errorSpan, 'display-none');
          }
        } else {
          domClass.add(td.errorSpan, 'display-none');
        }
      },

      _getErrorValue: function (td) {
        return td.errorSpan && domClass.contains(td.errorSpan, 'display-none');
      },

      _initCheckBox: function (domNode, nlsValue, editNode) {
        domNode = new CheckBox({
          checked: false,
          label: nlsValue
        }, domNode);
        this._toggleNode(editNode, false, 'edit-fields-disabled', 'edit-fields');
        this.own(on(domNode, 'change', lang.hitch(this, function () {
          var enabled = domNode.getValue();
          this.xyEnabled = enabled;
          this.validateAddressOptions();
          this._toggleNode(editNode, enabled, 'edit-fields-disabled', 'edit-fields');
        })));
        return domNode;
      },

      _initSymbolPicker: function (tr, configuredValue) {
        var symbolPicker, symbolTd;
        if (tr) {
          symbolPicker = new SymbolPicker();
          symbolTd = query('.simple-table-cell', tr)[1];
          symbolPicker.placeAt(symbolTd);
          symbolPicker.startup();
          domClass.add(symbolTd, 'layer-symbol');
          tr.symbolPicker = symbolPicker;
        }
        //if configured value present use it else default it to marker symbol
        if (configuredValue) {
          symbolPicker.showBySymbol(jsonUtils.fromJson(configuredValue.symbol));
        } else {
          symbolPicker.showByType('marker');
        }
      },

      _onLayerChanged: function (tr) {
        var item = tr.layerChooserSelect.getSelectedItem();
        if (!item) {
          this._validLayer = false;
          return;
        }
        this.jimuLayerInfo = item.layerInfo;
        this.jimuLayerObject = item.layerInfo.layerObject;

        var defaultLayerInfo = this._getDefaultLayerInfo(this.jimuLayerObject);
        var configLayerInfo = this._getLayerInfoFromConfiguration(this.jimuLayerObject);

        tr.layerInfo = configLayerInfo || defaultLayerInfo;
        this._validLayer = true;
        this._updateOk();
        this._toggleNode(tr._editAction, true, 'jimu-state-disabled', 'jimu-icon-edit');
        this._validateLayerFields(tr);
      },

      addSelect: function (node, values) {
        node.selectControl = new Select({
          options: values,
          style: "width: 100%;"
        });
        node.selectControl.placeAt(node).startup();
      },

      _toggleNode: function (domNode, enable, disableClass, enableClass) {
        if (domNode) {
          html.removeClass(domNode, enable ? disableClass : enableClass);
          html.addClass(domNode, enable ? enableClass : disableClass);
        }
      },

      _onLayerEditFieldsClick: function (tr) {
        if (tr.layerInfo) {
          var editFields = new EditFields({
            nls: this.nls,
            _layerInfo: tr.layerInfo,
            type: 'fieldInfos'
          });
          this.own(on(editFields, 'edit-fields-popup-ok', lang.hitch(this, function () {
            this._validateLayerFields(tr);
          })));
          editFields.popupEditPage();
        }
      },

      _validateLayerFields: function (tr) {
        var visibleFields = this._getVisibleFields(tr.layerInfo.fieldInfos);
        this._validFields = visibleFields.length > 0;
        this._toggleNode(tr.editLayerFields, this._validFields, 'display-block', 'display-none');
        this._updateOk();
      },

      setConfig: function (config) {
        this.config = config;
        var sources = config.sources;
        var queries = [];
        var content;
        //set configured text for introduction textEditor if configured else set default msg from nls
        if (!this.config.editorDescription) {
          content = this.nls.defaultStartPageInstructions;
        } else {
          content = this.editorXssFilter.sanitize(this.config.editorDescription);
        }
        this._introductionMessagetEditor.set('value', content);
        //set configured sourecs
        array.forEach(sources, lang.hitch(this, function (source, index) {
          var addResult = this.sourceList.addRow({
            name: source.name || ""
          });
          if (addResult && addResult.success) {
            this._setRowConfig(addResult.tr, source);
            if (index === 0) {
              var firstTr = addResult.tr;
              setTimeout(lang.hitch(this, function () {
                this.sourceList.selectRow(addResult.tr);
                firstTr = null;
              }), 100);
            }
            if (source && source.url) {
              queries.push(this._verifyURL(source.url));
            }
          } else {
            console.error("add row failed ", addResult);
          }
        }));
        this.validateAddressOptions();

        var locatorQueryList = new DeferredList(queries);
        locatorQueryList.then(lang.hitch(this, function (queryResults) {
          if (queryResults) {
            for (var i = 0; i < queryResults.length; i++) {
              var qr = queryResults[i][1];
              if (qr && qr.type && qr.type === 'error') {
                //make the locator name text red
                if (this.sourceList) {
                  var rows = this.sourceList.getRows();
                  var tr = rows[i];
                  tr.isDisabled = true;
                  var td = query('.normal-text-div', tr)[0];
                  td.title = this.nls.locatorError;
                  domStyle.set(td, 'color', 'red');
                }
              }
            }
          }
        }));

        //get the config layer if it exists

        var layerSettings = this.config.layerSettings;

        //for backward compatibility only one layer will be present, convert layersettings object to array
        if (layerSettings && layerSettings.layerInfo && layerSettings.layerInfo.featureLayer) {
          layerSettings = [layerSettings]
        }
        if (layerSettings) {
        for (var i = 0; i < layerSettings.length; i++) {
          var layerInfo;
          if (layerSettings[i] && layerSettings[i].layerInfo && layerSettings[i].layerInfo.featureLayer) {
            layerInfo = this.operLayerInfos.getLayerInfoById(layerSettings[i].layerInfo.featureLayer.id);
          }
          //if we have a config layer set it otherwise just expand the chooser
          if (layerInfo && layerInfo.layerObject && layerInfo.layerObject.isEditable()) {
            var tr = this._addLayerRow();
            layerInfo.getLayerObject().then(lang.hitch(this, function (layer) {
              //todo: check in togglenode is required
              tr.layerChooserSelect.setSelectedLayer(layer).then(lang.hitch(this, function () {
                //show selected layer name in table
                var layerTd = query('.simple-table-cell', tr)[0];
                domAttr.set(layerTd, "innerHTML", layer.name);
                domAttr.set(layerTd, "title", layer.name);
                this._validLayer = true;
                this._updateOk();
                this._toggleNode(tr._editAction, true, 'jimu-state-disabled', 'jimu-icon-edit');
              }));
            }));
            tr.symbolPicker.showBySymbol(jsonUtils.fromJson(layerSettings[i].symbol));
            this._validateLayerFields(tr);
          }
          }
        }
        //if no more layer can be added disable the add layer button
        this._updateAddLayerButtonState();

        //Location settings

        //X/Y settings
        if (!this.config.defaultXYFields) {
          this._setDefaultXYFields();
        }

        this.xyEnabled = typeof (this.config.xyEnabled) !== 'undefined' ? this.config.xyEnabled : false;
        this.enableXYField.setValue(this.config.xyEnabled);

        this._setXYFields(this.defaultXYFields, this.config);

        this.validateAddressOptions();
      },

      _verifyURL: function (url) {
        var def = new Deferred();
        esriRequest({
          url: url,
          content: {
            f: 'json'
          },
          handleAs: 'json',
          callbackParamName: 'callback'
        }).then(lang.hitch(this, function (response) {
          def.resolve(response);
        }), lang.hitch(this, function (err) {
          console.error(err);
          def.resolve({
            type: 'error',
            url: url
          });
        }));
        return def;
      },

      validateAddressOptions: function () {
        //disable ok if no address options are enabled or if no fields are defined within them
        var optionsEnabled = [];
        var trs = this.sourceList.getRows();
        var allSingleEnabled = [];
        var allMultiEnabled = [];
        var oneMulti = false;
        var oneSingle = false;
        array.forEach(trs, lang.hitch(this, function (tr) {
          var single = tr.singleEnabled;
          var visibleFields = tr.multiEnabled && tr.addressFields ? this._getVisibleFields(tr.addressFields) : [];

          var multi = tr.multiEnabled && visibleFields.length > 0;
          allSingleEnabled.push(single);
          allMultiEnabled.push(multi);
          oneMulti = multi ? multi : oneMulti;
          oneSingle = single ? single : oneSingle;

          optionsEnabled.push(multi && single ? true : multi || single);
          this._toggleNode(tr.noFieldsNode, tr.multiEnabled ? multi : true, 'display-block', 'display-none');
        }));
        this._validateMatchingOptions(trs, oneMulti, allMultiEnabled, oneSingle, allSingleEnabled);
        var _valid = oneMulti || oneSingle;
        this._validAddressOptions = this.xyEnabled && _valid ? true : _valid ? true : this.xyEnabled;
        this._updateOk();
      },

      _validateMatchingOptions: function(rows, oneMulti, allMultiEnabled, oneSingle, allSingleEnabled) {
        //alert user if settings do not match...for example if single is defined for one but not the other
        var validMulti = !oneMulti || allMultiEnabled.every(function(v) { return v === true; });
        var validSingle = !oneSingle || allSingleEnabled.every(function(v) { return v === true; });

        var val = !validMulti || !validSingle ? this.nls.optionNotMatch : null;
        array.forEach(rows, lang.hitch(this, function (tr) {
          var td = query('.error', tr)[0];
          this.sourceList.fields[1].setValue(td, val);
        }));
      },

      _getVisibleFields: function(fields){
        var visibleFields = [];
        if (fields && fields.filter) {
          visibleFields = fields.filter(function (f) {
            return f.visible;
          });
        }
        return visibleFields;
      },

      _getLayerInfoFromConfiguration: function (layer) {
        var layerInfo, layerSettings = this.config.layerSettings;
        //for backward compatibility only one layer will be present, convert layersettings object to array
        if (layerSettings && layerSettings.layerInfo && layerSettings.layerInfo.featureLayer) {
          layerSettings = [layerSettings]
        }
        if (layerSettings) {
        for (var i = 0; i < layerSettings.length; i++) {
          var layerInfo;
          if (layerSettings[i] && layerSettings[i].layerInfo && layerSettings[i].layerInfo.featureLayer &&
            layerSettings[i].layerInfo.featureLayer.id === layer.id) {
            layerInfo = layerSettings[i].layerInfo;
            layerInfo.fieldInfos = this._getFieldInfos(layer, layerInfo);
              break;
            }
          }
        }
        return layerInfo;
      },

      _getDefaultLayerInfo: function (layerObject) {
        var layerInfo = {
          'featureLayer': {
            'id': layerObject.id,
            'fields': layerObject.fields,
            'title': layerObject.name,
            'url': layerObject.url
          },
          'fieldInfos': this._getFieldInfos(layerObject)
        };
        return layerInfo;
      },

      _getDefaultFieldInfos: function (layerObject) {
        var fieldInfos = [];
        for (var i = 0; i < layerObject.fields.length; i++) {
          if (layerObject.fields[i].editable &&
            layerObject.fields[i].name !== layerObject.globalIdField &&
            layerObject.fields[i].name !== layerObject.objectIdField) {
            var isRecognizedValues = [layerObject.fields[i].name];
            if (layerObject.fields[i].alias && isRecognizedValues.indexOf(layerObject.fields[i].alias) === -1) {
              isRecognizedValues.push(layerObject.fields[i].alias);
            }
            fieldInfos.push({
              fieldName: layerObject.fields[i].name,
              label: layerObject.fields[i].alias || layerObject.fields[i].name,
              isEditable: layerObject.fields[i].editable,
              visible: false,
              isRecognizedValues: isRecognizedValues,
              type: layerObject.fields[i].type
            });
          }
        }
        return fieldInfos;
      },

      _getWebmapFieldInfos: function (layerObject) {
        var fieldInfos = [];
        var wFieldInfos = this._getFieldInfosFromWebmap(layerObject.id, this.operLayerInfos);
        if (wFieldInfos) {
          array.forEach(wFieldInfos, function (fi) {
            if ((fi.isEditableOnLayer !== undefined && fi.isEditableOnLayer) &&
              fi.fieldName !== layerObject.globalIdField &&
              fi.fieldName !== layerObject.objectIdField) {
              fieldInfos.push({
                fieldName: fi.fieldName,
                label: fi.label,
                isEditable: fi.isEditable,
                visible: fi.visible,
                type: fi.fieldType
              });
            }
          });
          if (fieldInfos.length === 0) {
            fieldInfos = null;
          }
        } else {
          fieldInfos = null;
        }
        return fieldInfos;
      },

      _getFieldInfosFromWebmap: function(layerId, jimuLayerInfos) {
        var fieldInfos = null;
        var jimuLayerInfo = jimuLayerInfos.getLayerInfoByTopLayerId(layerId);
        if(jimuLayerInfo) {
          var popupInfo = jimuLayerInfo.getPopupInfo();
          if(popupInfo && popupInfo.fieldInfos) {
            fieldInfos = lang.clone(popupInfo.fieldInfos);
          }
        }

        if(fieldInfos) {
          array.forEach(fieldInfos, function(fieldInfo) {
            if(fieldInfo.format &&
              fieldInfo.format.dateFormat &&
              fieldInfo.format.dateFormat.toLowerCase() &&
              fieldInfo.format.dateFormat.toLowerCase().indexOf('time') >= 0
              ) {
              fieldInfo.format.time = true;
            }
          });
        }

        return fieldInfos;
      },

      _getFieldInfos: function (layerObject, layerInfo) {
        var fieldInfos = [];
        var wFieldInfos = this._getWebmapFieldInfos(layerObject);
        var bFieldInfos = this._getDefaultFieldInfos(layerObject);
        bFieldInfos = bFieldInfos ? bFieldInfos : wFieldInfos;
        if (layerInfo && layerInfo.fieldInfos) {
          array.forEach(layerInfo.fieldInfos, function (fi) {
            if (!fi.hasOwnProperty('isRecognizedValues')) {
              var isRecognizedValues = [fi.fieldName];
              if (fi.label && isRecognizedValues.indexOf(fi.label) === -1) {
                isRecognizedValues.push(fi.label);
              }
              fi.isRecognizedValues = isRecognizedValues;
            }

            if (typeof(fi.visible) === 'undefined') {
              if (wFieldInfos) {
                for (var j = 0; j < wFieldInfos.length; j++) {
                  if (fi.fieldName === wFieldInfos[j].fieldName) {
                    fi.visible = wFieldInfos[j].visible || wFieldInfos[j].isEditable;
                  }
                }
              } else {
                fi.visible = true;
              }
            }

            // keep order.
            for (var i = 0; i < bFieldInfos.length; i++) {
              if (fi.fieldName === bFieldInfos[i].fieldName) {
                fieldInfos.push(fi);
                bFieldInfos[i]._exit = true;
                break;
              }
            }
          });
          // add new fieldInfos at end.
          array.forEach(bFieldInfos, function (fi) {
            if (!fi._exit) {
              fieldInfos.push(fi);
            }
          });
        } else {
          fieldInfos = bFieldInfos;
        }
        return fieldInfos;
      },

      getConfig: function () {
        //TODO: add validation to check if layers configured or not and also other validations
        //Layer Settings
        var layerTrs = this.layerList.getRows();
        if (layerTrs.length <= 0) {
          this._errorMessage(this.nls.noTargetLayerConfiguredErrorMsg, this.nls.targetLayerTabTitle);
          return false;
        }
        if (!this._validateFieldSettings()) {
          this._errorMessage(this.nls.noFieldsForTargetLayer, this.nls.targetLayerTabTitle);
          return false;
        }
        this.config.layerSettings = [];
        array.forEach(layerTrs, lang.hitch(this, function (tr) {
          this.config.layerSettings.push({
            layerInfo: tr.layerInfo,
            symbol: tr.symbolPicker.getSymbol().toJson()
          });
        }));

        this.config.editorDescription = this._getText(this._introductionMessagetEditor);

        //Location Settings
        if (this._currentSourceSetting && this._currentSourceSetting.isValidConfig()) {
          this._closeSourceSetting();
        } else {
          this._errorMessage(this.nls.locationSettingsNotConfigured, this.nls.locationSettingsTabTitle);
          return false;
        }
        var trs = this.sourceList.getRows();
        var sources = [];
        array.forEach(trs, lang.hitch(this, function (tr) {
          var source = this._getRowConfig(tr);
          source.isEsriLocator = this._currentSourceSetting._isEsriLocator(source.url);
          delete source._definition;
          this._removeRowConfig(tr);
          sources.push(source);
        }));

        this.config.sources = sources;
        this.config.xyFields = this.xyFields || this.config.defaultXYFields;
        this.config.xyEnabled = this.xyEnabled;
        return this.config;
      },

      _validateFieldSettings: function () {
        var errorContainers
        errorContainers = query(".esriCTErrorNodeContainer.display-block", this.layerListNode);
        if (errorContainers && errorContainers.length > 0) {
          return false;
        }
        return true;
      },

      _errorMessage: function (err, selectTab) {
        var errorMessage = new Message({
          message: err
        });
        errorMessage.message = err;
        //Select the tab if exist
        if (this.tab && selectTab) {
          this.tab.selectTab(selectTab);
        }
      },

      ///////////////////////////////////////////////////////////
      //XY Fields
      _setDefaultXYFields: function () {
        this.config.defaultXYFields = [{
          "fieldName": this.nls.xyFieldsX,
          "alias": this.nls.xyFieldsLabelX,
          "label": this.nls.xyFieldsLabelX,
          "visible": true,
          "isRecognizedValues": [this.nls.xyFieldsX, this.nls.longitude, this.nls.lon, this.nls.easting],
          "type": "STRING"
        }, {
          "fieldName": this.nls.xyFieldsY,
          "alias": this.nls.xyFieldsLabelY,
          "label": this.nls.xyFieldsLabelY,
          "visible": true,
          "isRecognizedValues": [this.nls.xyFieldsY, this.nls.latitude, this.nls.lat, this.nls.northing],
          "type": "STRING"
        }];
      },

      _onXYEditFieldsClick: function () {
        if (this.xyEnabled) {
          var editFields = new EditFields({
            nls: this.nls,
            type: 'locatorFields',
            addressFields: this.xyFields || this.config.defaultXYFields,
            popupTitle: this.nls.configureXYFields,
            disableDisplayOption: true,
            disableDuplicateOption: true
          });
          this.own(on(editFields, 'edit-fields-popup-ok', lang.hitch(this, function () {
            this.xyFields = editFields.fieldInfos;
          })));
          editFields.popupEditPage();
        }
      },

      _setXYFields: function (xyFields, config) {
        var useConfig = config && config.xyFields &&
          config.xyFields.hasOwnProperty('length') && config.xyFields.length > 0;
        this.xyFields = useConfig ? config.xyFields : xyFields;
      },
      ///////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////
      //Locator settings
      _onAddClick: function () {
        this._createNewLocatorSourceSettingFromMenuItem({}, {});
      },

      _createNewLocatorSourceSettingFromMenuItem: function (setting, definition) {
        var locatorSetting = new LocatorSourceSetting({
          nls: this.nls,
          map: this.map,
          defaultXYFields: this.config.defaultXYFields,
          parent: this,
          enableXYField: this.enableXYField
        });
        locatorSetting.setDefinition(definition);
        locatorSetting.setConfig({
          url: setting.url || "",
          name: setting.name || "",
          singleLineFieldName: setting.singleLineFieldName || "",
          countryCode: setting.countryCode || "",
          addressFields: setting.addressFields || [],
          singleAddressFields: setting.singleAddressFields || [],
          xyFields: setting.xyFields || [],
          singleEnabled: setting.singleEnabled || false,
          multiEnabled: setting.multiEnabled || false,
          xyEnabled: setting.xyEnabled || false,
          minCandidateScore: setting.minCandidateScore || 90,
          type: "locator"
        });
        locatorSetting._openLocatorChooser();

        locatorSetting.own(
          on(locatorSetting, 'select-locator-url-ok', lang.hitch(this, function (item) {
            var addResult = this.sourceList.addRow({
              name: item.name || "New Geocoder"
            }, this.sourceList.getRows().length);
            if (addResult && addResult.success) {
              if (this._currentSourceSetting) {
                this._closeSourceSetting();
              }
              locatorSetting.setRelatedTr(addResult.tr);
              locatorSetting.placeAt(this.sourceSettingNode);
              this.sourceList.selectRow(addResult.tr);
              this._currentSourceSetting = locatorSetting;
            }
            var xy = query('.xy-table');
            if (xy.length > 0) {
              html.removeClass(xy[0], 'display-none');
            }
            this._validLocator = true;
            this._updateOk();
          }))
        );
        locatorSetting.own(
          on(locatorSetting, 'reselect-locator-url-ok', lang.hitch(this, function (item) {
            var tr = this._currentSourceSetting.getRelatedTr();
            this.sourceList.editRow(tr, {
              name: item.name
            });
          }))
        );
        locatorSetting.own(
          on(locatorSetting, 'select-locator-url-cancel', lang.hitch(this, function () {
            if (this._currentSourceSetting !== locatorSetting) {// locator doesn't display in UI
              locatorSetting.destroy();
              locatorSetting = null;
            }
          }))
        );
      },

      _createNewLocatorSourceSettingFromSourceList: function (setting, definition, relatedTr) {
        if (this._currentSourceSetting) {
          this._closeSourceSetting();
        }

        this._currentSourceSetting = new LocatorSourceSetting({
          nls: this.nls,
          map: this.map,
          defaultXYFields: this.config.defaultXYFields,
          parent: this,
          enableXYField: this.enableXYField
        });
        this._currentSourceSetting.setDefinition(definition);
        this._currentSourceSetting.setConfig({
          url: setting.url || "",
          name: setting.name || "",
          singleLineFieldName: setting.singleLineFieldName || "",
          countryCode: setting.countryCode || "",
          addressFields: setting.addressFields,
          singleAddressFields: setting.singleAddressFields,
          xyFields: setting.xyFields,
          singleEnabled: setting.singleEnabled,
          multiEnabled: setting.multiEnabled,
          xyEnabled: setting.xyEnabled,
          minCandidateScore: setting.minCandidateScore || 90,
          type: "locator"
        });
        this._currentSourceSetting.setRelatedTr(relatedTr);
        this._currentSourceSetting.placeAt(this.sourceSettingNode);
        this._validLocator = true;
        this._updateOk();
        this._currentSourceSetting.own(
          on(this._currentSourceSetting,
            'reselect-locator-url-ok',
            lang.hitch(this, function (item) {
              var tr = this._currentSourceSetting.getRelatedTr();
              this.sourceList.editRow(tr, {
                name: item.name
              });
              this._validLocator = true;
              this._updateOk();
            }))
        );
        this.validateAddressOptions();
      },

      _onSourceItemRemoved: function (tr) {
        if (!this._currentSourceSetting) {
          this._validLocator = false;
          this._updateOk();
          return;
        }
        var currentTr = this._currentSourceSetting.getRelatedTr();
        if (currentTr === tr) {
          this._currentSourceSetting.destroy();
          this._currentSourceSetting = null;
        }
        var rows = this.sourceList.getRows();
        if (rows.length > 0) {
          this._onSourceItemSelected(rows[0]);
          this.validateAddressOptions();
        } else {
          this._validLocator = false;
          this._updateOk();
          this._showMessage(this.nls.requiresLocator);
          var xy = query('.xy-table');
          if (xy.length > 0) {
            html.addClass(xy[0], 'display-none');
          }
        }
      },

      _onSourceItemSelected: function (tr) {
        var config = this._getRowConfig(tr);
        var currentTr = this._currentSourceSetting && this._currentSourceSetting.tr;
        if (!config || tr === currentTr) {
          return;
        }
        if (this._currentSourceSetting && !this._currentSourceSetting.isValidConfig()) {
          this._currentSourceSetting.showValidationTip();
          this.sourceList.selectRow(currentTr);
          return;
        }
        this._createNewLocatorSourceSettingFromSourceList(config, config._definition || {}, tr);
      },

      _setRowConfig: function (tr, source) {
        query(tr).data('config', lang.clone(source));
        tr.singleEnabled = source.singleEnabled;
        tr.addressFields = source.addressFields;
        tr.multiEnabled = source.multiEnabled;
        this.validateAddressOptions();
      },

      _getRowConfig: function (tr) {
        return query(tr).data('config')[0];
      },

      _removeRowConfig: function (tr) {
        tr.singleEnabled = false;
        tr.multiEnabled = false;
        tr.addressFields = [];
        return query(tr).removeData('config');
      },

      _closeSourceSetting: function () {
        var tr = this._currentSourceSetting.getRelatedTr();
        var source = this._currentSourceSetting.getConfig();
        source._definition = this._currentSourceSetting.getDefinition();
        this._setRowConfig(tr, source);
        this.sourceList.editRow(tr, {
          name: source.name
        });
        if (tr.isDisabled) {
          this._currentSourceSetting._updateNameText(true);
        }
        this._currentSourceSetting.destroy();
      },
      ///////////////////////////////////////////////////////////

      _updateOk: function () {
        var disable = !((typeof (this._validLayer) !== 'undefined') ? this._validLayer : true) ||
          !((typeof (this._validLocator) !== 'undefined') ? this._validLocator : true) ||
          !((typeof (this._validFields) !== 'undefined') ? this._validFields : true) ||
          !((typeof (this._validAddressOptions) !== 'undefined') ? this._validAddressOptions : true);
        var s = query(".button-container")[0];
        var s2 = s.children[2];
        var s3 = s.children[3];
      },

      _showMessage: function (msg) {
        new Message({
          message: msg
        });
      },

      destroy: function () {
        this.emit('before-destroy');
        this.inherited(arguments);
      },

      _initEditor: function (containerNode) {
        var editorObj = new Editor({
          plugins: [
            'bold', 'italic', 'underline',
            utils.getEditorTextColor("smartEditor"), utils.getEditorBackgroundColor("smartEditor"),
            '|', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
            '|', 'insertOrderedList', 'insertUnorderedList', 'indent', 'outdent'
          ],
          extraPlugins: [
            '|', 'createLink', 'unlink', 'pastefromword', '|', 'undo', 'redo',
            '|', 'toolbarlinebreak',//'chooseImage', 'uploadImage',
            {
              name: "dijit._editor.plugins.FontChoice",
              command: "fontName",
              custom: "Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".split(";")
            }, 'fontSize', 'formatBlock'
          ],
          style: "font-family:Verdana;"
        }, containerNode);
        domStyle.set(editorObj.domNode, {
          "width": '100%',
          "height": '100%'
        });
        editorObj.startup();
        if (has('ie') !== 8) {
          editorObj.resize({
            w: '100%',
            h: '100%'
          });
        } else {
          var box = html.getMarginBox(containerNode);
          editorObj.resize({
            w: box.w,
            h: box.h
          });
        }
        return editorObj;
      },
      /**
      * this function loads the editor tool plugins CSS
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
      }
    });
  });
