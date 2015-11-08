import d3 from 'd3'
import Graph from 'egraph/lib/graph'
import copy from 'egraph/lib/graph/copy'
import EdgeConcentrationTransformer from 'egraph/lib/transformer/edge-concentration'
import {
  LOAD_DATA,
  UPDATE_SEM
} from '../action-types.js'
import layerAssignment from '../utils/layer-assignment'

const filterGraph = (g, rThreshold) => {
  const graph = copy(g);
  for (const [u, v] of graph.edges()) {
    const d = graph.edge(u, v);
    const ud = graph.vertex(u);
    const vd = graph.vertex(v);
    if (ud.group === vd.group || Math.abs(d.r) < rThreshold) {
      graph.removeEdge(u, v);
    }
  }
  for (const u of graph.vertices()) {
    if (graph.inDegree(u) === 0 && graph.outDegree(u) === 0) {
      graph.removeVertex(u);
    }
  }
  const transformer = new EdgeConcentrationTransformer()
    .layerAssignment(layerAssignment(graph))
    .dummy(() => ({
      dummy: true,
      width: 0,
      height: 0,
      name: '',
      color: '#444'
    }));
  return transformer.transform(graph);
};

const loadData = (prev, {data}) => {
  const {rThreshold} = prev;
  const color = d3.scale.category20();
  const groupSet = new Set();
  const layerSet = new Set();
  const graph = new Graph();
  for (const {u, d} of data.vertices) {
    graph.addVertex(u, Object.assign(d, {
      color: color(d.nameGroup)
    }));
    groupSet.add(d.nameGroup);
    layerSet.add(d.group);
  }
  for (const {u, v, d} of data.edges) {
    graph.addEdge(u, v, d);
  }
  const groups = Array.from(groupSet);
  groups.sort();
  const layers = Array.from(layerSet);
  layers.sort();
  return Object.assign({}, prev, {
    graph,
    filteredGraph: filterGraph(graph, rThreshold),
    groups: groups.map((group) => ({name: group, color: color(group)})),
    layers: layers.map((layer) => ({name: layer}))
  });
};

const updateSem = (prev, {semAttributes, semGraph}) => {
  return Object.assign({}, prev, {
    semAttributes,
    semGraph
  });
};

const dataReducer = (state = null, action) => {
  if (state === null) {
    state = {
      graph: new Graph(),
      filteredGraph: new Graph(),
      semGraph: new Graph(),
      semAttributes: [],
      groups: [],
      layers: [],
      rThreshold: 0.65
    };
  }

  switch (action.type) {
    case LOAD_DATA:
      return loadData(state, action);
    case UPDATE_SEM:
      return updateSem(state, action);
    default:
      return state;
  }
};

export default dataReducer
