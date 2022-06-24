define({
  "page1": {
    "selectToolHeader": "Escolha um método para selecionar registos para atualização em batch.",
    "selectToolDesc": "O widget suporta 3 métodos para gerar um conjunto selecionável de registos para atualizar. Apenas pode escolher um dos métodos. Se precisar de mais do que um destes métodos, crie uma nova instância do widget.",
    "selectByShape": "Selecionar por Área",
    "shapeTypeSelector": "Escolha as ferramentas que irão permitir a seleção de elementos no mapa",
    "shapeType": {
      "point": "Ponto",
      "line": "Linha",
      "polyline": "Polilinha",
      "freehandPolyline": "Polilinha À Mão Livre",
      "extent": "Extensão:",
      "polygon": "Polígono",
      "freehandPolygon": "Polígono À Mão Livre"
    },
    "freehandPolygon": "Polígono À Mão Livre",
    "selectBySpatQuery": "Selecionar por Elemento",
    "selectByAttQuery": "Selecionar por Elemento e Valores de Atributos Partilhados",
    "selectByQuery": "Selecionar por Consulta",
    "toolNotSelected": "Escolha um método de seleção",
    "noDrawToolSelected": "Escolha pelo menos uma ferramenta de desenho"
  },
  "page2": {
    "layersToolHeader": "Selecione as camadas a atualizar e as opções de ferramentas de seleção, se alguma.",
    "layersToolDesc": "O Tipo de Seleção que escolheu no separador anterior será usado para selecionar e atualizar elementos de um conjunto de camadas indicadas abaixo. Se selecionar mais do que uma camada para atualizar, apenas os campos comuns editáveis estarão disponíveis para atualizar. Consoante o Tipo de Seleção, serão necessárias opções adicionais.",
    "layerTable": {
      "colUpdate": "Atualização",
      "colLabel": "Camada",
      "colSelectByLayer": "Selecionar por Camada",
      "colSelectByField": "Consultar Campo",
      "colhighlightSymbol": "Destacar Símbolo"
    },
    "toggleLayers": "Alternar a visibilidade das camadas de abrir e fechar",
    "noEditableLayers": "Sem Camadas Editáveis",
    "noLayersSelected": "Seleccionar uma ou mais camadas antes de prosseguir."
  },
  "page3": {
    "commonFieldsHeader": "Selecione os campos para atualização em batch.",
    "commonFieldsDesc": "Apenas os campos editáveis comuns serão apresentados abaixo. Selecione os campos que pretende atualizar. Se os campos que partilham o mesmo nome de campo forem encontrados em camadas diferentes, mas tiverem domínios diferentes, apenas um domínio poderá ser usado.",
    "noCommonFields": "Sem Campos Comuns",
    "fieldTable": {
      "colEdit": "Editável",
      "colName": "Nome",
      "colAlias": "Nome Alternativo",
      "colAction": "Acções"
    }
  },
  "tabs": {
    "selection": "Sefinir Tipo de Seleção",
    "layers": "Definir Camada(s) a Atualizar",
    "fields": "Definir Campo(s) a Atualizar"
  },
  "errorOnOk": "Preencha todos os parâmetros antes de guardar a configuração",
  "next": "Seguinte",
  "back": "Retroceder",
  "save": "Guardar Símbolo",
  "cancel": "Cancelar",
  "ok": "OK",
  "symbolPopup": "Seletor de Símbolos",
  "editHeaderText": "Texto a exibir na parte superior do widget",
  "widgetIntroSelectByArea": "Utilize uma das ferramentas abaixo para criar um conjunto selecionado de elementos a atualizar. Se a linha estiver <font class='maxRecordInIntro'>realçada</font>, o número máximo de registos foi excedido.",
  "widgetIntroSelectByFeature": "Use a ferramenta abaixo para selecionar um elemento a partir da camada <font class='layerInIntro'>${0}</font>. Este elemento será utilizado para selecionar e atualizar todos os elementos de intersecção. Se a linha estiver <font class='maxRecordInIntro'>destacada</font>, o número máximo de registos foi excedido.",
  "widgetIntroSelectByFeatureQuery": "Utilize a ferramenta abaixo para selecionar um elemento a partir de <font class='layerInIntro'>${0}</font> . Este atributo <font class='layerInIntro'>${1}</font> do elemento será utilizado para consultar as camadas abaixo e atualizar os elementos resultantes. Se a linha estiver <font class='maxRecordInIntro'>realçada</font>, o número máximo de registos foi excedido.",
  "widgetIntroSelectByQuery": "Introduza um valor para criar um conjunto de seleções. Se a linha estiver <font class='maxRecordInIntro'>realçada</font>, o número máximo de registos foi excedido."
});