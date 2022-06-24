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
  "setBtnLabel": "Nastaviť",
  "selectLabel": "Vybrať",
  "selectLayerLabel": "Vybrať vrstvu parciel",
  "selectLayerHintText": "Tip: Použite tlačidlo nastavenia na voľbu polygónu parcely a jeho súvisiacej vrstvy línií",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Zvolená polygónová vrstva nemá platnú relačne súvisiacu vrstvu."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Zvoľte relačne súvisiacu vrstvu línií",
    "layerSettingTabLabel": "Parcelové vrstvy",
    "attributeSettingTabLabel": "Nastavenia atribútov",
    "advancedSettingTabLabel": "Pokročilé nastavenia",
    "selectLayerHintText": "Nápoveda: Použite na uchovanie COGO hodnôt v parcelovej vrstve línií",
    "selectFieldLegendLabel": "Zvoľte stĺpce na uchovanie COGO hodnôt v parcelovej vrstve línií",
    "bearingFieldLabel": "Smerník",
    "chordLengthFieldLabel": "Dĺžka chordu",
    "distanceFieldLabel": "Vzdialenosť",
    "sequenceIdFieldLabel": "ID sekvencie",
    "radiusFieldLabel": "Polomer",
    "foreignKeyFieldLabel": "Cudzí kľúč",
    "arcLengthFieldLabel": "Dĺžka oblúka",
    "lineTypeFieldLabel": "Typ línie",
    "parcelPointSymbolLabel": "Symbol bodu parcely",
    "parcelPointSymbolHintText": "Nápoveda: Použite na zobrazenie symbolu bodu pre pôvod línie.",
    "startOrRotationSymbolLabel": "Symbol bodu začiatku a rotácie",
    "startOrRotationSymbolHintText": "Nápoveda: Použite na zobrazenie symbolu bodu začiatku a rotácie.",
    "symbolPickerPreviewText": "Náhľad",
    "selectLineLayerLabel": "Vybrať vrstvu línií"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Vybrať vrstvu polygónu",
    "selectPolygonLayerHintText": "Nápoveda: Použite na výber parcelovej polygónovej vrstvy",
    "selectFieldLegendLabel": "Zvoliť polia na uchovanie informácií súradnicovej geometrie",
    "parcelNameLabel": "Názov parcely",
    "rotationLabel": "Rotácia",
    "planNameLabel": "Meno plánu",
    "scalingLabel": "Škálovanie",
    "documentTypeLabel": "Typ dokumentu",
    "miscloseRatioLabel": "Pomer nepresnosti",
    "statedAreaLabel": "Uvedená plocha",
    "miscloseDistanceLabel": "Vzdialenosť nepresnosti",
    "selectPolygonLayerLabelPopUp": "Vybrať vrstvu polygónu",
    "honorSettingRbLabel": "Nastavenia kontextového okna webovej mapy",
    "customSettingsRbLabel": "Vlastné nastavenia",
    "display": "Zobrazenie",
    "edit": "Editovať",
    "editpageName": "Meno",
    "actions": "Akcie",
    "editpageAlias": "Alias",
    "titleLabel": "Názov časti"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Typ línie",
    "valueLabel": "Hodnota",
    "symbolLabel": "Symbol",
    "connectionLineLabel": "Línia pripojenia",
    "boundaryLineLabel": "Línia hraníc"
  },
  "closureSetting": {
    "snappingLayerLabel": "Vrstvy prichytávania",
    "snappingBtnLabel": "Nastaviť",
    "snappingLayerHintText": "Tip: Zvoľte vrstvy, ku ktorým sa parcelové línie prichytia.",
    "miscloseDistanceLabel": "Vzdialenosť nepresnosti",
    "miscloseDistanceHintText": "Tip: Špecifikujte vzdialenosť nepresnosti a jej jednotky.",
    "miscloseRatioLabel": "Pomer nepresnosti",
    "miscloseRatioHintText": "Tip: Špecifikujte pomer nepresnosti.",
    "snappingToleranceLabel": "Tolerancia prichytávania",
    "pixelLabel": "Pixle",
    "snappingToleranceHintText": "Tip: Špecifikujte toleranciu prichytávania.",
    "selectLayerLabel": "Vybrať vrstvu"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Neplatný stĺpec s hodnotou smerníka",
    "chordLengthErrMsg": "Neplatná dĺžka chordu",
    "distanceFieldErrMsg": "Neplatná vzdialenosť",
    "sequenceIdFieldErrMsg": "Neplatné id sekvencie",
    "radiusFieldErrMsg": "Neplatný polomer",
    "foreignKeyFieldErrMsg": "Neplatný cudzí kľúč",
    "arcLengthFieldErrMsg": "Neplatná dĺžka polkurhu",
    "lineTypeFieldErrMsg": "Neplatný typ línie",
    "parcelNameFieldErrMsg": "Neplatné pole s menom parcely",
    "planNameFieldErrMsg": "Neplatné pole mena plánu",
    "scaleFieldErrMsg": "Neplatné pole s hodnotou mierky",
    "documentTypeFieldErrMsg": "Neplatné pole typu dokumentu",
    "miscloseRatioFieldErrMsg": "Neplatné pole pomeru nepresnosti",
    "statedAreaFieldErrMsg": "Neplatné pole uvedenej plochy",
    "miscloseDistanceFieldErrMsg": "Neplatné pole vzdialenosti nepresnosti",
    "globalIdFieldErrMsg": "Zvolená polygónová vrstva nemá platné 'esriFieldTypeGlobalID' pole.",
    "invalidPolylineLayer": "Prosím zvoľte platnú parcelovú vrstvu línie",
    "invalidPolygonLayer": "Prosím zvoľte platnú parcelovú vrstvu polygónu",
    "invalidMiscloseDistance": "Prosím zadajte platnú vzdialenosť nepresnosti",
    "invalidSnappingTolerance": "Prosím zadajte platnú toleranciu prichytávania",
    "invalidMiscloseRatio": "Prosím zadajte platný pomer nepresnosti",
    "selectDistinctLineTypes": "Prosím zvoľte odlišnú hodnotu v každom type línie",
    "invalidConnectionLineType": "Neplatná hodnota línie pripojenia",
    "invalidBoundaryLineType": "Neplatná hodnota línie hraníc",
    "selectDistinctPolylineFields": "Prosím zvoľte odlišný stĺpec pre každu COGO hodnotu.",
    "selectDistinctPolygonFields": "Prosím zvoľte odlišný stĺpec pre každú informáciu súradnicovej geometrie."
  }
});