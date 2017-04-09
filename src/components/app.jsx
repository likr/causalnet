import React from 'react'
import ReactDOM from 'react-dom'
import {
  clearFilter,
  clearVertexSelection,
  filterVertices
} from '../intents/data'
import Controller from './controller'
import NetworkDiagram from './network-diagram'
import Sem from './sem'
import styles from './app.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.subscription = this.props.store.subscribe((state) => {
      this.setState(state)
    })
  }

  componentWillUnmount () {
    this.dataSubscription.dispose()
  }

  render () {
    const {
      layout,
      control
    } = this.state
    return <div>
      <div className={styles.networkDiagramWrapper}>
        <NetworkDiagram vertices={layout.vertices} edges={layout.edges} />
      </div>
      <div className={styles.actionButtons}>
        <button className='pure-button' onClick={this.handleClickClearSelectionButton.bind(this)}>
          Clear Selection
        </button>
        <button className='pure-button' onClick={this.handleClickFilterButton.bind(this)}>
          Filter
        </button>
        <button className='pure-button' onClick={this.handleClickClearFilterButton.bind(this)}>
          Clear Filter
        </button>
        <button className='pure-button' onClick={this.handleClickValidateModelButton.bind(this)}>
          Validate
        </button>
      </div>
      <div className={styles.controllerWrapper}>
        <Controller
          variableTypes={control.variableTypes}
          layers={control.layers}
          cells={control.cells}
          rThreshold={control.rThreshold}
          epsilon={control.epsilon}
          biclusteringOption={control.biclusteringOption}
          vertices={layout.vertices}
          edges={layout.edges}
          svgWidth={layout.width}
          svgHeight={layout.height} />
      </div>
    </div>
  }

  handleClickClearSelectionButton () {
    clearVertexSelection()
  }

  handleClickFilterButton () {
    filterVertices()
  }

  handleClickClearFilterButton () {
    clearFilter()
  }

  handleClickValidateModelButton () {
    const {layout} = this.state
    const subWindow = window.open('sem.html')
    subWindow.addEventListener('load', () => {
      ReactDOM.render(<Sem vertices={layout.vertices} edges={layout.edges} />, subWindow.document.getElementById('content'))
    })
  }
}

export default App
