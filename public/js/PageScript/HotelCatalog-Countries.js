
var emptyListText = '<div style="margin-top: 50px; text-align: center;">список пуст</div>';
var newWindowInAnchor;
var citiesListPageTargetAttribute;
var listColumnsCount;
var screenWidth = 640, screenHeight = 480;
if (parseInt(navigator.appVersion) > 3)
{
	screenWidth = screen.availWidth;
	screenHeight = screen.availHeight;
	
	if ((citiesListPageMaximized == "true") || (citiesListPageMaximized == true))
	{
		citiesListPageWidth = screenWidth;
		citiesListPageHeight = screenHeight;
	}
}

function onloadHotelCatalogCountries()
{
	ToggleWaitBox('show');
	var dictionary = CreateDictionaryFromQueryString();
	if ((countriesListPageShouldBeResized == "true") || (countriesListPageShouldBeResized == true))
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
		citiesListPageTargetAttribute = openCitiesInNewWindow;
	}
	else
	{
		citiesListPageTargetAttribute = newWindowInAnchor;
	}
	citiesListPageTargetAttribute = openCitiesInNewWindow;
	listColumnsCount = dictionary.listColumnsCount_sm;
	if (listColumnsCount == null)
	{
		listColumnsCount = countriesListColumnsCount;
	}
	$("#PageTitle").html("Страны");
	LoadCountriesWithHotels(LoadCountries_callback);
}

function LoadCountries_callback()
{
	var BoxID = "CountriesList";
	$("#"+BoxID).empty();
	if (destinationCountriesDS != null)
	{
		if (destinationCountriesDS.length)
		{
			var itemsCount = destinationCountriesDS.length;
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
					destinationCountriesDS, 
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
						queryString += "?country_sm=" + item.id;
						queryString += "&itemName_sm=" + item.russianName;
						queryString += "&newWindowInAnchor_sm=" + citiesListPageTargetAttribute;
						queryString += "&windowWidth_sm=" + citiesListPageWidth;
						queryString += "&windowHeight_sm=" + citiesListPageHeight;
						queryString = escape(queryString);
						$("#"+ListColumnID).append($("<div></div>").append(getReference("javascript:windowOpen(\"" + citiesListPage + queryString + "\", " + citiesListPageWidth + ", " + citiesListPageHeight + ", \"" + citiesListPageTargetAttribute + "\")", item.russianName, "", "", "_self")));
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