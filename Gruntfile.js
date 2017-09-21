module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        separator: ';',
      },
      dist: {
        src: ['app/routes.js', 'app/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['app/routes.js', 'app/**/*.js'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
    },
  })

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
    
  grunt.registerTask('default', ['concat']);
}
