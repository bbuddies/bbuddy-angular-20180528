/// <reference path="../../../../typings/index.d.ts" />
var moment = require("moment");

import { Inject } from "../../common/decorators";

@Inject("budgetModel", "$state")
export default class BudgetAddController {
  constructor(budgets, $state) {
    const currentTime = new Date();
    this.budgets = budgets;
    this.$state = $state;
    this.budget = {
      month: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}`,
      amount: 1000
    };
    this.message = "";
  }

  getNowString() {
    return moment().format("YYYY/MM/DD HH:mm:ss:SSS");
  }

  add() {
    this.budgets.add(this.budget, (resolve) => (this.message = resolve), (err) => (this.message = err));
  }
}
