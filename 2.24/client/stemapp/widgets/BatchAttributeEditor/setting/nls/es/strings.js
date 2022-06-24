define({
  "page1": {
    "selectToolHeader": "Elige un método para seleccionar los registros para una actualización por lotes.",
    "selectToolDesc": "El widget admite 3 métodos para generar un conjunto seleccionado de registros con el fin de actualizarlos. Solo puede elegir uno de los métodos. Si necesita más de uno, cree una instancia nueva del widget.",
    "selectByShape": "Seleccionar por área",
    "shapeTypeSelector": "Elija las herramientas que quiera permitir para seleccionar entidades en el mapa",
    "shapeType": {
      "point": "Punto",
      "line": "Línea",
      "polyline": "Polilínea",
      "freehandPolyline": "Polilínea a mano alzada",
      "extent": "Extensión",
      "polygon": "Polígono",
      "freehandPolygon": "Polígono a mano alzada"
    },
    "freehandPolygon": "Polígono a mano alzada",
    "selectBySpatQuery": "Seleccionar por entidad",
    "selectByAttQuery": "Seleccionar por entidad y valores de atributos compartidos",
    "selectByQuery": "Seleccionar por consulta",
    "toolNotSelected": "Elija un método de selección",
    "noDrawToolSelected": "Elija al menos una herramienta de dibujo"
  },
  "page2": {
    "layersToolHeader": "Selecciona las capas que se deben actualizar y las opciones de las herramientas de selección, si las hay.",
    "layersToolDesc": "El tipo de selección que ha elegido en la pestaña anterior se utilizará para seleccionar y actualizar las entidades del conjunto de capas que se indica a continuación. Si marca más de una capa para actualizar, solo los campos editables comunes estarán disponibles para actualizar. En función del tipo de selección, se necesitarán opciones adicionales.",
    "layerTable": {
      "colUpdate": "Actualización",
      "colLabel": "Capa",
      "colSelectByLayer": "Seleccionar por capa",
      "colSelectByField": "Campo de consulta",
      "colhighlightSymbol": "Resaltar símbolo"
    },
    "toggleLayers": "Alternar la visibilidad de las capas al abrir y cerrar",
    "noEditableLayers": "No hay capas editables",
    "noLayersSelected": "Selecciona una o varias capas antes de continuar."
  },
  "page3": {
    "commonFieldsHeader": "Selecciona los campos que desees actualizar por lotes.",
    "commonFieldsDesc": "A continuación solo se mostrarán los campos editables comunes. Seleccione los campos que desea actualizar. Si se encuentran campos con el mismo nombre en distintas capas, pero tienen dominios diferentes, solo se puede usar un dominio.",
    "noCommonFields": "No hay campos comunes",
    "fieldTable": {
      "colEdit": "Editable",
      "colName": "Nombre",
      "colAlias": "Alias",
      "colAction": "Acciones"
    }
  },
  "tabs": {
    "selection": "Definir tipo de selección",
    "layers": "Definir capas para actualizar",
    "fields": "Definir campos para actualizar"
  },
  "errorOnOk": "Rellene todos los parámetros antes de guardar la configuración",
  "next": "Siguiente",
  "back": "Atrás",
  "save": "Guardar símbolo",
  "cancel": "Cancelar",
  "ok": "Aceptar",
  "symbolPopup": "Selector de símbolos",
  "editHeaderText": "Texto que se va a visualizar en la parte superior del widget",
  "widgetIntroSelectByArea": "Use una de las siguientes herramientas para crear un conjunto seleccionado de entidades para actualizar.  Si la fila está <font class='maxRecordInIntro'>resaltada</font>, quiere decir que se ha excedido el número máximo de registros.",
  "widgetIntroSelectByFeature": "Utilice la herramienta que aparece a continuación para seleccionar una entidad de la capa <font class='layerInIntro'>${0}</font>. Esta entidad se utilizará para seleccionar y actualizar todas las entidades de intersección. Si la fila está <font class='maxRecordInIntro'>resaltada</font>, quiere decir que se ha excedido el número máximo de registros.",
  "widgetIntroSelectByFeatureQuery": "Utilice la herramienta que aparece a continuación para seleccionar una entidad de <font class='layerInIntro'>${0}</font>.  El atributo <font class='layerInIntro'>${1}</font> de esta entidad se utilizará para consultar las siguientes capas y actualizar las entidades resultantes.  Si la fila está <font class='maxRecordInIntro'>resaltada</font>, quiere decir que se ha excedido el número máximo de registros.",
  "widgetIntroSelectByQuery": "Introduzca un valor para crear un conjunto de selección.  Si la fila está <font class='maxRecordInIntro'>resaltada</font>, quiere decir que se ha excedido el número máximo de registros."
});