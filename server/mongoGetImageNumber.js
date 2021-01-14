const MongoClient = require('mongodb');

var mongoGetImageNumber = function(callback){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("system");

    collection.findOne({}).then(result => {
      callback(null, result.image_number)
    })
  })
}


module.exports = mongoGetImageNumber;
