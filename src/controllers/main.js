'use strict';

import angular from 'angular';
import d3 from 'd3';
import sem from 'semjs';
import Graph from 'eg-graph/lib/graph';

class MainController {
  constructor(graph) {
    this.graph = graph;
    this.params = {
      rMin: 0.6,
      layers: {},
      groups: {},
      showAll: false,
      edgeConcentration: true
    };

    for (const u of graph.vertices()) {
      const column = graph.vertex(u);
      if (this.params.layers[column.group] === void 0) {
        this.params.layers[column.group] = true;
      }
      if (this.params.groups[column.nameGroup] === void 0) {
        this.params.groups[column.nameGroup] = true;
      }
    }
  }
}

angular.module('riken')
  .config($stateProvider => {
    $stateProvider.state('main', {
      controller: 'MainController',
      controllerAs: 'main',
      resolve: {
        graph: ($http) => {
          const color = d3.scale.category20();
          return $http.get('data/data.json')
            .then(({data}) => {
              const graph = new Graph();
              for (const {u, d} of data.vertices) {
                d.nameGroupColor = color(d.nameGroup);
                graph.addVertex(u, d);
              }
              for (const {u, v, d} of data.edges) {
                graph.addEdge(u, v, d);
              }
              return graph;
            });
        }
      },
      templateUrl: 'partials/main.html',
      url: '/'
    });
  })
  .controller('MainController', MainController);
