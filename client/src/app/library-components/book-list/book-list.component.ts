import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BookService } from "../book.service";
import { BookModel } from "../book.model";

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

  checkout(book: BookModel) {
    book.available = false;
    this.bookService.updateBook(book).subscribe(result => {
      console.log(result);
    });
  }

  bookDetails(book: BookModel) {
    this.router.navigateByUrl("/book-detail");
    this.bookService.book$.next(book);
  }
}
