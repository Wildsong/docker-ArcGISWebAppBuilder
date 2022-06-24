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
  "configText": "Nustatyti konfigūravimo tekstą:",
  "generalSettings": {
    "tabTitle": "Bendrieji parametrai",
    "measurementUnitLabel": "Išlaidų vienetas",
    "currencyLabel": "Išlaidų simbolis",
    "roundCostLabel": "Apvalinti išlaidas",
    "projectOutputSettings": "Projekto išvesties parametrai",
    "typeOfProjectAreaLabel": "Projekto teritorijos tipas",
    "bufferDistanceLabel": "Buferio atstumas",
    "csvReportExportLabel": "Leisti naudotojui eksportuoti projekto ataskaitą",
    "editReportSettingsBtnTooltip": "Redaguoti ataskaitos nustatymus",
    "roundCostValues": {
      "twoDecimalPoint": "Du skaitmenys po kablelio",
      "nearestWholeNumber": "Artimiausias sveikasis skaičius",
      "nearestTen": "Artimiausia dešimtis",
      "nearestHundred": "Artimiausias šimtas",
      "nearestThousand": "Artimiausias tūkstantis",
      "nearestTenThousands": "Artimiausia dešimtis tūkstančių"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Ataskaitos parametrai",
      "reportNameLabel": "Ataskaitos pavadinimas (pasirinktinis):",
      "checkboxLabel": "Rodyti",
      "layerTitle": "Pavadinimas",
      "columnLabel": "Klasė",
      "duplicateMsg": "Pasikartojantis užrašas"
    },
    "projectAreaType": {
      "outline": "Kontūras",
      "buffer": "Buferis"
    },
    "errorMessages": {
      "currency": "Netinkamas valiutos vienetas",
      "bufferDistance": "Netinkamas buferio atstumas",
      "outOfRangebufferDistance": "Reikšmė turi būti didesnė nei 0 ir mažesnė nei 100 arba lygi"
    }
  },
  "projectSettings": {
    "tabTitle": "Projekto parametrai",
    "costingGeometrySectionTitle": "Apibrėžti išlaidų geografiją (pasirinktinai)",
    "costingGeometrySectionNote": "Pastaba: sukonfigūravus šį sluoksnį, naudotojas galės nustatyti elementų šablonų išlaidų lygtis pagal geografinius duomenis.",
    "projectTableSectionTitle": "Galimybė įrašyti / įkelti projekto parametrus (pasirinktinai)",
    "projectTableSectionNote": "Pastaba: sukonfigūravus visas lenteles ir sluoksnius, naudotojai galės įrašyti/įkelti projektą, kad galėtų naudoti vėliau.",
    "costingGeometryLayerLabel": "Išlaidų geometrijos sluoksnis",
    "fieldLabelGeography": "Laukas į žymių geografinius duomenis",
    "projectAssetsTableLabel": "Projekto išteklių lentelė",
    "projectMultiplierTableLabel": "Projekto daugiklio papildomų išlaidų lentelė",
    "projectLayerLabel": "Projekto sluoksnis",
    "configureFieldsLabel": "Konfigūruoti laukus",
    "fieldDescriptionHeaderTitle": "Lauko aprašas",
    "layerFieldsHeaderTitle": "Sluoksnio laukas",
    "selectLabel": "Pasirinkti",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} jau pažymėtas",
      "invalidConfiguration": "Pasirinkite ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Bus rodomas (-i) poligono sluoksnis (-iai) su šiomis sąlygomis: <br/> <li> Sluoksnis privalo turėti užklausos galimybę</li><li> Sluoksnis privalo turėti GlobalID lauką</li></p>",
    "fieldToLabelGeographyHelp": "<p>Pažymėto Išlaidų geometrijos sluoksnio eilutė ir skaitiniai laukai bus rodomi iškrentančiame meniu Laukas į žymių geografinius duomenis.</p>",
    "projectAssetsTableHelp": "<p>Bus rodoma (-os) lentelė (-os) su šiomis sąlygomis: <br/> <li>Lentelėje turi būti redagavimo galimybės, t. y. Kurti, Naikinti ir Atnaujinti</li> <li>Lentelėje turi būti šeši laukai su tiksliu pavadinimo ir duomenų tipu:</li><ul><li> AssetGUID (GUID lauko tipas)</li><li> CostEquation (tekstinis lauko tipas)</li><li> Scenario (tekstinis lauko tipas)</li><li> TemplateName (tekstinis lauko tipas)</li><li> GeographyGUID (GUID lauko tipas)</li><li> ProjectGUID (GUID lauko tipas)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Bus rodoma (-os) lentelė (-ės) su šiomis sąlygomis: <br/> <li>Lentelėje turi būti redagavimo galimybės, t. y. Kurti, Naikinti ir Atnaujinti</li> <li>Lentelėje turi būti penki laukai su tiksliu pavadinimu ir duomenų tipu:</li><ul><li> Description (tekstinis lauko tipas)</li><li> Type (tekstinis lauko tipas)</li><li> Value (kintamo / dvigubo tikslumo lauko tipas)</li><li> Costindex (sveikojo skaičiaus lauko tipas)</li><li> ProjectGUID (GUID lauko tipas)</li></ul> </p>",
    "projectLayerHelp": "<p>Bus rodomas (-i) poligono sluoksnis (-iai) su šiomis sąlygomis: <br/> <li>Sluoksnyje turi būti redagavimo galimybės, t. y. Kurti, Naikinti ir Atnaujinti</li> <li>Sluoknyje turi būti penki laukai su tiksliu pavadinimo ir duomenų tipu:</li><ul><li>ProjectName (tekstinis lauko tipas)</li><li>Description (tekstinis lauko tipas)</li><li>Totalassetcost (kintamo / dvigubo tikslumo lauko tipas)</li><li>Grossprojectcost (kintamo / dvigubo tikslumo lauko tipas)</li><li>GlobalID (GlobalID lauko tipas)</li></ul> </p>",
    "pointLayerCentroidLabel": "Taškų sluoksnio centroidas",
    "selectRelatedPointLayerDefaultOption": "Pasirinkti",
    "pointLayerHintText": "<p>Bus rodomas (-i) taškų sluoksnis (-iai), esant šioms sąlygoms: <br/> <li>\tSluoksnyje turi būti laukas Projectid (GUID tipo)</li><li>\tSluoksnyje turi būti redagavimo galimybės, t. y. Kurti, Ištrinti ir Atnaujinti</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Sluoksnio parametrai",
    "layerNameHeaderTitle": "Sluoksnio pavadinimas",
    "layerNameHeaderTooltip": "Sluoksnių sąrašas žemėlapyje",
    "EditableLayerHeaderTitle": "Redaguojama",
    "EditableLayerHeaderTooltip": "Įtraukti sluoksnį ir jo šablonus į išlaidų valdiklį",
    "SelectableLayerHeaderTitle": "Pažymimas",
    "SelectableLayerHeaderTooltip": "Geometriją iš elemento galima naudoti generuojant naują išlaidų elementą",
    "fieldPickerHeaderTitle": "Projekto ID (pasirinktinis)",
    "fieldPickerHeaderTooltip": "Pasirinktinis laukas (tekstinio tipo) projekto ID saugoti",
    "selectLabel": "Pasirinkti",
    "noAssetLayersAvailable": "Pasirinktame internetiniame žemėlapyje išteklių sluoksnis nerastas",
    "disableEditableCheckboxTooltip": "Šiame sluoksnyje nėra redagavimo galimybių",
    "missingCapabilitiesMsg": "Šiam sluoksniui trūksta šių galimybių:",
    "missingGlobalIdMsg": "Šis sluoksnis neturi lauko GlobalId",
    "create": "Kurti",
    "update": "Atnaujinti",
    "deleteColumnLabel": "Ištrinti",
    "attributeSettingHeaderTitle": "Atributų nustatymai",
    "addFieldLabelTitle": "Pridėti atributus",
    "layerAttributesHeaderTitle": "Sluoksnio atributai",
    "projectLayerAttributesHeaderTitle": "Projekto sluoksnio atributai",
    "attributeSettingsPopupTitle": "Sluoksnio atributų nustatymai"
  },
  "costingInfo": {
    "tabTitle": "Išlaidų informacija",
    "proposedMainsLabel": "Siūlomos trasos",
    "addCostingTemplateLabel": "Įtraukti išlaidų šabloną",
    "manageScenariosTitle": "Tvarkyti scenarijus",
    "featureTemplateTitle": "Elementų šablonas",
    "costEquationTitle": "Išlaidų lygtis",
    "geographyTitle": "Geografiniai duomenys",
    "scenarioTitle": "Scenarijus",
    "actionTitle": "Veiksmai",
    "scenarioNameLabel": "Scenarijaus pavadinimas",
    "addBtnLabel": "Pridėti",
    "srNoLabel": "Nr.",
    "deleteLabel": "Ištrinti",
    "duplicateScenarioName": "Pasikartojantis scenarijaus pavadinimas",
    "hintText": "<div>Pastaba: naudokite šiuos raktažodžius</div><ul><li><b>{TOTALCOUNT}</b>: naudoja bendrą to paties tipo išteklių kiekį regione</li><li><b>{MEASURE}</b>: naudoja linijos ištekliaus ilgį ir poligonų ištekliaus teritoriją</li><li><b>{TOTALMEASURE}</b>: naudoja bendrą linijos ištekliaus ilgį ir bendrą poligono to paties tipo ištekliaus teritoriją geografiniame regione </li></ul>Galite naudoti funkcijas, pvz.:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Redaguokite išlaidų lygtį pagal savo projekto poreikius.",
    "noneValue": "Nėra",
    "requiredCostEquation": "Neleistina išlaidų lygtis, skirta ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Pasikartojantis šablono įrašas, skirtas ${layerName} : ${templateName}",
    "defaultEquationRequired": "Numatytosios lygties reikia sluoksniui ${layerName} : ${templateName}",
    "validCostEquationMessage": "Įveskite tinkamą išlaidų lygtį",
    "costEquationHelpText": "Redaguokite išlaidų lygtį pagal projekto poreikius",
    "scenarioHelpText": "Pasirinkite scenarijų pagal projekto poreikius",
    "copyRowTitle": "Kopijuoti eilutę",
    "noTemplateAvailable": "Įtraukite bent vieną šabloną sluoksniui ${layerName}",
    "manageScenarioLabel": "Tvarkyti scenarijų",
    "noLayerMessage": "${tabName} įveskite bent vieną sluoksnį",
    "noEditableLayersAvailable": "Sluoksnis (-iai), kurį (-iuos) reikia patikrinti kaip redaguotiną (-us) sluoksnio parametrų skirtuke",
    "updateProjectCostCheckboxLabel": "Atnaujinti projekto lygtis",
    "updateProjectCostEquationHint": "Patarimas: tai leis naudotojui atnaujinti jau į esamus projektus įtrauktų išteklių išlaidų lygtis naujomis lygtimis, toliau apibrėžtomis remiantis elementų šablonu, geografija ir scenarijumi. Jei derinio nebus rasta, bus nustatyta numatytoji išlaidų lygtis, t. y. geografijos ir scenarijaus reikšmė bus Nėra. Jei bus pašalintas elementų šablonas, išlaidos bus nustatytos kaip 0."
  },
  "statisticsSettings": {
    "tabTitle": "Papildomi nustatymai",
    "addStatisticsLabel": "Pridėti statistinius rodiklius",
    "fieldNameTitle": "Darbui lauke",
    "statisticsTitle": "Užrašas",
    "addNewStatisticsText": "Pridėti naują statistinį rodiklį",
    "deleteStatisticsText": "Naikinti statistinius rodiklius",
    "moveStatisticsUpText": "Perkelti statistinius rodiklius aukštyn",
    "moveStatisticsDownText": "Perkelti statistinius rodiklius žemyn",
    "selectDeselectAllTitle": "Žymėti viską"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Įtraukti papildomas projekto išlaidas",
    "additionalCostValueColumnHeader": "Reikšmė",
    "invalidProjectCostMessage": "Netinkamas projekto išlaidų įrašas",
    "additionalCostLabelColumnHeader": "Klasė",
    "additionalCostTypeColumnHeader": "Tipas"
  },
  "statisticsType": {
    "countLabel": "Skaičius",
    "averageLabel": "Vidurkis",
    "maxLabel": "Maksimumas",
    "minLabel": "Minimumas",
    "summationLabel": "Suma",
    "areaLabel": "Plotas",
    "lengthLabel": "Ilgis"
  }
});