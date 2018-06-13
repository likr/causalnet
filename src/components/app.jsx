import React from 'react'
import {
  clearFilter,
  clearVertexSelection,
  filterVertices,
  updateSearchWord
} from '../intents/data'
import Controller from './controller'
import NetworkDiagram from './network-diagram'
import styles from './app.css'

const highlightText = (text, selectedCells, searchWord) => {
  return selectedCells.reduce((s, cell) => {
    return s.replace(new RegExp(cell, 'g'), `<span class="highlight-text-cell">${cell}</span>`)
  }, searchWord ? text.replace(new RegExp(searchWord, 'g'), `<span class="highlight-text-search-word">${searchWord}</span>`) : text)
}

const exportData = (vertices) => {
  const rows = []
  rows.push(vertices.map(({d}) => d.name).join(','))
  const n = vertices[0].d.data.length
  for (let i = 0; i < n; ++i) {
    rows.push(vertices.map(({d}) => d.data[i]).join(','))
  }
  return rows.join('\n')
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      texts: {
        texts: []
      }
    }
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
      control,
      texts
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
        <a ref='exportButton' className='pure-button' onClick={this.handleClickExportButton.bind(this)}>
          Export to iSEM
        </a>
        <a ref='saveButton' className='pure-button' onClick={this.handleClickSaveButton.bind(this)}>
          Save as SVG
        </a>
      </div>
      <div className={styles.searchForm}>
        <form className='pure-form' onSubmit={this.handleSubmitSearchWordForm.bind(this)} >
          <input ref='searchWord' type='text' className='pure-input-rounded' placeholder='search articles' />
        </form>
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
          texts={texts.texts}
        />
      </div>
      <div className={styles.articlesWrapper}>
        <table className='pure-table pure-table-bordered'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Published</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {texts.texts.filter((_, i) => i < 100).map((row) => {
              return <tr key={`${row.doc_id}:${row.line}`}>
                <td>{row.title}</td>
                <td>{row.authors}</td>
                <td>{row.published}</td>
                <td dangerouslySetInnerHTML={{__html: highlightText(row.text, texts.selectedCells, texts.searchWord)}} />
              </tr>
            })}
          </tbody>
        </table>
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

  handleClickExportButton () {
    const vertices = this.state.layout.vertices.filter(({d}) => !d.dummy)
    if (vertices.length === 0) {
      return
    }
    const content = exportData(vertices)
    const data = window.btoa(encodeURIComponent(content).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)))
    this.refs.exportButton.href = `data:image/svg+xml;charset=utf-8;base64,${data}`
    this.refs.exportButton.download = 'sem.csv'
  }

  handleClickSaveButton (event) {
    const svgNode = document.getElementById('main-svg').cloneNode(true)
    svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgNode.setAttribute('width', this.state.layout.width)
    svgNode.setAttribute('height', this.state.layout.height)
    svgNode.removeAttribute('data-reactid')
    svgNode.querySelector('g').removeAttribute('transform')
    for (const node of svgNode.querySelectorAll('*')) {
      node.removeAttribute('data-reactid')
    }
    const svgData = window.btoa(encodeURIComponent(svgNode.outerHTML).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)))
    this.refs.saveButton.href = `data:image/svg+xml;charset=utf-8;base64,${svgData}`
    this.refs.saveButton.download = 'fig.svg'
  }

  handleSubmitSearchWordForm (event) {
    event.preventDefault()
    updateSearchWord(this.refs.searchWord.value)
  }
}

export default App
