document.addEventListener("DOMContentLoaded", function(){
  var text1 = document.getElementById("question-text-1").innerHTML = identifyCountingNumbersandWholeNumbers["1"].text1;
  var text2 = document.getElementById("question-text-2").innerHTML = identifyCountingNumbersandWholeNumbers["1"].text2;
});

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log("Email: " + profile.getEmail());

  updateEmail(profile.getEmail());
  updateName(profile.getName());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    window.location.href = "../google.html";
  });
}

var identifyCountingNumbersandWholeNumbers = {
  "1": {
    "text1": "The cat and the dog eat butts",
    "text2": "Do you like it?"
  }
}
