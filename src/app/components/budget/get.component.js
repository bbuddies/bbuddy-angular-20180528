import angular from "angular";
import BudgetGetController from "./get.controller";
import Budget from "./budget.model";

function routing($stateProvider) {
  $stateProvider.state("app.budgetGet", {
    url: "/budget/get",
    component: "budgetGet",
    data: {
      requireAuth: true
    }
  });
}
routing.$inject = ["$stateProvider"];

export default angular
  .module("budget.get", [])
  .component("budgetGet", {
    template: require("./get.html"),
    controller: BudgetGetController
  })
  .service("budgetModel", Budget)
  .config(routing).name;
