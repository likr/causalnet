'use strict';

import angular from 'angular';
import d3 from 'd3';

const dialogTemplate = `
<div class="modal-header">
  <h3>Select File</h3>
</div>
<div class="modal-body">
  <form>
    <div class="form-group">
      <input type="file" file-model="jsonFile">
    </div>
  </form>
</div>
<div class="modal-footer">
  <button class="btn btn-default" ng-click="cancel()">Cancel</button>
  <button class="btn btn-danger" ng-click="ok(jsonFile)">OK</button>
</div>
`;

angular.module('riken')
  .directive('fileModel', ['$parse', ($parse) => {
    return {
      restrict: 'A',
      link: (scope, element, attrs) => {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', () => {
          scope.$apply(() => {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);

angular.module('riken')
  .directive('control', () => {
    return {
      controller: ($scope, $modal) => {
        $scope.loadFile = () => {
          $modal
            .open({
              controller: ($scope, $modalInstance) => {
                $scope.ok = (file) => {
                  if (file) {
                    $modalInstance.close(file);
                  } else {
                    $modalInstance.dismiss();
                  }
                };

                $scope.cancel = () => {
                  $modalInstance.dismiss();
                };
              },
              template: dialogTemplate
            })
            .result
            .then((file) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                $scope.onLoadFile(JSON.parse(e.target.result));
              };
              reader.readAsText(file);
            });
        };

        $scope.exportGraph = ($event) => {
          const graph = $scope.graph;
          console.log($event.currentTarget);
          $event.currentTarget.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(graph.toString())}`);
          $event.currentTarget.setAttribute('download', 'graph.json');
        };
      },
      link: (scope, element) => {
        const params = scope.params;
        scope.rmin = params.rMin;

        const color = d3.scale.category20();
        scope.groupColor = {};
        scope.$watchCollection('params.groups', () => {
          for (const key in params.groups) {
            scope.groupColor[key] = color(key);
          }
        });

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
        params: '=',
        onLoadFile: '='
      },
      templateUrl: 'partials/control.html'
    };
  });
