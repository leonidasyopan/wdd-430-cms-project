import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';

interface Response {
  message: string,
  messages: Message []
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseURL: string = 'http://localhost:3000/';

  messages: Message [] =[];

  messageListChangedEvent = new Subject<Message[]>();

  messageChangedEvent = new EventEmitter<Message []>();


  constructor(private http: HttpClient) {
    http.get<Response>(this.baseURL + 'messages')
    .subscribe(response => {
      this.setMessages(response.messages);

      const messagesListClone: Message[] = this.messages.slice();

      this.messageListChangedEvent.next(messagesListClone);
    }, (error: any) => {
      console.error(error);
    })
  }

  setMessages(messages: Message []) {
    this.messages = messages;
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
    if (!message) return;

    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ msg: string, message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.message);

          this.refreshDocumentsListing();
        }
      );
  }

  refreshDocumentsListing() {
    const messagesListClone: Message[] = this.messages.slice();

    this.messageListChangedEvent.next(messagesListClone);
  }
}

