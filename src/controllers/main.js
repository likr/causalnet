'use strict';

import angular from 'angular';
import d3 from 'd3';
import sem from 'semjs';
import Graph from 'eg-graph/lib/graph';

class MainController {
  constructor($scope, $modal) {
    this.$modal = $modal;
    this.graph = new Graph();
    this.params = {
      rMin: 0.65,
      layers: {},
      groups: {},
      showAll: false,
      edgeConcentration: true
    };

    this.handleLoadFile = (data) => {
      const color = d3.scale.category20();
      for (const {u, d} of data.vertices) {
        d.nameGroupColor = color(d.nameGroup);
        this.graph.addVertex(u, d);
      }
      for (const {u, v, d} of data.edges) {
        this.graph.addEdge(u, v, d);
      }

      for (const u of this.graph.vertices()) {
        const column = this.graph.vertex(u);
        if (this.params.layers[column.group] === void 0) {
          this.params.layers[column.group] = true;
        }
        if (this.params.groups[column.nameGroup] === void 0) {
          this.params.groups[column.nameGroup] = true;
        }
      }

      $scope.$broadcast('update-graph');
    };
  }

}

angular.module('riken')
  .config($stateProvider => {
    $stateProvider.state('main', {
      controller: 'MainController',
      controllerAs: 'main',
      templateUrl: 'partials/main.html',
      url: '/'
    });
  })
  .controller('MainController', MainController);
