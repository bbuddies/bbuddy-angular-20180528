import Budget from "../../../components/budget/budget.model";

describe("budget model", function() {
  var budgetModel, getModel, api, add, all, budget, success, failure;

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

    getModel = {
      start: "2018-05-01",
      end: "2018-05-15"
    };

    api = {
      budget: {
        add: () => {},
        all: () => {}
      }
    };
    add = sinon.stub(api.budget, "add").yields({ success: true, errors: [] });
    all = sinon.stub(api.budget, "all").yields([
      {
        month: "2018-05",
        amount: 3100
      },
      {
        month: "2018-04",
        amount: 3000
      },
      {
        month: "2018-03",
        amount: 3100
      }
    ]);

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

  it("get budget successfully by single day", function() {
    getModel = {
      start: "2018-05-15",
      end: "2018-05-15"
    };

    budget.get(getModel, success, failure);

    all.should.have.been.called;

    success.should.have.been.calledWith(100);
  });

  it("get budget successfully by period", function() {
    getModel = {
      start: "2018-03-31",
      end: "2018-05-01"
    };

    budget.get(getModel, success, failure);

    success.should.have.been.calledWith(3200);
  });

  it("get budget failed due to empty", function() {
    getModel = {
      start: "",
      end: "2018-05-15"
    };

    budget.get(getModel, success, failure);

    all.should.not.have.been.called;

    failure.should.have.been.calledWith("Budget start or end date should not be empty!");
  });

  it("get budget failed due to wrong sequency", function() {
    getModel = {
      start: "2018-05-28",
      end: "2018-05-15"
    };

    budget.get(getModel, success, failure);

    all.should.not.have.been.called;

    failure.should.have.been.calledWith("Budget end date should not later than start date!");
  });
});
