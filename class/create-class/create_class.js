document.addEventListener("DOMContentLoaded", function(){

})

var email

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    window.location.href = "../../google.html"
  })
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  email = profile.getEmail()
}

function createNewClass(){
  var dropdown = document.getElementById("class-choice")
  var choice = dropdown.options[dropdown.selectedIndex].value

    $.post('/create-class',
    {
      textbook: choice,
      email: email
    }).then(response=>{
      if(response.created){
        alert("New class created!  Your class number is " + response.classNumber)
        window.location.href = "../../google.html"
      } else if (response.tooManyClasses){
        alert("Each user is currently limited to five classes")
      } else {
        alert("Something went wrong")
      }
    })

//    window.location.href = "./class/create_class/create_class.html";
}
