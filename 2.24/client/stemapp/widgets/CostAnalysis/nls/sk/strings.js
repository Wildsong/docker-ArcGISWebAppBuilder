///////////////////////////////////////////////////////////////////////////
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
  "_widgetLabel": "Analýza nákladov",
  "unableToFetchInfoErrMessage": "Nie je možné načítať službu geometrie/konfigurovať podrobnosti vrstvy",
  "invalidCostingGeometryLayer": "Nie je možné získať 'esriFieldTypeGlobalID' v nákladovej vrstve geometrie.",
  "projectLayerNotFound": "Nie je možné na mape nájsť konfigurovanú vrstvu projektu.",
  "costingGeometryLayerNotFound": "Nie je možné na mape nájsť konfigurovanú nákladovú vrstvu geometrie.",
  "projectMultiplierTableNotFound": "Nie je možné nájsť na mape konfigurovanú tabuľku dodatočných nákladov multiplikátora projektu.",
  "projectAssetTableNotFound": "Nie je možné nájsť na mape konfigurovanú tabuľku aktív projektu.",
  "createLoadProject": {
    "createProjectPaneTitle": "Vytvoriť projekt",
    "loadProjectPaneTitle": "Načítať projekt",
    "projectNamePlaceHolder": "Názov projektu",
    "projectDescPlaceHolder": "Popis projektu",
    "selectProject": "Vybrať projekt",
    "viewInMapLabel": "Náhľad",
    "loadLabel": "Načítať",
    "createLabel": "Vytvoriť",
    "deleteProjectConfirmationMsg": "Ste si istí, že chcete odstrániť projekt?",
    "noAssetsToViewOnMap": "Vybraný projekt nemá žiadne aktíva na zobrazenie na mape.",
    "projectDeletedMsg": "Projekt bol úspešne odstránený.",
    "errorInCreatingProject": "Chyba pri vytváraní projektu.",
    "errorProjectNotFound": "Projekt nebol nájdený.",
    "errorInLoadingProject": "Skontrolujte, či je vybraný platný projekt.",
    "errorProjectNotSelected": "Vybrať projekt z rozbaľovacej ponuky",
    "errorDuplicateProjectName": "Názov projektu už existuje.",
    "errorFetchingPointLabel": "Chyba pri získavaní definičného bodu. Skúste, prosím, znova",
    "errorAddingPointLabel": "Chyba pri pridávaní definičného bodu. Skúste, prosím, znova"
  },
  "statisticsSettings": {
    "tabTitle": "Nastavenia štatistiky",
    "addStatisticsLabel": "Pridať štatistiku",
    "addNewStatisticsText": "Pridať novú štatistiku",
    "deleteStatisticsText": "Odstrániť štatistiku",
    "moveStatisticsUpText": "Presunúť štatistiku hore",
    "moveStatisticsDownText": "Presunúť štatistiku dolu",
    "layerNameTitle": "Vrstva",
    "statisticsTypeTitle": "Typ",
    "fieldNameTitle": "Pole",
    "statisticsTitle": "Označenie",
    "actionLabelTitle": "Akcie",
    "selectDeselectAllTitle": "Vybrať všetko",
    "layerCheckbox": "Zaškrtávacie políčko vrstvy"
  },
  "statisticsType": {
    "countLabel": "Počet",
    "averageLabel": "Priemer",
    "maxLabel": "Maximum",
    "minLabel": "Minimum",
    "summationLabel": "Zhrnutie",
    "areaLabel": "Plocha",
    "lengthLabel": "Dĺžka",
    "expandCollapseAriaLabel": "'${displayTitle}' Počet '${featureCount}'"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Vrstvy musia byť v paneli nastavení vrstvy ako editovateľné"
  },
  "workBench": {
    "refresh": "Obnoviť",
    "noAssetAddedMsg": "Žiadne pridané aktíva",
    "units": "jednotka(-y)",
    "assetDetailsTitle": "Podrobnosti položky aktíva",
    "costEquationTitle": "Rovnica nákladu",
    "newCostEquationTitle": "Nová rovnica",
    "defaultCostEquationTitle": "Predvolená rovnica",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Scenár",
    "costingInfoHintText": "<div>Nápoveda: Použite nasledujúce kľúčové slová</div><ul><li><b>{TOTALCOUNT}</b>: Používa celkový počet aktív toho istého typu v geografii</li><li><b>{MEASURE}</b>: Používa dĺžku pre aktívum línie a oblasť pre aktívum polygónu</li><li><b>{TOTALMEASURE}</b>: Používa celkovú dĺžku pre aktívum línie a celkovú oblasť pre aktívum polygónu rovnakého typu v geografii</li></ul> Môžete použiť funkcie ako:<ul><li>Mat.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Upravte rovnicu nákladov podľa potrieb vášho projektu.",
    "zoomToAsset": "Priblížiť k aktívu",
    "deleteAsset": "Odstrániť aktívum",
    "closeDialog": "Zatvoriť dialóg",
    "objectIdColTitle": "ID objektu",
    "costColTitle": "Náklady",
    "errorInvalidCostEquation": "Neplatná rovnica nákladov.",
    "errorInSavingAssetDetails": "Nie je možné uložiť podrobnosti aktíva.",
    "featureModeText": "Režim vytvárania prvku",
    "sketchToolTitle": "Načrtnúť nové aktíva.",
    "selectToolTitle": "Kopírovať aktíva z existujúceho prvku na mape.",
    "downloadCSVBtnTitle": "Exportovať prehľad",
    "templatePickerTitle": "Vybrať šablónu na vytvorenie nových aktív:"
  },
  "assetDetails": {
    "inGeography": " v ${geography} ",
    "withScenario": " s ${scenario}",
    "totalCostTitle": "Celkové náklady",
    "additionalCostLabel": "Popis",
    "additionalCostValue": "Hodnota",
    "additionalCostNetValue": "Čistá hodnota"
  },
  "projectOverview": {
    "assetItemsTitle": "Položky aktíva",
    "assetStatisticsTitle": "Štatistika aktíva",
    "projectSummaryTitle": "Zhrnutie projektu",
    "projectName": "Názov projektu: ${name}",
    "totalCostLabel": "Celkové náklady projektu (*):",
    "grossCostLabel": "Hrubé náklady projektu (*):",
    "roundingLabel": "* Zaokrúhlené na '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Nie je možné uložiť hranice projektu vo vrstve projektu.",
    "unableToSaveProjectCost": "Nie je možné uložiť náklad(y) vo vrstve projektu.",
    "roundCostValues": {
      "twoDecimalPoint": "Dva desatinné body",
      "nearestWholeNumber": "Najbližšie celé číslo",
      "nearestTen": "Najbližšia desiatka",
      "nearestHundred": "Najbližšia stovka",
      "nearestThousand": "Najbližšia tisícka",
      "nearestTenThousands": "Najbližšia desaťtisícka"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atribút projektu",
    "projectAttributeTitle": "Editovať atribúty projektu"
  },
  "costEscalation": {
    "costEscalationLabel": "Pridať doplnkové náklady",
    "valueHeader": "Hodnota",
    "addCostEscalationText": "Pridať doplnkové náklady",
    "deleteCostEscalationText": "Odstrániť vybrané doplnkové náklady",
    "moveCostEscalationUpText": "Presunúť vybrané doplnkové náklady hore",
    "moveCostEscalationDownText": "Presunúť vybrané doplnkové náklady dole",
    "invalidEntry": "Jeden alebo viac záznamov sú neplatné.",
    "errorInSavingCostEscalation": "Nie je možné uložiť doplnkové podrobnosti nákladov."
  },
  "scenarioSelection": {
    "popupTitle": "Vybrať scenár pre aktívum",
    "regionLabel": "Geografia",
    "scenarioLabel": "Scenár",
    "noneText": "Žiadne",
    "copyFeatureMsg": "Chcete kopírovať vybrané prvky?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Štatistika podrobností",
    "noDetailStatisticAvailable": "Nebola pridaná štatistika aktíva",
    "addStatisticsButtonLabel": "Pridať"
  },
  "copyFeatures": {
    "title": "Kopírovať prvky",
    "createFeatures": "Vytvoriť prvky",
    "createSingleFeature": "Vytvoriť jeden multigeometrický prvok",
    "noFeaturesSelectedMessage": "Žiadne vybrané prvky",
    "selectFeatureToCopyMessage": "Vyberte prvky na kopírovanie.",
    "copyFeatureUpdateGeometryError": "Nie je možné aktualizovať geometriu zvolených prvkov"
  },
  "updateCostEquationPanel": {
    "updateProjectCostTabLabel": "Aktualizovať rovnice projektu",
    "updateProjectCostSelectProjectTitle": "Vybrať všetky projekty",
    "updateButtonTextForm": "Aktualizovať",
    "updateProjectCostSuccess": "Rovnice nákladov vybraných projektov sú aktualizované",
    "updateProjectCostError": "Nie je možné aktualizovať rovnice nákladov vybraných projektov",
    "updateProjectNoProject": "Nebol nájdený žiadny projekt"
  }
});