define({
  "page1": {
    "selectToolHeader": "Scegliere un metodo per selezionare record per la modalità di aggiornamento batch.",
    "selectToolDesc": "Il widget supporta 3 metodi per generare un insieme selezionato di record da aggiornare. Si può scegliere solo uno dei metodi. Se hai bisogno di più di uno di questi metodi, crea una nuova istanza del widget.",
    "selectByShape": "Seleziona per area",
    "shapeTypeSelector": "Scegli quali strumenti permettere di selezionare le feature sulla mappa",
    "shapeType": {
      "point": "Puntuale",
      "line": "Linea",
      "polyline": "Polilineare",
      "freehandPolyline": "Polilinea a mano libera",
      "extent": "Estensione",
      "polygon": "Poligonale",
      "freehandPolygon": "Poligono a mano libera"
    },
    "freehandPolygon": "Poligono a mano libera",
    "selectBySpatQuery": "Seleziona per feature",
    "selectByAttQuery": "Selezionare per feature e valori di attributi condivisi",
    "selectByQuery": "Seleziona per interrogazione",
    "toolNotSelected": "Scegli un metodo di selezione",
    "noDrawToolSelected": "Scegli almeno uno strumento di disegno"
  },
  "page2": {
    "layersToolHeader": "Selezionare i layer da aggiornare e le opzioni degli strumenti di selezione, se disponibili.",
    "layersToolDesc": "Il tipo di selezione che hai scelto dalla scheda precedente sarà usato per selezionare e aggiornare le caratteristiche da un insieme di layer elencati di seguito. Se selezioni più di un layer da aggiornare, solo i campi modificabili comuni saranno disponibili per l'aggiornamento. A seconda del tipo di selezione, saranno richieste opzioni aggiuntive.",
    "layerTable": {
      "colUpdate": "Aggiorna",
      "colLabel": "Layer",
      "colSelectByLayer": "Seleziona per layer",
      "colSelectByField": "Campo interrogazione",
      "colhighlightSymbol": "Evidenzia simbolo"
    },
    "toggleLayers": "Attiva/disattiva la visibilità dei layer all'apertura e alla chiusura",
    "noEditableLayers": "Nessun layer modificabile",
    "noLayersSelected": "Selezionare uno o più layer prima di continuare."
  },
  "page3": {
    "commonFieldsHeader": "Selezionare i campi per la modalità di aggiornamento batch.",
    "commonFieldsDesc": "Solo i campi comuni modificabili saranno mostrati qui sotto. Seleziona i campi che vuoi aggiornare. Se i campi che condividono lo stesso nome di campo si trovano in diversi layer, ma hanno domini diversi, solo un dominio può essere usato.",
    "noCommonFields": "Nessun campo in comune",
    "fieldTable": {
      "colEdit": "Modificabile",
      "colName": "Nome",
      "colAlias": "Alias",
      "colAction": "Azioni"
    }
  },
  "tabs": {
    "selection": "Definire tipo di selezione",
    "layers": "Definire layer da aggiornare",
    "fields": "Definire campi da aggiornare"
  },
  "errorOnOk": "Compila tutti i parametri prima di salvare la configurazione",
  "next": "Seguente",
  "back": "Indietro",
  "save": "Salva simbolo",
  "cancel": "Annulla",
  "ok": "OK",
  "symbolPopup": "Selezione simbolo",
  "editHeaderText": "Testo da visualizzare nella parte superiore del widget",
  "widgetIntroSelectByArea": "Utilizzare uno degli strumenti sottostanti per creare un insieme selezionato di feature da aggiornare. Se la riga è <font class='maxRecordInIntro'>evidenziata</font>, è stato superato il numero massimo di record.",
  "widgetIntroSelectByFeature": "Utilizzare lo strumento sottostante per selezionare una feature dal layer <font class='layerInIntro'>${0}</font>. Questa feature verrà utilizzata per selezionare e aggiornare tutte le feature che intersecano. Se la riga è <font class='maxRecordInIntro'>evidenziata</font>, è stato superato il numero massimo di record.",
  "widgetIntroSelectByFeatureQuery": "Utilizzare lo strumento sottostante per selezionare una feature da <font class='layerInIntro'>${0}</font>. Questo attributo <font class='layerInIntro'>${1}</font> della feature verrà utilizzato per interrogare i layer sottostanti e aggiornare le feature risultanti. Se la riga è <font class='maxRecordInIntro'>evidenziata</font>, è stato superato il numero massimo di record.",
  "widgetIntroSelectByQuery": "Immettere un valore per creare un set di selezione. Se la riga è <font class='maxRecordInIntro'>evidenziata</font>, è stato superato il numero massimo di record."
});