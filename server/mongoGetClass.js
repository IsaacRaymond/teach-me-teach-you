const MongoClient = require('mongodb');

function mongoGetClass(email, res){

  const uri = "mongodb+srv://isaacraymond2:"+process.env.PASSWORD+"@isaactesting.7scyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("students");

    var studentsEmail = collection.findOne({"email":email}).then(result => {
      if(result){
        return res.send({classEnrollment: true})
      } else {
        return res.send({classEnrollment: false})
      }
    });

    });
}


module.exports = mongoGetClass;
