import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  id: string;

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  isValidContact = true;
  editMode: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = String(+params['id']);
          this.editMode = params['id'] != null || params['id'] != undefined;

          if(!this.id) return;

          this.originalContact = this.contactService.getContact(params['id'])
          if(!this.originalContact) return;

          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if(this.contact.group?.length > 0) {
            this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
          }
        }
      )
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(this.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    if(this.editMode) {
      newContact.group = this.groupContacts;
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;

    if (this.contact && newContact.id === this.contact.id) {
      this.isValidContact = false;
      return true;
    }

    for(const contact of this.groupContacts) {
      if (newContact.id === contact.id) {
        this.isValidContact = false;
        return true;
      }
    }

    this.isValidContact = true;
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
