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
  var classSelection = document.getElementById('list-classes').value
  window.location.href = "./instructor-view-class/instructor-view-class.html?classNumber="+classSelection
}

function getTeacherClasses(){
  console.log('getTeacherClasses')

  $.get('/view-class',
  {

  }).then(function(response){
    var listClassesString = ""

    if(response.noClass){
      alert("You are not currently enrolled as an instructor in a class")
    } else {
      document.getElementById("list-classes").innerHTML = response.listClassesString
    }
  })

  document.getElementById("list-classes").innerHTML = `
    <option>loading... please wait</option>
  `;
}
