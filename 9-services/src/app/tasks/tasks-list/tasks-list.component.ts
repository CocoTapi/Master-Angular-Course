import { Component, signal, inject, computed } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionProvider]
})
export class TasksListComponent {
  // you can use constructor to inject tasksService but this is alternative way.
  private tasksService = inject(TasksService);
  private selectedFilter = signal<string>('all');

  // no-signal version: 
  // private selectedFilter: string = 'all';

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  // computed is a feature related to signal.
  // this will return a new signal, which depends on other signals and which will be recomputed whenever any of dependent signals change
  tasks = computed(() => {
    switch(this.selectedFilter()){
      case 'open':
        return this.tasksService
          .allTasks()
          .filter(task => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter(task => task.status === 'DONE');
      default:
        return this.tasksService.allTasks(); 
    }
  })

  // no-signal version: 
  // get tasks() {
  //   switch(this.selectedFilter){
  //     case 'open':
  //       return this.tasksService
  //         .allTasks
  //         .filter(task => task.status === 'OPEN');
  //     case 'in-progress':
  //       return this.tasksService
  //         .allTasks
  //         .filter(task => task.status === 'IN_PROGRESS');
  //     case 'done':
  //       return this.tasksService
  //         .allTasks
  //         .filter(task => task.status === 'DONE');
  //     default:
  //       return this.tasksService.allTasks; 
  //   }
  // }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  // no-signal version: 
  // onChangeTasksFilter(filter: string) {
  //   this.selectedFilter = filter;
  // }
}
