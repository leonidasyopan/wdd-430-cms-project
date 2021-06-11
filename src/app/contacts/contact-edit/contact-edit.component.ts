import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  groupContacts;

  contact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    console.log("cancel");
  }

  onSubmit(form: NgForm) {
    console.log("cancel");
    console.log(form);
  }

}
