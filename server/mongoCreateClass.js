const MongoClient = require('mongodb');

function mongoCreateClass(email, textbook, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var numberClasses = collection.count().then(result => {
      if(result >= 5){
        res.send({tooManyClasses: true})
      }
        var date = new Date()
        collection.insertOne({
          id: result+1,
          teacher: email,
          textbook: textbook,
          students: {},
          date: date
        }, (error, result) =>{
          if(error){console.log(error)}
        })
        res.send({created: true})
    }).then (result=>{

    })

  });
}


module.exports = mongoCreateClass;
