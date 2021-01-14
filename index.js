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
const mongoGetImageNumber = require("./server/mongoGetImageNumber")
const mongoAddImageToTeacherQue = require('./server/mongoAddImageToTeacherQue')

const googleUpload = require("./server/googleUpload")
const googleDownload = require("./server/googleDownload")

const multer = require("multer")

const upload = multer({dest: "./"})

const fs = require("fs")

const dotenv = require('dotenv')

var email, name
var classes = []

app.set('view engine', 'html')

app.use(express.static(__dirname + '/'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './google.html'))
})

app.get("/get-classes", function(req, res){
  classes = mongoGetClasses(name, email, res)
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

/*
app.get('/get-number', (req, res) => {
  mongoGetImageNumber(function(err, doc){
    if(err) {

    } else {
      console.log(doc)
    }
  })
})
*/

app.post('/upload', upload.single("file"), (req, res) => {
  mongoGetImageNumber((err, imageNumber) => {
    if(err){

    } else {
      //googleUpload(req.file, req.body.classNumber, req.body.section, req.body.topic, imageNumber, res)
      mongoAddImageToTeacherQue(req.body.classNumber, name, email, imageNumber, res)
    }
  })
})

app.post('/download-image', (req, res) => {
  googleDownload(req.body.section, req.body.topicName, res)
})

app.post('/question-correct', (req, res) => {
  mongoQuestionCorrect(name, email, req.body.section, req.body.topic, res)
})

app.get('/view-class', (req, res) => {
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
