function renderSectionMenu(sections, countryId, parentHTMLElement)
{
    var menuElement;
    
    for(var i = 0; i < sections.length; i++)
    {
        menuElement = document.createElement("a");
        menuElement.setAttribute("href", _sectionInfoPage + "countryid="
         + countryId + "&sectionId=" + sections[i].Id);
        menuElement.innerHTML = sections[i].Name;
        parentHTMLElement.appendChild(menuElement);
        parentHTMLElement.appendChild(document.createElement("br"));
    }
}

function renderRegionsMenu(regions, countryId, sectionId, parentHTMLElement)
{
    var menuElement;
    
    for(var i = 0; i < regions.length; i++)
    {        
        menuElement = document.createElement("a");
        menuElement.setAttribute("href", _sectionInfoPage + "countryid="
         + countryId + "&issueId=" + regions[i].Id + "&sectionId=" + sectionId);
        menuElement.innerHTML = regions[i].Name;
        parentHTMLElement.appendChild(menuElement);
        parentHTMLElement.appendChild(document.createElement("br"));
    }
}

function renderRegionsDropdown(regions, parentHTMLElement)
{
    var selectElement = document.createElement("select");
    selectElement.onchange = regionChanged;
    var option = document.createElement("option");
    var selectedId = parseQueryString()["regionid"];
    
    option.text = "Все регионы";
    option.value = "0";       
    
    parentHTMLElement.appendChild(selectElement);
    selectElement.add(option);
    
    for(var i = 0; i < regions.length; i++)
    {
        option = document.createElement("option");
        option.text = regions[i].Name;
        option.value = regions[i].Id;
        if(regions[i].Id == selectedId)
        {
            option.selected = true;
        }
        selectElement.add(option);
    }
}

function regionChanged()
{
    var params = parseQueryString();
    var href = _sectionInfoPage + "sectionId=" + params["sectionid"];   
    
    var regionId = this.value;
    
    if(params["countryid"] != null)
    {
        href += "&countryId=" + params["countryid"];
    }
    if(params["issueid"] != null)
    {
        href += "&issueId=" + params["issueid"];
    }    
    href += "&regionId=" + regionId;
    location.replace(href);
}

function renderRootSection(section, parentHTMLElement, headerElement)
{
    var sectionDiv = document.createElement("div");
    
    parentHTMLElement.appendChild(sectionDiv);
    
    headerElement.innerHTML = section.Name;               
    
    //Контент
    var sectionContentDiv;
    
    for(var i=0; i < section.Contents.length; i++)
    {
        sectionContentDiv = document.createElement("div");
        sectionContentDiv.className = "sectionContent0";
        sectionContentDiv.innerHTML = section.Contents[i].Data;
        sectionDiv.appendChild(sectionContentDiv);
    }
    
    for(var i=0; i < section.ChildSections.length; i++)
    {
        renderSection(section.ChildSections[i], sectionDiv);
    }
}

function renderSection(section, parentHTMLElement)
{
    if(section.Contents.length == 0 &&
        section.ChildSections.length == 0)
    {
        // Пустую секцию не рисуем вообще
        return;
    }
    switch(section.SectionType)
    {
        case 1://unknown
            switch(section.SectionLevel)
            {
                case 1:
                    renderTableSection(section, parentHTMLElement);
                    break;
                case 2:
                    renderRowSection(section, parentHTMLElement);
                    break;
                default:
                    renderDefaultSection(section, parentHTMLElement);
                    break;
            }       
            break;
        case 2: //flag
            renderFlag(section);
            break;
        case 3: //gallery
            renderPreviewGalleryVertical(section, document.getElementById("galleryContainer"), _previewImagesNum);
            break;
        case 7: // google maps   -- renderMapSection
            renderMapSection(section, parentHTMLElement);
            break;    
    }
}

function renderMapSection(section, parentHTMLElement) {

    var sectionElement = document.createElement("tr");

    parentHTMLElement.appendChild(sectionElement);

    //Рисуем название секции
    
/*  
    var sectionNameElement = document.createElement("td");

    sectionNameElement.innerHTML = section.Name;
    sectionNameElement.className = "sectionName2";

    sectionElement.appendChild(sectionNameElement);
*/

    //Контент
    var sectionContentElement;


    for (var i = 0; i < section.Contents.length; i++) {
        
        var width;
        if (section.Contents[i].Width > 0)
            width = section.Contents[i].Width;
        else {
            width = section.Contents[i].Width + "%";
            width = width.replace('-', '');
        }  
        section.Contents[0].Data = "<iframe id='googlemapiframe' width='" + width + "' height='" + section.Contents[0].Height + "' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='http://maps.google.ru/maps?hl=ru&amp;ie=UTF8&amp;key=" + googleKey + "&amp;ll=" + section.Contents[0].Latitude + "," + section.Contents[0].Longitude + "&amp;spn=1.016548,1.334595&amp;z=" + section.Contents[0].Zoom + "&amp;output=embed'></iframe>"
    
        sectionContentElement = document.createElement("td");
        sectionContentElement.innerHTML = section.Contents[i].Data;
        sectionContentElement.className = "sectionContent2";
        sectionElement.appendChild(sectionContentElement);
    }

    for (var i = 0; i < section.ChildSections.length; i++) {
        renderSection(section.ChildSections[i], sectionElement);
    }
}

function renderFlag(section)
{
    if(section.Contents.length == 0)
    {
        return;
    }
    var flagContainer = document.getElementById("flagContainer");
    var img = document.createElement("img");
    img.src = section.Contents[0].ImageUrl;
    img.alt = section.Name;
    img.height = 90;
    img.width = 135;
    flagContainer.appendChild(img);
}

function renderTopMenu(sections, parentHTMLElement)
{
    var menuElement;
    for(var i = 0; i < sections.length; i++)
    {
        if (sections[i].SectionType != 1 || !sections[i].IsShow )
        {
            continue;
        }

       
        menuElement = document.createElement("a");
        menuElement.innerHTML = sections[i].Name;
        menuElement.href = "#section_" + sections[i].Id;
        menuElement.className = "headerMenuItem";
        parentHTMLElement.appendChild(menuElement);
        parentHTMLElement.appendChild(document.createElement("br"));
    }
}

function renderDefaultSection(section, parentHTMLElement)
{
    var sectionDiv = document.createElement("div");
    
    parentHTMLElement.appendChild(sectionDiv);
    
    //Рисуем название секции
    var sectionNameDiv = document.createElement("div");    
    
    sectionNameDiv.innerHTML = section.Name;
    //sectionNameDiv.style.fontSize = 50 - 10*section.SectionLevel;
    
    sectionDiv.appendChild(sectionNameDiv);
    
    //Контент
    var sectionContentDiv;
    
    for(var i=0; i < section.Contents.length; i++)
    {
        sectionContentDiv = document.createElement("div");
        sectionContentDiv.innerHTML = section.Contents[i].Data;
        sectionDiv.appendChild(sectionContentDiv);
    }    
    
    for(var i=0; i < section.ChildSections.length; i++)
    {
        renderSection(section.ChildSections[i], sectionDiv);
    }
}

function renderTableSection(section, parentHTMLElement)
{
    var sectionElement = document.createElement("div");
    
    parentHTMLElement.appendChild(sectionElement);
    
    //Рисуем название секции
    var table, body;
    var sectionNameDiv;
    
    table = document.createElement("table");
    body = document.createElement("tbody");
    
    sectionNameDiv = document.createElement("div");
    sectionNameDiv.id = "section_" + section.Id;
    sectionNameDiv.className = "sectionName1";
    
    sectionElement.appendChild(sectionNameDiv);
    
    sectionNameDiv.innerHTML = section.Name;
    
    //Контент
    var sectionContentDiv;
    
    for(var i=0; i < section.Contents.length; i++)
    {
        sectionContentDiv = document.createElement("div");
        sectionContentDiv.className = "sectionContent1";
        sectionContentDiv.innerHTML = section.Contents[i].Data;
        sectionElement.appendChild(sectionContentDiv);
    }
    
    table.appendChild(body);
    sectionElement.appendChild(table);
    
    for(var i=0; i < section.ChildSections.length; i++)
    {
        renderSection(section.ChildSections[i], body);
    }
    
    var linkUpwardElement = document.createElement("a");
    linkUpwardElement.innerHTML = "Наверх";
    linkUpwardElement.href = "#"; 
    parentHTMLElement.appendChild(linkUpwardElement);
}

function renderRowSection(section, parentHTMLElement)
{
    var sectionElement = document.createElement("tr");
    
    parentHTMLElement.appendChild(sectionElement);
    
    //Рисуем название секции
    var sectionNameElement = document.createElement("td");    
    
    sectionNameElement.innerHTML = section.Name;
    sectionNameElement.className = "sectionName2";    
    
    sectionElement.appendChild(sectionNameElement);
    
    //Контент
    var sectionContentElement;
    
    for(var i=0; i < section.Contents.length; i++)
    {
        sectionContentElement = document.createElement("td");
        sectionContentElement.innerHTML = section.Contents[i].Data;
        sectionContentElement.className = "sectionContent2";
        sectionElement.appendChild(sectionContentElement);
    }
    
    for(var i=0; i < section.ChildSections.length; i++)
    {
        renderSection(section.ChildSections[i], sectionElement);
    }
}

function renderSectionPreviews(sectionPreviewPage, parentHTMLElement)
{
    var previewContainer;
    var pagerContainer = document.getElementById("pagerContainer");
    
    if(sectionPreviewPage.TotalPagesNum > 1)
    {
        renderPreviewPager(sectionPreviewPage.TotalPagesNum, pagerContainer);
    }
    
    for(var i = 0; i < sectionPreviewPage.Previews.length; i++)
    {
        previewContainer = document.createElement("div");
        parentHTMLElement.appendChild(previewContainer);
        renderSectionPreview(sectionPreviewPage.Previews[i], previewContainer);
    }
}

function renderSectionPreview(sectionPreview, parentHTMLElement)
{
    var headerElement = document.createElement("div");
    
    headerElement.innerHTML = sectionPreview.IssueName;
    headerElement.className = "largeHeader";
    parentHTMLElement.appendChild(headerElement);
    
    var tblContainer = document.createElement("table");
    var body = document.createElement("tbody");
    var row = document.createElement("tr");
    
    parentHTMLElement.appendChild(tblContainer);
    tblContainer.appendChild(body);
    body.appendChild(row);
    
    //tblContainer.style.verticalAlign = "top";
    
    var cell = document.createElement("td");
    row.appendChild(cell);
    
    if(sectionPreview.ImagesCount > 0)
    {
        var img = document.createElement("img");
        var link = document.createElement("a");
        
        link.target = "_blank";
        link.href = _viewImagePage + "sectionId=" + sectionPreview.GallerySectionId + 
                    "&issueId=" + sectionPreview.IssueId + "&imageId=" + sectionPreview.GalleryPreview.Id;
        img.border = 0;
        img.alt = sectionPreview.GalleryPreview.Data;
        img.src = sectionPreview.GalleryPreview.SmallImageUrl;
        
        var fullGalleryLink = document.createElement("a");
        fullGalleryLink.innerHTML = "Галерея (" + sectionPreview.ImagesCount + " фото)";
        fullGalleryLink.target = "_blank";
        fullGalleryLink.href = _galleryPage + "sectionId=" + sectionPreview.GallerySectionId + 
                    "&issueid=" + sectionPreview.IssueId;
        
        cell.appendChild(link);
        link.appendChild(img);
        cell.appendChild(document.createElement("br"));
        cell.appendChild(fullGalleryLink);
        
        cell = document.createElement("td");
        row.appendChild(cell);
    }
    
    cell.innerHTML = sectionPreview.Data;
    cell.className = "previewText";
    
    var divMore = document.createElement("div");
    divMore.className = "bottomLinkDiv";
    var linkMore = document.createElement("a");
    linkMore.innerHTML = "Далее";
    linkMore.href = _sectionInfoPage + "issueId=" + sectionPreview.IssueId
        + "&sectionId=" + parseQueryString()["sectionid"]
         + "&countryId=" + parseQueryString()["countryid"];
    
    divMore.appendChild(linkMore);
    cell.appendChild(divMore);
}

function renderPreviewPager(pagesNum, parentHTMLElement)
{
    var link;
    var params = parseQueryString();
    
    for(var i=1; i<=pagesNum; i++)
    {
        link = document.createElement("a");
        link.innerHTML = i.toString();
        link.href = _sectionInfoPage + "sectionId=" + params["sectionid"];
        if(params["countryid"] != null)
        {
            link.href += "&countryId=" + params["countryid"];
        }
        if(params["issueid"] != null)
        {
            link.href += "&issueId=" + params["issueid"];
        }
        if(params["regionid"] != null)
        {
            link.href += "&regionId=" + params["regionid"];
        }
        link.href += "&pageNum=" + i.toString();
        if(params["pagenum"] == i.toString()
           || (params["pagenum"] == null && i == 1))
        {
            link.className = "currentPageLink";
        }
        else
        {
            link.className = "pagerLink";
        }
        parentHTMLElement.appendChild(link);
    }
}
