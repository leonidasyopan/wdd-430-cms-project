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
    const newContact = new Contact(this.id, value.name, value.email, value.phone, value.imageUrl, []);
    if(this.editMode) {
      newContact.group = this.groupContacts;
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }
}
