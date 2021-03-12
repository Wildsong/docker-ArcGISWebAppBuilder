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
  "_widgetLabel": "Premietanie",
  "geometryServicesNotFound": "Geometrická služba nie je dostupná.",
  "unableToDrawBuffer": "Nie je možné nakresliť mapovú anotáciu. Skúste prosím znova.",
  "invalidConfiguration": "Neplatná konfigurácia.",
  "clearAOIButtonLabel": "Začať od znova",
  "noGraphicsShapefile": "Nahraný shapefile neobsahuje žiadne grafiky.",
  "zoomToLocationTooltipText": "Priblížiť na umiestnenie",
  "noGraphicsToZoomMessage": "Neboli nájdené žiadne grafiky na priblíženie.",
  "placenameWidget": {
    "placenameLabel": "Hľadať umiestnenie"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Vybrať režim kreslenia",
    "toggleSelectability": "Kliknite na prepnutie voliteľnosti",
    "chooseLayerTitle": "Vyberte voliteľné vrstvy",
    "selectAllLayersText": "Vybrať všetko",
    "layerSelectionWarningTooltip": "Aspoň jedna vrstva by mala byť zvolená pri vytváraní oblasti záujmu (AOI)",
    "selectToolLabel": "Nástroj voľby"
  },
  "shapefileWidget": {
    "shapefileLabel": "Nahrať zazipovaný shapefile",
    "uploadShapefileButtonText": "Nahrať",
    "unableToUploadShapefileMessage": "Nie je možné nahrať shapefile."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definovať začiatočný bod",
    "addButtonTitle": "Pridať",
    "deleteButtonTitle": "Odstrániť",
    "mapTooltipForStartPoint": "Kliknite na mapu pre definovanie začiatočný bod",
    "mapTooltipForUpdateStartPoint": "Kliknite na mapu na aktualizáciu začiatočného bodu",
    "locateText": "Umiestniť",
    "locateByMapClickText": "Zvoliť počiatočné súradnice",
    "enterBearingAndDistanceLabel": "Zadajte smerník a vzdialenosť od začiatočného bodu",
    "bearingTitle": "Pretínanie",
    "distanceTitle": "Vzdialenosť",
    "planSettingTooltip": "Nastavenia plánu",
    "invalidLatLongMessage": "Prosím zadajte platné hodnoty."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Šírka obalovej zóny (voliteľné)",
    "bufferInputLabel": "Zobraziť výsledky v rámci",
    "bufferDistanceLabel": "Vzdialenosť obalovej zóny",
    "bufferUnitLabel": "Jednotka obalovej zóny"
  },
  "traverseSettings": {
    "bearingLabel": "Smerník",
    "lengthLabel": "Dĺžka",
    "addButtonTitle": "Pridať",
    "deleteButtonTitle": "Odstrániť",
    "deleteBearingAndLengthLabel": "Odstrániť riadok so smerníkom a dĺžkou",
    "addButtonLabel": "Pridať smerník a dĺžku"
  },
  "planSettings": {
    "expandGridTooltipText": "Rozvinúť mriežku",
    "collapseGridTooltipText": "Zbaliť mriežku",
    "directionUnitLabelText": "Jednotky navigačných pokynov",
    "distanceUnitLabelText": "Jednotky vzdialenosti a dĺžky",
    "planSettingsComingSoonText": "Už čoskoro"
  },
  "newTraverse": {
    "invalidBearingMessage": "Neplatný smerník.",
    "invalidLengthMessage": "Neplatná dĺžka.",
    "negativeLengthMessage": "Záporná dĺžka"
  },
  "reportsTab": {
    "aoiAreaText": "Plocha oblasti záujmu (AOI)",
    "downloadButtonTooltip": "Stiahnuť",
    "printButtonTooltip": "Tlačiť",
    "uploadShapefileForAnalysisText": "Nahrať shapefile na zahrnutie do analýzy",
    "uploadShapefileForButtonText": "Prehľadať",
    "downloadLabelText": "Zvoliť formát :",
    "downloadBtnText": "Stiahnuť",
    "noDetailsAvailableText": "Neboli nájdené žiadne výsledky",
    "featureCountText": "Počet",
    "featureAreaText": "Plocha",
    "featureLengthText": "Dĺžka",
    "attributeChooserTooltip": "Vybrať atribúty na zobrazenie",
    "csv": "CSV",
    "filegdb": "Súborová geodatabáza",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Pre zvolený formát súboru nebol nájdený žiaden výsledok",
    "selectReportFieldTitle": "Zvoliť polia",
    "noFieldsSelected": "Neboli vybrané žiadne stĺpce",
    "intersectingFeatureExceedsMsgOnCompletion": "Maximálny počet záznamov bol dosiahnutý pre jednu alebo viac vrstiev.",
    "unableToAnalyzeText": "Nie je možné analyzovať, pretože bol dosiahnutý maximálny počet záznamov.",
    "errorInPrintingReport": "Nie je možné vytlačiť hlásenie. Prosím skontrolujte, či sú nastavenia hlásenia platné.",
    "aoiInformationTitle": "Informácie o Oblasti záujmu (AOI)",
    "summaryReportTitle": "Súhrn",
    "notApplicableText": "Nedostupná",
    "downloadReportConfirmTitle": "Potvrdiť sťahovanie",
    "downloadReportConfirmMessage": "Ste si istí, že chcete sťahovať?",
    "noDataText": "Bez údajov",
    "createReplicaFailedMessage": "Operácia sťahovania zlyhala pre nasledovnú vrstvu(y):<br/>${layerNames}",
    "extractDataTaskFailedMessage": "Operácia sťahovania zlyhala.",
    "printLayoutLabelText": "Rozloženie",
    "printBtnText": "Tlačiť",
    "printDialogHint": "Poznámka: Názov hlásenia a komentáre môžu byť upravené v prehľade hlásenia.",
    "unableToDownloadFileGDBText": "Geodatabáza súborov nemôže byť stiahnutá pre oblasť záujmu (AOI) obsahujúcu umiestnenia bodov alebo línií",
    "unableToDownloadShapefileText": "Shapefile nemôže byť stiahnutá pre oblasť záujmu (AOI) obsahujúcu umiestnenia bodov alebo línií",
    "analysisAreaUnitLabelText": "Zobraziť plošné výsledky v:",
    "analysisLengthUnitLabelText": "Zobraziť dĺžkové výsledky v:",
    "analysisUnitButtonTooltip": "Zvoliť jednotky na analýzu",
    "analysisCloseBtnText": "Zatvoriť",
    "areaSquareFeetUnit": "Štvorcové stopy",
    "areaAcresUnit": "Akre",
    "areaSquareMetersUnit": "Štvorcové metre",
    "areaSquareKilometersUnit": "Štvorcové kilometre",
    "areaHectaresUnit": "Hektáre",
    "areaSquareMilesUnit": "Štvorcové míle",
    "lengthFeetUnit": "Stopy",
    "lengthMilesUnit": "Míle",
    "lengthMetersUnit": "Metre",
    "lengthKilometersUnit": "Kilometre",
    "hectaresAbbr": "hektáre",
    "squareMilesAbbr": "Štvorcové míle",
    "layerNotVisibleText": "Nie je možné analyzovať. Vrstva je vypnutá alebo je mimo rozsahu mierky viditeľnosti.",
    "refreshBtnTooltip": "Obnoviť hlásenie",
    "featureCSVAreaText": "Pretínajúca plocha",
    "featureCSVLengthText": "Pretínajúca dĺžka",
    "errorInFetchingPrintTask": "Chyba pri získavaní informácií o tlačovej úlohe. Skúste prosím znova.",
    "selectAllLabel": "Vybrať všetko",
    "errorInLoadingProjectionModule": "Chyba pri načítavaní závislostí transformačného modulu. Prosím skúste súbor stiahnuť znova.",
    "expandCollapseIconLabel": "Pretnuté prvky",
    "intersectedFeatureLabel": "Podrobnosti pretnutého prvku",
    "valueAriaLabel": "Hodnota",
    "countAriaLabel": "Počet",
    "layerNameWithFeatureCount": "${layerName} vrstva s ${featureCount} pretínajúcimi sa prvkami"
  }
});