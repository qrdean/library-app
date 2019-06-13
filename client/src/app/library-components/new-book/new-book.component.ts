import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

import { BookService } from "../book.service";
import { Router } from "@angular/router";

import { BookModel } from "../book.model";

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.scss"]
})
export class NewBookComponent implements OnInit {
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

    this.bookService.addBook(newBook).subscribe(result => {
      console.log(result);
    });
  }

  goBack() {
    this.router.navigateByUrl("/");
  }
}
