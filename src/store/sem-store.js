import Rx from 'rxjs/Rx'
import {
  DATA_ADD_VARIABLE,
  DATA_REMOVE_VARIABLE,
  DATA_SET_MODEL
} from '../constants'

const store = (intentSubject) => {
  const state = {
    vertices: [],
    edges: [],
    attributes: [],
    U: [],
    L: []
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  intentSubject.subscribe((payload) => {
    switch (payload.type) {
      case DATA_ADD_VARIABLE:
        subject.next({state, changed: true})
        break
      case DATA_REMOVE_VARIABLE:
        subject.next({state, changed: true})
        break
      case DATA_SET_MODEL:
        subject.next({state, changed: true})
        break
      default:
        subject.next({state, changed: false})
    }
  })

  return subject
}

export default store
