import { Inject } from "../decorators";

@Inject("http")
export default class Budget {
  constructor(http) {
    this.http = http;
  }
  all(callback) {
    this.http.get("budgets", callback);
  }
  add(budget, callback) {
    this.http.post("budgets", budget, callback);
  }
}
