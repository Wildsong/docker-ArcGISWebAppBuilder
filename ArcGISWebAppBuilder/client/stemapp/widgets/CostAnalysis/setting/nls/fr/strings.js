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
  "configText": "Définir le texte de configuration :",
  "generalSettings": {
    "tabTitle": "paramètres généraux",
    "measurementUnitLabel": "Unité de coût",
    "currencyLabel": "Symbole de coût",
    "roundCostLabel": "Coût arrondi",
    "projectOutputSettings": "Paramètres de sortie de projet",
    "typeOfProjectAreaLabel": "Type de zone de projet",
    "bufferDistanceLabel": "Distance de la zone tampon",
    "csvReportExportLabel": "Permettre à l’utilisateur d’exporter le rapport du projet",
    "editReportSettingsBtnTooltip": "Mettre à jour les paramètres de rapport",
    "roundCostValues": {
      "twoDecimalPoint": "Deux points décimaux",
      "nearestWholeNumber": "Nombre entier le plus proche",
      "nearestTen": "Dizaine la plus proche",
      "nearestHundred": "Centaine la plus proche",
      "nearestThousand": "Milliers les plus proches",
      "nearestTenThousands": "Dix mille les plus proches"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Paramètres de rapport",
      "reportNameLabel": "Nom du rapport (facultatif) :",
      "checkboxLabel": "Afficher",
      "layerTitle": "Titre",
      "columnLabel": "Étiquette",
      "duplicateMsg": "Étiquette dupliquée"
    },
    "projectAreaType": {
      "outline": "Contour",
      "buffer": "Zone tampon"
    },
    "errorMessages": {
      "currency": "Unité de devise non valide",
      "bufferDistance": "Distance de zone tampon non valide",
      "outOfRangebufferDistance": "La valeur doit être supérieure à 0 et inférieure ou égale à 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Paramètres du projet",
    "costingGeometrySectionTitle": "Définir la géographie pour les coûts (facultatif)",
    "costingGeometrySectionNote": "Remarque : Configurer cette couche permettra à l’utilisateur de définir des équations de coûts de modèles d’entités en fonction des géographies.",
    "projectTableSectionTitle": "Possibilité d’enregistrer/de charger les paramètres de projet (facultatif)",
    "projectTableSectionNote": "Remarque : Configurer toutes les tables et couches permettra à l’utilisateur d’enregistrer/de charger le projet pour une utilisation ultérieure.",
    "costingGeometryLayerLabel": "Couche de géométrie de coûts",
    "fieldLabelGeography": "Champ de la géographie d’étiquette",
    "projectAssetsTableLabel": "Table de ressources de projets",
    "projectMultiplierTableLabel": "Table de coûts supplémentaire de multiplicateur de projet",
    "projectLayerLabel": "Couche de projet",
    "configureFieldsLabel": "Configurer les champs",
    "fieldDescriptionHeaderTitle": "Description du champ",
    "layerFieldsHeaderTitle": "Champ de couche",
    "selectLabel": "Sélectionner",
    "errorMessages": {
      "duplicateLayerSelection": "La couche ${layerName} est déjà sélectionnée",
      "invalidConfiguration": "Sélectionnez ${fieldsString}"
    },
    "costingGeometryHelp": "<p>La ou les couches surfaciques remplissant les conditions suivantes s’afficheront : <br/> <li> La couche doit comporter la capacité 'Interroger'</li><li> La couche doit comporter un champ GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Les champs de chaîne et numériques de la 'couche de géométrie de coûts' sélectionnée s’afficheront dans le menu déroulant 'Champ de libellé de la géographie'.</p>",
    "projectAssetsTableHelp": "<p>La ou les tables remplissant les conditions suivantes s’afficheront : <br/> <li>La table doit comporter des capacités de mise à jour, à savoir 'Créer', 'Supprimer' et 'Mettre à jour'</li> <li>La table doit comporter six champs avec un nom et un type de données précis :</li><ul><li> AssetGUID (champ de type GUID)</li><li> CostEquation (champ de type chaîne)</li><li> Scenario (champ de type chaîne)</li><li> TemplateName (champ de type chaîne)</li><li> GeographyGUID (champ de type GUID)</li><li> ProjectGUID (champ de type GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>La ou les tables remplissant les conditions suivantes seront affichées : <br/> <li>La table doit comporter des capacités de mise à jour, à savoir 'Créer', 'Supprimer' et 'Mettre à jour'</li> <li>La table doit comporter cinq champs avec un nom et un type de données précis :</li><ul><li> Description (champ de type chaîne)</li><li> Type (champ de type chaîne)</li><li> Value (champ de type flottant/double)</li><li> Costindex (champ de type entier)</li><li> ProjectGUID (champ de type GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>La ou les couches surfaciques remplissant les conditions suivantes s’afficheront : <br/> <li>La couche doit comporter des capacités de mise à jour, à savoir 'Créer', 'Supprimer' et 'Mettre à jour'</li> <li>La couche doit comporter cinq champs avec un nom et un type de données précis :</li><ul><li>ProjectName (champ de type chaîne)</li><li>Description (champ de type chaîne)</li><li>Totalassetcost (champ de type flottant/double)</li><li>Grossprojectcost (champ de type flottant/double)</li><li>GlobalID (champ de type GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "Centroïde de la couche de points",
    "selectRelatedPointLayerDefaultOption": "Sélectionner",
    "pointLayerHintText": "<p>Les couches de points avec les conditions suivantes s’afficheront : <br/> <li>\tLa couche doit comporter le champ 'Projectid' (type GUID)</li><li>\tLa couche doit disposer des fonctionnalités de mise à jour 'Créer', 'Supprimer' et 'Mettre à jour'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Paramètres de la couche",
    "layerNameHeaderTitle": "Nom de la couche",
    "layerNameHeaderTooltip": "Liste des couches sur la carte",
    "EditableLayerHeaderTitle": "Modifiable",
    "EditableLayerHeaderTooltip": "Inclure la couche et ses modèles dans le widget de coût",
    "SelectableLayerHeaderTitle": "Sélectionnable",
    "SelectableLayerHeaderTooltip": "La géométrie de l’entité peut être utilisée pour générer un nouvel élément de coût",
    "fieldPickerHeaderTitle": "ID de projet (facultatif)",
    "fieldPickerHeaderTooltip": "Champ facultatif (de type chaîne) pour stocker l’ID de projet dans",
    "selectLabel": "Sélectionner",
    "noAssetLayersAvailable": "Aucune couche valide trouvée sur la carte web",
    "disableEditableCheckboxTooltip": "Cette couche ne comporte aucune fonctionnalité de modification",
    "missingCapabilitiesMsg": "Les fonctionnalités suivantes sont absentes de cette couche :",
    "missingGlobalIdMsg": "Cette couche ne comporte pas le champ ID global",
    "create": "Créer",
    "update": "Mettre à jour",
    "deleteColumnLabel": "Supprimer",
    "attributeSettingHeaderTitle": "Paramètres des attributs",
    "addFieldLabelTitle": "Ajouter des attributs",
    "layerAttributesHeaderTitle": "Attributs de couche",
    "projectLayerAttributesHeaderTitle": "Attributs de couche du projet",
    "attributeSettingsPopupTitle": "Paramètres des attributs de couche"
  },
  "costingInfo": {
    "tabTitle": "Infos de coûts",
    "proposedMainsLabel": "Principaux proposés",
    "addCostingTemplateLabel": "Ajouter un modèle de coûts",
    "manageScenariosTitle": "Gérer les scénarios",
    "featureTemplateTitle": "Modèle d’entités",
    "costEquationTitle": "Équation de coût",
    "geographyTitle": "Géographie",
    "scenarioTitle": "Scénario",
    "actionTitle": "Actions",
    "scenarioNameLabel": "Nom du scénario",
    "addBtnLabel": "Ajouter",
    "srNoLabel": "Non.",
    "deleteLabel": "Supprimer",
    "duplicateScenarioName": "Nom de scénario dupliqué",
    "hintText": "<div>Conseil : Utilisez les mots-clés suivants</div><ul><li><b>{TOTALCOUNT}</b> : Utilise le nombre total de ressources du même type dans une géographie</li><li><b>{MEASURE}</b> : Utilise la longueur de surface et de ressource de ligne pour la ressource de polygone</li><li><b>{TOTALMEASURE}</b> : Utilise la longueur totale de ressource de ligne et de surface totale pour la ressource de polygone du même type dans une géographie</li></ul> Vous pouvez utiliser des fonctions telles que :<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modifiez l’équation de coût selon les besoins de votre projet.",
    "noneValue": "Aucun",
    "requiredCostEquation": "Équation de coût non valide pour ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Une entrée de modèle dupliquée existe pour ${layerName} : ${templateName}",
    "defaultEquationRequired": "L’équation par défaut est requise pour ${layerName} : ${templateName}",
    "validCostEquationMessage": "Entrez une équation de coût valide",
    "costEquationHelpText": "Modifiez l’équation de coût en fonction des besoins de votre projet",
    "scenarioHelpText": "Sélectionnez un scénario en fonction des besoins de votre projet",
    "copyRowTitle": "Copier la ligne",
    "noTemplateAvailable": "Ajoutez au moins un modèle pour ${layerName}",
    "manageScenarioLabel": "Gérer le scénario",
    "noLayerMessage": "Saisissez au moins une couche dans ${tabName}",
    "noEditableLayersAvailable": "La ou les couches doivent être sélectionnées comme modifiables dans l’onglet des paramètres de couche",
    "updateProjectCostCheckboxLabel": "Mettre à jour les équations du projet",
    "updateProjectCostEquationHint": "Astuce : ceci permettra à l’utilisateur de mettre à jour les équations de coût des ressources déjà ajoutées aux projets existants à l’aide des nouvelles équations définies ci-dessous en fonction du modèle d’entités, de la géographie et du scénario. Si la combinaison est introuvable, elle est définie sur l’équation de coût par défaut, c’est-à-dire en configurant la géographie et le scénario sur 'Aucun'. En cas de suppression du modèle d’entités, le coût est défini sur 0."
  },
  "statisticsSettings": {
    "tabTitle": "Paramètres supplémentaires",
    "addStatisticsLabel": "Ajouter des statistiques",
    "fieldNameTitle": "Terrain",
    "statisticsTitle": "Etiquette",
    "addNewStatisticsText": "Ajouter de nouvelles statistiques",
    "deleteStatisticsText": "Supprimer les statistiques",
    "moveStatisticsUpText": "Déplacer les statistiques vers le haut",
    "moveStatisticsDownText": "Déplacer les statistiques vers le bas",
    "selectDeselectAllTitle": "Sélectionner tout"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Ajouter un coût de projet supplémentaire",
    "additionalCostValueColumnHeader": "Valeur",
    "invalidProjectCostMessage": "Entrée non valide pour le coût de projet",
    "additionalCostLabelColumnHeader": "Etiquette",
    "additionalCostTypeColumnHeader": "Type"
  },
  "statisticsType": {
    "countLabel": "Total",
    "averageLabel": "Moyenne",
    "maxLabel": "Maximum",
    "minLabel": "Minimal",
    "summationLabel": "Addition",
    "areaLabel": "Surface",
    "lengthLabel": "Longueur"
  }
});