var comboDestinationCountry;
var comboDepartureCity;
var spoDS;
var _spoOnPage = 40;
var _resultsUrl = "Results.htm";

var currentPageNum = 1;

function onloadSearchSPO()
{
    SetupCalendar("txtDateFrom", "imgDateFrom");
	SetupCalendar("txtDateTo", "imgDateTo");

	document.getElementById("txtDateFrom").value = (new Date()).toFormatString();
	document.getElementById("txtDateTo").value = (new Date()).toFormatString();
	
	comboDestinationCountry = new ComboBox("comboDestinationCountry", document.getElementById("cellDestinationCountry"));
	comboDepartureCity = new ComboBox("comboDepartureCity", document.getElementById("cellDepartureCity"));
	
	LoadDestinationCountries(0, countriesLoaded);
	LoadDepartureCities(0, citiesLoaded);
}

function countriesLoaded()
{   
    destinationCountriesDS = insertDefaultElement(destinationCountriesDS); 
    RenderItemsComboBox(destinationCountriesDS, comboDestinationCountry, DefaultDestinationCountries);
    comboDestinationCountry.setValue(DefaultDestinationCountry, false);
}

function citiesLoaded()
{
    departureCitiesDS.shift();
    departureCitiesDS = insertDefaultElement(departureCitiesDS);
    RenderItemsComboBox(departureCitiesDS, comboDepartureCity, DefaultDepartureCities);
    comboDepartureCity.setValue(DefaultDepartureCity, false);
}

function searchSpo()
{
    var cityId = parseInt(comboDepartureCity.value);
    var countryId = parseInt(comboDestinationCountry.value);
    var dateFrom = Date.parseDate(document.getElementById("txtDateFrom").value, "%d.%m.%y").toShortUTCString();
    var dateTo = Date.parseDate(document.getElementById("txtDateTo").value, "%d.%m.%y").toShortUTCString();
    
    ToggleWaitBox("show");
    priceObject.searchSpo(dateFrom, dateTo, cityId, countryId, IncludingFiltersOperators, spoFound);
}

function spoFound(response)
{
    ToggleWaitBox("hide");
    spoDS = response.result;
    renderPager();
    renderPage();
	resizeFrameEvent();
}

function renderPage()
{
    var tableSpo = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var row, cell, link;
    var spoObject;
    
    var divResults = document.getElementById("divResults");
    
    if(divResults.firstChild != null)
    {
        divResults.removeChild(divResults.firstChild);
    }
    
    divResults.appendChild(tableSpo);
    tableSpo.appendChild(tableBody);
    tableSpo.style.width = "100%";
    tableSpo.cellSpacing = "0";
    tableSpo.cellPadding = "2";
    tableSpo.style.borderCollapse = "collapse";
    
    row = document.createElement("tr");
    tableBody.appendChild(row);
    row.className = "spoListHeader";
        
    cell = document.createElement("td");
    row.appendChild(cell);
    cell.innerHTML = "SPO";
    cell = document.createElement("td");
    row.appendChild(cell);
    cell.innerHTML = "Город вылета";
    cell = document.createElement("td");
    row.appendChild(cell);
    cell.innerHTML = "Направление";
    cell = document.createElement("td");
    row.appendChild(cell);
    cell.innerHTML = "Дата публикации";

    var rowsNum = Math.min(_spoOnPage, spoDS.length - _spoOnPage*(currentPageNum-1));
    
    for(var i = 0; i < rowsNum; i++)
    {
        row = document.createElement("tr");
        tableBody.appendChild(row);
        row.className = "spoListRow";
        
        cell = document.createElement("td");
        cell.className = "cellSpoName";
        row.appendChild(cell);
        spoObject = spoDS[(currentPageNum - 1) * _spoOnPage + i];
            
        link = document.createElement("a");
        if(spoObject.name)
        {
            link.innerHTML = spoObject.name;
        }
        else
        {
            link.innerHTML = spoObject.tourName;
        }
        link.href = _resultsUrl + "?spoId_sm=" + spoObject.id.toString()
                        + "&destinationCountry_sm=" + spoObject.destinationCountryId.toString();
        link.target = "_blank";
        
        cell.appendChild(link);
        
        cell = document.createElement("td");
        cell.className = "cellInfo";
        row.appendChild(cell);
        cell.innerHTML = spoObject.departureCity;
        
        cell = document.createElement("td");
        cell.className = "cellInfo";
        row.appendChild(cell);
        cell.innerHTML = spoObject.destinationCountry;
        
        cell = document.createElement("td");
        cell.className = "cellInfo";
        row.appendChild(cell);
        cell.innerHTML = Date.fromUTCString(spoObject.dateCreated).toRUString();
    }
}

function renderPager()
{
    var numPages = Math.ceil(spoDS.length / _spoOnPage);
    
    var divPager = document.getElementById("divPager");
    var spanPage;
    
    while(divPager.childNodes.length > 0)
    {
        divPager.removeChild(divPager.firstChild);
    }
    
    for(var i=1;i<=numPages;i++)
    {
        spanPage = document.createElement("span");
        spanPage.innerHTML = i.toString();
        if(i == currentPageNum)
        {
            spanPage.className = "currentPageNumber";
        }
        else
        {
            spanPage.className = "pageNumber";
        }
        spanPage.onclick = pageChanged;
        divPager.appendChild(spanPage);
    }
}

function pageChanged()
{
    var spnSource;
    
    if(this)
    {
        spnSource = this;//Firefox
    }
    else
    {
        spnSource = event.srcElement;//Opera, IE
    }       
    
    var spnOldPage = document.getElementById("divPager").childNodes[currentPageNum-1];    
    spnOldPage.className ="pageNumber";
    spnSource.className = "currentPageNumber";
    
    currentPageNum = parseInt(spnSource.innerHTML);
    
    renderPage();
}

function ChangeFirstDate()
{
	var fe = document.getElementById("txtDateFrom");
	var se = document.getElementById("txtDateTo");
	var fdate = fe.value;
	var sdate = se.value;
	var fd = Date.fromFormatString(fdate);
	var sd = Date.fromFormatString(sdate);
	if (fd > sd) se.value = fe.value;
}

function insertDefaultElement(dataSource)
{
    var result = dataSource.reverse();
    result.push({"id":0,"russianName":"не важно"});
    return result.reverse();
}