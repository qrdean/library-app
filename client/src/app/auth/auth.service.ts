import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay, tap } from "rxjs/operators";
import { addMinutes, isBefore } from "date-fns";

import { AppConstants } from "../shared/app.constants";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(AppConstants.USERS_URL + "/login", { email, password })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult) {
    const expiresAt = addMinutes(new Date(), authResult.expiresIn);

    localStorage.setItem("token", authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    // navigate to login
    this.router.navigateByUrl("/");
  }

  isLoggedIn() {
    return isBefore(new Date(), this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return new Date(expiresAt);
  }
}
