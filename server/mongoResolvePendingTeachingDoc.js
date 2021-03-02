const MongoClient = require('mongodb')
const {Storage} = require('@google-cloud/storage')

function mongoResolvePendingTeachingDoc(itIsImage, section, topicName, classNumber, itemNumber, name, email, url, approve, index, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    if(approve=='true'){
      deletePendingDocFromStudent(collection, classNumber, itemNumber, name)
      increaseTeachingAmount(collection, classNumber, name, section, topicName)
      addTeachingDoc(collection, itIsImage, classNumber, section, topicName, name, email, url, index, res)
    } else {
      deletePendingDocFromStudent(collection, classNumber, itemNumber, name)
      deletePendingDoc(collection, itIsImage, classNumber, index, true, res)
    }
  })
}

function increaseTeachingAmount(collection, classNumber, name, section, topic){
  var filter = {
    id: parseInt(classNumber)
  }

  var updateString = "students."+name.replace(/_/g, ' ')+".topics."+section+"."+topic+".numberTeacherApproved"

  var update = {
    $inc: {
      [updateString]: 1
    }
  }

  collection.updateOne(filter, update)
}

function deletePendingDocFromStudent(collection, classNumber, itemNumber, name){
  var filter = {
    id: parseInt(classNumber)
  }

  var count = 0

  collection.findOne(filter).then(result => {
    result["students"][name.replace(/_/g, ' ')]["pendingTeach"].forEach(picNumber => {
      if(picNumber.number == itemNumber){
        var pathString = "students."+name.replace(/_/g, ' ')+".pendingTeach."+count
        var pathString2 = "students."+name.replace(/_/g, ' ')+".pendingTeach"

        pulling = {
          $pull: {
            [pathString2]: null
          }
        }

        var unsetting = {
          $unset: {
            [pathString]: 1
          }
        }

        collection.updateOne(filter, unsetting).then(val=>{
          collection.updateOne(filter, pulling)
        })
      }
      count++
    })
  })
}

function deletePendingDoc(collection, itIsImage, classNumber, index, shouldSendResponse, res){
  var filter = {
    id: parseInt(classNumber)
  }

  var updateString
  var pulling

  if(itIsImage == "true"){
    updateString = "pendingDocs.pictures."+index

    pulling = {
      $pull: {
        "pendingDocs.pictures": null
      }
    }
  } else {
    updateString = "pendingDocs.youtubeLinks."+index

    pulling = {
      $pull: {
        "pendingDocs.youtubeLinks": null
      }
    }
  }

  var unsetting = {
    $unset: {
      [updateString]: 1
    }
  }

  collection.updateOne(filter, unsetting).then(val => {
    collection.updateOne(filter, pulling)
  })

  if(shouldSendResponse){
    res.send({allDone: true})
  }

}

function addTeachingDoc(collection, itIsImage, classNumber, section, topicName, name, email, url, index, res){
  var filter = {
    id: parseInt(classNumber)
  }

  var updateString

  if(itIsImage=="true"){
    updateString = "topics."+section+"."+topicName+".pictures"
  } else{
    updateString = "topics."+section+"."+topicName+".youtubeLinks"
  }

  var updating = {
    $push: {
      [updateString]: [name, email, url]
    }
  }

  collection.updateOne(
    filter,
    updating,
  ).then((val) => {
    deletePendingDoc(collection, itIsImage, classNumber, index, false, res)
    res.send({successful: true})
  })

}


module.exports = mongoResolvePendingTeachingDoc
