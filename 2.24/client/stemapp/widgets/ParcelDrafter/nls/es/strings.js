﻿///////////////////////////////////////////////////////////////////////////
// Copyright Â© Esri. All Rights Reserved.
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
  "_widgetLabel": "Generador de borradores de parcelas",
  "newTraverseButtonLabel": "Iniciar nuevo trazado poligonal",
  "invalidConfigMsg": "Configuración no válida",
  "geometryServiceURLNotFoundMSG": "No se puede obtener la dirección URL del servicio de geometría",
  "editTraverseButtonLabel": "Editar trazado poligonal",
  "mapTooltipForStartNewTraverse": "Seleccione un punto en el mapa, o escriba debajo, para comenzar",
  "mapTooltipForEditNewTraverse": "Seleccione una parcela para editarla",
  "mapTooltipForUpdateStartPoint": "Haga clic para actualizar el punto de inicio",
  "mapTooltipForScreenDigitization": "Haga clic para agregar un punto de parcela",
  "mapTooltipForUpdatingRotaionPoint": "Haga clic para actualizar el punto de rotación",
  "mapTooltipForRotate": "Arrastrar para rotar",
  "mapTooltipForScale": "Arrastrar para ajustar escala",
  "backButtonTooltip": "Atrás",
  "newTraverseTitle": "Nuevo trazado poligonal",
  "editTraverseTitle": "Editar trazado poligonal",
  "clearingDataConfirmationMessage": "Los cambios se descartarán. ¿Desea continuar?",
  "unableToFetchParcelMessage": "No se puede obtener la parcela.",
  "unableToFetchParcelLinesMessage": "No se pueden obtener las líneas de parcela.",
  "planSettings": {
    "planSettingsTitle": "Configuración",
    "directionOrAngleTypeLabel": "Dirección o tipo de ángulo",
    "directionOrAngleUnitsLabel": "Dirección o unidades de ángulo",
    "distanceAndLengthUnitsLabel": "Unidades de distancia y longitud",
    "areaUnitsLabel": "Unidades de área",
    "circularCurveParameters": "Parámetros de curva circular",
    "northAzimuth": "Acimut norte",
    "southAzimuth": "Acimut Sur",
    "quadrantBearing": "Orientación Cuadrante",
    "radiusAndChordLength": "Radio y longitud de unión lineal de extremos de arco",
    "radiusAndArcLength": "Radio y longitud de arco",
    "expandGridTooltipText": "Expandir cuadrícula",
    "collapseGridTooltipText": "Contraer cuadrícula",
    "zoomToLocationTooltipText": "Zoom a ubicación",
    "onScreenDigitizationTooltipText": "Digitalizar",
    "updateRotationPointTooltipText": "Actualizar punto de rotación"
  },
  "traverseSettings": {
    "bearingLabel": "Orientación",
    "lengthLabel": "Longitud",
    "radiusLabel": "Radio",
    "noMiscloseCalculated": "Mala convergencia no calculada",
    "traverseMiscloseBearing": "Cierre incorrecto Orientación",
    "traverseAccuracy": "Precisión",
    "accuracyHigh": "Alto",
    "traverseDistance": "Cierre incorrecto Distancia",
    "traverseMiscloseRatio": "Cierre incorrecto de radio",
    "traverseStatedArea": "Área señalada",
    "traverseCalculatedArea": "Área calculada",
    "addButtonTitle": "Agregar",
    "deleteButtonTitle": "Quitar",
    "compassRuleAppliedHint": "La distancia de cierre incorrecto calculada es menor que la distancia de cierre incorrecto configurada;\n la parcela se ajustará automáticamente con el método de la brújula"
  },
  "parcelTools": {
    "rotationToolLabel": "Ángulo",
    "scaleToolLabel": "Escala"
  },
  "newTraverse": {
    "invalidBearingMessage": "Rumbo no válido.",
    "invalidLengthMessage": "Longitud no válida.",
    "invalidRadiusMessage": "Radio no válido.",
    "negativeLengthMessage": "Válido solo para las curvas",
    "enterValidValuesMessage": "Introduzca valores válidos.",
    "enterValidParcelInfoMessage": "Introduzca información de parcela válida para guardarla.",
    "unableToDrawLineMessage": "No se puede dibujar la línea.",
    "invalidEndPointMessage": "Punto final no válido. No se puede dibujar la línea.",
    "lineTypeLabel": "Tipo de línea"
  },
  "planInfo": {
    "requiredText": "(necesario)",
    "optionalText": "(opcional)",
    "parcelNamePlaceholderText": "Nombre de la parcela",
    "parcelDocumentTypeText": "Tipo de documento",
    "planNamePlaceholderText": "Nombre del plano",
    "cancelButtonLabel": "Cancelar",
    "saveButtonLabel": "Guardar",
    "saveNonClosedParcelConfirmationMessage": "La parcela introducida no está cerrada. ¿Desea continuar y guardar solo las líneas de parcela?",
    "unableToCreatePolygonParcel": "No se puede crear el polígono de parcela.",
    "unableToSavePolygonParcel": "No se puede guardar el polígono de parcela.",
    "unableToSaveParcelLines": "No se pueden guardar las líneas de parcela.",
    "unableToUpdateParcelLines": "No se pueden actualizar las líneas de parcela.",
    "parcelSavedSuccessMessage": "La parcela se ha guardado correctamente.",
    "parcelDeletedSuccessMessage": "Parcela eliminada correctamente.",
    "parcelDeleteErrorMessage": "Error al eliminar la parcela.",
    "enterValidParcelNameMessage": "Introduzca un nombre de parcela válido.",
    "enterValidPlanNameMessage": "Introduzca un nombre de plano válido.",
    "enterValidDocumentTypeMessage": "Tipo de documento no válido.",
    "enterValidStatedAreaNameMessage": "Introduzca un área indicada válida.",
    "showAttributeList": "Mostrar lista de atributos",
    "hideAttributeList": "Ocultar lista de atributos"
  },
  "xyInput": {
    "explanation": "Introducir coordenadas en la misma referencia espacial que la capa"
  }
});