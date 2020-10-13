const MongoClient = require('mongodb');

function mongoMakeClass(email, name, textbook){

  const uri = "mongodb+srv://isaacraymond:"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var numberClasses = collection.count().then(result => {
      console.log('the number of other classes is ' + result);

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
