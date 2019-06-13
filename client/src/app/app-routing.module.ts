import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookListComponent } from "./library-components/book-list/book-list.component";
import { NewBookComponent } from "./library-components/new-book/new-book.component";
const routes: Routes = [
  { path: "", component: BookListComponent },
  { path: "new-book", component: NewBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
