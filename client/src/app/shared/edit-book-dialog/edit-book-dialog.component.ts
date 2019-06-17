import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookModel } from "src/app/library-components/book.model";

@Component({
  selector: "app-edit-book-dialog",
  templateUrl: "./edit-book-dialog.component.html",
  styleUrls: ["./edit-book-dialog.component.scss"]
})
export class EditBookDialogComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditBookDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const authorsArray: string[] = this.data.book.authors;
    const authorsString: string = authorsArray.join(",");
    this.bookForm = this.formBuilder.group({
      lccn: [this.data.book.lccn, [Validators.required]],
      isbn: [this.data.book.isbn, [Validators.required]],
      title: [this.data.book.title, [Validators.required]],
      authors: [authorsString, [Validators.required]],
      publishDate: [this.data.book.publishDate, [Validators.required]],
      available: this.data.book.available
    });
  }

  submit() {
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
    this.dialogRef.close(newBook);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
