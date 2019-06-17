import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { BookService } from "../book.service";
import { BookModel } from "../book.model";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  books: any[] = [];
  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {
    this.bookService.books$.subscribe(books => {
      this.books = books;
    });
    if (!this.bookService.books$.getValue()) {
      this.bookService.getBooks();
    } else {
      this.books = this.bookService.books$.getValue();
    }
  }

  addBook() {
    this.router.navigateByUrl("/new-book");
  }

  checkout(book: BookModel) {
    book.available = false;
    this.bookService
      .updateBook(book)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
      });
  }

  bookDetails(book: BookModel) {
    this.router.navigateByUrl("/book-detail");
    this.bookService.book$.next(book);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
