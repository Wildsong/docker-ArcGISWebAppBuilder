define({
  "configText": "在底下定義您的篩選器群組",
  "labels": {
    "groupName": "群組名稱:",
    "groupNameTip": "提供此篩選器群組的名稱。 該名稱會顯示在可用篩選器群組的下拉式清單中。",
    "groupDesc": "描述:",
    "groupDescTip": "提供此篩選器群組的說明。",
    "groupOperator": "預設運算子:",
    "groupOperatorTip": "可用來預先定義篩選器之運算子的選項。 若未選擇「預設運算子」，篩選器將使用 EQUALS 運算子。",
    "groupDefault": "預設值:",
    "groupDefaultTip": "可輸入值或從圖層中選擇現有值的選項。 按一下「搜尋」圖示以瀏覽圖層。",
    "sameLayerAppend": "多次列出某個圖層時:",
    "sameLayerConjunc": "使用下列項目新增:",
    "caseSearch": "執行區分大小寫搜尋: ",
    "headerTextHelp": "提供文字來顯示上述篩選器選擇"
  },
  "buttons": {
    "addNewGroup": "新增群組",
    "addNewGroupTip": "新增新的篩選器群組",
    "addLayer": "增加圖層",
    "addLayerTip": "新增圖層至篩選器群組"
  },
  "inputs": {
    "groupName": "篩選器群組名稱",
    "groupDesc": "群組的說明",
    "groupDefault": "輸入預先定義的值",
    "sameLayerAny": "符合任何表達式",
    "sameLayerAll": "比對所有表達式",
    "simpleMode": "在簡單視圖中啟動",
    "simpleModeTip": "簡化 Widget 介面。 勾選時，將隱藏運算子下拉式清單和新增條件按鈕。",
    "webmapAppendModeAny": "將任何表達式附加到現有的地圖篩選器",
    "webmapAppendModeAll": "將所有表達式附加到現有的地圖篩選器",
    "webmapAppendModeTip": "將篩選器群組附加至 Web 地圖中現有篩選器的選項",
    "persistOnClose": "Widget 關閉後保留篩選器",
    "selectGroup": "選擇要篩選的群組",
    "hideDropDown": "隱藏 1 個群組的標頭和篩選器",
    "hideDropDownTip": "若只配置 1 個篩選器群組，則隱藏標頭和下拉式清單",
    "optionsMode": "隱藏 Widget 選項",
    "optionsModeTip": "用來公開其他 Widget 設定的選項。 若勾選，則會在介面上隱藏儲存和載入預先定義的篩選器，以及 Widget 關閉後保留篩選器。",
    "optionOR": "OR",
    "optionAND": "AND",
    "optionEQUAL": "EQUALS",
    "optionNOTEQUAL": "NOT EQUAL",
    "optionGREATERTHAN": "GREATER THAN",
    "optionGREATERTHANEQUAL": "GREATER THAN OR EQUAL",
    "optionLESSTHAN": "LESS THAN",
    "optionLESSTHANEQUAL": "LESS THAN OR EQUAL",
    "optionSTART": "BEGINS WITH",
    "optionEND": "ENDS WITH",
    "optionLIKE": "CONTAINS",
    "optionLIKESPECIFIC": "包含特定值",
    "optionNOTLIKESPECIFIC": "不含特定值",
    "optionNOTLIKE": "DOES NOT CONTAIN",
    "optionONORBEFORE": "IS ON OR BEFORE",
    "optionONORAFTER": "IS ON OR AFTER",
    "optionNONE": "NONE"
  },
  "tables": {
    "layer": "圖層",
    "layerTip": "地圖中定義之圖層的名稱。",
    "field": "欄位",
    "fieldTip": "將用來篩選圖層的欄位。",
    "value": "使用值",
    "valueTip": "可從圖層中使用下拉式清單值的選項。如果沒有圖層使用此參數，則會向使用者出示純文字方塊。",
    "zoomTo": "縮放至結果",
    "zoomTip": "套用篩選器後，用於縮放至圖徵範圍的選項",
    "action": "刪除",
    "actionTip": "從篩選集中移除圖層。"
  },
  "popupHeader": {
    "label": "挑選預設值"
  },
  "errors": {
    "noGroups": "您至少需要一個群組。",
    "noGroupName": "缺少一或多個群組名稱。",
    "noDuplicates": "一或多個群組名稱重複。",
    "noRows": "您的表格中至少需要一列。",
    "noLayers": "您的地圖中沒有圖層。"
  },
  "picker": {
    "description": "尋找此群組的預設值。",
    "layer": "選擇圖層",
    "layerTip": "Web 地圖中定義之圖層的名稱。",
    "field": "選擇欄位",
    "fieldTip": "將從中設定預設值的欄位。",
    "value": "選擇值",
    "valueTip": "將成為 widget 之預設值的值。"
  }
});