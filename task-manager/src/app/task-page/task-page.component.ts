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
  @Input('task') task: Task;

  @Output() create = new EventEmitter<Task>();
  @Output() modify = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  selectedTask: boolean;
  newTask: boolean;
  isLink: boolean;

  constructor(private taskService: TaskService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.activateRoute.snapshot.params['id']) {
      this.getTask(this.activateRoute.snapshot.params['id']);
      this.isLink = true;
    } else if (!this.task) {
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

  editTask () {
    this.inputs.toArray().forEach((input) => {
      input.nativeElement.disabled = false;
    });
    this.text.nativeElement.disabled = false;
  }

  /* requests */

  deleteTask() {

    /* if we use link */

    if (!this.isLink) {
      this.delete.emit(this.task);
    } else {
      this.taskService.deleteTask(this.task._id).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  modifyTask(taskForm) {
    this.task.description = this.text.nativeElement.value;
    this.task.oldTitle = this.task.title;
    this.task.title = taskForm.value.title;
    this.task.position = taskForm.value.pos;
    this.task.term = taskForm.value.date;

    /* if we use link */

    if (!this.isLink) {
      this.modify.emit(this.task);
    } else {
      this.taskService.modifyTask(this.task).subscribe(
        (res) => {

        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getTask (taskId: string) {

    /* if we use link */

    this.taskService.getTask(taskId).subscribe(
      (result: Task) => {
        this.task = result as Task;
      },
      (error) => {
        this.task = error.response;
      }
    );
  }

  createTask(taskForm) {
    this.task.description = this.text.nativeElement.value;
    this.task.title = (taskForm.value.title) ? taskForm.value.title : 'unnamed';
    this.task.position = (taskForm.value.pos) ? taskForm.value.pos : 0;
    this.task.term = (taskForm.value.date) ? taskForm.value.date : new Date().toISOString().split('.')[0].slice(0, -3);
    this.create.emit(this.task);
  }
}
