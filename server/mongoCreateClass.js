const MongoClient = require('mongodb')
const {Storage} = require('@google-cloud/storage')

function mongoCreateClass(email, textbook, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");


    collection.countDocuments({teacher: email}).then(result => {
      if(result >= 5){
        res.send({tooManyClasses: true})
      } else {
        collection.countDocuments({}).then(totalAmount=>{
          var date = new Date()
          createStorageBin(totalAmount+1)
          collection.insertOne({
            id: totalAmount+1,
            teacher: email,
            textbook: textbook,
            students: {},
            date: date
          }, (error, result) =>{
            if(error){console.log(error)}
          })//end insert
          res.send({created: true})
        })//end countDocuments2
      }//end else
    })//end countDocuments 1
  })
}

function createStorageBin(classNumber){
  const bucketName = ""+process.env.BUCKET+classNumber
  const storageClass = 'STANDARD'
  const location = 'US'

  // Creates a client
  const storage = new Storage()

  async function createBucketWithStorageClassAndLocation() {
    // For default values see: https://cloud.google.com/storage/docs/locations and
    // https://cloud.google.com/storage/docs/storage-classes

    const [bucket] = await storage.createBucket(bucketName, {
      location,
      [storageClass]: true,
    })

    console.log(
      `${bucket.name} created with ${storageClass} class in ${location}.`
    )
  }

  createBucketWithStorageClassAndLocation()
}

module.exports = mongoCreateClass
