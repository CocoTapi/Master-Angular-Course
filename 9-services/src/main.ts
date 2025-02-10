import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
// import { TasksService } from './app/tasks/tasks.service';
// import { InjectionToken } from '@angular/core';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

// if you don't have @Injectable in tasks service, you can inject here
// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));

// when you want to make a custom injector token and use it

// 'tasks-service-token' : a description which is used for debugging purposes. you can choose the name
// const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token')

// bootstrapApplication(AppComponent, {
//     providers: [{ provide: TasksServiceToken, useClass: TasksService}] 
// }).catch((err) => console.error(err));

// when you want to use tasksService in a component, you need to inject TasksServiceToken instead of TasksService
// e.g) tasksService = inject(TasksServiceToken)
// e.g) constructor(@Inject(TasksServiceToken private tasksService: TasksService)){}



