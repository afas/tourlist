var config = {
	PartnerKey: "onlina566", //Ключ партнёра
	ApiPath: "http://api.anywayanyday.com/api",  //Путь для доступа к api
	AircompanyLogosPath: "/any_avia/logos/", //Путь к логотипам авиакомпаний

	/* Языки suggest. В suggest-файлах содержатся коды и их обозначения для стран, городов, аэропортов.
		Suggest-файлы указанных языков будут подгружены. Доступны следующие языки: en (английский), ru (русский), ua (украинский).
	*/
	SuggestLanguages: ["en", "ru", "ua"],

	SuggestScriptsInOneFile: false, //bool true если все справочники suggest расположены в одном файле suggest.js
	SuggestFilesPath: "/any_avia/" //Путь к текстам (locale.js) и справочникам suggest: suggest.js, suggest_ru (если отдельно),.. ;
}

var Countries = {};
var Cities = {};
var Airports = {};
var l10n = {};
var language = "ru"; //Язык: en/ru/ua



function log(data) { if (window.console) console.log(data); }
function inherits(Child, Parent) {
	var F = function() { };
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.parent = Parent.prototype;
}

Date.prototype.cutTime = function() {
	var new_date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
	this.setTime(new_date.getTime());
	return this;
};
Date.prototype.toDateMonthDString = function() {
	if (language == "en") {
		return l10n.calendar.monthes_D[this.getMonth()] + '\u00A0' + this.getDate();
	} else {
		return this.getDate() + '\u00A0' + l10n.calendar.monthes_D[this.getMonth()].toLowerCase();
	}
};

function TimeSpan(Span) {
	var arrSpan = Span.split(":");
	var sTimeSpan = parseInt(arrSpan[0], 10) + "\u00A0" + l10n.HourShort + "\u00A0" + parseInt(arrSpan[1], 10) + "\u00A0" + l10n.MinuteShort;
	return sTimeSpan;
} 

function FormatMoney(Money) {
	Money += '';
	x = Money.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1].substr(0, 2) : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '\u00A0' + '$2');
	}
	return (x1 + x2);
}

function EnRu() { this.EnToRu = {}; this.RuToEn = {}; }
EnRu.prototype.Add = function(sEn, sRu) { this.EnToRu[sEn] = sRu; this.RuToEn[sRu] = sEn; };
EnRu.prototype.GetRuByEn = function(str) { var newS = ""; if(this.EnToRu[str]) { newS = this.EnToRu[str]; } return newS; };
EnRu.prototype.GetEnByRu = function(str) { var newS = ""; if(this.RuToEn[str]) { newS = this.RuToEn[str]; } return newS; };
var dictEnRu = new EnRu();
	dictEnRu.Add( 'q', 'й' );
	dictEnRu.Add( 'w', 'ц' );
	dictEnRu.Add( 'e', 'у' );
	dictEnRu.Add( 'r', 'к' );
	dictEnRu.Add( 't', 'е' );
	dictEnRu.Add( 'y', 'н' );
	dictEnRu.Add( 'u', 'г' );
	dictEnRu.Add( 'i', 'ш' );
	dictEnRu.Add( 'o', 'щ' );
	dictEnRu.Add( 'p', 'з' );
	dictEnRu.Add( '[', 'х' );
	dictEnRu.Add( '{', 'х' );
	dictEnRu.Add( ']', 'ъ' );
	dictEnRu.Add( '}', 'ъ' );
	dictEnRu.Add( 'a', 'ф' );
	dictEnRu.Add( 's', 'ы' );
	dictEnRu.Add( 'd', 'в' );
	dictEnRu.Add( 'f', 'а' );
	dictEnRu.Add( 'g', 'п' );
	dictEnRu.Add( 'h', 'р' );
	dictEnRu.Add( 'j', 'о' );
	dictEnRu.Add( 'k', 'л' );
	dictEnRu.Add( 'l', 'д' );
	dictEnRu.Add( ';', 'ж' );
	dictEnRu.Add( ':', 'ж' );
	dictEnRu.Add( "'", 'э' );
	dictEnRu.Add( '"', 'э' );
	dictEnRu.Add( '\\', 'е' );
	dictEnRu.Add( '|', 'е' );
	dictEnRu.Add( 'z', 'я' );
	dictEnRu.Add( 'x', 'ч' );
	dictEnRu.Add( 'c', 'с' );
	dictEnRu.Add( 'v', 'м' );
	dictEnRu.Add( 'b', 'и' );
	dictEnRu.Add( 'n', 'т' );
	dictEnRu.Add( 'm', 'ь' );
	dictEnRu.Add( ',', 'б' );
	dictEnRu.Add( '<', 'б' );
	dictEnRu.Add( '.', 'ю' );
	dictEnRu.Add( '>', 'ю' );

String.prototype.ChangeEnToRu = function() {
	var newStr = "";
	for(var i = 0, length = this.length; i < length; i++){
		newStr += dictEnRu.GetRuByEn(this.charAt(i));
	}
	return newStr;
};
String.prototype.ChangeRuToEn = function() {
	var newStr = "";
	for(var i = 0, length = this.length; i < length; i++){
		newStr += dictEnRu.GetEnByRu(this.charAt(i));
	}
	return newStr;
};

function AlertMessage(text) {
	this.Text = text;
	this.elMessage = null;
	this.Indent = 20;	
	this.CreateMessage();
}
AlertMessage.prototype.ieDOMManipulation = function() {
	var elMessageTemp = document.createElement("div");
	elMessageTemp.className = "alertMessageIeTemp";
	$(elMessageTemp).html(this.Text);
	document.body.appendChild(elMessageTemp);
	var Height = $(elMessageTemp).height() + this.Indent * 2;
	var Width = $(elMessageTemp).width() + this.Indent * 2;
	this.ieStyle = "height:" + Height + "px;" + " width:" + Width + "px;";
	$(elMessageTemp).remove();
};
AlertMessage.prototype.CreateMessage = function() {
	var self = this;
	this.elMessage = document.createElement("div");
	if ($.browser.msie) {
		this.ieDOMManipulation();
		this.elMessage.className = "alertMessageIe";
		var code = '<div style="margin:' + this.Indent + 'px;">' + this.Text + '</div>';
		var vml_code = '<v:roundrect arcsize=".2" fillcolor="#818E92" stroked="True" strokecolor="#818E92" style="' + this.ieStyle + '">' + code + '</v:roundrect>';
		this.elMessage.innerHTML = vml_code;
	} else {
		this.elMessage.className = "alertMessage";
		$(this.elMessage).css({
			"padding": this.Indent
		});
		this.elMessage.innerHTML = this.Text;
	}
	
	if (!window.XMLHttpRequest) $('select').addClass('invisible');
	document.body.appendChild(this.elMessage);
	$(this.elMessage).center();
	setTimeout(function() {
		self.FadeAlert();
	}, 1500);
};
AlertMessage.prototype.FadeAlert = function() {
	var self = this;
	$(this.elMessage).css({
		filter: 'alpha(opacity=90)'
	}).fadeOut(1500);
	setTimeout(function() {
		self.RemoveObj();
	}, 1600);
};
AlertMessage.prototype.RemoveObj = function() {
	var self = this;
	$(self.elMessage).empty();
	$(self.elMessage).remove();
	if (!window.XMLHttpRequest) $('select').removeClass('invisible');
	delete self;
};
$.fn.center = function() {
	var element = this;
	var elementHeight = $(element).height();
	var elementWidth = $(element).width();
	
	$(element).css({
		"width": elementWidth,
		"height": elementHeight,
		"position": "fixed",
		"margin": "auto",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"z-index": "100"
	});
	if ($.browser.msie) {
		if ($.browser.version === "7.0") {
			$(element).css({
				"left": "50%",
				"top": "50%",
				"margin-top": (-elementHeight / 2),
				"margin-left": (-elementWidth / 2)
			});
		}
		if (!window.XMLHttpRequest) {
			$(element).attr("style", "position: absolute; top: expression(documentElement.scrollTop+documentElement.offsetHeight/2-" + elementHeight / 2 + "); left: expression(documentElement.scrollLeft+documentElement.offsetWidth/2-" + elementWidth / 2 + ");");
		}
	}
};

function getOffset(oNode, pNode){
	if (!pNode) {
		var pNode = document.body;
	}
	var oCurrentNode = oNode;
	var offset = {
		top: 0,
		left: 0
	};
	while (oCurrentNode && (oCurrentNode != pNode)) {
		offset.left += oCurrentNode.offsetLeft - oCurrentNode.scrollLeft;
		offset.top += oCurrentNode.offsetTop - oCurrentNode.scrollTop;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	return offset;
}

function FadeCreate() {
	if (document.getElementById('fade') == null && document.body != null) {
		var div = document.createElement('div');
			div.id = "fade";
			div.className = "invisible";
		document.body.appendChild(div);
	}
}
function FadeIn(className, opacity) {
	var div = document.getElementById('fade');
	if (div != null) {
		div.className = className;
		if (opacity != null) {
			$(div).css({
				'opacity': opacity
			});
		}
	} else {
		FadeCreate();
		arguments.callee.apply(this, arguments);
	}
}
function FadeOut() {
	var div = document.getElementById('fade');
	if (div != null) {
		div.className = "invisible";
	}
}


$('label').live('click', function() {});

var allAjax = [];
var AjaxAbortNumber = 0;
function AjaxAbort(arrAjax) {
	AjaxAbortNumber++;
	try {
		for (objAjax in arrAjax) {
			if (arrAjax[objAjax].readyState !== 0 && arrAjax[objAjax].readyState != 4) arrAjax[objAjax].abort();
		}
	} catch (e) {}
}

var objAvia = null;
$(function() {
	$.ajax({
		type: "GET",
		url: config.SuggestFilesPath + "locale_" + language + ".js",
		dataType: "script",
		success: function(html){
			$(window).ajaxSend(function(evt, request, settings) {
				allAjax.push(request);
			});
			objAvia = new Main();
		}
	});
});

function Main() {
	var self = this;
	this.SC = "E";
	this.From = null;
	this.To = null;
	this.DirectDate = (new Date((new Date()).setDate((new Date()).getDate() + 14))).cutTime();
	this.ReturnDate = (new Date((new Date()).setDate((new Date()).getDate() + 16))).cutTime();
	this.Return = false;
	
	this.Init();
	this.SearchForm = new SearchForm(this);
	this.GetSuggestScripts();
	this.objResults = null;
}
Main.prototype.Init = function() {
	var self = this;
	
	this.elLayout = document.getElementById("avia_layout");
	
	this.elLogo = document.createElement("div");
	this.elLogo.className = "avia_logo";
	this.elLogo.innerHTML = l10n.logo;
	this.ShowSearchFormClickLink = function() {
		self.ShowSearchForm();
	};
	this.elLayout.appendChild(this.elLogo);
	
	this.elHeader = document.createElement("div");
	this.elHeader.id = "avia_header";
	this.elHeader.className = "invisible";
	this.elLayout.appendChild(this.elHeader);
	this.ProgressBar = new ProgressBar(this);
	var elResults = document.createElement("avia_results");
		elResults.id = "avia_results";
	this.elLayout.appendChild(elResults);
};
Main.prototype.GetSuggestScripts = function(){
	if (config.SuggestScriptsInOneFile === true) {
		var self = this;
		var SuggestUrl = config.SuggestFilesPath + "suggest.js";
		$.getScript(SuggestUrl, function() {
			self.CheckSuggestScriptsLoadComplite();
		});
	}
	else if (config.SuggestScriptsInOneFile === false) {
		for (var i = 0, length = config.SuggestLanguages.length; i < length; i++) {
			this.GetSuggestScript(config.SuggestLanguages[i]);
		}
		//this.GetSuggestScript();
	}
};
Main.prototype.GetSuggestScript = function(lang){
	var self = this;
	if (Cities[lang] == null) {
		//var SuggestUrl = encodeURI(config.SuggestFilesPath + "suggest_" + config.SuggestLanguages[lang] + ".js");
		var SuggestUrl = encodeURI(config.SuggestFilesPath + "suggest_" + lang + ".js");
		$.getScript(SuggestUrl, function(){
			//self.CheckSuggestScriptsLoadComplite(ComplitCounter);
			self.CheckSuggestScriptsLoadComplite();
		});
	}
};

Main.prototype.CheckSuggestScriptsLoadComplite = function(){
	var LoadComplite = true;
	if(window.CitiesVsCountries === undefined){
		LoadComplite = false;
	}
	if (window.Cities !== undefined) {
		for (var i = 0, length = config.SuggestLanguages.length; i < length; i++) {
			var lang = config.SuggestLanguages[i];
			if (!Cities[lang]) {
				LoadComplite = false;
				break;
			}
		}
		//if (!Cities[language]) {
		//	LoadComplite = false;
		//}
	}
	if (LoadComplite == true) {
		this.SearchForm.AnableAirportInputs();
	}
};
Main.prototype.ShowSearchForm = function() {
	var self = this;
	
	AjaxAbort(allAjax);
	this.elLogo.style.cursor = "default";
	$(this.elLogo).unbind("click", self.ShowSearchFormClickLink);
	
	$(this.elHeader).addClass("invisible");
	this.ProgressBar.Hide();
	if (self.objResults !== null) {
		self.objResults.Hide();
	}
	this.SearchForm.Show();
};
Main.prototype.HideSearchForm = function(){
	var self = this;
	
	this.elLogo.style.cursor = "pointer";
	$(this.elLogo).bind("click", self.ShowSearchFormClickLink);
	
	this.SearchForm.Hide();
	this.DrawHeader();
	this.ProgressBar.Show();
};
Main.prototype.DrawHeader = function() {
	var self = this;
	this.elHeader.innerHTML = "";
	var Flight = document.createElement("div");
		if(this.SC === "B") {
			Flight.innerHTML = l10n.Header.FlightB;
		} else {
			Flight.innerHTML = l10n.Header.FlightE;
		}
	this.elHeader.appendChild(Flight);
	var Direction1 = document.createElement("div");
		Direction1.className = "Direction1";
		Direction1.innerHTML = this.From.City + " → " + this.To.City + ", " + this.DirectDate.toDateMonthDString();
	this.elHeader.appendChild(Direction1);
	if(objAvia.Return == true){
		var Direction2 = document.createElement("div");
			Direction2.className = "Direction2";
			Direction2.innerHTML = this.To.City + " → " + this.From.City + ", " + this.ReturnDate.toDateMonthDString();
		this.elHeader.appendChild(Direction2);
	}
	this.elHeader_Passangers = document.createElement("div");
	this.elHeader_Passangers.className = "invisible";
	this.elHeader_Passangers.innerHTML = l10n.Header.AmountFor + " " + this.AD;
	if(this.AD == 1){
		this.elHeader_Passangers.innerHTML += l10n.Header.AD1;
	} else {
		this.elHeader_Passangers.innerHTML += l10n.Header.AD;
	}
	if(this.CN > 0){
		this.elHeader_Passangers.innerHTML += " " + l10n.And + " " + this.CN;
		if(this.CN == 1){
			this.elHeader_Passangers.innerHTML += l10n.Header.CN1;
		} else {
			this.elHeader_Passangers.innerHTML += l10n.Header.CN;
		}
	}
	this.elHeader.appendChild(this.elHeader_Passangers);
	
	this.elHeader_Error = document.createElement("div");
	this.elHeader_Error.className = "Error invisible";
		var Error_Title = document.createElement("div");
			Error_Title.className = "title";
			Error_Title.innerHTML = l10n.Header.Error.Title;
		this.elHeader_Error.appendChild(Error_Title);
		var Error_ReasonsTitle = document.createElement("div");
			Error_ReasonsTitle.innerHTML = l10n.Header.Error.Reasons;
		this.elHeader_Error.appendChild(Error_ReasonsTitle);
		var Error_Reasons = document.createElement("ul");
			var Error_Reason1 = document.createElement("li");
				Error_Reason1.innerHTML = l10n.Header.Error.Reason1;
			Error_Reasons.appendChild(Error_Reason1);
			var Error_Reason2 = document.createElement("li");
				Error_Reason2.innerHTML = l10n.Header.Error.Reason2;
			Error_Reasons.appendChild(Error_Reason2);
			var Error_Reason3 = document.createElement("li");
				Error_Reason3.innerHTML = l10n.Header.Error.Reason3;
			Error_Reasons.appendChild(Error_Reason3);
		this.elHeader_Error.appendChild(Error_Reasons);
		
	this.elHeader.appendChild(this.elHeader_Error);
	
	var elHeader_Change = document.createElement("div");
		elHeader_Change.className = "Change";
	var elHeader_ChangeLink = document.createElement("span");
		elHeader_ChangeLink.innerHTML = l10n.Header.ChangeLink;
		$(elHeader_ChangeLink).click(self.ShowSearchFormClickLink);
	elHeader_Change.appendChild(elHeader_ChangeLink);
	this.elHeader.appendChild(elHeader_Change);		
	$(this.elHeader).removeClass("invisible");
};
Main.prototype.CheckParams = function() {
	if(this.From == null){
		new AlertMessage(l10n.searchForm.Alerts.AirportFrom);
		this.SearchForm.input_From.focus();
		return false;
	}
	if(this.To == null){
		new AlertMessage(l10n.searchForm.Alerts.AirportTo);
		this.SearchForm.input_To.focus();
		return false;
	}
	if(this.DirectDate === null){
		new AlertMessage(l10n.searchForm.Alerts.DirectDate);
		return false;
	}
	if(this.Return === true){
		if (this.ReturnDate === null) {
			new AlertMessage(l10n.searchForm.Alerts.ReturnDate);
			return false;
		} else if (this.ReturnDate.valueOf() < this.DirectDate.valueOf()) {
			new AlertMessage(l10n.searchForm.Alerts.WrongDates);
			return false;
		}
	}
	this.GetParams();
};
Main.prototype.GetParams = function() {
	var sDirectDay = this.DirectDate.getDate();
	if(sDirectDay < 10) sDirectDay = "0" + sDirectDay; 
	var sDirectMonth = this.DirectDate.getMonth() + 1;
	if(sDirectMonth < 10) sDirectMonth = "0" + sDirectMonth;
	var sDirectDate = sDirectDay.toString() + sDirectMonth.toString();
	var sDirectRoute = this.From.Code + this.To.Code;
	var sRoute = sDirectDate + sDirectRoute; 
	if(this.Return){
		var sReturnDay = this.ReturnDate.getDate();
		if(sReturnDay < 10) sReturnDay = "0" + sReturnDay; 
		var sReturnMonth = this.ReturnDate.getMonth() + 1;
		if(sReturnMonth < 10) sReturnMonth = "0" + sReturnMonth;
		var sReturnDate = sReturnDay.toString() + sReturnMonth.toString();
		var sReturnRoute = this.To.Code + this.From.Code;
		sRoute += sReturnDate + sReturnRoute;
	}
	this.AD = $(this.SearchForm.elForm.AD).filter(":checked")[0].value;
	this.CN = $(this.SearchForm.elForm.CN).filter(":checked")[0].value;
	this.SC = $(this.SearchForm.elForm.SC).filter(":checked")[0].value;
	var Params = {
		Route: sRoute,
		AD: this.AD,
		CN: this.CN,
		SC: this.SC,
		Partner: config.PartnerKey,
		_Serialize: "JSON"
	};
	this.GetRequestId(Params);
};
Main.prototype.GetRequestId = function(Params) {
	var self = this;
	var Tries = 5;
	MakeRequest();
	function MakeRequest() {
		$.ajax({
			type: "get",
			dataType: "jsonp",
			data: Params,
			url: config.ApiPath + "/NewRequest/",
			success: function(json) {
				var RequestId = json.Id;
				self.RequestState(RequestId);
			},
			error: function() {
				if (Tries > 0) {
					Tries--;
					setTimeout(arguments.callee, 2000);
				}
			}
		});
	}
};
Main.prototype.RequestState = function(RequestId) {
	var self = this;
	var Params = {
		R: RequestId,
		_Serialize: "JSON"
	};
	var Tries = 5;
	var TempAjaxAbortNumber = AjaxAbortNumber;
	this.HideSearchForm();
	MakeRequest();
	function MakeRequest() {
		if (TempAjaxAbortNumber === AjaxAbortNumber) {
			$.ajax({
				type: "get",
				dataType: "jsonp",
				data: Params,
				url: config.ApiPath + "/RequestState/",
				success: function(json) {
					if (json.Completed) {
						self.ProgressBar.Update(json.Completed);
						if (json.Completed < 100) {
							setTimeout(function() {
								MakeRequest();
							}, 2000);
						} else if (json.Completed == 100) {
							self.GetFares(RequestId);
						}
					} else {
						alert(json.Error);
					}
				},
				error: function() {
					if (Tries > 0) {
						Tries--;
						setTimeout(arguments.callee, 2000);
					}
				}
			});
		}
	}
};
Main.prototype.GetFares = function(RequestId) {
	var self = this;
	var Params = {
		R: RequestId,
		V: "Matrix",
		VB: true,
		L: language,
		C: l10n.Currency,
		_Serialize: "JSON"
	};
	var Tries = 5;
	var TempAjaxAbortNumber = AjaxAbortNumber;
	MakeRequest();
	function MakeRequest() {
		if (TempAjaxAbortNumber === AjaxAbortNumber) {
			$.ajax({
				type: "get",
				dataType: "jsonp",
				data: Params,
				url: config.ApiPath + "/Fares/",
				success: function(json) {
					if(self.ProgressBar.elProgress.style.width == "100%"){
						ShowFares();
					} else {
						setTimeout(function() {
							ShowFares();
						}, 500);
					}
					function ShowFares(){
						self.ProgressBar.Hide();
						if(json.Airlines){
							$(self.elHeader_Passangers).removeClass("invisible");
							self.objResults = new Results(json);
						} else {
							$(self.elHeader_Error).removeClass("invisible");
						}
					}
				},
				error: function() {
					if (Tries > 0) {
						Tries--;
						setTimeout(arguments.callee, 2000);
					}
				}
			});
		}
	}
};

function SearchForm(pObjAvia) {
	var self = this;
	this.objAvia = pObjAvia;
	this.elForm = document.createElement("form");
	this.elForm.className = "avia_searchForm";
	$(this.elForm).submit(function(){
		self.objAvia.CheckParams();
		return false;
	});
	this.objAvia.elLayout.appendChild(this.elForm);
	
	this.CreatePassengersRadio();
	this.elTable = document.createElement("table");
	this.elTable.className = "layout";
	this.elForm.appendChild(this.elTable);
	this.CreateAirportInputs();
	this.CreateCalendars();
	this.CreateButton();
}
SearchForm.prototype.CreatePassengersRadio = function() {
	var Div = document.createElement("div");
	
	this.elForm.appendChild(Div);
	Div.innerHTML = '<div id="fieldsetAD" class="fieldsetRadio"><span class="title">' + l10n.searchForm.AD + ' </span><span class="RadioBlock"><input checked="checked" type="radio" id="Radio_AD_1" value="1" name="AD"><label for="Radio_AD_1">1</label> <input type="radio" id="Radio_AD_2" value="2" name="AD"><label for="Radio_AD_2">2</label> <input type="radio" id="Radio_AD_3" value="3" name="AD"><label for="Radio_AD_3">3</label> <input type="radio" id="Radio_AD_4" value="4" name="AD"><label for="Radio_AD_4">4</label></span><span class="title">, </span></div>';
	Div.innerHTML += '<div id="fieldsetCN" class="fieldsetRadio"><span class="title">' + l10n.searchForm.CN + ' </span><span class="RadioBlock"><input checked="checked" type="radio" id="Radio_CN_0" value="0" name="CN"><label for="Radio_CN_0">0</label> <input type="radio" id="Radio_CN_1" value="1" name="CN"><label for="Radio_CN_1">1</label> <input type="radio" id="Radio_CN_2" value="2" name="CN"><label for="Radio_CN_2">2</label> <input type="radio" id="Radio_CN_3" value="3" name="CN"><label for="Radio_CN_3">3</label></span><span class="title">, </span></div>';
	Div.innerHTML += '<div id="fieldsetSC" class="fieldsetRadio"><span class="RadioBlock"><input checked="checked" type="radio" id="Radio_SC_E" value="E" name="SC"><label for="Radio_SC_E">' + l10n.searchForm.SCE + '</label> <input type="radio" id="Radio_SC_B" value="B" name="SC"><label for="Radio_SC_B">' + l10n.searchForm.SCB + '</label> </span></div>';
	// эконом / бизнес
	this.InitRadio();
	$('#Radio_AD_1' ,this.elForm).click();
	$('#Radio_CN_0' ,this.elForm).click();
	$('#Radio_SC_E' ,this.elForm).click();
	
};
SearchForm.prototype.InitRadio = function() {
	var self = this;
	
	this.RadioInputs = $('input[type="radio"]' ,this.elForm);
	$(this.RadioInputs).click(function(){
		var CurrentRadio = this;
		var Radios = CurrentRadio.form[CurrentRadio.name];
		$(Radios).each(function(i){
			var CurrentRadio = Radios[i];
			var Labels = $('label[for=' + CurrentRadio.id + ']');
			$(Labels).each(function(j) {
				var CurrentLabel = Labels[j];
				if(CurrentRadio.checked === true){
					if ($(CurrentLabel).hasClass("checked") === false) {
						$(CurrentLabel).addClass("checked");
						if ($.browser.msie) {
							//var vml = '<v:oval style="width: ' + CurrentLabel.offsetHeight + 'px;height: ' + CurrentLabel.offsetHeight + 'px;" fillcolor="' + CurrentLabel.currentStyle['backgroundColor'] + '" strokecolor="' + CurrentLabel.currentStyle['backgroundColor'] + '">' + CurrentLabel.innerText + '</v:oval>';
							var vml = '<v:oval style="width: ' + CurrentLabel.offsetWidth + 'px;height: ' + CurrentLabel.offsetHeight + 'px;" fillcolor="' + CurrentLabel.currentStyle['backgroundColor'] + '" strokecolor="' + CurrentLabel.currentStyle['backgroundColor'] + '">' + CurrentLabel.innerText + '</v:oval>';
							$(CurrentLabel).addClass("vml");
							CurrentLabel.innerHTML = vml;
						}
					}
				} else {
					if ($.browser.msie) {
						CurrentLabel.innerHTML = CurrentLabel.innerText;
						$(CurrentLabel).removeClass("vml");
					}
					$(CurrentLabel).removeClass("checked");
				}
			});
		});
	});
	$(this.RadioInputs).focus(function(){
		var CurrentRadio = this;
		var Radios = CurrentRadio.form[CurrentRadio.name];
		$(Radios).each(function(i){
			var CurrentRadio = Radios[i];
			var Labels = $('label[for=' + CurrentRadio.id + ']');
			$(Labels).each(function(j) {
				var CurrentLabel = Labels[j];
				$(CurrentLabel).addClass("focus");
			});
		});
	});
	$(this.RadioInputs).blur(function(){
		var CurrentRadio = this;
		var Radios = CurrentRadio.form[CurrentRadio.name];
		$(Radios).each(function(i){
			var CurrentRadio = Radios[i];
			var Labels = $('label[for=' + CurrentRadio.id + ']');
			$(Labels).each(function(j) {
				var CurrentLabel = Labels[j];
				$(CurrentLabel).removeClass("focus");
			});
		});
	});
};
SearchForm.prototype.CreateAirportInputs = function(){
	var Row = this.elTable.insertRow(this.elTable.rows.length);
	var Td1 = Row.insertCell(0);
		Td1.className = "col1";
	var Td2 = Row.insertCell(1);
		Td2.className = "col2";
	Td1.innerHTML = '<div class="fieldsetText"><label for="input_From"><span class="title">' + l10n.searchForm.From + ' </span><span class="comment">' + l10n.searchForm.FromComment + ' </span></label><div class="InputBlock"><input name="From" id="input_From" type="text" autocomplete="off" value=""/><label class="Code" for="input_From"></label></div></div>';
	Td2.innerHTML = '<div class="fieldsetText"><label for="input_To"><span class="title">' + l10n.searchForm.To + ' </span><span class="comment">' + l10n.searchForm.ToComment + ' </span></label><div class="InputBlock"><input name="To" id="input_To" type="text" autocomplete="off" value=""/><label class="Code" for="input_To"></label></div></div>';
	
	this.input_From = document.getElementById("input_From");
	this.input_From.readOnly = true;
	this.input_To = document.getElementById("input_To");
	this.input_To.readOnly = true;
	
	this.elFromCode = $('label.Code[for="input_From"]')[0];
	this.elToCode = $('label.Code[for="input_To"]')[0];
	
	this.SuggestFrom = new Suggest(this.input_From, this);
	this.SuggestTo = new Suggest(this.input_To, this);
};
SearchForm.prototype.AnableAirportInputs = function() {
	this.input_From.readOnly = false;
	this.input_To.readOnly = false;
	this.SuggestFrom.MakeSuggest();
	this.SuggestTo.MakeSuggest();
};
SearchForm.prototype.UpdateAirport = function (Direction, DirectionResult){
	if(Direction == "From") {
		this.objAvia.From = DirectionResult;
	} else {
		this.objAvia.To = DirectionResult;
	}
	this.DrawCodes();
};
SearchForm.prototype.DrawCodes = function() {
	if(this.objAvia.From){
		this.elFromCode.innerHTML = this.objAvia.From.Code;
	} else {
		this.elFromCode.innerHTML = "";
	}
	if(this.objAvia.To){
		this.elToCode.innerHTML = this.objAvia.To.Code;
	} else {
		this.elToCode.innerHTML = "";
	}
};
SearchForm.prototype.CreateCalendars = function(){
	var self = this;
	var Row = this.elTable.insertRow(this.elTable.rows.length);
	var Td1 = Row.insertCell(0);
		Td1.className = "col1";
	var Td2 = Row.insertCell(1);
		Td2.className = "col2";
	Td1.innerHTML = '<div class="fieldsetCalendar" id="DirectDate"><span class="title" id="DirectDateTitle">' + l10n.searchForm.Direct + '</span></div>';
	Td2.innerHTML = '<div class="fieldsetCalendar" id="ReturnDate"><label class="title" id="ReturnDateTitle"><input type="checkbox" name="Return" value="true"/> ' + l10n.searchForm.Return + '</label></div>';
	this.elDirectDate = document.getElementById("DirectDate");
	this.DirectCalendar = new Calendar(this.elDirectDate, this.objAvia);
	this.elReturnDate = document.getElementById("ReturnDate");
	this.ReturnCalendar = new Calendar(this.elReturnDate, this.objAvia);
	$("#ReturnDateTitle").click(function(){}); // Apple touch
	$(this.elForm.Return).click(function() {
		if(this.checked == true) {
			self.objAvia.Return = true;
			self.ReturnCalendar.Show();
		} else {
			self.objAvia.Return = false;
			self.ReturnCalendar.Hide();
		}
	});
};
SearchForm.prototype.CreateButton = function() {
	var Div = document.createElement("div");
		Div.className = "SearchButtonRow";
	this.elForm.appendChild(Div);
	Div.innerHTML = '<button type="submit">' + l10n.searchForm.Button + '</button>';
	this.SubmitButton = $("button", this.elForm)[0];
	if ($.browser.msie) {
		var Radius = this.SubmitButton.offsetHeight - 10;
		var vml = '<v:oval style="width: ' + Radius + 'px;height: ' + Radius + 'px;" fillcolor="' + this.SubmitButton.currentStyle['backgroundColor'] + '" strokecolor="' + this.SubmitButton.currentStyle['borderColor'] + '" strokeweight="' + this.SubmitButton.currentStyle['borderWidth'] + '">' + this.SubmitButton.innerText + '</v:oval>';
		$(this.SubmitButton).addClass("vml");
		this.SubmitButton.innerHTML = vml;
	}
};
SearchForm.prototype.Hide = function() {
	$(this.elForm).addClass("invisible");
};
SearchForm.prototype.Show = function() {
	$(this.elForm).removeClass("invisible");
};

ProgressBar = function(objAvia){
	this.objAvia = objAvia;
	this.elProgressBar = document.createElement("div");
	this.elProgressBar.id = "avia_ProgressBar";
	this.elProgressBar.className = "invisible";
	var elTitle = document.createElement("div");
		elTitle.innerHTML = l10n.ProgressBarTitle;
	this.elProgressBar.appendChild(elTitle);
	var elBar = document.createElement("div");
		elBar.className = "Bar";
	this.elProgress = document.createElement("div");
	this.elProgress.className = "Progress";
	elBar.appendChild(this.elProgress);
	this.elProgressBar.appendChild(elBar);
	this.objAvia.elLayout.appendChild(this.elProgressBar);
}
ProgressBar.prototype.Show = function() {
	document.body.style.cursor = "progress";
	this.elProgress.style.width = "0%";
	$(this.elProgressBar).removeClass("invisible");
};
ProgressBar.prototype.Update = function(Percentage) {
	$(this.elProgress).animate( {width: Percentage + '%'}, 500);
};
ProgressBar.prototype.Hide = function() {
	document.body.style.cursor = "default";
	$(this.elProgressBar).addClass("invisible");
};

function Results(json) {
	var self = this;
	this.JSON = json;
	this.elResult = document.getElementById("avia_results");
	this.AirlinesHash = {};
	this.Draw();
}
Results.prototype.Draw = function() {
	this.elResult.innerHTML = "";
	var elAirlinesList = document.createElement("ul");
	for (var i = 0, length = this.JSON.Airlines.length; i < length; i++) {
		var CurrentAirline = this.JSON.Airlines[i];
		var elAirline = document.createElement("li");
		var objAirline = new Airline(CurrentAirline, this);
		this.AirlinesHash[CurrentAirline.Code] = objAirline;
		
		elAirline.appendChild(objAirline.entElt);
		elAirline.appendChild(objAirline.Fares);
		
		if (i === 0) {
			objAirline.ToggleFares();
		}
		elAirlinesList.appendChild(elAirline);
	}
	this.elResult.appendChild(elAirlinesList);
	this.Show();
};
Results.prototype.Show = function() {
	$(this.elResult).removeClass("invisible");
};
Results.prototype.Hide = function() {
	$(this.elResult).addClass("invisible");
};

function Airline(CurrentAirline, objResults) {
	var self = this;
	this.objResults = objResults;
	this.JSON = CurrentAirline;
	this.objFaresArr = [];
	this.entElt = null;
	this.Fares = null;
	this.Create();
	this.CreateFares();
}
Airline.prototype.Create = function() {
	var self = this;
	this.entElt = document.createElement("div");
	this.entElt.className = "Airline";
	var Table = document.createElement("table");
	var Row = Table.insertRow(0);
	var AmountTd = Row.insertCell(0);
		AmountTd.className = "Amount";
		var elFrom = document.createElement("span");
			elFrom.innerHTML  = l10n.PriceFrom + "\u00A0";
		AmountTd.appendChild(elFrom);
		var elAmount = document.createElement("span");
			elAmount.className = "Amount";
			elAmount.innerHTML = FormatMoney(this.JSON.FaresFull[0].TotalAmount);
		AmountTd.appendChild(elAmount);
	var AirlineTd = Row.insertCell(1);
		AirlineTd.className = "Airline";
		AirlineTd.colSpan = "2";
		var elAirline = document.createElement("span");
			elAirline.innerHTML = this.JSON.Name;
		AirlineTd.appendChild(elAirline);
	var LogoTd = Row.insertCell(2);
		LogoTd.className = "Logo";
		LogoTd.innerHTML = '<img src="' + config.AircompanyLogosPath + this.JSON.Code + '.png" alt=""/>';
	var ToggleTd = Row.insertCell(3);
		ToggleTd.className = "Toggle";
		this.FareDetailsLink = document.createElement("span");
		this.FareDetailsLink.innerHTML = "+";
		$(this.entElt).click(function(){
			self.ToggleFares();
		});
		ToggleTd.appendChild(this.FareDetailsLink);
	this.entElt.appendChild(Table);
};
Airline.prototype.CreateFares = function() {
	var self = this;
	this.Fares = document.createElement("div");
	this.Fares.className = "Fare invisible";
	var HeaderTable = document.createElement("table");
		HeaderTable.className = "HeaderTable";
	var HeaderRow = HeaderTable.insertRow(0);
	var AmountTh = HeaderRow.insertCell(0);
		AmountTh.className = "Amount";
		AmountTh.innerHTML = "<span>" + l10n.Results.Amount + "</span>";
	var NextTh = HeaderRow.insertCell(1);
		NextTh.colSpan = "4";
		var HeaderInnerTable = document.createElement("table");
		var HeaderInnerRow = HeaderInnerTable.insertRow(0);
			var DepartureTh = HeaderInnerRow.insertCell(0);
				DepartureTh.innerHTML = "<span>" + l10n.Results.Departure + "</span>";
			var ArrowTh = HeaderInnerRow.insertCell(1);
				ArrowTh.className = "Arrow";
			var ArrivalTh = HeaderInnerRow.insertCell(2);
				ArrivalTh.innerHTML = "<span>" + l10n.Results.Arrival + "</span>";
			var TimesTh = HeaderInnerRow.insertCell(3);
				TimesTh.className = "Times";
				TimesTh.innerHTML = "<span>" + l10n.Results.Times + "</span>";
			var TravelTh = HeaderInnerRow.insertCell(4);
				TravelTh.className = "Travel";
				TravelTh.innerHTML = "<span>" + l10n.Results.Travel + "</span>";
		NextTh.appendChild(HeaderInnerTable);
	this.Fares.appendChild(HeaderTable);
		
	this.FaresTable = document.createElement("table");
	this.FaresCounter = 0;
	for(var i = 0, length = this.JSON.FaresFull.length; i < length; i++){
		var JSON_Fare = this.JSON.FaresFull[i];
		
		if (JSON_Fare.Directions.length > 1) {
			for (var j = 0, SegmentsLength = JSON_Fare.Directions[0].Segments.length; j < SegmentsLength; j++) {
				for (var k = 0, BackSegmentsLength = JSON_Fare.Directions[1].Segments.length; k < BackSegmentsLength; k++) {
					var Segments = [JSON_Fare.Directions[0].Segments[j],JSON_Fare.Directions[1].Segments[k]];
					//this.DrawFare(JSON_Fare, Segments);
					this.objFaresArr.push(new Fare(JSON_Fare, Segments, this));
					//this.FaresCounter++;	
				}
			}
		} else {
			for (var j = 0, SegmentsLength = JSON_Fare.Directions[0].Segments.length; j < SegmentsLength; j++) {
				var Segments = [JSON_Fare.Directions[0].Segments[j]];
				this.objFaresArr.push(new Fare(JSON_Fare, Segments, this));
				//this.DrawFare(JSON_Fare, Segments);
				//this.FaresCounter++;
			}
		}
	}	
	this.Fares.appendChild(this.FaresTable);
};
Airline.prototype.ToggleFares = function() {
	if($(this.Fares).hasClass("invisible")){
		$(this.Fares).removeClass("invisible");
		this.FareDetailsLink.innerHTML = "−";
	} else {
		$(this.Fares).addClass("invisible");
		this.FareDetailsLink.innerHTML = "+";
	}
};

function Fare(Fare, Segments, objAirline) {
	var self = this;
	this.objAirline = objAirline;
	this.Fare = Fare;
	this.Segments = Segments;
	this.FareId = this.Fare.FareId;
	this.SegmentsId = [];
	this.SegmentsId[0] = this.Segments[0].Id;
	if(this.Segments.length > 1) {
		this.SegmentsId[1] = this.Segments[1].Id;
	}
	
	var Row = this.objAirline.FaresTable.insertRow(this.objAirline.FaresTable.rows.length);
	
	this.AmountTd = Row.insertCell(0);
		this.AmountTd.className = "Amount";
		if(Segments.length > 1) {
			this.AmountTd.className += " middle";
		}
		var elAmount = document.createElement("span");
			elAmount.className = "Amount";
			elAmount.title = l10n.Results.Choose;;
			elAmount.innerHTML = FormatMoney(this.Fare.TotalAmount) + " " + l10n.CurrencyAbbr;
			$(elAmount).click(function() {
				ConfirmFare(self.FareId, self.SegmentsId, self);
			});
		this.AmountTd.appendChild(elAmount);
	var NextTd = Row.insertCell(1);
		NextTd.colSpan = "4";
		NextTd.appendChild(this.DrawSegments(Segments));
}
Fare.prototype.DrawSegments = function(Segments) {
	var FlightTable = document.createElement("table");
	
	for(var seg = 0, segLength = Segments.length; seg < segLength; seg++){
		var Segment = Segments[seg];
		var DepartureTrip = Segment.Trips[0];
		var TripsLength = Segment.Trips.length;
		var ArrivalTrip = Segment.Trips[TripsLength - 1];
		
		var FlightRow = FlightTable.insertRow(seg);
		
		var DepartureTd = FlightRow.insertCell(0);
			DepartureTd.innerHTML = DepartureTrip.Departure.Airport;
		var ArrowTd = FlightRow.insertCell(1);
			ArrowTd.className = "Arrow";
			var elArrow = document.createElement("span");
				elArrow.className = "Direction" + (seg + 1);
				elArrow.innerHTML = "→";
			ArrowTd.appendChild(elArrow);
		var ArrivalTd = FlightRow.insertCell(2);
			ArrivalTd.innerHTML = ArrivalTrip.Arrival.Airport;
		var TimesTd = FlightRow.insertCell(3);
			TimesTd.className = "Times"; 
			TimesTd.innerHTML = DepartureTrip.Departure.Time + " – " + ArrivalTrip.Arrival.Time;
			
		var TravelTd = FlightRow.insertCell(4);
			TravelTd.className = "Travel";
			var elTravelTime = document.createElement("span");
				elTravelTime.className = "TravelTime";
				elTravelTime.innerHTML = TimeSpan(Segment.TravelTime) + ",";
			TravelTd.appendChild(elTravelTime);
			var elStops = document.createElement("span");
				elStops.innerHTML = (Segment.Trips.length - 1);
			TravelTd.appendChild(elStops);
	}
	return FlightTable;
};
Fare.prototype.NotConfirmed = function(){
	this.AmountTd.innerHTML = "";
	var Span = document.createElement("span");
		Span.className = "NotConfirmed";
		Span.innerHTML = l10n.Results.FareNotConfirmed;
	this.AmountTd.appendChild(Span);
	FadeOut();
	document.body.style.cursor = "default";
}

function ConfirmFare(FareId, SegmentsId, objFare){
	var sSegmentsId = "";
	for(var seg = 0, segLength = SegmentsId.length; seg < segLength; seg++) {
		sSegmentsId += SegmentsId[seg];
		if((seg + 1) != segLength){
			sSegmentsId += ";";
		}
	}
	Params = {
		R: objAvia.objResults.JSON.RequestId,
		F: FareId,
		V: sSegmentsId,
		_Serialize: "JSON"
	};
	var Tries = 5;
	var TempAjaxAbortNumber = AjaxAbortNumber;
	FadeIn("",0.5);
	document.body.style.cursor = "progress";
	MakeRequest();
	function MakeRequest() {
		if (TempAjaxAbortNumber === AjaxAbortNumber) {
			$.ajax({
				type: "get",
				dataType: "jsonp",
				data: Params,
				url: config.ApiPath + "/ConfirmFare/",
				success: function(json) {
					if(json.Confirmed == "True") {
						GetCreateOrderURL(FareId, SegmentsId);
					} else {
						new AlertMessage(l10n.Results.FareNotConfirmedAlert);
						objFare.NotConfirmed();
					}
				},
				error: function() {
					if (Tries > 0) {
						Tries--;
						setTimeout(arguments.callee, 2000);
					}
				}
			});
		}
	}
};
function GetCreateOrderURL(FareId, SegmentsId){
	var sSegmentsId = "";
	for(var seg = 0, segLength = SegmentsId.length; seg < segLength; seg++) {
		sSegmentsId += SegmentsId[seg];
		if((seg + 1) != segLength){
			sSegmentsId += ";";
		}
	}
	Params = {
		R: objAvia.objResults.JSON.RequestId,
		F: FareId,
		V: sSegmentsId,
		L: language,
		C: l10n.Currency,
		_Serialize: "JSON"
	};
	var Tries = 5;
	var TempAjaxAbortNumber = AjaxAbortNumber;
	MakeRequest();
	function MakeRequest() {
		if (TempAjaxAbortNumber === AjaxAbortNumber) {
			$.ajax({
				type: "get",
				dataType: "jsonp",
				data: Params,
				url: config.ApiPath + "/GetCreateOrderURL/",
				success: function(json) {
					if (json.URL != null) {
						//log(json.URL)
						top.location.href = json.URL;
					} else {
						alert(json.Error);
					}
				},
				error: function() {
					if (Tries > 0) {
						Tries--;
						setTimeout(arguments.callee, 2000);
					}
				}
			});
		}
	}
}

function SuggestList() {
	this.Hash = {};
	this.Arr = [];
}
SuggestList.prototype.Add = function(Obj) {
	this.Hash[Obj.Code] = Obj;
	this.Arr.push(Obj);
};
SuggestList.prototype.GetLength = function() {
	return this.Arr.length;
};

function Suggest(Input, parentObj){
	var self = this;
	this.parentObj = parentObj;
	this.Input = Input;
	this.Direction = this.Input.name;
	
	this.TempValue = null;
	
	this.InFocus = false;
	$(this.Input).focus(function() {
		self.InFocus = true;
	});
	$(this.Input).blur(function() {
		self.InFocus = false;
	});
	this.ClickOutsideLink = function(event){
		self.ClickOutside(event);
	};
	this.OnKeyDownLink = function(event){
		self.OnKeyDown(event);
	};
	
	$(this.Input).keyup(function() {
		if (self.Input.value != self.TempValue && self.Input.value.length >= 3) {
			self.CurrentResult = null;
			self.parentObj.UpdateAirport(self.Direction, self.CurrentResult);
			var Temp = self.Input.value;
			setTimeout(function() {
				if (Temp == self.Input.value) {
					self.MakeSuggest();
				}
			}, 350);
		} else if(self.Input.value != self.TempValue) {
			self.Hide();
			self.parentObj.UpdateAirport(self.Direction, self.CurrentResult);
			self.TempValue = self.Input.value;
		}
	});
	
	this.SelectedRow = null;
}
Suggest.prototype.MakeSuggest = function() {
	this.TempValue = this.Input.value;
	var queryString = this.TempValue.toLowerCase();
	if (queryString.length >= 3) {
		this.SuggestResult = new SuggestList();
		this.CurrentResult = null;
		
		this.GetResult(queryString);
		
		if (this.SuggestResult.GetLength() > 1) {
			if (this.InFocus === true) {
				this.Draw();
			} else {
				this.CurrentResult = this.SuggestResult.Arr[0];
				this.SetCurrentResult();
			}
		} else if (this.SuggestResult.GetLength() == 1) {
			this.CurrentResult = this.SuggestResult.Arr[0];
			this.SetCurrentResult();
			this.Hide();
		} else {
			this.Hide();
		}
	}
};
Suggest.prototype.GetResult = function(queryString){
	var self = this;
	Get(queryString);
	Get(queryString.ChangeEnToRu());
	Get(queryString.ChangeRuToEn());
	function Get(String){
		if (String.length >= 3) {
			if (String.length === 3) {
				self.GetCityByCode(String);
				self.GetAirportByCode(String);
			}
			self.GetCities(String);
			self.GetAirports(String);
		}
	}
};
Suggest.prototype.GetCityByCode = function(queryString){
	var queryStringInUpperCase = queryString.toUpperCase();
	if (CitiesVsCountries[queryStringInUpperCase] && !this.SuggestResult.Hash[queryStringInUpperCase]) {
		var CityCode 	= queryStringInUpperCase;
		var CountryCode = CitiesVsCountries[CityCode];
		var CurrentObj = {
			Code: CityCode,
			City: Cities[language][CityCode],
			Country: Countries[language][CountryCode]
		};
		this.SuggestResult.Add(CurrentObj);
	}
};
Suggest.prototype.GetAirportByCode = function(queryString){
	var queryStringInUpperCase = queryString.toUpperCase();
	if (AirportsVsCities[queryStringInUpperCase] && !this.SuggestResult.Hash[queryStringInUpperCase]) {
		var AirportCode = queryStringInUpperCase;
		var CityCode 	= AirportsVsCities[AirportCode];
		var CountryCode = CitiesVsCountries[CityCode]; 
		var CurrentObj = {
			Code: AirportCode,
			Airport: Airports[language][AirportCode],
			City: Cities[language][CityCode],
			Country: Countries[language][CountryCode]
		};
		this.SuggestResult.Add(CurrentObj);
	}
};
Suggest.prototype.GetCities = function(queryString) {
	var queryStringLength = queryString.length;
	for (var lang in Cities) {
		for (var i in Cities[lang]) {
			if (!this.SuggestResult.Hash[i]) {
				var CurrentCity = Cities[lang][i];
				if (CurrentCity.substr(0, queryStringLength).toLowerCase() === queryString) {
					var CityCode = i;
					var CountryCode = CitiesVsCountries[CityCode];
					var CurrentObj = {
						Code: CityCode,
						City: Cities[language][CityCode],
						Country: Countries[language][CountryCode]
					};
					this.SuggestResult.Add(CurrentObj);
				}
			}
		}	
	}
};
Suggest.prototype.GetAirports = function(queryString) {
	var queryStringLength = queryString.length;
	for (var lang in Airports) {
		for (var i in Airports[lang]) {
			if (!this.SuggestResult.Hash[i]) {
				var CurrentAirport = Airports[lang][i];
				if (CurrentAirport.substr(0, queryStringLength).toLowerCase() === queryString) {
					var AirportCode = i;
					var CityCode = AirportsVsCities[AirportCode];
					var CountryCode = CitiesVsCountries[CityCode];
					var CurrentObj = {
						Code: AirportCode,
						Airport: Airports[language][AirportCode],
						City: Cities[language][CityCode],
						Country: Countries[language][CountryCode]
					};
					this.SuggestResult.Add(CurrentObj);
				}
			}
		}
	}
};
Suggest.prototype.Draw = function() {
	var self = this;
	this.elSuggest = document.getElementById("Suggest");
	if (this.elSuggest == null) {
		this.elSuggest = document.createElement("div");
		this.elSuggest.id = "Suggest";
		this.elSuggest.className = "invisible";
		$(this.elSuggest).click(function(event) {
			event.stopPropagation();
		});
		document.body.appendChild(this.elSuggest);
	} else {
		this.elSuggest.innerHTML = "";
	}
	
	var elTable = document.createElement("table");
	for(var i = 0, ResultsCount = this.SuggestResult.GetLength() < 10 ? this.SuggestResult.GetLength() : 10; i < ResultsCount; i++){
		var Item = this.SuggestResult.Arr[i];
		var Row = elTable.insertRow(-1);
		var Str = "";
			if(Item.Airport && Item.Airport != Item.City){
				Str += Item.Airport + ", ";
			}
			Str += Item.City + ", " + Item.Country;
		var NameCell = Row.insertCell(0);
			NameCell.appendChild(document.createTextNode(Str));
		var CodeCell = Row.insertCell(1);
			CodeCell.appendChild(document.createTextNode(Item.Code));
		
		Row.onmouseover = function() {
			self.SetRowHover(this);
		};
		Row.onmouseout = function() {
			self.DropRowHover(this);
		};
		Row.onclick = function() {
			self.SetCurrentResult();
			self.Hide();
		};
	}
	this.SetRowHover(elTable.rows[0]);
	elTable.onmouseout = function() {
		self.SetRowHover(self.SelectedRow);
	};
	this.elSuggest.appendChild(elTable);
	
	this.Show();
};
Suggest.prototype.Show = function() {
	var self = this;
	var InputOffset = getOffset(this.Input);
	this.elSuggest.style.top = InputOffset.top + this.Input.offsetHeight + "px";
	this.elSuggest.style.left = InputOffset.left + "px";
	
	$(document).unbind("click", self.ClickOutsideLink);
	$(this.Input).unbind("keydown", self.OnKeyDownLink);
	
	$(document).bind("click", self.ClickOutsideLink);
	$(this.Input).bind("keydown", self.OnKeyDownLink);
	
	$(this.elSuggest).removeClass("invisible");
};
Suggest.prototype.Hide = function() {
	var self = this;
	$(document).unbind("click", self.ClickOutsideLink);
	$(this.Input).unbind("keydown", self.OnKeyDownLink);
	this.CurrentResult = null;
	var elSuggest = document.getElementById("Suggest");
	if (elSuggest) {
		document.body.removeChild(elSuggest);
	}
};
Suggest.prototype.ClickOutside = function(event) {
	if (event.target != this.Input) {
		this.SetCurrentResult();
		this.Hide();
	}
};
Suggest.prototype.OnKeyDown = function(event) {	
	switch (event.keyCode) {
		case 9: // <Tab>
			this.SetCurrentResult();
			this.Hide();
			break;
		case 27: // <Esc>
			this.Hide();
			break;
		case 38: // <Up>
			this.SetPrevRowHover();
			break;
		case 40: // <Down>
			this.SetNextRowHover();
			break;
		case 13: // <Enter>
			event.preventDefault();
			this.SetCurrentResult();
			this.Hide();
			break;
	}
};
Suggest.prototype.SetPrevRowHover = function() {
	if (this.SelectedRow) {
		var PrewRow = this.SelectedRow.previousSibling;
		if (PrewRow) {
			this.SetRowHover(PrewRow);
			this.SelectedRow = PrewRow;
		}
	}
};
Suggest.prototype.SetNextRowHover = function() {
	if (this.SelectedRow) {
		var NextRow = this.SelectedRow.nextSibling;
		if (NextRow) {
			this.SetRowHover(NextRow);
			this.SelectedRow = NextRow;
		}
	}
};
Suggest.prototype.SetRowHover = function(Row) {
	if (this.SelectedRow) {
		this.DropRowHover(this.SelectedRow);
	}
	$(Row).addClass("hover");
	this.SelectedRow = Row;
	var rowIndex = this.SelectedRow.rowIndex;
	this.CurrentResult = this.SuggestResult.Arr[rowIndex];
};
Suggest.prototype.DropRowHover = function(Row){
	$(Row).removeClass("hover");
};
Suggest.prototype.SetCurrentResult = function() {
	if (this.CurrentResult) {
		if (this.TempValue == this.Input.value) {
			if (this.CurrentResult.Airport) {
				var Str = this.CurrentResult.Airport;
			} else {
				Str = this.CurrentResult.City;
			}
			this.Input.value = Str;
			this.TempValue = this.Input.value;
			this.parentObj.UpdateAirport(this.Direction, this.CurrentResult);
		}
	}
};

function Calendar(Container, objAvia) {
	var self = this;
	this.date = (new Date()).cutTime();
	this.today = (new Date()).cutTime();
	this.Container = Container;
	this.objAvia = objAvia;
	this.Direction = (this.Container.id == "DirectDate") ? "Direct" : "Return";
	if(this.Direction === "Direct") {
		if (this.objAvia.DirectDate) {
			this.date = new Date(this.objAvia.DirectDate);
		}
	} else {
		if (this.objAvia.ReturnDate) {
			this.date = new Date(this.objAvia.ReturnDate);
		} else if (this.objAvia.DirectDate) {
			this.date = new Date(this.objAvia.DirectDate);
		}
	}
	this.options = {};
	this.CreateStructure();
}
Calendar.prototype.CreateStructure = function() {
	var self = this;
	this.rootElement = document.createElement("div");
	this.rootElement.className = "Calendar";
	if(this.Direction === "Return") {
		$(this.rootElement).addClass("invisible");
	}
	var ContainerTable = document.createElement("table");
		ContainerTable.className = "Calendar";
	this.rootElement.appendChild(ContainerTable);
	var ContainerRow = ContainerTable.insertRow(0);
	var DayCell = ContainerRow.insertCell(0);
		DayCell.className = "ContainerDayCell";
	this.WeekDay = document.createElement("div");
	this.WeekDay.className = "WeekDay";
	DayCell.appendChild(this.WeekDay);
	var DayContainer = document.createElement("div");
		DayContainer.className = "DayContainer";
	this.CurrentDay = document.createElement("div");
	this.CurrentDay.className = "CurrentDay";
	DayContainer.appendChild(this.CurrentDay);
	var DayOverline = document.createElement("div");
		DayOverline.className = "DayOverline";
	DayContainer.appendChild(DayOverline);	
	DayCell.appendChild(DayContainer);
	
	if(this.Direction === "Direct"){
		var ContainerMonthCell = ContainerRow.insertCell(1);
	} else {
		ContainerMonthCell = ContainerRow.insertCell(0);
	}
		ContainerMonthCell.className = "ContainerMonthCell";
	this.MonthTable = document.createElement("table");
	this.MonthTable.insertRow(0);
	var THead = this.MonthTable.createTHead(0);
	var MonthLabelRow = THead.insertRow(0);
		MonthLabelRow.className = "MonthLabelRow";
	var MonthArLeft = MonthLabelRow.insertCell(0);
		MonthArLeft.className = "MonthArLeftCell";
	var MonthArLeftSpan = document.createElement("span");
		MonthArLeftSpan.onclick = function() {
			self.PrevMonth();
		};
		MonthArLeft.appendChild(MonthArLeftSpan);
	var MonthCell = MonthLabelRow.insertCell(1);
		MonthCell.colSpan = "5";
		MonthCell.className = "MonthCell";
	var MonthArRight = MonthLabelRow.insertCell(2);
		MonthArRight.className = "MonthArRightCell";
	var MonthArRightSpan = document.createElement("span");
		MonthArRightSpan.onclick = function() {
			self.NextMonth();
		};
		MonthArRight.appendChild(MonthArRightSpan);
	var DlabelRow = THead.insertRow(1);
	DlabelRow.className = "DlabelRow";
	for (var wd = 0; wd < 7; wd++) {
		var DayLabelCell = DlabelRow.insertCell(wd);
		DayLabelCell.appendChild(document.createTextNode(this.GetDayName(wd)));
	}
	ContainerMonthCell.appendChild(this.MonthTable);
	this.Draw();
	this.Container.appendChild(this.rootElement);
};
Calendar.prototype.Show = function(){
	$(this.rootElement).removeClass("invisible");
};
Calendar.prototype.Hide = function(){
	$(this.rootElement).addClass("invisible");
};
Calendar.prototype.GetDayName = function(k) {
	var q = k + l10n.calendar.weekstart;
	if (q > 6) q = q - 7;
	return l10n.calendar.days_S1[q];
};
Calendar.prototype.NextMonth = function() {
	this.date = new Date(this.date.setDate(1));
	this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
	this.Draw();
};
Calendar.prototype.PrevMonth = function() {
	this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
	this.date = new Date(this.date.setDate(1));
	this.Draw();
};
Calendar.prototype.Draw = function() {
	this.DrawCurrentDay();
	this.DrawMonth();
	this.DrawDays();
};
Calendar.prototype.DrawCurrentDay = function() {
	var CurrentDate = new Date(this.today);
	if(this.Direction === "Direct") {
		if (this.objAvia.DirectDate) {
			CurrentDate = this.objAvia.DirectDate;
		}
	} else {
		if (this.objAvia.ReturnDate) {
			CurrentDate = this.objAvia.ReturnDate;
		} else if (this.objAvia.DirectDate) {
			CurrentDate = this.objAvia.DirectDate;
		}
	}
	this.WeekDay.innerHTML = "";
	var WeekDayStr = l10n.calendar.days_N[CurrentDate.getDay()];
	if (language == "en") {
		this.WeekDay.appendChild(document.createTextNode(WeekDayStr));
	} else {
		this.WeekDay.appendChild(document.createTextNode( WeekDayStr.toLowerCase() ));
	}
	this.CurrentDay.innerHTML = "";
	var CurrentDateStr = CurrentDate.getDate();
	if(CurrentDateStr < 10){
		CurrentDateStr = "0";
		CurrentDateStr += CurrentDate.getDate();
	}
	this.CurrentDay.appendChild(document.createTextNode(CurrentDateStr));
};
Calendar.prototype.DrawMonth = function() {
	var self = this;
	var tempDate = new Date(this.date);
		tempDate.setMonth(tempDate.getMonth());
	this.MonthTable.rows[0].cells[1].innerHTML = "";
	var MonthStr = l10n.calendar.monthes_N[tempDate.getMonth()] + " " + tempDate.getFullYear();
	this.MonthTable.rows[0].cells[1].appendChild(document.createTextNode(MonthStr));
};
Calendar.prototype.DrawDays = function() {
	var self = this;
	for (var r = 0; this.MonthTable.tBodies[0].rows.length > 0; r++) {
		this.MonthTable.tBodies[0].deleteRow(0);
	}
	
	var tempDate = new Date(this.date);
		tempDate.setDate(1);
	var currentMonth = tempDate.getMonth();
	
	var DayShift = (tempDate.getDay() - l10n.calendar.weekstart) % 7;
	if (DayShift < 0) {
		DayShift += 7;
	}
	tempDate.setDate(tempDate.getDate() - DayShift);
	
	for (var weekNumber = 0; weekNumber < 6; weekNumber++) {
		var row = this.MonthTable.tBodies[0].insertRow(-1);
		for (var i = 0; i < 7; i++) {
			var cell = row.insertCell(-1);
			var DateStr = tempDate.getDate();
			
			if (tempDate.getMonth() != currentMonth) {
				cell.className += " AnotherMonthDay";
			}
			if (tempDate < this.today) {
				cell.className += " PastDay";
			}
			if (tempDate > this.today) {
				cell.className += " FutureDay";
				cell.onclick = function(event) {
					self.OnDayClick(event, this);
				};
			}
			var Yesterday = new Date(tempDate);
				Yesterday.setDate(Yesterday.getDate() + 1);
			if (Yesterday.valueOf() ==  this.today.valueOf()) {
				cell.className += " Yesterday";
				cell.onclick = function(event) {
					self.OnDayClick(event, this);
				};
			}
			if (tempDate.valueOf() == this.today.valueOf()) {
				cell.className += " Today";
				cell.onclick = function(event) {
					self.OnDayClick(event, this);
				};
			}
			if (this.Direction === "Direct") {
				if (this.objAvia.DirectDate !== null) {
					if (tempDate.valueOf() == this.objAvia.DirectDate.valueOf()) {
						cell.className += " DirectDate";
					}
				}
			}
			if (this.Direction === "Return") {
				if (this.objAvia.ReturnDate !== null) {
					if (tempDate.valueOf() == this.objAvia.ReturnDate.valueOf()) {
						cell.className += " ReturnDate";
					}
				}
			}
			cell.appendChild(document.createTextNode(DateStr));
			cell.date = new Date(tempDate);
			tempDate.setDate(tempDate.getDate() + 1);
		}
	}
};
Calendar.prototype.OnDayClick = function(event, cell) {
	this.date = new Date(cell.date);
	if(this.Direction === "Direct"){
		this.objAvia.DirectDate = new Date(cell.date);
	} else {
		this.objAvia.ReturnDate = new Date(cell.date);
	}
	this.Draw();
};
