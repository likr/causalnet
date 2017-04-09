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
	
	var _graph = __webpack_require__(546);
	
	var _graph2 = _interopRequireDefault(_graph);
	
	var _copy = __webpack_require__(549);
	
	var _copy2 = _interopRequireDefault(_copy);
	
	var _sugiyama = __webpack_require__(550);
	
	var _sugiyama2 = _interopRequireDefault(_sugiyama);
	
	var _edgeConcentration = __webpack_require__(573);
	
	var _edgeConcentration2 = _interopRequireDefault(_edgeConcentration);
	
	var _rectangular = __webpack_require__(574);
	
	var _rectangular2 = _interopRequireDefault(_rectangular);
	
	var _newbery = __webpack_require__(575);
	
	var _newbery2 = _interopRequireDefault(_newbery);
	
	var _mbea = __webpack_require__(576);
	
	var _mbea2 = _interopRequireDefault(_mbea);
	
	var _quasiBicliqueMining = __webpack_require__(577);
	
	var _quasiBicliqueMining2 = _interopRequireDefault(_quasiBicliqueMining);
	
	var _completeQb = __webpack_require__(578);
	
	var _completeQb2 = _interopRequireDefault(_completeQb);
	
	var _biclusteringOptions = __webpack_require__(505);
	
	var _biclusteringOptions2 = _interopRequireDefault(_biclusteringOptions);
	
	var _layerAssignment = __webpack_require__(580);
	
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
	
	var transform = function transform(graph, options) {
	  var filteredVertices = options.filteredVertices;
	  var biclusteringOption = options.biclusteringOption;
	  var epsilon = options.epsilon;
	
	  if (filteredVertices.size > 0) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = graph.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var u = _step.value;
	
	        if (!filteredVertices.has(u)) {
	          graph.removeVertex(u);
	        }
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
	  }
	  if (biclusteringOption === _biclusteringOptions2.default.NONE.value) {
	    return graph;
	  }
	  var transformer = new _edgeConcentration2.default().layerAssignment((0, _layerAssignment2.default)(graph)).idGenerator(function (graph, source, target) {
	    source = Array.from(source);
	    source.sort();
	    target = Array.from(target);
	    target.sort();
	    return source.join(',') + ':' + target.join(',');
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
	        return (0, _quasiBicliqueMining2.default)(graph, h1, h2, epsilon);
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
	
	var layout = function layout(graph, options) {
	  var layerMargin = options.layerMargin;
	  var vertexMargin = options.vertexMargin;
	
	  var transformedGraph = transform(graph, options);
	  var layouter = new _sugiyama2.default().layerAssignment((0, _layerAssignment2.default)(transformedGraph)).layerMargin(layerMargin).vertexWidth(function (_ref5) {
	    var d = _ref5.d;
	    return d.dummy ? 25 : 160;
	  }).vertexHeight(function (_ref6) {
	    var d = _ref6.d;
	    return d.dummy ? 10 : 20;
	  }).vertexMargin(vertexMargin).edgeWidth(function () {
	    return 3;
	  }).edgeMargin(3).edgeBundling(true);
	  var positions = layouter.layout(transformedGraph);
	
	  var vertices = [];
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = transformedGraph.vertices()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var u = _step2.value;
	
	      var d = transformedGraph.vertex(u);
	      var neighbors = new Set();
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = transformedGraph.inVertices(u)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var v = _step4.value;
	
	          neighbors.add(v);
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
	
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;
	
	      try {
	        for (var _iterator5 = transformedGraph.outVertices(u)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var _v = _step5.value;
	
	          neighbors.add(_v);
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }
	
	      d.neighbors = Array.from(neighbors);
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
	
	  var edges = [];
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;
	
	  try {
	    for (var _iterator3 = transformedGraph.edges()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var _step3$value = _slicedToArray(_step3.value, 2);
	
	      var _u = _step3$value[0];
	      var _v2 = _step3$value[1];
	
	      if (positions.edges[_u][_v2]) {
	        var _d = transformedGraph.edge(_u, _v2);
	        var ud = transformedGraph.vertex(_u);
	        var vd = transformedGraph.vertex(_v2);
	        var _positions$edges$_u$_ = positions.edges[_u][_v2];
	        var points = _positions$edges$_u$_.points;
	        var width = _positions$edges$_u$_.width;
	        var reversed = _positions$edges$_u$_.reversed;
	
	        while (points.length < 6) {
	          points.push(points[points.length - 1]);
	        }
	        var opacity = void 0;
	        if (ud.dummy) {
	          opacity = edgeCount(ud.U, graph.inVertices(_v2)) / ud.U.length;
	        } else if (vd.dummy) {
	          opacity = edgeCount(vd.L, graph.outVertices(_u)) / vd.L.length;
	        } else {
	          opacity = 1;
	        }
	        edges.push({ u: _u, v: _v2, ud: ud, vd: vd, d: _d, points: points, reversed: reversed, width: width, opacity: opacity });
	      }
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
	
	  return Object.assign({ vertices: vertices, edges: edges }, calcSize(vertices));
	};
	
	onmessage = function onmessage(_ref7) {
	  var data = _ref7.data;
	  var vertices = data.vertices;
	  var edges = data.edges;
	  var options = data.options;
	
	  var graph = new _graph2.default();
	  var _iteratorNormalCompletion6 = true;
	  var _didIteratorError6 = false;
	  var _iteratorError6 = undefined;
	
	  try {
	    for (var _iterator6 = vertices[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	      var _step6$value = _step6.value;
	      var u = _step6$value.u;
	      var d = _step6$value.d;
	
	      graph.addVertex(u, d);
	    }
	  } catch (err) {
	    _didIteratorError6 = true;
	    _iteratorError6 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion6 && _iterator6.return) {
	        _iterator6.return();
	      }
	    } finally {
	      if (_didIteratorError6) {
	        throw _iteratorError6;
	      }
	    }
	  }
	
	  var _iteratorNormalCompletion7 = true;
	  var _didIteratorError7 = false;
	  var _iteratorError7 = undefined;
	
	  try {
	    for (var _iterator7 = edges[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	      var _step7$value = _step7.value;
	      var u = _step7$value.u;
	      var v = _step7$value.v;
	      var d = _step7$value.d;
	
	      graph.addEdge(u, v, d);
	    }
	  } catch (err) {
	    _didIteratorError7 = true;
	    _iteratorError7 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion7 && _iterator7.return) {
	        _iterator7.return();
	      }
	    } finally {
	      if (_didIteratorError7) {
	        throw _iteratorError7;
	      }
	    }
	  }
	
	  options.filteredVertices = new Set(options.filteredVertices);
	
	  postMessage(layout(graph, options));
	};

/***/ },

/***/ 505:
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

/***/ 546:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(547)


/***/ },

/***/ 547:
/***/ function(module, exports, __webpack_require__) {

	const AbstractGraph = __webpack_require__(548)
	
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

/***/ 548:
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

/***/ 549:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(547)
	
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

/***/ 550:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(546)
	const accessor = __webpack_require__(551)
	const connectedComponents = __webpack_require__(552)
	const groupLayers = __webpack_require__(553)
	const cycleRemoval = __webpack_require__(554)
	const layerAssignment = __webpack_require__(557)
	const normalize = __webpack_require__(560)
	const crossingReduction = __webpack_require__(561)
	const positionAssignment = __webpack_require__(565)
	const bundleEdges = __webpack_require__(572)
	
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

/***/ 551:
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

/***/ 552:
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

/***/ 553:
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

/***/ 554:
/***/ function(module, exports, __webpack_require__) {

	const CycleRemoval = __webpack_require__(555)
	
	module.exports = {CycleRemoval}


/***/ },

/***/ 555:
/***/ function(module, exports, __webpack_require__) {

	const cycleEdges = __webpack_require__(556)
	
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

/***/ 556:
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

/***/ 557:
/***/ function(module, exports, __webpack_require__) {

	const LongestPath = __webpack_require__(558)
	const QuadHeuristic = __webpack_require__(559)
	
	module.exports = {LongestPath, QuadHeuristic}


/***/ },

/***/ 558:
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

/***/ 559:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(551)
	const LongestPath = __webpack_require__(558)
	
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

/***/ 560:
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

/***/ 561:
/***/ function(module, exports, __webpack_require__) {

	const LayerSweep = __webpack_require__(562)
	
	module.exports = {LayerSweep}


/***/ },

/***/ 562:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(551)
	const baryCenter = __webpack_require__(563)
	
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

/***/ 563:
/***/ function(module, exports, __webpack_require__) {

	const layerMatrix = __webpack_require__(564)
	
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

/***/ 564:
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

/***/ 565:
/***/ function(module, exports, __webpack_require__) {

	const Brandes = __webpack_require__(566)
	
	module.exports = {Brandes}


/***/ },

/***/ 566:
/***/ function(module, exports, __webpack_require__) {

	const markConflicts = __webpack_require__(567)
	const verticalAlignment = __webpack_require__(569)
	const horizontalCompaction = __webpack_require__(571)
	
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

/***/ 567:
/***/ function(module, exports, __webpack_require__) {

	const layerEdges = __webpack_require__(568)
	
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

/***/ 568:
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

/***/ 569:
/***/ function(module, exports, __webpack_require__) {

	const median = __webpack_require__(570)
	
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

/***/ 570:
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

/***/ 571:
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

/***/ 572:
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

/***/ 573:
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(546)
	const accessor = __webpack_require__(551)
	const cycleRemoval = __webpack_require__(554)
	const layerAssignment = __webpack_require__(557)
	const groupLayers = __webpack_require__(553)
	const rectangular = __webpack_require__(574)
	
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
	    const w = idGenerator(g, concentration.source, concentration.target)
	    if (g.vertex(w)) {
	      continue
	    }
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

/***/ 574:
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

/***/ 575:
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

/***/ 576:
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

/***/ 577:
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

/***/ 578:
/***/ function(module, exports, __webpack_require__) {

	const {combination} = __webpack_require__(579)
	
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

/***/ 579:
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

/***/ 580:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _userDefined = __webpack_require__(581);
	
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

/***/ 581:
/***/ function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(551)
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmViOTc2ODdkMzQzNzQzZmJjMmI/NzkxZiIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9sYXlvdXQtd29ya2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaWNsdXN0ZXJpbmctb3B0aW9ucy5qcz84N2Y0Iiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL211dGFibGUtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvYWJzdHJhY3QtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2Nvbm5lY3RlZC1jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1yZW1vdmFsLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtZWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L2xvbmdlc3QtcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL25vcm1hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2xheWVyLXN3ZWVwLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9iYXJ5LWNlbnRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvbWFyay1jb25mbGljdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1lZGdlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvdmVydGljYWwtYWxpZ25tZW50LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbWVkaWFuLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9ob3Jpem9udGFsLWNvbXBhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvYnVuZGxlLWVkZ2VzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcmVjdGFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL25ld2JlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL21iZWEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vY29tcGxldGUtcWIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb21iaW5hdG9yaWNzL2NvbWJpbmF0b3JpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xheWVyLWFzc2lnbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC91c2VyLWRlZmluZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztB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Q0E7O0FBRUE7Ozs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNURBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQywyQkFBMkI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWMsZUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQzVKQSxRQUFPLFlBQVk7O0FBRW5CO0FBQ0E7QUFDQSwwQkFBeUIsT0FBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLGtCQUFrQixHQUFHLGtCQUFrQjtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLHVCQUF1QjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDLGVBQWU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsT0FBTztBQUM5QjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxlQUFjLEdBQUc7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCLEdBQUc7QUFDekI7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsR0FBRztBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLFFBQVE7QUFDM0M7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxRQUFRO0FBQ25EO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLG1CQUFtQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBMkMsU0FBUztBQUNwRDtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFdBQVc7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsY0FBYztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsV0FBVztBQUMxQztBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7Ozs7Ozs7Ozs7Ozs7O0FDN2dCRDs7Ozs7Ozs7QUFFQSxLQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLEtBQUQsRUFBVztBQUNqQyxVQUFPLDRCQUNKLENBREksQ0FDRixVQUFDLENBQUQsRUFBTztBQUNSLFNBQU0sSUFBSSxNQUFNLE1BQU4sQ0FBYSxDQUFiLENBQVY7QUFDQSxTQUFJLEVBQUUsS0FBTixFQUFhO0FBQ1gsY0FBTyxLQUFLLEdBQUwsZ0NBQVksTUFBTSxVQUFOLENBQWlCLENBQWpCLEVBQW9CLEdBQXBCLENBQXdCLFVBQUMsQ0FBRDtBQUFBLGdCQUFPLE1BQU0sTUFBTixDQUFhLENBQWIsRUFBZ0IsVUFBdkI7QUFBQSxRQUF4QixDQUFaLEtBQTBFLENBQTFFLEdBQThFLENBQXJGO0FBQ0QsTUFGRCxNQUVPO0FBQ0wsY0FBTyxFQUFFLFVBQUYsR0FBZSxDQUF0QjtBQUNEO0FBQ0YsSUFSSSxDQUFQO0FBU0QsRUFWRDs7bUJBWWUsZTs7Ozs7OztBQ2RmOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoibGF5b3V0LXdvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmViOTc2ODdkMzQzNzQzZmJjMmJcbiAqKi8iLCIvKiBlc2xpbnQtZW52IHdvcmtlciAqL1xuXG5pbXBvcnQgR3JhcGggZnJvbSAnZWdyYXBoL2dyYXBoJ1xuaW1wb3J0IGNvcHkgZnJvbSAnZWdyYXBoL2dyYXBoL2NvcHknXG5pbXBvcnQgTGF5b3V0ZXIgZnJvbSAnZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hJ1xuaW1wb3J0IEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXIgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbidcbmltcG9ydCByZWN0YW5ndWxhciBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3JlY3Rhbmd1bGFyJ1xuaW1wb3J0IG5ld2JlcnkgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9uZXdiZXJ5J1xuaW1wb3J0IG1iZWEgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9tYmVhJ1xuaW1wb3J0IHF1YXNpQmljbGlxdWVNaW5pbmcgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9xdWFzaS1iaWNsaXF1ZS1taW5pbmcnXG5pbXBvcnQgY29tcGxldGVRQiBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2NvbXBsZXRlLXFiJ1xuaW1wb3J0IGJpY2x1c3RlcmluZ09wdGlvbnMgZnJvbSAnLi4vYmljbHVzdGVyaW5nLW9wdGlvbnMnXG5pbXBvcnQgbGF5ZXJBc3NpZ25tZW50IGZyb20gJy4uL3V0aWxzL2xheWVyLWFzc2lnbm1lbnQnXG5cbmNvbnN0IGNhbGNTaXplID0gKHZlcnRpY2VzKSA9PiB7XG4gIGNvbnN0IGxlZnQgPSBNYXRoLm1pbigwLCAuLi52ZXJ0aWNlcy5tYXAoKHt4LCB3aWR0aH0pID0+IHggLSB3aWR0aCAvIDIpKVxuICBjb25zdCByaWdodCA9IE1hdGgubWF4KDAsIC4uLnZlcnRpY2VzLm1hcCgoe3gsIHdpZHRofSkgPT4geCArIHdpZHRoIC8gMikpXG4gIGNvbnN0IHRvcCA9IE1hdGgubWluKDAsIC4uLnZlcnRpY2VzLm1hcCgoe3ksIGhlaWdodH0pID0+IHkgLSBoZWlnaHQgLyAyKSlcbiAgY29uc3QgYm90dG9tID0gTWF0aC5tYXgoMCwgLi4udmVydGljZXMubWFwKCh7eSwgaGVpZ2h0fSkgPT4geSArIGhlaWdodCAvIDIpKVxuICByZXR1cm4ge1xuICAgIHdpZHRoOiByaWdodCAtIGxlZnQsXG4gICAgaGVpZ2h0OiBib3R0b20gLSB0b3BcbiAgfVxufVxuXG5jb25zdCBlZGdlQ291bnQgPSAodmVydGljZXMsIG5laWdoYm9ycykgPT4ge1xuICByZXR1cm4gbmVpZ2hib3JzLmZpbHRlcigodSkgPT4gdmVydGljZXMuaW5kZXhPZih1KSA+PSAwKS5sZW5ndGhcbn1cblxuY29uc3QgdHJhbnNmb3JtID0gKGdyYXBoLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtmaWx0ZXJlZFZlcnRpY2VzLCBiaWNsdXN0ZXJpbmdPcHRpb24sIGVwc2lsb259ID0gb3B0aW9uc1xuICBpZiAoZmlsdGVyZWRWZXJ0aWNlcy5zaXplID4gMCkge1xuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgICBpZiAoIWZpbHRlcmVkVmVydGljZXMuaGFzKHUpKSB7XG4gICAgICAgIGdyYXBoLnJlbW92ZVZlcnRleCh1KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoYmljbHVzdGVyaW5nT3B0aW9uID09PSBiaWNsdXN0ZXJpbmdPcHRpb25zLk5PTkUudmFsdWUpIHtcbiAgICByZXR1cm4gZ3JhcGhcbiAgfVxuICBjb25zdCB0cmFuc2Zvcm1lciA9IG5ldyBFZGdlQ29uY2VudHJhdGlvblRyYW5zZm9ybWVyKClcbiAgICAubGF5ZXJBc3NpZ25tZW50KGxheWVyQXNzaWdubWVudChncmFwaCkpXG4gICAgLmlkR2VuZXJhdG9yKChncmFwaCwgc291cmNlLCB0YXJnZXQpID0+IHtcbiAgICAgIHNvdXJjZSA9IEFycmF5LmZyb20oc291cmNlKVxuICAgICAgc291cmNlLnNvcnQoKVxuICAgICAgdGFyZ2V0ID0gQXJyYXkuZnJvbSh0YXJnZXQpXG4gICAgICB0YXJnZXQuc29ydCgpXG4gICAgICByZXR1cm4gYCR7c291cmNlLmpvaW4oJywnKX06JHt0YXJnZXQuam9pbignLCcpfWBcbiAgICB9KVxuICAgIC5kdW1teSgoKSA9PiAoe1xuICAgICAgZHVtbXk6IHRydWUsXG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGNvbG9yOiAnIzg4OCdcbiAgICB9KSlcbiAgc3dpdGNoIChiaWNsdXN0ZXJpbmdPcHRpb24pIHtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuRURHRV9DT05DRU5UUkFUSU9OLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKHJlY3Rhbmd1bGFyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuTkVXQkVSWS52YWx1ZTpcbiAgICAgIHRyYW5zZm9ybWVyLm1ldGhvZChuZXdiZXJ5KVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuTUJFQS52YWx1ZTpcbiAgICAgIHRyYW5zZm9ybWVyLm1ldGhvZChtYmVhKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuUVVBU0lfQklDTElRVUVTLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKChncmFwaCwgaDEsIGgyKSA9PiBxdWFzaUJpY2xpcXVlTWluaW5nKGdyYXBoLCBoMSwgaDIsIGVwc2lsb24pKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuQ09NUExFVEVfUVVBU0lfQklDTElRVUVTLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKChncmFwaCwgaDEsIGgyKSA9PiBjb21wbGV0ZVFCKGdyYXBoLCBoMSwgaDIsIDEsIDMpKVxuICAgICAgYnJlYWtcbiAgfVxuICByZXR1cm4gdHJhbnNmb3JtZXIudHJhbnNmb3JtKGNvcHkoZ3JhcGgpKVxufVxuXG5jb25zdCBsYXlvdXQgPSAoZ3JhcGgsIG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge2xheWVyTWFyZ2luLCB2ZXJ0ZXhNYXJnaW59ID0gb3B0aW9uc1xuICBjb25zdCB0cmFuc2Zvcm1lZEdyYXBoID0gdHJhbnNmb3JtKGdyYXBoLCBvcHRpb25zKVxuICBjb25zdCBsYXlvdXRlciA9IG5ldyBMYXlvdXRlcigpXG4gICAgLmxheWVyQXNzaWdubWVudChsYXllckFzc2lnbm1lbnQodHJhbnNmb3JtZWRHcmFwaCkpXG4gICAgLmxheWVyTWFyZ2luKGxheWVyTWFyZ2luKVxuICAgIC52ZXJ0ZXhXaWR0aCgoe2R9KSA9PiBkLmR1bW15ID8gMjUgOiAxNjApXG4gICAgLnZlcnRleEhlaWdodCgoe2R9KSA9PiBkLmR1bW15ID8gMTAgOiAyMClcbiAgICAudmVydGV4TWFyZ2luKHZlcnRleE1hcmdpbilcbiAgICAuZWRnZVdpZHRoKCgpID0+IDMpXG4gICAgLmVkZ2VNYXJnaW4oMylcbiAgICAuZWRnZUJ1bmRsaW5nKHRydWUpXG4gIGNvbnN0IHBvc2l0aW9ucyA9IGxheW91dGVyLmxheW91dCh0cmFuc2Zvcm1lZEdyYXBoKVxuXG4gIGNvbnN0IHZlcnRpY2VzID0gW11cbiAgZm9yIChjb25zdCB1IG9mIHRyYW5zZm9ybWVkR3JhcGgudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGQgPSB0cmFuc2Zvcm1lZEdyYXBoLnZlcnRleCh1KVxuICAgIGNvbnN0IG5laWdoYm9ycyA9IG5ldyBTZXQoKVxuICAgIGZvciAoY29uc3QgdiBvZiB0cmFuc2Zvcm1lZEdyYXBoLmluVmVydGljZXModSkpIHtcbiAgICAgIG5laWdoYm9ycy5hZGQodilcbiAgICB9XG4gICAgZm9yIChjb25zdCB2IG9mIHRyYW5zZm9ybWVkR3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICAgIG5laWdoYm9ycy5hZGQodilcbiAgICB9XG4gICAgZC5uZWlnaGJvcnMgPSBBcnJheS5mcm9tKG5laWdoYm9ycylcbiAgICBpZiAoZC5kdW1teSkge1xuICAgICAgZC5VID0gdHJhbnNmb3JtZWRHcmFwaC5pblZlcnRpY2VzKHUpXG4gICAgICBkLkwgPSB0cmFuc2Zvcm1lZEdyYXBoLm91dFZlcnRpY2VzKHUpXG4gICAgfVxuICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBvc2l0aW9ucy52ZXJ0aWNlc1t1XVxuICAgIHZlcnRpY2VzLnB1c2goe3UsIGQsIHgsIHksIHdpZHRoLCBoZWlnaHR9KVxuICB9XG5cbiAgY29uc3QgZWRnZXMgPSBbXVxuICBmb3IgKGNvbnN0IFt1LCB2XSBvZiB0cmFuc2Zvcm1lZEdyYXBoLmVkZ2VzKCkpIHtcbiAgICBpZiAocG9zaXRpb25zLmVkZ2VzW3VdW3ZdKSB7XG4gICAgICBjb25zdCBkID0gdHJhbnNmb3JtZWRHcmFwaC5lZGdlKHUsIHYpXG4gICAgICBjb25zdCB1ZCA9IHRyYW5zZm9ybWVkR3JhcGgudmVydGV4KHUpXG4gICAgICBjb25zdCB2ZCA9IHRyYW5zZm9ybWVkR3JhcGgudmVydGV4KHYpXG4gICAgICBjb25zdCB7cG9pbnRzLCB3aWR0aCwgcmV2ZXJzZWR9ID0gcG9zaXRpb25zLmVkZ2VzW3VdW3ZdXG4gICAgICB3aGlsZSAocG9pbnRzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcG9pbnRzLnB1c2gocG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSlcbiAgICAgIH1cbiAgICAgIGxldCBvcGFjaXR5XG4gICAgICBpZiAodWQuZHVtbXkpIHtcbiAgICAgICAgb3BhY2l0eSA9IGVkZ2VDb3VudCh1ZC5VLCBncmFwaC5pblZlcnRpY2VzKHYpKSAvIHVkLlUubGVuZ3RoXG4gICAgICB9IGVsc2UgaWYgKHZkLmR1bW15KSB7XG4gICAgICAgIG9wYWNpdHkgPSBlZGdlQ291bnQodmQuTCwgZ3JhcGgub3V0VmVydGljZXModSkpIC8gdmQuTC5sZW5ndGhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wYWNpdHkgPSAxXG4gICAgICB9XG4gICAgICBlZGdlcy5wdXNoKHt1LCB2LCB1ZCwgdmQsIGQsIHBvaW50cywgcmV2ZXJzZWQsIHdpZHRoLCBvcGFjaXR5fSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7dmVydGljZXMsIGVkZ2VzfSwgY2FsY1NpemUodmVydGljZXMpKVxufVxuXG5vbm1lc3NhZ2UgPSAoe2RhdGF9KSA9PiB7XG4gIGNvbnN0IHt2ZXJ0aWNlcywgZWRnZXMsIG9wdGlvbnN9ID0gZGF0YVxuICBjb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpXG4gIGZvciAoY29uc3Qge3UsIGR9IG9mIHZlcnRpY2VzKSB7XG4gICAgZ3JhcGguYWRkVmVydGV4KHUsIGQpXG4gIH1cbiAgZm9yIChjb25zdCB7dSwgdiwgZH0gb2YgZWRnZXMpIHtcbiAgICBncmFwaC5hZGRFZGdlKHUsIHYsIGQpXG4gIH1cblxuICBvcHRpb25zLmZpbHRlcmVkVmVydGljZXMgPSBuZXcgU2V0KG9wdGlvbnMuZmlsdGVyZWRWZXJ0aWNlcylcblxuICBwb3N0TWVzc2FnZShsYXlvdXQoZ3JhcGgsIG9wdGlvbnMpKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvd29ya2Vycy9sYXlvdXQtd29ya2VyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xuICBFREdFX0NPTkNFTlRSQVRJT046IHtuYW1lOiAnRWRnZSBDb25jZW50cmF0aW9uJywgdmFsdWU6ICdlZGdlLWNvbmNlbnRyYXRpb24nfSxcbiAgTkVXQkVSWToge25hbWU6ICdOZXdiZXJ5JywgdmFsdWU6ICduZXdiZXJ5J30sXG4gIE1CRUE6IHtuYW1lOiAnTUJFQScsIHZhbHVlOiAnbWJlYSd9LFxuICBRVUFTSV9CSUNMSVFVRVM6IHtuYW1lOiAnUXVhc2ktYmljbGlxdWVzJywgdmFsdWU6ICdxdWFzaS1iaWNsaXF1ZXMnfSxcbiAgQ09NUExFVEVfUVVBU0lfQklDTElRVUVTOiB7bmFtZTogJ0NvbXBsZXRlIFF1YXNpLWJpY2xpcXVlcycsIHZhbHVlOiAnY29tcGxldGUtcXVhc2ktYmljbGlxdWVzJ30sXG4gIE5PTkU6IHtuYW1lOiAnTm9uZScsIHZhbHVlOiAnbm9uZSd9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaWNsdXN0ZXJpbmctb3B0aW9ucy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tdXRhYmxlLWdyYXBoJylcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDU0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQWJzdHJhY3RHcmFwaCA9IHJlcXVpcmUoJy4vYWJzdHJhY3QtZ3JhcGgnKVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY29uc3QgcCA9IChzZWxmKSA9PiBwcml2YXRlcy5nZXQoc2VsZilcblxuY2xhc3MgTXV0YWJsZUdyYXBoIGV4dGVuZHMgQWJzdHJhY3RHcmFwaCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIHZlcnRpY2VzOiBuZXcgTWFwKCksXG4gICAgICBudW1WZXJ0aWNlczogMCxcbiAgICAgIG51bUVkZ2VzOiAwXG4gICAgfSlcbiAgfVxuXG4gIHZlcnRleCAodSkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gcCh0aGlzKS52ZXJ0aWNlc1xuICAgIGlmICh2ZXJ0aWNlcy5nZXQodSkpIHtcbiAgICAgIHJldHVybiB2ZXJ0aWNlcy5nZXQodSkuZGF0YVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZWRnZSAodSwgdikge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gcCh0aGlzKS52ZXJ0aWNlc1xuICAgIGlmICh2ZXJ0aWNlcy5nZXQodSkgJiYgdmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLmdldCh2KSkge1xuICAgICAgcmV0dXJuIHZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5nZXQodilcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZlcnRpY2VzICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwKHRoaXMpLnZlcnRpY2VzLmtleXMoKSlcbiAgfVxuXG4gIG91dFZlcnRpY2VzICh1KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMua2V5cygpKVxuICB9XG5cbiAgaW5WZXJ0aWNlcyAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHAodGhpcykudmVydGljZXMuZ2V0KHUpLmluVmVydGljZXMua2V5cygpKVxuICB9XG5cbiAgbnVtVmVydGljZXMgKCkge1xuICAgIHJldHVybiBwKHRoaXMpLm51bVZlcnRpY2VzXG4gIH1cblxuICBudW1FZGdlcyAoKSB7XG4gICAgcmV0dXJuIHAodGhpcykubnVtRWRnZXNcbiAgfVxuXG4gIG91dERlZ3JlZSAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5zaXplXG4gIH1cblxuICBpbkRlZ3JlZSAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5pblZlcnRpY2VzLnNpemVcbiAgfVxuXG4gIGFkZFZlcnRleCAodSwgb2JqID0ge30pIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICBwKHRoaXMpLnZlcnRpY2VzLnNldCh1LCB7XG4gICAgICBvdXRWZXJ0aWNlczogbmV3IE1hcCgpLFxuICAgICAgaW5WZXJ0aWNlczogbmV3IE1hcCgpLFxuICAgICAgZGF0YTogb2JqXG4gICAgfSlcbiAgICBwKHRoaXMpLm51bVZlcnRpY2VzKytcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkRWRnZSAodSwgdiwgb2JqID0ge30pIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICBpZiAodGhpcy52ZXJ0ZXgodikgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dn1gKVxuICAgIH1cbiAgICBpZiAodGhpcy5lZGdlKHUsIHYpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZWQgZWRnZTogKCR7dX0sICR7dn0pYClcbiAgICB9XG4gICAgcCh0aGlzKS5udW1FZGdlcysrXG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMuc2V0KHYsIG9iailcbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh2KS5pblZlcnRpY2VzLnNldCh1LCBvYmopXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZVZlcnRleCAodSkge1xuICAgIGZvciAoY29uc3QgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICB0aGlzLnJlbW92ZUVkZ2UodSwgdilcbiAgICB9XG4gICAgZm9yIChjb25zdCB2IG9mIHRoaXMuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgdGhpcy5yZW1vdmVFZGdlKHYsIHUpXG4gICAgfVxuICAgIHAodGhpcykudmVydGljZXMuZGVsZXRlKHUpXG4gICAgcCh0aGlzKS5udW1WZXJ0aWNlcy0tXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZUVkZ2UgKHUsIHYpIHtcbiAgICBpZiAodGhpcy5lZGdlKHUsIHYpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBlZGdlOiAoJHt1fSwgJHt2fSlgKVxuICAgIH1cbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5kZWxldGUodilcbiAgICBwKHRoaXMpLnZlcnRpY2VzLmdldCh2KS5pblZlcnRpY2VzLmRlbGV0ZSh1KVxuICAgIHAodGhpcykubnVtRWRnZXMtLVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNdXRhYmxlR3JhcGhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9tdXRhYmxlLWdyYXBoLmpzXG4gKiogbW9kdWxlIGlkID0gNTQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjbGFzcyBBYnN0cmFjdEdyYXBoIHtcbiAgZWRnZXMgKCkge1xuICAgIGNvbnN0IGVkZ2VzID0gW11cbiAgICBmb3IgKGNvbnN0IHUgb2YgdGhpcy52ZXJ0aWNlcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBlZGdlcy5wdXNoKFt1LCB2XSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVkZ2VzXG4gIH1cblxuICAqIG91dEVkZ2VzICh1KSB7XG4gICAgZm9yIChsZXQgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICB5aWVsZCBbdSwgdl1cbiAgICB9XG4gIH1cblxuICAqIGluRWRnZXMgKHUpIHtcbiAgICBmb3IgKGxldCB2IG9mIHRoaXMuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgeWllbGQgW3YsIHVdXG4gICAgfVxuICB9XG5cbiAgdG9KU09OICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmVydGljZXM6IHRoaXMudmVydGljZXMoKS5tYXAoKHUpID0+ICh7dSwgZDogdGhpcy52ZXJ0ZXgodSl9KSksXG4gICAgICBlZGdlczogdGhpcy5lZGdlcygpLm1hcCgoW3UsIHZdKSA9PiAoe3UsIHYsIGQ6IHRoaXMuZWRnZSh1LCB2KX0pKVxuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0R3JhcGhcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9hYnN0cmFjdC1ncmFwaC5qc1xuICoqIG1vZHVsZSBpZCA9IDU0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgR3JhcGggPSByZXF1aXJlKCcuL211dGFibGUtZ3JhcGgnKVxuXG5jb25zdCBjb3B5ID0gKGcpID0+IHtcbiAgY29uc3QgbmV3R3JhcGggPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgbmV3R3JhcGguYWRkVmVydGV4KHUsIGcudmVydGV4KHUpKVxuICB9XG4gIGZvciAoY29uc3QgW3UsIHZdIG9mIGcuZWRnZXMoKSkge1xuICAgIG5ld0dyYXBoLmFkZEVkZ2UodSwgdiwgZy5lZGdlKHUsIHYpKVxuICB9XG4gIHJldHVybiBuZXdHcmFwaFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9ncmFwaC9jb3B5LmpzXG4gKiogbW9kdWxlIGlkID0gNTQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBHcmFwaCA9IHJlcXVpcmUoJy4uLy4uL2dyYXBoJylcbmNvbnN0IGFjY2Vzc29yID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvYWNjZXNzb3InKVxuY29uc3QgY29ubmVjdGVkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vbWlzYy9jb25uZWN0ZWQtY29tcG9uZW50cycpXG5jb25zdCBncm91cExheWVycyA9IHJlcXVpcmUoJy4vbWlzYy9ncm91cC1sYXllcnMnKVxuY29uc3QgY3ljbGVSZW1vdmFsID0gcmVxdWlyZSgnLi9jeWNsZS1yZW1vdmFsJylcbmNvbnN0IGxheWVyQXNzaWdubWVudCA9IHJlcXVpcmUoJy4vbGF5ZXItYXNzaWdubWVudCcpXG5jb25zdCBub3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZScpXG5jb25zdCBjcm9zc2luZ1JlZHVjdGlvbiA9IHJlcXVpcmUoJy4vY3Jvc3NpbmctcmVkdWN0aW9uJylcbmNvbnN0IHBvc2l0aW9uQXNzaWdubWVudCA9IHJlcXVpcmUoJy4vcG9zaXRpb24tYXNzaWdubWVudCcpXG5jb25zdCBidW5kbGVFZGdlcyA9IHJlcXVpcmUoJy4vYnVuZGxlLWVkZ2VzJylcblxuY29uc3QgaW5pdEdyYXBoID0gKGdPcmlnLCB7bHRvciwgdmVydGV4V2lkdGgsIHZlcnRleEhlaWdodCwgZWRnZVdpZHRoLCBsYXllck1hcmdpbiwgdmVydGV4TWFyZ2luLCB2ZXJ0ZXhMZWZ0TWFyZ2luLCB2ZXJ0ZXhSaWdodE1hcmdpbiwgdmVydGV4VG9wTWFyZ2luLCB2ZXJ0ZXhCb3R0b21NYXJnaW59KSA9PiB7XG4gIGNvbnN0IGcgPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHUgb2YgZ09yaWcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGQgPSBnT3JpZy52ZXJ0ZXgodSlcbiAgICBjb25zdCB3ID0gdmVydGV4V2lkdGgoe3UsIGR9KVxuICAgIGNvbnN0IGggPSB2ZXJ0ZXhIZWlnaHQoe3UsIGR9KVxuICAgIGNvbnN0IGhvcml6b250YWxNYXJnaW4gPSB2ZXJ0ZXhMZWZ0TWFyZ2luKHt1LCBkfSkgKyB2ZXJ0ZXhSaWdodE1hcmdpbih7dSwgZH0pXG4gICAgY29uc3QgdmVydGljYWxNYXJnaW4gPSB2ZXJ0ZXhUb3BNYXJnaW4oe3UsIGR9KSArIHZlcnRleEJvdHRvbU1hcmdpbih7dSwgZH0pXG4gICAgZy5hZGRWZXJ0ZXgodSwge1xuICAgICAgd2lkdGg6IGx0b3IgPyBoICsgdmVydGV4TWFyZ2luICsgdmVydGljYWxNYXJnaW4gOiB3ICsgbGF5ZXJNYXJnaW4gKyBob3Jpem9udGFsTWFyZ2luLFxuICAgICAgaGVpZ2h0OiBsdG9yID8gdyArIGxheWVyTWFyZ2luICsgaG9yaXpvbnRhbE1hcmdpbiA6IGggKyB2ZXJ0ZXhNYXJnaW4gKyB2ZXJ0aWNhbE1hcmdpbixcbiAgICAgIG9yaWdXaWR0aDogbHRvciA/IGggOiB3LFxuICAgICAgb3JpZ0hlaWdodDogbHRvciA/IHcgOiBoXG4gICAgfSlcbiAgfVxuICBmb3IgKGNvbnN0IFt1LCB2XSBvZiBnT3JpZy5lZGdlcygpKSB7XG4gICAgZy5hZGRFZGdlKHUsIHYsIHtcbiAgICAgIHdpZHRoOiBlZGdlV2lkdGgoe1xuICAgICAgICB1LFxuICAgICAgICB2LFxuICAgICAgICB1ZDogZ09yaWcudmVydGV4KHUpLFxuICAgICAgICB2ZDogZ09yaWcudmVydGV4KHYpLFxuICAgICAgICBkOiBnT3JpZy5lZGdlKHUsIHYpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGdcbn1cblxuY29uc3Qgc2ltcGxpZnkgPSAocG9pbnRzLCBsdG9yKSA9PiB7XG4gIGxldCBpbmRleCA9IDFcbiAgd2hpbGUgKGluZGV4IDwgcG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICBjb25zdCB4MCA9IGx0b3IgPyBwb2ludHNbaW5kZXhdWzFdIDogcG9pbnRzW2luZGV4XVswXVxuICAgIGNvbnN0IHgxID0gbHRvciA/IHBvaW50c1tpbmRleCArIDFdWzFdIDogcG9pbnRzW2luZGV4ICsgMV1bMF1cbiAgICBpZiAoeDAgPT09IHgxKSB7XG4gICAgICBwb2ludHMuc3BsaWNlKGluZGV4LCAyKVxuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCArPSAyXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHJldmVyc2VkID0gKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGNvbnN0IHggb2YgYXJyKSB7XG4gICAgcmVzdWx0LnVuc2hpZnQoeClcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGJ1aWxkUmVzdWx0ID0gKGcsIGxheWVycywgbHRvcikgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdmVydGljZXM6IHt9LFxuICAgIGVkZ2VzOiB7fVxuICB9XG4gIGNvbnN0IGxheWVySGVpZ2h0cyA9IFtdXG5cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIHJlc3VsdC5lZGdlc1t1XSA9IHt9XG4gIH1cblxuICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xuICAgIGxldCBtYXhIZWlnaHQgPSAtSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHUgb2YgbGF5ZXIpIHtcbiAgICAgIG1heEhlaWdodCA9IE1hdGgubWF4KG1heEhlaWdodCwgZy52ZXJ0ZXgodSkub3JpZ0hlaWdodCB8fCAwKVxuICAgIH1cbiAgICBsYXllckhlaWdodHMucHVzaChtYXhIZWlnaHQpXG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW2ldXG4gICAgY29uc3QgbGF5ZXJIZWlnaHQgPSBsYXllckhlaWdodHNbaV1cbiAgICBmb3IgKGNvbnN0IHUgb2YgbGF5ZXIpIHtcbiAgICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICAgIGlmICghdU5vZGUuZHVtbXkpIHtcbiAgICAgICAgcmVzdWx0LnZlcnRpY2VzW3VdID0ge1xuICAgICAgICAgIHg6IGx0b3IgPyB1Tm9kZS55IDogdU5vZGUueCxcbiAgICAgICAgICB5OiBsdG9yID8gdU5vZGUueCA6IHVOb2RlLnksXG4gICAgICAgICAgd2lkdGg6IGx0b3IgPyB1Tm9kZS5vcmlnSGVpZ2h0IDogdU5vZGUub3JpZ1dpZHRoLFxuICAgICAgICAgIGhlaWdodDogbHRvciA/IHVOb2RlLm9yaWdXaWR0aCA6IHVOb2RlLm9yaWdIZWlnaHQsXG4gICAgICAgICAgbGF5ZXI6IHVOb2RlLmxheWVyLFxuICAgICAgICAgIG9yZGVyOiB1Tm9kZS5vcmRlclxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCB2IG9mIGcub3V0VmVydGljZXModSkpIHtcbiAgICAgICAgICBjb25zdCBwb2ludHMgPSBsdG9yXG4gICAgICAgICAgICA/IFtbdU5vZGUueSArICh1Tm9kZS5vcmlnSGVpZ2h0IHx8IDApIC8gMiwgdU5vZGUueF0sIFt1Tm9kZS55ICsgbGF5ZXJIZWlnaHQgLyAyLCB1Tm9kZS54XV1cbiAgICAgICAgICAgIDogW1t1Tm9kZS54LCB1Tm9kZS55ICsgKHVOb2RlLm9yaWdIZWlnaHQgfHwgMCkgLyAyXSwgW3VOb2RlLngsIHVOb2RlLnkgKyBsYXllckhlaWdodCAvIDJdXVxuICAgICAgICAgIGxldCB3ID0gdlxuICAgICAgICAgIGxldCB3Tm9kZSA9IGcudmVydGV4KHcpXG4gICAgICAgICAgbGV0IGogPSBpICsgMVxuICAgICAgICAgIHdoaWxlICh3Tm9kZS5kdW1teSkge1xuICAgICAgICAgICAgaWYgKGx0b3IpIHtcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLnkgLSBsYXllckhlaWdodHNbal0gLyAyLCB3Tm9kZS54XSlcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLnkgKyBsYXllckhlaWdodHNbal0gLyAyLCB3Tm9kZS54XSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS54LCB3Tm9kZS55IC0gbGF5ZXJIZWlnaHRzW2pdIC8gMl0pXG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS54LCB3Tm9kZS55ICsgbGF5ZXJIZWlnaHRzW2pdIC8gMl0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ID0gZy5vdXRWZXJ0aWNlcyh3KVswXVxuICAgICAgICAgICAgd05vZGUgPSBnLnZlcnRleCh3KVxuICAgICAgICAgICAgaiArPSAxXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsdG9yKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueSAtIGxheWVySGVpZ2h0c1tqXSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLnkgLSAod05vZGUub3JpZ0hlaWdodCB8fCAwKSAvIDIsIHdOb2RlLnhdKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueCwgd05vZGUueSAtIGxheWVySGVpZ2h0c1tqXSAvIDJdKVxuICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLngsIHdOb2RlLnkgLSAod05vZGUub3JpZ0hlaWdodCB8fCAwKSAvIDJdKVxuICAgICAgICAgIH1cbiAgICAgICAgICBzaW1wbGlmeShwb2ludHMsIGx0b3IpXG4gICAgICAgICAgaWYgKGcuZWRnZSh1LCB2KS5yZXZlcnNlZCkge1xuICAgICAgICAgICAgcmVzdWx0LmVkZ2VzW3ddW3VdID0ge1xuICAgICAgICAgICAgICBwb2ludHM6IHJldmVyc2VkKHBvaW50cyksXG4gICAgICAgICAgICAgIHJldmVyc2VkOiB0cnVlLFxuICAgICAgICAgICAgICB3aWR0aDogZy5lZGdlKHUsIHYpLndpZHRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5lZGdlc1t1XVt3XSA9IHtcbiAgICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMsXG4gICAgICAgICAgICAgIHJldmVyc2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgd2lkdGg6IGcuZWRnZSh1LCB2KS53aWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgcHJpdmF0ZXMgPSBuZXcgV2Vha01hcCgpXG5cbmNsYXNzIFN1Z2l5YW1hTGF5b3V0ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIHZlcnRleFdpZHRoOiAoe2R9KSA9PiBkLndpZHRoLFxuICAgICAgdmVydGV4SGVpZ2h0OiAoe2R9KSA9PiBkLmhlaWdodCxcbiAgICAgIGVkZ2VXaWR0aDogKCkgPT4gMSxcbiAgICAgIGxheWVyTWFyZ2luOiAxMCxcbiAgICAgIHZlcnRleE1hcmdpbjogMTAsXG4gICAgICB2ZXJ0ZXhMZWZ0TWFyZ2luOiAoKSA9PiAwLFxuICAgICAgdmVydGV4UmlnaHRNYXJnaW46ICgpID0+IDAsXG4gICAgICB2ZXJ0ZXhUb3BNYXJnaW46ICgpID0+IDAsXG4gICAgICB2ZXJ0ZXhCb3R0b21NYXJnaW46ICgpID0+IDAsXG4gICAgICBlZGdlTWFyZ2luOiAxMCxcbiAgICAgIGx0b3I6IHRydWUsXG4gICAgICBlZGdlQnVuZGxpbmc6IGZhbHNlLFxuICAgICAgY3ljbGVSZW1vdmFsOiBuZXcgY3ljbGVSZW1vdmFsLkN5Y2xlUmVtb3ZhbCgpLFxuICAgICAgbGF5ZXJBc3NpZ25tZW50OiBuZXcgbGF5ZXJBc3NpZ25tZW50LlF1YWRIZXVyaXN0aWMoKSxcbiAgICAgIGNyb3NzaW5nUmVkdWN0aW9uOiBuZXcgY3Jvc3NpbmdSZWR1Y3Rpb24uTGF5ZXJTd2VlcCgpLFxuICAgICAgcG9zaXRpb25Bc3NpZ25tZW50OiBuZXcgcG9zaXRpb25Bc3NpZ25tZW50LkJyYW5kZXMoKVxuICAgIH0pXG4gIH1cblxuICBsYXlvdXQgKGdPcmlnKSB7XG4gICAgY29uc3QgZyA9IGluaXRHcmFwaChnT3JpZywge1xuICAgICAgdmVydGV4V2lkdGg6IHRoaXMudmVydGV4V2lkdGgoKSxcbiAgICAgIHZlcnRleEhlaWdodDogdGhpcy52ZXJ0ZXhIZWlnaHQoKSxcbiAgICAgIGVkZ2VXaWR0aDogdGhpcy5lZGdlV2lkdGgoKSxcbiAgICAgIGxheWVyTWFyZ2luOiB0aGlzLmxheWVyTWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhNYXJnaW46IHRoaXMudmVydGV4TWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhMZWZ0TWFyZ2luOiB0aGlzLnZlcnRleExlZnRNYXJnaW4oKSxcbiAgICAgIHZlcnRleFJpZ2h0TWFyZ2luOiB0aGlzLnZlcnRleFJpZ2h0TWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhUb3BNYXJnaW46IHRoaXMudmVydGV4VG9wTWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhCb3R0b21NYXJnaW46IHRoaXMudmVydGV4Qm90dG9tTWFyZ2luKCksXG4gICAgICBsdG9yOiB0aGlzLmx0b3IoKVxuICAgIH0pXG4gICAgdGhpcy5jeWNsZVJlbW92YWwoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJNYXAgPSB0aGlzLmxheWVyQXNzaWdubWVudCgpLmNhbGwoZylcbiAgICBjb25zdCBsYXllcnMgPSBncm91cExheWVycyhnLCBsYXllck1hcCwgdHJ1ZSlcbiAgICBub3JtYWxpemUoZywgbGF5ZXJzLCBsYXllck1hcCwgdGhpcy5lZGdlTWFyZ2luKCksIHRoaXMubGF5ZXJNYXJnaW4oKSlcbiAgICBjb25zdCBub3JtYWxpemVkTGF5ZXJzID0gbGF5ZXJzLm1hcCgoKSA9PiBbXSlcbiAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiBjb25uZWN0ZWRDb21wb25lbnRzKGcpKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoY29tcG9uZW50KVxuICAgICAgY29uc3QgY29tcG9uZW50TGF5ZXJzID0gbGF5ZXJzLm1hcCgoaCkgPT4gaC5maWx0ZXIoKHUpID0+IHZlcnRpY2VzLmhhcyh1KSkpXG4gICAgICB0aGlzLmNyb3NzaW5nUmVkdWN0aW9uKCkuY2FsbChnLCBjb21wb25lbnRMYXllcnMpXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2YgY29tcG9uZW50TGF5ZXJzW2ldKSB7XG4gICAgICAgICAgbm9ybWFsaXplZExheWVyc1tpXS5wdXNoKHUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3JtYWxpemVkTGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBsYXllciA9IG5vcm1hbGl6ZWRMYXllcnNbaV1cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5ZXIubGVuZ3RoOyArK2opIHtcbiAgICAgICAgY29uc3QgdSA9IGxheWVyW2pdXG4gICAgICAgIGcudmVydGV4KHUpLmxheWVyID0gaVxuICAgICAgICBnLnZlcnRleCh1KS5vcmRlciA9IGpcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbkFzc2lnbm1lbnQoKS5jYWxsKGcsIG5vcm1hbGl6ZWRMYXllcnMpXG4gICAgaWYgKHRoaXMuZWRnZUJ1bmRsaW5nKCkpIHtcbiAgICAgIGJ1bmRsZUVkZ2VzKGcsIG5vcm1hbGl6ZWRMYXllcnMsIHRoaXMubHRvcigpKVxuICAgIH1cbiAgICByZXR1cm4gYnVpbGRSZXN1bHQoZywgbm9ybWFsaXplZExheWVycywgdGhpcy5sdG9yKCkpXG4gIH1cblxuICB2ZXJ0ZXhXaWR0aCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4V2lkdGgnLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhIZWlnaHQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleEhlaWdodCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGVkZ2VXaWR0aCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnZWRnZVdpZHRoJywgYXJndW1lbnRzKVxuICB9XG5cbiAgbGF5ZXJNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2xheWVyTWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4TWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICBlZGdlTWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdlZGdlTWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4TGVmdE1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4TGVmdE1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleFJpZ2h0TWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhSaWdodE1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleFRvcE1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4VG9wTWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4Qm90dG9tTWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhCb3R0b21NYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICBsdG9yICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdsdG9yJywgYXJndW1lbnRzKVxuICB9XG5cbiAgZWRnZUJ1bmRsaW5nICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdlZGdlQnVuZGxpbmcnLCBhcmd1bWVudHMpXG4gIH1cblxuICBjeWNsZVJlbW92YWwgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2N5Y2xlUmVtb3ZhbCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGxheWVyQXNzaWdubWVudCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbGF5ZXJBc3NpZ25tZW50JywgYXJndW1lbnRzKVxuICB9XG5cbiAgY3Jvc3NpbmdSZWR1Y3Rpb24gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2Nyb3NzaW5nUmVkdWN0aW9uJywgYXJndW1lbnRzKVxuICB9XG5cbiAgcG9zaXRpb25Bc3NpZ25tZW50ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdwb3NpdGlvbkFzc2lnbm1lbnQnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdWdpeWFtYUxheW91dGVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gKHNlbGYsIHByaXZhdGVzLCBrZXksIGFyZ3MpID0+IHtcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHByaXZhdGVzLmdldChzZWxmKVtrZXldXG4gIH1cbiAgcHJpdmF0ZXMuZ2V0KHNlbGYpW2tleV0gPSBhcmdzWzBdXG4gIHJldHVybiBzZWxmXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNjZXNzb3JcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qc1xuICoqIG1vZHVsZSBpZCA9IDU1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWFya0NoaWxkcmVuID0gKGdyYXBoLCB1LCBpZCwgcmVzdWx0KSA9PiB7XG4gIGlmIChyZXN1bHQuaGFzKHUpKSB7XG4gICAgY29uc3QgcHJldklkID0gcmVzdWx0LmdldCh1KVxuICAgIGlmIChwcmV2SWQgIT09IGlkKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgudmVydGljZXMoKSkge1xuICAgICAgICBpZiAocmVzdWx0LmdldCh2KSA9PT0gcHJldklkKSB7XG4gICAgICAgICAgcmVzdWx0LnNldCh2LCBpZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICByZXN1bHQuc2V0KHUsIGlkKVxuICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICBtYXJrQ2hpbGRyZW4oZ3JhcGgsIHYsIGlkLCByZXN1bHQpXG4gIH1cbn1cblxuY29uc3QgY29ubmVjdGVkQ29tcG9uZW50cyA9IChncmFwaCkgPT4ge1xuICBjb25zdCBjb21wb25lbnRJZE1hcCA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgZ3JhcGgudmVydGljZXMoKSkge1xuICAgIGlmIChncmFwaC5pbkRlZ3JlZSh1KSA9PT0gMCkge1xuICAgICAgbWFya0NoaWxkcmVuKGdyYXBoLCB1LCB1LCBjb21wb25lbnRJZE1hcClcbiAgICB9XG4gIH1cbiAgY29uc3QgY29tcG9uZW50SWRzID0gbmV3IFNldChjb21wb25lbnRJZE1hcC52YWx1ZXMoKSlcbiAgcmV0dXJuIEFycmF5LmZyb20oY29tcG9uZW50SWRzKS5tYXAoKHUpID0+IHtcbiAgICByZXR1cm4gZ3JhcGgudmVydGljZXMoKS5maWx0ZXIoKHYpID0+IGNvbXBvbmVudElkTWFwLmdldCh2KSA9PT0gdSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25uZWN0ZWRDb21wb25lbnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9jb25uZWN0ZWQtY29tcG9uZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDU1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgZ3JvdXBMYXllcnMgPSAoZywgbGF5ZXJzLCBhbGxvd0VtcHR5TGF5ZXIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW3VdXG4gICAgaWYgKHJlc3VsdFtsYXllcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0W2xheWVyXSA9IFtdXG4gICAgfVxuICAgIHJlc3VsdFtsYXllcl0ucHVzaCh1KVxuICB9XG4gIGlmIChhbGxvd0VtcHR5TGF5ZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHJlc3VsdFtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtdXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcigoaCkgPT4gaCAhPT0gdW5kZWZpbmVkKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ3JvdXBMYXllcnNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2dyb3VwLWxheWVycy5qc1xuICoqIG1vZHVsZSBpZCA9IDU1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgQ3ljbGVSZW1vdmFsID0gcmVxdWlyZSgnLi9jeWNsZS1yZW1vdmFsJylcblxubW9kdWxlLmV4cG9ydHMgPSB7Q3ljbGVSZW1vdmFsfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGN5Y2xlRWRnZXMgPSByZXF1aXJlKCcuL2N5Y2xlLWVkZ2VzJylcblxuY29uc3QgY3ljbGVSZW1vdmFsID0gKGcpID0+IHtcbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgY3ljbGVFZGdlcyhnKSkge1xuICAgIGNvbnN0IG9iaiA9IGcuZWRnZSh1LCB2KVxuICAgIGcucmVtb3ZlRWRnZSh1LCB2KVxuICAgIGlmICh1ID09PSB2KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCBlZGdlID0gZy5lZGdlKHYsIHUpXG4gICAgaWYgKGVkZ2UpIHtcbiAgICAgIGVkZ2UubXVsdGlwbGUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGcuYWRkRWRnZSh2LCB1LCBPYmplY3QuYXNzaWduKHtyZXZlcnNlZDogdHJ1ZX0sIG9iaikpXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIEN5Y2xlUmVtb3ZhbCB7XG4gIGNhbGwgKGcpIHtcbiAgICBjeWNsZVJlbW92YWwoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEN5Y2xlUmVtb3ZhbFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtcmVtb3ZhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDU1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgY3ljbGVFZGdlcyA9IGZ1bmN0aW9uIChnKSB7XG4gIGNvbnN0IHN0YWNrID0ge31cbiAgY29uc3QgdmlzaXRlZCA9IHt9XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG5cbiAgY29uc3QgZGZzID0gKHUpID0+IHtcbiAgICBpZiAodmlzaXRlZFt1XSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZpc2l0ZWRbdV0gPSB0cnVlXG4gICAgc3RhY2tbdV0gPSB0cnVlXG4gICAgZm9yIChsZXQgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBpZiAoc3RhY2tbdl0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW3UsIHZdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGZzKHYpXG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBzdGFja1t1XVxuICB9XG5cbiAgZm9yIChsZXQgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBkZnModSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjeWNsZUVkZ2VzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1lZGdlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDU1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgTG9uZ2VzdFBhdGggPSByZXF1aXJlKCcuL2xvbmdlc3QtcGF0aCcpXG5jb25zdCBRdWFkSGV1cmlzdGljID0gcmVxdWlyZSgnLi9xdWFkLWhldXJpc3RpYycpXG5cbm1vZHVsZS5leHBvcnRzID0ge0xvbmdlc3RQYXRoLCBRdWFkSGV1cmlzdGljfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxvbmdlc3RQYXRoID0gKGcpID0+IHtcbiAgY29uc3QgdmlzaXRlZCA9IHt9XG4gIGNvbnN0IGxheWVycyA9IHt9XG5cbiAgY29uc3QgZGZzID0gKHUpID0+IHtcbiAgICBpZiAodmlzaXRlZFt1XSkge1xuICAgICAgcmV0dXJuIGxheWVyc1t1XVxuICAgIH1cbiAgICB2aXNpdGVkW3VdID0gdHJ1ZVxuXG4gICAgbGV0IGxheWVyID0gSW5maW5pdHlcbiAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgbGF5ZXIgPSBNYXRoLm1pbihsYXllciwgZGZzKHYpIC0gMSlcbiAgICB9XG4gICAgaWYgKGxheWVyID09PSBJbmZpbml0eSkge1xuICAgICAgbGF5ZXIgPSAwXG4gICAgfVxuICAgIGxheWVyc1t1XSA9IGxheWVyXG4gICAgcmV0dXJuIGxheWVyXG4gIH1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGcuaW5EZWdyZWUodSkgPT09IDApIHtcbiAgICAgIGRmcyh1KVxuICAgIH1cbiAgfVxuXG4gIGxldCBtaW5MYXllciA9IEluZmluaXR5XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBtaW5MYXllciA9IE1hdGgubWluKG1pbkxheWVyLCBsYXllcnNbdV0pXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGxheWVyc1t1XSAtPSBtaW5MYXllclxuICB9XG5cbiAgcmV0dXJuIGxheWVyc1xufVxuXG5jbGFzcyBMb25nZXN0UGF0aCB7XG4gIGNhbGwgKGcpIHtcbiAgICByZXR1cm4gbG9uZ2VzdFBhdGgoZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvbmdlc3RQYXRoXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9sb25nZXN0LXBhdGguanNcbiAqKiBtb2R1bGUgaWQgPSA1NThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGFjY2Vzc29yID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvYWNjZXNzb3InKVxuY29uc3QgTG9uZ2VzdFBhdGggPSByZXF1aXJlKCcuL2xvbmdlc3QtcGF0aCcpXG5cbmNvbnN0IHF1YWRIZXVyaXN0aWMgPSAoZywgcmVwZWF0KSA9PiB7XG4gIGNvbnN0IGxheWVycyA9IG5ldyBMb25nZXN0UGF0aCgpLmNhbGwoZylcblxuICBsZXQgbWluTGF5ZXIgPSBJbmZpbml0eVxuICBsZXQgbWF4TGF5ZXIgPSAtSW5maW5pdHlcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIG1pbkxheWVyID0gTWF0aC5taW4obWluTGF5ZXIsIGxheWVyc1t1XSlcbiAgICBtYXhMYXllciA9IE1hdGgubWF4KG1heExheWVyLCBsYXllcnNbdV0pXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGlmIChnLmluRGVncmVlKHUpID09PSAwKSB7XG4gICAgICBsYXllcnNbdV0gPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGxheWVyc1t1XSAtPSBtaW5MYXllclxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZlcnRpY2VzID0gZy52ZXJ0aWNlcygpLmZpbHRlcih1ID0+IGcuaW5EZWdyZWUodSkgPiAwICYmIGcub3V0RGVncmVlKHUpID4gMClcbiAgY29uc3Qgd2VpZ2h0cyA9IHt9XG4gIGNvbnN0IGNtcCA9ICh1LCB2KSA9PiB3ZWlnaHRzW3ZdIC0gd2VpZ2h0c1t1XVxuICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHJlcGVhdDsgKytsb29wKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgd2VpZ2h0c1t1XSA9IDBcbiAgICB9XG4gICAgZm9yIChjb25zdCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgICBjb25zdCBsID0gbGF5ZXJzW3ZdIC0gbGF5ZXJzW3VdXG4gICAgICB3ZWlnaHRzW3VdICs9IGxcbiAgICAgIHdlaWdodHNbdl0gKz0gbFxuICAgIH1cblxuICAgIHZlcnRpY2VzLnNvcnQoY21wKVxuICAgIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgICAgbGV0IHN1bSA9IDBcbiAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgIGxldCBsZWZ0TWF4ID0gLUluZmluaXR5XG4gICAgICBsZXQgcmlnaHRNaW4gPSBJbmZpbml0eVxuICAgICAgZm9yIChjb25zdCB2IG9mIGcuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1t2XVxuICAgICAgICBsZWZ0TWF4ID0gTWF0aC5tYXgobGVmdE1heCwgbGF5ZXIpXG4gICAgICAgIHN1bSArPSBsYXllclxuICAgICAgICBjb3VudCArPSAxXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1t2XVxuICAgICAgICByaWdodE1pbiA9IE1hdGgubWluKHJpZ2h0TWluLCBsYXllcilcbiAgICAgICAgc3VtICs9IGxheWVyXG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICAgIGxheWVyc1t1XSA9IE1hdGgubWluKHJpZ2h0TWluIC0gMSwgTWF0aC5tYXgobGVmdE1heCArIDEsIE1hdGgucm91bmQoc3VtIC8gY291bnQpKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGF5ZXJzXG59XG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBRdWFkSGV1cmlzdGljIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICByZXBlYXQ6IDRcbiAgICB9KVxuICB9XG5cbiAgY2FsbCAoZykge1xuICAgIHJldHVybiBxdWFkSGV1cmlzdGljKGcsIHRoaXMucmVwZWF0KCkpXG4gIH1cblxuICByZXBlYXQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3JlcGVhdCcsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1YWRIZXVyaXN0aWNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzXG4gKiogbW9kdWxlIGlkID0gNTU5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBub3JtYWxpemUgPSAoZywgbGF5ZXJzLCBsYXllck1hcCwgZWRnZU1hcmdpbiwgbGF5ZXJNYXJnaW4pID0+IHtcbiAgdmFyIGksIHcxLCB3MlxuICBmb3IgKGxldCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgY29uc3QgZCA9IGcuZWRnZSh1LCB2KVxuICAgIGlmIChsYXllck1hcFt2XSAtIGxheWVyTWFwW3VdID4gMSkge1xuICAgICAgdzEgPSB1XG4gICAgICBmb3IgKGkgPSBsYXllck1hcFt1XSArIDE7IGkgPCBsYXllck1hcFt2XTsgKytpKSB7XG4gICAgICAgIHcyID0gU3ltYm9sKClcbiAgICAgICAgZy5hZGRWZXJ0ZXgodzIsIHtcbiAgICAgICAgICB1LFxuICAgICAgICAgIHYsXG4gICAgICAgICAgZHVtbXk6IHRydWUsXG4gICAgICAgICAgd2lkdGg6IGQud2lkdGggKyBlZGdlTWFyZ2luLFxuICAgICAgICAgIG9yaWdXaWR0aDogZC53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGxheWVyTWFyZ2luLFxuICAgICAgICAgIG9yaWdIZWlnaHQ6IDAsXG4gICAgICAgICAgbGF5ZXI6IGlcbiAgICAgICAgfSlcbiAgICAgICAgZy5hZGRFZGdlKHcxLCB3Miwge1xuICAgICAgICAgIHUsXG4gICAgICAgICAgdixcbiAgICAgICAgICBkdW1teTogdHJ1ZSxcbiAgICAgICAgICByZXZlcnNlZDogZy5lZGdlKHUsIHYpLnJldmVyc2VkLFxuICAgICAgICAgIHdpZHRoOiBkLndpZHRoXG4gICAgICAgIH0pXG4gICAgICAgIGxheWVyc1tpXS5wdXNoKHcyKVxuICAgICAgICB3MSA9IHcyXG4gICAgICB9XG4gICAgICBnLmFkZEVkZ2UodzEsIHYsIHtcbiAgICAgICAgdSxcbiAgICAgICAgdixcbiAgICAgICAgZHVtbXk6IHRydWUsXG4gICAgICAgIHJldmVyc2VkOiBnLmVkZ2UodSwgdikucmV2ZXJzZWQsXG4gICAgICAgIHdpZHRoOiBkLndpZHRoXG4gICAgICB9KVxuICAgICAgZy5yZW1vdmVFZGdlKHUsIHYpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbm9ybWFsaXplLmpzXG4gKiogbW9kdWxlIGlkID0gNTYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBMYXllclN3ZWVwID0gcmVxdWlyZSgnLi9sYXllci1zd2VlcCcpXG5cbm1vZHVsZS5leHBvcnRzID0ge0xheWVyU3dlZXB9XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNTYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcbmNvbnN0IGJhcnlDZW50ZXIgPSByZXF1aXJlKCcuL2JhcnktY2VudGVyJylcblxuY29uc3QgcHJpdmF0ZXMgPSBuZXcgV2Vha01hcCgpXG5cbmNsYXNzIExheWVyU3dlZXAge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgcHJpdmF0ZXMuc2V0KHRoaXMsIHtcbiAgICAgIHJlcGVhdDogOCxcbiAgICAgIG1ldGhvZDogYmFyeUNlbnRlclxuICAgIH0pXG4gIH1cblxuICBjYWxsIChnLCBsYXllcnMpIHtcbiAgICBjb25zdCBuID0gbGF5ZXJzLmxlbmd0aFxuICAgIGNvbnN0IHJlcGVhdCA9IHRoaXMucmVwZWF0KClcbiAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCgpXG5cbiAgICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHJlcGVhdDsgKytsb29wKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG47ICsraSkge1xuICAgICAgICBtZXRob2QoZywgbGF5ZXJzW2kgLSAxXSwgbGF5ZXJzW2ldKVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IG4gLSAxOyBpID4gMDsgLS1pKSB7XG4gICAgICAgIG1ldGhvZChnLCBsYXllcnNbaSAtIDFdLCBsYXllcnNbaV0sIHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVwZWF0IChhcmcpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdyZXBlYXQnLCBhcmd1bWVudHMpXG4gIH1cblxuICBtZXRob2QgKGFyZykge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ21ldGhvZCcsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExheWVyU3dlZXBcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vbGF5ZXItc3dlZXAuanNcbiAqKiBtb2R1bGUgaWQgPSA1NjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyTWF0cml4ID0gcmVxdWlyZSgnLi4vbWlzYy9sYXllci1tYXRyaXgnKVxuXG5jb25zdCBiYXJ5Q2VudGVyID0gKGcsIGgxLCBoMiwgaW52ZXJzZSA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGNlbnRlcnMgPSB7fVxuICBjb25zdCBuID0gaDEubGVuZ3RoXG4gIGNvbnN0IG0gPSBoMi5sZW5ndGhcbiAgY29uc3QgYSA9IGxheWVyTWF0cml4KGcsIGgxLCBoMilcbiAgY29uc3QgY21wID0gKHUsIHYpID0+IGNlbnRlcnNbdV0gLSBjZW50ZXJzW3ZdXG4gIGlmIChpbnZlcnNlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGxldCBzdW0gPSAwXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG07ICsraikge1xuICAgICAgICBjb25zdCBhaWogPSBhW2kgKiBtICsgal1cbiAgICAgICAgY291bnQgKz0gYWlqXG4gICAgICAgIHN1bSArPSBqICogYWlqXG4gICAgICB9XG4gICAgICBjZW50ZXJzW2gxW2ldXSA9IHN1bSAvIGNvdW50XG4gICAgfVxuICAgIGgxLnNvcnQoY21wKVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICBsZXQgc3VtID0gMFxuICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgY29uc3QgYWlqID0gYVtpICogbSArIGpdXG4gICAgICAgIGNvdW50ICs9IGFpalxuICAgICAgICBzdW0gKz0gaSAqIGFpalxuICAgICAgfVxuICAgICAgY2VudGVyc1toMltqXV0gPSBzdW0gLyBjb3VudFxuICAgIH1cbiAgICBoMi5zb3J0KGNtcClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhcnlDZW50ZXJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vYmFyeS1jZW50ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA1NjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyTWF0cml4ID0gKGcsIGgxLCBoMikgPT4ge1xuICBjb25zdCBuID0gaDEubGVuZ3RoXG4gIGNvbnN0IG0gPSBoMi5sZW5ndGhcbiAgY29uc3Qgb3JkZXJzID0ge31cbiAgY29uc3QgYSA9IG5ldyBJbnQ4QXJyYXkobiAqIG0pXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyArK2kpIHtcbiAgICBvcmRlcnNbaDJbaV1dID0gaVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgY29uc3QgdSA9IGgxW2ldXG4gICAgZm9yIChjb25zdCB2IG9mIGcub3V0VmVydGljZXModSkpIHtcbiAgICAgIGFbaSAqIG0gKyBvcmRlcnNbdl1dID0gMVxuICAgIH1cbiAgfVxuICByZXR1cm4gYVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxheWVyTWF0cml4XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1tYXRyaXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IEJyYW5kZXMgPSByZXF1aXJlKCcuL2JyYW5kZXMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtCcmFuZGVzfVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IG1hcmtDb25mbGljdHMgPSByZXF1aXJlKCcuL21hcmstY29uZmxpY3RzJylcbmNvbnN0IHZlcnRpY2FsQWxpZ25tZW50ID0gcmVxdWlyZSgnLi92ZXJ0aWNhbC1hbGlnbm1lbnQnKVxuY29uc3QgaG9yaXpvbnRhbENvbXBhY3Rpb24gPSByZXF1aXJlKCcuL2hvcml6b250YWwtY29tcGFjdGlvbicpXG5cbmNvbnN0IHNvcnQgPSAoeHMpID0+IHtcbiAgeHMuc29ydCgoeDEsIHgyKSA9PiB4MSAtIHgyKVxufVxuXG5jb25zdCBicmFuZGVzID0gKGcsIGxheWVycykgPT4ge1xuICBtYXJrQ29uZmxpY3RzKGcsIGxheWVycylcblxuICBjb25zdCB4cyA9IHt9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICB4c1t1XSA9IFtdXG4gIH1cbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtcbiAgICB7cnRvbDogZmFsc2UsIGJ0b3Q6IGZhbHNlfSxcbiAgICB7cnRvbDogdHJ1ZSwgYnRvdDogZmFsc2V9LFxuICAgIHtydG9sOiBmYWxzZSwgYnRvdDogdHJ1ZX0sXG4gICAge3J0b2w6IHRydWUsIGJ0b3Q6IHRydWV9XG4gIF1cblxuICBsZXQgbWluV2lkdGhMZWZ0ID0gLUluZmluaXR5XG4gIGxldCBtaW5XaWR0aFJpZ2h0ID0gSW5maW5pdHlcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZGlyZWN0aW9uc1tpXVxuICAgIHZlcnRpY2FsQWxpZ25tZW50KGcsIGxheWVycywgZGlyZWN0aW9uKVxuICAgIGhvcml6b250YWxDb21wYWN0aW9uKGcsIGxheWVycywgZGlyZWN0aW9uKVxuICAgIGxldCBtaW5YID0gSW5maW5pdHlcbiAgICBsZXQgbWF4WCA9IC1JbmZpbml0eVxuICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24ucnRvbCkge1xuICAgICAgICBnLnZlcnRleCh1KS54ID0gLWcudmVydGV4KHUpLnhcbiAgICAgIH1cbiAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCBnLnZlcnRleCh1KS54KVxuICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIGcudmVydGV4KHUpLngpXG4gICAgfVxuICAgIGlmIChtYXhYIC0gbWluWCA8IG1pbldpZHRoUmlnaHQgLSBtaW5XaWR0aExlZnQpIHtcbiAgICAgIG1pbldpZHRoTGVmdCA9IG1pblhcbiAgICAgIG1pbldpZHRoUmlnaHQgPSBtYXhYXG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgIHhzW3VdLnB1c2goZy52ZXJ0ZXgodSkueClcbiAgICB9XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZGlyZWN0aW9uc1tpXVxuICAgIGlmIChkaXJlY3Rpb24ucnRvbCkge1xuICAgICAgbGV0IG1heFggPSAtSW5maW5pdHlcbiAgICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIHhzW3VdW2ldKVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgICB4c1t1XVtpXSArPSBtaW5XaWR0aFJpZ2h0IC0gbWF4WFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWluWCA9IEluZmluaXR5XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCB4c1t1XVtpXSlcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgICAgeHNbdV1baV0gKz0gbWluV2lkdGhMZWZ0IC0gbWluWFxuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgc29ydCh4c1t1XSlcbiAgICBnLnZlcnRleCh1KS54ID0gKHhzW3VdWzFdICsgeHNbdV1bMl0pIC8gMlxuICB9XG59XG5cbmNvbnN0IG5vcm1hbGl6ZSA9IChnKSA9PiB7XG4gIGxldCB4TWluID0gSW5maW5pdHlcbiAgbGV0IHlNaW4gPSBJbmZpbml0eVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIHhNaW4gPSBNYXRoLm1pbih4TWluLCB1Tm9kZS54IC0gdU5vZGUub3JpZ1dpZHRoIC8gMilcbiAgICB5TWluID0gTWF0aC5taW4oeU1pbiwgdU5vZGUueSAtIHVOb2RlLm9yaWdIZWlnaHQgLyAyKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgdU5vZGUueCAtPSB4TWluXG4gICAgdU5vZGUueSAtPSB5TWluXG4gIH1cbn1cblxuY2xhc3MgQnJhbmRlcyB7XG4gIGNhbGwgKGcsIGxheWVycykge1xuICAgIGJyYW5kZXMoZywgbGF5ZXJzKVxuXG4gICAgbGV0IHlPZmZzZXQgPSAwXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcbiAgICAgIGxldCBtYXhIZWlnaHQgPSAwXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgbGF5ZXIpIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gTWF0aC5tYXgobWF4SGVpZ2h0LCBnLnZlcnRleCh1KS5oZWlnaHQpXG4gICAgICB9XG4gICAgICB5T2Zmc2V0ICs9IG1heEhlaWdodCAvIDJcbiAgICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgICBnLnZlcnRleCh1KS55ID0geU9mZnNldFxuICAgICAgfVxuICAgICAgeU9mZnNldCArPSBtYXhIZWlnaHQgLyAyXG4gICAgfVxuXG4gICAgbm9ybWFsaXplKGcpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCcmFuZGVzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNTY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBsYXllckVkZ2VzID0gcmVxdWlyZSgnLi4vLi4vbWlzYy9sYXllci1lZGdlcycpXG5cbmNvbnN0IHNwbGl0ID0gKHgsIGYpID0+IHtcbiAgY29uc3QgeSA9IFtdXG4gIGNvbnN0IHogPSBbXVxuICBmb3IgKGNvbnN0IHhpIG9mIHgpIHtcbiAgICBpZiAoZih4aSkpIHtcbiAgICAgIHkucHVzaCh4aSlcbiAgICB9IGVsc2Uge1xuICAgICAgei5wdXNoKHhpKVxuICAgIH1cbiAgfVxuICByZXR1cm4gW3ksIHpdXG59XG5cbmNvbnN0IG1hcmtDb25mbGljdHMgPSAoZywgbGF5ZXJzKSA9PiB7XG4gIGNvbnN0IGggPSBsYXllcnMubGVuZ3RoIC0gMlxuICBjb25zdCBkdW1teSA9IHt9XG4gIGNvbnN0IG9yZGVyID0ge31cbiAgY29uc3QgaXNJbm5lciA9IChbdSwgdl0pID0+IGR1bW15W3VdICYmIGR1bW15W3ZdXG5cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGQgPSBnLnZlcnRleCh1KVxuICAgIGR1bW15W3VdID0gISFkLmR1bW15XG4gICAgb3JkZXJbdV0gPSBkLm9yZGVyXG4gIH1cblxuICBmb3IgKGxldCBpID0gMTsgaSA8IGg7ICsraSkge1xuICAgIGNvbnN0IGgxID0gbGF5ZXJzW2ldXG4gICAgY29uc3QgaDIgPSBsYXllcnNbaSArIDFdXG4gICAgY29uc3QgZWRnZXMgPSBsYXllckVkZ2VzKGcsIGgxLCBoMilcbiAgICBjb25zdCBbaW5uZXJTZWdtZW50cywgb3V0ZXJTZWdtZW50c10gPSBzcGxpdChlZGdlcywgaXNJbm5lcilcbiAgICBmb3IgKGNvbnN0IFt1MSwgdjFdIG9mIGlubmVyU2VnbWVudHMpIHtcbiAgICAgIGZvciAoY29uc3QgW3UyLCB2Ml0gb2Ygb3V0ZXJTZWdtZW50cykge1xuICAgICAgICBpZiAoKG9yZGVyW3UxXSA8IG9yZGVyW3UyXSAmJiBvcmRlclt2MV0gPiBvcmRlclt2Ml0pIHx8IChvcmRlclt1MV0gPiBvcmRlclt1Ml0gJiYgb3JkZXJbdjFdIDwgb3JkZXJbdjJdKSkge1xuICAgICAgICAgIGcuZWRnZSh1MiwgdjIpLnR5cGUxQ29uZmxpY3QgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXJrQ29uZmxpY3RzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL21hcmstY29uZmxpY3RzLmpzXG4gKiogbW9kdWxlIGlkID0gNTY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBsYXllckVkZ2VzID0gKGcsIGgxLCBoMikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICBmb3IgKGNvbnN0IHUgb2YgZy5pblZlcnRpY2VzKHYpKSB7XG4gICAgICByZXN1bHQucHVzaChbdSwgdl0pXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsYXllckVkZ2VzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1lZGdlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDU2OFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgbWVkaWFuID0gcmVxdWlyZSgnLi4vLi4vbWlzYy9tZWRpYW4nKVxuXG5jb25zdCB2ZXJ0aWNhbEFsaWdubWVudCA9IChnLCBsYXllcnMsIHsgcnRvbCA9IGZhbHNlLCBidG90ID0gZmFsc2UgfSkgPT4ge1xuICBjb25zdCBpdGVyTGF5ZXJzID0gZnVuY3Rpb24gKiAoKSB7XG4gICAgaWYgKGJ0b3QpIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYXllcnMubGVuZ3RoIC0gMjsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgeWllbGQgbGF5ZXJzW2ldXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHlpZWxkIGxheWVyc1tpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGl0ZXJMYXllciA9IGZ1bmN0aW9uICogKGxheWVyKSB7XG4gICAgaWYgKHJ0b2wpIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYXllci5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB5aWVsZCBsYXllcltpXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHlpZWxkIGxheWVyW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZWRnZSA9IGJ0b3QgPyAodSwgdikgPT4gZy5lZGdlKHYsIHUpIDogKHUsIHYpID0+IGcuZWRnZSh1LCB2KVxuICBjb25zdCBkZWdyZWUgPSBidG90ID8gdSA9PiBnLm91dERlZ3JlZSh1KSA6IHUgPT4gZy5pbkRlZ3JlZSh1KVxuICBjb25zdCBtZWQgPSBidG90ID8gKGcsIGxheWVycykgPT4gbWVkaWFuKGcsIGxheWVycywgdHJ1ZSkgOiAoZywgbGF5ZXJzKSA9PiBtZWRpYW4oZywgbGF5ZXJzKVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgZy52ZXJ0ZXgodSkucm9vdCA9IHVcbiAgICBnLnZlcnRleCh1KS5hbGlnbiA9IHVcbiAgfVxuICBmb3IgKGNvbnN0IGxheWVyIG9mIGl0ZXJMYXllcnMoKSkge1xuICAgIGxldCByID0gcnRvbCA/IEluZmluaXR5IDogLUluZmluaXR5XG4gICAgZm9yIChjb25zdCB2IG9mIGl0ZXJMYXllcihsYXllcikpIHtcbiAgICAgIGlmIChkZWdyZWUodikgPiAwKSB7XG4gICAgICAgIGNvbnN0IHtsZWZ0LCByaWdodH0gPSBtZWQoZywgdilcbiAgICAgICAgY29uc3QgbWVkaWFucyA9IGxlZnQgPT09IHJpZ2h0ID8gW2xlZnRdIDogKHJ0b2wgPyBbcmlnaHQsIGxlZnRdIDogW2xlZnQsIHJpZ2h0XSlcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIG1lZGlhbnMpIHtcbiAgICAgICAgICBpZiAoIWVkZ2UodSwgdikudHlwZTFDb25mbGljdCAmJiAhZWRnZSh1LCB2KS50eXBlMkNvbmZsaWN0KSB7XG4gICAgICAgICAgICBpZiAocnRvbCA/IHIgPiBnLnZlcnRleCh1KS5vcmRlciA6IHIgPCBnLnZlcnRleCh1KS5vcmRlcikge1xuICAgICAgICAgICAgICBnLnZlcnRleCh2KS5hbGlnbiA9IGcudmVydGV4KHYpLnJvb3QgPSBnLnZlcnRleCh1KS5yb290XG4gICAgICAgICAgICAgIGcudmVydGV4KHUpLmFsaWduID0gdlxuICAgICAgICAgICAgICByID0gZy52ZXJ0ZXgodSkub3JkZXJcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJ0aWNhbEFsaWdubWVudFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy92ZXJ0aWNhbC1hbGlnbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1NjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IG1lZGlhbiA9IChnLCB2LCBpbnZlcnNlID0gZmFsc2UpID0+IHtcbiAgY29uc3QgdmVydGljZXMgPSBBcnJheS5mcm9tKGludmVyc2UgPyBnLm91dFZlcnRpY2VzKHYpIDogZy5pblZlcnRpY2VzKHYpKVxuICB2ZXJ0aWNlcy5zb3J0KCh1MSwgdTIpID0+IGcudmVydGV4KHUxKS5vcmRlciAtIGcudmVydGV4KHUyKS5vcmRlcilcbiAgY29uc3QgaW5kZXggPSAodmVydGljZXMubGVuZ3RoIC0gMSkgLyAyXG4gIHJldHVybiB7XG4gICAgbGVmdDogdmVydGljZXNbTWF0aC5mbG9vcihpbmRleCldLFxuICAgIHJpZ2h0OiB2ZXJ0aWNlc1tNYXRoLmNlaWwoaW5kZXgpXVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVkaWFuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9tZWRpYW4uanNcbiAqKiBtb2R1bGUgaWQgPSA1NzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGhvcml6b250YWxDb21wYWN0aW9uID0gKGcsIGxheWVycywgeyBydG9sID0gZmFsc2UgfSkgPT4ge1xuICBjb25zdCBvcmRlck5vblplcm8gPSAobm9kZSkgPT4gcnRvbFxuICAgID8gbm9kZS5vcmRlciA8IGxheWVyc1tub2RlLmxheWVyXS5sZW5ndGggLSAxXG4gICAgOiBub2RlLm9yZGVyID4gMFxuICBjb25zdCBwcmVkZWNlc3NvciA9IHJ0b2xcbiAgICA/IG5vZGUgPT4gbGF5ZXJzW25vZGUubGF5ZXJdW25vZGUub3JkZXIgKyAxXVxuICAgIDogbm9kZSA9PiBsYXllcnNbbm9kZS5sYXllcl1bbm9kZS5vcmRlciAtIDFdXG5cbiAgY29uc3QgcGxhY2VCbG9jayA9ICh2KSA9PiB7XG4gICAgY29uc3Qgdk5vZGUgPSBnLnZlcnRleCh2KVxuICAgIGlmICh2Tm9kZS54ICE9PSBudWxsKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdk5vZGUueCA9IDBcbiAgICBsZXQgdyA9IHZcbiAgICBkbyB7XG4gICAgICBjb25zdCB3Tm9kZSA9IGcudmVydGV4KHcpXG4gICAgICBpZiAob3JkZXJOb25aZXJvKHdOb2RlKSkge1xuICAgICAgICBjb25zdCBwID0gcHJlZGVjZXNzb3Iod05vZGUpXG4gICAgICAgIGNvbnN0IHBOb2RlID0gZy52ZXJ0ZXgocClcbiAgICAgICAgY29uc3QgdSA9IHBOb2RlLnJvb3RcbiAgICAgICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgICAgICBwbGFjZUJsb2NrKHUpXG4gICAgICAgIGlmICh2Tm9kZS5zaW5rID09PSB2KSB7XG4gICAgICAgICAgdk5vZGUuc2luayA9IHVOb2RlLnNpbmtcbiAgICAgICAgfVxuICAgICAgICBpZiAodk5vZGUuc2luayA9PT0gdU5vZGUuc2luaykge1xuICAgICAgICAgIHZOb2RlLnggPSBNYXRoLm1heCh2Tm9kZS54LCB1Tm9kZS54ICsgKHBOb2RlLndpZHRoICsgd05vZGUud2lkdGgpIC8gMilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB1U2lua05vZGUgPSBnLnZlcnRleCh1Tm9kZS5zaW5rKVxuICAgICAgICAgIHVTaW5rTm9kZS5zaGlmdCA9IE1hdGgubWluKHVTaW5rTm9kZS5zaGlmdCwgdk5vZGUueCAtIHVOb2RlLnggLSAocE5vZGUud2lkdGggKyB3Tm9kZS53aWR0aCkgLyAyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3ID0gd05vZGUuYWxpZ25cbiAgICB9IHdoaWxlICh3ICE9PSB2KVxuICB9XG5cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICB1Tm9kZS5zaW5rID0gdVxuICAgIHVOb2RlLnNoaWZ0ID0gSW5maW5pdHlcbiAgICB1Tm9kZS54ID0gbnVsbFxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBpZiAoZy52ZXJ0ZXgodSkucm9vdCA9PT0gdSkge1xuICAgICAgcGxhY2VCbG9jayh1KVxuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIHVOb2RlLnggPSBnLnZlcnRleCh1Tm9kZS5yb290KS54XG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICBjb25zdCBzaGlmdCA9IGcudmVydGV4KGcudmVydGV4KHVOb2RlLnJvb3QpLnNpbmspLnNoaWZ0XG4gICAgaWYgKHNoaWZ0IDwgSW5maW5pdHkpIHtcbiAgICAgIHVOb2RlLnggKz0gc2hpZnRcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBob3Jpem9udGFsQ29tcGFjdGlvblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9ob3Jpem9udGFsLWNvbXBhY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1NzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IHNlZ21lbnQgPSBmdW5jdGlvbiAqIChncmFwaCwgdmVydGljZXMsIHVwcGVyKSB7XG4gIGlmICh2ZXJ0aWNlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm5cbiAgfVxuICBsZXQgc2VxID0gW11cbiAgbGV0IGxhc3RQYXJlbnQgPSBncmFwaC52ZXJ0ZXgodmVydGljZXNbMF0pW3VwcGVyID8gJ3YnIDogJ3UnXVxuICBmb3IgKGNvbnN0IHUgb2YgdmVydGljZXMpIHtcbiAgICBjb25zdCBkID0gZ3JhcGgudmVydGV4KHUpXG4gICAgaWYgKCFkLmR1bW15IHx8IGRbdXBwZXIgPyAndicgOiAndSddICE9PSBsYXN0UGFyZW50KSB7XG4gICAgICBpZiAoc2VxLmxlbmd0aCA+IDApIHtcbiAgICAgICAgeWllbGQgc2VxXG4gICAgICAgIHNlcSA9IFtdXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkLmR1bW15KSB7XG4gICAgICBzZXEucHVzaCh1KVxuICAgICAgbGFzdFBhcmVudCA9IGRbdXBwZXIgPyAndicgOiAndSddXG4gICAgfVxuICB9XG4gIGlmIChzZXEubGVuZ3RoID4gMCkge1xuICAgIHlpZWxkIHNlcVxuICB9XG59XG5cbmNvbnN0IGFkanVzdFBvcyA9IChncmFwaCwgdmVydGljZXMsIGx0b3IpID0+IHtcbiAgbGV0IHN1bVBvcyA9IDBcbiAgbGV0IHRvdGFsV2lkdGggPSAwXG4gIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgIHN1bVBvcyArPSBncmFwaC52ZXJ0ZXgodSlbbHRvciA/ICd4JyA6ICd5J11cbiAgICB0b3RhbFdpZHRoICs9IGdyYXBoLnZlcnRleCh1KS5vcmlnV2lkdGggfHwgMFxuICB9XG4gIGxldCBvZmZzZXQgPSBzdW1Qb3MgLyB2ZXJ0aWNlcy5sZW5ndGggLSAodG90YWxXaWR0aCAtIDEpIC8gMlxuICBmb3IgKGNvbnN0IHUgb2YgdmVydGljZXMpIHtcbiAgICBncmFwaC52ZXJ0ZXgodSlbbHRvciA/ICd4JyA6ICd5J10gPSBvZmZzZXRcbiAgICBvZmZzZXQgKz0gZ3JhcGgudmVydGV4KHUpLm9yaWdXaWR0aCB8fCAwXG4gIH1cbn1cblxuY29uc3QgYnVuZGxlRWRnZXMgPSAoZ3JhcGgsIGxheWVycywgbHRvcikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBmb3IgKGNvbnN0IHZlcnRpY2VzIG9mIHNlZ21lbnQoZ3JhcGgsIGxheWVyc1tpXSwgZmFsc2UpKSB7XG4gICAgICBhZGp1c3RQb3MoZ3JhcGgsIHZlcnRpY2VzLCBsdG9yKVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpID0gbGF5ZXJzLmxlbmd0aCAtIDE7IGkgPiAwOyAtLWkpIHtcbiAgICBmb3IgKGNvbnN0IHZlcnRpY2VzIG9mIHNlZ21lbnQoZ3JhcGgsIGxheWVyc1tpXSwgdHJ1ZSkpIHtcbiAgICAgIGFkanVzdFBvcyhncmFwaCwgdmVydGljZXMsIGx0b3IpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVuZGxlRWRnZXNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9idW5kbGUtZWRnZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1NzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IEdyYXBoID0gcmVxdWlyZSgnLi4vLi4vZ3JhcGgnKVxuY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi91dGlscy9hY2Nlc3NvcicpXG5jb25zdCBjeWNsZVJlbW92YWwgPSByZXF1aXJlKCcuLi8uLi9sYXlvdXRlci9zdWdpeWFtYS9jeWNsZS1yZW1vdmFsJylcbmNvbnN0IGxheWVyQXNzaWdubWVudCA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQnKVxuY29uc3QgZ3JvdXBMYXllcnMgPSByZXF1aXJlKCcuLi8uLi9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2dyb3VwLWxheWVycycpXG5jb25zdCByZWN0YW5ndWxhciA9IHJlcXVpcmUoJy4vcmVjdGFuZ3VsYXInKVxuXG5jb25zdCBlZGdlQ29uY2VudHJhdGlvbiA9IChnLCBoMSwgaDIsIG1ldGhvZCwgZHVtbXksIGlkR2VuZXJhdG9yKSA9PiB7XG4gIGNvbnN0IHN1YmdyYXBoID0gbmV3IEdyYXBoKClcbiAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgc3ViZ3JhcGguYWRkVmVydGV4KHUsIGcudmVydGV4KHUpKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBoMikge1xuICAgIHN1YmdyYXBoLmFkZFZlcnRleCh1LCBnLnZlcnRleCh1KSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgc3ViZ3JhcGguYWRkRWRnZSh1LCB2LCBnLmVkZ2UodSwgdikpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBjb25jZW50cmF0aW9uIG9mIG1ldGhvZChzdWJncmFwaCwgaDEsIGgyKSkge1xuICAgIGNvbnN0IHcgPSBpZEdlbmVyYXRvcihnLCBjb25jZW50cmF0aW9uLnNvdXJjZSwgY29uY2VudHJhdGlvbi50YXJnZXQpXG4gICAgaWYgKGcudmVydGV4KHcpKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBnLmFkZFZlcnRleCh3LCBkdW1teShjb25jZW50cmF0aW9uLnNvdXJjZSwgY29uY2VudHJhdGlvbi50YXJnZXQpKVxuICAgIGZvciAoY29uc3QgdSBvZiBjb25jZW50cmF0aW9uLnNvdXJjZSkge1xuICAgICAgZy5hZGRFZGdlKHUsIHcpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdiBvZiBjb25jZW50cmF0aW9uLnRhcmdldCkge1xuICAgICAgZy5hZGRFZGdlKHcsIHYpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModykpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHcpKSB7XG4gICAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgICBnLnJlbW92ZUVkZ2UodSwgdilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgRWRnZUNvbmNlbnRyYXRpb25UcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgY3ljbGVSZW1vdmFsOiBuZXcgY3ljbGVSZW1vdmFsLkN5Y2xlUmVtb3ZhbCgpLFxuICAgICAgbGF5ZXJBc3NpZ25tZW50OiBuZXcgbGF5ZXJBc3NpZ25tZW50LlF1YWRIZXVyaXN0aWMoKSxcbiAgICAgIG1ldGhvZDogcmVjdGFuZ3VsYXIsXG4gICAgICBkdW1teTogKCkgPT4gKHtkdW1teTogdHJ1ZX0pLFxuICAgICAgaWRHZW5lcmF0b3I6ICgpID0+IFN5bWJvbCgpXG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zZm9ybSAoZykge1xuICAgIHRoaXMuY3ljbGVSZW1vdmFsKCkuY2FsbChnKVxuICAgIGNvbnN0IGxheWVyTWFwID0gdGhpcy5sYXllckFzc2lnbm1lbnQoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXBMYXllcnMoZywgbGF5ZXJNYXApXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICBjb25zdCBoMSA9IGxheWVyc1tpXVxuICAgICAgY29uc3QgaDIgPSBuZXcgU2V0KClcbiAgICAgIGxldCBlZGdlcyA9IDBcbiAgICAgIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICAgIGgyLmFkZCh2KVxuICAgICAgICAgIGVkZ2VzICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWRnZUNvbmNlbnRyYXRpb24oZywgaDEsIEFycmF5LmZyb20oaDIudmFsdWVzKCkpLCB0aGlzLm1ldGhvZCgpLCB0aGlzLmR1bW15KCksIHRoaXMuaWRHZW5lcmF0b3IoKSlcbiAgICB9XG4gICAgcmV0dXJuIGdcbiAgfVxuXG4gIGN5Y2xlUmVtb3ZhbCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnY3ljbGVSZW1vdmFsJywgYXJndW1lbnRzKVxuICB9XG5cbiAgbGF5ZXJBc3NpZ25tZW50ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdsYXllckFzc2lnbm1lbnQnLCBhcmd1bWVudHMpXG4gIH1cblxuICBtZXRob2QgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ21ldGhvZCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGR1bW15ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdkdW1teScsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGlkR2VuZXJhdG9yICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdpZEdlbmVyYXRvcicsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGxheWVyVmVydGljZXMgPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IHVzID0gbmV3IFNldChoMSlcbiAgY29uc3QgdmVydGljZXMgPSB7fVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICB2ZXJ0aWNlc1t2XSA9IG5ldyBTZXQoKVxuICAgIGZvciAoY29uc3QgdSBvZiBnLmluVmVydGljZXModikpIHtcbiAgICAgIGlmICh1cy5oYXModSkpIHtcbiAgICAgICAgdmVydGljZXNbdl0uYWRkKHUpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2ZXJ0aWNlc1xufVxuXG5jb25zdCByZWN0YW5ndWxhciA9IChnLCBoMSwgaDIpID0+IHtcbiAgaWYgKGgxLmxlbmd0aCA9PT0gMCB8fCBoMi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBjb25zdCBrID0gZy5udW1FZGdlcygpXG4gIGNvbnN0IGFjdGl2ZSA9IHt9XG4gIGNvbnN0IHZlcnRpY2VzID0gbGF5ZXJWZXJ0aWNlcyhnLCBoMSwgaDIpXG4gIGNvbnN0IGlzQWN0aXZlID0gKHUpID0+IGFjdGl2ZVt1XVxuICBjb25zdCBjbXAgPSAodjEsIHYyKSA9PiB2ZXJ0aWNlc1t2Ml0uc2l6ZSAtIHZlcnRpY2VzW3YxXS5zaXplXG4gIGNvbnN0IGQgPSAocywgdCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDBcbiAgICBmb3IgKGNvbnN0IHUgb2Ygcykge1xuICAgICAgZm9yIChjb25zdCB2IG9mIHQpIHtcbiAgICAgICAgaWYgKHZlcnRpY2VzW3ZdLmhhcyh1KSkge1xuICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQgLSBzLmxlbmd0aCAtIHQubGVuZ3RoXG4gIH1cbiAgaDIgPSBBcnJheS5mcm9tKGgyKVxuXG4gIGNvbnN0IGNvbmNlbnRyYXRpb25zID0gW11cbiAgbGV0IGpPZmZzZXQgPSAwXG4gIGZvciAobGV0IGwgPSAwOyBsIDwgazsgKytsKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgICBhY3RpdmVbdV0gPSB0cnVlXG4gICAgfVxuXG4gICAgaDIuc29ydChjbXApXG4gICAgaWYgKHZlcnRpY2VzW2gyW2pPZmZzZXRdXS5zaXplIDw9IDApIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgbGV0IG1heEQgPSAtMVxuICAgIGxldCBtYXhIMVxuICAgIGxldCBtYXhIMlxuICAgIGxldCB0bXBIMiA9IFtdXG4gICAgZm9yIChsZXQgaiA9IGpPZmZzZXQ7IGogPCBoMi5sZW5ndGg7ICsraikge1xuICAgICAgY29uc3QgdiA9IGgyW2pdXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICAgICAgaWYgKGFjdGl2ZVt1XSkge1xuICAgICAgICAgIGlmIChnLmVkZ2UodSwgdikpIHtcbiAgICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlW3VdID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRtcEgyLnB1c2godilcbiAgICAgIGxldCB0bXBIMSA9IGgxLmZpbHRlcihpc0FjdGl2ZSlcbiAgICAgIGxldCB0bXBEID0gZCh0bXBIMSwgdG1wSDIpXG4gICAgICBpZiAodG1wRCA+IG1heEQpIHtcbiAgICAgICAgbWF4RCA9IHRtcERcbiAgICAgICAgbWF4SDEgPSB0bXBIMVxuICAgICAgICBtYXhIMiA9IEFycmF5LmZyb20odG1wSDIpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1heEQgPiAtMSkge1xuICAgICAgZm9yIChjb25zdCB2IG9mIG1heEgyKSB7XG4gICAgICAgIGZvciAoY29uc3QgdSBvZiBtYXhIMSkge1xuICAgICAgICAgIHZlcnRpY2VzW3ZdLmRlbGV0ZSh1KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25jZW50cmF0aW9ucy5wdXNoKHtcbiAgICAgICAgc291cmNlOiBBcnJheS5mcm9tKG1heEgxKSxcbiAgICAgICAgdGFyZ2V0OiBBcnJheS5mcm9tKG1heEgyKVxuICAgICAgfSlcbiAgICAgIGpPZmZzZXQgPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGpPZmZzZXQgKz0gMVxuICAgIH1cblxuICAgIGlmIChqT2Zmc2V0ID49IGgyLmxlbmd0aCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uY2VudHJhdGlvbnNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWN0YW5ndWxhclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9yZWN0YW5ndWxhci5qc1xuICoqIG1vZHVsZSBpZCA9IDU3NFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgaW50ZXJzZWN0aW9uID0gKGcsIHUxLCB1MiwgaDIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzb3VyY2U6IG5ldyBTZXQoW3UxLCB1Ml0pLFxuICAgIHRhcmdldDogbmV3IFNldChoMi5maWx0ZXIoKHYpID0+IGcuZWRnZSh1MSwgdikgJiYgZy5lZGdlKHUyLCB2KSkpXG4gIH1cbn1cblxuY29uc3Qgc2V0bWludXMgPSAoYSwgYikgPT4ge1xuICByZXR1cm4gbmV3IFNldChBcnJheS5mcm9tKGEudmFsdWVzKCkpLmZpbHRlcigoeCkgPT4gIWIuaGFzKHgpKSlcbn1cblxuY29uc3QgdW5pb24gPSAoYSwgYikgPT4ge1xuICBjb25zdCBzID0gbmV3IFNldChhKVxuICBmb3IgKGNvbnN0IHggb2YgYikge1xuICAgIHMuYWRkKHgpXG4gIH1cbiAgcmV0dXJuIHNcbn1cblxuY29uc3Qgc2V0RXF1YWxzID0gKGEsIGIpID0+IHtcbiAgcmV0dXJuIGEuc2l6ZSA9PT0gYi5zaXplICYmIHNldG1pbnVzKGEsIGIpLnNpemUgPT09IDBcbn1cblxuY29uc3QgbmV3YmVyeSA9IChnLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgaW50ZXJzZWN0aW9ucyA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaDEubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCB1MSA9IGgxW2ldXG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgaDEubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IHUyID0gaDFbal1cbiAgICAgIGludGVyc2VjdGlvbnMucHVzaChpbnRlcnNlY3Rpb24oZywgdTEsIHUyLCBoMikpXG4gICAgfVxuICB9XG4gIGludGVyc2VjdGlvbnMuc29ydCgoaTEsIGkyKSA9PiBpMS50YXJnZXQuc2l6ZSAtIGkyLnRhcmdldC5zaXplKVxuXG4gIGNvbnN0IGNvbmNlbnRyYXRpb25zID0gW11cbiAgZm9yIChjb25zdCBpIG9mIGludGVyc2VjdGlvbnMpIHtcbiAgICBsZXQgc3RvcCA9IGZhbHNlXG5cbiAgICBpZiAoaS50YXJnZXQuc2l6ZSA8IDIpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgICBpZiAoc2V0RXF1YWxzKGkudGFyZ2V0LCBjLnRhcmdldCkpIHtcbiAgICAgICAgYy5zb3VyY2UgPSB1bmlvbihpLnNvdXJjZSwgYy5zb3VyY2UpXG4gICAgICAgIHN0b3AgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgICBjb25zdCBpRGFzaCA9IHNldG1pbnVzKGkudGFyZ2V0LCBjLnRhcmdldClcbiAgICAgIGNvbnN0IGNEYXNoID0gc2V0bWludXMoYy50YXJnZXQsIGkudGFyZ2V0KVxuICAgICAgaWYgKGlEYXNoLnNpemUgPiAwICYmIGNEYXNoLnNpemUgPT09IDApIHtcbiAgICAgICAgY29uY2VudHJhdGlvbnMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBpLnNvdXJjZSxcbiAgICAgICAgICB0YXJnZXQ6IGlEYXNoXG4gICAgICAgIH0pXG4gICAgICAgIGMuc291cmNlID0gdW5pb24oYy5zb3VyY2UsIGkuc291cmNlKVxuICAgICAgICBzdG9wID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc3RvcCkge1xuICAgICAgY29uY2VudHJhdGlvbnMucHVzaChpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlZCA9IG5ldyBNYXAoY29uY2VudHJhdGlvbnMubWFwKChfLCBpKSA9PiBbaSwgZmFsc2VdKSlcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jZW50cmF0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGMxID0gY29uY2VudHJhdGlvbnNbaV1cbiAgICBpZiAobWVyZ2VkLmdldChpKSkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgY29uY2VudHJhdGlvbnMubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IGMyID0gY29uY2VudHJhdGlvbnNbal1cbiAgICAgIGlmIChzZXRFcXVhbHMoYzEudGFyZ2V0LCBjMi50YXJnZXQpKSB7XG4gICAgICAgIGMxLnNvdXJjZSA9IHVuaW9uKGMxLnNvdXJjZSwgYzIuc291cmNlKVxuICAgICAgICBtZXJnZWQuc2V0KGosIHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgYy5zb3VyY2UgPSBBcnJheS5mcm9tKGMuc291cmNlKVxuICAgIGMudGFyZ2V0ID0gQXJyYXkuZnJvbShjLnRhcmdldClcbiAgfVxuXG4gIHJldHVybiBjb25jZW50cmF0aW9uc1xuICAgIC5maWx0ZXIoKGMsIGkpID0+ICFtZXJnZWQuZ2V0KGkpICYmIGMudGFyZ2V0Lmxlbmd0aCA+IDEpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3YmVyeVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9uZXdiZXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gNTc1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBiaWNsaXF1ZUZpbmQgPSAoZ3JhcGgsIEwsIFIsIFAsIFEsIGNsaXF1ZXMpID0+IHtcbiAgd2hpbGUgKFAuc2l6ZSAhPT0gMCkge1xuICAgIGxldCB4ID0gQXJyYXkuZnJvbShQKVswXVxuICAgIFAuZGVsZXRlKHgpXG4gICAgbGV0IF9SID0gbmV3IFNldChbLi4uUiwgeF0pXG4gICAgbGV0IF9MID0gbmV3IFNldChncmFwaC5pblZlcnRpY2VzKHgpLmZpbHRlcigodSkgPT4gTC5oYXModSkpKVxuICAgIGxldCBjb21wbGVtZW50TCA9IG5ldyBTZXQoQXJyYXkuZnJvbShMKS5maWx0ZXIoKHUpID0+ICFfTC5oYXModSkpKVxuICAgIF9MLmZvckVhY2goKGwpID0+IHtcbiAgICAgIGNvbXBsZW1lbnRMLmRlbGV0ZShsKVxuICAgIH0pXG4gICAgbGV0IEMgPSBuZXcgU2V0KFt4XSlcbiAgICBsZXQgX1AgPSBuZXcgU2V0KClcbiAgICBsZXQgX1EgPSBuZXcgU2V0KClcbiAgICBsZXQgaXNNYXhpbWFsID0gdHJ1ZVxuICAgIGZvciAobGV0IHYgb2YgUSkge1xuICAgICAgbGV0IE4gPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikuZmlsdGVyKCh1KSA9PiBfTC5oYXModSkpKVxuICAgICAgaWYgKE4uc2l6ZSA9PT0gX0wuc2l6ZSkge1xuICAgICAgICBpc01heGltYWwgPSBmYWxzZVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmIChOLnNpemUgPiAwKSB7XG4gICAgICAgIF9RID0gX1EuYWRkKHYpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc01heGltYWwpIHtcbiAgICAgIGZvciAobGV0IHYgb2YgUCkge1xuICAgICAgICBpZiAodiAhPT0geCkge1xuICAgICAgICAgIGxldCBOID0gbmV3IFNldChncmFwaC5pblZlcnRpY2VzKHYpLmZpbHRlcigodSkgPT4gX0wuaGFzKHUpKSlcbiAgICAgICAgICBpZiAoTi5zaXplID09PSBfTC5zaXplKSB7XG4gICAgICAgICAgICBfUi5hZGQodilcbiAgICAgICAgICAgIGxldCBTID0gbmV3IFNldChncmFwaC5pblZlcnRpY2VzKHYpLmZpbHRlcigodSkgPT4gY29tcGxlbWVudEwuaGFzKHUpKSlcbiAgICAgICAgICAgIGlmIChTLnNpemUgPT09IDApIEMuYWRkKHYpXG4gICAgICAgICAgfSBlbHNlIGlmIChOLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBfUC5hZGQodilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChfUC5zaXplICE9PSAwKSB7XG4gICAgICAgIGJpY2xpcXVlRmluZChncmFwaCwgX0wsIF9SLCBfUCwgX1EsIGNsaXF1ZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX0wuc2l6ZSA+IDEgJiYgX1Iuc2l6ZSA+IDEpIHtcbiAgICAgICAgICBjbGlxdWVzLnB1c2goe1xuICAgICAgICAgICAgc291cmNlOiBBcnJheS5mcm9tKF9MKSxcbiAgICAgICAgICAgIHRhcmdldDogQXJyYXkuZnJvbShfUilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFEgPSBuZXcgU2V0KFsuLi5RLCAuLi5DXSlcbiAgICBQID0gbmV3IFNldChBcnJheS5mcm9tKFApLmZpbHRlcigodikgPT4gIUMuaGFzKHYpKSlcbiAgfVxufVxuXG5jb25zdCBtYmVhID0gKGdyYXBoLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgVSA9IGdyYXBoLnZlcnRpY2VzKCkuZmlsdGVyKCh1KSA9PiBncmFwaC5vdXREZWdyZWUodSkpXG4gIGNvbnN0IFYgPSBncmFwaC52ZXJ0aWNlcygpLmZpbHRlcigodSkgPT4gZ3JhcGguaW5EZWdyZWUodSkpXG4gIGxldCBjbGlxdWVzID0gW11cbiAgYmljbGlxdWVGaW5kKGdyYXBoLCBuZXcgU2V0KFUpLCBuZXcgU2V0KCksIG5ldyBTZXQoViksIG5ldyBTZXQoKSwgY2xpcXVlcylcbiAgcmV0dXJuIGNsaXF1ZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYmVhXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL21iZWEuanNcbiAqKiBtb2R1bGUgaWQgPSA1NzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IGhhc2hLZXkgPSAodmVydGljZXMpID0+IHtcbiAgcmV0dXJuIHZlcnRpY2VzLm1hcCgodSkgPT4gdS50b1N0cmluZygpKS5qb2luKCcsJylcbn1cblxuY29uc3QgbWF4S2V5ID0gKGl0ZXIpID0+IHtcbiAgbGV0IG1heFZhbCA9IC1JbmZpbml0eVxuICBsZXQgcmVzdWx0ID0gbnVsbFxuICBmb3IgKGNvbnN0IFtpZCwgdmFsXSBvZiBpdGVyKSB7XG4gICAgaWYgKHZhbCA+IG1heFZhbCkge1xuICAgICAgbWF4VmFsID0gdmFsXG4gICAgICByZXN1bHQgPSBpZFxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IHBhcnRpdGlvbiA9IChncmFwaCwgVSkgPT4ge1xuICBjb25zdCBMID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBMLmFkZCh2KVxuICAgIH1cbiAgfVxuICBjb25zdCBoYXNoS2V5cyA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgIGhhc2hLZXlzLnNldCh1LCBoYXNoS2V5KGdyYXBoLm91dFZlcnRpY2VzKHUpKSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgTCkge1xuICAgIGNvbnN0IGRlZ3JlZXMgPSBncmFwaC5pblZlcnRpY2VzKHUpLm1hcCgodikgPT4gW3YsIGdyYXBoLm91dERlZ3JlZSh2KV0pXG4gICAgY29uc3QgbWF4SWQgPSBtYXhLZXkoZGVncmVlcylcbiAgICBoYXNoS2V5cy5zZXQodSwgaGFzaEtleXMuZ2V0KG1heElkKSlcbiAgfVxuICBsZXQgY2hhbmdlZCA9IGZhbHNlXG4gIGRvIHtcbiAgICBjaGFuZ2VkID0gZmFsc2VcbiAgICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgICAgY29uc3QgTSA9IG5ldyBNYXAoKVxuICAgICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBoYXNoS2V5cy5nZXQodilcbiAgICAgICAgaWYgKCFNLmhhcyhoYXNoKSkge1xuICAgICAgICAgIE0uc2V0KGhhc2gsIDApXG4gICAgICAgIH1cbiAgICAgICAgTS5zZXQoaGFzaCwgTS5nZXQoaGFzaCkgKyAxKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3S2V5ID0gbWF4S2V5KE0uZW50cmllcygpKVxuICAgICAgaWYgKGhhc2hLZXlzLmdldCh1KSAhPT0gbmV3S2V5KSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIGhhc2hLZXlzLnNldCh1LCBuZXdLZXkpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBMKSB7XG4gICAgICBjb25zdCBNID0gbmV3IE1hcCgpXG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGguaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBoYXNoID0gaGFzaEtleXMuZ2V0KHYpXG4gICAgICAgIGlmICghTS5oYXMoaGFzaCkpIHtcbiAgICAgICAgICBNLnNldChoYXNoLCAwKVxuICAgICAgICB9XG4gICAgICAgIE0uc2V0KGhhc2gsIE0uZ2V0KGhhc2gpICsgMSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0tleSA9IG1heEtleShNLmVudHJpZXMoKSlcbiAgICAgIGlmIChoYXNoS2V5cy5nZXQodSkgIT09IG5ld0tleSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBoYXNoS2V5cy5zZXQodSwgbmV3S2V5KVxuICAgICAgfVxuICAgIH1cbiAgfSB3aGlsZSAoY2hhbmdlZClcbiAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBVKSB7XG4gICAgY29uc3QgaGFzaCA9IGhhc2hLZXlzLmdldCh1KVxuICAgIGlmICghcmVzdWx0LmhhcyhoYXNoKSkge1xuICAgICAgcmVzdWx0LnNldChoYXNoLCBbXSlcbiAgICB9XG4gICAgcmVzdWx0LmdldChoYXNoKS5wdXNoKHUpXG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20ocmVzdWx0LnZhbHVlcygpKVxufVxuXG5jb25zdCBhdWd1bWVudCA9IChncmFwaCwgUykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCB1IG9mIFMpIHtcbiAgICBmb3IgKGNvbnN0IHYgb2YgZ3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICAgIGZvciAoY29uc3QgdyBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICAgIHJlc3VsdC5hZGQodylcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20ocmVzdWx0KVxufVxuXG5jb25zdCBxdWFzaUJpY2xpcXVlTWluaW5nID0gKGdyYXBoLCBtdSwgUykgPT4ge1xuICBjb25zdCBDID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBTKSB7XG4gICAgY29uc3QgdG1wUyA9IG5ldyBTZXQoKVxuICAgIGNvbnN0IHRtcFQgPSBuZXcgU2V0KGdyYXBoLm91dFZlcnRpY2VzKHUpKVxuICAgIEMuc2V0KGhhc2hLZXkoQXJyYXkuZnJvbSh0bXBUKSksIHtzb3VyY2U6IHRtcFMsIHRhcmdldDogdG1wVH0pXG4gIH1cbiAgZm9yIChjb25zdCBrZXkgb2YgQy5rZXlzKCkpIHtcbiAgICBjb25zdCBNID0gbmV3IE1hcCgpXG4gICAgZm9yIChjb25zdCB2IG9mIEMuZ2V0KGtleSkudGFyZ2V0KSB7XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZ3JhcGguaW5WZXJ0aWNlcyh2KSkge1xuICAgICAgICBpZiAoIU0uaGFzKHUpKSB7XG4gICAgICAgICAgTS5zZXQodSwgMClcbiAgICAgICAgfVxuICAgICAgICBNLnNldCh1LCBNLmdldCh1KSArIDEpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBNLmtleXMoKSkge1xuICAgICAgaWYgKE0uZ2V0KHUpID49IG11ICogQy5nZXQoa2V5KS50YXJnZXQuc2l6ZSkge1xuICAgICAgICBDLmdldChrZXkpLnNvdXJjZS5hZGQodSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBBcnJheS5mcm9tKEMudmFsdWVzKCkpXG4gICAgLmZpbHRlcigoe3NvdXJjZSwgdGFyZ2V0fSkgPT4gc291cmNlLnNpemUgPiAxICYmIHRhcmdldC5zaXplID4gMSlcbiAgcmVzdWx0LnNvcnQoKGMxLCBjMikgPT4gYzEuc291cmNlLnNpemUgPT09IGMyLnNvdXJjZS5zaXplID8gYzIudGFyZ2V0LnNpemUgLSBjMS50YXJnZXQuc2l6ZSA6IGMyLnNvdXJjZS5zaXplIC0gYzEuc291cmNlLnNpemUpXG4gIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgY29uc3QgbWF4aW11bSA9IHJlc3VsdFswXVxuICBmb3IgKGxldCBpID0gMTsgaSA8IHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHRtcFMgPSBuZXcgU2V0KG1heGltdW0uc291cmNlKVxuICAgIGNvbnN0IHRtcFQgPSBuZXcgU2V0KG1heGltdW0udGFyZ2V0KVxuICAgIGZvciAoY29uc3QgdSBvZiByZXN1bHRbaV0uc291cmNlKSB7XG4gICAgICB0bXBTLmFkZCh1KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHUgb2YgcmVzdWx0W2ldLnRhcmdldCkge1xuICAgICAgdG1wVC5hZGQodSlcbiAgICB9XG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGZvciAoY29uc3QgdSBvZiB0bXBTKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgdG1wVCkge1xuICAgICAgICBpZiAoZ3JhcGguZWRnZSh1LCB2KSkge1xuICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnQgPCBtdSAqIHRtcFMuc2l6ZSAqIHRtcFQuc2l6ZSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgbWF4aW11bS5zb3VyY2UgPSBBcnJheS5mcm9tKHRtcFMpXG4gICAgbWF4aW11bS50YXJnZXQgPSBBcnJheS5mcm9tKHRtcFQpXG4gIH1cbiAgcmV0dXJuIFttYXhpbXVtXVxufVxuXG5jb25zdCBxdWFzaUNsaXF1ZUxheWVyID0gKGdyYXBoLCBoMSwgaDIsIG11KSA9PiB7XG4gIGNvbnN0IGNsaXF1ZXMgPSBbXVxuICBmb3IgKGNvbnN0IFMgb2YgcGFydGl0aW9uKGdyYXBoLCBoMSkpIHtcbiAgICBmb3IgKGNvbnN0IGNsaXF1ZSBvZiBxdWFzaUJpY2xpcXVlTWluaW5nKGdyYXBoLCBtdSwgYXVndW1lbnQoZ3JhcGgsIFMpKSkge1xuICAgICAgY2xpcXVlcy5wdXNoKGNsaXF1ZSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsaXF1ZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBxdWFzaUNsaXF1ZUxheWVyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDU3N1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3Qge2NvbWJpbmF0aW9ufSA9IHJlcXVpcmUoJ2pzLWNvbWJpbmF0b3JpY3MnKVxuXG5jb25zdCBlbnVtZXJhdGUgPSBmdW5jdGlvbiAqIChuZWlnaGJvcnMsIGVwc2lsb24pIHtcbiAgaWYgKG5laWdoYm9ycy5zaXplID4gMCkge1xuICAgIGZvciAobGV0IGkgPSBlcHNpbG9uOyBpID4gMDsgLS1pKSB7XG4gICAgICBjb25zdCBpdGVyID0gY29tYmluYXRpb24oQXJyYXkuZnJvbShuZWlnaGJvcnMpLCBNYXRoLm1pbihpLCBuZWlnaGJvcnMuc2l6ZSkpXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBTID0gaXRlci5uZXh0KClcbiAgICAgICAgaWYgKCFTKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBTXG4gICAgICB9XG4gICAgfVxuICAgIHlpZWxkIFtdXG4gIH1cbn1cblxuY29uc3QgYWRqYWNlbnRWZXJ0aWNlcyA9IChncmFwaCwgdnMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdiBvZiB2cykge1xuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5vdXRWZXJ0aWNlcyh2KSkge1xuICAgICAgcmVzdWx0LmFkZCh1KVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGdlbktleSA9IChWbCwgVnIpID0+IHtcbiAgY29uc3QgYXJyYXlWbCA9IEFycmF5LmZyb20oVmwpXG4gIGNvbnN0IGFycmF5VnIgPSBBcnJheS5mcm9tKFZyKVxuICBhcnJheVZsLnNvcnQoKVxuICBhcnJheVZyLnNvcnQoKVxuICByZXR1cm4gYCR7YXJyYXlWbC5qb2luKCcsJyl9OiR7YXJyYXlWci5qb2luKCcsJyl9YFxufVxuXG5jb25zdCBjb3VudEVycm9yID0gKGdyYXBoLCB1LCB2ZXJ0aWNlcywgbHRvdSkgPT4ge1xuICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGx0b3UgPyBncmFwaC5pblZlcnRpY2VzKHUpIDogZ3JhcGgub3V0VmVydGljZXModSkpXG4gIGxldCBjb3VudCA9IDBcbiAgZm9yIChjb25zdCB2IG9mIHZlcnRpY2VzKSB7XG4gICAgaWYgKCFuZWlnaGJvcnMuaGFzKHYpKSB7XG4gICAgICBjb3VudCArPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudFxufVxuXG5jb25zdCBpbnRlcnNlY3Rpb24gPSAoQSwgQikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCBpdGVtIG9mIEEpIHtcbiAgICBpZiAoQi5oYXMoaXRlbSkpIHtcbiAgICAgIHJlc3VsdC5hZGQoaXRlbSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBzZXRtaW51cyA9IChBLCBCKSA9PiB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBCKSB7XG4gICAgQS5kZWxldGUoaXRlbSlcbiAgfVxuICByZXR1cm4gQVxufVxuXG5jb25zdCBzdG9yZSA9IChyZXN1bHQsIGtleSwgVmwsIFZyKSA9PiB7XG4gIGZvciAoY29uc3QgW2tleSwge3NvdXJjZSwgdGFyZ2V0fV0gb2YgcmVzdWx0LmVudHJpZXMoKSkge1xuICAgIGNvbnN0IHNvdXJjZUludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbihzb3VyY2UsIFZsKVxuICAgIGNvbnN0IHRhcmdldEludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbih0YXJnZXQsIFZyKVxuICAgIGlmIChzb3VyY2VJbnRlcnNlY3Rpb24uc2l6ZSA9PT0gc291cmNlLnNpemUgJiYgdGFyZ2V0SW50ZXJzZWN0aW9uLnNpemUgPT09IHRhcmdldC5zaXplKSB7XG4gICAgICByZXN1bHQuZGVsZXRlKGtleSlcbiAgICB9IGVsc2UgaWYgKHNvdXJjZUludGVyc2VjdGlvbi5zaXplID09PSBWbC5zaXplICYmIHRhcmdldEludGVyc2VjdGlvbi5zaXplID09PSBWci5zaXplKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgcmVzdWx0LnNldChrZXksIHtzb3VyY2U6IFZsLCB0YXJnZXQ6IFZyfSlcbn1cblxuY29uc3QgdGVzdEVwc2lsb25RdWFzaUJpY2xpcXVlID0gKGdyYXBoLCBzb3VyY2UsIHRhcmdldCwgZXBzaWxvbiwgbXMpID0+IHtcbiAgaWYgKHNvdXJjZS5zaXplIDwgbXMgfHwgdGFyZ2V0LnNpemUgPCBtcykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBzb3VyY2UpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGgub3V0VmVydGljZXModSkpXG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGZvciAoY29uc3QgdiBvZiB0YXJnZXQpIHtcbiAgICAgIGlmICghdmVydGljZXMuaGFzKHYpKSB7XG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50ID4gZXBzaWxvbikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiB0YXJnZXQpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh1KSlcbiAgICBsZXQgY291bnQgPSAwXG4gICAgZm9yIChjb25zdCB2IG9mIHNvdXJjZSkge1xuICAgICAgaWYgKCF2ZXJ0aWNlcy5oYXModikpIHtcbiAgICAgICAgY291bnQgKz0gMVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnQgPiBlcHNpbG9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3Qgc3Vic3BhY2UgPSAoZ3JhcGgsIGNhbmRWbCwgZ2VuVmwsIGNhbmRFeHQsIGVwc2lsb24sIG1zLCB2aXNpdGVkLCByZXN1bHQpID0+IHtcbiAgY29uc3QgY2FuZFZyID0gYWRqYWNlbnRWZXJ0aWNlcyhncmFwaCwgY2FuZFZsKVxuICBmb3IgKGNvbnN0IHYgb2YgY2FuZFZyKSB7XG4gICAgaWYgKGNvdW50RXJyb3IoZ3JhcGgsIHYsIGNhbmRWbCwgdHJ1ZSkgPiBlcHNpbG9uKSB7XG4gICAgICBjYW5kVnIuZGVsZXRlKHYpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qga2V5ID0gZ2VuS2V5KGNhbmRWbCwgY2FuZFZyKVxuICBpZiAodmlzaXRlZC5oYXMoa2V5KSkge1xuICAgIHJldHVyblxuICB9XG4gIHZpc2l0ZWQuYWRkKGtleSlcbiAgaWYgKHRlc3RFcHNpbG9uUXVhc2lCaWNsaXF1ZShncmFwaCwgY2FuZFZsLCBjYW5kVnIsIGVwc2lsb24sIG1zKSkge1xuICAgIHN0b3JlKHJlc3VsdCwga2V5LCBjYW5kVmwsIGNhbmRWcilcbiAgfVxuXG4gIHNldG1pbnVzKGNhbmRFeHQsIGNhbmRWcilcbiAgZm9yIChjb25zdCB2IG9mIGNhbmRFeHQpIHtcbiAgICBjYW5kRXh0LmRlbGV0ZSh2KVxuICAgIGNvbnN0IG5laWdoYm9ycyA9IGludGVyc2VjdGlvbihjYW5kVmwsIG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh2KSkpXG4gICAgY29uc3QgcmVzdCA9IHNldG1pbnVzKG5ldyBTZXQoY2FuZFZsKSwgbmVpZ2hib3JzKVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUocmVzdCwgZXBzaWxvbikpIHtcbiAgICAgIGNvbnN0IFZsID0gbmV3IFNldChuZWlnaGJvcnMpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgY2FuZEV4dCwgZXBzaWxvbiwgbXMsIHZpc2l0ZWQsIHJlc3VsdClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29tcGxldGVRQiA9IChncmFwaCwgaDEsIGgyLCBlcHNpbG9uLCBtcykgPT4ge1xuICBjb25zdCBiaWNsaXF1ZXMgPSBuZXcgTWFwKClcbiAgY29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGgxKVxuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICBuZWlnaGJvcnMuZGVsZXRlKHUpXG4gICAgfVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUobmVpZ2hib3JzLCBlcHNpbG9uKSkge1xuICAgICAgY29uc3QgVmwgPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgbmV3IFNldChoMiksIGVwc2lsb24sIG1zLCB2aXNpdGVkLCBiaWNsaXF1ZXMpXG4gICAgfVxuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKGJpY2xpcXVlcy52YWx1ZXMoKSkubWFwKCh7c291cmNlLCB0YXJnZXR9KSA9PiB7XG4gICAgY29uc3Qgc291cmNlQXJyYXkgPSBBcnJheS5mcm9tKHNvdXJjZSlcbiAgICBjb25zdCB0YXJnZXRBcnJheSA9IEFycmF5LmZyb20odGFyZ2V0KVxuICAgIHNvdXJjZUFycmF5LnNvcnQoKVxuICAgIHRhcmdldEFycmF5LnNvcnQoKVxuICAgIHJldHVybiB7XG4gICAgICBzb3VyY2U6IHNvdXJjZUFycmF5LFxuICAgICAgdGFyZ2V0OiB0YXJnZXRBcnJheVxuICAgIH1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb21wbGV0ZVFCXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2NvbXBsZXRlLXFiLmpzXG4gKiogbW9kdWxlIGlkID0gNTc4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIvKlxuICogJElkOiBjb21iaW5hdG9yaWNzLmpzLHYgMC4yNSAyMDEzLzAzLzExIDE1OjQyOjE0IGRhbmtvZ2FpIEV4cCBkYW5rb2dhaSAkXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICpcbiAqICBSZWZlcmVuY2VzOlxuICogICAgaHR0cDovL3d3dy5ydWJ5LWRvYy5vcmcvY29yZS0yLjAvQXJyYXkuaHRtbCNtZXRob2QtaS1jb21iaW5hdGlvblxuICogICAgaHR0cDovL3d3dy5ydWJ5LWRvYy5vcmcvY29yZS0yLjAvQXJyYXkuaHRtbCNtZXRob2QtaS1wZXJtdXRhdGlvblxuICogICAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GYWN0b3JpYWxfbnVtYmVyX3N5c3RlbVxuICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5Db21iaW5hdG9yaWNzID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgdmVyc2lvbiA9IFwiMC41LjJcIjtcbiAgICAvKiBjb21iaW5hdG9yeSBhcml0aG1ldGljcyAqL1xuICAgIHZhciBQID0gZnVuY3Rpb24obSwgbikge1xuICAgICAgICB2YXIgcCA9IDE7XG4gICAgICAgIHdoaWxlIChuLS0pIHAgKj0gbS0tO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9O1xuICAgIHZhciBDID0gZnVuY3Rpb24obSwgbikge1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQKG0sIG4pIC8gUChuLCBuKTtcbiAgICB9O1xuICAgIHZhciBmYWN0b3JpYWwgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgIHJldHVybiBQKG4sIG4pO1xuICAgIH07XG4gICAgdmFyIGZhY3RvcmFkaWMgPSBmdW5jdGlvbihuLCBkKSB7XG4gICAgICAgIHZhciBmID0gMTtcbiAgICAgICAgaWYgKCFkKSB7XG4gICAgICAgICAgICBmb3IgKGQgPSAxOyBmIDwgbjsgZiAqPSArK2QpO1xuICAgICAgICAgICAgaWYgKGYgPiBuKSBmIC89IGQtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGYgPSBmYWN0b3JpYWwoZCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFswXTtcbiAgICAgICAgZm9yICg7IGQ7IGYgLz0gZC0tKSB7XG4gICAgICAgICAgICByZXN1bHRbZF0gPSBNYXRoLmZsb29yKG4gLyBmKTtcbiAgICAgICAgICAgIG4gJT0gZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyogY29tbW9uIG1ldGhvZHMgKi9cbiAgICB2YXIgYWRkUHJvcGVydGllcyA9IGZ1bmN0aW9uKGRzdCwgc3JjKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHN0LCBwLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHNyY1twXSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHAgPT0gJ25leHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaGlkZVByb3BlcnR5ID0gZnVuY3Rpb24obywgcCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgcCwge1xuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgdmFyIGUsIHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgd2hpbGUgKGUgPSB0aGlzLm5leHQoKSkgcmVzdWx0LnB1c2goZiA/IGYoZSkgOiBlKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICB2YXIgY29tbW9uID0ge1xuICAgICAgICB0b0FycmF5OiB0b0FycmF5LFxuICAgICAgICBtYXA6IHRvQXJyYXksXG4gICAgICAgIGZvckVhY2g6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIHZhciBlO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB3aGlsZSAoZSA9IHRoaXMubmV4dCgpKSBmKGUpO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24oZikge1xuICAgICAgICAgICAgdmFyIGUsIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB3aGlsZSAoZSA9IHRoaXMubmV4dCgpKSBpZiAoZihlKSkgcmVzdWx0LnB1c2goZSk7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGxhenlNYXA6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhenlNYXAgPSBmO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxhenlGaWx0ZXI6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbmV4dCcsIHtcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGYgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLl9uZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICh0aGlzLl9uZXh0KSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0ID0gdGhpcy5uZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgX25leHQgPSB0aGlzLl9uZXh0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGUgPSBfbmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZihlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICduZXh0Jywge1xuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvKiBwb3dlciBzZXQgKi9cbiAgICB2YXIgcG93ZXIgPSBmdW5jdGlvbihhcnksIGZ1bikge1xuICAgICAgICB2YXIgc2l6ZSA9IDEgPDwgYXJ5Lmxlbmd0aCxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgbjsgbiA+Pj49IDEsIGkrKykgaWYgKG4gJiAxKSByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubnRoKHRoaXMuaW5kZXgrKyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIGNvbW1vbik7XG4gICAgICAgIHRoYXQuaW5pdCgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiAoZnVuKSA9PT0gJ2Z1bmN0aW9uJykgPyB0aGF0Lm1hcChmdW4pIDogdGhhdDtcbiAgICB9O1xuICAgIC8qIGNvbWJpbmF0aW9uICovXG4gICAgdmFyIG5leHRJbmRleCA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIHNtYWxsZXN0ID0gbiAmIC1uLFxuICAgICAgICAgICAgcmlwcGxlID0gbiArIHNtYWxsZXN0LFxuICAgICAgICAgICAgbmV3X3NtYWxsZXN0ID0gcmlwcGxlICYgLXJpcHBsZSxcbiAgICAgICAgICAgIG9uZXMgPSAoKG5ld19zbWFsbGVzdCAvIHNtYWxsZXN0KSA+PiAxKSAtIDE7XG4gICAgICAgIHJldHVybiByaXBwbGUgfCBvbmVzO1xuICAgIH07XG4gICAgdmFyIGNvbWJpbmF0aW9uID0gZnVuY3Rpb24oYXJ5LCBuZWxlbSwgZnVuKSB7XG4gICAgICAgIGlmICghbmVsZW0pIG5lbGVtID0gYXJ5Lmxlbmd0aDtcbiAgICAgICAgaWYgKG5lbGVtIDwgMSkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIGlmIChuZWxlbSA+IGFyeS5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgZmlyc3QgPSAoMSA8PCBuZWxlbSkgLSAxLFxuICAgICAgICAgICAgc2l6ZSA9IEMoYXJ5Lmxlbmd0aCwgbmVsZW0pLFxuICAgICAgICAgICAgbWF4SW5kZXggPSAxIDw8IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGZpcnN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID49IG1heEluZGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICg7IG47IG4gPj4+PSAxLCBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gJiAxKSByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXh0SW5kZXgodGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcbiAgICAvKiBiaWdjb21iaW5hdGlvbiAqL1xuICAgIHZhciBiaWdOZXh0SW5kZXggPSBmdW5jdGlvbihuLCBuZWxlbSkge1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuO1xuICAgICAgICB2YXIgaiA9IG5lbGVtO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZvciAoaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdFtpXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGogPT0gMCkge1xuICAgICAgICAgICAgLy8gT3ZlcmZsb3dcbiAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IDE7XG4gICAgICAgICAgICBmb3IgKHZhciBrID0gcmVzdWx0Lmxlbmd0aCAtIDI7IGsgPj0gMDsgay0tKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tdID0gKGsgPCBuZWxlbS0xKT8xOjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxcblxuICAgICAgICAgICAgLy8gZmlyc3QgemVybyBhZnRlciAxXG4gICAgICAgICAgICB2YXIgaTEgPSAtMTtcbiAgICAgICAgICAgIHZhciBpMCA9IC0xO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDAgJiYgaTEgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaTAgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaTEgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaTAgIT0gLTEgJiYgaTEgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2kwXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpMV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGogPSBuZWxlbTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSByZXN1bHQubGVuZ3RoIC0gMTsgaSA+PSBpMTsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXSA9PSAxKVxuICAgICAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGkxOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSAoaSA8IGopPzE6MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9O1xuICAgIHZhciBidWlsZEZpcnN0ID0gZnVuY3Rpb24obmVsZW0pIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5lbGVtOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0WzBdID0gMTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHZhciBiaWdDb21iaW5hdGlvbiA9IGZ1bmN0aW9uKGFyeSwgbmVsZW0sIGZ1bikge1xuICAgICAgICBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICBpZiAobmVsZW0gPiBhcnkubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIGZpcnN0ID0gYnVpbGRGaXJzdChuZWxlbSksXG4gICAgICAgICAgICBzaXplID0gQyhhcnkubGVuZ3RoLCBuZWxlbSksXG4gICAgICAgICAgICBtYXhJbmRleCA9IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGZpcnN0LmNvbmNhdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4Lmxlbmd0aCA+IG1heEluZGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuLmxlbmd0aDsgaisrLCBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5bal0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiaWdOZXh0SW5kZXgodGhpcy5pbmRleCwgbmVsZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIChmdW4pID09PSAnZnVuY3Rpb24nKSA/IHRoYXQubWFwKGZ1bikgOiB0aGF0O1xuICAgIH07XG4gICAgLyogcGVybXV0YXRpb24gKi9cbiAgICB2YXIgX3Blcm11dGF0aW9uID0gZnVuY3Rpb24oYXJ5KSB7XG4gICAgICAgIHZhciB0aGF0ID0gYXJ5LnNsaWNlKCksXG4gICAgICAgICAgICBzaXplID0gZmFjdG9yaWFsKHRoYXQubGVuZ3RoKTtcbiAgICAgICAgdGhhdC5pbmRleCA9IDA7XG4gICAgICAgIHRoYXQubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gc2l6ZSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGNvcHkgPSB0aGlzLnNsaWNlKCksXG4gICAgICAgICAgICAgICAgZGlnaXRzID0gZmFjdG9yYWRpYyh0aGlzLmluZGV4LCB0aGlzLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICAgICAgaSA9IHRoaXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGZvciAoOyBpID49IDA7IC0taSkgcmVzdWx0LnB1c2goY29weS5zcGxpY2UoZGlnaXRzW2ldLCAxKVswXSk7XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgLy8gd2hpY2ggaXMgcmVhbGx5IGEgcGVybXV0YXRpb24gb2YgY29tYmluYXRpb25cbiAgICB2YXIgcGVybXV0YXRpb24gPSBmdW5jdGlvbihhcnksIG5lbGVtLCBmdW4pIHtcbiAgICAgICAgaWYgKCFuZWxlbSkgbmVsZW0gPSBhcnkubGVuZ3RoO1xuICAgICAgICBpZiAobmVsZW0gPCAxKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgaWYgKG5lbGVtID4gYXJ5Lmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBzaXplID0gUChhcnkubGVuZ3RoLCBuZWxlbSksXG4gICAgICAgICAgICBzaXplT2YgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcnkuc2xpY2UoKSwge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2NtYicpO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ3BlcicpO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIHtcbiAgICAgICAgICAgIHZhbHVlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY21iID0gY29tYmluYXRpb24oYXJ5LCBuZWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXIgPSBfcGVybXV0YXRpb24odGhpcy5jbWIubmV4dCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5wZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbWIgPSB0aGlzLmNtYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY21iKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyID0gX3Blcm11dGF0aW9uKGNtYik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcblxuICAgIHZhciBQQyA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAgICAgZm9yICh2YXIgbiA9IDE7IG4gPD0gbTsgbisrKSB7XG4gICAgICAgICAgICB2YXIgcCA9IFAobSxuKTtcbiAgICAgICAgICAgIHRvdGFsICs9IHA7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9O1xuICAgIC8vIHdoaWNoIGlzIHJlYWxseSBhIHBlcm11dGF0aW9uIG9mIGNvbWJpbmF0aW9uXG4gICAgdmFyIHBlcm11dGF0aW9uQ29tYmluYXRpb24gPSBmdW5jdGlvbihhcnksIGZ1bikge1xuICAgICAgICAvLyBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIC8vIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICAvLyBpZiAobmVsZW0gPiBhcnkubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIHNpemUgPSBQQyhhcnkubGVuZ3RoKSxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnY21iJyk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAncGVyJyk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnbmVsZW0nKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5lbGVtID0gMTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIG5lbGVtOiBcIiArIHRoaXMubmVsZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY21iID0gY29tYmluYXRpb24oYXJ5LCB0aGlzLm5lbGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlciA9IF9wZXJtdXRhdGlvbih0aGlzLmNtYi5uZXh0KCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnBlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNtYiA9IHRoaXMuY21iLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVsZW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW5jcmVtZW50IG5lbGVtOiBcIiArIHRoaXMubmVsZW0gKyBcIiB2cyBcIiArIGFyeS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVsZW0gPiBhcnkubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNtYiA9IGNvbWJpbmF0aW9uKGFyeSwgdGhpcy5uZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbWIgPSB0aGlzLmNtYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNtYikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyID0gX3Blcm11dGF0aW9uKGNtYik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcbiAgICAvKiBDYXJ0ZXNpYW4gUHJvZHVjdCAqL1xuICAgIHZhciBhcnJheVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBjYXJ0ZXNpYW5Qcm9kdWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICAgICAgICBzaXplID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24ocCwgYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwICogYS5sZW5ndGg7XG4gICAgICAgICAgICB9LCAxKSxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpbSA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICAgICAgdGhhdCA9IE9iamVjdC5jcmVhdGUoYXJncywge1xuICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHNpemVPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoIXNpemUpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICBoaWRlUHJvcGVydHkodGhhdCwgJ2luZGV4Jyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogc2l6ZU9mLFxuICAgICAgICAgICAgZGltOiBkaW0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgZCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICg7IGQgPCBkaW07IGQrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGFyZ3VtZW50c1tkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gdGhpc1tkXS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tkXVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGQgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoOyBkIDwgZGltOyBkKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSB0aGlzW2RdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuICUgbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tkXVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIG4gLT0gaTtcbiAgICAgICAgICAgICAgICAgICAgbiAvPSBsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gc2l6ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLm50aCh0aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgLyogYmFzZU4gKi9cbiAgICB2YXIgYmFzZU4gPSBmdW5jdGlvbihhcnksIG5lbGVtLCBmdW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgYmFzZSA9IGFyeS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgc2l6ZSA9IE1hdGgucG93KGJhc2UsIG5lbGVtKTtcbiAgICAgICAgdmFyIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmluZGV4ID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudGg6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVsZW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG4gJSBiYXNlO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnlbZF0pXG4gICAgICAgICAgICAgICAgICAgIG4gLT0gZDsgbiAvPSBiYXNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5udGgodGhpcy5pbmRleCsrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIChmdW4pID09PSAnZnVuY3Rpb24nKSA/IHRoYXQubWFwKGZ1bikgOiB0aGF0O1xuICAgIH07XG5cbiAgICAvKiBleHBvcnQgKi9cbiAgICB2YXIgQ29tYmluYXRvcmljcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgYWRkUHJvcGVydGllcyhDb21iaW5hdG9yaWNzLCB7XG4gICAgICAgIEM6IEMsXG4gICAgICAgIFA6IFAsXG4gICAgICAgIGZhY3RvcmlhbDogZmFjdG9yaWFsLFxuICAgICAgICBmYWN0b3JhZGljOiBmYWN0b3JhZGljLFxuICAgICAgICBjYXJ0ZXNpYW5Qcm9kdWN0OiBjYXJ0ZXNpYW5Qcm9kdWN0LFxuICAgICAgICBjb21iaW5hdGlvbjogY29tYmluYXRpb24sXG4gICAgICAgIGJpZ0NvbWJpbmF0aW9uOiBiaWdDb21iaW5hdGlvbixcbiAgICAgICAgcGVybXV0YXRpb246IHBlcm11dGF0aW9uLFxuICAgICAgICBwZXJtdXRhdGlvbkNvbWJpbmF0aW9uOiBwZXJtdXRhdGlvbkNvbWJpbmF0aW9uLFxuICAgICAgICBwb3dlcjogcG93ZXIsXG4gICAgICAgIGJhc2VOOiBiYXNlTixcbiAgICAgICAgVkVSU0lPTjogdmVyc2lvblxuICAgIH0pO1xuICAgIHJldHVybiBDb21iaW5hdG9yaWNzO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanMtY29tYmluYXRvcmljcy9jb21iaW5hdG9yaWNzLmpzXG4gKiogbW9kdWxlIGlkID0gNTc5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJpbXBvcnQgTGF5ZXJBc3NpZ25tZW50IGZyb20gJ2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3VzZXItZGVmaW5lZCdcblxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gKGdyYXBoKSA9PiB7XG4gIHJldHVybiBuZXcgTGF5ZXJBc3NpZ25tZW50KClcbiAgICAuZigodSkgPT4ge1xuICAgICAgY29uc3QgZCA9IGdyYXBoLnZlcnRleCh1KVxuICAgICAgaWYgKGQuZHVtbXkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmdyYXBoLmluVmVydGljZXModSkubWFwKCh2KSA9PiBncmFwaC52ZXJ0ZXgodikubGF5ZXJPcmRlcikpICogMiArIDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkLmxheWVyT3JkZXIgKiAyXG4gICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGF5ZXJBc3NpZ25tZW50XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9sYXllci1hc3NpZ25tZW50LmpzXG4gKiovIiwiY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hY2Nlc3NvcicpXG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBVc2VyRGVmaW5lZCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgZjogKCkgPT4gMFxuICAgIH0pXG4gIH1cblxuICBjYWxsIChnKSB7XG4gICAgY29uc3QgZiA9IHByaXZhdGVzLmdldCh0aGlzKS5mXG4gICAgY29uc3QgbGF5ZXJzID0ge31cbiAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICBsYXllcnNbdV0gPSBmKHUpXG4gICAgfVxuICAgIHJldHVybiBsYXllcnNcbiAgfVxuXG4gIGYgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2YnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyRGVmaW5lZFxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvdXNlci1kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gNTgxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9