import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
@Component({
  selector: "app-nav-container",
  templateUrl: "./nav-container.component.html",
  styleUrls: ["./nav-container.component.scss"]
})
export class NavContainerComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  navigate(path?: string) {
    if (path) {
      this.router.navigateByUrl("/" + path);
    } else {
      this.router.navigateByUrl("/book-list");
    }
  }
}
