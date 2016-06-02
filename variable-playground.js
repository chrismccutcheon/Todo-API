var person = {
  name: 'Chris',
  age: 23
}

function updatePerson(person){
  person.age = 24;
  return person;
}
updatePerson(person);
console.log(person);

var hi = 8;
function isNine(num){
  num = 9;
}
isNine(hi);
console.log(hi);
