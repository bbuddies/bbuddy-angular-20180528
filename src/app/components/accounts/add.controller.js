import { Inject } from "../../common/decorators";

@Inject("accountsModel", "$state")
export default class AccountsAddController {
  constructor(accounts, $state) {
    this.accounts = accounts;
    this.$state = $state;
    this.account = {
      name: "",
      balance: 0
    };
    this.message = "";
  }
  save() {
    this.accounts.add(this.account, () => this.$state.go("app.accounts"), (message) => (this.message = message));
  }
}
