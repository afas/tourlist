
var departureCitiesDS = null;
var destinationCountriesDS = null;
var selectedDepartureCityId = DefaultDepartureCity;
var selectedTourTypeId = 0;
var selectedDestinationCountryId = DefaultDestinationCountry;
var selectedCurrencyId = DefaultCurrency;
var selectedDestinationCitiesIds = [];
var selectedHotelIds = [];
var selectedStarIds = [];
var dictObject = null;
var citiesDS = null;
var hotelsDS = null;
var hotelsExDS = null;
var starsDS = null;
var mealsDS = null;
var currenciesDS = null;
var operatorsDS = null;
var tourTypesDS = null;

try {dictObject = new Dictionaries(remoteUri + "/Dictionaries.ashx");} catch(e) {}

function LoadOperators(callback)
{
	function LoadOperators_callback(response)
	{
		operatorsDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getOperators(LoadOperators_callback);
}

function LoadOperatorsByDepartureCityAndDestination(departureCityId, includeNullDepartureCities, countryId, callback)
{
	function LoadOperators_callback(response)
	{
		operatorsDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getOperatorsByDepartureCityAndDestination(departureCityId, includeNullDepartureCities, countryId, LoadOperators_callback);
}

function LoadDepartureCities(tourTypeId, callback)
{
	function LoadDepartureCities_callback(response)
	{
		departureCitiesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getDepartureCities(tourTypeId, LoadDepartureCities_callback);
}

function LoadDepartureCitiesByDestinationCountry(destinationCountryId, tourTypeId, callback)
{
	function LoadDepartureCities_callback(response)
	{
		departureCitiesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getDepartureCitiesByDestinationCountry(destinationCountryId, tourTypeId, LoadDepartureCities_callback);
}

function LoadDestinationCountriesByDepartureCity(departureCityId, tourTypeId, callback)
{
	function LoadCountries_callback(response)
	{
		destinationCountriesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getDestinationCountriesByDepartureCity(departureCityId, tourTypeId, LoadCountries_callback);
}

function LoadDestinationCountries(tourTypeId, callback)
{
	function LoadCountries_callback(response)
	{
		destinationCountriesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getDestinationCountries(tourTypeId, LoadCountries_callback);
}

function LoadCountriesWithHotels(callback)
{
	function LoadCountries_callback(response)
	{
		destinationCountriesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getCountriesWithHotels(LoadCountries_callback);
}

function LoadDestinationCities(id, callback)
{
	function LoadCities_callback(response)
	{
		citiesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getDestinationCities(id, LoadCities_callback);
}

function LoadCitiesWithHotels(id, callback)
{
	function LoadCities_callback(response)
	{
		citiesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getCitiesWithHotels(id, LoadCities_callback);
}

function LoadHotels(countryId, cityIds, starIds, callback)
{
	function LoadHotels_callback(response)
	{
		hotelsDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getHotels(countryId, cityIds, starIds, LoadHotels_callback);
}

function LoadHotelsEx(countryId, cityIds, starIds, callback)
{
	function LoadHotelsEx_callback(response)
	{
		hotelsExDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getHotelsEx(countryId, cityIds, starIds, LoadHotelsEx_callback);
}

function LoadPrincipalHotels(cityId, callback)
{
	function LoadHotels_callback(response)
	{
		hotelsDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getPrincipalHotels(cityId, LoadHotels_callback);
}

function ClearHotels()
{
	hotelsDS = [];
}

function LoadDepartureCities_callback()
{
	RenderItemsComboBox(departureCitiesDS, DepartureCityComboBox, DefaultDepartureCities);
	DepartureCityComboBox.setValue(selectedDepartureCityId, true);
}

function LoadStars(callback)
{
	function LoadStars_callback(response)
	{
		starsDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	dictObject.getStars(LoadStars_callback);
}

function LoadMeals(callback)
{
	function LoadStars_callback(response)
	{
		mealsDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	mealsDS = dictObject.getMeals(LoadStars_callback);
}

function LoadCurrencies(currenciesIds, callback)
{
	function LoadCurrencies_callback(response)
	{
		currenciesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	currenciesDS = dictObject.getCurrenciesByIds(currenciesIds, LoadCurrencies_callback);
}

function LoadTourTypes(callback)
{
	function LoadTourTypes_callback(response)
	{
		tourTypesDS = response.result;
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	tourTypesDS = dictObject.getGlobalTourTypes(LoadTourTypes_callback);
}

function CreateQueryString(object)
{
	var queryString = "";
	queryString += "?departureCity_sm=" + object.DepartureCityComboBox_hidden+ "";
	queryString += "&destinationCountry_sm=" + object.DestinationCountryComboBox_hidden+ "";
	queryString += "&meals_sm=" + object.MealsListBox_hidden+ "";
	queryString += "&stars_sm=" + object.StarsListBox_hidden+ "";
	queryString += "&hotels_sm=" + object.HotelsListBox_hidden+ "";
	queryString += "&destinationCities_sm=" + object.DestinationCitiesListBox_hidden+ "";
	queryString += "&adultsCount_sm=" + object.AdultTextBox+ "";
	queryString += "&childrenCount_sm=" + object.ChildTextBox+ "";
	queryString += "&nightsFrom_sm=" + object.NightsFromTextBox+ "";
	queryString += "&nightsTo_sm=" + object.NightsToTextBox+ "";
	queryString += "&checkinDateFrom_sm=" + object.DateFromTextBox+ "";
	queryString += "&checkinDateTo_sm=" + object.DateToTextBox+ "";
	queryString += "&costFrom_sm=" + object.PriceFromTextBox+ "";
	queryString += "&costTo_sm=" + object.PriceToTextBox+ "";
	queryString += "&currency_sm=" + object.CurrencyComboBox_hidden+ "";
	queryString += "&gtt_sm=" + object.TourTypeComboBox_hidden + ""; 
	return queryString;
}