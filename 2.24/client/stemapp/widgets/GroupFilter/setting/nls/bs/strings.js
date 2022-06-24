define({
  "configText": "Definirajte grupe filtara u nastavku",
  "labels": {
    "groupName": "Naziv grupe:",
    "groupNameTip": "Navedite naziv za ovu grupu filtera. Prikazat će se na padajućem izborniku dostupnih grupa filtara.",
    "groupDesc": "Opis:",
    "groupDescTip": "Navedite opis za ovu grupu filtera",
    "groupOperator": "Prethodno postavljeni rukovatelj:",
    "groupOperatorTip": "Mogućnost unaprijed definiranja rukovatelja filtera. Ako ne postoji predefinirani rukovatelj, filtar će upotrijebiti JEDNAKOG rukovatelja.",
    "groupDefault": "Prethodno postavljena vrijednost:",
    "groupDefaultTip": "Mogućnost upisivanja vrijednosti ili odabira postojeće vrijednosti iz sloja. Kliknite ikonu Traži za pregledavanje slojeva.",
    "sameLayerAppend": "Kada je sloj naveden više puta:",
    "sameLayerConjunc": "Pridodajte pomoću sljedećeg:",
    "caseSearch": "Izvršite pretraživanje osjetljivo na veličinu slova: ",
    "headerTextHelp": "Navedite tekst za prikaz iznad odabira filtra"
  },
  "buttons": {
    "addNewGroup": "Dodaj novu grupu",
    "addNewGroupTip": "Dodajte novu grupu filtera",
    "addLayer": "Dodaj sloj",
    "addLayerTip": "Dodajte sloj u grupu filtera"
  },
  "inputs": {
    "groupName": "Naziv grupe filtera",
    "groupDesc": "Opis za grupu",
    "groupDefault": "Unesite prethodno definiranu vrijednost",
    "sameLayerAny": "Pronađi podudaranje s bilo kojim izrazom",
    "sameLayerAll": "Pronađi podudaranje sa svim izrazima",
    "simpleMode": "Pokreni u pojednostavljenom prikazu",
    "simpleModeTip": "Pojednostavni sučelje widgeta. Kada je označeno, padajući izbornik za rukovatelja i gumbi za dodavanje kriterija su sakriveni.",
    "webmapAppendModeAny": "Dodaj bilo koje izraze postojećem filtru karte",
    "webmapAppendModeAll": "Dodaj sve izraze postojećem filtru karte",
    "webmapAppendModeTip": "Mogućnost dodavanja grupa filtera postojećim filterima na web karti",
    "persistOnClose": "Nastavi filtere nakon zatvaranja widgeta",
    "selectGroup": "Odaberi grupu za filtriranje",
    "hideDropDown": "Sakrij zaglavlje i filtriraj za 1 grupu",
    "hideDropDownTip": "Sakrij zaglavlje i padajući izbornik ako je konfigurirana samo 1 grupa filtera",
    "optionsMode": "Sakrij opcije widgeta",
    "optionsModeTip": "Mogućnost prikazivanja dodatnih postavki widgeta. Ako je označeno, spremanje i učitavanje unaprijed definiranih filtera i zadržavanje filtera nakon zatvaranja widgeta skriveni su iz sučelja.",
    "optionOR": "ILI",
    "optionAND": "I",
    "optionEQUAL": "JEDNAKO",
    "optionNOTEQUAL": "NIJE JEDNAKO",
    "optionGREATERTHAN": "VEĆE OD",
    "optionGREATERTHANEQUAL": "VEĆE OD ILI JEDNAKO",
    "optionLESSTHAN": "MANJE OD",
    "optionLESSTHANEQUAL": "MANJE OD ILI JEDNAKO",
    "optionSTART": "POČINJE S",
    "optionEND": "ZAVRŠAVA S",
    "optionLIKE": "SADRŽI",
    "optionLIKESPECIFIC": "SADRŽI ODREĐENE VRIJEDNOSTI",
    "optionNOTLIKESPECIFIC": "NE SADRŽI ODREĐENE VRIJEDNOSTI",
    "optionNOTLIKE": "NE SADRŽI",
    "optionONORBEFORE": "JE NA ILI PRIJE",
    "optionONORAFTER": "JE NA ILI KASNIJE",
    "optionNONE": "NEMA"
  },
  "tables": {
    "layer": "Slojevi",
    "layerTip": "Naziv sloja kako je definirano na karti.",
    "field": "Polja",
    "fieldTip": "Polje prema kojem će se sloj filtrirati.",
    "value": "Upotrijebi vrijednost",
    "valueTip": "Opcija za upotrebu vrijednosti padajućeg izbornika sa sloja. Ako nijedan sloj ne upotrebljava ovaj parametar, korisniku će se prikazati običan okvir za tekst.",
    "zoomTo": "Povećaj na rezultat",
    "zoomTip": "Opcija povećavanja na obuhvat geoobjekta nakon što se filtar primijeni",
    "action": "Izbriši",
    "actionTip": "Uklonite sloj iz skupa filtara."
  },
  "popupHeader": {
    "label": "Odaberi prethodno postavljenu vrijednost"
  },
  "errors": {
    "noGroups": "Potrebna vam je barem jedna grupa.",
    "noGroupName": "Nedostaje jedan ili više naziva grupa.",
    "noDuplicates": "Kopiranu su jedan ili više naziva grupa.",
    "noRows": "Potreban vam je barem jedan red u tablici.",
    "noLayers": "Nemate slojeva u karti."
  },
  "picker": {
    "description": "Pronađi unaprijed postavljenu vrijednost za ovu grupu.",
    "layer": "Odaberi sloj",
    "layerTip": "Naziv sloja kako je definirano na web-karti.",
    "field": "Odaberi polje",
    "fieldTip": "Polje prema kojem će se postavljati predefinirana vrijednost.",
    "value": "Odaberi vrijednost",
    "valueTip": "Vrijednost koja će biti zadana widgetu."
  }
});