var $ = require ('jquery');

function ToDo (title, body, id, completed, importance){
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.completed = completed || false;
  this.importance = importance || 'normal';
}



module.exports = ToDo;
