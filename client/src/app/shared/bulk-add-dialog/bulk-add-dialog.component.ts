import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-bulk-add-dialog",
  templateUrl: "./bulk-add-dialog.component.html",
  styleUrls: ["./bulk-add-dialog.component.scss"]
})
export class BulkAddDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BulkAddDialogComponent>
  ) {}

  ngOnInit() {}

  cancel() {
    this.dialogRef.close(false);
  }
}
