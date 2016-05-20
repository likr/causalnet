import Rx from 'rxjs/Rx'
import controlStore from './control-store'
import selectionStore from './selection-store'
import semStore from './sem-store'
import dataStore from './data-store'
import layoutStore from './layout-store'
import graphStore from './graph-store'
import {intentSubject} from '../intents/data'

const store = () => {
  const dataSubject = dataStore(intentSubject)
  const selectionSubject = selectionStore(intentSubject)
  const semSubject = semStore(intentSubject)
  const controlSubject = controlStore(intentSubject, dataSubject)
  const layoutSubject = layoutStore(dataSubject, controlSubject)
  const graphSubject = graphStore(layoutSubject, selectionSubject)

  return Rx.Observable
    .zip(
      graphSubject,
      controlSubject,
      semSubject,
      (layout, control, sem) => {
        return {
          layout: layout.state,
          control: control.state,
          sem: sem.state
        }
      }
    )
}

export default store
