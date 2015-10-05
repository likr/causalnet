import angular from 'angular';
import d3 from 'd3';
import downloadable from 'd3-downloadable';
import transformer from 'egraph/lib/transformer';
import Renderer from 'd3-egraph';

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
    for (let i = 0; i < n; ++i) {
      for (const u of h[i]) {
        layers[u] = i;
      }
    }

    return layers;
  }
}


angular.module('riken')
  .directive('network', ($window, $modal, r, edgeOpacity, CircleVertexRenderer) => {
    return {
      link: (scope, element) => {
        const g = scope.graph;
        const params = scope.params;

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
                if (d.group !== group && params.groups[nameGroup] && params.layers[group] && Math.abs(g.edge(v, u).r) >= params.rMin) {
                  return true;
                }
              }
              for (const v of g.outVertices(u)) {
                const {nameGroup, group} = g.vertex(v);
                if (d.group !== group && params.groups[nameGroup] && params.layers[group] && Math.abs(g.edge(u, v).r) >= params.rMin) {
                  return true;
                }
              }
            }
            return false;
          })
          .edgeVisibility(({u, v, d}) => {
            return g.vertex(u).group !== g.vertex(v).group && Math.abs(d.r) >= params.rMin;
          });
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
        const renderer = new Renderer();
        renderer
          .vertexRenderer(new CircleVertexRenderer(g))
          .transformer(pipeTransformer1);
        renderer.vertexRenderer()
          .vertexColor(({d}) => d.nameGroupColor)
          .r(r);
        renderer.edgeRenderer()
          .ltor(true)
          .edgeColor(({ud, vd}) => {
            if (ud.nameGroup === vd.nameGroup) {
              return ud.nameGroupColor;
            } else {
              return '#888';
            }
          })
          .edgeOpacity(({ud, vd}) => ud.selected || vd.selected ? 1 : edgeOpacity);

        renderer.layouter()
          .ltor(true)
          .layerAssignment(layerAssignment)
          .layerMargin(250)
          .vertexMargin(5)
          .edgeMargin(5)
          .vertexWidth(() => r * 2)
          .vertexHeight(() => r * 2)
          .edgeWidth(() => 3);

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

        d3.select($window)
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
              .delay(1000)
              .duration(800)
              .call(renderer.render());
          }
        };

        scope.$watch('params.rMin', draw);
        scope.$watch('params.showAll', draw);
        scope.$watch('params.edgeConcentration', draw);
        scope.$watchCollection('params.groups', draw);
        scope.$watchCollection('params.layers', draw);
        svg.call(renderer.render());

        scope.$on('update-graph', () => {
          svg.call(renderer.render());
        });

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
