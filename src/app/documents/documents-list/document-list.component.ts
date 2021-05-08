import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Document } from '../documents.model'

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      "1",
      "Evaluación de la inocuidad",
      "Evaluación de la inocuidad de los alimentos genéticamente modificados instrumentos para capacitadores",
      "http://www.fao.org/3/i0110s/i0110s.pdf",
      null,
    ),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document)
  }

}
