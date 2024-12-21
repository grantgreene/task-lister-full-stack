const express = require('express');
const router = express.Router();
const { postTasks, getTasks, editTask, deleteTask } = require('../controllers/taskController');

router.route('/').get(getTasks).post(postTasks);
router.route('/:id').put(editTask).delete(deleteTask);

module.exports = router;
