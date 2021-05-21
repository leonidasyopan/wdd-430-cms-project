import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = '5'

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

  onSendMessage() {
    const messageSubject = this.subjectRef.nativeElement.value;
    const messageText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(
      6 + this.generateRandomNumber(),
      messageSubject,
      messageText,
      this.currentSender
    );

    // this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);
  }

  generateRandomNumber() {
    return Math.random().toString();
  }

}
