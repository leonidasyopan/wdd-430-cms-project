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

    const position = this.contacts.findIndex(cont => cont.id === contact.id);

    if (position < 0) return;

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(position, 1);

          // const contactsListClone: Contact[] = this.contacts.slice();

          // this.contactListChangedEvent.next(contactsListClone);
        }
      );
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

    const position = this.contacts.findIndex(contact => contact.id === originalContact.id);

    if (position < 0) return;

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[position] = newContact;

          // const contactsListClone: Contact[] = this.contacts.slice();

          // this.contactListChangedEvent.next(contactsListClone);
        }
      );
  }

  // storeContacts() {
  //   const contactsString = JSON.stringify(this.contacts);

  //   const headers= new HttpHeaders()
  //     .set('content-type', 'application/json')

  //   this.http.put<Contact[]>(
  //     this.baseURL + 'contacts.json',
  //     contactsString,
  //     { 'headers': headers }
  //   ).subscribe(() => {
  //     const contactsListClone: Contact[] = this.contacts.slice();

  //     this.contactListChangedEvent.next(contactsListClone);
  //   })
  // }
}
