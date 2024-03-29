﻿///////////////////////////////////////////////////////////////////////////
// Copyright ï¿½ Esri. All Rights Reserved.
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
define({
  "_widgetLabel": "筛查",
  "geometryServicesNotFound": "几何服务不可用。",
  "unableToDrawBuffer": "无法绘制缓冲区。请重试。",
  "invalidConfiguration": "无效的配置。",
  "clearAOIButtonLabel": "重新开始",
  "noGraphicsShapefile": "上传的 shapefile 不含图形。",
  "zoomToLocationTooltipText": "缩放至位置",
  "noGraphicsToZoomMessage": "找不到可缩放的图形。",
  "placenameWidget": {
    "placenameLabel": "搜索位置"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "选择绘制模式",
    "toggleSelectability": "单击以切换可选择性",
    "chooseLayerTitle": "选择可选的图层",
    "selectAllLayersText": "全选",
    "layerSelectionWarningTooltip": "创建感兴趣区域至少应选择一个图层",
    "selectToolLabel": "选择工具"
  },
  "shapefileWidget": {
    "shapefileLabel": "上传压缩的 shapefile",
    "uploadShapefileButtonText": "上传",
    "unableToUploadShapefileMessage": "无法上传 shapefile。"
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "定义起点",
    "addButtonTitle": "添加",
    "deleteButtonTitle": "移除",
    "mapTooltipForStartPoint": "单击地图以定义起点",
    "mapTooltipForUpdateStartPoint": "单击地图以更新起点",
    "locateText": "定位",
    "locateByMapClickText": "选择初始坐标",
    "enterBearingAndDistanceLabel": "输入距离起点的方位角和距离",
    "bearingTitle": "方位角",
    "distanceTitle": "距离",
    "planSettingTooltip": "测量图设置",
    "invalidLatLongMessage": "请输入有效值。"
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "缓冲距离(可选)",
    "bufferInputLabel": "显示以下范围内的结果",
    "bufferDistanceLabel": "缓冲距离",
    "bufferUnitLabel": "缓冲区单位"
  },
  "traverseSettings": {
    "bearingLabel": "方位角",
    "lengthLabel": "长度",
    "addButtonTitle": "添加",
    "deleteButtonTitle": "移除",
    "deleteBearingAndLengthLabel": "移除方位角和长度行",
    "addButtonLabel": "添加方位角和长度"
  },
  "planSettings": {
    "expandGridTooltipText": "展开格网",
    "collapseGridTooltipText": "折叠格网",
    "directionUnitLabelText": "方向单位",
    "distanceUnitLabelText": "距离和长度单位",
    "planSettingsComingSoonText": "即将推出"
  },
  "newTraverse": {
    "invalidBearingMessage": "方位角无效。",
    "invalidLengthMessage": "长度无效。",
    "negativeLengthMessage": "负值长度"
  },
  "reportsTab": {
    "aoiAreaText": "感兴趣区域",
    "downloadButtonTooltip": "下载",
    "printButtonTooltip": "打印",
    "uploadShapefileForAnalysisText": "上传 shapefile 以将其包括在分析中",
    "uploadShapefileForButtonText": "浏览",
    "downloadLabelText": "选择格式：",
    "downloadBtnText": "下载",
    "noDetailsAvailableText": "未找到任何结果",
    "featureCountText": "计数",
    "featureAreaText": "区域",
    "featureLengthText": "长度",
    "attributeChooserTooltip": "选择要显示的属性",
    "csv": "CSV",
    "filegdb": "文件地理数据库",
    "shapefile": "Shapefile",
    "noFeaturesFound": "未找到所选文件格式的结果",
    "selectReportFieldTitle": "选择文件",
    "noFieldsSelected": "未选择字段",
    "intersectingFeatureExceedsMsgOnCompletion": "一个或多个图层超过最大记录计数。",
    "unableToAnalyzeText": "无法分析，已超过最大记录计数。",
    "errorInPrintingReport": "无法打印报表。请检查报表设置是否有效。",
    "aoiInformationTitle": "感兴趣区域(AOI)信息",
    "summaryReportTitle": "汇总",
    "notApplicableText": "N/A",
    "downloadReportConfirmTitle": "确认下载",
    "downloadReportConfirmMessage": "是否确认下载?",
    "noDataText": "无数据",
    "createReplicaFailedMessage": "以下图层的下载操作失败：<br/> ${layerNames}",
    "extractDataTaskFailedMessage": "下载操作失败。",
    "printLayoutLabelText": "布局",
    "printBtnText": "打印",
    "printDialogHint": "注意：可在报表预览中编辑报表标题和评论。",
    "unableToDownloadFileGDBText": "无法为包含点或线位置的 AOI 下载文件地理数据库。",
    "unableToDownloadShapefileText": "无法为包含点或线位置的感兴趣区域下载 Shapefile。",
    "analysisAreaUnitLabelText": "以下列单位显示面积结果：",
    "analysisLengthUnitLabelText": "以下列单位显示长度结果：",
    "analysisUnitButtonTooltip": "选择要分析的单位",
    "analysisCloseBtnText": "关闭",
    "areaSquareFeetUnit": "平方英尺",
    "areaAcresUnit": "英亩",
    "areaSquareMetersUnit": "平方米",
    "areaSquareKilometersUnit": "平方千米",
    "areaHectaresUnit": "公顷",
    "areaSquareMilesUnit": "平方英里",
    "lengthFeetUnit": "英尺",
    "lengthMilesUnit": "英里",
    "lengthMetersUnit": "米",
    "lengthKilometersUnit": "千米",
    "hectaresAbbr": "公顷",
    "squareMilesAbbr": "平方英里",
    "layerNotVisibleText": "无法分析。 图层关闭或超出比例可见范围。",
    "refreshBtnTooltip": "刷新报表",
    "featureCSVAreaText": "与区域相交",
    "featureCSVLengthText": "与长度相交",
    "errorInFetchingPrintTask": "获取打印任务信息时出错。请再试一次。",
    "selectAllLabel": "全选",
    "errorInLoadingProjectionModule": "加载工程模块的依赖项时出错。 请再次尝试下载该文件。",
    "expandCollapseIconLabel": "相交要素",
    "intersectedFeatureLabel": "相交要素详细信息",
    "valueAriaLabel": "值",
    "countAriaLabel": "计数",
    "layerNameWithFeatureCount": "${layerName} 图层具有 ${featureCount} 个相交要素",
    "sortingSettingsLegend": "排序设置",
    "ascendingLabel": "升序",
    "descendingLabel": "降序",
    "sortFieldSelectLabel": "选择排序字段",
    "errorLabel": "服务器遇到临时错误，无法完成查询。",
    "statisticsCountLabel": "统计数据：计数",
    "statisticsTotalLengthLabel": "统计数据：总长度",
    "statisticsTotalAreaLabel": "统计数据：总面积",
    "timedOutErrorLabel": "服务器超时",
    "sortHint": "提示：仅当要素/群组数量大于 1 时，才会对所选字段进行排序。"
  }
});