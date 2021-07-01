import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';

interface Response {
  message: string,
  documents: Document []
}

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  baseURL: string = 'http://localhost:3000/';

  documentListChangedEvent = new Subject<Document[]>();

  documents: Document [] = [];

  documentSelectedEvent = new EventEmitter<Document>();

  constructor(private http: HttpClient) {
    http.get<Response>(this.baseURL + 'documents')
    .subscribe(response => {
      this.setDocuments(response.documents);

      this.documents.sort((a, b) => a.name > b.name ? 1 : 0);

      const documentsListClone: Document[] = this.documents.slice();

      this.documentListChangedEvent.next(documentsListClone);
    }, (error: any) => {
      console.error(error);
    })
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

    const position = this.documents.findIndex(doc => doc.id === document.id);

    if (position < 0) return;

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(position, 1);

          this.refreshDocumentsListing()
        }
      );
  }

  addDocument(document: Document) {
    if (!document) return;

    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);

          this.refreshDocumentsListing()
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const position = this.documents.findIndex(document => document.id === originalDocument.id);

    if (position < 0) return;

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[position] = newDocument;

          this.refreshDocumentsListing()
        }
      );
  }

  refreshDocumentsListing() {
    const documentsListClone: Document[] = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone);
  }
}
