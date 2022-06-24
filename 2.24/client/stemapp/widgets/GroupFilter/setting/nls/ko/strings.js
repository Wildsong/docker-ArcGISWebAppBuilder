define({
  "configText": "아래의 필터 그룹 정의",
  "labels": {
    "groupName": "그룹 이름:",
    "groupNameTip": "이 필터 그룹의 이름을 입력합니다. 사용 가능한 필터 그룹의 드롭다운에 표시됩니다.",
    "groupDesc": "설명:",
    "groupDescTip": "이 필터 그룹에 대한 설명을 입력합니다.",
    "groupOperator": "프리셋 연산자:",
    "groupOperatorTip": "필터의 연산자를 미리 정의하는 옵션입니다. 프리셋 연산자가 선택되지 않으면 필터가 동일한 연산자를 사용하게 됩니다.",
    "groupDefault": "프리셋 값:",
    "groupDefaultTip": "값을 입력하거나 레이어에서 기존 값을 선택하는 옵션입니다. 레이어를 검색하려면 검색 아이콘을 클릭합니다.",
    "sameLayerAppend": "레이어가 두 번 이상 나열된 경우:",
    "sameLayerConjunc": "다음을 사용하여 추가:",
    "caseSearch": "대소문자 구분 검색 수행: ",
    "headerTextHelp": "필터 선택 위에 표시할 텍스트 제공"
  },
  "buttons": {
    "addNewGroup": "새 그룹 추가",
    "addNewGroupTip": "새 필터 그룹 추가",
    "addLayer": "레이어 추가",
    "addLayerTip": "필터 그룹에 레이어 추가"
  },
  "inputs": {
    "groupName": "필터 그룹 이름",
    "groupDesc": "그룹에 대한 설명",
    "groupDefault": "미리 정의된 값 입력",
    "sameLayerAny": "임의 일치 식",
    "sameLayerAll": "모든 식과 일치",
    "simpleMode": "간단한 뷰에서 시작",
    "simpleModeTip": "위젯 인터페이스를 단순화합니다. 선택하면 연산자 드롭다운 목록 및 기준 추가 버튼이 숨겨집니다.",
    "webmapAppendModeAny": "기존 맵 필터에 임의 식 추가",
    "webmapAppendModeAll": "기존 맵 필터에 모든 식 추가",
    "webmapAppendModeTip": "웹 맵의 기존 필터에 필터 그룹을 추가하는 옵션입니다.",
    "persistOnClose": "위젯이 닫힌 후 필터를 유지합니다.",
    "selectGroup": "필터링할 그룹 선택",
    "hideDropDown": "1개 그룹의 헤더 및 필터 숨기기",
    "hideDropDownTip": "하나의 필터 그룹만 구성된 경우 헤더 및 드롭다운을 숨깁니다.",
    "optionsMode": "위젯 옵션 숨기기",
    "optionsModeTip": "추가 위젯 설정을 표시하는 옵션입니다. 옵션을 선택한 경우 미리 정의된 필터를 저장 및 불러오고 위젯이 닫힌 후에 필터를 유지하는 기능이 인터페이스에서 숨겨집니다.",
    "optionOR": "OR",
    "optionAND": "AND",
    "optionEQUAL": "EQUALS",
    "optionNOTEQUAL": "NOT EQUAL",
    "optionGREATERTHAN": "GREATER THAN",
    "optionGREATERTHANEQUAL": "GREATER THAN OR EQUAL",
    "optionLESSTHAN": "LESS THAN",
    "optionLESSTHANEQUAL": "LESS THAN OR EQUAL",
    "optionSTART": "BEGINS WITH",
    "optionEND": "ENDS WITH",
    "optionLIKE": "CONTAINS",
    "optionLIKESPECIFIC": "특정 값을 포함함",
    "optionNOTLIKESPECIFIC": "특정 값을 포함하지 않음",
    "optionNOTLIKE": "DOES NOT CONTAIN",
    "optionONORBEFORE": "다음 시간 또는 그 이전",
    "optionONORAFTER": "다음 시간 또는 그 이후",
    "optionNONE": "NONE"
  },
  "tables": {
    "layer": "레이어",
    "layerTip": "맵에 정의된 레이어 이름입니다.",
    "field": "필드",
    "fieldTip": "레이어가 필터링될 필드입니다.",
    "value": "값 사용",
    "valueTip": "레이어에서 드롭다운 목록 값을 사용하는 옵션입니다. 레이어를 이 매개변수에 사용하지 않는 경우 기본 텍스트 상자가 사용자에게 표시됩니다.",
    "zoomTo": "결과 확대",
    "zoomTip": "필터 적용 후 피처 범위를 확대하는 옵션입니다.",
    "action": "삭제",
    "actionTip": "필터 설정에서 레이어를 제거합니다."
  },
  "popupHeader": {
    "label": "프리셋 값 선택"
  },
  "errors": {
    "noGroups": "최소 하나 이상의 그룹이 필요합니다.",
    "noGroupName": "하나 이상의 그룹 이름이 없습니다.",
    "noDuplicates": "하나 이상의 그룹 이름이 중복되었습니다.",
    "noRows": "테이블에 최소 하나의 행이 필요합니다.",
    "noLayers": "맵에 레이어가 없습니다."
  },
  "picker": {
    "description": "이 그룹에 대한 프리셋 값을 찾습니다.",
    "layer": "레이어 선택",
    "layerTip": "웹 맵에 정의된 레이어 이름입니다.",
    "field": "필드 선택",
    "fieldTip": "프리셋 값이 설정될 필드입니다.",
    "value": "값 선택",
    "valueTip": "위젯의 기본값이 될 값입니다."
  }
});