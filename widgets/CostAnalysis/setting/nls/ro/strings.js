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
  "configText": "Stabilire configuraţie text:",
  "generalSettings": {
    "tabTitle": "Setări generale",
    "measurementUnitLabel": "Unitate de cost",
    "currencyLabel": "Simbol de cost",
    "roundCostLabel": "Cost rotunjit",
    "projectOutputSettings": "Setări rezultate proiect",
    "typeOfProjectAreaLabel": "Tip de domeniu de proiect",
    "bufferDistanceLabel": "Distanţă buffer",
    "csvReportExportLabel": "Permiteți utilizatorului să exporte raportul proiectului",
    "editReportSettingsBtnTooltip": "Editați setările de raport",
    "roundCostValues": {
      "twoDecimalPoint": "Două puncte zecimale",
      "nearestWholeNumber": "Cel mai apropiat număr întreg",
      "nearestTen": "Cel mai apropiat număr de ordinul zecilor",
      "nearestHundred": "Cel mai apropiat număr de ordinul sutelor",
      "nearestThousand": "Cel mai apropiat număr de ordinul miilor",
      "nearestTenThousands": "Cel mai apropiat număr de ordinul zecilor de mii"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Setări raport",
      "reportNameLabel": "Numele raportului (opțional):",
      "checkboxLabel": "Afișare",
      "layerTitle": "Titlu",
      "columnLabel": "Etichetă",
      "duplicateMsg": "Duplicare etichetă"
    },
    "projectAreaType": {
      "outline": "Contur",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unitate monetară nevalidă",
      "bufferDistance": "Distanţă buffer nevalidă",
      "outOfRangebufferDistance": "Valoarea ar trebui să fie mai mare de 0 și mai mică sau egală cu 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Setări proiect",
    "costingGeometrySectionTitle": "Stabilirea caracteristicilor geografice pentru evaluarea costurilor (opţional)",
    "costingGeometrySectionNote": "Notă: Configurarea acestui strat tematic va permite utilizatorului să formuleze ecuaţii de cost pentru șabloanele de obiecte spaţiale în funcție de caracteristicile geografice.",
    "projectTableSectionTitle": "Posibilitatea de a salva/încărca setările proiectului (opţional)",
    "projectTableSectionNote": "Notă: Configurarea tuturor tabelelor și straturilor tematice va permite utilizatorului să salveze/încarce proiectul pentru utilizare ulterioară.",
    "costingGeometryLayerLabel": "Evaluarea geometriei stratului tematic",
    "fieldLabelGeography": "Câmp pentru etichetă geometrie",
    "projectAssetsTableLabel": "Tabel active proiect",
    "projectMultiplierTableLabel": "Tabel multiplicator costuri suplimentare proiect",
    "projectLayerLabel": "Strat tematic proiect",
    "configureFieldsLabel": "Configurare câmpuri",
    "fieldDescriptionHeaderTitle": "Descriere câmp",
    "layerFieldsHeaderTitle": "Câmp strat tematic",
    "selectLabel": "Selectare",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} este deja selectat",
      "invalidConfiguration": "Selectați ${fieldsString}"
    },
    "costingGeometryHelp": "<p> vor fi afişate stratul/straturile tematice de tip poligon cu următoarele condiții: <br/> <li> Stratul tematic trebuie să aibă funcţia 'Query'</li><li> Stratul tematic trebuie să aibă un câmp GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Șirul și câmpurile numerice ale câmpului selectat 'Costing Geometry Layer' vor fi afișate în lista verticală 'Field to Label Geography'.</p>",
    "projectAssetsTableHelp": "<p>Vor fi afișate tabelele cu următoarele condiții: <br/> <li>Tabelul trebuie să aibă funcţii de editare, respectiv 'Create', 'Delete' și 'Update'</li> <li>Tabelul trebuie să aibă şase câmpuri cu tipul exact de nume și date:</li><ul><li> AssetGUID (câmp tip GUID)</li><li> CostEquation (câmp tip șir)</li><li> Scenario (Câmp tip șir)</li><li> TemplateName (Câmp tip șir)</li><li> GeographyGUID (Câmp tip GUID)</li><li> ProjectGUID (Câmp tip GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Vor fi afișate tabelele cu următoarele condiții: <br/> <li>Tabelul trebuie să aibă funcţii de editare, respectiv 'Create', 'Delete' și 'Update'</li> <li>Tabelul trebuie să aibă cinci câmpuri cu tipul exact de nume și date:</li><ul><li> Descriere (Câmp tip șir)</li><li> Tip (Câmp tip șir)</li><li> Valoare (Câmp tip flotant/dublu)</li><li> Costindex (Câmp tip număr întreg)</li><li> ProjectGUID (Câmp tip GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>Vor fi afișate straturile tematice de tip poligon cu următoarele condiții: <br/> <li>Stratul tematic trebuie să aibă funcţii de editare, respectiv 'Create', 'Delete' și 'Update'</li> <li>Stratul tematic trebuie să aibă cinci câmpuri cu tipul exact de nume și date:</li><ul><li>ProjectName (Câmp tip șir)</li><li>Descriere (Câmp tip șir)</li><li>Totalassetcost (Câmp tip flotant/dublu)</li><li>Grossprojectcost (Câmp tip flotant/dublu)</li><li>GlobalID (Câmp tip GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centroid strat tematic punct",
    "selectRelatedPointLayerDefaultOption": "Selectare",
    "pointLayerHintText": "<p>Se va afișa stratul (straturile) tematic(e) de puncte cu următoarele condiții: <br/> <li>\tStratul tematic trebuie să aibă un câmp 'Projectid' (tip GUID)</li><li>\tStratul tematic trebuie să aibă capacități de editare și anume 'Creare’, 'Ștergere' și 'Actualizare'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Setări strat tematic",
    "layerNameHeaderTitle": "Nume strat tematic",
    "layerNameHeaderTooltip": "Lista straturilor tematice în hartă",
    "EditableLayerHeaderTitle": "Editabil",
    "EditableLayerHeaderTooltip": "Includeţi stratul tematic și șabloanele acestuia în widget-ul de calculare a costurilor",
    "SelectableLayerHeaderTitle": "Selectabil",
    "SelectableLayerHeaderTooltip": "Geometria din stratul tematic poate fi utilizată pentru a genera un nou element de cost",
    "fieldPickerHeaderTitle": "ID Proiect (opţional)",
    "fieldPickerHeaderTooltip": "Câmp opţional (de tip şir) pentru a stoca ID-ul proiectului în",
    "selectLabel": "Selectare",
    "noAssetLayersAvailable": "În harta web selectată nu a fost găsit niciun activ de strat tematic.",
    "disableEditableCheckboxTooltip": "Acest strat tematic nu are funcţii de editare",
    "missingCapabilitiesMsg": "Acestui strat tematic îi lipsesc următoarele capacități:",
    "missingGlobalIdMsg": "Acest strat tematic nu are câmpul GlobalId",
    "create": "Creare",
    "update": "Actualizare",
    "deleteColumnLabel": "Ștergere",
    "attributeSettingHeaderTitle": "Setări de atribute",
    "addFieldLabelTitle": "Adăugare atribute",
    "layerAttributesHeaderTitle": "Atribute strat",
    "projectLayerAttributesHeaderTitle": "Atribute strat tematic proiect",
    "attributeSettingsPopupTitle": "Setări strat tematic atribut"
  },
  "costingInfo": {
    "tabTitle": "Informații costuri",
    "proposedMainsLabel": "Elemente principale propuse",
    "addCostingTemplateLabel": "Adăugare şablon calculare cost",
    "manageScenariosTitle": "Gestionare scenarii",
    "featureTemplateTitle": "Şablon obiect spaţial",
    "costEquationTitle": "Ecuaţie costuri",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scenariu",
    "actionTitle": "Acţiuni",
    "scenarioNameLabel": "Nume scenariu",
    "addBtnLabel": "Adăugare",
    "srNoLabel": "Nu.",
    "deleteLabel": "Ştergere",
    "duplicateScenarioName": "Duplicare nume scenariu",
    "hintText": "<div>Sfat: Utilizaţi următoarele cuvinte cheie</div><ul><li><b>{TOTALCOUNT}</b>: Utilizează numărul total de active de același tip dintr-o formă geografică</li><li><b>{MEASURE}</b>: Utilizează lungimea liniei corespunzătoare activului și suprafeţei pentru un activ tip poligon poligon</li><li><b>{TOTALMEASURE}</b>: Utilizează lungimea liniei corespunzătoare activului și suprafeţei totale pentru un activ tip poligon de același tip dintr-o formă geografică</li></ul>Puteţi folosi funcţii precum:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modificaţi ecuaţia costuri conform necesităţilor dvs. de proiect.",
    "noneValue": "Niciunul",
    "requiredCostEquation": "Ecuaţie cost nevalidă pentru ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Există o intrare şablon duplicat pentru ${layerName} : ${templateName}",
    "defaultEquationRequired": "Ecuaţia implicită este necesară pentru ${layerName} : ${templateName}",
    "validCostEquationMessage": "Introduceți o ecuaţie costuri validă",
    "costEquationHelpText": "Modificaţi ecuaţia costuri conform necesităţilor dvs. de proiect.",
    "scenarioHelpText": "Selectați scenariul conform necesităţilor dvs. de proiect.",
    "copyRowTitle": "Copiere rând",
    "noTemplateAvailable": "Adăugați cel puțin un șablon pentru ${layerName}",
    "manageScenarioLabel": "Gestionare scenariu",
    "noLayerMessage": "Introduceți cel puțin un strat tematic pentru ${tabName}",
    "noEditableLayersAvailable": "Straturile tematice trebuie să fie bifate ca editabile în fila Setări strat tematic",
    "updateProjectCostCheckboxLabel": "Actualizare ecuații proiect",
    "updateProjectCostEquationHint": "Sfat: Acest lucru îi va permite utilizatorului să actualizeze ecuațiile de cost pentru activele deja adăugate la proiectele existente cu noile ecuații definite mai jos bazate pe șablonul de obiect spațial, geografie și scenariu. Dacă nu este găsită combinația, va fi setată la ecuație de cost implicită, adică geografie și scenariu ca 'Nimic'. În cazul unui șablon de obiect spațial eliminat, costul va fi setat la 0."
  },
  "statisticsSettings": {
    "tabTitle": "Setări suplimentare",
    "addStatisticsLabel": "Adăugare statistică",
    "fieldNameTitle": "Câmp",
    "statisticsTitle": "Etichetă",
    "addNewStatisticsText": "Adăugare statistică nouă",
    "deleteStatisticsText": "Ștergere statistică",
    "moveStatisticsUpText": "Mutare statistică în sus",
    "moveStatisticsDownText": "Mutare statistică în jos",
    "selectDeselectAllTitle": "Selectare toate"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Adăugare Cost proiect suplimentar",
    "additionalCostValueColumnHeader": "Valoare",
    "invalidProjectCostMessage": "Intrare nevalabilă pentru cost de proiect",
    "additionalCostLabelColumnHeader": "Etichetă",
    "additionalCostTypeColumnHeader": "Tip"
  },
  "statisticsType": {
    "countLabel": "Număr",
    "averageLabel": "Medie",
    "maxLabel": "Maxim",
    "minLabel": "Minim",
    "summationLabel": "Însumare",
    "areaLabel": "Suprafaţă",
    "lengthLabel": "Lungime"
  }
});