/* Функция для добавления файлов со скриптами в документ (позволяет разбивать код на логические файлы) */
/* Параметры:
	src - текущий файл, в котором происходит подключение "Sample.js"
	path - путь к файлу подключения, относительного текущего файла "/library/part-one.js"
*/
function $import(src, path){
	var i, base, scripts = document.getElementsByTagName("script");
	for (i=0; i<scripts.length; i++){if (scripts[i].src.match(src)){ base = scripts[i].src.replace(src, "");break;}}
	document.write("<script src=\"" + base + path + "\"><\/script>");
};

addEvent = function(el, evname, func) {
	if (el.attachEvent) { // IE
		el.attachEvent("on" + evname, func);
	} else if (el.addEventListener) { // Gecko / W3C
		el.addEventListener(evname, func, true);
	} else {
		el["on" + evname] = func;
	}
};

/* Установка числового значения в поле */
function setValuetoField(id, value)
{
	var field = document.getElementById(id);
	if (field && value > -1) {field.value = value}
};

/* Преобразование строки вида abcde в строку вида "abcde" */
function quotesStr(str)
{
	return '"' + str + '"';
};

/* Конвертация строки в число, в случае невозможности конвертации возвращает -1 */
function strToInt(str)
{
	if (str != null)
	{
		var lastLocation = str.lastIndexOf("px");
		// remove the identified section, if it is a valid region
		if (lastLocation >= 0)
		{
			str = str.substring(0, lastLocation);
		}
	}
	var obj;
	obj = parseInt(str);
	if (!isNaN(obj)) {return obj;} else {return -1;}
};

/* Конвертация строки в массив чисел, в случае невозможности конвертации возвращает [] */
function strToIntArray(str)
{
	var obj = [];
	if (str.length > 0)
	{
		obj = str.split(",");
		for (i=0; i<obj.length; i++) {obj[i] = strToInt(obj[i])}
	}
	return obj;
};

// Возвращает либо просто пусть страницы либо функцию, вызывающую открытие страницы в новом окне
function getHref(page, newWindowInAnchor)
{
	if((newWindowInAnchor == true) || (newWindowInAnchor == "true"))
		return "javascript: windowOpen(\"" + page + "\", 950, 600, \"\", \"true\");"
	else
		return page;
}

// Возвращает параметр по имени из GET строки
function getParam(paramName)
{   
	var param = CreateDictionaryFromQueryString();
	return param[paramName];
}

function CreateDictionaryFromQueryString()
{
	var dictionary = new Array();
	var cur = window;
	while( typeof(cur) != "undefined" )
	{
		try {
			query = cur.location.search;
			if (query != "")
			{
				var vars = query.substring(1).split("&");
				for (var index = 0; index < vars.length; index++)
				{
					var pair = vars[index].split("=");
					dictionary[pair[0]] = pair[1];
				}
			}
		} catch (e) {}
		if (cur == top) break;
		cur = cur.parent;
	} 
	
	return dictionary;
}

// Формирует HTML элемент <script>.
// Parameters:
//	[in] - object document, represents the HTML document  
//	[in] - string scriptSource, the URL to an external file that contains the source code or data, значение будет присвоено атрибуту src
//	[in] - string documentElementId, the string identifying the object, идентификатор элемента, внутри которого будет помещен элемент <script> 
//	[in] - string scriptText, текст javascript кода
// Returns: none
// Сформированный HTML элемент <script> будет помещен внутри элемента, атрибут id которого равен documentElementId.
function CreateScript(document, scriptSource, documentElementId, scriptText)
{
	if (document != null)
	{
		var newScript = document.createElement("script");
		newScript.setAttribute("id", "documentScript");
		newScript.setAttribute("type", "text/javascript");
		if (scriptSource != "")
		{
			newScript.setAttribute("src", scriptSource);
		}
		if (scriptText != "")
		{
			newScript.text = scriptText;
		}
		var documentElementRef = document.getElementById(documentElementId);
		if (documentElementRef != null)
		{
			documentElementRef.appendChild(newScript);
		}
	}
}

// Возвращает значение, типа object, которое будет использоваться в дочернем окне.
// Значение может содержать различные данные.
// Parameters:
//	[in] - object window, an object representing a window or frame
// Returns: object, the data from the parent window object
function GetWindowOpenerAcquirableData(window)
{
	var data = null;
	if (window != null)
	{
		var opener = window.opener;
		if (opener != null)
		{
			data = opener.acquirableData;
		}
	}
	return data;
}

// Возвращает значение, типа string, которое будет присвоено атрибуту SRC в HTML элементе <img>.
// Значение является ссылкой на веб-сервис, предоставляющий изображение, тип которого hotelImageType.
// Parameters:
//	[in] - string images, список объектов содержащих Guid изображения
//	[in] - string hotelImageType, англоязычное имя типа изображения, ассоциированного с отелем
//	[in] - int width, максимальная ширина изображения
//	[in] - int height, максимальная высота изображения
// Returns: string, ссылка на веб-сервис предоставляющий изображение
function getHotelImageUriOfParticularType(images, hotelImageType, width, height)
{
	var guid = "00000000-0000-0000-0000-000000000000";
	if (images.length > 0)
	{
		var hotelTypeImage = null;
		if (hotelImageType != "")
		{
			for (var hotelImage in images)
			{
				if (images[hotelImage].type.toLowerCase() == hotelImageType.toLowerCase())
				{
					hotelTypeImage = images[hotelImage];
					break;
				}
			}
		}
		if (hotelTypeImage == null)
		{
			hotelTypeImage = images[0];
		}
		guid = hotelTypeImage.guid;
	}
	var widthAttribute = "";
	if (width != "")
	{
		widthAttribute = width;
	}
	var heightAttribute = "";
	if (height != "")
	{
		heightAttribute = height;
	}

	return remoteUri + "/Handlers/HotelImageHandler.ashx?ImageGuid=" + guid + "&MaximumSize=" + widthAttribute + "," + heightAttribute;
}

// Возвращает значение, типа string, которое является сформированным HTML элементом <img>.
// Возвращает ссылку на изображение, тип которого hotelImageType
// Parameters:
//	[in] - string hotelImageType, англоязычное имя типа изображения, ассоциированного с отелем
//	[in] - int width, максимальная ширина изображения
//	[in] - int height, максимальная высота изображения
// Returns:
//	string, строка - HTML элемент <img>, с атрибутами WIDTH, HEIGHT, SRC
function getHotelImageOfParticularType(images, hotelImageType, width, height)
{
	var imageUri = getHotelImageUriOfParticularType(images, hotelImageType, width, height);
	if (imageUri.indexOf("000000")>0)
	{
		return ""  /* чтобы не выводилась рамка вместо картинки, если нет картинок  */
	}
	else
	{
		return "<img border='0' src='" + imageUri + "'>"				  
	}
}
			
function ChangeFirstDate()
{
	var fe = document.getElementById("DateFromTextBox");
	var se = document.getElementById("DateToTextBox");
	var fdate = fe.value;
	var sdate = se.value;
	var fd = Date.fromFormatString(fdate);
	var sd = Date.fromFormatString(sdate);
	if (fd > sd)
	{
		se.value = fe.value;
	}
}

// Возвращает значение, типа string, которое является сформированным HTML элементом <a>.
// Значение является гиперссылкой на объект, который будет открыт в окне указанном параметром target.
// Parameters:
//	[in] - string reference, адрес объекта
//	[in] - string referenceText, текст гиперссылки
//	[in] - string color, цвет текста гиперссылки
//	[in] - string textDecoration, атрибут text-decoration
// Returns:
//	string, сформированный HTML элемент <a>, который является гиперссылкой на объект, 
//	который будет открыт в новом окне.
//	Если параметр reference равен null или является пустой строкой, 
//	то функция возвращает пустую строку.
function getReference(reference, referenceText, color, textDecoration, target)
{
	var colorAttribute = "";
	if (color != "")
	{
		colorAttribute = "color: " + color + ";";
	}
	var textDecorationAttribute = "";
	if (textDecoration != "")
	{
		textDecorationAttribute = "textDecoration: " + textDecoration + ";";
	}
	var targetAttribute = "_self";
	if (target != "")
	{
		targetAttribute = target;
	}
	var href = "";
	if (reference != null && reference != '')
	{
		href = "<a style='" + colorAttribute + " " + textDecorationAttribute + "' target='" + targetAttribute + "' href='" + reference + "'>" + referenceText + "</a>";
	}
	return href;
}
			
function windowOpen(url, width, height, newWindow)
{
	if((newWindow == true) || (newWindow == "true"))
	{
		window.top.open(url, "_blank");
	}
	else
	{
        top.location = url;
//		window.open(url, "_self");
	}
};

function windowOpenSelf(url)
{
	window.open(url, '_self');
};

//function privateSpaseGo(url)
//{
//		top.location = '/privat_spaces' + url;
//};

sys = function(){};

sys.$isIe = function() {
        return (navigator.userAgent.toLowerCase().indexOf("msie") != -1 && navigator.userAgent.toLowerCase().indexOf("opera") == -1);
    };
    
sys.$isNetscape7 = function() {
        return (navigator.userAgent.toLowerCase().indexOf("netscape") != -1 && navigator.userAgent.toLowerCase().indexOf("7.") != -1);
    };
    
sys.$isSafari = function() {
        return (navigator.userAgent.toLowerCase().indexOf("khtml") != -1);
    };
    
sys.$isOpera = function() {
        return (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    };
    
sys.$isMozilla = function() {
        return (navigator.userAgent.toLowerCase().indexOf("gecko") != -1 && navigator.productSub >= 20030210);
    };
    
sys.$isFireFox = function() {
		return /Firefox/i.test(navigator.userAgent);
	};

sys.$isArray = function(obj) {
        return obj instanceof Array;
    };
    
sys.$isObject = function(obj) {
        return (typeof obj == 'object');
    };


// Работа с массивами

// Возвращает true, если value есть в array.
function contains(array, value)
{
	for(var i = 0; i < array.length; i++)
	{
		if(array[i] == value)
			return true;
	}
	return false;
}

// Исключает из массива указанный элемент
function exclude(array, value)
{
	if(array == null || array.length == null)
		return array;

	for(var i = 0; i < array.length; i++)
	{
		var temp1 = array[i];
		var temp2 = value;
		if(array[i] == value)
			array.remove(i);
	}
	
	return array;
}

// Возвращает массив без элементов null
function getArrayWithoutNull(array)
{
	var result = new Array();
	for (var i = 0; i < array.length; i++)
		if (array[i] != null)
			result.push(array[i]);
	return result;
}

// Возвращает true, если массив пустой
function arrayIsEmpty(array)
{
	if (array != null && array.length != null && array.length != 0)
		return false;
	else
		return true;
}

// Управление индикатором загрузки
var gWaitBoxCounter = 0;
ToggleWaitBox = function (state) 
{
	if ($("#WaitingControl") == null)
	{
		return;
	}

	if (state == 'show')
	{
		gWaitBoxCounter++;
	}
	else if (state == 'hide')
	{
		gWaitBoxCounter--;
	}

	if (gWaitBoxCounter > 0)
	{
		$("#WaitingControl:not(:visible)").fadeIn();
	}
	else
	{
		$("#WaitingControl:visible").fadeOut();
	}
}

// Функция для корректировки найденной цены
// округляет в зависимости от настройки PriceRoundLevel
// умножает на поправочный коэффециент PriceCorrection
function PriceCorrectionFun(value)
{
	//alert(value);
	if ((typeof(PriceCorrection) == "undefined" || PriceCorrection == null)&&(typeof(PriceRoundLevel) == "undefined" || PriceRoundLevel == null))
	{
	    return value;
	}
	var reR= /(\S{3})?(\S{3})?(\S{3})?(\S{3})?(\S{3})?(\S{3})?(\S{3})?$/;
	var seR= "\u00A0$1\u00A0$2\u00A0$3\u00A0$4\u00A0$5\u00A0$6\u00A0$7";

	var num;
	if (typeof(PriceCorrection) == "undefined" || PriceCorrection == null)
	{
	    num = parseFloat(String(value).replace(/(\u00A0|\s)/g, "").replace(/(\u002C|\u002E|,)/g, "."));
	} 
	else
	{
	    num = parseFloat(String(value).replace(/(\u00A0|\s)/g, "").replace(/(\u002C|\u002E|,)/g, "."))*PriceCorrection;
	}
	var numStrArr = String(num).split(".");
	numStrArr.push("00");

	if (typeof(PriceRoundLevel) == "undefined" || PriceRoundLevel == null || PriceRoundLevel == 0)
	{
		var temp1 = numStrArr[1] + "0";
		return [numStrArr[0].replace(reR,seR).replace(/^\u00A0+/, '').replace(/\u00A0+$/, ''), ".", temp1.substr(0,2)].join('');
	}
	else
	{
		var temp2 = Math.round(parseFloat(numStrArr[0])/PriceRoundLevel)*PriceRoundLevel;
		return String(temp2).replace(reR,seR).replace(/^\u00A0+/, '').replace(/\u00A0+$/, '');
	}
}

//Функция вызывает resizeFrame() у родительского окна
//необходима для изменения размеров фрейма, если страница встроена в iframe
function resizeFrameEvent()
{
	var cur = window;
	while( typeof(cur) != "undefined" )
	{
		try {
			if ( typeof(cur.resizeFrame) != "undefined" ) {
				cur.setTimeout(cur.resizeFrame, 0);
				return;
			}
		} catch (e) {}
		if (cur == top) break;
		cur = cur.parent;
	}
}