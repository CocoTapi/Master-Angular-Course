import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})

// if you want to use ngOnInit(), add "implements OnInit"
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  // Clean up option 1 - use ngOnDestroy
  // private interval?: NodeJS.Timeout;
  // private interval?: ReturnType<typeof setInterval>;

  // clean up option 2 - destroyRef
  private destroyRef = inject(DestroyRef);

  constructor() {}

  // initialize to set up the interval
  ngOnInit(){
    // this.interval = setInterval(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5){
        this.currentStatus = 'offline'
      } else if (rnd < 0.9){
        this.currentStatus = 'online'
      } else {
        this.currentStatus = 'unknown'
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  };

  ngOnAfterViewInit(){
    console.log("After view init")
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.interval);
  // }
}
       