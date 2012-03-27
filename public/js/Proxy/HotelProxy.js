/*  Copyright BRONNI.RU , 2002-2008  |  www.bronni.ru
 * -----------------------------------------------------------
 * Hotels Proxy library, version 1.0
 * Прокси-класс для получения данных об отелях
 */
 
function Hotel(url)
{

    this["getHotelDescription"] = function(id, callback)
    {
   		var ajax = new AJAX(url);
		return ajax.call("getHotelDescription", [id], ["id"],  callback);
    }
    
    this["getMarkerData"] = function(hotelId, callback)
    {
   		var ajax = new AJAX(url);
		return ajax.call("getMarkerData", [hotelId], ["hotelId"],  callback);
    }
    
    this["getHotelComments"] = function(id, callback)
    {
   		var ajax = new AJAX(url);
		return ajax.call("getHotelComments", [id], ["id"],  callback);
    }
    
    this["getHotelCriterions"] = function(callback)
    {
        var ajax = new AJAX(url);
		return ajax.call("getHotelCriterions", [], [], callback);
    }
    this["addHotelComment"] = function(hotelId, comment, portalId, nickName, callback)
    {
        var ajax = new AJAX(url);
		return ajax.call("addHotelComment", [hotelId, comment, portalId, nickName],
		     ["hotelId", "comment", "portalId", "nickName"], callback);
    }
    this["getVisualHotelsDescription"] = function(hotelId, callback)
    {
        var ajax = new AJAX(url);
		return ajax.call("getVisualHotelsDescription", [hotelId], ["hotelId"], callback);
    }

    var url = typeof(url) === 'string' ? url : 'http://remote.module.bronni.ru/Hotel.ashx';
}

Hotel.rpcMethods = ["getHotelDescription", "getMarkerData", "getHotelComments", "getHotelCriterions", "addHotelComment", "getVisualHotelsDescription"];
