import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AppConstants } from "../shared/app.constants";
import { Subject, BehaviorSubject } from "rxjs";
import { BookModel } from "./book.model";
@Injectable({
  providedIn: "root"
})
export class BookService {
  book$: BehaviorSubject<BookModel> = new BehaviorSubject<BookModel>(null);
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<any>(AppConstants.BOOKS_URL);
  }

  getBookById(book: any) {
    return this.http.get<any>(AppConstants.BOOKS_URL + "/" + book._id);
  }

  addBook(book: any) {
    return this.http.post<any>(AppConstants.BOOKS_URL, book);
  }

  updateBook(book: any) {
    return this.http.put<any>(AppConstants.BOOKS_URL + "/" + book._id, book);
  }

  deleteBook(bookId: any) {
    return this.http.delete<any>(AppConstants.BOOKS_URL + "/" + bookId);
  }
}
