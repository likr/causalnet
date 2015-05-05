'use strict';

import angular from 'angular';
import d3 from 'd3';
import Graph from 'eg-graph/lib/graph';
import Renderer from 'eg-graph/lib/renderer';
import CircleVertexRenderer from 'eg-graph/lib/renderer/vertex-renderer/circle-vertex-renderer';

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
        const g = scope.graph;
        const params = scope.params;

        const r = 10;
        const vertexColor = d3.scale.category20();
        const renderer = new Renderer()
          .vertexRenderer(new CircleVertexRenderer())
          // .vertexVisibility(({u}) => {
          //   if (g.inVertices(u).some((v) => g.edge(v, u).r > params.rMin)) {
          //     return true;
          //   }
          //   if (g.outVertices(u).some((v) => g.edge(u, v).r > params.rMin)) {
          //     return true;
          //   }
          //   return false;
          // })
          .edgeVisibility(({d}) => d.r > params.rMin);
        renderer.vertexRenderer()
          .vertexColor(({d}) => vertexColor(d.nameGroup))
          .r(r);
        renderer.edgeRenderer()
          .edgeColor(({ud, vd}) => {
            if (ud.nameGroup === vd.nameGroup) {
              return vertexColor(ud.nameGroup);
            } else {
              return 'black';
            }
          })
          .edgeOpacity(({d}) => Math.abs(d.r));

        renderer.layouter()
          .layerAssignment(new ConstantLayerAssignment(g))
          .layerMargin(1000)
          .vertexWidth(() => r * 2)
          .vertexHeight(() => r * 2);

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
          .call(zoom);

        d3.select(window)
          .on('resize', () => {
            svg.attr({
              width: element[0].clientWidth,
              height: element[0].clientHeight
            });
        });

        const draw = () => {
          svg.transition()
            .delay(500)
            .duration(500)
            .call(renderer.render());
        };

        scope.$watch('params.rMin', draw);
      },
      restrict: 'E',
      scope: {
        graph: '=',
        params: '='
      }
    };
  });
