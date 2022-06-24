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

define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dijit/_WidgetBase'
],
  function (Evented, declare, lang, _WidgetBase
  ) {
    var clazz = declare([_WidgetBase, Evented], {
      _dijitDirections: null,
      _widget: null,
      mapClickActive: true, //default true

      /*
        options = {widget: }
      */
      constructor: function (options) {
        this._widget = options.widget;
      },
      postCreate: function () {
        this.inherited(arguments);
      },
      startup: function () {
        this.inherited(arguments);
      },
      setDirectionDijit: function (dijit) {
        this._dijitDirections = dijit;
      },

      cacheStates: function (options) {
        if (this._dijitDirections) {
          //1. Barrier
          this.barrierToolActive = this._dijitDirections.barrierToolActive;
          //2. mapClickActive
          var forceVal = options && options.mapClickActive;
          this.mapClickActive = forceVal || this._dijitDirections.mapClickActive;
        }
      },
      //for ,#17326
      revertToLastState: function () {
        if (this._dijitDirections) {
          this.activateDijit();
          // if (this.mapClickActive || this.barrierToolActive) {
          //   this.activateDijit();
          // } else {
          //   this.deactivateDijit();
          // }
          this.cacheStates();
        }
      },

      //Direction dijit activate/deactivate
      activateDijit: function () {
        if (this._dijitDirections) {
          //console.log("==> _activate");
          if (typeof this._dijitDirections.activate === 'function') {
            this._dijitDirections.activate();//Deprecated at v3.13
          }

          this._widget._disableWebMapPopup();

          //1. Barrier
          if (this.barrierToolActive) {
            this._dijitDirections.activateBarrierTool();
          } else {
            this._dijitDirections.deactivateBarrierTool();
          }
          //2. mapClickActive
          this.setMapClickActive(this.mapClickActive);
        }
      },
      deactivateDijit: function () {
        if (this._dijitDirections) {
          if (typeof this._dijitDirections.deactivate === 'function') {
            this._dijitDirections.deactivate();//Deprecated at v3.13
          }
          //console.log("==> _deactivate");

          this._widget._enableWebMapPopup();
          //1. barrier btn
          if (typeof this._dijitDirections.barrierToolActive !== "undefined") {
            this._dijitDirections.deactivateBarrierTool();
          }
          //2. mapClickActive btn
          //  if (typeof this._dijitDirections.mapClickActive !== "undefined") {
          //   this._dijitDirections.set("mapClickActive", false);//avoid map-click event
          // }
          this.setMapClickActive(false);
        }
      },

      //async set mapClickActive
      setMapClickActive: function (active) {
        if (this._dijitDirections && this._dijitDirections._enqueue) {
          var mapClickActive = active;
          this._dijitDirections._enqueue(function () {
            this.set("mapClickActive", mapClickActive);
          })
        }
      },
      setMapClickActiveImmediately: function (active) {
        if (this._dijitDirections) {
          this._dijitDirections.set("mapClickActive", active);
        }
      },
    });

    return clazz;
  });