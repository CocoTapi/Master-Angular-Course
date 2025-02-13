import { ChangeDetectionStrategy, Component, output, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent {
  private messageService = inject(MessagesService)
  add = output<string>();
  enteredText = signal('');
  // enteredText = '';

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    // this.add.emit(this.enteredText());
    this.messageService.addMessage(this.enteredText());
    this.enteredText.set('');
    // this.messageService.addMessage(this.enteredText);
    // this.enteredText = '';
  }
}
