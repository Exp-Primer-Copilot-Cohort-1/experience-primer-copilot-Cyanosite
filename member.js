function skillsMember() {
    var skills = document.getElementById("skills").value;
    var skillsError = document.getElementById("skillsError");
    var skillsRegex = /^[a-zA-Z0-9 ]{2,30}$/;
    if (skillsRegex.test(skills) == false) {
        skillsError.innerHTML = "Skills must be 2-30 characters long";
        return false;
    } else {
        skillsError.innerHTML = "";
        return true;
    }
}