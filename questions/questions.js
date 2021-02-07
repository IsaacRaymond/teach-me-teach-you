var topic, section, textbook, classNumber

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
    }).then(response=>{
      if(response.topicComplete){
        alert('You do not have to continue working on this topic.  You have completed enough!')
        window.location.href = "http://localhost:3000/class/continue-class/continue-class.html?classNumber="+response.classNumber
      } else {
        alert("Nicely done!  You can keep working on this topic or you can use the back arrow")
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
  $.get('../../get-number', {
    section: section,
    topicName: topic
  }).then(response=>{

  })
}

function giveHelp(){
  document.getElementById("center-right-box").innerHTML = ""
  var multipleClassMessage = document.createElement('div')
  multipleClassMessage.innerHTML = `
  <label for="file" class="custom-file-upload">Upload a picture</label>
  <input type="file" name="file" id="file">
  <div class="back" onclick="giveHelpBackButton()">Back</div>
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
  var formdata = new FormData()
  formdata.append('file', this.files[0])
  formdata.append('classNumber', classNumber)
  formdata.append('section', section)
  formdata.append('topicName', topic)
  formdata.append('questionText1', question1)
  formdata.append('questionText2', question2)

  if( fileIsPicture(this.files[0]) ){
    $.ajax({
      url:"/upload",
      type: "POST",
      contentType: false,
      processData: false,
      data: formdata,
      success: function(){
        console.log('success')
      },
      error: function(req, textStatus, error){
        alert("Status: " + textStatus)
        alert("Error: " + error)
      },
      complete: function(data){
        if (data.responseJSON.tooManyPending){
          alert("You have three teaching documents pending.  Please wait for your instructor to review your previous submissions before submitting new ones")
        } else {
          alert('Your picture has been submitted!')
        }
      }
    })
  } else {
    alert("Please upload file thatF is .png, .jpeg, .jpg, .tiff, .bmp, .gif, or .HEIC ")
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
