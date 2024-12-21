const Task = require('../models/Tasks');

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  try {
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Something went wrong' });
  }
};

const postTasks = async (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    date: req.body.date,
    status: 'To-Do',
    delete: false
  });
  try {
    await newTask.save();
    res.json({ success: true, data: newTask });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Something went wrong' });
  }
};

const editTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { status: req.body.status });
    const updatedTask = await Task.findById(req.params.id);
    res.json({ success: true, data: updatedTask });
  } catch (err) {
    res.status(404).json({ success: false, msg: "Couldn't find that task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    const tasks = await Task.find();
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(404).json({ success: false, msg: "Couldn't find that task" });
  }
};

module.exports = {
  getTasks,
  postTasks,
  editTask,
  deleteTask
};
