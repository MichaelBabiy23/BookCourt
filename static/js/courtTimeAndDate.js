window.onload = function () {
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    let dateElement = document.querySelector('#accident');
    dateElement.min = new Date().toISOString().split('T')[0];
    dateElement.max = new Date(Date.now() + twoWeeks).toISOString().split('T')[0];
    
    var myCollapse = document.getElementById('myCollapse');
    var bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
    });
    bsCollapse.hide();

}


function checkDate(len, time) {
    var valueDate = document.getElementById('accident').value;
    if (!valueDate) {
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
        myModal.show();
        document.getElementById("failed").innerHTML="Must select date";
        return false;
    }
    else
        changeListenerDate(len, time);
}


function changeListenerDate(len, time) {
    var date = document.getElementById('accident').value;
    console.log(len);
    console.log(date);
    console.log(time);

    var myCollapse = document.getElementById('myCollapse');
    var bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
    });
    bsCollapse.show()

    for (let i = 0; i < time.length; i++ ) {
        if (date == time[i]["date"]) {
            var v = document.getElementById(time[i]["start_time"].toString());
            if (time[i]["rent_time"] == 1) {
                if (v != null){
                    v.remove();
                }
            }
            else {
                if (v != null){
                    v.remove();
                }
                v = document.getElementById((time[i]["start_time"] + 1).toString())
                if (v != null)
                    v.remove();
            }
        }
    }
}