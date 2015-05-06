'use strict';

import angular from 'angular';

angular.module('riken')
  .directive('controlButtons', () => {
    return {
      restrict: 'E',
      scope: {
        params: '='
      },
      templateUrl: 'partials/control-buttons.html'
    };
  });
