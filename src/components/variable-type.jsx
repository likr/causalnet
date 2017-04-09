import React from 'react'
import { toggleVariableType } from '../intents/data'
import styles from './variable-type.css'

class VariableType extends React.Component {
  render () {
    const {name, color, checked, count} = this.props
    return <div className={styles.variableType} style={{color}} onClick={this.handleClick.bind(this)}>
      <input type='checkbox' checked={checked} readOnly /> {name} ({count})
    </div>
  }

  handleClick () {
    toggleVariableType(this.props.name)
  }
}

export default VariableType
