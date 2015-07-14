'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import '../node_modules/angular-ui-bootstrap/ui-bootstrap';
import '../node_modules/angular-ui-bootstrap/ui-bootstrap-tpls';

angular.module('riken', [uiRouter, 'ui.bootstrap']);

angular.module('riken')
  .config($urlRouterProvider => {
    $urlRouterProvider.otherwise('/');
  });
