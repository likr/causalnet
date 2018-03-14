import 'babel-polyfill'

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.getElementById('app').appendChild(renderer.domElement)

const scene = new THREE.Scene()
const gridHelper = new THREE.GridHelper(1000, 50)
gridHelper.rotation.x = Math.PI / 2 // Grid should be placed as xy-plane
scene.add(gridHelper)
scene.add(new THREE.AxesHelper(200))

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10000)
camera.position.set(360, 360, 240)
camera.up.set(0, 0, 1)
camera.add(new THREE.PointLight(0xffffff))
scene.add(camera)

const controls = new THREE.OrbitControls(camera, renderer.domElement)

const geometry = new THREE.Geometry()
const material = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide})
const mesh = new THREE.Mesh(geometry, material)
mesh.scale.z = 2 // Magnify cell's thickness
scene.add(mesh)

const animate = () => {
  window.requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

let frames = []
let time = 0

const updateFrame = () => {
  const frame = frames[time]
  document.getElementById('frame-counter').innerText = `time: ${frame.time}`
  geometry.vertices = frame.vertices
  geometry.faces = frame.faces
  geometry.verticesNeedUpdate = true
  geometry.elementsNeedUpdate = true
  geometry.computeFaceNormals()
}

document.getElementById('time').oninput = e => {
  time = Math.floor((e.target.value / 100) * frames.length)
  updateFrame()
}

document.getElementById('auto').onchange = e => {
  if (!e.target.checked) return clearInterval(window.interval)

  window.interval = setInterval(() => {
    time = (time + 1) % frames.length
    document.getElementById('time').value = (time / frames.length) * 100
    updateFrame()
  }, 200)
}

document.querySelector('select[name="type"]').onchange = async e => {
  document.getElementById('frame-counter').innerText = 'Loading...'
  const res = await (await window.fetch(`./dist/components/${e.target.value}.json`)).json()
  frames = res.frames.map(frame => ({
    time: frame.time,
    vertices: frame.positions.map(v => new THREE.Vector3(...v)),
    faces: frame.cells.map(f => new THREE.Face3(...f))
  }))
  updateFrame()
  animate()
}
