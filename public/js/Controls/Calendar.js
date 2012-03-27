var base = "/js/Controls/Calendar.js";
$import(base, "/js/Controls/calendar/calendar.js");
$import(base, "/js/Controls/calendar/calendar-helper.js");
$import(base, "/js/Controls/calendar/lang/calendar-ru_win_.js");
$import(base, "/js/Controls/calendar/calendar-setup.js");


function SetupCalendar(field, button)
{
  Calendar.setup({inputField:field, ifFormat:"%d.%m.%Y", button:button,align:"TR", singleClick:true});
}