define({
  "page1": {
    "selectToolHeader": "Izaberite metodu odabira zapisa za skupno ažuriranje.",
    "selectToolDesc": "Widget podržava 3 metode za generiranje odabranog skupa zapisa za ažuriranje. Možete odabrati jednu metodu. Ako trebate više od jedne metode, stvorite novu instancu widgeta.",
    "selectByShape": "Odaberi prema području",
    "shapeTypeSelector": "Odaberite koje alate ćete omogućiti za odabir geoobjekata na karti",
    "shapeType": {
      "point": "Točka",
      "line": "Linija",
      "polyline": "Polilinija",
      "freehandPolyline": "Prostoručna polilinija",
      "extent": "Obuhvat",
      "polygon": "Poligon",
      "freehandPolygon": "Prostoručni poligon"
    },
    "freehandPolygon": "Prostoručni poligon",
    "selectBySpatQuery": "Odaberi prema geoobjektu",
    "selectByAttQuery": "Odabir prema vrijednostima geoobjekta i dijeljenih atributa",
    "selectByQuery": "Odaberi prema upitu",
    "toolNotSelected": "Odaberite metodu za odabir",
    "noDrawToolSelected": "Odaberite bar jedan alat za crtanje"
  },
  "page2": {
    "layersToolHeader": "Odaberite slojeve za ažuriranje i opcije alata za odabir ako ih ima.",
    "layersToolDesc": "Vrsta odabira koju ste odabrali na prethodnoj kartici bit će korištena za odabir i ažuriranje geoobjekata iz skupa slojeva navedenih ispod. Ako označite više od jednog sloja za ažuriranje, samo zajednička polja koja se mogu urediti će biti dostupna za ažuriranje. Ovisno o vrsti odabira, dodatne opcije će biti potrebne.",
    "layerTable": {
      "colUpdate": "Ažuriraj",
      "colLabel": "Sloj",
      "colSelectByLayer": "Odaberi prema sloju",
      "colSelectByField": "Polje za upit",
      "colhighlightSymbol": "Istakni simbol"
    },
    "toggleLayers": "Prebacujte vidljivost slojeva između otvoreno i zatvoreno",
    "noEditableLayers": "Nema slojeva koji se mogu uređivati",
    "noLayersSelected": "Odaberite jedan ili više slojeva prije nastavka."
  },
  "page3": {
    "commonFieldsHeader": "Odaberite polja za skupno ažuriranje.",
    "commonFieldsDesc": "Samo zajednička polja koja se mogu urediti će biti prikazana ispod. Odaberite polja koja želite ažurirati. Ako polja koja dijele isti naziv polja postoje na više slojeva, ali imaju druge domene, samo se jedna domena može koristiti.",
    "noCommonFields": "Nema zajedničkih polja",
    "fieldTable": {
      "colEdit": "Može se uređivati",
      "colName": "Naziv",
      "colAlias": "Alias",
      "colAction": "Radnje"
    }
  },
  "tabs": {
    "selection": "Definiraj vrstu odabira",
    "layers": "Definiraj sloj(eve) za ažuriranje",
    "fields": "Definiraj polje/a za ažuriranje"
  },
  "errorOnOk": "Ispunite sve parametre prije spremanja konfiguracije",
  "next": "Sljedeće",
  "back": "Natrag",
  "save": "Spremi simbol",
  "cancel": "Odustani",
  "ok": "U redu",
  "symbolPopup": "Birač simbola",
  "editHeaderText": "Tekst koji će se prikazati na vrhu widgeta",
  "widgetIntroSelectByArea": "Upotrijebite jedan od alata u nastavku da biste stvorili odabrani skup geoobjekata za ažuriranje.  Ako je redak <font class='maxRecordInIntro'>istaknut</font>, premašen je maksimalni broj zapisa.",
  "widgetIntroSelectByFeature": "Upotrijebite alat u nastavku za odabir geoobjekta sa <font class='layerInIntro'>${0}</font> sloja. Ovaj geoobjekt upotrebljavat će se za odabir i ažuriranje svih geoobjekata koji se presijecaju. Ako je redak <font class='maxRecordInIntro'>istaknut</font>, premašen je maksimalni broj zapisa.",
  "widgetIntroSelectByFeatureQuery": "Upotrijebite alat u nastavku za odabir geoobjekta sa sloja <font class='layerInIntro'>${0}</font> .  Atribut <font class='layerInIntro'>${1}</font> ovog geoobjekta upotrebljavat će se za ispitivanje slojeva u nastavku i ažuriranje dobivenih geoobjekata.  Ako je redak <font class='maxRecordInIntro'>istaknut</font>, premašen je maksimalni broj zapisa.",
  "widgetIntroSelectByQuery": "Unesite vrijednost da biste stvorili skup odabira.  Ako je redak <font class='maxRecordInIntro'>istaknut</font>, premašen je maksimalni broj zapisa."
});