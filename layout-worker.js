/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _graph = __webpack_require__(198);
	
	var _graph2 = _interopRequireDefault(_graph);
	
	var _copy = __webpack_require__(201);
	
	var _copy2 = _interopRequireDefault(_copy);
	
	var _sugiyama = __webpack_require__(202);
	
	var _sugiyama2 = _interopRequireDefault(_sugiyama);
	
	var _edgeConcentration = __webpack_require__(224);
	
	var _edgeConcentration2 = _interopRequireDefault(_edgeConcentration);
	
	var _rectangular = __webpack_require__(225);
	
	var _rectangular2 = _interopRequireDefault(_rectangular);
	
	var _quasiBicliqueMining = __webpack_require__(226);
	
	var _quasiBicliqueMining2 = _interopRequireDefault(_quasiBicliqueMining);
	
	var _layerAssignment = __webpack_require__(227);
	
	var _layerAssignment2 = _interopRequireDefault(_layerAssignment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint-env worker */
	
	var calcSize = function calcSize(vertices) {
	  var left = Math.min.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref) {
	    var x = _ref.x;
	    var width = _ref.width;
	    return x - width / 2;
	  }))));
	  var right = Math.max.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref2) {
	    var x = _ref2.x;
	    var width = _ref2.width;
	    return x + width / 2;
	  }))));
	  var top = Math.min.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref3) {
	    var y = _ref3.y;
	    var height = _ref3.height;
	    return y - height / 2;
	  }))));
	  var bottom = Math.max.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref4) {
	    var y = _ref4.y;
	    var height = _ref4.height;
	    return y + height / 2;
	  }))));
	  return {
	    width: right - left,
	    height: bottom - top
	  };
	};
	
	var edgeCount = function edgeCount(vertices, neighbors) {
	  return neighbors.filter(function (u) {
	    return vertices.indexOf(u) >= 0;
	  }).length;
	};
	
	var transform = function transform(graph, biclusteringOption) {
	  if (biclusteringOption === 'none') {
	    return graph;
	  }
	  var transformer = new _edgeConcentration2.default().layerAssignment((0, _layerAssignment2.default)(graph)).idGenerator(function (graph) {
	    return Math.max.apply(Math, _toConsumableArray(graph.vertices())) + 1;
	  }).dummy(function () {
	    return {
	      dummy: true,
	      name: '',
	      color: '#888'
	    };
	  });
	  if (biclusteringOption === 'edge-concentration') {
	    transformer.method(_rectangular2.default);
	  } else if (biclusteringOption === 'quasi-bicliques') {
	    transformer.method(function (graph, h1, h2) {
	      return (0, _quasiBicliqueMining2.default)(graph, h1, h2, 0.5);
	    });
	  }
	  return transformer.transform((0, _copy2.default)(graph));
	};
	
	var layout = function layout(graph, _ref5) {
	  var biclusteringOption = _ref5.biclusteringOption;
	  var layerMargin = _ref5.layerMargin;
	  var vertexMargin = _ref5.vertexMargin;
	
	  var transformedGraph = transform(graph, biclusteringOption);
	  var layouter = new _sugiyama2.default().layerAssignment((0, _layerAssignment2.default)(transformedGraph)).layerMargin(layerMargin).vertexWidth(function (_ref6) {
	    var d = _ref6.d;
	    return d.dummy ? 25 : 160;
	  }).vertexHeight(function (_ref7) {
	    var d = _ref7.d;
	    return d.dummy ? 10 : 20;
	  }).vertexMargin(vertexMargin).edgeWidth(function () {
	    return 3;
	  }).edgeMargin(3);
	  var positions = layouter.layout(transformedGraph);
	
	  var vertices = [];
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = transformedGraph.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var u = _step.value;
	
	      var d = transformedGraph.vertex(u);
	      if (d.dummy) {
	        d.U = transformedGraph.inVertices(u);
	        d.L = transformedGraph.outVertices(u);
	      }
	      var _positions$vertices$u = positions.vertices[u];
	      var x = _positions$vertices$u.x;
	      var y = _positions$vertices$u.y;
	      var width = _positions$vertices$u.width;
	      var height = _positions$vertices$u.height;
	
	      vertices.push({ u: u, d: d, x: x, y: y, width: width, height: height });
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  var edges = [];
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = transformedGraph.edges()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var _step2$value = _slicedToArray(_step2.value, 2);
	
	      var _u = _step2$value[0];
	      var v = _step2$value[1];
	
	      if (positions.edges[_u][v]) {
	        var _d = transformedGraph.edge(_u, v);
	        var ud = transformedGraph.vertex(_u);
	        var vd = transformedGraph.vertex(v);
	        var _positions$edges$_u$v = positions.edges[_u][v];
	        var points = _positions$edges$_u$v.points;
	        var width = _positions$edges$_u$v.width;
	        var reversed = _positions$edges$_u$v.reversed;
	
	        while (points.length < 6) {
	          points.push(points[points.length - 1]);
	        }
	        var opacity = void 0;
	        if (ud.dummy) {
	          opacity = edgeCount(ud.U, graph.inVertices(v)) / ud.U.length;
	        } else if (vd.dummy) {
	          opacity = edgeCount(vd.L, graph.outVertices(_u)) / vd.L.length;
	        } else {
	          opacity = 1;
	        }
	        edges.push({ u: _u, v: v, ud: ud, vd: vd, d: _d, points: points, reversed: reversed, width: width, opacity: opacity });
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	
	  return Object.assign({ vertices: vertices, edges: edges }, calcSize(vertices));
	};
	
	onmessage = function onmessage(_ref8) {
	  var data = _ref8.data;
	  var vertices = data.vertices;
	  var edges = data.edges;
	  var options = data.options;
	
	  var graph = new _graph2.default();
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;
	
	  try {
	    for (var _iterator3 = vertices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var _step3$value = _step3.value;
	      var u = _step3$value.u;
	      var d = _step3$value.d;
	
	      graph.addVertex(u, d);
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }
	
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;
	
	  try {
	    for (var _iterator4 = edges[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var _step4$value = _step4.value;
	      var u = _step4$value.u;
	      var v = _step4$value.v;
	      var d = _step4$value.d;
	
	      graph.addEdge(u, v, d);
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }
	
	  postMessage(layout(graph, options));
	};

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(199)


/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	const AbstractGraph = __webpack_require__(200)
	
	const privates = new WeakMap()
	
	const p = (self) => privates.get(self)
	
	class MutableGraph extends AbstractGraph {
	  constructor () {
	    super()
	    privates.set(this, {
	      vertices: new Map(),
	      numVertices: 0,
	      numEdges: 0
	    })
	  }
	
	  vertex (u) {
	    const vertices = p(this).vertices
	    if (vertices.get(u)) {
	      return vertices.get(u).data
	    }
	    return null
	  }
	
	  edge (u, v) {
	    const vertices = p(this).vertices
	    if (vertices.get(u) && vertices.get(u).outVertices.get(v)) {
	      return vertices.get(u).outVertices.get(v)
	    }
	    return null
	  }
	
	  vertices () {
	    return Array.from(p(this).vertices.keys())
	  }
	
	  outVertices (u) {
	    if (this.vertex(u) === null) {
	      throw new Error(`Invalid vertex: ${u}`)
	    }
	    return Array.from(p(this).vertices.get(u).outVertices.keys())
	  }
	
	  inVertices (u) {
	    if (this.vertex(u) === null) {
	      throw new Error(`Invalid vertex: ${u}`)
	    }
	    return Array.from(p(this).vertices.get(u).inVertices.keys())
	  }
	
	  numVertices () {
	    return p(this).numVertices
	  }
	
	  numEdges () {
	    return p(this).numEdges
	  }
	
	  outDegree (u) {
	    if (this.vertex(u) === null) {
	      throw new Error(`Invalid vertex: ${u}`)
	    }
	    return p(this).vertices.get(u).outVertices.size
	  }
	
	  inDegree (u) {
	    if (this.vertex(u) === null) {
	      throw new Error(`Invalid vertex: ${u}`)
	    }
	    return p(this).vertices.get(u).inVertices.size
	  }
	
	  addVertex (u, obj = {}) {
	    if (this.vertex(u)) {
	      throw new Error(`Duplicated vertex: ${u}`)
	    }
	    p(this).vertices.set(u, {
	      outVertices: new Map(),
	      inVertices: new Map(),
	      data: obj
	    })
	    p(this).numVertices++
	    return this
	  }
	
	  addEdge (u, v, obj = {}) {
	    if (this.vertex(u) === null) {
	      throw new Error(`Invalid vertex: ${u}`)
	    }
	    if (this.vertex(v) === null) {
	      throw new Error(`Invalid vertex: ${v}`)
	    }
	    if (this.edge(u, v)) {
	      throw new Error(`Duplicated edge: (${u}, ${v})`)
	    }
	    p(this).numEdges++
	    p(this).vertices.get(u).outVertices.set(v, obj)
	    p(this).vertices.get(v).inVertices.set(u, obj)
	    return this
	  }
	
	  removeVertex (u) {
	    for (const v of this.outVertices(u)) {
	      this.removeEdge(u, v)
	    }
	    for (const v of this.inVertices(u)) {
	      this.removeEdge(v, u)
	    }
	    p(this).vertices.delete(u)
	    p(this).numVertices--
	    return this
	  }
	
	  removeEdge (u, v) {
	    if (this.edge(u, v) === null) {
	      throw Error(`Invalid edge: (${u}, ${v})`)
	    }
	    p(this).vertices.get(u).outVertices.delete(v)
	    p(this).vertices.get(v).inVertices.delete(u)
	    p(this).numEdges--
	    return this
	  }
	}
	
	module.exports = MutableGraph


/***/ },

/***/ 200:
/***/ function(module, exports) {

	class AbstractGraph {
	  edges () {
	    const edges = []
	    for (const u of this.vertices()) {
	      for (const v of this.outVertices(u)) {
	        edges.push([u, v])
	      }
	    }
	    return edges
	  }
	
	  * outEdges (u) {
	    for (let v of this.outVertices(u)) {
	      yield [u, v]
	    }
	  }
	
	  * inEdges (u) {
	    for (let v of this.inVertices(u)) {
	      yield [v, u]
	    }
	  }
	
	  toString () {
	    const obj = {
	      vertices: this.vertices().map(u => ({u, d: this.vertex(u)})),
	      edges: this.edges().map(([u, v]) => ({u, v, d: this.edge(u, v)}))
	    }
	    return JSON.stringify(obj)
	  }
	}
	
	module.exports = AbstractGraph


/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(199)
	
	const copy = (g) => {
	  const newGraph = new Graph()
	  for (const u of g.vertices()) {
	    newGraph.addVertex(u, g.vertex(u))
	  }
	  for (const [u, v] of g.edges()) {
	    newGraph.addEdge(u, v, g.edge(u, v))
	  }
	  return newGraph
	}
	
	module.exports = copy


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(198)
	const accessor = __webpack_require__(203)
	const connectedComponents = __webpack_require__(204)
	const groupLayers = __webpack_require__(205)
	const cycleRemoval = __webpack_require__(206)
	const layerAssignment = __webpack_require__(209)
	const normalize = __webpack_require__(212)
	const crossingReduction = __webpack_require__(213)
	const positionAssignment = __webpack_require__(217)
	
	const initGraph = (gOrig, {ltor, vertexWidth, vertexHeight, edgeWidth, layerMargin, vertexMargin, vertexLeftMargin, vertexRightMargin, vertexTopMargin, vertexBottomMargin}) => {
	  const g = new Graph()
	  for (const u of gOrig.vertices()) {
	    const d = gOrig.vertex(u)
	    const w = vertexWidth({u, d})
	    const h = vertexHeight({u, d})
	    const horizontalMargin = vertexLeftMargin({u, d}) + vertexRightMargin({u, d})
	    const verticalMargin = vertexTopMargin({u, d}) + vertexBottomMargin({u, d})
	    g.addVertex(u, {
	      width: ltor ? h + vertexMargin + verticalMargin : w + layerMargin + horizontalMargin,
	      height: ltor ? w + layerMargin + horizontalMargin : h + vertexMargin + verticalMargin,
	      origWidth: ltor ? h : w,
	      origHeight: ltor ? w : h
	    })
	  }
	  for (const [u, v] of gOrig.edges()) {
	    g.addEdge(u, v, {
	      width: edgeWidth({
	        u,
	        v,
	        ud: gOrig.vertex(u),
	        vd: gOrig.vertex(v),
	        d: gOrig.edge(u, v)
	      })
	    })
	  }
	  return g
	}
	
	const simplify = (points, ltor) => {
	  let index = 1
	  while (index < points.length - 1) {
	    const x0 = ltor ? points[index][1] : points[index][0]
	    const x1 = ltor ? points[index + 1][1] : points[index + 1][0]
	    if (x0 === x1) {
	      points.splice(index, 2)
	    } else {
	      index += 2
	    }
	  }
	}
	
	const reversed = (arr) => {
	  const result = []
	  for (const x of arr) {
	    result.unshift(x)
	  }
	  return result
	}
	
	const buildResult = (g, layers, ltor) => {
	  const result = {
	    vertices: {},
	    edges: {}
	  }
	  const layerHeights = []
	
	  for (const u of g.vertices()) {
	    result.edges[u] = {}
	  }
	
	  for (const layer of layers) {
	    let maxHeight = -Infinity
	    for (const u of layer) {
	      maxHeight = Math.max(maxHeight, g.vertex(u).origHeight || 0)
	    }
	    layerHeights.push(maxHeight)
	  }
	
	  for (let i = 0; i < layers.length; ++i) {
	    const layer = layers[i]
	    const layerHeight = layerHeights[i]
	    for (const u of layer) {
	      const uNode = g.vertex(u)
	      if (!uNode.dummy) {
	        result.vertices[u] = {
	          x: ltor ? uNode.y : uNode.x,
	          y: ltor ? uNode.x : uNode.y,
	          width: ltor ? uNode.origHeight : uNode.origWidth,
	          height: ltor ? uNode.origWidth : uNode.origHeight,
	          layer: uNode.layer,
	          order: uNode.order
	        }
	
	        for (const v of g.outVertices(u)) {
	          const points = ltor
	            ? [[uNode.y + (uNode.origHeight || 0) / 2, uNode.x], [uNode.y + layerHeight / 2, uNode.x]]
	            : [[uNode.x, uNode.y + (uNode.origHeight || 0) / 2], [uNode.x, uNode.y + layerHeight / 2]]
	          let w = v
	          let wNode = g.vertex(w)
	          let j = i + 1
	          while (wNode.dummy) {
	            if (ltor) {
	              points.push([wNode.y - layerHeights[j] / 2, wNode.x])
	              points.push([wNode.y + layerHeights[j] / 2, wNode.x])
	            } else {
	              points.push([wNode.x, wNode.y - layerHeights[j] / 2])
	              points.push([wNode.x, wNode.y + layerHeights[j] / 2])
	            }
	            w = g.outVertices(w)[0]
	            wNode = g.vertex(w)
	            j += 1
	          }
	          if (ltor) {
	            points.push([wNode.y - layerHeights[j] / 2, wNode.x])
	            points.push([wNode.y - (wNode.origHeight || 0) / 2, wNode.x])
	          } else {
	            points.push([wNode.x, wNode.y - layerHeights[j] / 2])
	            points.push([wNode.x, wNode.y - (wNode.origHeight || 0) / 2])
	          }
	          simplify(points, ltor)
	          if (g.edge(u, v).reversed) {
	            result.edges[w][u] = {
	              points: reversed(points),
	              reversed: true,
	              width: g.edge(u, v).width
	            }
	          } else {
	            result.edges[u][w] = {
	              points: points,
	              reversed: false,
	              width: g.edge(u, v).width
	            }
	          }
	        }
	      }
	    }
	  }
	
	  return result
	}
	
	const privates = new WeakMap()
	
	class SugiyamaLayouter {
	  constructor () {
	    privates.set(this, {
	      vertexWidth: ({d}) => d.width,
	      vertexHeight: ({d}) => d.height,
	      edgeWidth: () => 1,
	      layerMargin: 10,
	      vertexMargin: 10,
	      vertexLeftMargin: () => 0,
	      vertexRightMargin: () => 0,
	      vertexTopMargin: () => 0,
	      vertexBottomMargin: () => 0,
	      edgeMargin: 10,
	      ltor: true,
	      cycleRemoval: new cycleRemoval.CycleRemoval(),
	      layerAssignment: new layerAssignment.QuadHeuristic(),
	      crossingReduction: new crossingReduction.LayerSweep(),
	      positionAssignment: new positionAssignment.Brandes()
	    })
	  }
	
	  layout (gOrig) {
	    const g = initGraph(gOrig, {
	      vertexWidth: this.vertexWidth(),
	      vertexHeight: this.vertexHeight(),
	      edgeWidth: this.edgeWidth(),
	      layerMargin: this.layerMargin(),
	      vertexMargin: this.vertexMargin(),
	      vertexLeftMargin: this.vertexLeftMargin(),
	      vertexRightMargin: this.vertexRightMargin(),
	      vertexTopMargin: this.vertexTopMargin(),
	      vertexBottomMargin: this.vertexBottomMargin(),
	      ltor: this.ltor()
	    })
	    this.cycleRemoval().call(g)
	    const layerMap = this.layerAssignment().call(g)
	    const layers = groupLayers(g, layerMap, true)
	    normalize(g, layers, layerMap, this.edgeMargin(), this.layerMargin())
	    const normalizedLayers = layers.map(() => [])
	    for (const component of connectedComponents(g)) {
	      const vertices = new Set(component)
	      const componentLayers = layers.map((h) => h.filter((u) => vertices.has(u)))
	      this.crossingReduction().call(g, componentLayers)
	      for (let i = 0; i < layers.length; ++i) {
	        for (const u of componentLayers[i]) {
	          normalizedLayers[i].push(u)
	        }
	      }
	    }
	    for (let i = 0; i < normalizedLayers.length; ++i) {
	      const layer = normalizedLayers[i]
	      for (let j = 0; j < layer.length; ++j) {
	        const u = layer[j]
	        g.vertex(u).layer = i
	        g.vertex(u).order = j
	      }
	    }
	    this.positionAssignment().call(g, normalizedLayers)
	    return buildResult(g, normalizedLayers, this.ltor())
	  }
	
	  vertexWidth () {
	    return accessor(this, privates, 'vertexWidth', arguments)
	  }
	
	  vertexHeight () {
	    return accessor(this, privates, 'vertexHeight', arguments)
	  }
	
	  edgeWidth () {
	    return accessor(this, privates, 'edgeWidth', arguments)
	  }
	
	  layerMargin () {
	    return accessor(this, privates, 'layerMargin', arguments)
	  }
	
	  vertexMargin () {
	    return accessor(this, privates, 'vertexMargin', arguments)
	  }
	
	  edgeMargin () {
	    return accessor(this, privates, 'edgeMargin', arguments)
	  }
	
	  vertexLeftMargin () {
	    return accessor(this, privates, 'vertexLeftMargin', arguments)
	  }
	
	  vertexRightMargin () {
	    return accessor(this, privates, 'vertexRightMargin', arguments)
	  }
	
	  vertexTopMargin () {
	    return accessor(this, privates, 'vertexTopMargin', arguments)
	  }
	
	  vertexBottomMargin () {
	    return accessor(this, privates, 'vertexBottomMargin', arguments)
	  }
	
	  ltor () {
	    return accessor(this, privates, 'ltor', arguments)
	  }
	
	  cycleRemoval () {
	    return accessor(this, privates, 'cycleRemoval', arguments)
	  }
	
	  layerAssignment () {
	    return accessor(this, privates, 'layerAssignment', arguments)
	  }
	
	  crossingReduction () {
	    return accessor(this, privates, 'crossingReduction', arguments)
	  }
	
	  positionAssignment () {
	    return accessor(this, privates, 'positionAssignment', arguments)
	  }
	}
	
	module.exports = SugiyamaLayouter


/***/ },

/***/ 203:
/***/ function(module, exports) {

	const accessor = (self, privates, key, args) => {
	  if (args.length === 0) {
	    return privates.get(self)[key]
	  }
	  privates.get(self)[key] = args[0]
	  return self
	}
	
	module.exports = accessor


/***/ },

/***/ 204:
/***/ function(module, exports) {

	const markChildren = (graph, u, id, result) => {
	  if (result.has(u)) {
	    const prevId = result.get(u)
	    if (prevId !== id) {
	      for (const v of graph.vertices()) {
	        if (result.get(v) === prevId) {
	          result.set(v, id)
	        }
	      }
	    }
	    return
	  }
	  result.set(u, id)
	  for (const v of graph.outVertices(u)) {
	    markChildren(graph, v, id, result)
	  }
	}
	
	const connectedComponents = (graph) => {
	  const componentIdMap = new Map()
	  for (const u of graph.vertices()) {
	    if (graph.inDegree(u) === 0) {
	      markChildren(graph, u, u, componentIdMap)
	    }
	  }
	  const componentIds = new Set(componentIdMap.values())
	  return Array.from(componentIds).map((u) => {
	    return graph.vertices().filter((v) => componentIdMap.get(v) === u)
	  })
	}
	
	module.exports = connectedComponents


/***/ },

/***/ 205:
/***/ function(module, exports) {

	const groupLayers = (g, layers, allowEmptyLayer) => {
	  const result = []
	  for (const u of g.vertices()) {
	    const layer = layers[u]
	    if (result[layer] === undefined) {
	      result[layer] = []
	    }
	    result[layer].push(u)
	  }
	  if (allowEmptyLayer) {
	    for (let i = 0; i < result.length; ++i) {
	      if (result[i] === undefined) {
	        result[i] = []
	      }
	    }
	    return result
	  } else {
	    return result.filter((h) => h !== undefined)
	  }
	}
	
	module.exports = groupLayers


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	const CycleRemoval = __webpack_require__(207)
	
	module.exports = {CycleRemoval}


/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	const cycleEdges = __webpack_require__(208)
	
	const cycleRemoval = (g) => {
	  for (const [u, v] of cycleEdges(g)) {
	    const obj = g.edge(u, v)
	    g.removeEdge(u, v)
	    if (u === v) {
	      continue
	    }
	    const edge = g.edge(v, u)
	    if (edge) {
	      edge.multiple = true
	    } else {
	      g.addEdge(v, u, Object.assign({reversed: true}, obj))
	    }
	  }
	}
	
	class CycleRemoval {
	  call (g) {
	    cycleRemoval(g)
	  }
	}
	
	module.exports = CycleRemoval


/***/ },

/***/ 208:
/***/ function(module, exports) {

	const cycleEdges = function (g) {
	  const stack = {}
	  const visited = {}
	  const result = []
	
	  const dfs = (u) => {
	    if (visited[u]) {
	      return
	    }
	    visited[u] = true
	    stack[u] = true
	    for (let v of g.outVertices(u)) {
	      if (stack[v]) {
	        result.push([u, v])
	      } else {
	        dfs(v)
	      }
	    }
	    delete stack[u]
	  }
	
	  for (let u of g.vertices()) {
	    dfs(u)
	  }
	
	  return result
	}
	
	module.exports = cycleEdges


/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	const LongestPath = __webpack_require__(210)
	const QuadHeuristic = __webpack_require__(211)
	
	module.exports = {LongestPath, QuadHeuristic}


/***/ },

/***/ 210:
/***/ function(module, exports) {

	const longestPath = (g) => {
	  const visited = {}
	  const layers = {}
	
	  const dfs = (u) => {
	    if (visited[u]) {
	      return layers[u]
	    }
	    visited[u] = true
	
	    let layer = Infinity
	    for (const v of g.outVertices(u)) {
	      layer = Math.min(layer, dfs(v) - 1)
	    }
	    if (layer === Infinity) {
	      layer = 0
	    }
	    layers[u] = layer
	    return layer
	  }
	
	  for (const u of g.vertices()) {
	    if (g.inDegree(u) === 0) {
	      dfs(u)
	    }
	  }
	
	  let minLayer = Infinity
	  for (const u of g.vertices()) {
	    minLayer = Math.min(minLayer, layers[u])
	  }
	  for (const u of g.vertices()) {
	    layers[u] -= minLayer
	  }
	
	  return layers
	}
	
	class LongestPath {
	  call (g) {
	    return longestPath(g)
	  }
	}
	
	module.exports = LongestPath


/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(203)
	const LongestPath = __webpack_require__(210)
	
	const quadHeuristic = (g, repeat) => {
	  const layers = new LongestPath().call(g)
	
	  let minLayer = Infinity
	  let maxLayer = -Infinity
	  for (const u of g.vertices()) {
	    minLayer = Math.min(minLayer, layers[u])
	    maxLayer = Math.max(maxLayer, layers[u])
	  }
	  for (const u of g.vertices()) {
	    if (g.inDegree(u) === 0) {
	      layers[u] = 0
	    } else {
	      layers[u] -= minLayer
	    }
	  }
	
	  const vertices = g.vertices().filter(u => g.inDegree(u) > 0 && g.outDegree(u) > 0)
	  const weights = {}
	  const cmp = (u, v) => weights[v] - weights[u]
	  for (let loop = 0; loop < repeat; ++loop) {
	    for (const u of g.vertices()) {
	      weights[u] = 0
	    }
	    for (const [u, v] of g.edges()) {
	      const l = layers[v] - layers[u]
	      weights[u] += l
	      weights[v] += l
	    }
	
	    vertices.sort(cmp)
	    for (const u of vertices) {
	      let sum = 0
	      let count = 0
	      let leftMax = -Infinity
	      let rightMin = Infinity
	      for (const v of g.inVertices(u)) {
	        const layer = layers[v]
	        leftMax = Math.max(leftMax, layer)
	        sum += layer
	        count += 1
	      }
	      for (const v of g.outVertices(u)) {
	        const layer = layers[v]
	        rightMin = Math.min(rightMin, layer)
	        sum += layer
	        count += 1
	      }
	      layers[u] = Math.min(rightMin - 1, Math.max(leftMax + 1, Math.round(sum / count)))
	    }
	  }
	
	  return layers
	}
	
	const privates = new WeakMap()
	
	class QuadHeuristic {
	  constructor () {
	    privates.set(this, {
	      repeat: 4
	    })
	  }
	
	  call (g) {
	    return quadHeuristic(g, this.repeat())
	  }
	
	  repeat () {
	    return accessor(this, privates, 'repeat', arguments)
	  }
	}
	
	module.exports = QuadHeuristic


/***/ },

/***/ 212:
/***/ function(module, exports) {

	const normalize = (g, layers, layerMap, edgeMargin, layerMargin) => {
	  var i, w1, w2
	  for (let [u, v] of g.edges()) {
	    const d = g.edge(u, v)
	    if (layerMap[v] - layerMap[u] > 1) {
	      w1 = u
	      for (i = layerMap[u] + 1; i < layerMap[v]; ++i) {
	        w2 = Symbol()
	        g.addVertex(w2, {
	          dummy: true,
	          width: d.width + edgeMargin,
	          origWidth: d.width + edgeMargin,
	          height: layerMargin,
	          origHeight: 0,
	          layer: i
	        })
	        g.addEdge(w1, w2, {
	          dummy: true,
	          reversed: g.edge(u, v).reversed,
	          width: d.width
	        })
	        layers[i].push(w2)
	        w1 = w2
	      }
	      g.addEdge(w1, v, {
	        dummy: true,
	        reversed: g.edge(u, v).reversed,
	        width: d.width
	      })
	      g.removeEdge(u, v)
	    }
	  }
	}
	
	module.exports = normalize


/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	const LayerSweep = __webpack_require__(214)
	
	module.exports = {LayerSweep}


/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(203)
	const baryCenter = __webpack_require__(215)
	
	const privates = new WeakMap()
	
	class LayerSweep {
	  constructor () {
	    privates.set(this, {
	      repeat: 8,
	      method: baryCenter
	    })
	  }
	
	  call (g, layers) {
	    const n = layers.length
	    const repeat = this.repeat()
	    const method = this.method()
	
	    for (let loop = 0; loop < repeat; ++loop) {
	      for (let i = 1; i < n; ++i) {
	        method(g, layers[i - 1], layers[i])
	      }
	      for (let i = n - 1; i > 0; --i) {
	        method(g, layers[i - 1], layers[i], true)
	      }
	    }
	  }
	
	  repeat (arg) {
	    return accessor(this, privates, 'repeat', arguments)
	  }
	
	  method (arg) {
	    return accessor(this, privates, 'method', arguments)
	  }
	}
	
	module.exports = LayerSweep


/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	const layerMatrix = __webpack_require__(216)
	
	const baryCenter = (g, h1, h2, inverse = false) => {
	  const centers = {}
	  const n = h1.length
	  const m = h2.length
	  const a = layerMatrix(g, h1, h2)
	  const cmp = (u, v) => centers[u] - centers[v]
	  if (inverse) {
	    for (let i = 0; i < n; ++i) {
	      let sum = 0
	      let count = 0
	      for (let j = 0; j < m; ++j) {
	        const aij = a[i * m + j]
	        count += aij
	        sum += j * aij
	      }
	      centers[h1[i]] = sum / count
	    }
	    h1.sort(cmp)
	  } else {
	    for (let j = 0; j < m; ++j) {
	      let sum = 0
	      let count = 0
	      for (let i = 0; i < n; ++i) {
	        const aij = a[i * m + j]
	        count += aij
	        sum += i * aij
	      }
	      centers[h2[j]] = sum / count
	    }
	    h2.sort(cmp)
	  }
	}
	
	module.exports = baryCenter


/***/ },

/***/ 216:
/***/ function(module, exports) {

	const layerMatrix = (g, h1, h2) => {
	  const n = h1.length
	  const m = h2.length
	  const orders = {}
	  const a = new Int8Array(n * m)
	
	  for (let i = 0; i < m; ++i) {
	    orders[h2[i]] = i
	  }
	  for (let i = 0; i < n; ++i) {
	    const u = h1[i]
	    for (const v of g.outVertices(u)) {
	      a[i * m + orders[v]] = 1
	    }
	  }
	  return a
	}
	
	module.exports = layerMatrix


/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	const Brandes = __webpack_require__(218)
	
	module.exports = {Brandes}


/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	const markConflicts = __webpack_require__(219)
	const verticalAlignment = __webpack_require__(221)
	const horizontalCompaction = __webpack_require__(223)
	
	const sort = (xs) => {
	  xs.sort((x1, x2) => x1 - x2)
	}
	
	const brandes = (g, layers) => {
	  markConflicts(g, layers)
	
	  const xs = {}
	  for (const u of g.vertices()) {
	    xs[u] = []
	  }
	  const directions = [
	    {rtol: false, btot: false},
	    {rtol: true, btot: false},
	    {rtol: false, btot: true},
	    {rtol: true, btot: true}
	  ]
	
	  let minWidthLeft = -Infinity
	  let minWidthRight = Infinity
	  for (let i = 0; i < directions.length; ++i) {
	    const direction = directions[i]
	    verticalAlignment(g, layers, direction)
	    horizontalCompaction(g, layers, direction)
	    let minX = Infinity
	    let maxX = -Infinity
	    for (const u of g.vertices()) {
	      if (direction.rtol) {
	        g.vertex(u).x = -g.vertex(u).x
	      }
	      minX = Math.min(minX, g.vertex(u).x)
	      maxX = Math.max(maxX, g.vertex(u).x)
	    }
	    if (maxX - minX < minWidthRight - minWidthLeft) {
	      minWidthLeft = minX
	      minWidthRight = maxX
	    }
	    for (const u of g.vertices()) {
	      xs[u].push(g.vertex(u).x)
	    }
	  }
	  for (let i = 0; i < directions.length; ++i) {
	    const direction = directions[i]
	    if (direction.rtol) {
	      let maxX = -Infinity
	      for (const u of g.vertices()) {
	        maxX = Math.max(maxX, xs[u][i])
	      }
	      for (const u of g.vertices()) {
	        xs[u][i] += minWidthRight - maxX
	      }
	    } else {
	      let minX = Infinity
	      for (const u of g.vertices()) {
	        minX = Math.min(minX, xs[u][i])
	      }
	      for (const u of g.vertices()) {
	        xs[u][i] += minWidthLeft - minX
	      }
	    }
	  }
	  for (const u of g.vertices()) {
	    sort(xs[u])
	    g.vertex(u).x = (xs[u][1] + xs[u][2]) / 2
	  }
	}
	
	const normalize = (g) => {
	  let xMin = Infinity
	  let yMin = Infinity
	  for (const u of g.vertices()) {
	    const uNode = g.vertex(u)
	    xMin = Math.min(xMin, uNode.x - uNode.origWidth / 2)
	    yMin = Math.min(yMin, uNode.y - uNode.origHeight / 2)
	  }
	  for (const u of g.vertices()) {
	    const uNode = g.vertex(u)
	    uNode.x -= xMin
	    uNode.y -= yMin
	  }
	}
	
	class Brandes {
	  call (g, layers) {
	    brandes(g, layers)
	
	    let yOffset = 0
	    for (const layer of layers) {
	      let maxHeight = 0
	      for (const u of layer) {
	        maxHeight = Math.max(maxHeight, g.vertex(u).height)
	      }
	      yOffset += maxHeight / 2
	      for (const u of layer) {
	        g.vertex(u).y = yOffset
	      }
	      yOffset += maxHeight / 2
	    }
	
	    normalize(g)
	  }
	}
	
	module.exports = Brandes


/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	const layerEdges = __webpack_require__(220)
	
	const split = (x, f) => {
	  const y = []
	  const z = []
	  for (const xi of x) {
	    if (f(xi)) {
	      y.push(xi)
	    } else {
	      z.push(xi)
	    }
	  }
	  return [y, z]
	}
	
	const markConflicts = (g, layers) => {
	  const h = layers.length - 2
	  const dummy = {}
	  const order = {}
	  const isInner = ([u, v]) => dummy[u] && dummy[v]
	
	  for (const u of g.vertices()) {
	    const d = g.vertex(u)
	    dummy[u] = !!d.dummy
	    order[u] = d.order
	  }
	
	  for (let i = 1; i < h; ++i) {
	    const h1 = layers[i]
	    const h2 = layers[i + 1]
	    const edges = layerEdges(g, h1, h2)
	    const [innerSegments, outerSegments] = split(edges, isInner)
	    for (const [u1, v1] of innerSegments) {
	      for (const [u2, v2] of outerSegments) {
	        if ((order[u1] < order[u2] && order[v1] > order[v2]) || (order[u1] > order[u2] && order[v1] < order[v2])) {
	          g.edge(u2, v2).type1Conflict = true
	        }
	      }
	    }
	  }
	}
	
	module.exports = markConflicts


/***/ },

/***/ 220:
/***/ function(module, exports) {

	const layerEdges = (g, h1, h2) => {
	  const result = []
	  for (const v of h2) {
	    for (const u of g.inVertices(v)) {
	      result.push([u, v])
	    }
	  }
	  return result
	}
	
	module.exports = layerEdges


/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	const median = __webpack_require__(222)
	
	const verticalAlignment = (g, layers, { rtol = false, btot = false }) => {
	  const iterLayers = function * () {
	    if (btot) {
	      for (let i = layers.length - 2; i >= 0; --i) {
	        yield layers[i]
	      }
	    } else {
	      for (let i = 1; i < layers.length; ++i) {
	        yield layers[i]
	      }
	    }
	  }
	
	  const iterLayer = function * (layer) {
	    if (rtol) {
	      for (let i = layer.length - 1; i >= 0; --i) {
	        yield layer[i]
	      }
	    } else {
	      for (let i = 0; i < layer.length; ++i) {
	        yield layer[i]
	      }
	    }
	  }
	
	  const edge = btot ? (u, v) => g.edge(v, u) : (u, v) => g.edge(u, v)
	  const degree = btot ? u => g.outDegree(u) : u => g.inDegree(u)
	  const med = btot ? (g, layers) => median(g, layers, true) : (g, layers) => median(g, layers)
	  for (const u of g.vertices()) {
	    g.vertex(u).root = u
	    g.vertex(u).align = u
	  }
	  for (const layer of iterLayers()) {
	    let r = rtol ? Infinity : -Infinity
	    for (const v of iterLayer(layer)) {
	      if (degree(v) > 0) {
	        const {left, right} = med(g, v)
	        const medians = left === right ? [left] : (rtol ? [right, left] : [left, right])
	        for (const u of medians) {
	          if (!edge(u, v).type1Conflict && !edge(u, v).type2Conflict) {
	            if (rtol ? r > g.vertex(u).order : r < g.vertex(u).order) {
	              g.vertex(v).align = g.vertex(v).root = g.vertex(u).root
	              g.vertex(u).align = v
	              r = g.vertex(u).order
	              break
	            }
	          }
	        }
	      }
	    }
	  }
	}
	
	module.exports = verticalAlignment


/***/ },

/***/ 222:
/***/ function(module, exports) {

	const median = (g, v, inverse = false) => {
	  const vertices = Array.from(inverse ? g.outVertices(v) : g.inVertices(v))
	  vertices.sort((u1, u2) => g.vertex(u1).order - g.vertex(u2).order)
	  const index = (vertices.length - 1) / 2
	  return {
	    left: vertices[Math.floor(index)],
	    right: vertices[Math.ceil(index)]
	  }
	}
	
	module.exports = median


/***/ },

/***/ 223:
/***/ function(module, exports) {

	const horizontalCompaction = (g, layers, { rtol = false }) => {
	  const orderNonZero = (node) => rtol
	    ? node.order < layers[node.layer].length - 1
	    : node.order > 0
	  const predecessor = rtol
	    ? node => layers[node.layer][node.order + 1]
	    : node => layers[node.layer][node.order - 1]
	
	  const placeBlock = (v) => {
	    const vNode = g.vertex(v)
	    if (vNode.x !== null) {
	      return
	    }
	    vNode.x = 0
	    let w = v
	    do {
	      const wNode = g.vertex(w)
	      if (orderNonZero(wNode)) {
	        const p = predecessor(wNode)
	        const pNode = g.vertex(p)
	        const u = pNode.root
	        const uNode = g.vertex(u)
	        placeBlock(u)
	        if (vNode.sink === v) {
	          vNode.sink = uNode.sink
	        }
	        if (vNode.sink === uNode.sink) {
	          vNode.x = Math.max(vNode.x, uNode.x + (pNode.width + wNode.width) / 2)
	        } else {
	          const uSinkNode = g.vertex(uNode.sink)
	          uSinkNode.shift = Math.min(uSinkNode.shift, vNode.x - uNode.x - (pNode.width + wNode.width) / 2)
	        }
	      }
	      w = wNode.align
	    } while (w !== v)
	  }
	
	  for (const u of g.vertices()) {
	    const uNode = g.vertex(u)
	    uNode.sink = u
	    uNode.shift = Infinity
	    uNode.x = null
	  }
	  for (const u of g.vertices()) {
	    if (g.vertex(u).root === u) {
	      placeBlock(u)
	    }
	  }
	  for (const u of g.vertices()) {
	    const uNode = g.vertex(u)
	    uNode.x = g.vertex(uNode.root).x
	  }
	  for (const u of g.vertices()) {
	    const uNode = g.vertex(u)
	    const shift = g.vertex(g.vertex(uNode.root).sink).shift
	    if (shift < Infinity) {
	      uNode.x += shift
	    }
	  }
	}
	
	module.exports = horizontalCompaction


/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(198)
	const accessor = __webpack_require__(203)
	const cycleRemoval = __webpack_require__(206)
	const layerAssignment = __webpack_require__(209)
	const groupLayers = __webpack_require__(205)
	const rectangular = __webpack_require__(225)
	
	const edgeConcentration = (g, h1, h2, method, dummy, idGenerator) => {
	  const subgraph = new Graph()
	  for (const u of h1) {
	    subgraph.addVertex(u, g.vertex(u))
	  }
	  for (const u of h2) {
	    subgraph.addVertex(u, g.vertex(u))
	  }
	  for (const u of h1) {
	    for (const v of h2) {
	      if (g.edge(u, v)) {
	        subgraph.addEdge(u, v, g.edge(u, v))
	      }
	    }
	  }
	
	  for (const concentration of method(subgraph, h1, h2)) {
	    const w = idGenerator(g, h1, h2)
	    g.addVertex(w, dummy(concentration.source, concentration.target))
	    for (const u of concentration.source) {
	      g.addEdge(u, w)
	    }
	    for (const v of concentration.target) {
	      g.addEdge(w, v)
	    }
	    for (const u of g.inVertices(w)) {
	      for (const v of g.outVertices(w)) {
	        if (g.edge(u, v)) {
	          g.removeEdge(u, v)
	        }
	      }
	    }
	  }
	}
	
	const privates = new WeakMap()
	
	class EdgeConcentrationTransformer {
	  constructor () {
	    privates.set(this, {
	      cycleRemoval: new cycleRemoval.CycleRemoval(),
	      layerAssignment: new layerAssignment.QuadHeuristic(),
	      method: rectangular,
	      dummy: () => ({dummy: true}),
	      idGenerator: () => Symbol()
	    })
	  }
	
	  transform (g) {
	    this.cycleRemoval().call(g)
	    const layerMap = this.layerAssignment().call(g)
	    const layers = groupLayers(g, layerMap)
	    for (let i = 0; i < layers.length - 1; ++i) {
	      const h1 = layers[i]
	      const h2 = new Set()
	      let edges = 0
	      for (const u of h1) {
	        for (const v of g.outVertices(u)) {
	          h2.add(v)
	          edges += 1
	        }
	      }
	      edgeConcentration(g, h1, Array.from(h2.values()), this.method(), this.dummy(), this.idGenerator())
	    }
	    return g
	  }
	
	  cycleRemoval () {
	    return accessor(this, privates, 'cycleRemoval', arguments)
	  }
	
	  layerAssignment () {
	    return accessor(this, privates, 'layerAssignment', arguments)
	  }
	
	  method () {
	    return accessor(this, privates, 'method', arguments)
	  }
	
	  dummy () {
	    return accessor(this, privates, 'dummy', arguments)
	  }
	
	  idGenerator () {
	    return accessor(this, privates, 'idGenerator', arguments)
	  }
	}
	
	module.exports = EdgeConcentrationTransformer


/***/ },

/***/ 225:
/***/ function(module, exports) {

	const layerVertices = (g, h1, h2) => {
	  const us = new Set(h1)
	  const vertices = {}
	  for (const v of h2) {
	    vertices[v] = new Set()
	    for (const u of g.inVertices(v)) {
	      if (us.has(u)) {
	        vertices[v].add(u)
	      }
	    }
	  }
	  return vertices
	}
	
	const rectangular = (g, h1, h2) => {
	  if (h1.length === 0 || h2.length === 0) {
	    return []
	  }
	  const k = g.numEdges()
	  const active = {}
	  const vertices = layerVertices(g, h1, h2)
	  const isActive = (u) => active[u]
	  const cmp = (v1, v2) => vertices[v2].size - vertices[v1].size
	  const d = (s, t) => {
	    let count = 0
	    for (const u of s) {
	      for (const v of t) {
	        if (vertices[v].has(u)) {
	          count += 1
	        }
	      }
	    }
	    return count - s.length - t.length
	  }
	  h2 = Array.from(h2)
	
	  const concentrations = []
	  let jOffset = 0
	  for (let l = 0; l < k; ++l) {
	    for (const u of h1) {
	      active[u] = true
	    }
	
	    h2.sort(cmp)
	    if (vertices[h2[jOffset]].size <= 0) {
	      break
	    }
	
	    let maxD = -1
	    let maxH1
	    let maxH2
	    let tmpH2 = []
	    for (let j = jOffset; j < h2.length; ++j) {
	      const v = h2[j]
	      let count = 0
	      for (const u of h1) {
	        if (active[u]) {
	          if (g.edge(u, v)) {
	            count += 1
	          } else {
	            active[u] = false
	          }
	        }
	      }
	      tmpH2.push(v)
	      let tmpH1 = h1.filter(isActive)
	      let tmpD = d(tmpH1, tmpH2)
	      if (tmpD > maxD) {
	        maxD = tmpD
	        maxH1 = tmpH1
	        maxH2 = Array.from(tmpH2)
	      }
	    }
	
	    if (maxD > -1) {
	      for (const v of maxH2) {
	        for (const u of maxH1) {
	          vertices[v].delete(u)
	        }
	      }
	      concentrations.push({
	        source: Array.from(maxH1),
	        target: Array.from(maxH2)
	      })
	      jOffset = 0
	    } else {
	      jOffset += 1
	    }
	
	    if (jOffset >= h2.length) {
	      break
	    }
	  }
	
	  return concentrations
	}
	
	module.exports = rectangular


/***/ },

/***/ 226:
/***/ function(module, exports) {

	const hashKey = (vertices) => {
	  return vertices.map((u) => u.toString()).join(',')
	}
	
	const maxKey = (iter) => {
	  let maxVal = -Infinity
	  let result = null
	  for (const [id, val] of iter) {
	    if (val > maxVal) {
	      maxVal = val
	      result = id
	    }
	  }
	  return result
	}
	
	const partition = (graph, U) => {
	  const L = new Set()
	  for (const u of U) {
	    for (const v of graph.outVertices(u)) {
	      L.add(v)
	    }
	  }
	  const hashKeys = new Map()
	  for (const u of U) {
	    hashKeys.set(u, hashKey(graph.outVertices(u)))
	  }
	  for (const u of L) {
	    const degrees = graph.inVertices(u).map((v) => [v, graph.outDegree(v)])
	    const maxId = maxKey(degrees)
	    hashKeys.set(u, hashKeys.get(maxId))
	  }
	  let changed = false
	  do {
	    changed = false
	    for (const u of U) {
	      const M = new Map()
	      for (const v of graph.outVertices(u)) {
	        const hash = hashKeys.get(v)
	        if (!M.has(hash)) {
	          M.set(hash, 0)
	        }
	        M.set(hash, M.get(hash) + 1)
	      }
	      const newKey = maxKey(M.entries())
	      if (hashKeys.get(u) !== newKey) {
	        changed = true
	        hashKeys.set(u, newKey)
	      }
	    }
	    for (const u of L) {
	      const M = new Map()
	      for (const v of graph.inVertices(u)) {
	        const hash = hashKeys.get(v)
	        if (!M.has(hash)) {
	          M.set(hash, 0)
	        }
	        M.set(hash, M.get(hash) + 1)
	      }
	      const newKey = maxKey(M.entries())
	      if (hashKeys.get(u) !== newKey) {
	        changed = true
	        hashKeys.set(u, newKey)
	      }
	    }
	  } while (changed)
	  const result = new Map()
	  for (const u of U) {
	    const hash = hashKeys.get(u)
	    if (!result.has(hash)) {
	      result.set(hash, [])
	    }
	    result.get(hash).push(u)
	  }
	  return Array.from(result.values())
	}
	
	const augument = (graph, S) => {
	  const result = new Set()
	  for (const u of S) {
	    for (const v of graph.outVertices(u)) {
	      for (const w of graph.inVertices(v)) {
	        result.add(w)
	      }
	    }
	  }
	  return Array.from(result)
	}
	
	const quasiBicliqueMining = (graph, mu, S) => {
	  const C = new Map()
	  for (const u of S) {
	    const tmpS = new Set()
	    const tmpT = new Set(graph.outVertices(u))
	    C.set(hashKey(Array.from(tmpT)), {source: tmpS, target: tmpT})
	  }
	  for (const key of C.keys()) {
	    const M = new Map()
	    for (const v of C.get(key).target) {
	      for (const u of graph.inVertices(v)) {
	        if (!M.has(u)) {
	          M.set(u, 0)
	        }
	        M.set(u, M.get(u) + 1)
	      }
	    }
	    for (const u of M.keys()) {
	      if (M.get(u) >= mu * C.get(key).target.size) {
	        C.get(key).source.add(u)
	      }
	    }
	  }
	
	  const result = Array.from(C.values())
	    .filter(({source, target}) => source.size > 1 && target.size > 1)
	  result.sort((c1, c2) => c1.source.size === c2.source.size ? c2.target.size - c1.target.size : c2.source.size - c1.source.size)
	  if (result.length === 0) {
	    return []
	  }
	  const maximum = result[0]
	  for (let i = 1; i < result.length; ++i) {
	    const tmpS = new Set(maximum.source)
	    const tmpT = new Set(maximum.target)
	    for (const u of result[i].source) {
	      tmpS.add(u)
	    }
	    for (const u of result[i].target) {
	      tmpT.add(u)
	    }
	    let count = 0
	    for (const u of tmpS) {
	      for (const v of tmpT) {
	        if (graph.edge(u, v)) {
	          count += 1
	        }
	      }
	    }
	    if (count < mu * tmpS.size * tmpT.size) {
	      break
	    }
	    maximum.source = Array.from(tmpS)
	    maximum.target = Array.from(tmpT)
	  }
	  return [maximum]
	}
	
	const quasiCliqueLayer = (graph, h1, h2, mu) => {
	  const cliques = []
	  for (const S of partition(graph, h1)) {
	    for (const clique of quasiBicliqueMining(graph, mu, augument(graph, S))) {
	      cliques.push(clique)
	    }
	  }
	  return cliques
	}
	
	module.exports = quasiCliqueLayer


/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _userDefined = __webpack_require__(228);
	
	var _userDefined2 = _interopRequireDefault(_userDefined);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var layerAssignment = function layerAssignment(graph) {
	  return new _userDefined2.default().f(function (u) {
	    var d = graph.vertex(u);
	    if (d.dummy) {
	      return Math.max.apply(Math, _toConsumableArray(graph.inVertices(u).map(function (v) {
	        return graph.vertex(v).layerOrder;
	      }))) * 2 + 1;
	    } else {
	      return d.layerOrder * 2;
	    }
	  });
	};
	
	exports.default = layerAssignment;

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(203)
	
	const privates = new WeakMap()
	
	class UserDefined {
	  constructor () {
	    privates.set(this, {
	      f: () => 0
	    })
	  }
	
	  call (g) {
	    const f = privates.get(this).f
	    const layers = {}
	    for (const u of g.vertices()) {
	      layers[u] = f(u)
	    }
	    return layers
	  }
	
	  f () {
	    return accessor(this, privates, 'f', arguments)
	  }
	}
	
	module.exports = UserDefined


/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDI2MmFhMDg0YmViOTJlODAzMTc/MmQ5YyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9sYXlvdXQtd29ya2VyLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL211dGFibGUtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvYWJzdHJhY3QtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2Nvbm5lY3RlZC1jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1yZW1vdmFsLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtZWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L2xvbmdlc3QtcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL25vcm1hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2xheWVyLXN3ZWVwLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9iYXJ5LWNlbnRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvbWFyay1jb25mbGljdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1lZGdlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvdmVydGljYWwtYWxpZ25tZW50LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbWVkaWFuLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9ob3Jpem9udGFsLWNvbXBhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9yZWN0YW5ndWxhci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcXVhc2ktYmljbGlxdWUtbWluaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9sYXllci1hc3NpZ25tZW50LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvdXNlci1kZWZpbmVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsS0FBTSxXQUFXLFNBQVgsUUFBVyxDQUFDLFFBQUQsRUFBYztBQUM3QixPQUFNLE9BQU8sS0FBSyxHQUFMLGNBQVMsQ0FBVCw0QkFBZSxTQUFTLEdBQVQsQ0FBYTtBQUFBLFNBQUUsQ0FBRixRQUFFLENBQUY7QUFBQSxTQUFLLEtBQUwsUUFBSyxLQUFMO0FBQUEsWUFBZ0IsSUFBSSxRQUFRLENBQTVCO0FBQUEsSUFBYixDQUFmLEdBQWI7QUFDQSxPQUFNLFFBQVEsS0FBSyxHQUFMLGNBQVMsQ0FBVCw0QkFBZSxTQUFTLEdBQVQsQ0FBYTtBQUFBLFNBQUUsQ0FBRixTQUFFLENBQUY7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ1ZBLDJDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLFlBQVk7QUFDakM7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNqR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLDJCQUEyQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBYyxlQUFlO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDNUpBOzs7Ozs7OztBQUVBLEtBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFXO0FBQ2pDLFVBQU8sNEJBQ0osQ0FESSxDQUNGLFVBQUMsQ0FBRCxFQUFPO0FBQ1IsU0FBTSxJQUFJLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FBVjtBQUNBLFNBQUksRUFBRSxLQUFOLEVBQWE7QUFDWCxjQUFPLEtBQUssR0FBTCxnQ0FBWSxNQUFNLFVBQU4sQ0FBaUIsQ0FBakIsRUFBb0IsR0FBcEIsQ0FBd0IsVUFBQyxDQUFEO0FBQUEsZ0JBQU8sTUFBTSxNQUFOLENBQWEsQ0FBYixFQUFnQixVQUF2QjtBQUFBLFFBQXhCLENBQVosS0FBMEUsQ0FBMUUsR0FBOEUsQ0FBckY7QUFDRCxNQUZELE1BRU87QUFDTCxjQUFPLEVBQUUsVUFBRixHQUFlLENBQXRCO0FBQ0Q7QUFDRixJQVJJLENBQVA7QUFTRCxFQVZEOzttQkFZZSxlOzs7Ozs7O0FDZGY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJsYXlvdXQtd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwMjYyYWEwODRiZWI5MmU4MDMxN1xuICoqLyIsIi8qIGVzbGludC1lbnYgd29ya2VyICovXG5cbmltcG9ydCBHcmFwaCBmcm9tICdlZ3JhcGgvZ3JhcGgnXG5pbXBvcnQgY29weSBmcm9tICdlZ3JhcGgvZ3JhcGgvY29weSdcbmltcG9ydCBMYXlvdXRlciBmcm9tICdlZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEnXG5pbXBvcnQgRWRnZUNvbmNlbnRyYXRpb25UcmFuc2Zvcm1lciBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uJ1xuaW1wb3J0IHJlY3Rhbmd1bGFyIGZyb20gJ2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcmVjdGFuZ3VsYXInXG5pbXBvcnQgcXVhc2lCaWNsaXF1ZU1pbmluZyBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZydcbmltcG9ydCBsYXllckFzc2lnbm1lbnQgZnJvbSAnLi4vdXRpbHMvbGF5ZXItYXNzaWdubWVudCdcblxuY29uc3QgY2FsY1NpemUgPSAodmVydGljZXMpID0+IHtcbiAgY29uc3QgbGVmdCA9IE1hdGgubWluKDAsIC4uLnZlcnRpY2VzLm1hcCgoe3gsIHdpZHRofSkgPT4geCAtIHdpZHRoIC8gMikpXG4gIGNvbnN0IHJpZ2h0ID0gTWF0aC5tYXgoMCwgLi4udmVydGljZXMubWFwKCh7eCwgd2lkdGh9KSA9PiB4ICsgd2lkdGggLyAyKSlcbiAgY29uc3QgdG9wID0gTWF0aC5taW4oMCwgLi4udmVydGljZXMubWFwKCh7eSwgaGVpZ2h0fSkgPT4geSAtIGhlaWdodCAvIDIpKVxuICBjb25zdCBib3R0b20gPSBNYXRoLm1heCgwLCAuLi52ZXJ0aWNlcy5tYXAoKHt5LCBoZWlnaHR9KSA9PiB5ICsgaGVpZ2h0IC8gMikpXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHJpZ2h0IC0gbGVmdCxcbiAgICBoZWlnaHQ6IGJvdHRvbSAtIHRvcFxuICB9XG59XG5cbmNvbnN0IGVkZ2VDb3VudCA9ICh2ZXJ0aWNlcywgbmVpZ2hib3JzKSA9PiB7XG4gIHJldHVybiBuZWlnaGJvcnMuZmlsdGVyKCh1KSA9PiB2ZXJ0aWNlcy5pbmRleE9mKHUpID49IDApLmxlbmd0aFxufVxuXG5jb25zdCB0cmFuc2Zvcm0gPSAoZ3JhcGgsIGJpY2x1c3RlcmluZ09wdGlvbikgPT4ge1xuICBpZiAoYmljbHVzdGVyaW5nT3B0aW9uID09PSAnbm9uZScpIHtcbiAgICByZXR1cm4gZ3JhcGhcbiAgfVxuICBjb25zdCB0cmFuc2Zvcm1lciA9IG5ldyBFZGdlQ29uY2VudHJhdGlvblRyYW5zZm9ybWVyKClcbiAgICAubGF5ZXJBc3NpZ25tZW50KGxheWVyQXNzaWdubWVudChncmFwaCkpXG4gICAgLmlkR2VuZXJhdG9yKChncmFwaCkgPT4gTWF0aC5tYXgoLi4uZ3JhcGgudmVydGljZXMoKSkgKyAxKVxuICAgIC5kdW1teSgoKSA9PiAoe1xuICAgICAgZHVtbXk6IHRydWUsXG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGNvbG9yOiAnIzg4OCdcbiAgICB9KSlcbiAgaWYgKGJpY2x1c3RlcmluZ09wdGlvbiA9PT0gJ2VkZ2UtY29uY2VudHJhdGlvbicpIHtcbiAgICB0cmFuc2Zvcm1lci5tZXRob2QocmVjdGFuZ3VsYXIpXG4gIH0gZWxzZSBpZiAoYmljbHVzdGVyaW5nT3B0aW9uID09PSAncXVhc2ktYmljbGlxdWVzJykge1xuICAgIHRyYW5zZm9ybWVyLm1ldGhvZCgoZ3JhcGgsIGgxLCBoMikgPT4gcXVhc2lCaWNsaXF1ZU1pbmluZyhncmFwaCwgaDEsIGgyLCAwLjUpKVxuICB9XG4gIHJldHVybiB0cmFuc2Zvcm1lci50cmFuc2Zvcm0oY29weShncmFwaCkpXG59XG5cbmNvbnN0IGxheW91dCA9IChncmFwaCwge2JpY2x1c3RlcmluZ09wdGlvbiwgbGF5ZXJNYXJnaW4sIHZlcnRleE1hcmdpbn0pID0+IHtcbiAgY29uc3QgdHJhbnNmb3JtZWRHcmFwaCA9IHRyYW5zZm9ybShncmFwaCwgYmljbHVzdGVyaW5nT3B0aW9uKVxuICBjb25zdCBsYXlvdXRlciA9IG5ldyBMYXlvdXRlcigpXG4gICAgLmxheWVyQXNzaWdubWVudChsYXllckFzc2lnbm1lbnQodHJhbnNmb3JtZWRHcmFwaCkpXG4gICAgLmxheWVyTWFyZ2luKGxheWVyTWFyZ2luKVxuICAgIC52ZXJ0ZXhXaWR0aCgoe2R9KSA9PiBkLmR1bW15ID8gMjUgOiAxNjApXG4gICAgLnZlcnRleEhlaWdodCgoe2R9KSA9PiBkLmR1bW15ID8gMTAgOiAyMClcbiAgICAudmVydGV4TWFyZ2luKHZlcnRleE1hcmdpbilcbiAgICAuZWRnZVdpZHRoKCgpID0+IDMpXG4gICAgLmVkZ2VNYXJnaW4oMylcbiAgY29uc3QgcG9zaXRpb25zID0gbGF5b3V0ZXIubGF5b3V0KHRyYW5zZm9ybWVkR3JhcGgpXG5cbiAgY29uc3QgdmVydGljZXMgPSBbXVxuICBmb3IgKGNvbnN0IHUgb2YgdHJhbnNmb3JtZWRHcmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgZCA9IHRyYW5zZm9ybWVkR3JhcGgudmVydGV4KHUpXG4gICAgaWYgKGQuZHVtbXkpIHtcbiAgICAgIGQuVSA9IHRyYW5zZm9ybWVkR3JhcGguaW5WZXJ0aWNlcyh1KVxuICAgICAgZC5MID0gdHJhbnNmb3JtZWRHcmFwaC5vdXRWZXJ0aWNlcyh1KVxuICAgIH1cbiAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwb3NpdGlvbnMudmVydGljZXNbdV1cbiAgICB2ZXJ0aWNlcy5wdXNoKHt1LCBkLCB4LCB5LCB3aWR0aCwgaGVpZ2h0fSlcbiAgfVxuXG4gIGNvbnN0IGVkZ2VzID0gW11cbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgdHJhbnNmb3JtZWRHcmFwaC5lZGdlcygpKSB7XG4gICAgaWYgKHBvc2l0aW9ucy5lZGdlc1t1XVt2XSkge1xuICAgICAgY29uc3QgZCA9IHRyYW5zZm9ybWVkR3JhcGguZWRnZSh1LCB2KVxuICAgICAgY29uc3QgdWQgPSB0cmFuc2Zvcm1lZEdyYXBoLnZlcnRleCh1KVxuICAgICAgY29uc3QgdmQgPSB0cmFuc2Zvcm1lZEdyYXBoLnZlcnRleCh2KVxuICAgICAgY29uc3Qge3BvaW50cywgd2lkdGgsIHJldmVyc2VkfSA9IHBvc2l0aW9ucy5lZGdlc1t1XVt2XVxuICAgICAgd2hpbGUgKHBvaW50cy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHBvaW50cy5wdXNoKHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pXG4gICAgICB9XG4gICAgICBsZXQgb3BhY2l0eVxuICAgICAgaWYgKHVkLmR1bW15KSB7XG4gICAgICAgIG9wYWNpdHkgPSBlZGdlQ291bnQodWQuVSwgZ3JhcGguaW5WZXJ0aWNlcyh2KSkgLyB1ZC5VLmxlbmd0aFxuICAgICAgfSBlbHNlIGlmICh2ZC5kdW1teSkge1xuICAgICAgICBvcGFjaXR5ID0gZWRnZUNvdW50KHZkLkwsIGdyYXBoLm91dFZlcnRpY2VzKHUpKSAvIHZkLkwubGVuZ3RoXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGFjaXR5ID0gMVxuICAgICAgfVxuICAgICAgZWRnZXMucHVzaCh7dSwgdiwgdWQsIHZkLCBkLCBwb2ludHMsIHJldmVyc2VkLCB3aWR0aCwgb3BhY2l0eX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe3ZlcnRpY2VzLCBlZGdlc30sIGNhbGNTaXplKHZlcnRpY2VzKSlcbn1cblxub25tZXNzYWdlID0gKHtkYXRhfSkgPT4ge1xuICBjb25zdCB7dmVydGljZXMsIGVkZ2VzLCBvcHRpb25zfSA9IGRhdGFcbiAgY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHt1LCBkfSBvZiB2ZXJ0aWNlcykge1xuICAgIGdyYXBoLmFkZFZlcnRleCh1LCBkKVxuICB9XG4gIGZvciAoY29uc3Qge3UsIHYsIGR9IG9mIGVkZ2VzKSB7XG4gICAgZ3JhcGguYWRkRWRnZSh1LCB2LCBkKVxuICB9XG5cbiAgcG9zdE1lc3NhZ2UobGF5b3V0KGdyYXBoLCBvcHRpb25zKSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3dvcmtlcnMvbGF5b3V0LXdvcmtlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tdXRhYmxlLWdyYXBoJylcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5OFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQWJzdHJhY3RHcmFwaCA9IHJlcXVpcmUoJy4vYWJzdHJhY3QtZ3JhcGgnKVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY29uc3QgcCA9IChzZWxmKSA9PiBwcml2YXRlcy5nZXQoc2VsZilcblxuY2xhc3MgTXV0YWJsZUdyYXBoIGV4dGVuZHMgQWJzdHJhY3RHcmFwaCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIHZlcnRpY2VzOiBuZXcgTWFwKCksXG4gICAgICBudW1WZXJ0aWNlczogMCxcbiAgICAgIG51bUVkZ2VzOiAwXG4gICAgfSlcbiAgfVxuXG4gIHZlcnRleCAodSkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gcCh0aGlzKS52ZXJ0aWNlc1xuICAgIGlmICh2ZXJ0aWNlcy5nZXQodSkpIHtcbiAgICAgIHJldHVybiB2ZXJ0aWNlcy5nZXQodSkuZGF0YVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZWRnZSAodSwgdikge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gcCh0aGlzKS52ZXJ0aWNlc1xuICAgIGlmICh2ZXJ0aWNlcy5nZXQodSkgJiYgdmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLmdldCh2KSkge1xuICAgICAgcmV0dXJuIHZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5nZXQodilcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZlcnRpY2VzICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwKHRoaXMpLnZlcnRpY2VzLmtleXMoKSlcbiAgfVxuXG4gIG91dFZlcnRpY2VzICh1KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMua2V5cygpKVxuICB9XG5cbiAgaW5WZXJ0aWNlcyAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHAodGhpcykudmVydGljZXMuZ2V0KHUpLmluVmVydGljZXMua2V5cygpKVxuICB9XG5cbiAgbnVtVmVydGljZXMgKCkge1xuICAgIHJldHVybiBwKHRoaXMpLm51bVZlcnRpY2VzXG4gIH1cblxuICBudW1FZGdlcyAoKSB7XG4gICAgcmV0dXJuIHAodGhpcykubnVtRWRnZXNcbiAgfVxuXG4gIG91dERlZ3JlZSAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5zaXplXG4gIH1cblxuICBpbkRlZ3JlZSAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5pblZlcnRpY2VzLnNpemVcbiAgfVxuXG4gIGFkZFZlcnRleCAodSwgb2JqID0ge30pIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICBwKHRoaXMpLnZlcnRpY2VzLnNldCh1LCB7XG4gICAgICBvdXRWZXJ0aWNlczogbmV3IE1hcCgpLFxuICAgICAgaW5WZXJ0aWNlczogbmV3IE1hcCgpLFxuICAgICAgZGF0YTogb2JqXG4gICAgfSlcbiAgICBwKHRoaXMpLm51bVZlcnRpY2VzKytcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkRWRnZSAodSwgdiwgb2JqID0ge30pIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICBpZiAodGhpcy52ZXJ0ZXgodikgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dn1gKVxuICAgIH1cbiAgICBpZiAodGhpcy5lZGdlKHUsIHYpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZWQgZWRnZTogKCR7dX0sICR7dn0pYClcbiAgICB9XG4gICAgcCh0aGlzKS5udW1FZGdlcysrXG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMuc2V0KHYsIG9iailcbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh2KS5pblZlcnRpY2VzLnNldCh1LCBvYmopXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZVZlcnRleCAodSkge1xuICAgIGZvciAoY29uc3QgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICB0aGlzLnJlbW92ZUVkZ2UodSwgdilcbiAgICB9XG4gICAgZm9yIChjb25zdCB2IG9mIHRoaXMuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgdGhpcy5yZW1vdmVFZGdlKHYsIHUpXG4gICAgfVxuICAgIHAodGhpcykudmVydGljZXMuZGVsZXRlKHUpXG4gICAgcCh0aGlzKS5udW1WZXJ0aWNlcy0tXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZUVkZ2UgKHUsIHYpIHtcbiAgICBpZiAodGhpcy5lZGdlKHUsIHYpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBlZGdlOiAoJHt1fSwgJHt2fSlgKVxuICAgIH1cbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5kZWxldGUodilcbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh2KS5pblZlcnRpY2VzLmRlbGV0ZSh1KVxuICAgIHAodGhpcykubnVtRWRnZXMtLVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNdXRhYmxlR3JhcGhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9tdXRhYmxlLWdyYXBoLmpzXG4gKiogbW9kdWxlIGlkID0gMTk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjbGFzcyBBYnN0cmFjdEdyYXBoIHtcbiAgZWRnZXMgKCkge1xuICAgIGNvbnN0IGVkZ2VzID0gW11cbiAgICBmb3IgKGNvbnN0IHUgb2YgdGhpcy52ZXJ0aWNlcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBlZGdlcy5wdXNoKFt1LCB2XSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVkZ2VzXG4gIH1cblxuICAqIG91dEVkZ2VzICh1KSB7XG4gICAgZm9yIChsZXQgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICB5aWVsZCBbdSwgdl1cbiAgICB9XG4gIH1cblxuICAqIGluRWRnZXMgKHUpIHtcbiAgICBmb3IgKGxldCB2IG9mIHRoaXMuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgeWllbGQgW3YsIHVdXG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgIHZlcnRpY2VzOiB0aGlzLnZlcnRpY2VzKCkubWFwKHUgPT4gKHt1LCBkOiB0aGlzLnZlcnRleCh1KX0pKSxcbiAgICAgIGVkZ2VzOiB0aGlzLmVkZ2VzKCkubWFwKChbdSwgdl0pID0+ICh7dSwgdiwgZDogdGhpcy5lZGdlKHUsIHYpfSkpXG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBYnN0cmFjdEdyYXBoXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvZ3JhcGgvYWJzdHJhY3QtZ3JhcGguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IEdyYXBoID0gcmVxdWlyZSgnLi9tdXRhYmxlLWdyYXBoJylcblxuY29uc3QgY29weSA9IChnKSA9PiB7XG4gIGNvbnN0IG5ld0dyYXBoID0gbmV3IEdyYXBoKClcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIG5ld0dyYXBoLmFkZFZlcnRleCh1LCBnLnZlcnRleCh1KSlcbiAgfVxuICBmb3IgKGNvbnN0IFt1LCB2XSBvZiBnLmVkZ2VzKCkpIHtcbiAgICBuZXdHcmFwaC5hZGRFZGdlKHUsIHYsIGcuZWRnZSh1LCB2KSlcbiAgfVxuICByZXR1cm4gbmV3R3JhcGhcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvZ3JhcGgvY29weS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgR3JhcGggPSByZXF1aXJlKCcuLi8uLi9ncmFwaCcpXG5jb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcbmNvbnN0IGNvbm5lY3RlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuL21pc2MvY29ubmVjdGVkLWNvbXBvbmVudHMnKVxuY29uc3QgZ3JvdXBMYXllcnMgPSByZXF1aXJlKCcuL21pc2MvZ3JvdXAtbGF5ZXJzJylcbmNvbnN0IGN5Y2xlUmVtb3ZhbCA9IHJlcXVpcmUoJy4vY3ljbGUtcmVtb3ZhbCcpXG5jb25zdCBsYXllckFzc2lnbm1lbnQgPSByZXF1aXJlKCcuL2xheWVyLWFzc2lnbm1lbnQnKVxuY29uc3Qgbm9ybWFsaXplID0gcmVxdWlyZSgnLi9ub3JtYWxpemUnKVxuY29uc3QgY3Jvc3NpbmdSZWR1Y3Rpb24gPSByZXF1aXJlKCcuL2Nyb3NzaW5nLXJlZHVjdGlvbicpXG5jb25zdCBwb3NpdGlvbkFzc2lnbm1lbnQgPSByZXF1aXJlKCcuL3Bvc2l0aW9uLWFzc2lnbm1lbnQnKVxuXG5jb25zdCBpbml0R3JhcGggPSAoZ09yaWcsIHtsdG9yLCB2ZXJ0ZXhXaWR0aCwgdmVydGV4SGVpZ2h0LCBlZGdlV2lkdGgsIGxheWVyTWFyZ2luLCB2ZXJ0ZXhNYXJnaW4sIHZlcnRleExlZnRNYXJnaW4sIHZlcnRleFJpZ2h0TWFyZ2luLCB2ZXJ0ZXhUb3BNYXJnaW4sIHZlcnRleEJvdHRvbU1hcmdpbn0pID0+IHtcbiAgY29uc3QgZyA9IG5ldyBHcmFwaCgpXG4gIGZvciAoY29uc3QgdSBvZiBnT3JpZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgZCA9IGdPcmlnLnZlcnRleCh1KVxuICAgIGNvbnN0IHcgPSB2ZXJ0ZXhXaWR0aCh7dSwgZH0pXG4gICAgY29uc3QgaCA9IHZlcnRleEhlaWdodCh7dSwgZH0pXG4gICAgY29uc3QgaG9yaXpvbnRhbE1hcmdpbiA9IHZlcnRleExlZnRNYXJnaW4oe3UsIGR9KSArIHZlcnRleFJpZ2h0TWFyZ2luKHt1LCBkfSlcbiAgICBjb25zdCB2ZXJ0aWNhbE1hcmdpbiA9IHZlcnRleFRvcE1hcmdpbih7dSwgZH0pICsgdmVydGV4Qm90dG9tTWFyZ2luKHt1LCBkfSlcbiAgICBnLmFkZFZlcnRleCh1LCB7XG4gICAgICB3aWR0aDogbHRvciA/IGggKyB2ZXJ0ZXhNYXJnaW4gKyB2ZXJ0aWNhbE1hcmdpbiA6IHcgKyBsYXllck1hcmdpbiArIGhvcml6b250YWxNYXJnaW4sXG4gICAgICBoZWlnaHQ6IGx0b3IgPyB3ICsgbGF5ZXJNYXJnaW4gKyBob3Jpem9udGFsTWFyZ2luIDogaCArIHZlcnRleE1hcmdpbiArIHZlcnRpY2FsTWFyZ2luLFxuICAgICAgb3JpZ1dpZHRoOiBsdG9yID8gaCA6IHcsXG4gICAgICBvcmlnSGVpZ2h0OiBsdG9yID8gdyA6IGhcbiAgICB9KVxuICB9XG4gIGZvciAoY29uc3QgW3UsIHZdIG9mIGdPcmlnLmVkZ2VzKCkpIHtcbiAgICBnLmFkZEVkZ2UodSwgdiwge1xuICAgICAgd2lkdGg6IGVkZ2VXaWR0aCh7XG4gICAgICAgIHUsXG4gICAgICAgIHYsXG4gICAgICAgIHVkOiBnT3JpZy52ZXJ0ZXgodSksXG4gICAgICAgIHZkOiBnT3JpZy52ZXJ0ZXgodiksXG4gICAgICAgIGQ6IGdPcmlnLmVkZ2UodSwgdilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICByZXR1cm4gZ1xufVxuXG5jb25zdCBzaW1wbGlmeSA9IChwb2ludHMsIGx0b3IpID0+IHtcbiAgbGV0IGluZGV4ID0gMVxuICB3aGlsZSAoaW5kZXggPCBwb2ludHMubGVuZ3RoIC0gMSkge1xuICAgIGNvbnN0IHgwID0gbHRvciA/IHBvaW50c1tpbmRleF1bMV0gOiBwb2ludHNbaW5kZXhdWzBdXG4gICAgY29uc3QgeDEgPSBsdG9yID8gcG9pbnRzW2luZGV4ICsgMV1bMV0gOiBwb2ludHNbaW5kZXggKyAxXVswXVxuICAgIGlmICh4MCA9PT0geDEpIHtcbiAgICAgIHBvaW50cy5zcGxpY2UoaW5kZXgsIDIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ICs9IDJcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcmV2ZXJzZWQgPSAoYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAoY29uc3QgeCBvZiBhcnIpIHtcbiAgICByZXN1bHQudW5zaGlmdCh4KVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgYnVpbGRSZXN1bHQgPSAoZywgbGF5ZXJzLCBsdG9yKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICB2ZXJ0aWNlczoge30sXG4gICAgZWRnZXM6IHt9XG4gIH1cbiAgY29uc3QgbGF5ZXJIZWlnaHRzID0gW11cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgcmVzdWx0LmVkZ2VzW3VdID0ge31cbiAgfVxuXG4gIGZvciAoY29uc3QgbGF5ZXIgb2YgbGF5ZXJzKSB7XG4gICAgbGV0IG1heEhlaWdodCA9IC1JbmZpbml0eVxuICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgbWF4SGVpZ2h0ID0gTWF0aC5tYXgobWF4SGVpZ2h0LCBnLnZlcnRleCh1KS5vcmlnSGVpZ2h0IHx8IDApXG4gICAgfVxuICAgIGxheWVySGVpZ2h0cy5wdXNoKG1heEhlaWdodClcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaV1cbiAgICBjb25zdCBsYXllckhlaWdodCA9IGxheWVySGVpZ2h0c1tpXVxuICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgICAgaWYgKCF1Tm9kZS5kdW1teSkge1xuICAgICAgICByZXN1bHQudmVydGljZXNbdV0gPSB7XG4gICAgICAgICAgeDogbHRvciA/IHVOb2RlLnkgOiB1Tm9kZS54LFxuICAgICAgICAgIHk6IGx0b3IgPyB1Tm9kZS54IDogdU5vZGUueSxcbiAgICAgICAgICB3aWR0aDogbHRvciA/IHVOb2RlLm9yaWdIZWlnaHQgOiB1Tm9kZS5vcmlnV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBsdG9yID8gdU5vZGUub3JpZ1dpZHRoIDogdU5vZGUub3JpZ0hlaWdodCxcbiAgICAgICAgICBsYXllcjogdU5vZGUubGF5ZXIsXG4gICAgICAgICAgb3JkZXI6IHVOb2RlLm9yZGVyXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICAgIGNvbnN0IHBvaW50cyA9IGx0b3JcbiAgICAgICAgICAgID8gW1t1Tm9kZS55ICsgKHVOb2RlLm9yaWdIZWlnaHQgfHwgMCkgLyAyLCB1Tm9kZS54XSwgW3VOb2RlLnkgKyBsYXllckhlaWdodCAvIDIsIHVOb2RlLnhdXVxuICAgICAgICAgICAgOiBbW3VOb2RlLngsIHVOb2RlLnkgKyAodU5vZGUub3JpZ0hlaWdodCB8fCAwKSAvIDJdLCBbdU5vZGUueCwgdU5vZGUueSArIGxheWVySGVpZ2h0IC8gMl1dXG4gICAgICAgICAgbGV0IHcgPSB2XG4gICAgICAgICAgbGV0IHdOb2RlID0gZy52ZXJ0ZXgodylcbiAgICAgICAgICBsZXQgaiA9IGkgKyAxXG4gICAgICAgICAgd2hpbGUgKHdOb2RlLmR1bW15KSB7XG4gICAgICAgICAgICBpZiAobHRvcikge1xuICAgICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSAtIGxheWVySGVpZ2h0c1tqXSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSArIGxheWVySGVpZ2h0c1tqXSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLngsIHdOb2RlLnkgLSBsYXllckhlaWdodHNbal0gLyAyXSlcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLngsIHdOb2RlLnkgKyBsYXllckhlaWdodHNbal0gLyAyXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHcgPSBnLm91dFZlcnRpY2VzKHcpWzBdXG4gICAgICAgICAgICB3Tm9kZSA9IGcudmVydGV4KHcpXG4gICAgICAgICAgICBqICs9IDFcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGx0b3IpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS55IC0gbGF5ZXJIZWlnaHRzW2pdIC8gMiwgd05vZGUueF0pXG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSAtICh3Tm9kZS5vcmlnSGVpZ2h0IHx8IDApIC8gMiwgd05vZGUueF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS54LCB3Tm9kZS55IC0gbGF5ZXJIZWlnaHRzW2pdIC8gMl0pXG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueCwgd05vZGUueSAtICh3Tm9kZS5vcmlnSGVpZ2h0IHx8IDApIC8gMl0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHNpbXBsaWZ5KHBvaW50cywgbHRvcilcbiAgICAgICAgICBpZiAoZy5lZGdlKHUsIHYpLnJldmVyc2VkKSB7XG4gICAgICAgICAgICByZXN1bHQuZWRnZXNbd11bdV0gPSB7XG4gICAgICAgICAgICAgIHBvaW50czogcmV2ZXJzZWQocG9pbnRzKSxcbiAgICAgICAgICAgICAgcmV2ZXJzZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHdpZHRoOiBnLmVkZ2UodSwgdikud2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LmVkZ2VzW3VdW3ddID0ge1xuICAgICAgICAgICAgICBwb2ludHM6IHBvaW50cyxcbiAgICAgICAgICAgICAgcmV2ZXJzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICB3aWR0aDogZy5lZGdlKHUsIHYpLndpZHRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgU3VnaXlhbWFMYXlvdXRlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgdmVydGV4V2lkdGg6ICh7ZH0pID0+IGQud2lkdGgsXG4gICAgICB2ZXJ0ZXhIZWlnaHQ6ICh7ZH0pID0+IGQuaGVpZ2h0LFxuICAgICAgZWRnZVdpZHRoOiAoKSA9PiAxLFxuICAgICAgbGF5ZXJNYXJnaW46IDEwLFxuICAgICAgdmVydGV4TWFyZ2luOiAxMCxcbiAgICAgIHZlcnRleExlZnRNYXJnaW46ICgpID0+IDAsXG4gICAgICB2ZXJ0ZXhSaWdodE1hcmdpbjogKCkgPT4gMCxcbiAgICAgIHZlcnRleFRvcE1hcmdpbjogKCkgPT4gMCxcbiAgICAgIHZlcnRleEJvdHRvbU1hcmdpbjogKCkgPT4gMCxcbiAgICAgIGVkZ2VNYXJnaW46IDEwLFxuICAgICAgbHRvcjogdHJ1ZSxcbiAgICAgIGN5Y2xlUmVtb3ZhbDogbmV3IGN5Y2xlUmVtb3ZhbC5DeWNsZVJlbW92YWwoKSxcbiAgICAgIGxheWVyQXNzaWdubWVudDogbmV3IGxheWVyQXNzaWdubWVudC5RdWFkSGV1cmlzdGljKCksXG4gICAgICBjcm9zc2luZ1JlZHVjdGlvbjogbmV3IGNyb3NzaW5nUmVkdWN0aW9uLkxheWVyU3dlZXAoKSxcbiAgICAgIHBvc2l0aW9uQXNzaWdubWVudDogbmV3IHBvc2l0aW9uQXNzaWdubWVudC5CcmFuZGVzKClcbiAgICB9KVxuICB9XG5cbiAgbGF5b3V0IChnT3JpZykge1xuICAgIGNvbnN0IGcgPSBpbml0R3JhcGgoZ09yaWcsIHtcbiAgICAgIHZlcnRleFdpZHRoOiB0aGlzLnZlcnRleFdpZHRoKCksXG4gICAgICB2ZXJ0ZXhIZWlnaHQ6IHRoaXMudmVydGV4SGVpZ2h0KCksXG4gICAgICBlZGdlV2lkdGg6IHRoaXMuZWRnZVdpZHRoKCksXG4gICAgICBsYXllck1hcmdpbjogdGhpcy5sYXllck1hcmdpbigpLFxuICAgICAgdmVydGV4TWFyZ2luOiB0aGlzLnZlcnRleE1hcmdpbigpLFxuICAgICAgdmVydGV4TGVmdE1hcmdpbjogdGhpcy52ZXJ0ZXhMZWZ0TWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhSaWdodE1hcmdpbjogdGhpcy52ZXJ0ZXhSaWdodE1hcmdpbigpLFxuICAgICAgdmVydGV4VG9wTWFyZ2luOiB0aGlzLnZlcnRleFRvcE1hcmdpbigpLFxuICAgICAgdmVydGV4Qm90dG9tTWFyZ2luOiB0aGlzLnZlcnRleEJvdHRvbU1hcmdpbigpLFxuICAgICAgbHRvcjogdGhpcy5sdG9yKClcbiAgICB9KVxuICAgIHRoaXMuY3ljbGVSZW1vdmFsKCkuY2FsbChnKVxuICAgIGNvbnN0IGxheWVyTWFwID0gdGhpcy5sYXllckFzc2lnbm1lbnQoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXBMYXllcnMoZywgbGF5ZXJNYXAsIHRydWUpXG4gICAgbm9ybWFsaXplKGcsIGxheWVycywgbGF5ZXJNYXAsIHRoaXMuZWRnZU1hcmdpbigpLCB0aGlzLmxheWVyTWFyZ2luKCkpXG4gICAgY29uc3Qgbm9ybWFsaXplZExheWVycyA9IGxheWVycy5tYXAoKCkgPT4gW10pXG4gICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgY29ubmVjdGVkQ29tcG9uZW50cyhnKSkge1xuICAgICAgY29uc3QgdmVydGljZXMgPSBuZXcgU2V0KGNvbXBvbmVudClcbiAgICAgIGNvbnN0IGNvbXBvbmVudExheWVycyA9IGxheWVycy5tYXAoKGgpID0+IGguZmlsdGVyKCh1KSA9PiB2ZXJ0aWNlcy5oYXModSkpKVxuICAgICAgdGhpcy5jcm9zc2luZ1JlZHVjdGlvbigpLmNhbGwoZywgY29tcG9uZW50TGF5ZXJzKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIGNvbXBvbmVudExheWVyc1tpXSkge1xuICAgICAgICAgIG5vcm1hbGl6ZWRMYXllcnNbaV0ucHVzaCh1KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9ybWFsaXplZExheWVycy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgbGF5ZXIgPSBub3JtYWxpemVkTGF5ZXJzW2ldXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheWVyLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGNvbnN0IHUgPSBsYXllcltqXVxuICAgICAgICBnLnZlcnRleCh1KS5sYXllciA9IGlcbiAgICAgICAgZy52ZXJ0ZXgodSkub3JkZXIgPSBqXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb25Bc3NpZ25tZW50KCkuY2FsbChnLCBub3JtYWxpemVkTGF5ZXJzKVxuICAgIHJldHVybiBidWlsZFJlc3VsdChnLCBub3JtYWxpemVkTGF5ZXJzLCB0aGlzLmx0b3IoKSlcbiAgfVxuXG4gIHZlcnRleFdpZHRoICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhXaWR0aCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleEhlaWdodCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4SGVpZ2h0JywgYXJndW1lbnRzKVxuICB9XG5cbiAgZWRnZVdpZHRoICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdlZGdlV2lkdGgnLCBhcmd1bWVudHMpXG4gIH1cblxuICBsYXllck1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbGF5ZXJNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleE1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGVkZ2VNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2VkZ2VNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhMZWZ0TWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhMZWZ0TWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4UmlnaHRNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleFJpZ2h0TWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4VG9wTWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhUb3BNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhCb3R0b21NYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleEJvdHRvbU1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGx0b3IgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2x0b3InLCBhcmd1bWVudHMpXG4gIH1cblxuICBjeWNsZVJlbW92YWwgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2N5Y2xlUmVtb3ZhbCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGxheWVyQXNzaWdubWVudCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbGF5ZXJBc3NpZ25tZW50JywgYXJndW1lbnRzKVxuICB9XG5cbiAgY3Jvc3NpbmdSZWR1Y3Rpb24gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2Nyb3NzaW5nUmVkdWN0aW9uJywgYXJndW1lbnRzKVxuICB9XG5cbiAgcG9zaXRpb25Bc3NpZ25tZW50ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdwb3NpdGlvbkFzc2lnbm1lbnQnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdWdpeWFtYUxheW91dGVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gKHNlbGYsIHByaXZhdGVzLCBrZXksIGFyZ3MpID0+IHtcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHByaXZhdGVzLmdldChzZWxmKVtrZXldXG4gIH1cbiAgcHJpdmF0ZXMuZ2V0KHNlbGYpW2tleV0gPSBhcmdzWzBdXG4gIHJldHVybiBzZWxmXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNjZXNzb3JcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qc1xuICoqIG1vZHVsZSBpZCA9IDIwM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWFya0NoaWxkcmVuID0gKGdyYXBoLCB1LCBpZCwgcmVzdWx0KSA9PiB7XG4gIGlmIChyZXN1bHQuaGFzKHUpKSB7XG4gICAgY29uc3QgcHJldklkID0gcmVzdWx0LmdldCh1KVxuICAgIGlmIChwcmV2SWQgIT09IGlkKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgudmVydGljZXMoKSkge1xuICAgICAgICBpZiAocmVzdWx0LmdldCh2KSA9PT0gcHJldklkKSB7XG4gICAgICAgICAgcmVzdWx0LnNldCh2LCBpZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICByZXN1bHQuc2V0KHUsIGlkKVxuICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICBtYXJrQ2hpbGRyZW4oZ3JhcGgsIHYsIGlkLCByZXN1bHQpXG4gIH1cbn1cblxuY29uc3QgY29ubmVjdGVkQ29tcG9uZW50cyA9IChncmFwaCkgPT4ge1xuICBjb25zdCBjb21wb25lbnRJZE1hcCA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgZ3JhcGgudmVydGljZXMoKSkge1xuICAgIGlmIChncmFwaC5pbkRlZ3JlZSh1KSA9PT0gMCkge1xuICAgICAgbWFya0NoaWxkcmVuKGdyYXBoLCB1LCB1LCBjb21wb25lbnRJZE1hcClcbiAgICB9XG4gIH1cbiAgY29uc3QgY29tcG9uZW50SWRzID0gbmV3IFNldChjb21wb25lbnRJZE1hcC52YWx1ZXMoKSlcbiAgcmV0dXJuIEFycmF5LmZyb20oY29tcG9uZW50SWRzKS5tYXAoKHUpID0+IHtcbiAgICByZXR1cm4gZ3JhcGgudmVydGljZXMoKS5maWx0ZXIoKHYpID0+IGNvbXBvbmVudElkTWFwLmdldCh2KSA9PT0gdSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25uZWN0ZWRDb21wb25lbnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9jb25uZWN0ZWQtY29tcG9uZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgZ3JvdXBMYXllcnMgPSAoZywgbGF5ZXJzLCBhbGxvd0VtcHR5TGF5ZXIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW3VdXG4gICAgaWYgKHJlc3VsdFtsYXllcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0W2xheWVyXSA9IFtdXG4gICAgfVxuICAgIHJlc3VsdFtsYXllcl0ucHVzaCh1KVxuICB9XG4gIGlmIChhbGxvd0VtcHR5TGF5ZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHJlc3VsdFtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtdXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcigoaCkgPT4gaCAhPT0gdW5kZWZpbmVkKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ3JvdXBMYXllcnNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2dyb3VwLWxheWVycy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQ3ljbGVSZW1vdmFsID0gcmVxdWlyZSgnLi9jeWNsZS1yZW1vdmFsJylcblxubW9kdWxlLmV4cG9ydHMgPSB7Q3ljbGVSZW1vdmFsfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGN5Y2xlRWRnZXMgPSByZXF1aXJlKCcuL2N5Y2xlLWVkZ2VzJylcblxuY29uc3QgY3ljbGVSZW1vdmFsID0gKGcpID0+IHtcbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgY3ljbGVFZGdlcyhnKSkge1xuICAgIGNvbnN0IG9iaiA9IGcuZWRnZSh1LCB2KVxuICAgIGcucmVtb3ZlRWRnZSh1LCB2KVxuICAgIGlmICh1ID09PSB2KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCBlZGdlID0gZy5lZGdlKHYsIHUpXG4gICAgaWYgKGVkZ2UpIHtcbiAgICAgIGVkZ2UubXVsdGlwbGUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGcuYWRkRWRnZSh2LCB1LCBPYmplY3QuYXNzaWduKHtyZXZlcnNlZDogdHJ1ZX0sIG9iaikpXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIEN5Y2xlUmVtb3ZhbCB7XG4gIGNhbGwgKGcpIHtcbiAgICBjeWNsZVJlbW92YWwoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEN5Y2xlUmVtb3ZhbFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtcmVtb3ZhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgY3ljbGVFZGdlcyA9IGZ1bmN0aW9uIChnKSB7XG4gIGNvbnN0IHN0YWNrID0ge31cbiAgY29uc3QgdmlzaXRlZCA9IHt9XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG5cbiAgY29uc3QgZGZzID0gKHUpID0+IHtcbiAgICBpZiAodmlzaXRlZFt1XSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZpc2l0ZWRbdV0gPSB0cnVlXG4gICAgc3RhY2tbdV0gPSB0cnVlXG4gICAgZm9yIChsZXQgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBpZiAoc3RhY2tbdl0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW3UsIHZdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGZzKHYpXG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBzdGFja1t1XVxuICB9XG5cbiAgZm9yIChsZXQgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBkZnModSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjeWNsZUVkZ2VzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1lZGdlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgTG9uZ2VzdFBhdGggPSByZXF1aXJlKCcuL2xvbmdlc3QtcGF0aCcpXG5jb25zdCBRdWFkSGV1cmlzdGljID0gcmVxdWlyZSgnLi9xdWFkLWhldXJpc3RpYycpXG5cbm1vZHVsZS5leHBvcnRzID0ge0xvbmdlc3RQYXRoLCBRdWFkSGV1cmlzdGljfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxvbmdlc3RQYXRoID0gKGcpID0+IHtcbiAgY29uc3QgdmlzaXRlZCA9IHt9XG4gIGNvbnN0IGxheWVycyA9IHt9XG5cbiAgY29uc3QgZGZzID0gKHUpID0+IHtcbiAgICBpZiAodmlzaXRlZFt1XSkge1xuICAgICAgcmV0dXJuIGxheWVyc1t1XVxuICAgIH1cbiAgICB2aXNpdGVkW3VdID0gdHJ1ZVxuXG4gICAgbGV0IGxheWVyID0gSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgbGF5ZXIgPSBNYXRoLm1pbihsYXllciwgZGZzKHYpIC0gMSlcbiAgICB9XG4gICAgaWYgKGxheWVyID09PSBJbmZpbml0eSkge1xuICAgICAgbGF5ZXIgPSAwXG4gICAgfVxuICAgIGxheWVyc1t1XSA9IGxheWVyXG4gICAgcmV0dXJuIGxheWVyXG4gIH1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGcuaW5EZWdyZWUodSkgPT09IDApIHtcbiAgICAgIGRmcyh1KVxuICAgIH1cbiAgfVxuXG4gIGxldCBtaW5MYXllciA9IEluZmluaXR5XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBtaW5MYXllciA9IE1hdGgubWluKG1pbkxheWVyLCBsYXllcnNbdV0pXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGxheWVyc1t1XSAtPSBtaW5MYXllclxuICB9XG5cbiAgcmV0dXJuIGxheWVyc1xufVxuXG5jbGFzcyBMb25nZXN0UGF0aCB7XG4gIGNhbGwgKGcpIHtcbiAgICByZXR1cm4gbG9uZ2VzdFBhdGgoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvbmdlc3RQYXRoXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9sb25nZXN0LXBhdGguanNcbiAqKiBtb2R1bGUgaWQgPSAyMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvYWNjZXNzb3InKVxuY29uc3QgTG9uZ2VzdFBhdGggPSByZXF1aXJlKCcuL2xvbmdlc3QtcGF0aCcpXG5cbmNvbnN0IHF1YWRIZXVyaXN0aWMgPSAoZywgcmVwZWF0KSA9PiB7XG4gIGNvbnN0IGxheWVycyA9IG5ldyBMb25nZXN0UGF0aCgpLmNhbGwoZylcblxuICBsZXQgbWluTGF5ZXIgPSBJbmZpbml0eVxuICBsZXQgbWF4TGF5ZXIgPSAtSW5maW5pdHlcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIG1pbkxheWVyID0gTWF0aC5taW4obWluTGF5ZXIsIGxheWVyc1t1XSlcbiAgICBtYXhMYXllciA9IE1hdGgubWF4KG1heExheWVyLCBsYXllcnNbdV0pXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGlmIChnLmluRGVncmVlKHUpID09PSAwKSB7XG4gICAgICBsYXllcnNbdV0gPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGxheWVyc1t1XSAtPSBtaW5MYXllclxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZlcnRpY2VzID0gZy52ZXJ0aWNlcygpLmZpbHRlcih1ID0+IGcuaW5EZWdyZWUodSkgPiAwICYmIGcub3V0RGVncmVlKHUpID4gMClcbiAgY29uc3Qgd2VpZ2h0cyA9IHt9XG4gIGNvbnN0IGNtcCA9ICh1LCB2KSA9PiB3ZWlnaHRzW3ZdIC0gd2VpZ2h0c1t1XVxuICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHJlcGVhdDsgKytsb29wKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgd2VpZ2h0c1t1XSA9IDBcbiAgICB9XG4gICAgZm9yIChjb25zdCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgICBjb25zdCBsID0gbGF5ZXJzW3ZdIC0gbGF5ZXJzW3VdXG4gICAgICB3ZWlnaHRzW3VdICs9IGxcbiAgICAgIHdlaWdodHNbdl0gKz0gbFxuICAgIH1cblxuICAgIHZlcnRpY2VzLnNvcnQoY21wKVxuICAgIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgICAgbGV0IHN1bSA9IDBcbiAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgIGxldCBsZWZ0TWF4ID0gLUluZmluaXR5XG4gICAgICBsZXQgcmlnaHRNaW4gPSBJbmZpbml0eVxuICAgICAgZm9yIChjb25zdCB2IG9mIGcuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1t2XVxuICAgICAgICBsZWZ0TWF4ID0gTWF0aC5tYXgobGVmdE1heCwgbGF5ZXIpXG4gICAgICAgIHN1bSArPSBsYXllclxuICAgICAgICBjb3VudCArPSAxXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1t2XVxuICAgICAgICByaWdodE1pbiA9IE1hdGgubWluKHJpZ2h0TWluLCBsYXllcilcbiAgICAgICAgc3VtICs9IGxheWVyXG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICAgIGxheWVyc1t1XSA9IE1hdGgubWluKHJpZ2h0TWluIC0gMSwgTWF0aC5tYXgobGVmdE1heCArIDEsIE1hdGgucm91bmQoc3VtIC8gY291bnQpKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGF5ZXJzXG59XG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBRdWFkSGV1cmlzdGljIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICByZXBlYXQ6IDRcbiAgICB9KVxuICB9XG5cbiAgY2FsbCAoZykge1xuICAgIHJldHVybiBxdWFkSGV1cmlzdGljKGcsIHRoaXMucmVwZWF0KCkpXG4gIH1cblxuICByZXBlYXQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3JlcGVhdCcsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1YWRIZXVyaXN0aWNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzXG4gKiogbW9kdWxlIGlkID0gMjExXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBub3JtYWxpemUgPSAoZywgbGF5ZXJzLCBsYXllck1hcCwgZWRnZU1hcmdpbiwgbGF5ZXJNYXJnaW4pID0+IHtcbiAgdmFyIGksIHcxLCB3MlxuICBmb3IgKGxldCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgY29uc3QgZCA9IGcuZWRnZSh1LCB2KVxuICAgIGlmIChsYXllck1hcFt2XSAtIGxheWVyTWFwW3VdID4gMSkge1xuICAgICAgdzEgPSB1XG4gICAgICBmb3IgKGkgPSBsYXllck1hcFt1XSArIDE7IGkgPCBsYXllck1hcFt2XTsgKytpKSB7XG4gICAgICAgIHcyID0gU3ltYm9sKClcbiAgICAgICAgZy5hZGRWZXJ0ZXgodzIsIHtcbiAgICAgICAgICBkdW1teTogdHJ1ZSxcbiAgICAgICAgICB3aWR0aDogZC53aWR0aCArIGVkZ2VNYXJnaW4sXG4gICAgICAgICAgb3JpZ1dpZHRoOiBkLndpZHRoICsgZWRnZU1hcmdpbixcbiAgICAgICAgICBoZWlnaHQ6IGxheWVyTWFyZ2luLFxuICAgICAgICAgIG9yaWdIZWlnaHQ6IDAsXG4gICAgICAgICAgbGF5ZXI6IGlcbiAgICAgICAgfSlcbiAgICAgICAgZy5hZGRFZGdlKHcxLCB3Miwge1xuICAgICAgICAgIGR1bW15OiB0cnVlLFxuICAgICAgICAgIHJldmVyc2VkOiBnLmVkZ2UodSwgdikucmV2ZXJzZWQsXG4gICAgICAgICAgd2lkdGg6IGQud2lkdGhcbiAgICAgICAgfSlcbiAgICAgICAgbGF5ZXJzW2ldLnB1c2godzIpXG4gICAgICAgIHcxID0gdzJcbiAgICAgIH1cbiAgICAgIGcuYWRkRWRnZSh3MSwgdiwge1xuICAgICAgICBkdW1teTogdHJ1ZSxcbiAgICAgICAgcmV2ZXJzZWQ6IGcuZWRnZSh1LCB2KS5yZXZlcnNlZCxcbiAgICAgICAgd2lkdGg6IGQud2lkdGhcbiAgICAgIH0pXG4gICAgICBnLnJlbW92ZUVkZ2UodSwgdilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9ub3JtYWxpemUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IExheWVyU3dlZXAgPSByZXF1aXJlKCcuL2xheWVyLXN3ZWVwJylcblxubW9kdWxlLmV4cG9ydHMgPSB7TGF5ZXJTd2VlcH1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvYWNjZXNzb3InKVxuY29uc3QgYmFyeUNlbnRlciA9IHJlcXVpcmUoJy4vYmFyeS1jZW50ZXInKVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgTGF5ZXJTd2VlcCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgcmVwZWF0OiA4LFxuICAgICAgbWV0aG9kOiBiYXJ5Q2VudGVyXG4gICAgfSlcbiAgfVxuXG4gIGNhbGwgKGcsIGxheWVycykge1xuICAgIGNvbnN0IG4gPSBsYXllcnMubGVuZ3RoXG4gICAgY29uc3QgcmVwZWF0ID0gdGhpcy5yZXBlYXQoKVxuICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kKClcblxuICAgIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgcmVwZWF0OyArK2xvb3ApIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIG1ldGhvZChnLCBsYXllcnNbaSAtIDFdLCBsYXllcnNbaV0pXG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gbiAtIDE7IGkgPiAwOyAtLWkpIHtcbiAgICAgICAgbWV0aG9kKGcsIGxheWVyc1tpIC0gMV0sIGxheWVyc1tpXSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXBlYXQgKGFyZykge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3JlcGVhdCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIG1ldGhvZCAoYXJnKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbWV0aG9kJywgYXJndW1lbnRzKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGF5ZXJTd2VlcFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9sYXllci1zd2VlcC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbGF5ZXJNYXRyaXggPSByZXF1aXJlKCcuLi9taXNjL2xheWVyLW1hdHJpeCcpXG5cbmNvbnN0IGJhcnlDZW50ZXIgPSAoZywgaDEsIGgyLCBpbnZlcnNlID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY2VudGVycyA9IHt9XG4gIGNvbnN0IG4gPSBoMS5sZW5ndGhcbiAgY29uc3QgbSA9IGgyLmxlbmd0aFxuICBjb25zdCBhID0gbGF5ZXJNYXRyaXgoZywgaDEsIGgyKVxuICBjb25zdCBjbXAgPSAodSwgdikgPT4gY2VudGVyc1t1XSAtIGNlbnRlcnNbdl1cbiAgaWYgKGludmVyc2UpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgbGV0IHN1bSA9IDBcbiAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgIGNvbnN0IGFpaiA9IGFbaSAqIG0gKyBqXVxuICAgICAgICBjb3VudCArPSBhaWpcbiAgICAgICAgc3VtICs9IGogKiBhaWpcbiAgICAgIH1cbiAgICAgIGNlbnRlcnNbaDFbaV1dID0gc3VtIC8gY291bnRcbiAgICB9XG4gICAgaDEuc29ydChjbXApXG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICAgIGxldCBzdW0gPSAwXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBjb25zdCBhaWogPSBhW2kgKiBtICsgal1cbiAgICAgICAgY291bnQgKz0gYWlqXG4gICAgICAgIHN1bSArPSBpICogYWlqXG4gICAgICB9XG4gICAgICBjZW50ZXJzW2gyW2pdXSA9IHN1bSAvIGNvdW50XG4gICAgfVxuICAgIGgyLnNvcnQoY21wKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFyeUNlbnRlclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9iYXJ5LWNlbnRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbGF5ZXJNYXRyaXggPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IG4gPSBoMS5sZW5ndGhcbiAgY29uc3QgbSA9IGgyLmxlbmd0aFxuICBjb25zdCBvcmRlcnMgPSB7fVxuICBjb25zdCBhID0gbmV3IEludDhBcnJheShuICogbSlcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG07ICsraSkge1xuICAgIG9yZGVyc1toMltpXV0gPSBpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICBjb25zdCB1ID0gaDFbaV1cbiAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgYVtpICogbSArIG9yZGVyc1t2XV0gPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBhXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGF5ZXJNYXRyaXhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLW1hdHJpeC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQnJhbmRlcyA9IHJlcXVpcmUoJy4vYnJhbmRlcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge0JyYW5kZXN9XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWFya0NvbmZsaWN0cyA9IHJlcXVpcmUoJy4vbWFyay1jb25mbGljdHMnKVxuY29uc3QgdmVydGljYWxBbGlnbm1lbnQgPSByZXF1aXJlKCcuL3ZlcnRpY2FsLWFsaWdubWVudCcpXG5jb25zdCBob3Jpem9udGFsQ29tcGFjdGlvbiA9IHJlcXVpcmUoJy4vaG9yaXpvbnRhbC1jb21wYWN0aW9uJylcblxuY29uc3Qgc29ydCA9ICh4cykgPT4ge1xuICB4cy5zb3J0KCh4MSwgeDIpID0+IHgxIC0geDIpXG59XG5cbmNvbnN0IGJyYW5kZXMgPSAoZywgbGF5ZXJzKSA9PiB7XG4gIG1hcmtDb25mbGljdHMoZywgbGF5ZXJzKVxuXG4gIGNvbnN0IHhzID0ge31cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIHhzW3VdID0gW11cbiAgfVxuICBjb25zdCBkaXJlY3Rpb25zID0gW1xuICAgIHtydG9sOiBmYWxzZSwgYnRvdDogZmFsc2V9LFxuICAgIHtydG9sOiB0cnVlLCBidG90OiBmYWxzZX0sXG4gICAge3J0b2w6IGZhbHNlLCBidG90OiB0cnVlfSxcbiAgICB7cnRvbDogdHJ1ZSwgYnRvdDogdHJ1ZX1cbiAgXVxuXG4gIGxldCBtaW5XaWR0aExlZnQgPSAtSW5maW5pdHlcbiAgbGV0IG1pbldpZHRoUmlnaHQgPSBJbmZpbml0eVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2ldXG4gICAgdmVydGljYWxBbGlnbm1lbnQoZywgbGF5ZXJzLCBkaXJlY3Rpb24pXG4gICAgaG9yaXpvbnRhbENvbXBhY3Rpb24oZywgbGF5ZXJzLCBkaXJlY3Rpb24pXG4gICAgbGV0IG1pblggPSBJbmZpbml0eVxuICAgIGxldCBtYXhYID0gLUluZmluaXR5XG4gICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi5ydG9sKSB7XG4gICAgICAgIGcudmVydGV4KHUpLnggPSAtZy52ZXJ0ZXgodSkueFxuICAgICAgfVxuICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIGcudmVydGV4KHUpLngpXG4gICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgZy52ZXJ0ZXgodSkueClcbiAgICB9XG4gICAgaWYgKG1heFggLSBtaW5YIDwgbWluV2lkdGhSaWdodCAtIG1pbldpZHRoTGVmdCkge1xuICAgICAgbWluV2lkdGhMZWZ0ID0gbWluWFxuICAgICAgbWluV2lkdGhSaWdodCA9IG1heFhcbiAgICB9XG4gICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgeHNbdV0ucHVzaChnLnZlcnRleCh1KS54KVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2ldXG4gICAgaWYgKGRpcmVjdGlvbi5ydG9sKSB7XG4gICAgICBsZXQgbWF4WCA9IC1JbmZpbml0eVxuICAgICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgeHNbdV1baV0pXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICAgIHhzW3VdW2ldICs9IG1pbldpZHRoUmlnaHQgLSBtYXhYXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtaW5YID0gSW5maW5pdHlcbiAgICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIHhzW3VdW2ldKVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgICB4c1t1XVtpXSArPSBtaW5XaWR0aExlZnQgLSBtaW5YXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBzb3J0KHhzW3VdKVxuICAgIGcudmVydGV4KHUpLnggPSAoeHNbdV1bMV0gKyB4c1t1XVsyXSkgLyAyXG4gIH1cbn1cblxuY29uc3Qgbm9ybWFsaXplID0gKGcpID0+IHtcbiAgbGV0IHhNaW4gPSBJbmZpbml0eVxuICBsZXQgeU1pbiA9IEluZmluaXR5XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHVOb2RlLnggLSB1Tm9kZS5vcmlnV2lkdGggLyAyKVxuICAgIHlNaW4gPSBNYXRoLm1pbih5TWluLCB1Tm9kZS55IC0gdU5vZGUub3JpZ0hlaWdodCAvIDIpXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICB1Tm9kZS54IC09IHhNaW5cbiAgICB1Tm9kZS55IC09IHlNaW5cbiAgfVxufVxuXG5jbGFzcyBCcmFuZGVzIHtcbiAgY2FsbCAoZywgbGF5ZXJzKSB7XG4gICAgYnJhbmRlcyhnLCBsYXllcnMpXG5cbiAgICBsZXQgeU9mZnNldCA9IDBcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xuICAgICAgbGV0IG1heEhlaWdodCA9IDBcbiAgICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgICBtYXhIZWlnaHQgPSBNYXRoLm1heChtYXhIZWlnaHQsIGcudmVydGV4KHUpLmhlaWdodClcbiAgICAgIH1cbiAgICAgIHlPZmZzZXQgKz0gbWF4SGVpZ2h0IC8gMlxuICAgICAgZm9yIChjb25zdCB1IG9mIGxheWVyKSB7XG4gICAgICAgIGcudmVydGV4KHUpLnkgPSB5T2Zmc2V0XG4gICAgICB9XG4gICAgICB5T2Zmc2V0ICs9IG1heEhlaWdodCAvIDJcbiAgICB9XG5cbiAgICBub3JtYWxpemUoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyYW5kZXNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyRWRnZXMgPSByZXF1aXJlKCcuLi8uLi9taXNjL2xheWVyLWVkZ2VzJylcblxuY29uc3Qgc3BsaXQgPSAoeCwgZikgPT4ge1xuICBjb25zdCB5ID0gW11cbiAgY29uc3QgeiA9IFtdXG4gIGZvciAoY29uc3QgeGkgb2YgeCkge1xuICAgIGlmIChmKHhpKSkge1xuICAgICAgeS5wdXNoKHhpKVxuICAgIH0gZWxzZSB7XG4gICAgICB6LnB1c2goeGkpXG4gICAgfVxuICB9XG4gIHJldHVybiBbeSwgel1cbn1cblxuY29uc3QgbWFya0NvbmZsaWN0cyA9IChnLCBsYXllcnMpID0+IHtcbiAgY29uc3QgaCA9IGxheWVycy5sZW5ndGggLSAyXG4gIGNvbnN0IGR1bW15ID0ge31cbiAgY29uc3Qgb3JkZXIgPSB7fVxuICBjb25zdCBpc0lubmVyID0gKFt1LCB2XSkgPT4gZHVtbXlbdV0gJiYgZHVtbXlbdl1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgZCA9IGcudmVydGV4KHUpXG4gICAgZHVtbXlbdV0gPSAhIWQuZHVtbXlcbiAgICBvcmRlclt1XSA9IGQub3JkZXJcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgaDsgKytpKSB7XG4gICAgY29uc3QgaDEgPSBsYXllcnNbaV1cbiAgICBjb25zdCBoMiA9IGxheWVyc1tpICsgMV1cbiAgICBjb25zdCBlZGdlcyA9IGxheWVyRWRnZXMoZywgaDEsIGgyKVxuICAgIGNvbnN0IFtpbm5lclNlZ21lbnRzLCBvdXRlclNlZ21lbnRzXSA9IHNwbGl0KGVkZ2VzLCBpc0lubmVyKVxuICAgIGZvciAoY29uc3QgW3UxLCB2MV0gb2YgaW5uZXJTZWdtZW50cykge1xuICAgICAgZm9yIChjb25zdCBbdTIsIHYyXSBvZiBvdXRlclNlZ21lbnRzKSB7XG4gICAgICAgIGlmICgob3JkZXJbdTFdIDwgb3JkZXJbdTJdICYmIG9yZGVyW3YxXSA+IG9yZGVyW3YyXSkgfHwgKG9yZGVyW3UxXSA+IG9yZGVyW3UyXSAmJiBvcmRlclt2MV0gPCBvcmRlclt2Ml0pKSB7XG4gICAgICAgICAgZy5lZGdlKHUyLCB2MikudHlwZTFDb25mbGljdCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcmtDb25mbGljdHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvbWFyay1jb25mbGljdHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyRWRnZXMgPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAoY29uc3QgdiBvZiBoMikge1xuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModikpIHtcbiAgICAgIHJlc3VsdC5wdXNoKFt1LCB2XSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxheWVyRWRnZXNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLWVkZ2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMjIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBtZWRpYW4gPSByZXF1aXJlKCcuLi8uLi9taXNjL21lZGlhbicpXG5cbmNvbnN0IHZlcnRpY2FsQWxpZ25tZW50ID0gKGcsIGxheWVycywgeyBydG9sID0gZmFsc2UsIGJ0b3QgPSBmYWxzZSB9KSA9PiB7XG4gIGNvbnN0IGl0ZXJMYXllcnMgPSBmdW5jdGlvbiAqICgpIHtcbiAgICBpZiAoYnRvdCkge1xuICAgICAgZm9yIChsZXQgaSA9IGxheWVycy5sZW5ndGggLSAyOyBpID49IDA7IC0taSkge1xuICAgICAgICB5aWVsZCBsYXllcnNbaV1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsYXllcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgeWllbGQgbGF5ZXJzW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXRlckxheWVyID0gZnVuY3Rpb24gKiAobGF5ZXIpIHtcbiAgICBpZiAocnRvbCkge1xuICAgICAgZm9yIChsZXQgaSA9IGxheWVyLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHlpZWxkIGxheWVyW2ldXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgeWllbGQgbGF5ZXJbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBlZGdlID0gYnRvdCA/ICh1LCB2KSA9PiBnLmVkZ2UodiwgdSkgOiAodSwgdikgPT4gZy5lZGdlKHUsIHYpXG4gIGNvbnN0IGRlZ3JlZSA9IGJ0b3QgPyB1ID0+IGcub3V0RGVncmVlKHUpIDogdSA9PiBnLmluRGVncmVlKHUpXG4gIGNvbnN0IG1lZCA9IGJ0b3QgPyAoZywgbGF5ZXJzKSA9PiBtZWRpYW4oZywgbGF5ZXJzLCB0cnVlKSA6IChnLCBsYXllcnMpID0+IG1lZGlhbihnLCBsYXllcnMpXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBnLnZlcnRleCh1KS5yb290ID0gdVxuICAgIGcudmVydGV4KHUpLmFsaWduID0gdVxuICB9XG4gIGZvciAoY29uc3QgbGF5ZXIgb2YgaXRlckxheWVycygpKSB7XG4gICAgbGV0IHIgPSBydG9sID8gSW5maW5pdHkgOiAtSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHYgb2YgaXRlckxheWVyKGxheWVyKSkge1xuICAgICAgaWYgKGRlZ3JlZSh2KSA+IDApIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0fSA9IG1lZChnLCB2KVxuICAgICAgICBjb25zdCBtZWRpYW5zID0gbGVmdCA9PT0gcmlnaHQgPyBbbGVmdF0gOiAocnRvbCA/IFtyaWdodCwgbGVmdF0gOiBbbGVmdCwgcmlnaHRdKVxuICAgICAgICBmb3IgKGNvbnN0IHUgb2YgbWVkaWFucykge1xuICAgICAgICAgIGlmICghZWRnZSh1LCB2KS50eXBlMUNvbmZsaWN0ICYmICFlZGdlKHUsIHYpLnR5cGUyQ29uZmxpY3QpIHtcbiAgICAgICAgICAgIGlmIChydG9sID8gciA+IGcudmVydGV4KHUpLm9yZGVyIDogciA8IGcudmVydGV4KHUpLm9yZGVyKSB7XG4gICAgICAgICAgICAgIGcudmVydGV4KHYpLmFsaWduID0gZy52ZXJ0ZXgodikucm9vdCA9IGcudmVydGV4KHUpLnJvb3RcbiAgICAgICAgICAgICAgZy52ZXJ0ZXgodSkuYWxpZ24gPSB2XG4gICAgICAgICAgICAgIHIgPSBnLnZlcnRleCh1KS5vcmRlclxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnRpY2FsQWxpZ25tZW50XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL3ZlcnRpY2FsLWFsaWdubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWVkaWFuID0gKGcsIHYsIGludmVyc2UgPSBmYWxzZSkgPT4ge1xuICBjb25zdCB2ZXJ0aWNlcyA9IEFycmF5LmZyb20oaW52ZXJzZSA/IGcub3V0VmVydGljZXModikgOiBnLmluVmVydGljZXModikpXG4gIHZlcnRpY2VzLnNvcnQoKHUxLCB1MikgPT4gZy52ZXJ0ZXgodTEpLm9yZGVyIC0gZy52ZXJ0ZXgodTIpLm9yZGVyKVxuICBjb25zdCBpbmRleCA9ICh2ZXJ0aWNlcy5sZW5ndGggLSAxKSAvIDJcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiB2ZXJ0aWNlc1tNYXRoLmZsb29yKGluZGV4KV0sXG4gICAgcmlnaHQ6IHZlcnRpY2VzW01hdGguY2VpbChpbmRleCldXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZWRpYW5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL21lZGlhbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgaG9yaXpvbnRhbENvbXBhY3Rpb24gPSAoZywgbGF5ZXJzLCB7IHJ0b2wgPSBmYWxzZSB9KSA9PiB7XG4gIGNvbnN0IG9yZGVyTm9uWmVybyA9IChub2RlKSA9PiBydG9sXG4gICAgPyBub2RlLm9yZGVyIDwgbGF5ZXJzW25vZGUubGF5ZXJdLmxlbmd0aCAtIDFcbiAgICA6IG5vZGUub3JkZXIgPiAwXG4gIGNvbnN0IHByZWRlY2Vzc29yID0gcnRvbFxuICAgID8gbm9kZSA9PiBsYXllcnNbbm9kZS5sYXllcl1bbm9kZS5vcmRlciArIDFdXG4gICAgOiBub2RlID0+IGxheWVyc1tub2RlLmxheWVyXVtub2RlLm9yZGVyIC0gMV1cblxuICBjb25zdCBwbGFjZUJsb2NrID0gKHYpID0+IHtcbiAgICBjb25zdCB2Tm9kZSA9IGcudmVydGV4KHYpXG4gICAgaWYgKHZOb2RlLnggIT09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2Tm9kZS54ID0gMFxuICAgIGxldCB3ID0gdlxuICAgIGRvIHtcbiAgICAgIGNvbnN0IHdOb2RlID0gZy52ZXJ0ZXgodylcbiAgICAgIGlmIChvcmRlck5vblplcm8od05vZGUpKSB7XG4gICAgICAgIGNvbnN0IHAgPSBwcmVkZWNlc3Nvcih3Tm9kZSlcbiAgICAgICAgY29uc3QgcE5vZGUgPSBnLnZlcnRleChwKVxuICAgICAgICBjb25zdCB1ID0gcE5vZGUucm9vdFxuICAgICAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgICAgIHBsYWNlQmxvY2sodSlcbiAgICAgICAgaWYgKHZOb2RlLnNpbmsgPT09IHYpIHtcbiAgICAgICAgICB2Tm9kZS5zaW5rID0gdU5vZGUuc2lua1xuICAgICAgICB9XG4gICAgICAgIGlmICh2Tm9kZS5zaW5rID09PSB1Tm9kZS5zaW5rKSB7XG4gICAgICAgICAgdk5vZGUueCA9IE1hdGgubWF4KHZOb2RlLngsIHVOb2RlLnggKyAocE5vZGUud2lkdGggKyB3Tm9kZS53aWR0aCkgLyAyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHVTaW5rTm9kZSA9IGcudmVydGV4KHVOb2RlLnNpbmspXG4gICAgICAgICAgdVNpbmtOb2RlLnNoaWZ0ID0gTWF0aC5taW4odVNpbmtOb2RlLnNoaWZ0LCB2Tm9kZS54IC0gdU5vZGUueCAtIChwTm9kZS53aWR0aCArIHdOb2RlLndpZHRoKSAvIDIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHcgPSB3Tm9kZS5hbGlnblxuICAgIH0gd2hpbGUgKHcgIT09IHYpXG4gIH1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIHVOb2RlLnNpbmsgPSB1XG4gICAgdU5vZGUuc2hpZnQgPSBJbmZpbml0eVxuICAgIHVOb2RlLnggPSBudWxsXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGlmIChnLnZlcnRleCh1KS5yb290ID09PSB1KSB7XG4gICAgICBwbGFjZUJsb2NrKHUpXG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgdU5vZGUueCA9IGcudmVydGV4KHVOb2RlLnJvb3QpLnhcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIGNvbnN0IHNoaWZ0ID0gZy52ZXJ0ZXgoZy52ZXJ0ZXgodU5vZGUucm9vdCkuc2luaykuc2hpZnRcbiAgICBpZiAoc2hpZnQgPCBJbmZpbml0eSkge1xuICAgICAgdU5vZGUueCArPSBzaGlmdFxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvcml6b250YWxDb21wYWN0aW9uXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL2hvcml6b250YWwtY29tcGFjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgR3JhcGggPSByZXF1aXJlKCcuLi8uLi9ncmFwaCcpXG5jb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcbmNvbnN0IGN5Y2xlUmVtb3ZhbCA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwnKVxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gcmVxdWlyZSgnLi4vLi4vbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudCcpXG5jb25zdCBncm91cExheWVycyA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzJylcbmNvbnN0IHJlY3Rhbmd1bGFyID0gcmVxdWlyZSgnLi9yZWN0YW5ndWxhcicpXG5cbmNvbnN0IGVkZ2VDb25jZW50cmF0aW9uID0gKGcsIGgxLCBoMiwgbWV0aG9kLCBkdW1teSwgaWRHZW5lcmF0b3IpID0+IHtcbiAgY29uc3Qgc3ViZ3JhcGggPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICBzdWJncmFwaC5hZGRWZXJ0ZXgodSwgZy52ZXJ0ZXgodSkpXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGgyKSB7XG4gICAgc3ViZ3JhcGguYWRkVmVydGV4KHUsIGcudmVydGV4KHUpKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgIGZvciAoY29uc3QgdiBvZiBoMikge1xuICAgICAgaWYgKGcuZWRnZSh1LCB2KSkge1xuICAgICAgICBzdWJncmFwaC5hZGRFZGdlKHUsIHYsIGcuZWRnZSh1LCB2KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGNvbmNlbnRyYXRpb24gb2YgbWV0aG9kKHN1YmdyYXBoLCBoMSwgaDIpKSB7XG4gICAgY29uc3QgdyA9IGlkR2VuZXJhdG9yKGcsIGgxLCBoMilcbiAgICBnLmFkZFZlcnRleCh3LCBkdW1teShjb25jZW50cmF0aW9uLnNvdXJjZSwgY29uY2VudHJhdGlvbi50YXJnZXQpKVxuICAgIGZvciAoY29uc3QgdSBvZiBjb25jZW50cmF0aW9uLnNvdXJjZSkge1xuICAgICAgZy5hZGRFZGdlKHUsIHcpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdiBvZiBjb25jZW50cmF0aW9uLnRhcmdldCkge1xuICAgICAgZy5hZGRFZGdlKHcsIHYpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModykpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHcpKSB7XG4gICAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgICBnLnJlbW92ZUVkZ2UodSwgdilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgRWRnZUNvbmNlbnRyYXRpb25UcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgY3ljbGVSZW1vdmFsOiBuZXcgY3ljbGVSZW1vdmFsLkN5Y2xlUmVtb3ZhbCgpLFxuICAgICAgbGF5ZXJBc3NpZ25tZW50OiBuZXcgbGF5ZXJBc3NpZ25tZW50LlF1YWRIZXVyaXN0aWMoKSxcbiAgICAgIG1ldGhvZDogcmVjdGFuZ3VsYXIsXG4gICAgICBkdW1teTogKCkgPT4gKHtkdW1teTogdHJ1ZX0pLFxuICAgICAgaWRHZW5lcmF0b3I6ICgpID0+IFN5bWJvbCgpXG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zZm9ybSAoZykge1xuICAgIHRoaXMuY3ljbGVSZW1vdmFsKCkuY2FsbChnKVxuICAgIGNvbnN0IGxheWVyTWFwID0gdGhpcy5sYXllckFzc2lnbm1lbnQoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXBMYXllcnMoZywgbGF5ZXJNYXApXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICBjb25zdCBoMSA9IGxheWVyc1tpXVxuICAgICAgY29uc3QgaDIgPSBuZXcgU2V0KClcbiAgICAgIGxldCBlZGdlcyA9IDBcbiAgICAgIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICAgIGgyLmFkZCh2KVxuICAgICAgICAgIGVkZ2VzICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWRnZUNvbmNlbnRyYXRpb24oZywgaDEsIEFycmF5LmZyb20oaDIudmFsdWVzKCkpLCB0aGlzLm1ldGhvZCgpLCB0aGlzLmR1bW15KCksIHRoaXMuaWRHZW5lcmF0b3IoKSlcbiAgICB9XG4gICAgcmV0dXJuIGdcbiAgfVxuXG4gIGN5Y2xlUmVtb3ZhbCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnY3ljbGVSZW1vdmFsJywgYXJndW1lbnRzKVxuICB9XG5cbiAgbGF5ZXJBc3NpZ25tZW50ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdsYXllckFzc2lnbm1lbnQnLCBhcmd1bWVudHMpXG4gIH1cblxuICBtZXRob2QgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ21ldGhvZCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGR1bW15ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdkdW1teScsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGlkR2VuZXJhdG9yICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdpZEdlbmVyYXRvcicsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyVmVydGljZXMgPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IHVzID0gbmV3IFNldChoMSlcbiAgY29uc3QgdmVydGljZXMgPSB7fVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICB2ZXJ0aWNlc1t2XSA9IG5ldyBTZXQoKVxuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModikpIHtcbiAgICAgIGlmICh1cy5oYXModSkpIHtcbiAgICAgICAgdmVydGljZXNbdl0uYWRkKHUpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2ZXJ0aWNlc1xufVxuXG5jb25zdCByZWN0YW5ndWxhciA9IChnLCBoMSwgaDIpID0+IHtcbiAgaWYgKGgxLmxlbmd0aCA9PT0gMCB8fCBoMi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBjb25zdCBrID0gZy5udW1FZGdlcygpXG4gIGNvbnN0IGFjdGl2ZSA9IHt9XG4gIGNvbnN0IHZlcnRpY2VzID0gbGF5ZXJWZXJ0aWNlcyhnLCBoMSwgaDIpXG4gIGNvbnN0IGlzQWN0aXZlID0gKHUpID0+IGFjdGl2ZVt1XVxuICBjb25zdCBjbXAgPSAodjEsIHYyKSA9PiB2ZXJ0aWNlc1t2Ml0uc2l6ZSAtIHZlcnRpY2VzW3YxXS5zaXplXG4gIGNvbnN0IGQgPSAocywgdCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDBcbiAgICBmb3IgKGNvbnN0IHUgb2Ygcykge1xuICAgICAgZm9yIChjb25zdCB2IG9mIHQpIHtcbiAgICAgICAgaWYgKHZlcnRpY2VzW3ZdLmhhcyh1KSkge1xuICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQgLSBzLmxlbmd0aCAtIHQubGVuZ3RoXG4gIH1cbiAgaDIgPSBBcnJheS5mcm9tKGgyKVxuXG4gIGNvbnN0IGNvbmNlbnRyYXRpb25zID0gW11cbiAgbGV0IGpPZmZzZXQgPSAwXG4gIGZvciAobGV0IGwgPSAwOyBsIDwgazsgKytsKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgICBhY3RpdmVbdV0gPSB0cnVlXG4gICAgfVxuXG4gICAgaDIuc29ydChjbXApXG4gICAgaWYgKHZlcnRpY2VzW2gyW2pPZmZzZXRdXS5zaXplIDw9IDApIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgbGV0IG1heEQgPSAtMVxuICAgIGxldCBtYXhIMVxuICAgIGxldCBtYXhIMlxuICAgIGxldCB0bXBIMiA9IFtdXG4gICAgZm9yIChsZXQgaiA9IGpPZmZzZXQ7IGogPCBoMi5sZW5ndGg7ICsraikge1xuICAgICAgY29uc3QgdiA9IGgyW2pdXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICAgICAgaWYgKGFjdGl2ZVt1XSkge1xuICAgICAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlW3VdID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRtcEgyLnB1c2godilcbiAgICAgIGxldCB0bXBIMSA9IGgxLmZpbHRlcihpc0FjdGl2ZSlcbiAgICAgIGxldCB0bXBEID0gZCh0bXBIMSwgdG1wSDIpXG4gICAgICBpZiAodG1wRCA+IG1heEQpIHtcbiAgICAgICAgbWF4RCA9IHRtcERcbiAgICAgICAgbWF4SDEgPSB0bXBIMVxuICAgICAgICBtYXhIMiA9IEFycmF5LmZyb20odG1wSDIpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1heEQgPiAtMSkge1xuICAgICAgZm9yIChjb25zdCB2IG9mIG1heEgyKSB7XG4gICAgICAgIGZvciAoY29uc3QgdSBvZiBtYXhIMSkge1xuICAgICAgICAgIHZlcnRpY2VzW3ZdLmRlbGV0ZSh1KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25jZW50cmF0aW9ucy5wdXNoKHtcbiAgICAgICAgc291cmNlOiBBcnJheS5mcm9tKG1heEgxKSxcbiAgICAgICAgdGFyZ2V0OiBBcnJheS5mcm9tKG1heEgyKVxuICAgICAgfSlcbiAgICAgIGpPZmZzZXQgPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGpPZmZzZXQgKz0gMVxuICAgIH1cblxuICAgIGlmIChqT2Zmc2V0ID49IGgyLmxlbmd0aCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uY2VudHJhdGlvbnNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWN0YW5ndWxhclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9yZWN0YW5ndWxhci5qc1xuICoqIG1vZHVsZSBpZCA9IDIyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgaGFzaEtleSA9ICh2ZXJ0aWNlcykgPT4ge1xuICByZXR1cm4gdmVydGljZXMubWFwKCh1KSA9PiB1LnRvU3RyaW5nKCkpLmpvaW4oJywnKVxufVxuXG5jb25zdCBtYXhLZXkgPSAoaXRlcikgPT4ge1xuICBsZXQgbWF4VmFsID0gLUluZmluaXR5XG4gIGxldCByZXN1bHQgPSBudWxsXG4gIGZvciAoY29uc3QgW2lkLCB2YWxdIG9mIGl0ZXIpIHtcbiAgICBpZiAodmFsID4gbWF4VmFsKSB7XG4gICAgICBtYXhWYWwgPSB2YWxcbiAgICAgIHJlc3VsdCA9IGlkXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgcGFydGl0aW9uID0gKGdyYXBoLCBVKSA9PiB7XG4gIGNvbnN0IEwgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCB1IG9mIFUpIHtcbiAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICAgIEwuYWRkKHYpXG4gICAgfVxuICB9XG4gIGNvbnN0IGhhc2hLZXlzID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgaGFzaEtleXMuc2V0KHUsIGhhc2hLZXkoZ3JhcGgub3V0VmVydGljZXModSkpKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBMKSB7XG4gICAgY29uc3QgZGVncmVlcyA9IGdyYXBoLmluVmVydGljZXModSkubWFwKCh2KSA9PiBbdiwgZ3JhcGgub3V0RGVncmVlKHYpXSlcbiAgICBjb25zdCBtYXhJZCA9IG1heEtleShkZWdyZWVzKVxuICAgIGhhc2hLZXlzLnNldCh1LCBoYXNoS2V5cy5nZXQobWF4SWQpKVxuICB9XG4gIGxldCBjaGFuZ2VkID0gZmFsc2VcbiAgZG8ge1xuICAgIGNoYW5nZWQgPSBmYWxzZVxuICAgIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgICBjb25zdCBNID0gbmV3IE1hcCgpXG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICAgICAgY29uc3QgaGFzaCA9IGhhc2hLZXlzLmdldCh2KVxuICAgICAgICBpZiAoIU0uaGFzKGhhc2gpKSB7XG4gICAgICAgICAgTS5zZXQoaGFzaCwgMClcbiAgICAgICAgfVxuICAgICAgICBNLnNldChoYXNoLCBNLmdldChoYXNoKSArIDEpXG4gICAgICB9XG4gICAgICBjb25zdCBuZXdLZXkgPSBtYXhLZXkoTS5lbnRyaWVzKCkpXG4gICAgICBpZiAoaGFzaEtleXMuZ2V0KHUpICE9PSBuZXdLZXkpIHtcbiAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgaGFzaEtleXMuc2V0KHUsIG5ld0tleSlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCB1IG9mIEwpIHtcbiAgICAgIGNvbnN0IE0gPSBuZXcgTWFwKClcbiAgICAgIGZvciAoY29uc3QgdiBvZiBncmFwaC5pblZlcnRpY2VzKHUpKSB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBoYXNoS2V5cy5nZXQodilcbiAgICAgICAgaWYgKCFNLmhhcyhoYXNoKSkge1xuICAgICAgICAgIE0uc2V0KGhhc2gsIDApXG4gICAgICAgIH1cbiAgICAgICAgTS5zZXQoaGFzaCwgTS5nZXQoaGFzaCkgKyAxKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3S2V5ID0gbWF4S2V5KE0uZW50cmllcygpKVxuICAgICAgaWYgKGhhc2hLZXlzLmdldCh1KSAhPT0gbmV3S2V5KSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIGhhc2hLZXlzLnNldCh1LCBuZXdLZXkpXG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlIChjaGFuZ2VkKVxuICBjb25zdCByZXN1bHQgPSBuZXcgTWFwKClcbiAgZm9yIChjb25zdCB1IG9mIFUpIHtcbiAgICBjb25zdCBoYXNoID0gaGFzaEtleXMuZ2V0KHUpXG4gICAgaWYgKCFyZXN1bHQuaGFzKGhhc2gpKSB7XG4gICAgICByZXN1bHQuc2V0KGhhc2gsIFtdKVxuICAgIH1cbiAgICByZXN1bHQuZ2V0KGhhc2gpLnB1c2godSlcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShyZXN1bHQudmFsdWVzKCkpXG59XG5cbmNvbnN0IGF1Z3VtZW50ID0gKGdyYXBoLCBTKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgIGZvciAoY29uc3QgdiBvZiBncmFwaC5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgZm9yIChjb25zdCB3IG9mIGdyYXBoLmluVmVydGljZXModikpIHtcbiAgICAgICAgcmVzdWx0LmFkZCh3KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShyZXN1bHQpXG59XG5cbmNvbnN0IHF1YXNpQmljbGlxdWVNaW5pbmcgPSAoZ3JhcGgsIG11LCBTKSA9PiB7XG4gIGNvbnN0IEMgPSBuZXcgTWFwKClcbiAgZm9yIChjb25zdCB1IG9mIFMpIHtcbiAgICBjb25zdCB0bXBTID0gbmV3IFNldCgpXG4gICAgY29uc3QgdG1wVCA9IG5ldyBTZXQoZ3JhcGgub3V0VmVydGljZXModSkpXG4gICAgQy5zZXQoaGFzaEtleShBcnJheS5mcm9tKHRtcFQpKSwge3NvdXJjZTogdG1wUywgdGFyZ2V0OiB0bXBUfSlcbiAgfVxuICBmb3IgKGNvbnN0IGtleSBvZiBDLmtleXMoKSkge1xuICAgIGNvbnN0IE0gPSBuZXcgTWFwKClcbiAgICBmb3IgKGNvbnN0IHYgb2YgQy5nZXQoa2V5KS50YXJnZXQpIHtcbiAgICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICAgIGlmICghTS5oYXModSkpIHtcbiAgICAgICAgICBNLnNldCh1LCAwKVxuICAgICAgICB9XG4gICAgICAgIE0uc2V0KHUsIE0uZ2V0KHUpICsgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCB1IG9mIE0ua2V5cygpKSB7XG4gICAgICBpZiAoTS5nZXQodSkgPj0gbXUgKiBDLmdldChrZXkpLnRhcmdldC5zaXplKSB7XG4gICAgICAgIEMuZ2V0KGtleSkuc291cmNlLmFkZCh1KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IEFycmF5LmZyb20oQy52YWx1ZXMoKSlcbiAgICAuZmlsdGVyKCh7c291cmNlLCB0YXJnZXR9KSA9PiBzb3VyY2Uuc2l6ZSA+IDEgJiYgdGFyZ2V0LnNpemUgPiAxKVxuICByZXN1bHQuc29ydCgoYzEsIGMyKSA9PiBjMS5zb3VyY2Uuc2l6ZSA9PT0gYzIuc291cmNlLnNpemUgPyBjMi50YXJnZXQuc2l6ZSAtIGMxLnRhcmdldC5zaXplIDogYzIuc291cmNlLnNpemUgLSBjMS5zb3VyY2Uuc2l6ZSlcbiAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBjb25zdCBtYXhpbXVtID0gcmVzdWx0WzBdXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgcmVzdWx0Lmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgdG1wUyA9IG5ldyBTZXQobWF4aW11bS5zb3VyY2UpXG4gICAgY29uc3QgdG1wVCA9IG5ldyBTZXQobWF4aW11bS50YXJnZXQpXG4gICAgZm9yIChjb25zdCB1IG9mIHJlc3VsdFtpXS5zb3VyY2UpIHtcbiAgICAgIHRtcFMuYWRkKHUpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiByZXN1bHRbaV0udGFyZ2V0KSB7XG4gICAgICB0bXBULmFkZCh1KVxuICAgIH1cbiAgICBsZXQgY291bnQgPSAwXG4gICAgZm9yIChjb25zdCB1IG9mIHRtcFMpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiB0bXBUKSB7XG4gICAgICAgIGlmIChncmFwaC5lZGdlKHUsIHYpKSB7XG4gICAgICAgICAgY291bnQgKz0gMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb3VudCA8IG11ICogdG1wUy5zaXplICogdG1wVC5zaXplKSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgICBtYXhpbXVtLnNvdXJjZSA9IEFycmF5LmZyb20odG1wUylcbiAgICBtYXhpbXVtLnRhcmdldCA9IEFycmF5LmZyb20odG1wVClcbiAgfVxuICByZXR1cm4gW21heGltdW1dXG59XG5cbmNvbnN0IHF1YXNpQ2xpcXVlTGF5ZXIgPSAoZ3JhcGgsIGgxLCBoMiwgbXUpID0+IHtcbiAgY29uc3QgY2xpcXVlcyA9IFtdXG4gIGZvciAoY29uc3QgUyBvZiBwYXJ0aXRpb24oZ3JhcGgsIGgxKSkge1xuICAgIGZvciAoY29uc3QgY2xpcXVlIG9mIHF1YXNpQmljbGlxdWVNaW5pbmcoZ3JhcGgsIG11LCBhdWd1bWVudChncmFwaCwgUykpKSB7XG4gICAgICBjbGlxdWVzLnB1c2goY2xpcXVlKVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2xpcXVlc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHF1YXNpQ2xpcXVlTGF5ZXJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcXVhc2ktYmljbGlxdWUtbWluaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMjI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJpbXBvcnQgTGF5ZXJBc3NpZ25tZW50IGZyb20gJ2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3VzZXItZGVmaW5lZCdcblxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gKGdyYXBoKSA9PiB7XG4gIHJldHVybiBuZXcgTGF5ZXJBc3NpZ25tZW50KClcbiAgICAuZigodSkgPT4ge1xuICAgICAgY29uc3QgZCA9IGdyYXBoLnZlcnRleCh1KVxuICAgICAgaWYgKGQuZHVtbXkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmdyYXBoLmluVmVydGljZXModSkubWFwKCh2KSA9PiBncmFwaC52ZXJ0ZXgodikubGF5ZXJPcmRlcikpICogMiArIDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkLmxheWVyT3JkZXIgKiAyXG4gICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGF5ZXJBc3NpZ25tZW50XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9sYXllci1hc3NpZ25tZW50LmpzXG4gKiovIiwiY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hY2Nlc3NvcicpXG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBVc2VyRGVmaW5lZCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgZjogKCkgPT4gMFxuICAgIH0pXG4gIH1cblxuICBjYWxsIChnKSB7XG4gICAgY29uc3QgZiA9IHByaXZhdGVzLmdldCh0aGlzKS5mXG4gICAgY29uc3QgbGF5ZXJzID0ge31cbiAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICBsYXllcnNbdV0gPSBmKHUpXG4gICAgfVxuICAgIHJldHVybiBsYXllcnNcbiAgfVxuXG4gIGYgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2YnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyRGVmaW5lZFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvdXNlci1kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gMjI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9