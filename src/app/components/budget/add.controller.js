/// <reference path="../../../../typings/index.d.ts" />
import angular from "angular";
import { Inject } from "../../common/decorators";

@Inject("budgetModel", "$state")
export default class BudgetAddController {
  constructor(budgets, $state) {
    const currentTime = new Date();
    this.budgets = budgets;
    this.$state = $state;
    this.budget = {
      time: `${currentTime.getFullYear()}-${currentTime.getMonth()}`,
      amount: 1000
    };
    this.message = "";
  }
  add() {
    // alert(angular.toJson(this.budget));
    this.budgets.add(this.budget, (resolve) => (this.message = resolve), (err) => (this.message = err));
  }
}
