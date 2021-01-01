const MongoClient = require('mongodb');
var fs = require('fs')

function mongoJoinClass(email, name, classes, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    var text

    var classNumber = {"id": parseInt(classes)}


    //This query is to obtain the textbook
    collection.findOne(classNumber).then(result => {
      if(result){
        var text = result.textbook

        var studentQuery = "students."+name+".email"

        collection.countDocuments({[studentQuery]:email}).then(result => {
          if(result >=6){
            res.send({"tooManyClasses": true})
          } else {
            readingFile(name, email, text, collection, classNumber, res)
            }
          })//Close countDocuments//
      } else {
        res.send({"noClass": true})
      }
    })
  }) //close MongoClient connect
}//close mongoJoinClass

function readingFile(name, email, text, collection, classNumber, res){
  var queryString = "students."+name+".email"

  fs.readFile('./topics/'+text+'.json', (err, data) => {
    if(err) throw err

    let json = JSON.parse(data)
    let topics = json.topics

    var testing = "students."+name

    var newStudentPush = {
      $set: {
        [testing]: {
          name: name,
          email: email,
          topics
        }
      }
    }

    collection.updateOne(classNumber, newStudentPush, function(err, response){
      if (err) throw err;
      res.send({"newStudent": true})
    })

  })//close readFile
}

module.exports = mongoJoinClass;
