import React from 'react'
import d3 from 'd3'
import {
  addVariable,
  setModel,
} from '../intents/data'
import TextImage from './text-image'

class Vertex extends React.Component {
  constructor(props) {
    super(props);
    const {x, y} = props;
    this.state = {
      x0: x,
      y0: y,
    };
  }

  componentWillReceiveProps() {
    const {x, y} = this.props;
    this.setState({
      x0: x,
      y0: y,
    });
  }

  componentDidMount() {
    this.transition();
  }

  componentDidUpdate() {
    this.transition();
  }

  render() {
    const {d, width, height} = this.props;
    const {x0, y0} = this.state;
    const {name, color, dummy} = d;
    if (dummy) {
      return <g
          ref="vertex"
          transform={`translate(${x0},${y0})`}
          onClick={::this.handleClickBundle}
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
        transform={`translate(${x0},${y0})`}
        onClick={::this.handleClickVariable}
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

  handleClickVariable() {
    addVariable(this.props.u);
  }

  handleClickBundle() {
    const {U, L} = this.props.d;
    setModel(U, L);
  }

  transition() {
    const {x, y} = this.props;
    d3.select(this.refs.vertex)
      .transition()
      .duration(1000)
      .attr('transform', `translate(${x},${y})`);
  }
}

export default Vertex
