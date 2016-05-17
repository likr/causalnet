import React from 'react'
import Vertex from './vertex'
import Edge from './edge'
import zoom from './zoom'
import styles from './network-diagram.css'

const NetworkDiagramSvg = zoom(
  class extends React.Component {
    render () {
      const {x, y, scale} = this.props
      return <svg id='main-svg' className={styles.networkDiagram} width='100%' height='100%'>
        <g transform={`translate(${x},${y})scale(${scale})`}>
          {this.props.children}
        </g>
      </svg>
    }
  }
)

class NetworkDiagram extends React.Component {
  render () {
    const {vertices, edges} = this.props
    return <NetworkDiagramSvg>
      <g>
        {edges.map((d) => <Edge key={`${d.u}:${d.v}`} {...d} />)}
      </g>
      <g>
        {vertices.map((d) => <Vertex key={d.u} {...d} />)}
      </g>
    </NetworkDiagramSvg>
  }
}

export default NetworkDiagram
