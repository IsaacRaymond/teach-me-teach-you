document.addEventListener("DOMContentLoaded", function(){
  getTeacherClasses();
});

function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
  console.log('User signed out.');
  window.location.href = "../../google.html";
});
}

function viewClass(){

}

function getTeacherClasses(){

  $.get('/view-class',
  {

  }).then(function(response){
    if(response){
    } else {
      alert("You are not currently listed as an instructor for a class.");
    }
  });

  document.getElementById("list-classes").innerHTML = `
    <option value="Prealgebra019283">Prealgebra 2e Code 019283</option>
    <option value="Calculus038493">Calculus 038493</option>
  `;
}
