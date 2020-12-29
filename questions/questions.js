

document.addEventListener("DOMContentLoaded", function(){
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  var scr = document.createElement('script')
  head = document.head || document.getElementByTagName('head')[0]
  scr.src = "./"+urlParams.get('text')+"/"+ urlParams.get('section') +"/"+urlParams.get('topic')+".js"
  scr.aysnyc = false
  head.insertBefore(scr, head.firstChild)
  scr.onload = function(){
    shuffleArray()
    loopAndRenderMathJax()
  }
});

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
    alert("hurray!")
  } else {
    alert("boo")
  }
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    window.location.href = "../google.html";
  });
}
