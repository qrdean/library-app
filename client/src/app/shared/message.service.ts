import { Injectable } from "@angular/core";
import { BulkAddDialogComponent } from "./bulk-add-dialog/bulk-add-dialog.component";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { EditBookDialogComponent } from "./edit-book-dialog/edit-book-dialog.component";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private bulkAddDialogRef: MatDialogRef<BulkAddDialogComponent>;
  private editBookDialogRef: MatDialogRef<EditBookDialogComponent>;
  constructor(public matDialog: MatDialog, public snackBar: MatSnackBar) {}

  public addToast(content: string) {
    this.snackBar.open(content, null, {
      duration: 3000,
      verticalPosition: "top",
      panelClass: "toast",
      politeness: "polite"
    });
  }

  public openBulkAddDialog() {
    this.bulkAddDialogRef = this.matDialog.open(BulkAddDialogComponent);
    return this.bulkAddDialogRef.afterClosed();
  }

  public openEditBookDialog(book) {
    const config = {
      data: {
        book
      }
    };
    this.editBookDialogRef = this.matDialog.open(
      EditBookDialogComponent,
      config
    );
    return this.editBookDialogRef.afterClosed();
  }
}
