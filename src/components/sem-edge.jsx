import React from 'react'
import svgPath from '../utils/svg-path'
import TextImage from './text-image'

const textTranslate = (points) => {
  const x = (points[0][0] + points[5][0]) / 2
  const y = (points[0][1] + points[5][1]) / 2
  return `translate(${x},${y})`
}

class SemEdge extends React.Component {
  render () {
    const {points, d} = this.props
    const {path} = d
    return <g ref='edge'>
      <path
        d={svgPath(points)}
        fill='none'
        opacity='0.3'
        stroke={path > 0 ? 'green' : 'red'}
        strokeWidth='2' />
      <g transform={textTranslate(points)}>
        <TextImage fontSize={10} text={path.toFixed(3)} />
      </g>
    </g>
  }
}

export default SemEdge
