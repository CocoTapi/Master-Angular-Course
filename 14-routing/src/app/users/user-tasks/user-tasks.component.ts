import { Component, input, inject, computed, OnInit, DestroyRef } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // userId = input.required<string>();
  message = input.required<string>()
  userName = input.required<string>();
  
  // private activatedRoute = inject(ActivatedRoute);




  // private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
 

  // userName = computed(() => 
  //   this.usersService.users.find(u => u.id === this.userId())?.name
  // );

  // userName = '';

  // if you don't use resolve function at router, you can get userName as below
  // ngOnInit(): void {
  //   console.log("Input Data:" + this.message())
  //   // snapshot is not observable. actual object
  //   // snapshot won't be re-executed. never change depending on dynamic path
  //   console.log(this.activatedRoute.snapshot);
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId'));

  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: paramMap => {
  //       this.userName = 
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || ''
  //     }
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  // use resolve and data at router, and get userName and message (you can do just using input() though)
  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     }
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName
 = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))
  ?.name || '';
 return userName;    
}
