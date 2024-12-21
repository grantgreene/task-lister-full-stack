import TasksApi from '../services/TasksApi';
import Ui from './Ui';

class Tasklist {
  constructor() {
    this.taskBoard = document.querySelector('.tasks');
    this.editTaskId;
    this.eventListeners();
  }

  deleteTask(e) {
    if (e.target.classList.contains('fa-trash-can')) {
      const deleteId = e.target.parentElement.parentElement.dataset.id;
      (async () => {
        await TasksApi.deleteTask(deleteId);
        Ui.addTasksToUi();
      })();
    }
  }

  getTaskId(e) {
    if (e.target.classList.contains('task-card__status')) {
      this.editTaskId = e.target.parentElement.dataset.id;
      document.dispatchEvent(new Event('openOverlayEvent'));
    }
  }

  editTaskStatus(e) {
    let newStatus = e.target.textContent;
    (async () => {
      const res = await TasksApi.getTasks();
      const tasks = await res.data;
      const taskToEdit = tasks.filter(task => task._id === this.editTaskId)[0];
      taskToEdit.status = newStatus;
      await TasksApi.editTask(this.editTaskId, taskToEdit);
      Ui.addTasksToUi();
    })();
    document.dispatchEvent(new Event('closeOverlayEvent'));
  }

  eventListeners() {
    this.taskBoard.addEventListener('click', this.deleteTask.bind(this));
    this.taskBoard.addEventListener('click', this.getTaskId.bind(this));
    document.querySelectorAll('.update-status-box__option').forEach(option => {
      option.addEventListener('click', this.editTaskStatus.bind(this));
    });
  }
}

export default Tasklist;
