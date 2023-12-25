function CheckLogiN() {
    let user = document.querySelector("#username").value;
    let pass = document.querySelector("#password").value;
    if (user == "" || user == null) {
        alert("Must provide username")
    }
    if (pass == "" || pass == null) {
        alert("Must provide password")
    }
}