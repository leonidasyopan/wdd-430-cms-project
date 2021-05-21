import { EventEmitter, Injectable } from '@angular/core';

import { Message } from './message.model';

import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message [] =[];

  // messageSelectedEvent = new EventEmitter<Message>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    let result: Message;

    this.messages.forEach(message => {
      if(message.id === id) {
        result = message;
      }
    })

    return result ? result : null;
  }
}

