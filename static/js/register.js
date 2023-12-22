function checkInput(){
    let user = document.querySelector("#username").value;
    if (user.length < 4 || user.length > 12)
    {
        alert("Username must be between 4 to 12 character");
    }
    let pass = document.querySelector("#password").value;
    if (pass.length < 4 || pass.length > 12)
    {
        alert("Password must be between 4 to 12 character");
    }
    if (!containsNumbers(pass)) 
    {
        alert("Password must contain at least one number")
    }
    if (!hasLetter(pass))
    {
        alert("Password must contain at least one letter")
    }
    let passagain = document.querySelector("#passwordagain").value;
    if (pass != passagain)
    {
        alert("Password and confirm must match");
    }
}
function containsNumbers(str) {
    return /\d/.test(str);
}
function hasLetter(str) {
    return str.match(/[a-z]/);
}