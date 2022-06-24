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
  "setBtnLabel": "Настройване",
  "selectLabel": "Избор",
  "selectLayerLabel": "Избор на слоеве за парцели",
  "selectLayerHintText": "Съвет: Използвайте бутона „Set“ (задаване), за да изберете полигона на парцела и свързания с него линеен слой.",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Избраният полигонов слой няма валиден свързан слой."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Избор на свързан линеен слой",
    "layerSettingTabLabel": "Слоеве на парцел",
    "attributeSettingTabLabel": "Настройки на атрибут",
    "advancedSettingTabLabel": "Разширени настройки",
    "selectLayerHintText": "Съвет: Използвайте за съхранение на стойности COGO в линеен слой на парцел",
    "selectFieldLegendLabel": "Избор на повърхности за съхранение на стойности COGO в линеен слой на парцел",
    "bearingFieldLabel": "Ъгъл от известна посока",
    "chordLengthFieldLabel": "Дължина на хорда",
    "distanceFieldLabel": "Разстояние",
    "sequenceIdFieldLabel": "ИД на последователност",
    "radiusFieldLabel": "Радиус",
    "foreignKeyFieldLabel": "Чужд ключ",
    "arcLengthFieldLabel": "Дължина на дъга",
    "lineTypeFieldLabel": "Тип на линия",
    "parcelPointSymbolLabel": "Символ за точка на парцел",
    "parcelPointSymbolHintText": "Съвет: Използва се за показване на символа на точка за произход на линията.",
    "startOrRotationSymbolLabel": "Символ на начална точка и точка на завъртане",
    "startOrRotationSymbolHintText": "Съвет: Използва се за показване на символа за начална точка и точката на завъртане.",
    "symbolPickerPreviewText": "Предварителен преглед",
    "selectLineLayerLabel": "Избор на линеен слой"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Избор на полигонов слой",
    "selectPolygonLayerHintText": "Съвет: Използва се за избор на слой за полигон на парцел",
    "selectFieldLegendLabel": "Избор на полета за съхраняване на информация за координати на геометрия",
    "parcelNameLabel": "Име на парцел",
    "rotationLabel": "Въртене",
    "planNameLabel": "Име на план",
    "scalingLabel": "Мащабиране",
    "documentTypeLabel": "Тип документ",
    "miscloseRatioLabel": "Коефициент на разминаване",
    "statedAreaLabel": "Заявена област",
    "miscloseDistanceLabel": "Разстояние на разминаване",
    "selectPolygonLayerLabelPopUp": "Избор на полигонов слой",
    "honorSettingRbLabel": "Настройки за изскачащи прозорци на уеб камера",
    "customSettingsRbLabel": "Потребителски настройки",
    "display": "Индикатор",
    "edit": "Редактиране",
    "editpageName": "Име",
    "actions": "Действия",
    "editpageAlias": "Псевдоним",
    "titleLabel": "Заглавие на раздел"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Тип на линия",
    "valueLabel": "Стойност",
    "symbolLabel": "Символ",
    "connectionLineLabel": "Линия за свързване",
    "boundaryLineLabel": "Линия за граница"
  },
  "closureSetting": {
    "snappingLayerLabel": "Прилепване на слоеве",
    "snappingBtnLabel": "Настройване",
    "snappingLayerHintText": "Съвет: Изберете слоеве, към които ще се прилепят линиите на парцела.",
    "miscloseDistanceLabel": "Разстояние на разминаване",
    "miscloseDistanceHintText": "Съвет: Посочете разстоянието на разминаване и неговата мерна единица.",
    "miscloseRatioLabel": "Коефициент на разминаване",
    "miscloseRatioHintText": "Съвет: Посочете коефициента на разминване.",
    "snappingToleranceLabel": "Толеранс на прилепване",
    "pixelLabel": "Пиксели",
    "snappingToleranceHintText": "Съвет: Посочете толеранса на прилепване.",
    "selectLayerLabel": "Изберете слой"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Невалидно поле за ъгъл от известна посока",
    "chordLengthErrMsg": "Невалидна дължина на хорда",
    "distanceFieldErrMsg": "Невалидно разстояние",
    "sequenceIdFieldErrMsg": "Невалиден ИД на последователност",
    "radiusFieldErrMsg": "Невалиден радиус",
    "foreignKeyFieldErrMsg": "Невалиден чужд ключ",
    "arcLengthFieldErrMsg": "Невалидна дължина на дъга",
    "lineTypeFieldErrMsg": "Невалиден тип линия",
    "parcelNameFieldErrMsg": "Невалидно поле за име на парцел",
    "planNameFieldErrMsg": "Невалидно поле за име на план",
    "scaleFieldErrMsg": "Невалидно поле за мащабиране",
    "documentTypeFieldErrMsg": "Невалидно поле за тип документ",
    "miscloseRatioFieldErrMsg": "Невалидно поле за коефициент на разминаване",
    "statedAreaFieldErrMsg": "Невалидно поле за заявена област",
    "miscloseDistanceFieldErrMsg": "Невалидно поле за разстояние на разминаване",
    "globalIdFieldErrMsg": "Избраният полигонов слой няма валидно поле esriFieldTypeGlobalID.",
    "invalidPolylineLayer": "Моля, изберете валиден полилинеен слой на парцела",
    "invalidPolygonLayer": "Моля, изберете валиден полигонов слой на парцела",
    "invalidMiscloseDistance": "Моля, въведете валидно разстояние на разминаване",
    "invalidSnappingTolerance": "Моля, въведете валиден коефициент на прилепване",
    "invalidMiscloseRatio": "Моля, въведете валидно разстояние на разминаване",
    "selectDistinctLineTypes": "Моля, изберете отделна стойност за всеки тип линия",
    "invalidConnectionLineType": "Невалидна стойност на линия за свързане",
    "invalidBoundaryLineType": "Невалидна стойност на линия за граница",
    "selectDistinctPolylineFields": "Моля, изберете отделно поле за всяка стойност COGO.",
    "selectDistinctPolygonFields": "Моля, изберете отделно поле за всяка информация за координатната геометрия."
  }
});