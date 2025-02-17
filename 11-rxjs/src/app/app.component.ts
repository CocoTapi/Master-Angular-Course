import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);

  // $ is the sign of observable
  clickCount$ =  toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {
    initialValue: 0
  });

  // custom observable
  customInterval$ = new Observable((subscriber) => {
    // control when the next event happens 
    let timesExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error();
      if (timesExecuted > 5){
        clearInterval(interval);
        subscriber.complete();
        return;
      }

      console.log('Emitting new value...');
      subscriber.next({ message: 'New value' });

      timesExecuted++;
    }, 2000); 
  });

  private destroyRef = inject(DestroyRef);  

  constructor() {
    // re-execute this whenever signal is updated
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`)
    // })

    const subscription = this.clickCount$.subscribe({
      // control what is happen next
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`) 
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();   
    })
  }

  ngOnInit(): void {
    // interval function is for something you need to update every some seconds or time   
    // const subscription = interval(1000).subscribe({
    //   next: (val) => console.log(val)
    // });

    // const subscription = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val)
    // });


    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('COMPLETED!'),
      error: (err) => console.log(err)
    });
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`) 
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();   
    })
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
