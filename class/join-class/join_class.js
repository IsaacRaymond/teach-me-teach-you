document.addEventListener("DOMContentLoaded", function(){

});

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
    classes: classCode
  }).then(function(response){
      console.log('newStudent is ' + response.newStudent);
    if(response.newStudent){
      alert("You have been added to the course");
      window.location.href = "../select/select.html"
    } else{
      alert("You are already a member of a course")
      window.location.href = "../select/select.html"
    }

  });
}
