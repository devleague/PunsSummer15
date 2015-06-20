var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var MongoConnectURL = "mongodb://jrdevleague:devleague@ds047812.mongolab.com:47812/jrdevleague";
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/../public'));
app.set('view engine' , 'jade');
app.get('/', function (req,res){
  res.render('index', {});
});

var server = app.listen(3001, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
 
var todoitam = mongoose.model('todoitam',{
  id:Number,
  content:String,
  title:String
});

app.post('/todoitam',function (req, res){
  // Note the db name todosdb in the connection string
  MongoClient.connect(MongoConnectURL, function(err, db) {
    if (err) {
      throw err;
    }
    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');

    // Insert a document into the collection
    collection.insert({
      title: req.body.new_item.title,
      completed: req.body.new_item.completed
    }, function(err, arrayItem) {
      // Show the item that was just inserted; contains the _id field
      // Note that it is an array containing a single object
      res.send(arrayItem[0]._id);


      // Locate all the entries using find
      // collection.find().toArray(function(err, results) {
      //   console.log(results);

        // Close the db connection
        db.close();
      // });
    }); // End of function(err, docs) callback
  });
  // console.log( req.body );
  // res.send('puppies');

  // fs.writeFile('./public/todo.txt', req.body.list_to_save, function (err){
  //   if (err) return console.log(err);
  // });

});

app.get('/',function (req, res){
  MongoClient.connect(MongoConnectURL, function(err, db) {
    if (err) {
      throw err;
    }
    var collection = db.collection('todos');
    collection.find().toArray(function(err, docs){
      if(err) {
        throw err;
      }
      res.send(docs);
    });
  });
});


app.delete('/todoitam/:item_id', function (req, res){
  console.log(req.params.id);
  MongoClient.connect(MongoConnectURL, function(err, db) {
    if (err) {
      throw err;
    }
    connect_to_db( function ( collection ) {
      var _id = req.params.item_id;
      collection.remove({"_id": new ObjectID( _id )}, function (err, result) {
        if( err ){
          throw err;
        }
        res.json({ success : "success" });
        collection.db.close();
      });
    });
  });
});