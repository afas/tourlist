
var showcaseCurrencyId = DefaultCurrency;
var imageMaxWidth = "110px", imageMaxHeight = "90px";
var imageBorderWidth = "1px";
var imageMargin = "2px";
var textMaxWidth = "110px";
var textBorderWidth = "1px";
var textMargin = "2px";
var priceRepresentation = "PricePerRoom"; //"PricePerPerson" - для показа цен на человека
var textPosition = "bottom";
// Число столбцов в витрине
var ShowcaseWidth = 3;
// Число строк в витрине
var ShowcaseHeight = 3;
var Showcase;
var imageDefaultSrc = "../Images/showcaseDefault.jpg"; //Картинка по умолчанию

// Если витрина встраивается в страницу, которая находится не в каталоге "Html" модуля,
// то придется переопределить пути относительно текущей страницы.
//var viewPage = "../Html/PriceDetails.htm"; /* форма просмотра цены */
//var hotelPage = "../Html/HotelDetails.htm"; /* форма с подробностями об отеле */

var DepartureCityComboBox;
var DestinationCountryComboBox;
var NightsFromV = 1;
var NightsToV = 15;

function OnSelectDepartureCity(value)
{
	selectedDepartureCityId = Number(value);
	//if (interrelationshipsOfDepartureCitiesAndDestinationCountries == "DestinationCountriesDependsOnDepartureCities") {
	//	LoadDestinationCountriesByDepartureCity(selectedDepartureCityId, selectedTourTypeId, LoadDestinationCountries_callback);
	//}
	goShowcase();
}

function OnSelectDestinationCountry(value)
{
	selectedDestinationCountryId = Number(value);
	//if (interrelationshipsOfDepartureCitiesAndDestinationCountries == "DepartureCitiesDependsOnDestinationCountries") {
	//	LoadDepartureCitiesByDestinationCountry(selectedDestinationCountryId, selectedTourTypeId, LoadDepartureCities_callback);
	//}
	goShowcase();
}

function onChangeStar(value)
{
	if (value == 0 || value == "0") selectedStarIds = [];
	else selectedStarIds = [Number(value)];
	goShowcase();
}

function onChangeNights(value)
{
	if (String(value) == "0") {
		NightsFromV = 1;
		NightsToV = 15;
	} else if (String(value) == "1") {
		NightsFromV = 3;
		NightsToV = 5;
	} else if (String(value) == "2") {
		NightsFromV = 6;
		NightsToV = 9;
	} else if (String(value) == "3") {
		NightsFromV = 10;
		NightsToV = 14;
	}

	goShowcase();
}

function LoadDepartureCities_callback()
{
	RenderItemsComboBox(departureCitiesDS, DepartureCityComboBox, DefaultDepartureCities);
	DepartureCityComboBox.setValue(selectedDepartureCityId, true);
}

function LoadDestinationCountries_callback()
{
	RenderItemsComboBox(destinationCountriesDS, DestinationCountryComboBox, DefaultDestinationCountries);
	DestinationCountryComboBox.setValue(selectedDestinationCountryId, true);
}

function IsFilterContains(filter, value)
{
	if (filter.length == 0) {return true;}
	for (i=0; i<filter.length; i++){ if (filter[i] == value) {return true};}
	return false;
}

function RenderItemsComboBox(array, control, filter)
{
	control.clearItems();
	if (array == null){return;}
	for (var i=0;i<array.length; i++)
	{
		if (filter && IsFilterContains(filter, array[i].id))
		{
		    var value;
		    if (array[i].russianName != null)
		        value = array[i].russianName;
		    if (array[i].key != null)   
		        value = array[i].key;
			control.add(new ComboBoxItem(value, array[i].id));
		}
	}
}

function SetupShowcase()
{
	dictionary = CreateDictionaryFromQueryString();
	if (dictionary.DepCityId != null)
	{
	      selectedDepartureCityId = dictionary.DepCityId;
	}
	if (dictionary.DestCountryId != null)
	{
	      selectedDestinationCountryId = dictionary.DestCountryId;
	}

	DepartureCityComboBox = new ComboBox("DepartureCityComboBox", document.getElementById("DepartureCityComboBoxLabel"));
	DepartureCityComboBox.onChangeSelected = OnSelectDepartureCity;
	DestinationCountryComboBox = new ComboBox("DestinationCountryComboBox", document.getElementById("DestinationCountryComboBoxLabel"));
	DestinationCountryComboBox.onChangeSelected = OnSelectDestinationCountry;

	LoadDepartureCities(selectedTourTypeId, LoadDepartureCities_callback);
	LoadDestinationCountries(selectedTourTypeId, LoadDestinationCountries_callback);

	var columns = dictionary.columns_sm, rows = dictionary.rows_sm;
	if (columns != null && rows != null)
	{
		ShowcaseWidth = columns;
		ShowcaseHeight = rows;
	}
	var textPositionFromQueryString = dictionary.textPosition_sm;
	if (textPositionFromQueryString != null)
	{
		textPosition = textPositionFromQueryString;
	}
	var documentElementRef;
	if (textPosition != "bottom")
	{
		documentElementRef = document.getElementById("showcaseImageDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.width = imageMaxWidth;
			documentElementRef.style.borderWidth = imageBorderWidth;
			documentElementRef.style.margin = imageMargin;
		}
		documentElementRef = document.getElementById("showcaseTextDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.width = textMaxWidth;
			documentElementRef.style.borderWidth = textBorderWidth;
			documentElementRef.style.margin = textMargin;
		}
		documentElementRef = document.getElementById("Tour");
		if (documentElementRef != null)
		{
			var pixelWidth = strToInt(imageMaxWidth) + strToInt(textMaxWidth) + (strToInt(imageBorderWidth) + strToInt(imageMargin) + strToInt(textBorderWidth) + strToInt(textMargin)) * 2;
			documentElementRef.style.pixelWidth = pixelWidth;
			documentElementRef.style.width = pixelWidth + "px";
		}
	}
	else
	{
		documentElementRef = document.getElementById("showcaseImageDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.float = "none";
			documentElementRef.style.width = imageMaxWidth;
			documentElementRef.style.borderWidth = imageBorderWidth;
			documentElementRef.style.margin = imageMargin;
		}
		documentElementRef = document.getElementById("showcaseTextDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.float = "none";
			documentElementRef.style.width = imageMaxWidth;
			documentElementRef.style.borderWidth = textBorderWidth;
			documentElementRef.style.margin = textMargin;
		}
		documentElementRef = document.getElementById("Tour");
		if (documentElementRef != null)
		{
			var pixelWidth = strToInt(imageMaxWidth) + (strToInt(imageBorderWidth) + strToInt(imageMargin)) * 2;
			documentElementRef.style.pixelWidth = pixelWidth;
			documentElementRef.style.width = pixelWidth + "px";
		}
	}
	goShowcase();
}

function goShowcase() {
	ToggleShowcaseWaitBox("show");
	var showcaseDiv = document.getElementById("Showcase");
	showcaseDiv.style.display = "none";
	
	// Массив элементов витрины - поисковых фильтров
	var se1 = new ShowcaseElement();
	se1.destinationCountry = selectedDestinationCountryId;
	se1.departureDateFromNowCount = 1;
	se1.departureDateCount = 7;
	se1.departureCity = selectedDepartureCityId;
	se1.adult = 2;
	se1.child = 0;
	se1.positionCount = 9;
	se1.filtrateIdenticalHotels = true;
	se1.destinationCities = [];
	se1.stars = selectedStarIds;
	se1.nightsFrom = NightsFromV;
	se1.nightsTo = NightsToV;
	//se1.currency = 1;
	//se1.priceFrom = 500;
	//se1.priceTo = 1500;
	//se1.operatorIds = [];
	
	// Массив, содержащий все поисковые запросы
	Showcase = [se1];
	
	GetShowcase();
}