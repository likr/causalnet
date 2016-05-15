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

export const intentSubject = new Rx.Subject()

export const addVariable = (u) => {
  intentSubject.onNext({
    type: DATA_ADD_VARIABLE,
    u
  })
}

export const changeBiclusteringOption = (option) => {
  intentSubject.onNext({
    type: DATA_CHANGE_BICLUSTERING_OPTION,
    option
  })
}

export const loadDataFromFile = (file) => {
  const reader = new window.FileReader()
  reader.onload = (event) => {
    intentSubject.onNext({
      type: DATA_LOAD,
      data: JSON.parse(event.target.result)
    })
  }
  reader.readAsText(file)
}

export const removeVariable = (u) => {
  intentSubject.onNext({
    type: DATA_REMOVE_VARIABLE,
    u
  })
}

export const setModel = (U, L) => {
  intentSubject.onNext({
    type: DATA_SET_MODEL,
    U,
    L
  })
}

export const toggleLayer = (name) => {
  intentSubject.onNext({
    type: DATA_TOGGLE_LAYER,
    name
  })
}

export const toggleVariableType = (name) => {
  intentSubject.onNext({
    type: DATA_TOGGLE_VARIABLE_TYPE,
    name
  })
}

export const updateRThreshold = (rThreshold) => {
  intentSubject.onNext({
    type: DATA_UPDATE_THRESHOLD,
    rThreshold
  })
}
