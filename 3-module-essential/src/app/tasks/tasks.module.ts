import { NgModule } from "@angular/core";
import { TasksComponent } from "./tasks.component";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [TasksComponent, TaskComponent, NewTaskComponent],
    //add components that is used in different components
    exports: [TasksComponent],
    // if you want to access card component, need SharedModule
    //if you want to access date type, need CommonModule
    imports: [SharedModule, CommonModule, FormsModule]
})

export class TasksModule {}