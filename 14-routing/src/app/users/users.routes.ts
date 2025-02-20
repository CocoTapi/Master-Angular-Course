import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";

export const routes: Routes = [
     {
        // need to set this empty path to redirect user to "tasks"
        path: '',
        redirectTo: 'tasks',
        // prefix: matches when the belonging of the URL matches the route's path. commonly used for nested routes
        // full: matches only if the entire URL matches the route's path exactly. Typically used for default or root routes
        pathMatch: 'prefix'
    },
    {
        path: 'tasks', //<your-domain>/users/<user-id>/tasks,
        component: TasksComponent,
        // to check the params change and reload as needed
        runGuardsAndResolvers: 'always',
        resolve: {
            userTasks: resolveUserTasks
        }
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
    }
]