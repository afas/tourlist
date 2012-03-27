/*  Copyright BRONNI.RU , 2002-2008  |  www.bronni.ru
* -----------------------------------------------------------
* Price Proxy library, version 1.0
* Прокси-класс для получения данных по ценам
*/
function Price(url)
{
	this["getShowcase"] = function(showcaseElements, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getShowcase", [showcaseElements], ["showcaseElements"], callback);
	}

	this["searchFirstPage"] = function(searchFilter, pricePerPage, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("searchFirstPage", [searchFilter, pricePerPage], ["searchFilter", "pricePerPage"], callback);
	}

	this["getFirstPageEx"] = function(country, departureCity, cities, hotels, stars, meals, dateFrom, dateTo, adultCount, childCount, durationFrom, durationTo, priceFrom, priceTo, operators, pageSize, hideToursWithoutFlights /* obsolete */, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getFirstPageEx", [country, departureCity, cities, hotels, stars, meals, dateFrom, dateTo, adultCount, childCount, durationFrom, durationTo, priceFrom, priceTo, operators, pageSize, hideToursWithoutFlights /* obsolete */], ["country","departureCity","cities","hotels","stars","meals","dateFrom","dateTo","adultCount","childCount","durationFrom","durationTo","priceFrom","priceTo", "operators", "pageSize", "hideToursWithoutFlights"],  callback);
	}

	this["getPage"] = function(guid, page, pageSize, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getPage", [guid, page, pageSize], ["guid", "page", "pageSize"],  callback);
	}

	this["getIdsEx"] = function(country, departureCity, cities, hotels, stars, meals, dateFrom, dateTo, adultCount, childCount, durationFrom, durationTo, priceFrom, priceTo, operators, maxCount, hideToursWithoutFlights /* obsolete */, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getIdsEx", [country, departureCity, cities, hotels, stars, meals, dateFrom, dateTo, adultCount, childCount, durationFrom, durationTo, priceFrom, priceTo, operators, maxCount, hideToursWithoutFlights], ["country", "departureCity", "cities", "hotels", "stars", "meals", "dateFrom", "dateTo", "adultCount", "childCount", "durationFrom", "durationTo", "priceFrom", "priceTo", "operators", "maxCount", "hideToursWithoutFlights"],  callback);
	}

	this["getPrices"] = function(country, departureCity, cities, hotels, stars, meals, dateFrom, dateTo, adultCount, childCount, durationFrom, durationTo, priceFrom, priceTo, operators, maxCount, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getPrices", [country, departureCity, cities, hotels, stars, meals, dateFrom, dateTo, adultCount, childCount, durationFrom, durationTo, priceFrom, priceTo, operators, maxCount], ["country", "departureCity", "cities", "hotels", "stars", "meals", "dateFrom", "dateTo", "adultCount", "childCount", "durationFrom", "durationTo", "priceFrom", "priceTo", "operators", "maxCount"],  callback);
	}

	this["getObjects"] = function(ids, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getObjects", [ids], ["ids"],  callback);
	}

	this["getPriceByPriceIdAndCurrencyId"] = function(priceId, currencyId, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getPriceByPriceIdAndCurrencyId", [priceId, currencyId], ["priceId", "currencyId"],  callback);
	}

	this["getActualization"] = function(id, callback)
	{
		var ajax = new AJAX(url);
		return ajax.call("getActualization", [id], ["id"],  callback);
	}
	
	this["searchSpo"] = function(dateFrom, dateTo, departureCityId,
	      destinationCountryId, operatorIds, callback)
	{
	    var ajax = new AJAX(url);
		return ajax.call("searchSpo", [dateFrom, dateTo, departureCityId,
	      destinationCountryId, operatorIds], ["dateFrom", "dateTo", "departureCityId",
	      "destinationCountryId", "operatorIds"],  callback);
	}

	var url = typeof(url) === 'string' ? url : 'http://remote.module.bronni.ru/Price.ashx';
}

Price.rpcMethods = ["getShowcase","searchFirstPage","getFirstPageEx","getPage","getIdsEx","getPrices","getObjects","getPriceByPriceIdAndCurrencyId","getActualization","searchSpo"];
