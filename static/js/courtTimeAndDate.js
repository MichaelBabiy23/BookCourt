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
        let radio = document.getElementById("inlineRadio1");
        let radio2 = document.getElementById("inlineRadio2");
        radio.checked = false;
        radio2.checked = false;
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
        myModal.show();
        document.getElementById("failed").innerHTML="Must select date";
<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
        return false;
    }
    else
        changeListenerDate(len, time);
}


function changeListenerDate(len, time) {
    resetHours()
    var date = document.getElementById('accident').value;

    var myCollapse = document.getElementById('myCollapse');
    var bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
    });
    bsCollapse.show()

    //correcting time by rented courts
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
<<<<<<<<< Temporary merge branch 1

    //correcting time by 2 hour pick
    if (len == 2){
        console
        for (let i = 0; i < 23; i++ ) {
            var v = document.getElementById(i);
            var vNext = document.getElementById(i+1);
            console.log("---------");
            console.log(v)
            console.log(vNext)
            //last hour
            if (v != null && vNext == null){
                disabledElemect(v)
            }
            //first hour free but the second one is not
            else if (v != null && vNext != null)
            {
                if (!v.disabled && vNext.disabled){
                    disabledElemect(v);
                }
            }

        }
    }
}

function disabledElemect(v){
    
    if (v != null){
        v.disabled = true;
        var vLabel = document.getElementById(v.id+"Label");
        if (vLabel != null)
            vLabel.disabled = true;
    }
}

function resetHours(){
    for (let i = 0; i < 24; i++ ) {
        var v = document.getElementById(i)
        if (v != null)
            v.disabled = false;
    }
}