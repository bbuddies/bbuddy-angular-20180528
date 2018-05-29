import Budget from "../../../components/budget/budget.model";

describe("budget model", function() {
  var budgetModel, api, add, budget, success, failure;

  var amountInvalidTestCase = function(amountVal) {
    budgetModel.amount = amountVal;
    budget.add(budgetModel, success, failure);
    add.should.not.have.been.called;
    failure.should.have.been.calledWith("Budget amount should not be empty , 0 or invalid!");
  };

  beforeEach(() => {
    budgetModel = {
      month: "2018-5",
      amount: 10000
    };

    api = { budget: { add: () => {} } };
    add = sinon.stub(api.budget, "add").yields({ success: true, errors: [] });
    budget = new Budget(api);
    success = sinon.spy();
    failure = sinon.spy();
  });

  it("add budget successfully", function() {
    budget.add(budgetModel, success, failure);

    add.should.have.been.calledWith({ month: "2018-5", amount: 10000 });
    success.should.have.been.called;
  });

  it("budget month should not be empty when adding a budget", function() {
    budgetModel.month = "";

    budget.add(budgetModel, success, failure);

    add.should.not.have.been.called;
    failure.should.have.been.calledWith("Budget month should not be empty!");
  });

  it("budget amount should not be empty when adding a budget", function() {
    amountInvalidTestCase("");
  });

  it("budget amount should not be less than 0 when adding a budget", function() {
    amountInvalidTestCase(0);
  });

  it("budget amount should only be number when adding a budget", function() {
    amountInvalidTestCase("mock");
  });
});
