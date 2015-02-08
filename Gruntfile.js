module.exports = function(grunt) {
  grunt.initConfig({
    pkt: grunt.file.readJSON('package.json'),
    paths: { 
      index: '.' 
    },
    browserify: {
      dev: {
        files: {
          '<%= paths.index %>/js/bundle.js': ['<%= paths.index %>/js/app.js']
        },
        options: {
          transform: ['reactify']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= paths.index %>',
          livereload: true
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      dev: {
        files: [
          'Gruntfile.js', 'index.html',
          '<%= paths.index %>/js/**/*.js',
          '<%= paths.index %>/js/**/*.react.js',
        ],
        tasks: [
          'browserify'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          '<%= paths.index %>/node_modules/',
          '<%= paths.index %>/js/bundle.js'
        ],
      },
      all: [
        '<%= paths.index %>/{,*/}*.js'
      ],
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsxhint');

  grunt.registerTask('default', [
    'jshint',
    'browserify',
    'connect',
    'watch'
  ]);
};
