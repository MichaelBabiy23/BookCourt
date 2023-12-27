function changeActive(id){
    var header = document.getElementById("navbarNav");
    var btns = header.getElementsByClassName("nav-link");
    for (var i = 0; i < btns.length; i++) {
            var current = btns[i]
            //alert(current.id)
            if (current.id == id) {
                current.classList.add("active");
                console.log("changing to active " + current.name)
            }
            else
            {
                //current.className = current.classList.remove(" active");
                console.log("removing active from " + current.id)
            }
    }
}
