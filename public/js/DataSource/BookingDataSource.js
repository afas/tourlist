
var bookingObject = null;

try {bookingObject = new Booking(remoteUri + "/Booking.ashx");} catch(e) {}

var bookingMessage = "";

function sendOrder(priceId, managerEmail, obj, callback)
{
	function sendOrder_callback(response)
	{
		if (typeof(response.error) == 'undefined')
		{
			if (response.result)
			{
				bookingMessage = "Ваш заказ направлен менеджеру турагентства."
			}
			else
			{
				bookingMessage = "Ошибка отправки письма. Просьба перезвонить в агентство."
			}
		}
		else
		{
			bookingMessage = "Системная ошибка. Попробуйте еще раз."
		}
		callback();
	}

	if (!bookingObject) {callback(); return;}
	/* Формируем поле телефона из трех составляющих: код страны, код города и локального номера */	
	var contactPhone = obj.contactPhoneCountry + obj.contactPhoneCity + obj.contactPhoneNumber;
	/* Обрезаем слишком длинное примечание */
	var description = obj.description.substr(0, 200);
	/* Подготавливаем объект для передачи на сервер */
	var contact = new ContactInformation(obj.contactPerson, contactPhone, obj.contactMail, description);
	bookingObject.createOrderForAgency(priceId, managerEmail, contact, sendOrder_callback);
}

ContactInformation = function(_contactPerson, _contactPhone, _contactMail, _description)
{
	this.contactPerson = _contactPerson;
	this.contactPhone = _contactPhone;
	this.contactMail = _contactMail;
	this.description = _description;
}