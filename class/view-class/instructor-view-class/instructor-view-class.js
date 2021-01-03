document.addEventListener("DOMContentLoaded", function(){
  displayTable()
})

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
    window.location.href = "../../google.html"
  })
}

function displayTable(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  var classNumber = parseInt(urlParams.get('classNumber'))
  var text = urlParams.get('text')

  var tableString = "<table><tr><th>Student Name</th><th>Section Number</th><th>Percentage Completed</th><th>Number Taught</th>"

  $.post('/get-class-json-for-teacher',
  {
    classNumber: classNumber
  }).then(json => {
    for (var studentName in json.students){
      console.log('studentName is ' + studentName)
      //Every new student is a new row
      tableString += "<tr>"
      var totalNumberTopics = 0
      var totalNumberLeft = 0
      var numberTaught = 0
      for (var sectionNumber in json.students[studentName].topics){
        console.log(sectionNumber)
        for (var topicName in json.students[studentName].topics[sectionNumber]){
          totalNumberLeft += json.students[studentName].topics[sectionNumber][topicName].numberLeft
          numberTaught = json.students[studentName].topics[sectionNumber][topicName].numberTaught
          totalNumberTopics++
        }
        var percentageCompleted = ((totalNumberTopics*3 - totalNumberLeft)/(3*totalNumberTopics))*100

        tableString +="<th>"+studentName+"</th><th>"+sectionNumber+"</th><th>"+percentageCompleted+"</th><th>"+numberTaught+"</th>"
        tableString += "</tr>"

      }
      //start a new row after every student
    }
    document.getElementById("table").innerHTML = tableString
  })
}
