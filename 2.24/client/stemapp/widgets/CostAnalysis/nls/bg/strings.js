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
  "_widgetLabel": "Анализ на разходите",
  "unableToFetchInfoErrMessage": "Не може да се извлекат подробности за услугата за геометрия/конфигуриран слой",
  "invalidCostingGeometryLayer": "Не може да се получи 'esriFieldTypeGlobalID' в изчислението на геометричен слой.",
  "projectLayerNotFound": "Не може да се намери конфигурираният слой на проекта в картата.",
  "costingGeometryLayerNotFound": "Не може да се намери конфигурираният слой с геометрия с изчисление на разходите в картата.",
  "projectMultiplierTableNotFound": "Не може да се намери конфигурираната таблица с умножител на проект с допълнителни разходи в картата.",
  "projectAssetTableNotFound": "Не може да се намери конфигурираната таблица на активите на проекта в картата.",
  "createLoadProject": {
    "createProjectPaneTitle": "Създаване на проект",
    "loadProjectPaneTitle": "Зареждане на проект",
    "projectNamePlaceHolder": "Име на проект",
    "projectDescPlaceHolder": "Описание на проект",
    "selectProject": "Избиране на проект",
    "viewInMapLabel": "Предварителен преглед",
    "loadLabel": "Зареждане",
    "createLabel": "Създаване",
    "deleteProjectConfirmationMsg": "Наистина ли искате да изтриете проекта?",
    "noAssetsToViewOnMap": "Избраният проект няма активи за преглед на картата",
    "projectDeletedMsg": "Проектът е изтрит успешно.",
    "errorInCreatingProject": "Грешка при създаването на проект.",
    "errorProjectNotFound": "Проектът не е открит.",
    "errorInLoadingProject": "Моля, проверете дали е избран валиден проект.",
    "errorProjectNotSelected": "Изберете проект от падащото меню",
    "errorDuplicateProjectName": "Името на проекта вече съществува.",
    "errorFetchingPointLabel": "Грешка при извличане на точката на етикета. Моля, опитайте отново",
    "errorAddingPointLabel": "Грешка при добавянето на точката на надписа. Моля, опитайте отново"
  },
  "statisticsSettings": {
    "tabTitle": "Настройки на статистика",
    "addStatisticsLabel": "Добавяне на статистически данни",
    "addNewStatisticsText": "Добавяне на нова статистика",
    "deleteStatisticsText": "Изтриване на статистика",
    "moveStatisticsUpText": "Преместете статистиката нагоре",
    "moveStatisticsDownText": "Преместете статистиката надолу",
    "layerNameTitle": "Слой",
    "statisticsTypeTitle": "Тип",
    "fieldNameTitle": "Повърхност",
    "statisticsTitle": "Етикет",
    "actionLabelTitle": "Действия",
    "selectDeselectAllTitle": "Избиране на всички",
    "layerCheckbox": "Поле за отметка на слой"
  },
  "statisticsType": {
    "countLabel": "Брой",
    "averageLabel": "Средни",
    "maxLabel": "Максимални",
    "minLabel": "Минимални",
    "summationLabel": "Обобщение",
    "areaLabel": "Област",
    "lengthLabel": "Дължина",
    "expandCollapseAriaLabel": "'${displayTitle}' Брой '${featureCount}'"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Слой (-еве) трябва да бъдат отметнати като редактируеми в раздела за настройки на слоя"
  },
  "workBench": {
    "refresh": "Обновяване",
    "noAssetAddedMsg": "Няма добавени активи",
    "units": "единица(и)",
    "assetDetailsTitle": "Подробности за елемент на актив",
    "costEquationTitle": "Уравнение на разходите",
    "newCostEquationTitle": "Ново уравнение",
    "defaultCostEquationTitle": "Уравнение по подразбиране",
    "geographyTitle": "География",
    "scenarioTitle": "Сценарий",
    "costingInfoHintText": "<div>Съвет: Използвайте следните ключови думи</div><ul><li><b>{TOTALCOUNT}</b>: Използвайте общия брой активи от същия тип в география</li> <li><b>{MEASURE}</b>: Използвайте дължината за линейния актив и областта за полигонен актив</li><li><b>{TOTALMEASURE}</b>: Използвайте общата дължина за линейния актив и общата площ за полигонния актив от същия тип в география</li></ul> Може да използвате функции като:<ul><li>Мат.абс.(-100)</li><li>Мат.скоба({TOTALMEASURE})</li></ul>Моля, редактирайте уравнението на разходите според нуждите на вашия проект.",
    "zoomToAsset": "Увеличете към актива",
    "deleteAsset": "Изтриване на актив",
    "closeDialog": "Затваряне на диалог",
    "objectIdColTitle": "Идентификатор на обект",
    "costColTitle": "Разход",
    "errorInvalidCostEquation": "Невалидно уравнение на разходите.",
    "errorInSavingAssetDetails": "Подробностите за актива не могат да бъдат запазени.",
    "featureModeText": "Режим на създаване на обект",
    "sketchToolTitle": "Нови активи на скица.",
    "selectToolTitle": "Копиране на активи от съществуващ обект на картата.",
    "downloadCSVBtnTitle": "Експортиране на отчет",
    "templatePickerTitle": "Изберете шаблон, за да създадете нови активи:"
  },
  "assetDetails": {
    "inGeography": " в ${geography} ",
    "withScenario": " с ${scenario}",
    "totalCostTitle": "Общ разход",
    "additionalCostLabel": "Описание",
    "additionalCostValue": "Стойност",
    "additionalCostNetValue": "Нетна стойност"
  },
  "projectOverview": {
    "assetItemsTitle": "Елементи на актив",
    "assetStatisticsTitle": "Статистически данни на актив",
    "projectSummaryTitle": "Обобщение на проект",
    "projectName": "Име на проект: ${name}",
    "totalCostLabel": "Общ разход за проект (*):",
    "grossCostLabel": "Брутен разход за проект (*):",
    "roundingLabel": "* Закръгляване до '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Не може да се запази границата на проекта в слоя на проекта.",
    "unableToSaveProjectCost": "Не може да се запише разход(и) в слоя на проекта.",
    "roundCostValues": {
      "twoDecimalPoint": "Две десетични точки",
      "nearestWholeNumber": "Най-близкото цяло число",
      "nearestTen": "Най-близко до десет",
      "nearestHundred": "Най-близко до сто",
      "nearestThousand": "Най-близко до хиляда",
      "nearestTenThousands": "Най-близко до десет хиляди"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Атрибут на проекта",
    "projectAttributeTitle": "Редактиране на атрибути на проект"
  },
  "costEscalation": {
    "costEscalationLabel": "Добавяне на допълнителен разход",
    "valueHeader": "Стойност",
    "addCostEscalationText": "Добавяне на допълнителен разход",
    "deleteCostEscalationText": "Изтриване на избрания допълнителен разход",
    "moveCostEscalationUpText": "Преместване на избраните допълнителни разходи нагоре",
    "moveCostEscalationDownText": "Преместване на избраните допълнителни разходи надолу",
    "invalidEntry": "Един или повече записи са невалидни.",
    "errorInSavingCostEscalation": "Не може да се запазят допълнителни подробности за разходите."
  },
  "scenarioSelection": {
    "popupTitle": "Изберете Сценарий за актива",
    "regionLabel": "География",
    "scenarioLabel": "Сценарий",
    "noneText": "Няма",
    "copyFeatureMsg": "Искате ли да копирате избраните обекти?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Детайлни статистически данни",
    "noDetailStatisticAvailable": "Не са добавени статистически данни за активите",
    "addStatisticsButtonLabel": "Добавяне"
  },
  "copyFeatures": {
    "title": "Копиране на обекти",
    "createFeatures": "Създаване на обекти",
    "createSingleFeature": "Създаване на 1 мулти-геометричен обект",
    "noFeaturesSelectedMessage": "Няма избрани обекти",
    "selectFeatureToCopyMessage": "Моля, изберете обекти за копиране.",
    "copyFeatureUpdateGeometryError": "Не може да се актуализира геометрията на избраните обекти"
  },
  "updateCostEquationPanel": {
    "updateProjectCostTabLabel": "Обновяване на уравненията на проекта",
    "updateProjectCostSelectProjectTitle": "Избиране на всички проекти",
    "updateButtonTextForm": "Обновяване",
    "updateProjectCostSuccess": "Уравненията на разходите за избраните проекти са обновени",
    "updateProjectCostError": "Не може да се актуализира уравнението на разходите за избрани проекти",
    "updateProjectNoProject": "Няма открит проект"
  }
});