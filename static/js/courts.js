function changeListenerCourts(courtsData) {
    var value = document.getElementById("court-selector").value;
    var selectobject = document.getElementById("display-court-name");
    selectobject.disabled = false;
    for (var i = 0; i < selectobject.length; i++) {
        if (selectobject.options[i].id != value)
            selectobject.options[i].style.display = "none";
        else{
            for (var j = 0; j < courtsData.length; j++){
                if(selectobject.options[i].value == courtsData[j]["court_name"] && courtsData[j]["has_grass"] == 1)
                    selectobject.options[i].innerHTML = courtsData[j]["court_name"] + " (GRASS)";
            }
            selectobject.options[i].style.display = "block";
        }
    }
    selectobject.selectedIndex = 0;
}