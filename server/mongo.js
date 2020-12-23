const MongoClient = require('mongodb');

function mongoDbConnect(name, email){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    const newStudent = {
      "name":name,
      "email":email,
      "class": 0
    }

    var database = client.db("tmty");
    var collection = database.collection("students");

    var studentsEmail = collection.findOne({"email":email}).then(result => {
      if(result){

      } else {
        collection.insertOne(newStudent, (error, result) =>{
          if(error){console.log(error);}

        })
      }
    });
  });
}


module.exports = mongoDbConnect;
