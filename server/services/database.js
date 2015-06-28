var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
// var MongoConnectURL = "mongodb://jrdevleague:devleague@ds047812.mongolab.com:47812/jrdevleague";
var MongoConnectURL = 'mongodb://localhost:27017/todos';

exports.createTodo = function(item, callback){
  // Note the db name todosdb in the connection string
  MongoClient.connect(MongoConnectURL, function(err, db) {
    if (err) {
      throw err;
    }

    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');

    // Insert a document into the collection
    collection.insert({
      title: item.title,
      completed: false 
    }, function(err, result) {
        if(err){
          throw err;
        }
        // Close the db connection
        db.close();

        var newItem = result.ops[0];
        return callback(null, newItem);
    }); 
  });
};


exports.updateTodo = function(item, callback){
  MongoClient.connect(MongoConnectURL, function(err, db){
    if(err){
      throw err;
    }


    var collection = db.collection('todos');

    //Update a document in the collection
    collection.update({"_id": new ObjectID(item.id)}, {$set:{completed:item.completed}}, function(err, result){
     if(err){
      throw err;
     }

     db.close();

     return callback(null);
    });
  });
}


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
    
    var collection = db.collection('todos');

    collection.remove({"_id": new ObjectID(todoId)}, function (err, result) {
      if( err ){
        throw err;
      }

      db.close();

      return callback(null);
    });
  });
};