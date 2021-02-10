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

  $.post('/get-pending-teaching',
  {
    classNumber: sessionStorage.getItem('classSelection')
  }).then(json => {
    json.pendingDocs.forEach(item => {
      //tableString += "<tr class = 'teaching-item' onclick=viewTeachingItems('"+item[4]+"','" + item[5] + "','"+sessionStorage.getItem('classSelection')+"','"+item[6]+"','"+item[0].replace(/ /g,"_");+"','"+item[1]+"')><th>"+item[0]+"</th><th>"+item[1]+"</th><th>"+item[5]+"</th><th>"+item[6]+"</th></tr>"
      tableString += "<tr class = 'teaching-item' onclick=viewTeachingItems('"+item[4]+"','"+item[5]+"',"+sessionStorage.getItem('classSelection')+","+item[6]+",'"+item[0].replace(/ /g,"_")+"','"+item[1]+"')><th>"+item[0]+"</th><th>"+item[1]+"</th><th>"+item[5]+"</th><th>"+item[6]+"</th></tr>"

    })
    document.getElementById("table").innerHTML = tableString
  })

}

function viewTeachingItems(section, topicName, classNumber, pictureNumber, name, email){
  var imgText = "https://storage.googleapis.com/tmty"+classNumber+"/"+section+"/"+topicName+"/"+pictureNumber+".png"
  document.getElementById("img-target").innerHTML = "<img src = "+imgText+"><br/><button id='submit-button' onclick='approvePicture("+section+"','"+topicName+"','"+classNumber+"','"+pictureNumber+"','"+name+"','"+email+")'> Approve </button> <button id='submit-button' onclick='denyPicture()'> Deny </button>"
}

function approvePicture(section, topicName, classNumber, pictureNumber, name, email){
  $.post('/resolve-pending',
{
  section: section,
  topicName: topicName,
  classNumber: classNumber,
  pictureNumber: pictureNumber,
  name: name,
  email: email
}).then(response => {
  if(response.classNotFound){
    alert("No class was found")
  } else{
    if(response.success){

    }
  }
})
}

function denyPicture(){

}
