document.addEventListener("DOMContentLoaded", function(){

});

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    window.location.href = "../../google.html"
  });
}

function createNewClass(){
  var dropdown = document.getElementById("class-choice")
  var choice = dropdown.options[dropdown.selectedIndex].value

    $.post('/create-class',
    {
      textbook: choice,
    }).then(response=>{
      if(response.created){
        alert("New class created!")
      } else if (response.tooManyClasses){
        alert("Each user is currently limited to five classes")
      } else {
        alert("Something went wrong")
      }
    })

//    window.location.href = "./class/create_class/create_class.html";
}
