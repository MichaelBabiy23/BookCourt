function checkInput(){
    let user = document.querySelector("#username").value;
    if (user.length < 6 || user.length > 12)
    {
        alert("Username problem");
    }
    let pass = document.querySelector("#password").value;
    let passagain = document.querySelector("#passwordagain").value;
    if (pass != passagain || pass.length < 8)
    {
        alert("Pass problem");
    }
}
