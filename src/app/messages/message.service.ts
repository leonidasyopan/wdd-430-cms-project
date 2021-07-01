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

  // maxMessageId: number;

  constructor(private http: HttpClient) {
    http.get<Response>(this.baseURL + 'messages')
    .subscribe(response => {
      this.setMessages(response.messages);

      // this.maxMessageId = this.getMaxId();

      const messagesListClone: Message[] = this.messages.slice();

      this.messageListChangedEvent.next(messagesListClone);
    }, (error: any) => {
      console.error(error);
    })
  }

  setMessages(messages: Message []) {
    this.messages = messages;
  }

  // getMaxId(): number {

  //   let maxId: number = 0

  //   this.messages.forEach((message) => {
  //     let currentId: number = Number(message.id);

  //     if(currentId > maxId) {
  //       maxId = currentId
  //     }
  //   })

  //   return maxId
  // }

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

    // add to database
    this.http.post<{ msg: string, message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.message);

          // const messagesListClone: Message[] = this.messages.slice();

          // this.messageListChangedEvent.next(messagesListClone);
        }
      );
  }

  // storeMessages() {
  //   const messagesString = JSON.stringify(this.messages);

  //   const headers= new HttpHeaders()
  //     .set('content-type', 'application/json')

  //   this.http.put<Message[]>(
  //     this.baseURL + 'messages.json',
  //     messagesString,
  //     { 'headers': headers }
  //   ).subscribe(() => {
  //     const messagesListClone: Message[] = this.messages.slice();

  //     this.messageListChangedEvent.next(messagesListClone);
  //   })
  // }
}

