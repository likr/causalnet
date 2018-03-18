import Rx from 'rxjs/Rx'
import {
  DATA_LOAD,
  DATA_UPDATE_SEARCH_WORD
} from '../constants'

const filter = (texts, selectedVertices, searchWord) => {
  return texts.filter(({text}) => {
    return text.includes(searchWord) && selectedVertices.every((vertex) => {
      return vertex.d.cells.some((cell) => text.includes(cell))
    })
  })
}

const store = (intentSubject, selectionSubject, graphSubject) => {
  const state = {
    texts: [],
    origTexts: [],
    selectedCells: [],
    selectedVertices: [],
    searchWord: ''
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  Rx.Observable.zip(intentSubject, selectionSubject, graphSubject).subscribe(([payload, selection, graph]) => {
    if (selection.changed) {
      const selectedVertexIds = selection.state.selectedVertices
      state.selectedVertices = graph.state.vertices.filter(({u, d}) => selectedVertexIds.has(u) && d.cells)
      const selectedCells = new Set()
      for (const {d} of state.selectedVertices) {
        for (const cell of d.cells) {
          selectedCells.add(cell)
        }
      }
      state.selectedCells = Array.from(selectedCells)
      state.texts = filter(state.origTexts, state.selectedVertices, state.searchWord)
      subject.next({state, changed: true})
      return
    }
    switch (payload.type) {
      case DATA_LOAD:
        window.fetch('wormbase.json')
          .then((response) => response.json())
          .then((texts) => {
            const ids = new Set()
            const origTexts = texts.filter((row) => {
              const id = `${row.doc_id}:${row.line}`
              if (ids.has(id)) {
                return false
              }
              ids.add(id)
              return true
            })
            Object.assign(state, {texts: origTexts, origTexts})
            subject.next({state, changed: true})
          })
        break
      case DATA_UPDATE_SEARCH_WORD:
        state.searchWord = payload.searchWord
        state.texts = filter(state.origTexts, state.selectedVertices, state.searchWord)
        subject.next({state, changed: true})
        break
      default:
        subject.next({state, changed: false})
    }
  })

  return subject
}

export default store
