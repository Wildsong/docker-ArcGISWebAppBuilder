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
define(['dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/form/Select',
    'dijit/form/ValidationTextBox',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/dom',
    'dojox/gfx',
    'dojo/query',
    'dojo/_base/Color',
    'dijit/registry',
    'esri/symbols/jsonUtils',
    'esri/request',
    'esri/Color',
    'jimu/dijit/SymbolPicker',
    'jimu/BaseWidget',
    'jimu/dijit/TabContainer3',
    'jimu/utils',
    'jimu/dijit/SimpleTable',
    'jimu/dijit/Message',
    'jimu/dijit/ColorPicker',
    'jimu/dijit/ImageChooser',
    'jimu/dijit/CheckBox',
    'dojo/_base/array',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/PictureMarkerSymbol',
    'dojo/text!./MySymbolPicker.html',
    'dojo/Evented',
    'dijit/focus',
    'dojox/form/FileUploader'
],
  function (declare,
    _WidgetsInTemplateMixin,
    Select,
    ValidationTextBox,
    lang,
    html,
    domStyle,
    domConstruct,
    on,
    dom,
    gfx,
    query,
    Color,
    registry,
    jsonUtils,
    esriRequest,
    _Color,
    SymbolPicker1,
    BaseWidget,
    TabContainer,
    jimuUtils,
    Table,
    Message,
    ColorPicker,
    ImageChooser,
    CheckBox,
    array,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    PictureMarkerSymbol,
    template,
    Evented,
    focusUtil) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      templateString: template,
      baseClass: 'jimu-widget-InfoSummary-setting',
      nls: null,
      row: null,
      layerInfo: null,
      clusteringEnabled: null,
      symbolInfo: null,
      symbolType: "",
      map: null,
      supportsDynamic: true,
      tabContainer: null,
      field_options: [],
      groupFeaturesEnabled: false,
      lyrSymbolSet: [],
      _highLightColor: '#ffffff',
      defaultSymbol: null,
      panelHTML: null,
      svg: null,

      /*jshint unused:false*/
      constructor: function ( /*Object*/ options) {
        this.nls = options.nls;
        this.row = options.callerRow;
        this.layerInfo = options.layerInfo;
        this.renderer = options.layerInfo.renderer;
        this.geometryType = options.layerInfo.geometryType;
        this.symbolInfo = options.symbolInfo;
        this.map = options.map;
        this.ac = options.ac;
        this.layerId = options.value;
        this.supportsDynamic = options.layerInfo.supportsDynamic;
        this.fields = options.layerInfo.fields;
        this.hidePanel = options.hidePanel;
        this.oidFieldName = options.layerInfo.oidFieldName;
        this.loadSymbolPicker = options.loadSymbolPicker;
        this.popupFields = [];
        if (options.layerInfo.infoTemplate && options.layerInfo.infoTemplate.info) {
          var fieldInfos = options.layerInfo.infoTemplate.info.fieldInfos;
          if (fieldInfos) {
            for (var i = 0; i < fieldInfos.length; i++) {
              if (fieldInfos[i].visible) {
                //TODO make sure this is pushing the alias
                this.popupFields.push(fieldInfos[i].fieldName);
              }
            }
          }
        }
      },

      postMixInProperties: function(){
        this.inherited(arguments);
        this.nls.common = window.jimuNls.common;
      },

      postCreate: function () {
        this.inherited(arguments);
        this.defaultSymbol = null;
        this._initCheckBoxes();
        this._initRadioButtons();
        this._initImageChoosers();
        this._setFields(this.fields);
        this._initTabControl();
        this._initSymbolPickerTab(this.geometryType);
        this._initFeatureOptionsTab();
        if (!this.hidePanel) {
          this.own(on(this.btnAddField, 'click', lang.hitch(this, this._addFieldRow,
            this.fieldOptionsTable, 'loSelect')));
          var fieldRows = this.fieldOptionsTable.getRows();
          if (fieldRows && fieldRows.length >= 3) {
            html.removeClass(this.btnAddField, "btn-add-section");
            html.addClass(this.btnAddField, "btn-add-section-disabled");
          } else {
            html.removeClass(this.btnAddField, "btn-add-section-disabled");
            html.addClass(this.btnAddField, "btn-add-section");
          }
          html.removeClass(this.iconOptionsTextLabel, 'text-disabled');
          html.removeClass(this.featureOptionsTextLabel, 'text-disabled');
          html.removeClass(this.groupOptionsTextLabel, 'text-disabled');
          html.removeClass(this.rdoLayerIconLabel, 'text-disabled');
          html.removeClass(this.rdoCustomIconLabel, 'text-disabled');
        } else {
          html.removeClass(this.btnAddField, "btn-add-section");
          html.addClass(this.btnAddField, "btn-add-section-disabled");
          html.addClass(this.iconOptionsTextLabel, 'text-disabled');
          html.addClass(this.featureOptionsTextLabel, 'text-disabled');
          html.addClass(this.groupOptionsTextLabel, 'text-disabled');
          html.addClass(this.rdoLayerIconLabel, 'text-disabled');
          html.addClass(this.rdoCustomIconLabel, 'text-disabled');
        }
        this.chkGroup.setStatus(!this.hidePanel);
        this.rdoLayerIcon.set('disabled', this.hidePanel);
        this.rdoCustomIcon.set('disabled', this.hidePanel);

        this.own(on(this.symbolPicker.domNode, 'click', lang.hitch(this, function (event) {
          event.stopPropagation();
          event.preventDefault();
          if (!this.symbolPicker._isTooltipDialogOpened) {
            if (this.symbolType === "EsriSymbol" && !this._validateSymbolChooserWidthField()) {
              this.symbolPicker._showTooltipDialog();
            }
          }
        })));
      },

      _initRadioButtons: function () {
        this.own(on(this.rdoLayerSym, 'change', lang.hitch(this, this._rdoLayerSymChanged)));
        this.own(on(this.rdoEsriSym, 'change', lang.hitch(this, this._rdoEsriSymChanged)));
        this.own(on(this.rdoCustomSym, 'change', lang.hitch(this, this._rdoCustomSymChanged)));
        this.own(on(this.rdoLayerIcon, 'change', lang.hitch(this, this._rdoLayerIconChanged)));
        this.own(on(this.rdoCustomIcon, 'change', lang.hitch(this, this._rdoCustomIconChanged)));
        this.own(on(this.rdoGroupField, 'change', lang.hitch(this, this._rdoGroupByFieldChanged)));
        this.own(on(this.rdoGroupRenderer, 'change', lang.hitch(this, this._rdoGroupByRendererChanged)));
        this.own(on(this.layerOptionsAscRadioBtn, 'change', lang.hitch(this, this._layerOptionsAscRadioChanged)));
        this.own(on(this.layerOptionsDescRadioBtn, 'change', lang.hitch(this, this._layerOptionsDescRadioChanged)));
        this.own(on(this.groupOptionsAscRadioBtn, 'change', lang.hitch(this, this._groupOptionsAscRadioChanged)));
        this.own(on(this.groupOptionsDescRadioBtn, 'change', lang.hitch(this, this._groupOptionsDescRadioChanged)));
      },

      _initCheckBoxes: function () {
        this.chkClusterSym = this._initCheckBox(this.nls.chkCluster, this.div_chkCluster);
        this.own(on(this.chkClusterSym, 'change', lang.hitch(this, this._chkClusterChanged)));

        this.chkClusterCnt = this._initCheckBox(this.nls.displayClusterCnt, this.div_chkGroupCluster);
        this.own(on(this.chkClusterCnt, 'change', lang.hitch(this, this._chkClusterCntChanged)));

        this.chkGroup = this._initCheckBox(this.nls.chkGroup, this.div_chkGroup);
        this.own(on(this.chkGroup, 'change', lang.hitch(this, this._chkGroupChanged)));
      },

      _initCheckBox: function (nls, node) {
        var cb = new CheckBox();
        cb.setLabel(nls);
        cb.placeAt(node);
        return cb;
      },

      _initImageChoosers: function () {
        this.imageIconChooser = new ImageChooser({
          format: [ImageChooser.GIF, ImageChooser.JPEG, ImageChooser.PNG],
          cropImage: false,
          showTip: false,
          goldenWidth: 10,
          goldenHeight: 15
        });
        html.addClass(this.imageIconChooser.domNode, 'uploadCustom');
        html.place(this.imageIconChooser.domNode, this.uploadCustomIcon, 'replace');

        this.imageSymbolChooser = new ImageChooser({
          format: [ImageChooser.GIF, ImageChooser.JPEG, ImageChooser.PNG],
          cropImage: false,
          showTip: false,
          goldenWidth: 10,
          goldenHeight: 15
        });
        html.addClass(this.imageSymbolChooser.domNode, 'uploadCustom');
        html.place(this.imageSymbolChooser.domNode, this.uploadCustomSymbol, 'replace');
      },

      _setFields: function(fields){
        if (fields) {
          this.field_options = [];
          var nulls = ["", " ", undefined, null];
          for (var i = 0; i < fields.length; i++) {
            this.field_options.push({
              value: fields[i].name,
              label: nulls.indexOf(fields[i].alias) === -1 ? fields[i].alias : fields[i].name
            });
          }
        }
      },

      _initTabControl: function() {
        this.tabContainer = new TabContainer({
          tabs: [{
            title: this.nls.symbolOptions,
            content: this.symbolPickerContainer
          }, {
            title: this.nls.panelFeatureDisplay,
            content: this.panelFeatureDisplayContainer
          }],
          isNested: true
        }, this.tabParent);
        this.tabContainer.startup();
      },

      _initSymbolPickerTab: function (geom) {
        var geoType = jimuUtils.getTypeByGeometryType(geom);
        this._loadLayerSymbol();
        if (this.supportsDynamic && this.loadSymbolPicker) {
          this._initSymbolPicker(geoType);
        }
        this._initClusterSymbolPicker(geoType);
        this._addEventHandlers(geoType);
        //this._initUI();//change
        this._initSymbolUI();
      },

      _initFeatureOptionsTab: function () {
        this.isInitalLoad = true;
        this.fieldLoadCount = 0;
        var fields = [{
          name: "field",
          title: this.nls.selectField,
          "class": "label",
          type: "empty",
          width: "100px"
        }, {
          name: "label",
          "class": "label",
          title: this.nls.fieldLabel,
          type: "empty",
          width: "100px"
        }, {
          name: "actions",
          "class": "label",
          title: this.nls.actions,
          type: "actions",
          actions: ["up", "down", "delete"],
          width: "50px"
        }];

        this.fieldOptionsTable = new Table({
          fields: fields,
          selectable: false,
          autoHeight: true
        });

        this.fieldOptionsTable.placeAt(this.fieldOptions);
        this.fieldOptionsTable.startup();
        this.fieldOptionsTable.on('row-delete', lang.hitch(this, this._rowDeleted));

        var grpFields = [{
          name: "field",
          title: this.nls.selectField,
          "class": "label",
          type: "empty",
          width: "180px"//change from 160
        }, {
          name: "label",
          "class": "label",
          title: this.nls.fieldLabel,
          type: "empty",
          width: "140px"//change from 160
        }];

        this.groupOptionsTable = new Table({
          fields: grpFields,
          selectable: false,
          autoHeight: true
        });

        this.groupOptionsTable.placeAt(this.groupFieldOptions);
        this.groupOptionsTable.startup();

        this._initFeatureOptionsUI();
        this.isInitalLoad = false;
      },

      _initFeatureOptionsUI: function () {
        var fdo;
        if (this.symbolInfo && this.symbolInfo.featureDisplayOptions) {
          fdo = this.symbolInfo.featureDisplayOptions;
        }

        //fields options
        if (fdo && fdo.fields) {
          for (var i = 0; i < fdo.fields.length; i++) {
            this._populateLayerRow(this.fieldOptionsTable, fdo.fields[i], 'loSelect');
          }
        } else {
          this._addFieldRow(this.groupOptionsTable, 'goSelect');

          if (this.popupFields && this.popupFields.length > 0) {
            var fieldLength = this.popupFields.length > 2 ? 3 : this.popupFields.length;
            for (var fI = 0; fI < fieldLength; fI++) {
              this._populateLayerRow(this.fieldOptionsTable, {
                name: this.popupFields[fI]
              }, 'loSelect');
            }
          }
        }
        var layerOptionsSortOrder = (fdo && typeof (fdo.layerOptionsSortOrder) !== 'undefined') ?
          fdo.layerOptionsSortOrder : true;
        if (layerOptionsSortOrder === "DESC") {
          this._layerOptionsDescRadioChanged(true);
        } else {
          //for backward and for new app by default asc radio will be checked
          this._layerOptionsAscRadioChanged(true);
        }

        //group options
        this.groupFeaturesEnabled = (fdo && typeof (fdo.groupEnabled) !== 'undefined') ? fdo.groupEnabled : false;
        this._chkGroupChanged(this.groupFeaturesEnabled);
        this.chkGroup.setValue(this.groupFeaturesEnabled);
        if (fdo && fdo.groupField) {
          this._populateLayerRow(this.groupOptionsTable, fdo.groupField, 'goSelect');
        }

        var t = true;
        if (fdo && typeof (fdo.groupByField) !== 'undefined') {
          this._rdoGroupByFieldChanged(fdo.groupByField);
          t = false;
        }

        var renGrouping = false;
        if(this.renderer){
          if (this.renderer.attributeField || this.renderer.field || this.renderer.field1) {
              renGrouping = true;
          }
        }
        if (!renGrouping) {
          domStyle.set(this.grpRenderer, 'display', 'none');
        }
        if (fdo && typeof (fdo.groupByRenderer) !== 'undefined') {
          this._rdoGroupByRendererChanged(fdo.groupByRenderer);
          t = false;
        }
        if (t) {
          this._rdoGroupByFieldChanged(t);
        }

        var groupFeaturesSortOrder = (fdo && typeof (fdo.groupFeaturesSortOrder) !== 'undefined') ?
          fdo.groupFeaturesSortOrder : true;
        if (groupFeaturesSortOrder === "DESC") {
          this._groupOptionsDescRadioChanged(true);
        } else {
          //for backward and for new app by default asc radio will be checked
          this._groupOptionsAscRadioChanged(true);
        }
      },

      _rowDeleted: function(table){
        if (this.fieldOptionsTable.getRows().length < 3) {
          html.removeClass(this.btnAddField, "btn-add-section-disabled");
          html.addClass(this.btnAddField, "btn-add-section");
        }
      },

      _populateLayerRow: function (table, field, css) {
        this.fieldLoadCount += 1;
        var result = table.addRow({});
        if (result.success && result.tr) {
          var tr = result.tr;
          this._addFieldsOption(tr, css);
          this._addLabelOption(tr);
          tr.selectFields.set("value", field.name);
          tr.labelText.set("value", field.label);
        }
      },

      _addFieldRow: function (table, css) {
        if (table === this.fieldOptionsTable) {
          if (table.getRows().length >= 3) {
            new Message({
              message: this.nls.max_records
            });
            return;
          }
        }

        this.isInitalLoad = false;
        var result = table.addRow({});
        if (result.success && result.tr) {
          var tr = result.tr;
          this._addFieldsOption(tr, css);
          this._addLabelOption(tr);
        }

        if (table === this.fieldOptionsTable) {
          if (table.getRows().length >= 3) {
            html.removeClass(this.btnAddField, "btn-add-section");
            html.addClass(this.btnAddField, "btn-add-section-disabled");
          }
        }
      },

      _addFieldsOption: function (tr, css) {
        var lyrFields = lang.clone(this.field_options);
        var td = query('.simple-table-cell', tr)[0];
        if (td) {
          html.setStyle(td, "verticalAlign", "middle");
          html.setStyle(td, "line-height", "inherit");
          var selFields = new Select({
            style: {
              width: "100%",
              height: "28px"
            },
            "class": css,
            options: lyrFields
          });
          selFields.placeAt(td);
          selFields.startup();
          tr.selectFields = selFields;
          this.own(on(selFields, 'change', lang.hitch(this, function () {
            if (this.fieldLoadCount && this.fieldLoadCount > 0) {
              this.fieldLoadCount -= 1;
            } else {
              tr.labelText.set('value', "");
            }
            tr.cells[0].title = tr.cells[0].innerText;
          })));
          tr.cells[0].title = tr.cells[0].innerText;
        }
      },

      _addLabelOption: function(tr){
        var td = query('.simple-table-cell', tr)[1];
        html.setStyle(td, "verticalAlign", "middle");
        html.setStyle(td, "line-height", "inherit");
        var labelTextBox = new ValidationTextBox({
          style: {
            width: "100%",
            height: "28px"
          }
        });
        labelTextBox.placeAt(td);
        labelTextBox.startup();
        tr.labelText = labelTextBox;
      },

      _initSymbolUI: function () {
        if (typeof (this.symbolInfo) !== 'undefined') {
          //set retained symbol properties
          this.symbolType = this.symbolInfo.symbolType;
          this.clusterType = this.symbolInfo.clusterType;
          this.iconType = this.symbolInfo.iconType;
          this.displayFeatureCount = this.symbolInfo.displayFeatureCount;
          this.clusteringEnabled = this.symbolInfo.clusteringEnabled;
          this.userDefinedSymbol = this.symbolInfo.userDefinedSymbol;
          this._highLightColor = this.symbolInfo._highLightColor;

          this._setSymbolType(this.symbolInfo.symbolType);
          this._setClusterType(this.symbolInfo.clusterType);
          this._setIconType(this.symbolInfo.iconType);

          //set cluster options properties
          if (typeof (this.symbolInfo.clusterType) !== 'undefined') {
            if (this.symbolInfo.clusterType === "CustomCluster") {
              if (this.symbolInfo.clusterSymbol) {
                this.clusterPicker.showBySymbol(jsonUtils.fromJson(this.symbolInfo.clusterSymbol));
              }
            }
            this.userDefinedSymbol = true;
          }
          this.chkClusterSym.setValue(this.symbolInfo.clusteringEnabled);
          this._chkClusterChanged(this.symbolInfo.clusteringEnabled);
        } else {
          //default state
          this.rdoLayerSym.set('checked', true);
          this._rdoEsriSymChanged(false);
          this._rdoCustomSymChanged(false);
          this.chkClusterSym.setValue(false);
          this.chkClusterCnt.setValue(false);
          this.rdoLayerIcon.set('checked', true);
          this._rdoCustomIconChanged(false);
          this.symbolType = "LayerSymbol";
          this.iconType = "LayerIcon";
          this.clusteringEnabled = false;
          this.userDefinedSymbol = false;
        }

        if (this.geometryType !== 'esriGeometryPoint' || !this.supportsDynamic) {
          domStyle.set(this.parent_div_uploadCustomSymbol, "display", "none");
          if (!this.supportsDynamic) {
            domStyle.set(this.div_rdoEsriSym, "display", "none");
          }
        }
      },

      _setSymbolType: function (v) {
        switch (v) {
          case 'LayerSymbol':
            if (this.symbolInfo.symbolOverride) {
              this.userDefinedSymbol = true;
              this.rdoEsriSym.set('checked', true);
              this._rdoLayerSymChanged(false);
              this._rdoCustomSymChanged(false);
              this.symbolPicker.showBySymbol(jsonUtils.fromJson(this.symbolInfo.symbol));
            } else {
              this.rdoLayerSym.set('checked', true);
              this._rdoEsriSymChanged(false);
              this._rdoCustomSymChanged(false);
            }
            break;
          case 'EsriSymbol':
            this.userDefinedSymbol = true;
            this.rdoEsriSym.set('checked', true);
            this._rdoLayerSymChanged(false);
            this._rdoCustomSymChanged(false);
            this.symbolPicker.showBySymbol(jsonUtils.fromJson(this.symbolInfo.symbol));
            break;
          case 'CustomSymbol':
            this.userDefinedSymbol = true;
            this.rdoCustomSym.set('checked', true);
            this._rdoEsriSymChanged(false);
            this._rdoLayerSymChanged(false);
            this._createImageDataDiv(this.symbolInfo.symbol, true, this.customSymbolPlaceholder);
            break;
        }
      },

      _setIconType: function (v) {
        switch (v) {
          case 'LayerIcon':
            this.rdoLayerIcon.set('checked', true);
            break;
          case 'CustomIcon':
            this.userDefinedSymbol = true;
            this.rdoCustomIcon.set('checked', true);

            if (this.symbolInfo.icon) {
              this.updateImg();
              var icon = jsonUtils.fromJson(this.symbolInfo.icon);
              this._createImageDataDiv(icon, true, this.customIconPlaceholder);
            }
            break;
        }
      },

      _setClusterType: function (v) {
        switch (v) {
          case 'ThemeCluster':
            this.userDefinedSymbol = true;
            this.clusterType = 'ThemeCluster';
            break;
          case 'CustomCluster':
            this.userDefinedSymbol = true;
            this.clusterType = 'CustomCluster';
            this.chkClusterCnt.setValue(this.displayFeatureCount);
            this.colorPicker.setColor(new Color(this._highLightColor));
            break;
        }
      },

      updateImg: function () {
        if (this.symbolInfo.icon.toString().indexOf('<img') > -1) {
          var img = document.createElement('div');
          img.innerHTML = this.symbolInfo.icon;
          var icon = new PictureMarkerSymbol(img.children[0].src, 26, 26);
          this.symbolInfo.icon = icon.toJson();
          img.remove();
        }
      },

      _addEventHandlers: function (geoType) {
        var invalidSizeMessagePopup;
        if (geoType === 'point') {
          this.own(on(this.imageSymbolChooser, 'ImageChange', lang.hitch(this, function (d) {
            this.uploadImage("Symbol", d);
            this.emit("onImageSelected");
          })));
        }

        this.own(on(this.imageIconChooser, 'ImageChange', lang.hitch(this, function (d) {
          this.uploadImage("Icon", d);
        })));

        this.btnOk.innerText = this.nls.common.ok;
        this.own(on(this.btnOk, 'click', lang.hitch(this, function () {
          if (this.symbolType === "EsriSymbol" && !this._validateSymbolChooserWidthField()) {
            invalidSizeMessagePopup = new Message({
              message: this.nls.invalidSymbolWidthMessage
            });
            invalidSizeMessagePopup.buttons[0].onClick = lang.hitch(this, function () {
              invalidSizeMessagePopup.close();
              setTimeout(lang.hitch(this, function () {
                this.symbolPicker.domNode.click();
                this._validateSymbolChooserWidthField();
              }), 100);
            })
          }
          else {
            this._setSymbol();
            this.emit('ok', this.symbolInfo);
          }
        })));

        this.btnCancel.innerText = this.nls.common.cancel;
        this.own(on(this.btnCancel, 'click', lang.hitch(this, function () {
          this.emit('cancel');
        })));
      },

      _setSymbol: function () {
        //regardless of type we need to get and store in a common way
        var symbol;
        switch (this.symbolType) {
          case 'LayerSymbol':
            symbol = this.symbol;
            break;
          case 'EsriSymbol':
            this.userDefinedSymbol = true;
            symbol = this.symbolPicker.getSymbol();
            break;
          case 'CustomSymbol':
            this.userDefinedSymbol = true;
            if (this.customSymbolPlaceholder.children.length > 0) {
              if (typeof (this.customSymbolPlaceholder.children[0].src) !== 'undefined') {
                symbol = new PictureMarkerSymbol(this.customSymbolPlaceholder.children[0].src, 26, 26);
              } else {
                symbol = jsonUtils.fromJson(this.symbolInfo.symbol);
              }
            }
            break;
        }

        var icon;
        if (this.iconType === "LayerIcon") {
          icon = symbol;
        } else {
          if (this.customIconPlaceholder.children.length > 0) {
            if (typeof (this.customIconPlaceholder.children[0].src) !== 'undefined') {
              html.removeClass(this.customIconPlaceholder.firstChild, 'customPlaceholder');
              html.addClass(this.customIconPlaceholder.firstChild, 'customPlaceholderSettings');
              icon = new PictureMarkerSymbol(this.customIconPlaceholder.children[0].src, 26, 26);
            } else {
              //this.updateImg();
              icon = jsonUtils.fromJson(this.symbolInfo.icon);
            }
          }
        }

        if (this.clusteringEnabled && this.geometryType === 'esriGeometryPoint') {
          if (this.clusterType === "ThemeCluster") {
            this.clusterSymbol = "custom";
          } else {
            this.clusterSymbol = this.clusterPicker.getSymbol().toJson();
          }
          this.userDefinedSymbol = true;
        } else {
          this.clusterSymbol = undefined;
          this.clusteringEnabled = false;
        }

        if (symbol) {
          if (typeof (symbol.toJson) !== 'undefined') {
            symbol = symbol.toJson();
          }
        }

        var ssss;
        if (this.customIconPlaceholder.children.length > 0) {
          ssss = this.customIconPlaceholder.children[0].src;
        } else if (this.layerSym.children.length > 0) {
          ssss = this.layerSym.children[0].innerHTML;
        }
        else {
          ssss = this.customIconPlaceholder.outerHTML;
        }

        if (typeof (icon) !== 'undefined') {
          var isCustom = this.iconType !== "LayerIcon" || this.symbolType === 'CustomSymbol';
          this._createImageDataDiv2(icon, 44, 44, true, isCustom);
          this._createImageDataDiv2(icon, 28, 28, false, isCustom);
        }

        var vals;
        if (typeof (this.ren) !== 'undefined') {
          vals = [];
          for (var i = 0; i < this.ren.length; i++) {
            var r = this.ren[i];
            //var l, r, d;
            var l, v, d;
            if (typeof (r.value) !== 'undefined') {
              var rVal = isNaN(r.value) ? "'" + r.value + "'" : r.value;
              l = typeof (r.label) !== 'undefined' ? r.label : r.value;
              v = typeof (rVal) !== 'undefined' ? " === " + rVal : undefined;
              d = typeof (r.description) !== 'undefined' && r.description !== "" ? r.description : undefined;
            } else if (typeof (r.classMaxValue) !== 'undefined') {
              l = r.label;
              var rendererVals;
              if (l) {
                rendererVals = l.split(" - ");
              }
              if (rendererVals) {
                if (rendererVals.length > 1) {
                  v = " >= " + rendererVals[0] + " && <= " + rendererVals[1];
                } else {
                  v = " === " + rendererVals[0];
                }
              }
              d = typeof (r.description) !== 'undefined' && r.description !== "" ? r.description : undefined;
            }
            vals.push({ value: v, label: l, description: d });
          }
        }

        var groupByRendererFields = [];
        if (this.renderer && this.renderer.attributeField) {
          groupByRendererFields.push({ name: this.renderer.attributeField });
          if (this.renderer.attributeField2) {
            groupByRendererFields.push({ name: this.renderer.attributeField2 });
          }
          if (this.renderer.attributeField3) {
            groupByRendererFields.push({ name: this.renderer.attributeField3 });
          }
        } else if (this.renderer && this.renderer.field) {
          groupByRendererFields.push({ name: this.renderer.field });
        } else if (this.renderer && this.renderer.field1) {
          groupByRendererFields.push({ name: this.renderer.field1 });
        }

        var fields = this.fieldOptionsTable ? this._getFields(this.fieldOptionsTable) : null;

        this.symbolInfo = {
          symbolType: this.symbolType,
          symbol: symbol,
          clusterSymbol: this.clusterSymbol,
          clusteringEnabled: this.clusteringEnabled,
          displayFeatureCount: this.displayFeatureCount,
          _highLightColor: this.colorPicker.color.toHex(),
          icon: icon && icon.toJson ? icon.toJson() : icon,
          clusterType: this.clusterType,
          iconType: this.iconType,
          renderer: this.renderer,
          s: ssss,
          svg: this.svg,
          panelHTML: this.panelHTML,
          userDefinedSymbol: this.userDefinedSymbol ? this.userDefinedSymbol : false,
          layerId: this.layerId,
          selectedId: this.selectedID,
          featureDisplayOptions: {
            groupEnabled: this.groupFeaturesEnabled,
            listDisabled: (fields && fields.length > 0) ? false : true,
            groupByRenderer: typeof (this.groupByRenderer) === 'undefined' ? false : this.groupByRenderer,
            groupByField: typeof (this.groupByField) === 'undefined' ? false : this.groupByField,
            fields: fields,
            groupField: this.groupOptionsTable ? this._getFields(this.groupOptionsTable)[0] : null,
            groupByRendererOptions: {
              fields: groupByRendererFields,
              values: vals
            },
            layerOptionsSortOrder: this.layerOptionsAscRadioBtn.getValue() ? "ASC" : "DESC",
            groupFeaturesSortOrder: this.groupOptionsAscRadioBtn.getValue() ? "ASC" : "DESC"
          }
        };
      },

      _getFields: function(table){
        var trs = table.getRows();
        var flds = [];
        array.forEach(trs, function (tr) {
          if (tr.selectFields) {
            flds.push({
              name: tr.selectFields.value,
              label: tr.labelText.value
            });
          }
        });
        return flds;
      },

      _rdoLayerSymChanged: function (v) {
        if (v) {
          this.symbolType = "LayerSymbol";
          if (this.selectedID) {
            this.setLayerSymbol(dom.byId(this.selectedID));
          }
          this.emit("enableOkButton");
        }
        html.setStyle(this.layerSym, 'display', v ? "block" : "none");
        if (this.defaultSymbol) {
          this.symbol = lang.clone(this.defaultSymbol);
        }
      },

      _rdoEsriSymChanged: function (v) {
        if (v) {
          this.symbolType = "EsriSymbol";
          this.emit("enableOkButton");
        }
        html.setStyle(this.symbolPicker.domNode, 'display', v ? "block" : "none");
      },

      _rdoCustomSymChanged: function (v) {
        if (v) {
          this.symbolType = "CustomSymbol";
          if (this.customSymbolPlaceholder.children.length === 0) {
            this.emit("customSymbolButtonClicked");
          }
        }
        html.setStyle(this.customSymbolDIV, 'display', v ? "block" : "none");
      },

      _chkClusterChanged: function (v) {
        this.clusteringEnabled = v;
        html.setStyle(this.grpClusterOptions, 'display', v ? "block" : "none");
        html.setStyle(this.featureFont, 'display', v ? "block" : "none");
        html.setStyle(this.clusterPickerContainer, 'display', v ? "block" : "none");
        if (v) {
          if (typeof (this.clusterType) === 'undefined') {
            this.clusterType = "CustomCluster";
            //this.rdoCustomCluster.set('checked', true);
          }
        }
      },

      _chkClusterCntChanged: function(v){
        this.displayFeatureCount = v;
        html.setStyle(this.featureFont, 'display', (v && this.clusteringEnabled) ? "block" : "none");
      },

      _rdoLayerIconChanged: function (v) {
        if (v) {
          this.iconType = "LayerIcon";
        }
        html.setStyle(this.imageIconChooser.domNode, 'display', !v ? "block" : "none");
        html.setStyle(this.customIconPlaceholder, 'display', !v ? "block" : "none");
      },

      _rdoCustomIconChanged: function (v) {
        if (v) {
          this.iconType = "CustomIcon";
        }
        html.setStyle(this.imageIconChooser.domNode, 'display', v ? "block" : "none");
        html.setStyle(this.customIconPlaceholder, 'display', v ? "block" : "none");
      },

      _initSymbolPicker: function (gt) {
        var symType = gt === 'point' ? 'marker' : gt === 'polyline' ? 'line' : gt === 'polygon' ? 'fill' : '';
        this.symbolPicker.showByType(symType);
      },

      _initClusterSymbolPicker: function (geoType) {
        if (geoType === 'point') {
          this.clusterPicker.showByType('fill');
        }
        var d = geoType === 'point' ? 'block' : 'none';
        domStyle.set(this.parent_div_clusterOptions, "display", d);
      },

      _loadLayerSymbol: function () {
        this.infos = undefined;
        this.ren = undefined;
        if (typeof (this.renderer) !== 'undefined') {
          var renderer = this.renderer;
          var sym;
          var ren;
          if (typeof (renderer.symbol) !== 'undefined') {
            this._createImageDataDiv(renderer.symbol, true, this.layerSym, true);
          } else if (typeof (renderer.infos) !== 'undefined') {
            ren = renderer.infos;
          } else if (typeof (renderer.uniqueValueInfos) !== 'undefined') {
            ren = renderer.uniqueValueInfos;
          } else if (typeof (renderer.classBreakInfos) !== 'undefined') {
            ren = renderer.classBreakInfos;
          } else if (renderer.type && renderer.type === 'heatmap' && renderer.colorStops) {
            var colors = renderer.colorStops;
            var infos = [];
            if (colors && colors.length >= 1) {
              var _c = colors[0].color;
              var c = _Color.fromArray([_c.r, _c.g, _c.b]);
              infos.push({
                symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, c), c)
              });
              if (colors.length > 2) {
                _c = colors[colors.length - 1].color;
                c = _Color.fromArray([_c.r, _c.g, _c.b]);
                infos.push({
                  symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, c), c)
                });
              }
            }
            this.infos = infos;
            if (infos.length > 0) {
              this.layerSym.appendChild(this._createCombinedImageDataDiv(infos));
            } else {
              this._createImageDataDiv2(undefined, 44, 44, true, false);
              this._createImageDataDiv2(undefined, 28, 28, false, false);
            }
          } else {
            this.rdoEsriSym.set('checked', true);
            this.symbolType = "EsriSymbol";
            this.iconType = "LayerIcon";
            this._initSymbolPicker(jimuUtils.getTypeByGeometryType(this.geometryType));
            this._setFields(this.fields);
            this._setSymbol();
            this.symbolInfo.symbolType = "LayerSymbol";
            this.symbolInfo.symbolOverride = true;
          }
          if (ren) {
            this.ren = ren;
            this.layerSym.innerHTML = "<div></div>";
            this.layerSym.appendChild(this._createCombinedImageDataDiv(ren));
            html.setStyle(this.layerSym, "cursor", "pointer");
          }
        }
      },

      _createImageDataDiv2: function (sym, w, h, isPanel, isCustom) {
        var a;
        if (typeof (sym) === "string") {
          a = domConstruct.create("div", { 'class': "imageDataGFX", 'innerHTML': sym });
          if (isPanel) {
            this.panelHTML = a.innerHTML;
          } else {
            this.svg = a;
          }
        } else if (typeof (sym) === 'undefined') {
          a = domConstruct.create("div", { 'class': "imageDataGFX" });
          a.innerHTML = '<div></div>';
          if (isPanel) {
            this.panelHTML = a.innerHTML;
          } else {
            this.svg = a;
          }
        } else {
          var symbol = jsonUtils.fromJson(sym);
          if (!symbol) {
            symbol = sym;
          }

          if (symbol) {
            var height = h;
            var width = w;
            if (symbol.height && symbol.width) {
              var ar = symbol.width / symbol.height;
              if (symbol.height > symbol.width) {
                width = w * ar;
              } else if (symbol.width > symbol.height) {
                height = width / ar;
              }
            }
            if (typeof (symbol.setWidth) !== 'undefined') {
              if (typeof (symbol.setHeight) !== 'undefined') {
                symbol.setWidth(isCustom ? width - (width * 0.25) : width);
                symbol.setHeight(isCustom ? height - (height * 0.25) : height);
              } else {
                symbol.setWidth(2);
              }
            } else if (typeof (symbol.size) !== 'undefined') {
              if (symbol.size > 20) {
                symbol.setSize(20);
              }
            }
            a = domConstruct.create("div", { 'class': "imageDataGFX" });
            var mySurface = gfx.createSurface(a, width, height);
            var descriptors = jsonUtils.getShapeDescriptors(symbol);
            var shape = mySurface.createShape(descriptors.defaultShape)
                          .setFill(descriptors.fill)
                          .setStroke(descriptors.stroke);
            shape.applyTransform({ dx: width / 2, dy: height / 2 });
            if (isPanel) {
              this.panelHTML = a.innerHTML;
            } else {
              this.svg = a;
            }
          } else if (typeof (sym.url) !== 'undefined') {
            a = domConstruct.create("div", { 'class': "imageDataGFX" });
            domStyle.set(a, "background-image", "url(" + sym.url + ")");
            domStyle.set(a, "background-repeat", "no-repeat");
            if (isPanel) {
              this.panelHTML = a.innerHTML;
            } else {
              this.svg = a;
            }
          }
        }
        return a;
      },

      _createImageDataDiv: function (sym, convert, node, isLayerSymbol) {
        var a = domConstruct.create("div", { 'class': "imageDataGFX-display" }, node);
        var symbol = convert ? jsonUtils.fromJson(sym) : sym;
        if (!symbol) {
          symbol = sym;
        }
        this.symbol = symbol;
        var height = 26;
        var width = 26;
        if (symbol.height && symbol.width) {
          if (symbol.height > symbol.width) {
            var ar = symbol.width / symbol.height;
            height = 26;
            width = 26 * ar;
          }
        }
        var mySurface = gfx.createSurface(a, width, height);
        var descriptors = jsonUtils.getShapeDescriptors(this.setSym(symbol, width, height));
        var shape = mySurface.createShape(descriptors.defaultShape)
                      .setFill(descriptors.fill)
                      .setStroke(descriptors.stroke);
        shape.applyTransform({ dx: width / 2, dy: height / 2 });
        this.svg = a.firstChild;
        if (isLayerSymbol) {
          this.defaultSymbol = symbol;
        }
        return a;
      },

      _createCombinedImageDataDiv: function (infos) {
        var a = domConstruct.create("div", { 'class': "imageDataGFXMulti" }, this.customSymbolPlaceholder);
        this.lyrSymbolSet = [];
        var isDefault = this.symbolInfo && this.symbolInfo.selectedId ? false : true;
        for (var i = 0; i < infos.length; i++) {
          var sym = infos[i].symbol;
          var symbol = jsonUtils.fromJson(sym);
          if (!symbol) {
            symbol = sym;
          }
          if (typeof (this.symbol) === 'undefined') {
            this.symbol = symbol;
          }
          this.lyrSymbolSet.push(symbol);

          var height = 26;
          var width = 26;
          if (symbol.height && symbol.width) {
            if (symbol.height > symbol.width) {
              var ar = symbol.width / symbol.height;
              height = 26;
              width = 26 * ar;
            }
          }

          var b = domConstruct.create("div", {
            'class': "imageDataGFX imageDataGFX2",
            'id': "imageGFX_" + i,
            onclick: lang.hitch(this, this.layerSymbolClick)
          }, a);

          var mySurface = gfx.createSurface(b, width, height);
          var descriptors = jsonUtils.getShapeDescriptors(this.setSym(symbol, width, height));
          var shape = mySurface.createShape(descriptors.defaultShape)
                        .setFill(descriptors.fill)
                        .setStroke(descriptors.stroke);
          shape.applyTransform({ dx: width / 2, dy: height / 2 });
          a.insertBefore(b, a.firstChild);
          a.appendChild(b);
          if (isDefault || (this.symbolInfo && b.id === this.symbolInfo.selectedId)) {
            this.setLayerSymbol(b);
            isDefault = false;
          }
          if (mySurface.rawNode) {
            html.setStyle(mySurface.rawNode, 'display', "block");
            html.setStyle(mySurface.rawNode, 'margin', "auto");
          }
        }
        return a;
      },

      layerSymbolClick: function (evt) {
        this.setLayerSymbol(evt.currentTarget);
      },

      setLayerSymbol: function (elm) {
        var idx;
        for (var i = 0; i < elm.parentElement.children.length; i++) {
          var child = elm.parentElement.children[i];
          html.removeClass(child, "lyrSymbolSelected");
          if (child.id === elm.id) {
            idx = i;
          }
        }
        html.addClass(elm, "lyrSymbolSelected");
        this.selectedID = elm.id;
        this.svg = elm;
        this.panelHTML = elm.innerHTML;
        this.symbol = this.lyrSymbolSet[idx];
      },

      setSym: function (symbol, width, height) {
        if (typeof (symbol.setWidth) !== 'undefined') {
          if (this.geometryType === 'esriGeometryPoint') {
            symbol.setWidth(width);
          }
          if (typeof (symbol.setHeight) !== 'undefined') {
            symbol.setHeight(height);
          }
        } else {
          //used for point symbols from hosted services
          if (typeof (symbol.size) !== 'undefined') {
            if (symbol.size > 20) {
              symbol.setSize(20);
            }
          }
          //used for point symbols from MapServer services
          if (typeof (symbol.width) !== 'undefined') {
            symbol.width = width;
          }
          if (typeof (symbol.height) !== 'undefined') {
            symbol.height = height;
          }
        }

        return symbol;
      },

      uploadImage: function (type, data) {
        var node = type === "Symbol" ? this.customSymbolPlaceholder : this.customIconPlaceholder;
        node.innerHTML = "";
        node.innerHTML = domConstruct.create("div", {
          'class': "customPlaceholder",
          innerHTML: ['<img class="customPlaceholder" src="', data, '"/>'].join(''),
          title: type === "Symbol" ? this.nls.editCustomSymbol : this.nls.editCustomIcon
        }).innerHTML;
      },

      _chkGroupChanged: function(v){
        this.groupFeaturesEnabled = v;
        html.setStyle(this.groupByOptions, 'display', v ? "inline-block" : "none");
      },

      _rdoGroupByFieldChanged: function (v) {
        this.groupByField = v;
        this.rdoGroupField.set('checked', v);
        html.setStyle(this.groupFieldOptions, 'display', v ? "inline-block" : "none");
      },

      _rdoGroupByRendererChanged: function (v) {
        this.groupByRenderer = v;
        this.rdoGroupRenderer.set('checked', v);
      },

      destroy: function () {
        this.symbolInfo = null;
        this.tabContainer.destroyRecursive();
      },

      _validateSymbolChooserWidthField: function () {
        if (!this._validatePointSymbolSize()) { // point
          focusUtil.focus(this.symbolPicker.symbolChooser.pointSize.focusNode);
          return false;
        }
        if (!this._validatePointOutlineWidth()) { // point
          focusUtil.focus(this.symbolPicker.symbolChooser.pointOutlineWidth.focusNode);
          return false;
        }
        if (!this._validateLineWidth()) { // line
          focusUtil.focus(this.symbolPicker.symbolChooser.lineWidth.focusNode);
          return false;
        }
        if (!this._validatePolygonOutlineWidth()) { // polygon outline width
          focusUtil.focus(this.symbolPicker.symbolChooser.fillOutlineWidth.focusNode);
          return false;
        }
        return true;
      },

      /**
     * This function is used to validate symbol size
     */
      _validatePointSymbolSize: function () {
        if (this.symbolPicker.symbolChooser && this.symbolPicker.symbolChooser.hasOwnProperty("pointSize")) {
          return this.symbolPicker.symbolChooser.pointSize.isValid();
        }
        return true;
      },

      /**
       * This function is used to validate polygon outline width
       */
      _validatePolygonOutlineWidth: function () {
        if (this.symbolPicker.symbolChooser && this.symbolPicker.symbolChooser.hasOwnProperty("fillOutlineWidth")) {
          return this.symbolPicker.symbolChooser.fillOutlineWidth.isValid();
        }
        return true;
      },

      /**
       * This function is used to validate outline width
       */
      _validatePointOutlineWidth: function () {
        if (this.symbolPicker.symbolChooser && this.symbolPicker.symbolChooser.hasOwnProperty("pointOutlineWidth")) {
          return this.symbolPicker.symbolChooser.pointOutlineWidth.isValid();
        }
        return true;
      },

      /**
       * This function is used to validate width in case of line symbol
       */
      _validateLineWidth: function () {
        if (this.symbolPicker.symbolChooser && this.symbolPicker.symbolChooser.hasOwnProperty("lineWidth")) {
          if (!(this.symbolPicker.symbolChooser.lineWidth.isValid())) { // not valid
            return false;
          } else { // valid
            var lineWidthValue = this.symbolPicker.symbolChooser.lineWidth.getValue();
            // when value is blank is it considered as invalid
            if (lineWidthValue === '' ||
              lineWidthValue === null ||
              lineWidthValue === undefined ||
              isNaN(lineWidthValue)) {
              this.symbolPicker.symbolChooser.lineWidth.setValue("0");
              return false;
            }
            return true;
          }
        }
        return true;
      },

      _layerOptionsAscRadioChanged: function (v) {
        this.layerOptionsAscRadioBtn.set('checked', v);
      },

      _layerOptionsDescRadioChanged: function (v) {
        this.layerOptionsDescRadioBtn.set('checked', v);
      },

      _groupOptionsAscRadioChanged: function (v) {
        this.groupOptionsAscRadioBtn.set('checked', v);
      },

      _groupOptionsDescRadioChanged: function (v) {
        this.groupOptionsDescRadioBtn.set('checked', v);
      }
    });
  });
