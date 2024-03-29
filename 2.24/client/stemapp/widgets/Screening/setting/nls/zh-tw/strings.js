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
  "units": {
    "areaSquareFeetUnit": "平方英呎",
    "areaAcresUnit": "英畝",
    "areaSquareMetersUnit": "平方公尺",
    "areaSquareKilometersUnit": "平方公里",
    "areaHectaresUnit": "公頃",
    "areaSquareMilesUnit": "平方英哩",
    "lengthFeetUnit": "英呎",
    "lengthMilesUnit": "英哩",
    "lengthMetersUnit": "公尺",
    "lengthKilometersUnit": "公里"
  },
  "analysisTab": {
    "analysisTabLabel": "分析",
    "selectAnalysisLayerLabel": "分析圖層",
    "addLayerLabel": "新增圖層",
    "noValidLayersForAnalysis": "在選擇的 Web 地圖中找不到有效的圖層。",
    "noValidFieldsForAnalysis": "在選擇的 Web 地圖中找不到有效的欄位。 請移除所選圖層。",
    "allowGroupingLabel": "按具有相同值的欄位分組圖徵",
    "groupingHintDescription": "提示: 依預設，將分組具有選定欄位之相同值的所有圖徵，將其在報告中顯示為單一項目。 停用按類似屬性分組，改為針對每個圖徵顯示一個項目。",
    "addLayersHintText": "提示: 選擇分析和報告中要包含的圖層和欄位",
    "queryCapabilityHintText": "只會列出具有查詢功能的圖層",
    "addLayerNameTitle": "圖層名稱",
    "addFieldsLabel": "增加欄位",
    "addFieldsPopupTitle": "選擇欄位",
    "addFieldsNameTitle": "欄位名稱",
    "aoiToolsLegendLabel": "感興趣區域工具",
    "aoiToolsDescriptionLabel": "選擇和標示可用於建立感興趣區域的工具。",
    "placenameLabel": "地點名稱",
    "drawToolsLabel": "選擇繪製工具",
    "uploadShapeFileLabel": "上傳 shapefile",
    "coordinatesLabel": "座標",
    "coordinatesDrpDwnHintText": "提示: 選擇單位以顯示輸入的行程",
    "coordinatesBearingDrpDwnHintText": "提示: 選擇方位以顯示輸入的行程",
    "allowShapefilesUploadLabel": "允許使用者上傳分析中要加入的 shapefile",
    "allowShapefilesUploadLabelHintText": "提示: 將選項新增至「報告」頁籤，供使用者上傳其自己的資料以作為 shapefile，從而在分析報告中加入他們",
    "allowVisibleLayerAnalysisLabel": "請勿分析或報告不可見圖層的結果。",
    "allowVisibleLayerAnalysisHintText": "提示: 不會在列印或下載的結果中，分析或加入因比例範圍設定而已關閉或不可見的圖層。",
    "areaUnitsLabel": "用於分析結果的單位(面積)",
    "lengthUnitsLabel": "用於分析結果的單位(長度)",
    "maxFeatureForAnalysisLabel": "要分析的圖徵量上限",
    "maxFeatureForAnalysisHintText": "提示: 設定分析將包含的圖徵數上限",
    "searchToleranceLabelText": "搜尋容差",
    "searchToleranceHint": "提示: 分析點和線條輸入時可使用搜尋容差",
    "placenameButtonText": "地點名稱",
    "drawToolsButtonText": "繪製",
    "shapefileButtonText": "Shapefile",
    "coordinatesButtonText": "座標",
    "invalidLayerErrorMsg": "請配置欄位",
    "drawToolSelectableLayersLabel": "選擇可選擇的圖層",
    "drawToolSelectableLayersHint": "提示: 選擇包含圖徵的圖層，可使用「選擇繪製工具」來選擇這些圖徵",
    "drawToolsSettingsFieldsetLabel": "繪製工具",
    "drawToolPointLabel": "點",
    "drawToolPolylineLabel": "折線",
    "drawToolExtentLabel": "範圍",
    "drawToolPolygonLabel": "面",
    "drawToolCircleLabel": "圓形",
    "selectDrawToolsText": "選擇可用於建立感興趣區域的繪製工具",
    "selectingDrawToolErrorMessage": "至少選擇一個繪製工具或選擇圖層，以針對 AOI 工具使用繪製工具。",
    "sortingSettingsLegend": "排序設定",
    "ascendingLabel": "遞增",
    "descendingLabel": "降冪",
    "sortFieldSelectLabel": "選擇排序欄位",
    "statisticsCountLabel": "統計資料: 計數",
    "statisticsTotalLengthLabel": "統計資料: 總長度",
    "statisticsTotalAreaLabel": "統計資料: 總面積"
  },
  "downloadTab": {
    "downloadLegend": "下載設定",
    "reportLegend": "報告設定",
    "downloadTabLabel": "下載",
    "syncEnableOptionLabel": "圖徵圖層",
    "syncEnableOptionHint": "提示: 選擇可下載的圖層，並指定每個圖層的可用格式。 下載的資料集將包含與感興趣區域相交的圖徵。",
    "syncEnableOptionNote": "附註: 檔案地理資料庫和 shapefile 下載需要具備同步功能的圖徵圖層。 shapefile 格式僅支援 ArcGIS Online 託管圖徵圖層。",
    "extractDataTaskOptionLabel": "擷取資料任務地理處理服務",
    "extractDataTaskOptionHint": "提示: 使用發佈的「擷取資料任務」地理處理服務，下載與檔案地理資料庫或 Shapefile 格式的感興趣區域相交的圖徵。",
    "cannotDownloadOptionLabel": "停用下載",
    "syncEnableTableHeaderTitle": {
      "layerNameLabel": "圖層名稱",
      "csvFileFormatLabel": "CSV",
      "fileGDBFormatLabel": "檔案地理資料庫",
      "ShapefileFormatLabel": "Shapefile",
      "allowDownloadLabel": "允許下載"
    },
    "setButtonLabel": "設定",
    "GPTaskLabel": "指定地理處理服務的 url",
    "printGPServiceLabel": "列印服務 URL",
    "setGPTaskTitle": "指定必要的地理處理服務 URL",
    "logoLabel": "標誌",
    "logoChooserHint": "提示: 按一下圖片圖示以變更報告左上角所顯示的標誌。",
    "footnoteLabel": "註腳",
    "columnTitleColorPickerLabel": "報告欄標題顏色",
    "reportTitleLabel": "報告標題",
    "displaySummaryLabel": "顯示摘要",
    "hideZeroValueRowLabel": "針對所有分析欄位隱藏含 0 值的列",
    "hideNullValueRowLabel": "針對所有分析欄位隱藏無資料值 (null 或空白) 的列",
    "errorMessages": {
      "invalidGPTaskURL": "地理處理服務無效。 請選擇包含擷取資料任務的地理處理服務。",
      "noExtractDataTaskURL": "請選擇包含擷取資料任務的地理處理服務。",
      "duplicateCustomOption": "存在 ${duplicateValueSizeName} 的重複項目。",
      "invalidLayoutWidth": "為 ${customLayoutOptionValue} 輸入的寬度無效。",
      "invalidLayoutHeight": "為 ${customLayoutOptionValue} 輸入的高度無效。",
      "invalidLayoutPageUnits": "為 ${customLayoutOptionValue} 選擇的頁面單位無效。",
      "failtofetchbuddyTaskDimension": "擷取好友任務維度資訊時出錯。請再試一次。",
      "failtofetchbuddyTaskName": "擷取好友任務名稱時出錯。請再試一次。",
      "failtofetchChoiceList": "從列印服務擷取選項清單時出錯。請再試一次。",
      "invalidWidth": "寬度無效。",
      "invalidHeight": "高度無效。"
    },
    "addCustomLayoutTitle": "新增自訂版面配置",
    "customLayoutOptionHint": "提示: 將版面配置從您的列印服務新增到列印選項清單。",
    "reportDefaultOptionLabel": "預設版面配置",
    "pageSizeUnits": {
      "millimeters": "公釐",
      "points": "點"
    },
    "noDataTextRepresentation": "無資料值",
    "naTextRepresentation": "不適用的值",
    "noDataDefaultText": "無資料",
    "notApplicableDefaultText": "無"
  },
  "generalTab": {
    "generalTabLabel": "一般",
    "tabLabelsLegend": "面板標籤",
    "tabLabelsHint": "提示: 指定標籤",
    "AOITabLabel": "感興趣區域面板",
    "ReportTabLabel": "報告面板",
    "bufferSettingsLegend": "緩衝區設定",
    "defaultBufferDistanceLabel": "預設緩衝區距離",
    "defaultBufferUnitsLabel": "緩衝區單位",
    "generalBufferSymbologyHint": "提示: 用來表示定義的感興趣區域周圍之緩衝區域的符號系統。",
    "aoiGraphicsSymbologyLegend": "感興趣區域符號系統",
    "aoiGraphicsSymbologyHint": "提示: 用來表示點、線和多邊形的感興趣區域的符號系統",
    "pointSymbologyLabel": "點",
    "previewLabel": "預覽",
    "lineSymbologyLabel": "線",
    "polygonSymbologyLabel": "面",
    "aoiBufferSymbologyLabel": "緩衝區符號系統",
    "pointSymbolChooserPopupTitle": "地址或點位置符號",
    "polygonSymbolChooserPopupTitle": "面符號",
    "lineSymbolChooserPopupTitle": "線符號",
    "aoiSymbolChooserPopupTitle": "緩衝區符號",
    "aoiTabText": "AOI",
    "reportTabText": "報告",
    "invalidSymbolValue": "符號值無效。"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "搜尋來源設定",
    "searchSourceSettingTitle": "搜尋來源設定",
    "searchSourceSettingTitleHintText": "新增並配置地理編碼服務或圖徵圖層為搜尋來源。這些指定的來源決定了搜尋方塊中的可搜尋內容",
    "addSearchSourceLabel": "新增搜尋來源",
    "featureLayerLabel": "圖徵圖層",
    "geocoderLabel": "地理編碼器",
    "generalSettingLabel": "一般設定",
    "allPlaceholderLabel": "用於全部搜尋的占位符文字:",
    "allPlaceholderHintText": "提示: 輸入在搜尋所有圖層和地理編碼器時，要顯示成佔位符的文字",
    "generalSettingCheckboxLabel": "顯示發現的圖徵或位置的快顯視窗",
    "countryCode": "國碼或地區代碼",
    "countryCodeEg": "例如 ",
    "countryCodeHint": "留空此值會搜尋所有國家和地區",
    "questionMark": "?",
    "searchInCurrentMapExtent": "僅在目前的地圖範圍中搜尋",
    "locatorUrl": "地理編碼器 URL",
    "locatorName": "地理編碼器名稱",
    "locatorExample": "範例",
    "locatorWarning": "不支援此版本的地理編碼服務。該 widget支援 10.0 及更高版本的地理編碼服務。",
    "locatorTips": "由於地理編碼服務不支援建議功能，因此建議無法使用。",
    "layerSource": "圖層來源",
    "setLayerSource": "設定圖層來源",
    "setGeocoderURL": "設定地理編碼器 URL",
    "searchLayerTips": "由於圖徵服務不支援分頁功能，因此建議無法使用。",
    "placeholder": "佔位符文字",
    "searchFields": "搜尋欄位",
    "displayField": "顯示欄位",
    "exactMatch": "完全相符",
    "maxSuggestions": "最大建議數",
    "maxResults": "最大結果數",
    "enableLocalSearch": "啟用本機搜尋",
    "minScale": "最小比例",
    "minScaleHint": "當地圖比例大於此比例時，將套用本機搜尋",
    "radius": "半徑",
    "radiusHint": "指定目前地圖中心周圍的區域半徑，可用來提升地理編碼候選者的等級，以優先傳回離位置最近的候選者",
    "setSearchFields": "設定搜尋欄位",
    "set": "設定",
    "invalidUrlTip": "URL ${URL} 無效或不可存取。",
    "invalidSearchSources": "搜尋來源設定無效"
  },
  "errorMsg": {
    "textboxFieldsEmptyErrorMsg": "請填寫必要欄位",
    "bufferDistanceFieldsErrorMsg": "請輸入有效值",
    "invalidSearchToleranceErrorMsg": "請輸入搜尋容差的有效值",
    "atLeastOneCheckboxCheckedErrorMsg": "配置無效: 至少需要一個感興趣區域工具。",
    "noLayerAvailableErrorMsg": "沒有可用的圖層",
    "layerNotSupportedErrorMsg": "不支援 ",
    "noFieldSelected": "請使用編輯動作以選擇欄位進行分析。",
    "duplicateFieldsLabels": "已經為 \"${itemNames}\" 新增重複的標籤 \"${labelText}\"",
    "noLayerSelected": "請至少選擇一個圖層進行分析。",
    "errorInSelectingLayer": "無法選擇圖層。 請再試一次。",
    "errorInMaxFeatureCount": "請輸入用於分析的有效圖徵計數上限。"
  }
});