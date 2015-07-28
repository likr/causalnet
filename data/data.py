# coding: utf-8
import csv
import json
import numpy


groups = {
    '1 cell': 0,
    '1-2 cell': 1,
    '2 cell': 2,
    '2 cell-4 cell': 3,
    '4 cell': 4,
    '4 cell-8 cell': 5,
    '8 cell': 6
}


class Column(object):
    def __init__(self, index, name, description, group, unit):
        self.index = index
        self.name = name
        self.name_group = name.split('_')[0]
        self.description = description
        self.group = group
        self.unit = unit

    def to_dict(self):
        return {
            'index': self.index,
            'name': self.name,
            'nameGroup': self.name_group,
            'description': self.description,
            'group': self.group,
            'groupOrder': groups[self.group],
            'unit': self.unit
        }


def main():
    columns = {row[1]: Column(*row) for row
               in list(csv.reader(open('columns.csv')))[1:]}
    data = list(csv.reader(open('data.csv')))
    head, data = data[0][1:], data[1:]
    data = numpy.array([[float(v) for v in row[1:]] for row in data])
    print data.T, numpy.corrcoef(data.T)
    r = numpy.corrcoef(data.T)
    print len(columns), r.shape

    graph = {
        'vertices': [{'u': columns[l].index, 'd': columns[l].to_dict()}
                     for l in head],
        'edges': [{'u': columns[namei].index,
                   'v': columns[namej].index, 'd': {'r': r[i][j]}}
                  if groups[columns[namei].group] < groups[columns[namej].group] else
                  {'v': columns[namei].index,
                   'u': columns[namej].index, 'd': {'r': r[i][j]}}
                  for i, namei in enumerate(head)
                  for j, namej in enumerate(head)
                  if i < j]
    }
    json.dump(graph, open('data.json', 'w'))

if __name__ == '__main__':
    main()
