const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoLogin = require("./server/mongoLogin");
const mongoMakeClass = require("./server/mongoMakeClass");
const mongoContinueClass = require("./server/mongoContinueClass");
const mongoJoinClass = require("./server/mongoJoinClass");
const dotenv = require('dotenv');

var email, name, classNumber

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './google.html'));
});

app.post('/', function(req, res){
  mongoLogin(req.body.name, req.body.email);
  setName(req.body.name);
  setEmail(req.body.email);
});

app.post('/create-class', function(req, res){
  mongoMakeClass(email, req.body.textbook);
});

app.post('/continue-class', (req, res) =>{
  mongoContinueClass(email, res);
  console.log('classNumber is ' + getClassNumber());
  //mongoContinueClass(email, res);
});

app.post('/join-class', (req, res) =>{
  mongoJoinClass(email, name, req.body.classes, res);
});

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
