import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseURL: string = 'http://localhost:3000/';

  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact [] =[];

  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor(private http: HttpClient) {
    http.get<Contact []>(this.baseURL + 'contacts')
    .subscribe(contacts => {
      this.setContacts(contacts);

      this.maxContactId = this.getMaxId();

      this.contacts.sort((a, b) => a.name > b.name ? 1 : 0);

      const contactsListClone: Contact[] = this.contacts.slice();

      this.contactListChangedEvent.next(contactsListClone);
    }, (error: any) => {
      console.error(error);
    })
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

  setContacts(contacts: Contact []) {
    this.contacts = contacts;
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

    this.storeContacts()
  }

  addContact(contact: Contact) {
    if (!contact) return;

    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);

          // const contactsListClone: Contact[] = this.contacts.slice();

          // this.contactListChangedEvent.next(contactsListClone);
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const position: number = this.contacts.indexOf(originalContact);

    if (position < 0) return;

    newContact.id = originalContact.id;

    this.contacts[position] = newContact;

    this.storeContacts()
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);

    const headers= new HttpHeaders()
      .set('content-type', 'application/json')

    this.http.put<Contact[]>(
      this.baseURL + 'contacts.json',
      contactsString,
      { 'headers': headers }
    ).subscribe(() => {
      const contactsListClone: Contact[] = this.contacts.slice();

      this.contactListChangedEvent.next(contactsListClone);
    })
  }
}
