document.addEventListener("DOMContentLoaded", function(){

});

var email;
var name;

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  email = profile.getEmail();
  name=  profile.getName();
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    window.location.href = "../../google.html";
  });
}

function createNewStudent(){
  var classCode = document.getElementById("class-code").value;

  $.post('/add-student',
  {
    email: email,
    name: name,
    classes: classCode
  });
}
