const isosurface = require('isosurface')
const ndarray = require('ndarray')
const fill = require('flood-fill')
const jsonfile = require('jsonfile')
const XML = require('pixl-xml')
const _ = require('lodash')

const doc = XML.parse('./preprocessing/wt_N2_030131_01.bdml0.18.xml', {forceArrays: true})
const components = _.groupBy(doc.data[0].component, c => c.componentName[0])

_.forEach(components, (v, k) => {
  components[k] = v.map(r => ({
    time: parseInt(r.time, 10),
    measurement: _.flatMap(r.measurement[0].line[0].xyzSequence, s => {
      return s.xyz.map(t => _.flatMap([t.x, t.y, t.z], i => parseInt(i, 10)))
    })
  }))
})

const vecs = _.flatMapDepth(components, (v, k) => v.map(m => m.measurement), 2)
const minmax = {
  min_x: _.minBy(vecs, v => v[0])[0],
  max_x: _.maxBy(vecs, v => v[0])[0],
  min_y: _.minBy(vecs, v => v[1])[1],
  max_y: _.maxBy(vecs, v => v[1])[1],
  min_z: _.minBy(vecs, v => v[2])[2],
  max_z: _.maxBy(vecs, v => v[2])[2]
}

const nx = minmax.max_x - minmax.min_x
const ny = minmax.max_y - minmax.min_y
const nz = minmax.max_z - minmax.min_z

_.forEach(components, (component, componentName) => {
  const frames = []
  console.log(componentName)

  component.forEach(edges => {
    const volume = ndarray(new Int8Array(nx * ny * nz).fill(1), [nx, ny, nz])

    edges.measurement.forEach(p => {
      volume.set(p[0] - minmax.min_x, p[1] - minmax.min_y, p[2] - minmax.min_z, 0)
    })

    const slices = []
    for (let i = 0; i < nz; i++) {
      slices.push(volume.pick(null, null, i))
      fill(slices[i], 0, 0, 0)
    }
    const frame = isosurface.marchingCubes([nx, ny, nz], (x, y, z) => slices[z].get(x, y))
    frames.push(Object.assign(frame, {time: edges.time}))
  })

  jsonfile.writeFileSync(`./dist/components/${componentName}.json`, {frames})
})
