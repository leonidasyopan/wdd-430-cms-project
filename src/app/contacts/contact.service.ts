import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';

interface Response {
  message: string,
  contacts: Contact []
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseURL: string = 'http://localhost:3000/';

  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact [] =[];

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor(private http: HttpClient) {
    http.get<Response>(this.baseURL + 'contacts')
    .subscribe(response => {
      this.setContacts(response.contacts);

      localStorage.setItem('contacts', JSON.stringify(response.contacts));

      this.contacts.sort((a, b) => a.name > b.name ? 1 : 0);

      const contactsListClone: Contact[] = this.contacts.slice();

      this.contactListChangedEvent.next(contactsListClone);
    }, (error: any) => {
      console.error(error);
    })
  }

  setContacts(contacts: Contact []) {
    this.contacts = contacts;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    if(this.contacts.length < 1) {
      this.contacts = JSON.parse(localStorage.getItem('contacts'))
    }

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

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(position, 1);

          this.refreshContactsListing();
        }
      );
  }

  addContact(contact: Contact) {
    if (!contact) return;

    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);

          this.refreshContactsListing();
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const position = this.contacts.findIndex(contact => contact.id === originalContact.id);

    if (position < 0) return;

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[position] = newContact;

          this.refreshContactsListing();
        }
      );
  }

  refreshContactsListing() {
    const contactsListClone: Contact[] = this.contacts.slice();

    this.contactListChangedEvent.next(contactsListClone);
  }
}
