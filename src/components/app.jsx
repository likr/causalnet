import React from 'react'
import ReactDOM from 'react-dom'
import {
  clearFilter,
  clearVertexSelection,
  filterVertices,
  updateSearchWord
} from '../intents/data'
import Controller from './controller'
import NetworkDiagram from './network-diagram'
import Sem from './sem'
import styles from './app.css'

const highlightText = (text, selectedCells, searchWord) => {
  return selectedCells.reduce((s, cell) => {
    return s.replace(new RegExp(cell, 'g'), `<span class="highlight-text-cell">${cell}</span>`)
  }, searchWord ? text.replace(new RegExp(searchWord, 'g'), `<span class="highlight-text-search-word">${searchWord}</span>`) : text)
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
        <button className='pure-button' onClick={this.handleClickValidateModelButton.bind(this)}>
          Validate
        </button>
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
          svgWidth={layout.width}
          svgHeight={layout.height}
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

  handleClickValidateModelButton () {
    const {layout} = this.state
    const subWindow = window.open('sem.html')
    subWindow.addEventListener('load', () => {
      ReactDOM.render(<Sem vertices={layout.vertices} edges={layout.edges} />, subWindow.document.getElementById('content'))
    })
  }

  handleSubmitSearchWordForm (event) {
    event.preventDefault()
    updateSearchWord(this.refs.searchWord.value)
  }
}

export default App
