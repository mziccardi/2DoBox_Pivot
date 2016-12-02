const Todo = require ('./todo');
const $ = require ('jquery');

let AllToDos = {
  toDoArray : [],

  pushToArray: function(newToDo){
    this.toDoArray.push(newToDo);
  },
  store: function(){
    localStorage.setItems('toDoArray', JSON.stringify(toDoArray));
  },
};



module.exports = taskArray;
