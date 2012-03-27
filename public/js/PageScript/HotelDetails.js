
var DepartureCityComboBox;
var CurrencyComboBox;
var newWindowInAnchor;
var countriesListPageTargetAttribute;
var citiesListPageTargetAttribute;
var hotelsListPageTargetAttribute;
var screenWidth = 640, screenHeight = 480;
var requestResultMessage;
var dictionary;
var hotelId;
if (parseInt(navigator.appVersion) > 3)
{
	screenWidth = screen.availWidth;
	screenHeight = screen.availHeight;
	
	if ((countriesListPageMaximized == "true") || (countriesListPageMaximized == true))
	{
		countriesListPageWidth = screenWidth;
		countriesListPageHeight = screenHeight;
	}
	if ((citiesListPageMaximized == "true") || (citiesListPageMaximized == true))
	{
		citiesListPageWidth = screenWidth;
		citiesListPageHeight = screenHeight;
	}
	if ((hotelsListPageMaximized == "true") || (hotelsListPageMaximized == true))
	{
		hotelsListPageWidth = screenWidth;
		hotelsListPageHeight = screenHeight;
	}
	if ((satellitePicturePageMaximized == "true") || (satellitePicturePageMaximized == true))
	{
		satellitePicturePageWidth = screenWidth;
//		satellitePicturePageHeight = screenHeight;
	}
	if ((resultsPageMaximized == "true") || (resultsPageMaximized == true))
	{
		resultsPageWidth = screenWidth;
		resultsPageHeight = screenHeight;
	}
}

function onloadHotelDetails()
{
	dictionary = CreateDictionaryFromQueryString();
	if (showExternalHotelReferences.toLowerCase() == "true".toLowerCase())
	{
		var externalHotelSourcesTableRef = document.getElementById("externalHotelSourcesTable");
		if (externalHotelSourcesTableRef != null)
		{
			externalHotelSourcesTableRef.style.display="";
		}
	}

	var itemName;
	newWindowInAnchor = dictionary.newWindowInAnchor_sm;
	if (newWindowInAnchor == null)
	{
		countriesListPageTargetAttribute = openCountriesInNewWindow;
		citiesListPageTargetAttribute = openCitiesInNewWindow;
		hotelsListPageTargetAttribute = openHotelsInNewWindow;
	}
	else
	{
		countriesListPageTargetAttribute = newWindowInAnchor;
		citiesListPageTargetAttribute = newWindowInAnchor;
		hotelsListPageTargetAttribute = newWindowInAnchor;
	}
	countriesListPageTargetAttribute = openCountriesInNewWindow;
	citiesListPageTargetAttribute = openCitiesInNewWindow;
	hotelsListPageTargetAttribute = openHotelsInNewWindow;
	if (dictionary.itemName_sm != null)
	{
		itemName = unescape(dictionary.itemName_sm);
	}
	if (itemName == null)
	{
		itemName = "";
	}

	hotelId = dictionary.hotelId_sm;
	if (hotelId == null) hotelId = 3617;
	if (interrelationshipsOfDepartureCitiesAndDestinationCountries == "DestinationCountriesDependsOnDepartureCities")
	{
		interrelationshipsOfDepartureCitiesAndDestinationCountries = "DepartureCitiesDependsOnDestinationCountries";
	}
	getHotelDescription(hotelId, getHotelDescription_callback);

	DepartureCityComboBox = new ComboBox("DepartureCityComboBox", document.getElementById("DepartureCityComboBoxLabel"));
	CurrencyComboBox = new ComboBox("CurrencyComboBox", document.getElementById("CurrencyComboBoxLabel"));

	SetupCalendar("DateFromTextBox", "DateFromImage");
	SetupCalendar("DateToTextBox", "DateToImage");

	document.getElementById("DateFromTextBox").value = BeginDate.toFormatString();
	document.getElementById("DateToTextBox").value = EndDate.toFormatString();

	setValuetoField("AdultTextBox", AdultCount);
	setValuetoField("ChildTextBox", ChildCount);
	setValuetoField("PriceFromTextBox", BeginCost);
	setValuetoField("PriceToTextBox", EndCost);
	setValuetoField("NightsFromTextBox", BeginNights);
	setValuetoField("NightsToTextBox", EndNights);
	
	LoadCurrencies(Currencies, LoadCurrencies_callback);
}

function getHotelDescription_callback()
{
	if (HotelDescription == null)
	{
		if (requestResultMessage != null)
		{
			alert(requestResultMessage);
		}
		return;
	}
	
	if (HotelDescription.imageCount == 0)
	{
		var MainHotelImageDiv = document.getElementById("MainHotelImageDiv");
		MainHotelImageDiv.style.display = "none";
		
		var imageGalleryControl_Panel = document.getElementById("imageGalleryControl_Panel");
		imageGalleryControl_Panel.style.display = "none";
		
		var NoImageMainHotel = document.getElementById("NoImageMainHotel");
		NoImageMainHotel.style.display = "";
	}
	else if (HotelDescription.imageCount == 1)
	{
		var imageGalleryControl_Panel = document.getElementById("imageGalleryControl_Panel");
		imageGalleryControl_Panel.style.display = "none";
	}
	else if (HotelDescription.imageCount > 6)
	{
		var imageGalleryControl_Panel = document.getElementById("imageGalleryControl_Panel");
		imageGalleryControl_Panel.style.overflowY = "scroll";
	}
	
	var currentCountry = HotelDescription.hotel.country.id;
	selectedDestinationCountryId = currentCountry;
	
	if(HotelDescription.hasVirtualTours)
	{
		var lnkHotelPanoramas = document.getElementById("lnkHotelPanoramas");
		var rowHotelPanoramasLink = document.getElementById("rowHotelPanoramasLink");

		rowHotelPanoramasLink.style.display = "";
		lnkHotelPanoramas.href = "HotelPanoramas.htm?hotelId=" + HotelDescription.hotel.id;
	}
	//-------------------------
	if (HotelDescription.hotel.country) {
		document.getElementById("hotelCountryRow").style.display = "";
	}
	if (HotelDescription.hotel.city) {
		document.getElementById("hotelCityRow").style.display = "";
	}
	if (HotelDescription.hotel.star) {
		document.getElementById("hotelStarRow").style.display = "";
	}
	if (HotelDescription.hotel.postalAddress) {
		document.getElementById("hotelPostalAddressRow").style.display = "";
	}
	if (HotelDescription.hotel.phoneNumber) {
		document.getElementById("hotelPhoneNumberRow").style.display = "";
	}
	if (HotelDescription.hotel.faxNumber) {
		document.getElementById("hotelFaxNumberRow").style.display = "";
	}
	if (HotelDescription.hotel.emailAddress) {
		document.getElementById("hotelEmailAddressRow").style.display = "";
	}
	if (HotelDescription.hotel.url) {
		document.getElementById("hotelUrlRow").style.display = "";
	}
	if (HotelDescription.hotel.informationSource) {
		document.getElementById("hotelInformationSourceRow").style.display = "";
	}
	if (HotelDescription.hotel.copyright) {
		document.getElementById("hotelCopyrightRow").style.display = "";
	}
	//------------------------
	switch(interrelationshipsOfDepartureCitiesAndDestinationCountries)
	{
		case "NoInterrelationships":
			LoadDepartureCities(selectedTourTypeId, LoadDepartureCities_callback);
			break;    
		default:
			LoadDepartureCitiesByDestinationCountry(selectedDestinationCountryId, selectedTourTypeId, LoadDepartureCities_callback);
	}
	var currentCity = HotelDescription.hotel.city.id;
	var countryName = HotelDescription.hotel.country.russianName;
	var cityName = HotelDescription.hotel.city.russianName;
	var itemName = HotelDescription.hotel.russianName;
	var showNavigationBar = dictionary.showNavigationBar_sm;
	if (showNavigationBar == "true")
	{
		var queryString = "";
		queryString += "?newWindowInAnchor_sm=" + countriesListPageTargetAttribute;
		queryString += "&windowWidth_sm=" + countriesListPageWidth;
		queryString += "&windowHeight_sm=" + countriesListPageHeight;
		queryString = escape(queryString);
		var navigationBar = getReference("javascript:windowOpen(\"" + countriesListPage + queryString + "\", " + countriesListPageWidth + ", " + countriesListPageHeight + ", \"" + countriesListPageTargetAttribute + "\")", "[вернуться к списку стран]", "", "", "_self");
		queryString = "";
		queryString += "?country_sm=" + currentCountry;
		queryString += "&itemName_sm=" + countryName;
		queryString += "&newWindowInAnchor_sm=" + citiesListPageTargetAttribute;
		queryString += "&windowWidth_sm=" + citiesListPageWidth;
		queryString += "&windowHeight_sm=" + citiesListPageHeight;
		queryString = escape(queryString);
		navigationBar += " | " + getReference("javascript:windowOpen(\"" + citiesListPage + queryString + "\", " + citiesListPageWidth + ", " + citiesListPageHeight + ", \"" + citiesListPageTargetAttribute + "\")", countryName, "", "", "_self");
		queryString = "";
		queryString += "?country_sm=" + currentCountry;
		queryString += "&countryName_sm=" + countryName;
		queryString += "&city_sm=" + currentCity;
		queryString += "&itemName_sm=" + cityName;
		queryString += "&newWindowInAnchor_sm=" + hotelsListPageTargetAttribute;
		queryString += "&windowWidth_sm=" + hotelsListPageWidth;
		queryString += "&windowHeight_sm=" + hotelsListPageHeight;
		queryString = escape(queryString);
		navigationBar += " | " + getReference("javascript:windowOpen(\"" + hotelsListPage + queryString + "\", " + hotelsListPageWidth + ", " + hotelsListPageHeight + ", \"" + hotelsListPageTargetAttribute + "\")", cityName, "", "", "_self");
		$("#NavigationBar").html(navigationBar);
	}
	var engine = new TemplateEngine();
	engine.run();

	resizeFrameEvent();
}

function LoadCurrencies_callback()
{
	RenderItemsComboBox(currenciesDS, CurrencyComboBox, []);
	/* Выбираем валюту по умолчанию */
	CurrencyComboBox.setValue(selectedCurrencyId, false);
}

function OpenResults()
{
	if (HotelDescription != null)
	{
		var date1 = Date.fromFormatString(document.getElementById("DateFromTextBox").value);
		var date2 = Date.fromFormatString(document.getElementById("DateToTextBox").value);
		var dd = new Date(0).addDays(DateRange);
		if (date2-date1 >= dd) 
		{
			alert("Вы задали слишком большой диапазон дат.\nМакс. интервал дней "+DateRange);
			return;
		}
		var object = AJS.formContents(document.forms["search"]);
		object.DestinationCountryComboBox_hidden = HotelDescription.hotel.country.id.toString();
		object.DestinationCitiesListBox_hidden = HotelDescription.hotel.city.id.toString();
		object.HotelsListBox_hidden = HotelDescription.hotel.id.toString();
		object.MealsListBox_hidden = "";
		object.StarsListBox_hidden = "";
		var queryString = CreateQueryString(object);
		queryString += "&windowWidth_sm=" + resultsPageWidth + "";
		queryString += "&windowHeight_sm=" + resultsPageHeight + "";
		windowOpen(resultPage + queryString, resultsPageWidth, resultsPageHeight, openResultsPageInNewWindow);
	}
	else
	{
		if (requestResultMessage != null)
		{
			alert(requestResultMessage);
		}
	}
}

function showGallery()
{
	if (HotelDescription != null)
	{
		if (HotelDescription.imageCount > 0)
		{
			GB_showImageSet(getImageSet(), 1);
		}
	}
}

function GetSatellitePicturePageReference(hotelDescription)
{
	var href = "";
	if (hotelDescription != null)
	{
		if ((hotelDescription.latitude != 0) && (hotelDescription.longitude != 0))
		{
			href = getReference("javascript:OpenSatellitePicturePage(HotelDescription.hotel)", "Посмотреть на карте", "red", "none", "_self");
		}
	}
	return href;
}

function OpenSatellitePicturePage(hotel)
{
	var queryString = "";
	queryString += "?hotelId_sm=" + hotel.id + "";
	queryString += "&windowWidth_sm=" + satellitePicturePageWidth + "";
	queryString += "&windowHeight_sm=" + satellitePicturePageHeight + "";
	windowOpen(satellitePicturePage + queryString, satellitePicturePageWidth, satellitePicturePageHeight, openSatellitePicturePageInNewWindow);
}

function getAttribute(attribute)
{
	if (attribute.requiresPayment)
	{
		return "<span class=\"t_red\">" + attribute.name + "</span>";
	}
	else
	{
		return "<span>" + attribute.name + "</span>";
	}
}

function getHotelPrevImage(id,pImage,width,height,widthMain,heigtMain) {
	return "<a href=\"javascript:setHotelMainImage('"+id+"','"+pImage.guid+"','"+widthMain+"','"+heigtMain+"')\"><img border='0' src=\""+getHotelImageUriOfParticularType([pImage],'',width,height)+"\" /></a>";
}

function getHotelMainImage(pImages, width, height) {
	var x = getHotelImageOfParticularType(HotelDescription.images, '', width, height);
	return "<img onload=\"onloadHotelMainImage()\" "+x.substring(4);
}

function onloadHotelMainImage() {
	$("#MainHotelImage").fadeTo("fast", 1);
	var wc = document.getElementById("WaitingControlImage");
	wc.style.display = "none";
}

function setHotelMainImage(id, guid, widthMain, heigtMain) {
	var spanMainImage = document.getElementById(id);
	if (typeof(spanMainImage) == "undefined") return;

	$("#MainHotelImage").fadeTo("fast", 0.5);
	var wc = document.getElementById("WaitingControlImage");
	wc.style.display = "";
	var x = spanMainImage.firstChild;
	x.src = remoteUri + "/Handlers/HotelImageHandler.ashx?ImageGuid=" + guid + "&MaximumSize=" + widthMain + "," + heigtMain;
}

function getHotelDescriptionComments(comment) {
	var str = "";
	if (comment.length > 300) {
		str = "<span>"+comment.substring(0,300)+"...&nbsp;<a href=\"javascript:void(0);\" onclick=\"setHotelDescriptionCommentSize(this,1,0)\">Подробнее</a></span><span style=\"display:none\">"+comment+"&nbsp;<a href=\"javascript:void(0);\" onclick=\"setHotelDescriptionCommentSize(this,0,1)\">Кратко</a></span>";
	} else {
		str = comment;
	}
	return str;
}

function setHotelDescriptionCommentSize( obj, i_on, i_off ) {
	x = obj.parentNode.parentNode;
	x.childNodes[i_on].style.display = "";
	x.childNodes[i_off].style.display = "none";
}

function AddComment()
{
	var path = "http://bronni.ru/BlankPage.aspx?Page=AddHotelCommentPage.ascx&HotelId=" + hotelId + "&RemoveReturnBack=true";
	windowOpen(path, 800, 600, "true");
}

function getHotelDescriptionEmail(email) {
	if (email == null || email == "") return "";
	return "<a href=\"mailto:"+email+"\" title=\""+email+"\"><img border=\"0\" src=\"../Images/ic_mail.gif\" /></a>";
}

function getHotelDescriptionSite(url) {
	if (url == null || url == "") return "";
	return "<a href=\""+url+"\" target=\"_blank\" title=\""+url+"\"><img border=\"0\" src=\"../Images/ic_hotel.gif\" /></a>";
}