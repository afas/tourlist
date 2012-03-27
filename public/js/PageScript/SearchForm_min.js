
var DepartureCityComboBox;
var DestinationCountryComboBox;
var DestinationCitiesListBox;

function OnSelectDestinationCountryMin(value)
{
	selectedDestinationCountryId = value;
	switch(interrelationshipsOfDepartureCitiesAndDestinationCountries)
	{
		case "DepartureCitiesDependsOnDestinationCountries":
			LoadDepartureCitiesByDestinationCountry(selectedDestinationCountryId, selectedTourTypeId, LoadDepartureCities_callback);
			break;    
		default:

	}
}

function onloadSearchForm()
{
	ToggleWaitBox("show");
	DepartureCityComboBox = new ComboBox("DepartureCityComboBox", document.getElementById("DepartureCityComboBoxLabel"));
	DepartureCityComboBox.onChangeSelected = OnSelectDepartureCity;
	DestinationCountryComboBox = new ComboBox("DestinationCountryComboBox", document.getElementById("DestinationCountryComboBoxLabel"));
	DestinationCountryComboBox.onChangeSelected = OnSelectDestinationCountryMin;

	switch(interrelationshipsOfDepartureCitiesAndDestinationCountries)
	{
		case "NoInterrelationships":
			LoadDepartureCities(selectedTourTypeId, LoadDepartureCities_callback);
			LoadDestinationCountries(selectedTourTypeId, LoadDestinationCountries_callback);
			break;    
		case "DestinationCountriesDependsOnDepartureCities":
			LoadDepartureCities(selectedTourTypeId, LoadDepartureCities_callback);
			break;
		default:
			LoadDestinationCountries(selectedTourTypeId, LoadDestinationCountries_callback);
	}

	ToggleWaitBox("hide");
	resizeFrameEvent();
}

function OpenResults()
{
	var object = AJS.formContents(document.forms["search"]);
	var queryString = "";
	queryString += "?DepCityId=" + object.DepartureCityComboBox_hidden+ "";
	queryString += "&DestCountryId=" + object.DestinationCountryComboBox_hidden+ "";
	window.open(searchPage + queryString);
}