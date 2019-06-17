import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookListComponent } from "./library-components/book-list/book-list.component";
import { NewBookComponent } from "./library-components/new-book/new-book.component";
import { BookDetailsComponent } from "./library-components/book-details/book-details.component";
import { LoginComponent } from "./login/login.component";
const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "book-list", component: BookListComponent },
  { path: "book-detail", component: BookDetailsComponent },
  { path: "new-book", component: NewBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
