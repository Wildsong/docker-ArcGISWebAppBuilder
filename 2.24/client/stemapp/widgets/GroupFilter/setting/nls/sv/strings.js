define({
  "configText": "Definiera dina filtergrupper nedan",
  "labels": {
    "groupName": "Gruppnamn:",
    "groupNameTip": "Ange ett namn på den här filtergruppen. Den visas i listrutan för tillgängliga filtergrupper.",
    "groupDesc": "Beskrivning:",
    "groupDescTip": "Ange en beskrivning för den här filtergruppen",
    "groupOperator": "Förinställd operator:",
    "groupOperatorTip": "Alternativ för att fördefiniera operatorn för filtret. Om ingen förinställd operator väljs, använder filtret operatorn LIKA MED.",
    "groupDefault": "Förinställt värde:",
    "groupDefaultTip": "Alternativ för att skriva ett värde eller välja ett befintligt värde från ett lager. Klicka på sökikonen för att bläddra bland lager.",
    "sameLayerAppend": "När ett lager visas flera gånger:",
    "sameLayerConjunc": "Bifoga med:",
    "caseSearch": "Utför en skiftlägeskänslig sökning: ",
    "headerTextHelp": "Ange text som ska visas ovanför filtervalet"
  },
  "buttons": {
    "addNewGroup": "Lägg till en ny grupp",
    "addNewGroupTip": "Lägg till en ny filtergrupp",
    "addLayer": "Lägg till lager",
    "addLayerTip": "Lägg till ett lager i filtergruppen"
  },
  "inputs": {
    "groupName": "Namn på filtergrupp",
    "groupDesc": "Beskrivning av gruppen",
    "groupDefault": "Ange ett fördefinierat värde",
    "sameLayerAny": "Matcha ett eller flera uttryck",
    "sameLayerAll": "Matcha alla uttryck",
    "simpleMode": "Börja i Enkel vy",
    "simpleModeTip": "Förenkla det konfigurerade widgetgränssnittet. När alternativet markeras döljs listrutan för operatorer och knapparna för att lägga till kriterier.",
    "webmapAppendModeAny": "Bifoga ett eller flera uttryck till befintligt kartfilter",
    "webmapAppendModeAll": "Bifoga alla uttryck till befintligt kartfilter",
    "webmapAppendModeTip": "Alternativ för att bifoga filtergrupper i befintliga filter i webbkartan",
    "persistOnClose": "Bevara filter när widgeten stängts",
    "selectGroup": "Välj en grupp att filtrera",
    "hideDropDown": "Dölj rubrik och filter för 1 grupp",
    "hideDropDownTip": "Dölj rubrik och listruta om bara 1 grupp har konfigurerats",
    "optionsMode": "Dölj widgetalternativ",
    "optionsModeTip": "Alternativ för att visa ytterligare widgetinställningar i gränssnittet. Om alternativet markeras döljs alternativet att spara och läsa in fördefinierade filter och att bevara filtret när widgeten stängs.",
    "optionOR": "ELLER",
    "optionAND": "OCH",
    "optionEQUAL": "LIKA MED",
    "optionNOTEQUAL": "INTE LIKA MED",
    "optionGREATERTHAN": "STÖRRE ÄN",
    "optionGREATERTHANEQUAL": "STÖRRE ÄN ELLER LIKA MED",
    "optionLESSTHAN": "MINDRE ÄN",
    "optionLESSTHANEQUAL": "MINDRE ÄN ELLER LIKA MED",
    "optionSTART": "BÖRJAR MED",
    "optionEND": "SLUTAR MED",
    "optionLIKE": "INNEHÅLLER",
    "optionLIKESPECIFIC": "INNEHÅLLER SPECIFIKA VÄRDEN",
    "optionNOTLIKESPECIFIC": "INNEHÅLLER INTE SPECIFIKA VÄRDEN",
    "optionNOTLIKE": "INNEHÅLLER INTE",
    "optionONORBEFORE": "ÄR PÅ ELLER FÖRE",
    "optionONORAFTER": "ÄR PÅ ELLER EFTER",
    "optionNONE": "INGEN"
  },
  "tables": {
    "layer": "Lager",
    "layerTip": "Lagrets namn som det anges på kartan.",
    "field": "Fält",
    "fieldTip": "Fält som lagret ska filtreras på.",
    "value": "Använd värde",
    "valueTip": "Alternativ för att använda listrutans värden från lagret. Om inget lager använder denna parameter, visas en vanlig textruta för användaren.",
    "zoomTo": "Zooma till resultat",
    "zoomTip": "Alternativ för att zooma till geoobjektens utbredning efter att filtret har använts",
    "action": "Ta bort",
    "actionTip": "Ta bort lagret från filteruppsättningen."
  },
  "popupHeader": {
    "label": "Välj ett förinställt värde"
  },
  "errors": {
    "noGroups": "Minst en grupp behövs.",
    "noGroupName": "Ett eller flera gruppnamn saknas.",
    "noDuplicates": "Ett eller flera gruppnamn är dubbletter.",
    "noRows": "Det behövs minst en rad i tabellen.",
    "noLayers": "Det finns inga lager i kartan."
  },
  "picker": {
    "description": "Hitta ett förinställt värde för den här gruppen.",
    "layer": "Välj ett lager",
    "layerTip": "Lagrets namn som det anges på webbkartan.",
    "field": "Välj ett fält",
    "fieldTip": "Fält som det förinställda värdet kommer att hämtas från.",
    "value": "Välj ett värde",
    "valueTip": "Värde som kommer att vara standardvärde i widgeten."
  }
});