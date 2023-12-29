function changeListenerCourts() {
    var value = document.getElementById("court-selector").value;
    var selectobject = document.getElementById("display-court-name");
    selectobject.disabled = false;
    for (var i = 0; i < selectobject.length; i++) {
        if (selectobject.options[i].id != value)
            selectobject.options[i].style.display = "none";
        else
            selectobject.options[i].style.display = "block";
    }
}