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
  "_widgetLabel": "Omkostningsanalyse",
  "unableToFetchInfoErrMessage": "Kan ikke hente oplysninger om geometritjeneste/konfigurerede lag",
  "invalidCostingGeometryLayer": "Kan ikke hente 'esriFieldTypeGlobalID' i omkostningsgeometrilaget.",
  "projectLayerNotFound": "Kan ikke finde det konfigurerede projektlag i kortet.",
  "costingGeometryLayerNotFound": "Kan ikke finde det konfigurerede omkostningsgeometrilag i kortet.",
  "projectMultiplierTableNotFound": "Kan ikke finde den konfigurerede tabel over multiplikator for yderligere projektomkostninger i kortet.",
  "projectAssetTableNotFound": "Kan ikke finde den konfigurerede projektaktivtabel i kortet.",
  "createLoadProject": {
    "createProjectPaneTitle": "Opret projekt",
    "loadProjectPaneTitle": "Indlæs projekt",
    "projectNamePlaceHolder": "Projektnavn",
    "projectDescPlaceHolder": "Projektbeskrivelse",
    "selectProject": "Vælg projekt",
    "viewInMapLabel": "Eksempel",
    "loadLabel": "Indlæs",
    "createLabel": "Opret",
    "deleteProjectConfirmationMsg": "Er du sikker på, at du vil slette dette projekt?",
    "noAssetsToViewOnMap": "Det valgte projekt har ikke nogen aktiver, der kan vises på kortet.",
    "projectDeletedMsg": "Projekt slettet uden fejl.",
    "errorInCreatingProject": "Fejl under oprettelse af projekt.",
    "errorProjectNotFound": "Projekt blev ikke fundet.",
    "errorInLoadingProject": "Kontrollér, om der er valgt et gyldigt projekt.",
    "errorProjectNotSelected": "Vælg et projekt på rullemenuen",
    "errorDuplicateProjectName": "Projektnavnet findes allerede.",
    "errorFetchingPointLabel": "Fejl under hentning af etiketpunkt. Prøv igen",
    "errorAddingPointLabel": "Fejl under tilføjelse af etiketpunkt. Prøv igen"
  },
  "statisticsSettings": {
    "tabTitle": "Statistik-indstillinger",
    "addStatisticsLabel": "Tilføj statistik",
    "addNewStatisticsText": "Tilføj ny statistik",
    "deleteStatisticsText": "Slet statistik",
    "moveStatisticsUpText": "Flyt statistik op",
    "moveStatisticsDownText": "Flyt statistik ned",
    "layerNameTitle": "Lag",
    "statisticsTypeTitle": "Type",
    "fieldNameTitle": "Felt",
    "statisticsTitle": "Mærke",
    "actionLabelTitle": "Handlinger",
    "selectDeselectAllTitle": "Vælg alle",
    "layerCheckbox": "Lagets afkrydsningsfelt"
  },
  "statisticsType": {
    "countLabel": "Tælling",
    "averageLabel": "Gennemsnit",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Summering",
    "areaLabel": "Område",
    "lengthLabel": "Længde",
    "expandCollapseAriaLabel": "'${displayTitle}' Antal '${featureCount}'"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Lag(ene) skal markeres som redigérbare på fanen med lagindstillinger"
  },
  "workBench": {
    "refresh": "Opdatér",
    "noAssetAddedMsg": "Ingen aktiver tilføjet",
    "units": "enhed(er)",
    "assetDetailsTitle": "Aktiv-elementoplysninger",
    "costEquationTitle": "Omkostningsligning",
    "newCostEquationTitle": "Ny ligning",
    "defaultCostEquationTitle": "Standardligning",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Scenarie",
    "costingInfoHintText": "<div>Tip: Brug følgende nøgleord</div><ul><li><b>{TOTALCOUNT}</b>: Bruger det samlede antal af den samme type aktiv i en geografi</li><li><b>{MEASURE}</b>: Bruger længde for linjeaktiv og område for polygonaktiv</li><li><b>{TOTALMEASURE}</b>: Bruger den samlede længde for linjeaktivet og det samlede område for polygonaktivet af samme type i en geografi</li></ul>Du kan bruge funktioner, såsom:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redigér omkostningsligningen ud fra dine projektbehov.",
    "zoomToAsset": "Zoom til aktiv",
    "deleteAsset": "Slet aktiv",
    "closeDialog": "Luk dialogboks",
    "objectIdColTitle": "Objekt-ID",
    "costColTitle": "Omkostning",
    "errorInvalidCostEquation": "Ugyldig omkostningsligning.",
    "errorInSavingAssetDetails": "Kan ikke gemme aktivoplysninger.",
    "featureModeText": "Objektoprettelsestilstand",
    "sketchToolTitle": "Skitser nye aktiver",
    "selectToolTitle": "Kopier aktiver fra eksisterende objekt i kortet.",
    "downloadCSVBtnTitle": "Eksportér rapport",
    "templatePickerTitle": "Vælg en skabelon til oprettelse af aktiver:"
  },
  "assetDetails": {
    "inGeography": " i ${geography} ",
    "withScenario": " med ${scenario}",
    "totalCostTitle": "Samlede omkostninger",
    "additionalCostLabel": "Beskrivelse",
    "additionalCostValue": "Værdi",
    "additionalCostNetValue": "Nettoværdi"
  },
  "projectOverview": {
    "assetItemsTitle": "Aktivelementer",
    "assetStatisticsTitle": "Aktivstatistik",
    "projectSummaryTitle": "Projektoversigt",
    "projectName": "Projektnavn: ${name}",
    "totalCostLabel": "Samlede projektomkostninger (*):",
    "grossCostLabel": "Brutto-projektomkostninger (*):",
    "roundingLabel": "* Afrundet til '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Kan ikke gemme projektgrænse i projektlaget.",
    "unableToSaveProjectCost": "Kan ikke gemme omkostning(er) i projektlaget.",
    "roundCostValues": {
      "twoDecimalPoint": "To decimaler",
      "nearestWholeNumber": "Nærmeste hele tal",
      "nearestTen": "Nærmeste tier",
      "nearestHundred": "Nærmeste hundrede",
      "nearestThousand": "Nærmeste tusinde",
      "nearestTenThousands": "Nærmeste titusinde"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projektattribut",
    "projectAttributeTitle": "Redigér projektattributter"
  },
  "costEscalation": {
    "costEscalationLabel": "Tilføj yderligere omkostninger",
    "valueHeader": "Værdi",
    "addCostEscalationText": "Tilføj yderligere omkostninger",
    "deleteCostEscalationText": "Slet de valgte yderligere omkostninger",
    "moveCostEscalationUpText": "Flyt de valgte yderligere omkostninger op",
    "moveCostEscalationDownText": "Flyt de valgte yderligere omkostninger ned",
    "invalidEntry": "En eller flere poster er ugyldige.",
    "errorInSavingCostEscalation": "Kan ikke gemme oplysninger om yderligere omkostninger."
  },
  "scenarioSelection": {
    "popupTitle": "Vælg scenarie for aktiv",
    "regionLabel": "Geografi",
    "scenarioLabel": "Scenarie",
    "noneText": "Ingen",
    "copyFeatureMsg": "Vil du kopiere de valgte objekter?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Detaljeret statistik",
    "noDetailStatisticAvailable": "Ingen aktivstatistik tilføjet",
    "addStatisticsButtonLabel": "Tilføj"
  },
  "copyFeatures": {
    "title": "Kopiér objekter",
    "createFeatures": "Opret objekter",
    "createSingleFeature": "Opret 1 Multigeometri-objekt",
    "noFeaturesSelectedMessage": "Ingen funktioner valgt",
    "selectFeatureToCopyMessage": "Vælg de objekter, der skal kopieres.",
    "copyFeatureUpdateGeometryError": "Kan ikke opdatere geometri for valgte objekter."
  },
  "updateCostEquationPanel": {
    "updateProjectCostTabLabel": "Opdatér projektligninger",
    "updateProjectCostSelectProjectTitle": "Vælg alle projekter",
    "updateButtonTextForm": "Opdatering",
    "updateProjectCostSuccess": "Omkostningsligningerne for de valgte projekter opdateres",
    "updateProjectCostError": "Kan ikke opdatere omkostningsligningen for de valgte projekter",
    "updateProjectNoProject": "Ingen projekter fundet"
  }
});