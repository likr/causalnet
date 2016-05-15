import React from 'react'
import { findDOMNode } from 'react-dom'
import d3 from 'd3'

const zoom = (Component) => {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        x: 0,
        y: 0,
        scale: 1,
      }
    }

    componentDidMount () {
      const dom = findDOMNode(this)
      const zoom = d3.behavior.zoom()
        .scaleExtent([0.1, 2])
        .on('zoom', () => {
          const {translate, scale} = d3.event
          const [x, y] = translate
          this.setState({x, y, scale})
        })
      d3.select(dom)
        .call(zoom)
    }

    render () {
      const {x, y, scale} = this.state
      return <Component
               {...this.props}
               x={x}
               y={y}
               scale={scale} />
    }
  }
}

export default zoom
