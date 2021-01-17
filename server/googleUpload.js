const {Storage} = require('@google-cloud/storage')
const MongoClient = require('mongodb')
const path = require("path")
const fs = require("fs")
const Jimp = require('jimp')
const resizeOptimizeImages = require('resize-optimize-images')


function googleUpload(file, classNumber, section, topic, imageNumber, res){
  updateImageNumber()
  uploadToLocalStorage(file, classNumber, section, topic, imageNumber, res)
}

function updateImageNumber(){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"
  MongoClient.connect(uri, function(err, client){
  var database = client.db("tmty")
  var collection = database.collection("system")

  collection.updateOne({}, {$inc: {image_number:1}}).then(result =>{
  })
})
}

function uploadToLocalStorage(file, classNumber, section, topic, imageNumber, res){
  const tempPath = file.path
  const targetPath = path.join(__dirname, "../image.png")
  var stats = fs.statSync(file.path)
  var fileSizeInBytes = stats.size

  var filepath = __dirname + "/" + "temp"+path.extname(file.originalname)

  console.log('about to rename')
  fs.rename(file.path, filepath, function(err){
    if (err){
      console.log(err)
      res.send(500)
    } else {
      resizeImage(file, filepath, classNumber, section, topic, imageNumber, res)
    }
  })
}

async function resizeImage(file, filepath, classNumber, section, topic, imageNumber, res){
  console.log('resize called')
    const options = {
      images: [filepath],
      width: 400,
      quality: 100
    }
    await resizeOptimizeImages(options)
    uploadToGoogleStorage(filepath, classNumber, section, topic, imageNumber, res)
}

function uploadToGoogleStorage(filepath, classNumber, section, topic, imageNumber, res){
    const bucketName = ""+process.env.BUCKET + classNumber
    const filename = filepath

    // Imports the Google Cloud client library
    // Creates a client
    const storage = new Storage()

    async function uploadFile() {
      // Uploads a local file to the bucket
      await storage.bucket(bucketName).upload(filename, {

        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        destination: ""+section+"/"+topic+"/"+imageNumber,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: 'public, max-age=31536000',
        },
      })
      console.log('getting updated')

      res.send({fileUploaded: true})
    }

    uploadFile().catch(console.error)
}

module.exports = googleUpload
