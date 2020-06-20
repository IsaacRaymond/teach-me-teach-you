const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './google.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
