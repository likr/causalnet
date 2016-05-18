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
          <a ref='saveButton' className='pure-button' onClick={this.handleClickSaveButton.bind(this)}>
            Save as SVG
          </a>
        </div>
        <div>
          <h3>R threshold</h3>
          <RThresholdSlider value={rThreshold} />
        </div>
        <div>
          <h3>Biclustering</h3>
          <select value={this.props.biclusteringOption} onChange={this.handleChangeBiclusteringOption.bind(this)}>
            {Array.from(Object.keys(biclusteringOptions)).map((key) => {
              const {name, value} = biclusteringOptions[key]
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

  handleClickSaveButton (event) {
    const svgNode = document.getElementById('main-svg').cloneNode(true)
    svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgNode.setAttribute('width', this.props.svgWidth)
    svgNode.setAttribute('height', this.props.svgHeight)
    svgNode.removeAttribute('data-reactid')
    svgNode.querySelector('g').removeAttribute('transform')
    for (const node of svgNode.querySelectorAll('*')) {
      node.removeAttribute('data-reactid')
    }
    const svgData = window.btoa(encodeURIComponent(svgNode.outerHTML).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)))
    this.refs.saveButton.href = `data:image/svg+xml;charset=utf-8;base64,${svgData}`
    this.refs.saveButton.download = 'fig.svg'
  }

  handleChangeBiclusteringOption (event) {
    changeBiclusteringOption(event.target.value)
  }
}

export default Controller
