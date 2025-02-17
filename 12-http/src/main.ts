import { bootstrapApplication } from '@angular/platform-browser';
import { tap } from 'rxjs';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

// for modern, function is recommended
function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    // const req = request.clone({
    //     // you could manipulate header
    //     headers: request.headers.set('X-DEBUG', 'TESTING')
    // })
    console.log('[Outgoing Request]');

    console.log(request);
    // you can pipe and tap
    // cannot subscribe because that would be end of this observable chain
    return next(request).pipe(
        tap({
            next: event => {
                if (event.type === HttpEventType.Response) {
                    console.log('[Incoming Response');
                    console.log(event.status);
                    console.log(event.body);
                }
            }
        })
    )
   
    // return next(request);
    // return next(req);
}

bootstrapApplication(AppComponent, {
    // interceptors will be executed when a request is about to sent or a response arrived
    providers: [provideHttpClient(
        withInterceptors([loggingInterceptor])
    )]
}).catch((err) => console.error(err));
