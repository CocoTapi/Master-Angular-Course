import { Component, input, inject, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  // messages = input.required<string[]>();
  private messagesService = inject(MessagesService);
  messages = this.messagesService.allMessages;

  // get messages() {
  //   return this.messagesService.allMessages
  // }

  // use this when you use rxjs messages$
  // messages: string[] = [];
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);
  // ngOnInit(): void {
  //   const subscription = this.messagesService.messages$.subscribe((messagesData) => {
  //     this.messages = messagesData
  //     this.cdRef.markForCheck();
  //   });
  //   // cleanup subscription
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   })
  // }

  // another way of detecting message change using AsyncPipe
  // messages$ = this.messagesService.messages$;

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
