import { Inject } from "../decorators";

@Inject("http")
export default class Accounts {
  constructor(http) {
    this.http = http;
  }
  all(callback) {
    this.http.get("accounts", callback);
  }
  add(account, callback) {
    this.http.post("accounts", account, callback);
  }
}
