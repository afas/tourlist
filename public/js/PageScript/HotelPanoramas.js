//<script>
var _smallPanoramaAddresses = new Array();
var _fullPanoramaAddresses = new Array();
var _firstPanoramaEmbedded = false;

function onLoadHotelPanoramas()
{
    var hotelId = CreateDictionaryFromQueryString().hotelId;
    if(hotelId!=null)
    {
        window.resizeTo(720, 600);
        window.moveTo(20, 20);
        document.getElementById("divWaitingControl").style.display = "";
        hotelObject.getVisualHotelsDescription(hotelId, descriptionLoaded);
    }
}

function onLoadFullPanorama()
{
    var swfAddress = CreateDictionaryFromQueryString().swf;
    
    if(swfAddress != null)
    {
        window.resizeTo(window.screen.width, window.screen.height)
		window.moveTo(0, 0);
        embedFullPanorama(swfAddress);
    }
}

function descriptionLoaded(response)
{
    document.getElementById("divWaitingControl").style.display = "none";
    var description = response.result;
    if(description == null)
    {
        return;
    }
    var divListContainer = document.getElementById("divListContainer");
    
    //Создание таблицы с названиями секций
    var tableSections = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var row, cell, divName;
    
    divListContainer.appendChild(tableSections);
    tableSections.appendChild(tableBody);
    
    for(var i = 0; i < description.sections.length; i++)
    {
        row = document.createElement("tr");
        cell = document.createElement("td");
        if(description.sections[i].panoramas.length > 0)
        {
            cell.innerHTML = "+";
            cell.style.verticalAlign = "top";
        }
        row.appendChild(cell);
        
        cell = document.createElement("td");
        
        divName = document.createElement("div");
        cell.className = "hotelSectionName";
        row.appendChild(cell);
        tableBody.appendChild(row);
        cell.appendChild(divName);
        
        divName.innerHTML = description.sections[i].name;
        if(description.sections[i].panoramas.length > 0)
        {
            divName.onclick = expandEvent;
        }
        divName.onselectstart = cancelEvent
        
        renderHotelPanoramas(description.sections[i], cell);
    }
	resizeFrameEvent();
}

function renderHotelPanoramas(sectionObject, parentElement)
{
    var tablePanoramas = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var row, cell, divName;
    
    parentElement.appendChild(tablePanoramas);
    tablePanoramas.appendChild(tableBody);
    
    for(var i = 0; i < sectionObject.panoramas.length; i++)
    {
        row = document.createElement("tr");
        cell = document.createElement("td");
        if(sectionObject.panoramas[i].subPanoramas.length > 0)
        {
            cell.innerHTML = "+";
            cell.style.verticalAlign = "top";
        }
        row.appendChild(cell);
        
        cell = document.createElement("td");
        
        divName = document.createElement("div");
        row.appendChild(cell);
        tableBody.appendChild(row);
        cell.appendChild(divName);
        
        divName.innerHTML = sectionObject.panoramas[i].name;
        divName.id = "divPanorama_" + sectionObject.panoramas[i].id.toString();
        
        if(sectionObject.panoramas[i].smallPanoramaAddress != "")
        {
            _smallPanoramaAddresses[sectionObject.panoramas[i].id] = 
                sectionObject.panoramas[i].smallPanoramaAddress;
            _fullPanoramaAddresses[sectionObject.panoramas[i].id] = 
                sectionObject.panoramas[i].fullPanoramaAddress;
            divName.onclick = loadSWF;
            if(!_firstPanoramaEmbedded)
            {
                embedPanorama(sectionObject.panoramas[i].smallPanoramaAddress);
                showFullLink(sectionObject.panoramas[i].fullPanoramaAddress);
                _firstPanoramaEmbedded = true;
            }
        }
        
        if(sectionObject.panoramas[i].subPanoramas.length > 0)
        {
            divName.onclick = expandEvent;
        }
        divName.onselectstart = cancelEvent;
        cell.className = "hotelPanoramaName";                
        
        renderHotelSubPanoramas(sectionObject.panoramas[i], cell)
    }
    collapseElement(tablePanoramas);
}

function renderHotelSubPanoramas(panoramaObject, parentElement)
{
    var tableSubPanoramas = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var row, cell, divName;
    
    parentElement.appendChild(tableSubPanoramas);
    tableSubPanoramas.appendChild(tableBody);
    
    for(var i = 0; i < panoramaObject.subPanoramas.length; i++)
    {
        row = document.createElement("tr");
        
        cell = document.createElement("td");
        cell.innerHTML = "*";
        cell.style.verticalAlign = "top";
        row.appendChild(cell);
        
        cell = document.createElement("td");
        
        divName = document.createElement("div");
        row.appendChild(cell);
        tableBody.appendChild(row);
        cell.appendChild(divName);
        
        divName.innerHTML = panoramaObject.subPanoramas[i].name;
        divName.id = "divPanorama_" + panoramaObject.subPanoramas[i].id.toString();
        
        if(panoramaObject.subPanoramas[i].smallPanoramaAddress != "")
        {
            _smallPanoramaAddresses[panoramaObject.subPanoramas[i].id] =
                panoramaObject.subPanoramas[i].smallPanoramaAddress;
            _fullPanoramaAddresses[panoramaObject.subPanoramas[i].id] =
                panoramaObject.subPanoramas[i].fullPanoramaAddress;
            divName.onclick = loadSWF;
        }
        
        //divName.onclick = expandEvent;
        divName.onselectstart = cancelEvent;
        cell.className = "hotelSubPanoramaName";
    }
    collapseElement(tableSubPanoramas);
}

function cancelEvent()
{
    return false;
}

function loadSWF()
{
    var source;
    
    if(this)
    {
        source = this;//Firefox
    }
    else
    {
        source = event.srcElement;//Opera, IE
    }
    showFullLink(_fullPanoramaAddresses[source.id.split("_")[1]]);
    embedPanorama(_smallPanoramaAddresses[source.id.split("_")[1]]);
}

function embedPanorama(panoramaAddress)
{
    if(panoramaAddress != null)
    {
        swfobject.embedSWF(panoramaAddress, "divSwfContainer", "500", "380", "9.0.0", "");
    }
}

function showFullLink(fullPanoramaAddress)
{
    if(fullPanoramaAddress != null)
    {
        var lnkFullPanorama = document.getElementById("lnkFullPanorama");
        lnkFullPanorama.href = "HotelPanoramaFull.htm?swf=" + fullPanoramaAddress;
        lnkFullPanorama.style.display = "";
    }
}

function embedFullPanorama(panoramaAddress)
{
    var height = document.documentElement.clientHeight - 20;
    var width = document.documentElement.clientWidth - 20;
    
    if(panoramaAddress != null)
    {
        swfobject.embedSWF(panoramaAddress, "divSWFContainer", width, height, "9.0.0", "");        
    }
}

function expandEvent()
{
    var source;
    
    if(this)
    {
        source = this;//Firefox
    }
    else
    {
        source = event.srcElement;//Opera, IE
    }
    var tableElement = source.parentNode.lastChild;
    source.parentNode.previousSibling.innerHTML = "-";
    expandElement(tableElement);
    source.onclick = collapseEvent
}

function collapseEvent()
{
    var source;
    
    if(this)
    {
        source = this;//Firefox
    }
    else
    {
        source = event.srcElement;//Opera, IE
    }
    var tableElement = source.parentNode.lastChild;
    source.parentNode.previousSibling.innerHTML = "+";
    collapseElement(tableElement);
    source.onclick = expandEvent;
}

function expandElement(elementObject)
{
    if(elementObject!=null)
    {
        elementObject.style.display = "";
    }
}

function collapseElement(elementObject)
{
    if(elementObject!=null)
    {
        elementObject.style.display = "none";
    }
}
//</script>