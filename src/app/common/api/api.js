import { Inject } from "../decorators";

@Inject("authApi", "accountsApi", "budgetApi")
export default class Api {
  constructor(auth, accounts, budget) {
    this.auth = auth;
    this.accounts = accounts;
    this.budget = budget;
  }
}
