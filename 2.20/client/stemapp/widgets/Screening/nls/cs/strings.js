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
  "_widgetLabel": "Screening",
  "geometryServicesNotFound": "Služba geometrie není k dispozici.",
  "unableToDrawBuffer": "Obalovou zónu se nepodařilo vykreslit. Zkuste to prosím znovu.",
  "invalidConfiguration": "Neplatná konfigurace.",
  "clearAOIButtonLabel": "Začít znovu",
  "noGraphicsShapefile": "Nahraný soubor shapefile neobsahuje žádnou grafiku.",
  "zoomToLocationTooltipText": "Přiblížit na polohu",
  "noGraphicsToZoomMessage": "Pro přiblížení nebyla nalezena žádná grafika.",
  "placenameWidget": {
    "placenameLabel": "Hledat umístění"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Vybrat režim kreslení",
    "toggleSelectability": "Kliknutím přepnete podporování výběru.",
    "chooseLayerTitle": "Zvolte vrstvy s možností výběru",
    "selectAllLayersText": "Vybrat vše",
    "layerSelectionWarningTooltip": "Pro vytvoření zájmové oblasti by měla být vybrána alespoň jedna vrstva",
    "selectToolLabel": "Vybrat nástroj"
  },
  "shapefileWidget": {
    "shapefileLabel": "Nahrát soubor shapefile ve formátu ZIP",
    "uploadShapefileButtonText": "Nahrát",
    "unableToUploadShapefileMessage": "Soubor shapefile nelze nahrát."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Definovat počáteční bod",
    "addButtonTitle": "Přidat",
    "deleteButtonTitle": "Odstranit",
    "mapTooltipForStartPoint": "Počáteční bod nastavíte kliknutím na mapě.",
    "mapTooltipForUpdateStartPoint": "Počáteční bod aktualizujete kliknutím na mapě.",
    "locateText": "Najít umístění",
    "locateByMapClickText": "Vybrat počáteční souřadnice",
    "enterBearingAndDistanceLabel": "Zadejte směr a vzdálenost od počátečního bodu",
    "bearingTitle": "Azimut",
    "distanceTitle": "Vzdálenost",
    "planSettingTooltip": "Nastavení plánu",
    "invalidLatLongMessage": "Zadejte platné hodnoty."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Šířka obalové zóny (volitelné)",
    "bufferInputLabel": "Zobrazit výsledky v rámci",
    "bufferDistanceLabel": "Šířka obalové zóny",
    "bufferUnitLabel": "Jednotka obalové zóny"
  },
  "traverseSettings": {
    "bearingLabel": "Azimut",
    "lengthLabel": "Délka",
    "addButtonTitle": "Přidat",
    "deleteButtonTitle": "Odstranit",
    "deleteBearingAndLengthLabel": "Odstranit řádek azimutu a délky",
    "addButtonLabel": "Přidat azimut a délku"
  },
  "planSettings": {
    "expandGridTooltipText": "Rozbalit mřížku",
    "collapseGridTooltipText": "Sbalit mřížku",
    "directionUnitLabelText": "Jednotka směru",
    "distanceUnitLabelText": "Jednotky vzdálenosti a délky",
    "planSettingsComingSoonText": "Připravujeme"
  },
  "newTraverse": {
    "invalidBearingMessage": "Neplatný směr",
    "invalidLengthMessage": "Neplatná délka",
    "negativeLengthMessage": "Záporná délka"
  },
  "reportsTab": {
    "aoiAreaText": "Oblast AOI",
    "downloadButtonTooltip": "Stáhnout",
    "printButtonTooltip": "Tisk",
    "uploadShapefileForAnalysisText": "Nahrát soubor shapefile a zahrnout jej do analýzy",
    "uploadShapefileForButtonText": "Procházet",
    "downloadLabelText": "Vyberte formát:",
    "downloadBtnText": "Stáhnout",
    "noDetailsAvailableText": "Nebyly nalezeny žádné výsledky.",
    "featureCountText": "Počet",
    "featureAreaText": "Plocha",
    "featureLengthText": "Délka",
    "attributeChooserTooltip": "Zvolte atributy k zobrazení",
    "csv": "CSV",
    "filegdb": "Souborová geodatabáze",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Pro vybraný formát souboru nebyl nalezen žádný výsledek.",
    "selectReportFieldTitle": "Vybrat pole",
    "noFieldsSelected": "Nebyla vybrána žádná pole",
    "intersectingFeatureExceedsMsgOnCompletion": "Pro jednu nebo více vrstev byl dosažen maximální počet záznamů.",
    "unableToAnalyzeText": "Analýzu nelze provést, byl dosažen maximální počet záznamů.",
    "errorInPrintingReport": "Zprávu nelze vytisknout. Zkontrolujte, zda je nastavení zprávy platné.",
    "aoiInformationTitle": "Údaje o zájmové oblasti (AOI)",
    "summaryReportTitle": "Souhrn",
    "notApplicableText": "NENÍ K DISPOZICI",
    "downloadReportConfirmTitle": "Potvrdit stahování",
    "downloadReportConfirmMessage": "Určitě chcete položku stáhnout?",
    "noDataText": "Žádná data",
    "createReplicaFailedMessage": "Stažení následujících vrstev: <br/> ${layerNames} se nezdařilo.",
    "extractDataTaskFailedMessage": "Stažení se nezdařilo.",
    "printLayoutLabelText": "Rozvržení",
    "printBtnText": "Tisk",
    "printDialogHint": "Poznámka: Název zprávy a komentáře lze upravit v náhledu zprávy.",
    "unableToDownloadFileGDBText": "Souborovou geodatabázi nelze stáhnout pro zájmovou oblast obsahující umístění bodů nebo linií",
    "unableToDownloadShapefileText": "Soubor shapefile nelze stáhnout pro zájmovou oblast obsahující umístění bodů nebo linií.",
    "analysisAreaUnitLabelText": "Zobrazit výsledky plochy v:",
    "analysisLengthUnitLabelText": "Zobrazit výsledky délky v:",
    "analysisUnitButtonTooltip": "Vyberte jednotky pro analýzu",
    "analysisCloseBtnText": "Zavřít",
    "areaSquareFeetUnit": "Stopy čtvereční",
    "areaAcresUnit": "akry",
    "areaSquareMetersUnit": "Metry čtvereční",
    "areaSquareKilometersUnit": "Kilometry čtvereční",
    "areaHectaresUnit": "hektary",
    "areaSquareMilesUnit": "Čtvereční míle",
    "lengthFeetUnit": "stopy",
    "lengthMilesUnit": "míle",
    "lengthMetersUnit": "metry",
    "lengthKilometersUnit": "kilometry",
    "hectaresAbbr": "hektary",
    "squareMilesAbbr": "Čtvereční míle",
    "layerNotVisibleText": "Analýzu nelze provést. Vrstva je buď vypnutá, nebo je mimo rozsah viditelnosti měřítka.",
    "refreshBtnTooltip": "Obnovit zprávu",
    "featureCSVAreaText": "Překrývající se oblast",
    "featureCSVLengthText": "Překrývající se délka",
    "errorInFetchingPrintTask": "Chyba při získávání informací o tiskové úloze. Zkuste to prosím znovu.",
    "selectAllLabel": "Vybrat vše",
    "errorInLoadingProjectionModule": "Při nahrávání závislých položek modulu kartografického zobrazení došlo k chybě. Zkuste prosím stáhnout soubor znovu.",
    "expandCollapseIconLabel": "Protínající se prvky",
    "intersectedFeatureLabel": "Podrobnosti protínajícího prvku",
    "valueAriaLabel": "Hodnota",
    "countAriaLabel": "Počet",
    "layerNameWithFeatureCount": "${layerName} vrstva s ${featureCount} protínajícími se prvky"
  }
});