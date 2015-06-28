var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var databaseService = require('./server/services/database.js');

app.set('view engine' , 'jade');
app.set('views', path.join(__dirname + '/server/views'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',function (req, res){
  databaseService.getTodos(function(err, todos){
    if(err){
      return res.status(500).send(err);
    }

    console.log(todos);
    return res.render('index', {todos: todos});
  });
});
 
app.post('/todo',function (req, res){
  console.log(req.body);
  var item = req.body;

  if(!item || !item.title){
    return res.status(500).send({error: 'Invalid item'});
  }

  databaseService.createTodo(item, function(err, todo){
    // Show the item that was just inserted; contains the _id field
    // Note that it is an array containing a single object

   return res.send({todo: todo});
  });
});

app.delete('/todo/:id', function (req, res){
  var itemId = req.params.id;

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
