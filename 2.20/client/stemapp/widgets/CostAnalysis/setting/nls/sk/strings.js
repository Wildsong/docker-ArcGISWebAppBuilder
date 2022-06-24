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
  "configText": "Nastaviť konfiguračný text:",
  "generalSettings": {
    "tabTitle": "Všeobecné nastavenia",
    "measurementUnitLabel": "Jednotka nákladov",
    "currencyLabel": "Symbol nákladov",
    "roundCostLabel": "Zaokrúhlené náklady",
    "projectOutputSettings": "Nastavenia výstupu projektu",
    "typeOfProjectAreaLabel": "Typ oblasti projektu",
    "bufferDistanceLabel": "Vzdialenosť obalovej zóny",
    "csvReportExportLabel": "Povoliť používateľovi exportovať prehľad projektu",
    "editReportSettingsBtnTooltip": "Upraviť nastavenia prehľadu",
    "roundCostValues": {
      "twoDecimalPoint": "Dve desatinné bodky",
      "nearestWholeNumber": "Najbližšie celé číslo",
      "nearestTen": "Najbližšia desiatka",
      "nearestHundred": "Najbližšia stovka",
      "nearestThousand": "Najbližšia tisícka",
      "nearestTenThousands": "Najbližšia desaťtisícka"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Nastavenia prehľadu",
      "reportNameLabel": "Názov prehľadu (voliteľné):",
      "checkboxLabel": "Zobraziť",
      "layerTitle": "Názov",
      "columnLabel": "Označenie",
      "duplicateMsg": "Duplikovať popis"
    },
    "projectAreaType": {
      "outline": "Obrys",
      "buffer": "Obalová zóna"
    },
    "errorMessages": {
      "currency": "Neplatná jednotka meny",
      "bufferDistance": "Neplatná vzdialenosť obalovej zóny",
      "outOfRangebufferDistance": "Hodnota by mala byť vyššia ako 0 a nižšia alebo rovná 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Nastavenia projektu",
    "costingGeometrySectionTitle": "Definovať geografickú oblasť pre náklady (voliteľné)",
    "costingGeometrySectionNote": "Poznámka: Konfigurovanie tejto vrstvy umožní používateľovi nastaviť rovnice nákladov šablón prvku na základe geografických oblastí.",
    "projectTableSectionTitle": "Možnosť uložiť/načítať nastavenia projektu (voliteľné)",
    "projectTableSectionNote": "Poznámka: Konfigurovanie všetkých tabuliek a vrstiev umožní používateľovi uložiť/načítať projekt pre neskoršie použitie.",
    "costingGeometryLayerLabel": "Vrstva s geometriou nákladov",
    "fieldLabelGeography": "Pole na popis geografickej oblasti",
    "projectAssetsTableLabel": "Tabuľka aktív projektu",
    "projectMultiplierTableLabel": "Tabuľka multiplikátorov dodatočných nákladov projektu",
    "projectLayerLabel": "Vrstva projektu",
    "configureFieldsLabel": "Konfigurovať polia",
    "fieldDescriptionHeaderTitle": "Popis poľa",
    "layerFieldsHeaderTitle": "Pole vrstvy",
    "selectLabel": "Vybrať",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} už je vybraná",
      "invalidConfiguration": "Vyberte ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Zobrazené budú vrstvy polygónov s nasledujúcimi podmienkami: <br/> <li> Vrstva musí mať možnosť dopytu</li><li> Vrstva musí mať pole GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Textové a číselné polia vybranej vrstvy výpočtu geometrických nákladov budú zobrazené v ponuke ako 'Pole ako geografické označenie'.</p>",
    "projectAssetsTableHelp": "<p>Budú zobrazené tabuľky s nasledujúcimi podmienkami: <br/> <li>Tabuľka musí mať možnosti úpravy, konkrétne Vytvoriť, Odstrániť a Aktualizovať</li> <li>Tabuľka musí mať šesť polí s presným názvom a typom dát:</li><ul><li> AssetGUID (pole typu GUID)</li><li> CostEquation (pole typu text)</li><li> Scenario (pole typu text)</li><li> TemplateName (pole typu text)</li><li> GeographyGUID (pole typu GUID)</li><li> ProjectGUID (pole typu GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Budú zobrazené tabuľky s nasledujúcimi podmienkami: <br/><li>Tabuľka musí mať možnosti úpravy, konkrétne Vytvoriť, Odstrániť a Aktualizovať</li> <li>Tabuľka musí mať päť polí s presným názvom a typom dát: </li><ul><li> Popis (pole typu text) </li><li>Typ (pole typu text)</li><li> Hodnota (pole typu Float/Double)</li><li> Index nákladov (pole typu celé číslo)</li><li> ProjectGUID (pole typu GUID))</li></ul></p>",
    "projectLayerHelp": "<p>Budú zobrazené vrstvy polygónov s nasledujúcimi podmienkami: <br/><li>Vrstva musí mať možnosti úpravy, konkrétne Vytvoriť, Odstrániť a Aktualizovať</li> <li>Vrstva musí mať päť polí s presným názvom a typom dát:</li><ul><li>Názov projektu (pole typu text)</li><li>Popis (pole typu text)</li><li>Celkové investičné náklady (pole typu Float/Double)</li><li>Hrubé náklady projektu (pole typu Float/Double)</li><li>GlobalID (pole typu GlobalID)</li></ul></p>",
    "pointLayerCentroidLabel": "Ťažisko bodu vrstvy",
    "selectRelatedPointLayerDefaultOption": "Vybrať",
    "pointLayerHintText": "<p>Budú zobrazené vrstvy bodov s nasledujúcimi podmienkami:<br/><li>Vrstva musí mať \"ID projektu (pole typu GUID)</li><li>Vrstva musí mať možnosti úpravy, najmä Vytvoriť, Odstrániť a Aktualizovať</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Nastavenia vrstvy",
    "layerNameHeaderTitle": "Názov vrstvy",
    "layerNameHeaderTooltip": "Zoznam vrstiev na mape",
    "EditableLayerHeaderTitle": "Editovateľný",
    "EditableLayerHeaderTooltip": "Zahrnúť vrstvu a jej šablóny vo widgete pre náklady",
    "SelectableLayerHeaderTitle": "Vybrateľné",
    "SelectableLayerHeaderTooltip": "Geometria z prvku môže byť použitá na generovanie novej položky nákladov",
    "fieldPickerHeaderTitle": "ID projektu (voliteľné)",
    "fieldPickerHeaderTooltip": "Voliteľné pole (alebo reťazca typu) pre uloženie ID projektu v",
    "selectLabel": "Vybrať",
    "noAssetLayersAvailable": "Vo vybranej webovej mape nebola nájdená žiadna vrstva aktív",
    "disableEditableCheckboxTooltip": "Táto vrstva nemá možnosti editovania",
    "missingCapabilitiesMsg": "Vrstve chýbajú nasledujúce možnosti:",
    "missingGlobalIdMsg": "Táto vrstva nemá pole GlobalID",
    "create": "Vytvoriť",
    "update": "Aktualizovať",
    "deleteColumnLabel": "Vymazať",
    "attributeSettingHeaderTitle": "Nastavenia atribútov",
    "addFieldLabelTitle": "Pridať atribúty",
    "layerAttributesHeaderTitle": "Atribúty vrstvy",
    "projectLayerAttributesHeaderTitle": "Atribúty vrstvy projektu",
    "attributeSettingsPopupTitle": "Nastavenia atribútu vrstvy"
  },
  "costingInfo": {
    "tabTitle": "Informácie o nákladoch",
    "proposedMainsLabel": "Navrhovaná sieť",
    "addCostingTemplateLabel": "Pridať šablónu pre náklady",
    "manageScenariosTitle": "Spravovať scenáre",
    "featureTemplateTitle": "Šablóna prvku",
    "costEquationTitle": "Rovnica nákladov",
    "geographyTitle": "Geografická oblasť",
    "scenarioTitle": "Scenár",
    "actionTitle": "Akcie",
    "scenarioNameLabel": "Názov scenára",
    "addBtnLabel": "Pridať",
    "srNoLabel": "Č.",
    "deleteLabel": "Vymazať",
    "duplicateScenarioName": "Duplikovať názov scenára",
    "hintText": "<div>Pomocník: Použite nasledujúce kľúčové slová</div><ul><li><b>{TOTALCOUNT}</b>: Používa celkový počet aktív toho istého typu v geografickej oblasti</li><li><b>{MEASURE}</b>: Používa dĺžku pre aktívum línie a oblasť pre aktívum polygónu</li><li><b>{TOTALMEASURE}</b>: Používa celkovú dĺžku pre aktívum línie a celkovú oblasť pre aktívum polygónu rovnakého typu v geografickej oblasti</li></ul>Môžete použiť funkcie ako:<ul><li>Mat.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Upravte rovnicu nákladov podľa potrieb vášho projektu.",
    "noneValue": "Žiadne",
    "requiredCostEquation": "Neplatná rovnica nákladov pre ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Existuje duplikát šablóny pre ${layerName} : ${templateName}",
    "defaultEquationRequired": "Vyžaduje sa predvolená rovnica pre ${layerName} : ${templateName}",
    "validCostEquationMessage": "Zadajte platnú rovnicu nákladov",
    "costEquationHelpText": "Upravte rovnicu nákladov podľa potrieb vášho projektu",
    "scenarioHelpText": "Vyberte scenár podľa potrieb vášho projektu",
    "copyRowTitle": "Kopírovať riadok",
    "noTemplateAvailable": "Pridajte aspoň jednu šablónu pre ${layerName}",
    "manageScenarioLabel": "Spravovať scenár",
    "noLayerMessage": "Zadajte aspoň jednu vrstvu v ${tabName}",
    "noEditableLayersAvailable": "Vrstvy musia byť v paneli nastavení vrstvy ako editovateľné",
    "updateProjectCostCheckboxLabel": "Aktualizovať rovnice projektu",
    "updateProjectCostEquationHint": "Pomocník: To umožní užívateľovi aktualizovať nákladové rovnice aktív už pridaných v existujúcich projektoch s novými rovnicami definovanými nižšie na základe šablóny prvku, geografickej oblasti a scenára. Ak sa kombinácia nenájde, bude nastavená východiskovo na rovnicu nákladov t.j. geografická oblasť a scenár ako \"žiadne\". V prípade odstránenej šablóny prvku budú náklady nastavené na 0."
  },
  "statisticsSettings": {
    "tabTitle": "Doplnkové nastavenia",
    "addStatisticsLabel": "Pridať štatistiku",
    "fieldNameTitle": "Pole",
    "statisticsTitle": "Označenie",
    "addNewStatisticsText": "Pridať novú štatistiku",
    "deleteStatisticsText": "Odstrániť štatistiku",
    "moveStatisticsUpText": "Presunúť štatistiku hore",
    "moveStatisticsDownText": "Presunúť štatistiku dole",
    "selectDeselectAllTitle": "Vybrať všetko"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Pridať doplnkové náklady projektu",
    "additionalCostValueColumnHeader": "Hodnota",
    "invalidProjectCostMessage": "Neplatná položka pre náklady projektu",
    "additionalCostLabelColumnHeader": "Označenie",
    "additionalCostTypeColumnHeader": "Typ"
  },
  "statisticsType": {
    "countLabel": "Počet",
    "averageLabel": "Priemer",
    "maxLabel": "Maximum",
    "minLabel": "Minimum",
    "summationLabel": "Zhrnutie",
    "areaLabel": "Plocha",
    "lengthLabel": "Dĺžka"
  }
});