import TasksApi from '../services/TasksApi';
import Ui from './Ui';

class Header {
  constructor() {
    this.addNewMobileBtn = document.querySelector('.top-pane__btn');
    this.addTaskPane = document.querySelector('.add-task-pane');
    this.addNewTaskBtn = document.querySelector('.add-task-pane__btn');
    this.addTaskNameInput = document.querySelector('.add-task-pane__name-input');
    this.addTaskDateInput = document.querySelector('.add-task-pane__date-input');
    this.alertNotification = document.querySelector('.alert');
    this.addEventListeners();
  }

  toggleMobileDropdown() {
    this.addTaskPane.classList.toggle('open');
    this.addTaskPane.classList.contains('open') ? (this.addNewMobileBtn.textContent = 'x') && (this.addNewMobileBtn.style.backgroundColor = 'var(--c-red)') : (this.addNewMobileBtn.textContent = '+') && (this.addNewMobileBtn.style.backgroundColor = 'var(--c-green');
  }

  showAlert(alertText) {
    this.alertNotification.classList.add('show');
    this.alertNotification.children[0].textContent = `${alertText}`;
    setTimeout(() => {
      this.alertNotification.classList.remove('show');
    }, 3000);
  }

  addNewTask() {
    let name = this.addTaskNameInput.value;
    let date = this.addTaskDateInput.value;
    let taskId;
    let tasks;
    if (name === '' && date === '') {
      this.showAlert('Please enter a task name and task date');
      return;
    } else if (name === '') {
      this.showAlert('Please enter a task name');
      return;
    } else if (date === '') {
      this.showAlert('Please enter a task date');
      return;
    }
    (async () => {
      const res = await TasksApi.getTasks();
      let tasks = res.data;
      const newTask = { date, name, status: 'To-Do', delete: false };
      tasks.push(newTask);
      await TasksApi.addTask(newTask);
      Ui.addTasksToUi();
      this.addTaskNameInput.value = '';
      this.addTaskDateInput.value = '';
      this.toggleMobileDropdown();
    })();
  }

  addEventListeners() {
    this.addNewMobileBtn.addEventListener('click', this.toggleMobileDropdown.bind(this));
    this.addNewTaskBtn.addEventListener('click', this.addNewTask.bind(this));
  }
}

export default Header;
