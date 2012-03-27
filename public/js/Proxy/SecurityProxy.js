/*  Copyright BRONNI.RU , 2002-2008  |  www.bronni.ru
 * -----------------------------------------------------------
 * Security Proxy library, version 1.0
 * Прокси-класс для обеспечения безопасности
 */
function Security(url)
{

    this["login"] = function(name, password, callback)
    {
		var ajax = new AJAX(url);
		return ajax.call("login",[name, password],["name", "password"],  callback);
    }
    
    this["logout"] = function(callback)
    {
		var ajax = new AJAX(url);
		return ajax.call("login",[],[],  callback);
    }
    
    var url = typeof(url) === 'string' ? url : 'http://remote.module.bronni.ru/Security.ashx';

}

Security.rpcMethods = ["login","logout"];
