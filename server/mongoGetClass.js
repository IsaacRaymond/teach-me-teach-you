const MongoClient = require('mongodb');

function mongoGetClass(email, res){

  const uri = "mongodb+srv://isaacraymond:"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("students");

    var studentsEmail = collection.findOne({"email":email}).then(result => {
      if(result){
        return res.send(result.class);
      } else {
        console.log("You are not currently enrolled in a class");
      }
    });

    });
}


module.exports = mongoGetClass;
