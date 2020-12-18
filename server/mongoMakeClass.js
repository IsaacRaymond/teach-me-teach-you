const MongoClient = require('mongodb');

function mongoMakeClass(email, textbook){

    const uri = "mongodb+srv://isaacraymond2:"+process.env.PASSWORD+"@isaactesting.7scyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var numberClasses = collection.count().then(result => {
      var date = new Date();
      collection.insertOne({
        id: result+1,
        teacher: email,
        textbook: textbook,
        students: [],
        date: date
      }, (error, result) =>{
        if(error){console.log(error);}
      });
    });

  });
}


module.exports = mongoMakeClass;
