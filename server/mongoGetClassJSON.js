const MongoClient = require('mongodb');

function mongoGetClassJSON(classNumber, name, email, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var queryString = "students."+name+".email"

    var query = {
      id: parseInt(classNumber),
    }

    collection.findOne(query).then(result => {
      var jsonObject = {textbookName: result.textbook, ...result.students[name].topics}
      res.send(jsonObject)
    })
  })
}


module.exports = mongoGetClassJSON;
