var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var todoNextId = 1;

var todos = [];

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('Todo API root')
});

//Get /todos
app.get('/todos', function(req, res){
  res.json(todos);
});
//Get /todos/:id
app.get('/todos/:id', function(req, res){
  var id =  parseInt(req.params.id);
  var matched;
  todos.forEach(function(todo){
    if(todo.id === id){
      matched = todo;
    }
  });
  if(matched){
    res.send(matched);
  } else {
    res.status(404).send();
  }
});
//post
app.post('/todos', function(req, res){
  var body = req.body;
  console.log('Desc: ' + body.desc);
  body.id = todoNextId;
  ++todoNextId;
  todos.push(body);
  res.json(body);
});

app.listen(PORT, function(){
  console.log('Express listening on PORT: ' + PORT);
});
