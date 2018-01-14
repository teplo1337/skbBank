import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  @Input('title') title: string;
  task: Task;
  selectedTask: boolean;
  newTask: boolean;

  constructor(private taskService: TaskService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.activateRoute.snapshot.params['id']) {
      this.getTask(this.activateRoute.snapshot.params['id']);
    } else if (this.title) {
      this.getTask(this.title);
    } else {
      this.task = new Task;
      this.newTask = true;
    }
  }

  getTask (taskTitle) {
    this.taskService.getTask(taskTitle).subscribe(
      (result: Task) => {
        this.task = result as Task;
        console.log(this.task);
      },
      (error) => {
        this.task = error.response;
      }
    );
  }
}
