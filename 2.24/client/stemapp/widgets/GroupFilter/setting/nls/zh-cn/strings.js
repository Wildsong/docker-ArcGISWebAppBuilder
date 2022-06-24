define({
  "configText": "定义以下过滤群组",
  "labels": {
    "groupName": "组名称：",
    "groupNameTip": "提供此过滤器组的名称。 它将显示在可用过滤器组的下拉列表中。",
    "groupDesc": "描述:",
    "groupDescTip": "提供此过滤器组的描述",
    "groupOperator": "预设运算符:",
    "groupOperatorTip": "预定义过滤器运算符的选项。 如果未选择预设运算符，则过滤器将使用 EQUALS 运算符。",
    "groupDefault": "预设值:",
    "groupDefaultTip": "用于输入值或从图层中选择现有值的选项。 单击搜索图标以浏览图层。",
    "sameLayerAppend": "当多次列出图层时：",
    "sameLayerConjunc": "使用以下内容进行追加：",
    "caseSearch": "执行区分大小写的搜索： ",
    "headerTextHelp": "提供要显示在过滤器选择上方的文本"
  },
  "buttons": {
    "addNewGroup": "添加新群组",
    "addNewGroupTip": "添加新过滤器组",
    "addLayer": "添加图层",
    "addLayerTip": "将图层添加到过滤器组"
  },
  "inputs": {
    "groupName": "过滤器组名称",
    "groupDesc": "群组描述",
    "groupDefault": "输入预定义值",
    "sameLayerAny": "匹配任意表达式",
    "sameLayerAll": "匹配所有表达式",
    "simpleMode": "在简单视图中开始",
    "simpleModeTip": "简化微件界面。 选中后，运算符下拉列表和添加条件按钮将被隐藏。",
    "webmapAppendModeAny": "向现有地图过滤器追加任意表达式",
    "webmapAppendModeAll": "向现有地图过滤器追加所有表达式",
    "webmapAppendModeTip": "将过滤器组追加到 web 地图中现有过滤器的选项",
    "persistOnClose": "关闭微件后保留过滤器",
    "selectGroup": "选择群组以过滤",
    "hideDropDown": "隐藏标题和 1 组过滤器",
    "hideDropDownTip": "如果仅配置了 1 个过滤器组，则隐藏标题和下拉列表",
    "optionsMode": "隐藏微件选项",
    "optionsModeTip": "提供其他微件设置的选项。 选中后，保存和加载预定义过滤器和微件关闭后继续使用过滤器将从界面中隐藏。",
    "optionOR": "或",
    "optionAND": "且",
    "optionEQUAL": "等于",
    "optionNOTEQUAL": "不等于",
    "optionGREATERTHAN": "大于",
    "optionGREATERTHANEQUAL": "大于或等于",
    "optionLESSTHAN": "小于",
    "optionLESSTHANEQUAL": "小于或等于",
    "optionSTART": "开头是",
    "optionEND": "结尾是",
    "optionLIKE": "包含",
    "optionLIKESPECIFIC": "包含特定值",
    "optionNOTLIKESPECIFIC": "不含特定值",
    "optionNOTLIKE": "不包含",
    "optionONORBEFORE": "在上面或前面",
    "optionONORAFTER": "在上面或后面",
    "optionNONE": "无"
  },
  "tables": {
    "layer": "图层",
    "layerTip": "地图中定义的图层名称。",
    "field": "字段",
    "fieldTip": "过滤图层所依据的字段。",
    "value": "使用值",
    "valueTip": "使用图层中下拉列表值的选项。如果没有图层使用此参数，则将向用户显示纯文本框。",
    "zoomTo": "缩放至结果",
    "zoomTip": "应用过滤器后缩放至要素范围的选项",
    "action": "删除",
    "actionTip": "从过滤器集中移除图层。"
  },
  "popupHeader": {
    "label": "选取预设值"
  },
  "errors": {
    "noGroups": "您至少需要一个群组。",
    "noGroupName": "一个或多个群组名称缺失。",
    "noDuplicates": "一个或多个群组名称重复。",
    "noRows": "您至少需要表中的一行。",
    "noLayers": "您的地图中没有图层。"
  },
  "picker": {
    "description": "查找该群组的预设值。",
    "layer": "选择图层",
    "layerTip": "Web 地图中定义的图层名称。",
    "field": "选择字段",
    "fieldTip": "设置预设值所依据的字段。",
    "value": "选择值",
    "valueTip": "将成为微件默认值的值。"
  }
});