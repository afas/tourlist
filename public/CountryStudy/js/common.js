var _countryList;

checkPageNames();

function loadCountryInfo() {
    var issueId = getIssueId();

    showWaitingControl("contentWaiting");
    getSection(parseQueryString()["sectionid"], issueId, sectionLoaded);
}

function loadViewImage() {
    var issueId = getIssueId();
    getSection(parseQueryString()["sectionid"], issueId, imageLoaded);
}

function imageLoaded(section) {
    var previewContainer = document.getElementById("previewContainer");
    var imageNum;

    resizeGalleryPreview();
    window.onresize = resizeGalleryPreview;
    renderPreviewGalleryHorizontal(section, previewContainer);

    var imageId = parseQueryString()["imageid"];

    if (imageId == null) {
        imageNum = 0;
    }
    else {
        for (var i = 0; i < section.Contents.length; i++) {
            if (section.Contents[i].Id.toString() == imageId) {
                imageNum = i;
                break;
            }
        }
    }
    loadImage(imageNum);
}

function loadGallery() {
    var issueId = getIssueId();

    getSection(parseQueryString()["sectionid"], issueId, galleryLoaded);
}

//function loadSection()
//{
//    var defaultLink = document.getElementById("defaultLink");
//    defaultLink.href = _defaultPage;
//
//    loadSectionMenu();
//    loadRegionList();
//    loadCountryInfo();
//
//    var params = parseQueryString();
//
//    if(params["sectionid"]==60 && params["issueid"]==null)//Экскурсии
//    {
//        dropdownContainer.style.display = "";
//        loadRegionsWithSights();
//    }
//    else {
//        dropdownContainer.style.display = "none";
//    }
//    resizeFrame();
//}

function loadSection() {
    var defaultLink = document.getElementById("defaultLink");
    defaultLink.href = _defaultPage;
    loadSectionMenu();
    loadRegionList();
    loadCountryInfo();
    var params = parseQueryString();
    if (params["sectionid"] == 60 && params["issueid"] == null)
    {
        if (typeof(dropdownContainer) != "undefined") dropdownContainer.style.display = "";
        loadRegionsWithSights();
    } else {
        if (typeof(dropdownContainer) != "undefined") dropdownContainer.style.display = "none";
    }
    resizeFrameEvent();
}

function loadCountryList() {
    showWaitingControl("contentWaiting");
    getCountries(coutriesLoaded);
    resizeFrameEvent();
}
function loadRegionList() {
    var params = parseQueryString();

    if (params["countryid"] == null) {
        //Что-то
        return;
    }
    getRegions(params["countryid"], regionsLoaded)
}

function resizeFrameEvent() {
    var cur = window;
    while (typeof(cur) != "undefined") {
        try {
            if (typeof(cur.resizeFrame) != "undefined") {
                cur.setTimeout(cur.resizeFrame, 0);
                return;
            }
        } catch (e) {
        }
        if (cur == top) break;
        cur = cur.parent;
    }
}

function loadRegionsWithSights() {
    var params = parseQueryString();

    if (params["countryid"] == null) {
        //Что-то
        return;
    }
    getRegionsWithSights(params["countryid"], regionsWithSightsLoaded)
}

function regionsLoaded(result) {
    var regionList = result;
    var menuRegions = document.getElementById("menuRegions");
    var dropdownContainer = document.getElementById("dropdownContainer");
    var params = parseQueryString();

    renderRegionsMenu(regionList, parseQueryString()["countryid"], 59,
            menuRegions);
}

function regionsWithSightsLoaded(result) {
    var regionList = result;
    var dropdownContainer = document.getElementById("dropdownContainer");

    renderRegionsDropdown(regionList, dropdownContainer)
}

function coutriesLoaded(result) {
    _countryList = result;
    var listControl = document.getElementById("countryList");
    //fillCountryList(_countryList, listControl)
    getRootSections(renderDefaultPage);
}

function renderDefaultPage(result) {
    var sections = result;
    var defaultContent = document.getElementById("defaultContent");
    hideWaitingControl("contentWaiting");
    renderCountry(_countryList, sections, defaultContent)
}

function loadSectionMenu() {
    getRootSections(rootSectionsLoaded);
}
function rootSectionsLoaded(result) {
    var rootSections = result;
    var nCountryId = parseQueryString()["countryid"];
    renderSectionMenu(rootSections, nCountryId, document.getElementById("menu"));
}

function loadPageTitle(section) {
    var params = parseQueryString();
    var issueId;
    var issueType;

    if (params["issueid"] == null) {
        if (params["countryid"] == null) {
            //Что-то
            return;
        }
        else {
            // Получаем название страны
            issueId = params["countryid"];
            issueType = "1";
        }
    }
    else {
        issueId = params["issueid"];
        issueType = section.IssueType.toString();
    }

    callService("../../CountryStudy/WS/Issue.asmx/GetIssueName",
            "IssueId=" + issueId + "&IssueType=" + issueType,
            setPageTitle,
            section.Name);
}


function sectionLoaded(result) {
    var section = result;
    var rootElement = document.getElementById("rootInfo");
    var headerElement = document.getElementById("sectionHeader");
    var headerMenu = document.getElementById("rootHeader");
    var params = parseQueryString();
    var pageNum, regionId;


    loadPageTitle(section);

    renderTopMenu(section.ChildSections, headerMenu);

    if (section.IssueType != 1 && params["issueid"] == null) {
        if (params["pagenum"] == null) {
            pageNum = 1;
        }
        else {
            pageNum = params["pagenum"];
        }
        if (params["regionid"] == null) {
            regionId = 0;
        }
        else {
            regionId = params["regionid"];
        }
        getSectionPreviews(section.Id, section.IssueType,
                params["countryid"], regionId, pageNum, _pageSize, previewLoaded);
    }
    else {
        hideWaitingControl("contentWaiting");
        renderRootSection(section, rootElement, headerElement);
    }
}

function previewLoaded(result) {
    var rootElement = document.getElementById("rootInfo");

    hideWaitingControl("contentWaiting");
    renderSectionPreviews(result, rootElement)
    var i = 0;
}

function galleryLoaded(result) {
    var section = result;
    var galleryContainer = document.body;
    renderGallery(section, galleryContainer);
}

function createSingleBorder(parentHTMLElement, borderClass, header) {
    var tableBorder = document.createElement("table");
    tableBorder.setAttribute("cellspacing", "0");
    tableBorder.setAttribute("cellpadding", "0");

    var tableBody = document.createElement("tbody");
    tableBorder.appendChild(tableBody);
    parentHTMLElement.appendChild(tableBorder);

    var tableRow = document.createElement("tr");
    var tableCell = document.createElement("td");

    var contentCell = document.createElement("td");

    //Первая строка
    tableBody.appendChild(tableRow);
    tableCell.className = borderClass + "_top_left";
    tableRow.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = borderClass + "_top";
    tableRow.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = borderClass + "_top_right";
    tableRow.appendChild(tableCell);

    //Вторая строка
    tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);

    tableCell = document.createElement("td");
    tableCell.className = borderClass + "_left";
    tableRow.appendChild(tableCell);

    tableRow.appendChild(contentCell);

    tableCell = document.createElement("td");
    tableCell.className = borderClass + "_right";
    tableRow.appendChild(tableCell);

    //Третья строка
    tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);

    tableCell = document.createElement("td");
    tableCell.className = borderClass + "_bottom_left";
    tableRow.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = borderClass + "_bottom";
    tableRow.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = borderClass + "_bottom_right";
    tableRow.appendChild(tableCell);

    return contentCell;
}

function parseQueryString() { var result = new Array(); var reParams = /[^&\?]+/ig; var cur = window; while( typeof(cur) != "undefined" ) { try { var strQuery = cur.location.search; var strParams = strQuery.match(reParams); for (var i = 0; i < strParams.length; i++) { result[strParams[i].split("=")[0].toLowerCase()] = strParams[i].split("=")[1]; } } catch (e) {} if (cur == top) break; cur = cur.parent; } return result; }
function checkPageNames() {
    if (_sectionInfoPage.charAt(_sectionInfoPage.length - 1) != "?" &&
            _sectionInfoPage.charAt(_sectionInfoPage.length - 1) != "&") {
        _sectionInfoPage += "?";
    }
    if (_galleryPage.charAt(_galleryPage.length - 1) != "?" &&
            _galleryPage.charAt(_galleryPage.length - 1) != "&") {
        _galleryPage += "?";
    }
    if (_viewImagePage.charAt(_viewImagePage.length - 1) != "?" &&
            _viewImagePage.charAt(_viewImagePage.length - 1) != "&") {
        _viewImagePage += "?";
    }
}

function setPageTitle(result, sectionName) {
    document.title = sectionName + " - " + result;
    document.getElementById("sectionHeader").innerHTML = sectionName + " - " + result;
}
function showWaitingControl(controlId) {
    document.getElementById(controlId).style.display = "";
}

function showEmptyGoogleMap(controlId) {
    document.getElementById(controlId).style.display = "";
}

function hideWaitingControl(controlId) {
    document.getElementById(controlId).style.display = "none";
    resizeFrameEvent();
}
function getIssueId() {
    var issueId;

    var params = parseQueryString();

    if (params["issueid"] == null) {
        if (params["countryid"] == null) {
            issueId = 0;
        }
        else {
            issueId = params["countryid"];
        }
    }
    else {
        issueId = params["issueid"];
    }
    return issueId;
}

function callService(serviceName, serviceData, callbackFunction, callBackData) {
    if (serviceData.length > 0) {
        serviceData += "&encoding=" + _encoding;
    }
    else {
        serviceData = "encoding=" + _encoding;
    }
    $.ajax({
        type: "GET",
        url: _wsUrl + serviceName,
        dataType: "jsonp",
        data : serviceData,
        success: function(result, status) {
            if (result.d.ErrorMessage != "") {
                alert(result.d.ErrorMessage);
            }
            if (result.d.Result != null) {
                callbackFunction(result.d.Result, callBackData);
            }

        }
    });
}