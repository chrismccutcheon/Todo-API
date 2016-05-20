var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
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
  var todoId =  parseInt(req.params.id);
  var matched;
  matched = _.findWhere(todos, {id: todoId}); // this function searches the array for an object that matches the description object

  if(matched){
    res.send(matched);
  } else {
    res.status(404).send();
  }
});
//post
app.post('/todos', function(req, res){
  var body = _.pick(req.body, 'desc', 'completed'); // this limits the fields to desc and completed

  if(!_.isBoolean(body.completed) || !_.isString(body.desc) || body.desc.trim().length === 0){ // runs if body.competed is not a boolean or body.desc not a string
    return res.status(400).send();
  }
  body.desc = body.desc.trim(); // take whitespace off of desc
  console.log('Desc: ' + body.desc);
  body.id = todoNextId;
  ++todoNextId;
  todos.push(body);
  res.json(body);
});

app.listen(PORT, function(){
  console.log('Express listening on PORT: ' + PORT);
});
