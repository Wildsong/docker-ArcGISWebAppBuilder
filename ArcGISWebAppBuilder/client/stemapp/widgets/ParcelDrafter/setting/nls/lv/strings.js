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
  "setBtnLabel": "Iestatīt",
  "selectLabel": "Izvēlēties",
  "selectLayerLabel": "Atlasīt zemes vienību slāņus",
  "selectLayerHintText": "Padoms. Izmantojiet iestatīšanas pogu, lai izvēlētos zemes gabala laukumu un tā saistīto līniju slāni",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "Izvēlētajam laukuma slānim nav derīga saistītā slāņa."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Atlasīt saistīto līniju slāni",
    "layerSettingTabLabel": "Zemes vienību slāņi",
    "attributeSettingTabLabel": "Atribūtu iestatījumi",
    "advancedSettingTabLabel": "Uzlabotie iestatījumi",
    "selectLayerHintText": "Padoms. Izmantojiet COGO vērtību saglabāšanai zemes gabala līniju slānī",
    "selectFieldLegendLabel": "Izvēlēties laukus COGO vērtību saglabāšanai zemes gabala līniju slānī",
    "bearingFieldLabel": "Peilējums",
    "chordLengthFieldLabel": "Hordas garums",
    "distanceFieldLabel": "Attālums",
    "sequenceIdFieldLabel": "Sekvences ID",
    "radiusFieldLabel": "Rādiuss",
    "foreignKeyFieldLabel": "Ārējā atslēga",
    "arcLengthFieldLabel": "Loka garums",
    "lineTypeFieldLabel": "Līnijas veids",
    "parcelPointSymbolLabel": "Zemes gabala punkta simbols",
    "parcelPointSymbolHintText": "Padoms. To izmanto punkta simbola attēlošanai līnijas sākumā.",
    "startOrRotationSymbolLabel": "Startējiet un pagrieziet punkta simbolu",
    "startOrRotationSymbolHintText": "Uzvedne: tiek izmantots, lai parādītu sākuma un pagriešanas punkta simbolu.",
    "symbolPickerPreviewText": "Priekšskatījums",
    "selectLineLayerLabel": "Atlasīt līniju slāni"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Atlasīt laukumu slāni",
    "selectPolygonLayerHintText": "Padoms. Izmantojiet izvēlēto zemes gabala laukuma slāni",
    "selectFieldLegendLabel": "Atlasiet laukus, lai saglabātu koordinātu ģeometrijas informāciju",
    "parcelNameLabel": "Zemes gabala nosaukums",
    "rotationLabel": "Rotācija",
    "planNameLabel": "Plāna nosaukums",
    "scalingLabel": "Mērogs",
    "documentTypeLabel": "Dokumenta veids",
    "miscloseRatioLabel": "Mērījuma kļūdas koeficients",
    "statedAreaLabel": "Norādītais laukums",
    "miscloseDistanceLabel": "Mērījumu kļūdas attālums",
    "selectPolygonLayerLabelPopUp": "Atlasīt laukumu slāni",
    "honorSettingRbLabel": "Tīmekļa kartes uznirstošo logu iestatījumi",
    "customSettingsRbLabel": "Pielāgoti iestatījumi",
    "display": "Parādīt",
    "edit": "Rediģēt",
    "editpageName": "Nosaukums",
    "actions": "Darbības",
    "editpageAlias": "Aizstājvārds",
    "titleLabel": "Sadaļas virsraksts"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Līnijas veids",
    "valueLabel": "Vērtība",
    "symbolLabel": "Simbols",
    "connectionLineLabel": "Savienojuma līnija",
    "boundaryLineLabel": "Robežlīnija"
  },
  "closureSetting": {
    "snappingLayerLabel": "Slāņu pielipināšana",
    "snappingBtnLabel": "Iestatīt",
    "snappingLayerHintText": "Padoms. Izvēlieties slāņus, kuriem zemes gabalu līnijas tiks pielipinātas.",
    "miscloseDistanceLabel": "Mērījumu kļūdas attālums",
    "miscloseDistanceHintText": "Padoms. Norādiet kļūdas attālumu un tās mērvienības.",
    "miscloseRatioLabel": "Kļūdas koeficients",
    "miscloseRatioHintText": "Padoms. Norādiet mērījumu kļūdas koeficientu.",
    "snappingToleranceLabel": "Pielipināšanas tolerance",
    "pixelLabel": "Pikseļi",
    "snappingToleranceHintText": "Padoms. Norādiet pielipināšanas toleranci.",
    "selectLayerLabel": "Izvēlēties slāni"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Nederīgs peilējuma lauks",
    "chordLengthErrMsg": "Nederīgs ChordLength",
    "distanceFieldErrMsg": "Nederīga distance",
    "sequenceIdFieldErrMsg": "Nederīgs sequenceId",
    "radiusFieldErrMsg": "Nederīgs rādiuss",
    "foreignKeyFieldErrMsg": "Nederīga ārējā atslēga",
    "arcLengthFieldErrMsg": "Nederīgs loka garums",
    "lineTypeFieldErrMsg": "Nederīgs līnijas veids",
    "parcelNameFieldErrMsg": "Nederīgs zemes gabala nosaukuma lauks",
    "planNameFieldErrMsg": "Nederīgs plāna nosaukuma lauks",
    "scaleFieldErrMsg": "Nederīgs mēroga lauks",
    "documentTypeFieldErrMsg": "Nederīgs dokumenta veida lauks",
    "miscloseRatioFieldErrMsg": "Nederīgs kļūdas koeficienta lauks",
    "statedAreaFieldErrMsg": "Nederīgs norādītās platības lauks",
    "miscloseDistanceFieldErrMsg": "Nederīgs kļūdas attāluma lauks",
    "globalIdFieldErrMsg": "Izvēlētajam laukuma slānim nav derīga lauka esriFieldTypeGlobalID.",
    "invalidPolylineLayer": "Lūdzu, izvēlieties derīgu zemes gabala polilīniju līniju slāni",
    "invalidPolygonLayer": "Lūdzu, izvēlieties derīgu zemes gabala laukuma slāni",
    "invalidMiscloseDistance": "Lūdzu, ievadiet derīgu mērījumu kļūdas attālumu",
    "invalidSnappingTolerance": "Lūdzu, ievadiet derīgu pielipināšanas toleranci",
    "invalidMiscloseRatio": "Lūdzu, ievadiet derīgu mērījumu kļūdas  koeficientu",
    "selectDistinctLineTypes": "Lūdzu, ievadiet noteiktu vērtību katra veida līnijai",
    "invalidConnectionLineType": "Nederīga savienojošās līnijas vērtība",
    "invalidBoundaryLineType": "Nederīga robežlīnijas vērtība",
    "selectDistinctPolylineFields": "Lūdzu, atlasiet noteiktu lauku katrai COGO vērtībai.",
    "selectDistinctPolygonFields": "Atlasiet atšķirīgu lauku katrai koordinātu ģeometrijas informācijai."
  }
});