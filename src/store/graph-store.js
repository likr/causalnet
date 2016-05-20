import Rx from 'rxjs/Rx'

const update = (state, {vertices, edges, width, height}, {highlightedVertices, selectedVertices}) => {
  Object.assign(state, {
    vertices: vertices.map((vertex) => {
      return Object.assign({}, vertex, {
        highlighted: highlightedVertices.has(vertex.u),
        selected: selectedVertices.has(vertex.u)
      })
    }),
    edges: edges.map((edge) => {
      return Object.assign({}, edge, {
        highlighted: highlightedVertices.has(edge.u) || highlightedVertices.has(edge.v),
        selected: selectedVertices.has(edge.u) || selectedVertices.has(edge.v)
      })
    }),
    width,
    height
  })
}

const store = (layoutSubject, selectionSubject) => {
  const state = {
    vertices: [],
    edges: [],
    width: 0,
    height: 0
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  Rx.Observable.zip(layoutSubject, selectionSubject).subscribe(([layout, selection]) => {
    if (!layout.changed && !selection.changed) {
      subject.next({state, changed: false})
      return
    }

    update(state, layout.state, selection.state)
    subject.next({state, changed: true})
  })

  return subject
}

export default store
