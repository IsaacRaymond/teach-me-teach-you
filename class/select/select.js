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
  $.post('/continue-class',
  {

  }).then(function(response){
    if(response.classEnrollment){
      window.location.href ="../continue-class/continue-class.html"
    } else if (response.multipleClasses){
      loadClass(response.classNumbers)
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

function loadClass(classNumbers){
  var multipleClassMessage = document.createElement('div')
  var inputBox = document.createElement('div')
  var button = document.createElement('div')
  multipleClassMessage.innerHTML = "<div style='font-size: 20px;'>Please select the class you would like to work on.</div>"
  inputBox.innerHTML = getDropdownHTML(classNumbers)
  button.innerHTML = "<button style = 'font-size: 20px;' onclick = 'enteredClass()'>Load class</button>"
  document.getElementById("message").appendChild(multipleClassMessage)
  document.getElementById("message").appendChild(inputBox)
  document.getElementById("message").appendChild(button)
}

function getDropdownHTML(classNumbers){
  var innerHTMLText = "<select id='select-class-number'>"
  classNumbers.forEach(x => {
    innerHTMLText += '<option style = "font-weight: 20px;" value="'+x+'">'+x+'</option>'
  })
  innerHTMLText += "</select>"
  return innerHTMLText
}

function enteredClass(){
  var classNumber = document.getElementById("select-class-number").value

  window.location.href ="../continue-class/continue-class.html?classNumber="+classNumber
}
