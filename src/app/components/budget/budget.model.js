import { Inject } from "../../common/decorators";

@Inject("api")
export default class Budget {
  constructor(api) {
    this.api = api;
  }
  add(budget, success, failure) {
    if (budget.time.trim().length === 0) {
      failure("Budget time should not be empty!");
      return;
    }
    if (budget.ammount.trim().length === 0) {
      failure("Budget amount should not be empty!");
      return;
    }
    this.api.budget.add(budget, success);
  }
}
