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
	
	var _edgeConcentration = __webpack_require__(225);
	
	var _edgeConcentration2 = _interopRequireDefault(_edgeConcentration);
	
	var _rectangular = __webpack_require__(226);
	
	var _rectangular2 = _interopRequireDefault(_rectangular);
	
	var _quasiBicliqueMining = __webpack_require__(227);
	
	var _quasiBicliqueMining2 = _interopRequireDefault(_quasiBicliqueMining);
	
	var _completeQb = __webpack_require__(228);
	
	var _completeQb2 = _interopRequireDefault(_completeQb);
	
	var _layerAssignment = __webpack_require__(230);
	
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
	  switch (biclusteringOption) {
	    case 'edge-concentration':
	      transformer.method(_rectangular2.default);
	      break;
	    case 'quasi-bicliques':
	      transformer.method(function (graph, h1, h2) {
	        return (0, _quasiBicliqueMining2.default)(graph, h1, h2, 0.5);
	      });
	      break;
	    case 'complete-quasi-bicliques':
	      transformer.method(function (graph, h1, h2) {
	        return (0, _completeQb2.default)(graph, h1, h2, 1, 3);
	      });
	      break;
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
	  }).edgeMargin(3).edgeBundling(true);
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
	
	  toJSON () {
	    return {
	      vertices: this.vertices().map((u) => ({u, d: this.vertex(u)})),
	      edges: this.edges().map(([u, v]) => ({u, v, d: this.edge(u, v)}))
	    }
	  }
	
	  toString () {
	    return JSON.stringify(this.toJSON())
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
	const bundleEdges = __webpack_require__(224)
	
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
	      edgeBundling: false,
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
	    if (this.edgeBundling()) {
	      bundleEdges(g, normalizedLayers, this.ltor())
	    }
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
	
	  edgeBundling () {
	    return accessor(this, privates, 'edgeBundling', arguments)
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
	          u,
	          v,
	          dummy: true,
	          width: d.width + edgeMargin,
	          origWidth: d.width + edgeMargin,
	          height: layerMargin,
	          origHeight: 0,
	          layer: i
	        })
	        g.addEdge(w1, w2, {
	          u,
	          v,
	          dummy: true,
	          reversed: g.edge(u, v).reversed,
	          width: d.width
	        })
	        layers[i].push(w2)
	        w1 = w2
	      }
	      g.addEdge(w1, v, {
	        u,
	        v,
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
/***/ function(module, exports) {

	const segment = function * (graph, vertices, upper) {
	  if (vertices.length === 0) {
	    return
	  }
	  let seq = []
	  let lastParent = graph.vertex(vertices[0])[upper ? 'v' : 'u']
	  for (const u of vertices) {
	    const d = graph.vertex(u)
	    if (!d.dummy || d[upper ? 'v' : 'u'] !== lastParent) {
	      if (seq.length > 0) {
	        yield seq
	        seq = []
	      }
	    }
	    if (d.dummy) {
	      seq.push(u)
	      lastParent = d[upper ? 'v' : 'u']
	    }
	  }
	  if (seq.length > 0) {
	    yield seq
	  }
	}
	
	const adjustPos = (graph, vertices, ltor) => {
	  let sum = 0
	  for (const u of vertices) {
	    sum += graph.vertex(u)[ltor ? 'x' : 'y']
	  }
	  const pos = sum / vertices.length
	  for (const u of vertices) {
	    graph.vertex(u)[ltor ? 'x' : 'y'] = pos
	  }
	}
	
	const bundleEdges = (graph, layers, ltor) => {
	  for (let i = 0; i < layers.length - 1; ++i) {
	    for (const vertices of segment(graph, layers[i], false)) {
	      adjustPos(graph, vertices, ltor)
	    }
	  }
	  for (let i = layers.length - 1; i > 0; --i) {
	    for (const vertices of segment(graph, layers[i], true)) {
	      adjustPos(graph, vertices, ltor)
	    }
	  }
	}
	
	module.exports = bundleEdges


/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(198)
	const accessor = __webpack_require__(203)
	const cycleRemoval = __webpack_require__(206)
	const layerAssignment = __webpack_require__(209)
	const groupLayers = __webpack_require__(205)
	const rectangular = __webpack_require__(226)
	
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

/***/ 226:
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

/***/ 227:
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

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	const {combination} = __webpack_require__(229)
	
	const enumerate = function * (neighbors, epsilon) {
	  if (neighbors.size > 0) {
	    for (let i = epsilon; i > 0; --i) {
	      const iter = combination(Array.from(neighbors), Math.min(i, neighbors.size))
	      while (true) {
	        const S = iter.next()
	        if (!S) {
	          break
	        }
	        yield S
	      }
	    }
	    yield []
	  }
	}
	
	const adjacentVertices = (graph, vs) => {
	  const result = new Set()
	  for (const v of vs) {
	    for (const u of graph.outVertices(v)) {
	      result.add(u)
	    }
	  }
	  return result
	}
	
	const genKey = (Vl, Vr) => {
	  const arrayVl = Array.from(Vl)
	  const arrayVr = Array.from(Vr)
	  arrayVl.sort()
	  arrayVr.sort()
	  return `${arrayVl.join(',')}:${arrayVr.join(',')}`
	}
	
	const countError = (graph, u, vertices, ltou) => {
	  const neighbors = new Set(ltou ? graph.inVertices(u) : graph.outVertices(u))
	  let count = 0
	  for (const v of vertices) {
	    if (!neighbors.has(v)) {
	      count += 1
	    }
	  }
	  return count
	}
	
	const intersection = (A, B) => {
	  const result = new Set()
	  for (const item of A) {
	    if (B.has(item)) {
	      result.add(item)
	    }
	  }
	  return result
	}
	
	const setminus = (A, B) => {
	  for (const item of B) {
	    A.delete(item)
	  }
	  return A
	}
	
	const store = (result, key, Vl, Vr) => {
	  for (const [key, {source, target}] of result.entries()) {
	    const sourceIntersection = intersection(source, Vl)
	    const targetIntersection = intersection(target, Vr)
	    if (sourceIntersection.size === source.size && targetIntersection.size === target.size) {
	      result.delete(key)
	    } else if (sourceIntersection.size === Vl.size && targetIntersection.size === Vr.size) {
	      return
	    }
	  }
	  result.set(key, {source: Vl, target: Vr})
	}
	
	const testEpsilonQuasiBiclique = (graph, source, target, epsilon, ms) => {
	  if (source.size < ms || target.size < ms) {
	    return false
	  }
	  for (const u of source) {
	    const vertices = new Set(graph.outVertices(u))
	    let count = 0
	    for (const v of target) {
	      if (!vertices.has(v)) {
	        count += 1
	      }
	    }
	    if (count > epsilon) {
	      return false
	    }
	  }
	  for (const u of target) {
	    const vertices = new Set(graph.inVertices(u))
	    let count = 0
	    for (const v of source) {
	      if (!vertices.has(v)) {
	        count += 1
	      }
	    }
	    if (count > epsilon) {
	      return false
	    }
	  }
	  return true
	}
	
	const subspace = (graph, candVl, genVl, candExt, epsilon, ms, visited, result) => {
	  const candVr = adjacentVertices(graph, candVl)
	  for (const v of candVr) {
	    if (countError(graph, v, candVl, true) > epsilon) {
	      candVr.delete(v)
	    }
	  }
	
	  const key = genKey(candVl, candVr)
	  if (visited.has(key)) {
	    return
	  }
	  visited.add(key)
	  if (testEpsilonQuasiBiclique(graph, candVl, candVr, epsilon, ms)) {
	    store(result, key, candVl, candVr)
	  }
	
	  setminus(candExt, candVr)
	  for (const v of candExt) {
	    candExt.delete(v)
	    const neighbors = intersection(candVl, new Set(graph.inVertices(v)))
	    const rest = setminus(new Set(candVl), neighbors)
	    for (const S of enumerate(rest, epsilon)) {
	      const Vl = new Set(neighbors)
	      for (const u of S) {
	        Vl.add(u)
	      }
	      subspace(graph, Vl, v, candExt, epsilon, ms, visited, result)
	    }
	  }
	}
	
	const completeQB = (graph, h1, h2, epsilon, ms) => {
	  const bicliques = new Map()
	  const visited = new Set()
	  for (const v of h2) {
	    const neighbors = new Set(h1)
	    for (const u of graph.inVertices(v)) {
	      neighbors.delete(u)
	    }
	    for (const S of enumerate(neighbors, epsilon)) {
	      const Vl = new Set(graph.inVertices(v))
	      for (const u of S) {
	        Vl.add(u)
	      }
	      subspace(graph, Vl, v, new Set(h2), epsilon, ms, visited, bicliques)
	    }
	  }
	  return Array.from(bicliques.values()).map(({source, target}) => {
	    const sourceArray = Array.from(source)
	    const targetArray = Array.from(target)
	    sourceArray.sort()
	    targetArray.sort()
	    return {
	      source: sourceArray,
	      target: targetArray
	    }
	  })
	}
	
	module.exports = completeQB


/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * $Id: combinatorics.js,v 0.25 2013/03/11 15:42:14 dankogai Exp dankogai $
	 *
	 *  Licensed under the MIT license.
	 *  http://www.opensource.org/licenses/mit-license.php
	 *
	 *  References:
	 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-combination
	 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-permutation
	 *    http://en.wikipedia.org/wiki/Factorial_number_system
	 */
	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.Combinatorics = factory();
	    }
	}(this, function () {
	    'use strict';
	    var version = "0.5.2";
	    /* combinatory arithmetics */
	    var P = function(m, n) {
	        var p = 1;
	        while (n--) p *= m--;
	        return p;
	    };
	    var C = function(m, n) {
	        if (n > m) {
	            return 0;
	        }
	        return P(m, n) / P(n, n);
	    };
	    var factorial = function(n) {
	        return P(n, n);
	    };
	    var factoradic = function(n, d) {
	        var f = 1;
	        if (!d) {
	            for (d = 1; f < n; f *= ++d);
	            if (f > n) f /= d--;
	        } else {
	            f = factorial(d);
	        }
	        var result = [0];
	        for (; d; f /= d--) {
	            result[d] = Math.floor(n / f);
	            n %= f;
	        }
	        return result;
	    };
	    /* common methods */
	    var addProperties = function(dst, src) {
	        Object.keys(src).forEach(function(p) {
	            Object.defineProperty(dst, p, {
	                value: src[p],
	                configurable: p == 'next'
	            });
	        });
	    };
	    var hideProperty = function(o, p) {
	        Object.defineProperty(o, p, {
	            writable: true
	        });
	    };
	    var toArray = function(f) {
	        var e, result = [];
	        this.init();
	        while (e = this.next()) result.push(f ? f(e) : e);
	        this.init();
	        return result;
	    };
	    var common = {
	        toArray: toArray,
	        map: toArray,
	        forEach: function(f) {
	            var e;
	            this.init();
	            while (e = this.next()) f(e);
	            this.init();
	        },
	        filter: function(f) {
	            var e, result = [];
	            this.init();
	            while (e = this.next()) if (f(e)) result.push(e);
	            this.init();
	            return result;
	        },
	        lazyMap: function(f) {
	            this._lazyMap = f;
	            return this;
	        },
	        lazyFilter: function(f) {
	            Object.defineProperty(this, 'next', {
	                writable: true
	            });
	            if (typeof f !== 'function') {
	                this.next = this._next;
	            } else {
	                if (typeof (this._next) !== 'function') {
	                    this._next = this.next;
	                }
	                var _next = this._next.bind(this);
	                this.next = (function() {
	                    var e;
	                    while (e = _next()) {
	                        if (f(e))
	                            return e;
	                    }
	                    return e;
	                }).bind(this);
	            }
	            Object.defineProperty(this, 'next', {
	                writable: false
	            });
	            return this;
	        }
	
	    };
	    /* power set */
	    var power = function(ary, fun) {
	        var size = 1 << ary.length,
	            sizeOf = function() {
	                return size;
	            },
	            that = Object.create(ary.slice(), {
	                length: {
	                    get: sizeOf
	                }
	            });
	        hideProperty(that, 'index');
	        addProperties(that, {
	            valueOf: sizeOf,
	            init: function() {
	                that.index = 0;
	            },
	            nth: function(n) {
	                if (n >= size) return;
	                var i = 0,
	                    result = [];
	                for (; n; n >>>= 1, i++) if (n & 1) result.push(this[i]);
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            },
	            next: function() {
	                return this.nth(this.index++);
	            }
	        });
	        addProperties(that, common);
	        that.init();
	        return (typeof (fun) === 'function') ? that.map(fun) : that;
	    };
	    /* combination */
	    var nextIndex = function(n) {
	        var smallest = n & -n,
	            ripple = n + smallest,
	            new_smallest = ripple & -ripple,
	            ones = ((new_smallest / smallest) >> 1) - 1;
	        return ripple | ones;
	    };
	    var combination = function(ary, nelem, fun) {
	        if (!nelem) nelem = ary.length;
	        if (nelem < 1) throw new RangeError;
	        if (nelem > ary.length) throw new RangeError;
	        var first = (1 << nelem) - 1,
	            size = C(ary.length, nelem),
	            maxIndex = 1 << ary.length,
	            sizeOf = function() {
	                return size;
	            },
	            that = Object.create(ary.slice(), {
	                length: {
	                    get: sizeOf
	                }
	            });
	        hideProperty(that, 'index');
	        addProperties(that, {
	            valueOf: sizeOf,
	            init: function() {
	                this.index = first;
	            },
	            next: function() {
	                if (this.index >= maxIndex) return;
	                var i = 0,
	                    n = this.index,
	                    result = [];
	                for (; n; n >>>= 1, i++) {
	                    if (n & 1) result[result.length] = this[i];
	                }
	
	                this.index = nextIndex(this.index);
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            }
	        });
	        addProperties(that, common);
	        that.init();
	        return (typeof (fun) === 'function') ? that.map(fun) : that;
	    };
	    /* bigcombination */
	    var bigNextIndex = function(n, nelem) {
	
	        var result = n;
	        var j = nelem;
	        var i = 0;
	        for (i = result.length - 1; i >= 0; i--) {
	            if (result[i] == 1) {
	                j--;
	            } else {
	                break;
	            }
	        } 
	        if (j == 0) {
	            // Overflow
	            result[result.length] = 1;
	            for (var k = result.length - 2; k >= 0; k--) {
	                result[k] = (k < nelem-1)?1:0;
	            }
	        } else {
	            // Normal
	
	            // first zero after 1
	            var i1 = -1;
	            var i0 = -1;
	            for (var i = 0; i < result.length; i++) {
	                if (result[i] == 0 && i1 != -1) {
	                    i0 = i;
	                }
	                if (result[i] == 1) {
	                    i1 = i;
	                }
	                if (i0 != -1 && i1 != -1) {
	                    result[i0] = 1;
	                    result[i1] = 0;
	                    break;
	                }
	            }
	
	            j = nelem;
	            for (var i = result.length - 1; i >= i1; i--) {
	                if (result[i] == 1)
	                    j--;
	            }
	            for (var i = 0; i < i1; i++) {
	                result[i] = (i < j)?1:0;
	            }
	        }
	
	        return result;
	
	    };
	    var buildFirst = function(nelem) {
	        var result = [];
	        for (var i = 0; i < nelem; i++) {
	            result[i] = 1;
	        }
	        result[0] = 1;
	        return result;
	    };
	    var bigCombination = function(ary, nelem, fun) {
	        if (!nelem) nelem = ary.length;
	        if (nelem < 1) throw new RangeError;
	        if (nelem > ary.length) throw new RangeError;
	        var first = buildFirst(nelem),
	            size = C(ary.length, nelem),
	            maxIndex = ary.length,
	            sizeOf = function() {
	                return size;
	            },
	            that = Object.create(ary.slice(), {
	                length: {
	                    get: sizeOf
	                }
	            });
	        hideProperty(that, 'index');
	        addProperties(that, {
	            valueOf: sizeOf,
	            init: function() {
	                this.index = first.concat();
	            },
	            next: function() {
	                if (this.index.length > maxIndex) return;
	                var i = 0,
	                    n = this.index,
	                    result = [];
	                for (var j = 0; j < n.length; j++, i++) {
	                    if (n[j])
	                        result[result.length] = this[i];
	                }
	                bigNextIndex(this.index, nelem);
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            }
	        });
	        addProperties(that, common);
	        that.init();
	        return (typeof (fun) === 'function') ? that.map(fun) : that;
	    };
	    /* permutation */
	    var _permutation = function(ary) {
	        var that = ary.slice(),
	            size = factorial(that.length);
	        that.index = 0;
	        that.next = function() {
	            if (this.index >= size) return;
	            var copy = this.slice(),
	                digits = factoradic(this.index, this.length),
	                result = [],
	                i = this.length - 1;
	            for (; i >= 0; --i) result.push(copy.splice(digits[i], 1)[0]);
	            this.index++;
	            return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	        };
	        return that;
	    };
	    // which is really a permutation of combination
	    var permutation = function(ary, nelem, fun) {
	        if (!nelem) nelem = ary.length;
	        if (nelem < 1) throw new RangeError;
	        if (nelem > ary.length) throw new RangeError;
	        var size = P(ary.length, nelem),
	            sizeOf = function() {
	                return size;
	            },
	            that = Object.create(ary.slice(), {
	                length: {
	                    get: sizeOf
	                }
	            });
	        hideProperty(that, 'cmb');
	        hideProperty(that, 'per');
	        addProperties(that, {
	            valueOf: function() {
	                return size;
	            },
	            init: function() {
	                this.cmb = combination(ary, nelem);
	                this.per = _permutation(this.cmb.next());
	            },
	            next: function() {
	                var result = this.per.next();
	                if (!result) {
	                    var cmb = this.cmb.next();
	                    if (!cmb) return;
	                    this.per = _permutation(cmb);
	                    return this.next();
	                }
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            }
	        });
	        addProperties(that, common);
	        that.init();
	        return (typeof (fun) === 'function') ? that.map(fun) : that;
	    };
	
	    var PC = function(m) {
	        var total = 0;
	        for (var n = 1; n <= m; n++) {
	            var p = P(m,n);
	            total += p;
	        };
	        return total;
	    };
	    // which is really a permutation of combination
	    var permutationCombination = function(ary, fun) {
	        // if (!nelem) nelem = ary.length;
	        // if (nelem < 1) throw new RangeError;
	        // if (nelem > ary.length) throw new RangeError;
	        var size = PC(ary.length),
	            sizeOf = function() {
	                return size;
	            },
	            that = Object.create(ary.slice(), {
	                length: {
	                    get: sizeOf
	                }
	            });
	        hideProperty(that, 'cmb');
	        hideProperty(that, 'per');
	        hideProperty(that, 'nelem');
	        addProperties(that, {
	            valueOf: function() {
	                return size;
	            },
	            init: function() {
	                this.nelem = 1;
	                // console.log("Starting nelem: " + this.nelem);
	                this.cmb = combination(ary, this.nelem);
	                this.per = _permutation(this.cmb.next());
	            },
	            next: function() {
	                var result = this.per.next();
	                if (!result) {
	                    var cmb = this.cmb.next();
	                    if (!cmb) {
	                        this.nelem++;
	                        // console.log("increment nelem: " + this.nelem + " vs " + ary.length);
	                        if (this.nelem > ary.length) return;
	                        this.cmb = combination(ary, this.nelem);
	                        cmb = this.cmb.next();
	                        if (!cmb) return;
	                    }
	                    this.per = _permutation(cmb);
	                    return this.next();
	                }
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            }
	        });
	        addProperties(that, common);
	        that.init();
	        return (typeof (fun) === 'function') ? that.map(fun) : that;
	    };
	    /* Cartesian Product */
	    var arraySlice = Array.prototype.slice;
	    var cartesianProduct = function() {
	        if (!arguments.length) throw new RangeError;
	        var args = arraySlice.call(arguments),
	            size = args.reduce(function(p, a) {
	                return p * a.length;
	            }, 1),
	            sizeOf = function() {
	                return size;
	            },
	            dim = args.length,
	            that = Object.create(args, {
	                length: {
	                    get: sizeOf
	                }
	            });
	        if (!size) throw new RangeError;
	        hideProperty(that, 'index');
	        addProperties(that, {
	            valueOf: sizeOf,
	            dim: dim,
	            init: function() {
	                this.index = 0;
	            },
	            get: function() {
	                if (arguments.length !== this.length) return;
	                var result = [],
	                    d = 0;
	                for (; d < dim; d++) {
	                    var i = arguments[d];
	                    if (i >= this[d].length) return;
	                    result.push(this[d][i]);
	                }
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            },
	            nth: function(n) {
	                var result = [],
	                    d = 0;
	                for (; d < dim; d++) {
	                    var l = this[d].length;
	                    var i = n % l;
	                    result.push(this[d][i]);
	                    n -= i;
	                    n /= l;
	                }
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            },
	            next: function() {
	                if (this.index >= size) return;
	                var result = this.nth(this.index);
	                this.index++;
	                return result;
	            }
	        });
	        addProperties(that, common);
	        that.init();
	        return that;
	    };
	    /* baseN */
	    var baseN = function(ary, nelem, fun) {
	                if (!nelem) nelem = ary.length;
	        if (nelem < 1) throw new RangeError;
	        var base = ary.length,
	                size = Math.pow(base, nelem);
	        var sizeOf = function() {
	                return size;
	            },
	            that = Object.create(ary.slice(), {
	                length: {
	                    get: sizeOf
	                }
	            });
	        hideProperty(that, 'index');
	        addProperties(that, {
	            valueOf: sizeOf,
	            init: function() {
	                that.index = 0;
	            },
	            nth: function(n) {
	                if (n >= size) return;
	                var result = [];
	                for (var i = 0; i < nelem; i++) {
	                    var d = n % base;
	                    result.push(ary[d])
	                    n -= d; n /= base
	                }
	                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
	            },
	            next: function() {
	                return this.nth(this.index++);
	            }
	        });
	        addProperties(that, common);
	        that.init();
	        return (typeof (fun) === 'function') ? that.map(fun) : that;
	    };
	
	    /* export */
	    var Combinatorics = Object.create(null);
	    addProperties(Combinatorics, {
	        C: C,
	        P: P,
	        factorial: factorial,
	        factoradic: factoradic,
	        cartesianProduct: cartesianProduct,
	        combination: combination,
	        bigCombination: bigCombination,
	        permutation: permutation,
	        permutationCombination: permutationCombination,
	        power: power,
	        baseN: baseN,
	        VERSION: version
	    });
	    return Combinatorics;
	}));


/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _userDefined = __webpack_require__(231);
	
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

/***/ 231:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWZiMTcwMzU2NmI3YjE4NzU0ZjU/YmMwZiIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9sYXlvdXQtd29ya2VyLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL211dGFibGUtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvYWJzdHJhY3QtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2Nvbm5lY3RlZC1jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1yZW1vdmFsLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtZWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L2xvbmdlc3QtcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL25vcm1hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2xheWVyLXN3ZWVwLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9iYXJ5LWNlbnRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvbWFyay1jb25mbGljdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1lZGdlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvdmVydGljYWwtYWxpZ25tZW50LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbWVkaWFuLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9ob3Jpem9udGFsLWNvbXBhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvYnVuZGxlLWVkZ2VzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcmVjdGFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vY29tcGxldGUtcWIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb21iaW5hdG9yaWNzL2NvbWJpbmF0b3JpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xheWVyLWFzc2lnbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC91c2VyLWRlZmluZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLEtBQU0sV0FBVyxTQUFYLFFBQVcsQ0FBQyxRQUFELEVBQWM7QUFDN0IsT0FBTSxPQUFPLEtBQUssR0FBTCxjQUFTLENBQVQsNEJBQWUsU0FBUyxH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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNyQkE7O0FBRUEsbUJBQWtCOzs7Ozs7OztBQ0ZsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxzQ0FBcUMsZUFBZTtBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNUJBO0FBQ0E7O0FBRUEsbUJBQWtCOzs7Ozs7OztBQ0hsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUM1Q0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCLGVBQWU7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDakdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQywyQkFBMkI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWMsZUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQzVKQSxRQUFPLFlBQVk7O0FBRW5CO0FBQ0E7QUFDQSwwQkFBeUIsT0FBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLGtCQUFrQixHQUFHLGtCQUFrQjtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLHVCQUF1QjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDLGVBQWU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsT0FBTztBQUM5QjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxlQUFjLEdBQUc7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7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QUFhO0FBQ1gsY0FBTyxLQUFLLEdBQUwsZ0NBQVksTUFBTSxVQUFOLENBQWlCLENBQWpCLEVBQW9CLEdBQXBCLENBQXdCLFVBQUMsQ0FBRDtBQUFBLGdCQUFPLE1BQU0sTUFBTixDQUFhLENBQWIsRUFBZ0IsVUFBdkI7QUFBQSxRQUF4QixDQUFaLEtBQTBFLENBQTFFLEdBQThFLENBQXJGO0FBQ0QsTUFGRCxNQUVPO0FBQ0wsY0FBTyxFQUFFLFVBQUYsR0FBZSxDQUF0QjtBQUNEO0FBQ0YsSUFSSSxDQUFQO0FBU0QsRUFWRDs7bUJBWWUsZTs7Ozs7OztBQ2RmOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoibGF5b3V0LXdvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMWZiMTcwMzU2NmI3YjE4NzU0ZjVcbiAqKi8iLCIvKiBlc2xpbnQtZW52IHdvcmtlciAqL1xuXG5pbXBvcnQgR3JhcGggZnJvbSAnZWdyYXBoL2dyYXBoJ1xuaW1wb3J0IGNvcHkgZnJvbSAnZWdyYXBoL2dyYXBoL2NvcHknXG5pbXBvcnQgTGF5b3V0ZXIgZnJvbSAnZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hJ1xuaW1wb3J0IEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXIgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbidcbmltcG9ydCByZWN0YW5ndWxhciBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3JlY3Rhbmd1bGFyJ1xuaW1wb3J0IHF1YXNpQmljbGlxdWVNaW5pbmcgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9xdWFzaS1iaWNsaXF1ZS1taW5pbmcnXG5pbXBvcnQgY29tcGxldGVRQiBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2NvbXBsZXRlLXFiJ1xuaW1wb3J0IGxheWVyQXNzaWdubWVudCBmcm9tICcuLi91dGlscy9sYXllci1hc3NpZ25tZW50J1xuXG5jb25zdCBjYWxjU2l6ZSA9ICh2ZXJ0aWNlcykgPT4ge1xuICBjb25zdCBsZWZ0ID0gTWF0aC5taW4oMCwgLi4udmVydGljZXMubWFwKCh7eCwgd2lkdGh9KSA9PiB4IC0gd2lkdGggLyAyKSlcbiAgY29uc3QgcmlnaHQgPSBNYXRoLm1heCgwLCAuLi52ZXJ0aWNlcy5tYXAoKHt4LCB3aWR0aH0pID0+IHggKyB3aWR0aCAvIDIpKVxuICBjb25zdCB0b3AgPSBNYXRoLm1pbigwLCAuLi52ZXJ0aWNlcy5tYXAoKHt5LCBoZWlnaHR9KSA9PiB5IC0gaGVpZ2h0IC8gMikpXG4gIGNvbnN0IGJvdHRvbSA9IE1hdGgubWF4KDAsIC4uLnZlcnRpY2VzLm1hcCgoe3ksIGhlaWdodH0pID0+IHkgKyBoZWlnaHQgLyAyKSlcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogcmlnaHQgLSBsZWZ0LFxuICAgIGhlaWdodDogYm90dG9tIC0gdG9wXG4gIH1cbn1cblxuY29uc3QgZWRnZUNvdW50ID0gKHZlcnRpY2VzLCBuZWlnaGJvcnMpID0+IHtcbiAgcmV0dXJuIG5laWdoYm9ycy5maWx0ZXIoKHUpID0+IHZlcnRpY2VzLmluZGV4T2YodSkgPj0gMCkubGVuZ3RoXG59XG5cbmNvbnN0IHRyYW5zZm9ybSA9IChncmFwaCwgYmljbHVzdGVyaW5nT3B0aW9uKSA9PiB7XG4gIGlmIChiaWNsdXN0ZXJpbmdPcHRpb24gPT09ICdub25lJykge1xuICAgIHJldHVybiBncmFwaFxuICB9XG4gIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXIoKVxuICAgIC5sYXllckFzc2lnbm1lbnQobGF5ZXJBc3NpZ25tZW50KGdyYXBoKSlcbiAgICAuaWRHZW5lcmF0b3IoKGdyYXBoKSA9PiBNYXRoLm1heCguLi5ncmFwaC52ZXJ0aWNlcygpKSArIDEpXG4gICAgLmR1bW15KCgpID0+ICh7XG4gICAgICBkdW1teTogdHJ1ZSxcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgY29sb3I6ICcjODg4J1xuICAgIH0pKVxuICBzd2l0Y2ggKGJpY2x1c3RlcmluZ09wdGlvbikge1xuICAgIGNhc2UgJ2VkZ2UtY29uY2VudHJhdGlvbic6XG4gICAgICB0cmFuc2Zvcm1lci5tZXRob2QocmVjdGFuZ3VsYXIpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3F1YXNpLWJpY2xpcXVlcyc6XG4gICAgICB0cmFuc2Zvcm1lci5tZXRob2QoKGdyYXBoLCBoMSwgaDIpID0+IHF1YXNpQmljbGlxdWVNaW5pbmcoZ3JhcGgsIGgxLCBoMiwgMC41KSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnY29tcGxldGUtcXVhc2ktYmljbGlxdWVzJzpcbiAgICAgIHRyYW5zZm9ybWVyLm1ldGhvZCgoZ3JhcGgsIGgxLCBoMikgPT4gY29tcGxldGVRQihncmFwaCwgaDEsIGgyLCAxLCAzKSlcbiAgICAgIGJyZWFrXG4gIH1cbiAgcmV0dXJuIHRyYW5zZm9ybWVyLnRyYW5zZm9ybShjb3B5KGdyYXBoKSlcbn1cblxuY29uc3QgbGF5b3V0ID0gKGdyYXBoLCB7YmljbHVzdGVyaW5nT3B0aW9uLCBsYXllck1hcmdpbiwgdmVydGV4TWFyZ2lufSkgPT4ge1xuICBjb25zdCB0cmFuc2Zvcm1lZEdyYXBoID0gdHJhbnNmb3JtKGdyYXBoLCBiaWNsdXN0ZXJpbmdPcHRpb24pXG4gIGNvbnN0IGxheW91dGVyID0gbmV3IExheW91dGVyKClcbiAgICAubGF5ZXJBc3NpZ25tZW50KGxheWVyQXNzaWdubWVudCh0cmFuc2Zvcm1lZEdyYXBoKSlcbiAgICAubGF5ZXJNYXJnaW4obGF5ZXJNYXJnaW4pXG4gICAgLnZlcnRleFdpZHRoKCh7ZH0pID0+IGQuZHVtbXkgPyAyNSA6IDE2MClcbiAgICAudmVydGV4SGVpZ2h0KCh7ZH0pID0+IGQuZHVtbXkgPyAxMCA6IDIwKVxuICAgIC52ZXJ0ZXhNYXJnaW4odmVydGV4TWFyZ2luKVxuICAgIC5lZGdlV2lkdGgoKCkgPT4gMylcbiAgICAuZWRnZU1hcmdpbigzKVxuICAgIC5lZGdlQnVuZGxpbmcodHJ1ZSlcbiAgY29uc3QgcG9zaXRpb25zID0gbGF5b3V0ZXIubGF5b3V0KHRyYW5zZm9ybWVkR3JhcGgpXG5cbiAgY29uc3QgdmVydGljZXMgPSBbXVxuICBmb3IgKGNvbnN0IHUgb2YgdHJhbnNmb3JtZWRHcmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgZCA9IHRyYW5zZm9ybWVkR3JhcGgudmVydGV4KHUpXG4gICAgaWYgKGQuZHVtbXkpIHtcbiAgICAgIGQuVSA9IHRyYW5zZm9ybWVkR3JhcGguaW5WZXJ0aWNlcyh1KVxuICAgICAgZC5MID0gdHJhbnNmb3JtZWRHcmFwaC5vdXRWZXJ0aWNlcyh1KVxuICAgIH1cbiAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwb3NpdGlvbnMudmVydGljZXNbdV1cbiAgICB2ZXJ0aWNlcy5wdXNoKHt1LCBkLCB4LCB5LCB3aWR0aCwgaGVpZ2h0fSlcbiAgfVxuXG4gIGNvbnN0IGVkZ2VzID0gW11cbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgdHJhbnNmb3JtZWRHcmFwaC5lZGdlcygpKSB7XG4gICAgaWYgKHBvc2l0aW9ucy5lZGdlc1t1XVt2XSkge1xuICAgICAgY29uc3QgZCA9IHRyYW5zZm9ybWVkR3JhcGguZWRnZSh1LCB2KVxuICAgICAgY29uc3QgdWQgPSB0cmFuc2Zvcm1lZEdyYXBoLnZlcnRleCh1KVxuICAgICAgY29uc3QgdmQgPSB0cmFuc2Zvcm1lZEdyYXBoLnZlcnRleCh2KVxuICAgICAgY29uc3Qge3BvaW50cywgd2lkdGgsIHJldmVyc2VkfSA9IHBvc2l0aW9ucy5lZGdlc1t1XVt2XVxuICAgICAgd2hpbGUgKHBvaW50cy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHBvaW50cy5wdXNoKHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pXG4gICAgICB9XG4gICAgICBsZXQgb3BhY2l0eVxuICAgICAgaWYgKHVkLmR1bW15KSB7XG4gICAgICAgIG9wYWNpdHkgPSBlZGdlQ291bnQodWQuVSwgZ3JhcGguaW5WZXJ0aWNlcyh2KSkgLyB1ZC5VLmxlbmd0aFxuICAgICAgfSBlbHNlIGlmICh2ZC5kdW1teSkge1xuICAgICAgICBvcGFjaXR5ID0gZWRnZUNvdW50KHZkLkwsIGdyYXBoLm91dFZlcnRpY2VzKHUpKSAvIHZkLkwubGVuZ3RoXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGFjaXR5ID0gMVxuICAgICAgfVxuICAgICAgZWRnZXMucHVzaCh7dSwgdiwgdWQsIHZkLCBkLCBwb2ludHMsIHJldmVyc2VkLCB3aWR0aCwgb3BhY2l0eX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe3ZlcnRpY2VzLCBlZGdlc30sIGNhbGNTaXplKHZlcnRpY2VzKSlcbn1cblxub25tZXNzYWdlID0gKHtkYXRhfSkgPT4ge1xuICBjb25zdCB7dmVydGljZXMsIGVkZ2VzLCBvcHRpb25zfSA9IGRhdGFcbiAgY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHt1LCBkfSBvZiB2ZXJ0aWNlcykge1xuICAgIGdyYXBoLmFkZFZlcnRleCh1LCBkKVxuICB9XG4gIGZvciAoY29uc3Qge3UsIHYsIGR9IG9mIGVkZ2VzKSB7XG4gICAgZ3JhcGguYWRkRWRnZSh1LCB2LCBkKVxuICB9XG5cbiAgcG9zdE1lc3NhZ2UobGF5b3V0KGdyYXBoLCBvcHRpb25zKSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3dvcmtlcnMvbGF5b3V0LXdvcmtlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tdXRhYmxlLWdyYXBoJylcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5OFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQWJzdHJhY3RHcmFwaCA9IHJlcXVpcmUoJy4vYWJzdHJhY3QtZ3JhcGgnKVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY29uc3QgcCA9IChzZWxmKSA9PiBwcml2YXRlcy5nZXQoc2VsZilcblxuY2xhc3MgTXV0YWJsZUdyYXBoIGV4dGVuZHMgQWJzdHJhY3RHcmFwaCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIHZlcnRpY2VzOiBuZXcgTWFwKCksXG4gICAgICBudW1WZXJ0aWNlczogMCxcbiAgICAgIG51bUVkZ2VzOiAwXG4gICAgfSlcbiAgfVxuXG4gIHZlcnRleCAodSkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gcCh0aGlzKS52ZXJ0aWNlc1xuICAgIGlmICh2ZXJ0aWNlcy5nZXQodSkpIHtcbiAgICAgIHJldHVybiB2ZXJ0aWNlcy5nZXQodSkuZGF0YVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZWRnZSAodSwgdikge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gcCh0aGlzKS52ZXJ0aWNlc1xuICAgIGlmICh2ZXJ0aWNlcy5nZXQodSkgJiYgdmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLmdldCh2KSkge1xuICAgICAgcmV0dXJuIHZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5nZXQodilcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZlcnRpY2VzICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwKHRoaXMpLnZlcnRpY2VzLmtleXMoKSlcbiAgfVxuXG4gIG91dFZlcnRpY2VzICh1KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMua2V5cygpKVxuICB9XG5cbiAgaW5WZXJ0aWNlcyAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHAodGhpcykudmVydGljZXMuZ2V0KHUpLmluVmVydGljZXMua2V5cygpKVxuICB9XG5cbiAgbnVtVmVydGljZXMgKCkge1xuICAgIHJldHVybiBwKHRoaXMpLm51bVZlcnRpY2VzXG4gIH1cblxuICBudW1FZGdlcyAoKSB7XG4gICAgcmV0dXJuIHAodGhpcykubnVtRWRnZXNcbiAgfVxuXG4gIG91dERlZ3JlZSAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5zaXplXG4gIH1cblxuICBpbkRlZ3JlZSAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5pblZlcnRpY2VzLnNpemVcbiAgfVxuXG4gIGFkZFZlcnRleCAodSwgb2JqID0ge30pIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICBwKHRoaXMpLnZlcnRpY2VzLnNldCh1LCB7XG4gICAgICBvdXRWZXJ0aWNlczogbmV3IE1hcCgpLFxuICAgICAgaW5WZXJ0aWNlczogbmV3IE1hcCgpLFxuICAgICAgZGF0YTogb2JqXG4gICAgfSlcbiAgICBwKHRoaXMpLm51bVZlcnRpY2VzKytcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkRWRnZSAodSwgdiwgb2JqID0ge30pIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICBpZiAodGhpcy52ZXJ0ZXgodikgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dn1gKVxuICAgIH1cbiAgICBpZiAodGhpcy5lZGdlKHUsIHYpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZWQgZWRnZTogKCR7dX0sICR7dn0pYClcbiAgICB9XG4gICAgcCh0aGlzKS5udW1FZGdlcysrXG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMuc2V0KHYsIG9iailcbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh2KS5pblZlcnRpY2VzLnNldCh1LCBvYmopXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZVZlcnRleCAodSkge1xuICAgIGZvciAoY29uc3QgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICB0aGlzLnJlbW92ZUVkZ2UodSwgdilcbiAgICB9XG4gICAgZm9yIChjb25zdCB2IG9mIHRoaXMuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgdGhpcy5yZW1vdmVFZGdlKHYsIHUpXG4gICAgfVxuICAgIHAodGhpcykudmVydGljZXMuZGVsZXRlKHUpXG4gICAgcCh0aGlzKS5udW1WZXJ0aWNlcy0tXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZUVkZ2UgKHUsIHYpIHtcbiAgICBpZiAodGhpcy5lZGdlKHUsIHYpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBlZGdlOiAoJHt1fSwgJHt2fSlgKVxuICAgIH1cbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5kZWxldGUodilcbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh2KS5pblZlcnRpY2VzLmRlbGV0ZSh1KVxuICAgIHAodGhpcykubnVtRWRnZXMtLVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNdXRhYmxlR3JhcGhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9tdXRhYmxlLWdyYXBoLmpzXG4gKiogbW9kdWxlIGlkID0gMTk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjbGFzcyBBYnN0cmFjdEdyYXBoIHtcbiAgZWRnZXMgKCkge1xuICAgIGNvbnN0IGVkZ2VzID0gW11cbiAgICBmb3IgKGNvbnN0IHUgb2YgdGhpcy52ZXJ0aWNlcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBlZGdlcy5wdXNoKFt1LCB2XSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVkZ2VzXG4gIH1cblxuICAqIG91dEVkZ2VzICh1KSB7XG4gICAgZm9yIChsZXQgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICB5aWVsZCBbdSwgdl1cbiAgICB9XG4gIH1cblxuICAqIGluRWRnZXMgKHUpIHtcbiAgICBmb3IgKGxldCB2IG9mIHRoaXMuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgeWllbGQgW3YsIHVdXG4gICAgfVxuICB9XG5cbiAgdG9KU09OICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmVydGljZXM6IHRoaXMudmVydGljZXMoKS5tYXAoKHUpID0+ICh7dSwgZDogdGhpcy52ZXJ0ZXgodSl9KSksXG4gICAgICBlZGdlczogdGhpcy5lZGdlcygpLm1hcCgoW3UsIHZdKSA9PiAoe3UsIHYsIGQ6IHRoaXMuZWRnZSh1LCB2KX0pKVxuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0R3JhcGhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9hYnN0cmFjdC1ncmFwaC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgR3JhcGggPSByZXF1aXJlKCcuL211dGFibGUtZ3JhcGgnKVxuXG5jb25zdCBjb3B5ID0gKGcpID0+IHtcbiAgY29uc3QgbmV3R3JhcGggPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgbmV3R3JhcGguYWRkVmVydGV4KHUsIGcudmVydGV4KHUpKVxuICB9XG4gIGZvciAoY29uc3QgW3UsIHZdIG9mIGcuZWRnZXMoKSkge1xuICAgIG5ld0dyYXBoLmFkZEVkZ2UodSwgdiwgZy5lZGdlKHUsIHYpKVxuICB9XG4gIHJldHVybiBuZXdHcmFwaFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9jb3B5LmpzXG4gKiogbW9kdWxlIGlkID0gMjAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBHcmFwaCA9IHJlcXVpcmUoJy4uLy4uL2dyYXBoJylcbmNvbnN0IGFjY2Vzc29yID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvYWNjZXNzb3InKVxuY29uc3QgY29ubmVjdGVkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vbWlzYy9jb25uZWN0ZWQtY29tcG9uZW50cycpXG5jb25zdCBncm91cExheWVycyA9IHJlcXVpcmUoJy4vbWlzYy9ncm91cC1sYXllcnMnKVxuY29uc3QgY3ljbGVSZW1vdmFsID0gcmVxdWlyZSgnLi9jeWNsZS1yZW1vdmFsJylcbmNvbnN0IGxheWVyQXNzaWdubWVudCA9IHJlcXVpcmUoJy4vbGF5ZXItYXNzaWdubWVudCcpXG5jb25zdCBub3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZScpXG5jb25zdCBjcm9zc2luZ1JlZHVjdGlvbiA9IHJlcXVpcmUoJy4vY3Jvc3NpbmctcmVkdWN0aW9uJylcbmNvbnN0IHBvc2l0aW9uQXNzaWdubWVudCA9IHJlcXVpcmUoJy4vcG9zaXRpb24tYXNzaWdubWVudCcpXG5jb25zdCBidW5kbGVFZGdlcyA9IHJlcXVpcmUoJy4vYnVuZGxlLWVkZ2VzJylcblxuY29uc3QgaW5pdEdyYXBoID0gKGdPcmlnLCB7bHRvciwgdmVydGV4V2lkdGgsIHZlcnRleEhlaWdodCwgZWRnZVdpZHRoLCBsYXllck1hcmdpbiwgdmVydGV4TWFyZ2luLCB2ZXJ0ZXhMZWZ0TWFyZ2luLCB2ZXJ0ZXhSaWdodE1hcmdpbiwgdmVydGV4VG9wTWFyZ2luLCB2ZXJ0ZXhCb3R0b21NYXJnaW59KSA9PiB7XG4gIGNvbnN0IGcgPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHUgb2YgZ09yaWcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGQgPSBnT3JpZy52ZXJ0ZXgodSlcbiAgICBjb25zdCB3ID0gdmVydGV4V2lkdGgoe3UsIGR9KVxuICAgIGNvbnN0IGggPSB2ZXJ0ZXhIZWlnaHQoe3UsIGR9KVxuICAgIGNvbnN0IGhvcml6b250YWxNYXJnaW4gPSB2ZXJ0ZXhMZWZ0TWFyZ2luKHt1LCBkfSkgKyB2ZXJ0ZXhSaWdodE1hcmdpbih7dSwgZH0pXG4gICAgY29uc3QgdmVydGljYWxNYXJnaW4gPSB2ZXJ0ZXhUb3BNYXJnaW4oe3UsIGR9KSArIHZlcnRleEJvdHRvbU1hcmdpbih7dSwgZH0pXG4gICAgZy5hZGRWZXJ0ZXgodSwge1xuICAgICAgd2lkdGg6IGx0b3IgPyBoICsgdmVydGV4TWFyZ2luICsgdmVydGljYWxNYXJnaW4gOiB3ICsgbGF5ZXJNYXJnaW4gKyBob3Jpem9udGFsTWFyZ2luLFxuICAgICAgaGVpZ2h0OiBsdG9yID8gdyArIGxheWVyTWFyZ2luICsgaG9yaXpvbnRhbE1hcmdpbiA6IGggKyB2ZXJ0ZXhNYXJnaW4gKyB2ZXJ0aWNhbE1hcmdpbixcbiAgICAgIG9yaWdXaWR0aDogbHRvciA/IGggOiB3LFxuICAgICAgb3JpZ0hlaWdodDogbHRvciA/IHcgOiBoXG4gICAgfSlcbiAgfVxuICBmb3IgKGNvbnN0IFt1LCB2XSBvZiBnT3JpZy5lZGdlcygpKSB7XG4gICAgZy5hZGRFZGdlKHUsIHYsIHtcbiAgICAgIHdpZHRoOiBlZGdlV2lkdGgoe1xuICAgICAgICB1LFxuICAgICAgICB2LFxuICAgICAgICB1ZDogZ09yaWcudmVydGV4KHUpLFxuICAgICAgICB2ZDogZ09yaWcudmVydGV4KHYpLFxuICAgICAgICBkOiBnT3JpZy5lZGdlKHUsIHYpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGdcbn1cblxuY29uc3Qgc2ltcGxpZnkgPSAocG9pbnRzLCBsdG9yKSA9PiB7XG4gIGxldCBpbmRleCA9IDFcbiAgd2hpbGUgKGluZGV4IDwgcG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICBjb25zdCB4MCA9IGx0b3IgPyBwb2ludHNbaW5kZXhdWzFdIDogcG9pbnRzW2luZGV4XVswXVxuICAgIGNvbnN0IHgxID0gbHRvciA/IHBvaW50c1tpbmRleCArIDFdWzFdIDogcG9pbnRzW2luZGV4ICsgMV1bMF1cbiAgICBpZiAoeDAgPT09IHgxKSB7XG4gICAgICBwb2ludHMuc3BsaWNlKGluZGV4LCAyKVxuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCArPSAyXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHJldmVyc2VkID0gKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGNvbnN0IHggb2YgYXJyKSB7XG4gICAgcmVzdWx0LnVuc2hpZnQoeClcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGJ1aWxkUmVzdWx0ID0gKGcsIGxheWVycywgbHRvcikgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdmVydGljZXM6IHt9LFxuICAgIGVkZ2VzOiB7fVxuICB9XG4gIGNvbnN0IGxheWVySGVpZ2h0cyA9IFtdXG5cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIHJlc3VsdC5lZGdlc1t1XSA9IHt9XG4gIH1cblxuICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xuICAgIGxldCBtYXhIZWlnaHQgPSAtSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHUgb2YgbGF5ZXIpIHtcbiAgICAgIG1heEhlaWdodCA9IE1hdGgubWF4KG1heEhlaWdodCwgZy52ZXJ0ZXgodSkub3JpZ0hlaWdodCB8fCAwKVxuICAgIH1cbiAgICBsYXllckhlaWdodHMucHVzaChtYXhIZWlnaHQpXG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW2ldXG4gICAgY29uc3QgbGF5ZXJIZWlnaHQgPSBsYXllckhlaWdodHNbaV1cbiAgICBmb3IgKGNvbnN0IHUgb2YgbGF5ZXIpIHtcbiAgICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICAgIGlmICghdU5vZGUuZHVtbXkpIHtcbiAgICAgICAgcmVzdWx0LnZlcnRpY2VzW3VdID0ge1xuICAgICAgICAgIHg6IGx0b3IgPyB1Tm9kZS55IDogdU5vZGUueCxcbiAgICAgICAgICB5OiBsdG9yID8gdU5vZGUueCA6IHVOb2RlLnksXG4gICAgICAgICAgd2lkdGg6IGx0b3IgPyB1Tm9kZS5vcmlnSGVpZ2h0IDogdU5vZGUub3JpZ1dpZHRoLFxuICAgICAgICAgIGhlaWdodDogbHRvciA/IHVOb2RlLm9yaWdXaWR0aCA6IHVOb2RlLm9yaWdIZWlnaHQsXG4gICAgICAgICAgbGF5ZXI6IHVOb2RlLmxheWVyLFxuICAgICAgICAgIG9yZGVyOiB1Tm9kZS5vcmRlclxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCB2IG9mIGcub3V0VmVydGljZXModSkpIHtcbiAgICAgICAgICBjb25zdCBwb2ludHMgPSBsdG9yXG4gICAgICAgICAgICA/IFtbdU5vZGUueSArICh1Tm9kZS5vcmlnSGVpZ2h0IHx8IDApIC8gMiwgdU5vZGUueF0sIFt1Tm9kZS55ICsgbGF5ZXJIZWlnaHQgLyAyLCB1Tm9kZS54XV1cbiAgICAgICAgICAgIDogW1t1Tm9kZS54LCB1Tm9kZS55ICsgKHVOb2RlLm9yaWdIZWlnaHQgfHwgMCkgLyAyXSwgW3VOb2RlLngsIHVOb2RlLnkgKyBsYXllckhlaWdodCAvIDJdXVxuICAgICAgICAgIGxldCB3ID0gdlxuICAgICAgICAgIGxldCB3Tm9kZSA9IGcudmVydGV4KHcpXG4gICAgICAgICAgbGV0IGogPSBpICsgMVxuICAgICAgICAgIHdoaWxlICh3Tm9kZS5kdW1teSkge1xuICAgICAgICAgICAgaWYgKGx0b3IpIHtcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLnkgLSBsYXllckhlaWdodHNbal0gLyAyLCB3Tm9kZS54XSlcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLnkgKyBsYXllckhlaWdodHNbal0gLyAyLCB3Tm9kZS54XSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS54LCB3Tm9kZS55IC0gbGF5ZXJIZWlnaHRzW2pdIC8gMl0pXG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS54LCB3Tm9kZS55ICsgbGF5ZXJIZWlnaHRzW2pdIC8gMl0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ID0gZy5vdXRWZXJ0aWNlcyh3KVswXVxuICAgICAgICAgICAgd05vZGUgPSBnLnZlcnRleCh3KVxuICAgICAgICAgICAgaiArPSAxXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsdG9yKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSAtIGxheWVySGVpZ2h0c1tqXSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLnkgLSAod05vZGUub3JpZ0hlaWdodCB8fCAwKSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueCwgd05vZGUueSAtIGxheWVySGVpZ2h0c1tqXSAvIDJdKVxuICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLngsIHdOb2RlLnkgLSAod05vZGUub3JpZ0hlaWdodCB8fCAwKSAvIDJdKVxuICAgICAgICAgIH1cbiAgICAgICAgICBzaW1wbGlmeShwb2ludHMsIGx0b3IpXG4gICAgICAgICAgaWYgKGcuZWRnZSh1LCB2KS5yZXZlcnNlZCkge1xuICAgICAgICAgICAgcmVzdWx0LmVkZ2VzW3ddW3VdID0ge1xuICAgICAgICAgICAgICBwb2ludHM6IHJldmVyc2VkKHBvaW50cyksXG4gICAgICAgICAgICAgIHJldmVyc2VkOiB0cnVlLFxuICAgICAgICAgICAgICB3aWR0aDogZy5lZGdlKHUsIHYpLndpZHRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5lZGdlc1t1XVt3XSA9IHtcbiAgICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMsXG4gICAgICAgICAgICAgIHJldmVyc2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgd2lkdGg6IGcuZWRnZSh1LCB2KS53aWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgcHJpdmF0ZXMgPSBuZXcgV2Vha01hcCgpXG5cbmNsYXNzIFN1Z2l5YW1hTGF5b3V0ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIHZlcnRleFdpZHRoOiAoe2R9KSA9PiBkLndpZHRoLFxuICAgICAgdmVydGV4SGVpZ2h0OiAoe2R9KSA9PiBkLmhlaWdodCxcbiAgICAgIGVkZ2VXaWR0aDogKCkgPT4gMSxcbiAgICAgIGxheWVyTWFyZ2luOiAxMCxcbiAgICAgIHZlcnRleE1hcmdpbjogMTAsXG4gICAgICB2ZXJ0ZXhMZWZ0TWFyZ2luOiAoKSA9PiAwLFxuICAgICAgdmVydGV4UmlnaHRNYXJnaW46ICgpID0+IDAsXG4gICAgICB2ZXJ0ZXhUb3BNYXJnaW46ICgpID0+IDAsXG4gICAgICB2ZXJ0ZXhCb3R0b21NYXJnaW46ICgpID0+IDAsXG4gICAgICBlZGdlTWFyZ2luOiAxMCxcbiAgICAgIGx0b3I6IHRydWUsXG4gICAgICBlZGdlQnVuZGxpbmc6IGZhbHNlLFxuICAgICAgY3ljbGVSZW1vdmFsOiBuZXcgY3ljbGVSZW1vdmFsLkN5Y2xlUmVtb3ZhbCgpLFxuICAgICAgbGF5ZXJBc3NpZ25tZW50OiBuZXcgbGF5ZXJBc3NpZ25tZW50LlF1YWRIZXVyaXN0aWMoKSxcbiAgICAgIGNyb3NzaW5nUmVkdWN0aW9uOiBuZXcgY3Jvc3NpbmdSZWR1Y3Rpb24uTGF5ZXJTd2VlcCgpLFxuICAgICAgcG9zaXRpb25Bc3NpZ25tZW50OiBuZXcgcG9zaXRpb25Bc3NpZ25tZW50LkJyYW5kZXMoKVxuICAgIH0pXG4gIH1cblxuICBsYXlvdXQgKGdPcmlnKSB7XG4gICAgY29uc3QgZyA9IGluaXRHcmFwaChnT3JpZywge1xuICAgICAgdmVydGV4V2lkdGg6IHRoaXMudmVydGV4V2lkdGgoKSxcbiAgICAgIHZlcnRleEhlaWdodDogdGhpcy52ZXJ0ZXhIZWlnaHQoKSxcbiAgICAgIGVkZ2VXaWR0aDogdGhpcy5lZGdlV2lkdGgoKSxcbiAgICAgIGxheWVyTWFyZ2luOiB0aGlzLmxheWVyTWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhNYXJnaW46IHRoaXMudmVydGV4TWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhMZWZ0TWFyZ2luOiB0aGlzLnZlcnRleExlZnRNYXJnaW4oKSxcbiAgICAgIHZlcnRleFJpZ2h0TWFyZ2luOiB0aGlzLnZlcnRleFJpZ2h0TWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhUb3BNYXJnaW46IHRoaXMudmVydGV4VG9wTWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhCb3R0b21NYXJnaW46IHRoaXMudmVydGV4Qm90dG9tTWFyZ2luKCksXG4gICAgICBsdG9yOiB0aGlzLmx0b3IoKVxuICAgIH0pXG4gICAgdGhpcy5jeWNsZVJlbW92YWwoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJNYXAgPSB0aGlzLmxheWVyQXNzaWdubWVudCgpLmNhbGwoZylcbiAgICBjb25zdCBsYXllcnMgPSBncm91cExheWVycyhnLCBsYXllck1hcCwgdHJ1ZSlcbiAgICBub3JtYWxpemUoZywgbGF5ZXJzLCBsYXllck1hcCwgdGhpcy5lZGdlTWFyZ2luKCksIHRoaXMubGF5ZXJNYXJnaW4oKSlcbiAgICBjb25zdCBub3JtYWxpemVkTGF5ZXJzID0gbGF5ZXJzLm1hcCgoKSA9PiBbXSlcbiAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiBjb25uZWN0ZWRDb21wb25lbnRzKGcpKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoY29tcG9uZW50KVxuICAgICAgY29uc3QgY29tcG9uZW50TGF5ZXJzID0gbGF5ZXJzLm1hcCgoaCkgPT4gaC5maWx0ZXIoKHUpID0+IHZlcnRpY2VzLmhhcyh1KSkpXG4gICAgICB0aGlzLmNyb3NzaW5nUmVkdWN0aW9uKCkuY2FsbChnLCBjb21wb25lbnRMYXllcnMpXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2YgY29tcG9uZW50TGF5ZXJzW2ldKSB7XG4gICAgICAgICAgbm9ybWFsaXplZExheWVyc1tpXS5wdXNoKHUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3JtYWxpemVkTGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBsYXllciA9IG5vcm1hbGl6ZWRMYXllcnNbaV1cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5ZXIubGVuZ3RoOyArK2opIHtcbiAgICAgICAgY29uc3QgdSA9IGxheWVyW2pdXG4gICAgICAgIGcudmVydGV4KHUpLmxheWVyID0gaVxuICAgICAgICBnLnZlcnRleCh1KS5vcmRlciA9IGpcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbkFzc2lnbm1lbnQoKS5jYWxsKGcsIG5vcm1hbGl6ZWRMYXllcnMpXG4gICAgaWYgKHRoaXMuZWRnZUJ1bmRsaW5nKCkpIHtcbiAgICAgIGJ1bmRsZUVkZ2VzKGcsIG5vcm1hbGl6ZWRMYXllcnMsIHRoaXMubHRvcigpKVxuICAgIH1cbiAgICByZXR1cm4gYnVpbGRSZXN1bHQoZywgbm9ybWFsaXplZExheWVycywgdGhpcy5sdG9yKCkpXG4gIH1cblxuICB2ZXJ0ZXhXaWR0aCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4V2lkdGgnLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhIZWlnaHQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleEhlaWdodCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGVkZ2VXaWR0aCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnZWRnZVdpZHRoJywgYXJndW1lbnRzKVxuICB9XG5cbiAgbGF5ZXJNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2xheWVyTWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4TWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICBlZGdlTWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdlZGdlTWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4TGVmdE1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4TGVmdE1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleFJpZ2h0TWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhSaWdodE1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleFRvcE1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4VG9wTWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4Qm90dG9tTWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhCb3R0b21NYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICBsdG9yICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdsdG9yJywgYXJndW1lbnRzKVxuICB9XG5cbiAgZWRnZUJ1bmRsaW5nICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdlZGdlQnVuZGxpbmcnLCBhcmd1bWVudHMpXG4gIH1cblxuICBjeWNsZVJlbW92YWwgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2N5Y2xlUmVtb3ZhbCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGxheWVyQXNzaWdubWVudCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbGF5ZXJBc3NpZ25tZW50JywgYXJndW1lbnRzKVxuICB9XG5cbiAgY3Jvc3NpbmdSZWR1Y3Rpb24gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2Nyb3NzaW5nUmVkdWN0aW9uJywgYXJndW1lbnRzKVxuICB9XG5cbiAgcG9zaXRpb25Bc3NpZ25tZW50ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdwb3NpdGlvbkFzc2lnbm1lbnQnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdWdpeWFtYUxheW91dGVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gKHNlbGYsIHByaXZhdGVzLCBrZXksIGFyZ3MpID0+IHtcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHByaXZhdGVzLmdldChzZWxmKVtrZXldXG4gIH1cbiAgcHJpdmF0ZXMuZ2V0KHNlbGYpW2tleV0gPSBhcmdzWzBdXG4gIHJldHVybiBzZWxmXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNjZXNzb3JcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qc1xuICoqIG1vZHVsZSBpZCA9IDIwM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWFya0NoaWxkcmVuID0gKGdyYXBoLCB1LCBpZCwgcmVzdWx0KSA9PiB7XG4gIGlmIChyZXN1bHQuaGFzKHUpKSB7XG4gICAgY29uc3QgcHJldklkID0gcmVzdWx0LmdldCh1KVxuICAgIGlmIChwcmV2SWQgIT09IGlkKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgudmVydGljZXMoKSkge1xuICAgICAgICBpZiAocmVzdWx0LmdldCh2KSA9PT0gcHJldklkKSB7XG4gICAgICAgICAgcmVzdWx0LnNldCh2LCBpZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICByZXN1bHQuc2V0KHUsIGlkKVxuICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICBtYXJrQ2hpbGRyZW4oZ3JhcGgsIHYsIGlkLCByZXN1bHQpXG4gIH1cbn1cblxuY29uc3QgY29ubmVjdGVkQ29tcG9uZW50cyA9IChncmFwaCkgPT4ge1xuICBjb25zdCBjb21wb25lbnRJZE1hcCA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgZ3JhcGgudmVydGljZXMoKSkge1xuICAgIGlmIChncmFwaC5pbkRlZ3JlZSh1KSA9PT0gMCkge1xuICAgICAgbWFya0NoaWxkcmVuKGdyYXBoLCB1LCB1LCBjb21wb25lbnRJZE1hcClcbiAgICB9XG4gIH1cbiAgY29uc3QgY29tcG9uZW50SWRzID0gbmV3IFNldChjb21wb25lbnRJZE1hcC52YWx1ZXMoKSlcbiAgcmV0dXJuIEFycmF5LmZyb20oY29tcG9uZW50SWRzKS5tYXAoKHUpID0+IHtcbiAgICByZXR1cm4gZ3JhcGgudmVydGljZXMoKS5maWx0ZXIoKHYpID0+IGNvbXBvbmVudElkTWFwLmdldCh2KSA9PT0gdSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25uZWN0ZWRDb21wb25lbnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9jb25uZWN0ZWQtY29tcG9uZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgZ3JvdXBMYXllcnMgPSAoZywgbGF5ZXJzLCBhbGxvd0VtcHR5TGF5ZXIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW3VdXG4gICAgaWYgKHJlc3VsdFtsYXllcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0W2xheWVyXSA9IFtdXG4gICAgfVxuICAgIHJlc3VsdFtsYXllcl0ucHVzaCh1KVxuICB9XG4gIGlmIChhbGxvd0VtcHR5TGF5ZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHJlc3VsdFtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtdXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcigoaCkgPT4gaCAhPT0gdW5kZWZpbmVkKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ3JvdXBMYXllcnNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2dyb3VwLWxheWVycy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQ3ljbGVSZW1vdmFsID0gcmVxdWlyZSgnLi9jeWNsZS1yZW1vdmFsJylcblxubW9kdWxlLmV4cG9ydHMgPSB7Q3ljbGVSZW1vdmFsfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGN5Y2xlRWRnZXMgPSByZXF1aXJlKCcuL2N5Y2xlLWVkZ2VzJylcblxuY29uc3QgY3ljbGVSZW1vdmFsID0gKGcpID0+IHtcbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgY3ljbGVFZGdlcyhnKSkge1xuICAgIGNvbnN0IG9iaiA9IGcuZWRnZSh1LCB2KVxuICAgIGcucmVtb3ZlRWRnZSh1LCB2KVxuICAgIGlmICh1ID09PSB2KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCBlZGdlID0gZy5lZGdlKHYsIHUpXG4gICAgaWYgKGVkZ2UpIHtcbiAgICAgIGVkZ2UubXVsdGlwbGUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGcuYWRkRWRnZSh2LCB1LCBPYmplY3QuYXNzaWduKHtyZXZlcnNlZDogdHJ1ZX0sIG9iaikpXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIEN5Y2xlUmVtb3ZhbCB7XG4gIGNhbGwgKGcpIHtcbiAgICBjeWNsZVJlbW92YWwoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEN5Y2xlUmVtb3ZhbFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtcmVtb3ZhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgY3ljbGVFZGdlcyA9IGZ1bmN0aW9uIChnKSB7XG4gIGNvbnN0IHN0YWNrID0ge31cbiAgY29uc3QgdmlzaXRlZCA9IHt9XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG5cbiAgY29uc3QgZGZzID0gKHUpID0+IHtcbiAgICBpZiAodmlzaXRlZFt1XSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZpc2l0ZWRbdV0gPSB0cnVlXG4gICAgc3RhY2tbdV0gPSB0cnVlXG4gICAgZm9yIChsZXQgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBpZiAoc3RhY2tbdl0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW3UsIHZdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGZzKHYpXG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBzdGFja1t1XVxuICB9XG5cbiAgZm9yIChsZXQgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBkZnModSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjeWNsZUVkZ2VzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1lZGdlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgTG9uZ2VzdFBhdGggPSByZXF1aXJlKCcuL2xvbmdlc3QtcGF0aCcpXG5jb25zdCBRdWFkSGV1cmlzdGljID0gcmVxdWlyZSgnLi9xdWFkLWhldXJpc3RpYycpXG5cbm1vZHVsZS5leHBvcnRzID0ge0xvbmdlc3RQYXRoLCBRdWFkSGV1cmlzdGljfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxvbmdlc3RQYXRoID0gKGcpID0+IHtcbiAgY29uc3QgdmlzaXRlZCA9IHt9XG4gIGNvbnN0IGxheWVycyA9IHt9XG5cbiAgY29uc3QgZGZzID0gKHUpID0+IHtcbiAgICBpZiAodmlzaXRlZFt1XSkge1xuICAgICAgcmV0dXJuIGxheWVyc1t1XVxuICAgIH1cbiAgICB2aXNpdGVkW3VdID0gdHJ1ZVxuXG4gICAgbGV0IGxheWVyID0gSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgbGF5ZXIgPSBNYXRoLm1pbihsYXllciwgZGZzKHYpIC0gMSlcbiAgICB9XG4gICAgaWYgKGxheWVyID09PSBJbmZpbml0eSkge1xuICAgICAgbGF5ZXIgPSAwXG4gICAgfVxuICAgIGxheWVyc1t1XSA9IGxheWVyXG4gICAgcmV0dXJuIGxheWVyXG4gIH1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGcuaW5EZWdyZWUodSkgPT09IDApIHtcbiAgICAgIGRmcyh1KVxuICAgIH1cbiAgfVxuXG4gIGxldCBtaW5MYXllciA9IEluZmluaXR5XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBtaW5MYXllciA9IE1hdGgubWluKG1pbkxheWVyLCBsYXllcnNbdV0pXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGxheWVyc1t1XSAtPSBtaW5MYXllclxuICB9XG5cbiAgcmV0dXJuIGxheWVyc1xufVxuXG5jbGFzcyBMb25nZXN0UGF0aCB7XG4gIGNhbGwgKGcpIHtcbiAgICByZXR1cm4gbG9uZ2VzdFBhdGgoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvbmdlc3RQYXRoXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9sb25nZXN0LXBhdGguanNcbiAqKiBtb2R1bGUgaWQgPSAyMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvYWNjZXNzb3InKVxuY29uc3QgTG9uZ2VzdFBhdGggPSByZXF1aXJlKCcuL2xvbmdlc3QtcGF0aCcpXG5cbmNvbnN0IHF1YWRIZXVyaXN0aWMgPSAoZywgcmVwZWF0KSA9PiB7XG4gIGNvbnN0IGxheWVycyA9IG5ldyBMb25nZXN0UGF0aCgpLmNhbGwoZylcblxuICBsZXQgbWluTGF5ZXIgPSBJbmZpbml0eVxuICBsZXQgbWF4TGF5ZXIgPSAtSW5maW5pdHlcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIG1pbkxheWVyID0gTWF0aC5taW4obWluTGF5ZXIsIGxheWVyc1t1XSlcbiAgICBtYXhMYXllciA9IE1hdGgubWF4KG1heExheWVyLCBsYXllcnNbdV0pXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGlmIChnLmluRGVncmVlKHUpID09PSAwKSB7XG4gICAgICBsYXllcnNbdV0gPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGxheWVyc1t1XSAtPSBtaW5MYXllclxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZlcnRpY2VzID0gZy52ZXJ0aWNlcygpLmZpbHRlcih1ID0+IGcuaW5EZWdyZWUodSkgPiAwICYmIGcub3V0RGVncmVlKHUpID4gMClcbiAgY29uc3Qgd2VpZ2h0cyA9IHt9XG4gIGNvbnN0IGNtcCA9ICh1LCB2KSA9PiB3ZWlnaHRzW3ZdIC0gd2VpZ2h0c1t1XVxuICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHJlcGVhdDsgKytsb29wKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgd2VpZ2h0c1t1XSA9IDBcbiAgICB9XG4gICAgZm9yIChjb25zdCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgICBjb25zdCBsID0gbGF5ZXJzW3ZdIC0gbGF5ZXJzW3VdXG4gICAgICB3ZWlnaHRzW3VdICs9IGxcbiAgICAgIHdlaWdodHNbdl0gKz0gbFxuICAgIH1cblxuICAgIHZlcnRpY2VzLnNvcnQoY21wKVxuICAgIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgICAgbGV0IHN1bSA9IDBcbiAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgIGxldCBsZWZ0TWF4ID0gLUluZmluaXR5XG4gICAgICBsZXQgcmlnaHRNaW4gPSBJbmZpbml0eVxuICAgICAgZm9yIChjb25zdCB2IG9mIGcuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1t2XVxuICAgICAgICBsZWZ0TWF4ID0gTWF0aC5tYXgobGVmdE1heCwgbGF5ZXIpXG4gICAgICAgIHN1bSArPSBsYXllclxuICAgICAgICBjb3VudCArPSAxXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1t2XVxuICAgICAgICByaWdodE1pbiA9IE1hdGgubWluKHJpZ2h0TWluLCBsYXllcilcbiAgICAgICAgc3VtICs9IGxheWVyXG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICAgIGxheWVyc1t1XSA9IE1hdGgubWluKHJpZ2h0TWluIC0gMSwgTWF0aC5tYXgobGVmdE1heCArIDEsIE1hdGgucm91bmQoc3VtIC8gY291bnQpKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGF5ZXJzXG59XG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBRdWFkSGV1cmlzdGljIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICByZXBlYXQ6IDRcbiAgICB9KVxuICB9XG5cbiAgY2FsbCAoZykge1xuICAgIHJldHVybiBxdWFkSGV1cmlzdGljKGcsIHRoaXMucmVwZWF0KCkpXG4gIH1cblxuICByZXBlYXQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3JlcGVhdCcsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1YWRIZXVyaXN0aWNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzXG4gKiogbW9kdWxlIGlkID0gMjExXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBub3JtYWxpemUgPSAoZywgbGF5ZXJzLCBsYXllck1hcCwgZWRnZU1hcmdpbiwgbGF5ZXJNYXJnaW4pID0+IHtcbiAgdmFyIGksIHcxLCB3MlxuICBmb3IgKGxldCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgY29uc3QgZCA9IGcuZWRnZSh1LCB2KVxuICAgIGlmIChsYXllck1hcFt2XSAtIGxheWVyTWFwW3VdID4gMSkge1xuICAgICAgdzEgPSB1XG4gICAgICBmb3IgKGkgPSBsYXllck1hcFt1XSArIDE7IGkgPCBsYXllck1hcFt2XTsgKytpKSB7XG4gICAgICAgIHcyID0gU3ltYm9sKClcbiAgICAgICAgZy5hZGRWZXJ0ZXgodzIsIHtcbiAgICAgICAgICB1LFxuICAgICAgICAgIHYsXG4gICAgICAgICAgZHVtbXk6IHRydWUsXG4gICAgICAgICAgd2lkdGg6IGQud2lkdGggKyBlZGdlTWFyZ2luLFxuICAgICAgICAgIG9yaWdXaWR0aDogZC53aWR0aCArIGVkZ2VNYXJnaW4sXG4gICAgICAgICAgaGVpZ2h0OiBsYXllck1hcmdpbixcbiAgICAgICAgICBvcmlnSGVpZ2h0OiAwLFxuICAgICAgICAgIGxheWVyOiBpXG4gICAgICAgIH0pXG4gICAgICAgIGcuYWRkRWRnZSh3MSwgdzIsIHtcbiAgICAgICAgICB1LFxuICAgICAgICAgIHYsXG4gICAgICAgICAgZHVtbXk6IHRydWUsXG4gICAgICAgICAgcmV2ZXJzZWQ6IGcuZWRnZSh1LCB2KS5yZXZlcnNlZCxcbiAgICAgICAgICB3aWR0aDogZC53aWR0aFxuICAgICAgICB9KVxuICAgICAgICBsYXllcnNbaV0ucHVzaCh3MilcbiAgICAgICAgdzEgPSB3MlxuICAgICAgfVxuICAgICAgZy5hZGRFZGdlKHcxLCB2LCB7XG4gICAgICAgIHUsXG4gICAgICAgIHYsXG4gICAgICAgIGR1bW15OiB0cnVlLFxuICAgICAgICByZXZlcnNlZDogZy5lZGdlKHUsIHYpLnJldmVyc2VkLFxuICAgICAgICB3aWR0aDogZC53aWR0aFxuICAgICAgfSlcbiAgICAgIGcucmVtb3ZlRWRnZSh1LCB2KVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL25vcm1hbGl6ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgTGF5ZXJTd2VlcCA9IHJlcXVpcmUoJy4vbGF5ZXItc3dlZXAnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtMYXllclN3ZWVwfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hY2Nlc3NvcicpXG5jb25zdCBiYXJ5Q2VudGVyID0gcmVxdWlyZSgnLi9iYXJ5LWNlbnRlcicpXG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBMYXllclN3ZWVwIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICByZXBlYXQ6IDgsXG4gICAgICBtZXRob2Q6IGJhcnlDZW50ZXJcbiAgICB9KVxuICB9XG5cbiAgY2FsbCAoZywgbGF5ZXJzKSB7XG4gICAgY29uc3QgbiA9IGxheWVycy5sZW5ndGhcbiAgICBjb25zdCByZXBlYXQgPSB0aGlzLnJlcGVhdCgpXG4gICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2QoKVxuXG4gICAgZm9yIChsZXQgbG9vcCA9IDA7IGxvb3AgPCByZXBlYXQ7ICsrbG9vcCkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgbWV0aG9kKGcsIGxheWVyc1tpIC0gMV0sIGxheWVyc1tpXSlcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSBuIC0gMTsgaSA+IDA7IC0taSkge1xuICAgICAgICBtZXRob2QoZywgbGF5ZXJzW2kgLSAxXSwgbGF5ZXJzW2ldLCB0cnVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlcGVhdCAoYXJnKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAncmVwZWF0JywgYXJndW1lbnRzKVxuICB9XG5cbiAgbWV0aG9kIChhcmcpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdtZXRob2QnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMYXllclN3ZWVwXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2xheWVyLXN3ZWVwLmpzXG4gKiogbW9kdWxlIGlkID0gMjE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBsYXllck1hdHJpeCA9IHJlcXVpcmUoJy4uL21pc2MvbGF5ZXItbWF0cml4JylcblxuY29uc3QgYmFyeUNlbnRlciA9IChnLCBoMSwgaDIsIGludmVyc2UgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjZW50ZXJzID0ge31cbiAgY29uc3QgbiA9IGgxLmxlbmd0aFxuICBjb25zdCBtID0gaDIubGVuZ3RoXG4gIGNvbnN0IGEgPSBsYXllck1hdHJpeChnLCBoMSwgaDIpXG4gIGNvbnN0IGNtcCA9ICh1LCB2KSA9PiBjZW50ZXJzW3VdIC0gY2VudGVyc1t2XVxuICBpZiAoaW52ZXJzZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBsZXQgc3VtID0gMFxuICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICAgICAgY29uc3QgYWlqID0gYVtpICogbSArIGpdXG4gICAgICAgIGNvdW50ICs9IGFpalxuICAgICAgICBzdW0gKz0gaiAqIGFpalxuICAgICAgfVxuICAgICAgY2VudGVyc1toMVtpXV0gPSBzdW0gLyBjb3VudFxuICAgIH1cbiAgICBoMS5zb3J0KGNtcClcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG07ICsraikge1xuICAgICAgbGV0IHN1bSA9IDBcbiAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGNvbnN0IGFpaiA9IGFbaSAqIG0gKyBqXVxuICAgICAgICBjb3VudCArPSBhaWpcbiAgICAgICAgc3VtICs9IGkgKiBhaWpcbiAgICAgIH1cbiAgICAgIGNlbnRlcnNbaDJbal1dID0gc3VtIC8gY291bnRcbiAgICB9XG4gICAgaDIuc29ydChjbXApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXJ5Q2VudGVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2JhcnktY2VudGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBsYXllck1hdHJpeCA9IChnLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgbiA9IGgxLmxlbmd0aFxuICBjb25zdCBtID0gaDIubGVuZ3RoXG4gIGNvbnN0IG9yZGVycyA9IHt9XG4gIGNvbnN0IGEgPSBuZXcgSW50OEFycmF5KG4gKiBtKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbTsgKytpKSB7XG4gICAgb3JkZXJzW2gyW2ldXSA9IGlcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgIGNvbnN0IHUgPSBoMVtpXVxuICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBhW2kgKiBtICsgb3JkZXJzW3ZdXSA9IDFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsYXllck1hdHJpeFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbGF5ZXItbWF0cml4LmpzXG4gKiogbW9kdWxlIGlkID0gMjE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBCcmFuZGVzID0gcmVxdWlyZSgnLi9icmFuZGVzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7QnJhbmRlc31cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBtYXJrQ29uZmxpY3RzID0gcmVxdWlyZSgnLi9tYXJrLWNvbmZsaWN0cycpXG5jb25zdCB2ZXJ0aWNhbEFsaWdubWVudCA9IHJlcXVpcmUoJy4vdmVydGljYWwtYWxpZ25tZW50JylcbmNvbnN0IGhvcml6b250YWxDb21wYWN0aW9uID0gcmVxdWlyZSgnLi9ob3Jpem9udGFsLWNvbXBhY3Rpb24nKVxuXG5jb25zdCBzb3J0ID0gKHhzKSA9PiB7XG4gIHhzLnNvcnQoKHgxLCB4MikgPT4geDEgLSB4Milcbn1cblxuY29uc3QgYnJhbmRlcyA9IChnLCBsYXllcnMpID0+IHtcbiAgbWFya0NvbmZsaWN0cyhnLCBsYXllcnMpXG5cbiAgY29uc3QgeHMgPSB7fVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgeHNbdV0gPSBbXVxuICB9XG4gIGNvbnN0IGRpcmVjdGlvbnMgPSBbXG4gICAge3J0b2w6IGZhbHNlLCBidG90OiBmYWxzZX0sXG4gICAge3J0b2w6IHRydWUsIGJ0b3Q6IGZhbHNlfSxcbiAgICB7cnRvbDogZmFsc2UsIGJ0b3Q6IHRydWV9LFxuICAgIHtydG9sOiB0cnVlLCBidG90OiB0cnVlfVxuICBdXG5cbiAgbGV0IG1pbldpZHRoTGVmdCA9IC1JbmZpbml0eVxuICBsZXQgbWluV2lkdGhSaWdodCA9IEluZmluaXR5XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRpcmVjdGlvbnNbaV1cbiAgICB2ZXJ0aWNhbEFsaWdubWVudChnLCBsYXllcnMsIGRpcmVjdGlvbilcbiAgICBob3Jpem9udGFsQ29tcGFjdGlvbihnLCBsYXllcnMsIGRpcmVjdGlvbilcbiAgICBsZXQgbWluWCA9IEluZmluaXR5XG4gICAgbGV0IG1heFggPSAtSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLnJ0b2wpIHtcbiAgICAgICAgZy52ZXJ0ZXgodSkueCA9IC1nLnZlcnRleCh1KS54XG4gICAgICB9XG4gICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgZy52ZXJ0ZXgodSkueClcbiAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLCBnLnZlcnRleCh1KS54KVxuICAgIH1cbiAgICBpZiAobWF4WCAtIG1pblggPCBtaW5XaWR0aFJpZ2h0IC0gbWluV2lkdGhMZWZ0KSB7XG4gICAgICBtaW5XaWR0aExlZnQgPSBtaW5YXG4gICAgICBtaW5XaWR0aFJpZ2h0ID0gbWF4WFxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICB4c1t1XS5wdXNoKGcudmVydGV4KHUpLngpXG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRpcmVjdGlvbnNbaV1cbiAgICBpZiAoZGlyZWN0aW9uLnJ0b2wpIHtcbiAgICAgIGxldCBtYXhYID0gLUluZmluaXR5XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLCB4c1t1XVtpXSlcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgICAgeHNbdV1baV0gKz0gbWluV2lkdGhSaWdodCAtIG1heFhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1pblggPSBJbmZpbml0eVxuICAgICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgeHNbdV1baV0pXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICAgIHhzW3VdW2ldICs9IG1pbldpZHRoTGVmdCAtIG1pblhcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIHNvcnQoeHNbdV0pXG4gICAgZy52ZXJ0ZXgodSkueCA9ICh4c1t1XVsxXSArIHhzW3VdWzJdKSAvIDJcbiAgfVxufVxuXG5jb25zdCBub3JtYWxpemUgPSAoZykgPT4ge1xuICBsZXQgeE1pbiA9IEluZmluaXR5XG4gIGxldCB5TWluID0gSW5maW5pdHlcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICB4TWluID0gTWF0aC5taW4oeE1pbiwgdU5vZGUueCAtIHVOb2RlLm9yaWdXaWR0aCAvIDIpXG4gICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHVOb2RlLnkgLSB1Tm9kZS5vcmlnSGVpZ2h0IC8gMilcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIHVOb2RlLnggLT0geE1pblxuICAgIHVOb2RlLnkgLT0geU1pblxuICB9XG59XG5cbmNsYXNzIEJyYW5kZXMge1xuICBjYWxsIChnLCBsYXllcnMpIHtcbiAgICBicmFuZGVzKGcsIGxheWVycylcblxuICAgIGxldCB5T2Zmc2V0ID0gMFxuICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgbGF5ZXJzKSB7XG4gICAgICBsZXQgbWF4SGVpZ2h0ID0gMFxuICAgICAgZm9yIChjb25zdCB1IG9mIGxheWVyKSB7XG4gICAgICAgIG1heEhlaWdodCA9IE1hdGgubWF4KG1heEhlaWdodCwgZy52ZXJ0ZXgodSkuaGVpZ2h0KVxuICAgICAgfVxuICAgICAgeU9mZnNldCArPSBtYXhIZWlnaHQgLyAyXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgbGF5ZXIpIHtcbiAgICAgICAgZy52ZXJ0ZXgodSkueSA9IHlPZmZzZXRcbiAgICAgIH1cbiAgICAgIHlPZmZzZXQgKz0gbWF4SGVpZ2h0IC8gMlxuICAgIH1cblxuICAgIG5vcm1hbGl6ZShnKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJhbmRlc1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbGF5ZXJFZGdlcyA9IHJlcXVpcmUoJy4uLy4uL21pc2MvbGF5ZXItZWRnZXMnKVxuXG5jb25zdCBzcGxpdCA9ICh4LCBmKSA9PiB7XG4gIGNvbnN0IHkgPSBbXVxuICBjb25zdCB6ID0gW11cbiAgZm9yIChjb25zdCB4aSBvZiB4KSB7XG4gICAgaWYgKGYoeGkpKSB7XG4gICAgICB5LnB1c2goeGkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHoucHVzaCh4aSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFt5LCB6XVxufVxuXG5jb25zdCBtYXJrQ29uZmxpY3RzID0gKGcsIGxheWVycykgPT4ge1xuICBjb25zdCBoID0gbGF5ZXJzLmxlbmd0aCAtIDJcbiAgY29uc3QgZHVtbXkgPSB7fVxuICBjb25zdCBvcmRlciA9IHt9XG4gIGNvbnN0IGlzSW5uZXIgPSAoW3UsIHZdKSA9PiBkdW1teVt1XSAmJiBkdW1teVt2XVxuXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCBkID0gZy52ZXJ0ZXgodSlcbiAgICBkdW1teVt1XSA9ICEhZC5kdW1teVxuICAgIG9yZGVyW3VdID0gZC5vcmRlclxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBoOyArK2kpIHtcbiAgICBjb25zdCBoMSA9IGxheWVyc1tpXVxuICAgIGNvbnN0IGgyID0gbGF5ZXJzW2kgKyAxXVxuICAgIGNvbnN0IGVkZ2VzID0gbGF5ZXJFZGdlcyhnLCBoMSwgaDIpXG4gICAgY29uc3QgW2lubmVyU2VnbWVudHMsIG91dGVyU2VnbWVudHNdID0gc3BsaXQoZWRnZXMsIGlzSW5uZXIpXG4gICAgZm9yIChjb25zdCBbdTEsIHYxXSBvZiBpbm5lclNlZ21lbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFt1MiwgdjJdIG9mIG91dGVyU2VnbWVudHMpIHtcbiAgICAgICAgaWYgKChvcmRlclt1MV0gPCBvcmRlclt1Ml0gJiYgb3JkZXJbdjFdID4gb3JkZXJbdjJdKSB8fCAob3JkZXJbdTFdID4gb3JkZXJbdTJdICYmIG9yZGVyW3YxXSA8IG9yZGVyW3YyXSkpIHtcbiAgICAgICAgICBnLmVkZ2UodTIsIHYyKS50eXBlMUNvbmZsaWN0ID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFya0NvbmZsaWN0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9tYXJrLWNvbmZsaWN0cy5qc1xuICoqIG1vZHVsZSBpZCA9IDIxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbGF5ZXJFZGdlcyA9IChnLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChjb25zdCB2IG9mIGgyKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGcuaW5WZXJ0aWNlcyh2KSkge1xuICAgICAgcmVzdWx0LnB1c2goW3UsIHZdKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGF5ZXJFZGdlc1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbGF5ZXItZWRnZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IG1lZGlhbiA9IHJlcXVpcmUoJy4uLy4uL21pc2MvbWVkaWFuJylcblxuY29uc3QgdmVydGljYWxBbGlnbm1lbnQgPSAoZywgbGF5ZXJzLCB7IHJ0b2wgPSBmYWxzZSwgYnRvdCA9IGZhbHNlIH0pID0+IHtcbiAgY29uc3QgaXRlckxheWVycyA9IGZ1bmN0aW9uICogKCkge1xuICAgIGlmIChidG90KSB7XG4gICAgICBmb3IgKGxldCBpID0gbGF5ZXJzLmxlbmd0aCAtIDI7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHlpZWxkIGxheWVyc1tpXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxheWVycy5sZW5ndGg7ICsraSkge1xuICAgICAgICB5aWVsZCBsYXllcnNbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBpdGVyTGF5ZXIgPSBmdW5jdGlvbiAqIChsYXllcikge1xuICAgIGlmIChydG9sKSB7XG4gICAgICBmb3IgKGxldCBpID0gbGF5ZXIubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgeWllbGQgbGF5ZXJbaV1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllci5sZW5ndGg7ICsraSkge1xuICAgICAgICB5aWVsZCBsYXllcltpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGVkZ2UgPSBidG90ID8gKHUsIHYpID0+IGcuZWRnZSh2LCB1KSA6ICh1LCB2KSA9PiBnLmVkZ2UodSwgdilcbiAgY29uc3QgZGVncmVlID0gYnRvdCA/IHUgPT4gZy5vdXREZWdyZWUodSkgOiB1ID0+IGcuaW5EZWdyZWUodSlcbiAgY29uc3QgbWVkID0gYnRvdCA/IChnLCBsYXllcnMpID0+IG1lZGlhbihnLCBsYXllcnMsIHRydWUpIDogKGcsIGxheWVycykgPT4gbWVkaWFuKGcsIGxheWVycylcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGcudmVydGV4KHUpLnJvb3QgPSB1XG4gICAgZy52ZXJ0ZXgodSkuYWxpZ24gPSB1XG4gIH1cbiAgZm9yIChjb25zdCBsYXllciBvZiBpdGVyTGF5ZXJzKCkpIHtcbiAgICBsZXQgciA9IHJ0b2wgPyBJbmZpbml0eSA6IC1JbmZpbml0eVxuICAgIGZvciAoY29uc3QgdiBvZiBpdGVyTGF5ZXIobGF5ZXIpKSB7XG4gICAgICBpZiAoZGVncmVlKHYpID4gMCkge1xuICAgICAgICBjb25zdCB7bGVmdCwgcmlnaHR9ID0gbWVkKGcsIHYpXG4gICAgICAgIGNvbnN0IG1lZGlhbnMgPSBsZWZ0ID09PSByaWdodCA/IFtsZWZ0XSA6IChydG9sID8gW3JpZ2h0LCBsZWZ0XSA6IFtsZWZ0LCByaWdodF0pXG4gICAgICAgIGZvciAoY29uc3QgdSBvZiBtZWRpYW5zKSB7XG4gICAgICAgICAgaWYgKCFlZGdlKHUsIHYpLnR5cGUxQ29uZmxpY3QgJiYgIWVkZ2UodSwgdikudHlwZTJDb25mbGljdCkge1xuICAgICAgICAgICAgaWYgKHJ0b2wgPyByID4gZy52ZXJ0ZXgodSkub3JkZXIgOiByIDwgZy52ZXJ0ZXgodSkub3JkZXIpIHtcbiAgICAgICAgICAgICAgZy52ZXJ0ZXgodikuYWxpZ24gPSBnLnZlcnRleCh2KS5yb290ID0gZy52ZXJ0ZXgodSkucm9vdFxuICAgICAgICAgICAgICBnLnZlcnRleCh1KS5hbGlnbiA9IHZcbiAgICAgICAgICAgICAgciA9IGcudmVydGV4KHUpLm9yZGVyXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVydGljYWxBbGlnbm1lbnRcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvdmVydGljYWwtYWxpZ25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBtZWRpYW4gPSAoZywgdiwgaW52ZXJzZSA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IHZlcnRpY2VzID0gQXJyYXkuZnJvbShpbnZlcnNlID8gZy5vdXRWZXJ0aWNlcyh2KSA6IGcuaW5WZXJ0aWNlcyh2KSlcbiAgdmVydGljZXMuc29ydCgodTEsIHUyKSA9PiBnLnZlcnRleCh1MSkub3JkZXIgLSBnLnZlcnRleCh1Mikub3JkZXIpXG4gIGNvbnN0IGluZGV4ID0gKHZlcnRpY2VzLmxlbmd0aCAtIDEpIC8gMlxuICByZXR1cm4ge1xuICAgIGxlZnQ6IHZlcnRpY2VzW01hdGguZmxvb3IoaW5kZXgpXSxcbiAgICByaWdodDogdmVydGljZXNbTWF0aC5jZWlsKGluZGV4KV1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lZGlhblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbWVkaWFuLmpzXG4gKiogbW9kdWxlIGlkID0gMjIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBob3Jpem9udGFsQ29tcGFjdGlvbiA9IChnLCBsYXllcnMsIHsgcnRvbCA9IGZhbHNlIH0pID0+IHtcbiAgY29uc3Qgb3JkZXJOb25aZXJvID0gKG5vZGUpID0+IHJ0b2xcbiAgICA/IG5vZGUub3JkZXIgPCBsYXllcnNbbm9kZS5sYXllcl0ubGVuZ3RoIC0gMVxuICAgIDogbm9kZS5vcmRlciA+IDBcbiAgY29uc3QgcHJlZGVjZXNzb3IgPSBydG9sXG4gICAgPyBub2RlID0+IGxheWVyc1tub2RlLmxheWVyXVtub2RlLm9yZGVyICsgMV1cbiAgICA6IG5vZGUgPT4gbGF5ZXJzW25vZGUubGF5ZXJdW25vZGUub3JkZXIgLSAxXVxuXG4gIGNvbnN0IHBsYWNlQmxvY2sgPSAodikgPT4ge1xuICAgIGNvbnN0IHZOb2RlID0gZy52ZXJ0ZXgodilcbiAgICBpZiAodk5vZGUueCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZOb2RlLnggPSAwXG4gICAgbGV0IHcgPSB2XG4gICAgZG8ge1xuICAgICAgY29uc3Qgd05vZGUgPSBnLnZlcnRleCh3KVxuICAgICAgaWYgKG9yZGVyTm9uWmVybyh3Tm9kZSkpIHtcbiAgICAgICAgY29uc3QgcCA9IHByZWRlY2Vzc29yKHdOb2RlKVxuICAgICAgICBjb25zdCBwTm9kZSA9IGcudmVydGV4KHApXG4gICAgICAgIGNvbnN0IHUgPSBwTm9kZS5yb290XG4gICAgICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICAgICAgcGxhY2VCbG9jayh1KVxuICAgICAgICBpZiAodk5vZGUuc2luayA9PT0gdikge1xuICAgICAgICAgIHZOb2RlLnNpbmsgPSB1Tm9kZS5zaW5rXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZOb2RlLnNpbmsgPT09IHVOb2RlLnNpbmspIHtcbiAgICAgICAgICB2Tm9kZS54ID0gTWF0aC5tYXgodk5vZGUueCwgdU5vZGUueCArIChwTm9kZS53aWR0aCArIHdOb2RlLndpZHRoKSAvIDIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdVNpbmtOb2RlID0gZy52ZXJ0ZXgodU5vZGUuc2luaylcbiAgICAgICAgICB1U2lua05vZGUuc2hpZnQgPSBNYXRoLm1pbih1U2lua05vZGUuc2hpZnQsIHZOb2RlLnggLSB1Tm9kZS54IC0gKHBOb2RlLndpZHRoICsgd05vZGUud2lkdGgpIC8gMilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdyA9IHdOb2RlLmFsaWduXG4gICAgfSB3aGlsZSAodyAhPT0gdilcbiAgfVxuXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgdU5vZGUuc2luayA9IHVcbiAgICB1Tm9kZS5zaGlmdCA9IEluZmluaXR5XG4gICAgdU5vZGUueCA9IG51bGxcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGcudmVydGV4KHUpLnJvb3QgPT09IHUpIHtcbiAgICAgIHBsYWNlQmxvY2sodSlcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICB1Tm9kZS54ID0gZy52ZXJ0ZXgodU5vZGUucm9vdCkueFxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgY29uc3Qgc2hpZnQgPSBnLnZlcnRleChnLnZlcnRleCh1Tm9kZS5yb290KS5zaW5rKS5zaGlmdFxuICAgIGlmIChzaGlmdCA8IEluZmluaXR5KSB7XG4gICAgICB1Tm9kZS54ICs9IHNoaWZ0XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9yaXpvbnRhbENvbXBhY3Rpb25cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvaG9yaXpvbnRhbC1jb21wYWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBzZWdtZW50ID0gZnVuY3Rpb24gKiAoZ3JhcGgsIHZlcnRpY2VzLCB1cHBlcikge1xuICBpZiAodmVydGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgbGV0IHNlcSA9IFtdXG4gIGxldCBsYXN0UGFyZW50ID0gZ3JhcGgudmVydGV4KHZlcnRpY2VzWzBdKVt1cHBlciA/ICd2JyA6ICd1J11cbiAgZm9yIChjb25zdCB1IG9mIHZlcnRpY2VzKSB7XG4gICAgY29uc3QgZCA9IGdyYXBoLnZlcnRleCh1KVxuICAgIGlmICghZC5kdW1teSB8fCBkW3VwcGVyID8gJ3YnIDogJ3UnXSAhPT0gbGFzdFBhcmVudCkge1xuICAgICAgaWYgKHNlcS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHlpZWxkIHNlcVxuICAgICAgICBzZXEgPSBbXVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZC5kdW1teSkge1xuICAgICAgc2VxLnB1c2godSlcbiAgICAgIGxhc3RQYXJlbnQgPSBkW3VwcGVyID8gJ3YnIDogJ3UnXVxuICAgIH1cbiAgfVxuICBpZiAoc2VxLmxlbmd0aCA+IDApIHtcbiAgICB5aWVsZCBzZXFcbiAgfVxufVxuXG5jb25zdCBhZGp1c3RQb3MgPSAoZ3JhcGgsIHZlcnRpY2VzLCBsdG9yKSA9PiB7XG4gIGxldCBzdW0gPSAwXG4gIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgIHN1bSArPSBncmFwaC52ZXJ0ZXgodSlbbHRvciA/ICd4JyA6ICd5J11cbiAgfVxuICBjb25zdCBwb3MgPSBzdW0gLyB2ZXJ0aWNlcy5sZW5ndGhcbiAgZm9yIChjb25zdCB1IG9mIHZlcnRpY2VzKSB7XG4gICAgZ3JhcGgudmVydGV4KHUpW2x0b3IgPyAneCcgOiAneSddID0gcG9zXG4gIH1cbn1cblxuY29uc3QgYnVuZGxlRWRnZXMgPSAoZ3JhcGgsIGxheWVycywgbHRvcikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBmb3IgKGNvbnN0IHZlcnRpY2VzIG9mIHNlZ21lbnQoZ3JhcGgsIGxheWVyc1tpXSwgZmFsc2UpKSB7XG4gICAgICBhZGp1c3RQb3MoZ3JhcGgsIHZlcnRpY2VzLCBsdG9yKVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpID0gbGF5ZXJzLmxlbmd0aCAtIDE7IGkgPiAwOyAtLWkpIHtcbiAgICBmb3IgKGNvbnN0IHZlcnRpY2VzIG9mIHNlZ21lbnQoZ3JhcGgsIGxheWVyc1tpXSwgdHJ1ZSkpIHtcbiAgICAgIGFkanVzdFBvcyhncmFwaCwgdmVydGljZXMsIGx0b3IpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVuZGxlRWRnZXNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9idW5kbGUtZWRnZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IEdyYXBoID0gcmVxdWlyZSgnLi4vLi4vZ3JhcGgnKVxuY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi91dGlscy9hY2Nlc3NvcicpXG5jb25zdCBjeWNsZVJlbW92YWwgPSByZXF1aXJlKCcuLi8uLi9sYXlvdXRlci9zdWdpeWFtYS9jeWNsZS1yZW1vdmFsJylcbmNvbnN0IGxheWVyQXNzaWdubWVudCA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQnKVxuY29uc3QgZ3JvdXBMYXllcnMgPSByZXF1aXJlKCcuLi8uLi9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2dyb3VwLWxheWVycycpXG5jb25zdCByZWN0YW5ndWxhciA9IHJlcXVpcmUoJy4vcmVjdGFuZ3VsYXInKVxuXG5jb25zdCBlZGdlQ29uY2VudHJhdGlvbiA9IChnLCBoMSwgaDIsIG1ldGhvZCwgZHVtbXksIGlkR2VuZXJhdG9yKSA9PiB7XG4gIGNvbnN0IHN1YmdyYXBoID0gbmV3IEdyYXBoKClcbiAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgc3ViZ3JhcGguYWRkVmVydGV4KHUsIGcudmVydGV4KHUpKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBoMikge1xuICAgIHN1YmdyYXBoLmFkZFZlcnRleCh1LCBnLnZlcnRleCh1KSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgc3ViZ3JhcGguYWRkRWRnZSh1LCB2LCBnLmVkZ2UodSwgdikpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBjb25jZW50cmF0aW9uIG9mIG1ldGhvZChzdWJncmFwaCwgaDEsIGgyKSkge1xuICAgIGNvbnN0IHcgPSBpZEdlbmVyYXRvcihnLCBoMSwgaDIpXG4gICAgZy5hZGRWZXJ0ZXgodywgZHVtbXkoY29uY2VudHJhdGlvbi5zb3VyY2UsIGNvbmNlbnRyYXRpb24udGFyZ2V0KSlcbiAgICBmb3IgKGNvbnN0IHUgb2YgY29uY2VudHJhdGlvbi5zb3VyY2UpIHtcbiAgICAgIGcuYWRkRWRnZSh1LCB3KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHYgb2YgY29uY2VudHJhdGlvbi50YXJnZXQpIHtcbiAgICAgIGcuYWRkRWRnZSh3LCB2KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHUgb2YgZy5pblZlcnRpY2VzKHcpKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh3KSkge1xuICAgICAgICBpZiAoZy5lZGdlKHUsIHYpKSB7XG4gICAgICAgICAgZy5yZW1vdmVFZGdlKHUsIHYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcHJpdmF0ZXMgPSBuZXcgV2Vha01hcCgpXG5cbmNsYXNzIEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIGN5Y2xlUmVtb3ZhbDogbmV3IGN5Y2xlUmVtb3ZhbC5DeWNsZVJlbW92YWwoKSxcbiAgICAgIGxheWVyQXNzaWdubWVudDogbmV3IGxheWVyQXNzaWdubWVudC5RdWFkSGV1cmlzdGljKCksXG4gICAgICBtZXRob2Q6IHJlY3Rhbmd1bGFyLFxuICAgICAgZHVtbXk6ICgpID0+ICh7ZHVtbXk6IHRydWV9KSxcbiAgICAgIGlkR2VuZXJhdG9yOiAoKSA9PiBTeW1ib2woKVxuICAgIH0pXG4gIH1cblxuICB0cmFuc2Zvcm0gKGcpIHtcbiAgICB0aGlzLmN5Y2xlUmVtb3ZhbCgpLmNhbGwoZylcbiAgICBjb25zdCBsYXllck1hcCA9IHRoaXMubGF5ZXJBc3NpZ25tZW50KCkuY2FsbChnKVxuICAgIGNvbnN0IGxheWVycyA9IGdyb3VwTGF5ZXJzKGcsIGxheWVyTWFwKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgY29uc3QgaDEgPSBsYXllcnNbaV1cbiAgICAgIGNvbnN0IGgyID0gbmV3IFNldCgpXG4gICAgICBsZXQgZWRnZXMgPSAwXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICAgICAgZm9yIChjb25zdCB2IG9mIGcub3V0VmVydGljZXModSkpIHtcbiAgICAgICAgICBoMi5hZGQodilcbiAgICAgICAgICBlZGdlcyArPSAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVkZ2VDb25jZW50cmF0aW9uKGcsIGgxLCBBcnJheS5mcm9tKGgyLnZhbHVlcygpKSwgdGhpcy5tZXRob2QoKSwgdGhpcy5kdW1teSgpLCB0aGlzLmlkR2VuZXJhdG9yKCkpXG4gICAgfVxuICAgIHJldHVybiBnXG4gIH1cblxuICBjeWNsZVJlbW92YWwgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2N5Y2xlUmVtb3ZhbCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGxheWVyQXNzaWdubWVudCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbGF5ZXJBc3NpZ25tZW50JywgYXJndW1lbnRzKVxuICB9XG5cbiAgbWV0aG9kICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdtZXRob2QnLCBhcmd1bWVudHMpXG4gIH1cblxuICBkdW1teSAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnZHVtbXknLCBhcmd1bWVudHMpXG4gIH1cblxuICBpZEdlbmVyYXRvciAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnaWRHZW5lcmF0b3InLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFZGdlQ29uY2VudHJhdGlvblRyYW5zZm9ybWVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBsYXllclZlcnRpY2VzID0gKGcsIGgxLCBoMikgPT4ge1xuICBjb25zdCB1cyA9IG5ldyBTZXQoaDEpXG4gIGNvbnN0IHZlcnRpY2VzID0ge31cbiAgZm9yIChjb25zdCB2IG9mIGgyKSB7XG4gICAgdmVydGljZXNbdl0gPSBuZXcgU2V0KClcbiAgICBmb3IgKGNvbnN0IHUgb2YgZy5pblZlcnRpY2VzKHYpKSB7XG4gICAgICBpZiAodXMuaGFzKHUpKSB7XG4gICAgICAgIHZlcnRpY2VzW3ZdLmFkZCh1KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmVydGljZXNcbn1cblxuY29uc3QgcmVjdGFuZ3VsYXIgPSAoZywgaDEsIGgyKSA9PiB7XG4gIGlmIChoMS5sZW5ndGggPT09IDAgfHwgaDIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgY29uc3QgayA9IGcubnVtRWRnZXMoKVxuICBjb25zdCBhY3RpdmUgPSB7fVxuICBjb25zdCB2ZXJ0aWNlcyA9IGxheWVyVmVydGljZXMoZywgaDEsIGgyKVxuICBjb25zdCBpc0FjdGl2ZSA9ICh1KSA9PiBhY3RpdmVbdV1cbiAgY29uc3QgY21wID0gKHYxLCB2MikgPT4gdmVydGljZXNbdjJdLnNpemUgLSB2ZXJ0aWNlc1t2MV0uc2l6ZVxuICBjb25zdCBkID0gKHMsIHQpID0+IHtcbiAgICBsZXQgY291bnQgPSAwXG4gICAgZm9yIChjb25zdCB1IG9mIHMpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiB0KSB7XG4gICAgICAgIGlmICh2ZXJ0aWNlc1t2XS5oYXModSkpIHtcbiAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50IC0gcy5sZW5ndGggLSB0Lmxlbmd0aFxuICB9XG4gIGgyID0gQXJyYXkuZnJvbShoMilcblxuICBjb25zdCBjb25jZW50cmF0aW9ucyA9IFtdXG4gIGxldCBqT2Zmc2V0ID0gMFxuICBmb3IgKGxldCBsID0gMDsgbCA8IGs7ICsrbCkge1xuICAgIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgICAgYWN0aXZlW3VdID0gdHJ1ZVxuICAgIH1cblxuICAgIGgyLnNvcnQoY21wKVxuICAgIGlmICh2ZXJ0aWNlc1toMltqT2Zmc2V0XV0uc2l6ZSA8PSAwKSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGxldCBtYXhEID0gLTFcbiAgICBsZXQgbWF4SDFcbiAgICBsZXQgbWF4SDJcbiAgICBsZXQgdG1wSDIgPSBbXVxuICAgIGZvciAobGV0IGogPSBqT2Zmc2V0OyBqIDwgaDIubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IHYgPSBoMltqXVxuICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgICAgIGlmIChhY3RpdmVbdV0pIHtcbiAgICAgICAgICBpZiAoZy5lZGdlKHUsIHYpKSB7XG4gICAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZVt1XSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0bXBIMi5wdXNoKHYpXG4gICAgICBsZXQgdG1wSDEgPSBoMS5maWx0ZXIoaXNBY3RpdmUpXG4gICAgICBsZXQgdG1wRCA9IGQodG1wSDEsIHRtcEgyKVxuICAgICAgaWYgKHRtcEQgPiBtYXhEKSB7XG4gICAgICAgIG1heEQgPSB0bXBEXG4gICAgICAgIG1heEgxID0gdG1wSDFcbiAgICAgICAgbWF4SDIgPSBBcnJheS5mcm9tKHRtcEgyKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXhEID4gLTEpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBtYXhIMikge1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2YgbWF4SDEpIHtcbiAgICAgICAgICB2ZXJ0aWNlc1t2XS5kZWxldGUodSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uY2VudHJhdGlvbnMucHVzaCh7XG4gICAgICAgIHNvdXJjZTogQXJyYXkuZnJvbShtYXhIMSksXG4gICAgICAgIHRhcmdldDogQXJyYXkuZnJvbShtYXhIMilcbiAgICAgIH0pXG4gICAgICBqT2Zmc2V0ID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICBqT2Zmc2V0ICs9IDFcbiAgICB9XG5cbiAgICBpZiAoak9mZnNldCA+PSBoMi5sZW5ndGgpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmNlbnRyYXRpb25zXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVjdGFuZ3VsYXJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcmVjdGFuZ3VsYXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGhhc2hLZXkgPSAodmVydGljZXMpID0+IHtcbiAgcmV0dXJuIHZlcnRpY2VzLm1hcCgodSkgPT4gdS50b1N0cmluZygpKS5qb2luKCcsJylcbn1cblxuY29uc3QgbWF4S2V5ID0gKGl0ZXIpID0+IHtcbiAgbGV0IG1heFZhbCA9IC1JbmZpbml0eVxuICBsZXQgcmVzdWx0ID0gbnVsbFxuICBmb3IgKGNvbnN0IFtpZCwgdmFsXSBvZiBpdGVyKSB7XG4gICAgaWYgKHZhbCA+IG1heFZhbCkge1xuICAgICAgbWF4VmFsID0gdmFsXG4gICAgICByZXN1bHQgPSBpZFxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IHBhcnRpdGlvbiA9IChncmFwaCwgVSkgPT4ge1xuICBjb25zdCBMID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBMLmFkZCh2KVxuICAgIH1cbiAgfVxuICBjb25zdCBoYXNoS2V5cyA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgIGhhc2hLZXlzLnNldCh1LCBoYXNoS2V5KGdyYXBoLm91dFZlcnRpY2VzKHUpKSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgTCkge1xuICAgIGNvbnN0IGRlZ3JlZXMgPSBncmFwaC5pblZlcnRpY2VzKHUpLm1hcCgodikgPT4gW3YsIGdyYXBoLm91dERlZ3JlZSh2KV0pXG4gICAgY29uc3QgbWF4SWQgPSBtYXhLZXkoZGVncmVlcylcbiAgICBoYXNoS2V5cy5zZXQodSwgaGFzaEtleXMuZ2V0KG1heElkKSlcbiAgfVxuICBsZXQgY2hhbmdlZCA9IGZhbHNlXG4gIGRvIHtcbiAgICBjaGFuZ2VkID0gZmFsc2VcbiAgICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgICAgY29uc3QgTSA9IG5ldyBNYXAoKVxuICAgICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBoYXNoS2V5cy5nZXQodilcbiAgICAgICAgaWYgKCFNLmhhcyhoYXNoKSkge1xuICAgICAgICAgIE0uc2V0KGhhc2gsIDApXG4gICAgICAgIH1cbiAgICAgICAgTS5zZXQoaGFzaCwgTS5nZXQoaGFzaCkgKyAxKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3S2V5ID0gbWF4S2V5KE0uZW50cmllcygpKVxuICAgICAgaWYgKGhhc2hLZXlzLmdldCh1KSAhPT0gbmV3S2V5KSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIGhhc2hLZXlzLnNldCh1LCBuZXdLZXkpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBMKSB7XG4gICAgICBjb25zdCBNID0gbmV3IE1hcCgpXG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGguaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBoYXNoID0gaGFzaEtleXMuZ2V0KHYpXG4gICAgICAgIGlmICghTS5oYXMoaGFzaCkpIHtcbiAgICAgICAgICBNLnNldChoYXNoLCAwKVxuICAgICAgICB9XG4gICAgICAgIE0uc2V0KGhhc2gsIE0uZ2V0KGhhc2gpICsgMSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0tleSA9IG1heEtleShNLmVudHJpZXMoKSlcbiAgICAgIGlmIChoYXNoS2V5cy5nZXQodSkgIT09IG5ld0tleSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBoYXNoS2V5cy5zZXQodSwgbmV3S2V5KVxuICAgICAgfVxuICAgIH1cbiAgfSB3aGlsZSAoY2hhbmdlZClcbiAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgY29uc3QgaGFzaCA9IGhhc2hLZXlzLmdldCh1KVxuICAgIGlmICghcmVzdWx0LmhhcyhoYXNoKSkge1xuICAgICAgcmVzdWx0LnNldChoYXNoLCBbXSlcbiAgICB9XG4gICAgcmVzdWx0LmdldChoYXNoKS5wdXNoKHUpXG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20ocmVzdWx0LnZhbHVlcygpKVxufVxuXG5jb25zdCBhdWd1bWVudCA9IChncmFwaCwgUykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCB1IG9mIFMpIHtcbiAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICAgIGZvciAoY29uc3QgdyBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICAgIHJlc3VsdC5hZGQodylcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20ocmVzdWx0KVxufVxuXG5jb25zdCBxdWFzaUJpY2xpcXVlTWluaW5nID0gKGdyYXBoLCBtdSwgUykgPT4ge1xuICBjb25zdCBDID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBTKSB7XG4gICAgY29uc3QgdG1wUyA9IG5ldyBTZXQoKVxuICAgIGNvbnN0IHRtcFQgPSBuZXcgU2V0KGdyYXBoLm91dFZlcnRpY2VzKHUpKVxuICAgIEMuc2V0KGhhc2hLZXkoQXJyYXkuZnJvbSh0bXBUKSksIHtzb3VyY2U6IHRtcFMsIHRhcmdldDogdG1wVH0pXG4gIH1cbiAgZm9yIChjb25zdCBrZXkgb2YgQy5rZXlzKCkpIHtcbiAgICBjb25zdCBNID0gbmV3IE1hcCgpXG4gICAgZm9yIChjb25zdCB2IG9mIEMuZ2V0KGtleSkudGFyZ2V0KSB7XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZ3JhcGguaW5WZXJ0aWNlcyh2KSkge1xuICAgICAgICBpZiAoIU0uaGFzKHUpKSB7XG4gICAgICAgICAgTS5zZXQodSwgMClcbiAgICAgICAgfVxuICAgICAgICBNLnNldCh1LCBNLmdldCh1KSArIDEpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBNLmtleXMoKSkge1xuICAgICAgaWYgKE0uZ2V0KHUpID49IG11ICogQy5nZXQoa2V5KS50YXJnZXQuc2l6ZSkge1xuICAgICAgICBDLmdldChrZXkpLnNvdXJjZS5hZGQodSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBBcnJheS5mcm9tKEMudmFsdWVzKCkpXG4gICAgLmZpbHRlcigoe3NvdXJjZSwgdGFyZ2V0fSkgPT4gc291cmNlLnNpemUgPiAxICYmIHRhcmdldC5zaXplID4gMSlcbiAgcmVzdWx0LnNvcnQoKGMxLCBjMikgPT4gYzEuc291cmNlLnNpemUgPT09IGMyLnNvdXJjZS5zaXplID8gYzIudGFyZ2V0LnNpemUgLSBjMS50YXJnZXQuc2l6ZSA6IGMyLnNvdXJjZS5zaXplIC0gYzEuc291cmNlLnNpemUpXG4gIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgY29uc3QgbWF4aW11bSA9IHJlc3VsdFswXVxuICBmb3IgKGxldCBpID0gMTsgaSA8IHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHRtcFMgPSBuZXcgU2V0KG1heGltdW0uc291cmNlKVxuICAgIGNvbnN0IHRtcFQgPSBuZXcgU2V0KG1heGltdW0udGFyZ2V0KVxuICAgIGZvciAoY29uc3QgdSBvZiByZXN1bHRbaV0uc291cmNlKSB7XG4gICAgICB0bXBTLmFkZCh1KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHUgb2YgcmVzdWx0W2ldLnRhcmdldCkge1xuICAgICAgdG1wVC5hZGQodSlcbiAgICB9XG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGZvciAoY29uc3QgdSBvZiB0bXBTKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgdG1wVCkge1xuICAgICAgICBpZiAoZ3JhcGguZWRnZSh1LCB2KSkge1xuICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnQgPCBtdSAqIHRtcFMuc2l6ZSAqIHRtcFQuc2l6ZSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgbWF4aW11bS5zb3VyY2UgPSBBcnJheS5mcm9tKHRtcFMpXG4gICAgbWF4aW11bS50YXJnZXQgPSBBcnJheS5mcm9tKHRtcFQpXG4gIH1cbiAgcmV0dXJuIFttYXhpbXVtXVxufVxuXG5jb25zdCBxdWFzaUNsaXF1ZUxheWVyID0gKGdyYXBoLCBoMSwgaDIsIG11KSA9PiB7XG4gIGNvbnN0IGNsaXF1ZXMgPSBbXVxuICBmb3IgKGNvbnN0IFMgb2YgcGFydGl0aW9uKGdyYXBoLCBoMSkpIHtcbiAgICBmb3IgKGNvbnN0IGNsaXF1ZSBvZiBxdWFzaUJpY2xpcXVlTWluaW5nKGdyYXBoLCBtdSwgYXVndW1lbnQoZ3JhcGgsIFMpKSkge1xuICAgICAgY2xpcXVlcy5wdXNoKGNsaXF1ZSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsaXF1ZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBxdWFzaUNsaXF1ZUxheWVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDIyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3Qge2NvbWJpbmF0aW9ufSA9IHJlcXVpcmUoJ2pzLWNvbWJpbmF0b3JpY3MnKVxuXG5jb25zdCBlbnVtZXJhdGUgPSBmdW5jdGlvbiAqIChuZWlnaGJvcnMsIGVwc2lsb24pIHtcbiAgaWYgKG5laWdoYm9ycy5zaXplID4gMCkge1xuICAgIGZvciAobGV0IGkgPSBlcHNpbG9uOyBpID4gMDsgLS1pKSB7XG4gICAgICBjb25zdCBpdGVyID0gY29tYmluYXRpb24oQXJyYXkuZnJvbShuZWlnaGJvcnMpLCBNYXRoLm1pbihpLCBuZWlnaGJvcnMuc2l6ZSkpXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBTID0gaXRlci5uZXh0KClcbiAgICAgICAgaWYgKCFTKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBTXG4gICAgICB9XG4gICAgfVxuICAgIHlpZWxkIFtdXG4gIH1cbn1cblxuY29uc3QgYWRqYWNlbnRWZXJ0aWNlcyA9IChncmFwaCwgdnMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdiBvZiB2cykge1xuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5vdXRWZXJ0aWNlcyh2KSkge1xuICAgICAgcmVzdWx0LmFkZCh1KVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGdlbktleSA9IChWbCwgVnIpID0+IHtcbiAgY29uc3QgYXJyYXlWbCA9IEFycmF5LmZyb20oVmwpXG4gIGNvbnN0IGFycmF5VnIgPSBBcnJheS5mcm9tKFZyKVxuICBhcnJheVZsLnNvcnQoKVxuICBhcnJheVZyLnNvcnQoKVxuICByZXR1cm4gYCR7YXJyYXlWbC5qb2luKCcsJyl9OiR7YXJyYXlWci5qb2luKCcsJyl9YFxufVxuXG5jb25zdCBjb3VudEVycm9yID0gKGdyYXBoLCB1LCB2ZXJ0aWNlcywgbHRvdSkgPT4ge1xuICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGx0b3UgPyBncmFwaC5pblZlcnRpY2VzKHUpIDogZ3JhcGgub3V0VmVydGljZXModSkpXG4gIGxldCBjb3VudCA9IDBcbiAgZm9yIChjb25zdCB2IG9mIHZlcnRpY2VzKSB7XG4gICAgaWYgKCFuZWlnaGJvcnMuaGFzKHYpKSB7XG4gICAgICBjb3VudCArPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudFxufVxuXG5jb25zdCBpbnRlcnNlY3Rpb24gPSAoQSwgQikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCBpdGVtIG9mIEEpIHtcbiAgICBpZiAoQi5oYXMoaXRlbSkpIHtcbiAgICAgIHJlc3VsdC5hZGQoaXRlbSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBzZXRtaW51cyA9IChBLCBCKSA9PiB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBCKSB7XG4gICAgQS5kZWxldGUoaXRlbSlcbiAgfVxuICByZXR1cm4gQVxufVxuXG5jb25zdCBzdG9yZSA9IChyZXN1bHQsIGtleSwgVmwsIFZyKSA9PiB7XG4gIGZvciAoY29uc3QgW2tleSwge3NvdXJjZSwgdGFyZ2V0fV0gb2YgcmVzdWx0LmVudHJpZXMoKSkge1xuICAgIGNvbnN0IHNvdXJjZUludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbihzb3VyY2UsIFZsKVxuICAgIGNvbnN0IHRhcmdldEludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbih0YXJnZXQsIFZyKVxuICAgIGlmIChzb3VyY2VJbnRlcnNlY3Rpb24uc2l6ZSA9PT0gc291cmNlLnNpemUgJiYgdGFyZ2V0SW50ZXJzZWN0aW9uLnNpemUgPT09IHRhcmdldC5zaXplKSB7XG4gICAgICByZXN1bHQuZGVsZXRlKGtleSlcbiAgICB9IGVsc2UgaWYgKHNvdXJjZUludGVyc2VjdGlvbi5zaXplID09PSBWbC5zaXplICYmIHRhcmdldEludGVyc2VjdGlvbi5zaXplID09PSBWci5zaXplKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgcmVzdWx0LnNldChrZXksIHtzb3VyY2U6IFZsLCB0YXJnZXQ6IFZyfSlcbn1cblxuY29uc3QgdGVzdEVwc2lsb25RdWFzaUJpY2xpcXVlID0gKGdyYXBoLCBzb3VyY2UsIHRhcmdldCwgZXBzaWxvbiwgbXMpID0+IHtcbiAgaWYgKHNvdXJjZS5zaXplIDwgbXMgfHwgdGFyZ2V0LnNpemUgPCBtcykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBzb3VyY2UpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGgub3V0VmVydGljZXModSkpXG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGZvciAoY29uc3QgdiBvZiB0YXJnZXQpIHtcbiAgICAgIGlmICghdmVydGljZXMuaGFzKHYpKSB7XG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50ID4gZXBzaWxvbikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiB0YXJnZXQpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh1KSlcbiAgICBsZXQgY291bnQgPSAwXG4gICAgZm9yIChjb25zdCB2IG9mIHNvdXJjZSkge1xuICAgICAgaWYgKCF2ZXJ0aWNlcy5oYXModikpIHtcbiAgICAgICAgY291bnQgKz0gMVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnQgPiBlcHNpbG9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3Qgc3Vic3BhY2UgPSAoZ3JhcGgsIGNhbmRWbCwgZ2VuVmwsIGNhbmRFeHQsIGVwc2lsb24sIG1zLCB2aXNpdGVkLCByZXN1bHQpID0+IHtcbiAgY29uc3QgY2FuZFZyID0gYWRqYWNlbnRWZXJ0aWNlcyhncmFwaCwgY2FuZFZsKVxuICBmb3IgKGNvbnN0IHYgb2YgY2FuZFZyKSB7XG4gICAgaWYgKGNvdW50RXJyb3IoZ3JhcGgsIHYsIGNhbmRWbCwgdHJ1ZSkgPiBlcHNpbG9uKSB7XG4gICAgICBjYW5kVnIuZGVsZXRlKHYpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qga2V5ID0gZ2VuS2V5KGNhbmRWbCwgY2FuZFZyKVxuICBpZiAodmlzaXRlZC5oYXMoa2V5KSkge1xuICAgIHJldHVyblxuICB9XG4gIHZpc2l0ZWQuYWRkKGtleSlcbiAgaWYgKHRlc3RFcHNpbG9uUXVhc2lCaWNsaXF1ZShncmFwaCwgY2FuZFZsLCBjYW5kVnIsIGVwc2lsb24sIG1zKSkge1xuICAgIHN0b3JlKHJlc3VsdCwga2V5LCBjYW5kVmwsIGNhbmRWcilcbiAgfVxuXG4gIHNldG1pbnVzKGNhbmRFeHQsIGNhbmRWcilcbiAgZm9yIChjb25zdCB2IG9mIGNhbmRFeHQpIHtcbiAgICBjYW5kRXh0LmRlbGV0ZSh2KVxuICAgIGNvbnN0IG5laWdoYm9ycyA9IGludGVyc2VjdGlvbihjYW5kVmwsIG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh2KSkpXG4gICAgY29uc3QgcmVzdCA9IHNldG1pbnVzKG5ldyBTZXQoY2FuZFZsKSwgbmVpZ2hib3JzKVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUocmVzdCwgZXBzaWxvbikpIHtcbiAgICAgIGNvbnN0IFZsID0gbmV3IFNldChuZWlnaGJvcnMpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgY2FuZEV4dCwgZXBzaWxvbiwgbXMsIHZpc2l0ZWQsIHJlc3VsdClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29tcGxldGVRQiA9IChncmFwaCwgaDEsIGgyLCBlcHNpbG9uLCBtcykgPT4ge1xuICBjb25zdCBiaWNsaXF1ZXMgPSBuZXcgTWFwKClcbiAgY29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGgxKVxuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICBuZWlnaGJvcnMuZGVsZXRlKHUpXG4gICAgfVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUobmVpZ2hib3JzLCBlcHNpbG9uKSkge1xuICAgICAgY29uc3QgVmwgPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgbmV3IFNldChoMiksIGVwc2lsb24sIG1zLCB2aXNpdGVkLCBiaWNsaXF1ZXMpXG4gICAgfVxuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKGJpY2xpcXVlcy52YWx1ZXMoKSkubWFwKCh7c291cmNlLCB0YXJnZXR9KSA9PiB7XG4gICAgY29uc3Qgc291cmNlQXJyYXkgPSBBcnJheS5mcm9tKHNvdXJjZSlcbiAgICBjb25zdCB0YXJnZXRBcnJheSA9IEFycmF5LmZyb20odGFyZ2V0KVxuICAgIHNvdXJjZUFycmF5LnNvcnQoKVxuICAgIHRhcmdldEFycmF5LnNvcnQoKVxuICAgIHJldHVybiB7XG4gICAgICBzb3VyY2U6IHNvdXJjZUFycmF5LFxuICAgICAgdGFyZ2V0OiB0YXJnZXRBcnJheVxuICAgIH1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb21wbGV0ZVFCXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2NvbXBsZXRlLXFiLmpzXG4gKiogbW9kdWxlIGlkID0gMjI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIvKlxuICogJElkOiBjb21iaW5hdG9yaWNzLmpzLHYgMC4yNSAyMDEzLzAzLzExIDE1OjQyOjE0IGRhbmtvZ2FpIEV4cCBkYW5rb2dhaSAkXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICpcbiAqICBSZWZlcmVuY2VzOlxuICogICAgaHR0cDovL3d3dy5ydWJ5LWRvYy5vcmcvY29yZS0yLjAvQXJyYXkuaHRtbCNtZXRob2QtaS1jb21iaW5hdGlvblxuICogICAgaHR0cDovL3d3dy5ydWJ5LWRvYy5vcmcvY29yZS0yLjAvQXJyYXkuaHRtbCNtZXRob2QtaS1wZXJtdXRhdGlvblxuICogICAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GYWN0b3JpYWxfbnVtYmVyX3N5c3RlbVxuICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5Db21iaW5hdG9yaWNzID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgdmVyc2lvbiA9IFwiMC41LjJcIjtcbiAgICAvKiBjb21iaW5hdG9yeSBhcml0aG1ldGljcyAqL1xuICAgIHZhciBQID0gZnVuY3Rpb24obSwgbikge1xuICAgICAgICB2YXIgcCA9IDE7XG4gICAgICAgIHdoaWxlIChuLS0pIHAgKj0gbS0tO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9O1xuICAgIHZhciBDID0gZnVuY3Rpb24obSwgbikge1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQKG0sIG4pIC8gUChuLCBuKTtcbiAgICB9O1xuICAgIHZhciBmYWN0b3JpYWwgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgIHJldHVybiBQKG4sIG4pO1xuICAgIH07XG4gICAgdmFyIGZhY3RvcmFkaWMgPSBmdW5jdGlvbihuLCBkKSB7XG4gICAgICAgIHZhciBmID0gMTtcbiAgICAgICAgaWYgKCFkKSB7XG4gICAgICAgICAgICBmb3IgKGQgPSAxOyBmIDwgbjsgZiAqPSArK2QpO1xuICAgICAgICAgICAgaWYgKGYgPiBuKSBmIC89IGQtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGYgPSBmYWN0b3JpYWwoZCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFswXTtcbiAgICAgICAgZm9yICg7IGQ7IGYgLz0gZC0tKSB7XG4gICAgICAgICAgICByZXN1bHRbZF0gPSBNYXRoLmZsb29yKG4gLyBmKTtcbiAgICAgICAgICAgIG4gJT0gZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyogY29tbW9uIG1ldGhvZHMgKi9cbiAgICB2YXIgYWRkUHJvcGVydGllcyA9IGZ1bmN0aW9uKGRzdCwgc3JjKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHN0LCBwLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHNyY1twXSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHAgPT0gJ25leHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaGlkZVByb3BlcnR5ID0gZnVuY3Rpb24obywgcCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgcCwge1xuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgdmFyIGUsIHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgd2hpbGUgKGUgPSB0aGlzLm5leHQoKSkgcmVzdWx0LnB1c2goZiA/IGYoZSkgOiBlKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICB2YXIgY29tbW9uID0ge1xuICAgICAgICB0b0FycmF5OiB0b0FycmF5LFxuICAgICAgICBtYXA6IHRvQXJyYXksXG4gICAgICAgIGZvckVhY2g6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIHZhciBlO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB3aGlsZSAoZSA9IHRoaXMubmV4dCgpKSBmKGUpO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24oZikge1xuICAgICAgICAgICAgdmFyIGUsIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB3aGlsZSAoZSA9IHRoaXMubmV4dCgpKSBpZiAoZihlKSkgcmVzdWx0LnB1c2goZSk7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGxhenlNYXA6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhenlNYXAgPSBmO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxhenlGaWx0ZXI6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbmV4dCcsIHtcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGYgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLl9uZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICh0aGlzLl9uZXh0KSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0ID0gdGhpcy5uZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgX25leHQgPSB0aGlzLl9uZXh0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGUgPSBfbmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZihlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICduZXh0Jywge1xuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvKiBwb3dlciBzZXQgKi9cbiAgICB2YXIgcG93ZXIgPSBmdW5jdGlvbihhcnksIGZ1bikge1xuICAgICAgICB2YXIgc2l6ZSA9IDEgPDwgYXJ5Lmxlbmd0aCxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgbjsgbiA+Pj49IDEsIGkrKykgaWYgKG4gJiAxKSByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubnRoKHRoaXMuaW5kZXgrKyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIGNvbW1vbik7XG4gICAgICAgIHRoYXQuaW5pdCgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiAoZnVuKSA9PT0gJ2Z1bmN0aW9uJykgPyB0aGF0Lm1hcChmdW4pIDogdGhhdDtcbiAgICB9O1xuICAgIC8qIGNvbWJpbmF0aW9uICovXG4gICAgdmFyIG5leHRJbmRleCA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIHNtYWxsZXN0ID0gbiAmIC1uLFxuICAgICAgICAgICAgcmlwcGxlID0gbiArIHNtYWxsZXN0LFxuICAgICAgICAgICAgbmV3X3NtYWxsZXN0ID0gcmlwcGxlICYgLXJpcHBsZSxcbiAgICAgICAgICAgIG9uZXMgPSAoKG5ld19zbWFsbGVzdCAvIHNtYWxsZXN0KSA+PiAxKSAtIDE7XG4gICAgICAgIHJldHVybiByaXBwbGUgfCBvbmVzO1xuICAgIH07XG4gICAgdmFyIGNvbWJpbmF0aW9uID0gZnVuY3Rpb24oYXJ5LCBuZWxlbSwgZnVuKSB7XG4gICAgICAgIGlmICghbmVsZW0pIG5lbGVtID0gYXJ5Lmxlbmd0aDtcbiAgICAgICAgaWYgKG5lbGVtIDwgMSkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIGlmIChuZWxlbSA+IGFyeS5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgZmlyc3QgPSAoMSA8PCBuZWxlbSkgLSAxLFxuICAgICAgICAgICAgc2l6ZSA9IEMoYXJ5Lmxlbmd0aCwgbmVsZW0pLFxuICAgICAgICAgICAgbWF4SW5kZXggPSAxIDw8IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGZpcnN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID49IG1heEluZGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICg7IG47IG4gPj4+PSAxLCBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gJiAxKSByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXh0SW5kZXgodGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcbiAgICAvKiBiaWdjb21iaW5hdGlvbiAqL1xuICAgIHZhciBiaWdOZXh0SW5kZXggPSBmdW5jdGlvbihuLCBuZWxlbSkge1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuO1xuICAgICAgICB2YXIgaiA9IG5lbGVtO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZvciAoaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdFtpXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGogPT0gMCkge1xuICAgICAgICAgICAgLy8gT3ZlcmZsb3dcbiAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IDE7XG4gICAgICAgICAgICBmb3IgKHZhciBrID0gcmVzdWx0Lmxlbmd0aCAtIDI7IGsgPj0gMDsgay0tKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tdID0gKGsgPCBuZWxlbS0xKT8xOjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxcblxuICAgICAgICAgICAgLy8gZmlyc3QgemVybyBhZnRlciAxXG4gICAgICAgICAgICB2YXIgaTEgPSAtMTtcbiAgICAgICAgICAgIHZhciBpMCA9IC0xO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDAgJiYgaTEgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaTAgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaTEgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaTAgIT0gLTEgJiYgaTEgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2kwXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpMV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGogPSBuZWxlbTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSByZXN1bHQubGVuZ3RoIC0gMTsgaSA+PSBpMTsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXSA9PSAxKVxuICAgICAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGkxOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSAoaSA8IGopPzE6MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9O1xuICAgIHZhciBidWlsZEZpcnN0ID0gZnVuY3Rpb24obmVsZW0pIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5lbGVtOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0WzBdID0gMTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHZhciBiaWdDb21iaW5hdGlvbiA9IGZ1bmN0aW9uKGFyeSwgbmVsZW0sIGZ1bikge1xuICAgICAgICBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICBpZiAobmVsZW0gPiBhcnkubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIGZpcnN0ID0gYnVpbGRGaXJzdChuZWxlbSksXG4gICAgICAgICAgICBzaXplID0gQyhhcnkubGVuZ3RoLCBuZWxlbSksXG4gICAgICAgICAgICBtYXhJbmRleCA9IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGZpcnN0LmNvbmNhdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4Lmxlbmd0aCA+IG1heEluZGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuLmxlbmd0aDsgaisrLCBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5bal0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiaWdOZXh0SW5kZXgodGhpcy5pbmRleCwgbmVsZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIChmdW4pID09PSAnZnVuY3Rpb24nKSA/IHRoYXQubWFwKGZ1bikgOiB0aGF0O1xuICAgIH07XG4gICAgLyogcGVybXV0YXRpb24gKi9cbiAgICB2YXIgX3Blcm11dGF0aW9uID0gZnVuY3Rpb24oYXJ5KSB7XG4gICAgICAgIHZhciB0aGF0ID0gYXJ5LnNsaWNlKCksXG4gICAgICAgICAgICBzaXplID0gZmFjdG9yaWFsKHRoYXQubGVuZ3RoKTtcbiAgICAgICAgdGhhdC5pbmRleCA9IDA7XG4gICAgICAgIHRoYXQubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gc2l6ZSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGNvcHkgPSB0aGlzLnNsaWNlKCksXG4gICAgICAgICAgICAgICAgZGlnaXRzID0gZmFjdG9yYWRpYyh0aGlzLmluZGV4LCB0aGlzLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICAgICAgaSA9IHRoaXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGZvciAoOyBpID49IDA7IC0taSkgcmVzdWx0LnB1c2goY29weS5zcGxpY2UoZGlnaXRzW2ldLCAxKVswXSk7XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgLy8gd2hpY2ggaXMgcmVhbGx5IGEgcGVybXV0YXRpb24gb2YgY29tYmluYXRpb25cbiAgICB2YXIgcGVybXV0YXRpb24gPSBmdW5jdGlvbihhcnksIG5lbGVtLCBmdW4pIHtcbiAgICAgICAgaWYgKCFuZWxlbSkgbmVsZW0gPSBhcnkubGVuZ3RoO1xuICAgICAgICBpZiAobmVsZW0gPCAxKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgaWYgKG5lbGVtID4gYXJ5Lmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBzaXplID0gUChhcnkubGVuZ3RoLCBuZWxlbSksXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2NtYicpO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ3BlcicpO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIHtcbiAgICAgICAgICAgIHZhbHVlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY21iID0gY29tYmluYXRpb24oYXJ5LCBuZWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXIgPSBfcGVybXV0YXRpb24odGhpcy5jbWIubmV4dCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5wZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbWIgPSB0aGlzLmNtYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY21iKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyID0gX3Blcm11dGF0aW9uKGNtYik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcblxuICAgIHZhciBQQyA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAgICAgZm9yICh2YXIgbiA9IDE7IG4gPD0gbTsgbisrKSB7XG4gICAgICAgICAgICB2YXIgcCA9IFAobSxuKTtcbiAgICAgICAgICAgIHRvdGFsICs9IHA7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9O1xuICAgIC8vIHdoaWNoIGlzIHJlYWxseSBhIHBlcm11dGF0aW9uIG9mIGNvbWJpbmF0aW9uXG4gICAgdmFyIHBlcm11dGF0aW9uQ29tYmluYXRpb24gPSBmdW5jdGlvbihhcnksIGZ1bikge1xuICAgICAgICAvLyBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIC8vIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICAvLyBpZiAobmVsZW0gPiBhcnkubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIHNpemUgPSBQQyhhcnkubGVuZ3RoKSxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnY21iJyk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAncGVyJyk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnbmVsZW0nKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5lbGVtID0gMTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIG5lbGVtOiBcIiArIHRoaXMubmVsZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY21iID0gY29tYmluYXRpb24oYXJ5LCB0aGlzLm5lbGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlciA9IF9wZXJtdXRhdGlvbih0aGlzLmNtYi5uZXh0KCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnBlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNtYiA9IHRoaXMuY21iLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVsZW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW5jcmVtZW50IG5lbGVtOiBcIiArIHRoaXMubmVsZW0gKyBcIiB2cyBcIiArIGFyeS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVsZW0gPiBhcnkubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNtYiA9IGNvbWJpbmF0aW9uKGFyeSwgdGhpcy5uZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbWIgPSB0aGlzLmNtYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNtYikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyID0gX3Blcm11dGF0aW9uKGNtYik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcbiAgICAvKiBDYXJ0ZXNpYW4gUHJvZHVjdCAqL1xuICAgIHZhciBhcnJheVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBjYXJ0ZXNpYW5Qcm9kdWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICBzaXplID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24ocCwgYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwICogYS5sZW5ndGg7XG4gICAgICAgICAgICB9LCAxKSxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpbSA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgdGhhdCA9IE9iamVjdC5jcmVhdGUoYXJncywge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoIXNpemUpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgZGltOiBkaW0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgZCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICg7IGQgPCBkaW07IGQrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGFyZ3VtZW50c1tkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gdGhpc1tkXS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tkXVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGQgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoOyBkIDwgZGltOyBkKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSB0aGlzW2RdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuICUgbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tkXVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIG4gLT0gaTtcbiAgICAgICAgICAgICAgICAgICAgbiAvPSBsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gc2l6ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLm50aCh0aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgLyogYmFzZU4gKi9cbiAgICB2YXIgYmFzZU4gPSBmdW5jdGlvbihhcnksIG5lbGVtLCBmdW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgYmFzZSA9IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgc2l6ZSA9IE1hdGgucG93KGJhc2UsIG5lbGVtKTtcbiAgICAgICAgdmFyIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVsZW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG4gJSBiYXNlO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnlbZF0pXG4gICAgICAgICAgICAgICAgICAgIG4gLT0gZDsgbiAvPSBiYXNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5udGgodGhpcy5pbmRleCsrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIChmdW4pID09PSAnZnVuY3Rpb24nKSA/IHRoYXQubWFwKGZ1bikgOiB0aGF0O1xuICAgIH07XG5cbiAgICAvKiBleHBvcnQgKi9cbiAgICB2YXIgQ29tYmluYXRvcmljcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgYWRkUHJvcGVydGllcyhDb21iaW5hdG9yaWNzLCB7XG4gICAgICAgIEM6IEMsXG4gICAgICAgIFA6IFAsXG4gICAgICAgIGZhY3RvcmlhbDogZmFjdG9yaWFsLFxuICAgICAgICBmYWN0b3JhZGljOiBmYWN0b3JhZGljLFxuICAgICAgICBjYXJ0ZXNpYW5Qcm9kdWN0OiBjYXJ0ZXNpYW5Qcm9kdWN0LFxuICAgICAgICBjb21iaW5hdGlvbjogY29tYmluYXRpb24sXG4gICAgICAgIGJpZ0NvbWJpbmF0aW9uOiBiaWdDb21iaW5hdGlvbixcbiAgICAgICAgcGVybXV0YXRpb246IHBlcm11dGF0aW9uLFxuICAgICAgICBwZXJtdXRhdGlvbkNvbWJpbmF0aW9uOiBwZXJtdXRhdGlvbkNvbWJpbmF0aW9uLFxuICAgICAgICBwb3dlcjogcG93ZXIsXG4gICAgICAgIGJhc2VOOiBiYXNlTixcbiAgICAgICAgVkVSU0lPTjogdmVyc2lvblxuICAgIH0pO1xuICAgIHJldHVybiBDb21iaW5hdG9yaWNzO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanMtY29tYmluYXRvcmljcy9jb21iaW5hdG9yaWNzLmpzXG4gKiogbW9kdWxlIGlkID0gMjI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJpbXBvcnQgTGF5ZXJBc3NpZ25tZW50IGZyb20gJ2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3VzZXItZGVmaW5lZCdcblxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gKGdyYXBoKSA9PiB7XG4gIHJldHVybiBuZXcgTGF5ZXJBc3NpZ25tZW50KClcbiAgICAuZigodSkgPT4ge1xuICAgICAgY29uc3QgZCA9IGdyYXBoLnZlcnRleCh1KVxuICAgICAgaWYgKGQuZHVtbXkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmdyYXBoLmluVmVydGljZXModSkubWFwKCh2KSA9PiBncmFwaC52ZXJ0ZXgodikubGF5ZXJPcmRlcikpICogMiArIDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkLmxheWVyT3JkZXIgKiAyXG4gICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGF5ZXJBc3NpZ25tZW50XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9sYXllci1hc3NpZ25tZW50LmpzXG4gKiovIiwiY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hY2Nlc3NvcicpXG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBVc2VyRGVmaW5lZCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgZjogKCkgPT4gMFxuICAgIH0pXG4gIH1cblxuICBjYWxsIChnKSB7XG4gICAgY29uc3QgZiA9IHByaXZhdGVzLmdldCh0aGlzKS5mXG4gICAgY29uc3QgbGF5ZXJzID0ge31cbiAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICBsYXllcnNbdV0gPSBmKHUpXG4gICAgfVxuICAgIHJldHVybiBsYXllcnNcbiAgfVxuXG4gIGYgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2YnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyRGVmaW5lZFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvdXNlci1kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gMjMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9