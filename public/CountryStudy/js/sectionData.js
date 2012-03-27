function getSection(sectionId, countryId, callback) {

    callService("Section.asmx/GetSection2",
         "SectionId=" + sectionId.toString() + "&CountryId=" + countryId.toString() + "&csVersion=" + csVersion,
         callback);
}
function getRootSections(callback)
{
    callService("Section.asmx/GetRootSections",
         "",
         callback);
}
function getSectionPreviews(sectionId, issueType, countryId, regionId, pageNum, pageSize, callback)
{
    callService("Section.asmx/GetContentSectionPreviews",
         "SectionId=" + sectionId.toString() + "&CountryId=" + countryId.toString()
            + "&IssueType=" + issueType.toString() + "&RegionId=" + regionId.toString()
            + "&PageSize=" + pageSize.toString() + "&PageNum=" + pageNum.toString(),
         callback);
}

function onsuccess(msg)
{
    var i = 0;
}
