
var emptyListText = '<div style="margin-top: 50px; text-align: center;">список пуст</div>';
var newWindowInAnchor;
var countriesListPageTargetAttribute;
var hotelsListPageTargetAttribute;
var listColumnsCount;
var itemName;
var currentCountry;
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
	if ((hotelsListPageMaximized == "true") || (hotelsListPageMaximized == true))
	{
		hotelsListPageWidth = screenWidth;
		hotelsListPageHeight = screenHeight;
	}
}

function onloadHotelCatalogCities()
{
	ToggleWaitBox('show');
	var dictionary = CreateDictionaryFromQueryString();
	if ((citiesListPageShouldBeResized == "true") || (citiesListPageShouldBeResized == true))
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
		hotelsListPageTargetAttribute = openHotelsInNewWindow;
	}
	else
	{
		countriesListPageTargetAttribute = newWindowInAnchor;
		hotelsListPageTargetAttribute = newWindowInAnchor;
	}
	countriesListPageTargetAttribute = openCountriesInNewWindow;
	hotelsListPageTargetAttribute = openHotelsInNewWindow;
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
	itemName = unescape(dictionary.itemName_sm);
	if (itemName == null)
	{
		itemName = "Австрия";
	}
	$("#PageTitle").html(itemName + ": города");
	var queryString = "";
	queryString += "?newWindowInAnchor_sm=" + countriesListPageTargetAttribute;
	queryString += "&windowWidth_sm=" + countriesListPageWidth;
	queryString += "&windowHeight_sm=" + countriesListPageHeight;
	queryString = escape(queryString);
	var navigationBar = getReference("javascript:windowOpen(\"" + countriesListPage + queryString + "\", " + countriesListPageWidth + ", " + countriesListPageHeight + ", \"" + countriesListPageTargetAttribute + "\")", "[вернуться к списку стран]", "", "", "_self");
	$("#NavigationBar").html(navigationBar);
	LoadCitiesWithHotels(currentCountry, LoadCities_callback);
}

function LoadCities_callback()
{
	var BoxID = "CitiesList";
	$("#"+BoxID).empty();
	if (citiesDS != null)
	{
		if (citiesDS.length)
		{
			var itemsCount = citiesDS.length;
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
					citiesDS, 
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
						queryString += "?city_sm=" + item.id;
						queryString += "&itemName_sm=" + item.russianName;
						queryString += "&country_sm=" + currentCountry;
						queryString += "&countryName_sm=" + itemName;
						queryString += "&newWindowInAnchor_sm=" + hotelsListPageTargetAttribute;
						queryString += "&windowWidth_sm=" + hotelsListPageWidth;
						queryString += "&windowHeight_sm=" + hotelsListPageHeight;
						queryString = escape(queryString);
						$("#"+ListColumnID).append($("<div></div>").append(getReference("javascript:windowOpen(\"" + hotelsListPage + queryString + "\", " + hotelsListPageWidth + ", " + hotelsListPageHeight + ", \"" + hotelsListPageTargetAttribute + "\")", item.russianName, "", "", "_self")));
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