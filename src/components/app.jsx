import React from 'react'
import Controller from './controller'
import NetworkDiagram from './network-diagram'
import Sem from './sem'
import Data from '../models/data.js'
import styles from './app.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vertices: [],
      edges: [],
      semVertices: [],
      semEdges: [],
      semAttributes: [],
      variableTypes: [],
      layers: [],
      rThreshold: 0,
    }
  }

  componentDidMount () {
    this.dataSubscription = Data.subscribe((state) => {
      this.setState(state)
    })
  }

  componentWillUnmount () {
    this.dataSubscription.dispose()
  }

  render () {
    const {vertices, edges, semVertices, semEdges, semAttributes, variableTypes, layers, rThreshold} = this.state
    return <div>
             <div className={styles.networkDiagramWrapper}>
               <NetworkDiagram vertices={vertices} edges={edges} />
             </div>
             <div className={styles.controllerWrapper}>
               <Controller variableTypes={variableTypes} layers={layers} rThreshold={rThreshold} />
             </div>
             <div className={styles.semWrapper}>
               <Sem vertices={semVertices} edges={semEdges} attributes={semAttributes} />
             </div>
           </div>
  }
}

export default App
