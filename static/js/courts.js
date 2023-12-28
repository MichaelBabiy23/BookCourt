window.onload = function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date-input")[0].setAttribute('min', today);
}

function changeListenerCourts() {

    var value = document.getElementById("court-selector").value;
    var selectobject = document.getElementById("display-court-name");
    for (var i = 0; i < selectobject.length; i++) {
        if (selectobject.options[i].value != value)
            selectobject.options[i].style.display = "none";
        else
            selectobject.options[i].style.display = "block";
    }
    selectobject.selectionIndex = 0;
}

function selected() {
    
}