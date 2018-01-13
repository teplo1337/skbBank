import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  task: Task;

  constructor(private taskService: TaskService, private activateRoute: ActivatedRoute) { 

  }

  ngOnInit() {
    this.taskService.getTask(this.activateRoute.snapshot.params['id']).subscribe(
      (result: Task) => {
        this.task = result as Task;
        console.log(this.task)
      },
      (error) => {
        this.task = error.response;
      }
    );
  }
}
