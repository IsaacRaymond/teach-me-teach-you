const MongoClient = require('mongodb');

function mongoSaveYoutubeLink(name, email, section, topic, youtubeLink, classNumber, youtubeNumber, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes")

    var queryString = "pendingDocs.youtubeLinks"
    var queryString2 = "students."+name+".pendingTeach"
    var queryString3 = "students."+name+".email"


    var filter = {
      id: parseInt(classNumber)
    }

    var update = {
      $push: {
        [queryString]: [name, email, "Youtube", "Youtube", section, topic, youtubeNumber, youtubeLink]
      }
    }

    var update2 = {
      $push: {
        [queryString2]: {
          type: "youtube",
          number: youtubeNumber
        }
      }
    }

    collection.findOne(filter).then(result => {
      if (result.students[name].pendingTeach.length > 2){
        res.send({tooManyPending: true})
      } else {
        collection.updateOne(filter, update).then(response => {
          collection.updateOne(filter, update2).then(stuff => {
              res.send({successful: true})
          })
        })
      }
    })
  })//End MongoConnnect
}


module.exports = mongoSaveYoutubeLink
