import React from 'react'
import {connect} from 'react-redux'
import {init, toggle} from '../actions/sem-actions'

const selection = (state) => {
  return {
    semGraph: state.data.semGraph,
    graph: state.data.filteredGraph,
    allGraph: state.data.graph
  };
};

const Vertex = connect(selection)(class extends React.Component {
  render() {
    const {x, y, d} = this.props;
    const {name, color} = d;
    return (
      <g
        transform={`translate(${x},${y})`}
        onClick={::this.handleClick}
        style={{cursor: 'pointer'}}>
        <circle
          fill={color}
          r={5}/>
        <text
          x={7}
          y={5}
          fill={color}
          fontSize="10pt">
          {name}
        </text>
      </g>
    );
  }

  handleClick() {
    const {dispatch, graph, allGraph, semGraph, u, d} = this.props;
    if (d.dummy) {
      dispatch(init(graph, u, allGraph));
    } else {
      dispatch(toggle(semGraph, graph, u, allGraph));
    }
  }
});

export default Vertex
