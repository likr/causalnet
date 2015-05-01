'use strict';

import angular from 'angular';
import d3 from 'd3';
import graph from 'eg-graph/lib/graph';
import Renderer from 'eg-graph/lib/renderer';

angular.module('riken')
  .directive('network', () => {
    return {
      link: (scope, element) => {
        var data = scope.data;
        // var interactive = scope.interactive || false;
        console.log(scope);

        var g = graph();
        data.nodes.forEach(node => {
          node.participants = [];
          g.addVertex(node);
        });
        data.links.forEach(link => {
          g.addEdge(link.source, link.target, {
            r: link.r
          });
        });

        // var centralities = {};
        var vertexColor = d3.scale.category20();
        // var vertexScale = d3.scale.linear()
        //   .domain(d3.extent(g.vertices(), u => centralities[u]))
        //   .range([2, 10]);
        // var edgeWidthScale = d3.scale.linear()
        //   .domain(d3.extent(g.edges(), edge => Math.abs(g.get(edge[0], edge[1]).r)))
        //   .range([3, 10]);
        // var width = 1600;
        // var height = 800;
        var renderer = new Renderer()
          .vertexColor(({d}) => vertexColor(d.nameGroup))
          // .vertexScale((_, u) => vertexScale(centralities[u]))
          // .vertexStrokeWidth(() => 2)
          .vertexText(({d}) => d.name)
          // .vertexVisibility((_, u) => {
          //   return g.inEdges(u).length > 0 || g.outEdges(u).length > 0;
          // })
          // .edgeColor((u, v) => {
          //   if (g.get(u).nameGroup === g.get(v).nameGroup) {
          //     return vertexColor(g.get(u).nameGroup);
          //   } else {
          //     return 'black';
          //   }
          // })
          // .edgeWidth((u, v) => edgeWidthScale(Math.abs(g.get(u, v).r)))
          ;

        // if (interactive) {
        //   renderer
        //     .vertexOpacity(() => '')
        //     .edgeOpacity(() => '');
        // } else {
        //   renderer
        //     .vertexOpacity(() => 1)
        //     .edgeOpacity(() => 1);
        // }

        d3.select(element[0]).append('svg')
          .datum(g)
          .call(renderer.render())
          // .call(d3.downloadable({
          //   filename: 'bio',
          //   width: width,
          //   height: height
          // }))
          ;
      },
      restrict: 'E',
      scope: {
        rankDir: '=',
        interactive: '=',
        data: '='
      }
    };
  });
