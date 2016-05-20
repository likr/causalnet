import Rx from 'rxjs/Rx'
import {
  DATA_CLEAR_FILTER,
  DATA_FILTER_VERTICES
} from '../constants'

const store = (intentSubject, selectionSubject) => {
  const state = {
    filteredVertices: new Set()
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  Rx.Observable.zip(intentSubject, selectionSubject)
    .subscribe(([payload, selection]) => {
      switch (payload.type) {
        case DATA_CLEAR_FILTER:
          state.filteredVertices.clear()
          subject.next({state, changed: true})
          break
        case DATA_FILTER_VERTICES:
          state.filteredVertices = new Set(selection.state.selectedVertices)
          for (const [u, count] of selection.state.selectedVertexNeighbors) {
            if (count > 0) {
              state.filteredVertices.add(u)
            }
          }
          subject.next({state, changed: true})
          break
        default:
          subject.next({state, changed: false})
      }
    })

  return subject
}

export default store
