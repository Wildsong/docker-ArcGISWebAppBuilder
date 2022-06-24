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
    "miles": "Мили",
    "kilometers": "Километри",
    "feet": "Фута",
    "meters": "Метри"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Настройки за търсене",
    "buttonSet": "Настройване",
    "selectLayersLabel": "Изберете слой",
    "selectLayersHintText": "Съвет: Използва се за избор на полигонов слой и свързания с него точков слой.",
    "selectPrecinctSymbolLabel": "Изберете символ за маркиране на полигон",
    "selectGraphicLocationSymbol": "Адрес или местоположение на символ",
    "graphicLocationSymbolHintText": "Съвет: Символ за търсен адрес или кликнато местоположение",
    "precinctSymbolHintText": "Съвет: Използва се за показване на символ за избран полигон",
    "selectColorForPoint": "Изберете цвят за маркиране на точка",
    "selectColorForPointHintText": "Съвет: Използва се за показване на цвета на маркиране за избраната точка"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Настройки на източник на търсене",
    "searchSourceSettingTitle": "Настройки на източник на търсене",
    "searchSourceSettingTitleHintText": "Добавете и конфигурирайте услуги за геокодиране или обектни слоеве като източници на търсене. Тези посочени източници определят какво може да се търси в полето за търсене",
    "addSearchSourceLabel": "Добавяне на източник за търсене",
    "featureLayerLabel": "Обектен слой",
    "geocoderLabel": "Геокодер",
    "nameTitle": "Име",
    "generalSettingLabel": "Общи настройки",
    "allPlaceholderLabel": "Алтернативен текст за търсене във всички:",
    "allPlaceholderHintText": "Съвет: Въведете текст, който да се показва като алтернативен, докато търсите във всички слоеве и геокодер",
    "generalSettingCheckboxLabel": "Показване на изскачащи прозорци за намерените обекти или местоположения",
    "countryCode": "Код (-ове) на държава или район",
    "countryCodeEg": "напр. ",
    "countryCodeHint": "Ако оставите тази стойност празна, ще търсите във всички държави и райони.",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Търсене само в обхвата на текущата карта",
    "zoomScale": "Мащаб за зумиране",
    "locatorUrl": "URL адрес на геокодер",
    "locatorName": "Име на геокодер",
    "locatorExample": "Пример",
    "locatorWarning": "Тази версия на услугата за геокодиране не се поддържа. Изпълнимият модул поддържа услуга за геокодиране с версия 10.0 и по-нова.",
    "locatorTips": "Предложенията не са налични, тъй като услугата за геокодиране не поддържа възможността за предлагане.",
    "layerSource": "Източник на слой",
    "setLayerSource": "Задаване на източник на слой",
    "setGeocoderURL": "Задаване на URL адрес на геокодер",
    "searchLayerTips": "Предложенията не са налични, тъй като услугата за обекти не поддържа възможност за разбиване на страници.",
    "placeholder": "Алтернативен текст",
    "searchFields": "Полета за търсене",
    "displayField": "Поле за показване",
    "exactMatch": "Точно съвпадение",
    "maxSuggestions": "Максимален брой предложения",
    "maxResults": "Максимален брой резултати",
    "enableLocalSearch": "Активиране на локално търсене",
    "minScale": "Минимално мащабиране",
    "minScaleHint": "Когато мащабът на картата е по-голям от този мащаб, ще се приложи локално търсене",
    "radius": "Радиус",
    "radiusHint": "Задава радиус на област около текущия център на картата, която се използва за повишаване на ранга на кандидатите за геокодиране, така че кандидатите, най-близки до местоположението, да бъдат върнати първи",
    "meters": "Метри",
    "setSearchFields": "Задаване на полета за търсене",
    "set": "Настройване",
    "fieldName": "Име",
    "invalidUrlTip": "URL адресът ${URL} е невалиден или е недостъпен.",
    "invalidSearchSources": "Настройките на източника на търсене са невалидни",
    "errorMessageLabel": "Съобщение за грешка",
    "errorMessageHint": "Съвет: Задайте съобщение, което да се показва, когато няма намерени резултати",
    "noPrecinctFoundMsg": "Няма намерен полигон за този адрес или местоположение"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Изберете полигонов слой",
    "selectPolygonLayerHintText": "Съвет: Използва се за избор на полигонов слой.",
    "selectRelatedPointLayerLabel": "Изберете точков слой, свързан с полигонов слой",
    "selectRelatedPointLayerHintText": "Съвет: Използва се за избор на точков слой, свързан с полигонов слой",
    "polygonLayerNotHavingRelatedLayer": "Моля, изберете полигонов слой,към който има свързан точков слой.",
    "errorInSelectingPolygonLayer": "Моля, изберете полигонов слой, който има свързан точков слой.",
    "errorInSelectingRelatedLayer": "Моля, изберете точков слой, свързан с полигонов слой."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Настройка на посоки",
    "routeServiceUrl": "Услуга за маршрутизиране",
    "buttonSet": "Настройване",
    "routeServiceUrlHintText": "Съвет: Кликнете върху „Set“, за да прегледате и изберете услуга за маршрутизиране на мрежов анализ",
    "directionLengthUnit": "Единици за дължина на посоката",
    "unitsForRouteHintText": "Съвет: Използва се за показване на отчетени единици за маршрут",
    "selectRouteSymbol": "Избор на символ за индикиране на маршрут",
    "routeSymbolHintText": "Съвет: Използва се за показване на символа на линията на маршрута",
    "routingDisabledMsg": "За да активирате посоки, уверете се, че маршрутизацията е активирана в елемента ArcGIS Online.",
    "enableDirectionLabel": "Активиране на посоки",
    "enableDirectionText": "Съвет: Поставете отметка, за да активирате посоките в изпълнимия модул"
  },
  "networkServiceChooser": {
    "arcgislabel": "Добавете от ArcGIS Online",
    "serviceURLabel": "Добавете URL адрес на услугата",
    "routeURL": "Добавете URL адрес на маршрута",
    "validateRouteURL": "Валидиране",
    "exampleText": "Пример",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Моля, посочете валидна услуга за маршрут.",
    "rateLimitExceeded": "Превишен лимит на тарифата. Моля, опитайте отново по-късно.",
    "errorInvokingService": "Потребителското име или паролата не са правилни."
  },
  "symbolPickerPreviewText": "Предварителен преглед:",
  "showToolToSelectLabel": "Задаване на бутон за местоположение",
  "showToolToSelectHintText": "Съвет: Предоставя бутон за задаване на местоположение на картата, вместо винаги да задава местоположението, когато картата е кликната"
});