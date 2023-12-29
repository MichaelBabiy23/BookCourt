window.onload = function () {
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    let dateElement = document.querySelector('#accident');
    dateElement.min = new Date().toISOString().split('T')[0];
    dateElement.max = new Date(Date.now() + twoWeeks).toISOString().split('T')[0];
}

function changeListenerDate(len, time) {
    var date = document.getElementById("accident").value;
    console.log(len);
    console.log(date);
    console.log(time);
}