import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseURL: string = 'https://yopan-wdd-430-default-rtdb.firebaseio.com/';

  documentListChangedEvent = new Subject<Document[]>();

  documents: Document [] =[];

  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();

  constructor(private http: HttpClient) {
    http.get<Document []>(this.baseURL + 'documents.json')
    .subscribe(documents => {
      this.setDocuments(documents);

      this.maxDocumentId = this.getMaxId();

      this.documents.sort((a, b) => a.name > b.name ? 1 : 0);

      const documentsListClone: Document[] = this.documents.slice();

      this.documentListChangedEvent.next(documentsListClone);
    }, (error: any) => {
      console.error(error);
    })
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

  setDocuments(documents: Document []) {
    this.documents = documents;
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

    this.storeDocuments()
  }

  addDocument(newDocument: Document) {
    debugger;
    if (!newDocument) return;

    this.maxDocumentId++;

    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);

    this.storeDocuments()
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const position: number = this.documents.indexOf(originalDocument);

    if (position < 0) return;

    newDocument.id = originalDocument.id;

    this.documents[position] = newDocument;

    this.storeDocuments()
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);

    const headers= new HttpHeaders()
      .set('content-type', 'application/json')

    this.http.post(
      this.baseURL + 'documents.json',
      documentsString,
      { 'headers': headers }
    ).subscribe(response => {
      console.log(response);
      const documentsListClone: Document[] = this.documents.slice();

      this.documentListChangedEvent.next(documentsListClone);
    })
  }
}
