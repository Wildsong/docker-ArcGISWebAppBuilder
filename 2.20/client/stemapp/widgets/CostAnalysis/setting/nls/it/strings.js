﻿///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define({
  "configText": "Imposta testo config.:",
  "generalSettings": {
    "tabTitle": "Impostazioni generali",
    "measurementUnitLabel": "Unità di costo",
    "currencyLabel": "Simbolo del costo",
    "roundCostLabel": "Costo arrotondato",
    "projectOutputSettings": "Impostazioni output progetto",
    "typeOfProjectAreaLabel": "Tipo di area di progetto",
    "bufferDistanceLabel": "Distanza di buffer",
    "csvReportExportLabel": "Consentire all'utente di esportare il report del progetto",
    "editReportSettingsBtnTooltip": "Modificare le impostazioni del report",
    "roundCostValues": {
      "twoDecimalPoint": "Due punti decimali",
      "nearestWholeNumber": "Numero intero più prossimo",
      "nearestTen": "Decimo più prossimo",
      "nearestHundred": "Centinaio più prossimo",
      "nearestThousand": "Migliaio più prossimo",
      "nearestTenThousands": "Decina di migliaia più prossime"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Impostazioni report",
      "reportNameLabel": "Nome del report (facoltativo):",
      "checkboxLabel": "Mostra",
      "layerTitle": "Titolo",
      "columnLabel": "Etichetta",
      "duplicateMsg": "Duplicare etichetta"
    },
    "projectAreaType": {
      "outline": "Outline",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unità valuta non valida",
      "bufferDistance": "Distanza di buffer non valida",
      "outOfRangebufferDistance": "Il valore deve essere superiore a 0 e inferiore o uguale a 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Impostazioni di progetto",
    "costingGeometrySectionTitle": "Definisci geografia per costo (opzionale)",
    "costingGeometrySectionNote": "Nota: la configurazione di questo layer consentirà all'utente di impostare equazioni di costo di modelli di feature basati su aree geografiche.",
    "projectTableSectionTitle": "Possibilità di salvare/caricare le impostazioni di progetto (opzionali)",
    "projectTableSectionNote": "Nota: la configurazione di tutti i layer e le tabelle consentirà all’utente di salvare/caricare il progetto per un uso successivo.",
    "costingGeometryLayerLabel": "Costing Geometry Layer",
    "fieldLabelGeography": "Campo da etichettare Geografia",
    "projectAssetsTableLabel": "Tabella risorse del progetto",
    "projectMultiplierTableLabel": "Tabella costi aggiuntivi moltiplicatore progetto",
    "projectLayerLabel": "Project Layer",
    "configureFieldsLabel": "Configure Fields",
    "fieldDescriptionHeaderTitle": "Descrizione Campo",
    "layerFieldsHeaderTitle": "Layer Field",
    "selectLabel": "Seleziona",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} è già stato selezionato",
      "invalidConfiguration": "Selezionare ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Saranno mostrati layer poligonali con le seguenti condizioni verranno mostrati: <br/> <li> Il layer deve avere la capacità 'Query' </li><li> Il layer deve avere un campo GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>I campi stringa e numerici del 'Costing Geometry Layer' saranno mostrati nell'elenco a discesa 'Campo da etichettare Geografia'.</p>",
    "projectAssetsTableHelp": "<p>Saranno mostrate le tabelle con le seguenti condizioni: <br/> <li>La tabella deve avere funzionalità di modifica ovvero 'Crea', 'Elimina' e 'Aggiorna'</li> <li>La tabella deve avere sei campi con il nome e il tipo di dati esatti:</li><ul><li> AssetGUID (campo tipo GUID)</li><li> CostEquation (campo tipo stringa)</li><li> Scenario (campo tipo stringa)</li><li> TemplateName (campo tipo stringa)</li><li> GeographyGUID (campo tipo GUID)</li><li> ProjectGUID (campo tipo GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Saranno mostrate le tabelle con le seguenti condizioni: <br/> <li>La tabella deve avere funzionalità di modifica ovvero 'Crea', 'Elimina' e 'Aggiorna'</li> <li>La tabella deve avere cinque campi con il nome e il tipo di dati esatti:</li><ul><li> Descrizione (campo tipo stringa)</li><li> Tipo (campo tipo stringa)</li><li> Valore (campo tipo Float/Doppio)</li><li> Costindex (campo tipo intero)</li><li> ProjectGUID (campo tipo GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>Saranno mostrati i layer poligonali con le seguenti condizioni: <br/> <li>Il layer deve avere funzionalità di modifica ovvero 'Crea', 'Elimina' e 'Aggiorna'</li> <li>Il layer deve avere cinque campi con il nome e il tipo di dati esatti:</li><ul><li>ProjectName (campo tipo stringa)</li><li>Descrizione (campo tipo stringa)</li><li>Totalassetcost (campo tipo Float/Doppio)</li><li>Grossprojectcost (campo tipo Float/Doppio)</li><li>GlobalID (campo tipo GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centroide layer puntuale",
    "selectRelatedPointLayerDefaultOption": "Seleziona",
    "pointLayerHintText": "<p>Saranno mostrati i layer puntuali con le seguenti condizioni: <br/> <li>\tl layer deve avere il campo 'Projectid' (tipo GUID)</li><li>\tIl layer deve avere funzionalità di modifica ovvero “Crea”, “Elimina” e “Aggiorna”</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Impostazioni layer",
    "layerNameHeaderTitle": "Nome layer",
    "layerNameHeaderTooltip": "Elenco di layer nella mappa",
    "EditableLayerHeaderTitle": "Modificabile",
    "EditableLayerHeaderTooltip": "Includere layer e modelli nel costing widget",
    "SelectableLayerHeaderTitle": "Selezionabile",
    "SelectableLayerHeaderTooltip": "La geometria derivata da una feature può essere utilizzata per generare una nuova voce di costo",
    "fieldPickerHeaderTitle": "ID progetto (opzionale)",
    "fieldPickerHeaderTooltip": "Campo opzionale (di stringa tipo) per memorizzare l’ID progetto in",
    "selectLabel": "Seleziona",
    "noAssetLayersAvailable": "Nessun elemento del layer trovato nella webmap selezionata",
    "disableEditableCheckboxTooltip": "Questo layer non ha funzionalità di modifica",
    "missingCapabilitiesMsg": "Il layer ha perso le seguenti capacità:",
    "missingGlobalIdMsg": "Il layer non dispone del campo GlobalId",
    "create": "Crea",
    "update": "Aggiorna",
    "deleteColumnLabel": "Elimina",
    "attributeSettingHeaderTitle": "Impostazioni di attributo",
    "addFieldLabelTitle": "Aggiungi attributi",
    "layerAttributesHeaderTitle": "Attributi layer",
    "projectLayerAttributesHeaderTitle": "Attributi layer di progetto",
    "attributeSettingsPopupTitle": "Impostazioni attributo layer"
  },
  "costingInfo": {
    "tabTitle": "Info sui costi",
    "proposedMainsLabel": "Linea principale proposta",
    "addCostingTemplateLabel": "Aggiungi modello di costi",
    "manageScenariosTitle": "Gestisci scenari",
    "featureTemplateTitle": "Modello di feature",
    "costEquationTitle": "Equazione di costi",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Scenario",
    "actionTitle": "Azioni",
    "scenarioNameLabel": "Nome scenario",
    "addBtnLabel": "Aggiungi",
    "srNoLabel": "No.",
    "deleteLabel": "Elimina",
    "duplicateScenarioName": "Duplica nome scenario",
    "hintText": "<div>Suggerimento: utilizzare le seguenti parole chiave</div><ul><li><b>{TOTALCOUNT}</b>: utilizza il numero totale di risorse dello stesso tipo in una geografia</li><li><b>{MEASURE}</b>: utilizza la lunghezza per gli elementi lineari  e l’area gli elementi poligonali</li><li><b>{TOTALMEASURE}</b>: utilizza la lunghezza totale per gli elementi lineari  e l’area totale per gli ellementi poligonali dello stesso tipo in una geografia</li></ul>È possibile utilizzare le funzioni come:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modificare l'equazione di costi in base alle necessità di progetto.",
    "noneValue": "None",
    "requiredCostEquation": "Equazione di costi non valida per ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Esiste una elemento del modello duplicato per ${layerName}: ${templateName}",
    "defaultEquationRequired": "È richiesta un’equazione predefinita per ${layerName} : ${templateName}",
    "validCostEquationMessage": "Immettere un’equazione di costi valida",
    "costEquationHelpText": "Modificare l’equazione di costi in base alla necessità di progetto",
    "scenarioHelpText": "Selezionare lo scenario in base alla necessità del progetto",
    "copyRowTitle": "Copia riga",
    "noTemplateAvailable": "Aggiungere almeno un modello per ${layerName}",
    "manageScenarioLabel": "Gestisci scenario",
    "noLayerMessage": "Immettere almeno un layer in ${tabName}",
    "noEditableLayersAvailable": "I layer devono essere selezionati come editabili nella scheda impostazioni layer",
    "updateProjectCostCheckboxLabel": "Aggiorna equazioni del progetto",
    "updateProjectCostEquationHint": "Suggerimento: ciò consente all'utente di aggiornare le equazioni di costi delle risorse già aggiunte nei progetti esistenti con le nuove equazioni definite di seguito in base al modello di feature, alla geografia e allo scenario. Se la combinazione non viene trovata, viene impostata sull'equazione di costi predefinita, ovvero la geografia e lo scenario come 'Nessuno’. In caso di modello di feature rimosso, il costo sarà impostato su 0."
  },
  "statisticsSettings": {
    "tabTitle": "Ulteriori impostazioni",
    "addStatisticsLabel": "Aggiungi statistiche",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Etichetta",
    "addNewStatisticsText": "Aggiungi nuove statistiche",
    "deleteStatisticsText": "Elimina statistiche",
    "moveStatisticsUpText": "Sposta statistiche in alto",
    "moveStatisticsDownText": "Sposta statistiche in basso",
    "selectDeselectAllTitle": "Seleziona tutto"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Aggiungi ulteriori costi del progetto",
    "additionalCostValueColumnHeader": "Valore",
    "invalidProjectCostMessage": "Voce non valida per il costo del progetto",
    "additionalCostLabelColumnHeader": "Etichetta",
    "additionalCostTypeColumnHeader": "Tipo"
  },
  "statisticsType": {
    "countLabel": "Conteggio",
    "averageLabel": "Media",
    "maxLabel": "Massimo",
    "minLabel": "Minimo",
    "summationLabel": "Somma",
    "areaLabel": "Area",
    "lengthLabel": "Lunghezza"
  }
});