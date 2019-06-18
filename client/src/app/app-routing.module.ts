import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookListComponent } from "./library-components/book-list/book-list.component";
import { NewBookComponent } from "./library-components/new-book/new-book.component";
import { BookDetailsComponent } from "./library-components/book-details/book-details.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth/user-auth.guard";
import { UserSignUpComponent } from "./user-components/user-sign-up/user-sign-up.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: UserSignUpComponent },
  {
    path: "book-list",
    component: BookListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "book-detail",
    component: BookDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "new-book",
    component: NewBookComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
