// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")


function redirect() {
    var privilege = document.getElementById('school-role').value;

    if(privilege == "Professor"){
        console.log(privilege);
        window.location = "professor.html";
    } else {
        window.location = "student.html";
    }
}