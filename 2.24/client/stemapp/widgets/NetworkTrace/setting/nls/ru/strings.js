define({
  "taskUrl": "URL задачи",
  "setTask": "Задать",
  "setTaskPopupTitle": "Задать задачу",
  "validate": "Задать",
  "inValidGPService": "Введите корректный сервис геообработки.",
  "noOutputParameterWithGeometryType": "Выбранный сервис геообработки должен иметь хотя бы один выходной параметр с заданным типом геометрии. Выберите другой сервис геообработки.",
  "invalidOutputGeometry": "Выходной тип геометрии выбранного сервиса геообработки не совместим с настройками проекта. Результаты сервиса геообработки не могут быть сохранены.",
  "GPFeatureRecordSetLayerERR": "Введите сервис геообработки с входными данными только типа 'GPFeatureRecordSetLayer'.",
  "invalidInputParameters": "Количество входных параметров меньше 1 или больше 3. Введите корректный сервис геообработки.",
  "projectSetting": {
    "title": "Настройки проекта",
    "note": "Примечание: Параметры проекта являются необязательными, после настройки пользователь может сохранить проект в нужных слоях веб-карты с областью отключения сети и входными параметрами. Пользователь может хранить другие выходные параметры на вкладке \"Выходные данные\".",
    "projectPolygonLayer": "Полигональный слой проекта",
    "outputParameterName": "Имя выходного параметра",
    "projectPointLayer": "Точечный слой проекта",
    "selectLabel": "Выбрать",
    "polygonLayerHelp": "<p>Будет показан полигональный слой(и), который удовлетворяет следующим условиям:<br/><ul><li>Слой должен иметь возможности редактирования, а именно 'Создание', 'Удаление' и 'Обновление'</li><li>Слой должен иметь 2 поля с совпадающими именами и типами данных:</li><ul><li>name (поле типа string)</li><li>globalid (тип поля GlobalID)</li></ul></ul><p/>",
    "outputParameterHelp": "<p>Будут показаны выходные полигональные слои из URL задания<p/>",
    "pointLayerHelp": "<p>Будет показан точечный слой(и), который удовлетворяет следующим условиям:<br/><ul><li>Слой должен иметь возможности редактирования, а именно 'Создание', 'Удаление' и 'Обновление</li><li>'Слой должен иметь 2 поля с совпадающими именами и типами данных:</li><ul><li>inputtype (поле типа string)</li><li>projectid (тип поля GUID)</li></ul></ul><p/>"
  },
  "inputOutputTab": {
    "flag": "Флаг",
    "barrier": "Барьер",
    "skip": "Пропустить",
    "title": "Ввод",
    "inputTooltip": "Подсказка инструмента",
    "typeText": "Тип",
    "symbol": "Символ",
    "summaryEditorText": "Текст сводки",
    "summaryTextTitle": "Введите текст, отображаемый для вкладки входных данных"
  },
  "summaryTab": {
    "title": "Вывод",
    "summaryFieldsetText": "Настройки краткой информации",
    "inputOutput": "Входные/Выходные",
    "field": "Поле",
    "operator": "Оператор",
    "inputOperatorCountOption": "Количество",
    "outputOperatorCountOption": "Количество",
    "outputOperatorSkipCountOption": "SkipCount",
    "fieldOperatorSumOption": "Сумма",
    "fieldOperatorMinOption": "Мин",
    "fieldOperatorMaxOption": "Макс",
    "fieldOperatorMeanOption": "Среднее",
    "expressionAddButtonText": "Добавить",
    "expressionVerifyButtonText": "Проверить",
    "summaryEditorText": "Текст сводки",
    "zoomText": "Автоматическое приближение после трассировки",
    "summarSettingTooltipText": "Добавить число входа/выхода",
    "symbol": "Символ",
    "outputParametersText": "Выходные параметры",
    "skipText": "Можно пропустить",
    "visibilityText": "Видимый",
    "exportToCsvText": "Экспорт в CSV",
    "settitngstext": "Настройки",
    "saveToLayerText": "Сохранить в слой (дополнительно)",
    "inputLabel": "Подпись",
    "inputTooltip": "Подсказка инструмента",
    "outputDisplay": "Отображаемый текст",
    "addFieldTitle": "Добавить поле",
    "setScale": "Установить масштаб",
    "enterDisplayText": "Введите отображаемый текст",
    "saveToLayerHelp": "<p>Будет показан слой, который удовлетворяет следующим условиям:<br/><ul><li>Слой должен иметь возможности редактирования, а именно 'Создание', 'Удаление' и 'Обновление'</li><li>Слой должен иметь 2 поля с совпадающими именами и типами данных:</li><ul><li>parametername (поле типа string)</li><li>projectid (тип поля GUID)</li></ul></ul><p/>",
    "exportToCsvDisplayText": "CSV",
    "summaryTextTitle": "Введите текст краткой информации для отображения на вкладке выходных данных",
    "addSummaryItemsTitle": "Добавить элемент краткой информации"
  },
  "validationErrorMessage": {
    "webMapError": "Слои на веб-карте не представлены. Выберите корректную веб-карту.",
    "inputTypeFlagGreaterThanError": "Вводов типа флагов не может быть больше одного.",
    "inputTypeFlagLessThanError": "Необходим по крайней мере один входной флаг.",
    "inputTypeBarrierErr": "Вводов типа барьеров не может быть больше одного.",
    "inputTypeSkipErr": "Вводов типа пропусков не может быть больше одного.",
    "displayTextForButtonError": "Отображаемый текст для кнопки запуска не может быть пустым.",
    "UnableToLoadGeoprocessError": "Не удалось загрузить сервис геообработки.",
    "invalidSummaryExpression": "Некорректное выражение",
    "validSummaryExpression": "Успешно !",
    "invalidProjectSettings": "Некорректные настройки проекта.<br/> Введите корректное значение в '${projectSetting}'."
  },
  "hintText": {
    "labelTextHint": "Подсказка: укажите отображаемую подпись для панели результатов выходного параметра.",
    "displayTextHint": "Подсказка: это будет отображаться на панели деталей для этого выходного параметра.",
    "inputTextHint": "Подсказка: Постройте свое выражение ниже, используя кнопку добавления элементов сводки",
    "expressionHint": "Подсказка: выберите элементы и нажмите Добавить для построения выражения."
  }
});