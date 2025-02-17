import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private placesService = inject(PlacesService);

  // constructor(private httpClient: HttpClient){}

  private destroyRef = inject(DestroyRef);

 ngOnInit(): void {
  this.isFetching.set(true);

  const subscription = this.placesService.loadAvailablePlaces()
    .subscribe({
      // next: (resData) => {
      //   console.log(resData.places);
      // }
      next: (places: Place[]) => {
        console.log();
        this.places.set(places);
      },
      error: (err: Error) => {
        // console.log(err)
        this.error.set(err.message)
        // this.error.set('Something went wrong fetching the available places. Please try again later.');
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

  // you have to subscribe to trigger get request
  // const subscription = this.httpClient
  //   .get<{ places: Place[] }>('http://localhost:3000/places')
  //   .pipe(
  //     // no need to use this though
  //     // convert the object with an array to just array
  //     map((resData) => resData.places), 
  //     catchError((error) => {
  //       console.log(error);
  //       // generate a new observable which automatically throw an error 
  //       return throwError(
  //         () => 
  //           new Error(
  //             'Something went wrong fetching the available places. Please try again later.'
  //           )
  //       )
  //     })
  //   )
  //   .subscribe({
  //     // next: (resData) => {
  //     //   console.log(resData.places);
  //     // }
  //     next: (places) => {
  //       console.log();
  //       this.places.set(places);
  //     },
  //     error: (err: Error) => {
  //       // console.log(err)
  //       this.error.set(err.message)
  //       // this.error.set('Something went wrong fetching the available places. Please try again later.');
  //     },
  //     complete: () => {
  //       this.isFetching.set(false);
  //     }
  //  });

  // you need subscribe 
  //  const subscription = this.httpClient
  //   .get<{ places: Place[] }>('http://localhost:3000/places', {
  //     // if you set this, Angular will trigger this next function with full response object, not with the response data 
  //     observe: 'response',
  //     // if you set to 'event', trigger multiple times 
  //     // observe: 'event'
  //   })
  //   .subscribe({
  //     next: (response) => {
  //       console.log(response.body?.places);
  //       this.places.set(response.body?.places);
  //     }
  //  });

   this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
   })
 }

 onSelectPlace(selectedPlace: Place) {
  const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
    .subscribe({
        next: (resData) => console.log(resData),
    });

  this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
    })
 }
}
