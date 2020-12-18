document.addEventListener("DOMContentLoaded", function(){

});

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    window.location.href = "../../google.html";
  });
}

function createNewClass(){
  var dropdown = document.getElementById("class-choice");
  var choice = dropdown.options[dropdown.selectedIndex].value;

    $.post('/create-class',
    {
      email: email,
      name: name,
      textbook: choice
    });

//    window.location.href = "./class/create_class/create_class.html";
}
