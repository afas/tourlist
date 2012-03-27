var _letters = "абвгдезийклмнопрстуфхчшэюя";

function renderCountry(countryList, rootSections, parentHTMLElement)
{
    var nColumnsNum = 3;
    var cCurrentLetter = '';
    
    var table, tableBody, tableRow, tableCell;
    var img, link, sectionsHolder, linkLetter, letterIndex;
    var divLetters = document.getElementById("divLetters");
    
    table = document.createElement("table");
    table.className = "countryList";
    parentHTMLElement.appendChild(table);
    tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    
    var i = 0;
    var nCurrentCountriesNum = 0;
    
    while(i < countryList.length)
    {
        if(countryList[i].Name.toLowerCase().charAt(0) != cCurrentLetter)        
        {
            nCurrentCountriesNum = 0;
            cCurrentLetter = countryList[i].Name.toLowerCase().charAt(0);
            letterIndex = _letters.indexOf(cCurrentLetter);
            linkLetter = document.createElement("a");
            linkLetter.innerHTML = cCurrentLetter.toUpperCase();
            linkLetter.href = "#" + "letter_" + letterIndex;
            linkLetter.style.marginLeft = "7px";
            divLetters.appendChild(linkLetter);
            tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);
            tableCell = document.createElement("td");
            tableCell.style.paddingRight = "0";
            img = document.createElement("img");
            img.id = "letter_" + letterIndex;
            img.src = _imgUrl + "letters/" +
                 (_letters.indexOf(cCurrentLetter)+1) + ".gif";
            tableCell.appendChild(img);
            tableRow.appendChild(tableCell);
        }
        if(nCurrentCountriesNum % nColumnsNum == 0)
        {            
            tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);
            tableCell = document.createElement("td");
            tableRow.appendChild(tableCell);
        }
        tableCell = document.createElement("td");
        link = document.createElement("a");
        link.className = "countryLink";
        tableRow.appendChild(tableCell);
        tableCell.appendChild(link);
                
        link.innerHTML = countryList[i].Name;
        link.target = "_blank";
        
        sectionsHolder = document.createElement("div");
        sectionsHolder.className = "countrySectionsMenu";
        renderSectionMenu(rootSections, countryList[i].Id, sectionsHolder);
        tableCell.appendChild(sectionsHolder);
        
        i++;
        nCurrentCountriesNum++;
    }
}

function fillCountryList(countryList, listControl)
{
    var option;
    
    listControl.onchange = countrySelected;
    
    for(var i=0; i<countryList.length; i++)
    {
        option = document.createElement("option");
        option.text = countryList[i].Name;
        option.value = countryList[i].Id;
        listControl.add(option);
    }
}

function countrySelected()
{
    var countryId = this.value;
    var href = _sectionInfoPage + "sectionId=10&countryId=" + countryId;
    location.replace(href);
}

