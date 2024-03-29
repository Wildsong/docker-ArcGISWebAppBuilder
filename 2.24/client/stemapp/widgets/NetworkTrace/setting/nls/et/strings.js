define({
  "taskUrl": "Ülesande URL",
  "setTask": "Määra",
  "setTaskPopupTitle": "Määra ülesanne",
  "validate": "Määra",
  "inValidGPService": "Sisestage kehtiv geotöötlusteenus.",
  "noOutputParameterWithGeometryType": "Valitud geotöötlusteenusel peab olema vähemalt üks väljundparameeter määratud geomeetria tüübiga. Valige teistsugune geotöötlusteenus.",
  "invalidOutputGeometry": "Valitud geotöötlusteenuse väljundgeomeetria tüüp ei ühildu projekti seadistustega. Geotöötlusteenuse tulemusi ei saa salvestada.",
  "GPFeatureRecordSetLayerERR": "Palun sisestage geotöötlusteenus, mille sisendid on ainult tüüpi GPFeatureRecordSetLayer.",
  "invalidInputParameters": "Sisendparameetrite arv on kas alla 1 või enam kui 3. Sisestage kehtiv geotöötlusteenus.",
  "projectSetting": {
    "title": "Projekti seaded",
    "note": "Märkus: projekti seaded on valikulised, kui konfigureeritud kasutaja saab projekti salvestada veebikaardi soovitud kihtides koos võrgukatkestuse alaga ja sisendparameetritega. Kasutaja saab salvestada muud väljundparameetrid vahekaardil “Väljund”.",
    "projectPolygonLayer": "Projekti polügoonikiht",
    "outputParameterName": "Väljundparameetri nimi",
    "projectPointLayer": "Projekti punktikiht",
    "selectLabel": "Vali",
    "polygonLayerHelp": "<p>Kuvatakse polügoonikiht (-kihid) järgmiste tingimustega:<br/><ul><li>Kihil peavad olema muutmisfunktsioonid, nimelt „Loo“, „Kustuta“ ja „Värskenda“</li><li>Kihil peab olema 2 välja täpse nime- ja andmetüübiga:</li><ul><li>nimi (stringitüüpi väli)</li><li>globalid (GlobalID tüüpi väli)</li></ul></ul><p/>",
    "outputParameterHelp": "<p>Näidatakse väljundpolügooni kihti (kihte) ülesande URL-ilt<p/>",
    "pointLayerHelp": "<p>Kuvatakse järgmiste tingimustega kiht (-kihid): <br/><ul><li>Kihil peavad olema muutmisfunktsioonid, nimelt „Loo“, „Kustuta“ ja „Värskenda“</li><li>Kihil peab olema kaks täpse nime- ja andmetüübiga välja:</li><ul><li>inputtype (stringitüüpi väli)</li><li>projectid (Guid-tüüpi väli)</li></ul></ul><p/>"
  },
  "inputOutputTab": {
    "flag": "Lipp",
    "barrier": "Tõke",
    "skip": "Jäta vahele",
    "title": "Sisend",
    "inputTooltip": "Kohtspikker",
    "typeText": "Tüüp",
    "symbol": "Sümbol",
    "summaryEditorText": "Kokkuvõtte tekst",
    "summaryTextTitle": "Esitage sisendvahekaardil kuvatav tekst"
  },
  "summaryTab": {
    "title": "Väljund",
    "summaryFieldsetText": "Kokkuvõtte seaded",
    "inputOutput": "Sisend/väljund",
    "field": "Väli",
    "operator": "Operaator",
    "inputOperatorCountOption": "Koguarv",
    "outputOperatorCountOption": "Koguarv",
    "outputOperatorSkipCountOption": "Vahelejätmiste arv",
    "fieldOperatorSumOption": "Summa",
    "fieldOperatorMinOption": "Min",
    "fieldOperatorMaxOption": "Max",
    "fieldOperatorMeanOption": "Keskmine",
    "expressionAddButtonText": "Lisa",
    "expressionVerifyButtonText": "Kinnita",
    "summaryEditorText": "Kokkuvõtte tekst",
    "zoomText": "Automaatne suumimine pärast jälitamist",
    "summarSettingTooltipText": "Lisa sisendi/väljundi arvestus",
    "symbol": "Sümbol",
    "outputParametersText": "Väljundi parameetrid",
    "skipText": "Vahelejäetav",
    "visibilityText": "Nähtav",
    "exportToCsvText": "Ekspordi CSV formaati",
    "settitngstext": "Sätted",
    "saveToLayerText": "Salvesta kihti (valikuline)",
    "inputLabel": "Märgis",
    "inputTooltip": "Kohtspikker",
    "outputDisplay": "Kuvamise tekst",
    "addFieldTitle": "Lisa väli",
    "setScale": "Määra mõõtkava",
    "enterDisplayText": "Sisestage kuvatekst",
    "saveToLayerHelp": "<p>Kuvatakse järgmiste tingimustega kiht:<br/><ul><li>Kihil peavad olema muutmisfunktsioonid, nimelt „Loo“, „Kustuta“ ja „Värskenda“</li><li>Kihil peab olema kaks nime- ja andmetüübiga välja:</li><ul><li>parametername (stringitüüpi väli)</li><li>projectid (Guid-tüüpi väli)</li></ul></ul><p/>",
    "exportToCsvDisplayText": "CSV",
    "summaryTextTitle": "Esitage väljundvahekaardil kuvatav kokkuvõtte tekst",
    "addSummaryItemsTitle": "Lisage kokkuvõtteobjektid"
  },
  "validationErrorMessage": {
    "webMapError": "Aluskaardil ei ole kihte. Palun valige kehtiv veebikaart.",
    "inputTypeFlagGreaterThanError": "Lipikutüüpi sisendeid ei tohi olla rohkem kui üks.",
    "inputTypeFlagLessThanError": "Nõutav on vähemalt üks lipikutüüpi sisend.",
    "inputTypeBarrierErr": "Tõkketüüpi sisendeid ei tohi olla rohkem kui üks.",
    "inputTypeSkipErr": "Vahelejätmistüüpi sisendeid ei tohi olla rohkem kui üks.",
    "displayTextForButtonError": "Nupu „Käivita“ kuvatekst ei tohi olla tühi.",
    "UnableToLoadGeoprocessError": "Ei saanud laadida geotöötlusteenust.",
    "invalidSummaryExpression": "Kehtetu avaldis",
    "validSummaryExpression": "Tehtud!",
    "invalidProjectSettings": "Kehtetud projektiseaded.<br/> Palun valige kehtiv väärtus väljal '${projectSetting}'."
  },
  "hintText": {
    "labelTextHint": "Vihje: sisestage väljundparameetri tulemusplaani kuvatav silt",
    "displayTextHint": "Vihje: see kuvatakse selle väljundparameetri üksikasjade paneelil.",
    "inputTextHint": "Vihje: koostage allpool esitatud avaldis, kasutades kokkuvõtteobjektide nuppu.",
    "expressionHint": "Vihje: avaldise koostamiseks valige üksused ja klõpsake nuppu Lisa."
  }
});