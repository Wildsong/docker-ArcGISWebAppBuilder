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
  "configText": "Yapılandırma metni ayarla:",
  "generalSettings": {
    "tabTitle": "Genel ayarlar",
    "measurementUnitLabel": "Maliyet Birimi",
    "currencyLabel": "Maliyet Sembolü",
    "roundCostLabel": "Maliyeti Yuvarla",
    "projectOutputSettings": "Proje Çıktı Ayarları",
    "typeOfProjectAreaLabel": "Proje Alanı Türü",
    "bufferDistanceLabel": "Tampon Mesafesi",
    "csvReportExportLabel": "Kullanıcının proje raporunu dışa aktarmasına izin ver",
    "editReportSettingsBtnTooltip": "Rapor ayarlarını düzenle",
    "roundCostValues": {
      "twoDecimalPoint": "İki Ondalık Noktası",
      "nearestWholeNumber": "En Yakın Tam Sayı",
      "nearestTen": "En Yakın On",
      "nearestHundred": "En Yakın Yüz",
      "nearestThousand": "En Yakın Bin",
      "nearestTenThousands": "En Yakın On Bin"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Rapor Ayarları",
      "reportNameLabel": "Rapor adı (isteğe bağlı):",
      "checkboxLabel": "Göster",
      "layerTitle": "Başlık",
      "columnLabel": "Etiket",
      "duplicateMsg": "Etiketi yinele"
    },
    "projectAreaType": {
      "outline": "Ana Hat",
      "buffer": "Tampon"
    },
    "errorMessages": {
      "currency": "Geçersiz para birimi",
      "bufferDistance": "Geçersiz tampon mesafesi",
      "outOfRangebufferDistance": "Değer 0'dan büyük veya 100'den az veya eşit olmalıdır"
    }
  },
  "projectSettings": {
    "tabTitle": "Proje ayarları",
    "costingGeometrySectionTitle": "Maliyet için coğrafyayı tanımla (opsiyonel)",
    "costingGeometrySectionNote": "Not: Bu katmanı yapılandırmak, kullanıcının coğrafyayı temel alan detay şablonlarının maliyet denklemlerini ayarlamasına izin verecektir.",
    "projectTableSectionTitle": "Proje ayarlarını Kaydetme/Yükleme becerisi (opsiyonel)",
    "projectTableSectionNote": "Not: Tüm tabloları ve katmanları yapılandırmak, kullanıcının daha sonra kullanmak üzere projeyi kaydetmesine/yüklemesine olanak tanır.",
    "costingGeometryLayerLabel": "Maliyet Geometrisi Katmanı",
    "fieldLabelGeography": "Coğrafya Etiketleme Alanı",
    "projectAssetsTableLabel": "Proje Varlıkları Tablosu",
    "projectMultiplierTableLabel": "Proje Çarpanı Ek Maliyet Tablosu",
    "projectLayerLabel": "Proje Katmanı",
    "configureFieldsLabel": "Alanları Yapılandır",
    "fieldDescriptionHeaderTitle": "Alan Tanımı",
    "layerFieldsHeaderTitle": "Katman Alanı",
    "selectLabel": "Seç",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} zaten seçildi",
      "invalidConfiguration": "Lütfen ${fieldsString} seç"
    },
    "costingGeometryHelp": "<p>Aşağıdaki koşullara sahip poligon katmanı (katmanları) gösterilir: <br/> <li> Katman 'Sorgu' yeteneğine sahip olmalıdır</li><li> Katmanda bir GlobalID alanı bulunmalıdır</li></p>",
    "fieldToLabelGeographyHelp": "<p>Seçili 'Costing Geometry Layer' dizisi ve sayısal alanları Field to 'Label Geography' açılır penceresinde gösterilecektir.</p>",
    "projectAssetsTableHelp": "<p>Aşağıdaki koşullara sahip tablo (tablolar) gösterilecektir: <br/> <li>Tabloda şu düzenleme yetenekleri olmalıdır: 'Oluştur', 'Sil' ve 'Güncelle'</li> <li>Tabloda aynı ad ve aynı veri türüne sahip altı alan bulunmalıdır:</li><ul><li> AssetGUID (GUID türü alan)</li><li> CostEquation (Dizi türü alan)</li><li> Senaryo (Dizi türü alan)</li><li> TemplateName (Dizi türü alan)</li><li> GeographyGUID (GUID türü alan)</li><li> ProjectGUID (GUID türü alan)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Aşağıdaki koşullara sahip tablo (tablolar) gösterilecektir: <br/> <li>Tabloda şu düzenleme yetenekleri olmalıdır: 'Oluştur', 'Sil' ve 'Güncelle'</li> <li>Tabloda aynı ad ve aynı veri türüne sahip beş alan bulunmalıdır:</li><ul><li> Açıklama (Dizi türü alan)</li><li> Tür (Dizi türü alan)</li><li> Değer (Kayar/Çift tür alan)</li><li> Costindex (Tam sayı türü alan)</li><li> ProjectGUID (GUID türü alan))</li></ul> </p>",
    "projectLayerHelp": "<p>Aşağıdaki koşullara sahip çokgen katmanı (katmanları) gösterilecektir: <br/> <li>Katmanda şu düzenleme yetenekleri olmalıdır: 'Oluştur', 'Sil' ve 'Güncelle'</li> <li>Katmanda aynı ad ve aynı veri türüne sahip beş alan bulunmalıdır:</li><ul><li> ProjectName (Dizi türü alan)</li><li>Açıklama (Dizi türü alan)</li><li>Totalassetcost (Kayar/Çift tür alan)</li><li>Grossprojectcost (Kayar/Çift tür alan)</li><li>GlobalID (GlobalID türü alan))</li></ul> </p>",
    "pointLayerCentroidLabel": "Nokta Katmanı Kütle Merkezi",
    "selectRelatedPointLayerDefaultOption": "Seç",
    "pointLayerHintText": "<p>Aşağıdaki koşullara sahip nokta katmanları gösterilir: <br/> <li>\tKatman için, ‘Projectid’ (GUID türü) alanı olmalıdır</li><li>\tKatmanın, ‘Oluştur’, ‘Sil’ ve ‘Güncelle’ adlı düzenleme yetenekleri olmalıdır</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Katman ayarları",
    "layerNameHeaderTitle": "Katman adı",
    "layerNameHeaderTooltip": "Haritadaki katmanlar listesi",
    "EditableLayerHeaderTitle": "Düzenlenebilir",
    "EditableLayerHeaderTooltip": "Maliyet aracına katman ve şablonlarını dahil et",
    "SelectableLayerHeaderTitle": "Seçilebilir",
    "SelectableLayerHeaderTooltip": "Yeni bir maliyet öğesi oluşturmak için detaydan geometri kullanılabilir",
    "fieldPickerHeaderTitle": "Proje kimliği (opsiyonel)",
    "fieldPickerHeaderTooltip": "Proje kimliğinin depolanacağı opsiyonel alan (dizi türünün)",
    "selectLabel": "Seç",
    "noAssetLayersAvailable": "Seçilen web haritasında varlık katmanı bulunamadı",
    "disableEditableCheckboxTooltip": "Bu katmanda düzenleme becerileri yok",
    "missingCapabilitiesMsg": "Bu katmanda aşağıdaki beceriler yok:",
    "missingGlobalIdMsg": "Bu katmanda GlobalId alanı yok",
    "create": "Oluştur",
    "update": "Güncelle",
    "deleteColumnLabel": "Sil",
    "attributeSettingHeaderTitle": "Öznitelik Ayarları",
    "addFieldLabelTitle": "Öznitelikler Ekle",
    "layerAttributesHeaderTitle": "Katman Öznitelikleri",
    "projectLayerAttributesHeaderTitle": "Proje Katmanı Öznitelikleri",
    "attributeSettingsPopupTitle": "Katman Öznitelik Ayarları"
  },
  "costingInfo": {
    "tabTitle": "Maliyet Bilgileri",
    "proposedMainsLabel": "Teklif Edilenler",
    "addCostingTemplateLabel": "Maliyet Şablonu Ekle",
    "manageScenariosTitle": "Senaryoları Yönet",
    "featureTemplateTitle": "Detay Taslağı",
    "costEquationTitle": "Maliyet Denklemi",
    "geographyTitle": "Coğrafya",
    "scenarioTitle": "Senaryo",
    "actionTitle": "İşlemler",
    "scenarioNameLabel": "Senaryo Adı",
    "addBtnLabel": "Ekle",
    "srNoLabel": "No.",
    "deleteLabel": "Sil",
    "duplicateScenarioName": "Yinelenen senaryo adı",
    "hintText": "<div>İpucu: Aşağıdaki anahtar sözcükleri kullanın</div><ul><li><b>{TOTALCOUNT}</b>: Bir coğrafyadaki aynı tür varlıkların toplam sayısını kullanır</li><li><b>{MEASURE}</b>: Çizgi varlığı için uzunluk ve poligon varlığı için alanı kullanır</li><li><b>{TOTALMEASURE}</b>: Bir coğrafyada aynı türdeki çizgi varlığı için toplam uzunluğu poligon varlığı için toplam alanı kullanır</li></ul> Şu işlevleri kullanabilirsiniz:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Lütfen projenizin ihtiyacına göre maliyet denklemini düzenleyin.",
    "noneValue": "Yok",
    "requiredCostEquation": "${layerName} için geçersiz maliyet denklemi: ${templateName}",
    "duplicateTemplateMessage": "${layerName} için mevcut şablon girişini yinele: ${templateName}",
    "defaultEquationRequired": "${layerName} için varsayılan denklem gerekli: ${templateName}",
    "validCostEquationMessage": "Lütfen geçerli maliyet denklemini girin",
    "costEquationHelpText": "Lütfen maliyet denklemini projenizin ihtiyaçlarına uygun olarak düzenleyin",
    "scenarioHelpText": "Lütfen senaryoyu projenizin ihtiyaçlarına uygun olarak seçin",
    "copyRowTitle": "Sırayı Kopyala",
    "noTemplateAvailable": "${layerName} için lütfen en az bir şablon ekleyin",
    "manageScenarioLabel": "Senaryoyu yönet",
    "noLayerMessage": "${tabName} sekmesine lütfen en az bir katman ekleyin",
    "noEditableLayersAvailable": "Katman (katmanlar), katman ayarları tablosunda düzenlenebilir olarak işaretlenmelidir",
    "updateProjectCostCheckboxLabel": "Proje denklemlerini güncelle",
    "updateProjectCostEquationHint": "İpucu: Bu, kullanıcının, detay şablonu, coğrafya ve senaryoya dayalı olarak, aşağıda tanımlanan yeni denklemlerle mevcut projelere eklenmiş olan varlıkların maliyet denklemlerini güncellemesine olanak tanır. Birleşim bulunamazsa, varsayılan maliyet denklemine ayarlanır, yani coğrafya ve senaryo ‘Hiçbiri’ olarak ayarlanır. Detay şablonunun çıkarılması durumunda, maliyet 0 olarak ayarlanır."
  },
  "statisticsSettings": {
    "tabTitle": "Ek ayarlar",
    "addStatisticsLabel": "İstatistik Ekle",
    "fieldNameTitle": "Alan",
    "statisticsTitle": "Etiket",
    "addNewStatisticsText": "Yeni İstatistik Ekle",
    "deleteStatisticsText": "İstatistik Sil",
    "moveStatisticsUpText": "İstatistikleri Yukarı Taşı",
    "moveStatisticsDownText": "İstatistikleri Aşağı Taşı",
    "selectDeselectAllTitle": "Tümünü Seç"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Ek Proje Maliyeti Ekle",
    "additionalCostValueColumnHeader": "Değer",
    "invalidProjectCostMessage": "Proje maliyeti için Geçersiz Giriş",
    "additionalCostLabelColumnHeader": "Etiket",
    "additionalCostTypeColumnHeader": "Tür"
  },
  "statisticsType": {
    "countLabel": "Sayım",
    "averageLabel": "Ortalama",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Toplam",
    "areaLabel": "Alan",
    "lengthLabel": "Uzunluk"
  }
});