import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  // places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;


ngOnInit(): void {
  this.isFetching.set(true);
  
  // you have to subscribe to trigger get request
  const subscription = 
    this.placesService.loadUserPlaces().subscribe({
      // next: (places: Place[]) => {
      //   console.log();
      //   this.places.set(places);
      // },
      error: (err: Error) => {
        // console.log(err)
        this.error.set(err.message)
        // this.error.set('Something went wrong fetching the available places. Please try again later.');
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });
  
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      })
}
}
