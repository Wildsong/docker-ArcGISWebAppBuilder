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
/* jshint proto: true */

define([
  "dojo/Stateful",
  'dojo',
  'dijit',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/html',
  'dojo/query',
  'dojo/aspect',
  'dojo/i18n!esri/nls/jsapi',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/on',
  'dojo/keys',
  'dojo/json',
  'dojo/topic',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/BaseWidget',
  'jimu/LayerInfos/LayerInfos',
  'jimu/dijit/Message',
  "esri/request",
  "esri/dijit/editing/TemplatePicker",
  "esri/dijit/AttributeInspector",
  "esri/toolbars/draw",
  "esri/toolbars/edit",
  "esri/tasks/query",
  "esri/graphic",
  "esri/layers/FeatureLayer",
  "dojo/promise/all",
  "dojo/Deferred",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/Color",
  "esri/geometry/jsonUtils",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",
  "esri/tasks/RelationshipQuery",
  "dijit/registry",
  "./PresetAllFields",
  "./utils",
  "./presetUtils",
  "./presetBuilderBackwardCompatibility",
  "./smartAttributes",
  "./attributeInspectorTools",
  "./relatedTables",
  "jimu/dijit/CheckBox",
  "dijit/form/Button",
  "dijit/form/DropDownButton",
  'dijit/DropDownMenu',
  "dijit/MenuItem",
  'dijit/form/DateTextBox',
  'dijit/form/NumberSpinner',
  'dijit/form/NumberTextBox',
  'dijit/form/FilteringSelect',
  'dijit/form/TextBox',
  'dijit/form/ValidationTextBox',
  'dijit/form/TimeTextBox',
  "dijit/Editor",
  "dijit/form/SimpleTextarea",
  'dojo/store/Memory',
  'dojo/date/stamp',
  "dojo/dom-attr",
  "jimu/dijit/Popup",
  "./AttachmentUploader",
  "esri/lang",
  "esri/renderers/jsonUtils",
  "dojox/html/entities",
  'jimu/dijit/EditorXssFilter',
  'jimu/utils',
  'jimu/portalUtils',
  'jimu/portalUrlUtils',
  'jimu/SelectionManager',
  './SEFilterEditor',
  './SEDrawingOptions',
  './PrivilegeUtil',
  './XYCoordinates',
  'jimu/dijit/LoadingIndicator',
  'esri/tasks/GeometryService',
  'esri/arcgis/Portal',
  "./coordinateUtils",
  "./addressUtils",
  "./Intersection",
  "esri/dijit/LocateButton",
  "esri/geometry/Point",
  'esri/SpatialReference',
  "dijit/focus",
  'jimu/dijit/FeatureSetChooserForMultipleLayers',
  "./copy-features",
  "./ValuePicker",
  "dojo/string",
  "./requiredFields",
  "dijit/Tooltip"
],
  function (
    Stateful,
    dojo,
    dijit,
    declare,
    lang,
    array,
    html,
    query,
    aspect,
    esriBundle,
    dom,
    domConstruct,
    domClass,
    domStyle,
    on,
    keys,
    JSON,
    topic,
    _WidgetsInTemplateMixin,
    BaseWidget,
    LayerInfos,
    Message,
    esriRequest,
    TemplatePicker,
    AttributeInspector,
    Draw,
    Edit,
    Query,
    Graphic,
    FeatureLayer,
    all,
    Deferred,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Color,
    geometryJsonUtil,
    Polyline,
    Polygon,
    RelationshipQuery,
    registry,
    PresetAllFields,
    editUtils,
    presetUtils,
    presetBuilderBackwardCompatibility,
    smartAttributes,
    attributeInspectorTools,
    relatedTables,
    CheckBox,
    Button,
    DropDownButton,
    DropDownMenu,
    MenuItem,
    DateTextBox,
    NumberSpinner,
    NumberTextBox,
    FilteringSelect,
    TextBox,
    ValidationTextBox,
    TimeTextBox,
    Editor,
    SimpleTextarea,
    Memory,
    dojoStamp,
    domAttr,
    Popup,
    AttachmentUploader,
    esriLang,
    rendererJsonUtils,
    entities,
    EditorXssFilter,
    utils,
    portalUtils,
    portalUrlUtils,
    SelectionManager,
    SEFilterEditor,
    SEDrawingOptions,
    PrivilegeUtil,
    XYCoordinates,
    LoadingIndicator,
    GeometryService,
    esriPortal,
    coordinateUtils,
    AddressUtils,
    Intersection,
    LocateButton,
    Point,
    SpatialReference,
    focusUtil,
    FeatureSetChooserForMultipleLayers,
    CopyFeatures,
    ValuePicker,
    String,
    requiredFields,
    Tooltip) {
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'SmartEditor',
      baseClass: 'jimu-widget-smartEditor',
      _defaultStartStr: "",
      _defaultAddPointStr: "",
      _jimuLayerInfos: null,
      _mapClick: null,
      settings: null,
      templatePicker: null,
      attrInspector: null,
      editToolbar: null,
      _isDirty: false,
      updateFeatures: [],
      currentFeature: null,
      currentLayerInfo: null,
      _attrInspIsCurrentlyDisplayed: false,
      _ignoreEditGeometryToggle: false,
      _editingEnabled: false,
      _usePresetValues: false,
      _creationDisabledOnAll: false,
      _editGeomSwitch: null,
      _autoSaveRuntime: false,
      _userHasPrivilege: false,
      _eventHandler: null,
      _createOverDef: null,
      featureReductionEnabledLayers: [],
      rendererDifferentLayers: [],
      clusterState: true,
      _relatedTablesInfo: {},
      _traversal: [],
      _nodesCollection: [],
      _paginationNodeCollection: [],
      _buttonsWrapper: [],
      _attributeInspectorCollection: [],
      contentWrapper: null,
      viewedFeatureDetails: [],
      viewedLayerDetails: [],
      currentAction: null,
      _isPresetTableCreated: false,
      _layerClearSelectionHandles: [],
      _layerChangedOutside: false,
      _refreshButton: null, // to store the object of refresh button
      _mapNavigation: null, // to store the object of map navigation button
      _locateButtonDiv: null, // to store the object of locate button
      _xyCoordinates: null, // to store the object of custom coordinates button
      _coordinates: null,//to store instance of XYCoordinates
      _selectTool: null,
      _selectTemplateIndex: 0,
      copyMultipleFeatureGraphics: [],// to store selected feature geometry and and modified defualt attr
      nullAttributeCountRecord: null,//to store found null count for each attr in selectedfeatures
      requiredFieldsArray: null,//to store required fields name,
      //comment out code for#475
      _myLocationInfoDef: null,
      _moveToGPSDef: null,
      _myLocationInfoForMultipleFeatures: null,
      canGeocode: false, //flag to check if user can perform the geocoding operations
      _esriLocatorRegExp: /http(s)?:\/\/geocode(.){0,3}\.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer/g,
      allSelectedGeometries: null,
      objectIdArr: [],
      processedChunksCount: 0,
      canAutoUpdate: true, //flag represents on attribute-change should we save the feature or not
      //canAutoUpdate is false means - field value are changed and feature is saved by value picker or geometry update work flow
      // hence don't save these feature on attribute change
      //canAutoUpdate is true means fields are changed manually so on attribute-change save the feature
      _chunkSizeForPolygonAndLineGeometry: 10, //chunk size for polygon and line geometry
      _chunkSizeForPointGeometry: 100, //chunk size for point geometry
      //widget_loaded: declare([Stateful], {
      //  loaded: null,
      //  _loadedGetter: function () {
      //    return this.loaded;
      //  },
      //  _loadedSetter: function (value) {
      //    this.loaded = value;
      //  }
      //}),
      postMixInProperties: function () {
        this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this.nls = lang.mixin(this.nls, window.jimuNls.timeUnit);
      },

      postCreate: function () {
        this.inherited(arguments);
        this._myLocationInfoDef = null;
        this._moveToGPSDef = null;
        this._myLocationInfoForMultipleFeatures = null;
        this._relatedTablesInfo = {};
        this._traversal = [];
        this._nodesCollection = [];
        this._paginationNodeCollection = [];
        this._buttonsWrapper = [];
        this._attributeInspectorCollection = [];
        this.viewedFeatureDetails = [];
        this.viewedLayerDetails = [];
        this._isPresetTableCreated = false;
        this._layerClearSelectionHandles = [];
        this._layerChangedOutside = false;
        this._selectTool = null;
        this.editorXssFilter = EditorXssFilter.getInstance();
        this.copyMultipleFeatureGraphics = [];
        this.nullAttributeCountRecord = null;
        this.requiredFieldsArray = null;
        this.allSelectedGeometries = null;
        this.objectIdArr = [];
        this.processedChunksCount = 0;
        this.canAutoUpdate = true;
        //Comment out code for #475
        //this._createHiddenLocateButton();
        //For backward compatibility
        if (!this.config.editor.hasOwnProperty("expandRelatedTableOnLoad")) {
          this.config.editor.expandRelatedTableOnLoad = false;
        }
        if (!this.config.editor.hasOwnProperty("expandMainLayerOnLoad")) {
          this.config.editor.expandMainLayerOnLoad = true;
        }
        //wire up the button events
        this.own(on(this.cancelButton, "click", lang.hitch(this, function () {
          this._performCancelButtonOperation();
        })));
        //On keydown event show associated fields message in MessageBox(for clear button)
        this.own(on(this.cancelButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._performCancelButtonOperation();
          }
        })));

        //button to allow user to go back to the template picker screen when selection do not
        //contain any features and AI is empty
        this.own(on(this.noFeatureCancelBtn, "click", lang.hitch(this, function () {
          domStyle.set(this.noFeatureWarningMessage, "display", "none");
          this._showTemplatePicker();
          this._setWidgetFirstFocusNode("templatePicker", true);
        })));
        //On keydown event
        this.own(on(this.noFeatureCancelBtn, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            domStyle.set(this.noFeatureWarningMessage, "display", "none");
            this._showTemplatePicker();
            this._setWidgetFirstFocusNode("templatePicker", true);
          }
        })));
        domAttr.set(registry.byId("savePresetValueSwitch").domNode, "aria-label", this.nls.usePresetValues);
        domAttr.set(registry.byId("autoSaveSwitch").domNode, "aria-label", this.nls.autoSaveEdits);
        this.openAtStartAysn = true;
      },

      _performCancelButtonOperation: function () {
        //check if needs to display prompt for unsaved edits
        if (this.config.editor.displayPromptOnSave && this._validateFeatureChanged()) {
          var isFirstPage = this._traversal.length > 1 ? false : true;
          this._promptToResolvePendingEdit(isFirstPage, null, true).then(
            lang.hitch(this, function (clickedButton) {
              //if adding new related record the task of back button(_onCancelButtonClicked)
              //should be processed after adding related record and showing list related records
              //So process _onCancelButtonClicked only when action is 'no' & not adding related record
              //if adding related record and clicked button is 'yes' then raise the flag of back button
              //so that once related record is added after that _onCancelButtonClicked will be called
              if (!this._addingNewRelatedRecord || clickedButton === "no") {
                this._onCancelButtonClicked();
              } else {
                this._processBackButtonInNewRelatedRecord = true;
              }
              this._setWidgetFirstFocusNode("templatePicker", true);
            }), function () {
            });
        } else {
          this._onCancelButtonClicked();
        }
      },

      _setCancelButtonText: function () {
        if (this._traversal && this._traversal.length > 1) {
          domAttr.set(this.cancelButton, "innerHTML", this.nls.back);
          domAttr.set(this.cancelButton, "aria-label", this.nls.back);
        } else {
          domAttr.set(this.cancelButton, "innerHTML", this.nls.clearSelection);
          domAttr.set(this.cancelButton, "aria-label", this.nls.clearSelection);
        }
      },

      onConfigChanged: function () {
        //Reset the smart editor widget once the config changes
        this.inherited(arguments);
        this._onCancelButtonClicked();
      },

      _onCancelButtonClicked: function () {
        //clear previous selections of layer
        if (this.attrInspector) {
          //as now prev attribute inspector could have multiple features of multiple layer
          //clear selections of all layers in layer infos
          if (this.attrInspector.layerInfos) {
            var layerInfos = LayerInfos.getInstanceSync();
            array.forEach(this.attrInspector.layerInfos, function (layerInfo) {
              var layer = layerInfo.featureLayer;
              layer.clearSelection();
              layer.refresh();
              var fs_url = layerInfo.featureLayer.url;
              if (layerInfo.featureLayer.hasOwnProperty("originalLayerId")) {
                layID = layerInfo.featureLayer.originalLayerId;
                if (layerInfo.id != layID) {
                  layer = layerInfo.featureLayer;
                  layer.clearSelection();
                  layer.refresh();
                  layerInfo = layerInfos.getLayerOrTableInfoById(layID);
                  if (layerInfo.layerObject) {
                    fs_url = layerInfo.layerObject.url;
                  }
                }

              }
              if (fs_url) {
                var fs_root = fs_url.split('/FeatureServer')[0];
                array.forEach(layerInfos.getLayerInfoArray(), function (layerInfo) {
                  if (typeof (layerInfo.layerObject.url) !== "undefined") {
                    if (layerInfo.layerObject.url !== null) {
                      if (layerInfo.layerObject.url.includes('/MapServer') && layerInfo.layerObject.url.includes(fs_root)) {
                        layerInfo.layerObject.refresh();
                      }
                    }
                  }
                }, this);
              }
            });
          }
          this.attrInspector.destroy();
        }
        domConstruct.destroy(this.contentWrapper);
        domConstruct.destroy(this.buttonHeader);
        if (this.navButtonsDiv) {
          domConstruct.destroy(this.navButtonsDiv);
        }
        //get prev Attribute inspector if going back from related layer/tables
        if (this._attributeInspectorCollection && this._attributeInspectorCollection.length > 0) {
          var prevAttrInspector = this._attributeInspectorCollection.pop();
          if (prevAttrInspector) {
            this.attrInspector = prevAttrInspector;
          }
        }
        if (this._traversal && this._traversal.length > 0) {
          this._traversal.pop();
        }
        if (this._buttonsWrapper.length > 0) {
          this.buttonHeader = this._buttonsWrapper.pop();
        }
        this._setCancelButtonText();
        this._unLockMapNavigation();
        //get prev ContentWrapper if going back from related layer/tables
        if (this._nodesCollection && this._nodesCollection.length > 0) {
          var prevContentWrapper = this._nodesCollection.pop();
          var prevPaginationWrapper = this._paginationNodeCollection.pop();
          if (prevContentWrapper) {
            domClass.remove(prevContentWrapper, "hidden");
            domClass.remove(this.buttonHeader, "hidden");
            //when AI's dom is set to hidden all its node get hidden so show then
            domStyle.set(this.attrInspector.attributeTable, "display", "block");
            domStyle.set(this.attrInspector.editButtons, "display", "block");
            if (this.attrInspector._attachmentEditor !== undefined &&
              this.attrInspector._attachmentEditor !== null) {
              domStyle.set(this.attrInspector._attachmentEditor.domNode, "display", "block");
            }
            //Hide Attribute inspector's delete button text shown when we block editButtons
            domStyle.set(this.attrInspector.deleteBtn.domNode, "display", "none");
            //set the prev selected feature index which is stored before navigating to shoe related records
            this.attrInspector._featureIdx = this.attrInspector.ctStoredFeatureIndex;
            //refresh the AI this will update the UI also
            this.attrInspector.refresh();
            //after time out
            // 1. Show/hide navButtons as per number of features selected
            // 2. Show number of features in nav buttons control
            setTimeout(lang.hitch(this, function () {
              //Show/hide navButtons as per number of features selected
              domStyle.set(this.attrInspector.navButtons, "display",
                (!this.attrInspector._hideNavButtons && (this.attrInspector._numFeatures > 1) ? "" : "none"));
              //Show number of features in nav buttons control
              this.attrInspector.navMessage.innerHTML = esriLang.substitute({
                idx: this.attrInspector._featureIdx + 1,
                of: this.attrInspector.NLS_of,
                numFeatures: this.attrInspector._numFeatures
              }, this.attrInspector._navMessage);
              this._toggleAttrInspectorNavButtons();
              //also update the current feature
              this.currentFeature = this.attrInspector._numFeatures ?
                this.attrInspector._selection[this.attrInspector._featureIdx] : null;
              this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
              this.currentLayerInfo = this._getLayerInfoByID(this.currentFeature._layer.id);
              // Update related records count
              if (this._relatedTablesInfo && this._relatedTablesInfo[this.currentFeature._layer.id]) {
                this._relatedTablesInfo[this.currentFeature._layer.id].updateRelatedRecordsCount();
              }
              this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
                !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate ||
                (this.currentLayerInfo.featureLayer.hasZ && !this.currentLayerInfo.featureLayer.enableZDefaults) ||
                (this.currentLayerInfo.featureLayer.hasM && !this.currentLayerInfo.featureLayer.allowUpdateWithoutMValues));
              //Set the layer title state based on visibility
              if (this._traversal.length <= 1) {
                var layerTitleNode;
                layerTitleNode = query(".esriCTItemTitle", this.domNode)[0];
                if (this.currentFeature && this.currentFeature.geometry &&
                  this.currentFeature._layer.visibleAtMapScale) {
                  layerTitleNode.style.opacity = "1";
                } else {
                  layerTitleNode.style.opacity = "0.3";
                }
              }
              //Show hide delete button based on configuration
              if (this.currentFeature.hasOwnProperty("allowDelete")) {
                this._toggleDeleteButton(this.currentFeature.allowDelete &&
                  this.currentLayerInfo.allowDelete);
              }
              else {
                this._toggleDeleteButton(this.currentLayerInfo.allowDelete);
              }
              if (this.currentLayerInfo.featureLayer.visibleAtMapScale &&
                this.config.editor.hasOwnProperty("editGeometryDefault") &&
                this.config.editor.editGeometryDefault === true) {
                //perform any edit geom switch functionality
                //only when working with main layers feature and not on related features
                if (this._traversal.length < 2 && this._editGeomSwitch.domNode) {
                  this._editGeomSwitch.set('checked', true);
                  this._editGeomSwitch.check();
                }
              }
              if (this._traversal.length >= 1) {
                this._setWidgetFirstFocusNode("AI", true);
              }
              //Disable attachments editor for the layers which are not editable
              //add timeout as it is taking some time to load editor
              this.loading.show();
              setTimeout(lang.hitch(this, function () {
                if (this.attrInspector._attachmentEditor && (!this.currentLayerInfo.isEditable ||
                  !this.currentLayerInfo._editFlag)) {
                  this._disableAttachments(this.attrInspector._attachmentEditor, true, false);
                }
                this.loading.hide();
              }), 1000);
            }), 200);
            this.contentWrapper = prevContentWrapper;
            this.navButtonsDiv = prevPaginationWrapper;
            return;
          }
        }
        if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
          if (this.attrInspector) {
            if (this.attrInspector._numFeatures === 0) {
              this._showTemplate(true);
              this._setWidgetFirstFocusNode("templatePicker", true);
            }
          }
        }
        if (this.map.infoWindow.isShowing) {
          this.map.infoWindow.hide();
        }
        this._removeLayerVisibleHandler();
      },

      //create instance of XYCoordinates
      _createCoordinatesPopup: function () {
        this._coordinates = new XYCoordinates({
          map: this.map,
          nls: this.nls,
          geometryService: this.geometryService
        });
        //Listen for event and get the updated location
        on(this._coordinates, "gotoSelectedLocation", lang.hitch(this, function (coordsData) {
          this._getUpdatedLocation(coordsData).then(lang.hitch(this,
            function (updatedLocation) {
              //Move graphics to updated location
              this.currentFeature.setGeometry(updatedLocation);
              this.map.centerAt(updatedLocation);
              this.geometryEdited();
            }), function () {
              //TODO : error handler
            });
        }));
      },

      _getUpdatedLocation: function (coordsData) {
        var newPoint, firstPoint, secondPoint, locationDef;
        locationDef = new Deferred();
        firstPoint = parseFloat(coordsData.firstPoint);
        secondPoint = parseFloat(coordsData.secondPoint);
        //Convert the coordinates as per coordinates system
        if (coordsData.coordinateSystem === "Map Spatial Reference") {
          newPoint = new Point(firstPoint, secondPoint,
            this.map.spatialReference);
          locationDef.resolve(newPoint);
        } else {
          newPoint = new Point(secondPoint, firstPoint, new SpatialReference(4326));
          coordinateUtils.getProjectedGeometry(newPoint, this.map.spatialReference,
            this.geometryService).then(
              lang.hitch(this, function (coordinatesInfo) {
                locationDef.resolve(coordinatesInfo);
              }), function () {
                //TODO : error handler
              });
        }
        return locationDef.promise;
      },

      _toggleAttrInspectorNavButtons: function () {
        var currentNavigationNode;
        if (query(".esriAttrPaginationDiv") && this._traversal) {
          currentNavigationNode = query(".esriAttrPaginationDiv")[this._traversal.length - 1];
        }
        //Do the action only of pagination node is found
        //No navigation node means the current panel is showing temp feature
        if (currentNavigationNode) {
          if (this.attrInspector && this.attrInspector._selection.length > 1) {
            domStyle.set(currentNavigationNode, "display", "block");
            if (currentNavigationNode.nextElementSibling) {
              domStyle.set(currentNavigationNode.nextElementSibling, "max-height", "calc(100% - 65px)");
              domStyle.set(currentNavigationNode.nextElementSibling, "margin-top", "5px");
            }
          } else {
            domStyle.set(currentNavigationNode, "display", "none");
            if (currentNavigationNode.nextElementSibling) {
              domStyle.set(currentNavigationNode.nextElementSibling, "max-height", "calc(100% - 40px)");
              domStyle.set(currentNavigationNode.nextElementSibling, "margin-top", "0px");
            }
          }
        }
      },
      startup: function () {
        this.inherited(arguments);
        // Update the drawing options by adding the label text from nls fetched
        // from this widget.
        this._updatedDrawingOptions();
        //create instance of geometryService
        if (this.appConfig.geometryService) {
          this.geometryService = new GeometryService(this.appConfig.geometryService);
        } else {
          Message({
            message: this.nls.geometryServiceURLNotFoundMSG
          });
          return;
        }
        if (this.appConfig.theme.name === "TabTheme") {
          //override the panel styles
          domClass.add(this.domNode.parentElement, "esriCTOverridePanelStyle");
        }
        this._createOverDef = new Deferred();
        //get selected theme color
        this._getSelectedThemeColor();
        //this.loaded_state = new this.widget_loaded({
        //  loaded: false
        //});
        if (this.config.editor.hasOwnProperty("displayPresetTop")) {
          if (this.config.editor.displayPresetTop === true) {
            dojo.place('presetFieldsTableDiv', 'templatePickerDiv', 'before');
          }
        }
        topic.subscribe("smartEditor/validate", lang.hitch(this, this._validateEventHandler));
        this._progressDiv = domConstruct.create("div", { "class": "processing-indicator-panel" });
        var parentDom = this.getParent().domNode.parentNode;
        parentDom.insertBefore(this._progressDiv, parentDom.firstChild);

        this.widgetActiveIndicator = domConstruct.create("div", { "class": "widgetActive widgetIndicator" });
        parentDom.insertBefore(this.widgetActiveIndicator, parentDom.firstChild);
        if (this.config.editor.editDescription === undefined || this.config.editor.editDescription === null ||
          this.config.editor.editDescription === "<br>") {
          this.config.editor.editDescription = '';
          this.templateTitle.innerHTML = this.config.editor.editDescription;
          domStyle.set(this.templateTitle, "display", "none");
          domAttr.set(this.templateTitle, "tabindex", "-1");
        }
        else {
          var content = this.editorXssFilter.sanitize(this.config.editor.editDescription);
          this.templateTitle.innerHTML = entities.decode(content);
          //set aria-label by using stripHTMl as description may contains html
          domAttr.set(this.templateTitle, "aria-label",
            utils.stripHTML(this.config.editor.editDescription));
          //dispaly the description and set the tabindex to 0
          domStyle.set(this.templateTitle, "display", "block");
          domStyle.set(this.templateTitle, "font-size", "11pt");
          domAttr.set(this.templateTitle, "tabindex", "0");
        }

        this._orignls = esriBundle.widgets.attachmentEditor.NLS_attachments;
        //this.nls = lang.mixin(this.nls, window.jimuNls.common);
        this.loading = new LoadingIndicator({
          hidden: true
        });
        this.loading.placeAt(this.domNode);

        this.attachmentloading = new LoadingIndicator({
          hidden: true
        });
        this.loading.placeAt(this.domNode);

        this.editToolbar = new Edit(this.map);
        this.drawToolbar = new Draw(this.map);

        this._createDrawingToolbar();

        // edit events
        this.own(on(this.editToolbar,
          "graphic-move-stop, rotate-stop, scale-stop, vertex-move-stop, vertex-click",
          lang.hitch(this, this.geometryEdited)));

        // draw event
        //updated to draw-complete as draw-end is depricated
        this.own(on(this.drawToolbar, "draw-complete", lang.hitch(this, function (evt) {
          //added fix - if polygon is drawn with only two vertices
          //in such case dont do anything let the tool be active and let user draw valid polygon
          if (evt.geometry && evt.geometry.rings && evt.geometry.rings.length === 1 &&
            evt.geometry.rings[0].length < 4) {
            return;
          }
          this.drawToolbar.deactivate();
          this._addGraphicToLocalLayer(evt);
        })));


        this.privilegeUtil = PrivilegeUtil.getInstance();
        //<div class="processing-indicator-panel"></div>
        this._setTheme();
        this.shelter.show();
        LayerInfos.getInstance(this.map, this.map.itemInfo)
          .then(lang.hitch(this, function (operLayerInfos) {
            //This is a quick resolution to get the layer details
            //for map server layers
            operLayerInfos.traversalLayerInfosOfWebmap(function (layerInfo) {
              //This will load the layer data
              layerInfo.getLayerObject();
            });

            var timeoutValue;
            if (this.appConfig.theme.name === "BoxTheme") {
              timeoutValue = 1050;

            } else {
              timeoutValue = 1;
            }
            setTimeout(lang.hitch(this, function () {
              //Function below was to load level 1 user and disable the widget, but since level 1 should be able to edit
              //public services, all paths initialize the control
              this.initialLoad = true;
              this.privilegeUtil.loadPrivileges(this._getPortalUrl()).then(lang.hitch(this, function (status) {
                var valid = true;
                this._user = null;
                var portal = portalUtils.getPortal(this.appConfig.portalUrl);
                var userInfo = this.privilegeUtil.getUser();
                this._validateUserInfoAndLocator(portal).then(lang.hitch(this, function (canGeocode) {
                  this.canGeocode = canGeocode;
                  if (!status) {
                    valid = this._initControl(operLayerInfos);
                  } else {
                    if (userInfo) {
                      this._user = userInfo.username;
                      if (this.privilegeUtil.userRole.canEditFeatures() === true) {
                        valid = this._initControl(operLayerInfos);
                      }
                      else if (this.privilegeUtil.userRole.canEditFeaturesFullControl === true) {
                        valid = this._initControl(operLayerInfos);
                      }
                      else {
                        //valid = this._initControl(operLayerInfos);
                        valid = false;
                        //this._noPrivilegeHandler(window.jimuNls.noEditPrivileges);//this.nls.noEditPrivileges);
                      }
                    }
                  }
                  this.initialLoad = false;
                }));

                if (valid === false) {
                  this._noPrivilegeHandler(window.jimuNls.noEditPrivileges);//this.nls.invalidConfiguration);
                }

                this.shelter.hide();

              }), lang.hitch(this, function () {
                this.initialLoad = false;
                this._initControl(operLayerInfos);
                //this._noPrivilegeHandler(window.jimuNls.noEditPrivileges);//this.nls.noEditPrivileges);
              }));
              this.shelter.hide();
              this._workBeforeCreate();

            }), timeoutValue);
          }));
      },

      /**
      * This function validates user info and locator
      */
      _validateUserInfoAndLocator: function (portal) {
        var def;
        def = new Deferred();
        //Check if address action is configured and then only perform all the other operation
        if (this._isLocatorRequired()) {
          //If configured locator is not the esri world geocoder
          //the locator will ask for credentials if it is secured while performing the operation
          if (!this._isEsriLocator(this.config.geocoderSettings.url)) {
            def.resolve(true);
            //If esri geocoder is used with in the portal, validate it on load
          } else if (this._isEsriLocator(this.config.geocoderSettings.url) &&
            this._isPortalUser(portal)) {
            //For portal user, ask user to sign in to AGOL
            //This way we can validate if user has privileges, credits to perform geocoding
            var newPortalInstance = new esriPortal.Portal("https://www.arcgis.com");
            this._promptUserForLogin(newPortalInstance).then(lang.hitch(this,
              function (canPerformOperation) {
                def.resolve(canPerformOperation);
              }));
          } else {
            //If esri locator is configured, check if user is logged in to the system
            //If logged in then check if user has credits to perform the geocoding operation
            if (!this.privilegeUtil.getUser()) {
              var newPortalInstance = new esriPortal.Portal("https://www.arcgis.com");
              this._promptUserForLogin(newPortalInstance).then(lang.hitch(this, function (canPerformOperation) {
                def.resolve(canPerformOperation);
              }));
            } else {
              //Check for user privileges to make sure user has the geocoding rights
              if (this._checkUserPrivileges(this.privilegeUtil.getUser())) {
                //If user has credits, validate locator or show the warning message
                if (this._hasCredits(this.privilegeUtil.getUser(), portal)) {
                  this._validateLocatorURL().then(lang.hitch(this, function (canPerformOperation) {
                    this.userToken = portal.credential.token;
                    def.resolve(canPerformOperation);
                  }));
                } else {
                  new Message({
                    message: String.substitute(this.nls.noCreditsOrPrivilegeWarningMessage, {
                      widgetName: this.label
                    })
                  });
                  def.resolve(false);
                }
              } else {
                new Message({
                  message: String.substitute(this.nls.noCreditsOrPrivilegeWarningMessage, {
                    widgetName: this.label
                  })
                });
                def.resolve(false);
              }
            }
          }
        } else {
          def.resolve(false);
        }
        return def.promise;
      },

      _checkUserPrivileges: function (userInfo) {
        var hasGeocodingPrivileges = false;
        if (userInfo && userInfo.privileges &&
          userInfo.privileges.indexOf("premium:user:geocode") !== -1 &&
          userInfo.privileges.indexOf("premium:user:geocode:stored") !== -1) {
          hasGeocodingPrivileges = true;
        }
        return hasGeocodingPrivileges;
      },

      /**
      * The function returns is the user is working with portal or not
      * required or not
      */
      _isPortalUser: function (portal) {
        return portal.isPortal;
      },

      /**
      * The function returns boolean value which indicates whether the locator
      * required or not
      */
      _isLocatorRequired: function () {
        var isRequired = false;
        if (this.config.geocoderSettings.url && this.config.hasOwnProperty("attributeActionGroups") &&
          Object.keys(this.config.attributeActionGroups.Address).length > 0) {
          isRequired = true;
        }
        return isRequired;
      },

      /**
      * Shows the message popup which asks user whether they want to login or not
      */
      _promptUserForLogin: function (portal) {
        var def = new Deferred();
        var dialog = new Popup({
          titleLabel: this.nls.loginPopupTitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: String.substitute(this.nls.loginPopupMessage, {
            widgetName: this.label
          }),
          buttons: [{
            label: this.nls.yes,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              dialog.close();
              this._loginUser(portal, true).then(lang.hitch(this, function (isSuccessful) {
                def.resolve(isSuccessful);
              }));
            })
          }, {
            label: this.nls.no,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              dialog.close();
              //If user aborts the sign in process
              //show the warning message
              new Message({
                message: this.nls.unableToUseLocator
              });
              def.resolve(false);
            })
          }]
        });
        return def.promise;
      },

      /**
      * This function prompts user for credentials
      */
      _loginUser: function (portal, canPerformTheAction) {
        var loginDef = new Deferred();
        if (canPerformTheAction) {
          portal.signIn().then(lang.hitch(this, function () {
            //Need to get the detailed user info as sign in gives basic information
            var userInfo = portal.getPortalUser();
              //Check for user privileges to make sure user has the geocoding rights
            if (userInfo && this._checkUserPrivileges(userInfo)) {
                //check if user has credits
                //if user do not have credits then show the warning message
                if (this._hasCredits(userInfo, portal)) {
                  this._validateLocatorURL().then(lang.hitch(this, function (canPerformOperation) {
                    this.userToken = userInfo.credential.token;
                    loginDef.resolve(canPerformOperation);
                  }));
                } else {
                  new Message({
                    message: String.substitute(this.nls.noCreditsOrPrivilegeWarningMessage, {
                      widgetName: this.label
                    })
                  });
                  loginDef.resolve(false);
                }
              } else {
                new Message({
                  message: String.substitute(this.nls.noCreditsOrPrivilegeWarningMessage, {
                    widgetName: this.label
                  })
                });
                loginDef.resolve(false);
              }
          }), lang.hitch(this, function () {
            //If user fails to sign in or aborts the sign in process
            //show the warning message
            new Message({
              message: this.nls.unableToUseLocator
            });
            loginDef.resolve(false);
          }));
        } else {
          loginDef.resolve(false);
        }
        return loginDef.promise;
      },

      /**
      * This function is validates configured geocoder url
      */
      _validateLocatorURL: function () {
        var locatorDef = new Deferred(), locatorRequest;
        //If locator url is configured, validate the same
        //otherwise show the appropriate warning message
        if (this.config.geocoderSettings.url !== "") {
          locatorRequest = esriRequest({
            url: this.config.geocoderSettings.url,
            content: {
              f: 'json'
            },
            handleAs: 'json'
          });
          locatorRequest.then(
            function () {
              locatorDef.resolve(true);
            }, lang.hitch(this, function () {
              locatorDef.resolve(false);
              new Message({
                message: this.nls.unableToUseLocator
              });
            }));
        } else {
          locatorDef.resolve(false);
          new Message({
            message: this.nls.locatorDisabledWaning
          });
        }
        return locatorDef.promise;
      },

      /**
      * This function is used to check if logged in user has credits
      */
      _hasCredits: function (userInfo, portal) {
        var userCredits = 0;
        //user.availableCredits only has a value when credit limits are enabled
        if (userInfo && userInfo.hasOwnProperty("availableCredits")) {
          userCredits = userInfo.availableCredits;
        } else if (portal && portal.hasOwnProperty("availableCredits")) {
          userCredits = portal.availableCredits;
        }
        return userCredits;
      },

      /**
      * This function is used to check if the locator is esri locator
      */
      _isEsriLocator: function (url) {
        this._esriLocatorRegExp.lastIndex = 0;
        return this._esriLocatorRegExp.test(url);
      },

      /**
       * This function is used to perform further execution once editing of geometry like
       * moving geometry is completed
       */
      geometryEdited: function () {
        var canAutoSave = false, attributeRefreshed = false;
        //this._updateRefreshButtonState();
        //autoSaveAttrUpdates is on then fetch updated field values on geometry update
        if ((this.config.editor.hasOwnProperty("autoSaveAttrUpdates") &&
          this.config.editor.autoSaveAttrUpdates) &&
          (this.currentLayerInfo && !this.currentLayerInfo.isCache)) {
          canAutoSave = true;
        }

        if ((this._refreshButton && this.config.editor.enableAttributeUpdates)) {
          //if automatic update is configured to true show refresh button
          if (this.config.editor.enableAutomaticAttributeUpdates) {
            domClass.remove(this._refreshButton, "hidden");
            //if automatic update is 'ON' in the widget then call refresh attribute function
            if (domClass.contains(this._refreshButton, "esriCTAutoUpdateOnMode")) {
              this._refreshAttributes();
              attributeRefreshed = true;
            }
          }
        }
        this.geometryChanged = true;
        this._enableAttrInspectorSaveButton(this._validateAttributes());
        if (!attributeRefreshed && canAutoSave) {
          this._autoSaveFeatureEdits();
        }
      },

      _noPrivilegeHandler: function (message) {
        this.templateTitle.innerHTML = message;
        //set aria-label by using stripHTMl as description may contains html
        domAttr.set(this.templateTitle, "aria-label", message);
        //dispaly the description and set the tabindex to 0
        domStyle.set(this.templateTitle, "display", "block");
        domAttr.set(this.templateTitle, "tabindex", "0");
        if (this.templatePicker) {
          dojo.style(this.templatePicker.domNode, "display", "none");
          if (this._mapClick) {

            this._mapClick.remove();
            this._mapClick = null;
          }
        }
        if (this.drawingTool) {
          dojo.style(this.drawingTool.domNode, "display", "none");
        }
        if (this.presetFieldsTableDiv) {
          dojo.style(this.presetFieldsTableDiv, "display", "none");
        }
        utils.initFirstFocusNode(this.domNode, this.templateTitle);
        utils.initLastFocusNode(this.domNode, this.templateTitle);
        utils.focusFirstFocusNode(this.domNode);
        this.map.setInfoWindowOnClick(true);
        this.shelter.hide();
      },
      _getPortalUrl: function (url) {
        if (url) {
          return portalUrlUtils.getStandardPortalUrl(url);
        } else {
          return portalUrlUtils.getStandardPortalUrl(this.appConfig.portalUrl);
        }
      },
      feature_action_select: function (features, featureLayer) {
        // features probably is empty.
        if (!featureLayer) {
          return;
        }
        if (!features) {
          return;
        }
        if (features.length === 0) {
          return;
        }
        if (this.state !== 'active') {
          this.widgetManager.activateWidget(this);
        }
        var firstFeature = features[0];
        if (this._validateFeatureChanged() && this.currentFeature) {
          // do not show templatePicker after saving
          if (this.config.editor.displayPromptOnSave && this.config.editor.displayPromptOnSave === true) {
            this._promptToResolvePendingEdit(false, { featureLayer: featureLayer, feature: firstFeature }, false, true);
          } else {
            this.load_from_featureaction(featureLayer, firstFeature);
          }
        } else {
          this.load_from_featureaction(featureLayer, firstFeature);
        }
      },
      load_from_featureaction: function (featureLayer, firstFeature) {
        //CT- Commented as now we need to clear multiple layer from multiple AI
        /* if (this.updateFeatures) {
           var layersRefresh = [];
           array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
             var layer = feature.getLayer();
             if (layersRefresh && layersRefresh.indexOf(layer.id) === -1) {
               layersRefresh.push(layer.id);
               layer.clearSelection();
               layer.refresh();
             }
           }));
         }*/
        this._clearLayerSelection();
        if (this.contentWrapper && this.contentWrapper.parentNode &&
          !domClass.contains(this.contentWrapper, "hidden")) {
          this.contentWrapper.parentNode.removeChild(this.contentWrapper);
          //Remove all the previously created pagination dom's before creating new AI
          query(".esriAttrPaginationDiv", this.domNode).forEach(
            lang.hitch(this, function (paginationDom) {
              domConstruct.destroy(paginationDom);
            }));
        }
        //reset array
        this._traversal = [];
        this._nodesCollection = [];
        this._paginationNodeCollection = [];
        this._buttonsWrapper = [];
        this._attributeInspectorCollection = [];
        this._relatedTablesInfo = {};
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;

        this.map.infoWindow.hide();
        if (this.viewedLayerDetails.length > 0) {
          this.loading.show();
          featureLayer = this._getLayerInfoByID(this.viewedLayerDetails.shift());
          firstFeature = this.viewedFeatureDetails.shift();
          this._traverseToSelectedFeature(featureLayer, firstFeature);
        }
      },

      _clearLayerSelection: function () {
        if (this._attributeInspectorCollection && this._attributeInspectorCollection.length > 0) {
          array.forEach(this._attributeInspectorCollection, function (attrInspector) {
            //clear previous selections of layer
            if (attrInspector) {
              //as now prev attribute inspector could have multiple features of multiple layer
              //clear selections of all layers in layer infos
              if (attrInspector.layerInfos) {
                var layerInfos = LayerInfos.getInstanceSync();
                array.forEach(attrInspector.layerInfos, function (layerInfo) {
                  var layer = layerInfo.featureLayer;
                  layer.clearSelection();
                  layer.refresh();
                  var fs_url = layerInfo.featureLayer.url;
                  if (layerInfo.featureLayer.hasOwnProperty("originalLayerId")) {
                    layID = layerInfo.featureLayer.originalLayerId;
                    if (layerInfo.id != layID) {
                      layer = layerInfo.featureLayer;
                      layer.clearSelection();
                      layer.refresh();
                      layerInfo = layerInfos.getLayerInfoById(layID);
                      if (layerInfo.layerObject) {
                        fs_url = layerInfo.layerObject.url;
                      }
                    }
                  }
                  if (fs_url) {
                    var fs_root = fs_url.split('/FeatureServer')[0];
                    array.forEach(layerInfos.getLayerInfoArray(), function (layerInfo) {
                      if (typeof (layerInfo.layerObject.url) !== "undefined") {
                        if (layerInfo.layerObject.url !== null) {
                          if (layerInfo.layerObject.url.includes('/MapServer') && layerInfo.layerObject.url.includes(fs_root)) {
                            layerInfo.layerObject.refresh();
                          }
                        }
                      }
                    }, this);
                  }
                });
              }
              attrInspector.destroy();
            }
          });
        }
        //clear previous selections of layer
        if (this.attrInspector) {
          //as now prev attribute inspector could have multiple features of multiple layer
          //clear selections of all layers in layer infos
          if (this.attrInspector.layerInfos) {
            var layerInfos = LayerInfos.getInstanceSync();
            array.forEach(this.attrInspector.layerInfos, function (layerInfo) {
              var layer = layerInfo.featureLayer;
              //If layer is not queryable then clearSelection doesn't clear the
              //actual feature on the map
              //Workaround is to remove feature from the layer
              //Need to check different cases
              //Need to think more cleaner approach
              if (!layer.isQueryable() && layer.graphics.length >= 0) {
                layer.remove(layer.graphics[0]);
              }
              layer.clearSelection();
              layer.refresh();
              var fs_url = layerInfo.featureLayer.url;
              if (layerInfo.featureLayer.hasOwnProperty("originalLayerId")) {
                layID = layerInfo.featureLayer.originalLayerId;
                if (layerInfo.id != layID) {
                  layer = layerInfo.featureLayer;
                  layer.clearSelection();
                  layer.refresh();
                  layerInfo = layerInfos.getLayerInfoById(layID);
                  if (layerInfo.layerObject) {
                    fs_url = layerInfo.layerObject.url;
                  }
                }

              }
              if (fs_url) {
                var fs_root = fs_url.split('/FeatureServer')[0];
                array.forEach(layerInfos.getLayerInfoArray(), function (layerInfo) {
                  if (typeof (layerInfo.layerObject.url) !== "undefined") {
                    if (layerInfo.layerObject.url !== null) {
                      if (layerInfo.layerObject.url.includes('/MapServer') && layerInfo.layerObject.url.includes(fs_root)) {
                        layerInfo.layerObject.refresh();
                      }
                    }
                  }
                }, this);
              }
            });
          }
          this.attrInspector.destroy();
        }
      },
      _traverseToSelectedFeature: function (featureLayer, feature) {
        var def = new Deferred();
        var tempFeature;
        if (this.viewedFeatureDetails.length > 0) {
          tempFeature = this.viewedFeatureDetails[0];
          if (this.viewedLayerDetails[0] === this.viewedLayerDetails[1]) {
            tempFeature = this.viewedFeatureDetails[1];
          }
        }

        this._createAttributeInspector([featureLayer], false, null, def, tempFeature);
        if (feature) {
          SelectionManager.getInstance().setSelection(featureLayer.featureLayer, feature).then(
            lang.hitch(this, function () {
              var selectedFeatures = featureLayer.featureLayer.getSelectedFeatures();
              this.updateFeatures = selectedFeatures;
              if (this.updateFeatures.length > 0) {
                this._showTemplate(false);
              }
            }));
        }
        def.then(lang.hitch(this, function () {
          if (this.viewedLayerDetails.length > 0) {
            var relatedFeatureLayerId = this.viewedLayerDetails.shift();
            this.viewedFeatureDetails.shift();
            if (this.viewedLayerDetails.length > 0 && this.viewedLayerDetails[0] === relatedFeatureLayerId) {
              this.viewedLayerDetails.shift();
              this.viewedFeatureDetails.shift();
            }
            var tableTitle = query("[layerid='" + relatedFeatureLayerId + "']", this.contentWrapper)[0];
            //Check for table title container before calling click
            if (tableTitle) {
              tableTitle.click();
            }
          }
          if (this.viewedLayerDetails.length === 0) {
            this.loading.hide();
          }
        }));
      },

      _getFeatureIndexToSelect: function (relatedFeature) {
        var featureOID, featureIndex = -1;
        featureOID = relatedFeature.attributes[relatedFeature._layer.objectIdField];
        array.some(this.attrInspector._selection, lang.hitch(this, function (feature, index) {
          if (feature.attributes[feature._layer.objectIdField] === featureOID) {
            featureIndex = index;
            return true;
          }
        }));
        return featureIndex;
      },
      //Function from the feature action
      beginEditingByFeatures: function (features, featureLayer, viewedLayerDetails, viewedFeatureDetails) {
        //when opening selected features in Smart Editor widget
        //if the copy features screen is open it needs to be cleared
        if (this._copyFeaturesObj) {
          //set currentDrawtype to null as in case if copy features we set it to 'SELECT'
          //and it shows console error if we dont set drawType to null
          this.currentDrawType = null;
          this._copyFeaturesObj.cancelBtnClicked();
        }
        //clear the temporary graphics if present
        if (this.cacheLayer) {
          this.cacheLayer.clear();
        }
        this.viewedLayerDetails = viewedLayerDetails;
        this.viewedFeatureDetails = viewedFeatureDetails;
        if (!featureLayer) {
          return;
        }
        if (!features) {
          return;
        }
        if (features.length === 0) {
          return;
        }
        this._createOverDef.then(lang.hitch(this, function () {
          this.feature_action_select(features, featureLayer);

        }));
        //if (this.loaded_state.get('loaded') === true) {
        //  this.feature_action_select(features, featureLayer);
        //}
        //else {
        //  this.loaded_state.watch("loaded", lang.hitch(this,function(name, oldValue, value){
        //    if (name === 'loaded' && value === true && oldValue === false) {
        //      this.feature_action_select(features, featureLayer);
        //    }
        //  }));
        //}

      },



      onReceiveData: function (name, widgetId, data, historyData) {
        if (this.config.editor) {
          historyData = historyData;
          widgetId = widgetId;
          //if current location is received from My Location widget
          if (name === "MyLocation" && data.hasOwnProperty('geoLocationResult')) {
            if (this._moveToGPSDef) {
              if (data.geoLocationResult) {
                this._moveToGPSDef.resolve(data.geoLocationResult);
              } else {
                this._fetchCurrentLocation();
              }
            }
            if (this._myLocationInfoDef) {
              if (data.geoLocationResult) {
                this._myLocationInfoDef.resolve(data.geoLocationResult);
              } else {
                this._fetchCurrentLocation();
              }
            }
            return;
          }
          //If select and attribute table is emitting the data
          //get the selected features of the layer and show the attribute inspector
          if ((name === "Select" || name === "AttributeTable") && data &&
            data.hasOwnProperty("selectionInfo") && !this._attrInspIsCurrentlyDisplayed) {
            var featureSelectionObj = this._getFeaturesToBeSelectedInAI(data.selectionInfo);
            //If the widget is opened for first time and there is existing selection
            //ask user if he wants to load those selections in AI
            if (this.initialLoad && Object.keys(featureSelectionObj.selectionInfo).length > 0) {
              this._promptUserToShowSelectionInAI(featureSelectionObj.selectionInfo,
                featureSelectionObj.layers);
            } else {
              this._showAttributeInspector(featureSelectionObj.selectionInfo, featureSelectionObj.layers);
            }
          } else if ((name === "Select" || name === "AttributeTable") && data &&
            data.hasOwnProperty("selectionInfo") && this._attrInspIsCurrentlyDisplayed) {
            //If AI is in display and selection do not have any features
            //we need to hide the AI
            var hideAI = true;
            for (var layerID in data.selectionInfo) {
              if (data.selectionInfo[layerID] &&
                data.selectionInfo[layerID].length > 0) {
                hideAI = false
              }
            }
            //Hide the AI and show the appropriate message
            if (hideAI) {
              dojo.query(".jimu-widget-smartEditor .attributeInspectorMainDiv")[0].style.display = "none";
              this._attrInspIsCurrentlyDisplayed = false;
              domStyle.set(this.noFeatureWarningMessage, "display", "block");
              this._setWidgetFirstFocusNode("noFeatures", true);
            }
            this.updateFeatures = this.attrInspector._selection;
          }
          if (this.config.editor.hasOwnProperty("listenToGF")) {
            if (this.config.editor.listenToGF !== true) {
              return;
            }
          } else {
            return;
          }
          if (name !== 'GroupFilter') {
            return;
          }

          if(Array.isArray(data.message)) {
            //new at 7.4, group filter passes an array of all group filterings.
            if(data.message.length > 0) {
              array.forEach(data.message, lang.hitch(this, function(gf) {
                if (gf.hasOwnProperty("fields") &&
                gf.hasOwnProperty("values")) {
                  //if groupName is available set preset values using it
                  //else for backward compatibility using field name set values for preset groups
                  if (gf.hasOwnProperty("groupName")) {
                    this._setPresetValueValue(null, gf.values[0], gf.groupName);
                  } else {
                    array.forEach(gf.fields, function (field) {
                      this._setPresetValueValue(field, gf.values[0], null);
                    }, this);
                  }
                }
              }));
            }
          } else {
            //for backward compatibility when w2w was an object an dnot an array
            if (data.message.hasOwnProperty("fields") &&
            data.message.hasOwnProperty("values")) {
              //if groupName is available set preset values using it
              //else for backward compatibility using field name set values for preset groups
              if (data.message.hasOwnProperty("groupName")) {
                this._setPresetValueValue(null, data.message.values[0], data.message.groupName);
              } else {
                array.forEach(data.message.fields, function (field) {
                  this._setPresetValueValue(field, data.message.values[0], null);
                }, this);
              }
            }
          }
        }
      },

      _getFeaturesToBeSelectedInAI: function (selectionInfo) {
        var updatedSelectionInfo = {}, layers = [];
        //Loop through all the layers and only keep the
        //Selection info of editable layers
        array.forEach(this.config.editor.configInfos, lang.hitch(this, function (layer) {
          if (layer._editFlag) {
            layers.push(layer);
            if (selectionInfo[layer.layerInfo.id] && selectionInfo[layer.layerInfo.id].length > 0) {
              updatedSelectionInfo[layer.layerInfo.id] = selectionInfo[layer.layerInfo.id];
            }
          }
        }));
        return {
          selectionInfo: updatedSelectionInfo,
          layers: layers
        };
      },

      _promptUserToShowSelectionInAI: function (selectionInfo, layers) {
        var dialog = new Popup({
          titleLabel: this.nls.showSelectionInAITitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: String.substitute(this.nls.showSelectionInAIMsg, {
            widgetName: this.label
          }),
          buttons: [{
            label: this.nls.yes,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              //If user press yes button
              //load the current selection in attribute inspector
              this._showAttributeInspector(selectionInfo, layers);
              dialog.close();
            })
          }, {
            label: this.nls.no,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              //If user press no button
              //close the dialog and do nothing
              dialog.close();
            })
          }]
        });
      },

      _showAttributeInspector: function (selectionInfo, layers) {
        //Create attribute inspector
        if (Object.keys(selectionInfo).length > 0) {
          this.updateFeatures = [];
          //Only pass editable layers to the attribute inspector
          this._createAttributeInspector(layers);
          for (var layerID in selectionInfo) {
            var layerInfo, query;
            layerInfo = this._jimuLayerInfos.getLayerInfoById(layerID);
            query = new Query();
            query.objectIds = selectionInfo[layerID];
            layerInfo.layerObject.selectFeatures(query, FeatureLayer.SELECTION_NEW,
              lang.hitch(this, function (selectedFeatures) {
                //Once the features are selected, update the necessary flags
                //show AI and bind all the events
                this.updateFeatures = selectedFeatures;
                if (this.updateFeatures.length > 0 && !this._attrInspIsCurrentlyDisplayed) {
                  this._showTemplate(false);
                  this._setWidgetFirstFocusNode("AI", true);
                  this._connectLayerSelectionClearedOutside();
                }
              }), lang.hitch(this, function () {
                this.loading.hide();
              }));
          }
        }
      },


      /*jshint unused:true */
      _setTheme: function () {
        //if (this.appConfig.theme.name === "BoxTheme" ||
        //    this.appConfig.theme.name === "DartTheme" ||
        //    this.appConfig.theme.name === "LaunchpadTheme") {
        var styleLink;
        if (this.appConfig.theme.name === "DartTheme") {
          utils.loadStyleLink('dartOverrideCSS', this.folderUrl + "/css/dartTheme.css", null);
        }
        else {
          styleLink = document.getElementById("dartOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
        if (this.appConfig.theme.name === "LaunchpadTheme") {
          utils.loadStyleLink('launchpadOverrideCSS', this.folderUrl + "/css/launchpadTheme.css", null);
        }
        else {
          styleLink = document.getElementById("launchpadOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
        if (this.appConfig.theme.name === "DashboardTheme") {
          utils.loadStyleLink('dashboardOverrideCSS', this.folderUrl + "/css/dashboardTheme.css", null);
        }
        else {
          styleLink = document.getElementById("dashboardOverrideCSS");
          if (styleLink) {
            styleLink.disabled = true;
          }
        }
      },
      _mapClickHandler: function (create) {
        if (create === true && this._attrInspIsCurrentlyDisplayed === false) {
          this.map.setInfoWindowOnClick(false);
          if (this._mapClick === undefined || this._mapClick === null) {
            this._mapClick = on(this.map, "click", lang.hitch(this, this._onMapClick));
          }
          //this._activateTemplateToolbar();
        }
        else if (create === true && this._attrInspIsCurrentlyDisplayed === true) {
          if (this._mapClick) {
            this._mapClick.remove();
            this._mapClick = null;
          }
          this.map.setInfoWindowOnClick(true);
          //this._validateAttributes();
        }
        else {
          if (this._mapClick) {

            this._mapClick.remove();
            this._mapClick = null;
          }
          this.map.setInfoWindowOnClick(true);
          if (this.drawToolbar) {
            //this._lastDrawnShape = lang.clone(this.drawToolbar._points);
            this.drawToolbar.deactivate();
          }
        }
      },
      destroy: function () {
        this.inherited(arguments);

        if (this.attrInspector) {
          this.attrInspector.destroy();
        }
        this.attrInspector = null;

        if (this.templatePicker) {
          this.templatePicker.destroy();
        }
        this.templatePicker = null;
        if (this.currentDrawType) {
          this.currentDrawType = null;
        }
        if (this._menus !== null && this._menus !== undefined) {
          for (var property in SEDrawingOptions) {
            if (this._menus.hasOwnProperty(property)) {
              if (this._menus[property] !== null && this._menus[property] !== undefined) {
                this._menus[property].destroyRecursive(false);
              }
            }
          }
          this._menus = {};
        }
        if (this.drawingTool !== null && this.drawingTool !== undefined) {
          this.drawingTool.destroyRecursive(false);
          this.drawingTool = null;
        }
        this._enableFeatureReduction();
        this.inherited(arguments);
      },
      onActive: function () {
        if (this._userHasPrivilege === true) {
          if (domClass.contains(this.widgetActiveIndicator, "widgetNotActive")) {
            domClass.remove(this.widgetActiveIndicator, "widgetNotActive");
          }
          domClass.add(this.widgetActiveIndicator, "widgetActive");
          if (this.map) {
            this._disableFeatureReduction();
            if (this.templatePicker) {
              this.templatePicker.update();
            }
            this._mapClickHandler(true);
            //Remove selection clear handlers for all the layers so that,
            //it will work only for layer selection clear from outside the widget
            this._disconnectLayerSelectionClearedOutside();

            if (this._attrInspIsCurrentlyDisplayed === false) {
              var override = null;
              if (this.drawingTool && this.currentDrawType) {
                override = this.currentDrawType;
              }
              this._activateTemplateToolbar(override);
            }
          }
        }
      },
      _enableFeatureReduction: function () {
        if (this.clusterState === false) {
          array.forEach(this.featureReductionEnabledLayers, function (layer) {
            if (!layer.isFeatureReductionEnabled()) {
              layer.enableFeatureReduction();
            }
          });
          array.forEach(this.rendererDifferentLayers, function (layer) {
            if (layer._layerRenderer) {
              layer.setRenderer(layer._layerRenderer);
              layer.redraw();
            }
          });
          this.clusterState = true;
        }
      },
      _disableFeatureReduction: function () {
        if (this.clusterState === true) {
          array.forEach(this.featureReductionEnabledLayers, function (layer) {
            if (layer.isFeatureReductionEnabled()) {
              layer.disableFeatureReduction();
            }
          });
          array.forEach(this.rendererDifferentLayers, function (layer) {
            if (layer._serviceRendererJson) {
              layer.setRenderer(rendererJsonUtils.fromJson(layer._serviceRendererJson));
              layer.redraw();
            }
          });
          this.clusterState = false;
        }
      },

      _handleLayerSelectionClear: function (attrInspector) {
        if (attrInspector && attrInspector.layerInfos) {
          array.forEach(attrInspector.layerInfos, lang.hitch(this, function (layerInfo) {
            if (layerInfo.featureLayer) {
              var layerHandle = on(layerInfo.featureLayer, 'selection-clear',
                lang.hitch(this, this._onLayerSelectionCleared));
              this.own(layerHandle);
              //Bind the selection complete event
              var selectionCompleteHandle = on(layerInfo.featureLayer, 'selection-complete',
                lang.hitch(this, function () {
                  //Show the warning message only when attribute inspector is displayed and it does not have
                  //any features to show
                  if (this._attrInspIsCurrentlyDisplayed && this.attrInspector._numFeatures === 0) {
                    query(".jimu-widget-smartEditor .attributeInspectorMainDiv")[0].style.display = "none";
                    this._attrInspIsCurrentlyDisplayed = false;
                    domStyle.set(this.noFeatureWarningMessage, "display", "block");
                    this._setWidgetFirstFocusNode("noFeatures", true);
                  }
                }));
              this.own(selectionCompleteHandle);
              this._layerClearSelectionHandles.push(layerHandle);
              this._layerSelectionCompleteHandles.push(selectionCompleteHandle);
            }
          }));
        }
      },

      //Added this function  mulitple layers cleard from out side the widget
      //should not fire the _layerChangeOutside multiple times
      _onLayerSelectionCleared: function () {
        if (this._LayerSelectionClearedTimer) {
          clearTimeout(this._LayerSelectionClearedTimer);
        }
        this._LayerSelectionClearedTimer = setTimeout(lang.hitch(this, function () {
          if (!this._layerChangedOutside) {
            this._layerChangedOutside = true;
            domStyle.set(this.noFeatureWarningMessage, "display", "none");
            //show template picker and clear current AI
            this._navigateToMain();
          }
        }), 100);
      },

      _navigateToMain: function () {
        this._attrInspIsCurrentlyDisplayed = false;
        //this._mapClickHandler(true);
        this._showTemplatePicker();
        //reset array
        this._traversal = [];
        this._nodesCollection = [];
        this._paginationNodeCollection = [];
        this._buttonsWrapper = [];
        this._attributeInspectorCollection = [];
        this._relatedTablesInfo = {};
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
      },

      _connectLayerSelectionClearedOutside: function () {
        this._layerChangedOutside = false;
        this._disconnectLayerSelectionClearedOutside();
        if (this._attrInspIsCurrentlyDisplayed) {
          //handle layer selection clear for all the layers of all the atribute inspector else
          //only for the current attribute inspector
          if (this._attributeInspectorCollection && this._attributeInspectorCollection.length > 0) {
            array.forEach(this._attributeInspectorCollection, lang.hitch(this, function (attrInspector) {
              if (attrInspector) {
                this._handleLayerSelectionClear(attrInspector);
              }
            }));
          }
          if (this.attrInspector) {
            this._handleLayerSelectionClear(this.attrInspector);
          }
        }
      },

      _disconnectLayerSelectionClearedOutside: function () {
        if (this._layerClearSelectionHandles && this._layerClearSelectionHandles.length > 0) {
          array.forEach(this._layerClearSelectionHandles, lang.hitch(this, function (layerHandle) {
            layerHandle.remove();
          }));
        }
        if (this._layerSelectionCompleteHandles && this._layerSelectionCompleteHandles.length > 0) {
          array.forEach(this._layerSelectionCompleteHandles, lang.hitch(this, function (layerHandle) {
            layerHandle.remove();
          }));
        }
        this._layerClearSelectionHandles = [];
        this._layerSelectionCompleteHandles = [];
      },

      onDeActive: function () {
        if (domClass.contains(this.widgetActiveIndicator, "widgetActive")) {
          domClass.remove(this.widgetActiveIndicator, "widgetActive");
        }
        domClass.add(this.widgetActiveIndicator, "widgetNotActive");
        if (this.map) {
          this._mapClickHandler(false);
        }
        this._enableFeatureReduction();
        //Connect layers selection clear event for all the layer of all attributeInspectors
        this._connectLayerSelectionClearedOutside();
      },

      onOpen: function () {
        if (this._userHasPrivilege === true) {
          //this.fetchDataByName('GroupFilter');
          this._workBeforeCreate();
          //Activate the widget after some time to make sure the components are loaded
          setTimeout(lang.hitch(this, function () {
            this.widgetManager.activateWidget(this);
          }), 100);
        }
        if (this.templatePicker) {
          var templatePickerInstance;
          this.templatePicker.update();
          templatePickerInstance = query(".esriTemplatePicker", this.domNode);
          //Check display property of template picker and accordingly handle the preset dialog
          //display
          if (templatePickerInstance && templatePickerInstance[0]) {
            if (domStyle.get(templatePickerInstance[0], "display") === "none") {
              query(".presetFieldsTableDiv")[0].style.display = "none";
            } else {
              //Turn on the preset section only if preset is configured
              if (this.config.hasOwnProperty("attributeActionGroups") &&
                Object.keys(this.config.attributeActionGroups.Preset).length > 0 &&
                !domClass.contains(query(".ee-presetValueTableDiv", this.domNode)[0], "esriCTHidden")) {
                query(".presetFieldsTableDiv")[0].style.display = "block";
              }
            }
            //Check for the current open panel and set the first and last focus node
            if (this._attrInspIsCurrentlyDisplayed) {
              this._setWidgetFirstFocusNode("AI", true);
            } else {
              this._setWidgetFirstFocusNode("templatePicker", true);
            }
          }
        }
      },

      /**
      * This updates the config object with the newly added layers
      */
      _addNewLayersInConfig: function () {
        var configuredLayersArray = [];
        //Create list of all the configured layers
        array.forEach(this.config.editor.configInfos, lang.hitch(this, function (currentConfig) {
          configuredLayersArray.push(currentConfig.featureLayer.id);
        }));
        //Loop through all the layers and compare them with configured layer array
        //add all the feature layers in the config that are not configured
        array.forEach(this._jimuLayerInfos.getLayerInfoArray(),
          lang.hitch(this, function (layerInfo) {
            if (configuredLayersArray.indexOf(layerInfo.id) === -1 &&
              layerInfo.layerObject.url &&
              layerInfo.layerObject.type === "Feature Layer" && this._isValidLayer(layerInfo)) {
              var newLayerObj = {};
              newLayerObj = editUtils.createDefaultConfigInfo(layerInfo);
              if (newLayerObj._editFlag) {
                newLayerObj.layerInfo = layerInfo;
                newLayerObj.configFeatureLayer = newLayerObj.featureLayer;
                newLayerObj.featureLayer = newLayerObj.layerInfo.layerObject;
                newLayerObj.allowDelete = newLayerObj.configFeatureLayer.layerAllowsDelete || false;
                this.config.editor.configInfos.splice(0, 0, newLayerObj);
              }
            }
          }));
      },

      _getTableInfos: function () {
        var defs = [];
        var tableInfoArray = this._jimuLayerInfos.getTableInfoArray();
        array.forEach(tableInfoArray, function (jimuTableInfo) {
          defs.push(jimuTableInfo.getLayerObject());
        }, this);
        return all(defs);
      },

      _initControl: function (operLayerInfos) {
        this._userHasPrivilege = true;
        this._jimuLayerInfos = operLayerInfos;
        this._jimuLayerInfos.onlayerInfosChanged = lang.hitch(this, function (layerInfo, status) {
          //If the flag is not in the config or it is set to false
          //do not consider the newly added layers
          if (this.config.editor.hasOwnProperty("editAddDataLayers")) {
            if (this.config.editor.editAddDataLayers !== true) {
              return;
            }
          }
          var canUpdateLayers = false;
          //If layer is added in the map
          //check if it's a valid feature layer before adding it to the template picker
          if (status === "added") {
            var doesLayerExist = this._doesLayerExist(layerInfo.id).layerExist;
            if (layerInfo.id.indexOf("_lfl") === -1 &&
              layerInfo.layerObject.type === "Feature Layer" && layerInfo.layerObject.url &&
              !doesLayerExist && this._isValidLayer(layerInfo)) {
              var newLayerObj = {}, removedLayerObj;
              newLayerObj = editUtils.createDefaultConfigInfo(layerInfo);
              //Layer should be editable
              if (newLayerObj._editFlag) {
                newLayerObj.layerInfo = layerInfo;
                newLayerObj.configFeatureLayer = newLayerObj.featureLayer;
                newLayerObj.featureLayer = newLayerObj.layerInfo.layerObject;
                newLayerObj.allowDelete = newLayerObj.configFeatureLayer.layerAllowsDelete || false;
                newLayerObj.showDeleteButton = false;
                //Add the layer at the top of template picker
                //This is inline with the edit widget
                this.config.editor.configInfos.splice(0, 0, newLayerObj);
                canUpdateLayers = true;
                //Listen for the visibility and scale change event of newly added layers
                this.own(on(newLayerObj.featureLayer, "visibility-change, scale-visibility-change",
                  lang.hitch(this, function () {
                    if (this._layerScaleClearedTimer) {
                      clearTimeout(this._layerScaleClearedTimer);
                    }
                    this._layerScaleClearedTimer =
                      setTimeout(lang.hitch(this, function () {
                        this._createEditor(false);
                      }), 200);
                  })));
              }
            }
          } else if (status === "removed") {
            array.some(this.config.editor.configInfos, lang.hitch(this, function (configuredLayerInfo, index) {
              if (configuredLayerInfo.featureLayer.id === layerInfo.id) {
                removedLayerObj = layerInfo;
                this.config.editor.configInfos.splice(index, 1);
                canUpdateLayers = true;
                //If a layer is removed from template picker, make sure we are removing the features from AI
                if (this.attrInspector && this._attrInspIsCurrentlyDisplayed) {
                  this._removeFeaturesFromAI(layerInfo.id);
                }
                return true;
              }
            }));
          }

          //Update the template picker with new layers
          if (canUpdateLayers) {
            //If on load the template picker does not exist
            //then create template picker for the newly added layer
            if (!this.templatePicker) {
              this._createEditor();
            } else {
              //If template picker already exist
              //check if it has at least one editable layer
              var layers = this._getEditableLayers(this.config.editor.configInfos, false);
              if (layers.length === 0) {
                this._creationDisabledOnAll = true;
                //If no editable layers found, then hide all the main screen tools
                this._showOrHideMainScreenTools(true);
                //deactivate the toolbar
                if (this.drawToolbar) {
                  this.drawToolbar.deactivate();
                }
                if (this.templatePicker) {
                  //Clear the selected template and activate the map click
                  this._mapClickHandler(true);
                  this._clearTemplateSelection();
                }
                this._checkForLayersInTemplatePicker();
              } else {
                this._creationDisabledOnAll = false;
                //If no editable layers found, then hide all the main screen tools
                this._showOrHideMainScreenTools(false);
                //If preset table does not exist create the same
                if (!this._isPresetTableCreated) {
                  this._createPresetTable(this.config.editor.configInfos);
                }
                //update the template picker with newly added layers
                this.templatePicker.attr("featureLayers", layers);
                this.templatePicker.update();
                this.templatePicker.clearSelection();
              }
            }
            //Check if the filter editor is configured 
            //and accordingly add the layers in the filter editor
            if (this.config.editor.useFilterEditor === true && this.templatePicker
              && this._filterEditor) {
              if (newLayerObj) {
                this._filterEditor.addNewLayerInEditor(newLayerObj.featureLayer);
              } else {
                this._filterEditor.removeLayerFromEditor(removedLayerObj);
              }
            }
            this._setWidgetFirstFocusNode("templatePicker", true);
          }
        });

        //Get table infos so that all the tables layer objects are loaded
        //This will help in getting the capabilities and other layer infos
        this._getTableInfos();
        //create address utils and intersectionUtils object to copy values
        this.addressUtils = new AddressUtils({
          "config": this.config,
          canGeocode: this.canGeocode,
          nls: this.nls,
          userToken: this.userToken,
          appConfig: this.appConfig
        });
        //if default pixels tolerance is configured then use it,
        //else use 20px for backward compatibility
        var pixelsTolerance = 20;
        if (this.config.editor.hasOwnProperty("defaultPixelsTolerance")) {
          pixelsTolerance = this.config.editor.defaultPixelsTolerance;
        }
        this._intersectionUtils = new Intersection({
          _jimuLayerInfos: this._jimuLayerInfos,
          map: this.map,
          "defaultToleranceSettings": this.config.editor.defaultToleranceSettings,
          "defaultPixelsTolerance": pixelsTolerance
        });
        var onlyConfiged = false;
        if (this.config.editor && this.config.editor.layerInfos) {
          onlyConfiged = this.config.editor.layerInfos.length > 0;
        }
        //If honor web map configuration is true then get all the newly added layers from the web map
        if (this.config.editor.hasOwnProperty("honorWebMapConfiguration") &&
          this.config.editor.honorWebMapConfiguration) {
            onlyConfiged = false;
        }
        this.config.editor.configInfos = editUtils.getConfigInfos(this._jimuLayerInfos,
          this.config.editor.layerInfos, false, onlyConfiged);
        if (onlyConfiged === false) {
          array.forEach(this.config.editor.configInfos, function (configInfo) {
            configInfo._editFlag = true;
          });
        }
        //If the flag is to true
        //consider the newly added layers
        if (this.config.editor.hasOwnProperty("editAddDataLayers")) {
          if (this.config.editor.editAddDataLayers === true) {
            this._addNewLayersInConfig();
          }
        }
        //Update layer infos settings with the default
        //if webmap configuration needs to be honored
        if (this.config.editor.hasOwnProperty("honorWebMapConfiguration") &&
          this.config.editor.honorWebMapConfiguration) {
          array.forEach(this.config.editor.configInfos, lang.hitch(this, function (currentConfig) {
            this._updateConfigWithDefaultWebMapSettings(currentConfig);
          }));
        }
        if (this.config.editor.configInfos === undefined || this.config.editor.configInfos === null) {
          return false;
        }
        else if (this.config.editor.configInfos.length === 0) {
          return false;
        }
        this._processConfig();
        array.forEach(this.config.editor.configInfos, function (configInfo) {
          configInfo.featureLayer.name = configInfo.layerInfo.title;
          var layer = configInfo.featureLayer;
          var layerRenderer = layer.renderer;
          var layerRendererJson = layerRenderer.toJson();
          var serviceDefJson = JSON.parse(layer._json);
          //Added to handled csv layers where the __json is in a layerDefinition
          if (serviceDefJson.hasOwnProperty("layerDefinition")) {
            serviceDefJson = serviceDefJson.layerDefinition
          }
          var serviceRendererJson = null;
          if (serviceDefJson.hasOwnProperty("drawingInfo")) {
            if (serviceDefJson.drawingInfo.hasOwnProperty("renderer")) {
              serviceRendererJson = serviceDefJson.drawingInfo.renderer;
            }
          }
          layer._layerRenderer = layerRenderer;
          layer._serviceRendererJson = serviceRendererJson;
          if (layer.hasFeatureReduction && layer.hasFeatureReduction()) {
            this.featureReductionEnabledLayers.push(layer);
          } else if (layerRendererJson.hasOwnProperty('type') && layerRendererJson.type == "heatmap") {
            this.rendererDifferentLayers.push(layer);
          }
        }, this);
        this._disableFeatureReduction();
        if (this.config.editor.hasOwnProperty("autoSaveEdits")) {
          if (this.config.editor.autoSaveEdits) {
            this._autoSaveRuntime = this.config.editor.autoSaveEdits;
            if (this._autoSaveRuntime) {
              registry.byId("autoSaveSwitch").set('checked', true);
            } else {
              registry.byId("autoSaveSwitch").set('checked', false);
            }
          }
        }
        else {
          this.config.editor.autoSaveEdits = false;
        }
        //array.forEach(this.featureReductionEnabledLayers, function (layer) {
        //  layer.disableFeatureReduction();
        //});
        this._createEditor();
        this.fetchDataByName('GroupFilter');
        this.widgetManager.activateWidget(this);
        this._createOverDef.resolve();
        this._setWidgetFirstFocusNode("templatePicker", true);
        //this.loaded_state.set("loaded", true);
        this.fetchDataByName("Select");
        this.fetchDataByName("AttributeTable");
        return true;
      },

      _showOrHideMainScreenTools: function (canHide) {
        var display;
        display = canHide ? "none" : "block";
        //If template picker exist, show/hide the template picker and auto save switch
        //same as per the flag value
        if (this.templatePicker) {
          dojo.style(this.templatePicker.domNode, "display", display);
          if (this.config.editor.autoSaveEdits) {
            this._createAutoSaveSwitch(!canHide);
          }
        }
        //Show/hide following tools as per the flag value
        //1. Draw tool
        //2. Template picker filter tool
        //3. Preset table
        if (this.drawingTool) {
          dojo.style(this.drawingTool.domNode, "display", display);
        }
        if (this._filterEditor) {
          dojo.style(this._filterEditor.domNode, "display", display);
        }
        if (this._isPresetTableCreated) {
          query(".presetFieldsTableDiv")[0].style.display = display;
        }
      },

      _doesLayerExist: function (layerId) {
        var layerExist = false, layerInfo;
        array.some(this.config.editor.configInfos, lang.hitch(this, function (configuredLayerInfo) {
          if (configuredLayerInfo.featureLayer.id === layerId) {
            layerExist = true;
            layerInfo = configuredLayerInfo;
            return true;
          }
        }));
        return {
          layerExist: layerExist,
          layerInfo: layerInfo
        };
      },

      _isValidLayer: function (layerInfo) {
        var isValid = false;
        if (layerInfo.layerObject && layerInfo.layerObject.infoTemplate) {
          array.some(layerInfo.layerObject.infoTemplate.info.fieldInfos,
            lang.hitch(this, function (fieldInfo) {
              if (this._isValidField(layerInfo, fieldInfo) && fieldInfo.visible) {
                isValid = true;
                return true;
              }
            }));
        }
        return isValid;
      },

      _isValidField: function (layerInfo, fieldInfo) {
        var field = layerInfo.layerObject.getField(fieldInfo.fieldName), isValid = false;
        if (field && field.type !== "esriFieldTypeGeometry" &&
          field.type !== "esriFieldTypeOID" &&
          field.type !== "esriFieldTypeBlob" &&
          field.type !== "esriFieldTypeGlobalID" &&
          field.type !== "esriFieldTypeRaster" &&
          field.type !== "esriFieldTypeXML") {
          isValid = true;
        }
        return isValid;
      },

      _removeFeaturesFromAI: function (layerID) {
        var subQuery = new Query(), featureDetails;
        //Get the layer and feature details
        featureDetails = this._getLayerAndFeaturesToRemove(layerID);
        subQuery.objectIds = featureDetails.objectIds;
        //pause the Attribute inspector's event as we don't want to process
        //the function on feature remove
        this.AINext.pause();
        //If layer has at least one feature that needs to removed
        //remove it from the selection
        if (featureDetails.objectIds.length > 0) {
          featureDetails.layer.selectFeatures(subQuery, FeatureLayer.SELECTION_SUBTRACT,
            lang.hitch(this, function () {
              //Once the feature is removed then resume the Attribute inspector's
              //event and refresh the layer title
              setTimeout(lang.hitch(this, function () {
                if (this._traversal.indexOf(layerID) > -1) {
                  this._traversal.pop();
                }
                this.AINext.resume();
                this._refreshLayerTitle();
              }), 500);
            }, function () {
              //On error resume the Attribute inspector's
              //event and refresh the layer title
              setTimeout(lang.hitch(this, function () {
                this.AINext.resume();
                this._refreshLayerTitle();
              }), 500);
            }));
        } else {
          //If the cache layers feature is being displayed and it is the same layer which
          //was removed from the AI then just remove the screen and show template picker
          if (this.currentLayerInfo.isCache && layerID === this.currentLayerInfo.featureLayer.id) {
            this.AINext.resume();
            this._showTemplate(true);
          }
        }
      },

      _getLayerAndFeaturesToRemove: function (layerID) {
        var layer, objectIds = [], attrInspector = this._attributeInspectorCollection &&
          this._attributeInspectorCollection[0] || this.attrInspector;
        //Get the features that are present in the AI but the layer is being removed
        //create an array of such feature object ids
        attrInspector._selection.forEach(lang.hitch(this, function (feature) {
          if (feature._layer.id === layerID) {
            layer = feature._layer;
            objectIds.push(feature.attributes[layer.objectIdField]);
          }
        }));
        //return the layer and object ids to remove the features
        return {
          "layer": layer,
          "objectIds": objectIds
        }
      },

      _updateConfigWithDefaultWebMapSettings: function (currentConfig, isRelatedTable) {
        var layersDefaultSettings;
        //Add layer infos object for related tables
        if (isRelatedTable) {
          currentConfig.layerInfo = this._jimuLayerInfos.getLayerOrTableInfoById(currentConfig.featureLayer.id);
        }
        layersDefaultSettings = editUtils.createDefaultConfigInfo(currentConfig.layerInfo);
        //Fetch and mix the layers default settings and field infos
        lang.mixin(currentConfig, layersDefaultSettings);
        currentConfig.fieldInfos = editUtils.getDefaultEditableFieldInfos(currentConfig.layerInfo, false);
        //Filter fields
        currentConfig.fieldInfos = array.filter(currentConfig.fieldInfos, function (fieldInfo) {
          if (fieldInfo.type === "esriFieldTypeBlob" ||
            fieldInfo.type === "esriFieldTypeGlobalID" ||
            fieldInfo.type === "esriFieldTypeRaster" ||
            fieldInfo.type === "esriFieldTypeXML" ||
            fieldInfo.type === "esriFieldTypeOID") {
            return false;
          } else {
            return true;
          }
        });
        //Honor the layer settings for show/hide delete button
        currentConfig.allowDelete = layersDefaultSettings.featureLayer.layerAllowsDelete;
        //Add the required parameters in the config object for related table/layer
        if (isRelatedTable) {
          currentConfig.configFeatureLayer = currentConfig.featureLayer;
          currentConfig.featureLayer = currentConfig.layerInfo.layerObject;
          currentConfig.showDeleteButton = false;
        }
        //Update all the relationships with default values
        if (currentConfig.relationshipInfos) {
          array.forEach(currentConfig.relationshipInfos, lang.hitch(this, function (currentRelatedConfig) {
            this._updateConfigWithDefaultWebMapSettings(currentRelatedConfig, true);
          }));
        }
      },

      _addFilterEditor: function (layers) {
        if (this.config.editor.useFilterEditor === true && this.templatePicker) {
          if (this._filterEditor) {
            this._filterEditor.setTemplatePicker(this.templatePicker, layers);
          }
          else {
            var gpFilterTemplates = false;
            if (this.config.editor.hasOwnProperty("groupFilteredTemplates")){
              gpFilterTemplates = this.config.editor.groupFilteredTemplates;
            }
            this._filterEditorNode = domConstruct.create("div", {});
            this.templatePickerDiv.insertBefore(this._filterEditorNode,
              this.templatePicker.domNode);
            this._filterEditor = new SEFilterEditor({
              _templatePicker: this.templatePicker,
              _layers: layers,
              map: this.map,
              nls: this.nls,
              gpFilterTemplates: gpFilterTemplates
            }, this._filterEditorNode);
          }
        }
      },
      _activateEditToolbar: function (feature) {
        var layer = feature.getLayer();
        if (this.editToolbar.getCurrentState().tool !== 0) {
          this.editToolbar.deactivate();
        }
        switch (layer.geometryType) {
          case "esriGeometryPoint":
            this.editToolbar.activate(Edit.MOVE, feature);
            break;
          case "esriGeometryPolyline":
          case "esriGeometryPolygon":
            /*jslint bitwise: true*/
            this.editToolbar.activate(Edit.EDIT_VERTICES |
              Edit.MOVE |
              Edit.ROTATE |
              Edit.SCALE, feature);
            /*jslint bitwise: false*/
            break;
        }
      },
      _polygonToPolyline: function (polygon) {
        var polyline = new Polyline();
        array.forEach(polygon.rings, function (ring) {
          polyline.addPath(ring);
          //array.forEach(ring, function (part) {
          //  polyline.addPath(part);
          //});
        });
        polyline.spatialReference = polygon.spatialReference;
        return polyline;
      },
      _addRelatedFeatureToLocalLayer: function (graphic, fKeyField) {
        var newTempLayerInfos;
        var localLayerInfo = null;
        if (this.attrInspector &&
          this.attrInspector._attachmentUploader && this.attrInspector._attachmentUploader !== null) {
          this.attrInspector._attachmentUploader.clear();
        }
        this._removeLocalLayers();
        this.cacheLayer = this._cloneLayer(graphic.featureLayer.layerObject);
        var cacheLayerHandler = on(this.cacheLayer, "load", lang.hitch(this, function () {
          cacheLayerHandler.remove();
          /* TODO: CT - Not required as we will not be allowing to add geometry for related features
          if (this.cacheLayer.geometryType) {
            this.cacheLayer.setSelectionSymbol(this._getSelectionSymbol(this.cacheLayer.geometryType, true));
          }
          */
          localLayerInfo = this._getLayerInfoForLocalLayer(this.cacheLayer);
          newTempLayerInfos = [localLayerInfo];//this._converConfiguredLayerInfos([localLayerInfo]);
          this._createAttributeInspector([localLayerInfo], true, graphic.featureLayer.layerObject,
            null, null, fKeyField);
          var newAttributes = lang.clone(graphic.attributes);
          if (this._usePresetValues) {
            this._modifyAttributesWithPresetValues(newAttributes, newTempLayerInfos[0], null, fKeyField);
          }
          var newGraphic = new Graphic(null, null, newAttributes);
          newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
          this.cacheLayer.applyEdits([newGraphic], null, null, lang.hitch(this, function (e) {
            var queryTask = new Query();
            queryTask.objectIds = [e[0].objectId];
            this.cacheLayer.selectFeatures(queryTask, FeatureLayer.SELECTION_NEW, lang.hitch(this, function () {
              this.currentFeature = this.updateFeatures[0] = newGraphic;
              this.getConfigDefaults();
              this.geometryChanged = false;
              if (this._attributeInspectorTools) {
                this._attributeInspectorTools.triggerFormValidation();
              }
              var graphicOrigLyr = (this.currentFeature).getLayer();
              this.currentLayerInfo = this._getLayerInfoByID(graphicOrigLyr.id);
              this.currentLayerInfo.isCache = true;
              this._toggleDeleteButton(false);
              this._enableAttrInspectorSaveButton(this._validateAttributes(), true);
              this._toggleAttrInspectorNavButtons();
            }));
          }));
          this._showTemplate(false, false);
          //autoSaveEdits is on then save feature automatically
          if ((this.config.editor.hasOwnProperty("autoSaveEdits") && this._autoSaveRuntime === true)) {
            setTimeout(lang.hitch(this, function () {
              this._autoSaveFeatureEdits();
            }), 100);
          }
        }));
      },

      _getCopyAttributes: function (layerInfo, geometry) {
        var defList = [], copyAttributesInfo = {}, coordinatesDef, resultDef;
        resultDef = new Deferred();
        coordinatesDef = new Deferred();
        //check if address attribute action is required or not
        var needAddress = false, needIntersection = false, needMyLocation = false;
        for (var fName in layerInfo.fieldValues) {
          var fActions = layerInfo.fieldValues[fName];
          for (var i = 0; i < fActions.length; i++) {
            if (fActions[i].actionName === "Address" && fActions[i].enabled) {
              needAddress = true;
            }
            if (fActions[i].actionName === "Intersection" && fActions[i].enabled) {
              needIntersection = true;
            }
            if (fActions[i].actionName === "Coordinates" && fActions[i].enabled &&
              fActions[i].hasOwnProperty("coordinatesSource") &&
              fActions[i].coordinatesSource === "myLocation") {
              needMyLocation = true;
            }
          }
          if (needAddress && needIntersection) {
            break;
          }
        }
        //Get data required for intersection
        if (needIntersection) {
          defList.push(this._intersectionUtils.getDistinctLayers(layerInfo, geometry));
        }
        //Get coordinates info and on completing coordinates info get address info
        defList.push(coordinatesDef);

        //get coordinates info for Feature Location
        coordinateUtils.getCoordinatesData(geometry, this.geometryService).then(
          lang.hitch(this, function (coordinatesInfo) {
            //set feature location info
            copyAttributesInfo.Coordinates = coordinatesInfo;
            //get coordinates info for MyLocation
            this._getMyLocationInfo(needMyLocation).then(lang.hitch(this, function (myLocationInfo) {
              //set myLocation info
              copyAttributesInfo.MyLocation = myLocationInfo;
              //get address info only when address attribute action is used
              if (needAddress) {
                this.addressUtils.locateAddress(coordinatesInfo.MapSpatialReference).then(
                  lang.hitch(this, function (addressInfo) {
                    //set address info
                    copyAttributesInfo.Address = addressInfo;
                    //once all coordinate, address and myLocation infos are available resolve def
                    coordinatesDef.resolve(copyAttributesInfo);
                  }));
              } else {
                //set address info as empty
                copyAttributesInfo.Address = {};
                //once all coordinate, address and myLocation infos are available resolve def
                coordinatesDef.resolve(copyAttributesInfo);
              }
            }));
          }), lang.hitch(this, function(){
            copyAttributesInfo.Coordinates = {};
            copyAttributesInfo.Address = {};
            copyAttributesInfo.MyLocation = { Coordinates: {}};
            //once all coordinate, address and myLocation infos are available resolve def
            coordinatesDef.resolve(copyAttributesInfo);
          }));
        //Once all info for Intersection, Coordinates and Address are available
        //resolve main result def with copyAttributesInfo object
        all(defList).then(lang.hitch(this, function (allResult) {
          if(needIntersection) {
            copyAttributesInfo.Intersection = allResult[0].result;
            //store the multiple values object in copyAttributesInfo
            copyAttributesInfo.multipleValues = allResult[0].multipleValues;
          } else{
            copyAttributesInfo.Intersection = {};
            //store the multiple values object in copyAttributesInfo
            copyAttributesInfo.multipleValues = undefined;
          }
          resultDef.resolve(copyAttributesInfo);
        }));
        return resultDef.promise;
      },

      _getMyLocationInfo: function (isLocationRequired) {
        var def = new Deferred();
        var myLocationInfo = {
          Coordinates: {}
        };
        //when copying multiple features get the my location info only once
        if (this._myLocationInfoForMultipleFeatures) {
          def.resolve(this._myLocationInfoForMultipleFeatures);
          return def;
        }
        //Check if at least one address action is required and then only get the location
        if (!isLocationRequired) {
          def.resolve(myLocationInfo);
        } else {
          this._myLocationInfoDef = new Deferred();
          this._getNewCurrentLocation();
          this._myLocationInfoDef.then(lang.hitch(this, function (currentLocation) {
            this._myLocationInfoDef = null;
            if (currentLocation.error && currentLocation.error.message) {
              console.log(currentLocation.error.message);
              def.resolve(myLocationInfo);
            } else {
              if (currentLocation && currentLocation.graphic && currentLocation.graphic.geometry) {
                var currentLocationGeometry = currentLocation.graphic.geometry;
                if (currentLocation.graphic.geometry.x !== "NaN" && currentLocation.graphic.geometry.y !== "NaN") {
                  coordinateUtils.getCoordinatesData(currentLocationGeometry,
                    this.geometryService).then(function (myLocationCoordinateInfo) {
                      myLocationInfo.Coordinates = myLocationCoordinateInfo;
                      def.resolve(myLocationInfo);
                    });
                } else {
                  var pInfo = currentLocation.graphic.attributes.position.coords;
                  coordinateUtils.getCoordinatesDataWhenXYEmpty({
                    x: pInfo.longitude, y: pInfo.latitude
                  }).then(function (myLocationCoordinateInfo) {
                    myLocationInfo.Coordinates = myLocationCoordinateInfo;
                    def.resolve(myLocationInfo);
                  });
                }
              }
            }
          }), lang.hitch(this, function () {
            def.resolve(myLocationInfo);
          }));
        }
        return def;
      },

      // this function also create a new attribute inspector for the local layer
      _addGraphicToLocalLayer: function (evt, copiedAttributes) {
        if (this.templatePicker === undefined ||
          this.templatePicker === null) { return; }
        if (!this.templatePicker.getSelected()) { return; }
        var selectedTemp = this.templatePicker.getSelected();
        var newTempLayerInfos;
        var localLayerInfo = null;

        if (this.attrInspector) {
          if (this.attrInspector._attachmentUploader && this.attrInspector._attachmentUploader !== null) {
            this.attrInspector._attachmentUploader.clear();
          }
          this.attrInspector.destroy();
          this.attrInspector = null;
        }

        this._removeLocalLayers();
        // preparation for a new attributeInspector for the local layer

        this.cacheLayer = this._cloneLayer(this.templatePicker.getSelected().featureLayer);
        var cacheLayerHandler = on(this.cacheLayer, "load", lang.hitch(this, function () {
          cacheLayerHandler.remove();

          this.cacheLayer.setSelectionSymbol(this._getSelectionSymbol(this.cacheLayer.geometryType, true));

          localLayerInfo = this._getLayerInfoForLocalLayer(this.cacheLayer);
          newTempLayerInfos = [localLayerInfo];//this._converConfiguredLayerInfos([localLayerInfo]);

          this._createAttributeInspector([localLayerInfo], true, this.templatePicker.getSelected().featureLayer);

          if (this.config.editor.hasOwnProperty("editGeometryDefault") &&
            this.config.editor.editGeometryDefault === true) {
            //perform any edit geom switch functionality
            //only when working with main layers feature and not on related features
            setTimeout(lang.hitch(this, function () {
              if (this._traversal.length < 2) {
                this._editGeomSwitch.set('checked', true);
                this._editGeomSwitch.check();
              }
            }), 100);
          }

          var newAttributes = lang.clone(selectedTemp.template.prototype.attributes);

          if (this.cacheLayer.geometryType === "esriGeometryPolyline" && evt.geometry.type === 'polygon') {
            evt.geometry = this._polygonToPolyline(evt.geometry);
          }
          this.loading.show();
          //load all the info required to copy attributes
          this._getCopyAttributes(localLayerInfo, evt.geometry).then(lang.hitch(this, function (copyAttributesInfo) {
            //if copying features and have the copied attributes, then use them
            if (copiedAttributes) {
              var selectedFeaturesAttributes = lang.clone(copiedAttributes);
              //copy only those attributes which are not available in template or
              //if the value in template for those attribute is null or
              //override defaults by copied feature is true
              for (var attrKey in selectedFeaturesAttributes) {
                if (!newAttributes.hasOwnProperty(attrKey) || newAttributes[attrKey] === null ||
                  this.config.editor.overrideDefaultsByCopiedFeature) {
                  newAttributes[attrKey] = selectedFeaturesAttributes[attrKey];
                }
              }
            }
            this._modifyAttributesWithPresetValues(newAttributes, newTempLayerInfos[0], copyAttributesInfo);
            this.loading.hide();
            //perform feature creation
            var newGraphic = new Graphic(evt.geometry, null, newAttributes);
            // store original attrs for later use
            newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
            this.cacheLayer.applyEdits([newGraphic], null, null, lang.hitch(this, function (e) {
              var queryTask = new Query();
              queryTask.objectIds = [e[0].objectId];
              this.cacheLayer.selectFeatures(queryTask, FeatureLayer.SELECTION_NEW, lang.hitch(this, function () {
                this.currentFeature = this.updateFeatures[0] = newGraphic;
                this.getConfigDefaults();
                this.geometryChanged = false;
                //this._editGeomSwitch.set('checked', true);
                if (this._attributeInspectorTools) {
                  this._attributeInspectorTools.triggerFormValidation();
                }
                //this._attachLayerHandler();
                var graphicOrigLyr = (this.currentFeature).getLayer();
                this.currentLayerInfo = this._getLayerInfoByID(graphicOrigLyr.id);
                this.currentLayerInfo.isCache = true;
                //this._attachLayerHandler();
                this._toggleDeleteButton(false);
                //this._toggleEditGeoSwitch(false);

                //this._createSmartAttributes();
                //
                this._enableAttrInspectorSaveButton(this._validateAttributes());
                var paginationNode = query(".esriAttrPaginationDiv", this.domNode);
                //Hide attribute inspector's navigation button
                if (paginationNode && paginationNode[0]) {
                  domStyle.set(paginationNode[0], "display", "none");
                }
                //after adding new feature add value picker buttons and show value picker
                setTimeout(lang.hitch(this, function () {
                this._addValuePicker(copyAttributesInfo);
              }), 200);
              }));
            }));


            this._showTemplate(false, false);

            if ((this.config.editor.hasOwnProperty("autoSaveEdits") && this._autoSaveRuntime === true)) {
              setTimeout(lang.hitch(this, function () {
                this._autoSaveFeatureEdits();
              }), 100);
            }
          }));
        }));
      },

      // cancel editing of the current feature
      _cancelEditingFeature: function (showTemplatePicker) {
        if (!this.currentFeature) { return; }

        if (showTemplatePicker) {

          this._showTemplate(true, false);
        } else { // show attr inspector

          // restore attributes & geometry
          if (this.currentFeature.preEditAttrs) {
            this.currentFeature.attributes = JSON.parse(JSON.stringify(this.currentFeature.preEditAttrs));
          }
          if (this.currentFeature.origGeom) {
            this.currentFeature.geometry = geometryJsonUtil.fromJson(this.currentFeature.origGeom);
          }
          this.currentFeature.getLayer().refresh();
          this.attrInspector.refresh();

          //reset
          this._resetEditingVariables();

        }
      },

      _addDateFormat: function (fieldInfo) {
        if (fieldInfo && fieldInfo.format && fieldInfo.format !==
          null) {
          if (fieldInfo.format.dateFormat && fieldInfo.format.dateFormat !==
            null) {
            if (fieldInfo.format.dateFormat.toString().toUpperCase().indexOf("TIME") >= 0) {
              fieldInfo.format.time = true;
            }
            //if (fieldInfo.format.dateFormat ===
            //  "shortDateShortTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLongTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateShortTime24" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLEShortTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLEShortTime24" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLELongTime" ||
            //  fieldInfo.format.dateFormat ===
            //  "shortDateLELongTime24") {
            //  fieldInfo.format.time = true;
            //}
          }
        }
      },

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
      _iterateCollection: function (collection) {
        return function (f) {
          for (var i = 0; collection[i]; i++) {
            f(collection[i], i);
          }
        };
      },
      _cloneLayer: function (layer) {
        var cloneFeaturelayer;
        var fieldsproc = this._processLayerFields(layer.fields);
        var featureCollection = {
          layerDefinition: {
            "id": 0,
            "name": layer.name + this.nls.editorCache,
            "type": "Feature Layer",
            "displayField": layer.displayField,
            "description": "",
            "copyrightText": "",
            "relationships": [],
            "geometryType": layer.geometryType,
            "minScale": 0,
            "maxScale": 0,
            "extent": layer.fullExtent,
            "drawingInfo": {
              "renderer": layer.renderer,
              "transparency": 0,
              "labelingInfo": null
            },
            "hasAttachments": layer.hasAttachments,
            "htmlPopupType": "esriServerHTMLPopupTypeAsHTMLText",
            "objectIdField": layer.objectIdField,
            "globalIdField": layer.globalIdField,
            "typeIdField": layer.typeIdField,
            "fields": array.map(fieldsproc, function (field) {
              // this will properly serialize "description" property as string instead of object.
              if (field.name.indexOf("expression/expr") > -1) {
                return JSON.stringify(field);
              } else {
                return field.toJson();
              }
            }),
            "types": layer.types && array.map(layer.types, function(type) {
              return type.toJson();
            }),
            "templates": layer.templates && array.map(layer.templates, function(template) {
              return template.toJson();
            }),
            "capabilities": "Create,Delete,Query,Update,Uploads,Editing",
            "editFieldsInfo": layer.editFieldsInfo === undefined ? null : layer.editFieldsInfo
          }
        };
        var outFields = layer.fields.map(function (f) {
          return f.name;
        });
        // only keep one local layer
        //var existingLayer = this.map.getLayer(layer.id + "_lfl");
        //if (existingLayer) {
        //  this.map.removeLayer(existingLayer);
        //}

        this._eventHandler = this.own(on(layer, "visibility-change", lang.hitch(this, function () {
          /*
          setTimeout(lang.hitch(this, function () {
            var cancelBtn = query(".cancelButton")[0];
            if (!cancelBtn) {
              //do nothing
            } else {
              on.emit(cancelBtn, 'click', { cancelable: true, bubbles: true });
            }
          }), 100);
          */
        })));

        cloneFeaturelayer = new FeatureLayer(featureCollection, {
          id: layer.id + "_lfl",
          outFields: outFields
        });
        cloneFeaturelayer.visible = true;
        cloneFeaturelayer.renderer = layer.renderer;
        cloneFeaturelayer.originalLayerId = layer.id;
        cloneFeaturelayer._wabProperties = { isTemporaryLayer: true };
        this.map.addLayer(cloneFeaturelayer);
        return cloneFeaturelayer;
      },
      _endsWith: function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      },
      _validateEventHandler: function () {
        this._enableAttrInspectorSaveButton(this._validateAttributes());
      },
      _validateAttributes: function (changeDefaultState) {
        //optional param to determine if no rule is found, should it reset the state.
        //Required for when a form is disabled and a rule to hide a field is required
        changeDefaultState = typeof changeDefaultState !== 'undefined' && changeDefaultState !== null ? changeDefaultState : true;
        var attachmentValidationResult = [];
        var attachmentResult = true;
        var rowsWithGDBRequiredFieldErrors = this._validateRequiredFields();
        var featureHasEdits = this._validateFeatureChanged();

        var rowsWithSmartErrors = [];
        var formValid = true;
        if (this._smartAttributes !== undefined) {
          if (this._smartAttributes !== null) {
            rowsWithSmartErrors = this._smartAttributes.toggleFields(changeDefaultState);
          }
        }
        if (this._attributeInspectorTools !== undefined) {
          if (this._attributeInspectorTools !== null) {
            formValid = this._attributeInspectorTools.formValid();
          }
        }
        if (featureHasEdits && this.currentLayerInfo && this.currentLayerInfo.attachmentValidations) {
          array.forEach(this.currentLayerInfo.attachmentValidations.Actions,
            lang.hitch(this, function (action) {
              var attachmentObj = {};
              if (action.filter && this._smartAttributes) {
                attachmentObj.actionType = action.actionName;
                attachmentObj.result = this._smartAttributes.processFilter(action.filter);
                attachmentValidationResult.push(attachmentObj);
              }
            }));
          //Perform action based on feature is being created or updated
          if (this.attrInspector._attachmentUploader) {
            attachmentResult =
              this.performAction(this.attrInspector._attachmentUploader, attachmentValidationResult, true);
          } else if (this.attrInspector._attachmentEditor) {
            attachmentResult =
              this.performAction(this.attrInspector._attachmentEditor, attachmentValidationResult, false);
          }
        }
        return (editUtils.isObjectEmpty(rowsWithGDBRequiredFieldErrors) &&
          rowsWithSmartErrors.length === 0 && formValid && featureHasEdits && attachmentResult);
      },

      performAction: function (node, actions, isUploader) {
        var enableSaveButton = true;
        //Remove message which could be a result of previous required action
        domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "none");
        array.some(actions, lang.hitch(this, function (action) {
          switch (action.actionType) {
            case 'Hide':
              if (action.result) {
                //Current Action
                this.currentAction = action.actionType;
                node.currentAction = action.actionType;
                domStyle.set(node.domNode, "display", "none");
                return true;
              }
              domStyle.set(node.domNode, "display", "block");
              break;
            case 'Disabled':
              if (action.result) {
                //Current Action
                this.currentAction = action.actionType;
                node.currentAction = action.actionType;
                if (!isUploader) {
                  this._disableAttachments(node, true, isUploader);
                } else {
                  domStyle.set(node.domNode, "display", "none");
                }
                return true;
              }
              this._disableAttachments(node, false, isUploader);
              domStyle.set(node.domNode, "display", "block");
              break;
            case 'Required':
              if (action.result) {
                //Current Action
                this.currentAction = action.actionType;
                node.currentAction = action.actionType;
                domStyle.set(node.domNode, "display", "block");
                if (!this._hasAddedAnyAttachments(node, isUploader)) {
                  enableSaveButton = false;
                  domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "block");
                } else {
                  enableSaveButton = true;
                  domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "none");
                }
                return true;
              } else {
                //Clear the current action variable for further processing
                this.currentAction = null;
                node.currentAction = null;
              }
              break;
          }
        }));
        this._setWidgetFirstFocusNode("AI", false);
        return enableSaveButton;
      },

      _disableAttachments: function (node, isDisable, isUploader) {
        var display, warningNode;
        //set the sate of div
        display = isDisable ? "none" : "block";
        if (!isUploader) {
          //get warning node
          warningNode = this.attrInspector._attachmentEditor.domNode;
          if (query(".attwarning", warningNode)[0]) {
            domStyle.set(query(".attwarning", warningNode)[0], "display", display);
          }
          //set the display style
          domStyle.set(node._uploadForm, "display", display);
          //Loop through all the delete button nodes and set the display property as per the state
          array.forEach(node._attachmentList.childNodes, lang.hitch(this, function (childNode) {
            if (childNode.nodeName !== "#text") {
              var deleteButton = query(".deleteAttachment", childNode)[0];
              if (deleteButton) {
                domStyle.set(deleteButton, "display", display);
              }
            }
          }));
        }
      },


      _onUpdateAttachmentListAdd508Support: function () {
        if (this.attrInspector && this.attrInspector._attachmentEditor) {
          aspect.after(this.attrInspector._attachmentEditor, "_updateConnects",
            lang.hitch(this, function () {
              this._add508SupportToAttachmentsDeleteBtn();
            }));
        }
      },

      _add508SupportToAttachmentsDeleteBtn: function () {
        //since aspect.after of _updateConnects gets called multiple time
        //create a timer and execute the following function only once
        if (this._support508ToDeleteButtonTimer) {
          clearInterval(this._support508ToDeleteButtonTimer);
        }
        this._support508ToDeleteButtonTimer = setInterval(lang.hitch(this, function () {
          clearInterval(this._support508ToDeleteButtonTimer);
          if (this.attrInspector._attachmentEditor &&
            this.attrInspector._attachmentEditor._attachmentList) {
            array.forEach(this.attrInspector._attachmentEditor._attachmentList.childNodes,
              lang.hitch(this, function (childNode) {
                if (childNode.nodeName !== "#text") {
                  var deleteButton = query(".deleteAttachment", childNode)[0];
                  if (deleteButton) {
                    domAttr.set(deleteButton, "role", "button");
                    domAttr.set(deleteButton, "tabindex", "0");
                    domAttr.set(deleteButton, "aria-label", this.nls.deleteAttachment);
                    this.own(on(deleteButton, "keydown", lang.hitch(this, function (evt) {
                      if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                        deleteButton.click();
                      }
                    })));
                  }
                }
              }));
          }
        }), 300);
      },

      _hasAddedAnyAttachments: function (node, isUploader) {
        var hasAttachments = false;
        //Check for attachments length and return the flag value
        if (!isUploader) {
          if (node._attachmentList.childNodes.length > 0 &&
            node._attachmentList.childNodes[0].nodeName !== "#text") {
            return true;
          }
          return false;
        }
        for (var i = 0; i < node._attachmentList.childNodes.length; i++) {
          if (node._attachmentList.childNodes[i].childNodes &&
            node._attachmentList.childNodes[i].childNodes.length > 0 &&
            node._attachmentList.childNodes[i].childNodes[1].value) {
            if (node._attachmentList.childNodes[i].childNodes[1].value.length > 0) {
              hasAttachments = true;
              break;
            }
          }
        }
        return hasAttachments;
      },

      _toggleEditGeoSwitch: function (disable) {
        var isVisible = false;
        //return if _editGeomSwitch is not available or
        //traversal length is greater than one i.e. showing attribute inspector of related records
        if (this._editGeomSwitch === undefined || this._editGeomSwitch === null ||
          this._traversal.length > 1) {
          return;
        }
        if (disable === false && this.currentLayerInfo.featureLayer.visibleAtMapScale) {
          if (this.currentLayerInfo && this.currentLayerInfo._editFlag) {
            dojo.style(this._editGeomSwitch.domNode.parentNode, "display", "block");
            isVisible = true;
          } else {
            dojo.style(this._editGeomSwitch.domNode.parentNode, "display", "none");
            isVisible = false;
          }
        }
        else {
          dojo.style(this._editGeomSwitch.domNode.parentNode, "display", "none");
          isVisible = false;
        }
        this._turnEditGeometryToggleOff();
        //Handle the action buttons visibility based on edit geometry switch
        setTimeout(lang.hitch(this, function () {
          //visibility of following buttons is based on visibility of edit checkbox and it's state
          //i.e. if 'Edit Geometry' checkbox is visbile and checked then only show these buttons
          isVisible = isVisible && this._editGeomSwitch.checked;
          this._toggleAttributeButtonVisibility(isVisible);
          this._toggleLocateButtonVisibility(isVisible);
          this._toggleXYCoordinatesButtonVisibility(isVisible);
          this._toggleMapNavigationButtonVisibility(isVisible);
        }), 500);
      },
      _recordLoadeAttInspector: function () {
        this.getConfigDefaults();
      },
      editGeoCheckChange: function () {
        return function () {
          this._editGeometry(this._editGeomSwitch.checked);
        };
      },

      _attributeInspectorChangeRecord: function (evt) {
        //this._turnEditGeometryToggleOff();
        //CT - commented the code in if block as we are displaying Prompt On Save on next button click
        if (this._validateFeatureChanged() && this.currentFeature) {
          //If only geometry is changed and feature is saved then the cache layer
          //flag should be changed to false.
          if (this.currentLayerInfo.isCache) {
            this.currentLayerInfo.isCache = false;
          }
          // do not show templatePicker after saving
          //   if (this.config.editor.displayPromptOnSave && this.config.editor.displayPromptOnSave === true) {
          //     this._promptToResolvePendingEdit(false, evt, false, true);
          //   }
        } else {
          this._postFeatureSave(evt);
        }
        this._recordLoadeAttInspector();
      },
      _addWarning: function () {
        if (query(".attwarning", this.attrInspector.domNode).length === 0) {
          var txt = domConstruct.create("div", { 'class': 'attwarning' });
          txt.innerHTML = this.nls.attachmentSaveDeleteWarning;
          if (this.attrInspector._attachmentEditor !== undefined &&
            this.attrInspector._attachmentEditor !== null) {
            this.attrInspector._attachmentEditor.domNode.appendChild(txt);
          }

        }
      },

      _hasAnyEditableLayerInRelation: function (layerInfos) {
        var showLayer = false;
        array.forEach(layerInfos, lang.hitch(this, function (layer) {
          if (showLayer) {
            return true;
          }
          if (layer._editFlag === true) {
            showLayer = true;
          } else if (layer.relationshipInfos && layer.relationshipInfos.length > 0) {
            showLayer = this._hasAnyEditableLayerInRelation(layer.relationshipInfos);
          }
        }));
        return showLayer;
      },

      _processRelationAndShowAttrInspector: function (processRelations, evt, layer, def, relatedFeat, isTempFeature) {
        var layerNode;
        if (this.contentWrapper && this.contentWrapper.parentNode &&
          !domClass.contains(this.contentWrapper, "hidden")) {
          this.contentWrapper.parentNode.removeChild(this.contentWrapper);
          if (this.navButtonsDiv &&
            this.navButtonsDiv.parentNode) {
            this.navButtonsDiv.parentNode.removeChild(this.navButtonsDiv);
          }
        }
        //dom for item list and navigation content
        this.contentWrapper = domConstruct.create("div", {
          "class": "detailsContainer"
        }, this.mainContainer);
        // dom for navigation buttons
        this.navButtonsDiv = domConstruct.create("div", {
          "class": "esriAttributeInspector esriAttrPaginationDiv"
        });
        //Place pagination controls in the DOM only for saved feature
        if (!isTempFeature) {
          domConstruct.place(this.attrInspector.navButtons, this.navButtonsDiv, "first");
          //place the navigation button before main container
          //to make sure only the content have scrollbar
          domConstruct.place(this.navButtonsDiv, this.mainContainer, "before");
        }
        // dom for item list
        var itemListContainer = domConstruct.create("div", {
          "class": "esriCTItemListContainer"
        }, this.contentWrapper);
        if (evt && evt.feature) {
          layer = evt.feature._layer;
          //update symbol of prev selected feature
          if (this.currentFeature && layer.id === this.currentFeature._layer.id) {
            this.currentFeature.setSymbol(this._getSelectionSymbol(
              this.currentFeature.getLayer().geometryType, false));
          }
          //update currentFeature
          this.currentFeature = evt.feature;
          this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
          this.currentLayerInfo = this._getLayerInfoByID(layer.id);
          //Set highlight symbol to current selected feature
          this.currentFeature.setSymbol(this._getSelectionSymbol(
            this.currentFeature.getLayer().geometryType, true));
          //toggle delete button as per current feature
          this._toggleDeleteButton(this.attrInspector._currentLInfo.allowDelete);
          //Disable attachments editor for the layers which are not editable
          //add timeout as it is taking some time to load editor
          this.loading.show();
          setTimeout(lang.hitch(this, function () {
            if (this.attrInspector._attachmentEditor && ((!this.currentLayerInfo.isEditable ||
              !this.currentLayerInfo._editFlag) || (this.currentLayerInfo &&
                !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate))) {
              this._disableAttachments(this.attrInspector._attachmentEditor, true, false);
            }
            this.loading.hide();
          }), 2000);
          //if edit geometry by default is on update the toolbar to edit feature
          //on changing features from AI pagination
          setTimeout(lang.hitch(this, function () {
            if (this.config.editor.hasOwnProperty("editGeometryDefault") &&
              this.config.editor.editGeometryDefault === true) {
              //perform any edit geom switch functionality
              //only when working with main layers feature and not on related features
              if (this._traversal.length < 2) {
                if (this.currentFeature && this.currentFeature.geometry) {
                  // Store the original geometry for later use
                  // layer not having Z value, if have Z value it sould have enableZDefaults to true
                  // layer not having M value, if have M value it sould have allowUpdateWithoutMValues to true
                  this.currentFeature.origGeom = this.currentFeature.geometry.toJson();
                  if (!this.currentLayerInfo.disableGeometryUpdate &&
                    this.currentLayerInfo.featureLayer.visibleAtMapScale &&
                    this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate &&
                    (!this.currentLayerInfo.featureLayer.hasZ ||
                      (this.currentLayerInfo.featureLayer.hasZ && this.currentLayerInfo.featureLayer.enableZDefaults)) &&
                    (!this.currentLayerInfo.featureLayer.hasM ||
                      (this.currentLayerInfo.featureLayer.hasM && this.currentLayerInfo.featureLayer.allowUpdateWithoutMValues))) {
                    this._activateEditToolbar(this.currentFeature);
                    //Added else if to solve the issue when feature is created and have disable geometry,
                    //once after saving the feature after editing geometry,
                    //the checkbox gets hidden but the tool remains active to edit geometry
                  } else if (this.editToolbar.getCurrentState().tool !== 0) {
                    this.editToolbar.deactivate();
                    this._editingEnabled = false;
                  }

                }
              }
            }
          }), 1000);
        }
        if (layer) {
          layerNode = this.addItem(layer.name, this.config.editor.expandMainLayerOnLoad, itemListContainer, layer.id, isTempFeature, layer, true);
        }
        if (processRelations && evt.feature) {
          if (this._traversal.length > 0) {
            this._traversal[this._traversal.length - 1] = evt.feature._layer.id;
          } else {
            this._traversal.push(evt.feature._layer.id);
          }
          //check for the relationship of selected features layer
          var relatedTableInfos = this._getRelationshipInfo(evt.feature);
          var feature = {
            "attributes": lang.clone(evt.feature.attributes),
            "_layer": evt.feature._layer
          };
          var relatedOBJID;
          if (relatedFeat) {
            relatedOBJID = [];
            array.forEach(relatedFeat, function (feat) {
              relatedOBJID.push(feat.attributes[feat._layer.objectIdField]);
            });
          }
          if (relatedTableInfos && relatedTableInfos.length > 0) {
            var filterdRelatedInfos = [];
            array.forEach(relatedTableInfos, lang.hitch(this, function (relationship) {
              var showRelatedLayer = relationship._editFlag;
              if (!relationship._editFlag &&
                relationship.relationshipInfos && relationship.relationshipInfos.length > 0) {
                showRelatedLayer =
                  this._hasAnyEditableLayerInRelation(relationship.relationshipInfos);
              }
              if (showRelatedLayer &&
                relationship.featureLayer && relationship.hasOwnProperty('relationshipId')) {
                filterdRelatedInfos.push(relationship);
              }
            }));
            if (filterdRelatedInfos.length > 0) {
              var contentPanel = query(".esriCTItemContent", itemListContainer);
              if (contentPanel && contentPanel[0]) {
                domClass.remove(contentPanel[0], "esriCTRelatedItemContent");
              }
              this._relatedTablesInfo[evt.feature._layer.id] = {};
              this._relatedTablesInfo[evt.feature._layer.id] = new relatedTables({
                relationshipInfo: filterdRelatedInfos,
                layerInfosObj: this._jimuLayerInfos,
                parentFeature: feature,
                parentFeatureIndexInAI: this.attrInspector._featureIdx,
                parentFieldInfos: this.currentLayerInfo.fieldInfos,
                config: this.config,
                nls: this.nls,
                mapSpatialReference: this.map.spatialReference
              }, domConstruct.create('div'));
              this.own(on(this._relatedTablesInfo[evt.feature._layer.id], "addRelatedRecord",
                lang.hitch(this,
                  function (relatedNewFeature, relatedDomNode, layerId, parentFeatureIndexInAI, fKeyField) {
                    //hide parent features content
                    domClass.add(this.contentWrapper, "hidden");
                    domClass.add(this.buttonHeader, "hidden");
                    domStyle.set(this.navButtonsDiv, "display", "none");
                    //Store the parent features index in AI object
                    this.attrInspector.ctStoredFeatureIndex = parentFeatureIndexInAI;
                    //push the AI, ContentWrapper and Parent layerID in an array
                    this._attributeInspectorCollection.push(this.attrInspector);
                    this._nodesCollection.push(this.contentWrapper);
                    this._buttonsWrapper.push(this.buttonHeader);
                    this._paginationNodeCollection.push(this.navButtonsDiv);
                    this._traversal.push(layerId);
                    //store related layer/tables dom which will be used to click once feature is saved
                    this.currentRelatedDom = relatedDomNode;
                    //finally add the feature to local layer
                    this._addRelatedFeatureToLocalLayer(relatedNewFeature, fKeyField);
                    this._addingNewRelatedRecord = true;
                  })));
              this.own(on(this._relatedTablesInfo[evt.feature._layer.id], "titleClicked",
                lang.hitch(this, function (layerId, relationshipId, isNewFeature,
                  parentFeatureIndexInAI, parentOID, fKeyField) {
                  if (this.addNewRelatedRecord) {
                    isNewFeature = true;
                    this.addNewRelatedRecord = false;
                  }
                  this._editGeomSwitch.set("checked", false);
                  if (!isNewFeature && this.currentFeature &&
                    this.config.editor.displayPromptOnSave && this._validateFeatureChanged()) {
                    this._promptToResolvePendingEdit(false, null, true).then(lang.hitch(this, function () {
                      this._fetchRelatedRecords(isNewFeature, evt.feature._layer,
                        relationshipId, layerId, parentOID, parentFeatureIndexInAI, relatedOBJID, fKeyField);
                      //reset the relatedOBJID variable once used as it fetches the wrong results next time
                      relatedOBJID = null;
                    }), function () {
                    });
                  } else {
                    this._fetchRelatedRecords(isNewFeature, evt.feature._layer,
                      relationshipId, layerId, parentOID, parentFeatureIndexInAI, relatedOBJID, fKeyField);
                    //reset the relatedOBJID variable once used as it fetches the wrong results next time
                    relatedOBJID = null;
                  }
                })));
              this.own(on(this._relatedTablesInfo[evt.feature._layer.id], "addRelatedItemContent",
                lang.hitch(this,
                  function (isRelatedRequired) {
                    if (isRelatedRequired) {
                      this.addItem(this.nls.relatedItemTitle, this.config.editor.expandRelatedTableOnLoad,
                        itemListContainer, null, false, null, false);
                    } else {
                      var contentPanel = query(".esriCTItemContent", itemListContainer);
                      if (contentPanel && contentPanel[0]) {
                        domClass.add(contentPanel[0], "esriCTRelatedItemContent");
                      }
                    }
                  })));
              this._relatedTablesInfo[evt.feature._layer.id].startup();
            }
          } else {
            //If no related records are found and parent layer item is configured to be collapsed
            //all the time then expand it programmatically
            if (!this.config.editor.expandMainLayerOnLoad) {
              this._togglePanel(layerNode);
            }
          }
          if (def) {
            def.resolve();
          }
        } else {
          if (def) {
            def.resolve();
          }
        }
      },

      _checkValidRelationShips: function (filterdRelatedInfos, layer) {
        array.forEach(filterdRelatedInfos, lang.hitch(this, function (relationship) {
          if (relationship.featureLayer && relationship.hasOwnProperty('relationshipId')) {
            var relation;
            array.some(layer.relationships, lang.hitch(this, function (relationship) {
              //Return relationship
              if (relationship.id === relationshipId) {
              }
            }));
          }
        }));
      },

      _fetchRelatedRecords: function (isNewFeature, layer,
        relationshipId, layerId, parentOID, parentFeatureIndexInAI, relatedOBJID, fKeyField) {
        //get related records for the selected layer/table
        this._getRelatedRecordsByRelatedQuery(
          layer, relationshipId, layerId, parentOID).then(lang.hitch(this, function (oIds) {
            if (oIds && oIds.length === 0) {
              if (isNewFeature) {
                domClass.remove(this.contentWrapper, "hidden");
                this.attrInspector.refresh();
                setTimeout(lang.hitch(this, function () {
                  domStyle.set(this.attrInspector.navButtons, "display",
                    (!this.attrInspector._hideNavButtons && (this.attrInspector._numFeatures > 1) ? "" : "none"));
                  this.attrInspector.navMessage.innerHTML = esriLang.substitute({
                    idx: this.attrInspector._featureIdx + 1,
                    of: this.attrInspector.NLS_of,
                    numFeatures: this.attrInspector._numFeatures
                  }, this.attrInspector._navMessage);
                  this.currentFeature = this.attrInspector._numFeatures ?
                    this.attrInspector._selection[this.attrInspector._featureIdx] : null;
                  this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
                }), 200);
              }
              return;
            }
            domClass.add(this.contentWrapper, "hidden");
            domStyle.set(this.navButtonsDiv, "display", "none");
            //store AI's _featureIdx which will be used when coming back to parent feature
            this.attrInspector.ctStoredFeatureIndex = parentFeatureIndexInAI;
            this._attributeInspectorCollection.push(this.attrInspector);
            this._nodesCollection.push(this.contentWrapper);
            this._buttonsWrapper.push(this.buttonHeader);
            this._paginationNodeCollection.push(this.navButtonsDiv);
            //push selected layer's id
            this._traversal.push(layerId);
            if (relatedOBJID) {
              oIds = [];
              oIds = relatedOBJID;
              relatedOBJID = null;
            }
            if (oIds && oIds.length > 0) {
              var newDef, queryObj = new Query();
              queryObj.objectIds = oIds;
              if (this.viewedLayerDetails.length > 0) {
                newDef = new Deferred();
                var tempFeature = this.viewedFeatureDetails[0];
                if (this.viewedLayerDetails[0] === this.viewedLayerDetails[1]) {
                  tempFeature = this.viewedFeatureDetails[1];
                }
                this._createAttributeInspector([this._getLayerInfoByID(layerId)], false, null,
                  newDef, tempFeature, fKeyField);
              } else {
                this._createAttributeInspector([this._getLayerInfoByID(layerId)], false, null,
                  null, null, fKeyField);
              }
              var relatedLayer = this._jimuLayerInfos.getLayerOrTableInfoById(layerId).layerObject;
              this.loading.show();
              relatedLayer.selectFeatures(queryObj, FeatureLayer.SELECTION_NEW,
                lang.hitch(this, function (selectedFeatures) {
                  //if adding new related record or while adding new related record back button is clicked
                  //then empty the current feature as it will enter in next callback of ATI when we the last record is selected
                  if ((this._addingNewRelatedRecord && this._processBackButtonInNewRelatedRecord) || isNewFeature) {
                    this.currentFeature = null;
                  }
                  //update the features
                  this.updateFeatures = selectedFeatures;
                  //If new feature is created go to the last feature of attribute inspector
                  if (isNewFeature) {
                    this.attrInspector.last();
                  } else {
                    this.attrInspector.first();
                  }
                  //update current feature
                  this.currentFeature = this.attrInspector._numFeatures ?
                    this.attrInspector._selection[this.attrInspector._featureIdx] : null;
                  this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
                  if (this.updateFeatures.length > 0) {
                    this._showTemplate(false);
                  }
                  if (this._addingNewRelatedRecord && this._processBackButtonInNewRelatedRecord) {
                    this._addingNewRelatedRecord = false;
                    this._processBackButtonInNewRelatedRecord = false;
                    this._onCancelButtonClicked();
                  }
                  this.loading.hide();
                }),
                lang.hitch(this, function () {
                  this.loading.hide();
                }));
              if (newDef) {
                newDef.then(lang.hitch(this, function () {
                  if (this.viewedLayerDetails.length > 0) {
                    var relatedFeatureLayerId = this.viewedLayerDetails.shift();
                    var relatedFeatures = this.viewedFeatureDetails.shift();
                    if (this.viewedLayerDetails.length > 0 && this.viewedLayerDetails[0] === relatedFeatureLayerId) {
                      this.viewedLayerDetails.shift();
                      relatedFeatures = this.viewedFeatureDetails.shift();
                    }
                    var tableTitle = query("[layerid='" + relatedFeatureLayerId + "']", this.contentWrapper)[0];
                    tableTitle.click();
                  }
                  if (this.viewedLayerDetails.length === 0) {
                    this.loading.hide();
                  }
                }));
              }
            }
          }));
      },

      _createAttributeInspector: function (layerInfos, featureCreated, layer, def, feature, fKeyField) {
        var attachmentRefNode, refreshButtonClass, refreshButtonTitle, canShowLocateButton;
        //perform any edit geom switch functionality
        //only when working with main layers feature and not on related features
        //destroy the edit geom switch
        if (this._traversal.length < 2) {
          if (this._editGeomSwitch) {
            this._editGeomSwitch.destroy();
            this._editGeomSwitch = null;
          }

          if (this.editSwitchDiv) {
            while (this.editSwitchDiv.firstChild) {
              this.editSwitchDiv.removeChild(this.editSwitchDiv.firstChild);
            }
          }
        }
        this._setCancelButtonText();
        if (this.attrInspector) {
          //  this.attrInspector.destroy();
          //  this.attrInspector = null;

        }

        //if related feature is selected, disable the foreign key field in attribute inspector
        if (fKeyField) {
          array.forEach(layerInfos[0].fieldInfos, lang.hitch(this, function (field) {
            if (field.name === fKeyField) {
              field.isEditable = false;
            }
          }));
        }

        //Show textArea instead of text boxes - fix for github ticket #248
        if (this.config.editor.hasOwnProperty("canSwitchToMultilineInput") &&
          this.config.editor.canSwitchToMultilineInput) {
          //loop through all the laeyr infos and its fieldinfos
          array.forEach(layerInfos, lang.hitch(this, function (layer) {
            if (layer.fieldInfos) {
              array.forEach(layer.fieldInfos, lang.hitch(this, function (field) {
                if (field.type === "esriFieldTypeString" &&
                  (!field.hasOwnProperty("stringFieldOption") ||
                    field.stringFieldOption === "textbox") &&
                  this.config.editor.maxLimitToMultilineTextBox < field.length) {
                  field.stringFieldOption = "textarea";
                }
              }));
            }
          }));
        }

        this.attrInspector = editUtils.ATI({//new AttributeInspector({
          layerInfos: layerInfos
        }, html.create("div", {
          style: {
            width: "100%",
            height: "100%"
          }
        }));
        this.attrInspector.startup();
        //after creating attachment list handle 508 support to delete attachment buttons
        this._onUpdateAttachmentListAdd508Support();
        domConstruct.place(this.attrInspector.navMessage, this.attrInspector.nextFeatureButton.domNode, "before");
        //perform any edit geom switch functionality
        //only when working with main layers feature and not on related features
        if (this._traversal.length < 2) {
          this.editSwitchDiv = domConstruct.create("div");
          this.editSwitchDiv.appendChild(domConstruct.create("div", { "class": "spacer" }));
          // edit geometry toggle button
          this._editGeomSwitch = new CheckBox({
            id: "editGeometrySwitch_" + this.attrInspector.id,
            checked: false,
            value: this.nls.editGeometry,
            tabindex: 0, // code for accessibility
            label: this.nls.editGeometry
          }, null);

          domAttr.set(registry.byId("editGeometrySwitch_" + this.attrInspector.id).domNode,
            "aria-label", this.nls.editGeometry);

          this.editSwitchDiv.appendChild(this._editGeomSwitch.domNode);

          /* domConstruct.place(lang.replace(
            "<label for='editGeometrySwitch_'" + this.attrInspector.id + ">{replace}</label></br></br>",
            { replace: this.nls.editGeometry }), this._editGeomSwitch.domNode, "after"); */

          domConstruct.place(this.editSwitchDiv, this.attrInspector.deleteBtn.domNode, "before");

          this.own(on(this._editGeomSwitch, 'Change', lang.hitch(this,
            this.editGeoCheckChange())));

          // to create container for custom coordinates
          this._xyCoordinates = domConstruct.create("div", {
            "class": "esriCTActionButtons esriCTCustomButtons esriCTXYCoordinates esriCTGeometryEditor hidden",
            "title": this.nls.moveSelectedFeatureToXY,
            "tabindex": 0, // code for accessibility
            "role": "button",
            "aria-label": this.nls.moveSelectedFeatureToXY
          }, this.attrInspector.deleteBtn.domNode, "after");

          this.own(on(this._xyCoordinates, 'click', lang.hitch(this,
            function () {
              this._createCoordinatesPopup();
            })));

          this.own(on(this._xyCoordinates, 'keydown',
            lang.hitch(this, function (evt) {
              if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                this._createCoordinatesPopup();
              }
            })));



          // to create container for locate button
          // esriCTGeometryEditor is a common css class, that deals with margin values
          this._locateButtonDiv = domConstruct.create("div", {
            "class": "esriCTActionButtons esriCTCustomButtons esriCTLocateButtonContainer esriCTGeometryEditor hidden",
            "title": this.nls.moveSelectedFeatureToGPS,
            "tabindex": 0,
            "role": "button",
            "aria-label": this.nls.moveSelectedFeatureToGPS
          }, this.attrInspector.deleteBtn.domNode, "after");
          if (canShowLocateButton === "none") {
            domStyle.set(this._locateButtonDiv, 'display', canShowLocateButton);
          }
          // to get the current location when keydown on locate button
          this.own(on(this._locateButtonDiv, 'keydown',
            lang.hitch(this, function (evt) {
              if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                this._moveToGPSDef = new Deferred();
                this._getNewCurrentLocation();
                this._moveToGPSDef.then(lang.hitch(this, this._moveToGPSDefResolved));
              }
            })));
          // on click of locate button container, execute locate function
          this.own(on(this._locateButtonDiv, 'click', lang.hitch(this, function () {
            // locate current position on click of its container
            this._moveToGPSDef = new Deferred();
            this._getNewCurrentLocation();
            this._moveToGPSDef.then(lang.hitch(this, this._moveToGPSDefResolved));
          })));

          // to create container for map navigation icon
          this._mapNavigation = domConstruct.create("div", {
            "class": "esriCTActionButtons esriCTCustomButtons esriCTMapNavigationLocked esriCTGeometryEditor hidden",
            "title": this.nls.mapNavigationLocked,
            "tabindex": 0,
            "role": "button",
            "aria-label": this.nls.mapNavigationLocked
          }, this.attrInspector.deleteBtn.domNode, "after");

          this.own(on(this._mapNavigation, 'click',
            lang.hitch(this, this._toggleMapNavigationButtonState)));

          this.own(on(this._mapNavigation, 'keydown',
            lang.hitch(this, function (evt) {
              if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                this._toggleMapNavigationButtonState();
              }
            })));

          // Button to refresh attributes on geometry change
          if (this.config.editor.enableAttributeUpdates) {
            refreshButtonClass = "refreshAttributes";
            refreshButtonTitle = this.nls.refreshAttributes;
          }
          if (this.config.editor.enableAutomaticAttributeUpdates) {
            refreshButtonClass = "esriCTAutoUpdateOnMode";
            refreshButtonTitle = this.nls.automaticAttributeUpdatesOn;
          }
          this._refreshButton = domConstruct.create("div", {
            "class": refreshButtonClass + " " + "esriCTActionButtons esriCTCustomButtons esriCTGeometryEditor hidden",
            "title": refreshButtonTitle,
            "tabindex": 0, // code for accessibilty
            "role": "button",
            "aria-label": refreshButtonTitle

          }, this.attrInspector.deleteBtn.domNode, "after");
          this.own(on(this._refreshButton, 'click', lang.hitch(this, function () {
            if (this.config.editor.enableAutomaticAttributeUpdates) {
              this._toggleAttributeButtonState();
            } else {
              this._refreshAttributes();
            }
          })));
          this.own(on(this._refreshButton, 'keydown',
            lang.hitch(this, function (evt) {
              if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                if (this.config.editor.enableAutomaticAttributeUpdates) {
                  this._toggleAttributeButtonState();
                } else {
                  this._refreshAttributes();
                }
              }
            })));
        }
        // save button
        domConstruct.create("div", {
          innerHTML: this.nls.save,
          "class": "esriCTCustomButtons saveButton jimu-btn jimu-state-disabled",
          "style": "visibility: hidden"
        }, this.attrInspector.deleteBtn.domNode, "after");

        if (this.buttonHeader) {
          domClass.add(this.buttonHeader, "hidden");
        }
        this.buttonHeader = domConstruct.create("div", {
          "class": "buttonHeader"
        }, this.buttonWrapper);

        // save button
        var saveButton = domConstruct.create("div", {
          innerHTML: this.nls.save,
          "class": "esriCTCustomButtons saveButton jimu-btn jimu-state-disabled",
          "tabindex": "-1",
          "role": "button",
          "aria-label": this.nls.save
        }, this.buttonHeader, "last");

        //Hide Attribute inspector's delete button
        domStyle.set(this.attrInspector.deleteBtn.domNode, "display", "none");

        //add another process indicator
        //domConstruct.create("div", {
        //  "class": "processing-indicator"
        //}, saveButton, "before");
        if (query(".deleteButton", this.buttonHeader).length < 1) {
          var deleteButton = domConstruct.create("div", {
            innerHTML: this.nls.deleteText,
            "tabindex": "-1",
            "role": "button",
            "aria-label": this.nls.deleteText,
            "class": "deleteButton jimu-btn jimu-btn-vacation"
          }, saveButton, "before");
          // query(".jimu-widget-smartEditor .topButtonsRowDiv")[0], "first");

          on(deleteButton, "click", lang.hitch(this, function () {
            this._onDeleteButtonClick();
          }));
          on(deleteButton, "keydown", lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              this._onDeleteButtonClick();
            }
          }));
        }

        //Change the position of action buttons(save/delete) based on configuration
        if (this.config.editor.showActionButtonsAbove) {
          domStyle.set(this.mainContainer, "margin-top", "5px");
        } else {
          domConstruct.place(this.buttonWrapper, this.mainContainer, "after");
          domStyle.set(this.mainContainer, "margin-bottom", "5px");
          domStyle.set(this.mainContainer, "margin-top", "0px");
        }

        this.own(on(saveButton, "click", lang.hitch(this, function () {
          if (!this._validateFeatureChanged()) {
            this._resetEditingVariables();
            return;
          }

          if (this.map.infoWindow.isShowing) {
            this.map.infoWindow.hide();
          }
          if (!domClass.contains(saveButton, "jimu-state-disabled")) {
            this._saveEdit(this.currentFeature);
          }
        })));

        //handle keydown event for save button
        this.own(on(saveButton, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            if (!this._validateFeatureChanged()) {
              this._resetEditingVariables();
              return;
            }
            if (this.map.infoWindow.isShowing) {
              this.map.infoWindow.hide();
            }
            if (!domClass.contains(saveButton, "jimu-state-disabled")) {
              this._saveEdit(this.currentFeature);
            }
          }
        })));

        //Code to support selection updated from select widget
        //Listen for onLayerSelectionChange
        aspect.after(this.attrInspector, "onLayerSelectionChange",
          lang.hitch(this, function () {
            if (this.state !== 'active') {
              if (this._LayerSelectionChangedTimer) {
                clearTimeout(this._LayerSelectionChangedTimer);
              }
              this._LayerSelectionChangedTimer = setTimeout(lang.hitch(this, function () {
                if (this.attrInspector && this._attrInspIsCurrentlyDisplayed) {
                  this.attrInspector.first();
                }
              }), 500);
            }
          }));
        //Listen for all the necessary events
        if (this.attrInspector._attachmentEditor) {
          //Listen for delete attachments event
          aspect.after(this.attrInspector._attachmentEditor, "_onDeleteAttachmentComplete",
            lang.hitch(this, function () {
              //If "Required" action is performed and at no attachment is present
              //show the required message
              if (!this._hasAddedAnyAttachments(this.attrInspector._attachmentEditor, false) &&
                this.currentAction === "Required") {
                domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "block");
              }
              this._enableAttrInspectorSaveButton(this._validateAttributes(), null, true);
            }));
          //Listen for attachments complete event
          aspect.after(this.attrInspector._attachmentEditor, "_onAddAttachmentComplete",
            lang.hitch(this, function () {
              if (domStyle.get(this.attrInspector.attachmentsRequiredMsg, "display") === "block") {
                domStyle.set(this.attrInspector.attachmentsRequiredMsg, "display", "none");
              }
              this._enableAttrInspectorSaveButton(this._validateAttributes(), null, true);
            }));
          //Listen for all the attachments complete event
          aspect.after(this.attrInspector._attachmentEditor, "_getAttachments",
            lang.hitch(this, function () {
              this.attachmentloading.show();
              setTimeout(lang.hitch(this, function () {
                if (this.currentLayerInfo && this.currentLayerInfo.attachmentValidations) {
                  if (this.currentLayerInfo.attachmentValidations) {
                    var attachmentValidationResult = [];
                    array.forEach(this.currentLayerInfo.attachmentValidations.Actions,
                      lang.hitch(this, function (action) {
                        var attachmentObj = {};
                        if (action.filter && this._smartAttributes) {
                          attachmentObj.actionType = action.actionName;
                          attachmentObj.result = this._smartAttributes.processFilter(action.filter);
                          attachmentValidationResult.push(attachmentObj);
                        }
                      }));
                    if (this.attrInspector._attachmentUploader) {
                      this.performAction(this.attrInspector._attachmentUploader, attachmentValidationResult, true);
                    } else {
                      this.performAction(this.attrInspector._attachmentEditor, attachmentValidationResult, false);
                    }
                  }
                  //Disable attachments editor for the layers which are not editable
                  //add timeout as it is taking some time to load editor
                  if (this.attrInspector._attachmentEditor && (!this.currentLayerInfo.isEditable ||
                    !this.currentLayerInfo._editFlag)) {
                    this._disableAttachments(this.attrInspector._attachmentEditor, true, false);
                  }
                }
                this.attachmentloading.hide();
              }), 1500);
            }));
        }
        // edit geometry checkbox event

        // attribute inspector events
        this.own(on(this.attrInspector, "attribute-change", lang.hitch(this, function (evt) {
          if (this.currentFeature) {
            this.currentFeature.attributes[evt.fieldName] = evt.fieldValue;
            this._validateDateTimeField();
            this._enableAttrInspectorSaveButton(this._validateAttributes());
            //For editing mode if canAutoUpdate is true means fields are changed manually not by any work flow
            if (this.canAutoUpdate && this.currentLayerInfo && !this.currentLayerInfo.isCache) {
              //autoSaveAttrUpdates save is on then save feature automatically
              if (this.config.editor.hasOwnProperty("autoSaveAttrUpdates") && this.config.editor.autoSaveAttrUpdates) {
                setTimeout(lang.hitch(this, function () {
                  this._autoSaveFeatureEdits();
                }), 100);
              }
            }
          }
        })));

        //if the event handler exist, remove it
        //This makes sure at a time only one handler exist for AI's next event
        if (this.AINext) {
          this.AINext.remove();
        }
        this.AINext = this.own(on.pausable(this.attrInspector, "next", lang.hitch(this, function (evt) {
          if (this.currentFeature && this.config.editor.displayPromptOnSave && this._validateFeatureChanged()) {
            this._promptToResolvePendingEdit(false, null, false).then(
              lang.hitch(this, function () {
                this._processNextButtonClicked(true, evt, null, def, feature);
              }), function () {
              });
          } else {
            //gitHub ticket : 120
            //if feature is edited but not saved and user moved to next feature,
            //then revert the attributes and geometry to orginal one
            if (this.currentFeature) {
              if (this.currentFeature.preEditAttrs) {
                this.currentFeature.attributes = JSON.parse(JSON.stringify(this.currentFeature.preEditAttrs));
              }
              if (this.currentFeature.origGeom) {
                this.currentFeature.geometry = geometryJsonUtil.fromJson(this.currentFeature.origGeom);
              }
            }
            this._processNextButtonClicked(true, evt, null, def, feature);
          }
        })))[0];

        this.attrInspector.attachmentsRequiredMsg = domConstruct.create("div", {
          "innerHTML": this.nls.attachmentsRequiredMsg,
          "role": "presentation",
          "aria-label": this.nls.attachmentsRequiredMsg.replace("(*)", ""),
          "tabindex": "0",
          "style": "display:none;color:red;margin-top:5px"
        });
        if (layerInfos.length === 1) {
          if (layerInfos[0].featureLayer.hasOwnProperty('originalLayerId')) {
            var result = this._getLayerInfoByID(layerInfos[0].featureLayer.originalLayerId);
            if (result.featureLayer.hasAttachments === true) {
              var attachNode = domConstruct.create("div");
              domConstruct.place(attachNode, this.attrInspector.attributeTable, "after");
              this.attrInspector._attachmentUploader = new AttachmentUploader(
                {
                  'class': 'atiAttachmentEditor',
                  attachmentsRequiredMsg: this.attrInspector.attachmentsRequiredMsg,
                  currentAction: this.currentAction,
                  deleteAttachmentText : this.nls.deleteAttachment
                },
                attachNode);
              this.attrInspector._attachmentUploader.startup();
              on(this.attrInspector._attachmentUploader, "attachmentAdded",
                lang.hitch(this, function () {
                  this._enableAttrInspectorSaveButton(this._validateAttributes());
                }));
              on(this.attrInspector._attachmentUploader, "attachmentDeleted",
                lang.hitch(this, function () {
                  this._enableAttrInspectorSaveButton(this._validateAttributes());
                }));
            }
          }
        }

        //Place the attachments warning as per create/edit mode
        if (this.attrInspector._attachmentUploader) {
          attachmentRefNode = this.attrInspector._attachmentUploader.domNode;
        } else if (this.attrInspector._attachmentEditor) {
          attachmentRefNode = this.attrInspector._attachmentEditor.domNode;
        }
        //If node exist, create message and add it to node
        if (attachmentRefNode) {
          domConstruct.place(this.attrInspector.attachmentsRequiredMsg, attachmentRefNode, "before");
        }
        if (featureCreated) {
          this._processRelationAndShowAttrInspector(false, null, layer, null, null, true);
        }
        setTimeout(lang.hitch(this, function () {
          if (this.config.editor.removeOnSave && this.attrInspector._numFeatures === 0) {
            this._setWidgetFirstFocusNode("templatePicker", true);
          } else {
            setTimeout(lang.hitch(this, function () {
              //set first and last focus node when AI is in display
              if (this._attrInspIsCurrentlyDisplayed) {
              this._setWidgetFirstFocusNode("AI", true);
              }
            }), 1000);
          }
          setTimeout(lang.hitch(this, function () {
            this._validateDateTimeField();
            //Hide the attachment form control if layer does not support updates
            //This should only work for saved feature
            if (this.currentLayerInfo && this.attrInspector._attachmentEditor &&
              !this.currentLayerInfo.isCache &&
              !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate) {
              this._disableAttachments(this.attrInspector._attachmentEditor, true, false);
            }
            if (this.currentLayerInfo && this.attrInspector && this.attrInspector._toolTips) {
              array.forEach(this.attrInspector._toolTips, lang.hitch(this, function (domTooltip) {
                var newTooltip;
                //To fix #485 - Create new instance of tooltip in edit mode
                if (this.currentLayerInfo && !this.currentLayerInfo.isCache) {
                  newTooltip = new Tooltip({
                    connectId: domTooltip.connectId,
                    label: domTooltip.label
                  });
                }
                array.forEach(domTooltip.connectId, lang.hitch(this, function (domTooltipConnectId) {
                  if (domTooltipConnectId.indexOf("dijit_form_FilteringSelect") > -1) {
                    domTooltip.position = ["above-centered"];
                    if (newTooltip) {
                      newTooltip.position = ["above-centered"];
                    }
                  }
                }));
              }));
            }
          }), 1500);
        }), 1000);
      },

      _moveToGPSDefResolved: function (currentLocation) {
        this._moveToGPSDef = null;
        // display error if fetching current location fails
        // current location functionality only works with https i.e; secured services
        // application should be executed in https mode
        if (currentLocation.error && currentLocation.error.message) {
          Message({
            message: currentLocation.error.message
          });
        } else {
          if (currentLocation && currentLocation.graphic && currentLocation.graphic.geometry) {
            if (currentLocation.graphic.geometry.x !== "NaN" && currentLocation.graphic.geometry.y !== "NaN") {
              // In case of point geometry, set current selected feature geometry as current location geometry
              this.currentFeature.setGeometry(currentLocation.graphic.geometry);
              // once current feature is moved to current location, execute this function for further process
              this.geometryEdited();
            } else {
              Message({
                message: this.nls.cantLocateUserLocation
              });
            }
          }
        }
      },

      _onDeleteButtonClick: function () {
        if (this.map.infoWindow.isShowing) {
          this.map.infoWindow.hide();
        }

        if (this.config.editor.displayPromptOnDelete) {
          this._promptToDelete();

        } else {
          this._deleteFeature();
        }
      },

      _validateDateTimeField: function () {
        var dijit;
        //Check if attribute inspector is fully loaded
        if (!this.attrInspector._currentLInfo ||
          !this.attrInspector._currentLInfo.fieldInfos) {
          return;
        }
        array.some(this.attrInspector._currentLInfo.fieldInfos,
          lang.hitch(this, function (field) {
            if (field.type === "esriFieldTypeDate") {
              dijit = this._getCurrentFieldDijit(field.fieldName);
              //If the date field value is EMPTY
              //disable the time field dijit
              if (dijit && dijit.length > 1) {
                if (dijit[0].get("value") === null ||
                  dijit[0].get("value") === undefined) {
                  dijit[1].set("value", null);
                  dijit[1].set("disabled", true);
                } else {
                  //Enable the time field only if feature is in create mode
                  //Or layer allows update
                  if (this.currentLayerInfo.isCache ||
                    this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate) {
                    dijit[1].set("disabled", false);
                  }
                }
              }
            }
          }));
      },

      _processNextButtonClicked: function (processRelations, evt, layer, def, feature) {
        //clear multiple values for current feature
        this.currentMultipleValues = null;
        this._removePreviousValuePickerButtons();
        this._processRelationAndShowAttrInspector(processRelations, evt, layer, def, feature, false);
        this._attributeInspectorChangeRecord(evt);
        this._addWarning();
        this._toggleAttrInspectorNavButtons();
      },

      _toggleDeleteButton: function (show) {
        var deleteButton;
        deleteButton = query(".deleteButton", this.buttonHeader);
        if (deleteButton.length > 0) {
          deleteButton = deleteButton[0];
          if (show === true) {
            deleteButton.style.display = "block";
            domAttr.set(deleteButton, "tabindex", "0");
          } else {
            deleteButton.style.display = "none";
            domAttr.set(deleteButton, "tabindex", "-1");
          }
        }
      },

      _activateTemplateToolbar: function (override) {

        var draw_type = override || null;
        var shape_type = null;
        if (this.templatePicker) {
          var selectedTemplate = this.templatePicker.getSelected();
          if (selectedTemplate && selectedTemplate !== null) {
            shape_type = selectedTemplate.featureLayer.geometryType;
            if (selectedTemplate.template !== undefined && selectedTemplate.template !== null &&
              selectedTemplate.template.drawingTool !== undefined && selectedTemplate.template.drawingTool !== null) {
              switch (selectedTemplate.template.drawingTool) {
                case "esriFeatureEditToolNone":
                  switch (selectedTemplate.featureLayer.geometryType) {
                    case "esriGeometryPoint":
                      draw_type = draw_type !== null ? draw_type : Draw.POINT;
                      break;
                    case "esriGeometryPolyline":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                      break;
                    case "esriGeometryPolygon":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                      break;
                  }
                  break;
                case "esriFeatureEditToolPoint":
                  draw_type = draw_type !== null ? draw_type : Draw.POINT;
                  break;
                case "esriFeatureEditToolLine":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                  break;
                case "esriFeatureEditToolAutoCompletePolygon":
                case "esriFeatureEditToolPolygon":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                  break;
                case "esriFeatureEditToolCircle":
                  draw_type = draw_type !== null ? draw_type : Draw.CIRCLE;
                  break;
                case "esriFeatureEditToolEllipse":
                  draw_type = draw_type !== null ? draw_type : Draw.ELLIPSE;
                  break;
                case "esriFeatureEditToolRectangle":
                  draw_type = draw_type !== null ? draw_type : Draw.RECTANGLE;
                  break;
                case "esriFeatureEditToolFreehand":
                  switch (selectedTemplate.featureLayer.geometryType) {
                    case "esriGeometryPoint":
                      draw_type = draw_type !== null ? draw_type : Draw.POINT;
                      break;
                    case "esriGeometryPolyline":
                      draw_type = draw_type !== null ? draw_type : Draw.FREEHAND_POLYLINE;
                      break;
                    case "esriGeometryPolygon":
                      draw_type = draw_type !== null ? draw_type : Draw.FREEHAND_POLYGON;
                      break;
                  }
                  break;
                default:
                  switch (selectedTemplate.featureLayer.geometryType) {
                    case "esriGeometryPoint":
                      draw_type = draw_type !== null ? draw_type : Draw.POINT;
                      break;
                    case "esriGeometryPolyline":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                      break;
                    case "esriGeometryPolygon":
                      draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                      break;
                  }
                  break;
              }
            }
            else {
              switch (selectedTemplate.featureLayer.geometryType) {
                case "esriGeometryPoint":
                  draw_type = draw_type !== null ? draw_type : Draw.POINT;
                  break;
                case "esriGeometryPolyline":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYLINE;
                  break;
                case "esriGeometryPolygon":
                  draw_type = draw_type !== null ? draw_type : Draw.POLYGON;
                  break;
              }
            }
            this.drawToolbar.activate(draw_type);
            this._setDrawingToolbar(shape_type, draw_type);

          }

          else if (this.drawToolbar) {
            this._setDrawingToolbar("select", null);
            this.drawToolbar.deactivate();
            // this._lastDrawnShape = null;
          }
        }
        else if (this.drawToolbar) {
          this._setDrawingToolbar("select", null);
          this.drawToolbar.deactivate();
          //this._lastDrawnShape = null;
        }
      },
      _templatePickerNeedsToBeCreated: function () {
        //if (this.templatePicker === undefined || this.templatePicker === null) {
        //  return true;
        //}
        return true;
        //var recreate = array.some(layers, function (layer) {
        //  var layerMatches = array.some(this.templatePicker.featureLayers, function (tpLayer) {
        //    return tpLayer.id === layer.id;
        //  });
        //  if (layerMatches === false) {
        //    return true;
        //  }
        //  return false;
        //}, this);
        //return recreate;
      },

      /* CT - Commented the code as it was clearing parent features selection when moving to related feature
      _layerChangeOutside: function () {
        if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
          if (this.attrInspector) {
            if (this.attrInspector._numFeatures === 0) {
              this._showTemplate(true);

            }
          }
        }
      },
      */

      _drawingToolClick: function (shapeType, options) {
        return function () {
          // As soon as user clicks on any of the drawing tool,
          // update the "currentDrawType" variable which contains
          // selected drawing tool option.
          if (options.hasOwnProperty("_drawType")) {
            this.currentDrawType = options._drawType;
          }
          if (options.hasOwnProperty("_drawType") && options._drawType === "SELECT") {
            this.drawingTool.set('label', options.label);
            this.drawingTool.set('iconClass', options.iconClass);
            if (this.drawToolbar) {
              this.drawToolbar.deactivate();
            }
            if (this._selectTool) {
              this._selectTool.setFeatureLayers(this._getOrClearSelectableLayers(false));
              this._selectTool.activate();
            }
          } else if (shapeType !== "select") {
            this.drawingTool.set('label', options.label);
            this.drawingTool.set('iconClass', options.iconClass);
            if (this._selectTool && this._selectTool.isActive()) {
              this._selectTool.deactivate();
              //After deactivating select tool infowindow gets enabled so disable it
              this.map.setInfoWindowOnClick(false);
            }
            if (options.hasOwnProperty("_drawType")) {
              this.drawToolbar.activate(options._drawType);
            }
            this.currentShapeType = shapeType;
          }
        };
      },
      _menus: {},
      drawingTool: null,
      _setDrawingToolbar: function (shapeType, drawType, canClear) {
        if (this.drawingTool === null || this.drawingTool === undefined) {
          return;
        }
        if (this.currentShapeType === null ||
          this.currentShapeType === undefined ||
          this.currentShapeType !== shapeType) {
          this.drawingTool.set('dropDown', this._menus[shapeType]);
        }

        this.currentShapeType = shapeType;

        this.currentDrawType = null;

        array.some(SEDrawingOptions[shapeType], function (options) {
          if ((options.hasOwnProperty("_drawType") && options._drawType === drawType) ||
            drawType === null) {
            this.drawingTool.set('label', options.label);
            this.drawingTool.set('iconClass', options.iconClass);
            this.currentDrawType = options._drawType;
            return true;
          }
          else {
            return false;
          }
        }, this);

        //if the proper type was not found, set to first
        if (this.currentDrawType === null || this.currentDrawType === undefined) {
          this.drawingTool.set('label', SEDrawingOptions[shapeType][0].label);
          this.drawingTool.set('iconClass', SEDrawingOptions[shapeType][0].iconClass);
          if (SEDrawingOptions[shapeType][0].hasOwnProperty("_drawType")) {
            this.currentDrawType = SEDrawingOptions[shapeType][0]._drawType;
          }
        }
        // To activate/de-activate select tool, based on current draw type
        this._changeSelectToolState(canClear);
      },
      _createDrawingToolbar: function () {

        if (this.config.editor.hasOwnProperty("displayShapeSelector")) {
          // check the "createNewFeaturesFromExisting" property for backward compatibility
          if (this.config.editor.displayShapeSelector === true ||
            (this.config.editor.hasOwnProperty("createNewFeaturesFromExisting") &&
              (this.config.editor.createNewFeaturesFromExisting === true))) {
            this._menus = this._createDrawingMenus();
            this.drawingTool = new DropDownButton({
              label: "",
              name: "drawingTool",
              id: "drawingTool"
            }, this.drawingOptionsDiv);
            this.drawingTool.startup();
            // check the "createNewFeaturesFromExisting" property for backward compatibility
            if ((this.config.editor.hasOwnProperty("createNewFeaturesFromExisting") &&
              (this.config.editor.createNewFeaturesFromExisting === true))) {
              this._initializeSelectToolWidget();
            }
            this._setDrawingToolbar("select", null);
          }
        }
        else {
          this.config.editor.displayShapeSelector = false;
          // check the "createNewFeaturesFromExisting" property for backward compatibility
          if (this.config.editor.hasOwnProperty("createNewFeaturesFromExisting")) {
            this.config.editor.createNewFeaturesFromExisting = false;
          }
        }
      },
      _createMenu: function (drawingOption) {
        var menu = new DropDownMenu({
          style: "display: none;"
        });
        array.forEach(drawingOption, function (options) {
          var addOption;
          //if displayShapeSelector is disabled & copyFeatures is true show only two options
          //else display all options in ShapeSelector and add copyFeatures option if it is true
          // check the "createNewFeaturesFromExisting" property for backward compatibility
          if ((!this.config.editor.displayShapeSelector) &&
            this.config.editor.hasOwnProperty("createNewFeaturesFromExisting") &&
            this.config.editor.createNewFeaturesFromExisting) {
            addOption = false;
            if ((options.hasOwnProperty("_drawType") && options._drawType === "SELECT") ||
              options.id === "seNewSelection" || options.id === "sePointTool" ||
              options.id === "seDrawPolyline" || options.id === "seDrawPolygon") {
              addOption = true;
            }
          } else {
            addOption = true;
            // check the "createNewFeaturesFromExisting" property for backward compatibility
            if ((options.hasOwnProperty("_drawType") && options._drawType === "SELECT")) {
              if (this.config.editor.hasOwnProperty("createNewFeaturesFromExisting") && this.config.editor.createNewFeaturesFromExisting) {
                addOption = true;
              } else {
                addOption = false;
              }
            }
          }
          if (addOption) {
            this._addMenuItem(options, menu, drawingOption);
          }
        }, this);
        menu.startup();
        return menu;
      },
      _createDrawingMenus: function () {
        var menus = {};
        for (var property in SEDrawingOptions) {
          menus[property] = this._createMenu(SEDrawingOptions[property]);
        }
        return menus;
      },
      _createEditor: function (canClear) {
        var selectedTemplate = null;

        if (this.config.editor === undefined || this.config.editor === null) {
          return;
        }
        var layers = this._getEditableLayers(this.config.editor.configInfos, false);
        //CT: Commented the code as it was clearing parent features selection when moving to related feature
        //this._layerChangeOutside();
        if (layers.length < 1) {
          this._creationDisabledOnAll = true;
          if (this.currentLayerInfo &&
            !this.currentLayerInfo.isCache && this._attrInspIsCurrentlyDisplayed &&
            this._attrInspIsCurrentlyDisplayed === true) {
            this.attrInspector.refresh();
            this.attrInspector.first();
          }
        } else if (this._templatePickerNeedsToBeCreated()) {
          if (this._attrInspIsCurrentlyDisplayed && this._attrInspIsCurrentlyDisplayed === true) {
            this._recreateOnNextShow = true;
            //AI should be refreshed only when user is working with existing features
            if (!this.currentLayerInfo.isCache) {
              this.attrInspector.refresh();
              this.attrInspector.first();
            }
            return;
          }
          if (this.templatePicker &&
            this.templatePicker !== null) {
            //Get the current selected drawing tool to reset on template
            var curSelectedDrawOption = this.currentDrawType;
            selectedTemplate = this.templatePicker.getSelected();
            if (selectedTemplate === null) {
              if (this.drawToolbar) {

                this.drawToolbar.deactivate();
              }
            }
            this._select_change_event.remove();
            this.templatePicker.destroy();
            this._resetEditingVariables();
            if (this.drawToolbar) {
              this.drawToolbar.deactivate();
            }
            if (this.drawingTool) {
              this._setDrawingToolbar("select", null, canClear);
            }
          }
          else {
            this._createAutoSaveSwitch(this.config.editor.autoSaveEdits);
          }
          //create template picker
          this.templatePickerNode = domConstruct.create("div",
            { 'class': "eeTemplatePicker" }
          );
          //if (this.state === "active") {
          //  this.widgetActiveIndicator = domConstruct.create("div",
          //   { 'class': "widgetActive" }
          //   );
          //}
          //else {
          //  this.widgetActiveIndicator = domConstruct.create("div",
          //  { 'class': "widgetNotActive" }
          //  );
          //}
          this.templatePickerDiv.appendChild(this.templatePickerNode);
          this.templatePicker = new TemplatePicker({
            featureLayers: layers,
            'class': 'esriTemplatePicker',
            grouping: true,
            maxLabelLength: "25",
            showTooltip: false
          }, this.templatePickerNode);
          this.templatePicker.startup();
          domAttr.set(this.templatePicker.domNode, "tabindex", "-1");
          aspect.after(this.templatePicker, "update", lang.hitch(this, function () {
            //as soon as update is called, some checkboc node is getting active in template picker
            //hence call this function to remove those checkbox from flow
            this._handle508AccessibilityForTemplatePicker();
            //also after update is called after some time new nodes are added also remove them from flow
            setTimeout(lang.hitch(this, function () {
              this._handle508AccessibilityForTemplatePicker();
            }), 2000);
            //Check if layers are present in the template picker
            //If not show the appropriate message to the user
            this._checkForLayersInTemplatePicker();
          }));
          this._addFilterEditor(layers);
          // wire up events

          if (selectedTemplate !== null && this.templatePicker) {
            var keysArr = Object.getOwnPropertyNames(this.templatePicker._itemWidgets);
            var templateItems = [];
            array.forEach(this.templatePicker._flItems, function (flItems) {
              array.forEach(flItems, function (flItem) {
                templateItems.push(flItem);
              });
            });
            if (templateItems.length === keysArr.length) {
              var itemFnd = array.some(templateItems, function (item, index) {
                if (selectedTemplate.featureLayer.id === item.layer.id &&
                  item.template.name === selectedTemplate.template.name &&
                  item.template.drawingTool === selectedTemplate.template.drawingTool &&
                  item.template.description === selectedTemplate.template.description &&
                  item.type === selectedTemplate.type) {
                  var dom = dojo.byId(keysArr[index]);
                  on.emit(dom, "click", {
                    bubbles: true,
                    cancelable: true
                  });
                  this._activateTemplateToolbar(curSelectedDrawOption);
                  return true;
                }
              }, this);

              if (itemFnd === false) {
                if (this.drawToolbar) {
                  this.drawToolbar.deactivate();
                }
                if (this.drawingTool) {
                  this._setDrawingToolbar("select", null, canClear);
                }
              }
            }
            else {
              if (this.drawToolbar) {
                this.drawToolbar.deactivate();
              }
              if (this.drawingTool) {
                this._setDrawingToolbar("select", null, canClear);
              }
            }
          }
          else {
            if (this.drawToolbar) {
              this.drawToolbar.deactivate();
            }
            if (this.drawingTool) {
              this._setDrawingToolbar("select", null, canClear);
            }
          }
          this._select_change_event = on(this.templatePicker, "selection-change",
            lang.hitch(this, this._template_change));
          this.own(this._select_change_event);
        }
        if (layers.length < 1) {
          this._creationDisabledOnAll = true;
        }
        else {
          this._creationDisabledOnAll = false;
        }
        if (this._creationDisabledOnAll) {
          if (this.drawToolbar) {
            this.drawToolbar.deactivate();
          }
          if (this.drawingTool) {
            this._setDrawingToolbar("select", null, canClear);
          }
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "none");
            if (this.config.editor.autoSaveEdits) {
              this._createAutoSaveSwitch(false);
            }
            //Clear the selected template and activate the map click
            this._mapClickHandler(true);
            this._clearTemplateSelection();
          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "none");
          }
          if (this._filterEditor) {
            dojo.style(this._filterEditor.domNode, "display", "none");
          }

          if (this._isPresetTableCreated) {
            query(".presetFieldsTableDiv")[0].style.display = "none";
          }
        } else {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "block");
          }
          if (this.config.editor.autoSaveEdits) {
            this._createAutoSaveSwitch(true);
          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "block");
          }
          if (this._filterEditor) {
            dojo.style(this._filterEditor.domNode, "display", "block");
          }
          //Show preset table if it is already created
          if (this._isPresetTableCreated) {
            query(".presetFieldsTableDiv")[0].style.display = "block";
          }
        }
        //if valid config infos create preset table
        if (this.config.editor.configInfos && !this._isPresetTableCreated) {
          this._createPresetTable(this.config.editor.configInfos);
        }
        //If template picker is not created on load
        //show the appropriate message
        this._checkForLayersInTemplatePicker();
        //After template picker is created after some time
        //new nodes are added so remove them from flow
        setTimeout(lang.hitch(this, function () {
          this._handle508AccessibilityForTemplatePicker();
          this._setWidgetFirstFocusNode("templatePicker", false);
        }), 2000);
      },

      _checkForLayersInTemplatePicker: function () {
        if (!this.templatePicker || domStyle.get(this.templatePicker.domNode, "display") === "none") {
          var hasAtLeastOneCreateLayer = false, hasAtLeastOneUpdateOnlyLayer = false,
            hasAllCreateDisabled = true, message = "";
          //Check if template has at least one editable layer
          //and also at least one update only layer
          array.some(this.config.editor.configInfos, lang.hitch(this, function (configInfo) {
            if (configInfo._editFlag && configInfo.configFeatureLayer.layerAllowsCreate) {
              if (configInfo.allowUpdateOnly) {
                hasAtLeastOneUpdateOnlyLayer = true;
              } else {
                hasAtLeastOneCreateLayer = true;
                hasAtLeastOneUpdateOnlyLayer = false;
                return true;
              }
            }
          }));
          //Check if all the layers are disabled for create and update
          array.some(this.config.editor.configInfos, lang.hitch(this, function (configInfo) {
            if (configInfo._editFlag && configInfo.configFeatureLayer.layerAllowsCreate &&
              !configInfo.allowUpdateOnly) {
              hasAllCreateDisabled = false;
              return true;
            }
          }));
          //Case 1 : Create enabled layer
          //Check if at least one layer is editable
          //If yes, check if layer is set to visible: true in the web map
          if (hasAtLeastOneCreateLayer) {
            if (this._checkForLayersVisibilityInMap(true)) {
              //If layer is editable and set visible: true in the web map it means
              //layer is not shown because of it is out of scale
              message = this.nls.noVisibleCreateLayerWarning;
            } else {
              //If layer is editable and set visible: false in the web map
              //show message about changing layers visibility
              message = this.nls.checkLayerVisibilityInWebMapWarning;
            }
          } else if (hasAtLeastOneUpdateOnlyLayer) {
            //Case 2 : Update only layer
            //If no create layer is found, check if update only layer is configured
            //Show appropriate message based on layers visibility
            if (this._checkForLayersVisibilityInMap(false)) {
              //If layer(s) are visible in the web map check if they are
              //visible in the current map scale
              if (!this._doesAllLayersOutOfMapScale()) {
                message = this.config.editor.editDescription;
              } else {
                message = this.nls.noVisibleUpdateLayerWarning;
              }
            } else {
              message = this.nls.checkLayerVisibilityInWebMapWarning;
            }
          } else if (hasAllCreateDisabled) {
            //case 3: create and update disabled
            //In this case check for valid relations and accordingly show the message
            if (this._checkIfLayerHasRelations()) {
              //If yes, check if relationship is create or update enabled
              //and accordingly show the message
              var canCreateFeatureInfo =
                this._getLayersRelationShipInfo(this.config.editor.configInfos, true);
              //Show appropriate message for create/update relation
              if (canCreateFeatureInfo.canCreate) {
                message = this.config.editor.editDescription;
              } else {
                var canCreateFeatureInfo =
                  this._getLayersRelationShipInfo(this.config.editor.configInfos, false);
                //Show appropriate message for update only relation
                if (canCreateFeatureInfo.canUpdate) {
                  message = this.config.editor.editDescription;
                } else {
                  //If no valid relations are found and all the parent layers are disabled of creation
                  //show appropriate message
                  message = this.nls.noEditableLayerWarning;
                }
              }
            } else {
              //If no valid relations are found and all the parent layers are disabled of creation
              //show appropriate message
              message = this.nls.noEditableLayerWarning;
            }
          }
          else {
            //Fallback case
            //If no valid relations are found and all the parent layers are disabled of creation
            //show appropriate message
            message = this.nls.noEditableLayerWarning;
          }
          domStyle.set(this.templateTitle, "display", "block");
          domAttr.set(this.templateTitle, "tabindex", "0");
          domAttr.set(this.templateTitle, "innerHTML", message);
          domAttr.set(this.templateTitle, "aria-label", message);
        } else {
          if (this.config.editor.editDescription === undefined || this.config.editor.editDescription === null ||
            this.config.editor.editDescription === "<br>") {
            this.config.editor.editDescription = '';
            this.templateTitle.innerHTML = this.config.editor.editDescription;
            domStyle.set(this.templateTitle, "display", "none");
            domAttr.set(this.templateTitle, "tabindex", "-1");
          }
          else {
            var content = this.editorXssFilter.sanitize(this.config.editor.editDescription);
            this.templateTitle.innerHTML = entities.decode(content);
            //set aria-label by using stripHTMl as description may contains html
            domAttr.set(this.templateTitle, "aria-label",
              utils.stripHTML(this.config.editor.editDescription));
            //display the description and set the tabindex to 0
            domStyle.set(this.templateTitle, "display", "block");
            domAttr.set(this.templateTitle, "tabindex", "0");
          }
        }
      },

      /**
      * Check if layer(s) are out of current map scale
      * @memberOf widgets/CostAnalysis/Widget
      */
      _doesAllLayersOutOfMapScale: function () {
        var isAllLayersOutOfMapScale = true;
        array.some(this.config.editor.configInfos, lang.hitch(this, function (configInfo) {
          //If at least update only layer is visible at the map scale
          //return flag value as false
          if (configInfo.allowUpdateOnly && configInfo.layerInfo &&
            configInfo.layerInfo.layerObject &&
            configInfo.layerInfo.layerObject.visibleAtMapScale) {
            isAllLayersOutOfMapScale = false;
            return true;
          }
        }));
        return isAllLayersOutOfMapScale;
      },

      /**
      * Check if layer(s) are turned off for visibility from web map
      * @memberOf widgets/CostAnalysis/Widget
      */
      _checkForLayersVisibilityInMap: function (checkCreateCapability) {
        var isLayersVisibleOnMap = false;
        array.some(this.config.editor.configInfos, lang.hitch(this, function (configInfo) {
          //For layers which are create enabled, check if update only flag is false
          //and layer is visible at the web map level
          if (checkCreateCapability === undefined) {
            if (configInfo && configInfo.relationshipInfos && configInfo.relationshipInfos.length > 0 &&
              configInfo.layerInfo._visible) {
              isLayersVisibleOnMap = true;
              return true;
            }
          } else if (checkCreateCapability && configInfo._editFlag) {
            if (configInfo.layerInfo && configInfo.layerInfo._visible) {
              isLayersVisibleOnMap = true;
              return true;
            }
          } else if (!checkCreateCapability && configInfo.allowUpdateOnly) {
            //For update only layers, check if update only flag is true
            //and layer is visible at the web map level
            if (configInfo.layerInfo && configInfo.layerInfo._visible) {
              isLayersVisibleOnMap = true;
              return true;
            }
          }
        }));
        return isLayersVisibleOnMap;
      },

      /**
      * Check if layer(s) has a valid relation
      * @memberOf widgets/CostAnalysis/Widget
      */
      _checkIfLayerHasRelations: function () {
        var hasRelations = false;
        array.some(this.config.editor.configInfos, lang.hitch(this, function (layerInfoObj) {
          //Check if layer has valid relation
          if (layerInfoObj.hasOwnProperty("relationshipInfos") &&
            layerInfoObj.relationshipInfos.length > 0) {
            hasRelations = true;
            return true;
          }
        }));
        return hasRelations;
      },

      /**
      * Get the information about which layers relationship is configured
      * @memberOf widgets/CostAnalysis/Widget
      */
      _getLayersRelationShipInfo: function (layerInfo, canCreate) {
        var relationShip = {
          canCreate: false,
          canUpdate: false
        };
        array.some(layerInfo, lang.hitch(this, function (layerInfoObj) {
          //Check for relation and if it exist check if it is create/update enabled
          if (layerInfoObj.relationshipInfos && layerInfoObj.relationshipInfos.length > 0) {
            relationShip = this._getRelationShipDetails(layerInfoObj, canCreate);
            if (relationShip.canCreate || relationShip.canUpdate) {
              return true;
            }
          }
        }));
        return relationShip;
      },

      /**
      * Get relationship configuration details
      * @memberOf widgets/CostAnalysis/Widget
      */
      _getRelationShipDetails: function (layerInfo, canCreate) {
        var info = {
          canCreate: false,
          canUpdate: false
        };
        array.some(layerInfo.relationshipInfos, lang.hitch(this, function (currentRelation) {
          //Check if the relation is create or update enabled
          //based on canCreate flag value
          if (canCreate) {
            //For create enabled layer check if
            //for update only flag also
            if (currentRelation._editFlag) {
              if (currentRelation.allowUpdateOnly) {
                info.canUpdate = true;
              } else {
                info.canCreate = true;
                info.canUpdate = false;
                return true;
              }
            }
          } else {
            //For update only layer check if layer is set to true for creation
            if (currentRelation._editFlag && currentRelation.allowUpdateOnly) {
              info.canUpdate = true;
              return true;
            }
          }
          //If the relation is not create or update enabled
          //then check if the relation has the sub relation configured
          //traverse all the configured relations until the create or update capability is not found
          //If all the relations do not have any of these capabilities then return false
          if (!info.canCreate && !info.canUpdate && currentRelation.relationshipInfos &&
            currentRelation.relationshipInfos.length > 0) {
            info = this._getLayersRelationShipInfo([currentRelation], canCreate);
            if (info.canCreate || info.canUpdate) {
              return true;
            }
          }
        }));
        return info;
      },

      /**
      * Code to handle the 508 accessibility features in template picker
      * @memberOf widgets/CostAnalysis/Widget
      */
      _handle508AccessibilityForTemplatePicker: function () {
        var templatePickerGrid, checkBoxNodes, gridLastFocusNode;
        templatePickerGrid = query("div[role='grid']", this.templatePickerDiv);
        checkBoxNodes = query("[type='checkbox']", this.templatePickerDiv);
        gridLastFocusNode = query("[dojoattachpoint='lastFocusNode']",
          this.templatePickerDiv);
        //Check for all the elements before changing the tab indexes to "-1"
        if (templatePickerGrid && templatePickerGrid[0]) {
          domAttr.set(templatePickerGrid[0], "tabindex", "-1");
        }
        array.forEach(checkBoxNodes, lang.hitch(this, function (node) {
          domAttr.set(node, "tabindex", "-1");
        }));
        //Change the tab index of grid's last focus node to "-1"
        if (gridLastFocusNode && gridLastFocusNode[0]) {
          domAttr.set(gridLastFocusNode[0], "tabindex", "-1");
        }
        var gridMsg = query(".dojoxGridMasterMessages", this.domNode);
        if (gridMsg && gridMsg.length > 0) {
          domAttr.set(gridMsg[0], "tabindex", "-1");
        }
    },

      isGuid: function (value) {
        if (value[0] === "{") {
          value = value.substring(1, value.length - 1);
        }
        var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(value);
      },
      _template_change: function () {
        this._deactivateAllTools();
        this.currentDrawType = null;
        this.currentShapeType = null;
        this._currentSelectedTemplate = Object.create(this.templatePicker.getSelected());
        this._activateTemplateToolbar();
      },
      validateGUID: function (value, constraints) {
        constraints = constraints;
        return this.isGuid(value);
      },
      _createPresetTable: function (layerInfos) {
        //to support backward compatibility
        //if canPresetValue flag is present and it is set to true update the layer infos accordingly
        if (!this._isPresetTableCreated) {
          this._processConfigForBackwardPresetInfos(layerInfos);
        }
        if (this.config.hasOwnProperty("attributeActionGroups") &&
          Object.keys(this.config.attributeActionGroups.Preset).length > 0) {
          if (!this.config.attributeActionGroups.hasOwnProperty("presetOrder")) {
            this.config.attributeActionGroups.presetOrder = Object.keys(this.config.attributeActionGroups.Preset);
          }
          // set preset values table
          if (!this._isPresetTableCreated) {
            //change the value of the variable. This will make sure table is created only once
            this._isPresetTableCreated = true;
            this._initPresetFieldsTable(layerInfos);
          }
          if (this.templatePicker && !domClass.contains(query(".ee-presetValueTableDiv", this.domNode)[0], "esriCTHidden")) {
            query(".presetFieldsTableDiv")[0].style.display = "block";
          } else {
            query(".presetFieldsTableDiv")[0].style.display = "none";
          }
        }
      },

      _processConfigForBackwardPresetInfos: function (layerInfos) {
        var configuredPresetInfos = [];
        //if preset infos is not available in config means use the preset info for canPresetValue
        //flag stored in filed infos
        if (!this.config.editor.hasOwnProperty("presetInfos") && layerInfos) {
          array.forEach(layerInfos, lang.hitch(this, function (configInfo) {
            configInfo.fieldValues = {};
            array.forEach(configInfo.fieldInfos, lang.hitch(this, function (fieldInfo) {
              var actionObj;
              //Check for "canPresetValue" key and handle it for backward compatibility
              if (fieldInfo.hasOwnProperty("canPresetValue") && fieldInfo.canPresetValue) {
                actionObj = [{
                  "actionName": "Intersection",
                  "enabled": false
                }, {
                  "actionName": "Address",
                  "enabled": false
                }, {
                  "actionName": "Coordinates",
                  "enabled": false
                }, {
                  "actionName": "Preset",
                  "enabled": true
                }];
                configInfo.fieldValues[fieldInfo.fieldName] = lang.clone(actionObj);
                configuredPresetInfos[fieldInfo.fieldName] = [];
              }
            }));
          }));
          this.config.editor.presetInfos = configuredPresetInfos;
        }
        //Backward compatibility for the apps configured before 2.14 WAB
        //Update the preset based on fields to Preset Builder Groups
        presetBuilderBackwardCompatibility.createPresetGroups(this.config, this._jimuLayerInfos);
      },

      _presetChange: function () {
        this._toggleUsePresetValues(true);
      },
      _createAutoSaveSwitch: function (defaultState) {
        if (defaultState) {
          query(".autoSaveOptionDiv")[0].style.display = "block";
        } else {
          query(".autoSaveOptionDiv")[0].style.display = "none";
        }
      },
      _toggleRunTimeAutoSave: function () {
        if (this._autoSaveRuntime === false) {
          this._autoSaveRuntime = true;
        } else {
          this._autoSaveRuntime = false;
        }
        this._createAutoSaveSwitch(this.config.editor.autoSaveEdits);
      },
      _deleteFeature: function () {
        if (!this.currentFeature) { return; }

        this._resetEditingVariables();

        var layer = this.currentFeature.getLayer();
        if (layer.url === null) {
          layer.clear();
          this._showTemplate(true);

        } else {
          var processIndicators = query(".processing-indicator");
          var processIndicatorsPanel = query(".processing-indicator-panel");
          var saveBtn = query(".saveButton", this.buttonHeader)[0];
          array.forEach(processIndicators, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          array.forEach(processIndicatorsPanel, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          if (!domClass.contains(saveBtn, "hide")) {
            domClass.add(saveBtn, "hide");
          }

          layer.applyEdits(null, null, [this.currentFeature],
            lang.hitch(this, function (adds, updates, deletes) {
              adds = adds;
              updates = updates;
              if (deletes && deletes.length > 0 && deletes[0].hasOwnProperty("error")) {
                Message({
                  message: deletes[0].error.toString()
                });

              }
              else {
                this.updateFeatures.splice(this.updateFeatures.indexOf(this.currentFeature), 1);
                //after delete if features length is greater than 0
                //then refresh attribute inspector & show next feature else
                //if showing features of related layer and
                if (this.updateFeatures && this.updateFeatures.length > 0) {
                  //In case of deleting features from table the selection does not updates,
                  //although we removed it from updateFeatures Array.
                  //So again select records with remaining oIds
                  if (layer.type === "Table") {
                    var oIds = [];
                    this.loading.show();
                    array.forEach(this.updateFeatures, function (feature) {
                      oIds.push(feature.attributes[layer.objectIdField]);
                    });
                    var query = new Query();
                    query.objectIds = oIds;
                    layer.selectFeatures(query, FeatureLayer.SELECTION_NEW,
                      lang.hitch(this, function (selectedFeatures) {
                        this.updateFeatures = selectedFeatures;
                        this.attrInspector.refresh();
                        this.attrInspector.first();
                        this.loading.hide();
                      }), lang.hitch(this, function () {
                        this.loading.hide();
                      }));
                  } else {
                    this.attrInspector.refresh();
                    this.attrInspector.first();
                  }

                } else {
                  //show template picker if showing details of layer
                  //& when showing related tables/layers details go back to parent features details
                  if (this._traversal.length < 2) {
                    this._showTemplate(true);
                    this._setWidgetFirstFocusNode("templatePicker", true);
                  } else {
                    on.emit(this.cancelButton, 'click', { cancelable: true, bubbles: true });
                    this._setWidgetFirstFocusNode("AI", true);
                  }
                }
              }
              array.forEach(processIndicators, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              array.forEach(processIndicatorsPanel, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              if (domClass.contains(saveBtn, "hide")) {
                domClass.remove(saveBtn, "hide");
              }
            }), lang.hitch(this, function (err) {
              Message({
                message: err.message.toString() + "\n" + err.details
              });
              array.forEach(processIndicators, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              array.forEach(processIndicatorsPanel, function (processIndicator) {
                if (domClass.contains(processIndicator, "busy")) {
                  domClass.remove(processIndicator, "busy");
                }
              });
              if (domClass.contains(saveBtn, "hide")) {
                domClass.remove(saveBtn, "hide");
              }
            }));
        }
      },

      _editGeometry: function (checked) {
        //if current layerInfo dont have editFlag return
        if (checked &&
          (this._ignoreEditGeometryToggle ||
            (this.currentLayerInfo && !this.currentLayerInfo._editFlag))) {
          return;
        }

        if (checked === true) {
          if (this.currentLayerInfo &&
            this.currentLayerInfo.disableGeometryUpdate && !this.currentLayerInfo.isCache) {
            return;
          }
          //When not in create mode and layerAllowsUpdate is false or layer has M 0r Z value
          if (this.currentLayerInfo && !this.currentLayerInfo.isCache &&
            (!this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate ||
              (this.currentLayerInfo.featureLayer.hasZ && !this.currentLayerInfo.featureLayer.enableZDefaults) ||
              (this.currentLayerInfo.featureLayer.hasM && !this.currentLayerInfo.featureLayer.allowUpdateWithoutMValues))) {
            return;
          }
          this.map.setInfoWindowOnClick(false);

          if (this.map.infoWindow.isShowing) {
            this.map.infoWindow.hide();
          }
          //enable editing only if it is disabled & current feature is valid have geometry
          if (this._editingEnabled === false && this.currentFeature && this.currentFeature.geometry) {
            this._editingEnabled = true;
            // store the original geometry for later use
            this.currentFeature.origGeom = this.currentFeature.geometry.toJson();
            // when by default edit geometry is checked in config and In widget if we draw geometry on map for a first time
            // we are unable to edit geometry on map
            // but while running app in debugging mode we are able to edit geometry
            // so added timeout to _activateEditToolbar function
            setTimeout(lang.hitch(this, function () {
              this._activateEditToolbar(this.currentFeature);
            }), 100);
          } else {
            if (this.editToolbar.getCurrentState().tool !== 0) {
              this.editToolbar.deactivate();
            }
            this._editingEnabled = false;
          }
        } else {
          this.map.setInfoWindowOnClick(true);
          //I am not sure what this is doing, but it causes issue
          //if (this.editToolbar.getCurrentState().tool !== 0) {
          this.editToolbar.deactivate();
          //}
          this._editingEnabled = false;
        }
        this._toggleAttributeButtonVisibility(checked);
        this._toggleLocateButtonVisibility(checked);
        this._toggleXYCoordinatesButtonVisibility(checked);
        this._toggleMapNavigationButtonVisibility(checked);
        this._setWidgetFirstFocusNode("AI", false);
      },

      /**
       * This function is used to toggle the state of attribute button from auto update on to off mode & vice versa
       */
      _toggleAttributeButtonState: function () {
        // replace the state of button from on to off mode, if user clicks on button in auto on mode
        if (this._refreshButton && domClass.contains(this._refreshButton, "esriCTAutoUpdateOnMode")) {
          domClass.replace(this._refreshButton, "esriCTAutoUpdateOffMode", "esriCTAutoUpdateOnMode");
          domAttr.set(this._refreshButton, "title", this.nls.automaticAttributeUpdatesOff);
        } else if (this._refreshButton && domClass.contains(this._refreshButton, "esriCTAutoUpdateOffMode")) {
          domClass.replace(this._refreshButton, "esriCTAutoUpdateOnMode", "esriCTAutoUpdateOffMode");
          domAttr.set(this._refreshButton, "title", this.nls.automaticAttributeUpdatesOn);
          //Since the button is turned on, the updated geometry should be used for fetching attributes
          this._refreshAttributes();
        }
      },

      /**
       * This function is used to show/hide the map navigation button depending upon certain conditions
       * @param {checked} : boolean value consisting a state of the edit geometry checkbox. if checked show the icon else hide it
       */
      _toggleAttributeButtonVisibility: function (checked) {
        // Show/Hide map navigation button based on enableLockingMapNavigation configuration
        // Removed dependency on edit checkbox as per gitHub ticket #470
        // The Attribute Actions update button should show even when update geometry is not checked
        // The button should be shown only for editable layers
        if (this.config.editor.enableAttributeUpdates && this.currentLayerInfo && (this.currentLayerInfo.isCache || this.currentLayerInfo.isEditable)) {
          domClass.remove(this._refreshButton, "hidden");
        } else {
          domClass.add(this._refreshButton, "hidden");
        }
      },

      /**
       * This function is used to show/hide the locate button depending upon certain conditions
       * @param {checked} : a state of the edit geometry checkbox. if checked show the icon else hide it
       */
      _toggleLocateButtonVisibility: function (checked) {
        //if edit checkbox is checked and enableMovingSelectedFeatureToGPS is enabled
        //and selected feature is point then show locate button
        if (checked && this.config.editor.enableMovingSelectedFeatureToGPS &&
          this.currentFeature && this.currentFeature.geometry &&
          this.currentFeature.geometry.type === "point") {
          domClass.remove(this._locateButtonDiv, "hidden");
        } else {
          domClass.add(this._locateButtonDiv, "hidden");
        }
      },

      /**
       * This function is used to show/hide the xy coordinates button depending upon certain conditions
       * @param {checked} : a state of the edit geometry checkbox. if checked show the icon else hide it
       */
      _toggleXYCoordinatesButtonVisibility: function (checked) {
        //if edit checkbox is checked and enableMovingSelectedFeatureToXY is enabled
        //and selected feature is point then show xyCoordinates button
        if (checked && this.config.editor.enableMovingSelectedFeatureToXY &&
          this.currentFeature && this.currentFeature.geometry &&
          this.currentFeature.geometry.type === "point") {
          domClass.remove(this._xyCoordinates, "hidden");
        } else {
          domClass.add(this._xyCoordinates, "hidden");
        }
      },

      /**
       * This function is used to invoke the state change of map navigation button
       */
      _toggleMapNavigationButtonState: function () {
        if (domClass.contains(this._mapNavigation, "esriCTMapNavigationUnLocked")) {
          this._lockMapNavigation();
        } else if (domClass.contains(this._mapNavigation, "esriCTMapNavigationLocked")) {
          this._unLockMapNavigation();
        }
      },

      /**
       * This function is used to lock the map navigation
       */
      _lockMapNavigation: function () {
        if (this._mapNavigation) {
          domClass.replace(this._mapNavigation, "esriCTMapNavigationLocked", "esriCTMapNavigationUnLocked");
          domAttr.set(this._mapNavigation, "title", this.nls.mapNavigationLocked);
          this.map.disableMapNavigation();
        }
      },

      /**
       * This function is used to unlock the map navigation
       */
      _unLockMapNavigation: function () {
        if (this._mapNavigation) {
          domClass.replace(this._mapNavigation, "esriCTMapNavigationUnLocked", "esriCTMapNavigationLocked");
          domAttr.set(this._mapNavigation, "title", this.nls.mapNavigationUnLocked);
          this.map.enableMapNavigation();
        }
      },

      /**
       * This function is used to show/hide the map navigation button depending upon certain conditions
       * @param {checked} : boolean value consisting a state of the edit geometry checkbox. if checked show the icon else hide it
       */
      _toggleMapNavigationButtonVisibility: function (checked) {
        // Show/Hide map navigation button based on edit checkbox state
        // and enableLockingMapNavigation configuration
        if (checked && this.config.editor.enableLockingMapNavigation) {
          domClass.remove(this._mapNavigation, "hidden");
        } else {
          domClass.add(this._mapNavigation, "hidden");
        }
        this._unLockMapNavigation();
      },

      _enableAttrInspectorSaveButton: function (enable, isNewRelatedFeature, updateFirstAndLastNode) {
        var saveBtn = query(".saveButton", this.buttonHeader)[0];
        var isSaveButtonEnable = false;
        if (!saveBtn) { return; }

        if (enable) {
          if (domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.remove(saveBtn, "jimu-state-disabled");
            domAttr.set(saveBtn, "tabindex", "0");
          }
          isSaveButtonEnable = true;
          domAttr.set(saveBtn, "tabindex", "0");
          this._setWidgetFirstFocusNode("AI", false);
        } else {
          if (!domClass.contains(saveBtn, "jimu-state-disabled")) {
            domClass.add(saveBtn, "jimu-state-disabled");
            domAttr.set(saveBtn, "tabindex", "-1");
            this._setWidgetFirstFocusNode("AI", false);
          }
        }
        //Update the save buttons state in its respective related table info
        if (!isNewRelatedFeature && this.currentFeature &&
          this._relatedTablesInfo[this.currentFeature._layer.id]) {
          this._relatedTablesInfo[this.currentFeature._layer.id].isSaveEnable = isSaveButtonEnable;
        }

        //If there are no fields in attrInspector and Layer attachment is enabled
        if (this.currentLayerInfo.showAttachments && updateFirstAndLastNode &&
          registry.findWidgets(this.attrInspector.attributeTable).length === 0) {
          this._setWidgetFirstFocusNode("AI", true);
        }
      },

      _setConfiguredFieldInfos: function (layerFieldInfo, configuredFieldInfo) {
        var fieldInfos = [];
        array.forEach(configuredFieldInfo, function (field) {
          var fieldInfoFromLayer = presetUtils.getFieldInfoByFieldName(layerFieldInfo, field.fieldName);
          var fInfo = lang.mixin(lang.clone(fieldInfoFromLayer), field);
          fieldInfos.push(fInfo);
        });
        return fieldInfos;
      },

      _getLayerInfoByID: function (id) {
        if (id.indexOf("_lfl") > 0) {
          id = id.replace("_lfl", "");
        }
        //if user is seeing related tables details get it from relationShip info
        //else  get the details from layerInfos directly
        if (this._traversal && this._traversal.length > 0) {
          var currentConfig;
          currentConfig = this.config.editor.configInfos;
          //Loop through all configured layers and
          //traverse to the selected layer / table by using traversal lineage & returns layerInfo
          array.some(this._traversal, function (layerId, layerIndex) {
            array.some(currentConfig, function (info) {
              if (info.featureLayer.id === layerId) {
                currentConfig = info;
                return true;
              }
            });
            //if current table is not of all-layers and the index is not last then consider the next relations
            if (this._traversal.length > 1 && layerIndex + 1 < this._traversal.length) {
              currentConfig = currentConfig.relationshipInfos;
            }

          }, this);
          //layer info will not be available for related layer infos so add it
          if (!currentConfig.layerInfo) {
            currentConfig.layerInfo = this._jimuLayerInfos.getLayerOrTableInfoById(currentConfig.featureLayer.id);
            //get layers configFeatureLayer info
            var layerConfig = editUtils.getConfigInfo(currentConfig.layerInfo, {});
            var layerObject = currentConfig.layerInfo.layerObject;
            // modify templates with space in string fields
            this._removeSpacesInLayerTemplates(layerObject);
            //set configured field with the detailed field info from layers fieldInfos
            currentConfig.fieldInfos = this._setConfiguredFieldInfos(layerConfig.fieldInfos, currentConfig.fieldInfos);
            this.processConfigForRuntime(currentConfig);
            currentConfig.configFeatureLayer = layerConfig.featureLayer;
            currentConfig.featureLayer = layerObject;
            currentConfig.showDeleteButton = false;
          }
          return currentConfig;
        } else {
          var result = null;
          this.config.editor.configInfos.some(function (configInfo) {
            return configInfo.featureLayer.id === id ? ((result = configInfo), true) : false;
          });
          return result;
        }
      },

      _initPresetFieldsTable: function (editLayerInfos) {
        var presetValueTableNode = domConstruct.create("div", {
          "class": "ee-presetValueTableDiv templatePicker"
        }, this.presetFieldsTableNode);
        var bodyDiv = domConstruct.create("div", { "class": "bodyDiv" }, presetValueTableNode);
        var bodyTable = domConstruct.create("table", { "class": "ee-presetValueBodyTable" }, bodyDiv);

        var presetValueTable = domConstruct.create("tbody", {
          "class": "ee-presetValueBody", "id": "eePresetValueBody"
        }, bodyTable, "first");

        var presetAllFields = new PresetAllFields({
          nls: this.nls,
          parentNode: presetValueTable,
          configInfos: editLayerInfos,
          _jimuLayerInfos: this._jimuLayerInfos,
          _configuredPresetInfos: this.config.attributeActionGroups.Preset,
          presetOrder: this.config.attributeActionGroups.presetOrder,
          showingInWidget: true,
          map: this.map
        });
        this.own(on(presetAllFields, "presetValueChanged", lang.hitch(this, this._presetChange)));
        //Hide Preset form borders when all groups are set to hide in display
        //Also, hide "Use Preset Values checkbox" when all groups are set to hide in display
        if (!presetAllFields.hasAtLeastOneGroupInDisplay) {
          domClass.add(presetValueTableNode, "esriCTHidden");
          domStyle.set(registry.byId("savePresetValueSwitch").domNode, "display", "none");
        }
        //enable use preset value checkbox if any of the preset group has valid value
        if (presetAllFields.enableUsePresetValueCheckBox) {
          this._presetChange();
        }
      },

      _dateClick: function (dateWidget, timeWidget) {
        return function () {
          if (dateWidget !== undefined && dateWidget !== null) {
            dateWidget.set('value', new Date());
          }
          if (timeWidget !== undefined && timeWidget !== null) {
            timeWidget.set('value', new Date());
          }
        };

      },
      _getEditableLayers: function (layerInfos, allLayers) {
        var layers = [];
        array.forEach(layerInfos, function (layerInfo) {
          if (layerInfo._editFlag) {
            if (!layerInfo.allowUpdateOnly || allLayers) { //
              var layerObject = this.map.getLayer(layerInfo.featureLayer.id);
              if (layerObject &&
                layerObject.visible &&
                layerObject.isVisibleAtScale(this.map.getScale()) &&
                layerObject.isEditable &&
                layerObject.isEditable()) {
                layers.push(layerObject);
              }
            }
          }
        }, this);

        return layers;
      },
      _getEditableLayersInfos: function (layerInfos, allLayers) {
        var layers = [];
        array.forEach(layerInfos, function (layerInfo) {
          if (layerInfo._editFlag) {
            if (!layerInfo.allowUpdateOnly || allLayers) { //
              var layerObject = this.map.getLayer(layerInfo.featureLayer.id);
              if (layerObject &&
                layerObject.visible &&
                layerObject.isVisibleAtScale(this.map.getScale()) &&
                layerObject.isEditable &&
                layerObject.isEditable()) {
                layers.push(layerInfo);
              }
            }
          }
        }, this);

        return layers;
      },
      _getClonedRelationInfo: function (relations) {
        var newRelations = [];
        for (var i = 0; i < relations.length; i++) {
          var relatedInfo = {};
          for (var key in relations[i]) {
            if (relations[i].hasOwnProperty(key) && key !== 'featureLayer' && key !== 'layerInfo') {
              //Get recursive relationship info's
              if (key === "relationshipInfos") {
                relatedInfo[key] = this._getClonedRelationInfo(relations[i][key]);
              } else {
                relatedInfo[key] = lang.clone(relations[i][key]);
              }
            }
          }
          newRelations.push(relatedInfo);
        }
        return newRelations;
      },
      _getLayerInfoForLocalLayer: function (localLayer) {

        var result = this._getLayerInfoByID(localLayer.originalLayerId);
        var layerInfo;

        if (result !== null) {//(layerObject.type === "Feature Layer" && layerObject.url) {
          // get the fieldInfos
          layerInfo = {};
          for (var k in result) {
            if (result.hasOwnProperty(k) && k !== 'featureLayer' && k !== 'layerInfo') {
              if (k === "relationshipInfos") {
                layerInfo[k] = this._getClonedRelationInfo(result[k]);
              } else {
                layerInfo[k] = lang.clone(result[k]);
              }
            }
          }

          layerInfo.featureLayer = localLayer;

        }
        return layerInfo;
      },
      _getSelectionSymbol: function (geometryType, highlight) {
        if (!geometryType || geometryType === "") { return null; }

        var selectionSymbol;
        switch (geometryType) {
          case "esriGeometryPoint":
            if (highlight === true) {
              selectionSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,
                20,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color([0, 230, 169, 1]), 2),
                new Color([0, 230, 169, 0.65]));
            } else {
              selectionSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,
                20,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color([92, 92, 92, 1]), 2),
                new Color([255, 255, 0, 0.65]));
            }
            break;
          case "esriGeometryPolyline":
            if (highlight === true) {
              selectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([0, 255, 255, 0.65]), 2);
            } else {
              selectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255, 255, 0, 0.65]), 2);
            }
            break;
          case "esriGeometryPolygon":
            var line;
            if (highlight === true) {
              selectionSymbol = new SimpleFillSymbol().setColor(new Color([0, 230, 169, 0.65]));
              line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([192, 192, 192, 1]), 2);
            } else { // yellow with black outline
              selectionSymbol = new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.65]));
              line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([192, 192, 192, 1]), 2);
            }
            selectionSymbol.setOutline(line);
            break;
        }
        return selectionSymbol;
      },
      _hasPresetValueFields: function (layerInfos) {
        return layerInfos.some(function (layerInfo) {
          if (layerInfo.allowUpdateOnly === false) {
            if (layerInfo.fieldInfos) {
              return layerInfo.fieldInfos.some(function (fi) {
                return fi.canPresetValue === true;
              });
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }
        }, this);

      },

      _setPresetValueValue: function (fieldName, value, groupName) {
        var createGroupName = true, dateInfo;
        var presetValueTable = query("#eePresetValueBody")[0];
        if (groupName) {
          createGroupName = false;
        }
        if (presetValueTable) {
          var inputElements = query(".preset-value-editable .ee-inputField");
          array.forEach(inputElements, lang.hitch(this, function (ele) {
            var elem = dijit.byNode(ele);
            if (elem !== undefined && elem !== null) {
              //Get element namd and dategroup info
              var elementName = elem.get("name");
              var isDateGroup = elem.get("isdategroup");
              var spaceSeperatedGroupName;
              //For backward compatibility, create group name using fieldName
              //for e.g Prest gorup will have groupName 'Name (name)'
              //in this only match field name in brackets
              if (createGroupName) {
                spaceSeperatedGroupName = elementName.split(" ");
                if (spaceSeperatedGroupName.length > 1) {
                  elementName = spaceSeperatedGroupName[1];
                  groupName = "(" + fieldName + ")";
                }
              }
              //If group name is valid and it matches elements name then set the value
              if (groupName && elementName.toLowerCase() === groupName.toLowerCase()) {
                //In case of date groups create fixed date info
                //else set the value directly
                if (elem.esriCTisDateGroup) {
                  dateInfo = {
                    "dateType": "fixed",
                    "dateTime": new Date(value).getTime()
                  }
                  elem.esriCTPresetGroup.presetValue = dateInfo;
                  //If valid date exist, show the same in preset group
                  if (dateInfo.dateTime) {
                    elem.set("value",
                      presetUtils.getDateFromRelativeInfo(elem.esriCTPresetGroup.presetValue, true));
                  } else {
                    //Otherwise show the empty date
                    elem.set("value", "");
                  }
                } else if (elem.esriCTDomainList) {
                  array.some(elem.store.data, function (option) {
                    if (option.id === value) {
                      elem.set("value", value);
                      return true;
                    }
                  });
                } else {
                  //if numbertextbox then convert value into integer
                  if (elem.declaredClass === "dijit.form.NumberTextBox") {
                    elem.set("value", parseFloat(value));
                  } else {
                    elem.set("value", value);
                  }
                }
              }
            }
          }));
        }
        //For those presets which are hide in preset display at runtime,
        //update the values directly in config object for that preset group
        //so that it will be used when new features are created
        if (groupName && this.config.attributeActionGroups.Preset &&
          this.config.attributeActionGroups.Preset[groupName] &&
          this.config.attributeActionGroups.Preset[groupName].hideInPresetDisplay) {
          if (dateInfo) {
            this.config.attributeActionGroups.Preset[groupName].presetValue = dateInfo;
          } else {
            this.config.attributeActionGroups.Preset[groupName].presetValue = value;
          }
          //Check the "Use preset value checkbox" once valid value is found
          this._presetChange();
        }
      },

      _modifyAttributesWithPresetValues: function (attributes, newTempLayerInfos, copyAttrInfo, fKeyField) {
        var presetFields = [], presetFieldsGroupName = {}, uniquePresetGroupNames = [], inIntersectionActionFields = [];
        //if fieldValues exist means copy actions are applied
        if (newTempLayerInfos.fieldValues) {
          //loop through all copy actions and get the values as per priority for individual actions
          for (var fieldName in newTempLayerInfos.fieldValues) {
            for (var i = 0; i < newTempLayerInfos.fieldValues[fieldName].length; i++) {
              var copyAction = newTempLayerInfos.fieldValues[fieldName][i];
              var foundInIntersection = false;
              var currentFieldInfo;
              //get current feields info
              if (newTempLayerInfos.fieldInfos) {
                currentFieldInfo = presetUtils.getFieldInfoByFieldName(newTempLayerInfos.fieldInfos, fieldName);
              }
              //get value form intersection if it is enabled
              if (copyAttrInfo && copyAction.actionName === "Intersection" && copyAction.enabled) {
                for (var j = 0; j < copyAction.fields.length; j++) {
                  var fieldInfo = copyAction.fields[j];
                  if (copyAttrInfo.Intersection.hasOwnProperty(fieldName) &&
                    copyAttrInfo.Intersection[fieldName].hasOwnProperty(fieldInfo.layerId) &&
                    copyAttrInfo.Intersection[fieldName][fieldInfo.layerId].hasOwnProperty(fieldInfo.field)) {
                    attributes[fieldName] = copyAttrInfo.Intersection[fieldName][fieldInfo.layerId][fieldInfo.field];
                    if (currentFieldInfo && currentFieldInfo.type === "esriFieldTypeString") {
                      if (attributes[fieldName] === null || attributes[fieldName] === undefined) {
                        attributes[fieldName] = "";
                      }
                      attributes[fieldName] = attributes[fieldName].toString();
                    }
                    foundInIntersection = true;
                    //create list of fields on which intersection action will be applied
                    if (copyAttrInfo.multipleValues && copyAttrInfo.multipleValues.hasOwnProperty(fieldName) &&
                      inIntersectionActionFields.indexOf(fieldName) < 0) {
                      inIntersectionActionFields.push(fieldName);
                    }
                    break;
                  }
                }
                if (foundInIntersection) {
                  break;
                }
              }
              //get value from address if it is enabled
              if (copyAttrInfo && copyAction.actionName === "Address" && copyAction.enabled &&
                copyAttrInfo.Address.hasOwnProperty(copyAction.field)) {
                attributes[fieldName] = copyAttrInfo.Address[copyAction.field];
                break;
              }
              //get value from coordinates if it is enabled
              if (copyAttrInfo && copyAction.actionName === "Coordinates" && copyAction.enabled) {
                if (copyAction.coordinatesSource && copyAction.coordinatesSource === "myLocation") {
                  var hasCoordinatesSystemKey =
                    copyAttrInfo.MyLocation.Coordinates.hasOwnProperty(copyAction.coordinatesSystem);
                  //If xy is a field store both x y in same field
                  if (copyAction.field === "xy" || copyAction.field === "yx") {
                    if (hasCoordinatesSystemKey) {
                      attributes[fieldName] = this._getOutputString(copyAction.coordinatesSystem,
                        copyAttrInfo.MyLocation.Coordinates[copyAction.coordinatesSystem], copyAction.field);
                    } else {
                      attributes[fieldName] = "";
                    }
                  } else {
                    attributes[fieldName] = hasCoordinatesSystemKey ?
                      copyAttrInfo.MyLocation.Coordinates[copyAction.coordinatesSystem][copyAction.field] : "";
                    //when x/y coordinates are used and control is changed to textarea, it is showing invalid in text area.
                    //so convert value to string if the field type is string
                    if (currentFieldInfo && currentFieldInfo.type === "esriFieldTypeString") {
                      attributes[fieldName] = attributes[fieldName].toString();
                    }
                  }
                } else {
                  //If xy is a field store both x y in same field
                  if (copyAction.field === "xy"  || copyAction.field === "yx") {
                    attributes[fieldName] = this._getOutputString(copyAction.coordinatesSystem,
                      copyAttrInfo.Coordinates[copyAction.coordinatesSystem], copyAction.field);
                  } else {
                    attributes[fieldName] = copyAttrInfo.Coordinates[copyAction.coordinatesSystem][copyAction.field];
                    //when x/y coordinates are used and control is changed to textarea, it is showing invalid in text area.
                    //so convert value to string if the field type is string
                    if (currentFieldInfo && currentFieldInfo.type === "esriFieldTypeString") {
                      attributes[fieldName] = attributes[fieldName].toString();
                    }
                  }
                }
                break;
              }
              //get value from preset if it is enabled
              //Skip forieng key field to be overridden by attribute actions
              if (!fKeyField || fKeyField !== fieldName) {
                if (copyAction.actionName === "Preset" && copyAction.enabled && this._usePresetValues) {
                  presetFields.push(fieldName);
                  if (copyAction.attributeActionGroupName) {
                    presetFieldsGroupName[fieldName] = copyAction.attributeActionGroupName;
                    if (uniquePresetGroupNames.indexOf(copyAction.attributeActionGroupName) < 0) {
                      uniquePresetGroupNames.push(copyAction.attributeActionGroupName);
                    }
                  }
                  break;
                }
              }
            }
          }
          //same field can have multiple attribute actions applied
          //we need to provide value picker only for those fields for which intersection action will be applied according to priority
          //else set null as multiple values. since no field is involved in intersection multiple values should be null
          if (copyAttrInfo) {
            if (copyAttrInfo.multipleValues && inIntersectionActionFields.length > 0) {
            var involvedMultipleValues = {}
            array.forEach(inIntersectionActionFields, function (fld) {
              involvedMultipleValues[fld] = copyAttrInfo.multipleValues[fld];
            });
            copyAttrInfo.multipleValues = involvedMultipleValues;
          } else {
            copyAttrInfo.multipleValues = null;
            }
          }
        }
        //if preset is configured for some fields
        //then modify Attributes with preset values entered in the preset form
        if (presetFields.length > 0) {
          var valToSet = this._getPresetValueForGroup(uniquePresetGroupNames);
          for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute) &&
              presetFields.indexOf(attribute) >= 0 &&
              presetFieldsGroupName.hasOwnProperty(attribute)) {
              attributes[attribute] = valToSet[presetFieldsGroupName[attribute]];
            }
          }
        }
      },

      /**
       * Returns object with groupName and its value
       * @param {Array of group names for which values need to be fetched} groupNames
       */
      _getPresetValueForGroup: function (groupNames) {
        var returnValue = {};
        var configuredPresetGroups = this.config.attributeActionGroups.Preset;
        for (var i = 0; i < groupNames.length; i++) {
          //Check if preset group name exist
          if (configuredPresetGroups.hasOwnProperty(groupNames[i])) {
            var presetGroup = configuredPresetGroups[groupNames[i]];
            if (!presetGroup.showOnlyDomainFields &&
              (presetGroup.dataType === "esriFieldTypeString" ||
                presetGroup.dataType === "esriFieldTypeInteger" ||
                presetGroup.dataType === "esriFieldTypeGUID")) {
              returnValue[groupNames[i]] = presetGroup.presetValue;
            } else if (presetGroup.dataType === "esriFieldTypeDate" &&
              !presetGroup.showOnlyDomainFields) {
              //get date from relative info stored
              var newFieldVal = presetUtils.getDateFromRelativeInfo(presetGroup.presetValue);
              //get date in epoch format so that it can be saved in the layer
              newFieldVal = (newFieldVal && newFieldVal.getTime) ?
                newFieldVal.getTime() : (newFieldVal && newFieldVal.toGregorian ?
                  newFieldVal.toGregorian().getTime() : newFieldVal);
              //store new date value in object
              returnValue[groupNames[i]] = newFieldVal;
            } else if (presetGroup.selectedDomainValue) {
              returnValue[groupNames[i]] = presetGroup.selectedDomainValue;
            }
          }
        }
        return returnValue;
      },

      // to add (*) to the label of required fields
      // also add field type and domain to use in the preset values
      processConfigForRuntime: function (configInfo) {
        var filteredFieldInfos = [];
        if (!configInfo) {
          return;
        }
        //if layer is not editable set editable flag to false
        //so that attribute inspector will open in disabled mode
        if (!configInfo._editFlag) {
          configInfo.isEditable = false;
        }
        filteredFieldInfos = array.filter(configInfo.fieldInfos, function (fieldInfo) {
          if (fieldInfo.type === "esriFieldTypeBlob" ||
            fieldInfo.type === "esriFieldTypeGlobalID" ||
            fieldInfo.type === "esriFieldTypeRaster" ||
            fieldInfo.type === "esriFieldTypeXML") {//fieldInfo.type === "esriFieldTypeGeometry" || fieldInfo.type === "esriFieldTypeOID" ||
            return false;
          }
          if (fieldInfo.nullable === false && fieldInfo.editable === true) {
            //Removed for JS api 3.20 as this is part of the Attribute Inspector
            //if (fieldInfo.label.indexOf('<a class="asteriskIndicator">') < 0) {
            //  fieldInfo.label = fieldInfo.label +
            //    '<a class="asteriskIndicator"> *</a>';
            //}
          }
          if (fieldInfo.isEditable === true) {
            return true;
          }
          else {
            return fieldInfo.visible;
          }
        });
        //If honor webmap configuration is set to true and all the fields are
        //turned off for editable and visible property in popup
        //Show all the fields from the layer
        if (this.config.editor.hasOwnProperty("honorWebMapConfiguration") &&
          this.config.editor.honorWebMapConfiguration && filteredFieldInfos.length === 0) {
          filteredFieldInfos = array.filter(configInfo.fieldInfos, function (fieldInfo) {
            if (fieldInfo.type === "esriFieldTypeBlob" ||
              fieldInfo.type === "esriFieldTypeGlobalID" ||
              fieldInfo.type === "esriFieldTypeRaster" ||
              fieldInfo.type === "esriFieldTypeXML") {
                return false;
            }
            return true;
          });
        }
        //Update field infos in the config object
        configInfo.fieldInfos = filteredFieldInfos;
      },

      _newAttrInspectorNeeded: function () {
        var yes = false;

        if (!this.attrInspector || this.attrInspector.layerInfos.length > 1) {
          yes = true;
        } else { //this.attrInspector.layerInfos.length == 1

          var lflId = this.attrInspector.layerInfos[0].featureLayer.id;
          if (lflId.indexOf("_lfl") > 0) { // attrInspector associated with a local feature
            yes = lflId.indexOf(this.templatePicker.getSelected().featureLayer.id) < 0;
          } else {

            yes = true;
          }
        }

        if (yes && this.attrInspector) {
          this.attrInspector.destroy();
          this.attrInspector = null;
        }
        else {
          if (this._attachmentUploader && this._attachmentUploader !== null) {
            this._attachmentUploader.clear();
          }
        }
        return yes;
      },

      _onMapClick: function (evt) {
        // It is used to clear all the highlighted features which were highlighted
        // using custom select tool. This is executed when user clicks on map.
        if (this._copyFeaturesObj) {
          // Consider a case when user is viewing copy features list and clicks on map.
          // At this stage, since that features needs to be selected, template picker should be cleared which
          // is needed for de-activating select tool.
          this._copyFeaturesObj.cancelBtnClicked();
          if (this.templatePicker) {
            this._clearTemplateSelection();
          }
        }
        if (this._byPass && this._byPass === true) {
          this._byPass = false;
          return;
        }
        var hasTemplate = false;
        if (this.templatePicker) {
          hasTemplate = this.templatePicker.getSelected() ? true : false;
        }
        if (!this._attrInspIsCurrentlyDisplayed &&
          evt.mapPoint &&
          hasTemplate === false) {
          //to resolve gitHub ticket #285 - Cannot click on offset to edit a feature
          if (evt.graphic && evt.graphic.geometry && evt.graphic.geometry.type === "point") {
            evt.mapPoint = new Point(evt.graphic.geometry.toJson());
          }
          this._processOnMapClick(evt);
        }
      },
      _attachmentsComplete: function (featureLayer, oid, deferred) {
        return function (results) {
          var errorMsg = "";
          array.forEach(results, function (result) {
            if (result) {
              if (result.state === "rejected") {
                if (result.error && esriLang.isDefined(result.error.code)) {
                  if (result.error.code === 400) {
                    // 400 is returned for unsupported attachment file types
                    errorMsg = errorMsg +
                      esriBundle.widgets.attachmentEditor.NLS_fileNotSupported + "<br/>";
                  } else {
                    errorMsg = errorMsg + result.error.message ||
                      (result.error.details &&
                        result.error.details.length &&
                        result.error.details[0]) + "<br/>";
                  }

                }
              }
            }
          }, this);
          if (errorMsg !== "") {
            var dialog = new Popup({
              titleLabel: this.nls.attachmentLoadingError,
              width: 400,
              maxHeight: 200,
              autoHeight: true,
              content: errorMsg,
              buttons: [{
                label: this.nls.back,
                classNames: ['jimu-btn'],
                onClick: lang.hitch(this, function () {
                  dialog.close();
                })
              }],
              onClose: lang.hitch(this, function () {

              })
            });
          }
          return this._completePost(featureLayer, oid, deferred);
        };

      },
      _selectComplete: function (featureLayer, deferred) {
        return function () {
          this._removeLocalLayers();
          this.currentFeature = null;
          this._showTemplate(false);
          deferred.resolve("success");
        };
      },
      _completePost: function (featureLayer, oid, deferred) {
        this._createAttributeInspector([this.currentLayerInfo]);
        var query = new Query();
        query.objectIds = [oid];
        featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW,
          lang.hitch(this, this._selectComplete(featureLayer, deferred)),
          lang.hitch(this, function () {
            deferred.resolve("failed");
          })
        );
      },
      // posts the currentFeature's changes
      _postChanges: function (feature) {

        var deferred = new Deferred();

        var result = this._changed_feature(feature, false);
        var returnFeature = result[0];
        var layerId = result[1];
        var type = result[2];
        var layer = null;
        var postDef = null;
        if (returnFeature === null) {
          deferred.resolve("success");
        }
        else if (type === "Add") {
          if (this._traversal.length > 1) {
            this.addNewRelatedRecord = true;
          }
          //Get layer or table info as now user can update related records/features
          layer = this._jimuLayerInfos.getLayerOrTableInfoById(layerId).layerObject;
          postDef = layer.applyEdits([returnFeature], null, null);
          this.addDeferred(postDef, returnFeature, layer, deferred);
        }
        else {
          //Get layer or table info as now user can update related records/features
          layer = this._jimuLayerInfos.getLayerOrTableInfoById(layerId).layerObject;
          if (Object.keys(returnFeature.attributes).length === 0 &&
            returnFeature.geometry === null) {
            deferred.resolve("success");
          }
          else if (Object.keys(returnFeature.attributes).length === 1 &&
            returnFeature.attributes.hasOwnProperty(layer.objectIdField) &&
            returnFeature.geometry === null) {
            //check to see if the only field is the OID, if so, skip saving
            deferred.resolve("success");
          }
          else {
            postDef = layer.applyEdits(null, [returnFeature], null);
            this.addDeferred(postDef, returnFeature, layer, deferred);
          }
        }
        return deferred.promise;
      },
      _changed_feature: function (feature, removeOIDField) {
        var returnFeature = null;
        var type = null;
        var featureLayer = null;
        var featureLayerId = null;
        removeOIDField = removeOIDField || false;
        var ruleInfo;
        var k = null;
        if (feature) {
          returnFeature = new Graphic(null, null, JSON.parse(JSON.stringify(feature.attributes)));

          if (this._smartAttributes !== undefined && this._smartAttributes !== null) {
            for (k in returnFeature.attributes) {
              if (returnFeature.attributes.hasOwnProperty(k) === true) {
                ruleInfo = this._smartAttributes.validateField(k);
                if (ruleInfo[1] === 'Hide' && ruleInfo[3] !== true) {
                  delete returnFeature.attributes[k];
                }
              }
            }
          }
          for (k in returnFeature.attributes) {
            if (returnFeature.attributes.hasOwnProperty(k) === true) {
              if (returnFeature.attributes[k] === "") {
                returnFeature.attributes[k] = null;
              }
            }
          }
          if (this._attributeInspectorTools) {
            returnFeature.attributes = this._attributeInspectorTools._checkFeatureData(returnFeature.attributes);
            if (feature.preEditAttrs) {
              returnFeature.preEditAttrs =
                this._attributeInspectorTools._checkFeatureData(JSON.parse(JSON.stringify(feature.preEditAttrs)));
            }
          }
          else {
            if (feature.preEditAttrs) {
              returnFeature.preEditAttrs = JSON.parse(JSON.stringify(feature.preEditAttrs));//lang.clone(feature.preEditAttrs);
            }
          }
          if (feature.getLayer().originalLayerId) {
            // added feature
            //featureLayer = this.map.getLayer(feature.getLayer().originalLayerId);
            //Get layer or table info as now user can update related records/features
            featureLayer = this._jimuLayerInfos.getLayerOrTableInfoById(feature.getLayer().originalLayerId).layerObject;
            if (featureLayer) {
              returnFeature.geometry = feature.geometry;
              returnFeature.symbol = null;
              type = "Add";
              removeOIDField = true;

            } // if featureLayer not null
          } else {
            // update existing feature
            // only get the updated attributes

            if (this.geometryChanged !== undefined &&
              this.geometryChanged !== null &&
              this.geometryChanged === true) {
              returnFeature.geometry = feature.geometry;
            }

            featureLayer = feature.getLayer();

            var newAttrs = editUtils.filterOnlyUpdatedAttributes(
              returnFeature.attributes, returnFeature.preEditAttrs, featureLayer);

            if (newAttrs && !editUtils.isObjectEmpty(newAttrs)) {
              // there are changes in attributes
              returnFeature.attributes = newAttrs;
            } else {
              returnFeature.attributes = [];
            }
            returnFeature.symbol = null;
            type = "Update";
          }
          featureLayerId = featureLayer.id;
          if (returnFeature && removeOIDField) {
            if (returnFeature.attributes.hasOwnProperty(featureLayer.objectIdField)) {
              delete returnFeature.attributes[featureLayer.objectIdField];
            }
          }

          if (featureLayer.globalIdField && returnFeature.attributes.hasOwnProperty(featureLayer.globalIdField)) {
            delete returnFeature.attributes[featureLayer.globalIdField];
          }
          if (featureLayer.editFieldsInfo) {
            for (k in featureLayer.editFieldsInfo) {
              if (featureLayer.editFieldsInfo.hasOwnProperty(k)) {
                if (returnFeature.attributes.hasOwnProperty(featureLayer.editFieldsInfo[k])) {
                  delete returnFeature.attributes[featureLayer.editFieldsInfo[k]];
                }
              }
            }
          }

        }

        return [returnFeature, featureLayerId, type];
      },

      // function written for customised error message in case of unique field value.
      getUniqueFieldErrorMsg: function (errorStr) {
        var fieldNameInStr = "", fieldNameValue = "", fieldNameInfoObj = {},
          uniqueIndexSplitArray = errorStr.split("with unique index '"),
            duplicateKeySplitArray = errorStr.split("duplicate key value is (");
        if (uniqueIndexSplitArray.length >= 2) {
          fieldNameInStr = uniqueIndexSplitArray[1].split(".")[0].split("_Index")[0];
        }
        if (duplicateKeySplitArray.length >= 2) {
          fieldNameValue = duplicateKeySplitArray[1].split(")")[0];
        }
        fieldNameInfoObj =
        presetUtils.getFieldInfoByFieldName(this.attrInspector._currentLInfo.fieldInfos, fieldNameInStr);
        //Implemented https://github.com/ArcGIS/solutions-widget-smart-editor/issues/462#issuecomment-689001256
        if(fieldNameInfoObj.type === "esriFieldTypeDate") {
          if(fieldNameValue.indexOf('.'>-1)){
            fieldNameValue = fieldNameValue.split('.')[0];
          }
        }
        return String.substitute(this.nls.uniqueValueErrorMessage, {
          fieldName: fieldNameInfoObj.label || fieldNameInfoObj.name || ""
        });
      },
      addDeferred: function (postDef, feature, featureLayer, deferred) {
        postDef.then(lang.hitch(this, function (added, updated) {
          var errorMsg;
          // sometimes a successfully update returns an empty array
          if (updated && updated.length > 0 && updated[0].hasOwnProperty("error")) {
            errorMsg = updated[0].error.toString();
            if(errorMsg.toLowerCase().indexOf("cannot insert duplicate key row") !== -1){
              errorMsg = this.getUniqueFieldErrorMsg(errorMsg);
            }
            Message({
              message: errorMsg
            });
            deferred.resolve("failed");
          }
          else if (updated && updated.length > 0) {
            feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
            featureLayer.refresh();
            this.geometryChanged = false;
            deferred.resolve("success");
          }
          else if (added && added.length > 0 && added[0].hasOwnProperty("error")) {
            errorMsg = added[0].error.toString();
            if(errorMsg.toLowerCase().indexOf("cannot insert duplicate key row") !== -1){
              errorMsg = this.getUniqueFieldErrorMsg(errorMsg);
            }
            Message({
              message: errorMsg
            });
            deferred.resolve("failed");
          }
          else if (added && added.length > 0) {
            feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
            var defs = null;
            if (this.attrInspector._attachmentUploader) {
              defs = this.attrInspector._attachmentUploader.postAttachments(featureLayer, added[0].objectId);
            }
            if (defs === undefined || defs === null || defs.length === 0) {
              if (this.addNewRelatedRecord) {
                deferred.resolve("success");
              } else {
                this._completePost(featureLayer, added[0].objectId, deferred);
              }
            }
            else {
              all(defs).then(lang.hitch(this,
                this._attachmentsComplete(featureLayer, added[0].objectId, deferred)));
            }
          }
        }), lang.hitch(this, function (err) {
          Message({
            message: err.message.toString() + "\n" + err.details
          });
          deferred.resolve("failed");
        }));
      },

      _processOnMapClick: function (evt) {
        // viewing/editing existing features
        // The logic of adding new feature to local layer is handled
        // in the draw end event of the draw tool
        var featuresSelectionTolerance;
        featuresSelectionTolerance = this.config.editor.hasOwnProperty("featuresSelectionTolerance") ?
          this.config.editor.featuresSelectionTolerance : 20;
        this.map.infoWindow.hide();
        //Destroy all prev attributeInspectors
        array.forEach(this._attributeInspectorCollection, function (attributeInspector) {
          attributeInspector.destroy();
        });
        //reset array
        this._traversal = [];
        this._nodesCollection = [];
        this._paginationNodeCollection = [];
        this._buttonsWrapper = [];
        this._attributeInspectorCollection = [];
        this._relatedTablesInfo = {};

        // recreate the attr inspector if needed
        this._createAttributeInspector(this.config.editor.configInfos);

        var layers = this.map.getLayersVisibleAtScale().filter(lang.hitch(this, function (lyr) {
          if (lyr.type && lyr.type === "Feature Layer" && lyr.url) {
            return array.some(this.config.editor.configInfos, lang.hitch(this, function (configInfo) {
              if (configInfo.layerId === lyr.id &&
                this._hasAnyEditableLayerInRelation([configInfo])) {
                return true;
              }
              else {
                return false;
              }
            }));
          }
          else {
            return false;
          }
        }));
        //remove no visible layers, for some reason the function above returns true
        layers = layers.filter(lang.hitch(this, function (lyr) {
          try {
            return this.map.getLayer(lyr.id).visible;
          }
          catch (ex) {
            console.log(ex + " Check for visible failed");
            return true;
          }
        }));
        var updateFeatures = [];
        var deferreds = [];
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
        array.forEach(layers, lang.hitch(this, function (layer) {
          // set selection symbol
          layer.setSelectionSymbol(this._getSelectionSymbol(layer.geometryType, false));
          var selectQuery = new Query();
          selectQuery.geometry = editUtils.pointToExtent(this.map, evt.mapPoint, featuresSelectionTolerance);
          var deferred = layer.selectFeatures(selectQuery,
            FeatureLayer.SELECTION_NEW,
            lang.hitch(this, function (features) {
              var OIDsToRemove = [];
              var validFeatures = [];
              array.forEach(features, function (feature) {
                var featureValid = true;
                feature.allowDelete = true;
                //if (layer.hasOwnProperty("ownershipBasedAccessControlForFeatures") &&
                //  layer.ownershipBasedAccessControlForFeatures) {
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToUpdate")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToUpdate === false && this._user) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== this._user) {
                //        OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //        featureValid = false;
                //      }
                //    }
                //  }
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToUpdate") &&
                //    layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToUpdate")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToUpdate === false &&
                //      layer.ownershipBasedAccessControlForFeatures.allowAnonymousToUpdate === true &&
                //      this._user === null) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== null &&
                //         feature.attributes[layer.editFieldsInfo.creatorField] !== "") {
                //        OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //        featureValid = false;
                //      }
                //    }
                //  }
                //  else if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToUpdate")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowAnonymousToUpdate === false &&
                //      this._user === null) {
                //      OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //      featureValid = false;
                //    }
                //  }
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToDelete")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToDelete === false &&
                //      this._user) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== this._user) {
                //        feature.allowDelete = false;
                //      }
                //    }
                //  }
                //  if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowOthersToDelete") &&
                //  layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToDelete")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowOthersToDelete === false &&
                //      layer.ownershipBasedAccessControlForFeatures.allowAnonymousToDelete === true &&
                //      this._user === null) {
                //      if (feature.attributes[layer.editFieldsInfo.creatorField] !== null &&
                //          feature.attributes[layer.editFieldsInfo.creatorField] !== "") {
                //        OIDsToRemove.push(feature.attributes[layer.objectIdField]);
                //        featureValid = false;
                //      }
                //    }
                //  }
                //  else if (layer.ownershipBasedAccessControlForFeatures.hasOwnProperty("allowAnonymousToDelete")) {
                //    if (layer.ownershipBasedAccessControlForFeatures.allowAnonymousToDelete === false &&
                //      this._user === null) {
                //      feature.allowDelete = false;
                //    }
                //  }
                //}

                //The below is the preferred way, but this fails on public services and the user is logged in

                if (!layer.getEditCapabilities({ feature: feature }).canDelete) {
                  feature.allowDelete = false;
                }
                if (featureValid === true) {
                  feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
                  validFeatures.push(feature);
                }
              }, this);
              if (OIDsToRemove.length > 0) {
                var subQuery = new Query();
                subQuery.objectIds = OIDsToRemove;
                var subDef = layer.selectFeatures(subQuery, FeatureLayer.SELECTION_SUBTRACT,
                  lang.hitch(this, function (features) {
                    console.log(features.length);
                  }));
                deferreds.push(subDef);
              }
              updateFeatures = updateFeatures.concat(validFeatures);

            }));
          deferreds.push(deferred);
        }));
        if (deferreds.length === 0) {
          this._byPass = true;
          this.map.popupManager._showPopup(evt);
          this._byPass = false;
        }
        else {
          all(deferreds).then(lang.hitch(this, function () {
            this.updateFeatures = updateFeatures;
            if (this.updateFeatures.length > 0) {
              this._showTemplate(false);
            }
            else {
              this._byPass = true;
              this.map.popupManager._showPopup(evt);
              this._byPass = false;
            }
          }));
        }

      },
      _attachLayerHandler: function () {
        /*
        //CT - Commented the code as it was clearing parent features selection when moving to related feature
        if (this.layerHandle) {
          this.layerHandle.remove();
        }
        this.layerHandle = on(this.currentFeature._layer, 'selection-clear',
          lang.hitch(this, this._layerChangeOutside));
        this.own(this.layerHandle);
        */

        this._eventHandler = this.own(on(this.currentFeature._layer, "visibility-change", lang.hitch(this, function () {
          /*
          setTimeout(lang.hitch(this, function () {
            var cancelBtn = query(".cancelButton")[0];
            if (!cancelBtn) {
              //do nothing
            } else {
              on.emit(cancelBtn, 'click', { cancelable: true, bubbles: true });
            }
          }), 100);
          */
        })));
      },

      _removeLayerVisibleHandler: function () {
        if (this._eventHandler !== null) {
          array.forEach(this._eventHandler, lang.hitch(this, function (evt) {
            if (typeof evt.remove === "function") {
              evt.remove();
            }
          }));
          this._eventHandler = null;
        }
      },

      _postFeatureSave: function (evt) {
        if (this.updateFeatures && this.updateFeatures.length > 1) {
          array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
            feature.setSymbol(this._getSelectionSymbol(feature.getLayer().geometryType, false));
          }));
        }
        if (evt && evt.feature) {
          this.geometryChanged = false;
          this.currentFeature = evt.feature;
          this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
          this._attachLayerHandler();
          this.currentLayerInfo = this._getLayerInfoByID(this.currentFeature._layer.id);
          this.currentLayerInfo.isCache = false;
          this._createSmartAttributes();
          this._createAttributeInspectorTools();
          this._attributeInspectorTools.triggerFormValidation();
          this._validateAttributes();
          this._enableAttrInspectorSaveButton(false);
          if (this.currentFeature.hasOwnProperty("allowDelete")) {
            this._toggleDeleteButton(this.currentFeature.allowDelete && this.currentLayerInfo.allowDelete);
          }
          else {
            this._toggleDeleteButton(this.currentLayerInfo.allowDelete);
          }
          this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
            !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate ||
            (this.currentLayerInfo.featureLayer.hasZ && !this.currentLayerInfo.featureLayer.enableZDefaults) ||
            (this.currentLayerInfo.featureLayer.hasM && !this.currentLayerInfo.featureLayer.allowUpdateWithoutMValues));
          this.currentFeature.setSymbol(
            this._getSelectionSymbol(evt.feature.getLayer().geometryType, true));
          //this.getConfigDefaults();
        }

      },

      _promptToDelete: function () {

        var dialog = new Popup({
          titleLabel: this.nls.deletePromptTitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: this.nls.deletePrompt,
          buttons: [{
            label: this.nls.yes,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              this._deleteFeature();
              dialog.close();

            })
          }, {
            label: this.nls.no,
            classNames: ['jimu-btn'],

            onClick: lang.hitch(this, function () {

              dialog.close();

            })
          }

          ],
          onClose: lang.hitch(this, function () {

          })
        });
      },
      _promptToResolvePendingEdit: function (switchToTemplate, evt, showClose, skipPostEvent) {
        skipPostEvent = skipPostEvent || false;
        var disable = !this._validateAttributes();
        var tabindex = disable ? -1 : 0;
        var pendingEditsDef = new Deferred();
        var buttons = [{
          label: this.nls.yes,
          classNames: ['jimu-btn'],
          disable: disable,
          onClick: lang.hitch(this, function () {
            this._saveEdit(this.currentFeature, switchToTemplate, true).then(lang.hitch(this, function () {
              if (evt !== null && evt !== undefined) {
                if (evt.hasOwnProperty('featureLayer') && evt.hasOwnProperty('feature')) {
                  this.load_from_featureaction(evt.featureLayer, evt.feature);
                }
                else {
                  this._postFeatureSave(evt);
                }
              }
              pendingEditsDef.resolve("yes");
            }));
            dialog.close();
          })
        }, {
          label: this.nls.no,
          classNames: ['jimu-btn'],

          onClick: lang.hitch(this, function () {
            this._cancelEditingFeature(switchToTemplate);
            if (evt !== null && evt !== undefined) {
              if (evt.hasOwnProperty('featureLayer') && evt.hasOwnProperty('feature')) {
                this.load_from_featureaction(evt.featureLayer, evt.feature);
              }
              else {
                this._postFeatureSave(evt);
              }
            }
            dialog.close();
            pendingEditsDef.resolve("no");
          })
        }];
        if (showClose && showClose === true) {
          buttons.push({
            label: this.nls.back,
            classNames: ['jimu-btn'],
            onClick: lang.hitch(this, function () {
              pendingEditsDef.reject();
              dialog.close();
            })
          });
        }

        var dialog = new Popup({
          titleLabel: this.nls.savePromptTitle,
          width: 400,
          maxHeight: 200,
          autoHeight: true,
          content: this.nls.savePrompt,
          buttons: buttons,
          onClose: lang.hitch(this, function () {

          })
        });
        domAttr.set(dialog.disabledButtons[0], "tabindex" , tabindex);
        return pendingEditsDef.promise;
      },

      _removeLocalLayers: function () {
        if (this.cacheLayer && this.cacheLayer !== null) {
          this.cacheLayer.clearSelection();
          this.cacheLayer.clear();
          this.map.removeLayer(this.cacheLayer);
          this.cacheLayer = null;
        }
        this.updateFeatures = [];
        //var mymap = this.map;
        //if (mymap) {
        //  var filteredID = mymap.graphicsLayerIds.filter(function (e) {
        //    return e.lastIndexOf("_lfl") > 0;
        //  });
        //  var mappedArr = array.map(filteredID, function (e) {
        //    return mymap.getLayer(e);
        //  });
        //  array.forEach(mappedArr, function (e) {
        //    mymap.removeLayer(e);
        //  });

        //  this.updateFeatures = [];
        //}
      },

      _removeSpacesInLayerTemplates: function (layer) {
        if (!layer) { return; }

        var filteredFields = array.filter(layer.fields, lang.hitch(this, function (field) {
          return field.nullable === false && field.editable === true;
        }));
        array.forEach(filteredFields, lang.hitch(this, function (f) {
          // trim of space in the field value
          array.forEach(layer.templates, function (t) {
            if (t.prototype.attributes[f.name] === " ") {
              t.prototype.attributes[f.name] = t.prototype.attributes[f.name].trim();
            }
          });
        }));
      },

      _resetEditingVariables: function () {
        this._editingEnabled = false;
        if (this.editToolbar) {
          if (this.editToolbar.getCurrentState().tool !== 0) {
            this.editToolbar.deactivate();
          }
        }
        //this._turnEditGeometryToggleOff();
      },
      _feature_removed: function (feature, curidx) {
        return function () {
          if (this.attrInspector._featureIdx >= curidx && curidx !== 0) {
            //Clear the current feature as it is saved and has been removed.  This prevents the double save dialog.
            this.currentFeature = null;
            this.attrInspector.previous();
          }
          this.updateFeatures.splice(this.updateFeatures.indexOf(feature), 1);
          //update symbol of prev selected feature
          this.currentFeature.setSymbol(this._getSelectionSymbol(
            this.currentFeature.getLayer().geometryType, false));
          //update current feature instance
          this.currentFeature = this.attrInspector._currentFeature;
          //If layer is visible and edit geometry flag is set to true
          //update the current feature and highlight the selection on the map
          if (this.currentLayerInfo.featureLayer.visibleAtMapScale &&
            this.config.editor.hasOwnProperty("editGeometryDefault") &&
            this.config.editor.editGeometryDefault === true && this.attrInspector._currentFeature) {
            setTimeout(lang.hitch(this, function () {
              if (this._traversal.length < 2) {
                this._editGeomSwitch.set('checked', true);
                this._editGeomSwitch.check();
              }
            }), 100);
          }
          //update the current selected features highlight symbol
          this.currentFeature.setSymbol(this._getSelectionSymbol(
            this.currentFeature.getLayer().geometryType, true));
          //bypass moving to the next record if the user click next and was prompted to save
          //Refresh layer title once the current feature is removed from the AI
          this._refreshLayerTitle();
        };
      },
      // perform validation then post the changes or formatting the UI if errors
      // no confirm dialog involved
      _saveEdit: function (feature, switchToTemplate, attInspectRecordOptions) {
        attInspectRecordOptions = attInspectRecordOptions || 'next';
        var deferred = new Deferred();
        // disable the save button even if the saving is done
        this._enableAttrInspectorSaveButton(false);
        //Check the config value for edit geometry switch and
        //accordingly turn on/off the switch after the save button is clicked
        if (!this.config.editor.editGeometryDefault) {
          this._turnEditGeometryToggleOff();
        }
        if (this._validateAttributes()) {
          var processIndicators = query(".processing-indicator");
          var processIndicatorsPanel = query(".processing-indicator-panel");
          var saveBtn = query(".saveButton", this.buttonHeader)[0];
          array.forEach(processIndicators, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          array.forEach(processIndicatorsPanel, function (processIndicator) {
            if (!domClass.contains(processIndicator, "busy")) {
              domClass.add(processIndicator, "busy");
            }
          });
          if (saveBtn && !domClass.contains(saveBtn, "hide")) {
            domClass.add(saveBtn, "hide");
          }
          // call applyEdit
          this._postChanges(feature).then(lang.hitch(this, function (e) {
            var addingRelatedRecord = false;
            if (e === "failed") {
              deferred.resolve("failed");
              this.addNewRelatedRecord = false;
            }
            else {
              if (this.addNewRelatedRecord) {
                addingRelatedRecord = true;
                this.attrInspector.destroy();
                domConstruct.destroy(this.contentWrapper);
                domConstruct.destroy(this.buttonHeader);
                domConstruct.destroy(this.navButtonsDiv);
                this.attrInspector = this._attributeInspectorCollection.pop();
                domStyle.set(this.attrInspector.attributeTable, "display", "block");
                domStyle.set(this.attrInspector.editButtons, "display", "block");
                domStyle.set(this.attrInspector.deleteBtn.domNode, "display", "none");
                this.attrInspector._featureIdx = this.attrInspector.ctStoredFeatureIndex;
                this.attrInspector.refresh();
                setTimeout(lang.hitch(this, function () {
                  domStyle.set(this.attrInspector.navButtons, "display",
                    (!this.attrInspector._hideNavButtons && (this.attrInspector._numFeatures > 1) ? "" : "none"));
                  this.attrInspector.navMessage.innerHTML = esriLang.substitute({
                    idx: this.attrInspector._featureIdx + 1,
                    of: this.attrInspector.NLS_of,
                    numFeatures: this.attrInspector._numFeatures
                  }, this.attrInspector._navMessage);
                  this.currentFeature = this.attrInspector._numFeatures ?
                    this.attrInspector._selection[this.attrInspector._featureIdx] : null;
                  if (this.currentFeature && this.currentFeature.attributes) {
                    this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
                  }
                }), 200);
                this.contentWrapper = this._nodesCollection.pop();
                this.buttonHeader = this._buttonsWrapper.pop();
                //Nedd to get the previous navigation instance as we are now
                //always creating the navigtion buttons
                this.navButtonsDiv = this._paginationNodeCollection.pop();
                this._traversal.pop();
                //If the related feature count is 0, change it to 1 as new record is added
                //This will trigger the further process automatically
                if (this.currentRelatedDom) {
                  var relatedRecordCount = domAttr.get(this.currentRelatedDom, "relatedRecordCount");
                  if ((relatedRecordCount && parseInt(relatedRecordCount, 10) === 0)) {
                    domAttr.set(this.currentRelatedDom, "relatedRecordCount", 1);
                  }
                }
                this.currentRelatedDom.click();
              }
              if (this.currentFeature && this.currentFeature.attributes) {
                this.currentFeature.preEditAttrs = JSON.parse(JSON.stringify(this.currentFeature.attributes));
              }
              if (this._relatedTablesInfo[feature._layer.id]) {
                this._relatedTablesInfo[feature._layer.id].updateFeatureInstance(feature.attributes);
              }
              // if currently only one selected feature
              //also this is not related feature
              if (this.config.editor.removeOnSave && this.updateFeatures.length <= 1 &&
                this._traversal.length <= 1 && !addingRelatedRecord) {
                switchToTemplate = true;
              }
              if (switchToTemplate && switchToTemplate === true) {
                this._showTemplate(true);
              } else if (this.config.editor.removeOnSave && this.updateFeatures.length <= 1 &&
                this._traversal.length > 1) {
                //when saving related tables/layers details and only one record and remove on save is true
                //go back to parent features details after save
                on.emit(this.cancelButton, 'click', { cancelable: true, bubbles: true });
              } else {
                this._resetEditingVariables();
                this.map.setInfoWindowOnClick(true);
                if (this.config.editor.removeOnSave === true && !addingRelatedRecord) {
                  var layer = feature.getLayer();
                  // perform a new query
                  var query = new Query();
                  query.objectIds = [feature.attributes[layer.objectIdField]];
                  var curidx = this.attrInspector._selection.indexOf(feature);
                  layer.selectFeatures(query, FeatureLayer.SELECTION_SUBTRACT,
                    lang.hitch(this, this._feature_removed(feature, curidx)));
                } else {
                  // reselect the feature
                  if (this.currentFeature && this.currentFeature.hasOwnProperty("allowDelete")) {
                    this._toggleDeleteButton(this.currentFeature.allowDelete &&
                      this.currentLayerInfo.allowDelete);
                  }
                  else {
                    this._toggleDeleteButton(this.currentLayerInfo.allowDelete &&
                      this.currentLayerInfo.configFeatureLayer.layerAllowsDelete);
                  }
                  this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
                    !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate ||
                    (this.currentLayerInfo.featureLayer.hasZ && !this.currentLayerInfo.featureLayer.enableZDefaults) ||
                    (this.currentLayerInfo.featureLayer.hasM && !this.currentLayerInfo.featureLayer.allowUpdateWithoutMValues));

                  if (this.currentLayerInfo.featureLayer.visibleAtMapScale &&
                    this.config.editor.hasOwnProperty("editGeometryDefault") &&
                    this.config.editor.editGeometryDefault === true) {
                    //perform any edit geom switch functionality
                    //only when working with main layers feature and not on related features
                    setTimeout(lang.hitch(this, function () {
                      if (this._traversal.length < 2) {
                        this._editGeomSwitch.set('checked', true);
                        this._editGeomSwitch.check();
                      }
                    }), 100);
                  }
                  feature.setSymbol(this._getSelectionSymbol(
                    feature.getLayer().geometryType, true));
                }
              }
              deferred.resolve("success");
              if ((this.config.editor.removeOnSave && this.attrInspector._numFeatures === 0) ||
                switchToTemplate) {
                this._setWidgetFirstFocusNode("templatePicker", true);
              } else {
                this._setWidgetFirstFocusNode("AI", true);
              }
            }
            array.forEach(processIndicators, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            array.forEach(processIndicatorsPanel, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            if (domClass.contains(saveBtn, "hide")) {
              domClass.remove(saveBtn, "hide");
            }
          }), lang.hitch(this, function () {
            array.forEach(processIndicators, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            array.forEach(processIndicatorsPanel, function (processIndicator) {
              if (domClass.contains(processIndicator, "busy")) {
                domClass.remove(processIndicator, "busy");
              }
            });
            if (domClass.contains(saveBtn, "hide")) {
              domClass.remove(saveBtn, "hide");
            }
            //deferred.resolve("failed");
          }));
        }
        //else
        //{
        //  this._formatErrorFields(errorObj);

        //  deferred.resolve("failed");
        //}
        return deferred.promise;
      },

      _showTemplate: function (showTemplate) {
        this._attrInspIsCurrentlyDisplayed = !showTemplate;
        if (showTemplate) {
          this._mapClickHandler(true);
          this._showTemplatePicker();
          //reset array
          this._traversal = [];
          this._nodesCollection = [];
          this._paginationNodeCollection = [];
          this._buttonsWrapper = [];
          this._attributeInspectorCollection = [];
          this._relatedTablesInfo = {};
          this.currentFeature = null;
          this.geometryChanged = false;
          this.currentLayerInfo = null;

          // esriBundle.widgets.attachmentEditor.NLS_attachments = this._orignls;
        } else {
          //esriBundle.widgets.attachmentEditor.NLS_attachments = this._orignls + " " + this.nls.attachmentSaveDeleteWarning;
          this._mapClickHandler(false);
          //show attribute inspector
          query(".jimu-widget-smartEditor .templatePickerMainDiv")[0].style.display = "none";
          query(".jimu-widget-smartEditor .attributeInspectorMainDiv")[0].style.display = "block";
          domStyle.set(this.noFeatureWarningMessage, "display", "none");

          if (this.attrInspector) {

            if (!this.currentFeature && this.attrInspector && this.attrInspector._numFeatures > 0) {
              this.attrInspector.first();
            }
            this.attrInspector.refresh();
            this._createSmartAttributes();
            this._createAttributeInspectorTools();
            this._attributeInspectorTools.triggerFormValidation();
            //this._sytleFields(this.attrInspector);
            if (this.currentFeature && this.currentFeature.getLayer().originalLayerId) {
              this._enableAttrInspectorSaveButton(this._validateAttributes());
            } else {
              this._validateAttributes(false);
              this._enableAttrInspectorSaveButton(false);
            }
            if (this.currentLayerInfo.isCache && this.currentLayerInfo.isCache === true) {
              this._toggleEditGeoSwitch(false);
            }
            else {
              this._toggleEditGeoSwitch(this.currentLayerInfo.disableGeometryUpdate ||
                !this.currentLayerInfo.configFeatureLayer.layerAllowsUpdate ||
                (this.currentLayerInfo.featureLayer.hasZ && !this.currentLayerInfo.featureLayer.enableZDefaults) ||
                (this.currentLayerInfo.featureLayer.hasM && !this.currentLayerInfo.featureLayer.allowUpdateWithoutMValues));
            }
            this._addWarning();
            this._setWidgetFirstFocusNode("AI", true);
          }
          this._recordLoadeAttInspector();
        }


      },
      _createAttributeInspectorTools: function () {
        if (this.currentFeature === undefined || this.currentFeature === null) {
          return;
        }
        var attTable = query("td.atiLabel", this.attrInspector.domNode);
        if (attTable === undefined || attTable === null) {
          return;
        }
        var attributeInspectorToolsParams = {
          _attrInspector: this.attrInspector,
          _feature: this.currentFeature,
          _fieldInfo: this.currentLayerInfo.fieldInfos
        };
        this._attributeInspectorTools = new attributeInspectorTools(attributeInspectorToolsParams);

      },
      _createSmartAttributes: function () {
        if (this.currentFeature === undefined || this.currentFeature === null) {
          return;
        }
        var attTable = query("td.atiLabel", this.attrInspector.domNode);
        if (attTable === undefined || attTable === null) {
          return;
        }
        var fieldValidation = null;
        if (this.currentLayerInfo !== undefined && this.currentLayerInfo !== null) {
          if (this.currentLayerInfo.fieldValidations !== undefined &&
            this.currentLayerInfo.fieldValidations !== null) {
            fieldValidation = this.currentLayerInfo.fieldValidations;
          }
        }
        if (fieldValidation === null) {
          return;
        }

        var smartAttParams = {
          _attrInspector: this.attrInspector,
          _fieldValidation: fieldValidation,
          _feature: this.currentFeature,
          _fieldInfo: this.currentLayerInfo.fieldInfos,
          _url: this.currentLayerInfo.featureLayer.url
        };
        this._smartAttributes = new smartAttributes(smartAttParams);
        this.own(on(this._smartAttributes, "onFieldToggle", lang.hitch(this,
          function () {
            this._add508SupportToAttachmentsDeleteBtn("AI");
          })));
      },
      _showTemplatePicker: function () {

        // hide the attr inspector and show the main template picker div
        query(".jimu-widget-smartEditor .attributeInspectorMainDiv")[0].style.display = "none";
        query(".jimu-widget-smartEditor .templatePickerMainDiv")[0].style.display = "block";


        if (this.templatePicker) {
          var persistIndexValue = 0;  //so it doesn't reset to zero like _selectTemplateIndex when setting doesn't hold template
          if (this.templatePicker._selectedInfo && this.templatePicker._selectedInfo.hasOwnProperty("selRow")) {
            persistIndexValue = (this.templatePicker._selectedInfo.selRow > 0)?this.templatePicker._selectedInfo.selRow - 1:this.templatePicker._selectedInfo.selRow;
          }
          if (this.config.editor.hasOwnProperty("keepTemplateSelected")) {
            if (this.config.editor.keepTemplateSelected !== true) {
              this._clearTemplateSelection();
            }
          } else {
            this._clearTemplateSelection();
          }
          if (this.templatePicker) {
            var override = null;
            if (this.drawingTool && this.currentDrawType) {
              override = this.currentDrawType;
            }
            this._activateTemplateToolbar(override);
            /*since the template picker loses the row and selected template on cancel,
              the below code gets the current selected template, and row, then updates template picker
              and then tries to scroll to row (it lazy loads so it's not always accurate).
              Then it locates the template and fakes a click to get back the selection.
            */
           var currentRow = persistIndexValue;
           var selectedinfo = null;
           var selected = null;
           if (this.templatePicker._selectedInfo && this.templatePicker._selectedInfo.hasOwnProperty("selRow")) {
             selectedinfo = this.templatePicker._selectedInfo;
             currentRow = (this.templatePicker._selectedInfo.selRow > 0)?this.templatePicker._selectedInfo.selRow - 1:this.templatePicker._selectedInfo.selRow;
             selected = this.templatePicker.getSelected();
             this._selectTemplateIndex = currentRow;
           }
           this.templatePicker.update();
           this.templatePicker.grid.scrollToRow(currentRow);
           setTimeout(lang.hitch(this, function() {

              if (selected !== null && this.templatePicker) {
               this.templatePicker.grid.store.fetch({
                 onComplete: lang.hitch(this, function(its) {
                   var found = this.templatePicker._locate(selected, selectedinfo, its);
                   var cellNode = found && this.templatePicker.grid.views.views[0].getCellNode(found[0], found[1]);
                   if (cellNode) {
                     /* fake a row click event to restore the selection
                       rows before lazy load maintain their selection, so only fake the click when it pass this point otherwise it toggles it off.
                       Don't know the threshold but used rowsPerPage property as the point to call fake click.
                     */
                     if(this._selectTemplateIndex > (this.templatePicker.grid.rowsPerPage)) {
                       this.templatePicker._rowClicked({ cellNode: cellNode, rowIndex: found[0], cellIndex: found[1] }, true);
                     }
                     this.templatePicker.grid.scrollToRow(currentRow);
                   }

                 })
               });
             }
           }),500);
          }
        }
        this._resetEditingVariables();

        var layersRefresh = [];
        if (this.updateFeatures) {
          array.forEach(this.updateFeatures, lang.hitch(this, function (feature) {
            var layer = feature.getLayer();
            if (layersRefresh && layersRefresh.indexOf(layer.id) === -1) {
              layersRefresh.push(layer.id);
              layer.clearSelection();
              layer.refresh();
            }

          }));
        }
        this._clearLayerSelection();
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
        this._removeLocalLayers();
        if (this._recreateOnNextShow === true) {
          this._recreateOnNextShow = false;
          this._createEditor();
        }
        if (this._creationDisabledOnAll) {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "none");
          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "none");
          }
        } else {
          if (this.templatePicker) {
            dojo.style(this.templatePicker.domNode, "display", "block");
          }
          if (this.drawingTool) {
            dojo.style(this.drawingTool.domNode, "display", "block");
          }
        }
        // It is used to reset all the parameters which were activated while dealing with
        // custom select tool option. Resetting parameter like de-activating custom select tool.
        if (this._copyFeaturesObj) {
          this._copyFeaturesObj.cancelBtnClicked();
        }
      },
      _setPresetValue: function () {
        var sw = registry.byId("savePresetValueSwitch");
        this._usePresetValues = sw.checked;
      },
      _toggleUsePresetValues: function (checked) {
        var sw = registry.byId("savePresetValueSwitch");
        // sw.set('checked', checked === null ? !sw.checked : checked);
        // code written to handle checkbox check as checkbox changed to jimu checkbox
        if(checked) {
          sw.check();
        }
        else{
          sw.uncheck();
        }
        this._usePresetValues = sw.checked;
      },
      _turnEditGeometryToggleOff: function () {
        //perform any edit geom switch functionality
        //only when working with main layers feature and not on related features
        if (this._traversal.length > 1) {
          return;
        }
        if (this._editGeomSwitch && this._editGeomSwitch.checked) {
          if (this.editToolbar) {
            if (this.editToolbar.getCurrentState().tool !== 0) {
              this.editToolbar.deactivate();
            }
          }
          this._editingEnabled = false;
          this._ignoreEditGeometryToggle = true;
          this._editGeomSwitch.set("checked", false);
          this._editGeomSwitch.uncheck();
          this.map.setInfoWindowOnClick(true);
          setTimeout(lang.hitch(this, function () {
            this._ignoreEditGeometryToggle = false;
          }), 2);

        }
      },
      _validateFeatureChanged: function () {

        if (this.currentFeature) {

          if (this.geometryChanged !== undefined &&
            this.geometryChanged !== null &&
            this.geometryChanged === true) {
            return true;
          }
          var result = this._changed_feature(this.currentFeature, true);
          var feature = result[0];
          var type = result[2];
          if (feature !== null) {
            if (Object.keys(feature.attributes).length === 0 &&
              type !== "Add") {
              return false;
            }
          }
        }
        return true;
      },
      // todo: modify to feature as input parameter?
      _validateRequiredFields: function () {
        var errorObj = {};

        if (!this.currentFeature) { return errorObj; }

        var layer = this.currentFeature.getLayer();

        var filteredFields = array.filter(layer.fields, lang.hitch(this, function (field) {
          return field.nullable === false && field.editable === true;
        }));

        array.forEach(filteredFields, lang.hitch(this, function (f) {
          //If date field is required, both date and time text box should have valid date
          //If not add error to respective fields and return error
          if (f.type === "esriFieldTypeDate") {
            var currentDijit = this._getCurrentFieldDijit(f.name);
            if (currentDijit && currentDijit.length > 0) {
              if (currentDijit[0].get('value') !== null && currentDijit[0].get("value") !== undefined) {
                //If time is null then show the error on time dijit
                if (currentDijit[1] && currentDijit[1].get('value') === null) {
                  currentDijit[1].set("required", true);
                  var row = query("td[data-fieldname=" + f.name + "]", this.attrInspector.domNode)[0].parentNode;
                  domClass.add(row.childNodes[1].childNodes[1], ["dijitTextBoxError", "dijitError"]);
                  errorObj[f.alias] = "null";
                } else {
                  //If valid time is present, rmeove the error on time dijit
                  var row = query("td[data-fieldname=" + f.name + "]", this.attrInspector.domNode)[0].parentNode;
                  domClass.remove(row.childNodes[1].childNodes[1], ["dijitTextBoxError", "dijitError"]);
                }
              } else {
                errorObj[f.alias] = "null";
              }
            }
          } else if (this.currentFeature.attributes[f.name] === "undefined") {
            errorObj[f.alias] = "undefined";
          }
          else if (this.currentFeature.attributes[f.name] === null) {
            errorObj[f.alias] = "null";
          }
          else {
            switch (f.type) {
              case "esriFieldTypeString":
                if (this.currentFeature.attributes[f.name] === "" ||
                  (this.currentFeature.attributes[f.name] &&
                    this.currentFeature.attributes[f.name].trim() === "")) {
                  errorObj[f.alias] = "Empty string";
                }
                break;
              default:
                break;
            }
          }
        }));
        return errorObj;
      },

      _worksAfterClose: function () {
        // restore the default string of mouse tooltip
        esriBundle.toolbars.draw.start = this._defaultStartStr;
        esriBundle.toolbars.draw.addPoint = this._defaultAddPointStr;

        // show lable layer.
        //var labelLayer = this.map.getLayer("labels");
        //if (labelLayer) {
        //  labelLayer.show();
        //}
      },

      _workBeforeCreate: function () {

        // change string of mouse tooltip
        var additionStr = "<br/>" + "(" + this.nls.pressStr + "<b>" +
          this.nls.ctrlStr + "</b> " + this.nls.snapStr + ")";
        this._defaultStartStr = esriBundle.toolbars.draw.start;
        this._defaultAddPointStr = esriBundle.toolbars.draw.addPoint;
        esriBundle.toolbars.draw.start =
          esriBundle.toolbars.draw.start + additionStr;
        esriBundle.toolbars.draw.addPoint =
          esriBundle.toolbars.draw.addPoint + additionStr;

        // hide label layer.
        //var labelLayer = this.map.getLayer("labels");
        //if (labelLayer) {
        //  labelLayer.hide();
        //}

      },

      _getDefaultFieldInfos: function (layerObject) {
        // summary:
        //  filter webmap fieldInfos.
        // description:
        //   return null if fieldInfos has not been configured in webmap.
        //layerObject = this.map.getLayer(layerInfo.featureLayer.id);
        var fieldInfos = editUtils.getFieldInfosFromWebmap(layerObject.id, this._jimuLayerInfos);//
        if (fieldInfos === undefined || fieldInfos === null) {
          fieldInfos = editUtils.getFieldInfosLayer(layerObject.id, this._jimuLayerInfos);
        }
        if (fieldInfos) {
          fieldInfos = array.filter(fieldInfos, function (fieldInfo) {
            return fieldInfo.visible || fieldInfo.isEditable;
          });
        }
        return fieldInfos;
      },

      _getDefaultLayerInfos: function () {
        var defaultLayerInfos = [];
        var fieldInfos;
        for (var i = this.map.graphicsLayerIds.length - 1; i >= 0; i--) {
          var layerObject = this.map.getLayer(this.map.graphicsLayerIds[i]);
          if (layerObject.type === "Feature Layer" && layerObject.url) {
            var layerInfo = {
              featureLayer: {}
            };
            layerInfo.featureLayer.id = layerObject.id;
            layerInfo.disableGeometryUpdate = false;
            layerInfo.allowUpdateOnly = false; //
            fieldInfos = this._getDefaultFieldInfos(layerObject);
            if (fieldInfos && fieldInfos.length > 0) {
              layerInfo.fieldInfos = fieldInfos;
            }
            defaultLayerInfos.push(layerInfo);
          }
        }
        return defaultLayerInfos;
      },

      _converConfiguredLayerInfos: function (layerInfos) {
        array.forEach(layerInfos, function (layerInfo) {
          // convert layerInfos to compatible with old version
          var layerObject;
          if (!layerInfo.featureLayer.id && layerInfo.featureLayer.url) {
            layerObject = this.getLayerObjectFromMapByUrl(this.map, layerInfo.featureLayer.url);
            if (layerObject) {
              layerInfo.featureLayer.id = layerObject.id;

            }
          }
          else {
            layerObject = this.map.getLayer(layerInfo.featureLayer.id);

          }
          var layID = layerInfo.featureLayer.id;
          if (layerInfo.featureLayer.hasOwnProperty("originalLayerId")) {
            layID = layerInfo.featureLayer.originalLayerId;
          }
          if (layerObject) {
            // convert fieldInfos
            var newFieldInfos = [];
            var webmapFieldInfos =
              editUtils.getFieldInfosFromWebmap(layID, this._jimuLayerInfos);
            if (webmapFieldInfos === undefined || webmapFieldInfos === null) {
              webmapFieldInfos = editUtils.getFieldInfosLayer(layID, this._jimuLayerInfos);
            }
            array.forEach(webmapFieldInfos, function (webmapFieldInfo) {
              if (webmapFieldInfo.fieldName !== layerObject.globalIdField &&
                webmapFieldInfo.fieldName !== layerObject.objectIdField &&
                webmapFieldInfo.type !== "esriFieldTypeGeometry" &&
                webmapFieldInfo.type !== "esriFieldTypeOID" &&
                webmapFieldInfo.type !== "esriFieldTypeBlob" &&
                webmapFieldInfo.type !== "esriFieldTypeGlobalID" &&
                webmapFieldInfo.type !== "esriFieldTypeRaster" &&
                webmapFieldInfo.type !== "esriFieldTypeXML") {
                //var found = array.some(layerInfo.fieldInfos, function (fieldInfo) {
                //  return (webmapFieldInfo.fieldName === fieldInfo.fieldName);
                //});
                //if (found === true) {
                var webmapFieldInfoNew = this.getFieldInfoFromWebmapFieldInfos(webmapFieldInfo, layerInfo.fieldInfos);

                if (webmapFieldInfoNew.visible === true) {
                  newFieldInfos.push(webmapFieldInfoNew);
                }

              }

            }, this);

            if (newFieldInfos.length !== 0) {
              layerInfo.fieldInfos = newFieldInfos;
            }
            //layerInfo = this._modifyFieldInfosForEE(layerInfo);
            //layerInfo.fieldInfo = this._processFieldInfos(layerInfo.fieldInfo);
          }
        }, this);
        return layerInfos;

      },
      getLayerObjectFromMapByUrl: function (map, layerUrl) {
        var resultLayerObject = null;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
          var layerObject = map.getLayer(map.graphicsLayerIds[i]);
          if (layerObject.url.toLowerCase() === layerUrl.toLowerCase()) {
            resultLayerObject = layerObject;
            break;
          }
        }
        return resultLayerObject;
      },

      getFieldInfoFromWebmapFieldInfos: function (webmapFieldInfo, fieldInfos) {
        var foundInfo = {};
        var foundInfos = array.filter(fieldInfos, function (fieldInfo) {
          return (webmapFieldInfo.fieldName === fieldInfo.fieldName);
        });
        if (foundInfos) {
          if (foundInfos.length >= 1) {
            foundInfo = foundInfos[0];
          } else {
            foundInfo = webmapFieldInfo;
          }

        }
        foundInfo.label = foundInfo.label === undefined ?
          webmapFieldInfo.label : foundInfo.label;

        foundInfo.visible = foundInfo.visible === undefined ?
          webmapFieldInfo.visible : foundInfo.visible;

        foundInfo.isEditableSettingInWebmap = webmapFieldInfo.isEditable === undefined ?
          true : webmapFieldInfo.isEditable;

        foundInfo.isEditable = foundInfo.isEditable === undefined ?
          webmapFieldInfo.isEditable : foundInfo.isEditable;

        foundInfo.canPresetValue = foundInfo.canPresetValue === undefined ?
          false : foundInfo.canPresetValue;

        foundInfo.format = webmapFieldInfo.format === undefined ?
          null : webmapFieldInfo.format;

        for (var k in webmapFieldInfo) {
          if (webmapFieldInfo.hasOwnProperty(k)) {
            if (foundInfo.hasOwnProperty(k) === false) {
              foundInfo[k] = webmapFieldInfo[k];
            }
          }
        }
        return foundInfo;
      },
      getConfigDefaults: function () {
        if (this.config.editor.hasOwnProperty("editGeometryDefault") &&
          this.config.editor.editGeometryDefault === true) {
          setTimeout(lang.hitch(this, function () {
            //perform any edit geom switch functionality
            //only when working with main layers feature and not on related features
            if (this._traversal.length < 2 && this._editGeomSwitch.domNode) {
            // code return to handle checkbox check as jimu checkbox added
              this._editGeomSwitch.check();
            }
          }), 100);
        } else {
          this._turnEditGeometryToggleOff();
        }
      },

      _processConfig: function () {
        /*CT- commented as we need to show non editable layers also
        this.config.editor.configInfos = array.filter(this.config.editor.configInfos, function (configInfo) {
             if (configInfo._editFlag && configInfo._editFlag === true) {
               return true;
             } else {
               return false;
             }
           });*/
        array.forEach(this.config.editor.configInfos, function (configInfo) {
          //To support backward compatibility if _editFlag is not available add it
          if (!configInfo.hasOwnProperty('_editFlag')) {
            configInfo._editFlag = true;
          }
          var layerObject = configInfo.layerInfo.layerObject;
          if (layerObject) {
            if (configInfo.allowUpdateOnly === false) {
              this.own(on(layerObject, "visibility-change, scale-visibility-change", lang.hitch(this, function () {
                if (this._layerScaleClearedTimer) {
                  clearTimeout(this._layerScaleClearedTimer);
                }
                this._layerScaleClearedTimer =
                  setTimeout(lang.hitch(this, function () {
                    this._createEditor(false);
                  }), 200);
              }
              )));
            } else {
              //Bind the scale and visiblity change event for update only layers
              //This is required to show the appropriate message on template picker screen
              this.own(on(layerObject, "visibility-change, scale-visibility-change",
                lang.hitch(this, function () {
                  if (!this.templatePicker ||
                    domStyle.get(this.templatePicker.domNode, "display") === "none") {
                    this._checkForLayersInTemplatePicker();
                  }
                })));
            }
            // modify templates with space in string fields
            this._removeSpacesInLayerTemplates(layerObject);
            this.processConfigForRuntime(configInfo);
            configInfo.configFeatureLayer = configInfo.configFeatureLayer ? configInfo.configFeatureLayer : configInfo.featureLayer;
            configInfo.featureLayer = layerObject;
            configInfo.showDeleteButton = false;
          }
        }, this);
      },
      onClose: function () {
        this._worksAfterClose();

        //if (this.config.editor.clearSelectionOnClose) {
        //  if (this._isDirty) {
        //    this._promptToResolvePendingEdit(true).then(lang.hitch(this, function () {
        //      // set this variable for controlling the onMapClick (#494)
        //      this.map.setInfoWindowOnClick(true);
        //      this._attrInspIsCurrentlyDisplayed = true;
        //      this.templatePicker.clearSelection();
        //    }))

        //  } else {
        //    this._cancelEditingFeature(true);

        //    // set this variable for controlling the onMapClick
        //    this.map.setInfoWindowOnClick(true);
        //    this._attrInspIsCurrentlyDisplayed = true;
        //    this.templatePicker.clearSelection();
        //  }
        //} else
        //{
        this._mapClickHandler(false);
        this._removeLayerVisibleHandler();
        this._unLockMapNavigation();
        //}
        // close method will call onDeActive automaticlly
        // so do not need to call onDeActive();
        //If xy attribute popup is open close it
        if (this._coordinates && this._coordinates.fieldsPopup &&
          this._coordinates.fieldsPopup.domNode) {
          this._coordinates.fieldsPopup.close();
        }
        //Close the value picker if open
        //This resolves the issue of value picker staying open
        //When the widget configuration is changed and widget reopens
        if (this.valuePicker) {
          this.valuePicker.hideDialog();
        }
      },
      _update: function () {
        //if (this.templatePicker) {
        //comments out, this results in teh scroll bar disappearing, unsure why


        //var widgetBox = html.getMarginBox(this.domNode);
        //var height = widgetBox.h;
        //var width = widgetBox.w;


        //var cols = Math.floor(width / 60);
        //this.templatePicker.attr('columns', cols);
        //this.templatePicker.update(true);


        // }
      },

      resize: function () {
        this._update();
        //if copy feature screen is currently being displayed then reset CopyFeatureList Height on resize
        if (this._copyFeaturesObj && !domClass.contains(this.copyFeaturesMainNode, 'esriCTHidden')) {
          this._resetCopyFeatureListHeight();
        }
      },
      onNormalize: function () {
        setTimeout(lang.hitch(this, this._update), 100);
      },

      onMinimize: function () {
        console.log("min");
      },

      onMaximize: function () {
        setTimeout(lang.hitch(this, this._update), 100);
      },

      /**
      * The function will add new item to item list as per the data
      */
      addItem: function (title, isOpen, itemListContainer, layerId, isTempFeature, layer, isLayer) {
        var itemContainer;
        itemContainer = domConstruct.create("div", {
          "class": "esriCTItem"
        }, null);
        //domAttr.set(itemContainer, "index", index);
        this._createItemTitle(title, itemContainer, isTempFeature ? true : isOpen, isTempFeature, layer);
        this._createItemContent(itemContainer, isTempFeature ? true : isOpen, layerId, isLayer);
        if (isTempFeature) {
          domClass.add(itemContainer, "esriCTDisableToggling");
          domAttr.set(itemContainer.children[0], "tabindex", "-1");
        }
        itemListContainer.appendChild(itemContainer);
        return itemContainer;
      },

      /**
      * Create item title node
      */
      _createItemTitle: function (title, itemContainer, isOpen, isTempFeature, layer) {
        var itemTitleContainer, itemTitle, arrowIcon, itemHighlighter;
        itemTitleContainer = domConstruct.create("div", {
          "class": "esriCTItemTitleContainer",
          "tabindex": "0",
          "role": "button",
          "aria-label": title
        }, itemContainer);
        //Item highlighter
        itemHighlighter = domConstruct.create("div", {
          "class": "esriCTItemHighlighter"
        }, itemTitleContainer);
        //create esriCTItemTitle
        itemTitle = domConstruct.create("div", {
          "class": "esriCTItemTitle esriCTFloatLeft",
          "innerHTML": title,
          "title": title
        }, itemTitleContainer);
        if (title === this.nls.relatedItemTitle) {
          domAttr.set(itemTitleContainer, "isRelatedItem", "true");
        }
        //Add opacity to layer title based on layer's visibility
        if (this._traversal.length <= 1 && layer && !layer.visibleAtMapScale) {
          itemTitle.style.opacity = "0.3";
        }
        //create arrow icon div
        arrowIcon = domConstruct.create("div", {
          "class": "itemTitleArrowIcon"
        }, itemTitleContainer);
        if (isOpen) {
          domClass.add(arrowIcon, "itemTitleUpArrow");
        } else {
          domClass.add(arrowIcon, "itemTitleDownArrow");
        }
        this.own(on(itemTitleContainer, "click", lang.hitch(this, function (evt) {
          if (!domClass.contains(evt.currentTarget.parentElement, "esriCTDisableToggling") && !isTempFeature) {
            this._togglePanel(itemContainer);
          }
        })));
        this.own(on(itemTitleContainer, "keydown", lang.hitch(this, function (evt) {
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            if (!domClass.contains(evt.currentTarget.parentElement, "esriCTDisableToggling") && !isTempFeature) {
              this._togglePanel(itemContainer);
            }
          }
        })));
      },

      /**
      * Create content for each title row
      */
      _createItemContent: function (itemContainer, isOpen, layerId, isLayer) {
        var itemContent, editDescription, configuredLayerDesc;
        //create node for adding item content
        itemContent = domConstruct.create("div", {
          "class": "esriCTItemContent esriCTRelatedItemContent"
        }, itemContainer);
        if (isLayer) {
          configuredLayerDesc = entities.decode(this._fetchLayerDescription(layerId));
          if (configuredLayerDesc) {
            //show configured description
            editDescription = domConstruct.create("div", {
              "class": "editDescription",
              "innerHTML": this.editorXssFilter.sanitize(configuredLayerDesc),
              "role": "presentation",
              "tabindex": "0",
              "aria-label": utils.stripHTML(configuredLayerDesc)
            }, itemContent);
          }
          domConstruct.place(this.attrInspector.domNode, itemContent, "last");
        } else {
          if (this._relatedTablesInfo[this.attrInspector._currentFeature._layer.id] &&
            this._relatedTablesInfo[this.attrInspector._currentFeature._layer.id].domNode) {
            domConstruct.place(this._relatedTablesInfo[this.attrInspector._currentFeature._layer.id].domNode,
              itemContent, "last");
          }
        }
        if (isOpen) {
          this._togglePanel(itemContainer);
        }
      },

      /**
      * Create item list based on the data passed
      */
      _togglePanel: function (node) {
        var title, panel, arrowIcon, itemHighlighter;
        title = query(".esriCTItemTitle", node)[0];
        arrowIcon = query(".itemTitleArrowIcon", node)[0];
        panel = query(".esriCTItemContent", node)[0];
        itemHighlighter = query(".esriCTItemHighlighter", node)[0];
        if (title && panel && !domClass.contains(node, "esriCTDisableToggling")) {
          if (!domClass.contains(panel, "esriCTItemContentActive")) {
            //set the item highlighter
            domStyle.set(itemHighlighter, "backgroundColor", this.config.selectedThemeColor);
            //toggle arrow icon class
            domClass.replace(arrowIcon, "itemTitleUpArrow", "itemTitleDownArrow");
            if (title.innerHTML === this.nls.relatedItemTitle) {
              this._setTabIndexToListItems(node, true, "0");
            } else {
              this._setTabIndexToListItems(node, false, "0");
            }
          } else {
            //set the item highlighter
            domStyle.set(itemHighlighter, "backgroundColor", "transparent");
            //toggle arrow icon class
            domClass.replace(arrowIcon, "itemTitleDownArrow", "itemTitleUpArrow");
            if (title.innerHTML === this.nls.relatedItemTitle) {
              this._setTabIndexToListItems(node, true, "-1");
            } else {
              this._setTabIndexToListItems(node, false, "-1");
            }
          }
          domClass.toggle(panel, "esriCTItemContentActive");
        }
        this._setWidgetFirstFocusNode("AI", false);
      },

      _setTabIndexToListItems: function (node, isRelatedTable, tabindex) {
        if (isRelatedTable) {
          var realtedTableItems = query(".relatedTableFields", node);
          array.forEach(realtedTableItems, lang.hitch(this, function (tableField) {
            domAttr.set(tableField, "tabindex", tabindex);
          }));
        } else {
          var widgets = registry.findWidgets(this.attrInspector.domNode);
          array.forEach(widgets, lang.hitch(this, function (currentWidget) {
            if (currentWidget.focusNode) {
              domAttr.set(currentWidget.focusNode, "tabindex", tabindex);
            }
          }));
          array.forEach(query(".esriCTCustomButtons", this.attrInspector.domNode),
            lang.hitch(this, function (button) {
              domAttr.set(button, "tabindex", tabindex);
            }));
          //Check if description is present
          //If yes handle the tabindexes accordingly
          var descriptionNode;
          descriptionNode = query(".editDescription", this.attrInspector.domNode.parentElement);
          if (descriptionNode && descriptionNode.length > 0) {
              domAttr.set(descriptionNode[0], "tabindex", tabindex);
          }
          //Change the edit geometry switch tabindex
          domAttr.set(this._editGeomSwitch.domNode, "tabindex", tabindex);
          this._setTabIndexToAttachmentSection(tabindex);
        }
      },
      _setTabIndexToAttachmentSection: function (tabindex) {
        if (this.attrInspector._attachmentEditor) {
          var attachmentNode, attachmentUploadForm;
          attachmentNode = this.attrInspector._attachmentEditor._attachmentList;
          attachmentUploadForm = this.attrInspector._attachmentEditor._uploadForm;
          if (attachmentUploadForm && domStyle.get(attachmentUploadForm, "display") === "block") {
            domAttr.set(attachmentUploadForm.children[0], "tabindex", tabindex);
          }
          if (attachmentNode && attachmentNode.childNodes.length > 0) {
            array.forEach(attachmentNode.childNodes, lang.hitch(this,
              function (childNode) {
                if (childNode.nodeName !== "#text") {
                  domAttr.set(childNode.children[0], "tabindex", tabindex);
                  domAttr.set(childNode.children[1], "tabindex", tabindex);
                }
              }));
          }
        }
      },

      _fetchLayerDescription: function (selectedLayerId) {
        var configuredDesc;
        var currentConfig;
        currentConfig = this.config.editor.layerInfos;
        //get the config info of the selected breadcrumb and display its table
        if (this._traversal && this._traversal.length > 0) {
          array.some(this._traversal, function (layerId, layerIndex) {
            array.some(currentConfig, function (info) {
              if (info.featureLayer.id === layerId) {
                currentConfig = info;
                return true;
              }
            });
            //if current table is not of all-layers and the index is not last then consider the next relations
            if (this._traversal.length > 1 && layerIndex + 1 < this._traversal.length) {
              currentConfig = currentConfig.relationshipInfos;
            }

          }, this);
        } else {
          array.some(currentConfig, function (info) {
            if (info.featureLayer.id === selectedLayerId) {
              currentConfig = info;
              return true;
            }
          });
        }
        if (currentConfig.editDescription) {
          configuredDesc = currentConfig.editDescription;
        }
        if (configuredDesc === "<br>") {
          configuredDesc = "";
        }
        return configuredDesc;
      },

      _getRelationshipInfo: function (feature) {
        var id = feature._layer.id;
        if (this._traversal && this._traversal.length > 0) {
          var currentConfig;
          currentConfig = this.config.editor.configInfos;
          array.some(this._traversal, function (layerId, layerIndex) {
            array.some(currentConfig, function (info) {
              if (info.featureLayer.id === layerId) {
                currentConfig = info;
                return true;
              }
            });
            //if current table is not of all-layers and the index is not last then consider the next relations
            if (this._traversal.length > 1 && layerIndex + 1 < this._traversal.length) {
              currentConfig = currentConfig.relationshipInfos;
            }

          }, this);
          return currentConfig.relationshipInfos;
        } else {
          var result = null;
          this.config.editor.configInfos.some(function (configInfo) {
            return configInfo.featureLayer.id === id ? ((result = configInfo.relationshipInfos), true) : false;
          });
          return result;
        }
      },

      /***
      * Function gets the selected theme Color from app config and theme properties
      * In case of errors it will use "#000000" color
      */
      _getSelectedThemeColor: function () {
        var requestArgs, styleName, selectedTheme;
        // by default set it to black
        this.config.selectedThemeColor = "#000000";
        //Get selected theme Name
        selectedTheme = this.appConfig.theme.name;
        //get selected theme's style
        if (this.appConfig && this.appConfig.theme && this.appConfig.theme.styles) {
          styleName = this.appConfig.theme.styles[0];
        } else {
          styleName = "default";
        }
        //if custom styles are selected then use the selected color directly
        if (this.appConfig && this.appConfig.theme && this.appConfig.theme.customStyles &&
          this.appConfig.theme.customStyles.mainBackgroundColor) {
          this.config.selectedThemeColor = this.appConfig.theme.customStyles.mainBackgroundColor;
          return;
        }
        //create request to get the selected theme's manifest to fetch the color
        requestArgs = {
          url: "./themes/" + selectedTheme + "/manifest.json",
          content: {
            f: "json"
          },
          handleAs: "json",
          callbackParamName: "callback"
        };
        esriRequest(requestArgs).then(lang.hitch(this, function (response) {
          var i, styleObj;
          //match the selected style name and get its color
          if (response && response.styles && response.styles.length > 0) {
            for (i = 0; i < response.styles.length; i++) {
              styleObj = response.styles[i];
              if (styleObj.name === styleName) {
                this.config.selectedThemeColor = styleObj.styleColor;
                break;
              }
            }
          }
        }));
      },

      _getRelatedRecordsByRelatedQuery: function (layerObject, relationshipId, relatedLayersId, parentOID) {
        var def = new Deferred();
        var relatedQuery = new RelationshipQuery();
        var objectId = parentOID; //this.attrInspector._currentFeature.attributes[layerObject.objectIdField];
        var relatedLayer = this._jimuLayerInfos.getLayerOrTableInfoById(relatedLayersId).layerObject;
        var relatedObjectId = relatedLayer.objectIdField;

        relatedQuery.returnGeometry = false;
        relatedQuery.outSpatialReference = this.map.spatialReference;
        relatedQuery.relationshipId = relationshipId;
        relatedQuery.objectIds = [objectId];
        relatedQuery.outFields = [relatedObjectId]; //get only related tables OID so that it will be used for selection
        this.loading.show();
        layerObject.queryRelatedFeatures(
          relatedQuery,
          lang.hitch(this, function (relatedRecords) {
            var features = relatedRecords[objectId] && relatedRecords[objectId].features;
            var relatedObjectIds = [];
            array.forEach(features, function (feature) {
              relatedObjectIds.push(feature.attributes[relatedObjectId]);
            });
            this.loading.hide();
            if (features) {
              def.resolve(relatedObjectIds);
            } else {
              def.resolve(relatedObjectIds);
            }
          }), lang.hitch(this, function () {
            this.loading.hide();
            def.resolve([]);
          })
        );
        return def;
      },

      /* Refresh attributes on geometry change */
      _getCurrentFieldDijit: function (fieldName) {
        var fieldDijit;
        array.some(this.attrInspector._currentLInfo.fieldInfos,
          lang.hitch(this, function (fInfo) {
            if (fInfo.name === fieldName) {
              fieldDijit = fInfo.dijit;
              return true;
            }
          }));
        return fieldDijit;
      },

      _updateRefreshButtonState: function () {
        var hasGeometryDependency;
        if (this._refreshButton && this.config.editor.enableAttributeUpdates) {
          //if automatic update is configured to true show refresh button
          if (this.config.editor.enableAutomaticAttributeUpdates) {
            domClass.remove(this._refreshButton, "hidden");
            //if automatic update is 'ON' in the widget then call refresh attribute function
            if (domClass.contains(this._refreshButton, "esriCTAutoUpdateOnMode")) {
              this._refreshAttributes();
            }
          } else if (domAttr.has(this._refreshButton, "hasGeometryDependency")) {
            hasGeometryDependency = domAttr.get(this._refreshButton, "hasGeometryDependency");
            if (hasGeometryDependency) {
              domClass.remove(this._refreshButton, "hidden");
            }
          } else {
            if (this.currentLayerInfo.fieldValues) {
              hasGeometryDependency = false;
              //loop through all copy actions and get the values as per priority for individual actions
              for (var fieldName in this.currentLayerInfo.fieldValues) {
                for (var i = 0; i < this.currentLayerInfo.fieldValues[fieldName].length; i++) {
                  var copyAction = this.currentLayerInfo.fieldValues[fieldName][i];
                  //get value form intersection if it is enabled
                  if (copyAction.actionName === "Intersection" && copyAction.enabled) {
                    hasGeometryDependency = true;
                    break;
                  }
                  //get value from address if it is enabled
                  if (copyAction.actionName === "Address" && copyAction.enabled) {
                    hasGeometryDependency = true;
                    break;
                  }
                  //get value from coordinates if it is enabled
                  if (copyAction.actionName === "Coordinates" && copyAction.enabled) {
                    hasGeometryDependency = true;
                    break;
                  }
                }
                if (hasGeometryDependency) {
                  break;
                }
              }
              domAttr.set(this._refreshButton, "hasGeometryDependency", hasGeometryDependency);
              if (hasGeometryDependency) {
                domClass.remove(this._refreshButton, "hidden");
              }
            }
          }
        }
      },

      _refreshAttributes: function () {
        //change canAutoUpdate flag only if autoSaveAttrUpdates is on and selected feature is existing feature
        if (this.config.editor.hasOwnProperty("autoSaveAttrUpdates") &&
          this.config.editor.autoSaveAttrUpdates && this.currentLayerInfo && !this.currentLayerInfo.isCache) {
          this.canAutoUpdate = false;
        }
        this.loading.show();
        //load all the info required to copy attributes
        this._getCopyAttributes(this.currentLayerInfo, this.currentFeature.geometry).then(
          lang.hitch(this, function (copyAttrInfo) {
            var inIntersectionActionFields = [];
            //if fieldValues exist means copy actions are applied
            if (this.currentLayerInfo.fieldValues) {
              //loop through all copy actions and get the values as per priority for individual actions
              for (var fieldName in this.currentLayerInfo.fieldValues) {
                //  array.some(this.currentLayerInfo.fieldValues[fieldName], lang.hitch(this, function (copyAction) {
                for (var i = 0; i < this.currentLayerInfo.fieldValues[fieldName].length; i++) {
                  var copyAction = this.currentLayerInfo.fieldValues[fieldName][i];
                  var foundInIntersection = false, resetToEmpty = true;
                  var value = null;
                  //get value form intersection if it is enabled
                  if (copyAttrInfo && copyAction.actionName === "Intersection" && copyAction.enabled) {
                    for (var j = 0; j < copyAction.fields.length; j++) {
                      var fieldInfo = copyAction.fields[j];
                      if (copyAttrInfo.Intersection.hasOwnProperty(fieldName) &&
                        copyAttrInfo.Intersection[fieldName].hasOwnProperty(fieldInfo.layerId) &&
                        copyAttrInfo.Intersection[fieldName][fieldInfo.layerId].hasOwnProperty(fieldInfo.field)) {
                        value = copyAttrInfo.Intersection[fieldName][fieldInfo.layerId][fieldInfo.field];
                        this._setValuesInDijits(fieldName, value);
                        foundInIntersection = true;
                        resetToEmpty = false;
                        //create list of fields on which intersection action will be applied
                        if (copyAttrInfo.multipleValues && copyAttrInfo.multipleValues.hasOwnProperty(fieldName) &&
                          inIntersectionActionFields.indexOf(fieldName) < 0) {
                          inIntersectionActionFields.push(fieldName);
                        }
                        break;
                      }
                    }
                    if (foundInIntersection) {
                      break;
                    }
                  }
                  //get value from address if it is enabled
                  if (copyAttrInfo && copyAction.actionName === "Address" && copyAction.enabled &&
                    copyAttrInfo.Address.hasOwnProperty(copyAction.field)) {
                    value = copyAttrInfo.Address[copyAction.field];
                    this._setValuesInDijits(fieldName, value);
                    resetToEmpty = false;
                    break;
                  }
                  //get value from coordinates if it is enabled
                  if (copyAttrInfo && copyAction.actionName === "Coordinates" && copyAction.enabled) {
                    //for my location
                    if (copyAction.coordinatesSource && copyAction.coordinatesSource === "myLocation") {
                      var hasCoordinatesSystemKey =
                        copyAttrInfo.MyLocation.Coordinates.hasOwnProperty(copyAction.coordinatesSystem);
                      //If xy is a field store both x y in same field
                      if (copyAction.field === "xy"  || copyAction.field === "yx") {
                        if (hasCoordinatesSystemKey) {
                          value = this._getOutputString(copyAction.coordinatesSystem,
                            copyAttrInfo.MyLocation.Coordinates[copyAction.coordinatesSystem], copyAction.field);
                        } else {
                          value = "";
                        }
                      } else {
                        value = hasCoordinatesSystemKey ?
                          copyAttrInfo.MyLocation.Coordinates[copyAction.coordinatesSystem][copyAction.field] : "";
                      }
                    } else {
                      //for feature loaction
                      //If xy is a field store both x y in same field
                      if (copyAction.field === "xy"  || copyAction.field === "yx") {
                        value = this._getOutputString(copyAction.coordinatesSystem,
                          copyAttrInfo.Coordinates[copyAction.coordinatesSystem], copyAction.field);
                      } else {
                        value = copyAttrInfo.Coordinates[copyAction.coordinatesSystem][copyAction.field];
                      }
                    }
                    this._setValuesInDijits(fieldName, value);
                    resetToEmpty = false;
                    break;
                  }
                  //get value from preset if it is enabled
                  if (copyAction.actionName === "Preset" && copyAction.enabled && this._usePresetValues) {
                    resetToEmpty = false;
                    break;
                  }
                  //if value not found in any copy action set it to empty(null)
                  if (resetToEmpty && copyAction.enabled &&
                    (copyAction.actionName === "Intersection" ||
                      copyAction.actionName === "Address" ||
                      copyAction.actionName === "Coordinates")) {
                    this._setValuesInDijits(fieldName, null);
                  }
                }
              }
              //same field can have multiple attribute actions applied
              //we need to provide value picker only for those fields for which intersection action will be applied according to priority
              //else set null as multiple values. since no field is involved in intersection multiple values should be null
              if (copyAttrInfo) {
                if (copyAttrInfo.multipleValues && inIntersectionActionFields.length > 0) {
                var involvedMultiplValues = {}
                array.forEach(inIntersectionActionFields, function (fld) {
                  involvedMultiplValues[fld] = copyAttrInfo.multipleValues[fld];
                });
                copyAttrInfo.multipleValues = involvedMultiplValues;
              } else {
                copyAttrInfo.multipleValues = null;
                }
              }
              //as we are refresing attributes again add value picker for the updated multiple values and show value picker popup
              this._addValuePicker(copyAttrInfo);
            }
            this.loading.hide();
            //focus out the last dijit so that if it has error wil be notiifed
            setTimeout(lang.hitch(this, function () {
              //if autoSaveAttrUpdates is on and selected feature is existing feature and
              //copyAttributesInfo.multipleValues is not null or not undefined means
              //Value picker is yet to be displayed so don't save feature here
              if ((this.config.editor.hasOwnProperty("autoSaveAttrUpdates") &&
                this.config.editor.autoSaveAttrUpdates) && (this.currentLayerInfo && !this.currentLayerInfo.isCache)) {
                if (!copyAttrInfo.multipleValues) {
                  //Save the feature only if it has some changes
                  if (this._validateFeatureChanged()) {
                    this._autoSaveFeatureEdits();
                  }
                  this.canAutoUpdate = true;
                }
              }
              focusUtil.curNode && focusUtil.curNode.blur();
            }, 100));
          }));
      },

      _setValuesInDijits: function (fieldName, value) {
        var dateVal, dijit;
        dijit = this._getCurrentFieldDijit(fieldName);
        dateVal = null;
        //Case for all field types other than dateTime
        //Else if multiple dijit means the case of date and time
        if (dijit && dijit.set) {
          //fix to resolve issue with dojo textarea/rich text editor not allowing to set numbers
          if (dijit.domNode && domClass.contains(dijit.domNode, "atiTextAreaField") &&
            value !== undefined && value !== null) {
            value = value.toString();
          }
          if (dijit.domNode && domClass.contains(dijit.domNode, "atiRichTextField") &&
            value !== undefined) {
            //in case of rict text editor it is not allowing to set null values so make it empty
            if (value === null) {
              value = "";
            } else {
              value = value.toString();
            }
          }
          dijit.set("value", value, true);
          //focus the dijits so that if it has error will get notified
          dijit.focus();
        } else if (dijit && dijit.length > 0) {
          //if values is valid then only get in Date format else set null only
          if (value) {
            dateVal = new Date(value);
          }
          //set date
          if (dijit[0]) {
            dijit[0].set("value", dateVal, true);
          }
          //set time
          if (dijit.length > 1 && dijit[1]) {
            dijit[1].set("value", dateVal, true);
          }
        }
      },
      /* End Refresh attributes on geometry change */

      /**
       * This function to is used to get all the selectable layers
       * and it is passed to the select tool widget. Only those layer needs to be passed whose geomery type matches with the
       * the geomtery type of selected template.
       */
      _getOrClearSelectableLayers: function (clearSelection) {
        var layers, selectionMgr, selectedTemplate, featureLayerObject, selectedGeometryType;
        layers = [];
        if (clearSelection) {
          selectionMgr = SelectionManager.getInstance();
        }
        if (this.templatePicker) {
          selectedTemplate = this.templatePicker.getSelected();
          if (selectedTemplate) {
            featureLayerObject = selectedTemplate.featureLayer;
            selectedGeometryType = featureLayerObject.geometryType;
          }
        }
        for (var layer in this.map._layers) {
          if (this.map._layers.hasOwnProperty(layer)) {
            var layerObj;
            layerObj = this.map._layers[layer];
            if (layerObj.hasOwnProperty("type") &&
              layerObj.type === "Feature Layer") {
              if (clearSelection) {
                selectionMgr.clearSelection(layerObj);
                // consider only those layer for custom select tool widget whose geometryType matches with the geometryType
                // of selectedTemplate.
              } else if (selectedGeometryType &&
                layerObj.hasOwnProperty("geometryType") &&
                layerObj.geometryType === selectedGeometryType) {
                layers.push(layerObj);
              }
            }
          }
        }
        if (!clearSelection) {
          return layers;
        }
      },

      /**
       * This function to fetch selected features from the layers on
       * selection complete by select tool
       */
      _getSelectedFeature: function () {
        var selectionLayerResponse, selectableLayers;
        selectionLayerResponse = [];
        selectableLayers = this._getOrClearSelectableLayers(false);
        array.forEach(selectableLayers, lang.hitch(this, function (layer) {
          selectionLayerResponse = selectionLayerResponse.concat(layer.getSelectedFeatures());
        }));
        return selectionLayerResponse;
      },

      /**
       * This function to is used to initialize select tool widget
       */
      _initializeSelectToolWidget: function () {
        this._selectTool = new FeatureSetChooserForMultipleLayers({
          map: this.map,
          updateSelection: true,
          fullyWithin: false
        });
        this._selectTool.setFeatureLayers(this._getOrClearSelectableLayers(false));
        this.own(on(this._selectTool, 'unloading', lang.hitch(this, function () {
          this.loading.show();
          var selectedFeatures;
          selectedFeatures = this._getSelectedFeature();
          if (selectedFeatures.length === 0) {
            Message({
              message: this.nls.noFeatureSelectedMessage
            });
          } else {
            this._selectTool.deactivate();
            //if copy features instance not found create it
            if (!this._copyFeaturesObj) {
              this._createCopyFeaturesInstance();
            }
            //Pass selected features to selectFeaturesToCopy method,
            //and allow user to choose among selctd features
            this._copyFeaturesObj.selectFeaturesToCopy(selectedFeatures);
            this._setWidgetFirstFocusNode("copyFeatures", true);
            // After selecting feature, copy feature list is created.
            // Since this selection selects the features with default cyan color it needs to be removed or reset it.
            // Hence, as soon as user gets the selected feature remove its selection as list is created and selected features
            // are no longer created.
            this._getOrClearSelectableLayers(true);
            this._displayCopyFeatureDiv();
            this._resetCopyFeatureListHeight();
          }
          this.loading.hide();
        })));
      },

      /**
       * This function is used to set the height of copy feature list depending upon the
       * visibility of single and multiple button.
       */
      _resetCopyFeatureListHeight: function () {
        // node 1
        var copyFeatureTitleContainer = query(".esriCTCopyFeaturesListTitle", this.copyFeaturesMainNode);
        if (copyFeatureTitleContainer && copyFeatureTitleContainer.length > 0) {
          copyFeatureTitleContainer = copyFeatureTitleContainer[0];
        }
        var copyFeatureTitleHeight = domStyle.getComputedStyle(copyFeatureTitleContainer).height;
        copyFeatureTitleHeight = parseFloat(copyFeatureTitleHeight);
        // extra margin(5) that needs to be added
        copyFeatureTitleHeight = copyFeatureTitleHeight + 5;

        // node 2
        var copyFeatureHintContainer = query(".esriCTCopyFeaturesHint", this.copyFeaturesMainNode);
        if (copyFeatureHintContainer && copyFeatureHintContainer.length > 0) {
          copyFeatureHintContainer = copyFeatureHintContainer[0];
        }

        var copyFeatureHinteHeight = domStyle.getComputedStyle(copyFeatureHintContainer).height;
        copyFeatureHinteHeight = parseFloat(copyFeatureHinteHeight);
        // extra margin(5) that needs to be added
        copyFeatureHinteHeight = copyFeatureHinteHeight + 5;

        // node 3
        var copyFeatureProgressbarHeight = 0;
        if (this._copyFeaturesObj && this._copyFeaturesObj.applyEditsProgress.domNode.style.display !== "none") {
          copyFeatureProgressbarHeight =
            domStyle.getComputedStyle(this._copyFeaturesObj.applyEditsProgress.domNode).height;
          copyFeatureProgressbarHeight = parseFloat(copyFeatureProgressbarHeight);
          // extra margin(5) that needs to be added
          copyFeatureProgressbarHeight = copyFeatureProgressbarHeight + 5;
        }

        // node 4
        var copyFeatureListContentContainer = query(".esriCTCopyFeaturesListContent", this.copyFeaturesMainNode);
        if (copyFeatureListContentContainer && copyFeatureListContentContainer.length > 0) {
          copyFeatureListContentContainer = copyFeatureListContentContainer[0];
        }

        // node 5
        var copyFeatureButtonContentContainer = query(".esriCTCopyFeaturesBtnContainer", this.copyFeaturesMainNode);
        if (copyFeatureButtonContentContainer && copyFeatureButtonContentContainer.length > 0) {
          copyFeatureButtonContentContainer = copyFeatureButtonContentContainer[0];
        }
        var copyFeatureButtonContentContainerHeight =
          domStyle.getComputedStyle(copyFeatureButtonContentContainer).height;
        copyFeatureButtonContentContainerHeight = parseFloat(copyFeatureButtonContentContainerHeight);

        // node 6
        var copyFeatureMainNodeHeight = domStyle.getComputedStyle(this.copyFeaturesMainNode).height;
        copyFeatureMainNodeHeight = parseFloat(copyFeatureMainNodeHeight);

        // reset height
        var copyFeatureListContentContainerHeight = copyFeatureMainNodeHeight - (copyFeatureTitleHeight +
          copyFeatureButtonContentContainerHeight + copyFeatureHinteHeight + copyFeatureProgressbarHeight);
        domStyle.set(copyFeatureListContentContainer, "height", copyFeatureListContentContainerHeight + "px");
      },

      _removeCopyFeaturesInstance: function () {
        // clear the selection
        this._copyFeaturesObj.highlightGraphicsLayer.clear();
        // close the copy feature form
        this._hideCopyFeatureDiv();
        // destroy copy feature instance
        this._destroyCopyFeatureInstance();
      },

      /**
       * Creates instacne of copy-features dijit which allows user to choose
       * among selected features.
       */
      _createCopyFeaturesInstance: function () {
        this._copyFeaturesObj = new CopyFeatures({
          nls: this.nls,
          layerInfosObj: this._jimuLayerInfos,
          mainNode: this.copyFeaturesMainNode,
          appUtils: this.appUtils,
          map: this.map,
          parentDomNode: this.domNode,
          hideMultipleFeatureButton: this._layerHasUniqueFields(),
          widgetId: this.widgetId
        }, domConstruct.create("div", {}, this.copyFeaturesMainNode));
        //handle create-single-feature event and display copy asset msg
        this.own(on(this._copyFeaturesObj, "createSingleFeature",
          lang.hitch(this, function (allSelectedFeatures) {
            this.loading.show();
            // clear the selection
            this._copyFeaturesObj.highlightGraphicsLayer.clear();
            // close the copy feature form
            this._hideCopyFeatureDiv();
            // destroy copy feature instance
            this._destroyCopyFeatureInstance();
            // graphic object of a single layer
            var singleFeatureObj = this._createSingleGeometry(allSelectedFeatures);
            // update single feature
            var featureLayerObject = this.templatePicker.getSelected().featureLayer;
            var featureLayerInfo = this._getLayerInfoByID(featureLayerObject.id);
            var singleFeature = this._updateAllSelectedGeometries([singleFeatureObj.graphic], featureLayerInfo, singleFeatureObj.layerObj)[0];
            // if feature selection found
            // in case of single copied feature, add it to graphics layer and allow user to save it
            if (singleFeature) {
              this._addGraphicToLocalLayer(singleFeature, singleFeature.attributes);
            } else {
              this.loading.hide();
            }
          })));
        //handle create-multiple-features event and display copy asset msg
        this.own(on(this._copyFeaturesObj, "createMultipleFeatures",
          lang.hitch(this, function (allSelectedGeometries) {
            this.loading.show();
            this.allSelectedGeometries = null;
            // if feature selection found
            if (allSelectedGeometries && allSelectedGeometries.length > 0) {
              //when only one feature is coiped add it to graphicLayer and allow user to save it.
              //else add all copied features and then show them in AI
              if (allSelectedGeometries.length === 1) {
                this._removeCopyFeaturesInstance();
                // single feature creation
                var featureLayerObject = this.templatePicker.getSelected().featureLayer;
                var featureLayerInfo = this._getLayerInfoByID(featureLayerObject.id);
                var singleFeature = this._updateAllSelectedGeometries(allSelectedGeometries, featureLayerInfo)[0];
                if(this.templatePicker.hasOwnProperty("_selectedInfo")) {
                  if(this.templatePicker._selectedInfo.hasOwnProperty("selRow")) {
                    this._selectTemplateIndex = this.templatePicker._selectedInfo.selRow;
                  }
                }
                if(singleFeature) {
                this._addGraphicToLocalLayer(singleFeature, singleFeature.attributes);
                } else {
                  this.loading.hide();
                }
              } else {
                //map features
                this.allSelectedGeometries = allSelectedGeometries;
                //added this timeout since loading indicator was not showing immedieatly
                //when too many features selected UI thread was getting blocked
                setTimeout(lang.hitch(this, function () {
                  this._addSelectedFeatureInTheLayer(allSelectedGeometries);
                }), 100);
              }
            } else {
              this._removeCopyFeaturesInstance();
            }
          })));
        //handle create-multiple-features event and display copy asset msg
        this.own(on(this._copyFeaturesObj, "cancelBtnClicked", lang.hitch(this, function () {
          this._onCopyFeatureCancelButtonClicked();
        })));
        this._copyFeaturesObj.startup();
      },
      _layerHasUniqueFields: function () {
        var layer, isUniqueField = false;
        layer = this.templatePicker.getSelected().featureLayer;
        if (layer && layer.indexes && layer.indexes.length > 0) {
          array.some(layer.indexes, lang.hitch(this, function (indexField) {
            //If field other than objet id and global id is having unique constraint
            //break the loop and return the value
            if (indexField.isUnique && indexField.fields !== layer.objectIdField &&
              indexField.fields !== layer.globalIdField) {
              isUniqueField = true;
              return true;
            }
          }));
        }
        return isUniqueField;
      },

      /**
       * This function is used to destroy the instance of copy feature and empty its parent container
       */
      _destroyCopyFeatureInstance: function () {
        if (this._copyFeaturesObj) {
          this._copyFeaturesObj.destroy();
          this._copyFeaturesObj = null;
        }
        domConstruct.empty(this.copyFeaturesMainNode);
      },

      /**
       * This function is executed when cancel button
       * in copy feature form is clicked. It is used to perform operations
       * like hide the current form, clear the existing feature selections.
       */
      _onCopyFeatureCancelButtonClicked: function () {
        this._hideCopyFeatureDiv();
        this._changeSelectToolState();
        // destroy copy feature instance
        this._destroyCopyFeatureInstance();
        this._setWidgetFirstFocusNode("templatePicker", true);
      },

      /**
       * This function is used to add features in the layer of selected template.
       * @param {*} allSelectedGeometries features that needs to be added
       */
      _addSelectedFeatureInTheLayer: function (allSelectedGeometries) {
        // While adding features in the layer, attribute must be added and it should be fetched from template-picker
        var selectedTemp = this.templatePicker.getSelected() || this._currentSelectedTemplate;
        var deferredArray;
        deferredArray = [];
        this.copyMultipleFeatureGraphics = [];
        this.nullAttributeCountRecord = null;
        this.requiredFieldsArray = null;
        var featureLayerObject = selectedTemp.featureLayer;
        var featureLayerInfo = this._getLayerInfoByID(featureLayerObject.id);
        //Check if my location is required to copy the features of selected layer
        var needMyLocation = false;
        for (var fName in featureLayerInfo.fieldValues) {
          var fActions = featureLayerInfo.fieldValues[fName];
          for (var i = 0; i < fActions.length; i++) {
            if (fActions[i].actionName === "Coordinates" && fActions[i].enabled &&
              fActions[i].hasOwnProperty("coordinatesSource") &&
              fActions[i].coordinatesSource === "myLocation") {
              needMyLocation = true;
            }
          }
          if (needMyLocation) {
            break;
          }
        }
        allSelectedGeometries = this._updateAllSelectedGeometries(allSelectedGeometries, featureLayerInfo);
        this.nullAttributeCountRecord = lang.clone(selectedTemp.template.prototype.attributes);
        for (var attrKey in this.nullAttributeCountRecord) {
          this.nullAttributeCountRecord[attrKey] = 0;
        }
        this.requiredFieldsArray = this._getRequiredFields(featureLayerInfo.fieldInfos);
        //get MyLocation info for multiple features only once and then get the copy attributes
        this._myLocationInfoForMultipleFeatures = null;
        this._getMyLocationInfo(needMyLocation).then(lang.hitch(this, function (myLocationInfo) {
          this._myLocationInfoForMultipleFeatures = myLocationInfo;
          array.forEach(allSelectedGeometries, lang.hitch(this, function (selectedFeatureDetail) {
            var featureDef = this._getCopyAttributes(featureLayerInfo, selectedFeatureDetail.geometry);
            deferredArray.push(featureDef);
          }));
          all(deferredArray).then(lang.hitch(this, function (copyAttributesInfoArray) {
            array.forEach(allSelectedGeometries, lang.hitch(this, function (selectedFeatureDetail, index) {
              var copyAttributesInfo = copyAttributesInfoArray[index];
              var selectedFeaturesAttributes = lang.clone(selectedFeatureDetail.attributes);
              var newAttributes = lang.clone(selectedTemp.template.prototype.attributes);
              //copy only those attributes which are not available in template or
              //if the value in template for those attribute is null or
              //override defaults by copied feature is true
              for (var attributeKey in selectedFeaturesAttributes) {
                if (!newAttributes.hasOwnProperty(attributeKey) || newAttributes[attributeKey] === null ||
                  this.config.editor.overrideDefaultsByCopiedFeature) {
                  newAttributes[attributeKey] = selectedFeaturesAttributes[attributeKey];
                }
              }
              this._modifyAttributesWithPresetValues(newAttributes, featureLayerInfo, copyAttributesInfo);
              for (var attrKey in newAttributes) {
                var attrValue = this._trimAttrValue(newAttributes[attrKey]);
                //if attributes value is required and its getting null or blank value
                //than increase count for that attribut
                if (this.requiredFieldsArray.indexOf(attrKey) !== -1 &&
                  newAttributes.hasOwnProperty(attrKey) &&
                  [null, undefined, ''].indexOf(attrValue) !== -1) {
                  this.nullAttributeCountRecord[attrKey] = this.nullAttributeCountRecord[attrKey] + 1;
                }
              }
              this.copyMultipleFeatureGraphics.push({
                attributes: newAttributes,
                geometry: selectedFeatureDetail.geometry
              });
            }));
            var requiredFieldsInfos = [];
            for (var attrKey in this.nullAttributeCountRecord) {
              //attribute found null in any of selected records feature
              //get its field info and push to requiredFieldsInfos array
              if (this.nullAttributeCountRecord[attrKey] > 0) {
                requiredFieldsInfos.push(presetUtils.getFieldInfoByFieldName(featureLayerInfo.fieldInfos, attrKey));
              }
            }

            //requiredFieldsInfos length is greater then zero means
            //required field has null or blank values in some or all records
            //so show that fields into required fields popup
            if (requiredFieldsInfos.length > 0) {
              this.loading.hide();
              var requiredFieldsObj = new requiredFields({
                requiredFieldsInfos: requiredFieldsInfos,
                nls: this.nls,
                presetUtils: presetUtils,
                AttributesCount: this.nullAttributeCountRecord
              });

              this.own(on(requiredFieldsObj, "providedValuesToRequiredFields",
                lang.hitch(this, function (providedRequiredAttrObj) {
                  this.loading.show();
                  var selectedFeatureArr = [];
                  array.forEach(this.copyMultipleFeatureGraphics, lang.hitch(this, function (graphic) {
                    var newAttributes = graphic.attributes;
                    for (var attrKey in newAttributes) {
                      var attrValue = this._trimAttrValue(newAttributes[attrKey]);
                      //if attributes value is required and selected feature has null value for that attribute or
                      //default vallue is also null then update attr value with user entered value
                      if (this.requiredFieldsArray.indexOf(attrKey) !== -1 &&
                        newAttributes.hasOwnProperty(attrKey) &&
                        [null, undefined, ''].indexOf(attrValue) !== -1) {
                        newAttributes[attrKey] = providedRequiredAttrObj[attrKey];
                      }
                    }
                    //perform feature creation
                    var newGraphic = new Graphic(graphic.geometry, null, newAttributes);
                    // store original attrs for later use
                    newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
                    selectedFeatureArr.push(newGraphic);
                  }));
                  this._applyEdits(selectedFeatureArr);
                })));
            } else {
              //all required fields has values so no need to show required fields
              //perform applyedits
              var selectedFeatureArr = [];
              array.forEach(this.copyMultipleFeatureGraphics, lang.hitch(this, function (graphic) {
                var newAttributes = graphic.attributes;
                //perform feature creation
                var newGraphic = new Graphic(graphic.geometry, null, newAttributes);
                // store original attrs for later use
                newGraphic.preEditAttrs = JSON.parse(JSON.stringify(newGraphic.attributes));
                selectedFeatureArr.push(newGraphic);
              }));
              this._applyEdits(selectedFeatureArr);
            }
          }), lang.hitch(this, function (error) {
            this.loading.hide();
            Message({
              message: this.nls.addingFeatureError + " " + error.message
            });
          }));
        }));
      },

      /**
       * This function is used to perform applyedits
       * @param {array} selectedFeatureArr: array of copymultiple features graphics
       */
      _applyEdits: function (selectedFeatureArr) {
        var selectedFeatures = [];
        this._copyFeaturesObj.setProgressPercentage(0);
        this._resetCopyFeatureListHeight();
        var deferredArr = this._createApplyEditsChunks(selectedFeatureArr);
        all(deferredArr).then(lang.hitch(this, function (results) {
          var featureAddingFailed, failedCountString;
          featureAddingFailed = 0;
          array.forEach(results, lang.hitch(this, function (result) {
            array.forEach(result, lang.hitch(this, function (rs) {
              selectedFeatures.push(rs);
              featureAddingFailed++;
            }));
          }));

          //if all features are success then destroy copy instance
          if (featureAddingFailed === 0) {
            this._removeCopyFeaturesInstance();
          }
          if (featureAddingFailed > 0) {
            //if some features are failed then recreate copy feature with failed features
            this._copyFeaturesObj.selectFeaturesToCopy(selectedFeatures);
            failedCountString = String.substitute(this.nls.addingFeatureErrorCount, {
              copyFeatureErrorCount: featureAddingFailed
            });
          }
          if (this.objectIdArr.length === 0 && featureAddingFailed > 0) {
            this.loading.hide();
            Message({
              message: this.nls.addingFeatureError + " " + failedCountString
            });
          } else if (this.objectIdArr.length > 0 && featureAddingFailed > 0) {
            this._promptUserToCopyFailedFeatures(failedCountString);
            this._selectFeaturesInTheLayer(this.objectIdArr);
          } else {
            this._selectFeaturesInTheLayer(this.objectIdArr);
          }
          this.loading.hide();
        }));
      },

      /**
       * This function is used to activate/de-activate custom select tool.
       */
      _changeSelectToolState: function (canClear) {
        this._getOrClearSelectableLayers(canClear === false ? false : true);
        if (this.currentDrawType === "SELECT" &&
          this.templatePicker &&
          this.templatePicker.getSelected() &&
          this._selectTool) {
          this._selectTool.activate();
        } else {
          if (this._selectTool && this._selectTool.isActive()) {
            this._selectTool.deactivate();
          }
        }
        //Disable the info window only when any of the select tool is being active
        //Otherwise just keep the info window enabled
        //Added the condition to resolve the issue #379
        if (this.currentDrawType) {
          //After deactivating select tool infowindow gets enabled
          //so disable it in any case when any of the tool is activated
          this.map.setInfoWindowOnClick(false);
        }
      },

      /**
       * This function is used to add the options in menuitem &
       * menuitem into menu object
       */
      _addMenuItem: function (options, menu, drawingOption) {
        options = lang.mixin(options, {
          onClick: lang.hitch(this, this._drawingToolClick(drawingOption, options))
        });
        var menuItem = new MenuItem(options);
        menu.addChild(menuItem);
      },

      /**
       * This function is used to hide copy feature div
       */
      _hideCopyFeatureDiv: function () {
        //hide copy features div
        domClass.add(this.copyFeaturesMainNode, "esriCTHidden");
        //show telmpatepicker div
        query(".jimu-widget-smartEditor .templatePickerMainDiv")[0].style.display = "block";
        //after hiding when we show template picker sometimes it becomes empty, hence update it
        //if (this.templatePicker) {
          //this.templatePicker.update();
        //}
        var selected = null;
        var selectedinfo = null;
        if (this.templatePicker && this.templatePicker.grid) {
          selected = this.templatePicker.getSelected();
          var currentRow = 0;
          if (this.templatePicker._selectedInfo && this.templatePicker._selectedInfo.hasOwnProperty("selRow")) {
            selectedinfo = this.templatePicker._selectedInfo;
            currentRow = (this.templatePicker._selectedInfo.selRow > 0)?this.templatePicker._selectedInfo.selRow - 1:this.templatePicker._selectedInfo.selRow;
            //this._selectTemplateIndex = currentRow;
          }
          this.templatePicker.update();
          this.templatePicker.grid.scrollToRow(currentRow);
          setTimeout(lang.hitch(this, function () {
            if (this.config.editor.hasOwnProperty("keepTemplateSelected")) {
              if (this.config.editor.keepTemplateSelected === true) {
                if (selected !== null) {
                  this.templatePicker.grid.store.fetch({
                    onComplete: lang.hitch(this, function(its) {
                      var found = this.templatePicker._locate(selected, selectedinfo, its);
                      var cellNode = found && this.templatePicker.grid.views.views[0].getCellNode(found[0], found[1]);
                      if (cellNode) {
                        /* fake a row click event to restore the selection
                          rows before lazy load maintain their selection, so only fake the click when it pass this point otherwise it toggles it off.
                          Don't know the threshold but used rowsPerPage property as the point to call fake click.
                        */
                        if(currentRow > (this.templatePicker.grid.rowsPerPage)) {
                          this.templatePicker._rowClicked({ cellNode: cellNode, rowIndex: found[0], cellIndex: found[1] }, true);
                        }
                      }

                    })
                  });
                }
              }
            }
            //Check if the template is selected and before scrolling it to the row
            //this._selectTemplateIndex = 0;
            //scroll again, cuz it seems to only load a portion.
            this.templatePicker.grid.scrollToRow(currentRow);
          }), 500);
        }
      },

      /**
       * This function is used to display copy feature div
       */
      _displayCopyFeatureDiv: function () {
        //hide telmpatepicker div
        query(".jimu-widget-smartEditor .templatePickerMainDiv")[0].style.display = "none";
        //show copy features div
        domClass.remove(this.copyFeaturesMainNode, "esriCTHidden");
        /**When changing the style in Web AppBuilder, for "DashboardTheme",
        the text inside the Smart Editor widget was disappearing**/
        if (this.appConfig.theme.name === "DashboardTheme") {
          var copyFeaturesMainNode, copyFeaturesMainBackgroundColor;
          copyFeaturesMainNode = query(".esriCTCopyFeaturesMainDiv", this.domNode)[0];
          copyFeaturesMainBackgroundColor = domStyle.get(copyFeaturesMainNode.parentElement).backgroundColor;
          domStyle.set(copyFeaturesMainNode, "backgroundColor", copyFeaturesMainBackgroundColor);
        }
      },

      /**
       * This function merge all the geometries and create only one single geometry.
       */
      _createSingleGeometry: function (allSelectedFeatures) {
        var singleFeature, geometryType;
        geometryType = allSelectedFeatures[0]._layer.geometryType;
        if (geometryType === "esriGeometryPolyline") {
          singleFeature = this._createSinglePolyline(allSelectedFeatures);
        } else if (geometryType === "esriGeometryPolygon") {
          singleFeature = this._createSinglePolygon(allSelectedFeatures);
        } else if (geometryType === "esriGeometryPoint") {
          //In case of points - multipPoint cannot be created so consider only first features geomtery
          singleFeature = allSelectedFeatures[0].geometry;
        }
        // needed to create a new graphic, so that its type property can be accessed in further functions
        return {
          "graphic": new Graphic(singleFeature, null, allSelectedFeatures[0].attributes),
          "layerObj": allSelectedFeatures[0].getLayer()
        };
      },

      /**
       * Creates only one sigle polyline form muitple features
       */
      _createSinglePolyline: function (allSelectedFeatures) {
        var polyline;
        polyline = new Polyline(
          new SpatialReference(allSelectedFeatures[0].geometry.spatialReference));
        array.forEach(allSelectedFeatures, lang.hitch(this, function (feature) {
          if (feature.geometry && feature.geometry.paths) {
            array.forEach(feature.geometry.paths, function (path) {
              polyline.addPath(path);
            });
          }

        }));
        return polyline;
      },

      /**
       * Creates only one sigle polygon form muitple features
       */
      _createSinglePolygon: function (allSelectedFeatures) {
        var polygon;
        polygon = new Polygon(
          new SpatialReference(allSelectedFeatures[0].geometry.spatialReference));
        array.forEach(allSelectedFeatures, lang.hitch(this, function (feature) {
          if (feature.geometry && feature.geometry.rings) {
            array.forEach(feature.geometry.rings, function (ring) {
              polygon.addRing(ring);
            });
          }
        }));
        return polygon;
      },

      /**
       * Once the features are selected and user clicks on create single/multiple feature button.
       * The features are added on the map. Its object ids are fetched and this features are selected in the layer.
       * @param {*} objectIdArr object id of the features that needs to be selected.
       */
      _selectFeaturesInTheLayer: function (objectIdArr) {
        var featureLayerInfo, featureLayerObject, selectedTemplate;
        selectedTemplate = this.templatePicker.getSelected() || this._currentSelectedTemplate;
        featureLayerObject = selectedTemplate.featureLayer;
        featureLayerInfo = this._getLayerInfoByID(featureLayerObject.id);
        this.map.infoWindow.hide();
        //Destroy all prev attributeInspectors
        array.forEach(this._attributeInspectorCollection, function (attributeInspector) {
          attributeInspector.destroy();
        });

        //If layer does not suppoert query, bypass the further process
        if (!featureLayerObject.isQueryable()) {
          this.loading.hide();
          return;
        }
        //reset array
        this._traversal = [];
        this._nodesCollection = [];
        this._paginationNodeCollection = [];
        this._buttonsWrapper = [];
        this._attributeInspectorCollection = [];
        this._relatedTablesInfo = {};
        // recreate the attr inspector if needed
        this._createAttributeInspector([featureLayerInfo], true, featureLayerObject);
        var layers = this.map.getLayersVisibleAtScale().filter(lang.hitch(this, function (lyr) {
          if (lyr.type && lyr.type === "Feature Layer" && lyr.url) {
            return array.some(this.config.editor.configInfos, lang.hitch(this, function (configInfo) {
              if (configInfo.layerId === lyr.id &&
                this._hasAnyEditableLayerInRelation([configInfo])) {
                return true;
              } else {
                return false;
              }
            }));
          } else {
            return false;
          }
        }));
        //remove no visible layers, for some reason the function above returns true
        layers = layers.filter(lang.hitch(this, function (lyr) {
          try {
            return this.map.getLayer(lyr.id).visible;
          } catch (ex) {
            console.log(ex + " Check for visible failed");
            return true;
          }
        }));
        var updateFeatures = [];
        this.currentFeature = null;
        this.geometryChanged = false;
        this.currentLayerInfo = null;
        // Query creation
        var selectQuery = new Query();
        var uniqueValue = Date.now();
        selectQuery.objectIds = objectIdArr;
        selectQuery.where = uniqueValue + " = " + uniqueValue;
        selectQuery.outFields = ["*"];
        // Selecting features in the layer
        featureLayerObject.selectFeatures(
          selectQuery,
          FeatureLayer.SELECTION_NEW,
          lang.hitch(this, function (features) {
            var validFeatures = [];
            array.forEach(features, function (feature) {
              var featureValid = true;
              feature.allowDelete = true;
              //The below is the preferred way, but this fails on public services and the user is logged in
              if (!featureLayerObject.getEditCapabilities({
                feature: feature
              }).canDelete) {
                feature.allowDelete = false;
              }
              if (featureValid === true) {
                feature.preEditAttrs = JSON.parse(JSON.stringify(feature.attributes));
                validFeatures.push(feature);
              }
            }, this);
            updateFeatures = updateFeatures.concat(validFeatures);
            if (updateFeatures.length > 0) {
              this.updateFeatures = updateFeatures;
              // When 'Remove feature from selection..' is checked, attribute inspector was displayed while copying features.
              // This won't happen when new feature is created. It stays on template picker page only.
              // To make this same behaviour while copying feature we need to check below condition.
              // If its false, then show attribute inspector, else stay on template picker page and clear all the existing selection.
              if (!this.config.editor.removeOnSave) {
                this._showTemplate(false);
              } else {
                //Added code to hide the loading indicator ahead of template picker as
                //the template picker was failing after calling clear selection method
                //To resolve the issue added patch to scroll to the bottom of the gird and then do the clear selection
                //once clear selection is done scroll back to first row
                this.loading.hide();
                if (!this._copyFeaturesObj) {
                  this._clearTemplateSelection();
                }
              }
            }
          }), lang.hitch(this, function () {
            Message({
              message: this.nls.selectingFeatureError
            });
            this.loading.hide();
          }));
      },

      _clearTemplateSelection: function () {
        var selected = null;
        var selectedinfo = null;
        if (this.templatePicker && this.templatePicker.grid) {
          selected = this.templatePicker.getSelected();
          var currentRow = this._selectTemplateIndex;
          if (this.templatePicker._selectedInfo && this.templatePicker._selectedInfo.hasOwnProperty("selRow")) {
            selectedinfo = this.templatePicker._selectedInfo;
            currentRow = (this.templatePicker._selectedInfo.selRow > 0)?this.templatePicker._selectedInfo.selRow - 1:this.templatePicker._selectedInfo.selRow;
            this._selectTemplateIndex = currentRow;
          }
          this.templatePicker.grid.scrollToRow(currentRow);
          setTimeout(lang.hitch(this, function () {
            if (!this.templatePicker) {
              return;
            }
            this.templatePicker.clearSelection();
            if (this.config.editor.hasOwnProperty("keepTemplateSelected")) {
              if (this.config.editor.keepTemplateSelected === true) {
                if (selected !== null) {
                  this.templatePicker.grid.store.fetch({
                    onComplete: lang.hitch(this, function(its) {
                      var found = this.templatePicker._locate(selected, selectedinfo, its);
                      var cellNode = found && this.templatePicker.grid.views.views[0].getCellNode(found[0], found[1]);
                      if (cellNode) {
                        /* fake a row click event to restore the selection
                          rows before lazy load maintain their selection, so only fake the click when it pass this point otherwise it toggles it off.
                          Don't know the threshold but used rowsPerPage property as the point to call fake click.
                        */
                        //if(this._selectTemplateIndex > (this.templatePicker.grid.rowsPerPage)) {
                          this.templatePicker._rowClicked({ cellNode: cellNode, rowIndex: found[0], cellIndex: found[1] }, true);
                          this._activateTemplateToolbar(null);
                        //}
                        this.templatePicker.grid.scrollToRow(currentRow);
                      }

                    })
                  });
                }
              }
            }
            //Check if the template is selected and before scrolling it to the row
            this._selectTemplateIndex = 0;
            //scroll again, cuz it seems to only load a portion.
            this.templatePicker.grid.scrollToRow(currentRow);
          }), 500);
        }
      },

      /**
       * This function is used to add label to the custom select option. It is added over here,
       * since the text of the label needs to be fetched from nls.
       */
      _updatedDrawingOptions: function () {
        for (var property in SEDrawingOptions) {
          array.forEach(SEDrawingOptions[property], lang.hitch(this, function (option, index) {
            if (option.hasOwnProperty("_drawType") && option._drawType === "SELECT") {
              SEDrawingOptions[property][index].label = this.nls.customSelectOptionLabel;
            }
          }));
        }
      },

      /**
       * This function is used to de-activate the tools when template selection is changed
       */
      _deactivateAllTools: function () {
        if (this.drawToolbar) {
          this.drawToolbar.deactivate();
        }
        if (this._selectTool) {
          this._selectTool.deactivate();
        }
      },

      /**
       * This function is used to check whether each field of each selected feature is present in
       * target & source layer info. If Yes, whether its datatype is matched. If Yes, only consider
       * those attributes and update the list of selected features.
       */
      _updateAllSelectedGeometries: function (allSelectedGeometries, targetLayerInfo, sourceLayerDetails) {
        var updatedFeatures = [];
        var targetInfoObj = this._getInfoDetails(targetLayerInfo);
        array.forEach(allSelectedGeometries, lang.hitch(this, function (selectedFeature) {
          var sourceLayer = selectedFeature.getLayer();
          if (sourceLayer === null || sourceLayer === "" || sourceLayer === undefined) {
            sourceLayer = sourceLayerDetails;
          }
          var sourceInfo = this._getLayerInfoByID(sourceLayer.id);
          //If source info is not found
          //Get the layer info from jimu layer infos class
          if (!sourceInfo) {
            if (this._jimuLayerInfos.getLayerOrTableInfoById(sourceLayer.id)) {
              sourceInfo = editUtils.createDefaultConfigInfo(this._jimuLayerInfos.getLayerOrTableInfoById(sourceLayer.id));
            } else if (this._jimuLayerInfos.getLayerInfoById(sourceLayer.id)) {
              //For KML type layers, "getLayerOrTableInfoById" doesnt return the layer info
              sourceInfo = editUtils.createDefaultConfigInfo(this._jimuLayerInfos.getLayerInfoById(sourceLayer.id));
            }
          }
          if(sourceInfo) {
          var sourceInfoObj = this._getInfoDetails(sourceInfo);
          var finalAttributeObj;
          finalAttributeObj = {};
          for (var attr in selectedFeature.attributes) {
            var keyInLowerCase = attr.toLowerCase();
            if (targetInfoObj.hasOwnProperty(keyInLowerCase) &&
              sourceInfoObj.hasOwnProperty(keyInLowerCase) &&
              targetInfoObj[keyInLowerCase].type === sourceInfoObj[keyInLowerCase].type) {
              finalAttributeObj[targetInfoObj[keyInLowerCase].name] = lang.clone(selectedFeature.attributes[attr]);
            }
          }
          updatedFeatures.push(new Graphic(selectedFeature.geometry, null, finalAttributeObj));
          }
        }));
        return updatedFeatures;
      },

      /**
       * This function is used to get the object which has a key value pair of field name & its datatype,
       * and this is created from info of the layer which is passed as a parameter.
       */
      _getInfoDetails: function (layerInfo) {
        var infoObj;
        infoObj = {};
        array.forEach(layerInfo.fieldInfos, lang.hitch(this, function (fieldInfo) {
          infoObj[fieldInfo.name.toLowerCase()] = {
            name: fieldInfo.name,
            type: fieldInfo.type
          };
        }));
        return infoObj;
      },

      /**********************
      * Code to support 508
      **********************
      */
      _setWidgetFirstFocusNode: function (screen, isFocusRequired) {
        var nodeObj = this._getFirstAndLastFocusNode(screen);
        if (!nodeObj.firstNode || !nodeObj.lastNode) {
          return;
        }
        utils.initFirstFocusNode(this.domNode, nodeObj.firstNode);
        utils.initLastFocusNode(this.domNode, nodeObj.lastNode);
        //Check if widget is set to open on app load and
        //accodingly set the focus
        if (isFocusRequired && utils.isAutoFocusFirstNodeWidget(this)) {
          utils.focusFirstFocusNode(this.domNode);
        }
      },

      _getFirstAndLastFocusNode: function (screen) {
        var nodeObj = {};
        if (screen === "templatePicker") {
          nodeObj.firstNode = this._getFirstFocusNodeForTemplatePickerScreen();
          nodeObj.lastNode = this._getLastFocusNodeForTemplatePickerScreen();
        }
        else if (screen === "AI") {
          if (this.attrInspector && this.attrInspector.attributeTable) {
          //Loop through all the attribute inspector fields and make sure all the disabled
          //atrributes are repalced with read only attribtues
          var node, listContainer, tabindexForControls;
          node = registry.findWidgets(this.attrInspector.attributeTable);
            if (this.attrInspector.domNode.parentElement &&
              this.attrInspector.domNode.parentElement.parentElement) {
              listContainer = query(".esriCTItemContent",
                this.attrInspector.domNode.parentElement.parentElement);
              if (listContainer && listContainer.length > 0) {
                if (domClass.contains(listContainer[0], "esriCTItemContentActive")) {
                  tabindexForControls = "0";
                } else {
                  tabindexForControls = "-1";
                }
              }
            this._setTabIndexToListItems(null, false, tabindexForControls);
          }
          array.forEach(node, lang.hitch(this, function (node) {
            if (node.focusNode && domAttr.get(node.focusNode, "disabled")) {
              domAttr.set(node.focusNode, "disabled", false);
              domAttr.set(node.focusNode, "readonly", true);
            }
            //Set aria-labels to all the controls
              if (node.focusNode && node.domNode.parentElement &&
                node.domNode.parentElement.parentElement) {
              var label = query(".atiLabel", node.domNode.parentElement.parentElement);
              if (label && label[0]) {
                var fieldLabel = label[0].innerHTML;
                //if field is required then skip the html text from being used in aria-label
                //and set aria-required property to true
                if (fieldLabel.indexOf('<a class="asteriskIndicator"> *</a>') >= 0) {
                  fieldLabel = fieldLabel.replace('<a class="asteriskIndicator"> *</a>', '');
                  domAttr.set(node.focusNode, "aria-required", "true");
                } else if (fieldLabel.indexOf('<span class="atiRequiredField"> *</span>') >= 0) {
                  fieldLabel = fieldLabel.replace('<span class="atiRequiredField"> *</span>', '');
                  domAttr.set(node.focusNode, "aria-required", "true");
                } else{
                  domAttr.set(node.focusNode, "aria-required", "false");
                }
                domAttr.set(node.focusNode, "aria-label", fieldLabel);
              }
            }
          }));
          }
          nodeObj.firstNode = this._getFirstFocusNodeForAttributeInspectorScreen();
          nodeObj.lastNode = this._getLastFocusNodeForAttributeInspectorScreen();
        } else if (screen === "copyFeatures") {
          nodeObj = this._getFirstAndLastFocusNodeForCopyFeaeturesScreen();
        } else if (screen === "noFeatures") {
          nodeObj.firstNode = this.noFeatureMessage;
          nodeObj.lastNode = this.noFeatureCancelBtn;
        }
        return nodeObj;
      },

      _getFirstFocusNodeForTemplatePickerScreen: function () {
        var firstNode;
        //Check if display preset option is configured to display at top
        if (this.config.editor.hasOwnProperty("displayPresetTop") &&
          this.config.editor.displayPresetTop === true &&
          domStyle.get(this.presetFieldsTableDiv, "display") === "block") {
          firstNode = registry.byId("savePresetValueSwitch").domNode;
        } else {
          //Decription is dispalyed it will be the first node
          if (domStyle.get(this.templateTitle, "display") === "block") {
            firstNode = this.templateTitle;
          } else if (this.config.editor.useFilterEditor) {
            //If filter editor is enabled, set its dom node as the first focus node
            firstNode = this._filterEditor.selectDropDown;
            //If filter display shape selector is enabled and copy featues is enabled,
            //set its dom node as the first focus node
          } else if (this.config.editor.displayShapeSelector === true ||
            (this.config.editor.hasOwnProperty("createNewFeaturesFromExisting") &&
              (this.config.editor.createNewFeaturesFromExisting === true))) {
            firstNode = this.drawingTool.focusNode;
            //If auto save functionality is enabled,
            //set its dom node as the first focus node
          } else if (this.config.editor.autoSaveEdits) {
            firstNode = registry.byId("autoSaveSwitch").domNode;
            //If preset table is enable,
            //set its dom node as the first focus node
          } else if (domStyle.get(this.presetFieldsTableDiv, "display") === "block") {
            firstNode = registry.byId("savePresetValueSwitch").domNode;
          }
        }
        return firstNode;
      },

      _getLastFocusNodeForTemplatePickerScreen: function () {
        var lastNode;
        //Check if display preset option is configured to display at botto,
        if (this.config.editor.hasOwnProperty("displayPresetTop") &&
          this.config.editor.displayPresetTop === false &&
          domStyle.get(this.presetFieldsTableDiv, "display") === "block") {
            //If preset is enabled,
            //check for all the preset groups
            //and accordingly set the last focus node
          var presetValueTable = query("#eePresetValueBody")[0];
          if (presetValueTable) {
            var inputElements = query(".preset-value-editable .ee-inputField");
            inputElements.reverse();
            array.some(inputElements, lang.hitch(this, function (ele) {
              if (!domClass.contains(ele.parentElement.parentElement, "esriCTHidden")) {
                if (ele.parentElement.children.length > 1) {
                  lastNode = ele.parentElement.children[1];
                } else {
                  lastNode = ele;
                }
                return true;
              }
            }));
          }
          //If all the preset groups are hidden
          //then set the last node as preset checkbox node
          if (!lastNode) {
            lastNode = registry.byId("savePresetValueSwitch").domNode;
          }
        } else if (this.config.editor.autoSaveEdits && !this._creationDisabledOnAll) {
          lastNode = registry.byId("autoSaveSwitch").domNode;
          //If preset table is enable,
          //set its dom node as the last focus node
        } else if ((this.config.editor.displayShapeSelector === true ||
          (this.config.editor.hasOwnProperty("createNewFeaturesFromExisting") &&
            (this.config.editor.createNewFeaturesFromExisting === true))) &&
          !this._creationDisabledOnAll) {
          lastNode = this.drawingTool.focusNode;
          //If auto save functionality is enabled,
          //set its dom node as the last focus node
        } else if (this.config.editor.useFilterEditor && !this._creationDisabledOnAll) {
          lastNode = this._filterEditor.filterTextBox;
          //If filter display shape selector is enabled and copy featues is enabled,
          //set its dom node as the last focus node
        } else if (domStyle.get(this.templateTitle, "display") === "block") {
          //Decription is dispalyed it will be the last node
          lastNode = this.templateTitle;
        } else if (domStyle.get(this.presetFieldsTableDiv, "display") === "block") {
          //Check if preset is enabled
          //accodingly set the last  focus node
          var presetValueTable = query("#eePresetValueBody")[0];
          if (presetValueTable) {
            var inputElements = query(".preset-value-editable .ee-inputField");
            inputElements.reverse();
            array.some(inputElements, lang.hitch(this, function (ele) {
              if (!domClass.contains(ele.parentElement.parentElement, "esriCTHidden")) {
                if (ele.parentElement.children.length > 1) {
                  lastNode = ele.parentElement.children[1];
                } else {
                  lastNode = ele;
                }
                return true;
              }
            }));
          }
          if (!lastNode) {
            lastNode = registry.byId("savePresetValueSwitch").domNode;
          }
        }
        return lastNode;
      },

      _getFirstFocusNodeForAttributeInspectorScreen: function () {
        var firstNode;
        //Check the position of action buttons
        if (this.config.editor.showActionButtonsAbove) {
          firstNode = this.cancelButton;
        } else {
          //Check number of features in current Attribute Inspector
          if (this.attrInspector._numFeatures === 1) {
            var itemNode, layerDescriptionNode;
            itemNode = query(".esriCTItem", this.contentWrapper);
            layerDescriptionNode = query(".editDescription", this.contentWrapper);
            //If only one feature is found and no related features are present then
            //set focus to items list node as a first focus node
            //else set first control as the firs node in AI
            if (itemNode && itemNode.length > 0 &&
              !domClass.contains(itemNode[0], "esriCTDisableToggling")) {
              firstNode = itemNode[0].children[0];
            } else if ( layerDescriptionNode && layerDescriptionNode.length > 0) {
              firstNode = layerDescriptionNode[0];
            }
            else if (this.attrInspector && this.attrInspector.attributeTable) {
              var nodes = registry.findWidgets(this.attrInspector.attributeTable);
              array.some(nodes, lang.hitch(this, function (node) {
                if (node.focusNode &&
                  !domClass.contains(node.domNode.parentElement.parentElement, "hideField")) {
                  firstNode = node.focusNode;
                  return true;
                }
              }));
              //If attachment editor form control is enabled
              if (!firstNode && this.attrInspector._attachmentEditor &&
                domStyle.get(this.attrInspector._attachmentEditor.domNode, "display") === "block") {
                var attachmentList = this.attrInspector._attachmentEditor._attachmentList.childNodes;
                if (attachmentList && attachmentList.length > 0 && attachmentList[0].children) {
                  firstNode = attachmentList[0].children[0];
                } else if (!firstNode) {
                  if (this.attrInspector._attachmentEditor._uploadForm &&
                    domStyle.get(this.attrInspector._attachmentEditor._uploadForm, "display") === "block") {
                    firstNode = this.attrInspector._attachmentEditor._uploadForm.children[0];
                  }
                }
              }
              //If attachment uplaoder form control is enabled
              if (!firstNode && this.attrInspector._attachmentUploader &&
                this.attrInspector._attachmentUploader.attachmentUploader) {
                var uplaoderFirstNode;
                uplaoderFirstNode =
                  query("form", this.attrInspector._attachmentUploader.attachmentUploader);
                if (uplaoderFirstNode && uplaoderFirstNode.length > 0) {
                  uplaoderFirstNode = uplaoderFirstNode[0];
                  if (domStyle.get(uplaoderFirstNode.children[0], "display") !== "none") {
                    firstNode = uplaoderFirstNode.children[0];
                  } else {
                    firstNode = uplaoderFirstNode.children[1];
                  }
                }
              }
              //If all the fields in the AI are disabled or displayed off
              if (this._traversal.length < 2 && this._editGeomSwitch.domNode &&
                !firstNode && domStyle.get(this._editGeomSwitch.domNode.parentNode, "display") === "block") {
                firstNode = this._editGeomSwitch.domNode;
              }
              //If all the fields inside AI are disabled and edit geo switch is disabled
              if (!firstNode) {
                firstNode = this.cancelButton;
              }
            }
          } else if (this.attrInspector._numFeatures > 1) {
            //If more then one feature is present in AI,
            //first nav button as the first focus node
            var navButtonWidgets = registry.findWidgets(this.attrInspector.navButtons);
            firstNode = navButtonWidgets[0].focusNode;
          }
        }
        return firstNode;
      },

      _getLastFocusNodeForAttributeInspectorScreen: function () {
        var lastNode;
        //If action buttons acre configured to show at the bottom
        //then check for the last node in buttons container
        if (!this.config.editor.showActionButtonsAbove) {
          var saveBtn = query(".saveButton", this.buttonHeader)[0];
          if (saveBtn && domClass.contains(saveBtn, "jimu-state-disabled")) {
            //if delete button is displayed then it will be the last node else cancle button
            var deleteButton = query(".deleteButton", this.buttonHeader);
            if (deleteButton.length > 0) {
              deleteButton = deleteButton[0];
              if (domStyle.get(deleteButton, "display") === "block") {
                lastNode = deleteButton;
              } else {
                lastNode = this.cancelButton;
              }
            } else {
              lastNode = this.cancelButton;
            }
            } else {
              lastNode = saveBtn;
            }
          }
        //Check if related layer item exist and it is open
        //then set the last node in related item list
        var relatedTitleContainer, detailsContainer, relatedItemDOM;
        detailsContainer = query(".detailsContainer", this.mainContainer);
        detailsContainer = array.filter(detailsContainer, function (item) {
          if (!domClass.contains(item, "hidden"))
            return item;
        });
        relatedItemDOM = query(".esriCTRelatedItemContent", detailsContainer[0]);
        if (!lastNode && relatedItemDOM && relatedItemDOM.length > 0) {
          if (domClass.contains(relatedItemDOM[0], "esriCTItemContentActive")) {
            lastNode = query(".esriCTLastRelatedItem", relatedItemDOM[0])[0];
          } else {
            relatedTitleContainer = query("[isrelateditem=true]", this.mainContainer);
            if (relatedTitleContainer && relatedTitleContainer.length > 0) {
              lastNode = relatedTitleContainer[relatedTitleContainer.length - 1];
            }
          }
        }
        //Check if the actions buttons are enabled
        //then set the last node
        if (!lastNode) {
          var actionButtons;
          actionButtons = query(".esriCTActionButtons", this.attrInspector.domNode);
          array.forEach(actionButtons, lang.hitch(this, function (button) {
            if (domStyle.get(button, "display") === "block") {
              lastNode = button;
            }
          }));
        }
        //If geometery edit switch is enabled
        //then set last focus node to the domnode of geometry eidt switch
        if (this._traversal.length < 2 && this._editGeomSwitch.domNode &&
          !lastNode && domStyle.get(this._editGeomSwitch.domNode.parentNode, "display") === "block") {
          lastNode = this._editGeomSwitch.domNode;
        }
        //If attachment upload form control is enabled
        //then last focus node to upload form control
        if (!lastNode && this.attrInspector._attachmentEditor &&
          domStyle.get(this.attrInspector._attachmentEditor.domNode, "display") === "block") {
          if (this.attrInspector._attachmentEditor._uploadForm &&
            domStyle.get(this.attrInspector._attachmentEditor._uploadForm, "display") === "block") {
            lastNode = this.attrInspector._attachmentEditor._uploadForm;
          } else {
            //If upload form is disabled and attachments are shown
            //then set the last attachment node as last attachment
            var attachmentList = this.attrInspector._attachmentEditor._attachmentList.childNodes;
            if (attachmentList && attachmentList.length > 0) {
              var lastAttachmentNode = attachmentList[attachmentList.length - 1];
              if (domStyle.get(lastAttachmentNode.children[1], "display") === "block") {
                lastNode = lastAttachmentNode.children[1];
              } else {
                lastNode = lastAttachmentNode.children[0];
              }
            }
          }
        }
        //Loop through all the widget controls in AI
        //then set the last focus node accordingly
        if (!lastNode && this.attrInspector && this.attrInspector.attributeTable) {
          var nodes = registry.findWidgets(this.attrInspector.attributeTable);
          nodes.reverse();
          array.some(nodes, lang.hitch(this, function (node) {
            if (node.focusNode &&
              !domClass.contains(node.domNode.parentElement.parentElement, "hideField")) {
              lastNode = node.focusNode;
              return true;
            }
          }));
        }
        //Check if more than one featurs are present
        //then set the last focus node
        if (!lastNode && this.attrInspector._numFeatures > 1) {
          //If more then one feature is present in AI,
          //first nav button as the first focus node
          var navButtonWidgets = registry.findWidgets(this.attrInspector.navButtons);
          lastNode = navButtonWidgets[navButtonWidgets.length - 1].focusNode;
        }
        //Check position of save and clear button and set the last focus node
        //then set the last focus node accordingly
        if (!lastNode && this.config.editor.showActionButtonsAbove) {
          var saveBtn = query(".saveButton", this.buttonHeader)[0];
          if (domClass.contains(saveBtn, "jimu-state-disabled")) {
            lastNode = this.cancelButton;
          } else {
            lastNode = saveBtn;
          }
        }
        return lastNode;
      },

      _getFirstAndLastFocusNodeForCopyFeaeturesScreen: function () {
        return {
          "firstNode": this._copyFeaturesObj.warningMessage,
          "lastNode": this._copyFeaturesObj.cancelBtn
        };
      },

      /* Value Picker functions */

      _canShowValuePicker: function(){
        var showValuePicker;
        //check if show value picker is configured, if notthe by default set showValuepicker to false
        if(this.config.editor.hasOwnProperty("showValuePicker")){
          showValuePicker = this.config.editor.showValuePicker;
        } else{
          showValuePicker = false
        }
        //set showValuePicker to false if autoSave mode is on
        if (this.config.editor.hasOwnProperty("autoSaveEdits") && this._autoSaveRuntime === true) {
          showValuePicker = false;
        }
        return showValuePicker;
      },

      _addValuePicker: function (copyAttributesInfo) {
        var attrTableRows, fieldLabels = {}, disabledFields = [];
        //before adding new value picker buttons remove previous value picker buttons
        this._removePreviousValuePickerButtons();
        //if multiple values info is not found or if cannot show value picker then return
        if (!copyAttributesInfo.multipleValues || !this._canShowValuePicker()) {
          this.currentMultipleValues = null;
          copyAttributesInfo.multipleValues = null;
          return;
        }
        //store multiple values for the current feature
        this.currentMultipleValues = copyAttributesInfo.multipleValues;
        //get all rows from AI table and process only those fields which have multiple values
        attrTableRows = query("tr", this.attrInspector.attributeTable);
        array.forEach(attrTableRows, lang.hitch(this, function (row) {
          var field = domAttr.get(row.children[0], "data-fieldname");
          //if field found in multiple values
          if (field && this.currentMultipleValues.hasOwnProperty(field)) {
            //get the field label shown in AI row
            var fieldLabel = domAttr.get(row.children[0], "innerHTML");
            fieldLabels[field] = fieldLabel;
            var fieldDijit = this._getCurrentFieldDijit(field);
            var isFieldDisabled = false;
            //reduce the width of the dijit in AI and check if field is disabled
            if (fieldDijit) {
              if (fieldDijit.length > 1) {
                isFieldDisabled = domClass.contains(fieldDijit[0].domNode, "dijitDisabled");
                domClass.add(fieldDijit[0].domNode, "multipleValueDijit");
                domClass.add(fieldDijit[1].domNode, "multipleValueDijit");
              } else {
                isFieldDisabled = domClass.contains(fieldDijit.domNode, "dijitDisabled");
                domClass.add(fieldDijit.domNode, "multipleValueDijit");
              }
            }
            //create a list of disabled fields so that these fields should not be shown in popup
            if (isFieldDisabled) {
              disabledFields.push(field);
            }
            //create value picker for the field in AI
            this._createValuePickerButton(field, fieldLabel, row.children[1], isFieldDisabled, fieldDijit);
          }
        }));
        //if all fields are disabled then dont show value picker
        if (disabledFields.length !== Object.keys(fieldLabels).length) {
          //Show value picker popup for all the fields which have multiple values
          this._showValuePicker(null, fieldLabels, disabledFields);
        }
      },

      _removePreviousValuePickerButtons: function () {
        //remove all value picker buttons
        query(".esriCTValuePickerButton", this.attrInspector.attributeTable).forEach(domConstruct.destroy);
        //remove the multipleValueDijit class from all dijit
        query(".multipleValueDijit", this.attrInspector.attributeTable).removeClass("multipleValueDijit");
      },

      _createValuePickerButton: function (field, fieldLabel, container, isFieldDisabled, fieldDijit) {
        var fieldLabels = {}, classNames = "esriCTValuePickerButton";
        if(isFieldDisabled){
          classNames +=" disabled";
        }
        //create field label object which will be used when valuePicker button is clicked
        fieldLabels[field] = fieldLabel;
        var valuePickerButton = domConstruct.create("div", {
          "class": classNames,
          "tabindex": 0,
          "role": "button",
          "aria-label": this.nls.valuePicker.buttonTooltip
        }, container);
        this.own(on(valuePickerButton, "click", lang.hitch(this, function () {
          if (!domClass.contains(valuePickerButton, "disabled")) {
            this._showValuePicker(field, fieldLabels, [], fieldDijit);
          }
        })));
        this.own(on(valuePickerButton, "keydown", lang.hitch(this, function (evt) {
          if ((evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) &&
            !domClass.contains(valuePickerButton, "disabled")) {
            this._showValuePicker(field, fieldLabels, [], fieldDijit);
          }
        })));
      },

      /**
       * Show value picker popup and update values in AI on OK click
       * @param {string} showOnlyForField - field name for which popup needs to be shown
       * @param {Object} fieldLabels
       */
      _showValuePicker: function (showOnlyForField, fieldLabels, disabledFields, fieldDijit) {
        //show value picker when currentMultipleValues is valid
        if (this.currentMultipleValues) {
          //hide the previous value picker if it exist
          if(this.valuePicker){
            this.valuePicker.hideDialog();
          }
          //create new instance on value picker
          this.valuePicker = new ValuePicker({
            nls: this.nls,
            multipleValues: this.currentMultipleValues,
            layerInfo: this.currentLayerInfo,
            showForField: showOnlyForField,
            fieldLabels: fieldLabels,
            disabledFields: disabledFields
          });
          //If value picker is shown only for a single field then set the selected value
          if (showOnlyForField) {
            this.valuePicker.setValue(this.valuePicker.showForField, fieldDijit);
          }
          //on value select, update it in the AI
          this.own(on(this.valuePicker, "value-selected", lang.hitch(this, function (selectedValues) {
            //change canAutoUpdate flag only if autoSaveAttrUpdates is on
            if (this.config.editor.hasOwnProperty("autoSaveAttrUpdates") &&
              this.config.editor.autoSaveAttrUpdates) {
              this.canAutoUpdate = false;
            }
            var attrTableRows = query("tr", this.attrInspector.attributeTable);
            array.forEach(attrTableRows, lang.hitch(this, function (row) {
              var field = domAttr.get(row.children[0], "data-fieldname");
              if (field && selectedValues.hasOwnProperty(field)) {
                this._setValuesInDijits(field, selectedValues[field]);
              }
            }));
            //if autoSaveAttrUpdates is then save feature automatically
            if (this.config.editor.hasOwnProperty("autoSaveAttrUpdates") && this.config.editor.autoSaveAttrUpdates) {
              setTimeout(lang.hitch(this, function () {
                //if selected feature is new feature then dont save feature automatically
                if ((this.currentLayerInfo && !this.currentLayerInfo.isCache)) {
                  this._autoSaveFeatureEdits();
                }
                this.canAutoUpdate = true;
              }), 100);
            }
          })));
        }
      },

      /**
      * This function is used to
      * filter the required fields from all fields
      * @param {array} fieldArray: array of fields
      */
      _getRequiredFields: function (fieldArray) {
        var fieldOptions = [];
        array.forEach(fieldArray, lang.hitch(this, function (field) {
          //Filter fields based on type
          if (!field.nullable && field.editable) {
            fieldOptions.push(field.name);
          }
        }));
        return fieldOptions;
      },

      /**
       * This function is used to trim attr value if it is string
       */
      _trimAttrValue: function (attrValue) {
        var isString = typeof (attrValue) === "string" ? true : false;
        var value = isString ? attrValue.trim() : attrValue;
        return value;
      },

      /**
       * This function is used to refresh the layer name in panel
       * once the current feature is removed from the AI
       */
      _refreshLayerTitle: function () {
        var layerNode = query(".esriCTItemTitle", this.domNode)[0];
        if (this.attrInspector._currentFeature) {
          domAttr.set(layerNode, "innerHTML", utils.sanitizeHTML(this.attrInspector._currentFeature._layer.name));
        }
      },

      /**
       * If MyLocation widget is configured and visible then get the curernt location from MyLocation widegt
       * else fetch the current location by creating js api Locate button instance
       */
      _getNewCurrentLocation: function () {
        var getDataFromMyLocationWidget = false;
        if (this.appConfig && this.appConfig.widgetOnScreen &&
          this.appConfig.widgetOnScreen.widgets && this.appConfig.widgetOnScreen.widgets.length > 0) {
          array.some(this.appConfig.widgetOnScreen.widgets, lang.hitch(this, function (widgetInfo) {
            if (widgetInfo.hasOwnProperty('name') && widgetInfo.name === "MyLocation" &&
              widgetInfo.hasOwnProperty('visible') && widgetInfo.visible === true) {
              this.publishData({ "type": "getCurrentLocation" });
              getDataFromMyLocationWidget = true;
              return true;
            }
          }));
        }
        if (!getDataFromMyLocationWidget) {
          this._fetchCurrentLocation();
        } else {
          //if MyLocation widget is confugured but if we dont recevie the result in 1000msec ,
          //consider MyLocation is not publishing result and fetch our current location locally
          setTimeout(lang.hitch(this, function () {
            var def;
            if (this._moveToGPSDef) {
              def = this._moveToGPSDef;
            } else if (this._myLocationInfoDef) {
              def = this._myLocationInfoDef;
            }
            if (def && !def.isResolved()) {
              this._fetchCurrentLocation();
            }
          }), 1000);
        }
      },

      /**
       * Fetch the current location by creating js api Locate button instance
       */
      _fetchCurrentLocation: function () {
        // current location button object
        var geoLocateButton = new LocateButton({
          map: this.map,
          highlightLocation: false,
          setScale: false,
          centerAt: false,
          geolocationOptions: { enableHighAccuracy: true }
        });
        this.own(on(geoLocateButton, 'locate', lang.hitch(this, function (currentLocation) {
          //Resolve the respective deferred object
          if (this._moveToGPSDef) {
            this._moveToGPSDef.resolve(currentLocation);
          }
          if (this._myLocationInfoDef) {
            this._myLocationInfoDef.resolve(currentLocation);
          }
          setTimeout(lang.hitch(this, function () {
            geoLocateButton.destroy();
          }), 50);
        })));
        this.own(on(geoLocateButton, 'load', lang.hitch(this, function () {
          geoLocateButton.locate();
        })));
        geoLocateButton.startup();
      },

      /**
       * This function is used to get output string based on selected coordinatesSystem
       */
      _getOutputString: function (coordinatesSystem, copyAttrInfo, field) {
        var value;
        if (coordinatesSystem !== "LatLong") {
          if (field === "xy") {
            value = copyAttrInfo.x + " " + copyAttrInfo.y;
          } else {
            value = copyAttrInfo.y + " " + copyAttrInfo.x;
          }
        } else {
          if (field === "xy") {
            value = copyAttrInfo.x + " " + copyAttrInfo.y;
          } else {
            value = copyAttrInfo.y + " " + copyAttrInfo.x;
          }
        }
        return value;
      },

      /**
       * Copying large number of features apply edits operation gets fail
       * because there any many records and hence chunks method is implemented where records are updated in chunks
       */
      _createApplyEditsChunks: function (featureArray) {
        var features, originalFeaturesChunk, chunksDef, selectedTemplate,
          deferredArr, chunk, iteration;
        this.objectIdArr = [];
        deferredArr = [];
        chunk = this._chunkSizeForPointGeometry;
        selectedTemplate = this.templatePicker.getSelected() || this._currentSelectedTemplate;
        //For polygon layers reduce the chunk size to 10
        //This is a global variable and value can be at the time of variable initialization
        //This will make sure the limited data is being sent to apply edits
        if (selectedTemplate.featureLayer &&
          selectedTemplate.featureLayer.geometryType !== "esriGeometryPoint") {
          chunk = this._chunkSizeForPolygonAndLineGeometry;
        }
        iteration = Math.ceil(featureArray.length / chunk);
        this.processedChunksCount = 0;
        for (var index = 0; index < iteration; index++) {
          features = featureArray.splice(0, chunk);
          originalFeaturesChunk = this.allSelectedGeometries.splice(0, chunk);
          chunksDef = this._performApplyEditsOnChunks(iteration, features, originalFeaturesChunk);
          deferredArr.push(chunksDef);
        }
        return deferredArr;
      },

      /**
       * This function is used to perform applyedits on feature chunks
       * @param {array} features: array of copied features graphics
       * @param {array} originalFeaturesChunk: array of map features graphics
       */
      _performApplyEditsOnChunks: function (iteration, features, originalFeaturesChunk) {
        var failedResults = [], selectedTemplate;
        var def = new Deferred();
        selectedTemplate = this.templatePicker.getSelected() || this._currentSelectedTemplate;
        selectedTemplate.featureLayer.applyEdits(features, null, null,
          lang.hitch(this, function (results) {
            this._calculateProgressPecentage(iteration);
            array.forEach(results, lang.hitch(this, function (rs, i) {
              if (rs.success) {
                this.objectIdArr.push(rs.objectId);
                //remove highlight on successful feature in map
                this._copyFeaturesObj.highlightGraphicsLayer.remove(originalFeaturesChunk[i]);
              } else {
                failedResults.push(originalFeaturesChunk[i]);
              }
            }));
            def.resolve(failedResults);
          }), lang.hitch(this, function (err) {
            console.log(err);
            this._calculateProgressPecentage(iteration);
            def.resolve(originalFeaturesChunk);
          }));
        return def.promise;
      },

      /**
       * This function is used to calculate chunks progrees percentage
       */
      _calculateProgressPecentage: function (iteration) {
        this.processedChunksCount = this.processedChunksCount + 1;
        var progressPercentage = this.processedChunksCount * 100 / iteration;
        this._copyFeaturesObj.setProgressPercentage(progressPercentage);
        //ProgressPercentage is 100 then progress Bar will be hidden
        //hence again reset height of feature list container
        if (progressPercentage >= 100) {
          this._resetCopyFeatureListHeight();
        }
      },

      /**
       * This function is used to call AI save button click programitically
       */
      _autoSaveFeatureEdits: function () {
        var saveBtn = query(".saveButton", this.buttonHeader)[0];
        if (!saveBtn) {
        } else {
          on.emit(saveBtn, 'click', { cancelable: true, bubbles: true });
        }
      },

      /**
       * This function is used to show msg when some features are failed
       * so user can copy those features that are left or cancel
       */
      _promptUserToCopyFailedFeatures: function (msg) {
        var copyFeatureFailedPopup = new Popup({
          "titleLabel": this.nls.copyFeatureFailedPopupTitle,
          "width": 485,
          "maxHeight": 250,
          "autoHeight": true,
          "class": this.baseClass,
          "content": msg,
          "buttons": [{
            label: this.nls.no,
            onClick: lang.hitch(this, function () {
              copyFeatureFailedPopup.close();
            })
          }, {
            label: this.nls.tryAgainButtonLabel,
            onClick: lang.hitch(this, function () {
              if (this._copyFeaturesObj) {
                this._copyFeaturesObj.createMultipleFeaturesBtn.click();
              }
              copyFeatureFailedPopup.close();
            })
          }]
        });
      }
    });
  });
