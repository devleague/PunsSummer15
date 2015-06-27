var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var databaseService = require('./server/services/database.js');

app.use(express.static(__dirname + '/public'));
app.set('view engine' , 'jade');
app.set('views', path.join(__dirname + '/server/views/'));

app.get('/', function (req,res){
  res.render('index', {});
});

app.get('/',function (req, res){
  databaseService.getTodos(function(err, todos){
    if(err){
      return res.status(500).send(err);
    }

    return res.render('index', {todos: todos});
  });
});
 
app.post('/todoitam',function (req, res){
  var item = req.body.new_item;

  if(!item){
    return res.status(500).send({error: 'Invalid item'});
  }

  databaseService.createTodo(item, function(err, todo){
    // Show the item that was just inserted; contains the _id field
    // Note that it is an array containing a single object

   return res.send({todo: todo});
  });
});

app.delete('/todoitam/:item_id', function (req, res){
  var itemId = req.params.item_id;

  databaseService.deleteTodo(itemId, function(err, callback){
    if(err){
      return res.status(500).send({error: err});
    }

    return res.send({success: 'success'});
  });
});

var server = app.listen(3001, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});