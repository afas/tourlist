/* Copyright BRONNI.RU , 2002-2008 | www.bronni.ru
 * -----------------------------------------------------------
 * Dictionaries Proxy library, version 1.0
 * Прокси-класс для получения данных по справочникам
 */
function Dictionaries(url)
{
	this["getCurrencies"] = function(callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getCurrencies", [], [], callback);
	}

	this["getCurrenciesByIds"] = function(currenciesIds, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getCurrenciesByIds", [currenciesIds], ["currenciesIds"], callback);
	}

	this["getDestinationCountriesByDepartureCity"] = function(departureCityId, tourTypeId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getDestinationCountriesByDepartureCity", [departureCityId, tourTypeId], ["departureCityId", "tourTypeId"], callback);
	}

	this["getDestinationCountries"] = function(tourTypeId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getDestinationCountries", [tourTypeId], ["tourTypeId"], callback);
	}

	this["getCountriesWithHotels"] = function(callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getPrincipalCountriesWithPrincipalHotels", [], [], callback);
	}

	this["getDestinationCities"] = function(countryId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getDestinationCities", [countryId], ["countryId"], callback);
	}
	
	this["getAgenciesByPortal"] = function(cityId, portalId, metroStationId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getAgenciesByPortal", [cityId, portalId, metroStationId], ["cityId", "portalId", "metroStationId"], callback);
	}

	this["getCitiesWithHotels"] = function(countryId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getPrincipalCitiesWithPrincipalHotels", [countryId], ["countryId"], callback);
	}
	this["getCitiesByPortal"] = function(portalId, callback)
	{
	    var ajax = new AJAX(url);
		return ajax.call("getCitiesByPortal", [portalId], ["portalId"], callback);
	}
    this["getMetroStationsByCity"] = function(cityId, callback)
	{
	    var ajax = new AJAX(url);
		return ajax.call("getMetroStationsByCity", [cityId], ["cityId"], callback);
	}
	this["getHotels"] = function(countryId, cityIds, starIds, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getHotels", [countryId, cityIds, starIds], ["countryId", "cityIds", "starIds"], callback);
	}

	this["getHotelsEx"] = function(countryId, cityIds, starIds, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getHotelsEx", [countryId, cityIds, starIds], ["countryId", "cityIds", "starIds"], callback);
	}

	this["getPrincipalHotels"] = function(cityId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getPrincipalHotels", [cityId], ["cityId"], callback);
	}

	this["getStars"] = function(callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getStars", [], [], callback);
	}

	this["getDepartureCitiesByDestinationCountry"] = function(destinationCountryId, tourTypeId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getDepartureCitiesByDestinationCountry", [destinationCountryId, tourTypeId], ["destinationCountryId", "tourTypeId"], callback);
	}

	this["getDepartureCities"] = function(tourTypeId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getDepartureCities", [tourTypeId], ["tourTypeId"], callback);
	}

	this["getMeals"] = function(callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getMeals", [], [], callback);
	}

	this["getOperators"] = function(callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getOperators", [], [], callback);
	}

	this["getOperatorsByDepartureCityAndDestination"] = function(departureCityId, includeNullDepartureCities, countryId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getOperatorsByDepartureCityAndDestination", [departureCityId, includeNullDepartureCities, countryId], ["departureCityId", "includeNullDepartureCities", "countryId"], callback);
	}

	this["getTime"] = function(callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getTime", [], [], callback);
	}
	this["getCities"] = function(countryId, callback)
	{
	    var ajax = new AJAX(url);
		return ajax.call("getCities", [countryId], ["countryId"], callback);
	}
	
	this["getGlobalTourTypes"] = function(callback)
	{
	    var ajax = new AJAX(url);
		return ajax.call("getGlobalTourTypes", [], [], callback);
	}
	
	this["searchHotels"] = function(countryId, cityId, starId, name, onlyWithImages,
            onlyWithDescriptions, onlyWithPrices, onlyWithVirtualTours, callback)
    {
        var ajax = new AJAX(url);
		return ajax.call("searchHotels", [countryId, cityId, starId, name, onlyWithImages,
            onlyWithDescriptions, onlyWithPrices, onlyWithVirtualTours],
             ["countryId", "cityId", "starId", "name", "onlyWithImages",
            "onlyWithDescriptions", "onlyWithPrices", "onlyWithVirtualTours"], callback);
    }

	var url = typeof(url) === 'string' ? url : 'http://remote.module.bronni.ru/Dictionaries.ashx';
}

Dictionaries.rpcMethods = ["getCurrencies", "getCurrenciesByIds",
 "getDestinationCountriesByDepartureCity", "getDestinationCountries",
  "getDestinationCities", "getHotels", "getHotelsEx", "getStars",
   "getDepartureCities", "getMeals", "getOperators",
    "getOperatorsByDepartureCityAndDestination", "getTime",
     "getPrincipalCountriesWithPrincipalHotels", "getPrincipalCitiesWithPrincipalHotels",
     "getMetroStationsByCity", "getCitiesByPortal", "getAgenciesByPortal", "getCities", "getGlobalTourTypes"];
