import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {

  getTask(task) {
    return this.http.get('/api/' + task);
  }

  getAllTasks() {
    return this.http.get('/api');
  }

  newTask(taskData) {
    return this.http.post('/api', taskData);
  }

  modifyTask(taskData) {
    return this.http.put('/api', taskData);
  }

  deleteTask(task) {
    return this.http.delete('/api/' + task);
  }


  constructor(private http: HttpClient) { }

}
