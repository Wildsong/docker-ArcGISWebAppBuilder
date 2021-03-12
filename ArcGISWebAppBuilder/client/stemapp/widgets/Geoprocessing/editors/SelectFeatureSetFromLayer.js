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

define(['dojo/_base/declare',
  'dojo/Deferred',
  'dijit/_TemplatedMixin',
  'jimu/dijit/SpatialFilterByFeatures',
  'jimu/utils',
  './BaseFeatureSetEditor',
  'dojo/text!./SelectFeatureSetFromLayer.html',
  'esri/dijit/analysis/utils',
  'esri/tasks/query'
], function(declare, Deferred, _TemplatedMixin, SpatialFilterByFeatures, jimuUtils,
 BaseFeatureSetEditor, template, AnalysisUtils, Query){
  var GPInputLyrObj = declare(null, {
    constructor: function(layerObject) {
      this.layerObject = layerObject;
    },

    layerObject: 0,

    toJson: function() {
      return this.layerObject;
    }
  });

  //from layers in map
  var clazz = declare([BaseFeatureSetEditor, _TemplatedMixin], {
    templateString: template,
    editorName: 'SelectFeatureSetFromLayer',

    postCreate: function(){
      this.inherited(arguments);

      this.spatialFilterByFeatures = new SpatialFilterByFeatures({
        map: this.map,
        types: this.param.defaultValue && this.param.defaultValue.geometryType?
               [jimuUtils.getTypeByGeometryType(this.param.defaultValue.geometryType)]:
               ['point', 'polyline', 'polygon']
      });
      this.spatialFilterByFeatures.placeAt(this.layerChooseNode);
      this.spatialFilterByFeatures.startup();
    },

    getGPValue: function(){
      if(this.activeViewIndex === 0) {
        var def = new Deferred();

        var layer = this.spatialFilterByFeatures.getSelectedLayer();
        if (layer) {
          var features = this.spatialFilterByFeatures.featureSetChooserForSingleLayer.syncGetFeatures();
          if (features && features.length > 0) { // use selection first
            var featureSet = jimuUtils.getFeatureSetByLayerAndFeatures(layer, features);
            def.resolve(featureSet);
          } else if (this.param.useFeatureCollection) {
            if (!layer.url) {
              var featureSet = jimuUtils.getFeatureSetByLayerAndFeatures(layer, layer.graphics);
              def.resolve(featureSet);
            } else {
              var query = new Query();
              query.where = '1=1';
              layer.queryFeatures(query).then(function(response){
                def.resolve(response);
              }, function(error){
                def.reject(error);
              });
            }
          } else {
            def.resolve(new GPInputLyrObj(AnalysisUtils.constructAnalysisInputLyrObj(layer)));
          }
        } else {
          def.resolve(null);
        }

        return def;
      } else {
        return this.wrapValueToDeferred(this.getFeatureSet());
      }
    }
  });

  return clazz;
});
