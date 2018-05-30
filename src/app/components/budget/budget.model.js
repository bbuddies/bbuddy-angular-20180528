/// <reference path="../../../../typings/index.d.ts" />
var moment = require("moment");

import { Inject } from "../../common/decorators";

function genEmptyMonths(start, end) {
  const startYear = start.year();
  const startMonth = start.month() + 1;
  const endYear = end.year();
  const endMonth = end.month() + 1;

  let durationMonth = parseInt(moment.duration(end.diff(start)).as("month")) + 1;
  let count = 0;
  let monthsObj = new Array(durationMonth);

  for (let _year = startYear; _year <= endYear * 2 - startYear; _year++) {
    let _startMonth = _year === startYear ? startMonth : 0;
    let _endMonth = _year === endYear ? endMonth : 12;
    for (let _month = _startMonth; _month <= _endMonth; _month++) {
      monthsObj[count] = {
        year: _year,
        month: _month,
        amount: 0
      };
      count++;
    }
  }
  return monthsObj;
}

function dataApplyToMonths(budget, monthsObj) {
  budget.forEach((data) => {
    const yearMonth = data.month.split("-");
    const year = parseInt(yearMonth[0]);
    const month = parseInt(yearMonth[1]);
    const matchedMonth = monthsObj.filter((_data) => {
      return _data.year === year && _data.month === month;
    })[0];
    matchedMonth && (matchedMonth.amount = data.amount);
  });
}

function calcSum(start, end, monthsObj) {
  const startDay = start.date();
  const endDay = end.date();

  let sum = 0;
  //  case for length 1
  if (monthsObj.length === 1) {
    const days = moment.duration(end.diff(start)).as("days") + 1;
    const totalDays = start.daysInMonth();

    sum = (days / totalDays) * monthsObj[0].amount;
  }
  // case for multi-monthes
  if (monthsObj.length > 1) {
    monthsObj[0].amount *= (start.daysInMonth() - startDay + 1) / start.daysInMonth();
    monthsObj[monthsObj.length - 1].amount *= endDay / end.daysInMonth();

    sum = monthsObj.reduce((acc, _month) => acc + _month.amount, 0);
  }

  return sum;
}

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

    this.api.budget.all((budget) => {
      let monthsObj = genEmptyMonths(start, end);
      dataApplyToMonths(budget, monthsObj);
      success(calcSum(start, end, monthsObj));
    });
  }
}
