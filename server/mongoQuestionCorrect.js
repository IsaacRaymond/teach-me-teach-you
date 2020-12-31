const MongoClient = require('mongodb');

function mongoQuestionCorrect(name, email, section, topic, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    var queryString = "students."+name+".email"
    var queryString2 = "students."+name+".topics."+section+"."+topic+".numberLeft"

    const filter = {
      [queryString]: email,
    }

    var update = {
      $inc: {
        [queryString2]: -1
      }
    }

    collection.findOne(filter).then(result=>{
      if(result.students[name].topics[section][topic].numberLeft <= 0){
        res.send({isTopicComplete: true})
      } else {
        collection.updateOne(filter, update).then(result => {
          res.send({isTopicComplete: false})
        })
      }
    })
  })
}


module.exports = mongoQuestionCorrect;
