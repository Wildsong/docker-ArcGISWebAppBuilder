define({
  "page1": {
    "selectToolHeader": "选择一种方法，以选择要进行批量更新的记录。",
    "selectToolDesc": "微件支持以这 3 种方法生成待更新的选定记录集。 只能选择其中一种方法。 如果需要多种方法，请创建微件的新实例。",
    "selectByShape": "根据区域选择",
    "shapeTypeSelector": "选择允许在地图上选择要素的工具",
    "shapeType": {
      "point": "点",
      "line": "线",
      "polyline": "折线",
      "freehandPolyline": "手绘折线",
      "extent": "范围",
      "polygon": "面",
      "freehandPolygon": "手绘面"
    },
    "freehandPolygon": "手绘面",
    "selectBySpatQuery": "根据要素选择",
    "selectByAttQuery": "按要素和共享属性值选择",
    "selectByQuery": "根据查询选择",
    "toolNotSelected": "请选择一种选择方法",
    "noDrawToolSelected": "请至少选择一个绘图工具"
  },
  "page2": {
    "layersToolHeader": "选择要更新的图层和选择工具选项(如果存在)。",
    "layersToolDesc": "您从上一个选项卡中选择的选择类型将用于从下面列出的一组图层中选择和更新要素。 如果您选中多个要更新的图层，则只有常见的可编辑字段可用于更新。 根据选择类型，将需要其他选项。",
    "layerTable": {
      "colUpdate": "更新",
      "colLabel": "图层",
      "colSelectByLayer": "根据图层选择",
      "colSelectByField": "查询字段",
      "colhighlightSymbol": "高亮显示符号"
    },
    "toggleLayers": "在打开与关闭之间切换图层的可见性",
    "noEditableLayers": "无可编辑图层",
    "noLayersSelected": "在继续处理前请选择一个或多个图层。"
  },
  "page3": {
    "commonFieldsHeader": "选择要批量更新的字段。",
    "commonFieldsDesc": "下面将仅显示常见的可编辑字段。 请选择您要更新的字段。 如果在不同图层中发现共享相同字段名称的字段，但具有不同的属性域，则只能使用一个属性域。",
    "noCommonFields": "无通用字段",
    "fieldTable": {
      "colEdit": "可编辑",
      "colName": "名称",
      "colAlias": "别名",
      "colAction": "操作"
    }
  },
  "tabs": {
    "selection": "定义选择类型",
    "layers": "定义要更新的图层",
    "fields": "定义要更新的字段"
  },
  "errorOnOk": "请在保存配置前填写所有参数",
  "next": "前进",
  "back": "后退",
  "save": "保存符号",
  "cancel": "取消",
  "ok": "确定",
  "symbolPopup": "符号选择器",
  "editHeaderText": "要在微件顶部显示的文本",
  "widgetIntroSelectByArea": "请使用以下工具之一以创建要更新的所选要素集。 如果行<font class='maxRecordInIntro'>突出显示</font>，则已超出最大记录数。",
  "widgetIntroSelectByFeature": "使用下面的工具从 <font class='layerInIntro'>${0}</font> 图层中选择要素。 将使用此要素选择和更新所有相交要素。 如果行<font class='maxRecordInIntro'>突出显示</font>，则表示已超出最大记录数。",
  "widgetIntroSelectByFeatureQuery": "使用以下工具从 <font class='layerInIntro'>${0}</font> 中选择要素。 将使用此要素的 <font class='layerInIntro'>${1}</font> 属性来查询以下图层并更新生成的要素。 如果行<font class='maxRecordInIntro'>突出显示</font>，则已超出最大记录数。",
  "widgetIntroSelectByQuery": "输入用于创建选择集的值。 如果行<font class='maxRecordInIntro'>突出显示</font>，则已超出最大记录数。"
});