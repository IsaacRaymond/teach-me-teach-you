//question 2 is the only part that is currently permitted to have LaTeX

var question1 = "Determine which of the following numbers are (a) counting numbers and (b) whole numbers"
var question2 = ""

var correctAnswerIndex = 0

var mc1, mc2, mc3, mc4, mc5, mc6 = ""

var answerArray = new Array(6)

var a = Math.floor(Math.random()*3) + 1
var b = Math.floor(Math.random()*3) + 4
var c = Math.floor(Math.random()*3) + 7
var d = Math.floor(Math.random()*3) + 1
var e = Math.floor(Math.random()*3) + 5


//Set the correct answer to answerArray[0].
//It will be randomized later.
  answerArray[0] = "one"
  answerArray[1] = "two"
  answerArray[2] = "\\pi"
  answerArray[3] = "four"
  answerArray[4] = "five"
  answerArray[5] = "six"


function shuffleArray() {
    for (let i = answerArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if(j==correctAnswerIndex) {
          correctAnswerIndex = i
        }
        [answerArray[i], answerArray[j]] = [answerArray[j], answerArray[i]];
    }

    mc1 = answerArray[0]
    mc2 = answerArray[1]
    mc3 = answerArray[2]
    mc4 = answerArray[3]
    mc5 = answerArray[4]
    mc6 = answerArray[5]
}
