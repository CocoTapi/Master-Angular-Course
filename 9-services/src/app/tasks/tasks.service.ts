import { Injectable, signal, inject } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  // no-signal version: 
  // private tasks: Task[] = [];

  private loggingService = inject(LoggingService);

  // to manage data only here so make read only tasks
  allTasks = this.tasks.asReadonly();

  //no-signal version: 
    // when you use this, allTasks without ()
  // get allTasks() {
  //   return [...this.tasks]
  // }

  addTask(taskData: { title: string, description: string }) {
    const newTask = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN' as TaskStatus
    };

    // not mutate the data. instead create new data
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);

    // no-signal version: 
    // this.tasks = [...this.tasks, newTask];

    this.loggingService.log("Add Task with title:" + taskData.title);
  }

  updateTasksStatus(taskId: string, newStatus: TaskStatus){
    this.tasks.update((oldTasks) => 
      oldTasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task 
      )
    );

    // no-signal version: 
    // this.tasks = this.tasks.map((task) => 
    //   task.id === taskId ? {...task, status: newStatus } : task
    // );

    this.loggingService.log('Change task status to' + newStatus);
  }

}
