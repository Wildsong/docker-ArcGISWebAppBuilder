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
    "miles": "Míle",
    "kilometers": "Kilometre",
    "feet": "Stopy",
    "meters": "Metre"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Nastavenia vyhľadávania",
    "buttonSet": "Nastaviť",
    "selectLayersLabel": "Vybrať vrstvu",
    "selectLayersHintText": "Pomôcka: Používa sa na výber polygónovej vrstvy a súvisiacej bodovej vrstvy.",
    "selectPrecinctSymbolLabel": "Vybrať symbol pre zvýraznenie polygónu",
    "selectGraphicLocationSymbol": "Symbol adresy alebo umiestnenia",
    "graphicLocationSymbolHintText": "Pomôcka: Symbol pre hľadanú adresu alebo kliknuté umiestnenie",
    "precinctSymbolHintText": "Pomôcka: Používa sa na zobrazenie symbolu pre vybraný polygón",
    "selectColorForPoint": "Vybrať farbu pre zvýraznenie bodu",
    "selectColorForPointHintText": "Pomôcka: Používa sa na zobraznie farby zvýraznenia pre vybraný bod"
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
    "enableLocalSearch": "Aktivovať lokálnu službu",
    "minScale": "Minimálna mierka",
    "minScaleHint": "Keď je mierka mapy väčšia, než táto mierka, vykoná sa lokálne vyhľadávanie",
    "radius": "Polomer",
    "radiusHint": "Určuje polomer oblasti okolo aktuálneho stredu mapy, ktorý sa používa na zvýšenie poradia kandidátov na geokódovanie, aby sa kandidátske záznamy najbližšie k umiestneniu vrátili ako prvé.",
    "meters": "Metre",
    "setSearchFields": "Nastaviť polia vyhľadávania",
    "set": "Nastaviť",
    "fieldName": "Meno",
    "invalidUrlTip": "URL ${URL} je neplatná alebo nedostupná.",
    "invalidSearchSources": "Neplatné nastavenia zdroja vyhľadávania"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Vybrať vrstvu polygónu",
    "selectPolygonLayerHintText": "Pomôcka: Používa sa na výber polygónovej vrstvy.",
    "selectRelatedPointLayerLabel": "Vybrať bodovú vrstvu súvisiacu s polygónovou vrstvou",
    "selectRelatedPointLayerHintText": "Pomôcka: Používa sa na výber bodovej vrstvy súvisiacej s polygónovou vrstvou",
    "polygonLayerNotHavingRelatedLayer": "Vyberte polygónovú vrstvu, ktorá má súvisiacu bodovú vrstvu.",
    "errorInSelectingPolygonLayer": "Vyberte polygónovú vrstvu, ktorá má súvisiacu bodovú vrstvu.",
    "errorInSelectingRelatedLayer": "Vyberte bodovú vrstvu súvisiacu s polygónovou vrstvou."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Nastavenia navigácie",
    "routeServiceUrl": "Trasovacia služba",
    "buttonSet": "Nastaviť",
    "routeServiceUrlHintText": "Pomôcka: Kliknutím na tlačidlo „Nastaviť“ prehľadajte a vyberte trasovacia službu analýzy siete",
    "directionLengthUnit": "Jednotky dĺžky pre navigáciu",
    "unitsForRouteHintText": "Pomôcka: Používa sa na zobrazenie hlásených jednotiek pre trasu",
    "selectRouteSymbol": "Vybrať symbol na zobrazenie trasy",
    "routeSymbolHintText": "Pomôcka: Používa sa na zobrazenie líniového symbolu trasy",
    "routingDisabledMsg": "Ak chcete povoliť navigáciu, uistite sa, že v položke ArcGIS Online je povolená navigácia.",
    "enableDirectionLabel": "Povoliť navigačné inštrukcie",
    "enableDirectionText": "Pomôcka: Zaškrtnite pre povolenie navigačných inštrukcií vo widgete"
  },
  "networkServiceChooser": {
    "arcgislabel": "Pridať z ArcGIS Online",
    "serviceURLabel": "Pridať URL služby",
    "routeURL": "URL trasy",
    "validateRouteURL": "Potvrdiť",
    "exampleText": "Príklad",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Zadajte platnú službu trasovania.",
    "rateLimitExceeded": "Prekročený limit sadzby Skúste to neskôr, prosím.",
    "errorInvokingService": "Používateľské meno alebo heslo je nesprávne."
  },
  "symbolPickerPreviewText": "Náhľad:",
  "showToolToSelectLabel": "Nastaviť tlačidlo umiestnenia",
  "showToolToSelectHintText": "Pomôcka: Poskytuje tlačidlo na nastavenie umiestnenia na mape namiesto nastavenia umiestnenia vždy po kliknutí na mapu"
});