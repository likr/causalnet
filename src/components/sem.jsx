import React from 'react'
import SemVertex from './sem-vertex'
import SemEdge from './sem-edge'
import sem from '../utils/sem'

const average = (x) => {
  let sum = 0
  for (const xi of x) {
    sum += xi
  }
  return sum / x.length
}

const corcoef = (x, xBar, y, yBar) => {
  let xx = 0
  let yy = 0
  let xy = 0
  for (let i = 0; i < x.length; ++i) {
    const xi = x[i] - xBar
    const yi = y[i] - yBar
    xx += xi * xi
    yy += yi * yi
    xy += xi * yi
  }
  return xy / Math.sqrt(xx * yy)
}

const makeMatrix = (n, alpha) => {
  const A = new Array(n)
  for (let i = 0; i < n; ++i) {
    A[i] = new Array(n)
  }
  for (const [i, j, v] of alpha) {
    A[i][j] = v
  }
  return A
}

class Sem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vertices: [],
      edges: [],
      attributes: []
    }
  }

  componentWillMount () {
    const {vertices, edges} = this.props
    const n = vertices.length
    const idMap = new Map(vertices.map(({u}, i) => [u, i]))
    const alpha = edges.map(({u, v}) => [idMap.get(u), idMap.get(v)])
    const sigma = vertices.map(({u}) => [idMap.get(u), idMap.get(u)])
    const observedVariables = vertices.filter(({d}) => !d.dummy)
    const S = observedVariables.map(() => new Array(observedVariables.length))
    const averages = observedVariables.map(({d}) => average(d.data))
    for (let i = 0; i < observedVariables.length; ++i) {
      const data1 = observedVariables[i].d.data
      const avg1 = averages[i]
      for (let j = 0; j < observedVariables.length; ++j) {
        const data2 = observedVariables[j].d.data
        const avg2 = averages[j]
        S[i][j] = S[j][i] = corcoef(data1, avg1, data2, avg2)
      }
    }
    sem(n, alpha, sigma, S, [], []).subscribe(({alpha, attributes}) => {
      const A = makeMatrix(n, alpha)
      for (const {u, v, d} of edges) {
        d.path = A[idMap.get(u)][idMap.get(v)]
      }
      this.setState({
        vertices,
        edges,
        attributes
      })
    })
  }

  render () {
    const {vertices, edges, attributes} = this.state
    return <div>
      <div>
        <table>
          <thead>
            <tr><th>Name</th><th>Value</th></tr>
          </thead>
          <tbody>{
            attributes.map(({name, value}) => {
              return <tr key={name}><td>{name}</td><td>{value.toFixed(3)}</td></tr>
            })
          }</tbody>
        </table>
      </div>
      <div>
        <svg width='5000' height='2000'>
          <g transform='translate(10,10)'>
            <g>{edges.map((d) => <SemEdge key={`${d.u}:${d.v}`} {...d} />)}</g>
            <g>{vertices.map((d) => <SemVertex key={d.u} {...d} />)}</g>
          </g>
        </svg>
      </div>
    </div>
  }
}

export default Sem
