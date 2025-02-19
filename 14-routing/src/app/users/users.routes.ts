import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";

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
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
    }
]