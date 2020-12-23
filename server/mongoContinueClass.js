const MongoClient = require('mongodb');
var importedFile = require("../index.js")

function mongoContinueClass(email, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    //var classNumber = {"id": parseInt(classes)};

    collection.findOne({"students": email}).then(result => {
      if(result){
        res.send({classEnrollment: true})
      } else{
        res.send({classEnrollment: false})
      }
    });

/*
    var studentsEmail = collection.findOne({"email":email}).then(result => {
      if(result.class!==0){
        return res.send({classEnrollment: true})
      } else {
        return res.send({classEnrollment: false})
      }
    });
*/
  });
}


module.exports = mongoContinueClass;
