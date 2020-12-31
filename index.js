const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require("path")
const mongoLogin = require("./server/mongoLogin")
const mongoCreateClass = require("./server/mongoCreateClass")
const mongoContinueClass = require("./server/mongoContinueClass")
const mongoJoinClass = require("./server/mongoJoinClass")
const mongoGetProgress = require("./server/mongoGetProgress")
const mongoViewClass = require("./server/mongoViewClass")
const mongoQuestionCorrect = require("./server/mongoQuestionCorrect")
const dotenv = require('dotenv')

var email, name, classNumber

app.set('view engine', 'html')

app.use(express.static(__dirname + '/'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './google.html'))
});

app.get("/current-progress", function(req, res){
  mongoGetProgress(email)
})

app.post('/', function(req, res){
  mongoLogin(req.body.name, req.body.email);
  setName(req.body.name)
  setEmail(req.body.email)
});

app.post('/create-class', function(req, res){
  mongoCreateClass(email, req.body.textbook, res)
});

app.post('/continue-class', (req, res) =>{
  mongoContinueClass(name, email, res)
});

app.post('/join-class', (req, res) =>{
  mongoJoinClass(email, name, req.body.classes, res)
});

app.post('/topic-completion', (req, res) => {

})

app.post('/question-correct', (req, res) => {
  mongoQuestionCorrect(name, email, req.body.section, req.body.topic, res)
})

app.get('view-class', (req, res) => {
  mongoViewClass(email, res)
})



function setName(x){
  name = x;
}

function getName(){
  return name;
}

function setEmail(x){
  email = x;
}

function getEmail(){
  return email;
}

function getClassNumber(){
  return classNumber
}

function setClassNumber(x){
  classNumber = x
}


app.listen(3000, () => console.log('Example app listening on port 3000!'));



module.exports = {
  app,
  setClassNumber
};
