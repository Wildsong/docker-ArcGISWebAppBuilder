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
define(['./BaseVersionManager'],
function(BaseVersionManager) {

  //app version manager manage config and framework version
  function AppWidgetManager(){
    this.versions = [{
      version: '2.0beta',

      description: 'The version for Developer Edition beta 2.0.',

      upgrader: function(oldConfig){
        return oldConfig;
      },
      compatible: true
    }, {
      version: '2.0',

      description: 'The version for Online 4.1.',

      upgrader: function(oldConfig){
        return oldConfig;
      },
      compatible: true
    }, {
      version: '2.0.1',

      description: 'The version for Developer Edition 2.0.',

      upgrader: function(oldConfig){

        renameVizTo3DFx(oldConfig);

        /*******************functions********************/
        function renameVizTo3DFx(oldConfig){
          var widget = null;
          var i = 0;

          var onScreenWidgets = oldConfig.widgetOnScreen.widgets;
          if(onScreenWidgets && onScreenWidgets.length > 0){
            for(i = 0; i < onScreenWidgets.length; i++){
              widget = onScreenWidgets[i];
              if(widget.uri === 'widgets/Viz/Widget'){
                widget.uri = 'widgets/3DFx/Widget';
                widget.name = '3DFx';
              }
            }
          }

          var poolWidgets = oldConfig.widgetPool.widgets;
          if(poolWidgets && poolWidgets.length > 0){
            for(i = 0; i < poolWidgets.length; i++){
              widget = poolWidgets[i];
              if(widget.uri === 'widgets/Viz/Widget'){
                widget.uri = 'widgets/3DFx/Widget';
                widget.name = '3DFx';
              }
            }
          }
        }

        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.1',

      description: 'The version for Online 4.2.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.2',

      description: 'The version for Online 4.3.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.3',

      description: 'The version for Online 4.4.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.4',

      description: 'The version for Online 5.1.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.5',

      description: 'The version for Online 5.2.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.6',

      description: 'The version for Online 5.3.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.7',

      description: 'The version for Online 5.4.',

      upgrader: function(oldConfig){

        function renameEnvironmentToDaylight(){
          updateSection('widgetOnScreen');
          updateSection('widgetPool');

          function updateSection(sectionName){
            var i = 0, j = 0;
            if(oldConfig[sectionName].widgets){
              for(i = 0; i < oldConfig[sectionName].widgets.length; i++){
                if(oldConfig[sectionName].widgets[i].uri === 'widgets/Environment/Widget'){
                  oldConfig[sectionName].widgets[i].uri = 'widgets/Daylight/Widget';
                  break;
                }
              }
            }

            if(oldConfig[sectionName].groups){
              for(i = 0; i < oldConfig[sectionName].groups.length; i++){
                var g = oldConfig[sectionName].groups[i];
                for(j = 0; j < g.widgets.length; j++){
                  if(g.widgets[j].uri === 'widgets/Environment/Widget'){
                    g.widgets[j].uri = 'widgets/Daylight/Widget';
                    break;
                  }
                }
              }
            }
          }

        }

        renameEnvironmentToDaylight();
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.8',

      description: 'The version for Online 6.1.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.9',

      description: 'The version for Online 6.2.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.10',

      description: 'The version for Online 6.3.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.11',

      description: 'The version for Online 6.4.',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.12',

      description: 'The version for Online 7.1',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.13',

      description: 'The version for Online 7.2',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.14',

      description: 'The version for Online 7.3',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.15',

      description: 'The version for Online 7.4',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.16',

      description: 'The version for Online 8.1',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.17',

      description: 'The version for Online 8.2',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.18',

      description: 'The version for Online 8.3',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.19',

      description: 'The version for Online 8.4',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.20',

      description: 'The version for Online 9.1',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.21',

      description: 'The version for Online 9.2',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.22',

      description: 'The version for Online 9.3',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.23',

      description: 'The version for Online 9.4',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }, {
      version: '2.24',

      description: 'The version for Online 10.1',

      upgrader: function(oldConfig){
        return oldConfig;
      },

      compatible: true
    }];

    this.isCompatible = function(_oldVersion, _newVersion){
      var oldVersionIndex = this.getVersionIndex(_oldVersion);
      var newVersionIndex = this.getVersionIndex(_newVersion);
      var i;
      for(i = oldVersionIndex + 1; i <= newVersionIndex; i++){
        if(this.versions[i].compatible === false){
          return false;
        }
      }
      return true;
    };
  }

  AppWidgetManager.prototype = new BaseVersionManager();
  AppWidgetManager.prototype.constructor = AppWidgetManager;
  return AppWidgetManager;
});