import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { NewBookComponent } from "./library-components/new-book/new-book.component";
import { BookListComponent } from "./library-components/book-list/book-list.component";

// Service
import { BookService } from "./library-components/book.service";
import { ListItemComponent } from "./shared/list-item/list-item.component";

@NgModule({
  declarations: [
    AppComponent,
    NewBookComponent,
    BookListComponent,
    ListItemComponent
  ],
  imports: [
    // Material
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
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
