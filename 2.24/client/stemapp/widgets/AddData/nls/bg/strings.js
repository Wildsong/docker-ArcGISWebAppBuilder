define({
  "_widgetLabel": "Добавяне на данни",
  "noOptionsConfigured": "Не бяха конфигурирани опции.",
  "tabs": {
    "search": "Търсене",
    "url": "URL адрес",
    "file": "Файл"
  },
  "search": {
    "featureLayerTitlePattern": "{serviceName} - {layerName}",
    "layerInaccessible": "Слоят е недостъпен.",
    "loadError": "AddData не може да се зареди:",
    "searchBox": {
      "search": "Търсене",
      "placeholder": "Търсене..."
    },
    "bboxOption": {
      "bbox": "В рамките на картата"
    },
    "scopeOptions": {
      "anonymousContent": "Съдържание",
      "myContent": "Моето съдържание",
      "myOrganization": "Моята организация",
      "curated": "Специално подбрани",
      "ArcGISOnline": "ArcGIS Online"
    },
    "sortOptions": {
      "prompt": "Сортиране по:",
      "relevance": "Свързаност",
      "title": "Заглавие",
      "owner": "Собственик",
      "rating": "Оценка",
      "views": "Прегледи",
      "date": "Дата",
      "switchOrder": "Превключване"
    },
    "typeOptions": {
      "prompt": "Тип",
      "mapService": "Картова услуга",
      "featureService": "Услуга с обекти",
      "imageService": "Услуга с изображения",
      "vectorTileService": "Услуга за векторна плочка",
      "kml": "KML",
      "wms": "WMS"
    },
    "resultsPane": {
      "noMatch": "Няма намерени резултати."
    },
    "paging": {
      "first": "<<",
      "firstTip": "Първи",
      "previous": "<",
      "previousTip": "Предишна",
      "next": ">",
      "nextTip": "Напред",
      "pagePattern": "{page}"
    },
    "resultCount": {
      "countPattern": "{count} {type}",
      "itemSingular": "Елемент",
      "itemPlural": "Елементи"
    },
    "item": {
      "actions": {
        "add": "Добавяне",
        "close": "Затваряне",
        "remove": "Изтриване",
        "details": "Подробни данни",
        "done": "Готово",
        "editName": "Редактиране на име"
      },
      "messages": {
        "adding": "Добавяне...",
        "removing": "Премахване...",
        "added": "Добавено",
        "addFailed": "Неуспешно добавяне",
        "unsupported": "Неподдържан"
      },
      "typeByOwnerPattern": "{type} от {owner}",
      "dateFormat": "MMMM д, гггг",
      "datePattern": "{date}",
      "ratingsCommentsViewsPattern": "{ratings} {ratingsIcon} {comments} {commentsIcon} {views} {viewsIcon}",
      "ratingsCommentsViewsLabels": {
        "ratings": "оценки\", \"коментари\": \"коментари\", \"прегледи\": \"прегледи"
      },
      "types": {
        "Map Service": "Картова услуга",
        "Feature Service": "Услуга с обекти",
        "Image Service": "Услуга с изображения",
        "Vector Tile Service": "Услуга за векторна плочка",
        "WMS": "WMS",
        "KML": "KML"
      }
    }
  },
  "addFromUrl": {
    "type": "Тип",
    "url": "URL адрес",
    "types": {
      "ArcGIS": "ArcGIS Server Web Service",
      "WMS": "WMS (Услуга за уеб карта) на OGC (отворен геопространствен консорциум)",
      "WMTS": "Уеб услуга за WMTS (фрагменти на уеб карта) на OGC (отворен геопространствен консорциум)",
      "WFS": "Уеб услуга WFS (Услуга за уеб функции) на OGC",
      "KML": "KML файл",
      "GeoRSS": "GeoRSS файл",
      "CSV": "CSV файл"
    },
    "samplesHint": "URL адрес(и) на образец",
    "invalidURL": "Моля, въведете URL адрес, като започнете с http:// или https://. "
  },
  "addFromFile": {
    "intro": "Можете да пуснете или да разгледате един от следните типове файлове:",
    "types": {
      "Shapefile": "шейп файл (.zip, ZIP архив, съдържащ всички шейп файлове)",
      "CSV": "CSV файл (.csv, с адрес или географска ширина, географска дължина и запетая, точка и запетая или разделени с табулатори)",
      "KML": "KML файл (.kml)",
      "GPX": "GPX файл (.gpx, GPS комуникативен формат)",
      "GeoJSON": "GeoJSON файл (.geo.json или .geojson)"
    },
    "generalizeOn": "Генерализиране на обекти за уеб индикатор",
    "dropOrBrowse": "Пускане или Разглеждане",
    "browse": "Зареждане",
    "invalidType": "Този тип файл не се поддържа.",
    "addingPattern": "{filename}: добавяне...",
    "addFailedPattern": "{filename}: неуспешно добавяне",
    "featureCountPattern": "{filename}: {count} обект(и)",
    "invalidTypePattern": "{filename}: този тип не се поддържа",
    "maxFeaturesAllowedPattern": "Максималния брой от {count} обекти е разрешен",
    "layerNamePattern": "{filename} - {name}",
    "generalIssue": "Имаше проблем.",
    "kmlProjectionMismatch": "Пространственото отношение на картата и KML слоя не съвпадат и конверсията не може да се извърши от клиента.",
    "featureLocationsCouldNotBeFound": "Обектите не могат да бъдат намерени: неизвестни или невалидни полета за местоположение. Файлът ще бъде добавен като таблица."
  },
  "layerList": {
    "caption": "Слоеве",
    "noLayersAdded": "Не бяха добавени слоеве.",
    "removeLayer": "Премахване на слой",
    "back": "Назад"
  }
});