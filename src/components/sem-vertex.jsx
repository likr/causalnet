import React from 'react'
import TextImage from './text-image'

class SemVertex extends React.Component {
  render() {
    const {d, x, y, width, height} = this.props;
    const {name, color, dummy} = d;
    if (dummy) {
      return <g
          ref="vertex"
          transform={`translate(${x},${y})`}
          style={{cursor: 'pointer'}}>
        <rect
            fill="#000"
            opacity="0.7"
            width={width}
            height={height}
            x={-width / 2}
            y={-height / 2}
            rx="2"/>
      </g>
    }
    return <g
        ref="vertex"
        transform={`translate(${x},${y})`}
        style={{cursor: 'pointer'}}>
      <rect
          fill="none"
          stroke={color}
          strokeWidth="2"
          width={width}
          height={height}
          x={-width / 2}
          y={-height / 2}
          rx="5"/>
      <TextImage
          text={name}
          fontSize="10"
          fill={color}/>
    </g>
  }
}

export default SemVertex
