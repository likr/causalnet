/* eslint-env worker */

import Graph from 'egraph/lib/graph'
import Layouter from 'egraph/lib/layouter/sugiyama'
import layerAssignment from '../utils/layer-assignment'

const calcSize = (vertices) => {
  const left = Math.min(0, ...vertices.map(({x, width}) => x - width / 2));
  const right = Math.max(0, ...vertices.map(({x, width}) => x + width / 2));
  const top = Math.min(0, ...vertices.map(({y, height}) => y - height / 2));
  const bottom = Math.max(0, ...vertices.map(({y, height}) => y + height / 2));
  return {
    width: right - left,
    height: bottom - top,
  };
};

const layout = (graph, {layerMargin, vertexMargin}) => {
  const layouter = new Layouter()
    .layerAssignment(layerAssignment(graph))
    .layerMargin(layerMargin)
    .vertexWidth(() => 10)
    .vertexHeight(() => 10)
    .vertexMargin(vertexMargin)
    .edgeWidth(() => 2)
    .edgeMargin(1);
  const positions = layouter.layout(graph);

  const vertices = [];
  for (const u of graph.vertices()) {
    const d = graph.vertex(u);
    const {x, y, width, height} = positions.vertices[u];
    vertices.push({u, d, x, y, width, height});
  }

  const edges = [];
  for (const [u, v] of graph.edges()) {
    if (positions.edges[u][v]) {
      const d = graph.edge(u, v);
      const ud = graph.vertex(u);
      const vd = graph.vertex(v);
      const {points, width, reversed} = positions.edges[u][v];
      while (points.length < 6) {
        points.push(points[points.length - 1]);
      }
      edges.push({u, v, ud, vd, d, points, reversed, width});
    }
  }

  return Object.assign({vertices, edges}, calcSize(vertices));
};

onmessage = ({data}) => {
  const {vertices, edges, options} = data;
  const graph = new Graph();
  for (const {u, d} of vertices) {
    graph.addVertex(u, d);
  }
  for (const {u, v, d} of edges) {
    graph.addEdge(u, v, d);
  }
  postMessage(layout(graph, options));
};
