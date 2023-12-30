function send() {
    var message = document.getElementById('message').value;
    var name = document.getElementById('name');
    var email = document.getElementById('emailAddress');
    console.log(name);
    console.log(email);
    if (!message || (name!=null && !name.value) || (email!=null && !email.value)) {
        var myModal = new bootstrap.Modal(document.getElementById("exampleModalError"));
        myModal.show();
        document.getElementById("failed").innerHTML="Field error";
    }
    else{
        var myModal = new bootstrap.Modal(document.getElementById("exampleModalSuccses"));
        myModal.show();
        document.getElementById("success").innerHTML="Message sent :)";
    }

    return false;
}