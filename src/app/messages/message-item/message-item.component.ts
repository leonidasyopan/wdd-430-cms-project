import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  // @Output() messageSelected = new EventEmitter<void>();

  messageSender: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
