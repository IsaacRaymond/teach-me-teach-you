const MongoClient = require('mongodb');

function mongoDbConnect(name, email){

  const uri = "mongodb+srv://isaacraymond:"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    const newStudent = {
      "name":name,
      "email":email
    }

    var database = client.db("tmty");
    var collection = database.collection("students");

    var studentsEmail = collection.findOne({"email":email}).then(result => {
      if(result){
        console.log("email address found");

      } else {
        collection.insertOne(newStudent, (error, result) =>{
          if(error){console.log(error);}
          
        })
      }
    });
  });
}


module.exports = mongoDbConnect;
