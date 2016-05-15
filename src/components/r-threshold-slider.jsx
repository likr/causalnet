import React from 'react'
import { updateRThreshold,
} from '../intents/data'
import styles from './r-threshold-slider.css'

class RThresholdSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentValue: props.value,
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      currentValue: nextProps.value,
    })
  }

  componentDidMount () {
    this.refs.slider.addEventListener('input', (event) => {
      this.setState({
        currentValue: +event.target.value,
      })
    })
    this.refs.slider.addEventListener('change', (event) => {
      updateRThreshold(+event.target.value)
    })
  }

  render () {
    const {currentValue} = this.state
    return <div>
             <div className={styles.currentValue}>
               {currentValue.toFixed(2)}
             </div>
             <input
               ref="slider"
               type="range"
               value={currentValue}
               min="0"
               max="1"
               step="0.01" />
           </div>
  }
}

export default RThresholdSlider
