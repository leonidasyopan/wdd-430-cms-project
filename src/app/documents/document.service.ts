import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document [] =[];

  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {

    let maxId: number = 0

    this.documents.forEach((document) => {
      let currentId: number = Number(document.id);

      if(currentId > maxId) {
        maxId = currentId
      }
    })

    return maxId
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
    if (!document) return;

    const position: number = this.documents.indexOf(document);

    if (position < 0) return;

    this.documents.splice(position, 1);

    const documentsListClone: Document[] = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone);
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    this.maxDocumentId++;

    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);

    const documentsListClone: Document[] = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone);
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const position: number = this.documents.indexOf(originalDocument);

    if (position < 0) return;

    newDocument.id = originalDocument.id;

    this.documents[position] = newDocument;

    const documentsListClone: Document[] = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone)
  }
}
