var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id: 1,
  desc: 'Get haircut',
  completed: false
},{
  id: 2,
  desc: 'Get ready for Chico',
  completed: false
},{
  id: 3,
  desc: 'Drink Burr',
  completed: false
}];

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

app.listen(PORT, function(){
  console.log('Express listening on PORT: ' + PORT);
});
