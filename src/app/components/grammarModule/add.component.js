import angular from 'angular'
import addController from './add.controller'
import grammarModuleModel from './grammarModule.model'

function routing($stateProvider) {
  $stateProvider
    .state('app.grammarModuleAdd', {
      url: '/grammarModule/add',
      component: 'grammarModuleAdd',
      data: {
        requireAuth: true
      }
    });
}

routing.$inject = ['$stateProvider'];

export default angular
  .module('grammarModule.add', [])
  .component('grammarModuleAdd', {
    template: require('./add.html'),
    controller: addController
  })
  .service('grammarModuleModel', grammarModuleModel)
  .config(routing)
  .name


