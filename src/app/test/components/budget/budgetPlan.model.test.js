import BudgetPlan from '../../../components/budget/budgetPlan.model.js'

describe('Budget Plan', () => {
  context('query', () =>{
    let api, fetch, budgetPlan, callback
    beforeEach(() => {
      api = {budgets: {all: () => {}}}
      fetch = sinon.stub(api.budgets, 'all')
      budgetPlan = new BudgetPlan(api)
      callback = sinon.spy()
    })
    let assertQueryResult = function (start, end, expected) {
      budgetPlan.query(start, end, callback)

      callback.should.be.calledOnceWith(expected)
    };
    it('no budget', () => {
      fetch.yields([])
      assertQueryResult('2018-05-01', '2018-05-31', 0);
    })
    it('query one whole budget', () => {
      fetch.yields([{month: '2018-05', amount: 310}])
      assertQueryResult('2018-05-01', '2018-05-31', 310)
    })
    it('query one day', () => {
      fetch.yields([{month: '2018-05', amount: 310}])
      assertQueryResult('2018-05-01', '2018-05-01', 10)
    })
    it('query two days', () => {
      fetch.yields([{month: '2018-05', amount: 310}])
      assertQueryResult('2018-05-01', '2018-05-02', 20)
    })
    it('query start before a budget', () => {
      fetch.yields([{month: '2018-05', amount: 310}])
      assertQueryResult('2018-04-28', '2018-05-03', 30)
    })
    it('query end after a budget', () => {
      fetch.yields([{month: '2018-05', amount: 310}])
      assertQueryResult('2018-05-20', '2018-06-07', 120)
    })
    it('query across two budgets', () => {
      fetch.yields([{month: '2018-05', amount: 310}, {month: '2018-06', amount: 300}])
      assertQueryResult('2018-05-21', '2018-06-09', 110 + 90 )
    })
    it('query out of budgets', () => {
      fetch.yields([{month: '2018-05', amount: 310}])
      assertQueryResult('2018-01-21', '2018-03-09', 0)
    })
    it('query budgets with various daily amount', () => {
      fetch.yields([{month: '2018-05', amount: 3100}, {month: '2018-06', amount: 300}])
      assertQueryResult('2018-05-22', '2018-06-10', 1000 + 100)
    })
  })
})
