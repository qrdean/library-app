import {
  Component,
  Input,
  OnInit,
  Output,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { BookModel } from "../book.model";

import { BookService } from "../book.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"]
})
export class BookDetailsComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  book: BookModel;
  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {
    this.bookService.book$.pipe(takeUntil(this.destroy$)).subscribe(book => {
      this.book = book;
    });
  }

  ngAfterViewInit() {
    if (this.book === null) {
      this.router.navigateByUrl("/");
    }
  }

  ngAfterViewChecked() {
    console.log(this.book);
  }

  checkIn(book: BookModel) {
    this.book.available = true;
    this.bookService
      .updateBook(book)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
      });
  }

  checkOut(book: BookModel) {
    this.book.available = false;
    this.bookService
      .updateBook(book)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
