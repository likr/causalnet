import Rx from 'rxjs/Rx'
import {
  DATA_CLEAR_EDGE_HIGHLIGHT,
  DATA_CLEAR_VERTEX_SELECTION,
  DATA_HIGHLIGHT_NEIGHBORS,
  DATA_TOGGLE_VERTEX_SELECTION
} from '../constants'

const toggleVertex = (selectedVertices, selectedVertexNeighbors, u, neighbors) => {
  if (selectedVertices.has(u)) {
    selectedVertices.delete(u)
    for (const v of neighbors) {
      selectedVertexNeighbors.set(v, selectedVertexNeighbors.get(v) - 1)
    }
  } else {
    selectedVertices.add(u)
    for (const v of neighbors) {
      if (!selectedVertexNeighbors.has(v)) {
        selectedVertexNeighbors.set(v, 0)
      }
      selectedVertexNeighbors.set(v, selectedVertexNeighbors.get(v) + 1)
    }
  }
}

const store = (intentSubject) => {
  const state = {
    highlightedVertices: new Set(),
    selectedVertices: new Set(),
    selectedVertexNeighbors: new Map()
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  intentSubject.subscribe((payload) => {
    switch (payload.type) {
      case DATA_CLEAR_EDGE_HIGHLIGHT:
        state.highlightedVertices.clear()
        subject.next({state, changed: true})
        break
      case DATA_CLEAR_VERTEX_SELECTION:
        state.selectedVertices.clear()
        state.selectedVertexNeighbors.clear()
        subject.next({state, changed: true})
        break
      case DATA_HIGHLIGHT_NEIGHBORS:
        state.highlightedVertices.add(payload.u)
        subject.next({state, changed: true})
        break
      case DATA_TOGGLE_VERTEX_SELECTION:
        toggleVertex(state.selectedVertices, state.selectedVertexNeighbors, payload.u, payload.neighbors)
        subject.next({state, changed: true})
        break
      default:
        subject.next({state, changed: false})
    }
  })

  return subject
}

export default store
