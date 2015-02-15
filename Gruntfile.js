'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: 'app',
          layout: function(type) {
            var renamedType = type;
            if (type === 'js' || type === 'map') {
              renamedType = 'scripts';
            } else if (type === 'css') {
              renamedType = 'styles';
            }
            return path.join(renamedType, 'lib');
          }
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'app/scripts/riken.js': ['js/riken.js']
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: false,
        createTag: false,
        push: false
      }
    },
    concat: {
      dist: {
        src: [
          'build/riken.js',
          'build/services/*.js',
          'build/directives/*.js',
          'build/controllers/*.js'
        ],
        dest: 'app/scripts/riken.js'
      }
    },
    traceur: {
      options: {
        modules: 'inline'
      },
      src: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'build'
          }
        ]
      }
    },
    watch: {
      src: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-traceur');

  grunt.registerTask('build', ['traceur', 'concat']);
  grunt.registerTask('default', ['build']);
};
