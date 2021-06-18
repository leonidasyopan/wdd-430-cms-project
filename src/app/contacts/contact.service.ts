import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';

import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact [] =[];

  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getMaxId(): number {

    let maxId: number = 0

    this.contacts.forEach((contact) => {
      let currentId: number = Number(contact.id);

      if(currentId > maxId) {
        maxId = currentId
      }
    })

    return maxId
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    let result: Contact;

    this.contacts.forEach(contact => {
      if(contact.id === id) {
        result = contact;
      }
    })

    return result ? result : null;
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    const position: number = this.contacts.indexOf(contact);

    if (position < 0) return;

    this.contacts.splice(position, 1);

    const contactsListClone: Contact[] = this.contacts.slice();

    this.contactListChangedEvent.next(contactsListClone);
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;

    newContact.id = this.maxContactId.toString();

    this.contacts.push(newContact);

    const contactsListClone: Contact[] = this.contacts.slice();

    this.contactListChangedEvent.next(contactsListClone);
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const position: number = this.contacts.indexOf(originalContact);

    if (position < 0) return;

    newContact.id = originalContact.id;

    this.contacts[position] = newContact;

    const contactsListClone: Contact[] = this.contacts.slice();

    this.contactListChangedEvent.next(contactsListClone)
  }
}
