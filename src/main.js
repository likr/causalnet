'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

angular.module('riken', [uiRouter]);

angular.module('riken')
  .config($urlRouterProvider => {
    $urlRouterProvider.otherwise('/');
  });
