'use strict';

module.exports = function(config) {

  // custom saucelabs browsers
  var customLaunchers = {
    sauceLabsChrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '39'
    },
    sauceLabsFirefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Linux',
      version: '35'
    },
    sauceLabsSafari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8.0'
    }
  };

  config.set({

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['Chrome', /*'sauceLabsChrome', 'sauceLabsFirefox', 'sauceLabsSafari'*/],

    logLevel: config.LOG_INFO,

    logColors: true,

    sauceLabs: {
      testName: 'User Dashboard Unit Tests',
      startConnect: false
    },


    customLaunchers: customLaunchers,

    reporters: ['progress', 'coverage', 'dots', 'saucelabs'],

    preprocessors: {
      '**/app/index.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    singleRun: true,

    plugins : [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-sauce-launcher',
      'karma-jasmine',
    ]

  });
};
