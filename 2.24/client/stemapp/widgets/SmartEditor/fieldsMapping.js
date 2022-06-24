define(
  ["dojo/_base/declare",
    "dojo/Evented",
    "dojo/_base/lang",
    "dojo/text!./fieldsMapping.html",
    './fieldMap',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    "jimu/dijit/Popup",
    'dojo/dom-construct',
    'dojo/_base/array',
    'dojo/on',
    'jimu/dijit/CheckBox'
  ],
  function (
    declare,
    Evented,
    lang,
    template,
    fieldMap,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    Popup,
    domConstruct,
    array,
    on,
    CheckBox
  ) {
    return declare([BaseWidgetSetting, Evented, _WidgetsInTemplateMixin], {
      baseClass: "jimu-widget-smartEditor-fieldsMapping",
      templateString: template,
      fieldsPopup: null, // to store popup instance
      nodes: [],
      fieldMapBySourceLayer: {},
      postCreate: function () {
        this.nodes = [];
        this.own(on(window, "resize", lang.hitch(this, function () {
          this._setFieldPopupDimensions();
        })));
        this.fieldMapBySourceLayer = {};
        this.valuesOverrideCheckbox = new CheckBox({
          label: this.nls.fieldsMapping.fieldsMatchingCheckboxLabel,
          class: 'esriCTFieldCheckbox',
          'aria-label': this.nls.fieldsMapping.fieldsMatchingCheckboxLabel
        }, this.fieldsMatchingCheckboxNode);
        //Set the check box value
        if (this.overrideDefaultsByCopiedFeature) {
          this.valuesOverrideCheckbox.setValue(this.overrideDefaultsByCopiedFeature);
        }
        this._addFieldMapping();
        this._createPopUp();
      },


      /**
      * Create and Show popup
      * @memberOf widgets/SmartEditor/fieldsMapping
      **/
      _createPopUp: function () {
        this.fieldsPopup = new Popup({
          "titleLabel": this.nls.fieldsMapping.popupTittle,
          "width": 600,
          "autoHeight": true,
          "class": this.baseClass,
          "content": this,
          "buttons": [{
            label: this.nls.apply,
            id: "okButton",
            onClick: lang.hitch(this, function () {
              //update field mapping in the fieldMappingDetails object and raise event
              for (var sourceLayerId in this.fieldMapBySourceLayer) {
                var fieldMapData = this.fieldMapBySourceLayer[sourceLayerId].getMatchedFields();
                if (!this.fieldMappingDetails.hasOwnProperty(this.targetLayerDetails.id)) {
                  this.fieldMappingDetails[this.targetLayerDetails.id] = {};
                }
                this.fieldMappingDetails[this.targetLayerDetails.id][sourceLayerId] = fieldMapData;
              }
              //emit checkBox's new state in and updated field mapping details
              this.emit('field-mapping-changed', {
                fieldMappingDetails: this.fieldMappingDetails,
                overrideDefaultsByCopiedFeature: this.valuesOverrideCheckbox.getValue()
              });
              this.fieldsPopup.close();
            })
          }, {
            label: this.nls.cancel,
            id: "cancelButton",
            onClick: lang.hitch(this, function () {
              this.emit("cancelButtonClicked");
              this.fieldsPopup.close();
            })
          }]
        });
        this._setFieldPopupDimensions();
      },

      _addFieldMapping: function () {
        array.forEach(this.sourceLayerDetails, lang.hitch(this, function (sLayerDetails) {
          this.fieldMapBySourceLayer[sLayerDetails.id] = new fieldMap({
            nls: this.nls,
            sourceLayerDetails: sLayerDetails,
            targetLayerDetails: this.targetLayerDetails,
            openOnLoad: this.sourceLayerDetails.length === 1 ? true : false,
            fieldMappingDetails: this.fieldMappingDetails,
            usePresetValues: this.usePresetValues,
          }, domConstruct.create('div', {
            'class': 'esriCTBottomSpacing'
          }, this.fieldsMappingContainer));
        }));
      },

      /**
      * Create and Show popup
      * @memberOf widgets/SmartEditor/fieldsMapping
      * Set popup fields dimensions
      **/
      _setFieldPopupDimensions: function () {
        if (this.fieldsPopup) {
          //If app is running in mobile mode, change the field selector popup dimensions
          if (window.appInfo.isRunInMobile) {
            this.fieldsPopup.set("width", window.innerWidth - 100);
          } else {
            //Reset the field selector popup dimensions to default
            this.fieldsPopup.set("width", 600);
          }
        }
      }
    });
  });
