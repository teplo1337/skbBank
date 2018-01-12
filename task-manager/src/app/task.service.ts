import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {

  getTask() {
    return this.http.get('/task');
  }

  getAllTasks() {
    return this.http.get('/task');
  }

  newTask(data) {
    return this.http.post('/task', data);
  }

  modifyTask(data) {
    return this.http.put('/task', data);
  }

  deleteTask(task) {
    return this.http.delete('/task/' + task);
  }


  constructor(private http: HttpClient) { }

}
