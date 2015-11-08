import React from 'react'
import {connect} from 'react-redux'
import {toggle} from '../actions/sem-actions'

const selection = (state) => {
  const {semGraph, filteredGraph, graph} = state.data;
  return {
    semGraph,
    graph: filteredGraph,
    allGraph: graph
  };
};

const Vertex = connect(selection)(class extends React.Component {
  render() {
    const {u, x, y, d} = this.props;
    const {name, color} = d;
    const right = this.props.graph.outDegree(u) === 0;
    return (
      <g
        onClick={::this.handleClick}
        transform={`translate(${x},${y})`}
        style={{cursor: 'pointer'}}>
        <circle
          fill={color}
          r={5}/>
        <text
          x={right ? 7 : -7}
          y={5}
          textAnchor={right ? 'start' : 'end'}
          fill={color}
          fontSize="10pt">
          {name}
        </text>
      </g>
    );
  }

  handleClick() {
    const {semGraph, graph, allGraph, u} = this.props;
    this.props.dispatch(toggle(semGraph, graph, u, allGraph));
  }
});

export default Vertex
