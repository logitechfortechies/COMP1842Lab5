'use strict';
module.exports = function(app) {
  const todoList = require('../controllers/todoListController');

  // Routes for standard list and creation
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  // Routes requiring a specific Task ID
  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};