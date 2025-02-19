import { Component, input, inject, computed, OnInit, DestroyRef, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent  {
  userId = input.required<string>();
  userTasks = input.required<Task[]>();
  order = input<'asc' | 'desc' | undefined>();

  // order = input<'asc' | 'desc'>();
  // order = signal<'asc' | 'desc'>('desc');

  // private tasksService = inject(TasksService);
  // userTasks = computed(() => 
  //   this.tasksService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId())
  //     .sort((a, b) => {
  //       if (this.order() === 'desc'){
  //         return a.id > b.id ? -1 : 1;
  //       } else {
  //         return a.id > b.id ? 1 : -1;
  //       }
  //     }) 
  // );

  // private activateRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // ngOnInit(): void {
  //   const subscription = this.activateRoute.queryParams.subscribe({
  //     next: (params) => this.order.set(params['order']),
  //   })

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activateRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const order = activateRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter((task) => 
      task.userId === activateRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  // console.log(tasks)

  return tasks.length ? tasks : [];
}
