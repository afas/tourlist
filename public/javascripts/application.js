$(document).ready(function() {
    onloadwindow();

//    $(function() {
//        $( "#countries" ).sortable({
//            revert: true,
//            receive: function(event, ui) {
//             alert($(ui.draggable).attr("object_id"));
//            }
//        });
//        $( "#countries" ).draggable({
//            connectToSortable: "#countries",
//            helper: "clone",
//            revert: "invalid"
//        });
//        $( "ul, li" ).disableSelection();
//    });

//    $('#slider').everyTime(2000, alert('lala'));

    setTimeout(cycle, 3000);
});

function cycle() {
    var left = parseInt($("#topSlider").css("left"));

    if (left != - (4 * 236) && left > -(4 * 236)) {
        $("#topSlider").animate({
                 left: '-=236'
             }, 1000 );
    } else {
        $("#topSlider").animate({
                left: 0
            }, 1000 );
    }
    setTimeout(cycle, 3000);
}


function getPrev() {
    var left = parseInt($("#topSlider").css("left"));

    if (left != 0) {
        $("#topSlider").animate({
                left: '+=236'
            }, 1000 );
    } else {
        $("#topSlider").animate({
                left: '-=' + (4*236)
            }, 1000 );
    }
}

function getNext() {
    var left = parseInt($("#topSlider").css("left"));

    if (left != - (4 * 236) && left > -(4 * 236)) {
        $("#topSlider").animate({
                 left: '-=236'
             }, 1000 );
    } else {
        $("#topSlider").animate({
                left: 0
            }, 1000 );
    }
}

function sendToPrint(){
	w = window.open();

    myIFrame = document.getElementById('frameResult');
    content = myIFrame.contentWindow.document.body.innerHTML;

	w.document.write(content);
	w.print();
	w.close();
}

function onloadwindow() {
    if ($(".searchTour").length != 0) onloadSearchForm();
}

function OpenResultsFrame() {
    var date1 = Date.fromFormatString(document.getElementById("DateFromTextBox").value);
    var date2 = Date.fromFormatString(document.getElementById("DateToTextBox").value);
    var dd = new Date(0).addDays(DateRange);
    if (date2 - date1 >= dd) {
        alert("Вы задали слишком большой диапазон дат.\nМакс. интервал дней " + DateRange);
        return;
    }

    var object = AJS.formContents(document.forms["search"]);
    var queryString = CreateQueryString(object);
    var fr = document.getElementById("frameResult");

    resizeFrame();
}

function resizeFrame() {
    var fr = document.getElementById("frameResult");
    if (fr == null) return;
    fr.height = fr.contentWindow.document.getElementById("contentBody").scrollHeight + 50;
}