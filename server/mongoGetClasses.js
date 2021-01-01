const MongoClient = require('mongodb');
const dotenv = require('dotenv').config();

function mongoGetClasses(name, email, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";
    //const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@"+process.env.MONGOSHIT+".mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty")
    var collection = database.collection("classes")

    var queryString = "students."+name+".email"

    var classNumbers = []

    collection.find({[queryString]: email}).toArray((e, result)=>{
      result.forEach(classItem => classNumbers.push(classItem.id))
      res.send({classes: classNumbers, multipleClasses: true})
    })
  })
}

module.exports = mongoGetClasses;
