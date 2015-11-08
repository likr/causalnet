import React from 'react'
import svgPath from '../utils/svg-path'

class SemEdge extends React.Component {
  render() {
    const {u, points, d} = this.props;
    const {c} = d;
    const right = typeof u === 'symbol';
    const [textX, textY] = right ? points[5] : points[0];
    return (
      <g>
        <path
          d={svgPath(points)}
          fill="none"
          stroke="#ccc"
          strokeWidth="2"/>
        <text
          x={textX}
          y={textY}
          dx={right ? -2 : 2}
          dy="5"
          textAnchor={right ? 'end' : 'start'}
          fontSize="10pt">
          {c.toFixed(3)}
        </text>
      </g>
    );
  }
}

export default SemEdge
