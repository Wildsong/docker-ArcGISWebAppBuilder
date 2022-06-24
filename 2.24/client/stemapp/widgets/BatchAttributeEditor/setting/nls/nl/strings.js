define({
  "page1": {
    "selectToolHeader": "Kies een methode om records te selecteren voor batchupdate.",
    "selectToolDesc": "De widget ondersteunt 3 methoden om een geselecteerde reeks gegevens te genereren die moeten worden bijgewerkt. U kunt maar één van de methoden selecteren. Als u meer dan één van deze methoden nodig hebt, maak dan een nieuw exemplaar van de widget.",
    "selectByShape": "Selecteren op oppervlakte",
    "shapeTypeSelector": "Kies met welke tools u de objecten wilt selecteren op de kaart",
    "shapeType": {
      "point": "Punt",
      "line": "Lijn",
      "polyline": "Polylijn",
      "freehandPolyline": "Polylijn in vrije stijl",
      "extent": "Extent",
      "polygon": "Vlak",
      "freehandPolygon": "Vlak in vrije stijl"
    },
    "freehandPolygon": "Veelhoek in vrije stijl",
    "selectBySpatQuery": "Selecteren op object",
    "selectByAttQuery": "Selecteren op basis van feature en gedeelde attribuutwaarden",
    "selectByQuery": "Selecteren op query",
    "toolNotSelected": "Selecteer een selectiemethode",
    "noDrawToolSelected": "Kies ten minste één tekentool"
  },
  "page2": {
    "layersToolHeader": "Selecteer de te actualiseren lagen en de selectiehulpmiddelenopties, indien van toepassing.",
    "layersToolDesc": "Het Selectietype dat u hebt gekozen van het vorige tabblad wordt gebruikt om de objecten te selecteren en bij te werken uit een set lagen dat hieronder wordt weergegeven. Indien u meer dan één laag aanvinkt om bij te werken, zullen alleen de gemeenschappelijke bewerkbare velden beschikbaar zijn voor actualisering. Afhankelijk van het Selectietype zijn er extra opties vereist.",
    "layerTable": {
      "colUpdate": "Actualiseren",
      "colLabel": "Kaartlaag",
      "colSelectByLayer": "Selecteren volgens laag",
      "colSelectByField": "Queryveld",
      "colhighlightSymbol": "Symbool markeren"
    },
    "toggleLayers": "Zichtbaarheid lagen wisselen bij openen en sluiten",
    "noEditableLayers": "Geen bewerkbare lagen",
    "noLayersSelected": "Selecteer één of meer lagen alvorens door te gaan."
  },
  "page3": {
    "commonFieldsHeader": "Selecteer de velden voor batchupdate.",
    "commonFieldsDesc": "Alleen de algemeen bewerkbare velden worden hieronder weergegeven. Selecteer de velden die u wilt bijwerken. Als velden die dezelfde veldnaam delen op verschillende lagen voorkomen maar met verschillende domeinen, dan kan er maar één domein gebruikt worden.",
    "noCommonFields": "Geen gemeenschappelijke velden",
    "fieldTable": {
      "colEdit": "Bewerkbaar",
      "colName": "Naam",
      "colAlias": "Alias",
      "colAction": "Acties"
    }
  },
  "tabs": {
    "selection": "Selectietype bepalen",
    "layers": "La(a)g(en) bepalen voor actualisering",
    "fields": "Veld(en) bepalen voor actualisering"
  },
  "errorOnOk": "Vul alle parameters in alvorens de configuratie op te slaan",
  "next": "Volgende",
  "back": "Vorige",
  "save": "Symbool opslaan",
  "cancel": "Annuleren",
  "ok": "OK",
  "symbolPopup": "Symbolenkiezer",
  "editHeaderText": "Tekst om weer te geven aan de bovenkant van de widget",
  "widgetIntroSelectByArea": "Gebruik een van de tools hieronder om een selectie van objecten te maken om bij te werken. Als de rij is <font class='maxRecordInIntro'>gemarkeerd</font>, dan is het maximum aantal gegevens overschreden.",
  "widgetIntroSelectByFeature": "Gebruik de tool hieronder om een object te kiezen uit kaartlaag <font class='layerInIntro'>${0}</font>. Dit object wordt gebruikt om alle overeenkomende objecten te selecteren en bij te werken. Als de rij is <font class='maxRecordInIntro'>gemarkeerd</font>, dan is het maximum aantal gegevens overschreden.",
  "widgetIntroSelectByFeatureQuery": "Gebruik de tool hieronder om een object te kiezen uit <font class='layerInIntro'>${0}</font>. Het <font class='layerInIntro'>${1}</font>-attribuut van dit object wordt gebruikt om de lagen eronder te queryen en de resulterende objecten te updaten. Als de rij is <font class='maxRecordInIntro'>gemarkeerd</font>, dan is het maximum aantal gegevens overschreden.",
  "widgetIntroSelectByQuery": "Voer een waarde in om een geselecteerde set te creëren. Als de rij is <font class='maxRecordInIntro'>gemarkeerd</font>, dan is het maximum aantal gegevens overschreden."
});