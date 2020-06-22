document.addEventListener("DOMContentLoaded", function(){

});

var email;

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
  $.ajax({
    url: "/get-class",
    type: "POST",
    data: {
        email: email
    },
    success: function(result) {
      console.log("get-class post completed");
      if(result){
        window.location.href ="../work-on-class/work-on-class.html"
      } else {
        alert("You are not currently enrolled in a class");
      }
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
