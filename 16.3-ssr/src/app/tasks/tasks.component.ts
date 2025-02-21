import {
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, ResolveFn, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private paramMap = toSignal(this.activatedRoute.paramMap);
  // userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input<'asc' | 'desc' | undefined>();

  userTasks = computed(() => {
    const tasks = this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.paramMap()?.get('userId'));

    if (this.order() && this.order() === 'asc') {
      tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else {
      tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
    }

    return tasks.length ? tasks : [];
  });
}

// export const resolveUserTasks: ResolveFn<Task[]> = (
//   activatedRouteSnapshot,
//   routerState
// ) => {
//   const order = activatedRouteSnapshot.queryParams['order'];
//   const tasksService = inject(TasksService);
//   const tasks = tasksService
//     .allTasks()
//     .filter(
//       (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
//     );

//   if (order && order === 'asc') {
//     tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
//   } else {
//     tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
//   }

//   return tasks.length ? tasks : [];
// };
