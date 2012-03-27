var _imageContents;
var _currentImageNum;

function renderGallery(section, parentHTMLElement)
{
    var nColumnsNum = 6;
    
    var issueId = getIssueId();
    
    var i = 0;        
    
    var table, tableBody, tableRow, tableCell;
    var img, link;
    table = document.createElement("table");
    table.className = "galleryTable";
    table.cellSpacing = 5;
    parentHTMLElement.appendChild(table);
    tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    
    
    while(i < section.Contents.length)
    {
        if(i % nColumnsNum == 0)
        {
            tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);
        }
        tableCell = document.createElement("td");
        link = document.createElement("a");
        tableRow.appendChild(tableCell);
        tableCell.appendChild(link);
        
        img = document.createElement("img");
        img.border = 0;
        img.alt = section.Contents[i].Data;
        img.src = section.Contents[i].SmallImageUrl;
        
        link.target = "_blank";
        link.href = _viewImagePage + "sectionId=" + section.Id + 
                    "&issueId=" + issueId + "&imageId=" + section.Contents[i].Id;
        link.appendChild(img);
        i++;
    }
}
function resizeGalleryPreview()
{
    var previewContainer = document.getElementById("previewContainer");
    previewContainer.style.width = (window.document.documentElement.clientWidth - 30).toString() + "px";
}

function renderPreviewGalleryHorizontal(section, galleryContainer)
{
    var issueId = getIssueId();

    _imageContents = section.Contents;
 
    var tableGallery = document.createElement("table");
    tableGallery.className = "previewGalleryTable";
    galleryContainer.appendChild(tableGallery);
    
    var tableBody = document.createElement("tbody");
    tableGallery.appendChild(tableBody);
    var tableRow, tableCell, img, link;
    
    tableRow = document.createElement("tr");
    
    for(var i=0; i<section.Contents.length; i++)
    {
        tableCell = document.createElement("td");
        link = document.createElement("a");
        
        tableBody.appendChild(tableRow);
        tableRow.appendChild(tableCell);
        
        img = document.createElement("img");
        img.alt = section.Contents[i].Data;
        img.id = "img_" + section.Contents[i].Id.toString();
        img.border = 0;
        img.src = section.Contents[i].SmallImageUrl;
        img.onclick = imagePreviewClicked;
                
        tableCell.appendChild(img);
    }
}

function imagePreviewClicked()
{
    var imgSource;
    
    if(this)
    {
        imgSource = this;//Firefox
    }
    else
    {
        imgSource = event.srcElement;//Opera, IE
    }
    var imgId = imgSource.id.split("_")[1];    
    
    for(var i=0;i<_imageContents.length;i++)
    {
        if(_imageContents[i].Id.toString() == imgId)
        {
            loadImage(i);
            break;
        }
    }
}
function btnNextClicked()
{
    loadImage(_currentImageNum + 1);
}

function btnPreviousClicked()
{
    loadImage(_currentImageNum - 1);
}

function loadImage(imageNum)
{
    var img = document.getElementById("imgLarge");
    var divImageName = document.getElementById("divImageName");
    img.src = _imageContents[imageNum].ImageUrl;
    _currentImageNum = imageNum;
    divImageName.innerHTML = _imageContents[imageNum].Data;
    document.title = _imageContents[imageNum].Data;
    
    if(imageNum==0)
    {
        document.getElementById("btnPrevious").disabled = true;
    }
    else
    {
        document.getElementById("btnPrevious").disabled = false;
    }
    
    if(imageNum == _imageContents.length - 1)
    {
        document.getElementById("btnNext").disabled = true;
    }
    else
    {
        document.getElementById("btnNext").disabled = false; 
    }
}

function renderPreviewGalleryVertical(section, galleryContainer, photosNum)
{
    var issueId = getIssueId();        
    
    var nameElement = document.createElement("div");
    nameElement.innerHTML = section.Name;
    nameElement.className = "headerText";
    galleryContainer.appendChild(nameElement);
    
    var fullGalleryLink = document.createElement("a");
    fullGalleryLink.innerHTML = section.Contents.length.toString() + " фото";
    fullGalleryLink.target = "_blank";
    fullGalleryLink.href = _galleryPage + "sectionId=" + section.Id + 
                    "&issueid=" + issueId;
    nameElement.appendChild(document.createElement("br"));
    nameElement.appendChild(fullGalleryLink);

    var tableGallery = document.createElement("table");
    galleryContainer.appendChild(tableGallery);    
    
    var tableBody = document.createElement("tbody");
    tableGallery.appendChild(tableBody);
    var tableRow, tableCell, img, link;
    
    for(var i=0; i<Math.min(photosNum, section.Contents.length); i++)
    {
        tableRow = document.createElement("tr");
        tableCell = document.createElement("td");
        link = document.createElement("a");
        
        tableBody.appendChild(tableRow);
        tableRow.appendChild(tableCell);
        tableCell.appendChild(link);         
        
        img = document.createElement("img");
        img.alt = section.Contents[i].Data;
        img.border = 0;
        img.src = section.Contents[i].SmallImageUrl;
        
        link.target = "_blank";
        link.href = _viewImagePage + "sectionId=" + section.Id + 
                    "&issueId=" + issueId + "&imageId=" + section.Contents[i].Id;
        
        link.appendChild(img);
    }
}