import React from 'react'
import {toggleLayer} from '../intents/data'
import styles from './layer.css'

class Layer extends React.Component {
  render() {
    const {name, checked} = this.props;
    return <div className={styles.layer} onClick={::this.handleClick}>
      <input type="checkbox" checked={checked} readOnly/> {name}
    </div>
  }

  handleClick() {
    toggleLayer(this.props.name);
  }
}

export default Layer
