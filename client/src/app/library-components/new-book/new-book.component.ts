import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { BookService } from "../book.service";
import { Router } from "@angular/router";

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
    console.log(this.bookForm);
  }

  buildForm() {
    this.bookForm = this.formBuilder.group({
      lccn: null,
      isbn: null,
      title: null,
      authors: null,
      publish_date: null,
      available: true
    });
  }

  addBook() {
    console.log(this.bookForm);
  }

  goBack() {
    this.router.navigateByUrl("/");
  }
}
