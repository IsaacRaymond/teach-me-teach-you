const MongoClient = require('mongodb');

function mongoNewStudent(email, name, classes){

  const uri = "mongodb+srv://isaacraymond:"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;
    console.log('update called');

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var myquery = {"id": parseInt(classes)};
    var newValues = { $push: {"students": email } };


    collection.findOne({"students": email}).then(result => {
      if(result){
        console.log("You are already a student in this class");
      } else{
        collection.updateOne(myquery, newValues, function(err, res){
          if (err) throw err;
          console.log('should be updated');
        });
      }
    });

  });
}

module.exports = mongoNewStudent;
