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
//
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/connect',
  'dojo/topic',
  'esri/graphic',
  'esri/toolbars/draw',
  'esri/geometry/Circle',
  'esri/geometry/Polyline',
  'esri/geometry/geometryEngine',
  'jimu/utils',
  './Feedback',
  'dojo/has',
  'dojo/touch',
  'dojo/on'
], function (
  dojoDeclare,
  dojoLang,
  dojoConnect,
  dojoTopic,
  esriGraphic,
  esriDraw,
  esriCircle,
  esriPolyline,
  esriGeometryEngine,
  jimuUtils,
  drawFeedback,
  dojoHas,
  dojoTouch,
  on
) {
  var clz = dojoDeclare([drawFeedback], {
    /**
     *
     **/
    constructor: function (args) {
      dojoDeclare.safeMixin(this, args);
      this.syncEvents();
      this.initGeometryService();
      this.circlePoints = [];
      this.geoDesicCirclePoints = [];
    },

    /*

    */
    syncEvents: function () {
      dojoTopic.subscribe(
        'manual-rangering-center-point-input',
        dojoLang.hitch(this, this.onCenterPointManualInputHandler)
      );

      dojoTopic.subscribe(
        'clear-points',
        dojoLang.hitch(this, this.clearPoints)
      );
    },

    /*
    Handler for clearing out points
    */
    clearPoints: function (centerPoint) {
      if (centerPoint) {
        this._points = [];
        this.circlePoints = [];
        this.geoDesicCirclePoints = [];
        this.map.graphics.clear();
      }
    },

    /**
     *
     **/
    clearGraphics: function () {
      this.map.graphics.clear();
    },

    /*
    Handler for the manual input of a center point
    */
    onCenterPointManualInputHandler: function (centerPoint) {
      this._points = [];
      this.circlePoints = [];
      this.geoDesicCirclePoints = [];
      this._points.push(centerPoint.offset(0, 0));
      this.set('startPoint', this._points[0]);
      this.map.centerAt(centerPoint);
    },

    /**
     *
     **/
    _onClickHandler: function (evt) {
      var snapPoint;
      if (this.map.snappingManager) {
        snapPoint = this.map.snappingManager._snappingPoint;
      }

      var start = snapPoint || evt.mapPoint;
      var map = this.map;
      this._points.push(start.offset(0, 0));
      this._processAfterMapClick(start).then(dojoLang.hitch(this, function (newMapPoint) {
        if (this._points.length === 1) {
          //When cannot project locally the two single clik events of last double click
          //adds thos points so clear them
          if (!this.canProjectLocally) {
            this.geoDesicCirclePoints = [];
            this.circlePoints = [];
          }
          this.set('startPoint', this._points[0]);
          this.set('startPointDD', newMapPoint);
        } else {
          this.set('endPointDD', newMapPoint);
        }
        this.circlePoints.push(start.offset(0, 0));
        this.geoDesicCirclePoints.push(newMapPoint.offset(0, 0));

        switch (this._geometryType) {
          case esriDraw.POINT:
            this._drawEnd(newMapPoint.offset(0, 0));
            this._setTooltipMessage(0);
            break;

          case esriDraw.POLYLINE:
            var pline = new esriPolyline({
              paths: [
                [
                  [start.x, start.y],
                  [start.x, start.y]
                ]
              ],
              spatialReference: map.spatialReference
            });

            //var tgra = new esriGraphic(pline, this.lineSymbol);
            this.lgraphic = new esriGraphic(pline, this.lineSymbol);

            if (map.snappingManager) {
              map.snappingManager._setGraphic(this._graphic);
            }

            if (this._points.length > 1) {
              this._drawRangeCircle();
            }

            if (this._points.length > 0) {
              if (dojoHas("esri-touch")) {
                this.parentWidget.own(on(this.map.root, dojoTouch.move, dojoLang.hitch(this, this._onMouseMoveHandler)));
              }
              if (!this._onMouseMoveHandler_connect && this.canProjectLocally) {
                this._onMouseMoveHandler_connect =
                  dojoConnect.connect(this.map, 'onMouseMove', this._onMouseMoveHandler);
              }
              if (!this._onDoubleClickHandler_connect) {
                this._onDoubleClickHandler_connect =
                  dojoConnect.connect(this.map, 'onDblClick', dojoLang.hitch(this, this._onDoubleClickHandler));
              }
            }
            break;
        }

        this._setTooltipMessage(this._points.length);
        if (this._points.length > 1) {
          var tooltip = this._tooltip;
          if (tooltip) {
            tooltip.innerHTML = jimuUtils.sanitizeHTML(this.nls.doubleClickEllipseMesage);
          }
        }
      }));
    },

    _drawRangeCircle: function () {
      if (!this.canProjectLocally) {
        var geom = new esriPolyline({
          paths: [
            [
              [this.startPointDD.x, this.startPointDD.y],
              [this.endPointDD.x, this.endPointDD.y]
            ]
          ],
          spatialReference: this.startPointDD.spatialReference
        });
        var length = esriGeometryEngine.geodesicLength(geom, 9001);

        var circleGeometry = new esriCircle(this.startPointDD, {
          radius: length,
          geodesic: true,
          numberOfPoints: 360
        });
        this.geodsicCircleGeometry = new esriCircle(this.startPointDD, {
          radius: length,
          geodesic: true,
          numberOfPoints: 360
        });
        this.getProjectedGeometry(circleGeometry, this.map.spatialReference).then(
          dojoLang.hitch(this, dojoLang.hitch(this, function (projectedGeometry) {

            circleGeometry = dojoLang.mixin(projectedGeometry, {
              distanceDirectionType: "military-tools-range-rings"
            });
            this.circleGraphic = new esriGraphic(circleGeometry, this.fillSymbol);
            this.map.graphics.add(this.circleGraphic);

          })));
      } else {
        if (this.circleGraphic) {
          var circleGraphic = new esriGraphic(this.circleGraphic.geometry, this.fillSymbol);
          this.map.graphics.add(circleGraphic);
        }
      }
    },

    /**
     *
     **/
    _onMouseMoveHandler: function (evt) {
      var snapPoint;
      if (this.map.snappingManager) {
        snapPoint = this.map.snappingManager._snappingPoint;
      }

      var start = this._points[0];

      var end = snapPoint || evt.mapPoint;
      var tGraphic = this.lgraphic;
      var geom = tGraphic.geometry;

      geom.setPoint(0, 0, {
        x: start.x,
        y: start.y
      });
      geom.setPoint(0, 1, {
        x: end.x,
        y: end.y
      });

      var length = esriGeometryEngine.geodesicLength(geom, 9001);

      var circleGeometry = new esriCircle(start, {
        radius: length,
        geodesic: true,
        numberOfPoints: 360
      });

      this.geodsicCircleGeometry = new esriCircle(this.startPointDD, {
        radius: length,
        geodesic: true,
        numberOfPoints: 360
      });
      if (this.circleGraphic) {
        this.map.graphics.remove(this.circleGraphic);
      }
      circleGeometry = dojoLang.mixin(circleGeometry, {
        distanceDirectionType: "military-tools-range-rings"
      });
      this.circleGraphic = new esriGraphic(circleGeometry, this.fillSymbol);
      this.map.graphics.add(this.circleGraphic);
      //this.lgraphic.setGeometry(geom);
    },

    /**
     *
     **/
    _onDoubleClickHandler: function () {
      //if only center is drawn and user clicks double click return
      if (!this.geoDesicCirclePoints || this.geoDesicCirclePoints.length < 2) {
        return;
      }
      this.disconnectOnMouseMoveHandlers();
      var points = dojoLang.clone(this.geoDesicCirclePoints);
      this.cleanup();
      this._clear();
      this._setTooltipMessage(0);
      var geom = dojoLang.mixin(this.geodsicCircleGeometry, {
        circlePoints: points
      });
      this._drawEnd(geom);
    },

    /*
     *
     */
    disconnectOnMouseMoveHandlers: function () {
      dojoConnect.disconnect(this._onMouseMoveHandler_connect);
      dojoConnect.disconnect(this._onDoubleClickHandler_connect);
      this._onDoubleClickHandler_connect = null;
    },

    /*
     *
     */
    cleanup: function () {
      for (var i = this.map.graphics.graphics.length - 1; 0 <= i; i--) {
        if (this.map.graphics.graphics[i].geometry.hasOwnProperty("distanceDirectionType")) {
          var circleGraphic = this.map.graphics.graphics[i];
          this.map.graphics.remove(circleGraphic);
        }
      }
      this.circlePoints = [];
      this.geoDesicCirclePoints = [];
    }
  });
  return clz;
});