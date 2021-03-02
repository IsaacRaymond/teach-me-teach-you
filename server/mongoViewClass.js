const MongoClient = require('mongodb');

function mongoViewClass(email, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    var listClassesString = ""

    collection.find({"teacher": email}).toArray((e, result)=>{
      var classList = []

      if(result.length>0){
        result.forEach(classObject => {
          listClassesString += "<option value="+classObject.id+">Class number "+classObject.id+"</option>"
        })
        res.send({listClassesString: listClassesString, text: result[0].textbook})
      } else {
        res.send({noClass: true})
      }
    })
  });
}


module.exports = mongoViewClass;
