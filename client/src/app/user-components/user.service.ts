import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConstants } from "../shared/app.constants";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(userModel: any) {
    return this.http.post<any>(AppConstants.USERS_URL + "/register", userModel);
  }
}
