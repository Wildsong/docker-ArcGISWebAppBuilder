define({
  "configText": "以下のフィルター グループを定義",
  "labels": {
    "groupName": "グループ名:",
    "groupNameTip": "このフィルター グループの名前を指定します。 これは、使用可能なフィルター グループのドロップダウンに表示されます。",
    "groupDesc": "説明:",
    "groupDescTip": "このフィルター グループの説明を入力",
    "groupOperator": "設定済みの演算子:",
    "groupOperatorTip": "フィルターの演算子を事前に定義するオプションです。 [設定済みの演算子] が選択されていない場合、フィルターでは「等しい」演算子が使用されます。",
    "groupDefault": "設定済みの値:",
    "groupDefaultTip": "値を入力するか、レイヤーから既存の値を選択するオプションです。 [検索] アイコンをクリックして、レイヤーを参照します。",
    "sameLayerAppend": "レイヤーが複数回リストに表示されている場合:",
    "sameLayerConjunc": "追加に使用する演算子:",
    "caseSearch": "大文字/小文字を区別して検索を実行: ",
    "headerTextHelp": "フィルターの選択セットの上に表示するテキストを指定"
  },
  "buttons": {
    "addNewGroup": "新規グループの追加",
    "addNewGroupTip": "新しいフィルター グループの追加",
    "addLayer": "レイヤーの追加",
    "addLayerTip": "フィルター グループへのレイヤーの追加"
  },
  "inputs": {
    "groupName": "フィルター グループ名",
    "groupDesc": "グループの説明",
    "groupDefault": "定義済みの値を入力",
    "sameLayerAny": "条件式のいずれかに一致",
    "sameLayerAll": "すべての式に一致",
    "simpleMode": "シンプルなビューで開始",
    "simpleModeTip": "ウィジェット インターフェイスを単純化します。 オンにすると、演算子ドロップダウン リストと条件の追加ボタンが非表示になります。",
    "webmapAppendModeAny": "既存のマップ フィルターに条件式のいずれかを追加",
    "webmapAppendModeAll": "既存のマップ フィルターにすべての条件式を追加",
    "webmapAppendModeTip": "Web マップの既存のフィルターにフィルター グループを追加するオプション",
    "persistOnClose": "ウィジェットを閉じた後にフィルターを維持",
    "selectGroup": "フィルタリングするグループの選択",
    "hideDropDown": "1 つのグループのヘッダーとフィルターを非表示",
    "hideDropDownTip": "1 つのフィルター グループのみが構成されている場合はヘッダーとドロップダウンを非表示",
    "optionsMode": "ウィジェット オプションを非表示",
    "optionsModeTip": "追加のウィジェット設定を表示するオプションです。 オンに設定されていると、定義済みフィルターの保存および読み込みを行う設定とウィジェットを閉じた後にフィルターを維持する設定がインターフェイスに表示されなくなります。",
    "optionOR": "または",
    "optionAND": "および",
    "optionEQUAL": "等しい",
    "optionNOTEQUAL": "等しくない",
    "optionGREATERTHAN": "より大きい",
    "optionGREATERTHANEQUAL": "以上",
    "optionLESSTHAN": "より小さい",
    "optionLESSTHANEQUAL": "以下",
    "optionSTART": "で始まる",
    "optionEND": "で終わる",
    "optionLIKE": "を含む",
    "optionLIKESPECIFIC": "特定の値を含む",
    "optionNOTLIKESPECIFIC": "特定の値を含まない",
    "optionNOTLIKE": "を含まない",
    "optionONORBEFORE": "以前",
    "optionONORAFTER": "以後",
    "optionNONE": "なし"
  },
  "tables": {
    "layer": "レイヤー",
    "layerTip": "マップで定義されているレイヤーの名前です。",
    "field": "フィールド",
    "fieldTip": "レイヤーのフィルター処理に使用されるフィールドです。",
    "value": "値の使用",
    "valueTip": "レイヤーのドロップダウン リストの値を使用するオプションです。レイヤーでこのパラメーターが使用されていない場合は、空のテキスト ボックスがユーザーに表示されます。",
    "zoomTo": "結果にズーム",
    "zoomTip": "フィルターの適用後にフィーチャの範囲にズームするオプション",
    "action": "削除",
    "actionTip": "フィルター セットからレイヤーを削除します。"
  },
  "popupHeader": {
    "label": "設定済みの値の選択"
  },
  "errors": {
    "noGroups": "少なくとも 1 つのグループが必要です。",
    "noGroupName": "1 つまたは複数のグループ名が見つかりません。",
    "noDuplicates": "1 つまたは複数のグループ名が重複しています。",
    "noRows": "テーブルには少なくとも 1 つの行が必要です。",
    "noLayers": "マップにレイヤーがありません。"
  },
  "picker": {
    "description": "このグループの設定済みの値を検索します。",
    "layer": "レイヤーの選択",
    "layerTip": "Web マップで定義されているレイヤーの名前です。",
    "field": "フィールドの選択",
    "fieldTip": "設定済みの値の設定に使用されるフィールドです。",
    "value": "値の選択",
    "valueTip": "ウィジェットのデフォルトになる値です。"
  }
});