define({
  "page1": {
    "selectToolHeader": "Określ metodę wyboru rekordów do aktualizowania wsadowego.",
    "selectToolDesc": "Widżet obsługuje 3 metody służące do generowania wybranego zestawu rekordów do aktualizacji. Można wybrać tylko jedną z tych metod. Jeśli konieczna jest więcej niż jedna metoda, utwórz nową instancję widżetu.",
    "selectByShape": "Wybierz według obszaru",
    "shapeTypeSelector": "Wybierz narzędzia, które będą używane do wybierania obiektów na mapie",
    "shapeType": {
      "point": "Punkt",
      "line": "Linia",
      "polyline": "Polilinia",
      "freehandPolyline": "Polilinia odręczna",
      "extent": "Zasięg",
      "polygon": "Poligon",
      "freehandPolygon": "Poligon odręczny"
    },
    "freehandPolygon": "Poligon odręczny",
    "selectBySpatQuery": "Wybierz według obiektu",
    "selectByAttQuery": "Wybierz według wartości obiektu i udostępnionego atrybutu",
    "selectByQuery": "Wybierz według zapytania",
    "toolNotSelected": "Określ metodę wyboru",
    "noDrawToolSelected": "Wybierz co najmniej jedno narzędzie rysowania"
  },
  "page2": {
    "layersToolHeader": "Wybierz warstwy do uaktualnienia i opcje narzędzi wyboru (jeżeli są).",
    "layersToolDesc": "Podany na poprzedniej karcie typ wyboru będzie używany do wybierania i aktualizowania obiektów z podanego poniższej zestawu warstw. W przypadku zaznaczenia więcej niż jednej warstwy podczas aktualizacji dostępne będą tylko wspólne pola edytowalne. Zależnie od typu wyboru może być konieczne wybranie dodatkowych opcji.",
    "layerTable": {
      "colUpdate": "Zmień",
      "colLabel": "Warstwa",
      "colSelectByLayer": "Wybierz  według warstwy",
      "colSelectByField": "Pole zapytania",
      "colhighlightSymbol": "Symbol podświetlenia"
    },
    "toggleLayers": "Przełączaj widzialność warstw na otwarte/zamknięte",
    "noEditableLayers": "Brak edytowalnych warstw",
    "noLayersSelected": "Wybierz co najmniej jedną warstwę przed kontynuacją."
  },
  "page3": {
    "commonFieldsHeader": "Wybierz pola do aktualizacji wsadowej.",
    "commonFieldsDesc": "Poniżej zostaną wyświetlone tylko wspólne pola edytowalne. Wybierz pola do zaktualizowania. Jeśli w różnych warstwach zostaną znalezione pola o tej samej nazwie, ale różnych domenach, można użyć tylko jednej domeny.",
    "noCommonFields": "Brak wspólnych pól",
    "fieldTable": {
      "colEdit": "Edytowalne",
      "colName": "Nazwa",
      "colAlias": "Alias",
      "colAction": "Działania"
    }
  },
  "tabs": {
    "selection": "Zdefiniuj rodzaj wyboru",
    "layers": "Zdefiniuj warstwy do aktualizacji",
    "fields": "Zdefiniuj pola do aktualizacji"
  },
  "errorOnOk": "Przed zapisaniem konfiguracji należy wprowadzić wszystkie parametry",
  "next": "Dalej",
  "back": "Powrót",
  "save": "Zapisz symbol",
  "cancel": "Anuluj",
  "ok": "OK",
  "symbolPopup": "Wybór symbolu",
  "editHeaderText": "Tekst do wyświetlenia w górnej części widżetu",
  "widgetIntroSelectByArea": "Użyj jednego z poniższych narzędzi, aby utworzyć wybrany zestaw obiektów do zaktualizowania.  Jeśli wiersz został <font class='maxRecordInIntro'>wyróżniony</font>, przekroczono maksymalną liczbę rekordów.",
  "widgetIntroSelectByFeature": "Użyj poniższego narzędzia, aby wybrać obiekt z warstwy <font class='layerInIntro'>${0}</font>. Ten obiekt zostanie użyty do wybrania i zaktualizowania wszystkich przecinających się z nim obiektów. Jeśli wiersz został <font class='maxRecordInIntro'>wyróżniony</font>, przekroczono maksymalną liczbę rekordów.",
  "widgetIntroSelectByFeatureQuery": "Użyj poniższego narzędzia, aby wybrać obiekt z warstwy <font class='layerInIntro'>${0}</font>. Atrybut <font class='layerInIntro'>${1}</font> tego obiektu będzie używany do tworzenia zapytań dotyczących poniższych warstw i aktualizowania obiektów wynikowych.  Jeśli wiersz został <font class='maxRecordInIntro'>wyróżniony</font>, przekroczono maksymalną liczbę rekordów.",
  "widgetIntroSelectByQuery": "Wprowadź wartość, aby utworzyć zestaw wybranych elementów.  Jeśli wiersz został <font class='maxRecordInIntro'>wyróżniony</font>, przekroczono maksymalną liczbę rekordów."
});