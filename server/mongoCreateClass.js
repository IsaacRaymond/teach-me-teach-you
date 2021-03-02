const MongoClient = require('mongodb')
const {Storage} = require('@google-cloud/storage')
var fs = require('fs')

function mongoCreateClass(email, textbook, res){
  const uri = "mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@isaactesting-7scyt.mongodb.net/test?retryWrites=true&w=majority"

  MongoClient.connect(uri, function(err, client){
    if (err) throw err;

    var database = client.db("tmty");
    var collection = database.collection("classes");

    fs.readFile('./topics/'+textbook+'-class.json', (err, data) => {
      if(err) throw err

      let json = JSON.parse(data)
      let topics = json.topics

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
            topics: topics,
            pendingDocs: {
              pictures: [],
              youtubeLinks: []
            },
            date: date
          }, (error, result) =>{
            if(error){console.log(error)}
          })//end insert
          res.send({
            created: true,
            classNumber: totalAmount+1
          })
        })//end countDocuments2
      }//end else
    })//end countDocuments 1
  })//end file read
})//end MongoClient.connect
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

    const options = {
      entity: 'allUsers',
      role: storage.acl.READER_ROLE
    };

    const [bucket] = await storage.createBucket(bucketName, {
      location,
      [storageClass]: true,
    })

    await bucket.acl.default.add(options)
  }

  createBucketWithStorageClassAndLocation()
}

module.exports = mongoCreateClass
