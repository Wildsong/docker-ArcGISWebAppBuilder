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
  "configText": "Задать текст настройки:",
  "generalSettings": {
    "tabTitle": "Общие настройки",
    "measurementUnitLabel": "Единица стоимости",
    "currencyLabel": "Символ стоимости",
    "roundCostLabel": "Округлить стоимость",
    "projectOutputSettings": "Настройки выходных данных проекта",
    "typeOfProjectAreaLabel": "Тип области проекта",
    "bufferDistanceLabel": "Буферное расстояние",
    "csvReportExportLabel": "Разрешить пользователю экспортировать отчет по проекту",
    "editReportSettingsBtnTooltip": "Настройки редактирования отчета",
    "roundCostValues": {
      "twoDecimalPoint": "Два десятичных знака",
      "nearestWholeNumber": "Ближайшее целое число",
      "nearestTen": "Ближайшие десять",
      "nearestHundred": "Ближайшие сто",
      "nearestThousand": "Ближайшие тысяча",
      "nearestTenThousands": "Ближайшие десять тысяч"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Настройки отчета",
      "reportNameLabel": "Имя отчета (дополнительно) :",
      "checkboxLabel": "Показывать",
      "layerTitle": "Название",
      "columnLabel": "Надпись",
      "duplicateMsg": "Дублировать надпись"
    },
    "projectAreaType": {
      "outline": "Контур",
      "buffer": "Буфер"
    },
    "errorMessages": {
      "currency": "Некорректные единицы валюты",
      "bufferDistance": "Недопустимое буферное расстояние",
      "outOfRangebufferDistance": "Значение должно быть больше 0 и меньше или равно 100."
    }
  },
  "projectSettings": {
    "tabTitle": "Настройки проекта",
    "costingGeometrySectionTitle": "Задать географию для вычисления стоимости (дополнительно)",
    "costingGeometrySectionNote": "Примечание: Настройка этого слоя позволит пользователям задавать уравнения стоимости шаблонов объектов на основании географии.",
    "projectTableSectionTitle": "Возможность Сохранить/Загрузить настройки проекта (дополнительно)",
    "projectTableSectionNote": "Примечание: Настройка всех таблиц и слоев позволит пользователям сохранить/загрузить проект для дальнейшего использования.",
    "costingGeometryLayerLabel": "Слой геометрии вычисления стоимости",
    "fieldLabelGeography": "Поле для географии подписи",
    "projectAssetsTableLabel": "Таблица объектов проекта",
    "projectMultiplierTableLabel": "Таблица множителя добавочной стоимости проекта",
    "projectLayerLabel": "Слой проекта",
    "configureFieldsLabel": "Настроить поля",
    "fieldDescriptionHeaderTitle": "Описание поля",
    "layerFieldsHeaderTitle": "Поле слоя",
    "selectLabel": "Выбрать",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} уже выбран",
      "invalidConfiguration": "Выберите ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Будет отображен полигональный слой(и), который удовлетворяет следующим условиям: <br/> <li> Слой должен иметь возможность 'Запрос'</li><li> Слой должен иметь поле GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Строковые и числовые поля выбранного 'Слоя геометрии стоимости' будет отображаться в ниспадающем списке 'Поле для надписывания географии'.</p>",
    "projectAssetsTableHelp": "<p>Будет показана таблица(ы), удовлетворяющие следующим условиям: <br/> <li>Таблица должна иметь возможности редактирования, а именно 'Создание', 'Удаление' и 'Обновление'</li> <li>Таблица должна иметь шесть полей с этими точными именами и типами данных:</li><ul><li> AssetGUID (тип поля GUID)</li><li> CostEquation (тип поля String)</li><li> Scenario (тип поля String)</li><li> TemplateName (тип поля String)</li><li> GeographyGUID (тип поля GUID)</li><li> ProjectGUID (тип поля GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Будет показана таблица(ы), удовлетворяющие следующим условиям: <br/> <li>Таблица должна иметь возможности редактирования, а именно 'Создание', 'Удаление' и 'Обновление'</li> <li>Таблица должна иметь пять полей с этими точными именами и типами данных:</li><ul><li> Description (тип поля String)</li><li> Type ( тип поля String)</li><li> Value (тип поля Float/Doubleъ)</li><li> Costindex (тип поля Integer)</li><li> ProjectGUID (тип поля GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Будет показан полигональный слой(и), удовлетворяющий следующим условиям: <br/> <li>Слой должен иметь возможности редактирования, а именно 'Создание', 'Удаление' и 'Обновление'</li> <li>Слой должен иметь пять полей с этими точными именами и типами данных:</li><ul><li>ProjectName (тип поля String)</li><li>Description (тип поля String)</li><li>Totalassetcost (тип поля Float/Double)</li><li>Grossprojectcost (тип поля Float/Double)</li><li>GlobalID (тип поля GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Центроид точечного слоя",
    "selectRelatedPointLayerDefaultOption": "Выбрать",
    "pointLayerHintText": "<p>Будут показаны точечные слои со следующими характеристиками: <br/> <li>\tСлой должен содержать поле 'Projectid' (тип GUID)</li><li>\tСлой должен иметь функции редактирования 'Создание', 'Удаление' и 'Обновление'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Настройки слоя",
    "layerNameHeaderTitle": "Имя слоя",
    "layerNameHeaderTooltip": "Список слоев на карте",
    "EditableLayerHeaderTitle": "Редактируемый",
    "EditableLayerHeaderTooltip": "Включить слои и их шаблоны в виджет расчета стоимости",
    "SelectableLayerHeaderTitle": "Доступно для выборки",
    "SelectableLayerHeaderTooltip": "Геометрия объекта будет использоваться для создания нового элемента стоимости",
    "fieldPickerHeaderTitle": "Project ID (дополнительно)",
    "fieldPickerHeaderTooltip": "Дополнительное поле (или строка типа)для хранения ID проекта в",
    "selectLabel": "Выбрать",
    "noAssetLayersAvailable": "На выбранной веб-карте не найден слой объектов",
    "disableEditableCheckboxTooltip": "У этого слоя нет возможностей редактирования",
    "missingCapabilitiesMsg": "У слоя нет следующих возможностей:",
    "missingGlobalIdMsg": "У слоя нет поля GlobalId",
    "create": "Создание",
    "update": "Обновление",
    "deleteColumnLabel": "Удалить",
    "attributeSettingHeaderTitle": "Настройки атрибутов",
    "addFieldLabelTitle": "Добавить атрибуты",
    "layerAttributesHeaderTitle": "Атрибуты слоя",
    "projectLayerAttributesHeaderTitle": "Атрибуты слоя проекта",
    "attributeSettingsPopupTitle": "Настройки атрибута слоя"
  },
  "costingInfo": {
    "tabTitle": "Информация вычисления стоимости",
    "proposedMainsLabel": "Предполагаемые сети",
    "addCostingTemplateLabel": "Добавить шаблон вычисления стоимости",
    "manageScenariosTitle": "Управлять сценариями",
    "featureTemplateTitle": "Шаблон объектов",
    "costEquationTitle": "Уравнение стоимости",
    "geographyTitle": "География",
    "scenarioTitle": "Сценарий",
    "actionTitle": "Действия",
    "scenarioNameLabel": "Имя сценария",
    "addBtnLabel": "Добавить",
    "srNoLabel": "Нет.",
    "deleteLabel": "Удалить",
    "duplicateScenarioName": "Дублировать имя сценария",
    "hintText": "<div>Подсказка: Используйте следующие ключевые слова</div><ul><li><b>{TOTALCOUNT}</b>: Использует общее число объектов одного типа в географии</li><li><b>{MEASURE}</b>: Использует длину для линейных объектов и площадь для полигональных</li><li><b>{TOTALMEASURE}</b>: Использует общую длину для линейных объектов и общую площадь для полигональных объектов одинакового типа в географии</li></ul>Можно использовать функции, например:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Отредактируйте уравнение стоимости, как необходимо для проекта.",
    "noneValue": "Нет",
    "requiredCostEquation": "Некорректное уравнение стоимости для ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Для ${layerName} существуют дублирующиеся записи шаблона: ${templateName}",
    "defaultEquationRequired": "Для ${layerName} требуется уравнение по умолчанию: ${templateName}",
    "validCostEquationMessage": "Введите корректное уравнение стоимости",
    "costEquationHelpText": "Отредактируйте уравнение стоимости, как необходимо для проекта",
    "scenarioHelpText": "Выберите сценарий, необходимый для вашего проекта",
    "copyRowTitle": "Копировать строку",
    "noTemplateAvailable": "Добавьте хотя бы один шаблон для ${layerName}",
    "manageScenarioLabel": "Управлять сценарием",
    "noLayerMessage": "Введите хотя бы один слой в ${tabName}",
    "noEditableLayersAvailable": "Слои, которые должны быть отмечена как редактируемые на вкладке настроек слоя",
    "updateProjectCostCheckboxLabel": "Обновить уравнения проекта",
    "updateProjectCostEquationHint": "Подсказка: это позволит пользователю обновлять уравнения стоимости уже добавленных в существующие проекты активов, с помощью новых уравнений, определенных ниже на основе шаблона объекта, географии и сценария. Если комбинация не найдена, для нее будет установлено уравнение стоимости по умолчанию, т.е. география и сценарий устанавливаются как «Нет». В случае удаления шаблона объекта стоимость будет установлена на 0."
  },
  "statisticsSettings": {
    "tabTitle": "Дополнительные настройки",
    "addStatisticsLabel": "Добавить статистику",
    "fieldNameTitle": "Поле",
    "statisticsTitle": "Подпись",
    "addNewStatisticsText": "Добавить новую статистику",
    "deleteStatisticsText": "Удалить статистику",
    "moveStatisticsUpText": "Переместить статистику вверх",
    "moveStatisticsDownText": "Переместить статистику вниз",
    "selectDeselectAllTitle": "Выбрать все"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Добавить добавочную стоимость проекта",
    "additionalCostValueColumnHeader": "Значение",
    "invalidProjectCostMessage": "Некорректный ввод стоимости проекта",
    "additionalCostLabelColumnHeader": "Подпись",
    "additionalCostTypeColumnHeader": "Тип"
  },
  "statisticsType": {
    "countLabel": "Количество",
    "averageLabel": "Среднее арифметическое",
    "maxLabel": "Максимум",
    "minLabel": "Минимум",
    "summationLabel": "Суммирование",
    "areaLabel": "Площадь",
    "lengthLabel": "Длина"
  }
});