document.addEventListener("DOMContentLoaded", function(){
  displayTable()
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
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  var classNumber = parseInt(urlParams.get('classNumber'))

  var tableString = "<table><tr><th>Section</th><th>Topic</th><th>Questions Left</th><th>Taught</th>"

  $.post('/get-class-json',
  {
    classNumber: classNumber
  }).then(json => {
    console.log(json)
      for (var key in json){
        console.log('key is ' + key)
        tableString += "<tr>"
        if (json.hasOwnProperty(key)){
          for (var topic in json[key]){
            var noSpace = topic.replace(/\s/g, '')
            tableString += "<th>"+key+"</th><th><a href = ../../questions/questions.html?text="+textName+"&section="+key+"&topic="+noSpace+">"+topic+"</></th><th>"+json[key][topic].numberLeft+"</th><th>"+json[key][topic].numberTaught+"</th></tr>"
          }//fill out a row for each topic in the section
        }
      }//looping through each key-value pair in JSON

        document.getElementById("table").innerHTML = tableString
    })

/*
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
*/
}
