window.onload = function () {
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    let dateElement = document.querySelector('#accident');
    dateElement.min = new Date().toISOString().split('T')[0];
    dateElement.max = new Date(Date.now() + twoWeeks).toISOString().split('T')[0];
}


function checkDate(len, time) {
    var valueDate = document.getElementById('accident').value;
    if (!valueDate) {
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
        myModal.show();
        document.getElementById("failed").innerHTML="Must select date";
        return false;
    }
    changeListenerDate(len, time)
}


function changeListenerDate(len, time) {
    var date = document.getElementById("accident").value;
    console.log(len);
    console.log(date);
    console.log(time);
    for (let i = 0; i < time.length; i++ ) {
        if (date == time[i]["date"]) {
            if (len == 1) {
                    document.getElementById(time[i]["start_time"].toString()).disabled = true;
            }
            else {
                document.getElementById(time[i]["start_time"].toString()).disabled = true;
                document.getElementById((time[i]["start_time"] + 1).toString()).disabled = true;
            }
        }
    }
}