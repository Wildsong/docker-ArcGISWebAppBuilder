define({
  "page1": {
    "selectToolHeader": "Alegeţi o metodă pentru a alege înregistrările pentru actualizarea în masă.",
    "selectToolDesc": "Widgetul acceptă 3 metode pentru a genera un set selectat de înregistrări de actualizat. Puteți alege doar una dintre metode. Dacă aveți nevoie de mai mult de una dintre aceste metode, creați o nouă instanță a widgetului.",
    "selectByShape": "Selectare după zonă",
    "shapeTypeSelector": "Alegeți ce instrumente permiteți pentru selectarea obiectelor spațiale pe hartă",
    "shapeType": {
      "point": "Punct",
      "line": "Linie",
      "polyline": "Linie poligonală",
      "freehandPolyline": "Linie poligonală trasată manual",
      "extent": "Extindere",
      "polygon": "Poligon",
      "freehandPolygon": "Poligon trasat manual"
    },
    "freehandPolygon": "Poligon trasat manual",
    "selectBySpatQuery": "Selectare după obiect spaţial",
    "selectByAttQuery": "Selectați în funcție de valorile obiectului spațial și ale atributului comun",
    "selectByQuery": "Selectare după interogare",
    "toolNotSelected": "Alegeți o metodă de selecție",
    "noDrawToolSelected": "Alegeți cel puțin un instrument de trasare"
  },
  "page2": {
    "layersToolHeader": "Selectaţi straturile tematice care vor fi actualizate şi opţiunile instrumentelor de selecţie, dacă există.",
    "layersToolDesc": "Tipul de selecție pe care l-ați din fila precedentă va fi util pentru a selecta și actualiza obiecte spațiale dintr-un set de straturi tematice listate mai jos. Dacă selectați mai multe straturi tematice pentru actualizare, doar câmpurile comune editabile vor fi disponibile pentru actualizare. În funcție de Tipul selecției, vor fi necesare opțiuni suplimentare.",
    "layerTable": {
      "colUpdate": "Actualizare",
      "colLabel": "Strat tematic",
      "colSelectByLayer": "Selectare după strat tematic",
      "colSelectByField": "Câmp interogare",
      "colhighlightSymbol": "Evidenţiere simbol"
    },
    "toggleLayers": "Comutare vizibilitate straturi tematice la deschidere și închidere",
    "noEditableLayers": "Niciun strat tematic editabil",
    "noLayersSelected": "Selectaţi unul sau mai multe straturi tematice înainte de a continua."
  },
  "page3": {
    "commonFieldsHeader": "Selectaţi câmpurile care vor fi actualizate în masă.",
    "commonFieldsDesc": "Numai câmpurile comune editabile vor fi afișate mai jos. Selectați câmpurile pe care doriți să le actualizați. În cazul în care se găsesc câmpuri care partajează același nume în diferite straturi tematice, dar au domenii diferite, poate fi utilizat un singur domeniu.",
    "noCommonFields": "Niciun câmp comun",
    "fieldTable": {
      "colEdit": "Editabil",
      "colName": "Nume",
      "colAlias": "Pseudonim",
      "colAction": "Acţiuni"
    }
  },
  "tabs": {
    "selection": "Definire tip selecţie",
    "layers": "Definire straturi tematice care vor fi actualizate",
    "fields": "Definire câmpuri care vor fi actualizate"
  },
  "errorOnOk": "Completați toți parametrii înainte de a salva configurația",
  "next": "Înainte",
  "back": "Înapoi",
  "save": "Salvare simbol",
  "cancel": "Anulare",
  "ok": "OK",
  "symbolPopup": "Selector simbol",
  "editHeaderText": "Text care va fi afișat în partea de sus a widgetului",
  "widgetIntroSelectByArea": "Utilizați unul dintre instrumentele de mai jos pentru a crea un set selectat de obiecte spațiale de actualizat. Dacă rândul este <font class='maxRecordInIntro'>evidențiat</font>, a fost depășit numărul maxim de înregistrări.",
  "widgetIntroSelectByFeature": "Utilizați instrumentul de mai jos pentru a selecta un obiect spațial din stratul tematic <font class='layerInIntro'>${0}</font>. Acest obiect spațial va fi utilizat pentru a selecta și actualiza toate obiectele spațiale cu care se intersectează. Dacă rândul este <font class='maxRecordInIntro'>evidențiat</font>, a fost depășit numărul maxim de înregistrări.",
  "widgetIntroSelectByFeatureQuery": "Utilizați instrumentul de mai jos pentru a selecta un obiect spațial din <font class='layerInIntro'>${0}</font>. Atributul <font class='layerInIntro'>${1}</font> al acestui obiect spațial va fi utilizat pentru a interoga straturile tematice de mai jos și pentru a actualiza obiectele spațiale care rezultă. Dacă rândul este <font class='maxRecordInIntro'>evidențiat</font>, a fost depășit numărul maxim de înregistrări.",
  "widgetIntroSelectByQuery": "Introduceți o valoare pentru a crea un set de selecție. Dacă rândul este <font class='maxRecordInIntro'>evidențiat</font>, a fost depășit numărul maxim de înregistrări."
});