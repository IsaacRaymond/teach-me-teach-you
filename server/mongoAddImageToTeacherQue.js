const MongoClient = require('mongodb');

function mongoAddImageToTeacherQue(classNumber, questionText1, questionText2, topicName, name, email, imageNumber, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    var queryString = "students."+name+".email"
    var queryString2 = "students."+name+".pendingTeach"

    var query1 = {
      id: parseInt(classNumber),
      [queryString]: email,
    }

    var query2 = {
      [queryString]: email,
    }

    var query3 = {
      id: parseInt(classNumber)
    }

    var updating = {
      $push: {
        [queryString2]: imageNumber
      }
    }

    var updating2 = {
      $push: {
        pendingDocs: [name, email, questionText1, questionText2, topicName, imageNumber]
      }
    }

    collection.findOne(query1).then(result => {
      if (result.students[name].pendingTeach.length > 2){
        res.send({tooManyPending: true})
      } else {
        collection.updateOne(query2, updating).then(result => {
          collection.updateOne(query3, updating2).then(result =>{
            res.send({success: true})
          })
        })
      }
    })
  })
}


module.exports = mongoAddImageToTeacherQue;
