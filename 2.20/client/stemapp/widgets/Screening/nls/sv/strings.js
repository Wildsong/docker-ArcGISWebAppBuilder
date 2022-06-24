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
  "_widgetLabel": "Undersökning",
  "geometryServicesNotFound": "Geometritjänsten är inte tillgänglig.",
  "unableToDrawBuffer": "Det gick inte att rita bufferten. Försök igen.",
  "invalidConfiguration": "Ogiltig konfiguration.",
  "clearAOIButtonLabel": "Börja om",
  "noGraphicsShapefile": "Den överförda shapefilen innehåller ingen grafik.",
  "zoomToLocationTooltipText": "Zooma till plats",
  "noGraphicsToZoomMessage": "Ingen grafik hittades att zooma in till.",
  "placenameWidget": {
    "placenameLabel": "Sök efter en plats"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Välj ritläge",
    "toggleSelectability": "Klicka om du vill växla valbarhet",
    "chooseLayerTitle": "Välj valbara lager",
    "selectAllLayersText": "Markera alla",
    "layerSelectionWarningTooltip": "Åtminstone ett lager bör väljas så att det går att skapa AOI",
    "selectToolLabel": "Markeringsverktyg"
  },
  "shapefileWidget": {
    "shapefileLabel": "Överför en zippad shapefil",
    "uploadShapefileButtonText": "Överför",
    "unableToUploadShapefileMessage": "Det går inte att överföra shapefilen."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Ange en startpunkt",
    "addButtonTitle": "Lägg till",
    "deleteButtonTitle": "Ta bort",
    "mapTooltipForStartPoint": "Klicka i kartan för att ange en startpunkt",
    "mapTooltipForUpdateStartPoint": "Klicka i kartan för att uppdatera startpunkten",
    "locateText": "Leta upp",
    "locateByMapClickText": "Välj startkoordinater",
    "enterBearingAndDistanceLabel": "Ange bäring och avstånd från startpunkten",
    "bearingTitle": "Bäring",
    "distanceTitle": "Avstånd",
    "planSettingTooltip": "Planinställningar",
    "invalidLatLongMessage": "Ange giltiga värden."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Buffertavstånd (valfritt)",
    "bufferInputLabel": "Visa resultat inom",
    "bufferDistanceLabel": "Buffertavstånd",
    "bufferUnitLabel": "Buffertenhet"
  },
  "traverseSettings": {
    "bearingLabel": "Bäring",
    "lengthLabel": "Längd",
    "addButtonTitle": "Lägg till",
    "deleteButtonTitle": "Ta bort",
    "deleteBearingAndLengthLabel": "Ta bort raden för bäring och längd",
    "addButtonLabel": "Lägg till bäring och längd"
  },
  "planSettings": {
    "expandGridTooltipText": "Expandera rutnät",
    "collapseGridTooltipText": "Komprimera rutnät",
    "directionUnitLabelText": "Riktningsenheter",
    "distanceUnitLabelText": "Avstånd och längdenheter",
    "planSettingsComingSoonText": "Kommer snart"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ogiltig bäring.",
    "invalidLengthMessage": "Ogiltig längd.",
    "negativeLengthMessage": "Negativ längd"
  },
  "reportsTab": {
    "aoiAreaText": "AOI-område",
    "downloadButtonTooltip": "Hämta",
    "printButtonTooltip": "Skriv ut",
    "uploadShapefileForAnalysisText": "Överför shapefil som ska inkluderas i analys",
    "uploadShapefileForButtonText": "Bläddra",
    "downloadLabelText": "Välj format:",
    "downloadBtnText": "Hämta",
    "noDetailsAvailableText": "Det gick inte att hitta något resultat",
    "featureCountText": "Antal",
    "featureAreaText": "Område",
    "featureLengthText": "Längd",
    "attributeChooserTooltip": "Välj attribut som ska visas",
    "csv": "CSV",
    "filegdb": "Filbaserad geodatabas",
    "shapefile": "Shapefil",
    "noFeaturesFound": "Inga resultat hittades för det valda filformatet",
    "selectReportFieldTitle": "Välj fält",
    "noFieldsSelected": "Inga fält är markerade",
    "intersectingFeatureExceedsMsgOnCompletion": "Det maximala antalet poster har nåtts för ett eller flera lager.",
    "unableToAnalyzeText": "Det går inte att utföra en analys när det maximala antalet poster har nåtts.",
    "errorInPrintingReport": "Det går inte att skriva ut rapporten. Kontrollera om inställningarna är de rätta.",
    "aoiInformationTitle": "Information om intressant område (AOI, area of interest)",
    "summaryReportTitle": "Sammanfattning",
    "notApplicableText": "Inget standardvärde",
    "downloadReportConfirmTitle": "Bekräfta hämtning",
    "downloadReportConfirmMessage": "Vill du utföra hämtningen?",
    "noDataText": "Inga data",
    "createReplicaFailedMessage": "Hämtningen av följande lager misslyckades: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Hämtningen misslyckades.",
    "printLayoutLabelText": "Layout",
    "printBtnText": "Skriv ut",
    "printDialogHint": "Obs! Den nya rapporttiteln och kommentarerna kan inte redigeras i fönstret för förhandsgranskning av rapporten.",
    "unableToDownloadFileGDBText": "Filgeodatabasen kan inte hämtas för intresseområden som innehåller punkt- eller linjeplatser",
    "unableToDownloadShapefileText": "Shapefilen kan inte hämtas för intresseområden som innehåller punkt- eller linjeplatser",
    "analysisAreaUnitLabelText": "Visa områdesresultat i:",
    "analysisLengthUnitLabelText": "Visa längdresultat i:",
    "analysisUnitButtonTooltip": "Välj enheter för analys",
    "analysisCloseBtnText": "Stäng",
    "areaSquareFeetUnit": "Kvadratfot",
    "areaAcresUnit": "Tunnland",
    "areaSquareMetersUnit": "Kvadratmeter",
    "areaSquareKilometersUnit": "Kvadratkilometer",
    "areaHectaresUnit": "Hektar",
    "areaSquareMilesUnit": "Kvadratmil (engelska)",
    "lengthFeetUnit": "Fot",
    "lengthMilesUnit": "Mile",
    "lengthMetersUnit": "Meter",
    "lengthKilometersUnit": "Kilometer",
    "hectaresAbbr": "hektar",
    "squareMilesAbbr": "Kvadratmil (engelska)",
    "layerNotVisibleText": "Det går inte att analysera. Lagret är avstängt eller utanför skalans synlighetsintervall.",
    "refreshBtnTooltip": "Uppdatera rapport",
    "featureCSVAreaText": "Korsande område",
    "featureCSVLengthText": "Korsande längd",
    "errorInFetchingPrintTask": "Fel vid hämtning av information om utskriftsåtgärd. Försök igen.",
    "selectAllLabel": "Markera alla",
    "errorInLoadingProjectionModule": "Ett fel uppstod vid inläsning av projektionsmodulens beroenden. Försök hämta filen igen.",
    "expandCollapseIconLabel": "Genomskurna geoobjekt",
    "intersectedFeatureLabel": "Information om genomskuret geoobjekt",
    "valueAriaLabel": "Värde",
    "countAriaLabel": "Antal",
    "layerNameWithFeatureCount": "${layerName} lager med ${featureCount} geoobjekt som skär varandra"
  }
});