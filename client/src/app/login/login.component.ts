import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    if (
      this.loginForm.get("username").value !== null &&
      this.loginForm.get("password").value !== null
    ) {
      this.authService
        .login(
          this.loginForm.get("username").value,
          this.loginForm.get("password").value
        )
        .subscribe(result => {
          this.router.navigateByUrl("/book-list");
        });
    }
  }
}
