document.addEventListener("DOMContentLoaded", function(){
  displayTeachingPending()
})

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
    window.location.href = "../../google.html"
  })
}

function displayTeachingPending(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  var classNumber = parseInt(urlParams.get('classNumber'))

  var tableString = "<table><tr><th>Student Name</th><th>Email</th><th>Topic Name</th><th>Picture Number</th>"

  $.post('/get-pending-teaching',
  {
    classNumber: classNumber
  }).then(json => {
    json.pendingDocs.forEach(item => {
      tableString += "<tr class = 'teaching-item' onclick=viewTeachingItems('"+item[4]+"','" + item[5] + "','"+classNumber+"','"+item[6]+"')><th>"+item[0]+"</th><th>"+item[1]+"</th><th>"+item[5]+"</th><th>"+item[6]+"</th></tr>"
    })
    document.getElementById("table").innerHTML = tableString
  })

}

function viewTeachingItems(section, topicName, classNumber, pictureNumber){
  $.post('/view-teaching-items',
{
  section: section,
  topicName: topicName,
  classNumber: classNumber,
  pictureNumber: pictureNumber
}).then(response => {
  if(response.classNotFound){
    alert("No class was found")
  } else{
    
  }
})
}
