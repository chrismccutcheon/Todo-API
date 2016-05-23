var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var PORT = process.env.PORT || 3000;
var todoNextId = 1;

var todos = [];

app.use(bodyParser.json());


app.get('/', function(req, res){
  res.send('Todo API root');
});

//Get /todos
app.get('/todos', function(req, res){
  var queryParams = req.query;
  var filteredTodos = todos;

  // if has prop && completed is true
  if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
    filteredTodos = _.where(filteredTodos, {completed: true});
  } else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
    filteredTodos = _.where(filteredTodos, {completed: false});
  }

  if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0){
    filteredTodos = _.filter(filteredTodos, function(todo){
      return todo.desc.toLowerCase().indexOf(queryParams.q) > -1;
    });
  }

  res.json(filteredTodos);
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
// DELETE /todos/:id

app.delete('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var matched = _.findWhere(todos, {id: todoId});
  if(!matched){
    res.send(404).json({"error": "no todo found"});
  } else {
    todos = _.without(todos, matched);
    res.json(matched);
  }
});

//PUT /todos/:id
app.put('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matched = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'desc', 'completed'); // this limits the fields to desc and completed
    var validAttibutes = {};

    if(!matched){
      return res.status(404).send();
    }
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
      validAttibutes.completed = body.completed;
    } else if(body.hasOwnProperty('completed')){
      return res.status(400).send();
    } else {
      // Never provided attribute no problem
    }
    if(body.hasOwnProperty('desc') && _.isString(body.desc) && body.desc.trim().length>0){
      validAttibutes.desc = body.desc.trim();
    } else if(body.hasOwnProperty('desc')){
      return res.status(400).send();
    } else {
      // Never provided attribute no problem
    }
    _.extend(matched, validAttibutes);
    res.json(matched);
});

app.listen(PORT, function(){
  console.log('Express listening on PORT: ' + PORT);
});
