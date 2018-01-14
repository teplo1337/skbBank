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
    this.taskService.getAllTasks().subscribe(
      (result: Task []) => {
        this.tasks = result;
      },
      (error) => {
        this.tasks = error.response;
      }
    );
  }

  selectTask (task: Task) {
    if (task === this.selectedTask) {
      this.selectedTask = undefined;
    } else {
      this.selectedTask = task;
    }
  }

  initializeNewTask () {
  }
}
