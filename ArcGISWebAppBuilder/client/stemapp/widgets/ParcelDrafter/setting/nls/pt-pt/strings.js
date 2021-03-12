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
  "setBtnLabel": "Definir",
  "selectLabel": "Selecionar",
  "selectLayerLabel": "Selecionar Camadas de Parcelas",
  "selectLayerHintText": "Dica: Utilize o botão definir para selecionar o polígono de parcela e a respetiva camada de linhas associada",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "A camada de polígonos selecionada não possui uma camada relacionada válida."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Selecionar Camada de Linhas Relacionada",
    "layerSettingTabLabel": "Camadas de Parcelas",
    "attributeSettingTabLabel": "Definições de Atributos",
    "advancedSettingTabLabel": "Definições Avançadas",
    "selectLayerHintText": "Dica: Utilize para armazenar valores COGO em camadas de linhas de parcela",
    "selectFieldLegendLabel": "Selecione campos para armazenar valores COGO em camadas de linhas de parcela",
    "bearingFieldLabel": "Suporte",
    "chordLengthFieldLabel": "Comprimento de Corda",
    "distanceFieldLabel": "Distância",
    "sequenceIdFieldLabel": "ID de Sequência",
    "radiusFieldLabel": "Raio",
    "foreignKeyFieldLabel": "Chave Estrangeira",
    "arcLengthFieldLabel": "Comprimento de Arco",
    "lineTypeFieldLabel": "Tipo de Linha",
    "parcelPointSymbolLabel": "Símbolo de Ponto de Parcela",
    "parcelPointSymbolHintText": "Dica: Utilizado para exibir símbolos de ponto para a origem da linha.",
    "startOrRotationSymbolLabel": "Símbolo de Ponto Iniciar e Rodar",
    "startOrRotationSymbolHintText": "Dica: Utilizado para exibir o símbolo de ponto iniciar e rodar.",
    "symbolPickerPreviewText": "Pré-visualizar",
    "selectLineLayerLabel": "Selecionar Camada de Linhas"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Seleccionar Camada de Polígono",
    "selectPolygonLayerHintText": "Dica: Utilize a camada de polígonos selecionar parcela",
    "selectFieldLegendLabel": "Selecionar campos para armazenar informações de geometria de coordenadas",
    "parcelNameLabel": "Nome da Parcela",
    "rotationLabel": "Rotação",
    "planNameLabel": "Nome do Plano",
    "scalingLabel": "Dimensionar",
    "documentTypeLabel": "Tipo de Documento",
    "miscloseRatioLabel": "Rácio de Medições",
    "statedAreaLabel": "Área Estabelecida",
    "miscloseDistanceLabel": "Medições de Distância",
    "selectPolygonLayerLabelPopUp": "Selecionar Camada de Polígono",
    "honorSettingRbLabel": "Definições de Janelas Pop-up de Mapa Web",
    "customSettingsRbLabel": "Definições Personalizadas",
    "display": "Exibir",
    "edit": "Editar",
    "editpageName": "Nome",
    "actions": "Acções",
    "editpageAlias": "Nome Alternativo",
    "titleLabel": "Título da Secção"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Tipo de Linha",
    "valueLabel": "Valor",
    "symbolLabel": "Símbolo",
    "connectionLineLabel": "Linha de Ligação",
    "boundaryLineLabel": "Linha de Limite"
  },
  "closureSetting": {
    "snappingLayerLabel": "Ajustar Camadas",
    "snappingBtnLabel": "Definir",
    "snappingLayerHintText": "Dica: Selecionar camadas às quais as linhas de parcelas serão ajustadas.",
    "miscloseDistanceLabel": "Medições de Distância",
    "miscloseDistanceHintText": "Dica: Especifique medições de distância e respetivas unidades",
    "miscloseRatioLabel": "Rácio de Medições",
    "miscloseRatioHintText": "Dica: Especificar rácio de medições",
    "snappingToleranceLabel": "Tolerância de ajustamento",
    "pixelLabel": "Pixeis",
    "snappingToleranceHintText": "Dica: Especifique a tolerância de ajustamento.",
    "selectLayerLabel": "Selecionar camada"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Campo de Suporte inválido",
    "chordLengthErrMsg": "Comprimento de Corda inválido",
    "distanceFieldErrMsg": "Distância inválida",
    "sequenceIdFieldErrMsg": "Sequência inválida",
    "radiusFieldErrMsg": "Raio inválido",
    "foreignKeyFieldErrMsg": "Chave Estrangeira inválida",
    "arcLengthFieldErrMsg": "Comprimento de Arco inválido",
    "lineTypeFieldErrMsg": "Tipo de Linha inválido",
    "parcelNameFieldErrMsg": "Campo de Nome de Parcela inválido",
    "planNameFieldErrMsg": "Campo de Nome do Plano inválido",
    "scaleFieldErrMsg": "Campo Escala inválido",
    "documentTypeFieldErrMsg": "Campo Tipo de Documento inválido",
    "miscloseRatioFieldErrMsg": "Campo Rácio de Medições inválido",
    "statedAreaFieldErrMsg": "Campo Área Estabelecida inválido",
    "miscloseDistanceFieldErrMsg": "Campo Medições de Distância inválido",
    "globalIdFieldErrMsg": "A camada de polígonos selecionada não possui um campo 'esriFieldTypeGlobalID' válido.",
    "invalidPolylineLayer": "Por favor, selecione uma camada de polilinhas de parcelas válida",
    "invalidPolygonLayer": "Por favor, selecione uma camada de polígonos de parcelas válida",
    "invalidMiscloseDistance": "Por favor, introduza uma medição de distância válida",
    "invalidSnappingTolerance": "Por favor, introduza uma tolerância de ajustamento válida.",
    "invalidMiscloseRatio": "Por favor, introduza um rácio de medições válido.",
    "selectDistinctLineTypes": "Por favor, selecione um valor distinto em cada tipo de linha",
    "invalidConnectionLineType": "Valor de linha de ligação inválido",
    "invalidBoundaryLineType": "Valor de linha de limite inválido",
    "selectDistinctPolylineFields": "Por favor, selecione um campo distinto para cada valor COGO.",
    "selectDistinctPolygonFields": "Selecione um campo distinto para cada informação de geometria de coordenadas."
  }
});