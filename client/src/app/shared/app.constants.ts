import { environment } from "../../environments/environment";

export const AppConstants = {
  BOOKS_URL: environment.serverUrl + "/books",
  USERS_URL: environment.serverUrl + "/users"
};
