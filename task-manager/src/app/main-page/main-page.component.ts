import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']

})
export class MainPageComponent implements OnInit {
  tasks: Task [];
  newTask: boolean;
  selectedTask: Task;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.selectedTask = undefined;
    this.newTask = false;
    this.taskService.getAllTasks().subscribe(
      (result: Task []) => {
        this.tasks = result.sort((a, b) => {
          return a.position - b.position;
        });
      },
      (error) => {
        this.tasks = error.response;
      }
    );
  }

  selectTask (task: Task) {
    this.newTask = undefined;
    if (task === this.selectedTask) {
      this.selectedTask = undefined;
    } else {
      this.selectedTask = task;
    }
  }
  createNewTask() {
    this.selectedTask = undefined;
    this.newTask = !this.newTask;
  }

  checkTermWarning(task: Task) {
    const now: Date = new Date();
    const taskTime: Date = new Date(task.term);
    const a: number = now.getTime();
    const b: number = taskTime.getTime();

    return (b - a <= 259200000) ? true : false;
  }

  checkTermRed(task: Task) {
    const now: Date = new Date();
    const taskTime: Date = new Date(task.term);
    const a: number = now.getTime();
    const b: number = taskTime.getTime();

    return (b - a < 0) ? true : false;
  }

/* requests */

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id).subscribe(
      (res) => {
        this.getTasks();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modifyTask(task: Task) {
    this.taskService.modifyTask(task).subscribe(
      (res) => {
        this.getTasks();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createTask(task: Task) {
    this.taskService.newTask(task).subscribe(
      (res) => {
        this.getTasks();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
