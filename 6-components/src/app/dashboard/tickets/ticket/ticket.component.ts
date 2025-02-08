import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../tiket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  // if you want to change name outside this component, you can add {alias: ...}. Not recommended.
  // data = input.required<Ticket>({alias: 'ticketData'});

  data = input.required<Ticket>();
  close = output();
  detailsVisible = signal(false);
  

  onToggledetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }

  onMarkAsCompleted(){
    this.close.emit();
  }
}
