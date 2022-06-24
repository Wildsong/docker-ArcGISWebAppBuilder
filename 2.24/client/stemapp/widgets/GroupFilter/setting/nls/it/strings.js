define({
  "configText": "Definisci i gruppi di filtro sottostanti",
  "labels": {
    "groupName": "Nome gruppo:",
    "groupNameTip": "Fornisci un nome per questo gruppo di filtri. Verrà visualizzato nell'elenco a discesa dei gruppi di filtri disponibili.",
    "groupDesc": "Descrizione:",
    "groupDescTip": "Fornisci una descrizione per questo gruppo di filtri",
    "groupOperator": "Operatore preimpostato:",
    "groupOperatorTip": "Opzione per definire l'operatore per il filtro. Se nessun Operatore predefinito è selezionato, il filtro utlilizzerà l'operatore EQUALS.",
    "groupDefault": "Valore preimpostato:",
    "groupDefaultTip": "Opzione per digitare un valore o scegliere un valore esistente da un layer. Clicca l'icona Cerca per sfogliare i layer.",
    "sameLayerAppend": "Quando un layer è elencato più di una volta:",
    "sameLayerConjunc": "Aggiungi utilizzando:",
    "caseSearch": "Eseguire una ricerca con distinzione maiuscole/minuscole: ",
    "headerTextHelp": "Fornire testo da visualizzare al di sopra della selezione del filtro"
  },
  "buttons": {
    "addNewGroup": "Aggiungi un nuovo gruppo",
    "addNewGroupTip": "Aggiungi un nuovo gruppo di filtri",
    "addLayer": "Aggiungi layer",
    "addLayerTip": "Aggiungi un layer al gruppo di filtri"
  },
  "inputs": {
    "groupName": "Nome del gruppo di filtri",
    "groupDesc": "Descrizione del gruppo",
    "groupDefault": "Inserisci un valore predefinito",
    "sameLayerAny": "Corrispondenza con qualsiasi espressione",
    "sameLayerAll": "Confronta tutte le espressioni",
    "simpleMode": "Avvia in visualizzazione semplice",
    "simpleModeTip": "Semplifica l'interfaccia del widget. Se selezionata, l'elenco a discesa degli operatori e i pulsanti di aggiunta dei criteri sono nascosti.",
    "webmapAppendModeAny": "Aggiungi una qualsiasi espressione al filtro della mappa esistente",
    "webmapAppendModeAll": "Aggiungi tutte le espressioni al filtro della mappa esistente",
    "webmapAppendModeTip": "Opzione per aggiungere i gruppi di filtri a filtri esistenti nella mappa Web",
    "persistOnClose": "Mantieni i filtri dopo la chiusura del widget",
    "selectGroup": "Selezionare un gruppo da filtrare",
    "hideDropDown": "Nascondi l'intestazione e il filtro per 1 gruppo",
    "hideDropDownTip": "Nascondi l'intestazione e l'elenco a discesa se viene configurato solo 1 gruppo di filtri",
    "optionsMode": "Nascondi le opzoni widget",
    "optionsModeTip": "Opzione per esporre impostazioni widget aggiuntive. Se selezionata, il salvataggio e il caricamento dei filtri predefiniti e il mantenimento del filtro dopo la chiusura del widget vengono nascosti dall'interfaccia.",
    "optionOR": "O",
    "optionAND": "E",
    "optionEQUAL": "UGUALE A",
    "optionNOTEQUAL": "DIVERSO DA",
    "optionGREATERTHAN": "MAGGIORE DI",
    "optionGREATERTHANEQUAL": "MAGGIORE DI O UGUALE A",
    "optionLESSTHAN": "MINORE DI",
    "optionLESSTHANEQUAL": "MINORE DI O UGUALE A",
    "optionSTART": "INIZIA CON",
    "optionEND": "TERMINA CON",
    "optionLIKE": "CONTIENE",
    "optionLIKESPECIFIC": "CONTIENE VALORI SPECIFICI",
    "optionNOTLIKESPECIFIC": "NON CONTIENE VALORI SPECIFICI",
    "optionNOTLIKE": "NON CONTIENE",
    "optionONORBEFORE": "FINO AL GIORNO",
    "optionONORAFTER": "DAL GIORNO",
    "optionNONE": "NESSUNO"
  },
  "tables": {
    "layer": "Livelli",
    "layerTip": "Nome del layer come definito nella mappa.",
    "field": "Campi",
    "fieldTip": "Campo rispetto al quale è possibile filtrare il layer.",
    "value": "Usa valore",
    "valueTip": "Opzione per utilizzare i valori dell'elenco a discesa dal layer. Se nessun layer utilizza questi parametri, una casella testo normale verrà presentata all'utente.",
    "zoomTo": "Zoom al risultato",
    "zoomTip": "Opzione per effettuare lo zoom all'estensione delle feature dopo l'applicazione del filtro",
    "action": "Può eliminare",
    "actionTip": "Rimuovere layer dal set di filtri."
  },
  "popupHeader": {
    "label": "Scegli un Valore preimpostato"
  },
  "errors": {
    "noGroups": "È necessario almeno un gruppo.",
    "noGroupName": "Uno o più nomi gruppo mancanti.",
    "noDuplicates": "Uno o più nomi gruppo sono duplicati.",
    "noRows": "È necessaria almeno una riga nella tabella.",
    "noLayers": "Nessun layer nella mappa."
  },
  "picker": {
    "description": "Trova il valore preimpostato per questo gruppo.",
    "layer": "Seleziona un layer",
    "layerTip": "Nome del layer come definito nella mappa Web.",
    "field": "Seleziona un campo",
    "fieldTip": "Campo rispetto al quale verrà impostato il valore preimpostato.",
    "value": "Seleziona un valore",
    "valueTip": "Valore che verrà usato come predefinito del widget."
  }
});