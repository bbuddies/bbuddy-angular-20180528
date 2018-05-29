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
        year: 2018,
        month: 2,
        day: 15
      },
      endDate: {
        year: 2018,
        month: 4,
        day: 15
      }
    };
    this.summaryBudget = 0;
  }

  getData() {
    var self = this;
    self.summaryBudget = 0;
    self.grammarModuleModel.fetchAll(function (data) {
      console.log(data);
      let gapYears = self.date.endDate.year - self.date.startDate.year;
      var summaryBudget = 0;

      if (gapYears == 0) {
        let gapMonth = self.date.endDate.month - self.date.startDate.month;

        if (gapMonth == 0) {
          let gapDay = self.date.endDate.day - self.date.startDate.day;
          let dataMonth = `${self.date.endDate.year}-${self.date.endDate.month}`
          console.log('dataMonth: ' + dataMonth);
          console.log('gapDay: ' + (gapDay + 1));

          for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
            let dataItem = data[dataIdx]

            if (dataItem.month == dataMonth) {
              let dayLengthOfMonth = self.getDayLengthOfMonth(self.date.endDate.year, self.date.endDate.month);
              let budget = ((gapDay + 1) / dayLengthOfMonth) * dataItem.amount;
              summaryBudget += budget;
            }
          }
        } else {
          var tempMonthValue = 0;
          while (tempMonthValue <= gapMonth) {
            let dayLengthOfMonth = self.getDayLengthOfMonth(self.date.endDate.year, self.date.startDate.month + tempMonthValue);
            let gapDay = 0;
            if (tempMonthValue == 0) {
              gapDay = dayLengthOfMonth - self.date.startDate.day + 1;
            } else if (tempMonthValue == gapMonth) {
              gapDay = self.date.endDate.day;
            } else {
              gapDay = dayLengthOfMonth;
            }
            let dataMonth = `${self.date.endDate.year}-${self.date.startDate.month + tempMonthValue}`
            console.log('dataMonth: ' + dataMonth);
            console.log('gapDay: ' + gapDay);

            for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
              let dataItem = data[dataIdx]

              if (dataItem.month == dataMonth) {
                let budget = (gapDay / dayLengthOfMonth) * dataItem.amount;
                summaryBudget += budget;
              }
            }

            tempMonthValue++;
          }
        }
      } else {
        //
      }

      self.summaryBudget = summaryBudget;
    });
  }

  isLeapYear(year) {
    return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
  }

  getDayLengthOfMonth(yearValue, monthValue) {
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
