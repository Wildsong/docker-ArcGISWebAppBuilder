define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./reviewResults.html',
  'dojo/_base/lang',
  'jimu/dijit/FeatureSetChooserForMultipleLayers',
  'dojo/dom-attr',
  'jimu/utils',
  'dojo/query',
  'dojo/dom-class',
  'dojo/Evented',
  'dojo/keys',
  'dojo/on',
  "dijit/focus",
  'dijit/form/TextBox'
], function (
  declare,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  lang,
  FeatureSetChooserForMultipleLayers,
  domAttr,
  utils,
  query,
  domClass,
  Evented,
  keys,
  on,
  focusUtil
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-public-notification-reviewResults',

    constructor: function (options) {
      if (options) {
        lang.mixin(this, options);
      }
    },

    startup: function () {
    },

    postCreate: function () {
      this.clearBtn.innerHTML = this.nls.common.clear;
      domAttr.set(this.clearBtn, "aria-label", this.nls.common.clear);
      // Text for download button
      this.reviewResultsDownloadBtn.innerHTML = window.jimuNls.layerInfosMenu.itemDownload;
      domAttr.set(this.reviewResultsDownloadBtn, "aria-label", window.jimuNls.layerInfosMenu.itemDownload);
      this.addresseeTextbox.set("value", this.addresseeLayer.title);
      this.formatSelect.addOption(this.formselectOptions);
      this._eventListners();
      this._createSelectTool();
    },

    _eventListners: function () {
      this.own(on(this.reviewResultsDownloadBtn, "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          this._onDownloadBtnClicked();
        }
      })));
      this.own(on(this.clearBtn, "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          this.emit('clear');
        }
      })));
    },

    /**
     * This function is used to create select tool
     */
    _createSelectTool: function () {
      //geoTypes: [this._getGeoType()], - as done previously, need to be confirmed. :TODO
      this._selectTool = new FeatureSetChooserForMultipleLayers({
        geoTypes: this.geoTypes,
        map: this.map,
        updateSelection: true,
        fullyWithin: false
      }, this.selectToolDiv);
      this._selectTool.startup();
      var selectButton = query('.draw-item-btn', this._selectTool.domNode)[0];
      domClass.add(selectButton, "esriCTselectToolDiv");
      var selectToolClearButton = query('.btn-clear', this._selectTool.domNode)[0];
      domClass.add(selectToolClearButton, "hidden");
      this._onUnloading();
    },

    /**
     * This function is used to listen click event of clear button
     */
    _onClearBtnClicked: function () {
      this.emit('clear');
    },

    /**
     * This function is used to get geotype for select tool
     */
    _getGeoType: function () {
      var geoType;
      switch (this.addresseeLayer.layerObject.geometryType) {
        case "esriGeometryPolygon":
          geoType = "POLYGON";
          break;
        case "esriGeometryPolyline":
          geoType = "POLYLINE";
          break;
        case "esriGeometryPoint":
          geoType = "POINT";
          break;
        default:
          geoType = "EXTENT";
          break;
      }
      return geoType;
    },

    /**
     * This function is used to emit the unloading event when selection gets completed
     */
    _onUnloading: function () {
      if (this._selectTool !== '' && this._selectTool !== null && this._selectTool !== undefined) {
        this.own(on(this._selectTool, 'unloading', lang.hitch(this, function () {
          this.emit("unloadingComplete");
        })));
      }
    },

    /**
     * This function is used to set the array of feature layers to the select tool
     */
    resetFeatureLayerToSelectTool: function (featureLayerObj) {
      var featureLayerArray;
      featureLayerArray = [];
      featureLayerArray.push(featureLayerObj);
      if (this._selectTool !== '' && this._selectTool !== null && this._selectTool !== undefined) {
        this._selectTool.setFeatureLayers(featureLayerArray);
      }
    },

    /**
     * This function is used to deactivate the select tool
     */
    _deactivateSelectTool: function () {
      if (this._selectTool) {
        this._selectTool.deactivate();
      }
    },

    /**
     * This function is used to emit that download button is clicked
     */
    _onDownloadBtnClicked: function () {
      this.emit("onDownloadBtnClicked");
    },

    /**
     * This function is used to set first and last node
     */
    setAccessibility: function () {
      this._setFirstFocusNode();
      this._setLastFocusNode();
      this.setFocus();
    },

    /**
     * This function is used to set the first focus node
     */
    _setFirstFocusNode: function () {
      var selectButton = query('.draw-item-btn', this._selectTool.domNode);
      if (selectButton !== '' && selectButton !== null && selectButton !== undefined) {
        utils.initFirstFocusNode(this.domNode, selectButton[0]);
      }
    },

    /**
     * This function is used to set the last focus node
     */
    _setLastFocusNode: function () {
      utils.initLastFocusNode(this.domNode, this.reviewResultsDownloadBtn);
    },

    /**
     * This function is used to focus on first focus node
     */
    setFocus: function () {
      utils.focusFirstFocusNode(this.domNode);
    },

    /**
     * This function is used to set the focus on the download button
     */
    setFocusOnDownloadButton: function () {
      focusUtil.focus(this.reviewResultsDownloadBtn);
    },

    /**
     * This function is used to update the aria-label fo the download button
     */
    updateDownloadBtnAriaLabel: function (message) {
      var downloadAriaLabel;
      if (message) {
        downloadAriaLabel = message + " " + this.reviewResultsDownloadBtn.innerHTML;
      } else {
        downloadAriaLabel = this.reviewResultsDownloadBtn.innerHTML;
      }
      domAttr.set(this.reviewResultsDownloadBtn, "aria-label", downloadAriaLabel);
    }
  });
});