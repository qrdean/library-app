import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BookService } from "../book.service";
import { BookModel } from "../book.model";

import * as XLSX from "xlsx";

@Component({
  selector: "app-bulk-upload",
  templateUrl: "./bulk-upload.component.html",
  styleUrls: ["./bulk-upload.component.scss"]
})
export class BulkUploadComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  bookJson: [];
  constructor(private bookService: BookService) {}

  ngOnInit() {}

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
      this.bookService
        .addBook(bookModels)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          console.log(result);
          this.bookJson = null;
        });
    } else {
      // error
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
