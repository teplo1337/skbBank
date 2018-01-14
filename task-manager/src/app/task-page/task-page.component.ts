import { Component, Input, EventEmitter, Output, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  @ViewChildren('input') inputs;
  @ViewChild('textarea') text;
  @Input('id') id: string;

  @Output() create = new EventEmitter<Task>();
  @Output() modify = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  task: Task;
  selectedTask: boolean;
  newTask: boolean;


  constructor(private taskService: TaskService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.activateRoute.snapshot.params['id']) {
      this.getTask(this.activateRoute.snapshot.params['id']);

    } else if (this.id) {
      this.getTask(this.id);

    } else {
      this.newTask = true;

      this.task = new Task;
      this.task.title = 'new title';
      this.task.position = 0;

      setTimeout(() => {
        this.editTask();
      }, 0);
    }
  }

  /* controls */

  getTask (taskId) {
    this.taskService.getTask(taskId).subscribe(
      (result: Task) => {
        this.task = result as Task;
      },
      (error) => {
        this.task = error.response;
      }
    );
  }

  editTask () {
    this.inputs.toArray().forEach((input) => {
      input.nativeElement.disabled = false;
    });
    this.text.nativeElement.disabled = false;
  }

  /* requests */

  deleteTask(taskForm) {
    this.delete.emit(this.task);
  }

  modifyTask(taskForm) {
    this.task.description = this.text.nativeElement.value;
    this.task.oldTitle = this.task.title;
    this.task.title = taskForm.value.title;
    this.task.position = taskForm.value.pos;
    this.task.term = taskForm.value.date;

    this.modify.emit(this.task);
  }

  createTask(taskForm) {
    this.task.description = this.text.nativeElement.value;
    this.task.title = (taskForm.value.title) ? taskForm.value.title : 'unnamed';
    this.task.position = (taskForm.value.pos) ? taskForm.value.pos : 3;
    this.task.term = (taskForm.value.date) ? taskForm.value.date : new Date().toISOString().split('.')[0].slice(0, -3);
    this.create.emit(this.task);
  }
}
