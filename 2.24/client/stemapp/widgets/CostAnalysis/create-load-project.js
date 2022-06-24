///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/Evented',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./create-load-project.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-construct',
  './item-list',
  'dijit/form/ValidationTextBox',
  'jimu/dijit/formSelect',
  'esri/tasks/query',
  'esri/graphic',
  'esri/tasks/QueryTask',
  'esri/graphicsUtils',
  'dojo/Deferred',
  'esri/layers/FeatureLayer',
  'dojo/promise/all',
  'jimu/dijit/Message',
  "dojo/dom-style",
  "dojo/query",
  "./update-project-cost",
  "dojo/dom-attr",
  "dijit/focus",
  "dojo/dom-class",
  "dojo/keys",
  'jimu/utils',
  "dojo/_base/event"
], function (
  declare,
  BaseWidget,
  Evented,
  _WidgetsInTemplateMixin,
  template,
  lang,
  array,
  on,
  domConstruct,
  ItemList,
  ValidationTextBox,
  Select,
  Query,
  Graphic,
  QueryTask,
  graphicsUtils,
  Deferred,
  FeatureLayer,
  all,
  Message,
  domStyle,
  query,
  UpdateProjectCost,
  domAttr,
  focusUtils,
  domClass,
  keys,
  utils,
  Event
) {
  return declare([BaseWidget, Evented, _WidgetsInTemplateMixin], {
    templateString: template,
    baseClass: 'jimu-widget-cost-analysis-create-load-project',
    //Properties
    highlighterColor: "#000",
    projectLayer: null,
    // pane list
    paneListData: [],
    _numberFieldTypes: ['esriFieldTypeSmallInteger', 'esriFieldTypeInteger',
      'esriFieldTypeSingle', 'esriFieldTypeDouble'
    ],
    projectNameOptions: [],
    projectNameField: null,
    projectDescField: null,
    _updateProjectCostWidget: null,
    projectNameTextBox: null,
    postCreate: function () {
      this.inherited(arguments);
      //Initialize array's and object
      // pane list
      //get the project name and descriptions field
      this.projectNameField = this.config.projectLayerFields.PROJECTNAME;
      this.projectDescField = this.config.projectLayerFields.DESCRIPTION;
      this.paneListData = [];
      this.projectLayer =
        this.layerInfosObj.getLayerInfoById(this.config.projectSettings.projectLayer).layerObject;
      this.projectNameOptions = [{
        label: this.nls.createLoadProject.selectProject,
        value: "defaultSelectProjectNameOption"
      }];
      this._createProjectUI();
      this._loadProjectUI();
    },
    startup: function () {
      this.inherited(arguments);
      this._initializeData();
      this._fetchWidgetTopNode();
      // pane list data
      this.paneListData = [{
        "title": this.nls.createLoadProject.createProjectPaneTitle,
        "content": this.createProjectContainer,
        "isOpen": true,
        "tabindex": "0",
        "createProjectTab": true,
        "aria-label": this.nls.createLoadProject.createProjectPaneTitle,
        "role": "button",
        "paneName": "creatProject"
      }, {
        "title": this.nls.createLoadProject.loadProjectPaneTitle,
        "content": this.loadProjectContainer,
        "isOpen": false,
        "loadProjectTab": true,
        "tabindex": "0",
        "aria-label": this.nls.createLoadProject.loadProjectPaneTitle,
        "role": "button",
        "paneName": "loadProject"
      }];
      if (this.config.hasOwnProperty("updateCostEquationCheckBoxStatus") &&
        this.config.updateCostEquationCheckBoxStatus) {
        this.paneListData.push({
          "title": this.nls.updateCostEquationPanel.updateProjectCostTabLabel,
          "content": this.updateEquationContainer,
          "isOpen": false,
          "updateCostEquationWidget": true,
          "tabindex": "0",
          "aria-label": this.nls.updateCostEquationPanel.updateProjectCostTabLabel,
          "role": "button",
          "paneName": "updateCostEquation"
        });
      }
      this._createAndLoadProjectPanes();
      this._getProjectNamesOptions();
    },

    /**
     * This function is used to re-initialize the global variables
     */
    _initializeData: function () {
      this._updateProjectCostWidget = null;
    },

    /**
     * Create and show alert message.
     */
    _showMessage: function (msg) {
      var alertMessage = new Message({
        message: msg
      });
      alertMessage.message = msg;
    },

    /**
     * This function is used to create project UI
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _createProjectUI: function () {
      var createProjectWrapper, projectName, projectDesc,
        projectDescTextBox,
        createBtn, createProjectButtonWrap, fieldInfo;
      createProjectWrapper = domConstruct.create("div", {
        "class": "esriCTCreateProjectWrapper"
      },
        this.createProjectContainer);
      projectName = domConstruct.create("div", {
        "class": "esriCTFullwidth esriCTCreateProjectContent"
      }, createProjectWrapper);
      this.projectNameTextBox = new ValidationTextBox({
        required: true,
        trim: true,
        placeHolder: this.nls.createLoadProject.projectNamePlaceHolder,
        title: this.nls.createLoadProject.projectNamePlaceHolder,
        maxLength: this._getFieldInfo(this.projectNameField).fieldLength,
        autofocus: true,
        "class": "esriCTFullwidth esriCTCreateProjectContent esriCTEllipsis"
      }, projectName);
      //Validator for validating project name
      this.projectNameTextBox.validator = lang.hitch(this, function (value) {
        //Validate for empty project name
        if (value === "") {
          return false;
        }
        //validate for duplicate project name
        if (!this._validateProjectNameLocally(value)) {
          this.projectNameTextBox.set("state", "Error");
          this.projectNameTextBox.set("invalidMessage",
            this.nls.createLoadProject.errorDuplicateProjectName);
          return false;
        }
        return true;
      });
      fieldInfo = this._getFieldInfo(this.projectDescField);
      projectDesc = domConstruct.create("div", {
        "class": "esriCTFullwidth esriCTCreateProjectContent"
      }, createProjectWrapper);
      projectDescTextBox = new ValidationTextBox({
        required: fieldInfo.nullable,
        trim: true,
        placeHolder: this.nls.createLoadProject.projectDescPlaceHolder,
        "class": "esriCTFullwidth esriCTCreateProjectContent esriCTEllipsis",
        "title": this.nls.createLoadProject.projectDescPlaceHolder,
        maxLength: fieldInfo.fieldLength
      }, projectDesc);
      createProjectButtonWrap = domConstruct.create("div", {
        "class": "esriCTFullwidth esriCTCreateLoadButtonWrap"
      },
        createProjectWrapper);
      createBtn = this._createButton(this.nls.createLoadProject.createLabel,
        createProjectButtonWrap, "0");
      this.createLoadProjectButtonArray.push(createBtn);
      this.own(on(createBtn, "click", lang.hitch(this, function () {
        this._createButtonClicked(projectDescTextBox);
        if(!this.projectNameTextBox.isValid()) {
          focusUtils.focus(this.projectNameTextBox);
        }
        if(!projectDescTextBox.isValid()) {
          focusUtils.focus(projectDescTextBox);
        }
      })));
      this.own(on(createBtn, "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          Event.stop(evt);
          this._createButtonClicked(projectDescTextBox);
          if(!this.projectNameTextBox.isValid()) {
            focusUtils.focus(this.projectNameTextBox);
          }
          if(!projectDescTextBox.isValid()) {
            focusUtils.focus(projectDescTextBox);
          }
        }
      })));
      return this.createProjectContainer;
    },

    /**
     * This function is used to handle click and keydown of create button
     */
    _createButtonClicked: function (projectDescTextBox) {
      //Show error msg if invalid description
      if (!projectDescTextBox.isValid()) {
        projectDescTextBox.set("state", "Error");
        projectDescTextBox.set("message", projectDescTextBox.getErrorMessage());
      }
      if (this.projectNameTextBox.isValid() && projectDescTextBox.isValid()) {
        this.loadingIndicator.show();
        //on button click validate for duplicate project name in layer
        this._validateForDuplicateProjectName(utils.sanitizeHTML(this.projectNameTextBox.get('value'))).then(
          lang.hitch(this, function (duplicateProjectName) {
            //If project name is not duplicate proceed with create project workflow
            // else show error as duplicate project name
            if (!duplicateProjectName) {
              this._addProjectToLayer(utils.sanitizeHTML(this.projectNameTextBox.get('value')),
              utils.sanitizeHTML(projectDescTextBox.get('value'))).then(lang.hitch(this, function (result) {
                  var newlyAddedOption;
                  this.loadingIndicator.hide();
                  //get project id field's value
                  if (result && result.success && result.globalId) {
                    //Make sure the newly added project is present in drop down
                    newlyAddedOption = {
                      label: utils.sanitizeHTML(this.projectNameTextBox.get('value')),
                      value: result.globalId,
                      descValue: utils.sanitizeHTML(projectDescTextBox.get('value')),
                      globalIdValue: result.globalId,
                      objectIdValue: result.objectId
                    };
                    this.projectNameSelect.addOption(newlyAddedOption);
                    //emit event as project is created
                    this.emit("createProject", {
                      "name": utils.sanitizeHTML(this.projectNameTextBox.get('value')),
                      "desc": utils.sanitizeHTML(projectDescTextBox.get('value')),
                      "projectId": result.globalId,
                      "objectId": result.objectId,
                      "projectIdField": this.projectLayer.globalIdField
                    });
                    //Remove values of project name and description
                    this.projectNameTextBox.set('value', " ");
                    projectDescTextBox.set('value', "");
                  } else {
                    this._showMessage(this.nls.createLoadProject.errorInCreatingProject);
                  }
                }), lang.hitch(this, function () {
                  this.loadingIndicator.hide();
                  this._showMessage(this.nls.createLoadProject.errorInCreatingProject);
                }));
            } else {
              this.loadingIndicator.hide();
              this.projectNameTextBox.set("state", "Error");
              this._showMessage(this.nls.createLoadProject.errorDuplicateProjectName);
            }
          }), lang.hitch(this, function () {
            this.loadingIndicator.hide();
            this._showMessage(this.nls.createLoadProject.errorInCreatingProject);
          }));
      }
    },

    /**
     * This function is used to get the max length of field
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getFieldInfo: function (fieldName) {
      var fieldLength, nullable, fieldInfo;
      if (this.projectLayer && this.projectLayer.getField(fieldName)) {
        fieldInfo = this.projectLayer.getField(fieldName);
        fieldLength = fieldInfo.length;
        nullable = !fieldInfo.nullable;
      }
      return {
        fieldLength: fieldLength,
        nullable: nullable
      };
    },

    /**
     * This function is used to create buttons
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _createButton: function (label, buttonParent, tabindexVal) {
      var buttonNode;
      buttonNode = domConstruct.create("div", {
        "class": "jimu-btn esriCTEllipsis",
        innerHTML: label,
        title: label,
        "role": "button",
        "tabindex": tabindexVal,
        "aria-label": label
      }, buttonParent);
      return buttonNode;
    },

    /**
     * This function is used to load project UI
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _loadProjectUI: function () {
      var loadProjectWrapper, loadProjectName, loadProjectButtonWrap,
        viewInMapBtn, deleteBtn, loadBtn;
      loadProjectWrapper = domConstruct.create("div", {
        "class": "esriCTLoadProjectWrapper"
      },
        this.loadProjectContainer);
      loadProjectName = domConstruct.create("div", {
        "class": "esriCTFullwidth esriCTCreateProjectContent"
      },
        loadProjectWrapper);
      loadProjectButtonWrap = domConstruct.create("div", {
        "class": "esriCTFullwidth esriCTCreateLoadButtonWrap"
      },
        loadProjectWrapper);
      this.projectNameSelect = new Select({
        "aria-label": this.nls.createLoadProject.selectProject,
        "class": "esriCTFullwidth",
        options: this.projectNameOptions
      }, domConstruct.create("div", {}, loadProjectName));
      this.projectNameSelect.startup();
      // View in map button
      viewInMapBtn = this._createButton(
        this.nls.createLoadProject.viewInMapLabel, loadProjectButtonWrap, "-1");
      this.own(on(viewInMapBtn, "click", lang.hitch(this, function () {
        this.getProjectAssets("ViewProject");
      })));
      // keydown for view in map button
      this.own(on(viewInMapBtn, "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          Event.stop(evt);
          this.getProjectAssets("ViewProject");
        }
      })));
      this.createLoadProjectButtonArray.push(viewInMapBtn);
      // delete button
      deleteBtn = this._createButton(this.nls.common.deleteText, loadProjectButtonWrap, "-1");
      this.createLoadProjectButtonArray.push(deleteBtn);
      this.own(on(deleteBtn, "click", lang.hitch(this, this._deleteBtnClicked)));
      // keydown for delete button
      this.own(on(deleteBtn, "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          Event.stop(evt);
          this._deleteBtnClicked();
        }
      })));
      // load button
      loadBtn = this._createButton(this.nls.createLoadProject.loadLabel, loadProjectButtonWrap, "-1");
      this.createLoadProjectButtonArray.push(loadBtn);
      this.own(on(loadBtn, "click", lang.hitch(this, function () {
        this.getProjectAssets("LoadProject");
      })));
      // keydown for load button
      this.own(on(loadBtn, "keydown", lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          Event.stop(evt);
          this.getProjectAssets("LoadProject");
        }
      })));
      return this.loadProjectContainer;
    },

    /**
     * Confirms deleting of the project by asking user the confirmation
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _deleteBtnClicked: function () {
      var deleteConfirmDialog, selectedProject;
      //get selected project
      selectedProject = this.projectNameSelect._getSelectedOptionsAttr();
      //show error if invalid project is selected
      if (!selectedProject || !selectedProject.value) {
        this._showMessage(this.nls.createLoadProject.errorProjectNotSelected);
        return;
      }
      deleteConfirmDialog = new Message({
        message: this.nls.createLoadProject.deleteProjectConfirmationMsg,
        type: "question",
        maxWidth: 375,
        buttons: [{
          "label": this.nls.common.yes,
          "onClick": lang.hitch(this, function () {
            deleteConfirmDialog.close();
            this.getProjectAssets("DeleteProject");
          })
        }, {
          "label": this.nls.common.no,
          "onClick": lang.hitch(this, function () {
            deleteConfirmDialog.close();
          })
        }]
      });
    },

    /**
     *  This function is used to query map layer to check if project exist or not
     * @memberOf widgets/CostAnalysis/create-load-project
     * */
    _checkIfProjectExist: function (projectId) {
      var query, queryTask, def;
      def = new Deferred();
      queryTask = new QueryTask(this.projectLayer.url);
      query = new Query();
      query.outFields = [this.projectLayer.objectIdField, this.projectLayer.globalIdField];
      query.returnGeometry = false;
      query.where = this.projectLayer.globalIdField + " = '" + projectId + "'";
      queryTask.execute(query, lang.hitch(this, function (response) {
        if (response && response.features && response.features.length > 0) {
          def.resolve(true);
        } else {
          def.resolve(false);
        }
      }), lang.hitch(this, function () {
        def.resolve(false);
      }));
      return def.promise;
    },

    /**
     * Based on view/load/delete gets the project assets
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    getProjectAssets: function (action) {
      var query, queryTask, assetTable, projectAssetTable, selectedProject;
      //get selected project
      selectedProject = this.projectNameSelect._getSelectedOptionsAttr();
      //show error if invalid project is selected
      if (!selectedProject || !selectedProject.value) {
        this._showMessage(this.nls.createLoadProject.errorProjectNotSelected);
        return;
      }
      this.loadingIndicator.show();
      this._checkIfProjectExist(selectedProject.globalIdValue).then(
        lang.hitch(this, function (projectExist) {
          if (projectExist) {
            assetTable =
              this.layerInfosObj.getTableInfoById(this.config.projectSettings.assetTable).
                layerObject;
            projectAssetTable = new FeatureLayer(assetTable.url);
            queryTask = new QueryTask(projectAssetTable.url);
            query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = false;
            query.where = this.config.assetTableFields.PROJECTGUID + " = '" +
              selectedProject.globalIdValue + "'";
            queryTask.execute(query, lang.hitch(this, function (response) {
              this.loadingIndicator.hide();
              //if action if viewProject show project on map else load the project
              if (action === "ViewProject") {
                this._showProjectOnMap(selectedProject, response.features);
              } else if (action === "DeleteProject") {
                this._deleteProject(selectedProject, response.features);
              } else {
                this._createAssetTemplateInfo(selectedProject, response.features);
              }
            }), lang.hitch(this, function () {
              this._showMessage(this.nls.createLoadProject.errorInLoadingProject);
              this.loadingIndicator.hide();
            }));
          } else {
            //as project does not exist remove the option from drop-down
            this.projectNameSelect.removeOption(selectedProject.globalIdValue);
            this._showMessage(this.nls.createLoadProject.errorProjectNotFound);
            //emit msg so that in case of reload project panel will be shown
            this.emit("showCreateLoadPrjPanel");
            this.loadingIndicator.hide();
          }
        }), lang.hitch(this, function () {
          this._showMessage(this.nls.createLoadProject.errorInLoadingProject);
          this.emit("showCreateLoadPrjPanel");
          this.loadingIndicator.hide();
        }));
    },

    /**
     * Create asset template info for each assets in project and then loads the project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _createAssetTemplateInfo: function (selectedProject, assets) {
      var geographyIdArr = [];
      this.loadingIndicator.show();
      //get GUID's of all the regions
      array.forEach(assets, lang.hitch(this, function (currentFeature) {
        var geographyId = currentFeature.attributes[this.config.assetTableFields.GEOGRAPHYGUID];
        if (geographyId) {
          geographyIdArr.push(geographyId);
        }
      }));
      this._getRegionName(geographyIdArr).then(lang.hitch(this, function (regionNameDetails) {
        this.loadingIndicator.hide();
        var assetIds, assetTemplateInfo;
        assetIds = [];
        assetTemplateInfo = {};
        array.forEach(assets, lang.hitch(this, function (currentFeature) {
          var assetGUID, templateInfo = {},
            geographyId;
          assetGUID = currentFeature.attributes[this.config.assetTableFields.ASSETGUID];
          geographyId = currentFeature.attributes[this.config.assetTableFields.GEOGRAPHYGUID];
          assetIds.push(assetGUID);
          templateInfo.COSTEQUATION =
            currentFeature.attributes[this.config.assetTableFields.COSTEQUATION];
          templateInfo.SCENARIO =
            currentFeature.attributes[this.config.assetTableFields.SCENARIO];
          templateInfo.TEMPLATENAME =
            currentFeature.attributes[this.config.assetTableFields.TEMPLATENAME];
          templateInfo.GEOGRAPHYGUID = geographyId;
          if (geographyId) {
            templateInfo.GEOGRAPHY = regionNameDetails[geographyId];
          } else {
            templateInfo.GEOGRAPHY = null;
          }
          templateInfo.OBJECTID = currentFeature.attributes[this.config.assetTableFields.OBJECTID];
          assetTemplateInfo[assetGUID] = templateInfo;
        }));
        this._loadProject(selectedProject, assetIds, assetTemplateInfo);
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
      }));
    },

    /**
     * Returns deferred with assets of each layer.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getAssetRequestToLayer: function (globalIds, layerInfo) {
      var queryTask, query, deferred, layer, layerId;
      layerId = layerInfo.layerObject.id;
      layer = layerInfo.layerObject;
      layer.clearSelection();
      deferred = new Deferred();
      queryTask = new QueryTask(layer.url);
      query = new Query();
      query.outFields = ["*"];
      query.returnGeometry = true;
      query.outSpatialReference = this.map.spatialReference;
      query.where = layer.globalIdField + " in ('" + globalIds.join("','") + "')";
      queryTask.execute(query, lang.hitch(this, function (orgAssets) {
        if (orgAssets && orgAssets.features && orgAssets.features.length > 0) {
          deferred.resolve({
            "layerId": layerId,
            "features": orgAssets.features
          });
        } else {
          deferred.resolve({
            "layerId": layerId,
            "features": []
          });
        }
      }), lang.hitch(this, function () {
        deferred.resolve({
          "layerId": layerId,
          "features": []
        });
      }));
      return deferred.promise;
    },

    /**
     * This function is used to query map layer to fetch project names
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getProjectAdditionalCost: function (projectId) {
      var deferred, query, queryTask, additionalCostTableId, url;
      deferred = new Deferred();
      additionalCostTableId = this.config.projectSettings.multiplierAdditionalCostTable;
      if (additionalCostTableId) {
        url = this.layerInfosObj.getTableInfoById(additionalCostTableId).layerObject.url;
        queryTask = new QueryTask(url);
        query = new Query();
        query.outFields = ["*"];
        query.returnGeometry = false;
        query.where = this.config.projectMultiplierFields.PROJECTGUID + " = '" + projectId + "'";
        queryTask.execute(query, lang.hitch(this, function (response) {
          var features = [];
          if (response && response.features) {
            features = response.features;
          }
          deferred.resolve(features);
        }), lang.hitch(this, function () {
          deferred.resolve([]);
        }));
      } else {
        deferred.resolve([]);
      }
      return deferred.promise;
    },

    /**
     * Gets the region name from the GUID for that region.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getRegionName: function (geographyGuidArr) {
      var deferred, query, queryTask, costingGeographyLayerObject;
      deferred = new Deferred();
      //check if costing geometry layer is configured and geographyGuidArr length is grater then 0
      if (this.config.projectSettings.costingGeometryLayer &&
        this.config.projectSettings.geographyField && geographyGuidArr.length > 0) {
        costingGeographyLayerObject =
          this.layerInfosObj.getLayerInfoById(this.config.projectSettings.costingGeometryLayer).
            layerObject;
        queryTask = new QueryTask(costingGeographyLayerObject.url);
        query = new Query();
        query.outFields = [this.config.projectSettings.geographyField, costingGeographyLayerObject.globalIdField];
        query.returnDistinctValues = true;
        query.returnGeometry = false;
        query.where = costingGeographyLayerObject.globalIdField + " in ('" +
          geographyGuidArr.join("','") + "')";
        queryTask.execute(query, lang.hitch(this, function (response) {
          var features = {};
          if (response && response.features) {
            array.forEach(response.features, lang.hitch(this, function (feature) {
              var id, name;
              id = feature.attributes[costingGeographyLayerObject.globalIdField];
              name = feature.attributes[this.config.projectSettings.geographyField];
              features[id] = name;
            }));
          }
          deferred.resolve(features);
        }), lang.hitch(this, function () {
          deferred.resolve([]);
        }));
      } else {
        deferred.resolve([]);
      }
      return deferred.promise;
    },

    /**
     * Selects the features(assets) on map to highlight
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _selectFeaturesOnMap: function (globalIds, layerId) {
      var query, deferred, layer;
      //get layer instance by id
      layer = this.layerInfosObj.getLayerInfoById(layerId).layerObject;
      deferred = new Deferred();
      query = new Query();
      query.where = layer.globalIdField + " in ('" + globalIds.join("','") + "')";
      layer.selectFeatures(query, FeatureLayer.SELECTION_NEW, lang.hitch(this, function (features) {
        if (features && features.length > 0) {
          deferred.resolve(features);
        } else {
          deferred.resolve([]);
        }
      }), lang.hitch(this, function () {
        deferred.resolve([]);
      }));
      return deferred.promise;
    },

    /**
     * Initiates the workflow for showing project on map.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _showProjectOnMap: function (selectedProject, assets) {
      var assetIds = [],
        deferredList = [];
      //create all assetIds array
      array.forEach(assets, lang.hitch(this, function (currentFeature) {
        var assetGUID;
        assetGUID = currentFeature.attributes[this.config.assetTableFields.ASSETGUID];
        assetIds.push(assetGUID);
      }));
      //If no assets to display on map show error
      if (assetIds.length === 0) {
        this._showMessage(this.nls.createLoadProject.noAssetsToViewOnMap);
        return;
      }
      this.loadingIndicator.show();
      //First select project boundary on map
      this._selectFeaturesOnMap([selectedProject.globalIdValue],
        this.config.projectSettings.projectLayer).then(lang.hitch(this, function (projectBoundary) {
        var extentNavigated = false;
        //if valid project boundary set extent to project boundary
        if (projectBoundary.length > 0 && projectBoundary[0].geometry) {
          extentNavigated = true;
          this.map.setExtent(graphicsUtils.graphicsExtent(projectBoundary).expand(1.5));
        }
        //Select assets on map
        array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
          if (assetLayer.editable) {
            deferredList.push(this._selectFeaturesOnMap(assetIds, assetLayer.id));
          }
        }));
        //once all assets are selected set extent if project boundary extent is not set on map
        all(deferredList).then(lang.hitch(this, function (entireAssets) {
          var allFeatures = [];
          this.loadingIndicator.hide();
          if (!extentNavigated) {
            array.forEach(entireAssets, lang.hitch(this, function (features) {
              allFeatures = allFeatures.concat(features);
            }));
            if (allFeatures.length > 0) {
              this.map.setExtent(graphicsUtils.graphicsExtent(allFeatures).expand(1.5));
            } else {
              this._showMessage(this.nls.createLoadProject.noAssetsToViewOnMap);
            }
          }
        }));
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
        this._showMessage(this.nls.createLoadProject.errorInLoadingProject);
      }));
    },

    /**
     * Deletes records form the table for selected project id.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _deleteFromTable: function (tableID, projectIdField, projectId) {
      var table, queryString, deferred, returnValue;
      table = this.layerInfosObj.getTableInfoById(tableID);
      if (table) {
        table = table.layerObject;
      }
      queryString = projectIdField + " = '" + projectId + "'";
      //If project asset table is configured, delete selected feature
      if (table) {
        returnValue = this.appUtils.deleteFeatures(table.url, queryString);
      } else {
        deferred = new Deferred();
        deferred.resolve(false);
        returnValue = deferred.promise;
      }
      return returnValue;
    },

    /**
     * Initiate the workflow of delete project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _deleteProject: function (selectedProject, assets) {
      var projectId;
      this.loadingIndicator.show();
      projectId = selectedProject.globalIdValue;
      this._getRelatedLabelPoint(projectId, selectedProject, assets);
    },

    /**
     * This function is used to delete the details related to the project like assets from the layer etc...
     */
    _deleteDetailsRelatedToProject: function (projectId, selectedProject, assets) {
      var assetIds = [],
        deferredList = [],
        queryString;
      this.emit("deleteProject");
      this.loadingIndicator.show();
      //create all assetIds array
      array.forEach(assets, lang.hitch(this, function (currentFeature) {
        var assetGUID;
        assetGUID = currentFeature.attributes[this.config.assetTableFields.ASSETGUID];
        assetIds.push(assetGUID);
      }));
      //Delete assets from layer
      if (assetIds.length > 0) {
        array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
          var layer, queryString;
          if (assetLayer.editable) {
            layer = this.layerInfosObj.getLayerInfoById(assetLayer.id).layerObject;
            queryString = layer.globalIdField + " in ('" + assetIds.join("','") + "')";
            deferredList.push(this.appUtils.deleteFeatures(layer.url, queryString));
          }
        }));
      }
      //Delete Assets from project asset table
      deferredList.push(
        this._deleteFromTable(this.config.projectSettings.assetTable,
          this.config.assetTableFields.PROJECTGUID, projectId));
      //Delete Additional cost from multiplier additional cost table
      deferredList.push(
        this._deleteFromTable(this.config.projectSettings.multiplierAdditionalCostTable,
          this.config.projectMultiplierFields.PROJECTGUID, projectId));
      //Delete project from project infrastructure layer (project boundary)
      queryString = this.projectLayer.globalIdField + " = '" + selectedProject.globalIdValue + "'";
      deferredList.push(this.appUtils.deleteFeatures(this.projectLayer.url, queryString));
      all(deferredList).then(lang.hitch(this, function () {
        this.loadingIndicator.hide();
        //Make sure the deleted project is removed from drop down
        this.projectNameSelect.removeOption(projectId);
        this._showMessage(this.nls.createLoadProject.projectDeletedMsg);
        //Refresh ProjectInfrastructure Layer so that deleted project should be removed from map
        this.projectLayer.clearSelection();
        this.projectLayer.refresh();
        //Refresh all asset layers so that deleted assets should be removed from map
        array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
          var layer;
          if (assetLayer.editable) {
            layer = this.layerInfosObj.getLayerInfoById(assetLayer.id).layerObject;
            layer.clearSelection();
            layer.refresh();
          }
        }));
      }));
    },

    /**
     * Initiate the workflow of load project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _loadProject: function (selectedProject, assetIds, assetTemplateInfo) {
      var deferredList = [];
      this.loadingIndicator.show();
      //Get all assets if has assetIds
      if (assetIds.length > 0) {
        array.forEach(this.config.layerSettings, lang.hitch(this, function (assetLayer) {
          var layerInfo = this.layerInfosObj.getLayerInfoById(assetLayer.id);
          if (layerInfo && layerInfo.layerObject && assetLayer.editable) {
            deferredList.push(this._getAssetRequestToLayer(assetIds, layerInfo));
          }
        }));
      } else {
        var tempDeferred = new Deferred();
        deferredList.push(tempDeferred.promise);
        tempDeferred.resolve(null);
      }
      all(deferredList).then(lang.hitch(this, function (entireAssets) {
        var assetInfo = {},
          projectInfo;
        projectInfo = {
          "name": selectedProject.label,
          "desc": selectedProject.descValue,
          "projectId": selectedProject.globalIdValue,
          "objectId": selectedProject.objectIdValue
        };
        this.selectedProjectFeatureAttr = selectedProject.prjAttributes;
        array.forEach(entireAssets, lang.hitch(this, function (assetDetail) {
          if (assetDetail) {
            assetInfo[assetDetail.layerId] = assetDetail.features;
          }
        }));
        this._getProjectAdditionalCost(selectedProject.globalIdValue).then(
          lang.hitch(this, function (additionalCostFeatures) {
            this.loadingIndicator.hide();
            this.emit("loadProject", {
              "assetTemplateInfo": assetTemplateInfo,
              "assetInfo": assetInfo,
              "projectInfo": projectInfo,
              "additionalCostInfo": additionalCostFeatures,
              "projectIdField": this.projectLayer.globalIdField
            });
          }), lang.hitch(this, function () {
            this.loadingIndicator.hide();
          }));
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
      }));
    },

    /**
     * This function is used to create pane UI
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _createAndLoadProjectPanes: function () {
      // data to see the create-load project widget
      if (this.paneListData && this.paneListData.length > 0) {
        this._createOrLoadPrj = new ItemList({
          "itemList": this.paneListData,
          openMultiple: false,
          highlighterColor: this.config.selectedThemeColor
        }, domConstruct.create("div", {}, this.createLoadProjectContainer));
        this.own(on(this._createOrLoadPrj, 'refreshUpdateCostEquationWidget', lang.hitch(this, function () {
          this._destroyUpdateCostEquationWidget();
          this._getProjectNamesOptions();
        })));
        this.own(on(this._createOrLoadPrj, 'resetLoadProjectNameDropdown', lang.hitch(this, function () {
          this.projectNameSelect.set("value", 'defaultSelectProjectNameOption');
        })));
        // to toggle tabindex of dom elements depending on panel state open/close
        this.own(on(this._createOrLoadPrj, 'OnOpenCreatePanel', lang.hitch(this, function () {
          var createProjectContentDOMArray = query(".esriCTCreateProjectContent", this.domNode);
          if (createProjectContentDOMArray && createProjectContentDOMArray.length) {
            this._updateTabindexOfInputDOM(createProjectContentDOMArray[0], "0");
            this._updateTabindexOfInputDOM(createProjectContentDOMArray[1], "0");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[0], "0");
            focusUtils.focus(createProjectContentDOMArray[0].domNode);
          }
        })));
        this.own(on(this._createOrLoadPrj, 'OnCloseCreatePanel', lang.hitch(this, function () {
          var createProjectContentDOMArray = query(".esriCTCreateProjectContent", this.domNode);
          if (createProjectContentDOMArray && createProjectContentDOMArray.length) {
            this._updateTabindexOfInputDOM(createProjectContentDOMArray[0], "-1");
            this._updateTabindexOfInputDOM(createProjectContentDOMArray[1], "-1");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[0], "-1");
          }
        })));
        // to toggle tabindex of dom elements depending on panel state open/close
        this.own(on(this._createOrLoadPrj, 'OnOpenLoadPanel', lang.hitch(this, function () {
          var createProjectContentDOMArray = query(".esriCTCreateProjectContent", this.domNode);
          if (createProjectContentDOMArray && createProjectContentDOMArray.length) {
            this._updateTabindexOfDOM(createProjectContentDOMArray[2].children[0], "0");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[1], "0");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[2], "0");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[3], "0");
            if (!this.config.updateCostEquationCheckBoxStatus) {
              this.updateLastFocusNode(this.createLoadProjectButtonArray[3], this.widgetDomNode);
            }
            focusUtils.focus(createProjectContentDOMArray[2].children[0]);
          }
        })));
        this.own(on(this._createOrLoadPrj, 'OnCloseLoadPanel', lang.hitch(this, function () {
          var createProjectContentDOMArray;
          createProjectContentDOMArray = query(".esriCTCreateProjectContent", this.domNode);
          if (createProjectContentDOMArray && createProjectContentDOMArray.length) {
            this._updateTabindexOfDOM(createProjectContentDOMArray[2].children[0], "-1");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[1], "-1");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[2], "-1");
            this._updateTabindexOfDOM(this.createLoadProjectButtonArray[3], "-1");
            this._getLastTitleContainerNode();
          }
        })));
        this._createOrLoadPrj.startup();
      }
    },

    /**
     * This function is used to get last title container node
     */
    _getLastTitleContainerNode: function () {
      var titleContainerArray, titleContainerArrayLen;
      titleContainerArray = query(".esriCTItemTitleContainer", this.domNode);
      titleContainerArrayLen = titleContainerArray.length;
      if (titleContainerArrayLen) {
        this.updateLastFocusNode(titleContainerArray[titleContainerArrayLen - 1], this.widgetDomNode);
      }
    },

    /**
     * This function is used to get all checkboxes of update equation panel
     */
    _getUpdateCostEquationProjectNameDOM: function (tabindexVal, lastFocusNodeFlag) {
      var projectNameCheckboxArray, projectNameCheckboxArrayLen;
      projectNameCheckboxArray = query(".esriCTProjectNameCheckBox", this.domNode);
      projectNameCheckboxArray.forEach(lang.hitch(this, function (node, index) {
        domAttr.set(node, "tabindex", tabindexVal);
        if (lastFocusNodeFlag && index === projectNameCheckboxArrayLen) {
          this.updateLastFocusNode(node, this.widgetDomNode);
        }
      }));
    },

    /**
     * This function is used to update tabindex of DOM elements
     */
    _updateTabindexOfDOM: function (domEle, attrVal) {
      domAttr.set(domEle, "tabindex", attrVal);
    },

    /**
     * This function is used to update tabindex of Input DOM elements
     */
    _updateTabindexOfInputDOM: function (domEle, attrVal) {
      query(".dijitInputInner", domEle).forEach(lang.hitch(this, function (node) {
        this._updateTabindexOfDOM(node, attrVal);
      }));
    },

    /**
     * This function is used to query map layer to fetch project names
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _getProjectNamesOptions: function () {
      var query, queryTask;
      this.loadingIndicator.show();
      queryTask = new QueryTask(this.projectLayer.url);
      query = new Query();
      //We will need all the fields once the project is loaded to do the mapping
      query.outFields = ["*"];
      query.returnGeometry = false;
      query.where = "1=1";
      queryTask.execute(query, lang.hitch(this, function (response) {
        var features = [];
        if (response && response.features) {
          features = response.features;
        }
        this._populateProjectNameOptions(features);
        setTimeout(lang.hitch(this, function () {
          this._displayUpdateCostEquationWidget();
        }), 10);
      }), lang.hitch(this, function () {
        this.loadingIndicator.hide();
      }));
    },

    /**
     * This function is used to set project name drop-down options
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _populateProjectNameOptions: function (features) {
      //create options from each project and populate as options in a drop-down
      this.projectNameOptions = [{
        label: this.nls.createLoadProject.selectProject,
        value: ""
      }];
      array.forEach(features, lang.hitch(this, function (currentFeature) {
        if (this.projectNameField) {
          if (currentFeature.attributes[this.projectNameField] &&
            lang.trim(currentFeature.attributes[this.projectNameField]) !== "") {
            this.projectNameOptions.push({
              label: currentFeature.attributes[this.projectNameField],
              value: currentFeature.attributes[this.projectLayer.globalIdField],
              descValue: currentFeature.attributes[this.projectDescField],
              globalIdValue: currentFeature.attributes[this.projectLayer.globalIdField],
              objectIdValue: currentFeature.attributes[this.projectLayer.objectIdField],
              prjAttributes: currentFeature.attributes
            });
          }
        }
      }));
      this.projectNameSelect.set("options", lang.clone(this.projectNameOptions));
      this.loadingIndicator.hide();
    },

    /**
     * This function validates if the project name is already used,
     * by searching in the options created for load project.
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _validateProjectNameLocally: function (projectName) {
      var filteredArr = [];
      //check is project name dropdown is available and it has options
      if (this.projectNameSelect && this.projectNameSelect.options.length > 0) {
        //loop all the options of load/view/delete project & check if project name already used
        filteredArr = array.filter(this.projectNameSelect.options, function (item) {
          //do case insensitive search
          return item.label.toUpperCase() === projectName.toUpperCase();
        });
      }
      if (filteredArr.length > 0) {
        return false;
      }
      return true;
    },

    /**
     * This function validates if entered project name is found in project layer
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _validateForDuplicateProjectName: function (projectName) {
      var query, queryTask, def;
      def = new Deferred();
      queryTask = new QueryTask(this.projectLayer.url);
      query = new Query();
      query.outFields = [this.projectLayer.objectIdField, this.projectLayer.globalIdField];
      query.returnGeometry = false;
      //do case insensitive search for project name in the layer
      query.where = "UPPER(" + this.projectNameField + ") = '" + projectName.toUpperCase() + "'";
      queryTask.execute(query, lang.hitch(this, function (response) {
        if (response && response.features && response.features.length > 0) {
          def.resolve(true);
        } else {
          def.resolve(false);
        }
      }), lang.hitch(this, function () {
        def.resolve(false);
      }));
      return def.promise;
    },

    /**
     * This function adds entry in project layer for entered project name and desc
     * @memberOf widgets/CostAnalysis/create-load-project
     */
    _addProjectToLayer: function (projectName, projectDesc) {
      var def, featureData;
      def = new Deferred();
      featureData = new Graphic();
      featureData.attributes = (this.projectLayer.templates.length > 0) ?
        this.projectLayer.templates[0].prototype.attributes :
        this.projectLayer.types[0].templates[0].prototype.attributes;
      featureData.attributes[this.projectNameField] = projectName;
      featureData.attributes[this.projectDescField] = projectDesc;
      this.projectLayer.applyEdits([featureData], null, null, lang.hitch(this,
        function (addResults) {
          this.selectedProjectFeatureAttr = featureData.attributes;
          def.resolve(addResults[0]);
        }),
        function (err) {
          def.reject(err);
        });
      return def.promise;
    },

    /**
     * This function is used to fetch the top node of the widget.
     * It is fetched so that it could be used as a scope to the dojo query operation
     */
    _fetchWidgetTopNode: function () {
      var widgetFrame, widgetPanelContent, widgetTopNode;
      if (this.domNode.parentNode) {
        widgetFrame = this.domNode.parentNode;
      }
      if (widgetFrame.parentNode) {
        widgetPanelContent = widgetFrame.parentNode;
      }
      if (widgetPanelContent.parentNode) {
        widgetTopNode = widgetPanelContent.parentNode;
      }
      if (widgetTopNode) {
        this._widgetTopNode = widgetTopNode;
      }
    },

    /**
     * This function is used to instantiate update cost equation widget
     */
    _instantiateUpdateProjectCostWidget: function () {
      this._updateProjectCostWidget = new UpdateProjectCost({
        "nls": this.nls,
        "projectNameOptions": this.projectNameOptions,
        "widgetTopNode": this._widgetTopNode,
        "layerInfosObj": this.layerInfosObj,
        "config": this.config,
        "map": this.map,
        "loadingIndicator": this.loadingIndicator,
        "widgetDomNode": this.widgetDomNode,
        "updateLastFocusNode": this.updateLastFocusNode,
        "setTabindexOfUpdateProjectCost": this._setTabindexOfUpdateProjectCost
      }, domConstruct.create("div", {}, this.updateEquationContainer));
      this.own(on(this._updateProjectCostWidget, 'updateProjectCostWidgetLoaded', lang.hitch(this,
        function () {
          if (domClass.contains(this.updateEquationContainer.parentNode, "esriCTItemContentActive")) {
            this._setTabindexOfUpdateProjectCost(true, this.domNode);
          }
          else {
            this._setTabindexOfUpdateProjectCost(false, this.domNode);
          }
        })));
      this._updateProjectCostWidget.startup();


    },

    /**
     * This function is used to set tabindex Of update project cost
     */
    _setTabindexOfUpdateProjectCost: function (panelOpenFlag, widgetDomNode) {
      var checkBoxNodeArray = query(".esriCTProjectNameCheckBox", widgetDomNode);
      checkBoxNodeArray.forEach(lang.hitch(this, function (checkBoxNode) {
        if (panelOpenFlag) {
          domAttr.set(checkBoxNode, "tabindex", "0");
          if (checkBoxNodeArray.length - 1) {
            this.updateLastFocusNode(checkBoxNode, widgetDomNode);
          }
        }
        else {
          domAttr.set(checkBoxNode, "tabindex", "-1");
          this._setUpdateCostEquationLastFocusNode(widgetDomNode);
        }
      }));
    },

    /**
     * This function is used to set update cost equation title container as last focus node
     */
    _setUpdateCostEquationLastFocusNode: function (refDomNode) {
      var titleContainerArray;
      titleContainerArray = query(".esriCTItemTitleContainer", refDomNode);
      this.updateLastFocusNode(titleContainerArray[2], refDomNode);
    },

    /**
     * This function is used to reset the height of the container in
     * which list of project will be added
     */
    _resetHeight: function () {
      // main node
      var widgetTopNodeHeight = domStyle.getComputedStyle(this._widgetTopNode).height;
      widgetTopNodeHeight = parseFloat(widgetTopNodeHeight);
      // padding deduction
      widgetTopNodeHeight = widgetTopNodeHeight - 28;
      // title node
      var itemTitleContainerArr = query('.esriCTItemTitleContainer', this._widgetTopNode);
      array.forEach(itemTitleContainerArr, lang.hitch(this, function (itemTitleContainerArrObj) {
        var itemTitleHeight = domStyle.getComputedStyle(itemTitleContainerArrObj).height;
        itemTitleHeight = parseFloat(itemTitleHeight);
        widgetTopNodeHeight = widgetTopNodeHeight - itemTitleHeight;
      }));
      // padding deduction
      widgetTopNodeHeight = widgetTopNodeHeight - 30;
      domStyle.set(this.updateEquationContainer, 'height', widgetTopNodeHeight + 'px');
    },

    /**
     * This function is used to destroy the update cost equation widget
     */
    _destroyUpdateCostEquationWidget: function () {
      if (this._updateProjectCostWidget) {
        this._updateProjectCostWidget.destroy();
      }
      this._updateProjectCostWidget = null;
    },

    /**
     * This function is used to display the cost equation widget
     */
    _displayUpdateCostEquationWidget: function () {
      if (this.config.hasOwnProperty("updateCostEquationCheckBoxStatus") &&
        this.config.updateCostEquationCheckBoxStatus) {
        this._resetHeight();
        this._instantiateUpdateProjectCostWidget();
      }
    },

    /**
     * This function is used to delete existing label point
     */
    _deleteExistingLabelPoint: function (labelPointObjectIdArr, projectId, selectedProject, assets) {
      if (labelPointObjectIdArr && labelPointObjectIdArr.length > 0) {
        var pointLayer = this.map.getLayer(this.config.projectSettings.pointLayerCentroid);
        var pointLayerObjectDetails = new FeatureLayer(pointLayer.url, {
          outFields: ["*"]
        });
        pointLayerObjectDetails.onLoad = lang.hitch(this, function () {
          var existingLabelPointGraphicsArr = [];
          array.forEach(labelPointObjectIdArr, lang.hitch(this, function (labelPointObjectId) {
            var attrDetails = {};
            attrDetails[pointLayerObjectDetails.objectIdField] = labelPointObjectId;
            var labelPointGraphic = new Graphic(null, null, attrDetails, null);
            existingLabelPointGraphicsArr.push(labelPointGraphic);
          }));
          pointLayerObjectDetails.applyEdits(null, null, existingLabelPointGraphicsArr,
            lang.hitch(this, function () {
              this.map.getLayer(this.config.projectSettings.pointLayerCentroid).refresh();
              this._deleteDetailsRelatedToProject(projectId, selectedProject, assets);
            }), lang.hitch(this, function () {
              this._deleteDetailsRelatedToProject(projectId, selectedProject, assets);
            }));
        });
      } else {
        this._deleteDetailsRelatedToProject(projectId, selectedProject, assets);
      }
    },

    /**
     * This function is used to get the deferred object which returns existing label point
     */
    _getRelatedLabelPoint: function (projectId, selectedProject, assets) {
      if (this.config.projectSettings.pointLayerCentroid !== '' &&
        this.config.projectSettings.pointLayerCentroid !== null &&
        this.config.projectSettings.pointLayerCentroid !== undefined) {
        var whereClause;
        var pointLayer = this.map.getLayer(this.config.projectSettings.pointLayerCentroid);
        var pointLayerObjectDetails = new FeatureLayer(pointLayer.url, {
          outFields: ["*"]
        });
        pointLayerObjectDetails.onLoad = lang.hitch(this, function () {
          var projectIdFieldName = this._getFieldName(pointLayerObjectDetails, "projectid");
          whereClause = projectIdFieldName + " = '" + projectId + "'";
          var query = new Query();
          query.where = whereClause;
          pointLayerObjectDetails.queryIds(query, lang.hitch(this, function (results) {
            this._deleteExistingLabelPoint(results, projectId, selectedProject, assets);
          }), lang.hitch(this, function () {
            this._deleteDetailsRelatedToProject(projectId, selectedProject, assets);
          }));
        });
      } else {
        this._deleteDetailsRelatedToProject(projectId, selectedProject, assets);
      }
    },

    /**
     * This function is used to get the name of the field used for query operation
     */
    _getFieldName: function (layer, field) {
      var fieldName;
      var fields = layer.fields;
      array.forEach(fields, lang.hitch(this, function (fieldDetail) {
        if (fieldDetail.name.toLowerCase() === field.toLowerCase()) {
          fieldName = fieldDetail.name;
        }
      }));
      return fieldName;
    }
  });
});