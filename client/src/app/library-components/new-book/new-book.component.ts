import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BookService } from "../book.service";

import { BookModel } from "../book.model";
import { MessageService } from "src/app/shared/message.service";

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.scss"]
})
export class NewBookComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  bookForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.bookForm = this.formBuilder.group({
      lccn: [null, [Validators.required]],
      isbn: [null, [Validators.required]],
      title: [null, [Validators.required]],
      authors: [null, [Validators.required]],
      publishDate: [null, [Validators.required]],
      available: true
    });
  }

  addBook() {
    const authors = this.bookForm.get("authors").value;
    const splitAuthors = authors ? authors.split(",") : null;
    const newBook: BookModel = new BookModel(
      this.bookForm.get("lccn").value,
      this.bookForm.get("isbn").value,
      this.bookForm.get("title").value,
      splitAuthors,
      this.bookForm.get("publishDate").value,
      this.bookForm.get("available").value
    );

    if (
      newBook.lccn === null ||
      newBook.isbn === null ||
      newBook.title === null
    ) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.bookService
      .addBook(newBook)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.messageService.addToast("Book Added");
        this.bookService.getBooks();
      });
  }

  addBulk() {
    this.messageService.openBulkAddDialog();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
