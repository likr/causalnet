import csv
import json
import os.path
import argparse

variables_header = [
    'name:ID(Phenotype)',
    'description',
    'timeGroup',
    'timeGroupDetail',
    'timeOrder:INT',
    'unit',
    'type',
    'cells:STRING[]',
    'data:DOUBLE[]',
]
edges_header = [
    ':START_ID(Phenotype)',
    ':END_ID(Phenotype)',
    'value:DOUBLE',
]
texts_header = sorted([
    'id:ID(Text)',
    'cell_P0:INT',
    'word_sphericity:INT',
    'word_position:INT',
    'cell_E:INT',
    'cell_ABal:INT',
    'count_word:INT',
    'count_cell:INT',
    'word_axis:INT',
    'arg1',
    'cell_ABpr:INT',
    'cell_C:INT',
    'arg2',
    'cell_ABpl:INT',
    'line:INT',
    'cell_P3:INT',
    'word_period:INT',
    'word_distance:INT',
    'text',
    'cell_ABa:INT',
    'cell_EMS:INT',
    'cell_AB:INT',
    'cell_MS:INT',
    'type',
    'word_volume:INT',
    'authors',
    'doc_line',
    'arg3',
    'cell_P1:INT',
    'cell_P2:INT',
    'published',
    'word_angle:INT',
    'doc_id',
    'title',
    'cell_ABar:INT',
    'cell_ABp:INT',
    'verb',
])


def opencsv(outpath, filename):
    path = os.path.abspath(outpath) + '/' + filename
    return csv.writer(open(path, 'w'))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', dest='infile', required=True)
    parser.add_argument('-d', dest='dest', default='.')
    args = parser.parse_args()

    data = json.load(open(args.infile))

    writer = opencsv(args.dest, 'variables.csv')
    writer.writerow(variables_header)
    for node in data['vertices']:
        writer.writerow([
            node['d']['name'],
            node['d']['description'],
            node['d']['layer'].split('|')[0].strip(),
            node['d']['layer'],
            node['d']['layerOrder'],
            node['d']['unit'],
            node['d']['variableType'],
            ';'.join(node['d']['cells']),
            ';'.join(map(str, node['d']['data'])),
        ])

    indices = {}
    for node in data['vertices']:
        indices[node['u']] = node['d']['name']

    edge_types = [
        ('r', 'correlation.csv'),
        ('l', 'lasso.csv'),
        ('bl', 'baysian-lasso.csv'),
    ]
    for key, filename in edge_types:
        writer = opencsv(args.dest, filename)
        writer.writerow(edges_header)
        for edge in data['edges']:
            writer.writerow([
                indices[edge['u']],
                indices[edge['v']],
                edge['d'][key],
            ])

    writer = opencsv(args.dest, 'texts.csv')
    writer.writerow(texts_header)
    for text in data['texts']:
        writer.writerow([text[k.split(':')[0]] for k in texts_header])


if __name__ == '__main__':
    main()
