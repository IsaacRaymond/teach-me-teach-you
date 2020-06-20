const MongoClient = require('mongodb');

function mongoMakeClass(email, name){

  const uri = "mongodb+srv://isaacraymond:"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var classes = collection.find({"email":email}).toArray.then(result => {
      if(result){
        console.log(result);

      } else {
      //  collection.insertOne(newStudent, (error, result) =>{
          //if(error){console.log(error);}
          console.log('wu');
          
        }
      });
    });
}


module.exports = mongoMakeClass;
