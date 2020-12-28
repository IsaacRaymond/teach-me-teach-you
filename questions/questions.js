

document.addEventListener("DOMContentLoaded", function(){
  var scr = document.createElement('script')
  head = document.head || document.getElementByTagName('head')[0]
  scr.src = './prealgebra/1.1/Identify Counting Numbers and Whole Numbers.js'
  scr.aysnyc = false
  head.insertBefore(scr, head.firstChild)
  scr.onload = function(){
    loopAndRenderMathJax()
  }
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  console.log(urlParams.get('haters'))
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

  })

}

function displayMCOptions(){

  //yeah i know.  back the fuck off

    document.getElementById('mc-option-1').innerHTML = ""
    document.getElementById('mc-option-2').innerHTML = ""
    document.getElementById('mc-option-3').innerHTML = ""
    document.getElementById('mc-option-4').innerHTML = ""
    document.getElementById('mc-option-5').innerHTML = ""
    document.getElementById('mc-option-6').innerHTML = ""

    var output1 = document.getElementById('mc-option-1')
    var output2 = document.getElementById('mc-option-2')
    var output3 = document.getElementById('mc-option-3')
    var output4 = document.getElementById('mc-option-4')
    var output5 = document.getElementById('mc-option-5')
    var output6 = document.getElementById('mc-option-6')

    MathJax.texReset()

    var options1 = MathJax.getMetricsFor(output1)
    var options2 = MathJax.getMetricsFor(output2)
    var options3 = MathJax.getMetricsFor(output3)
    var options4 = MathJax.getMetricsFor(output4)
    var options5 = MathJax.getMetricsFor(output5)
    var options6 = MathJax.getMetricsFor(output6)


    MathJax.tex2svgPromise(mc1, options1).then(function (node){
      output1.appendChild(node)
      MathJax.startup.document.clear()
      MathJax.startup.document.updateDocument()
    }).catch(function (err){

    })

    MathJax.tex2svgPromise(mc2, options2).then(function (node){
      output2.appendChild(node)
      MathJax.startup.document.clear()
      MathJax.startup.document.updateDocument()
    }).catch(function (err){

    })

    MathJax.tex2svgPromise(mc3, options3).then(function (node){
      output3.appendChild(node)
      MathJax.startup.document.clear()
      MathJax.startup.document.updateDocument()
    }).catch(function (err){

    })

    MathJax.tex2svgPromise(mc4, options4).then(function (node){
      output4.appendChild(node)
      MathJax.startup.document.clear()
      MathJax.startup.document.updateDocument()
    }).catch(function (err){

    })

    MathJax.tex2svgPromise(mc5, options5).then(function (node){
      output5.appendChild(node)
      MathJax.startup.document.clear()
      MathJax.startup.document.updateDocument()
    }).catch(function (err){

    })

    MathJax.tex2svgPromise(mc6, options6).then(function (node){
      output6.appendChild(node)
      MathJax.startup.document.clear()
      MathJax.startup.document.updateDocument()
    }).catch(function (err){

    })

    console.log('uh oh')

}
/*
  document.getElementById('mc-option-1').innerHTML = mc1
  document.getElementById('mc-option-2').innerHTML = mc2
  document.getElementById('mc-option-3').innerHTML = mc3
  document.getElementById('mc-option-4').innerHTML = mc4
  document.getElementById('mc-option-5').innerHTML = mc5
  document.getElementById('mc-option-6').innerHTML = mc6
  */


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    window.location.href = "../google.html";
  });
}

var identifyCountingNumbersandWholeNumbers = {
  "1": {
    "text1": "The cat and the dog eat butts",
    "text2": "Do you like it?"
  }
}
