const $ = require('jQuery')


// Todo object constructor
    // characterists of a task
    // todo list(s) are in an array may be called... like a todo book even all 'todo's
    //

function Task(title, body, id, completed, importance) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.completed = completed || false;
  this.importance = importance || "normal";

}

let ToDos = {
  allTodos: [],
  setter: function (newTask) {
    this.allTodos.push(newTask)
  },

  renderTasksToHtml: function(task){
  $('.task-list').prepend(`
    <article id="`+ task.id +`" class="a-task ` + task.completed + `">
      <h2 class="task-title" contenteditable="true">` + task.title + `</h2>
      <button class="remove-task" aria-label='Remove task' value="remove-button"></button>
      <h5 class="task-body" contenteditable="true">` + task.body + `</h5>
      <button class="upvote" aria-label='Increase task importance' value="upvote-button" alt="Button with arrow pointing upwards to tell user to increase importance"></button>
      <button class="downvote" aria-label='Decrease task importance' value="downvote-button"></button>
      <h6 class= "task-importance ` + task.importance +`" tabindex="0"><span>Importance:</span> <span class="displayed-importance" tabindex="0">` + task.importance + `</span> </h6>
      <button class="completed-button" aria-label='Mark task completed' value="completed-button"></button>
    </article>`);
},
}

module.exports = Task;
