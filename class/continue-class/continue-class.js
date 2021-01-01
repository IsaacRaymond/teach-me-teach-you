document.addEventListener("DOMContentLoaded", function(){
  displayTable();
});

var textName = 'prealgebra'

function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
  console.log('User signed out.');
  window.location.href = "../../google.html";
});
}

function displayTable(){

  var tableString = "<table><tr><th>Section</th><th>Topic</th><th>Questions Left</th><th>Taught</th>"

//finish this - JSON needs to come from MongoDB, not local file
  $.get("../../get-classes", function (data){

  }).then( function(response) {
    if (response.multipleClasses){
      console.log("which class do you want to work on?")
    }
  })



  fetch("../../topics/prealgebra.json")
  .then(response => response.json())
  .then(json => {
    for (var key in json['topics']){
      tableString += "<tr>"
      if (json['topics'].hasOwnProperty(key)){
        for (var topic in json['topics'][key]){
          var noSpace = topic.replace(/\s/g, '')
          tableString += "<th>"+key+"</th><th><a href = ../../questions/questions.html?text="+textName+"&section="+key+"&topic="+noSpace+">"+topic+"</></th><th>"+json['topics'][key][topic].numberLeft+"</th><th>"+json['topics'][key][topic].numberTaught+"</th></tr>"
        }//fill out a row for each topic in the section
      }
    }//looping through each key-value pair in JSON

      document.getElementById("table").innerHTML = tableString
  })
}
