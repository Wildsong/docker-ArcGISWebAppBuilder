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
  "_widgetLabel": "Скрининг",
  "geometryServicesNotFound": "Сервис геометрии не доступен.",
  "unableToDrawBuffer": "Невозможно нарисовать буфер. Попробуйте снова.",
  "invalidConfiguration": "Недопустимая конфигурация.",
  "clearAOIButtonLabel": "Начать сначала",
  "noGraphicsShapefile": "Загруженный шейп-файл не содержит графики.",
  "zoomToLocationTooltipText": "Приблизить к местоположению",
  "noGraphicsToZoomMessage": "Не найдено графики в области приближения.",
  "placenameWidget": {
    "placenameLabel": "Поиск местоположения"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Выбрать режим рисования",
    "toggleSelectability": "Щелкните, чтобы переключить доступность для выборки",
    "chooseLayerTitle": "Выбрать слои, доступные для выборки",
    "selectAllLayersText": "Выбрать все",
    "layerSelectionWarningTooltip": "Необходимо выбрать по крайней мере один слой для создания AOI",
    "selectToolLabel": "Выбрать"
  },
  "shapefileWidget": {
    "shapefileLabel": "Загрузить архивированный шейп-файл",
    "uploadShapefileButtonText": "Загрузить",
    "unableToUploadShapefileMessage": "Не удается загрузить шейп-файл."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Задать начальную точку",
    "addButtonTitle": "Добавить",
    "deleteButtonTitle": "Убрать",
    "mapTooltipForStartPoint": "Щелкните на карте, чтобы задать начальную точку.",
    "mapTooltipForUpdateStartPoint": "Щелкните на карте, чтобы обновить начальную точку.",
    "locateText": "Найти местоположение",
    "locateByMapClickText": "Выберите начальные координаты",
    "enterBearingAndDistanceLabel": "Укажите направление и расстояние из начальной точки",
    "bearingTitle": "Дирекционный угол",
    "distanceTitle": "Расстояние",
    "planSettingTooltip": "Настройки плана",
    "invalidLatLongMessage": "Введите корректные значения."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Буферное расстояние (дополнительно)",
    "bufferInputLabel": "Показать результаты в пределах",
    "bufferDistanceLabel": "Буферное расстояние",
    "bufferUnitLabel": "Единицы измерения буфера"
  },
  "traverseSettings": {
    "bearingLabel": "Дирекционный угол",
    "lengthLabel": "Длина",
    "addButtonTitle": "Добавить",
    "deleteButtonTitle": "Убрать",
    "deleteBearingAndLengthLabel": "Удалить строки длины и направления",
    "addButtonLabel": "Добавить длину и направление"
  },
  "planSettings": {
    "expandGridTooltipText": "Развернуть сетку",
    "collapseGridTooltipText": "Свернуть сетку",
    "directionUnitLabelText": "Единицы измерения направления",
    "distanceUnitLabelText": "Расстояние и единицы длины",
    "planSettingsComingSoonText": "Скоро"
  },
  "newTraverse": {
    "invalidBearingMessage": "Недопустимое направление",
    "invalidLengthMessage": "Недопустимая длина.",
    "negativeLengthMessage": "Отрицательная длина"
  },
  "reportsTab": {
    "aoiAreaText": "AOI площадь",
    "downloadButtonTooltip": "Загрузка",
    "printButtonTooltip": "Печать",
    "uploadShapefileForAnalysisText": "Загрузите шейп-файл для включения в анализ",
    "uploadShapefileForButtonText": "Просмотр",
    "downloadLabelText": "Выбрать формат :",
    "downloadBtnText": "Загрузка",
    "noDetailsAvailableText": "Результаты не найдены",
    "featureCountText": "Количество",
    "featureAreaText": "Площадь",
    "featureLengthText": "Длина",
    "attributeChooserTooltip": "Выбрать атрибуты для отображения",
    "csv": "CSV",
    "filegdb": "Файловая база геоданных",
    "shapefile": "Шейп-файл",
    "noFeaturesFound": "Для выбранного формата файла не найдено результатов",
    "selectReportFieldTitle": "Выбрать поля",
    "noFieldsSelected": "Выбранные поля отсутствуют",
    "intersectingFeatureExceedsMsgOnCompletion": "Для одного или более слоев достигнуто максимальное число записей.",
    "unableToAnalyzeText": "Невозможно выполнить анализ, для одного или более слоев достигнуто максимальное число записей.",
    "errorInPrintingReport": "Не удалось напечатать отчет. Убедитесь, что настройки отчета корректны.",
    "aoiInformationTitle": "Информация области интереса (AOI)",
    "summaryReportTitle": "Краткие итоги",
    "notApplicableText": "недоступно",
    "downloadReportConfirmTitle": "Подтвердите загрузку",
    "downloadReportConfirmMessage": "Вы действительно хотите загрузить?",
    "noDataText": "Нет данных",
    "createReplicaFailedMessage": "Для следующих слоев: <br/> ${layerNames} операция загрузки не удалась",
    "extractDataTaskFailedMessage": "Операция загрузки не удалась",
    "printLayoutLabelText": "Компоновка",
    "printBtnText": "Печать",
    "printDialogHint": "Примечание: заголовок и комментарии к отчету можно редактировать на странице предварительного просмотра отчета.",
    "unableToDownloadFileGDBText": "Файловая база геоданных не может быть загружена для AOI, содержащего точечные или линейные местоположения",
    "unableToDownloadShapefileText": "Шейп-файл не может быть загружена для AOI, содержащего точечные или линейные местоположения",
    "analysisAreaUnitLabelText": "Показать результаты площади в:",
    "analysisLengthUnitLabelText": "Показать результаты длины в:",
    "analysisUnitButtonTooltip": "Выбрать единицы для анализа",
    "analysisCloseBtnText": "Закрыть",
    "areaSquareFeetUnit": "Квадратные футы",
    "areaAcresUnit": "Акры",
    "areaSquareMetersUnit": "Квадратные метры",
    "areaSquareKilometersUnit": "Квадратные километры",
    "areaHectaresUnit": "Гектары",
    "areaSquareMilesUnit": "Квадратные мили",
    "lengthFeetUnit": "Футы",
    "lengthMilesUnit": "Мили",
    "lengthMetersUnit": "Метры",
    "lengthKilometersUnit": "Километры",
    "hectaresAbbr": "гектары",
    "squareMilesAbbr": "Квадратные мили",
    "layerNotVisibleText": "Невозможно провести анализ. Слой выключен или находится вне диапазона видимых масштабов.",
    "refreshBtnTooltip": "Обновить отчет",
    "featureCSVAreaText": "Площадь пересечения",
    "featureCSVLengthText": "Длина  пересечения",
    "errorInFetchingPrintTask": "Ошибка при вызове информации о задаче печати. Попробуйте еще раз.",
    "selectAllLabel": "Выбрать все",
    "errorInLoadingProjectionModule": "Ошибка при загрузке зависимостей модуля проекции. Попробуйте загрузить файл снова.",
    "expandCollapseIconLabel": "Пересекаемые объекты",
    "intersectedFeatureLabel": "Информация о пересекаемом объекте",
    "valueAriaLabel": "Значение",
    "countAriaLabel": "Число",
    "layerNameWithFeatureCount": "Слой ${layerName} с пересекающимися объектами ${featureCount}"
  }
});