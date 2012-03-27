
var hotelObject = null;

try {hotelObject = new Hotel(remoteUri + "/Hotel.ashx");} catch(e) {}

var HotelDescription = null;
var markerData;
var ErrorObject = null;


function getHotelDescription(id, callback)
{
	function getHotelDescription_callback(response)
	{
		if (response.error == null)
		{
			HotelDescription = response.result;
		}
		else
		{
			requestResultMessage = response.error.message;
			if (requestResultMessage != null)
			{
				var documentElementRef = document.getElementById("requestResultMessage");
				if (documentElementRef != null)
				{
					documentElementRef.innerHTML = requestResultMessage;
				}
				documentElementRef = document.getElementById("requestResultMessageDiv");
				if (documentElementRef != null)
				{
					documentElementRef.style.display = "inline";
				}
			}
		}
		callback();
		ToggleWaitBox("hide");
	}
	ToggleWaitBox("show");
	if (!hotelObject) {callback(); return;}
	hotelObject.getHotelDescription(id, getHotelDescription_callback);
}

function LoadMarkerData(hotelId, callback)
{
	function LoadMarkerData_callback(response)
	{
		if (response.error == null)
		{
			markerData = response.result;
		}
		else
		{
			requestResultMessage = response.error.message;
			if (requestResultMessage != null)
			{
				var documentElementRef = document.getElementById("requestResultMessage");
				if (documentElementRef != null)
				{
					documentElementRef.innerHTML = requestResultMessage;
				}
				documentElementRef = document.getElementById("requestResultMessageDiv");
				if (documentElementRef != null)
				{
					documentElementRef.style.display = "inline";
				}
			}
		}
		callback();
	}
	if (!hotelObject) {callback(); return;}
	hotelObject.getMarkerData(hotelId, LoadMarkerData_callback);
}

function getHotelImageUri(i, width, height)
{
	var guid = "00000000-0000-0000-0000-000000000000";
	if (i < HotelDescription.images.length)
	{
		guid = HotelDescription.images[i].guid;
	}
	if (typeof(width)=="undefined") width = 320;
	if (typeof(height)=="undefined") height = 240;
	return remoteUri + "/Handlers/HotelImageHandler.ashx?ImageGuid=" + guid + "&MaximumSize=" + width + "," + height;
}

function getImageSet()
{
	var imageSet = new Array();
	var uri = "";
	for (i=0; i<HotelDescription.images.length; i++)
	{
		uri = getHotelImageUri(i, HotelPhotoMaxWidth, HotelPhotoMaxHeight);
		imageSet.push(new HotelImage(uri, HotelDescription.hotel.russianName));
	}
	return imageSet;
}

HotelImage = function(uri, text) 
{
	this.caption = text;
	this.url = uri;
}