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
  "_widgetLabel": "Kuluanalüüs",
  "unableToFetchInfoErrMessage": "Geomeetriateenuse konfigureeritud kihi üksikasju ei saa tuua",
  "invalidCostingGeometryLayer": "„esriFieldTypeGlobalID“-d ei saa tuua kuluarvutuste geomeetria kihti.",
  "projectLayerNotFound": "Konfigureeritud projekti kihti ei leitud kaardilt.",
  "costingGeometryLayerNotFound": "Konfigureeritud kuluarvutuse geomeetria kihti ei leitud kaardilt.",
  "projectMultiplierTableNotFound": "Konfigureeritud projekti kordaja täiendavat kulutabelit ei leitud kaardilt.",
  "projectAssetTableNotFound": "Konfigureeritud projekti vara tabelit ei leitud kaardilt.",
  "createLoadProject": {
    "createProjectPaneTitle": "Loo projekt",
    "loadProjectPaneTitle": "Laadi projekt",
    "projectNamePlaceHolder": "Projekti nimi",
    "projectDescPlaceHolder": "Projekti kirjeldus",
    "selectProject": "Vali projekt",
    "viewInMapLabel": "Eelvaade",
    "loadLabel": "Laadi",
    "createLabel": "Loo",
    "deleteProjectConfirmationMsg": "Kas soovite selle projekti kindlasti kustutada?",
    "noAssetsToViewOnMap": "Valitud projektil pole varasid, mida kaardil kuvada.",
    "projectDeletedMsg": "Projekt on kustutatud.",
    "errorInCreatingProject": "Tõrge projekti loomisel.",
    "errorProjectNotFound": "Projekti ei leitud.",
    "errorInLoadingProject": "Kontrollige, kas valitud on kehtiv.",
    "errorProjectNotSelected": "Valige ripploendist projekt",
    "errorDuplicateProjectName": "Projekti nimi on juba olemas.",
    "errorFetchingPointLabel": "Viga sildi punkti toomisel. Proovige uuesti",
    "errorAddingPointLabel": "Viga sildi punkti lisamisel. Proovige uuesti"
  },
  "statisticsSettings": {
    "tabTitle": "Statistika seaded",
    "addStatisticsLabel": "Lisa statistika",
    "addNewStatisticsText": "Lisa uus statistika",
    "deleteStatisticsText": "Kustuta statistika",
    "moveStatisticsUpText": "Liiguta statistikat üles",
    "moveStatisticsDownText": "Liiguta statistikat alla",
    "layerNameTitle": "Kiht",
    "statisticsTypeTitle": "Tüüp",
    "fieldNameTitle": "Väli",
    "statisticsTitle": "Märgis",
    "actionLabelTitle": "Toimingud",
    "selectDeselectAllTitle": "Vali kõik",
    "layerCheckbox": "Kihi märkeruut"
  },
  "statisticsType": {
    "countLabel": "Koguarv",
    "averageLabel": "Keskmine",
    "maxLabel": "Maksimum",
    "minLabel": "Miinimum",
    "summationLabel": "Summeerimine",
    "areaLabel": "Ala",
    "lengthLabel": "Pikkus",
    "expandCollapseAriaLabel": "'${displayTitle}' – '${featureCount}'"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Kihi seadete vahekaardil tuleb kiht(kihid) märkida redigeeritavaks"
  },
  "workBench": {
    "refresh": "Värskenda",
    "noAssetAddedMsg": "Varasid ei ole lisatud",
    "units": "ühik(ud)",
    "assetDetailsTitle": "Vara üksuse üksikasjad",
    "costEquationTitle": "Kuluvõrrand",
    "newCostEquationTitle": "Uus võrrand",
    "defaultCostEquationTitle": "Vaikevõrrand",
    "geographyTitle": "Geograafia",
    "scenarioTitle": "Stsenaarium",
    "costingInfoHintText": "<div>Vihje: kasutage järgmisi märksõnu</div><ul><li><b>{TOTALCOUNT}</b>: kasutatakse geograafia sama tüüpi vara koguarvu</li> <li><b>{MEASURE}</b>: kasutatakse rea vara pikkust ja polügooni vara ala</li><li><b>{TOTALMEASURE}</b>: kasutatakse geograafia sama tüübi rea vara kogupikkust ja polügooni vara koguala</li></ul> Saate kasutada funktsioone nagu:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redigeerige kuluvõrrandit vastavalt oma projekti vajadustele.",
    "zoomToAsset": "Suumi varale",
    "deleteAsset": "Kustuta vara",
    "closeDialog": "Sule dialoogiaken",
    "objectIdColTitle": "Objekti ID",
    "costColTitle": "Maksumus",
    "errorInvalidCostEquation": "Sobimatu kuluvõrrand.",
    "errorInSavingAssetDetails": "Vara üksikasju ei saa salvestada.",
    "featureModeText": "Objekti loomise režiim",
    "sketchToolTitle": "Visandage uued varad.",
    "selectToolTitle": "Kopeerige varad olemasolevalt objektilt kaardile.",
    "downloadCSVBtnTitle": "Ekspordi aruanne",
    "templatePickerTitle": "Valige uute varade loomiseks mall:"
  },
  "assetDetails": {
    "inGeography": " asukohas ${geography} ",
    "withScenario": " koos ${scenario}",
    "totalCostTitle": "Kogukulud",
    "additionalCostLabel": "Kirjeldus",
    "additionalCostValue": "Väärtus",
    "additionalCostNetValue": "Netoväärtus"
  },
  "projectOverview": {
    "assetItemsTitle": "Vara üksused",
    "assetStatisticsTitle": "Vara statistika",
    "projectSummaryTitle": "Projekti kokkuvõte",
    "projectName": "Projekti nimi: ${name}",
    "totalCostLabel": "Projekti kogukulu (*):",
    "grossCostLabel": "Projekti brutokulu (*):",
    "roundingLabel": "* Ümardatakse '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Projekti kihis ei saa projekti piirajat salvestada.",
    "unableToSaveProjectCost": "Projekti kihis ei saa kulu(sid) salvestada.",
    "roundCostValues": {
      "twoDecimalPoint": "Kaks komakohta",
      "nearestWholeNumber": "Lähim täisarv",
      "nearestTen": "Lähim kümme",
      "nearestHundred": "Lähim sada",
      "nearestThousand": "Lähim tuhat",
      "nearestTenThousands": "Lähim kümme tuhat"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projekti atribuut",
    "projectAttributeTitle": "Redigeeri projekti atribuute"
  },
  "costEscalation": {
    "costEscalationLabel": "Lisa täiendav kulu",
    "valueHeader": "Väärtus",
    "addCostEscalationText": "Lisa täiendav kulu",
    "deleteCostEscalationText": "Kustuta valitud täiendav kulu",
    "moveCostEscalationUpText": "Liiguta valitud täiendavat kulu üles",
    "moveCostEscalationDownText": "Liiguta valitud täiendavat kulu alla",
    "invalidEntry": "Üks või mitu kannet on sobimatud.",
    "errorInSavingCostEscalation": "Täiendava kulu üksikasju ei saa salvestada."
  },
  "scenarioSelection": {
    "popupTitle": "Vali vara stsenaarium",
    "regionLabel": "Geograafia",
    "scenarioLabel": "Stsenaarium",
    "noneText": "Puudub",
    "copyFeatureMsg": "Kas soovite valitud objektid kopeerida?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Üksikasjalik statistika",
    "noDetailStatisticAvailable": "Vara statistikat pole lisatud",
    "addStatisticsButtonLabel": "Lisa"
  },
  "copyFeatures": {
    "title": "Kopeeri objektid",
    "createFeatures": "Loo objektid",
    "createSingleFeature": "Loo üks mitmeosalise geomeetriaga objekt",
    "noFeaturesSelectedMessage": "Objekte pole valitud",
    "selectFeatureToCopyMessage": "Kopeerimiseks valige objektid.",
    "copyFeatureUpdateGeometryError": "Valitud objektide geomeetriat ei saa uuendada"
  },
  "updateCostEquationPanel": {
    "updateProjectCostTabLabel": "Uuenda projekti võrrandeid",
    "updateProjectCostSelectProjectTitle": "Vali kõik projektid",
    "updateButtonTextForm": "Uuenda",
    "updateProjectCostSuccess": "Värskendatakse valitud projektide kuluvõrrandeid",
    "updateProjectCostError": "Ei õnnestu värskendada valitud projektide kuluvõrrandit",
    "updateProjectNoProject": "Projekti ei leitud"
  }
});