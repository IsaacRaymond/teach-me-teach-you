var text, email

document.addEventListener("DOMContentLoaded", function(){

})

function signOut() {
var auth2 = gapi.auth2.getAuthInstance()
auth2.signOut().then(function () {
  window.location.href = "../../google.html"
})
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile()
  name = profile.getName()
  email = profile.getEmail()
  getTeacherClasses()
}

function viewClass(){
  var classSelection = document.getElementById('list-classes').value
  sessionStorage.setItem("classNumber", classSelection)
  sessionStorage.setItem("text", text)
  //$.post('/instructor-approve.html', {text: text, classNumber: classSelection,})
  //window.location.href = "./instructor-view-class/instructor-view-class.html?classNumber="+classSelection+"&text="+text
  window.location.href = "./instructor-view-class/instructor-view-class.html"
}

function getTeacherClasses(){
  $.post('/view-class',
  {
    email: email
  }).then(function(response){
    var listClassesString = ""

    if(response.noClass){
      alert("You are not currently enrolled as an instructor in a class")
    } else {
      text = response.text
      document.getElementById("list-classes").innerHTML = response.listClassesString
    }
  })

  document.getElementById("list-classes").innerHTML = `
    <option>loading... please wait</option>
  `
}
