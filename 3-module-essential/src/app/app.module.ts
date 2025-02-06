import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { SharedModule } from "./shared/shared.module";
import { TasksModule } from "./tasks/tasks.module";

@NgModule({
    // only non-standalone component here
    declarations: [
        AppComponent, 
        HeaderComponent, 
        UserComponent, 
    ],
    bootstrap: [AppComponent],
    // can put standalone component here
    imports: [BrowserModule, SharedModule, TasksModule]
})

export class AppModule {

}