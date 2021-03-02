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
const mongoPendingTeaching = require('./server/mongoPendingTeaching')
const mongoResolvePendingTeachingDoc = require('./server/mongoResolvePendingTeachingDoc')
const mongoGetHelp = require('./server/mongoGetHelp')
const mongoSaveYoutubeLink = require('./server/mongoSaveYoutubeLink')
const mongoGetYoutubeNumber = require('./server/mongoGetYoutubeNumber')

const googleViewTeachingItem = require('./server/googleViewTeachingItem')
const googleUpload = require("./server/googleUpload")
const googleDownload = require("./server/googleDownload")

const multer = require("multer")

const upload = multer({dest: "./"})

const fs = require("fs")

const dotenv = require('dotenv')

app.set('view engine', 'html')

app.use(express.static(__dirname + '/'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './google.html'))
})

app.post("/save-youtube-link", function(req, res){
  mongoGetYoutubeNumber((err, youtubeNumber) => {
    if(err){
      console.log(err)
    } else {
    mongoSaveYoutubeLink(req.body.name, req.body.email, req.body.section, req.body.topic, req.body.youtubeLink, req.body.classNumber, youtubeNumber, res)
    }
  })
})

app.get('/instructor-approve.html', function(req, res){
  res.send({text: req.params.text, classNumber: req.params.classNumber})
})

app.post('/resolve-pending', (req, res)=>{
  mongoResolvePendingTeachingDoc(req.body.itIsImage, req.body.section, req.body.topicName, req.body.classNumber, req.body.pictureNumber, req.body.name, req.body.email, req.body.url, req.body.approve, req.body.index, res)
})

//no fucking clue what this does so I commented it out
/*
app.get("/get-classes", function(req, res){
  classes = mongoGetClasses(name, email, res)
})
*/

app.post('/', function(req, res){
  mongoLogin(req.body.name, req.body.email);
})

app.post('/get-pending-teaching', function(req, res){
  mongoPendingTeaching(req.body.classNumber, res)
})

app.post('/create-class', function(req, res){
  mongoCreateClass(req.body.email, req.body.textbook, res)
})

app.post('/continue-class', (req, res) =>{
  mongoContinueClass(req.body.name, req.body.email, res)
})

app.post('/join-class', (req, res) =>{
  mongoJoinClass(req.body.email, req.body.name, req.body.classes, res)
})

app.post('/upload', upload.single("file"), (req, res) => {
  mongoGetImageNumber((err, imageNumber) => {
    if(err){

    } else {
      googleUpload(req.file, req.body.classNumber, req.body.section, req.body.topicName, imageNumber, res)

      //if googleUpload detects too many pending docs, res.send happens.  If that happens, need to stop mongoAddImageTo...

      mongoAddImageToTeacherQue(req.body.classNumber, req.body.questionText1, req.body.questionText2, req.body.section, req.body.topicName, req.body.name, req.body.email, imageNumber, res)
    }
  })
})

app.post('/view-teaching-items', (req, res) => {
  googleViewTeachingItem(req.body.section, req.body.topicName, req.body.classNumber, req.body.pictureNumber, req.body.email, res)
})

app.post('/download-image', (req, res) => {
  googleDownload(req.body.section, req.body.topicName, res)
})

app.post('/question-correct', (req, res) => {
  mongoQuestionCorrect(req.body.name, req.body.email, req.body.section, req.body.topic, res)
})

app.post('/view-class', (req, res) => {
  mongoViewClass(req.body.email, res)
})

app.post('/get-class-json', (req, res) =>{
  mongoGetClassJSON(req.body.classNumber, req.body.name, req.body.email, res)
})

app.post("/get-class-json-for-teacher", function(req, res){
  mongoGetClassJSONForTeacher(req.body.classNumber, req.body.name, req.body.email, res)
})

app.post("/get-help", function (req, res){
  mongoGetHelp(req.body.isItYoutube, req.body.classNumber, req.body.section, req.body.topicName, res)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = {
  app,
}
