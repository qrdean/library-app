import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDialogModule,
  MatSnackBarModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { NewBookComponent } from "./library-components/new-book/new-book.component";
import { BookListComponent } from "./library-components/book-list/book-list.component";

// Service
import { BookService } from "./library-components/book.service";
import { UserProfileComponent } from "./user-components/user-profile/user-profile.component";
import { UserSignUpComponent } from "./user-components/user-sign-up/user-sign-up.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { BookDetailsComponent } from "./library-components/book-details/book-details.component";
import { BulkUploadComponent } from "./library-components/bulk-upload/bulk-upload.component";
import { NavContainerComponent } from "./nav-container/nav-container.component";
import { DialogComponent } from "./shared/dialog/dialog.component";
import { BulkAddDialogComponent } from "./shared/bulk-add-dialog/bulk-add-dialog.component";
import { MessageService } from "./shared/message.service";
import { EditBookDialogComponent } from "./shared/edit-book-dialog/edit-book-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    NewBookComponent,
    BookListComponent,
    UserProfileComponent,
    UserSignUpComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BookDetailsComponent,
    BulkUploadComponent,
    NavContainerComponent,
    DialogComponent,
    BulkAddDialogComponent,
    EditBookDialogComponent
  ],
  imports: [
    // Material
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule,
    // Angular
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  entryComponents: [BulkAddDialogComponent, EditBookDialogComponent],
  providers: [BookService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
