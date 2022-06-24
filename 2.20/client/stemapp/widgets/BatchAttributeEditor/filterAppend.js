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
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./filterAppend.html',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/_base/array',
  'dojo/on',
  'dojo/query',
  'dojo/keys',
  "dojo/dom-style",
  "dojo/dom",
  'esri/graphic',
  'esri/toolbars/draw',
  'esri/symbols/jsonUtils'
],
function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
  template, lang, html, array, on, query, keys, domStyle, dom, Graphic, Draw, jsonUtils) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    templateString : template,
    baseClass : 'filter-append',
    nls : null,
    appendChoice: "AND",

    postMixInProperties : function() {
    },

    postCreate : function() {
      this.inherited(arguments);
      domStyle.set(this.slAppendChoice.domNode, "font-size", "12px");
      this.slAppendChoice.set('value',this.appendChoice);
    },

    getAppendChoice : function() {
      this.appendChoice = this.slAppendChoice.value;
    },

    destroy : function() {
      this.inherited(arguments);
    }

  });
});