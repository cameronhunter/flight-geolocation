module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    "gh-pages": {
      options: {
        base: "app"
      },
      src: ["**"]
    }
  });
};
