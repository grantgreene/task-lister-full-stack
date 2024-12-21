const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please enter a task date']
  },
  name: {
    type: String,
    required: [true, 'Please enter a task name']
  },
  status: {
    type: String
  },
  delete: {
    type: String
  }
});

module.exports = mongoose.model('Task', TaskSchema);
