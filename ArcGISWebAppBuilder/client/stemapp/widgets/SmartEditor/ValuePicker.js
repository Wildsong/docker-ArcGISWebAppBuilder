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
  ["dojo/_base/declare",
    "dojo/Evented",
    "dojo/_base/lang",
    "dojo/_base/array",
    'dojo/dom-construct',
    'dojo/dom-class',
    "dojo/text!./ValuePicker.html",
    'dijit/_TemplatedMixin',
    'jimu/BaseWidgetSetting',
    "jimu/dijit/Popup",
    "jimu/dijit/formSelect",
    "jimu/utils"
  ],
  function (
    declare,
    Evented,
    lang,
    array,
    domConstruct,
    domClass,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Popup,
    Select,
    jimuUtils
  ) {
    return declare([BaseWidgetSetting, Evented, _TemplatedMixin], {
      baseClass: "jimu-widget-smartEditor-multiple-value-picker",
      templateString: template,
      allFields: {},
      isOpen: true,

      postCreate: function () {
        this.inherited(arguments);
        this.allFields = {};
        this._initControls();
        this.showDialog();
      },

      _isFieldDisabled: function(fieldName){
        var returnValue;
        if(!this.disabledFields || this.disabledFields.length===0){
          return false;
        }
        else if(this.disabledFields && this.disabledFields.indexOf(fieldName) > -1){
          return true;
        }
        return false;
      },

      _initControls: function () {
        if (this.showForField) {
          domClass.add(this.valuePickerHint, "esriCTHidden");
          this.addField(this.showForField);
        } else if (this.multipleValues) {
          for (var fieldName in this.multipleValues) {
            if (!this._isFieldDisabled(fieldName)) {
              this.addField(fieldName);
            }
          }
        }
      },

      addField: function (field) {
        var values = this.multipleValues[field];
        var fieldContainer = domConstruct.create("div", {
          class: "esriCTFieldContainer"
        }, this.fieldsContainer);
        //Create field label
        domConstruct.create("div", {
          innerHTML: this.fieldLabels[field],
          class: "esriCTFieldName"
        }, fieldContainer);
        //Create field selector
        var valueOptions = this._getFieldsOptionsObj(field, values);
        this.allFields[field] = new Select({
          style: { width: "270px" },
          options: valueOptions,
          "aria-label": this.fieldLabels[field]
        }, domConstruct.create("div", {}, fieldContainer));
      },

      showDialog: function () {
        var autoHeight = true, maxHeight = 500, width = 310;
        this.isOpen = true;
        this.fieldsPopup = new Popup({
          titleLabel: this.nls.valuePicker.popupTitle,
          width: width,
          maxHeight: maxHeight,
          autoHeight: autoHeight,
          content: this,
          class: this.baseClass,
          buttons: [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              var selectedValues = {};
              if (this.showForField) {
                selectedValues[this.showForField] = this.allFields[this.showForField].get('value');
              } else {
                for (var fieldName in this.allFields) {
                  selectedValues[fieldName] = this.allFields[fieldName].get('value');
                }
              }
              this.emit("value-selected", selectedValues);
              this.fieldsPopup.close();
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {
              this.isOpen = false;
              this.fieldsPopup.close();
            })
          }],
          onClose: lang.hitch(this, function () {
            this.isOpen = false;
          })
        });
      },

      hideDialog: function () {
        if (this.fieldsPopup && this.isOpen) {
          this.isOpen = false;
          this.fieldsPopup.close();
        }
      },

      _getFieldsOptionsObj: function (fieldName, values) {
        var fieldPopupInfo = this._getPopupFieldInfo(fieldName);
        var result = jimuUtils._getValues(this.layerInfo.layerInfo.layerObject, fieldPopupInfo, fieldName, values);
        //added this code as it was failing in API for numbers  
        result = array.map(result, function(option){
          return {
            value: option.value,
            label: option.label + ""
          };
        });
        return result;
      },

      _getPopupFieldInfo: function (fieldName) {
        var fInfo, popupInfo, fieldInfos;
        popupInfo = this.layerInfo.layerInfo.getPopupInfo();
        //If popup is configured then get the popup field infos
        //If popup is disable then get the required field info from "getPopupFieldFromLayerField" method
        if (popupInfo) {
          fieldInfos = popupInfo.fieldInfos;
          array.some(fieldInfos, function (field) {
            if (field.fieldName === fieldName) {
              fInfo = field;
              return true;
            }
          });
        } else {
          fInfo = jimuUtils.getPopupFieldFromLayerField(this.layerInfo.layerInfo.layerObject.getField(fieldName));
        }
        return fInfo;
      },
      setValue: function (fieldName, fieldDijit) {
        if (fieldDijit) {
          //If more than one dijit is found, consider it has a date field dijit
          if (fieldDijit.length > 1) {
            this.allFields[fieldName].set("value",
              this.getSelectedValueForDateField(fieldName, fieldDijit));
          } else {
            this.allFields[fieldName].set("value", fieldDijit.getValue());
          }
        }
      },
      getSelectedValueForDateField: function (fieldName, fieldDijit) {
        var selectedValue = "", fieldPopupInfo, options;
        fieldPopupInfo = this._getPopupFieldInfo(fieldName);
        //create option from the method and match the current value
        //check for a valid value in date picker otherwise create EMPTY option
        options = jimuUtils._getValues(this.layerInfo.layerInfo.layerObject,
          fieldPopupInfo, fieldName,
          [fieldDijit[0].value ? fieldDijit[0].value.getTime() : ""]);
        //try to match the selected value it with the options in the dropdown
        array.some(this.allFields[fieldName].options, lang.hitch(this, function (option) {
          if (option.value === options[0].value) {
            selectedValue = option.value;
            return true;
          }
        }));
        return selectedValue;
      }
    });
  });