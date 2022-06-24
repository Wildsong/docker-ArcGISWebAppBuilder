define({
  root: ({
    "transparencyLabel": "Transparency", // Shown as label on transparency sliders
    "outline": "Outline", // Shown as label for outline color picker
    "fill": "Fill (Color only applies when style set to solid)", // Shown as label for outline color picker

    "style": "Style", // Shown as Title for Style dropdown

    "selectOpLayerLabel": "Select an operational layer for results", // Label for the operational layer drop-down list,
    "selectDefaultMeasurementLabel": "Select a default unit of measure", // Label for default unit of measure
    "helpIconTooltip": "The operational layer list is populated with layers from the current web map that are polygon geometry type.", // tooltip info for operational drop-down list

    "lineStyles": {
      "esriSLSDash": "Dash",
      "esriSLSDashDot": "Dash Dot",
      "esriSLSDashDotDot": "Dash Dot Dot",
      "esriSLSDot": "Dot",
      "esriSLSLongDash": "Long Dash",
      "esriSLSLongDashDot": "Long Dash Dot",
      "esriSLSNull": "Null",
      "esriSLSShortDash": "Short Dash",
      "esriSLSShortDashDot": "Short Dash Dot",
      "esriSLSShortDashDotDot": "Short Dash Dot Dot",
      "esriSLSShortDot": "Short Dot",
      "esriSLSSolid": "Solid"
    },

    "fillStyles": {
      "esriSFSBackwardDiagonal": "Backward",
      "esriSFSCross": "Cross",
      "esriSFSDiagonalCross": "Diagonal",
      "esriSFSForwardDiagonal": "Forward",
      "esriSFSHorizontal": "Horizontal",
      "esriSFSNull": "Null",
      "esriSFSSolid": "Solid",
      "esriSFSVertical": "Vertical"
    },

    "threatTypeLabel": "Threat Type",
    "generalLabel": "General",
    "addThreatTypesLabel": "Add threat type",
    "actions": "Actions",
    "newThreatTypePopupLabel": "New threat type",
    "units": "Units",
    "chooseDefaultThreatLabel": "Select default threat type",
    "defaultThreatTypePopUpLabel": "Default Threat Types",
    "editThreatLabel": "Edit Threat",
    "defaultThreatTypeIconTooltip": "Default Threat Type List",
    "uniqueThreatTypeMsg": "Enter unique threat type, threat type with this name already exist.",
    "requiredMsg": "This field is required",
    "unitMeasureLabel": "Distances are in {0}",
    "chooseDefaultThreatTypeIconLabel": "Choose from default",

    //threat types - labels from the ThreatTypes.json
    "pipeBombLabel": "Pipe Bomb",
    "suicideBombLabel": "Suicide Bomb",
    "briefcaseLabel": "Briefcase",
    "carLabel": "Car",
    "suvVanLabel": "SUV/VAN",
    "smallDeliveryTruckLabel": "Small Delivery Truck",
    "containerWaterTruckLabel": "Container/Water Truck",
    "semiTrailerLabel": "Semi-Trailer",

    "chemicalThreatLegendLabel": "Chemical Threat",
    "lpgThreatLegendLabel": "LPG Threat",

    //LPG threat types - labels from the lpgThreatTypes.json
    "smallLPGTank": "Small LPG Tank",
    "largeLPGTank": "Large LPG Tank",
    "commercialResidentialLPGTank": "Commercial/Residential LPG Tank",
    "smallLPGTruck": "Small LPG Truck",
    "semiTankerLPG": "Semi-Tanker LPG",

    "threatDescriptionColLabel": "Threat Description",
    "addThreatZoneButtonLabel": "Add threat zone",
    "zoneDescColLabel": "Zone description",
    "distanceLabel": "Distance (${unitAbbr})",
    "threatTypeHelp": "<p>Make sure the following conditions are met for a threat type:<br/><ul><li>Threat type cannot be blank and it should be unique</li><li>Threat should have at least one valid zone</li><li>Zone description should be unique for a threat</li></ul><p/>",
    "descriptionLabel": "Description",
    "newThreatZonePopupLabel": "New threat zone",
    "editThreatZonePopupLabel": "Edit threat zone",
    "uniqueZoneDescriptionMsg": "Enter unique zone description, zone description with this name already exist.",
    "symbologyColLabel": "Symbology",
    "zoneDescriptionColLabel": "Zone description",
    "uniqueZoneRequiredMsg": "Zone name should be unique for the",
    //input location dropdown
    "interactive": "Interactive", //Shown as label for interactive in location dropdown
    "fromCoord": "Fixed Coordinate", //Shown as label for from coordinate in location dropdown
    "existingFeature": "From Existing Features", //Shown as label for existing features in location dropdown,
    "defaultInputLocationLabel" : "Default input location",
    "defaultInputLayer": "Default input layer",
    "defaultThreatType": "Default threat type",
    "selectLabel": "Select",
    "mandatoryLabel": "Mandatory Evacuation Distance",
    "safeLabel": "Safe Evacuation Distance",
    "lpgSafeDistanceLable": "Safe Distance",
    "fireBallDiameterLable": "Fireball Diameter",

  }),
  "ar": 1,
  "bg": 1,
  "bs": 1,
  "ca": 1,
  "cs": 1,
  "da": 1,
  "de": 1,
  "el": 1,
  "es": 1,
  "et": 1,
  "fi": 1,
  "fr": 1,
  "he": 1,
  "hr": 1,
  "hu": 1,
  "it": 1,
  "id": 1,
  "ja": 1,
  "ko": 1,
  "lt": 1,
  "lv": 1,
  "nb": 1,
  "nl": 1,
  "pl": 1,
  "pt-br": 1,
  "pt-pt": 1,
  "ro": 1,
  "ru": 1,
  "sk": 1,
  "sl": 1,
  "sr": 1,
  "sv": 1,
  "th": 1,
  "tr": 1,
  "uk": 1,
  "vi": 1,
  "zh-cn": 1,
  "zh-hk": 1,
  "zh-tw": 1
});
