import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  documents: Document[] = [];

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )

    this.subscription = this.documentService.documentListChangedEvent
        .subscribe(
          (documentsList: Document[]) => {
            this.documents = documentsList;
          }
        )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
