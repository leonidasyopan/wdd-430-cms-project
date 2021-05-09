import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(
      '1',
      'Primeira Mensage',
      'Mensagem super importante número um',
      'Larissa Yopan'
    ),
    new Message(
      '2',
      'Segunda Mensage',
      'Mensagem quase tão importante quanto a número um',
      'Arthur Yopan'
    ),
    new Message(
      '3',
      'Terceira Mensage',
      'Mensagem bem mais importante que a anterior',
      'Julia Yopan'
    ),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
