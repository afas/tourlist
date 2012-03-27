
function onloadActualize()
{
	var span = document.getElementById("WaitingControl");
	if (span != null)
	{
		span.style.display = "";
	}
	var dictionary = CreateDictionaryFromQueryString();
	var priceId = dictionary.priceId_sm;
	actualPrice
		(
			priceId, 
			function()
			{
				var engine = new TemplateEngine();
				engine.run();
				var span = document.getElementById("WaitingControl");
				if (span != null)
				{
					span.style.display = "none";
				}
				resizeFrameEvent();
			}
		);
}
