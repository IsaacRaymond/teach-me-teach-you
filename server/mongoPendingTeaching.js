const MongoClient = require('mongodb');
const dotenv = require('dotenv').config();

function mongoPendingTeaching(classNumber, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";
    //const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    const search = {
      "id": parseInt(classNumber)
    }

    var database = client.db("tmty");
    var collection = database.collection("classes");

    collection.findOne(search).then(result => {
      res.send({pendingDocs: result.pendingDocs})
    })
  })
}


module.exports = mongoPendingTeaching
