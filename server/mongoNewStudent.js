const MongoClient = require('mongodb');

function mongoNewStudent(email, name, classes){

  const uri = "mongodb+srv://isaacraymond:"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    collection.updateOne(
      {"id": classes},
      { $set: {"students": email}}
    );

    });
}


module.exports = mongoNewStudent;
