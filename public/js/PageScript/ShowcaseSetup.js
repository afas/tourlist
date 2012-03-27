
var showcaseCurrencyId = DefaultCurrency;
var imageMaxWidth = "110px", imageMaxHeight = "90px";
var imageBorderWidth = "1px";
var imageMargin = "2px";
var textMaxWidth = "110px";
var textBorderWidth = "1px";
var textMargin = "2px";
var priceRepresentation = "PricePerRoom"; //"PricePerPerson" - для показа цен на человека
var textPosition = "bottom";
// Число столбцов в витрине
var ShowcaseWidth = 3;
// Число строк в витрине
var ShowcaseHeight = 3;
var Showcase;
var imageDefaultSrc = "../Images/showcaseDefault.jpg"; //Картинка по умолчанию

// Если витрина встраивается в страницу, которая находится не в каталоге "Html" модуля,
// то придется переопределить пути относительно текущей страницы.
//var viewPage = "../Html/PriceDetails.htm"; /* форма просмотра цены */
//var hotelPage = "../Html/HotelDetails.htm"; /* форма с подробностями об отеле */

function SetupShowcase()
{
	/* 
	*       Настройки витрины туров
	*
	*	Обязательные поля для заполнения помечены звездочкой.
	*/
         //  страна --------------------------------------------------- Египет -2 
	// Массив элементов витрины - поисковых фильтров
	var se1 = new ShowcaseElement();
	//* Страна
	se1.destinationCountry = 3;
	//* Дата вылета, задается в виде диапазона (в данном примере: начало тура от завтра + 7 дней)
	// Количество дней относительно сегодняшнего
	se1.departureDateFromNowCount = 1;
	//* Количество дней от departureDateFromNowCount
	se1.departureDateCount = 7;
	//* Город вылета
	se1.departureCity = 1;
	//* Количество взрослых
	se1.adult = 1;
	// Количество детей
	se1.child = 0;
	//* Количество туров по этому запросу, которые будут отображены
	se1.positionCount = 3;
	// true = удалить из результата повторяющиеся отели
	se1.filtrateIdenticalHotels = true;
	// Города назначения
	se1.destinationCities = [];
	// Отели - в данном варианте фильтр на отели закомментирован (отключен)
	//se1.hotels = [871,1004,3458,3811,5002,5426,5703,6970,7544,7688,9284,9310,9723,9724,9725,9727,10034,10610,10630,10642,11388,10232,11616,13269,13270,13295,13405,34445];
	// Звездности
	se1.stars = [];
	// Продолжительность, ночей 
	// От
	se1.nightsFrom = 7;
	// До
	se1.nightsTo = 15;
	// Валюта
	//se1.currency = 1;
	// Цена
	// От
	//se1.priceFrom = 500;
	// До
	//se1.priceTo = 1500;
	// Операторы
	//se1.operatorIds = [];
          
          
	// Еще один поисковый запрос
	// новая страна ------------------------------Турция -2
        var se2 = new ShowcaseElement();
	se2.destinationCountry = 5;
	se2.departureDateFromNowCount = 1; // Вылет с завтрашнего дня
	se2.departureDateCount = 7; // в течении 7 дней
	se2.filtrateIdenticalHotels = true; // удалять из результата повторяющиеся отели
	se2.departureCity = 1; // Вылет из Москвы
	se2.destinationCities = [];
	se2.adult = 2; // 2 взрослых
	se2.child = 0; // 0 детей
	se2.positionCount = 3 // количество туров по этому запросу
	se2.nightsFrom = 7;
	se2.nightsTo = 15;
	se2.stars = [];
	//se2.hotels = [81918,56920,85651,82998,81860,8053,62082,82613,61802,59000,69330,83725,49341,82804,82995,63328,7679,83046,49826,89162,89495,370,48897,84419,86766,83481,83003,60303];
       
	// новая страна ------------------------------Кипр -2
        var se3 = new ShowcaseElement();
	se3.destinationCountry = 16;
	se3.departureDateFromNowCount = 1; // Вылет с завтрашнего дня
	se3.departureDateCount = 7; // в течении 7 дней
	se3.filtrateIdenticalHotels = true; // удалять из результата повторяющиеся отели
	se3.departureCity = 1; // Вылет из Москвы
	se3.destinationCities = [];
	se3.adult = 2; // 2 взрослых
	se3.child = 0; // 0 детей
	se3.positionCount = 2; // количество туров по этому запросу
	se3.nightsFrom = 7;
	se3.nightsTo = 15;
	se3.stars = [];
        
     

        // Массив, содержащий все поисковые запросы
	Showcase = [se1, se2, se3];

	/* 
	*
	*       Конец настроек витрины туров
	*
	*/
					
	var columns = dictionary.columns_sm, rows = dictionary.rows_sm;
	if (columns != null && rows != null)
	{
		ShowcaseWidth = columns;
		ShowcaseHeight = rows;
	}
	var textPositionFromQueryString = dictionary.textPosition_sm;
	if (textPositionFromQueryString != null)
	{
		textPosition = textPositionFromQueryString;
	}
	var documentElementRef;
	if (textPosition != "bottom")
	{
		documentElementRef = document.getElementById("showcaseImageDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.width = imageMaxWidth;
			documentElementRef.style.borderWidth = imageBorderWidth;
			documentElementRef.style.margin = imageMargin;
		}
		documentElementRef = document.getElementById("showcaseTextDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.width = textMaxWidth;
			documentElementRef.style.borderWidth = textBorderWidth;
			documentElementRef.style.margin = textMargin;
		}
		documentElementRef = document.getElementById("Tour");
		if (documentElementRef != null)
		{
			var pixelWidth = strToInt(imageMaxWidth) + strToInt(textMaxWidth) + (strToInt(imageBorderWidth) + strToInt(imageMargin) + strToInt(textBorderWidth) + strToInt(textMargin)) * 2;
			documentElementRef.style.pixelWidth = pixelWidth;
			documentElementRef.style.width = pixelWidth + "px";
		}
	}
	else
	{
		documentElementRef = document.getElementById("showcaseImageDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.float = "none";
			documentElementRef.style.width = imageMaxWidth;
			documentElementRef.style.borderWidth = imageBorderWidth;
			documentElementRef.style.margin = imageMargin;
		}
		documentElementRef = document.getElementById("showcaseTextDiv");
		if (documentElementRef != null)
		{
			documentElementRef.style.float = "none";
			documentElementRef.style.width = imageMaxWidth;
			documentElementRef.style.borderWidth = textBorderWidth;
			documentElementRef.style.margin = textMargin;
		}
		documentElementRef = document.getElementById("Tour");
		if (documentElementRef != null)
		{
			var pixelWidth = strToInt(imageMaxWidth) + (strToInt(imageBorderWidth) + strToInt(imageMargin)) * 2;
			documentElementRef.style.pixelWidth = pixelWidth;
			documentElementRef.style.width = pixelWidth + "px";
		}
	}
	GetShowcase();
}
