'use strict';

import angular from 'angular';
import d3 from 'd3';
import Graph from 'eg-graph/lib/graph';
import Renderer from 'eg-graph/lib/renderer';

class ConstantLayerAssignment {
  constructor(g) {
    this.g = g;
  }

  call(gCopy) {
    const layers = {};
    for (const u of gCopy.vertices()) {
      layers[u] = this.g.vertex(u).groupOrder;
    }
    return layers;
  }
}

angular.module('riken')
  .directive('network', () => {
    return {
      link: (scope, element) => {
        const data = scope.data;

        const g = new Graph();
        data.nodes.forEach(node => {
          node.participants = [];
          g.addVertex(node);
        });
        data.links.forEach(link => {
          g.addEdge(link.source, link.target, {
            r: link.r
          });
        });

        const centrality = (u) => g.inDegree(u) + g.outDegree(u);
        const vertexColor = d3.scale.category20();
        const vertexScale = d3.scale.linear()
          .domain(d3.extent(g.vertices(), centrality))
          .range([2, 10]);
        const edgeWidthScale = d3.scale.linear()
          .domain(d3.extent(g.edges(), ([u, v]) => Math.abs(g.edge(u, v).r)))
          .range([3, 10]);
        const renderer = new Renderer()
          .vertexVisibility(({u}) => centrality(u) > 0);
        renderer.vertexRenderer()
          .vertexColor(({d}) => vertexColor(d.nameGroup))
          .vertexScale(({u}) => vertexScale(centrality(u)))
          .vertexText(({d}) => d.name);
        renderer.edgeRenderer()
          .edgeColor(({ud, vd}) => {
            if (ud.nameGroup === vd.nameGroup) {
              return vertexColor(ud.nameGroup);
            } else {
              return 'black';
            }
          });

        const sizes = renderer.vertexRenderer().calcSize(g);
        renderer.layouter()
          .layerAssignment(new ConstantLayerAssignment(g))
          .layerMargin(2000)
          .vertexWidth(({u}) => sizes[u].width)
          .vertexHeight(({u}) => sizes[u].height)
          .edgeWidth(({u, v}) => edgeWidthScale(Math.abs(g.edge(u, v).r)));

        // if (interactive) {
        //   renderer
        //     .vertexOpacity(() => '')
        //     .edgeOpacity(() => '');
        // } else {
        //   renderer
        //     .vertexOpacity(() => 1)
        //     .edgeOpacity(() => 1);
        // }
        const zoom = d3.behavior.zoom()
          .scaleExtent([0.05, 1])
          .on('zoom', () => {
            const e = d3.event;
            d3.select('g.contents')
              .attr('transform', `translate(${e.translate[0]},${e.translate[1]})scale(${e.scale})`);
          });

        const svg = d3.select(element[0]).append('svg')
          .attr({
            width: element[0].clientWidth,
            height: element[0].clientHeight
          })
          .datum(g)
          .call(renderer.render())
          .call(zoom)
          // .call(d3.downloadable({
          //   filename: 'bio',
          //   width: width,
          //   height: height
          // }))
          ;

        d3.select(window)
          .on('resize', () => {
            svg.attr({
              width: element[0].clientWidth,
              height: element[0].clientHeight
            });
    });
      },
      restrict: 'E',
      scope: {
        rankDir: '=',
        interactive: '=',
        data: '='
      }
    };
  });
