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
  "configText": "Ορισμός κειμένου διαμ.:",
  "generalSettings": {
    "tabTitle": "Γενικές ρυθμίσεις",
    "measurementUnitLabel": "Μονάδα κόστους",
    "currencyLabel": "Σύμβολο κόστους",
    "roundCostLabel": "Κόστος στρογγυλοποίησης",
    "projectOutputSettings": "Ρυθμίσεις εξόδου έργου",
    "typeOfProjectAreaLabel": "Τύπος περιοχής έργου",
    "bufferDistanceLabel": "Απόσταση ζώνης",
    "csvReportExportLabel": "Να επιτρέπεται στον χρήστη να εξάγει την αναφορά του έργου.",
    "editReportSettingsBtnTooltip": "Επεξεργασία ρυθμίσεων αναφοράς",
    "roundCostValues": {
      "twoDecimalPoint": "Δύο υποδιαστολές",
      "nearestWholeNumber": "Πλησιέστερος ακέραιος αριθμός",
      "nearestTen": "Πλησιέστερες δεκάδες",
      "nearestHundred": "Πλησιέστερες εκατοντάδες",
      "nearestThousand": "Πλησιέστερες χιλιάδες",
      "nearestTenThousands": "Πλησιέστερες δεκάδες χιλιάδες"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Ρυθμίσεις αναφοράς",
      "reportNameLabel": "Όνομα αναφοράς (προαιρετικά):",
      "checkboxLabel": "Εμφάνιση",
      "layerTitle": "Τίτλος",
      "columnLabel": "Ετικέτα",
      "duplicateMsg": "Διπλότυπη ετικέτα"
    },
    "projectAreaType": {
      "outline": "Περίγραμμα",
      "buffer": "Προσωρινή μνήμη"
    },
    "errorMessages": {
      "currency": "Μη έγκυρη νομισματική μονάδα",
      "bufferDistance": "Μη έγκυρη απόσταση ζώνης",
      "outOfRangebufferDistance": "Η τιμή πρέπει να είναι μεγαλύτερο από 0 και μικρότερη ή ίση με 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Ρυθμίσεις έργου",
    "costingGeometrySectionTitle": "Καθορισμός γεωγραφίας για κοστολόγηση (προαιρετικό)",
    "costingGeometrySectionNote": "Σημείωση: Η διαμόρφωση αυτού του θεματικού επιπέδου επιτρέπει στο χρήστη να ορίζει εξισώσεις κόστους προτύπων στοιχείων με βάση γεωγραφικές θέσεις.",
    "projectTableSectionTitle": "Δυνατότητα αποθήκευσης/φόρτωσης ρυθμίσεων έργου (προαιρετικό)",
    "projectTableSectionNote": "Σημείωση: Διαμόρφωση όλων των πινάκων και θεματικών επιπέδων επιτρέπει στο χρήστη να αποθηκεύσει/φορτώσει το έργο για μετέπειτα χρήση.",
    "costingGeometryLayerLabel": "Geometry Layer Κοστολόγησης",
    "fieldLabelGeography": "Πεδίο για γεωγραφία ετικέτας",
    "projectAssetsTableLabel": "Πίνακας στοιχείων έργου",
    "projectMultiplierTableLabel": "Πίνακας επιπρόσθετου κόστους πολλαπλασιαστή έργου",
    "projectLayerLabel": "Project Layer",
    "configureFieldsLabel": "Διαμόρφωση πεδίων",
    "fieldDescriptionHeaderTitle": "Περιγραφή πεδίου",
    "layerFieldsHeaderTitle": "Πεδίο θεματικού επιπέδου",
    "selectLabel": "Επιλογή",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} έχει ήδη επιλεγεί",
      "invalidConfiguration": "Επιλέξτε ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Πολυγωνικά θεματικά επίπεδα θα εμφανίζονται με τις εξής προϋποθέσεις: <br/><li> Το θεματικό επίπεδο πρέπει να διαθέτει δυνατότητα ερωτήματος.</li><li> Το θεματικό επίπεδο πρέπει να διαθέτει πεδίο GlobalID.</li></p>",
    "fieldToLabelGeographyHelp": "<p>Τα πεδία με συμβολοσειρές και αριθμικές τιμές στο επιλεγμένο «Θεματικό επίπεδο γεωμετρίας κοστολόγησης» θα εμφανίζεται στο πτυσσόμενο μενού «Πεδίο για ετικέτα γεωγραφίας».</p>",
    "projectAssetsTableHelp": "<p>Πίνακες θα εμφανίζονται με τις εξής προϋποθέσεις: <br/><li> Ο πίνακας πρέπει να διαθέτει δυνατότητες επεξεργασίας, δηλαδή τις επιλογές «Δημιουργία», «Διαγραφή» και «Ενημέρωση».</li> <li>Ο πίνακας πρέπει να διαθέτει έξι πεδία με ακριβές όνομα και τύπο δεδομένων:</li><ul><li> GUID πόρου (πεδίο τύπου GUID)</li><li> Εξίσωση κόστους (πεδίο τύπου συμβολοσειράς)</li><li> Σενάριο (πεδίο τύπου συμβολοσειράς)</li><li> Όνομα προτύπου (πεδίο τύπου συμβολοσειράς)</li><li> GUID γεωγραφίας (πεδίο τύπου GUID)</li><li> GUID έργου (πεδίο τύπου GUID)</li></ul></p>",
    "projectMultiplierTableHelp": "<p>Πίνακες θα εμφανίζονται με τις εξής προϋποθέσεις: <br/><li> Ο πίνακας πρέπει να διαθέτει δυνατότητες επεξεργασίας, δηλαδή τις επιλογές «Δημιουργία», «Διαγραφή» και «Ενημέρωση».</li> <li>Ο πίνακας πρέπει να διαθέτει πέντε πεδία με ακριβές όνομα και τύπο δεδομένων:</li><ul><li> Περιγραφή (πεδίο τύπου συμβολοσειράς)</li><li> Τύπος (πεδίο τύπου συμβολοσειράς)</li><li> Τιμή (πεδίο τύπου κινητής υποδιαστολής/διπλής τιμής)</li><li> Δείκτης κόστους (πεδίο τύπου ακέραιας τιμής)</li><li> GUID έργου (πεδίο τύπου GUID)</li></ul></p>",
    "projectLayerHelp": "<p>Πολυγωνικά θεματικά επίπεδα θα εμφανίζονται με τις εξής προϋποθέσεις: <br/> <li>Το θεματικό επίπεδο πρέπει να διαθέτει δυνατότητες επεξεργασίας, δηλαδή τις επιλογές «Δημιουργία», «Διαγραφή» και «Ενημέρωση».</li> <li>Το θεματικό επίπεδο πρέπει να διαθέτει πέντε πεδία με ακριβές όνομα και τύπο δεδομένων:</li><ul><li>Όνομα έργου (πεδίο τύπου συμβολοσειράς)</li><li>Περιγραφή (πεδίο τύπου συμβολοσειράς)</li><li>Συνολικό κόστος πόρων (πεδίο τύπου κινητής υποδιαστολής/διπλής τιμής)</li><li>Μεικτό κόστος έργου (πεδίο τύπου κινητής υποδιαστολής/διπλής τιμής)</li><li>GlobalID (πεδίο τύπου GlobalID)</li></ul></p>",
    "pointLayerCentroidLabel": "Κεντροειδές σημειακού θεματικού επιπέδου",
    "selectRelatedPointLayerDefaultOption": "Επιλογή",
    "pointLayerHintText": "<p>Θα εμφανίζονται θεματικά επίπεδα σημείων που πληρούν τις εξής προϋποθέσεις: <br/> <li>\tΤο θεματικό επίπεδο πρέπει να διαθέτει πεδίο 'Projectid' (τύπος GUID) field</li><li>\tΤο θεματικό επίπεδο πρέπει να διαθέτει δυνατότητες επεξεργασίας, δηλαδή «Δημιουργία», «Διαγραφή» και «Ενημέρωση»</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Ρυθμίσεις θεματικού επιπέδου",
    "layerNameHeaderTitle": "Όνομα θεματικού επιπέδου",
    "layerNameHeaderTooltip": "Λίστα θεματικών επιπέδων στον χάρτη",
    "EditableLayerHeaderTitle": "Επεξεργάσιμο",
    "EditableLayerHeaderTooltip": "Συμπερίληψη θεματικού επιπέδου και των προτύπων του στο widget κοστολόγησης",
    "SelectableLayerHeaderTitle": "Επιλέξιμο",
    "SelectableLayerHeaderTooltip": "Η γεωμετρία στοιχείου μπορεί να χρησιμοποιηθεί για τη δημιουργία ενός νέου στοιχείου κόστους",
    "fieldPickerHeaderTitle": "ID έργου (προαιρετικό)",
    "fieldPickerHeaderTooltip": "Προαιρετικό πεδίο (συμβολοσειράς τύπου) για την αποθήκευση του ID έργου σε",
    "selectLabel": "Επιλογή",
    "noAssetLayersAvailable": "Δεν βρέθηκε θεματικό επίπεδο στοιχείου στον επιλεγμένο webmap.",
    "disableEditableCheckboxTooltip": "Σε αυτό το θεματικό επίπεδο δεν υπάρχει δυνατότητα επεξεργασίας",
    "missingCapabilitiesMsg": "Από το θεματικό επίπεδο αυτό λείπουν οι εξής δυνατότητες:",
    "missingGlobalIdMsg": "Αυτό το θεματικό επίπεδο δεν έχει πεδίο GlobalId.",
    "create": "Δημιουργία",
    "update": "Ενημέρωση",
    "deleteColumnLabel": "Διαγραφή",
    "attributeSettingHeaderTitle": "Ρυθμίσεις γνωρισμάτων",
    "addFieldLabelTitle": "Προσθήκη γνωρισμάτων",
    "layerAttributesHeaderTitle": "Γνωρίσματα θεματικού επιπέδου",
    "projectLayerAttributesHeaderTitle": "Γνωρίσματα θεματικού επιπέδου έργου",
    "attributeSettingsPopupTitle": "Ρυθμίσεις γνωρισμάτων θεματικού επιπέδου"
  },
  "costingInfo": {
    "tabTitle": "Πληροφορίες κοστολόγησης",
    "proposedMainsLabel": "Προτεινόμενα βασικά",
    "addCostingTemplateLabel": "Προσθήκη προτύπου κοστολόγησης",
    "manageScenariosTitle": "Διαχείριση σεναρίων",
    "featureTemplateTitle": "Πρότυπο στοιχείου",
    "costEquationTitle": "Εξίσωση κόστους",
    "geographyTitle": "Γεωγραφική θέση",
    "scenarioTitle": "Σενάριο",
    "actionTitle": "Ενέργειες",
    "scenarioNameLabel": "Όνομα σεναρίου",
    "addBtnLabel": "Προσθήκη",
    "srNoLabel": "Αρ.",
    "deleteLabel": "Διαγραφή",
    "duplicateScenarioName": "Δημιουργία αντιγράφου ονόματος σεναρίου",
    "hintText": "<div>Υπόδειξη: Χρησιμοποιήστε τις ακόλουθες λέξεις-κλειδιά</div><ul><li><b>{TOTALCOUNT}</b>: Χρησιμοποιεί τον συνολικό αριθμό στοιχείου ίδιου τύπου σε μια γεωγραφική θέση</li><li><b>{MEASURE}</b>: Χρησιμοποιεί το μήκος για το στοιχείο γραμμής και τομέα για στοιχείο πολυγώνου</li><li><b>{TOTALMEASURE}</b>: Χρησιμοποιεί το συνολικό μήκος για στοιχείο γραμμής και συνολική περιοχή για στοιχείο πολυγώνου του ίδιου τύπου σε μια γεωγραφική θέση</li></ul>Μπορείτε να χρησιμοποιήσετε λειτουργίες όπως:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Επεξεργαστείτε την εξίσωση κόστους σύμφωνα με την ανάγκη του έργου σας.",
    "noneValue": "Κανένα",
    "requiredCostEquation": "Μη έγκυρη εξίσωση κόστους για ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Υπάρχει διπλή εγγραφή προτύπου για ${layerName} : ${templateName}",
    "defaultEquationRequired": "Απαιτείται προεπιλεγμένη εξίσωση για ${layerName} : ${templateName}",
    "validCostEquationMessage": "Εισαγάγετε μια έγκυρη εξίσωση κόστους",
    "costEquationHelpText": "Επεξεργαστείτε την εξίσωση κόστους σύμφωνα με την ανάγκη του έργου σας",
    "scenarioHelpText": "Επιλέξτε σενάριο σύμφωνα με την ανάγκη του έργου σας",
    "copyRowTitle": "Αντιγραφή σειράς",
    "noTemplateAvailable": "Προσθέστε τουλάχιστον ένα πρότυπο για το θεματικό επίπεδο ${layerName}.",
    "manageScenarioLabel": "Διαχείριση σεναρίου",
    "noLayerMessage": "Καταχωρίστε τουλάχιστον ένα θεματικό επίπεδο στην καρτέλα ${tabName}.",
    "noEditableLayersAvailable": "Το (Τα) θεματικό(ά) επίπεδο(α) πρέπει να επιλεγεί ως επεξεργάσιμο στην καρτέλα ρυθμίσεων θεματικού επιπέδου",
    "updateProjectCostCheckboxLabel": "Ενημέρωση εξισώσεων έργου",
    "updateProjectCostEquationHint": "Υπόδειξη: Η ρύθμιση αυτή θα επιτρέπει στον χρήστη να ενημερώνει τις εξισώσεις κόστους πόρων που έχουν ήδη προστεθεί σε υπάρχοντα έργα με τις νέες εξισώσεις που καθορίζονται παρακάτω με βάση το πρότυπο των στοιχείων, τη γεωγραφία και το σενάριο. Αν δεν βρεθεί ο συνδυασμός, θα καθοριστεί να χρησιμοποιηθεί η προεπιλεγμένη εξίσωση κόστους, δηλαδή γεωγραφία και σενάριο με την τιμή «Καθόλου». Στην περίπτωση καταργημένου προτύπου στοιχείων, για το κόστος θα καθοριστεί η τιμή 0."
  },
  "statisticsSettings": {
    "tabTitle": "Πρόσθετες ρυθμίσεις",
    "addStatisticsLabel": "Προσθήκη στατιστικών",
    "fieldNameTitle": "Πεδίο",
    "statisticsTitle": "Ετικέτα",
    "addNewStatisticsText": "Προσθήκη νέων στατιστικών",
    "deleteStatisticsText": "Διαγραφή στατιστικών",
    "moveStatisticsUpText": "Μετακίνηση στατιστικών επάνω",
    "moveStatisticsDownText": "Μετακίνηση στατιστικών κάτω",
    "selectDeselectAllTitle": "Επιλογή όλων"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Προσθήκη επιπρόσθετου κόστους έργου",
    "additionalCostValueColumnHeader": "Τιμή",
    "invalidProjectCostMessage": "Μη έγκυρη καταχώριση για το κόστος του έργου",
    "additionalCostLabelColumnHeader": "Ετικέτα",
    "additionalCostTypeColumnHeader": "Τύπος"
  },
  "statisticsType": {
    "countLabel": "Πλήθος",
    "averageLabel": "Μέσος όρος",
    "maxLabel": "Μέγιστο",
    "minLabel": "Ελάχιστο",
    "summationLabel": "Άθροιση",
    "areaLabel": "Εμβαδόν",
    "lengthLabel": "Μήκος"
  }
});