define({
  "page1": {
    "selectToolHeader": "Choisissez une méthode de sélection des enregistrements à mettre à jour par lots.",
    "selectToolDesc": "Le widget prend en charge 3 méthodes pour générer un jeu sélectionné d’enregistrements à mettre à jour. Vous pouvez uniquement choisir l’une des méthodes. Si vous avez besoin de plusieurs de ces méthodes, créez une nouvelle instance du widget.",
    "selectByShape": "Sélectionner par zone",
    "shapeTypeSelector": "Choisir les outils à autoriser pour sélectionner des entités sur la carte",
    "shapeType": {
      "point": "Point",
      "line": "Ligne",
      "polyline": "Polyligne",
      "freehandPolyline": "Polyligne à main levée",
      "extent": "Etendue",
      "polygon": "Surface",
      "freehandPolygon": "Polygone à main levée"
    },
    "freehandPolygon": "Polygone à main levée",
    "selectBySpatQuery": "Sélectionner par entité",
    "selectByAttQuery": "Sélectionner par entité et valeurs attributaires partagées",
    "selectByQuery": "Sélectionner par requête",
    "toolNotSelected": "Choisissez une autre méthode de sélection",
    "noDrawToolSelected": "Sélectionnez au moins un outil de dessin"
  },
  "page2": {
    "layersToolHeader": "Sélectionnez les couches à mettre à jour et les options des outils de sélection, le cas échéant.",
    "layersToolDesc": "Le type de sélection que vous avez choisi dans l’onglet précédent sera utilisé pour sélectionner et mettre à jour les entités d’un ensemble de couches indiquées ci-dessous. Si vous sélectionnez plusieurs couches à mettre à jour, seuls les champs modifiables communs peuvent être mis à jour. Selon le type de sélection, des options supplémentaires seront requises.",
    "layerTable": {
      "colUpdate": "Mise à jour",
      "colLabel": "Couche",
      "colSelectByLayer": "Sélectionner par couche",
      "colSelectByField": "Champ de requête",
      "colhighlightSymbol": "Symbole de surbrillance :"
    },
    "toggleLayers": "Activer/désactiver la visibilité des couches lors de l’ouverture et de la fermeture",
    "noEditableLayers": "Aucune couche modifiable",
    "noLayersSelected": "Sélectionnez une ou plusieurs couches avant de continuer."
  },
  "page3": {
    "commonFieldsHeader": "Sélectionnez les champs à mettre à jour par lots.",
    "commonFieldsDesc": "Seuls les champs modifiables communs s’afficheront ci-dessous. Sélectionnez les champs à mettre à jour. Si des champs qui partagent le même nom se trouvent dans différentes couches, mais possèdent des domaines différents, un seul domaine peut être utilisé.",
    "noCommonFields": "Aucun champ commun",
    "fieldTable": {
      "colEdit": "Modifiable",
      "colName": "Nom",
      "colAlias": "Alias",
      "colAction": "Actions"
    }
  },
  "tabs": {
    "selection": "Définir le type de sélection",
    "layers": "Définir les couches à mettre à jour",
    "fields": "Définir les champs à mettre à jour"
  },
  "errorOnOk": "Renseignez tous les paramètres avant d’enregistrer la configuration",
  "next": "Suivant",
  "back": "Retour",
  "save": "Enregistrer le symbole",
  "cancel": "Annuler",
  "ok": "OK",
  "symbolPopup": "Sélecteur de symboles",
  "editHeaderText": "Texte à afficher en haut du widget",
  "widgetIntroSelectByArea": "Utilisez un des outils ci-dessous pour créer un ensemble de sélection d’entités à mettre à jour. Si la ligne est <font class='maxRecordInIntro'>mise en surbrillance</font>, le nombre maximal d’enregistrements autorisés a été dépassé.",
  "widgetIntroSelectByFeature": "Utilisez l’outil ci-dessous pour sélectionner une entité dans la couche <font class='layerInIntro'>${0}</font>. Cette entité sera utilisée pour sélectionner et mettre à jour toutes les entités d’intersection. Si la ligne est <font class='maxRecordInIntro'>mise en surbrillance</font>, le nombre maximal d’enregistrements autorisé a été dépassé.",
  "widgetIntroSelectByFeatureQuery": "Utilisez l’outil ci-dessous pour sélectionner une entité sur <font class='layerInIntro'>${0}</font> . L’attribut <font class='layerInIntro'>${1}</font> de cette entité sera utilisé pour interroger les couches ci-dessous et mettre à jour les entités obtenues. Si la ligne est <font class='maxRecordInIntro'>mise en surbrillance</font>, le nombre maximal d’enregistrements autorisés a été dépassé.",
  "widgetIntroSelectByQuery": "Saisissez une valeur pour créer un jeu de sélection. Si la ligne est <font class='maxRecordInIntro'>mise en surbrillance</font>, le nombre maximal d’enregistrements autorisés a été dépassé."
});