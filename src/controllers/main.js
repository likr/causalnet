angular.module('riken')
  .config($stateProvider => {
    $stateProvider.state('main', {
      controller: 'MainController as main',
      resolve: {
        columns: ($q) => {
          var groups = {
            '1 cell': 0,
            '1-2 cell': 1,
            '2 cell': 2,
            '2 cell-4 cell': 3,
            '4 cell': 4,
            '4 cell-8 cell': 5,
            '8 cell': 6
          };
          var deferred = $q.defer();
          d3.csv('data/columns.csv')
            .row(d => {
              d.nameGroup = d.name.split('_')[0];
              d.groupOrder = groups[d.group];
              return d;
            })
            .get((error, data) => {
              deferred.resolve(data);
            });
          return deferred.promise;
        },
        data: ($q) => {
          var deferred = $q.defer();
          d3.csv('data/data.csv')
            .row(d => {
              for (let key in d) {
                d[key] = +d[key];
              }
              return d;
            })
            .get((error, data) => {
              deferred.resolve(data);
            });
          return deferred.promise;
        },
        rmin: ($stateParams) => {
          return +$stateParams.rmin || 0.5;
        }
      },
      templateUrl: 'partials/main.html',
      url: '/?rmin'
    });
  })
  .controller('MainController', class {
    constructor(columns, data, rmin) {
      var values = columns.map(column => {
        return data.map(d => d[column.name]);
      });
      var r = sem.stats.corrcoef(values);
      var links = [];
      var n = columns.length;
      for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
          if (Math.abs(r[i][j]) >= rmin && columns[i].group !== columns[j].group) {
            if (columns[i].groupOrder < columns[j].groupOrder) {
              links.push({
                source: i,
                target: j,
                r: r[i][j]
              });
            } else {
              links.push({
                source: j,
                target: i,
                r: r[i][j]
              });
            }
          }
        }
      }
      this.data = {
        nodes: columns,
        links: links
      };
    }
  });
