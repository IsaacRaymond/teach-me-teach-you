const MongoClient = require('mongodb');
const dotenv = require('dotenv').config();

function mongoGetProgress(email){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";
    //const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty")
    var studentCollection = database.collection("students")

    studentCollection.findOne({"email": email}).then(result => {
      console.log(result)
    })
  });
}


module.exports = mongoGetProgress;
