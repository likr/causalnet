'use strict';

import angular from 'angular';
import d3 from 'd3';

angular.module('riken')
  .directive('control', () => {
    return {
      link: (scope, element) => {
        const params = scope.params;
        scope.rmin = params.rMin;

        const color = d3.scale.category20();
        scope.groupColor = {};
        for (const key in params.groups) {
          scope.groupColor[key] = color(key);
        }

        scope.updateRMin = () => {
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
