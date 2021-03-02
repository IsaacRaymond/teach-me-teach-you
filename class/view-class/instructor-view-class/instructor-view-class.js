var globalJSON

document.addEventListener("DOMContentLoaded", function(){

})

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
    window.location.href = "../../google.html"
  })
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  name = profile.getName()
  email = profile.getEmail()
    displayTable()
}

function displayTable(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  var classNumber = sessionStorage.getItem('classNumber')
  var text = sessionStorage.getItem('text')

  var tableString = "<table><tr><th>Student Name</th><th>Section Number</th><th>Percentage Completed</th>"

  $.post('/get-class-json-for-teacher',
  {
    classNumber: classNumber,
    name: name,
    email: email
  }).then(json => {
    for (var studentName in json.students){
      globalJSON = json

      tableString +='<tr>'

      //Every new student is a new row
      var totalNumberTopics = 0
      var totalNumberLeft = 0
      var numberTaught = 0
      var numberTeacherApproved = 0
      var percentageNumber = 0
      for (var sectionNumber in json.students[studentName].topics){
        for (var topicName in json.students[studentName].topics[sectionNumber]){
          totalNumberLeft += json.students[studentName].topics[sectionNumber][topicName].numberLeft
          totalNumberTopics++
        }
        percentageNumber = ((totalNumberTopics*3 - totalNumberLeft)/(3*totalNumberTopics))*100
        console.log(totalNumberLeft)
        console.log(totalNumberTopics)
        console.log("percentt" +percentageNumber)

        tableString +="<th onclick=dataPerStudent('"+studentName.replace(/ /g,"_")+"')>"+studentName+"</th><th>"+sectionNumber+"</th><th>"+percentageNumber+"</th>"
        tableString += "</tr>"
      }
    }
      //start a new row after every student
    tableString += "</table>"
    document.getElementById("table").innerHTML = tableString
  })
}

function dataPerStudent(givenName){
  var tableString2 = "<table><tr><th>Student Name</th><th>Section Number</th><th>Topic Name </th><th>Number Completed</th><th>Number Taught</th><th>Number Teacher Approved</th>"

  //Every new student is a new row
  tableString2 += "<tr>"
  var totalNumberTopics = 0
  var totalNumberLeft = 0
  var numberTaught = 0
  var numberTeacherApproved = 0
  for (var sectionNumber in globalJSON.students[givenName.replace(/_/g, ' ')].topics){
    for (var topicName in globalJSON.students[givenName.replace(/_/g, ' ')].topics[sectionNumber]){
      totalNumberLeft = globalJSON.students[givenName.replace(/_/g, ' ')].topics[sectionNumber][topicName].numberLeft
      numberTaught = globalJSON.students[givenName.replace(/_/g, ' ')].topics[sectionNumber][topicName].numberTaught
      numberTeacherApproved = globalJSON.students[givenName.replace(/_/g, ' ')].topics[sectionNumber][topicName].numberTeacherApproved

      tableString2 +="<th>"+givenName.replace(/_/g, ' ')+"</th><th>"+sectionNumber+"</th><th>"+topicName+"</th><th>"+(3 - totalNumberLeft)+"</th><th>"+numberTaught+"</th><th>"+numberTeacherApproved+"</th>"
      tableString2 += "</tr>"
    }
  }

  document.getElementById("table2").innerHTML = tableString2
}

function approveTeaching(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  var classNumber = parseInt(urlParams.get('classNumber'))
  window.location.href = "../instructor-approve/instructor-approve.html"
}
