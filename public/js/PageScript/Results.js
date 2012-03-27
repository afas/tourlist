
var engine = new TemplateEngine();

function prevPageIcon()
{
	if (PageNumber>1)
		return "<img src=\"" + ImagesPath + "button_prev.gif\" onclick=\"getPrevPage();\" title=\"Предыдущая страница:" + (PageNumber -1)  + "\" class=\"img_button\">";
	else return "&nbsp;";
}

function nextPageIcon()
{
	if (PageNumber < TotalCountPage)
		return "<img src=\"" + ImagesPath + "button_next.gif\" onclick=\"getNextPage();\" title=\"Следующая страница:" + (PageNumber+1) + "\" class=\"img_button\">";
	else return "&nbsp;";
}

function actualizationIcon(priceId, flag) {

    if (flag) { return "<img src=\"" + ImagesPath + "ic_actual.gif\" onclick=\"javascript:actualization(" + priceId + ");\" title=\"Актуализация цены\" class=\"img_button\">" }
	else return "&nbsp;";
}

function actualizationIcon2(priceId, flag) {

    if (flag) { return "<img src=\"" + ImagesPath + "button_check.gif\" onclick=\"javascript:actualization(" + priceId + ");\" title=\"Актуализация цены\" class=\"img_button\">" }
	else return "&nbsp;";
}

function detailsIcon(priceId)
{
	return "<img src=\"" + ImagesPath + "ic_information.gif\" onclick=\"javascript:openPrice(" + priceId + ");\" title=\"Детальная информация по цене\" class=\"img_button\">"
}

function orderIcon(priceId)
{
	return "<a onclick=\"javascript:openPrice(" + priceId + ");\" class=\"a_link\">Заказать</a>"
}

function orderIcon2(priceId)
{
	return "<img src=\""+ ImagesPath +"button_order.gif\" onclick=\"javascript:openPrice(" + priceId + ");\" title=\"Заказать\" class=\"img_button\">"
}


function getHotelImgPrev(hotel, hguid, width, height)
{
	var imageUriC;
	if (hguid && hguid != "") {
		imageUriC = remoteUri + "/Handlers/HotelImageHandler.ashx?ImageGuid=" + hguid + "&MaximumSize=" + width + "," + height;
	} else {
		imageUriC = ImagesPath + "hotelDefault.jpg";
	}
	return "<img src=\"" + imageUriC + "\" onclick=\"javascript:openHotel(" + hotel.id + ");\" class=\"img_button\" width=\""+ width +"\" height=\""+ height +"\">"
}

function operatorPrice(priceId, cost, rurPrice, valute)
{
	var str = PriceCorrectionFun(cost) + " " + valute;
    if (rurPrice != '0,00' && dictionary["currency_sm"] == "4")
    {
        str = "*" + str;
    }
    return "<span onclick=\"javascript:openPrice(" + priceId + ");\" style=\"color:red; cursor:pointer;\">"+ str +"</span>";
}

function getHotelStars(star) {
	var temp = "<img border=\"0\" src=\""+ ImagesPath + "star.gif\">";
	var res = "";
	res = res + temp;
	if (star == "1*" || star == "1") {
		return res;
	}
	res = res + temp;
	if (star == "2*" || star == "2") {
		return res;
	}
	res = res + temp;
	if (star == "3*" || star == "3") {
		return res;
	}
	res = res + temp;
	if (star == "4*" || star == "4") {
		return res;
	}
	res = res + temp;
	if (star == "5*" || star == "5") {
		return res;
	}
	return star;
}

function callbackAfterLoadData()
{
	var span = document.getElementById("WaitingControl");
	engine.run();
	var e = document.getElementById("requestResultMessage");
	if (prices == null)
	{
		if(error != null && error != "")
			e.innerHTML = error;
		else
			e.innerHTML = "По данному запросу не найдено ни одной цены. Попробуйте изменить параметры поиска.";
	}
	else
	{
		if (prices.length == 0)
		{
			e.innerHTML = "Не найдено ни одной цены. Попробуйте расширить параметры поиска тура.";
		}
	}
	
	$(".searchrow").css({"display":""});
	
	//Добавление кнопок навигации внизу таблицы
	var re = document.getElementById("ReTa");
	var row, cell, tableRe, tableBody;
	
	var zzz = document.getElementById("ReChild");
	if ( typeof(zzz) != "undefined" && zzz != null ) { re.removeChild(zzz); }
	
	cell = document.createElement("td");
	if (PageNumber>1) {
	cell.innerHTML = "&nbsp;<a onclick=\"getPrevPage();\" class=\"a_link\">Предыдущая страница</a>&nbsp;";
	}
	//cell.innerHTML = prevPageIcon();
	cell.width = '50%';
	cell.align = 'right';
	row = document.createElement("tr");
	row.appendChild(cell);
	
	cell = document.createElement("td");
	if (PageNumber < TotalCountPage) {
	cell.innerHTML = "&nbsp;<a onclick=\"getNextPage();\" class=\"a_link\">Следующая страница</a>&nbsp;";
	}
	//cell.innerHTML = nextPageIcon();
	cell.width = '50%';
	cell.align = 'left';
	row.appendChild(cell);
	
	tableBody = document.createElement("tbody");
	tableBody.appendChild(row);
	
	tableRe = document.createElement("table");
	tableRe.appendChild(tableBody);
	tableRe.width = "100%";
	tableRe.className = "tbl_1";
	tableRe.cellspacing = "1";
	tableRe.cellpadding = "1";
	tableRe.rules = "all";
	tableRe.id = "ReChild";
	
	re.appendChild(tableRe);
	
	span.style.display = "none";
	resizeFrameEvent();
}

var dictionary;
function onloadResults()
{
	var screenWidth = 640, screenHeight = 480;
	if (parseInt(navigator.appVersion) > 3)
	{
		screenWidth = screen.availWidth;
		screenHeight = screen.availHeight;
		
		if ((hotelPageMaximized == "true") || (hotelPageMaximized == true))
		{
			hotelPageWidth = screenWidth;
			hotelPageHeight = screenHeight;
		}
		
		if ((viewPageMaximized == "true") || (viewPageMaximized == true))
		{
			viewPageWidth = screenWidth;
			viewPageHeight = screenHeight;
		}
	}
	dictionary = CreateDictionaryFromQueryString();
	if ((resultsPageShouldBeResized == "true") || (resultsPageShouldBeResized == true))
	{
		var windowWidth = dictionary.windowWidth_sm, windowHeight = dictionary.windowHeight_sm;
		if (windowWidth != null && windowHeight != null)
		{
			window.resizeTo(windowWidth, windowHeight)
			window.moveTo(0, 0);
		}
	}
	var span = document.getElementById("WaitingControl");
	span.style.display = "";
	
	var documentElementRef = document.getElementById("disclaimer");
	var currency;
	if (typeof(dictionary.currency_sm) != "undefined") {currency = strToInt(dictionary.currency_sm)};
	if (currency == 4)
	{
	    if (documentElementRef != null)
	    {
	        documentElementRef.style.display = "";
	    }
	}
	
	searchPrices(dictionary, callbackAfterLoadData);
}

function getPriceCurrency(priceId, currencyId)
{
    if(typeof(currencyId) != "undefined")
    {
        return currencyId;
    }
    else
    {
        return pricesById[priceId].operatorCurrency.id;
    }
}

function getNextPage()
{
	var span = document.getElementById("WaitingControl");
	span.style.display = "";
	nextPage(callbackAfterLoadData);
}

function getPrevPage()
{
	var span = document.getElementById("WaitingControl");
	span.style.display = "";
	prevPage(callbackAfterLoadData);
}

function actualization(priceId) {
    
	if (priceId > 0) 
	{
		var queryString = "";
		queryString += "?priceId_sm=" + priceId;
		GB_showCenter("Актуализация цены", actualPage + queryString, 350, 650, null);
		//selectedRowColorInTimeActualization(priceId);
	}
}

//Выделение строки цветом по щелчку мыши
function coloredRow(x) {
	var temp = document.getElementById("selectedRow");
	if (temp) {
		temp.style.backgroundColor="";
		temp.id = "";
	}
	x.id = "selectedRow";
	x.style.backgroundColor=DefaultSelectRowColor; //"rgb(255, 252, 185)";
}
