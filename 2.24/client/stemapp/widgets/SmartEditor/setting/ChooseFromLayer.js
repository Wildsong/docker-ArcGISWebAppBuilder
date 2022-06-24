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
define(
  ['dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/text!./ChooseFromLayer.html',
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/Popup',
    'dijit/form/Select',
    'jimu/dijit/LayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/_filter/ValueProviderFactory',
    'dojo/Evented'
  ],
  function (
    declare,
    lang,
    array,
    on,
    string,
    domAttr,
    domStyle,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Popup,
    Select,
    LayerChooserFromMap,
    LayerChooserFromMapWithDropbox,
    ValueProviderFactory,
    Evented
  ) {
    return declare([BaseWidgetSetting, Evented, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-setting-chooseFromLayer",
      templateString: template,
      layerSelector: null,
      fieldsDropdown: null,
      chooseFromLayerPopup: null,
      valueProviderFactory: null,
      valueProvider: null,
      _isFirsTime: true,

      postCreate: function () {
        this.inherited(arguments);
        this._createPopUp();
      },

      /**
       * this function is used to create layerSelectors in popup
       */
      _addLayerSelectors: function () {
        var layerChooserFromMapArgs, layerChooserFromMap, selectedLayer;
        //create layerChooser args
        layerChooserFromMapArgs = this._createLayerChooserMapArgs();
        layerChooserFromMap = new LayerChooserFromMap(layerChooserFromMapArgs);
        layerChooserFromMap.startup();

        this.layerSelector =
          new LayerChooserFromMapWithDropbox({
            layerChooser: layerChooserFromMap
          });
        this.layerSelector.placeAt(this.layerSelectorDiv);
        this.layerSelector.startup();
        if (this.layerSelector.layerChooser.getAllItems().length > 0) {
          selectedLayer = this.layerSelector.layerChooser.getAllItems()[0].layerInfo.layerObject;
        }
        //if prev selected layer availble set it
        if (this.chooseFromLayerInfo && this.chooseFromLayerInfo.layerId && this._isFirsTime &&
          this.chooseFromLayerInfo.selectedValue == this.selectedPresetValue) {
          var selectedLayerInfo = this.layerInfos.getLayerInfoById(this.chooseFromLayerInfo.layerId);
          if (selectedLayerInfo) {
            selectedLayer = selectedLayerInfo.layerObject;
          }
        }
        //setSelectedLayer in layerSelector
        this.layerSelector.setSelectedLayer(selectedLayer);
        this._addLayerFieldsOptions();
      },

      _createLayerChooserMapArgs: function () {
        var layerChooserFromMapArgs;
        layerChooserFromMapArgs = {
          multiple: false,
          createMapResponse: this.map.webMapResponse,
          onlyShowWebMapLayers: true,
          filter: this._createFiltersForLayerSelector()
        };
        return layerChooserFromMapArgs;
      },

      _createFiltersForLayerSelector: function () {
        var types, featureLayerFilter, imageServiceLayerFilter, filters, combinedFilter;
        types = ['point', 'polyline', 'polygon'];
        featureLayerFilter = LayerChooserFromMap.createFeaturelayerFilter(types, false, false);
        imageServiceLayerFilter = LayerChooserFromMap.createImageServiceLayerFilter(true);
        filters = [featureLayerFilter, imageServiceLayerFilter];
        combinedFilter = LayerChooserFromMap.orCombineFilters(filters);
        return combinedFilter;
      },

      /**
       * This function is used to set options of fieldsDropdown
       */
      _addLayerFieldsOptions: function () {
        //reset prev objects of FieldSelector, valueProviderFactory and valueProvider
        if (this.fieldsDropdown) {
          this.fieldsDropdown.destroy();
        }
        if (this.valueProviderFactory) {
          this.valueProviderFactory = null;
        }
        if (this.valueProvider) {
          this.valueProvider.destroy();
        }
        //Create dropdown for fields selection
        this.fieldsDropdown = new Select({
          "style": {
            "width": "100%"
          }
        });
        this.fieldsDropdown.placeAt(this.fieldsDropdownDiv);
        this.fieldsDropdown.startup();
        this.fieldsDropdown.set("options", this._createFieldsDropDownOpt());
        if (this.fieldsDropdown.options && this.fieldsDropdown.options.length > 0) {
          this.fieldsDropdown.set("value", this.fieldsDropdown.options[0], false);
        if (this.chooseFromLayerInfo && this.chooseFromLayerInfo.field && this._isFirsTime &&
          this.chooseFromLayerInfo.selectedValue == this.selectedPresetValue) {
            this.fieldsDropdown.set("value", this.chooseFromLayerInfo.field, false);
          }
          //if domain field was saved for string data type
          //if yes, populate the hint label
          this._updateLabelForDomainField(this.selectedPresetValue);
          this._createValueProvider();
        }
        //Event handler for fieldsDropdown
        this.own(on(this.fieldsDropdown, "change", lang.hitch(this, function () {
          domStyle.set(this.domainFieldHint, "display", "none");
          this._createValueProvider();
          this._updateLabelForDomainField("");
        })));
      },

      /**
       * This function used to create options of fieldsDropdown
       */
      _createFieldsDropDownOpt: function () {
        var selectedLayer, validFieldSet, options;
        options = [];
        validFieldSet = [];
        if (this.layerSelector.getSelectedItem()) {
          selectedLayer = this.layerSelector.getSelectedItem().layerInfo.layerObject;
          array.forEach(selectedLayer.fields, lang.hitch(this, function (currentField) {
            //Filter fields based on type
            if (this.dataType === "esriFieldTypeString" ||
              (this.dataType === "esriFieldTypeGUID" &&
                (currentField.type === this.dataType ||
                  currentField.type === "esriFieldTypeGlobalID")) ||
              (this.dataType === "esriFieldTypeInteger" &&
                (currentField.type === "esriFieldTypeSmallInteger" || currentField.type === "esriFieldTypeInteger" ||
                  currentField.type === "esriFieldTypeDouble" || currentField.type === "esriFieldTypeSingle" ||
                  currentField.type === "esriFieldTypeOID"))) {
              options.push({
                "label": currentField.alias || currentField.name,
                "value": currentField.name
              });
            }
          }));
        }
        return options;
      },

      _createValueProvider: function () {
        var item;
        if (this.layerSelector) {
          item = this.layerSelector.getSelectedItem();
        }
        //return if not valid layer
        if(!item || !item.layerInfo || !item.layerInfo.layerObject){
          return;
        }
        //get selected layer
        var layerInfo = item.layerInfo;
        var selectedLayer = layerInfo.layerObject;

        //reset prev objects of valueProviderFactory and valueProvider
        if (this.valueProviderFactory) {
          this.valueProviderFactory = null;
        }
        if(this.valueProvider){
          this.valueProvider.destroy();
        }
        //create value provider factory instance
        this.valueProviderFactory = new ValueProviderFactory({
          url: selectedLayer.url,
          layerDefinition: selectedLayer,
          featureLayerId: layerInfo.id
        });
        //get selected field and its info
        var selectedFieldInfo, selectedField;
        selectedField = this.fieldsDropdown.getValue();
        //get field info of the selected field
        array.some(selectedLayer.fields, lang.hitch(this, function (currentField) {
          if (currentField.name === selectedField) {
            selectedFieldInfo = currentField;
            return true;
          }
        }));
        //return if not valid field/feildInfo
        if (!selectedField || !selectedFieldInfo) {
          return;
        }
        //set short type and operator for parts object
        var shortType, operator;
        switch (selectedFieldInfo.type) {
          case "esriFieldTypeString":
            shortType = "string";
            operator = "stringOperatorIs";
            break;
          case "esriFieldTypeDate":
            shortType = "date";
            operator = "dateOperatorIsOn";
            break;
          default:
            shortType = "number";
            operator = "numberOperatorIs";
            break;
        }

        //create fieldinfo for parts object
        var fieldInfo = {
          name: selectedField,
          label: selectedField,
          dateFormat: '',
          shortType: shortType,
          type: selectedFieldInfo.type
        };

        var partObj = {
          fieldObj: fieldInfo,
          operator: operator,
          interactiveObj:'',
          caseSensitive: false,
          valueObj: {
            type: "unique"
          }
        };
        //get value provider and show in UI
        this.valueProvider = this.valueProviderFactory.getValueProvider(partObj, false);
        this.own(on(this.valueProvider, "change", lang.hitch(this, function () {
          //if domain field is selected for string data type
          var selectedValue = this.valueProvider.getPartObject() &&
            this.valueProvider.getPartObject().valueObj.value;
          this._updateLabelForDomainField(selectedValue);
        })));
        if (this.valueProvider) {
          this.valueProvider.placeAt(this.valueProviderContainer);
          if (this.chooseFromLayerInfo && this.chooseFromLayerInfo.selectedValue && this._isFirsTime &&
            this.chooseFromLayerInfo.selectedValue == this.selectedPresetValue) {
            partObj.valueObj.value = this.chooseFromLayerInfo.selectedValue;
            this._isFirsTime = false;
          }
          this.valueProvider.setValueObject(partObj.valueObj);
          this.initialValue = partObj.valueObj.value ? partObj.valueObj.value : "";
        }
      },
      _updateLabelForDomainField: function (selectedValue) {
        var selectedValueLabel, layerInfo, field, selectedLayerItem;
        selectedLayerItem = this.layerSelector ? this.layerSelector.getSelectedItem() : null;
        if (selectedLayerItem && selectedLayerItem.layerInfo &&
          selectedLayerItem.layerInfo.layerObject) {
          layerInfo = selectedLayerItem.layerInfo.layerObject;
          field = layerInfo.getField(this.fieldsDropdown.getValue());
          //If domain field for non string data type is selected
          if (field.domain && this.dataType !== "esriFieldTypeString") {
            array.some(field.domain.codedValues, lang.hitch(this, function (codedDomain) {
              if (selectedValue === codedDomain.code) {
                selectedValueLabel = string.substitute(
                  this.nls.chooseFromLayer.domainFieldHintLabel,
                  {
                    domainValue: codedDomain.code
                  });
                return true;
              }
            }));
          }
        }
        //If label is preset, show the label
        if (selectedValueLabel) {
          domAttr.set(this.domainFieldHint, "innerHTML", selectedValueLabel);
          domStyle.set(this.domainFieldHint, "display", "block");
        } else {
          domStyle.set(this.domainFieldHint, "display", "none");
        }
      },

      /**
       * Creat chooseFromLayerPopup
       */
      _createPopUp: function () {
        this._addLayerSelectors();
        this.chooseFromLayerPopup = new Popup({
          "titleLabel": this.nls.chooseFromLayer.selectValueLabel,
          "width": 500,
          "maxHeight": 300,
          "autoHeight": true,
          "class": this.baseClass,
          "content": this,
          "buttons": [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              this._getSelectedFieldValue();
              this.chooseFromLayerPopup.close();
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {
              this.emit("cancelButtonClicked");
              this.chooseFromLayerPopup.close();
            })
          }]
        });
        //Event handler for layerSelector
        this.own(on(this.layerSelector, "selection-change", lang.hitch(this, function () {
          this._addLayerFieldsOptions();
        })));
      },

      /**
       * This function is used to emit event to update
       * preset value of preset value  textbox in preset popup
       */
      _getSelectedFieldValue: function () {
        var selectedValue;
        //get the value form value provider
        if (this.valueProvider && this.valueProvider.checkedNameDiv) {
          if (this.valueProvider.getPartObject()) {
              selectedValue = this.valueProvider.getPartObject().valueObj.value;
          } else if (this.valueProvider.checkedNameDiv.innerHTML !== "- empty -" && this.initialValue) {
              //we just open the popup and click ok without changing anything
              //then current displying value will be the seletected value 
              selectedValue = this.initialValue;
          } else {
              selectedValue = "";
          }
          //emit the selected value
          this.emit("updatePresetValue", {
            layerId: this.layerSelector.getSelectedItem().layerInfo.layerObject.id,
            field: this.fieldsDropdown.getValue(),
            selectedValue: selectedValue
          });
        }
      }
    });
  });