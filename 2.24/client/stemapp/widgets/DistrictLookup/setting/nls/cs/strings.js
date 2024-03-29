﻿/*global define*/
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
  "units": {
    "miles": "Míle",
    "kilometers": "Kilometry",
    "feet": "Stopy",
    "meters": "Metry"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Nastavení vyhledávání",
    "buttonSet": "Nastavit",
    "selectLayersLabel": "Vybrat vrstvu",
    "selectLayersHintText": "Nápověda: Slouží k výběru polygonové vrstvy a přidružené bodové vrstvy.",
    "selectPrecinctSymbolLabel": "Vyberte symbol pro zvýraznění polygonu.",
    "selectGraphicLocationSymbol": "Symbol adresy nebo umístění",
    "graphicLocationSymbolHintText": "Nápověda: Symbol vyhledávané adresy nebo umístění určeného kliknutím.",
    "precinctSymbolHintText": "Nápověda: Slouží k zobrazení symbolu pro zvolený polygon.",
    "selectColorForPoint": "Vyberte barvu pro zvýraznění bodu",
    "selectColorForPointHintText": "Nápověda: Slouží k zobrazení barvy zvýraznění zvoleného bodu."
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Nastavení zdroje vyhledávání",
    "searchSourceSettingTitle": "Nastavení zdroje vyhledávání",
    "searchSourceSettingTitleHintText": "Přidejte služby geokódování nebo vrstvy prvků a nakonfigurujte je jako zdroje vyhledávání. Tyto zadané zdroje budou určovat, co je možné vyhledávat v rámci pole pro hledání.",
    "addSearchSourceLabel": "Přidat zdroj vyhledávání",
    "featureLayerLabel": "Vrstva prvků",
    "geocoderLabel": "Geokodér",
    "nameTitle": "Název",
    "generalSettingLabel": "Obecné nastavení",
    "allPlaceholderLabel": "Zástupný text pro vyhledávání všech výsledků:",
    "allPlaceholderHintText": "Nápověda: Zadejte text, který se má zobrazit jako zástupný při prohledávání všech vrstev a geokodéru.",
    "generalSettingCheckboxLabel": "Zobrazit vyskakovací okno pro nalezený prvek nebo umístění",
    "countryCode": "Kódy země nebo oblasti",
    "countryCodeEg": "např. ",
    "countryCodeHint": "Pokud toto pole ponecháte prázdné, prohledají se všechny země a oblasti",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Vyhledávat pouze v aktuálním rozsahu mapy",
    "zoomScale": "Měřítko přiblížení",
    "locatorUrl": "URL geokodéru",
    "locatorName": "Název geokodéru",
    "locatorExample": "Příklad",
    "locatorWarning": "Tato verze služby geokódování není podporována. Tento widget podporuje službu geokódování verze 10.0 a novější.",
    "locatorTips": "Návrhy nejsou k dispozici, protože služba geokódování nepodporuje funkcionalitu návrhů.",
    "layerSource": "Zdroj vrstvy",
    "setLayerSource": "Nastavit zdroj vrstvy",
    "setGeocoderURL": "Nastavit adresu URL geokodéru",
    "searchLayerTips": "Návrhy nejsou k dispozici, protože Feature služba nepodporuje funkcionalitu stránkování.",
    "placeholder": "Zástupný text",
    "searchFields": "Prohledávané pole",
    "displayField": "Zobrazované pole",
    "exactMatch": "Přesná shoda",
    "maxSuggestions": "Maximální počet návrhů",
    "maxResults": "Maximální počet výsledků",
    "enableLocalSearch": "Povolit lokální vyhledávání",
    "minScale": "Min. měřítko",
    "minScaleHint": "Když je měřítko mapy větší než toto měřítko, použije se lokální vyhledávání.",
    "radius": "Poloměr",
    "radiusHint": "Stanoví poloměr oblasti okolo centra aktuální mapy, který se použije ke zvýšení hodnoty kandidátů geokódování, aby byli kandidáti nejblíže umístění vráceni jako první.",
    "meters": "Metry",
    "setSearchFields": "Nastavit prohledávané pole",
    "set": "Nastavit",
    "fieldName": "Název",
    "invalidUrlTip": "Adresa URL ${URL} je neplatná nebo nepřístupná.",
    "invalidSearchSources": "Neplatné nastavení zdroje vyhledávání",
    "errorMessageLabel": "Chybové hlášení",
    "errorMessageHint": "Nápověda: Nastavení zprávy, která se zobrazí, když nejsou nalezeny žádné výsledky",
    "noPrecinctFoundMsg": "Pro tuto adresu nebo umístění nebyl nalezen žádný polygon."
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Vyberte polygonovou vrstvu",
    "selectPolygonLayerHintText": "Nápověda: Slouží k výběru polygonové vrstvy.",
    "selectRelatedPointLayerLabel": "Vyberte bodovou vrstvu přidruženou k polygonové vrstvě.",
    "selectRelatedPointLayerHintText": "Nápověda: Slouží k výběru bodové vrstvy přidružené k polygonové vrstvě.",
    "polygonLayerNotHavingRelatedLayer": "Vyberte polygonovou vrstvu, která má přidruženou bodovou vrstvu.",
    "errorInSelectingPolygonLayer": "Vyberte polygonovou vrstvu, která má přidruženou bodovou vrstvu.",
    "errorInSelectingRelatedLayer": "Vyberte bodovou vrstvu přidruženou k polygonové vrstvě."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Nastavení trasování",
    "routeServiceUrl": "Služba trasování",
    "buttonSet": "Nastavit",
    "routeServiceUrlHintText": "Nápověda: Klikněte na tlačítko Nastavit a zvolte službu trasování síťové analýzy.",
    "directionLengthUnit": "Jednotky délky směru",
    "unitsForRouteHintText": "Nápověda: Slouží k zobrazení hlášených jednotek trasy.",
    "selectRouteSymbol": "Vyberte symbol k zobrazení trasy.",
    "routeSymbolHintText": "Nápověda: Slouží k zobrazení liniového symbolu trasy.",
    "routingDisabledMsg": "Aby bylo možné používat navigaci, ujistěte se, že je v položce ArcGIS Online povoleno trasování.",
    "enableDirectionLabel": "Povolit navigaci",
    "enableDirectionText": "Nápověda: Zaškrtněte, abyste povolili navigaci ve widgetu"
  },
  "networkServiceChooser": {
    "arcgislabel": "Přidat z ArcGIS Online",
    "serviceURLabel": "Přidat URL služby",
    "routeURL": "URL trasy",
    "validateRouteURL": "Ověřit",
    "exampleText": "Příklad",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Zadejte platnou službu způsobu trasování.",
    "rateLimitExceeded": "Byl překročen limit přenosové rychlosti. Zkuste to prosím znovu.",
    "errorInvokingService": "Uživatelské jméno nebo heslo je nesprávné."
  },
  "symbolPickerPreviewText": "Náhled:",
  "showToolToSelectLabel": "Nastavit tlačítko polohy",
  "showToolToSelectHintText": "Nápověda: Umožňuje nastavit umístění na mapě pomocí tlačítka namísto nastavení umístění při každém kliknutí na mapu."
});