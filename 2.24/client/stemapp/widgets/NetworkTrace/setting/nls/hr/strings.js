define({
  "taskUrl": "URL zadatka",
  "setTask": "Postavi",
  "setTaskPopupTitle": "Postavi zadatak",
  "validate": "Postavi",
  "inValidGPService": "Unesite važeću uslugu geoprocesiranja.",
  "noOutputParameterWithGeometryType": "Odabrana usluga geoprocesiranja treba imati barem jedan izlazni parametar sa specificiranom vrstom geometrije. Odaberite drugu uslugu geoprocesiranja.",
  "invalidOutputGeometry": "Vrsta izlazne geometrije odabrane usluge geoprocesiranja nije kompatibilna s postavkama projekta. Rezultate usluge geoprocesiranja nije moguće pohraniti.",
  "GPFeatureRecordSetLayerERR": "Unesite uslugu geoprocesiranja samo s unosima tipa „GPFeatureRecordSetLayer”.",
  "invalidInputParameters": "Broj ulaznih parametara manji je od 1 ili veći od 3. Unesite važeću uslugu geoprocesiranja.",
  "projectSetting": {
    "title": "Postavke projekta",
    "note": "Napomena: Postavke projekta nisu obavezne, kad se konfiguriraju, korisnik može pohraniti projekt u željene slojeve web-karte s mrežnim područjem nestanka struje i ulaznim parametrima. Korisnik može pohraniti druge izlazne parametre iz kartice \"Izlaz\".",
    "projectPolygonLayer": "Poligonalni sloj projekta",
    "outputParameterName": "Naziv izlaznog parametra",
    "projectPointLayer": "Točkasti sloj projekta",
    "selectLabel": "Odaberi",
    "polygonLayerHelp": "<p>Poligonalni slojevi sa sljedećim uvjetima biti će prikazani:<br/><ul><li>Sloj mora imati mogućnosti uređivanja i to ponajprije \"Stvori\", \"Izbriši\" i \"Ažuriraj\"</li><li>Sloj mora imati dva polja s točnim imenom i vrstama podataka:</li><ul><li>ime (Polje vrste niza)</li><li>globalid (Polje vrste GlobalID-a)</li></ul></ul><p/>",
    "outputParameterHelp": "<p>Prikazat će se izlazni poligonski slojevi s URL-a zadatka<p/>",
    "pointLayerHelp": "<p>Točkasti slojevi sa sljedećim uvjetima biti će prikazani: <br/><ul><li>Sloj mora imati mogućnosti uređivanjai to ponajprije \"Stvori\", \"Izbriši\" i \"Ažuriraj\"</li><li>Sloj mora imati dva polja s točnim imenom i vrstama podataka:</li><ul><li>vrstaunosa (Polje vrste niza)</li><li>projectid (Polje vrste GUID-a)</li></ul></ul><p/>"
  },
  "inputOutputTab": {
    "flag": "Zastava",
    "barrier": "Ograničenje",
    "skip": "Preskoči",
    "title": "Unos",
    "inputTooltip": "Opis elementa",
    "typeText": "Vrsta",
    "symbol": "Simbol",
    "summaryEditorText": "Tekst sažetka",
    "summaryTextTitle": "Navedite tekst za prikaz na kartici za unos"
  },
  "summaryTab": {
    "title": "Izvoz",
    "summaryFieldsetText": "Postavke sažetka",
    "inputOutput": "Ulaz/Izlaz",
    "field": "Polje",
    "operator": "Rukovatelj",
    "inputOperatorCountOption": "Zbroj",
    "outputOperatorCountOption": "Zbroj",
    "outputOperatorSkipCountOption": "Broj preskakanja",
    "fieldOperatorSumOption": "Zbroj",
    "fieldOperatorMinOption": "Min.",
    "fieldOperatorMaxOption": "Maks.",
    "fieldOperatorMeanOption": "Prosjek",
    "expressionAddButtonText": "Dodaj",
    "expressionVerifyButtonText": "Provjeri",
    "summaryEditorText": "Tekst sažetka",
    "zoomText": "Automatsko zumiranje nakon praćenja",
    "summarSettingTooltipText": "Dodaj zbroj unosa/izlaza",
    "symbol": "Simbol",
    "outputParametersText": "Izlazni parametri",
    "skipText": "Može se preskočiti",
    "visibilityText": "Vidljivo",
    "exportToCsvText": "Izvezi u CSV",
    "settitngstext": "Postavke",
    "saveToLayerText": "Spremi u sloj (neobavezno)",
    "inputLabel": "Oznaka",
    "inputTooltip": "Opis elementa",
    "outputDisplay": "Tekst za prikaz",
    "addFieldTitle": "Dodaj polje",
    "setScale": "Postavi mjerilo",
    "enterDisplayText": "Unesi tekst za prikaz",
    "saveToLayerHelp": "<p>Prikazat će se sloj sa sljedećim uvjetima:<br/><ul><li>Sloj mora imati mogućnosti uređivanja, i to Stvori, Izbriši i Ažuriraj</li><li>Sloj mora imati dva polja s vrstom naziva i podataka:</li><ul><li>parametername (polje niza)</li><li>projectid (polje Guid)</li></ul></ul><p/>",
    "exportToCsvDisplayText": "CSV",
    "summaryTextTitle": "Navedite tekst sažetka za prikaz na izlaznoj kartici",
    "addSummaryItemsTitle": "Dodajte stavke sažetka"
  },
  "validationErrorMessage": {
    "webMapError": "Na web-karti nema dostupnih slojeva. Odaberite valjanu web-kartu.",
    "inputTypeFlagGreaterThanError": "Unos zastavice vrste ne može biti više od jednog.",
    "inputTypeFlagLessThanError": "Potreban je barem jedan unos zastavice vrste.",
    "inputTypeBarrierErr": "Unos prepreke vrste ne može biti više od jednog.",
    "inputTypeSkipErr": "Unos preskakanja vrste ne može biti više od jednog.",
    "displayTextForButtonError": "Tekst za prikaz za gumb „Pokreni” ne može biti prazan.",
    "UnableToLoadGeoprocessError": "Nije moguće učitati uslugu geoprocesiranja.",
    "invalidSummaryExpression": "Nevaljani izraz.",
    "validSummaryExpression": "Uspjeh!",
    "invalidProjectSettings": "Nevaljane postavke projekta.<br/> Odaberite važeću vrijednost u '${projectSetting}'."
  },
  "hintText": {
    "labelTextHint": "Savjet: navedite oznaku prikaza za ploču rezultata izlaznog parametra.",
    "displayTextHint": "Savjet: to će se prikazati na ploči s pojedinostima za ovaj izlazni parametar.",
    "inputTextHint": "Savjet: u nastavku sastavite vaš izraz koristeći dugme za dodavanje stavki sažetka.",
    "expressionHint": "Savjet: odaberite stavke i kliknite Dodaj za sastavljanje izraza."
  }
});