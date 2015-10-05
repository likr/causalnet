import d3 from 'd3'
import angular from 'angular'
import CircleVertexRenderer from 'd3-egraph/lib/vertex-renderer/circle-vertex-renderer';
import vertexFunction from 'd3-egraph/lib/vertex-function';

angular.module('riken').factory('CircleVertexRenderer', (r, vertexOpacity, openMimicDialog) => {
  return class ExCircleVertexRenderer extends CircleVertexRenderer {
    constructor(gOrig) {
      super();
      this.gOrig = gOrig;
    }

    render() {
      return (selection) => {
        const vertexColor = this.vertexColor(),
              gOrig = this.gOrig;
        selection.each(function (data) {
          const element = d3.select(this);
          if (element.select('circle').empty()) {
            element
              .attr('transform', d => `translate(${d.px},${d.py})`);

            element.append('circle')
              .attr({
                r: r,
                opacity: vertexOpacity,
                fill: vertexFunction(vertexColor)
              });

            element.append('text')
              .text((d) => d.data.name)
              .attr({
                dx: r * 1.5,
                dy: r,
                fill: vertexFunction(vertexColor),
                transform: 'rotate(0)',
                'font-size': 20,
                'font-weight': 'bold'
              });
          }

          if (data.data.dummy) {
            const {u, g} = data;
            element.on('click', () => {
              openMimicDialog(g, gOrig, u);
            });
          }
        });

        selection
          .attr('transform', d => `translate(${d.x},${d.y})`);
        selection.select('circle')
          .attr({
            r: r,
            opacity: (d) => d.data.selected ? 1 : vertexOpacity,
            fill: vertexFunction(vertexColor)
          });
        selection.select('text')
          .attr({
            dx: r * 1.5,
            dy: r,
            fill: vertexFunction(vertexColor)
          });
      };
    }
  }
});
