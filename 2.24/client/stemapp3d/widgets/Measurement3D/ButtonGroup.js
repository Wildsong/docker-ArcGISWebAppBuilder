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
  'dojo/query',
  'dojo/dom-class',
  'dojo/on',
  'dijit/_WidgetBase'
],
function(declare, lang, array, query, domClass, on, _WidgetBase){
  return declare([_WidgetBase], {
    baseClass: 'jimu-button-group',
    CSS: {
      ACTIVE: 'jimu-state-active'
    },
    buttons: [],
    activeButton: null,

    postCreate: function(){
      this.inherited(arguments);
      this._initUI();
    },

    buttonClicked: function(button) {
      if(this.activeButton === button) {
        // deactivate the button UI
        domClass.remove(button, this.CSS.ACTIVE);
        this.activeButton = null;
      } else {
        // activate the button UI
        var nodes = query('*', this.domNode)
        array.forEach(nodes, function(node) {
          domClass.remove(node, this.CSS.ACTIVE);
        }, this);
        domClass.add(button, this.CSS.ACTIVE);
        this.activeButton = button;
      }
      this.onChange(this.activeButton);
    },

    getActiveButton: function() {
      return this.activeButton;
    },

    getActiveButtonValue: function() {
      var activeButton = this.getActiveButton();
      return activeButton && activeButton.getAttribute('data-value');
    },

    _initUI:function(){
      array.forEach(this.buttons, function(buttonConfig){
        this._createButton(buttonConfig);
      }, this);
    },

    _createButton:function(buttonConfig) {
      var buttonElem = document.createElement('button');
      buttonElem.type = 'button';
      buttonElem.title = buttonConfig.label;
      buttonElem.setAttribute('data-value', buttonConfig.value);
      if(buttonConfig.icon) {
        buttonElem.appendChild(buttonConfig.icon);
      }
      buttonElem.appendChild(document.createTextNode(buttonConfig.content || buttonConfig.value));
      this.domNode.appendChild(buttonElem);

      this.own(on(buttonElem, 'click', lang.hitch(this, function(evt) {
        this.buttonClicked(evt.target);
      })));
    },

    onChange: function() {}

  });
});