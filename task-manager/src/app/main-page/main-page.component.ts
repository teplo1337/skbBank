import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  tasks;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(
      (result) => {
        this.tasks = result;
        console.log(this.tasks)
      },
      (error) => {
        this.tasks = error.response;
      }
    );
  }
}
