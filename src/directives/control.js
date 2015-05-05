'use strict';

import angular from 'angular';
import d3 from 'd3';

angular.module('riken')
  .directive('control', () => {
    return {
      link: (scope, element) => {
        const params = scope.params;
        scope.rmin = params.rMin;

        scope.updateRMin = () => {
          console.log(scope);
          params.rMin = scope.rMin;
        };

        d3.select(element[0])
          .select('.rmin')
          .on('change', () => {
            scope.$apply(() => {
              params.rMin = scope.rmin;
            });
          });
      },
      restrict: 'E',
      scope: {
        params: '='
      },
      templateUrl: 'partials/control.html'
    };
  });
