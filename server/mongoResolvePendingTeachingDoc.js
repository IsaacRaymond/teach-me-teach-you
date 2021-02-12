const MongoClient = require('mongodb')
const {Storage} = require('@google-cloud/storage')

function mongoResolvePendingTeachingDoc(section, topicName, classNumber, pictureNumber, name, email, url, approve, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")


    if(approve){
      addTeachingDoc(collection, classNumber, section, topicName, name, email, url)
    } else {
      deletePendingDoc(collection, classNumber)
    }
  })
}

function deletePendingDoc(collection, classNumber){
  var filter = {
    id: parseInt(classNumber)
  }

  var updateString = "pendingDocs."

  var updating = {

  }

  collection.updateOne(filter, )
}

function addTeachingDoc(collection, classNumber, section, topicName, name, email, url){
  var filter = {
    id: parseInt(classNumber)
  }

  var updateString = "topics."+section+"."+topicName

  var updating = {
    $push: {
      [updateString]: [name, email, url]
    }
  }

  collection.updateOne(
    filter,
    updating,
  ).then((val) => {
    res.send({successful: true})
  })
}


module.exports = mongoResolvePendingTeachingDoc
