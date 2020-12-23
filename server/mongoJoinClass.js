const MongoClient = require('mongodb');

function mongoJoinClass(email, name, classes, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var classNumber = {"id": parseInt(classes)};
    var newStudentPush = { $push: {"students": email } };

    collection.findOne(classNumber).then(result => {
      if(result){
        collection.findOne({"students": email}).then(result => {
          if(result){
            res.send({"newStudent": false})
          } else{
            collection.updateOne(classNumber, newStudentPush, function(err, response){
              if (err) throw err;
              res.send({"newStudent": true});
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
