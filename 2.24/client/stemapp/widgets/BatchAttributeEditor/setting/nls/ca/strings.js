define({
  "page1": {
    "selectToolHeader": "Trieu un mètode per seleccionar els registres per a l'actualització per lots.",
    "selectToolDesc": "El widget és compatible amb 3 mètodes per generar un conjunt seleccionat de registres per tal d'actualitzar-los. Només podeu triar un dels mètodes. Si en necessiteu més d'un, creeu una instància nova del widget.",
    "selectByShape": "Seleccioneu per àrea",
    "shapeTypeSelector": "Creeu les eines que voleu permetre per seleccionar entitats al mapa",
    "shapeType": {
      "point": "Punt",
      "line": "Línia",
      "polyline": "Polilínia",
      "freehandPolyline": "Polilínia a mà alçada",
      "extent": "Extensió",
      "polygon": "Polígon",
      "freehandPolygon": "Polígon a mà alçada"
    },
    "freehandPolygon": "Polígon a mà alçada",
    "selectBySpatQuery": "Seleccioneu per entitat",
    "selectByAttQuery": "Selecciona per entitat i valors d'atributs compartits",
    "selectByQuery": "Seleccioneu per consulta",
    "toolNotSelected": "Trieu un mètode de selecció",
    "noDrawToolSelected": "Trieu una eina de dibuix com a mínim"
  },
  "page2": {
    "layersToolHeader": "Seleccioneu les capes que s'han d'actualitzar i les opcions de les eines de selecció, si n'hi ha.",
    "layersToolDesc": "El tipus de selecció que heu triat a la pestanya anterior es farà servir per seleccionar i actualitzar les entitats del conjunt de capes que s'indica a continuació. Si marqueu més d'una capa per actualitzar, només els camps editables comuns estaran disponibles per a l'actualització. Depenent del tipus de selecció, es necessitaran altres opcions.",
    "layerTable": {
      "colUpdate": "Actualitza",
      "colLabel": "Capa",
      "colSelectByLayer": "Seleccioneu per capa",
      "colSelectByField": "Camp de consulta",
      "colhighlightSymbol": "Ressalta el símbol"
    },
    "toggleLayers": "Alterna la visibilitat de les capes en obrir i tancar",
    "noEditableLayers": "No hi ha cap capa editable",
    "noLayersSelected": "Seleccioneu una o diverses capes abans de continuar."
  },
  "page3": {
    "commonFieldsHeader": "Seleccioneu els camps que vulgueu actualitzar per lots.",
    "commonFieldsDesc": "A continuació només es mostraran els camps editables comuns. Seleccioneu els camps que vulgueu actualitzar. Si es troben camps amb el mateix nom a diferents capes, però tenen dominis diferents, només es pot fer servir un domini.",
    "noCommonFields": "No hi ha cap camp comú",
    "fieldTable": {
      "colEdit": "Editable",
      "colName": "Nom",
      "colAlias": "Àlies",
      "colAction": "Accions"
    }
  },
  "tabs": {
    "selection": "Defineix el tipus de selecció",
    "layers": "Defineix les capes que s'han d'actualitzar",
    "fields": "Defineix els camps que s'han d'actualitzar"
  },
  "errorOnOk": "Empleneu tots els paràmetres abans de desar la configuració",
  "next": "Següent",
  "back": "Enrere",
  "save": "Desa el símbol",
  "cancel": "Cancel·la",
  "ok": "D'acord",
  "symbolPopup": "Selector de símbols",
  "editHeaderText": "Text que es mostrarà a la part superior del widget",
  "widgetIntroSelectByArea": "Utilitzeu una de les eines següents per crear un conjunt d'entitats seleccionat per a l'actualització.  Si la fila està <font class='maxRecordInIntro'>ressaltada</font>, s'ha superat el nombre màxim de registres.",
  "widgetIntroSelectByFeature": "Utilitzeu l'eina següent per seleccionar una entitat de la capa <font class='layerInIntro'>${0}</font>. Aquesta entitat s'utilitzarà per seleccionar i actualitzar totes les entitats que s'intersequin. Si la fila està <font class='maxRecordInIntro'>ressaltada</font>, s'ha superat el nombre màxim de registres.",
  "widgetIntroSelectByFeatureQuery": "Utilitzeu l'eina següent per seleccionar una entitat de <font class='layerInIntro'>${0}</font>.  L'atribut <font class='layerInIntro'>${1}</font> d'aquesta entitat s'utilitzarà per consultar les capes següents i actualitzar les entitats resultants.  Si la fila està <font class='maxRecordInIntro'>ressaltada</font>, s'ha superat el nombre màxim de registres.",
  "widgetIntroSelectByQuery": "Introduïu un valor per crear un conjunt de selecció.  Si la fila està <font class='maxRecordInIntro'>ressaltada</font>, s'ha superat el nombre màxim de registres."
});