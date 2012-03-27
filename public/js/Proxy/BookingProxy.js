/*  Copyright BRONNI.RU , 2002-2008  |  www.bronni.ru
 * -----------------------------------------------------------
 * Booking Proxy library, version 1.0
 * Прокси-класс для бронирования заявки
 */

function Booking(url)
{
    
    this["createOrderForAgency"] = function(priceId, managerEmail, contactInformation, callback)
    {    
  		var ajax = new AJAX(url);
		return ajax.call("createOrderForAgency", [priceId, managerEmail, contactInformation], ["priceId", "managerEmail", "contactInformation"],  callback);
    }
    
    this["getBookingInfo"] = function(priceId, callback)
    {
        var ajax = new AJAX(url);
		return ajax.call("getBookingInfo", [priceId], ["priceId"],  callback);
    }
    this["refreshBookingInfo"] = function(bookingRequest, callback)
    {
        var ajax = new AJAX(url);
		return ajax.call("refreshBookingInfo", [bookingRequest], ["bookingRequest"],  callback);
    }
    
    var url = typeof(url) === 'string' ? url : 'http://remote.bronni.ru/Booking.ashx';

}

Booking.rpcMethods = ["createOrderForAgency", "getBookingInfo", "refreshBookingInfo"];
