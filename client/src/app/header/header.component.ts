import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(path?: string) {
    if (path) {
      this.router.navigateByUrl("/" + path);
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
