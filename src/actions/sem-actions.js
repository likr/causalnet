import Graph from 'egraph/lib/graph'
import copy from 'egraph/lib/graph/copy'
import sem from 'semjs'
import {UPDATE_SEM} from '../action-types'

const calcSem = (semGraph, graph, allGraph) => {
  const vertices = semGraph.vertices();
  vertices.sort((u1, u2) => {
    const vu1 = graph.vertex(u1).dummy ? 1 : 0,
      vu2 = graph.vertex(u2).dummy ? 1 : 0;
    return vu1 - vu2;
  });

  const indices = new Map();
  const values = new Map();
  vertices.forEach((u, i) => {
    indices.set(u, i);
    values.set(i, u);
  });

  const n = semGraph.numVertices();
  const alpha = semGraph.edges().map(([u, v]) => [indices.get(u), indices.get(v)]);
  const sigma = vertices.map((u) => [indices.get(u), indices.get(u)]);
  const observedVariables = vertices.filter((u) => !graph.vertex(u).dummy);
  const S = observedVariables.map((u) => {
      return observedVariables.map((v) => {
        if (u === v) {
          return 1;
        }
        return allGraph.edge(u, v) === null ? allGraph.edge(v, u).r : allGraph.edge(u, v).r;
      });
    });
  return sem.solver()
    .url('http://hyperinfo.viz.media.kyoto-u.ac.jp/wsgi/websem')
    .solve(n, alpha, sigma, S)
    .then((result) => {
      for (const [u, v, c] of result.alpha) {
        semGraph.edge(values.get(u), values.get(v)).c = c;
      }
      return result;
    });
};


export const init = (graph, u, allGraph) => {
  return (dispatch) => {
    const semGraph = new Graph();
    semGraph.addVertex(u, {
      dummy: true
    });
    for (const v of graph.inVertices(u)) {
      const d = graph.vertex(v);
      semGraph.addVertex(v, {
        name: d.name,
        color: d.color,
        groupOrder: 0
      });
      semGraph.addEdge(v, u);
    }
    for (const v of graph.outVertices(u)) {
      const d = graph.vertex(v);
      semGraph.addVertex(v, {
        name: d.name,
        color: d.color,
        groupOrder: 1
      });
      semGraph.addEdge(u, v);
    }

    calcSem(semGraph, graph, allGraph)
      .then(({attributes}) => {
        dispatch({
          type: UPDATE_SEM,
          semAttributes: attributes,
          semGraph
        });
      });
  };
}

export const toggle = (semGraph0, graph, u, allGraph) => {
  return (dispatch) => {
    const semGraph = copy(semGraph0);
    if (semGraph.vertex(u) === null) {
      const leftLayer = Math.max(...semGraph.vertices()
                                 .filter((v) => semGraph.inDegree(v) === 0)
                                 .map((v) => graph.vertex(v).groupOrder));
      const w = semGraph.vertices().filter((v) => semGraph.inDegree(v) > 0 && semGraph.outDegree(v) > 0)[0];
      const d = graph.vertex(u);
      if (d.groupOrder > leftLayer) {
        semGraph.addVertex(u, {
          name: d.name,
          color: d.color,
          groupOrder: 1
        });
        semGraph.addEdge(w, u);
      } else {
        semGraph.addVertex(u, {
          name: d.name,
          color: d.color,
          groupOrder: 0
        });
        semGraph.addEdge(u, w);
      }
    } else {
      semGraph.removeVertex(u);
    }
    calcSem(semGraph, graph, allGraph)
      .then(({attributes}) => {
        dispatch({
          type: UPDATE_SEM,
          semAttributes: attributes,
          semGraph
        });
      });
  };
}
