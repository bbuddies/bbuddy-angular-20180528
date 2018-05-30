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
    // varify start and end
    if (budget.start.trim().length === 0 || budget.end.trim().length === 0) {
      failure("Budget start or end date should not be empty!");
      return;
    }

    const start = moment(budget.start);
    const end = moment(budget.end);
    if (moment.duration(end.diff(start)).as("days") < 0) {
      failure("Budget end date should not later than start date!");
      return;
    }

    const startMonth = start.month() + 1;
    const startDay = start.date();
    const endMonth = end.month() + 1;
    const endDay = end.date();

    // get all data
    this.api.budget.all((allData) => {
      // get all month covered
      let monthes = allData.reduce((acc, data) => {
        const month = parseInt(data.month.split("-").pop());
        month >= startMonth && month <= endMonth && acc.push({ month, amount: data.amount });
        return acc;
      }, []);

      // case for length 0
      if (monthes.length === 0) success(0);
      //  case for length 1
      else if (monthes.length === 1) {
        const days = moment.duration(end.diff(start)).as("days") + 1;
        const totalDays = start.daysInMonth();

        success((days / totalDays) * monthes[0].amount);
      }
      // case for multi-monthes
      else {
        let result;
        let finalMonthes;
        const fullMonthes = monthes.splice(1, monthes.length - 2);
        const firstMonth = monthes[0];
        const lastMonth = monthes[1];

        firstMonth.amount *= (start.daysInMonth() - startDay + 1) / start.daysInMonth();
        lastMonth.amount *= endDay / end.daysInMonth();

        finalMonthes = monthes.concat(fullMonthes);

        result = finalMonthes.reduce((acc, _month) => acc + _month.amount, 0);

        success(result);
      }
    });
  }
}
