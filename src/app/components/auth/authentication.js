import { Inject } from "../../common/decorators";

@Inject("api")
export default class Authentication {
  constructor(api) {
    this.authenticated = false;
    this.api = api;
    this.user = {};
  }
  authenticate(credential, success = () => {}, fail = () => {}) {
    this.api.auth.signIn(
      credential,
      (user) => {
        this.authenticated = true;
        this.user = user;
        success(user);
      },
      fail
    );
  }
  signOut(callback = () => {}) {
    this.api.auth.signOut(callback);
  }
  validateUser() {
    return this.api.auth.validateUser(
      (user) => {
        this.user = user;
      },
      ($state) => {
        $state.go("auth.signIn");
      }
    );
  }
  isAuthenticated() {
    return !!this.authenticated;
  }
}
