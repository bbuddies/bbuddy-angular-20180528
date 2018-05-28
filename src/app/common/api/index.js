import angular from "angular";
import http from "./http";
import api from "./api";
import auth from "./auth";
import accounts from "./accounts";
import budget from "./budget";
import tokenAuth from "ng-token-auth";

export default angular
  .module("api", [tokenAuth])
  .service("http", http)
  .service("api", api)
  .service("authApi", auth)
  .service("accountsApi", accounts)
  .service("budgetApi", budget).name;
