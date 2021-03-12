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
  "configText": "Postavi tekst za konfiguraciju:",
  "generalSettings": {
    "tabTitle": "Opće postavke",
    "measurementUnitLabel": "Jedinica troška",
    "currencyLabel": "Simbol troška",
    "roundCostLabel": "Zaokruženi trošak",
    "projectOutputSettings": "Izlazne postavke projekta",
    "typeOfProjectAreaLabel": "Vrsta područja projekta",
    "bufferDistanceLabel": "Veličina pojasa",
    "csvReportExportLabel": "Dopusti korisniku izvoz izvješća o projektu",
    "editReportSettingsBtnTooltip": "Uredi postavke izvješća",
    "roundCostValues": {
      "twoDecimalPoint": "Dva decimalna zareza",
      "nearestWholeNumber": "Najbliži cijeli broj",
      "nearestTen": "Najbliža desetica",
      "nearestHundred": "Najbliža stotica",
      "nearestThousand": "Najbliža tisućica",
      "nearestTenThousands": "Najbližih deset tisuća"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Postavke izvješća",
      "reportNameLabel": "Naziv izvješća (neobavezno) :",
      "checkboxLabel": "Prikaži",
      "layerTitle": "Naziv",
      "columnLabel": "Oznaka",
      "duplicateMsg": "Dvostruka oznaka"
    },
    "projectAreaType": {
      "outline": "Obris",
      "buffer": "Pojas"
    },
    "errorMessages": {
      "currency": "Nevažeća valuta jedinice",
      "bufferDistance": "Nevažeća udaljenost pojasa",
      "outOfRangebufferDistance": "Vrijednost bi trebala biti veća od 0 i manja ili jednaka 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Postavke projekta",
    "costingGeometrySectionTitle": "Definiraj geografiju za troškove (neobavezno)",
    "costingGeometrySectionNote": "Napomena: konfiguracijom ovog sloja omogućit će se korisniku postavljanje jednadžbi za troškove predložaka geoobjekata na temelju geografija.",
    "projectTableSectionTitle": "Mogućnost postavki spremanja/učitavanja projekta (neobavezno)",
    "projectTableSectionNote": "Napomena: konfiguracijom svih tablica i slojeva omogućit će se korisniku spremanje/učitavanje projekta za kasniju upotrebu.",
    "costingGeometryLayerLabel": "Sloj geometrije za troškove",
    "fieldLabelGeography": "Polje za označavanje geografije",
    "projectAssetsTableLabel": "Tablica sa sredstvima projekta",
    "projectMultiplierTableLabel": "Tablica dodatnih troškova množitelja projekta",
    "projectLayerLabel": "Sloj projekta",
    "configureFieldsLabel": "Konfiguriranje polja",
    "fieldDescriptionHeaderTitle": "Opis polja",
    "layerFieldsHeaderTitle": "Polje sloja",
    "selectLabel": "Odaberi",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} je već odabran",
      "invalidConfiguration": "Odaberite ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Prikazat će se poligonalni slojevi sa sljedećim uvjetima: <br/> <li> sloj mora imati mogućnost 'Upita'</li><li> sloj mora imati polje GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Polja niza i brojčana polja odabranog 'Sloja geometrije za troškove' prikazat će se u padajućem izborniku 'Polje za označavanje geografije'.</p>",
    "projectAssetsTableHelp": "<p>Prikazat će se tablice sa sljedećim uvjetima: <br/> <li>tablica mora imati mogućnost uređivanja, i to 'Stvori', 'Izbriši' i 'Ažuriraj'</li> <li>tablica mora imati šest polja s točnom vrstom naziva i podataka:</li><ul><li> AssetGUID (polje GUID)</li><li> CostEquation (polje niza)</li><li> scenarij (polje niza)</li><li> TemplateName (polje niza)</li><li> GeographyGUID (polje GUID)</li><li> ProjectGUID (polje GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Prikazat će se tablice sa sljedećim uvjetima: <br/> <li>tablica mora imati mogućnost uređivanja, i to 'Stvori', 'Izbriši' i 'Ažuriraj'</li> <li>tablica mora imati pet polja s točnom vrstom naziva i podataka:</li><ul><li> opis (polje niza)</li><li> vrsta (polje niza)</li><li> vrijednost (plutajuće/dvostruko polje)</li><li> indeks troška (polje cijelog broja)</li><li> ProjectGUID (polje GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>Prikazat će se poligonski sloj sa sljedećim uvjetima: <br/> <li>sloj mora imati mogućnost uređivanja, i to 'Stvori', 'Izbriši' i 'Ažuriraj'</li> <li>sloj mora imati pet polja s točnom vrstom naziva i podataka:</li><ul><li>ProjectName (polje niza)</li><li>opis (polje niza)</li><li>Totalassetcost (plutajuće/dvostruko polje)</li><li>Grossprojectcost (plutajuće/dvostruko polje)</li><li>GlobalID (polje GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Središte točkastog sloja",
    "selectRelatedPointLayerDefaultOption": "Odaberi",
    "pointLayerHintText": "<p>Prikazat će se točkasti slojevi sa sljedećim uvjetima: <br/> <li>\tSloj mora imati polje „Projectid” (vrste GUID)</li><li>\tSloj mora imati mogućnosti uređivanja, i to „Stvori”, „Izbriši” i „Ažuriraj”</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Postavke sloja",
    "layerNameHeaderTitle": "Naziv sloja",
    "layerNameHeaderTooltip": "Popis slojeva na karti",
    "EditableLayerHeaderTitle": "Može se uređivati",
    "EditableLayerHeaderTooltip": "Uključite sloj i njegove predloške u widget za troškove",
    "SelectableLayerHeaderTitle": "Može se odabrati",
    "SelectableLayerHeaderTooltip": "Geometrija iz geoobjekta može se upotrijebiti za generiranje nove stavke troška",
    "fieldPickerHeaderTitle": "ID projekta (neobavezno)",
    "fieldPickerHeaderTooltip": "Neobavezno polje (vrste niza) za pohranjivanje ID-a projekta",
    "selectLabel": "Odaberi",
    "noAssetLayersAvailable": "Nema sloja sredstva na odabranoj web-karti",
    "disableEditableCheckboxTooltip": "Ovaj sloj nema mogućnosti za uređivanje",
    "missingCapabilitiesMsg": "Ovom sloju nedostaju sljedeće mogućnosti:",
    "missingGlobalIdMsg": "Ovaj sloj nema polje GlobalId",
    "create": "Stvori",
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
    "proposedMainsLabel": "Predložene glavne vrijednosti",
    "addCostingTemplateLabel": "Dodavanje predloška troškova",
    "manageScenariosTitle": "Upravljanje scenarijima",
    "featureTemplateTitle": "Predložak geoobjekta",
    "costEquationTitle": "Jednadžba troška",
    "geographyTitle": "Geografija",
    "scenarioTitle": "Scenarij",
    "actionTitle": "Radnje",
    "scenarioNameLabel": "Naziv scenarija",
    "addBtnLabel": "Dodaj",
    "srNoLabel": "Br.",
    "deleteLabel": "Izbriši",
    "duplicateScenarioName": "Duplicirani naziv scenarija",
    "hintText": "<div>Podsjetnik: upotrijebite sljedeće ključne riječi</div><ul><li><b>{TOTALCOUNT}</b>: upotrebljava ukupni broj sredstava iste vrste u geografiji</li> <li><b>{MEASURE}</b>: upotrebljava duljinu za sredstvo linije i područje za sredstvo poligona</li><li><b>{TOTALMEASURE}</b>: upotrebljava ukupnu duljinu za sredstvo linije i ukupno područje za sredstvo poligona iste vrste u geografiji</li></ul>Možete upotrijebiti funkcije kao što su:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Uredite jednadžbu za troškove prema potrebama vašeg projekta.",
    "noneValue": "Nema",
    "requiredCostEquation": "Nevažeća jednadžba za troškove za ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Postoji duplicirani unos predloška za ${layerName} : ${templateName}",
    "defaultEquationRequired": "Potrebna je zadana jednadžba za ${layerName} : ${templateName}",
    "validCostEquationMessage": "Unesite valjanu jednadžbu za troškove",
    "costEquationHelpText": "Uredite jednadžbu za troškove prema potrebama vašeg projekta",
    "scenarioHelpText": "Odaberite scenarij prema potrebama vašeg projekta",
    "copyRowTitle": "Kopiranje reda",
    "noTemplateAvailable": "Dodajte barem jedan predložak za ${layerName}",
    "manageScenarioLabel": "Upravljaj scenarijem",
    "noLayerMessage": "Dodajte barem jedan predložak u ${tabName}",
    "noEditableLayersAvailable": "Slojevi moraju biti označeni da se mogu uređivati u kartici s postavkama sloja",
    "updateProjectCostCheckboxLabel": "Ažuriraj jednadžbe projekta",
    "updateProjectCostEquationHint": "Savjet: time će se omogućiti korisniku da ažurira jednadžbe troškova imovine koja je već dodana u postojeće projekte s novim jednadžbama definiranim u nastavku na temelju predloška geoobjekata, zemljopisa i scenarija. Ako kombinacija nije pronađena, bit će postavljena na zadanu jednadžbu troškova, tj. zemljopis i scenarij kao „Ništa”. U slučaju uklonjenog predloška geoobjekata, trošak će biti postavljena na 0."
  },
  "statisticsSettings": {
    "tabTitle": "Dodatne postavke",
    "addStatisticsLabel": "Dodavanje statistike",
    "fieldNameTitle": "Polje",
    "statisticsTitle": "Oznaka",
    "addNewStatisticsText": "Dodavanje novih statistika",
    "deleteStatisticsText": "Brisanje statistika",
    "moveStatisticsUpText": "Pomicanje statistika prema gore",
    "moveStatisticsDownText": "Pomicanje statistika prema dolje",
    "selectDeselectAllTitle": "Odaberi sve"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Dodavanje dodatnog troška projekta",
    "additionalCostValueColumnHeader": "Vrijednost",
    "invalidProjectCostMessage": "Nevažeći unos troškova projekta",
    "additionalCostLabelColumnHeader": "Oznaka",
    "additionalCostTypeColumnHeader": "Vrsta"
  },
  "statisticsType": {
    "countLabel": "Broj",
    "averageLabel": "Prosječno",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Sažetak",
    "areaLabel": "Poligon",
    "lengthLabel": "Duljina"
  }
});