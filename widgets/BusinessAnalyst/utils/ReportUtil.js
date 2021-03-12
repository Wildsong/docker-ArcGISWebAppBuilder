///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
    "dojo/Deferred",
    "dojo/promise/all",
    "dojo/when",
    "dojo/_base/array",
    "esri/request",
    "jimu/portalUtils",
    "dojo/i18n!../nls/strings"
],
function (Deferred, all, when, array, esriRequest, portalUtils, nls) {

    var INFOGRAPHIC_TYPEKEYWORD = "esriWebInfographicReport",
        SINGLE_INFOGRAPHIC_TYPEKEYWORD = "esriWebSingleInfographic",
        BLANK_INFOGRAPHIC_TYPEKEYWORD = "esriWebBlankInfographic",
        HIDDEN_INFOGRAPHIC_TYPEKEYWORD = "esriWebHiddenInfographic",
        COMPARISON_TYPEKEYWORD = "esriWebComparisonReport";
        STANDARD_INFOGRAPHIC_TYPEKEYWORD = "esriReportPlayerStandardInfographic";

    var DEFAULT_GE_URL = "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver";

    var disabledClassicReportIds = [];
    disabledClassicReportIds["US"] = ["LANDSCAPESUMMARYREPORT"];
    
    return {

        _ownedCachedCustomReports: null, // List of Custom Reports Templates/Infographic Templates that are owned by the user
        _sharedCachedCustomReports: null, // List of Shared Custom Reports Templates/Infographic Templates that have been shared to the user
        _cachedCountryClassicReports: [], // Two-dimensional array { "US": [{report1},{report2},...], "CA": [{report1},{report2},...]}
        _cachedInfographicReports: null, // List of available Esri provided Infographic Report Templates
        _countryInitDfds: [], // Array of deferred's for countries for initializing reports

        getAvailableClassicReports: function (countryID, config) {

            var self = this,
                reports = [],
                dfd = new Deferred(),
                currentCountryConfig;

            if (config) {
                array.forEach(config.countryConfig, function (countryConfig) {
                    if (countryID == countryConfig.countryID) {
                        currentCountryConfig = countryConfig;
                    }
                });
            }

            // Use default config of all enabled if country not configured
            if (!currentCountryConfig) {
                currentCountryConfig = {
                    countryID: countryID,
                    allowEsriReports: true,
                    allowAllEsriReports: true,
                    allowEsriInfographics: true,
                    allowAllEsriInfographics: true,
                    allowMyReports: true,
                    allowMyInfographics: true,
                    allowSharedReports: true,
                    allowSharedInfographics: true,
                    allowAllOrgReports: true,
                    allowAllOrgInfographics: true,
                    defaultInfographicID: "",
                    defaultReportID: "",
                    enabledEsriReports: [],
                    enabledOrgReports: [],
                    enabledEsriInfographics: [],
                    enabledOrgInfographics: []
                };
            }

            var ESRI_REPORTS_INDEX = null,
                MY_REPORTS_INDEX = null,
                SHARED_INFOGRAPHICS_INDEX = null;

            when(this._initReports(countryID), function () {
                if (!config || (currentCountryConfig.allowAllEsriReports || self._hasEnabledReports(self._cachedCountryClassicReports[countryID], currentCountryConfig.enabledEsriReports))) {
                    ESRI_REPORTS_INDEX = reports.length;
                    reports.push({ value: "esriReports", label: nls.esriReports, children: [] });
                }
    
                if (!config || ((currentCountryConfig.allowAllOrgReports && self._hasReportsForCountry(self._ownedCachedCustomReports, countryID)) || self._hasEnabledReportsForCountry(self._ownedCachedCustomReports, countryID, currentCountryConfig.enabledOrgReports))) {
                    MY_REPORTS_INDEX = reports.length;
                    reports.push({ value: "myReports", label: nls.myReports, children: [] });
                }
    
                if (!config || ((currentCountryConfig.allowAllOrgReports && self._hasReportsForCountry(self._sharedCachedCustomReports, countryID)) || self._hasEnabledReportsForCountry(self._sharedCachedCustomReports, countryID, currentCountryConfig.enabledOrgReports))) {
                    SHARED_INFOGRAPHICS_INDEX = reports.length;
                    reports.push({ value: "sharedReports", label: nls.sharedReports, children: [] });
                }

                if (currentCountryConfig.allowAllEsriReports || self._hasEnabledReports(self._cachedCountryClassicReports[countryID], currentCountryConfig.enabledEsriReports)) {
                    if (self._cachedCountryClassicReports[countryID] && self._cachedCountryClassicReports[countryID].length > 0) {
                        array.forEach(self._cachedCountryClassicReports[countryID], function (classicReport) {
                            if (currentCountryConfig.allowAllEsriReports || currentCountryConfig.enabledEsriReports.includes(classicReport.reportID)) {
                                reports[ESRI_REPORTS_INDEX].children.push(self._formatClassicReportsForDropDown(classicReport));
                            }
                        });
                    }
                }

                // List of Report Types that are not custom classic reports, these will be excluded
                var nonClassicReportTypes = [INFOGRAPHIC_TYPEKEYWORD, SINGLE_INFOGRAPHIC_TYPEKEYWORD, BLANK_INFOGRAPHIC_TYPEKEYWORD, HIDDEN_INFOGRAPHIC_TYPEKEYWORD, COMPARISON_TYPEKEYWORD];

                if ((currentCountryConfig.allowAllOrgReports && self._hasReportsForCountry(self._ownedCachedCustomReports, countryID)) || self._hasEnabledReportsForCountry(self._ownedCachedCustomReports, countryID, currentCountryConfig.enabledOrgReports)) {
                    array.forEach(self._ownedCachedCustomReports, function (ownedCustomReport) {
                        if (ownedCustomReport.properties.countries.includes(countryID) && (currentCountryConfig.allowAllOrgReports || currentCountryConfig.enabledOrgReports.includes(ownedCustomReport.id))) {
                            if (!ownedCustomReport.typeKeywords.some(function (typeKeyword) { return nonClassicReportTypes.indexOf(typeKeyword) >= 0; })) {
                                reports[MY_REPORTS_INDEX].children.push(self._formatClassicReportsForDropDown(ownedCustomReport));
                            }
                        }
                    });
                }

                if ((currentCountryConfig.allowAllOrgReports && self._hasReportsForCountry(self._sharedCachedCustomReports, countryID)) || self._hasEnabledReportsForCountry(self._sharedCachedCustomReports, countryID, currentCountryConfig.enabledOrgReports)) {
                    array.forEach(self._sharedCachedCustomReports, function (sharedCustomReport) {
                        if (sharedCustomReport.properties.countries.includes(countryID) && (currentCountryConfig.allowAllOrgReports || currentCountryConfig.enabledOrgReports.includes(sharedCustomReport.id))) {
                            if (!sharedCustomReport.typeKeywords.some(function (typeKeyword) { return nonClassicReportTypes.indexOf(typeKeyword) >= 0; })) {
                                reports[SHARED_INFOGRAPHICS_INDEX].children.push(self._formatClassicReportsForDropDown(sharedCustomReport));
                            }
                        }
                    });
                }

                // Sort Reports alphabetically
                var _reportsSort = function (a, b) {
                    var labelA = a.label.toUpperCase();
                    var labelB = b.label.toUpperCase(); 
    
                    var comparison = 0;
    
                    if (labelA > labelB)
                        comparison = 1;
                    else if (labelA < labelB)
                        comparison = -1;
    
                    return comparison;
                };

                if (reports.length > 0)
                    reports[0].children.sort(_reportsSort);
                if (reports.length > 1)
                    reports[1].children.sort(_reportsSort);
                if (reports.length > 2)
                    reports[2].children.sort(_reportsSort);


                dfd.resolve(reports);
            });

            return dfd;
        },

        _hasEnabledReports: function(reports, enabledReportIDs) {
            // If there are no reports for country
            if (!reports || !enabledReportIDs)
                return false;

            return array.some(reports, function (report) {
                return enabledReportIDs.includes(report.reportID);
            });
        },

        _hasReportsForCountry: function(reports, countryID) {
            if (!reports || !countryID)
                return false;

            return array.some(reports, function(report) {
                return report.properties.countries.includes(countryID);
            });
        },

        _hasEnabledReportsForCountry: function(reports, countryID, enabledReportIDs) {
            if (!reports || !countryID || !enabledReportIDs)
                return false;

            return array.some(reports, function(report) {
                if (report.properties.countries.includes(countryID))
                    return enabledReportIDs.includes(report.id);
                else
                    return false;
            });
        },

        _formatClassicReportsForDropDown: function (report) {
            if (report.metadata) {
                return { label: report.metadata.title, value: report.reportID, reportType: report.metadata.type };
            }
            return { label: report.title, value: report.id, reportType: report.properties.type, item: { itemid: report.id, url: portalUrl, token: esri.id.credentials[0].token } };
        },

        getAvailableInfographicReports: function (countryID, config) {
            var self = this,
                reports = [],
                dfd = new Deferred(),
                currentCountryConfig;


            if (config) {
                array.forEach(config.countryConfig, function (countryConfig) {
                    if (countryID == countryConfig.countryID) {
                        currentCountryConfig = countryConfig;
                    }
                });
            }

            // Use default config of all enabled if country not configured
            if (!currentCountryConfig) {
                currentCountryConfig = {
                    countryID: countryID,
                    allowEsriReports: true,
                    allowAllEsriReports: true,
                    allowEsriInfographics: true,
                    allowAllEsriInfographics: true,
                    allowMyReports: true,
                    allowMyInfographics: true,
                    allowSharedReports: true,
                    allowSharedInfographics: true,
                    allowAllOrgReports: true,
                    allowAllOrgInfographics: true,
                    defaultInfographicID: "",
                    defaultReportID: "",
                    enabledEsriReports: [],
                    enabledOrgReports: [],
                    enabledEsriInfographics: [],
                    enabledOrgInfographics: []
                };
            }

            var ESRI_INFOGRAPHICS_INDEX = null,
                MY_INFOGRAPHICS_INDEX = null,
                SHARED_INFOGRAPHICS_INDEX = null;


            when(this._initReports(countryID), function () {
                if (!config || (currentCountryConfig.allowAllEsriInfographics || self._hasEnabledInfographics(self._cachedInfographicReports, currentCountryConfig.enabledEsriInfographics))) {
                    ESRI_INFOGRAPHICS_INDEX = reports.length;
                    reports.push({ value: "esriReports", label: nls.esriInfographics, children: [] });
                }
    
                if (!config || ((currentCountryConfig.allowAllOrgInfographics && self._ownedCachedCustomReports.length > 0) || (self._hasEnabledInfographics(self._ownedCachedCustomReports, currentCountryConfig.enabledOrgInfographics)))) {
                    MY_INFOGRAPHICS_INDEX = reports.length;
                    reports.push({ value: "myReports", label: nls.myInfographics, children: [] });
                }
    
                if (!config || (currentCountryConfig.allowAllOrgInfographics && self._sharedCachedCustomReports.length > 0) || (self._hasEnabledInfographics(self._sharedCachedCustomReports, currentCountryConfig.enabledOrgInfographics))) {
                    SHARED_INFOGRAPHICS_INDEX = reports.length;
                    reports.push({ value: "sharedReports", label: nls.sharedInfographics, children: [] });
                }

                if (currentCountryConfig.allowAllEsriInfographics || self._hasEnabledInfographics(self._cachedInfographicReports, currentCountryConfig.enabledEsriInfographics)) {
                    array.forEach(self._cachedInfographicReports, function (infographicReport) {
                        if (infographicReport.properties.countries.includes(countryID) && (currentCountryConfig.allowAllEsriInfographics || currentCountryConfig.enabledEsriInfographics.includes(infographicReport.id))) {
                            reports[ESRI_INFOGRAPHICS_INDEX].children.push(self._formatInfographicReportsForDropDown(infographicReport));
                        }
                    });
                }

                if ((currentCountryConfig.allowAllOrgInfographics && self._ownedCachedCustomReports.length > 0) || (self._hasEnabledInfographics(self._ownedCachedCustomReports, currentCountryConfig.enabledOrgInfographics))) {
                    array.forEach(self._ownedCachedCustomReports, function (ownedCustomReport) {
                        if (ownedCustomReport.properties.countries.includes(countryID) && (currentCountryConfig.allowAllOrgInfographics || currentCountryConfig.enabledOrgInfographics.includes(ownedCustomReport.id))) {
                            if (ownedCustomReport.typeKeywords.includes(INFOGRAPHIC_TYPEKEYWORD) || self._isOldPortalInfographic(ownedCustomReport)) {
                                reports[MY_INFOGRAPHICS_INDEX].children.push(self._formatInfographicReportsForDropDown(ownedCustomReport));
                            }
                        }
                    });
                }

                if ((currentCountryConfig.allowAllOrgInfographics && self._sharedCachedCustomReports.length > 0) || (self._hasEnabledInfographics(self._sharedCachedCustomReports, currentCountryConfig.enabledOrgInfographics))) {
                    array.forEach(self._sharedCachedCustomReports, function (sharedCustomReport) {
                        if (sharedCustomReport.properties.countries.includes(countryID) && (currentCountryConfig.allowAllOrgInfographics || currentCountryConfig.enabledOrgInfographics.includes(sharedCustomReport.id))) {
                            if (sharedCustomReport.typeKeywords.includes(INFOGRAPHIC_TYPEKEYWORD) || self._isOldPortalInfographic(sharedCustomReport)) {
                                reports[SHARED_INFOGRAPHICS_INDEX].children.push(self._formatInfographicReportsForDropDown(sharedCustomReport));
                            }
                        }
                    });
                }

                // Sort Infographics alphabetically
                var _infographicSort = function (a, b) {
                    var labelA = a.label.toUpperCase();
                    var labelB = b.label.toUpperCase(); 
    
                    var comparison = 0;
    
                    if (labelA > labelB)
                        comparison = 1;
                    else if (labelA < labelB)
                        comparison = -1;
    
                    return comparison;
                };

                if (reports.length > 0)
                    reports[0].children.sort(_infographicSort);
                if (reports.length > 1)
                    reports[1].children.sort(_infographicSort);
                if (reports.length > 2)
                    reports[2].children.sort(_infographicSort);

                dfd.resolve(reports);
            });

            return dfd;
        },

        _hasEnabledInfographics: function(infographics, enabledIDs) {
            return array.some(infographics, function (infographic) {
                return enabledIDs.includes(infographic.id);
            });
        },

        // Determines if the Report Portal Item is an old (10.6) Infographic to determine if it should be displayed or not
        // Display if it is a non "hidden", "graphic report"
        _isOldPortalInfographic: function(report) {
            if (report.properties && report.properties.isHidden && report.properties.isHidden === "true") {
                return false;
            }
            
            if (report.properties && report.properties.isGraphicReport && report.properties.isGraphicReport === "true") {
                return true;
            }

            return false;
        },

        _formatInfographicReportsForDropDown: function (report) {
            return { label: report.title, value: report.id };
        },

        // Retrieves and initializes initial cache of reports from server
        _initReports: function (countryID) {
            // We need to make 6 requests to compile a list of available reports
            // 1) GE request to retrieve list of available reports for country
            // 2) search request to retrieve list of Esri provided infographic report templates
            // 3) search request to retrieve list of custom/infographic report templates owned by user 
            // 4) search request to retrieve list of custom/infographic report templates shared to user by group
            // 5) search request to retrieve list of custom/infographic report templates shared to user by org
            // 6) search request to retrieve list of custom/infographic report templates shared to user publicly for their organization

            var promises = [],
                self = this;

            // Only initialize once per country
            if (!this._countryInitDfds[countryID])
                this._countryInitDfds[countryID] = new Deferred();
            else
                return this._countryInitDfds[countryID];

            
            // Handles subsequent search requests where we need to search more than 1 time when there are > 100 results
            var processQueries = function(esriRequestArgs, resultsArray) {
                return esriRequest(esriRequestArgs).then(function (response) {
                    array.forEach(response.results, function (report) {
                        resultsArray.push(report);
                    });

                    if (response.nextStart != -1) {
                        esriRequestArgs.content.start = response.nextStart;
                        return processQueries(esriRequestArgs, resultsArray);
                    }
                }, function (error) {
                    // TODO: Error Handling
                    alert(error);
                });
            }

            var portal = portalUtils.getPortal(portalUrl);
            portal.loadSelfInfo().then(function (portalSelf) {
                // Use GE Url if specified, else use default ArcGIS online GE url
                var geUrl = portalSelf && portalSelf.helperServices && portalSelf.helperServices.geoenrichment && portalSelf.helperServices.geoenrichment.url ? portalSelf.helperServices.geoenrichment.url : DEFAULT_GE_URL;
                // 1) GE request to retrieve list of available reports for country
                if (!self._cachedCountryClassicReports[countryID]) {
                    promises.push(esriRequest({
                        url: geUrl +  "/Geoenrichment/reports/" + countryID,
                        content: {
                            appID: "webappbuilder",
                            f: "json",
                            langCode: "en-us",
                        }
                    }).then(function (result) {
                        self._cachedCountryClassicReports[countryID] = result.reports;
                    }, function (error) {
                        // TODO: Error Handling
                        alert(error);
                    }));
                }

                if (!self._cachedInfographicReports) {
                    self._cachedInfographicReports = [];
                    // 2) search request to retrieve list of Esri provided infographic report templates
                    promises.push(processQueries({
                        url: portalUrl +  "/sharing/rest/search",
                        content: {
                            appID: "webappbuilder",
                            f: "json",
                            start: 1,
                            num: 100,
                            sortField: "modified",
                            sortOrder: "desc",
                            q: 'typekeywords:(esriReportPlayerStandardInfographic jsapiVersion3.35)'
                        }
                    }, self._cachedInfographicReports));
                }

                if (!self._ownedCachedCustomReports) {
                    self._ownedCachedCustomReports = [];
                    // 3) search request to retrieve list of custom/infographic report templates owned by user

                    promises.push(processQueries({
                        url: portalUrl +  "/sharing/rest/search",
                        content: {
                            appID: "webappbuilder",
                            f: "json",
                            start: 1,
                            num: 100,
                            sortField: "modified",
                            sortOrder: "desc",
                            q: 'type:"Report Template" typekeywords:(esriWebReport NOT esriWebSingleInfographic) owner:' + esri.id.credentials[0].userId
                        }
                    }, self._ownedCachedCustomReports));
                }

                if (!self._sharedCachedCustomReports) {

                    self._sharedCachedCustomReports = [];
                    // 4) search request to retrieve list of custom/infographic report templates shared to user by group
                    promises.push(processQueries({
                        url: portalUrl + "/sharing/rest/search",
                        content: {
                            appID: "webappbuilder",
                            f: "json",
                            start: 1,
                            num: 100,
                            sortField: "modified",
                            sortOrder: "desc",
                            q: 'access:shared type:"Report Template" typekeywords:(esriWebReport NOT esriWebSingleInfographic) NOT owner:' + esri.id.credentials[0].userId
                        }
                    }, self._sharedCachedCustomReports));

                    // 5) search request to retrieve list of custom/infographic report templates shared to user by org
                    promises.push(processQueries({
                        url: portalUrl +  "/sharing/rest/search",
                        content: {
                            appID: "webappbuilder",
                            f: "json",
                            start: 1,
                            num: 100,
                            sortField: "modified",
                            sortOrder: "desc",
                            q: 'access:org type:"Report Template" typekeywords:(esriWebReport NOT esriWebSingleInfographic) NOT owner:' + esri.id.credentials[0].userId
                        }
                    }, self._sharedCachedCustomReports));

                    if (portalSelf && portalSelf.appInfo && portalSelf.appInfo.orgId) {
                        // 6) search request to retrieve list of custom/infographic report templates shared to user publicly for their organization
                        promises.push(processQueries({
                            url: portalUrl +  "/sharing/rest/search",
                            content: {
                                appID: "webappbuilder",
                                f: "json",
                                start: 1,
                                num: 100,
                                sortField: "modified",
                                sortOrder: "desc",
                                q: 'access:public type:"Report Template" typekeywords:(esriWebReport NOT esriWebSingleInfographic) NOT owner:' + esri.id.credentials[0].userId + ' orgid: ' + portalSelf.id
                            }
                        }, self._sharedCachedCustomReports));
                    }
                }

                if (promises.length === 0)
                    self._countryInitDfds[countryID].resolve();
                else {
                    all(promises).then(function () {
                        self._countryInitDfds[countryID].resolve();
                    });
                }
            });

            return this._countryInitDfds[countryID];
        }
    }
});
