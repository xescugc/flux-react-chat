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
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    //connect: {
      //server: {
        //options: {
          //port: 3000,
          //base: '<%= paths.index %>',
          //livereload: true
        //}
      //}
    //},
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      dev: {
        files: [
          'Gruntfile.js', 'index.html', 'server.js',
          '<%= paths.index %>/js/**/*.js',
          '<%= paths.index %>/js/**/*.react.js',
        ],
        tasks: [
          'jshint',
          'browserify'
        ]
      }
    },
    jshint: {
      options: {
        force: true,
        jshintrc: '.jshintrc',
        ignores: [
          '<%= paths.index %>/node_modules/',
          '<%= paths.index %>/js/bundle.js'
        ],
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js', 'index.html', 'server.js',
        '<%= paths.index %>/js/**/*.js',
        '<%= paths.index %>/js/**/*.react.js',
      ],
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', [
    'jshint',
    'browserify',
    'concurrent:dev'
  ]);
};
