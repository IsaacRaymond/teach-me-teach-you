document.addEventListener("DOMContentLoaded", function(){
  var text1 = document.getElementById("question-text-1").innerHTML = identifyCountingNumbersandWholeNumbers["1"].text1;
  var text2 = document.getElementById("question-text-2").innerHTML = identifyCountingNumbersandWholeNumbers["1"].text2;
});

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
