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
  "configText": "Ustaw tekst konfiguracyjny:",
  "generalSettings": {
    "tabTitle": "Ustawienia ogólne",
    "measurementUnitLabel": "Jednostka kosztu",
    "currencyLabel": "Symbol kosztu",
    "roundCostLabel": "Zaokrąglaj koszt",
    "projectOutputSettings": "Ustawienia wynikowe projektu",
    "typeOfProjectAreaLabel": "Typ obszaru projektu",
    "bufferDistanceLabel": "Odległość buforowania",
    "csvReportExportLabel": "Zezwól użytkownikowi na eksportowanie raportu projektu",
    "editReportSettingsBtnTooltip": "Edytuj ustawienia raportu",
    "roundCostValues": {
      "twoDecimalPoint": "Dwa miejsca po przecinku",
      "nearestWholeNumber": "Najbliższa liczba całkowita",
      "nearestTen": "Najbliższa dziesiątka",
      "nearestHundred": "Najbliższa setka",
      "nearestThousand": "Najbliższe tysiące",
      "nearestTenThousands": "Najbliższe dziesiątki tysięcy"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Ustawienia raportu",
      "reportNameLabel": "Nazwa raportu (opcjonalnie):",
      "checkboxLabel": "Pokaż",
      "layerTitle": "Tytuł",
      "columnLabel": "Etykieta",
      "duplicateMsg": "Duplikuj etykietę"
    },
    "projectAreaType": {
      "outline": "Obrys",
      "buffer": "Bufor"
    },
    "errorMessages": {
      "currency": "Nieprawidłowa jednostka waluty",
      "bufferDistance": "Nieprawidłowa odległość buforowania",
      "outOfRangebufferDistance": "Wartość powinna być większa niż 0 i mniejsza niż lub równa 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Ustawienia projektu",
    "costingGeometrySectionTitle": "Zdefiniuj obszar geograficzny na potrzeby kalkulacji kosztów (opcjonalnie)",
    "costingGeometrySectionNote": "Uwaga: skonfigurowanie tej warstwy umożliwi użytkownikowi konfigurowanie równań kosztów szablonów obiektów na podstawie obszarów geograficznych.",
    "projectTableSectionTitle": "Możliwość zapisania/wczytania ustawień projektu (opcjonalnie)",
    "projectTableSectionNote": "Uwaga: skonfigurowanie wszystkich tabel i warstw umożliwi użytkownikowi zapisanie/wczytanie projektu w celu ponownego wykorzystania.",
    "costingGeometryLayerLabel": "Warstwa geometrii kalkulacji kosztów",
    "fieldLabelGeography": "Pole do oznaczenia etykietą obszaru geograficznego",
    "projectAssetsTableLabel": "Tabela zasobów projektu",
    "projectMultiplierTableLabel": "Tabela kosztów dodatkowych mnożnika projektu",
    "projectLayerLabel": "Warstwa projektu",
    "configureFieldsLabel": "Skonfiguruj pola",
    "fieldDescriptionHeaderTitle": "Opis pola",
    "layerFieldsHeaderTitle": "Pole warstwy",
    "selectLabel": "Zaznacz",
    "errorMessages": {
      "duplicateLayerSelection": "Warstwa ${layerName} jest już wybrana",
      "invalidConfiguration": "Należy wybrać wartość ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Zostaną wyświetlone warstwy poligonowe z następującymi warunkami: <br/> <li> Warstwa musi mieć możliwość wykonywania zapytania</li><li> Warstwa musi zawierać pole GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Pola znakowe i liczbowe wybranej warstwy geometrii kalkulacji kosztów zostaną wyświetlone w menu rozwijanym Pole do oznaczenia etykietą obszaru geograficznego.</p>",
    "projectAssetsTableHelp": "<p>Zostaną wyświetlone tabele z następującymi warunkami: <br/> <li>Tabela musi mieć możliwości edycji, czyli tworzenia, usuwania i aktualizacji</li> <li>Tabela musi zawierać sześć pól o dokładnie takich nazwach i typach danych:</li><ul><li> AssetGUID (pole typu GUID)</li><li> CostEquation (pole typu String)</li><li> Scenario (pole typu String)</li><li> TemplateName (pole typu String)</li><li> GeographyGUID (pole typu GUID)</li><li> ProjectGUID (pole typu GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Zostaną wyświetlone tabele z następującymi warunkami: <br/> <li>Tabela musi mieć możliwości edycji, czyli tworzenia, usuwania i aktualizacji</li> <li>Tabela musi zawierać pięć pól o dokładnie takich nazwach i typach danych:</li><ul><li> Description (pole typu String)</li><li> Type (pole typu String)</li><li> Value (pole typu Float/Double)</li><li> Costindex (pole typu Integer)</li><li> ProjectGUID (pole typu GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Zostaną wyświetlone warstwy poligonowe z następującymi warunkami: <br/> <li>Warstwa musi mieć możliwości edycji, czyli tworzenia, usuwania i aktualizacji</li> <li>Warstwa musi zawierać pięć pól o dokładnie takich nazwach i typach danych:</li><ul><li>ProjectName (pole typu String)</li><li>Description (pole typu String)</li><li>Totalassetcost (pole typu Float/Double)</li><li>Grossprojectcost (pole typu Float/Double)</li><li>GlobalID (pole typu GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centroid warstwy punktowej",
    "selectRelatedPointLayerDefaultOption": "Zaznacz",
    "pointLayerHintText": "<p>Zostaną wyświetlone warstwy punktowe z następującymi warunkami: <br/> <li>\tWarstwa musi mieć pole 'Projectid' (typ GUID)</li><li>\tWarstwa musi mieć możliwość edycji, a więc atrybut 'Tworzenie', 'Usuwanie' i 'Aktualizacja'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Ustawienia warstwy",
    "layerNameHeaderTitle": "Nazwa warstwy",
    "layerNameHeaderTooltip": "Lista warstw na mapie",
    "EditableLayerHeaderTitle": "Edytowalne",
    "EditableLayerHeaderTooltip": "Dołącz warstwę i jej szablony w widżecie kalkulacji kosztów",
    "SelectableLayerHeaderTitle": "Podlegające selekcji",
    "SelectableLayerHeaderTooltip": "Geometria z obiektu może zostać użyta do wygenerowania nowego elementu kosztu",
    "fieldPickerHeaderTitle": "ID projektu (opcjonalnie)",
    "fieldPickerHeaderTooltip": "Pole opcjonalne (typu znakowego), w którym będzie przechowywany identyfikator projektu",
    "selectLabel": "Zaznacz",
    "noAssetLayersAvailable": "Nie znaleziono warstwy zasobów na wybranej mapie internetowej",
    "disableEditableCheckboxTooltip": "Ta warstwa nie ma możliwości edycji",
    "missingCapabilitiesMsg": "Dla tej warstwy brak następujących funkcji:",
    "missingGlobalIdMsg": "Ta warstwa nie ma pola GlobalId",
    "create": "Tworzenie",
    "update": "Aktualizuj",
    "deleteColumnLabel": "Usuń",
    "attributeSettingHeaderTitle": "Ustawienia atrybutów",
    "addFieldLabelTitle": "Dodaj atrybuty",
    "layerAttributesHeaderTitle": "Atrybuty warstwy",
    "projectLayerAttributesHeaderTitle": "Atrybuty warstwy projektu",
    "attributeSettingsPopupTitle": "Ustawienia atrybutów warstwy"
  },
  "costingInfo": {
    "tabTitle": "Informacje o kalkulacji kosztów",
    "proposedMainsLabel": "Proponowane elementy główne",
    "addCostingTemplateLabel": "Dodaj szablon kalkulacji kosztów",
    "manageScenariosTitle": "Zarządzaj scenariuszami",
    "featureTemplateTitle": "Szablon obiektu",
    "costEquationTitle": "Równanie kosztów",
    "geographyTitle": "Obszar geograficzny",
    "scenarioTitle": "Scenariusz",
    "actionTitle": "Działania",
    "scenarioNameLabel": "Nazwa scenariusza",
    "addBtnLabel": "Dodaj",
    "srNoLabel": "Nie.",
    "deleteLabel": "Usuwanie",
    "duplicateScenarioName": "Duplikuj nazwę scenariusza",
    "hintText": "<div>Wskazówka: użyj następujących słów kluczowych</div><ul><li><b>{TOTALCOUNT}</b>: używa łącznej liczby zasobów tego samego typu w obszarze geograficznym</li><li><b>{MEASURE}</b>: używa długości dla zasobu liniowego i pola powierzchni dla zasobu poligonowego</li><li><b>{TOTALMEASURE}</b>: używa łącznej długości dla zasobu liniowego i łącznego pola powierzchni dla zasobu poligonowego tego samego typu w obszarze geograficznym</li></ul> Możesz użyć funkcji, takich jak:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Należy zmodyfikować równanie kosztów zgodnie z wymaganiami projektu.",
    "noneValue": "Brak",
    "requiredCostEquation": "Niepoprawne równanie kosztów dla warstwy ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Istnieje podwójny wpis szablonu dla warstwy ${layerName} : ${templateName}",
    "defaultEquationRequired": "Wymagane jest domyślne równanie dla warstwy ${layerName} : ${templateName}",
    "validCostEquationMessage": "Wprowadź prawidłowe równanie kosztów",
    "costEquationHelpText": "Edytuj równanie kosztów zgodnie z wymaganiami projektu",
    "scenarioHelpText": "Wybierz scenariusz zgodnie z wymaganiami projektu",
    "copyRowTitle": "Kopiuj wiersz",
    "noTemplateAvailable": "Dodaj co najmniej jeden szablon dla warstwy ${layerName}",
    "manageScenarioLabel": "Zarządzaj scenariuszem",
    "noLayerMessage": "Wprowadź co najmniej jedną warstwę w ${tabName}",
    "noEditableLayersAvailable": "Warstwy, które należy oznaczyć jako możliwe do edycji na karcie ustawień warstwy",
    "updateProjectCostCheckboxLabel": "Aktualizuj równania projektu",
    "updateProjectCostEquationHint": "Wskazówka: Umożliwia użytkownikowi aktualizowanie równań kosztów zasobów, które zostały już dodane do istniejących projektów, za pomocą nowych równań zdefiniowanych niżej na podstawie szablonu obiektu, geografii i scenariusza. Jeśli brak określonej kombinacji, zostanie przyjęty koszt domyślny, tzn. geografia i scenariusz ma wartość 'None' (brak). W przypadku usunięcia szablonu obiektu ustawiony zostanie koszt równy 0."
  },
  "statisticsSettings": {
    "tabTitle": "Dodatkowe ustawienia",
    "addStatisticsLabel": "Dodaj statystykę",
    "fieldNameTitle": "Pole",
    "statisticsTitle": "Etykieta",
    "addNewStatisticsText": "Dodaj nową statystykę",
    "deleteStatisticsText": "Usuń statystykę",
    "moveStatisticsUpText": "Przesuń statystykę w górę",
    "moveStatisticsDownText": "Przesuń statystykę w dół",
    "selectDeselectAllTitle": "Zaznacz wszystkie"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Dodaj koszt dodatkowy projektu",
    "additionalCostValueColumnHeader": "Wartość",
    "invalidProjectCostMessage": "Nieprawidłowa wartość kosztu projektu",
    "additionalCostLabelColumnHeader": "Etykieta",
    "additionalCostTypeColumnHeader": "Typ"
  },
  "statisticsType": {
    "countLabel": "Liczba",
    "averageLabel": "Średnia",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Zsumowanie",
    "areaLabel": "Pole powierzchni",
    "lengthLabel": "Długość"
  }
});