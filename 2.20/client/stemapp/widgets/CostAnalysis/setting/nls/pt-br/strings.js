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
  "configText": "Definir texto de configuração:",
  "generalSettings": {
    "tabTitle": "Configurações gerais",
    "measurementUnitLabel": "Unidade de Custo",
    "currencyLabel": "Símbolo de Custo",
    "roundCostLabel": "Arredondar Custo",
    "projectOutputSettings": "Configurações da Saída do Projeto",
    "typeOfProjectAreaLabel": "Tipo de Área do Projeto",
    "bufferDistanceLabel": "Distância do Buffer",
    "csvReportExportLabel": "Permitir ao usuário exportar o relatório do projeto",
    "editReportSettingsBtnTooltip": "Editar configurações do relatório",
    "roundCostValues": {
      "twoDecimalPoint": "Dois Pontos Decimais",
      "nearestWholeNumber": "Número Inteiro Mais Próximo",
      "nearestTen": "Dez mais próximo",
      "nearestHundred": "Cem mais próximo",
      "nearestThousand": "Milhares mais próximos",
      "nearestTenThousands": "Dez Milhares mais próximos"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Configurações do Relatório",
      "reportNameLabel": "Nome do relatório (opcional):",
      "checkboxLabel": "Mostrar",
      "layerTitle": "Título",
      "columnLabel": "Rótulo",
      "duplicateMsg": "Rótulo duplicado"
    },
    "projectAreaType": {
      "outline": "Contorno",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unidade de moeda corrente inválida",
      "bufferDistance": "Distância de buffer inválida",
      "outOfRangebufferDistance": "O valor deve ser maior que 0 e menor ou igual a 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Configurações do projeto",
    "costingGeometrySectionTitle": "Definir geografia para custo (opcional)",
    "costingGeometrySectionNote": "Nota: Configurar esta camada permitirá ao usuário configurar equações de custo dos modelos de feição baseado em geografias.",
    "projectTableSectionTitle": "Habilidade de Salvar/Carregar configurações do projeto (opcional)",
    "projectTableSectionNote": "Nota:Configurar todas as tabelas e camadas permitirá ao usuário salvar/carregar o projeto para uso posterior.",
    "costingGeometryLayerLabel": "Camada da Geometria de Custo",
    "fieldLabelGeography": "Campo para Geografia de Rótulo",
    "projectAssetsTableLabel": "Tabela de Recursos do Projeto",
    "projectMultiplierTableLabel": "Tabela do Custo de Multiplicador Adicional do Projeto",
    "projectLayerLabel": "Camada de Projeto",
    "configureFieldsLabel": "Configurar Campos",
    "fieldDescriptionHeaderTitle": "Descrição do Campo",
    "layerFieldsHeaderTitle": "Campo de Camada",
    "selectLabel": "Selecionar",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} já foi selecionado",
      "invalidConfiguration": "Selecione ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Camadas de polígono com as seguintes condições serão mostradas: <br/> <li> A camada deve ter o recurso 'Consultar'</li> <li> A camada deve ter um campo GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Campos de string e numéricos de 'Camada da Geometria de Custo' selecionada serão exibidos na lista suspensa 'Campo para Geografia do Rótulo'.</p>",
    "projectAssetsTableHelp": "<p>As tabelas com as seguintes condições serão mostradas: <br/> <li>A tabela deve ter recursos de edição, isto é 'Criar', 'Excluir' e 'Atualizar'</li> <li>A tabela deve ter seis campos com nome exato e tipo de dados:</li><ul> <li>AssetGUID (campo do tipo GUID)</li><li> CostEquation (tipo de string campo)</li><li> Cenário (campo do tipo String)</li><li> TemplateName (campo do tipo String)</li><li> GeographyGUID (campo tipo GUID)</li><li> ProjectGUID (campo tipo GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>As tabelas com as seguintes condições serão mostradas: <br/> <li>A tabela deve ter recursos de edição, insto é 'Criar', 'Excluir' e 'Atualizar'</li> <li>A tabela deve ter cinco campos com nome exato e tipo de dados:</li><ul><li> Descrição (campo do tipo String)</li><li> Tipo (tipo String campo)</li><li> Valor (campo tipo flutuante/duplo)</li><li> Índice de custo (campo tipo inteiro)</li><li> ProjectGUID (campo tipo GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Camada(s) de polígono com as seguintes condições serão mostradas: <br/> <li>A camada deve ter recursos de edição, isto é 'Criar', 'Excluir' e 'Atualizar'</li> <li>A camada deve ter cinco campos com nome exato e tipo de dados:</li><ul><li> ProjectName (campo do tipo String)</li><li> Descrição (String campo tipo)</li><li> Totalassetcost (campo tipo Flutuante/Duplo)</li><li> Grossprojectcost (campo tipo Flutuante/Duplo)</li><li> GlobalID (campo tipo GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centróide da Camada de Ponto",
    "selectRelatedPointLayerDefaultOption": "Selecionar",
    "pointLayerHintText": "<p>As camadas de ponto com as condições seguintes serão exibidas: <br/> <li>\tA camada deve ter o campo 'Projectid' (tipo GUID) </li><li>\tA camada deve ter recursos de edição, isto é, 'Criar', 'Excluir' e 'Atualizar'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Configurações da camada",
    "layerNameHeaderTitle": "Nome da Camada",
    "layerNameHeaderTooltip": "Lista de camadas no mapa",
    "EditableLayerHeaderTitle": "Editável",
    "EditableLayerHeaderTooltip": "Incluir camada e seus modelos no widget de custo",
    "SelectableLayerHeaderTitle": "Selecionável",
    "SelectableLayerHeaderTooltip": "A geometria da feição pode ser utilizada para gerar um novo item de custo",
    "fieldPickerHeaderTitle": "ID de Projeto (opcional)",
    "fieldPickerHeaderTooltip": "Campo opcional (de tipo string) para armazenar o ID de Projeto em",
    "selectLabel": "Selecionar",
    "noAssetLayersAvailable": "Nenhuma camada de recurso localizada no mapa da web selecionado",
    "disableEditableCheckboxTooltip": "Esta camada não tem nenhum recurso de edição",
    "missingCapabilitiesMsg": "Esta camada está sem os seguintes recursos:",
    "missingGlobalIdMsg": "Esta camada não tem o campo de GlobalId",
    "create": "Criar",
    "update": "Atualizar",
    "deleteColumnLabel": "Excluir",
    "attributeSettingHeaderTitle": "Configurações de Atributo",
    "addFieldLabelTitle": "Adicionar Atributos",
    "layerAttributesHeaderTitle": "Atributos da Camada",
    "projectLayerAttributesHeaderTitle": "Atributos da Camada de Projeto",
    "attributeSettingsPopupTitle": "Configurações de Atributo da Camada"
  },
  "costingInfo": {
    "tabTitle": "Info de Custo",
    "proposedMainsLabel": "Principais Propostos",
    "addCostingTemplateLabel": "Adicionar Modelo de Custo",
    "manageScenariosTitle": "Gerenciar Cenários",
    "featureTemplateTitle": "Modelo de Feição",
    "costEquationTitle": "Equação de Custo",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Cenário",
    "actionTitle": "Ações",
    "scenarioNameLabel": "Nome de Cenário",
    "addBtnLabel": "Adicionar",
    "srNoLabel": "Não.",
    "deleteLabel": "Excluir",
    "duplicateScenarioName": "Nome de cenário duplicado",
    "hintText": "<div>Sugestão: Utilize as palavras-chaves seguintes</div><ul><li><b>{TOTALCOUNT}</b>: Utilize o número total do mesmo tipo de recurso em uma geografia</li> <li><b>{MEASURE}</b> Utilize o comprimento do recurso de linha e área do recurso de polígono</li><li><b>{TOTALMEASURE}</b>: Utilize o comprimento total do recurso de linha e área do recurso de polígono do mesmo tipo em uma geografia</li></ul> Você pode utilizar funções como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Edite a equação de custo pela necessidade do seu projeto.",
    "noneValue": "Nenhum",
    "requiredCostEquation": "Equação de custo inválida para ${layerName}: ${templateName}",
    "duplicateTemplateMessage": "A entrada de modelo duplicada existe para ${layerName}: ${templateName}",
    "defaultEquationRequired": "A equação padrão é exigida ${layerName}: ${templateName}",
    "validCostEquationMessage": "Insira equação de custo válida",
    "costEquationHelpText": "Edite a equação de custo pela necessidade do seu projeto",
    "scenarioHelpText": "Selecione o cenário pela necessidade do seu projeto",
    "copyRowTitle": "Copiar Linha",
    "noTemplateAvailable": "Adicione pelo menos um modelo para ${layerName}",
    "manageScenarioLabel": "Gerenciar cenário",
    "noLayerMessage": "Insira pelo menos uma camada no ${tabName}",
    "noEditableLayersAvailable": "As camadas precisam para ser marcadas como editáveis em guia de configurações da camada",
    "updateProjectCostCheckboxLabel": "Atualizar equações do projeto",
    "updateProjectCostEquationHint": "Dica: Isto permitirá que o usuário atualize equações de custo de recursos á adicionados em projetos existentes com as novas equações definidas abaixo com base no modelo de feição, na geografia e no cenário. Se a combinação não for encontrada, ela será definida como a equação de custo padrão, ou seja, geografia e cenário como 'Nenhum'. No caso de modelo da feição removido, o custo será definido como 0."
  },
  "statisticsSettings": {
    "tabTitle": "Configurações adicionais",
    "addStatisticsLabel": "Adicionar Estatísticas",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Rótulo",
    "addNewStatisticsText": "Adicionar Novas Estatísticas",
    "deleteStatisticsText": "Excluir Estatísticas",
    "moveStatisticsUpText": "Mover Estatísticas Para Cima",
    "moveStatisticsDownText": "Mover Estatísticas Para Baixo",
    "selectDeselectAllTitle": "Selecionar Tudo"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Adicionar Custo de Projeto Adicional",
    "additionalCostValueColumnHeader": "Valor",
    "invalidProjectCostMessage": "Entrada inválida para o custo de projeto",
    "additionalCostLabelColumnHeader": "Rótulo",
    "additionalCostTypeColumnHeader": "Tipo"
  },
  "statisticsType": {
    "countLabel": "Contagem",
    "averageLabel": "Média",
    "maxLabel": "Máximo",
    "minLabel": "Mínimo",
    "summationLabel": "Adição",
    "areaLabel": "Área",
    "lengthLabel": "Comprimento"
  }
});