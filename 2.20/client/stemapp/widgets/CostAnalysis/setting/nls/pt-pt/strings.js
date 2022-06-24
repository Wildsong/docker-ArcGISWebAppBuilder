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
  "configText": "Definir texto de config:",
  "generalSettings": {
    "tabTitle": "Configurações gerais",
    "measurementUnitLabel": "Unidade de Custo",
    "currencyLabel": "Símbolo de Custo",
    "roundCostLabel": "Custo Arredondado",
    "projectOutputSettings": "Definições de Saída de Projeto",
    "typeOfProjectAreaLabel": "Tipo de Área de Projeto",
    "bufferDistanceLabel": "Distância do Buffer",
    "csvReportExportLabel": "Permitir ao utilizador exportar relatório do projeto",
    "editReportSettingsBtnTooltip": "Editar definições de relatórios",
    "roundCostValues": {
      "twoDecimalPoint": "Duas Casas Decimais",
      "nearestWholeNumber": "Número Inteiro Mais Próximo",
      "nearestTen": "Dezena Mais Próxima",
      "nearestHundred": "Centena Mais Próxima",
      "nearestThousand": "Milhares Mais Próximos",
      "nearestTenThousands": "Dezenas de Milhar Mais Próximas"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Definições de Relatório",
      "reportNameLabel": "Nome do relatório (opcional):",
      "checkboxLabel": "Exibir",
      "layerTitle": "Título",
      "columnLabel": "Rótulo",
      "duplicateMsg": "Rótulo duplicado"
    },
    "projectAreaType": {
      "outline": "Contorno",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unidade monetária inválida",
      "bufferDistance": "Distância de buffer inválida",
      "outOfRangebufferDistance": "O valor tem de ser maior do que 0 e menor ou igual a 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Definições do projeto",
    "costingGeometrySectionTitle": "Definir geografia para orçamento (opcional)",
    "costingGeometrySectionNote": "Nota: Configurar esta camada permitirá ao utilizador definir equações de custos de modelos de elementos com base em geografias.",
    "projectTableSectionTitle": "Funcionalidade de Guardar/Carregar definições de projeto (opcional)",
    "projectTableSectionNote": "Nota: Configurar todas as tabelas e camadas permitirá ao utilizador guardar/carregar projeto para utilização posterior.",
    "costingGeometryLayerLabel": "Camada de Geometria de Orçamento",
    "fieldLabelGeography": "Campo para Rotular Geografia",
    "projectAssetsTableLabel": "Tabela de Ativos do Projeto",
    "projectMultiplierTableLabel": "Tabela de Custos Adicionais Multiplicadora do Projeto",
    "projectLayerLabel": "Camada de Projeto",
    "configureFieldsLabel": "Configurar Campos",
    "fieldDescriptionHeaderTitle": "Descrição de Campo",
    "layerFieldsHeaderTitle": "Campo de Camada",
    "selectLabel": "Seleccionar",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} já se encontra selecionada",
      "invalidConfiguration": "Por favor, selecione ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Camada(s) de polígonos com as seguintes condições será(ão) exibida(s): <br/> <li> A camada tem de ter a funcionalidade 'Consulta'</li><li> A camada tem de ter um campo GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>As strings e os campos numéricos da 'Camada de Geometria de Custos' serão exibidos no menu pendente 'Campo para Rotular Geografia'.</p>",
    "projectAssetsTableHelp": "<p>Tabela(s) com as seguintes condições será(ão) exibida(s): <br/> <li>A tabela tem de ter funcionalidades de edição, nomeadamente, 'Criar', 'Eliminar' e 'Atualizar'</li> <li>A tabela tem de ter seis campos com o nome e tipo de dados exatos:</li><ul><li> AssetGUID (tipo de campo GUID)</li><li> CostEquation (tipo de campo String)</li><li> Cenário (tipo de campo String)</li><li> TemplateName (tipo de campo String)</li><li> GeographyGUID (tipo de campo GUID)</li><li> ProjectGUID (tipo de campo GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabela(s) com as seguintes condições será(ão) exibida(s):<br/> <li>A tabela tem de ter funcionalidades de edição, nomeadamente, 'Criar', 'Eliminar' e 'Atualizar'</li> <li>A tabela tem de ter cinco campos com o nome e tipo de dados exatos:</li><ul><li> Descrição (tipo de campo String)</li><li> Tipo (tipo de campo String)</li><li> Valor (tipo de campo Float/Double)</li><li> Costindex (tipo de campo Inteiro)</li><li> ProjectGUID (tipo de campo GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>A(s) camada(s) de polígono(s) com as seguintes condições será(ão) exibida(s): <br/> <li>A camada tem de ter funcionalidades de edição, nomeadamente, 'Criar', 'Eliminar' e ''Atualizar'</li> <li>A camada tem de ter cinco campos com o nome e tipo de dados exatos:</li><ul><li>ProjectName (tipo de campo String)</li><li>Descrição (tipo de campo String)</li><li>Totalassetcost (tipo de campo Float/Double)</li><li>Grossprojectcost (tipo de campo Float/Double)</li><li>GlobalID (tipo de campo GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centroide de Camada de Pontos",
    "selectRelatedPointLayerDefaultOption": "Seleccionar",
    "pointLayerHintText": "<p>A(s) camada(s) de pontos com as seguintes condições será(ão) apresentada(s): <br/> <li>\tA camada deve conter o campo 'Projectid' (tipo de GUID)</li><li>\tA camada deve ter capacidades de edição, nomeadamente 'Criar', 'Eliminar' e 'Atualizar'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Configurações de Camada",
    "layerNameHeaderTitle": "Nome da camada",
    "layerNameHeaderTooltip": "Lista de camadas no mapa",
    "EditableLayerHeaderTitle": "Editável",
    "EditableLayerHeaderTooltip": "Incluir camada e respetivos modelos no widget de orçamento",
    "SelectableLayerHeaderTitle": "Selecionável",
    "SelectableLayerHeaderTooltip": "A geometria do elemento pode ser utilizada para gerar um novo item de custo",
    "fieldPickerHeaderTitle": "Project ID (opcional)",
    "fieldPickerHeaderTooltip": "Campo opcional (do tipo string) onde armazenar a Project ID",
    "selectLabel": "Seleccionar",
    "noAssetLayersAvailable": "Não foi encontrada quaisquer camadas de ativos no mapa web selecionado",
    "disableEditableCheckboxTooltip": "Esta camada não tem funcionalidades de edição",
    "missingCapabilitiesMsg": "Esta camada tem as seguintes funcionalidades em falta:",
    "missingGlobalIdMsg": "Esta camada não possui campo GlobalId",
    "create": "Criar",
    "update": "Atualizar",
    "deleteColumnLabel": "Excluir",
    "attributeSettingHeaderTitle": "Definições de Atributos",
    "addFieldLabelTitle": "Adicionar Atributos",
    "layerAttributesHeaderTitle": "Atributos de Camada",
    "projectLayerAttributesHeaderTitle": "Atributos da Camada de Projeto",
    "attributeSettingsPopupTitle": "Definições de Atributo de Camada"
  },
  "costingInfo": {
    "tabTitle": "Info de Orçamento",
    "proposedMainsLabel": "Circuitos Propostos",
    "addCostingTemplateLabel": "Adicionar Modelo de Orçamento",
    "manageScenariosTitle": "Gerir Cenário",
    "featureTemplateTitle": "Modelo de Elemento",
    "costEquationTitle": "Equação de Custo",
    "geographyTitle": "Geografia",
    "scenarioTitle": "Cenário",
    "actionTitle": "Ações",
    "scenarioNameLabel": "Nome do Cenário",
    "addBtnLabel": "Adicionar",
    "srNoLabel": "Não.",
    "deleteLabel": "Excluir",
    "duplicateScenarioName": "Nome de cenário duplicado",
    "hintText": "<div>Pista: Utilize as seguintes palavras-chave</div><ul><li><b>{TOTALCOUNT}</b>: Utiliza o número total de ativos do mesmo tipo numa geografia</li><li><b>{MEASURE}</b>: Utiliza o comprimento para ativo de linha e área para ativo de polígono</li><li><b>{TOTALMEASURE}</b>: Utiliza o comprimento para ativo de linha e área para ativo de polígono do mesmo tipo numa geografia</li></ul>Pode utilizar funções como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Por favor, edite a equação de custo à medida das necessidades do seu projeto.",
    "noneValue": "Nenhum",
    "requiredCostEquation": "Equação de custo inválida para ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Existe uma entrada de modelo duplicada para ${layerName} : ${templateName}",
    "defaultEquationRequired": "É necessária uma equação predefinida para ${layerName} : ${templateName}",
    "validCostEquationMessage": "Por favor, introduza uma equação de custo válida",
    "costEquationHelpText": "Por favor, edite a equação de custo à medida das necessidades do seu projeto",
    "scenarioHelpText": "Por favor, selecione o cenário à medida das necessidades do seu projeto",
    "copyRowTitle": "Copiar Linha",
    "noTemplateAvailable": "Por favor, adicione pelo menos um template para ${layerName}",
    "manageScenarioLabel": "Gerir Cenário",
    "noLayerMessage": "Por favor, introduza pelo menos uma layer em ${tabName}",
    "noEditableLayersAvailable": "As camada(s) necessitam de ser definidas como editáveis no separador de definições de camada",
    "updateProjectCostCheckboxLabel": "Atualizar equações do projeto",
    "updateProjectCostEquationHint": "Dica: isto irá permitir ao utilizador atualizar as equações de custo de ativos já adicionados a projetos existentes com as novas equações definidas abaixo com base no modelo de elementos, geografia e cenário. Se a combinação não for encontrada, será selecionada a equação de custo predefinida, ou seja, geografia e cenário como 'Nenhum'. No caso de um modelo de elementos removido, o custo será definido como 0."
  },
  "statisticsSettings": {
    "tabTitle": "Definições adicionais",
    "addStatisticsLabel": "Adicionar Estatística",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Rótulo",
    "addNewStatisticsText": "Adicionar Nova Estatística",
    "deleteStatisticsText": "Eliminar Estatística",
    "moveStatisticsUpText": "Mover Estatísticas Para Cima",
    "moveStatisticsDownText": "Mover Estatísticas Para Baixo",
    "selectDeselectAllTitle": "Selecionar Tudo"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Adicionar Custo de Projeto Adicional",
    "additionalCostValueColumnHeader": "Valor",
    "invalidProjectCostMessage": "Entrada Inválida para custo de projeto",
    "additionalCostLabelColumnHeader": "Rótulo",
    "additionalCostTypeColumnHeader": "Tipo"
  },
  "statisticsType": {
    "countLabel": "Contagem",
    "averageLabel": "Média",
    "maxLabel": "Máximo",
    "minLabel": "Mínimo",
    "summationLabel": "Somatório",
    "areaLabel": "Área",
    "lengthLabel": "Comprimento"
  }
});