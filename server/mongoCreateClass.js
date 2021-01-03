const MongoClient = require('mongodb');

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



    module.exports = mongoCreateClass;
