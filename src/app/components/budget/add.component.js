import angular from "angular";
import BudgetAddController from "./add.controller";
import Budget from "./budget.model";

function routing($stateProvider) {
  $stateProvider.state("app.budgetAdd", {
    url: "/budget/add",
    component: "budgetAdd",
    data: {
      requireAuth: true
    }
  });
}
routing.$inject = ["$stateProvider"];

export default angular
  .module("budget.add", [])
  .component("budgetAdd", {
    template: require("./add.html"),
    controller: BudgetAddController
  })
  .service("budgetModel", Budget)
  .config(routing).name;
