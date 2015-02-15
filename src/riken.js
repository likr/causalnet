angular.module('riken', ['ui.router']);

angular.module('riken')
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/?rmin=0.5');
  });
