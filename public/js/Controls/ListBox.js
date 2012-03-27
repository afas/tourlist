
ListBox = function()
{
	/* Обязательное присутствие первого аргумента: Имени контрола */
	if(arguments.length==0)
    {
        self.status="ListBox invalid - no name argument";
    }
   	/* Первый параметр конструктора - имя контрола */
    this.name     = arguments[0];
    /* Выбираем в качестве родителя или элемент из конструктора или body */
    this.parent      = arguments[1]||document.body
    
    /* Определяем постоянные величины */
    this.constBaseDivSuffix = "_base";
    this.constHiddenSuffix = "_hidden";

    /**/
    this.clearItems();
    /**/
    this.selectedItems = new Array();
    /**/
    this.onChangeSelected = null;
    
    /* Создаем базовый слой */
    this.view = this.createBase();
    
    /* Добавляем отображаемый текст в дерево документа */
	this.parent.appendChild(this.view);
	this.parent.appendChild(this.createHidden());

	// элемент br (line break) будет добавлен для всех браузеров кроме Internet Explorer
	var br = ListBox.is_ie ? "" : "<br>";
	// Ссылка "Очистить"
	var linkClear = $("<a id=\"" + this.name + "Clear\"" + " onclick=\"" + this.name + ".removeAll();" + "\"" + " style=\"cursor:pointer;\"" + ">" + br + "Очистить</a>")[0];
	this.parent.appendChild(linkClear);
	
  	/* Имя элемента, который хранит выбранное значение соответствует имени контрола */
	this.valcon = this.getControl(this.constHiddenSuffix);
}

/// detect a special case of "web browser"
ListBox.is_ie = ( /msie/i.test(navigator.userAgent) &&
       !/opera/i.test(navigator.userAgent) );

ListBox.is_ie5 = ( ListBox.is_ie && /msie 5\.0/i.test(navigator.userAgent) );

/// detect Opera browser
ListBox.is_opera = /opera/i.test(navigator.userAgent);

/// detect KHTML-based browsers
ListBox.is_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);

/// detect Firefox browser
ListBox.is_firefox = /Firefox/i.test(navigator.userAgent);

/* */
ListBox.prototype.getControlName = function(suffix)
{
	return this.name + suffix;
}

/* */
ListBox.prototype.getControl = function(suffix)
{
	return document.getElementById(this.getControlName(suffix));
}

ListBox.prototype.createHidden = function()
{
    var span;
    span = document.createElement("SPAN");
    span.innerHTML = "<input type='hidden' id='" + this.getControlName(this.constHiddenSuffix) + "' name='" + this.getControlName(this.constHiddenSuffix) + "'/>"
    return span; 
}

ListBox.prototype.createBase = function()
{
    var div;
    div = document.createElement("DIV");
    div.name = this.name + this.constBaseDivSuffix;
    div.id = this.name + this.constBaseDivSuffix;
    div.className = "e-listbox";

    return div; 
}

ListBox.prototype.getValue = function(index)
{
	if (typeof(this.options[index].value) != 'undefined') 
		{return this.options[index].value;} 
	else 
		{return this.options[index].text;}
}

ListBox.prototype.isSelected = function(value)
{
	for (i=0;i<this.selectedItems.length;i++)
	{
		if (this.selectedItems[i] == value) {return true;}
	}
	return false;
}

ListBox.prototype.removeValue = function(value)
{
	var isDeleted = false;
    for(var i=0,n=0;i<this.selectedItems.length;i++)
    {  
        if(this.selectedItems[i]!=value || isDeleted)
        {
            this.selectedItems[n++]=this.selectedItems[i];
        } else {isDeleted = true;}
    }
    
    if (isDeleted) {this.selectedItems.length-=1;}
   	this.valcon.value = this.selectedItems.join(",");
}

ListBox.prototype.removeAll = function()
{
	this.selectedItems = [];
	this.valcon.value = '';
	this.dataBind();
	/* Вызываем внешнее событие */
	if (this.onChangeSelected) {this.onChangeSelected(this.selectedItems)};
}

ListBox.prototype.addValue = function(value)
{
	this.selectedItems.length+=1;
	this.selectedItems[this.selectedItems.length-1] = value;
	this.valcon.value = this.selectedItems.join(",");
}

ListBox.prototype.getClassName = function(value)
{
	if (this.isSelected(value)) {return 'e-listbox-selected';} else {return 'e-listbox-item'}
}

ListBox.prototype.getClassNameHilite = function(value)
{
	if (this.isSelected(value)) {return 'e-listbox-selected';} else {return 'e-listbox-hilite'}
}

ListBox.prototype.onClick = function(obj, value)
{
	if (this.isSelected(value)) {this.removeValue(value)} else {this.addValue(value)}
	obj.className = this.getClassNameHilite(value);
	this.dataBind();
	/* Вызываем внешнее событие */
	if (this.onChangeSelected) {this.onChangeSelected(this.selectedItems)};
}

ListBox.prototype.onMouseOver = function(obj, value)
{
	obj.className=this.getClassNameHilite(value);
}

ListBox.prototype.onMouseOut = function(obj, value)
{
	obj.className=this.getClassName(value);
}

ListBox.prototype.dataBind = function()
{
	if (this.options == null) {return;}
	var buildString, clickEvent, mouseOverEvent, mouseOutEvent;
	var currentStyle;
    buildString = '<table cellpadding=0 cellspacing=0>';
    var items = new Array(this.options.length);
    for(var i=0;i<this.options.length;i++)
    {
		currentStyle = this.getClassName(this.getValue(i));
    
		clickEvent = this.name + '.onClick(this,' + this.getValue(i) + ');'; 
		mouseOverEvent = this.name + '.onMouseOver(this,' + this.getValue(i) + ');'; 
		mouseOutEvent = this.name + '.onMouseOut(this,' + this.getValue(i) + ');'; 
		items[i] = '<tr><td class=\'' + currentStyle + '\' onClick=\'' + clickEvent + '\' onMouseOver=\'' + mouseOverEvent + '\' onMouseOut=\'' + mouseOutEvent + '\'>' + this.options[i].text + '</td></tr>';
	}
    buildString = buildString + items.join("") + '</table>';
    if (this.view != null) {this.view.innerHTML = buildString;}
}

ListBoxItem = function(text,value)
{
    this.text  = text;
    this.value = value;
}

ListBox.prototype.clearItems = function()
{
	this.options = new Array();
}

ListBox.prototype.add = function()
{
    var i,arglen;
    arglen=arguments.length;
    for(i=0;i<arglen;i++)
    {
        this.options[this.options.length]=arguments[i]
    }
}

ListBox.prototype.remove = function(index)
{
    this.options.remove(index);
}


ListBox.prototype.renderItems = function(array, valueProperty, nameProperty, bind)
{
	if (typeof(bind) == 'undefined') {bind = true;}
	this.clearItems();
	if (array == null){return;};
	for (var i=0;i<array.length; i++)
	{
		this.add(new ListBoxItem(array[i][nameProperty], array[i][valueProperty]));
	};
	if (bind) {this.dataBind();}
};

ListBox.prototype.setValues = function(values, raise)
{
	this.selectedItems = [];
	this.valcon.value = '';

	for (var i=0;i<values.length; i++)
	{
		this.addValue(values[i]);
	}
	this.dataBind();
	/* Вызываем внешнее событие */
	if (raise && this.onChangeSelected) {this.onChangeSelected(this.values)};
};

