const MongoClient = require('mongodb')
const {Storage} = require('@google-cloud/storage')

function mongoResolvePendingTeachingDoc(section, topicName, classNumber, pictureNumber, name, email, url){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    collection.findOne({id: classNumber}).then(result => {
      console.log('here comes result')
      console.log(result)
    })
    deletePendingDoc()
    addTeachingDoc(collection, classNumber)

  })
}

function deletePendingDoc(){

}

function addTeachingDoc(collection, classNumber, section, topicName, name, email, url){
  var filter = {
    id: classNumber
  }

  var updateString = "topics."+section+"."+topicName

  collection.updateOne({
    filter,
    $push: {[updateString]: [name, email, url]}
  })
}


module.exports = mongoResolvePendingTeachingDoc
