import d3 from 'd3'
import Rx from 'rx'
import {
  DATA_LOAD,
  DATA_TOGGLE_LAYER,
  DATA_TOGGLE_VARIABLE_TYPE,
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

const filterGraph = (data, rThreshold, variableTypes, layers) => {
  const usedVariableTypes = new Set();
  for (const variableType of variableTypes) {
    if (variableType.checked) {
      usedVariableTypes.add(variableType.name);
    }
  }
  const usedLayers = new Set();
  for (const layer of layers) {
    if (layer.checked) {
      usedLayers.add(layer.name);
    }
  }

  const vertexMap = new Map(data.vertices
                            .filter(({d}) => usedVariableTypes.has(d.variableType) && usedLayers.has(d.layer))
                            .map(({u, d}) => [u, d]));
  const edges = data.edges.filter(({u, v, d}) => {
    const ud = vertexMap.get(u);
    const vd = vertexMap.get(v);
    return ud && vd && ud.layer !== vd.layer && Math.abs(d.r) >= rThreshold
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
  const {data, rThreshold, variableTypes, layers} = state;
  const graph = filterGraph(data, rThreshold, variableTypes, layers);
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
  state.variableTypes = data.variableTypes.map((name) => ({
    name,
    color: variableTypeColor(name),
    checked: true,
  }));
  state.layers = data.layers.map((name) => ({
    name,
    checked: true,
  }));
  updateLayout();
};

const toggleLayer = (name) => {
  for (const layer of state.layers) {
    if (layer.name === name) {
      layer.checked = !layer.checked;
    }
  }
  updateLayout();
};

const toggleVariableType = (name) => {
  for (const variableType of state.variableTypes) {
    if (variableType.name === name) {
      variableType.checked = !variableType.checked;
    }
  }
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
    case DATA_TOGGLE_LAYER:
      toggleLayer(payload.name);
      break;
    case DATA_TOGGLE_VARIABLE_TYPE:
      toggleVariableType(payload.name);
      break;
    case DATA_UPDATE_THRESHOLD:
      updateRThreshold(payload.rThreshold);
      break;
  }
});

export default subject
