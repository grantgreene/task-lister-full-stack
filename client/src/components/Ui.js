import TasksApi from '../services/TasksApi';

class Ui {
  static buildTaskHtml(taskToBuild) {
    const div = document.createElement('div');
    div.classList = 'task-card';
    for (const property in taskToBuild) {
      if (property === '_id') {
        div.dataset.id = taskToBuild[property];
      } else if (property === 'date') {
        const dateP = document.createElement('p');
        dateP.classList = 'task-card__date';
        const date = new Date(taskToBuild[property]).toLocaleDateString('en-Us', { timeZone: 'UTC' });
        dateP.textContent = `${date}`;
        if (new Date(date) < new Date()) dateP.classList.add('past-due');
        div.appendChild(dateP);
      } else if (property === 'delete') {
        const deleteSpan = document.createElement('span');
        deleteSpan.classList = 'task-card__delete';
        const deleteI = document.createElement('i');
        deleteI.classList = 'fa-solid fa-trash-can';
        deleteSpan.appendChild(deleteI);
        div.appendChild(deleteSpan);
      } else if (property === 'name') {
        const nameH1 = document.createElement('h1');
        nameH1.classList = 'task-card__name';
        nameH1.textContent = `${taskToBuild[property]}`;
        div.appendChild(nameH1);
      } else if (property === 'status') {
        const statusP = document.createElement('p');
        statusP.classList = 'task-card__status';
        const statusSpan = document.createElement('span');
        statusSpan.textContent = 'Status: ';
        const statusText = document.createTextNode(`${taskToBuild[property]} `);
        const statusI = document.createElement('i');
        statusI.classList = 'fa-solid fa-caret-down';
        statusP.appendChild(statusSpan);
        statusP.appendChild(statusText);
        statusP.appendChild(statusI);
        div.appendChild(statusP);
      }
    }
    return div;
  }

  static addTasksToUi(passedTasks) {
    let tasks;
    document.querySelector('.tasks').innerHTML = '';
    (async () => {
      if (passedTasks) {
        tasks = passedTasks;
      } else {
        const res = await TasksApi.getTasks();
        tasks = await res.data;
      }
      if (tasks.length === 0) {
        document.querySelector('.no-tasks').classList.add('show');
      } else {
        document.querySelector('.no-tasks').classList.remove('show');
        tasks.forEach(task => {
          const buildTask = this.buildTaskHtml(task);
          document.querySelector('.tasks').appendChild(buildTask);
        });
      }
      document.querySelector('.filter-category').value = 'show all';
    })();
  }
}

export default Ui;
