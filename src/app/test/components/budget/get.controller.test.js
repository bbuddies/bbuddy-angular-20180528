import Controller from "../../../components/budget/get.controller";

describe("budget get controller", function() {
  var savedDate = Date;
  var budget, $state, get, go, controller;

  var givenBudget = function(start, end) {
    controller.budget = {
      start,
      end
    };
  };
  var failedWithError = function(err) {
    get.callsArgWith(2, err);
  };
  var successWithSum = function(sum) {
    get.callsArgWith(1, sum);
  };

  beforeEach(() => {
    budget = { get: () => {} };
    get = sinon.stub(budget, "get").yields();
    $state = { go: () => {} };
    go = sinon.spy($state, "go");

    controller = new Controller(budget, $state);
  });

  afterEach(() => {
    Date = savedDate;
  });

  it("get budget called successfully", function() {
    givenBudget("2018-05-01", "2018-05-28");

    controller.get();

    get.should.have.been.calledWith({ start: "2018-05-01", end: "2018-05-28" });
  });

  it("get budget success and get sum result", function() {
    successWithSum(1000);

    controller.get();

    controller.sum.should.eql(1000);
  });

  it("get budget failed due any reason", function() {
    failedWithError("Error");

    controller.get();

    controller.message.should.eql("Error");
  });
});
