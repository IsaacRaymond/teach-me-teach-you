const MongoClient = require('mongodb');
var fs = require('fs')

function mongoJoinClass(email, name, classes, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    var classNumber = {"id": parseInt(classes)}
    var newStudentPush = { $push: {"students": email}}

    var text

    //This query is to obtain the textbook
    collection.findOne(classNumber).then(result => {
      if(result){
        var text = result.textbook

        var queryString = "students."+name+".email"

        //Check to see if the student is enrolled in another course (one course per email)
        collection.findOne({[queryString]: email}).then(result => {
          if(result){
            //This student has already been found on another class roster
            res.send({"newStudent": false})
          } else{
            fs.readFile('./topics/'+text+'.json', (err, data) => {
              if(err) throw err

              let json = JSON.parse(data)
              let topics = json.topics

              var testing = "students."+name

              newStudentPush = {
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
            })//end read file
          }
        })//close findOne student in class
      } else {
        res.send({"noClass": true})
      }
    })


  }) //close MongoClient connect
}

module.exports = mongoJoinClass;
