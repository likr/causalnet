import React from 'react'
import {connect} from 'react-redux'
import layoutGraph from '../utils/layout-graph'
import Vertex from './vertex'
import Edge from './edge'
import zoom from './zoom'

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
      <svg width="100%" height="100%" style={{cursor: 'move'}}>
        <g transform={`translate(${x},${y})scale(${scale})`}>
          {this.props.children}
        </g>
      </svg>
    );
  }
});

class NetworkDiagram extends React.Component {
  render() {
    const layout = layoutGraph(this.props.graph, {
      layerMargin: 80,
      vertexMargin: 5
    });
    return (
      <div
        style={{
          top: 0,
          bottom: 6,
          left: 0,
          right: 0,
          position: 'absolute'
        }}>
        <NetworkDiagramSvg>
          <g>
            {layout.edges.map((d) => (
              <Edge key={`${uniqueId(d.u)}:${uniqueId(d.v)}`} {...d}/>
            ))}
          </g>
          <g>
            {layout.vertices.map((d) => (
              <Vertex key={uniqueId(d.u)} {...d}/>
            ))}
          </g>
        </NetworkDiagramSvg>
      </div>
    );
  }
}

export default connect((state) => ({graph: state.data.filteredGraph}))(NetworkDiagram);
