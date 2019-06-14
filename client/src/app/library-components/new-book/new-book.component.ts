import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BookService } from "../book.service";

import { BookModel } from "../book.model";

import * as XLSX from "xlsx";

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.scss"]
})
export class NewBookComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  bookJson: [];
  bookForm: FormGroup;
  constructor(
    private router: Router,
    private bookService: BookService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.bookForm = this.formBuilder.group({
      lccn: null,
      isbn: null,
      title: null,
      authors: null,
      publishDate: null,
      available: true
    });
  }

  addBook() {
    const authors = this.bookForm.get("authors").value;
    const splitAuthors = authors ? authors.split(",") : null;
    console.log(
      this.bookForm.get("lccn").value,
      this.bookForm.get("isbn").value,
      this.bookForm.get("title").value,
      splitAuthors,
      this.bookForm.get("publishDate").value,
      this.bookForm.get("available").value
    );
    const newBook: BookModel = new BookModel(
      this.bookForm.get("lccn").value,
      this.bookForm.get("isbn").value,
      this.bookForm.get("title").value,
      splitAuthors,
      this.bookForm.get("publishDate").value,
      this.bookForm.get("available").value
    );

    this.bookService
      .addBook(newBook)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
      });
  }

  handleExcelFile(event) {
    const files = event.target.files;
    const f = files[0];
    const reader = new FileReader();
    let json = null;
    reader.onload = e => {
      const data = new Uint8Array(e.target["result"]);
      const workbook = XLSX.read(data, { type: "array" });
      json = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);
      this.bookJson = json;
    };
    reader.readAsArrayBuffer(f);
  }

  submitBulkUpload() {
    if (this.bookJson !== null) {
      const bookModels = this.bookJson.map((book: any) => {
        const splitAuthors = book.authors ? book.authors.split(",") : null;
        const newBook: BookModel = new BookModel(
          book.lccn,
          book.isbn,
          book.title,
          splitAuthors,
          book.publishDate,
          true
        );
        return newBook;
      });
      console.log(bookModels);
    } else {
      // error
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
