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
      var numberLeft = result.students[name].topics[section][topic].numberLeft

      if(numberLeft <= 0){
        res.send({topicComplete: true, classNumber:result.id})
      } else {
        collection.updateOne(filter, update).then(result2 => {
          if (numberLeft <= 1){
            res.send({topicComplete: true, classNumber:result.id})
          } else {
            res.send({topicComplete: false})
          }
        })
      }
    })
  })
}


module.exports = mongoQuestionCorrect;
