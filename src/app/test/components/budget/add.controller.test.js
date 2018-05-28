import Controller from "../../../components/budget/add.controller";

describe("budget add controller", function() {
  var savedDate = Date;
  var budget, $state, add, go, controller;
  beforeEach(() => {
    budget = { add: () => {} };
    add = sinon.stub(budget, "add").yields();
    $state = { go: () => {} };
    go = sinon.spy($state, "go");

    controller = new Controller(budget, $state);
    controller.budget.month = "2018-5";
    controller.budget.amount = 100000;
  });
  afterEach(() => {
    Date = savedDate;
  });

  it("Get now string correctly", function() {
    const current = new Date();

    Date = function() {
      return current;
    };

    var result = controller.getNowString();

    var fmt = function fmt(number) {
      return number < 10 ? "0" + number : number;
    };

    var YYYY = current.getFullYear();
    var MM = current.getMonth() + 1;
    var DD = current.getDate();
    var HH = current.getHours();
    var mm = current.getMinutes();
    var ss = current.getSeconds();
    var SSS = current.getMilliseconds();
    MM = fmt(MM);
    HH = fmt(HH);
    mm = fmt(mm);
    ss = fmt(ss);
    if (SSS < 10) SSS = "00" + SSS;
    if (SSS < 100) SSS = "0" + SSS;

    result.should.eql(`${YYYY}/${MM}/${DD} ${HH}:${mm}:${ss}:${SSS}`);
  });
});
