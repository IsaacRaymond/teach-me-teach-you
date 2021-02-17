const MongoClient = require('mongodb')

function mongoGetHelp(itIsYoutube, classNumber, section, topic, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    if(itIsYoutube){
      getYoutubeLink(classNumber, section, topic, res)
    }
      else{
        getPicture(classNumber, section, topic, res)
      }

})//end MongoClient.connect
}

function getYoutubeLink(classNumber, section, topic, res){

}

function getPicture(classNumber, section, topic, res){
  var query = {
    id: parseInt(classNumber)
  }

  collection.findOne(query).then(result =>{
    if (result.topics[section][topic].length <= 1){
      res.send({noHelp: true})
    }
    var pictureSelect = Math.floor(Math.random() * result.topics[section][topic].length)

    var responseArray = result.topics[section][topic]
    var responsePicture = responseArray[pictureSelect]

    res.send({httpLink: responsePicture[2]})

  })
}

module.exports = mongoGetHelp
