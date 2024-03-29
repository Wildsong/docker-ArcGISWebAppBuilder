define({
  "_widgetLabel": "Aggregazione dati",
  "startPage": {
    "defaultStartPageInstructions": "Questo widget assisterà nell'elaborazione e nell'invio di dati da un file al layer selezionato nella mappa.<br/> <br/> I valori all'interno del file devono essere delimitati da virgola, tab, punto e virgola o barra verticale.",
    "dragDrop": "Trascinamento della selezione",
    "browse": "Sfoglia file",
    "or": "'OPPURE'",
    "userPrivilege": "L'account non dispone dell'autorizzazione per creare o modificare dati.",
    "userCredits": "${widgetName} richiede crediti per utilizzare il locator ${locator}.",
    "contactAdmin": "Contattare l'amministratore dell'organizzazione per richiedere crediti aggiuntivi.",
    "contactAdminEdit": "Contattare l'amministratore dell'organizzazione per richiedere i privilegi di modifica.",
    "canUseLocator": "Il locator ${locator} sarà utilizzato per localizzare le feature.",
    "notEnoughCredits": "Crediti non sufficienti.",
    "locationAndField": "Informazioni di posizione e di campo",
    "locationAndFieldHint": "Scegliere i valori del file che devono essere utilizzati per aggiornare il layer di destinazione.",
    "cannotUseLocator": "Impossibile utilizzare ${widgetName}",
    "noAnonymousEdit": "Il layer ${layerName} non supporta le modifiche anonime.",
    "pleaseLogin": "Accedere all'organizzazione ${org} o contattare l'amministratore dell'organizzazione per richiedere l'abilitazione delle modifiche anonime.",
    "invalidEdit": "Privilegi non validi",
    "unableToAccess": "Impossibile accedere a ${layerName}",
    "appropriateCredentials": "Verificare di avere effettuato l'accesso con le credenziali adeguate.",
    "shared": "Contattare l'amministratore dell'organizzazione per richiedere l'accesso al layer ${layerName}.",
    "targetLayerLabel": "Layer di destinazione",
    "homeButtonLabel": "Home",
    "mappingErrorMsg": "Fare clic sulla freccia accanto per definire i campi"
  },
  "mapping": {
    "schemaMapping": "Informazioni sul campo",
    "schemaMappingHint": "Scegliere nel filei campi che sono correlati ai campi del layer.",
    "locationMapping": "Informazioni sulla posizione",
    "locationMappingHint": "Scegliere il tipo di indirizzo o le informazioni sulle coordinate che ci si aspetta dal file."
  },
  "locationMapping": {
    "locationMappingPageHint": "Scegli tipo di posizione",
    "useAddress": "Localizza utilizzando un indirizzo",
    "useAddressHint": "I dati contengono informazioni sull’indirizzo",
    "useCoordinates": "Localizza utilizzando le coordinate",
    "useCoordinatesHint": "I dati contengono i valori di coordinata X/Y"
  },
  "address": {
    "addressPageHint": "Scegli tipo di indirizzo",
    "singleField": "Campo singolo",
    "singleFieldHint": "Scegliere il campo contenente le informazioni sull'indirizzo",
    "multiField": "Campi multipli",
    "multiFieldHint": "Scegliere i campi contenenti le informazioni sull'indirizzo"
  },
  "coordinates": {
    "coordinatesPageHint": "Scegliere i campi che contengono i dati delle coordinate"
  },
  "fieldMapping": {
    "fieldMappingPageHint": "Scegliere il campo di origine associato al campo di destinazione",
    "sourceField": "Campo di origine corrispondente",
    "targetField": "Campo di destinazione"
  },
  "buttons": {
    "addToMap": "Aggiungi alla mappa",
    "submit": "Invia",
    "download": "Download"
  },
  "review": {
    "matched": "Trovato",
    "reviewMatched": "Posizioni trovate",
    "reviewMatchedHint": "Revisionare le posizioni trovate.",
    "unMatched": "non trovato",
    "reviewUnMatched": "Posizioni non trovate",
    "reviewUnMatchedHint": "Revisionare le posizioni non trovate. Gli elementi che non sono stati corretti non verranno inviati.",
    "duplicate": "Duplica",
    "reviewDuplicate": "Posizioni duplicate",
    "reviewDuplicateHint": "Revisionare le posizioni già trovate nel layer. Gli elementi non affrontati non saranno inviati.",
    "reviewLabelWithCount": "${totalMatchedFeatures} ${headerString} ${headerStringHint}",
    "use": "Usare:",
    "fromLayer": "Informazioni di destinazione",
    "target": "Destinazione",
    "source": "Origine",
    "fromFile": "Informazioni sull'origine",
    "locationControlHint": "Revisiona le informazioni sull'indirizzo",
    "duplicateAction": "Scegli un'azione",
    "item": "Record:",
    "locateFeature": "Localizza feature",
    "removeFeature": "Rimuovi feature",
    "featureLocated": "Posizione trovata",
    "valuesDoNotMatch": "Non corrisponde al valore esistente",
    "sync": "Sincronizza informazioni sull'indirizzo con informazioni sul campo",
    "noFeaturesSaved": "Nessuna feature salvata correttamente",
    "someFeaturesSaved": "${num} feature salvate correttamente.",
    "someFeaturesNotSaved": "${num} feature non salvate correttamente.",
    "feature": "Revisiona informazioni sulle feature",
    "locationInfo": "Revisiona informazioni sulla posizione",
    "selectValue": "Seleziona un valore",
    "reviewData": "Revisiona dati",
    "reviewDataHint": "Revisiona i dati prima di inviarli al layer.",
    "reviewFeatureHint": "Revisiona o modifica le informazioni sulle feature e sulla posizione.",
    "duplicateModify": "Duplica, serve modifica",
    "duplicateSave": "Salva come nuova feature"
  },
  "warningsAndErrors": {
    "invalidCSV": "Errore durante il recupero degli elementi da CSV, verificare di aver selezionato un file CSV valido.",
    "noLayersWarning": "Nessun layer di destinazione valido configurato, verificare la configurazione.",
    "loadWarning": "Questo widget richiede un'origine dati Feature Service. Configurare il widget per definire un'origine dati.",
    "saveError": "Errore durante il salvataggio delle feature.",
    "consumesCredits": "Questo strumento consuma crediti quando viene utilizzato con il servizio di geocodifica mondiale ArcGIS Online.",
    "noValue": "Seleziona un campo",
    "mappingTitle": "",
    "locationMappingComplete": "Location Mapping Complete",
    "fieldMappingComplete": "Field Mapping Complete",
    "settingsCleared": "Le impostazioni saranno cancellate.",
    "proceed": "Continuare?",
    "itemMoveMatch": "L'elemento è stato posizionato e spostato nell'elenco posizioni trovate",
    "itemMoveUnMatched": "Impossibile localizzare l'elemento. Spostato nell'elenco posizioni non trovate.",
    "itemWillBeLocated": "L'elemento verrà rimosso dall'elenco posizioni duplicate.",
    "cannotLocate": "Impossibile localizzare l'elemento. Verificare le informazioni sulla posizione.",
    "invalidMessage": "Valore non valido.",
    "rangeMessage": "Il valore deve essere inferiore a ${num} caratteri.",
    "locatorError": "Locator non valido o non accessibile.",
    "notConfigured": "locator non configurato per le opzioni di localizzazione attuali",
    "noMoreLocators": "nessun locator aggiuntivo configurato"
  },
  "featureToolbar": {
    "locate": "Trova",
    "save": "Salva record",
    "cancel": "Elimina modifiche",
    "cancelTitle": "Annulla modifiche",
    "cancelMessage": "Annullare le modifiche al record attuale?"
  }
});