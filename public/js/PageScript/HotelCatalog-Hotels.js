
var emptyListText = '<div style="margin-top: 50px; text-align: center;">список пуст</div>';
var newWindowInAnchor;
var countriesListPageTargetAttribute;
var citiesListPageTargetAttribute;
var hotelPageTargetAttribute;
var listColumnsCount;
var itemName;
var currentCountry;
var countryName;
var currentCity;
var screenWidth = 640, screenHeight = 480;
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
	if ((hotelPageMaximized == "true") || (hotelPageMaximized == true))
	{
		hotelPageWidth = screenWidth;
		hotelPageHeight = screenHeight;
	}
}

function onloadHotelCatalogHotels()
{
	ToggleWaitBox('show');
	var dictionary = CreateDictionaryFromQueryString();
	if ((hotelsListPageShouldBeResized == "true") || (hotelsListPageShouldBeResized == true))
	{
		var windowWidth = dictionary.windowWidth_sm, windowHeight = dictionary.windowHeight_sm;
		if (windowWidth != null && windowHeight != null)
		{
			window.resizeTo(windowWidth, windowHeight)
			window.moveTo(0, 0);
		}
	}
	newWindowInAnchor = dictionary.newWindowInAnchor_sm;
	if (newWindowInAnchor == null)
	{
		countriesListPageTargetAttribute = openCountriesInNewWindow;
		citiesListPageTargetAttribute = openCitiesInNewWindow;
		hotelPageTargetAttribute = openHotelPageInNewWindow;
	}
	else
	{
		countriesListPageTargetAttribute = newWindowInAnchor;
		citiesListPageTargetAttribute = newWindowInAnchor;
		hotelPageTargetAttribute = newWindowInAnchor;
	}
	countriesListPageTargetAttribute = openCountriesInNewWindow;
	citiesListPageTargetAttribute = openCitiesInNewWindow;
	hotelPageTargetAttribute = "false";
	listColumnsCount = dictionary.listColumnsCount_sm;
	if (listColumnsCount == null)
	{
		listColumnsCount = citiesListColumnsCount;
	}
	currentCountry = dictionary.country_sm;
	if (currentCountry == null)
	{
		currentCountry = 9;
	}
	currentCity = dictionary.city_sm;
	if (currentCity == null)
	{
		currentCity = 450;
	}
	itemName = unescape(dictionary.itemName_sm);
	if (itemName == null)
	{
		itemName = "Вена";
	}
	countryName = unescape(dictionary.countryName_sm);
	if (countryName == null)
	{
		countryName = "Австрия";
	}
	$("#PageTitle").html(itemName + ": отели");
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
	$("#NavigationBar").html(navigationBar);
	LoadPrincipalHotels(currentCity, LoadHotels_callback);
}

function LoadHotels_callback()
{
	var BoxID = "HotelsList";
	$("#"+BoxID).empty();
	if (hotelsDS != null)
	{
		if (hotelsDS.length)
		{
			var itemsCount = hotelsDS.length;
			var itemsPerColumn = Math.ceil(itemsCount/listColumnsCount);
			var currentColumnNumber = 0;
			var ListColumnID = '';
			var documentElementRef = document.getElementById(BoxID);
			if (documentElementRef != null)
			{
				var columnWidth = documentElementRef.scrollWidth;
				var columnWidthPercent = Math.floor(((columnWidth - 10 * (listColumnsCount * 2)) / columnWidth * 100) / listColumnsCount).toString() + "%";
			}
			$.each
				(
					hotelsDS, 
					function(i,item)
					{
						var tmpNumber = i % itemsPerColumn;
						if (tmpNumber==0)
						{
							currentColumnNumber++;
							ListColumnID = BoxID + "_" + currentColumnNumber;
							$("#"+BoxID).append($("<div></div>").attr("id",ListColumnID).css({float:"left"}).css({margin:"10px"}).css({width:columnWidthPercent}));
						}
						var queryString = "";
						queryString += "?hotelId_sm=" + item.id;
						queryString += "&itemName_sm=" + item.russianName;
						queryString += "&newWindowInAnchor_sm=" + hotelPageTargetAttribute;
						queryString += "&windowWidth_sm=" + hotelPageWidth;
						queryString += "&windowHeight_sm=" + hotelPageHeight;
						queryString += "&showNavigationBar_sm=" + "true";
						queryString = escape(queryString);
						$("#"+ListColumnID).append($("<div></div>").append(getReference("javascript:windowOpen(\"" + hotelPage + queryString + "\", " + hotelPageWidth + ", " + hotelPageHeight + ", \"" + hotelPageTargetAttribute + "\")", item.russianName, "", "", "_self")));
					}
				);
			$("#"+BoxID).append("<br style=\"line-height: 1px; clear: both;\" />");
		} 
		else
		{
			$("#"+BoxID).html(emptyListText);
		}
	}
	$("#"+BoxID).fadeIn();
	ToggleWaitBox('hide');
	resizeFrameEvent();
}