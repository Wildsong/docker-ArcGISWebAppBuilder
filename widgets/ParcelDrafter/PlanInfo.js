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
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./PlanInfo.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/Evented',
  'dojo/dom-attr',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/query',
  'dijit/registry',
  'dijit/form/ValidationTextBox',
  'dojo/store/Memory',
  'dijit/form/ComboBox',
  'dojo/on',
  'esri/geometry/Polyline',
  'esri/graphic',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/dijit/AttributeInspector',
  'esri/layers/FeatureLayer',
  'jimu/dijit/Message',
  './geometryUtils',
  'jimu/utils',
  'jimu/LayerInfos/LayerInfos',
  'dojo/keys',
  'dojo/aspect'
],
  function (
    declare,
    BaseWidget,
    _WidgetsInTemplateMixin,
    PlanInfoTemplate,
    lang,
    array,
    Evented,
    domAttr,
    domConstruct,
    domClass,
    domStyle,
    query,
    registry,
    ValidationTextBox,
    Memory,
    ComboBox,
    on,
    Polyline,
    Graphic,
    Query,
    QueryTask,
    AttributeInspector,
    FeatureLayer,
    Message,
    geometryUtils,
    jimuUtils,
    LayerInfos,
    keys,
    aspect
  ) {
    return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
      baseClass: 'jimu-widget-ParcelDrafter-PlanInfo',
      templateString: PlanInfoTemplate,
      _itemList: null, // to store parcel lines
      _polygonLayer: null, // to store parcel polygon layer
      parcelNameTextBox: null, // to store parcel name textbox
      planNameTextBox: null, // to store plan name textbox
      documentTypeControl: null, // to store document type dropdown
      planSettings: null, // to store plan settings
      _savedPolygonObjectId: null, //to store object id of the saved polygon
      _savedPolyLines: null, //to store array of parcel lines
      fieldInfosForPolygonLayer: null, //array to store field infos for attribute inspector

      constructor: function (options) {
        lang.mixin(this, options);
      },

      postCreate: function () {
        this.inherited(arguments);
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (operLayerInfos) {
            this._layerInfosObj = operLayerInfos;
            this._init();
          }));
      },

      _init: function () {
        //get field infos
        var fieldInfos = this._getFieldInfosForPolygonLayer();
        //If no field infos found hide attribute list section completely
        if (fieldInfos.length > 0) {
          this._addGraphicToLocalLayer();
          //if lst tile is configured use it 
          //else get the layers name and use it for title
          if (this.config.polygonLayer.attributeListTitle) {
            var configuredValue =  jimuUtils.sanitizeHTML(this.config.polygonLayer.attributeListTitle);
            domAttr.set(this.attributeListTitle, "innerHTML", configuredValue);
          } else {
            //get layer info 
            var projectLayerInfo = this._layerInfosObj.getLayerInfoById(this.config.polygonLayer.id);
            domAttr.set(this.attributeListTitle, "innerHTML", projectLayerInfo.layerObject.name);
          }
        } else {
          domClass.add(this.expandCollapseParentNode, "esriCTHidden");
        }
        domClass.add(this.domNode, "esriCTFullWidth");
        // //if valid documentType field is configured then only create node for it
        // if (this.config.polygonLayer.documentType.hasOwnProperty('name')) {
        //   //remove the class so that it will be visible now
        //   //domClass.remove(this.documentTypeRow, "esriCTHidden");
        //   this._createDocumentTypeControl();
        // }
        // if (this.config.polygonLayer.parcelName.hasOwnProperty('name')) {
        //   //    domClass.remove(this.parcelNameRow, "esriCTHidden");
        //   this.parcelNameTextBox = this._createFieldInputs(
        //     this.config.polygonLayer.parcelName,
        //     this.parcelName,
        //     this.nls.planInfo.parcelNamePlaceholderText,
        //     !this.config.polygonLayer.parcelName.nullable);
        // }
        // if (this.config.polygonLayer.planName.hasOwnProperty('name')) {
        //   //    domClass.remove(this.planNameRow, "esriCTHidden");
        //   this.planNameTextBox = this._createFieldInputs(
        //     this.config.polygonLayer.planName,
        //     this.planName,
        //     this.nls.planInfo.planNamePlaceholderText,
        //     !this.config.polygonLayer.planName.nullable);
        // }
        //Handle click event of cancel button
        this.own(on(this.planInfoCancelButton, "click",
          lang.hitch(this, function () {
            this.emit("cancelTraversedParcel");
          })));
        //code for accessibility
        this.own(on(this.planInfoCancelButton, "keydown",
          lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this.emit("cancelTraversedParcel");
            }
          })));

        // Handle click event of save button
        this.own(on(this.planInfoSaveButton, "click",
          lang.hitch(this, function () {
            this.emit("saveTraversedParcel");
          })));
        //code for accessibility
        this.own(on(this.planInfoSaveButton, "keydown",
          lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this.emit("saveTraversedParcel");
            }
          })));

        //Handle click event of delete button
        this.own(on(this.planInfoDeleteButton, "click",
          lang.hitch(this, this.deleteParcel)));
        //code for accessibility
        this.own(on(this.planInfoDeleteButton, "keydown",
          lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this.deleteParcel();
            }
          })));

        //Handle click event of show/hide attribute list button
        this.own(on(this.expandCollapseNode, "click", lang.hitch(this,
          this._onExpandCollapseClicked)));
        //code for accessibility
        this.own(on(this.expandCollapseNode, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            //prevent default so that scrollbar should not get scrolled
            evt.preventDefault();
            this._onExpandCollapseClicked();
          }
        })));
      },

      /**
       * Callback handler for show/hide attribute button click
       * @memberOf widgets/ParcelDrafter/PlanInfo
       */
      _onExpandCollapseClicked: function () {
        domClass.toggle(this.expandCollapseNode, "esriCTCollapsedParceLayer");
        domClass.toggle(this.attributeListNode, "esriCTHidden");
        var tooltip = this.nls.planInfo.showAttributeList;
        //based on state set the aria-label and title for the arrow button
        if (domClass.contains(this.expandCollapseNode, "esriCTCollapsedParceLayer")) {
          tooltip = this.nls.planInfo.hideAttributeList;
        }
        domAttr.set(this.expandCollapseNode, "aria-label", tooltip);
        domAttr.set(this.expandCollapseNode, "title", tooltip);
      },

      /**
      * Reset the values in ParcelName, PlanName & DocumentType control
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      resetValues: function () {
        //hide attribute list if it is opened
        if (domClass.contains(this.expandCollapseNode, "esriCTCollapsedParceLayer")) {
          this._onExpandCollapseClicked();
        }
        //resets the attribute inspector
        this._addGraphicToLocalLayer();
        // reset parcel name
        if (this.parcelNameTextBox) {
          this.parcelNameTextBox.set("value", "");
        }
        // reset plan name
        if (this.planNameTextBox) {
          this.planNameTextBox.set("value", "");
        }
        // reset document type
        if (this.documentTypeControl) {
          //if it has domain reset combobox else empty text in textbox
          if (this.config.polygonLayer.documentType.domain) {
            this.documentTypeControl.set("item", null);
          } else {
            this.documentTypeControl.set('value', "");
          }
        }
        // hide delete button
        domClass.add(this.planInfoDeleteButton, "esriCTHidden");
      },

      /**
      * Emit the showMessage event
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _showMessage: function (msg) {
        this.emit("showMessage", msg);
      },

      /**
      * Creates Combobox/Textbox based on if field has domain
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createDocumentTypeControl: function () {
        //if it has domain show combobox else create textbox
        if (this.config.polygonLayer.documentType.domain) {
          this.documentTypeControl = this._createFieldSelect(
            this.config.polygonLayer.documentType,
            this.documentType,
            this.nls.planInfo.parcelDocumentTypeText,
            !this.config.polygonLayer.documentType.nullable);
          // to validate whether value searched by user in document type dropdown is valid or not.
          this.own(on(this.documentTypeControl, "change",
            lang.hitch(this, function (newValue) {
              if (newValue !== "" && newValue !== null && newValue !== undefined) {
                var foundValue;
                foundValue = this.documentTypeControl.store.data.some(function (dataObject) {
                  return dataObject.name === newValue;
                });
                if (!foundValue) {
                  this.documentTypeControl.set("item", null);
                  this._showMessage(this.nls.planInfo.enterValidDocumentTypeMessage);
                }
              }
            })));
        } else {
          this.documentTypeControl = this._createFieldInputs(
            this.config.polygonLayer.documentType,
            this.documentType,
            this.nls.planInfo.parcelDocumentTypeText,
            !this.config.polygonLayer.documentType.nullable);
        }
      },
      /**
      * Creates input fields
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createFieldInputs: function (field, nodeContainer, placeHolderText, isRequired) {
        if (field.alias) {
          placeHolderText = field.alias;
        }
        if (isRequired) {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.requiredText;
        } else {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.optionalText;
        }
        var inputTextBox = new ValidationTextBox({
          placeHolder: placeHolderText,
          "class": "esriCTFullWidth",
          required: isRequired,
          "aria-label": placeHolderText //code for accessibility
        });
        //if selected field is numeric set the validator to accept numbers only
        if (this.numberFieldTypes.indexOf(field.type) >= 0) {
          inputTextBox.validator = lang.hitch(this, function (value) {
            if (value !== "" &&
              !this.validateNumericField(value, field.type)) {
              return false;
            }
            return true;
          });
        }
        inputTextBox.placeAt(nodeContainer);
        return inputTextBox;
      },

      /**
      * Creates combobox fields for document type
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createFieldSelect: function (field, nodeContainer, placeHolderText, isRequired) {
        var docTypeDataArr, documentTypeStore;
        docTypeDataArr = this._createDocTypeDataArr();
        documentTypeStore = new Memory({ data: docTypeDataArr });
        if (field && field.alias) {
          placeHolderText = field.alias;
        }
        if (isRequired) {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.requiredText;
        } else {
          placeHolderText = placeHolderText + " " + this.nls.planInfo.optionalText;
        }
        this.selectBox = new ComboBox({
          placeHolder: placeHolderText,
          "class": "esriCTFullWidth",
          required: isRequired,
          store: documentTypeStore
        }, nodeContainer);
        //code for accessibility
        domAttr.set(this.selectBox.domNode, "aria-label", placeHolderText);
        domAttr.set(this.selectBox.domNode, "role", "combobox");
        domAttr.set(this.selectBox.domNode, "aria-expanded", "false");
        aspect.after(this.selectBox, "loadAndOpenDropDown", lang.hitch(this, function () {
          domAttr.set(this.selectBox.domNode, "aria-expanded", "true");
        }));
        aspect.after(this.selectBox, "closeDropDown", lang.hitch(this, function () {
          domAttr.set(this.selectBox.domNode, "aria-expanded", "false");
        }));
        return this.selectBox;
      },

      /**
      * create data-array for combobox
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createDocTypeDataArr: function () {
        var options = [];
        if (this.config.polygonLayer.documentType.domain.codedValues) {
          array.forEach(this.config.polygonLayer.documentType.domain.codedValues,
            lang.hitch(this, function (domainValue) {
              options.push({ name: domainValue.name, id: domainValue.code });
            }));
        }
        return options;
      },

      /**
      * This function is used to save parcel polygon, polyline.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      saveData: function (dataObj) {
        //check if parcel is closed or not,
        //if it is not closed confirm if still user wants to save the parcel.
        if (dataObj.miscloseDetails &&
          (dataObj.miscloseDetails.LengthConversions.meters === 0 || dataObj.appliedCompassRule)) {
          this._saveParcel(dataObj);
        } else {
          var confirmationBox;
          confirmationBox = new Message({
            message: this.nls.planInfo.saveNonClosedParcelConfirmationMessage,
            type: "question",
            buttons: [{
              "label": this.nls.common.yes,
              "onClick": lang.hitch(this, function () {
                confirmationBox.close();
                this._saveParcel(dataObj);
              })
            }, { "label": this.nls.common.no }]
          });
        }
      },

      /**
      * This function is used to save polygon parcel.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _saveParcel: function (dataObj) {
        this._itemList = dataObj.itemList;
        this.planSettings = dataObj.planSettings;
        //If polygonDeleteArr is zero means saving new feature
        if (dataObj.polygonDeleteArr.length === 0) {
          this._createPolygonData(dataObj);
        } else {
          this._deletePolygonBeforeSaving(dataObj);
        }
      },

      /**
      * This function is used to create polygon geometry according to boundary lines.
      * it will also save graphic on graphicLayer and return the graphic geometry.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createParcelPolygon: function () {
        var i, j, boundaryLinesArray, lineFeatures, parcelPolygon, polygonGraphic;
        boundaryLinesArray = [];
        lineFeatures = this.parcelLinesGraphicsLayer.graphics;
        //loop through all the line features and only consider boundary lines for creating polygon
        for (i = 0; i < this._itemList.length; i++) {
          //Add if it is boundary lines in array
          if (this._itemList[i].LineSymbol.type === this.config.BoundaryLineType) {
            for (j = 0; j < this._itemList[i].graphic.geometry.paths.length; j++) {
              boundaryLinesArray.push(this._itemList[i].graphic.geometry.paths[j]);
            }
          }
        }
        //create polygon geometry and add it to the graphic layer
        if (boundaryLinesArray.length > 0) {
          //create the parcel polygon with the lines spatialReference
          parcelPolygon = geometryUtils.getPolygonFromPolyLines(
            boundaryLinesArray, false, true, lineFeatures[0].geometry.spatialReference);
          if (parcelPolygon) {
            this.parcelPolygonGraphicsLayer.clear();
            polygonGraphic = new Graphic(parcelPolygon);
            this.parcelPolygonGraphicsLayer.add(polygonGraphic);
            parcelPolygon = this.parcelPolygonGraphicsLayer.graphics[0].geometry;
          }
        }
        return parcelPolygon;
      },

      /**
      * This function is used to create polygon & modify its data before saving.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createPolygonData: function (dataObj) {
        var addsFeatureArr, attributes, polygon, selectedDocumentType, polygonGraphic, units;
        this.loading.show();
        addsFeatureArr = [];
        attributes = {};
        units = this.polygonLayerUnit;
        //get selected document type from dropdown
        selectedDocumentType = null;
        if (this.documentTypeControl) {
          if (this.config.polygonLayer.documentType.domain) {
            if (this.documentTypeControl.hasOwnProperty("item") &&
              this.documentTypeControl.item &&
              this.documentTypeControl.item.hasOwnProperty("id")) {
              selectedDocumentType = this.documentTypeControl.item.id;
            }
          } else if (this.documentTypeControl.get('value') !== "") {
            selectedDocumentType = this.documentTypeControl.get('value');
          }
        }
        //Now updated logic to store parecl polygon in all cases (closed/unclosed) parcels
        //in case of unclosed(open) parcel the polygon geometry will be null 
        var emptyPolygon = false;
        //if parcel is closed get the parcel polygon else make it empty
        if (dataObj.miscloseDetails &&
          (dataObj.miscloseDetails.LengthConversions.meters === 0 || dataObj.appliedCompassRule)) {
          //get the parcel polygon from boundary lines
          polygon = this._createParcelPolygon();
        } else {
          polygon = {};
          emptyPolygon = true;
        }
        if (polygon) {
          if (emptyPolygon) {
            polygon = null;
          }
          //get attributes from  attribute inspector
          if (this._currentFeatureDetails && this._currentFeatureDetails.attributes) {
            attributes = lang.clone(this._currentFeatureDetails.attributes);
          }
          //add required parameters of the polygon
          attributes[this.config.polygonLayer.rotation.name] = dataObj.rotation;
          attributes[this.config.polygonLayer.scale.name] = dataObj.scale;
          //store misclose details only when available
          //for unclosed parcels(open parcel) this will be null
          if (dataObj.miscloseDetails) {
            attributes[this.config.polygonLayer.miscloseRatio.name] =
              dataObj.miscloseDetails.miscloseValue;
            attributes[this.config.polygonLayer.miscloseDistance.name] =
              this._getValueAccToFeatureLayerUnit(
                units, dataObj.miscloseDetails, "LengthConversions");
          }
          //Add optional parameters of polygon if they are configured
          if (this.config.polygonLayer.statedArea.hasOwnProperty('name')) {
            attributes[this.config.polygonLayer.statedArea.name] = dataObj.statedArea;
          }
          /*
          if (this.parcelNameTextBox) {
            attributes[this.config.polygonLayer.parcelName.name] =
              this.parcelNameTextBox.get("value");
          }
          if (this.planNameTextBox) {
            attributes[this.config.polygonLayer.planName.name] =
              this.planNameTextBox.get("value");
          }
          if (this.documentTypeControl) {
            attributes[this.config.polygonLayer.documentType.name] = selectedDocumentType;
          }
          */
          //create polygon graphic and save parcel polygon
          polygonGraphic = new Graphic(polygon, null, attributes);
          addsFeatureArr.push(polygonGraphic);
          this._saveParcelPolygon(addsFeatureArr);
        } else {
          this._showMessage(this.nls.planInfo.unableToCreatePolygonParcel);
        }
      },

      /**
      * This function is used to set parcel information like
      * ParcelName, PlanName, DocumentType while editing traverse.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      setParcelInformation: function (polygon, polyLines) {
        var documentTypeValue;
        //get polygon layers object id field
        var polygonLayerObjIdField = this.map.getLayer(this.config.polygonLayer.id).objectIdField;
        //set the parcel polygon object id
        this._savedPolygonObjectId = polygon[0].attributes[polygonLayerObjIdField];
        //in edit mode use attributes 
        var prevAttributes = lang.clone(polygon[0].attributes);
        prevAttributes[polygonLayerObjIdField] =  prevAttributes[polygonLayerObjIdField]? prevAttributes[polygonLayerObjIdField]:0;
        this._addGraphicToLocalLayer(prevAttributes);
        //set parcel lines
        this._savedPolyLines = polyLines;
        //show delete button only in edit mode
        domClass.remove(this.planInfoDeleteButton, "esriCTHidden");
        //show other parcel information in controls
        if (this.parcelNameTextBox) {
          this.parcelNameTextBox.set("value",
            polygon[0].attributes[this.config.polygonLayer.parcelName.name]);
        }
        if (this.planNameTextBox) {
          this.planNameTextBox.set("value",
            polygon[0].attributes[this.config.polygonLayer.planName.name]);
        }
        if (this.documentTypeControl) {
          documentTypeValue = polygon[0].attributes[this.config.polygonLayer.documentType.name];
          if (documentTypeValue !== null &&
            documentTypeValue !== "" && documentTypeValue !== undefined) {
            if (this.config.polygonLayer.documentType.domain) {
              this.documentTypeControl.set("item",
                this.documentTypeControl.store.get(documentTypeValue));
            } else {
              this.documentTypeControl.set('value', documentTypeValue);
            }
          }
        }
      },

      /**
      * Deletes saved polygon from the layer
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _rollbackSavedPolygon: function () {
        var polygonLayer, deletePolygon, def;
        deletePolygon = { "attributes": {} };
        polygonLayer = this.map.getLayer(this.config.polygonLayer.id);
        if (polygonLayer && this._savedPolygonObjectId !== null) {
          deletePolygon.attributes[polygonLayer.objectIdField] = this._savedPolygonObjectId;
          def = polygonLayer.applyEdits(null, null, [deletePolygon]);
        }
        return def;
      },

      /**
      * Deletes saved polyline form the layer
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _rollbackSavedPolyLines: function (savedFeatures) {
        var polyLineLayer, deletePolyLineArray, deletePolyLine, def;
        deletePolyLineArray = [];
        polyLineLayer = this.map.getLayer(this.config.polylineLayer.id);
        array.forEach(savedFeatures, lang.hitch(this, function (feature) {
          deletePolyLine = { "attributes": {} };
          //push the features to delete
          if (feature.hasOwnProperty('objectId')) {
            deletePolyLine.attributes[polyLineLayer.objectIdField] = feature.objectId;
            deletePolyLineArray.push(deletePolyLine);
          } else if (feature.attributes.hasOwnProperty(polyLineLayer.objectIdField)) {
            deletePolyLine.attributes[polyLineLayer.objectIdField] =
              feature.attributes[polyLineLayer.objectIdField];
            deletePolyLineArray.push(deletePolyLine);
          }
        }));
        if (polyLineLayer && deletePolyLineArray.length > 0) {
          def = polyLineLayer.applyEdits(null, null, deletePolyLineArray);
        }
        return def;
      },

      /**
      * This function is used to delete polygon before saving
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _deletePolygonBeforeSaving: function (dataObj) {
        this._polygonLayer = this.map.getLayer(this.config.polygonLayer.id);
        if (this._polygonLayer) {
          this._polygonLayer.applyEdits(null, null, dataObj.polygonDeleteArr,
            lang.hitch(this, function () {
              this._deleteLinesBeforeSaving(dataObj);
            }), lang.hitch(this, function () {
              this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
            }));
        } else {
          this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
        }
      },

      /**
      * This function is used to delete lines before saving
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _deleteLinesBeforeSaving: function (dataObj) {
        var polylineLayer;
        polylineLayer = this.map.getLayer(this.config.polylineLayer.id);
        if (polylineLayer) {
          polylineLayer.applyEdits(null, null, dataObj.polylineDeleteArr,
            lang.hitch(this, function () {
              this._createPolygonData(dataObj);
            }), lang.hitch(this, function () {
              this._showMessage(this.nls.planInfo.unableToUpdateParcelLines);
            }));
        } else {
          this._showMessage(this.nls.planInfo.unableToUpdateParcelLines);
        }
      },

      /**
      * This function is used to save parcel polygon.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _saveParcelPolygon: function (addsFeatureArr) {
        this._polygonLayer = this.map.getLayer(this.config.polygonLayer.id);
        if (this._polygonLayer) {
          //clear previously saved polygon objectId
          this._savedPolygonObjectId = null;
          this._polygonLayer.applyEdits(addsFeatureArr, null, null,
            lang.hitch(this, function (adds) {
              var query;
              if (adds && adds.length > 0 && adds[0].success) {
                //store the saved polygon id, it will be used for rollback
                this._savedPolygonObjectId = adds[0].objectId;
                this._polygonLayer.refresh();
                query = new Query();
                query.objectIds = [this._savedPolygonObjectId];
                query.returnGeometry = false;
                query.outFields = [this.config.polygonLayer.relatedGUID.name];
                //query to get GlobalID of saved polygon
                var queryTask = new QueryTask(this._polygonLayer.url);
                queryTask.execute(query, lang.hitch(this, function (result) {
                  this.loading.hide();
                  this._createPolylineData(
                    result.features[0].attributes[this.config.polygonLayer.relatedGUID.name]);
                }), lang.hitch(this, function () {
                  this.loading.hide();
                  this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
                }));
              } else {
                this.loading.hide();
                this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
              }
            }), lang.hitch(this, function () {
              this.loading.hide();
              this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
            }));
        } else {
          this.loading.hide();
          this._showMessage(this.nls.planInfo.unableToSavePolygonParcel);
        }
      },

      /**
      * This function is used to get value of distance, length accordingly to feature layer unit
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _getValueAccToFeatureLayerUnit: function (units, values, valueAttribute) {
        if (values.hasOwnProperty(valueAttribute) && values[valueAttribute]) {
          switch (units) {
            case "meters":
            case "degrees":
              return values[valueAttribute].meters;
            case "feet":
              return values[valueAttribute].feet;
            case "uSSurveyFeet":
              return values[valueAttribute].uSSurveyFeet;
            default:
              return null;
          }
        } else {
          return null;
        }
      },

      /**
       * This function returns array of current lines drawn
       * @memberof widgets/ParcelDrafter/PlanInfo
       */
      _getCurrentLineFeatures: function () {
        var currentLines = [];
        for (var i = 0; i < this._itemList.length; i++) {
          currentLines.push(this._itemList[i].graphic);
        }
        return currentLines;
      },

      /**
      * This function is used to create polyline & modify its data before saving.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _createPolylineData: function (guid) {
        var attributes, values, units, addsFeatureArr, polyline, polylineGraphic,
          polylineJSON, features, itemList, chordLengthValue;
        this.loading.show();
        features = this._getCurrentLineFeatures();
        units = this.polylineLayerUnit;
        itemList = this._itemList;
        addsFeatureArr = [];
        for (var i = 0; i < features.length; i++) {
          attributes = {};
          values = itemList[i];
          // save bearing in decimal degree
          attributes[this.config.polylineLayer.bearing.name] = values.BearingConversions.naDD;
          // store distance in layers unit
          attributes[this.config.polylineLayer.distance.name] =
            this._getValueAccToFeatureLayerUnit(units, values, "LengthConversions");
          // save the lineType as drawn by user
          attributes[this.config.polylineLayer.lineType.name] =
            values.LineSymbol.type;
          // store radius in layers unit
          attributes[this.config.polylineLayer.radius.name] =
            this._getValueAccToFeatureLayerUnit(units, values, "RadiusConversions");
          // store arcLength & chordLength
          if (attributes[this.config.polylineLayer.radius.name] !== null &&
            attributes[this.config.polylineLayer.radius.name] !== "" &&
            attributes[this.config.polylineLayer.radius.name] !== undefined) {
            // store arc length in layers unit
            attributes[this.config.polylineLayer.arcLength.name] =
              this._getValueAccToFeatureLayerUnit(units, values, "ArcLengthConversions");
            // store chord length according to layers unit in both the distance & chordLength field
            chordLengthValue = this._getValueAccToFeatureLayerUnit(units, values,
              "ChordLengthConversions");
            attributes[this.config.polylineLayer.chordLength.name] = chordLengthValue;
            attributes[this.config.polylineLayer.distance.name] = chordLengthValue;
          } else {
            attributes[this.config.polylineLayer.arcLength.name] = null;
            attributes[this.config.polylineLayer.chordLength.name] = null;
          }
          attributes[this.config.polylineLayer.relatedGUID.name] = guid;
          // sequence of line
          attributes[this.config.polylineLayer.sequenceId.name] = i;
          // create polyline
          polylineJSON = features[i].geometry.toJson();
          polyline = new Polyline(polylineJSON);
          polylineGraphic = new Graphic(polyline, null, attributes, null);
          addsFeatureArr.push(polylineGraphic);
        }
        this._saveParcelLines(addsFeatureArr);
      },

      /**
      * This function is used to save parcel lines,
      * also if some the lines failed to save rollback the saved polygon.
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _saveParcelLines: function (addsFeatureArr) {
        var polylineLayer;
        polylineLayer = this.map.getLayer(this.config.polylineLayer.id);
        if (polylineLayer) {
          polylineLayer.applyEdits(addsFeatureArr, null, null,
            lang.hitch(this, function (addResult) {
              var failedFeatures = [], savedFeatures = [];
              //create the array of saved and failed polyLines
              array.forEach(addResult, function (result) {
                if (result.success) {
                  savedFeatures.push(result);
                } else {
                  failedFeatures.push(result);
                }
              });
              //if failed to save one or more polyline features delete the saved polygon
              if (failedFeatures.length > 0) {
                this._rollbackSavedPolygon();
                //if some of the polyLines are saved delete the saved polyLines
                if (savedFeatures.length > 0 && failedFeatures.length !== addsFeatureArr.length) {
                  this._rollbackSavedPolyLines(savedFeatures);
                }
                this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
              } else {
                //code for accessibility
                this._showParcelSavedAndDeleteMsg(this.nls.planInfo.parcelSavedSuccessMessage);
                this._savedPolygonObjectId = null;
                this.emit("displayMainPageAfterSave", false);
              }
              this.loading.hide();
            }), lang.hitch(this, function () {
              this._rollbackSavedPolygon();
              this.loading.hide();
              this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
            }));
        } else {
          this._rollbackSavedPolygon();
          this.loading.hide();
          this._showMessage(this.nls.planInfo.unableToSaveParcelLines);
        }
      },

      _validateRequiredFields: function () {
        var errorObj = [];
        var currentFeature = this._currentFeatureDetails;

        if (!currentFeature) { return errorObj; }

        var layer = currentFeature.getLayer();

        var filteredFields = array.filter(layer.fields, lang.hitch(this, function (field) {
          return field.nullable === false && field.editable === true;
        }));

        array.forEach(filteredFields, lang.hitch(this, function (f) {
          if (!currentFeature.attributes.hasOwnProperty(f.name)) {
            errorObj.push(f.name);
          }
          else if (currentFeature.attributes[f.name] === "undefined") {
            errorObj.push(f.name);
          }
          else if (currentFeature.attributes[f.name] === null) {
            errorObj.push(f.name);
          }
          else {
            switch (f.type) {
              case "esriFieldTypeString":
                if (currentFeature.attributes[f.name] === "" ||
                  (currentFeature.attributes[f.name] &&
                    currentFeature.attributes[f.name].trim() === "")) {
                  errorObj.push(f.name);
                }
                break;
              default:
                break;
            }
          }
        }));
        return errorObj;
      },

      _validateAttributes: function () {
        var inValidFields = [], firstInvalidField;
        inValidFields = this._validateRequiredFields();
        var attTable = query("td.atiLabel", this._attributeInspector.domNode);
        //skip object id field and global id fields from validation as they will not be editable at all
        var skipFieldsFromValidation = [];
        if(this._clonedProjectPolygonLayerObject.globalIdField){
          skipFieldsFromValidation.push(this._clonedProjectPolygonLayerObject.globalIdField);
        }
        if(this._clonedProjectPolygonLayerObject.objectIdField){
          skipFieldsFromValidation.push(this._clonedProjectPolygonLayerObject.objectIdField);
        }
        if (attTable) {
          array.forEach(attTable, lang.hitch(this, function (row) {
            var timeDijit, timeDijitNode;
            var fieldName = domAttr.get(row, "data-fieldname");
            if (skipFieldsFromValidation.indexOf(fieldName) === -1) {
              var rowInfo = this._getAttrInspectorRowInfo(row);
              if (rowInfo) {
                if (inValidFields.indexOf(rowInfo[1]) < 0) {
                  if (rowInfo[0].isValid && !rowInfo[0].isValid()) {
                    inValidFields.push(rowInfo[1]);
                    if (!firstInvalidField) {
                      firstInvalidField = rowInfo[0];
                    }
                  } else if (row.parentNode.childNodes[1].childNodes.length > 1) {
                    timeDijitNode = row.parentNode.childNodes[1].childNodes[1];
                    timeDijit = registry.getEnclosingWidget(timeDijitNode);
                    if (timeDijit.isValid && !timeDijit.isValid()) {
                      inValidFields.push(rowInfo[1]);
                      if (!firstInvalidField) {
                        firstInvalidField = timeDijit;
                      }
                    }
                  }
                } else {
                  if (!firstInvalidField) {
                    firstInvalidField = rowInfo[0];
                  }
                }
              }
            }
          }));
        }
        if (firstInvalidField) {
          //show attribute list if it is closed
          if (!domClass.contains(this.expandCollapseNode, "esriCTCollapsedParceLayer")) {
            this._onExpandCollapseClicked();
          }
          firstInvalidField.focus();
        }
        return inValidFields;
      },

      /**
      * This function is used to validate parcel details before saving
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      validateParcelDetails: function (statedArea) {
        var dataObj = {};
        if (this._attributeInspector) {
          var invalidFields = this._validateAttributes();
          if (invalidFields && invalidFields.length > 0) {
            dataObj.status = false;
            dataObj.message = "";
            return dataObj;
          }
        }
        //if stated area field is configured
        if (this.config.polygonLayer.statedArea &&
          this.config.polygonLayer.statedArea.hasOwnProperty('name')) {
          //if stated area field is not nullable it should not have null or empty value
          if (!this.config.polygonLayer.statedArea.nullable) {
            if (statedArea === null || statedArea === "") {
              dataObj.status = false;
              dataObj.message = this.nls.planInfo.enterValidStatedAreaNameMessage;
              return dataObj;
            }
          }
          //if statedArea is entered and configured field is numeric then,
          // it should have only numeric value
          if (statedArea !== null && statedArea !== "") {
            if (this.numberFieldTypes.indexOf(this.config.polygonLayer.statedArea.type) > -1) {
              if (!this.validateNumericField(statedArea,
                this.config.polygonLayer.statedArea.type)) {
                dataObj.status = false;
                dataObj.message = this.nls.planInfo.enterValidStatedAreaNameMessage;
                return dataObj;
              }
            }
          }
        }
        dataObj.status = true;
        return dataObj;
      },

      /**
      * This function is used to delete parcel details on delete button click
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      deleteParcel: function () {
        this.loading.show();
        //delete parcel polygon
        var deletePolygonDef = this._rollbackSavedPolygon();
        //once parcel polygon is deleted, delete lines
        //if error in deleting parcel show error message and navigate to main page
        deletePolygonDef.then(lang.hitch(this, function () {
          //delete parcel lines
          var deletePolylineDef = this._rollbackSavedPolyLines(this._savedPolyLines);
          //once parcel lines are deleted show success message and navigate to main page
          deletePolylineDef.then(lang.hitch(this, function () {
            this.loading.hide();
            //code for accessibility
            this._showParcelSavedAndDeleteMsg(this.nls.planInfo.parcelDeletedSuccessMessage);
            this._savedPolygonObjectId = null;
            this.emit("displayMainPageAfterSave", false);
          }), lang.hitch(this, function () {
            this.loading.hide();
            this._savedPolygonObjectId = null;
            //code for accessibility
            this._showParcelSavedAndDeleteMsg(this.nls.planInfo.parcelDeleteErrorMessage);
            this.emit("displayMainPageAfterSave", false);
          }));
        }), lang.hitch(this, function () {
          this.loading.hide();
          this._savedPolygonObjectId = null;
          //code for accessibility
          this._showParcelSavedAndDeleteMsg(this.nls.planInfo.parcelDeleteErrorMessage);
          this.emit("displayMainPageAfterSave", false);
        }));
      },

      /**
       * This function is used to set cancel button as last node in traversepage
       * code for accessibility
       * @memberOf widgets/ParcelDrafter/PlanInfo
       */
      setPlanInfoCancelBtnAsLastNode: function () {
        jimuUtils.initLastFocusNode(this.widgetDomNode, this.planInfoCancelButton);
      },

      /**
      * Emit the showMessage event
      * code for accessibility
      * @memberOf widgets/ParcelDrafter/PlanInfo
      **/
      _showParcelSavedAndDeleteMsg: function (msg) {
        this.emit("showParcelSavedAndDeleteMsg", msg);
      },

      /****************************************************************************
       * Attribute inspector code
       * 
       ****************************************************************************/

      /**
       * Function to merge objects
       * @memberOf widgets/ParcelDrafter/PlanInfo
       * */
      mergeFirstToLast: function () {
        var obj = {},
          i = arguments.length - 1,
          il = 0,
          key;
        for (; i >= il; i--) {
          for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
              obj[key] = arguments[i][key];
            }
          }
        }
        return obj;
      },

      /**
       * Function to get field infos form layer object
       * @param {Object} layerInfo 
       * @memberOf widgets/ParcelDrafter/PlanInfo
       */
      _getFieldInfosFromLayer: function (layerInfo) {
        var fieldInfos = [];
        if (layerInfo && layerInfo.layerObject) {
          array.forEach(layerInfo.layerObject.fields, function (field) {
            var fieldInfo = jimuUtils.getDefaultPortalFieldInfo(field);
            fieldInfo = this.mergeFirstToLast(fieldInfo, field);
            if (fieldInfo.format &&
              fieldInfo.format.dateFormat &&
              fieldInfo.format.dateFormat.toLowerCase() &&
              fieldInfo.format.dateFormat.toLowerCase().indexOf('time') >= 0) {
              fieldInfo.format.time = true;
            }
            fieldInfo.visible = true;
            fieldInfos.push(fieldInfo);
          }, this);
        }
        return fieldInfos;
      },

      _createFieldsDetailsObject: function (fields) {
        var fieldDetailsObj = {};
        array.forEach(fields, lang.hitch(this, function (field) {
          fieldDetailsObj[field.name] = field.type;
        }));
        return fieldDetailsObj;
      },

      getFieldInfoByFieldName: function (fieldInfos, fieldName) {
        var fieldInfo = {};
        array.some(fieldInfos, function (field) {
          if (field.name === fieldName) {
            lang.mixin(fieldInfo, field);
            return true;
          }
        });
        return fieldInfo;
      },

      _getFieldInfosForPolygonLayer: function () {
        if (this.fieldInfosForPolygonLayer) {
          return this.fieldInfosForPolygonLayer;
        }
        var fieldInfos, allFieldsInfo, visibleFields = [];
        //Hide fields which are calculated by widget
        var hideFieldsWhichAreCalculated = [
          this.config.polygonLayer.rotation.name, this.config.polygonLayer.scale.name,
          this.config.polygonLayer.miscloseRatio.name, this.config.polygonLayer.miscloseDistance.name,
          this.config.polygonLayer.statedArea.name];
        //get layer info 
        var projectLayerInfo = this._layerInfosObj.getLayerInfoById(this.config.polygonLayer.id);
        //get fields details
        var fieldsDetailsObj = this._createFieldsDetailsObject(projectLayerInfo.layerObject.fields);
        allFieldsInfo = this._getFieldInfosFromLayer(projectLayerInfo);
        //if configured to use field info from webmap use popup info to fetch field info details
        //else if additionalFieldsInfo are configured and use them 
        //else for backward compatibility only show fields out of Name, PlanName, and DocumentType 
        if (this.config.hasOwnProperty('useFieldInfosFromWebmap') &&
          this.config.useFieldInfosFromWebmap &&
          projectLayerInfo.controlPopupInfo &&
          projectLayerInfo.controlPopupInfo.enablePopup &&
          projectLayerInfo.controlPopupInfo.infoTemplate) {
          allFieldsInfo = lang.clone(projectLayerInfo.controlPopupInfo.infoTemplate.info.fieldInfos);
        } else if (this.config.polygonLayer.hasOwnProperty('additionalFieldsInfo') &&
          this.config.polygonLayer.additionalFieldsInfo.length > 0) {
          var mergedFieldsInfo = [];
          array.forEach(this.config.polygonLayer.additionalFieldsInfo, function (configuredFieldInfo) {
            var fieldInfo = this.getFieldInfoByFieldName(allFieldsInfo, configuredFieldInfo.fieldName);
            fieldInfo = lang.mixin(fieldInfo, configuredFieldInfo);
            //in case of custom popup always show editable required fields 
            if (!fieldInfo.nullable && fieldInfo.editable) {
              fieldInfo.visible = true;
              fieldInfo.isEditable = true;
            }
            mergedFieldsInfo.push(fieldInfo);
          }, this);
          allFieldsInfo = mergedFieldsInfo;
        } else {
          //To support backward compatibility only allow field from following configuration
          if (this.config.polygonLayer.documentType.hasOwnProperty('name')) {
            visibleFields.push(this.config.polygonLayer.documentType.name);
          }
          if (this.config.polygonLayer.parcelName.hasOwnProperty('name')) {
            visibleFields.push(this.config.polygonLayer.parcelName.name);
          }
          if (this.config.polygonLayer.planName.hasOwnProperty('name')) {
            visibleFields.push(this.config.polygonLayer.planName.name);
          }
        }
        fieldInfos = [];
        array.forEach(allFieldsInfo, lang.hitch(this, function (field) {
          //visibleFields array will be filled only in case of backward compatibility 
          //Show only those fields which were previously configured for Name, PlanName, and DocumentType
          if (visibleFields && visibleFields.length > 0) {
            if (visibleFields.indexOf(field.fieldName) < 0) {
              field.visible = false;
            }
          }
          //filter fields for misclose info, rotation, scale and statedArea
          if (hideFieldsWhichAreCalculated.indexOf(field.fieldName) > -1) {
            field.visible = false;
          }
          //skip fields which are not visible and those are not of following type
          if (field.visible &&
            fieldsDetailsObj[field.fieldName] &&
            (fieldsDetailsObj[field.fieldName] !== "esriFieldTypeRaster" &&
              fieldsDetailsObj[field.fieldName] !== "esriFieldTypeBlob" &&
              fieldsDetailsObj[field.fieldName] !== "esriFieldTypeXML")) {
            //if field is date and time is enabled set time to true in format
            if (field.format &&
              field.format.dateFormat &&
              field.format.dateFormat.toLowerCase() &&
              field.format.dateFormat.toLowerCase().indexOf('time') >= 0) {
              field.format.time = true;
            }
            fieldInfos.push(field);
          }
        }));
        this.fieldInfosForPolygonLayer = fieldInfos;
        return fieldInfos;
      },

      _clearAttributeInspectorData: function () {
        //clear previous selections of layer
        if (this._attributeInspector) {
          //as now prev attribute inspector could have multiple features of multiple layer
          //clear selections of all layers in layer infos
          if (this._attributeInspector.layerInfos) {
            array.forEach(this._attributeInspector.layerInfos, function (layerInfo) {
              var layer = layerInfo.featureLayer;
              layer.clearSelection();
              layer.refresh();
            });
          }
          this._attributeInspector.destroy();
        }
      },

      _add508SupportToATI: function () {
        var attTable;
        if (this._attributeInspector && this._attributeInspector.domNode) {
          attTable = query("td.atiLabel", this._attributeInspector.domNode);
          if (attTable) {
            array.forEach(attTable, lang.hitch(this, function (row) {
              var timeDijit, timeDijitNode;
              var rowInfo = this._getAttrInspectorRowInfo(row);
              if (rowInfo) {
                rowInfo[0].set("aria-label", rowInfo[1]);
                //if row has time dijit it will have two child
                //separately add aria-label for time dijit
                if (row.parentNode.childNodes[1].childNodes.length > 1) {
                  timeDijitNode = row.parentNode.childNodes[1].childNodes[1];
                  timeDijit = registry.getEnclosingWidget(timeDijitNode);
                  timeDijit.set("aria-label", rowInfo[1]);
                }
              }
            }));
          }
        }
      },

      _getAttrInspectorRowInfo: function (row) {
        try {
          if (row) {
            if (row.parentNode) {
              var valueCell = row.parentNode.childNodes[1].childNodes[0];
              var widget = registry.getEnclosingWidget(valueCell);
              //var label = row.innerHTML;
              var label = row.childNodes[0].data;
              return [widget, label, valueCell];
            }
          }
          return null;
        }
        catch (err) {
          console.log(err);
          return null;
        }
      },

      /**
       * Returns dijit for the field name 
       */
      _getCurrentFieldDijit: function (fieldName) {
        var fieldDijit;
        array.some(this._attributeInspector._currentLInfo.fieldInfos,
          lang.hitch(this, function (fInfo) {
            if (fInfo.name === fieldName ||
              (fInfo.field && fInfo.field.name === fieldName) ||
              fInfo.fieldName === fieldName) {
              fieldDijit = fInfo.dijit;
              return true;
            }
          }));
        return fieldDijit;
      },

      /**
       * This function is used to add graphics to local layer.
       */
      _addGraphicToLocalLayer: function (attributes) {
        var clonedProjectPolygonLayerInfo, polygonLayerObject, clonedProjectPolygonLayerLoadHandler,
          newGraphic, queryTask, fieldInfos;
        //create field infos
        fieldInfos = this._getFieldInfosForPolygonLayer();
        if (!fieldInfos || fieldInfos.length == 0) {
          return;
        }
        // clears the attribute inspector
        this._clearAttributeInspectorData();
        // clears the local layer
        this._removeClonedProjectPolygonLayer();
        // polygonLayerId object
        polygonLayerObject = this.map.getLayer(this.config.polygonLayer.id);
        // clone the polygonLayerId layer and it on map
        this._clonedProjectPolygonLayerObject = this._cloneProjectPolygonLayer(polygonLayerObject, fieldInfos);
        // attaching load event
        clonedProjectPolygonLayerLoadHandler =
          this.own(on(this._clonedProjectPolygonLayerObject, "load",
            lang.hitch(this, function () {
              // Remove handler
              if (clonedProjectPolygonLayerLoadHandler && clonedProjectPolygonLayerLoadHandler[0]) {
                clonedProjectPolygonLayerLoadHandler[0].remove();
              }
              clonedProjectPolygonLayerInfo =
                this._layerInfosObj.getLayerInfoById(this._clonedProjectPolygonLayerObject.originalLayerId);
              // need to add this property featureLayer, else it fails while creating attribute inspector
              clonedProjectPolygonLayerInfo.featureLayer = this._clonedProjectPolygonLayerObject;
              // create attribute inspector
              this._createAttributeInspector(fieldInfos);
              // create local graphics
              newGraphic = new Graphic(null, null, attributes ? attributes : {}, null);
              // store original attrs for later use
              newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
              // add graphics in local layer(cache layer)
              this._clonedProjectPolygonLayerObject.applyEdits([newGraphic], null, null,
                lang.hitch(this, function (results) {
                  queryTask = new Query();
                  queryTask.objectIds = [results[0].objectId];
                  // select feature in cache layer
                  this._clonedProjectPolygonLayerObject.selectFeatures(queryTask, FeatureLayer.SELECTION_NEW,
                    lang.hitch(this, function () {
                      //add cellSpacing and sellPadding to attribute table  
                      var attributeTable = this._attributeInspector.attributeTable.childNodes[0];
                      domAttr.set(attributeTable, "cellspacing", "5");
                      domAttr.set(attributeTable, "cellpadding", "5");
                      //store the instance of current graphic of attribute inspector
                      this._currentFeatureDetails = newGraphic;
                      //add aria-labels to each dijit in attribute inspector
                      this._add508SupportToATI();
                      //hide attachment editor
                      if (this._attributeInspector.attachmentEditor) {
                        domStyle.set(this._attributeInspector.attachmentEditor, "display", "none");
                      }
                      //hide editor tracking info
                      if (this._attributeInspector.editorTrackingInfoDiv) {
                        domStyle.set(this._attributeInspector.editorTrackingInfoDiv, "display", "none");
                      }
                      //logic to show objectId value when editing features
                      var objectId = this._clonedProjectPolygonLayerObject.objectIdField;
                      if(objectId)
                      {
                        var objIdField = this._getCurrentFieldDijit(objectId);
                        if(objIdField && newGraphic.preEditAttrs[objectId]){
                          objIdField.set("value", newGraphic.preEditAttrs[objectId]);
                        }
                      }
                    }), lang.hitch(this, function () {
                    }));
                }), lang.hitch(this, function () {
                }));
            }), lang.hitch(this, function () {
            })));
      },

      /**
       * This function is used to clear the local layer
       */
      _removeClonedProjectPolygonLayer: function () {
        if (this._clonedProjectPolygonLayerObject && this._clonedProjectPolygonLayerObject !== null) {
          this._clonedProjectPolygonLayerObject.clearSelection();
          this._clonedProjectPolygonLayerObject.clear();
          this.map.removeLayer(this._clonedProjectPolygonLayerObject);
          this._clonedProjectPolygonLayerObject = null;
        }
      },

      /**
       * This function is used to filter the fields of layer definition passed to the attribute inspector
       */
      _filterFields: function (existingLayerDefinition, fieldInfos) {
        var filteredFieldsArr = [];
        array.forEach(fieldInfos, lang.hitch(this, function (fieldInfo) {
          if (fieldInfo.visible) {
            array.forEach(existingLayerDefinition.fields, lang.hitch(this, function (field) {
              if (field.hasOwnProperty("name") && fieldInfo.hasOwnProperty("fieldName")) {
                if (field.name === fieldInfo.fieldName) {
                  filteredFieldsArr.push(field);
                }
              }
            }));
          }
        }));
        existingLayerDefinition.fields = filteredFieldsArr;
      },

      /**
       * This function is used to clone the project polygon layer
       * @param {Object} layer instance of project polygon layer
       * @param {Array} fieldInfos
       */
      _cloneProjectPolygonLayer: function (layer, fieldInfos) {
        var cloneFeatureLayer, featureCollection, outFields;
        // get layer definition
        var existingLayerDefinition = jimuUtils.getFeatureLayerDefinition(layer);
        // remove fields which are not needed
        this._filterFields(existingLayerDefinition, fieldInfos);
        // set custom id
        existingLayerDefinition.id = "clonedPolygonLayer" + this.id;
        // set custom name
        existingLayerDefinition.name = layer.name + this.id;
        featureCollection = {
          layerDefinition: existingLayerDefinition
        };
        outFields = layer.fields.map(function (fieldDetails) {
          return fieldDetails.name;
        });
        cloneFeatureLayer = new FeatureLayer(featureCollection, {
          outFields: outFields
        });
        cloneFeatureLayer.visible = true;
        cloneFeatureLayer.renderer = layer.renderer;
        cloneFeatureLayer.originalLayerId = layer.id;
        cloneFeatureLayer._wabProperties = {
          isTemporaryLayer: true
        };
        this.map.addLayer(cloneFeatureLayer);
        return cloneFeatureLayer;
      },

      /**
       * This function is required to add the Range details to a range domain so the layer can be cloned
       * @param {Array} fields - layer fields
       */
      _processLayerFields: function (fields) {
        //Function required to add the Range details to a range domain so the layer can be cloned
        array.forEach(fields, function (field) {
          if (field.domain !== undefined && field.domain !== null) {
            if (field.domain.type !== undefined && field.domain.type !== null) {
              if (field.domain.type === 'range') {
                if (field.domain.hasOwnProperty('range') === false) {
                  field.domain.range = [field.domain.minValue, field.domain.maxValue];
                }
              }
            }
          }
        });
        return fields;
      },

      /**
       * This function is used to create object of attribute inspector widget
       * @param {Object} layerInfos - layer infos
       */
      _createAttributeInspector: function (fieldInfos) {
        domConstruct.empty(this.attributeInspectorContainer);
        // Working around for bug of AttributeInspector. Incorrect behavior with
        // multiple instances of AttributeInspector.
        var attributeInspectorWidget = declare([AttributeInspector], {
          constructor: function () {
            this._aiConnects = [];
            this._selection = [];
            this._toolTips = [];
          }
        });
        // create cloned attribute inspector widget
        this._attributeInspector = new attributeInspectorWidget({
          layerInfos: [{
            'featureLayer': this._clonedProjectPolygonLayerObject,
            'fieldInfos': fieldInfos
          }]
        }, domConstruct.create("div", {
          "class": "esriCTAttributeInspectorWidgetContainer"
        }));
        this.own(on(this._attributeInspector, "attribute-change", lang.hitch(this, function (evt) {
          if (this._currentFeatureDetails) {
            // update changed attribute
            this._currentFeatureDetails.attributes[evt.fieldName] = evt.fieldValue;
          }
        })));
        this._attributeInspector.startup();
        this.attributeInspectorContainer.appendChild(this._attributeInspector.domNode);
      }
    });
  });