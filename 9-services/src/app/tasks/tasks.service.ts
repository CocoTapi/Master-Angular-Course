import { Injectable, signal, inject } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);;
  private loggingService = inject(LoggingService);

  // to manage data only here so make read only tasks
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string, description: string }) {
    const newTask = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN' as TaskStatus
    };

    // not mutate the data. instead create new data
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }

  updateTasksStatus(taskId: string, newStatus: TaskStatus){
    this.tasks.update((oldTasks) => 
      oldTasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task 
      )
    );
    this.loggingService.log('Change task status to' + newStatus);
  }

}
