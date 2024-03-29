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
  "configText": "Definir texto de configuración:",
  "generalSettings": {
    "tabTitle": "Configuración general",
    "measurementUnitLabel": "Unidad de coste",
    "currencyLabel": "Símbolo de coste",
    "roundCostLabel": "Redondear coste",
    "projectOutputSettings": "Configuración de salida del proyecto",
    "typeOfProjectAreaLabel": "Tipo de área del proyecto",
    "bufferDistanceLabel": "Distancia de zona de influencia",
    "csvReportExportLabel": "Permitir al usuario exportar el informe del proyecto",
    "editReportSettingsBtnTooltip": "Editar la configuración del informe",
    "roundCostValues": {
      "twoDecimalPoint": "Dos puntos decimales",
      "nearestWholeNumber": "Número entero más cercano",
      "nearestTen": "Decena más cercana",
      "nearestHundred": "Centena más cercana",
      "nearestThousand": "Unidad de millar más cercana",
      "nearestTenThousands": "Decena de millar más cercana"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Ajustes de informe",
      "reportNameLabel": "Nombre de informe (opcional):",
      "checkboxLabel": "Mostrar",
      "layerTitle": "Título",
      "columnLabel": "Etiqueta",
      "duplicateMsg": "Etiqueta duplicada"
    },
    "projectAreaType": {
      "outline": "Lista",
      "buffer": "Zona de influencia"
    },
    "errorMessages": {
      "currency": "Divisa no válida",
      "bufferDistance": "Distancia de zona de influencia no válida",
      "outOfRangebufferDistance": "El valor debe ser mayor que 0 y menor o igual que 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Configuración del proyecto",
    "costingGeometrySectionTitle": "Definir geografía para el cálculo de costes (opcional)",
    "costingGeometrySectionNote": "Nota: Al configurar esta capa, el usuario podrá establecer ecuaciones de costes para plantillas de entidades basadas en geografías.",
    "projectTableSectionTitle": "Posibilidad de Guardar/Cargar configuración del proyecto (opcional)",
    "projectTableSectionNote": "Nota: Al configurar todas las tablas y capas, el usuario podrá guardar/cargar el proyecto para un uso posterior.",
    "costingGeometryLayerLabel": "Capa de geometría para cálculo de costes",
    "fieldLabelGeography": "Campo a etiquetar geografía",
    "projectAssetsTableLabel": "Tabla de activos del proyecto",
    "projectMultiplierTableLabel": "Tabla de costes adicionales multiplicadora del proyecto",
    "projectLayerLabel": "Capa del proyecto",
    "configureFieldsLabel": "Configurar campos",
    "fieldDescriptionHeaderTitle": "Descripción de campo",
    "layerFieldsHeaderTitle": "Campo de capa",
    "selectLabel": "Seleccionar",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} ya se ha seleccionado",
      "invalidConfiguration": "Seleccione ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Se mostrarán las capas poligonales que reúnan las siguientes condiciones: <br/> <li> La capa debe tener la capacidad \"Consulta\"</li><li> La capa deber tener un campo GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>La cadena y los campos numéricos de la \"Capa de geometría para cálculo de costes\" seleccionada aparecerán en la lista desplegable \"Campo a etiquetar geografía\".</p>",
    "projectAssetsTableHelp": "<p>Se mostrarán las tablas que reúnan las siguientes condiciones: <br/> <li>La tabla debe tener capacidades de edición, es decir, \"Crear\", \"Eliminar\" y \"Actualizar\"</li> <li>La tabla debe contener seis campos con nombre y tipo de datos exactos:</li><ul><li> AssetGUID (campo tipo GUID)</li><li> CostEquation (campo tipo cadena)</li><li> Scenario (campo tipo cadena)</li><li> TemplateName (campo tipo cadena)</li><li> GeographyGUID (campo tipo GUID)</li><li> ProjectGUID (campo tipo GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Se mostrarán las tablas que reúnan las siguientes condiciones: <br/> <li>La tabla debe tener capacidades de edición, es decir, 'Crear', 'Eliminar' y 'Actualizar'</li> <li>La tabla debe contener cinco campos con nombre y tipo de datos exactos:</li><ul><li> Description (campo tipo cadena)</li><li> Type (campo tipo cadena)</li><li> Value (campo tipo Flotante/Doble)</li><li> Costindex (campo tipo Entero)</li><li> ProjectGUID (campo tipo GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>Se mostrarán las capas poligonales que reúnan las siguientes condiciones: <br/> <li>La tabla debe tener capacidades de edición, es decir, \"Crear\", \"Eliminar\" y \"Actualizar\"</li> <li>La capa debe contener cinco campos con nombre y tipo de datos exactos:</li><ul><li>ProjectName (campo tipo cadena)</li><li>Description (campo tipo cadena)</li><li>Totalassetcost (campo tipo Flotante/Doble)</li><li>Grossprojectcost (campo tipo Flotante/Doble)</li><li>GlobalID (campo tipo GUID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centroide de capa de puntos",
    "selectRelatedPointLayerDefaultOption": "Seleccionar",
    "pointLayerHintText": "<p>Se mostrarán las capas de puntos que reúnan las siguientes condiciones: <br/> <li>\tLa capa debe tener el campo 'Projectid' (tipo GUID)</li><li>\tLa capa debe presentar capacidades de edición, concretamente 'Crear', 'Eliminar' y 'Actualizar'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Configuración de capa",
    "layerNameHeaderTitle": "Nombre de capa",
    "layerNameHeaderTooltip": "Lista de capas del mapa",
    "EditableLayerHeaderTitle": "Editable",
    "EditableLayerHeaderTooltip": "Incluir la capa y sus plantillas en el widget de cálculo de costes",
    "SelectableLayerHeaderTitle": "Seleccionable",
    "SelectableLayerHeaderTooltip": "La geometría de la entidad se puede utilizar para generar un nuevo elemento de coste",
    "fieldPickerHeaderTitle": "Id. del proyecto (opcional)",
    "fieldPickerHeaderTooltip": "Campo opcional (de tipo cadena) para almacenar el Id. del proyecto en",
    "selectLabel": "Seleccionar",
    "noAssetLayersAvailable": "No se ha encontrado ninguna capa de activos en el mapa web seleccionado",
    "disableEditableCheckboxTooltip": "Esta capa no tiene capacidades de edición",
    "missingCapabilitiesMsg": "Faltan las siguientes capacidades en esta capa:",
    "missingGlobalIdMsg": "Esta capa no tiene ningún campo GlobalId",
    "create": "Crear",
    "update": "Actualizar",
    "deleteColumnLabel": "Eliminar",
    "attributeSettingHeaderTitle": "Configuración de atributos",
    "addFieldLabelTitle": "Agregar atributos",
    "layerAttributesHeaderTitle": "Atributos de capa",
    "projectLayerAttributesHeaderTitle": "Atributos de la capa de proyecto",
    "attributeSettingsPopupTitle": "Configuración de atributos de capa"
  },
  "costingInfo": {
    "tabTitle": "Información de cálculo de costes",
    "proposedMainsLabel": "Red propuesta",
    "addCostingTemplateLabel": "Agregar plantilla de cálculo de costes",
    "manageScenariosTitle": "Administrar escenarios",
    "featureTemplateTitle": "Plantilla de entidad",
    "costEquationTitle": "Ecuación de costes",
    "geographyTitle": "Geografía",
    "scenarioTitle": "Escenario",
    "actionTitle": "Acciones",
    "scenarioNameLabel": "Nombre de escenario",
    "addBtnLabel": "Agregar",
    "srNoLabel": "N.º",
    "deleteLabel": "Eliminar",
    "duplicateScenarioName": "Duplicar nombre de escenario",
    "hintText": "<div>Sugerencia: Utilice las siguientes palabras clave</div><ul><li><b>{TOTALCOUNT}</b>: Usa el número total de activos del mismo tipo dentro de una geografía</li><li><b>{MEASURE}</b>: Usa la longitud para activos lineales y el área para activos poligonales</li><li><b>{TOTALMEASURE}</b>: Usa la longitud total para los activos lineales y el área total para los activos poligonales del mismo tipo dentro de una geografía</li></ul>Puede usar funciones tales como:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Edite la ecuación de costes según las necesidades de su proyecto.",
    "noneValue": "Ninguna",
    "requiredCostEquation": "Ecuación de costes no válida para ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "La entrada de plantilla duplicada ya existe para ${layerName} : ${templateName}",
    "defaultEquationRequired": "Se requiere la ecuación predeterminada para ${layerName} : ${templateName}",
    "validCostEquationMessage": "Introduzca una ecuación de costes válida",
    "costEquationHelpText": "Edite la ecuación de costes según las necesidades de su proyecto",
    "scenarioHelpText": "Seleccione el escenario según las necesidades de su proyecto",
    "copyRowTitle": "Copiar fila",
    "noTemplateAvailable": "Agregue al menos una plantilla para ${layerName}",
    "manageScenarioLabel": "Administrar escenario",
    "noLayerMessage": "Introduzca al menos una capa en ${tabName}",
    "noEditableLayersAvailable": "Es necesario marcar la capa como editable en la pestaña de configuración de la capa",
    "updateProjectCostCheckboxLabel": "Actualizar ecuaciones del proyecto",
    "updateProjectCostEquationHint": "Sugerencia: Permitirá al usuario actualizar ecuaciones de costes de activos ya agregados a proyectos existentes con las nuevas ecuaciones definidas abajo según la plantilla de entidad, la geografía y el escenario. Si no se encuentra la combinación, se establecerá en la ecuación de coste predeterminada, es decir, geografía y escenario como 'Ninguno'. Si se elimina la plantilla de entidad, el coste se establecerá en 0."
  },
  "statisticsSettings": {
    "tabTitle": "Configuración adicional",
    "addStatisticsLabel": "Agregar estadísticas",
    "fieldNameTitle": "Campo",
    "statisticsTitle": "Etiqueta",
    "addNewStatisticsText": "Agregar estadísticas nuevas",
    "deleteStatisticsText": "Eliminar estadísticas",
    "moveStatisticsUpText": "Subir estadísticas",
    "moveStatisticsDownText": "Bajar estadísticas",
    "selectDeselectAllTitle": "Seleccionar todo"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Agregar coste de proyecto adicional",
    "additionalCostValueColumnHeader": "Valor",
    "invalidProjectCostMessage": "Entrada no válida para coste de proyecto.",
    "additionalCostLabelColumnHeader": "Etiqueta",
    "additionalCostTypeColumnHeader": "Tipo"
  },
  "statisticsType": {
    "countLabel": "Recuento",
    "averageLabel": "Media",
    "maxLabel": "Máximo",
    "minLabel": "Mínimo",
    "summationLabel": "Suma",
    "areaLabel": "Área",
    "lengthLabel": "Longitud"
  }
});