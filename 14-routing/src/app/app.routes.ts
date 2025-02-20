import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 1) {
        return true;
    }

    return new RedirectCommand(router.parseUrl('/unauthorized'))
}

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: 'users/:userId', //<your-domain>/users/<user-id>
        component: UserTasksComponent,
        children: userRoutes,
        // check if the user can access this page or not 
        canMatch: [dummyCanMatch],
        data: {
            message: 'Hello!'
        },
        resolve: {
            userName: resolveUserName    
        },
        title: resolveTitle
    }, 
    {
        // no other path matches the path
        path: '**',
        component: NotFoundComponent
    }
]