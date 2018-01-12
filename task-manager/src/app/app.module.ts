import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import { MainPageComponent } from './main-page/main-page.component';
import { TaskPageComponent } from './task-page/task-page.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'task', component: TaskPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TaskPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
