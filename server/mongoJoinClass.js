const MongoClient = require('mongodb');
var fs = require('fs')

function mongoJoinClass(email, name, classes, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")
    var studentCollection = database.collection("students")

    var classNumber = {"id": parseInt(classes)}
    var newStudentPush = { $push: {"students": email}}

    var addTopics = {$push: {}}

    var text

    collection.findOne(classNumber).then(result => {
      if(result){
        var text = result.textbook
        collection.findOne({"students": email}).then(result => {
          if(result){
            //This student has already been found on another class roster
            res.send({"newStudent": false})
          } else{
            //This student is all set to enroll in this class
            collection.updateOne(classNumber, newStudentPush, function(err, response){
              if (err) throw err;
              res.send({"newStudent": true})
            })

            fs.readFile('./topics/='+text+'.json', (err, data) => {
              if(err) throw err
              let json = JSON.parse(data)
              studentCollection.updateOne({"email" : email}, {$push:json}, function(err, doc){
                if(err) throw err
              })
            })
          }
        })//close findOne student in class
      } else {
        res.send({"noClass": true})
      }
    })


  }) //close MongoClient connect
}

module.exports = mongoJoinClass;
