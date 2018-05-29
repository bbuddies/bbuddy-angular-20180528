import { Inject } from "../../common/decorators";

@Inject("budgetModel", "$state")
export default class BudgetGetController {
  constructor(budgets, $state) {
    const currentTime = new Date();
    this.budgets = budgets;
    this.$state = $state;
    this.budget = {
      start: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`,
      end: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
    };
    this.sum = void 0;
    this.message = "";
  }

  get() {
    // reset msg
    this.message = "";

    // call model service
    this.budgets.get(
      this.budget,
      (result) => {
        this.sum = result;
      },
      (err) => (this.message = err)
    );
  }
}
