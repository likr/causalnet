angular.module('riken')
  .directive('network', () => {
    return {
      link: (scope, element) => {
        var data = scope.data;

        var graph = egrid.core.graph.adjacencyList();
        data.nodes.forEach(node => {
          graph.addVertex(node);
        });
        data.links.forEach(link => {
          graph.addEdge(link.source, link.target, {
            r: link.r
          });
        });

        var centralities = egrid.core.network.centrality.degree(graph);
        var vertexColor = d3.scale.category20();
        var vertexScale = d3.scale.linear()
          .domain(d3.extent(graph.vertices(), u => centralities[u]))
          .range([2, 10]);
        var edgeWidthScale = d3.scale.linear()
          .domain(d3.extent(graph.edges(), edge => Math.abs(graph.get(edge[0], edge[1]).r)))
          .range([1, 10]);
        var width = 1000;
        var height = 1000;
        var egm = egrid.core.egm()
          .vertexColor(d => vertexColor(d.nameGroup))
          .vertexOpacity(() => '')
          .vertexScale((_, u) => vertexScale(centralities[u]))
          .vertexText(d => d.name)
          .vertexVisibility((_, u) => {
            return graph.inEdges(u).length > 0 || graph.outEdges(u).length > 0;
          })
          .edgeColor((u, v) => {
            if (graph.get(u).nameGroup === graph.get(v).nameGroup) {
              return vertexColor(graph.get(u).nameGroup);
            } else {
              return 'black';
            }
          })
          .edgeOpacity(() => '')
          .edgeWidth((u, v) => edgeWidthScale(Math.abs(graph.get(u, v).r)))
          .dagreEdgeSep(30)
          .dagreNodeSep(30)
          .dagreRankSep(500)
          .dagreRanker(g => {
            g.nodes().forEach(u => {
              if (!u.startsWith('_')) {
                g.node(u).rank = 2 * graph.get(+u).groupOrder;
              }
            });
          })
          .size([width, height]);

        var selection = d3.select(element[0]).append('svg')
          .datum(graph)
          .call(egm)
          .call(egm.center());
      },
      restrict: 'E',
      scope: {
        data: '='
      }
    };
  });
