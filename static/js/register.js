function checkInput(name){
    field1.setAttribute('name', name);
    if (name != null) {
        myModal.show();
        document.getElementById("failed").innerHTML=name + "already Exist";
        return false;
    }

    let user = document.querySelector("#username").value;
    let pass = document.querySelector("#password").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    if (user.length < 4 || user.length > 12)
    {
        myModal.show();
        document.getElementById("failed").innerHTML="Username must be between 4 and 12 charcters";
        return false;
        
    }
    else if (phone.length == 0)
    {
        myModal.show();
        document.getElementById("failed").innerHTML="Must write phone";
        return false;
        
    }
    else if (email.length == 0)
    {
        myModal.show();
        document.getElementById("failed").innerHTML="Must write email";
        return false;
        
    }         
    else if (pass.length < 4 || pass.length > 12)
    {
        myModal.show();
        document.getElementById("failed").innerHTML="Password must be between 4 and 12 charcters";
        return false;
    }
    else if (!containsNumbers(pass)) 
    {
        myModal.show();
        document.getElementById("failed").innerHTML="Password must contain at least one number";
        return false;
    }
    else if (!hasLetter(pass))
    {
        myModal.show();
        document.getElementById("failed").innerHTML="Password must contain at least one letter";
        return false;
    }
    
    else if (pass != passagain)
    {
        myModal.show();
        document.getElementById("failed").innerHTML="Password must match confirm password ";
        return false;
    }
}

function containsNumbers(str) {
    return /\d/.test(str);
}

function hasLetter(str) {
    return str.match(/[a-z]/);
}