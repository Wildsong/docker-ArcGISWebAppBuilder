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
  "configText": "Configuratietekst instellen:",
  "generalSettings": {
    "tabTitle": "Algemene instellingen",
    "measurementUnitLabel": "Kosteneenheid",
    "currencyLabel": "Kostensymbool",
    "roundCostLabel": "Afgeronde kosten",
    "projectOutputSettings": "Projectuitvoersinstellingen",
    "typeOfProjectAreaLabel": "Type projectgebied",
    "bufferDistanceLabel": "Bufferafstand",
    "csvReportExportLabel": "De gebruiker toestaan om het rapport van het project te exporteren",
    "editReportSettingsBtnTooltip": "Rapportinstellingen bewerken",
    "roundCostValues": {
      "twoDecimalPoint": "Twee decimale punten",
      "nearestWholeNumber": "Dichtstbijzijnde hele nummer",
      "nearestTen": "Dichtstbijzijnde tien",
      "nearestHundred": "Dichtstbijzijnde honderd",
      "nearestThousand": "Dichtstbijzijnde duizenden",
      "nearestTenThousands": "Dichtstbijzijnde tien duizenden"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Rapportinstellingen",
      "reportNameLabel": "Naam van het rapport (optioneel) :",
      "checkboxLabel": "Weergeven",
      "layerTitle": "Titel",
      "columnLabel": "Label",
      "duplicateMsg": "Dubbel label"
    },
    "projectAreaType": {
      "outline": "Omtreklijn",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Ongeldige valuta-eenheid",
      "bufferDistance": "Ongeldige bufferafstand",
      "outOfRangebufferDistance": "De waarde moet groter dan 0 en kleiner dan of gelijk aan 100 zijn"
    }
  },
  "projectSettings": {
    "tabTitle": "Projectinstellingen",
    "costingGeometrySectionTitle": "Definieer geografie voor kosten (optioneel)",
    "costingGeometrySectionNote": "Opmerking: als u deze laag configureert, kan de gebruiker kostenvergelijkingen van objectsjablonen instellen op basis van geografische regio's.",
    "projectTableSectionTitle": "Mogelijkheid om projectinstellingen op te slaan/te laden (optioneel)",
    "projectTableSectionNote": "Opmerking: Door alle tabellen en lagen te configureren, kan de gebruiker het project opslaan/laden voor later gebruik.",
    "costingGeometryLayerLabel": "Kosten geometrielaag",
    "fieldLabelGeography": "Geografie Veld naar laag",
    "projectAssetsTableLabel": "Tabel projectassets",
    "projectMultiplierTableLabel": "Tabel projectmultiplicator extra kosten",
    "projectLayerLabel": "Projectlaag",
    "configureFieldsLabel": "Velden configureren",
    "fieldDescriptionHeaderTitle": "Veldbeschrijving",
    "layerFieldsHeaderTitle": "Laagveld",
    "selectLabel": "Selecteren",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} is al geselecteerd",
      "invalidConfiguration": "Selecteer ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Polygoonla(a)g(en) met de volgende voorwaarden worden getoond: <br/> <li> Laag moet 'Query'-capaciteit hebben</li><li> Laag moet een GlobalID-veld hebben</li></p>",
    "fieldToLabelGeographyHelp": "<p>String en numerieke velden van de geselecteerde 'Costing Geometry Layer' worden weergegeven in de 'Field to Label Geography'-keuzelijst.</p>",
    "projectAssetsTableHelp": "<p>Tabel(len) met de volgende voorwaarden wordt getoond: <br/> <li>Tabel moet bewerkingsmogelijkheden hebben, namelijk 'Create', 'Delete' en 'Update'</li> <li>Tabel moet zes velden hebben met exacte naam en gegevenstype:</li><ul><li> AssetGUID (GUID type veld)</li><li> CostEquation (String type veld)</li><li> Scenario (String type veld)</li><li> TemplateName (String type veld)</li><li> GeographyGUID (GUID type veld)</li><li> ProjectGUID (GUID type veld)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabel(len) met de volgende voorwaarden wordt getoond: <br/> <li>Tabel moet bewerkingsmogelijkheden hebben, namelijk 'Create', 'Delete' en 'Update'</li> <li>Tabel moet vijf velden hebben met exacte naam en gegevenstype:</li><ul><li> Beschrijving (String type veld)</li><li> Type (String type veld)</li><li> Waarde (Float/Double type veld)</li><li> Costindex (Integer type veld)</li><li> ProjectGUID (GUID type veld))</li></ul> </p>",
    "projectLayerHelp": "<p>Polygonla(a)g(en) met de volgende voorwaarden wordt getoond: <br/> <li>Laag moet bewerkingsmogelijkheden hebben, namelijk 'Create', 'Delete' en 'Update'</li> <li>Laag moet vijf velden hebben met exacte naam en gegevenstype:</li><ul><li>ProjectNaam (String type veld)</li><li>Beschrijving (String type veld)</li><li>Totalassetcost (Float/Double type veld)</li><li>Grossprojectcost (Float/Double type veld)</li><li>GlobalID (GlobalID type veld)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centroid puntlaag",
    "selectRelatedPointLayerDefaultOption": "Selecteren",
    "pointLayerHintText": "<p>Puntla(a)g(en) die voldoen aan de volgende voorwaarden zullen worden weergegeven: <br/> <li>\tLaag moet veld 'Projectid' (GUID-type) hebben</li><li>\tLaag moet bewerkingsfuncties hebben, namelijk 'Creëren', 'Verwijderen' en 'Bijwerken'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Laaginstellingen",
    "layerNameHeaderTitle": "Kaartlaagnaam",
    "layerNameHeaderTooltip": "Lijst van lagen op de kaart",
    "EditableLayerHeaderTitle": "Bewerkbaar",
    "EditableLayerHeaderTooltip": "Neem de laag en de sjablonen op in de kostenwidget",
    "SelectableLayerHeaderTitle": "Selecteerbaar",
    "SelectableLayerHeaderTooltip": "Geometrie van object kan gebruikt worden om een nieuw kostenelement te genereren",
    "fieldPickerHeaderTitle": "Project-ID (optioneel)",
    "fieldPickerHeaderTooltip": "Optioneel veld (van het type string) om de project-ID in op te slaan",
    "selectLabel": "Selecteren",
    "noAssetLayersAvailable": "Geen assetlaag gevonden in de geselecteerde webkaart",
    "disableEditableCheckboxTooltip": "Deze laag heeft geen bewerkingsmogelijkheden",
    "missingCapabilitiesMsg": "Deze laag mist de volgende mogelijkheden:",
    "missingGlobalIdMsg": "Deze laag heeft geen GlobalId veld",
    "create": "Maken",
    "update": "Actualiseren",
    "deleteColumnLabel": "Verwijderen",
    "attributeSettingHeaderTitle": "Attribuutinstellingen",
    "addFieldLabelTitle": "Attributen toevoegen",
    "layerAttributesHeaderTitle": "Laagattributen",
    "projectLayerAttributesHeaderTitle": "Projectlaagattributen",
    "attributeSettingsPopupTitle": "Laagattribuutinstellingen"
  },
  "costingInfo": {
    "tabTitle": "Kosteninformatie",
    "proposedMainsLabel": "Voorgestelde leidingen",
    "addCostingTemplateLabel": "Voeg kostensjabloon toe",
    "manageScenariosTitle": "Beheer scenario’s",
    "featureTemplateTitle": "Objectsjabloon",
    "costEquationTitle": "Kostenvergelijking",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scenario",
    "actionTitle": "Acties",
    "scenarioNameLabel": "Scenarionaam",
    "addBtnLabel": "Toevoegen",
    "srNoLabel": "Nee.",
    "deleteLabel": "Verwijderen",
    "duplicateScenarioName": "Scenarionaam dupliceren",
    "hintText": "<div>Tip: Gebruik de volgende trefwoorden</div><ul><li><b>{TOTALCOUNT}</b>: gebruikt het totale aantal van hetzelfde type asset in een geografie</li><li><b>{MEASURE}</b>: gebruikt de lengte voor het regelasset en het gebied voor het vlakasset</li><li><b>{TOTALMEASURE}</b>: gebruikt de totale lengte voor het regelasset en het totale gebied voor vlakasset van hetzelfde type in een geografie</li></ul>U kunt functies gebruiken als:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Bewerk de kostenvergelijking volgens uw projectbehoefte.",
    "noneValue": "Geen",
    "requiredCostEquation": "Ongeldige kostenvergelijking voor ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Er bestaat een dubbele sjablooninvoer voor ${layerName} : ${templateName}",
    "defaultEquationRequired": "Standaardvergelijking is vereist voor ${layerName} : ${templateName}",
    "validCostEquationMessage": "Voer geldige kostenvergelijking in",
    "costEquationHelpText": "Bewerk de kostenvergelijking volgens uw projectbehoefte",
    "scenarioHelpText": "Selecteer het scenario volgens uw projectbehoefte",
    "copyRowTitle": "Kopieer rij",
    "noTemplateAvailable": "Voeg ten minste één sjabloon toe voor ${layerName}",
    "manageScenarioLabel": "Beheer scenario",
    "noLayerMessage": "Voer ten minste één laag in ${tabName} in",
    "noEditableLayersAvailable": "La(a)g(en) moet(en) worden aangevinkt als bewerkbaar op het tabblad Laaginstellingen",
    "updateProjectCostCheckboxLabel": "Projectvergelijkingen bijwerken",
    "updateProjectCostEquationHint": "Hint: Dit stelt gebruikers in staat kostenvergelijkingen voor activa die al zijn toegevoegd aan bestaande projecten bij te werken met de nieuwe vergelijkingen die hieronder worden gedefinieerd op basis van het object-template, de geografie en het scenario. Als de combinatie niet wordt gevonden, zal de standaard kostenvergelijking worden ingesteld, met geografie en scenario als 'Geen'. Indien het object-template wordt verwijderd, worden de kosten ingesteld op 0."
  },
  "statisticsSettings": {
    "tabTitle": "Aanvullende instellingen",
    "addStatisticsLabel": "Voeg statistieken toe",
    "fieldNameTitle": "Veld",
    "statisticsTitle": "Label",
    "addNewStatisticsText": "Voeg nieuwe statistieken toe",
    "deleteStatisticsText": "Verwijder statistieken",
    "moveStatisticsUpText": "Verplaats statistieken omhoog",
    "moveStatisticsDownText": "Verplaats statistieken naar beneden",
    "selectDeselectAllTitle": "Alles selecteren"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Bijkomende projectkosten toevoegen",
    "additionalCostValueColumnHeader": "Waarde",
    "invalidProjectCostMessage": "Ongeldige invoer voor projectkosten",
    "additionalCostLabelColumnHeader": "Label",
    "additionalCostTypeColumnHeader": "Type"
  },
  "statisticsType": {
    "countLabel": "Aantal",
    "averageLabel": "Gemiddelde",
    "maxLabel": "Maximum",
    "minLabel": "Minimum",
    "summationLabel": "Sommering",
    "areaLabel": "Gebied",
    "lengthLabel": "Lengte"
  }
});