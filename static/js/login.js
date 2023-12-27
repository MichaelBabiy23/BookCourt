function checkInput() {
    let user = document.querySelector("#username").value;
    let pass = document.querySelector("#password").value;
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    if (user.length == 0) {
        myModal.show();
        document.getElementById("failed").innerHTML="Must provide username";
        return false;
    }
    if (pass.length == 0) {
        myModal.show();
        document.getElementById("failed").innerHTML="Must provide password";
        return false;
    }
}