// const sassLoader = require('./styles.scss')
const $ = require('jQuery')
const Task = require('../script.js')
const ToDo = require('../script.js')

let newAlert = require('./alert'); newAlert();

// $('.save').onClick(){
//   renderTasksToHtml()
// }
$('.save').click(function(){
  alert('It works')
}
