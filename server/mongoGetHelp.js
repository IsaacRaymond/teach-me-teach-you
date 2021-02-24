const MongoClient = require('mongodb')

function mongoGetHelp(itIsYoutube, classNumber, section, topic, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    if( itIsYoutube == 'true'){
      getYoutubeLink(collection, classNumber, section, topic, res)
    } else{
        getPicture(collection, classNumber, section, topic, res)
    }

})//end MongoClient.connect
}

function getYoutubeLink(collection, classNumber, section, topic, res){
  var query = {
    id: parseInt(classNumber)
  }

  collection.findOne(query).then(result =>{
    if (result.topics[section][topic]["youtubeLinks"].length == 0){
      res.send({noHelp: true})
    } else {
      var youtubeSelect = Math.floor(Math.random() * result.topics[section][topic]["youtubeLinks"].length)

      var responseArray = result.topics[section][topic]["youtubeLinks"]
      var responseLink = responseArray[youtubeSelect]

      res.send({
        httpLink: responseLink[2],
        youtube: true
      })
    }
  })
}

function getPicture(collection, classNumber, section, topic, res){
  var query = {
    id: parseInt(classNumber)
  }

  collection.findOne(query).then(result =>{
    if (result.topics[section][topic]["pictures"].length == 0){
      res.send({noHelp: true})
    } else {
      var pictureSelect = Math.floor(Math.random() * result.topics[section][topic]["pictures"].length)

      var responseArray = result.topics[section][topic]["pictures"]
      var responsePicture = responseArray[pictureSelect]

      res.send({
        httpLink: responsePicture[2],
        youtube: false
      })
    }
  })
}

module.exports = mongoGetHelp
