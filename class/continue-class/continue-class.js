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
  $.get("/current-progress",{

  })

  fetch("../../topics/prealgebra.json")
  .then(response => response.json())
  .then(json => {
    for (var key in json['topics']){
      tableString += "<tr>"
      if (json['topics'].hasOwnProperty(key)){
        for (var topic in json['topics'][key]){
          var noSpace = topic.replace(/\s/g, '')
          tableString += "<th>"+key+"</th><th><a href = ../../questions/questions.html?text="+textName+"&section="+key+"&topic="+noSpace+">"+topic+"</></th><th>"+json['topics'][key][topic][0]+"</th><th>"+json['topics'][key][topic][1]+"</th></tr>"
        }//fill out a row for each topic in the section
      }
    }//looping through each key-value pair in JSON

      document.getElementById("table").innerHTML = tableString
  })



  /*
  <table>
  <tr>
    <th>Topic</th>
    <th>Learned</th>
    <th>Taught</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
  </table>
  `;
  */
}
