document.addEventListener("DOMContentLoaded", function(){

});

var name, email

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.')
    window.location.href = "../../google.html"
  });
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  name = profile.getName()
  email = profile.getEmail()
}

function createNewStudent(){
  var classCode = document.getElementById("class-code").value

  $.post('/join-class',
  {
    classes: classCode,
    name: name,
    email: email
  }).then(function(response){
    if(response.newStudent){
      alert("You have been added to the course")
      window.location.href = "../select/select.html"
    } else if (response.noClass){
      alert("There is no class that corresponds to this class number")
    } else if (response.tooManyClasses){
      alert("You can only participate in a maximum of 5 courses")
      window.location.href = "../select/select.html"
    }

  });
}
