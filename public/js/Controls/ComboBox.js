
Global_run_event_hook = true;
Global_combo_array = new Array();

ComboBox = function()
{

	if(arguments.length==0)
	{
		self.status="ComboBox invalid - no name argument";
	}

	this.name = arguments[0];
//	var bodyRef = document.getElementById("docBody");
//	var documentElementRef = bodyRef.getElementById(arguments[1]);
//	this.parent = documentElementRef || document.body;
	this.parent = arguments[1] || document.body;


	this.constBaseDivSuffix = "_base";
	this.constListDivSuffix = "_list";
	this.constInputSuffix = "_input";
	this.constHiddenSuffix = "_hidden";


	this.options = new Array();
	this.expops = new Array();
	this.value = "";
	this.onChangeSelected = null;
	this.view = this.createBase();
	Global_combo_array[Global_combo_array.length]=this;
	if(Global_run_event_hook){this.init(this)}
}

// detect a special case of "web browser"
ComboBox.is_ie = ( /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) );

ComboBox.is_ie5 = ( ComboBox.is_ie && /msie 5\.0/i.test(navigator.userAgent) );

// detect Opera browser
ComboBox.is_opera = /opera/i.test(navigator.userAgent);

// detect KHTML-based browsers
ComboBox.is_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);

// detect Firefox browser
ComboBox.is_firefox = /Firefox/i.test(navigator.userAgent);

ComboBox.prototype.getControlName = function(suffix)
{
	return this.name + suffix;
}

ComboBox.prototype.getControl = function(suffix)
{
	return document.getElementById(this.getControlName(suffix));
}

ComboBox.prototype.createBase = function()
{
	var div = document.createElement("div");
	div.name = this.name + this.constBaseDivSuffix;
	div.id = this.name + this.constBaseDivSuffix;
	div.innerHTML = "<TABLE cellSpacing='0' cellPadding='0' border='0' class='e-combobox'><TR><TD class='e-combobox-focus'><INPUT type='hidden' name='" + this.getControlName(this.constHiddenSuffix) + "' id='" + this.getControlName(this.constHiddenSuffix) + "'><INPUT class='e-combobox-input' id='" + this.getControlName(this.constInputSuffix) + "'></TD><TD><DIV class='e-combobox-button' onclick='" + this.name + ".toggle()'></DIV></TD></TR></TABLE>";
	this.parent.appendChild(div);
	this.valcon = this.getControl(this.constHiddenSuffix);
	this.txtview = this.getControl(this.constInputSuffix);
	return div;
}

ComboBox.prototype.choose = function(realval,txtval)
{
	this.value = realval;
	var samstring = this.name+".txtview.value='"+txtval+"'";
	window.setTimeout(samstring,1);
	this.valcon.value = realval;
	if (this.onChangeSelected) {this.onChangeSelected(this.value);}

}

Array.prototype.remove=function(dx)
{
	if(isNaN(dx)||dx>this.length){self.status='Array_remove:invalid request-'+dx;return false;}
	for(var i=0,n=0;i<this.length;i++)
	{
		if(this[i]!=this[dx])
		{
			this[n++]=this[i];
		}
	}
	this.length-=1;
}

ComboBox.prototype.getDIV = function(el)
{
	var result = el;
	while (result.nodeName != "DIV" && result.nodeName != "BODY")
		if(result.parentNode != null)
			result = result.parentNode;
		else
			break;
	return result;
}

ComboBox.prototype.getItem = function(value)
{
	var i;
	var current = null;
	for (i=0; i<this.options.length; i++)
	{
		current = this.options[i];
		if (current.value == value) {return current;}
	}
	if (this.options.length > 0) 
	{
		return this.options[0];
	}
	else
	{
		return null;
	}
}

ComboBox.prototype.setValue = function(value, raise)
{
	var item = this.getItem(value);
	if (item != null)
	{
		this.value = item.value;
		this.valcon.value = item.value;
		this.txtview.value = item.text;
	}
	else
	{
		this.value = -1;
		this.valcon.value = -1;
		this.txtview.value = "";
	}
	if (raise && this.onChangeSelected) {this.onChangeSelected(this.value);}
}

ComboBox.prototype.mouseDown = function(e)
{

	var current, el;
	el = e.target ? e.target : e.srcElement;

	/* Определяем в каких границах нажали кнопку */
	var element = this.getDIV(el);
	/* Если в граница основного элемента или выпадающего списка, то ничего не делаем */
	if (element == this.opslist || element == this.view)
	{
		return;
	}

	/* Пробегаем весь список элементов и закрываем у них выпадающий список */
	for(i=0;i<Global_combo_array.length;i++)
	{
		current = Global_combo_array[i];

		if (element == current.opslist || element == current.view)
		{
			continue;
		}

		if(current.opslist)
		{
			current.opslist.style.display='none';
		}
	}
}

ComboBox.prototype.handleKey = function(e)
{
	var current, el;
	el = e.target ? e.target : e.srcElement;
	/* Определяем в каких границах нажали кнопку */
	var element = this.getDIV(el);
	/* Если нажата клавиша не впределах этого контрола, то ничего не делаем */
	if (element != this.view)
	{
		return;
	}
	this.expops.length=0;
	this.update();
	this.build(this.expops);
	if(this.expops.length==1&&this.expops[0].text=="(No matches)"){}//empty
	else{this.opslist.style.display='block';}
	this.value = this.txtview.value;
	this.valcon.value = this.txtview.value;
}


ComboBox.prototype.update = function()
{
	var opart,astr,alen,opln,i,boo;
	boo=false;
	opln = this.options.length;
	astr = this.txtview.value.toLowerCase();
	alen = astr.length;
	if(alen==0)
	{
		for(i=0;i<opln;i++)
		{
			this.expops[this.expops.length]=this.options[i];boo=true;
		}
	}
	else
	{
		for(i=0;i<opln;i++)
		{
			opart=this.options[i].text.toLowerCase().substring(0,alen);
			if(astr==opart)
			{
				this.expops[this.expops.length]=this.options[i];boo=true;
			}
		}
	}
	if(!boo){this.expops[0]=new ComboBoxItem("(No matches)","")}
}


ComboBox.prototype.remove = function(index)
{
	this.options.remove(index);
}

ComboBox.prototype.add = function()
{
	var i,arglen;
	arglen=arguments.length;
	for(i=0;i<arglen;i++)
	{
		this.options[this.options.length]=arguments[i];
	}
}

ComboBox.prototype.build = function (arr)
{
	var str,arrlen;
	arrlen=arr.length;
	str = '<table class="e-combo-list-width" cellpadding=0 cellspacing=0>';
	var strs = new Array(arrlen);
	for(var i=0;i<arrlen;i++)
	{
		strs[i] = '<tr>' +
		'<td class="e-combo-item" onClick="'+this.name+'.choose(\''+arr[i].value+'\',\''+arr[i].text+'\');'+this.name+'.opslist.style.display=\'none\';"' +
		'onMouseOver="this.className=\'e-combo-hilite\';" onMouseOut="this.className=\'e-combo-item\'" >&nbsp;'+arr[i].text+'&nbsp;</td>' +
		'</tr>';
	}
	str = str + strs.join("") + '</table>';

	if(this.opslist){this.view.removeChild(this.opslist);}

	this.opslist = document.createElement("DIV");
	this.opslist.name = this.name + this.constListDivSuffix;
	this.opslist.id = this.name + this.constListDivSuffix;

	this.opslist.innerHTML=str;
	this.opslist.style.position='absolute';
	this.opslist.style.display='none';
	this.opslist.className = "e-combo-list";
	this.opslist.onselectstart = ComboBox.returnFalse;


	this.opslist.style.width = this.view.clientWidth + "px";

	this.view.appendChild(this.opslist);
}

ComboBox.prototype.toggle = function()
{
	if(this.opslist)
	{
		if(this.opslist.style.display=="block")
		{
			this.opslist.style.display="none";
		}
		else
		{
			this.update();
			this.build(this.options);
			this.view.style.zIndex = ++ComboBox.prototype.COMBOBOXZINDEX;
			this.opslist.style.display="block";
		}
	}
	else
	{
		this.update();
		this.build(this.options);
		this.view.style.zIndex = ++ComboBox.prototype.COMBOBOXZINDEX;
		this.opslist.style.display="block";
	}
}


ComboBox.prototype.COMBOBOXZINDEX = 1000 //change this if you must

ComboBox.prototype.init = function(control)
{
	if (document.addEventListener)
	{
		document.addEventListener("keyup", function(e){control.handleKey(e)}, false );
		document.addEventListener("mousedown", function(e){control.mouseDown(e)}, false );
	}
	else if (document.attachEvent)
	{
		document.attachEvent("onkeyup", function () { control.handleKey(window.event); } );
		document.attachEvent("onmousedown", function () { control.mouseDown(window.event); } );
	}

	/* Чтобы другой контрол не садился второй раз на эти же события */
	//Global_run_event_hook = false;
}

/* Конструктор, элемент списка */
ComboBoxItem = function(text,value)
{
	this.text = text;
	this.value = value;
}

/* Пустой обработчик события */
ComboBox.returnFalse = function()
{
	return false;
}

ComboBox.prototype.clearItems = function()
{
	this.options = new Array();
}

ComboBox.prototype.renderItems = function(array, valueProperty, nameProperty)
{
	this.clearItems();
	if (array == null){return;}
	for (var i=0;i<array.length; i++)
	{
		this.add(new ComboBoxItem(array[i][nameProperty], array[i][valueProperty]));
	}
}
