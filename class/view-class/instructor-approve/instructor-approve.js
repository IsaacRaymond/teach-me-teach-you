var section, topicName, classNumber, pictureNumber, name, email

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
  var tableString = `
  <table><tr><th>Student Name</th><th>Email</th><th>Topic Name</th><th>Picture Number</th>
  `
  //to count which index the value is on
  var i = 0;

  $.post('/get-pending-teaching',
  {
    classNumber: sessionStorage.getItem('classSelection')
  }).then(json => {
    json.pendingDocs.forEach(item => {
      //tableString += "<tr class = 'teaching-item' onclick=viewTeachingItems('"+item[4]+"','" + item[5] + "','"+sessionStorage.getItem('classSelection')+"','"+item[6]+"','"+item[0].replace(/ /g,"_");+"','"+item[1]+"')><th>"+item[0]+"</th><th>"+item[1]+"</th><th>"+item[5]+"</th><th>"+item[6]+"</th></tr>"
      tableString += "<tr class = 'teaching-item' onclick=viewTeachingItems('"+item[4]+"','"+item[5]+"',"+sessionStorage.getItem('classSelection')+","+item[6]+",'"+item[0].replace(/ /g,"_")+"','"+item[1]+"')><th>"+item[0]+"</th><th>"+item[1]+"</th><th>"+item[5]+"</th><th>"+item[6]+"</th></tr>"

      section = item[4]
      topicName = item[5]
      classNumber = sessionStorage.getItem('classSelection')
      pictureNumber = item[6]
      name = item[0]
      email = item[1]
      i++

    })
    document.getElementById("table").innerHTML = tableString
  })

}

function viewTeachingItems(){
  var urlString = "https://storage.googleapis.com/tmty"+classNumber+"/"+section+"/"+topicName+"/"+pictureNumber+".png"
  document.getElementById("img-target").innerHTML = "<img src = "+urlString+"><br/><button id='submit-button' onclick='approvePicture()'> Approve </button> <button id='submit-button' onclick='denyPicture()'> Deny </button>"
}

function approvePicture(){
  var urlString = "https://storage.googleapis.com/tmty"+classNumber+"/"+section+"/"+topicName+"/"+pictureNumber+".png"

  $.post('/resolve-pending',
{
  section: section,
  topicName: topicName,
  classNumber: classNumber,
  pictureNumber: pictureNumber,
  name: name,
  email: email,
  url: ,
  approve: true
}).then(response => {
  if(response.successful){
    alert("This document has been approved and is now available to help students!")
  } else{
    alert("FUCK!")
  }
})
}

function denyPicture(){
  console.log('deny')
}
