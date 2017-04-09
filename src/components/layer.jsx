import React from 'react'
import { toggleLayer } from '../intents/data'
import styles from './layer.css'

class Layer extends React.Component {
  render () {
    const {name, checked, count} = this.props
    return <div className={styles.layer} onClick={this.handleClick.bind(this)}>
      <input type='checkbox' checked={checked} readOnly /> {name} ({count})
    </div>
  }

  handleClick () {
    toggleLayer(this.props.name)
  }
}

export default Layer
