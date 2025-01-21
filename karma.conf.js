module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'test/**/*.spec.js'
    ],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher'
    ],
    browsers: ['Chrome'],
    singleRun: true
  });
};