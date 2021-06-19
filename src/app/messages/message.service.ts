import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseURL: string = 'https://yopan-wdd-430-default-rtdb.firebaseio.com/';

  messages: Message [] =[];

  messageListChangedEvent = new Subject<Message[]>();

  messageChangedEvent = new EventEmitter<Message []>();

  maxMessageId: number;

  constructor(private http: HttpClient) {
    http.get<Message []>(this.baseURL + 'messages.json')
    .subscribe(messages => {
      this.setMessages(messages);

      this.maxMessageId = this.getMaxId();

      const messagesListClone: Message[] = this.messages.slice();

      this.messageListChangedEvent.next(messagesListClone);
    }, (error: any) => {
      console.error(error);
    })
  }

  setMessages(messages: Message []) {
    this.messages = messages;
  }

  getMaxId(): number {

    let maxId: number = 0

    this.messages.forEach((message) => {
      let currentId: number = Number(message.id);

      if(currentId > maxId) {
        maxId = currentId
      }
    })

    return maxId
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

  addMessage(message: Message) {
    this.messages.push(message);

    this.storeMessages()
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);

    const headers= new HttpHeaders()
      .set('content-type', 'application/json')

    this.http.post(
      this.baseURL + 'messages.json',
      messagesString,
      { 'headers': headers }
    ).subscribe(response => {
      console.log(response);
      const messagesListClone: Message[] = this.messages.slice();

      this.messageListChangedEvent.next(messagesListClone);
    })
  }
}

