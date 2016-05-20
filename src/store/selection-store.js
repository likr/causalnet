import Rx from 'rxjs/Rx'
import {
  DATA_CLEAR_EDGE_HIGHLIGHT,
  DATA_CLEAR_VERTEX_SELECTION,
  DATA_HIGHLIGHT_NEIGHBORS,
  DATA_TOGGLE_VERTEX_SELECTION
} from '../constants'

const toggleVertex = (selectedVertices, u) => {
  if (selectedVertices.has(u)) {
    selectedVertices.delete(u)
  } else {
    selectedVertices.add(u)
  }
}

const store = (intentSubject) => {
  const state = {
    highlightedVertices: new Set(),
    selectedVertices: new Set()
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
        subject.next({state, changed: true})
        break
      case DATA_HIGHLIGHT_NEIGHBORS:
        state.highlightedVertices.add(payload.u)
        subject.next({state, changed: true})
        break
      case DATA_TOGGLE_VERTEX_SELECTION:
        toggleVertex(state.selectedVertices, payload.u)
        subject.next({state, changed: true})
        break
      default:
        subject.next({state, changed: false})
    }
  })

  return subject
}

export default store
