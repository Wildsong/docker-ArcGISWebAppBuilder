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
  "_widgetLabel": "Ανάλυση κόστους",
  "unableToFetchInfoErrMessage": "Ανεπιτυχής λήψη geometry service/λεπτομερειών διαμορφωμένου θεματικού επιπέδου",
  "invalidCostingGeometryLayer": "Ανεπιτυχής απόκτηση 'esriFieldTypeGlobalID' στην κοστολόγηση του geometry layer.",
  "projectLayerNotFound": "Ανεπιτυχής εύρεση του διαμορφωμένου project layer στο χάρτη.",
  "costingGeometryLayerNotFound": "Ανεπιτυχής εύρεση του διαμορφωμένου geometry layer κοστολόγησης στο χάρτη.",
  "projectMultiplierTableNotFound": "Ανεπιτυχής εύρεση του διαμορφωμένου πίνακα επιπρόσθετου κόστους πολλαπλασιαστή έργου στο χάρτη.",
  "projectAssetTableNotFound": "Ανεπιτυχής εύρεση του διαμορφωμένου πίνακα περιουσιακού στοιχείου στο χάρτη.",
  "createLoadProject": {
    "createProjectPaneTitle": "Δημιουργία έργου",
    "loadProjectPaneTitle": "Φόρτωση έργου",
    "projectNamePlaceHolder": "Όνομα έργου",
    "projectDescPlaceHolder": "Περιγραφή έργου",
    "selectProject": "Επιλογή έργου",
    "viewInMapLabel": "Προεπισκόπηση",
    "loadLabel": "Φόρτωση",
    "createLabel": "Δημιουργία",
    "deleteProjectConfirmationMsg": "Είστε βέβαιοι ότι θέλετε να διαγράψετε το έργο;",
    "noAssetsToViewOnMap": "Το επιλεγμένο έργο δεν έχει πόρους για προβολή στον χάρτη.",
    "projectDeletedMsg": "Το έργο διαγράφηκε με επιτυχία.",
    "errorInCreatingProject": "Σφάλμα κατά τη δημιουργία του έργου.",
    "errorProjectNotFound": "Το έργο δεν βρέθηκε.",
    "errorInLoadingProject": "Ελέγξτε εάν έχει επιλεγεί ένα έγκυρο έργο.",
    "errorProjectNotSelected": "Επιλέξτε ένα έργο από την πτυσσόμενη λίστα",
    "errorDuplicateProjectName": "Το όνομα έργου υπάρχει ήδη.",
    "errorFetchingPointLabel": "Σφάλμα κατά τη λήψη σημείου ετικέτας. Προσπαθήστε ξανά.",
    "errorAddingPointLabel": "Σφάλμα κατά την προσθήκη σημείου ετικέτας. Προσπαθήστε ξανά."
  },
  "statisticsSettings": {
    "tabTitle": "Ρυθμίσεις στατιστικής",
    "addStatisticsLabel": "Προσθήκη στατιστικών",
    "addNewStatisticsText": "Προσθήκη νέων στατιστικών",
    "deleteStatisticsText": "Διαγραφή στατιστικών",
    "moveStatisticsUpText": "Μετακίνηση στατιστικών επάνω",
    "moveStatisticsDownText": "Μετακίνηση στατιστικών κάτω",
    "layerNameTitle": "Θεματικό επίπεδο",
    "statisticsTypeTitle": "Τύπος",
    "fieldNameTitle": "Πεδίο",
    "statisticsTitle": "Ετικέτα",
    "actionLabelTitle": "Ενέργειες",
    "selectDeselectAllTitle": "Επιλογή όλων",
    "layerCheckbox": "Πλαίσιο ελέγχου θεματικού επιπέδου"
  },
  "statisticsType": {
    "countLabel": "Πλήθος",
    "averageLabel": "Μέσος όρος",
    "maxLabel": "Μέγιστο",
    "minLabel": "Ελάχιστο",
    "summationLabel": "Άθροιση",
    "areaLabel": "Εμβαδόν",
    "lengthLabel": "Μήκος",
    "expandCollapseAriaLabel": "'${displayTitle}' με '${featureCount}' στοιχεία"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Το (Τα) θεματικό(ά) επίπεδο(α) πρέπει να επιλεγεί ως επεξεργάσιμο στην καρτέλα ρυθμίσεων θεματικού επιπέδου"
  },
  "workBench": {
    "refresh": "Ανανέωση",
    "noAssetAddedMsg": "Δεν προστέθηκαν στοιχεία",
    "units": "μονάδα(ες)",
    "assetDetailsTitle": "Λεπτομέρειες αντικειμένου στοιχείου",
    "costEquationTitle": "Εξίσωση κόστους",
    "newCostEquationTitle": "Νέα εξίσωση",
    "defaultCostEquationTitle": "Προεπιλεγμένη εξίσωση",
    "geographyTitle": "Γεωγραφική θέση",
    "scenarioTitle": "Σενάριο",
    "costingInfoHintText": "<div>Υπόδειξη: Χρησιμοποιήστε τις ακόλουθες λέξεις-κλειδιά</div><ul><li><b>{TOTALCOUNT}</b>: Χρησιμοποιεί τον συνολικό αριθμό στοιχείου ίδιου τύπου σε μια γεωγραφική θέση</li> <li><b>{MEASURE}</b>: Χρησιμοποιεί το μήκος για το στοιχείο γραμμής και τομέα για στοιχείο πολυγώνου</li><li><b>{TOTALMEASURE}</b>: Χρησιμοποιεί το συνολικό μήκος για στοιχείο γραμμής και συνολική περιοχή για στοιχείο πολυγώνου του ίδιου τύπου σε μια γεωγραφική θέση</li></ul> Μπορείτε να χρησιμοποιήσετε λειτουργίες όπως:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Επεξεργαστείτε την εξίσωση κόστους σύμφωνα με την ανάγκη του έργου σας.",
    "zoomToAsset": "Ζουμ στο στοιχείο",
    "deleteAsset": "Διαγραφή στοιχείου",
    "closeDialog": "Κλείσιμο παραθύρου διαλόγου",
    "objectIdColTitle": "Αναγνωριστικό αντικειμένου",
    "costColTitle": "Κόστος",
    "errorInvalidCostEquation": "Μη έγκυρη εξίσωση κόστους.",
    "errorInSavingAssetDetails": "Δεν αποθηκεύτηκαν οι λεπτομέρειες στοιχείου.",
    "featureModeText": "Λειτουργία δημιουργίας στοιχείων",
    "sketchToolTitle": "Σχεδιάστε νέους πόρους.",
    "selectToolTitle": "Αντιγράψτε πόρους από το υπάρχον στοιχείο στον χάρτη.",
    "downloadCSVBtnTitle": "Εξαγωγή αναφοράς",
    "templatePickerTitle": "Επιλέξτε ένα πρότυπο για να δημιουργήσετε νέους πόρους:"
  },
  "assetDetails": {
    "inGeography": " σε ${geography} ",
    "withScenario": " με ${scenario}",
    "totalCostTitle": "Συνολικό κόστος",
    "additionalCostLabel": "Περιγραφή",
    "additionalCostValue": "Τιμή",
    "additionalCostNetValue": "Καθαρή αξία"
  },
  "projectOverview": {
    "assetItemsTitle": "Αντικείμενα στοιχείου",
    "assetStatisticsTitle": "Στατιστικές στοιχείου",
    "projectSummaryTitle": "Σύνοψη έργου",
    "projectName": "Όνομα έργου: ${name}",
    "totalCostLabel": "Συνολικό κόστος έργου (*):",
    "grossCostLabel": "Μικτό κόστος έργου (*):",
    "roundingLabel": "* Στρογγυλοποίηση σε '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Δεν αποθηκεύτηκε το όριο έργου στο θεματικό επίπεδο έργου.",
    "unableToSaveProjectCost": "Δεν αποθηκεύτηκε(αν) το(τα) κόστος(η) στο θεματικό επίπεδο έργου.",
    "roundCostValues": {
      "twoDecimalPoint": "Δύο υποδιαστολές",
      "nearestWholeNumber": "Πλησιέστερος ακέραιος αριθμός",
      "nearestTen": "Πλησιέστερες δεκάδες",
      "nearestHundred": "Πλησιέστερες εκατοντάδες",
      "nearestThousand": "Πλησιέστερες χιλιάδες",
      "nearestTenThousands": "Πλησιέστερες δεκάδες χιλιάδες"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Χαρακτηριστικό έργου",
    "projectAttributeTitle": "Επεξεργασία χαρακτηριστικών έργου"
  },
  "costEscalation": {
    "costEscalationLabel": "Προσθήκη επιπρόσθετου κόστους",
    "valueHeader": "Τιμή",
    "addCostEscalationText": "Προσθήκη επιπρόσθετου κόστους",
    "deleteCostEscalationText": "Διαγραφή επιλεγμένου επιπρόσθετου κόστους",
    "moveCostEscalationUpText": "Μετακίνηση επιλεγμένου επιπρόσθετου κόστους προς τα επάνω",
    "moveCostEscalationDownText": "Μετακίνηση επιλεγμένου επιπρόσθετου κόστους προς τα κάτω",
    "invalidEntry": "Μια ή περισσότερες καταχωρήσεις δεν είναι έγκυρες.",
    "errorInSavingCostEscalation": "Δεν αποθηκεύτηκαν επιπρόσθετες λεπτομέρειες κόστους."
  },
  "scenarioSelection": {
    "popupTitle": "Επιλογή σεναρίου για το στοιχείο",
    "regionLabel": "Γεωγραφική θέση",
    "scenarioLabel": "Σενάριο",
    "noneText": "Κανένα",
    "copyFeatureMsg": "Επιθυμείτε να αντιγράψετε τα επιλεγμένα στοιχεία;"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Λεπτομερείς στατιστικές",
    "noDetailStatisticAvailable": "Δεν προστέθηκαν στατιστικές στοιχείου",
    "addStatisticsButtonLabel": "Προσθήκη"
  },
  "copyFeatures": {
    "title": "Αντιγραφή στοιχείων",
    "createFeatures": "Δημιουργία στοιχείων",
    "createSingleFeature": "Δημιουργία 1 στοιχείου πολλαπλής γεωμετρίας",
    "noFeaturesSelectedMessage": "Κανένα επιλεγμένο στοιχείο",
    "selectFeatureToCopyMessage": "Επιλέξτε στοιχεία προς αντιγραφή.",
    "copyFeatureUpdateGeometryError": "Δεν είναι δυνατή η ενημέρωση της γεωμετρίας των επιλεγμένων στοιχείων."
  },
  "updateCostEquationPanel": {
    "updateProjectCostTabLabel": "Ενημέρωση εξισώσεων έργου",
    "updateProjectCostSelectProjectTitle": "Επιλογή όλων των έργων",
    "updateButtonTextForm": "Ενημέρωση",
    "updateProjectCostSuccess": "Ενημερώνονται οι εξισώσεις κόστους των επιλεγμένων έργων.",
    "updateProjectCostError": "Δεν είναι δυνατή η ενημέρωση της εξίσωσης κόστους επιλεγμένων έργων.",
    "updateProjectNoProject": "Δεν βρέθηκε κανένα έργο."
  }
});