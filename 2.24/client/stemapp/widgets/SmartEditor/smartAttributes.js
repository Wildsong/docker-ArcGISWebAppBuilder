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
// jscs:disable validateIndentation
define([
  "dojo/Evented",
  "dojo",
  "dojo/_base/declare",
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-class',
  'dojo/on',
  'dojo/query',
  'dijit/registry',
  'jimu/filterUtils',
  'jimu/dijit/Filter',
  'jimu/BaseWidgetSetting'
], function (
  Evented,
  dojo,
  declare,
  lang,
  array,
  domClass,
  on,
  query,
  registry,
  filterUtils,
  Filter,
  BaseWidgetSetting
  ) {
  return declare([BaseWidgetSetting, Evented], {
    _attrInspector: null,
    _fieldValidation: null,
    _feature: null,
    _fieldInfo: null,
    _gdbRequiredFields: null,
    _notEditableFields: null,
    _fieldNameToAlias: null,
    _fieldsWithRules: null,
    _attTable: null,
    _filterUtils: null,
    _mapLayer: null,
    OPERATORS: null,
    constructor: function () {
      this.inherited(arguments);
      lang.mixin(this, arguments[0]);

      // Reserved for if the filter dijit will translated dates
      //this._filter = new Filter();

	    //polyfill for older browser
      if (!String.prototype.endsWith) {
	      String.prototype.endsWith = function(search, this_len) {
		      if (this_len === undefined || this_len > this.length) {
			      this_len = this.length;
		      }
		      return this.substring(this_len - search.length, this_len) === search;
	      };
      }
      this.useFieldName = false;
      this._mapLayer = this._feature.getLayer();
      this._attTable = query("td.atiLabel", this._attrInspector.domNode);
      if (this._attTable.length > 0) {
        var row = this._attTable[0];
        if (row && row.hasAttribute("data-fieldname")) {
          this.useFieldName = true;
        }
      }
      this._processLayer();
      this._filterUtils = new filterUtils();
      this.OPERATORS = lang.clone(this._filterUtils.OPERATORS);

      if (this._attTable === undefined || this._attTable === null) {
        return;
      }
      this._bindEvents();
    },
    _processLayer: function () {
      this._gdbRequiredFields = [];
      this._notEditableFields = [];
      //this._fieldNameToAlias = {};
      this._fieldsWithRules = [];

      //array.forEach(this._mapLayer.fields, function (field) {
      //  if (field.nullable === false && field.editable === true) {
      //    this._gdbRequiredFields.push(field.alias);
      //  }
      //}, this);

      array.forEach(this._fieldInfo, function (finfo) {
        var fieldLabel;
        if (this.useFieldName === true || finfo.hasOwnProperty('label') === false) {
          fieldLabel = finfo.fieldName;
        }
        else {
          fieldLabel = finfo.label;
          if (fieldLabel.indexOf('<a class="asteriskIndicator"> *</a>') >= 0) {
            fieldLabel = fieldLabel.replace('<a class="asteriskIndicator"> *</a>', '');
          }
        }

        if (finfo.nullable === false && finfo.isEditable === true) {
          this._gdbRequiredFields.push(fieldLabel);
        }
        if (finfo.isEditable === false || finfo.isEditableSettingInWebmap === false) {
          this._notEditableFields.push(fieldLabel);
        }
        if (this._fieldValidation) {
          if (this._fieldValidation.hasOwnProperty(finfo.fieldName)) {
            this._fieldsWithRules.push(fieldLabel);
          }

        }
      }, this);
    },
    toggleFields: function (changeDefaultState) {
      //optional param to determine if no rule is found, should it reset the state.
      //Required for when a form is disabled and a rule to hide a field is required
      changeDefaultState = typeof changeDefaultState !== 'undefined' && changeDefaultState !== null ? changeDefaultState : true;

      if (this._attTable === undefined || this._attTable === null) {
        return;
      }

      if (this._fieldValidation === undefined || this._fieldValidation === null) {
        return;
      }

      if (this._feature === undefined || this._feature === null) {
        return;
      }

      var actionType = null;
      var fields = this._fieldInfo;

      var rowsWithError = [];
      var results;
      array.forEach(fields, lang.hitch(this, function (field) {
        var fieldLabel;
        if (this.useFieldName === true || field.hasOwnProperty('label') === false) {
          fieldLabel = field.fieldName;
        }
        else {
          fieldLabel = field.label;
          if (fieldLabel.indexOf('<a class="asteriskIndicator"> *</a>') >= 0) {
            fieldLabel = fieldLabel.replace('<a class="asteriskIndicator"> *</a>', '');
          }
        }
        actionType = null;
        // hasRule, actionType, fieldValid
        results = this.validateField(field.fieldName);
        actionType = results[1];
        //If date field is required, then check for valid value in date and time text box
        //If any one of them is not valid, return false
        if (actionType === "Required" && field.type === "esriFieldTypeDate") {
          var fieldDijit = this._getDijitForField(field.fieldName);
          if (fieldDijit && fieldDijit.length > 1 &&
            (fieldDijit[1].get("value") === null)) {
            results[2] = false;
          }
        }
        if (results[2] && field.type === "esriFieldTypeDate") {
        //Fix for gitHub ticket #254
        //In case of date fields with time validate if date is having valid selected value
          var fieldDijit = this._getDijitForField(field.fieldName);
          if (fieldDijit && fieldDijit.length > 1 &&
            (fieldDijit[0].get("value") === null)) {
            results[2] = false;
          }
        }
        if (results[2] === false) {
          rowsWithError.push({ 'fieldName': field.fieldName });
        }

        if (results[0] === true) {

          this.toggleFieldOnAttributeInspector(fieldLabel, actionType, results[2], changeDefaultState, field.isEditable);
        }
      }));
      return rowsWithError;
    },

    _getDijitForField: function (fieldName) {
      var dijit;
      array.some(this._attrInspector._currentLInfo.fieldInfos,
        lang.hitch(this, function (field) {
          if (field.fieldName === fieldName) {
            dijit = field.dijit;
            return true;
          }
        }));
      return dijit;
    },

    validateField: function (fieldName) {
      // hasRule, actionType, fieldValid (only for required field action)

      var filter = null;
      if (this._fieldValidation.hasOwnProperty(fieldName)) {

        if (this._fieldValidation[fieldName].length === 0) {
          return [false, null, true];
        }
        else {
          var result = [false, null, null];
          array.some(this._fieldValidation[fieldName], function (actionDetails) {
            if (actionDetails.filter !== undefined && actionDetails.filter !== null) {
              filter = actionDetails.filter;
              result = [true, null, null];
              if (this.processFilter(filter, this._feature)) {
                //if (fieldValidation[fieldName][actionDetails].action === 'Required') {
                if (actionDetails.actionName === 'Required') {

                  if (this._feature.attributes.hasOwnProperty(fieldName) === false) {
                    return (result = [true, actionDetails.actionName, false], true);

                  }
                  else if (this._feature.attributes[fieldName] === null ||
                    this._feature.attributes[fieldName] === '') {
                    return (result = [true, actionDetails.actionName, false], true);
                  }
                  else if (this.myIsNaN(this._feature.attributes[fieldName])) {
                    return (result = [true, actionDetails.actionName, false], true);
                  }
                  else {
                    return (result = [true, actionDetails.actionName, true], true);
                  }
                }
                else {
                  return (result = [true, actionDetails.actionName, null, actionDetails.submitWhenHidden], true);
                }

              }
            }
          }, this);

          return result;
        }
      }
      else {
        return [false, null, null];
      }

    },

    _bindEvents: function () {

      if (this._attTable === undefined || this._attTable === null) {
        return;
      }

      if (this._attTable.length > 0) {
        array.forEach(this._attTable, function (row) {
          var rowInfo = this._getRowInfo(row);
          if (this._fieldsWithRules.indexOf(rowInfo[3]) !== -1) {
            if (rowInfo[2].declaredClass === 'dijit.form.FilteringSelect') {
              on(rowInfo[2], 'change', lang.hitch(this, this._smartComboValidate()));
            }
          }
        }, this);
      }

    },
    process_relative_date: function (date_oper, value, first) {
      var today = new Date();
      var is_num = this._isNumeric(value);
      if (date_oper === undefined || date_oper === null || date_oper === '')
        return value;

      if (date_oper == this.OPERATORS.dateOperatorMinutes && is_num === true) {
        return today.setMinutes(today.getMinutes() - value);
      }
      else if (date_oper == this.OPERATORS.dateOperatorHours && is_num === true) {
        return today.setHours(today.getHours() - value);
      }
      else if (date_oper == this.OPERATORS.dateOperatorDays && is_num === true) {
        return today.setDate(today.getDate() - value);
      }
      else if (date_oper == this.OPERATORS.dateOperatorWeeks && is_num === true) {
        return today.setDate(today.getDate() - (7 * value));
      }
      else if (date_oper == this.OPERATORS.dateOperatorMonths && is_num === true) {
        return today.setMonth(today.getMonth() - value);
      }
      else if (date_oper == this.OPERATORS.dateOperatorYears && is_num === true) {
        return today.setFullYear(today.getFullYear() - value);
      }
      else if (date_oper.toLowerCase() == 'today') {
        return new Date(today.setDate(today.getDate())).setHours(23, 59, 59, 999);
      }
      else if (date_oper.toLowerCase() == 'tomorrow') {
        return new Date(today.setDate(today.getDate() + 1)).setHours(23, 59, 59, 999);
      }
      else if (date_oper.toLowerCase() == 'yesterday') {
        return new Date(today.setDate(today.getDate() - 1)).setHours(23, 59, 59, 999);
      }
      else if (date_oper.toLowerCase() == 'thisweek') {
        var firstday = new Date(today.setDate(today.getDate() - today.getDay())).setHours(0, 0, 0, 0);
        var lastday = new Date(today.setDate(today.getDate() - today.getDay() + 6)).setHours(23, 59, 59, 999);
        return (first === true) ? firstday : lastday;

      }
      else if (date_oper.toLowerCase() == 'thismonth') {
        var firstday = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
        var lastday = new Date(today.getFullYear(), today.getMonth() + 1, 0).setHours(23, 59, 59, 999);
        return (first === true) ? firstday : lastday;

      }
      else if (date_oper.toLowerCase() == 'thisquarter') {
        var lastday;
        var firstday;
        var t = new Date(today.getTime());
        var year = t.getFullYear();
        t.setHours(0, 0, 0, 0); // normalise to not get boundary errors
        var q1 = new Date(year, 2, 31).setHours(23, 59, 59, 999);
        var q2 = new Date(year, 5, 30).setHours(23, 59, 59, 999);
        var q3 = new Date(year, 8, 30).setHours(23, 59, 59, 999);
        var q4 = new Date(year, 11, 31).setHours(23, 59, 59, 999);
        if (t <= q1) {
          firstday = new Date(today.getFullYear(), 0, 1).getTime();
          lastday = q2;
        }
        if (t <= q2) {
          firstday = q1;
          lastday = q2;
        }
        if (t <= q3) {
          firstday = q2;
          lastday = q3;
        }
        if (t <= q4)
        {
          firstday = q3;
          lastday = q4;
        }
        return(first === true) ? firstday : lastday;

      }
      else if (date_oper.toLowerCase() == 'thisyear') {
        var lastday = new Date(today.getFullYear(), 11, 31).setHours(23, 59, 59, 999);
        var firstday = new Date(today.getFullYear(), 0, 1).getTime();
        return (first === true) ? firstday : lastday

      }
      else {
        return value;
      }
    },
    process_part: function (part)
    {
      var virutalDate1 = null;
      var value1 = null;
      var virutalDate2 = null;
      var value2 = null;
      var range1 = null;
      var range2 = null;
      if (part.valueObj.hasOwnProperty('value')) {
        virutalDate1 = (part.valueObj.virtualDate === undefined || part.valueObj.virtualDate === null) ? null : part.valueObj.virtualDate;
        range1 = (part.valueObj.range === undefined || part.valueObj.range === null) ? null : part.valueObj.range;
        value1 = part.valueObj.value;

      }
      if (part.valueObj.hasOwnProperty('value1')) {
        virutalDate1 = (part.valueObj.virtualDate1 === undefined || part.valueObj.virtualDate1 === null) ? null : part.valueObj.virtualDate1;
        if (virutalDate1 === null) {
          virutalDate1 = (part.valueObj.virtualDate === undefined || part.valueObj.virtualDate === null) ? null : part.valueObj.virtualDate;
        }
        range1 = (part.valueObj.range1 === undefined || part.valueObj.range1 === null) ? null : part.valueObj.range1;
        value1 = part.valueObj.value1;
      }
      if (part.valueObj.hasOwnProperty('value2')) {
        virutalDate2 = (part.valueObj.virtualDate2 === undefined || part.valueObj.virtualDate2 === null) ? null : part.valueObj.virtualDate2;
        //Need to set this as some date do not create a virtual date for each value
        if (virutalDate2 === null) {
          virutalDate2 = (part.valueObj.virtualDate === undefined || part.valueObj.virtualDate === null) ? null : part.valueObj.virtualDate;
        }
        range2 = (part.valueObj.range2 === undefined || part.valueObj.range2 === null) ? null : part.valueObj.range2;
        value2 = part.valueObj.value2;
      }
      if (part.fieldObj.type == "esriFieldTypeDate") {
        if (part.operator == this.OPERATORS.dateOperatorInTheLast) {
          if (range1 !== null) {
            value1 = this.process_relative_date(range1, value1);
          }
          if (range2 !== null) {
            value2 = this.process_relative_date(range2, value2);
          }
        }
        else if (part.operator == this.OPERATORS.dateOperatorNotInTheLast) {
          if (range1 !== null) {
            value1 = this.process_relative_date(range1, value1);
          }
          if (range2 !== null) {
            value2 = this.process_relative_date(range2, value2);
          }
        }
        else if (part.operator == this.OPERATORS.dateOperatorIsIn) {
          value1 = this.process_relative_date(virutalDate1, value1,true);
          value2 = this.process_relative_date(virutalDate2, value2,false);
        }
        else if (part.operator == this.OPERATORS.dateOperatorIsNotIn) {
          value1 = this.process_relative_date(virutalDate1, value1, true);
          value2 = this.process_relative_date(virutalDate2, value2, false);
        }
        else {
          if (virutalDate1 !== null) {
            value1 = this.process_relative_date(virutalDate1, value1, false);
          }
          if (virutalDate2 !== null) {
            value2 = this.process_relative_date(virutalDate2, value2, false);
          }
        }
      }
      return [value1, value2];

    },
    processFilter: function (filter) {
      var partResults = [];

      // Reserved for if the filter dijit will translated dates
      //this._filter.build({
      //  url: this._url,
      //  partsObj: filter,
      //  layerDefinition: null,
      //  featureLayerId: null
      //});
      array.forEach(filter.parts, function (part) {
        if (part.hasOwnProperty('parts')) {
          partResults.push(this.processFilter(part, this._feature));
        }
        else {

          var value_process = this.process_part(part);
          var value1 = value_process[0];
          var value2 = value_process[1];

          switch (part.valueObj.type) {
            case 'value':
              partResults.push(this.validatePart(part.operator,
                               this._feature.attributes[part.fieldObj.name],
                               value1,
                               value2,
                               part.caseSensitive));
              break;
            case 'unique':
              partResults.push(this.validatePart(part.operator,
                               this._feature.attributes[part.fieldObj.name],
                               value1,
                               value2,
                               part.caseSensitive));
              break;
            case 'field':
              //Translate the field to a value
              if (this._feature.attributes.hasOwnProperty(value1)) {
                value1 = this._feature.attributes[value1];
              }
              partResults.push(this.validatePart(part.operator,
                                                 this._feature.attributes[part.fieldObj.name],
                                                 value1,
                                                 value2,
                                                 part.caseSensitive));
              break;
            default:
              break;
          }
        }
      }, this);

      return this.ruleValid(partResults, filter.logicalOperator);
    },
    ruleValid: function (partResults, logOp) {
      var performAction = false;

      if (logOp === undefined || logOp === null) {
        logOp = 'OR';
      }
      array.some(partResults, function (result) {

        if (logOp === 'OR') {
          if (result === true) {
            performAction = true;
            return true;
          }
          else {
            performAction = false;
          }
        } else {
          if (result === false) {
            performAction = false;
            return true;
          } else {
            performAction = true;
          }
        }
      });
      return performAction;

    },
    myIsNaN: function (o) {
      return o !== o;
    },
    _isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    validatePart: function (operator, field, value1, value2, caseSensitive) {
      var d = null;
      if (operator === undefined || operator === null) {
        return false;
      }
      if (operator.lastIndexOf('string', 0) === 0) {
        if (caseSensitive === false) {
          if (field !== undefined && field !== null) {
            field = String(field).toUpperCase();
          }
          if (value1 !== undefined && value1 !== null) {
            value1 = String(value1).toUpperCase();
          }
          if (value2 !== undefined && value2 !== null) {
            value2 = String(value2).toUpperCase();
          }

        }
      }
      else if (operator.lastIndexOf('date', 0) === 0) {
        if (value1 !== undefined && value1 !== null) {
          value1 = new Date(value1);
        }
        if (value2 !== undefined && value2 !== null) {
          value2 = new Date(value2);
        }
      }

      switch (operator) {
        case this.OPERATORS.stringOperatorIs:

          if (field === value1) {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorIsNot:
          if (field !== value1) {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorStartsWith:
          if (field === null && value1 === null) {
            return true;
          }
          if (field === null && value1 !== null) {
            return false;
          }
          if (field !== null && value1 === null) {
            return false;
          }
          if (field.lastIndexOf(value1, 0) === 0) {
            return true;
          }

          break;
        case this.OPERATORS.stringOperatorEndsWith:
          if (field === null && value1 === null) {
            return true;
          }
          if (field === null && value1 !== null) {
            return false;
          }
          if (field !== null && value1 === null) {
            return false;
          }
          return field.endsWith(value1);
        case this.OPERATORS.stringOperatorContains:
          if (field === null && value1 === null) {
            return true;
          }
          if (field === null && value1 !== null) {
            return false;
          }
          if (field !== null && value1 === null) {
            return false;
          }
          if (String(field).toUpperCase().indexOf(value1.toUpperCase()) >= 0) {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorDoesNotContain:
          if (field === null && value1 === null) {
            return false;
          }
          if (field === null && value1 !== null) {
            return true;
          }
          if (field !== null && value1 === null) {
            return true;
          }
          if (String(field).toUpperCase().indexOf(value1.toUpperCase()) >= 0) {
            return false;
          } else {
            return true;
          }
          break;
        case this.OPERATORS.stringOperatorIsBlank:
          return (field === undefined || field === null || field === "");
        case this.OPERATORS.stringOperatorIsNotBlank:
          return (field !== undefined && field !== null && field !== "");
        case this.OPERATORS.numberOperatorIs:
          if (this._isNumeric(field)) {
            return String(field) === String(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsNot:
          if (this._isNumeric(field)) {
            return (String(field) !== String(value1));
          }
          return false;
        case this.OPERATORS.numberOperatorIsAtLeast:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) >= Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsLessThan:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) < Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsAtMost:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) <= Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsGreaterThan:
          if (this._isNumeric(field) && this._isNumeric(value1)) {
            return Number(field) > Number(value1);
          }
          return false;
        case this.OPERATORS.numberOperatorIsBetween:
          if (this._isNumeric(field) && this._isNumeric(value1) && this._isNumeric(value2)) {
            return Number(field) > Number(value1) && Number(field) < Number(value2);
          }
          return false;
        case this.OPERATORS.numberOperatorIsNotBetween:
          if (this._isNumeric(field) && this._isNumeric(value1) && this._isNumeric(value2)) {
            return Number(field) <= Number(value1) || Number(field) >= Number(value2);
          }
          return false;
        case this.OPERATORS.numberOperatorIsBlank:
          if (field === null || field === undefined ||
            this._isNumeric(field) === false) {
            return true;
          }
          return false;
        case this.OPERATORS.numberOperatorIsNotBlank:
          if (field !== null && field !== undefined &&
             this._isNumeric(field) === true) {
            return true;
          }
          return false;
        case this.OPERATORS.dateOperatorIsOn:
          if (field === undefined || field === null) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }

          d = new Date(field);
          //d.setUTCSeconds(field);
          return value1.toDateString() === d.toDateString();
        case this.OPERATORS.dateOperatorIsNotOn:
          if (field === undefined || field === null) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }

          d = new Date(field);
          //d.setUTCSeconds(field);
          var res = (value1.toDateString() === d.toDateString());
          return (!res);
        case this.OPERATORS.dateOperatorIsBefore:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field < (value1.getTime());
        case this.OPERATORS.dateOperatorIsAfter:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field > (value1.getTime());
        case this.OPERATORS.dateOperatorIsOnOrBefore:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field <= (value1.getTime());
        case this.OPERATORS.dateOperatorIsOnOrAfter:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field >= (value1.getTime());
        case this.OPERATORS.dateOperatorInTheLast:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field > (value1.getTime()) && field <= new Date().getTime();
        case this.OPERATORS.dateOperatorNotInTheLast:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          return field <= (value1.getTime()) || field >= new Date().getTime();
        case this.OPERATORS.dateOperatorIsIn:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          if (value2 === undefined || value2 === null) {
            return false;
          }
          return field >= value1.getTime() && field <= value2.getTime();

        case this.OPERATORS.dateOperatorIsNotIn:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          if (value2 === undefined || value2 === null) {
            return false;
          }
          return field < value1.getTime() || field > value2.getTime();
        case this.OPERATORS.dateOperatorIsBetween:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          if (value2 === undefined || value2 === null) {
            return false;
          }
          return field >= value1.getTime() && field <= value2.getTime();
        case this.OPERATORS.dateOperatorIsNotBetween:
          if (field === null || field === undefined) {
            return false;
          }
          if (value1 === undefined || value1 === null) {
            return false;
          }
          if (value2 === undefined || value2 === null) {
            return false;
          }
          return field < value1.getTime() || field > value2.getTime();
        case this.OPERATORS.dateOperatorIsBlank:
          if (field === null || field === undefined) {
            return true;
          }
          return false;
        case this.OPERATORS.dateOperatorIsNotBlank:
          if (field !== null && field !== undefined) {
            return true;
          }
          return false;
        case this.OPERATORS.dateOperatorMinutes:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorHours:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorDays:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorWeeks:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorMonths:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        case this.OPERATORS.dateOperatorYears:
          //Not exposed in control, not implemented in app
          if (field === null || field === undefined) {
            //return true;
          }
          return false;
        default:
          return false;
      }
      return false;
    },
    _processChildNodes: function (element, state) {
      element.disabled = state;
      if (state === true) {
        if (element.style) {
          element.style.pointerEvents = 'none';
        }
      }
      else {
        if (element.style) {
          element.style.pointerEvents = 'auto';
        }
      }
      array.forEach(element.childNodes, function (node) {
        node.disabled = state;
        if (state === true) {
          if (node.style) {
            node.style.pointerEvents = 'none';
          }
        }
        else {
          if (node.style) {
            node.style.pointerEvents = 'auto';
          }
        }

        if (node.childNodes.length > 0) {
          this._processChildNodes(node, state);
        }
      }, this);
    },
    _smartComboValidate: function () {
      this.toggleFields();

    },
    _getRowInfo: function (row) {
      var valueCell = row.parentNode.childNodes[1].childNodes[0];
      var valueCell2 = null;
      var valuePickerButton = null;
      //after adding value picker row info will have to return value picker button also
      if (row.parentNode.childNodes[1].childNodes.length > 1) {
        //if more than 2 child then 2nd child could be either timeSelector node or valuePicker button
        valueCell2 = row.parentNode.childNodes[1].childNodes[1];
        //if 2nd node has the class of value picker consider it as value picker button and not timeSelector node
        if(domClass.contains(valueCell2, "esriCTValuePickerButton")){
          valuePickerButton = row.parentNode.childNodes[1].childNodes[1];
          valueCell2 = null;
        }
        //if 3 child nodes means it is date time picker and it has valuePicker also
        if (row.parentNode.childNodes[1].childNodes.length === 3) {
          valuePickerButton = row.parentNode.childNodes[1].childNodes[2];
        }
      } 
      var label;
      if (this.useFieldName === true) {
        if (row.hasAttribute("data-fieldname")) {
          label = row.getAttribute("data-fieldname");
        }
        else {
          label = row.childNodes[0].data;
        }
      }
      else {
        label = row.childNodes[0].data;
      }

      var parent = row.parentNode;
      var widget = registry.getEnclosingWidget(valueCell);

      return [valueCell, parent, widget, label, valueCell2, valuePickerButton];
    },
    _removeRequireFieldMarkings: function (valueCell, parent, widget) {
      var nl = null;
      //if (this._gdbRequiredFields.indexOf(fieldName) === -1) {
      if (widget === undefined || widget === null) {

        if (domClass.contains(valueCell, "dijitComboBoxError")) {
          domClass.remove(valueCell, "dijitComboBoxError");
        }
        if (domClass.contains(valueCell, "dijitTextBoxError")) {
          domClass.remove(valueCell, "dijitTextBoxError");
        }
        if (domClass.contains(valueCell, "dijitValidationTextBox")) {
          domClass.remove(valueCell, "dijitValidationTextBox");
        }
        if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
          domClass.remove(valueCell, "dijitValidationTextBoxError");
        }
        if (domClass.contains(valueCell, "dijitError")) {
          domClass.remove(valueCell, "dijitError");
        }
        nl = query(".dijitValidationContainer", parent);
        array.forEach(nl, function (node) {
          node.parentNode.removeChild(node);
        });
      }
      else {
        var valid = lang.isFunction(widget.isValid) ? widget.isValid() : true;

        if (widget.declaredClass === 'dijit.form.TextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });
        }
        else if (widget.declaredClass === 'dijit.form.ValidationTextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitTextBoxDisabled")) {
            domClass.remove(valueCell, "dijitTextBoxDisabled");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
        }
        else if (widget.declaredClass === 'dijit.form.DateTextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });
        }
        else if (widget.declaredClass === 'dijit.form.TimeTextBox' && valid === true) {
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });
        }
        else if (widget.declaredClass === 'dijit.form.FilteringSelect' && valid === true) {

          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitComboBoxError")) {
            domClass.remove(valueCell, "dijitComboBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
        } else if (valid === true) {
          if (domClass.contains(valueCell, "dijitComboBoxError")) {
            domClass.remove(valueCell, "dijitComboBoxError");
          }
          if (domClass.contains(valueCell, "dijitTextBoxError")) {
            domClass.remove(valueCell, "dijitTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBox")) {
            domClass.remove(valueCell, "dijitValidationTextBox");
          }
          if (domClass.contains(valueCell, "dijitValidationTextBoxError")) {
            domClass.remove(valueCell, "dijitValidationTextBoxError");
          }
          if (domClass.contains(valueCell, "dijitError")) {
            domClass.remove(valueCell, "dijitError");
          }
          nl = query(".dijitValidationContainer", parent);
          array.forEach(nl, function (node) {
            node.parentNode.removeChild(node);
          });

        }
      }
      //}

    },
    _removeRedAst: function (row, fieldName) {
      if (this._gdbRequiredFields.indexOf(fieldName) === -1) {

        var astNode = query("a.asteriskIndicator", row);

        if (astNode.length > 0) {
          array.forEach(astNode, function (node) {
            node.parentNode.removeChild(node);
          });
        }
      }
    },
    _removeHideRule: function (parent) {
      if (domClass.contains(parent, "hideField")) {
        domClass.remove(parent, "hideField");
      }
    },
    _removeDisableRule: function (fieldName, valueCell, isEditable) {
      var widgetNode;
      if (this._notEditableFields.indexOf(fieldName) === -1) {
        if (domClass.contains(valueCell, "dijitTextBoxDisabled")) {
          domClass.remove(valueCell, "dijitTextBoxDisabled");
        }
        if (domClass.contains(valueCell, "dijitComboBoxDisabled")) {
          domClass.remove(valueCell, "dijitComboBoxDisabled");
        }
        if (domClass.contains(valueCell, "dijitValidationTextBoxDisabled")) {
          domClass.remove(valueCell, "dijitValidationTextBoxDisabled");
        }
        if (domClass.contains(valueCell, "dijitDisabled")) {
          domClass.remove(valueCell, "dijitDisabled");
        }
        widgetNode = registry.getEnclosingWidget(valueCell);
        //If widget node is found, make it's read only property to  false
        if (widgetNode) {
          widgetNode.set("readOnly", false);
        }
      }
      if (isEditable) {
        this._processChildNodes(valueCell, false);
      }
    },
    _remove: function (row, fieldName, valueCell, parent, widget, isEditable) {
      this._removeRequireFieldMarkings(valueCell, parent, widget);
      this._removeRedAst(row[0], fieldName);
      this._removeDisableRule(fieldName, valueCell, isEditable);
      this._removeHideRule(parent);
    },
    toggleFieldOnAttributeInspector: function (fieldName, actionType, fieldHasValidValue, changeDefaultState, isEditable) {
      //optional param to determine if no rule is found, should it reset the state.
      //Required for when a form is disabled and a rule to hide a field is required
      changeDefaultState = typeof changeDefaultState !== 'undefined' && changeDefaultState !== null ? changeDefaultState : true;
      if (this._gdbRequiredFields === undefined || this._gdbRequiredFields === null) {
        this._gdbRequiredFields = [];
      }
      if (this._notEditableFields === undefined || this._notEditableFields === null) {
        this._notEditableFields = [];
      }
      if (this._attTable === undefined || this._attTable === null) {
        return;
      }

      if (this._attTable.length > 0) {
        var row = dojo.filter(this._attTable, lang.hitch(this, function (row) {
          if (row.childNodes) {
            if (row.childNodes.length > 0) {
              if (this.useFieldName === true) {
                if (row.hasAttribute("data-fieldname")) {
                  return row.getAttribute("data-fieldname") === fieldName;
                }
                else {
                  return row.childNodes[0].data === fieldName;
                }
              }
              else {
                return row.childNodes[0].data === fieldName;
              }
            }
          }
          return false;
        }));
        var nl = null;
        if (row !== null) {
          if (row.length > 0) {
            var rowInfo = this._getRowInfo(row[0]);

            var valueCell = rowInfo[0];
            var valueCell2 = rowInfo[4];
            var valuePickerButton = rowInfo[5];
            var parent = rowInfo[1];
            var widget = rowInfo[2];
            //var fieldName2 = rowInfo[3];
            if (widget !== undefined && widget !== null) {
              switch (actionType) {
                case 'Hide':
                  this._removeRequireFieldMarkings(valueCell, parent, widget);
                  this._removeRedAst(row[0], fieldName);
                  this._removeDisableRule(fieldName, valueCell, isEditable);
                  if (valueCell2) {
                    this._removeDisableRule(fieldName, valueCell2, isEditable);
                  }
                  if(valuePickerButton){
                    domClass.remove(valuePickerButton, "disabled");
                  }
                  domClass.add(parent, "hideField");
                  break;
                case 'Disabled':
                  this._removeRedAst(row[0], fieldName);
                  this._removeHideRule(parent);
                  this._removeRequireFieldMarkings(valueCell, parent, widget);
                  domClass.add(valueCell, ["dijitValidationTextBox", "dijitTextBoxDisabled",
                    "dijitComboBoxDisabled", "dijitValidationTextBoxDisabled", "dijitDisabled"]);
                  this._processChildNodes(valueCell, true);

                  if (valueCell2 !== null) {
                    this._removeRequireFieldMarkings(valueCell2, parent, widget);
                    domClass.add(valueCell2, ["dijitValidationTextBox", "dijitTextBoxDisabled",
                   "dijitComboBoxDisabled", "dijitValidationTextBoxDisabled", "dijitDisabled"]);

                    this._processChildNodes(valueCell2, true);
                  }
                  if(valuePickerButton){
                    domClass.add(valuePickerButton, "disabled");
                  }
                  break;
                case 'Required':
                  this._removeDisableRule(fieldName, valueCell, isEditable);
                  if (valueCell2) {
                    this._removeDisableRule(fieldName, valueCell2, isEditable);
                  }
                  if(valuePickerButton){
                    domClass.remove(valuePickerButton, "disabled");
                  }
                  this._removeHideRule(parent);
                  if (fieldHasValidValue === true) {
                    this._removeRequireFieldMarkings(valueCell, parent, widget);
                    //If value is valid then remove the error class from dijt node
                    if (valueCell2 && domClass.contains(valueCell2, "dijitTextBoxError", "dijitError")) {
                      domClass.remove(valueCell2, "dijitTextBoxError", "dijitError");
                    }
                  } else {
                    if (widget.declaredClass === 'dijit.form.TextBox') {

                      nl = query(".dijitValidationContainer", parent);
                      if (nl.length === 0) {

                        var newDiv = document.createElement('div');
                        newDiv.setAttribute('class', "dijitReset dijitValidationContainer");
                        var newIn = document.createElement('input');
                        newIn.setAttribute('class', "dijitReset dijitInputField dijitValidationIcon " +
                          "dijitValidationInner");
                        newIn.setAttribute('value', "x");
                        newIn.setAttribute('type', 'text');
                        newIn.setAttribute('tabindex', '-1');
                        newIn.setAttribute('readonly', 'readonly');
                        newIn.setAttribute('role', 'presentation');
                        newDiv.appendChild(newIn);
                        valueCell.insertBefore(newDiv, valueCell.childNodes[0]);
                      }

                      domClass.add(valueCell, ["dijitTextBoxError", "dijitValidationTextBox",
                        "dijitValidationTextBoxError", "dijitError"]);
                    } else if (widget.declaredClass === 'dijit.form.ValidationTextBox') {
                      nl = query(".dijitValidationContainer", parent);
                      domClass.add(valueCell, ["dijitTextBoxError", "dijitValidationTextBox",
                        "dijitValidationTextBoxError", "dijitError"]);
                    } else if (widget.declaredClass === 'dijit.form.FilteringSelect') {
                      domClass.add(valueCell, ["dijitTextBoxError", "dijitComboBoxError",
                        "dijitError", "dijitValidationTextBoxError"]);
                    }
                    else {
                      if (widget.get("value")) {
                        domClass.remove(valueCell, "dijitTextBoxError", "dijitError");
                        if (valueCell2) {
                          domClass.add(valueCell2, ["dijitTextBoxError", "dijitError"]);
                        }
                      } else {
                      domClass.add(valueCell, ["dijitTextBoxError", "dijitError"]);
                      }
                    }
                  }

                  var astNode = query("a.asteriskIndicator", row[0]);
                  var isMarkRequired = query("span.atiRequiredField", row[0]);
                  if (this._gdbRequiredFields.indexOf(fieldName) === -1) {

                    if (astNode.length === 0 && isMarkRequired.length === 0) {
                      var newA = document.createElement('a');
                      newA.setAttribute('class', "asteriskIndicator");
                      newA.innerHTML = " *";
                      row[0].appendChild(newA);
                    }
                  }
                  break;
                case 'Value':
                  break;
                default:
                  if (changeDefaultState) {
                    this._remove(row, fieldName, valueCell, parent, widget, isEditable);
                    if (valuePickerButton) {
                      domClass.remove(valuePickerButton, "disabled");
                    }
                    if (valueCell2) {
                      this._removeDisableRule(fieldName, valueCell2, isEditable);
                    }
                  }
              }
            }
          }
        }

      }
      this.emit("onFieldToggle");
    }

  });
});
