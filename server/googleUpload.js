const {Storage} = require('@google-cloud/storage')
const MongoClient = require('mongodb')

function googleUpload(section, topicName, imageNumber, res){
  updateImageNumber()
  const bucketName = 'tmty_images';
  const filename = ""+section+"/"+topicName+"/"+imageNumber

  // Imports the Google Cloud client library

  // Creates a client
  const storage = new Storage();

  async function uploadFile() {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
    res.send({fileUploaded: true})
  }

  uploadFile().catch(console.error);
}

function updateImageNumber(){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"
  MongoClient.connect(uri, function(err, client){})
  var database = client.db("tmty")
  var collection = database.collection("classes")

  collection.updateOne({}, {$inc: {image_number:1}}).then(result =>{

  })
}

module.exports = googleUpload
