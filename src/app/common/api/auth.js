import { Inject } from "../decorators";

@Inject("$auth", "$state")
export default class Auth {
  constructor($auth, $state) {
    this.$auth = $auth;
    this.$state = $state;
  }
  signIn(credential, success = () => {}, fail = () => {}) {
    this.$auth
      .submitLogin(credential)
      .then(success)
      .catch(fail);
  }
  signOut(callback) {
    this.$auth.signOut().then(callback);
  }
  validateUser(success, fail) {
    return this.$auth.validateUser().then(success, () => {
      fail(this.$state);
    });
  }
}
