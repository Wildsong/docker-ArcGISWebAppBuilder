///////////////////////////////////////////////////////////////////////////
// Copyright Â© Esri. All Rights Reserved.
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
  "_widgetLabel": "Чертожник на парцели",
  "newTraverseButtonLabel": "Стартиране на нов траверс",
  "invalidConfigMsg": "Невалидна конфигурация",
  "geometryServiceURLNotFoundMSG": "Не може да се получи URL адрес на услуга за геометрия",
  "editTraverseButtonLabel": "Редактиране на траверс",
  "mapTooltipForStartNewTraverse": "За да започнете, моля, изберете точка на картата или я изпишете по-долу.",
  "mapTooltipForEditNewTraverse": "Моля, изберете парцел за редактиране.",
  "mapTooltipForUpdateStartPoint": "Натиснете, за да обновите началната точка.",
  "mapTooltipForScreenDigitization": "Натиснете, за да добавите точка на парцел.",
  "mapTooltipForUpdatingRotaionPoint": "Натиснете, за да обновите точката на завъртане.",
  "mapTooltipForRotate": "Плъзнете, за да завъртите.",
  "mapTooltipForScale": "Плъзнете, за да мащабирате.",
  "backButtonTooltip": "Назад",
  "newTraverseTitle": "Нов траверс",
  "editTraverseTitle": "Редактиране на траверс",
  "clearingDataConfirmationMessage": "Промените ще бъдат отхвърлени, желаете ли да продължите?",
  "unableToFetchParcelMessage": "Не може да се извлече парцел.",
  "unableToFetchParcelLinesMessage": "Не могат да се извлекат линиите на парцел.",
  "planSettings": {
    "planSettingsTitle": "Настройки",
    "directionOrAngleTypeLabel": "Посока или тип на ъгъл",
    "directionOrAngleUnitsLabel": "Посока или мерни единици за ъгъл",
    "distanceAndLengthUnitsLabel": "Разстояние и мерни единици за дължина",
    "areaUnitsLabel": "Мерни единици за област",
    "circularCurveParameters": "Параметри на кръгова крива",
    "northAzimuth": "Азимут на север",
    "southAzimuth": "Азимут на юг",
    "quadrantBearing": "Ъгъл от известна посока за квадрант",
    "radiusAndChordLength": "Радиус и дължина на хорда",
    "radiusAndArcLength": "Радиус и дължина на дъга",
    "expandGridTooltipText": "Разгъване на мрежа",
    "collapseGridTooltipText": "Сгъване на мрежа",
    "zoomToLocationTooltipText": "Мащабиране на местоположение",
    "onScreenDigitizationTooltipText": "Дигитализиране",
    "updateRotationPointTooltipText": "Обновяване на точка на завъртане"
  },
  "traverseSettings": {
    "bearingLabel": "Ъгъл от известна посока",
    "lengthLabel": "Дължина",
    "radiusLabel": "Радиус",
    "noMiscloseCalculated": "Разминаването не е изчислено",
    "traverseMiscloseBearing": "Разминаване при ъгъл от известна посока",
    "traverseAccuracy": "Точност",
    "accuracyHigh": "Високо",
    "traverseDistance": "Разстояние на разминаване",
    "traverseMiscloseRatio": "Коефициент на разминаване",
    "traverseStatedArea": "Заявена област",
    "traverseCalculatedArea": "Изчислена зона",
    "addButtonTitle": "Добавяне",
    "deleteButtonTitle": "Изтриване",
    "compassRuleAppliedHint": "Изчисленото разстояние за разминаване е по-малко от конфигурираното разстояние за разминаване,\n парцелът ще се коригира автоматично, като се използва правилото за компас."
  },
  "parcelTools": {
    "rotationToolLabel": "Ъгъл",
    "scaleToolLabel": "Мащаб"
  },
  "newTraverse": {
    "invalidBearingMessage": "Невалиден ъгъл от известна посока.",
    "invalidLengthMessage": "Невалидна дължина.",
    "invalidRadiusMessage": "Невалиден радиус.",
    "negativeLengthMessage": "Валидно е само за криви",
    "enterValidValuesMessage": "Моля, въведете валидни стойности.",
    "enterValidParcelInfoMessage": "Моля, въведете валидна инфоррмация за парцел, която да запазите.",
    "unableToDrawLineMessage": "Не може да се изчертае линия.",
    "invalidEndPointMessage": "Невалидна крайна точка, не може да се изчертае линия.",
    "lineTypeLabel": "Тип на линия"
  },
  "planInfo": {
    "requiredText": "(задължително)",
    "optionalText": "(по избор)",
    "parcelNamePlaceholderText": "Име на парцел",
    "parcelDocumentTypeText": "Тип документ",
    "planNamePlaceholderText": "Име на план",
    "cancelButtonLabel": "Отказ",
    "saveButtonLabel": "Запис",
    "saveNonClosedParcelConfirmationMessage": "Парцелът, който сте отворили не е затворен, искате ли все пак да продължите и да запазите само линиите на парцела?",
    "unableToCreatePolygonParcel": "Не може да се създаде полигон на парцел.",
    "unableToSavePolygonParcel": "Полигонът на парцел не може да се запази.",
    "unableToSaveParcelLines": "Линиите на парцела не могат да се запазят.",
    "unableToUpdateParcelLines": "Линиите на парцела не могат да се обновят.",
    "parcelSavedSuccessMessage": "Парцелът е запазен успешно.",
    "parcelDeletedSuccessMessage": "Парцелът е изтрит успешно.",
    "parcelDeleteErrorMessage": "Грешка при извличането на парцел.",
    "enterValidParcelNameMessage": "Моля, въведете валидно име за парцел.",
    "enterValidPlanNameMessage": "Моля, въведете валидно име за план.",
    "enterValidDocumentTypeMessage": "Невалиден тип документ.",
    "enterValidStatedAreaNameMessage": "Моля, въведете валидна, указана област.",
    "showAttributeList": "Показване на списъка с атрибути",
    "hideAttributeList": "Скриване на списъка с атрибути"
  },
  "xyInput": {
    "explanation": "Въведете координати със същото пространствено отнношение като на слоя."
  }
});