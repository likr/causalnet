import Rx from 'rxjs/Rx'

const layout = ({vertices, edges}, options) => {
  return Rx.Observable.create((observer) => {
    const worker = new window.Worker('layout-worker.js')
    worker.onmessage = ({data}) => {
      observer.next(data)
      observer.complete()
    }
    worker.postMessage({vertices, edges, options})
    return () => {
      worker.terminate()
    }
  })
}

export default layout
