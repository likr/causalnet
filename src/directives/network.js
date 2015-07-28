import angular from 'angular';
import d3 from 'd3';
import downloadable from 'd3-downloadable';
import sem from 'semjs';
import Graph from 'eg-graph/lib/graph';
import Renderer from 'eg-graph/lib/renderer';
import CircleVertexRenderer from 'eg-graph/lib/renderer/vertex-renderer/circle-vertex-renderer';
import vertexFunction from 'eg-graph/lib/renderer/vertex-function';
import layerMatrix from 'eg-graph/lib/layouter/sugiyama/misc/layer-matrix';
import transformer from 'eg-graph/lib/transformer';

const edgeOpacity = 0.5;
const vertexOpacity = 1;
const r = 10;

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

const dialogTemplate = `
<div class="modal-header">
  <h3>MIMIC Model</h3>
</div>
<div class="modal-body">
  <div style="width: 100%; height: 500px">
    <svg id="dialog-screen" width="100%" height="100%">
      <marker
          id="m_ar"
          viewBox="0 0 10 10"
          refX="5"
          refY="10"
          markerUnits="strokeWidth"
          preserveAspectRatio="none"
          markerWidth="6"
          markerHeight="4"
          orient="auto-start-reverse">
        <polygon points="0,0 10,0 5,10" fill="#888" id="ms"/>
      </marker>
    </svg>
  </div>
</div>
<div class="modal-footer">
  <button class="btn btn-default" ng-click="ok()">OK</button>
</div>
`;

const calcS = (g, source, sink) => {
  const S = [];
  const variables = source.concat(sink);
  for (const node1 of variables) {
    const u = node1.u;
    const row = [];
    for (const node2 of variables) {
      const v = node2.u;
      if (u === v) {
        row.push(1);
      } else if (g.edge(u, v)) {
        row.push(g.edge(u, v).r);
      } else {
        row.push(g.edge(v, u).r);
      }
    }
    S.push(row);
  }
  return S;
};

const dialogController = ($scope, $modalInstance, source, sink, g) => {

  const renderer = new Renderer()
    .vertexRenderer(new ExCircleVertexRenderer());
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
    .layerMargin(40)
    .vertexMargin(150)
    .edgeMargin(5)
    .vertexWidth(() => r * 2)
    .vertexHeight(() => r * 2)
    .edgeWidth(() => 3);
  renderer.layouter()
    .crossingReduction()
    .method(baryCenter);

  const graph = new Graph();
  for (const {u, d} of source) {
    graph.addVertex(u, d);
  }
  for (const {u, d} of sink) {
    graph.addVertex(u, d);
  }
  const v = graph.addVertex({dummy: true});
  for (const {u} of sink) {
    graph.addEdge(v, u);
  }
  for (const {u} of source) {
    graph.addEdge(u, v);
  }

  $modalInstance.rendered.then(() => {
    const S = calcS(g, source, sink);
    const alpha = [];
    const sigma = [];
    for (let i = 0; i < source.length; ++i) {
      alpha.push([i, source.length + sink.length]);
      for (let j = i; j < source.length; ++j) {
        sigma.push([i, j]);
      }
    }
    for (let i = source.length; i < sink.length + source.length; ++i) {
      alpha.push([source.length + sink.length, i]);
      sigma.push([i, i]);
    }
    sigma.push([source.length + sink.length, source.length + sink.length]);
    const solver = sem.solver();
    solver(source.length + sink.length + 1, alpha, sigma, S)
      .then(function(res) {
        console.log(res);
        let index = 0;
        for (const node of source) {
          graph.edge(node.u, v).coef = res.alpha[index++][2];
        }
        for (const node of sink) {
          graph.edge(v, node.u).coef = res.alpha[index++][2];
        }
        const svg = d3.select('#dialog-screen')
          .datum(graph)
          .call(renderer.render());
        svg.selectAll('g.vertex text')
          .attr('transform', 'rotate(20)');
        svg.selectAll('g.edge path')
          .attr('marker-end', 'url(#m_ar)');
        svg.selectAll('g.edge')
          .append('text')
          .text(({data}) => data.coef.toString().substr(0, 4))
          .attr({
            x: ({points}) => (points[0][0] + points[points.length - 1][0]) / 2,
            y: ({points}) => (points[0][1] + points[points.length - 1][1]) / 2
          });
      });
  });

  $scope.ok = () => {
    $modalInstance.close();
  };
};

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
  constructor($modal, gOrig) {
    super();
    this.$modal = $modal;
    this.gOrig = gOrig;
  }

  render() {
    return (selection) => {
      const vertexColor = this.vertexColor(),
            $modal = this.$modal,
            gOrig = this.gOrig;
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
              dx: r * 1.5,
              dy: r,
              fill: vertexFunction(vertexColor),
              transform: 'rotate(30)',
              'font-size': 20,
              'font-weight': 'bold'
            });

          if (data.data.dummy) {
            const {key, g} = data;
            element.on('click', () => {
              $modal.open({
                controller: dialogController,
                template: dialogTemplate,
                resolve: {
                  g: () => gOrig,
                  source: () => g.inVertices(key).map((u) => {
                    return {
                      u,
                      d: g.vertex(u)
                    };
                  }),
                  sink: () => g.outVertices(key).map((u) => {
                    return {
                      u,
                      d: g.vertex(u)
                    };
                  })
                }
              });
            });
          }
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
          dx: r * 1.5,
          dy: r,
          fill: vertexFunction(vertexColor)
        });
    };
  }
}

angular.module('riken')
  .directive('network', ($window, $modal) => {
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
          .vertexRenderer(new ExCircleVertexRenderer($modal, g))
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
          .layerMargin(20)
          .vertexMargin(150)
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
