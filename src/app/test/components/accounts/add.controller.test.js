import Controller from "../../../components/accounts/add.controller";

describe("accounts add controller", function() {
  var accounts, $state, add, go, controller;
  beforeEach(() => {
    accounts = { add: () => {} };
    add = sinon.stub(accounts, "add").yields();
    $state = { go: () => {} };
    go = sinon.spy($state, "go");
    controller = new Controller(accounts, $state);
    controller.account.name = "AHA";
    controller.account.balance = 100000;
  });
  it("add an account successfully", function() {
    controller.save();

    add.should.have.been.calledWith({ name: "AHA", balance: 100000 });
    go.should.have.been.calledWith("app.accounts");
  });

  it("add an account failed", function() {
    add.callsArgWith(2, "Error");
    controller.account.name = "";
    controller.account.balance = 0;

    controller.save();

    add.should.have.been.calledWith({ name: "", balance: 0 });
    controller.message.should.eql("Error");
  });
});
