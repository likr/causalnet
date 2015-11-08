import LayerAssignment from 'egraph/lib/layouter/sugiyama/layer-assignment/user-defined';

const layerAssignment = (graph) => {
  return new LayerAssignment()
    .f((u) => {
      const d = graph.vertex(u);
      if (d.dummy) {
        return Math.max(...graph.inVertices(u).map((v) => graph.vertex(v).groupOrder)) * 2 + 1;
      } else {
        return d.groupOrder * 2;
      }
    });
};

export default layerAssignment
