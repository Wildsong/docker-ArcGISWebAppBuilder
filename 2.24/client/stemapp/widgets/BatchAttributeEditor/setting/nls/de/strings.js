define({
  "page1": {
    "selectToolHeader": "Legen Sie eine Methode zum Auswählen von Datensätzen für die Batch-Aktualisierung fest.",
    "selectToolDesc": "Das Widget unterstützt drei Methoden, um eine ausgewählte Gruppe von Datensätzen zu erstellen, die aktualisiert werden sollen. Sie können nur eine der Methoden auswählen. Wenn Sie mehr als eine dieser Methoden benötigen, erstellen Sie eine neue Instanz des Widgets.",
    "selectByShape": "Nach Bereich auswählen",
    "shapeTypeSelector": "Auswählen, welche Werkzeuge für die Feature-Auswahl auf der Karte zulässig sind",
    "shapeType": {
      "point": "Punkt",
      "line": "Linie",
      "polyline": "Polylinie",
      "freehandPolyline": "Freihand-Polylinie",
      "extent": "Ausdehnung",
      "polygon": "Polygon",
      "freehandPolygon": "Freihand-Polygon"
    },
    "freehandPolygon": "Freihand-Polygon",
    "selectBySpatQuery": "Nach Feature auswählen",
    "selectByAttQuery": "Nach Feature und gemeinsamen Attributwerten auswählen",
    "selectByQuery": "Nach Abfrage auswählen",
    "toolNotSelected": "Wählen Sie eine Auswahlmethode aus",
    "noDrawToolSelected": "Wählen Sie mindestens ein Zeichenwerkzeug aus"
  },
  "page2": {
    "layersToolHeader": "Wählen Sie die zu aktualisierenden Layer und die Auswahlwerkzeugoptionen aus, falls vorhanden.",
    "layersToolDesc": "Der Auswahltyp, den Sie auf der vorherigen Registerkarte ausgewählt haben, wird dazu verwendet, um Features aus den unten aufgeführten Layern auszuwählen und zu aktualisieren. Wenn Sie mehrere Layer für die Aktualisierung auswählen, können nur gemeinsame editierbare Felder aktualisiert werden. Je nach Auswahltyp sind weitere Optionen erforderlich.",
    "layerTable": {
      "colUpdate": "Aktualisieren",
      "colLabel": "Layer",
      "colSelectByLayer": "Nach Layer auswählen",
      "colSelectByField": "Abfrage-Feld",
      "colhighlightSymbol": "Hervorhebungssymbol"
    },
    "toggleLayers": "Layer-Sichtbarkeit beim Öffnen und Schließen umschalten",
    "noEditableLayers": "Keine editierbaren Layer",
    "noLayersSelected": "Wählen Sie mindestens einen Layer aus, bevor Sie den Vorgang fortsetzen."
  },
  "page3": {
    "commonFieldsHeader": "Wählen Sie die Felder für die Batch-Aktualisierung aus.",
    "commonFieldsDesc": "Nur gemeinsame editierbare Felder werden unten angezeigt. Wählen Sie die Felder aus, die Sie aktualisieren möchten. Bei Feldern mit demselben Feldnamen in verschiedenen Layern, die jeweils zu einer anderen Domäne gehören, kann nur eine Domäne verwendet werden.",
    "noCommonFields": "Keine allgemeinen Felder",
    "fieldTable": {
      "colEdit": "Editierbar",
      "colName": "Name",
      "colAlias": "Alias",
      "colAction": "Aktionen"
    }
  },
  "tabs": {
    "selection": "Auswahltyp definieren",
    "layers": "Zu aktualisierende(n) Layer definieren",
    "fields": "Zu aktualisierende(s) Feld(er) definieren"
  },
  "errorOnOk": "Füllen Sie alle Parameter aus, bevor Sie die Konfiguration speichern",
  "next": "Weiter",
  "back": "Zurück",
  "save": "Symbol speichern",
  "cancel": "Abbrechen",
  "ok": "OK",
  "symbolPopup": "Symbolauswahl",
  "editHeaderText": "Text, der oben im Widget angezeigt werden soll",
  "widgetIntroSelectByArea": "Verwenden Sie eines der nachfolgenden Werkzeuge, um eine ausgewählte Reihe von Features zu erstellen, die aktualisiert werden sollen. Wenn die Zeile <font class='maxRecordInIntro'>hervorgehoben</font> ist, wurde die maximale Anzahl von Datensätzen überschritten.",
  "widgetIntroSelectByFeature": "Verwenden Sie das nachfolgende Werkzeug, um ein Feature aus dem Layer <font class='layerInIntro'>${0}</font> auszuwählen. Dieses Feature dient zum Auswählen und Aktualisieren aller überschneidenden Features. Wenn die Zeile <font class='maxRecordInIntro'>hervorgehoben</font> ist, wurde die maximale Anzahl von Datensätzen überschritten.",
  "widgetIntroSelectByFeatureQuery": "Verwenden Sie das nachfolgende Werkzeug, um ein Feature aus <font class='layerInIntro'>${0}</font> auszuwählen.  Das <font class='layerInIntro'>${1}</font>-Attribut dieses Features wird verwendet, um die nachfolgenden Layer abzufragen und die resultierenden Features zu aktualisieren.  Wenn die Zeile <font class='maxRecordInIntro'>hervorgehoben</font> ist, wurde die maximale Anzahl von Datensätzen überschritten.",
  "widgetIntroSelectByQuery": "Geben Sie einen Wert ein, um einen Auswahlsatz zu erstellen.  Wenn die Zeile <font class='maxRecordInIntro'>hervorgehoben</font> ist, wurde die maximale Anzahl von Datensätzen überschritten."
});