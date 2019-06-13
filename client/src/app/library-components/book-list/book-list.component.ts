import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BookService } from "../book.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  addBook() {
    this.router.navigateByUrl("/new-book");
  }
}
