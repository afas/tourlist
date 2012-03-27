
ShowcaseElement = function()
{
	this.departureCity = -1;
	this.destinationCountry = -1; 
	this.destinationCities = [];
	this.hotels = [];
	this.stars = [];
	this.meals = [];
	this.departureDateFromNowCount = -1;
	this.departureDateCount = -1;
	this.nightsFrom = -1;
	this.nightsTo = -1;
	this.priceFrom = -1;
	this.priceTo = -1;
	this.currency = -1;
	this.adult = -1;
	this.child = -1;
	this.operatorIds = [];
//	this.hideToursWithoutFlights = "false"; // obsolete. see chengelog
	this.positionCount = -1;
	this.filtrateIdenticalHotels = false;
}

ShowcaseElement.prototype.Validate = function()
{
	if(this.destinationCountry < 1)
		return "Страна не задана";
	if(this.departureDateFromNowCount < 0)
		return "Дата вылета не задана";
	if(this.departureDateCount < 1)
		return "Дата вылета не задана";
	if(this.departureCity < 1)
		return "Город вылета не задан";
	if(this.adult < 0)
		return "Количество взрослых не задано";
	if(this.positionCount < 1)
		return "Количество позиций не задано или меньше 1";
		
	return "OK";
}