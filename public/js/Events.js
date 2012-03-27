
function IsFilterContains(filter, value)
{
	if (filter.length == 0) {return true;}
	for (i=0; i<filter.length; i++){ if (filter[i] == value) {return true};}
	return false;
}

function RenderItemsComboBox(array, control, filter)
{
	control.clearItems();
	if (array == null){return;}
	for (var i=0;i<array.length; i++)
	{
		if (filter && IsFilterContains(filter, array[i].id))
		{
		    var value;
		    if (array[i].russianName != null)
		        value = array[i].russianName;
		    if (array[i].key != null)   
		        value = array[i].key;
			control.add(new ComboBoxItem(value, array[i].id));
		}
	}
}

function RenderItemsListBox(array, control)
{
	if (array == null){return;}
	
	control.clearItems();
	for (var i=0;i<array.length; i++)
	{
		control.add(new ListBoxItem(array[i].russianName, array[i].id));		
	}
	control.dataBind();
}

function ClearList(control)
{
}

function LoadDestinationCities_callback()
{
	RenderItemsListBox(citiesDS, DestinationCitiesListBox);
	selectedDestinationCitiesIds = [];
	ClearHotels();
	RenderItemsListBox(hotelsDS, HotelsListBox);
}

function LoadDestinationCitiesWoHotels_callback()
{
	RenderItemsListBox(citiesDS, DestinationCitiesListBox);
	selectedDestinationCitiesIds = [];
}


function LoadDestinationCountries_callback()
{
	RenderItemsComboBox(destinationCountriesDS, DestinationCountryComboBox, DefaultDestinationCountries);
	DestinationCountryComboBox.setValue(selectedDestinationCountryId, true);
}

function OnSelectDepartureCity(value)
{
	selectedDepartureCityId = value;
	switch(interrelationshipsOfDepartureCitiesAndDestinationCountries)
	{
		case "DestinationCountriesDependsOnDepartureCities":
			LoadDestinationCountriesByDepartureCity(selectedDepartureCityId, selectedTourTypeId, LoadDestinationCountries_callback);
			break;
		default:
	}
}


function OnSelectDestinationCountryWithoutHotels(value)
{
	selectedDestinationCountryId = value;
	DestinationCitiesListBox.setValues([], false);
	selectedDestinationCitiesIds = [];
	switch(interrelationshipsOfDepartureCitiesAndDestinationCountries)
	{
		case "DepartureCitiesDependsOnDestinationCountries":
			LoadDepartureCitiesByDestinationCountry(selectedDestinationCountryId, selectedTourTypeId, LoadDepartureCities_callback);
			LoadDestinationCities(selectedDestinationCountryId, LoadDestinationCitiesWoHotels_callback);
			break;    
		default:
			LoadDestinationCities(selectedDestinationCountryId, LoadDestinationCitiesWoHotels_callback);
	}
}

function OnSelectDestinationCountry(value)
{
	selectedDestinationCountryId = value;
	DestinationCitiesListBox.setValues([], false);
	HotelsListBox.setValues([], false);
	selectedDestinationCitiesIds = [];
	selectedHotelIds = [];
	switch(interrelationshipsOfDepartureCitiesAndDestinationCountries)
	{
		case "DepartureCitiesDependsOnDestinationCountries":
			LoadDepartureCitiesByDestinationCountry(selectedDestinationCountryId, selectedTourTypeId, LoadDepartureCities_callback);
			LoadDestinationCities(selectedDestinationCountryId, LoadDestinationCities_callback);
			break;    
		default:
			LoadDestinationCities(selectedDestinationCountryId, LoadDestinationCities_callback);
	}
}

function OnSelectTourType(value)
{
    selectedTourTypeId = value;
    DestinationCitiesListBox.setValues([], false);
	HotelsListBox.setValues([], false);
	selectedDestinationCitiesIds = [];
	selectedHotelIds = [];
    
    LoadDepartureCities(selectedTourTypeId, LoadDepartureCities_callback);

}

function LoadHotels_callback()
{
	RenderItemsListBox(hotelsDS, HotelsListBox);
	ClearRedundantHotels();
}

function OnSelectDestinationCity(selectedArray)
{
	selectedDestinationCitiesIds = selectedArray;
	if (selectedDestinationCitiesIds.length > 0)
	{
		LoadHotels(selectedDestinationCountryId, selectedDestinationCitiesIds, selectedStarIds, LoadHotels_callback);
	}
	else
	{
		hotelsDS = new Array();
		LoadHotels_callback();
	}
}

function OnSelectDestinationCityWithoutHotels(selectedArray)
{
	selectedDestinationCitiesIds = selectedArray;
}


function OnSelectStar(selectedArray)
{
	selectedStarIds = selectedArray;
	LoadHotels(selectedDestinationCountryId, selectedDestinationCitiesIds, selectedStarIds, LoadHotels_callback);
}

function OnSelectStarWoHotels(selectedArray) {
    selectedStarIds = selectedArray;
}



/* Вспомогательные методы */

// Проверяем, что каждому выбранному отелю соответствует отель в листе отелей.
function ClearRedundantHotels()
{
	var selectedHotels = HotelsListBox.selectedItems;
	var hotels = GetHotelList();
	var trustedIds = new Array();
	for(var i = 0; i < selectedHotels.length; i++)
	{
		if(contains(hotels, selectedHotels[i]))
			trustedIds.push(selectedHotels[i]);
	}
	HotelsListBox.selectedItems = trustedIds;
	HotelsListBox.valcon.value = trustedIds.join(',');
}

// Возвращает список отелей для текущего города.
function GetHotelList()
{
	var hotels = new Array();
	var hotelsList = HotelsListBox.options;
	for(var i = 0; i < hotelsList.length; i++)
	{
		hotels.push(hotelsList[i].value);
	}
	return hotels;
}