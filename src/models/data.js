import d3 from 'd3'
import Rx from 'rx'
import {
  DATA_ADD_VARIABLE,
  DATA_CHANGE_BICLUSTERING_OPTION,
  DATA_LOAD,
  DATA_REMOVE_VARIABLE,
  DATA_SET_MODEL,
  DATA_TOGGLE_LAYER,
  DATA_TOGGLE_VARIABLE_TYPE,
  DATA_UPDATE_THRESHOLD
} from '../constants'
import {
  intentSubject
} from '../intents/data'
import layout from './layout'
import sem from './sem'

const variableTypeColor = d3.scale.category20()

const subject = new Rx.Subject()
const state = {
  rThreshold: 0.6,
  biclusteringOption: 'none',
  layers: [],
  variableTypes: [],
  vertices: [],
  edges: [],
  semVertices: [],
  semEdges: [],
  semAttributes: [],
  U: [],
  L: []
}

const filterGraph = (data, rThreshold, variableTypes, layers) => {
  const usedVariableTypes = new Set()
  for (const variableType of variableTypes) {
    if (variableType.checked) {
      usedVariableTypes.add(variableType.name)
    }
  }
  const usedLayers = new Set()
  for (const layer of layers) {
    if (layer.checked) {
      usedLayers.add(layer.name)
    }
  }

  const vertexMap = new Map(data.vertices
    .filter(({d}) => usedVariableTypes.has(d.variableType) && usedLayers.has(d.layer))
    .map(({u, d}) => [u, d]))
  const edges = data.edges.filter(({u, v, d}) => {
    const ud = vertexMap.get(u)
    const vd = vertexMap.get(v)
    return ud && vd && ud.layer !== vd.layer && Math.abs(d.r) >= rThreshold
  })

  const usedVertices = new Set()
  for (const {u, v} of edges) {
    usedVertices.add(u)
    usedVertices.add(v)
  }
  const vertices = data.vertices.filter(({u}) => usedVertices.has(u))
  return {vertices, edges}
}

const updateLayout = () => {
  const {data, rThreshold, variableTypes, layers, biclusteringOption} = state
  const graph = filterGraph(data, rThreshold, variableTypes, layers)
  layout(graph, biclusteringOption).subscribe(({vertices, edges}) => {
    for (const vertex of vertices) {
      vertex.d.color = variableTypeColor(vertex.d.variableType)
    }
    subject.onNext(Object.assign(state, {
      vertices,
      edges
    }))
  })
}

const updateSemLayout = (U, L, paths) => {
  const vertexMap = new Map(state.data.vertices.map(({u, d}) => [u, d]))
  const graph = {
    vertices: [],
    edges: []
  }
  const w = -1
  graph.vertices.push({u: w, d: {
    u: w,
    dummy: true
  }})
  for (const u of U) {
    graph.vertices.push({u, d: Object.assign({}, vertexMap.get(u), {
      layerOrder: 0
    })})
    graph.edges.push({u, v: w, d: {
      path: paths.get(u)
    }})
  }
  for (const u of L) {
    graph.vertices.push({u, d: Object.assign({}, vertexMap.get(u), {
      layerOrder: 1
    })})
    graph.edges.push({u: w, v: u, d: {
      path: paths.get(u)
    }})
  }

  layout(graph).subscribe(({vertices, edges}) => {
    for (const vertex of vertices) {
      vertex.d.color = variableTypeColor(vertex.d.variableType)
    }
    subject.onNext(Object.assign(state, {
      semVertices: vertices,
      semEdges: edges
    }))
  })
}

const calcSem = (U, L) => {
  const variables = U.concat(L)

  const n = U.length + L.length + 1
  const w = n - 1
  const alpha = []
  const sigma = []
  const S = variables.map(() => new Array(variables.length))
  const alphaFixed = []
  const sigmaFixed = []

  const variableSet = new Set(variables)
  const edges = state.data.edges.filter(({u, v}) => variableSet.has(u) && variableSet.has(v))
  const correlation = new Map(edges.map(({u, v, d}) => [`${u}:${v}`, d.r]))

  for (let i = 0; i < U.length; ++i) {
    alpha.push([i, w])
    sigmaFixed.push([i, i, 1])
    for (let j = i + 1; j < U.length; ++j) {
      sigma.push([i, j])
    }
  }
  alphaFixed.push([w, U.length, 1])
  sigma.push([U.length, U.length])
  for (let i = 1; i < L.length; ++i) {
    alpha.push([w, i + U.length])
    sigma.push([i + U.length, i + U.length])
  }

  for (let i = 0; i < variables.length; ++i) {
    const u = variables[i]
    for (let j = i + 1; j < variables.length; ++j) {
      const v = variables[j]
      S[j][i] = S[i][j] = correlation.get(`${u}:${v}`) || correlation.get(`${v}:${u}`)
    }
    S[i][i] = 1
  }

  sem(n, alpha, sigma, S, alphaFixed, sigmaFixed).subscribe((result) => {
    const paths = new Map(result.alpha.map(([i, j, v]) => i === w ? [L[j - U.length], v] : [U[i], v]))
    state.semAttributes = result.attributes
    updateSemLayout(U, L, paths)
  })
}

const addVariable = (u) => {
  const {U, L} = state
  const vertexMap = new Map(state.data.vertices.map(({u, d}) => [u, d]))
  const UOrder = U.length ? vertexMap.get(U[0]).layerOrder : 0
  if (vertexMap.get(u).layerOrder <= UOrder) {
    if (U.indexOf(u) === -1) {
      U.push(u)
    }
  } else {
    if (L.indexOf(u) === -1) {
      L.push(u)
    }
  }
  calcSem(U, L)
}

const changeBiclusteringOption = (option) => {
  state.biclusteringOption = option
  updateLayout()
}

const load = (data) => {
  state.data = data
  state.variableTypes = data.variableTypes.map((name) => ({
    name,
    color: variableTypeColor(name),
    checked: true
  }))
  state.layers = data.layers.map((name) => ({
    name,
    checked: true
  }))
  updateLayout()
}

const removeVariable = (u) => {
  state.U = state.U.filter((v) => u !== v)
  state.L = state.L.filter((v) => u !== v)
  calcSem(state.U, state.L)
}

const setModel = (U, L) => {
  state.U = Array.from(U)
  state.L = Array.from(L)
  calcSem(U, L)
}

const toggleLayer = (name) => {
  for (const layer of state.layers) {
    if (layer.name === name) {
      layer.checked = !layer.checked
    }
  }
  updateLayout()
}

const toggleVariableType = (name) => {
  for (const variableType of state.variableTypes) {
    if (variableType.name === name) {
      variableType.checked = !variableType.checked
    }
  }
  updateLayout()
}

const updateRThreshold = (rThreshold) => {
  state.rThreshold = rThreshold
  updateLayout()
}

intentSubject.subscribe((payload) => {
  switch (payload.type) {
    case DATA_ADD_VARIABLE:
      addVariable(payload.u)
      break
    case DATA_CHANGE_BICLUSTERING_OPTION:
      changeBiclusteringOption(payload.option)
      break
    case DATA_LOAD:
      load(payload.data)
      break
    case DATA_REMOVE_VARIABLE:
      removeVariable(payload.u)
      break
    case DATA_SET_MODEL:
      setModel(payload.U, payload.L)
      break
    case DATA_TOGGLE_LAYER:
      toggleLayer(payload.name)
      break
    case DATA_TOGGLE_VARIABLE_TYPE:
      toggleVariableType(payload.name)
      break
    case DATA_UPDATE_THRESHOLD:
      updateRThreshold(payload.rThreshold)
      break
  }
})

export default subject
