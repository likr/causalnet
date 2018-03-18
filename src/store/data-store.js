import d3 from 'd3'
import Rx from 'rxjs/Rx'
import {
  DATA_LOAD
} from '../constants'

const cells = [
  'AB',
  'ABa',
  'ABal',
  'ABar',
  'ABp',
  'ABpl',
  'ABpr',
  'C',
  'E',
  'EMS',
  'MS',
  'P0',
  'P1',
  'P2',
  'P3'
]
const layers = [
  '1 cell',
  '1-2 cell',
  '2 cell',
  '2-4 cell',
  '4 cell',
  '4-8 cell',
  '8 cell'
]
const variableTypes = [
  'DivAxis_ap',
  'DivAxis_dv',
  'DivAxis_lr',
  'DivAxis_wt',
  'DivTime_f',
  'DivTime_l',
  'NucAng',
  'NucDis',
  'NucMov',
  'NucPos_ap',
  'NucPos_dv',
  'NucPos_lr',
  'NucSph',
  'NucVol',
  'Per_int',
  'Per_mit',
  'SpnElng_1st',
  'SpnElng_2nd',
  'SpnElng_3rd',
  'SpnIntg_1st',
  'SpnIntg_2nd',
  'SpnIntg_3rd',
  'SpnPos_ap',
  'SpnPos_dv',
  'SpnPos_lr'
]

const load = (state, data) => {
  const vertices = data.nodes.map((node) => {
    return {
      u: node.id,
      d: Object.assign({}, node.properties, {
        variableType: node.properties.type,
        layer: node.properties.timeGroup,
        layerOrder: node.properties.timeOrder
      })
    }
  })
  const edges = data.relationships.map((r) => {
    return {
      u: r.startNode,
      v: r.endNode,
      d: {
        r: r.properties.value
      }
    }
  })

  const color = d3.scale.category20()
  for (const name of variableTypes) {
    color(name)
  }
  for (const vertex of vertices) {
    vertex.d.color = color(vertex.d.variableType)
  }
  Object.assign(state, {
    vertices,
    edges,
    cells: cells.map((name) => ({name})),
    layers: layers.map((name) => ({name})),
    variableTypes: variableTypes.map((name) => ({name, color: color(name)}))
  })
}

const fetchFromDB = (query) => {
  const url = 'https://neo4j.likr-lab.com/db/data/transaction/commit'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${window.btoa('neo4j:crest')}`
  }
  return window
    .fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        statements: [
          {
            statement: query,
            resultDataContents: ['graph']
          }
        ]
      })
    })
    .then((response) => response.json())
    .then(({results}) => {
      const graph = results[0].data[0].graph
      return graph
    })
}

const store = (intentSubject) => {
  const state = {
    vertices: [],
    edges: [],
    cells: [],
    layers: [],
    variableTypes: []
  }

  const subject = new Rx.BehaviorSubject({state, changed: false})

  intentSubject.subscribe((payload) => {
    switch (payload.type) {
      case DATA_LOAD:
        fetchFromDB(payload.query)
          .then((data) => {
            load(state, data)
            subject.next({state, changed: true})
          })
        break
      default:
        subject.next({state, changed: false})
    }
  })

  return subject
}

export default store
