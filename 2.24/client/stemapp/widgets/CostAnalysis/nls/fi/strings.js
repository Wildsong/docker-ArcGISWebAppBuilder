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
  "_widgetLabel": "Kustannusanalyysi",
  "unableToFetchInfoErrMessage": "Geometriapalvelun tai määritetyn karttatason tietoja ei voi noutaa",
  "invalidCostingGeometryLayer": "Kenttää esriFieldTypeGlobalID ei voi noutaa kustannusgeometrian karttatasosta.",
  "projectLayerNotFound": "Määritettyä projektikarttatasoa ei löydy kartasta.",
  "costingGeometryLayerNotFound": "Määritettyä kustannusgeometrian karttatasoa ei löydy kartasta.",
  "projectMultiplierTableNotFound": "Määritettyä projektin ylimääräisten kustannuskerrointen taulua ei löydy kartasta.",
  "projectAssetTableNotFound": "Määritettyä projektin omaisuustaulua ei löydy kartasta.",
  "createLoadProject": {
    "createProjectPaneTitle": "Luo projekti",
    "loadProjectPaneTitle": "Lataa projekti",
    "projectNamePlaceHolder": "Projektin nimi",
    "projectDescPlaceHolder": "Projektin kuvaus",
    "selectProject": "Valitse projekti",
    "viewInMapLabel": "Esikatselu",
    "loadLabel": "Lataa",
    "createLabel": "Luo",
    "deleteProjectConfirmationMsg": "Haluatko varmasti poistaa projektin?",
    "noAssetsToViewOnMap": "Valitussa projektissa ei ole kartassa tarkasteltavia omaisuuksia.",
    "projectDeletedMsg": "Projekti on poistettu.",
    "errorInCreatingProject": "Virhe projektin luonnissa.",
    "errorProjectNotFound": "Projektia ei löydy.",
    "errorInLoadingProject": "Tarkista, onko valittu projekti kelvollinen.",
    "errorProjectNotSelected": "Valitse projekti avattavasta luettelosta",
    "errorDuplicateProjectName": "Projektin nimi on jo olemassa.",
    "errorFetchingPointLabel": "Virhe noudettaessa tunnustekstipistettä. Yritä uudelleen",
    "errorAddingPointLabel": "Virhe lisättäessä tunnustekstipistettä. Yritä uudelleen"
  },
  "statisticsSettings": {
    "tabTitle": "Tilastotietojen asetukset",
    "addStatisticsLabel": "Lisää tilastotiedot",
    "addNewStatisticsText": "Lisää uudet tilastotiedot",
    "deleteStatisticsText": "Poista tilastotiedot",
    "moveStatisticsUpText": "Siirrä tilastotiedot ylös",
    "moveStatisticsDownText": "Siirrä tilastotiedot alas",
    "layerNameTitle": "Karttataso",
    "statisticsTypeTitle": "Tyyppi",
    "fieldNameTitle": "Kenttä",
    "statisticsTitle": "Tunnusteksti",
    "actionLabelTitle": "Toiminnot",
    "selectDeselectAllTitle": "Valitse kaikki",
    "layerCheckbox": "Karttatason valintaruutu"
  },
  "statisticsType": {
    "countLabel": "Lukumäärä",
    "averageLabel": "Keskiarvo",
    "maxLabel": "Maksimi",
    "minLabel": "Minimi",
    "summationLabel": "Summa",
    "areaLabel": "Alue",
    "lengthLabel": "Pituus",
    "expandCollapseAriaLabel": "${displayTitle}, määrä: ${featureCount}"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Karttatasot on valittava muokattaviksi karttatason asetusvälilehdellä"
  },
  "workBench": {
    "refresh": "Päivitä",
    "noAssetAddedMsg": "Yhtään omaisuutta ei ole lisätty",
    "units": "yksikköä",
    "assetDetailsTitle": "Omaisuuskohteen tiedot",
    "costEquationTitle": "Kustannusyhtälö",
    "newCostEquationTitle": "Uusi yhtälö",
    "defaultCostEquationTitle": "Oletusyhtälö",
    "geographyTitle": "Maantieteellinen kohde",
    "scenarioTitle": "Skenaario",
    "costingInfoHintText": "<div>Vihje: käytä seuraavia avainsanoja</div><ul><li><b>{TOTALCOUNT}</b>: käyttää saman tyypin omaisuuksien kokonaismäärää maantieteellisellä alueella</li> <li><b>{MEASURE}</b>: käyttää viivaomaisuuden pituutta alueomaisuuden pinta-alaa</li><li><b>{TOTALMEASURE}</b>: käyttää viivaomaisuuden kokonaispituutta ja alueomaisuuden kokonaispinta-alaa maantieteellisellä alueella</li></ul> Voit käyttää esimerkiksi seuraavia funktioita:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Muokkaa kustannusyhtälöä projektisi tarpeiden mukaisesti.",
    "zoomToAsset": "Tarkenna omaisuuteen",
    "deleteAsset": "Poista omaisuus",
    "closeDialog": "Sulje valintaikkuna",
    "objectIdColTitle": "Objektin tunnus",
    "costColTitle": "Kustannukset",
    "errorInvalidCostEquation": "Virheellinen kustannusyhtälö.",
    "errorInSavingAssetDetails": "Omaisuustietojen tallennus ei onnistu.",
    "featureModeText": "Kohteen luontitila",
    "sketchToolTitle": "Luonnostele uusia omaisuuksia.",
    "selectToolTitle": "Kopioi omaisuudet kartan olemassa olevasta kohteesta.",
    "downloadCSVBtnTitle": "Vie raportti",
    "templatePickerTitle": "Luo uusia omaisuuksia valitsemalla malli:"
  },
  "assetDetails": {
    "inGeography": " kohteessa ${geography} ",
    "withScenario": " skenaarion ${scenario} kanssa",
    "totalCostTitle": "Kokonaiskustannus",
    "additionalCostLabel": "Kuvaus",
    "additionalCostValue": "Arvo",
    "additionalCostNetValue": "Nettoarvo"
  },
  "projectOverview": {
    "assetItemsTitle": "Omaisuuskohteet",
    "assetStatisticsTitle": "Omaisuuden tilastotiedot",
    "projectSummaryTitle": "Projektin yhteenveto",
    "projectName": "Projektin nimi: ${name}",
    "totalCostLabel": "Projektin kokonaiskustannukset (*):",
    "grossCostLabel": "Projektin bruttokustannukset (*):",
    "roundingLabel": "* Pyöristetään arvoon ${selectedRoundingOption}",
    "unableToSaveProjectBoundary": "Projektin rajaa ei voi tallentaa projektikarttatasoon.",
    "unableToSaveProjectCost": "Kustannuksia ei voi tallentaa projektikarttatasoon.",
    "roundCostValues": {
      "twoDecimalPoint": "Kaksi desimaaliarvoa",
      "nearestWholeNumber": "Lähin kokonaisluku",
      "nearestTen": "Lähin kymmenluku",
      "nearestHundred": "Lähin sataluku",
      "nearestThousand": "Lähin tuhatluku",
      "nearestTenThousands": "Lähin kymmentuhatluku"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Projektin ominaisuustieto",
    "projectAttributeTitle": "Muokkaa projektin ominaisuustietoja"
  },
  "costEscalation": {
    "costEscalationLabel": "Lisää lisäkustannus",
    "valueHeader": "Arvo",
    "addCostEscalationText": "Lisää lisäkustannus",
    "deleteCostEscalationText": "Poista valittu lisäkustannus",
    "moveCostEscalationUpText": "Siirrä valittua lisäkustannusta ylöspäin",
    "moveCostEscalationDownText": "Siirrä valittua lisäkustannusta alaspäin",
    "invalidEntry": "Vähintään yksi merkintä on virheellinen.",
    "errorInSavingCostEscalation": "Lisäkustannustietojen tallennus ei onnistu."
  },
  "scenarioSelection": {
    "popupTitle": "Valitse omaisuuden skenaario",
    "regionLabel": "Maantieteellinen kohde",
    "scenarioLabel": "Skenaario",
    "noneText": "Ei mitään",
    "copyFeatureMsg": "Haluatko kopioida valitut kohteet?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Yksityiskohtaiset tilastotiedot",
    "noDetailStatisticAvailable": "Omaisuuden tilastotietoja ei ole lisätty",
    "addStatisticsButtonLabel": "Lisää"
  },
  "copyFeatures": {
    "title": "Kopioi kohteet",
    "createFeatures": "Luo kohteet",
    "createSingleFeature": "Luo yksi Multi-Geometry-kohde",
    "noFeaturesSelectedMessage": "Yhtään kohdetta ei ole valittu",
    "selectFeatureToCopyMessage": "Valitse kopioitavat kohteet.",
    "copyFeatureUpdateGeometryError": "Valittujen kohteiden geometriaa ei voi päivittää"
  },
  "updateCostEquationPanel": {
    "updateProjectCostTabLabel": "Päivitä projektin yhtälöt",
    "updateProjectCostSelectProjectTitle": "Valitse kaikki projektit",
    "updateButtonTextForm": "Päivitä",
    "updateProjectCostSuccess": "Valittujen projektien kustannusyhtälöt on päivitetty",
    "updateProjectCostError": "Valittujen projektien kustannusyhtälöitä ei voi päivittää",
    "updateProjectNoProject": "Yhtään projektia ei löytynyt"
  }
});