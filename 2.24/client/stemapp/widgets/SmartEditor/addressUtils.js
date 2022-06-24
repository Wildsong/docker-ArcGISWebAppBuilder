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
  'dojo/Deferred',
  "esri/request",
  'jimu/portalUtils',
  'jimu/dijit/Message',
  "dijit/_WidgetBase"
],
  function (
    declare,
    lang,
    Deferred,
    esriRequest,
    portalUtils,
    Message,
    _WidgetBase
  ) {
    return declare([_WidgetBase], {
      _initialLoad: true,

      postCreate: function () {
      },

      locateAddress: function (geometry) {
        var returnDef = new Deferred();
        if (this.canGeocode) {
          var requestContent = {};
          requestContent = {
            f: "json",
            location: JSON.stringify(geometry),
            distance: 100,
            outSR: JSON.stringify(geometry.spatialReference),
            forStorage: true
          };
          //If user token exist, then the esri world geocoder is configured
          //then pass the token
          if (this.userToken) {
            requestContent.token = this.userToken;
          }
          esriRequest({
            url: this.config.geocoderSettings.url + '/reverseGeocode',
            content: requestContent,
            callbackParamName: "callback"
          }).then(lang.hitch(this, function (result) {
            this._initialLoad = false;
            //check if address available
            if (result && result.address) {
              result = result.address;
            }
            if (returnDef) {
              returnDef.resolve(result);
            }
          }), lang.hitch(this, function () {
            //Show the message only for the first time
            //when reverse geocoding fails due to any reason
            if (this._initialLoad) {
              this._initialLoad = false;
              new Message({
                message: this.nls.unableToUseLocator
              });
            }
            returnDef.resolve({});
          }));
        } else {
          returnDef.resolve({});
        }
        return returnDef.promise;
      }
    });
  });
