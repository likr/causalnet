'use strict';

import angular from 'angular';
import d3 from 'd3';
import downloadable from 'd3-downloadable';
import Graph from 'eg-graph/lib/graph';
import copy from 'eg-graph/lib/graph/copy';
import Renderer from 'eg-graph/lib/renderer';
import CircleVertexRenderer from 'eg-graph/lib/renderer/vertex-renderer/circle-vertex-renderer';
import vertexFunction from 'eg-graph/lib/renderer/vertex-function';
import layerMatrix from 'eg-graph/lib/layouter/sugiyama/misc/layer-matrix';
import transformer from 'eg-graph/lib/transformer';

const edgeOpacity = 0.2;
const vertexOpacity = 1;

class ConstantLayerAssignment {
  constructor(g) {
    this.g = g;
  }

  call(gCopy) {
    let n = 0;
    for (const u of gCopy.vertices()) {
      if (this.g.vertex(u)) {
        n = Math.max(n, this.g.vertex(u).groupOrder * 2 + 1);
      }
    }

    const h = [];
    for (let i = 0; i < n; ++i) {
      h.push([]);
    }

    for (const u of gCopy.vertices()) {
      if (this.g.vertex(u)) {
        h[this.g.vertex(u).groupOrder * 2].push(u);
      } else {
        h[this.g.vertex(gCopy.inVertices(u)[0]).groupOrder * 2 + 1].push(u);
      }
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
          element
            .attr('transform', d => `translate(${d.px},${d.py})`);

          element.append('circle')
            .attr({
              r: r,
              opacity: vertexOpacity,
              fill: vertexFunction(vertexColor)
            });

          element.append('text')
            .text((d) => d.data.name)
            .attr({
              dx: r,
              dy: r,
              fill: vertexFunction(vertexColor),
              transform: 'rotate(30)',
              'font-weight': 'bold'
            });

          element.on('click', (a, b, c) => {
            data.data.selected = !data.data.selected;
            d3.selectAll('g.vertex circle')
              .attr('opacity', (d) => d.data.selected ? 1 : vertexOpacity);
            d3.selectAll('g.edge path')
              .attr('opacity', (d) => d.source.data.selected || d.target.data.selected ? 1 : edgeOpacity);
          });
        }
      });

      selection
        .attr('transform', d => `translate(${d.x},${d.y})`);
      selection.select('circle')
        .attr({
          r: r,
          opacity: (d) => d.data.selected ? 1 : vertexOpacity,
          fill: vertexFunction(vertexColor)
        });
      selection.select('text')
        .attr({
          dx: r,
          dy: r,
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
        const layerAssignment = new ConstantLayerAssignment(g);
        const copyTransformer = new transformer.CopyTransformer();
        const coarseGrainingTransformer = new transformer.CoarseGrainingTransformer()
          .vertexVisibility(({u, d}) => {
            if (!params.groups[d.nameGroup] || !params.layers[d.group]) {
              return false;
            }
            if (params.showAll) {
              return true;
            } else {
              for (const v of g.inVertices(u)) {
                const {nameGroup, group} = g.vertex(v);
                if (params.groups[nameGroup] && params.layers[group] && Math.abs(g.edge(v, u).r) >= params.rMin) {
                  return true;
                }
              }
              for (const v of g.outVertices(u)) {
                const {nameGroup, group} = g.vertex(v);
                if (params.groups[nameGroup] && params.layers[group] && Math.abs(g.edge(u, v).r) >= params.rMin) {
                  return true;
                }
              }
            }
            return false;
          })
          .edgeVisibility(({d}) => Math.abs(d.r) >= params.rMin);
        const edgeConcentrationTransformer = new transformer.EdgeConcentrationTransformer()
          .layerAssignment(layerAssignment)
          .dummy(() => ({dummy: true, width: 0, height: 0, text: ''}));
        const pipeTransformer1 = new transformer.PipeTransformer(
            copyTransformer,
            coarseGrainingTransformer,
            edgeConcentrationTransformer);
        const pipeTransformer2 = new transformer.PipeTransformer(
            copyTransformer,
            coarseGrainingTransformer);
        const renderer = new Renderer()
          .vertexRenderer(new ExCircleVertexRenderer())
          .transformer(pipeTransformer1);
        renderer.vertexRenderer()
          .vertexColor(({d}) => d.nameGroupColor)
          .r(r);
        renderer.edgeRenderer()
          .ltor(false)
          .edgeColor(({ud, vd}) => {
            if (ud.nameGroup === vd.nameGroup) {
              return ud.nameGroupColor;
            } else {
              return '#888';
            }
          })
          .edgeOpacity(({ud, vd}) => ud.selected || vd.selected ? 1 : edgeOpacity);

        renderer.layouter()
          .ltor(false)
          .layerAssignment(layerAssignment)
          .layerMargin(10)
          .vertexMargin(200)
          .edgeMargin(5)
          .vertexWidth(() => r * 2)
          .vertexHeight(() => r * 2)
          .edgeWidth(() => 3);
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
          .call(zoom)
          .call(downloadable().filename('riken'));

        d3.select(window)
          .on('resize', () => {
            svg.attr({
              width: element[0].clientWidth,
              height: element[0].clientHeight
            });
        });

        const draw = (newValue, oldValue) => {
          if (newValue !== oldValue) {
            if (params.edgeConcentration) {
              renderer.transformer(pipeTransformer1);
            } else {
              renderer.transformer(pipeTransformer2);
            }
            svg.transition()
              .delay(500)
              .duration(500)
              .call(renderer.render());
          }
        };

        scope.$watch('params.rMin', draw);
        scope.$watch('params.showAll', draw);
        scope.$watch('params.edgeConcentration', draw);
        scope.$watchCollection('params.groups', draw);
        scope.$watchCollection('params.layers', draw);
        svg.call(renderer.render());

        d3.select('g.contents')
          .attr('transform', `translate(0,0)scale(0.4)`);
        zoom.translate([0, 0]).scale(0.4);
      },
      restrict: 'E',
      scope: {
        graph: '=',
        params: '='
      }
    };
  });
