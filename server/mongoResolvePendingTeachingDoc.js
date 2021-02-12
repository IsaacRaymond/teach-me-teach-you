const MongoClient = require('mongodb')
const {Storage} = require('@google-cloud/storage')

function mongoResolvePendingTeachingDoc(section, topicName, classNumber, pictureNumber, name, email, url, approve, index, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")


    if(approve){
      addTeachingDoc(collection, classNumber, section, topicName, name, email, url, index, res)
    } else {
      deletePendingDoc(collection, classNumber, index)
    }
  })
}

function deletePendingDoc(collection, classNumber, index){
  var filter = {
    id: parseInt(classNumber)
  }

  var updateString = "pendingDocs."+index

  var unsetting = {
    $unset: {
      [updateString]: 1
    }
  }

  var pulling = {
    $pull: {
      "pendingDocs": null
    }
  }

  collection.updateOne(filter, unsetting)
  collection.updateOne(filter, pulling)
}

function addTeachingDoc(collection, classNumber, section, topicName, name, email, url, index, res){
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

  deletePendingDoc(collection, classNumber, index)

}


module.exports = mongoResolvePendingTeachingDoc
