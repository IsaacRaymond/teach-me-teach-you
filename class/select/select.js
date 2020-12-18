document.addEventListener("DOMContentLoaded", function(){

});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  email = profile.getEmail();
  var id_token = googleUser.getAuthResponse().id_token;
}

function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
  window.location.href = "../../google.html";
});
}

function continueClass(){
  $.post('/get-class',
  {

  }).then(function(response){
    if(response.classEnrollment){
      window.location.href ="../work-on-class/work-on-class.html"
    } else {
      alert("You are not currently enrolled in a class");
    }
  });
}

function joinClass(){
  window.location.href ="../join-class/join-class.html"
}

function createClass(){
  window.location.href ="../create-class/create-class.html"
}

function viewClass(){
  window.location.href ="../view-class/view-class.html"
}
