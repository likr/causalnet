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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _graph = __webpack_require__(551);
	
	var _graph2 = _interopRequireDefault(_graph);
	
	var _copy = __webpack_require__(554);
	
	var _copy2 = _interopRequireDefault(_copy);
	
	var _sugiyama = __webpack_require__(555);
	
	var _sugiyama2 = _interopRequireDefault(_sugiyama);
	
	var _edgeConcentration = __webpack_require__(578);
	
	var _edgeConcentration2 = _interopRequireDefault(_edgeConcentration);
	
	var _rectangular = __webpack_require__(579);
	
	var _rectangular2 = _interopRequireDefault(_rectangular);
	
	var _newbery = __webpack_require__(580);
	
	var _newbery2 = _interopRequireDefault(_newbery);
	
	var _mbea = __webpack_require__(581);
	
	var _mbea2 = _interopRequireDefault(_mbea);
	
	var _quasiBicliqueMining = __webpack_require__(582);
	
	var _quasiBicliqueMining2 = _interopRequireDefault(_quasiBicliqueMining);
	
	var _completeQb = __webpack_require__(583);
	
	var _completeQb2 = _interopRequireDefault(_completeQb);
	
	var _biclusteringOptions = __webpack_require__(513);
	
	var _biclusteringOptions2 = _interopRequireDefault(_biclusteringOptions);
	
	var _layerAssignment = __webpack_require__(585);
	
	var _layerAssignment2 = _interopRequireDefault(_layerAssignment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint-env worker */
	
	var calcSize = function calcSize(vertices) {
	  var left = Math.min.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref) {
	    var x = _ref.x,
	        width = _ref.width;
	    return x - width / 2;
	  }))));
	  var right = Math.max.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref2) {
	    var x = _ref2.x,
	        width = _ref2.width;
	    return x + width / 2;
	  }))));
	  var top = Math.min.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref3) {
	    var y = _ref3.y,
	        height = _ref3.height;
	    return y - height / 2;
	  }))));
	  var bottom = Math.max.apply(Math, [0].concat(_toConsumableArray(vertices.map(function (_ref4) {
	    var y = _ref4.y,
	        height = _ref4.height;
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
	  var filteredVertices = options.filteredVertices,
	      biclusteringOption = options.biclusteringOption,
	      epsilon = options.epsilon;
	
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
	  var layerMargin = options.layerMargin,
	      vertexMargin = options.vertexMargin;
	
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
	      var _positions$vertices$u = positions.vertices[u],
	          x = _positions$vertices$u.x,
	          y = _positions$vertices$u.y,
	          width = _positions$vertices$u.width,
	          height = _positions$vertices$u.height;
	
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
	      var _step3$value = _slicedToArray(_step3.value, 2),
	          _u = _step3$value[0],
	          _v2 = _step3$value[1];
	
	      if (positions.edges[_u][_v2]) {
	        var _d = transformedGraph.edge(_u, _v2);
	        var ud = transformedGraph.vertex(_u);
	        var vd = transformedGraph.vertex(_v2);
	        var _positions$edges$_u$_ = positions.edges[_u][_v2],
	            points = _positions$edges$_u$_.points,
	            width = _positions$edges$_u$_.width,
	            reversed = _positions$edges$_u$_.reversed;
	
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
	  var vertices = data.vertices,
	      edges = data.edges,
	      options = data.options;
	
	  var graph = new _graph2.default();
	  var _iteratorNormalCompletion6 = true;
	  var _didIteratorError6 = false;
	  var _iteratorError6 = undefined;
	
	  try {
	    for (var _iterator6 = vertices[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	      var _ref10 = _step6.value;
	      var u = _ref10.u,
	          d = _ref10.d;
	
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
	      var _ref11 = _step7.value;
	      var u = _ref11.u,
	          v = _ref11.v,
	          d = _ref11.d;
	
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

/***/ }),

/***/ 513:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(552)


/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

	const AbstractGraph = __webpack_require__(553)
	
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


/***/ }),

/***/ 553:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(552)
	
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


/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(551)
	const accessor = __webpack_require__(556)
	const connectedComponents = __webpack_require__(557)
	const groupLayers = __webpack_require__(558)
	const cycleRemoval = __webpack_require__(559)
	const layerAssignment = __webpack_require__(562)
	const normalize = __webpack_require__(565)
	const crossingReduction = __webpack_require__(566)
	const positionAssignment = __webpack_require__(570)
	const bundleEdges = __webpack_require__(577)
	
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


/***/ }),

/***/ 556:
/***/ (function(module, exports) {

	const accessor = (self, privates, key, args) => {
	  if (args.length === 0) {
	    return privates.get(self)[key]
	  }
	  privates.get(self)[key] = args[0]
	  return self
	}
	
	module.exports = accessor


/***/ }),

/***/ 557:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 558:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

	const CycleRemoval = __webpack_require__(560)
	
	module.exports = {CycleRemoval}


/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

	const cycleEdges = __webpack_require__(561)
	
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


/***/ }),

/***/ 561:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

	const LongestPath = __webpack_require__(563)
	const QuadHeuristic = __webpack_require__(564)
	
	module.exports = {LongestPath, QuadHeuristic}


/***/ }),

/***/ 563:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(556)
	const LongestPath = __webpack_require__(563)
	
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


/***/ }),

/***/ 565:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

	const LayerSweep = __webpack_require__(567)
	
	module.exports = {LayerSweep}


/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(556)
	const baryCenter = __webpack_require__(568)
	
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


/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

	const layerMatrix = __webpack_require__(569)
	
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


/***/ }),

/***/ 569:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

	const Brandes = __webpack_require__(571)
	
	module.exports = {Brandes}


/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

	const markConflicts = __webpack_require__(572)
	const verticalAlignment = __webpack_require__(574)
	const horizontalCompaction = __webpack_require__(576)
	
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


/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

	const layerEdges = __webpack_require__(573)
	
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


/***/ }),

/***/ 573:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

	const median = __webpack_require__(575)
	
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


/***/ }),

/***/ 575:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 576:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 577:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(551)
	const accessor = __webpack_require__(556)
	const cycleRemoval = __webpack_require__(559)
	const layerAssignment = __webpack_require__(562)
	const groupLayers = __webpack_require__(558)
	const rectangular = __webpack_require__(579)
	
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


/***/ }),

/***/ 579:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 580:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 581:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 582:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

	const {combination} = __webpack_require__(584)
	
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


/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _userDefined = __webpack_require__(586);
	
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

/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

	const accessor = __webpack_require__(556)
	
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWM5N2U1ZmNhZDcxODI2ZDNlNjI/ODFlNyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy9sYXlvdXQtd29ya2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaWNsdXN0ZXJpbmctb3B0aW9ucy5qcz84N2Y0Iiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2dyYXBoL211dGFibGUtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvYWJzdHJhY3QtZ3JhcGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvZ3JhcGgvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC91dGlscy9hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2Nvbm5lY3RlZC1jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3ljbGUtcmVtb3ZhbC9jeWNsZS1yZW1vdmFsLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtZWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L2xvbmdlc3QtcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L3F1YWQtaGV1cmlzdGljLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL25vcm1hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jcm9zc2luZy1yZWR1Y3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2xheWVyLXN3ZWVwLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9iYXJ5LWNlbnRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvbWFyay1jb25mbGljdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1lZGdlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvdmVydGljYWwtYWxpZ25tZW50LmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvbWVkaWFuLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9ob3Jpem9udGFsLWNvbXBhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvYnVuZGxlLWVkZ2VzLmpzIiwid2VicGFjazovLy8uL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcmVjdGFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL25ld2JlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL21iZWEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3F1YXNpLWJpY2xpcXVlLW1pbmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vY29tcGxldGUtcWIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb21iaW5hdG9yaWNzL2NvbWJpbmF0b3JpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xheWVyLWFzc2lnbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC91c2VyLWRlZmluZWQuanMiXSwibmFtZXMiOlsiY2FsY1NpemUiLCJ2ZXJ0aWNlcyIsImxlZnQiLCJNYXRoIiwibWluIiwibWFwIiwieCIsIndpZHRoIiwicmlnaHQiLCJtYXgiLCJ0b3AiLCJ5IiwiaGVpZ2h0IiwiYm90dG9tIiwiZWRnZUNvdW50IiwibmVpZ2hib3JzIiwiZmlsdGVyIiwidSIsImluZGV4T2YiLCJsZW5ndGgiLCJ0cmFuc2Zvcm0iLCJncmFwaCIsIm9wdGlvbnMiLCJmaWx0ZXJlZFZlcnRpY2VzIiwiYmljbHVzdGVyaW5nT3B0aW9uIiwiZXBzaWxvbiIsInNpemUiLCJoYXMiLCJyZW1vdmVWZXJ0ZXgiLCJOT05FIiwidmFsdWUiLCJ0cmFuc2Zvcm1lciIsImxheWVyQXNzaWdubWVudCIsImlkR2VuZXJhdG9yIiwic291cmNlIiwidGFyZ2V0IiwiQXJyYXkiLCJmcm9tIiwic29ydCIsImpvaW4iLCJkdW1teSIsIm5hbWUiLCJjb2xvciIsIkVER0VfQ09OQ0VOVFJBVElPTiIsIm1ldGhvZCIsIk5FV0JFUlkiLCJNQkVBIiwiUVVBU0lfQklDTElRVUVTIiwiaDEiLCJoMiIsIkNPTVBMRVRFX1FVQVNJX0JJQ0xJUVVFUyIsImxheW91dCIsImxheWVyTWFyZ2luIiwidmVydGV4TWFyZ2luIiwidHJhbnNmb3JtZWRHcmFwaCIsImxheW91dGVyIiwidmVydGV4V2lkdGgiLCJkIiwidmVydGV4SGVpZ2h0IiwiZWRnZVdpZHRoIiwiZWRnZU1hcmdpbiIsImVkZ2VCdW5kbGluZyIsInBvc2l0aW9ucyIsInZlcnRleCIsIlNldCIsImluVmVydGljZXMiLCJ2IiwiYWRkIiwib3V0VmVydGljZXMiLCJVIiwiTCIsInB1c2giLCJlZGdlcyIsImVkZ2UiLCJ1ZCIsInZkIiwicG9pbnRzIiwicmV2ZXJzZWQiLCJvcGFjaXR5IiwiT2JqZWN0IiwiYXNzaWduIiwib25tZXNzYWdlIiwiZGF0YSIsImFkZFZlcnRleCIsImFkZEVkZ2UiLCJwb3N0TWVzc2FnZSIsImYiLCJsYXllck9yZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDcENBOzs7O0FBQ0E7Ozs7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QUFFQTs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNUJBO0FBQ0E7O0FBRUEsbUJBQWtCOzs7Ozs7OztBQ0hsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUM1Q0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixpQkFBaUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCLFNBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFdBQVc7QUFDMUM7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDOzs7Ozs7Ozs7Ozs7OztBQzdnQkQ7Ozs7Ozs7O0FBRUEsS0FBTUUsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDWCxLQUFELEVBQVc7QUFDakMsVUFBTyw0QkFDSmlFLENBREksQ0FDRixVQUFDckUsQ0FBRCxFQUFPO0FBQ1IsU0FBTXdDLElBQUlwQyxNQUFNMEMsTUFBTixDQUFhOUMsQ0FBYixDQUFWO0FBQ0EsU0FBSXdDLEVBQUVqQixLQUFOLEVBQWE7QUFDWCxjQUFPckMsS0FBS00sR0FBTCxnQ0FBWVksTUFBTTRDLFVBQU4sQ0FBaUJoRCxDQUFqQixFQUFvQlosR0FBcEIsQ0FBd0IsVUFBQzZELENBQUQ7QUFBQSxnQkFBTzdDLE1BQU0wQyxNQUFOLENBQWFHLENBQWIsRUFBZ0JxQixVQUF2QjtBQUFBLFFBQXhCLENBQVosS0FBMEUsQ0FBMUUsR0FBOEUsQ0FBckY7QUFDRCxNQUZELE1BRU87QUFDTCxjQUFPOUIsRUFBRThCLFVBQUYsR0FBZSxDQUF0QjtBQUNEO0FBQ0YsSUFSSSxDQUFQO0FBU0QsRUFWRDs7bUJBWWV2RCxlOzs7Ozs7O0FDZGY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJsYXlvdXQtd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWM5N2U1ZmNhZDcxODI2ZDNlNjIiLCIvKiBlc2xpbnQtZW52IHdvcmtlciAqL1xuXG5pbXBvcnQgR3JhcGggZnJvbSAnZWdyYXBoL2dyYXBoJ1xuaW1wb3J0IGNvcHkgZnJvbSAnZWdyYXBoL2dyYXBoL2NvcHknXG5pbXBvcnQgTGF5b3V0ZXIgZnJvbSAnZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hJ1xuaW1wb3J0IEVkZ2VDb25jZW50cmF0aW9uVHJhbnNmb3JtZXIgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbidcbmltcG9ydCByZWN0YW5ndWxhciBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3JlY3Rhbmd1bGFyJ1xuaW1wb3J0IG5ld2JlcnkgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9uZXdiZXJ5J1xuaW1wb3J0IG1iZWEgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9tYmVhJ1xuaW1wb3J0IHF1YXNpQmljbGlxdWVNaW5pbmcgZnJvbSAnZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9xdWFzaS1iaWNsaXF1ZS1taW5pbmcnXG5pbXBvcnQgY29tcGxldGVRQiBmcm9tICdlZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL2NvbXBsZXRlLXFiJ1xuaW1wb3J0IGJpY2x1c3RlcmluZ09wdGlvbnMgZnJvbSAnLi4vYmljbHVzdGVyaW5nLW9wdGlvbnMnXG5pbXBvcnQgbGF5ZXJBc3NpZ25tZW50IGZyb20gJy4uL3V0aWxzL2xheWVyLWFzc2lnbm1lbnQnXG5cbmNvbnN0IGNhbGNTaXplID0gKHZlcnRpY2VzKSA9PiB7XG4gIGNvbnN0IGxlZnQgPSBNYXRoLm1pbigwLCAuLi52ZXJ0aWNlcy5tYXAoKHt4LCB3aWR0aH0pID0+IHggLSB3aWR0aCAvIDIpKVxuICBjb25zdCByaWdodCA9IE1hdGgubWF4KDAsIC4uLnZlcnRpY2VzLm1hcCgoe3gsIHdpZHRofSkgPT4geCArIHdpZHRoIC8gMikpXG4gIGNvbnN0IHRvcCA9IE1hdGgubWluKDAsIC4uLnZlcnRpY2VzLm1hcCgoe3ksIGhlaWdodH0pID0+IHkgLSBoZWlnaHQgLyAyKSlcbiAgY29uc3QgYm90dG9tID0gTWF0aC5tYXgoMCwgLi4udmVydGljZXMubWFwKCh7eSwgaGVpZ2h0fSkgPT4geSArIGhlaWdodCAvIDIpKVxuICByZXR1cm4ge1xuICAgIHdpZHRoOiByaWdodCAtIGxlZnQsXG4gICAgaGVpZ2h0OiBib3R0b20gLSB0b3BcbiAgfVxufVxuXG5jb25zdCBlZGdlQ291bnQgPSAodmVydGljZXMsIG5laWdoYm9ycykgPT4ge1xuICByZXR1cm4gbmVpZ2hib3JzLmZpbHRlcigodSkgPT4gdmVydGljZXMuaW5kZXhPZih1KSA+PSAwKS5sZW5ndGhcbn1cblxuY29uc3QgdHJhbnNmb3JtID0gKGdyYXBoLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHtmaWx0ZXJlZFZlcnRpY2VzLCBiaWNsdXN0ZXJpbmdPcHRpb24sIGVwc2lsb259ID0gb3B0aW9uc1xuICBpZiAoZmlsdGVyZWRWZXJ0aWNlcy5zaXplID4gMCkge1xuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgICBpZiAoIWZpbHRlcmVkVmVydGljZXMuaGFzKHUpKSB7XG4gICAgICAgIGdyYXBoLnJlbW92ZVZlcnRleCh1KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoYmljbHVzdGVyaW5nT3B0aW9uID09PSBiaWNsdXN0ZXJpbmdPcHRpb25zLk5PTkUudmFsdWUpIHtcbiAgICByZXR1cm4gZ3JhcGhcbiAgfVxuICBjb25zdCB0cmFuc2Zvcm1lciA9IG5ldyBFZGdlQ29uY2VudHJhdGlvblRyYW5zZm9ybWVyKClcbiAgICAubGF5ZXJBc3NpZ25tZW50KGxheWVyQXNzaWdubWVudChncmFwaCkpXG4gICAgLmlkR2VuZXJhdG9yKChncmFwaCwgc291cmNlLCB0YXJnZXQpID0+IHtcbiAgICAgIHNvdXJjZSA9IEFycmF5LmZyb20oc291cmNlKVxuICAgICAgc291cmNlLnNvcnQoKVxuICAgICAgdGFyZ2V0ID0gQXJyYXkuZnJvbSh0YXJnZXQpXG4gICAgICB0YXJnZXQuc29ydCgpXG4gICAgICByZXR1cm4gYCR7c291cmNlLmpvaW4oJywnKX06JHt0YXJnZXQuam9pbignLCcpfWBcbiAgICB9KVxuICAgIC5kdW1teSgoKSA9PiAoe1xuICAgICAgZHVtbXk6IHRydWUsXG4gICAgICBuYW1lOiAnJyxcbiAgICAgIGNvbG9yOiAnIzg4OCdcbiAgICB9KSlcbiAgc3dpdGNoIChiaWNsdXN0ZXJpbmdPcHRpb24pIHtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuRURHRV9DT05DRU5UUkFUSU9OLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKHJlY3Rhbmd1bGFyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuTkVXQkVSWS52YWx1ZTpcbiAgICAgIHRyYW5zZm9ybWVyLm1ldGhvZChuZXdiZXJ5KVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuTUJFQS52YWx1ZTpcbiAgICAgIHRyYW5zZm9ybWVyLm1ldGhvZChtYmVhKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuUVVBU0lfQklDTElRVUVTLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKChncmFwaCwgaDEsIGgyKSA9PiBxdWFzaUJpY2xpcXVlTWluaW5nKGdyYXBoLCBoMSwgaDIsIGVwc2lsb24pKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJpY2x1c3RlcmluZ09wdGlvbnMuQ09NUExFVEVfUVVBU0lfQklDTElRVUVTLnZhbHVlOlxuICAgICAgdHJhbnNmb3JtZXIubWV0aG9kKChncmFwaCwgaDEsIGgyKSA9PiBjb21wbGV0ZVFCKGdyYXBoLCBoMSwgaDIsIDEsIDMpKVxuICAgICAgYnJlYWtcbiAgfVxuICByZXR1cm4gdHJhbnNmb3JtZXIudHJhbnNmb3JtKGNvcHkoZ3JhcGgpKVxufVxuXG5jb25zdCBsYXlvdXQgPSAoZ3JhcGgsIG9wdGlvbnMpID0+IHtcbiAgY29uc3Qge2xheWVyTWFyZ2luLCB2ZXJ0ZXhNYXJnaW59ID0gb3B0aW9uc1xuICBjb25zdCB0cmFuc2Zvcm1lZEdyYXBoID0gdHJhbnNmb3JtKGdyYXBoLCBvcHRpb25zKVxuICBjb25zdCBsYXlvdXRlciA9IG5ldyBMYXlvdXRlcigpXG4gICAgLmxheWVyQXNzaWdubWVudChsYXllckFzc2lnbm1lbnQodHJhbnNmb3JtZWRHcmFwaCkpXG4gICAgLmxheWVyTWFyZ2luKGxheWVyTWFyZ2luKVxuICAgIC52ZXJ0ZXhXaWR0aCgoe2R9KSA9PiBkLmR1bW15ID8gMjUgOiAxNjApXG4gICAgLnZlcnRleEhlaWdodCgoe2R9KSA9PiBkLmR1bW15ID8gMTAgOiAyMClcbiAgICAudmVydGV4TWFyZ2luKHZlcnRleE1hcmdpbilcbiAgICAuZWRnZVdpZHRoKCgpID0+IDMpXG4gICAgLmVkZ2VNYXJnaW4oMylcbiAgICAuZWRnZUJ1bmRsaW5nKHRydWUpXG4gIGNvbnN0IHBvc2l0aW9ucyA9IGxheW91dGVyLmxheW91dCh0cmFuc2Zvcm1lZEdyYXBoKVxuXG4gIGNvbnN0IHZlcnRpY2VzID0gW11cbiAgZm9yIChjb25zdCB1IG9mIHRyYW5zZm9ybWVkR3JhcGgudmVydGljZXMoKSkge1xuICAgIGNvbnN0IGQgPSB0cmFuc2Zvcm1lZEdyYXBoLnZlcnRleCh1KVxuICAgIGNvbnN0IG5laWdoYm9ycyA9IG5ldyBTZXQoKVxuICAgIGZvciAoY29uc3QgdiBvZiB0cmFuc2Zvcm1lZEdyYXBoLmluVmVydGljZXModSkpIHtcbiAgICAgIG5laWdoYm9ycy5hZGQodilcbiAgICB9XG4gICAgZm9yIChjb25zdCB2IG9mIHRyYW5zZm9ybWVkR3JhcGgub3V0VmVydGljZXModSkpIHtcbiAgICAgIG5laWdoYm9ycy5hZGQodilcbiAgICB9XG4gICAgZC5uZWlnaGJvcnMgPSBBcnJheS5mcm9tKG5laWdoYm9ycylcbiAgICBpZiAoZC5kdW1teSkge1xuICAgICAgZC5VID0gdHJhbnNmb3JtZWRHcmFwaC5pblZlcnRpY2VzKHUpXG4gICAgICBkLkwgPSB0cmFuc2Zvcm1lZEdyYXBoLm91dFZlcnRpY2VzKHUpXG4gICAgfVxuICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBvc2l0aW9ucy52ZXJ0aWNlc1t1XVxuICAgIHZlcnRpY2VzLnB1c2goe3UsIGQsIHgsIHksIHdpZHRoLCBoZWlnaHR9KVxuICB9XG5cbiAgY29uc3QgZWRnZXMgPSBbXVxuICBmb3IgKGNvbnN0IFt1LCB2XSBvZiB0cmFuc2Zvcm1lZEdyYXBoLmVkZ2VzKCkpIHtcbiAgICBpZiAocG9zaXRpb25zLmVkZ2VzW3VdW3ZdKSB7XG4gICAgICBjb25zdCBkID0gdHJhbnNmb3JtZWRHcmFwaC5lZGdlKHUsIHYpXG4gICAgICBjb25zdCB1ZCA9IHRyYW5zZm9ybWVkR3JhcGgudmVydGV4KHUpXG4gICAgICBjb25zdCB2ZCA9IHRyYW5zZm9ybWVkR3JhcGgudmVydGV4KHYpXG4gICAgICBjb25zdCB7cG9pbnRzLCB3aWR0aCwgcmV2ZXJzZWR9ID0gcG9zaXRpb25zLmVkZ2VzW3VdW3ZdXG4gICAgICB3aGlsZSAocG9pbnRzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcG9pbnRzLnB1c2gocG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSlcbiAgICAgIH1cbiAgICAgIGxldCBvcGFjaXR5XG4gICAgICBpZiAodWQuZHVtbXkpIHtcbiAgICAgICAgb3BhY2l0eSA9IGVkZ2VDb3VudCh1ZC5VLCBncmFwaC5pblZlcnRpY2VzKHYpKSAvIHVkLlUubGVuZ3RoXG4gICAgICB9IGVsc2UgaWYgKHZkLmR1bW15KSB7XG4gICAgICAgIG9wYWNpdHkgPSBlZGdlQ291bnQodmQuTCwgZ3JhcGgub3V0VmVydGljZXModSkpIC8gdmQuTC5sZW5ndGhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wYWNpdHkgPSAxXG4gICAgICB9XG4gICAgICBlZGdlcy5wdXNoKHt1LCB2LCB1ZCwgdmQsIGQsIHBvaW50cywgcmV2ZXJzZWQsIHdpZHRoLCBvcGFjaXR5fSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7dmVydGljZXMsIGVkZ2VzfSwgY2FsY1NpemUodmVydGljZXMpKVxufVxuXG5vbm1lc3NhZ2UgPSAoe2RhdGF9KSA9PiB7XG4gIGNvbnN0IHt2ZXJ0aWNlcywgZWRnZXMsIG9wdGlvbnN9ID0gZGF0YVxuICBjb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpXG4gIGZvciAoY29uc3Qge3UsIGR9IG9mIHZlcnRpY2VzKSB7XG4gICAgZ3JhcGguYWRkVmVydGV4KHUsIGQpXG4gIH1cbiAgZm9yIChjb25zdCB7dSwgdiwgZH0gb2YgZWRnZXMpIHtcbiAgICBncmFwaC5hZGRFZGdlKHUsIHYsIGQpXG4gIH1cblxuICBvcHRpb25zLmZpbHRlcmVkVmVydGljZXMgPSBuZXcgU2V0KG9wdGlvbnMuZmlsdGVyZWRWZXJ0aWNlcylcblxuICBwb3N0TWVzc2FnZShsYXlvdXQoZ3JhcGgsIG9wdGlvbnMpKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dvcmtlcnMvbGF5b3V0LXdvcmtlci5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgRURHRV9DT05DRU5UUkFUSU9OOiB7bmFtZTogJ0VkZ2UgQ29uY2VudHJhdGlvbicsIHZhbHVlOiAnZWRnZS1jb25jZW50cmF0aW9uJ30sXG4gIE5FV0JFUlk6IHtuYW1lOiAnTmV3YmVyeScsIHZhbHVlOiAnbmV3YmVyeSd9LFxuICBNQkVBOiB7bmFtZTogJ01CRUEnLCB2YWx1ZTogJ21iZWEnfSxcbiAgUVVBU0lfQklDTElRVUVTOiB7bmFtZTogJ1F1YXNpLWJpY2xpcXVlcycsIHZhbHVlOiAncXVhc2ktYmljbGlxdWVzJ30sXG4gIENPTVBMRVRFX1FVQVNJX0JJQ0xJUVVFUzoge25hbWU6ICdDb21wbGV0ZSBRdWFzaS1iaWNsaXF1ZXMnLCB2YWx1ZTogJ2NvbXBsZXRlLXF1YXNpLWJpY2xpcXVlcyd9LFxuICBOT05FOiB7bmFtZTogJ05vbmUnLCB2YWx1ZTogJ25vbmUnfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2JpY2x1c3RlcmluZy1vcHRpb25zLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL211dGFibGUtZ3JhcGgnKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9ncmFwaC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IEFic3RyYWN0R3JhcGggPSByZXF1aXJlKCcuL2Fic3RyYWN0LWdyYXBoJylcblxuY29uc3QgcHJpdmF0ZXMgPSBuZXcgV2Vha01hcCgpXG5cbmNvbnN0IHAgPSAoc2VsZikgPT4gcHJpdmF0ZXMuZ2V0KHNlbGYpXG5cbmNsYXNzIE11dGFibGVHcmFwaCBleHRlbmRzIEFic3RyYWN0R3JhcGgge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICB2ZXJ0aWNlczogbmV3IE1hcCgpLFxuICAgICAgbnVtVmVydGljZXM6IDAsXG4gICAgICBudW1FZGdlczogMFxuICAgIH0pXG4gIH1cblxuICB2ZXJ0ZXggKHUpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHAodGhpcykudmVydGljZXNcbiAgICBpZiAodmVydGljZXMuZ2V0KHUpKSB7XG4gICAgICByZXR1cm4gdmVydGljZXMuZ2V0KHUpLmRhdGFcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGVkZ2UgKHUsIHYpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHAodGhpcykudmVydGljZXNcbiAgICBpZiAodmVydGljZXMuZ2V0KHUpICYmIHZlcnRpY2VzLmdldCh1KS5vdXRWZXJ0aWNlcy5nZXQodikpIHtcbiAgICAgIHJldHVybiB2ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMuZ2V0KHYpXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2ZXJ0aWNlcyAoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocCh0aGlzKS52ZXJ0aWNlcy5rZXlzKCkpXG4gIH1cblxuICBvdXRWZXJ0aWNlcyAodSkge1xuICAgIGlmICh0aGlzLnZlcnRleCh1KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZlcnRleDogJHt1fWApXG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHAodGhpcykudmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLmtleXMoKSlcbiAgfVxuXG4gIGluVmVydGljZXMgKHUpIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShwKHRoaXMpLnZlcnRpY2VzLmdldCh1KS5pblZlcnRpY2VzLmtleXMoKSlcbiAgfVxuXG4gIG51bVZlcnRpY2VzICgpIHtcbiAgICByZXR1cm4gcCh0aGlzKS5udW1WZXJ0aWNlc1xuICB9XG5cbiAgbnVtRWRnZXMgKCkge1xuICAgIHJldHVybiBwKHRoaXMpLm51bUVkZ2VzXG4gIH1cblxuICBvdXREZWdyZWUgKHUpIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICByZXR1cm4gcCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMuc2l6ZVxuICB9XG5cbiAgaW5EZWdyZWUgKHUpIHtcbiAgICBpZiAodGhpcy52ZXJ0ZXgodSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2ZXJ0ZXg6ICR7dX1gKVxuICAgIH1cbiAgICByZXR1cm4gcCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkuaW5WZXJ0aWNlcy5zaXplXG4gIH1cblxuICBhZGRWZXJ0ZXggKHUsIG9iaiA9IHt9KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5zZXQodSwge1xuICAgICAgb3V0VmVydGljZXM6IG5ldyBNYXAoKSxcbiAgICAgIGluVmVydGljZXM6IG5ldyBNYXAoKSxcbiAgICAgIGRhdGE6IG9ialxuICAgIH0pXG4gICAgcCh0aGlzKS5udW1WZXJ0aWNlcysrXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZEVkZ2UgKHUsIHYsIG9iaiA9IHt9KSB7XG4gICAgaWYgKHRoaXMudmVydGV4KHUpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3V9YClcbiAgICB9XG4gICAgaWYgKHRoaXMudmVydGV4KHYpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmVydGV4OiAke3Z9YClcbiAgICB9XG4gICAgaWYgKHRoaXMuZWRnZSh1LCB2KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGVkIGVkZ2U6ICgke3V9LCAke3Z9KWApXG4gICAgfVxuICAgIHAodGhpcykubnVtRWRnZXMrK1xuICAgIHAodGhpcykudmVydGljZXMuZ2V0KHUpLm91dFZlcnRpY2VzLnNldCh2LCBvYmopXG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5nZXQodikuaW5WZXJ0aWNlcy5zZXQodSwgb2JqKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVWZXJ0ZXggKHUpIHtcbiAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgdGhpcy5yZW1vdmVFZGdlKHUsIHYpXG4gICAgfVxuICAgIGZvciAoY29uc3QgdiBvZiB0aGlzLmluVmVydGljZXModSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlRWRnZSh2LCB1KVxuICAgIH1cbiAgICBwKHRoaXMpLnZlcnRpY2VzLmRlbGV0ZSh1KVxuICAgIHAodGhpcykubnVtVmVydGljZXMtLVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVFZGdlICh1LCB2KSB7XG4gICAgaWYgKHRoaXMuZWRnZSh1LCB2KSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZWRnZTogKCR7dX0sICR7dn0pYClcbiAgICB9XG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5nZXQodSkub3V0VmVydGljZXMuZGVsZXRlKHYpXG4gICAgcCh0aGlzKS52ZXJ0aWNlcy5nZXQodikuaW5WZXJ0aWNlcy5kZWxldGUodSlcbiAgICBwKHRoaXMpLm51bUVkZ2VzLS1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTXV0YWJsZUdyYXBoXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2dyYXBoL211dGFibGUtZ3JhcGguanNcbi8vIG1vZHVsZSBpZCA9IDU1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjbGFzcyBBYnN0cmFjdEdyYXBoIHtcbiAgZWRnZXMgKCkge1xuICAgIGNvbnN0IGVkZ2VzID0gW11cbiAgICBmb3IgKGNvbnN0IHUgb2YgdGhpcy52ZXJ0aWNlcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBlZGdlcy5wdXNoKFt1LCB2XSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVkZ2VzXG4gIH1cblxuICAqIG91dEVkZ2VzICh1KSB7XG4gICAgZm9yIChsZXQgdiBvZiB0aGlzLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICB5aWVsZCBbdSwgdl1cbiAgICB9XG4gIH1cblxuICAqIGluRWRnZXMgKHUpIHtcbiAgICBmb3IgKGxldCB2IG9mIHRoaXMuaW5WZXJ0aWNlcyh1KSkge1xuICAgICAgeWllbGQgW3YsIHVdXG4gICAgfVxuICB9XG5cbiAgdG9KU09OICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmVydGljZXM6IHRoaXMudmVydGljZXMoKS5tYXAoKHUpID0+ICh7dSwgZDogdGhpcy52ZXJ0ZXgodSl9KSksXG4gICAgICBlZGdlczogdGhpcy5lZGdlcygpLm1hcCgoW3UsIHZdKSA9PiAoe3UsIHYsIGQ6IHRoaXMuZWRnZSh1LCB2KX0pKVxuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0R3JhcGhcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvZ3JhcGgvYWJzdHJhY3QtZ3JhcGguanNcbi8vIG1vZHVsZSBpZCA9IDU1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBHcmFwaCA9IHJlcXVpcmUoJy4vbXV0YWJsZS1ncmFwaCcpXG5cbmNvbnN0IGNvcHkgPSAoZykgPT4ge1xuICBjb25zdCBuZXdHcmFwaCA9IG5ldyBHcmFwaCgpXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBuZXdHcmFwaC5hZGRWZXJ0ZXgodSwgZy52ZXJ0ZXgodSkpXG4gIH1cbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgbmV3R3JhcGguYWRkRWRnZSh1LCB2LCBnLmVkZ2UodSwgdikpXG4gIH1cbiAgcmV0dXJuIG5ld0dyYXBoXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9ncmFwaC9jb3B5LmpzXG4vLyBtb2R1bGUgaWQgPSA1NTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgR3JhcGggPSByZXF1aXJlKCcuLi8uLi9ncmFwaCcpXG5jb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcbmNvbnN0IGNvbm5lY3RlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuL21pc2MvY29ubmVjdGVkLWNvbXBvbmVudHMnKVxuY29uc3QgZ3JvdXBMYXllcnMgPSByZXF1aXJlKCcuL21pc2MvZ3JvdXAtbGF5ZXJzJylcbmNvbnN0IGN5Y2xlUmVtb3ZhbCA9IHJlcXVpcmUoJy4vY3ljbGUtcmVtb3ZhbCcpXG5jb25zdCBsYXllckFzc2lnbm1lbnQgPSByZXF1aXJlKCcuL2xheWVyLWFzc2lnbm1lbnQnKVxuY29uc3Qgbm9ybWFsaXplID0gcmVxdWlyZSgnLi9ub3JtYWxpemUnKVxuY29uc3QgY3Jvc3NpbmdSZWR1Y3Rpb24gPSByZXF1aXJlKCcuL2Nyb3NzaW5nLXJlZHVjdGlvbicpXG5jb25zdCBwb3NpdGlvbkFzc2lnbm1lbnQgPSByZXF1aXJlKCcuL3Bvc2l0aW9uLWFzc2lnbm1lbnQnKVxuY29uc3QgYnVuZGxlRWRnZXMgPSByZXF1aXJlKCcuL2J1bmRsZS1lZGdlcycpXG5cbmNvbnN0IGluaXRHcmFwaCA9IChnT3JpZywge2x0b3IsIHZlcnRleFdpZHRoLCB2ZXJ0ZXhIZWlnaHQsIGVkZ2VXaWR0aCwgbGF5ZXJNYXJnaW4sIHZlcnRleE1hcmdpbiwgdmVydGV4TGVmdE1hcmdpbiwgdmVydGV4UmlnaHRNYXJnaW4sIHZlcnRleFRvcE1hcmdpbiwgdmVydGV4Qm90dG9tTWFyZ2lufSkgPT4ge1xuICBjb25zdCBnID0gbmV3IEdyYXBoKClcbiAgZm9yIChjb25zdCB1IG9mIGdPcmlnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCBkID0gZ09yaWcudmVydGV4KHUpXG4gICAgY29uc3QgdyA9IHZlcnRleFdpZHRoKHt1LCBkfSlcbiAgICBjb25zdCBoID0gdmVydGV4SGVpZ2h0KHt1LCBkfSlcbiAgICBjb25zdCBob3Jpem9udGFsTWFyZ2luID0gdmVydGV4TGVmdE1hcmdpbih7dSwgZH0pICsgdmVydGV4UmlnaHRNYXJnaW4oe3UsIGR9KVxuICAgIGNvbnN0IHZlcnRpY2FsTWFyZ2luID0gdmVydGV4VG9wTWFyZ2luKHt1LCBkfSkgKyB2ZXJ0ZXhCb3R0b21NYXJnaW4oe3UsIGR9KVxuICAgIGcuYWRkVmVydGV4KHUsIHtcbiAgICAgIHdpZHRoOiBsdG9yID8gaCArIHZlcnRleE1hcmdpbiArIHZlcnRpY2FsTWFyZ2luIDogdyArIGxheWVyTWFyZ2luICsgaG9yaXpvbnRhbE1hcmdpbixcbiAgICAgIGhlaWdodDogbHRvciA/IHcgKyBsYXllck1hcmdpbiArIGhvcml6b250YWxNYXJnaW4gOiBoICsgdmVydGV4TWFyZ2luICsgdmVydGljYWxNYXJnaW4sXG4gICAgICBvcmlnV2lkdGg6IGx0b3IgPyBoIDogdyxcbiAgICAgIG9yaWdIZWlnaHQ6IGx0b3IgPyB3IDogaFxuICAgIH0pXG4gIH1cbiAgZm9yIChjb25zdCBbdSwgdl0gb2YgZ09yaWcuZWRnZXMoKSkge1xuICAgIGcuYWRkRWRnZSh1LCB2LCB7XG4gICAgICB3aWR0aDogZWRnZVdpZHRoKHtcbiAgICAgICAgdSxcbiAgICAgICAgdixcbiAgICAgICAgdWQ6IGdPcmlnLnZlcnRleCh1KSxcbiAgICAgICAgdmQ6IGdPcmlnLnZlcnRleCh2KSxcbiAgICAgICAgZDogZ09yaWcuZWRnZSh1LCB2KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIHJldHVybiBnXG59XG5cbmNvbnN0IHNpbXBsaWZ5ID0gKHBvaW50cywgbHRvcikgPT4ge1xuICBsZXQgaW5kZXggPSAxXG4gIHdoaWxlIChpbmRleCA8IHBvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgY29uc3QgeDAgPSBsdG9yID8gcG9pbnRzW2luZGV4XVsxXSA6IHBvaW50c1tpbmRleF1bMF1cbiAgICBjb25zdCB4MSA9IGx0b3IgPyBwb2ludHNbaW5kZXggKyAxXVsxXSA6IHBvaW50c1tpbmRleCArIDFdWzBdXG4gICAgaWYgKHgwID09PSB4MSkge1xuICAgICAgcG9pbnRzLnNwbGljZShpbmRleCwgMilcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggKz0gMlxuICAgIH1cbiAgfVxufVxuXG5jb25zdCByZXZlcnNlZCA9IChhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChjb25zdCB4IG9mIGFycikge1xuICAgIHJlc3VsdC51bnNoaWZ0KHgpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBidWlsZFJlc3VsdCA9IChnLCBsYXllcnMsIGx0b3IpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHZlcnRpY2VzOiB7fSxcbiAgICBlZGdlczoge31cbiAgfVxuICBjb25zdCBsYXllckhlaWdodHMgPSBbXVxuXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICByZXN1bHQuZWRnZXNbdV0gPSB7fVxuICB9XG5cbiAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcbiAgICBsZXQgbWF4SGVpZ2h0ID0gLUluZmluaXR5XG4gICAgZm9yIChjb25zdCB1IG9mIGxheWVyKSB7XG4gICAgICBtYXhIZWlnaHQgPSBNYXRoLm1heChtYXhIZWlnaHQsIGcudmVydGV4KHUpLm9yaWdIZWlnaHQgfHwgMClcbiAgICB9XG4gICAgbGF5ZXJIZWlnaHRzLnB1c2gobWF4SGVpZ2h0KVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBsYXllciA9IGxheWVyc1tpXVxuICAgIGNvbnN0IGxheWVySGVpZ2h0ID0gbGF5ZXJIZWlnaHRzW2ldXG4gICAgZm9yIChjb25zdCB1IG9mIGxheWVyKSB7XG4gICAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgICBpZiAoIXVOb2RlLmR1bW15KSB7XG4gICAgICAgIHJlc3VsdC52ZXJ0aWNlc1t1XSA9IHtcbiAgICAgICAgICB4OiBsdG9yID8gdU5vZGUueSA6IHVOb2RlLngsXG4gICAgICAgICAgeTogbHRvciA/IHVOb2RlLnggOiB1Tm9kZS55LFxuICAgICAgICAgIHdpZHRoOiBsdG9yID8gdU5vZGUub3JpZ0hlaWdodCA6IHVOb2RlLm9yaWdXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGx0b3IgPyB1Tm9kZS5vcmlnV2lkdGggOiB1Tm9kZS5vcmlnSGVpZ2h0LFxuICAgICAgICAgIGxheWVyOiB1Tm9kZS5sYXllcixcbiAgICAgICAgICBvcmRlcjogdU5vZGUub3JkZXJcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICAgICAgY29uc3QgcG9pbnRzID0gbHRvclxuICAgICAgICAgICAgPyBbW3VOb2RlLnkgKyAodU5vZGUub3JpZ0hlaWdodCB8fCAwKSAvIDIsIHVOb2RlLnhdLCBbdU5vZGUueSArIGxheWVySGVpZ2h0IC8gMiwgdU5vZGUueF1dXG4gICAgICAgICAgICA6IFtbdU5vZGUueCwgdU5vZGUueSArICh1Tm9kZS5vcmlnSGVpZ2h0IHx8IDApIC8gMl0sIFt1Tm9kZS54LCB1Tm9kZS55ICsgbGF5ZXJIZWlnaHQgLyAyXV1cbiAgICAgICAgICBsZXQgdyA9IHZcbiAgICAgICAgICBsZXQgd05vZGUgPSBnLnZlcnRleCh3KVxuICAgICAgICAgIGxldCBqID0gaSArIDFcbiAgICAgICAgICB3aGlsZSAod05vZGUuZHVtbXkpIHtcbiAgICAgICAgICAgIGlmIChsdG9yKSB7XG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS55IC0gbGF5ZXJIZWlnaHRzW2pdIC8gMiwgd05vZGUueF0pXG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS55ICsgbGF5ZXJIZWlnaHRzW2pdIC8gMiwgd05vZGUueF0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueCwgd05vZGUueSAtIGxheWVySGVpZ2h0c1tqXSAvIDJdKVxuICAgICAgICAgICAgICBwb2ludHMucHVzaChbd05vZGUueCwgd05vZGUueSArIGxheWVySGVpZ2h0c1tqXSAvIDJdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdyA9IGcub3V0VmVydGljZXModylbMF1cbiAgICAgICAgICAgIHdOb2RlID0gZy52ZXJ0ZXgodylcbiAgICAgICAgICAgIGogKz0gMVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobHRvcikge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLnkgLSBsYXllckhlaWdodHNbal0gLyAyLCB3Tm9kZS54XSlcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS55IC0gKHdOb2RlLm9yaWdIZWlnaHQgfHwgMCkgLyAyLCB3Tm9kZS54XSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goW3dOb2RlLngsIHdOb2RlLnkgLSBsYXllckhlaWdodHNbal0gLyAyXSlcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFt3Tm9kZS54LCB3Tm9kZS55IC0gKHdOb2RlLm9yaWdIZWlnaHQgfHwgMCkgLyAyXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgc2ltcGxpZnkocG9pbnRzLCBsdG9yKVxuICAgICAgICAgIGlmIChnLmVkZ2UodSwgdikucmV2ZXJzZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lZGdlc1t3XVt1XSA9IHtcbiAgICAgICAgICAgICAgcG9pbnRzOiByZXZlcnNlZChwb2ludHMpLFxuICAgICAgICAgICAgICByZXZlcnNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgd2lkdGg6IGcuZWRnZSh1LCB2KS53aWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQuZWRnZXNbdV1bd10gPSB7XG4gICAgICAgICAgICAgIHBvaW50czogcG9pbnRzLFxuICAgICAgICAgICAgICByZXZlcnNlZDogZmFsc2UsXG4gICAgICAgICAgICAgIHdpZHRoOiBnLmVkZ2UodSwgdikud2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBTdWdpeWFtYUxheW91dGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICB2ZXJ0ZXhXaWR0aDogKHtkfSkgPT4gZC53aWR0aCxcbiAgICAgIHZlcnRleEhlaWdodDogKHtkfSkgPT4gZC5oZWlnaHQsXG4gICAgICBlZGdlV2lkdGg6ICgpID0+IDEsXG4gICAgICBsYXllck1hcmdpbjogMTAsXG4gICAgICB2ZXJ0ZXhNYXJnaW46IDEwLFxuICAgICAgdmVydGV4TGVmdE1hcmdpbjogKCkgPT4gMCxcbiAgICAgIHZlcnRleFJpZ2h0TWFyZ2luOiAoKSA9PiAwLFxuICAgICAgdmVydGV4VG9wTWFyZ2luOiAoKSA9PiAwLFxuICAgICAgdmVydGV4Qm90dG9tTWFyZ2luOiAoKSA9PiAwLFxuICAgICAgZWRnZU1hcmdpbjogMTAsXG4gICAgICBsdG9yOiB0cnVlLFxuICAgICAgZWRnZUJ1bmRsaW5nOiBmYWxzZSxcbiAgICAgIGN5Y2xlUmVtb3ZhbDogbmV3IGN5Y2xlUmVtb3ZhbC5DeWNsZVJlbW92YWwoKSxcbiAgICAgIGxheWVyQXNzaWdubWVudDogbmV3IGxheWVyQXNzaWdubWVudC5RdWFkSGV1cmlzdGljKCksXG4gICAgICBjcm9zc2luZ1JlZHVjdGlvbjogbmV3IGNyb3NzaW5nUmVkdWN0aW9uLkxheWVyU3dlZXAoKSxcbiAgICAgIHBvc2l0aW9uQXNzaWdubWVudDogbmV3IHBvc2l0aW9uQXNzaWdubWVudC5CcmFuZGVzKClcbiAgICB9KVxuICB9XG5cbiAgbGF5b3V0IChnT3JpZykge1xuICAgIGNvbnN0IGcgPSBpbml0R3JhcGgoZ09yaWcsIHtcbiAgICAgIHZlcnRleFdpZHRoOiB0aGlzLnZlcnRleFdpZHRoKCksXG4gICAgICB2ZXJ0ZXhIZWlnaHQ6IHRoaXMudmVydGV4SGVpZ2h0KCksXG4gICAgICBlZGdlV2lkdGg6IHRoaXMuZWRnZVdpZHRoKCksXG4gICAgICBsYXllck1hcmdpbjogdGhpcy5sYXllck1hcmdpbigpLFxuICAgICAgdmVydGV4TWFyZ2luOiB0aGlzLnZlcnRleE1hcmdpbigpLFxuICAgICAgdmVydGV4TGVmdE1hcmdpbjogdGhpcy52ZXJ0ZXhMZWZ0TWFyZ2luKCksXG4gICAgICB2ZXJ0ZXhSaWdodE1hcmdpbjogdGhpcy52ZXJ0ZXhSaWdodE1hcmdpbigpLFxuICAgICAgdmVydGV4VG9wTWFyZ2luOiB0aGlzLnZlcnRleFRvcE1hcmdpbigpLFxuICAgICAgdmVydGV4Qm90dG9tTWFyZ2luOiB0aGlzLnZlcnRleEJvdHRvbU1hcmdpbigpLFxuICAgICAgbHRvcjogdGhpcy5sdG9yKClcbiAgICB9KVxuICAgIHRoaXMuY3ljbGVSZW1vdmFsKCkuY2FsbChnKVxuICAgIGNvbnN0IGxheWVyTWFwID0gdGhpcy5sYXllckFzc2lnbm1lbnQoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJzID0gZ3JvdXBMYXllcnMoZywgbGF5ZXJNYXAsIHRydWUpXG4gICAgbm9ybWFsaXplKGcsIGxheWVycywgbGF5ZXJNYXAsIHRoaXMuZWRnZU1hcmdpbigpLCB0aGlzLmxheWVyTWFyZ2luKCkpXG4gICAgY29uc3Qgbm9ybWFsaXplZExheWVycyA9IGxheWVycy5tYXAoKCkgPT4gW10pXG4gICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgY29ubmVjdGVkQ29tcG9uZW50cyhnKSkge1xuICAgICAgY29uc3QgdmVydGljZXMgPSBuZXcgU2V0KGNvbXBvbmVudClcbiAgICAgIGNvbnN0IGNvbXBvbmVudExheWVycyA9IGxheWVycy5tYXAoKGgpID0+IGguZmlsdGVyKCh1KSA9PiB2ZXJ0aWNlcy5oYXModSkpKVxuICAgICAgdGhpcy5jcm9zc2luZ1JlZHVjdGlvbigpLmNhbGwoZywgY29tcG9uZW50TGF5ZXJzKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIGNvbXBvbmVudExheWVyc1tpXSkge1xuICAgICAgICAgIG5vcm1hbGl6ZWRMYXllcnNbaV0ucHVzaCh1KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9ybWFsaXplZExheWVycy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgbGF5ZXIgPSBub3JtYWxpemVkTGF5ZXJzW2ldXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheWVyLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGNvbnN0IHUgPSBsYXllcltqXVxuICAgICAgICBnLnZlcnRleCh1KS5sYXllciA9IGlcbiAgICAgICAgZy52ZXJ0ZXgodSkub3JkZXIgPSBqXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb25Bc3NpZ25tZW50KCkuY2FsbChnLCBub3JtYWxpemVkTGF5ZXJzKVxuICAgIGlmICh0aGlzLmVkZ2VCdW5kbGluZygpKSB7XG4gICAgICBidW5kbGVFZGdlcyhnLCBub3JtYWxpemVkTGF5ZXJzLCB0aGlzLmx0b3IoKSlcbiAgICB9XG4gICAgcmV0dXJuIGJ1aWxkUmVzdWx0KGcsIG5vcm1hbGl6ZWRMYXllcnMsIHRoaXMubHRvcigpKVxuICB9XG5cbiAgdmVydGV4V2lkdGggKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleFdpZHRoJywgYXJndW1lbnRzKVxuICB9XG5cbiAgdmVydGV4SGVpZ2h0ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICd2ZXJ0ZXhIZWlnaHQnLCBhcmd1bWVudHMpXG4gIH1cblxuICBlZGdlV2lkdGggKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2VkZ2VXaWR0aCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGxheWVyTWFyZ2luICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdsYXllck1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleE1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4TWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgZWRnZU1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnZWRnZU1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleExlZnRNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleExlZnRNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhSaWdodE1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4UmlnaHRNYXJnaW4nLCBhcmd1bWVudHMpXG4gIH1cblxuICB2ZXJ0ZXhUb3BNYXJnaW4gKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ3ZlcnRleFRvcE1hcmdpbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHZlcnRleEJvdHRvbU1hcmdpbiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAndmVydGV4Qm90dG9tTWFyZ2luJywgYXJndW1lbnRzKVxuICB9XG5cbiAgbHRvciAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbHRvcicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGVkZ2VCdW5kbGluZyAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnZWRnZUJ1bmRsaW5nJywgYXJndW1lbnRzKVxuICB9XG5cbiAgY3ljbGVSZW1vdmFsICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdjeWNsZVJlbW92YWwnLCBhcmd1bWVudHMpXG4gIH1cblxuICBsYXllckFzc2lnbm1lbnQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2xheWVyQXNzaWdubWVudCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGNyb3NzaW5nUmVkdWN0aW9uICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdjcm9zc2luZ1JlZHVjdGlvbicsIGFyZ3VtZW50cylcbiAgfVxuXG4gIHBvc2l0aW9uQXNzaWdubWVudCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAncG9zaXRpb25Bc3NpZ25tZW50JywgYXJndW1lbnRzKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VnaXlhbWFMYXlvdXRlclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGFjY2Vzc29yID0gKHNlbGYsIHByaXZhdGVzLCBrZXksIGFyZ3MpID0+IHtcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHByaXZhdGVzLmdldChzZWxmKVtrZXldXG4gIH1cbiAgcHJpdmF0ZXMuZ2V0KHNlbGYpW2tleV0gPSBhcmdzWzBdXG4gIHJldHVybiBzZWxmXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNjZXNzb3JcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvdXRpbHMvYWNjZXNzb3IuanNcbi8vIG1vZHVsZSBpZCA9IDU1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBtYXJrQ2hpbGRyZW4gPSAoZ3JhcGgsIHUsIGlkLCByZXN1bHQpID0+IHtcbiAgaWYgKHJlc3VsdC5oYXModSkpIHtcbiAgICBjb25zdCBwcmV2SWQgPSByZXN1bHQuZ2V0KHUpXG4gICAgaWYgKHByZXZJZCAhPT0gaWQpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBncmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgICAgIGlmIChyZXN1bHQuZ2V0KHYpID09PSBwcmV2SWQpIHtcbiAgICAgICAgICByZXN1bHQuc2V0KHYsIGlkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG4gIHJlc3VsdC5zZXQodSwgaWQpXG4gIGZvciAoY29uc3QgdiBvZiBncmFwaC5vdXRWZXJ0aWNlcyh1KSkge1xuICAgIG1hcmtDaGlsZHJlbihncmFwaCwgdiwgaWQsIHJlc3VsdClcbiAgfVxufVxuXG5jb25zdCBjb25uZWN0ZWRDb21wb25lbnRzID0gKGdyYXBoKSA9PiB7XG4gIGNvbnN0IGNvbXBvbmVudElkTWFwID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgdSBvZiBncmFwaC52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGdyYXBoLmluRGVncmVlKHUpID09PSAwKSB7XG4gICAgICBtYXJrQ2hpbGRyZW4oZ3JhcGgsIHUsIHUsIGNvbXBvbmVudElkTWFwKVxuICAgIH1cbiAgfVxuICBjb25zdCBjb21wb25lbnRJZHMgPSBuZXcgU2V0KGNvbXBvbmVudElkTWFwLnZhbHVlcygpKVxuICByZXR1cm4gQXJyYXkuZnJvbShjb21wb25lbnRJZHMpLm1hcCgodSkgPT4ge1xuICAgIHJldHVybiBncmFwaC52ZXJ0aWNlcygpLmZpbHRlcigodikgPT4gY29tcG9uZW50SWRNYXAuZ2V0KHYpID09PSB1KVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbm5lY3RlZENvbXBvbmVudHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9jb25uZWN0ZWQtY29tcG9uZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gNTU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGdyb3VwTGF5ZXJzID0gKGcsIGxheWVycywgYWxsb3dFbXB0eUxheWVyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCBsYXllciA9IGxheWVyc1t1XVxuICAgIGlmIChyZXN1bHRbbGF5ZXJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdFtsYXllcl0gPSBbXVxuICAgIH1cbiAgICByZXN1bHRbbGF5ZXJdLnB1c2godSlcbiAgfVxuICBpZiAoYWxsb3dFbXB0eUxheWVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChyZXN1bHRbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHRbaV0gPSBbXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoKGgpID0+IGggIT09IHVuZGVmaW5lZClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdyb3VwTGF5ZXJzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgQ3ljbGVSZW1vdmFsID0gcmVxdWlyZSgnLi9jeWNsZS1yZW1vdmFsJylcblxubW9kdWxlLmV4cG9ydHMgPSB7Q3ljbGVSZW1vdmFsfVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jeWNsZS1yZW1vdmFsL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgY3ljbGVFZGdlcyA9IHJlcXVpcmUoJy4vY3ljbGUtZWRnZXMnKVxuXG5jb25zdCBjeWNsZVJlbW92YWwgPSAoZykgPT4ge1xuICBmb3IgKGNvbnN0IFt1LCB2XSBvZiBjeWNsZUVkZ2VzKGcpKSB7XG4gICAgY29uc3Qgb2JqID0gZy5lZGdlKHUsIHYpXG4gICAgZy5yZW1vdmVFZGdlKHUsIHYpXG4gICAgaWYgKHUgPT09IHYpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGNvbnN0IGVkZ2UgPSBnLmVkZ2UodiwgdSlcbiAgICBpZiAoZWRnZSkge1xuICAgICAgZWRnZS5tdWx0aXBsZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgZy5hZGRFZGdlKHYsIHUsIE9iamVjdC5hc3NpZ24oe3JldmVyc2VkOiB0cnVlfSwgb2JqKSlcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgQ3ljbGVSZW1vdmFsIHtcbiAgY2FsbCAoZykge1xuICAgIGN5Y2xlUmVtb3ZhbChnKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ3ljbGVSZW1vdmFsXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwvY3ljbGUtcmVtb3ZhbC5qc1xuLy8gbW9kdWxlIGlkID0gNTYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGN5Y2xlRWRnZXMgPSBmdW5jdGlvbiAoZykge1xuICBjb25zdCBzdGFjayA9IHt9XG4gIGNvbnN0IHZpc2l0ZWQgPSB7fVxuICBjb25zdCByZXN1bHQgPSBbXVxuXG4gIGNvbnN0IGRmcyA9ICh1KSA9PiB7XG4gICAgaWYgKHZpc2l0ZWRbdV0pIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2aXNpdGVkW3VdID0gdHJ1ZVxuICAgIHN0YWNrW3VdID0gdHJ1ZVxuICAgIGZvciAobGV0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgaWYgKHN0YWNrW3ZdKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFt1LCB2XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRmcyh2KVxuICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUgc3RhY2tbdV1cbiAgfVxuXG4gIGZvciAobGV0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgZGZzKHUpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3ljbGVFZGdlc1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9jeWNsZS1yZW1vdmFsL2N5Y2xlLWVkZ2VzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgTG9uZ2VzdFBhdGggPSByZXF1aXJlKCcuL2xvbmdlc3QtcGF0aCcpXG5jb25zdCBRdWFkSGV1cmlzdGljID0gcmVxdWlyZSgnLi9xdWFkLWhldXJpc3RpYycpXG5cbm1vZHVsZS5leHBvcnRzID0ge0xvbmdlc3RQYXRoLCBRdWFkSGV1cmlzdGljfVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9sYXllci1hc3NpZ25tZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgbG9uZ2VzdFBhdGggPSAoZykgPT4ge1xuICBjb25zdCB2aXNpdGVkID0ge31cbiAgY29uc3QgbGF5ZXJzID0ge31cblxuICBjb25zdCBkZnMgPSAodSkgPT4ge1xuICAgIGlmICh2aXNpdGVkW3VdKSB7XG4gICAgICByZXR1cm4gbGF5ZXJzW3VdXG4gICAgfVxuICAgIHZpc2l0ZWRbdV0gPSB0cnVlXG5cbiAgICBsZXQgbGF5ZXIgPSBJbmZpbml0eVxuICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBsYXllciA9IE1hdGgubWluKGxheWVyLCBkZnModikgLSAxKVxuICAgIH1cbiAgICBpZiAobGF5ZXIgPT09IEluZmluaXR5KSB7XG4gICAgICBsYXllciA9IDBcbiAgICB9XG4gICAgbGF5ZXJzW3VdID0gbGF5ZXJcbiAgICByZXR1cm4gbGF5ZXJcbiAgfVxuXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBpZiAoZy5pbkRlZ3JlZSh1KSA9PT0gMCkge1xuICAgICAgZGZzKHUpXG4gICAgfVxuICB9XG5cbiAgbGV0IG1pbkxheWVyID0gSW5maW5pdHlcbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIG1pbkxheWVyID0gTWF0aC5taW4obWluTGF5ZXIsIGxheWVyc1t1XSlcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgbGF5ZXJzW3VdIC09IG1pbkxheWVyXG4gIH1cblxuICByZXR1cm4gbGF5ZXJzXG59XG5cbmNsYXNzIExvbmdlc3RQYXRoIHtcbiAgY2FsbCAoZykge1xuICAgIHJldHVybiBsb25nZXN0UGF0aChnKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9uZ2VzdFBhdGhcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC9sb25nZXN0LXBhdGguanNcbi8vIG1vZHVsZSBpZCA9IDU2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcbmNvbnN0IExvbmdlc3RQYXRoID0gcmVxdWlyZSgnLi9sb25nZXN0LXBhdGgnKVxuXG5jb25zdCBxdWFkSGV1cmlzdGljID0gKGcsIHJlcGVhdCkgPT4ge1xuICBjb25zdCBsYXllcnMgPSBuZXcgTG9uZ2VzdFBhdGgoKS5jYWxsKGcpXG5cbiAgbGV0IG1pbkxheWVyID0gSW5maW5pdHlcbiAgbGV0IG1heExheWVyID0gLUluZmluaXR5XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBtaW5MYXllciA9IE1hdGgubWluKG1pbkxheWVyLCBsYXllcnNbdV0pXG4gICAgbWF4TGF5ZXIgPSBNYXRoLm1heChtYXhMYXllciwgbGF5ZXJzW3VdKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBpZiAoZy5pbkRlZ3JlZSh1KSA9PT0gMCkge1xuICAgICAgbGF5ZXJzW3VdID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICBsYXllcnNbdV0gLT0gbWluTGF5ZXJcbiAgICB9XG4gIH1cblxuICBjb25zdCB2ZXJ0aWNlcyA9IGcudmVydGljZXMoKS5maWx0ZXIodSA9PiBnLmluRGVncmVlKHUpID4gMCAmJiBnLm91dERlZ3JlZSh1KSA+IDApXG4gIGNvbnN0IHdlaWdodHMgPSB7fVxuICBjb25zdCBjbXAgPSAodSwgdikgPT4gd2VpZ2h0c1t2XSAtIHdlaWdodHNbdV1cbiAgZm9yIChsZXQgbG9vcCA9IDA7IGxvb3AgPCByZXBlYXQ7ICsrbG9vcCkge1xuICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgIHdlaWdodHNbdV0gPSAwXG4gICAgfVxuICAgIGZvciAoY29uc3QgW3UsIHZdIG9mIGcuZWRnZXMoKSkge1xuICAgICAgY29uc3QgbCA9IGxheWVyc1t2XSAtIGxheWVyc1t1XVxuICAgICAgd2VpZ2h0c1t1XSArPSBsXG4gICAgICB3ZWlnaHRzW3ZdICs9IGxcbiAgICB9XG5cbiAgICB2ZXJ0aWNlcy5zb3J0KGNtcClcbiAgICBmb3IgKGNvbnN0IHUgb2YgdmVydGljZXMpIHtcbiAgICAgIGxldCBzdW0gPSAwXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBsZXQgbGVmdE1heCA9IC1JbmZpbml0eVxuICAgICAgbGV0IHJpZ2h0TWluID0gSW5maW5pdHlcbiAgICAgIGZvciAoY29uc3QgdiBvZiBnLmluVmVydGljZXModSkpIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbdl1cbiAgICAgICAgbGVmdE1heCA9IE1hdGgubWF4KGxlZnRNYXgsIGxheWVyKVxuICAgICAgICBzdW0gKz0gbGF5ZXJcbiAgICAgICAgY291bnQgKz0gMVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCB2IG9mIGcub3V0VmVydGljZXModSkpIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbdl1cbiAgICAgICAgcmlnaHRNaW4gPSBNYXRoLm1pbihyaWdodE1pbiwgbGF5ZXIpXG4gICAgICAgIHN1bSArPSBsYXllclxuICAgICAgICBjb3VudCArPSAxXG4gICAgICB9XG4gICAgICBsYXllcnNbdV0gPSBNYXRoLm1pbihyaWdodE1pbiAtIDEsIE1hdGgubWF4KGxlZnRNYXggKyAxLCBNYXRoLnJvdW5kKHN1bSAvIGNvdW50KSkpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxheWVyc1xufVxuXG5jb25zdCBwcml2YXRlcyA9IG5ldyBXZWFrTWFwKClcblxuY2xhc3MgUXVhZEhldXJpc3RpYyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBwcml2YXRlcy5zZXQodGhpcywge1xuICAgICAgcmVwZWF0OiA0XG4gICAgfSlcbiAgfVxuXG4gIGNhbGwgKGcpIHtcbiAgICByZXR1cm4gcXVhZEhldXJpc3RpYyhnLCB0aGlzLnJlcGVhdCgpKVxuICB9XG5cbiAgcmVwZWF0ICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdyZXBlYXQnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBRdWFkSGV1cmlzdGljXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvcXVhZC1oZXVyaXN0aWMuanNcbi8vIG1vZHVsZSBpZCA9IDU2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBub3JtYWxpemUgPSAoZywgbGF5ZXJzLCBsYXllck1hcCwgZWRnZU1hcmdpbiwgbGF5ZXJNYXJnaW4pID0+IHtcbiAgdmFyIGksIHcxLCB3MlxuICBmb3IgKGxldCBbdSwgdl0gb2YgZy5lZGdlcygpKSB7XG4gICAgY29uc3QgZCA9IGcuZWRnZSh1LCB2KVxuICAgIGlmIChsYXllck1hcFt2XSAtIGxheWVyTWFwW3VdID4gMSkge1xuICAgICAgdzEgPSB1XG4gICAgICBmb3IgKGkgPSBsYXllck1hcFt1XSArIDE7IGkgPCBsYXllck1hcFt2XTsgKytpKSB7XG4gICAgICAgIHcyID0gU3ltYm9sKClcbiAgICAgICAgZy5hZGRWZXJ0ZXgodzIsIHtcbiAgICAgICAgICB1LFxuICAgICAgICAgIHYsXG4gICAgICAgICAgZHVtbXk6IHRydWUsXG4gICAgICAgICAgd2lkdGg6IGQud2lkdGggKyBlZGdlTWFyZ2luLFxuICAgICAgICAgIG9yaWdXaWR0aDogZC53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGxheWVyTWFyZ2luLFxuICAgICAgICAgIG9yaWdIZWlnaHQ6IDAsXG4gICAgICAgICAgbGF5ZXI6IGlcbiAgICAgICAgfSlcbiAgICAgICAgZy5hZGRFZGdlKHcxLCB3Miwge1xuICAgICAgICAgIHUsXG4gICAgICAgICAgdixcbiAgICAgICAgICBkdW1teTogdHJ1ZSxcbiAgICAgICAgICByZXZlcnNlZDogZy5lZGdlKHUsIHYpLnJldmVyc2VkLFxuICAgICAgICAgIHdpZHRoOiBkLndpZHRoXG4gICAgICAgIH0pXG4gICAgICAgIGxheWVyc1tpXS5wdXNoKHcyKVxuICAgICAgICB3MSA9IHcyXG4gICAgICB9XG4gICAgICBnLmFkZEVkZ2UodzEsIHYsIHtcbiAgICAgICAgdSxcbiAgICAgICAgdixcbiAgICAgICAgZHVtbXk6IHRydWUsXG4gICAgICAgIHJldmVyc2VkOiBnLmVkZ2UodSwgdikucmV2ZXJzZWQsXG4gICAgICAgIHdpZHRoOiBkLndpZHRoXG4gICAgICB9KVxuICAgICAgZy5yZW1vdmVFZGdlKHUsIHYpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL25vcm1hbGl6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IExheWVyU3dlZXAgPSByZXF1aXJlKCcuL2xheWVyLXN3ZWVwJylcblxubW9kdWxlLmV4cG9ydHMgPSB7TGF5ZXJTd2VlcH1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgYWNjZXNzb3IgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hY2Nlc3NvcicpXG5jb25zdCBiYXJ5Q2VudGVyID0gcmVxdWlyZSgnLi9iYXJ5LWNlbnRlcicpXG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBMYXllclN3ZWVwIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICByZXBlYXQ6IDgsXG4gICAgICBtZXRob2Q6IGJhcnlDZW50ZXJcbiAgICB9KVxuICB9XG5cbiAgY2FsbCAoZywgbGF5ZXJzKSB7XG4gICAgY29uc3QgbiA9IGxheWVycy5sZW5ndGhcbiAgICBjb25zdCByZXBlYXQgPSB0aGlzLnJlcGVhdCgpXG4gICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2QoKVxuXG4gICAgZm9yIChsZXQgbG9vcCA9IDA7IGxvb3AgPCByZXBlYXQ7ICsrbG9vcCkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgbWV0aG9kKGcsIGxheWVyc1tpIC0gMV0sIGxheWVyc1tpXSlcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSBuIC0gMTsgaSA+IDA7IC0taSkge1xuICAgICAgICBtZXRob2QoZywgbGF5ZXJzW2kgLSAxXSwgbGF5ZXJzW2ldLCB0cnVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlcGVhdCAoYXJnKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAncmVwZWF0JywgYXJndW1lbnRzKVxuICB9XG5cbiAgbWV0aG9kIChhcmcpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdtZXRob2QnLCBhcmd1bWVudHMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMYXllclN3ZWVwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2Nyb3NzaW5nLXJlZHVjdGlvbi9sYXllci1zd2VlcC5qc1xuLy8gbW9kdWxlIGlkID0gNTY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGxheWVyTWF0cml4ID0gcmVxdWlyZSgnLi4vbWlzYy9sYXllci1tYXRyaXgnKVxuXG5jb25zdCBiYXJ5Q2VudGVyID0gKGcsIGgxLCBoMiwgaW52ZXJzZSA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGNlbnRlcnMgPSB7fVxuICBjb25zdCBuID0gaDEubGVuZ3RoXG4gIGNvbnN0IG0gPSBoMi5sZW5ndGhcbiAgY29uc3QgYSA9IGxheWVyTWF0cml4KGcsIGgxLCBoMilcbiAgY29uc3QgY21wID0gKHUsIHYpID0+IGNlbnRlcnNbdV0gLSBjZW50ZXJzW3ZdXG4gIGlmIChpbnZlcnNlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGxldCBzdW0gPSAwXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG07ICsraikge1xuICAgICAgICBjb25zdCBhaWogPSBhW2kgKiBtICsgal1cbiAgICAgICAgY291bnQgKz0gYWlqXG4gICAgICAgIHN1bSArPSBqICogYWlqXG4gICAgICB9XG4gICAgICBjZW50ZXJzW2gxW2ldXSA9IHN1bSAvIGNvdW50XG4gICAgfVxuICAgIGgxLnNvcnQoY21wKVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICBsZXQgc3VtID0gMFxuICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgY29uc3QgYWlqID0gYVtpICogbSArIGpdXG4gICAgICAgIGNvdW50ICs9IGFpalxuICAgICAgICBzdW0gKz0gaSAqIGFpalxuICAgICAgfVxuICAgICAgY2VudGVyc1toMltqXV0gPSBzdW0gLyBjb3VudFxuICAgIH1cbiAgICBoMi5zb3J0KGNtcClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhcnlDZW50ZXJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvY3Jvc3NpbmctcmVkdWN0aW9uL2JhcnktY2VudGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1Njhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgbGF5ZXJNYXRyaXggPSAoZywgaDEsIGgyKSA9PiB7XG4gIGNvbnN0IG4gPSBoMS5sZW5ndGhcbiAgY29uc3QgbSA9IGgyLmxlbmd0aFxuICBjb25zdCBvcmRlcnMgPSB7fVxuICBjb25zdCBhID0gbmV3IEludDhBcnJheShuICogbSlcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG07ICsraSkge1xuICAgIG9yZGVyc1toMltpXV0gPSBpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICBjb25zdCB1ID0gaDFbaV1cbiAgICBmb3IgKGNvbnN0IHYgb2YgZy5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgYVtpICogbSArIG9yZGVyc1t2XV0gPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBhXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGF5ZXJNYXRyaXhcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9sYXllci1tYXRyaXguanNcbi8vIG1vZHVsZSBpZCA9IDU2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBCcmFuZGVzID0gcmVxdWlyZSgnLi9icmFuZGVzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7QnJhbmRlc31cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IG1hcmtDb25mbGljdHMgPSByZXF1aXJlKCcuL21hcmstY29uZmxpY3RzJylcbmNvbnN0IHZlcnRpY2FsQWxpZ25tZW50ID0gcmVxdWlyZSgnLi92ZXJ0aWNhbC1hbGlnbm1lbnQnKVxuY29uc3QgaG9yaXpvbnRhbENvbXBhY3Rpb24gPSByZXF1aXJlKCcuL2hvcml6b250YWwtY29tcGFjdGlvbicpXG5cbmNvbnN0IHNvcnQgPSAoeHMpID0+IHtcbiAgeHMuc29ydCgoeDEsIHgyKSA9PiB4MSAtIHgyKVxufVxuXG5jb25zdCBicmFuZGVzID0gKGcsIGxheWVycykgPT4ge1xuICBtYXJrQ29uZmxpY3RzKGcsIGxheWVycylcblxuICBjb25zdCB4cyA9IHt9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICB4c1t1XSA9IFtdXG4gIH1cbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtcbiAgICB7cnRvbDogZmFsc2UsIGJ0b3Q6IGZhbHNlfSxcbiAgICB7cnRvbDogdHJ1ZSwgYnRvdDogZmFsc2V9LFxuICAgIHtydG9sOiBmYWxzZSwgYnRvdDogdHJ1ZX0sXG4gICAge3J0b2w6IHRydWUsIGJ0b3Q6IHRydWV9XG4gIF1cblxuICBsZXQgbWluV2lkdGhMZWZ0ID0gLUluZmluaXR5XG4gIGxldCBtaW5XaWR0aFJpZ2h0ID0gSW5maW5pdHlcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZGlyZWN0aW9uc1tpXVxuICAgIHZlcnRpY2FsQWxpZ25tZW50KGcsIGxheWVycywgZGlyZWN0aW9uKVxuICAgIGhvcml6b250YWxDb21wYWN0aW9uKGcsIGxheWVycywgZGlyZWN0aW9uKVxuICAgIGxldCBtaW5YID0gSW5maW5pdHlcbiAgICBsZXQgbWF4WCA9IC1JbmZpbml0eVxuICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24ucnRvbCkge1xuICAgICAgICBnLnZlcnRleCh1KS54ID0gLWcudmVydGV4KHUpLnhcbiAgICAgIH1cbiAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCBnLnZlcnRleCh1KS54KVxuICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIGcudmVydGV4KHUpLngpXG4gICAgfVxuICAgIGlmIChtYXhYIC0gbWluWCA8IG1pbldpZHRoUmlnaHQgLSBtaW5XaWR0aExlZnQpIHtcbiAgICAgIG1pbldpZHRoTGVmdCA9IG1pblhcbiAgICAgIG1pbldpZHRoUmlnaHQgPSBtYXhYXG4gICAgfVxuICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgIHhzW3VdLnB1c2goZy52ZXJ0ZXgodSkueClcbiAgICB9XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZGlyZWN0aW9uc1tpXVxuICAgIGlmIChkaXJlY3Rpb24ucnRvbCkge1xuICAgICAgbGV0IG1heFggPSAtSW5maW5pdHlcbiAgICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIHhzW3VdW2ldKVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgICAgICB4c1t1XVtpXSArPSBtaW5XaWR0aFJpZ2h0IC0gbWF4WFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWluWCA9IEluZmluaXR5XG4gICAgICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCB4c1t1XVtpXSlcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgICAgeHNbdV1baV0gKz0gbWluV2lkdGhMZWZ0IC0gbWluWFxuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgc29ydCh4c1t1XSlcbiAgICBnLnZlcnRleCh1KS54ID0gKHhzW3VdWzFdICsgeHNbdV1bMl0pIC8gMlxuICB9XG59XG5cbmNvbnN0IG5vcm1hbGl6ZSA9IChnKSA9PiB7XG4gIGxldCB4TWluID0gSW5maW5pdHlcbiAgbGV0IHlNaW4gPSBJbmZpbml0eVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgdU5vZGUgPSBnLnZlcnRleCh1KVxuICAgIHhNaW4gPSBNYXRoLm1pbih4TWluLCB1Tm9kZS54IC0gdU5vZGUub3JpZ1dpZHRoIC8gMilcbiAgICB5TWluID0gTWF0aC5taW4oeU1pbiwgdU5vZGUueSAtIHVOb2RlLm9yaWdIZWlnaHQgLyAyKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgdU5vZGUueCAtPSB4TWluXG4gICAgdU5vZGUueSAtPSB5TWluXG4gIH1cbn1cblxuY2xhc3MgQnJhbmRlcyB7XG4gIGNhbGwgKGcsIGxheWVycykge1xuICAgIGJyYW5kZXMoZywgbGF5ZXJzKVxuXG4gICAgbGV0IHlPZmZzZXQgPSAwXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcbiAgICAgIGxldCBtYXhIZWlnaHQgPSAwXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgbGF5ZXIpIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gTWF0aC5tYXgobWF4SGVpZ2h0LCBnLnZlcnRleCh1KS5oZWlnaHQpXG4gICAgICB9XG4gICAgICB5T2Zmc2V0ICs9IG1heEhlaWdodCAvIDJcbiAgICAgIGZvciAoY29uc3QgdSBvZiBsYXllcikge1xuICAgICAgICBnLnZlcnRleCh1KS55ID0geU9mZnNldFxuICAgICAgfVxuICAgICAgeU9mZnNldCArPSBtYXhIZWlnaHQgLyAyXG4gICAgfVxuXG4gICAgbm9ybWFsaXplKGcpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCcmFuZGVzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL3Bvc2l0aW9uLWFzc2lnbm1lbnQvYnJhbmRlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGxheWVyRWRnZXMgPSByZXF1aXJlKCcuLi8uLi9taXNjL2xheWVyLWVkZ2VzJylcblxuY29uc3Qgc3BsaXQgPSAoeCwgZikgPT4ge1xuICBjb25zdCB5ID0gW11cbiAgY29uc3QgeiA9IFtdXG4gIGZvciAoY29uc3QgeGkgb2YgeCkge1xuICAgIGlmIChmKHhpKSkge1xuICAgICAgeS5wdXNoKHhpKVxuICAgIH0gZWxzZSB7XG4gICAgICB6LnB1c2goeGkpXG4gICAgfVxuICB9XG4gIHJldHVybiBbeSwgel1cbn1cblxuY29uc3QgbWFya0NvbmZsaWN0cyA9IChnLCBsYXllcnMpID0+IHtcbiAgY29uc3QgaCA9IGxheWVycy5sZW5ndGggLSAyXG4gIGNvbnN0IGR1bW15ID0ge31cbiAgY29uc3Qgb3JkZXIgPSB7fVxuICBjb25zdCBpc0lubmVyID0gKFt1LCB2XSkgPT4gZHVtbXlbdV0gJiYgZHVtbXlbdl1cblxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgY29uc3QgZCA9IGcudmVydGV4KHUpXG4gICAgZHVtbXlbdV0gPSAhIWQuZHVtbXlcbiAgICBvcmRlclt1XSA9IGQub3JkZXJcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgaDsgKytpKSB7XG4gICAgY29uc3QgaDEgPSBsYXllcnNbaV1cbiAgICBjb25zdCBoMiA9IGxheWVyc1tpICsgMV1cbiAgICBjb25zdCBlZGdlcyA9IGxheWVyRWRnZXMoZywgaDEsIGgyKVxuICAgIGNvbnN0IFtpbm5lclNlZ21lbnRzLCBvdXRlclNlZ21lbnRzXSA9IHNwbGl0KGVkZ2VzLCBpc0lubmVyKVxuICAgIGZvciAoY29uc3QgW3UxLCB2MV0gb2YgaW5uZXJTZWdtZW50cykge1xuICAgICAgZm9yIChjb25zdCBbdTIsIHYyXSBvZiBvdXRlclNlZ21lbnRzKSB7XG4gICAgICAgIGlmICgob3JkZXJbdTFdIDwgb3JkZXJbdTJdICYmIG9yZGVyW3YxXSA+IG9yZGVyW3YyXSkgfHwgKG9yZGVyW3UxXSA+IG9yZGVyW3UyXSAmJiBvcmRlclt2MV0gPCBvcmRlclt2Ml0pKSB7XG4gICAgICAgICAgZy5lZGdlKHUyLCB2MikudHlwZTFDb25mbGljdCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcmtDb25mbGljdHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL21hcmstY29uZmxpY3RzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NzJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgbGF5ZXJFZGdlcyA9IChnLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChjb25zdCB2IG9mIGgyKSB7XG4gICAgZm9yIChjb25zdCB1IG9mIGcuaW5WZXJ0aWNlcyh2KSkge1xuICAgICAgcmVzdWx0LnB1c2goW3UsIHZdKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGF5ZXJFZGdlc1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9taXNjL2xheWVyLWVkZ2VzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NzNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgbWVkaWFuID0gcmVxdWlyZSgnLi4vLi4vbWlzYy9tZWRpYW4nKVxuXG5jb25zdCB2ZXJ0aWNhbEFsaWdubWVudCA9IChnLCBsYXllcnMsIHsgcnRvbCA9IGZhbHNlLCBidG90ID0gZmFsc2UgfSkgPT4ge1xuICBjb25zdCBpdGVyTGF5ZXJzID0gZnVuY3Rpb24gKiAoKSB7XG4gICAgaWYgKGJ0b3QpIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYXllcnMubGVuZ3RoIC0gMjsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgeWllbGQgbGF5ZXJzW2ldXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHlpZWxkIGxheWVyc1tpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGl0ZXJMYXllciA9IGZ1bmN0aW9uICogKGxheWVyKSB7XG4gICAgaWYgKHJ0b2wpIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYXllci5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB5aWVsZCBsYXllcltpXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHlpZWxkIGxheWVyW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZWRnZSA9IGJ0b3QgPyAodSwgdikgPT4gZy5lZGdlKHYsIHUpIDogKHUsIHYpID0+IGcuZWRnZSh1LCB2KVxuICBjb25zdCBkZWdyZWUgPSBidG90ID8gdSA9PiBnLm91dERlZ3JlZSh1KSA6IHUgPT4gZy5pbkRlZ3JlZSh1KVxuICBjb25zdCBtZWQgPSBidG90ID8gKGcsIGxheWVycykgPT4gbWVkaWFuKGcsIGxheWVycywgdHJ1ZSkgOiAoZywgbGF5ZXJzKSA9PiBtZWRpYW4oZywgbGF5ZXJzKVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgZy52ZXJ0ZXgodSkucm9vdCA9IHVcbiAgICBnLnZlcnRleCh1KS5hbGlnbiA9IHVcbiAgfVxuICBmb3IgKGNvbnN0IGxheWVyIG9mIGl0ZXJMYXllcnMoKSkge1xuICAgIGxldCByID0gcnRvbCA/IEluZmluaXR5IDogLUluZmluaXR5XG4gICAgZm9yIChjb25zdCB2IG9mIGl0ZXJMYXllcihsYXllcikpIHtcbiAgICAgIGlmIChkZWdyZWUodikgPiAwKSB7XG4gICAgICAgIGNvbnN0IHtsZWZ0LCByaWdodH0gPSBtZWQoZywgdilcbiAgICAgICAgY29uc3QgbWVkaWFucyA9IGxlZnQgPT09IHJpZ2h0ID8gW2xlZnRdIDogKHJ0b2wgPyBbcmlnaHQsIGxlZnRdIDogW2xlZnQsIHJpZ2h0XSlcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIG1lZGlhbnMpIHtcbiAgICAgICAgICBpZiAoIWVkZ2UodSwgdikudHlwZTFDb25mbGljdCAmJiAhZWRnZSh1LCB2KS50eXBlMkNvbmZsaWN0KSB7XG4gICAgICAgICAgICBpZiAocnRvbCA/IHIgPiBnLnZlcnRleCh1KS5vcmRlciA6IHIgPCBnLnZlcnRleCh1KS5vcmRlcikge1xuICAgICAgICAgICAgICBnLnZlcnRleCh2KS5hbGlnbiA9IGcudmVydGV4KHYpLnJvb3QgPSBnLnZlcnRleCh1KS5yb290XG4gICAgICAgICAgICAgIGcudmVydGV4KHUpLmFsaWduID0gdlxuICAgICAgICAgICAgICByID0gZy52ZXJ0ZXgodSkub3JkZXJcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJ0aWNhbEFsaWdubWVudFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC9sYXlvdXRlci9zdWdpeWFtYS9wb3NpdGlvbi1hc3NpZ25tZW50L2JyYW5kZXMvdmVydGljYWwtYWxpZ25tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA1NzRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgbWVkaWFuID0gKGcsIHYsIGludmVyc2UgPSBmYWxzZSkgPT4ge1xuICBjb25zdCB2ZXJ0aWNlcyA9IEFycmF5LmZyb20oaW52ZXJzZSA/IGcub3V0VmVydGljZXModikgOiBnLmluVmVydGljZXModikpXG4gIHZlcnRpY2VzLnNvcnQoKHUxLCB1MikgPT4gZy52ZXJ0ZXgodTEpLm9yZGVyIC0gZy52ZXJ0ZXgodTIpLm9yZGVyKVxuICBjb25zdCBpbmRleCA9ICh2ZXJ0aWNlcy5sZW5ndGggLSAxKSAvIDJcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiB2ZXJ0aWNlc1tNYXRoLmZsb29yKGluZGV4KV0sXG4gICAgcmlnaHQ6IHZlcnRpY2VzW01hdGguY2VpbChpbmRleCldXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZWRpYW5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbWlzYy9tZWRpYW4uanNcbi8vIG1vZHVsZSBpZCA9IDU3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBob3Jpem9udGFsQ29tcGFjdGlvbiA9IChnLCBsYXllcnMsIHsgcnRvbCA9IGZhbHNlIH0pID0+IHtcbiAgY29uc3Qgb3JkZXJOb25aZXJvID0gKG5vZGUpID0+IHJ0b2xcbiAgICA/IG5vZGUub3JkZXIgPCBsYXllcnNbbm9kZS5sYXllcl0ubGVuZ3RoIC0gMVxuICAgIDogbm9kZS5vcmRlciA+IDBcbiAgY29uc3QgcHJlZGVjZXNzb3IgPSBydG9sXG4gICAgPyBub2RlID0+IGxheWVyc1tub2RlLmxheWVyXVtub2RlLm9yZGVyICsgMV1cbiAgICA6IG5vZGUgPT4gbGF5ZXJzW25vZGUubGF5ZXJdW25vZGUub3JkZXIgLSAxXVxuXG4gIGNvbnN0IHBsYWNlQmxvY2sgPSAodikgPT4ge1xuICAgIGNvbnN0IHZOb2RlID0gZy52ZXJ0ZXgodilcbiAgICBpZiAodk5vZGUueCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZOb2RlLnggPSAwXG4gICAgbGV0IHcgPSB2XG4gICAgZG8ge1xuICAgICAgY29uc3Qgd05vZGUgPSBnLnZlcnRleCh3KVxuICAgICAgaWYgKG9yZGVyTm9uWmVybyh3Tm9kZSkpIHtcbiAgICAgICAgY29uc3QgcCA9IHByZWRlY2Vzc29yKHdOb2RlKVxuICAgICAgICBjb25zdCBwTm9kZSA9IGcudmVydGV4KHApXG4gICAgICAgIGNvbnN0IHUgPSBwTm9kZS5yb290XG4gICAgICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICAgICAgcGxhY2VCbG9jayh1KVxuICAgICAgICBpZiAodk5vZGUuc2luayA9PT0gdikge1xuICAgICAgICAgIHZOb2RlLnNpbmsgPSB1Tm9kZS5zaW5rXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZOb2RlLnNpbmsgPT09IHVOb2RlLnNpbmspIHtcbiAgICAgICAgICB2Tm9kZS54ID0gTWF0aC5tYXgodk5vZGUueCwgdU5vZGUueCArIChwTm9kZS53aWR0aCArIHdOb2RlLndpZHRoKSAvIDIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdVNpbmtOb2RlID0gZy52ZXJ0ZXgodU5vZGUuc2luaylcbiAgICAgICAgICB1U2lua05vZGUuc2hpZnQgPSBNYXRoLm1pbih1U2lua05vZGUuc2hpZnQsIHZOb2RlLnggLSB1Tm9kZS54IC0gKHBOb2RlLndpZHRoICsgd05vZGUud2lkdGgpIC8gMilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdyA9IHdOb2RlLmFsaWduXG4gICAgfSB3aGlsZSAodyAhPT0gdilcbiAgfVxuXG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgdU5vZGUuc2luayA9IHVcbiAgICB1Tm9kZS5zaGlmdCA9IEluZmluaXR5XG4gICAgdU5vZGUueCA9IG51bGxcbiAgfVxuICBmb3IgKGNvbnN0IHUgb2YgZy52ZXJ0aWNlcygpKSB7XG4gICAgaWYgKGcudmVydGV4KHUpLnJvb3QgPT09IHUpIHtcbiAgICAgIHBsYWNlQmxvY2sodSlcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGcudmVydGljZXMoKSkge1xuICAgIGNvbnN0IHVOb2RlID0gZy52ZXJ0ZXgodSlcbiAgICB1Tm9kZS54ID0gZy52ZXJ0ZXgodU5vZGUucm9vdCkueFxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICBjb25zdCB1Tm9kZSA9IGcudmVydGV4KHUpXG4gICAgY29uc3Qgc2hpZnQgPSBnLnZlcnRleChnLnZlcnRleCh1Tm9kZS5yb290KS5zaW5rKS5zaGlmdFxuICAgIGlmIChzaGlmdCA8IEluZmluaXR5KSB7XG4gICAgICB1Tm9kZS54ICs9IHNoaWZ0XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9yaXpvbnRhbENvbXBhY3Rpb25cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvcG9zaXRpb24tYXNzaWdubWVudC9icmFuZGVzL2hvcml6b250YWwtY29tcGFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNTc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IHNlZ21lbnQgPSBmdW5jdGlvbiAqIChncmFwaCwgdmVydGljZXMsIHVwcGVyKSB7XG4gIGlmICh2ZXJ0aWNlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm5cbiAgfVxuICBsZXQgc2VxID0gW11cbiAgbGV0IGxhc3RQYXJlbnQgPSBncmFwaC52ZXJ0ZXgodmVydGljZXNbMF0pW3VwcGVyID8gJ3YnIDogJ3UnXVxuICBmb3IgKGNvbnN0IHUgb2YgdmVydGljZXMpIHtcbiAgICBjb25zdCBkID0gZ3JhcGgudmVydGV4KHUpXG4gICAgaWYgKCFkLmR1bW15IHx8IGRbdXBwZXIgPyAndicgOiAndSddICE9PSBsYXN0UGFyZW50KSB7XG4gICAgICBpZiAoc2VxLmxlbmd0aCA+IDApIHtcbiAgICAgICAgeWllbGQgc2VxXG4gICAgICAgIHNlcSA9IFtdXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkLmR1bW15KSB7XG4gICAgICBzZXEucHVzaCh1KVxuICAgICAgbGFzdFBhcmVudCA9IGRbdXBwZXIgPyAndicgOiAndSddXG4gICAgfVxuICB9XG4gIGlmIChzZXEubGVuZ3RoID4gMCkge1xuICAgIHlpZWxkIHNlcVxuICB9XG59XG5cbmNvbnN0IGFkanVzdFBvcyA9IChncmFwaCwgdmVydGljZXMsIGx0b3IpID0+IHtcbiAgbGV0IHN1bVBvcyA9IDBcbiAgbGV0IHRvdGFsV2lkdGggPSAwXG4gIGZvciAoY29uc3QgdSBvZiB2ZXJ0aWNlcykge1xuICAgIHN1bVBvcyArPSBncmFwaC52ZXJ0ZXgodSlbbHRvciA/ICd4JyA6ICd5J11cbiAgICB0b3RhbFdpZHRoICs9IGdyYXBoLnZlcnRleCh1KS5vcmlnV2lkdGggfHwgMFxuICB9XG4gIGxldCBvZmZzZXQgPSBzdW1Qb3MgLyB2ZXJ0aWNlcy5sZW5ndGggLSAodG90YWxXaWR0aCAtIDEpIC8gMlxuICBmb3IgKGNvbnN0IHUgb2YgdmVydGljZXMpIHtcbiAgICBncmFwaC52ZXJ0ZXgodSlbbHRvciA/ICd4JyA6ICd5J10gPSBvZmZzZXRcbiAgICBvZmZzZXQgKz0gZ3JhcGgudmVydGV4KHUpLm9yaWdXaWR0aCB8fCAwXG4gIH1cbn1cblxuY29uc3QgYnVuZGxlRWRnZXMgPSAoZ3JhcGgsIGxheWVycywgbHRvcikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBmb3IgKGNvbnN0IHZlcnRpY2VzIG9mIHNlZ21lbnQoZ3JhcGgsIGxheWVyc1tpXSwgZmFsc2UpKSB7XG4gICAgICBhZGp1c3RQb3MoZ3JhcGgsIHZlcnRpY2VzLCBsdG9yKVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpID0gbGF5ZXJzLmxlbmd0aCAtIDE7IGkgPiAwOyAtLWkpIHtcbiAgICBmb3IgKGNvbnN0IHZlcnRpY2VzIG9mIHNlZ21lbnQoZ3JhcGgsIGxheWVyc1tpXSwgdHJ1ZSkpIHtcbiAgICAgIGFkanVzdFBvcyhncmFwaCwgdmVydGljZXMsIGx0b3IpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVuZGxlRWRnZXNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvYnVuZGxlLWVkZ2VzLmpzXG4vLyBtb2R1bGUgaWQgPSA1Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgR3JhcGggPSByZXF1aXJlKCcuLi8uLi9ncmFwaCcpXG5jb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcbmNvbnN0IGN5Y2xlUmVtb3ZhbCA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL2N5Y2xlLXJlbW92YWwnKVxuY29uc3QgbGF5ZXJBc3NpZ25tZW50ID0gcmVxdWlyZSgnLi4vLi4vbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudCcpXG5jb25zdCBncm91cExheWVycyA9IHJlcXVpcmUoJy4uLy4uL2xheW91dGVyL3N1Z2l5YW1hL21pc2MvZ3JvdXAtbGF5ZXJzJylcbmNvbnN0IHJlY3Rhbmd1bGFyID0gcmVxdWlyZSgnLi9yZWN0YW5ndWxhcicpXG5cbmNvbnN0IGVkZ2VDb25jZW50cmF0aW9uID0gKGcsIGgxLCBoMiwgbWV0aG9kLCBkdW1teSwgaWRHZW5lcmF0b3IpID0+IHtcbiAgY29uc3Qgc3ViZ3JhcGggPSBuZXcgR3JhcGgoKVxuICBmb3IgKGNvbnN0IHUgb2YgaDEpIHtcbiAgICBzdWJncmFwaC5hZGRWZXJ0ZXgodSwgZy52ZXJ0ZXgodSkpXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIGgyKSB7XG4gICAgc3ViZ3JhcGguYWRkVmVydGV4KHUsIGcudmVydGV4KHUpKVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgIGZvciAoY29uc3QgdiBvZiBoMikge1xuICAgICAgaWYgKGcuZWRnZSh1LCB2KSkge1xuICAgICAgICBzdWJncmFwaC5hZGRFZGdlKHUsIHYsIGcuZWRnZSh1LCB2KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGNvbmNlbnRyYXRpb24gb2YgbWV0aG9kKHN1YmdyYXBoLCBoMSwgaDIpKSB7XG4gICAgY29uc3QgdyA9IGlkR2VuZXJhdG9yKGcsIGNvbmNlbnRyYXRpb24uc291cmNlLCBjb25jZW50cmF0aW9uLnRhcmdldClcbiAgICBpZiAoZy52ZXJ0ZXgodykpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGcuYWRkVmVydGV4KHcsIGR1bW15KGNvbmNlbnRyYXRpb24uc291cmNlLCBjb25jZW50cmF0aW9uLnRhcmdldCkpXG4gICAgZm9yIChjb25zdCB1IG9mIGNvbmNlbnRyYXRpb24uc291cmNlKSB7XG4gICAgICBnLmFkZEVkZ2UodSwgdylcbiAgICB9XG4gICAgZm9yIChjb25zdCB2IG9mIGNvbmNlbnRyYXRpb24udGFyZ2V0KSB7XG4gICAgICBnLmFkZEVkZ2UodywgdilcbiAgICB9XG4gICAgZm9yIChjb25zdCB1IG9mIGcuaW5WZXJ0aWNlcyh3KSkge1xuICAgICAgZm9yIChjb25zdCB2IG9mIGcub3V0VmVydGljZXModykpIHtcbiAgICAgICAgaWYgKGcuZWRnZSh1LCB2KSkge1xuICAgICAgICAgIGcucmVtb3ZlRWRnZSh1LCB2KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHByaXZhdGVzID0gbmV3IFdlYWtNYXAoKVxuXG5jbGFzcyBFZGdlQ29uY2VudHJhdGlvblRyYW5zZm9ybWVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICBjeWNsZVJlbW92YWw6IG5ldyBjeWNsZVJlbW92YWwuQ3ljbGVSZW1vdmFsKCksXG4gICAgICBsYXllckFzc2lnbm1lbnQ6IG5ldyBsYXllckFzc2lnbm1lbnQuUXVhZEhldXJpc3RpYygpLFxuICAgICAgbWV0aG9kOiByZWN0YW5ndWxhcixcbiAgICAgIGR1bW15OiAoKSA9PiAoe2R1bW15OiB0cnVlfSksXG4gICAgICBpZEdlbmVyYXRvcjogKCkgPT4gU3ltYm9sKClcbiAgICB9KVxuICB9XG5cbiAgdHJhbnNmb3JtIChnKSB7XG4gICAgdGhpcy5jeWNsZVJlbW92YWwoKS5jYWxsKGcpXG4gICAgY29uc3QgbGF5ZXJNYXAgPSB0aGlzLmxheWVyQXNzaWdubWVudCgpLmNhbGwoZylcbiAgICBjb25zdCBsYXllcnMgPSBncm91cExheWVycyhnLCBsYXllck1hcClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgIGNvbnN0IGgxID0gbGF5ZXJzW2ldXG4gICAgICBjb25zdCBoMiA9IG5ldyBTZXQoKVxuICAgICAgbGV0IGVkZ2VzID0gMFxuICAgICAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgICAgIGZvciAoY29uc3QgdiBvZiBnLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICAgICAgaDIuYWRkKHYpXG4gICAgICAgICAgZWRnZXMgKz0gMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlZGdlQ29uY2VudHJhdGlvbihnLCBoMSwgQXJyYXkuZnJvbShoMi52YWx1ZXMoKSksIHRoaXMubWV0aG9kKCksIHRoaXMuZHVtbXkoKSwgdGhpcy5pZEdlbmVyYXRvcigpKVxuICAgIH1cbiAgICByZXR1cm4gZ1xuICB9XG5cbiAgY3ljbGVSZW1vdmFsICgpIHtcbiAgICByZXR1cm4gYWNjZXNzb3IodGhpcywgcHJpdmF0ZXMsICdjeWNsZVJlbW92YWwnLCBhcmd1bWVudHMpXG4gIH1cblxuICBsYXllckFzc2lnbm1lbnQgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2xheWVyQXNzaWdubWVudCcsIGFyZ3VtZW50cylcbiAgfVxuXG4gIG1ldGhvZCAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnbWV0aG9kJywgYXJndW1lbnRzKVxuICB9XG5cbiAgZHVtbXkgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2R1bW15JywgYXJndW1lbnRzKVxuICB9XG5cbiAgaWRHZW5lcmF0b3IgKCkge1xuICAgIHJldHVybiBhY2Nlc3Nvcih0aGlzLCBwcml2YXRlcywgJ2lkR2VuZXJhdG9yJywgYXJndW1lbnRzKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRnZUNvbmNlbnRyYXRpb25UcmFuc2Zvcm1lclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBsYXllclZlcnRpY2VzID0gKGcsIGgxLCBoMikgPT4ge1xuICBjb25zdCB1cyA9IG5ldyBTZXQoaDEpXG4gIGNvbnN0IHZlcnRpY2VzID0ge31cbiAgZm9yIChjb25zdCB2IG9mIGgyKSB7XG4gICAgdmVydGljZXNbdl0gPSBuZXcgU2V0KClcbiAgICBmb3IgKGNvbnN0IHUgb2YgZy5pblZlcnRpY2VzKHYpKSB7XG4gICAgICBpZiAodXMuaGFzKHUpKSB7XG4gICAgICAgIHZlcnRpY2VzW3ZdLmFkZCh1KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmVydGljZXNcbn1cblxuY29uc3QgcmVjdGFuZ3VsYXIgPSAoZywgaDEsIGgyKSA9PiB7XG4gIGlmIChoMS5sZW5ndGggPT09IDAgfHwgaDIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgY29uc3QgayA9IGcubnVtRWRnZXMoKVxuICBjb25zdCBhY3RpdmUgPSB7fVxuICBjb25zdCB2ZXJ0aWNlcyA9IGxheWVyVmVydGljZXMoZywgaDEsIGgyKVxuICBjb25zdCBpc0FjdGl2ZSA9ICh1KSA9PiBhY3RpdmVbdV1cbiAgY29uc3QgY21wID0gKHYxLCB2MikgPT4gdmVydGljZXNbdjJdLnNpemUgLSB2ZXJ0aWNlc1t2MV0uc2l6ZVxuICBjb25zdCBkID0gKHMsIHQpID0+IHtcbiAgICBsZXQgY291bnQgPSAwXG4gICAgZm9yIChjb25zdCB1IG9mIHMpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiB0KSB7XG4gICAgICAgIGlmICh2ZXJ0aWNlc1t2XS5oYXModSkpIHtcbiAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50IC0gcy5sZW5ndGggLSB0Lmxlbmd0aFxuICB9XG4gIGgyID0gQXJyYXkuZnJvbShoMilcblxuICBjb25zdCBjb25jZW50cmF0aW9ucyA9IFtdXG4gIGxldCBqT2Zmc2V0ID0gMFxuICBmb3IgKGxldCBsID0gMDsgbCA8IGs7ICsrbCkge1xuICAgIGZvciAoY29uc3QgdSBvZiBoMSkge1xuICAgICAgYWN0aXZlW3VdID0gdHJ1ZVxuICAgIH1cblxuICAgIGgyLnNvcnQoY21wKVxuICAgIGlmICh2ZXJ0aWNlc1toMltqT2Zmc2V0XV0uc2l6ZSA8PSAwKSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGxldCBtYXhEID0gLTFcbiAgICBsZXQgbWF4SDFcbiAgICBsZXQgbWF4SDJcbiAgICBsZXQgdG1wSDIgPSBbXVxuICAgIGZvciAobGV0IGogPSBqT2Zmc2V0OyBqIDwgaDIubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IHYgPSBoMltqXVxuICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgZm9yIChjb25zdCB1IG9mIGgxKSB7XG4gICAgICAgIGlmIChhY3RpdmVbdV0pIHtcbiAgICAgICAgICBpZiAoZy5lZGdlKHUsIHYpKSB7XG4gICAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZVt1XSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0bXBIMi5wdXNoKHYpXG4gICAgICBsZXQgdG1wSDEgPSBoMS5maWx0ZXIoaXNBY3RpdmUpXG4gICAgICBsZXQgdG1wRCA9IGQodG1wSDEsIHRtcEgyKVxuICAgICAgaWYgKHRtcEQgPiBtYXhEKSB7XG4gICAgICAgIG1heEQgPSB0bXBEXG4gICAgICAgIG1heEgxID0gdG1wSDFcbiAgICAgICAgbWF4SDIgPSBBcnJheS5mcm9tKHRtcEgyKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXhEID4gLTEpIHtcbiAgICAgIGZvciAoY29uc3QgdiBvZiBtYXhIMikge1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2YgbWF4SDEpIHtcbiAgICAgICAgICB2ZXJ0aWNlc1t2XS5kZWxldGUodSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uY2VudHJhdGlvbnMucHVzaCh7XG4gICAgICAgIHNvdXJjZTogQXJyYXkuZnJvbShtYXhIMSksXG4gICAgICAgIHRhcmdldDogQXJyYXkuZnJvbShtYXhIMilcbiAgICAgIH0pXG4gICAgICBqT2Zmc2V0ID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICBqT2Zmc2V0ICs9IDFcbiAgICB9XG5cbiAgICBpZiAoak9mZnNldCA+PSBoMi5sZW5ndGgpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmNlbnRyYXRpb25zXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVjdGFuZ3VsYXJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL3JlY3Rhbmd1bGFyLmpzXG4vLyBtb2R1bGUgaWQgPSA1Nzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgaW50ZXJzZWN0aW9uID0gKGcsIHUxLCB1MiwgaDIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzb3VyY2U6IG5ldyBTZXQoW3UxLCB1Ml0pLFxuICAgIHRhcmdldDogbmV3IFNldChoMi5maWx0ZXIoKHYpID0+IGcuZWRnZSh1MSwgdikgJiYgZy5lZGdlKHUyLCB2KSkpXG4gIH1cbn1cblxuY29uc3Qgc2V0bWludXMgPSAoYSwgYikgPT4ge1xuICByZXR1cm4gbmV3IFNldChBcnJheS5mcm9tKGEudmFsdWVzKCkpLmZpbHRlcigoeCkgPT4gIWIuaGFzKHgpKSlcbn1cblxuY29uc3QgdW5pb24gPSAoYSwgYikgPT4ge1xuICBjb25zdCBzID0gbmV3IFNldChhKVxuICBmb3IgKGNvbnN0IHggb2YgYikge1xuICAgIHMuYWRkKHgpXG4gIH1cbiAgcmV0dXJuIHNcbn1cblxuY29uc3Qgc2V0RXF1YWxzID0gKGEsIGIpID0+IHtcbiAgcmV0dXJuIGEuc2l6ZSA9PT0gYi5zaXplICYmIHNldG1pbnVzKGEsIGIpLnNpemUgPT09IDBcbn1cblxuY29uc3QgbmV3YmVyeSA9IChnLCBoMSwgaDIpID0+IHtcbiAgY29uc3QgaW50ZXJzZWN0aW9ucyA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaDEubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCB1MSA9IGgxW2ldXG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgaDEubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IHUyID0gaDFbal1cbiAgICAgIGludGVyc2VjdGlvbnMucHVzaChpbnRlcnNlY3Rpb24oZywgdTEsIHUyLCBoMikpXG4gICAgfVxuICB9XG4gIGludGVyc2VjdGlvbnMuc29ydCgoaTEsIGkyKSA9PiBpMS50YXJnZXQuc2l6ZSAtIGkyLnRhcmdldC5zaXplKVxuXG4gIGNvbnN0IGNvbmNlbnRyYXRpb25zID0gW11cbiAgZm9yIChjb25zdCBpIG9mIGludGVyc2VjdGlvbnMpIHtcbiAgICBsZXQgc3RvcCA9IGZhbHNlXG5cbiAgICBpZiAoaS50YXJnZXQuc2l6ZSA8IDIpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgICBpZiAoc2V0RXF1YWxzKGkudGFyZ2V0LCBjLnRhcmdldCkpIHtcbiAgICAgICAgYy5zb3VyY2UgPSB1bmlvbihpLnNvdXJjZSwgYy5zb3VyY2UpXG4gICAgICAgIHN0b3AgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgICBjb25zdCBpRGFzaCA9IHNldG1pbnVzKGkudGFyZ2V0LCBjLnRhcmdldClcbiAgICAgIGNvbnN0IGNEYXNoID0gc2V0bWludXMoYy50YXJnZXQsIGkudGFyZ2V0KVxuICAgICAgaWYgKGlEYXNoLnNpemUgPiAwICYmIGNEYXNoLnNpemUgPT09IDApIHtcbiAgICAgICAgY29uY2VudHJhdGlvbnMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBpLnNvdXJjZSxcbiAgICAgICAgICB0YXJnZXQ6IGlEYXNoXG4gICAgICAgIH0pXG4gICAgICAgIGMuc291cmNlID0gdW5pb24oYy5zb3VyY2UsIGkuc291cmNlKVxuICAgICAgICBzdG9wID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc3RvcCkge1xuICAgICAgY29uY2VudHJhdGlvbnMucHVzaChpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlZCA9IG5ldyBNYXAoY29uY2VudHJhdGlvbnMubWFwKChfLCBpKSA9PiBbaSwgZmFsc2VdKSlcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jZW50cmF0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGMxID0gY29uY2VudHJhdGlvbnNbaV1cbiAgICBpZiAobWVyZ2VkLmdldChpKSkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgY29uY2VudHJhdGlvbnMubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IGMyID0gY29uY2VudHJhdGlvbnNbal1cbiAgICAgIGlmIChzZXRFcXVhbHMoYzEudGFyZ2V0LCBjMi50YXJnZXQpKSB7XG4gICAgICAgIGMxLnNvdXJjZSA9IHVuaW9uKGMxLnNvdXJjZSwgYzIuc291cmNlKVxuICAgICAgICBtZXJnZWQuc2V0KGosIHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBjIG9mIGNvbmNlbnRyYXRpb25zKSB7XG4gICAgYy5zb3VyY2UgPSBBcnJheS5mcm9tKGMuc291cmNlKVxuICAgIGMudGFyZ2V0ID0gQXJyYXkuZnJvbShjLnRhcmdldClcbiAgfVxuXG4gIHJldHVybiBjb25jZW50cmF0aW9uc1xuICAgIC5maWx0ZXIoKGMsIGkpID0+ICFtZXJnZWQuZ2V0KGkpICYmIGMudGFyZ2V0Lmxlbmd0aCA+IDEpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3YmVyeVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vbmV3YmVyeS5qc1xuLy8gbW9kdWxlIGlkID0gNTgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGJpY2xpcXVlRmluZCA9IChncmFwaCwgTCwgUiwgUCwgUSwgY2xpcXVlcykgPT4ge1xuICB3aGlsZSAoUC5zaXplICE9PSAwKSB7XG4gICAgbGV0IHggPSBBcnJheS5mcm9tKFApWzBdXG4gICAgUC5kZWxldGUoeClcbiAgICBsZXQgX1IgPSBuZXcgU2V0KFsuLi5SLCB4XSlcbiAgICBsZXQgX0wgPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXMoeCkuZmlsdGVyKCh1KSA9PiBMLmhhcyh1KSkpXG4gICAgbGV0IGNvbXBsZW1lbnRMID0gbmV3IFNldChBcnJheS5mcm9tKEwpLmZpbHRlcigodSkgPT4gIV9MLmhhcyh1KSkpXG4gICAgX0wuZm9yRWFjaCgobCkgPT4ge1xuICAgICAgY29tcGxlbWVudEwuZGVsZXRlKGwpXG4gICAgfSlcbiAgICBsZXQgQyA9IG5ldyBTZXQoW3hdKVxuICAgIGxldCBfUCA9IG5ldyBTZXQoKVxuICAgIGxldCBfUSA9IG5ldyBTZXQoKVxuICAgIGxldCBpc01heGltYWwgPSB0cnVlXG4gICAgZm9yIChsZXQgdiBvZiBRKSB7XG4gICAgICBsZXQgTiA9IG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh2KS5maWx0ZXIoKHUpID0+IF9MLmhhcyh1KSkpXG4gICAgICBpZiAoTi5zaXplID09PSBfTC5zaXplKSB7XG4gICAgICAgIGlzTWF4aW1hbCA9IGZhbHNlXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKE4uc2l6ZSA+IDApIHtcbiAgICAgICAgX1EgPSBfUS5hZGQodilcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzTWF4aW1hbCkge1xuICAgICAgZm9yIChsZXQgdiBvZiBQKSB7XG4gICAgICAgIGlmICh2ICE9PSB4KSB7XG4gICAgICAgICAgbGV0IE4gPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikuZmlsdGVyKCh1KSA9PiBfTC5oYXModSkpKVxuICAgICAgICAgIGlmIChOLnNpemUgPT09IF9MLnNpemUpIHtcbiAgICAgICAgICAgIF9SLmFkZCh2KVxuICAgICAgICAgICAgbGV0IFMgPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikuZmlsdGVyKCh1KSA9PiBjb21wbGVtZW50TC5oYXModSkpKVxuICAgICAgICAgICAgaWYgKFMuc2l6ZSA9PT0gMCkgQy5hZGQodilcbiAgICAgICAgICB9IGVsc2UgaWYgKE4uc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIF9QLmFkZCh2KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKF9QLnNpemUgIT09IDApIHtcbiAgICAgICAgYmljbGlxdWVGaW5kKGdyYXBoLCBfTCwgX1IsIF9QLCBfUSwgY2xpcXVlcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChfTC5zaXplID4gMSAmJiBfUi5zaXplID4gMSkge1xuICAgICAgICAgIGNsaXF1ZXMucHVzaCh7XG4gICAgICAgICAgICBzb3VyY2U6IEFycmF5LmZyb20oX0wpLFxuICAgICAgICAgICAgdGFyZ2V0OiBBcnJheS5mcm9tKF9SKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgUSA9IG5ldyBTZXQoWy4uLlEsIC4uLkNdKVxuICAgIFAgPSBuZXcgU2V0KEFycmF5LmZyb20oUCkuZmlsdGVyKCh2KSA9PiAhQy5oYXModikpKVxuICB9XG59XG5cbmNvbnN0IG1iZWEgPSAoZ3JhcGgsIGgxLCBoMikgPT4ge1xuICBjb25zdCBVID0gZ3JhcGgudmVydGljZXMoKS5maWx0ZXIoKHUpID0+IGdyYXBoLm91dERlZ3JlZSh1KSlcbiAgY29uc3QgViA9IGdyYXBoLnZlcnRpY2VzKCkuZmlsdGVyKCh1KSA9PiBncmFwaC5pbkRlZ3JlZSh1KSlcbiAgbGV0IGNsaXF1ZXMgPSBbXVxuICBiaWNsaXF1ZUZpbmQoZ3JhcGgsIG5ldyBTZXQoVSksIG5ldyBTZXQoKSwgbmV3IFNldChWKSwgbmV3IFNldCgpLCBjbGlxdWVzKVxuICByZXR1cm4gY2xpcXVlc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1iZWFcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lZ3JhcGgvdHJhbnNmb3JtZXIvZWRnZS1jb25jZW50cmF0aW9uL21iZWEuanNcbi8vIG1vZHVsZSBpZCA9IDU4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBoYXNoS2V5ID0gKHZlcnRpY2VzKSA9PiB7XG4gIHJldHVybiB2ZXJ0aWNlcy5tYXAoKHUpID0+IHUudG9TdHJpbmcoKSkuam9pbignLCcpXG59XG5cbmNvbnN0IG1heEtleSA9IChpdGVyKSA9PiB7XG4gIGxldCBtYXhWYWwgPSAtSW5maW5pdHlcbiAgbGV0IHJlc3VsdCA9IG51bGxcbiAgZm9yIChjb25zdCBbaWQsIHZhbF0gb2YgaXRlcikge1xuICAgIGlmICh2YWwgPiBtYXhWYWwpIHtcbiAgICAgIG1heFZhbCA9IHZhbFxuICAgICAgcmVzdWx0ID0gaWRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBwYXJ0aXRpb24gPSAoZ3JhcGgsIFUpID0+IHtcbiAgY29uc3QgTCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgIGZvciAoY29uc3QgdiBvZiBncmFwaC5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgTC5hZGQodilcbiAgICB9XG4gIH1cbiAgY29uc3QgaGFzaEtleXMgPSBuZXcgTWFwKClcbiAgZm9yIChjb25zdCB1IG9mIFUpIHtcbiAgICBoYXNoS2V5cy5zZXQodSwgaGFzaEtleShncmFwaC5vdXRWZXJ0aWNlcyh1KSkpXG4gIH1cbiAgZm9yIChjb25zdCB1IG9mIEwpIHtcbiAgICBjb25zdCBkZWdyZWVzID0gZ3JhcGguaW5WZXJ0aWNlcyh1KS5tYXAoKHYpID0+IFt2LCBncmFwaC5vdXREZWdyZWUodildKVxuICAgIGNvbnN0IG1heElkID0gbWF4S2V5KGRlZ3JlZXMpXG4gICAgaGFzaEtleXMuc2V0KHUsIGhhc2hLZXlzLmdldChtYXhJZCkpXG4gIH1cbiAgbGV0IGNoYW5nZWQgPSBmYWxzZVxuICBkbyB7XG4gICAgY2hhbmdlZCA9IGZhbHNlXG4gICAgZm9yIChjb25zdCB1IG9mIFUpIHtcbiAgICAgIGNvbnN0IE0gPSBuZXcgTWFwKClcbiAgICAgIGZvciAoY29uc3QgdiBvZiBncmFwaC5vdXRWZXJ0aWNlcyh1KSkge1xuICAgICAgICBjb25zdCBoYXNoID0gaGFzaEtleXMuZ2V0KHYpXG4gICAgICAgIGlmICghTS5oYXMoaGFzaCkpIHtcbiAgICAgICAgICBNLnNldChoYXNoLCAwKVxuICAgICAgICB9XG4gICAgICAgIE0uc2V0KGhhc2gsIE0uZ2V0KGhhc2gpICsgMSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0tleSA9IG1heEtleShNLmVudHJpZXMoKSlcbiAgICAgIGlmIChoYXNoS2V5cy5nZXQodSkgIT09IG5ld0tleSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBoYXNoS2V5cy5zZXQodSwgbmV3S2V5KVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHUgb2YgTCkge1xuICAgICAgY29uc3QgTSA9IG5ldyBNYXAoKVxuICAgICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLmluVmVydGljZXModSkpIHtcbiAgICAgICAgY29uc3QgaGFzaCA9IGhhc2hLZXlzLmdldCh2KVxuICAgICAgICBpZiAoIU0uaGFzKGhhc2gpKSB7XG4gICAgICAgICAgTS5zZXQoaGFzaCwgMClcbiAgICAgICAgfVxuICAgICAgICBNLnNldChoYXNoLCBNLmdldChoYXNoKSArIDEpXG4gICAgICB9XG4gICAgICBjb25zdCBuZXdLZXkgPSBtYXhLZXkoTS5lbnRyaWVzKCkpXG4gICAgICBpZiAoaGFzaEtleXMuZ2V0KHUpICE9PSBuZXdLZXkpIHtcbiAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgaGFzaEtleXMuc2V0KHUsIG5ld0tleSlcbiAgICAgIH1cbiAgICB9XG4gIH0gd2hpbGUgKGNoYW5nZWQpXG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgVSkge1xuICAgIGNvbnN0IGhhc2ggPSBoYXNoS2V5cy5nZXQodSlcbiAgICBpZiAoIXJlc3VsdC5oYXMoaGFzaCkpIHtcbiAgICAgIHJlc3VsdC5zZXQoaGFzaCwgW10pXG4gICAgfVxuICAgIHJlc3VsdC5nZXQoaGFzaCkucHVzaCh1KVxuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKHJlc3VsdC52YWx1ZXMoKSlcbn1cblxuY29uc3QgYXVndW1lbnQgPSAoZ3JhcGgsIFMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdSBvZiBTKSB7XG4gICAgZm9yIChjb25zdCB2IG9mIGdyYXBoLm91dFZlcnRpY2VzKHUpKSB7XG4gICAgICBmb3IgKGNvbnN0IHcgb2YgZ3JhcGguaW5WZXJ0aWNlcyh2KSkge1xuICAgICAgICByZXN1bHQuYWRkKHcpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKHJlc3VsdClcbn1cblxuY29uc3QgcXVhc2lCaWNsaXF1ZU1pbmluZyA9IChncmFwaCwgbXUsIFMpID0+IHtcbiAgY29uc3QgQyA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgIGNvbnN0IHRtcFMgPSBuZXcgU2V0KClcbiAgICBjb25zdCB0bXBUID0gbmV3IFNldChncmFwaC5vdXRWZXJ0aWNlcyh1KSlcbiAgICBDLnNldChoYXNoS2V5KEFycmF5LmZyb20odG1wVCkpLCB7c291cmNlOiB0bXBTLCB0YXJnZXQ6IHRtcFR9KVxuICB9XG4gIGZvciAoY29uc3Qga2V5IG9mIEMua2V5cygpKSB7XG4gICAgY29uc3QgTSA9IG5ldyBNYXAoKVxuICAgIGZvciAoY29uc3QgdiBvZiBDLmdldChrZXkpLnRhcmdldCkge1xuICAgICAgZm9yIChjb25zdCB1IG9mIGdyYXBoLmluVmVydGljZXModikpIHtcbiAgICAgICAgaWYgKCFNLmhhcyh1KSkge1xuICAgICAgICAgIE0uc2V0KHUsIDApXG4gICAgICAgIH1cbiAgICAgICAgTS5zZXQodSwgTS5nZXQodSkgKyAxKVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHUgb2YgTS5rZXlzKCkpIHtcbiAgICAgIGlmIChNLmdldCh1KSA+PSBtdSAqIEMuZ2V0KGtleSkudGFyZ2V0LnNpemUpIHtcbiAgICAgICAgQy5nZXQoa2V5KS5zb3VyY2UuYWRkKHUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gQXJyYXkuZnJvbShDLnZhbHVlcygpKVxuICAgIC5maWx0ZXIoKHtzb3VyY2UsIHRhcmdldH0pID0+IHNvdXJjZS5zaXplID4gMSAmJiB0YXJnZXQuc2l6ZSA+IDEpXG4gIHJlc3VsdC5zb3J0KChjMSwgYzIpID0+IGMxLnNvdXJjZS5zaXplID09PSBjMi5zb3VyY2Uuc2l6ZSA/IGMyLnRhcmdldC5zaXplIC0gYzEudGFyZ2V0LnNpemUgOiBjMi5zb3VyY2Uuc2l6ZSAtIGMxLnNvdXJjZS5zaXplKVxuICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIGNvbnN0IG1heGltdW0gPSByZXN1bHRbMF1cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCByZXN1bHQubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCB0bXBTID0gbmV3IFNldChtYXhpbXVtLnNvdXJjZSlcbiAgICBjb25zdCB0bXBUID0gbmV3IFNldChtYXhpbXVtLnRhcmdldClcbiAgICBmb3IgKGNvbnN0IHUgb2YgcmVzdWx0W2ldLnNvdXJjZSkge1xuICAgICAgdG1wUy5hZGQodSlcbiAgICB9XG4gICAgZm9yIChjb25zdCB1IG9mIHJlc3VsdFtpXS50YXJnZXQpIHtcbiAgICAgIHRtcFQuYWRkKHUpXG4gICAgfVxuICAgIGxldCBjb3VudCA9IDBcbiAgICBmb3IgKGNvbnN0IHUgb2YgdG1wUykge1xuICAgICAgZm9yIChjb25zdCB2IG9mIHRtcFQpIHtcbiAgICAgICAgaWYgKGdyYXBoLmVkZ2UodSwgdikpIHtcbiAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50IDwgbXUgKiB0bXBTLnNpemUgKiB0bXBULnNpemUpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIG1heGltdW0uc291cmNlID0gQXJyYXkuZnJvbSh0bXBTKVxuICAgIG1heGltdW0udGFyZ2V0ID0gQXJyYXkuZnJvbSh0bXBUKVxuICB9XG4gIHJldHVybiBbbWF4aW11bV1cbn1cblxuY29uc3QgcXVhc2lDbGlxdWVMYXllciA9IChncmFwaCwgaDEsIGgyLCBtdSkgPT4ge1xuICBjb25zdCBjbGlxdWVzID0gW11cbiAgZm9yIChjb25zdCBTIG9mIHBhcnRpdGlvbihncmFwaCwgaDEpKSB7XG4gICAgZm9yIChjb25zdCBjbGlxdWUgb2YgcXVhc2lCaWNsaXF1ZU1pbmluZyhncmFwaCwgbXUsIGF1Z3VtZW50KGdyYXBoLCBTKSkpIHtcbiAgICAgIGNsaXF1ZXMucHVzaChjbGlxdWUpXG4gICAgfVxuICB9XG4gIHJldHVybiBjbGlxdWVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcXVhc2lDbGlxdWVMYXllclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2VncmFwaC90cmFuc2Zvcm1lci9lZGdlLWNvbmNlbnRyYXRpb24vcXVhc2ktYmljbGlxdWUtbWluaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA1ODJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3Qge2NvbWJpbmF0aW9ufSA9IHJlcXVpcmUoJ2pzLWNvbWJpbmF0b3JpY3MnKVxuXG5jb25zdCBlbnVtZXJhdGUgPSBmdW5jdGlvbiAqIChuZWlnaGJvcnMsIGVwc2lsb24pIHtcbiAgaWYgKG5laWdoYm9ycy5zaXplID4gMCkge1xuICAgIGZvciAobGV0IGkgPSBlcHNpbG9uOyBpID4gMDsgLS1pKSB7XG4gICAgICBjb25zdCBpdGVyID0gY29tYmluYXRpb24oQXJyYXkuZnJvbShuZWlnaGJvcnMpLCBNYXRoLm1pbihpLCBuZWlnaGJvcnMuc2l6ZSkpXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBTID0gaXRlci5uZXh0KClcbiAgICAgICAgaWYgKCFTKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBTXG4gICAgICB9XG4gICAgfVxuICAgIHlpZWxkIFtdXG4gIH1cbn1cblxuY29uc3QgYWRqYWNlbnRWZXJ0aWNlcyA9IChncmFwaCwgdnMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdiBvZiB2cykge1xuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5vdXRWZXJ0aWNlcyh2KSkge1xuICAgICAgcmVzdWx0LmFkZCh1KVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGdlbktleSA9IChWbCwgVnIpID0+IHtcbiAgY29uc3QgYXJyYXlWbCA9IEFycmF5LmZyb20oVmwpXG4gIGNvbnN0IGFycmF5VnIgPSBBcnJheS5mcm9tKFZyKVxuICBhcnJheVZsLnNvcnQoKVxuICBhcnJheVZyLnNvcnQoKVxuICByZXR1cm4gYCR7YXJyYXlWbC5qb2luKCcsJyl9OiR7YXJyYXlWci5qb2luKCcsJyl9YFxufVxuXG5jb25zdCBjb3VudEVycm9yID0gKGdyYXBoLCB1LCB2ZXJ0aWNlcywgbHRvdSkgPT4ge1xuICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGx0b3UgPyBncmFwaC5pblZlcnRpY2VzKHUpIDogZ3JhcGgub3V0VmVydGljZXModSkpXG4gIGxldCBjb3VudCA9IDBcbiAgZm9yIChjb25zdCB2IG9mIHZlcnRpY2VzKSB7XG4gICAgaWYgKCFuZWlnaGJvcnMuaGFzKHYpKSB7XG4gICAgICBjb3VudCArPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudFxufVxuXG5jb25zdCBpbnRlcnNlY3Rpb24gPSAoQSwgQikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCBpdGVtIG9mIEEpIHtcbiAgICBpZiAoQi5oYXMoaXRlbSkpIHtcbiAgICAgIHJlc3VsdC5hZGQoaXRlbSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBzZXRtaW51cyA9IChBLCBCKSA9PiB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBCKSB7XG4gICAgQS5kZWxldGUoaXRlbSlcbiAgfVxuICByZXR1cm4gQVxufVxuXG5jb25zdCBzdG9yZSA9IChyZXN1bHQsIGtleSwgVmwsIFZyKSA9PiB7XG4gIGZvciAoY29uc3QgW2tleSwge3NvdXJjZSwgdGFyZ2V0fV0gb2YgcmVzdWx0LmVudHJpZXMoKSkge1xuICAgIGNvbnN0IHNvdXJjZUludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbihzb3VyY2UsIFZsKVxuICAgIGNvbnN0IHRhcmdldEludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbih0YXJnZXQsIFZyKVxuICAgIGlmIChzb3VyY2VJbnRlcnNlY3Rpb24uc2l6ZSA9PT0gc291cmNlLnNpemUgJiYgdGFyZ2V0SW50ZXJzZWN0aW9uLnNpemUgPT09IHRhcmdldC5zaXplKSB7XG4gICAgICByZXN1bHQuZGVsZXRlKGtleSlcbiAgICB9IGVsc2UgaWYgKHNvdXJjZUludGVyc2VjdGlvbi5zaXplID09PSBWbC5zaXplICYmIHRhcmdldEludGVyc2VjdGlvbi5zaXplID09PSBWci5zaXplKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgcmVzdWx0LnNldChrZXksIHtzb3VyY2U6IFZsLCB0YXJnZXQ6IFZyfSlcbn1cblxuY29uc3QgdGVzdEVwc2lsb25RdWFzaUJpY2xpcXVlID0gKGdyYXBoLCBzb3VyY2UsIHRhcmdldCwgZXBzaWxvbiwgbXMpID0+IHtcbiAgaWYgKHNvdXJjZS5zaXplIDwgbXMgfHwgdGFyZ2V0LnNpemUgPCBtcykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiBzb3VyY2UpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGgub3V0VmVydGljZXModSkpXG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGZvciAoY29uc3QgdiBvZiB0YXJnZXQpIHtcbiAgICAgIGlmICghdmVydGljZXMuaGFzKHYpKSB7XG4gICAgICAgIGNvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50ID4gZXBzaWxvbikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdSBvZiB0YXJnZXQpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh1KSlcbiAgICBsZXQgY291bnQgPSAwXG4gICAgZm9yIChjb25zdCB2IG9mIHNvdXJjZSkge1xuICAgICAgaWYgKCF2ZXJ0aWNlcy5oYXModikpIHtcbiAgICAgICAgY291bnQgKz0gMVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnQgPiBlcHNpbG9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3Qgc3Vic3BhY2UgPSAoZ3JhcGgsIGNhbmRWbCwgZ2VuVmwsIGNhbmRFeHQsIGVwc2lsb24sIG1zLCB2aXNpdGVkLCByZXN1bHQpID0+IHtcbiAgY29uc3QgY2FuZFZyID0gYWRqYWNlbnRWZXJ0aWNlcyhncmFwaCwgY2FuZFZsKVxuICBmb3IgKGNvbnN0IHYgb2YgY2FuZFZyKSB7XG4gICAgaWYgKGNvdW50RXJyb3IoZ3JhcGgsIHYsIGNhbmRWbCwgdHJ1ZSkgPiBlcHNpbG9uKSB7XG4gICAgICBjYW5kVnIuZGVsZXRlKHYpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qga2V5ID0gZ2VuS2V5KGNhbmRWbCwgY2FuZFZyKVxuICBpZiAodmlzaXRlZC5oYXMoa2V5KSkge1xuICAgIHJldHVyblxuICB9XG4gIHZpc2l0ZWQuYWRkKGtleSlcbiAgaWYgKHRlc3RFcHNpbG9uUXVhc2lCaWNsaXF1ZShncmFwaCwgY2FuZFZsLCBjYW5kVnIsIGVwc2lsb24sIG1zKSkge1xuICAgIHN0b3JlKHJlc3VsdCwga2V5LCBjYW5kVmwsIGNhbmRWcilcbiAgfVxuXG4gIHNldG1pbnVzKGNhbmRFeHQsIGNhbmRWcilcbiAgZm9yIChjb25zdCB2IG9mIGNhbmRFeHQpIHtcbiAgICBjYW5kRXh0LmRlbGV0ZSh2KVxuICAgIGNvbnN0IG5laWdoYm9ycyA9IGludGVyc2VjdGlvbihjYW5kVmwsIG5ldyBTZXQoZ3JhcGguaW5WZXJ0aWNlcyh2KSkpXG4gICAgY29uc3QgcmVzdCA9IHNldG1pbnVzKG5ldyBTZXQoY2FuZFZsKSwgbmVpZ2hib3JzKVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUocmVzdCwgZXBzaWxvbikpIHtcbiAgICAgIGNvbnN0IFZsID0gbmV3IFNldChuZWlnaGJvcnMpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgY2FuZEV4dCwgZXBzaWxvbiwgbXMsIHZpc2l0ZWQsIHJlc3VsdClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29tcGxldGVRQiA9IChncmFwaCwgaDEsIGgyLCBlcHNpbG9uLCBtcykgPT4ge1xuICBjb25zdCBiaWNsaXF1ZXMgPSBuZXcgTWFwKClcbiAgY29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IHYgb2YgaDIpIHtcbiAgICBjb25zdCBuZWlnaGJvcnMgPSBuZXcgU2V0KGgxKVxuICAgIGZvciAoY29uc3QgdSBvZiBncmFwaC5pblZlcnRpY2VzKHYpKSB7XG4gICAgICBuZWlnaGJvcnMuZGVsZXRlKHUpXG4gICAgfVxuICAgIGZvciAoY29uc3QgUyBvZiBlbnVtZXJhdGUobmVpZ2hib3JzLCBlcHNpbG9uKSkge1xuICAgICAgY29uc3QgVmwgPSBuZXcgU2V0KGdyYXBoLmluVmVydGljZXModikpXG4gICAgICBmb3IgKGNvbnN0IHUgb2YgUykge1xuICAgICAgICBWbC5hZGQodSlcbiAgICAgIH1cbiAgICAgIHN1YnNwYWNlKGdyYXBoLCBWbCwgdiwgbmV3IFNldChoMiksIGVwc2lsb24sIG1zLCB2aXNpdGVkLCBiaWNsaXF1ZXMpXG4gICAgfVxuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKGJpY2xpcXVlcy52YWx1ZXMoKSkubWFwKCh7c291cmNlLCB0YXJnZXR9KSA9PiB7XG4gICAgY29uc3Qgc291cmNlQXJyYXkgPSBBcnJheS5mcm9tKHNvdXJjZSlcbiAgICBjb25zdCB0YXJnZXRBcnJheSA9IEFycmF5LmZyb20odGFyZ2V0KVxuICAgIHNvdXJjZUFycmF5LnNvcnQoKVxuICAgIHRhcmdldEFycmF5LnNvcnQoKVxuICAgIHJldHVybiB7XG4gICAgICBzb3VyY2U6IHNvdXJjZUFycmF5LFxuICAgICAgdGFyZ2V0OiB0YXJnZXRBcnJheVxuICAgIH1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb21wbGV0ZVFCXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL3RyYW5zZm9ybWVyL2VkZ2UtY29uY2VudHJhdGlvbi9jb21wbGV0ZS1xYi5qc1xuLy8gbW9kdWxlIGlkID0gNTgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXG4gKiAkSWQ6IGNvbWJpbmF0b3JpY3MuanMsdiAwLjI1IDIwMTMvMDMvMTEgMTU6NDI6MTQgZGFua29nYWkgRXhwIGRhbmtvZ2FpICRcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKlxuICogIFJlZmVyZW5jZXM6XG4gKiAgICBodHRwOi8vd3d3LnJ1YnktZG9jLm9yZy9jb3JlLTIuMC9BcnJheS5odG1sI21ldGhvZC1pLWNvbWJpbmF0aW9uXG4gKiAgICBodHRwOi8vd3d3LnJ1YnktZG9jLm9yZy9jb3JlLTIuMC9BcnJheS5odG1sI21ldGhvZC1pLXBlcm11dGF0aW9uXG4gKiAgICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0ZhY3RvcmlhbF9udW1iZXJfc3lzdGVtXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LkNvbWJpbmF0b3JpY3MgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciB2ZXJzaW9uID0gXCIwLjUuMlwiO1xuICAgIC8qIGNvbWJpbmF0b3J5IGFyaXRobWV0aWNzICovXG4gICAgdmFyIFAgPSBmdW5jdGlvbihtLCBuKSB7XG4gICAgICAgIHZhciBwID0gMTtcbiAgICAgICAgd2hpbGUgKG4tLSkgcCAqPSBtLS07XG4gICAgICAgIHJldHVybiBwO1xuICAgIH07XG4gICAgdmFyIEMgPSBmdW5jdGlvbihtLCBuKSB7XG4gICAgICAgIGlmIChuID4gbSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFAobSwgbikgLyBQKG4sIG4pO1xuICAgIH07XG4gICAgdmFyIGZhY3RvcmlhbCA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgcmV0dXJuIFAobiwgbik7XG4gICAgfTtcbiAgICB2YXIgZmFjdG9yYWRpYyA9IGZ1bmN0aW9uKG4sIGQpIHtcbiAgICAgICAgdmFyIGYgPSAxO1xuICAgICAgICBpZiAoIWQpIHtcbiAgICAgICAgICAgIGZvciAoZCA9IDE7IGYgPCBuOyBmICo9ICsrZCk7XG4gICAgICAgICAgICBpZiAoZiA+IG4pIGYgLz0gZC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZiA9IGZhY3RvcmlhbChkKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gWzBdO1xuICAgICAgICBmb3IgKDsgZDsgZiAvPSBkLS0pIHtcbiAgICAgICAgICAgIHJlc3VsdFtkXSA9IE1hdGguZmxvb3IobiAvIGYpO1xuICAgICAgICAgICAgbiAlPSBmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKiBjb21tb24gbWV0aG9kcyAqL1xuICAgIHZhciBhZGRQcm9wZXJ0aWVzID0gZnVuY3Rpb24oZHN0LCBzcmMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkc3QsIHAsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogc3JjW3BdLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogcCA9PSAnbmV4dCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBoaWRlUHJvcGVydHkgPSBmdW5jdGlvbihvLCBwKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBwLCB7XG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB0b0FycmF5ID0gZnVuY3Rpb24oZikge1xuICAgICAgICB2YXIgZSwgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB3aGlsZSAoZSA9IHRoaXMubmV4dCgpKSByZXN1bHQucHVzaChmID8gZihlKSA6IGUpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHZhciBjb21tb24gPSB7XG4gICAgICAgIHRvQXJyYXk6IHRvQXJyYXksXG4gICAgICAgIG1hcDogdG9BcnJheSxcbiAgICAgICAgZm9yRWFjaDogZnVuY3Rpb24oZikge1xuICAgICAgICAgICAgdmFyIGU7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHdoaWxlIChlID0gdGhpcy5uZXh0KCkpIGYoZSk7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgICB2YXIgZSwgcmVzdWx0ID0gW107XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHdoaWxlIChlID0gdGhpcy5uZXh0KCkpIGlmIChmKGUpKSByZXN1bHQucHVzaChlKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcbiAgICAgICAgbGF6eU1hcDogZnVuY3Rpb24oZikge1xuICAgICAgICAgICAgdGhpcy5fbGF6eU1hcCA9IGY7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgbGF6eUZpbHRlcjogZnVuY3Rpb24oZikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICduZXh0Jywge1xuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXMuX25leHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHRoaXMuX25leHQpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHQgPSB0aGlzLm5leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBfbmV4dCA9IHRoaXMuX25leHQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZSA9IF9uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ25leHQnLCB7XG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIC8qIHBvd2VyIHNldCAqL1xuICAgIHZhciBwb3dlciA9IGZ1bmN0aW9uKGFyeSwgZnVuKSB7XG4gICAgICAgIHZhciBzaXplID0gMSA8PCBhcnkubGVuZ3RoLFxuICAgICAgICAgICAgc2l6ZU9mID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhhdCA9IE9iamVjdC5jcmVhdGUoYXJ5LnNsaWNlKCksIHtcbiAgICAgICAgICAgICAgICBsZW5ndGg6IHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBzaXplT2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaGlkZVByb3BlcnR5KHRoYXQsICdpbmRleCcpO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIHtcbiAgICAgICAgICAgIHZhbHVlT2Y6IHNpemVPZixcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoYXQuaW5kZXggPSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG50aDogZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgIGlmIChuID49IHNpemUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoOyBuOyBuID4+Pj0gMSwgaSsrKSBpZiAobiAmIDEpIHJlc3VsdC5wdXNoKHRoaXNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5udGgodGhpcy5pbmRleCsrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwgY29tbW9uKTtcbiAgICAgICAgdGhhdC5pbml0KCk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIChmdW4pID09PSAnZnVuY3Rpb24nKSA/IHRoYXQubWFwKGZ1bikgOiB0aGF0O1xuICAgIH07XG4gICAgLyogY29tYmluYXRpb24gKi9cbiAgICB2YXIgbmV4dEluZGV4ID0gZnVuY3Rpb24obikge1xuICAgICAgICB2YXIgc21hbGxlc3QgPSBuICYgLW4sXG4gICAgICAgICAgICByaXBwbGUgPSBuICsgc21hbGxlc3QsXG4gICAgICAgICAgICBuZXdfc21hbGxlc3QgPSByaXBwbGUgJiAtcmlwcGxlLFxuICAgICAgICAgICAgb25lcyA9ICgobmV3X3NtYWxsZXN0IC8gc21hbGxlc3QpID4+IDEpIC0gMTtcbiAgICAgICAgcmV0dXJuIHJpcHBsZSB8IG9uZXM7XG4gICAgfTtcbiAgICB2YXIgY29tYmluYXRpb24gPSBmdW5jdGlvbihhcnksIG5lbGVtLCBmdW4pIHtcbiAgICAgICAgaWYgKCFuZWxlbSkgbmVsZW0gPSBhcnkubGVuZ3RoO1xuICAgICAgICBpZiAobmVsZW0gPCAxKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgaWYgKG5lbGVtID4gYXJ5Lmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBmaXJzdCA9ICgxIDw8IG5lbGVtKSAtIDEsXG4gICAgICAgICAgICBzaXplID0gQyhhcnkubGVuZ3RoLCBuZWxlbSksXG4gICAgICAgICAgICBtYXhJbmRleCA9IDEgPDwgYXJ5Lmxlbmd0aCxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gZmlyc3Q7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gbWF4SW5kZXgpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIG4gPSB0aGlzLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgbjsgbiA+Pj49IDEsIGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobiAmIDEpIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5leHRJbmRleCh0aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIGNvbW1vbik7XG4gICAgICAgIHRoYXQuaW5pdCgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiAoZnVuKSA9PT0gJ2Z1bmN0aW9uJykgPyB0aGF0Lm1hcChmdW4pIDogdGhhdDtcbiAgICB9O1xuICAgIC8qIGJpZ2NvbWJpbmF0aW9uICovXG4gICAgdmFyIGJpZ05leHRJbmRleCA9IGZ1bmN0aW9uKG4sIG5lbGVtKSB7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG47XG4gICAgICAgIHZhciBqID0gbmVsZW07XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZm9yIChpID0gcmVzdWx0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDEpIHtcbiAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBpZiAoaiA9PSAwKSB7XG4gICAgICAgICAgICAvLyBPdmVyZmxvd1xuICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gMTtcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSByZXN1bHQubGVuZ3RoIC0gMjsgayA+PSAwOyBrLS0pIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba10gPSAoayA8IG5lbGVtLTEpPzE6MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vcm1hbFxuXG4gICAgICAgICAgICAvLyBmaXJzdCB6ZXJvIGFmdGVyIDFcbiAgICAgICAgICAgIHZhciBpMSA9IC0xO1xuICAgICAgICAgICAgdmFyIGkwID0gLTE7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0gPT0gMCAmJiBpMSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpMCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpMSA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpMCAhPSAtMSAmJiBpMSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbaTBdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2kxXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaiA9IG5lbGVtO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHJlc3VsdC5sZW5ndGggLSAxOyBpID49IGkxOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldID09IDEpXG4gICAgICAgICAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaTE7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IChpIDwgaik/MTowO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH07XG4gICAgdmFyIGJ1aWxkRmlyc3QgPSBmdW5jdGlvbihuZWxlbSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVsZW07IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbMF0gPSAxO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgdmFyIGJpZ0NvbWJpbmF0aW9uID0gZnVuY3Rpb24oYXJ5LCBuZWxlbSwgZnVuKSB7XG4gICAgICAgIGlmICghbmVsZW0pIG5lbGVtID0gYXJ5Lmxlbmd0aDtcbiAgICAgICAgaWYgKG5lbGVtIDwgMSkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIGlmIChuZWxlbSA+IGFyeS5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgZmlyc3QgPSBidWlsZEZpcnN0KG5lbGVtKSxcbiAgICAgICAgICAgIHNpemUgPSBDKGFyeS5sZW5ndGgsIG5lbGVtKSxcbiAgICAgICAgICAgIG1heEluZGV4ID0gYXJ5Lmxlbmd0aCxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gZmlyc3QuY29uY2F0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXgubGVuZ3RoID4gbWF4SW5kZXgpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIG4gPSB0aGlzLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG4ubGVuZ3RoOyBqKyssIGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobltqXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJpZ05leHRJbmRleCh0aGlzLmluZGV4LCBuZWxlbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcbiAgICAvKiBwZXJtdXRhdGlvbiAqL1xuICAgIHZhciBfcGVybXV0YXRpb24gPSBmdW5jdGlvbihhcnkpIHtcbiAgICAgICAgdmFyIHRoYXQgPSBhcnkuc2xpY2UoKSxcbiAgICAgICAgICAgIHNpemUgPSBmYWN0b3JpYWwodGhhdC5sZW5ndGgpO1xuICAgICAgICB0aGF0LmluZGV4ID0gMDtcbiAgICAgICAgdGhhdC5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgY29weSA9IHRoaXMuc2xpY2UoKSxcbiAgICAgICAgICAgICAgICBkaWdpdHMgPSBmYWN0b3JhZGljKHRoaXMuaW5kZXgsIHRoaXMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgICAgICBpID0gdGhpcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZm9yICg7IGkgPj0gMDsgLS1pKSByZXN1bHQucHVzaChjb3B5LnNwbGljZShkaWdpdHNbaV0sIDEpWzBdKTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICAvLyB3aGljaCBpcyByZWFsbHkgYSBwZXJtdXRhdGlvbiBvZiBjb21iaW5hdGlvblxuICAgIHZhciBwZXJtdXRhdGlvbiA9IGZ1bmN0aW9uKGFyeSwgbmVsZW0sIGZ1bikge1xuICAgICAgICBpZiAoIW5lbGVtKSBuZWxlbSA9IGFyeS5sZW5ndGg7XG4gICAgICAgIGlmIChuZWxlbSA8IDEpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICBpZiAobmVsZW0gPiBhcnkubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIHNpemUgPSBQKGFyeS5sZW5ndGgsIG5lbGVtKSxcbiAgICAgICAgICAgIHNpemVPZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoYXQgPSBPYmplY3QuY3JlYXRlKGFyeS5zbGljZSgpLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnY21iJyk7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAncGVyJyk7XG4gICAgICAgIGFkZFByb3BlcnRpZXModGhhdCwge1xuICAgICAgICAgICAgdmFsdWVPZjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbWIgPSBjb21iaW5hdGlvbihhcnksIG5lbGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlciA9IF9wZXJtdXRhdGlvbih0aGlzLmNtYi5uZXh0KCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnBlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNtYiA9IHRoaXMuY21iLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbWIpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXIgPSBfcGVybXV0YXRpb24oY21iKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIGNvbW1vbik7XG4gICAgICAgIHRoYXQuaW5pdCgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiAoZnVuKSA9PT0gJ2Z1bmN0aW9uJykgPyB0aGF0Lm1hcChmdW4pIDogdGhhdDtcbiAgICB9O1xuXG4gICAgdmFyIFBDID0gZnVuY3Rpb24obSkge1xuICAgICAgICB2YXIgdG90YWwgPSAwO1xuICAgICAgICBmb3IgKHZhciBuID0gMTsgbiA8PSBtOyBuKyspIHtcbiAgICAgICAgICAgIHZhciBwID0gUChtLG4pO1xuICAgICAgICAgICAgdG90YWwgKz0gcDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgLy8gd2hpY2ggaXMgcmVhbGx5IGEgcGVybXV0YXRpb24gb2YgY29tYmluYXRpb25cbiAgICB2YXIgcGVybXV0YXRpb25Db21iaW5hdGlvbiA9IGZ1bmN0aW9uKGFyeSwgZnVuKSB7XG4gICAgICAgIC8vIGlmICghbmVsZW0pIG5lbGVtID0gYXJ5Lmxlbmd0aDtcbiAgICAgICAgLy8gaWYgKG5lbGVtIDwgMSkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIC8vIGlmIChuZWxlbSA+IGFyeS5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yO1xuICAgICAgICB2YXIgc2l6ZSA9IFBDKGFyeS5sZW5ndGgpLFxuICAgICAgICAgICAgc2l6ZU9mID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhhdCA9IE9iamVjdC5jcmVhdGUoYXJ5LnNsaWNlKCksIHtcbiAgICAgICAgICAgICAgICBsZW5ndGg6IHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBzaXplT2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaGlkZVByb3BlcnR5KHRoYXQsICdjbWInKTtcbiAgICAgICAgaGlkZVByb3BlcnR5KHRoYXQsICdwZXInKTtcbiAgICAgICAgaGlkZVByb3BlcnR5KHRoYXQsICduZWxlbScpO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIHtcbiAgICAgICAgICAgIHZhbHVlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmVsZW0gPSAxO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgbmVsZW06IFwiICsgdGhpcy5uZWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbWIgPSBjb21iaW5hdGlvbihhcnksIHRoaXMubmVsZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMucGVyID0gX3Blcm11dGF0aW9uKHRoaXMuY21iLm5leHQoKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMucGVyLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY21iID0gdGhpcy5jbWIubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNtYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWxlbSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbmNyZW1lbnQgbmVsZW06IFwiICsgdGhpcy5uZWxlbSArIFwiIHZzIFwiICsgYXJ5Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWxlbSA+IGFyeS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY21iID0gY29tYmluYXRpb24oYXJ5LCB0aGlzLm5lbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNtYiA9IHRoaXMuY21iLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY21iKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXIgPSBfcGVybXV0YXRpb24oY21iKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAodGhhdC5fbGF6eU1hcCkgPT09ICdmdW5jdGlvbicpP3RoYXQuX2xhenlNYXAocmVzdWx0KTpyZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIGNvbW1vbik7XG4gICAgICAgIHRoYXQuaW5pdCgpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiAoZnVuKSA9PT0gJ2Z1bmN0aW9uJykgPyB0aGF0Lm1hcChmdW4pIDogdGhhdDtcbiAgICB9O1xuICAgIC8qIENhcnRlc2lhbiBQcm9kdWN0ICovXG4gICAgdmFyIGFycmF5U2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG4gICAgdmFyIGNhcnRlc2lhblByb2R1Y3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcjtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgICAgICAgIHNpemUgPSBhcmdzLnJlZHVjZShmdW5jdGlvbihwLCBhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAgKiBhLmxlbmd0aDtcbiAgICAgICAgICAgIH0sIDEpLFxuICAgICAgICAgICAgc2l6ZU9mID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGltID0gYXJncy5sZW5ndGgsXG4gICAgICAgICAgICB0aGF0ID0gT2JqZWN0LmNyZWF0ZShhcmdzLCB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogc2l6ZU9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmICghc2l6ZSkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIGhpZGVQcm9wZXJ0eSh0aGF0LCAnaW5kZXgnKTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCB7XG4gICAgICAgICAgICB2YWx1ZU9mOiBzaXplT2YsXG4gICAgICAgICAgICBkaW06IGRpbSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IHRoaXMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBkID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKDsgZCA8IGRpbTsgZCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gYXJndW1lbnRzW2RdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSB0aGlzW2RdLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2RdW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG50aDogZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgZCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICg7IGQgPCBkaW07IGQrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IHRoaXNbZF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IG4gJSBsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2RdW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgbiAtPSBpO1xuICAgICAgICAgICAgICAgICAgICBuIC89IGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh0aGF0Ll9sYXp5TWFwKSA9PT0gJ2Z1bmN0aW9uJyk/dGhhdC5fbGF6eU1hcChyZXN1bHQpOnJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+PSBzaXplKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubnRoKHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICAvKiBiYXNlTiAqL1xuICAgIHZhciBiYXNlTiA9IGZ1bmN0aW9uKGFyeSwgbmVsZW0sIGZ1bikge1xuICAgICAgICAgICAgICAgIGlmICghbmVsZW0pIG5lbGVtID0gYXJ5Lmxlbmd0aDtcbiAgICAgICAgaWYgKG5lbGVtIDwgMSkgdGhyb3cgbmV3IFJhbmdlRXJyb3I7XG4gICAgICAgIHZhciBiYXNlID0gYXJ5Lmxlbmd0aCxcbiAgICAgICAgICAgICAgICBzaXplID0gTWF0aC5wb3coYmFzZSwgbmVsZW0pO1xuICAgICAgICB2YXIgc2l6ZU9mID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhhdCA9IE9iamVjdC5jcmVhdGUoYXJ5LnNsaWNlKCksIHtcbiAgICAgICAgICAgICAgICBsZW5ndGg6IHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBzaXplT2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaGlkZVByb3BlcnR5KHRoYXQsICdpbmRleCcpO1xuICAgICAgICBhZGRQcm9wZXJ0aWVzKHRoYXQsIHtcbiAgICAgICAgICAgIHZhbHVlT2Y6IHNpemVPZixcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoYXQuaW5kZXggPSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG50aDogZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgIGlmIChuID49IHNpemUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWxlbTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gbiAlIGJhc2U7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFyeVtkXSlcbiAgICAgICAgICAgICAgICAgICAgbiAtPSBkOyBuIC89IGJhc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgKHRoYXQuX2xhenlNYXApID09PSAnZnVuY3Rpb24nKT90aGF0Ll9sYXp5TWFwKHJlc3VsdCk6cmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm50aCh0aGlzLmluZGV4KyspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkUHJvcGVydGllcyh0aGF0LCBjb21tb24pO1xuICAgICAgICB0aGF0LmluaXQoKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgKGZ1bikgPT09ICdmdW5jdGlvbicpID8gdGhhdC5tYXAoZnVuKSA6IHRoYXQ7XG4gICAgfTtcblxuICAgIC8qIGV4cG9ydCAqL1xuICAgIHZhciBDb21iaW5hdG9yaWNzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBhZGRQcm9wZXJ0aWVzKENvbWJpbmF0b3JpY3MsIHtcbiAgICAgICAgQzogQyxcbiAgICAgICAgUDogUCxcbiAgICAgICAgZmFjdG9yaWFsOiBmYWN0b3JpYWwsXG4gICAgICAgIGZhY3RvcmFkaWM6IGZhY3RvcmFkaWMsXG4gICAgICAgIGNhcnRlc2lhblByb2R1Y3Q6IGNhcnRlc2lhblByb2R1Y3QsXG4gICAgICAgIGNvbWJpbmF0aW9uOiBjb21iaW5hdGlvbixcbiAgICAgICAgYmlnQ29tYmluYXRpb246IGJpZ0NvbWJpbmF0aW9uLFxuICAgICAgICBwZXJtdXRhdGlvbjogcGVybXV0YXRpb24sXG4gICAgICAgIHBlcm11dGF0aW9uQ29tYmluYXRpb246IHBlcm11dGF0aW9uQ29tYmluYXRpb24sXG4gICAgICAgIHBvd2VyOiBwb3dlcixcbiAgICAgICAgYmFzZU46IGJhc2VOLFxuICAgICAgICBWRVJTSU9OOiB2ZXJzaW9uXG4gICAgfSk7XG4gICAgcmV0dXJuIENvbWJpbmF0b3JpY3M7XG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vanMtY29tYmluYXRvcmljcy9jb21iaW5hdG9yaWNzLmpzXG4vLyBtb2R1bGUgaWQgPSA1ODRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IExheWVyQXNzaWdubWVudCBmcm9tICdlZ3JhcGgvbGF5b3V0ZXIvc3VnaXlhbWEvbGF5ZXItYXNzaWdubWVudC91c2VyLWRlZmluZWQnXG5cbmNvbnN0IGxheWVyQXNzaWdubWVudCA9IChncmFwaCkgPT4ge1xuICByZXR1cm4gbmV3IExheWVyQXNzaWdubWVudCgpXG4gICAgLmYoKHUpID0+IHtcbiAgICAgIGNvbnN0IGQgPSBncmFwaC52ZXJ0ZXgodSlcbiAgICAgIGlmIChkLmR1bW15KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi5ncmFwaC5pblZlcnRpY2VzKHUpLm1hcCgodikgPT4gZ3JhcGgudmVydGV4KHYpLmxheWVyT3JkZXIpKSAqIDIgKyAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZC5sYXllck9yZGVyICogMlxuICAgICAgfVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGxheWVyQXNzaWdubWVudFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2xheWVyLWFzc2lnbm1lbnQuanMiLCJjb25zdCBhY2Nlc3NvciA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2FjY2Vzc29yJylcblxuY29uc3QgcHJpdmF0ZXMgPSBuZXcgV2Vha01hcCgpXG5cbmNsYXNzIFVzZXJEZWZpbmVkIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHByaXZhdGVzLnNldCh0aGlzLCB7XG4gICAgICBmOiAoKSA9PiAwXG4gICAgfSlcbiAgfVxuXG4gIGNhbGwgKGcpIHtcbiAgICBjb25zdCBmID0gcHJpdmF0ZXMuZ2V0KHRoaXMpLmZcbiAgICBjb25zdCBsYXllcnMgPSB7fVxuICAgIGZvciAoY29uc3QgdSBvZiBnLnZlcnRpY2VzKCkpIHtcbiAgICAgIGxheWVyc1t1XSA9IGYodSlcbiAgICB9XG4gICAgcmV0dXJuIGxheWVyc1xuICB9XG5cbiAgZiAoKSB7XG4gICAgcmV0dXJuIGFjY2Vzc29yKHRoaXMsIHByaXZhdGVzLCAnZicsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJEZWZpbmVkXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZWdyYXBoL2xheW91dGVyL3N1Z2l5YW1hL2xheWVyLWFzc2lnbm1lbnQvdXNlci1kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA1ODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==