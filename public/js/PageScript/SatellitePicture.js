
var hotelId;
var requestResultMessage;

function WriteScript(src) {document.write("<script src=\"" + src + "\" type=\"text/javascript\"></script>");}
WriteScript("http://maps.google.com/maps?file=api&v=2&oe=windows-1251&key=" + googleKey);

function LoadMarkerData_callback()
{
	if (markerData != null)
	{
		for (var hotelDescription in markerData)
		{
			markerData[hotelDescription].hotelHtml = GetHotelHtml(markerData[hotelDescription]);
		}
		LoadMap();
	}
	var documentElementRef = document.getElementById("SatellitePictureWaitBox");
	if (documentElementRef != null)
	{
		documentElementRef.style.display = "none";
	}
	resizeFrameEvent();
}

function onloadSatellitePicture()
{
	var dictionary = CreateDictionaryFromQueryString();
	if ((satellitePicturePageShouldBeResized == "true") || (satellitePicturePageShouldBeResized == true))
	{
		var windowWidth = dictionary.windowWidth_sm, windowHeight = dictionary.windowHeight_sm;
		if (windowWidth != null && windowHeight != null)
		{
			window.resizeTo(windowWidth, windowHeight)
			window.moveTo(0, 0);
		}
	}
	var hotelId = dictionary.hotelId_sm;
	if (hotelId == null)
	{
		hotelId = 3617;
	}
	LoadMarkerData(hotelId, LoadMarkerData_callback);
}

function GetHotelHtml(hotelDescription)
{
	var queryString = "";
	queryString += "?hotelId_sm=" + hotelDescription.hotel.id;
	var hotelName = "<table cellspacing='0' style='text-align: center'><tr><td><b>" + getReference(hotelPage + queryString, hotelDescription.hotel.englishName, "black", "none", "_blank") + "</b>";
	var hotelStarKey = hotelDescription.hotel.star.key;
	if (hotelStarKey != "")
	{
		hotelName += " " + hotelStarKey;
	}
	hotelName += "</td></tr><tr><td>";
	var hotelTypeImageReference = getHotelImageOfParticularType(hotelDescription.images, "Hotel", "120px", "120px");
	if (hotelTypeImageReference != "")
	{
		hotelName += "<table style='border: black 1px solid' cellspacing='0' cellpadding='0'><tr><td>" + getReference(hotelPage + queryString, hotelTypeImageReference, "black", "none", "_blank") + "</td></tr></table></td></tr><tr><td>";
	}
	if (hotelDescription.hotel.phoneNumber != "")
	{
		hotelName += "<br>Phone: " + hotelDescription.hotel.phoneNumber;
	}
	if (hotelDescription.hotel.url != "")
	{
		hotelName += "<br>" + getReference("http://" + hotelDescription.hotel.url, hotelDescription.hotel.url, "", "", "_blank") + "";
	}
	if (hotelDescription.hotel.emailAddress != "")
	{
		hotelName += "<br>" + getReference("mailto:" + hotelDescription.hotel.emailAddress, hotelDescription.hotel.emailAddress, "", "", "_blank") + "";
	}
	hotelName += "</td></tr></table>";
	return hotelName;
}

// Возвращает значение, типа string, которое является именем файла иконки, 
// соответствующей идентификатору звездности отеля.
// Parameters:
//	[in] - Array dictionary, список объектов каждый из которых содержит 2 элемента: 
//		string hotelStarId, идентификатор звездности отеля, 
//		string iconFileName, имя файла иконки
//	[in] - string key, ключ, значение которого сравнивается со значением hotelStarId
// Returns: string, значение элемента iconFileName, соответствующее элементу hotelStarId, значение которого совпадает со значением key
// Если значение key не найдено среди элементов hotelStarId, то функция возвращает значение переменной defaultHotelIcon.
function getValueByKey(dictionary, key)
{
	var value = null;
	for (var entry in dictionary)
	{
		if (dictionary[entry].hotelStarId.toLowerCase() == key.toLowerCase())
		{
			value = dictionary[entry].iconFileName;
			break;
		}
	}
	if (value == null)
	{
		value = defaultHotelIcon;
	}
	return value;
}

function LoadMap()
{
	if (GBrowserIsCompatible())
	{
		var map = new GMap2(document.getElementById("map"));
		map.setCenter(new GLatLng(markerData[0].latitude, markerData[0].longitude), 17);
		map.openInfoWindowHtml(map.getCenter(), markerData[0].hotelHtml);
		map.addControl(new GSmallMapControl());
		map.addControl(new GMapTypeControl());
		map.setMapType(G_SATELLITE_MAP);
		function createMarker(latlng, myHtml, iconUri)
		{
			var icon = new GIcon();
			icon.image = iconUri;
			icon.iconSize = new GSize(24, 32);    
			icon.shadowSize = new GSize(24, 32);    
			icon.iconAnchor = new GPoint(6, 20);    
			icon.infoWindowAnchor = new GPoint(5, 1);

			var marker = new GMarker(latlng, icon);
			//marker.value = number;
			GEvent.addListener
				(
					marker,"click",
					function()
					{
						map.openInfoWindowHtml(latlng, myHtml);
					}
				);
			return marker;
		}
		for (var i = 0; i < markerData.length; i++) 
		{
			var latlng = new GLatLng(markerData[i].latitude, markerData[i].longitude);
			map.addOverlay(createMarker(latlng, markerData[i].hotelHtml, hotelIconsPath + "/" + getValueByKey(hotelIcons, markerData[i].hotel.star.id.toString())));
		}
	} 
}