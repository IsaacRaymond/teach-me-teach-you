var topic, section, textbook, classNumber, name, email

document.addEventListener("DOMContentLoaded", function(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  topic = urlParams.get('topic')
  section = urlParams.get('section')
  textbook = urlParams.get('text')
  classNumber = urlParams.get('classNumber')

  var scr = document.createElement('script')
  head = document.head || document.getElementByTagName('head')[0]
  scr.src = "./"+textbook+"/"+ section +"/"+topic+".js"
  scr.aysnyc = false
  head.insertBefore(scr, head.firstChild)
  scr.onload = function(){
    shuffleArray()
    loopAndRenderMathJax()
  }
})

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  name = profile.getName()
  email = profile.getEmail()
}


function loopAndRenderMathJax(){
  document.getElementById('question-text-1').innerHTML = question1

  renderMathJax('question-text-2', question2)

  //Render MC choices
  renderMathJax('mc-option-1', mc1)
  renderMathJax('mc-option-2', mc2)
  renderMathJax('mc-option-3', mc3)
  renderMathJax('mc-option-4', mc4)
  renderMathJax('mc-option-5', mc5)
  renderMathJax('mc-option-6', mc6)
}

function renderMathJax(htmlID, newValue){
  var output = document.getElementById(htmlID)
  output.innerHTML=""
  MathJax.texReset()
  var options = MathJax.getMetricsFor(output)

  MathJax.tex2svgPromise(newValue, options).then(function (node){
    output.appendChild(node)
    MathJax.startup.document.clear()
    MathJax.startup.document.updateDocument()
  }).catch(function (err){
    console.log(err)
  })

}

function answerSelect(selection){
  if( (selection-1) == correctAnswerIndex){
    $.post('../../question-correct', {
      topic: topic,
      section: section,
      name: name,
      email: email
    }).then(response=>{
      if(response.topicComplete){
        alert('You do not have to continue working on this topic.  You have completed enough!')
        window.location.href = "http://localhost:3000/class/continue-class/continue-class.html?classNumber="+response.classNumber
      } else {
        alert("Nicely done!  You can keep working on this topic or you can use the back arrow in your web browser.")
        window.location.href = "../../questions/questions.html?text="+textbook+"&section="+section+"&topic="+topic
      }
    })
  } else {
    alert("Your answer choice is incorrect")
  }
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    window.location.href = "../google.html"
  })
}

function getHelp(){
  document.getElementById("center-right-box").innerHTML = '<button onclick="serverCall(true)">Youtube</button><br/><button onclick="serverCall(false)">Picture</button><div class="back" onclick="giveHelpBackButton()">Back</div><div id="resources-go-here"></div>'
}

function serverCall(isItYoutube){
  document.getElementById("resources-go-here").innerHTML = "Loading..."

    const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  $.post('../../get-help', {
    isItYoutube: isItYoutube,
    classNumber: urlParams.get('classNumber'),
    section: urlParams.get('section'),
    topicName: urlParams.get('topic')
  }).then(response=>{
    if(response.noHelp){
      alert("Unfortunately, no users have submitted help for this file yet")
    } else if (response.youtube){
      var url = response.httpLink.replace("watch?v=", "embed/")
      document.getElementById("resources-go-here").innerHTML = '<iframe width="560" height="315" src="'+url+ '"&output=embed frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><div id="resources-go-here"></div>'
    } else {
      document.getElementById("resources-go-here").innerHTML = "<image src ="+response.httpLink+"><div id='resources-go-here'></div>"
    }
  })
}

function giveHelp(){
  document.getElementById("center-right-box").innerHTML = ""
  var multipleClassMessage = document.createElement('div')
  multipleClassMessage.innerHTML = `
  <label for="file" class="custom-file-upload">Upload a picture</label>
  <input class="file-submit" type="file" name="file" id="file"></input>
  <br/>
  <br/>
  <input type="text" id="youtube" value="Paste a Youtube video here!" size="80">
  <br/>
  <button onClick = "submitYoutube()"> Submit Youtube </button>
  <div class="back" onclick="giveHelpBackButton()">Back</div>
  <div id="resources-go-here"></div>
  `
  document.getElementById("center-right-box").appendChild(multipleClassMessage)
  const fileUpload = document.getElementById('file')
  fileUpload.addEventListener("change", handleFile, false)
}

function giveHelpBackButton(){
  document.getElementById("center-right-box").innerHTML = ""
  document.getElementById("center-right-box").innerHTML = `
  <button onclick=getHelp()>Get help</button>
  <button onclick=giveHelp()>Give help</button>
  `
}

function handleFile(){
  document.getElementById("resources-go-here").innerHTML = "Loading..."
  var formdata = new FormData()
  formdata.append('file', this.files[0])
  formdata.append('classNumber', classNumber)
  formdata.append('section', section)
  formdata.append('topicName', topic)
  formdata.append('questionText1', question1)
  formdata.append('questionText2', question2)
  formdata.append('email', email)
  formdata.append('name', name)

  if( fileIsPicture(this.files[0]) ){
    //document.getElementById("resources-go-here").innerHTML = "Loading..."

    $.ajax({
      url:"/upload",
      type: "POST",
      contentType: false,
      processData: false,
      data: formdata,
      success: function(){

      },
      error: function(req, textStatus, error){
        alert("Status: " + textStatus)
        alert("Error: " + error)
      },
      complete: function(data){
        if (data.responseJSON.tooManyPending){
          alert("You have three teaching documents pending.  Please wait for your instructor to review your previous submissions before submitting new ones")
          document.getElementById("resources-go-here").innerHTML = ""
        } else {
          alert('Your picture has been submitted!')
          document.getElementById("resources-go-here").innerHTML = ""
        }
      }
    })
  } else {
    alert("Please upload file thatF is .png, .jpeg, .jpg, .tiff, .bmp, .gif, or .HEIC ")
    document.getElementById("resources-go-here").innerHTML = ""
  }
}

function fileIsPicture(file){
  switch (file.name.split('.').pop()){
    case "png":
    case "PNG":
    case "jpeg":
    case "JPEG":
    case "JPG":
    case "jpg":
    case "tiff":
    case "TIFF":
    case "bmp":
    case "BMP":
    case "gif":
    case "GIF":
    case "HEIC":
    case "heic":
    return true;
    default:
    return false
  }
}

function submitYoutube(){
  var youtubeAddress = document.getElementById('youtube').value

  const youtubeValidRegex = /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/

  if(youtubeAddress.match(youtubeValidRegex)){
      $.post('../../save-youtube-link', {
        name: name,
        email: email,
        section: section,
        topic: topic,
        classNumber: classNumber,
        youtubeLink: youtubeAddress
      }).then(response =>{
        if(response.successful){
          alert("Your Youtube link has been stored!")
        } else if (response.tooManyPending){
          alert("You have too many teaching submissions pending review.  Please wait for your instructor to approve some of your teaching documents.")
        } else {
          alert("NO")
        }
      })
  } else {
    alert("This is not a valid Youtube link.")
  }

}
