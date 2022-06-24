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
  "configText": "Määritä kokoonpanoteksti:",
  "generalSettings": {
    "tabTitle": "Yleiset asetukset",
    "measurementUnitLabel": "Kustannusyksikkö",
    "currencyLabel": "Kustannussymboli",
    "roundCostLabel": "Pyöristä kustannus",
    "projectOutputSettings": "Projektin tulosasetukset",
    "typeOfProjectAreaLabel": "Projektialueen tyyppi",
    "bufferDistanceLabel": "Puskurin etäisyys",
    "csvReportExportLabel": "Salli käyttäjän viedä projektin raportti",
    "editReportSettingsBtnTooltip": "Muokkaa raporttiasetuksia",
    "roundCostValues": {
      "twoDecimalPoint": "Kaksi desimaaliarvoa",
      "nearestWholeNumber": "Lähin kokonaisluku",
      "nearestTen": "Lähin kymmenluku",
      "nearestHundred": "Lähin sataluku",
      "nearestThousand": "Lähin tuhatluku",
      "nearestTenThousands": "Lähin kymmentuhatluku"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Raporttiasetukset",
      "reportNameLabel": "Raportin nimi (valinnainen):",
      "checkboxLabel": "Näytä",
      "layerTitle": "Otsikko",
      "columnLabel": "Tunnusteksti",
      "duplicateMsg": "Tunnustekstin kaksoiskappale"
    },
    "projectAreaType": {
      "outline": "Ääriviiva",
      "buffer": "Puskuri"
    },
    "errorMessages": {
      "currency": "Virheellinen valuuttayksikkö",
      "bufferDistance": "Virheellinen puskurin etäisyys",
      "outOfRangebufferDistance": "Arvon on oltava yli 0 ja vähintään 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Projektiasetukset",
    "costingGeometrySectionTitle": "Määritä kustannusgeometria (valinnainen)",
    "costingGeometrySectionNote": "Huomautus: tämän karttatason määritys sallii käyttäjän määrittää kohdemallien kustannusyhtälöt maantieteeellisen kohteen perusteella.",
    "projectTableSectionTitle": "Projektiasetusten tallennus- ja latausmahdollisuus (valinnainen)",
    "projectTableSectionNote": "Huomautus: määrittämällä kaikki taulukot ja karttatasot käyttäjä voi tallentaa tai ladata projektin myöhempää käyttöä varten.",
    "costingGeometryLayerLabel": "Kustannusgeometrian karttataso",
    "fieldLabelGeography": "Kenttä, jolla maantieteellinen kohde nimetään",
    "projectAssetsTableLabel": "Projektiomaisuuksien taulukko",
    "projectMultiplierTableLabel": "Projektin ylimääräisten kustannusten kerrointaulukko",
    "projectLayerLabel": "Projektikarttataso",
    "configureFieldsLabel": "Määritä kentät",
    "fieldDescriptionHeaderTitle": "Kentän kuvaus",
    "layerFieldsHeaderTitle": "Karttatason kenttä",
    "selectLabel": "Valitse",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} on jo valittu",
      "invalidConfiguration": "Valitse ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Aluekarttatasot, joihin pätevät seuraavat ehdot, näytetään:<br/><li> Karttatasossa on oltava kyselyominaisuus</li><li> Karttatasossa on oltava GlobalID-kenttä</li></p>",
    "fieldToLabelGeographyHelp": "<p>Valitun Kustannusgeometrian karttatason merkkijono ja numeeriset kentät näytetään avattavassa Kenttä, jolla maantieteellinen kohde nimetään -luettelossa.</p>",
    "projectAssetsTableHelp": "<p>Taulukot, joihin pätevät seuraavat ehdot, näytetään: <br/> <li>Taulukossa on oltava muokkausominaisuudet, kuten luonti, poisto ja päivitys</li> <li>Taulukossa on oltava kuusi kenttää, joissa on täsmälliset nimi- ja aineistotyypit:</li><ul><li> AssetGUID (GUID-tyypin kenttä)</li><li> CostEquation (String-tyypin kenttä)</li><li> Scenario (String-tyypin kenttä)</li><li> TemplateName (String-tyypin kenttä)</li><li> GeographyGUID (GUID-tyypin kenttä)</li><li> ProjectGUID (GUID-tyypin kenttä)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Taulukot, joihin pätevät seuraavat ehdot, näytetään: <br/> <li>Taulukossa on oltava muokkausominaisuudet, kuten luonti, poisto ja päivitys</li> <li>Taulukossa on oltava viisi kenttää, joissa on tarkat nimi- ja aineistotyypit:</li><ul><li> Description (String-tyypin kenttä)</li><li> Type (String-tyypin kenttä)</li><li> Value (Float-/Double-tyypin kenttä)</li><li> Costindex (Integer-tyypin kenttä)</li><li> ProjectGUID (GUID-tyypin kenttä))</li></ul> </p>",
    "projectLayerHelp": "<p>Aluekarttatasot, joihin pätevät seuraavat ehdot, näytetään:<br/> <li>Karttatasossa on oltava muokkausominaisuudet, kuten luonti, poisto ja päivitys</li> <li>Karttatasossa on oltava viisi kenttää, joissa on tarkat nimi- ja aineistotyypit:</li><ul><li>ProjectName (String-tyypin kenttä)</li><li>Description (String-tyypin kenttä)</li><li>Totalassetcost (Float-/Double-tyypin kenttä)</li><li>Grossprojectcost (Float-/Double-tyypin kenttä)</li><li>GlobalID (GUID-tyypin kenttä)) </li></ul></p>",
    "pointLayerCentroidLabel": "Pistekarttatason painopiste",
    "selectRelatedPointLayerDefaultOption": "Valitse",
    "pointLayerHintText": "<p>Pistekarttatasot, joiden seuraavat ehdot täyttyvät, näytetään: <br/> <li>\tKarttatasossa on oltava (GUID-tyypin) Projectid-kenttä</li><li>\tKarttatasossa on oltava muokkaustoiminnot eli Luo, Poista ja Päivitä</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Karttatason asetukset",
    "layerNameHeaderTitle": "Karttatason nimi",
    "layerNameHeaderTooltip": "Kartan karttatasojen luettelo",
    "EditableLayerHeaderTitle": "Muokattavissa",
    "EditableLayerHeaderTooltip": "Sisällytä karttataso ja sen mallit kustannusten pienoisohjelmaan",
    "SelectableLayerHeaderTitle": "Valittavissa",
    "SelectableLayerHeaderTooltip": "Kohteen geometriaa voi käyttää uuden kustannuskohteen luontiin",
    "fieldPickerHeaderTitle": "Projektin tunnus (valinnainen)",
    "fieldPickerHeaderTooltip": "Valinnainen kenttä (merkkijonotyyppiä), johon projektin tunnus tallennetaan",
    "selectLabel": "Valitse",
    "noAssetLayersAvailable": "Valitusta Web-kartasta ei löytynyt omaisuuskarttatasoa",
    "disableEditableCheckboxTooltip": "Tässä karttatasossa ei ole muokkausominaisuuksia",
    "missingCapabilitiesMsg": "Tästä karttatasosta puuttuu seuraavat ominaisuudet:",
    "missingGlobalIdMsg": "Tässä karttatasossa ei ole Global ID -kenttää",
    "create": "Luo",
    "update": "Päivitä",
    "deleteColumnLabel": "Poista",
    "attributeSettingHeaderTitle": "Ominaisuustietoasetukset",
    "addFieldLabelTitle": "Lisää ominaisuustietoja",
    "layerAttributesHeaderTitle": "Karttatason ominaisuustiedot",
    "projectLayerAttributesHeaderTitle": "Projektikarttatason ominaisuustiedot",
    "attributeSettingsPopupTitle": "Karttatason ominaisuustietoasetukset"
  },
  "costingInfo": {
    "tabTitle": "Kustannustiedot",
    "proposedMainsLabel": "Ehdotetut päälinjat",
    "addCostingTemplateLabel": "Lisää kustannusmalli",
    "manageScenariosTitle": "Skenaarioiden hallinta",
    "featureTemplateTitle": "Kohdemalli",
    "costEquationTitle": "Kustannusyhtälö",
    "geographyTitle": "Maantieteellinen kohde",
    "scenarioTitle": "Skenaario",
    "actionTitle": "Toiminnot",
    "scenarioNameLabel": "Skenaarion nimi",
    "addBtnLabel": "Lisää",
    "srNoLabel": "Nro.",
    "deleteLabel": "Poista",
    "duplicateScenarioName": "Päällekkäinen skenaarion nimi",
    "hintText": "<div>Vihje: käytä seuraavia avainsanoja</div><ul><li><b>{TOTALCOUNT}</b>: käyttää saman tyypin omaisuuksien kokonaismäärää maantieteessä</li> <li><b>{MEASURE}</b>: käyttää viivaomaisuuden pituutta alueomaisuuden pinta-alaa</li><li><b>{TOTALMEASURE}</b>: käyttää viivaomaisuuden kokonaispituutta ja alueomaisuuden kokonaispinta-alaa maantieteessä</li></ul> Voit käyttää esimerkiksi seuraavia funktioita:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Muokkaa kustannusyhtälöä projektisi tarpeiden mukaisesti.",
    "noneValue": "Ei mitään",
    "requiredCostEquation": "Virheellinen kustannusyhtälö kohteelle ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Päällekkäinen mallimerkintä on kohteessa ${layerName} : ${templateName}",
    "defaultEquationRequired": "${layerName} : ${templateName} edellyttää oletusyhtälöä",
    "validCostEquationMessage": "Anna kelvollinen kustannusyhtälö",
    "costEquationHelpText": "Muokkaa kustannusyhtälöä projektisi tarpeiden mukaisesti",
    "scenarioHelpText": "Valitse skenaario projektisi tarpeiden mukaisesti",
    "copyRowTitle": "Kopioi rivi",
    "noTemplateAvailable": "Lisää vähintään yksi malli karttatasolle ${layerName}",
    "manageScenarioLabel": "Skenaarion hallinta",
    "noLayerMessage": "Anna vähintään yksi karttataso kohteessa ${tabName}",
    "noEditableLayersAvailable": "Karttatasot on valittava muokattaviksi karttatason asetusvälilehdellä",
    "updateProjectCostCheckboxLabel": "Päivitä projektin yhtälöt",
    "updateProjectCostEquationHint": "Vihje: tämän toiminnon avulla käyttäjä voi päivittää aiemmin luotuihin projekteihin jo lisättyjen omaisuuksien kustannusyhtälöt uusilla yhtälöillä, jotka on määritetty alla, kohdemallin, maantieteellisen kohteen ja skenaarion perusteella. Jos yhdistelmää ei löydy, se määritetään oletuskustannusyhtälöksi eli maantieteellisen kohteen ja skenaarion arvoksi määritetään \"Ei mitään\". Jos kohdemalli on poistettu, kustannuksen arvoksi määritetään 0."
  },
  "statisticsSettings": {
    "tabTitle": "Lisäasetukset",
    "addStatisticsLabel": "Lisää tilastotiedot",
    "fieldNameTitle": "Kenttä",
    "statisticsTitle": "Tunnusteksti",
    "addNewStatisticsText": "Lisää uudet tilastotiedot",
    "deleteStatisticsText": "Poista tilastotiedot",
    "moveStatisticsUpText": "Siirrä tilastotiedot ylös",
    "moveStatisticsDownText": "Siirrä tilastotiedot alas",
    "selectDeselectAllTitle": "Valitse kaikki"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Lisää projektin lisäkustannuksia",
    "additionalCostValueColumnHeader": "Arvo",
    "invalidProjectCostMessage": "Virheellinen projektikustannuksen merkintä",
    "additionalCostLabelColumnHeader": "Tunnusteksti",
    "additionalCostTypeColumnHeader": "Tyyppi"
  },
  "statisticsType": {
    "countLabel": "Lukumäärä",
    "averageLabel": "Keskiarvo",
    "maxLabel": "Maksimi",
    "minLabel": "Minimi",
    "summationLabel": "Summa",
    "areaLabel": "Alue",
    "lengthLabel": "Pituus"
  }
});