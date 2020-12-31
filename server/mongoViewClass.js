const MongoClient = require('mongodb');

function mongoViewClass(email, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

//FIXME:  Neex to display options if the teacher has multiple classes
    collection.find({"teacher": email}).then(result => {
      if(!result){
        alert("You are not currently enrolled in a class")
      } else {
        console.log(result)
        res.send({"classes": ["class one, class two"]})
      }
    })

/*
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
*/
  });
}


module.exports = mongoViewClass;
