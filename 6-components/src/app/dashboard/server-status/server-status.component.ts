import { Component, DestroyRef, OnDestroy, OnInit, inject, signal, effect } from '@angular/core';
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
  // currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');


  // Clean up option 1 - use ngOnDestroy
  // private interval?: NodeJS.Timeout;
  // private interval?: ReturnType<typeof setInterval>;

  // clean up option 2 - destroyRef
  private destroyRef = inject(DestroyRef);

  constructor() {
    // run code when signal value change
    // effect(() => {
    //   console.log(this.currentStatus());
    // })

    // cleanup before the effect function runs again
    effect((onCleanup) => {
      const timer = setTimeout(() => {
        console.log("current status is: " + this.currentStatus);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      })
    })
  }

  // initialize to set up the interval
  ngOnInit(){
    // this.interval = setInterval(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();

      // if (rnd < 0.5){
      //   this.currentStatus = 'offline'
      // } else if (rnd < 0.9){
      //   this.currentStatus = 'online'
      // } else {
      //   this.currentStatus = 'unknown'
      // }

      // when you use signal(), use "set"
      if (rnd < 0.5){
        this.currentStatus.set('offline');
      } else if (rnd < 0.9){
        this.currentStatus.set('online')
      } else {
        this.currentStatus.set('unknown');
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
       