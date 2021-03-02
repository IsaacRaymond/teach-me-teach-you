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
  <table><tr><th>Student Name</th><th>Email</th><th>Topic Name</th><th>Item Number</th>
  `
  //to count which index the value is on
  var index = 0

  $.post('/get-pending-teaching',
  {
    classNumber: sessionStorage.getItem('classSelection')
  }).then(json => {
    try{
    json.pendingPictures.forEach(item => {
      tableString += "<tr class = 'teaching-item' onclick=viewPicture('"+item[4]+"','"+item[5]+"',"+sessionStorage.getItem('classSelection')+","+item[6]+",'"+item[0].replace(/ /g,"_")+"','"+item[1]+"','"+index+"')><th>"+item[0]+"</th><th>"+item[1]+"</th><th>"+item[5]+"</th><th>"+item[6]+"</th></tr>"

      index++

    })
  } catch (error){
    alert("There are no pending pictures to review.")
  }
    var index2 = 0

    try{
    json.pendingYoutube.forEach(item => {
      tableString += "<tr class = 'teaching-item' onclick=viewYoutube('"+item[0].replace(/ /g,"_")+"','"+item[1]+"',"+sessionStorage.getItem('classSelection')+",'"+item[4]+"','"+item[5]+"','"+item[6]+"','"+item[7]+"','"+index2+"')><th>"+item[0]+"</th><th>"+item[1]+"</th><th>"+item[5]+"</th><th>"+item[6]+"</th></tr>"

      index2++
    })
  } catch (error){
    alert("There are no pending Youtube videos to review.")
  }
    document.getElementById("table").innerHTML = tableString
  })

}

function viewPicture(section, topicName, classNumber, pictureNumber, name, email, index){
  var urlString = "https://storage.googleapis.com/tmty"+classNumber+"/"+section+"/"+topicName+"/"+pictureNumber+".png"
  document.getElementById("img-target").innerHTML = "<img src = "+urlString+"><br/><button id='submit-button' onclick=approveItem('"+section+"','"+topicName+"','"+classNumber+"','"+pictureNumber+"','"+name+"','"+email+"','"+index+"',true)>Approve </button> <button id='submit-button' onclick=denyPicture('"+section+"','"+topicName+"','"+classNumber+"','"+pictureNumber+"','"+name+"','"+email+"','"+index+"',true)> Deny </button>"
}

function viewYoutube(name, email, classNumber, section, topic, youtubeNumber, address, index){
  var url = address.replace("watch?v=", "embed/")
  document.getElementById("img-target").innerHTML = '<iframe width="560" height="315" src="'+url+ '"&output=embed frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  document.getElementById("img-target").innerHTML += "<button id='submit-button' onclick=approveItem('"+section+"','"+topic+"','"+parseInt(classNumber)+"','"+youtubeNumber+"','"+name+"','"+email+"','"+index+"',false,'"+address+"')>Approve </button> <button id='submit-button' onclick='denyPicture()'> Deny </button>"
}

function approveItem(section, topicName, classNumber, itemNumber, name, email, index, itIsImage, address){
  document.getElementById("loading").innerHTML = "Loading..."

  var urlString

  if(itIsImage){
    urlString = "https://storage.googleapis.com/tmty"+classNumber+"/"+section+"/"+topicName+"/"+itemNumber+".png"
  } else {
    urlString = address
  }

  $.post('/resolve-pending',
{
  itIsImage: itIsImage,
  section: section,
  topicName: topicName,
  classNumber: classNumber,
  pictureNumber: itemNumber,
  name: name,
  email: email,
  url: urlString,
  index: index,
  approve: true
}).then(response => {
  if(response.successful){
    alert("This document has been approved and is now available to help students!")
    window.location.reload()
  } else{
    alert("FUCK!")
    window.location.reload()
  }
})
}

function denyPicture(section, topicName, classNumber, itemNumber, name, email, index, itIsImage){
  var urlString = "https://storage.googleapis.com/tmty"+classNumber+"/"+section+"/"+topicName+"/"+itemNumber+".png"

  document.getElementById("loading").innerHTML = "Loading..."
  $.post('/resolve-pending',
{
  itIsImage: true,
  section: section,
  topicName: topicName,
  classNumber: classNumber,
  pictureNumber: itemNumber,
  name: name,
  email: email,
  url: urlString,
  index: index,
  approve: false
}).then(response => {
  if(response.allDone){
    alert("This document has been removed from the cue.")
    window.location.reload()
  } else{
    alert("FUCK!")
    window.location.reload()
  }
})
}
