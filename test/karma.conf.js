module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/fxos-component/fxos-component.js',
      'node_modules/fxos-icons/fxos-icons.css',
      'node_modules/fxos-theme/fxos-theme.css',
      { pattern: 'node_modules/fxos-icons/fonts/*', included: false },
      'fxos-text-input.js',
      'fxos-text-input-pin.js',
      'test/*_test.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    client: {
      captureConsole: true,
      mocha: { 'ui': 'tdd' }
    },

    // enable / disable watching file and
    // executing tests whenever any file changes
    autoWatch: true,

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {
          'dom.webcomponents.enabled': true,
          'dom.w3c_touch_events.enabled': 1
        }
      }
    },

    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['firefox_latest'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
