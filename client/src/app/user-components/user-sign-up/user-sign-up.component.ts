import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-sign-up",
  templateUrl: "./user-sign-up.component.html",
  styleUrls: ["./user-sign-up.component.scss"]
})
export class UserSignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  register() {
    const registerPayload = {
      newUser: {
        email: this.signUpForm.get("email").value,
        login: this.signUpForm.get("email").value,
        firstName: this.signUpForm.get("firstName").value,
        lastName: this.signUpForm.get("lastName").value
      },
      password: this.signUpForm.get("password").value,
      role: 2
    };
    console.log(registerPayload);
    this.userService.register(registerPayload).subscribe(result => {
      console.log(result);
    });
  }
}
