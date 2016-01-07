'use strict';
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['firefox_latest'],
    client: {
      captureConsole: true,
      mocha: {'ui': 'tdd'}
    },
    basePath: '../',

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {
          'dom.webcomponents.enabled': true,
          'dom.w3c_touch_events.enabled': 1
        }
      }
    },

    // list of files / patterns to load in the browser
    files: [
      'node_modules/fxos-component/fxos-component.js',
      'fxos-text-input.js',
      'fxos-text-input-pin.js',
      'node_modules/axe-core/axe.min.js',
      'node_modules/test-utils/src/utils.js',
      'node_modules/test-utils/src/accessibility.js',
      'test/test-unit-*.js',
      {
        pattern: 'node_modules/fxos-icons/fxos-icons.css',
        included: false
      },
      {
        pattern: 'node_modules/fxos-theme/fxos-theme.css',
        included: false
      },
      {
        pattern: 'node_modules/fxos-icons/fonts/*',
        included: false
      }
    ],

    proxies: {
      '/node_modules/': 'http://localhost:9876/base/node_modules/'
    }
  });
};
