
var Page_Validators;
var Page_ValidationActive;
var requestResultMessage;
var priceActualHTML;
var ActualPriceInfoHTML;
var dictionary;

function ValidatorOnSubmit() 
{
	if (Page_ValidationActive) 
	{
		return ValidatorCommonOnSubmit();
	}
	return true;
}

function showmessage()
{
	var span = document.getElementById("WaitingControl");
	span.style.display = "none";
	var span = document.getElementById("BookingMessage");
	span.innerHTML = bookingMessage;

    parent.$(parent.document).trigger('broneOrderComplete');
}

function send()
{
	if (fullprice != null)
	{
		var span = document.getElementById("WaitingControl");
		span.style.display = "";
		var priceId = strToInt(dictionary.priceId_sm);
		var managerEmail = getManagerEmail(countriesEmail, fullprice.price.country.id);
		var object = AJS.formContents(document.forms["booking"]);
		sendOrder(priceId, managerEmail, object, showmessage)
	}
	else
	{
		if (requestResultMessage != null)
		{
			alert(requestResultMessage);
		}
	}
}

function getDateByDay(day, diff)
{
	var date = Date.fromUTCString(fullprice.price.checkinDate);
	var d = date.getDate();
	date.setDate(d + day - 1 + diff);
	return date;
}

// Возвращает email назначенный группе стран в которую входит страна aCountry.
// Если страна aCountry не найдена ни в одной из групп стран, то функция возвращает значение переменной defaultManagerEmail.
function getManagerEmail (countriesEmail, aCountry)
{
	var managerEmail = "";
	var found = false;
	var countryList;
	for(var ii=0; ii<countriesEmail.length; ii++)
	{
		countryList = countriesEmail[ii].countryList
		for(var jj=0; jj<countryList.length; jj++)
		{
			if(aCountry == countryList[jj])
			{
				managerEmail = countriesEmail[ii].managerEmail;
				found = true;
				break;
			}
		}
		if(found)
		{
			break;
		}
	}
	if(!found)
	{
		managerEmail = defaultManagerEmail;
	}
	return managerEmail;
}

function loadPrice_callback()
{
	var span = document.getElementById("WaitingLoading");
	if (span != null) {
		span.style.display = "none";
	}
	
	if (fullprice == null) return;

	var engine1 = new TemplateEngine("priceTitle", document.getElementById("priceTitle"));
	engine1.run();
	var engine2 = new TemplateEngine("PriceInfo", document.getElementById("PriceInfo"));
	engine2.run();
	var engine3 = new TemplateEngine("ServicInfo", document.getElementById("ServicInfo"));
	engine3.run();
	
	document.getElementById("NumberTurLabel").style.display = "";
	document.getElementById("HotelLabel").style.display = "";
	
	var documentElementRef;
	if (fullprice.price.operatorRURPrice != '0,00')
	{
		documentElementRef = document.getElementById("operatorRurPrice");
		if (documentElementRef != null)
		{
			documentElementRef.style.display = "";
		}
	}
	else 
	{
		documentElementRef = document.getElementById("referenceRurPrice");
		if (documentElementRef != null)
		{
			documentElementRef.style.display = "";
		}
	}
	
	if (fullprice.price.operatorCurrency.id != fullprice.convertedCurrency.id && fullprice.convertedCurrency.id != 4)
	{
		documentElementRef = document.getElementById("convertedPrice");
		if (documentElementRef != null)
		{
			documentElementRef.style.display = "";
		}
	}
	
	documentElementRef = document.getElementById("price");
	if (documentElementRef != null)
	{
		documentElementRef.style.display = "inline";
	}
	documentElementRef = document.getElementById("buttonSend");
	if (documentElementRef != null)
	{
		documentElementRef.style.display = "inline";
	}
		
	if (fullprice.spo.tourComment == "") {
	    var tourdescrLink = document.getElementById("tourdescrLink");
	    	tourdescrLink.style.display = "none";
	}

	if (fullprice.spo.extraDescr == "") {
	    var extratourdescrLink = document.getElementById("extratourdescrLink");
	    extratourdescrLink.style.display = "none";
	}
	
	if (typeof(DefaultActualizingPrice)!="undefined" && (DefaultActualizingPrice == true || DefaultActualizingPrice == "true"))
	{
		window.setTimeout(window.getActualize, 0);
	}
	
	resizeFrameEvent();
}

function onloadPriceDetails()
{
	var span = document.getElementById("WaitingLoading");
	span.style.display = "";
	ActualPriceInfoHTML = document.getElementById("ActualInfo").innerHTML;
	priceActualHTML = document.getElementById("priceActual").innerHTML;
	Page_Validators = new Array
		(
			document.getElementById("NameRequiredFieldValidator"), 
			document.getElementById("NameRegularExpressionValidator"), 
			document.getElementById("Phone1RequiredFieldValidator"), 
			document.getElementById("Phone2RequiredFieldValidator"), 
			document.getElementById("Phone3RequiredFieldValidator"), 
			document.getElementById("Phone1RegularExpressionValidator"),
			document.getElementById("Phone2RegularExpressionValidator"),
			document.getElementById("Phone3RegularExpressionValidator"),
			document.getElementById("MailRequiredFieldValidator"), 
			document.getElementById("MailRegularExpressionValidator")
		);
	Page_ValidationActive = false;
	ValidatorOnLoad();
	dictionary = CreateDictionaryFromQueryString();
	if ((viewPageShouldBeResized == "true") || (viewPageShouldBeResized == true))
	{
		var windowWidth = dictionary.windowWidth_sm, windowHeight = dictionary.windowHeight_sm;
		if (windowWidth != null && windowHeight != null)
		{
			window.resizeTo(windowWidth, windowHeight)
			window.moveTo(0, 0);
		}
	}
	document.getElementById("contactPhoneCountry").value = DefaultCountryCode;
	document.getElementById("contactPhoneCity").value = DefaultCityCode;
	document.getElementById("contactPhoneNumber").value = DefaultPhoneNumber;
	loadPrice(dictionary, loadPrice_callback);
}

function contactPhoneNumber_onclick()
{}

function contactPhoneCountry_onclick()
{}

function getActualize() {
	if (fullprice == null) return;
	
	document.getElementById("requestResultMessage").style.display = "none";
	document.getElementById("ActualStamp").style.display = "none";
	document.getElementById("buttonActualize").style.display = "none";
	
	if (!fullprice.price.actualization) {
		document.getElementById("booking").style.display = "";
		return;
	}

	document.getElementById("ActualLoading").style.display = "";
	var dictionary = CreateDictionaryFromQueryString();
	var priceId = dictionary.priceId_sm;
	actualPrice( priceId, actualize_callback );
}

function actualize_callback() {
	document.getElementById("ActualLoading").style.display = "none";
	document.getElementById("booking").style.display = "";
	
	if (actualprice == null) return;
	
	var ActualPriceInfoElement = document.getElementById("ActualInfo");
	ActualPriceInfoElement.innerHTML = ActualPriceInfoHTML;
	var engine1 = new TemplateEngine("ActualInfo", ActualPriceInfoElement);
	engine1.run();
	ActualPriceInfoElement.style.display = "";
	//document.getElementById("ServicInfo").style.display = "none";
	
	document.getElementById("convertedPrice").style.display = "none";
	if ( 
		//(fullprice.price.referenceRURPrice != actualprice.referenceRurPrice) && (fullprice.price.referenceRURPrice != "0,00") && (actualprice.referenceRurPrice != "0,00")
		//|| (fullprice.price.operatorRURPrice != actualprice.operatorRurPrice) && (fullprice.price.operatorRURPrice != "0,00") && (actualprice.operatorRurPrice != "0,00")
		( PriceCorrectionFun(fullprice.price.operatorPrice) != PriceCorrectionFun(actualprice.operatorPrice) )
	) {
		var priceElement = document.getElementById("price");
		//var temp = document.createElement("s");
		//temp.innerHTML = priceElement.innerHTML;
		priceElement.innerHTML = "<s>" + priceElement.innerHTML + "</s>";
		
		document.getElementById("priceActual").style.display = "";
		
		var priceActualElement = document.getElementById("priceActual");
		priceActualElement.innerHTML = priceActualHTML;
		var engine2 = new TemplateEngine("priceActual", priceActualElement);
		engine2.run();
	}
	
	if (actualprice.operatorRurPrice != "0,00") {
		document.getElementById("operatorRurPriceActual").style.display = "";
	} else if (actualprice.referenceRurPrice != "0,00") {
		document.getElementById("referenceRurPriceActual").style.display = "";
	}
	if (actualprice.operatorPrice != "0,00") {
		document.getElementById("operatorPriceActual").style.display = "";
	}
	
	var priceInSystemE = document.getElementById("priceInSystem");
	priceInSystemE.firstChild.childNodes[0].innerHTML = PriceCorrectionFun(actualprice.operatorPrice);
	
	document.getElementById("ActualStamp").style.display = "";
	//$("#ActualStamp").fadeTo("normal", 1);
	resizeFrameEvent();
}