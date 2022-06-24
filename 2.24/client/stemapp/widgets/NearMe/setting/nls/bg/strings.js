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
      "displayText": "Мили",
      "acronym": "миля"
    },
    "kilometers": {
      "displayText": "Километри",
      "acronym": "км"
    },
    "feet": {
      "displayText": "Фута",
      "acronym": "фут"
    },
    "meters": {
      "displayText": "Метри",
      "acronym": "м"
    }
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Настройки на източник на търсене",
    "searchSourceSettingTitle": "Настройки на източник на търсене",
    "searchSourceSettingTitleHintText": "Добавете и конфигурирайте услуги за геокодиране или слоеве на обекти като източници на търсене. Тези посочени източници определят какво може да се търси в полето за търсене",
    "addSearchSourceLabel": "Добавяне на източник за търсене",
    "featureLayerLabel": "Обектен слой",
    "geocoderLabel": "Геокодер",
    "nameTitle": "Име",
    "generalSettingLabel": "Общи настройки",
    "allPlaceholderLabel": "Текст на заместител за търсене във всички:",
    "allPlaceholderHintText": "Съвет: Въведете текст, който да се показва като заместител, докато търсите във всички слоеве и геокодер",
    "generalSettingCheckboxLabel": "Показване на изскачащи прозорци за намерените обекти или местоположения",
    "countryCode": "Код (-ове) на държава или район",
    "countryCodeEg": "вкл. ",
    "countryCodeHint": "Ако оставите тази стойност празна, ще търсите във всички държави и райони.",
    "searchInCurrentMapExtent": "Търсене само в ограничаващия правоъгълник на текущата карта",
    "zoomScale": "Мащаб на зуум",
    "locatorUrl": "URL адрес на геокодер",
    "locatorName": "Име на геокодер",
    "locatorExample": "Пример",
    "locatorWarning": "Тази версия на услугата за геокодиране не се поддържа. Изпълнимият модул поддържа услуга за геокодиране с версия 10.0 или по-нова.",
    "locatorTips": "Предложенията не са налични, тъй като услугата за геокодиране не поддържа възможността за предлагане.",
    "layerSource": "Източник на слой",
    "setLayerSource": "Задаване на източник на слой",
    "setGeocoderURL": "Задаване на URL адрес на геокодер",
    "searchLayerTips": "Предложенията не са налични, тъй като услугата за обекти не поддържа възможност за разбиване на страници.",
    "placeholder": "Алтернативен текст",
    "searchFields": "Полета за търсене",
    "displayField": "Покажи поле",
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
    "invalidUrlTip": "URL адресът ${URL} е невалиден или е недостъпен."
  },
  "searchSetting": {
    "searchSettingTabTitle": "Настройки за търсене",
    "defaultBufferDistanceLabel": "Задаване на стандартно буферно разстояние",
    "maxResultCountLabel": "Ограничен брой резултати",
    "maxResultCountHintLabel": "Съвет: Задайте максимален брой на видимите резултати. Стойността на 1 ще върне най-близкия обект.",
    "maxBufferDistanceLabel": "Задаване на максимално буферно разстояние",
    "bufferDistanceUnitLabel": "Единици за буферно разстояние",
    "defaultBufferHintLabel": "Съвет: Задайте стойност по подразбиране на слайдер на буфер",
    "maxBufferHintLabel": "Съвет: Задайте максимална стойност за слайдер на буфер",
    "bufferUnitLabel": "Съвет: Определете единица за създаване на буфер",
    "selectGraphicLocationSymbol": "Адрес или местоположение на символ",
    "graphicLocationSymbolHintText": "Съвет: Символ за търсен адрес или натиснато местоположение",
    "addressLocationPolygonHintText": "Съвет: Символ за потвърден полигонен слой, конфигуриран за използване при приблизително търсене.",
    "popupTitleForPolygon": "Избор на полигон за избран адрес на местоположение",
    "popupTitleForPolyline": "Избор на линия за адрес на местоположение",
    "addressLocationPolylineHintText": "Съвет: Символ за полилинеен слой, конфигуриран за използване при приблизително търсене.",
    "fontColorLabel": "Избор на цвят на шрифт за резултати от търсенето",
    "fontColorHintText": "Съвет: Цвят на шрифт за резултати от търсенето",
    "highlightColorLabel": "Задаване на цвят за избор",
    "highlightColorHintText": "Съвет: цвят за избор",
    "zoomToSelectedFeature": "Приближаване към избрания обект",
    "zoomToSelectedFeatureHintText": "Съвет: Приближаване към избрания обект вместо към буфера",
    "intersectSearchLocation": "Връще на пресечен (-и) полигон (-и)",
    "intersectSearchLocationHintText": "Съвет: Връща се полигон (-и), съдържащ (-и) търсеното местоположение, а не полигони в буфера",
    "enableProximitySearch": "Активиране на приблизително търсене",
    "enableProximitySearchHintText": "Съвет: Активирайте възможността за търсене на местоположения в близост до избран резултат",
    "bufferVisibilityLabel": "Задаване на видимост на буфера",
    "bufferVisibilityHintText": "Съвет: Буферът ще бъде показан на картата",
    "bufferColorLabel": "Настройване на символ на буфер",
    "bufferColorHintText": "Съвет: Изберете цвят и прозрачност на буфера",
    "searchLayerResultLabel": "Извличане само на резултатите от избрания слой",
    "searchLayerResultHint": "Съвет: Само избраният слой в резултатите от търсенето ще се начертае на картата",
    "showToolToSelectLabel": "Бутон за задаване на местоположение",
    "showToolToSelectHintText": "Съвет: Предоставя бутон за задаване на местоположение на картата, вместо винаги да задава местоположението, когато сте натиснали върху картата",
    "geoDesicParamLabel": "Използване на геодезичен буфер",
    "geoDesicParamHintText": "Съвет: Използвайте геодезичен буфер вместо Евклидов буфер (равнинен)",
    "showImageGalleryLabel": "Показване на галерията с изображения",
    "showImageGalleryHint": "Съвет: Ако квадратчето е маркирано, галерията с изображения се показва в панела с изпълними модули, в противен случай ще се скрие",
    "showResultCountOfLayerLabel": "Показване на броя резултати от търсене за всеки слой",
    "showAllLayers": "Показване на резултати за всички конфигурирани слоеве, независимо от състоянието им на видимост",
    "showAllLayersHint": "Съвет: Тази опция ще активира видимостта на всички конфигурирани слоеве и ще върне резултати от търсенето, когато са изключени в уеб картата или по време на изпълнение с помощта на изпълнимия модул за Списък със слоеве.",
    "showResultCountOfLayerHint": "Съвет: Показва броя на резултатите от търсене след името на всеки слой",
    "editDescription": "Въвеждащ текст",
    "editDescriptionTip": "Текстът, който се показва над полето за търсене в изпълнимия модул.",
    "noResultsFound": "Съобщение, когато няма намерени резултати",
    "noResultFoundHint": "Съвет: Настройте съобщение, което да се показва, когато в областта за търсене няма намерени резултати",
    "noFeatureFoundText": "Няма намерени резултати ",
    "searchHeaderText": "Потърсете адрес или локализирайте на картата",
    "setCurrentLocationLabel": "Бутон за настройване на текущо местоположение",
    "setCurrentLocationHintText": "Съвет: Предоставете бутон за използване на текущото местоположение на потребителя",
    "bufferDistanceSliderLabel": "Слайдер за буферно разстояние",
    "bufferDistanceTextboxLabel": "Текстово поле на буфер",
    "bufferDistanceSliderandTextboxLabel": "Слайдер за буферно разстояние и текстово поле",
    "bufferItemOptionLegend": "Опции за входни данни на буфер"
  },
  "layerSelector": {
    "selectLayerLabel": "Избор на слой (-ве) за търсене",
    "layerSelectionHint": "Съвет: Използвайте бутона за настройка за избор на слой (-ве)",
    "addLayerButton": "Настройване"
  },
  "routeSetting": {
    "routeSettingTabTitle": "Настройки на посоки",
    "routeServiceUrl": "Услуга за маршрутизиране",
    "buttonSet": "Настройване",
    "routeServiceUrlHintText": "Съвет: Натиснете върху „Set“, за да прегледате и изберете услуга за маршрутизиране",
    "directionLengthUnit": "Единици за дължина на посоката",
    "unitsForRouteHintText": "Съвет: Използва се за показване на мерни единици за маршрут",
    "selectRouteSymbol": "Избор на символ за индикиране на маршрут",
    "routeSymbolHintText": "Съвет: Използва се за показване на символа на линията на маршрута",
    "routingDisabledMsg": "За да активирате посоката, уверете се, че маршрутизирането е разрешено за елемента в настройките на приложението.",
    "enableDirectionLabel": "Активиране на посоки",
    "enableDirectionText": "Съвет: Поставете отметка, за да активирате посоките в изпълнимия модул"
  },
  "symbologySetting": {
    "symbologySettingTabTitle": "Настройки за симвология",
    "addSymbologyBtnLabel": "Добавяне на нови символи",
    "layerNameTitle": "Име на слой",
    "fieldTitle": "Поле",
    "valuesTitle": "Стойности",
    "symbolTitle": "Символ",
    "actionsTitle": "Действия",
    "invalidConfigMsg": "Дублиран обект: ${fieldName} за слой : ${layerName}"
  },
  "filterSetting": {
    "filterSettingTabTitle": "Настройки на филтър",
    "addTaskTip": "Добавете един или повече филтри към избрания (-те) слой (-ве) за търсене и конфигурирайте параметрите за всеки от тях.",
    "enableMapFilter": "Премахнете филтъра за предварително зададен слой от картата.",
    "newFilter": "Нов филтър",
    "filterExpression": "Израз на филтър",
    "layerDefaultSymbolTip": "Използвайте символа по подразбиране на слоя",
    "uploadImage": "Качване на изображение",
    "selectLayerTip": "Моля, изберете слой.",
    "setTitleTip": "Моля, изберете заглавие",
    "noTasksTip": "Няма конфигурирани филтри. Натиснете върху „${newFilter}“ , за да добавите нов.",
    "collapseFiltersTip": "Свиване на изразите на филтъра (ако има такива) при отваряне на изпълнимия модул",
    "groupFiltersTip": "Групиране на филтрите по слой",
    "infoTab": "Информация",
    "expressionsTab": "Изрази",
    "optionsTab": "Опции",
    "autoApplyWhenWidgetOpen": "Приложете този филтър, когато изпълнимият модул е отворен.",
    "expandFiltersOnLoad": "Разширяване на филтрите при зареждане на изпълнимия модул"
  },
  "networkServiceChooser": {
    "arcgislabel": "Добавете от ArcGIS Online",
    "serviceURLabel": "Добавете URL адрес на услугата",
    "routeURL": "URL адрес на маршрута",
    "validateRouteURL": "Валидиране",
    "exampleText": "Пример",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Моля, посочете валидна услуга за маршрут.",
    "rateLimitExceeded": "Превишен лимит за скорост. Моля, опитайте отново по-късно.",
    "errorInvokingService": "Потребителското име или паролата не са правилни."
  },
  "errorStrings": {
    "bufferErrorString": "Моля, въведете вярна цифрова стойност.",
    "selectLayerErrorString": "Моля, изберете слой (-ве) за търсене.",
    "invalidDefaultValue": "Полето за стандартно буферно разстояние не може да бъде празно. Моля, посочете буферно разстояние",
    "invalidMaximumValue": "Полето за максимално буферно разстояние не може да бъде празно. Моля, посочете буферно разстояние",
    "defaultValueLessThanMax": "Моля, посочете стандартното буферно разстояние в рамките на максималния лимит",
    "defaultBufferValueGreaterThanOne": "Стандартото буферно разстояние не може да бъде по-малко от 0",
    "maximumBufferValueGreaterThanOne": "Моля, посочете максимално буферно разстояние, по-голяма от 0",
    "invalidMaximumResultCountValue": "Моля, посочете валидна стойност за максимален брой резултати",
    "invalidSearchSources": "Невалидни настройки на източника за търсене"
  },
  "symbolPickerPreviewText": "Предварителен преглед:"
});