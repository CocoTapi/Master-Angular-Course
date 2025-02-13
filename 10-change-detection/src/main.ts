import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
    // add this if you want to remove zone.js
    providers: [provideExperimentalZonelessChangeDetection()],
}).catch((err) => console.error(err));
