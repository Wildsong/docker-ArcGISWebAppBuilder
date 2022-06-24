define({
  "page1": {
    "selectToolHeader": "選擇批次更新記錄的方法。",
    "selectToolDesc": "widget 支援這 3 種方法來產生要更新的所選記錄集。 您只能選擇其中一種方法。 如果需要其中多種方法，請建立 widget 的新執行個體。",
    "selectByShape": "按區域選擇",
    "shapeTypeSelector": "選擇工具以允許其選擇地圖上的圖徵",
    "shapeType": {
      "point": "點",
      "line": "線",
      "polyline": "折線",
      "freehandPolyline": "手繪折線",
      "extent": "範圍",
      "polygon": "面",
      "freehandPolygon": "手繪多邊形"
    },
    "freehandPolygon": "手繪多邊形",
    "selectBySpatQuery": "按圖徵選擇",
    "selectByAttQuery": "按圖徵與分享的屬性值選擇",
    "selectByQuery": "按查詢選擇",
    "toolNotSelected": "請選擇一個選擇方法",
    "noDrawToolSelected": "請至少選擇一個繪製工具"
  },
  "page2": {
    "layersToolHeader": "選擇要更新的圖層及選擇工具選項 (若有的話)。",
    "layersToolDesc": "您從上一個頁籤中選擇的選擇類型，將用於從下列的一組圖層中選擇和更新圖徵。 如果您勾選多個要更新的圖層，則只能更新常見的可編輯欄位。 依據選擇類型，可能需要使用其他選項。",
    "layerTable": {
      "colUpdate": "更新",
      "colLabel": "圖層(L)",
      "colSelectByLayer": "按圖層選擇",
      "colSelectByField": "查詢欄位",
      "colhighlightSymbol": "突顯符號"
    },
    "toggleLayers": "切換圖層的可見度開關",
    "noEditableLayers": "無可編輯的圖層",
    "noLayersSelected": "先選擇一或多個圖層再繼續。"
  },
  "page3": {
    "commonFieldsHeader": "選擇要批次更新的欄位。",
    "commonFieldsDesc": "下列只會顯示一般的可編輯欄位。 請選擇要更新的欄位。 如果在不同的圖層中找到分享相同欄位名稱的欄位，但具有不同的網域，則只能使用一個網域。",
    "noCommonFields": "無一般欄位",
    "fieldTable": {
      "colEdit": "可編輯",
      "colName": "名稱",
      "colAlias": "別名",
      "colAction": "操作"
    }
  },
  "tabs": {
    "selection": "定義選擇類型",
    "layers": "定義要更新的圖層",
    "fields": "定義要更新的欄位"
  },
  "errorOnOk": "請先填寫所有參數再儲存配置",
  "next": "下一頁",
  "back": "返回",
  "save": "儲存符號",
  "cancel": "取消",
  "ok": "確定",
  "symbolPopup": "符號選擇器",
  "editHeaderText": "要在 widget 頂端顯示的文字",
  "widgetIntroSelectByArea": "使用下列其中一個工具來建立要更新的所選圖徵集。 如果<font class='maxRecordInIntro'>突顯</font>列，則表示已超過記錄數上限。",
  "widgetIntroSelectByFeature": "使用下列工具，從 <font class='layerInIntro'>${0}</font> 圖層中選擇圖徵。 此圖徵將用於選擇和更新所有相交圖徵。 如果<font class='maxRecordInIntro'>突顯</font>列，則表示已超過記錄數上限。",
  "widgetIntroSelectByFeatureQuery": "使用下列工具，從 <font class='layerInIntro'>${0}</font> 選擇圖徵。 此圖徵的 <font class='layerInIntro'>${1}</font> 屬性將用來查詢下列圖層及更新結果圖徵。 如果<font class='maxRecordInIntro'>突顯</font>列，則表示已超過記錄數上限。",
  "widgetIntroSelectByQuery": "輸入值以建立選擇集。 如果<font class='maxRecordInIntro'>突顯</font>列，則表示已超過記錄數上限。"
});