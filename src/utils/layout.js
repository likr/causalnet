import Rx from 'rxjs/Rx'

const layout = ({vertices, edges}, biclusteringOption) => {
  return Rx.Observable.create((observer) => {
    const worker = new window.Worker('layout-worker.js')
    worker.onmessage = ({data}) => {
      observer.next(data)
      observer.complete()
    }
    worker.postMessage({
      vertices,
      edges,
      options: {
        biclusteringOption,
        layerMargin: 200,
        vertexMargin: 5
      }
    })
    return () => {
      worker.terminate()
    }
  })
}

export default layout
