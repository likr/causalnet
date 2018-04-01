import Rx from 'rxjs/Rx'
import {
  DATA_ADD_VARIABLE,
  DATA_CHANGE_BICLUSTERING_OPTION,
  DATA_CLEAR_EDGE_HIGHLIGHT,
  DATA_CLEAR_FILTER,
  DATA_CLEAR_VERTEX_SELECTION,
  DATA_FILTER_VERTICES,
  DATA_HIGHLIGHT_NEIGHBORS,
  DATA_INIT,
  DATA_LOAD,
  DATA_REMOVE_VARIABLE,
  DATA_SET_MODEL,
  DATA_TOGGLE_CELL,
  DATA_TOGGLE_LAYER,
  DATA_TOGGLE_VARIABLE_TYPE,
  DATA_TOGGLE_VERTEX_SELECTION,
  DATA_SELECT_ALL_CELLS,
  DATA_UNSELECT_ALL_CELLS,
  DATA_SELECT_ALL_LAYERS,
  DATA_UNSELECT_ALL_LAYERS,
  DATA_SELECT_ALL_VARIABLE_TYPES,
  DATA_UNSELECT_ALL_VARIABLE_TYPES,
  DATA_UPDATE_EPSILON,
  DATA_UPDATE_SEARCH_WORD,
  DATA_UPDATE_THRESHOLD
} from '../constants'

export const intentSubject = new Rx.BehaviorSubject({type: DATA_INIT})

export const addVariable = (u) => {
  intentSubject.next({
    type: DATA_ADD_VARIABLE,
    u
  })
}

export const changeBiclusteringOption = (option) => {
  intentSubject.next({
    type: DATA_CHANGE_BICLUSTERING_OPTION,
    option
  })
}

export const clearEdgeHighlight = () => {
  intentSubject.next({
    type: DATA_CLEAR_EDGE_HIGHLIGHT
  })
}

export const clearFilter = () => {
  intentSubject.next({
    type: DATA_CLEAR_FILTER
  })
}

export const clearVertexSelection = () => {
  intentSubject.next({
    type: DATA_CLEAR_VERTEX_SELECTION
  })
}

export const filterVertices = () => {
  intentSubject.next({
    type: DATA_FILTER_VERTICES
  })
}

export const highlightNeighbors = (u) => {
  intentSubject.next({
    type: DATA_HIGHLIGHT_NEIGHBORS,
    u
  })
}

export const loadDataFromFile = (file) => {
  const reader = new window.FileReader()
  reader.onload = (event) => {
    intentSubject.next({
      type: DATA_LOAD,
      data: JSON.parse(event.target.result)
    })
  }
  reader.readAsText(file)
}

export const removeVariable = (u) => {
  intentSubject.next({
    type: DATA_REMOVE_VARIABLE,
    u
  })
}

export const setModel = (U, L) => {
  intentSubject.next({
    type: DATA_SET_MODEL,
    U,
    L
  })
}

export const toggleCell = (name) => {
  intentSubject.next({
    type: DATA_TOGGLE_CELL,
    name
  })
}

export const toggleLayer = (name) => {
  intentSubject.next({
    type: DATA_TOGGLE_LAYER,
    name
  })
}

export const toggleVariableType = (name) => {
  intentSubject.next({
    type: DATA_TOGGLE_VARIABLE_TYPE,
    name
  })
}

export const toggleVertexSelection = (u, neighbors) => {
  intentSubject.next({
    type: DATA_TOGGLE_VERTEX_SELECTION,
    u,
    neighbors
  })
}

export const selectAllCells = () => {
  intentSubject.next({
    type: DATA_SELECT_ALL_CELLS
  })
}

export const unselectAllCells = () => {
  intentSubject.next({
    type: DATA_UNSELECT_ALL_CELLS
  })
}

export const selectAllLayers = () => {
  intentSubject.next({
    type: DATA_SELECT_ALL_LAYERS
  })
}

export const unselectAllLayers = () => {
  intentSubject.next({
    type: DATA_UNSELECT_ALL_LAYERS
  })
}

export const selectAllVariableTypes = () => {
  intentSubject.next({
    type: DATA_SELECT_ALL_VARIABLE_TYPES
  })
}

export const unselectAllVariableTypes = () => {
  intentSubject.next({
    type: DATA_UNSELECT_ALL_VARIABLE_TYPES
  })
}

export const updateEpsilon = (value) => {
  intentSubject.next({
    type: DATA_UPDATE_EPSILON,
    value
  })
}

export const updateSearchWord = (searchWord) => {
  intentSubject.next({
    type: DATA_UPDATE_SEARCH_WORD,
    searchWord
  })
}

export const updateRThreshold = (rThreshold) => {
  intentSubject.next({
    type: DATA_UPDATE_THRESHOLD,
    rThreshold
  })
}
