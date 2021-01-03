const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require("path")
const mongoLogin = require("./server/mongoLogin")
const mongoCreateClass = require("./server/mongoCreateClass")
const mongoContinueClass = require("./server/mongoContinueClass")
const mongoJoinClass = require("./server/mongoJoinClass")
const mongoGetClasses = require("./server/mongoGetClasses")
const mongoViewClass = require("./server/mongoViewClass")
const mongoQuestionCorrect = require("./server/mongoQuestionCorrect")
const mongoGetClassJSON = require("./server/mongoGetClassJSON")
const mongoGetClassJSONForTeacher = require("./server/mongoGetClassJSONForTeacher")
const dotenv = require('dotenv')

const uploadFile = require('./controllers/upload.js')

var email, name
var classes = []

app.set('view engine', 'html')

app.use(express.static(__dirname + '/'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './google.html'))
})

app.get("/image/:filename", (req, res) => {

})

app.post('/upload', function(req, res){
  uploadFile.uploadFile(req, res)
})

app.get("/get-classes", function(req, res){
  classes = mongoGetClasses(name, email, res)
  console.log(classes)
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

app.get('/students-topics', (req, res) => {

})

app.post('/question-correct', (req, res) => {
  mongoQuestionCorrect(name, email, req.body.section, req.body.topic, res)
})

app.get('/view-class', (req, res) => {
  console.log('server side')
  mongoViewClass(email, res)
})

app.post('/get-class-json', (req, res) =>{
  mongoGetClassJSON(req.body.classNumber, name, email, res)
})

app.post("/get-class-json-for-teacher", function(req, res){
  mongoGetClassJSONForTeacher(req.body.classNumber, name, email, res)
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
  testing: classes
};
