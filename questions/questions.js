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
    console.log('User signed out.')
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
  <input type="file" name="file" id="file" multiple>
  `


  /*

  */

  document.getElementById("center-right-box").appendChild(multipleClassMessage)
  const fileUpload = document.getElementById('file')
  fileUpload.addEventListener("change", handleFile, false)
}

function handleFile(){
  var formdata = new FormData()
  formdata.append('file', this.files[0])
  formdata.append('classNumber', classNumber)
  formdata.append('section', section)
  formdata.append('topic', topic)
  //const files = this.files

  $.ajax({
    url:"/upload",
    type: "POST",
    contentType: false,
    processData: false,
    data: formdata,
    success: function(){
      console.log('success')
    }
  })

/*
  $.post('/upload',
  {
    files: files[0],
  }).then(response => {

  })*/
}

function processPost(){
  fetch('/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        name: "butts"
      }
    })
  })
}
