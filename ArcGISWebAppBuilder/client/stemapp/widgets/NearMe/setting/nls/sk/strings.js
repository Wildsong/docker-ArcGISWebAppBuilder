/*global define*/
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
    "miles": {
      "displayText": "Míle",
      "acronym": "mi"
    },
    "kilometers": {
      "displayText": "Kilometre",
      "acronym": "km"
    },
    "feet": {
      "displayText": "Stopy",
      "acronym": "ft"
    },
    "meters": {
      "displayText": "Metre",
      "acronym": "m"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Nastavenia zdroja vyhľadávania",
    "searchSourceSettingTitle": "Nastavenia zdroja vyhľadávania",
    "searchSourceSettingTitleHintText": "Pridať a konfigurovať geokódovaciu službu alebo vrstvy prvkov ako zdroje vyhľadávania. Tieto špecifikované zdroje určujú, čo sa dá vyhľadávať v rámci vyhľadávacieho poľa",
    "addSearchSourceLabel": "Pridať zdroj vyhľadávania",
    "featureLayerLabel": "Vektorová vrstva",
    "geocoderLabel": "Geokodér",
    "nameTitle": "Meno",
    "generalSettingLabel": "Všeobecné nastavenie",
    "allPlaceholderLabel": "Zástupný text pre vyhľadávanie vo všetkých zdrojoch:",
    "allPlaceholderHintText": "Pomôcka: Pri vyhľadávaní vo všetkých vrstvách a geokodéroch zadajte text, ktorý sa má zobraziť ako zástupný text",
    "generalSettingCheckboxLabel": "Zobraziť kontextové okno pre nájdený prvok alebo umiestnenie",
    "countryCode": "Kód(y) krajiny alebo regiónu",
    "countryCodeEg": "napr. ",
    "countryCodeHint": "Ak ponecháte túto hodnotu prázdnu, bude sa vyhľadávať vo všetkých krajinách a regiónoch",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Vyhľadávať iba v aktuálnom rozsahu mapy",
    "zoomScale": "Mierka priblíženia",
    "locatorUrl": "URL geokodéra",
    "locatorName": "Názov geokodéra",
    "locatorExample": "Príklad",
    "locatorWarning": "Táto verzia geokódovacej služby nie je podporovaná. Widget podporuje geokódovaciu službu 10.0 a vyššiu.",
    "locatorTips": "Návrhy nie sú k dipozícii, pretože geokódovacia služba nepodporuje možnosť návrhov.",
    "layerSource": "Zdroj vrstvy",
    "setLayerSource": "Nastaviť zdroj vrstvy",
    "setGeocoderURL": "Nastaviť URL geokodéru",
    "searchLayerTips": "Návrhy nie sú k dispozícii, pretože služba pre prvky nepodporuje stránkovanie.",
    "placeholder": "Zástupný text",
    "searchFields": "Vyhľadávacie polia",
    "displayField": "Zobraziť polia",
    "exactMatch": "Presná zhoda",
    "maxSuggestions": "Maximum návrhov",
    "maxResults": "Maximum výsledkov",
    "enableLocalSearch": "Aktivovať lokálne vyhľadávanie",
    "minScale": "Minimálna mierka",
    "minScaleHint": "Keď je mierka mapy väčšia, než táto mierka, použije sa lokálne vyhľadávanie",
    "radius": "Polomer",
    "radiusHint": "Určuje polomer oblasti okolo aktuálneho stredu mapy, ktorý sa používa na zvýšenie poradia kandidátov na geokódovanie, aby sa kandidátske záznamy najbližšie k umiestneniu vrátili ako prvé.",
    "meters": "Metre",
    "setSearchFields": "Nastaviť polia vyhľadávania",
    "set": "Nastaviť",
    "fieldName": "Meno",
    "invalidUrlTip": "URL ${URL} je neplatná alebo nedostupná."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Nastavenia vyhľadávania",
    "defaultBufferDistanceLabel": "Nastaviť predvolenú šírku obalovej zóny",
    "maxResultCountLabel": "Obmedziť počet výsledkov",
    "maxResultCountHintLabel": "Tip: Nastavte maximálny počet viditeľných výsledkov. Hodnota 1 vráti najbližší prvok",
    "maxBufferDistanceLabel": "Nastaviť maximálnu šírku obalovej zóny",
    "bufferDistanceUnitLabel": "Jednotky šírky obalovej zóny",
    "defaultBufferHintLabel": "Tip: Nastavte predvolenú hodnotu pre posuvník obalovej zóny",
    "maxBufferHintLabel": "Tip: Nastavte maximálnu hodnotu pre posuvník obalovej zóny",
    "bufferUnitLabel": "Tip: Definujte jednotku pre vytvorenie obalovej zóny",
    "selectGraphicLocationSymbol": "Symbol adresy alebo umiestnenia",
    "graphicLocationSymbolHintText": "Pomôcka: Symbol pre hľadanú adresu alebo kliknuté umiestnenie",
    "addressLocationPolygonHintText": "Tip: Symbol pre polygónovú vrstvu nakonfigurovanú na použitie vo výhľadávaní vzdialenosti.",
    "popupTitleForPolygon": "Zvoľte polygón pre zvolené umiestnenie adresy",
    "popupTitleForPolyline": "Zvoľte líniu pre umiestnenie adresy",
    "addressLocationPolylineHintText": "Tip: Symbol pre lomenú čiaru konfigurovanú na použitie vo vyhľadávaní vzdialenosti.",
    "fontColorLabel": "Zvoľte farbu písma pre výsledky vyhľadávania",
    "fontColorHintText": "Tip: Farba písma výsledkov vyhľadávania",
    "highlightColorLabel": "Nastavte farbu výberu",
    "highlightColorHintText": "Tip: Farba výberu",
    "zoomToSelectedFeature": "Priblíženie k zvolenému prvku",
    "zoomToSelectedFeatureHintText": "Tip: Priblížte k zvolenému prvku namiesto k obalovej zóne",
    "intersectSearchLocation": "Vrátiť pretínajúce sa polygóny",
    "intersectSearchLocationHintText": "Tip: Vrátiť polygón(y) obsahujúce hľadané umiestnenie namiesto polygónov v rámci obalovej zóny",
    "enableProximitySearch": "Povoliť vyhľadávanie v blízkosti",
    "enableProximitySearchHintText": "Tip: Povoliť možnosť vyhľadávania umiestnení v blízkosti zvoleného výsledku",
    "bufferVisibilityLabel": "Nastaviť viditeľnosť obalovej zóny",
    "bufferVisibilityHintText": "Tip: Obalová zóna bude zobrazená v mape",
    "bufferColorLabel": "Nastavte symbol obalovej zóny",
    "bufferColorHintText": "Tip: Zvoľte farbu a priehľadnosť obalovej zóny",
    "searchLayerResultLabel": "Nakresliť len výsledky zvolenej vrstvy",
    "searchLayerResultHint": "Tip: Na mape sa vykreslia len výsledky vyhľadávania zo zvolenej vrstvy",
    "showToolToSelectLabel": "Nastaviť tlačidlo umiestnenia",
    "showToolToSelectHintText": "Tip: Poskytuje tlačidlo na nastavenie umiestnenia na mape namiesto nastavenia umiestnenia vždy po kliknutí na mapu",
    "geoDesicParamLabel": "Použiť geodetickú obalovú zónu",
    "geoDesicParamHintText": "Tip: Použiť geodetickú obalovú zónu namiesto Euklidovskej obalovej zóny (rovinné)",
    "showImageGalleryLabel": "Zobraziť galériu obrázkov",
    "showImageGalleryHint": "Tip: Zobraziť galériu obrázkov vo widget paneli ak je začiarkavacie políčko začiarknuté, inak bude skrytá",
    "showResultCountOfLayerLabel": "Zobraziť počet výsledkov vyhľadávania pre každú vrstvu",
    "showResultCountOfLayerHint": "Tip: Zobraziť počet výsledkov vyhľadávania po každom mene vrstvy",
    "editDescription": "Úvodný text",
    "editDescriptionTip": "Text zobrazený vo widgete nad políčkom vyhľadávania.",
    "noResultsFound": "Správa, keď neboli nájdené žiadne výsledky",
    "noResultFoundHint": "Tip: Nastaviť správu na zobrazenie, keď neboli nájdené žiadne výsledky v rámci hľadanej oblasti",
    "noFeatureFoundText": "Neboli nájdené žiadne výsledky ",
    "searchHeaderText": "Vyhľadajte adresu alebo ju lokalizujte na mape",
    "setCurrentLocationLabel": "Nastaviť tlačidlo súčasnej polohy",
    "setCurrentLocationHintText": "Tip: Poskytnúť tlačidlo na použitie súčasnej polohy užívateľa",
    "bufferDistanceSliderLabel": "Posuvník šírky obalovej zóny",
    "bufferDistanceTextboxLabel": "Políčko textu obalovej zóny",
    "bufferDistanceSliderandTextboxLabel": "Posuvník obalovej vzdialenosti a políčko textu",
    "bufferItemOptionLegend": "Možnosti vstupu mapovej anotácie"
  },
  "layerSelector": {
    "selectLayerLabel": "Zvoliť vrstvy vyhľadávania",
    "layerSelectionHint": "Tip: Použiť tlačidlo nastavenia na zvolenie vrstvy(iev)",
    "addLayerButton": "Nastaviť"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Nastavenia navigácie",
    "routeServiceUrl": "Trasovacia služba",
    "buttonSet": "Nastaviť",
    "routeServiceUrlHintText": "Tip: Kliknite na â€˜Setâ€™ na prehľadávanie a voľbu trasovacej služby",
    "directionLengthUnit": "Jednotky dĺžky pre navigáciu",
    "unitsForRouteHintText": "Tip: Použité na zobrazenie jednotiek trasy",
    "selectRouteSymbol": "Vybrať symbol na zobrazenie trasy",
    "routeSymbolHintText": "Pomôcka: Používa sa na zobrazenie líniového symbolu trasy",
    "routingDisabledMsg": "Na povolenie navigácie sa uistite, že trasovanie položky je povolené v nastaveniach aplikácie.",
    "enableDirectionLabel": "Povoliť navigačné inštrukcie",
    "enableDirectionText": "Pomôcka: Zaškrtnite pre povolenie navigačných inštrukcií vo widgete"
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Nastavenia symboliky",
    "addSymbologyBtnLabel": "Pridať nové symboly",
    "layerNameTitle": "Názov vrstvy",
    "fieldTitle": "Pole",
    "valuesTitle": "Hodnoty",
    "symbolTitle": "Symbol",
    "actionsTitle": "Akcie",
    "invalidConfigMsg": "Duplikovať stĺpec: ${fieldName} pre vrstvu : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Nastavenia filtra",
    "addTaskTip": "Pridať jeden alebo viac filtrov pre zvolenú vrstvu(y) vyhľadávania a konfigurovať parametre pre každú z nich.",
    "enableMapFilter": "Odstrániť z mapy prednastavený filter vrstvy.",
    "newFilter": "Nový filter",
    "filterExpression": "Výraz filtra",
    "layerDefaultSymbolTip": "Použiť predvolený symbol vrstvy",
    "uploadImage": "Nahrať obrázok",
    "selectLayerTip": "Vyberte vrstvu.",
    "setTitleTip": "Prosím nastavte názov.",
    "noTasksTip": "Žiadne konfigurované filtre. Kliknite na \"${newFilter}\" pre pridanie nového filtra.",
    "collapseFiltersTip": "Zbaliť výrazy filtra (ak existujú) keď je widget otvorený.",
    "groupFiltersTip": "Zoskupiť filtre podľa vrstvy",
    "infoTab": "Informácie",
    "expressionsTab": "Výrazy",
    "optionsTab": "Možnosti",
    "autoApplyWhenWidgetOpen": "Použiť tento filter keď je widget otvorený",
    "expandFiltersOnLoad": "Rožšíriť filtre na načítanie widgetu"
  },
  "networkServiceChooser": {
    "arcgislabel": "Pridať z ArcGIS Online",
    "serviceURLabel": "Pridať URL služby",
    "routeURL": "URL trasy",
    "validateRouteURL": "Overiť",
    "exampleText": "Príklad",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Zadajte platnú službu trasovania.",
    "rateLimitExceeded": "Prekročený limit sadzby Skúste to neskôr, prosím.",
    "errorInvokingService": "Používateľské meno alebo heslo je nesprávne."
  },
  "errorStrings": {
    "bufferErrorString": "Prosím zadajte platnú číselnú hodnotu.",
    "selectLayerErrorString": "Prosím zvoľte vrstvu(y) na vyhľadávanie.",
    "invalidDefaultValue": "Predvolená šírka obalovej zóny nesmie byť prázdna Prosím zadajte šírku obalovej zóny",
    "invalidMaximumValue": "Maximálna šírka obalovej zóny nesmie byť prázdna Prosím zadajte šírku obalovej zóny",
    "defaultValueLessThanMax": "Prosím zadajte predvolenú šírku obalovej zóny v rámci maximálneho limitu",
    "defaultBufferValueGreaterThanOne": "Predvolená šírka obalovej zóny nesmie byť menej ako 0",
    "maximumBufferValueGreaterThanOne": "Prosím zadajte maximálnu šírku obalovej zóny väčšiu ako 0",
    "invalidMaximumResultCountValue": "Prosím zadajte platnú hodnotu pre maximálny pošet výsledkov",
    "invalidSearchSources": "Neplatné nastavenia zdroja vyhľadávania"
  },
  "symbolPickerPreviewText": "Náhľad:"
});