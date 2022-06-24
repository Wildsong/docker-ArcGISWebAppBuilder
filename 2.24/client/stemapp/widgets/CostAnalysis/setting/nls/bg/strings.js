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
  "configText": "Задаване на конфигурационен текст:",
  "generalSettings": {
    "tabTitle": "Общи настройки",
    "measurementUnitLabel": "Единица разход",
    "currencyLabel": "Символ на разходите",
    "roundCostLabel": "Кръгла цена",
    "projectOutputSettings": "Изходни настройки на проекта",
    "typeOfProjectAreaLabel": "Тип област на проекта",
    "bufferDistanceLabel": "Буферно разстояние",
    "csvReportExportLabel": "Позволява на потребителя да експортира отчет за проекта",
    "editReportSettingsBtnTooltip": "Редактиране на настройките на отчет",
    "roundCostValues": {
      "twoDecimalPoint": "Две десетични точки",
      "nearestWholeNumber": "Най-близкото цяло число",
      "nearestTen": "Най-близко до десет",
      "nearestHundred": "Най-близко до сто",
      "nearestThousand": "Най-близко до хиляда",
      "nearestTenThousands": "Най-близко до десет хиляди"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Настройки на отчет",
      "reportNameLabel": "Име на отчет (по избор) :",
      "checkboxLabel": "Показване",
      "layerTitle": "Заглавие",
      "columnLabel": "Етикет",
      "duplicateMsg": "Дублиран надпис"
    },
    "projectAreaType": {
      "outline": "Контур",
      "buffer": "Буфер"
    },
    "errorMessages": {
      "currency": "Невалидна валутна единица",
      "bufferDistance": "Невалидно буферно разстояние",
      "outOfRangebufferDistance": "Стойността трябва да е по-голяма от 0 и по-малка или равна на 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Настройки на проект",
    "costingGeometrySectionTitle": "Дефинирайте география за изчисляване на разходите (по избор)",
    "costingGeometrySectionNote": "Забележка: Конфигурирането на този слой ще позволи на потребителя да зададе уравнение на разходите на обектни шаблони на основата на географски райони.",
    "projectTableSectionTitle": "Възможност за запазване/зареждане на настройки на проекта (по избор)",
    "projectTableSectionNote": "Забележка: Конфигурирането на всички таблици и слоеве ще позволи на потребителя да запише/зареди проект за по-късна употреба.",
    "costingGeometryLayerLabel": "Изчисляване на себестойността на геометричен слой",
    "fieldLabelGeography": "Поле за географско надписване",
    "projectAssetsTableLabel": "Таблица на активите на проект",
    "projectMultiplierTableLabel": "Таблица на допълнителните разходи за мултипликатор на проект",
    "projectLayerLabel": "Слой на проект",
    "configureFieldsLabel": "Конфигуриране на полета",
    "fieldDescriptionHeaderTitle": "Описание на поле",
    "layerFieldsHeaderTitle": "Поле на слой",
    "selectLabel": "Избор",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} вече е избран",
      "invalidConfiguration": "Моля, изберете ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Ще бъде показан полигонен слой (-еве) със следните условия: <br/> <li> Слоят трябва да има възможност „Заявка“</li><li> Слоят трябва да има поле GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Текстовите и цифровите полета на избрания „Изчисляване на разходите на геометричен слой“ ще бъдат показани в падащото меню „Поле за географски надпис“.</p>",
    "projectAssetsTableHelp": "<p>Ще бъде показана таблица(и) със следните условия: <br/> <li>Таблицата трябва да има възможности за редактиране, а именно 'Създаване', 'Изтриване' и 'Обновяване'</li> <li>Таблицата трябва да има шест полета с точно име и тип данни:</li><ul><li> AssetGUID (поле тип GUID)</li><li> CostEquation (текстов тип поле)</li><li> Scenario (текстов тип поле)</li><li> TemplateName (текстов тип поле)</li><li> GeographyGUID (поле тип GUID (Глобален уникален идентификатор))</li><li> ProjectGUID (поле тип GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Ще бъде показана таблица(и) със следните условия: <br/> <li>Таблицата трябва да има възможности за редактиране, а именно 'Създаване', 'Изтриване' и 'Обновяванe'</li> <li>Таблицата трябва да има пет полета с точно име и тип данни::</li><ul><li> Описание (текстов тип поле)</li><li> Тип (текстов тип поле)</li><li> Стойност (поле тип Float/Двойно)</li><li> Индекс на разходите (Поле тип цяло число)</li><li> ProjectGUID (поле тип GUID (Глобален уникален идентификатор))</li></ul> </p>",
    "projectLayerHelp": "<p>Ще бъде показан полигонен слой (-еве) със следните условия: <br/> <li>Слоят трябва да има възможности за редактиране, а именно 'Създаване', 'Изтриване' и 'Обновяванe'</li> <li>Слоят трябва да има пет полета с точно име и тип данни:</li><ul><li>Име на проект (поле тип Низ)</li><li>Описание (поле тип Низ)</li><li>Totalassetcost (поле тип Float/Двойно)</li><li>Grossprojectcost (поле тип Float/Двойно)</li><li>GlobalID (поле тип GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Централен слой точки",
    "selectRelatedPointLayerDefaultOption": "Избор",
    "pointLayerHintText": "<p>Ще бъде показан точков слой (-еве) със следните условия: <br/> <li> Слоят трябва да има 'Идентификатор на проект' (GUID тип) поле</li><li> Слоят трябва да има възможности за редактиране, а именно 'Създаване', 'Изтриване' и 'Обновяванe'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Настройки на слой",
    "layerNameHeaderTitle": "Име на слой",
    "layerNameHeaderTooltip": "Списък на слоеве в картата",
    "EditableLayerHeaderTitle": "Редактируем",
    "EditableLayerHeaderTooltip": "Включете слоя и неговите шаблони в изпълнимия модул за изчисляване на разходите",
    "SelectableLayerHeaderTitle": "Избираем",
    "SelectableLayerHeaderTooltip": "Геометрията от обекта може да се използва за генериране на нов елемент за разходите",
    "fieldPickerHeaderTitle": "Идентификатор на проект (по избор)",
    "fieldPickerHeaderTooltip": "Незадължително поле (от текстов тип) за съхраняване на идентификатор на проекта в",
    "selectLabel": "Избор",
    "noAssetLayersAvailable": "В избраната уеб карта не е намерен слой с активи",
    "disableEditableCheckboxTooltip": "Този слой няма възможности за редактиране",
    "missingCapabilitiesMsg": "На този слой липсват следните възможности:",
    "missingGlobalIdMsg": "Този слой няма поле GlobalId",
    "create": "Създаване",
    "update": "Обновяване",
    "deleteColumnLabel": "Изтриване",
    "attributeSettingHeaderTitle": "Настройки на атрибут",
    "addFieldLabelTitle": "Добавяне на атрибути",
    "layerAttributesHeaderTitle": "Атрибути на слой",
    "projectLayerAttributesHeaderTitle": "Проект \"Атрибути на слой\"",
    "attributeSettingsPopupTitle": "Настройки на атрибут на слой"
  },
  "costingInfo": {
    "tabTitle": "Информация за изчисляване на разходите",
    "proposedMainsLabel": "Предложени мрежи",
    "addCostingTemplateLabel": "Добавяне на шаблон за изчисляване на разходи",
    "manageScenariosTitle": "Управление на сценарии",
    "featureTemplateTitle": "Обектен шаблон",
    "costEquationTitle": "Уравнение на разходите",
    "geographyTitle": "География",
    "scenarioTitle": "Сценарий",
    "actionTitle": "Действия",
    "scenarioNameLabel": "Име на сценарий",
    "addBtnLabel": "Добавяне",
    "srNoLabel": "Номер",
    "deleteLabel": "Изтриване",
    "duplicateScenarioName": "Дублирано име на сценарий",
    "hintText": "<div>Съвет: Използвайте следните ключови думи</div><ul><li><b>{TOTALCOUNT}</b>: Използва общия брой от същия тип активи в география</li><li><b>{MEASURE}</b>: Използва дължината за линейния актив и площта за полигонния актив</li><li><b>{TOTALMEASURE}</b>: Използва общата дължина за линейния актив и общата площ за полигонния актив от същия тип в география</li></ul>Вие може да използвате функции като:<ul><li>Мат.абс.(-100)</li><li>Мат. скоба({TOTALMEASURE})</li></ul>Моля, редактирайте уравнението на разходите според нуждите на вашия проект.",
    "noneValue": "Няма",
    "requiredCostEquation": "Невалидно уравнение на разходите за ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Съществува дублиращ се запис на шаблона за ${layerName} : ${templateName}",
    "defaultEquationRequired": "Уравнението по подразбиране се изисква за ${layerName} : ${templateName}",
    "validCostEquationMessage": "Моля, въведете валидно уравнение на разходите",
    "costEquationHelpText": "Моля, редактирайте уравнението на разходите според нуждите на вашия проект",
    "scenarioHelpText": "Моля, изберете сценарий според нуждите на вашия проект",
    "copyRowTitle": "Копиране на ред",
    "noTemplateAvailable": "Моля, изберете поне един шаблон за ${layerName}",
    "manageScenarioLabel": "Управляване на сценарий",
    "noLayerMessage": "Моля, въведете поне един слой в ${tabName}",
    "noEditableLayersAvailable": "Слой (-еве) трябва да бъдат проверени като редактируеми в раздела за настройки на слоя",
    "updateProjectCostCheckboxLabel": "Обновяване на уравненията на проекта",
    "updateProjectCostEquationHint": "Съвет: Това ще позволи на потребителя да актуализира уравненията на разходите на активи, които вече са добавени в съществуващи проекти, с новите уравнения, дефинирани по-долу въз основа на обектния шаблон, географията и сценария. Ако комбинацията не бъде намерена, тя ще бъде зададена като уравнение на разходите по подразбиране, т.е. география и сценарий като „Няма“. В случай на премахнат обектен шаблон, цената ще бъде зададена като 0."
  },
  "statisticsSettings": {
    "tabTitle": "Допълнителни настройки",
    "addStatisticsLabel": "Добавяне на статистически данни",
    "fieldNameTitle": "Повърхност",
    "statisticsTitle": "Етикет",
    "addNewStatisticsText": "Добавяне на нова статистика",
    "deleteStatisticsText": "Изтриване на статистика",
    "moveStatisticsUpText": "Преместете статистиката нагоре",
    "moveStatisticsDownText": "Преместете статистиката надолу",
    "selectDeselectAllTitle": "Избиране на всички"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Добавяне на допълнителни разходи по проекта",
    "additionalCostValueColumnHeader": "Стойност",
    "invalidProjectCostMessage": "Невалиден запис за разходите по проекта",
    "additionalCostLabelColumnHeader": "Етикет",
    "additionalCostTypeColumnHeader": "Тип"
  },
  "statisticsType": {
    "countLabel": "Брой",
    "averageLabel": "Средни",
    "maxLabel": "Максимални",
    "minLabel": "Минимални",
    "summationLabel": "Обобщение",
    "areaLabel": "Област",
    "lengthLabel": "Дължина"
  }
});