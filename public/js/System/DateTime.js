SetupDateTime = function() {};

SetupDateTime.LocalDateFormat = "%d.%m.%Y";

SetupDateTime.is_ie = ( /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) );
SetupDateTime.is_ie5 = ( SetupDateTime.is_ie && /msie 5\.0/i.test(navigator.userAgent) );
SetupDateTime.is_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);

SetupDateTime._FD = 0;

SetupDateTime._DN = new Array
("воскресенье",
 "понедельник",
 "вторник",
 "среда",
 "четверг",
 "пятница",
 "суббота",
 "воскресенье");
 
 SetupDateTime._SDN = new Array
("вск",
 "пон",
 "втр",
 "срд",
 "чет",
 "пят",
 "суб",
 "вск");
 
 SetupDateTime._MN = new Array
("январь",
 "февраль",
 "март",
 "апрель",
 "май",
 "июнь",
 "июль",
 "август",
 "сентябрь",
 "октябрь",
 "ноябрь",
 "декабрь");
 
 SetupDateTime._SMN = new Array
("янв",
 "фев",
 "мар",
 "апр",
 "май",
 "июн",
 "июл",
 "авг",
 "сен",
 "окт",
 "ноя",
 "дек");
 
 /** Prints the date in a string according to the given format. */
SetupDateTime.print = function (date, str) {

	if (typeof(str) == 'undefined') {str = SetupDateTime.LocalDateFormat}

	var m = date.getMonth();
	var d = date.getDate();
	var y = date.getFullYear();
	var wn = date.getWeekNumber();
	var w = date.getDay();
	var s = {};
	var hr = date.getHours();
	var pm = (hr >= 12);
	var ir = (pm) ? (hr - 12) : hr;
	var dy = date.getDayOfYear();
	if (ir == 0)
		ir = 12;
	var min = date.getMinutes();
	var sec = date.getSeconds();
	s["%a"] = SetupDateTime._SDN[w]; // abbreviated weekday name [FIXME: I18N]
	s["%A"] = SetupDateTime._DN[w]; // full weekday name
	s["%b"] = SetupDateTime._SMN[m]; // abbreviated month name [FIXME: I18N]
	s["%B"] = SetupDateTime._MN[m]; // full month name
	// FIXME: %c : preferred date and time representation for the current locale
	s["%C"] = 1 + Math.floor(y / 100); // the century number
	s["%d"] = (d < 10) ? ("0" + d) : d; // the day of the month (range 01 to 31)
	s["%e"] = d; // the day of the month (range 1 to 31)
	// FIXME: %D : american date style: %m/%d/%y
	// FIXME: %E, %F, %G, %g, %h (man strftime)
	s["%H"] = (hr < 10) ? ("0" + hr) : hr; // hour, range 00 to 23 (24h format)
	s["%I"] = (ir < 10) ? ("0" + ir) : ir; // hour, range 01 to 12 (12h format)
	s["%j"] = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy; // day of the year (range 001 to 366)
	s["%k"] = hr;		// hour, range 0 to 23 (24h format)
	s["%l"] = ir;		// hour, range 1 to 12 (12h format)
	s["%m"] = (m < 9) ? ("0" + (1+m)) : (1+m); // month, range 01 to 12
	s["%M"] = (min < 10) ? ("0" + min) : min; // minute, range 00 to 59
	s["%n"] = "\n";		// a newline character
	s["%p"] = pm ? "PM" : "AM";
	s["%P"] = pm ? "pm" : "am";
	// FIXME: %r : the time in am/pm notation %I:%M:%S %p
	// FIXME: %R : the time in 24-hour notation %H:%M
	s["%s"] = Math.floor(date.getTime() / 1000);
	s["%S"] = (sec < 10) ? ("0" + sec) : sec; // seconds, range 00 to 59
	s["%t"] = "\t";		// a tab character
	// FIXME: %T : the time in 24-hour notation (%H:%M:%S)
	s["%U"] = s["%W"] = s["%V"] = (wn < 10) ? ("0" + wn) : wn;
	s["%u"] = w + 1;	// the day of the week (range 1 to 7, 1 = MON)
	s["%w"] = w;		// the day of the week (range 0 to 6, 0 = SUN)
	// FIXME: %x : preferred date representation for the current locale without the time
	// FIXME: %X : preferred time representation for the current locale without the date
	s["%y"] = ('' + y).substr(2, 2); // year without the century (range 00 to 99)
	s["%Y"] = y;		// year with the century
	s["%%"] = "%";		// a literal '%' character

	var re = /%./g;
	if (!SetupDateTime.is_ie5 && !SetupDateTime.is_khtml)
		return str.replace(re, function (par) { return s[par] || par; });

	var a = str.match(re);
	for (var i = 0; i < a.length; i++) {
		var tmp = s[a[i]];
		if (tmp) {
			re = new RegExp(a[i], 'g');
			str = str.replace(re, tmp);
		}
	}

	return str;
};

/** Returns the number of day in the year. */
Date.prototype.getDayOfYear = function() {
	var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
	var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
	var time = now - then;
	return Math.floor(time / Date.DAY);
};

/** Returns the number of the week in year, as defined in ISO 8601. */
Date.prototype.getWeekNumber = function() {
	var d = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
	var DoW = d.getDay();
	d.setDate(d.getDate() - (DoW + 6) % 7 + 3); // Nearest Thu
	var ms = d.valueOf(); // GMT
	d.setMonth(0);
	d.setDate(4); // Thu in Week 1
	return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
};


/* Создаем дату из строки в формате UTC */
Date.prototype.toShortUTCString = function()
{
	return SetupDateTime.print(this, "%Y-%m-%d");
};

/* Создаем дату из строки в формате UTC */
Date.prototype.toRUString = function()
{
	return SetupDateTime.print(this, "%d.%m.%Y");
};

/* Форматирование даты в строку */
Date.prototype.toFormatString = function(str)
{
	return SetupDateTime.print(this, str);
};

/* Создаем дату из строки в формате UTC */
Date.fromUTCString = function(s)
{
	var b = s.split('T');
	var a = b[0].split('-');
	return new Date(a[0],a[1]-1,a[2]);
};

/* Создаем дату из строки вида dd.mm.yyyy */
Date.fromFormatString = function(s)
{
	var a = s.split('.');
	return new Date(a[2],a[1]-1,a[0]);
};

/* Добавить к дате дни */
Date.prototype.addDays = function(days)
{
	var d = this.getDate();
	var date = new Date(this);
	date.setDate(d + days);
	return date;
};
