///////////////////////////////////////////////////////////////////////////
// Copyright ï¿½ Esri. All Rights Reserved.
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
  "_widgetLabel": "Скрининг",
  "geometryServicesNotFound": "Услугата за геометрия не е налична.",
  "unableToDrawBuffer": "Не може да се изтегли буфер. Моля, опитайте отново.",
  "invalidConfiguration": "Невалидна конфигурация.",
  "clearAOIButtonLabel": "Стартирането приключи",
  "noGraphicsShapefile": "Изтегленият шейп файл не съдържа графики.",
  "zoomToLocationTooltipText": "Мащабиране на местоположение",
  "noGraphicsToZoomMessage": "Не е намерена графика за увеличаване.",
  "placenameWidget": {
    "placenameLabel": "Търсене на местоположение"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Избор на режим изчертаване",
    "toggleSelectability": "Натиснете за превключване на възможност за избор",
    "chooseLayerTitle": "Изберете избираеми слоеве",
    "selectAllLayersText": "Избиране на всички",
    "layerSelectionWarningTooltip": "За създаване на AOI (област на интерес) трябва да бъде избран поне един слой",
    "selectToolLabel": "Избиране на инструмент"
  },
  "shapefileWidget": {
    "shapefileLabel": "Качете компресиран шейп файл",
    "uploadShapefileButtonText": "Качване",
    "unableToUploadShapefileMessage": "Не може да се качи шейп файл."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Определете начална точка",
    "addButtonTitle": "Добавяне",
    "deleteButtonTitle": "Изтриване",
    "mapTooltipForStartPoint": "Натиснете върху картата, за да определите начална точка",
    "mapTooltipForUpdateStartPoint": "Натиснете върху картата, за да обновите началната точка",
    "locateText": "Намерете",
    "locateByMapClickText": "Изберете начални координати",
    "enterBearingAndDistanceLabel": "Въведете ъгъл и разстояние от началната точка",
    "bearingTitle": "Ъгъл от известна посока",
    "distanceTitle": "Разстояние",
    "planSettingTooltip": "Настройки на план",
    "invalidLatLongMessage": "Моля, въведете валидни стойности."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Буферно разстояние (по избор)",
    "bufferInputLabel": "Показване на резултати в рамките на",
    "bufferDistanceLabel": "Буферно разстояние",
    "bufferUnitLabel": "Мерна единица за буфер"
  },
  "traverseSettings": {
    "bearingLabel": "Ъгъл от известна посока",
    "lengthLabel": "Дължина",
    "addButtonTitle": "Добавяне",
    "deleteButtonTitle": "Изтриване",
    "deleteBearingAndLengthLabel": "Премахване на редовете за ъгъл от известна посока и дължина",
    "addButtonLabel": "Добавяне на ъгъл от известна посока и дължина"
  },
  "planSettings": {
    "expandGridTooltipText": "Разгъване на мрежа",
    "collapseGridTooltipText": "Сгъване на мрежа",
    "directionUnitLabelText": "Мерна единица за посоки",
    "distanceUnitLabelText": "Разстояние и мерни единици за дължина",
    "planSettingsComingSoonText": "Предстои скоро"
  },
  "newTraverse": {
    "invalidBearingMessage": "Невалиден ъгъл от известна посока.",
    "invalidLengthMessage": "Невалидна дължина.",
    "negativeLengthMessage": "Отрицателна дължина"
  },
  "reportsTab": {
    "aoiAreaText": "AOI (област на интерес) област",
    "downloadButtonTooltip": "Изтегляне",
    "printButtonTooltip": "Печат",
    "uploadShapefileForAnalysisText": "Качете шейп фаил, за да го включите в анализа",
    "uploadShapefileForButtonText": "Зареждане",
    "downloadLabelText": "Избор на формат :",
    "downloadBtnText": "Изтегляне",
    "noDetailsAvailableText": "Няма намерени резултати",
    "featureCountText": "Брой",
    "featureAreaText": "Област",
    "featureLengthText": "Дължина",
    "attributeChooserTooltip": "Избиране на атрибути за показване",
    "csv": "CSV",
    "filegdb": "Файлова геобаза данни",
    "shapefile": "Шейп файл",
    "noFeaturesFound": "Няма намерен резултат за избран файлов формат",
    "selectReportFieldTitle": "Избор на полета",
    "noFieldsSelected": "Няма избрани полета",
    "intersectingFeatureExceedsMsgOnCompletion": "Достигнат е максималният брой записи за един или повече слоеве.",
    "unableToAnalyzeText": "Не може да се анализира, достигнат е максималният брой записи.",
    "errorInPrintingReport": "Не може да се отпечата отчета. Моля, проверете дали настройките на отчета са валидни.",
    "aoiInformationTitle": "Информация за област на интерес (AOI)",
    "summaryReportTitle": "Обобщение",
    "notApplicableText": "N/A",
    "downloadReportConfirmTitle": "Потвърждаване на изтеглянето",
    "downloadReportConfirmMessage": "Наистина ли искате да го изтеглите?",
    "noDataText": "Няма данни",
    "createReplicaFailedMessage": "Операцията за изтегляне не бе успешна за следващия слой(-еве) : <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "Неуспешна операция за изтегляне.",
    "printLayoutLabelText": "Оформление",
    "printBtnText": "Печат",
    "printDialogHint": "Забележка: Заглавието и коментарите на отчета могат да бъдат редактирани в предварителния преглед на отчета.",
    "unableToDownloadFileGDBText": "Файловата геобаза данни не може да се изтегли за област на интерес (AOI), съдържаща местоположения на точка или линия",
    "unableToDownloadShapefileText": "Шейп файлът не може да се изтегли за област на интерес (AOI), съдържаща местоположения на точка или линия",
    "analysisAreaUnitLabelText": "Показване на резултати за област в :",
    "analysisLengthUnitLabelText": "Показване на резултати за дължина в :",
    "analysisUnitButtonTooltip": "Изберете единици за анализ",
    "analysisCloseBtnText": "Затваряне",
    "areaSquareFeetUnit": "Квадратен фут",
    "areaAcresUnit": "Акри",
    "areaSquareMetersUnit": "Квадратни метри",
    "areaSquareKilometersUnit": "Квадратни километри",
    "areaHectaresUnit": "Хектари",
    "areaSquareMilesUnit": "Квадратни мили",
    "lengthFeetUnit": "Фут",
    "lengthMilesUnit": "Мили",
    "lengthMetersUnit": "Метри",
    "lengthKilometersUnit": "Километри",
    "hectaresAbbr": "хектари",
    "squareMilesAbbr": "Квадратни мили",
    "layerNotVisibleText": "Не може да се анализира. Слоят е изключен или е извън диапазона на видимост.",
    "refreshBtnTooltip": "Обновяване на отчет",
    "featureCSVAreaText": "Пресечна област",
    "featureCSVLengthText": "Пресечна дължина",
    "errorInFetchingPrintTask": "Грешка при извличане на информация за задачата за печат. Моля, опитайте отново.",
    "selectAllLabel": "Избиране на всички",
    "errorInLoadingProjectionModule": "Грешка при зареждане на зависимостите на проекционния модул. Моля, опитайте да изтеглите файла отново.",
    "expandCollapseIconLabel": "Пресечени обекти",
    "intersectedFeatureLabel": "Пресечен детайл на обекта",
    "valueAriaLabel": "Стойност",
    "countAriaLabel": "Брой",
    "layerNameWithFeatureCount": "${layerName} слой с ${featureCount} пресичащи се обекти",
    "sortingSettingsLegend": "Настройки за сортиране",
    "ascendingLabel": "Възходящ",
    "descendingLabel": "Низходящ",
    "sortFieldSelectLabel": "Избор на поле за сортиране",
    "errorLabel": "При сървъра възникна временна грешка и не можа да завърши заявката.",
    "statisticsCountLabel": "Статистика: Преброяване",
    "statisticsTotalLengthLabel": "Статистика: Обща дължина",
    "statisticsTotalAreaLabel": "Статистика: Общо област",
    "timedOutErrorLabel": "Времето на сървъра изтече",
    "sortHint": "Указание: Избраните полета се сортират само когато броят на обектите/групите е по-голям от 1."
  }
});