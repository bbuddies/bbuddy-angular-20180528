import angular from "angular";
import { Inject } from "../../common/decorators";

@Inject("authentication", "$state")
class HeaderController {
  constructor(authentication, $state) {
    this.authentication = authentication;
    this.$state = $state;
  }
  signOut() {
    this.authentication.signOut(() => {
      this.$state.go("auth.signIn");
    });
  }
}

var header = {
  bindings: {
    authentication: "<"
  },
  template: require("./header.html"),
  controller: HeaderController
};

export default angular.module("app.header", []).component("header", header).name;
