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
  "configText": "Iestatiet konfigurācijas tekstu:",
  "generalSettings": {
    "tabTitle": "Vispārīgi iestatījumi",
    "measurementUnitLabel": "Izmaksas vienība",
    "currencyLabel": "Izmaksas simbols",
    "roundCostLabel": "Noapaļotas izmaksas",
    "projectOutputSettings": "Projekta izvades iestatījumi",
    "typeOfProjectAreaLabel": "Projekta teritorijas veids",
    "bufferDistanceLabel": "Buferzonas attālums",
    "csvReportExportLabel": "Atļaut lietotājam eksportēt projekta pārskatu",
    "editReportSettingsBtnTooltip": "Labot pārskata iestatījumus",
    "roundCostValues": {
      "twoDecimalPoint": "Divi cipari aiz komata",
      "nearestWholeNumber": "Tuvākais veselais skaitlis",
      "nearestTen": "Tuvākais desmitu skaitlis",
      "nearestHundred": "Tuvākais simtu skaitlis",
      "nearestThousand": "Tuvākais tūkstošu skaitlis",
      "nearestTenThousands": "Tuvākais desmitu tūkstošu skaitlis"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Pārskata iestatījumi",
      "reportNameLabel": "Pārskata nosaukums (neobligāts):",
      "checkboxLabel": "Rādīt",
      "layerTitle": "Virsraksts",
      "columnLabel": "Teksts",
      "duplicateMsg": "Kartes teksta dublikāti"
    },
    "projectAreaType": {
      "outline": "Kontūra",
      "buffer": "Buferzona"
    },
    "errorMessages": {
      "currency": "Nederīga valūtas mērvienība",
      "bufferDistance": "Nederīgs buferzonas attālums",
      "outOfRangebufferDistance": "Vērtībai jābūt lielākai par 0 un mazākai vai vienādai ar 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Projekta iestatījumi",
    "costingGeometrySectionTitle": "Definēt ģeogrāfiju izmaksām (pēc izvēles)",
    "costingGeometrySectionNote": "Piezīme: ja šis slānis būs konfigurēts, lietotājs varēs iestatīt elementu sagatavju izmaksu vienādojumus atkarībā no ģeogrāfijas.",
    "projectTableSectionTitle": "Iespēja saglabāt/ielādēt projekta iestatījumus (pēc izvēles)",
    "projectTableSectionNote": "Piezīme: ja konfigurēsiet visas tabulas un slāņus, lietotājs varēs saglabāt/ielādēt projektu vēlākai lietošanai.",
    "costingGeometryLayerLabel": "Slāņa ģeometrija izmaksas",
    "fieldLabelGeography": "Lauks ģeogrāfijas nosaukumam",
    "projectAssetsTableLabel": "Projekta vērtību tabula",
    "projectMultiplierTableLabel": "Projekta papildu izmaksu tabula",
    "projectLayerLabel": "Projekta slānis",
    "configureFieldsLabel": "Konfigurēt laukus",
    "fieldDescriptionHeaderTitle": "Lauka apraksts",
    "layerFieldsHeaderTitle": "Slāņu lauks",
    "selectLabel": "Izvēlēties",
    "errorMessages": {
      "duplicateLayerSelection": "Slānis ${layerName} jau ir izvēlēts",
      "invalidConfiguration": "Izvēlieties ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Tiks parādīts(-i) laukuma slānis(-ņi), kas atbilst zemāk norādītajiem nosacījumiem: <br/> <li> Slānī jābūt ietvertai “vaicājuma” iespējai</li><li> Slānī jābūt ietvertam laukam GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Atlasītajā sadaļā “Izmaksu ģeometrijas slānis” virknes un skaitļu lauki tiks parādīti nolaižamajā sarakstā “Ģeogrāfijas atzīmju izvēles lauks”.</p>",
    "projectAssetsTableHelp": "<p>Tiks parādīta(-s) tabula(-s), kas atbilst zemāk norādītajiem nosacījumiem: <br/> <li>Tabulā jābūt šādām rediģēšanas iespējām: “Izveidot”, “Dzēst” un “Atjaunināt”</li> <li>Tabulā jābūt sešiem laukiem ar tieši šādu nosaukumu un datu veidu:</li><ul><li> AssetGUID (GUID veida lauks)</li><li> CostEquation (virknes veida lauks)</li><li> Scenario (virknes veida lauks)</li><li> TemplateName (virknes veida lauks)</li><li> GeographyGUID (GUID veida lauks)</li><li> ProjectGUID (GUID veida lauks)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tiks parādīta(-s) tabula(-s), kas atbilst zemāk norādītajiem nosacījumiem: <br/> <li>Tabulā jābūt šādām rediģēšanas iespējām: “Izveidot”, “Dzēst” un “Atjaunināt”</li> <li>Tabulā jābūt pieciem laukiem ar tieši šādu nosaukumu un datu veidu:</li><ul><li> Description (virknes veida lauks)</li><li> Type (virknes veida lauks)</li><li> Value (daļskaitļa/dubultās precizitātes daļskaitļa veida lauks)</li><li> Costindex (vesela skaitļa veida lauks)</li><li> ProjectGUID (GUID veida lauks))</li></ul> </p>",
    "projectLayerHelp": "<p>Tiks parādīts(-i) laukuma slānis(-ņi), kas atbilst zemāk norādītajiem nosacījumiem: <br/> <li>Slānī jābūt šādām rediģēšanas iespējām: “Izveidot”, “Dzēst” un “Atjaunināt”</li> <li>Slānī jābūt pieciem laukiem ar tieši šādu nosaukumu un datu veidu:</li><ul><li>ProjectName (virknes veida lauks)</li><li>Description (virknes veida lauks)</li><li>Totalassetcost (daļskaitļa/dubultās precizitātes daļskaitļa veida lauks)</li><li>Grossprojectcost (daļskaitļa/dubultās precizitātes daļskaitļa veida lauks)</li><li>GlobalID (GlobalID veida lauks)</li></ul> </p>",
    "pointLayerCentroidLabel": "Punktu slāņa centroīds",
    "selectRelatedPointLayerDefaultOption": "Atlasīt",
    "pointLayerHintText": "<p>Tiks parādīts punktu slānis ar šādiem nosacījumiem: <br/> <li>\tSlānī jābūt laukam “Projekta ID” (GUID tips)</li><li>\tSlānī jābūt rediģēšanas iespējām, proti, “Izveidot”, “Dzēst” un “Atjaunināt”</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Slāņu iestatījumi",
    "layerNameHeaderTitle": "Slāņa nosaukums",
    "layerNameHeaderTooltip": "Kartes slāņu saraksts",
    "EditableLayerHeaderTitle": "Rediģējams",
    "EditableLayerHeaderTooltip": "Izmaksu logrīkā iekļaut slāni un tā sagataves",
    "SelectableLayerHeaderTitle": "Izvēlēti",
    "SelectableLayerHeaderTooltip": "Variet izmantot elementa ģeometriju, lai ģenerētu jaunu izmaksu vienību",
    "fieldPickerHeaderTitle": "Projekta ID (pēc izvēles)",
    "fieldPickerHeaderTooltip": "Pēc izvēles pievienojams lauks (teksta tips), kurā glabāt projekta ID",
    "selectLabel": "Izvēlēties",
    "noAssetLayersAvailable": "Izvēlētajā tīmekļa kartē nav atrasts vērtību slānis",
    "disableEditableCheckboxTooltip": "Šim slānim nav rediģēšanas iespēju",
    "missingCapabilitiesMsg": "Šim slānim trūkst šādu iespēju:",
    "missingGlobalIdMsg": "Šim slānim nav lauka GlobalId",
    "create": "Izveidot",
    "update": "Atjauninājums",
    "deleteColumnLabel": "Izdzēst",
    "attributeSettingHeaderTitle": "Atribūtu iestatījumi",
    "addFieldLabelTitle": "Pievienot atribūtus",
    "layerAttributesHeaderTitle": "Slāņa atribūti",
    "projectLayerAttributesHeaderTitle": "Projekta slāņa atribūti",
    "attributeSettingsPopupTitle": "Slāņa atribūtu iestatījumi"
  },
  "costingInfo": {
    "tabTitle": "Izmaksu informācija",
    "proposedMainsLabel": "Ieteicamā sistēma",
    "addCostingTemplateLabel": "Pievienot izmaksu sagatavi",
    "manageScenariosTitle": "Pārvaldīt scenārijus",
    "featureTemplateTitle": "Elementu sagatave",
    "costEquationTitle": "Izmaksu vienādojums",
    "geographyTitle": "Ģeogrāfija",
    "scenarioTitle": "Scenārijs",
    "actionTitle": "Darbības",
    "scenarioNameLabel": "Scenārija nosaukums",
    "addBtnLabel": "Pievienot",
    "srNoLabel": "Nē.",
    "deleteLabel": "Izdzēst",
    "duplicateScenarioName": "Dublēt scenārija nosaukumu",
    "hintText": "<div>Uzvedne: izmantojiet tālāk norādītos atslēgas vārdus</div><ul><li><b>{TOTALCOUNT}</b>: izmanto vienāda tipa vērtības ģeogrāfijā</li><li><b>{MEASURE}</b>: izmanto garumu līnijas vērtībām un platību laukuma vērtībām</li><li><b>{TOTALMEASURE}</b>: izmanto kopējo garumu līniju vērtībām un platību laukuma vērtībām ģeogrāfijā </li></ul> Varat izmantot dažādas funkcijas, piemēram:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Labojiet izmaksu vienādojumu atbilstoši projekta vajadzībām.",
    "noneValue": "Neviens",
    "requiredCostEquation": "Nederīgs izmaksu vienādojums slānim ${layerName}: ${templateName}",
    "duplicateTemplateMessage": "Slānim ${layerName} eksistē sagataves dublikāts: ${templateName}",
    "defaultEquationRequired": "Slānim ${layerName} ir nepieciešams noklusējuma vienādojums: ${templateName}",
    "validCostEquationMessage": "Ievadiet derīgu izmaksu vienādojumu",
    "costEquationHelpText": "Labojiet izmaksu vienādojumu atbilstoši sava projekta vajadzībām",
    "scenarioHelpText": "Izvēlieties scenāriju atbilstoši sava projekta vajadzībām",
    "copyRowTitle": "Kopēt rindu",
    "noTemplateAvailable": "Pievienojiet vismaz vienu veidni slānim ${layerName}",
    "manageScenarioLabel": "Pārvaldīt scenāriju",
    "noLayerMessage": "Ievadiet vismaz vienu slāni cilnē ${tabName}",
    "noEditableLayersAvailable": "Slānis(-ņi) ir jāatzīmē kā rediģējami slāņu iestatījumu cilnē",
    "updateProjectCostCheckboxLabel": "Atjaunināt projekta vienādojumus",
    "updateProjectCostEquationHint": "Padoms. Šādi lietotājs varēs atjaunināt to līdzekļu izmaksu vienādojumus, kas jau pievienoti esošiem projektiem, ar jauniem vienādojumiem, kas norādīti zemāk, pamatojoties uz elementu veidni, ģeogrāfiju un scenāriju. Ja kombinācija netiek atrasta, tiks iestatīts noklusējuma izmaksu vienādojums, proti, ģeogrāfijas un scenārija iestatījums “Nav”. Ja elementu veidne ir noņemta, izmaksas tiks iestatītas kā 0."
  },
  "statisticsSettings": {
    "tabTitle": "Papildu iestatījumi",
    "addStatisticsLabel": "Pievienot statistiku",
    "fieldNameTitle": "Lauks",
    "statisticsTitle": "Virsraksts",
    "addNewStatisticsText": "Pievienot jaunu statistiku",
    "deleteStatisticsText": "Dzēst statistiku",
    "moveStatisticsUpText": "Pārvietot statistiku augšup",
    "moveStatisticsDownText": "Pārvietot statistiku lejup",
    "selectDeselectAllTitle": "Izvēlēties visas"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Pievienot papildu projekta izmaksas",
    "additionalCostValueColumnHeader": "Vērtība",
    "invalidProjectCostMessage": "Nederīgs projekta izmaksu ieraksts",
    "additionalCostLabelColumnHeader": "Kartes teksts",
    "additionalCostTypeColumnHeader": "Veids"
  },
  "statisticsType": {
    "countLabel": "Skaits",
    "averageLabel": "Vidējais",
    "maxLabel": "Maksimums",
    "minLabel": "Minimums",
    "summationLabel": "Summēšana",
    "areaLabel": "Platība",
    "lengthLabel": "Garums"
  }
});