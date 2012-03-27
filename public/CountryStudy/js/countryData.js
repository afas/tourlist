function getCountries(callback)
{   
    callService("Issue.asmx/GetCountries",
    "",
    callback);
}

function getRegions(countryId, callback)
{
    callService("Issue.asmx/GetRegions",
    "CountryId=" + countryId.toString(),
    callback);
}

function getRegionsWithSights(countryId, callback)
{
    callService("Issue.asmx/GetRegionsWithSigths",
    "CountryId=" + countryId.toString(),
    callback);
}
