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
    let n = 0;
    for (const u of gCopy.vertices()) {
      n = Math.max(n, this.g.vertex(u).groupOrder + 1);
    }

    const h = [];
    for (let i = 0; i < n; ++i) {
      h.push([]);
    }

    for (const u of gCopy.vertices()) {
      h[this.g.vertex(u).groupOrder].push(u);
    }

    const layers = {};
    let index = 0;
    for (let i = 0; i < n; ++i) {
      if (h[i].length > 0) {
        for (const u of h[i]) {
          layers[u] = index;
        }
        index += 1;
      }
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
        const renderer = new Renderer()
          .vertexRenderer(new CircleVertexRenderer())
          .vertexVisibility(({u, d}) => {
            if (!params.groups[d.nameGroup] || !params.layers[d.group]) {
              return false;
            }
            for (const v of g.inVertices(u)) {
              const {nameGroup, group} = g.vertex(v);
              if (params.groups[nameGroup] && params.layers[group] && g.edge(v, u).r >= params.rMin) {
                return true;
              }
            }
            for (const v of g.outVertices(u)) {
              const {nameGroup, group} = g.vertex(v);
              if (params.groups[nameGroup] && params.layers[group] && g.edge(u, v).r >= params.rMin) {
                return true;
              }
            }
            return false;
          })
          .edgeVisibility(({d}) => d.r >= params.rMin);
        renderer.vertexRenderer()
          .vertexColor(({d}) => d.nameGroupColor)
          .r(r);
        renderer.edgeRenderer()
          .edgeColor(({ud, vd}) => {
            if (ud.nameGroup === vd.nameGroup) {
              return ud.nameGroupColor;
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
        scope.$watchCollection('params.groups', draw);
        scope.$watchCollection('params.layers', draw);
      },
      restrict: 'E',
      scope: {
        graph: '=',
        params: '='
      }
    };
  });
