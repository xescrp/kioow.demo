var loginyto = {
    validateFormYto: function() {
        var x = document.forms["ytoaccess"]["email"].value;
        if (x == null || x == "") {
            console.error("Email must be filled out");
            return false;
        }
        var y = document.forms["ytoaccess"]["password"].value;
        if (y == null || y == "") {
            console.error("Password must be filled out");
            return false;
        }
        ytoaccess.submit();
    },
    init: function() {
        var holderyto = document.createElement("div");
        var att = document.createAttribute("style");
        att.value = "display: none, visibility: hidden;";
        holderyto.setAttributeNode(att);
        var formyto = "<form name='ytoaccess' id='ytoaccess' onsubmit='return validateFormYto()' method='post' action='http://localhost:1000/auth/external'><input type='hidden' id='email' name='email' value='" + logindatayto.email + "' /><input type='hidden' id='password' name='password' value='" + logindatayto.password + "' /><input type='hidden' id='iamnew' name='iamnew' value='false' /><input type='hidden' id='sociallogged' name='sociallogged' value='false' /></form>";
        holderyto.innerHTML = formyto;
        document.body.appendChild(holderyto);
        var ctayto = document.getElementById("ctayourttoo");
        ctayto.setAttribute("onclick", "loginyto.validateFormYto();");
    }
};
document.addEventListener("DOMContentLoaded", function() {
    loginyto.init();
});