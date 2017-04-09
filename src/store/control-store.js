import Rx from 'rxjs/Rx'
import {
  DATA_CHANGE_BICLUSTERING_OPTION,
  DATA_TOGGLE_CELL,
  DATA_TOGGLE_LAYER,
  DATA_TOGGLE_VARIABLE_TYPE,
  DATA_SELECT_ALL_CELLS,
  DATA_UNSELECT_ALL_CELLS,
  DATA_SELECT_ALL_LAYERS,
  DATA_UNSELECT_ALL_LAYERS,
  DATA_SELECT_ALL_VARIABLE_TYPES,
  DATA_UNSELECT_ALL_VARIABLE_TYPES,
  DATA_UPDATE_EPSILON,
  DATA_UPDATE_THRESHOLD
} from '../constants'

const load = (state, data) => {
  state.cells = data.cells.map(({name}) => ({
    name,
    count: data.vertices.filter(({d}) => d.cells.includes(name)).length,
    checked: true
  }))
  state.layers = data.layers.map(({name}) => ({
    name,
    count: data.vertices.filter(({d}) => d.layer === name).length,
    checked: true
  }))
  state.variableTypes = data.variableTypes.map(({name, color}) => ({
    name,
    color,
    count: data.vertices.filter(({d}) => d.variableType === name).length,
    checked: true
  }))
}

const toggleItem = (items, name) => {
  for (const item of items) {
    if (item.name === name) {
      item.checked = !item.checked
    }
  }
}

const selectAll = (items) => {
  for (const item of items) {
    item.checked = true
  }
}

const unselectAll = (items) => {
  for (const item of items) {
    item.checked = false
  }
}

const store = (intentSubject, dataSubject) => {
  const state = {
    rThreshold: 0.6,
    epsilon: 0.5,
    cells: [],
    layers: [],
    variableTypes: [],
    biclusteringOption: 'none'
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  Rx.Observable.zip(intentSubject, dataSubject).subscribe(([payload, data]) => {
    if (data.changed) {
      load(state, data.state)
    }

    switch (payload.type) {
      case DATA_CHANGE_BICLUSTERING_OPTION:
        state.biclusteringOption = payload.option
        subject.next({state, changed: true})
        break
      case DATA_TOGGLE_CELL:
        toggleItem(state.cells, payload.name)
        subject.next({state, changed: true})
        break
      case DATA_TOGGLE_LAYER:
        toggleItem(state.layers, payload.name)
        subject.next({state, changed: true})
        break
      case DATA_TOGGLE_VARIABLE_TYPE:
        toggleItem(state.variableTypes, payload.name)
        subject.next({state, changed: true})
        break
      case DATA_SELECT_ALL_CELLS:
        selectAll(state.cells)
        subject.next({state, changed: true})
        break
      case DATA_UNSELECT_ALL_CELLS:
        unselectAll(state.cells)
        subject.next({state, changed: true})
        break
      case DATA_SELECT_ALL_LAYERS:
        selectAll(state.layers)
        subject.next({state, changed: true})
        break
      case DATA_UNSELECT_ALL_LAYERS:
        unselectAll(state.layers)
        subject.next({state, changed: true})
        break
      case DATA_SELECT_ALL_VARIABLE_TYPES:
        selectAll(state.variableTypes)
        subject.next({state, changed: true})
        break
      case DATA_UNSELECT_ALL_VARIABLE_TYPES:
        unselectAll(state.variableTypes)
        subject.next({state, changed: true})
        break
      case DATA_UPDATE_EPSILON:
        state.epsilon = payload.value
        subject.next({state, changed: true})
        break
      case DATA_UPDATE_THRESHOLD:
        state.rThreshold = payload.rThreshold
        subject.next({state, changed: true})
        break
      default:
        subject.next({state, changed: false})
    }
  })

  return subject
}

export default store
