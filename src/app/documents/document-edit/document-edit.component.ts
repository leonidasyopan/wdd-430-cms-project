import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';

import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = String(+params['id']);
          this.editMode = params['id'] != null;
        }
      )
  }

  onCancel() {
    console.log("cancel");
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document("1", value.name, value.description, value.url, []);
    this.documentService.addDocument(newDocument);
  }

}
