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
  "configText": "ตั้งค่าข้อความ config:",
  "generalSettings": {
    "tabTitle": "การคั้งค่าทั่วไป",
    "measurementUnitLabel": "หน่วยต้นทุน",
    "currencyLabel": "สัญลักษณ์ต้นทุน",
    "roundCostLabel": "ปัดเศษต้นทุน",
    "projectOutputSettings": "การตั้งค่าผลลัพธ์ของโครงการ",
    "typeOfProjectAreaLabel": "ประเภทพื้นที่ของโครงการ",
    "bufferDistanceLabel": "ระยะทางขยายออกไป",
    "csvReportExportLabel": "อนุญาตให้ผู้ใช้ส่งออกรายงานของโปรเจค",
    "editReportSettingsBtnTooltip": "แก้ไขการตั้งค่ารายงาน",
    "roundCostValues": {
      "twoDecimalPoint": "จุดทศนิยมสองจุด",
      "nearestWholeNumber": "จำนวนเต็มที่ใกล้เคียงที่สุด",
      "nearestTen": "ใกล้เคียงหลักสิบที่สุด",
      "nearestHundred": "ใกล้เคียงหลักร้อยที่สุด",
      "nearestThousand": "ใกล้เคียงหลักพันที่สุด",
      "nearestTenThousands": "ใกล้เคียงหลักหมื่นที่สุด"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "การตั้งค่ารายงาน",
      "reportNameLabel": "ชื่อรายงาน (ตัวเลือก):",
      "checkboxLabel": "แสดง",
      "layerTitle": "ชื่อ",
      "columnLabel": "ป้ายชื่อ",
      "duplicateMsg": "ทำซ้ำป้ายกำกับ"
    },
    "projectAreaType": {
      "outline": "โครงร่าง",
      "buffer": "ระยะบัฟเฟอร์"
    },
    "errorMessages": {
      "currency": "หน่วยสกุลเงินไม่ถูกต้อง",
      "bufferDistance": "ระยะห่างบัฟเฟอร์ไม่ถูกต้อง",
      "outOfRangebufferDistance": "ค่าควรมากกว่า 0 และน้อยกว่าหรือเท่ากับ 100"
    }
  },
  "projectSettings": {
    "tabTitle": "การตั้งค่าโครงการ",
    "costingGeometrySectionTitle": "กำหนดภูมิศาสตร์สำหรับการคิดต้นทุน (ไม่บังคับ)",
    "costingGeometrySectionNote": "หมายเหตุ: การกำหนดค่าชั้นข้อมูลนี้จะทำให้ผู้ใช้สามารถกำหนดสมการต้นทุนของเทมเพลตฟีเจอร์ตามภูมิศาสตร์ได้",
    "projectTableSectionTitle": "ความสามารถในการบันทึก/โหลดการตั้งค่าโครงการ (ไม่บังคับ)",
    "projectTableSectionNote": "หมายเหตุ: การกำหนดค่าตารางและชั้นข้อมูลทั้งหมดจะช่วยให้ผู้ใช้สามารถบันทึก/โหลดโครงการเพื่อใช้ในภายหลังได้",
    "costingGeometryLayerLabel": "ชั้นข้อมูลเรขาคณิตของต้นทุน",
    "fieldLabelGeography": "ฟิลด์ภูมิศาสตร์ป้าย",
    "projectAssetsTableLabel": "ตารางสินทรัพย์ของโครงการ",
    "projectMultiplierTableLabel": "ตารางต้นทุนเพิ่มเติมสำหรับตัวคูณโครงการ",
    "projectLayerLabel": "ชั้นข้อมูลของของโครงการ",
    "configureFieldsLabel": "กำหนดค่าฟิลด์",
    "fieldDescriptionHeaderTitle": "คำอธิบายฟิลด์",
    "layerFieldsHeaderTitle": "ฟิลด์ชั้นข้อมูล",
    "selectLabel": "เลือก",
    "errorMessages": {
      "duplicateLayerSelection": "มีการเลือก ${layerName} แล้ว",
      "invalidConfiguration": "โปรดเลือก ${fieldsString}"
    },
    "costingGeometryHelp": "<p>ชั้นข้อมูลโพลีกอนที่ตรงตามเงื่อนไขต่อไปนี้จะปรากฏขึ้น: <br/> <li> ชั้นข้อมูลต้องมีความสามารถ 'Query'</li><li> ชั้นข้อมูลต้องมีฟิลด์ GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>ฟิลด์ตัวอักษรและตัวเลขของ 'Costing Geometry Layer' ที่เลือก จะปรากฏขึ้นในดรอปดาวน์ 'Field to Label Geography'</p>",
    "projectAssetsTableHelp": "<p>ตารางที่ตรงตามเงื่อนไขต่อไปนี้จะปรากฏขึ้น: <br/> <li>ตารางต้องมีความสามารถในการแก้ไขที่ชื่อ 'Create', 'Delete' และ 'Update'</li> <li>ตารางต้องมีหกฟิลด์ที่ชื่อและประเภทข้อมูลตรงตามนี้:</li><ul><li> AssetGUID (ฟิลด์ประเภท GUID)</li><li> CostEquation (ฟิลด์ประเภทสตริง)</li><li> Scenario (ฟิลด์ประเภทสตริง)</li><li> TemplateName (ฟิลด์ประเภทสตริง)</li><li> GeographyGUID (ฟิลด์ประเภท GUID)</li><li> ProjectGUID (ฟิลด์ประเภท GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>ตารางที่ตรงตามเงื่อนไขต่อไปนี้จะปรากฏขึ้น: <br/> <li>ตารางต้องมีความสามารถในการแก้ไขที่ชื่อ 'Create', 'Delete' และ 'Update'</li> <li>ตารางต้องมีห้าฟิลด์ที่ชื่อและประเภทข้อมูลตรงตามนี้:</li><ul><li> Description (ฟิลด์ประเภทสตริง)</li><li> Type (ฟิลด์ประเภทสตริง)</li><li> Value (ฟิลด์ประเภทโฟลท/ดับเบิล)</li><li> Costindex (ฟิลด์ประเภทจำนวนเต็ม)</li><li> ProjectGUID (ฟิลด์ประเภท GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>ชั้นข้อมูลโพลีกอนที่ตรงตามเงื่อนไขต่อไปนี้จะปรากฏขึ้น: <br/> <li>ชั้นข้อมูลต้องมีความสามารถในการแก้ไขที่ชื่อ 'Create', 'Delete' และ 'Update'</li> <li>ชั้นข้อมูลต้องมีห้าฟิลด์ที่ชื่อและประเภทข้อมูลตรงตามเงื่อนไขต่อไปนี้:</li><ul><li>ProjectName (String type field)</li><li>Description (ฟิลด์ประเภทสตริง)</li><li>Totalassetcost (ฟิลด์ประเภทโฟลท/ดับเบิล)</li><li>Grossprojectcost (ฟิลด์ประเภทโฟลท/ดับเบิล)</li><li>GlobalID (ฟิลด์ประเภท GlobalID)</li></ul> </p>",
    "pointLayerCentroidLabel": "ศูนย์กลางชั้นข้อมูลจุด",
    "selectRelatedPointLayerDefaultOption": "เลือก",
    "pointLayerHintText": "<p>ระบบจะแสดงชั้นข้อมูลจุดที่ตรงตามเงื่อนไขต่อไปนี้: <br/> <li>\tชั้นข้อมูลต้องมีฟิลด์ 'Projectid' (ประเภท GUID)</li><li>\tชั้นข้อมูลต้องมีความสามารถในการแก้ไขที่ชื่อ 'Create', 'Delete' และ 'Update'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "การตั้งค่าเลเยอร์",
    "layerNameHeaderTitle": "ชื่อชั้นข้อมูล",
    "layerNameHeaderTooltip": "รายการชั้นข้อมูลในแผนที่",
    "EditableLayerHeaderTitle": "ที่สามารถแก้ไขได้",
    "EditableLayerHeaderTooltip": "รวมชั้นข้อมูลและเทมเพลตในวิดเจ็ตการคิดต้นทุน",
    "SelectableLayerHeaderTitle": "ที่สามารถเลือกได้",
    "SelectableLayerHeaderTooltip": "สามารถใช้เรขาคณิตจากฟีเจอร์ในการสร้างรายการต้นทุนใหม่ได้",
    "fieldPickerHeaderTitle": "รหัสโครงการ (ไม่บังคับ)",
    "fieldPickerHeaderTooltip": "ฟิลด์ที่ไม่บังคับต้องระบุ (ของประเภทสตริง) เพื่อจัดเก็บรหัสโครงการใน",
    "selectLabel": "เลือก",
    "noAssetLayersAvailable": "ไม่พบชั้นข้อมูลสินทรัพย์ในเว็บแมพที่เลือก",
    "disableEditableCheckboxTooltip": "ชั้นข้อมูลนี้ไม่มีความสามารถในการแก้ไข",
    "missingCapabilitiesMsg": "ชั้นข้อมูลนี้ขาดความสามารถต่อไปนี้:",
    "missingGlobalIdMsg": "ชั้นข้อมูลนี้ไม่มีฟิลด์ GlobalId",
    "create": "สร้าง",
    "update": "อัพเดท",
    "deleteColumnLabel": "ลบ",
    "attributeSettingHeaderTitle": "การตั้งค่าแอตทริบิวต์",
    "addFieldLabelTitle": "เพิ่มแอตทริบิวต์",
    "layerAttributesHeaderTitle": "แอตทริบิวต์ชั้นข้อมูล",
    "projectLayerAttributesHeaderTitle": "แอตทริบิวต์ชั้นข้อมูลโปรเจค",
    "attributeSettingsPopupTitle": "การตั้งค่าแอตทริบิวต์ชั้นข้อมูล"
  },
  "costingInfo": {
    "tabTitle": "ข้อมูลต้นทุน",
    "proposedMainsLabel": "ข้อมูลหลักที่เสนอ",
    "addCostingTemplateLabel": "เพิ่มเทมเพลตต้นทุน",
    "manageScenariosTitle": "จัดการสถานการณ์",
    "featureTemplateTitle": "เทมเพลตฟีเจอร์",
    "costEquationTitle": "สมการต้นทุน",
    "geographyTitle": "ภูมิศาสตร์",
    "scenarioTitle": "สถานการณ์",
    "actionTitle": "การดำเนินการ",
    "scenarioNameLabel": "ชื่อสถานการณ์",
    "addBtnLabel": "เพิ่ม",
    "srNoLabel": "ลำดับที่",
    "deleteLabel": "ลบ",
    "duplicateScenarioName": "ชื่อสถานการณ์ซ้ำกัน",
    "hintText": "<div>คำแนะนำ: ใช้คำหลักต่อไปนี้</div><ul><li><b>{TOTALCOUNT}</b>: ใช้จำนวนรวมของสินทรัพย์ประเภทเดียวกันในภูมิศาสตร์</li> <li><b>{MEASURE}</b>: ใช้ความยาวสำหรับสินทรัพย์ของสายงานและพื้นที่สำหรับสินทรัพย์ของพื้นที่</li><li><b>{TOTALMEASURE}</b>: ใช้ความยาวรวมสำหรับสินทรัพย์ของสายงานและพื้นที่รวมสำหรับสินทรัพย์ของพื้นที่ของประเภทเดียวกันในภูมิศาสตร์</li></ul> คุณสามารถใช้ฟังก์ชัน เช่น:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>โปรดแก้ไขสมการต้นทุนตามความต้องการของโครงการของคุณ",
    "noneValue": "ไม่มีเลย",
    "requiredCostEquation": "สมการต้นทุนไม่ถูกต้องสำหรับ ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "มีรายการเทมเพลตที่ซ้ำกันสำหรับ ${layerName} : ${templateName}",
    "defaultEquationRequired": "จำเป็นต้องใช้สมการเริ่มต้นสำหรับ ${layerName} : ${templateName}",
    "validCostEquationMessage": "โปรดป้อนสมการต้นทุนที่ถูกต้อง",
    "costEquationHelpText": "โปรดแก้ไขสมการต้นทุนตามความต้องการของโครงการของคุณ",
    "scenarioHelpText": "โปรดเลือกสถานการณ์ตามความต้องการของโครงการของคุณ",
    "copyRowTitle": "คัดลอกแถว",
    "noTemplateAvailable": "โปรดเพิ่มอย่างน้อยหนึ่งเทมเพลตสำหรับ ${layerName}",
    "manageScenarioLabel": "จัดการสถานการณ์",
    "noLayerMessage": "โปรดป้อนอย่างน้อยหนึ่งชั้นข้อมูลใน ${tabName}",
    "noEditableLayersAvailable": "ต้องทำเครื่องหมายชั้นข้อมูลเป็นแก้ไขได้ในแท็บการตั้งค่าชั้นข้อมูล",
    "updateProjectCostCheckboxLabel": "อัปเดตสมการโปรเจค",
    "updateProjectCostEquationHint": "เคล็ดลับ: ส่วนนี้จะช่วยให้ผู้ใช้สามารถอัปเดตสมการต้นทุนของแอสเซ็ทที่ถูกเพิ่มไว้ในโปรเจคที่มีอยู่อยู่แล้ว ด้วยสมการใหม่ที่กำหนดไว้ด้านล่าง โดยอิงตามเทมเพลตฟีเจอร์ ภูมิศาสตร์ และสถานการณ์ได้ หากไม่พบรายการดังกล่าว ระบบจะตั้งค่าเป็นสมการต้นทุนเริ่มต้น เช่น ภูมิศาสตร์และสถานการณ์จะเป็น 'ไม่มี' ในกรณีที่เทมเพลตฟีเจอร์ถูกลบออก ต้นทุนจะถูกตั้งค่าเป็น 0"
  },
  "statisticsSettings": {
    "tabTitle": "การตั้งค่าเพิ่มเติม",
    "addStatisticsLabel": "เพิ่มข้อมูลสถิติ",
    "fieldNameTitle": "ฟิลด์",
    "statisticsTitle": "ป้ายชื่อ",
    "addNewStatisticsText": "เพิ่มข้อมูลสถิติใหม่",
    "deleteStatisticsText": "ลบข้อมูลสถิติ",
    "moveStatisticsUpText": "ย้ายข้อมูลสถิติขึ้น",
    "moveStatisticsDownText": "ย้ายข้อมูลสถิติลง",
    "selectDeselectAllTitle": "เลือกทั้งหมด"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "เพิ่มต้นทุนโปรเจคเพิ่มเติม",
    "additionalCostValueColumnHeader": "ค่า",
    "invalidProjectCostMessage": "รายการไม่ถูกต้องสำหรับต้นทุนโปรเจค",
    "additionalCostLabelColumnHeader": "ป้ายชื่อ",
    "additionalCostTypeColumnHeader": "ชนิด"
  },
  "statisticsType": {
    "countLabel": "นับ",
    "averageLabel": "เฉลี่ย",
    "maxLabel": "สูงสุด",
    "minLabel": "น้อยสุด",
    "summationLabel": "ผลรวม",
    "areaLabel": "พื้นที่",
    "lengthLabel": "ความยาว"
  }
});