define({
  "page1": {
    "selectToolHeader": "Odaberite metod za izbor zapisa za grupno ažuriranje.",
    "selectToolDesc": "Vidžet podržava 3 metode za kreiranje izabranog seta zapisa za ažuriranje. Možete da izaberete samo jedan od metoda. Ako zahtevate više od jednog od ovih metoda, kreirajte novu instancu vidžeta.",
    "selectByShape": "Selektuj po površini",
    "shapeTypeSelector": "Izaberite koje alate da omogućite za izbor geoobjekata na mapi",
    "shapeType": {
      "point": "Tačka",
      "line": "Linija",
      "polyline": "Poligon",
      "freehandPolyline": "Poligon slobodnom rukom",
      "extent": "Obuhvat",
      "polygon": "Polilinija",
      "freehandPolygon": "Polilinija slobodnom rukom"
    },
    "freehandPolygon": "Poligon slobodnom rukom",
    "selectBySpatQuery": "Selektuj po geoobjektu",
    "selectByAttQuery": "Odaberi po vrednostima geoobjekata i deljenih atributa",
    "selectByQuery": "Selektuj po upitu",
    "toolNotSelected": "Izaberite metod selekcije",
    "noDrawToolSelected": "Izaberite bar jedan alat za crtanje"
  },
  "page2": {
    "layersToolHeader": "Selektuj slojeve za ažuriranje i opcije alatki za selekciju, ako treba.",
    "layersToolDesc": "Tip selekcije koji ste izabrali iz prethodne kartice biće upotrebljen za izbor i ažuriranje geoobjekata iz seta slojeva navedenih ispod. Ako proveravate više od jednog sloja, samo zajednička polja koja mogu da se menjaju će biti dostupna za ažuriranje. U zavisnosti od tipa selekcije, dodatne opcije će biti obavezne.",
    "layerTable": {
      "colUpdate": "Ažuriraj",
      "colLabel": "Sloj",
      "colSelectByLayer": "Selektuj po sloju",
      "colSelectByField": "Polje upita",
      "colhighlightSymbol": "Simbol za isticanje"
    },
    "toggleLayers": "Uključi/isključi vidljivost slojeva na otvaranju i zatvaranju",
    "noEditableLayers": "Nema slojeva koji mogu da se izmene",
    "noLayersSelected": "Izaberite jedan ili više slojeva pre nastavka."
  },
  "page3": {
    "commonFieldsHeader": "Izaberite polja za grupno ažuriranje.",
    "commonFieldsDesc": "Samo zajednička polja za uređivanje biće prikazana ispod. Izaberite polja koja želite da ažurirate. Ako polja dele isto ime polja u različitim slojevima, ali imaju različite domene, samo jedan domen će biti prikazan i korišćen.",
    "noCommonFields": "Nema zajedničkih polja",
    "fieldTable": {
      "colEdit": "Može da se izmeni",
      "colName": "Naziv",
      "colAlias": "Pseudonim",
      "colAction": "Radnje"
    }
  },
  "tabs": {
    "selection": "Definiši tip selekcije",
    "layers": "Definiši sloj(eve) za ažuriranje",
    "fields": "Definiši polje(-a) za ažuriranje"
  },
  "errorOnOk": "Popunite sve parametre pre čuvanja konfiguracije",
  "next": "Sledeće",
  "back": "Nazad",
  "save": "Sačuvaj simbol",
  "cancel": "Otkaži",
  "ok": "U redu",
  "symbolPopup": "Izbornik simbola",
  "editHeaderText": "Tekst za prikaz u gornjem delu vidžeta",
  "widgetIntroSelectByArea": "Koristite jedan od alata ispod za kreiranje selektovanog seta geoobjekata za ažuriranje.  Ako je red <font class='maxRecordInIntro'>istaknut</font>, maksimalan broj zapisa je premašen.",
  "widgetIntroSelectByFeature": "Upotrebite alat ispod da biste izabrali komponentu iz <font class='layerInIntro'>${0}</font> sloja. Ovaj geoobjekat će se koristiti da selektuje i ažurira sve geoobjekte koji se presecaju. Ako je ovaj red <font class='maxRecordInIntro'>označen</font>, maksimalni broj zapisa je prekoračen.",
  "widgetIntroSelectByFeatureQuery": "Koristite alatku ispod da biste selektovali geoobjekat iz <font class='layerInIntro'>${0}</font>.  Atribut <font class='layerInIntro'>${1}</font> ovog geoobjekta će biti korišćeni da vrše upit slojeva ispod i ažuriraju rezultirajuće geoobjekte.  Ako je red <font class='maxRecordInIntro'>istaknut</font>, maksimalan broj zapisa je premašen.",
  "widgetIntroSelectByQuery": "Unesite vrednost da biste kreirali skup izbora.  Ako je red <font class='maxRecordInIntro'>istaknut</font>, maksimalan broj zapisa je premašen."
});