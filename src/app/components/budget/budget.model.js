import { Inject } from "../../common/decorators";

@Inject("api")
export default class Budget {
  constructor(api) {
    this.api = api;
  }
  add(budget, success, failure) {
    if (budget.month.trim().length === 0) {
      failure("Budget month should not be empty!");
      return;
    }
    if (!isFinite(budget.amount) || budget.amount <= 0 || budget.month.trim().length === 0) {
      failure("Budget amount should not be empty , 0 or invalid!");
      return;
    }
    this.api.budget.add(budget, success);
  }
}
