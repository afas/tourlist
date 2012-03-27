
var DepartureCityComboBox;
var DestinationCountryComboBox;
var CurrencyComboBox;
var MealsListBox;
var StarsListBox;
var HotelsListBox;
var DestinationCitiesListBox;
var TourTypesComboBox;

function ChangeFirstDate()
{
	var fe = document.getElementById("DateFromTextBox");
	var se = document.getElementById("DateToTextBox");
	var fdate = fe.value;
	var sdate = se.value;
	var fd = Date.fromFormatString(fdate);
	var sd = Date.fromFormatString(sdate);
	if (fd > sd) se.value = fe.value;
}

function LoadCurrencies_callback()
{
	RenderItemsComboBox(currenciesDS, CurrencyComboBox, []);
	/* Выбираем валюту по умолчанию */
	CurrencyComboBox.setValue(selectedCurrencyId, false);
}

function LoadMeals_callback()
{
	RenderItemsListBox(mealsDS, MealsListBox);
}

function LoadStars_callback()
{
	RenderItemsListBox(starsDS, StarsListBox);
	StarsListBox.onChangeSelected = OnSelectStar;
}

function loadTourTypes_callback()
{
	RenderItemsComboBox(tourTypesDS, TourTypeComboBox, []);
	TourTypeComboBox.setValue(selectedTourTypeId, false);
}

function LoadOperators_callback()
{
}

function LoadHotelsEx_callback()
{
}

function onloadSearchForm()
{
	ToggleWaitBox("show");
	var screenWidth = 640, screenHeight = 480;
	if (parseInt(navigator.appVersion) > 3)
	{
		screenWidth = screen.availWidth;
		screenHeight = screen.availHeight;
		
		if ((resultsPageMaximized == "true") || (resultsPageMaximized == true))
		{
			resultsPageWidth = screenWidth;
			resultsPageHeight = screenHeight;
		}
	}
	dictionary = CreateDictionaryFromQueryString();
	if (dictionary.DepCityId != null)
	{
	      selectedDepartureCityId = dictionary.DepCityId;
	}
	if (dictionary.DestCountryId != null)
	{
	      selectedDestinationCountryId = dictionary.DestCountryId;
	}
	var windowWidth = dictionary.windowWidth_sm, windowHeight = dictionary.windowHeight_sm;
	if (windowWidth != null && windowHeight != null)
	{
		window.resizeTo(windowWidth, windowHeight)
		window.moveTo(0, 0);
	}
	TourTypeComboBox = new ComboBox("TourTypeComboBox", document.getElementById("TourTypeComboBoxLabel"));
	TourTypeComboBox.onChangeSelected = OnSelectTourType;
	DepartureCityComboBox = new ComboBox("DepartureCityComboBox", document.getElementById("DepartureCityComboBoxLabel"));
	DepartureCityComboBox.onChangeSelected = OnSelectDepartureCity;
	DestinationCountryComboBox = new ComboBox("DestinationCountryComboBox", document.getElementById("DestinationCountryComboBoxLabel"));
	DestinationCountryComboBox.onChangeSelected = OnSelectDestinationCountry;
	CurrencyComboBox = new ComboBox("CurrencyComboBox", document.getElementById("CurrencyComboBoxLabel"));
	if ((HideCurrenciesFilter == "false") || (HideCurrenciesFilter == false))
	{
		var documentElementRef = document.getElementById("currency");
		if (documentElementRef != null)
		{
			documentElementRef.style.display = "inline";
		}
	}
	MealsListBox = new ListBox("MealsListBox", document.getElementById("MealsListBoxLabel"));
	StarsListBox = new ListBox("StarsListBox", document.getElementById("StarsListBoxLabel"));
	HotelsListBox = new ListBox("HotelsListBox", document.getElementById("HotelsListBoxLabel"));
	DestinationCitiesListBox = new ListBox("DestinationCitiesListBox", document.getElementById("DestinationCitiesListBoxLabel"));
	DestinationCitiesListBox.onChangeSelected = OnSelectDestinationCity;

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

	//LoadOperatorsByDepartureCityAndDestination(DefaultDepartureCity, true, 9, LoadOperators_callback);
	//LoadHotelsEx(3, [], [], LoadHotelsEx_callback);
	
	LoadTourTypes(loadTourTypes_callback);

	switch(interrelationshipsOfDepartureCitiesAndDestinationCountries)
	{
		case "NoInterrelationships":
			LoadDepartureCities(selectedTourTypeId, LoadDepartureCities_callback);
			LoadDestinationCountries(selectedTourTypeId, LoadDestinationCountries_callback);
			break;    
		case "DestinationCountriesDependsOnDepartureCities":
			LoadDepartureCities(selectedTourTypeId, LoadDepartureCities_callback);
			break;
		default:
			LoadDestinationCountries(selectedTourTypeId, LoadDestinationCountries_callback);
	}

	LoadMeals(LoadMeals_callback);
	LoadStars(LoadStars_callback);
	LoadCurrencies(Currencies, LoadCurrencies_callback);
	ToggleWaitBox("hide");
	resizeFrameEvent();
}

function OpenResults()
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
	var queryString = CreateQueryString(object);
	queryString += "&windowWidth_sm=" + resultsPageWidth + "";
	queryString += "&windowHeight_sm=" + resultsPageHeight + "";
	windowOpen(resultPage + queryString, resultsPageWidth, resultsPageHeight, openResultsPageInNewWindow);
}