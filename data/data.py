# coding: utf-8
import csv
import json
import numpy

VERSION = 3

layers = [
    '1 cell | first',
    '1-2 cell | first',
    '1-2 cell | last',
    '2 cell | first',
    '2 cell | middle',
    '2 cell | last',
    '2-4 cell | firstAB',
    '2-4 cell | firstP1',
    '2-4 cell | last',
    '4 cell | first',
    '4 cell | middle',
    '4 cell | last',
    '4-8 cell | firstAB_ap',
    '4-8 cell | firstEMS',
    '4-8 cell | firstP2',
    '4-8 cell | last',
    '8 cell | first',
]


def main():
    variables = list(csv.reader(open('variables.csv')))[1:]
    timepoint = {row[0]: '{} | {}'.format(row[1], row[2])
                 for row in csv.reader(open('timepoint.csv'))}
    data = numpy.array([[float(val) if val else 0.0 for val in row[1:]]
                        for row in csv.reader(open('data.csv'))])
    # coef = numpy.corrcoef(data.T)
    cells = set()
    variableTypes = set()
    vertices = []
    edges = []
    verticesIds = {}
    for i, variable in enumerate(variables):
        if variable[1] not in timepoint:
            continue
        v_cells = variable[7].split()
        for cell in v_cells:
            cells.add(cell)
        variableTypes.add(variable[6])
        vertices.append({
            'd': {
                'index': variable[0],
                'name': variable[1],
                'description': variable[2],
                'layer': timepoint[variable[1]],
                'layerOrder': layers.index(timepoint[variable[1]]),
                'unit': variable[5],
                'variableType': variable[6],
                'cells': v_cells,
                'data': list(data[:, i]),
            },
            'u': variable[0],
        })
        verticesIds[variable[1]] = variable[0]
        # for j, variable2 in enumerate(variables):
        #     edges.append({
        #         'd': {
        #             'r': coef[i, j]
        #         },
        #         'u': variable[0],
        #         'v': variable2[0],
        #     })
    # paths = [list(row) for row in csv.reader(open('lasso.csv'))]
    paths = [list(row) for row in csv.reader(open('baysian-lasso.csv'))]
    results = paths[0][1:]
    for row in paths[1:]:
        reason = '_'.join(row[0].split('_')[1:])
        for result, value in zip(results, row[1:]):
            if not value:
                continue
            result = '_'.join(result.split('_')[1:])
            edges.append({
                'd': {
                    'r': float(value),
                },
                'u': verticesIds[reason],
                'v': verticesIds[result],
            })

    obj = {
        'cells': sorted(list(cells)),
        'edges': edges,
        'layers': layers,
        'variableTypes': sorted(list(variableTypes)),
        'version': VERSION,
        'vertices': vertices,
    }
    print(json.dumps(obj, sort_keys=True, indent=2))


if __name__ == '__main__':
    main()
