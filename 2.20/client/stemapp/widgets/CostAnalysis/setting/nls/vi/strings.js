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
  "configText": "Đặt văn bản cấu hình:",
  "generalSettings": {
    "tabTitle": "Thiết lập tổng quan",
    "measurementUnitLabel": "Đơn vị Chi phí",
    "currencyLabel": "Biểu tượng Chi phí",
    "roundCostLabel": "Làm tròn Chi phí",
    "projectOutputSettings": "Thiết lập Đầu ra Dự án",
    "typeOfProjectAreaLabel": "Loại Khu vực Dự án",
    "bufferDistanceLabel": "Khoảng cách Vùng đệm",
    "csvReportExportLabel": "Cho phép người dùng xuất báo cáo của dự án",
    "editReportSettingsBtnTooltip": "Chỉnh sửa thiết lập báo cáo",
    "roundCostValues": {
      "twoDecimalPoint": "Hai số ở Phần thập phân",
      "nearestWholeNumber": "Số Nguyên Gần nhất",
      "nearestTen": "Bội số Gần nhất của 10",
      "nearestHundred": "Bội số Gần nhất của 100",
      "nearestThousand": "Bội số Gần nhất của 1000",
      "nearestTenThousands": "Bội số Gần nhất của 10000"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Thiết lập báo cáo",
      "reportNameLabel": "Tên báo cáo (tùy chọn):",
      "checkboxLabel": "Hiển thị",
      "layerTitle": "Tiêu đề",
      "columnLabel": "Nhãn",
      "duplicateMsg": "Nhãn trùng lặp"
    },
    "projectAreaType": {
      "outline": "Viền",
      "buffer": "Vùng đệm"
    },
    "errorMessages": {
      "currency": "Đơn vị tiền tệ không hợp lệ",
      "bufferDistance": "Khoảng cách vùng đệm không hợp lệ",
      "outOfRangebufferDistance": "Giá trị phải lớn hơn 0 và nhỏ hơn hoặc bằng 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Thiết lập dự án",
    "costingGeometrySectionTitle": "Xác định vùng địa lý để dự toán (tùy chọn)",
    "costingGeometrySectionNote": "Lưu ý: Cấu hình lớp này sẽ cho phép người dùng đặt phương trình chi phí cho các mẫu đối tượng dựa trên vùng địa lý.",
    "projectTableSectionTitle": "Khả năng Lưu/Tải thiết lập dự án (tùy chọn)",
    "projectTableSectionNote": "Lưu ý: Cấu hình tất cả các bảng và lớp sẽ cho phép người dùng lưu/tải dự án để dùng sau.",
    "costingGeometryLayerLabel": "Lớp Hình học Dự toán",
    "fieldLabelGeography": "Trường sẽ Gắn nhãn Vùng địa lý",
    "projectAssetsTableLabel": "Bảng Tài sản Dự án",
    "projectMultiplierTableLabel": "Bảng Chi phí Bổ sung theo Bội số Dự án",
    "projectLayerLabel": "Lớp Dự án",
    "configureFieldsLabel": "Cấu hình Trường",
    "fieldDescriptionHeaderTitle": "Mô tả Trường",
    "layerFieldsHeaderTitle": "Trường Lớp",
    "selectLabel": "Chọn",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} đã được chọn",
      "invalidConfiguration": "Vui lòng chọn ${fieldsString}"
    },
    "costingGeometryHelp": "<p>(Các) lớp dạng vùng với những điều kiện sau sẽ được hiển thị: <br/> <li> Lớp phải có khả năng 'Truy vấn'</li> <li> Lớp phải có một trường GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Các trường chuỗi và số của 'Lớp Hình học Dự toán' đã chọn sẽ được hiển thị trong hộp thả xuống 'Trường sẽ Gắn nhãn Vùng địa lý'.</p>",
    "projectAssetsTableHelp": "<p>(Các) bảng có các điều kiện sau đây sẽ được hiển thị: <br/> <li>Bảng phải có các chức năng chỉnh sửa, tức là 'Tạo', 'Xóa' và 'Cập nhật'</li> <li>Bảng phải chứa sáu trường có đúng tên và loại dữ liệu như sau:</li><ul><li> AssetGUID (Trường loại GUID)</li><li> CostEquation (Trường loại chuỗi)</li><li> Scenario (Trường loại chuỗi)</li><li> TemplateName (Trường loại chuỗi)</li><li> GeographyGUID (Trường loại GUID)</li><li> ProjectGUID (Trường loại GUID)</li></ul></p>",
    "projectMultiplierTableHelp": "<p>(Các) bảng có các điều kiện sau đây sẽ được hiển thị: <br/><li>Bảng phải có các chức năng chỉnh sửa, tức là 'Tạo', 'Xóa' và 'Cập nhật'</li> <li>Bảng phải chứa năm trường có đúng tên và loại dữ liệu như sau:</li><ul><li> Description (Trường loại chuỗi)</li><li> Type (Trường loại chuỗi)</li><li> Value (Trường loại số thập phân ngắn/dài)</li><li> Costindex (Trường loại số nguyên)</li><li> ProjectGUID (Trường loại GUID))</li></ul> </p>",
    "projectLayerHelp": "<p>(Các) lớp dạng vùng có các điều kiện sau đây sẽ được hiển thị: <br/> <li>Lớp phải có các chức năng chỉnh sửa, tức là 'Tạo', 'Xóa' và 'Cập nhật'</li> <li>Lớp phải chứa năm trường có đúng tên và loại dữ liệu như sau:</li><ul><li>ProjectName (Trường loại chuỗi)</li><li>Description (Trường loại chuỗi)</li><li>Totalassetcost (Trường loại số thập phân ngắn/dài) </li><li>Grossprojectcost (Trường loại số thập phân ngắn/dài)</li><li>GlobalID (Trường loại GlobalID)</li></ul></p>",
    "pointLayerCentroidLabel": "Trọng tâm Lớp Điểm",
    "selectRelatedPointLayerDefaultOption": "Chọn",
    "pointLayerHintText": "<p>(Các) lớp điểm có các điều kiện như sau sẽ được hiển thị: <br/> <li>\tLớp phải có trường 'Projectid' (Loại GUID)</li><li>\tLớp phải có các khả năng chỉnh sửa, tức là 'Tạo', 'Xóa' và 'Cập nhật'</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Thiết lập lớp",
    "layerNameHeaderTitle": "Tên lớp",
    "layerNameHeaderTooltip": "Danh sách các lớp trong bản đồ",
    "EditableLayerHeaderTitle": "Có thể chỉnh sửa",
    "EditableLayerHeaderTooltip": "Tính cả lớp và mẫu tương ứng trong tiện ích dự toán",
    "SelectableLayerHeaderTitle": "Có thể chọn",
    "SelectableLayerHeaderTooltip": "Có thể sử dụng hình học từ đối tượng để tạo mục chi phí mới",
    "fieldPickerHeaderTitle": "ID Dự án (tùy chọn)",
    "fieldPickerHeaderTooltip": "Trường tùy chọn (thuộc loại chuỗi) để lưu ID Dự án trong",
    "selectLabel": "Chọn",
    "noAssetLayersAvailable": "Không tìm thấy lớp tài sản nào cho bản đồ web đã chọn",
    "disableEditableCheckboxTooltip": "Lớp này không có các chức năng chỉnh sửa",
    "missingCapabilitiesMsg": "Lớp này thiếu những tính năng sau:",
    "missingGlobalIdMsg": "Lớp này không có trường GlobalId",
    "create": "Tạo",
    "update": "Cập nhật",
    "deleteColumnLabel": "Xóa",
    "attributeSettingHeaderTitle": "Cài đặt Thuộc tính",
    "addFieldLabelTitle": "Thêm Thuộc tính",
    "layerAttributesHeaderTitle": "Thuộc tính Lớp",
    "projectLayerAttributesHeaderTitle": "Thuộc tính Lớp Dự án",
    "attributeSettingsPopupTitle": "Cài đặt Thuộc tính Lớp"
  },
  "costingInfo": {
    "tabTitle": "Thông tin Dự toán",
    "proposedMainsLabel": "Yếu tố chính được Đề xuất",
    "addCostingTemplateLabel": "Thêm Mẫu Dự toán",
    "manageScenariosTitle": "Quản lý Kịch bản",
    "featureTemplateTitle": "Mẫu Đối tượng",
    "costEquationTitle": "Phương trình Chi phí",
    "geographyTitle": "Địa lý",
    "scenarioTitle": "Kịch bản",
    "actionTitle": "Các hành động",
    "scenarioNameLabel": "Tên Kịch bản",
    "addBtnLabel": "Thêm",
    "srNoLabel": "Không",
    "deleteLabel": "Xóa",
    "duplicateScenarioName": "Tên kịch bản trùng",
    "hintText": "<div>Gợi ý: Sử dụng các từ khóa sau</div><ul><li><b>{TOTALCOUNT}</b>: Sử dụng tổng số lượng tài sản cùng loại trong một vùng địa lý</li> <li><b>{MEASURE}</b>: Sử dụng chiều dài cho tài sản đường thẳng và diện tích cho tài sản đa giác</li><li><b>{TOTALMEASURE}</b>: Sử dụng tổng chiều dài cho tài sản đường thẳng và tổng diện tích cho tài sản đa giác cùng loại trong một vùng địa lý</li></ul>Bạn có thể sử dụng các hàm như:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Vui lòng chỉnh sửa phương trình chi phí theo nhu cầu trong dự án của bạn.",
    "noneValue": "Không có",
    "requiredCostEquation": "Phương trình chi phí không hợp lệ cho ${layerName}: ${templateName}",
    "duplicateTemplateMessage": "Tồn tại mục nhập mẫu trùng cho ${layerName}: ${templateName}",
    "defaultEquationRequired": "Yêu cầu có phương trình mặc định cho ${layerName}: ${templateName}",
    "validCostEquationMessage": "Vui lòng nhập phương trình chi phí hợp lệ",
    "costEquationHelpText": "Vui lòng chỉnh sửa phương trình chi phí theo nhu cầu trong dự án của bạn",
    "scenarioHelpText": "Vui lòng chọn kịch bản theo nhu cầu trong dự án của bạn",
    "copyRowTitle": "Sao chép Hàng",
    "noTemplateAvailable": "Vui lòng thêm ít nhất một mẫu cho ${layerName}",
    "manageScenarioLabel": "Quản lý kịch bản",
    "noLayerMessage": "Vui lòng nhập ít nhất một lớp trong ${tabName}",
    "noEditableLayersAvailable": "Lớp cần được đánh dấu là có thể chỉnh sửa trong tab thiết lập lớp",
    "updateProjectCostCheckboxLabel": "Cập nhật các phương trình của dự án",
    "updateProjectCostEquationHint": "Gợi ý: Điều này cho phép người dùng cập nhật các phương trình chi phí của tài sản đã được thêm vào các dự án hiện tại bằng phương trình mới được xác định dưới đây dựa trên biểu mẫu đối tượng, thông tin địa lý và kịch bản. Nếu không tìm thấy tổ hợp đó, hệ thống sẽ thiết lập thành phương trình chi phí mặc định, tức là thông tin địa lý và kịch bản là 'Không có'. Trong trường hợp biểu mẫu đối tượng bị xóa, chi phí sẽ được đặt thành 0."
  },
  "statisticsSettings": {
    "tabTitle": "Cài đặt bổ sung",
    "addStatisticsLabel": "Thêm số liệu thống kê",
    "fieldNameTitle": "Trường",
    "statisticsTitle": "Nhãn",
    "addNewStatisticsText": "Thêm số liệu thống kê mới",
    "deleteStatisticsText": "Xóa số liệu thống kê",
    "moveStatisticsUpText": "Di chuyển số liệu thống kê lên trên",
    "moveStatisticsDownText": "Di chuyển số liệu thống kê xuống dưới",
    "selectDeselectAllTitle": "Chọn Tất cả"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Thêm Chi phí Dự án Bổ sung",
    "additionalCostValueColumnHeader": "Giá trị",
    "invalidProjectCostMessage": "Mục nhập chi phí dự án không hợp lệ",
    "additionalCostLabelColumnHeader": "Nhãn",
    "additionalCostTypeColumnHeader": "Loại"
  },
  "statisticsType": {
    "countLabel": "Số lượng",
    "averageLabel": "Trung bình",
    "maxLabel": "Tối đa",
    "minLabel": "Tối thiểu",
    "summationLabel": "Lấy tổng",
    "areaLabel": "Khu vực",
    "lengthLabel": "Độ dài"
  }
});