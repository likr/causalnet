import d3 from 'd3'
import Rx from 'rxjs/Rx'
import {
  DATA_LOAD
} from '../constants'

const load = (state, {vertices, edges, cells, layers, variableTypes}) => {
  const color = d3.scale.category20()
  for (const name of variableTypes) {
    color(name)
  }
  for (const vertex of vertices) {
    vertex.d.color = color(vertex.d.variableType)
  }
  Object.assign(state, {
    vertices,
    edges,
    cells: cells.map((name) => ({name})),
    layers: layers.map((name) => ({name})),
    variableTypes: variableTypes.map((name) => ({name, color: color(name)}))
  })
}

const store = (intentSubject) => {
  const state = {
    vertices: [],
    edges: [],
    cells: [],
    layers: [],
    variableTypes: []
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  intentSubject.subscribe((payload) => {
    switch (payload.type) {
      case DATA_LOAD:
        load(state, payload.data)
        subject.next({state, changed: true})
        break
      default:
        subject.next({state, changed: false})
    }
  })

  return subject
}

export default store
