'use strict';
const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

exports.list_all_tasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create_a_task = async (req, res) => {
  try {
    const new_task = new Task(req.body);
    const task = await new_task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.read_a_task = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.update_a_task = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId },
      req.body,
      { new: true } // Returns the updated document
    );
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.delete_a_task = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.taskId });
    res.json({ message: 'Task successfully deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};