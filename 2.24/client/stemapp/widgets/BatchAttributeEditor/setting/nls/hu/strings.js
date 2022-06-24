define({
  "page1": {
    "selectToolHeader": "Válasszon egy módszert a kötegelt frissítés rekordjainak kiválasztásához.",
    "selectToolDesc": "A widget 3 különböző módszert támogat a frissítésre kiválasztott rekordkészlet létrehozásához. Csak egyetlen módszer választható ki. Ha több módszerre is szüksége van, hozzon létre egy új példányt a widgetből.",
    "selectByShape": "Kijelölés terület szerint",
    "shapeTypeSelector": "Válassza ki, hogy mely eszközöket engedélyezi a térképen lévő vektoros elemek kijelöléséhez",
    "shapeType": {
      "point": "Pont",
      "line": "Vonal",
      "polyline": "Polyline",
      "freehandPolyline": "Szabadkézi polyline",
      "extent": "Kiterjedés",
      "polygon": "Polygon",
      "freehandPolygon": "Szabadkézi polygon"
    },
    "freehandPolygon": "Szabadkézi sokszög",
    "selectBySpatQuery": "Kijelölés vektoros elem szerint",
    "selectByAttQuery": "Vektoros elem és megosztott attribútumértékek szerinti kiválasztás",
    "selectByQuery": "Kiválasztás lekérdezéssel",
    "toolNotSelected": "Válasszon kijelölési módszert",
    "noDrawToolSelected": "Válasszon legalább egy rajzeszközt"
  },
  "page2": {
    "layersToolHeader": "Válassza ki a frissítendő rétegeket, valamint szükség esetén a kiválasztási eszközök beállításait.",
    "layersToolDesc": "Az előző lapon kiválasztott Kijelölés típusa érték szolgál majd az alább felsorolt rétegek készletéből származó vektoros elemek kijelölésére és frissítésére. Ha egynél több réteget is frissítendőnek jelöl ki, csak a szokásos szerkeszthető mezők állnak majd rendelkezésre a frissítéshez. A Kijelölés típusa paramétertől függően további beállításokra is szükség lesz.",
    "layerTable": {
      "colUpdate": "Frissítés",
      "colLabel": "Réteg",
      "colSelectByLayer": "Kiválasztás réteg szerint",
      "colSelectByField": "Lekérdezési mező",
      "colhighlightSymbol": "Kiemelési szimbólum"
    },
    "toggleLayers": "Rétegek láthatóságának átváltása megnyitáskor és bezáráskor",
    "noEditableLayers": "Nincsenek szerkeszthető rétegek",
    "noLayersSelected": "A folytatás előtt válasszon ki egy vagy több réteget."
  },
  "page3": {
    "commonFieldsHeader": "Válassza ki a mezőket a kötegelt frissítéshez.",
    "commonFieldsDesc": "Csak a szokásos szerkeszthető mezők jelennek meg alább. Válassza ki a frissíteni kívánt mezőket Ha különböző rétegeken átnyúlóan találhatók meg egyező mezőnévvel rendelkező, de eltérő értéktartományú mezők, csak egyetlen értéktartomány használható.",
    "noCommonFields": "Nincsenek közös mezők",
    "fieldTable": {
      "colEdit": "Szerkeszthető",
      "colName": "Név",
      "colAlias": "Aliasnév",
      "colAction": "Műveletek"
    }
  },
  "tabs": {
    "selection": "Kijelöléstípus megadása",
    "layers": "Frissítendő réteg(ek) megadása",
    "fields": "Frissítendő mező(k) megadása"
  },
  "errorOnOk": "A konfiguráció mentése előtt adja meg az összes paramétert",
  "next": "Tovább",
  "back": "Vissza",
  "save": "Szimbólum mentése",
  "cancel": "Mégse",
  "ok": "OK",
  "symbolPopup": "Szimbólumválasztó",
  "editHeaderText": "A widget tetején megjelenő szöveg",
  "widgetIntroSelectByArea": "Az alábbi eszközök egyikével hozza létre a vektoros elemek kiválasztott frissítendő készletét.  Ha a sor <font class='maxRecordInIntro'>kiemelve</font> jelenik meg, akkor elérte a rekordok maximális számát.",
  "widgetIntroSelectByFeature": "Az alábbi eszközzel válasszon vektoros elemet a(z) <font class='layerInIntro'>${0}</font> rétegből. A rendszer ezt a vektoros elemet fogja használni valamennyi egymást metsző vektoros elem kiválasztásához és frissítéséhez. Ha a sor <font class='maxRecordInIntro'>kiemelve</font> jelenik meg, akkor elérte a rekordok maximális számát.",
  "widgetIntroSelectByFeatureQuery": "Az alábbi eszközzel válasszon vektoros elemet innen: <font class='layerInIntro'>${0}</font>.  A rendszer e vektoros elem <font class='layerInIntro'>${1}</font> attribútumát fogja használni az alábbi rétegek lekérdezéséhez és az eredmény vektoros elemek frissítéséhez.  Ha a sor <font class='maxRecordInIntro'>kiemelve</font> jelenik meg, akkor elérte a rekordok maximális számát.",
  "widgetIntroSelectByQuery": "Adjon meg egy értéket a kiválasztási készlet létrehozásához.  Ha a sor <font class='maxRecordInIntro'>kiemelve</font> jelenik meg, akkor elérte a rekordok maximális számát."
});