import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  messages: Message[] = [];

  constructor(
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    this.subscription = this.messageService.messageListChangedEvent
      .subscribe(
        (messagesList: Message[]) => {
          this.messages = messagesList;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}


