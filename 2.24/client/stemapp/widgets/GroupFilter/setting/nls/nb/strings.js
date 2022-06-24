define({
  "configText": "Definer filtergruppene nedenfor",
  "labels": {
    "groupName": "Gruppenavn:",
    "groupNameTip": "Angi et navn for filtergruppen. Det vil vises i rullegardinlisten med tilgjengelige filtergrupper.",
    "groupDesc": "Beskrivelse:",
    "groupDescTip": "Angi en beskrivelse for filtergruppen",
    "groupOperator": "Forhåndsinnstilt operator:",
    "groupOperatorTip": "Alternativ for å forhåndsdefinere operatoren for filteret. Hvis Forhåndsinnstilt operator ikke er valgt, bruker filteret LIK-operatoren.",
    "groupDefault": "Forhåndsinnstilt verdi:",
    "groupDefaultTip": "Alternativ for å skrive inn en verdi eller velge en eksisterende verdi fra et lag. Klikk på søkeikonet for å bla gjennom lag.",
    "sameLayerAppend": "Når et lag er oppført flere ganger:",
    "sameLayerConjunc": "Legg til ved hjelp av:",
    "caseSearch": "Utfør søk som skiller mellom store og små bokstaver: ",
    "headerTextHelp": "Oppgi tekst som skal vises over filtervalg"
  },
  "buttons": {
    "addNewGroup": "Legg til ny gruppe",
    "addNewGroupTip": "Legg til en ny filtergruppe",
    "addLayer": "Legg til lag",
    "addLayerTip": "Legg til et lag i filtergruppen"
  },
  "inputs": {
    "groupName": "Navn på filtergruppen",
    "groupDesc": "Beskrivelse for gruppen",
    "groupDefault": "Angi forhåndsdefinert verdi",
    "sameLayerAny": "Finn et uttrykk",
    "sameLayerAll": "Finn alle samsvarende uttrykk",
    "simpleMode": "Start i enkel visning",
    "simpleModeTip": "Forenkle grensesnittet for miniprogram. Når dette alternativet er valgt, fjernes rullegardinlisten for operatorer og knappene for å legge til kriterier.",
    "webmapAppendModeAny": "Legg til et uttrykk til eksisterende kartfilter",
    "webmapAppendModeAll": "Legg til alle uttrykk til eksisterende kartfilter",
    "webmapAppendModeTip": "Alternativ for å legge til filtergrupper i eksisterende filtre i webkartet",
    "persistOnClose": "Behold filtre etter at miniprogrammet er lukket",
    "selectGroup": "Velg en gruppe som skal filtreres",
    "hideDropDown": "Skjul overskrift og filter for 1 gruppe",
    "hideDropDownTip": "Skjul overskriften og rullegardinmenyen hvis kun 1 gruppe er konfigurert",
    "optionsMode": "Skjul alternativer for miniprogram",
    "optionsModeTip": "Alternativ for å vise flere innstillinger for miniprogram. Hvis dette alternativet er valgt, fjernes muligheten til å lagre og laste inn forhåndsdefinerte filtre og beholde filteret når miniprogrammet lukkes fra grensesnittet.",
    "optionOR": "ELLER",
    "optionAND": "OG",
    "optionEQUAL": "LIK",
    "optionNOTEQUAL": "IKKE LIK",
    "optionGREATERTHAN": "STØRRE ENN",
    "optionGREATERTHANEQUAL": "STØRRE ENN ELLER LIK",
    "optionLESSTHAN": "MINDRE ENN",
    "optionLESSTHANEQUAL": "MINDRE ENN ELLER LIK",
    "optionSTART": "BEGYNNER MED",
    "optionEND": "SLUTTER MED",
    "optionLIKE": "INNEHOLDER",
    "optionLIKESPECIFIC": "INNEHOLDER SPESIFIKKE VERDIER",
    "optionNOTLIKESPECIFIC": "INNEHOLDER IKKE SPESIFIKKE VERDIER",
    "optionNOTLIKE": "INNEHOLDER IKKE",
    "optionONORBEFORE": "ER PÅ ELLER FØR",
    "optionONORAFTER": "ER PÅ ELLER ETTER",
    "optionNONE": "INGEN"
  },
  "tables": {
    "layer": "Lag",
    "layerTip": "Navn på laget slik det er definert i kartet.",
    "field": "Felter",
    "fieldTip": "Felt som laget filtreres på.",
    "value": "Bruk verdi",
    "valueTip": "Alternativ for å bruke rullegardinlisteverdier fra laget. Hvis det ikke er et lag som bruker denne parameteren, vises en enkel tekstboks for brukeren.",
    "zoomTo": "Zoom til resultatet",
    "zoomTip": "Alternativ for å zoome til utstrekningen av geoobjektene når filteret er tatt i bruk",
    "action": "Slett",
    "actionTip": "Fjern lag fra filtersettet."
  },
  "popupHeader": {
    "label": "Velg en forhåndsinnstilt verdi"
  },
  "errors": {
    "noGroups": "Du må ha minst én gruppe.",
    "noGroupName": "Et eller flere gruppenavn mangler.",
    "noDuplicates": "Et eller flere gruppenavn er like.",
    "noRows": "Du må ha minst én rad i tabellen.",
    "noLayers": "Du har ingen lag i kartet."
  },
  "picker": {
    "description": "Finn den forhåndsinnstilte verdien for denne gruppen.",
    "layer": "Velg et lag",
    "layerTip": "Navn på laget slik det er definert i webkartet.",
    "field": "Velg et felt",
    "fieldTip": "Felt som den forhåndsinnstilte verdien angis fra.",
    "value": "Velg en verdi",
    "valueTip": "Verdi som vil være standardverdien for miniprogrammet."
  }
});