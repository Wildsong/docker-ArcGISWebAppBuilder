define(
  ["dojo/_base/declare",
    "dojo/Evented",
    "dojo/_base/lang",
    "dojo/text!./fieldMap.html",
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    'dojo/dom-construct',
    'dojo/_base/array',
    'dojo/string',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-attr',
    'dijit/form/TextBox',
    'dojo/keys',
    'dijit/form/Select'
  ],
  function (
    declare,
    Evented,
    lang,
    template,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    domConstruct,
    array,
    String,
    on,
    domClass,
    domStyle,
    domAttr,
    TextBox,
    keys,
    Select
  ) {
    return declare([BaseWidgetSetting, Evented, _WidgetsInTemplateMixin], {
      baseClass: "jimu-widget-smartEditor-fieldsMapping",
      ValidFieldsByType: {
        "esriFieldTypeOID": ["esriFieldTypeSmallInteger", "esriFieldTypeInteger",
          "esriFieldTypeSingle", "esriFieldTypeDouble"
        ],
        "esriFieldTypeSmallInteger": ["esriFieldTypeOID", "esriFieldTypeSmallInteger",
          "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"
        ],
        "esriFieldTypeInteger": ["esriFieldTypeOID", "esriFieldTypeSmallInteger",
          "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"
        ],
        "esriFieldTypeDouble": ["esriFieldTypeOID", "esriFieldTypeSmallInteger",
          "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"
        ],
        "esriFieldTypeSingle": ["esriFieldTypeOID", "esriFieldTypeSmallInteger",
          "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble"
        ],
        "esriFieldTypeGUID": ["esriFieldTypeGUID", "esriFieldTypeGlobalID"],
        "esriFieldTypeDate": ["esriFieldTypeDate"],
        "esriFieldTypeString": ["esriFieldTypeSmallInteger", "esriFieldTypeInteger",
          "esriFieldTypeSingle", "esriFieldTypeDouble", "esriFieldTypeString", "esriFieldTypeGUID",
          "esriFieldTypeDate", "esriFieldTypeOID", "esriFieldTypeGlobalID"
        ]
      },

      templateString: template,
      sourceLayerDetails: [],
      targetLayerDetails: {},
      mappedTargetFields: {},

      postCreate: function () {
        this.mappedTargetFields = {};
        this._createFieldMap(this.sourceLayerDetails, this.targetLayerDetails);
        if (this.openOnLoad) {
          this.expandIconNode.click();
        }
        //Set select dijit label width
        this._setLabelWidth(window.appInfo.isRunInMobile ? 500 : "");
        //Update label width on window resize
        this.own(on(window, "resize", lang.hitch(this, function () {
          this._setLabelWidth(500);
        })));
      },

      _setLabelWidth: function (timeoutValue) {
        setTimeout(lang.hitch(this, function () {
          for (var fieldName in this.mappedTargetFields) {
            if (this.mappedTargetFields[fieldName] && this.mappedTargetFields[fieldName].domNode &&
              this.mappedTargetFields[fieldName].containerNode) {
              //Get the label node
              var labelNode = this.mappedTargetFields[fieldName].containerNode.children[0];
              if (labelNode) {
                //Set the label width based on its parent width
                domStyle.set(labelNode, "width",
                  this.mappedTargetFields[fieldName].domNode.parentElement.clientWidth - 50 + "px");
              }
            }
          }
        }), timeoutValue ? timeoutValue : 1);
      },

      _expandCollapse: function () {
        if (domClass.contains(this.fieldsNode, 'esriCTHidden')) {
          domClass.replace(this.expandIconNode, 'esriCTArrowDown', 'esriCTArrowUp');
          domClass.remove(this.fieldsNode, 'esriCTHidden');
          domClass.remove(this.iconParentNode, 'esriCTHidden');
          domClass.add(this.layerNameNode, 'esriCTLayerNameWidthReduced');
          domAttr.set(this.expandIconNode, "aria-expanded", "true");
          this._setLabelWidth();
        } else {
          domClass.replace(this.expandIconNode, 'esriCTArrowUp', 'esriCTArrowDown');
          domClass.add(this.fieldsNode, 'esriCTHidden');
          domClass.add(this.iconParentNode, 'esriCTHidden');
          domClass.remove(this.layerNameNode, 'esriCTLayerNameWidthReduced');
          domAttr.set(this.expandIconNode, "aria-expanded", "false");
        }
      },

      _resetSourceFields: function () {
        if (this.mappedTargetFields) {
          for (var targetField in this.mappedTargetFields) {
            var dropDown = this.mappedTargetFields[targetField];
            if (!dropDown.get("disabled")) {
              var hasDefault = false;
              //if selected dropdown has default set it else clear the value
              for (var i = 0; i < dropDown.options.length; i++) {
                if (dropDown.options[i].isDefault) {
                  dropDown.set('value', dropDown.options[i].value);
                  hasDefault = true;
                  break;
                }
              }
              if (!hasDefault) {
                dropDown.set('value', 'esriCTSelectSourceLayerField');
              }
            }
          }
        }
        this._setLabelWidth();
      },

      _clearSourceFields: function () {
        if (this.mappedTargetFields) {
          for (var targetField in this.mappedTargetFields) {
            if (!this.mappedTargetFields[targetField].get("disabled")) {
              this.mappedTargetFields[targetField].set('value', 'esriCTSelectSourceLayerField');
            }
          }
        }
        this._setLabelWidth();
      },

      _createFieldMap: function (sLayerDetails, targetLayerDetails) {
        this.expandIconNode = domConstruct.create('div', { // Expand/Collapse button
          'class': 'esriCTArrow esriCTArrowUp',
          'role': 'button',
          'tabindex': '0',
          'title': sLayerDetails.name,
          'aria-label': sLayerDetails.name,
          'aria-expanded': 'false'
        }, this.headerNode);

        this.layerNameNode = domConstruct.create('div', { // Layer name
          'class': 'esriCTLayerName',
          'dir': 'ltr',
          'innerHTML': sLayerDetails.name
        }, this.headerNode);

        this.iconParentNode = domConstruct.create('div', { // Icon Parent
          'class': 'esriCTIconParentNode esriCTHidden'
        }, this.headerNode);

        this.resetButtonNode = domConstruct.create('div', { // Reset button
          'class': 'esriCTResetButton',
          'role': 'button',
          'tabindex': '0',
          'title': this.nls.fieldsMapping.resetLabel,
          'aria-label': this.nls.fieldsMapping.resetLabel
        }, this.iconParentNode);

        this.clearButtonNode = domConstruct.create('div', { // Clear button
          'class': 'esriCTClearButton',
          'role': 'button',
          'tabindex': '0',
          'title': this.nls.fieldsMapping.clearLabel,
          'aria-label': this.nls.fieldsMapping.clearLabel
        }, this.iconParentNode);

        this.own(on(this.layerNameNode, 'click', lang.hitch(this, this._expandCollapse)));
        this.own(on(this.expandIconNode, 'click', lang.hitch(this, this._expandCollapse)));
        this.own(on(this.expandIconNode, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._expandCollapse();
          }
        })));

        this.own(on(this.clearButtonNode, 'click', lang.hitch(this, this._clearSourceFields)));
        this.own(on(this.clearButtonNode, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._clearSourceFields();
          }
        })));

        this.own(on(this.resetButtonNode, 'click', lang.hitch(this, this._resetSourceFields)));
        this.own(on(this.resetButtonNode, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._resetSourceFields();
          }
        })));

        var isMappingTableCreated = false;
        //create target field and source layer fields dropdown for each taget field
        array.forEach(targetLayerDetails.fields, lang.hitch(this, function (targetField) {
          var isEditable;
          //Check if the isEditable key is present in the target field
          //if not use the editable key's value
          //When the layers are added from any other widgets
          //isEditable key is not present
          if (targetField.hasOwnProperty("isEditable")) {
            isEditable = targetField.isEditable;
          } else {
            isEditable = targetField.editable;
          }
          if (targetField.type !== "esriFieldTypeGeometry" &&
            targetField.type !== "esriFieldTypeBlob" &&
            targetField.type !== "esriFieldTypeRaster" &&
            targetField.type !== "esriFieldTypeXML" &&
            targetField.type !== "esriFieldTypeOID" &&
            targetField.type !== "esriFieldTypeGlobalID" &&
            isEditable) {
            isMappingTableCreated = true;
            this._createFieldList(sLayerDetails, targetField);
          }
        }));
        //If table is not created then hide the field mapping DOM
        //and icon node
        if (!isMappingTableCreated) {
          domClass.add(this.fieldMappingTableWrapper, "esriCTHidden");
          domStyle.set(this.iconParentNode, "display", "none");
        } else {
          domClass.add(this.noFieldsMatching, "esriCTHidden");
        }
        this._showMatchedFieldsInfo();
      },

      _createFieldList: function (sLayerDetails, targetField) {
        var tr, targetFieldTD, targetFieldTextBox, sourceFieldTD, fActions,
          attributeActionApplied = false, targetFieldValue;
        tr = domConstruct.create('tr', {
          'class': 'esriCTFieldsMatchingTableRow'
        }, this.fieldsTbodyNode);

        targetFieldTD = domConstruct.create('td', {
          'class': 'esriCTFieldsMatchingTableCell esriCTTargetTD',
          'data-th': this.nls.fieldsMapping.fieldsInTargetLayerLabel
        }, tr);

        targetFieldValue = this._getFieldLabel(targetField);
        targetFieldTextBox = new TextBox({
          value: targetFieldValue,
          title: targetFieldValue,
          disabled: true
        }, domConstruct.create('div', {}, targetFieldTD));
        //add ellipsis class to label
        if (targetFieldTextBox.textbox) {
          domClass.add(targetFieldTextBox.textbox, "textLabelEllipsis");
        }
        sourceFieldTD = domConstruct.create('td', {
          'class': 'esriCTFieldsMatchingTableCell esriCTSourceTD',
          'data-th': this.nls.fieldsMapping.fieldsInSourceLayerLabel
        }, tr);

        //check if any attribute action is enabled on the field
        if (this.targetLayerDetails.fieldValues &&
          this.targetLayerDetails.fieldValues[targetField.name]) {
          fActions = this.targetLayerDetails.fieldValues[targetField.name];
          if (fActions && fActions.length > 0) {
            array.some(fActions, lang.hitch(this, function (attrAction) {
              if (attrAction.actionName !== "Preset" && attrAction.enabled) {
                attributeActionApplied = true;
                return true;
                //If Preset action is enabled then check if the value of usePresetValues flag
                //and then decide whether the action can be applied or not
              } else if (attrAction.actionName === "Preset" && attrAction.enabled &&
                this.usePresetValues) {
                attributeActionApplied = true;
                return true;
              }
            }));
          }
        }

        //If any attribute action is applied on target field,
        //show disabled text box informing fields cannot be set
        //else create dropdown with the fields from source layer for the current target field
        if (attributeActionApplied) {
          this.mappedTargetFields[targetField.name] = new TextBox({
            value: this.nls.fieldsMapping.dynamicValueText,
            title: this.nls.fieldsMapping.dynamicValueText,
            disabled: true
          }, domConstruct.create('div', {}, sourceFieldTD));
          //add ellipsis class to label
          if (this.mappedTargetFields[targetField.name] && this.mappedTargetFields[targetField.name].textbox) {
            domClass.add(this.mappedTargetFields[targetField.name].textbox, "textLabelEllipsis");
          }
        } else {
          this.mappedTargetFields[targetField.name] = new Select({
            options: this._addSourceLayerFieldOptions(targetField, sLayerDetails),
            "class": "esriCTFieldsMatchingDropdown"
          }, domConstruct.create('div', {}, sourceFieldTD));

          this.own(on(this.mappedTargetFields[targetField.name], 'change',
            lang.hitch(this, this._showMatchedFieldsInfo)));
          //add aria label to the source layer select drop down
          domAttr.set(this.mappedTargetFields[targetField.name], "aria-label",
            String.substitute(this.nls.fieldsMapping.selectFieldAriaLabel, {
              targetField: targetField.name
            }));
          //if field mapping available use it 
          if (this.fieldMappingDetails &&
            this.fieldMappingDetails.hasOwnProperty(this.targetLayerDetails.id) &&
            this.fieldMappingDetails[this.targetLayerDetails.id].hasOwnProperty(sLayerDetails.id) &&
            this.fieldMappingDetails[this.targetLayerDetails.id][sLayerDetails.id].hasOwnProperty(targetField.name)) {
            var value = this.fieldMappingDetails[this.targetLayerDetails.id][sLayerDetails.id][targetField.name];
            if (value === "") {
              value = "esriCTSelectSourceLayerField";
            }
            this.mappedTargetFields[targetField.name].set('value', value);
          }
          //on dropdown close set the label width 
          this.own(on(this.mappedTargetFields[targetField.name].dropDown, "close",
            lang.hitch(this, function () {
              this._setLabelWidth();
            })));
        }
      },

      _getFieldLabel: function (field) {
        var fieldLabel = "";
        if (field && field.name) {
          //If field name and label do not match then show label
          //otherwise show the name
          if (field.label && field.label !== field.name) {
            fieldLabel = field.label + " [" + field.name + "]";
          } else {
            fieldLabel = field.name;
          }
        }
        return fieldLabel;
      },

      _addSourceLayerFieldOptions: function (targetField, sourceLayer) {
        var options = [], validFieldSet = [];
        if (!sourceLayer || !sourceLayer.fields) {
          return options;
        }
        options.push({
          "label": this.nls.fieldsMapping.selectSourceFieldLabel,
          "value": "esriCTSelectSourceLayerField"
        });
        //get valid field for current target field type
        validFieldSet = this.ValidFieldsByType[targetField.type];
        if (!validFieldSet) {
          console.log(targetField.type);
        }
        var hasDefault = false;
        array.forEach(sourceLayer.fields, lang.hitch(this, function (currentField) {
          var isFieldVisible = true;
          if (currentField.hasOwnProperty("visible")) {
            isFieldVisible = currentField.visible;
          }
          //Filter fields based on type
          if (currentField.type !== "esriFieldTypeGeometry" &&
            currentField.type !== "esriFieldTypeBlob" &&
            currentField.type !== "esriFieldTypeRaster" &&
            currentField.type !== "esriFieldTypeXML" &&
            validFieldSet && validFieldSet.indexOf(currentField.type) > -1 && isFieldVisible) {
            //Select those fields whose name or alias matches & mark it as default selected option
            //default can be only one field so in loop it should go only once hence hasDefault flag is used
            var targetFieldName, targetFieldAlias, sourceFieldName, sourceFieldAlias, targetFieldLabel, sourceFieldLabel;
            targetFieldName = targetField.name.toLowerCase().split(/\s/).join('');
            targetFieldAlias = targetField.alias ? targetField.alias.toLowerCase().split(/\s/).join('') : "";
            sourceFieldName = currentField.name.toLowerCase().split(/\s/).join('');
            sourceFieldAlias = currentField.alias ? currentField.alias.toLowerCase().split(/\s/).join('') : "";
            targetFieldLabel = targetField.label ? targetField.label.toLowerCase().split(/\s/).join('') : "";
            sourceFieldLabel = currentField.label ? currentField.label.toLowerCase().split(/\s/).join('') : "";
            if (!hasDefault && targetFieldName === sourceFieldName ||
              (targetFieldAlias && sourceFieldAlias && targetFieldAlias === sourceFieldAlias) ||
              (targetFieldAlias && targetFieldAlias === sourceFieldName) ||
              (sourceFieldAlias && targetFieldName === sourceFieldAlias) ||
              (targetFieldLabel && targetFieldLabel === sourceFieldLabel)) {
              hasDefault = true;
              options.push({
                "label": this._getFieldLabel(currentField),
                "value": currentField.name,
                'selected': true,
                'isDefault': true
              });
            } else {
              options.push({
                "label": this._getFieldLabel(currentField),
                "value": currentField.name,
                'selected': false,
                'isDefault': false
              });
            }
          }
        }));
        return options;
      },

      getMatchedFields: function () {
        var mappedFieldsInfo = {};
        for (var targetField in this.mappedTargetFields) {
          //get value for each mapped field
          var selectedSourceField = this.mappedTargetFields[targetField].get('value');
          //if value is 'Select Source Field'
          //or if dijit is disabled(in case of Attribute action applied) then empty the value 
          if (selectedSourceField === 'esriCTSelectSourceLayerField' ||
            this.mappedTargetFields[targetField].get('disabled')) {
            selectedSourceField = '';
          }
          mappedFieldsInfo[targetField] = selectedSourceField;
        }
        return mappedFieldsInfo;
      },

      _showMatchedFieldsInfo: function () {
        var totalCount = 0, mappedFieldsCount = 0, layerTitle;
        for (var targetField in this.mappedTargetFields) {
          //get value for each mapped field
          var selectedSourceField = this.mappedTargetFields[targetField].get('value');
          //if value is 'Select Source Field' then empty the value
          if (selectedSourceField !== 'esriCTSelectSourceLayerField') {
            mappedFieldsCount++;
          }
          totalCount++;
        }
        layerTitle = String.substitute(this.nls.fieldsMapping.targetFieldsMatchedLabel, {
          layerName: this.sourceLayerDetails.name,
          matchedFields: mappedFieldsCount,
          totalFields: totalCount
        });
        domAttr.set(this.layerNameNode, "aria-label", layerTitle);
        domAttr.set(this.layerNameNode, 'innerHTML', layerTitle);
        domAttr.set(this.layerNameNode, 'title', layerTitle);
        domAttr.set(this.expandIconNode, "aria-label", layerTitle);
        domAttr.set(this.expandIconNode, 'title', layerTitle);
      }
    });
  });