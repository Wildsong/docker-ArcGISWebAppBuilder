define(
    ["dojo/_base/declare",
        "dojo/Evented",
        "dojo/_base/lang",
        'dojo/on',
        "dojo/text!./RelativeDates.html",
        'dijit/_WidgetsInTemplateMixin',
        "jimu/BaseWidget",
        "jimu/dijit/Popup",
        'dojo/dom-class',
        'jimu/utils',
        'dojo/query',
        'dijit/focus',
        './presetUtils',
        'dijit/form/Select',
        'jimu/dijit/LayerChooserFromMap',
        'jimu/dijit/LayerChooserFromMapWithDropbox',
        'jimu/dijit/_filter/ValueProviderFactory',
        'dojo/_base/array',
        'dojo/dom-style',
        'dojo/string',
        'dojo/dom-attr',
        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox",
        "dijit/form/NumberTextBox",
        "jimu/dijit/RadioBtn"
    ],
    function (
        declare,
        Evented,
        lang,
        on,
        template,
        _WidgetsInTemplateMixin,
        BaseWidget,
        Popup,
        domClass,
        jimuUtils,
        query,
        focusUtils,
        presetUtils,
        Select,
        LayerChooserFromMap,
        LayerChooserFromMapWithDropbox,
        ValueProviderFactory,
        array,
        domStyle,
        string,
        domAttr

    ) {
        return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
            baseClass: "jimu-widget-smartEditor-setting-relativeDates",
            templateString: template,
            selectValuePopup: null, // to store selectValuePopup popup instance
            _isFirsTime: true, //flag to indicate -if popup is getting open for first time then only set values,
            initialValue: null,

            postCreate: function () {
                this._eventListener();
                this._createSelectValuePopUp();
                this._addLayerSelectors();
                this._support508ForSelectValuePopUp();
                on(window, "resize", lang.hitch(this, function () {
                    setTimeout(lang.hitch(this, function () {
                        this._setFieldPopupDimensions();
                    }), 1000);
                }));
            },

            /**
            * event handlers
            * @memberOf widgets/SmartEditor/RalativeDates
            **/
            _eventListener: function () {
                this.fixedRadioButton.onStateChange = lang.hitch(this, function () {
                    this.dateTypeChanged();
                });
                this.currentRadioButton.onStateChange = lang.hitch(this, function () {
                    this.dateTypeChanged();
                });
                this.PastRadioButton.onStateChange = lang.hitch(this, function () {
                    this.dateTypeChanged();
                });
                this.futureRadioButton.onStateChange = lang.hitch(this, function () {
                    this.dateTypeChanged();
                });
                this.own(on(this.yearsTextBox, 'change', lang.hitch(this, function () {
                    this._showOrHideWarningContainer();
                })));
                this.own(on(this.monthsTextBox, 'change', lang.hitch(this, function () {
                    this._showOrHideWarningContainer();
                })));
                this.own(on(this.daysTextBox, 'change', lang.hitch(this, function () {
                    this._showOrHideWarningContainer();
                })));
                this.own(on(this.minutesTextBox, 'change', lang.hitch(this, function () {
                    this._showOrHideWarningContainer();
                })));
                this.own(on(this.hoursTextBox, 'change', lang.hitch(this, function () {
                    this._showOrHideWarningContainer();
                })));
                this.own(on(this.secondsTextBox, 'change', lang.hitch(this, function () {
                    this._showOrHideWarningContainer();
                })));
                this.customRadioButton.onStateChange = lang.hitch(this, function () {
                    this._dateValueOptionChange();
                });
                this.selectValueRadioButton.onStateChange = lang.hitch(this, function () {
                    this._dateValueOptionChange();
                });
            },

            dateTypeChanged: function () {
                domClass.add(this.fixedDateContent, "esriCTHidden");
                domClass.add(this.currentDateContent, "esriCTHidden");
                domClass.add(this.pastOrFutureDateContent, "esriCTHidden");
                domClass.remove(this.valueLabel, "esriCTHidden");
                domClass.add(this.relativeDateWarningContainer, "esriCTHidden");

                if (this.fixedRadioButton.checked) {
                    domClass.remove(this.fixedDateContent, "esriCTHidden");
                    this.hintForDateType.innerHTML = this.nls.relativeDates.hintForFixedDateType;
                } else if (this.currentRadioButton.checked) {
                    domClass.add(this.valueLabel, "esriCTHidden");
                    domClass.remove(this.currentDateContent, "esriCTHidden");
                    this.hintForDateType.innerHTML = this.nls.relativeDates.hintForCurrentDateType;
                } else if (this.PastRadioButton.checked) {
                    domClass.remove(this.pastOrFutureDateContent, "esriCTHidden");
                    this.hintForDateType.innerHTML = this.nls.relativeDates.hintForPastDateType;
                } else if (this.futureRadioButton.checked) {
                    domClass.remove(this.pastOrFutureDateContent, "esriCTHidden");
                    this.hintForDateType.innerHTML = this.nls.relativeDates.hintForFutureDateType;
                }
            },

            /**
            * Create and Show popup
            * @memberOf widgets/SmartEditor/RalativeDates
            **/
            _createSelectValuePopUp: function () {
                this.selectValuePopup = new Popup({
                    "titleLabel": this.nls.relativeDates.popupTitle,
                    "width": 500,
                    "maxHeight": 450,
                    "autoHeight": true,
                    "class": this.baseClass,
                    "content": this,
                    "buttons": [{
                        label: this.nls.ok,
                        onClick: lang.hitch(this, function () {
                            var value = this._getValues();
                            if (value) {
                                if (!domClass.contains(this.pastOrFutureDateContent, "esriCTHidden")
                                    && this._checkTextboxesWithZeroValue()) {
                                    domClass.remove(this.relativeDateWarningContainer, "esriCTHidden");
                                    return;
                                }
                                domClass.add(this.relativeDateWarningContainer, "esriCTHidden");
                                this.emit("updatePresetValue", value);
                                this.selectValuePopup.close();
                            }
                        })
                    }, {
                        label: this.nls.cancel,
                        classNames: ['jimu-btn-vacation'],
                        onClick: lang.hitch(this, function () {
                            this.selectValuePopup.close();
                        })
                    }]
                });
                if (this.relativeDates) {
                    this._setValue();
                }
            },

            /**
            * Set popup fields dimensions
            */
            _setFieldPopupDimensions: function () {
                if (this.selectValuePopup) {
                    //If app is running in mobile mode, change the field selector popup dimensions
                    if (window.appInfo.isRunInMobile && window.innerWidth < 600) {
                        this.selectValuePopup.set("width", window.innerWidth - 100);

                    } else {
                        //Reset the field selector popup dimensions to default
                        this.selectValuePopup.set("width", 750);
                    }
                }
            },

            /**
             * This function is used to validate dijits related to fixed date
             */
            _validateFixedDate: function () {
                if (!this.dateTextBox.isValid()) {
                    this.dateTextBox.focus();
                    return false;
                }
                if (!this.timeTextBox.isValid()) {
                    this.timeTextBox.focus();
                    return false;
                }
                return true;
            },

            /**
             * This function is used to validate dijits related to past or future date
             */
            _validatePastOrFutureDate: function () {
                if (!this.yearsTextBox.isValid()) {
                    this.yearsTextBox.focus();
                    return false;
                }
                if (!this.monthsTextBox.isValid()) {
                    this.monthsTextBox.focus();
                    return false;
                }
                if (!this.daysTextBox.isValid()) {
                    this.daysTextBox.focus();
                    return false;
                }
                if (!this.hoursTextBox.isValid()) {
                    this.hoursTextBox.focus();
                    return false;
                }
                if (!this.minutesTextBox.isValid()) {
                    this.minutesTextBox.focus();
                    return false;
                }
                if (!this.secondsTextBox.isValid()) {
                    this.secondsTextBox.focus();
                    return false;
                }
                return true;
            },

            /**
             * This function is used to get selected date type and values
             */
            _getValues: function () {
                var isValid = true;
                var relativeDatesData = {
                    "value": {}
                };
                if (this.fixedRadioButton.checked) {
                    if (this.customRadioButton.checked) {
                        isValid = this._validateFixedDate();
                        if (isValid) {
                            relativeDatesData.dateType = "fixed";
                            relativeDatesData.dateTime =
                                presetUtils.getDateFieldValue({ "type": "esriFieldTypeDate" },
                                    [this.dateTextBox, this.timeTextBox]);
                        }
                    }
                    if (this.selectValueRadioButton.checked) {
                        relativeDatesData.dateType = "fixed";
                        if (this._getChooseFromLayerInfo()) {
                            relativeDatesData.chooseFromLayerInfo = this._getChooseFromLayerInfo();
                        } else {
                            relativeDatesData.chooseFromLayerInfo = null;
                        }
                        if (relativeDatesData.chooseFromLayerInfo && relativeDatesData.chooseFromLayerInfo.selectedValue) {
                            var dateValue = relativeDatesData.chooseFromLayerInfo.selectedValue;
                            if (new Date(dateValue) != "Invalid Date") {
                                relativeDatesData.dateTime = this._convertToEpoch(new Date(dateValue));
                            } else {
                                relativeDatesData.dateTime = parseInt(dateValue);
                            }
                        }
                    }
                } else if (this.currentRadioButton.checked) {
                    relativeDatesData.dateType = "current";
                } else if (this.PastRadioButton.checked) {
                    isValid = this._validatePastOrFutureDate();
                    if (isValid) {
                        relativeDatesData = this._getValuesOfPastOrFutureDijits();
                        relativeDatesData.dateType = "past";
                    }
                } else if (this.futureRadioButton.checked) {
                    isValid = this._validatePastOrFutureDate();
                    if (isValid) {
                        relativeDatesData = this._getValuesOfPastOrFutureDijits();
                        relativeDatesData.dateType = "future";
                    }
                }
                if (isValid) {
                    return relativeDatesData;
                }
                return isValid;
            },

            /**
             * This function is used to make select value popup accessible
             */
            _support508ForSelectValuePopUp: function () {
                var popUpCancelButton = query(".jimu-btn-vacation", this.selectValuePopup.domNode)[0];
                jimuUtils.initFirstFocusNode(this.selectValuePopup.domNode, this.selectValuePopup.closeBtnNode);
                focusUtils.focus(this.selectValuePopup.closeBtnNode);
                jimuUtils.initLastFocusNode(this.selectValuePopup.domNode, popUpCancelButton);
            },

            /**
             * This function is used to set value of dijit
             */
            _setValue: function () {
                var prevValue;
                if (this.relativeDates.dateType === "fixed") {
                    this.fixedRadioButton.domNode.click();
                    if (this.relativeDates.hasOwnProperty("chooseFromLayerInfo")) {
                        this.selectValueRadioButton.domNode.click();
                    } else {
                        this.customRadioButton.domNode.click();
                        prevValue = new Date(parseInt(this.relativeDates.dateTime, 10));
                        this.dateTextBox.set("value", prevValue);
                        this.timeTextBox.set("value", prevValue);
                    }
                }
                if (this.relativeDates.dateType === "current") {
                    this.currentRadioButton.domNode.click();
                }
                if (this.relativeDates.dateType === "past") {
                    this.PastRadioButton.domNode.click();
                    this._setValuesOfPastOrFutureDijits();
                }
                if (this.relativeDates.dateType === "future") {
                    this.futureRadioButton.domNode.click();
                    this._setValuesOfPastOrFutureDijits();
                }
            },

            /**
             * This function is used to set values of dijit related to past or future date
             */
            _setValuesOfPastOrFutureDijits: function () {
                this.yearsTextBox.set("value", this.relativeDates.year);
                this.monthsTextBox.set("value", this.relativeDates.month);
                this.daysTextBox.set("value", this.relativeDates.day);
                this.hoursTextBox.set("value", this.relativeDates.hour);
                this.minutesTextBox.set("value", this.relativeDates.minute);
                this.secondsTextBox.set("value", this.relativeDates.second);
            },

            _getValuesOfPastOrFutureDijits: function () {
                var relativeDatesData = {};
                relativeDatesData.year = this.yearsTextBox.value;
                relativeDatesData.month = this.monthsTextBox.value;
                relativeDatesData.day = this.daysTextBox.value;
                relativeDatesData.hour = this.hoursTextBox.value;
                relativeDatesData.minute = this.minutesTextBox.value;
                relativeDatesData.second = this.secondsTextBox.value;
                return relativeDatesData;
            },

            /**
             * This function is used check textboxes with zero values
             */
            _checkTextboxesWithZeroValue: function () {
                if(this.yearsTextBox.value !== 0) {
                    return false;
                }
                if(this.monthsTextBox.value !== 0) {
                    return false;
                }
                if(this.daysTextBox.value !== 0) {
                    return false;
                }
                if(this.hoursTextBox.value !== 0) {
                    return false;
                }
                if(this.minutesTextBox.value !== 0) {
                    return false;
                }
                if(this.secondsTextBox.value !== 0) {
                    return false;
                }
                return true;
            },

            /**
             * This function is used to if all textbox has 0 value show warning container
             * else hide it
             */
            _showOrHideWarningContainer: function () {
                if (this._checkTextboxesWithZeroValue()) {
                    domClass.remove(this.relativeDateWarningContainer, "esriCTHidden");
                } else {
                    domClass.add(this.relativeDateWarningContainer, "esriCTHidden");
                }
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
                if (this.relativeDates && this.relativeDates.chooseFromLayerInfo && this.relativeDates.chooseFromLayerInfo.layerId && this._isFirsTime) {
                    var selectedLayerInfo = this.layerInfos.getLayerInfoById(this.relativeDates.chooseFromLayerInfo.layerId);
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
                dateLayerfilter = this._createDateLayerfilter();

                //combine both the filters
                return LayerChooserFromMap.andCombineFilters([combinedFilter, dateLayerfilter]);
            },

            _createDateLayerfilter: function () {
                return function (layerInfo) {
                    var defLayerObject = layerInfo.getLayerObject();
                    var hasValidField = false;
                    defLayerObject.then(function (layerObject) {
                        if (layerObject && layerObject.fields) {
                            array.some(layerObject.fields, function (field) {
                                if (field.type === "esriFieldTypeDate") {
                                    hasValidField = true;
                                    return true;
                                }
                            });
                        }
                    });
                    return hasValidField;
                };
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
                    this.fieldsDropdown.set("value", this.fieldsDropdown.options[0]);
                }

                if (this.relativeDates &&  this.relativeDates.chooseFromLayerInfo && this.relativeDates.chooseFromLayerInfo.field && this._isFirsTime) {
                    this.fieldsDropdown.set("value", this.relativeDates.chooseFromLayerInfo.field);
                }
                this._updateLabelForDomainField(this.selectedPresetValue);

                //Event handler for layerSelector
                this.own(on(this.layerSelector, "selection-change", lang.hitch(this, function () {
                    this._addLayerFieldsOptions();
                })));
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
                var selectedLayer, options;
                options = [];
                validFieldSet = [];
                if (this.layerSelector.getSelectedItem()) {
                    selectedLayer = this.layerSelector.getSelectedItem().layerInfo.layerObject;
                    array.forEach(selectedLayer.fields, lang.hitch(this, function (currentField) {
                        if (currentField.type === "esriFieldTypeDate") {
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
                if (!item || !item.layerInfo || !item.layerInfo.layerObject) {
                    return;
                }
                //get selected layer
                var layerInfo = item.layerInfo;
                var selectedLayer = layerInfo.layerObject;

                //reset prev objects of valueProviderFactory and valueProvider
                if (this.valueProviderFactory) {
                    this.valueProviderFactory = null;
                }
                if (this.valueProvider) {
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
                if (selectedFieldInfo.type === "esriFieldTypeDate") {
                    shortType = "date";
                    operator = "dateOperatorIsOn";
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
                    interactiveObj: '',
                    caseSensitive: false,
                    valueObj: {
                        type: "unique"
                    }
                };
                //get value provider and show in UI
                this.valueProvider = this.valueProviderFactory.getValueProvider(partObj, false);
                this.own(on(this.valueProvider, "change", lang.hitch(this, function () {
                    //if domain field is selected for date data type
                    var selectedValue = this.valueProvider.getPartObject() &&
                        this.valueProvider.getPartObject().valueObj.value;
                    this._updateLabelForDomainField(selectedValue);
                })));
                if (this.valueProvider) {
                    if (this.valueProvider.promptLabel) {
                        domClass.add(this.valueProvider.promptLabel, "esriCTHidden");
                    }
                    this.valueProvider.placeAt(this.valueProviderContainer);
                    if (this.relativeDates && this.relativeDates.chooseFromLayerInfo && this.relativeDates.chooseFromLayerInfo.selectedValue && this._isFirsTime) {
                        partObj.valueObj.value = this.relativeDates.chooseFromLayerInfo.selectedValue;
                        this._isFirsTime = false;
                    }
                    this.valueProvider.setValueObject(partObj.valueObj);
                    this.initialValue = partObj.valueObj.value ? partObj.valueObj.value : "";
                }
            },

            /**
             * This function is used to display corsponding content on change of date value option
             */
            _dateValueOptionChange: function () {
                if (this.customRadioButton.checked) {
                    domClass.remove(this.customOptionContentNode, "esriCTHidden");
                    domClass.add(this.selectValueOptionContentNode, "esriCTHidden");
                }
                if (this.selectValueRadioButton.checked) {
                    domClass.remove(this.selectValueOptionContentNode, "esriCTHidden");
                    domClass.add(this.customOptionContentNode, "esriCTHidden");
                }
            },

            /**
             * This function is used to get choose from layerInfo
             */
            _getChooseFromLayerInfo: function () {
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
                        selectedValue = ""
                    }
                    //emit the selected value
                    return {
                        layerId: this.layerSelector.getSelectedItem().layerInfo.layerObject.id,
                        field: this.fieldsDropdown.getValue(),
                        selectedValue: selectedValue
                    }
                }
            },

            /**
             * This function is used to covert date to epoch
             */
            _convertToEpoch: function (dateObj) {
                var newFieldVal;
                if (dateObj) {
                    newFieldVal = new Date(
                        dateObj.getFullYear(),
                        dateObj.getMonth(),
                        dateObj.getDate(),
                        dateObj.getHours(),
                        dateObj.getMinutes(),
                        dateObj.getSeconds(),
                        dateObj.getMilliseconds()
                    );
                }
                else {
                    newFieldVal = dateObj || null;
                }

                newFieldVal = (newFieldVal && newFieldVal.getTime) ?
                    newFieldVal.getTime()
                    : (newFieldVal && newFieldVal.toGregorian ? newFieldVal.toGregorian().getTime() : newFieldVal);

                return newFieldVal;
            },

            _updateLabelForDomainField: function (selectedValue) {
                var selectedValueLabel, layerInfo, field, selectedLayerItem;
                var selectedDateInfo = {
                    dateType: "fixed",
                    dateTime: ""
                };
                selectedLayerItem = this.layerSelector ? this.layerSelector.getSelectedItem() : null;
                if (selectedLayerItem && selectedLayerItem.layerInfo &&
                    selectedLayerItem.layerInfo.layerObject) {
                    layerInfo = selectedLayerItem.layerInfo.layerObject;
                    field = layerInfo.getField(this.fieldsDropdown.getValue());
                    if (field.domain && field.type === "esriFieldTypeDate") {
                        array.some(field.domain.codedValues, lang.hitch(this, function (codedDomain) {
                            if (selectedValue == codedDomain.code) {
                                var dateValue = new Date(selectedValue);
                                if (dateValue != "Invalid Date") {
                                    selectedDateInfo.dateTime = this._convertToEpoch(dateValue);
                                } else {
                                    selectedDateInfo.dateTime = parseInt(selectedValue);
                                }
                                selectedValueLabel = string.substitute(
                                    this.nls.relativeDates.domainFieldHintLabel,
                                    {
                                        domainValue: presetUtils.getDateFromRelativeInfo(selectedDateInfo, true)
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
            }
        });
    });