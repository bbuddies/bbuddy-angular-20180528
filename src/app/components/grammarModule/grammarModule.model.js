/**
 * Created by hxghxg527 on 18/5/29.
 */

import {Inject} from "../../common/decorators"

@Inject("api")
export default class GrammarModule {
  constructor(api) {
    this.api = api
  }

  fetchAll(callback) {
    this.api.budget.all(callback);
  }

  add(grammarModule, success, failure) {
    this.api.budget.add(grammarModule, success);
  }
}

