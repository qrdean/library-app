import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  loggedIn: any;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigateByUrl("/");
  }

  register() {
    this.router.navigateByUrl("/register");
  }
}
