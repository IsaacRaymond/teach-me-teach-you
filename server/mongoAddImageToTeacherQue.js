const MongoClient = require('mongodb');

function mongoAddImageToTeacherQue(classNumber, questionText1, questionText2, section, topicName, name, email, imageNumber, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes")

    var urlForImage = "https://storage.googleapis.com/tmty"+classNumber+"/"+section+"/"+topicName+"/"+imageNumber+".png"

    var queryString = "students."+name+".email"
    var queryString2 = "students."+name+".pendingTeach"
    var queryString3 = "pendingDocs.pictures"

    var query1 = {
      id: parseInt(classNumber),
      [queryString]: email,
    }

    var query2 = {
      id: parseInt(classNumber),
      [queryString]: email,
    }

    var query3 = {
      id: parseInt(classNumber)
    }

    var updating = {
      $push: {
        [queryString2]: {
          type: "picture",
          number: imageNumber
        }
      }
    }

    var updating2 = {
      $push: {
        [queryString3]: [name, email, questionText1, questionText2, section, topicName, imageNumber, urlForImage]
      }
    }

    collection.findOne(query1).then(result => {
      if (result.students[name].pendingTeach.length > 2){
        res.send({tooManyPending: true})
      } else {
        collection.updateOne(query2, updating).then(result => {
          collection.updateOne(query3, updating2).then(result2 =>{

          })
        })
      }
    })
  })
}


module.exports = mongoAddImageToTeacherQue;
