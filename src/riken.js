angular.module('riken', ['ui.router']);

angular.module('riken')
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  });
