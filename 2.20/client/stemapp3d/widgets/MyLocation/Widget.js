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
    'jimu/BaseWidget',
    'dojo/_base/html',
    'dojo/on',
    'dojo/when',
    'dojo/_base/lang',
    'esri/layers/GraphicsLayer',
    "esri/widgets/Locate",
    "esri/widgets/Locate/LocateViewModel",
    "esri/symbols/PictureMarkerSymbol",
    "esri/geometry/Point",
    'esri/geometry/SpatialReference',
    'esri/geometry/support/webMercatorUtils',
    'esri/tasks/support/ProjectParameters',
    'esri/Graphic',
    "esri/config",
    'jimu/utils'
  ],
  function(declare, BaseWidget, html, on, when, lang, GraphicLayer, Locate, LocateVM, PictureMarkerSymbol,
           Point, SpatialReference, webMercatorUtils, ProjectParameters, Graphic, esriConfig, jimuUtils) {
    var clazz = declare([BaseWidget], {
      name: 'MyLocation',
      baseClass: 'jimu-widget-mylocation',

      startup: function() {
        this.inherited(arguments);
        this.placehoder = html.create('div', {
          'class': 'place-holder',
          title: this.label
        }, this.domNode);
        this.isNeedHttpsButNot = jimuUtils.isNeedHttpsButNot();

        if (true === this.isNeedHttpsButNot) {
          console.log('LocateButton::navigator.geolocation requires a secure origin.');
          html.addClass(this.domNode, "nohttps");//add for hover style
          html.addClass(this.placehoder, "nohttps");
          html.setAttr(this.placehoder, 'title', this.nls.httpNotSupportError);
        } else if (window.navigator.geolocation) {
          this.own(on(this.placehoder, 'click', lang.hitch(this, this.onLocationClick)));
        } else {
          html.setAttr(this.placehoder, 'title', this.nls.browserError);
        }
      },

      onLocationClick: function() {
        if (html.hasClass(this.domNode, "onCenter") ||
          html.hasClass(this.domNode, "locating")) {

          this._destroyGeoLocate();
        } else {

          this._destroyGeoLocate();
          this._createGeoLocateAndLocate();
        }
      },


      //create & sync-locate
      _createGeoLocateAndLocate: function () {
        this.getGeoLocateInstance();//.then(
        this.geoLocate.viewModel.locate();
        html.addClass(this.placehoder, "locating");
      },
      getGeoLocateInstance: function() {
        //1 get
        // if (this.geoLocate) {
        //   return this.geoLocate;
        // }
        //2 create
        var json = this.config.locateButton;
        var geoOptions = {
          maximumAge: 0,
          timeout: 15000,
          enableHighAccuracy: true
        };
        if (json.geolocationOptions) {
          lang.mixin(geoOptions, json.geolocationOptions);
        }

        // there is a Locate issue , must new GraphicLayer() when new Locate().
        // Or display the locateMarker for just once
        this.graphicsLayer = new GraphicLayer();
        this.sceneView.map.add(this.graphicsLayer);
        var esriLocateNode = html.create('div', { "class": "esri-locate-node" }, this.domNode);
        var vmOptions = {
          view: this.sceneView,
          graphicsLayer: this.graphicsLayer,
          geolocationOptions: geoOptions,
          //locationSymbol:this.highlightSymbol, //api bug: no use to set locationSymbol
          //locationSymbolEnabled: json.highlightLocation, //api delete this param in 4.13
          scale: json.scale,
          tracking: json.useTracking,
          //trackingEnabled: json.useTracking,
          clearOnTrackingStopEnabled: false
        };

        if (!json.highlightLocation) {
          vmOptions.graphic = null;//for API 4.13
        }

        this.geoLocate = new Locate({
          viewModel: new LocateVM(vmOptions),
          container: esriLocateNode,
          visible: false
        });
        // this.geoLocate.when().then(lang.hitch(this, function(lyr) {
        //   def.resolve(this.geoLocate);
        // }));
        this.geoLocate.own(on(this.geoLocate.viewModel, "locate", lang.hitch(this, this.onLocate)));
        this.geoLocate.own(on(this.geoLocate.viewModel, "locate-error", lang.hitch(this, this.onLocateError)));//only 3d have error event

        //this.geoLocate.startup();

        return this.geoLocate;
      },


      //event hanlder
      onLocate: function(parameters) {
        this.publishData({'geoLocationResult': parameters});

        html.removeClass(this.placehoder, "locating");
        this.graphicsLayer.removeAll();

        if (this.geoLocate.viewModel.tracking) {
          html.addClass(this.placehoder, "tracking");
        }

        if (parameters.error) {
          this.onLocateError(parameters.error);
        } else {
          html.addClass(this.domNode, "onCenter");
          this.neverLocate = false;
          //this._pointMarkerManualy(parameters);
        }
      },
      onLocateError: function(evt) {
        this.publishData({'geoLocationResult': evt});
        console.error(evt.error);

        html.removeClass(this.placehoder, "locating");
        html.removeClass(this.domNode, "onCenter");
        html.removeClass(this.placehoder, "tracking");
      },


      _destroyGeoLocate: function() {
        if (this.graphicsLayer) {
          this.graphicsLayer.removeAll();
          this.sceneView.map.remove(this.graphicsLayer);
        }
        if (this.geoLocate) {
          this.geoLocate.viewModel.cancelLocate();
          this.geoLocate.viewModel.graphicsLayer.removeAll();
          this.geoLocate.destroy();
          this.geoLocate = null;
        }

        html.removeClass(this.domNode, "onCenter");
        html.removeClass(this.placehoder, "tracking");
      },

      destroy: function() {
        this._destroyGeoLocate();
        this.inherited(arguments);
      },

      //fix api bug: can't show the marker(start)
      _pointMarkerManualy: function(parameters) {
        if(typeof this.config.locateButton.highlightLocation === "undefined" ||
          this.config.locateButton.highlightLocation === false){
          return;
        }

        this.highlightSymbol = new PictureMarkerSymbol({
          url: this.folderUrl + "css/images/sdk_gps_location.png",
          size: 28,
          width: 28,
          height: 28,
          xoffset: 14,
          yoffset: 14
        });
        var point = new Point({
          longitude: parameters.position.coords.longitude,
          latitude: parameters.position.coords.latitude,
          spatialReference: new SpatialReference({
            wkid: 4326
          })
        });
        this._project(point).then(lang.hitch(this, function(geometries) {
          var graphic = new Graphic({
            geometry: geometries[0],
            symbol: this.highlightSymbol
          });
          if (this.config.locateButton.highlightLocation) {
            this.graphicsLayer.add(graphic);
          }
          //this.sceneView.animateTo(graphic);
          //html.addClass(this.domNode, "onCenter");
        }), lang.hitch(this, function(err) {
          this.onLocateError(err);
        }));
      },
      _project: function(point) {
        var sceneSR = this.sceneView.spatialReference;
        if (point.spatialReference.equals(sceneSR)) {
          return when([point]);
        } else if (webMercatorUtils.canProject(point, sceneSR)) {
          return when([webMercatorUtils.project(point, sceneSR)]);
        } else {
          var params = new ProjectParameters();
          params.geometries = [point];
          params.outSR = sceneSR;

          return esriConfig.geometryService.project(params);
        }
      }
      //fix api bug: can't show the marker(end)
    });
    clazz.inPanel = false;
    clazz.hasUIFile = false;
    return clazz;
  });
