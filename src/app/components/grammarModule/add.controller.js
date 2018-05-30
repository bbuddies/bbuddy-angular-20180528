/**
 * Created by hxghxg527 on 18/5/29.
 */

import {Inject} from '../../common/decorators'

@
Inject('grammarModuleModel', '$state')
export default class GrammarModuleAddController {
  constructor(grammarModuleModel, $state) {
    this.grammarModuleModel = grammarModuleModel
    this.$state = $state
    this.date = {
      startDate: {
        year: 2017,
        month: 2,
        day: 15
      },
      endDate: {
        year: 2017,
        month: 12,
        day: 31
      }
    };
    this.summaryBudget = 0;
  }

  getData() {
    var self = this;
    self.summaryBudget = 0;
    self.grammarModuleModel.fetchAll(function (beData) {
      console.log(beData);

      var summaryBudget = 0;
      var yearIdx = 0;
      var _startYear = parseInt(self.date.startDate.year);
      var _endYear = parseInt(self.date.endDate.year);
      var _startMonth = parseInt(self.date.startDate.month);
      var _endMonth = parseInt(self.date.endDate.month);
      var _startDay = parseInt(self.date.startDate.day);
      var _endDay = parseInt(self.date.endDate.day);
      var gapYears = _endYear - _startYear;

      while (yearIdx <= gapYears) {
        var startMonth = 0;
        var endMonth = 0;
        var startDay = 0;
        var endDay = 0;

        if (gapYears == 0) {
          startMonth = _startMonth;
          endMonth = _endMonth;
          startDay = _startDay;
          endDay = _endDay;
        } else if (yearIdx == 0) {
          startMonth = _startMonth;
          endMonth = 12;
          startDay = _startDay;
          endDay = 31;
        } else if (yearIdx == gapYears) {
          startMonth = 1;
          endMonth = _endMonth;
          startDay = 1;
          endDay = _endDay;
        } else {
          startMonth = 1;
          endMonth = 12;
          startDay = 1;
          endDay = 31;
        }

        summaryBudget += self.calculate(_startYear + yearIdx, startMonth, endMonth, startDay, endDay, beData);
        yearIdx++;
      }

      self.summaryBudget = summaryBudget;
    });
  }

  calculate(currentYear, startMonth, endMonth, startDay, endDay, beData) {
    var self = this;
    var summaryBudget = 0;
    var monthIdx = 0;
    var gapMonth = endMonth - startMonth;

    while (monthIdx <= gapMonth) {
      let dayNumOfCurrentMonth = self.getDayNumOfCurrentMonth(currentYear, startMonth + monthIdx);
      let gapDay = 0;
      if (gapMonth == 0) {
        gapDay = endDay - startDay + 1;
      } else if (monthIdx == 0) {
        gapDay = dayNumOfCurrentMonth - startDay + 1;
      } else if (monthIdx == gapMonth) {
        gapDay = endDay;
      } else {
        gapDay = dayNumOfCurrentMonth;
      }

      for (let dataIdx = 0; dataIdx < beData.length; dataIdx++) {
        let dataItem = beData[dataIdx];
        // console.log('date: ' + (currentYear + '-' + (startMonth + monthIdx)))

        if (dataItem.month == (currentYear + '-' + (startMonth + monthIdx))) {
          summaryBudget += (gapDay / dayNumOfCurrentMonth) * dataItem.amount;
          break;
        }
      }

      monthIdx++;
    }

    return summaryBudget;
  }

  isLeapYear(year) {
    return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
  }

  getDayNumOfCurrentMonth(yearValue, monthValue) {
    var self = this,
      year = parseInt(yearValue),
      month = parseInt(monthValue),
      cond1 = [1, 3, 5, 7, 8, 10, 12],
      cond2 = [4, 6, 9, 11],
      monthLength = 0;

    if (month < 1) {
      monthLength = 31;
    } else if (cond1.indexOf(month) > -1) {
      monthLength = 31;
    } else if (cond2.indexOf(month) > -1) {
      monthLength = 30;
    } else {
      if (year < 0 || self.isLeapYear(year)) {
        monthLength = 29;
      } else {
        monthLength = 28;
      }
    }

    return monthLength;
  }

}
