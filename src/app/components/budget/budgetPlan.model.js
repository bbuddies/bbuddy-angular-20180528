import moment from "moment";
import _ from 'lodash'

class Budget{
  constructor(hashObject){
    _.merge(this, hashObject)
  }

  get start() {
    return moment(this.month, 'YYYY-MM').startOf('month');
  }
  get end() {
    return moment(this.month, 'YYYY-MM').endOf('month');
  }
  get period() {
    return new Period(this.start, this.end)
  }
  getOverlappingAmount(period) {
    return this.amount / this.period.getDays() * period.getOverlappingDays(this.period);
  }
}


class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
  getDays() {
    if (this.start.isAfter(this.end)){
      return 0
    }
    return this.end.diff(this.start, 'days') + 1;
  }
  getOverlappingDays(another) {
    let startOfOverlapping = this.start.isAfter(another.start) ? this.start : another.start;
    let endOfOverlapping = this.end.isBefore(another.end) ? this.end : another.end;
    return new Period(startOfOverlapping, endOfOverlapping).getDays();
  }
}

export default class BudgetPlan{
  constructor(api){
    this.api = api
  }

  query(start, end, callback){
    let period = new Period(moment(start, 'YYYY-MM-DD'), moment(end, 'YYYY-MM-DD'))
    this.api.budgets.all(budgets => {
      callback(
        _(budgets)
          .map(budget => new Budget(budget))
          .sumBy(budget => budget.getOverlappingAmount(period)))
    })
  }

}
