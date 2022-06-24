define({
  "configText": "Määritä suodatinryhmäsi alla",
  "labels": {
    "groupName": "Ryhmän nimi:",
    "groupNameTip": "Anna nimi tälle suodatinryhmälle. Se näytetään käytettävissä olevien suodatinryhmien avattavassa luettelossa.",
    "groupDesc": "Kuvaus:",
    "groupDescTip": "Anna kuvaus tälle suodatinryhmälle",
    "groupOperator": "Esiasetettu operaattori:",
    "groupOperatorTip": "Asetus, jolla voidaan määrittää ennalta suodattimen operaattori. Jos esiasetettua operaattoria ei valita, suodatin käyttää YHTÄ SUURI KUIN -operaattoria.",
    "groupDefault": "Esiasetettu arvo:",
    "groupDefaultTip": "Asetus, jolla voidaan määrittää arvo tai valita aiemmin luotu arvo karttatasosta. Selaa karttatasoja napsauttamalla hakukuvaketta.",
    "sameLayerAppend": "Kun karttataso luetellaan useammin kuin kerran:",
    "sameLayerConjunc": "Liitä seuraavan avulla:",
    "caseSearch": "Käytä kirjainkoon tunnistavaa hakua: ",
    "headerTextHelp": "Määritä suodatusvalinnan yläpuolella näytettävä teksti"
  },
  "buttons": {
    "addNewGroup": "Lisää uusi ryhmä",
    "addNewGroupTip": "Lisää uusi suodatinryhmä",
    "addLayer": "Lisää karttataso",
    "addLayerTip": "Lisää karttataso suodatinryhmään"
  },
  "inputs": {
    "groupName": "Suodatinryhmän nimi",
    "groupDesc": "Ryhmän kuvaus",
    "groupDefault": "Anna ennalta määritetty arvo",
    "sameLayerAny": "Etsi vastinetta mille tahansa -lauseke",
    "sameLayerAll": "Vastaa kaikkia lausekkeita",
    "simpleMode": "Aloita yksinkertaisessa näkymässä",
    "simpleModeTip": "Yksinkertaista pienoisohjelman liittymä. Kun valintaruutu valitaan, operaattorien avattava luettelo ja ehtojen lisäyspainikkeet piilotetaan.",
    "webmapAppendModeAny": "Liitä mitkä tahansa lausekkeet olemassa olevaan kartan suodattimeen",
    "webmapAppendModeAll": "Liitä kaikki lausekkeet olemassa olevaan kartan suodattimeen",
    "webmapAppendModeTip": "Asetus, jolla voidaan liittää suodatinjoukot olemassa oleviin suodattimiin web-kartassa",
    "persistOnClose": "Säilytä suodattimet pienoisohjelman sulkemisen jälkeen",
    "selectGroup": "Valitse suodatettava ryhmä",
    "hideDropDown": "Piilota otsikko ja suodatin yhdeltä ryhmältä",
    "hideDropDownTip": "Piilota otsikko ja avattava valikko, jos vain yksi suodatinryhmä on määritetty",
    "optionsMode": "Piilota pienoisohjelman asetukset",
    "optionsModeTip": "Asetus, jolla voidaan näyttää pienoisohjelman lisäasetukset. Jos valintaruutu valitaan, liittymästä piilotetaan määritettyjen suodattimien tallennus ja lataus sekä suodattimen säilyttäminen pienoisohjelman sulkemisen jälkeen.",
    "optionOR": "TAI",
    "optionAND": "JA",
    "optionEQUAL": "YHTÄ SUURI KUIN",
    "optionNOTEQUAL": "EI YHTÄ SUURI KUIN",
    "optionGREATERTHAN": "SUUREMPI KUIN",
    "optionGREATERTHANEQUAL": "SUUREMPI TAI YHTÄ SUURI KUIN",
    "optionLESSTHAN": "PIENEMPI KUIN",
    "optionLESSTHANEQUAL": "PIENEMPI TAI YHTÄ SUURI KUIN",
    "optionSTART": "ALKAA MERKILLÄ",
    "optionEND": "PÄÄTTYY MERKKIIN",
    "optionLIKE": "SISÄLTÄÄ",
    "optionLIKESPECIFIC": "SISÄLTÄÄ TIETYT ARVOT",
    "optionNOTLIKESPECIFIC": "EI SISÄLLÄ TIETTYJÄ ARVOJA",
    "optionNOTLIKE": "EI SISÄLLÄ",
    "optionONORBEFORE": "ON TIETTYNÄ PÄIVÄNÄ TAI SITÄ ENNEN",
    "optionONORAFTER": "ON TIETTYNÄ PÄIVÄNÄ TAI SEN JÄLKEEN",
    "optionNONE": "EI MITÄÄN"
  },
  "tables": {
    "layer": "Karttatasot",
    "layerTip": "Karttatason nimi karttaan määritetyssä muodossa.",
    "field": "Kentät",
    "fieldTip": "Kenttä, jonka perusteella karttataso suodatetaan.",
    "value": "Käytä arvoa",
    "valueTip": "Asetus ottaa käyttöön karttatason arvojen avattavan luettelon. Jos mikään karttataso ei käytä tätä parametria, käyttäjä näkee vain tekstiruudun.",
    "zoomTo": "Tarkenna tulokseen",
    "zoomTip": "Asetus, jolla voidaan tarkentaa kohteiden laajuuteen, kun suodatinta käytetään",
    "action": "Poista",
    "actionTip": "Poista karttataso suodatinjoukosta."
  },
  "popupHeader": {
    "label": "Valitse esiasetettu arvo"
  },
  "errors": {
    "noGroups": "Tarvitset vähintään yhden ryhmän.",
    "noGroupName": "Vähintään yhden ryhmän nimi puuttuu.",
    "noDuplicates": "Vähintään yhden ryhmän nimi on kaksoiskappale.",
    "noRows": "Tarvitset taulukkoon vähintään yhden rivin.",
    "noLayers": "Kartassasi ei ole karttatasoja."
  },
  "picker": {
    "description": "Etsi tämän ryhmän esiasetettu arvo.",
    "layer": "Valitse karttataso",
    "layerTip": "Karttatason nimi web-karttaan määritetyssä muodossa.",
    "field": "Valitse kenttä",
    "fieldTip": "Kenttä, josta esiasetettu arvo määritetään.",
    "value": "Valitse arvo",
    "valueTip": "Arvo, jota käytetään pienoisohjelman oletuksena."
  }
});