import React from 'react'
import Vertex from './vertex'
import Edge from './edge'
import zoom from './zoom'
import styles from './network-diagram.css'

let nextId = 0;
const uniqueIds = new Map();
const uniqueId = (u) => {
  if (uniqueIds.has(u)) {
    return uniqueIds.get(u);
  }
  uniqueIds.set(u, nextId);
  return nextId++;
};

const NetworkDiagramSvg = zoom(class extends React.Component {
  render() {
    const {x, y, scale} = this.props;
    return (
      <svg className={styles.networkDiagram} width="100%" height="100%">
        <g transform={`translate(${x},${y})scale(${scale})`}>
          {this.props.children}
        </g>
      </svg>
    );
  }
});

class NetworkDiagram extends React.Component {
  render() {
    const {vertices, edges} = this.props;
    return <NetworkDiagramSvg>
      <g>
        {edges.map((d) => (
          <Edge key={`${uniqueId(d.u)}:${uniqueId(d.v)}`} {...d}/>
        ))}
      </g>
      <g>
        {vertices.map((d) => (
          <Vertex key={uniqueId(d.u)} {...d}/>
        ))}
      </g>
    </NetworkDiagramSvg>
  }
}

export default NetworkDiagram
