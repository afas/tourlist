/*  Copyright BRONNI.RU , 2002-2008  |  www.bronni.ru
 * -----------------------------------------------------------
 *
 * The DHTML TemplateEngine, version 1.0
 *
 * Библиотека для реализации шаблонов. 
 * В качестве шаблона используется файл HTML с размеченными тегами. Вместо меток в шаблон подставляется свойства объекта, переменные
 * Умеет работать с таблицами: используется тег: $row. Вложенные таблицы не поддерживаются.
 * <имя переменной>$token - вставляет в innerHTML текст из переменной (нельзя использовать для TABLE, TBODY, TR). Рекомендация использовать для SPAN
 * <имя массива>&row - генерирует строки по количеству записей в массиве
 * <имя массива>[.<имя свойства объекта в массиве>]&token - вставляет в innerHTML значение из массива для каждой строки
 */

/* Проверка element'a на наличие атрибута с name = "name" и value = "*$token" */
function getUtilValue(el)
{
    if (el.attributes == null) {return "";};
	
	var val = ""; 
	
	if(el.getAttribute("name")!=null){val = el.getAttribute("name");};
	try{if(val=="" && el.getAttribute("ext:util")!=null) {val = el.getAttribute("ext:util");};}catch(ex) {};
	
	return val;
};

//function cleanUtilValue(el)
//{
//    el.setAttribute(getUtilAttributeName(el), "");    
//};

function getUtilAttributeName(el)
{
    if (el.attributes == null) {return "";};
		
	if(el.getAttribute("name")!=null){return "name";};
	try{if(el.getAttribute("ext:util")!=null) {return "ext:util";};}catch(ex){};
	
	return val;
};

TemplateEngine = function()
{

	/* Обязательное присутствие первого аргумента? */
	if(arguments.length==0)
    {
        //self.status="TemplateEngine argument error!";
    };

	/* Первый параметр конструктора */
    this.name     = arguments[0];
    /* Выбираем в качестве родителя или элемент из конструктора или body */
	if ( typeof(arguments[1]) != "undefined" ) {
		this.parent = arguments[1];
	} else this.parent = document;
    
    this.tokens = [];
    this.rows = [];
    
    /* Сгенерированные объекты, которые необходимо удалять при обновлении */
    this.tempobjects = [];
};

TemplateEngine.$token = "$token";
TemplateEngine.$row = "$row";


/* Замена token.element.innerHtml на token.value */
TemplateEngine.prototype.setToken = function(token)
{
	var v = "";
	try	{v = eval(token.exp);} catch(ex) {}
	if (v != null && v != 'undefined') {token.value = v; token.valid = true;} else {token.value = ""; token.valid = false;};
	
	if (token.valid) {token.element.innerHTML = token.value;}
};


/* Рекурсивный проход по дереву с корнем element в поисках элементов, содержащих атрибуты 
 * с именем "name" и value, подходящим под регулярное выражение row.regexp("prices"). 
 * При нахождении таких атрибутов, их value заменяется на строку с учетом индекса. */
TemplateEngine.prototype.replaceAttribute = function(row, element, aname, index)
{
	if (element== null || !element.hasChildNodes()) {return;}
	var el, element, i, atext, ntext;
	for (i=0;i<element.childNodes.length;i++)
	{
		el = element.childNodes[i];
		if (row.isAttribute(el, aname))
		{
		    atext = el.getAttribute(aname);    
		    			
			/* Производим замену по регулярному выражению - добавляем индексатор к имени массива */
			ntext = atext.replace(row.regexp, function($0){ return $0 + "[" + index + "]"} );
			el.setAttribute(aname, ntext);
		};
		this.replaceAttribute(row, el, aname, index)
	}
};


/* Для row: клонирование row.element row.obj.length раз 
 * и вызов для каждого клона - replaceAttribute()*/
TemplateEngine.prototype.setRow = function(row)
{
	var v = null;
	try	{v = eval(row.nameObject);} catch(ex) {};
	if (v != null && v != 'undefined') {row.obj = v; row.valid = true;} else {row.obj = null; row.valid = false;};
	
	var element, i;
	if (row.valid && row.obj != null)
	{		
		var arglen=row.obj.length;
		for(i=0;i<arglen;i++)
		{
			element = row.element.cloneNode(true);
			/* element - клон, i - индекс в массиве row.obj */
			row.parent.appendChild(element);
			this.replaceAttribute(row, element, getUtilAttributeName(element), i);
			this.tempobjects[this.tempobjects.length] = element;
		}
    }
    /* Удаление шаблонного элемента из текста html. Происходит один раз при загрузке страницы. */
    if(row.element.parentNode != null)
        row.element.parentNode.removeChild(row.element);
};


/* удаление временных объектов */
TemplateEngine.prototype.deleteTempObj = function()
{
	for (i=0;i<this.tempobjects.length;i++)
	{
		this.tempobjects[i].parentNode.removeChild(this.tempobjects[i]);
	}
	this.tempobjects = [];
};


/* Проверка element'a на наличие атрибута с name = "name" и value = "*$token" */
TemplateEngine.prototype.isToken = function(el)
{
	return /\$token/i.test(getUtilValue(el));
};



/* Проверка element'a на наличие атрибута с name = "name" и value = "*$row" */
TemplateEngine.prototype.isRow = function(el)
{
	return /\$row/i.test(getUtilValue(el));
};



/* RUN */
TemplateEngine.prototype.run = function()
{
	if (this.tempobjects.length > 0) this.deleteTempObj();
	/* Поиск всех row и добавление их в this.rows */
	if (this.rows.length == 0) this.scanRow();
	/* Для каждого row - наклонировать элементы и поменять атрибуты с учетом индекса */
	this.generateRow();
	/* Поиск всех token и добавление их в this.tokens */
	this.scanToken();
	/* Замена во всех элементах-токенах innerHtml на значение */
	this.generateToken();
};


/* Поиск во всех элементах document'а - row; */
/* Добавление найденных row во внутренний массив. */
TemplateEngine.prototype.scanRow = function()
{
	var i;
	var elements = [];
	var element = null;
	
	elements = this.parent.getElementsByTagName('*');
	
	for (i=0; i<elements.length; i++)
	{
		element = elements[i];
		if (this.isRow(element))
		{
			this.addRow(new Row(element))
		}
	}
};


/* Поиск во всех элементах document'а - token; */
/* Добавление найденных token во внутренний массив. */
TemplateEngine.prototype.scanToken = function()
{
	var i;
	var elements = [];
	var element = null;
	
	elements = this.parent.getElementsByTagName('*');
	
	for (i=0; i<elements.length; i++)
	{
		element = elements[i];
		if (this.isToken(element))
		{
			this.addToken(new Token(element))
		}
	}
};

/* Для каждого token в this.tokens вызов setToken(token)*/
TemplateEngine.prototype.generateToken = function()
{
	var token, i;
	for (i=0; i<this.tokens.length; i++)
	{
		token = this.tokens[i];
		this.setToken(token);
	}
};

/* Для каждого row в this.rows вызов setRow(row) */
TemplateEngine.prototype.generateRow = function()
{
	var row, i;
	for (i=0; i<this.rows.length; i++)
	{
		row = this.rows[i];
		this.setRow(row);
	}
};

/* Добавление token'а в массив this.tokens */
TemplateEngine.prototype.addToken = function()
{
    var i,arglen;
    arglen=arguments.length;
    for(i=0;i<arglen;i++)
    {
        this.tokens[this.tokens.length]=arguments[i]
    }
};

/* Добавление row в массив this.rows */
TemplateEngine.prototype.addRow = function()
{
    var i,arglen;
    arglen=arguments.length;
    for(i=0;i<arglen;i++)
    {
        this.rows[this.rows.length]=arguments[i]
    }
};


/* Элемент-шаблон для замены на значение из row.obj */
Token = function(element)
{	
	/* [name] - значение атрибута "name" у element'а */
	this.name = getUtilValue(element);
	/* сбрасываем значене служебного аттрибута */
	//cleanUtilValue(element);
	/* [exp] - выражение, которое нужно выполнить, чтобы получить значение для подстановки */
	this.exp = this.name.split("$")[0];
	/* [value] - значение для подстановки */
	//var v = "";
	//try	{v = eval(this.exp);} catch(ex) {}
	//if (v != null && v != 'undefined') {this.value = v; this.valid = true;} else {this.value = ""; this.valid = false;};
	this.value = null; 
	this.valid = false;
	/* [element] */
	this.element = element;
};

/* Строка-шаблон для клонирования. */
Row = function(element)
{
	/* [name] - значение атрибута "name" */
	this.name = getUtilValue(element);
	/* сбрасываем значене служебного аттрибута */
	//cleanUtilValue(element);
	/* [nameObject] - имя массива для клонирования */
	this.nameObject = this.name.split("$")[0];
	/* [regexp] - выражение для проверки атрибутов и замены имени массива на имя массива с индексом */
	this.regexp = new RegExp(this.nameObject,"gi");
	/* [obj] - массив данных из которого будут извлекаться индексы для клонирования */
	//var v = null;
	//try	{v = eval(this.nameObject);} catch(ex) {};
	//if (v != null && v != 'undefined') {this.obj = v; this.valid = true;} else {this.obj = null; this.valid = false;};
	this.value = null; 
	this.valid = false;
	/* [element] */
	this.element = element;
	/* [parent] */
	this.parent = element.parentNode;
};


/* Есть ли у элемента атрибут с name = "name" и value = "*nameObject*" */
Row.prototype.isAttribute = function(el, aname)
{
	var result = false;
	if (el.getAttribute) 
	{
		/* Какая-то жуткая бага IE - если я пользуюсь одним ранее созданным regexp он выдает разные результаты на одну и туже строчку через раз */
		/* Поэтому создаем regexp каждый раз перед проверкой - лишние накладные расходы */
		var regexp = new RegExp(this.nameObject,"gi");
		//return this.regexp.test(el.getAttribute(aname));
		try {result = regexp.exec(el.getAttribute(aname)) != null;} catch(ex) {}
	}
	return result;
};
