'use strict';

import angular from 'angular';
import d3 from 'd3';
import Graph from 'eg-graph/lib/graph';
import Renderer from 'eg-graph/lib/renderer';
import CircleVertexRenderer from 'eg-graph/lib/renderer/vertex-renderer/circle-vertex-renderer';
import vertexFunction from 'eg-graph/lib/renderer/vertex-function';
import layerMatrix from 'eg-graph/lib/layouter/sugiyama/misc/layer-matrix';

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

class ExCircleVertexRenderer extends CircleVertexRenderer {
  render() {
    return (selection) => {
      const vertexColor = this.vertexColor(),
            r = this.r();
      selection.each(function (data) {
        const element = d3.select(this);
        if (element.select('circle').empty()) {
          element.append('circle')
            .attr({
              cx: d => d.px,
              cy: d => d.py,
              r: r,
              opacity: 0.5,
              fill: vertexFunction(vertexColor)
            });

          element.append('text')
            .text((d) => d.data.name)
            .attr({
              dx: r,
              x: (d) => d.px,
              y: (d) => d.py,
              fill: vertexFunction(vertexColor)
            });

          element.on('click', (a, b, c) => {
            data.data.selected = !data.data.selected;
            d3.selectAll('g.vertex circle')
              .attr('opacity', (d) => d.data.selected ? 1 : 0.5);
            d3.selectAll('g.edge path')
              .attr('opacity', (d) => d.source.data.selected || d.target.data.selected ? 1 : 0.4);
          });
        }
      });

      selection.select('circle')
        .attr({
          cx: d => d.x,
          cy: d => d.y,
          r: r,
          opacity: (d) => d.data.selected ? 1 : 0.5,
          fill: vertexFunction(vertexColor)
        });
      selection.select('text')
        .attr({
          dx: r,
          x: (d) => d.x,
          y: (d) => d.y,
          fill: vertexFunction(vertexColor)
        });
    };
  }
}


const baryCenter = (g, h1, h2, inverse=false) => {
  const centers = {},
        n = h1.length,
        m = h2.length,
        a = layerMatrix(g, h1, h2),
        cmp = (u, v) => {
          let d;
          return (d = centers[u] - centers[v]) === 0 ? u - v : d;
        };
  if (inverse) {
    for (let i = 0; i < n; ++i) {
      let sum = 0,
          count = 0;
      for (let j = 0; j < m; ++j) {
        const aij = a[i * m + j];
        count += aij;
        sum += j * aij;
      }
      centers[h1[i]] = count ? sum / count : Infinity;
    }
    h1.sort(cmp);
  } else {
    for (let j = 0; j < m; ++j) {
      let sum = 0,
          count = 0;
      for (let i = 0; i < n; ++i) {
        const aij = a[i * m + j];
        count += aij;
        sum += i * aij;
      }
      centers[h2[j]] = count ? sum / count : Infinity;
    }
    h2.sort(cmp);
  }
};

angular.module('riken')
  .directive('network', () => {
    return {
      link: (scope, element) => {
        const g = scope.graph;
        const params = scope.params;

        const r = 10;
        const renderer = new Renderer()
          .vertexRenderer(new ExCircleVertexRenderer())
          .vertexVisibility(({u, d}) => {
            if (!params.groups[d.nameGroup] || !params.layers[d.group]) {
              return false;
            }
            if (params.showAll) {
              return true;
            } else {
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
              return '#ccc';
            }
          })
          .edgeOpacity(({ud, vd}) => ud.selected || vd.selected ? 1 : 0.4);

        renderer.layouter()
          .layerAssignment(new ConstantLayerAssignment(g))
          .layerMargin(200)
          .vertexMargin(5)
          .edgeMargin(5)
          .vertexWidth(() => r * 2)
          .vertexHeight(() => r * 2);
        renderer.layouter()
          .crossingReduction()
          .method(baryCenter);

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
        scope.$watch('params.showAll', draw);
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
