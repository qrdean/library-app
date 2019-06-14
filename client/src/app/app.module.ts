import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule
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

@NgModule({
  declarations: [
    AppComponent,
    NewBookComponent,
    BookListComponent,
    UserProfileComponent,
    UserSignUpComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    // Material
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    // Angular
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule {}
