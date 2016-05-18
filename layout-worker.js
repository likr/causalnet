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
	
	var _graph = __webpack_require__(201);
	
	var _graph2 = _interopRequireDefault(_graph);
	
	var _copy = __webpack_require__(204);
	
	var _copy2 = _interopRequireDefault(_copy);
	
	var _sugiyama = __webpack_require__(205);
	
	var _sugiyama2 = _interopRequireDefault(_sugiyama);
	
	var _edgeConcentration = __webpack_require__(228);
	
	var _edgeConcentration2 = _interopRequireDefault(_edgeConcentration);
	
	var _rectangular = __webpack_require__(229);
	
	var _rectangular2 = _interopRequireDefault(_rectangular);
	
	var _newbery = __webpack_require__(230);
	
	var _newbery2 = _interopRequireDefault(_newbery);
	
	var _mbea = __webpack_require__(231);
	
	var _mbea2 = _interopRequireDefault(_mbea);
	
	var _quasiBicliqueMining = __webpack_require__(232);
	
	var _quasiBicliqueMining2 = _interopRequireDefault(_quasiBicliqueMining);
	
	var _completeQb = __webpack_require__(233);
	
	var _completeQb2 = _interopRequireDefault(_completeQb);
	
	var _biclusteringOptions = __webpack_require__(165);
	
	var _biclusteringOptions2 = _interopRequireDefault(_biclusteringOptions);
	
	var _layerAssignment = __webpack_require__(235);
	
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
	  if (biclusteringOption === _biclusteringOptions2.default.NONE.value) {
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
	    case _biclusteringOptions2.default.EDGE_CONCENTRATION.value:
	      transformer.method(_rectangular2.default);
	      break;
	    case _biclusteringOptions2.default.NEWBERY.value:
	      transformer.method(_newbery2.default);
	      break;
	    case _biclusteringOptions2.default.MBEA.value:
	      transformer.method(_mbea2.default);
	      break;
	    case _biclusteringOptions2.default.QUASI_BICLIQUES.value:
	      transformer.method(function (graph, h1, h2) {
	        return (0, _quasiBicliqueMining2.default)(graph, h1, h2, 0.5);
	      });
	      break;
	    case _biclusteringOptions2.default.COMPLETE_QUASI_BICLIQUES.value:
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

/***/ 165:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  EDGE_CONCENTRATION: { name: 'Edge Concentration', value: 'edge-concentration' },
	  NEWBERY: { name: 'Newbery', value: 'newbery' },
	  MBEA: { name: 'MBEA', value: 'mbea' },
	  QUASI_BICLIQUES: { name: 'Quasi-bicliques', value: 'quasi-bicliques' },
	  COMPLETE_QUASI_BICLIQUES: { name: 'Complete Quasi-bicliques', value: 'complete-quasi-bicliques' },
	  NONE: { name: 'None', value: 'none' }
	};

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(202)


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	const AbstractGraph = __webpack_require__(203)
	
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

/***/ 203:
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

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(202)
	
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

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(201)
	const accessor = __webpack_require__(206)
	const connectedComponents = __webpack_require__(207)
	const groupLayers = __webpack_require__(208)
	const cycleRemoval = __webpack_require__(209)
	const layerAssignment = __webpack_require__(212)
	const normalize = __webpack_require__(215)
	const crossingReduction = __webpack_require__(216)
	const positionAssignment = __webpack_require__(220)
	const bundleEdges = __webpack_require__(227)
	
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

/***/ 206:
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

/***/ 207:
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

/***/ 208:
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

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	const CycleRemoval = __webpack_require__(210)
	
	module.exports = {CycleRemoval}


/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	const cycleEdges = __webpack_require__(211)
	
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

/***/ 211:
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

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	const LongestPath = __webpack_require__(213)
	const QuadHeuristic = __webpack_require__(214)
	
	module.exports = {LongestPath, QuadHeuristic}


/***/ },

/***/ 213:
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

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(206)
	const LongestPath = __webpack_require__(213)
	
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

/***/ 215:
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
	          origWidth: d.width,
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

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	const LayerSweep = __webpack_require__(217)
	
	module.exports = {LayerSweep}


/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(206)
	const baryCenter = __webpack_require__(218)
	
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

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	const layerMatrix = __webpack_require__(219)
	
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

/***/ 219:
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

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	const Brandes = __webpack_require__(221)
	
	module.exports = {Brandes}


/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	const markConflicts = __webpack_require__(222)
	const verticalAlignment = __webpack_require__(224)
	const horizontalCompaction = __webpack_require__(226)
	
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

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	const layerEdges = __webpack_require__(223)
	
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

/***/ 223:
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

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	const median = __webpack_require__(225)
	
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

/***/ 225:
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

/***/ 226:
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

/***/ 227:
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
	  let sumPos = 0
	  let totalWidth = 0
	  for (const u of vertices) {
	    sumPos += graph.vertex(u)[ltor ? 'x' : 'y']
	    totalWidth += graph.vertex(u).origWidth || 0
	  }
	  let offset = sumPos / vertices.length - (totalWidth - 1) / 2
	  for (const u of vertices) {
	    graph.vertex(u)[ltor ? 'x' : 'y'] = offset
	    offset += graph.vertex(u).origWidth || 0
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

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(201)
	const accessor = __webpack_require__(206)
	const cycleRemoval = __webpack_require__(209)
	const layerAssignment = __webpack_require__(212)
	const groupLayers = __webpack_require__(208)
	const rectangular = __webpack_require__(229)
	
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

/***/ 229:
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

/***/ 230:
/***/ function(module, exports) {

	const intersection = (g, u1, u2, h2) => {
	  return {
	    source: new Set([u1, u2]),
	    target: new Set(h2.filter((v) => g.edge(u1, v) && g.edge(u2, v)))
	  }
	}
	
	const setminus = (a, b) => {
	  return new Set(Array.from(a.values()).filter((x) => !b.has(x)))
	}
	
	const union = (a, b) => {
	  const s = new Set(a)
	  for (const x of b) {
	    s.add(x)
	  }
	  return s
	}
	
	const setEquals = (a, b) => {
	  return a.size === b.size && setminus(a, b).size === 0
	}
	
	const newbery = (g, h1, h2) => {
	  const intersections = []
	  for (let i = 0; i < h1.length; ++i) {
	    const u1 = h1[i]
	    for (let j = i + 1; j < h1.length; ++j) {
	      const u2 = h1[j]
	      intersections.push(intersection(g, u1, u2, h2))
	    }
	  }
	  intersections.sort((i1, i2) => i1.target.size - i2.target.size)
	
	  const concentrations = []
	  for (const i of intersections) {
	    let stop = false
	
	    if (i.target.size < 2) {
	      continue
	    }
	
	    for (const c of concentrations) {
	      if (setEquals(i.target, c.target)) {
	        c.source = union(i.source, c.source)
	        stop = true
	        break
	      }
	    }
	
	    for (const c of concentrations) {
	      const iDash = setminus(i.target, c.target)
	      const cDash = setminus(c.target, i.target)
	      if (iDash.size > 0 && cDash.size === 0) {
	        concentrations.push({
	          source: i.source,
	          target: iDash
	        })
	        c.source = union(c.source, i.source)
	        stop = true
	        break
	      }
	    }
	
	    if (!stop) {
	      concentrations.push(i)
	    }
	  }
	
	  const merged = new Map(concentrations.map((_, i) => [i, false]))
	  for (let i = 0; i < concentrations.length; ++i) {
	    const c1 = concentrations[i]
	    if (merged.get(i)) {
	      continue
	    }
	    for (let j = i + 1; j < concentrations.length; ++j) {
	      const c2 = concentrations[j]
	      if (setEquals(c1.target, c2.target)) {
	        c1.source = union(c1.source, c2.source)
	        merged.set(j, true)
	      }
	    }
	  }
	
	  for (const c of concentrations) {
	    c.source = Array.from(c.source)
	    c.target = Array.from(c.target)
	  }
	
	  return concentrations
	    .filter((c, i) => !merged.get(i) && c.target.length > 1)
	}
	
	module.exports = newbery


/***/ },

/***/ 231:
/***/ function(module, exports) {

	const bicliqueFind = (graph, L, R, P, Q, cliques) => {
	  while (P.size !== 0) {
	    let x = Array.from(P)[0]
	    P.delete(x)
	    let _R = new Set([...R, x])
	    let _L = new Set(graph.inVertices(x).filter((u) => L.has(u)))
	    let complementL = new Set(Array.from(L).filter((u) => !_L.has(u)))
	    _L.forEach((l) => {
	      complementL.delete(l)
	    })
	    let C = new Set([x])
	    let _P = new Set()
	    let _Q = new Set()
	    let isMaximal = true
	    for (let v of Q) {
	      let N = new Set(graph.inVertices(v).filter((u) => _L.has(u)))
	      if (N.size === _L.size) {
	        isMaximal = false
	        break
	      } else if (N.size > 0) {
	        _Q = _Q.add(v)
	      }
	    }
	    if (isMaximal) {
	      for (let v of P) {
	        if (v !== x) {
	          let N = new Set(graph.inVertices(v).filter((u) => _L.has(u)))
	          if (N.size === _L.size) {
	            _R.add(v)
	            let S = new Set(graph.inVertices(v).filter((u) => complementL.has(u)))
	            if (S.size === 0) C.add(v)
	          } else if (N.size > 0) {
	            _P.add(v)
	          }
	        }
	      }
	      if (_P.size !== 0) {
	        bicliqueFind(graph, _L, _R, _P, _Q, cliques)
	      } else {
	        if (_L.size > 1 && _R.size > 1) {
	          cliques.push({
	            source: Array.from(_L),
	            target: Array.from(_R)
	          })
	        }
	      }
	    }
	    Q = new Set([...Q, ...C])
	    P = new Set(Array.from(P).filter((v) => !C.has(v)))
	  }
	}
	
	const mbea = (graph, h1, h2) => {
	  const U = graph.vertices().filter((u) => graph.outDegree(u))
	  const V = graph.vertices().filter((u) => graph.inDegree(u))
	  let cliques = []
	  bicliqueFind(graph, new Set(U), new Set(), new Set(V), new Set(), cliques)
	  return cliques
	}
	
	module.exports = mbea


/***/ },

/***/ 232:
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

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	const {combination} = __webpack_require__(234)
	
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

/***/ 234:
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

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _userDefined = __webpack_require__(236);
	
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

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(206)
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGVmMmJlZWZkY2NiYzZmOGQzNzA/YWJjOCIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9sYXlvdXQtd29ya2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaWNsdXN0ZXJpbmctb3B0aW9ucy5qcz84N2Y0Iiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL211dGFibGUtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvYWJzdHJhY3QtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2Nvbm5lY3RlZC1jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1yZW1vdmFsLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtZWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L2xvbmdlc3QtcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL25vcm1hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2xheWVyLXN3ZWVwLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9iYXJ5LWNlbnRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvbWFyay1jb25mbGljdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1lZGdlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvdmVydGljYWwtYWxpZ25tZW50LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbWVkaWFuLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9ob3Jpem9udGFsLWNvbXBhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvYnVuZGxlLWVkZ2VzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcmVjdGFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL25ld2JlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL21iZWEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vY29tcGxldGUtcWIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb21iaW5hdG9yaWNzL2NvbWJpbmF0b3JpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xheWVyLWFzc2lnbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC91c2VyLWRlZmluZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ2xCQTs7QUFFQSxtQkFBa0I7Ozs7Ozs7O0FDRmxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSyx5QkFBeUI7QUFDOUIsTUFBSyx3QkFBd0I7QUFDN0IsTUFBSyx3QkFBd0I7QUFDN0IsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDM0dBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCLFNBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixXQUFXO0FBQzFDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUM3Z0JEOzs7Ozs7OztBQUVBLEtBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFXO0FBQ2pDLFVBQU8sNEJBQ0osQ0FESSxDQUNGLFVBQUMsQ0FBRCxFQUFPO0FBQ1IsU0FBTSxJQUFJLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FBVjtBQUNBLFNBQUksRUFBRSxLQUFOLEVBQWE7QUFDWCxjQUFPLEtBQUssR0FBTCxnQ0FBWSxNQUFNLFVBQU4sQ0FBaUIsQ0FBakIsRUFBb0IsR0FBcEIsQ0FBd0IsVUFBQyxDQUFEO0FBQUEsZ0JBQU8sTUFBTSxNQUFOLENBQWEsQ0FBYixFQUFnQixVQUF2QjtBQUFBLFFBQXhCLENBQVosS0FBMEUsQ0FBMUUsR0FBOEUsQ0FBckY7QUFDRCxNQUZELE1BRU87QUFDTCxjQUFPLEVBQUUsVUFBRixHQUFlLENBQXRCO0FBQ0Q7QUFDRixJQVJJLENBQVA7QUFTRCxFQVZEOzttQkFZZSxlOzs7Ozs7O0FDZGY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJsYXlvdXQtd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZWYyYmVlZmRjY2JjNmY4ZDM3MFxuICoqLyIsIi8qIGVzbGludC1lbnYgd29ya2VyICovXG5cbmltcG9ydCBHcmFwaCBmcm9tICdlZ3JhcGgvZ3JhcGgnXG5pbXBvcnQgY29weSBmcm9tICdlZ3JhcGgvZ3JhcGgvY29weSdcbmltcG9ydCBMYXlvdXRlciBmcm9tICdlZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEnXG5pbXBvcnQgRWRnZUNvbmNlbnRyYXRpb25UcmFuc2Zvcm1lciBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uJ1xuaW1wb3J0IHJlY3Rhbmd1bGFyIGZyb20gJ2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcmVjdGFuZ3VsYXInXG5pbXBvcnQgbmV3YmVyeSBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL25ld2JlcnknXG5pbXBvcnQgbWJlYSBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL21iZWEnXG5pbXBvcnQgcXVhc2lCaWNsaXF1ZU1pbmluZyBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZydcbmltcG9ydCBjb21wbGV0ZVFCIGZyb20gJ2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vY29tcGxldGUtcWInXG5pbXBvcnQgYmljbHVzdGVyaW5nT3B0aW9ucyBmcm9tICcuLi9iaWNsdXN0ZXJpbmctb3B0aW9ucydcbmltcG9ydCBsYXllckFzc2lnbm1lbnQgZnJvbSAnLi4vdXRpbHMvbGF5ZXItYXNzaWdubWVudCdcblxuY29uc3QgY2FsY1NpemUgPSAodmVydGljZXMpID0+IHtcbiAgY29uc3QgbGVmdCA9IE1hdGgubWluKDAsIC4uLnZlcnRpY2VzLm1hcCgoe3gsIHdpZHRofSkgPT4geCAtIHdpZHRoIC8gMikpXG4gIGNvbnN0IHJpZ2h0ID0gTWF0aC5tYXgoMCwgLi4udmVydGljZXMubWFwKCh7eCwgd2lkdGh9KSA9PiB4ICsgd2lkdGggLyAyKSlcbiAgY29uc3QgdG9wID0gTWF0aC5taW4oMCwgLi4udmVydGljZXMubWFwKCh7eSwgaGVpZ2h0fSkgPT4geSAtIGhlaWdodCAvIDIpKVxuICBjb25zdCBib3R0b20gPSBNYXRoLm1heCgwLCAuLi52ZXJ0aWNlcy5tYXAoKHt5LCBoZWlnaHR9KSA9PiB5ICsgaGVpZ2h0IC8gMikpXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHJpZ2h0IC0gbGVmdCxcbiAgICBoZWlnaHQ6IGJvdHRvbSAtIHRvcFxuICB9XG59XG5cbmNvbnN0IGVkZ2VDb3VudCA9ICh2ZXJ0aWNlcywgbmVpZ2hib3JzKSA9PiB7XG4gIHJldHVybiBuZWlnaGJvcnMuZmlsdGVyKCh1KSA9PiB2ZXJ0aWNlcy5pbmRleE9mKHUpID49IDApLmxlbmd0aFxufVxuXG5jb25zdCB0cmFuc2Zvcm0gPSAoZ3JhcGgsIGJpY2x1c3RlcmluZ09wdGlvbikgPT4ge1xuICBpZiAoYmljbHVzdGVyaW5nT3B0aW9uID09PSBiaWNsdXN0ZXJpbmdPcHRpb25zLk5PTkUudmFsdWUpIHtcbiAgICByZXR1cm4gZ3JhcGhcbiAgfVxuICBjb25zdCB0cmFuc2Zvcm1lciA9IG5ldyBFZGdlQ29uY2VudHJhdGlvblRyYW5zZm9ybWVyKClcbiAgICAubGF5ZXJBc3NpZ25tZW50KGxheWVyQXNzaWdubWVudChncmFwaCkpXG4gICAgLmlkR2VuZXJhdG9yKChncmFwaCkgPT4gTWF0aC5tYXgoLi4uZ3JhcGgudmVydGljZXMoKSkgKyAxKVxuICAgIC5kdW1teSgoKSA9PiAoe1xuICAgICAgZHVtbXk6IHRydWUsXG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGNvbG9yOiAnIzg4OCdcbiAgICB9KSlcbiAgc3dpdGNoIChiaWNsdXN0ZXJpbmdPcHRpb24pIHtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuRURHRV9DT05DRU5UUkFUSU9OLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKHJlY3Rhbmd1bGFyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuTkVXQkVSWS52YWx1ZTpcbiAgICAgIHRyYW5zZm9ybWVyLm1ldGhvZChuZXdiZXJ5KVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuTUJFQS52YWx1ZTpcbiAgICAgIHRyYW5zZm9ybWVyLm1ldGhvZChtYmVhKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuUVVBU0lfQklDTElRVUVTLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKChncmFwaCwgaDEsIGgyKSA9PiBxdWFzaUJpY2xpcXVlTWluaW5nKGdyYXBoLCBoMSwgaDIsIDAuNSkpXG4gICAgICBicmVha1xuICAgIGNhc2UgYmljbHVzdGVyaW5nT3B0aW9ucy5DT01QTEVURV9RVUFTSV9CSUNMSVFVRVMudmFsdWU6XG4gICAgICB0cmFuc2Zvcm1lci5tZXRob2QoKGdyYXBoLCBoMSwgaDIpID0+IGNvbXBsZXRlUUIoZ3JhcGgsIGgxLCBoMiwgMSwgMykpXG4gICAgICBicmVha1xuICB9XG4gIHJldHVybiB0cmFuc2Zvcm1lci50cmFuc2Zvcm0oY29weShncmFwaCkpXG59XG5cbmNvbnN0IGxheW91dCA9IChncmFwaCwge2JpY2x1c3RlcmluZ09wdGlvbiwgbGF5ZXJNYXJnaW4sIHZlcnRleE1hcmdpbn0pID0+IHtcbiAgY29uc3QgdHJhbnNmb3JtZWRHcmFwaCA9IHRyYW5zZm9ybShncmFwaCwgYmljbHVzdGVyaW5nT3B0aW9uKVxuICBjb25zdCBsYXlvdXRlciA9IG5ldyBMYXlvdXRlcigpXG4gICAgLmxheWVyQXNzaWdubWVudChsYXllckFzc2lnbm1lbnQodHJhbnNmb3JtZWRHcmFwaCkpXG4gICAgLmxheWVyTWFyZ2luKGxheWVyTWFyZ2luKVxuICAgIC52ZXJ0ZXhXaWR0aCgoe2R9KSA9PiBkLmR1bW15ID8gMjUgOiAxNjApXG4gICAgLnZlcnRleEhlaWdodCgoe2R9KSA9PiBkLmR1bW15ID8gMTAgOiAyMClcbiAgICAudmVydGV4TWFyZ2luKHZlcnRleE1hcmdpbilcbiAgICAuZWRnZVdpZHRoKCgpID0+IDMpXG4gICAgLmVkZ2VNYXJnaW4oMylcbiAgICAuZWRnZUJ1bmRsaW5nKHRydWUpXG4gIGNvbnN0IHBvc2l0aW9ucyA9IGxheW91dGVyLmxheW91dCh0cmFuc2Zvcm1lZEdyYXBoKVxuXG4gIGNvbnN0IHZlcnRpY2VzID0gW11cbiAgZm9yIChjb25zdCB1IG9mIHRyYW5zZm9ybWVkR3JhcGgudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGQgPSB0cmFuc2Zvcm1lZEdyYXBoLnZlcnRleCh1KVxuICAgIGlmIChkLmR1bW15KSB7XG4gICAgICBkLlUgPSB0cmFuc2Zvcm1lZEdyYXBoLmluVmVydGljZXModSlcbiAgICAgIGQuTCA9IHRyYW5zZm9ybWVkR3JhcGgub3V0VmVydGljZXModSlcbiAgICB9XG4gICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcG9zaXRpb25zLnZlcnRpY2VzW3VdXG4gICAgdmVydGljZXMucHVzaCh7dSwgZCwgeCwgeSwgd2lkdGgsIGhlaWdodH0pXG4gIH1cblxuICBjb25zdCBlZGdlcyA9IFtdXG4gIGZvciAoY29uc3QgW3UsIHZdIG9mIHRyYW5zZm9ybWVkR3JhcGguZWRnZXMoKSkge1xuICAgIGlmIChwb3NpdGlvbnMuZWRnZXNbdV1bdl0pIHtcbiAgICAgIGNvbnN0IGQgPSB0cmFuc2Zvcm1lZEdyYXBoLmVkZ2UodSwgdilcbiAgICAgIGNvbnN0IHVkID0gdHJhbnNmb3JtZWRHcmFwaC52ZXJ0ZXgodSlcbiAgICAgIGNvbnN0IHZkID0gdHJhbnNmb3JtZWRHcmFwaC52ZXJ0ZXgodilcbiAgICAgIGNvbnN0IHtwb2ludHMsIHdpZHRoLCByZXZlcnNlZH0gPSBwb3NpdGlvbnMuZWRnZXNbdV1bdl1cbiAgICAgIHdoaWxlIChwb2ludHMubGVuZ3RoIDwgNikge1xuICAgICAgICBwb2ludHMucHVzaChwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdKVxuICAgICAgfVxuICAgICAgbGV0IG9wYWNpdHlcbiAgICAgIGlmICh1ZC5kdW1teSkge1xuICAgICAgICBvcGFjaXR5ID0gZWRnZUNvdW50KHVkLlUsIGdyYXBoLmluVmVydGljZXModikpIC8gdWQuVS5sZW5ndGhcbiAgICAgIH0gZWxzZSBpZiAodmQuZHVtbXkpIHtcbiAgICAgICAgb3BhY2l0eSA9IGVkZ2VDb3VudCh2ZC5MLCBncmFwaC5vdXRWZXJ0aWNlcyh1KSkgLyB2ZC5MLmxlbmd0aFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BhY2l0eSA9IDFcbiAgICAgIH1cbiAgICAgIGVkZ2VzLnB1c2goe3UsIHYsIHVkLCB2ZCwgZCwgcG9pbnRzLCByZXZlcnNlZCwgd2lkdGgsIG9wYWNpdHl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt2ZXJ0aWNlcywgZWRnZXN9LCBjYWxjU2l6ZSh2ZXJ0aWNlcykpXG59XG5cbm9ubWVzc2FnZSA9ICh7ZGF0YX0pID0+IHtcbiAgY29uc3Qge3ZlcnRpY2VzLCBlZGdlcywgb3B0aW9uc30gPSBkYXRhXG4gIGNvbnN0IGdyYXBoID0gbmV3IEdyYXBoKClcbiAgZm9yIChjb25zdCB7dSwgZH0gb2YgdmVydGljZXMpIHtcbiAgICBncmFwaC5hZGRWZXJ0ZXgodSwgZClcbiAgfVxuICBmb3IgKGNvbnN0IHt1LCB2LCBkfSBvZiBlZGdlcykge1xuICAgIGdyYXBoLmFkZEVkZ2UodSwgdiwgZClcbiAgfVxuXG4gIHBvc3RNZXNzYWdlKGxheW91dChncmFwaCwgb3B0aW9ucykpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy93b3JrZXJzL2xheW91dC13b3JrZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIEVER0VfQ09OQ0VOVFJBVElPTjoge25hbWU6ICdFZGdlIENvbmNlbnRyYXRpb24nLCB2YWx1ZTogJ2VkZ2UtY29uY2VudHJhdGlvbid9LFxuICBORVdCRVJZOiB7bmFtZTogJ05ld2JlcnknLCB2YWx1ZTogJ25ld2JlcnknfSxcbiAgTUJFQToge25hbWU6ICdNQkVBJywgdmFsdWU6ICdtYmVhJ30sXG4gIFFVQVNJX0JJQ0xJUVVFUzoge25hbWU6ICdRdWFzaS1iaWNsaXF1ZXMnLCB2YWx1ZTogJ3F1YXNpLWJpY2xpcXVlcyd9LFxuICBDT01QTEVURV9RVUFTSV9CSUNMSVFVRVM6IHtuYW1lOiAnQ29tcGxldGUgUXVhc2ktYmljbGlxdWVzJywgdmFsdWU6ICdjb21wbGV0ZS1xdWFzaS1iaWNsaXF1ZXMnfSxcbiAgTk9ORToge25hbWU6ICdOb25lJywgdmFsdWU6ICdub25lJ31cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpY2x1c3RlcmluZy1vcHRpb25zLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL211dGFibGUtZ3JhcGgnKVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2dyYXBoL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBBYnN0cmFjdEdyYXBoID0gcmVxdWlyZSgnLi9hYnN0cmFjdC1ncmFwaCcpXG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jb25zdCBwID0gKHNlbGYpID0+IHByaXZhdGVzLmdldChzZWxmKVxuXG5jbGFzcyBNdXRhYmxlR3JhcGggZXh0ZW5kcyBBYnN0cmFjdEdyYXBoIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgdmVydGljZXM6IG5ldyBNYXAoKSxcbiAgICAgIG51bVZlcnRpY2VzOiAwLFxuICAgICAgbnVtRWRnZXM6IDBcbiAgICB9KVxuICB9XG5cbiAgdmVydGV4ICh1KSB7XG4gICAgY29uc3QgdmVydGljZXMgPSBwKHRoaXMpLnZlcnRpY2VzXG4gICAgaWYgKHZlcnRpY2VzLmdldCh1KSkge1xuICAgICAgcmV0dXJuIHZlcnRpY2VzLmdldCh1KS5kYXRhXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBlZGdlICh1LCB2KSB7XG4gICAgY29uc3QgdmVydGljZXMgPSBwKHRoaXMpLnZlcnRpY2VzXG4gICAgaWYgKHZlcnRpY2VzLmdldCh1KSAmJiB2ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMuZ2V0KHYpKSB7XG4gICAgICByZXR1cm4gdmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLmdldCh2KVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdmVydGljZXMgKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHAodGhpcykudmVydGljZXMua2V5cygpKVxuICB9XG5cbiAgb3V0VmVydGljZXMgKHUpIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5rZXlzKCkpXG4gIH1cblxuICBpblZlcnRpY2VzICh1KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkuaW5WZXJ0aWNlcy5rZXlzKCkpXG4gIH1cblxuICBudW1WZXJ0aWNlcyAoKSB7XG4gICAgcmV0dXJuIHAodGhpcykubnVtVmVydGljZXNcbiAgfVxuXG4gIG51bUVkZ2VzICgpIHtcbiAgICByZXR1cm4gcCh0aGlzKS5udW1FZGdlc1xuICB9XG5cbiAgb3V0RGVncmVlICh1KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgcmV0dXJuIHAodGhpcykudmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLnNpemVcbiAgfVxuXG4gIGluRGVncmVlICh1KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgcmV0dXJuIHAodGhpcykudmVydGljZXMuZ2V0KHUpLmluVmVydGljZXMuc2l6ZVxuICB9XG5cbiAgYWRkVmVydGV4ICh1LCBvYmogPSB7fSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGVkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHAodGhpcykudmVydGljZXMuc2V0KHUsIHtcbiAgICAgIG91dFZlcnRpY2VzOiBuZXcgTWFwKCksXG4gICAgICBpblZlcnRpY2VzOiBuZXcgTWFwKCksXG4gICAgICBkYXRhOiBvYmpcbiAgICB9KVxuICAgIHAodGhpcykubnVtVmVydGljZXMrK1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRFZGdlICh1LCB2LCBvYmogPSB7fSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIGlmICh0aGlzLnZlcnRleCh2KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt2fWApXG4gICAgfVxuICAgIGlmICh0aGlzLmVkZ2UodSwgdikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlZCBlZGdlOiAoJHt1fSwgJHt2fSlgKVxuICAgIH1cbiAgICBwKHRoaXMpLm51bUVkZ2VzKytcbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5zZXQodiwgb2JqKVxuICAgIHAodGhpcykudmVydGljZXMuZ2V0KHYpLmluVmVydGljZXMuc2V0KHUsIG9iailcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4ICh1KSB7XG4gICAgZm9yIChjb25zdCB2IG9mIHRoaXMub3V0VmVydGljZXModSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlRWRnZSh1LCB2KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy5pblZlcnRpY2VzKHUpKSB7XG4gICAgICB0aGlzLnJlbW92ZUVkZ2UodiwgdSlcbiAgICB9XG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5kZWxldGUodSlcbiAgICBwKHRoaXMpLm51bVZlcnRpY2VzLS1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlRWRnZSAodSwgdikge1xuICAgIGlmICh0aGlzLmVkZ2UodSwgdikgPT09IG51bGwpIHtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGVkZ2U6ICgke3V9LCAke3Z9KWApXG4gICAgfVxuICAgIHAodGhpcykudmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLmRlbGV0ZSh2KVxuICAgIHAodGhpcykudmVydGljZXMuZ2V0KHYpLmluVmVydGljZXMuZGVsZXRlKHUpXG4gICAgcCh0aGlzKS5udW1FZGdlcy0tXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE11dGFibGVHcmFwaFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2dyYXBoL211dGFibGUtZ3JhcGguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNsYXNzIEFic3RyYWN0R3JhcGgge1xuICBlZGdlcyAoKSB7XG4gICAgY29uc3QgZWRnZXMgPSBbXVxuICAgIGZvciAoY29uc3QgdSBvZiB0aGlzLnZlcnRpY2VzKCkpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICAgIGVkZ2VzLnB1c2goW3UsIHZdKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWRnZXNcbiAgfVxuXG4gICogb3V0RWRnZXMgKHUpIHtcbiAgICBmb3IgKGxldCB2IG9mIHRoaXMub3V0VmVydGljZXModSkpIHtcbiAgICAgIHlpZWxkIFt1LCB2XVxuICAgIH1cbiAgfVxuXG4gICogaW5FZGdlcyAodSkge1xuICAgIGZvciAobGV0IHYgb2YgdGhpcy5pblZlcnRpY2VzKHUpKSB7XG4gICAgICB5aWVsZCBbdiwgdV1cbiAgICB9XG4gIH1cblxuICB0b0pTT04gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2ZXJ0aWNlczogdGhpcy52ZXJ0aWNlcygpLm1hcCgodSkgPT4gKHt1LCBkOiB0aGlzLnZlcnRleCh1KX0pKSxcbiAgICAgIGVkZ2VzOiB0aGlzLmVkZ2VzKCkubWFwKChbdSwgdl0pID0+ICh7dSwgdiwgZDogdGhpcy5lZGdlKHUsIHYpfSkpXG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RHcmFwaFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2dyYXBoL2Fic3RyYWN0LWdyYXBoLmpzXG4gKiogbW9kdWxlIGlkID0gMjAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBHcmFwaCA9IHJlcXVpcmUoJy4vbXV0YWJsZS1ncmFwaCcpXG5cbmNvbnN0IGNvcHkgPSAoZykgPT4ge1xuICBjb25zdCBuZXdHcmFwaCA9IG5ldyBHcmFwaCgpXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBuZXdHcmFwaC5hZGRWZXJ0ZXgodSwgZy52ZXJ0ZXgodSkpXG4gIH1cbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgbmV3R3JhcGguYWRkRWRnZSh1LCB2LCBnLmVkZ2UodSwgdikpXG4gIH1cbiAgcmV0dXJuIG5ld0dyYXBoXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2dyYXBoL2NvcHkuanNcbiAqKiBtb2R1bGUgaWQgPSAyMDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IEdyYXBoID0gcmVxdWlyZSgnLi4vLi4vZ3JhcGgnKVxuY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi91dGlscy9hY2Nlc3NvcicpXG5jb25zdCBjb25uZWN0ZWRDb21wb25lbnRzID0gcmVxdWlyZSgnLi9taXNjL2Nvbm5lY3RlZC1jb21wb25lbnRzJylcbmNvbnN0IGdyb3VwTGF5ZXJzID0gcmVxdWlyZSgnLi9taXNjL2dyb3VwLWxheWVycycpXG5jb25zdCBjeWNsZVJlbW92YWwgPSByZXF1aXJlKCcuL2N5Y2xlLXJlbW92YWwnKVxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gcmVxdWlyZSgnLi9sYXllci1hc3NpZ25tZW50JylcbmNvbnN0IG5vcm1hbGl6ZSA9IHJlcXVpcmUoJy4vbm9ybWFsaXplJylcbmNvbnN0IGNyb3NzaW5nUmVkdWN0aW9uID0gcmVxdWlyZSgnLi9jcm9zc2luZy1yZWR1Y3Rpb24nKVxuY29uc3QgcG9zaXRpb25Bc3NpZ25tZW50ID0gcmVxdWlyZSgnLi9wb3NpdGlvbi1hc3NpZ25tZW50JylcbmNvbnN0IGJ1bmRsZUVkZ2VzID0gcmVxdWlyZSgnLi9idW5kbGUtZWRnZXMnKVxuXG5jb25zdCBpbml0R3JhcGggPSAoZ09yaWcsIHtsdG9yLCB2ZXJ0ZXhXaWR0aCwgdmVydGV4SGVpZ2h0LCBlZGdlV2lkdGgsIGxheWVyTWFyZ2luLCB2ZXJ0ZXhNYXJnaW4sIHZlcnRleExlZnRNYXJnaW4sIHZlcnRleFJpZ2h0TWFyZ2luLCB2ZXJ0ZXhUb3BNYXJnaW4sIHZlcnRleEJvdHRvbU1hcmdpbn0pID0+IHtcbiAgY29uc3QgZyA9IG5ldyBHcmFwaCgpXG4gIGZvciAoY29uc3QgdSBvZiBnT3JpZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgZCA9IGdPcmlnLnZlcnRleCh1KVxuICAgIGNvbnN0IHcgPSB2ZXJ0ZXhXaWR0aCh7dSwgZH0pXG4gICAgY29uc3QgaCA9IHZlcnRleEhlaWdodCh7dSwgZH0pXG4gICAgY29uc3QgaG9yaXpvbnRhbE1hcmdpbiA9IHZlcnRleExlZnRNYXJnaW4oe3UsIGR9KSArIHZlcnRleFJpZ2h0TWFyZ2luKHt1LCBkfSlcbiAgICBjb25zdCB2ZXJ0aWNhbE1hcmdpbiA9IHZlcnRleFRvcE1hcmdpbih7dSwgZH0pICsgdmVydGV4Qm90dG9tTWFyZ2luKHt1LCBkfSlcbiAgICBnLmFkZFZlcnRleCh1LCB7XG4gICAgICB3aWR0aDogbHRvciA/IGggKyB2ZXJ0ZXhNYXJnaW4gKyB2ZXJ0aWNhbE1hcmdpbiA6IHcgKyBsYXllck1hcmdpbiArIGhvcml6b250YWxNYXJnaW4sXG4gICAgICBoZWlnaHQ6IGx0b3IgPyB3ICsgbGF5ZXJNYXJnaW4gKyBob3Jpem9udGFsTWFyZ2luIDogaCArIHZlcnRleE1hcmdpbiArIHZlcnRpY2FsTWFyZ2luLFxuICAgICAgb3JpZ1dpZHRoOiBsdG9yID8gaCA6IHcsXG4gICAgICBvcmlnSGVpZ2h0OiBsdG9yID8gdyA6IGhcbiAgICB9KVxuICB9XG4gIGZvciAoY29uc3QgW3UsIHZdIG9mIGdPcmlnLmVkZ2VzKCkpIHtcbiAgICBnLmFkZEVkZ2UodSwgdiwge1xuICAgICAgd2lkdGg6IGVkZ2VXaWR0aCh7XG4gICAgICAgIHUsXG4gICAgICAgIHYsXG4gICAgICAgIHVkOiBnT3JpZy52ZXJ0ZXgodSksXG4gICAgICAgIHZkOiBnT3JpZy52ZXJ0ZXgodiksXG4gICAgICAgIGQ6IGdPcmlnLmVkZ2UodSwgdilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICByZXR1cm4gZ1xufVxuXG5jb25zdCBzaW1wbGlmeSA9IChwb2ludHMsIGx0b3IpID0+IHtcbiAgbGV0IGluZGV4ID0gMVxuICB3aGlsZSAoaW5kZXggPCBwb2ludHMubGVuZ3RoIC0gMSkge1xuICAgIGNvbnN0IHgwID0gbHRvciA/IHBvaW50c1tpbmRleF1bMV0gOiBwb2ludHNbaW5kZXhdWzBdXG4gICAgY29uc3QgeDEgPSBsdG9yID8gcG9pbnRzW2luZGV4ICsgMV1bMV0gOiBwb2ludHNbaW5kZXggKyAxXVswXVxuICAgIGlmICh4MCA9PT0geDEpIHtcbiAgICAgIHBvaW50cy5zcGxpY2UoaW5kZXgsIDIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ICs9IDJcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcmV2ZXJzZWQgPSAoYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAoY29uc3QgeCBvZiBhcnIpIHtcbiAgICByZXN1bHQudW5zaGlmdCh4KVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgYnVpbGRSZXN1bHQgPSAoZywgbGF5ZXJzLCBsdG9yKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICB2ZXJ0aWNlczoge30sXG4gICAgZWRnZXM6IHt9XG4gIH1cbiAgY29uc3QgbGF5ZXJIZWlnaHRzID0gW11cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgcmVzdWx0LmVkZ2VzW3VdID0ge31cbiAgfVxuXG4gIGZvciAoY29uc3QgbGF5ZXIgb2YgbGF5ZXJzKSB7XG4gICAgbGV0IG1heEhlaWdodCA9IC1JbmZpbml0eVxuICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgbWF4SGVpZ2h0ID0gTWF0aC5tYXgobWF4SGVpZ2h0LCBnLnZlcnRleCh1KS5vcmlnSGVpZ2h0IHx8IDApXG4gICAgfVxuICAgIGxheWVySGVpZ2h0cy5wdXNoKG1heEhlaWdodClcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaV1cbiAgICBjb25zdCBsYXllckhlaWdodCA9IGxheWVySGVpZ2h0c1tpXVxuICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgICAgaWYgKCF1Tm9kZS5kdW1teSkge1xuICAgICAgICByZXN1bHQudmVydGljZXNbdV0gPSB7XG4gICAgICAgICAgeDogbHRvciA/IHVOb2RlLnkgOiB1Tm9kZS54LFxuICAgICAgICAgIHk6IGx0b3IgPyB1Tm9kZS54IDogdU5vZGUueSxcbiAgICAgICAgICB3aWR0aDogbHRvciA/IHVOb2RlLm9yaWdIZWlnaHQgOiB1Tm9kZS5vcmlnV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBsdG9yID8gdU5vZGUub3JpZ1dpZHRoIDogdU5vZGUub3JpZ0hlaWdodCxcbiAgICAgICAgICBsYXllcjogdU5vZGUubGF5ZXIsXG4gICAgICAgICAgb3JkZXI6IHVOb2RlLm9yZGVyXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICAgIGNvbnN0IHBvaW50cyA9IGx0b3JcbiAgICAgICAgICAgID8gW1t1Tm9kZS55ICsgKHVOb2RlLm9yaWdIZWlnaHQgfHwgMCkgLyAyLCB1Tm9kZS54XSwgW3VOb2RlLnkgKyBsYXllckhlaWdodCAvIDIsIHVOb2RlLnhdXVxuICAgICAgICAgICAgOiBbW3VOb2RlLngsIHVOb2RlLnkgKyAodU5vZGUub3JpZ0hlaWdodCB8fCAwKSAvIDJdLCBbdU5vZGUueCwgdU5vZGUueSArIGxheWVySGVpZ2h0IC8gMl1dXG4gICAgICAgICAgbGV0IHcgPSB2XG4gICAgICAgICAgbGV0IHdOb2RlID0gZy52ZXJ0ZXgodylcbiAgICAgICAgICBsZXQgaiA9IGkgKyAxXG4gICAgICAgICAgd2hpbGUgKHdOb2RlLmR1bW15KSB7XG4gICAgICAgICAgICBpZiAobHRvcikge1xuICAgICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSAtIGxheWVySGVpZ2h0c1tqXSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSArIGxheWVySGVpZ2h0c1tqXSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLngsIHdOb2RlLnkgLSBsYXllckhlaWdodHNbal0gLyAyXSlcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLngsIHdOb2RlLnkgKyBsYXllckhlaWdodHNbal0gLyAyXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHcgPSBnLm91dFZlcnRpY2VzKHcpWzBdXG4gICAgICAgICAgICB3Tm9kZSA9IGcudmVydGV4KHcpXG4gICAgICAgICAgICBqICs9IDFcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGx0b3IpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS55IC0gbGF5ZXJIZWlnaHRzW2pdIC8gMiwgd05vZGUueF0pXG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSAtICh3Tm9kZS5vcmlnSGVpZ2h0IHx8IDApIC8gMiwgd05vZGUueF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS54LCB3Tm9kZS55IC0gbGF5ZXJIZWlnaHRzW2pdIC8gMl0pXG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueCwgd05vZGUueSAtICh3Tm9kZS5vcmlnSGVpZ2h0IHx8IDApIC8gMl0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHNpbXBsaWZ5KHBvaW50cywgbHRvcilcbiAgICAgICAgICBpZiAoZy5lZGdlKHUsIHYpLnJldmVyc2VkKSB7XG4gICAgICAgICAgICByZXN1bHQuZWRnZXNbd11bdV0gPSB7XG4gICAgICAgICAgICAgIHBvaW50czogcmV2ZXJzZWQocG9pbnRzKSxcbiAgICAgICAgICAgICAgcmV2ZXJzZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHdpZHRoOiBnLmVkZ2UodSwgdikud2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LmVkZ2VzW3VdW3ddID0ge1xuICAgICAgICAgICAgICBwb2ludHM6IHBvaW50cyxcbiAgICAgICAgICAgICAgcmV2ZXJzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICB3aWR0aDogZy5lZGdlKHUsIHYpLndpZHRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgU3VnaXlhbWFMYXlvdXRlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgdmVydGV4V2lkdGg6ICh7ZH0pID0+IGQud2lkdGgsXG4gICAgICB2ZXJ0ZXhIZWlnaHQ6ICh7ZH0pID0+IGQuaGVpZ2h0LFxuICAgICAgZWRnZVdpZHRoOiAoKSA9PiAxLFxuICAgICAgbGF5ZXJNYXJnaW46IDEwLFxuICAgICAgdmVydGV4TWFyZ2luOiAxMCxcbiAgICAgIHZlcnRleExlZnRNYXJnaW46ICgpID0+IDAsXG4gICAgICB2ZXJ0ZXhSaWdodE1hcmdpbjogKCkgPT4gMCxcbiAgICAgIHZlcnRleFRvcE1hcmdpbjogKCkgPT4gMCxcbiAgICAgIHZlcnRleEJvdHRvbU1hcmdpbjogKCkgPT4gMCxcbiAgICAgIGVkZ2VNYXJnaW46IDEwLFxuICAgICAgbHRvcjogdHJ1ZSxcbiAgICAgIGVkZ2VCdW5kbGluZzogZmFsc2UsXG4gICAgICBjeWNsZVJlbW92YWw6IG5ldyBjeWNsZVJlbW92YWwuQ3ljbGVSZW1vdmFsKCksXG4gICAgICBsYXllckFzc2lnbm1lbnQ6IG5ldyBsYXllckFzc2lnbm1lbnQuUXVhZEhldXJpc3RpYygpLFxuICAgICAgY3Jvc3NpbmdSZWR1Y3Rpb246IG5ldyBjcm9zc2luZ1JlZHVjdGlvbi5MYXllclN3ZWVwKCksXG4gICAgICBwb3NpdGlvbkFzc2lnbm1lbnQ6IG5ldyBwb3NpdGlvbkFzc2lnbm1lbnQuQnJhbmRlcygpXG4gICAgfSlcbiAgfVxuXG4gIGxheW91dCAoZ09yaWcpIHtcbiAgICBjb25zdCBnID0gaW5pdEdyYXBoKGdPcmlnLCB7XG4gICAgICB2ZXJ0ZXhXaWR0aDogdGhpcy52ZXJ0ZXhXaWR0aCgpLFxuICAgICAgdmVydGV4SGVpZ2h0OiB0aGlzLnZlcnRleEhlaWdodCgpLFxuICAgICAgZWRnZVdpZHRoOiB0aGlzLmVkZ2VXaWR0aCgpLFxuICAgICAgbGF5ZXJNYXJnaW46IHRoaXMubGF5ZXJNYXJnaW4oKSxcbiAgICAgIHZlcnRleE1hcmdpbjogdGhpcy52ZXJ0ZXhNYXJnaW4oKSxcbiAgICAgIHZlcnRleExlZnRNYXJnaW46IHRoaXMudmVydGV4TGVmdE1hcmdpbigpLFxuICAgICAgdmVydGV4UmlnaHRNYXJnaW46IHRoaXMudmVydGV4UmlnaHRNYXJnaW4oKSxcbiAgICAgIHZlcnRleFRvcE1hcmdpbjogdGhpcy52ZXJ0ZXhUb3BNYXJnaW4oKSxcbiAgICAgIHZlcnRleEJvdHRvbU1hcmdpbjogdGhpcy52ZXJ0ZXhCb3R0b21NYXJnaW4oKSxcbiAgICAgIGx0b3I6IHRoaXMubHRvcigpXG4gICAgfSlcbiAgICB0aGlzLmN5Y2xlUmVtb3ZhbCgpLmNhbGwoZylcbiAgICBjb25zdCBsYXllck1hcCA9IHRoaXMubGF5ZXJBc3NpZ25tZW50KCkuY2FsbChnKVxuICAgIGNvbnN0IGxheWVycyA9IGdyb3VwTGF5ZXJzKGcsIGxheWVyTWFwLCB0cnVlKVxuICAgIG5vcm1hbGl6ZShnLCBsYXllcnMsIGxheWVyTWFwLCB0aGlzLmVkZ2VNYXJnaW4oKSwgdGhpcy5sYXllck1hcmdpbigpKVxuICAgIGNvbnN0IG5vcm1hbGl6ZWRMYXllcnMgPSBsYXllcnMubWFwKCgpID0+IFtdKVxuICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIGNvbm5lY3RlZENvbXBvbmVudHMoZykpIHtcbiAgICAgIGNvbnN0IHZlcnRpY2VzID0gbmV3IFNldChjb21wb25lbnQpXG4gICAgICBjb25zdCBjb21wb25lbnRMYXllcnMgPSBsYXllcnMubWFwKChoKSA9PiBoLmZpbHRlcigodSkgPT4gdmVydGljZXMuaGFzKHUpKSlcbiAgICAgIHRoaXMuY3Jvc3NpbmdSZWR1Y3Rpb24oKS5jYWxsKGcsIGNvbXBvbmVudExheWVycylcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvciAoY29uc3QgdSBvZiBjb21wb25lbnRMYXllcnNbaV0pIHtcbiAgICAgICAgICBub3JtYWxpemVkTGF5ZXJzW2ldLnB1c2godSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vcm1hbGl6ZWRMYXllcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IGxheWVyID0gbm9ybWFsaXplZExheWVyc1tpXVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsYXllci5sZW5ndGg7ICsraikge1xuICAgICAgICBjb25zdCB1ID0gbGF5ZXJbal1cbiAgICAgICAgZy52ZXJ0ZXgodSkubGF5ZXIgPSBpXG4gICAgICAgIGcudmVydGV4KHUpLm9yZGVyID0galxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uQXNzaWdubWVudCgpLmNhbGwoZywgbm9ybWFsaXplZExheWVycylcbiAgICBpZiAodGhpcy5lZGdlQnVuZGxpbmcoKSkge1xuICAgICAgYnVuZGxlRWRnZXMoZywgbm9ybWFsaXplZExheWVycywgdGhpcy5sdG9yKCkpXG4gICAgfVxuICAgIHJldHVybiBidWlsZFJlc3VsdChnLCBub3JtYWxpemVkTGF5ZXJzLCB0aGlzLmx0b3IoKSlcbiAgfVxuXG4gIHZlcnRleFdpZHRoICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhXaWR0aCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleEhlaWdodCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4SGVpZ2h0JywgYXJndW1lbnRzKVxuICB9XG5cbiAgZWRnZVdpZHRoICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdlZGdlV2lkdGgnLCBhcmd1bWVudHMpXG4gIH1cblxuICBsYXllck1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbGF5ZXJNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleE1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGVkZ2VNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2VkZ2VNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhMZWZ0TWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhMZWZ0TWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4UmlnaHRNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleFJpZ2h0TWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4VG9wTWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhUb3BNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhCb3R0b21NYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleEJvdHRvbU1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGx0b3IgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2x0b3InLCBhcmd1bWVudHMpXG4gIH1cblxuICBlZGdlQnVuZGxpbmcgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2VkZ2VCdW5kbGluZycsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGN5Y2xlUmVtb3ZhbCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnY3ljbGVSZW1vdmFsJywgYXJndW1lbnRzKVxuICB9XG5cbiAgbGF5ZXJBc3NpZ25tZW50ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdsYXllckFzc2lnbm1lbnQnLCBhcmd1bWVudHMpXG4gIH1cblxuICBjcm9zc2luZ1JlZHVjdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnY3Jvc3NpbmdSZWR1Y3Rpb24nLCBhcmd1bWVudHMpXG4gIH1cblxuICBwb3NpdGlvbkFzc2lnbm1lbnQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3Bvc2l0aW9uQXNzaWdubWVudCcsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1Z2l5YW1hTGF5b3V0ZXJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgYWNjZXNzb3IgPSAoc2VsZiwgcHJpdmF0ZXMsIGtleSwgYXJncykgPT4ge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gcHJpdmF0ZXMuZ2V0KHNlbGYpW2tleV1cbiAgfVxuICBwcml2YXRlcy5nZXQoc2VsZilba2V5XSA9IGFyZ3NbMF1cbiAgcmV0dXJuIHNlbGZcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY2Nlc3NvclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL3V0aWxzL2FjY2Vzc29yLmpzXG4gKiogbW9kdWxlIGlkID0gMjA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBtYXJrQ2hpbGRyZW4gPSAoZ3JhcGgsIHUsIGlkLCByZXN1bHQpID0+IHtcbiAgaWYgKHJlc3VsdC5oYXModSkpIHtcbiAgICBjb25zdCBwcmV2SWQgPSByZXN1bHQuZ2V0KHUpXG4gICAgaWYgKHByZXZJZCAhPT0gaWQpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBncmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgICAgIGlmIChyZXN1bHQuZ2V0KHYpID09PSBwcmV2SWQpIHtcbiAgICAgICAgICByZXN1bHQuc2V0KHYsIGlkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG4gIHJlc3VsdC5zZXQodSwgaWQpXG4gIGZvciAoY29uc3QgdiBvZiBncmFwaC5vdXRWZXJ0aWNlcyh1KSkge1xuICAgIG1hcmtDaGlsZHJlbihncmFwaCwgdiwgaWQsIHJlc3VsdClcbiAgfVxufVxuXG5jb25zdCBjb25uZWN0ZWRDb21wb25lbnRzID0gKGdyYXBoKSA9PiB7XG4gIGNvbnN0IGNvbXBvbmVudElkTWFwID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBncmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGdyYXBoLmluRGVncmVlKHUpID09PSAwKSB7XG4gICAgICBtYXJrQ2hpbGRyZW4oZ3JhcGgsIHUsIHUsIGNvbXBvbmVudElkTWFwKVxuICAgIH1cbiAgfVxuICBjb25zdCBjb21wb25lbnRJZHMgPSBuZXcgU2V0KGNvbXBvbmVudElkTWFwLnZhbHVlcygpKVxuICByZXR1cm4gQXJyYXkuZnJvbShjb21wb25lbnRJZHMpLm1hcCgodSkgPT4ge1xuICAgIHJldHVybiBncmFwaC52ZXJ0aWNlcygpLmZpbHRlcigodikgPT4gY29tcG9uZW50SWRNYXAuZ2V0KHYpID09PSB1KVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbm5lY3RlZENvbXBvbmVudHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2Nvbm5lY3RlZC1jb21wb25lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMjA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBncm91cExheWVycyA9IChnLCBsYXllcnMsIGFsbG93RW1wdHlMYXllcikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbdV1cbiAgICBpZiAocmVzdWx0W2xheWVyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHRbbGF5ZXJdID0gW11cbiAgICB9XG4gICAgcmVzdWx0W2xheWVyXS5wdXNoKHUpXG4gIH1cbiAgaWYgKGFsbG93RW1wdHlMYXllcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAocmVzdWx0W2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW11cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXN1bHQuZmlsdGVyKChoKSA9PiBoICE9PSB1bmRlZmluZWQpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBncm91cExheWVyc1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzLmpzXG4gKiogbW9kdWxlIGlkID0gMjA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBDeWNsZVJlbW92YWwgPSByZXF1aXJlKCcuL2N5Y2xlLXJlbW92YWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtDeWNsZVJlbW92YWx9XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgY3ljbGVFZGdlcyA9IHJlcXVpcmUoJy4vY3ljbGUtZWRnZXMnKVxuXG5jb25zdCBjeWNsZVJlbW92YWwgPSAoZykgPT4ge1xuICBmb3IgKGNvbnN0IFt1LCB2XSBvZiBjeWNsZUVkZ2VzKGcpKSB7XG4gICAgY29uc3Qgb2JqID0gZy5lZGdlKHUsIHYpXG4gICAgZy5yZW1vdmVFZGdlKHUsIHYpXG4gICAgaWYgKHUgPT09IHYpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGNvbnN0IGVkZ2UgPSBnLmVkZ2UodiwgdSlcbiAgICBpZiAoZWRnZSkge1xuICAgICAgZWRnZS5tdWx0aXBsZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgZy5hZGRFZGdlKHYsIHUsIE9iamVjdC5hc3NpZ24oe3JldmVyc2VkOiB0cnVlfSwgb2JqKSlcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgQ3ljbGVSZW1vdmFsIHtcbiAgY2FsbCAoZykge1xuICAgIGN5Y2xlUmVtb3ZhbChnKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ3ljbGVSZW1vdmFsXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1yZW1vdmFsLmpzXG4gKiogbW9kdWxlIGlkID0gMjEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBjeWNsZUVkZ2VzID0gZnVuY3Rpb24gKGcpIHtcbiAgY29uc3Qgc3RhY2sgPSB7fVxuICBjb25zdCB2aXNpdGVkID0ge31cbiAgY29uc3QgcmVzdWx0ID0gW11cblxuICBjb25zdCBkZnMgPSAodSkgPT4ge1xuICAgIGlmICh2aXNpdGVkW3VdKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmlzaXRlZFt1XSA9IHRydWVcbiAgICBzdGFja1t1XSA9IHRydWVcbiAgICBmb3IgKGxldCB2IG9mIGcub3V0VmVydGljZXModSkpIHtcbiAgICAgIGlmIChzdGFja1t2XSkge1xuICAgICAgICByZXN1bHQucHVzaChbdSwgdl0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZnModilcbiAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlIHN0YWNrW3VdXG4gIH1cblxuICBmb3IgKGxldCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGRmcyh1KVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGN5Y2xlRWRnZXNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jeWNsZS1yZW1vdmFsL2N5Y2xlLWVkZ2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMjExXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBMb25nZXN0UGF0aCA9IHJlcXVpcmUoJy4vbG9uZ2VzdC1wYXRoJylcbmNvbnN0IFF1YWRIZXVyaXN0aWMgPSByZXF1aXJlKCcuL3F1YWQtaGV1cmlzdGljJylcblxubW9kdWxlLmV4cG9ydHMgPSB7TG9uZ2VzdFBhdGgsIFF1YWRIZXVyaXN0aWN9XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbG9uZ2VzdFBhdGggPSAoZykgPT4ge1xuICBjb25zdCB2aXNpdGVkID0ge31cbiAgY29uc3QgbGF5ZXJzID0ge31cblxuICBjb25zdCBkZnMgPSAodSkgPT4ge1xuICAgIGlmICh2aXNpdGVkW3VdKSB7XG4gICAgICByZXR1cm4gbGF5ZXJzW3VdXG4gICAgfVxuICAgIHZpc2l0ZWRbdV0gPSB0cnVlXG5cbiAgICBsZXQgbGF5ZXIgPSBJbmZpbml0eVxuICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBsYXllciA9IE1hdGgubWluKGxheWVyLCBkZnModikgLSAxKVxuICAgIH1cbiAgICBpZiAobGF5ZXIgPT09IEluZmluaXR5KSB7XG4gICAgICBsYXllciA9IDBcbiAgICB9XG4gICAgbGF5ZXJzW3VdID0gbGF5ZXJcbiAgICByZXR1cm4gbGF5ZXJcbiAgfVxuXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBpZiAoZy5pbkRlZ3JlZSh1KSA9PT0gMCkge1xuICAgICAgZGZzKHUpXG4gICAgfVxuICB9XG5cbiAgbGV0IG1pbkxheWVyID0gSW5maW5pdHlcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIG1pbkxheWVyID0gTWF0aC5taW4obWluTGF5ZXIsIGxheWVyc1t1XSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgbGF5ZXJzW3VdIC09IG1pbkxheWVyXG4gIH1cblxuICByZXR1cm4gbGF5ZXJzXG59XG5cbmNsYXNzIExvbmdlc3RQYXRoIHtcbiAgY2FsbCAoZykge1xuICAgIHJldHVybiBsb25nZXN0UGF0aChnKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9uZ2VzdFBhdGhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L2xvbmdlc3QtcGF0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hY2Nlc3NvcicpXG5jb25zdCBMb25nZXN0UGF0aCA9IHJlcXVpcmUoJy4vbG9uZ2VzdC1wYXRoJylcblxuY29uc3QgcXVhZEhldXJpc3RpYyA9IChnLCByZXBlYXQpID0+IHtcbiAgY29uc3QgbGF5ZXJzID0gbmV3IExvbmdlc3RQYXRoKCkuY2FsbChnKVxuXG4gIGxldCBtaW5MYXllciA9IEluZmluaXR5XG4gIGxldCBtYXhMYXllciA9IC1JbmZpbml0eVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgbWluTGF5ZXIgPSBNYXRoLm1pbihtaW5MYXllciwgbGF5ZXJzW3VdKVxuICAgIG1heExheWVyID0gTWF0aC5tYXgobWF4TGF5ZXIsIGxheWVyc1t1XSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGcuaW5EZWdyZWUodSkgPT09IDApIHtcbiAgICAgIGxheWVyc1t1XSA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgbGF5ZXJzW3VdIC09IG1pbkxheWVyXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdmVydGljZXMgPSBnLnZlcnRpY2VzKCkuZmlsdGVyKHUgPT4gZy5pbkRlZ3JlZSh1KSA+IDAgJiYgZy5vdXREZWdyZWUodSkgPiAwKVxuICBjb25zdCB3ZWlnaHRzID0ge31cbiAgY29uc3QgY21wID0gKHUsIHYpID0+IHdlaWdodHNbdl0gLSB3ZWlnaHRzW3VdXG4gIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgcmVwZWF0OyArK2xvb3ApIHtcbiAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICB3ZWlnaHRzW3VdID0gMFxuICAgIH1cbiAgICBmb3IgKGNvbnN0IFt1LCB2XSBvZiBnLmVkZ2VzKCkpIHtcbiAgICAgIGNvbnN0IGwgPSBsYXllcnNbdl0gLSBsYXllcnNbdV1cbiAgICAgIHdlaWdodHNbdV0gKz0gbFxuICAgICAgd2VpZ2h0c1t2XSArPSBsXG4gICAgfVxuXG4gICAgdmVydGljZXMuc29ydChjbXApXG4gICAgZm9yIChjb25zdCB1IG9mIHZlcnRpY2VzKSB7XG4gICAgICBsZXQgc3VtID0gMFxuICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgbGV0IGxlZnRNYXggPSAtSW5maW5pdHlcbiAgICAgIGxldCByaWdodE1pbiA9IEluZmluaXR5XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZy5pblZlcnRpY2VzKHUpKSB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW3ZdXG4gICAgICAgIGxlZnRNYXggPSBNYXRoLm1heChsZWZ0TWF4LCBsYXllcilcbiAgICAgICAgc3VtICs9IGxheWVyXG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW3ZdXG4gICAgICAgIHJpZ2h0TWluID0gTWF0aC5taW4ocmlnaHRNaW4sIGxheWVyKVxuICAgICAgICBzdW0gKz0gbGF5ZXJcbiAgICAgICAgY291bnQgKz0gMVxuICAgICAgfVxuICAgICAgbGF5ZXJzW3VdID0gTWF0aC5taW4ocmlnaHRNaW4gLSAxLCBNYXRoLm1heChsZWZ0TWF4ICsgMSwgTWF0aC5yb3VuZChzdW0gLyBjb3VudCkpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsYXllcnNcbn1cblxuY29uc3QgcHJpdmF0ZXMgPSBuZXcgV2Vha01hcCgpXG5cbmNsYXNzIFF1YWRIZXVyaXN0aWMge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIHJlcGVhdDogNFxuICAgIH0pXG4gIH1cblxuICBjYWxsIChnKSB7XG4gICAgcmV0dXJuIHF1YWRIZXVyaXN0aWMoZywgdGhpcy5yZXBlYXQoKSlcbiAgfVxuXG4gIHJlcGVhdCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAncmVwZWF0JywgYXJndW1lbnRzKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUXVhZEhldXJpc3RpY1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvcXVhZC1oZXVyaXN0aWMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IG5vcm1hbGl6ZSA9IChnLCBsYXllcnMsIGxheWVyTWFwLCBlZGdlTWFyZ2luLCBsYXllck1hcmdpbikgPT4ge1xuICB2YXIgaSwgdzEsIHcyXG4gIGZvciAobGV0IFt1LCB2XSBvZiBnLmVkZ2VzKCkpIHtcbiAgICBjb25zdCBkID0gZy5lZGdlKHUsIHYpXG4gICAgaWYgKGxheWVyTWFwW3ZdIC0gbGF5ZXJNYXBbdV0gPiAxKSB7XG4gICAgICB3MSA9IHVcbiAgICAgIGZvciAoaSA9IGxheWVyTWFwW3VdICsgMTsgaSA8IGxheWVyTWFwW3ZdOyArK2kpIHtcbiAgICAgICAgdzIgPSBTeW1ib2woKVxuICAgICAgICBnLmFkZFZlcnRleCh3Miwge1xuICAgICAgICAgIHUsXG4gICAgICAgICAgdixcbiAgICAgICAgICBkdW1teTogdHJ1ZSxcbiAgICAgICAgICB3aWR0aDogZC53aWR0aCArIGVkZ2VNYXJnaW4sXG4gICAgICAgICAgb3JpZ1dpZHRoOiBkLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogbGF5ZXJNYXJnaW4sXG4gICAgICAgICAgb3JpZ0hlaWdodDogMCxcbiAgICAgICAgICBsYXllcjogaVxuICAgICAgICB9KVxuICAgICAgICBnLmFkZEVkZ2UodzEsIHcyLCB7XG4gICAgICAgICAgdSxcbiAgICAgICAgICB2LFxuICAgICAgICAgIGR1bW15OiB0cnVlLFxuICAgICAgICAgIHJldmVyc2VkOiBnLmVkZ2UodSwgdikucmV2ZXJzZWQsXG4gICAgICAgICAgd2lkdGg6IGQud2lkdGhcbiAgICAgICAgfSlcbiAgICAgICAgbGF5ZXJzW2ldLnB1c2godzIpXG4gICAgICAgIHcxID0gdzJcbiAgICAgIH1cbiAgICAgIGcuYWRkRWRnZSh3MSwgdiwge1xuICAgICAgICB1LFxuICAgICAgICB2LFxuICAgICAgICBkdW1teTogdHJ1ZSxcbiAgICAgICAgcmV2ZXJzZWQ6IGcuZWRnZSh1LCB2KS5yZXZlcnNlZCxcbiAgICAgICAgd2lkdGg6IGQud2lkdGhcbiAgICAgIH0pXG4gICAgICBnLnJlbW92ZUVkZ2UodSwgdilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9ub3JtYWxpemUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IExheWVyU3dlZXAgPSByZXF1aXJlKCcuL2xheWVyLXN3ZWVwJylcblxubW9kdWxlLmV4cG9ydHMgPSB7TGF5ZXJTd2VlcH1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvYWNjZXNzb3InKVxuY29uc3QgYmFyeUNlbnRlciA9IHJlcXVpcmUoJy4vYmFyeS1jZW50ZXInKVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgTGF5ZXJTd2VlcCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgcmVwZWF0OiA4LFxuICAgICAgbWV0aG9kOiBiYXJ5Q2VudGVyXG4gICAgfSlcbiAgfVxuXG4gIGNhbGwgKGcsIGxheWVycykge1xuICAgIGNvbnN0IG4gPSBsYXllcnMubGVuZ3RoXG4gICAgY29uc3QgcmVwZWF0ID0gdGhpcy5yZXBlYXQoKVxuICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kKClcblxuICAgIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgcmVwZWF0OyArK2xvb3ApIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIG1ldGhvZChnLCBsYXllcnNbaSAtIDFdLCBsYXllcnNbaV0pXG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gbiAtIDE7IGkgPiAwOyAtLWkpIHtcbiAgICAgICAgbWV0aG9kKGcsIGxheWVyc1tpIC0gMV0sIGxheWVyc1tpXSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXBlYXQgKGFyZykge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3JlcGVhdCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIG1ldGhvZCAoYXJnKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbWV0aG9kJywgYXJndW1lbnRzKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGF5ZXJTd2VlcFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9sYXllci1zd2VlcC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbGF5ZXJNYXRyaXggPSByZXF1aXJlKCcuLi9taXNjL2xheWVyLW1hdHJpeCcpXG5cbmNvbnN0IGJhcnlDZW50ZXIgPSAoZywgaDEsIGgyLCBpbnZlcnNlID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY2VudGVycyA9IHt9XG4gIGNvbnN0IG4gPSBoMS5sZW5ndGhcbiAgY29uc3QgbSA9IGgyLmxlbmd0aFxuICBjb25zdCBhID0gbGF5ZXJNYXRyaXgoZywgaDEsIGgyKVxuICBjb25zdCBjbXAgPSAodSwgdikgPT4gY2VudGVyc1t1XSAtIGNlbnRlcnNbdl1cbiAgaWYgKGludmVyc2UpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgbGV0IHN1bSA9IDBcbiAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgIGNvbnN0IGFpaiA9IGFbaSAqIG0gKyBqXVxuICAgICAgICBjb3VudCArPSBhaWpcbiAgICAgICAgc3VtICs9IGogKiBhaWpcbiAgICAgIH1cbiAgICAgIGNlbnRlcnNbaDFbaV1dID0gc3VtIC8gY291bnRcbiAgICB9XG4gICAgaDEuc29ydChjbXApXG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICAgIGxldCBzdW0gPSAwXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBjb25zdCBhaWogPSBhW2kgKiBtICsgal1cbiAgICAgICAgY291bnQgKz0gYWlqXG4gICAgICAgIHN1bSArPSBpICogYWlqXG4gICAgICB9XG4gICAgICBjZW50ZXJzW2gyW2pdXSA9IHN1bSAvIGNvdW50XG4gICAgfVxuICAgIGgyLnNvcnQoY21wKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFyeUNlbnRlclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9iYXJ5LWNlbnRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbGF5ZXJNYXRyaXggPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IG4gPSBoMS5sZW5ndGhcbiAgY29uc3QgbSA9IGgyLmxlbmd0aFxuICBjb25zdCBvcmRlcnMgPSB7fVxuICBjb25zdCBhID0gbmV3IEludDhBcnJheShuICogbSlcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG07ICsraSkge1xuICAgIG9yZGVyc1toMltpXV0gPSBpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICBjb25zdCB1ID0gaDFbaV1cbiAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgYVtpICogbSArIG9yZGVyc1t2XV0gPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBhXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGF5ZXJNYXRyaXhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLW1hdHJpeC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQnJhbmRlcyA9IHJlcXVpcmUoJy4vYnJhbmRlcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge0JyYW5kZXN9XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWFya0NvbmZsaWN0cyA9IHJlcXVpcmUoJy4vbWFyay1jb25mbGljdHMnKVxuY29uc3QgdmVydGljYWxBbGlnbm1lbnQgPSByZXF1aXJlKCcuL3ZlcnRpY2FsLWFsaWdubWVudCcpXG5jb25zdCBob3Jpem9udGFsQ29tcGFjdGlvbiA9IHJlcXVpcmUoJy4vaG9yaXpvbnRhbC1jb21wYWN0aW9uJylcblxuY29uc3Qgc29ydCA9ICh4cykgPT4ge1xuICB4cy5zb3J0KCh4MSwgeDIpID0+IHgxIC0geDIpXG59XG5cbmNvbnN0IGJyYW5kZXMgPSAoZywgbGF5ZXJzKSA9PiB7XG4gIG1hcmtDb25mbGljdHMoZywgbGF5ZXJzKVxuXG4gIGNvbnN0IHhzID0ge31cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIHhzW3VdID0gW11cbiAgfVxuICBjb25zdCBkaXJlY3Rpb25zID0gW1xuICAgIHtydG9sOiBmYWxzZSwgYnRvdDogZmFsc2V9LFxuICAgIHtydG9sOiB0cnVlLCBidG90OiBmYWxzZX0sXG4gICAge3J0b2w6IGZhbHNlLCBidG90OiB0cnVlfSxcbiAgICB7cnRvbDogdHJ1ZSwgYnRvdDogdHJ1ZX1cbiAgXVxuXG4gIGxldCBtaW5XaWR0aExlZnQgPSAtSW5maW5pdHlcbiAgbGV0IG1pbldpZHRoUmlnaHQgPSBJbmZpbml0eVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2ldXG4gICAgdmVydGljYWxBbGlnbm1lbnQoZywgbGF5ZXJzLCBkaXJlY3Rpb24pXG4gICAgaG9yaXpvbnRhbENvbXBhY3Rpb24oZywgbGF5ZXJzLCBkaXJlY3Rpb24pXG4gICAgbGV0IG1pblggPSBJbmZpbml0eVxuICAgIGxldCBtYXhYID0gLUluZmluaXR5XG4gICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi5ydG9sKSB7XG4gICAgICAgIGcudmVydGV4KHUpLnggPSAtZy52ZXJ0ZXgodSkueFxuICAgICAgfVxuICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIGcudmVydGV4KHUpLngpXG4gICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgZy52ZXJ0ZXgodSkueClcbiAgICB9XG4gICAgaWYgKG1heFggLSBtaW5YIDwgbWluV2lkdGhSaWdodCAtIG1pbldpZHRoTGVmdCkge1xuICAgICAgbWluV2lkdGhMZWZ0ID0gbWluWFxuICAgICAgbWluV2lkdGhSaWdodCA9IG1heFhcbiAgICB9XG4gICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgeHNbdV0ucHVzaChnLnZlcnRleCh1KS54KVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2ldXG4gICAgaWYgKGRpcmVjdGlvbi5ydG9sKSB7XG4gICAgICBsZXQgbWF4WCA9IC1JbmZpbml0eVxuICAgICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgeHNbdV1baV0pXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICAgIHhzW3VdW2ldICs9IG1pbldpZHRoUmlnaHQgLSBtYXhYXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtaW5YID0gSW5maW5pdHlcbiAgICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIHhzW3VdW2ldKVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgICB4c1t1XVtpXSArPSBtaW5XaWR0aExlZnQgLSBtaW5YXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBzb3J0KHhzW3VdKVxuICAgIGcudmVydGV4KHUpLnggPSAoeHNbdV1bMV0gKyB4c1t1XVsyXSkgLyAyXG4gIH1cbn1cblxuY29uc3Qgbm9ybWFsaXplID0gKGcpID0+IHtcbiAgbGV0IHhNaW4gPSBJbmZpbml0eVxuICBsZXQgeU1pbiA9IEluZmluaXR5XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHVOb2RlLnggLSB1Tm9kZS5vcmlnV2lkdGggLyAyKVxuICAgIHlNaW4gPSBNYXRoLm1pbih5TWluLCB1Tm9kZS55IC0gdU5vZGUub3JpZ0hlaWdodCAvIDIpXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICB1Tm9kZS54IC09IHhNaW5cbiAgICB1Tm9kZS55IC09IHlNaW5cbiAgfVxufVxuXG5jbGFzcyBCcmFuZGVzIHtcbiAgY2FsbCAoZywgbGF5ZXJzKSB7XG4gICAgYnJhbmRlcyhnLCBsYXllcnMpXG5cbiAgICBsZXQgeU9mZnNldCA9IDBcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xuICAgICAgbGV0IG1heEhlaWdodCA9IDBcbiAgICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgICBtYXhIZWlnaHQgPSBNYXRoLm1heChtYXhIZWlnaHQsIGcudmVydGV4KHUpLmhlaWdodClcbiAgICAgIH1cbiAgICAgIHlPZmZzZXQgKz0gbWF4SGVpZ2h0IC8gMlxuICAgICAgZm9yIChjb25zdCB1IG9mIGxheWVyKSB7XG4gICAgICAgIGcudmVydGV4KHUpLnkgPSB5T2Zmc2V0XG4gICAgICB9XG4gICAgICB5T2Zmc2V0ICs9IG1heEhlaWdodCAvIDJcbiAgICB9XG5cbiAgICBub3JtYWxpemUoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyYW5kZXNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyRWRnZXMgPSByZXF1aXJlKCcuLi8uLi9taXNjL2xheWVyLWVkZ2VzJylcblxuY29uc3Qgc3BsaXQgPSAoeCwgZikgPT4ge1xuICBjb25zdCB5ID0gW11cbiAgY29uc3QgeiA9IFtdXG4gIGZvciAoY29uc3QgeGkgb2YgeCkge1xuICAgIGlmIChmKHhpKSkge1xuICAgICAgeS5wdXNoKHhpKVxuICAgIH0gZWxzZSB7XG4gICAgICB6LnB1c2goeGkpXG4gICAgfVxuICB9XG4gIHJldHVybiBbeSwgel1cbn1cblxuY29uc3QgbWFya0NvbmZsaWN0cyA9IChnLCBsYXllcnMpID0+IHtcbiAgY29uc3QgaCA9IGxheWVycy5sZW5ndGggLSAyXG4gIGNvbnN0IGR1bW15ID0ge31cbiAgY29uc3Qgb3JkZXIgPSB7fVxuICBjb25zdCBpc0lubmVyID0gKFt1LCB2XSkgPT4gZHVtbXlbdV0gJiYgZHVtbXlbdl1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgZCA9IGcudmVydGV4KHUpXG4gICAgZHVtbXlbdV0gPSAhIWQuZHVtbXlcbiAgICBvcmRlclt1XSA9IGQub3JkZXJcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgaDsgKytpKSB7XG4gICAgY29uc3QgaDEgPSBsYXllcnNbaV1cbiAgICBjb25zdCBoMiA9IGxheWVyc1tpICsgMV1cbiAgICBjb25zdCBlZGdlcyA9IGxheWVyRWRnZXMoZywgaDEsIGgyKVxuICAgIGNvbnN0IFtpbm5lclNlZ21lbnRzLCBvdXRlclNlZ21lbnRzXSA9IHNwbGl0KGVkZ2VzLCBpc0lubmVyKVxuICAgIGZvciAoY29uc3QgW3UxLCB2MV0gb2YgaW5uZXJTZWdtZW50cykge1xuICAgICAgZm9yIChjb25zdCBbdTIsIHYyXSBvZiBvdXRlclNlZ21lbnRzKSB7XG4gICAgICAgIGlmICgob3JkZXJbdTFdIDwgb3JkZXJbdTJdICYmIG9yZGVyW3YxXSA+IG9yZGVyW3YyXSkgfHwgKG9yZGVyW3UxXSA+IG9yZGVyW3UyXSAmJiBvcmRlclt2MV0gPCBvcmRlclt2Ml0pKSB7XG4gICAgICAgICAgZy5lZGdlKHUyLCB2MikudHlwZTFDb25mbGljdCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcmtDb25mbGljdHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvbWFyay1jb25mbGljdHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyRWRnZXMgPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAoY29uc3QgdiBvZiBoMikge1xuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModikpIHtcbiAgICAgIHJlc3VsdC5wdXNoKFt1LCB2XSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxheWVyRWRnZXNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLWVkZ2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMjIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBtZWRpYW4gPSByZXF1aXJlKCcuLi8uLi9taXNjL21lZGlhbicpXG5cbmNvbnN0IHZlcnRpY2FsQWxpZ25tZW50ID0gKGcsIGxheWVycywgeyBydG9sID0gZmFsc2UsIGJ0b3QgPSBmYWxzZSB9KSA9PiB7XG4gIGNvbnN0IGl0ZXJMYXllcnMgPSBmdW5jdGlvbiAqICgpIHtcbiAgICBpZiAoYnRvdCkge1xuICAgICAgZm9yIChsZXQgaSA9IGxheWVycy5sZW5ndGggLSAyOyBpID49IDA7IC0taSkge1xuICAgICAgICB5aWVsZCBsYXllcnNbaV1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsYXllcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgeWllbGQgbGF5ZXJzW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXRlckxheWVyID0gZnVuY3Rpb24gKiAobGF5ZXIpIHtcbiAgICBpZiAocnRvbCkge1xuICAgICAgZm9yIChsZXQgaSA9IGxheWVyLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHlpZWxkIGxheWVyW2ldXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgeWllbGQgbGF5ZXJbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBlZGdlID0gYnRvdCA/ICh1LCB2KSA9PiBnLmVkZ2UodiwgdSkgOiAodSwgdikgPT4gZy5lZGdlKHUsIHYpXG4gIGNvbnN0IGRlZ3JlZSA9IGJ0b3QgPyB1ID0+IGcub3V0RGVncmVlKHUpIDogdSA9PiBnLmluRGVncmVlKHUpXG4gIGNvbnN0IG1lZCA9IGJ0b3QgPyAoZywgbGF5ZXJzKSA9PiBtZWRpYW4oZywgbGF5ZXJzLCB0cnVlKSA6IChnLCBsYXllcnMpID0+IG1lZGlhbihnLCBsYXllcnMpXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBnLnZlcnRleCh1KS5yb290ID0gdVxuICAgIGcudmVydGV4KHUpLmFsaWduID0gdVxuICB9XG4gIGZvciAoY29uc3QgbGF5ZXIgb2YgaXRlckxheWVycygpKSB7XG4gICAgbGV0IHIgPSBydG9sID8gSW5maW5pdHkgOiAtSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHYgb2YgaXRlckxheWVyKGxheWVyKSkge1xuICAgICAgaWYgKGRlZ3JlZSh2KSA+IDApIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0fSA9IG1lZChnLCB2KVxuICAgICAgICBjb25zdCBtZWRpYW5zID0gbGVmdCA9PT0gcmlnaHQgPyBbbGVmdF0gOiAocnRvbCA/IFtyaWdodCwgbGVmdF0gOiBbbGVmdCwgcmlnaHRdKVxuICAgICAgICBmb3IgKGNvbnN0IHUgb2YgbWVkaWFucykge1xuICAgICAgICAgIGlmICghZWRnZSh1LCB2KS50eXBlMUNvbmZsaWN0ICYmICFlZGdlKHUsIHYpLnR5cGUyQ29uZmxpY3QpIHtcbiAgICAgICAgICAgIGlmIChydG9sID8gciA+IGcudmVydGV4KHUpLm9yZGVyIDogciA8IGcudmVydGV4KHUpLm9yZGVyKSB7XG4gICAgICAgICAgICAgIGcudmVydGV4KHYpLmFsaWduID0gZy52ZXJ0ZXgodikucm9vdCA9IGcudmVydGV4KHUpLnJvb3RcbiAgICAgICAgICAgICAgZy52ZXJ0ZXgodSkuYWxpZ24gPSB2XG4gICAgICAgICAgICAgIHIgPSBnLnZlcnRleCh1KS5vcmRlclxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnRpY2FsQWxpZ25tZW50XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL3ZlcnRpY2FsLWFsaWdubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWVkaWFuID0gKGcsIHYsIGludmVyc2UgPSBmYWxzZSkgPT4ge1xuICBjb25zdCB2ZXJ0aWNlcyA9IEFycmF5LmZyb20oaW52ZXJzZSA/IGcub3V0VmVydGljZXModikgOiBnLmluVmVydGljZXModikpXG4gIHZlcnRpY2VzLnNvcnQoKHUxLCB1MikgPT4gZy52ZXJ0ZXgodTEpLm9yZGVyIC0gZy52ZXJ0ZXgodTIpLm9yZGVyKVxuICBjb25zdCBpbmRleCA9ICh2ZXJ0aWNlcy5sZW5ndGggLSAxKSAvIDJcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiB2ZXJ0aWNlc1tNYXRoLmZsb29yKGluZGV4KV0sXG4gICAgcmlnaHQ6IHZlcnRpY2VzW01hdGguY2VpbChpbmRleCldXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZWRpYW5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL21lZGlhbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgaG9yaXpvbnRhbENvbXBhY3Rpb24gPSAoZywgbGF5ZXJzLCB7IHJ0b2wgPSBmYWxzZSB9KSA9PiB7XG4gIGNvbnN0IG9yZGVyTm9uWmVybyA9IChub2RlKSA9PiBydG9sXG4gICAgPyBub2RlLm9yZGVyIDwgbGF5ZXJzW25vZGUubGF5ZXJdLmxlbmd0aCAtIDFcbiAgICA6IG5vZGUub3JkZXIgPiAwXG4gIGNvbnN0IHByZWRlY2Vzc29yID0gcnRvbFxuICAgID8gbm9kZSA9PiBsYXllcnNbbm9kZS5sYXllcl1bbm9kZS5vcmRlciArIDFdXG4gICAgOiBub2RlID0+IGxheWVyc1tub2RlLmxheWVyXVtub2RlLm9yZGVyIC0gMV1cblxuICBjb25zdCBwbGFjZUJsb2NrID0gKHYpID0+IHtcbiAgICBjb25zdCB2Tm9kZSA9IGcudmVydGV4KHYpXG4gICAgaWYgKHZOb2RlLnggIT09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2Tm9kZS54ID0gMFxuICAgIGxldCB3ID0gdlxuICAgIGRvIHtcbiAgICAgIGNvbnN0IHdOb2RlID0gZy52ZXJ0ZXgodylcbiAgICAgIGlmIChvcmRlck5vblplcm8od05vZGUpKSB7XG4gICAgICAgIGNvbnN0IHAgPSBwcmVkZWNlc3Nvcih3Tm9kZSlcbiAgICAgICAgY29uc3QgcE5vZGUgPSBnLnZlcnRleChwKVxuICAgICAgICBjb25zdCB1ID0gcE5vZGUucm9vdFxuICAgICAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgICAgIHBsYWNlQmxvY2sodSlcbiAgICAgICAgaWYgKHZOb2RlLnNpbmsgPT09IHYpIHtcbiAgICAgICAgICB2Tm9kZS5zaW5rID0gdU5vZGUuc2lua1xuICAgICAgICB9XG4gICAgICAgIGlmICh2Tm9kZS5zaW5rID09PSB1Tm9kZS5zaW5rKSB7XG4gICAgICAgICAgdk5vZGUueCA9IE1hdGgubWF4KHZOb2RlLngsIHVOb2RlLnggKyAocE5vZGUud2lkdGggKyB3Tm9kZS53aWR0aCkgLyAyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHVTaW5rTm9kZSA9IGcudmVydGV4KHVOb2RlLnNpbmspXG4gICAgICAgICAgdVNpbmtOb2RlLnNoaWZ0ID0gTWF0aC5taW4odVNpbmtOb2RlLnNoaWZ0LCB2Tm9kZS54IC0gdU5vZGUueCAtIChwTm9kZS53aWR0aCArIHdOb2RlLndpZHRoKSAvIDIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHcgPSB3Tm9kZS5hbGlnblxuICAgIH0gd2hpbGUgKHcgIT09IHYpXG4gIH1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIHVOb2RlLnNpbmsgPSB1XG4gICAgdU5vZGUuc2hpZnQgPSBJbmZpbml0eVxuICAgIHVOb2RlLnggPSBudWxsXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGlmIChnLnZlcnRleCh1KS5yb290ID09PSB1KSB7XG4gICAgICBwbGFjZUJsb2NrKHUpXG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgdU5vZGUueCA9IGcudmVydGV4KHVOb2RlLnJvb3QpLnhcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIGNvbnN0IHNoaWZ0ID0gZy52ZXJ0ZXgoZy52ZXJ0ZXgodU5vZGUucm9vdCkuc2luaykuc2hpZnRcbiAgICBpZiAoc2hpZnQgPCBJbmZpbml0eSkge1xuICAgICAgdU5vZGUueCArPSBzaGlmdFxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvcml6b250YWxDb21wYWN0aW9uXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL2hvcml6b250YWwtY29tcGFjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3Qgc2VnbWVudCA9IGZ1bmN0aW9uICogKGdyYXBoLCB2ZXJ0aWNlcywgdXBwZXIpIHtcbiAgaWYgKHZlcnRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVyblxuICB9XG4gIGxldCBzZXEgPSBbXVxuICBsZXQgbGFzdFBhcmVudCA9IGdyYXBoLnZlcnRleCh2ZXJ0aWNlc1swXSlbdXBwZXIgPyAndicgOiAndSddXG4gIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgIGNvbnN0IGQgPSBncmFwaC52ZXJ0ZXgodSlcbiAgICBpZiAoIWQuZHVtbXkgfHwgZFt1cHBlciA/ICd2JyA6ICd1J10gIT09IGxhc3RQYXJlbnQpIHtcbiAgICAgIGlmIChzZXEubGVuZ3RoID4gMCkge1xuICAgICAgICB5aWVsZCBzZXFcbiAgICAgICAgc2VxID0gW11cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGQuZHVtbXkpIHtcbiAgICAgIHNlcS5wdXNoKHUpXG4gICAgICBsYXN0UGFyZW50ID0gZFt1cHBlciA/ICd2JyA6ICd1J11cbiAgICB9XG4gIH1cbiAgaWYgKHNlcS5sZW5ndGggPiAwKSB7XG4gICAgeWllbGQgc2VxXG4gIH1cbn1cblxuY29uc3QgYWRqdXN0UG9zID0gKGdyYXBoLCB2ZXJ0aWNlcywgbHRvcikgPT4ge1xuICBsZXQgc3VtUG9zID0gMFxuICBsZXQgdG90YWxXaWR0aCA9IDBcbiAgZm9yIChjb25zdCB1IG9mIHZlcnRpY2VzKSB7XG4gICAgc3VtUG9zICs9IGdyYXBoLnZlcnRleCh1KVtsdG9yID8gJ3gnIDogJ3knXVxuICAgIHRvdGFsV2lkdGggKz0gZ3JhcGgudmVydGV4KHUpLm9yaWdXaWR0aCB8fCAwXG4gIH1cbiAgbGV0IG9mZnNldCA9IHN1bVBvcyAvIHZlcnRpY2VzLmxlbmd0aCAtICh0b3RhbFdpZHRoIC0gMSkgLyAyXG4gIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgIGdyYXBoLnZlcnRleCh1KVtsdG9yID8gJ3gnIDogJ3knXSA9IG9mZnNldFxuICAgIG9mZnNldCArPSBncmFwaC52ZXJ0ZXgodSkub3JpZ1dpZHRoIHx8IDBcbiAgfVxufVxuXG5jb25zdCBidW5kbGVFZGdlcyA9IChncmFwaCwgbGF5ZXJzLCBsdG9yKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGZvciAoY29uc3QgdmVydGljZXMgb2Ygc2VnbWVudChncmFwaCwgbGF5ZXJzW2ldLCBmYWxzZSkpIHtcbiAgICAgIGFkanVzdFBvcyhncmFwaCwgdmVydGljZXMsIGx0b3IpXG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSBsYXllcnMubGVuZ3RoIC0gMTsgaSA+IDA7IC0taSkge1xuICAgIGZvciAoY29uc3QgdmVydGljZXMgb2Ygc2VnbWVudChncmFwaCwgbGF5ZXJzW2ldLCB0cnVlKSkge1xuICAgICAgYWRqdXN0UG9zKGdyYXBoLCB2ZXJ0aWNlcywgbHRvcilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidW5kbGVFZGdlc1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2J1bmRsZS1lZGdlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgR3JhcGggPSByZXF1aXJlKCcuLi8uLi9ncmFwaCcpXG5jb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcbmNvbnN0IGN5Y2xlUmVtb3ZhbCA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwnKVxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gcmVxdWlyZSgnLi4vLi4vbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudCcpXG5jb25zdCBncm91cExheWVycyA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzJylcbmNvbnN0IHJlY3Rhbmd1bGFyID0gcmVxdWlyZSgnLi9yZWN0YW5ndWxhcicpXG5cbmNvbnN0IGVkZ2VDb25jZW50cmF0aW9uID0gKGcsIGgxLCBoMiwgbWV0aG9kLCBkdW1teSwgaWRHZW5lcmF0b3IpID0+IHtcbiAgY29uc3Qgc3ViZ3JhcGggPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICBzdWJncmFwaC5hZGRWZXJ0ZXgodSwgZy52ZXJ0ZXgodSkpXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGgyKSB7XG4gICAgc3ViZ3JhcGguYWRkVmVydGV4KHUsIGcudmVydGV4KHUpKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgIGZvciAoY29uc3QgdiBvZiBoMikge1xuICAgICAgaWYgKGcuZWRnZSh1LCB2KSkge1xuICAgICAgICBzdWJncmFwaC5hZGRFZGdlKHUsIHYsIGcuZWRnZSh1LCB2KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGNvbmNlbnRyYXRpb24gb2YgbWV0aG9kKHN1YmdyYXBoLCBoMSwgaDIpKSB7XG4gICAgY29uc3QgdyA9IGlkR2VuZXJhdG9yKGcsIGgxLCBoMilcbiAgICBnLmFkZFZlcnRleCh3LCBkdW1teShjb25jZW50cmF0aW9uLnNvdXJjZSwgY29uY2VudHJhdGlvbi50YXJnZXQpKVxuICAgIGZvciAoY29uc3QgdSBvZiBjb25jZW50cmF0aW9uLnNvdXJjZSkge1xuICAgICAgZy5hZGRFZGdlKHUsIHcpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdiBvZiBjb25jZW50cmF0aW9uLnRhcmdldCkge1xuICAgICAgZy5hZGRFZGdlKHcsIHYpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModykpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHcpKSB7XG4gICAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgICBnLnJlbW92ZUVkZ2UodSwgdilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgRWRnZUNvbmNlbnRyYXRpb25UcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgY3ljbGVSZW1vdmFsOiBuZXcgY3ljbGVSZW1vdmFsLkN5Y2xlUmVtb3ZhbCgpLFxuICAgICAgbGF5ZXJBc3NpZ25tZW50OiBuZXcgbGF5ZXJBc3NpZ25tZW50LlF1YWRIZXVyaXN0aWMoKSxcbiAgICAgIG1ldGhvZDogcmVjdGFuZ3VsYXIsXG4gICAgICBkdW1teTogKCkgPT4gKHtkdW1teTogdHJ1ZX0pLFxuICAgICAgaWRHZW5lcmF0b3I6ICgpID0+IFN5bWJvbCgpXG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zZm9ybSAoZykge1xuICAgIHRoaXMuY3ljbGVSZW1vdmFsKCkuY2FsbChnKVxuICAgIGNvbnN0IGxheWVyTWFwID0gdGhpcy5sYXllckFzc2lnbm1lbnQoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXBMYXllcnMoZywgbGF5ZXJNYXApXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICBjb25zdCBoMSA9IGxheWVyc1tpXVxuICAgICAgY29uc3QgaDIgPSBuZXcgU2V0KClcbiAgICAgIGxldCBlZGdlcyA9IDBcbiAgICAgIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICAgIGgyLmFkZCh2KVxuICAgICAgICAgIGVkZ2VzICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWRnZUNvbmNlbnRyYXRpb24oZywgaDEsIEFycmF5LmZyb20oaDIudmFsdWVzKCkpLCB0aGlzLm1ldGhvZCgpLCB0aGlzLmR1bW15KCksIHRoaXMuaWRHZW5lcmF0b3IoKSlcbiAgICB9XG4gICAgcmV0dXJuIGdcbiAgfVxuXG4gIGN5Y2xlUmVtb3ZhbCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnY3ljbGVSZW1vdmFsJywgYXJndW1lbnRzKVxuICB9XG5cbiAgbGF5ZXJBc3NpZ25tZW50ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdsYXllckFzc2lnbm1lbnQnLCBhcmd1bWVudHMpXG4gIH1cblxuICBtZXRob2QgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ21ldGhvZCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGR1bW15ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdkdW1teScsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGlkR2VuZXJhdG9yICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdpZEdlbmVyYXRvcicsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyVmVydGljZXMgPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IHVzID0gbmV3IFNldChoMSlcbiAgY29uc3QgdmVydGljZXMgPSB7fVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICB2ZXJ0aWNlc1t2XSA9IG5ldyBTZXQoKVxuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModikpIHtcbiAgICAgIGlmICh1cy5oYXModSkpIHtcbiAgICAgICAgdmVydGljZXNbdl0uYWRkKHUpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2ZXJ0aWNlc1xufVxuXG5jb25zdCByZWN0YW5ndWxhciA9IChnLCBoMSwgaDIpID0+IHtcbiAgaWYgKGgxLmxlbmd0aCA9PT0gMCB8fCBoMi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBjb25zdCBrID0gZy5udW1FZGdlcygpXG4gIGNvbnN0IGFjdGl2ZSA9IHt9XG4gIGNvbnN0IHZlcnRpY2VzID0gbGF5ZXJWZXJ0aWNlcyhnLCBoMSwgaDIpXG4gIGNvbnN0IGlzQWN0aXZlID0gKHUpID0+IGFjdGl2ZVt1XVxuICBjb25zdCBjbXAgPSAodjEsIHYyKSA9PiB2ZXJ0aWNlc1t2Ml0uc2l6ZSAtIHZlcnRpY2VzW3YxXS5zaXplXG4gIGNvbnN0IGQgPSAocywgdCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDBcbiAgICBmb3IgKGNvbnN0IHUgb2Ygcykge1xuICAgICAgZm9yIChjb25zdCB2IG9mIHQpIHtcbiAgICAgICAgaWYgKHZlcnRpY2VzW3ZdLmhhcyh1KSkge1xuICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQgLSBzLmxlbmd0aCAtIHQubGVuZ3RoXG4gIH1cbiAgaDIgPSBBcnJheS5mcm9tKGgyKVxuXG4gIGNvbnN0IGNvbmNlbnRyYXRpb25zID0gW11cbiAgbGV0IGpPZmZzZXQgPSAwXG4gIGZvciAobGV0IGwgPSAwOyBsIDwgazsgKytsKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgICBhY3RpdmVbdV0gPSB0cnVlXG4gICAgfVxuXG4gICAgaDIuc29ydChjbXApXG4gICAgaWYgKHZlcnRpY2VzW2gyW2pPZmZzZXRdXS5zaXplIDw9IDApIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgbGV0IG1heEQgPSAtMVxuICAgIGxldCBtYXhIMVxuICAgIGxldCBtYXhIMlxuICAgIGxldCB0bXBIMiA9IFtdXG4gICAgZm9yIChsZXQgaiA9IGpPZmZzZXQ7IGogPCBoMi5sZW5ndGg7ICsraikge1xuICAgICAgY29uc3QgdiA9IGgyW2pdXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICAgICAgaWYgKGFjdGl2ZVt1XSkge1xuICAgICAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlW3VdID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRtcEgyLnB1c2godilcbiAgICAgIGxldCB0bXBIMSA9IGgxLmZpbHRlcihpc0FjdGl2ZSlcbiAgICAgIGxldCB0bXBEID0gZCh0bXBIMSwgdG1wSDIpXG4gICAgICBpZiAodG1wRCA+IG1heEQpIHtcbiAgICAgICAgbWF4RCA9IHRtcERcbiAgICAgICAgbWF4SDEgPSB0bXBIMVxuICAgICAgICBtYXhIMiA9IEFycmF5LmZyb20odG1wSDIpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1heEQgPiAtMSkge1xuICAgICAgZm9yIChjb25zdCB2IG9mIG1heEgyKSB7XG4gICAgICAgIGZvciAoY29uc3QgdSBvZiBtYXhIMSkge1xuICAgICAgICAgIHZlcnRpY2VzW3ZdLmRlbGV0ZSh1KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25jZW50cmF0aW9ucy5wdXNoKHtcbiAgICAgICAgc291cmNlOiBBcnJheS5mcm9tKG1heEgxKSxcbiAgICAgICAgdGFyZ2V0OiBBcnJheS5mcm9tKG1heEgyKVxuICAgICAgfSlcbiAgICAgIGpPZmZzZXQgPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGpPZmZzZXQgKz0gMVxuICAgIH1cblxuICAgIGlmIChqT2Zmc2V0ID49IGgyLmxlbmd0aCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uY2VudHJhdGlvbnNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWN0YW5ndWxhclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9yZWN0YW5ndWxhci5qc1xuICoqIG1vZHVsZSBpZCA9IDIyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgaW50ZXJzZWN0aW9uID0gKGcsIHUxLCB1MiwgaDIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzb3VyY2U6IG5ldyBTZXQoW3UxLCB1Ml0pLFxuICAgIHRhcmdldDogbmV3IFNldChoMi5maWx0ZXIoKHYpID0+IGcuZWRnZSh1MSwgdikgJiYgZy5lZGdlKHUyLCB2KSkpXG4gIH1cbn1cblxuY29uc3Qgc2V0bWludXMgPSAoYSwgYikgPT4ge1xuICByZXR1cm4gbmV3IFNldChBcnJheS5mcm9tKGEudmFsdWVzKCkpLmZpbHRlcigoeCkgPT4gIWIuaGFzKHgpKSlcbn1cblxuY29uc3QgdW5pb24gPSAoYSwgYikgPT4ge1xuICBjb25zdCBzID0gbmV3IFNldChhKVxuICBmb3IgKGNvbnN0IHggb2YgYikge1xuICAgIHMuYWRkKHgpXG4gIH1cbiAgcmV0dXJuIHNcbn1cblxuY29uc3Qgc2V0RXF1YWxzID0gKGEsIGIpID0+IHtcbiAgcmV0dXJuIGEuc2l6ZSA9PT0gYi5zaXplICYmIHNldG1pbnVzKGEsIGIpLnNpemUgPT09IDBcbn1cblxuY29uc3QgbmV3YmVyeSA9IChnLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgaW50ZXJzZWN0aW9ucyA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaDEubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCB1MSA9IGgxW2ldXG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgaDEubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IHUyID0gaDFbal1cbiAgICAgIGludGVyc2VjdGlvbnMucHVzaChpbnRlcnNlY3Rpb24oZywgdTEsIHUyLCBoMikpXG4gICAgfVxuICB9XG4gIGludGVyc2VjdGlvbnMuc29ydCgoaTEsIGkyKSA9PiBpMS50YXJnZXQuc2l6ZSAtIGkyLnRhcmdldC5zaXplKVxuXG4gIGNvbnN0IGNvbmNlbnRyYXRpb25zID0gW11cbiAgZm9yIChjb25zdCBpIG9mIGludGVyc2VjdGlvbnMpIHtcbiAgICBsZXQgc3RvcCA9IGZhbHNlXG5cbiAgICBpZiAoaS50YXJnZXQuc2l6ZSA8IDIpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgICBpZiAoc2V0RXF1YWxzKGkudGFyZ2V0LCBjLnRhcmdldCkpIHtcbiAgICAgICAgYy5zb3VyY2UgPSB1bmlvbihpLnNvdXJjZSwgYy5zb3VyY2UpXG4gICAgICAgIHN0b3AgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgICBjb25zdCBpRGFzaCA9IHNldG1pbnVzKGkudGFyZ2V0LCBjLnRhcmdldClcbiAgICAgIGNvbnN0IGNEYXNoID0gc2V0bWludXMoYy50YXJnZXQsIGkudGFyZ2V0KVxuICAgICAgaWYgKGlEYXNoLnNpemUgPiAwICYmIGNEYXNoLnNpemUgPT09IDApIHtcbiAgICAgICAgY29uY2VudHJhdGlvbnMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBpLnNvdXJjZSxcbiAgICAgICAgICB0YXJnZXQ6IGlEYXNoXG4gICAgICAgIH0pXG4gICAgICAgIGMuc291cmNlID0gdW5pb24oYy5zb3VyY2UsIGkuc291cmNlKVxuICAgICAgICBzdG9wID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc3RvcCkge1xuICAgICAgY29uY2VudHJhdGlvbnMucHVzaChpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlZCA9IG5ldyBNYXAoY29uY2VudHJhdGlvbnMubWFwKChfLCBpKSA9PiBbaSwgZmFsc2VdKSlcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jZW50cmF0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGMxID0gY29uY2VudHJhdGlvbnNbaV1cbiAgICBpZiAobWVyZ2VkLmdldChpKSkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgY29uY2VudHJhdGlvbnMubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IGMyID0gY29uY2VudHJhdGlvbnNbal1cbiAgICAgIGlmIChzZXRFcXVhbHMoYzEudGFyZ2V0LCBjMi50YXJnZXQpKSB7XG4gICAgICAgIGMxLnNvdXJjZSA9IHVuaW9uKGMxLnNvdXJjZSwgYzIuc291cmNlKVxuICAgICAgICBtZXJnZWQuc2V0KGosIHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgYy5zb3VyY2UgPSBBcnJheS5mcm9tKGMuc291cmNlKVxuICAgIGMudGFyZ2V0ID0gQXJyYXkuZnJvbShjLnRhcmdldClcbiAgfVxuXG4gIHJldHVybiBjb25jZW50cmF0aW9uc1xuICAgIC5maWx0ZXIoKGMsIGkpID0+ICFtZXJnZWQuZ2V0KGkpICYmIGMudGFyZ2V0Lmxlbmd0aCA+IDEpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3YmVyeVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9uZXdiZXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gMjMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBiaWNsaXF1ZUZpbmQgPSAoZ3JhcGgsIEwsIFIsIFAsIFEsIGNsaXF1ZXMpID0+IHtcbiAgd2hpbGUgKFAuc2l6ZSAhPT0gMCkge1xuICAgIGxldCB4ID0gQXJyYXkuZnJvbShQKVswXVxuICAgIFAuZGVsZXRlKHgpXG4gICAgbGV0IF9SID0gbmV3IFNldChbLi4uUiwgeF0pXG4gICAgbGV0IF9MID0gbmV3IFNldChncmFwaC5pblZlcnRpY2VzKHgpLmZpbHRlcigodSkgPT4gTC5oYXModSkpKVxuICAgIGxldCBjb21wbGVtZW50TCA9IG5ldyBTZXQoQXJyYXkuZnJvbShMKS5maWx0ZXIoKHUpID0+ICFfTC5oYXModSkpKVxuICAgIF9MLmZvckVhY2goKGwpID0+IHtcbiAgICAgIGNvbXBsZW1lbnRMLmRlbGV0ZShsKVxuICAgIH0pXG4gICAgbGV0IEMgPSBuZXcgU2V0KFt4XSlcbiAgICBsZXQgX1AgPSBuZXcgU2V0KClcbiAgICBsZXQgX1EgPSBuZXcgU2V0KClcbiAgICBsZXQgaXNNYXhpbWFsID0gdHJ1ZVxuICAgIGZvciAobGV0IHYgb2YgUSkge1xuICAgICAgbGV0IE4gPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikuZmlsdGVyKCh1KSA9PiBfTC5oYXModSkpKVxuICAgICAgaWYgKE4uc2l6ZSA9PT0gX0wuc2l6ZSkge1xuICAgICAgICBpc01heGltYWwgPSBmYWxzZVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmIChOLnNpemUgPiAwKSB7XG4gICAgICAgIF9RID0gX1EuYWRkKHYpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc01heGltYWwpIHtcbiAgICAgIGZvciAobGV0IHYgb2YgUCkge1xuICAgICAgICBpZiAodiAhPT0geCkge1xuICAgICAgICAgIGxldCBOID0gbmV3IFNldChncmFwaC5pblZlcnRpY2VzKHYpLmZpbHRlcigodSkgPT4gX0wuaGFzKHUpKSlcbiAgICAgICAgICBpZiAoTi5zaXplID09PSBfTC5zaXplKSB7XG4gICAgICAgICAgICBfUi5hZGQodilcbiAgICAgICAgICAgIGxldCBTID0gbmV3IFNldChncmFwaC5pblZlcnRpY2VzKHYpLmZpbHRlcigodSkgPT4gY29tcGxlbWVudEwuaGFzKHUpKSlcbiAgICAgICAgICAgIGlmIChTLnNpemUgPT09IDApIEMuYWRkKHYpXG4gICAgICAgICAgfSBlbHNlIGlmIChOLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBfUC5hZGQodilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChfUC5zaXplICE9PSAwKSB7XG4gICAgICAgIGJpY2xpcXVlRmluZChncmFwaCwgX0wsIF9SLCBfUCwgX1EsIGNsaXF1ZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX0wuc2l6ZSA+IDEgJiYgX1Iuc2l6ZSA+IDEpIHtcbiAgICAgICAgICBjbGlxdWVzLnB1c2goe1xuICAgICAgICAgICAgc291cmNlOiBBcnJheS5mcm9tKF9MKSxcbiAgICAgICAgICAgIHRhcmdldDogQXJyYXkuZnJvbShfUilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFEgPSBuZXcgU2V0KFsuLi5RLCAuLi5DXSlcbiAgICBQID0gbmV3IFNldChBcnJheS5mcm9tKFApLmZpbHRlcigodikgPT4gIUMuaGFzKHYpKSlcbiAgfVxufVxuXG5jb25zdCBtYmVhID0gKGdyYXBoLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgVSA9IGdyYXBoLnZlcnRpY2VzKCkuZmlsdGVyKCh1KSA9PiBncmFwaC5vdXREZWdyZWUodSkpXG4gIGNvbnN0IFYgPSBncmFwaC52ZXJ0aWNlcygpLmZpbHRlcigodSkgPT4gZ3JhcGguaW5EZWdyZWUodSkpXG4gIGxldCBjbGlxdWVzID0gW11cbiAgYmljbGlxdWVGaW5kKGdyYXBoLCBuZXcgU2V0KFUpLCBuZXcgU2V0KCksIG5ldyBTZXQoViksIG5ldyBTZXQoKSwgY2xpcXVlcylcbiAgcmV0dXJuIGNsaXF1ZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYmVhXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL21iZWEuanNcbiAqKiBtb2R1bGUgaWQgPSAyMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGhhc2hLZXkgPSAodmVydGljZXMpID0+IHtcbiAgcmV0dXJuIHZlcnRpY2VzLm1hcCgodSkgPT4gdS50b1N0cmluZygpKS5qb2luKCcsJylcbn1cblxuY29uc3QgbWF4S2V5ID0gKGl0ZXIpID0+IHtcbiAgbGV0IG1heFZhbCA9IC1JbmZpbml0eVxuICBsZXQgcmVzdWx0ID0gbnVsbFxuICBmb3IgKGNvbnN0IFtpZCwgdmFsXSBvZiBpdGVyKSB7XG4gICAgaWYgKHZhbCA+IG1heFZhbCkge1xuICAgICAgbWF4VmFsID0gdmFsXG4gICAgICByZXN1bHQgPSBpZFxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IHBhcnRpdGlvbiA9IChncmFwaCwgVSkgPT4ge1xuICBjb25zdCBMID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBMLmFkZCh2KVxuICAgIH1cbiAgfVxuICBjb25zdCBoYXNoS2V5cyA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgIGhhc2hLZXlzLnNldCh1LCBoYXNoS2V5KGdyYXBoLm91dFZlcnRpY2VzKHUpKSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgTCkge1xuICAgIGNvbnN0IGRlZ3JlZXMgPSBncmFwaC5pblZlcnRpY2VzKHUpLm1hcCgodikgPT4gW3YsIGdyYXBoLm91dERlZ3JlZSh2KV0pXG4gICAgY29uc3QgbWF4SWQgPSBtYXhLZXkoZGVncmVlcylcbiAgICBoYXNoS2V5cy5zZXQodSwgaGFzaEtleXMuZ2V0KG1heElkKSlcbiAgfVxuICBsZXQgY2hhbmdlZCA9IGZhbHNlXG4gIGRvIHtcbiAgICBjaGFuZ2VkID0gZmFsc2VcbiAgICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgICAgY29uc3QgTSA9IG5ldyBNYXAoKVxuICAgICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBoYXNoS2V5cy5nZXQodilcbiAgICAgICAgaWYgKCFNLmhhcyhoYXNoKSkge1xuICAgICAgICAgIE0uc2V0KGhhc2gsIDApXG4gICAgICAgIH1cbiAgICAgICAgTS5zZXQoaGFzaCwgTS5nZXQoaGFzaCkgKyAxKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3S2V5ID0gbWF4S2V5KE0uZW50cmllcygpKVxuICAgICAgaWYgKGhhc2hLZXlzLmdldCh1KSAhPT0gbmV3S2V5KSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIGhhc2hLZXlzLnNldCh1LCBuZXdLZXkpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBMKSB7XG4gICAgICBjb25zdCBNID0gbmV3IE1hcCgpXG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGguaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBoYXNoID0gaGFzaEtleXMuZ2V0KHYpXG4gICAgICAgIGlmICghTS5oYXMoaGFzaCkpIHtcbiAgICAgICAgICBNLnNldChoYXNoLCAwKVxuICAgICAgICB9XG4gICAgICAgIE0uc2V0KGhhc2gsIE0uZ2V0KGhhc2gpICsgMSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0tleSA9IG1heEtleShNLmVudHJpZXMoKSlcbiAgICAgIGlmIChoYXNoS2V5cy5nZXQodSkgIT09IG5ld0tleSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBoYXNoS2V5cy5zZXQodSwgbmV3S2V5KVxuICAgICAgfVxuICAgIH1cbiAgfSB3aGlsZSAoY2hhbmdlZClcbiAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgY29uc3QgaGFzaCA9IGhhc2hLZXlzLmdldCh1KVxuICAgIGlmICghcmVzdWx0LmhhcyhoYXNoKSkge1xuICAgICAgcmVzdWx0LnNldChoYXNoLCBbXSlcbiAgICB9XG4gICAgcmVzdWx0LmdldChoYXNoKS5wdXNoKHUpXG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20ocmVzdWx0LnZhbHVlcygpKVxufVxuXG5jb25zdCBhdWd1bWVudCA9IChncmFwaCwgUykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCB1IG9mIFMpIHtcbiAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICAgIGZvciAoY29uc3QgdyBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICAgIHJlc3VsdC5hZGQodylcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20ocmVzdWx0KVxufVxuXG5jb25zdCBxdWFzaUJpY2xpcXVlTWluaW5nID0gKGdyYXBoLCBtdSwgUykgPT4ge1xuICBjb25zdCBDID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBTKSB7XG4gICAgY29uc3QgdG1wUyA9IG5ldyBTZXQoKVxuICAgIGNvbnN0IHRtcFQgPSBuZXcgU2V0KGdyYXBoLm91dFZlcnRpY2VzKHUpKVxuICAgIEMuc2V0KGhhc2hLZXkoQXJyYXkuZnJvbSh0bXBUKSksIHtzb3VyY2U6IHRtcFMsIHRhcmdldDogdG1wVH0pXG4gIH1cbiAgZm9yIChjb25zdCBrZXkgb2YgQy5rZXlzKCkpIHtcbiAgICBjb25zdCBNID0gbmV3IE1hcCgpXG4gICAgZm9yIChjb25zdCB2IG9mIEMuZ2V0KGtleSkudGFyZ2V0KSB7XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZ3JhcGguaW5WZXJ0aWNlcyh2KSkge1xuICAgICAgICBpZiAoIU0uaGFzKHUpKSB7XG4gICAgICAgICAgTS5zZXQodSwgMClcbiAgICAgICAgfVxuICAgICAgICBNLnNldCh1LCBNLmdldCh1KSArIDEpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBNLmtleXMoKSkge1xuICAgICAgaWYgKE0uZ2V0KHUpID49IG11ICogQy5nZXQoa2V5KS50YXJnZXQuc2l6ZSkge1xuICAgICAgICBDLmdldChrZXkpLnNvdXJjZS5hZGQodSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBBcnJheS5mcm9tKEMudmFsdWVzKCkpXG4gICAgLmZpbHRlcigoe3NvdXJjZSwgdGFyZ2V0fSkgPT4gc291cmNlLnNpemUgPiAxICYmIHRhcmdldC5zaXplID4gMSlcbiAgcmVzdWx0LnNvcnQoKGMxLCBjMikgPT4gYzEuc291cmNlLnNpemUgPT09IGMyLnNvdXJjZS5zaXplID8gYzIudGFyZ2V0LnNpemUgLSBjMS50YXJnZXQuc2l6ZSA6IGMyLnNvdXJjZS5zaXplIC0gYzEuc291cmNlLnNpemUpXG4gIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgY29uc3QgbWF4aW11bSA9IHJlc3VsdFswXVxuICBmb3IgKGxldCBpID0gMTsgaSA8IHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHRtcFMgPSBuZXcgU2V0KG1heGltdW0uc291cmNlKVxuICAgIGNvbnN0IHRtcFQgPSBuZXcgU2V0KG1heGltdW0udGFyZ2V0KVxuICAgIGZvciAoY29uc3QgdSBvZiByZXN1bHRbaV0uc291cmNlKSB7XG4gICAgICB0bXBTLmFkZCh1KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHUgb2YgcmVzdWx0W2ldLnRhcmdldCkge1xuICAgICAgdG1wVC5hZGQodSlcbiAgICB9XG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGZvciAoY29uc3QgdSBvZiB0bXBTKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgdG1wVCkge1xuICAgICAgICBpZiAoZ3JhcGguZWRnZSh1LCB2KSkge1xuICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnQgPCBtdSAqIHRtcFMuc2l6ZSAqIHRtcFQuc2l6ZSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgbWF4aW11bS5zb3VyY2UgPSBBcnJheS5mcm9tKHRtcFMpXG4gICAgbWF4aW11bS50YXJnZXQgPSBBcnJheS5mcm9tKHRtcFQpXG4gIH1cbiAgcmV0dXJuIFttYXhpbXVtXVxufVxuXG5jb25zdCBxdWFzaUNsaXF1ZUxheWVyID0gKGdyYXBoLCBoMSwgaDIsIG11KSA9PiB7XG4gIGNvbnN0IGNsaXF1ZXMgPSBbXVxuICBmb3IgKGNvbnN0IFMgb2YgcGFydGl0aW9uKGdyYXBoLCBoMSkpIHtcbiAgICBmb3IgKGNvbnN0IGNsaXF1ZSBvZiBxdWFzaUJpY2xpcXVlTWluaW5nKGdyYXBoLCBtdSwgYXVndW1lbnQoZ3JhcGgsIFMpKSkge1xuICAgICAgY2xpcXVlcy5wdXNoKGNsaXF1ZSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsaXF1ZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBxdWFzaUNsaXF1ZUxheWVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3Qge2NvbWJpbmF0aW9ufSA9IHJlcXVpcmUoJ2pzLWNvbWJpbmF0b3JpY3MnKVxuXG5jb25zdCBlbnVtZXJhdGUgPSBmdW5jdGlvbiAqIChuZWlnaGJvcnMsIGVwc2lsb24pIHtcbiAgaWYgKG5laWdoYm9ycy5zaXplID4gMCkge1xuICAgIGZvciAobGV0IGkgPSBlcHNpbG9uOyBpID4gMDsgLS1pKSB7XG4gICAgICBjb25zdCBpdGVyID0gY29tYmluYXRpb24oQXJyYXkuZnJvbShuZWlnaGJvcnMpLCBNYXRoLm1pbihpLCBuZWlnaGJvcnMuc2l6ZSkpXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBTID0gaXRlci5uZXh0KClcbiAgICAgICAgaWYgKCFTKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBTXG4gICAgICB9XG4gICAgfVxuICAgIHlpZWxkIFtdXG4gIH1cbn1cblxuY29uc3QgYWRqYWNlbnRWZXJ0aWNlcyA9IChncmFwaCwgdnMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdiBvZiB2cykge1xuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5vdXRWZXJ0aWNlcyh2KSkge1xuICAgICAgcmVzdWx0LmFkZCh1KVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGdlbktleSA9IChWbCwgVnIpID0+IHtcbiAgY29uc3QgYXJyYXlWbCA9IEFycmF5LmZyb20oVmwpXG4gIGNvbnN0IGFycmF5VnIgPSBBcnJheS5mcm9tKFZyKVxuICBhcnJheVZsLnNvcnQoKVxuICBhcnJheVZyLnNvcnQoKVxuICByZXR1cm4gYCR7YXJyYXlWbC5qb2luKCcsJyl9OiR7YXJyYXlWci5qb2luKCcsJyl9YFxufVxuXG5jb25zdCBjb3VudEVycm9yID0gKGdyYXBoLCB1LCB2ZXJ0aWNlcywgbHRvdSkgPT4ge1xuICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGx0b3UgPyBncmFwaC5pblZlcnRpY2VzKHUpIDogZ3JhcGgub3V0VmVydGljZXModSkpXG4gIGxldCBjb3VudCA9IDBcbiAgZm9yIChjb25zdCB2IG9mIHZlcnRpY2VzKSB7XG4gICAgaWYgKCFuZWlnaGJvcnMuaGFzKHYpKSB7XG4gICAgICBjb3VudCArPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudFxufVxuXG5jb25zdCBpbnRlcnNlY3Rpb24gPSAoQSwgQikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCBpdGVtIG9mIEEpIHtcbiAgICBpZiAoQi5oYXMoaXRlbSkpIHtcbiAgICAgIHJlc3VsdC5hZGQoaXRlbSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBzZXRtaW51cyA9IChBLCBCKSA9PiB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBCKSB7XG4gICAgQS5kZWxldGUoaXRlbSlcbiAgfVxuICByZXR1cm4gQVxufVxuXG5jb25zdCBzdG9yZSA9IChyZXN1bHQsIGtleSwgVmwsIFZyKSA9PiB7XG4gIGZvciAoY29uc3QgW2tleSwge3NvdXJjZSwgdGFyZ2V0fV0gb2YgcmVzdWx0LmVudHJpZXMoKSkge1xuICAgIGNvbnN0IHNvdXJjZUludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbihzb3VyY2UsIFZsKVxuICAgIGNvbnN0IHRhcmdldEludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbih0YXJnZXQsIFZyKVxuICAgIGlmIChzb3VyY2VJbnRlcnNlY3Rpb24uc2l6ZSA9PT0gc291cmNlLnNpemUgJiYgdGFyZ2V0SW50ZXJzZWN0aW9uLnNpemUgPT09IHRhcmdldC5zaXplKSB7XG4gICAgICByZXN1bHQuZGVsZXRlKGtleSlcbiAgICB9IGVsc2UgaWYgKHNvdXJjZUludGVyc2VjdGlvbi5zaXplID09PSBWbC5zaXplICYmIHRhcmdldEludGVyc2VjdGlvbi5zaXplID09PSBWci5zaXplKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgcmVzdWx0LnNldChrZXksIHtzb3VyY2U6IFZsLCB0YXJnZXQ6IFZyfSlcbn1cblxuY29uc3QgdGVzdEVwc2lsb25RdWFzaUJpY2xpcXVlID0gKGdyYXBoLCBzb3VyY2UsIHRhcmdldCwgZXBzaWxvbiwgbXMpID0+IHtcbiAgaWYgKHNvdXJjZS5zaXplIDwgbXMgfHwgdGFyZ2V0LnNpemUgPCBtcykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBzb3VyY2UpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGgub3V0VmVydGljZXModSkpXG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGZvciAoY29uc3QgdiBvZiB0YXJnZXQpIHtcbiAgICAgIGlmICghdmVydGljZXMuaGFzKHYpKSB7XG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50ID4gZXBzaWxvbikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiB0YXJnZXQpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh1KSlcbiAgICBsZXQgY291bnQgPSAwXG4gICAgZm9yIChjb25zdCB2IG9mIHNvdXJjZSkge1xuICAgICAgaWYgKCF2ZXJ0aWNlcy5oYXModikpIHtcbiAgICAgICAgY291bnQgKz0gMVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnQgPiBlcHNpbG9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3Qgc3Vic3BhY2UgPSAoZ3JhcGgsIGNhbmRWbCwgZ2VuVmwsIGNhbmRFeHQsIGVwc2lsb24sIG1zLCB2aXNpdGVkLCByZXN1bHQpID0+IHtcbiAgY29uc3QgY2FuZFZyID0gYWRqYWNlbnRWZXJ0aWNlcyhncmFwaCwgY2FuZFZsKVxuICBmb3IgKGNvbnN0IHYgb2YgY2FuZFZyKSB7XG4gICAgaWYgKGNvdW50RXJyb3IoZ3JhcGgsIHYsIGNhbmRWbCwgdHJ1ZSkgPiBlcHNpbG9uKSB7XG4gICAgICBjYW5kVnIuZGVsZXRlKHYpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qga2V5ID0gZ2VuS2V5KGNhbmRWbCwgY2FuZFZyKVxuICBpZiAodmlzaXRlZC5oYXMoa2V5KSkge1xuICAgIHJldHVyblxuICB9XG4gIHZpc2l0ZWQuYWRkKGtleSlcbiAgaWYgKHRlc3RFcHNpbG9uUXVhc2lCaWNsaXF1ZShncmFwaCwgY2FuZFZsLCBjYW5kVnIsIGVwc2lsb24sIG1zKSkge1xuICAgIHN0b3JlKHJlc3VsdCwga2V5LCBjYW5kVmwsIGNhbmRWcilcbiAgfVxuXG4gIHNldG1pbnVzKGNhbmRFeHQsIGNhbmRWcilcbiAgZm9yIChjb25zdCB2IG9mIGNhbmRFeHQpIHtcbiAgICBjYW5kRXh0LmRlbGV0ZSh2KVxuICAgIGNvbnN0IG5laWdoYm9ycyA9IGludGVyc2VjdGlvbihjYW5kVmwsIG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh2KSkpXG4gICAgY29uc3QgcmVzdCA9IHNldG1pbnVzKG5ldyBTZXQoY2FuZFZsKSwgbmVpZ2hib3JzKVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUocmVzdCwgZXBzaWxvbikpIHtcbiAgICAgIGNvbnN0IFZsID0gbmV3IFNldChuZWlnaGJvcnMpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgY2FuZEV4dCwgZXBzaWxvbiwgbXMsIHZpc2l0ZWQsIHJlc3VsdClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29tcGxldGVRQiA9IChncmFwaCwgaDEsIGgyLCBlcHNpbG9uLCBtcykgPT4ge1xuICBjb25zdCBiaWNsaXF1ZXMgPSBuZXcgTWFwKClcbiAgY29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGgxKVxuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICBuZWlnaGJvcnMuZGVsZXRlKHUpXG4gICAgfVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUobmVpZ2hib3JzLCBlcHNpbG9uKSkge1xuICAgICAgY29uc3QgVmwgPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgbmV3IFNldChoMiksIGVwc2lsb24sIG1zLCB2aXNpdGVkLCBiaWNsaXF1ZXMpXG4gICAgfVxuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKGJpY2xpcXVlcy52YWx1ZXMoKSkubWFwKCh7c291cmNlLCB0YXJnZXR9KSA9PiB7XG4gICAgY29uc3Qgc291cmNlQXJyYXkgPSBBcnJheS5mcm9tKHNvdXJjZSlcbiAgICBjb25zdCB0YXJnZXRBcnJheSA9IEFycmF5LmZyb20odGFyZ2V0KVxuICAgIHNvdXJjZUFycmF5LnNvcnQoKVxuICAgIHRhcmdldEFycmF5LnNvcnQoKVxuICAgIHJldHVybiB7XG4gICAgICBzb3VyY2U6IHNvdXJjZUFycmF5LFxuICAgICAgdGFyZ2V0OiB0YXJnZXRBcnJheVxuICAgIH1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb21wbGV0ZVFCXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2NvbXBsZXRlLXFiLmpzXG4gKiogbW9kdWxlIGlkID0gMjMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIvKlxuICogJElkOiBjb21iaW5hdG9yaWNzLmpzLHYgMC4yNSAyMDEzLzAzLzExIDE1OjQyOjE0IGRhbmtvZ2FpIEV4cCBkYW5rb2dhaSAkXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICpcbiAqICBSZWZlcmVuY2VzOlxuICogICAgaHR0cDovL3d3dy5ydWJ5LWRvYy5vcmcvY29yZS0yLjAvQXJyYXkuaHRtbCNtZXRob2QtaS1jb21iaW5hdGlvblxuICogICAgaHR0cDovL3d3dy5ydWJ5LWRvYy5vcmcvY29yZS0yLjAvQXJyYXkuaHRtbCNtZXRob2QtaS1wZXJtdXRhdGlvblxuICogICAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GYWN0b3JpYWxfbnVtYmVyX3N5c3RlbVxuICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5Db21iaW5hdG9yaWNzID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgdmVyc2lvbiA9IFwiMC41LjJcIjtcbiAgICAvKiBjb21iaW5hdG9yeSBhcml0aG1ldGljcyAqL1xuICAgIHZhciBQID0gZnVuY3Rpb24obSwgbikge1xuICAgICAgICB2YXIgcCA9IDE7XG4gICAgICAgIHdoaWxlIChuLS0pIHAgKj0gbS0tO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9O1xuICAgIHZhciBDID0gZnVuY3Rpb24obSwgbikge1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQKG0sIG4pIC8gUChuLCBuKTtcbiAgICB9O1xuICAgIHZhciBmYWN0b3JpYWwgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgIHJldHVybiBQKG4sIG4pO1xuICAgIH07XG4gICAgdmFyIGZhY3RvcmFkaWMgPSBmdW5jdGlvbihuLCBkKSB7XG4gICAgICAgIHZhciBmID0gMTtcbiAgICAgICAgaWYgKCFkKSB7XG4gICAgICAgICAgICBmb3IgKGQgPSAxOyBmIDwgbjsgZiAqPSArK2QpO1xuICAgICAgICAgICAgaWYgKGYgPiBuKSBmIC89IGQtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGYgPSBmYWN0b3JpYWwoZCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFswXTtcbiAgICAgICAgZm9yICg7IGQ7IGYgLz0gZC0tKSB7XG4gICAgICAgICAgICByZXN1bHRbZF0gPSBNYXRoLmZsb29yKG4gLyBmKTtcbiAgICAgICAgICAgIG4gJT0gZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyogY29tbW9uIG1ldGhvZHMgKi9cbiAgICB2YXIgYWRkUHJvcGVydGllcyA9IGZ1bmN0aW9uKGRzdCwgc3JjKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHN0LCBwLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHNyY1twXSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHAgPT0gJ25leHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaGlkZVByb3BlcnR5ID0gZnVuY3Rpb24obywgcCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgcCwge1xuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgdmFyIGUsIHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgd2hpbGUgKGUgPSB0aGlzLm5leHQoKSkgcmVzdWx0LnB1c2goZiA/IGYoZSkgOiBlKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICB2YXIgY29tbW9uID0ge1xuICAgICAgICB0b0FycmF5OiB0b0FycmF5LFxuICAgICAgICBtYXA6IHRvQXJyYXksXG4gICAgICAgIGZvckVhY2g6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIHZhciBlO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB3aGlsZSAoZSA9IHRoaXMubmV4dCgpKSBmKGUpO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24oZikge1xuICAgICAgICAgICAgdmFyIGUsIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB3aGlsZSAoZSA9IHRoaXMubmV4dCgpKSBpZiAoZihlKSkgcmVzdWx0LnB1c2goZSk7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGxhenlNYXA6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhenlNYXAgPSBmO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxhenlGaWx0ZXI6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbmV4dCcsIHtcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGYgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLl9uZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICh0aGlzLl9uZXh0KSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0ID0gdGhpcy5uZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgX25leHQgPSB0aGlzLl9uZXh0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGUgPSBfbmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZihlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICduZXh0Jywge1xuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvKiBwb3dlciBzZXQgKi9cbiAgICB2YXIgcG93ZXIgPSBmdW5jdGlvbihhcnksIGZ1bikge1xuICAgICAgICB2YXIgc2l6ZSA9IDEgPDwgYXJ5Lmxlbmd0aCxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgbjsgbiA+Pj49IDEsIGkrKykgaWYgKG4gJiAxKSByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubnRoKHRoaXMuaW5kZXgrKyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIGNvbW1vbik7XG4gICAgICAgIHRoYXQuaW5pdCgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiAoZnVuKSA9PT0gJ2Z1bmN0aW9uJykgPyB0aGF0Lm1hcChmdW4pIDogdGhhdDtcbiAgICB9O1xuICAgIC8qIGNvbWJpbmF0aW9uICovXG4gICAgdmFyIG5leHRJbmRleCA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIHNtYWxsZXN0ID0gbiAmIC1uLFxuICAgICAgICAgICAgcmlwcGxlID0gbiArIHNtYWxsZXN0LFxuICAgICAgICAgICAgbmV3X3NtYWxsZXN0ID0gcmlwcGxlICYgLXJpcHBsZSxcbiAgICAgICAgICAgIG9uZXMgPSAoKG5ld19zbWFsbGVzdCAvIHNtYWxsZXN0KSA+PiAxKSAtIDE7XG4gICAgICAgIHJldHVybiByaXBwbGUgfCBvbmVzO1xuICAgIH07XG4gICAgdmFyIGNvbWJpbmF0aW9uID0gZnVuY3Rpb24oYXJ5LCBuZWxlbSwgZnVuKSB7XG4gICAgICAgIGlmICghbmVsZW0pIG5lbGVtID0gYXJ5Lmxlbmd0aDtcbiAgICAgICAgaWYgKG5lbGVtIDwgMSkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIGlmIChuZWxlbSA+IGFyeS5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgZmlyc3QgPSAoMSA8PCBuZWxlbSkgLSAxLFxuICAgICAgICAgICAgc2l6ZSA9IEMoYXJ5Lmxlbmd0aCwgbmVsZW0pLFxuICAgICAgICAgICAgbWF4SW5kZXggPSAxIDw8IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGZpcnN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID49IG1heEluZGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICg7IG47IG4gPj4+PSAxLCBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gJiAxKSByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXh0SW5kZXgodGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcbiAgICAvKiBiaWdjb21iaW5hdGlvbiAqL1xuICAgIHZhciBiaWdOZXh0SW5kZXggPSBmdW5jdGlvbihuLCBuZWxlbSkge1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuO1xuICAgICAgICB2YXIgaiA9IG5lbGVtO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZvciAoaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdFtpXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGogPT0gMCkge1xuICAgICAgICAgICAgLy8gT3ZlcmZsb3dcbiAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IDE7XG4gICAgICAgICAgICBmb3IgKHZhciBrID0gcmVzdWx0Lmxlbmd0aCAtIDI7IGsgPj0gMDsgay0tKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tdID0gKGsgPCBuZWxlbS0xKT8xOjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxcblxuICAgICAgICAgICAgLy8gZmlyc3QgemVybyBhZnRlciAxXG4gICAgICAgICAgICB2YXIgaTEgPSAtMTtcbiAgICAgICAgICAgIHZhciBpMCA9IC0xO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDAgJiYgaTEgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaTAgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaTEgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaTAgIT0gLTEgJiYgaTEgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2kwXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpMV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGogPSBuZWxlbTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSByZXN1bHQubGVuZ3RoIC0gMTsgaSA+PSBpMTsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXSA9PSAxKVxuICAgICAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGkxOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSAoaSA8IGopPzE6MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9O1xuICAgIHZhciBidWlsZEZpcnN0ID0gZnVuY3Rpb24obmVsZW0pIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5lbGVtOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0WzBdID0gMTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHZhciBiaWdDb21iaW5hdGlvbiA9IGZ1bmN0aW9uKGFyeSwgbmVsZW0sIGZ1bikge1xuICAgICAgICBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICBpZiAobmVsZW0gPiBhcnkubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIGZpcnN0ID0gYnVpbGRGaXJzdChuZWxlbSksXG4gICAgICAgICAgICBzaXplID0gQyhhcnkubGVuZ3RoLCBuZWxlbSksXG4gICAgICAgICAgICBtYXhJbmRleCA9IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGZpcnN0LmNvbmNhdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4Lmxlbmd0aCA+IG1heEluZGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuLmxlbmd0aDsgaisrLCBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5bal0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiaWdOZXh0SW5kZXgodGhpcy5pbmRleCwgbmVsZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIChmdW4pID09PSAnZnVuY3Rpb24nKSA/IHRoYXQubWFwKGZ1bikgOiB0aGF0O1xuICAgIH07XG4gICAgLyogcGVybXV0YXRpb24gKi9cbiAgICB2YXIgX3Blcm11dGF0aW9uID0gZnVuY3Rpb24oYXJ5KSB7XG4gICAgICAgIHZhciB0aGF0ID0gYXJ5LnNsaWNlKCksXG4gICAgICAgICAgICBzaXplID0gZmFjdG9yaWFsKHRoYXQubGVuZ3RoKTtcbiAgICAgICAgdGhhdC5pbmRleCA9IDA7XG4gICAgICAgIHRoYXQubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gc2l6ZSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGNvcHkgPSB0aGlzLnNsaWNlKCksXG4gICAgICAgICAgICAgICAgZGlnaXRzID0gZmFjdG9yYWRpYyh0aGlzLmluZGV4LCB0aGlzLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICAgICAgaSA9IHRoaXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGZvciAoOyBpID49IDA7IC0taSkgcmVzdWx0LnB1c2goY29weS5zcGxpY2UoZGlnaXRzW2ldLCAxKVswXSk7XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgLy8gd2hpY2ggaXMgcmVhbGx5IGEgcGVybXV0YXRpb24gb2YgY29tYmluYXRpb25cbiAgICB2YXIgcGVybXV0YXRpb24gPSBmdW5jdGlvbihhcnksIG5lbGVtLCBmdW4pIHtcbiAgICAgICAgaWYgKCFuZWxlbSkgbmVsZW0gPSBhcnkubGVuZ3RoO1xuICAgICAgICBpZiAobmVsZW0gPCAxKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgaWYgKG5lbGVtID4gYXJ5Lmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBzaXplID0gUChhcnkubGVuZ3RoLCBuZWxlbSksXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2NtYicpO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ3BlcicpO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIHtcbiAgICAgICAgICAgIHZhbHVlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY21iID0gY29tYmluYXRpb24oYXJ5LCBuZWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXIgPSBfcGVybXV0YXRpb24odGhpcy5jbWIubmV4dCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5wZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbWIgPSB0aGlzLmNtYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY21iKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyID0gX3Blcm11dGF0aW9uKGNtYik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcblxuICAgIHZhciBQQyA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAgICAgZm9yICh2YXIgbiA9IDE7IG4gPD0gbTsgbisrKSB7XG4gICAgICAgICAgICB2YXIgcCA9IFAobSxuKTtcbiAgICAgICAgICAgIHRvdGFsICs9IHA7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9O1xuICAgIC8vIHdoaWNoIGlzIHJlYWxseSBhIHBlcm11dGF0aW9uIG9mIGNvbWJpbmF0aW9uXG4gICAgdmFyIHBlcm11dGF0aW9uQ29tYmluYXRpb24gPSBmdW5jdGlvbihhcnksIGZ1bikge1xuICAgICAgICAvLyBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIC8vIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICAvLyBpZiAobmVsZW0gPiBhcnkubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIHNpemUgPSBQQyhhcnkubGVuZ3RoKSxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnY21iJyk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAncGVyJyk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnbmVsZW0nKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5lbGVtID0gMTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIG5lbGVtOiBcIiArIHRoaXMubmVsZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY21iID0gY29tYmluYXRpb24oYXJ5LCB0aGlzLm5lbGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlciA9IF9wZXJtdXRhdGlvbih0aGlzLmNtYi5uZXh0KCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnBlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNtYiA9IHRoaXMuY21iLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVsZW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW5jcmVtZW50IG5lbGVtOiBcIiArIHRoaXMubmVsZW0gKyBcIiB2cyBcIiArIGFyeS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVsZW0gPiBhcnkubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNtYiA9IGNvbWJpbmF0aW9uKGFyeSwgdGhpcy5uZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbWIgPSB0aGlzLmNtYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNtYikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyID0gX3Blcm11dGF0aW9uKGNtYik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcbiAgICAvKiBDYXJ0ZXNpYW4gUHJvZHVjdCAqL1xuICAgIHZhciBhcnJheVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBjYXJ0ZXNpYW5Qcm9kdWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICBzaXplID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24ocCwgYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwICogYS5sZW5ndGg7XG4gICAgICAgICAgICB9LCAxKSxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpbSA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgdGhhdCA9IE9iamVjdC5jcmVhdGUoYXJncywge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoIXNpemUpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgZGltOiBkaW0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgZCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICg7IGQgPCBkaW07IGQrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGFyZ3VtZW50c1tkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gdGhpc1tkXS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tkXVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGQgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoOyBkIDwgZGltOyBkKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSB0aGlzW2RdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuICUgbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tkXVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIG4gLT0gaTtcbiAgICAgICAgICAgICAgICAgICAgbiAvPSBsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gc2l6ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLm50aCh0aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgLyogYmFzZU4gKi9cbiAgICB2YXIgYmFzZU4gPSBmdW5jdGlvbihhcnksIG5lbGVtLCBmdW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgYmFzZSA9IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgc2l6ZSA9IE1hdGgucG93KGJhc2UsIG5lbGVtKTtcbiAgICAgICAgdmFyIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVsZW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG4gJSBiYXNlO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnlbZF0pXG4gICAgICAgICAgICAgICAgICAgIG4gLT0gZDsgbiAvPSBiYXNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5udGgodGhpcy5pbmRleCsrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIChmdW4pID09PSAnZnVuY3Rpb24nKSA/IHRoYXQubWFwKGZ1bikgOiB0aGF0O1xuICAgIH07XG5cbiAgICAvKiBleHBvcnQgKi9cbiAgICB2YXIgQ29tYmluYXRvcmljcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgYWRkUHJvcGVydGllcyhDb21iaW5hdG9yaWNzLCB7XG4gICAgICAgIEM6IEMsXG4gICAgICAgIFA6IFAsXG4gICAgICAgIGZhY3RvcmlhbDogZmFjdG9yaWFsLFxuICAgICAgICBmYWN0b3JhZGljOiBmYWN0b3JhZGljLFxuICAgICAgICBjYXJ0ZXNpYW5Qcm9kdWN0OiBjYXJ0ZXNpYW5Qcm9kdWN0LFxuICAgICAgICBjb21iaW5hdGlvbjogY29tYmluYXRpb24sXG4gICAgICAgIGJpZ0NvbWJpbmF0aW9uOiBiaWdDb21iaW5hdGlvbixcbiAgICAgICAgcGVybXV0YXRpb246IHBlcm11dGF0aW9uLFxuICAgICAgICBwZXJtdXRhdGlvbkNvbWJpbmF0aW9uOiBwZXJtdXRhdGlvbkNvbWJpbmF0aW9uLFxuICAgICAgICBwb3dlcjogcG93ZXIsXG4gICAgICAgIGJhc2VOOiBiYXNlTixcbiAgICAgICAgVkVSU0lPTjogdmVyc2lvblxuICAgIH0pO1xuICAgIHJldHVybiBDb21iaW5hdG9yaWNzO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanMtY29tYmluYXRvcmljcy9jb21iaW5hdG9yaWNzLmpzXG4gKiogbW9kdWxlIGlkID0gMjM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJpbXBvcnQgTGF5ZXJBc3NpZ25tZW50IGZyb20gJ2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3VzZXItZGVmaW5lZCdcblxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gKGdyYXBoKSA9PiB7XG4gIHJldHVybiBuZXcgTGF5ZXJBc3NpZ25tZW50KClcbiAgICAuZigodSkgPT4ge1xuICAgICAgY29uc3QgZCA9IGdyYXBoLnZlcnRleCh1KVxuICAgICAgaWYgKGQuZHVtbXkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmdyYXBoLmluVmVydGljZXModSkubWFwKCh2KSA9PiBncmFwaC52ZXJ0ZXgodikubGF5ZXJPcmRlcikpICogMiArIDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkLmxheWVyT3JkZXIgKiAyXG4gICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGF5ZXJBc3NpZ25tZW50XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9sYXllci1hc3NpZ25tZW50LmpzXG4gKiovIiwiY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hY2Nlc3NvcicpXG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBVc2VyRGVmaW5lZCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgZjogKCkgPT4gMFxuICAgIH0pXG4gIH1cblxuICBjYWxsIChnKSB7XG4gICAgY29uc3QgZiA9IHByaXZhdGVzLmdldCh0aGlzKS5mXG4gICAgY29uc3QgbGF5ZXJzID0ge31cbiAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICBsYXllcnNbdV0gPSBmKHUpXG4gICAgfVxuICAgIHJldHVybiBsYXllcnNcbiAgfVxuXG4gIGYgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2YnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyRGVmaW5lZFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvdXNlci1kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gMjM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9