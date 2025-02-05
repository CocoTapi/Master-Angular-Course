import { Component, EventEmitter, Input, Output, computed, input, output} from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { type User } from './user.model';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  @Input({ required: true}) selected!: boolean;
  
  @Output() select = new EventEmitter<string>();

  get imagePath()   {
    return 'assets/users/' + this.user.avatar;
  };

  onSelectUser(){
    this.select.emit(this.user.id);
  }       

  /*
  // - using signal
  id = input.required<string>();
  avatar = input.required<string>();
  name = input.required<string>();
  select = output<string>();

  imagePath = computed(() => {
    return 'assets/users/' + this.avatar();
  })

  onSelectUser() {
    this.select.emit(this.id);
  }
  */



  /*
  - traditional way
  selectedUser = DUMMY_USERS[randomIndex];

  get imagePath(){
    return 'assets/users/' + this.selectedUser.avatar;
  }

  onSelectUser(){
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser = DUMMY_USERS[randomIndex];
  }
  */

  /*
  - using signal 
  - add soft brackets () for each variable in html

  selectedUser = signal(DUMMY_USERS[randomIndex]);

  imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar)

  onSelectUser(){
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser.set(DUMMY_USERS[randomIndex]);
    // this.selectedUser = DUMMY_USERS[randomIndex];
  }
  */

}
