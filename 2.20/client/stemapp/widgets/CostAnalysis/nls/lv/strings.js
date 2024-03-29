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
  "_widgetLabel": "Izmaksu analīze",
  "unableToFetchInfoErrMessage": "Nevar ienest detalizētu informāciju par ģeometrijas servisu/konfigurēto slāni",
  "invalidCostingGeometryLayer": "Nevar iegūt “esriFieldTypeGlobalID” izmaksu ģeometrijas slānī.",
  "projectLayerNotFound": "Nevar atrast konfigurēto projektu slāni kartē.",
  "costingGeometryLayerNotFound": "Nevar atrast konfigurēto izmaksu ģeometrijas slāni kartē.",
  "projectMultiplierTableNotFound": "Nevar atrast konfigurēto projekta reizinātāja papildu izmaksu tabulu kartē.",
  "projectAssetTableNotFound": "Nevar atrast konfigurēto projektu vērtību tabulu kartē.",
  "createLoadProject": {
    "createProjectPaneTitle": "Izveidot projektu",
    "loadProjectPaneTitle": "Ielādēt projektu",
    "projectNamePlaceHolder": "Projekta nosaukums",
    "projectDescPlaceHolder": "Projekta apraksts",
    "selectProject": "Izvēlēties projektu",
    "viewInMapLabel": "Priekšskatījums",
    "loadLabel": "Ielādēt",
    "createLabel": "Izveidot",
    "deleteProjectConfirmationMsg": "Vai tiešām vēlaties dzēst šo projektu?",
    "noAssetsToViewOnMap": "Izvēlētajā projektā nav neviena līdzekļa, ko skatīt kartē.",
    "projectDeletedMsg": "Projekts ir veiksmīgi izdzēsts.",
    "errorInCreatingProject": "Veidojot projektu, radās kļūda.",
    "errorProjectNotFound": "Projekts nav atrasts.",
    "errorInLoadingProject": "Pārbaudiet, vai ir izvēlēts derīgs projekts.",
    "errorProjectNotSelected": "Izvēlieties projektu nolaižamajā izvēlnē",
    "errorDuplicateProjectName": "Projekta nosaukums jau eksistē.",
    "errorFetchingPointLabel": "Izgūstot marķējuma punktu, radās kļūda. Mēģiniet vēlreiz",
    "errorAddingPointLabel": "Pievienojot marķējuma punktu, radās kļūda. Mēģiniet vēlreiz"
  },
  "statisticsSettings": {
    "tabTitle": "Statistikas iestatījumi",
    "addStatisticsLabel": "Pievienot statistiku",
    "addNewStatisticsText": "Pievienot jaunu statistiku",
    "deleteStatisticsText": "Dzēst statistiku",
    "moveStatisticsUpText": "Pārvietot statistiku uz augšu",
    "moveStatisticsDownText": "Pārvietot statistiku uz leju",
    "layerNameTitle": "Slānis",
    "statisticsTypeTitle": "Veids",
    "fieldNameTitle": "Lauks",
    "statisticsTitle": "Etiķete",
    "actionLabelTitle": "Darbības",
    "selectDeselectAllTitle": "Izvēlēties visu",
    "layerCheckbox": "Slāņa izvēles lodziņš"
  },
  "statisticsType": {
    "countLabel": "Skaits",
    "averageLabel": "Vidējais",
    "maxLabel": "Maksimums",
    "minLabel": "Minimums",
    "summationLabel": "Summēšana",
    "areaLabel": "Platība",
    "lengthLabel": "Garums",
    "expandCollapseAriaLabel": "“${displayTitle}” skaits “${featureCount}”"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Slānis(-ņi) ir jāatzīmē kā rediģējami slāņu iestatījumu cilnē"
  },
  "workBench": {
    "refresh": "Atjaunot",
    "noAssetAddedMsg": "Vērtības nav pievienotas",
    "units": "mērvienība(-s)",
    "assetDetailsTitle": "Detalizēta informācija par vienības vērtību",
    "costEquationTitle": "Izmaksu vienādojums",
    "newCostEquationTitle": "Jauns vienādojums",
    "defaultCostEquationTitle": "Noklusējuma vienādojums",
    "geographyTitle": "Ģeogrāfiskais reģions",
    "scenarioTitle": "Scenārijs",
    "costingInfoHintText": "<div>Uzvedne: izmantojiet tālāk norādītos atslēgas vārdus</div><ul><li><b>{TOTALCOUNT}</b>: izmanto vienāda veida vērtību kopskaitu ģeogrāfijā</li> <li><b>{MEASURE}</b>: izmanto garumu līniju vērtībām un platību laukuma vērtībām</li><li><b>{TOTALMEASURE}</b>: izmanto kopējo garumu tā paša veida līniju vērtībām un kopējo platību laukumu vērtībām ģeogrāfijā</li></ul> Varat izmantot dažādas funkcijas, piemēram:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Labojiet izmaksu vienādojumu atbilstoši projekta vajadzībām.",
    "zoomToAsset": "Pietuvināt vērtībai",
    "deleteAsset": "Dzēst vērtību",
    "closeDialog": "Aizvērt dialoglodziņu",
    "objectIdColTitle": "Objekta ID",
    "costColTitle": "Izmaksas",
    "errorInvalidCostEquation": "Nederīgs izmaksu vienādojums.",
    "errorInSavingAssetDetails": "Nevar saglabāt detalizētu informāciju par vērtību.",
    "featureModeText": "Elementu izveides režīms",
    "sketchToolTitle": "Ieskicējiet jaunus līdzekļus.",
    "selectToolTitle": "Iekopējiet kartē līdzekļus no esošā elementa.",
    "downloadCSVBtnTitle": "Eksportēt pārskatu",
    "templatePickerTitle": "Atlasiet veidni, lai izveidotu jaunus līdzekļus:"
  },
  "assetDetails": {
    "inGeography": " ģeogrāfiskā reģionā ${geography} ",
    "withScenario": " izmantojot scenāriju ${scenario}",
    "totalCostTitle": "Izmaksu kopsumma",
    "additionalCostLabel": "Apraksts",
    "additionalCostValue": "Vērtība",
    "additionalCostNetValue": "Neto vērtība"
  },
  "projectOverview": {
    "assetItemsTitle": "Vienību vērtības",
    "assetStatisticsTitle": "Vērtību statistika",
    "projectSummaryTitle": "Projekta kopsavilkums",
    "projectName": "Projekta nosaukums: ${name}",
    "totalCostLabel": "Projekta izmaksu kopsumma (*):",
    "grossCostLabel": "Projekta bruto izmaksas (*):",
    "roundingLabel": "* Noapaļojot uz “${selectedRoundingOption}”",
    "unableToSaveProjectBoundary": "Nevar saglabāt projekta robežu projekta slānī.",
    "unableToSaveProjectCost": "Nevar saglabāt izmaksas projekta slānī.",
    "roundCostValues": {
      "twoDecimalPoint": "Divi cipari aiz komati",
      "nearestWholeNumber": "Tuvākais veselais skaitlis",
      "nearestTen": "Tuvākais desmitu skaitlis",
      "nearestHundred": "Tuvākais simtu skaitlis",
      "nearestThousand": "Tuvākais tūkstošu skaitlis",
      "nearestTenThousands": "Tuvākais desmitu tūkstošu skaitlis"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projekta atribūts",
    "projectAttributeTitle": "Labot projekta atribūtus"
  },
  "costEscalation": {
    "costEscalationLabel": "Pievienot papildu izmaksas",
    "valueHeader": "Vērtība",
    "addCostEscalationText": "Pievienot papildu izmaksas",
    "deleteCostEscalationText": "Dzēst izvēlētās papildu izmaksas",
    "moveCostEscalationUpText": "Pārvietot izvēlētās papildu izmaksas uz augšu",
    "moveCostEscalationDownText": "Pārvietot izvēlētās papildu izmaksas uz leju",
    "invalidEntry": "Viens vai vairāki ieraksti ir nederīgi.",
    "errorInSavingCostEscalation": "Nevar saglabāt detalizētu informāciju par papildu izmaksām."
  },
  "scenarioSelection": {
    "popupTitle": "Izvēlieties scenāriju vērtībai",
    "regionLabel": "Ģeogrāfiskais reģions",
    "scenarioLabel": "Scenārijs",
    "noneText": "Neviens",
    "copyFeatureMsg": "Vai vēlaties kopēt izvēlētos elementus?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Detalizēta statistika",
    "noDetailStatisticAvailable": "Nav pievienota vērtību statistika",
    "addStatisticsButtonLabel": "Pievienot"
  },
  "copyFeatures": {
    "title": "Kopēt elementus",
    "createFeatures": "Izveidot elementus",
    "createSingleFeature": "Izveidot vienu vairākdaļu ģeometrijas elementu",
    "noFeaturesSelectedMessage": "Nav atlasītu elementu",
    "selectFeatureToCopyMessage": "Lūdzu, atlasiet kopējamos elementus.",
    "copyFeatureUpdateGeometryError": "Nevar atjaunināt atlasīto elementu ģeometriju"
  },
  "updateCostEquationPanel": {
    "updateProjectCostTabLabel": "Atjaunināt projekta vienādojumus",
    "updateProjectCostSelectProjectTitle": "Izvēlēties visus projektus",
    "updateButtonTextForm": "Atjaunināt",
    "updateProjectCostSuccess": "Izvēlēto projektu izmaksu vienādojumi ir atjaunināti",
    "updateProjectCostError": "Nevar atjaunināt izvēlēto projektu izmaksu vienādojumu",
    "updateProjectNoProject": "Nav atrasts neviens projekts"
  }
});