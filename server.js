var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var databaseService = require('./server/services/database.js');

//SET UP THE SERVER 
app.set('view engine' , 'jade');
app.set('views', path.join(__dirname + '/server/views'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//SET UP OUR ROUTES FOR OUR REST API
app.get('/',function (req, res){
  return res.render('index');
});

//READ
app.get('/todos', function(req, res){
  databaseService.getTodos(function(err, todos){
    if(err){
      return res.status(500).send(err);
    }

    return res.json(todos);
  });
});
 
//CREATE
app.post('/todo',function (req, res){
  var item = req.body;

  if(!item || !item.title){
    return res.status(500).send({error: 'Invalid item'});
  }

  databaseService.createTodo(item, function(err, todo){
    // Show the item that was just inserted; contains the _id field
    // Note that it is an array containing a single object
    return res.send(todo);
  });
});

//UPDATE
app.put('/todo/:id', function(req, res){
  var item = req.body;

  if(!item || !item.id || !item.completed){
    return res.status(500).send({error: 'Invalid item'});
  }

  databaseService.updateTodo(item, function(err, todo){
    return res.send(todo);
  });
});

//DELETE
app.delete('/todo/:id', function (req, res){
  var itemId = req.params.id;

  databaseService.deleteTodo(itemId, function(err, callback){
    if(err){
      return res.status(500).send({error: err});
    }

    return res.send({result: 'success'});
  });
});

//START OUR SERVER NOW THAT EVERYTHING IS SETUP 
var server = app.listen(3001, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
