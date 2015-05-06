'use strict';

import angular from 'angular';
import d3 from 'd3';
import sem from 'semjs';
import Graph from 'eg-graph/lib/graph';

class MainController {
  constructor(columns, graph) {
    this.graph = graph;
    this.params = {
      rMin: 0.5,
      layers: {},
      groups: {},
      showAll: true
    };

    for (const column of columns) {
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
        columns: ($q) => {
          const color = d3.scale.category20();
          const groups = {
            '1 cell': 0,
            '1-2 cell': 1,
            '2 cell': 2,
            '2 cell-4 cell': 3,
            '4 cell': 4,
            '4 cell-8 cell': 5,
            '8 cell': 6
          };
          const deferred = $q.defer();
          d3.csv('data/columns.csv')
            .row(d => {
              d.nameGroup = d.name.split('_')[0];
              d.nameGroupColor = color(d.nameGroup);
              d.groupOrder = groups[d.group];
              return d;
            })
            .get((error, data) => {
              deferred.resolve(data);
            });
          return deferred.promise;
        },
        data: ($q) => {
          const deferred = $q.defer();
          d3.csv('data/data.csv')
            .row(d => {
              for (let key in d) {
                d[key] = +d[key];
              }
              return d;
            })
            .get((error, data) => {
              deferred.resolve(data);
            });
          return deferred.promise;
        },
        graph: (columns, data) => {
          const values = columns.map(column => {
                  return data.map(d => d[column.name]);
                }),
                r = sem.stats.corrcoef(values),
                n = columns.length;

          const graph = new Graph();
          for (const column of columns) {
            graph.addVertex(column);
          }
          for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
              if (columns[i].groupOrder < columns[j].groupOrder) {
                graph.addEdge(i, j, {
                  r: r[i][j]
                });
              } else if (columns[j].groupOrder < columns[i].groupOrder) {
                graph.addEdge(j, i, {
                  r: r[j][i]
                });
              }
            }
          }

          return graph;
        }
      },
      templateUrl: 'partials/main.html',
      url: '/'
    });
  })
  .controller('MainController', MainController);
