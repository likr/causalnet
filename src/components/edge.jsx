import React from 'react'
import svgPath from '../utils/svg-path'

class Edge extends React.Component {
  render() {
    const {points} = this.props;
    return (
      <g>
        <path
          d={svgPath(points)}
          fill="none"
          stroke="#eee"
          strokeWidth="2"/>
      </g>
    );
  }
}

export default Edge
