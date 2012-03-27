
SearchFilter = function()
{
	this.departureCity = -1;				// города вылета
	this.destinationCountry = -1;						// страна назначения
	this.destinationCities = [];						// города назначения
	this.hotels = [];						// отели
	this.stars = [];						// звездности
	this.meals = [];						// типы питания
	this.checkinDateFrom = "0001-01-01";	// самая ранняя дата вылета
	this.checkinDateTo = "0001-01-01";		// самая поздняя дата вылета
	this.nightsFrom = -1;					// минимальное количество ночей
	this.nightsTo = -1;						// максимальное количество ночей
	this.costFrom = -1;						// минимальная стоимость
	this.costTo = -1;						// максимальная стоимость
	this.currency = 1;						// валюта
	this.adultsCount = -1;					// количество взрослых
	this.childrenCount = -1;				// количество детей
	this.operators = [];					// операторы
//	this.hideToursWithoutFlights = HideToursWithoutFlights;	
	// цены без перелетов -- данная настройка является устаревшей и более не поддерживается. 
	// Для того чтобы найти цены без перелетов, указывайте departureCity = 0; 
	this.hideToursWithoutPlaces = true;		// не возвращать цены без мест
}

SearchFilter.prototype.Validate = function()
{
	if(this.destinationCountry < 1)
		return "Страна не задана";
	if(this.checkinDateFrom < 0)
		return "Дата вылета не задана";
	if(this.checkinDateTo < 1)
		return "Дата вылета не задана";
	if(this.departureCity < 1)
		return "Город вылета не задан";
	if(this.adult < 0)
		return "Количество взрослых не задано";
	if(this.maximumResults < 1)
		return "Количество позиций не задано или меньше 1";
		
	return "OK";
}