import React from 'react'
import {
  loadDataFromFile,
} from '../intents/data'
import RThresholdSlider from './r-threshold-slider'
import Layer from './layer'
import VariableType from './variable-type'
import styles from './controller.css'

class Controller extends React.Component {
  render() {
    const {variableTypes, layers, rThreshold} = this.props;
    return <div className={styles.controller}>
      <div>
        <h1>CausalNet</h1>
        <div>
          <div>
            <input ref="file" type="file"/>
          </div>
          <button className="pure-button pure-button-primary" onClick={::this.handleClickLoadButton}>Load</button>
        </div>
        <div>
          <h3>R threshold</h3>
          <RThresholdSlider value={rThreshold}/>
        </div>
        <div>
          <h3>Variable Types</h3>
          {variableTypes.map((d, i) => <VariableType key={i} {...d}/>)}
        </div>
        <div>
          <h3>Layers</h3>
          {layers.map((d, i) => <Layer key={i} {...d}/>)}
        </div>
      </div>
    </div>
  }

  handleClickLoadButton() {
    loadDataFromFile(this.refs.file.files[0]);
  }
}

export default Controller
