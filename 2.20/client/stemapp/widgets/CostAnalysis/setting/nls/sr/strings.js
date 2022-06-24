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
  "configText": "Postavi tekst konfiguracije:",
  "generalSettings": {
    "tabTitle": "Opšte postavke",
    "measurementUnitLabel": "Jedinica za trošak",
    "currencyLabel": "Simbol za trošak",
    "roundCostLabel": "Zaokruži trošak",
    "projectOutputSettings": "Postavke izlaznih rezultata projekta",
    "typeOfProjectAreaLabel": "Tip oblasti projekta",
    "bufferDistanceLabel": "Rastojanje zone bliskosti",
    "csvReportExportLabel": "Omogući korisnicima da izvezu izveštaje iz projekta",
    "editReportSettingsBtnTooltip": "Izmeni postavke izveštaja",
    "roundCostValues": {
      "twoDecimalPoint": "Dve decimale",
      "nearestWholeNumber": "Najbliži ceo broj",
      "nearestTen": "Najbliža desetica",
      "nearestHundred": "Najbliža stotina",
      "nearestThousand": "Najbliža hiljada",
      "nearestTenThousands": "Najbliža desetina hiljada"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Postavke izveštaja",
      "reportNameLabel": "Naziv izveštaja (opciono):",
      "checkboxLabel": "Prikaži",
      "layerTitle": "Naslov",
      "columnLabel": "Oznaka",
      "duplicateMsg": "Duplirana oznaka"
    },
    "projectAreaType": {
      "outline": "Kontura",
      "buffer": "Zona bliskosti"
    },
    "errorMessages": {
      "currency": "Nevažeća jedinica valute",
      "bufferDistance": "Nevažeće rastojanje zone bliskosti",
      "outOfRangebufferDistance": "Vrednost treba da bude veća od 0 i manja ili jednaka sa 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Postavke projekta",
    "costingGeometrySectionTitle": "Definiši geografiju troškova (opciono)",
    "costingGeometrySectionNote": "Napomena: konfigurisanje ovog sloja će omogućiti korisniku da postavi jednačine troškova šablona geoobjekta na osnovu geografije.",
    "projectTableSectionTitle": "Mogućnost Čuvanja/Učitavanja postavki projekta (opciono)",
    "projectTableSectionNote": "Napomena: konfigurisanje svih tabela i slojeva će omogućiti korisnicima da sačuvaju/učitaju projekte za kasnije korišćenje.",
    "costingGeometryLayerLabel": "Sloj troškova geometrije",
    "fieldLabelGeography": "Polje za označavanje geografije",
    "projectAssetsTableLabel": "Tabela resursa projekta",
    "projectMultiplierTableLabel": "Tabela dodatnih troškova multiplikatora projekta",
    "projectLayerLabel": "Sloj projekta",
    "configureFieldsLabel": "Konfiguriši polja",
    "fieldDescriptionHeaderTitle": "Opis polja",
    "layerFieldsHeaderTitle": "Polje sloja",
    "selectLabel": "Izaberite",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} je već izabran",
      "invalidConfiguration": "Izaberite ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Sloj(evi) poligona sa sledećim uslovima će biti prikazan(i): <br/> <li> Sloj mora da ima mogućnost 'Upita'</li><li> Sloj mora da ima GlobalID polje</li></p>",
    "fieldToLabelGeographyHelp": "<p>String i numeričko polje izabranog \"Sloja troškova geometrije\" će da bude prikazano u padajućem meniju \"Polja za označavanje geografije\".</p>",
    "projectAssetsTableHelp": "<p>Tabla(-e) sa sledećim uslovima će biti prikazane: <br/> <li>Tabla mora da ima mogućnost uređivanja, tačnije \"Kreiraj\", \"Obriši\" i \"Ažuriraj\"</li> <li>Tabla mora da ima šest polja sa tačnim nazivima i tipom podataka:</li><ul><li> Resurs GUID (GUID tip polja)</li><li> Jednačina troškova (string tip polja)</li><li> Scenario (string tip polja)</li><li> Naziv šablona (string tip polja)</li><li> GUID geografije (GUID tip polja)</li><li> GUID projekta (GUID tip polja)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabla(-e) sa sledećim uslovima će biti prikazane: <br/> <li>Tabla mora da ima mogućnost uređivanja, tačnije \"Kreiraj\", \"Obriši\" i \"Ažuriraj\"</li> <li>Tabla mora da ima pet polja sa tačnim nazivima i tipom podataka:</li><ul><li> Opis (string tip polja)</li><li> Tip (string tip polja)</li><li> Vrednost (plutajući/dupli tip polja)</li><li> Indeks troškova (tip polja sa celim brojem)</li><li> GUID projekta (GUID tip polja))</li></ul> </p>",
    "projectLayerHelp": "<p>Sloj(evi) poligona sa sledećim uslovima će biti prikazan(i): <br/> <li>Sloj mora da ima mogućnost uređivanja, naime opcije \"Kreiraj\", \"Obriši\" i \"Ažuriraj\"</li> <li>Sloj mora da ima pet polja sa tačnim nazivom i tipom podataka:</li><ul><li>Naziv projekta (string tip polja)</li><li>Opis (string tip polja)</li><li>Ukupan trošak sredstva (plutajući/dupli tip polja)</li><li>Bruto trošak projekta (plutajući/dupli tip polja)</li><li>Globalni ID (Globalni ID tip polja)</li></ul> </p>",
    "pointLayerCentroidLabel": "Težište tačkastog sloja",
    "selectRelatedPointLayerDefaultOption": "Selektujte",
    "pointLayerHintText": "<p>Prikazaće se tačkasti sloj(evi) sa sledećim uslovima: <br/> <li>\tSloj mora da ima polje 'Projectid' (GUID tip)</li><li>\tSloj mora da ima mogućnost uređivanja, tačnije 'Kreiraj', 'Izbriši' i 'Ažuriraj'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Postavke sloja",
    "layerNameHeaderTitle": "Ime sloja",
    "layerNameHeaderTooltip": "Lista slojeva u mapi",
    "EditableLayerHeaderTitle": "Može da se izmeni",
    "EditableLayerHeaderTooltip": "Uključi sloj i njegove šablone u vidžet troškova",
    "SelectableLayerHeaderTitle": "Može da se selektuje",
    "SelectableLayerHeaderTooltip": "Geometrija iz geoobjekta može da se koristi za generisanje stavke novog troška",
    "fieldPickerHeaderTitle": "ID projekta (opciono)",
    "fieldPickerHeaderTooltip": "Opciono polje (string tipa) za skladištenje ID projekta u",
    "selectLabel": "Izaberite",
    "noAssetLayersAvailable": "Nema pronađenog resursa sloja u izabranoj veb mapi",
    "disableEditableCheckboxTooltip": "Ovaj sloj nema mogućnost uređivanja",
    "missingCapabilitiesMsg": "Ovom sloju nedostaju sledeće mogućnosti:",
    "missingGlobalIdMsg": "Ovaj sloj nema polje GlobalId",
    "create": "Kreiraj",
    "update": "Ažuriraj",
    "deleteColumnLabel": "Izbriši",
    "attributeSettingHeaderTitle": "Postavke atributa",
    "addFieldLabelTitle": "Dodaj atribute",
    "layerAttributesHeaderTitle": "Atributi sloja",
    "projectLayerAttributesHeaderTitle": "Atributi sloja projekta",
    "attributeSettingsPopupTitle": "Postavke atributa sloja"
  },
  "costingInfo": {
    "tabTitle": "Informacije o troškovima",
    "proposedMainsLabel": "Predložene mreže",
    "addCostingTemplateLabel": "Dodaj šablon troškova",
    "manageScenariosTitle": "Upravljaj scenarijima",
    "featureTemplateTitle": "Šablon geoobjekta",
    "costEquationTitle": "Jednačina troškova",
    "geographyTitle": "Geografija",
    "scenarioTitle": "Scenario",
    "actionTitle": "Radnje",
    "scenarioNameLabel": "Naziv scenarija",
    "addBtnLabel": "Dodaj",
    "srNoLabel": "Ne.",
    "deleteLabel": "Izbriši",
    "duplicateScenarioName": "Duplirano ime scenarija",
    "hintText": "<div>Savet: koristite sledeće ključne reči</div><ul><li><b>{TOTALCOUNT}</b>: koristi ukupan broj istog tipa resursa u geografiji</li><li><b>{MEASURE}</b>: Koristi dužinu za resurs linije i oblast za resurs poligona</li><li><b>{TOTALMEASURE}</b>: Koristi ukupnu dužinu za resurs linije i ukupnu oblast za resurs poligona za isti tip u geografiji</li></ul>Možete da koristite funkcije kao što su:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Izmenite jednačinu troškova prema zahtevima vašeg projekta.",
    "noneValue": "Ništa",
    "requiredCostEquation": "Nevažeća jednačina troška za ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Postoji duplirani unos šablona za ${layerName} : ${templateName}",
    "defaultEquationRequired": "Podrazumevana jednačina je obavezna za ${layerName} : ${templateName}",
    "validCostEquationMessage": "Unesite važeću jednačinu troška",
    "costEquationHelpText": "Izmenite jednačinu troška prema zahtevima vašeg projekta",
    "scenarioHelpText": "Izaberite scenario prema zahtevima vašeg projekta",
    "copyRowTitle": "Kopiraj red",
    "noTemplateAvailable": "Dodajte bar jedan šablon za ${layerName}",
    "manageScenarioLabel": "Upravljaj scenarijem",
    "noLayerMessage": "Unesite bar jedan sloj u ${tabName}",
    "noEditableLayersAvailable": "Sloj(evi) treba da bude(-u) označen(i) kao urediv(i) u kartici postavki sloja",
    "updateProjectCostCheckboxLabel": "Ažuriraj jednačine projekta",
    "updateProjectCostEquationHint": "Napomena: to će omogućiti korisniku da ažurira jednačine troška za resurse koji su već dodati u postojeće projekte sa novim jednačinama definisanim u nastavku na osnovu šablona geoobjekta, geografije i scenarija. Ako nije pronađena kombinacija, biće podešena na podrazumevanu jednačinu troška tj. geografija i scenario kao 'Ništa'. U slučaju uklanjanja šablona geoobjekta, trošak će biti podešen kao 0."
  },
  "statisticsSettings": {
    "tabTitle": "Dodatne postavke",
    "addStatisticsLabel": "Dodaj statistiku",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Oznaka",
    "addNewStatisticsText": "Dodaj novu statistiku",
    "deleteStatisticsText": "Obriši statistiku",
    "moveStatisticsUpText": "Pomeri statistiku na gore",
    "moveStatisticsDownText": "Pomeri statistiku na dole",
    "selectDeselectAllTitle": "Selektuj sve"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Dodaj dodatni trošak projekta",
    "additionalCostValueColumnHeader": "Vrednost",
    "invalidProjectCostMessage": "Nevažeći unos za trošak projekta",
    "additionalCostLabelColumnHeader": "Oznaka",
    "additionalCostTypeColumnHeader": "Tip"
  },
  "statisticsType": {
    "countLabel": "Brojač",
    "averageLabel": "Prosečno",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Zbir",
    "areaLabel": "Površina",
    "lengthLabel": "Dužina"
  }
});