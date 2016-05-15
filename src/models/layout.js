/* global Worker */

import Rx from 'rx'

const layout = ({vertices, edges}, edgeConcentration=false) => {
  return Rx.Observable.create((observer) => {
    const worker = new Worker('layout-worker.js');
    worker.onmessage = ({data}) => {
      const {vertices, edges, width, height} = data;
      observer.onNext({vertices, edges, width, height});
      observer.onCompleted();
    };
    worker.postMessage({
      vertices,
      edges,
      options: {
        edgeConcentration,
        layerMargin: 200,
        vertexMargin: 5,
      },
    });
    return () => {
      worker.terminate();
    };
  });
};

export default layout
