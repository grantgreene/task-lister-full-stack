class TasksApi {
  constructor() {
    this.Api = '/tasks';
  }

  async getTasks() {
    const res = await fetch(this.Api);
    const data = await res.json();
    return data;
  }

  async addTask(data) {
    await fetch(this.Api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async editTask(id, data) {
    await fetch(`${this.Api}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async deleteTask(id) {
    await fetch(`${this.Api}/${id}`, {
      method: 'DELETE'
    });
  }
}

export default new TasksApi();
