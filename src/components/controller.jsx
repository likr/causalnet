import React from 'react'
import {
  loadData,
  changeBiclusteringOption,
  selectAllCells,
  unselectAllCells,
  selectAllLayers,
  unselectAllLayers,
  selectAllVariableTypes,
  unselectAllVariableTypes,
  updateEpsilon,
  updateRThreshold
} from '../intents/data'
import biclusteringOptions from '../biclustering-options'
import Slider from './slider'
import Cell from './cell'
import Layer from './layer'
import VariableType from './variable-type'
import styles from './controller.css'

const query = `MATCH (v1)-[r:Correlation]->(v2)
WHERE abs(r.value) > 0.6 AND v1.timeOrder <= v2.timeOrder
RETURN collect(distinct(v1)), collect(r), collect(distinct(v2))`

class Controller extends React.Component {
  render () {
    const {
      variableTypes,
      layers,
      cells,
      rThreshold,
      epsilon,
      biclusteringOption,
      vertices,
      edges,
      texts
    } = this.props
    const options = []
    if (biclusteringOption === biclusteringOptions.QUASI_BICLIQUES.value) {
      options.push(<Slider key='quasi-bicliques' value={epsilon} onChange={(value) => updateEpsilon(value)} />)
    }
    return <div className={styles.controller}>
      <div>
        <h1>CausalNet</h1>
        <div>
          <h3>Query</h3>
          <textarea ref='query' rows='12' defaultValue={query} />
          <button className={`pure-button ${styles.mainButton}`} onClick={this.handleClickLoadButton.bind(this)}>
            Load
          </button>
        </div>
        <div>
          <h3>Stats</h3>
          <p>Number of vertices: {vertices.length}</p>
          <p>Number of edges: {edges.length}</p>
          <p>Number of articles: {texts.length}</p>
        </div>
        <div>
          <h3>R threshold</h3>
          <Slider value={rThreshold} onChange={this.handleChangeRThreshold.bind(this)} />
        </div>
        <div>
          <h3>Biclustering</h3>
          <select defaultValue={biclusteringOption} onChange={this.handleChangeBiclusteringOption.bind(this)}>
            {Array.from(Object.keys(biclusteringOptions)).map((key) => {
              const {name, value} = biclusteringOptions[key]
              return <option key={value} value={value}>{name}</option>
            })}
          </select>
          {options}
        </div>
        <div>
          <h3>Layout</h3>
          <select defaultValue='FM3'>
            <option value='fm3'>FM3 Layout</option>
            <option value='sugiyama'>Sugiyama Layout</option>
            <option value='circular'>Circular Layout</option>
          </select>
        </div>
        <div>
          <h3>Variable Types</h3>
          <div>
            <button className={`pure-button ${styles.selectButton}`} onClick={this.handleClickSelectAllVariableTypesButton.bind(this)}>
              Select All
            </button>
            <button className={`pure-button ${styles.selectButton}`} onClick={this.handleClickUnselectAllVariableTypesButton.bind(this)}>
              Unselect All
            </button>
          </div>
          {variableTypes.map((d, i) => <VariableType key={i} {...d} />)}
        </div>
        <div>
          <h3>Layers</h3>
          <div>
            <button className={`pure-button ${styles.selectButton}`} onClick={this.handleClickSelectAllLayersButton.bind(this)}>
              Select All
            </button>
            <button className={`pure-button ${styles.selectButton}`} onClick={this.handleClickUnselectAllLayersButton.bind(this)}>
              Unselect All
            </button>
          </div>
          {layers.map((d, i) => <Layer key={i} {...d} />)}
        </div>
        <div>
          <h3>Cells</h3>
          <div>
            <button className={`pure-button ${styles.selectButton}`} onClick={this.handleClickSelectAllCellsButton.bind(this)}>
              Select All
            </button>
            <button className={`pure-button ${styles.selectButton}`} onClick={this.handleClickUnselectAllCellsButton.bind(this)}>
              Unselect All
            </button>
          </div>
          {cells.map((d, i) => <Cell key={i} {...d} />)}
        </div>
      </div>
    </div>
  }

  handleClickLoadButton () {
    const query = this.refs.query.value
    loadData(query)
  }

  handleChangeBiclusteringOption (event) {
    changeBiclusteringOption(event.target.value)
  }

  handleChangeRThreshold (value) {
    updateRThreshold(value)
  }

  handleClickSelectAllCellsButton () {
    selectAllCells()
  }

  handleClickUnselectAllCellsButton () {
    unselectAllCells()
  }

  handleClickSelectAllLayersButton () {
    selectAllLayers()
  }

  handleClickUnselectAllLayersButton () {
    unselectAllLayers()
  }

  handleClickSelectAllVariableTypesButton () {
    selectAllVariableTypes()
  }

  handleClickUnselectAllVariableTypesButton () {
    unselectAllVariableTypes()
  }
}

export default Controller
