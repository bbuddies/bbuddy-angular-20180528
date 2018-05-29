/// <reference path="../../../../typings/index.d.ts" />
var moment = require("moment");

import { Inject } from "../../common/decorators";

@Inject("api")
export default class Budget {
  constructor(api) {
    this.api = api;
  }
  add(budget, success, failure) {
    if (budget.month.trim().length === 0) {
      failure("Budget month should not be empty!");
      return;
    }
    if (!isFinite(budget.amount) || budget.amount <= 0 || budget.month.trim().length === 0) {
      failure("Budget amount should not be empty , 0 or invalid!");
      return;
    }
    this.api.budget.add(budget, success);
  }

  get(budget, success, failure) {
    var start = moment(budget.start);
    var end = moment(budget.end);

    // varify start and end
    if (budget.start.trim().length === 0 || budget.end.trim().length === 0) {
      failure("Budget start or end date should not be empty!");
      return;
    }
    if (moment.duration(end.diff(start)).as("days")) {
      failure("Budget end date should not later than start date!");
      return;
    }

    var start_M = start.month() + 1;
    var start_D = start.date();
    var end_M = end.month() + 1;
    var end_D = end.date();

    // get all data
    this.api.budget.all((allData) => {
      // get all month covered
      var monthes = [];
      allData.forEach(function(data) {
        var month = parseInt(data.month.split("-").pop());
        var amount = data.amount;
        if (month >= start_M && month <= end_M) monthes.push({ month, amount });
      });

      // case for length 0
      if (monthes.length === 0) success(0);
      //  case for length 1
      else if (monthes.length === 1) {
        var days = moment.duration(end.diff(start)).as("days") + 1;
        var totalDays = start.daysInMonth();

        success((days / totalDays) * monthes[0].amount);
      }
      // case for multi-monthes
      else {
        var result;
        var fullMonthes = monthes.splice(1, monthes.length - 2);
        var firstMonth = monthes[0];
        var lastMonth = monthes[1];

        firstMonth.amount = (firstMonth.amount * (start.daysInMonth() - start_D + 1)) / start.daysInMonth();
        lastMonth.amount = (lastMonth.amount * end_D) / end.daysInMonth();

        var finalMonth = monthes.concat(fullMonthes);

        result = finalMonth.reduce(function(acc, _month) {
          return acc + _month.amount;
        }, 0);

        success(result);
      }
    });
  }
}
