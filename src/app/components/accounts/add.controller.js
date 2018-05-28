import {Inject} from '../../common/decorators'

@Inject('accountsModel', '$state')
export default class AccountsAddController {
    constructor(accounts, $state){
        this.accounts = accounts
        this.$state = $state
        this.account = {
            name: '',
            balance: 0
        }
        this.message = ""
    }
    save(){
        this.accounts.add(this.account,
            () => this.$state.go('app.accounts'),
            (message) => this.message = message )
    }
    getNowString() {
      var date = this.getDate();
      var str = formatNum(date.getFullYear())+'/'+formatNum(date.getMonth()+1)+'/'+formatNum(date.getDate())+' ' + formatNum(date.getHours())+':'+formatNum(date.getMinutes())+':'+formatNum(date.getSeconds())+'.'+formatNum(date.getMilliseconds());
      console.log(str);
      return str;

      function formatNum(num) {
        return num < 10 ? '0' + num: num;
      }
    }
    getDate() {
      return new Date();
    }
}
