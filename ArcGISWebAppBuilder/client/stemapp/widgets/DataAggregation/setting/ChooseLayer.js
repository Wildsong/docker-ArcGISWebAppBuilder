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
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/text!./ChooseLayer.html',
  'dijit/_TemplatedMixin',
  'jimu/BaseWidgetSetting',
  'jimu/dijit/Popup',
  'jimu/dijit/LayerChooserFromMapWithDropbox',
  'dojo/Evented'],
  function (
    declare,
    lang,
    array,
    on,
    template,
    _TemplatedMixin,
    BaseWidgetSetting,
    Popup,
    LayerChooserFromMapWithDropbox,
    Evented) {
    return declare([BaseWidgetSetting, Evented, _TemplatedMixin], {
      baseClass: "jimu-widget-critical-facilities-setting-chooseLayer",
      templateString: template,
      layerSelector: null,
      chooseFromLayerPopup: null,

      postCreate: function () {
        this.inherited(arguments);
        this._createPopUp();
      },

      /**
       * this function is used to create layerSelectors in popup
       */
      _addLayerSelectors: function () {
        this.layerSelector =
          new LayerChooserFromMapWithDropbox({
            layerChooser: this.layerChooserFromMap
          });
        this.layerSelector.placeAt(this.layerSelectorDiv);
        this.layerSelector.startup();
        if (this.layerSelector.layerChooser.getAllItems().length > 0) {
          this.layerSelector.setSelectedLayer(this.layerSelector.setSelectedLayer(this.layerSelector.layerChooser.getAllItems()[0].layerInfo.layerObject));
        }
      },

      /**
       * Creat chooseFromLayerPopup
       */
      _createPopUp: function () {
        this._addLayerSelectors();
        this.chooseFromLayerPopup = new Popup({
          "titleLabel": this.nls.addTargetLayersLabel,
          "width": 500,
          "maxHeight": 300,
          "autoHeight": true,
          "class": this.baseClass,
          "content": this,
          "buttons": [{
            label: this.nls.ok,
            onClick: lang.hitch(this, function () {
              //on ok click emit seleced layer event
              this.emit("layerSelected", this.layerSelector.getSelectedItem().layerInfo);
              this.chooseFromLayerPopup.close();
            })
          }, {
            label: this.nls.cancel,
            classNames: ['jimu-btn-vacation'],
            onClick: lang.hitch(this, function () {
              this.chooseFromLayerPopup.close();
            })
          }]
        });
      }
    });
  });
