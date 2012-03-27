
var Page_IsValid = true;
var Page_BlockSubmit = false;
function ValidatorUpdateDisplay(val) {
	var display, isvalid
	display = val.getAttribute("display");
	isvalid = val.getAttribute("isvalid");
	var IsValid;
	if (typeof(isvalid) == "boolean")
		IsValid = isvalid
	else
		IsValid = isvalid == "true";

    if (typeof(display) == "string") {    
        if (display == "none") {
            return;
        }
        if (display == "dynamic") {
            val.style.display = IsValid ? "none" : "inline";
            return;
        }
    }
    val.style.display = IsValid ? "none" : "";
}
function ValidatorUpdateIsValid() {
    var i, isvalid;
    for (i = 0; i < Page_Validators.length; i++) {
		if (typeof(Page_Validators[i]) == "undefined")
			continue;
		isvalid = Page_Validators[i].getAttribute("isvalid");
		var IsValid;
		if (typeof(isvalid) == "boolean")
			IsValid = isvalid
		else
			IsValid = isvalid == "true";
			
        if (!IsValid) {
            Page_IsValid = false;
            return;
        }
   }
   Page_IsValid = true;
}
function ValidatorHookupControlID(controlID, val) {
    if (typeof(controlID) != "string") {
        return;
    }
    var ctrl = document.getElementById(controlID);
    if (typeof(ctrl) != "undefined") {
        ValidatorHookupControl(ctrl, val);
    }
    else {
		val.setAttribute("isvalid", "true");
		val.setAttribute("enabled", "false");
    }
}
function ValidatorHookupControl(control, val) {
    if (typeof(control.tagName) == "undefined" && typeof(control.length) == "number") {
        var i;
        for (i = 0; i < control.length; i++) {
            var inner = control[i];
            if (typeof(inner.value) == "string") {
                ValidatorHookupControl(inner, val);
            } 
        }
        return;
    }
    else if (control.tagName != "INPUT" && control.tagName != "TEXTAREA" && control.tagName != "SELECT") {
        var i;
        for (i = 0; i < control.children.length; i++) {
            ValidatorHookupControl(control.children[i], val);
        }
        return;
    }
    else {
        if (typeof(control.Validators) == "undefined") {
            control.Validators = new Array;
            var ev;
            if (control.type == "radio") {
                ev = control.onclick;
            } else {
                ev = control.onchange;
            }
            if (typeof(ev) == "function" ) {            
                ev = ev.toString();
                ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
            }
            else {
                ev = "";
            }
            var func;
            eval("func = function(event){ValidatorOnChange(event);" + ev + "};");
            if (control.type == "radio") {
				addEvent(control, "click", func);
                //control.onclick = function(){};
            } else {            
				addEvent(control, "change", func);
                //control.onchange = function(){};
            }
        }
        control.Validators[control.Validators.length] = val;
    }    
}
function ValidatorGetValue(id) {
    var control;
    control = document.getElementById(id);
    if (typeof(control.value) == "string") {
        return control.value;
    }
    if (typeof(control.tagName) == "undefined" && typeof(control.length) == "number") {
        var j;
        for (j=0; j < control.length; j++) {
            var inner = control[j];
            if (typeof(inner.value) == "string" && (inner.type != "radio" || inner.status == true)) {
                return inner.value;
            }
        }
    }
    else {
        return ValidatorGetValueRecursive(control);
    }
    return "";
}
function ValidatorGetValueRecursive(control)
{
    if (typeof(control.value) == "string" && (control.type != "radio" || control.status == true)) {
        return control.value;
    }
    var i, val;
    for (i = 0; i<control.children.length; i++) {
        val = ValidatorGetValueRecursive(control.children[i]);
        if (val != "") return val;
    }
    return "";
}
function Page_ClientValidate() {
    
    if (typeof(Page_Validators) == "undefined")
        return true;
        
    var i;
    for (i = 0; i < Page_Validators.length; i++) {
        ValidatorValidate(Page_Validators[i]);
    }
    ValidatorUpdateIsValid();    
    ValidationSummaryOnSubmit();
    Page_BlockSubmit = !Page_IsValid;
    return Page_IsValid;
}
function ValidatorCommonOnSubmit() {
    var result = !Page_BlockSubmit;
    Page_BlockSubmit = false;
    event.returnValue = result;
    return result;
}
function ValidatorEnable(val, enable) {
	val.setAttribute("enabled", (enable != false));
    ValidatorValidate(val);
    ValidatorUpdateIsValid();
}
function ValidatorOnChange(ev) {
	var el;
    el = ev.target ? ev.target : ev.srcElement;
    var vals = el.Validators;
    var i;
    for (i = 0; i < vals.length; i++) {
        ValidatorValidate(vals[i]);
    }
    ValidatorUpdateIsValid();    
}
function ValidatorValidate(val) {
	if (typeof(val) == "undefined")
		return;

	val.setAttribute("isvalid", "true");		    
	var enabled, evaluationfunction
	enabled = val.getAttribute("enabled");
    if (enabled != "false") {
        if (typeof(val.evaluationfunction) == "function") {
			val.setAttribute("isvalid", val.evaluationfunction(val));
        }
    }
    ValidatorUpdateDisplay(val);
}
function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;
    var i, val, evalfunc, isvalid, enabled;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        if (typeof(val) == "undefined")
			continue;
		evalfunc = val.getAttribute("evaluationfunction");	
        if (typeof(evalfunc) == "string") {
            eval("val.evaluationfunction = " + evalfunc + ";");
        }
        isvalid = val.getAttribute("isvalid");
        if (typeof(isvalid) == "string") {
            if (isvalid == "false") {
				val.setAttribute("isvalid", "false");
                Page_IsValid = false;
            } 
            else {
				val.setAttribute("isvalid", "true");
            }
        } else {
            val.setAttribute("isvalid", "true");
        }
        
        enabled = val.getAttribute("enabled");
        if (typeof(enabled) == "string") {
            val.setAttribute("enabled",(enabled != "false"));
        }
        var controltovalidate, controlhookup;
        controltovalidate = val.getAttribute("controltovalidate");
        controlhookup = val.getAttribute("controlhookup");
        ValidatorHookupControlID(controltovalidate, val);
        ValidatorHookupControlID(controlhookup, val);
    }
    Page_ValidationActive = true;
}
function ValidatorConvert(op, dataType, val) {
    function GetFullYear(year) {
        return (year + parseInt(val.century)) - ((year < val.cutoffyear) ? 0 : 100);
    }
    var num, cleanInput, m, exp;
    if (dataType == "Integer") {
        exp = /^\s*[-\+]?\d+\s*$/;
        if (op.match(exp) == null) 
            return null;
        num = parseInt(op, 10);
        return (isNaN(num) ? null : num);
    }
    else if(dataType == "Double") {
        exp = new RegExp("^\\s*([-\\+])?(\\d+)?(\\" + val.decimalchar + "(\\d+))?\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        cleanInput = m[1] + (m[2].length>0 ? m[2] : "0") + "." + m[4];
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    } 
    else if (dataType == "Currency") {
        exp = new RegExp("^\\s*([-\\+])?(((\\d+)\\" + val.groupchar + ")*)(\\d+)"
                        + ((val.digits > 0) ? "(\\" + val.decimalchar + "(\\d{1," + val.digits + "}))?" : "")
                        + "\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        var intermed = m[2] + m[5] ;
        cleanInput = m[1] + intermed.replace(new RegExp("(\\" + val.groupchar + ")", "g"), "") + ((val.digits > 0) ? "." + m[7] : 0);
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    }
    else if (dataType == "Date") {
        var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-/]|\\. ?)(\\d{1,2})\\4(\\d{1,2})\\s*$");
        m = op.match(yearFirstExp);
        var day, month, year;
        if (m != null && (m[2].length == 4 || val.dateorder == "ymd")) {
            day = m[6];
            month = m[5];
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10))
        }
        else {
            if (val.dateorder == "ymd"){
                return null;		
            }						
            var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-/]|\\. ?)(\\d{1,2})\\2((\\d{4})|(\\d{2}))\\s*$");
            m = op.match(yearLastExp);
            if (m == null) {
                return null;
            }
            if (val.dateorder == "mdy") {
                day = m[3];
                month = m[1];
            }
            else {
                day = m[1];
                month = m[3];
            }
            year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10))
        }
        month -= 1;
        var date = new Date(year, month, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
    }
    else {
        return op.toString();
    }
}
function ValidatorCompare(operand1, operand2, operator, val) {
    var dataType = val.type;
    var op1, op2;
    if ((op1 = ValidatorConvert(operand1, dataType, val)) == null)
        return false;    
    if (operator == "DataTypeCheck")
        return true;
    if ((op2 = ValidatorConvert(operand2, dataType, val)) == null)
        return true;
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);            
    }
}
function CompareValidatorEvaluateIsValid(val) {
	var controltovalidate, controltocompare, valuetocompare, operator;
	controltovalidate = val.getAttribute("controltovalidate");
	controltocompare = val.getAttribute("controltocompare");
	valuetocompare = val.getAttribute("valuetocompare");
	operator = val.getAttribute("operator");
    var value = ValidatorGetValue(controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var compareTo = "";
    if (null == document.getElementById(controltocompare)) {
        if (typeof(valuetocompare) == "string") {
            compareTo = val.valuetocompare;
        }
    }
    else {
        compareTo = ValidatorGetValue(controltocompare);
    }
    return ValidatorCompare(value, compareTo, operator, val);
}
function CustomValidatorEvaluateIsValid(val) {
    var value = "";
    var controltovalidate, clientvalidationfunction;
    controltovalidate = val.getAttribute("controltovalidate");
    clientvalidationfunction = val.getAttribute("clientvalidationfunction");
    if (typeof(controltovalidate) == "string") {
        value = ValidatorGetValue(controltovalidate);
        if (ValidatorTrim(value).length == 0)
            return true;
    }
    var args = { Value:value, IsValid:true };
    if (typeof(clientvalidationfunction) == "string") {
        eval(clientvalidationfunction + "(val, args) ;");
    }        
    return args.IsValid;
}
function RegularExpressionValidatorEvaluateIsValid(val) {
    var controltovalidate, validationexpression;
    controltovalidate = val.getAttribute("controltovalidate");
    if (controltovalidate == "contactPhoneCountry" || controltovalidate == "contactPhoneCity" || controltovalidate == "contactPhoneNumber")
		if (toValidatePhoneNumber == false)
			return true;
    validationexpression = val.getAttribute("validationexpression");
    var value = ValidatorGetValue(controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;        
    var rx = new RegExp(validationexpression);
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
}
function ValidatorTrim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
function RequiredFieldValidatorEvaluateIsValid(val) {
    var controltovalidate, initialvalue;
    controltovalidate = val.getAttribute("controltovalidate");
    initialvalue = val.getAttribute("initialvalue");
    return (ValidatorTrim(ValidatorGetValue(controltovalidate)) != ValidatorTrim(initialvalue))
}
function RangeValidatorEvaluateIsValid(val) {
    var controltovalidate, minimumvalue, maximumvalue;
    controltovalidate = val.getAttribute("controltovalidate");
    minimumvalue = val.getAttribute("minimumvalue");
	maximumvalue = val.getAttribute("maximumvalue");
    var value = ValidatorGetValue(controltovalidate);
    if (ValidatorTrim(value).length == 0) 
        return true;
    return (ValidatorCompare(value, minimumvalue, "GreaterThanEqual", val) &&
            ValidatorCompare(value, maximumvalue, "LessThanEqual", val));
}
function ValidationSummaryOnSubmit() {
    if (typeof(Page_ValidationSummaries) == "undefined") 
        return;
    var summary, sums, s;
    var showsummary, displaymode;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        summary.style.display = "none";
        showsummary = summary.getAttribute("showsummary");
        displaymode = summary.getAttribute("displaymode");
        if (!Page_IsValid) {
            if (showsummary != "false") {
                summary.style.display = "";
                if (typeof(displaymode) != "string") {
					displaymode = "BulletList";
                    summary.setAttribute("displaymode","BulletList");
                }
                switch (displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        final = "";
                        break;
                    case "BulletList":
                    default: 
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        final = "</ul>";
                        break;
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        final = "<br>";
                        break;
                }
                s = "";
                var headertext = summary.getAttribute("headertext");
                if (typeof(headertext) == "string") {
                    s += headertext + headerSep;
                }
                s += first;
                var isvalid,errormessage;
                for (i=0; i<Page_Validators.length; i++) {
					isvalid = Page_Validators[i].getAttribute("isvalid");
					errormessage = Page_Validators[i].getAttribute("errormessage");
                    if (isvalid != "true" && typeof(errormessage) == "string") {
                        s += pre + errormessage + post;
                    }
                }   
                s += final;
                summary.innerHTML = s; 
                window.scrollTo(0,0);
            }
            var showmessagebox = summary.getAttribute("showmessagebox");
            if (showmessagebox == "true") {
                s = "";
                var headertext = summary.getAttribute("headertext");
                if (typeof(headertext) == "string") {
                    s += headertext + "<BR>";
                }
                var isvalid,errormessage;
                for (i=0; i<Page_Validators.length; i++) {
					isvalid = Page_Validators[i].getAttribute("isvalid");
					errormessage = Page_Validators[i].getAttribute("errormessage");
                    if (isvalid!="true" && typeof(errormessage) == "string") {
                        switch (displaymode) {
                            case "List":
                                s += errormessage + "<BR>";
                                break;
                            case "BulletList":
                            default: 
                                s += "  - " + errormessage + "<BR>";
                                break;
                            case "SingleParagraph":
                                s += errormessage + " ";
                                break;
                        }
                    }
                }
                span = document.createElement("SPAN");
                span.innerHTML = s;
                s = span.innerText;
                alert(s);
            }
        }
    }
}
