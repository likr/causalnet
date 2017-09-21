import Rx from 'rxjs/Rx'
import controlStore from './control-store'
import selectionStore from './selection-store'
import semStore from './sem-store'
import textStore from './text-store'
import dataStore from './data-store'
import filterStore from './filter-store'
import layoutStore from './layout-store'
import graphStore from './graph-store'
import {intentSubject} from '../intents/data'

const store = () => {
  const dataSubject = dataStore(intentSubject)
  const selectionSubject = selectionStore(intentSubject)
  const semSubject = semStore(intentSubject)
  const controlSubject = controlStore(intentSubject, dataSubject)
  const filterSubject = filterStore(intentSubject, selectionSubject)
  const layoutSubject = layoutStore(dataSubject, controlSubject, filterSubject)
  const graphSubject = graphStore(layoutSubject, selectionSubject)
  const textSubject = textStore(intentSubject, selectionSubject, graphSubject)

  return Rx.Observable
    .zip(
      graphSubject,
      controlSubject,
      semSubject,
      textSubject,
      (layout, control, sem, texts) => {
        return {
          layout: layout.state,
          control: control.state,
          sem: sem.state,
          texts: texts.state
        }
      }
    )
}

export default store
