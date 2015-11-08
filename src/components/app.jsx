import React from 'react'
import Controller from './controller'
import NetworkDiagram from './network-diagram'
import Sem from './sem'

class App extends React.Component {
  render() {
    return (
      <div>
        <NetworkDiagram/>
        <Controller/>
        <Sem/>
      </div>
    );
  }
}

export default App
