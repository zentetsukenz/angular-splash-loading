module.exports = function (config) {
  config.set({

    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'src/**/*.js',
      'test/**/*.spec.js'
    ],

    autoWatch: true,

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'src/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    frameworks: ['jasmine'],

    browsers: [
      'PhantomJS'
    ],

    plugins: [
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
