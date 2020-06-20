const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoLogin = require("./server/mongoLogin");
const mongoMakeClass = require("./server/mongoMakeClass");
const dotenv = require('dotenv');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './google.html'));
});

app.post('/', function(req, res){
  mongoLogin(req.body.name, req.body.email);
});

app.post('/create-class', function(req, res){
  mongoMakeClass(req.body.email, req.body.name);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
