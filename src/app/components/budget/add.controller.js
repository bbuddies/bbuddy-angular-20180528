/// <reference path="../../../../typings/index.d.ts" />
import angular from "angular";
import { Inject } from "../../common/decorators";

@Inject("budgetModel", "$state")
export default class BudgetAddController {
  constructor(budget, $state) {
    const currentTime = new Date();
    this.budget = budget;
    this.$state = $state;
    this.budget = {
      time: `${currentTime.getFullYear()}-${currentTime.getMonth()+1}`,
      amount: 1000
    };
    this.message = "";
  }
  add() {
    alert(angular.toJson(this.budget));
    // this.accounts.add(this.account,
    //     () => this.$state.go('app.accounts'),
    //     (message) => this.message = message )
  }
}
