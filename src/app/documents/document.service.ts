import { EventEmitter, Injectable } from '@angular/core';

import { Document } from './document.model';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document [] =[];

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id: string) {
    let result: Document;

    this.documents.forEach(document => {
      if(document.id === id) {
        result = document;
      }
    })

    return result ? result : null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }
    this.documents.splice(position, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
