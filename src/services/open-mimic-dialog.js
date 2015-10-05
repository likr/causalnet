import angular from 'angular'
import d3 from 'd3'
import Graph from 'egraph/lib/graph';
import Renderer from 'd3-egraph';
import BaseCircleVertexRenderer from 'd3-egraph/lib/vertex-renderer/circle-vertex-renderer';
import vertexFunction from 'd3-egraph/lib/vertex-function';
import sem from 'semjs';

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
          refX="10"
          refY="5"
          markerUnits="strokeWidth"
          preserveAspectRatio="none"
          markerWidth="4"
          markerHeight="6"
          orient="auto-start-reverse">
        <polygon points="0,0 0,10 10,5" fill="#888" id="ms"/>
      </marker>
      <g transform="translate(150,0)"></g>
      <g id="fit" transform="translate(100,20)"></g>
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

const dialogController = ($scope, $modalInstance, source, sink, g, renderer) => {
  const graph = new Graph();
  for (const {u, d} of source) {
    graph.addVertex(u, d);
  }
  for (const {u, d} of sink) {
    graph.addVertex(u, d);
  }
  const v = Symbol();
  graph.addVertex(v, {dummy: true});
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
        let index = 0;
        for (const node of source) {
          graph.edge(node.u, v).coef = res.alpha[index++][2];
        }
        for (const node of sink) {
          graph.edge(v, node.u).coef = res.alpha[index++][2];
        }
        const svg = d3.select('#dialog-screen g')
          .datum(graph)
          .call(renderer.render());
        svg.selectAll('g.vertex text')
          .attr({
            dx: ({key}) => graph.vertex(key) && graph.inVertices(key).length === 0 ? -12 : 12,
            dy: 5,
            'text-anchor': ({key}) => graph.vertex(key) && graph.inVertices(key).length === 0 ? 'end' : 'begin',
            'font-size': 'none',
            'font-weight': 'none'
          });
        svg.selectAll('g.edge path')
          .attr('marker-end', 'url(#m_ar)');
        svg.selectAll('g.edge')
          .append('text')
          .text(({data}) => data.coef.toString().substr(0, 4))
          .attr({
            x: ({points}) => (points[0][0] + points[points.length - 1][0]) / 2,
            y: ({points}) => (points[0][1] + points[points.length - 1][1]) / 2
          });
        d3.select('#fit')
          .selectAll('g.row')
          .data([
            {type: 'RMSEA', value: '0.000'},
            {type: 'SRMR', value: '0.000'},
            {type: 'GFI', value: '1.000'},
            {type: 'AGFI', value: '0.997'},
            {type: 'CFI', value: '1.000'},
            {type: 'NFI', value: '1.000'}
          ])
          .enter()
          .append('g')
          .classed('row', true)
          .attr('transform', (_, i) => `translate(0,${15 * i})`)
          .call((selection) => {
            selection.append('text')
              .attr('text-anchor', 'end')
              .text(({type}) => type);
            selection.append('text')
              .attr('text-anchor', 'begin')
              .attr('x', 10)
              .text(({value}) => value);
          });
      });
  });

  $scope.ok = () => {
    $modalInstance.close();
  };
};

angular.module('riken').factory('openMimicDialog', ($modal, r, vertexOpacity, edgeOpacity) => {
  class CircleVertexRenderer extends BaseCircleVertexRenderer {
    render() {
      return (selection) => {
        const vertexColor = this.vertexColor();
        selection.each(function () {
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
                transform: 'rotate(0)',
                'font-size': 20,
                'font-weight': 'bold'
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
            dx: r * 1.5,
            dy: r,
            fill: vertexFunction(vertexColor)
          });
      };
    }
  }

  return (g, gOrig, key) => {
    const renderer = new Renderer()
      .vertexRenderer(new CircleVertexRenderer());
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
      .layerMargin(150)
      .vertexMargin(40)
      .edgeMargin(5)
      .vertexWidth(() => r * 2)
      .vertexHeight(() => r * 2)
      .edgeWidth(() => 3);

    $modal.open({
      size: 'lg',
      controller: dialogController,
      template: dialogTemplate,
      resolve: {
        g: () => gOrig,
        renderer: () => renderer,
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
  };
});
