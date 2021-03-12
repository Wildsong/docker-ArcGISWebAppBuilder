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
define(['jimu/shared/BaseVersionManager'],
function (BaseVersionManager) {

  function VersionManager() {
    this.versions = [{
      version: '1.0',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '1.1',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '1.2',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '1.3',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '1.4',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.0Beta',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.0',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.0.1',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    }, {
      version: '2.1',
      upgrader: function (oldConfig) {
        return oldConfig;
      }
    },
    {
      version: '2.2',
      upgrader: function (oldConfig) {
        var newConfig = oldConfig;
        if (newConfig.hasOwnProperty("editor") === true) {
          if (newConfig.editor.hasOwnProperty("listenToGF") === false) {
            newConfig.editor.listenToGF = false;
          }
          if (newConfig.editor.hasOwnProperty("keepTemplateSelected") === false) {
            newConfig.editor.keepTemplateSelected = false;
          }
          if (newConfig.editor.hasOwnProperty("layerInfos") === true) {
            if (newConfig.editor.layerInfos.length > 0) {
              for (var i = 0; i < newConfig.editor.layerInfos.length; i++) {
                if (newConfig.editor.layerInfos[i].hasOwnProperty("fieldInfos")) {
                  if (newConfig.editor.layerInfos[i].fieldInfos.length > 0) {
                    for (var j = 0; j < newConfig.editor.layerInfos[i].fieldInfos.length; j++) {
                      if (newConfig.editor.layerInfos[i].fieldInfos[j].hasOwnProperty("isEditable") === true &&
                          newConfig.editor.layerInfos[i].fieldInfos[j].hasOwnProperty("visible") === true) {
                        if (newConfig.editor.layerInfos[i].fieldInfos[j].isEditable === true &&
                            newConfig.editor.layerInfos[i].fieldInfos[j].visible === false) {
                          newConfig.editor.layerInfos[i].fieldInfos[j].isEditable = false;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return newConfig;
      }
    }, {
      version: '2.5',
      upgrader: function (oldConfig) {
        var newConfig = oldConfig;
        newConfig.editor.editGeometryDefault = false;
        newConfig.editor.autoSaveEdits = false;
        return newConfig;
      }
    },
    {
      version: '2.6',
      upgrader: function (oldConfig) {
        var newConfig = oldConfig;
        newConfig.editor.displayPresetTop = false;
        newConfig.editor.displayShapeSelector = false;
        return newConfig;
      }
    }
    ];
  }

  VersionManager.prototype = new BaseVersionManager();
  VersionManager.prototype.constructor = VersionManager;
  return VersionManager;
});