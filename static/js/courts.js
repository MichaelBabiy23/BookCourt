window.onload = function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date-input")[0].setAttribute('min', today);
}