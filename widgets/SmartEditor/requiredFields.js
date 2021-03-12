define(
  ["dojo/_base/declare",
    "dojo/Evented",
    "dojo/_base/lang",
    "dojo/text!./requiredFields.html",
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    "jimu/dijit/Popup",
    'dojo/dom-construct',
    'dojo/_base/array',
    'dojo/string',
    'dojo/dom-style',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-attr'
  ],
  function (
    declare,
    Evented,
    lang,
    template,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    Popup,
    domConstruct,
    array,
    String,
    domStyle,
    on,
    domClass,
    domAttr
  ) {
    return declare([BaseWidgetSetting, Evented, _WidgetsInTemplateMixin], {
      baseClass: "jimu-widget-smartEditor-requiredFields",
      templateString: template,
      fieldsPopup: null, // to store popup instance
      nodes: [],
      postCreate: function () {
        this.nodes = [];
        this._createPopupContent();
        this._createPopUp();
      },

      /**
       * This function is used to create Popup Content UI
       */
      _createPopupContent: function () {
        array.forEach(this.requiredFieldsInfos, lang.hitch(this, function (fieldInfos) {
          var fieldName = fieldInfos.alias ? fieldInfos.alias : fieldInfos.name;
          var fieldContainer = domConstruct.create("div", {
            class: "esriCTFieldContainer esriCTMarginLeft15"
          }, this.fieldsDijitContainer);
          var fieldNameAndRecordCount = String.substitute(this.nls.requiredFields.foundNullRecordCount, {
            fieldName: fieldName,
            count: this.AttributesCount[fieldInfos.name]
          });
          //Create field label
          domConstruct.create("div", {
            innerHTML: fieldNameAndRecordCount,
            class: "esriCTFieldName"
          }, fieldContainer);
          var nodes = this.presetUtils.createPresetFieldContentNode(fieldInfos);
          this.nodes.push(nodes);
          if (nodes.length > 0) {
            array.forEach(nodes, lang.hitch(this, function (node) {
              domStyle.set(node, "width", "100%");
              domAttr.set(node, "aria-label", fieldName);
              node.placeAt(domConstruct.create("div", { style: "width:90%" }, fieldContainer));
              node.startup();
            }));
          }
          function getNode() {
            return nodes;
          }
          if (nodes[0].hasOwnProperty("fieldType") && ["richtext", "textarea"].indexOf(nodes[0].fieldType) !== -1) {
            on(nodes[0], "change",
              lang.hitch(this, function (value) {
                var node = getNode();
                if (value === "" || value === null || value === undefined) {
                  domClass.add(node[0].domNode, "ee-error");
                  node[0].focusNode.focus();
                } else {
                  domClass.remove(node[0].domNode, "ee-error");
                }
              }));
          }
        }));
      },

      /**
      * Create and Show popup
      * @memberOf widgets/SmartEditor/requiredFields
      **/
      _createPopUp: function () {
        this.fieldsPopup = new Popup({
          "titleLabel": this.nls.requiredFields.popupTittle,
          "width": 400,
          "maxHeight": 300,
          "autoHeight": true,
          "class": this.baseClass,
          "content": this,
          "buttons": [{
            label: this.nls.ok,
            id: "okButton",
            onClick: lang.hitch(this, function () {
              var isValid = this._validateFieldsDijits();
              if (isValid) {
                this._getRequiredFieldsEnteredvalues();
                this.fieldsPopup.close();
              }
            })
          }, {
            label: this.nls.cancel,
            id: "cancelButton",
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {
              this.emit("cancelButtonClicked");
              this.fieldsPopup.close();
            })
          }]
        });
      },

      /**
      * To get required fields entered values
      * @memberOf widgets/SmartEditor/requiredFields
      **/
      _getRequiredFieldsEnteredvalues: function () {
        var providedAttrValuesObj = {};
        array.forEach(this.nodes, lang.hitch(this, function (node) {
          var fieldNameKey = node[0].name;
          if (node[0].hasOwnProperty("fieldType") && node[0].fieldType === "date") {
            //for only date
            if (node.length === 1) {
              providedAttrValuesObj[fieldNameKey] = new Date(node[0].getValue()).getTime();
            } else {
              //for date and time
              var datePart = node[0].getValue().toDateString();
              var timePart = node[1].getValue().toTimeString();
              providedAttrValuesObj[fieldNameKey] = new Date(datePart + " " + timePart).getTime();
            }
          } else {
            if (node[0].hasOwnProperty("fieldType") && ["richtext", "textarea"].indexOf(node[0].fieldType) !== -1) {
              //for richtext and textarea fields
              var fieldLength = this.presetUtils.getFieldInfoByFieldName(this.requiredFieldsInfos, node[0].name).length;
              //if entered value length is greater than field lenght then truncate value
              var nodeValue = node[0].getValue();
              if (nodeValue.length > fieldLength) {
                nodeValue = nodeValue.slice(0, fieldLength);
              }
              providedAttrValuesObj[fieldNameKey] = nodeValue;
            } else {
              providedAttrValuesObj[fieldNameKey] = node[0].getValue();
            }
          }
        }));
        this.emit("providedValuesToRequiredFields", providedAttrValuesObj);
      },

      /**
      * To validate popup dijits
      * @memberOf widgets/SmartEditor/requiredFields
      **/
      _validateFieldsDijits: function () {
        var isValid = true;
        array.some(this.nodes, lang.hitch(this, function (node) {
          if (node[0].hasOwnProperty("fieldType") && ["richtext", "textarea"].indexOf(node[0].fieldType) !== -1) {
            //for richtext and textarea fields
            if (node[0].getValue() === "" || node[0].getValue() === null || node[0].getValue() === undefined) {
              //value is blank or null then add error class and focus
              domClass.add(node[0].domNode, "ee-error");
              isValid = false;
              node[0].focusNode.focus();
              return true;
            }
          } else {
            if (!node[0].isValid()) {
              isValid = false;
              node[0].focus();
              return true;
            }

            if (node.length > 1 && !node[1].isValid()) {
              //for time
              isValid = false;
              node[1].focus();
              return true;
            }
          }
        }));
        return isValid;
      }
    });
  });