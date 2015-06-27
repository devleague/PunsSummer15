var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var MongoConnectURL = "mongodb://jrdevleague:devleague@ds047812.mongolab.com:47812/jrdevleague";

exports.createTodo = function(callback){

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
    }, function(err, newItem) {
      // Close the db connection
      db.close();

      return callback(null, newItem);
    }); // End of function(err, newItem) callback
  });
};


exports.getTodos = function(callback){
  MongoClient.connect(MongoConnectURL, function(err, db) {
    if (err) {
      throw err;
    }
    var collection = db.collection('todos');
    collection.find().toArray(function(err, todos){

      if(err) {
        throw err;
      }

      db.close();

      return callback(null, todos)
    });
  });
};


exports.deleteTodo = function(todoId, callback) {
  MongoClient.connect(MongoConnectURL, function(err, db) {
    if (err) {
      throw err;
    }
    collection.remove({"_id": new ObjectID(todoId)}, function (err, result) {
      if( err ){
        throw err;
      }

      db.close();

      return callback(null, {success: "success"});
    });
  });
};