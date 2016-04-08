import d3 from 'd3'
import Rx from 'rx'
import {
  DATA_LOAD,
  DATA_UPDATE_THRESHOLD,
} from '../constants'
import {intentSubject} from '../intents/data'
import layout from './layout'

const variableTypeColor = d3.scale.category20();

const subject = new Rx.Subject();
const state = {
  rThreshold: 0.6,
  layers: [],
  variableTypes: [],
  layout: {
    vertices: [],
    edges: [],
  },
};

const filterGraph = (data, rThreshold) => {
  const vertexMap = new Map(data.vertices.map(({u, d}) => [u, d]));
  const edges = data.edges.filter(({u, v, d}) => {
    const ud = vertexMap.get(u);
    const vd = vertexMap.get(v);
    return ud.group !== vd.group && Math.abs(d.r) >= rThreshold
  });
  const usedVertices = new Set();
  for (const {u, v} of edges) {
    usedVertices.add(u);
    usedVertices.add(v);
  }
  const vertices = data.vertices.filter(({u}) => usedVertices.has(u));
  const types = new Set();
  for (const {d} of data.vertices) {
    types.add(d.variableType);
  }
  return {vertices, edges};
};

const updateLayout = () => {
  const {rThreshold, variableTypes, layers} = state;
  const graph = filterGraph(state.data, rThreshold);
  layout(graph).subscribe(({vertices, edges}) => {
    state.layout.vertices = vertices;
    state.layout.edges = edges;
    for (const vertex of state.layout.vertices) {
      vertex.d.color = variableTypeColor(vertex.d.variableType);
    }
    subject.onNext({
      vertices,
      edges,
      variableTypes,
      layers,
      rThreshold,
    })
  });
};

const load = (data) => {
  state.data = data;
  state.variableTypes = data.variableTypes.map((name) => ({name, color: variableTypeColor(name)}));
  state.layers = data.layers.map((name) => ({name}));
  updateLayout();
};

const updateRThreshold = (rThreshold) => {
  state.rThreshold = rThreshold;
  updateLayout();
};

intentSubject.subscribe((payload) => {
  switch (payload.type) {
    case DATA_LOAD:
      load(payload.data);
      break;
    case DATA_UPDATE_THRESHOLD:
      updateRThreshold(payload.rThreshold);
      break;
  }
});

export default subject
