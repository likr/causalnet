import React from 'react'
import {
  toggleCell
} from '../intents/data'
import styles from './cell.css'

class Cell extends React.Component {
  render () {
    const {name, checked} = this.props
    return <div className={styles.cell} onClick={this.handleClick.bind(this)}>
      <input type='checkbox' checked={checked} readOnly /> {name}
    </div>
  }

  handleClick () {
    toggleCell(this.props.name)
  }
}

export default Cell
