define({
  "_widgetLabel": "Agrégation de données",
  "startPage": {
    "defaultStartPageInstructions": "Ce widget vous aide à traiter et à envoyer des données depuis un fichier vers la couche sélectionnée de la carte.<br/> <br/> Les valeurs au sein de ce fichier doivent être délimitées par une virgule, une tabulation, un point-virgule ou une barre verticale.",
    "dragDrop": "Glisser-déposer",
    "browse": "Accéder au fichier",
    "or": "'OU'",
    "userPrivilege": "Votre compte ne dispose pas des autorisations de création ou de modification des données.",
    "userCredits": "${widgetName} requiert des crédits pour l’utilisation du localisateur ${locator}.",
    "contactAdmin": "Contactez l’administrateur de l’organisation pour demander des crédits supplémentaires.",
    "contactAdminEdit": "Contactez l’administrateur de l’organisation pour demander des privilèges de mise à jour.",
    "canUseLocator": "Le localisateur ${locator} sera utilisé pour localiser des entités.",
    "notEnoughCredits": "Crédits insuffisants.",
    "locationAndField": "Informations de localisation et de champ",
    "locationAndFieldHint": "Sélectionnez les valeurs à partir du fichier à employer pour mettre à jour la couche cible.",
    "cannotUseLocator": "Impossible d’utiliser ${widgetName}",
    "noAnonymousEdit": "La couche ${layerName} ne prend pas en charge la mise à jour anonyme.",
    "pleaseLogin": "Connectez-vous à l’organisation ${org} ou contactez l’administrateur de l’organisation pour demander l’activation de la mise à jour anonyme.",
    "invalidEdit": "Privilèges non valides",
    "unableToAccess": "Impossible d’accéder à ${layerName}",
    "appropriateCredentials": "Vérifiez que vous êtes connecté avec les identifiants de connexion appropriés.",
    "shared": "Contactez l’administrateur de l’organisation pour demander l’accès à la couche ${layerName}.",
    "targetLayerLabel": "Couche cible",
    "homeButtonLabel": "Accueil",
    "mappingErrorMsg": "Cliquez sur la flèche Suivant pour définir les champs"
  },
  "mapping": {
    "schemaMapping": "Informations de champ",
    "schemaMappingHint": "Choisissez les champs du fichier qui sont en corrélation avec les champs de la couche.",
    "locationMapping": "Informations d’emplacement",
    "locationMappingHint": "Choisissez le type d’adresse ou les informations de coordonnées à attendre du fichier."
  },
  "locationMapping": {
    "locationMappingPageHint": "Choisir le type d'emplacement",
    "useAddress": "Localiser à l’aide d’une adresse",
    "useAddressHint": "Les données contiennent des informations d’adresses",
    "useCoordinates": "Localiser à l’aide des coordonnées",
    "useCoordinatesHint": "Les données contiennent les valeurs de coordonnées X/Y"
  },
  "address": {
    "addressPageHint": "Choisir le type d’adresse",
    "singleField": "Champ unique",
    "singleFieldHint": "Sélectionner le champ contenant les informations d’adresse",
    "multiField": "Champs multiples",
    "multiFieldHint": "Sélectionner les champs qui contiennent les informations d’adresse"
  },
  "coordinates": {
    "coordinatesPageHint": "Sélectionner les champs qui contiennent les données de coordonnées"
  },
  "fieldMapping": {
    "fieldMappingPageHint": "Choisir le champ source mappé sur le champ cible",
    "sourceField": "Champ source correspondant",
    "targetField": "Champ cible"
  },
  "buttons": {
    "addToMap": "Ajouter à la carte",
    "submit": "Envoyer",
    "download": "Télécharger"
  },
  "review": {
    "matched": "Trouvé",
    "reviewMatched": "Localisations trouvées",
    "reviewMatchedHint": "Examinez les localisations trouvées.",
    "unMatched": "introuvable",
    "reviewUnMatched": "Emplacements introuvables",
    "reviewUnMatchedHint": "Examinez les localisations introuvables. Les éléments non corrigés ne seront pas envoyés.",
    "duplicate": "Dupliquer",
    "reviewDuplicate": "Dupliquer les localisations",
    "reviewDuplicateHint": "Examinez les localisations déjà trouvées dans la couche. Les éléments non résolus ne seront pas envoyés.",
    "reviewLabelWithCount": "${totalMatchedFeatures} ${headerString} ${headerStringHint}",
    "use": "Utiliser :",
    "fromLayer": "Informations sur la cible",
    "target": "Cible",
    "source": "Source",
    "fromFile": "Informations sur la source",
    "locationControlHint": "Examiner les informations d’adresse",
    "duplicateAction": "Sélectionner une action",
    "item": "Enregistrement :",
    "locateFeature": "Localiser une entité",
    "removeFeature": "Remove Feature (Supprimer l’entité)",
    "featureLocated": "Localisation trouvée",
    "valuesDoNotMatch": "Ne correspond pas à la valeur existante",
    "sync": "Synchroniser les informations d’adresse avec les informations de champ",
    "noFeaturesSaved": "Aucune entité enregistrée avec succès",
    "someFeaturesSaved": "${num} entité(s) a/ont été enregistrée(s) avec succès.",
    "someFeaturesNotSaved": "${num} entité(s) n’a/n’ont pas été enregistrée(s).",
    "feature": "Examiner les informations sur l’entité",
    "locationInfo": "Examiner les informations sur la localisation",
    "selectValue": "Sélectionner une valeur",
    "reviewData": "Examiner les données",
    "reviewDataHint": "Examinez vos données avant de les envoyer à la couche.",
    "reviewFeatureHint": "Examinez ou mettez à jour vos informations sur l’entité et la localisation.",
    "duplicateModify": "Doublon, requiert une modification",
    "duplicateSave": "Enregistrer en tant que nouvelle entité"
  },
  "warningsAndErrors": {
    "invalidCSV": "Erreur lors de la récupération d’éléments à partir du fichier CSV ; vérifiez qu’un fichier CSV valide est sélectionné.",
    "noLayersWarning": "Aucune couche cible valide n’est sélectionnée, vérifiez la configuration.",
    "loadWarning": "Ce widget requiert une source de données Service d’entités. Configurez le widget pour définir une source de données.",
    "saveError": "Erreur d’enregistrement des entités.",
    "consumesCredits": "Cet outil consomme des crédits lorsqu’il est utilisé avec le service de géocodage mondial ArcGIS Online.",
    "noValue": "Sélectionner un champ",
    "mappingTitle": "",
    "locationMappingComplete": "Appariement d’emplacements terminé",
    "fieldMappingComplete": "Appariement de champs terminé",
    "settingsCleared": "Les paramètres seront effacés.",
    "proceed": "Voulez-vous continuer ?",
    "itemMoveMatch": "L’élément a été localisé et déplacé vers la liste des localisations trouvées",
    "itemMoveUnMatched": "Impossible de localiser l’élément. Déplacé vers la liste des localisations introuvables.",
    "itemWillBeLocated": "L’élément sera retiré de la liste des localisations en double.",
    "cannotLocate": "Impossible de localiser l’élément. Vérifiez les informations de localisation.",
    "invalidMessage": "Valeur non valide.",
    "rangeMessage": "La valeur doit comporter moins de ${num} caractères.",
    "locatorError": "Localisateur non valide ou inaccessible.",
    "notConfigured": "localisateur non configuré pour les options de localisation actuelles",
    "noMoreLocators": "aucun localisateur supplémentaire configuré"
  },
  "featureToolbar": {
    "locate": "Localiser",
    "save": "Enregistrer l’enregistrement",
    "cancel": "Annuler les mises à jour",
    "cancelTitle": "Annuler les mises à jour",
    "cancelMessage": "Annuler les mises à jour apportées à l’enregistrement actuel ?"
  }
});