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

define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./fieldSelectorPopup.html',
  'dojo/_base/lang',
  'dojo/Evented',
  'dojo/dom-construct',
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/query',
  'dojo/on',
  'dojo/dom-style',
  'jimu/dijit/Popup',
  'jimu/dijit/CheckBox',
  'dojo/dom-class',
  'dijit/form/Select',
  'jimu/dijit/RadioBtn',
  'jimu/dijit/formSelect',
  'dojo/NodeList-data'
], function (
  declare,
  BaseWidget,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  lang,
  Evented,
  domConstruct,
  html,
  array,
  query,
  on,
  domStyle,
  Popup,
  CheckBox,
  domClass
) {
  return declare([BaseWidget, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-screening',

    selectedFields: [],
    fieldsPopup: null,
    _selectAllCheckBox: null, // to store the select all checkbox object
    _selectAllCheckBoxHandle: null, // to store change event of select all checkbox
    _fieldsCheckBoxChangeHandle: [], // to store all the change event handle of field checkbox

    constructor: function (options) {
      this.selectedFields = [];
      this.fieldsPopup = null;
      this._selectAllCheckBox = null;
      this._selectAllCheckBoxHandle = null;
      this._fieldsCheckBoxChangeHandle = [];
      lang.mixin(this, options);
    },

    postCreate: function () {
      this.inherited(arguments);
      this.own(on(this.ascRadioBtn, "change", lang.hitch(this, function () {
        this.sortInfo.sortOrder = this.ascRadioBtn.checked ? "Asc" : "Desc";
      })));
      this.own(on(this.fieldsDropdown, "change", lang.hitch(this, function (value) {
        this.sortInfo.sortingField = value;
        this._setSortFieldDropdownLabel();
      })));
      this.own(on(this.descRadioBtn, "change", lang.hitch(this, function () {
        this.sortInfo.sortOrder = this.ascRadioBtn.checked ? "Asc" : "Desc";
      })));
      //for iphone change radio button label size
      if (this.isIOS()) {
        var labelsNode = query(".esriCTRadioLabel", this.domNode);
        if (labelsNode && labelsNode.length > 0) {
          array.forEach(labelsNode, lang.hitch(this, function (node) {
            domClass.add(node, "esriCTFontSize");
          }));
        }
      }
    },

    startup: function () {
      var fieldsDropdownValue;
      this._populateConfiguredFields();
      this._populateSelectedFields();
      this.onFieldsSelectorClick();
      this.fieldsDropdown.set("options", this._getFieldsOptionsObj(this.selectedFields));
      this._addDefaultOptions();
      if (this.sortInfo && this.sortInfo.sortOrder === "Asc") {
        this.ascRadioBtn.set("checked", true);
      }
      if (this.sortInfo && this.sortInfo.sortOrder === "Desc") {
        this.descRadioBtn.set("checked", true);
      }
      if (this.sortInfo && this.sortInfo.sortingField !== "") {
        fieldsDropdownValue = this._getSortFieldValue();
        this.fieldsDropdown.set("value", fieldsDropdownValue);
        this._setSortFieldDropdownLabel();
      }
      this.sortInfo = {
        sortOrder: this.sortInfo.sortOrder,
        sortingField: this.sortInfo.sortingField
      };
      on(window, "resize", lang.hitch(this, function () {
        this._setFieldPopupDimensions();
      }));
    },

    /**
     * Populate all the fields on widget load
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _populateConfiguredFields: function () {
      var fieldName;
      for (fieldName in this.outFields) {
        this.selectedFields.push(fieldName);
      }
    },

    /**
     * This function is used to populate the existing selected fields to retain it
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _populateSelectedFields: function () {
      if (this.retainSelectedFieldsArr !== null) {
        this.selectedFields = this.retainSelectedFieldsArr;
      }
    },

    /**
     * This function is used to check/uncheck the checkbox of select all
     * depending upon the status of field checkboxes
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _resetSelectAllCheckboxStatus: function () {
      var checkAll;
      checkAll = true;
      this._fieldsCheckBox.forEach(function (checkBoxObj) {
        if (!checkBoxObj.checked) {
          checkAll = false;
        }
      });
      if (checkAll) {
        this._selectAllCheckBoxHandle[0].pause();
        this._selectAllCheckBox.check();
        this._selectAllCheckBoxHandle[0].resume();
      } else {
        this._selectAllCheckBoxHandle[0].pause();
        this._selectAllCheckBox.uncheck(true);
        this._selectAllCheckBoxHandle[0].resume();
      }
    },

    /**
     * This function is used to attach the change event to the select all checkbox
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _attachFieldCheckBoxChangeEvent: function (chk) {
      this._fieldsCheckBoxChangeHandle.push(this.own(on.pausable(chk, "change",
        lang.hitch(this, function () {
          this._resetSelectAllCheckboxStatus();
          this._onFieldsSelectionChange();
        }))));
    },

    /**
     * This function is used to pause all the change event of field check box
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _pauseFieldCheckBoxEvent: function () {
      this._fieldsCheckBoxChangeHandle.forEach(function (fieldsCheckBoxChangeHandle) {
        fieldsCheckBoxChangeHandle[0].pause();
      });
    },

    /**
     * This function is used to resume all the change event of field check box
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _resumeFieldCheckBoxEvent: function () {
      this._fieldsCheckBoxChangeHandle.forEach(function (fieldsCheckBoxChangeHandle) {
        fieldsCheckBoxChangeHandle[0].resume();
      });
    },

    /**
     * Show field selector popup with selected options
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    onFieldsSelectorClick: function () {
      var fieldName, parentContainer, contentDom, count = 0, selectAllContainer;
      parentContainer = html.create('div', {}, this.fieldsNode);

      // Select all container
      selectAllContainer = domConstruct.create("div", {
        "class": "esriCTSelectAllReportLabel"
      }, parentContainer);
      // Select all checkbox
      this._selectAllCheckBox = new CheckBox({
        checked: false,
        label: this.nls.reportsTab.selectAllLabel
      });
      this._selectAllCheckBoxHandle =
        this.own(on.pausable(this._selectAllCheckBox, "change", lang.hitch(this, function (evt) {
          this._pauseFieldCheckBoxEvent();
          if (evt) {
            // check all the checkbox
            this._fieldsCheckBox.forEach(function (checkBoxObj) {
              checkBoxObj.check();
            });
          } else {
            // un-check all the checkbox
            this._fieldsCheckBox.forEach(function (checkBoxObj) {
              checkBoxObj.uncheck(true);
            });
          }
          this._resumeFieldCheckBoxEvent();
          this._onFieldsSelectionChange();
        })));
      this._selectAllCheckBox.placeAt(selectAllContainer);

      contentDom = html.create('div', {
        "class": "esriCTSelectFieldParentContainer",
        style: {
          maxHeight: '350px'
        }
      }, parentContainer);

      this._fieldsCheckBox = [];
      for (fieldName in this.outFields) {
        var chk = new CheckBox({
          checked: this._isSearchable(this.outFields[fieldName]),
          label: this.outFields[fieldName].label ||
            this.outFields[fieldName].alias || fieldName,
          fieldName: fieldName
        });
        this._attachFieldCheckBoxChangeEvent(chk);
        html.addClass(chk.domNode, 'esriCTLayerFieldCheckbox');
        html.addClass(chk.labelNode, 'jimu-ellipsis');
        html.setAttr(chk.domNode, {
          'title': this.outFields[fieldName].label ||
            this.outFields[fieldName].alias || fieldName
        });
        //Add background color to checkbox in Dart Theme
        //This will resolve the issue of checkbox not showing checked images
        if (this.appConfig.theme.name === "DartTheme") {
          domStyle.set(chk.domNode.children[0], "backgroundColor", "#4c4c4c");
        }
        if (count % 3 === 0) {
          if (window.isRTL) {
            html.setStyle(chk.domNode, 'marginRight', 0);
          } else {
            html.setStyle(chk.domNode, 'marginLeft', 0);
          }
        }
        chk.placeAt(contentDom);
        query(chk.domNode).data('fieldName', fieldName);
        this._fieldsCheckBox.push(chk);
        count++;
      }

      this.fieldsPopup = new Popup({
        titleLabel: this.popupTitle,
        autoHeight: true,
        content: this,
        class: this.baseClass,
        width: 660,
        maxHeight: 500,
        autoHeight: true,
        buttons: [{
          label: this.nls.common.ok,
          onClick: lang.hitch(this, '_onSearchFieldsOk')
        }, {
          label: this.nls.common.cancel,
          onClick: lang.hitch(this, '_onCancelClick')
        }],
        onClose: lang.hitch(this, function () {
          this.fieldsPopup = null;
        })
      });
      html.addClass(this.fieldsPopup.domNode, this.appConfig.theme.name + "  " + this.baseClass);
      this._setFieldPopupDimensions();
      this._resetSelectAllCheckboxStatus();
    },

    /**
     * Set popup fields dimensions
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _setFieldPopupDimensions: function () {
      if (this.fieldsPopup) {
        //If app is running in mobile mode, change the field selector popup dimensions
        if (window.appInfo.isRunInMobile) {
          this.fieldsPopup.set("width", window.innerWidth - 100);
          query(".esriCTLayerFieldCheckbox").addClass("esriCTLayerFieldWithoutMargin");
          domStyle.set(query(".esriCTSelectFieldParentContainer")[0], "height", "200px");
        } else {
          //Reset the field selector popup dimensions to default
          this.fieldsPopup.set("width", 660);
          this.fieldsPopup.set("maxHeight", 600);
          query(".esriCTLayerFieldCheckbox").removeClass("esriCTLayerFieldWithoutMargin");
        }
        this._setPopupHeight();
      }
    },

    /**
     * Set previously selected fields checkbox to true
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _isSearchable: function (field) {
      return array.some(this.selectedFields, lang.hitch(this, function (sf) {
        if (field.hasOwnProperty("name")) {
          return field.name === sf;
        } else if (field.hasOwnProperty("fieldName")) {
          return field.fieldName === sf;
        }
        return false;
      }));
    },

    /**
     * Store selected checkbox values
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _onSearchFieldsOk: function () {
      var _fields = [];
      array.forEach(this._fieldsCheckBox, function (chk) {
        if (chk.getValue()) {
          var _data = query(chk.domNode).data('fieldName');
          _fields.push(_data[0]);
          query(chk.domNode).removeData();
        }
      });
      this.setSearchFields(_fields);
      this.fieldsPopup.close();
      var selectedSettings = {
        selectedFields: this.selectedFields,
        sortInfo: this._getSortInfo()
      }
      this.emit("onFieldSelectComplete", selectedSettings);
    },

    /**
     * This function is used fire event of cancel button.
     * It is used to retain the report changes consistency
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _onCancelClick: function () {
      this.fieldsPopup.close();
      this.emit("onCancel", this.retainSelectedFieldsArr);
    },

    /**
     * Get selected fields
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _getSearchFields: function () {
      return this.selectedFields;
    },

    /**
     * Set selected fields
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    setSearchFields: function (fields) {
      this.selectedFields = fields;
    },

    /**
     * This function is used to create the options for adding in field dropdown
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _getFieldsOptionsObj: function (fieldsArr) {
      var fieldsOptions = [];
      array.forEach(fieldsArr, lang.hitch(this, function (field) {
        fieldsOptions.push(
          {
            "label": this.outFields[field].alias || this.outFields[field].name || field,
            "value": field
          }
        );
      }));
      return fieldsOptions;
    },

    _getSortInfo: function () {
      return this.sortInfo;
    },

    /**
     * This function is used to recreate option for sorting dropdown when fields checkbox
     * status changed
     */
    _onFieldsSelectionChange: function () {
      this.fieldsDropdown.options = [];
      array.forEach(this._fieldsCheckBox, lang.hitch(this, function (fieldChk) {
        if (fieldChk.checked) {
          this.fieldsDropdown.addOption({
            "label": this.outFields[fieldChk.fieldName].alias ||
              this.outFields[fieldChk.fieldName].name || fieldChk.fieldName,
            "value": fieldChk.fieldName
          });
        } else {
          this.fieldsDropdown.removeOption(this._getFieldText(
            this.outFields[fieldChk.fieldName], fieldChk.fieldName));
        }
      }));
      this._addDefaultOptions();
      this.fieldsDropdown.set("value", this.sortInfo.sortingField);
      this._setSortFieldDropdownLabel();
    },

    /**
     * This function is used to get the field text
     * @memberOf fieldSelectorPopup/fieldSelectorPopup
     */
    _getFieldText: function (currentFieldObj, fieldName) {
      if (currentFieldObj.label) {
        return currentFieldObj.label;
      } else if (currentFieldObj.alias) {
        return currentFieldObj.alias;
      } else {
        return fieldName;
      }
    },

    /**
     * This function is used to set popup height
     */
    _setPopupHeight: function () {
      var popupContainerHeight = domStyle.getComputedStyle(this.popupNode).height;
      this.fieldsPopup.height = parseFloat(popupContainerHeight) + 75;
    },

    /**
     * This function is used to add default option based on layer geometry type
     */
    _addDefaultOptions: function () {
      if (this.featureLayer.geometryType === "esriGeometryPoint") {
        this.fieldsDropdown.addOption({
          "label": this.nls.reportsTab.statisticsCountLabel,
          "value": "esriCTCountField"
        });
      }
      if (this.featureLayer.geometryType === "esriGeometryPolyline") {
        this.fieldsDropdown.addOption({
          "label": this.nls.reportsTab.statisticsTotalLengthLabel,
          "value": "esriCTTotalLengthField"
        });
      }
      if (this.featureLayer.geometryType === "esriGeometryPolygon") {
        this.fieldsDropdown.addOption({
          "label": this.nls.reportsTab.statisticsTotalAreaLabel,
          "value": "esriCTTotalAreaField"
        });
      }
    },

    /**
     * This function detects if app is running in iOS phone
     */
    isIOS: function () {
      var ua = navigator.userAgent.toLowerCase();
      return ua.indexOf("iphone") > -1;
    },

    /**
     * This function is used to get sort field name from its label
     */
    _getSortFieldValue: function () {
      var currentFieldObj, currentFieldText;
      var selectedSortField = this.sortInfo.sortingField;
      var valueArr = this.fieldsDropdown.options.map(function (option) {
        return option.value;
      });
      //for backward (in case of label or alias of sort field is saved)
      if (valueArr.indexOf(this.sortInfo.sortingField) === -1) {
        for (var fieldName in this.outFields) {
          currentFieldObj = this.outFields[fieldName];
          currentFieldText = this._getFieldText(currentFieldObj, fieldName);
          if (currentFieldText === this.sortInfo.sortingField) {
            selectedSortField = fieldName;
          }
        }
      }
      return selectedSortField;
    },

    /**
     * This function is used to set sort field dropdown label
     */
    _setSortFieldDropdownLabel: function () {
      this.fieldsDropdown.set("title", this.fieldsDropdown.getOptions(this.fieldsDropdown.value).label);
    }
  });
});