import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/users.routes";

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent,
    },
    {
        path: 'users/:userId', //<your-domain>/users/<user-id>
        component: UserTasksComponent,
        children: userRoutes,
    }, 
    {
        // no other path matches the path
        path: '**',
        component: NotFoundComponent
    }
]