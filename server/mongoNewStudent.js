const MongoClient = require('mongodb');

function mongoNewStudent(email, name, classes, res){

    const uri = "mongodb+srv://isaacraymond2:"+process.env.PASSWORD+"@isaactesting.7scyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;
    console.log('update called');

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var myquery = {"id": parseInt(classes)};
    var newValues = { $push: {"students": email } };


    collection.findOne({"students": email}).then(result => {
      if(result){
        res.send({"newStudent": false})
      } else{
        collection.updateOne(myquery, newValues, function(err, response){
          if (err) throw err;
          res.send({"newStudent": true});
        });
      }
    });
  });
}

module.exports = mongoNewStudent;
