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
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase",
  'jimu/utils'
],
  function (declare, lang, array, domConstruct,
            _TemplatedMixin, _WidgetBase, utils) {
    return declare([_WidgetBase, _TemplatedMixin], {
      name: "SEFilterEditor",
      baseClass: "jimu-widget-sefilterEditor",
      declaredClass: 'jimu.dijit.SEFilterEditor',
      templateString: "<div style='width:100%'>" +
        "<div data-dojo-attach-point='filterEditorDiv'></div></div>",
      _templatePicker: null,
      _layers: null,
      map: null,
      nls: null,
      _origGetItemsFromLayerFunc: null,
      gpFilterTemplates:false,

      postCreate: function () {
        this._createFilterTool();
      },

      _createFilterTool: function () {
        // label for select
        //var flLabel = domConstruct.create("label", {
        //  innerHTML: "Feature Layers"
        //});
        //domConstruct.place(flLabel, this.filterEditorDiv);

        this._createLayerFilter();
        this._createTemplateFilter();
        this._loadTemplates();
      },

      _createLayerFilter: function () {
        // DropDown of select feature layer.
        this.selectDropDown = domConstruct.create("select", {
          'class': 'flDropDown templatePicker',
          "tabindex":"0",
          "aria-label": this.nls.filterEditor.filterLayerLabel
        });
        domConstruct.place(this.selectDropDown, this.filterEditorDiv);
        this.selectDropDown.onchange = lang.hitch(this, function () {
          this._onLayerFilterChanged();
        });

      },
      removeOptions: function (selectbox) {
        var i;
        for (i = selectbox.options.length - 1 ; i >= 0 ; i--) {
          selectbox.remove(i);
        }
      },
      _loadTemplates: function () {
        var selectedValue = (this.selectDropDown.value === this.nls.filterEditor.all ||
          this.selectDropDown.value === "") ? null : this.selectDropDown.value;
        var filterText = utils.sanitizeHTML(this.filterTextBox.value);
        var selectedValueExist = false;
        this.removeOptions(this.selectDropDown);
        var optionAll = domConstruct.create("option", {
          value: this.nls.filterEditor.all,
          innerHTML: this.nls.filterEditor.all
        });

        domConstruct.place(optionAll, this.selectDropDown);
        var layerObject;
        for (var i = 0; i < this._layers.length; i++) {
          layerObject = this._layers[i];
          if (layerObject.visible === true && layerObject.visibleAtMapScale === true) {
            if (selectedValue !== null && layerObject.id === selectedValue) {
              selectedValueExist = true;
            }
            var option = domConstruct.create("option", {
              value: layerObject.id,
              innerHTML: layerObject.name
            });

            domConstruct.place(option, this.selectDropDown);
          }
        }
        if (selectedValueExist === true) {
          this.selectDropDown.value = selectedValue;
          this._onLayerFilterChanged();
        }
        if (filterText !== null && filterText !== "") {
          this.filterTextBox.value = filterText;
          this._onTemplateFilterChanged();
        }
      },
      setTemplatePicker: function (templatePicker, layers) {
        this._layers = layers;
        this._templatePicker = templatePicker;
        this._overrideTemplatePicker();
        this._loadTemplates();
      },
      _createTemplateFilter: function () {
        // textBox filter
        this.filterTextBox = domConstruct.create("input", {
          'class': "searchtextbox templatePicker",
          type: "text",
          placeholder: this.nls.filterEditor.searchTemplates
        }, this.filterEditorDiv);
        this.filterTextBox.onkeyup = lang.hitch(this, function () {
          this._onTemplateFilterChanged();
        });

        this._overrideTemplatePicker();
      },

      _overrideTemplatePicker: function () {
        this._origGetItemsFromLayerFunc = this._templatePicker._getItemsFromLayer;

        this._templatePicker._getItemsFromLayer = lang.hitch(this, function () {
          var items;
          items = this._origGetItemsFromLayerFunc.apply(this._templatePicker, arguments);
          var filterText = utils.sanitizeHTML(this.filterTextBox.value);
          if (filterText) {
            items = array.filter(items, function (item) {
              var match = false;
              var regex = new RegExp(filterText, "ig");
              // Search using item label
              if (item.hasOwnProperty("label")) {
                if (item.label.match(regex)) {
                  if (item.label.match(regex).length > 0) {
                    match = true;
                  }
                }
              }
              // Search using the name from the
              // item template property
              if (item.hasOwnProperty("template")) {
                if (item.template.hasOwnProperty("name")) {
                  if (item.template.name.match(regex)) {
                    if (item.template.name.match(regex).length > 0) {
                      match = true;
                    }
                  }
                }
              }
              return match;
            }, filterText);
          }
          if (items.length === 0) {
            this._templatePicker.grid.noDataMessage =
              this.nls.filterEditor.noAvailableTempaltes;
            this._templatePicker.grid.params.noDataMessage =
              this.nls.filterEditor.noAvailableTempaltes;
            this._templatePicker.grid.messagesNode.innerText  =
              this.nls.filterEditor.noAvailableTempaltes;
          }
          return items;
        });
      },
      /**************************
       * Events
       *************************/
      /**
       * Updates the template picker based on selection in dropdown
       **/
      _onLayerFilterChanged: function () {
        // Clear any selections from previous selection
        var has_layers = true;
        this._templatePicker.clearSelection();
        var val = this.selectDropDown.options[this.selectDropDown.selectedIndex].text;
        if (val !== "") {
          if (val === this.nls.filterEditor.all) {
            var filt_layers = this._filter_layers(utils.sanitizeHTML(this.filterTextBox.value));
            has_layers = filt_layers.length !== 0;
            this._templatePicker.attr("featureLayers", filt_layers);
            if (this.gpFilterTemplates === true) {
              this._templatePicker.attr("grouping", true);
            }
            else {
              this._templatePicker.attr("grouping", false);
            }
          } else {
            var layerObject = this.map.getLayer(this.selectDropDown.value);
            this._templatePicker.attr("featureLayers", [layerObject]);
            this._templatePicker.attr("grouping", false);
          }
          this._templatePicker.update();
          if (!has_layers) {
            this._templatePicker.grid.messagesNode.innerText = this.nls.filterEditor.noAvailableTempaltes;
          }
        }
      },
      _filter_layers:function(filterText){
        var layer_w_templates = array.filter(this._layers, lang.hitch(this, function (layer) {
          if (layer.visible === false || layer.visibleAtMapScale === false){
            return false;
          }
          if (filterText === ""){
            return true;
          }
          var template_items = array.filter(layer.templates, function (item) {
            var match = false;
            var regex = new RegExp(filterText, "ig");
            // Search using item label
            if (item.hasOwnProperty("name")) {
              if (item.name.match(regex)) {
                if (item.name.match(regex).length > 0) {
                  match = true;
                }
              }
            }
            return match;
          }, filterText);
          type_items = array.filter(layer.types, function (item) {
            var sub_items = array.filter(item.templates, function (templates_in_item) {
              var match = false;
              var regex = new RegExp(filterText, "ig");
              // Search using item label
              if (templates_in_item.hasOwnProperty("name")) {
                if (templates_in_item.name.match(regex)) {
                  if (templates_in_item.name.match(regex).length > 0) {
                    match = true;
                  }
                }
              }
              return match;
            }, filterText);
            return sub_items.length > 0;
          }, filterText);
          return type_items.length > 0 || template_items.length > 0;
        }));
        return layer_w_templates;
      },
      _onTemplateFilterChanged: function () {
        var val = this.selectDropDown.options[this.selectDropDown.selectedIndex].text;
        var filterText = utils.sanitizeHTML(this.filterTextBox.value);
        var has_layers = true;
        if (this.gpFilterTemplates === true && val === this.nls.filterEditor.all) {
          var filt_layers = this._filter_layers(filterText)
          this._templatePicker.attr("featureLayers", filt_layers);
          has_layers = filt_layers.length !== 0;
        }
        if (val === this.nls.filterEditor.all){
          if (filterText === ""){
            this._templatePicker.attr("grouping", true);
          }
          else if (this.gpFilterTemplates === true){
            this._templatePicker.attr("grouping", true);
          }
          else{
            this._templatePicker.attr("grouping", false);
          }
        }
        else{
          this._templatePicker.attr("grouping", false);
        }
        this._templatePicker.update();
        if (!has_layers) {
          this._templatePicker.grid.messagesNode.innerText =
            this.nls.filterEditor.noAvailableTempaltes;
        }

      },

      addNewLayerInEditor: function (layerInfo) {
        //Add the layer at the beginning of the array
        this._layers.splice(0, 0, layerInfo);
      },

      removeLayerFromEditor: function (layerInfo) {
        //Loop through the layers and removed the deleted layer
        array.some(this._layers, lang.hitch(this, function (layer, index) {
          if (layer.id === layerInfo.id) {
            this._layers.splice(index, 1);
            return true;
          }
        }));
      }
    });
  });