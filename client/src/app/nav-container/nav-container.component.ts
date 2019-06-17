import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-nav-container",
  templateUrl: "./nav-container.component.html",
  styleUrls: ["./nav-container.component.scss"]
})
export class NavContainerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(path?: string) {
    if (path) {
      this.router.navigateByUrl("/" + path);
    } else {
      this.router.navigateByUrl("/book-list");
    }
  }
}
