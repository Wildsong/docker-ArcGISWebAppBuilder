﻿///////////////////////////////////////////////////////////////////////////
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
  "configText": "تعيين نص التكوين:",
  "generalSettings": {
    "tabTitle": "الإعدادات العامة",
    "measurementUnitLabel": "وحدة التكلفة",
    "currencyLabel": "رمز التكلفة",
    "roundCostLabel": "التكلفة المقربة",
    "projectOutputSettings": "إعدادات ناتج المشروع",
    "typeOfProjectAreaLabel": "نوع منطقة المشروع",
    "bufferDistanceLabel": "مسافة النطاق",
    "csvReportExportLabel": "السماح للمستخدم لتصدير تقرير المشروع",
    "editReportSettingsBtnTooltip": "تحرير إعدادات التقرير",
    "roundCostValues": {
      "twoDecimalPoint": "نقطتان عشريتان",
      "nearestWholeNumber": "أقرب رقم كلي",
      "nearestTen": "أقرب عشرة",
      "nearestHundred": "أقرب مئة",
      "nearestThousand": "أقرب آلاف",
      "nearestTenThousands": "أقرب عشرات آلاف"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "إعدادات التقرير",
      "reportNameLabel": "اسم التقرير (اختياري):",
      "checkboxLabel": "عرض",
      "layerTitle": "العنوان",
      "columnLabel": "التسمية",
      "duplicateMsg": "تكرار التسمية"
    },
    "projectAreaType": {
      "outline": "الحدود",
      "buffer": "نطاق"
    },
    "errorMessages": {
      "currency": "وحدة العملة غير صحيحة",
      "bufferDistance": "مسافة النطاق المؤقت غير صحيحة",
      "outOfRangebufferDistance": "يجب أن تكون القيمة أكبر من 0 وأقل من أو تساوي 100"
    }
  },
  "projectSettings": {
    "tabTitle": "إعدادات المشروع",
    "costingGeometrySectionTitle": "تعريف جغرافيا التكلفة (اختياري)",
    "costingGeometrySectionNote": "ملاحظة: عند تكوين هذه الطبقة، يمكن للمستخدم تعيين معادلات تكلفة قوالب المعالم بناءً على الجغرافيا.",
    "projectTableSectionTitle": "إمكانية حفظ/تحميل إعدادات المشروع (اختياري)",
    "projectTableSectionNote": "ملاحظة: عند تكوين كل الجداول والطبقات، يمكن للمستخدم حفظ/تحميل المشروع لاستخدامه لاحقًا.",
    "costingGeometryLayerLabel": "طبقة الشكل الهندسي للتكلفة",
    "fieldLabelGeography": "حقل تسمية الجغرافيا",
    "projectAssetsTableLabel": "جدول أصول المشروع",
    "projectMultiplierTableLabel": "جدول التكلفة الإضافية لمضاعف المشروع",
    "projectLayerLabel": "طبقة المشروع",
    "configureFieldsLabel": "تكوين الحقول",
    "fieldDescriptionHeaderTitle": "وصف الحقل",
    "layerFieldsHeaderTitle": "حقل الطبقة",
    "selectLabel": "تحديد",
    "errorMessages": {
      "duplicateLayerSelection": "تم تحديد ${layerName} بالفعل",
      "invalidConfiguration": "يرجى تحديد ${fieldsString}"
    },
    "costingGeometryHelp": "<p>ستظهر طبقة (طبقات) المضلع التي تضم الشروط التالية: <br/> <li> يجب أن تتمتع الطبقة بإمكانية 'الاستعلام'</li><li> يجب أنت تحتوي الطبقة على حقل GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>سيتم عرض السلسلة والحقول الرقمية 'لطبقة الشكل الهندسي للتكلفة' المحددة في قائمة 'حقل إلى جغرافيا التسمية' المنسدلة.</p>",
    "projectAssetsTableHelp": "<p>سيظهر الجدول (الجداول) الذي يضم الشروط التالية: <br/> <li>يجب أن يتمتع الجدول بإمكانات التحرير وهي 'إنشاء' و'حذف' و'تحديث'</li> <li>يجب أن يحتوي الجدول على ستة حقول باسم ونوع بيانات محددين:</li><ul><li> AssetGUID (حقل نوع GUID)</li><li> CostEquation (حقل نوع السلسلة)</li><li> السيناريو (حقل نوع السلسلة)</li><li> TemplateName (حقل نوع السلسلة)</li><li> GeographyGUID (حقل نوع GUID)</li><li> ProjectGUID (حقل نوع GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>سيظهر الجدول (الجداول) الذي يضم الشروط التالية: <br/> <li>يجب أن يتمتع الجدول بإمكانات التحرير وهي 'إنشاء' و'حذف' و'تحديث'</li> <li>يجب أن يحتوي الجدول على خمسة حقول باسم ونوع بيانات محددين:</li><ul><li> Description (حقل نوع السلسلة)</li><li> Type (حقل نوع السلسلة)</li><li> Value (حقل نوع عائم/مزدوج)</li><li> Costindex (حقل نوع عدد صحيح)</li><li> ProjectGUID (حقل نوع GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>ستظهر طبقة (طبقات) المضلع التي تضم الشروط التالية: <br/> <li>يجب أن تتمتع الطبقة بإمكانات التحرير وهي 'إنشاء' و'حذف' و'تحديث'</li> <li>يجب أن تحتوي الطبقة على خمسة حقول باسم ونوع بيانات محددين:</li><ul><li>ProjectName (حقل نوع السلسلة)</li><li>Description (حقل نوع السلسلة)</li><li>Totalassetcost (حقل نوع عائم/مزدوج)</li><li>Grossprojectcost (حقل نوع عائم/مزدوج)</li><li>GlobalID (حقل نوع المعرف الفريد العالمي)</li></ul> </p>",
    "pointLayerCentroidLabel": "طبقة نقطة في الوسط",
    "selectRelatedPointLayerDefaultOption": "تحديد",
    "pointLayerHintText": "<p>ستظهر طبقات النقطة ذات الحالات التالية: <br/> <li>يجب أن يكون للطبقة حقل \"معرف مشروع\" (من نوع الدليل)</li><li>يجب أن يكون للطبقة قدرات تحريرية أي \"الإنشاء\" و\"الحذف\" و\"التحديث\"</li></p>"
  },
  "layerSettings": {
    "tabTitle": "إعدادات الطبقة",
    "layerNameHeaderTitle": "اسم الطبقة",
    "layerNameHeaderTooltip": "قائمة الطبقات في الخريطة",
    "EditableLayerHeaderTitle": "قابل للتحرير",
    "EditableLayerHeaderTooltip": "تضمين الطبقة وقوالبها في عنصر واجهة مستخدم التكلفة",
    "SelectableLayerHeaderTitle": "قابل للتحديد",
    "SelectableLayerHeaderTooltip": "يمكن استخدام شكل هندسي من معلم لإنشاء عنصر تكلفة جديد",
    "fieldPickerHeaderTitle": "معرف المشروع (اختياري)",
    "fieldPickerHeaderTooltip": "حقل اختياري (لسلسلة النوع) لتخزين معرف المشروع في",
    "selectLabel": "تحديد",
    "noAssetLayersAvailable": "لم يتم العثور على طبقة أصل في خريطة الويب المحددة",
    "disableEditableCheckboxTooltip": "لا تحتوي هذه الطبقة على إمكانات التحرير",
    "missingCapabilitiesMsg": "تفتقد هذه الطبقة إلى الإمكانات التالية:",
    "missingGlobalIdMsg": "لا تحتوي هذه الطبقة على حقل GlobalId",
    "create": "إنشاء",
    "update": "تحديث",
    "deleteColumnLabel": "حذف",
    "attributeSettingHeaderTitle": "إعدادات السمة",
    "addFieldLabelTitle": "إضافة السمات",
    "layerAttributesHeaderTitle": "سمات الطبقة",
    "projectLayerAttributesHeaderTitle": "سمات طبقة المشروع",
    "attributeSettingsPopupTitle": "إعدادات سمة الطبقة"
  },
  "costingInfo": {
    "tabTitle": "معلومات التكلفة",
    "proposedMainsLabel": "الأساسي المقترح",
    "addCostingTemplateLabel": "إضافة قالب تكلفة",
    "manageScenariosTitle": "إدارة السيناريوهات",
    "featureTemplateTitle": "قالب المعلم",
    "costEquationTitle": "معادلة التكلفة",
    "geographyTitle": "الجغرافيا",
    "scenarioTitle": "سيناريو",
    "actionTitle": "إجراءات",
    "scenarioNameLabel": "اسم السيناريو",
    "addBtnLabel": "إضافة",
    "srNoLabel": "العدد",
    "deleteLabel": "حذف",
    "duplicateScenarioName": "تكرار اسم السيناريو",
    "hintText": "<div>تلميح: استخدم الكلمات الأساسية التالية </div><ul><li><b>{TOTALCOUNT}</b>: يستخدم إجمالي عدد نفس أصل النوع في الجغرافيا</li><li><b>{MEASURE}</b>: يستخدم طول أصل ومنطقة الخط لأصل المضلع</li><li><b>{TOTALMEASURE}</b>: يستخدم إجمالي طول أصل الخط وإجمالي منطقة أصل المضلع لنفس النوع في الجغرافيا</li></ul> يمكنك استخدام دوال مثل:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>يرجى تحرير معادلة التكلفة بحسب احتياج المشروع.",
    "noneValue": "لا شيء",
    "requiredCostEquation": "معادلة تكلفة ${layerName} غير صحيحة: ${templateName}",
    "duplicateTemplateMessage": "يوجد إدخال قالب مكرر لـ ${layerName} : ${templateName}",
    "defaultEquationRequired": "مطلوب معادلة افتراضية لـ ${layerName} : ${templateName}",
    "validCostEquationMessage": "يرجى إدخال معادلة تكلفة صحيحة",
    "costEquationHelpText": "يرجى تحرير معادلة تكلفة بحسب احتياجات المشروع",
    "scenarioHelpText": "يرجى تحديد السيناريو بحسب احتياجات المشروع",
    "copyRowTitle": "نسخ الصفوف",
    "noTemplateAvailable": "يرجى إضافة قالب واحد على الأقل لـ ${layerName}",
    "manageScenarioLabel": "إدارة السيناريو",
    "noLayerMessage": "يرجى إدخال طبقة واحدة على الأقل في ${tabName}",
    "noEditableLayersAvailable": "يجب التأشير على الطبقات كطبقات قابلة للتحرير في علامة تبويب إعدادات الطبقة",
    "updateProjectCostCheckboxLabel": "تحديث معدلات المشروع",
    "updateProjectCostEquationHint": "تلميح: سيتيح هذا للمستخدم تحديث معدلات تكلفة الأصول المضافة بالفعل في المشاريع الحالية بالمعدلات الجديدة المحددة أدناه استنادًا إلى قالب المَعلَم والجغرافيا والسيناريو. إذا لم يتم العثور على المجموعة، فسيتم تعيينها على معدل التكلفة الافتراضي، أي الجغرافيا والسيناريو على أنها \"لا يوجد\". في حالة قالب المعالم الذي تمت إزالته، سيتم تعيين التكلفة على أنها (0)."
  },
  "statisticsSettings": {
    "tabTitle": "إعدادات إضافية",
    "addStatisticsLabel": "إضافة الإحصائيات",
    "fieldNameTitle": "حقل",
    "statisticsTitle": "التسمية",
    "addNewStatisticsText": "إضافة إحصائيات جديدة",
    "deleteStatisticsText": "حذف الإحصائيات",
    "moveStatisticsUpText": "نقل الإحصائيات إلى الأعلى",
    "moveStatisticsDownText": "نقل الإحصائيات إلى الأسفل",
    "selectDeselectAllTitle": "تحديد الكل"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "إضافة تكلفة مشروع إضافية",
    "additionalCostValueColumnHeader": "قيمة",
    "invalidProjectCostMessage": "إدخال غير صالح لتكلفة المشروع",
    "additionalCostLabelColumnHeader": "التسمية",
    "additionalCostTypeColumnHeader": "النوع"
  },
  "statisticsType": {
    "countLabel": "العدد",
    "averageLabel": "المتوسط",
    "maxLabel": "الحد الأقصى",
    "minLabel": "الحد الأدنى",
    "summationLabel": "الجمع",
    "areaLabel": "المنطقة",
    "lengthLabel": "الطول"
  }
});