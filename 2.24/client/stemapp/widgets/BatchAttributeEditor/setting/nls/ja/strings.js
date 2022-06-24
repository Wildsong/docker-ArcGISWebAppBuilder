define({
  "page1": {
    "selectToolHeader": "一括して更新するレコードを選択する方法を選択します。",
    "selectToolDesc": "このウィジェットでは、更新するレコードの選択セットを生成する 3 つの方法をサポートします。 ただし、選択できるのは、これらの方法のうちの 1 つだけです。 これらの方法から複数の方法を選択する必要がある場合は、このウィジェットの新しいインスタンスを作成してください。",
    "selectByShape": "エリアによる選択",
    "shapeTypeSelector": "マップ上のフィーチャの選択に使用できるツールを選択",
    "shapeType": {
      "point": "ポイント",
      "line": "ライン",
      "polyline": "ポリライン",
      "freehandPolyline": "フリーハンド ポリライン",
      "extent": "範囲",
      "polygon": "ポリゴン",
      "freehandPolygon": "フリーハンド ポリゴン"
    },
    "freehandPolygon": "フリーハンド ポリゴン",
    "selectBySpatQuery": "フィーチャによる選択",
    "selectByAttQuery": "フィーチャおよび共有属性値による選択",
    "selectByQuery": "クエリによる選択",
    "toolNotSelected": "選択方法を選択",
    "noDrawToolSelected": "描画ツールを少なくとも 1 つ選択"
  },
  "page2": {
    "layersToolHeader": "更新するレイヤーおよび、もしあれば、選択ツールのオプションを選択してください。",
    "layersToolDesc": "前のタブで選択した [選択タイプ] は、次に示された一連のレイヤーからフィーチャを選択して更新する場合に使用します。 更新する複数のレイヤーをオンにした場合でも、共通の編集可能フィールドしか更新できません。 選択した [選択タイプ] によっては、オプションがさらに必要となります。",
    "layerTable": {
      "colUpdate": "更新",
      "colLabel": "レイヤー",
      "colSelectByLayer": "レイヤーによる選択",
      "colSelectByField": "クエリ フィールド",
      "colhighlightSymbol": "ハイライト シンボル"
    },
    "toggleLayers": "開いたときと閉じたときのレイヤーの表示設定を切り替える",
    "noEditableLayers": "編集可能なレイヤーがありません",
    "noLayersSelected": "進む前に 1 つ以上のレイヤーを選択してください"
  },
  "page3": {
    "commonFieldsHeader": "一括して更新するフィールドを選択してください。",
    "commonFieldsDesc": "共通の編集可能フィールドのみを次に示します。 更新するフィールドを選択してください。 同じフィールド名を共有しているフィールドが別々のレイヤーに存在しており、これらのフィールドのドメインがそれぞれ異なっている場合は、1 つのドメインしか使用できません。",
    "noCommonFields": "共通のフィールドがありません",
    "fieldTable": {
      "colEdit": "編集可能",
      "colName": "名前",
      "colAlias": "エイリアス",
      "colAction": "アクション"
    }
  },
  "tabs": {
    "selection": "選択タイプの定義",
    "layers": "更新するレイヤーの定義",
    "fields": "更新するフィールドの定義"
  },
  "errorOnOk": "構成を保存する前に、すべてのパラメーターに値を入力してください。",
  "next": "次へ",
  "back": "戻る",
  "save": "シンボルの保存",
  "cancel": "キャンセル",
  "ok": "OK",
  "symbolPopup": "シンボルの選択",
  "editHeaderText": "ウィジェットの上部に表示されるテキスト",
  "widgetIntroSelectByArea": "以下のツールのいずれかを使用して、更新するためのフィーチャの選択セットを作成します。行が<font class='maxRecordInIntro'>ハイライト表示された</font>場合、レコードの最大数を超えています。",
  "widgetIntroSelectByFeature": "以下のツールを使用して、<font class='layerInIntro'>${0}</font> レイヤーからフィーチャを選択します。 このフィーチャは、交差するすべてのフィーチャの選択と更新に使用されます。 行が<font class='maxRecordInIntro'>ハイライト表示</font>されている場合、レコードの最大数を超えています。",
  "widgetIntroSelectByFeatureQuery": "以下のツールを使用して、<font class='layerInIntro'>${0}</font> からフィーチャを選択します。このフィーチャの <font class='layerInIntro'>${1}</font> 属性は、以下のレイヤーの検索、および検索で得られたフィーチャの更新に使用されます。行が<font class='maxRecordInIntro'>ハイライト表示された</font>場合、レコードの最大数を超えています。",
  "widgetIntroSelectByQuery": "値を入力して選択セットを作成します。行が<font class='maxRecordInIntro'>ハイライト表示された</font>場合、レコードの最大数を超えています。"
});