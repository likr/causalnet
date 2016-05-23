# coding: utf-8
import csv
import json
import numpy

layers = [
    '1 cell',
    '1-2 cell',
    '2 cell',
    '2-4 cell',
    '4 cell',
    '4-8 cell',
    '8 cell',
]

def main():
    variables = list(csv.reader(open('variables.csv')))[1:]
    data = numpy.array([[float(val) if val else 0.0 for val in row[1:]] for row in csv.reader(open('data.csv'))])
    coef = numpy.corrcoef(data.T)
    cells = set()
    variableTypes = set()
    vertices = []
    edges = []
    for i, variable in enumerate(variables):
        v_cells = variable[6].split()
        for cell in v_cells:
            cells.add(cell)
        variableTypes.add(variable[5])
        vertices.append({
            'd': {
                'index': variable[0],
                'name': variable[1],
                'description': variable[2],
                'layer': variable[3],
                'layerOrder': layers.index(variable[3]),
                'unit': variable[4],
                'variableType': variable[5],
                'cells': v_cells,
            },
            'u': variable[0],
        })
        for j, variable2 in enumerate(variables):
            edges.append({
                'd': {
                    'r': coef[i, j]
                },
                'u': variable[0],
                'v': variable2[0],
            })

    obj = {
        'cells': sorted(list(cells)),
        'edges': edges,
        'layers': layers,
        'variableTypes': sorted(list(variableTypes)),
        'vertices': vertices,
    }
    print(json.dumps(obj, sort_keys=True, indent=2))

if __name__ == '__main__':
    main()
