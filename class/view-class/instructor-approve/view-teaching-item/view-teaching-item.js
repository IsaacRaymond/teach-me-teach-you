document.addEventListener("DOMContentLoaded", function(){
  loadTeachingItems()
})

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
    window.location.href = "../../google.html"
  })
}

function loadTeachingItems(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  var classNumber = parseInt(urlParams.get('classNumber'))

  var tableString = ""

  $.post('/view-teaching-items',
  {
    classNumber: classNumber
  }).then(json => {
    console.log(json)
    document.getElementById("item").innerHTML = tableString
  })
}
