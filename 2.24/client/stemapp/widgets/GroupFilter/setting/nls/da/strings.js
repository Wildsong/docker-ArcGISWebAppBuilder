define({
  "configText": "Definér dine filtergrupper nedenfor",
  "labels": {
    "groupName": "Gruppenavn:",
    "groupNameTip": "Angiv et navn til denne filtergruppe. Det vil blive vist i rullemenuen for de tilgængelige filtergrupper.",
    "groupDesc": "Beskrivelse:",
    "groupDescTip": "Angiv en beskrivelse af denne filtergruppe.",
    "groupOperator": "Forudindstillet operator:",
    "groupOperatorTip": "Indstilling til foruddefinition af operatoren til filtret. Hvis der ikke er valgt nogen Forudindstillet operator, vil filtret benytte operatoren LIG MED.",
    "groupDefault": "Foruddefineret værdi:",
    "groupDefaultTip": "Indstilling til indtastning af en værdi eller til at vælge en eksisterende værdi fra et lag. Klik på Søg-ikonet for at gennemse lag.",
    "sameLayerAppend": "Når et lag er angivet mere end én gang:",
    "sameLayerConjunc": "Tilknyt ved hjælp af:",
    "caseSearch": "Udfør en søgning, hvor der skelnes mellem store og små bogstaver: ",
    "headerTextHelp": "Angiv tekst, der skal vises over filter-afsnittet"
  },
  "buttons": {
    "addNewGroup": "Tilføj en ny gruppe",
    "addNewGroupTip": "Tilføj en ny filtergruppe.",
    "addLayer": "Tilføj lag",
    "addLayerTip": "Tilføj et lag til filtergruppen"
  },
  "inputs": {
    "groupName": "Navn på filtergruppe",
    "groupDesc": "Beskrivelse af gruppen",
    "groupDefault": "Angiv foruddefineret værdi",
    "sameLayerAny": "Find ethvert udtryk",
    "sameLayerAll": "Match alle udtryk",
    "simpleMode": "Start i simpel visning",
    "simpleModeTip": "Forenkl widget-grænsefladen. Når indstillingen er valgt, skjules operator-rullelisten og tilføj kriterier-knapperne.",
    "webmapAppendModeAny": "Knyt ethvert udtryk til det eksisterende kortfilter",
    "webmapAppendModeAll": "Knyt alle udtryk til det eksisterende kortfilter",
    "webmapAppendModeTip": "Indstilling til tilknytning af filtergrupper til eksisterende filtre i webkortet",
    "persistOnClose": "Bevar filtrene, efter at widget'en er lukket",
    "selectGroup": "Vælg en gruppe at filtrere",
    "hideDropDown": "Skjul overskrift og filter for 1 gruppe",
    "hideDropDownTip": "Skjul overskrift og rullemenu, hvis der kun er konfigureret 1 filtergruppe",
    "optionsMode": "Skjul widget-indstillinger",
    "optionsModeTip": "Indstilling til visning af flere widget-indstillinger. Når indstillingen er valgt, fjernes lagring og indlæsning af foruddefinerede filtre samt bevarelse af filtret, efter at widget'en er blevet skjult i grænsefladen.",
    "optionOR": "ELLER",
    "optionAND": "OG",
    "optionEQUAL": "LIG MED",
    "optionNOTEQUAL": "IKKE LIG MED",
    "optionGREATERTHAN": "STØRRE END",
    "optionGREATERTHANEQUAL": "STØRRE END ELLER LIG MED",
    "optionLESSTHAN": "MINDRE END",
    "optionLESSTHANEQUAL": "MINDRE END ELLER LIG MED",
    "optionSTART": "BEGYNDER MED",
    "optionEND": "SLUTTER MED",
    "optionLIKE": "INDEHOLDER",
    "optionLIKESPECIFIC": "INDEHOLDER SPECIFIKKE VÆRDIER",
    "optionNOTLIKESPECIFIC": "INDEHOLDER IKKE SPECIFIKKE VÆRDIER",
    "optionNOTLIKE": "INDEHOLDER IKKE",
    "optionONORBEFORE": "ER PÅ ELLER FØR",
    "optionONORAFTER": "ER PÅ ELLER EFTER",
    "optionNONE": "INGEN"
  },
  "tables": {
    "layer": "Lag",
    "layerTip": "Navnet på laget, som det er defineret i kortet.",
    "field": "Felter",
    "fieldTip": "Det felt, som laget filtreres på.",
    "value": "Brug værdi",
    "valueTip": "Indstilling til brug af rullelisteværdierne fra laget. Hvis ingen lag bruger denne parameter, vises der en almindelig tekstboks for brugeren.",
    "zoomTo": "Zoom til resultat",
    "zoomTip": "Indstilling, der zoomer ind på udstrækningen af objekter, efter at filtret er taget i brug",
    "action": "Slet",
    "actionTip": "Fjern lag fra det indstillede filter."
  },
  "popupHeader": {
    "label": "Vælg en foruddefineret værdi"
  },
  "errors": {
    "noGroups": "Du skal bruge mindst én gruppe.",
    "noGroupName": "Ét eller flere gruppenavne mangler.",
    "noDuplicates": "Ét eller flere gruppenavne er duplikerede.",
    "noRows": "Du skal bruge mindst én række i tabellen.",
    "noLayers": "Du har ikke nogen lag i kortet."
  },
  "picker": {
    "description": "Find den forudindstillede værdi for denne gruppe.",
    "layer": "Vælg et lag",
    "layerTip": "Navnet på laget, som det er defineret i webkortet.",
    "field": "Vælg et felt",
    "fieldTip": "Det felt, som den forudindstillede værdi skal hentes fra.",
    "value": "Vælg en værdi",
    "valueTip": "Den værdi, der skal være standarden for widget'en."
  }
});