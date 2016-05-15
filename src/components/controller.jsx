import React from 'react'
import {
  loadDataFromFile,
  changeBiclusteringOption
} from '../intents/data'
import biclusteringOptions from '../biclustering-options'
import RThresholdSlider from './r-threshold-slider'
import Layer from './layer'
import VariableType from './variable-type'
import styles from './controller.css'

class Controller extends React.Component {
  render () {
    const {variableTypes, layers, rThreshold} = this.props
    return <div className={styles.controller}>
      <div>
        <h1>CausalNet</h1>
        <div>
          <div>
            <input ref='file' type='file' />
          </div>
          <button className='pure-button pure-button-primary' onClick={this.handleClickLoadButton.bind(this)}>
            Load
          </button>
        </div>
        <div>
          <h3>R threshold</h3>
          <RThresholdSlider value={rThreshold} />
        </div>
        <div>
          <h3>Biclustering</h3>
          <select value={this.props.biclusteringOption} onChange={this.handleChangeBiclusteringOption.bind(this)}>
            {biclusteringOptions.map(({name, value}) => {
              return <option key={value} value={value}>{name}</option>
            })}
          </select>
        </div>
        <div>
          <h3>Variable Types</h3>
          {variableTypes.map((d, i) => <VariableType key={i} {...d} />)}
        </div>
        <div>
          <h3>Layers</h3>
          {layers.map((d, i) => <Layer key={i} {...d} />)}
        </div>
      </div>
    </div>
  }

  handleClickLoadButton () {
    loadDataFromFile(this.refs.file.files[0])
  }

  handleChangeBiclusteringOption (event) {
    changeBiclusteringOption(event.target.value)
  }
}

export default Controller
