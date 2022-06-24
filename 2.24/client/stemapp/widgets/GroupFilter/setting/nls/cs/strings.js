define({
  "configText": "Níže definujte skupiny filtrů",
  "labels": {
    "groupName": "Název skupiny:",
    "groupNameTip": "Zadejte název této skupiny filtrů. Zobrazí se v rozbalovací nabídce dostupných skupin filtrů.",
    "groupDesc": "Popis:",
    "groupDescTip": "Zadejte popis této skupiny filtrů.",
    "groupOperator": "Přednastavený operátor:",
    "groupOperatorTip": "Možnost pro předdefinování operátoru filtru. Pokud není vybrán přednastavený operátor, použije filtr operátor ROVNÁ SE.",
    "groupDefault": "Přednastavená hodnota:",
    "groupDefaultTip": "Možnost pro zadání hodnoty nebo výběr existující hodnoty z vrstvy. Kliknutím na ikonu hledání můžete procházet vrstvy.",
    "sameLayerAppend": "Pokud je vrstva uvedena v seznamu víckrát než jednou:",
    "sameLayerConjunc": "Připojit pomocí:",
    "caseSearch": "Proveďte vyhledávání s rozlišováním malých a velkých písmen: ",
    "headerTextHelp": "Zadejte text, který se má zobrazit nad výběrem filtru"
  },
  "buttons": {
    "addNewGroup": "Přidejte novou skupinu",
    "addNewGroupTip": "Přidat novou skupinu filtrů",
    "addLayer": "Přidat vrstvu",
    "addLayerTip": "Přidat vrstvu do skupiny filtrů"
  },
  "inputs": {
    "groupName": "Název skupiny filtrů",
    "groupDesc": "Popis skupiny",
    "groupDefault": "Zadat předdefinovanou hodnotu",
    "sameLayerAny": "Přiřadit jakýkoliv výraz",
    "sameLayerAll": "Spárovat všechny výrazy",
    "simpleMode": "Spustit v jednoduchém zobrazení",
    "simpleModeTip": "Zjednoduší rozhraní widgetu. Je-li tato možnost zaškrtnuta, rozbalovací nabídka operátorů a tlačítka pro přidání kritérií budou skryta.",
    "webmapAppendModeAny": "Připojit jakékoliv výrazy k existujícímu mapovému filtru",
    "webmapAppendModeAll": "Připojit všechny výrazy k existujícímu mapovému filtru",
    "webmapAppendModeTip": "Možnost pro připojení skupin filtrů k existujícím filtrům ve webové mapě.",
    "persistOnClose": "Zachovat filtry po zavření widgetu",
    "selectGroup": "Vyberte skupinu k filtrování",
    "hideDropDown": "Skrýt záhlaví a filtr při konfiguraci jedné skupiny",
    "hideDropDownTip": "Skryje záhlaví a rozbalovací nabídku, je-li nakonfigurována pouze jedna skupina filtrů",
    "optionsMode": "Skrýt možnosti widgetu",
    "optionsModeTip": "Možnost pro zobrazení dalších nastavení widgetu. Je-li zaškrtnuta, bude z rozhraní odstraněna a skryta možnost ukládání a načítání předdefinovaných filtrů a zachování filtru po zavření widgetu.",
    "optionOR": "'NEBO'",
    "optionAND": "A",
    "optionEQUAL": "JE ROVNO",
    "optionNOTEQUAL": "NENÍ ROVNO",
    "optionGREATERTHAN": "VĚTŠÍ NEŽ",
    "optionGREATERTHANEQUAL": "VĚTŠÍ NEŽ NEBO ROVNO",
    "optionLESSTHAN": "MENŠÍ NEŽ",
    "optionLESSTHANEQUAL": "MENŠÍ NEŽ NEBO ROVNO",
    "optionSTART": "ZAČÍNÁ NA",
    "optionEND": "KONČÍ NA",
    "optionLIKE": "OBSAHUJE",
    "optionLIKESPECIFIC": "OBSAHUJE KONKRÉTNÍ HODNOTY",
    "optionNOTLIKESPECIFIC": "NEOBSAHUJE KONKRÉTNÍ HODNOTY",
    "optionNOTLIKE": "NEOBSAHUJE",
    "optionONORBEFORE": "JE V TERMÍNU NEBO PŘED",
    "optionONORAFTER": "JE V TERMÍNU NEBO PO",
    "optionNONE": "Žádný"
  },
  "tables": {
    "layer": "Vrstvy",
    "layerTip": "Název vrstvy podle definice v mapě",
    "field": "Pole",
    "fieldTip": "Pole, podle kterého bude vrstva filtrována.",
    "value": "Používat hodnotu",
    "valueTip": "Možnost použít rozbalovací seznam hodnot z vrstvy. Pokud tento parametr nepoužívá žádná vrstva, zobrazí se uživateli pole prostého textu.",
    "zoomTo": "Příblížit na výsledek",
    "zoomTip": "Možnost pro přiblížení na rozsah prvků po aplikaci filtru",
    "action": "Smazat",
    "actionTip": "Odstraní vrstvu ze sady filtrů."
  },
  "popupHeader": {
    "label": "Vybrat přednastavenou hodnotu"
  },
  "errors": {
    "noGroups": "Je nutné mít alespoň jednu skupiny.",
    "noGroupName": "Chybí jeden nebo více názvů skupin.",
    "noDuplicates": "Jeden nebo více názvů skupin se opakují.",
    "noRows": "Tabulka musí obsahovat alespoň jeden řádek.",
    "noLayers": "Mapa neobsahuje vrstvy."
  },
  "picker": {
    "description": "Vyhledá přednastavenou hodnotu pro tuto skupinu.",
    "layer": "Vyberte vrstvu",
    "layerTip": "Název vrstvy podle definice ve webové mapě",
    "field": "Vyberte pole",
    "fieldTip": "Pole, ze kterého bude nastavena přednastavená hodnota.",
    "value": "Vyberte hodnotu",
    "valueTip": "Hodnota, která bude u widgetu výchozí."
  }
});