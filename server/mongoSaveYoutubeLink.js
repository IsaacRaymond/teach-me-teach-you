const MongoClient = require('mongodb');

function mongoSaveYoutubeLink(classNumber, name, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes")

    var query = {
      id: parseInt(classNumber)
    }

    var queryString = "students."+name+".pendingTeach"

    collection.findOne({query}).then(response => {

    })

  })//End MongoConnnect
}


module.exports = mongoSaveYoutubeLink
