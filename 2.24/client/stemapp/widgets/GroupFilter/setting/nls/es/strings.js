define({
  "configText": "Defina a continuación los grupos de filtros",
  "labels": {
    "groupName": "Nombre del grupo:",
    "groupNameTip": "Proporcione un nombre para este grupo de filtros. Este se mostrará en la lista desplegable de grupos de filtros disponibles.",
    "groupDesc": "Descripción:",
    "groupDescTip": "Proporcione una descripción para este grupo de filtros.",
    "groupOperator": "Operador predefinido:",
    "groupOperatorTip": "Opción que permite predefinir el operador del filtro. Si no se seleccione ningún operador predefinido, el filtro utilizará el operador IGUAL.",
    "groupDefault": "Valor predefinido:",
    "groupDefaultTip": "Opción que permite escribir un valor o elegir un valor existente de una capa. Haga clic en el icono Buscar para buscar capas.",
    "sameLayerAppend": "Si una capa aparece más de una vez:",
    "sameLayerConjunc": "Incorporar utilizando:",
    "caseSearch": "Realizar una búsqueda con distinción entre mayúsculas y minúsculas: ",
    "headerTextHelp": "Escribir texto para que se muestre sobre la selección de filtro"
  },
  "buttons": {
    "addNewGroup": "Agregar un grupo nuevo",
    "addNewGroupTip": "Agregar un nuevo grupo de filtros",
    "addLayer": "Añadir capa",
    "addLayerTip": "Agregar una capa al grupo de filtros"
  },
  "inputs": {
    "groupName": "Nombre del grupo de filtros",
    "groupDesc": "Descripción del grupo",
    "groupDefault": "Introducir un valor predefinido",
    "sameLayerAny": "Coincidencia con cualquier expresión",
    "sameLayerAll": "Hacer coincidir con todas las expresiones",
    "simpleMode": "Iniciar en vista simple",
    "simpleModeTip": "Simplifique la interfaz del widget. Cuando está activo, la lista desplegable de operadores y los botones para agregar criterios están ocultos.",
    "webmapAppendModeAny": "Incorporar cualquier expresión al filtro de mapa existente",
    "webmapAppendModeAll": "Incorporar todas las expresiones al filtro de mapa existente",
    "webmapAppendModeTip": "Opción que permite incorporar grupos de filtros a los filtros existentes en el mapa web",
    "persistOnClose": "Conservar los filtros después de cerrar el widget",
    "selectGroup": "Seleccione un grupo para filtrar",
    "hideDropDown": "Ocultar el encabezado y el filtro de 1 grupo",
    "hideDropDownTip": "Ocultar el encabezado y la lista desplegable si solo se configura 1 grupo de filtros",
    "optionsMode": "Ocultar las opciones del widget",
    "optionsModeTip": "Opción que permite exponer configuraciones de widget adicionales. Si está activada, se ocultan de la interfaz la opción de guardar y cargar filtros definidos y la de mantener el filtro después de cerrar el widget.",
    "optionOR": "O",
    "optionAND": "ANDY",
    "optionEQUAL": "ES IGUAL A",
    "optionNOTEQUAL": "NO ES IGUAL A",
    "optionGREATERTHAN": "MAYOR QUE",
    "optionGREATERTHANEQUAL": "MAYOR O IGUAL QUE",
    "optionLESSTHAN": "MENOR QUE",
    "optionLESSTHANEQUAL": "MENOR O IGUAL QUE",
    "optionSTART": "EMPIEZA POR",
    "optionEND": "TERMINA POR",
    "optionLIKE": "CONTIENE",
    "optionLIKESPECIFIC": "CONTIENE VALORES ESPECÍFICOS",
    "optionNOTLIKESPECIFIC": "NO CONTIENE VALORES ESPECÍFICOS",
    "optionNOTLIKE": "NO CONTIENE",
    "optionONORBEFORE": "ES EL O ANTES",
    "optionONORAFTER": "ES EL O DESPUÉS",
    "optionNONE": "NINGUNO"
  },
  "tables": {
    "layer": "Capas",
    "layerTip": "Nombre de la capa tal y como está definida en el mapa.",
    "field": "Campos",
    "fieldTip": "Campo sobre el que se filtrará la capa.",
    "value": "Usar valor",
    "valueTip": "Opción que permite utilizar los valores de la lista desplegable de la capa. Si ninguna capa utiliza este parámetro, al usuario se le presentará un cuadro de texto plano.",
    "zoomTo": "Acercar a los resultados",
    "zoomTip": "Opción que permite ampliar a la extensión de las entidades una vez aplicado el filtro",
    "action": "Eliminar",
    "actionTip": "Eliminar la capa del conjunto de filtros."
  },
  "popupHeader": {
    "label": "Elija un valor predefinido"
  },
  "errors": {
    "noGroups": "Necesita al menos un grupo.",
    "noGroupName": "Faltan uno o varios nombres de grupos.",
    "noDuplicates": "Uno o varios nombres de grupos están duplicados.",
    "noRows": "Necesita al menos una fila en la tabla.",
    "noLayers": "No hay capas en el mapa."
  },
  "picker": {
    "description": "Busque el valor predefinido para este grupo.",
    "layer": "Seleccione una capa",
    "layerTip": "Nombre de la capa tal y como está definida en el mapa web.",
    "field": "Seleccione un campo",
    "fieldTip": "Campo a partir del cual se definirá el valor predefinido.",
    "value": "Seleccione un valor",
    "valueTip": "Valor que será el predeterminado del widget."
  }
});