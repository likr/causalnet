import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/lib/paper'
import layoutGraph from '../utils/layout-graph'
import uniqueId from '../utils/unique-id'
import SemVertex from './sem-vertex'
import SemEdge from './sem-edge'

class Sem extends React.Component {
  render() {
    const {vertices, edges} = layoutGraph(this.props.graph, {
      layerMargin: 60,
      vertexMargin: 30
    });
    return (
      <Paper
        style={{
          top: 20,
          right: 20,
          position: 'absolute',
          width: 500,
          padding: 10
        }}>
        <div
          style={{
            width: '100%',
            height: 300
          }}>
          <svg width="100%" height="100%">
            <g transform="translate(165,10)">
              <g>
                {edges.map((d) => <SemEdge key={`${uniqueId(d.u)}:${uniqueId(d.v)}`} {...d}/>)}
              </g>
              <g>
                {vertices.map((d) => <SemVertex key={uniqueId(d.u)} {...d}/>)}
              </g>
            </g>
          </svg>
        </div>
        <div>
          <table className="table table-bordered">
            <tbody>
              {this.props.attrs.map(({name, value}, i) => (
                <tr key={i}>
                  <th>{name}</th>
                  <td>{value.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    );
  }
}

export default connect((state) => ({graph: state.data.semGraph, attrs: state.data.semAttributes}))(Sem)
