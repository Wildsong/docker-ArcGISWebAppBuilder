define({
  "configText": "Defina seus grupos de filtros abaixo",
  "labels": {
    "groupName": "Nome do Grupo:",
    "groupNameTip": "Forneça um nome para este grupo de filtros. Ele será exibido na lista suspensa de grupos de filtros disponíveis.",
    "groupDesc": "Descrição:",
    "groupDescTip": "Forneça uma descrição para este grupo de filtros",
    "groupOperator": "Operador Pré-Configurado:",
    "groupOperatorTip": "Opção para predefinir o operador para o filtro. Se nenhum operador predefinido for selecionado, o filtro usará o operador EQUALS.",
    "groupDefault": "Valor Pré-Configurado:",
    "groupDefaultTip": "Opção para digitar um valor ou escolher um valor existente de uma camada. Clique no ícone Pesquisar para navegar pelas camadas.",
    "sameLayerAppend": "Quando uma camada é listada mais de uma vez:",
    "sameLayerConjunc": "Anexar Utilizando:",
    "caseSearch": "Executar uma pesquisa que diferencia letra maiúscula e letra minúscula: ",
    "headerTextHelp": "Forneça o texto a ser exibido acima da seleção do filtro"
  },
  "buttons": {
    "addNewGroup": "Adicionar um Novo Grupo",
    "addNewGroupTip": "Adicionar um novo grupo de filtros",
    "addLayer": "Adicionar Camada",
    "addLayerTip": "Adicionar uma camada ao grupo de filtros"
  },
  "inputs": {
    "groupName": "Filtrar nome do grupo",
    "groupDesc": "Descrição do grupo",
    "groupDefault": "Inserir o valor predefinido",
    "sameLayerAny": "Combinar qualquer expressão",
    "sameLayerAll": "Corresponder a todas as expressões",
    "simpleMode": "Iniciar na visualização simples",
    "simpleModeTip": "Simplificar a interface do widget. Quando marcado, a lista suspensa do operador e os botões de adicionar critérios ficam ocultos.",
    "webmapAppendModeAny": "Anexar quaisquer expressões ao filtro de mapa existente",
    "webmapAppendModeAll": "Anexar todas as expressões ao filtro de mapa existente",
    "webmapAppendModeTip": "Opção para anexar grupos de filtros a filtros existentes no mapa da web",
    "persistOnClose": "Persistir filtros após o widget ser fechado",
    "selectGroup": "Selecione um Grupo para Filtrar",
    "hideDropDown": "Ocultar cabeçalho e filtro para 1 grupo",
    "hideDropDownTip": "Oculte o cabeçalho e a lista suspensa se apenas 1 grupo de filtros estiver configurado",
    "optionsMode": "Ocultar as opções do widget",
    "optionsModeTip": "Opção para expor configurações adicionais do widget. Se marcado, salvar e carregar filtros predefinidos e persistir o filtro após o fechamento do widget ficam ocultos na interface.",
    "optionOR": "OU",
    "optionAND": "E",
    "optionEQUAL": "IGUAIS",
    "optionNOTEQUAL": "NÃO IGUAL",
    "optionGREATERTHAN": "MAIOR QUE",
    "optionGREATERTHANEQUAL": "MAIOR QUE OU IGUAL",
    "optionLESSTHAN": "MENOR QUE",
    "optionLESSTHANEQUAL": "MENOR QUE OU IGUAL",
    "optionSTART": "INICIA COM",
    "optionEND": "FINALIZA COM",
    "optionLIKE": "CONTÉM",
    "optionLIKESPECIFIC": "CONTÉM VALORES ESPECÍFICOS",
    "optionNOTLIKESPECIFIC": "NÃO CONTÉM VALORES ESPECÍFICOS",
    "optionNOTLIKE": "NÃO CONTÉM",
    "optionONORBEFORE": "ESTÁ EM OU ANTES",
    "optionONORAFTER": "ESTÁ EM OU DEPOIS",
    "optionNONE": "NENHUM"
  },
  "tables": {
    "layer": "Camadas",
    "layerTip": "Nome da camada como definido no mapa.",
    "field": "Campos",
    "fieldTip": "Campo no qual a camada será filtrada.",
    "value": "Utilizar Valor",
    "valueTip": "Opção para utilizar os valores de lista suspensa da camada. Se nenhuma camada utilizar este parâmetro, uma caixa de texto plano será apresentada ao usuário.",
    "zoomTo": "Zoom para resultado",
    "zoomTip": "Opção de zoom na extensão das feições após a aplicação do filtro",
    "action": "Excluir",
    "actionTip": "Remover camada do filtro configurado."
  },
  "popupHeader": {
    "label": "Escolher um Valor Pré-Configurado"
  },
  "errors": {
    "noGroups": "Você precisa de pelo menos um grupo.",
    "noGroupName": "Um ou mais nomes de grupos estão ausentes.",
    "noDuplicates": "Um ou mais nomes de grupos estão duplicados.",
    "noRows": "Você precisa pelo menos de uma linha na tabela.",
    "noLayers": "Você não tem nenhuma camada em seu mapa."
  },
  "picker": {
    "description": "Encontrar o valor predefinido deste grupo.",
    "layer": "Selecionar uma Camada",
    "layerTip": "Nome da camada como definido no mapa da web.",
    "field": "Selecionar um Campo",
    "fieldTip": "Campo do qual o valor pré-definido será configurado.",
    "value": "Selecionar um Valor",
    "valueTip": "Valor que será o padrão do widget."
  }
});