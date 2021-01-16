const MongoClient = require('mongodb')
const {Storage} = require('@google-cloud/storage')

function googleViewTeachingItem(section, topicName, classNumber, pictureNumber, email, res){

  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, client){
    if (err) throw err

    var database = client.db("tmty")
    var collection = database.collection("classes")

    var listClassesString = ""

    collection.findOne({"id": classNumber, "teacher": email}).then(result=>{
      console.log('here comes the verification')
      console.log(result)

      googleDownload(sectiion, topicName, pictureNumber, res)

    })
  })
}

function googleDownload(section, topicName, pictureNumber res){
  const bucketName = ""+process.env.BUCKET+"classNumber";
  const filename = ""+section+"/"+topicName+"/"+pictureNumber

  const srcFilename = ""+section+"/"+topicName+"/"+pictureNumber
  const destFilename = './';

  // Creates a client
  const storage = new Storage();

  async function downloadFile() {
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options);

    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    )
  }

  downloadFile().catch(console.error)
}


module.exports = googleViewTeachingItem
