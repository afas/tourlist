var comboCountry;
var comboCity;
var comboStars;
var _columnsNum = 3;//Число столбцов
var _hotelInfoUrl = "HotelDetails.htm?itemName_sm=Central%20(Gerlos)&newWindowInAnchor_sm=false&windowWidth_sm=1024&windowHeight_sm=768&showNavigationBar_sm=false&hotelId_sm=";

function onLoadHotelCatlog()
{
    comboCountry = new ComboBox("comboCountry", document.getElementById("cellCountry"));
    comboCountry.onChangeSelected = countrySelected
    comboCity = new ComboBox("comboCity", document.getElementById("cellCity"));
    comboStars = new ComboBox("comboStars", document.getElementById("cellStars"));
    LoadDestinationCountries(0, countriesLoaded);
    LoadDestinationCities(selectedDestinationCountryId, citiesLoaded);
    LoadStars(starsLoaded);
}

function countriesLoaded()
{    
    RenderItemsComboBox(destinationCountriesDS, comboCountry, DefaultDestinationCountries);
    comboCountry.setValue(selectedDestinationCountryId, true);
}

function citiesLoaded()
{
    citiesDS = insertDefaultElement(citiesDS);
    RenderItemsComboBox(citiesDS, comboCity, []);
    comboCity.setValue(0, true);
}

function starsLoaded()
{
    starsDS = insertDefaultElement(starsDS);
    RenderItemsComboBox(starsDS, comboStars, []);
    comboStars.setValue(0, true);
}

function countrySelected()
{
    selectedDestinationCountryId = parseInt(comboCountry.value, 10);    
    LoadDestinationCities(selectedDestinationCountryId, citiesLoaded);
}

function insertDefaultElement(dataSource)
{
    var result = dataSource.reverse();
    result.push({"id":0,"russianName":"не важно"});
    return result.reverse();
}

function searchHotelsClicked()
{
    var cityId = parseInt(comboCity.value, 10);
    var countryId = parseInt(comboCountry.value, 10);
    var starId = parseInt(comboStars.value, 10);
    var onlyWithImages = document.getElementById("chkOnlyWithPhoto").checked;
    var onlyWithDescriptions = document.getElementById("chkOnlyWithDescription").checked;
    var onlyWithPrices = document.getElementById("chkOnlyWithPrices").checked;
    var onlyWithVirtualTours = document.getElementById("chkOnlyWithVirtualTours").checked;
    var name = document.getElementById("txtHotelName").value;
    ToggleWaitBox("show");
    dictObject.searchHotels(countryId, cityId, starId, name, onlyWithImages,
      onlyWithDescriptions, onlyWithPrices, onlyWithVirtualTours, hotelsFound);
}

function hotelsFound(response)
{
    ToggleWaitBox("hide");
    hotelsDS = response.result;
    
    var tableHotels = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var row, cell, link;
    var hotelObject;
        
    var divResults = document.getElementById("divResults");
    
    if(divResults.firstChild != null)
    {
        divResults.removeChild(divResults.firstChild);
    }
    
    divResults.appendChild(tableHotels);
    tableHotels.appendChild(tableBody);
    tableHotels.style.width = "100%";
    
    var rowsNum = Math.ceil(hotelsDS.length / _columnsNum);
    
    for(var i = 0; i < rowsNum; i++)
    {
        row = document.createElement("tr");
        tableBody.appendChild(row);
        for(var j = 0; j < _columnsNum; j++)
        {
            cell = document.createElement("td");
            row.appendChild(cell);
            hotelObject = hotelsDS[i + j*rowsNum];
            
            if(hotelObject != null)
            {                
                link = document.createElement("a");
                link.href = _hotelInfoUrl + hotelObject.id;
                link.target = "_blank";                              
                
                if(hotelObject.englishName.length > 0)
                {
                    if(hotelObject.star != null)
                    {
                        link.innerHTML = hotelObject.englishName + " "
                             + hotelObject.star.russianName;
                    }
                    else
                    {
                        link.innerHTML = hotelObject.englishName;
                    }
                }
                else
                {
                    if(hotelObject.star != null)
                    {
                        link.innerHTML = hotelObject.russianName + " "
                             + hotelObject.star.russianName;
                    }
                    else
                    {
                        link.innerHTML = hotelObject.russianName;
                    }
                }
                cell.appendChild(link);
            }
        }
    }
	resizeFrameEvent();
}
