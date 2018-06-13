import csv
import json
import os.path
import argparse
import numpy

VERSION = 4

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


def readcsv(inpath, filename):
    path = os.path.abspath(inpath) + '/' + filename
    return list(csv.reader(open(path)))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', dest='inpath', required=True)
    parser.add_argument('-o', dest='outfile', required=True)
    args = parser.parse_args()
    inpath = args.inpath

    variables = readcsv(inpath, 'variables.csv')[1:]
    timepoint = {row[0]: '{} | {}'.format(row[1], row[2])
                 for row in readcsv(inpath, 'timepoint.csv')}
    data = numpy.array([[float(val) if val else 0.0 for val in row[1:]]
                        for row in readcsv(inpath, 'data.csv')])
    coef = numpy.corrcoef(data.T)
    cells = set()
    variableTypes = set()
    vertices = []
    edge_dict = {}
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
        for j, variable2 in enumerate(variables):
            if variable2[1] not in timepoint:
                continue
            edge_dict[(variable[0], variable2[0])] = {
                'r': coef[i, j],
                'l': 0.0,
                'bl': 0.0,
            }
    lasso_paths = [list(row) for row in readcsv(inpath, 'lasso.csv')]
    blasso_paths = [list(row) for row in readcsv(inpath, 'baysian-lasso.csv')]
    for name, paths in [('l', lasso_paths), ('bl', blasso_paths)]:
        results = paths[0][1:]
        for row in paths[1:]:
            reason = '_'.join(row[0].split('_')[1:])
            for result, value in zip(results, row[1:]):
                if not value:
                    continue
                result = '_'.join(result.split('_')[1:])
                u = verticesIds[reason]
                v = verticesIds[result]
                edge_dict[(u, v)][name] = float(value)

    texts = json.load(open(os.path.abspath(inpath) + '/wormbase.json'))
    for i, text in enumerate(texts):
        text['id'] = i

    obj = {
        'cells': sorted(list(cells)),
        'edges': [{'u': u, 'v': v, 'd': d} for (u, v), d in edge_dict.items()],
        'layers': layers,
        'variableTypes': sorted(list(variableTypes)),
        'version': VERSION,
        'vertices': vertices,
        'texts': texts,
    }
    json.dump(obj, open(args.outfile, 'w'), sort_keys=True, indent=2)


if __name__ == '__main__':
    main()
