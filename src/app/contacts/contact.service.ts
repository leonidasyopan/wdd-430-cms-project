import { Injectable } from '@angular/core';

import { Contact } from './contact.model';

import {MOCKCONTACTS} from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact [] =[];

  constructor() {
    this.contacts = MOCKCONTACTS;
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
}
