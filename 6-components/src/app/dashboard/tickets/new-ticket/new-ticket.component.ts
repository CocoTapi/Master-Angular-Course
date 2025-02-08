import { AfterContentInit, afterNextRender, afterRender, AfterViewInit, Component, ElementRef, EventEmitter, viewChild, ViewChild, output } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterContentInit {
    // @ViewChild('formData') form?: ElementRef<HTMLFormElement>;
    private form = viewChild.required<ElementRef<HTMLFormElement>>('formData');

    // two way binding
    enteredTitle = '';
    enteredText = '';

    // @Output() add = new EventEmitter<{title: string, text: string}>();
    add = output<{title: string, text: string}>();



  // OPTION 1

  // onSubmit(titleElement: HTMLInputElement) {
  //   const enteredTitle = titleElement.value;
  //   console.log(enteredTitle);
  //   // get object
  //   console.dir(enteredTitle)
  // }

  // OPTION 2
    // need to pass form with title and ticketText in html

  // onSubmit(title: string, ticketText: string, form: HTMLFormElement){
  //   console.log(title);
  //   console.log(ticketText);
  //   form.reset();
  // }

  // OPTION 3

  // if you want to access multiple elements, use "viewChildren" instead.

  constructor() {
    // wherever and whenever any change occurs in the entire Angular application , this executes
    afterRender(() => {
      console.log("afterRender!!!")
    });

    // after the next cange anywhere in the entire Angular application
    afterNextRender(() => {
      console.log("afterNextRender!!!")
    })
  }

  // you can access form here 
  // ngAfterViewInit(): void {
  //   console.log('After view init!');
  //   console.log(this.form().nativeElement);
  // }

  //also you can safely access the content here
  ngAfterContentInit(): void {
    console.log('After content init!');
    console.log(this.form().nativeElement);
  }


  // onSubmit(title: string, ticketText: string){
  //   this.add.emit({ title: title, text: ticketText });

  //   // this.form?.nativeElement.reset();
  //   this.form().nativeElement.reset();
  // }

  // two way binding
  onSubmit(){
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });

    this.enteredText = '';
    this.enteredTitle = '';
  }
}
